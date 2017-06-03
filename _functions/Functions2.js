//find the creature on the companion page
function ParseCreature(Inputs) {
	var result = "";
	
	if (Inputs) {
		var tempString = removeDiacritics(Inputs.toLowerCase());
		var foundLen = 0;

		for (var key in CreatureList) { //scan string for all creatures
			if (key.length > foundLen && tempString.indexOf(key) !== -1) {
				if (testSource(key, CreatureList[key], "creaExcl")) continue; // test if the creature or its source isn't excluded
				result = key;
				foundLen = key.length;
			}
		}
	}
	return result;
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
	if (theType) {
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
	}
}

//add a creature to the companion page
function ApplyCompRace(newRace) {
	if (event.target && event.target.name.indexOf("Comp.Race") !== -1 && newRace.toLowerCase() === event.target.value.toLowerCase()) return; //no changes were made
	
	thermoM("start"); //start a progress dialog
	thermoM("Applying companion race..."); //change the progress 
	tDoc.delay = true;
	tDoc.calculate = false;
	
	var prefix = event.target.name.substring(0, event.target.name.indexOf("Comp."));
	
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
		thermoM("Resetting the companion page..."); //change the progress dialog text
		CurrentCompRace[prefix] = {}; //reset the global variable to nothing
		tDoc.resetForm(compFields); //rest all the fields
		thermoM(1/3); //increment the progress dialog's progress
		resetDescTooltips(); //remove descriptive tooltips
		resetCompTypes(prefix); //remove strings
		thermoM(2/3); //increment the progress dialog's progress
		tDoc.getField(prefix + "Comp.Race").submitName = "";
		thermoM("stop"); //stop the top progress dialog
		tDoc.calculate = IsNotReset;
		tDoc.delay = !IsNotReset;
		if (IsNotReset) {
			tDoc.calculateNow();
		};
		return; //don't do the rest of the function
	}
	if (FindCompRace(newRace, prefix)) { //fill the global variable. If the return is true, it means that no (new) race was found, so the function can be stopped
		thermoM("stop"); //stop the top progress dialog
		tDoc.calculate = IsNotReset;
		tDoc.delay = !IsNotReset;
		if (IsNotReset) {
			tDoc.calculateNow();
		};
		return; //don't do the rest of the function
	}
	resetCompTypes(prefix); //remove stuff from the companion type (actions, strings, etc.)
	if (CurrentCompRace[prefix].typeFound === "race") {// do the following if a race was found
		tDoc.resetForm(compFields); //reset all the fields
		thermoM("Adding the companion's player race..."); //change the progress dialog text
		
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
		var theSpeed = isNaN(CurrentCompRace[prefix].speed[0]) ? CurrentCompRace[prefix].speed[0] : CurrentCompRace[prefix].speed[0] + " ft";
		theSpeed = What("Unit System") === "imperial" ? theSpeed : ConvertToMetric(theSpeed, 0.5);
		Value(prefix + "Comp.Use.Speed", theSpeed);
		
		thermoM(3/11); //increment the progress dialog's progress
		
		//set senses
		if (CurrentCompRace[prefix].vision) {
			var theSenses = What("Unit System") === "imperial" ? CurrentCompRace[prefix].vision : ConvertToMetric(CurrentCompRace[prefix].vision, 0.5);
			Value(prefix + "Comp.Use.Senses", theSenses);
		}
		
		thermoM(4/11); //increment the progress dialog's progress
		
		//add a string of the languages known to the features
		var languageString = "\u25C6 " + "Languages: ";
		var theEnd = CurrentCompRace[prefix].languages.length - 1;
		for (var l = 0; l <= theEnd; l++) {
			var divider = l === 0 ? "" : l === theEnd ? " and " : ", ";
			languageString += divider + CurrentCompRace[prefix].languages[l];
			languageString += l === theEnd ? "." : "";
		}
		AddString(prefix + "Comp.Use.Features", languageString, true);
		
		thermoM(5/11); //increment the progress dialog's progress
		
		//add a string of the saveText to the features
		if (CurrentCompRace[prefix].savetxt) {
			AddString(prefix + "Comp.Use.Features", "\u25C6 " + "Saving Throws: " + CurrentCompRace[prefix].savetxt + ".", true);
		}
		
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
		}
		
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
		}
		
		thermoM(8/11); //increment the progress dialog's progress
		
		//add a string of any tool proficiencies to the features
		if (CurrentCompRace[prefix].tools) {
			toolString = "\u25C6 " + "Tool Proficiencies: ";
			theEnd = CurrentCompRace[prefix].tools.length - 1;
			for (var l = 0; l <= theEnd; l++) {
				var divider = l === 0 ? "" : l === theEnd ? " and " : ", ";
				toolString += divider + CurrentCompRace[prefix].tools[l];
				toolString += l === theEnd ? "." : "";
			}
			AddString(prefix + "Comp.Use.Features", toolString, true);
		}
		
		thermoM(9/11); //increment the progress dialog's progress
		
		//add skill proficiencies
		if (CurrentCompRace[prefix].skills) {
			for (var i = 0; i < CurrentCompRace[prefix].skills.length; i++) {
				AddSkillProf(CurrentCompRace[prefix].skills[i]);
			}
		};
		
		thermoM(10/11); //increment the progress dialog's progress
		
		//add weapons
		if (CurrentCompRace[prefix].weapons) {
			for (i = 0; i < CurrentCompRace[prefix].weapons.length; i++) {
				AddWeapon(CurrentCompRace[prefix].weapons[i]);
			}
		};
		
		thermoM("stop"); //stop the top progress dialog
	} else if (CurrentCompRace[prefix].typeFound === "creature") {// do the following if a creature was found
		thermoM("Adding the companion creature..."); //change the progress dialog text
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
		
		thermoM("stop"); //stop the top progress dialog
	}
	
	SetHPTooltip();
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) {
		tDoc.calculateNow();
	};
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
			var instanceBox = prefix === "" ? 1 : 0;
			if (tDoc.getField(eName.replace("Mod", "Prof").replace("Perc.Pass", alphaB ? "Perc" : "Perf")).isBoxChecked(instanceBox)) {
				ProfBonus += What(prefix + "Comp.Use.Proficiency Bonus");
				if (tDoc.getField(eName.replace("Mod", "Exp").replace("Perc.Pass", alphaB ? "Perc" : "Perf")).isBoxChecked(instanceBox)) {
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
	if (!input || !CurrentCompRace[prefix] || !CurrentCompRace[prefix].attacks) {
		return "";
	}
	var tempString = removeDiacritics(input.toLowerCase());
	var output = "";
	var tempFound = false;
	
	//scan string for all attacks
	for (var n = 0; n < CurrentCompRace[prefix].attacks.length; n++) {
		if (!tempFound && tempString.indexOf(CurrentCompRace[prefix].attacks[n].name.toLowerCase()) !== -1) {
			output = n;
			tempFound = true;
		}
	}
	
	return output;
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
	if (event.target && event.value.toLowerCase() === event.target.value.toLowerCase()) return; //no changes were made
	
	thermoM("start"); //start a progress dialog
	thermoM("Applying wild shape..."); //change the progress 
	tDoc.delay = true;
	tDoc.calculate = false;
	
	var prefix = event.target.name.substring(0, event.target.name.indexOf("Wildshape"));
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
		thermoM("Resetting the wild shape..."); //change the progress dialog text
		tDoc.resetForm(resetFlds);
		thermoM(1/2); //increment the progress dialog's progress
		resetTooltipsFlds();
		tDoc.calculate = IsNotReset;
		tDoc.delay = !IsNotReset;
		if (IsNotReset) {
			tDoc.calculateNow();
		};
		thermoM("stop"); //stop the top progress dialog
		return; //don't do the rest of the function
	}
	
	var newCrea = ParseCreature(newForm);

	var oldCrea = ParseCreature(event.target.value.toLowerCase());	
	if (newCrea === oldCrea || !newCrea || !What("Character Level") || !What("Int")|| !What("Wis")|| !What("Cha")) { //If this returns true, it means that no (new) race was found; or that the character has not been defined enough yet so the function can be stopped
		tDoc.calculate = IsNotReset;
		tDoc.delay = !IsNotReset;
		if (IsNotReset) {
			tDoc.calculateNow();
		};
		thermoM("stop"); //stop the top progress dialog
		return; //don't do the rest of the function
	}
	
	thermoM("Resetting the wild shape..."); //change the progress dialog text
	tDoc.resetForm(resetFlds);
	resetTooltipsFlds();
	thermoM(1/10); //increment the progress dialog's progress
	
	thermoM("Applying the new wild shape..."); //change the progress dialog text
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
	tDoc.calculate = true; tDoc.calculateNow(); tDoc.calculate = false; //calculate so that the modifiers are usable to query
	
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
					newAC += What(prefix + "Wildshape." + Fld + ".Ability." + addAbi[aA].replace(/\+ ?/, "") + ".Mod");
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
		if (CurrentArmour.mod) newAC += What(prefix + "Wildshape." + Fld + ".Ability." + CurrentArmour.mod.replace(/ Mod/i, "") + ".Mod");
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
		if (theCrea.languages) {
			var tempString = "\u25C6 Languages: " + theCrea.languages + ".";
			AddString(traitsFld, tempString, true);
		}
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
	
	thermoM("stop"); //stop the top progress dialog
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) {
		tDoc.calculateNow();
	};
}

//add a wild shape to the top most empty place
function AddWildshape(input) {
	var prefixA = What("Template.extras.WSfront").split(",");
	var isDone = false;
	for (var n = 1; n <= 2; n++) {
		for (var p = 0; p < prefixA.length; p++) {
			var prefix = prefixA[p];
			for (var i = 1; i <= 4; i++) {
				next = tDoc.getField(prefix + "Wildshape.Race." + i);
				if (n === 1 && next.value.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
					i = 5;
					n = 3;
					p = prefixA.length;
					isDone = true;
				} else if (n === 2 && (next.value === "" || next.value.toLowerCase().indexOf("make a selection") !== -1)) {
					next.value = input;
					i = 5;
					n = 3;
					p = prefixA.length;
					isDone = true;
				}
			}
		}
	}
	//if the wildshape to add was not found and there was no room to add it, add another wild shapes page and re-run this function
	if (!isDone) {
		DoTemplate("WSfront", "Add");
		AddWildshape(input);
	}
}

//remove the first instance of the wild shape found
function RemoveWildshape(input) {
	var prefixA = What("Template.extras.WSfront").split(",");
	for (var p = 0; p < prefixA.length; p++) {
		var prefix = prefixA[p];
		for (var i = 1; i <= 4; i++) {
			next = tDoc.getField(prefix + "Wildshape.Race." + i);
			if (next.value.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
				next.value = "Make a Selection";
				i = 5;
				p = prefixA.length;
				WildshapeRecalc();
			}
		}
	}
}

