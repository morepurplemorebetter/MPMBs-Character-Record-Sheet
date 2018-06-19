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
		
		if (testSource(key, kObj, "creaExcl")) continue; // test if the creature or its source isn't excluded
		
		if (input.indexOf(key) != -1) { // see if the text matches the key
			testLen = key.length;
		} else if (input.indexOf(kObj.name.toLowerCase()) != -1) { // see if the text matches the name
			testLen = kObj.name.length;
		} else {
			continue; // no match, so skip this one
		}

		// only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source. This differs from the regExpSearch objects
		var tempDate = sourceDate(kObj.source);
		if (testLen < foundLen || (testLen == foundLen && tempDate < foundDat)) continue;
		
		// we have a match, set the values
		found = key;
		foundLen = testLen;
		foundDat = tempDate;
	}
	return found;
};

//detects race entered and put information to global CurrentCompRace variable
function FindCompRace(inputcreatxt, aPrefix) {
	if (aPrefix) {
		var prefixA = [aPrefix];
	} else {
		var prefixA = What("Template.extras.AScomp").split(",");
	}
	for (var p = 0; p < prefixA.length; p++) {
		var prefix = prefixA[p];
		var tempString = inputcreatxt === undefined ? tDoc.getField(prefix + "Comp.Race").submitName : inputcreatxt;
		var oldKnown = CurrentCompRace[prefix] ? CurrentCompRace[prefix].known : undefined;
		var newCreaFound = ParseCreature(tempString);
		if (newCreaFound) {
			CurrentCompRace[prefix] = {};
			CurrentCompRace[prefix] = CreatureList[newCreaFound];
			CurrentCompRace[prefix].known = newCreaFound;
			CurrentCompRace[prefix].typeFound = "creature";
		} else {
			var newRaceFound = ParseRace(tempString);
			if (newRaceFound[0]) {
				CurrentCompRace[prefix] = {};
				CurrentCompRace[prefix].known = newRaceFound[0],
				CurrentCompRace[prefix].variant = newRaceFound[1],
				CurrentCompRace[prefix].typeFound = "race";
				
				//check if a the this is just after a reset. If so, run the FindRace() function so that CurrentRace has attributes that can be used
				if (!CurrentRace.size) FindRace()
				for (var prop in CurrentRace) {
					if (prop !== "known" && prop !== "variant") {
						if (CurrentCompRace[prefix].variant && RaceSubList[CurrentCompRace[prefix].known + "-" + CurrentCompRace[prefix].variant][prop] !== undefined) {//select the sub-racial prop
							CurrentCompRace[prefix][prop] = RaceSubList[CurrentCompRace[prefix].known + "-" + CurrentCompRace[prefix].variant][prop];
						} else if (CurrentCompRace[prefix].known && RaceList[CurrentCompRace[prefix].known][prop] !== undefined) {//select the racial prop
							CurrentCompRace[prefix][prop] = RaceList[CurrentCompRace[prefix].known][prop];
						} else {//empty the prop
							CurrentCompRace[prefix][prop] = "";
						}
					}
				}
			}
		}
		if (inputcreatxt) { //if there was an input, return if it was different from the previously known or not
			if (CurrentCompRace[prefix] && CurrentCompRace[prefix].known && oldKnown !== CurrentCompRace[prefix].known) tDoc.getField(prefix + "Comp.Race").submitName = inputcreatxt;
			return CurrentCompRace[prefix] ? (oldKnown === CurrentCompRace[prefix].known || !CurrentCompRace[prefix].known) : true;
		}
	}
}

//a function to remove the strings added to Cnote.Left when making a familiar or mount
function resetCompTypes(prefix) {
	var theType = What(prefix + "Companion.Remember");
	if (!theType) return;
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Resetting the companion back to its default...");
	calcStop();
	RemoveString(prefix + "Cnote.Left", compString[theType].string);
	RemoveString(prefix + "Comp.Use.Features", compString[theType].featurestring);
	for (var i = 0; i < compString[theType].actions.length; i++) {
		RemoveAction(compString[theType].actions[i][0], compString[theType].actions[i][1]);
	}
	
	if (theType === "mount" || theType === "mechanicalserv") {
		//reset the languages
		var removeLangs = What(prefix + "Comp.Use.Features").match(/\u25C6 languages:.*/i);
		if (CurrentCompRace[prefix] && CurrentCompRace[prefix].known && removeLangs && CurrentCompRace[prefix].languages) {
			removeLangs = removeLangs[0];
			if (CurrentCompRace[prefix].typeFound === "race") {
				//make a string of the languages known to the features
				var languageString = "\u25C6 " + "Languages: ";
				var theEnd = CurrentCompRace[prefix].languages.length - 1;
				for (var l = 0; l <= theEnd; l++) {
					var divider = l === 0 ? "" : l === theEnd ? " and " : ", ";
					languageString += divider + CurrentCompRace[prefix].languages[l];
					languageString += l === theEnd ? "." : "";
				}
			} else if (CurrentCompRace[prefix].typeFound === "creature") {
				var languageString = "\u25C6 Languages: " + CurrentCompRace[prefix].languages + ".";
			}
			ReplaceString(prefix + "Comp.Use.Features", languageString, true, removeLangs, true);
		} else if (removeLangs) {
			RemoveString(prefix + "Comp.Use.Features", removeLangs[0]);
		}
	}
	
	if (CurrentCompRace[prefix] && CurrentCompRace[prefix].known && theType === "mount") {
		//reset the intelligence if the original creature had less than 6
		if (CurrentCompRace[prefix].typeFound === "creature" && CurrentCompRace[prefix].scores[3] < 6) {
			Value(prefix + "Comp.Use.Ability.Int.Score", CurrentCompRace[prefix].scores[3])
		}
	} else if (theType === "familiar" && CurrentCompRace[prefix] && CurrentCompRace[prefix].typeFound === "creature" && CurrentCompRace[prefix].attacks) {
		Value(prefix + "Comp.Use.Attack.perAction", CurrentCompRace[prefix].attacksAction); //set attacks per action
		//add any weapons the creature possesses
		for (var a = 0; a < CurrentCompRace[prefix].attacks.length; a++) {
			AddWeapon(CurrentCompRace[prefix].attacks[a].name);
		}
	} else if (theType === "companion") {
		UpdateRangerCompanions("delete");
	} else if (theType === "companionrr") {
		UpdateRevisedRangerCompanions("delete");
	} else if (theType === "mechanicalserv") {
		if (CurrentCompRace[prefix] && CurrentCompRace[prefix].known) {
			Value(prefix + "Comp.Desc.MonsterType", CurrentCompRace[prefix].type);
		};
		
		var removeDamI = What(prefix + "Comp.Use.Features").match(/\u25C6 damage immunities:.*/i);
		if (removeDamI && CurrentCompRace[prefix] && CurrentCompRace[prefix].known && CurrentCompRace[prefix].damage_immunities) {
			ReplaceString(prefix + "Comp.Use.Features", "\u25C6 Damage Immunities: " + CurrentCompRace[prefix].damage_immunities + ".", true, removeDamI[0], true);
		} else if (removeDamI) {
			RemoveString(prefix + "Comp.Use.Features", removeDamI[0]);
		};
		
		var removeConI = What(prefix + "Comp.Use.Features").match(/\u25C6 condition immunities:.*/i);
		if (removeConI && CurrentCompRace[prefix] && CurrentCompRace[prefix].known && CurrentCompRace[prefix].condition_immunities) {
			ReplaceString(prefix + "Comp.Use.Features", "\u25C6 Damage Immunities: " + CurrentCompRace[prefix].condition_immunities + ".", true, removeConI[0], true);
		} else if (removeConI) {
			RemoveString(prefix + "Comp.Use.Features", removeConI[0]);
		};
		
		var removeDarkv = What(prefix + "Comp.Use.Senses").match(/darkvision \d+.?\d*.?(ft|m)/i);
		if (removeDarkv && CurrentCompRace[prefix] && CurrentCompRace[prefix].known && (/darkvision \d+.?\d*.?ft/i).test(CurrentCompRace[prefix].vision + CurrentCompRace[prefix].senses)) {
			var creaDarkv = (CurrentCompRace[prefix].vision + CurrentCompRace[prefix].senses).match(/darkvision \d+.?\d*.?ft/i)[0];
			if (What("Unit System") === "metric") creaDarkv = ConvertToMetric(creaDarkv, 0.5);
			ReplaceString(prefix + "Comp.Use.Senses", creaDarkv, ";", removeDarkv[0], true);
		} else if (removeDarkv) {
			RemoveString(prefix + "Comp.Use.Senses", removeDarkv[0], ";");
		};
	}
	Value(prefix + "Companion.Remember", "", "");
	thermoM(thermoTxt, true); // Stop progress bar
}