//make a menu for wild shape options
function MakeWildshapeMenu() {
	var prefix = event.target.name.substring(0, event.target.name.indexOf("Wildshape"));
	
	if (!What("Character Level") || !What("Int")|| !What("Wis")|| !What("Cha")) { //If the character has not been defined enough, the function can be stopped after making a warning-menu
		Menus.wildshape = [{cName : "Please create a character on the 1st page before trying a Wild Shape", cReturn : "nothing#toreport", bEnabled : false}];
		tDoc.calculate = IsNotReset;
		tDoc.delay = !IsNotReset;
		if (IsNotReset) {
			tDoc.calculateNow();
		};
		return; //don't do the rest of the function
	}
	
	//make a list of the current wild shapes entered
	var removeShapes = [];
	var prefixA = What("Template.extras.WSfront").split(",");
	for (var p = 0; p < prefixA.length; p++) {
		for (var i = 1; i <= 4; i++) {
			var theFld = What(prefixA[p] + "Wildshape.Race." + i);
			if (!theFld || theFld.toLowerCase() === "make a selection") continue;
			var theShape = ParseCreature(theFld);
			if (theShape) removeShapes.push(theFld);
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
				bMarked : removeShapes.indexOf(array[i][0]) !== -1
			})
		}
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
	
	elementals = [];
	shapesBeast = [];
	shapesBeastCR1_4 = [];
	shapesBeastCR1_2 = [];
	shapesBeastCR1 = [];
	shapesBeastCR2 = [];
	shapesBeastCR3 = [];
	shapesBeastCR4 = [];
	shapesBeastCR5 = [];
	shapesBeastCR6 = [];
	
	//make a list of all the creatures
	var theElems = ["air elemental", "earth elemental", "fire elemental", "water elemental"];
	for (var aCrea in CreatureList) {
		var theCrea = CreatureList[aCrea];
		if ((theElems.indexOf(aCrea) === -1 && theCrea.type !== "Beast") || testSource(aCrea, theCrea, "creaExcl")) {
			continue; //go on to the next creature if the creature is not a beast or its source isn't excluded
		};
		
		if (theElems.indexOf(aCrea) !== -1)  {
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
		}
		
		
		
		//add it to the array of all
		shapesBeast.push([theCrea.name + " (CR " + CR + (Spd ? ", " + Spd : "") + ")", aCrea]);
		
		//add it to the CR specific array
		if (CRname) tDoc["shapesBeastCR" + CRname].push([creaName, aCrea]);
	}
	shapesBeast.sort();
	shapesBeastCR1_4.sort();
	shapesBeastCR1_2.sort();
	shapesBeastCR1.sort();
	shapesBeastCR2.sort();
	shapesBeastCR3.sort();
	shapesBeastCR4.sort();
	shapesBeastCR5.sort();
	shapesBeastCR6.sort();
	
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
	menuLVL3(BeastMenu, "All Beasts", shapesBeast);
	menuLVL3(BeastMenu, "Elementals", elementals);
	menuLVL3(BeastMenu, "Beasts up to CR 1/4", shapesBeastCR1_4);
	menuLVL3(BeastMenu, "Beasts of CR 1/2", shapesBeastCR1_2);
	menuLVL3(BeastMenu, "Beasts of CR 1", shapesBeastCR1);
	menuLVL3(BeastMenu, "Beasts of CR 2", shapesBeastCR2);
	menuLVL3(BeastMenu, "Beasts of CR 3", shapesBeastCR3);
	menuLVL3(BeastMenu, "Beasts of CR 4", shapesBeastCR4);
	menuLVL3(BeastMenu, "Beasts of CR 5", shapesBeastCR5);
	menuLVL3(BeastMenu, "Beasts of CR 6", shapesBeastCR6);
	WildshapeMenu.push(BeastMenu);
	
	WildshapeMenu.push({cName : "-"}); //add a divider
	
	//add all the options for "Remove Wild Shape"
	if (removeShapes.length > 0) { //if any shapes are currently present
		menuLVL2(WildshapeMenu, ["Remove Wild Shape", "remove"], removeShapes)
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
	tDoc.delay = true;
	tDoc.calculate = false;
	var MenuSelection = getMenu("wildshape");
	var prefix = event.target.name.substring(0, event.target.name.indexOf("Wildshape"));
	
	if (MenuSelection !== undefined && MenuSelection[0] !== "nothing") {
		switch (MenuSelection[0]) {
		 case "recalculate" :
			WildshapeRecalc();
			break;
		 case "order" :
			WildshapeRecalc("order");
			break;
		 case "reset" :
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
			var thePage = event.target.page;
			if (isArray(thePage)) {
				DoTemplate("WSfront");
			} else {
				//remove the prefix from the array in the remember field
				var tempExtras = What("Template.extras.WSfront").split(",");
				tempExtras.splice(tempExtras.indexOf(prefix), 1);
				Value("Template.extras.WSfront", tempExtras);
				tDoc.deletePages(thePage);
			}
			break;
		}
	}
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();	
}

//re-calculate all the wild shapes
function WildshapeRecalc(order) {
	thermoM("start"); //start a progress dialog
	thermoM("Re-calculating the wild shapes..."); //change the progress dialog text
	
	var prefixA = What("Template.extras.WSfront").split(",");
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
	thermoM("stop"); //stop the top progress dialog
}

//set the drop-down menus for wildshape selection fields
function SetWildshapeDropdown() {
	var theList = [];

	for (var key in CreatureList) {
		if ((CreatureList[key].type === "Beast" && eval(CreatureList[key].challengeRating) <= 6) || key === "air elemental" || key === "earth elemental" ||  key === "fire elemental" || key === "water elemental") {
			if (testSource(key, CreatureList[key], "creaExcl")) continue;
			if (theList.indexOf(CreatureList[key].name) === -1) theList.push(CreatureList[key].name);
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
		Value("Comp.Race", theFldVal, theString);
	}
}

//Make menu for the button on the companion page and parse it to Menus.companion
function MakeCompMenu() {
	var prefix = event.target.name.substring(0, event.target.name.indexOf("Companion"));
	var usingRevisedRanger = classes.known.rangerua ? true : false;
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

	var CompMenu = [];
	var familiars = [];
	var chainPact = [];
	var mounts = [];
	var companions = [];
	var companionRR = [];
	var mechanicalServs = [];
	var change = [
		["Into a familiar (Find Familiar spell)", "familiar"],
		["Into a Pact of the Chain familiar", "pact_of_the_chain"],
		["Into a mount (Find Steed spell)", "mount"],
		["Into a Ranger's Companion", usingRevisedRanger ? "companionrr" : "companion"],
		["-", "-"],
		["Reset to normal", "reset"]
	];
	
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
		}
		if (!theCrea.companion) {
			continue; //if no companion object is defined, move on to the next
		} else if (theCrea.companion === "familiar") {
			familiars.push([theCrea.name, aCrea]);
			chainPact.push([theCrea.name, aCrea]);
		} else if (theCrea.companion === "pact_of_the_chain") {
			chainPact.push([theCrea.name, aCrea]);
		} else if (theCrea.companion === "mount") {
			mounts.push([theCrea.name, aCrea]);
		} else if (theCrea.companion === "companion") {
			companionRR.push([theCrea.name, aCrea]);
		}
	}
	familiars.sort();
	chainPact.sort();
	mounts.sort();
	companions.sort();
	companionRR.sort();
	mechanicalServs.sort();
	
	if (CurrentSources.globalExcl.indexOf("M") !== -1) { // the monster manual has been excluded from the sources
		var reminder = ["Be aware: the Monster Manual is excluded from the sources!", "no-mm"];
		familiars.unshift(reminder);
		chainPact.unshift(reminder);
		mounts.unshift(reminder);
		companions.unshift(reminder);
		companionRR.unshift(reminder);
		mechanicalServs.unshift(reminder);
	};
	
	menuLVL2(CompMenu, ["Create familiar (Find Familiar spell)", "familiar"], familiars);
	menuLVL2(CompMenu, ["Create familiar (Pact of the Chain)", "pact_of_the_chain"], chainPact);
	menuLVL2(CompMenu, ["Create mount (Find Steed spell)", "mount"], mounts);
	menuLVL2(CompMenu, ["Create Ranger's Companion", usingRevisedRanger ? "companionrr" : "companion"], usingRevisedRanger ? companionRR : companions);
	
	if (CurrentSources.globalExcl.indexOf("UA:A") === -1) { // if the artificer source is not excluded
		menuLVL2(CompMenu, ["Create Mechanical Servant", "mechanicalserv"], mechanicalServs);
		change.splice(4, 0, ["Into a Mechanical Servant", "mechanicalserv"]);
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
	tDoc.delay = true;
	tDoc.calculate = false;
	var MenuSelection = getMenu("companion");
	var prefix = event.target.name.substring(0, event.target.name.indexOf("Companion"));
	
	if (MenuSelection !== undefined && MenuSelection[0] !== "nothing") {
		if (MenuSelection[0] === "reset") {
			tDoc.resetForm([prefix + "Comp", prefix + "Text.Comp", prefix + "BlueText.Comp", prefix + "Cnote", prefix + "Companion"]); //reset all the fields
			ApplyAttackColor("", "", "Comp.", prefix); //reset the colour of the attack boxes
			SetHPTooltip();
			ShowCompanionLayer(prefix);
			ClearIcons(prefix + "Comp.img.Portrait", true); //reset the appearance image
		} else if (MenuSelection[0] === "add page") {
			DoTemplate("AScomp", "Add");
		} else if (MenuSelection[0] === "remove page") {
			var thePage = event.target.page;
			if (isArray(thePage)) {
				DoTemplate("AScomp");
			} else {
				//remove the prefix, if found, from the array in the remember field
				var tempExtras = What("Template.extras.AScomp").split(",");
				tempExtras.splice(tempExtras.indexOf(prefix), 1);
				Value("Template.extras.AScomp", tempExtras);
				tDoc.deletePages(thePage);
			}
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
	}
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();	
}

//change the creature on the companion page into the chosen form (familiar, mount, or pact of the chain familiar)
function changeCompType(inputType, prefix) {
	var oldType = What(prefix + "Companion.Remember");
	if (oldType) resetCompTypes(prefix);
	Value(prefix + "Companion.Remember", inputType); //set this so it can be called upon later
	
	// a function to add the languages
	var addCharLangArr = function() {
		var creaLangs = What(prefix + "Comp.Use.Features").match(/\u25C6 languages:.*/i);
		if (creaLangs) creaLangs = creaLangs[0].replace(/\.$/, "");
		var charLanguages = [];
		for (var i = 1; i <= FieldNumbers.langstools; i++) {
			var charFld = What("Language " + i);
			if (charFld && (!creaLangs || creaLangs.toLowerCase().indexOf(charFld.toLowerCase()) === -1)) {
				charLanguages.push(charFld);
			} 
		};
		var charLangs = charLanguages.length === 0 ? "" : (creaLangs ? "; and understands, but doesn't speak," : "\u25C6 Languages: Understands, but doesn't speak,");
		for (var i = 0; i < charLanguages.length; i++) {
			charLangs += i !== 0 && charLanguages.length > 2 ? ", " : " ";
			charLangs += i !== 0 && i === charLanguages.length - 1 ? (inputType === "mount" ? "or " : "and ") : "";
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
		break;
	 case "companionrr" :
	 case "companion" :
		Value(prefix + "Comp.Type", "Companion");
		break;
	 case "mount" :
		Value(prefix + "Comp.Type", "Mount");
		
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
	}
	
	if ((/familiar|pact_of_the_chain|mount/).test(inputType) && CurrentCompRace[prefix].type === "Beast") changeCompDialog(prefix); //change the type if just a beast
	
	//add a string in the creature's feature section
	AddString(prefix + "Comp.Use.Features", compString[inputType].featurestring, true);
	
	//make the string for the Find Steed spell explanation
	AddString(prefix + "Cnote.Left", compString[inputType].string, true);
	
	//add any actions this spell/companion gives the character
	for (var i = 0; i < compString[inputType].actions.length; i++) {
		AddAction(compString[inputType].actions[i][0], compString[inputType].actions[i][1], compString[inputType].actionTooltip);
	}
	
	//add level-dependent things if this is a ranger's companion
	if (inputType === "companion") {
		UpdateRangerCompanions();
	} else if (inputType === "companionrr") {
		UpdateRevisedRangerCompanions();
		app.alert({
			cMsg : toUni("Pick Two Skills") + "\nThe Ranger's Animal Companion that you have just added, gains proficiency with two additional skills as those already selected. Because there is no automation for selecting these proficiencies, please do it manually.\n\n" + toUni("Ability Score Improvements") + "\nThe Ranger's Animal Companion gains Ability Score Improvements whenever your character gains them. There is no automation for adding these either, so please don't forget to increase the ability scores for the animal companion when you get the reminder pop-up. Also, remember that any DCs for abilities that the beast possesses are based on ability scores and that they might need to be manually changed when changing the ability scores.\nThe 'Notes' section on the companion page automatically keeps track of how many points you can increase the ability scores and what the base value of those scores are according to the Monster Manual.",
			nIcon : 3,
			cTitle : "Don't forget the Skills and Ability Score Improvements!"
		})
	}
};

//change the type of the creature on the companion page to one of either Celestial, Fey, or Fiend
function changeCompDialog(prefix) {
	if (!IsNotImport) return;
	//The dialog for setting the pages to print
	var theDialog = {
		//variables to be set by the calling function
		bType : "Celestial",

		//when starting the dialog
		initialize : function (dialog) {
			dialog.load({
				"txt0" : "A familiar or mount's type changes from beast to either celestial, fey, or fiend. Please select one."
			});
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
					alignment : "align_fill",
					font : "dialog",
					char_height : 3,
					char_width : 30
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
		tDoc.resetForm([prefix + "Wildshapes.Info"]);
		if (useString) {
			Value(prefix + "Wildshapes.Info.Uses", useString);
			Value(prefix + "Wildshapes.Info.Limitations", wLimit);
			Value(prefix + "Wildshapes.Info.Duration", wDur);
		}
	}
	//now recalculate all the wild shapes if not just adding a new sheet (i.e. inputArray === undefined)
	if (inputArray !== undefined) WildshapeRecalc();
}

//change the font of all fields to this
function ChangeFont(newFont, oldFont) {
	newFont = newFont ? newFont : (!typePF ? "SegoePrint" : "SegoeUI");
	oldFont = oldFont ? oldFont : tDoc.getField((tDoc.info.AdvLogOnly ? "AdvLog." : "") + "Player Name").textFont;
	if (newFont === (!typePF ? "SegoePrint" : "SegoeUI")) {
		var aTest = true;
	} else {
		var aTest = testFont(newFont);
	}
	if (aTest && newFont !== oldFont) {
		//start a progress dialog
		thermoM("start"); //start a progress dialog
		thermoM("Applying the new font..."); //change the progress dialog text
		
		for (var F = 0; F < tDoc.numFields; F++) {
			var Fname = tDoc.getNthFieldName(F);
			var Fld = tDoc.getField(Fname);
			if (Fname.indexOf("spells.") === -1 && Fld.textFont === oldFont && (Fld.type !== "text" || Fld.richText === false)) {
				Fld.textFont = newFont;
			}
			
			thermoM(F/tDoc.numFields); //increment the progress dialog's progress
		}
		thermoM("stop"); //stop the top progress dialog
	}
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
	var type = event.target.name.indexOf("Bonus") !== -1 ? "bonus action" : event.target.name.indexOf("Reaction") !== -1 ? "reaction" : "action";
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
	tDoc.delay = true;
	tDoc.calculate = false;

	var MenuSelection = getMenu("actions");
	var itemNmbr = parseFloat(event.target.name.slice(-2));
	var type = event.target.name.indexOf("Bonus") !== -1 ? "bonus action" : event.target.name.indexOf("Reaction") !== -1 ? "reaction" : "action";
	var maxNmbr = type === "action" ? FieldNumbers.trueactions : FieldNumbers.actions;
	var FieldNames = [type.capitalize() + " "];
	var Fields = [], FieldsValue = [], FieldsTool = [], FieldsUp = [], FieldsUpValue = [], FieldsUpTool = [], FieldsDown = [], FieldsDownValue = [], FieldsDownTool = [];
	var FieldsOpp = [], FieldsOppValue = [], FieldsOppTool = [];
	if (itemNmbr <= (maxNmbr - 6)) {
		var OppNmbr = itemNmbr > ((maxNmbr - 6) / 2) ? -1 * ((maxNmbr - 6) / 2) : ((maxNmbr - 6) / 2);
	} else if (itemNmbr > (maxNmbr - 6)) {
		var OppNmbr = itemNmbr > (maxNmbr - 3) ? -3 : 3;
	}
	
	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(FieldNames[F] + itemNmbr);
		FieldsValue.push(What(Fields[F]));
		FieldsTool.push(Who(Fields[F]));
		if (itemNmbr !== 1) {
			FieldsUp.push(FieldNames[F] + (itemNmbr - 1));
			FieldsUpValue.push(What(FieldsUp[F]));
			FieldsUpTool.push(Who(FieldsUp[F]));
		}
		if (itemNmbr !== maxNmbr) {
			FieldsDown.push(FieldNames[F] + (itemNmbr + 1));
			FieldsDownValue.push(What(FieldsDown[F]));
			FieldsDownTool.push(Who(FieldsDown[F]));
		}
		if (type === "action") {
			FieldsOpp.push(FieldNames[F] + (itemNmbr + OppNmbr));
			FieldsOppValue.push(What(FieldsOpp[F]));
			FieldsOppTool.push(Who(FieldsOpp[F]));
		}
	}
	if (MenuSelection !== undefined) {
		thermoM("start"); //start a progress dialog
		thermoM("Action menu option..."); //change the progress 
		switch (MenuSelection[0]) {
		 case "move up":
			thermoM("Moving the " + type + " field up..."); //change the progress dialog text
			for (var H = 0; H < FieldNames.length; H++) {
				Value(FieldsUp[H], FieldsValue[H], FieldsTool[H]);
				Value(Fields[H], FieldsUpValue[H], FieldsUpTool[H]);
				thermoM(H/FieldNames.length); //increment the progress dialog's progress
			};
			break;
		 case "move down":
			thermoM("Moving the " + type + " field down..."); //change the progress dialog text
			for (var H = 0; H < FieldNames.length; H++) {
				Value(FieldsDown[H], FieldsValue[H], FieldsTool[H]);
				Value(Fields[H], FieldsDownValue[H], FieldsDownTool[H]);
				thermoM(H/FieldNames.length); //increment the progress dialog's progress
			};
			break;
		 case "move to opposing field":
			thermoM("Moving the " + type + " field opposite..."); //change the progress dialog text
			for (var H = 0; H < FieldNames.length; H++) {
				Value(FieldsOpp[H], FieldsValue[H], FieldsTool[H]);
				Value(Fields[H], FieldsOppValue[H], FieldsOppTool[H]);
				thermoM(H/FieldNames.length); //increment the progress dialog's progress
			};
			break;
		 case "insert empty " + type:
			thermoM("Inserting empty " + type + " field..."); //change the progress dialog text
			ActionInsert(type, itemNmbr);
			break;
		 case "delete " + type:
			thermoM("Deleting " + type + " field..."); //change the progress dialog text
			ActionDelete(type, itemNmbr);
			break;
		 case "clear " + type:
			thermoM("Clearing " + type + " field..."); //change the progress dialog text
			for (var T = 0; T < Fields.length; T++) {
				Value(Fields[T], "", "")
				thermoM(T/Fields.length); //increment the progress dialog's progress
			}
			break;
		}
		thermoM("stop"); //stop the top progress dialog
	}

	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) {
		tDoc.calculateNow;
	};
}

//insert a Action at the position wanted
function ActionInsert(type, itemNmbr) {
	var maxNmbr = type === "action" ? FieldNumbers.trueactions : FieldNumbers.actions;
	var FieldNames = [type.capitalize() + " "];
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
		if (What(FieldNames[0] + i) === "") {
			endslot = i;
			i = (maxNmbr + 1);
		}
	}
	
	//only continu if an empty slot was found in the fields
	if (endslot) {
		//cycle to the slots starting with the empty one and add the values of the one above
		for (var i = endslot; i > itemNmbr; i--) {
			for (var H = 0; H < FieldNames.length; H++) {
				Value(FieldNames[H] + i, What(FieldNames[H] + (i - 1)), Who(FieldNames[H] + (i - 1)));
			}
		}
		
		//empty the selected slot
		for (var T = 0; T < Fields.length; T++) {
			Value(Fields[T], "", "");
		}
	}
}

//delete a Action at the position wanted and move the rest up
function ActionDelete(type, itemNmbr) {
	if (type === "action") {
		if (!typePF && itemNmbr < ((FieldNumbers.trueactions - 6) / 2)) {
			var maxNmbr = (FieldNumbers.trueactions - 6) / 2;
		} else {
			var maxNmbr = FieldNumbers.trueactions;
			maxNmbr = itemNmbr > (maxNmbr - 6) || What(type.capitalize() + " " + (maxNmbr - 6)) ? maxNmbr : maxNmbr - 6;//stop at the end of the first page if last one on first page is empty
		}
	} else {
		var maxNmbr = FieldNumbers.actions;
		maxNmbr = itemNmbr > (maxNmbr - 6) || What(type.capitalize() + " " + (maxNmbr - 6)) ? maxNmbr : maxNmbr - 6;//stop at the end of the first page if last one on first page is empty
	}
	
	var FieldNames = [type.capitalize() + " "];
	var Fields = [];
	var EndFields = [];
	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(FieldNames[F] + itemNmbr);
		EndFields.push(FieldNames[F] + maxNmbr);
	}
	
	//move every line up one space, starting with the line below the selected line
	for (var i = itemNmbr; i < maxNmbr; i++) {
		for (var H = 0; H < FieldNames.length; H++) {
			Value(FieldNames[H] + i, What(FieldNames[H] + (i + 1)), Who(FieldNames[H] + (i + 1)));
		};
	}
	
	//delete the contents of the final line
	tDoc.resetForm(EndFields);
	for (var T = 0; T < EndFields.length; T++) {
		AddTooltip(EndFields[T], "");
	}
}

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
	tDoc.delay = true;
	tDoc.calculate = false;

	var MenuSelection = getMenu("limfea");
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
	
	if (MenuSelection !== undefined) {
		thermoM("start"); //start a progress dialog
		thermoM("Limited feature menu option..."); //change the progress 
		switch (MenuSelection[0]) {
		 case "move up":
			thermoM("Moving the limited feature line up..."); //change the progress dialog text
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
			thermoM("Moving the limited feature line down..."); //change the progress dialog text
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
			thermoM("Inserting empty limited feature line..."); //change the progress dialog text
			LimFeaInsert(itemNmbr);
			break;
		 case "delete limited feature":
			thermoM("Deleting limited feature line..."); //change the progress dialog text
			LimFeaDelete(itemNmbr);
			break;
		 case "clear limited feature":
			thermoM("Clearing limited feature line..."); //change the progress dialog text
			for (var T = 0; T < Fields.length; T++) {
				Value(Fields[T], "", "");
				tDoc.getField(Fields[T]).setAction("Calculate", "");
				tDoc.getField(Fields[T]).submitName = "";
				thermoM(T/Fields.length); //increment the progress dialog's progress
			}
			break;
		}
		thermoM("stop"); //stop the top progress dialog
	}

	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) {
		tDoc.calculateNow;
	};
}

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
	// Initialize variables.
	var r = false
	
	// Find the field corresponding to the bookmark name
	var theFld = (BookNm === "Spell Sheets" ? What("Template.extras.SSfront").split(",")[1] : "") + BookMarkList[BookNm];
	
	// Determine if the selected section is on a visible page, and if so go to it.
	if (theFld && tDoc.getField(theFld)) {
		tDoc.getField(theFld).setFocus();
		r = true;
	}
	
	// If the selected section is on a hidden page, alert the user.
	if (r === false && event.type === "Bookmark") {
		var theTemplate = getBookmarkTemplate(event.target);
		var theMessage = {
			cMsg : "The bookmark \"" + BookNm + "\" you have selected is on a page which is currently hidden.\n\You can change your page visibility settings using the \"Layout\" button in the \"JavaScript Window\" or in the bookmarks.\n\nDo you want to make the page \"" + theTemplate[1] + "\" visible now?" + (theTemplate[0] !== "SSfront" ? "" : "\n\nClicking \"Yes\" will start the Spell Sheets Generation process."),
			nIcon : 2, //question mark
			cTitle : "Bookmark is currently unavailable",
			nType : 2, //Yes-No
		};
		if (app.alert(theMessage) === 4) {
			if (theTemplate && theTemplate[0] !== "SSfront") {
				DoTemplate(theTemplate[0]);
				tDoc.getField(theFld).setFocus();
			} else if (theTemplate && theTemplate[0] === "SSfront") {
				tDoc.delay = true;
				tDoc.calculate = false;
				GenerateSpellSheet();
				tDoc.calculate = IsNotReset;
				tDoc.delay = !IsNotReset;
				if (IsNotReset) tDoc.calculateNow();
			}
		}
	}
}