//add a creature to the companion page
function ApplyCompRace(newRace) {
	if (IsSetDropDowns) return; // when just changing the dropdowns, don't do anything
	if (event.target && event.target.name.indexOf("Comp.Race") !== -1 && newRace.toLowerCase() === event.target.value.toLowerCase()) return; //no changes were made

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying companion race...");
	calcStop();
	
	var prefix = getTemplPre(event.target.name, "AScomp", true);
	
	var resetDescTooltips = function() {
		AddTooltip(prefix + "Comp.Desc.Height", "");
		AddTooltip(prefix + "Comp.Desc.Weight", "");
		AddTooltip(prefix + "Comp.Desc.Age", "");
	}
	
	var compFields = [
		prefix + "Comp.Use",
		prefix + "Text.Comp.Use",
		prefix + "BlueText.Comp.Use"
	];

	//reset all the fields if the input is nothing
	if (newRace === "") {
		thermoTxt = thermoM("Resetting the companion page...", false); //change the progress dialog text
		CurrentCompRace[prefix] = {}; //reset the global variable to nothing
		tDoc.resetForm(compFields); //rest all the fields
		thermoM(1/3); //increment the progress dialog's progress
		resetDescTooltips(); //remove descriptive tooltips
		resetCompTypes(prefix); //remove strings
		thermoM(2/3); //increment the progress dialog's progress
		tDoc.getField(prefix + "Comp.Race").submitName = "";
		thermoM(thermoTxt, true); // Stop progress bar
		return; //don't do the rest of the function
	}
	if (FindCompRace(newRace, prefix)) { //fill the global variable. If the return is true, it means that no (new) race was found, so the function can be stopped
		thermoM(thermoTxt, true); // Stop progress bar
		return; //don't do the rest of the function
	}
	resetCompTypes(prefix); //remove stuff from the companion type (actions, strings, etc.)
	if (CurrentCompRace[prefix].typeFound === "race") {// do the following if a race was found
		tDoc.resetForm(compFields); //reset all the fields
		thermoTxt = thermoM("Adding the companion's player race...", false); //change the progress dialog text
		
		//set descriptive tooltips
		var theHeight = What("Unit System") === "imperial" ? CurrentCompRace[prefix].height : CurrentCompRace[prefix].heightMetric ? CurrentCompRace[prefix].heightMetric : CurrentCompRace[prefix].height;
		var theWeight = What("Unit System") === "imperial" ? CurrentCompRace[prefix].weight : CurrentCompRace[prefix].weightMetric ? CurrentCompRace[prefix].weightMetric : CurrentCompRace[prefix].weight;
		AddTooltip(prefix + "Comp.Desc.Height", CurrentCompRace[prefix].plural + theHeight);
		AddTooltip(prefix + "Comp.Desc.Weight", CurrentCompRace[prefix].plural + theWeight);
		AddTooltip(prefix + "Comp.Desc.Age", CurrentCompRace[prefix].plural + CurrentCompRace[prefix].age);
		
		thermoM(1/11); //increment the progress dialog's progress
		
		//set race's size
		PickDropdown(prefix + "Comp.Desc.Size", CurrentCompRace[prefix].size);

		//set race's type
		Value(prefix + "Comp.Desc.MonsterType", "Humanoid");
		
		//set racial traits
		var theTraits = What("Unit System") === "imperial" ? CurrentCompRace[prefix].trait : ConvertToMetric(CurrentCompRace[prefix].trait, 0.5);
		Value(prefix + "Comp.Use.Traits", theTraits);
		
		thermoM(2/11); //increment the progress dialog's progress
		
		//set speed
		var raceSpeed = CurrentCompRace[prefix].speed;
		if (isArray(raceSpeed)) { //legacy
			var theSpeed = isNaN(raceSpeed[0]) ? raceSpeed[0] : raceSpeed[0] + " ft";
		} else {
			var theSpeed = raceSpeed.walk && raceSpeed.walk.spd ? raceSpeed.walk.spd + " ft" : "";
			for (aSpeed in raceSpeed) {
				var Spd = raceSpeed[aSpeed].spd;
				if (!Spd || aSpeed === "walk") continue;
				theSpeed += (aSpeed ? ",\n" : "") + aSpeed + " " + Spd + " ft";
			};
		};
		theSpeed = What("Unit System") === "imperial" ? theSpeed : ConvertToMetric(theSpeed, 0.5);
		Value(prefix + "Comp.Use.Speed", theSpeed);
		
		thermoM(3/11); //increment the progress dialog's progress
		
		//set senses
		if (CurrentCompRace[prefix].vision) {
			var theSenseStr = "";
			var theSenses = CurrentCompRace[prefix].vision;
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
		if (CurrentCompRace[prefix].languageProfs) {
			var theLangs = [];
			for (var l = 0; l < CurrentCompRace[prefix].languageProfs.length; l++) {
				var aLang = CurrentCompRace[prefix].languageProfs[l];
				if (isNaN(aLang)) {
					theLangs.push(aLang);
				} else {
					theLangs.push("+" + aLang);
				};
			};
			var languageString = formatLineList("\u25C6 Languages:", theLangs);
			AddString(prefix + "Comp.Use.Features", languageString, true);
		};
		
		thermoM(5/11); //increment the progress dialog's progress
		
		//add a string of the saveText to the features
		if (CurrentCompRace[prefix].savetxt) {
			if (typeof CurrentCompRace[prefix].savetxt === "string") {
				var svString = "\u25C6 Saving Throws:" + CurrentCompRace[prefix].savetxt + ".";
			} else {
				var svObj = CurrentCompRace[prefix].savetxt;
				var svString = "";
				if (svObj.text) {
					svString += svString ? "; " : "\u25C6 Saving Throws:";
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
		
		//add a string of any resistances to the features
		if (CurrentCompRace[prefix].dmgres) {
			var dmgresString = "\u25C6 " + "Damage Resistances: ";
			theEnd = CurrentCompRace[prefix].dmgres.length - 1;
			for (var l = 0; l <= theEnd; l++) {
				var divider = l === 0 ? "" : l === theEnd ? " and " : ", ";
				dmgresString += divider + CurrentCompRace[prefix].dmgres[l];
				dmgresString += l === theEnd ? "." : "";
			}
			AddString(prefix + "Comp.Use.Features", dmgresString, true);
		};
		
		thermoM(7/11); //increment the progress dialog's progress
		
		//add a string of any weapon proficiencies to the features
		if (CurrentCompRace[prefix].weaponprofs) {
			var weaponString = "\u25C6 " + "Weapon Proficiencies: ";
			var theWeaponArray = [];
			if (CurrentCompRace[prefix].weaponprofs[0]) theWeaponArray.push("simple weapons");
			if (CurrentCompRace[prefix].weaponprofs[1]) theWeaponArray.push("martial weapons");
			theWeaponArray = theWeaponArray.concat(CurrentCompRace[prefix].weaponprofs[2]);
			theEnd = theWeaponArray.length - 1;
			for (var l = 0; l <= theEnd; l++) {
				var divider = l === 0 ? "" : l === theEnd ? " and " : ", ";
				weaponString += divider + theWeaponArray[l];
				weaponString += l === theEnd ? "." : "";
			}
			AddString(prefix + "Comp.Use.Features", weaponString, true);
		};
		
		thermoM(8/11); //increment the progress dialog's progress
		
		//add a string of any tool proficiencies to the features
		if (CurrentCompRace[prefix].toolProfs) {
			var theTools = [];
			for (var l = 0; l < CurrentCompRace[prefix].toolProfs.length; l++) {
				var aTool = CurrentCompRace[prefix].toolProfs[l];
				if (isArray(aTool)) {
					if (!isNaN(aTool[1]) && Number(aTool[1]) > 1) {
						theTools.push(aTool[1] + " \u00d7 " + aTool[0]);
					} else {
						theTools.push(aTool[0]);
					};
				} else {
					theTools.push(aTool);
				};
			};
			var toolString = formatLineList("\u25C6 Tool Proficiencies:", theTools);
			AddString(prefix + "Comp.Use.Features", toolString, true);
		};
		
		thermoM(9/11); //increment the progress dialog's progress
		
		//add skill proficiencies
		if (CurrentCompRace[prefix].skills) {
			for (var i = 0; i < CurrentCompRace[prefix].skills.length; i++) {
				AddSkillProf(CurrentCompRace[prefix].skills[i]);
			}
		};
		
		thermoM(10/11); //increment the progress dialog's progress
		
		//add weapons and armor
		if (CurrentCompRace[prefix].weapons) {
			for (i = 0; i < CurrentCompRace[prefix].weapons.length; i++) {
				AddWeapon(CurrentCompRace[prefix].weapons[i]);
			}
		};
		if (CurrentCompRace[prefix].addarmor) AddArmor(CurrentCompRace[prefix].addarmor, true, prefix);
	} else if (CurrentCompRace[prefix].typeFound === "creature") {// do the following if a creature was found
		thermoTxt = thermoM("Adding the companion creature...", false); //change the progress dialog text
		resetDescTooltips(); //remove descriptive tooltips
		tDoc.resetForm(compFields); //reset all the fields
		
		//add the size
		PickDropdown(prefix + "Comp.Desc.Size", CurrentCompRace[prefix].size);

		//set race's type
		var typeString = CurrentCompRace[prefix].subtype ? CurrentCompRace[prefix].type + " (" + CurrentCompRace[prefix].subtype + ")" : CurrentCompRace[prefix].type;
		Value(prefix + "Comp.Desc.MonsterType", typeString);
		
		//set senses
		var theSenses = What("Unit System") === "imperial" ? CurrentCompRace[prefix].senses : ConvertToMetric(CurrentCompRace[prefix].senses, 0.5);
		Value(prefix + "Comp.Use.Senses", theSenses);
		
		Value(prefix + "Comp.Desc.Alignment", CurrentCompRace[prefix].alignment); //set alignment
		Value(prefix + "Comp.Use.Proficiency Bonus", CurrentCompRace[prefix].proficiencyBonus); //set proficiency bonus
		Value(prefix + "Comp.Use.Attack.perAction", CurrentCompRace[prefix].attacksAction); //set attacks per action
		Value(prefix + "Comp.Use.AC", CurrentCompRace[prefix].ac); //set AC
		Value(prefix + "Comp.Use.HP.Max", CurrentCompRace[prefix].hp); //set HP
		Value(prefix + "Comp.Use.HD.Level", CurrentCompRace[prefix].hd[0]); //set HD #
		Value(prefix + "Comp.Use.HD.Die", CurrentCompRace[prefix].hd[1]); //set HD die
		
		//add ability scores
		for (var a = 0; a < AbilityScores.abbreviations.length; a++) {
			Value(prefix + "Comp.Use.Ability." + AbilityScores.abbreviations[a] + ".Score", CurrentCompRace[prefix].scores[a]);
		}
		
		thermoM(1/10); //increment the progress dialog's progress
		
		//add speed
		var theSpeed = What("Unit System") === "imperial" ? CurrentCompRace[prefix].speed : ConvertToMetric(CurrentCompRace[prefix].speed, 0.5);
		Value(prefix + "Comp.Use.Speed", theSpeed);
		
		thermoM(2/10); //increment the progress dialog's progress
		
		//add any weapons the creature possesses
		for (var a = 0; a < CurrentCompRace[prefix].attacks.length; a++) {
			AddWeapon(CurrentCompRace[prefix].attacks[a].name);
		}
		
		thermoM(3/10); //increment the progress dialog's progress
		
		//calculate the ability score modifiers
		var mods = [];
		for (var i = 0; i < CurrentCompRace[prefix].scores.length; i++) {
			mods[i] = Math.round((CurrentCompRace[prefix].scores[i] - 10.5) * 0.5);
		}
		
		thermoM(4/10); //increment the progress dialog's progress
		
		//add skill proficiencies
		if (CurrentCompRace[prefix].skills) {
			for (var aSkill in CurrentCompRace[prefix].skills) {
				var profSkill = CompSkillRefer(aSkill, CurrentCompRace[prefix].skills[aSkill], CurrentCompRace[prefix].scores, CurrentCompRace[prefix].proficiencyBonus);
				AddSkillProf(profSkill[0], profSkill[1] !== "nothing", profSkill[1] === "expertise"); //set the proficiency
				Value(prefix + "BlueText.Comp.Use.Skills." + profSkill[0] + ".Bonus", profSkill[2]); //set the bonus
			}
		}
		
		thermoM(5/10); //increment the progress dialog's progress
		
		//add saving throw proficiencies
		for (var s = 0; s < CurrentCompRace[prefix].saves.length; s++) {
			if (CurrentCompRace[prefix].saves[s] !== "") {//only do something if a value is detected
				var saveFld = "Comp.Use.Ability." + AbilityScores.abbreviations[s] + ".ST";
				Checkbox(prefix + saveFld + ".Prof"); //set the save as proficient
				Value(prefix + "BlueText." + saveFld + ".Bonus", CurrentCompRace[prefix].saves[s] - mods[s] - CurrentCompRace[prefix].proficiencyBonus);
			}
		}
		
		//add features
		if (CurrentCompRace[prefix].damage_vulnerabilities) {
			var tempString = "\u25C6 Damage Vulnerabilities: " + CurrentCompRace[prefix].damage_vulnerabilities + ".";
			AddString(prefix + "Comp.Use.Features", tempString, true);
		}
		if (CurrentCompRace[prefix].damage_resistances) {
			var tempString = "\u25C6 Damage Resistances: " + CurrentCompRace[prefix].damage_resistances + ".";
			AddString(prefix + "Comp.Use.Features", tempString, true);
		}
		if (CurrentCompRace[prefix].damage_immunities) {
			var tempString = "\u25C6 Damage Immunities: " + CurrentCompRace[prefix].damage_immunities + ".";
			AddString(prefix + "Comp.Use.Features", tempString, true);
		}
		if (CurrentCompRace[prefix].condition_immunities) {
			var tempString = "\u25C6 Condition Immunities: " + CurrentCompRace[prefix].condition_immunities + ".";
			AddString(prefix + "Comp.Use.Features", tempString, true);
		}
		if (CurrentCompRace[prefix].languages) {
			var tempString = "\u25C6 Languages: " + CurrentCompRace[prefix].languages + ".";
			AddString(prefix + "Comp.Use.Features", tempString, true);
		}
		
		thermoM(6/10); //increment the progress dialog's progress
		
		//add features
		if (CurrentCompRace[prefix].features) {
			for (var t = 0; t < CurrentCompRace[prefix].features.length; t++) {
				var featureString = "\u25C6 " + CurrentCompRace[prefix].features[t].name + ": ";
				featureString += CurrentCompRace[prefix].features[t].description;
				AddString(prefix + "Comp.Use.Features", featureString, true);
			}
		}
		
		thermoM(7/10); //increment the progress dialog's progress
		
		//add actions
		if (CurrentCompRace[prefix].actions) {
			for (var t = 0; t < CurrentCompRace[prefix].actions.length; t++) {
				var actionString = "\u25C6 " + CurrentCompRace[prefix].actions[t].name + ": ";
				actionString += CurrentCompRace[prefix].actions[t].description;
				AddString(prefix + "Comp.Use.Traits", actionString, true);
			}
		}
		
		thermoM(8/10); //increment the progress dialog's progress
		
		//add traits
		if (CurrentCompRace[prefix].traits) {
			for (var t = 0; t < CurrentCompRace[prefix].traits.length; t++) {
				var traitString = "\u25C6 " + CurrentCompRace[prefix].traits[t].name + ": ";
				traitString += CurrentCompRace[prefix].traits[t].description;
				AddString(prefix + "Comp.Use.Traits", traitString, true);
			}
		}
		
		thermoM(9/10); //increment the progress dialog's progress
		
		//convert to metric, if applicable
		if (What("Unit System") === "metric") {
			if (What(prefix + "Comp.Use.Traits")) Value(prefix + "Comp.Use.Traits", ConvertToMetric(What(prefix + "Comp.Use.Traits"), 0.5));
			if (What(prefix + "Comp.Use.Features")) Value(prefix + "Comp.Use.Features", ConvertToMetric(What(prefix + "Comp.Use.Features"), 0.5));
		}
	}
	
	SetHPTooltip();
	thermoM(thermoTxt, true); // Stop progress bar
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

//calculate the skill modifier on the companion page (field calculation)
function CalcSkillComp() {
	var eName = event.target.name;
	var Skill = eName.replace(/.+(Skills|Combat)\.(.+?)\..+/, "$2");
	var alphaB = Who("Text.SkillsNames") === "alphabeta";
	var skillLookup = alphaB ? SkillsList.abilityScores : SkillsList.abilityScoresByAS;
	var Ability = skillLookup[SkillsList.abbreviations.indexOf(Skill)];
	var prefix = eName.substring(0, eName.indexOf("Comp."));
	var Mod = What(prefix + "Comp.Use.Ability." + Ability + ".Mod");
	var blueTxt = Skill === "Init" ? "" : "BlueText.";
	
	var ProfBonus = 0;
	if (Skill !== "Init" && (eName.indexOf(".Pass") !== -1 || tDoc.getField(prefix + "BlueText.Comp.Use.Proficiency Bonus Dice").isBoxChecked(0) === 0)) {
		if (!typePF) {
			switch(What(eName.replace("Comp.", "Text.Comp.").replace("Mod", "Prof").replace(".Pass", ""))) {
				case "proficient" :
					ProfBonus = What(prefix + "Comp.Use.Proficiency Bonus");
					break;
				case "expertise" :
					ProfBonus = parseFloat(What(prefix + "Comp.Use.Proficiency Bonus")) * 2;
					break;
			}
		} else {
			if (tDoc.getField(eName.replace("Mod", "Prof").replace("Perc.Pass", alphaB ? "Perc" : "Perf")).isBoxChecked(0)) {
				ProfBonus += What(prefix + "Comp.Use.Proficiency Bonus");
				if (tDoc.getField(eName.replace("Mod", "Exp").replace("Perc.Pass", alphaB ? "Perc" : "Perf")).isBoxChecked(0)) {
					ProfBonus += What(prefix + "Comp.Use.Proficiency Bonus");
				}
			}
		}
	}

	var ExtraBonus = EvalBonus(What(eName.replace("Comp.", blueTxt + "Comp.").replace("Mod", "Bonus").replace("Perc.Pass", alphaB || !typePF ? "Perc" : "Perf")), prefix);

	var AllBonus = Skill === "Init" ? 0 : EvalBonus(What(prefix + "BlueText.Comp.Use.Skills.All.Bonus"), prefix);
	
	var isPP = eName.indexOf("Pass") !== -1 ? 10 : 0;
	var PassBonus = !isPP ? 0 : EvalBonus(What(eName.replace("Comp.", "BlueText.Comp.").replace("Mod", "Bonus")), prefix);
	
	event.value = Mod === "" ? "" : Number(isPP) + Number(PassBonus) + Number(Mod) + Number(ExtraBonus) + Number(ProfBonus) + Number(AllBonus);
};

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

		//parse the weapons into tempArray
		for (var j = startArray; j < endArray; j++) {
			tempString = CurrentWeapons.compField[prefix][j];
			tempArray[j] = [];
			var compAttackFound = false;
			if (isCompRace) { //if a creature is found, check to see if attack entered matches one of the creature's attacks
				tempArray[j][0] = parseCompWeapon(tempString, prefix);
				compAttackFound = tempArray[j][0] !== "";
			}
			
			if (!compAttackFound) { //if not a comprace or nothing was found above
				//see if the field contains a known weapon
				tempArray[j][0] = ParseWeapon(tempString);
			}

			//add magical bonus, denoted by a "+" or "-"
			var magicBonus = parseFloat(tempString.match(/(^|\s)[\+|-]\d+/i));
			tempArray[j][1] = !isNaN(magicBonus) ? magicBonus : 0;
			
			//add the true/false switch for adding ability score to damage or not
			if (!compAttackFound && tempArray[j][0]) {
				tempArray[j][2] = WeaponsList[tempArray[j][0]].abilitytodamage;
			} else if (compAttackFound) {
				var compMod = CurrentCompRace[prefix].attacks[tempArray[j][0]].modifiers;
				tempArray[j][2] = compMod && compMod[2] !== "" ? compMod[2] : true;
			}
			//put tempArray in known
			CurrentWeapons.compKnown[prefix][j] = tempArray[j];
		}
	}
};

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

	var oldCrea = ParseCreature(event.target.value.toLowerCase());	
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
	var creaProfBcalc = theCrea.proficiencyBonus;
	var charProfBcalc = What("Proficiency Bonus");
	var creaProfBfix = theCrea.proficiencyBonus;
	var charProfBfix = What("Proficiency Bonus");
	
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
	
	//add ability scores
	for (var a = 0; a < AbilityScores.abbreviations.length; a++) {
		Value(prefix + "Wildshape." + Fld + ".Ability." + AbilityScores.abbreviations[a] + ".Score", scores[a]);
	}

	thermoM(2/10); //increment the progress dialog's progress
	
	//add the size
	PickDropdown(prefix + "Wildshape." + Fld + ".Size", theCrea.size);
	
	//set race's type
	var typeString = theCrea.subtype ? theCrea.type + " (" + theCrea.subtype + ")" : theCrea.type;
	Value(prefix + "Wildshape." + Fld + ".MonsterType", typeString);
	
	//set speed
	var theSpeed = What("Unit System") === "imperial" ? theCrea.speed : ConvertToMetric(theCrea.speed, 0.5);
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
	for (var aClass in CurrentClasses) {
		for (var pop in CurrentClasses[aClass].features) {
			var fea = CurrentClasses[aClass].features[pop];
			if ((/armor of peace|unarmored defense|draconic resilience|durability/i).test(fea.name) && (/ AC /).test(fea.description) && fea.minlevel <= classes.known[aClass].level) {
				var newAC = fea.description.match(/\d+ ?\+/);
				newAC = Number(newAC ? newAC[0].replace(/ ?\+/, "") : 10);
				var addAbi = fea.description.match(/\+ ?(Str|Dex|Con|Int|Wis|Cha)/ig);
				if (addAbi) { for (var aA = 0; aA < addAbi.length; aA++) {
					newAC += mods[AbilityScores.abbreviations.indexOf(addAbi[aA].replace(/\+ ?/, ""))];
				}; };
				if (newAC) {
					theAC.push(newAC);
					theACtt.push("\n\nThe AC used here is calculated using " + fea.name + " (" + CurrentClasses[aClass].fullname + ")");
				}
			}
		}
	}
	if (CurrentArmour.known && CurrentArmour.mod) {
		var newAC = ArmourList[CurrentArmour.known].ac;
		if (CurrentArmour.mod) newAC += mods[AbilityScores.abbreviations.indexOf(CurrentArmour.mod.replace(/ Mod/i, ""))];
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

		//see if the creature has proficiency/expertise in it, and any possible bonuses
		var saveCrea = [
			theCrea.saves[s] !== "" ? "proficient" : "nothing",
			theCrea.saves[s] !== "" ? creaProfBcalc : 0,
			theCrea.saves[s] !== "" ? theCrea.saves[s] - Math.round((theCrea.scores[s] - 10.5) * 0.5) - creaProfBfix : 0
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
			var saveBonus = theCrea.saves[s] !== "" ? Math.max(theCrea.saves[s], What(saveAbi + " ST Mod")) : Math.max(saveMod, What(saveAbi + " ST Mod"));
		} else {			
			//calculate the skill bonus with the highest proficiency bonus
			var saveBonus = saveMod + Math.max(saveCrea[1] + saveCrea[2], saveChar[1]) + saveChar[2] + saveChar[3];
		}
		Value(saveFlds[1], saveBonus);
	}
	
	thermoM(6/10); //increment the progress dialog's progress
	
	//add attacks
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
		tohitProfB = tDoc.getField("Proficiency Bonus Dice").isBoxChecked(0) === 1 ? 0 : tohitProfB;
		var tohitString = atk.dc ? "DC " + (8 + tohitProfB + atkMod) : tohitProfB + atkMod;
		tohitString += atk.tohit ? "" : (!atkAlt[0] ? 0 : (!isNaN(atkAlt[0]) ? atkAlt[0] : mods[AbilityScores.abbreviations.indexOf(atkAlt[0])])); //add a modifier, if defined
		tohitString = !isNaN(tohitString) && tohitString > 0 ? "+" + tohitString : tohitString;
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
	var traitsFld = prefix + "Wildshape." + Fld + ".Traits";
	if (theCrea.wildshapeString) {
		Value(traitsFld, theCrea.wildshapeString)
	} else {
/* 		if (theCrea.languages) {
			var tempString = "\u25C6 Languages: " + theCrea.languages + ".";
			AddString(traitsFld, tempString, true);
		} */
		var sensesToAdd = theCrea.senses.replace(/(\; )?Adv\..+(hearing|sight|smell)/i, ""); //avoid duplicating the information with regards to the keen hearing/sight/smell traits
		if (sensesToAdd) {
			AddString(traitsFld, "\u25C6 Senses: " + sensesToAdd, true); //set senses
		}	
		//add resistances & immunities
		if (theCrea.damage_vulnerabilities) {
			var tempString = "\u25C6 Damage Vulnerabilities: " + theCrea.damage_vulnerabilities + ".";
			AddString(traitsFld, tempString, true);
		}
		if (theCrea.damage_resistances) {
			var tempString = "\u25C6 Damage Resistances: " + theCrea.damage_resistances + ".";
			AddString(traitsFld, tempString, true);
		}
		if (theCrea.damage_immunities) {
			var tempString = "\u25C6 Damage Immunities: " + theCrea.damage_immunities + ".";
			AddString(traitsFld, tempString, true);
		}
		if (theCrea.condition_immunities) {
			var tempString = "\u25C6 Condition Immunities: " + theCrea.condition_immunities + ".";
			AddString(traitsFld, tempString, true);
		}
		//add actions
		if (theCrea.actions) {
			for (var t = 0; t < theCrea.actions.length; t++) {
				var actionString = "\u25C6 " + theCrea.actions[t].name + ": ";
				actionString += theCrea.actions[t].description;
				AddString(traitsFld, actionString, true);
			}
		}
		//add traits
		if (theCrea.traits) {
			for (var t = 0; t < theCrea.traits.length; t++) {
				var traitString = "\u25C6 " + theCrea.traits[t].name + ": ";
				traitString += theCrea.traits[t].description;
				AddString(traitsFld, traitString, true);
			}
		}
	}
	
	thermoM(8/10); //increment the progress dialog's progress
	
	//convert to metric, if applicable
	if (What("Unit System") === "metric") {
		if (What(traitsFld)) Value(traitsFld, ConvertToMetric(What(traitsFld), 0.5));
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

//add a wild shape to the top most empty place
function AddWildshape(input) {
	var prefixA = What("Template.extras.WSfront").split(",").splice(1);
	for (var n = 1; n <= 2; n++) {
		for (var p = 0; p < prefixA.length; p++) {
			var prefix = prefixA[p];
			for (var i = 1; i <= 4; i++) {
				next = tDoc.getField(prefix + "Wildshape.Race." + i);
				if (n === 1 && next.value.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
					return; //the value was found to already exist
				} else if (n === 2 && (next.value === "" || next.value.toLowerCase().indexOf("make a selection") !== -1)) {
					next.value = input;
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
		if ((!(/^(air|earth|fire|water) elemental$/i).test(crea) && thisCrea.type !== "Beast") || allCrea.keys[thisCrea.name] || testSource(crea, thisCrea, "creaExcl")) {
			continue; //go on to the next creature if the creature is not a beast or its source isn't excluded
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
		AddWildshape(CreatureList[MenuSelection[1]].name);
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
function SetWildshapeDropdown() {
	var theList = [];

	for (var key in CreatureList) {
		if ((CreatureList[key].type === "Beast" && eval(CreatureList[key].challengeRating) <= 6) || (/^(air|earth|fire|water) elemental$/i).test(key)) {
			if (testSource(key, CreatureList[key], "creaExcl") || theList.indexOf(CreatureList[key].name) !== -1) continue;
			theList.push(CreatureList[key].name);
		}
	}
	theList.sort();
	
	theList.unshift("");
	if (!typePF) theList.unshift("Make a Selection");

	if (tDoc.getField("Wildshapes.Settings").submitName === theList.toSource()) return; //no changes, so no reason to do this
	tDoc.getField("Wildshapes.Settings").submitName = theList.toSource();

	var theString = "Type (or select) the name of the creature you want to calculate a Wild Shape for.";
	theString += "\n\n" + toUni("Not auto-updated") + "\nThe generated stats will not auto-update once you change something on the first page! They will only update when your druid level changes. You can have them re-calculated using the \"Wild Shape Options\" button at the top of this page.";
	theString += "\n\n" + toUni("First create the character") + "\nNote that nothing will happen if no character is defined on the 1st page.";
	theString += "\n\n" + toUni("Calculation is wrong") + "\nThe Wild Shape rules are open for interpertation and your DM might not approve with the way it is done here. You can change the calculation of proficiencies using the \"Wild Shape Options\" button at the top of this page.\nYou can always change the outcome yourself, because all of the fields are editable.";
	
	var WSfrontA = What("Template.extras.WSfront").split(",");
	for (var A = 0; A < WSfrontA.length; A++) {
		for (var i = 1; i <= 4; i++) {
			var theFld = WSfrontA[A] + "Wildshape.Race." + i;
			var theFldVal = What(theFld);
			tDoc.getField(theFld).setItems(theList);
			Value(theFld, theFldVal, theString);
		}
	}
}

//set the drop-down menus for companion race
function SetCompDropdown() {
	var theList = [""];
	
	for (var key in RaceList) {
		if (testSource(key, RaceList[key], "racesExcl")) continue;
		var raceNm = RaceList[key].sortname ? RaceList[key].sortname : RaceList[key].name.capitalize();
		if (theList.indexOf(raceNm) === -1) theList.push(raceNm);
	}
	theList.sort();
	
	var theListC = [""];
	for (var key in CreatureList) {
		if (testSource(key, CreatureList[key], "creaExcl")) continue;
		if (theListC.indexOf(CreatureList[key].name) === -1) theListC.push(CreatureList[key].name);
	}
	theListC.sort();
	
	theList = theList.concat(theListC);

	if (tDoc.getField("Companion.Remember").submitName === theList.toSource()) return; //no changes, so no reason to do this
	tDoc.getField("Companion.Remember").submitName = theList.toSource();
	
	var theString = "Type (or select) the name of the race you want to have on this page. Note that first a list of player races is given, followed by an alphabetical list of creatures. You are not limited by the names in the list. Just typing \"Drow\" will also be recognized, for example.";
	theString += "\n\n" + toUni("Selecting a creature") + "\nAll information of the creature will automatically be added. This includes ability scores, proficiencies, senses, weapons, etc. You can change the things afterwards.\nBecause not all creatures need the same amount of space for all their feature text,some fields may overflow. You can manually edit these fields so that everything is visible when printed (e.g. move things to the \"Noted\" below).";
	theString += "\n\n" + toUni("Selecting a player race") + "\nAll the same things as selecting a player race on the first page will happen, with the exception that no limited feature or ability DC is added as there is no room for that."
	theString += "\n\n" + toUni("Changing the race") + "\nIf you entered a race that was recognized and then change the entry to something that is not recognized, all the features and abilities of the recognized race will remain in place. This way, you can change the name of the race to something, while keeping the stats of something else. For example, you can choose \"Frog\" and then change it to \"Toad\", creating a toad with the stats of a frog.";
	
	var AScompA = What("Template.extras.AScomp").split(",");
	for (var A = 0; A < AScompA.length; A++) {
		var theFld = AScompA[A] + "Comp.Race";
		var theFldVal = What(theFld);
		tDoc.getField(theFld).setItems(theList);
		Value(theFld, theFldVal, theString);
	}
};

//Make menu for the button on the companion page and parse it to Menus.companion
function MakeCompMenu() {
	var prefix = getTemplPre(event.target.name, "AScomp", true);
	var usingRevisedRanger = ClassList.rangerua && !testSource("rangerua", ClassList.rangerua, "classExcl");
	var usingArtificer = SourceList["UA:A"] && CurrentSources.globalExcl.indexOf("UA:A") === -1;
	var menuLVL2 = function (menu, name, array) {
		var temp = {};
		var enabled = name[1] === "change" ? What(prefix + "Comp.Race") : true;
		temp.cName = name[0];
		if (!enabled) {
			temp.bEnabled = enabled;
		} else {
			temp.oSubMenu = [];
			for (var i = 0; i < array.length; i++) {
				if (name[1] === "visible") {
					var toShow = eval(What(prefix + "Companion.Layers.Remember"));
					var subMarked = array[i][1] === "comp.img" ? toShow[0] : toShow[1];
				} else if (name[1] === "change") {
					var subMarked = What(prefix + "Companion.Remember") === array[i][1];
				} else {
					var subMarked = What(prefix + "Companion.Remember") === name[1] && CurrentCompRace[prefix].known === array[i][1];
				}
				temp.oSubMenu.push({
					cName : array[i][0],
					cReturn : name[1] + "#" + array[i][1],
					bMarked : subMarked,
					bEnabled : array[i][1] === "no-mm" ? false : name[1] === "change" && (array[i][1] === "companion" || array[i][1] === "companionrr") && CurrentCompRace[prefix] && CurrentCompRace[prefix].typeFound !== "creature" ? false : true
				})
			}
		}
		menu.push(temp);
	};
	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			item.push({
				cName : array[i][0],
				cReturn : array[i][1] + "#" + "nothing"
			});
		}
	};

	var CompMenu = [], familiars = [], chainPact = [], mounts = [], steeds = [], companions = [], companionRR = [], mechanicalServs = [];
	var change = [
		["Into a familiar (Find Familiar spell)", "familiar"],
		["Into a Pact of the Chain familiar (Warlock feature)", "pact_of_the_chain"],
		["Into a mount (Find Steed spell)", "mount"]
	].concat(!SpellsList["find greater steed"] ? [] : [
		["Into a greater mount (Find Greater Steed spell)", "steed"]
	]).concat(!usingArtificer ? [] : [
		["Into a Mechanical Servant (Artificer feature)", "mechanicalserv"]
	]).concat([
		["Into a Ranger's Companion", usingRevisedRanger ? "companionrr" : "companion"],
		["-", "-"],
		["Reset to normal", "reset"]
	]);
	
	var visOptions = [
		["Show box for Companion's Appearance", "comp.img"],
		["Show Equipment section", "comp.eqp"]
	];
	
	//make a list of all the creatures
	for (var aCrea in CreatureList) {
		var theCrea = CreatureList[aCrea];
		if (testSource(aCrea, theCrea, "creaExcl")) continue; // test if the creature or its source isn't excluded
		if (theCrea.type === "Beast" && theCrea.size >= 3 && eval(theCrea.challengeRating) <= 1/4) {
			companions.push([theCrea.name, aCrea]);
		} else if (theCrea.type === "Beast" && theCrea.size === 2 && eval(theCrea.challengeRating) <= 2) {
			mechanicalServs.push([theCrea.name, aCrea]);
		};
		switch (theCrea.companion) {
			case "familiar_not_al" :
			if (isDisplay("DCI.Text")) break;
			case "familiar" :
				familiars.push([theCrea.name, aCrea]);
			case "pact_of_the_chain" :
				chainPact.push([theCrea.name, aCrea]);
				break;
			case "mount" :
				mounts.push([theCrea.name, aCrea]);
				break;
			case "steed" :
				steeds.push([theCrea.name, aCrea]);
				break;
			case "companion" :
				companionRR.push([theCrea.name, aCrea]);
				break;
		};
	};
	familiars.sort();
	chainPact.sort();
	mounts.sort();
	steeds.sort();
	companions.sort();
	companionRR.sort();
	mechanicalServs.sort();
	
	var noSrd = CurrentSources.globalExcl.indexOf("SRD") !== -1;
	var existMm = SourceList.M;
	if ((existMm && CurrentSources.globalExcl.indexOf("M") && noSrd) || (!existMm && noSrd)) { // the monster manual & SRD have been excluded from the sources
		var reminder = ["Be aware: the SRD " + (existMm ? "and Monster Manual are" : "is") + " excluded from the sources!", "no-mm"];
		familiars.unshift(reminder);
		chainPact.unshift(reminder);
		mounts.unshift(reminder);
		steeds.unshift(reminder);
		companions.unshift(reminder);
		companionRR.unshift(reminder);
		mechanicalServs.unshift(reminder);
	};
	
	menuLVL2(CompMenu, ["Create familiar (Find Familiar spell)", "familiar"], familiars);
	menuLVL2(CompMenu, ["Create familiar (Warlock Pact of the Chain)", "pact_of_the_chain"], chainPact);
	menuLVL2(CompMenu, ["Create mount (Find Steed spell)", "mount"], mounts);
	if (SpellsList["find greater steed"]) menuLVL2(CompMenu, ["Create greater mount (Find Greater Steed spell)", "steed"], steeds);
	if (usingArtificer) menuLVL2(CompMenu, ["Create Mechanical Servant (Artificer feature)", "mechanicalserv"], mechanicalServs);
	if (usingRevisedRanger) {
		menuLVL2(CompMenu, ["Create Revised Ranger's Companion", "companionrr"], companionRR);
	} else {
		menuLVL2(CompMenu, ["Create Ranger's Companion", "companion"], companions);
	};
	
	CompMenu.push({cName : "-"}); //add a divider
	menuLVL2(CompMenu, ["Change current creature", "change"], change);
	CompMenu.push({cName : "-"}); //add a divider
	menuLVL2(CompMenu, ["Change visible sections", "visible"], visOptions);
	menuLVL1(CompMenu, [["-", "-"], ["Reset this Companion page", "reset"], ["-", "-"], ["Add extra 'Companion' page", "add page"], [(prefix ? "Remove" : "Hide") + " this 'Companion' page", "remove page"]]);

	Menus.companion = CompMenu;
};

//call the companion menu and do something with the results
function CompOptions() {
	var MenuSelection = getMenu("companion");
	if (!MenuSelection || MenuSelection[0] == "nothing") return
	var prefix = getTemplPre(event.target.name, "AScomp", true);

	if (MenuSelection[0] === "reset") {
		// Start progress bar and stop calculations
		var thermoTxt = thermoM("Resetting the companion page...");
		calcStop();

		tDoc.resetForm([prefix + "Comp", prefix + "Text.Comp", prefix + "BlueText.Comp", prefix + "Cnote", prefix + "Companion"]); //reset all the fields

		thermoM(0.5); // Increment the progress bar

		ApplyAttackColor("", "", "Comp.", prefix); //reset the colour of the attack boxes
		SetHPTooltip();
		ShowCompanionLayer(prefix);
		ClearIcons(prefix + "Comp.img.Portrait", true); //reset the appearance image

		thermoTxt = thermoM("Applying...", false); // Change the progress bar text
	} else if (MenuSelection[0] === "add page") {
		DoTemplate("AScomp", "Add");
	} else if (MenuSelection[0] === "remove page") {
		//remove the prefix, if found, from the array in the remember field
		DoTemplate("AScomp", "Remove", prefix);
	} else if (MenuSelection[0] === "visible") {
		var toShow = eval(What(prefix + "Companion.Layers.Remember"));
		if (MenuSelection[1] === "comp.img") {
			toShow[0] = !toShow[0];
		} else if (MenuSelection[1] === "comp.eqp") {
			toShow[1] = !toShow[1];
		}
		Value(prefix + "Companion.Layers.Remember", toShow.toSource());
		ShowCompanionLayer(prefix);
	} else {
		if (MenuSelection[0] === "change" && MenuSelection[1] === "reset") {
			resetCompTypes(prefix);
		} else {
			if (MenuSelection[0] !== "change") {
				Value(prefix + "Comp.Race", CreatureList[MenuSelection[1]].name);
			}
			var type = MenuSelection[0] !== "change" ? MenuSelection[0] : MenuSelection[1];
			changeCompType(type, prefix);
		}
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

//change the creature on the companion page into the chosen form (familiar, mount, or pact of the chain familiar)
function changeCompType(inputType, prefix) {
	var oldType = What(prefix + "Companion.Remember");
	if (oldType) resetCompTypes(prefix);
	Value(prefix + "Companion.Remember", inputType); //set this so it can be called upon later
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Changing the companion to a predefined type...");
	calcStop();
	
	// a function to add the languages
	var addCharLangArr = function() {
		var creaLangs = What(prefix + "Comp.Use.Features").match(/\u25C6 languages:.*/i);
		if (creaLangs) creaLangs = creaLangs[0].replace(/\.$/, "");
		var charLanguages = [];
		for (var i = 1; i <= FieldNumbers.langstools; i++) {
			var charFld = What("Language " + i);
			if (charFld && (!creaLangs || creaLangs.toLowerCase().indexOf(charFld.toLowerCase()) === -1)) {
				charLanguages.push(charFld);
			};
		};
		if ((/mount|steed/i).test(inputType) && charLanguages.length > 1) {
			charLanguages = [AskUserOptions("Character's language the steed knows", "Find Greater Steed companion", charLanguages, "radio")];
		};
		var charLangs = charLanguages.length === 0 ? "" : (creaLangs ? "; and understands, but doesn't speak," : "\u25C6 Languages: Understands, but doesn't speak,");
		for (var i = 0; i < charLanguages.length; i++) {
			charLangs += i !== 0 && charLanguages.length > 2 ? ", " : " ";
			charLangs += i !== 0 && i === charLanguages.length - 1 ? "and " : "";
			charLangs += charLanguages[i];
		};
		if (creaLangs && charLangs) {
			ReplaceString(prefix + "Comp.Use.Features", creaLangs + charLangs, true, creaLangs, true);
		} else if (charLangs) {
			AddString(prefix + "Comp.Use.Features", charLangs + ".", true);
		};
	};
	
	switch (inputType) {
	 case "familiar" :
		tDoc.resetForm([prefix + "Comp.Use.Attack"]); // familiars can't make attacks
	 case "pact_of_the_chain" :
		Value(prefix + "Comp.Type", "Familiar");
		if (CurrentCompRace[prefix].type === "Beast") changeCompDialog(prefix); //change the type, but only if just a beast
		break;
	 case "companionrr" :
	 case "companion" :
		Value(prefix + "Comp.Type", "Companion");
		break;
	 case "mount" :
	 case "steed" :
		Value(prefix + "Comp.Type", "Mount");
		changeCompDialog(prefix); // change the type
		
		//add the new language options to the mount's features
		addCharLangArr();
		
		//set the Intelligence to 6 if less than 6
		var IntFld = prefix + "Comp.Use.Ability.Int.Score";
		if (What(IntFld) < 6) Value(IntFld, 6);
		break;
	 case "mechanicalserv" :
		Value(prefix + "Comp.Type", "Servant");
		Value(prefix + "Comp.Desc.MonsterType", "Construct");
		
		//add the new language options
		addCharLangArr();
		
		//add the new poison damage immunity
		var creaDamI = What(prefix + "Comp.Use.Features").match(/\u25C6 damage immunities:.*/i);
		if (!creaDamI || !(/poison/i).test(creaDamI)) {
			var newDamI = (creaDamI ? creaDamI[0].replace(/\.$/, ", ") : "\u25C6 Damage Immunities: ") + "poison.";
			if (creaDamI) {
				ReplaceString(prefix + "Comp.Use.Features", newDamI, true, creaDamI[0], true);
			} else {
				AddString(prefix + "Comp.Use.Features", newDamI, true);
			};
		};
		
		//add the new poisoned and charmed condition immunity
		var creaConI = What(prefix + "Comp.Use.Features").match(/\u25C6 condition immunities:.*/i);
		if (!creaConI) {
			var newConI = "\u25C6 Condition Immunities: charmed, poisoned.";
			AddString(prefix + "Comp.Use.Features", newConI, true);
		} else if (!(/poisoned/i).test(creaConI) || !(/charmed/i).test(creaConI)) {
			newConI = creaConI[0].replace(/\.$/, ", ");
			if (!(/charmed/i).test(creaConI)) {
				newConI += "charmed";
				var goCo = true;
			}
			if (!(/poisoned/i).test(creaConI)) newConI += (goCo ? ", " : "") + "poisoned";
			newConI += ".";
			ReplaceString(prefix + "Comp.Use.Features", newConI, true, creaConI[0], true);
		};
		
		//add the 60 ft darkvision, if not already there, or upgrade it to 60 ft
		var creaSens = What(prefix + "Comp.Use.Senses");
		var newDarkv = What("Unit System") === "metric" ? "Darkvision 18 m" : "Darkvision 60 ft";
		if (!(/darkvision \d+.?\d*.?(ft|m)/i).test(creaSens)) {
			AddString(prefix + "Comp.Use.Senses", newDarkv, "; ");
		} else if (!(/darkvision (60.?ft|18.?m)/i).test(creaSens)) {
			var darkvis = creaSens.match(/darkvision \d+.?\d*.?(ft|m)/i)[0];
			if (parseFloat(darkvis.match(/\d+/)[0]) < (What("Unit System") === "metric" ? 18 : 60)) {
				ReplaceString(prefix + "Comp.Use.Senses", newDarkv, true, darkvis, true);
			}
		};
		break;
	 default : 
		return; //don't do the rest of this function if inputType doesn't match one of the above
	};
	
	//add a string in the creature's feature section
	AddString(prefix + "Comp.Use.Features", compString[inputType].featurestring, true);
	
	//make the string for the spell/ability explanation
	AddString(prefix + "Cnote.Left", compString[inputType].string, true);
	
	//add any actions this spell/companion gives the character
	for (var i = 0; i < compString[inputType].actions.length; i++) {
		AddAction(compString[inputType].actions[i][0], compString[inputType].actions[i][1], compString[inputType].actionTooltip);
	};
	thermoM(0.7);
	//add level-dependent things if this is a ranger's companion
	if (inputType === "companion") {
		UpdateRangerCompanions();
	} else if (inputType === "companionrr") {
		UpdateRevisedRangerCompanions();
		if (IsNotImport) {
			app.alert({
				cMsg : toUni("Pick Two Skills") + "\nThe Ranger's Animal Companion that you have just added, gains proficiency with two additional skills as those already selected. Because there is no automation for selecting these proficiencies, please do it manually.\n\n" + toUni("Ability Score Improvements") + "\nThe Ranger's Animal Companion gains Ability Score Improvements whenever your character gains them. There is no automation for adding these either, so please don't forget to increase the ability scores for the animal companion when you get the reminder pop-up. Also, remember that any DCs for abilities that the beast possesses are based on ability scores and that they might need to be manually changed when changing the ability scores.\nThe 'Notes' section on the companion page automatically keeps track of how many points you can increase the ability scores and what the base value of those scores are according to the Monster Manual.",
				nIcon : 3,
				cTitle : "Don't forget the Skills and Ability Score Improvements!"
			});
		}
	}
	thermoM(thermoTxt, true); // Stop progress bar
};

//change the type of the creature on the companion page to one of either Celestial, Fey, or Fiend
function changeCompDialog(prefix) {
	if (!IsNotImport) return;
	//The dialog for setting the pages to print
	var theTxt = "A familiar or mount's type changes from beast to either celestial, fey, or fiend. Please select one.";
	var theDialog = {
		//variables to be set by the calling function
		bType : "Celestial",

		//when starting the dialog
		initialize : function (dialog) {
		},
		
		//when pressing the ok button
		commit : function (dialog) {
			var oResult = dialog.store();
			if (oResult["rCel"]) {
				this.bType = "Celestial";
			} else if (oResult["rFey"]) {
				this.bType = "Fey";
			} else if (oResult["rFie"]) {
				this.bType = "Fiend";
			}
		},

		description : {
			name : "Choose the type of your familiar/mount",
			elements : [{
				type : "view",
				elements : [{
					type : "static_text",
					item_id : "head",
					alignment : "align_fill",
					font : "heading",
					bold : true,
					height : 21,
					char_width : 30,
					name : "Choose the type of your familiar/mount"
				}, {
					type : "static_text",
					item_id : "txt0",
					wrap_name : true,
					alignment : "align_fill",
					font : "dialog",
					char_width : 30,
					name : theTxt
				}, {
					type : "cluster",
					align_children : "align_distribute",
					elements : [{
						type : "radio",
						item_id : "rCel",
						group_id : "Type",
						name : "Celestial"
					}, {
						type : "radio",
						item_id : "rFey",
						group_id : "Type",
						name : "Fey"
					}, {
						type : "radio",
						item_id : "rFie",
						group_id : "Type",
						name : "Fiend"
					}, ]
				}, {
					type : "gap",
					height : 8
				}, {
					type : "ok"
				}, ]
			}, ]
		}
	};
	
	app.execDialog(theDialog);
	
	Value(prefix + "Comp.Desc.MonsterType", theDialog.bType);
}

//update the wild shape header and all the different shapes on the all the wildshape pages
function WildshapeUpdate(inputArray) {
	var prefixA = What("Template.extras.WSfront").split(",");
	if (inputArray && inputArray[1]) {
		var wlvl = inputArray[0];
		var wUses = inputArray[1];
		var wRec = inputArray[2];
		var useString = isNaN(wUses) && (wUses.indexOf("\u221E") !== -1 || wUses.toLowerCase().indexOf("unlimited") !== -1) ? "Unlimited" : wUses + (!isNaN(wUses) ? "\u00D7" : "") + " per " + wRec;
		var wLimit = inputArray[3].match(/CR.+;/i);
		wLimit = wLimit ? "max " + wLimit[0].replace(";", "") : "";
		var wDur = inputArray[3].match(/\d+ hours?/i);
		wDur = wDur ? wDur[0] : "";
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
	colour = colour && isNaN(colour) ? colour.toLowerCase() : false;
	if (colour && colour !== "same as headers" && colour !== "same as dragon heads" && !ColorList[colour]) {
		return;
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
			case "same as headers" :
				DCcolor = What("Color.Theme");
				break;
			case "same as dragon heads" :
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

//Make menu for the button on each Action line and parse it to Menus.actions
function MakeActionMenu() {
	var actionMenu = [];
	var itemNmbr = parseFloat(event.target.name.slice(-2));
	var type = event.target.name.match(/bonus action|reaction|action/i)[0].toLowerCase();
	var maxNmbr = type === "action" ? FieldNumbers.trueactions : FieldNumbers.actions;
	var theField = What(type.capitalize() + " " + itemNmbr);

	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			var enabled = true;
			if ((array[i] === "Move up" && itemNmbr === 1) || (array[i] === "Move down" && itemNmbr === maxNmbr) || (array[i] === "Insert empty " + type && (!theField || itemNmbr === maxNmbr))) {
				enabled = false;
			}
			var extraName = "";
			if (array[i] === "Move down" && itemNmbr === (maxNmbr - 6)) {
				extraName = " (to overflow page)";
			} else if (array[i] === "Move up" && itemNmbr === (maxNmbr - 5)) {
				extraName = " (to first page)";
			}
			item.push({
				cName : array[i] + extraName,
				cReturn : array[i],
				bEnabled : enabled
			});
		}
	};
	var menuArray = ["Move up", "Move down", "-", "Insert empty " + type, "Delete " + type, "Clear " + type];
	if (type === "action" && (!typePF || itemNmbr > (maxNmbr - 6))) menuArray = menuArray.concat(["-", "Move to opposing field"]);
	menuLVL1(actionMenu, menuArray);

	Menus.actions = actionMenu;
};

//call the Action menu and do something with the results
function ActionOptions() {
	var MenuSelection = getMenu("actions");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying action menu option...");
	calcStop();
		
	var itemNmbr = parseFloat(event.target.name.slice(-2));
	var type = event.target.name.match(/bonus action|reaction|action/i)[0].toLowerCase();
	var maxNmbr = type === "action" ? FieldNumbers.trueactions : FieldNumbers.actions;
	if (itemNmbr <= (maxNmbr - 6)) {
		var OppNmbr = itemNmbr > ((maxNmbr - 6) / 2) ? -1 * ((maxNmbr - 6) / 2) : ((maxNmbr - 6) / 2);
	} else if (itemNmbr > (maxNmbr - 6)) {
		var OppNmbr = itemNmbr > (maxNmbr - 3) ? -3 : 3;
	};
	var FldNm = type.capitalize() + " ";
	
	var Flds = {
		it : FldNm + itemNmbr,
		up : itemNmbr !== 1 ? FldNm + (itemNmbr - 1) : false,
		down : itemNmbr !== maxNmbr ? FldNm + (itemNmbr + 1) : false,
		opp : type === "action" ? FldNm + (itemNmbr + OppNmbr) : false
	};
	var entries = {
		Value : "What",
		Tooltip : "Who",
		Submit : "How"
	};
	for (var key in Flds) {
		var aFld = Flds[key];
		if (!aFld) continue;
		for (var e in entries) {
			Flds[key + e] = tDoc[entries[e]](aFld);
		};
	};
	switch (MenuSelection[0]) {
		case "move up":
			thermoTxt = thermoM("Moving the " + type + " up...", false); //change the progress dialog text
			Value(Flds.it, Flds.upValue, Flds.upTooltip, Flds.upSubmit);
			Value(Flds.up, Flds.itValue, Flds.itTooltip, Flds.itSubmit);
			break;
		case "move down":
			thermoTxt = thermoM("Moving the " + type + " down...", false); //change the progress dialog text
			Value(Flds.it, Flds.downValue, Flds.downTooltip, Flds.downSubmit);
			Value(Flds.down, Flds.itValue, Flds.itTooltip, Flds.itSubmit);
			break;
		case "move to opposing field":
			thermoTxt = thermoM("Moving the " + type + " to opposite field...", false); //change the progress dialog text
			Value(Flds.it, Flds.oppValue, Flds.oppTooltip, Flds.oppSubmit);
			Value(Flds.opp, Flds.itValue, Flds.itTooltip, Flds.itSubmit);
		break;
		case "insert empty " + type:
			thermoTxt = thermoM("Inserting empty " + type + "...", false); //change the progress dialog text
			ActionInsert(type, itemNmbr);
			break;
		case "delete " + type:
			thermoTxt = thermoM("Deleting " + type + "...", false); //change the progress dialog text
			ActionDelete(type, itemNmbr);
			break;
		case "clear " + type:
			thermoTxt = thermoM("Clearing " + type + "...", false); //change the progress dialog text
			Value(Flds.it, "", "");
			break;
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

//insert a Action at the position wanted
function ActionInsert(type, itemNmbr) {
	var maxNmbr = type === "action" ? FieldNumbers.trueactions : FieldNumbers.actions;
	var FldNm = type.capitalize() + " ";
	var Field = FldNm + itemNmbr;
	
	// var FieldNames = [type.capitalize() + " "];
	
	//stop the function if the selected slot is already empty
	if (What(Field) === "" || itemNmbr === maxNmbr) return;

	//look for the first empty slot below the slot
	var endslot = "";
	for (var i = itemNmbr + 1; i <= maxNmbr; i++) {
		if (What(FldNm + i) === "") {
			endslot = i;
			break;
		};
	};
	
	//only continu if an empty slot was found in the fields
	if (endslot) {
		//cycle to the slots starting with the empty one and add the values of the one above
		for (var i = endslot; i > itemNmbr; i--) {
			Value(FldNm + i, What(FldNm + (i - 1)), Who(FldNm + (i - 1)), How(FldNm + (i - 1)));
		};
		
		//empty the selected slot
		Value(Field, "", "", "");
	};
};

//delete a Action at the position wanted and move the rest up
function ActionDelete(type, itemNmbr) {
	var FldNm = type.capitalize() + " ";
	// var Field = FldNm + itemNmbr;
	var maxNmbr = type === "action" ? FieldNumbers.trueactions : FieldNumbers.actions;
	if (!typePF && type === "action" && itemNmbr < ((FieldNumbers.trueactions - 6) / 2)) {
		var maxNmbr = (FieldNumbers.trueactions - 6) / 2;
	} else {
		maxNmbr = itemNmbr > (maxNmbr - 6) || What(FldNm + (maxNmbr - 6)) ? maxNmbr : maxNmbr - 6; //stop at the end of the first page if last one on first page is empty
	};
	var EndField = FldNm + maxNmbr;
	
	//move every line up one space, starting with the line below the selected line
	for (var i = itemNmbr; i < maxNmbr; i++) {
		Value(FldNm + i, What(FldNm + (i + 1)), Who(FldNm + (i + 1)), How(FldNm + (i + 1)));
	};
	
	//delete the contents of the final line
	Value(EndField, "", "", "");
};

//Make menu for the button on each Limited Feature line and parse it to Menus.limfea
function MakeLimFeaMenu() {
	var limfeaMenu = [];
	var itemNmbr = parseFloat(event.target.name.slice(-2));
	var maxNmbr = FieldNumbers.limfea;
	var theField = What("Limited Feature " + itemNmbr);
	var SslotsVisible = !typePF && eval(What("SpellSlotsRemember"))[0];
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
	
	var SslotsVisible = !typePF && eval(What("SpellSlotsRemember"))[0];
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
	var SslotsVisible = !typePF && eval(What("SpellSlotsRemember"))[0];
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
	var SslotsVisible = !typePF && eval(What("SpellSlotsRemember"))[0];
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
			nType : 2, //Yes-No
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
	
	if (!multiTemp) { // spawn or hide the template page for templates that can't have multiple instances
		var isTempVisible = isTemplVis(tempNm);
		if (isTempVisible) {
			//find the current page of the template
			var tempPage = Math.max.apply(Math, tDoc.getField(BookMarkList[tempNm]).page);

			// Start progress bar
			var thermoTxt = thermoM("Hiding " + TemplateNames[tempNm] + ", from page " + (tempPage + 1) + "...");
			thermoM(0.9);

			tDoc.deletePages(tempPage);

			//grey out the appropriate bookmarks
			amendBookmarks(BookMarkList[tempNm + "_Bookmarks"], false);

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
				for (var i = tempExtras.length - 1; i >= 0; i--) {
					var tempPage = tDoc.getField(tempExtras[i] + BookMarkList[tempNm]).page;
					thermoM((i + 1) / tempExtras.length); // Increment the progress bar
					tDoc.deletePages(tempPage);
					//remove the deleted entry from the newTemplList
					newTemplList.splice(newTemplList.indexOf(tempExtras[i]), 1);
				};

				// Put the updated array in the field
				Value("Template.extras." + tempNm, newTemplList);

				// Amend the bookmarks
				if (newTemplList.toString() === "") amendBookmarks(BookMarkList[tempNm + "_Bookmarks"], false);

				// Do some extra actions, depending on the page(s) removed
				switch (tempNm) {
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

			var theNewPrefix = "P" + tempPage + "." + tempNm + ".";

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
			 case "AScomp" : // Re-find the companion pages races and weapons
				FindCompRace(undefined, theNewPrefix); 
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
	
	pagesMenu.push({cName : "-", cReturn : "-"}); // add a divider

	//add the menu for setting adventurers league stuff
	MakeAdventureLeagueMenu();
	pagesMenu.push({ 
		cName : "Adventurers League options",
		oSubMenu : Menus.adventureLeague
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
		["Open the Ability Scores dialogue", "dialog"],
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
		["Carried Weight options (encumbrance rules)", "weight"],
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

	Menus.pages = pagesMenu;
};

//call the pages menu and do something with the results
function PagesOptions() {
	var MenuSelection = getMenu("pages");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;
	switch (MenuSelection[0]) {
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
	};
};

//show or hide the DnD logos. Input is the number for the field display setting (0-3)
function DnDlogo(input) {
	var defaultDisplay = tDoc.info.SheetType === "Printer Friendly" ? 0 : 3;
	input = !isNaN(input) ? input : defaultDisplay;
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
		var toShow = eval(What(prefix + "Companion.Layers.Remember"));
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
		event.value = theGain === "" ? theStartNmr : theStartNmr + eval(theGain);
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
		app.launchURL("http://dndadventurersleague.org/tutorial-for-dd-adventure-league-logsheets/", true);
		break;
	 case "advanced tutorial" :
		app.launchURL("http://dndadventurersleague.org/advanced-logsheet-tutorial/", true);
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
			["Lord's Alliance", "lordsalliance"],
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
			["6 Tales of the Yawning Portal", "totyp"],
			["7 Tomb of Annihilation", "toa"]
		];
		IconMenu.push({cName : "-", cReturn : "-"}); // add a divider
		menuLVL2(IconMenu, ["Set Adventure League season icon", "seasonicon"], ALseasons);
	}
	
	//add a link to an online pdf converter, if not using Acrobat Pro/Standard
	if (restrictedViewer) {
		var Conversions = [
			["-", "-"],
			["Go to an online image-to-pdf converter", "convertor"]
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
	var setCalcOrder = function (field, input) {
		tDoc.getField(field).calcOrderIndex = input;
	}
	if (prefix) {
		var prePrefix = CalcLogsheetPrevious(prefix);
		setCalcOrder(prefix + "AdvLog.Class and Levels", whatCalcOrder(prePrefix + "AdvLog.Class and Levels") + 1);
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
			setCalcOrder(toSet + ".start", theLastCalc);
			//add one to the calculation order to put it at
			theLastCalc += 1;
			setCalcOrder(toSet + ".total", theLastCalc);
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
	if (type === "scriptfiles") Value("User_Imported_Files.Stringified", CurrentScriptFiles.toSource());
};

//set the sheet version
function Publish(version, extra) {
	if (app.viewerType !== "Reader") {
		tDoc.info.SheetVersion = version;
		sheetVersion = parseFloat(tDoc.info.SheetVersion);
		if (extra) {
			tDoc.info.SheetVersionType = extra;
		} else {
			delete tDoc.info.SheetVersionType;
		}
	}
	semVers = nmbrToSemanticVersion(sheetVersion) + (tDoc.info.SheetVersionType ? tDoc.info.SheetVersionType : "");
	if (app.viewerType !== "Reader") tDoc.info.Title = MakeDocName();
	tDoc.getField("SheetInformation").defaultValue = MakeDocName();
	tDoc.resetForm(["Opening Remember", "CurrentSources.Stringified", "User_Imported_Files.Stringified","SheetInformation"]);
	tDoc.getField("Opening Remember").submitName = 1;
	tDoc.getField("SaveIMG.Patreon").submitName = "(new Date(0))";
	if (!minVer) DontPrint("d20warning");
	DnDlogo();
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
	input = clean(input, " ");
	var LifestyleArray = [
		"wretched",
		"squalid",
		"poor",
		"modest",
		"comfortable",
		"wealthy",
		"aristocratic"
	];
	var ExpensesArray = [
		"\u2014",
		"1 sp",
		"2 sp",
		"1 gp",
		"2 gp",
		"4 gp",
		"10 gp min."
	];
	var theStyle = LifestyleArray.indexOf(input.toLowerCase());
	if (theStyle !== -1) {
		Value("Lifestyle daily cost", ExpensesArray[theStyle]);
	}
}

// update all the level-dependent features for the ranger companions on the companion pages
function UpdateRangerCompanions(deleteIt) {
	if (ClassList.rangerua && !testSource("rangerua", ClassList.rangerua, "classExcl")) {
		UpdateRevisedRangerCompanions(deleteIt);
		return;
	}
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Updating Ranger's Companion(s)...");
	calcStop();

	var theProfB = function (input) {
		var toReturn = 0;
		if (input >= 17) {
			toReturn = 6;
		} else if (input >= 13) {
			toReturn = 5;
		} else if (input >= 9) {
			toReturn = 4;
		} else if (input >= 5) {
			toReturn = 3;
		} else if (input >= 1) {
			toReturn = 2;
		}
		return toReturn;
	}
	
	var textArray = [
		"\u2022 " + "If the beast takes the Attack action, I can use my Extra Attack feature to attack once myself", //add at level 5
		"\u2022 " + "As a bonus action, I can have the beast do an Dash/Disengage/Dodge/Help action on its turn", //add at level 7
		"\u2022 " + "The beast can make two attacks when I command it to take an Attack action", //add at level 11
		"\u2022 " + "When I cast a spell on myself, I can have it also affect the beast if it is within 30 ft of me", //add at level 15
	]
	
	var theText = function (input) {
		var toReturn = "As an action, I can have the beast do an Attack/Dash/Disengage/Dodge/Help action on its turn";
		if (input >= 5) {
			toReturn += "\n" + textArray[0];
		}
		if (input >= 7) {
			toReturn += "\n" + textArray[1];
		}
		if (input >= 11) {
			toReturn += "\n" + textArray[2];
		}
		if (input >= 15) {
			toReturn += "\n" + textArray[3];
		}
		return toReturn;
	}
	
	var newLvl = deleteIt ? 0 : Number(What("Character Level"));
	var newLvlProfB = theProfB(newLvl);
	var RangerLvl = deleteIt || (!classes.known.ranger && !classes.known["spell-less ranger"]) ? newLvl : (classes.known.ranger ? classes.known.ranger.level : 0) + (classes.known["spell-less ranger"] ? classes.known["spell-less ranger"].level : 0);
	var newLvlText = theText(RangerLvl);
	var AScompA = What("Template.extras.AScomp").split(",").splice(1);
	
	for (var i = 0; i < AScompA.length; i++) {
		thermoM((i+2)/(AScompA.length+2)); //increment the progress dialog's progress
		var prefix = AScompA[i];
		if (What(prefix + "Companion.Remember") === "companion") { //only do something if the creature is set to "companion"
			var thisCrea = CurrentCompRace[prefix] && CurrentCompRace[prefix].typeFound === "creature" ? CurrentCompRace[prefix] : false;
			//first look into adding the proficiency bonus to AC, attacks, proficiencies
			var remLvl = Who(prefix + "Companion.Remember").split(",");
			var oldLvl = Number(remLvl[0]);
			var RangerLvlOld = remLvl[1] !== undefined ? Number(remLvl[1]) : 0;
			var oldLvlProfB = theProfB(oldLvl);
			var diff = newLvlProfB - oldLvlProfB;
			var BlueTextArrayAdd = [];
			var BlueTextArrayRemove = [];
			
			//add saving throw proficiencies
			for (var a = 0; a < AbilityScores.abbreviations.length; a++) {
				var theSave = prefix + "Comp.Use.Ability." + AbilityScores.abbreviations[a] + ".ST.Prof";
				var theSaveBT = prefix + "BlueText.Comp.Use.Ability." + AbilityScores.abbreviations[a] + ".ST.Bonus";
				var hasProfAdded = What(theSaveBT).indexOf("oProf") !== -1;
				if (!deleteIt && !hasProfAdded && tDoc.getField(theSave).isBoxChecked(0) === 1) {
					BlueTextArrayAdd.push(theSaveBT);
				} else if (hasProfAdded) {
					BlueTextArrayRemove.push(theSaveBT);
				};
			};
			
			//add skill proficiencies
			for (var s = 0; s < (SkillsList.abbreviations.length - 2); s++) {
				var theSkill = prefix + (typePF ? "" : "Text.") + "Comp.Use.Skills." + SkillsList.abbreviations[s] + ".Prof";
				var isProf = typePF ? tDoc.getField(theSkill).isBoxChecked(0) : What(theSkill) !== "nothing";
				var theSkillBT = prefix + "BlueText.Comp.Use.Skills." + SkillsList.abbreviations[s] + ".Bonus";
				hasProfAdded = What(theSkillBT).indexOf("oProf") !== -1;
				if (!deleteIt && !hasProfAdded && isProf) {
					BlueTextArrayAdd.push(theSkillBT);
				} else if (hasProfAdded) {
					BlueTextArrayRemove.push(theSkillBT);
				};
			};
			
			//add attacks damage and to hit bonus fields
			for (var A = 1; A <= 3; A++) {
				if (What(prefix + "Comp.Use.Attack." + A + ".Weapon Selection")) {
					var weaHit = prefix + "BlueText.Comp.Use.Attack." + A + ".To Hit Bonus";
					hasProfAdded = What(weaHit).indexOf("oProf") !== -1;
					if (!deleteIt && !hasProfAdded) {
						BlueTextArrayAdd.push(weaHit);
					} else if (hasProfAdded) {
						BlueTextArrayRemove.push(weaHit);
					};
					var weaDmg = prefix + "BlueText.Comp.Use.Attack." + A + ".Damage Bonus";
					hasProfAdded = What(weaDmg).indexOf("oProf") !== -1;
					if (!deleteIt && !hasProfAdded) {
						BlueTextArrayAdd.push(weaDmg);
					} else if (hasProfAdded) {
						BlueTextArrayRemove.push(weaDmg);
					};
				};
			};

			var NameEntity = "Ranger's Companion";
			var Explanation = "The Ranger's Companion adds the ranger's proficiency bonus (oProf) to all skills and saving throws it is proficient with, as well as to the to hit and damage of its attacks.";
			for (var f = 0; f < BlueTextArrayAdd.length; f++) {
				AddToModFld(BlueTextArrayAdd[f], "oProf", false, NameEntity, Explanation);
			};
			for (var f = 0; f < BlueTextArrayRemove.length; f++) {
				AddToModFld(BlueTextArrayRemove[f], "oProf", true, NameEntity, Explanation);
			};

			//then look into the hit points
			// first reset it to not assume a value automatically, if so set
			var theCompSetting = How(prefix + "Comp.Use.HP.Max").split(",");
			if (!deleteIt && theCompSetting[3] !== "nothing") {
				theCompSetting[3] = "nothing";
				tDoc.getField(prefix + "Comp.Use.HP.Max").submitName = theCompSetting.join();
			};
			// then add the new hp value
			if (thisCrea) {
				Value(prefix + "Comp.Use.HP.Max", Math.max(thisCrea.hp, RangerLvl * 4));
			} else {
				var newHP = Number(What(prefix + "Comp.Use.HP.Max")) + ((RangerLvl - RangerLvlOld) * 4);
				if (!isNaN(newHP)) Value(prefix + "Comp.Use.HP.Max", newHP);
			};

			//then look into the AC
			if (thisCrea) {
				Value(prefix + "Comp.Use.AC", thisCrea.ac + (deleteIt ? 0 : newLvlProfB));
			} else if (diff) {
				Value(prefix + "Comp.Use.AC", What(prefix + "Comp.Use.AC") + diff);
			};

			//then look into the attacks per action
			if (thisCrea && deleteIt) {
				Value(prefix + "Comp.Use.Attack.perAction", thisCrea.attacksAction);
			} else {
				Value(prefix + "Comp.Use.Attack.perAction", newLvl >= 11 ? 2 : 1);
			}

			//then look into the string in the notes field
			if (deleteIt) {
				for (var t = 0; t < textArray.length; t++) {
					RemoveString(prefix + "Cnote.Left", textArray[t]);
				};
			} else {
				var oldLvlText = theText(RangerLvlOld);
				ReplaceString(prefix + "Cnote.Left", newLvlText, false, oldLvlText);
			};
			
			//set the new level to the tooltip text of the remember field for later use
			if (!deleteIt) AddTooltip(prefix + "Companion.Remember", newLvl + "," + RangerLvl);
		}
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

//update the tooltip for the Max HP field
function SetHPTooltip(resetHP) {
	var HDLVL = [
		Math.floor(What("HD1 Level")),
		Math.floor(What("HD2 Level")),
		Math.floor(What("HD3 Level"))
	];
	var HD = [
		Math.floor(What("HD1 Die")),
		Math.floor(What("HD2 Die")),
		Math.floor(What("HD3 Die"))
	];
	var ConMod = Number(What("Con Mod"));
	var hdstring = "The total hit points (with averages and max for 1st level)\n = ";
	var hdaverage = 0;
	var conhp = 0;
	var totalhd = 0;
	var extrastring = "";
	var hdadvleague = 0;
	var hdmax = 0;
	var extrahp = 0;

	for (var j = 0; j < HDLVL.length; j++) {
		HDLVL[j] = HDLVL[j] < 1 ? 1 : HDLVL[j];
	};

	for (var i = 0; i < HD.length; i++) {
		if (HD[i] !== 0) {
			if ((i === 0 && classes.hp === 0) || classes.hp === HD[i]) {
				hdcalc = HD[i] + (HDLVL[i] - 1) * ((HD[i] + 1) / 2);
				hdcalc2 = HD[i] + (HDLVL[i] - 1) * Math.ceil((HD[i] + 1) / 2);
				hdcalc3 = HDLVL[i] * HD[i];
			} else {
				hdcalc = HDLVL[i] * ((HD[i] + 1) / 2);
				hdcalc2 = HDLVL[i] * Math.ceil((HD[i] + 1) / 2);
				hdcalc3 = HDLVL[i] * HD[i];
			}
			hdstring += HDLVL[i] + "d" + HD[i] + " (" + hdcalc + ")";
			hdstring += (i === 2 || HD[i + 1] === 0) ? "" : " + ";
			hdaverage += hdcalc;
			hdadvleague += hdcalc2;
			hdmax += hdcalc3;
			totalhd += HDLVL[i];
			conhp += HDLVL[i] * ConMod;
		};
	};
	
	if (CurrentEvals.hp) eval(CurrentEvals.hp);

	hdplaceholder = totalhd === 0 ? "level \u00D7 hit dice (0)" : "";
	totalhd = totalhd === 0 ? "level" : totalhd;
	conhp = conhp === 0 ? ConMod : conhp;
	hdstring += hdplaceholder + "\n + " + totalhd + " \u00D7 " + ConMod + " from Constitution (" + conhp + ")";
	hdstring += extrastring;
	hdstring += "\n\n \u2022 " + toUni(hdaverage + conhp + extrahp) + " is the total average HP";
	hdstring += "\n \u2022 " + toUni(hdadvleague + conhp + extrahp) + " is the total HP when using fixed values";
	hdstring += "\n \u2022 " + toUni(hdmax + conhp + extrahp) + " is the total maximum HP";
	
	//now add this tooltip
	AddTooltip("HP Max", hdstring);
	
	//now see if the menu setting tells us that we need to change
	var theSetting = How("HP Max").split(",");
	theSetting[0] = Number(Math.round(hdaverage + conhp + extrahp));
	theSetting[1] = Number(hdadvleague + conhp + extrahp);
	theSetting[2] = Number(hdmax + conhp + extrahp);
	var setHP = false;
	switch (theSetting[3]) {
		case "average" :
			setHP = theSetting[0];
			break;
		case "fixed" :
			setHP = theSetting[1];
			break;
		case "max" :
			setHP = theSetting[2];
			break;
	}
	if (setHP !== false) Value("HP Max", setHP);
	
	tDoc.getField("HP Max").submitName = theSetting.join();
	
	Value("HD1 Die", What("HD1 Die"));
	Value("HD2 Die", What("HD2 Die"));
	Value("HD3 Die", What("HD3 Die"));
	
	// now do the same for every companion page
	var tempExtras = What("Template.extras.AScomp").split(",").splice(1);
	for (var tE = 0; tE < tempExtras.length; tE++) {
		var prefix = tempExtras[tE];
		var CompHDLVL = Math.floor(What(prefix + "Comp.Use.HD.Level"));
		var CompHD = Math.floor(What(prefix + "Comp.Use.HD.Die"));
		var CompConMod = Number(What(prefix + "Comp.Use.Ability.Con.Mod"));
		var Compconhp = 0; 
		var CompAverageHD = 0;
		var CompFixedHD = 0;
		var CompMaxHD = 0;
		var Comphdplaceholder = "level \u00D7 hit dice (0)";
		
		//check if the fields are filled out at all
		if (CompHDLVL && CompHD) {
			Compconhp = CompHDLVL * CompConMod;
			CompAverageHD = CompHDLVL * ((CompHD + 1) / 2);
			CompFixedHD = CompHDLVL * Math.ceil((CompHD + 1) / 2) + Compconhp;
			CompMaxHD = CompHDLVL * CompHD + Compconhp;
			Comphdplaceholder = CompHDLVL + "d" + CompHD + " (" + CompAverageHD + ")";
		}
		
		var compHPsting = "The total hit points (with averages)\n = ";
		compHPsting += Comphdplaceholder;
		compHPsting += "\n + " + CompHDLVL + " \u00D7 " + CompConMod + " from Constitution (" + Compconhp + ")";
		compHPsting += "\n + Special modifiers from other sources";
		compHPsting += "\n\n \u2022 " + (CompAverageHD + Compconhp) + " is the total average HP";
		compHPsting += "\n \u2022 " + CompFixedHD + " is the total HP when using fixed values";
		compHPsting += "\n \u2022 " + CompMaxHD + " is the total maximum HP";
		AddTooltip(prefix + "Comp.Use.HP.Max", compHPsting);
		
		//now see if the menu setting tells us that we need to change
		var theCompSetting = How(prefix + "Comp.Use.HP.Max").split(",");
		theCompSetting[0] = Number(Math.round(CompAverageHD));
		theCompSetting[1] = Number(CompFixedHD);
		theCompSetting[2] = Number(CompMaxHD);
		if (resetHP) theCompSetting[3] = "nothing";
		var setCompHP = false;
		switch (theCompSetting[3]) {
			case "average" :
				setCompHP = theCompSetting[0];
				break;
			case "fixed" :
				setCompHP = theCompSetting[1];
				break;
			case "max" :
				setCompHP = theCompSetting[2];
				break;
		}
		if (setCompHP !== false) Value(prefix + "Comp.Use.HP.Max", setCompHP);
		
		tDoc.getField(prefix + "Comp.Use.HP.Max").submitName = theCompSetting.join();
		
		Value(prefix + "Comp.Use.HD.Die", What(prefix + "Comp.Use.HD.Die"))
	}
};

function MakeHPMenu_HPOptions(preSelect) {
	
	//define some variables
	var theFld = preSelect ? "HP Max" : event.target.name.replace("Buttons.", "");
	var theInputs = tDoc.getField(theFld).submitName.split(",");
	if (!preSelect || preSelect == "justMenu") {
		var optionsArray = [
			["The total average HP (" + theInputs[0] + ")", "average"],
			["The total HP when using fixed values (" + theInputs[1] + ")", "fixed"],
			["The total maximum HP (" + theInputs[2] + ")", "max"]
		]
		var hpMenu = [];
		
		var menuLVL2 = function (menu, name, array) {
			var temp = {};
			temp.cName = name[0];
			temp.oSubMenu = [];
			for (var i = 0; i < array.length; i++) {
				var isMarked = name[1] === "auto" && array[i][1] === theInputs[3];
				temp.oSubMenu.push({
					cName : array[i][0],
					cReturn : "hp#" + name[1] + "#" + theInputs[i] + "#" + array[i][1],
					bMarked : isMarked
				})
			}
			menu.push(temp);
		};
		
		menuLVL2(hpMenu, ["Change the Max HP to", "change"], optionsArray);
		optionsArray.push(["Don't change the maximum HP automatically", "nothing"])
		menuLVL2(hpMenu, ["Set the Max HP to automatically assume", "auto"], optionsArray);
		
		//parse it into a global variable
		Menus.hp = hpMenu;
		if (preSelect == "justMenu") return;
	};

	//now call the menu
	var MenuSelection = preSelect ? preSelect : getMenu("hp");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	switch (MenuSelection[1]) {
	 case "auto" :
		theInputs[3] = MenuSelection[3];
		tDoc.getField(theFld).submitName = theInputs.join();
	 case "change" :
		if (MenuSelection[3] !== "nothing") {
			//set the value of the field
			Value(theFld, MenuSelection[2]);
		}
	}
};

// add the action "Attack (X attacks per action)" to the top of the "actions" fields, if there is room to do so
function AddAttacksPerAction() {
	if (typePF) {
		var theString = ["Attack (", " attacks per action)"];
		var regExStr = /\d+.{0,3}attacks/i;
		if (Number(classes.attacks) < 2) {
			RemoveAction("action", regExStr);
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
				Value("Action 1", theString[0] + classes.attacks + theString[1]);
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
				var theList = factionRanks[newValue];
				tDoc.getField("Background_FactionRank.Text").setItems(theList);
			}
			theFld.temp = newValue;
		} else if (newValue === "" || (event && event.value !== undefined && event.value === "")) {
			Clear("Background_FactionRank.Text");
		}
		// when commiting, set all the faction symbol fields to match this one
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
	var toShow = eval(What(prefix + "Companion.Layers.Remember")); //an array with two true/false values, the first is for the image section, second is for the equipment section
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

function ShowHideStealthDisadv() {
	if (!typePF) return;
	var showIt = tDoc.getField("AC Stealth Disadvantage").isBoxChecked(0);
	
	if (showIt) {
		Show("Stealth Disadv." + Who("Text.SkillsNames"));
	} else {
		Hide("Stealth Disadv");
	}
}

//(re)set the dropdowns
function UpdateDropdown(type, weapon) {
	if (minVer || !IsNotUserScript) return;
	IsSetDropDowns = true;
	type = type ? type.toLowerCase() : "all";
	calcStop();
	switch (type) {
	 case "resources" :
		var notAll = true;
	 case "all" :
		SetRacesdropdown();
		SetBackgrounddropdown();
		SetBackgroundFeaturesdropdown();
		SetFeatsdropdown();
		SetCompDropdown();
		SetWildshapeDropdown();
		SetArmordropdown();
		SetAmmosdropdown();
		if (notAll) {
			SetWeaponsdropdown();
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
	 case "ammo" :
	 case "ammunition" :
	 case "ammunitions" :
		SetAmmosdropdown();
		break;
	 case "creature" :
	 case "creatures" :
	 case "wildshape" :
	 case "wildshapes" :
		SetCompDropdown();
		SetWildshapeDropdown();
		break;
	};
	IsSetDropDowns = false;
};

function ChangeToCompleteAdvLogSheet() {
	if (minVer) return;
	ResetAll();
	tDoc.resetForm(["User Script", "User_Imported_Files.Stringified"]); // remove all custom scripts
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
	var forConsole = "tDoc.extractPages({nStart: 0, nEnd: 3});\n\n";
	forConsole += "this.info.AdvLogOnly = true;";
	forConsole += " var toDelScripts = ['AbilityScores', 'ClassSelection', 'ListsBackgrounds', 'ListsClasses', 'ListsCreatures', 'ListsFeats', 'ListsGear', 'ListsPsionics', 'ListsRaces', 'ListsSources', 'ListsSpells']; for (var s = 0; s < toDelScripts.length; s++) {this.removeScript(toDelScripts[s]);};";
	forConsole += " this.createTemplate({cName:\"ALlog\", nPage:1 });";
	forConsole += " this.createTemplate({cName:\"remember\", nPage:2 });";
	forConsole += " this.createTemplate({cName:\"blank\", nPage:3 });";
	forConsole += " this.getTemplate(\"ALlog\").hidden = true;";
	forConsole += " this.getTemplate(\"remember\").hidden = true;";
	forConsole += " this.getTemplate(\"blank\").hidden = true;";
	forConsole += " this.info.SheetVersion = \"" + tDoc.info.SheetVersion + "\";";
	forConsole += " this.info.SheetType = \"" + tDoc.info.SheetType + "\";";
	forConsole += " this.info.Keywords = \"" + (!typePF ? keyCF : (tDoc.info.SheetType === "Printer Friendly" ? keyPF : keyPFR)) + "\";";
	forConsole += " this.info.Subject = \"D&D 5e; Character Sheet; Adventurers League; Adventure Logsheet\";";
	forConsole += " this.info.ContactEmail = \"mpmb@flapkan.com\";";
	forConsole += " this.info.Title = MakeDocName();";
	forConsole += " typePF = (/printer friendly/i).test(this.info.SheetType);";
	forConsole += " typeA4 = (/a4/i).test(this.info.SheetType);";
	forConsole += " typeLR = (/letter/i).test(this.info.SheetType);";
	forConsole += " minVer = this.info.SpellsOnly || this.info.AdvLogOnly;";
	forConsole += " CreateBkmrksCompleteAdvLogSheet();";
	forConsole += " this.calculateNow();";
	forConsole += " this.importDataObject({cName: 'FAQ.pdf', cDIPath: \"/D/Doc/NAS/02 Hobby/Dungeons & Dragons/5th Edition/- Sheets Creation/- MPMB's Character Record Sheet/Frequently Asked Questions/FAQ.pdf\"});";
	forConsole += " Value(\"Opening Remember\", \"No\");";
	forConsole += " app.execMenuItem(\"GeneralInfo\");";
	console.show();
	console.println("Execute the following:\n" + forConsole);
}

//create the bookmarks of a Adventure Logsheet
function CreateBkmrksCompleteAdvLogSheet() {
	//make the functions bookmark section
	tDoc.bookmarkRoot.createChild({cName: "Functions", cExpr: "MakeButtons();", nIndex: 0});
	
	var NameBm = typePF ? "Set Highlight Color" : "Set Color Theme";
	tDoc.bookmarkRoot.children[0].createChild({cName: NameBm, cExpr: "MakeColorMenu(); ColoryOptions();", nIndex: 0});
	tDoc.bookmarkRoot.children[0].children[0].color = ["RGB", 0.5, 0.5, 0.5];
	
	tDoc.bookmarkRoot.children[0].createChild({cName: "Unit System", cExpr: "SetUnitDecimals_Button();", nIndex: 0});
	tDoc.bookmarkRoot.children[0].children[0].color = ["RGB",0.463,0.192,0.467];
	
	tDoc.bookmarkRoot.children[0].createChild({cName: "Flatten", cExpr: "MakeMobileReady();", nIndex: 0});
	tDoc.bookmarkRoot.children[0].children[0].color = ["RGB", 0.2823486328125, 0.1921539306640625, 0.478424072265625];
	
	tDoc.bookmarkRoot.children[0].createChild({cName: "Text Options", cExpr: "MakeTextMenu_TextOptions();", nIndex: 0});
	tDoc.bookmarkRoot.children[0].children[0].color = ["RGB", 0.8000030517578125, 0.6666717529296875, 0.1137237548828125];
	
	tDoc.bookmarkRoot.children[0].createChild({cName: "Set Pages Layout", cExpr: "MakeAdvLogMenu_AdvLogOptions(true);", nIndex: 0});
	tDoc.bookmarkRoot.children[0].children[0].color = ["RGB", 0.9098052978515625, 0.196075439453125, 0.48626708984375];
	
	//make links bookmark section
	tDoc.bookmarkRoot.createChild({cName: "Links", cExpr: "", nIndex: 1});
	
	var aLink = typePF ? "http://www.dmsguild.com/product/186823/" : "http://www.dmsguild.com/product/193053/";
	tDoc.bookmarkRoot.children[1].createChild({cName: "Get the Full Character Record Sheet", cExpr: "contactMPMB('fullversion');", nIndex: 0});
	
	var NameLink = tDoc.info.SheetType === "Printer Friendly" ? "Get the Printer Friendly Redesign" : "Get the Latest Version";
	tDoc.bookmarkRoot.children[1].createChild({cName: NameLink, cExpr: "contactMPMB('latestversion');", nIndex: 1});
	
	NameLink = typePF ? "Get the Colorful Design" : "Get the Printer Friendly Design";
	tDoc.bookmarkRoot.children[1].createChild({cName: NameLink, cExpr: "contactMPMB('otherdesign');", nIndex: 2});
	
	//make FAQ bookmark section
	tDoc.bookmarkRoot.createChild({cName: "FAQ", cExpr: "getFAQ();", nIndex: 2});
	
	//make the contact bookmark section
	tDoc.bookmarkRoot.createChild({cName: "Contact MPMB", cExpr: "contactMPMB('patreon');", nIndex: 3});
	tDoc.bookmarkRoot.children[3].style = 2;
	tDoc.bookmarkRoot.children[3].createChild({cName: "on DMs Guild", cExpr: "contactMPMB('dmsguild');", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on EN world", cExpr: "contactMPMB('enworld');", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "via Email", cExpr: "contactMPMB('email');", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on GitHub", cExpr: "contactMPMB('github');", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on Reddit", cExpr: "contactMPMB('reddit');", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on Twitter", cExpr: "contactMPMB('twitter');", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on Patreon", cExpr: "contactMPMB('patreon');", nIndex: 0});
	
	//make all bookmarks bold
	for (var p = 0; p < tDoc.bookmarkRoot.children.length; p++) {
		tDoc.bookmarkRoot.children[p].style = 2;
		if (tDoc.bookmarkRoot.children[p].children) {
			for (var c = 0; c < tDoc.bookmarkRoot.children[p].children.length; c++) {
				tDoc.bookmarkRoot.children[p].children[c].style = 2;
			}
		}
	}
}

// update all the level-dependent features for the UA's revised ranger companions on the companion pages
function UpdateRevisedRangerCompanions(deleteIt) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Updating Revised Ranger's Companion(s)...");
	calcStop();
	
	var theProfB = function (input) {
		var toReturn = 0;
		if (input >= 17) {
			toReturn = 6;
		} else if (input >= 13) {
			toReturn = 5;
		} else if (input >= 9) {
			toReturn = 4;
		} else if (input >= 5) {
			toReturn = 3;
		} else if (input >= 1) {
			toReturn = 2;
		}
		return toReturn;
	}
	
	var notesArray = [
		"\u2022 " + "When I take the Attack action, my companion can use its reaction to make one melee attack", //add at level 5
		"\u2022 " + "While my companion can see me, it has advantage on all saving throws", //add at level 7
		"\u2022 " + "My companion can, as an action, make a melee attack vs. all creatures within 5 ft of it", //add at level 11
		"\u2022 " + "My companion can, as a reaction, halve the damage of an attack from an attacker that it sees", //add at level 15
	];
	
	var theText = function (input) {
		var toReturn = "My companion gains a bonus on damage rolls against my favored enemies just like me";
		if (input >= 5) {
			toReturn += "\n" + notesArray[0];
		}
		if (input >= 7) {
			toReturn += "\n" + notesArray[1];
		}
		if (input >= 11) {
			toReturn += "\n" + notesArray[2];
		}
		if (input >= 15) {
			toReturn += "\n" + notesArray[3];
		}
		return toReturn;
	}
	
	var featuresArray = [
		"\u25C6 " + "Coordinated Attack: " + "As a reaction when the ranger owner takes the attack action, the companion can make one melee attack.", //add at level 5
		"\u25C6 " + "Beast's Defense: " + "While the ranger owner is within eyeshot, the companion has advantage on all saving throws.", //add at level 7
		"\u25C6 " + "Storm of Claws and Fangs: " + "As an action, the companion can make a melee attack against each creature that is within 5 ft.", //add at level 11
		"\u25C6 " + "Superior Beast's Defense: " + "As a reaction, the companion can halve the damage of an attack from an attacker that it can see.", //add at level 15
	];
	
	var theFeature = function (input) {
		var toReturn = "";
		if (input >= 5) {
			toReturn += featuresArray[0];
		}
		if (input >= 7) {
			toReturn += "\n" + featuresArray[1];
		}
		if (input >= 11) {
			toReturn += "\n" + featuresArray[2];
		}
		if (input >= 15) {
			toReturn += "\n" + featuresArray[3];
		}
		return toReturn;
	}
	
	var ASIs = 0;
	for (var aClass in classes.known) {
		var classLvL = Math.min(CurrentClasses[aClass].improvements.length, classes.known[aClass].level);
		ASIs += 2 * CurrentClasses[aClass].improvements[classLvL - 1];
	}
	var ASIstring = function (aCreat) {
		var toReturn = "whenever I gain an ASI\r  Currently, there are ";
		toReturn += ASIs + " points ";
		
		if (aCreat.scores) {
			toReturn += "(default: " + aCreat.scores[0] + " Str, " + aCreat.scores[1] + " Dex, " + aCreat.scores[2] + " Con, " + aCreat.scores[3] + " Int, " + aCreat.scores[4] + " Wis, " + aCreat.scores[5] + " Cha)";
		} else {
			toReturn += " to divide among the ability scores"
		}
		return toReturn;
	}
	
	var newLvl = deleteIt ? 0 : Number(What("Character Level"));
	var newLvlProfB = theProfB(newLvl);
	var RangerLvl = deleteIt || !classes.known.rangerua ? newLvl : classes.known.rangerua.level;
	var newLvlText = theText(RangerLvl);
	var newLvlFea = theFeature(RangerLvl);
	var AScompA = What("Template.extras.AScomp").split(",").splice(1);
	
	for (var i = 0; i < AScompA.length; i++) {
		thermoM((i+2)/(AScompA.length+2)); //increment the progress dialog's progress
		var prefix = AScompA[i];
		if (What(prefix + "Companion.Remember") === "companionrr") { //only do something if the creature is set to "companionrr"
			var thisCrea = CurrentCompRace[prefix] && CurrentCompRace[prefix].typeFound === "creature" ? CurrentCompRace[prefix] : false;
			
			//first update the proficiency bonus
			Value(prefix + "Comp.Use.Proficiency Bonus", !deleteIt ? newLvlProfB : thisCrea ? thisCrea.proficiencyBonus : "");
			
			//now look into adding the proficiency bonus to attack damage and removing multiattacks
			var remLvl = Who(prefix + "Companion.Remember").split(",");
			var oldLvl = Number(remLvl[0]);
			var RangerLvlOld = remLvl[1] !== undefined ? Number(remLvl[1]) : 0;
			var oldLvlProfB = theProfB(oldLvl);
			var diff = newLvlProfB - oldLvlProfB;
			
			//add ranger's prof to attacks damage fields
			var NameEntity = "Revised Ranger's Companion";
			var Explanation = "The Revised Ranger's Companion adds the ranger's proficiency bonus (oProf) to the damage of its attacks.";
			for (var A = 1; A <= 3; A++) {
				if (What(prefix + "Comp.Use.Attack." + A + ".Weapon Selection")) {
					var weaFldDmg = prefix + "BlueText.Comp.Use.Attack." + A + ".Damage Bonus";
					var hasProfAdded = What(weaFldDmg).indexOf("oProf") !== -1;
					if (!deleteIt) {
						ReplaceString(prefix + "Comp.Use.Attack." + A + ".Description", "", false, "(((One|Two).+as an Attack action)|(2 per Attack));? ?", true);
						if (!hasProfAdded) AddToModFld(weaFldDmg, "oProf", false, NameEntity, Explanation);
					} else if (deleteIt && hasProfAdded) {
						AddToModFld(weaFldDmg, "oProf", true, NameEntity, Explanation);
					};
				};
			};
			
			//add the HD
			if (thisCrea && deleteIt) {
				Value(prefix + "Comp.Use.HD.Level", thisCrea.hd[0]);
			} else if (thisCrea) {
				Value(prefix + "Comp.Use.HD.Level", thisCrea.hd[0] + RangerLvl - 3);
			} else if (What(prefix + "Comp.Use.HD.Level")) {
				var HDincr = oldLvl === 0 ? RangerLvl - 3 : RangerLvl - oldLvl;
				Value(prefix + "Comp.Use.HD.Level", What(prefix + "Comp.Use.HD.Level") + HDincr);
			}
			var theCompSetting = tDoc.getField(prefix + "Comp.Use.HP.Max").submitName.split(",");
			theCompSetting[3] = deleteIt ? "nothing" : "fixed";
			tDoc.getField(prefix + "Comp.Use.HP.Max").submitName = theCompSetting.join();
			
			//add the alignment
			if (thisCrea && deleteIt) {
				Value(prefix + "Comp.Desc.Alignment", thisCrea.alignment);
			} else {
				var theAL = tDoc.getField("Alignment").currentValueIndices;
				if (theAL !== -1) {
					PickDropdown(prefix + "Comp.Desc.Alignment", theAL);
				} else {
					Value(prefix + "Comp.Desc.Alignment", What("Alignment"));
				}
			}
			
			//add saving throw proficiencies
			for (var s = 0; s < 6; s++) {
				var saveFld = prefix + "Comp.Use.Ability." + AbilityScores.abbreviations[s] + ".ST";
				if (deleteIt && thisCrea && thisCrea.saves[s] !== "") {
					Checkbox(saveFld + ".Prof"); //set the save as proficient
				} else if (deleteIt) {
					Checkbox(saveFld + ".Prof", false); //set the save as not proficient
				} else {
					Checkbox(saveFld + ".Prof"); //set the save as proficient
				}
			}
			
			//then look into the AC
			if (thisCrea) {
				Value(prefix + "Comp.Use.AC", thisCrea.ac + (deleteIt ? 0 : newLvlProfB));
			} else if (diff) {
				Value(prefix + "Comp.Use.AC", What(prefix + "Comp.Use.AC") + diff);
			};
			
			//then look into the AC
			if (thisCrea) {
				Value(prefix + "Comp.Use.AC", thisCrea.ac + (deleteIt ? 0 : newLvlProfB));
			}
			
			//then look into the attacks per action
			if (thisCrea && deleteIt) {
				Value(prefix + "Comp.Use.Attack.perAction", thisCrea.attacksAction);
			} else {
				Value(prefix + "Comp.Use.Attack.perAction", 1);
			}
			
			//remove the old ASI line (if any)
			var ASIregex = /whenever I gain an ASI\r.*Currently.+(scores|Cha\))/;
			if ((ASIregex).test(What(prefix + "Cnote.Left"))) {
				ReplaceString(prefix + "Cnote.Left", "whenever I gain an ASI", false, "whenever I gain an ASI\\r.*Currently.+(scores|Cha\\))", true);
			}
			
			//then look into the string in the notes and feature fields
			if (deleteIt) {
				for (var t = 0; t < notesArray.length; t++) {
					RemoveString(prefix + "Cnote.Left", notesArray[t]);
				}
				for (var t = 0; t < featuresArray.length; t++) {
					RemoveString(prefix + "Comp.Use.Features", featuresArray[t]);
				}
				RemoveString(prefix + "Cnote.Left", compString.companionrr.string);
			} else {
				var oldLvlText = theText(RangerLvlOld);
				ReplaceString(prefix + "Cnote.Left", newLvlText, false, oldLvlText);
				var oldLvlFea = theFeature(RangerLvlOld);
				ReplaceString(prefix + "Comp.Use.Features", newLvlFea, false, oldLvlFea);
				var creaASI = ASIstring(thisCrea);
				ReplaceString(prefix + "Cnote.Left", creaASI, false, "whenever I gain an ASI");
				
				//remove any multiattack trait
				ReplaceString(prefix + "Comp.Use.Traits", "", false, "\u25C6 Multiattack: .+(\r|$)", true);
			}
			
			if (!deleteIt) {
				//set the new level to the tooltip text of the remember field for later use
				AddTooltip(prefix + "Companion.Remember", newLvl + "," + RangerLvl + ",");
			} else if (thisCrea) {
				//bring back the multiattack trait, if applicable
				for (var t = 0; t < thisCrea.traits.length; t++) {
					var tName = thisCrea.traits[t].name;
					if ((/multiattack/i).test(tName)) {
						var traitString = "\u25C6 " + tName + ": " + thisCrea.traits[t].description;
						AddString(prefix + "Comp.Use.Traits", traitString, true);
					}
				}
			}
		}
	}
	SetHPTooltip();
	thermoM(thermoTxt, true); // Stop progress bar
}

//Give a pop-up dialogue when the amount of Ability Score Improvements after changing level
function CountASIs() {
	UpdateTooltips();
	var newASI = 0;
	for (var nClass in classes.known) {
		var clLvl = Math.min(CurrentClasses[nClass].improvements.length, classes.known[nClass].level);
		newASI += clLvl ? CurrentClasses[nClass].improvements[clLvl - 1] : 0;
	}
	var oldASI = 0;
	for (var oClass in classes.old) {
		clLvl = Math.min(CurrentClasses[oClass].improvements.length, classes.old[oClass].classlevel);
		oldASI += clLvl ? CurrentClasses[oClass].improvements[clLvl - 1] : 0;
	}
	if (newASI !== oldASI) {		
		var pTxt = "The change in level has granted your character " + toUni(newASI - oldASI) + " additional " + toUni("Ability Score Improvement") + "(s)!\n\nThe current total of Ability Score Improvements is:" + AbilityScores.improvements.classlvl + "\n\nYou can use these in one of two ways:\n    1. Divide 2 points over ability scores (to max 20);\n        (See the Ability Scores dialogue, i.e. \"Scores\" button.)\n    2. Take 1 feat.\n        (See the Feats section on the sheet.)";
		if (CurrentClasses.rangerua && CurrentClasses.rangerua.fullname === "Ranger (Beast Conclave)") {
			pTxt += "\n\nDon't forget that the Ranger's Animal Companion also benefits from Ability Score Improvements (but not feats).";
		}
		app.alert({
			cMsg : pTxt,
			nIcon : 3,
			cTitle : "Don't forget the Ability Score Improvements!"
		})
	}	
}

//a function to change the sorting of the skills
function MakeSkillsMenu_SkillsOptions(input) {
	var sWho = Who("Text.SkillsNames");
	var sList = Who("SkillsClick").replace(/.*\n\n/, "");
	var sListA = sList.replace(/.*:/, "") !== "";
	if (IsNotReset && (!input || input == "justMenu")) {
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
			cName : "Show a dialogue with my skill options" + (sListA ? "" : " (nothing to show)"),
			cReturn : "skills#dialog",
			bEnabled : sListA
		}];
		if (input == "justMenu") return;
	};
	
	var mStr = toUni(" Bonus Modifier") + "\nThe number you type in here will be added to the calculated ";
	var mStr1 = " value.\n\n" + toUni("Dynamic Modifiers") + "\nYou can also have the field use ability score modifiers. To do this, use the abbreviations of ability scores (Str, Dex, Con, Int, Wis, Cha, HoS), math operators (+, -, /, *), and numbers.\n   For example: '2+Str' or 'Wis+Int'.\nDon't worry if you are only able to write one or two letters of an ability score's abbreviation, the field will auto-complete (e.g. typing 'S+1' will result in 'Str+1').";
	var mStrC = mStr1.replace(", HoS", "");
	var mStr2 = "\n\nNote that any bonus from \"Jack of All Trades\" or \"Remarkable Athelete\" will be added automatically if the appropriate checkbox is checked.";
	var mStr3 = "\n\n" + toUni("Not Enough Space to Write?") + "\nIf you find that you need more space to type out the modifier you want to use, you can get a bigger input-form by left-clicking in this field while holding either the Ctrl, Shift, or Cmd key.\n   This pop-up dialogue will also show you the origins of modifiers added by the automation, if any.";
	var getStr = function(aSkill, isCom) {
		return toUni(aSkill) + mStr + aSkill + (isCom ? mStrC : mStr1) + (isCom ? "" : mStr2) + mStr3;
	};
	
	if (IsNotReset === false) {//on a reset only re-do the bonus modifier tooltips
		for (var S = 0; S < (SkillsList.abbreviations.length - 2); S++) {
			var newSkill = SkillsList.names[S];
			AddTooltip(SkillsList.abbreviations[S] + " Bonus", getStr(newSkill));
			if (typePF) AddTooltip("BlueText.Comp.Use.Skills." + SkillsList.abbreviations[S] + ".Bonus", getStr(newSkill, true), "");
		}
		return;
	};
	
	var MenuSelection = input ? input : getMenu("skills");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	if (MenuSelection[1] === "dialog") {
		app.alert({
			cTitle : "Skill selection options",
			cMsg : sList,
			nIcon : 3
		});
	} else if (MenuSelection[1] !== sWho) {
		// Start progress bar and stop calculations
		var thermoTxt = thermoM("Changing the order of the skills...");
		calcStop();
		
		//make a list of all the currently selected skills
		var oSkillProf = [];
		var oSkillExp = [];
		var oSkillAdv = [];
		var oSkillDis = [];
		var oSkillBon = [];
		var currentList = sWho === "alphabeta" ? SkillsList.abbreviations : SkillsList.abbreviationsByAS;
		for (var S = 0; S < (SkillsList.abbreviations.length - 2); S++) {
			var sNm = currentList[S];
			var sFld = SkillsList.abbreviations[S];
			if (tDoc.getField(sFld + " Prof").isBoxChecked(0)) {
				oSkillProf.push(sNm);
				Checkbox(sFld + " Prof", false);
			}
			if (tDoc.getField(sFld + " Exp").isBoxChecked(0)) {
				oSkillExp.push(sNm);
				Checkbox(sFld + " Exp", false);
			}
			oSkillBon.push([sNm, What(sFld + " Bonus")]);
			if (!typePF) {
				if (tDoc.getField(sFld + " Adv").isBoxChecked(0)) {
					oSkillAdv.push(sNm);
					Checkbox(sFld + " Adv", false);
					Editable(sFld + " Dis");
				}
				if (tDoc.getField(sFld + " Dis").isBoxChecked(0)) {
					oSkillDis.push(sNm);
					Checkbox(sFld + " Dis", false);
					Editable(sFld + " Adv");
				}
			}
		}
		
		//now use those lists to check the correct boxes in the new order of skills
		var newList = MenuSelection[1] === "alphabeta" ? SkillsList.abbreviations : SkillsList.abbreviationsByAS;
		var allArrays = [[oSkillProf, " Prof"], [oSkillExp, " Exp"], [oSkillAdv, " Adv", " Dis"], [oSkillDis, " Dis", " Adv"]];
		for (var A = 0; A < allArrays.length; A++) {
			var thisArray = allArrays[A][0];
			for (var i = 0; i < thisArray.length; i++) {
				var newFld = SkillsList.abbreviations[newList.indexOf(thisArray[i])];
				Checkbox(newFld + allArrays[A][1], true);
				if (A > 1) Uneditable(newFld + allArrays[A][2]);
			}
		}
		for (var B = 0; B < oSkillBon.length; B++) {
			newFld = SkillsList.abbreviations[newList.indexOf(oSkillBon[B][0])];
			var newSkill = SkillsList.names[SkillsList.abbreviations.indexOf(oSkillBon[B][0])];
			Value(newFld + " Bonus", oSkillBon[B][1], getStr(newSkill));
		}
		
		//show the stealth disadvantage field, for Printer Friendly, if checked
		if (typePF) {
			Hide("Stealth Disadv");
			var showIt = tDoc.getField("AC Stealth Disadvantage").isBoxChecked(0);
			if (showIt) Show("Stealth Disadv." + MenuSelection[1]);
			
			//now if this is a printer friendly sheet, also rearrange the skills of the companion page(s)
			var AScompA = What("Template.extras.AScomp").split(",");
			for (var AS = 0; AS < AScompA.length; AS++) {
				var prefix = AScompA[AS];
				var aField = prefix + "Comp.Use.Skills.";
				var bField = prefix + "BlueText.Comp.Use.Skills.";
				//make a list of all the currently selected skills
				var oSkillProf = [];
				var oSkillExp = [];
				var oSkillBon = [];
				for (var S = 0; S < (SkillsList.abbreviations.length - 2); S++) {
					var sNm = currentList[S];
					var sFld = SkillsList.abbreviations[S];
					if (tDoc.getField(aField + sFld + ".Prof").isBoxChecked(0)) {
						oSkillProf.push(sNm);
						Checkbox(aField + sFld + ".Prof", false);
					}
					if (tDoc.getField(aField + sFld + ".Exp").isBoxChecked(0)) {
						oSkillExp.push(sNm);
						Checkbox(aField + sFld + ".Exp", false);
					}
					oSkillBon.push([sNm, What(bField + sFld + ".Bonus")]);
				}
				
				var allArrays = [[oSkillProf, ".Prof"], [oSkillExp, ".Exp"]];
				for (var A = 0; A < allArrays.length; A++) {
					var thisArray = allArrays[A][0];
					for (var i = 0; i < thisArray.length; i++) {
						var newFld = SkillsList.abbreviations[newList.indexOf(thisArray[i])];
						Checkbox(aField + newFld + allArrays[A][1], true);
					}
				}
				for (var B = 0; B < oSkillBon.length; B++) {
					newFld = SkillsList.abbreviations[newList.indexOf(oSkillBon[B][0])];
					var newSkill = SkillsList.names[SkillsList.abbreviations.indexOf(oSkillBon[B][0])];
					Value(bField + newFld + ".Bonus", oSkillBon[B][1], getStr(newSkill, true));
				}
			}
		}
		
		//set the correct tooltip for remembering
		AddTooltip("Text.SkillsNames", MenuSelection[1]);
		
		//set the rich text for the skill names
		SetRichTextFields(false, true);
		thermoM(thermoTxt, true); // Stop progress bar
	}
}

// returns the current choice, if any, for a class feature; aClass as in ClassList, feature as in the object in the features object
function GetClassFeatureChoice(aClass, feature) {
	var theReturn = "";
	if (CurrentClasses[aClass] && CurrentClasses[aClass].features[feature] && CurrentClasses[aClass].features[feature].choices) {
		var theProp = CurrentClasses[aClass].features[feature].choices;
		for (var u = 0; u < theProp.length; u++) {
			var ChoiceString = aClass.toLowerCase() + "," + feature.toLowerCase() + "," + theProp[u].toLowerCase();
			if (What("Class Features Remember").toLowerCase().indexOf(ChoiceString) !== -1) {
				theReturn = theProp[u].toLowerCase();
				u = theProp.length;
			}
		}
	}
	return theReturn
}

// removes any and all choices from the selected class feature choice options
function RemoveClassFeatureChoice(aClass, feature) {
	var theReturn = "";
	if (CurrentClasses[aClass] && CurrentClasses[aClass].features[feature] && CurrentClasses[aClass].features[feature].choices) {
		var theProp = CurrentClasses[aClass].features[feature].choices;
		for (var u = 0; u < theProp.length; u++) {
			var ChoiceString = aClass.toLowerCase() + "," + feature.toLowerCase() + "," + theProp[u].toLowerCase();
			RemoveString("Class Features Remember", ChoiceString, false);
		}
	}
	return theReturn
}

// returns an object of the different elements to populate the class features or limited features section if olchoice is provided, oldlevel has to be provided as well
function ReturnClassFeatures(aClass, feature, level, choice, oldlevel, oldchoice, ForceClassList, ForceChoice) {
	var tRe = {};
	var aFea = aClass === "race" ? CurrentRace.features[feature] : ForceClassList && !oldchoice && ClassList[aClass].features[feature] && ClassList[aClass].features[feature].name ? ClassList[aClass].features[feature] : CurrentClasses[aClass].features[feature];
	
	if (!aFea) {
		console.println("\nClass/Racial Feature '" + feature + "' for '" + aClass + "' could not be found in the ReturnClassFeatures function.");
		console.show();
	};
	
	tRe.Add = choice && aFea[choice].additional ? aFea[choice].additional : (aFea.additional && !ForceChoice ? aFea.additional : "");
	tRe.AddOld = oldchoice && aFea[oldchoice].additional ? aFea[oldchoice].additional : (aFea.additional && !ForceChoice ? aFea.additional : "");
	
	tRe.Use = choice && aFea[choice].usages ? aFea[choice].usages : (aFea.usages && !ForceChoice ? aFea.usages : "");
	tRe.UseOld = oldchoice && aFea[oldchoice].usages ? aFea[oldchoice].usages : (aFea.usages && !ForceChoice ? aFea.usages : "");
	
	tRe.UseCalc = choice && aFea[choice].usagescalc ? aFea[choice].usagescalc : (aFea.usagescalc && !ForceChoice ? aFea.usagescalc : "");
	tRe.UseCalcOld = oldchoice && aFea[oldchoice].usagescalc ? aFea[oldchoice].usagescalc : (aFea.usagescalc && !ForceChoice ? aFea.usagescalc : "");
	
	tRe.Recov = choice && aFea[choice].recovery ? aFea[choice].recovery : (aFea.recovery && !ForceChoice ? aFea.recovery : "");
	tRe.RecovOld = oldchoice && aFea[oldchoice].recovery ? aFea[oldchoice].recovery : (aFea.recovery && !ForceChoice ? aFea.recovery : "");
	
	tRe.UseName = choice && aFea[choice].name ? aFea[choice].name : (aFea.name && !ForceChoice ? aFea.name : "");
	tRe.UseNameOld = oldchoice && aFea[oldchoice].name ? aFea[oldchoice].name : (aFea.name && !ForceChoice ? aFea.name : "");
	
	tRe.source = choice && aFea[choice].source ? aFea[choice].source : (aFea.source ? aFea.source : "");
	
	for (var aProp in tRe) {
		if (aProp === "source") continue;
		var theP = tRe[aProp];
		if (theP && isArray(theP)) {
			var lvlUse = aProp.indexOf("Old") !== -1 && (oldlevel || oldlevel === 0) ? oldlevel : level;
			lvlUse = Math.min(lvlUse, theP.length);
			tRe[aProp] = theP[lvlUse - 1] ? theP[lvlUse - 1] : "";
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
	
	for (var cType in compString) {
		var cString = compString[cType].string
		if (compString[cType].string) compString[cType].string = tDoc[conStr](compString[cType].string, 0.5);
	};
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
	switch (medium.toLowerCase()) {
	 case "email" :
		app.launchURL(("https://flapkan.com/contact?edit[message]=%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0ASheet version: MPMB\'s " + (tDoc.info.SpellsOnly ? "Complete " + tDoc.info.SpellsOnly.capitalize() + " Spell Sheet" : (tDoc.info.AdvLogOnly ? "Adventure Logsheet" : "Character Record Sheet")) + " v" + semVers + " (" + tDoc.info.SheetType + ")" + " %0D%0APDF viewer: " + app.viewerType + ", v" + app.viewerVersion + "; Language: " + app.language + "; OS: " + app.platform).replace(/ /g, "%20"), true);
		break;
	 case "twitter" :
		app.launchURL("https://twitter.com/BetterOfPurple", true);
		break;
	 case "reddit" :
		app.launchURL("https://www.reddit.com/u/morepurplemorebetter/", true);
		break;
	 case "patreon" :
		app.launchURL("https://www.patreon.com/morepurplemorebetter", true);
		break;
	 case "github" :
		app.launchURL("https://github.com/morepurplemorebetter/", true);
		break;
	 case "dmsguild" :
		app.launchURL("https://www.dmsguild.com/browse.php?author=morepurplemorebetter", true);
		break;
	 case "enworld" :
		app.launchURL("http://www.enworld.org/forum/rpgdownloads.php?do=download&downloadid=1180", true);
		break;
	 case "syntax" :
		app.launchURL("https://flapkan.com/mpmb/syntax", true);
		break;
	 case "additions" :
		app.launchURL("https://flapkan.com/how-to/import-scripts", true);
		break;
	 case "syntaxgit" :
		app.launchURL("https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/tree/master/additional%20content%20syntax", true);
		break;
	 case "additionsgit" :
		app.launchURL("https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/tree/master/additional%20content", true);
		break;
	 case "latestversion" :
		app.launchURL(
			patreonVersion || tDoc.info.SpellsOnly ? LinksLatest.patreon :
			LinksLatest[minVer ? "advlog" : "character"][typePF ? "PF" : "CF"],
			true
		);
		break;
	 case "otherdesign" :
		app.launchURL(
			patreonVersion || tDoc.info.SpellsOnly ? LinksLatest.patreon :
			LinksLatest[minVer ? "advlog" : "character"][typePF ? "CF" : "PF"],
			true
		);
		break;
	 case "fullversion" :
		app.launchURL(
			patreonVersion ? LinksLatest.patreon :
			LinksLatest.character[typePF ? "PF" : "CF"],
			true
		);
		break;
	 case "subreddit" :
		app.launchURL("http://flapkan.com/mpmb/fanforum", true);
		break;
	 case "bug" :
		var sheetType = typePF ? "pf" + ((/redesign/i).test(tDoc.info.SheetType) ? "r" : "") : typeA4 ? "cf-a4" : "cf-lt";
		var acroType = app.viewerType == "Reader" ? "reader-" : "pro-";
		var acroVers = app.viewerVersion < 9 ? "other" : acroType + (app.viewerVersion < 10 ? "ix" : app.viewerVersion < 11 ? "x" : app.viewerVersion < 12 ? "xi" : "dc");
		var bugURL = [
			"https://flapkan.com/contact/bug_report", //base URL
			"?edit[field_sheet_type]=",
			sheetType, // sheet type (cf-a4, cf-lt, pf, pfr)
			"&edit[field_version_number]=",
			sheetVersion, // sheet version, as a decimal
			"&edit[field_operating_system]=",
			app.platform.toLowerCase(), // OS (win, mac, unix, ios, android, other)
			"&edit[field_pdf_viewing_software]=",
			acroVers, // acrobat version (reader-, pro-) + (ix, x, xi, dc)
		];
		app.launchURL(bugURL.join(""), true);
		break;
	};
};

//open a dialogue for the Patreon
function PatreonStatement() {
	try {
		var iNow = new Date();
		var timeDiff = iNow.getTime() - eval(tDoc.getField("SaveIMG.Patreon").submitName).getTime();
		if (Math.floor(timeDiff / (1000 * 3600 * 24)) >= 28) {
			var oButIcon = this.getField("SaveIMG.Patreon").buttonGetIcon();
			var oMyIcon = util.iconStreamFromIcon(oButIcon);	
			
			var theTxt = "If you like this sheet, please consider becoming a patron at the Patreon for MPMB's Character Record Sheet.\n\nWith your contribution on Patreon:\n   \u2022 I can continue expanding the functionality of this sheet.\n   \u2022 You get to choose which new features get added.\n   \u2022 Your favourite third-party material gets added.\n   \u2022 You get instant access and alerts when new versions are released.";
			var theTxt2 = "Don't worry, the sheet will stay available for free on my website.\nHowever, if you feel like contributing more, it will all flow back into expanding the sheets' features and content.\n\nYou can always visit the Patreon webpage using the \"Contact MPMB\" bookmarks.";
			var PatreonDialog = {
				initialize : function (dialog) {
					dialog.load({
						"img1" : oMyIcon
					});
				},
				bPat : function (dialog) {contactMPMB("patreon");},
				description : {
					name : "Become a patron",
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
									name : "Become a patron on Patreon",
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
									name : "Go to the Patreon webpage",
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
function addEvals(evalObj, NameEntity, Add) {
	if (!evalObj) return;
	
	//do the stuff for the attack calculations
	var atkStr = "";
	var remAtkAdd = CurrentEvals.atkAdd ? CurrentEvals.atkAdd : "";
	var atkTypes = ["atkAdd", "atkCalc"];
	var nameHeader = isArray(NameEntity) ? "\n\n" + toUni(NameEntity[0]) + " [" + NameEntity[1] + "]" : "\n\n" + toUni(NameEntity);
	for (var i = 0; i < atkTypes.length; i++) {
		var atkT = atkTypes[i];
		if (!evalObj[atkT]) continue;
		if (!atkStr && evalObj[atkT][1]) atkStr = nameHeader;
		if (evalObj[atkT][1]) atkStr += "\n - " + evalObj[atkT][1];
		if (Add) {
			if (!CurrentEvals[atkT]) CurrentEvals[atkT] = "";
			if (CurrentEvals[atkT].indexOf(evalObj[atkT][0]) === -1) CurrentEvals[atkT] += evalObj[atkT][0];
		} else if (CurrentEvals[atkT]) {
			CurrentEvals[atkT] = CurrentEvals[atkT].replace(evalObj[atkT][0], "");
		}
	};
	if (atkStr) {
		if (Add) {
			if (!CurrentEvals.atkStr) CurrentEvals.atkStr = "";
			if (CurrentEvals.atkStr.indexOf(atkStr) === -1) CurrentEvals.atkStr += atkStr;
		} else if (atkStr && CurrentEvals.atkStr) {
			CurrentEvals.atkStr = CurrentEvals.atkStr.replace(atkStr, "");
		}
	};
	if (remAtkAdd !== CurrentEvals.atkAdd) forceReCalcWeapons = true;
	
	//do the stuff for the hp calculations
	if (evalObj.hp) {
		if (Add) {
			if (!CurrentEvals.hp) CurrentEvals.hp = "";
			if (CurrentEvals.hp.indexOf(evalObj.hp) === -1) CurrentEvals.hp += evalObj.hp;
		} else if (CurrentEvals.hp) {
			CurrentEvals.hp = CurrentEvals.hp.replace(evalObj.hp, "");
		};
		SetHPTooltip();
	};
	
	SetStringifieds("evals"); //now set this global variable to its field for safekeeping
};

//apply the effect of a weapon with inputText the literal string in the Weapon Selection field and fldName the name of the field (any one of them); If fldName is left blank, use the event.target.name
function ApplyWeapon(inputText, fldName, isReCalc, onlyProf) {
	if (IsSetDropDowns) return; // when just changing the dropdowns, don't do anything
	fldName = fldName ? fldName : event.target.name;
	var QI = fldName.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	var fldNmbr = fldName.replace(/.*Attack\.(\d+?)\..+/, "$1");
	var ArrayNmbr = Number(fldNmbr) - 1;
	var fldBase = prefix + Q + "Attack." + fldNmbr + ".";
	var fldBaseBT = prefix + "BlueText." + Q + "Attack." + fldNmbr + ".";
	
	//set the input as the submitName for reference and set the non-automated field with the same value as well
	tDoc.getField(fldBase + "Weapon Selection").submitName = inputText;
	if (!IsNotWeaponMenu || What("Manual Attack Remember") === "Yes" || (!isReCalc && inputText === (QI ? CurrentWeapons.field[ArrayNmbr] : CurrentWeapons.compField[prefix][ArrayNmbr]))) return; //don't do the rest of this function if only moving weapons around or weapons are set to manual or the CurrentWeapons.field didn't change
	
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
		Description_Tooltip : "",
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
	var theWea = QI || isNaN(parseFloat(WeaponName)) ? WeaponsList[WeaponName] : !QI && !isNaN(parseFloat(WeaponName)) && CurrentCompRace[prefix] ? CurrentCompRace[prefix].attacks[WeaponName] : false;
	
	//if there is a new weapon entered and the old weapon had ammo that is not used by any of the current weapons, remove that ammo from the ammo section.
	if (QI && oldWea && WeaponsList[oldWea].ammo) {
		var theOldAmmo = WeaponsList[oldWea].ammo;
		var tempFound = false;
		for (var j = 0; j < CurrentWeapons.known.length; j++) {
			jWeapon = WeaponsList[CurrentWeapons.known[j][0]];
			if (jWeapon && jWeapon.ammo && jWeapon.ammo === theOldAmmo) {
				tempFound = true;
				break;
			};
		};
		if (!tempFound) RemoveAmmo(theOldAmmo);
	};

	// if a weapon was found, set the variables
	if (theWea) {
		thermoTxt = thermoM("Applying the weapon's features...", false); //change the progress dialog text
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
			theWea.dc ? "dc" :
			theWea.modifiers && theWea.modifiers[0] ? theWea.modifiers[0] : 0;
		
		//add Damage Bonus
		fields.Damage_Bonus = isReCalc ? What(fldBaseBT + "Damage Bonus") :
			theWea.modifiers && theWea.modifiers[1] ? theWea.modifiers[1] : 0;
		
		//add proficiency checkmark
		fields.Proficiency = !QI ? true : 
			QI && (/natural|spell|cantrip/i).test(theWea.type) ? true : (RegExp(";" + CurrentWeapons.extraproficiencies.join(";|;").replace(/s;\|/g, "s;?|") + ";", "i")).test(";" + [WeaponName, theWea.type, theWea.list ? theWea.list : " "].join(";") + ";") ? true : 
			(/^(simple|martial)$/i).test(theWea.type) ? tDoc.getField("Proficiency Weapon " + theWea.type.capitalize()).isBoxChecked(0) : false;
		
		//add mod
		var StrDex = What("Str") < What("Dex") ? 2 : 1;
		fields.Mod = isReCalc && !theWea.ability ? What(fldBase + "Mod") :
			(/finesse/i).test(theWea.description) ? StrDex : theWea.ability;
		
		//change mod if this is concerning a spell/cantrip
		if (thisWeapon[3] && thisWeapon[4].length) {
			var abiArr = thisWeapon[4].map( function(sClass) {
				return CurrentSpells[sClass] && CurrentSpells[sClass].ability ? CurrentSpells[sClass].ability : 0;
			});
			var abiModArr = [];
			abiArr.forEach(function (abiNmbr) {
				var thisMod = What(AbilityScores.abbreviations[abiNmbr - 1]);
				if (thisMod > Math.max.apply(Math, abiModArr)) fields.Mod = abiNmbr;
				abiModArr.push(thisMod);
			});
		};
		
		if (theWea.ammo) fields.Ammo = theWea.ammo; //add ammo
		
		//now run the code that was added by class/race/feat
		if (QI && CurrentEvals.atkAdd) {
			
			// define some variables that we can check against later or with the CurrentEvals
			var WeaponText = inputText + " " + fields.Description;
			var isDC = (/dc/i).test(fields.To_Hit_Bonus);
			var isSpell = thisWeapon[3] || (/cantrip|spell/i).test(theWea.type) || (/\b(cantrip|spell)\b/i).test(WeaponText);
			var isMeleeWeapon = !isSpell && (/melee/i).test(fields.Range);
			var isRangedWeapon = !isSpell && (/^(?!.*melee).*\d+.*$/i).test(fields.Range);
			var isNaturalWeapon = !isSpell && (/natural/i).test(theWea.type);
			
			try {
				eval(CurrentEvals.atkAdd);
			} catch (err) {console.println("Custom ApplyWeapon/atkAdd script not working: " + err)};
		};
	};

	// apply the values to the fields only if we need to either reset the fields or a weapon was found
	if (onlyProf) {
		Checkbox(fldBase + "Proficiency", fields.Proficiency);
	} else if (theWea || !inputText) {
		var resetFlds = [];
		for (var weaKey in fields) {
			var keyFld = (BTflds.indexOf(weaKey) !== -1 ? fldBaseBT : fldBase) + weaKey.replace(/_/g, " ");
			if (!fields[weaKey]) {
				if (tDoc.getField(keyFld)) resetFlds.push(keyFld);
				continue;
			};
			switch (weaKey) {
			 case "Description_Tooltip" : 
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
				Value(keyFld, What("Unit System") === "imperial" ? fields[weaKey] : ConvertToMetric(fields[weaKey], 0.5));
				break;
			 case "Ammo" :
				if (fields[weaKey]) AddAmmo(fields[weaKey]);
				break;
			 default :
				Value(keyFld, fields[weaKey], weaKey !== "Description" ? "" : fields.Description_Tooltip);				
			};
		};
		if (resetFlds.length) tDoc.resetForm(resetFlds);
	} else { //if not a known weapon or an empty field, still check if we need to set the checkmark for proficiency
		for (var i = 0; i < CurrentWeapons.manualproficiencies.length; i++) {
			if (CurrentWeapons.field[ArrayNmbr].toLowerCase().indexOf(CurrentWeapons.manualproficiencies[i].toLowerCase()) !== -1) {
				Checkbox(fldBase + "Proficiency", true);
				break;
			};
		};
	};
	if (QI && ((event.target && fldName === event.target.name) || Number(fldNmbr) === FieldNumbers.attacks)) SetOffHandAction();
	thermoM(thermoTxt, true); // Stop progress bar
};

//calculate the attack damage and to hit, can be called from any of the attack fields (sets the fields)
function CalcAttackDmgHit(fldName) {
	if (What("Manual Attack Remember") === "Yes") return; //if the attack calculation is set to manual, don't do anything
	
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
	var theWea = WeaponsList[WeaponName];
	var WeaponText = (QI ? CurrentWeapons.field[ArrayNmbr] : CurrentWeapons.compField[prefix][ArrayNmbr]) + (fields.Description ? " " + fields.Description : "");
	
	if (!WeaponText || (/^(| |empty)$/).test(fields.Mod)) {
		Value(fldBase + "Damage", "");
		Value(fldBase + "To Hit", "");
		if (QI) CurrentWeapons.offHands[ArrayNmbr] = false;
		return;
	};
	
	// get the damage bonuses from the selected modifier, magic, and the blueText field
	var output = {
		prof : !fields.Proficiency ? 0 : (QI ? (tDoc.getField("Proficiency Bonus Dice").isBoxChecked(0) ? 0 : What("Proficiency Bonus")) : (tDoc.getField(prefix + "BlueText.Comp.Use.Proficiency Bonus Dice").isBoxChecked(0) ? 0 : What(prefix + "Comp.Use.Proficiency Bonus"))),
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
	var isDC = (/dc/i).test(fields.To_Hit_Bonus);
	if (QI) {
		var isSpell = thisWeapon[3] || (theWea && (/cantrip|spell/i).test(theWea.type)) || (/\b(cantrip|spell)\b/i).test(WeaponText);
		var isMeleeWeapon = (!isSpell || thisWeapon[0] === "shillelagh") && (/melee/i).test(fields.Range);
		var isRangedWeapon = !isSpell && (/^(?!.*melee).*\d+.*$/i).test(fields.Range);
		var isNaturalWeapon = !isSpell && theWea && (/natural/i).test(theWea.type);

		// see if this is a off-hand attack and the modToDmg shouldn't be use
		var isOffHand = isMeleeWeapon && (/^(?!.*(spell|cantrip))(?=.*(off.{0,3}hand|secondary)).*$/i).test(WeaponText);
		CurrentWeapons.offHands[ArrayNmbr] = isOffHand;
		if (isOffHand) output.modToDmg = output.mod < 0;

		//add the BlueText field value of the corresponding spellcasting class
		if (thisWeapon[3] && thisWeapon[4].length) {
			var DCorHit = isDC ? "dc" : "atk";
			var abiBonArr = thisWeapon[4].map( function(sClass) {
				var ExtraBonus = CurrentSpells[sClass] && CurrentSpells[sClass].blueTxt && CurrentSpells[sClass].blueTxt[DCorHit] ? CurrentSpells[sClass].blueTxt[DCorHit] : 0;
				return EvalBonus(ExtraBonus, true);
			});
			output.extraHit += Math.max.apply(Math, abiBonArr);
		};

		// now run the code that was added by class/race/feat
		if (CurrentEvals.atkCalc) {
			try {
				eval(CurrentEvals.atkCalc);
			} catch (err) {console.println("Custom CalcAttackDmgHit/atkCalc script not working: " + err)};
		};
	};
	
	var dmgDie = "";
	var dmgNum = 0;
	var hitNum = 0;
	var addNum = function(inP, DmgHit) {
		if (isNaN(inP)) inP = isNaN(Number(inP)) ? 0 : Number(inP);
		if (!DmgHit || (/dmg/i).test(DmgHit)) dmgNum += Number(inP);
		if (!DmgHit || (/hit/i).test(DmgHit)) hitNum += Number(inP);
	};
	
	for (var out in output) {
		switch (out) {
		 case "modToDmg" :
			break;
		 case "prof" :
			addNum(output[out], "hit");
			break;
		 case "extraHit" :
			addNum(output[out], "hit");
			break;
		 case "extraDmg" :
			addNum(output[out], "dmg");
			break;
		 case "die" :
			dmgDie = EvalDmgDie(output[out], QI ? true : prefix);
			break;
		 case "mod" :
			if (output.modToDmg) addNum(output[out], "dmg");
			addNum(output[out], "hit");
			break;
		 case "bHit" :
			if (isDC) {
				addNum(8, "hit");
			};
		 case "bDmg" :
		 // if the blueText field is not a number, find the ability modifier
			addNum(EvalBonus(output[out], QI ? true : prefix), out);
			break;
		 default :
			addNum(output[out]);
			break;
		};
	};
	if (!isNaN(Number(dmgDie))) dmgDie = Number(dmgDie);
	if (dmgDie && isNaN(dmgDie) && Number(dmgNum) > 0) dmgNum = "+" + dmgNum;
	var dmgTot = dmgDie + (dmgNum === 0 ? "" : dmgNum);
	var hitTot = (isDC ? "DC " : (hitNum >= 0 ? "+" : "")) + hitNum;
	
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

//a way to show a very long piece of text without the dialogue overflowing the screen
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
			tArr = srcArr[srcGroups[i]];
			for (var j = 0; j < tArr.length; j++) {
				var theSrc = srcRef[tArr[j]];
				strng += "\n\u2022 " + (SourceList[theSrc].abbreviation + "            ").substr(0,12) + "\t" + SourceList[theSrc].name;
			};
		};
	}
	var ShowString_dialog = {
		initialize : function(dialog) {
			dialog.load({
				"Eval" : strng.replace(/^\n*/, "")
			});
		},
		description : {
			name : hdr,
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : [{
					type : "view",
					elements : [{
						type : "static_text",
						item_id : "head",
						alignment : "align_fill",
						font : "heading",
						bold : true,
						wrap_name : true,
						width : 550,
						name : hdr
					}, {
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
					type : "ok"
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

// a way to eval the content of a modifier field; notComp if it is the character (true) or if it is for a companion page (the prefix of the companion page); if isSpecial === "test" it will output undefined if an error occurs; if isSpecial is a number it will look for that entry on the Wild Shape page with the corresponding notComp variable as a prefix;
function EvalBonus(input, notComp, isSpecial) {
	if (!input) {
		return 0;
	} else if (!isNaN(input)) {
		return Number(input);
	};
	var modStr = notComp === true ? ["", " Mod"] : !isSpecial || isSpecial === "test" ? [notComp + "Comp.Use.Ability.", ".Mod"] : [notComp + "Wildshape." + isSpecial + ".Ability.", ".Mod"];
	// first remove "dc", add a "+" between abbreviations, and removing double or trailing operators
	input = input.replace(/,/g, ".").replace(/dc/ig, "").replace(/o?(Str|Dex|Con|Int|Wis|Cha|HoS|Prof)o?(Str|Dex|Con|Int|Wis|Cha|HoS|Prof)/ig, "$1+$2").replace(/(\+|\-|\/|\*)(\+|\-|\/|\*)/g, "$2").replace(/(^(\+|\/|\*))|((\+|\-|\/|\*)$)/g, "");
	// change ability score abbreviations with their modifier
	["oStr", "oDex", "oCon", "oInt", "oWis", "oCha", "oHoS"].forEach(function(AbiS) {
		input = input.replace(RegExp(AbiS, "ig"), Number(What(AbiS.substr(1) + " Mod")));
	});
	["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"].forEach(function(AbiS) {
		input = input.replace(RegExp(AbiS, "ig"), Number(What(modStr[0] + AbiS + modStr[1])));
	});
	// change Prof with the proficiency bonus
	var ProfB = notComp === true ? How("Proficiency Bonus") : !isSpecial || isSpecial === "test" ? What(notComp + "Comp.Use.Proficiency Bonus") : What(notComp + "Wildshape." + isSpecial + ".Proficiency Bonus");
	input = input.replace(/oProf/ig, How("Proficiency Bonus"));
	input = input.replace(/Prof/ig, ProfB);
	try {
		output = eval(input);
		return !isNaN(output) ? Math.round(Number(output)) : 0;
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
	// resolve the C and B for cantrip die, if present
	if ((/^(?=.*(B|C))(?=.*d\d).*$/).test(input)) { //if this involves a cantrip calculation
		var cLvl = Number(notComp === true ? What("Character Level") : What(notComp + "Comp.Use.HD.Level"));
		var cDie = cantripDie[Math.min(Math.max(cLvl, 1), cantripDie.length) - 1];
		input = input.replace(/cha/ig, "kha").replace(/con/ig, "kon");
		input = input.replace(/C/g, cDie).replace(/B/g, cDie - 1).replace(/0.?d\d+/g, 0);
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
		var theName = event.target.userName;
		if (theName && (/\n/).test(theName)) {
			theName = theName.match(/.*\n/)[0].replace(/\n/, "");
		};
		var theVal = event.target.value;
		if (!isNaN(theVal)) theVal = theVal.toString();
		var theExpl = event.target.submitName.replace(/^\n*/, "");
		var theDialTxt = (dmgDie ? "If you want the Damage Die to be a calculated value, and not just a string, make sure the first character is a '='.\nRegardless of the first character, a 'C' will be replaced with the Cantrip die, and a 'B' with the Cantrip die minus 1.\n\nIf a calculated value (=), you can use underscores to keep the strings separate. For the calculated parts, y" : "Y") + "ou can use numbers, logical operators (+, -, /, *), ability score abbreviations (Str, Dex, Con, Int, Wis, Cha" + (QI === true ? ", HoS" : "") + "), and 'Prof'." + (QI === true ? "" : "\nIn addition, you can use the values from the character (the 1st page) by adding the letter 'o' before the variable (oStr, oDex, oCon, oInt, oWis, oCha, oHoS, oProf).");
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
				name : "Set the field's value",
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
						char_width : 35,
						name : theName ? theName : "Set the field's value"
					}, {
						type : "cluster",
						alignment : "align_fill",
						item_id : "txt0",
						name : "Fill out the value you want to set",
						font : "dialog",
						bold : true,
						elements : [{
							type : "static_text",
							alignment : "align_left",
							item_id : "txt3",
							name : theDialTxt,
							char_width : 35,
							wrap_name : true
						}, {
							type : "edit_text",
							alignment : "align_center",
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
								item_id : "txt2",
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
						}]
					}, {
						type : "static_text",
						alignment : "align_fill",
						item_id : "txt1",
						wrap_name : true,
						name : "If the above calculates to 'ERROR', the field will not be changed.\nNote that the field won't appear to change until you click/tab out of it.",
						char_width : 35
					}].concat(theExpl ? [{
						type : "cluster",
						alignment : "align_fill",
						name : "Modifiers set by class features, race, or feats",
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
						}]
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
	if (!isNaN(Mod)) {
		Mod = Remove ? -1 * Mod : Mod;
		if (!isNaN(aFld)) {
			setFld = aFld + Mod;
		} else if ((/\d+/).test(aFld)) {
			var FldNum = Number(aFld.match(/-?\d+/)[0]);
			var FldNumNew = FldNum + Mod;
			setFld = aFld.replace(RegExp("\\+?" + FldNum.toString(), "i"), (FldNumNew < 0 ? "" : "+") + FldNumNew);
		} else {
			setFld = aFld + (Mod < 0 ? "" : "+") + Mod;
		};
	} else {
		if (Remove) {
			setFld = aFld.replace(RegExp("\\+?" + Mod, "i"), "");
		} else {
			setFld = (aFld ? aFld : "") + (Mod.substr(0, 1) === "-" ? "" : "+") + Mod
		};
	};
	setFld = setFld.replace(/^\+|(\+|-)0/g, "");
	var theSubmit = How(Fld);
	if (NameEntity && Explanation) {
		var theAdd = "\n\n" + toUni(NameEntity) + "\n" + Explanation;
		if (Remove) {
			theSubmit = theSubmit.replace(theAdd, "");
		} else {
			theSubmit += theAdd;
		};
	};
	Value(Fld, setFld, undefined, theSubmit);
};

// add a modifier to a skill
// addMod : {type : "save", field : "all", mod : "Cha", text : "While I'm conscious I can add my Charisma modifier (min 1) to all my saving throws."} // this can be an array of objects, all of which will be processed
function processMods(AddRemove, NameEntity, items) {
	if (!isArray(items)) items = [items];
	for (var i = 0; i < items.length; i++) {
		var type = items[i].type.toLowerCase();
		var Fld = items[i].field;
		var Mod = items[i].mod;
		var Explanation = items[i].text;
		switch (type) {
			case "skill" :
				if ((/all/i).test(Fld)) {
					Fld = "All Skills Bonus";
				} else if ((/pass/i).test(Fld)) {
					Fld = "Passive Perception Bonus";
				} else {
					var skill = Fld.substr(0,4).capitalize();
					if (SkillsList.abbreviations.indexOf(skill) === -1) {
						skill = skill.substr(0,3);
						if (SkillsList.abbreviations.indexOf(skill) === -1) continue;
					};
					var skillOrder = Who("Text.SkillsNames") === "alphabeta" ? "abbreviations" : "abbreviationsByAS";
					Fld = SkillsList.abbreviations[SkillsList[skillOrder].indexOf(skill)] + " Bonus";
				};
				break;
			case "save" :
				var matchSv = /.*(Str|Dex|Con|Int|Wis|Cha|HoS|All).*/i;
				if (!(matchSv).test(Fld)) continue;
				var save = Fld.replace(matchSv, "$1").capitalize();
				if (save === "Hos") save = "HoS";
				Fld = save + " ST Bonus";
				break;
			default :
				if (!tDoc.getField(Fld)) continue;
		};
		AddToModFld(Fld, Mod, !AddRemove, NameEntity, Explanation);
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
	case "armour" : {
		
		break;
	};
	case "weapon" : {
		
		break;
	};
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
			var TooltipTxt = AbiNm + " saving throws proficiency was gained from:\n \u2022 ";
			for (var i = 0; i < set[Abi].length; i++) {
				TooltipTxt += (i ? ";\n \u2022 " : "") + set[Abi][i];
			};
			TooltipTxt += ".";
			Checkbox(SvFld, true, TooltipTxt);
		} else {
			Checkbox(SvFld, false, "");
		};
		break;
	};
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
		break;
	};
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
				var theTooTxt = ProfObj + " (" + toolAbi + ")";
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
		break;
	};
	case "savetxt" : { // text to be put in the "Saving Throw advantages / disadvantages" field
		var fld = "Saving Throw advantages / disadvantages";
		//create the set object if it doesn't exist already
		var setKeys = function() {
			for (var e in set) {return true;};
			CurrentProfs.savetxt = { text : {}, immune : {}, adv_vs : {} };
			set = CurrentProfs.savetxt;
		}();
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
			var adv_vsArr = [], immuneArr = [];
			for (var svAdv in set.adv_vs) {
				if (!set.immune[svAdv]) adv_vsArr.push(set.adv_vs[svAdv].name);
			};
			for (var svImm in set.immune) {
				immuneArr.push(set.immune[svImm].name);
			};
			adv_vsArr.sort();
			immuneArr.sort();
			var theRe = {
				adv_vs : formatLineList(preTxt.adv_vs, adv_vsArr),
				adv_vsA : adv_vsArr,
				immune : formatLineList(preTxt.immune, immuneArr),
				immuneA : immuneArr
			};
			return theRe;
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
		break;
	};
	case "vision" : { // Extra is optionally used to add a range, in feet, to the vision entry
		var fld = "Vision";
		var range = Extra ? Extra : 0;
		if (AddRemove) { // add
			if (!set[ProfObjLC]) {
				set[ProfObjLC] = {name : ProfObj, src : [], ranges : {}};
				var prevNm = "";
			} else {
				var prevRng = RoundTo(getHighestTotal(set[ProfObjLC].ranges) * (metric ? 0.3 : 1), 0.5, false, true);
				var prevNm = set[ProfObjLC].name + (!prevRng ? "" : " " + prevRng + (metric ? " m" : " ft"));
			}
			var theSet = set[ProfObjLC];
			if (theSet.src.indexOf(ProfSrc) !== -1) return; // the thing already exists so exit
			theSet.src.push(ProfSrc);
			theSet.ranges[ProfSrc] = range;
			// See what the new entry is now
			var newRng = RoundTo(getHighestTotal(theSet.ranges) * (metric ? 0.3 : 1), 0.5, false, true);
			var newNm = theSet.name + (!newRng ? "" : " " + newRng + (metric ? " m" : " ft"));
			// Add or replace someting in the field
			if (prevNm != newNm) {
				ReplaceString(fld, newNm, "; ", prevNm);
			};
		} else if (set[ProfObjLC]) { // remove
			var theSet = set[ProfObjLC];
			if (theSet.src.indexOf(ProfSrc) !== -1) theSet.src.splice(theSet.src.indexOf(ProfSrc), 1);
			if (theSet.src.length == 0) { // remove all of this entry
				var newRng = RoundTo(getHighestTotal(theSet.ranges) * (metric ? 0.3 : 1), 0.5, false, true);
				var newNm = theSet.name + (!newRng ? "" : " " + newRng + (metric ? " m" : " ft"));
				RemoveString(fld, newNm);
				delete set[ProfObjLC];
			} else {
				var prevRng = RoundTo(getHighestTotal(theSet.ranges) * (metric ? 0.3 : 1), 0.5, false, true);
				var prevNm = theSet.name + (!prevRng ? "" : " " + prevRng + (metric ? " m" : " ft"));
				if (theSet.ranges[ProfSrc] !== undefined) delete theSet.ranges[ProfSrc];
				var newRng = RoundTo(getHighestTotal(theSet.ranges) * (metric ? 0.3 : 1), 0.5, false, true);
				var newNm = theSet.name + (!newRng ? "" : " " + newRng + (metric ? " m" : " ft"));
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
		break;
	};
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
			var useObj = eval(inpObj.toSource());
			var goOn = function() {for (var e in useObj) {return true;} return false; }();
			if (!goOn) return fullString == "both" ? ["", 0] : fullString ? "" : 0;
			useObj.extra = extra;
			var total = getHighestTotal(useObj, true, replaceWalk, CurrentProfs.speed.allModes);
			var typeStr = type === "walk" ? "" : type + " ";
			var totalStr = !total ? "" : typeStr + RoundTo(total * (metric ? 0.3 : 1), 0.5, false, true) + (metric ? " m" : " ft");
			return fullString == "both" ? [totalStr, total] : fullString ? totalStr : total;
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
				var typeRE = sT === "walk" ? /^(\d+.?\d*).*/ : RegExp(".*" + sT + " *(\\d+.?\\d*).*", "i");
				if ((typeRE).test(str)) strParse = Number(str.replace(typeRE, "$1"));
				if (metric) strParse = RoundTo(strParse / 0.3, 5, false, false);
				var total = strParse - oldTotals[sT + type];
				deltaSpds[sT + type] = !total ? 0 : total > 0 ? "+" + total : total.toString();
			}
		};
		splitSpdString("Spd", fldSpdW);
		splitSpdString("Enc", fldEncdW);
		if (isArray(ProfObj)) ProfObj = { walk : {spd : parseFloat(ProfObj[0]), enc : parseFloat(ProfObj[1])} };
		// add or remove the ProfObj from the current object
		for (var spdType in ProfObj) {
			if (!CurrentProfs.speed[spdType]) continue
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
			theVal += " ft";
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
					} else {
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
		Value(fldSpd, spdString, ttips.spd);
		Value(fldEnc, encString, ttips.enc);
		break;
	};
 };
	SetStringifieds("profs");
};

//a way of creating a formatted list with multiple lines or on a single line
function formatMultiList(caption, elements) {
	if (isArray(elements) && elements.length === 0) return "";
	if (!isArray(elements)) elements = [elements];
	var rStr = caption + "\n \u2022 " + elements[0];
	for (var i = 1; i < elements.length; i++) {
		rStr += ";\n \u2022 " + elements[i];
	};
	return rStr + ".";
};
function formatLineList(caption, elements) {
	if (isArray(elements) && elements.length === 0) return "";
	if (!isArray(elements)) elements = [elements];
	var rStr = caption + " " + elements[0];
	var EL = elements.length;
	for (var i = 1; i < EL; i++) {
		rStr += EL > 2 ? "," : "";
		rStr += (i === EL - 1 ? " and " : " ") + elements[i];
	};
	return rStr;
};

//a way to condense an array of numbers down to the highest and modifiers
function getHighestTotal(nmbrObj, notRound, replaceWalk, extraMods) {
	var values = [0];
	var modifications = [];
	var fixedVals = [0];
	var noModsIfWalks = false;
	var prsVal = function(val) {
		if (!val) {
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
	//process the modifications
	var processModifiers = function(modA) {
		for (n = 1; n <= 2; n++) { // first do substractions and additions, then multiplications and divisions
			for (var i = 0; i < modA.length; i++) {
				var aMod = modA[i];
				var aOperator = aMod.substring(0,1);
				var aValue = Number(aMod.substring(1));
				if (isNaN(aValue)) continue;
				if (n === 1) {
					switch (aOperator) {
						case "+" :
							tValue += aValue;
							break;
						case "-" :
						case "\u2015" :
							tValue -= aValue;
							break;
						case "_" :
							tValue = tValue ? tValue + aValue : tValue;
							break;
					};
				} else {
					switch (aOperator) {
						case "x" :
						case "X" :
						case "*" :
						case "\u00d7" :
							tValue *= aValue;
							break;
						case "/" :
						case ":" :
							tValue /= aValue;
							break;
					};
				};
			};
		};
	};
	if (modifications.length) processModifiers(modifications);
	if (tValue && extraMods && !(replaceWalk && noModsIfWalks && tValue === replaceWalk)) {
		modifications = [];
		recurProcess(extraMods);
		if (modifications.length) processModifiers(modifications);
	};
	if (fixedVals.length > 1) {
		tValue = Math.max.apply(Math, fixedVals.concat([tValue]));
	};
	return notRound ? tValue : Math.round(tValue);
};

// open a dialogue with a number of lines of choices and return the choices in an array; if knownOpt === "radio", show radio buttons instead, and return the entry selected
// if notProficiencies is set to true, the optType will serve as the dialog header, and optSrc will serve as the multline explanatory text
function AskUserOptions(optType, optSrc, optSubj, knownOpt, notProficiencies) {
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
	
	var diaHeader = notProficiencies ? optType : "Select proficiencies";
	
	//make all the known options lowercase for easier testing
	if (knownOpt && knownOpt !== "radio") { for (var i = 0; i < knownOpt.length; i++) { knownOpt[i] = knownOpt[i].toLowerCase(); }; };
	
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
			name : diaHeader,
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
				}, {
					type : "static_text",
					alignment : "align_fill",
					item_id : "txtL",
					wrap_name : true,
					name : "You can always change what you set here at a later time by editing the corresponding field on the sheet. What you select here is not permanent.",
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

// A way to add a string to a notes page, or generate a notes page if it didn't exist yet
function AddToNotes(noteStr, alertTxt, oldNoteStr) {
	if (What("Unit System") === "metric") {
		noteStr = ConvertToMetric(noteStr, 0.5);
		if (oldNoteStr) oldNoteStr = ConvertToMetric(oldNoteStr, 0.5);
	};
	noteStr = noteStr.replace(/\n/g, "\r");
	if (oldNoteStr) oldNoteStr = oldNoteStr.replace(/\n/g, "\r");
	var replaceOldNote = false;
	if (!isTemplVis("ASnotes")) {
		var noteFld = DoTemplate("ASnotes", "Add");
		noteFld += "Notes.Left";
	} else {
		var noteFld = false;
		var noteFlds = ["Notes.Left", "Notes.Right"];
		var notesPrefix = What("Template.extras.ASnotes").split(",");
		for (var i = 1; i < notesPrefix.length; i++) {
			for (var n = 0; n < noteFlds.length; n++) {
				var aFld = notesPrefix[i] + noteFlds[n];
				var inFld = What(aFld);
				if (noteStr && inFld.toLowerCase().indexOf(noteStr.toLowerCase()) !== -1) {
					return;
				} else if (oldNoteStr && inFld.toLowerCase().indexOf(oldNoteStr.toLowerCase()) !== -1) {
					noteFld = aFld;
					replaceOldNote = true;
					i = noteFlds.length;
					break;
				} else if (inFld === "" && !noteFld) {
					noteFld = aFld;
				};
			};
		};
		if (!noteFld && noteStr) {
			noteFld = DoTemplate("ASnotes", "Add");
		} else if (!noteStr && !oldNoteStr) {
			return;
		};
	};
	ReplaceString(noteFld, noteStr, false, oldNoteStr ? oldNoteStr : "");
	if (!replaceOldNote && noteStr && alertTxt) {
		app.alert({
			cTitle : alertTxt + " is added on the Notes page",
			cMsg : "You can find the rules for " + alertTxt + " on the \"Notes\" page at page no. " + (tDoc.getField(noteFld).page + 1) + ".\n\nThese rules are simply to much for the Class Features section and do not fit with the rest that needs to go in the third page's Notes section. Thus, these rules will be put on a Notes page and will be updated there.",
			nIcon : 3
		});
	};
};

// check if a newer version is available (Acrobat Pro only)
function checkForUpdates() {
	if (!(/exchange/i).test(app.viewerType)) return; // using Reader
	var serv = Net.SOAP.connect("http://update.flapkan.com/mpmb.wsdl");
	if (!serv || !serv.version) return;
	var thisType = typeA4 ? "CF-A4" : typeLR ? "CF-L" : (/redesign/i).test(tDoc.info.SheetType) ? "PF-R" : "PF";
	var lVers = parseFloat(serv.version(thisType));
	if (!lVers) return;
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
	// skills & initiative
	cFlds = cFlds.concat(skills);
	cFlds = cFlds.concat(["Too", "Passive Perception", "Initiative bonus"]);
	if (!typePF) cFlds.push("Init Dex Mod");
	// Spell Saves
	cFlds = cFlds.concat(["Spell save DC 1", "Spell save DC 2"]);
	// AC
	cFlds = cFlds.concat(["AC Armor Bonus", "AC Dexterity Modifier", "AC"]);
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
	cFlds.push("Extra.Gear Weight Subtotal Right");
	cFlds.push("Extra.Gear Weight Subtotal Left");
	for (var i = 1; i <= 6; i++) cFlds.push("Extra.Gear Location.Subtotal "+i);
	// weight carried
	cFlds.push("Weight Remember Coins Total");
	cFlds.push("Weight Remember Magic Items Total");
	cFlds.push("Weight Carried");
	// unrelated fields
	cFlds = cFlds.concat(["Next level", "SheetInformation"]);
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
		// companion initiative
		cFlds.push(tpl+"Comp.Use.Combat.Init.Mod");
		if (!typePF) cFlds.push(tpl+"Comp.Use.Combat.Init.Dex");
		// companion HD
		if (!typePF) cFlds.push(tpl+"Comp.Use.HD.Con");
		// companion equipment
		if (typePF) {
			cFlds.push(tpl+"Comp.eqp.Gear Weight Subtotal");
		} else {
			cFlds = cFlds.concat([tpl+"Comp.eqp.Gear Weight Subtotal Left", tpl+"Comp.eqp.Gear Weight Subtotal Right"]);
		}
		// companion notes
		cFlds.push(tpl+"Comp.eqp.Notes");
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
		for (var i = 0; i <= 3; i++) cFlds = cFlds.concat([tpl+"spellshead.prepare."+i, tpl+"spellshead.dc."+i, tpl+"spellshead.attack."+i]);
	}
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