// show/hide (AddRemove == undefined) or add/remove (AddRemove == "Add" | "Remove") a template
function DoTemplate(tempNm, AddRemove) {
	//if the sheet is currently flattened, undo that first
	if (What("MakeMobileReady Remember") !== "") MakeMobileReady(false);
	
	thermoM("start"); //start a progress dialog
	var typeFldPage = tDoc.getField(BookMarkList[tempNm]).page;
	var isTempVisible = typeFldPage !== -1;
	var tempExtras = What("Template.extras." + tempNm);
	if (tempNm.substring(0, 2) === "SS") {
		//tempExtras = tempExtras ? tempExtras : What("Template.extras.SSfront");
		isTempVisible = tempExtras;
		AddRemove = AddRemove && isTempVisible ? AddRemove : "Add";
	}
	
	//see if we are to just show/hide the template or add/remove an additional page of it
	if (tempNm.substring(0, 2) !== "SS" && (!AddRemove || (AddRemove === "Remove" && !tempExtras) || (AddRemove === "Add" && !isTempVisible))) {
		if (isTempVisible) {
			thermoM("Deleting page..."); //change the progress dialog text

			tDoc.deletePages(typeFldPage[1]);
			thermoM(4/5); //increment the progress dialog's progress
			
			//grey out the appropriate bookmarks
			amendBookmarks(BookMarkList[tempNm + "_Bookmarks"], false);
		} else {
			thermoM("Adding page..."); //change the progress dialog text
			//the template is invisible, so we have to add it at the right page
			var tempPage = 2;
			
			//work out if each of the preceding pages if visible, and, if so, add 1 to the page where to put the template
			var DepL = TemplateDep[tempNm];
			for (var T = 0; T < DepL.length; T++) {
				var theDep = DepL[T];
				var DepTypeFldPage = tDoc.getField(BookMarkList[theDep]).page;
				var isDepTypevisible = theDep.substring(0, 2) === "SS" ? What("Template.extras.SSfront") : DepTypeFldPage !== -1;
				if (isDepTypevisible) {
					tempPage += What("Template.extras." + theDep) ? What("Template.extras." + theDep).split(",").length : 1;
				}
			}
			
			//black out the appropriate bookmarks
			amendBookmarks(BookMarkList[tempNm + "_Bookmarks"], true);
			
			//now spawn a new instance of the template with the same fields as the template at the desired page
			tDoc.getTemplate(tempNm).spawn(tempPage, false, false);
			thermoM(0.9); //increment the progress dialog's progress
			
			//now do some extra actions, depending on the page added
			switch (tempNm) {
			 case "ASfront" :
				// if the location column on the second page was set to visible, re-do this again
				if (What("Gear Location Remember").split(",")[1] === "true") {
					HideInvLocationColumn("Extra.Gear ", false);
				}
				break;
			}
			
			//move focus to this new page
			if (IsNotImport) tDoc.getField(BookMarkList[tempNm] + ".1").setFocus();
		}
	} else if (isTempVisible || tempNm.substring(0, 2) === "SS") {
		if (tempNm === "SSmore" && !What("Template.extras.SSfront")) {
			tempNm = "SSfront";
			tempExtras = What("Template.extras.SSfront");
		}
		if (tempExtras) {
			tempExtras = tempExtras.split(",");
			var lastEtypeFld = tempExtras[tempExtras.length - 1] + BookMarkList[tempNm];
			var lastEpage = tDoc.getField(lastEtypeFld).page;
		} else if (tempNm === "SSfront") {
			tempExtras = tempExtras.split(",");
			var lastEpage = 1;
			
			if (!tDoc.info.SpellsOnly) {
				//work out if each of the preceding pages if visible, and, if so, add 1 to the page where to put the template
				var DepL = TemplateDep[tempNm];
				for (var T = 0; T < DepL.length; T++) {
					var theDep = DepL[T];
					var DepTypeFldPage = tDoc.getField(BookMarkList[theDep]).page;
					var isDepTypevisible = DepTypeFldPage !== -1;
					if (isDepTypevisible) {
						lastEpage += What("Template.extras." + theDep) ? What("Template.extras." + theDep).split(",").length : 1;
					}
				}
			}
		} else if (tempNm === "SSmore") {
			tempExtras = tempExtras.split(",");
			var lastEpage = tDoc.getField(What("Template.extras.SSfront").split(",")[1] + BookMarkList[tempNm]).page;
		} else {
			tempExtras = tempExtras.split(",");
			var lastEpage = typeFldPage[1];
		}
		if (AddRemove === "Remove") {
			thermoM("Deleting page..."); //change the progress dialog text
			
			//delete the page of the last extra entry
			tDoc.deletePages(lastEpage);
			
			//remove this last entry from the array
			tempExtras.pop();
			
			thermoM(0.5); //increment the progress dialog's progress
			
			//now put that array in the field
			Value("Template.extras." + tempNm, tempExtras);
			
		} else if (AddRemove === "Add") {
			thermoM(tempNm.substring(0, 2) === "SS" ? "Generating the Spell Sheet(s), Acrobat will be unresponsive for a long time..." : "Adding page..."); //change the progress dialog text
			
			//if this template is already in use at this exact page we want to add blank pages to increase the number until it is no longer already defined
			var toDeleteArray = [];
			for (var add = lastEpage + 1; add <= 1000; add++) {
				var theNewPrefix = "P" + add + "." + tempNm;
				if (tempExtras.indexOf(theNewPrefix + ".") === -1) {
					lastEpage = add;
					add = 1001
				} else {
					tDoc.getTemplate("blank").spawn(add, false, false);
					toDeleteArray.push(add);
				}
			}
			
			//add the template, but now with changing the field names, the page after the one the last extra page (or the template) was set at
			tDoc.getTemplate(tempNm).spawn(lastEpage, true, false);
			
			//now delete all the blank pages we just added
			for (var del = 0; del < toDeleteArray.length; del++) {
				tDoc.deletePages(toDeleteArray[0]);
			}
			
			//update the field with the new prefix for all the fields on the newly created page
			tempExtras.push(theNewPrefix + ".");
			Value("Template.extras." + tempNm, tempExtras);
			
			//move focus to this new page
			if (IsNotSpellSheetGenerating && IsNotImport) tDoc.getField(theNewPrefix + "." + BookMarkList[tempNm]).setFocus();
			
			thermoM(0.5); //increment the progress dialog's progress
			
			//now reset this newly created sheet
			if (tempNm.substring(0,2) !== "SS") {
				var resetFieldsBases = TemplateResetRanges[tempNm];
				var resetFields = [];
				for (var R = 0; R < resetFieldsBases.length; R++) {
					resetFields.push(theNewPrefix + "." + resetFieldsBases[R]);
				}
				tDoc.resetForm(resetFields);
			}
			
			//now do some extra actions, depending on the page added
			switch (tempNm) {
			 case "AScomp" :
				SetRichTextFields(true, true); //re-do the rich text fields
				ApplyAttackColor("", "", "Comp.", theNewPrefix + "."); //re-do this companion page's attack colors
				FindCompRace(undefined, theNewPrefix + "."); //re-find this companion page's races
				FindCompWeapons(undefined, theNewPrefix + "."); //re-find this companion page's weapons
				ShowCompanionLayer(theNewPrefix + "."); //reset the layers
				ClearIcons(theNewPrefix + ".Comp.img.Portrait", true); //reset the image
				break;
			 case "WSfront" :
				WildshapeUpdate(); //update the header texts for the newly added wildshape page
				break;
			 case "ALlog" :
				var prePrefix = CalcLogsheetPrevious(theNewPrefix + ".");
				ApplyLogsheetNumbering(theNewPrefix + ".", prePrefix); //update the header texts for the newly added log page
				SetAdvLogCalcOrder(theNewPrefix + "."); //update the calculation order of the newly added sheet
				break;
			 case "SSfront" :
				// black/grey out the appropriate bookmark
				amendBookmarks(BookMarkList[tempNm + "_Bookmarks"], AddRemove === "Add");
				// change the tooltips of the top header and diver, as those can't be moved or hidden
				AddTooltip(theNewPrefix + ".spellshead.Text.header.0", "Clear the content of this field to make its prepared section visible again, if you had hidden it.");
				AddTooltip(theNewPrefix + ".spellsdiv.Text.0", "");
				break;
			 case "SSmore" :
				Uneditable(theNewPrefix + ".spellshead." + (!typePF? "Text" : "Image") + ".prepare.0");
				break;
			}
		}
	}
	thermoM(); //stop all the ongoing progress dialogs
	if (theNewPrefix) return theNewPrefix + "."; //if a new template was created with a prefix, return that prefix
}

//Make menu for the options for hiding, adding, and removing templates (i.e. pages)
function MakePagesMenu() {	
	var pagesMenu = [];
	var pagesArray = [
		[!typePF ? "Conditions and Magic Items" : "Feats and Magic Items", "ASfront"],
		["Overflow (magic items, feats, actions, etc.)", "ASoverflow"],
		["Background and Organization", "ASbackgr"],
		["Companion", "AScomp"],
		["Notes", "ASnotes"],
		["Wild Shapes", "WSfront"],
		["Adventurers Log", "ALlog"]
	];
	var pagesArrayAdd = [];
	var pagesArrayRemove = [];
	for (var p = 3; p < pagesArray.length; p++) {
		pagesArrayAdd.push(["Extra '" + pagesArray[p][0] + "' page", pagesArray[p][1]]);
		pagesArrayRemove.push(["Last added extra '" + pagesArray[p][0] + "' page", pagesArray[p][1]]);
	}

	if (typePF) {
		pagesArray.push(["Rules Reference Sheet", "PRsheet"]);
	}
	
	var isSpellSheetVisible = What("Template.extras.SSfront") !== "";
	if (isSpellSheetVisible) {
		pagesArray.push(["-", "-"]);
		pagesArray.push(["(Re)generate Spell Sheet(s)", "SSfront"]);
		pagesArray.push(["Replace Spell Sheets with empty one (to fill manually)", "SSmore"]);
		pagesArray.push(["Delete the Spell Sheet(s) (can't be undone)", "removespellsheets"]);
		pagesArrayAdd.push(["Extra empty 'Spell Sheet' page", "SSmore"]);
		pagesArrayRemove.push(["Last added extra 'Spell Sheet' page", "SSmore"]);
	} else {
		pagesArray.push(["-", "-"]);
		pagesArray.push(["Generate Spell Sheet(s) automatically", "SSfront"]);
		pagesArray.push(["Add Spell Sheet to fill manually", "SSmore"]);
	}
	
	var logoArray = [
		["Show the D&&D logos", "show#0"],
		["Show, but don't print the D&&D logos", "noprint#2"],
		["Hide and don't print the D&&D logos", "hide#1"],
		["Hide, but print the D&&D logos", "onlyprint#3"]
	];
	
	var cLogoDisplay = tDoc.getField("Image.DnDLogo.long").display;
	
	var menuLVL2 = function (menu, name, array) {
		var temp = [];
		temp.cName = name;
		temp.oSubMenu = [];
		var isMarked = false;
		var isEnabled = true;
		var extraName = "";
		for (var i = 0; i < array.length; i++) {
			if (array[i][0] !== "-") {
				if (name === "Visible pages") {
					isMarked = array[i][1] === "removespellsheets" || array[i][1] === "SSfront" || array[i][1] === "SSmore" ? false : tDoc.getField(BookMarkList[array[i][1]]).page !== -1;
				} else if (name === "Add extra") {
					isEnabled = tDoc.getField(BookMarkList[array[i][1]]).page !== -1;
					extraName = " (default not visible)";
				} else if (name === "Remove extra") {
					isEnabled = What("Template.extras." + array[i][1]) !== "";
					extraName = " (none to remove)";
				} else if (name === "Visible D&&D logos") {
					isMarked = array[i][1].split("#")[1] == cLogoDisplay;
				}
			}
			temp.oSubMenu.push({
				cName : array[i][0] + (!isEnabled ? extraName : ""),
				cReturn : name + "#" + array[i][1],
				bMarked : isMarked,
				bEnabled : isEnabled
			})
		}
		menu.push(temp);
	};
	
	menuLVL2(pagesMenu, "Visible pages", pagesArray);
	menuLVL2(pagesMenu, "Add extra", pagesArrayAdd);
	menuLVL2(pagesMenu, "Remove extra", pagesArrayRemove);
	pagesMenu.push({cName : "-", cReturn : "-"}); // add a divider
	menuLVL2(pagesMenu, "Visible D&&D logos", logoArray);
	
	pagesMenu.push({cName : "-", cReturn : "-"}); // add a divider
	MakeAdventureLeagueMenu();
	pagesMenu.push({ //add the menu for setting adventurers league stuff
		cName : "Adventurers League options",
		oSubMenu : Menus.adventureLeague
	})

	Menus.pages = pagesMenu;
}

//call the pages menu and do something with the results
function PagesOptions() {
	tDoc.delay = true;
	tDoc.calculate = false;

	var MenuSelection = getMenu("pages");
	
	if (MenuSelection !== undefined && MenuSelection[0] !== "nothing") {
		MenuSelection[1] = MenuSelection[1].charAt(0).toUpperCase() + MenuSelection[1].charAt(1).toUpperCase() + MenuSelection[1].substring(2);
		if (MenuSelection[0] === "visible d&&d logos") {
			DnDlogo(MenuSelection[2]);
		} else if (MenuSelection[0] === "advleague") {
			MenuSelection[1] = MenuSelection[1].toLowerCase();
			AdventureLeagueOptions(MenuSelection);
		} else if (MenuSelection[1] === "REmovespellsheets") {
			RemoveSpellSheets();
		} else if (MenuSelection[1] === "SSfront") {
			GenerateSpellSheet();
		} else if (MenuSelection[1] === "SSmore") {
			switch (MenuSelection[0]) {
				case "visible pages" :
				 if (What("Template.extras.SSfront").split(",").length > 1) {
					var asking = {
						cMsg : "Unfortunately it is not possible to hide the Spell Sheet. It can only be deleted.\n\nDo you want to remove all the Spell Sheets except the first one and remove the content of the first one?\nYou can then manually fill out the Spell Sheet and add/remove more pages using the \"Layout\" and \"Spells\" button in the \"JavaScript Window\" or in the bookmarks.\n\nRemoving the Spell Sheets cannot be undone!",
						cTitle : "Delete all the Spell Sheets",
						nIcon : 2, //question
						nType : 2, //Yes-No
					}
					if (app.alert(asking) === 4) {
						RemoveSpellSheets();
						DoTemplate("SSfront", "Add");
					}
				 } else {
					DoTemplate("SSfront", "Add");
				 }
				 break;
				case "add extra" : 
				 DoTemplate("SSmore", "Add");
				 break;
				case "remove extra" : 
				 DoTemplate("SSmore", "Remove");
				 break;
			}
		} else {
			switch (MenuSelection[0]) {
				case "visible pages" : 
				 DoTemplate(MenuSelection[1]);
				 break;
				case "add extra" : 
				 DoTemplate(MenuSelection[1], "Add");
				 break;
				case "remove extra" : 
				 DoTemplate(MenuSelection[1], "Remove");
				 break;
			}
		}
	}
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) {
		tDoc.calculateNow;
	};
}

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
	tDoc.delay = true;
	tDoc.calculate = false;
	
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
	
	if (MenuSelection !== undefined) {
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
			var thePage = event.target.page;
			if (isArray(thePage)) {
				DoTemplate("ASnotes");
			} else {
				//remove the prefix from the array in the remember field
				var tempExtras = What("Template.extras.ASnotes").split(",");
				tempExtras.splice(tempExtras.indexOf(prefix), 1);
				Value("Template.extras.ASnotes", tempExtras);
				tDoc.deletePages(thePage);
			}
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

	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
}

//make a string of all the classes and levels (field calculation)
function CalcFullClassLvlName() {
	var prefix = event.target && event.target.name ? event.target.name.substring(0, event.target.name.indexOf("AdvLog.")) : "";
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
	var prefix = event.target.name.substring(0, event.target.name.indexOf("AdvLog."));
	var ALlogA = What("Template.extras.ALlog").split(",");
	event.value = (ALlogA.indexOf(prefix) + 1) + " of " + ALlogA.length;
}

//return the previous logsheet's prefix (field calculation)
function CalcLogsheetPrevious(prefix) {
	var ALlogA = What("Template.extras.ALlog").split(",");
	return prefix ? ALlogA[ALlogA.indexOf(prefix) - 1] : "false";
}

//calculate the total or starting value of an entry in the advanturers log sheet (field calculation)
function CalcLogsheetValue() {
	var fNm = event.target.name;
	var StrTot = fNm.indexOf("start") !== -1 ? "start" : "total";
	if (StrTot === "total") {
		var theStart = fNm.replace("total", "start");
		var theGain = What(fNm.replace("total", "gain")).replace(/,/g, ".");
		event.target.display = theGain === "" ? display.hidden : tDoc.getField(theStart).display;
		var theStartNmr = Number(What(theStart).replace(/,/g, "."));
		event.value = theGain === "" ? theStartNmr : theStartNmr + eval(theGain);
	} else {
		var prefix = fNm.substring(0, fNm.indexOf("AdvLog."));
		var FldNmbr = Number(fNm.replace(/.*AdvLog\.(\d+?)\..+/, "$1"));
		if (prefix === "" && FldNmbr === 1) {
			return;
		} else {
			event.target.readonly = true;
		}
		if (FldNmbr !== 1) {
			var preFld = fNm.replace("AdvLog." + FldNmbr, "AdvLog." + (FldNmbr - 1));
		} else {
			var prePrefix = What(prefix + "AdvLog.previous");
			var preFld = fNm.replace(prefix, prePrefix).replace("AdvLog." + FldNmbr, "AdvLog." + FieldNumbers.logs);
		}
		var thisGain = What(fNm.replace("start", "gain")) !== "";
		var preGain = What(preFld.replace("start", "gain")) !== "";
		event.target.display = thisGain || preGain ? display.visible : display.hidden;
		event.value = What(preFld.replace("start", "total"));
	}
}

//add the correct numbers to the logsheet title sections
function ApplyLogsheetNumbering(prefix, prePrefix) {
	var preValue = Number(What(prePrefix + "Text.AdvLog." + FieldNumbers.logs).replace(/Logsheet Entry /i, ""));
	var logTxt = !typePF ? "Logsheet Entry " : "LOGSHEET ENTRY ";
	for (var i = 1; i <= FieldNumbers.logs; i++) {
		Value(prefix + "Text.AdvLog." + i, logTxt + (preValue + i));
	}
}

//Make menu for the button on the adventurers log page and parse it to Menus.advlog
//after that, do something with the menu and its results
function MakeAdvLogMenu_AdvLogOptions(Button) {
	tDoc.delay = true;
	tDoc.calculate = false;
	var prefix = Button ? "" : event.target.name.substring(0, event.target.name.indexOf("AdvLog."));
	var ALlogF = What("Template.extras.ALlog");
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
		["Add extra 'Adventurers Log' page", "add page"],
		[(prefix ? "Remove" : "Hide") + " this 'Adventurers Log' page", "remove page"],
		["-", "-"],
		["Reset this page", "reset"],
		["-", "-"]
	];

	if (Button || (tDoc.info.AdvLogOnly && !prefix)) alMenuItems.splice(1, 1);
	if (Button) alMenuItems.splice(2, 2);

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
	
	if (MenuSelection !== undefined) {
		switch (MenuSelection[0]) {
		 case "add page" :
			DoTemplate("ALlog", "Add");
			break;
		 case "remove page" :
			var thePage = event.target.page;
			if (isArray(thePage)) {
				DoTemplate("ALlog");
			} else {
				//remove the prefix from the array in the remember field
				var tempExtras = What("Template.extras.ALlog").split(",");
				var prePrefix = tempExtras[tempExtras.indexOf(prefix) - 1]; //the page before it
				var postPrefix = tempExtras[tempExtras.indexOf(prefix) + 1]; //the page after it, if any
				tempExtras.splice(tempExtras.indexOf(prefix), 1);
				Value("Template.extras.ALlog", tempExtras);
				if (postPrefix) {
					ApplyLogsheetNumbering(postPrefix, prePrefix); //update the header texts for the newly added log page
				}
				tDoc.deletePages(thePage);
			}
			break;
		 case "tutorial" :
			app.launchURL("http://dndadventurersleague.org/tutorial-for-dd-adventure-league-logsheets/", true);
			break;
		 case "advanced tutorial" :
			app.launchURL("http://dndadventurersleague.org/advanced-logsheet-tutorial/", true);
			break;
		 case "reset" :
			var resetLogs = [];
			for (var l = 0; l <= FieldNumbers.logs; l++) resetLogs.push(prefix + "AdvLog." + l)
			tDoc.resetForm(resetLogs);
			break;
		 case "dateformat" :
			UpdateALdateFormat(MenuSelection[1]);
			break;
		 case "generate" :
			addALlogEnrry();
			break;
		 case "dndlogo" :
			DnDlogo(MenuSelection[2]);
			break;
		}
	}

	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
};

//get the parent of the bookmark so we can know which template it is on
function getBookmarkTemplate(bookmark) {
	var templateReturn = "";
	var checkName = function(Bmrk) {
		var theName = Bmrk.name;
		if (theName === "Root" || !BookMarkList[theName + "_template"]) {
			var theReturn = false;
		} else {
			var theReturn = [BookMarkList[theName + "_template"], theName];
		}
		return theReturn;
	}
	var theNext = bookmark;
	for (var i = 0; i < 100; i++) {
		var theThing = checkName(theNext);
		if (theThing) {
			templateReturn = theThing;
			i = 100;
		}
		theNext = theNext.parent;
	}
	return templateReturn;
}

//make menu for the button to (re)set the portrait/organization symbol
//after that, do something with the menu and its results
function MakeIconMenu_IconOptions() {
	tDoc.delay = true;
	tDoc.calculate = false;
	
	var SymbPort = event.target.name;
	var DoAdvLog = event.target.name.indexOf("AdvLog") !== -1;
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
			factionSymbols.push([aFact[0] + " symbol", aFact[1] + "#symbol"]);
			factionIcons.push([aFact[0] + " icon", aFact[1] + "#icon"]);
			factionBanners.push([aFact[0] + " banner", aFact[1] + "#banner"]);
		}
		IconMenu.push({cName : "-", cReturn : "-"}); // add a divider
		menuLVL2(IconMenu, ["Set faction symbol", "organizationicon"], factionSymbols);
		menuLVL2(IconMenu, ["Set faction banner", "organizationicon"], factionBanners);
		menuLVL2(IconMenu, ["Set faction icon", "organizationicon"], factionIcons);
		
		//second the class
		var classes = [
			["Barbarian icon", "barbarian"],
			["Bard icon", "bard"],
			["Cleric icon", "cleric"],
			["Druid icon", "druid"],
			["Fighter icon", "fighter"],
			["Monk icon", "monk"],
			["Paladin icon", "paladin"],
			["Ranger icon", "ranger"],
			["Rogue icon", "rogue"],
			["Sorcerer icon", "sorcerer"],
			["Warlock icon", "warlock"],
			["Wizard icon", "wizard"]
		];
		IconMenu.push({cName : "-", cReturn : "-"}); // add a divider
		menuLVL2(IconMenu, ["Set class icon", "classicon"], classes);
		
		//third the AL seasons
		var classes = [
			["Tyranny of Dragons icon", "tod"],
			["Elemental Evil icon", "ee"],
			["Rage of Demons icon", "rod"],
			["Curse of Strahd icon", "cos"],
			["Storm King's Thunder icon", "skt"],
			["Tales of the Yawning Portal icon", "totyp"]
		];
		IconMenu.push({cName : "-", cReturn : "-"}); // add a divider
		menuLVL2(IconMenu, ["Set Adventure League season icon", "seasonicon"], classes);
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
	
	if (MenuSelection !== undefined && MenuSelection[0] !== "nothing") {
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
	}

	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
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
	var prefix = event.target.name.substring(0, event.target.name.indexOf("AdvLog."));
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
	if (!notSources) CurrentSources = eval(What("CurrentSources.Stringified"));
	CurrentEvals = eval(What("CurrentEvals.Stringified"));
}

//set all stringified variables into their fields
function SetStringifieds(type) {
	if (!type || type === "spells") {
		var cSpells = CurrentSpells.toSource();
		var cCasters = CurrentCasters.toSource();
		Value("CurrentSpells.Stringified", cSpells + "##########" + cCasters);
		
		//any time the CurrentSpells variable is changed, we need to update the CurrentWeapons variable as well
		FindWeapons();
	}
	if (!type || type === "sources") Value("CurrentSources.Stringified", CurrentSources.toSource());
	if (!type || type === "evals") Value("CurrentEvals.Stringified", CurrentEvals.toSource());
};

//set the sheet version
function Publish(version) {
	if (app.viewerType !== "Reader") {
		tDoc.info.SheetVersion = version;
		tDoc.info.Title = MakeDocName();
	};
	tDoc.resetForm(["Opening Remember", "CurrentSources.Stringified"]);
	tDoc.getField("Opening Remember").submitName = 1;
	tDoc.getField("SaveIMG.Patreon").submitName = "";
	if (!minVer) DontPrint("d20warning");
	DnDlogo();
	tDoc.calculateNow();
}

//show Honor or Sanity score, based on the field value
function ShowHonorSanity(input) {
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
	
	if (ShowHide === "Show" && What("BlueTextRemember") === "Yes") {
		DontPrint("HoS ST Bonus");
	} else {
		Hide("HoS ST Bonus");
	}
}

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
	if (classes.known.rangerua) {
		UpdateRevisedRangerCompanions(deleteIt);
		return;
	}
	thermoM("start"); //start a progress dialog
	thermoM("Updating Ranger's Companion..."); //change the progress dialog text
	
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
	var AScompA = What("Template.extras.AScomp").split(",");
	var progressDia = 0;
	
	for (var i = 0; i < AScompA.length; i++) {
		progressDia += 1;
		thermoM(progressDia/(AScompA.length + 1)); //increment the progress dialog's progress
		var prefix = AScompA[i];
		var remFld = What(prefix + "Companion.Remember");
		if (remFld === "companion") { //only do something if the creature is set to "companion"
			var thisCrea = CurrentCompRace[prefix] && CurrentCompRace[prefix].typeFound === "creature" ? CurrentCompRace[prefix] : false;
			//first look into adding the proficiency bonus to AC, attacks, proficiencies
			var remLvl = Who(prefix + "Companion.Remember").split(",");
			var oldLvl = [
				Number(remLvl[0]),
				remLvl[1] !== undefined ? Number(remLvl[1]) : 0
			]
			var oldLvlProfB = theProfB(oldLvl[0]);
			if (newLvlProfB !== oldLvlProfB) {
				if (deleteIt && thisCrea) newLvlProfB = thisCrea.proficiencyBonus;
				var diff = newLvlProfB - oldLvlProfB;
				var BlueTextArray = [];
				
				//add saving throw proficiencies
				for (var a = 0; a < AbilityScores.abbreviations.length; a++) {
					var theSave = prefix + "Comp.Use.Ability." + AbilityScores.abbreviations[a] + ".ST.Prof";
					var theSaveBT = prefix + "BlueText.Comp.Use.Ability." + AbilityScores.abbreviations[a] + ".ST.Bonus";
					if (tDoc.getField(theSave).isBoxChecked(0) === 1) {
						BlueTextArray.push(theSaveBT);
					}
				}
				
				//add skill proficiencies
				for (var s = 0; s < (SkillsList.abbreviations.length - 2); s++) {
					var theSkill = prefix + "Text.Comp.Use.Skills." + SkillsList.abbreviations[s] + ".Prof";
					var theSkillBT = prefix + "BlueText.Comp.Use.Skills." + SkillsList.abbreviations[s] + ".Bonus";
					if (What(theSkill) !== "nothing") {
						BlueTextArray.push(theSkillBT);
					}
				}
				
				//add attacks damage and to hit bonus fields
				for (var A = 1; A <= 3; A++) {
					if (What(prefix + "Comp.Use.Attack." + A + ".Weapon Selection")) {
						BlueTextArray.push(prefix + "BlueText.Comp.Use.Attack." + A + ".To Hit Bonus");
						BlueTextArray.push(prefix + "BlueText.Comp.Use.Attack." + A + ".Damage Bonus");
					}
				}
				
				for (var f = 0; f < BlueTextArray.length; f++) {
					var theBTvalue = Number(What(BlueTextArray[f]));
					if (!isNaN(theBTvalue)) Value(BlueTextArray[f], theBTvalue + diff);
				}
			}
			
			//then look into the hit points
			if (thisCrea) {
				Value(prefix + "Comp.Use.HP.Max", Math.max(thisCrea.hp, RangerLvl * 4));
			}
			
			//then look into the AC
			if (thisCrea) {
				Value(prefix + "Comp.Use.AC", thisCrea.ac + (deleteIt ? 0 : newLvlProfB));
			}
			
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
				}
			} else {
				var oldLvlText = theText(oldLvl[1]);
				ReplaceString(prefix + "Cnote.Left", newLvlText, false, oldLvlText);
			}
			
			//set the new level to the tooltip text of the remember field for later use
			if (!deleteIt) AddTooltip(prefix + "Companion.Remember", newLvl + "," + RangerLvl);
		}
	}
	thermoM("stop"); //stop the top progress dialog
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
	var theSetting = tDoc.getField("HP Max").submitName.split(",");
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
	var tempExtras = What("Template.extras.AScomp").split(",");
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
		var theCompSetting = tDoc.getField(prefix + "Comp.Use.HP.Max").submitName.split(",");
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

function MakeHPMenu_HPOptions() {
	tDoc.delay = true;
	tDoc.calculate = false;
	
	//define some variables
	var theFld = event.target.name.replace("Buttons.", "");
	var theInputs = tDoc.getField(theFld).submitName.split(",");
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
				cReturn : name[1] + "#" + theInputs[i] + "#" + array[i][1],
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
	
	//now call the menu
	var MenuSelection = getMenu("hp");
	
	if (MenuSelection !== undefined) {
		switch (MenuSelection[0]) {
		 case "auto" :
			theInputs[3] = MenuSelection[2];
			tDoc.getField(theFld).submitName = theInputs.join();
		 case "change" :
			if (MenuSelection[2] !== "nothing") {
				//set the value of the field
				Value(theFld, MenuSelection[1]);
			}
		}
	}

	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
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
	var prefix = event.target.name.substring(0, event.target.name.indexOf("AdvLogS."));
	var ALlogA = What("Template.extras.ALlog").split(",");
	for (var Al = 0; Al < ALlogA.length; Al++) {
		if (ALlogA[Al] === prefix) continue;
		tDoc.getField(ALlogA[Al] + "AdvLogS.Background_Faction.Text").value = event.value;
	}
}

//make a menu for the text fields and text line options
//after that, do something with the menu and its results
function MakeTextMenu_TextOptions() {
	tDoc.delay = true;
	tDoc.calculate = false;

	var isWhiteout = What("WhiteoutRemember");
	var isBoxesLines = What("BoxesLinesRemember");
	
	Menus.texts = [{
			cName : "Change the font size and/or font",
			cReturn : "dodialog"
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
				cReturn : "calc_boxes",
				bMarked : isBoxesLines === "calc_boxes"
			}, {
				cName : "Show lines for single-line fields",
				cReturn : "calc_lines",
				bMarked : isBoxesLines === "calc_lines"
			}]
		});
		Menus.texts.push({
			cName : "-",
			cReturn : "-"
		});
	}
	
	Menus.texts.push({
		cName : "Multi-line fields",
		oSubMenu : [{
			cName : "Show lines for multi-line fields",
			cReturn : "show lines",
			bMarked : !isWhiteout
		}, {
			cName : "Hide lines for multi-line fields",
			cReturn : "hide lines",
			bMarked : isWhiteout
		}]
	});
	
	//now call the menu
	var MenuSelection = getMenu("texts");
	
	if (MenuSelection !== undefined && MenuSelection[0] !== "nothing") {
		switch (MenuSelection[0]) {
		 case "dodialog" :
			SetTextOptions_Button();
			break;
		 case "calc_boxes" :
		 case "calc_lines" :
			ShowCalcBoxesLines(MenuSelection[0]);
			break;
		 case "show lines" :
			ToggleWhiteout(false);
			break;
		 case "hide lines" :
			ToggleWhiteout(true);
			break;
		}
	}
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) {
		tDoc.calculateNow();
	};	
}

//make the calculation lines or boxes visible
function ShowCalcBoxesLines(input) {
	input = input ? input.toLowerCase() : "calc_boxes";
	if (!typePF || (input !== "calc_boxes" && input !== "calc_lines")) {
		return;
	}
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
}

// give the default inputform
function returnInputForm(displayForm, asArray) {
	var theReturn = "dd/mm/yyyy";
	if (displayForm.substr(0,1) === "m") {
		theReturn = "mm/dd/yyyy";
	} else if (displayForm.substr(0,1) === "y") {
		theReturn = "yyyy/mm/dd";
	}
	if (asArray) theReturn = theReturn.split("/");
	return theReturn;
}

//chane the format of all the date fields of the AL log page, and change the month-day order if appropriate
function UpdateALdateFormat(dateForm) {	
	dateForm = dateForm ? dateForm : What("DateFormat_Remember");
	var oldDateForm = What("DateFormat_Remember");
	var oldDateInputFormA = returnInputForm(oldDateForm, true);
	Value("DateFormat_Remember", dateForm);
	var dateInputForm = returnInputForm(dateForm);
	var dateInputFormA = dateInputForm.split("/");
	var dateInputFormLong = dateInputForm.replace(/y+/, "year").replace(/d+/, "day").replace(/m+/, "month");
	var changeOrder = dateForm.substr(0,1) !== oldDateForm.substr(0,1); // see if the month and day order should be changed or not
	
	var ALlogA = What("Template.extras.ALlog").split(",");
	for (var tA = 0; tA < ALlogA.length; tA++) {
		var prefix = ALlogA[tA];
		for (var i = 1; i < FieldNumbers.logs; i++) {
			var dateFld = prefix + "AdvLog." + i + ".date";
			var dateFldValue = What(dateFld);
			if (dateFldValue && changeOrder && dateFldValue.match(/\d+/g).length === 3) {
				dateFldValue = dateFldValue.match(/\d+/g);
				dateFldValue = dateFldValue[oldDateInputFormA.indexOf(dateInputFormA[0])] + "/" + dateFldValue[oldDateInputFormA.indexOf(dateInputFormA[1])] + "/" + dateFldValue[oldDateInputFormA.indexOf(dateInputFormA[2])];
			}
			if (dateFldValue && util.scand(dateInputForm, dateFldValue)) {
				Value(dateFld, dateFldValue);
			}
			AddTooltip(dateFld, "Write the date of the session or event here, using the format \"" + dateInputFormLong + "\".\n\nYou can change this format using the \"Logsheet Options\" button above.");
		}
	}
}

//return the value of the field that this notes field (field calculation)
function CalcCompNotes() {
	var prefix = event.target.name.substring(0, event.target.name.indexOf("Comp."));
	var notesFld = prefix + (typePF ? "Cnote.Left" : "Cnote.Right");
	event.value = What(notesFld);
}

// add the content to all the other fields that should share the content (field validation)
function ValidateCompNotes() {
	var prefix = event.target.name.substring(0, event.target.name.indexOf("Comp."));
	var notesFld = prefix + (typePF ? "Cnote.Left" : "Cnote.Right");
	var theValue = What(notesFld);
	if (event.value !== theValue) {
		Value(notesFld, event.value);
	}
}

// show the selected layers on the companion page
function ShowCompanionLayer(prefix) {
	
	//if the sheet is currently flattened, undo that first
	if (What("MakeMobileReady Remember") !== "") MakeMobileReady(false);
	
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
	if (minVer) return;
	type = type ? type.toLowerCase() : "all";
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
}

function ChangeToCompleteAdvLogSheet() {
	if (minVer) return;
	ResetAll();
	tDoc.getField("AdvLog.Class and Levels").setAction("Calculate", "CalcAdvLogInfo();");
	tDoc.getField("AdvLog.Class and Levels").setAction("Validate", "ValidateAdvLogInfo();");
	tDoc.getField("AdvLog.Class and Levels").readonly = false;

	tDoc.getField("AdvLogS.Background_Faction.Text").setAction("OnBlur", "UpdateFactionSymbols();");
	tDoc.getField("AdvLogS.Background_Faction.Text").setAction("Keystroke", "");
	
	tDoc.getTemplate("ALlog").spawn(0, false, false);
	tDoc.deletePages({nStart: 1, nEnd: tDoc.numPages - 1});
	tDoc.getTemplate("remember").hidden = false;
	tDoc.getTemplate("blank").hidden = false;
	
	//remove the saveIMG fields that are now useless
	tDoc.removeField("SaveIMG.SpellSlots");
	tDoc.removeField("SaveIMG.Spells");

	if (typePF) { //if the Printer Friendly version, update the copyright
		tDoc.getField("CopyrightInformation").defaultValue = "Based on Wizards of the Coast " + (tDoc.info.SheetType === "Printer Friendly" ? "adventure logsheet" : "character sheet") + "; made by Joost Wijnen - Flapkan@gmail.com";
		tDoc.resetForm(["CopyrightInformation"]);
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
	}
	
	var keyPF = "This Adventure Logsheet is an extraction from MPMB's Character Record Sheet [Printer Friendly]. It follows the design and uses elements of the official D&D 5e adventure logsheet by Wizards of the Coast, but has been heavily modified by Joost Wijnen [morepurplemorebetter] (flapkan@gmail.com).\\n\\nOther credits:\\n- Gretkatillor on ENworld.org for the code in this sheet was inspired by Gretkatillor's brilliant 'Clean Sheet'.";

	var keyPFR = "This Adventure Logsheet is an extraction from MPMB's Character Record Sheet [Printer Friendly - Redesign]. It follows the design idea of the official D&D 5e character sheet by Wizards of the Coast, but has been created from the ground up by Joost Wijnen [morepurplemorebetter] (flapkan@gmail.com).\\n\\nOther credits:\\n- Gretkatillor on ENworld.org for the code in this sheet was inspired by Gretkatillor's brilliant 'Clean Sheet'.";

	var keyCF = "This Adventure Logsheet is an extraction from MPMB's Character Record Sheet [" + tDoc.info.SheetType + "]. This sheet uses elements designed by Javier Aumente, but has been created from the ground up by Joost Wijnen [morepurplemorebetter] (flapkan@gmail.com).\\n\\nOther credits:\\n- Gretkatillor on ENworld.org for the code in this sheet was inspired by Gretkatillor's brilliant 'Clean Sheet'."
	
	//move the pages that we want to extract to a new instance, by running code from a console
	var forConsole = "tDoc.extractPages({nStart: 0, nEnd: 2});\n\n";
	forConsole += "this.info.AdvLogOnly = true;";
	forConsole += " var toDelScripts = ['ListsBackgrounds', 'ListsClasses', 'ListsClassesUA', 'ListsCreatures', 'ListsFeats', 'ListsGear', 'ListsRaces', 'ListsRacesUA', 'ListsSpells', 'ListsSources']; for (var s = 0; s < toDelScripts.length; s++) {this.removeScript(toDelScripts[s]);};";
	forConsole += " this.createTemplate({cName:\"ALlog\", nPage:0 });";
	forConsole += " this.createTemplate({cName:\"remember\", nPage:1 });";
	forConsole += " this.createTemplate({cName:\"blank\", nPage:2 });";
	forConsole += " this.getTemplate(\"ALlog\").hidden = true;";
	forConsole += " this.getTemplate(\"ALlog\").spawn(0, false, false);";
	forConsole += " this.getTemplate(\"remember\").hidden = true;";
	forConsole += " this.getTemplate(\"blank\").hidden = true;";
	forConsole += " this.info.SheetVersion = \"" + tDoc.info.SheetVersion + "\";";
	forConsole += " this.info.SheetType = \"" + tDoc.info.SheetType + "\";";
	forConsole += " this.info.Keywords = \"" + (!typePF ? keyCF : (tDoc.info.SheetType === "Printer Friendly" ? keyPF : keyPFR)) + "\";";
	forConsole += " this.info.Subject = \"D&D 5e; Character Sheet; Adventurers League; Adventure Logsheet\";";
	forConsole += " this.info.ContactEmail = \"Flapkan@gmail.com\";";
	forConsole += " this.info.Title = MakeDocName();";
	forConsole += " typePF = (/printer friendly/i).test(this.info.SheetType);";
	forConsole += " typeA4 = (/a4/i).test(this.info.SheetType);";
	forConsole += " typeLR = (/letter/i).test(this.info.SheetType);";
	forConsole += " minVer = this.info.SpellsOnly || this.info.AdvLogOnly;";
	forConsole += " CreateBkmrksCompleteAdvLogSheet();";
	forConsole += " this.calculateNow();";
	forConsole += " this.importDataObject({cName: \"FAQ.pdf\", cDIPath: \"/D/Joost's Documenten/Dungeons & Dragons/5th Edition/- Sheets Creation/- MPMB's Character Record Sheet/Frequently Asked Questions/FAQ.pdf\"});";
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
	
	tDoc.bookmarkRoot.children[0].createChild({cName: "Flatten", cExpr: "MakeMobileReady(What(\"MakeMobileReady Remember\") === \"\");", nIndex: 0});
	tDoc.bookmarkRoot.children[0].children[0].color = ["RGB", 0.2823486328125, 0.1921539306640625, 0.478424072265625];
	
	tDoc.bookmarkRoot.children[0].createChild({cName: "Text Options", cExpr: "MakeTextMenu_TextOptions();", nIndex: 0});
	tDoc.bookmarkRoot.children[0].children[0].color = ["RGB", 0.8000030517578125, 0.6666717529296875, 0.1137237548828125];
	
	tDoc.bookmarkRoot.children[0].createChild({cName: "Set Pages Layout", cExpr: "MakeAdvLogMenu_AdvLogOptions(true);", nIndex: 0});
	tDoc.bookmarkRoot.children[0].children[0].color = ["RGB", 0.9098052978515625, 0.196075439453125, 0.48626708984375];
	
	//make links bookmark section
	tDoc.bookmarkRoot.createChild({cName: "Links", cExpr: "", nIndex: 1});
	
	var aLink = typePF ? "http://www.dmsguild.com/product/186823/" : "http://www.dmsguild.com/product/193053/";
	tDoc.bookmarkRoot.children[1].createChild({cName: "Get the Full Character Record Sheet", cExpr: "contactMPMB(\"fullversion\");", nIndex: 0});
	
	var NameLink = tDoc.info.SheetType === "Printer Friendly" ? "Get the Printer Friendly Redesign" : "Get the Latest Version";
	tDoc.bookmarkRoot.children[1].createChild({cName: NameLink, cExpr: "contactMPMB(\"latestversion\");", nIndex: 1});
	
	NameLink = typePF ? "Get the Colorful Design" : "Get the Printer Friendly Design";
	tDoc.bookmarkRoot.children[1].createChild({cName: NameLink, cExpr: "contactMPMB(\"otherdesign\");", nIndex: 2});
	
	//make FAQ bookmark section
	tDoc.bookmarkRoot.createChild({cName: "FAQ", cExpr: "tDoc.exportDataObject({ cName: \"FAQ.pdf\", nLaunch: 2 });", nIndex: 2});
	
	//make the contact bookmark section
	tDoc.bookmarkRoot.createChild({cName: "Contact MPMB", cExpr: "contactMPMB(\"patreon\");", nIndex: 3});
	tDoc.bookmarkRoot.children[3].style = 2;
	tDoc.bookmarkRoot.children[3].createChild({cName: "on DMs Guild", cExpr: "contactMPMB(\"dmsguild\");", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on EN world", cExpr: "contactMPMB(\"enworld\");", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "via Email", cExpr: "contactMPMB(\"email\");", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on GitHub", cExpr: "contactMPMB(\"github\");", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on Reddit", cExpr: "contactMPMB(\"reddit\");", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on Twitter", cExpr: "contactMPMB(\"twitter\");", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on Patreon", cExpr: "contactMPMB(\"patreon\");", nIndex: 0});
	
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
	thermoM("start"); //start a progress dialog
	thermoM("Updating Ranger's Companion..."); //change the progress dialog text
	
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
	var AScompA = What("Template.extras.AScomp").split(",");
	var progressDia = 0;
	
	for (var i = 0; i < AScompA.length; i++) {
		progressDia += 1;
		thermoM(progressDia/(AScompA.length + 1)); //increment the progress dialog's progress
		var prefix = AScompA[i];
		if (What(prefix + "Companion.Remember") === "companionrr") { //only do something if the creature is set to "companionrr"
			var thisCrea = CurrentCompRace[prefix] && CurrentCompRace[prefix].typeFound === "creature" ? CurrentCompRace[prefix] : false;
			
			//first update the proficiency bonus
			if (deleteIt) {
				Value(prefix + "Comp.Use.Proficiency Bonus", thisCrea ? thisCrea.proficiencyBonus : "");
			} else {
				Value(prefix + "Comp.Use.Proficiency Bonus", newLvlProfB);
			}
			
			//now look into adding the proficiency bonus to attack damage and removing multiattacks
			var remLvl = Who(prefix + "Companion.Remember").split(",");
			var oldLvl = [
				Number(remLvl[0]),
				remLvl[1] !== undefined ? Number(remLvl[1]) : 0
			]
			var oldLvlProfB = theProfB(oldLvl[0]);
			if (deleteIt || newLvlProfB !== oldLvlProfB) {
				var diff = deleteIt ? "" : newLvlProfB - oldLvlProfB;
				var WeaArray = [];
				
				//add attacks damage and to hit bonus fields
				for (var A = 1; A <= 3; A++) {
					var weaFld = prefix + "Comp.Use.Attack." + A + ".Weapon Selection";
					var aWea = What(weaFld);
					if (!deleteIt && aWea) {
						WeaArray.push(prefix + "BlueText.Comp.Use.Attack." + A + ".Damage Bonus");
						ReplaceString(prefix + "Comp.Use.Attack." + A + ".Description", "", false, "(((One|Two).+as an Attack action)|(2 per Attack));? ?", true);
					} else if (aWea) {
						tDoc.resetForm([weaFld]);
						Value(weaFld, aWea)
					}
				}
				
				if (!deleteIt) {
					for (var f = 0; f < WeaArray.length; f++) {
						var theBTvalue = Number(What(WeaArray[f]));
						if (!isNaN(theBTvalue)) Value(WeaArray[f], theBTvalue + diff);
					}
				}
			}
			
			//add the HD
			if (thisCrea && deleteIt) {
				Value(prefix + "Comp.Use.HD.Level", thisCrea.hd[0]);
			} else if (thisCrea) {
				Value(prefix + "Comp.Use.HD.Level", thisCrea.hd[0] + RangerLvl - 3);
			} else if (What(prefix + "Comp.Use.HD.Level")) {
				var HDincr = oldLvl[0] === 0 ? RangerLvl - 3 : RangerLvl - oldLvl[0];
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
				var oldLvlText = theText(oldLvl[1]);
				ReplaceString(prefix + "Cnote.Left", newLvlText, false, oldLvlText);
				var oldLvlFea = theFeature(oldLvl[1]);
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
	thermoM("stop"); //stop the top progress dialog
}

//Give a pop-up dialogue when the amount of Ability Score Improvements after changing level
function CountASIs() {
	if (!AbilityScores.improvements.classlvl) UpdateTooltips();
	var newASI = 0;
	for (var nClass in classes.known) {
		var clLvl = Math.min(CurrentClasses[nClass].improvements.length, classes.known[nClass].level);
		newASI += clLvl ? CurrentClasses[nClass].improvements[clLvl - 1] : 0;
	}
	var oldASI = 0;
	for (var oClass in classes.old) {
		clLvl = Math.min(CurrentClasses[nClass].improvements.length, classes.old[oClass].classlevel);
		oldASI += clLvl ? CurrentClasses[nClass].improvements[clLvl - 1] : 0;
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
	var modString = toUni(" Bonus Modifier") + "\nThe number you type in here will be added to the calculated Acrobatics value.\n\n" + toUni("Dynamic Modifiers") + "\nYou can also have the field use ability score modifiers. To do this, use the abbreviations of ability scores (Str, Dex, Con, Int, Wis, Cha, HoS), math operators (+, -, /, *), and numbers.\n   For example: '2+Str' or 'Wis+Int'.\nDon't worry if you are only able to write one or two letters of an ability score's abbreviation, the field will auto-complete (e.g. typing 'S+1' will result in 'Str+1').";
	var modStringC = modString.replace(", HoS", "");
	var modStringE = "\n\nNote that any bonus from \"Jack of All Trades\" or \"Remarkable Athelete\" will be added automatically if the appropriate checkbox is checked.";
	
	if (IsNotReset === false) {//on a reset only re-do the bonus modifier tooltips
		for (var S = 0; S < (SkillsList.abbreviations.length - 2); S++) {
			var newSkill = SkillsList.names[S];
			AddTooltip(SkillsList.abbreviations[S] + " Bonus", toUni(newSkill) + modString.replace("Acrobatics", newSkill) + modStringE);
			if (typePF) AddTooltip("BlueText.Comp.Use.Skills." + SkillsList.abbreviations[S] + ".Bonus", toUni(newSkill) + modString.replace("Acrobatics", newSkill).replace(", HoS", ""));
		}
		return;
	};
	
	Menus.skills = [{
		cName : "Sort skills alphabetically",
		cReturn : "go#alphabeta",
		bMarked : sWho === "alphabeta"
	}, {
		cName : "Sort skills by ability score",
		cReturn : "go#abilities",
		bMarked : sWho === "abilities"
	}, {
		cName : "-"
	}, {
		cName : "Show a dialogue with my skill options",
		cReturn : "show#dialog"
	}];
	
	var MenuSelection = input ? input : getMenu("skills");
	
	if (MenuSelection !== undefined && MenuSelection[0] !== "nothing") {
		if (MenuSelection[0] === "show") {
			app.alert({
				cTitle : "Skill selection options",
				cMsg : Who("SkillsClick").replace(/.*\n\n/, ""),
				nIcon : 3
			});
		} else if (MenuSelection[1] !== sWho) {
			tDoc.delay = true;
			tDoc.calculate = false;
			
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
				Value(newFld + " Bonus", oSkillBon[B][1], toUni(newSkill) + modString.replace("Acrobatics", newSkill) + modStringE);
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
						Value(bField + newFld + ".Bonus", oSkillBon[B][1], toUni(newSkill) + modString.replace("Acrobatics", newSkill).replace(", HoS", ""));
					}
				}
			}
			
			//set the correct tooltip for remembering
			AddTooltip("Text.SkillsNames", MenuSelection[1]);
			
			//set the rich text for the skill names
			SetRichTextFields(false, true);
			
			tDoc.calculate = IsNotReset;
			tDoc.delay = !IsNotReset;
			if (IsNotReset) tDoc.calculateNow();
		}
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
	
	tRe.Source = choice && aFea[choice].source ? aFea[choice].source : (aFea.source ? aFea.source : "");
	
	for (var aProp in tRe) {
		if (aProp === "Source") continue;
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
function addALlogEnrry() {
	//first find the next empty logsheet entry
	var theTypesA = [
		".xp",
		".gold",
		".downtime",
		".renown",
		".magicItems"
	];
	var ALlogA = What("Template.extras.ALlog").split(",");
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
	//now if no empty log was found, add another logsheet page
	if (emptyLog.length === 0) {
		emptyLog[0] = DoTemplate("ALlog", "Add");
		emptyLog[1] = 1;
		emptyLog[2] = ALlogA[ALlogA.length - 1];
		tDoc.calculate = true;
		tDoc.calculateNow();
		tDoc.calculate = false;
	};
	
	var baseFld = emptyLog[0] + "AdvLog." + emptyLog[1] + ".";
	// experience
	var start = baseFld === "AdvLog.1." ? 0 : What(baseFld + "xp.start");
	var total = What("Total Experience") - start;
	Value(baseFld + "xp.gain", (total >= 0 ? "+" : "") + total);
	// gold
	start = baseFld === "AdvLog.1." ? 0 : What(baseFld + "gold.start");
	total = Math.round(((Number(What("Platinum Pieces").replace(",", ".")) * 10) + Number(What("Gold Pieces").replace(",", ".")) + (Number(What("Electrum Pieces").replace(",", ".")) / 2) + (Number(What("Silver Pieces").replace(",", ".")) / 10) + (Number(What("Copper Pieces").replace(",", ".")) / 100)) * 100) / 100 - start;
	Value(baseFld + "gold.gain", (total >= 0 ? "+" : "") + total);
	// downtime (can't really be calculated, so just add a zero)
	Value(baseFld + "downtime.gain", "+0");
	// renown
	start = baseFld === "AdvLog.1." ? 0 : What(baseFld + "renown.start");
	total = What("Background_Renown.Text") - start;
	Value(baseFld + "renown.gain", (total >= 0 ? "+" : "") + total);
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
	
	// set today's date
	var dateInputForm = returnInputForm(What("DateFormat_Remember"));
	Value(baseFld + "date", util.printd(dateInputForm, new Date()));
	
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
};

//menu for logsheet entries to move up, move down, insert, delete, or clear
function MakeAdvLogLineMenu_AdvLogLineOptions() {
	var prefix = event.target.name.substring(0, event.target.name.indexOf("Button.AdvLog."));
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
			if (array[i][1] === "up" && prefix === "" && lineNmbr === 1) {
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
	
	if (MenuSelection !== undefined) doAdvLogLine(MenuSelection[0], lineNmbr, prefix);
}

//do with logsheet entry, move up, move down, insert, delete, clear
function doAdvLogLine(action, lineNmbr, prefix) {
	tDoc.delay = true;
	tDoc.calculate = false;
	var ALlogA = What("Template.extras.ALlog").split(",");
	var preNm = prefix + "AdvLog.";
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
			if (action === "up" && (prefix !== "" || lineNmbr !== 1)) {
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

	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

//a way to contact morepurplemorebetter
function contactMPMB(medium) {
	switch (medium.toLowerCase()) {
	 case "email" :
		app.launchURL(("mailto:flapkan@gmail.com?subject=MPMBs Character Tools&body=%0D%0A%0D%0A%0D%0ASheet version: MPMB\'s " + (tDoc.info.SpellsOnly ? "Complete " + tDoc.info.SpellsOnly.capitalize() + " Spell Sheet" : (tDoc.info.AdvLogOnly ? "Adventure Logsheet" : "Character Record Sheet")) + " v" + tDoc.info.SheetVersion.toString() + " (" + tDoc.info.SheetType + ")" + " %0D%0APDF viewer: " + app.viewerType + ", v" + app.viewerVersion + "; Language: " + app.language + "; OS: " + app.platform).replace(/ /g, "%20"), true);
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
		app.launchURL("http://www.dmsguild.com/browse.php?author=morepurplemorebetter", true);
		break;
	 case "enworld" :
		app.launchURL("http://www.enworld.org/forum/rpgdownloads.php?do=download&downloadid=1180", true);
		break;
	 case "syntax" :
		app.launchURL("http://flapkan.com/mpmb/syntax", true);
		break;
	 case "additions" :
		app.launchURL("http://flapkan.com/mpmb/additions", true);
		break;
	 case "syntaxgit" :
		app.launchURL("https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/tree/master/additional%20content%20syntax", true);
		break;
	 case "additionsgit" :
		app.launchURL("https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/tree/master/additional%20content", true);
		break;
	 case "latestversion" :
		app.launchURL("http://www.dmsguild.com/product/" + (LinkDMsGuild[minVer ? (tDoc.info.SpellsOnly ? "spell" : "advlog") : "character"][typePF ? "PF" : "CF"]), true);
		break;
	 case "otherdesign" :
		app.launchURL("http://www.dmsguild.com/product/" + (LinkDMsGuild[minVer ? (tDoc.info.SpellsOnly ? "spell" : "advlog") : "character"][typePF ? "CF" : "PF"]), true);
		break;
	 case "fullversion" :
		app.launchURL("http://www.dmsguild.com/product/" + (LinkDMsGuild.character[typePF ? "CF" : "PF"]), true);
		break;
	}
};

//open a dialogue for the Patreon
function PatreonStatement() {
	try {
		var iNow = new Date();
		var timeDiff = iNow.getTime() - eval(tDoc.getField("SaveIMG.Patreon").submitName).getTime();
		if (Math.floor(timeDiff / (1000 * 3600 * 24)) >= 28) {
			var oButIcon = this.getField("SaveIMG.Patreon").buttonGetIcon();
			var oMyIcon = util.iconStreamFromIcon(oButIcon);	
			
			var PatreonDialog = {
				initialize : function (dialog) {
					dialog.load({
						"img1" : oMyIcon,
						"txt1" : "If you like this sheet, please consider becoming a patron at the Patreon for MPMB's Character Record Sheet.\n\nWith your contribution on Patreon:\n   \u2022 I can add all Unearthed Arcana material right after it has been released.\n   \u2022 You get to choose which new features get added.\n   \u2022 Your favourite third-party material gets added.\n   \u2022 You get instant access and alerts when new versions are released.",
						"txt2" : "Don't worry, the sheet will stay as 'Pay What You Want' on DMs Guild.\nHowever, if you feel like contributing more, it will all flow back into expanding the sheets' features and content.\n\nYou can always visit the Patreon webpage using the bottom \"Contact MPMB\" bookmarks."
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
									char_height : 13,
									char_width : 40
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
									char_height : 10,
									char_width : 40
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
	var nameHeader = isArray(NameEntity) ? "\n\n" + toUni(NameEntity[0]) + " [" + NameEntity[1] + "]:" : "\n\n" + toUni(NameEntity) + ":";
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
	fldName = fldName ? fldName : event.target.name;
	var QI = fldName.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : fldName.substring(0, fldName.indexOf("Comp."));
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
	
	thermoM("start"); //start a progress dialog
	thermoM("Filling out the weapon's details..."); //change the progress dialog text
	tDoc.delay = true;
	tDoc.calculate = false;
	
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
		thermoM("Applying the weapon's features..."); //change the progress dialog text
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
		var StrDex = What("Str Mod") < What("Dex Mod") ? 2 : 1;
		fields.Mod = isReCalc && !theWea.ability ? What(fldBase + "Mod") :
			(/finesse/i).test(theWea.description) ? StrDex : theWea.ability;
		
		//change mod if this is concerning a spell/cantrip
		if (thisWeapon[3] && thisWeapon[4].length) {
			var abiArr = thisWeapon[4].map( function(sClass) {
				return CurrentSpells[sClass] && CurrentSpells[sClass].ability ? CurrentSpells[sClass].ability : 0;
			});
			var abiModArr = [];
			abiArr.forEach(function (abiNmbr) {
				var thisMod = What(AbilityScores.abbreviations[abiNmbr - 1] + " Mod");
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
			if (CurrentWeapons.field[ArrayNmbr].toLowercase().indexOf(CurrentWeapons.manualproficiencies[i].toLowercase()) !== -1) {
				Checkbox(fldBase + "Proficiency", true);
				break;
			};
		};
	};
	
	thermoM("stop"); //stop the top progress dialog
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
};

//calculate the attack damage and to hit, can be called from any of the attack fields (sets the fields)
function CalcAttackDmgHit(fldName) {
	if (What("Manual Attack Remember") === "Yes") return; //if the attack calculation is set to manual, don't do anything
	
	fldName = fldName ? fldName : event.target.name;
	var QI = fldName.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : fldName.substring(0, fldName.indexOf("Comp."));
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

		// see if this is a off-hand attack and the modToDmg shouldn't be use
		var isOffHand = isMeleeWeapon && (/^(?!.*(spell|cantrip))(?=.*(off.{0,3}hand|secondary)).*$/i).test(WeaponText) ? true : false;
		if (isOffHand) {
			AddAction("bonus action", "Off-hand Attack");
			output.modToDmg = false;
		};

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
			if ((/^(?=.*(B|C))(?=.*d\d).*$/).test(output[out])) { //if this involves a cantrip calculation
				var cLvl = Number(QI ? What("Character Level") : What(prefix + "Comp.Use.HD.Level"));
				var cDie = cantripDie[Math.min(Math.max(cLvl, 1), cantripDie.length) - 1];
				output[out] = output[out].replace(/C/g, cDie).replace(/B/g, cDie - 1).replace(/0.?d\d+/g, 0);
			};
			if (output[out][0] == "=") { // a string staring with "=" means it wants to be calculate to values
				output[out] = output[out].substr(1).split("d").map(function(v) {
					try {
						return EvalBonus(v, QI ? true : prefix);
					} catch (errV) {
						return v;
					};
				}).join("d");
			};
			dmgDie = output[out];
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

//a way to show a very long piece of text without the dialogue overflowing the screen
function ShowDialog(hdr, strng) {
	if (strng === "sources") {
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
		header : hdr,
		string : strng,
		initialize : function(dialog) {
			dialog.load({
				"txt0" : "[Can't see the 'OK' button at the bottom? Use ENTER to close this dialog]",
				"head" : this.header,
				"Eval" : this.string.replace(/^\n/, "").replace(/^\n/, "")
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
						item_id : "txt0",
						alignment : "align_fill",
						font : "dialog",
						height : 20,
						width : 550
					}, {
						type : "static_text",
						item_id : "head",
						alignment : "align_fill",
						font : "heading",
						bold : true,
						height : 21,
						width : 550
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
	var QI = event.target.name.indexOf("Comp.") === -1;
	var prefix = QI ? "" : event.target.name.substring(0, event.target.name.indexOf("Comp."));
	event.value = QI ? What(SkillsList.abilityScores[SkillsList.abbreviations.indexOf("Init")] + " Mod") : What(prefix + "Comp.Use.Ability.Dex.Mod");
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
	input = input.replace(/dc/ig, "").replace(/(Str|Dex|Con|Int|Wis|Cha|HoS|Prof)(Str|Dex|Con|Int|Wis|Cha|HoS|Prof)/ig, "$1+$2").replace(/(\+|\-|\/|\*)(\+|\-|\/|\*)/g, "$2").replace(/(^(\+|\/|\*))|((\+|\-|\/|\*)$)/g, "");
	// change ability score abbreviations with their modifier
	["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"].forEach(function(AbiS) {
		input = input.replace(RegExp(AbiS, "ig"), Number(What(modStr[0] + AbiS + modStr[1])));
	});
	// change Prof with the proficiency bonus
	var ProfB = notComp === true ? tDoc.getField("Proficiency Bonus").submitName : !isSpecial || isSpecial === "test" ? What(notComp + "Comp.Use.Proficiency Bonus") : What(notComp + "Wildshape." + isSpecial + ".Proficiency Bonus");
	input = input.replace(/Prof/ig, ProfB);
	try {
		output = eval(input);
		return !isNaN(output) ? Number(output) : 0;
	} catch (err) {
		return isSpecial === "test" ? undefined : 0;
	};
};

// add a way to set the value of a field
function SetThisFldVal() {
	if (event.modifier || event.shift) {
		var theVal = event.target.value;
		if (!isNaN(theVal)) theVal = theVal.toString();
		var theDialog = {
			theTXT : "",
			initialize : function (dialog) {
				dialog.load({
					"user" : theVal
				});
			},
			commit : function (dialog) {
				var oResult = dialog.store();
				this.theTXT = oResult["user"];
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
						height : 21,
						char_width : 35,
						name : "Set the field's value"
					}, {
						type : "static_text",
						alignment : "align_fill",
						item_id : "txt0",
						name : "Please enter the value you want to set for the field:",
						char_width : 35,
						height : 20
					}, {
						type : "edit_text",
						alignment : "align_center",
						item_id : "user",
						char_width : 35,
						height : 20
					}, {
						type : "static_text",
						alignment : "align_fill",
						item_id : "txt1",
						name : "The field won't appear to change until you click/tab out of it.",
						char_width : 35,
						height : 20
					}, {
						type : "ok_cancel"
					}]
				}]
			}
		};
		if (app.execDialog(theDialog) === "ok") {
			event.target.value = theDialog.theTXT;
		};
	};
};

// add a modifier to a modifier field so that the formula stays intact; Remove is boolean
function AddToModFld(Fld, Mod, Remove) {
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
	Value(Fld, setFld);
};