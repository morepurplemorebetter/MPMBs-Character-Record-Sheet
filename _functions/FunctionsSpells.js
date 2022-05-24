// Get the template prefix of a spellsheet page
function ReturnSpellFieldPrefixSuffix(fldNm) {
	var a = fldNm.match(/(P\d+\.SS(front|more)\.).*?\.(\d+$)/);
	return [a[1], a[3]];
};
// Make an array of all spell fields of that prefix + suffix
function ReturnSpellFieldsArray(prefix, suffix, fullFldNm) {
	if (fullFldNm && (prefix === undefined || suffix === undefined)) {
		var spPreSuf = ReturnSpellFieldPrefixSuffix(fullFldNm);
		prefix = spPreSuf[0];
		suffix = spPreSuf[1];
	};
	return [
		prefix + "spells.check." + suffix,		// 0
		prefix + "spells.name." + suffix,		// 1
		prefix + "spells.description." + suffix,	// 2
		prefix + "spells.save." + suffix,		// 3
		prefix + "spells.school." + suffix,		// 4
		prefix + "spells.time." + suffix,		// 5
		prefix + "spells.range." + suffix,		// 6
		prefix + "spells.components." + suffix,	// 7
		prefix + "spells.duration." + suffix,	// 8
		prefix + "spells.book." + suffix,		// 9
		prefix + "spells.page." + suffix,		//10
		prefix + "spells.remember." + suffix		//11
	];
};
// Make an array of content for spell fields of that line for manual fillable or headers
function ReturnSpellFieldsContentArray(underscores, psionic) {
	return [
		"",
		underscores ? Array(21 + (typePF ? 6 : 0)).join("_") : psionic ? "PSIONIC POWER" : "SPELL",
		underscores ? Array(84 + (typePF ? 25: 0)).join("_") : "DESCRIPTION",
		underscores ? Array( 5).join("_") : "SAVE",
		underscores ? Array( 7 + (typePF ? 1 : 0)).join("_") : psionic ? " ORDER" : "SCHOOL",
		underscores ? Array( 7 + (typePF ? 1 : 0)).join("_") : "TIME",
		underscores ? Array(10 + (typePF ? 2 : 0)).join("_") : "RANGE",
		underscores ? Array( 7).join("_") : "COMP",
		underscores ? Array(12 + (typePF ? 3 : 0)).join("_") : "DURATION",
		underscores ? Array( 3).join("_") : "B",
		underscores ? Array( 4).join("_") : "PG."
	];
};

// find if an array of spellcasting classes fits with the CurrentSpells object
function DoesSpellFit(aCast, clArr) {
	if (!aCast || !clArr) return false;
	if (isArray(aCast)) {
		var testClasses = aCast;
	} else if (typeof aCast == "string") {
		var curSpObj = CurrentSpells[aCast];
		if (!curSpObj) return false
		var testClasses = curSpObj.list && curSpObj.list.class ? (isArray(curSpObj.list.class) ? curSpObj.list.class : [curSpObj.list.class]) : [aCast];
	} else {
		return false;
	}
	for (var i = 0; i < testClasses.length; i++) {
		if (clArr.indexOf(testClasses[i]) != -1) return true;
	}
	return false;
}

// find the spell in the SpellsList
function ParseSpell(input, aCast, limitArray) {
	if (!input) return "";

	input = clean(RemoveZeroWidths(input.replace(/ \(.{1,2}\)/i, "")), false, true).toLowerCase();
	if (!input || (!limitArray && SpellsList[input])) return input;

	var found = "", foundLen = 0, foundDat = 0, foundPrefCl = false;

	for (var key in SpellsList) { //scan string for all creatures
		var kObj = SpellsList[key];
		if (testSource(key, kObj, "spellsExcl") || (limitArray && limitArray.indexOf(key) === -1)) continue; // test if the spell or its source isn't excluded or if we are only allowed a limited results and this is not one of the options

		if (kObj.regExpSearch) { // if it has regex, see if a regex matches
			var thisOne = kObj.regExpSearch.test(input) ? Math.max(key.length, kObj.name.length, kObj.nameAlt ? kObj.nameAlt.length : 0, kObj.nameShort ? kObj.nameShort.length : 0): 0;
		} else { // create our own regex to test with
			var toSearch = "\\b(" + clean(kObj.name).replace(/^\W|\W$/g, "").RegEscape();
			toSearch += kObj.nameShort ? "|" + clean(kObj.nameShort).replace(/^\W|\W$/g, "").RegEscape() : "";
			toSearch += kObj.nameAlt ? "|" + clean(kObj.nameAlt).replace(/^\W|\W$/g, "").RegEscape() : "";
			toSearch += ")\\b";
			toSearch = RegExp(toSearch, "i");
			var thisOne = toSearch.test(input) ? input.match(toSearch)[0].length : 0;
		};
		if (!thisOne) continue; // no exact or regex match, so skip

		// only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source. This differs from the regExpSearch objects
		var tempDate = sourceDate(kObj.source);
		var tempPrefCl = aCast && kObj.classes ? DoesSpellFit(aCast, kObj.classes) : false;
		if (thisOne < foundLen || (thisOne == foundLen && tempDate < foundDat && !(!foundPrefCl && tempPrefCl)) || (foundPrefCl && !tempPrefCl)) continue;

		// we have a match, set the values
		found = key;
		foundLen = thisOne;
		foundDat = tempDate;
		foundPrefCl = tempPrefCl;
	}
	return found;
};

// Create a spell object for a spell + caster combination
// GetSpellObject(theSpl, input[2], input[1], input[3], false)
// GetSpellObject(theSpl, theCast, false, true, true)
function GetSpellObject(theSpl, theCast, firstCol, noOverrides, tipShortDescr) {
	var foundSpell = SpellsList[theSpl];
	var aSpell = { changesObj : {} };
	if (!foundSpell) return aSpell;
	var aDescrAttr = ["description", "descriptionMetric", "descriptionShorter", "descriptionShorterMetric"];
	var aCast = theCast && CurrentSpells[theCast] ? CurrentSpells[theCast] : "";
	for (var key in foundSpell) {
		if (key === 'allowUpCasting') continue;
		aSpell[key] = foundSpell[key];
	}
	// set the firstCol attribute so the CurrentEval can change it
	aSpell.firstCol = firstCol ? firstCol : aSpell.firstCol ? aSpell.firstCol : "";
	// If this spell is gained from an item, remove components
	var bIsMagicItemComponent = aCast && (aCast.typeSp === "item" || (aCast.refType && aCast.refType === "item")) && aCast.magicItemComponents === undefined ? true : false;
	if (bIsMagicItemComponent || (aCast && aCast.magicItemComponents)) {
		aSpell.components = "M\u0192";
		aSpell.compMaterial = "Spells cast by magic items don't require any components other than the magic item itself.";
		aDescrAttr.forEach (function (attr) {
			if (!aSpell[attr]) return;
			aSpell[attr] = aSpell[attr].replace(/ \(\d+k? ?gp( cons\.?)?\)/i, '');
		})
		aSpell.changesObj["Magic Item"] = "\n \u2022 Spells cast by magic items don't require any components except the magic item itself, unless otherwise specified in the magic item's description.";
	}
	// If this spell is gained from an item, feat, or race, remove scaling effects
	if (aCast && !aCast.allowUpCasting && (aCast.allowUpCasting === false || (/^(item|feat|race)$/i).test(aCast.typeSp) || (aCast.refType && (/^(item|feat|race)$/i).test(aCast.refType))) && (aSpell.level || aCast.typeSp == "item" || (aCast.refType && aCast.refType == "item"))) {
		if (removeSpellUpcasting(aSpell)) {
			aSpell.changesObj["Innate Spellcasting"] = "\n \u2022 Spell cast by magic items, from feats, or from racial traits can only be cast at the spell's level, not with higher level spell slots.";
		}
	}
	// Apply spell overrides for this CurrentSpells entry
	if (!noOverrides && aCast && aCast.spellAttrOverride && aCast.spellAttrOverride[theSpl]) {
		var theOver = aCast.spellAttrOverride[theSpl];
		for (var key in theOver) {
			if (key == "changesObj") {
				for (var changeO in theOver[key]) {
					aSpell.changesObj[changeO] = theOver.changesObj[changeO];
				}
			}
			aSpell[key] = theOver[key];
		}
	}
	// If this set the spell to not allow upcasting, apply this now
	if (aSpell.allowUpCasting === false) removeSpellUpcasting(aSpell);

	// Change some things into metric if set to do so
	if (What("Unit System") === "metric") {
		aSpell.description = aSpell.descriptionMetric ? aSpell.descriptionMetric : ConvertToMetric(aSpell.description, 0.5);
		aSpell.range = aSpell.rangeMetric ? aSpell.rangeMetric : ConvertToMetric(aSpell.range, 0.5);
	}

	// Update the spell for the caster level of the character (if not manually added)
	if (CurrentCasters.amendSpDescr && aCast) {
		// apply cantrip die
		if (aSpell.descriptionCantripDie) {
			var cDie = cantripDie[Math.min(CurrentFeats.level, cantripDie.length) - 1];
			var newCantripDieDescr = aSpell.descriptionCantripDie;
			var rxCanDie = /`CD([\-+*]*\d*)`/;
			var execCanDie = rxCanDie.exec(newCantripDieDescr);
			while (execCanDie !== null) {
				var aDie = execCanDie[1].indexOf("*") !== -1 ? cDie * Number(execCanDie[1].replace("*","")) : cDie + Number(execCanDie[1]);
				newCantripDieDescr = newCantripDieDescr.replace(execCanDie[0], aDie);
				execCanDie = rxCanDie.exec(newCantripDieDescr);
			}
			aSpell.description = newCantripDieDescr.replace(/\b0d\d+/g, "0");
		}
		// apply ability score modifier or check
		var spellAbiDescr = applySpellcastingAbility(aSpell, aCast);
		if (spellAbiDescr) {
			aSpell.descriptionBeforeamendSpDescr = aSpell.description;
			aSpell.amendSpDescrCaster = theCast;
			aSpell.description = spellAbiDescr;
		}
	}

	if (CurrentEvals.spellAdd && CurrentCasters.allowSpellAdd) {
		for (var i = 0; i < CurrentEvals.spellAddOrder.length; i++) {
			var evalName = CurrentEvals.spellAddOrder[i][1];
			var evalThing = CurrentEvals.spellAdd[evalName];
			if (!evalThing || typeof evalThing !== 'function') continue;
			var didChange = false;
			var changeHead = "Changes by " + evalName;
			try {
				didChange = evalThing(theSpl, aSpell, aCast ? theCast : "", noOverrides ? true : false);
			} catch (error) {
				var eText = "The custom function for changing spell attributes from '" + evalName + "' produced an error while processing the spell '" + theSpl + "'. The custom function will be removed from the sheet for now, but please contact the author of the feature to have this issue corrected:\n " + error;
				for (var e in error) eText += "\n " + e + ": " + error[e];
				console.println(eText);
				console.show();
				delete CurrentEvals.spellAdd[evalName];
				CurrentEvals.spellAddOrder.splice(i, 1);
				i--;
				didChange = false;
			}
			if (didChange && CurrentEvals.spellStr && CurrentEvals.spellStr[evalName]) {
				if (!aSpell.changesObj[changeHead]) {
					aSpell.changesObj[changeHead] = CurrentEvals.spellStr[evalName];
				} else {
					aSpell.changesObj[changeHead] += CurrentEvals.spellStr[evalName];
				}
			}
		}
	}

	//make the tooltip for the description field
	var spTooltip = "";
	var ttSpellObj = aSpell.completeRewrite ? aSpell : foundSpell;
	if (ttSpellObj.descriptionFull || tipShortDescr) {
		spTooltip = toUni(ttSpellObj.name);
		if (ttSpellObj.school) {
			spTooltip += " \u2014 ";
			var spSchoolNm = spellSchoolList[ttSpellObj.school] ? spellSchoolList[ttSpellObj.school] : ttSpellObj.school;
			if (spSchoolNm && ttSpellObj.subSchool) spSchoolNm += " (" + ttSpellObj.subSchool + ")";
			if (ttSpellObj.psionic) {
				var spLevelNm = spellLevelList[ttSpellObj.level + 10].replace(/s\b/, '');
				spTooltip += ttSpellObj.level == 0 ?
					spLevelNm :
					spSchoolNm.capitalize() + spLevelNm.toLowerCase();
			} else {
				var spLevelNm = spellLevelList[ttSpellObj.level] ? spellLevelList[ttSpellObj.level].replace(/s\b/, '').toLowerCase() : "";
				spTooltip += ttSpellObj.level == 0 ?
					spSchoolNm.capitalize() + " " + spLevelNm :
					spLevelNm + " " + spSchoolNm;
			}
			if (ttSpellObj.ritual) spTooltip += " (ritual)";
		}

		if (ttSpellObj.timeFull) {
			spTooltip += "\n  Casting Time:  " + ttSpellObj.timeFull;
		} else if (ttSpellObj.time) {
			spTooltip += "\n  Casting Time:  " + ttSpellObj.time.replace(/1 a\b/i, '1 action').replace(/1 bns\b/i, '1 bonus action').replace(/1 rea\b/i, '1 reaction').replace(/\b1 min\b/i, '1 minute').replace(/\b1 h\b/i, '1 hour').replace(/\bmin\b/i, 'minutes').replace(/\bh\b/i, 'hours');
		}

		if (ttSpellObj.range) spTooltip += "\n  Range:  " + ttSpellObj.range.replace(/s: *(.*)/i, "Self ($1)").replace(/rad\b/i, "radius").replace(/(\d+)(ft|m)/i, "$1-$2");

		if (ttSpellObj.components) spTooltip += "\n  Components:  " + ttSpellObj.components + (ttSpellObj.compMaterial ? " (" + ttSpellObj.compMaterial.substr(0,1).toLowerCase() + ttSpellObj.compMaterial.substr(1) + ")" : "");

		if (ttSpellObj.duration) spTooltip += "\n  Duration:  " + ttSpellObj.duration.replace(/\b(conc), \b/i, '$1entration, up to ').replace(/\b1 min\b/i, '1 minute').replace(/\b1 h\b/i, '1 hour').replace(/\bmin\b/i, 'minutes').replace(/\bh\b/i, 'hours').replace(/\(d\)/i, "(dismiss as 1 action)").replace(/(instant)\./i, "$1aneous");

		if (ttSpellObj.descriptionFull) spTooltip += "\n\n" + ttSpellObj.descriptionFull;

		if (tipShortDescr) spTooltip += "\n\n__________\n\n" + toUni("Short Description") + '  (how it will appear on the sheet)\n  ' + aSpell.description;
		
		if (ObjLength(aSpell.changesObj)) {
			var txt = [];
			for (var str in aSpell.changesObj) txt.push(toUni(str) + aSpell.changesObj[str]);
			spTooltip += "\n\n>>  CHANGES BY FEATURES  <<\nThe above original ";
			spTooltip += tipShortDescr ? "will be modified when added to the sheet as follows (the short description includes the changes):\n\n" : "has been changed as follows:\n\n";
			spTooltip += txt.join("\n\n");
		}
	};
	if (spTooltip) aSpell.tooltip = spTooltip;
	aSpell.tooltipSource = stringSource(aSpell, "full,page,multi");

	return aSpell;
}

// under certain conditions, the range of a spell might not fit on the colourful sheet
function fixSpellRangeOverflow(rangeStr) {
	var testRx = typePF ? /S:\d+[,.]\d+[- /]?m (cone|cube)/i : /S:\d+[,.]?\d+[- /]?m (cone|cube)|S:\d+[,.]\d+[- /]?m rad/i;
	return (testRx).test(rangeStr) ? rangeStr.trim().replace(/[- /]?m (con|cub)e/i, "m $1").replace(/[- /]?m rad/i, "m rad") : rangeStr;
}

// under certain conditions, we want to remove any upcasting from the spell's short description
function removeSpellUpcasting(oSpell) {
	var bReturn = false;
	var removeRegex = /\+\d+d?\d*\/(\d*SL|PP)\b|\bSL used/ig;
	["description", "descriptionMetric", "descriptionShorter", "descriptionShorterMetric"].forEach (function (attr) {
		if ( !oSpell[attr] || !removeRegex.test(oSpell[attr]) ) return;
		oSpell[attr] = oSpell[attr]
			.replace("SL used", "level " + oSpell.level)
			.replace(removeRegex, '')
			.replace(/, within (30 ft|10 m) of each other,?|, each max (30 ft|10 m) apart,?|; \+\d+d\d+ at CL.*?17/ig, '');
		bReturn = true;
	})
	oSpell.noSpellUpcasting = true;
	return bReturn;
}

// apply spellcasting ability modifier to spell description
function applySpellcastingAbility(oSpell, oCast) {
	if (!oCast && oSpell.amendSpDescrCaster) oCast = CurrentSpells[oSpell.amendSpDescrCaster];
	if (!oCast || !oCast.ability) return false;
	var castAbi = isNaN(oCast.ability) && oCast.abilityToUse ? oCast.abilityToUse[0] : oCast.ability;
	var theAbi = AbilityScores.abbreviations[castAbi - 1];
	if (theAbi) {
		var theAbiMod = Number(What(theAbi + " Mod"));
		var newSpellDescr = oSpell.description;
		if (/spell(casting)? (ability )?mod(ifier)?/i.test(newSpellDescr)) { // modifier
			newSpellDescr = newSpellDescr.replace(/\+? ?(my )?spell(casting)? (ability )?mod(ifier)?/i, (theAbiMod >= 0 ? "+" + theAbiMod : theAbiMod) + " (" + theAbi + ")");
		} else if (/spell(casting)? (ability )?check/i.test(newSpellDescr)) { // check
			var theAbiName = AbilityScores.names[castAbi -1];
			// Bonus from Jack of All Trades and/or Remarkable Athlete
			var jackOf = tDoc.getField("Jack of All Trades").isBoxChecked(0) === 1;
			var remAth = tDoc.getField("Remarkable Athlete").isBoxChecked(0) === 1 && ["Str", "Dex", "Con"].indexOf(theAbi) !== -1;
			var profB = Number(How("Proficiency Bonus"));
			theAbiMod += remAth ? Math.ceil(profB/2) : jackOf ? Math.floor(profB/2) : 0;
			newSpellDescr = newSpellDescr.replace(/spell(casting)? (ability )?check/i, theAbiName + " check (" + (theAbiMod >= 0 ? "+" + theAbiMod : theAbiMod) + ")");
		}
		return newSpellDescr !== oSpell.description ? newSpellDescr : false;
	}
}

// call this on validation of the hidden spell remember field, to apply something to the spell line
// "" = reset all the fields; "HideThisLine" = hide all the fields; recognized spell = apply that spell; not recognized spell = don't do anything (assume name change); "setcaptions" or  "setcaptions##Me" = make this a caption line; if followed by "##Me" or "##Kn", change the first line to be either "Me" or "Kn" as the first column, or show or hide the box for checkmark; "___" = put all lines in the fields, making it fillable by hand
function ApplySpell(FldValue, rememberFldName) {
	calcStop();

	var input = FldValue !== undefined ? FldValue.split("##") : event.value.split("##");
	var base = rememberFldName ? rememberFldName : event.target.name;
	var spFlds = ReturnSpellFieldsArray(undefined, undefined, base);

	//make this a header line if the input is "setcaptions"
	if ((/setcaptions/i).test(input[0])) {
		//have a function to create rich text span
		var createSpan = function(inTxt) {
			var toCap = inTxt.substring(0, inTxt.indexOf(" ") === 0 ? 2 : 1)
			// First build up an array of Span objects
			var spans = [{
				text : toCap,
				textSize : 7
			}, {
				text : inTxt.replace(toCap, ""),
				textSize : 5.6
			}];
			return spans;
		}

		//set the headers values
		var HeaderList = ReturnSpellFieldsContentArray(false, (/psionic/i).test(input[0]));
		if (input[1]) HeaderList[0] = input[1].substring(0, (/\(.\)|\d-\d/).test(input[1]) ? 3 : 2).toUpperCase();
		for (var i = 0; i < HeaderList.length; i++) {
			var theFld = tDoc.getField(spFlds[i]);
			if (!typePF) {
				theFld.richText = true;
				theFld.richValue = createSpan(HeaderList[i]);
			} else {
				theFld.value = HeaderList[i];
				//change the font and font size
				theFld.textFont = "ScalaSans-BoldLF";
				theFld.textSize = 5.75;
			}
			theFld.readonly = true;
			theFld.display = display.visible;
		}
		return; //and don't do the rest of this function
	} else if (tDoc.getField(spFlds[2]).readonly) { //if the description field has readonly active, but the value is not "setcaptions", all fields must be reset
		for (var i = 0; i < spFlds.length - 1; i++) {
			Value(spFlds[i], "", "");
			var theFld = tDoc.getField(spFlds[i]);
			if (theFld.richText) {
				theFld.richValue = "";
				theFld.richText = false;
			}
			if (i !== 0) theFld.readonly = false;
			if (typePF) { //reset the font and font size
				theFld.textFont = tDoc.getField("Template.extras.SSfront").textFont;
				theFld.textSize = 6.25;
			}
		}
	}

	// Now test if the fields should be hidden, or revealed
	if ((/hidethisline|setheader|setdivider|setglossary/i).test(input[0])) {
		//reset all the field's values and hide them
		for (var i = 0; i < spFlds.length - 1; i++) {
			Value(spFlds[i], i !== 0 ? "" : "hide", "");
			Hide(spFlds[i]);
		}
		//and don't do the rest of this function if we are here to hide this line
		if ((/hidethisline/i).test(input[0])) return;
	} else if (tDoc.getField(spFlds[1]).display === display.hidden) { //if the name field is hidden, but the value has been removed, show them again
		for (var i = 1; i < spFlds.length - 1; i++) { Show(spFlds[i]); }
	}

	//set the icon of the first field
	var setCheck = function() {
		var okChecks = ["checkbox", "checkedbox", "markedbox", "atwill", "oncelr", "oncesr"];
		var currentCheck = What(spFlds[0]).toLowerCase();
		var input1 = input[1] ? input[1].toLowerCase() : "";
		if (!input1 || okChecks.indexOf(input1) === -1) {
			Value(spFlds[0], input1 ? input1.toUpperCase().substring(0, (/\(.\)|\d-\d/).test(input1) ? 3 : 2) : "");
		} else if (input1 !== currentCheck && okChecks.indexOf(input1) !== -1 && (input1.substring(0, 4) !== currentCheck.substring(0, 4) || okChecks.indexOf(input1) > 1)) {
			Value(spFlds[0], input1);
		}
	}

	if (input[0] === "") { //reset all the fields
		//if going from a spell to nothing, reset all the field's values and tooltips, otherwise
		// only reset the other fields, but apply any checkbox/firstcolumn thing
		var resetAll = What(spFlds[1]) !== "";
		for (var i = resetAll ? 0 : 2; i < spFlds.length - 1; i++) {
			Value(spFlds[i], "", "");
		};
		if (!resetAll) setCheck();
	} else if ((/setheader/i).test(input[0])) {
		var theClass = input[1] && CurrentSpells[input[1].toLowerCase()] ? input[1].toLowerCase() : "";
		var theSuffix = input[2] !== undefined && !isNaN(parseFloat(input[2])) ? parseFloat(input[2]) : false;
		var hidePrepared = input.indexOf("nopreps") !== -1;
		if (theSuffix !== false ) {
			SetSpellSheetElement(base, "header", theSuffix, theClass, hidePrepared, input[3], input[4], input[5], input[6], input[7]);
		}
	} else if ((/setdivider/i).test(input[0])) {
		var theLevel = input[1] !== undefined && !isNaN(parseFloat(input[1])) ? parseFloat(input[1]) : false;
		var theSuffix = input[2] !== undefined && !isNaN(parseFloat(input[2])) ? parseFloat(input[2]) : false;
		if (theLevel !== false && theSuffix !== false) {
			SetSpellSheetElement(base, "divider", theSuffix, theLevel, false, input[3]);
		}
	} else if ((/setglossary/i).test(input[0])) {
		SetSpellSheetElement(base, "glossary", "");
	} else if (input[0].indexOf("_") === 0) { //make all the fields lines
		//reset all the field's values and tooltips to the lines defined in the array
		var UnderscoreList = ReturnSpellFieldsContentArray(true);
		for (var i = 0; i < UnderscoreList.length; i++) {
			Value(spFlds[i], UnderscoreList[i], i === 0 ? undefined : "");
		}
		setCheck();
	} else {
		var aCast = input[2] && CurrentSpells[input[2]] ? CurrentSpells[input[2]] : "";
		var theSpl = ParseSpell(input[0], aCast ? input[2] : false);
		if (theSpl !== "") { // apply the found spell

			// Get the spell object with respect to the current caster and custom changes
			var aSpell = GetSpellObject(theSpl, input[2], input[1], input[3], false);

			// set the spell name (if it wasn't provided as part of this function and not the same as the remember field)
			// if the name used is a shortened version, set the full name as a tooltip
			var NameFld = base.replace("remember", "name");
			var NameFldValue = What(NameFld);
			var NameFldRitual = NameFldValue.indexOf("(R)") !== -1;
			if (input[0] !== NameFldValue || (aSpell.ritual && !NameFldRitual)) {
				var spName = getSpNm(theSpl, true, aSpell);
				spName[0] += aSpell.ritual ? " (R)" : "";
				Value(NameFld, spName[0], spName[1]);
			}

			//make the tooltip for the description field
			var spTooltip = aSpell.tooltip ? aSpell.tooltip : "";

			//set what an empty cell should look like
			var emptyCell = CurrentCasters.emptyFields ? "" : "\u2014";

			//set the spell description and the tooltip with the full description
			Value(base.replace("remember", "description"), aSpell.description, spTooltip);

			//set the spell save
			Value(base.replace("remember", "save"), aSpell.save ? aSpell.save : emptyCell);

			//set the spell school
			Value(base.replace("remember", "school"), aSpell.school ? aSpell.school : emptyCell);

			//set the spell time
			Value(base.replace("remember", "time"), aSpell.time ? aSpell.time : emptyCell, aSpell.timeFull ? aSpell.timeFull : "");

			//set the spell range
			var spellRange = aSpell.range ? aSpell.range : emptyCell;
			if (aSpell.range && What("Unit System") === "metric") spellRange = fixSpellRangeOverflow(spellRange);
			Value(base.replace("remember", "range"), spellRange);

			//set the spell components
			Value(base.replace("remember", "components"), aSpell.components ? aSpell.components : emptyCell, aSpell.compMaterial ? aSpell.compMaterial : "");

			//set the spell duration
			Value(base.replace("remember", "duration"), aSpell.duration ? aSpell.duration : emptyCell);

			//set the spell book name and page
			var parseSrc = parseSource(aSpell.source);
			// Only use the first source, as there is no more space
			var spBook = parseSrc ? parseSrc[0][0] : "";
			var spBookAbbr = spBook && SourceList[spBook].abbreviationSpellsheet ? SourceList[spBook].abbreviationSpellsheet : spBook.substr(0,1);
			// Get the page number, unless it is Unearthed Arcana, then get the abbreviation (the first three characters after the colon)
			var spPage = spBook && spBook !== "UA:TMC" && SourceList[spBook].group === "Unearthed Arcana" ? spBook.replace("UA:", "").substr(0,3) : parseSrc && parseSrc[0][1] ? parseSrc[0][1] : "";
			// Add them to the sheet
			Value(base.replace("remember", "book"), spBookAbbr, aSpell.tooltipSource);
			Value(base.replace("remember", "page"), spPage, aSpell.tooltipSource);

			input[1] = aSpell.firstCol; // use the firstCol, as the CurrentEval could have changed it
		} else { // leave the content, but remove all the tooltips as this isn't the same spell anymore
			for (var i = 1; i < spFlds.length - 1; i++) {
				AddTooltip(spFlds[i], "", "");
			};
		}
		setCheck();
	}
}

//on blur, put the value in the remember field, location one (on field blur)
function SetSpell(FldValue, nameFldName) {
	if (event.target && event.target.richText) {
		tDoc.getField(event.target.name).richValue = "";
		tDoc.getField(event.target.name).richText = false;
	} //first disable any rich text value if it was set
	var input = FldValue ? FldValue : What(event.target.name);
	var base = nameFldName ? nameFldName : event.target.name;
	var remFld = base.replace("name", "remember");
	if (input.toLowerCase() === "" || (/setcaptions/).test(input) || input.indexOf("##") !== -1) { //if the name field has a ## in it, assume we need to replace everything in the remember field
		var toUseValue = input;
	} else { //otherwise only replace the first entry in the remember field
		var remFldValue = What(remFld).split("##");
		remFldValue[0] = input;
		var toUseValue = remFldValue.join("##");
	}
	Value(remFld, toUseValue);
}

//set the text on the spell divider (the level of the spell)
function SetSpellDividerName(field, level) {
	var dName = level > 11 ? "Spells (1-9th Level)" : spellLevelList[level].replace('-l', ' L');
	if (!typePF) {
		var txts = dName.split(/\d+/);
		var nums = !/\d/.test(dName) ? [] : dName.match(/\d+/g);
		var spans = [];
		for (var i = 0; i < txts.length; i++) {
			spans.push({ text : txts[i]});
			if (i < nums.length) {
				spans.push({ text : nums[i], fontFamily : ["Pterra"], textSize : 13 });
			}
		}
		tDoc.getField(field).richValue = spans;
	} else {
		Value(field, dName);
	}
}

//move a set of fields (type) to the y-coordinate of a given field (target)
//the first of the fields in the moveArray will have its upper-Y be the same as the target
//rect is an array with the order: upper-left x, upper-left y, lower-right x and lower-right y
//type[0] is "header" or "divider"; type[1] is the number on the page
// header is 4 high, divider is 2 high
// if type[0] is "header", caster is the name of the CurrentSpells entry
// if type[0] is "divider", caster is the level of the divider head to set
function SetSpellSheetElement(target, type, suffix, caster, hidePrepared, forceTxt, forceAbi, forceBTprepare, forceBTattack, forceBTdc) {
	var prefix = target.substring(0, target.indexOf("spells."));
	if (!suffix && suffix !== 0 && type !== "glossary") { //if suffix is false, it means we have to find the first that is not visible
		suffix = findNextHeaderDivider(prefix, type);
		if (suffix === false) return; //no field was found to move, so stop this function without doing anything
	}
	var headerArray = [
		prefix + "spellshead.Image.Header.Left." + suffix, //0
		prefix + "spellshead.Text.header." + suffix, //1
		prefix + "spellshead.class." + suffix, //2
		prefix + "spellshead.ability." + suffix, //3
		prefix + "spellshead.prepare." + suffix, //4
		prefix + "spellshead.attack." + suffix, //5
		prefix + "spellshead.dc." + suffix, //6
		prefix + "BlueText.spellshead.prepare." + suffix, //7
		prefix + "BlueText.spellshead.attack." + suffix, //8
		prefix + "BlueText.spellshead.dc." + suffix, //9
	];
	if (!typePF) {
		headerArray = headerArray.concat([
			prefix + "spellshead.Image.Dragonheadshadow." + suffix, //10
			prefix + "spellshead.Image.Dragonhead." + suffix, //11
			prefix + "spellshead.Text.prepare." + suffix, //12
			prefix + "spellshead.Box.prepare." + suffix, //13
			prefix + "spellshead.Text.attack." + suffix, //14
			prefix + "spellshead.Box.attack." + suffix, //15
			prefix + "spellshead.Text.dc." + suffix, //16
			prefix + "spellshead.Box.dc." + suffix, //17
			prefix + "spellshead.Text.ability." + suffix, //18
			prefix + "spellshead.Box.ability." + suffix, //19
		]);
		var dividerArray = [
			prefix + "spellsdiv.Text." + suffix, //0
			prefix + "spellsdiv.Image.Dragonhead." + suffix, //1
			prefix + "spellsdiv.Image.Divider." + suffix, //2
			prefix + "spellsdiv.Image.DividerFlip." + suffix, //3
		];
	} else {
		headerArray = headerArray.concat([
			prefix + "spellshead.Image.prepare." + suffix, //10
		]);
		var dividerArray = [
			prefix + "spellsdiv.Image." + suffix, //0
			prefix + "spellsdiv.Text." + suffix, //1
		];
	}
	var glossaryArray = [
		prefix + "spellsgloss.Image" + suffix, //0
	];

	switch(type) {
	 case "header" :
		var moveArray = headerArray;
		var maxFld = 3;
		break;
	 case "divider" :
		var moveArray = dividerArray;
		var maxFld = 1;
		break;
	 case "glossary" :
		var moveArray = glossaryArray;
		var maxFld = 11;
		break;
	}

	//define functions for returning and setting the coordinates of a field
	var isRect = function(Fld) {
		return tDoc.getField(Fld).rect;
	}
	var setRect = function(Fld, Rct) {
		tDoc.getField(Fld).rect = Rct;
	}

	var tRect = isRect(target); // get the location of the target field on the sheet
	var sRect = isRect(moveArray[0]); // get the location of the first field that has to be moved
	var dY = tRect[1] - sRect[1]; // see how much the fields have to be moved by comparing upper-left y coordinates

	if (dY === 0 && isDisplay(moveArray[0]) === 0) return; // nothing to move, so nothing to do

	calcStop();
	//now move each of the fields in the moveArray by dY
	for (var m = 0; m < moveArray.length; m++) {
		if (suffix === 0 && prefix.indexOf(".SSfront.") !== -1) { //don't move the top row of the first page, they are already where they should be
		} else {
			var gRect = isRect(moveArray[m]); //get the coordinates
			gRect[1] += dY; //add dY to the upper-left y
			gRect[3] += dY; //add dY to the lower-righ y
			setRect(moveArray[m], gRect); //set the new coordinates
		}
		if (CurrentVars.bluetxt && moveArray[m].indexOf("BlueText") !== -1) {
			DontPrint(moveArray[m]);
		} else if (moveArray[m].indexOf("BlueText") === -1 && moveArray[m].indexOf(".class.") === -1) {
			Show(moveArray[m]);
		} else {
			Hide(moveArray[m]);
		}
	}

	//now hide the fields that are overlayed
	if (suffix === 0 && prefix.indexOf(".SSfront.") !== -1) { //don't do this for the top row of the first page, they are already where they should be
	} else {
		var hideFldNmbr = Number(target.replace(/.+?\.(\d+)$/, "$1"));
		maxFld += hideFldNmbr;
		for (var h = (hideFldNmbr + 1); h <= maxFld; h++) {
			Value(target.replace("." + hideFldNmbr, "." + h), "hidethisline");
		}
	}

	//now set the values of the fields
	if (type === "divider") {
		var divTextFld = dividerArray[!typePF ? 0 : 1]
		//set the name of the divider
		SetSpellDividerName(divTextFld, caster);
		if (forceTxt) Value(divTextFld, forceTxt); // override the text of the divider
		//set the submitName to remember the line where this divider is at
		var submitNameFld = divTextFld;
	} else if (type === "header") {
		var testLength = !typePF ? 10 : 36;

		if (caster && CurrentSpells[caster]) {
			var spCast = CurrentSpells[caster];
			var isPsionics = spCast.factor && (/psionic/i).test(spCast.factor[1]);
			var casterName = forceTxt ? forceTxt : spCast.name.replace(/book of /i, "").replace(/ (\(|\[).+?(\)|\])/g, "");
			if (!forceTxt) casterName = casterName + (casterName.length >= testLength || (/\b(spells|powers|psionics)\b/i).test(casterName) ? "" : isPsionics ? " Psionics" : " Spells");
			//set the variable to true to later hide the prepared fields if not concerning a list or book
			if (!spCast.level || spCast.typeSp === "known" || !spCast.known || !spCast.known.prepared || spCast.typeList === 3) {
				hidePrepared = true;
			}
			if (What(headerArray[2]) !== caster) { //if the header was not already set to the class
				Value(headerArray[1], casterName); //set the name of the header
				Value(headerArray[2], caster); //set the name of the class
				if (!spCast.abilityToUse) spCast.abilityToUse = getSpellcastingAbility(caster);
				PickDropdown(headerArray[3], spCast.abilityToUse[0]); //set the ability score to use
				AddTooltip(headerArray[3], undefined, spCast.fixedDC || spCast.fixedSpAttack ? "fixed" : ""); //set fixed DC to use, if any
				if (spCast.blueTxt) { //set the remembered bluetext values, if at all present
					Value(headerArray[7], spCast.blueTxt.prep ? spCast.blueTxt.prep : 0); //set the bluetext for preparing
					Value(headerArray[8], spCast.blueTxt.atk ? spCast.blueTxt.atk : 0); //set the bluetext for attack
					Value(headerArray[9], spCast.blueTxt.dc ? spCast.blueTxt.dc : 0); //set the bluetext for dc
				};
			} else if (What(headerArray[1]) === "") {
				Value(headerArray[1], casterName);
			}
		} else {
			//if no class is known just reset all but the class name text
			tDoc.resetForm(headerArray);
			var casterName = " ";
			if (caster) {
				var casterObj = ClassList[caster] ? ClassList[caster] : ClassSubList[caster] ? ClassSubList[caster] : false;
				var isPsionics = casterObj && casterObj.spellcastingFactor && (/psionic/i).test(casterObj.spellcastingFactor);
				casterName = !casterObj ? caster.capitalize() : (casterObj.fullname ? casterObj.fullname : casterObj.subname ? casterObj.subname : casterObj.name);
				casterName = casterName.replace(/book of | (\(|\[).+?(\)|\])/ig, "").replace(/ (\(|\[).+?(\)|\])/g, "");
				casterName = casterName + (casterName.length >= testLength || (/\b(spells|powers|psionics)\b/i).test(casterName) ? "" : isPsionics ? " Psionics" : " Spells");
				if (casterObj) {
					PickDropdown(headerArray[3], casterObj.abilitySave);
				}
			}
			Value(headerArray[1], forceTxt ? forceTxt : casterName);
			if (forceAbi && !isNaN(forceAbi)) PickDropdown(headerArray[3], forceAbi);
			if (forceBTprepare && !isNaN(forceBTprepare)) PickDropdown(headerArray[7], forceBTprepare);
			if (forceBTattack && !isNaN(forceBTattack)) PickDropdown(headerArray[8], forceBTattack);
			if (forceBTdc && !isNaN(forceBTdc)) PickDropdown(headerArray[9], forceBTdc);
		}

		//hide the prepared fields
		if (hidePrepared) {
			Hide(headerArray[4]);
			Hide(headerArray[7]);
			if (!typePF) {
				Hide(headerArray[4]);
				Hide(headerArray[7]);
				Hide(headerArray[12]);
				Hide(headerArray[13]);
			} else {
				Hide(headerArray[10]);
			}
		}

		//make the ability score drop-down box editable if this is a complete spell sheet; also add a tooltip
		//also make the three 'calculated' fields editable
		if (tDoc.info.SpellsOnly) {
			tDoc.getField(headerArray[3]).editable = true;
			AddTooltip(headerArray[3], "You can enter anything you want into this field, you are not limited by the drop-down box, that is just there for easy reference.");
			tDoc.getField(headerArray[4]).readonly = false;
			tDoc.getField(headerArray[5]).readonly = false;
			tDoc.getField(headerArray[6]).readonly = false;
		}

		//set the submitName to remember the line where this header is at
		var submitNameFld = headerArray[1];
	} else if (type === "glossary") {
		//set the submitName to remember the line where this header is at
		var submitNameFld = glossaryArray[0];
	}
	//set the submitName to remember the line where this is at
	tDoc.getField(submitNameFld).submitName = target;
}

//calculate the number of spells to memorize, attack modifier, and DC (field calculation)
function CalcSpellScores() {
	if (tDoc.info.SpellsOnly) return;
	var fldType = event.target.name.replace(/.*spellshead\.(\w+).*/, "$1");
	var Fld = event.target.name.replace("spellshead." + fldType, "spellshead.DINGDONG");
	var modFldName = Fld.replace("DINGDONG", "ability");
	var modFld = What(modFldName);
	var theMod = Number(What(modFld));
	var aClass = What(Fld.replace("DINGDONG", "class")); //find the associated class
	var cSpells = aClass && CurrentSpells[aClass] ? CurrentSpells[aClass] : false;
	var fixedDC = cSpells && !isNaN(cSpells.fixedDC) ? Number(cSpells.fixedDC) : false;
	var fixedSpAttack = cSpells && !isNaN(cSpells.fixedSpAttack) ? Number(cSpells.fixedSpAttack) : false;
	var modIpvDC = tDoc.getField("BlueText.Players Make All Rolls").isBoxChecked(0);

	var theResult = {
		dc : 0,
		attack : 0,
		prepare : 0
	};

	var setResults = function(showTheResult) {
		if (cSpells) cSpells.calcSpellScores = {};
		for (var aType in theResult) {
			var theR = showTheResult ? theResult[aType] : "", numTot;
			if (showTheResult && (aType !== "prepare" || isPrepareVis)) {
				// add the modifier field value
				theR += EvalBonus(What(Fld.replace("spellshead.DINGDONG", "BlueText.spellshead." + aType)), true);
				numTot = theR;
				switch (aType) {
					case "dc":
					if (modIpvDC) {
						theR -= 8;
					} else {
						if (typePF) theR = "DC " + theR;
						break;
					}
					case "attack":
					if (theR >= 0) theR = "+" + theR;
				}
			}
			if (aType == fldType) {
				event.value = theR;
			} else {
				Value(Fld.replace("DINGDONG", aType), theR);
			}
			if (cSpells) cSpells.calcSpellScores[aType] = numTot;
		}
	}

	if (modFld == "nothing" && !fixedDC) {
		setResults(false);
		return;
	}

	var profBonus = Number(What("Proficiency Bonus"));
	var profBonusFixed = Number(How("Proficiency Bonus"));
	// fixed DC of 8 means the prof bonus still needs to be added
	if (fixedDC === 8) fixedDC += profBonus;
	// the DC
	theResult.dc = fixedDC ? fixedDC : fixedSpAttack ? fixedSpAttack + 8 : profBonusFixed + theMod + 8;
	// the spell attack
	theResult.attack = fixedSpAttack ? fixedSpAttack : fixedDC ? fixedDC - 8 : profBonus + theMod;
	// the number of prepared spells
	var isPrepareVis = isDisplay(Fld.replace("DINGDONG", "prepare")) == display.visible;
	if (isPrepareVis) {
		theResult.prepare = theMod;
		if (cSpells && cSpells.factor && cSpells.factor[0]) {
			theResult.prepare += Math.floor(cSpells.level / cSpells.factor[0]);
		} else if (cSpells && cSpells.level) {
			theResult.prepare += cSpells.level;
		}
		theResult.prepare = Math.max(1, theResult.prepare);
	}

	// do custom calculations
	if (CurrentEvals.spellCalc) {
		var abiScoreNo = tDoc.getField(modFldName).currentValueIndices;
		var classArray = cSpells ? [aClass] : [];
		if (cSpells && cSpells.ability && isNaN(cSpells.ability) && CurrentSpells[cSpells.ability]) classArray.push(cSpells.ability);

		for (var i = 0; i < CurrentEvals.spellCalcOrder.length; i++) {
			var evalName = CurrentEvals.spellCalcOrder[i][1];
			var evalThing = CurrentEvals.spellCalc[evalName];
			if (!evalThing || typeof evalThing !== 'function') continue;
			try {
				for (var aType in theResult) {
					if ((fixedDC && aType != "prepare") || (aType == "prepare" && !isPrepareVis)) continue;
					var addSpellNo = evalThing(aType, classArray, abiScoreNo);
					if (!isNaN(addSpellNo)) theResult[aType] += Number(addSpellNo);
				}
			} catch (error) {
				var eText = "The custom spell attack/DC (spellCalc) script from '" + evalName + "' produced an error! It will be removed from the sheet for now, but please contact the author of the feature to have this issue corrected:\n " + error;
				for (var e in error) eText += "\n " + e + ": " + error[e];
				console.println(eText);
				console.show();
				delete CurrentEvals.spellCalc[evalName];
				CurrentEvals.spellCalcOrder.splice(i, 1);
				i--;
			}
		}
	}

	// finally set the results to the field
	setResults(true);
}

//set the blueText field bonus to the global CurrentSpells object for spells to memorize, attack modifier, and DC (field blur)
function SetSpellBluetext(aClass, type, newValue) {
	// get what type we are changing
	type = type ? type : event.target.name.replace(/.*spellshead\.(\w+).*/, "$1");
	type = type === "dc" ? "dc" : type === "attack" || type === "atk" ? "atk" : "prep";
	var typeFull = type === "dc" ? "dc" : type === "atk" ? "attack" : "prepare";
	// find the associated class
	aClass = aClass ? aClass : What(event.target.name.replace("BlueText.spellshead." + typeFull, "spellshead.class"));
	// get the value we are changing it to
	newValue = newValue !== undefined ? newValue : event.value;

	// set the associated bluetext variable
	var cSpells = CurrentSpells[aClass];
	if (!cSpells) {
		// Not a recognized class, so save the change to the remember field
		calcStop();
		var remFld = How(event.target.name.replace("BlueText.spellshead." + typeFull, "spellshead.Text.header"));
		if (!tDoc.getField(remFld)) return;
		var remFldValue = What(remFld).split("##");
		remFldValue[type === "prep" ? 5 : type === "atk" ? 6 : 7] = newValue;
		Value(remFld, remFldValue.join("##"));
		return;
	} else if (!cSpells.blueTxt) {
		cSpells.blueTxt = {
			prep : 0,
			atk : 0,
			dc : 0
		};
	};
	// now see if something changed, otherwise don't continue
	if (cSpells.blueTxt[type] == newValue) return;

	// set the new value to the global variable
	cSpells.blueTxt[type] = newValue;

	// stop calculation
	calcStop();

	// now update any other header on the spell sheets for the same class
	var prefixArray = What("Template.extras.SSmore").split(",");
	prefixArray[0] = What("Template.extras.SSfront").split(",")[1];
	if (!prefixArray[0]) prefixArray.shift();
	var currentField = event.target ? event.target.name : "";
	for (var i = 0; i < prefixArray.length; i++) {
		var prefix = prefixArray[i];
		for (var s = 0; s <= 3; s++) {
			var fld = prefix + "spellshead.class." + s;
			if (fld != currentField && What(fld) == aClass) {
				Value(prefix + "BlueText.spellshead." + typeFull + "." + s, newValue);
			}
		}
	}

	// save the global variable to the field
	SetStringifieds("spells");
}

//change the icon of the checkbox based on the value of this field (field validation)
function SetSpellCheckbox() {
	var type = event.target.name.indexOf("checkbox") !== -1 ? "checkbox" : "check";

	if (type === "check") {
		var theEV = event.value.toLowerCase();
		if (event.target.submitName === theEV) return; //the newly added value is the same as the previous value, so there is nothing to do
		var theIcon = false;
		var theCheckBox = event.target.name.replace("check", "checkbox");
		var showThis = "Hide";
		var showBox = "Show";
		var insideColor = color.transparent;
		var borderColor = color.transparent;
		var theCaption = "";
		var borderWidth = 0;
		var borderType = border.s;
		switch(theEV) {
		 case "checkedbox" :
			theIcon = tDoc.getField("SaveIMG.Spells.Checkedbox").buttonGetIcon();
			break;
		 case "markedbox" :
			theIcon = tDoc.getField("SaveIMG.Spells.Markedbox").buttonGetIcon();
			break;
		 case "checkbox" :
			theIcon = tDoc.getField("SaveIMG.Spells.Uncheckedbox").buttonGetIcon();
			break;
		 case "atwill" :
			theIcon = tDoc.getField("SaveIMG.Spells.AtWill").buttonGetIcon();
			break;
		 case "oncelr" :
			theIcon = tDoc.getField("SaveIMG.Spells.1xLR").buttonGetIcon();
			break;
		 case "oncesr" :
			theIcon = tDoc.getField("SaveIMG.Spells.1xSR").buttonGetIcon();
			break;
		 case "hide" :
			showBox = "Hide";
			showThis = "Hide";
			break;
		 case "" : //make it a button that we can use to call a menu
			insideColor = !typePF ? ColorList[What("Color.Theme")].CMYK : ["RGB", 0.659, 0.659, 0.659];
			borderColor = color.white;
			theCaption = ">";
			borderWidth = !typePF ? 2 : 1;
			borderType = border.b;
		 default :
			theIcon = tDoc.getField("SaveIMG.EmptyIcon").buttonGetIcon();
			showBox = "DontPrint";
			showThis = event.value !== "" ? "Show" : "Hide";
		}
		event.target.submitName = theEV;
		tDoc[showThis](event.target.name); //show or hide the "check" field
		tDoc[showBox](theCheckBox); //show or hide the "checkbox" field
		if (theIcon) tDoc.getField(theCheckBox).buttonSetIcon(theIcon);
		tDoc.getField(theCheckBox).fillColor = insideColor;
		tDoc.getField(theCheckBox).lineWidth = borderWidth;
		if (typePF) {
			tDoc.getField(theCheckBox).strokeColor = borderColor;
			for (var L = 0; L <= 2; L++) {
				tDoc.getField(theCheckBox).buttonSetCaption(theCaption, L);
			}
			tDoc.getField(theCheckBox).borderStyle = borderType;
		}
	} else if (type === "checkbox") {
		if (event.modifier || event.shift) { //if Shift/Ctrl/Cmd was pressed while clicking
			MakeSpellLineMenu_SpellLineOptions();
		} else {
			var theCheck = event.target.name.replace("checkbox", "check");
			switch(What(theCheck).toLowerCase()) {
			 case "checkedbox" :
				Value(theCheck, "checkbox");
				break;
			 case "checkbox" :
				Value(theCheck, "checkedbox");
				break;
			 default :
				MakeSpellLineMenu_SpellLineOptions();
			}
		}
	}
}

//generate a list of all the spells; if toDisplay = true it means this is meant for the drop-down boxes
function CreateSpellList(inputObject, toDisplay, extraArray, returnOrdered, objName, objType, returnRef) {
	if (typeof inputObject === "string") {
		if (inputObject != "warlock" && ClassList[inputObject] && ClassList[inputObject].spellcastingList) {
			inputObject = ClassList[inputObject].spellcastingList;
		} else if (ClassSubList[inputObject] && ClassSubList[inputObject].spellcastingList) {
			inputObject = ClassSubList[inputObject].spellcastingList;
		} else {
			inputObject = {class : inputObject};
		};
	}
	inputObject = newObj(inputObject);
	if (!inputObject.extraspells) inputObject.extraspells = [];
	inputObject.psionic = inputObject.psionic === undefined ? false : typeof inputObject.psionic === "string" ? inputObject.psionic.toLowerCase() : inputObject.psionic;
	if (extraArray) inputObject.extraspells = inputObject.extraspells.concat(extraArray);

	//first run the custom code injected by a feature
	if (CurrentEvals.spellList && objName !== undefined && objType !== undefined) {
		for (var i = 0; i < CurrentEvals.spellListOrder.length; i++) {
			var evalName = CurrentEvals.spellListOrder[i][1];
			var evalThing = CurrentEvals.spellList[evalName];
			if (!evalThing || typeof evalThing !== 'function') continue;
			try {
				evalThing(inputObject, objName, objType);
			} catch (error) {
				var eText = "The custom calcChange.spellList function '" + evalName + "' produced an error! It will be removed from the sheet for now, but please contact the author of the feature to have this issue corrected:\n " + error;
				for (var e in error) eText += "\n " + e + ": " + error[e];
				console.println(eText);
				console.show();
				delete CurrentEvals.spellList[evalName];
				CurrentEvals.spellListOrder.splice(i, 1);
				i--;
			}
		}
	}

	//define some arrays
	var returnArray = [];
	var spByLvl = {sp0 : [], sp1 : [], sp2 : [], sp3 : [], sp4 : [], sp5 : [], sp6 : [], sp7 : [], sp8 : [], sp9 : [], ps0 : [], ps1: []};
	var refspObj = {}, refDisplObj = {};

	var removeSp = function(inSp) {
		var rSpell = SpellsList[inSp];
		var rSpLevel = (!rSpell.psionic ? "sp" : "ps") + rSpell.level;
		var rSpName = getSpNm(inSp);
		if (toDisplay) {
			spByLvl[rSpLevel].splice(spByLvl[rSpLevel].indexOf(rSpName + (rSpell.ritual ? " (R)" : "")), 1);
		} else {
			if (returnOrdered) {
				spByLvl[rSpLevel].splice(spByLvl[rSpLevel].indexOf(rSpName), 1);
			} else {
				returnArray.splice(returnArray.indexOf(inSp), 1);
			}
		};
		delete refspObj[rSpName];
	};

	//now go through all the spells in the list and see if they agree with the criteria
	for (var key in SpellsList) {
		var isExtraSpell = inputObject.extraspells.indexOf(key) !== -1;
		var aSpell = SpellsList[key];
		//first test if the spell's source is on the list of sources to use
		var addSp = !testSource(key, aSpell, "spellsExcl");
		//now test if the spell meets all the criteria set in the inputObject
		if (addSp && inputObject.spells && !isExtraSpell) {
			addSp = inputObject.spells.indexOf(key) !== -1;
		}
		if (addSp && inputObject.notspells) {
			addSp = inputObject.notspells.indexOf(key) === -1;
		}
		if (addSp && inputObject.class && !isExtraSpell) {
			if (!aSpell.classes) {
				continue;
			} else if (isArray(inputObject.class)) {
				addSp = inputObject.class.some(function (v) {
					return v === "any" || aSpell.classes.indexOf(v) !== -1;
				});
			} else {
				addSp = inputObject.class === "any" || aSpell.classes.indexOf(inputObject.class) !== -1;
			}
		}
		if (addSp && inputObject.level) {
			addSp = aSpell.level >= inputObject.level[0] && aSpell.level <= inputObject.level[1];
		}
		if (addSp && inputObject.school && !(inputObject.level && (inputObject.level[1] > 0 || inputObject.level[2]) && aSpell.level === 0) && !isExtraSpell) {
			//only check for school if not a cantrip and not only looking for cantrips
			addSp = inputObject.school.indexOf(aSpell.school) !== -1;
		}
		if (addSp && inputObject.attackOnly !== undefined) {
			var isAttackSpell = (/^(booming blade|green-flame blade)$/).test(key) || (/spell attack/i).test(aSpell.description + aSpell.descriptionFull);
			addSp = isAttackSpell == inputObject.attackOnly;
		}
		if (addSp && inputObject.ritual !== undefined) {
			addSp = aSpell.ritual ? aSpell.ritual == inputObject.ritual : !inputObject.ritual;
		}
		if (addSp && inputObject.psionic !== "all") {
			addSp = aSpell.psionic ? aSpell.psionic == inputObject.psionic : !inputObject.psionic;
		}
		if (addSp) {
			var SpPs = !aSpell.psionic ? "sp" : "ps";
			var spName = getSpNm(key);
			if (refspObj[spName]) { // if another spell with the same name has been added already, see which one the sheet will use
				var testName = ParseSpell(spName, !inputObject.class ? false : isArray(inputObject.class) ? inputObject.class : [inputObject.class]);
				if (refspObj[spName] == testName) {
					continue;
				} else if (testName == key) {
					removeSp(refspObj[spName]);
				} else { // doesn't match any spell yet come across, so just delete it
					removeSp(refspObj[spName]);
					continue;
				};
			};
			refspObj[spName] = key;
			if (toDisplay) {
				if (aSpell.ritual) spName += " (R)";
				refDisplObj[spName] = key;
				spByLvl[SpPs + aSpell.level].push(spName);
			} else {
				if (returnOrdered) {
					spByLvl[SpPs + aSpell.level].push(spName);
				} else {
					returnArray.push(key);
				}
			}
		}
	}

	if (toDisplay) {
		var count = 0;
		//now cycle through all the spell level arrays and add them, if not empty, to the returnArray
		for (var i = 0; i <= 11; i++) {
			var spA = spByLvl[i <= 9 ? "sp" + i : "ps" + (i - 10)];
			//if the array has more than 0 entries, make it ready for the drop-down boxes in the dialog
			if (spA.length > 0) {
				spA.sort();
				if (returnOrdered) {
					spA.unshift("");
					returnArray.push(spA);
				} else {
					spA.unshift("\u2002", ">> " + (i <= 9 ? '' : 'Psionic ') + spellLevelList[i] + " <<");
					returnArray = returnArray.concat(spA);
				}
				count += 1;
			};
		};
		if (count === 1 && !returnOrdered) returnArray.splice(1, 1); //if only one level of spells turned up, we don't need the introductory header
	} else if (returnOrdered) {
		//now cycle through all the spell level arrays and add them, if not empty, to the returnArray as an array
		for (var i = 0; i <= 11; i++) {
			var spA = spByLvl[i <= 9 ? "sp" + i : "ps" + (i - 10)];
			spA.sort();
			for (var s = 0; s < spA.length; s++) {
				spA[s] = refspObj[spA[s]];
			};
			returnArray.push(spA);
		};
	};

	return returnRef && (returnOrdered || toDisplay) ? [returnArray, toDisplay ? refDisplObj : refspObj] : returnArray;
};

//generate a number of zero-width characterSet
function GetZeroWidths(number) {
	var toAdd = "";
	for (var z = 0; z <= number; z++) {
		toAdd += "\u200B"; //add a zero-width space
	}
	//now replace every 20 of these things with one zero-width joiner (\u200C)
	toAdd = toAdd.replace(/\u200B{20}/g, "\u200C");
	return toAdd;
}

//remove all the no space characters from the string
function RemoveZeroWidths(input) {
	return input.replace(/[\u200A\u200C\u200B]+/ig, "");
}

//create an object of a spell list array to be used in the dialog
function CreateSpellObject(inputArray) {
	var spArr = inputArray[0];
	var refObj = inputArray[1];
	var reObj = {};
	var reRefObj = {};
	var reRefInverse = {};

	for (var i = 0; i < spArr.length; i++) {
		var theObject = GetZeroWidths(i) + spArr[i];
		reObj[theObject] = (i + 1) * -1;
		if (refObj[spArr[i]]) {
			reRefObj[theObject] = refObj[spArr[i]];
			reRefInverse[refObj[spArr[i]]] = theObject;
		}
	}
	return [reObj, reRefObj, reRefInverse];
}

// Find the spell that was typed in the list of the drop-down and select the right one
function manualInputToSpellObj(dialog, id) {
	var aResult = dialog.store()[id];
	var idPrime = id.substr(0, 2);
	var idIdx = Number(id.substr(2)) - 1;
	var listObj = this["list" + idPrime];
	if (idPrime === "Bo") listObj = listObj[idIdx];
	if (listObj[0][aResult]) return listObj[1][aResult] ? true : false; // already something selected from the dropdown
	var iResult = clean(RemoveZeroWidths(aResult.replace(/ ?\(.+\)/i, "")), false, true).toLowerCase();
	if (!iResult) return; // nothing to set
	var nListObj = newObj(listObj[0]); // Make sure we're not changing a global object
	var iOptions = Object.keys(listObj[2]);
	var parseInput = ParseSpell(iResult, false, iOptions);
	var fndResult;
	var emptyBox = "\u200B\u2002";
	var acroDumb = "\n\nThink this pop-up is unnecessary? MPMB agrees with you, but Acrobat requires it, funny stuff...";

	var displaySpName = function(sObj) {
		var name = getSpNm(false, false, sObj) + (sObj.ritual ? " (R)" : "");
		if (sObj.level !== undefined && spellLevelList[sObj.level]) {
			name += " [" + (sObj.psionic ? "psionic " : "") +
					spellLevelList[sObj.level + (sObj.psionic ? 9 : 0)].toLowerCase().replace(/s\b/, '') +
					(sObj.level ? " spell" : "") + "]";
		}
		return name;
	}

	if (parseInput || (iResult && iResult.length >= 3)) {
		// Display a dialog with possible matches, if any
		var partialMatch = { names : [], refKeys : {} };
		for (var i = 0; i < iOptions.length; i++) {
			var aSpell = SpellsList[iOptions[i]];
			var aSpNames = aSpell.name + (aSpell.nameAlt ? "_" + aSpell.nameAlt : "") + (aSpell.nameShort ? "_" + aSpell.nameShort : "");
			if (aSpNames.toLowerCase().indexOf(iResult) !== -1) {
				var aSpellNm = displaySpName(aSpell);
				partialMatch.names.push(aSpellNm);
				partialMatch.refKeys[aSpellNm] = iOptions[i];
			}
		}
		partialMatch.names.sort();
		if (parseInput) {
			var pSpellNm = displaySpName(SpellsList[parseInput]);
			if (partialMatch.names.indexOf(pSpellNm) === -1) {
				partialMatch.names.unshift(pSpellNm);
				partialMatch.refKeys[pSpellNm] = parseInput;
			}
		}
		if (partialMatch.names.length) {
			var noSelect = "None (clear the drop-down)";
			partialMatch.names.push(noSelect);
			var ask = AskUserOptions("Select the spell", "The text you entered is a (partial) match for the following spells that the drop-down box contains." + (partialMatch.names.length === 2 ? acroDumb : ""), partialMatch.names, "radio", true);
			if (partialMatch.refKeys[ask]) {
				var askKey = partialMatch.refKeys[ask];
				fndResult = listObj[2][askKey];
			} else {
				fndResult = emptyBox;
			}
		}
	}
	if (!fndResult) {
		fndResult = emptyBox;
		app.alert({
			cMsg : 'You entered, "' + aResult + "\", but it doesn't match any (part) of the spells in the drop-down box, or was too short (3 characters minimum). The box will now be cleared.\n\nNote that you can select a spell from any spell list you want in the \"Bonus Spells\" section, except those that have a listed \"Origin/Remarks\". Also, make sure that you included the sources you want to use with the \"Source Material\" bookmark." + acroDumb,
			nIcon : 0,
			cTitle : "No matching spells",
			nType : 0
		});
	}
	// Set the found value
	if (nListObj[fndResult]) nListObj[fndResult] *= -1;
	var toLoad = {};
	toLoad[id] = nListObj;
	dialog.load(toLoad);
	// Remember at what time we did this for the form evaluation
	spDias.rememberTime = new Date();
	// Return true if we actually found something
	return fndResult && fndResult !== emptyBox;
}

// Show a dialog with the spell's description
function showSpellDescriptionDialog(fSpell, aClass, fullDescr, sourceStr) {
	if ((!fullDescr || !sourceStr) && fSpell) {
		var aSpell = GetSpellObject(fSpell, aClass, false, true, true);
		var fullDescr = aSpell.tooltip;
		var sourceStr = aSpell.tooltipSource;
	}
	if (sourceStr) { 
		sourceStr = "\n\n__________\n\n" + toUni("Source(s) of the Spell") + "\n \u2022 " + sourceStr.replace(/\n/g, "\n \u2022 ");
		if ((/>>  CHANGES BY FEATURES/i).test(fullDescr)) {
			fullDescr = fullDescr.replace(/\n*(>>  CHANGES BY FEATURES)/i, sourceStr + "\n\n__________\n\n$1");
		} else {
			fullDescr += sourceStr;
		}
	}
	ShowDialog("Full spell description", fullDescr);
}

// Function to add a found spell to the right location in the same dialog
function buttonAddSpellToDialog(dialog, diaObj, fSpell, typeArr) {
	if (!fSpell) return;
	var oResult = dialog.store();
	var success = false;
	for (var t = 0; t < typeArr.length; t++) {
		var aType = typeArr[t][0];
		var aNmbr = typeArr[t][1];
		var aMaxL = typeArr[t][2];
		var refObj = diaObj["list" + aType];
		// If cantrip or spell column, skip if this spell is not an option
		if (aType !== "Bo" && !refObj[2][fSpell]) continue;
		for (var i = 1; i <= aMaxL; i++) {
			// If bonus, continue if this spell is not an option for this line
			if (aType === "Bo") {
				refObj = diaObj.listBo[i - 1];
				if (!refObj[2][fSpell]) continue;
			}
			// Add the spell to this line if there is not already a useable selection
			var Nm = aType + ("0" + i).slice(-2);
			if (!refObj[1][oResult[Nm]]) {
				// Create the new object for the field
				var useObj = newObj(refObj[0]);
				useObj[refObj[2][fSpell]] *= -1;
				var toLoad = {};
				toLoad[Nm] = useObj;
				// If this field is not yet active, make sure it is active now. And set the number to their correct value
				var activeLines = Number(oResult[aNmbr]);
				if (activeLines < i) {
					toLoad[aNmbr] = ASround(i);
					var toEnable = {};
					toEnable[Nm] = true;
					dialog.enable(toEnable);
				}
				dialog.load(toLoad);
				success = true;
				break;
			}
		}
		if (success) break;
	}
	if (!success) {
		// No option to add the spell was found, alert the user
		app.alert({
			cMsg : "There is no space left to add this spell to the current dialog. Make sure that the column where it could go has an unused entry (an empty drop-down box).",
			nIcon : 0,
			cTitle : "No space left",
			nType : 0
		});
	}
}

// Create the various dialogs for selecting spells
function DefineSpellSheetDialogs(force, formHeight) {
	if (spDias && !force) return; // already defined, so do nothing

	spDias = {
		rememberTime : false
	};

	formHeight = !isNaN(formHeight) ? formHeight : isWindows ? 16 : 20;

	// Function to set the right object to positive
	spDias.fnSetSpell = function(inObj, aSpell) {
		var aObj = newObj(inObj[0]);
		var inObjNm = inObj[2][aSpell];
		if (inObjNm && aObj[inObjNm]) aObj[inObjNm] *= -1;
		return aObj;
	};

	// Function to return the right one in the list
	spDias.fnFindSpell = function(aStr, refObj) {
		if (refObj[0][aStr] !== undefined && refObj[1][aStr]) return refObj[1][aStr];
		return ""; //if nothing was found
	}

	// Dialog to set the order of the casters
	spDias.sheetOrder = {

		bExcL : [],
		bIncL : [],
		glossary : false,
		dashEmptyFields : true,
		amendSpellDescriptions : true,
		allowSpellAdd : true,

		initialize : function (dialog) {
			//set the ExcLuded list
			var ExcObj = {};
			for (var Ex = 0; Ex < this.bExcL.length; Ex++) {
				ExcObj[this.bExcL[Ex]] = -1;
			}
			dialog.load({
				"img1" : allIcons.spells,
				"ExcL" : ExcObj,
				"IncL" : {},
				"Glos" : this.glossary,
				"Dash" : this.dashEmptyFields,
				"Amnd" : this.amendSpellDescriptions,
				"SAdd" : this.allowSpellAdd
			});

			//set the IncLuded list
			for (var In = 0; In < this.bIncL.length; In++) {
				var loadObject = {};
				loadObject[this.bIncL[In]] = -1 * [1 + In];
				dialog.insertEntryInList({"IncL" : loadObject});
			}
		},

		commit : function (dialog) {
			//put both elements into the arrays
			var oResult = dialog.store();
			var aExcL = oResult["ExcL"];
			var aIncL = oResult["IncL"];
			this.glossary = oResult["Glos"];

			//make the ExcLuded array
			this.bExcL = [];
			for (var Ex in aExcL) this.bExcL.push(Ex);

			//make the IncLuded array in the right order
			var tempIncL = [];
			for (var In in aIncL) {
				var theLoc = Math.abs(aIncL[In]);
				tempIncL[theLoc] = In;
			}
			//now put the values that are not empty into the final array
			this.bIncL = [];
			for (var i = 0; i < tempIncL.length; i++) {
				if (tempIncL[i]) this.bIncL.push(tempIncL[i]);
			}
			this.dashEmptyFields = oResult["Dash"];
			this.amendSpellDescriptions = oResult["Amnd"];
			this.allowSpellAdd = oResult["SAdd"];
		},

		BTRA : function (dialog) {
			// move all (remaining) items from ExcL to IncL
			var elements = dialog.store()["ExcL"];
			var n = 0;
			for (var p in dialog.store()["IncL"]) n -=1;
			for (var element in elements) {
				n -= 1;
				var loadObject = {};
				loadObject[element] = n;
				dialog.insertEntryInList({"IncL" : loadObject });
			}
			dialog.removeAllEntriesFromList("ExcL");
			dialog.focus("IncL");
		},

		BTR1 : function (dialog) {
			// move selected (one) item from ExcL to IncL
			var refresh = false;
			var sourceObject = {};
			var elements = dialog.store()["ExcL"];
			var IncLlen = 0;
			for (var p in dialog.store()["IncL"]) IncLlen +=1;
			for (var element in elements) {
				if (elements[element] > 0) {
					var loadObject = {};
					loadObject[element] = -1 * (IncLlen + 1);
					dialog.insertEntryInList({"IncL" : loadObject});
					refresh = true;
				} else {
					sourceObject[element] = -1;
				}
			}
			if (refresh) {
				dialog.load({"ExcL" : sourceObject});
				dialog.focus("ExcL");
			}
		},

		BTL1 : function (dialog) {
			// move selected (one) item from IncL to ExcL, without changing the IncL order
			var refresh = false;
			var sourceObject = dialog.store()["ExcL"];
			var elements = dialog.store()["IncL"];
			var resetArray = [];
			for (var element in elements) {
				if (elements[element] > 0) {
					sourceObject[element] = -1;
					refresh = true;
				} else {
					var theLoc = Math.abs(elements[element]);
					resetArray[theLoc] = element;
				}
			}
			if (refresh) {
				//restore the ExcL list
				dialog.load({"ExcL" : sourceObject});
				//reload everything into the IncL list
				dialog.removeAllEntriesFromList("IncL");
				var n = 0;
				for (var i = 0; i < resetArray.length; i++) {
					if (resetArray[i]) {
						n -= 1;
						var loadObject = {};
						loadObject[resetArray[i]] = n;
						dialog.insertEntryInList({"IncL" : loadObject});
					}
				}
				dialog.focus("IncL");
			}
		},

		BTLA : function (dialog) {
			// move all items from IncL to ExcL and sort ExcL
			var elements = dialog.store()["IncL"];
			var isLST1 = dialog.store()["ExcL"];
			for (var element in elements) {
				isLST1[element] = -1;
			}
			dialog.removeAllEntriesFromList("IncL");
			dialog.load({"ExcL" : isLST1});
			dialog.focus("ExcL");
		},

		BTNU : function (dialog) {
			//move the selected, if any, up
			//first make an array in the right order
			var aIncL = dialog.store()["IncL"];
			var tempIncL = [];
			var Move = false;
			for (var In in aIncL) {
				var theLoc = Math.abs(aIncL[In]);
				if (aIncL[In] > 0) Move = In;
				tempIncL[theLoc] = In;
			}
			//so now we have an array in the right order, we just need to move it up one space in the array
			if (Move) {
				//first clean the array of any empty values
				var tempIncL2 = [];
				for (var i = 0; i < tempIncL.length; i++) {
					if (tempIncL[i]) tempIncL2.push(tempIncL[i]);
				}
				//move the value we want into the one above
				var toMove = tempIncL2.indexOf(Move);
				if (toMove !== 0) {
					var temp = tempIncL2[toMove];
					tempIncL2[toMove] = tempIncL2[toMove - 1];
					tempIncL2[toMove - 1] = temp;

					dialog.removeAllEntriesFromList("IncL");
					var n = 0;
					for (var i = 0; i < tempIncL2.length; i++) {
						n -= 1;
						var loadObject = {};
						loadObject[tempIncL2[i]] = n * (tempIncL2[i] === Move ? -1 : 1);
						dialog.insertEntryInList({"IncL" : loadObject});
					}
				}
			}
			dialog.focus("IncL");
		},

		BTND : function (dialog) {
			//move the selected, if any, down
			//first make an array in the right order
			var aIncL = dialog.store()["IncL"];
			var tempIncL = [];
			var Move = false;
			for (var In in aIncL) {
				var theLoc = Math.abs(aIncL[In]);
				if (aIncL[In] > 0) Move = In;
				tempIncL[theLoc] = In;
			}
			//so now we have an array in the right order, we just need to move it down one space in the array
			if (Move) {
				//first clean the array of any empty values
				var tempIncL2 = [];
				for (var i = 0; i < tempIncL.length; i++) {
					if (tempIncL[i]) tempIncL2.push(tempIncL[i]);
				}
				//move the value we want into the one above
				var toMove = tempIncL2.indexOf(Move);
				if (toMove !== (tempIncL2.length - 1)) {
					var temp = tempIncL2[toMove];
					tempIncL2[toMove] = tempIncL2[toMove + 1];
					tempIncL2[toMove + 1] = temp;

					dialog.removeAllEntriesFromList("IncL");
					var n = 0;
					for (var i = 0; i < tempIncL2.length; i++) {
						n -= 1;
						var loadObject = {};
						loadObject[tempIncL2[i]] = n * (tempIncL2[i] === Move ? -1 : 1);
						dialog.insertEntryInList({"IncL" : loadObject});
					}
				}
			}
			dialog.focus("IncL");
		},

		description : {
			name : "SPELL LIST GENERATION DIALOG",
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : [{
					type : "view",
					align_children : "align_row",
					elements : [{
						type : "image",
						item_id : "img1",
						width : 20,
						height : 20
					}, {
						type : "static_text",
						item_id : "head",
						alignment : "align_fill",
						font : "heading",
						bold : true,
						height : 21,
						width : 650,
						name : "Select what to include in the Spell Sheet"
					}]
				}, {
					type : "static_text",
					item_id : "txt0",
					wrap_name : true,
					width : 680,
					name : "Please select which of your spellcasting sources you want to include in the Spell Sheet and in which order they should appear.\n\nNote that generating a new Spell Sheet deletes any current Spell Sheet(s) in this pdf.\n\nPlease be patient, generating a Spell Sheet can take some time, during which Adobe Acrobat will appear unresponsive."
				}, {
					type : "view",
					align_children : "align_row",
					elements : [{
						type : "cluster",
						name : "Exclude from Spell Sheet",
						font : "heading",
						elements : [{
							width : 180,
							height : 130,
							type : "list_box",
							item_id : "ExcL"
						}]
					}, {
						type : "view",
						elements : [{
							type : "button",
							item_id : "BTRA",
							name: ">>"
						}, {
							type : "button",
							item_id : "BTR1",
							name: ">"
						}, {
							type : "button",
							item_id : "BTL1",
							name: "<"
						}, {
							type : "button",
							item_id : "BTLA",
							name: "<<"
						}]
					}, {
						type : "cluster",
						name : "Include in Spell Sheet",
						font : "heading",
						elements : [{
							width : 180,
							height : 130,
							type : "list_box",
							item_id : "IncL"
						}]
					}, {
						type : "view",
						width : 12,
						elements : [{
							type : "button",
							item_id : "BTNU",
							name: "\u22CF"
						},{
							type : "button",
							item_id : "BTND",
							name: "\u22CE"
						}]
					}]
				}, {
					type : "check_box",
					item_id : "Amnd",
					name : "Apply character level and spellcasting ability to spell description (i.e. set cantrip damage)"
				}, {
					type : "check_box",
					item_id : "SAdd",
					name : "Allow features to dynamically change spells (e.g. allow a feature to add Charisma modifier to fire damage spells)"
				}, {
					type : "check_box",
					item_id : "Dash",
					name : "Add a dash in empty fields to increase readability"
				}, {
					type : "check_box",
					item_id : "Glos",
					name : "Add a Glossary of Abbreviations to the end of the Spell Sheet(s)"
				}, {
					type : "ok_cancel",
					ok_name : "Generate the Spell Sheet",
					cancel_name : "Don't generate a Spell Sheet"
				}]
			}]
		}
	};

	// Dialog for user input on spells
	// Bo 20, Ca 20, Sp 20
	spDias.spellSelectParts = {
		listCasterCluster : {
			type : "cluster", //spell cluster for casters with typSp ==
			align_children : "align_left",
			item_id : "SplT",
			name : "Spells",
			font : "heading",
			bold : true,
			elements : [{
				type : "static_text",
				char_width : 37,
				wrap_name : true,
				name : "This spellcaster knows all spells on their list. Thus, there is no reason to select spells in this dialog. All spells will be shown on the generated pages and there you can mark which are prepared.\n\nAlternatively, you can select \"Prepared spells only\" below and the next dialog will allow you to select which spells are shown on the generated pages."
			}]
		},
		bonusCluster : {
			type : "cluster",
			align_children : "align_left",
			item_id : "BoCL",
			elements : [{
				type : "view",
				align_children : "align_distribute",
				margin_height : 5,
				elements : [{
					type : "static_text",
					item_id : "BonT",
					name : "Bonus Spells",
					height : 22,
					char_width : 12,
					alignment : "align_left",
					font : "heading",
					bold : true
				}, {
					type : "edit_text",
					item_id : "BonK",
					alignment : "align_right",
					char_width : 3,
					height : 22,
					SpinEdit : true
				}, {
					type : "static_text",
					item_id : "BoT2",
					name : "Origin / Remarks",
					height : 22,
					char_width : 15,
					alignment : "align_left",
					font : "heading"
				}]
			}].concat(Array.apply(null, Array(20)).map(function(n, i) {
				var nr = ("0" + (i+1)).slice(-2);
				return {
					type : "view",
					align_children : "align_row",
					char_width : 29,
					margin_height : -1,
					elements : [{
						type : "edit_text",
						item_id : "Bo" + nr,
						char_width : 12,
						height : formHeight,
						PopupEdit : true,
						SpinEdit : true,
						alignment : "align_top"
					}, {
						type : "static_text",
						item_id : "BT" + nr,
						char_width : 15,
						height : formHeight
					}]
				};
			})).concat({
				type : "gap",
				height : 5
			})
		},
		cantripCluster : {
			type : "cluster",
			align_children : "align_left",
			item_id : "CaCL",
			elements : [{
				type : "view",
				align_children : "align_distribute",
				margin_height : 5,
				elements : [{
					type : "static_text",
					item_id : "CanT",
					name : "Cantrips",
					height : 22,
					char_width : 12,
					alignment : "align_left",
					font : "heading",
					bold : true
				}, {
					type : "edit_text",
					alignment : "align_right",
					item_id : "CanK",
					char_width : 3,
					height : 22,
					SpinEdit : true
				}]
			}].concat(Array.apply(null, Array(20)).map(function(n, i) {
				return {
					type : "view",
					char_width : 11,
					margin_height : -1,
					elements : [{
						type : "edit_text",
						item_id : "Ca" + ("0" + (i+1)).slice(-2),
						char_width : 11,
						height : formHeight,
						PopupEdit : true,
						SpinEdit : true
					}]
				};
			})).concat({
				type : "gap",
				height : 5
			})
		},
		spellCluster : {
			type : "cluster",
			align_children : "align_left",
			item_id : "SpCL",
			elements : [{
				type : "view",
				align_children : "align_distribute",
				margin_height : 5,
				elements : [{
					type : "static_text",
					item_id : "SplT",
					name : "Spells",
					height : 22,
					char_width : 14,
					alignment : "align_left",
					font : "heading",
					bold : true
				}, {
					type : "edit_text",
					item_id : "SplK",
					alignment : "align_right",
					char_width : 3,
					height : 22,
					SpinEdit : true
				}]
			}].concat(Array.apply(null, Array(20)).map(function(n, i) {
				return {
					type : "view",
					char_width : 13,
					margin_height : -1,
					elements : [{
						type : "edit_text",
						item_id : "Sp" + ("0" + (i+1)).slice(-2),
						char_width : 13,
						height : formHeight,
						PopupEdit : true,
						SpinEdit : true
					}]
				};
			})).concat({
				type : "gap",
				height : 5
			})
		},
		extraCluster : {
			type : "cluster",
			alignment : "align_fill",
			align_children : "align_left",
			elements : [{
				type : "view",
				align_children : "align_left",
				margin_height : 5,
				elements : [{
					type : "static_text",
					item_id : "AdCL",
					char_width : 17,
					height : 22,
					font : "heading",
					name : "Subclass Spells",
					bold : true
				}, {
					type : "view",
					margin_height : -2,
					elements : [{
						type : "static_text",
						item_id : "AdET",
						font : "palette",
						bold : true,
						name : "[extra options for spells known]"
					}]
				}].concat(Array.apply(null, Array(22)).map(function(n, i) {
					return {
						type : "view",
						margin_height : -2,
						elements : [{
							type : "static_text",
							item_id : "Ad" + ("0" + (i+1)).slice(-2),
							char_width : 17
						}]
					};
				}))
			}]
		}
	};
	spDias.spellSelect = {
		search : manualInputToSpellObj,
		listAl : [{}, {}, {}],
		listBo : Array.apply(null, Array(20)).map(function() {return [{}, {}, {}]}), //array of 20 arrays, each with 3 objects
		namesBo : Array(20), //always 20 long!
		keysBo : Array(20), //always 20 long!
		listCa : [{}, {}, {}],
		listSp : [{}, {}, {}],
		selectBo : Array(20), //always 20 long!
		selectCa : [],
		selectAd : [],
		selectSp : [],
		selectSpRadio : 1,
		nmbrBo : 0,
		nmbrCa : 0,
		nmbrSp : 0,
		typeSp : "known",
		offsetBo : 0,
		offsetCa : 0,
		offsetSp : 0,
		showBo : true,
		showCa : true,
		showAd : true,
		showSp : true,
		showSpRadio : true,
		spNm : "Spells",
		caNm : "Cantrips",
		header : "",
		fullname : "",
		SpBook : false,
		levelSp : 1,
		nameAd : "[always prepared]",
		prevBtn : false,
		curCast : "",


		initialize : function (dialog) {
			this.SpBook = false;
			var psiSpells = this.spNm === "Spells" ? "Spells" : "Psionics";

			//make a string for the information
			var info = [[], []];
			if (this.showCa) {
				info[0].push("\u2022 " + this.caNm + " known:");
				info[1].push(this.nmbrCa);
			}
			switch (this.typeSp) {
				case "book" :
					info[1].push("All in spellbook");
				case "list" :
					if (this.typeSp == "list") info[1].push("All on the class' spell list");
				case "known" :
					if (this.typeSp == "known") info[1].push(this.nmbrSp);
					info[0].push("\u2022 " + this.spNm + " known:");
			}
			if (this.levelSp) {
				info[0].push("   of spell level:");
				info[1].push(spellLevelList[this.levelSp] + (this.levelSp > 1 ? " (and lower)" : ""));
			}
			if (this.showBo) {
				info[0].push("\u2022 Bonus " + psiSpells.toLowerCase() + ": ");
				info[1].push(this.nmbrBo);
			}

			var theBo = this.nmbrBo + this.offsetBo;
			var theCa = this.nmbrCa + this.offsetCa;
			var theSp = this.nmbrSp + this.offsetSp;

			//set the value of various text entries
			var toLoad = {
				"img1" : allIcons.spells,
				"Hea0" : "Set " + this.spNm + ": " + this.header.capitalize(),
				"txt0" : "Select or type a spell in a drop-down box and use TAB to go to the next.\nSpell availability depends on what you are currently editing.\nUse ENTER to confirm and ESC to cancel this dialog.",
				"BonK" : ASround(theBo),
				"CanK" : ASround(theCa),
				"SplK" : ASround(theSp),
				"txC1" : this.fullname,
				"txC2" : info[0].join("\n"),
				"txC3" : info[1].join("\n"),
				"BonT" : "Bonus " + psiSpells,
				"CanT" : this.caNm,
				"AdCL" : "Subclass " + psiSpells,
				"SplT" : this.typeSp === "book" ? "Spellbook" : this.spNm,
				"AdET" : this.nameAd,
				"ClLo" : psiSpells + " Lookup",
				"AlLo" : this.listAl[0]
			};
			if (this.showSpRadio) toLoad["SpR" + this.selectSpRadio] = true;

			//enable the various entries or disable them and load their values
			var toEnable = {
				"bLoS" : false,
				"bLoA" : false
			};
			if (this.showAd) toEnable.AdET = false;

			//set the visibility
			var toShow = {
				"bPre" : this.prevBtn
			};
			if (this.showSp) toShow.SplK = this.typeSp !== "book";

			//a function to set the right object to positive
			for (var i = 1; i <= 22; i++) {
				var Ad = "Ad" + ("0" + i).slice(-2);
				if (this.showAd && this.selectAd[i - 1]) {
					toLoad[Ad] = getSpNm(this.selectAd[i - 1]);
				}
				if (i > 20) continue;
				var Bo = "Bo" + ("0" + i).slice(-2);
				var BT = "BT" + ("0" + i).slice(-2);
				var Ca = "Ca" + ("0" + i).slice(-2);
				var Sp = "Sp" + ("0" + i).slice(-2);
				if (this.showBo) {
					toEnable[Bo] = i <= theBo;
					toLoad[BT] = this.namesBo[i - 1];
					var aBoSet = this.selectBo[i - 1];
					toLoad[Bo] = toEnable[Bo] && aBoSet ? spDias.fnSetSpell(this.listBo[i - 1], aBoSet) : this.listBo[i - 1][0];
				}
				if (this.showCa) {
					toEnable[Ca] = i <= theCa;
					var aCaSet = this.selectCa[i - 1];
					toLoad[Ca] = toEnable[Ca] && aCaSet ? spDias.fnSetSpell(this.listCa, aCaSet) : this.listCa[0];
				}
				if (this.showSp) {
					toEnable[Sp] = i <= theSp;
					var aSpSet = this.selectSp[i - 1];
					toLoad[Sp] = toEnable[Sp] && aSpSet ? spDias.fnSetSpell(this.listSp, aSpSet) : this.listSp[0];
				}
			}
			dialog.enable(toEnable);
			dialog.visible(toShow);
			dialog.load(toLoad);
		},

		saveIt : function (dialog) {
			var oResult = dialog.store();

			this.offsetBo = oResult["BonK"] - this.nmbrBo;
			this.offsetCa = oResult["CanK"] - this.nmbrCa;
			this.offsetSp = oResult["SplK"] - this.nmbrSp;

			this.selectCa = [];
			this.selectSp = [];
			this.selectBo = [];
			for (var i = 1; i <= 20; i++) {
				var Bo = "Bo" + ("0" + i).slice(-2);
				var Ca = "Ca" + ("0" + i).slice(-2);
				var Sp = "Sp" + ("0" + i).slice(-2);

				var resultSp = i <= oResult["SplK"] ? spDias.fnFindSpell(oResult[Sp], this.listSp) : "";
				if (resultSp) this.selectSp.push(resultSp);
				this.selectBo.push(i <= oResult["BonK"] ? spDias.fnFindSpell(oResult[Bo], this.listBo[i - 1]) : "");
				var resultCa = i <= oResult["CanK"] ? spDias.fnFindSpell(oResult[Ca], this.listCa) : "";
				if (resultCa) this.selectCa.push(resultCa);
			}

			//set the results of the radio button
			this.selectSpRadio = oResult["SpR1"] ? 1 : oResult["SpR2"] ? 2 : oResult["SpR3"] ? 3 : 4;
		},

		// When committing the dialog check if this wasn't a field search ended by pressing ENTER
		validate : function (dialog) {
			if (spDias.rememberTime === false) return true;
			var timeDif = new Date() - spDias.rememberTime;
			return timeDif > 100; // returning false stops the dialog from closing
		},

		BonK : function (dialog) {
			var elements = dialog.store();
			var theBo = ASround( Math.max(0, elements["BonK"]) );
			dialog.load({
				"BonK" : theBo
			});
			var allBo = {};
			for (var B = 1; B <= 20; B++) {
				allBo["Bo" + ("0" + B).slice(-2)] = B <= theBo;
				allBo["BT" + ("0" + B).slice(-2)] = B <= theBo;
			}
			dialog.enable(allBo);
		},

		CanK : function (dialog) {
			var elements = dialog.store();
			var theCa = ASround( Math.max(0, elements["CanK"]) );
			dialog.load({
				"CanK" : theCa
			});
			var allCa = {};
			for (var C = 1; C <= 20; C++) {
				allCa["Ca" + ("0" + C).slice(-2)] = C <= theCa;
			}
			dialog.enable(allCa);
		},

		SplK : function (dialog) {
			var elements = dialog.store();
			var theSp = ASround( Math.max(0, elements["SplK"]) );
			dialog.load({
				"SplK" : theSp
			});
			var allSp = {};
			for (var S = 1; S <= 20; S++) {
				allSp["Sp" + ("0" + S).slice(-2)] = S <= theSp;
			}
			dialog.enable(allSp);
		},

		ok : function (dialog) {
			if (this.typeSp === "book") this.SpBook = true;
			this.saveIt(dialog);
		},

		other : function (dialog) {
			this.saveIt(dialog);
			dialog.end("ok");
		},

		bPre : function (dialog) {
			this.saveIt(dialog);
			dialog.end("prev");
		},

		AlLo : function (dialog) {
			var found = this.search(dialog, "AlLo");
			dialog.enable({
				"bLoS" : found,
				"bLoA" : found
			});
		},

		bLoS : function(dialog) {
			// Show a dialog with the spell's full description
			var oResult = dialog.store();
			var fSpell = spDias.fnFindSpell(oResult["AlLo"], this.listAl);
			showSpellDescriptionDialog(fSpell, this.curCast);
		},

		bLoA : function (dialog) {
			// Add the spell to the selected spells
			var types = [
				["Ca", "CanK", 20],
				["Sp", "SplK", 20],
				["Bo", "BonK", 20]
			];
			var oResult = dialog.store();
			var fSpell = spDias.fnFindSpell(oResult["AlLo"], this.listAl);
			buttonAddSpellToDialog(dialog, this, fSpell, types);
		},

		description : {
			name : "SPELL SELECTION DIALOG",
			elements : [{
				type : "view", //view to add ok buttons below everything else
				align_children : "align_left",
				elements : [{
					type : "view", //total view
					align_children : "align_distribute",
					elements : [{
						type : "view", // first column, always visible
						elements : [{
							type : "view", // title
							alignment : "align_left",
							align_children : "align_row",
							margin_height : -1,
							elements : [{
								type : "image",
								item_id : "img1",
								width : 20,
								height : 20
							}, {
								type : "static_text",
								item_id : "Hea0",
								alignment : "align_fill",
								font : "title",
								bold : true,
								height : 25,
								char_width : 36
							}]
						}, {
							type : "static_text",
							item_id : "txt0",
							alignment : "align_fill",
							font : "dialog",
							char_width : 39,
							wrap_name : true,
							name : "Select or type a spell in a drop-down box and use TAB to go to the next.\nSpell availability depends on what you are currently editing.\nENTER always confirms and ESC always cancels this dialog."
						}, {
							type : "cluster",
							item_id : "txC1",
							align_children : "align_left",
							char_width : 39,
							name : "Currently editing",
							font : "heading",
							bold : true,
							elements : [{
								type : "view",
								align_children : "align_top",
								elements : [{
									type : "static_text",
									item_id : "txC2",
									char_width : 10,
									wrap_name : true,
									name : "Bonus spells:\nCantrips known:\nSpells known:\n of Spell Level:"
								}, {
									type : "static_text",
									item_id : "txC3",
									wrap_name : true,
									char_width : 20,
									font : "dialog",
									bold : true,
									name : "0\n1\n2\n3"
								}]
							}]
						}, {
							type : "cluster",
							item_id : "ClLo",
							align_children : "align_left",
							char_width : 39,
							name : "Spell Lookup",
							font : "heading",
							bold : true,
							elements : [{
								type : "edit_text",
								item_id : "AlLo",
								alignment : "align_center",
								char_width : 13,
								height : formHeight,
								PopupEdit : true,
								SpinEdit : true
							}, {
								type : "view",
								char_width : 35,
								align_children : "align_distribute",
								alignment : "align_fill",
								elements : [{
									type : "button",
									item_id : "bLoS",
									alignment : "align_center",
									char_width : 12,
									name : "Show full description"
								}, {
									type : "button",
									item_id : "bLoA",
									alignment : "align_center",
									char_width : 12,
									name : "Add to selection"
								}]
							}]
						}, {
							type : "view",
							item_id : "col1",
							margin_height : 0,
							elements : []
						}]
					}, {
						type : "view", // the rest of the dialog (dynamically loaded)
						align_children : "align_distribute",
						item_id : "colE",
						margin_height : 0,
						elements : []
					}]
				}, {
					type : "view",
					align_children : "align_row",
					alignment : "align_fill",
					elements : [{
						type : "button",
						name : "<< Go to Previous Dialog",
						item_id : "bPre",
						alignment : "align_left"
					}, {
						type : "ok_cancel_other",
						item_id : "OKbt",
						alignment : "align_right",
						ok_name : "Add More Spells to the Spellbook",
						other_name : "Continue to Next Dialog >>",
						cancel_name : "Cancel and Stop"
					}]
				}]
			}]
		}
	};

	// Dialog for spellbooks, adding 80 places to add spells
	// Sp 80
	spDias.spellBook = {

		search : manualInputToSpellObj,
		listSp : [{}, {}, {}],
		selectSp : [],
		fullname : "",
		iteration : "1/1",
		curCast : "",

		//when starting the dialog
		initialize : function (dialog) {

			//set the value of various text entries
			var toEnable = {
				"bLoS" : false,
				"bLoA" : false
			};
			var toLoad = {
				"Hea0" : "Additional Spellbook Spells for " + this.fullname,
				"iter" : this.iteration,
				"SpLo" : this.listSp[0]
			};

			//enable the various entries or disable them and load their values
			for (var i = 1; i <= 80; i++) {
				var Sp = "Sp" + ("0" + i).slice(-2);
				var aSpSet = this.selectSp[i - 1];
				toLoad[Sp] = aSpSet ? spDias.fnSetSpell(this.listSp, aSpSet) : this.listSp[0];
			}
			dialog.load(toLoad);
			dialog.enable(toEnable);
		},

		// When committing the dialog check if this wasn't a field search ended by pressing ENTER
		validate : function (dialog) {
			if (spDias.rememberTime === false) return true;
			var timeDif = new Date() - spDias.rememberTime;
			return timeDif > 100; // returning false stops the dialog from closing // returning false stops the dialog from closing
		},

		saveIt : function (dialog) {
			var oResult = dialog.store();
			this.selectSp = [];
			for (var i = 1; i <= 80; i++) {
				var Sp = "Sp" + ("0" + i).slice(-2);
				var resultSp = spDias.fnFindSpell(oResult[Sp], this.listSp);
				if (resultSp) this.selectSp.push(resultSp);
			}
		},

		ok : function (dialog) {
			this.saveIt(dialog);
		},

		other : function (dialog) {
			this.saveIt(dialog);
			dialog.end("book");
		},

		bPre : function (dialog) {
			this.saveIt(dialog);
			dialog.end("prev");
		},

		SpLo : function (dialog) {
			var found = this.search(dialog, "SpLo");
			dialog.enable({
				"bLoS" : found,
				"bLoA" : found
			});
		},

		bLoS : function(dialog) {
			// Show a dialog with the spell's full description
			var oResult = dialog.store();
			var fSpell = spDias.fnFindSpell(oResult["SpLo"], this.listSp);
			showSpellDescriptionDialog(fSpell, this.curCast);
		},

		bLoA : function (dialog) {
			// Add the spell to the selected spells
			var types = [ ["Sp", "SplK", 80] ];
			var oResult = dialog.store();
			var fSpell = spDias.fnFindSpell(oResult["SpLo"], this.listSp);
			buttonAddSpellToDialog(dialog, this, fSpell, types);
		},

		description : {
			name : "EXTRA SPELLBOOK SPELLS DIALOG",
			elements : [{
				type : "view", //view to add ok buttons below everything else
				align_children : "align_left",
				elements : [{
					type : "view",
					align_children : "align_row",
					alignment : "align_fill",
					elements : [{
						type : "static_text",
						item_id : "Hea0",
						alignment : "align_fill",
						font : "title",
						bold : true,
						height : 21,
						char_width : 50
					}, {
						type : "static_text",
						item_id : "iter",
						alignment : "align_right",
						height : 21,
						char_width : 8
					}]
				}, {
					type : "view", //total view
					align_children : "align_distribute",
					elements : [{
						type : "view", // first column
						align_children : "align_left",
						elements : [{
							type : "static_text",
							alignment : "align_fill",
							item_id : "txt0",
							wrap_name : true,
							char_width : 17,
							name : "The spells you select here are added to those selected in any previous dialogs. The order you select them in doesn't matter, they will be ordered automatically on the generated spell sheets.\n\nYou can open as many of these dialogs as you like to add more spells to the spellbook."
						}, {
							type : "cluster", // lookup cluster
							item_id : "ClLo",
							align_children : "align_left",
							name : "Spell Lookup",
							font : "heading",
							bold : true,
							elements : [{
								type : "edit_text",
								item_id : "SpLo",
								alignment : "align_center",
								char_width : 11,
								height : formHeight + 2,
								PopupEdit : true,
								SpinEdit : true
							}, {
								type : "button",
								item_id : "bLoS",
								alignment : "align_center",
								char_width : 15,
								name : "Show full description"
							}, {
								type : "button",
								item_id : "bLoA",
								alignment : "align_center",
								char_width : 15,
								name : "Add to selection"
							}]
						}]
					}].concat(Array.apply(null, Array(4)).map(function(n, idx) {
						var colObj = {
							type : "view",
							align_children : "align_left",
							char_width : 15,
							elements : []
						};
						var start = Number(idx * 20 + 1)
						for (var i = start; i < (start + 20); i++) {
							colObj.elements.push({
								type : "view",
								char_width : 11,
								margin_height : -1,
								elements : [{
									type : "edit_text",
									item_id : "Sp" + ("0" + (i)).slice(-2),
									char_width : 11,
									height : formHeight,
									PopupEdit : true,
									SpinEdit : true
								}]
							});
						}
						return colObj;
					}))
				}, {
					type : "gap",
				}, {
					type : "view",
					align_children : "align_row",
					alignment : "align_fill",
					elements : [{
						type : "button",
						name : "<< Go to Previous Spellbook Dialog",
						item_id : "bPre",
						alignment : "align_left"
					}, {
						type : "ok_cancel_other",
						item_id : "OKbt",
						alignment : "align_right",
						ok_name : "Continue to Next Dialog >>",
						other_name : "Add More to the Spellbook",
						cancel_name : "Cancel and Stop"
					}]
				}]
			}]
		}
	};

	// Dialog for user input for more spells (after the initial 20) for a spellsbook
	// Sp 30
	spDias.spellsPrepared = {

		search : manualInputToSpellObj,
		listSp : [{}, {}, {}],
		selectSp : [],
		nmbrSp : 0,
		offsetSp : 0,
		fullname : "Paladin (Oath of the Ancients)",
		ability : 4,
		fixedPrepMod : false,
		nmbrPrep : 20,
		curCast : "",

		//when starting the dialog
		initialize : function (dialog) {
			// Get the ability modifier and ability name
			var abiNm = AbilityScores.names[this.ability - 1];
			var abiMod = this.fixedPrepMod ? this.fixedPrepMod : What(AbilityScores.abbreviations[this.ability - 1] + " Mod");

			// Set the amount of spells that can be prepared
			this.nmbrSp = Number(this.nmbrPrep) + Number(abiMod);
			var theSp = this.nmbrSp + this.offsetSp;

			//set the value of various text entries
			var toEnable = {
				"bLoS" : false,
				"bLoA" : false
			};
			var toLoad = {
				"Hea0" : "Prepared spells for " + this.fullname,
				"nrLv" : ASround(this.nmbrPrep),
				"txAb" : abiNm + " modifier",
				"nrAb" : (abiMod < 0 ? "- " : "+ ") + Math.abs(abiMod),
				"nrTo" : "= " + this.nmbrSp,
				"SplK" : ASround(theSp),
				"SpLo" : this.listSp[0]
			};

			for (var i = 1; i <= 30; i++) {
				var Sp = "Sp" + ("0" + i).slice(-2);
				toEnable[Sp] = i <= theSp;
				var aSpSet = this.selectSp[i - 1];
				toLoad[Sp] = toEnable[Sp] && aSpSet ? spDias.fnSetSpell(this.listSp, aSpSet) : this.listSp[0];
			}
			dialog.enable(toEnable);
			dialog.load(toLoad);
		},

		commit : function (dialog) {
			var oResult = dialog.store();
			this.offsetSp = oResult["SplK"] - this.nmbrSp;
			this.selectSp = [];
			for (var i = 1; i <= 30; i++) {
				var Sp = "Sp" + ("0" + i).slice(-2);
				var resultSp = i <= oResult["SplK"] ? spDias.fnFindSpell(oResult[Sp], this.listSp) : "";
				if (resultSp) this.selectSp.push(resultSp);
			}
		},

		// When committing the dialog check if this wasn't a field search ended by pressing ENTER
		validate : function (dialog) {
			if (spDias.rememberTime === false) return true;
			var timeDif = new Date() - spDias.rememberTime;
			return timeDif > 100; // returning false stops the dialog from closing // returning false stops the dialog from closing
		},

		SplK : function (dialog) {
			var elements = dialog.store();
			var theSp = ASround( Math.max(0, elements["SplK"]) );
			dialog.load({
				"SplK" : theSp
			});
			var allSp = {};
			for (var S = 1; S <= 30; S++) {
				allSp["Sp" + ("0" + S).slice(-2)] = S <= theSp;
			}
			dialog.enable(allSp);
		},

		SpLo : function (dialog) {
			var found = this.search(dialog, "SpLo");
			dialog.enable({
				"bLoS" : found,
				"bLoA" : found
			});
		},

		bLoS : function(dialog) {
			// Show a dialog with the spell's full description
			var oResult = dialog.store();
			var fSpell = spDias.fnFindSpell(oResult["SpLo"], this.listSp);
			showSpellDescriptionDialog(fSpell, this.curCast);
		},

		bLoA : function (dialog) {
			// Add the spell to the selected spells
			var types = [ ["Sp", "SplK", 30] ];
			var oResult = dialog.store();
			var fSpell = spDias.fnFindSpell(oResult["SpLo"], this.listSp);
			buttonAddSpellToDialog(dialog, this, fSpell, types);
		},

		description : {
			name : "PREPARED SPELLS DIALOG",
			elements : [{
				type : "view", //view to add ok buttons below everything else
				align_children : "align_left",
				elements : [{
					type : "view", //top row view
					alignment : "align_fill",
					align_children : "align_distribute",
					elements : [{
						type : "static_text",
						item_id : "Hea0",
						alignment : "align_fill",
						font : "title",
						bold : true,
						height : 22,
						char_width : 51
					}, {
						type : "edit_text",
						item_id : "SplK",
						alignment : "align_right",
						char_width : 3,
						height : 22,
						SpinEdit : true
					}]
				}, {
					type : "view", //view with info column + three columns of spells
					align_children : "align_distribute",
					elements : [{
						type : "view", // info column
						align_children : "align_left",
						elements : [{
							type : "cluster", // number of spells cluster
							item_id : "ClNr",
							align_children : "align_left",
							font : "heading",
							bold : true,
							name : "Number of Spells to Prepare",
							elements : [{
								type : "view",
								align_children : "align_distribute",
								margin_height : -1,
								elements : [{
									type : "static_text",
									item_id : "txLv",
									char_width : 12,
									name : "From level"
								}, {
									type : "static_text",
									item_id : "nrLv",
									alignment : "align_right",
									char_width : 4,
									font : "dialog",
									bold : true,
									name : "0"
								}]
							}, {
								type : "view",
								align_children : "align_distribute",
								margin_height : -1,
								elements : [{
									type : "static_text",
									item_id : "txAb",
									char_width : 12,
									name : "Ability modifier"
								}, {
									type : "static_text",
									item_id : "nrAb",
									alignment : "align_right",
									char_width : 4,
									font : "dialog",
									bold : true,
									name : "+ 0"
								}]
							}, {
								type : "static_text",
								alignment : "align_fill",
								separator: 1,
								height : 3
							}, {
								type : "view",
								align_children : "align_distribute",
								margin_height : -1,
								elements : [{
									type : "static_text",
									item_id : "txTo",
									char_width : 12,
									font : "dialog",
									bold : true,
									name : "Total"
								}, {
									type : "static_text",
									item_id : "nrTo",
									alignment : "align_right",
									char_width : 4,
									font : "dialog",
									bold : true,
									name : "= 0"
								}]
							}]
						}, {
							type : "cluster", // lookup cluster
							item_id : "ClLo",
							align_children : "align_left",
							name : "Spell Lookup",
							font : "heading",
							bold : true,
							elements : [{
								type : "edit_text",
								item_id : "SpLo",
								alignment : "align_center",
								char_width : 11,
								height : formHeight + 2,
								PopupEdit : true,
								SpinEdit : true
							}, {
								type : "button",
								item_id : "bLoS",
								alignment : "align_center",
								char_width : 15,
								name : "Show full description"
							}, {
								type : "button",
								item_id : "bLoA",
								alignment : "align_center",
								char_width : 15,
								name : "Add to selection"
							}]
						}]
					}].concat(Array.apply(null, Array(3)).map(function(n, idx) {
						var colObj = {
							type : "view",
							align_children : "align_left",
							char_width : 15,
							elements : []
						};
						var start = Number(idx * 10 + 1)
						for (var i = start; i < (start + 10); i++) {
							colObj.elements.push({
								type : "view",
								char_width : 11,
								margin_height : -1,
								elements : [{
									type : "edit_text",
									item_id : "Sp" + ("0" + (i)).slice(-2),
									char_width : 11,
									height : formHeight,
									PopupEdit : true,
									SpinEdit : true
								}]
							});
						}
						return colObj;
					}))
				}, {
					type : "gap"
				}, {
					type : "ok_cancel",
					ok_name : "Continue to Next Dialog",
					cancel_name : "Cancel and Stop"
				}]
			}]
		}
	};

	// Now create the search functions for the dialogs above
	var makeFunc = {
		"spellSelect" : {
			Bo : 20,
			Ca : 20,
			Sp : 20
		},
		"spellBook" : {
			Sp : 80
		},
		"spellsPrepared" : {
			Sp : 30
		}
	};
	for (var diaName in makeFunc) {
		for (var dType in makeFunc[diaName]) {
			for (var a = 1; a <= makeFunc[diaName][dType]; a++) {
				var boxID = dType + ("0" + a).slice(-2);
				if (app.viewerVersion < 15) {
					// Doesn't support ES5, so do this with eval()
					eval("spDias[" + diaName + "][" + boxID + "] = function (dialog) { this.search(dialog, '" + boxID + "'); };");
				} else {
					var doThisInFunction = function(thisID) {
						spDias[diaName][thisID] = function(dialog) {
							this.search(dialog, id = thisID);
						}
					}(boxID);
				}
			}
		}
	}
}

//ask the user to set all the spells for all the classes he has
function AskUserSpellSheet() {
	DefineSpellSheetDialogs();
	var dia = spDias.spellSelect;
	var classesArray = [];
	for (var aC in CurrentSpells) {
		classesArray.push(aC);
	};

	// go through all the entries in CurrentSpells and ask the user for input that we then store back in that same variable
	for (var theI = 0; theI < classesArray.length; theI++) {
		var aCast = classesArray[theI];
		var spCast = CurrentSpells[aCast];
		var diaDynCol1 = [];
		var diaDynCols = [];

		var thermoTxt = thermoM("Generating the " + spCast.name + " dialog..."); //change the progress dialog text
		thermoM(1/2); //increment the progress dialog's progress

		dia.prevBtn = theI !== 0;
		dia.curCast = aCast;
		dia.listAl = AllSpellsObject;

		// get the ability score to use for save DCs/spell attacks/prepared
		spCast.abilityToUse = getSpellcastingAbility(aCast);
		if (spCast.level !== undefined) {
			if ((/feat|item/i).test(spCast.typeSp)) {
				//set the level if concerning a feat/item
				spCast.level = Math.max(1, Number(What("Character Level")));
			} else if (classes.known[aCast]) {
				spCast.level = classes.known[aCast].level;
			}
		}

		//put some general things in variables
		if (spCast.level && spCast.factor && (tDoc[spCast.factor[1] + "SpellTable"] || spCast.spellsTable)) {
			var CasterLevel = Math.max(Math.ceil(spCast.level / (spCast.spellsTable ? 1 : spCast.factor[0])), 1);
			var PrepLevel = Math.max(Math.floor(spCast.level / spCast.factor[0]), 1);
			var theTable = spCast.spellsTable ? spCast.spellsTable : tDoc[spCast.factor[1] + "SpellTable"];
			var tableLevel = Math.min(theTable.length - 1, CasterLevel);
			var maxSpell = theTable[tableLevel].trailingIndexOf(0);
			maxSpell = Number(maxSpell === -1 ? 9 : maxSpell);
		} else {
			var CasterLevel = false;
			var PrepLevel = false;
			var maxSpell = false;
		};
		spCast.maxSpell = maxSpell;

		//see if this is a psionic caster
		var isPsionics = spCast.factor && (/psionic/i).test(spCast.factor[1]);

		//set all the general parts of the dialog
		dia.caNm = isPsionics ? spellLevelList[10] : spellLevelList[0].replace(/ \(.*/, '');
		dia.spNm = isPsionics ? spellLevelList[11] : "Spells";
		dia.levelSp = maxSpell;
		dia.header = spCast.shortname ? spCast.shortname : spCast.name; //the name in the dialog's header
		dia.fullname = spCast.name + (spCast.level ? ", level " + spCast.level : ""); //the full name of the feature including level
		if (spCast.list && spCast.known) {
			var GoAhead = true;
			var spListLevel = spCast.list.level; //put the level of the list here for safe keeping

			// Create the typeSp if none is defined
			if (spCast.typeSp === undefined) {
				spCast.typeSp = !spCast.known.spells || isArray(spCast.known.spells) || !isNaN(spCast.known.spells) ? "known" : spCast.known.spells;
			}
		  // see what spell section to activate
			dia.typeSp = spCast.typeSp; //set the type of spells (book, list, known)
			dia.nmbrSp = spCast.typeSp == "book" ? 20 :
				!spCast.known.spells ? 0 :
				isArray(spCast.known.spells) ? spCast.known.spells[Math.min(spCast.known.spells.length, spCast.level) - 1] :
				isNaN(spCast.known.spells) ? 0 : Number(spCast.known.spells); //set the amount of spells
			if (isNaN(dia.nmbrSp)) dia.nmbrSp = 20; //if spells known is not a number, set the dialog to the max of 20
			dia.showSp = dia.nmbrSp !== 0; //show the spells section
			dia.offsetSp = spCast.offsetSp ? spCast.offsetSp : 0; //set the manually added spells
			dia.selectSp = spCast.selectSp ? spCast.selectSp : []; //set the spells already selected

			//now also do this for the cantrips
			dia.showCa = spCast.known.cantrips ? true : false;
			if (dia.showCa) {
				diaDynCols.push(spDias.spellSelectParts.cantripCluster);
				dia.nmbrCa = isArray(spCast.known.cantrips) ? spCast.known.cantrips[Math.min(spCast.known.cantrips.length, spCast.level) - 1] : spCast.known.cantrips; //set the amount of cantrips
				dia.offsetCa = spCast.offsetCa ? spCast.offsetCa : 0; //set the manually added cantrips
				dia.selectCa = spCast.selectCa ? spCast.selectCa : []; //set the cantrips already selected

				// Create the lists
				// Set the list level to 0 so that school restrictions are ignored, if applicable
				spCast.list.level = [0, 0, spListLevel && spListLevel[1] ? 1 : 0];
				// Create an array of all the cantrips, and only cantrips
				var extraToCa = !spCast.extra ? false :
					spCast.type == "list" ? (spCast.extraSpecial ? spCast.extra : false) :
					spCast.extraSpecial ? false : spCast.extra; // book or known
				var listCaRef = CreateSpellList(spCast.list, true, extraToCa, false, aCast, spCast.typeSp, true);
				// Create the cantrip popup object
				dia.listCa = CreateSpellObject(listCaRef);
			}

			if (dia.showSp)	{
				diaDynCols.push(spDias.spellSelectParts.spellCluster);
			} else if (dia.typeSp === "list") {
				diaDynCol1.push(spDias.spellSelectParts.listCasterCluster);
			}

			//show the spell radio buttons if concerning a level-dependent spellcaster (classes)
			dia.showSpRadio = !isPsionics && (/list|book|known/i).test(dia.typeSp);

			if (dia.showSpRadio) { // set the name of the radio buttons and set the selection
				var diaRadBtns = [];
				if (spCast.level) {
					diaRadBtns.push({
						type : "radio",
						item_id : "SpR1",
						group_id : "RadB",
						name : spellLevelList[maxSpell] + (maxSpell > 1 ? " and lower" : "") + " spell" + (dia.typeSp === "list" ? "s" : dia.typeSp === "book" ? "book spells" : "s known") + " (+Bonus)"
					});
					diaRadBtns.push({
						type : "radio",
						item_id : "SpR2",
						group_id : "RadB",
						name : "All spell" + (dia.typeSp === "list" ? "s" : dia.typeSp === "book" ? "book spells" : "s known") + " regardless of level"
					});
					if (spCast.known && spCast.known.prepared) {
						diaRadBtns.push({
							type : "radio",
							item_id : "SpR3",
							group_id : "RadB",
							name : "Prepared spells only"
						});
					};
					diaRadBtns.push({
						type : "radio",
						item_id : "SpR4",
						group_id : "RadB",
						name : "Full class list (spells && cantrips)"
					});
				} else {
					diaRadBtns.push({
						type : "radio",
						item_id : "SpR2",
						group_id : "RadB",
						name : "All selected spell" + (dia.typeSp === "list" ? "s" : dia.typeSp === "book" ? "book spells" : "s known")
					});
					diaRadBtns.push({
						type : "radio",
						item_id : "SpR4",
						group_id : "RadB",
						name : "Full list (all spells && cantrips)"
					});
				};

				dia.selectSpRadio = spCast.typeList ? spCast.typeList : spCast.level ? 1 : 2;

				diaDynCol1.push({
					type : "cluster", //radio button cluster
					item_id : "RaCL",
					name : "What Spells to Show?",
					align_children : "align_left",
					alignment : "align_fill",
					char_width : 39,
					font : "heading",
					bold : true,
					elements : diaRadBtns
				});
			};

			//now to create the lists to select spells from, if not a caster that knows all spells on its list
			if (dia.typeSp !== "list") {
				//set the list level to 1 to max set before
				spCast.list.level = [1, spListLevel ? spListLevel[1] : 9];
				// create an array of all the spells
				var listSpRef = CreateSpellList(spCast.list, true, spCast.extra && !spCast.extraSpecial ? spCast.extra : false, false, aCast, spCast.typeSp, true);
				// Create the spell popup object
				dia.listSp = CreateSpellObject(listSpRef);
			}

			// put that level list back in the right variable
			if (spListLevel) {
				spCast.list.level = spListLevel;
			} else {
				delete spCast.list.level;
			}
		} else {
			dia.nmbrCa = 0;
			dia.showCa = false;
			dia.nmbrSp = 0;
			dia.showSp = false;
			dia.typeSp = spCast.typeSp;
			dia.showSpRadio = false;
			var GoAhead = false;
		}

		//set the bonus spell things to their basic value
		dia.nmbrBo = 0;
		dia.offsetBo = spCast.offsetBo ? spCast.offsetBo : 0; //manually added bonus spells
		dia.selectBo = [];
		dia.listBo = [];
		dia.namesBo = [];
		dia.keysBo = [];
		var BonusSpecialActions = {
			prepared : [], //auto prepared
			atwill : [], //at will
			oncelr : [], //once per long rest
			oncesr : [], //once per short rest
			other : [] //others
		}
		//now loop through all the bonus entries, if any
		if (spCast.bonus) { for (var bKey in spCast.bonus) {
			var GoAhead = true;
			var spBonus = spCast.bonus[bKey];
			var loop = isArray(spBonus);
			var loopEnd = loop ? spBonus.length : 1;
			for (var i = 0; i < loopEnd; i++) {
				var spBonusi = loop ? spCast.bonus[bKey][i] : spCast.bonus[bKey];
				var theBonusArray = CreateSpellList(spBonusi, true, false, false, aCast, spCast.typeSp + "-bonus", true);
				var theBonusObject = CreateSpellObject(theBonusArray);

				var iterate = !spBonusi.times ? 1 : isArray(spBonusi.times) ? spBonusi.times[Math.min(spBonusi.times.length, spCast.level) - 1] : spBonusi.times; //if we have to apply this thing multiple times, do so
				for (var y = 1; y <= iterate; y++) {
					dia.nmbrBo += 1; //count the number of bonus things
					dia.listBo.push(theBonusObject); //add object to the array
					dia.namesBo.push(spBonusi.name); //add name to the array
					dia.keysBo.push(bKey); //add key to the array for referencing it later
					BonusSpecialActions.prepared.push(spBonusi.prepared); //those that are autoprepared for referencing it later
					BonusSpecialActions.atwill.push(spBonusi.atwill); //those that are at will for referencing it later
					BonusSpecialActions.oncelr.push(spBonusi.oncelr); //those that are once per long rest for referencing it later
					BonusSpecialActions.oncesr.push(spBonusi.oncesr); //those that are once per long rest for referencing it later
					BonusSpecialActions.other.push(spBonusi.firstCol); //those that are once per long rest for referencing it later
					if (spBonusi.selection && spBonusi.selection[y - 1] && SpellsList[spBonusi.selection[y - 1]]) {
						dia.selectBo.push(spBonusi.selection[y - 1]);
						if (SpellsList[spBonusi.selection[y - 1]].level === 0 && (spBonusi.oncelr || spBonusi.oncesr)) {
							BonusSpecialActions.atwill[y - 1] = true;
							BonusSpecialActions.oncelr[y - 1] = undefined;
							BonusSpecialActions.oncesr[y - 1] = undefined;
						}
					} else {
						dia.selectBo.push(undefined);
					}
				}
			}
		} }
		//fill the rest of the bonus items that are essential
		for (var i = dia.nmbrBo; i < 20; i++) {
			dia.listBo.push(AllSpellsObject);
			dia.namesBo.push("");
			if (spCast.extraBo) dia.selectBo[i] = spCast.extraBo[i - dia.nmbrBo];
		}
		if (dia.showBo)	diaDynCols.push(spDias.spellSelectParts.bonusCluster);

		dia.showAd = spCast.extra ? true : false;
		if (dia.showAd) {
			diaDynCols.push(spDias.spellSelectParts.extraCluster);
			dia.selectAd = OrderSpells(spCast.extra, "single");
			dia.nameAd = dia.typeSp === "list" ? ( spCast.extraSpecial ? "[added to spells known]" : "[always prepared]" ) :
				dia.typeSp === "book" ? ( spCast.extraSpecial ? "[added to known/spellbook]" : "[extra options for spellbook]" ) :
				spCast.extraSpecial ? "[added to spells known]" : "[extra options for spells known]";
		}

		if (!GoAhead) continue; //not a single spellcasting attribute was found, so skip over this entry in the CurrentSpells variable

		// Set the parts of the dialog
			// First the ok / cancel buttons
			setDialogName(dia, "OKbt", "type", dia.typeSp !== "book" ? "ok_cancel" : "ok_cancel_other");
			setDialogName(dia, "OKbt", "ok_name", dia.typeSp !== "book" ? "Continue to Next Dialog >>" : "Add More Spells to the Spellbook");
			// Then the dynamic parts
			setDialogName(spDias.spellSelect, "col1", "elements", diaDynCol1); // add to the 1st column
			setDialogName(spDias.spellSelect, "colE", "elements", diaDynCols); // the rest of the dialog

		thermoTxt = thermoM("Opening the " + spCast.name + " dialog...", false); //change the progress dialog text
		thermoM(0.8);

		//now call the dialog and do something with the results if OK was pressed
		var diaResult = app.execDialog(dia);
		if (diaResult == "cancel") {
			SetStringifieds("spells");
			return "stop"; //don't continue with the rest of the function and let the other function know not to continue either
		} else {
			thermoTxt = thermoM("Processing the " + spCast.name + " dialog...", false); //change the progress dialog text

			if (dia.showCa) {
				spCast.selectCa = dia.selectCa;
				spCast.selectCa.sort();
				spCast.offsetCa = dia.offsetCa;
			}
			if (dia.showSp) {
				spCast.selectSp = OrderSpells(dia.selectSp, "single");
				spCast.offsetSp = dia.offsetSp;
			}
			if (dia.showSpRadio) {
				spCast.typeList = dia.selectSpRadio;
			};
			spCast.selectBo = dia.selectBo;
			spCast.offsetBo = dia.offsetBo;
			spCast.special = {
				prepared : [], //auto prepared
				atwill : [], //at will
				oncelr : [], //once per long rest
				oncesr : [], //once per short rest
				other : {}, //other flags
			};
			var boNmr = 0;
			if (spCast.bonus) {for (var bKey in spCast.bonus) {
				var spBonus = spCast.bonus[bKey];
				var loop = isArray(spBonus);
				var loopEnd = loop ? spBonus.length : 1;
				for (var i = 0; i < loopEnd; i++) {
					var spBonusi = loop ? spCast.bonus[bKey][i] : spCast.bonus[bKey];
					spBonusi.selection = [];

					var iterate = !spBonusi.times ? 1 : isArray(spBonusi.times) ? spBonusi.times[Math.min(spBonusi.times.length, spCast.level) - 1] : spBonusi.times; //if we have to apply this thing multiple times, do so
					for (var y = 1; y <= iterate; y++) {
						if (BonusSpecialActions.prepared[boNmr]) spCast.special.prepared.push(dia.selectBo[boNmr]); //those that are autoprepared for referencing it later
						if (BonusSpecialActions.atwill[boNmr]) spCast.special.atwill.push(dia.selectBo[boNmr]); //those that are usable at will for referencing it later
						if (BonusSpecialActions.oncelr[boNmr]) spCast.special.oncelr.push(dia.selectBo[boNmr]); //those that are usable once per LR for referencing it later
						if (BonusSpecialActions.oncesr[boNmr]) spCast.special.oncesr.push(dia.selectBo[boNmr]); //those that are usable once per SR for referencing it later
						if (BonusSpecialActions.other[boNmr]) spCast.special.other[dia.selectBo[boNmr]] = (/^(atwill|oncelr|oncesr|markedbox|checkbox|checkedbox)$/).test(BonusSpecialActions.other[boNmr]) ? BonusSpecialActions.other[boNmr] : BonusSpecialActions.other[boNmr].substring(0, (/\(.\)|\d-\d/).test(BonusSpecialActions.other[boNmr]) ? 3 : 2); //those that have a special first column, up to two/three characters
						spBonusi.selection.push(dia.selectBo[boNmr]); //set the selection(s)
						boNmr += 1; //count the number of bonus things
					}
				}
			}};
			var EvenMoreBo = [];
			if (spCast.offsetBo > 0) {
				for (var i = boNmr; i < 20; i++) {
					if (dia.selectBo[i]) EvenMoreBo.push(dia.selectBo[i]);
				};
			};
			if (EvenMoreBo.length) {
				spCast.extraBo = EvenMoreBo;
			} else {
				delete spCast.extraBo;
			};

			//if the previous button was pressed, go back one iteration
			if (diaResult == "prev") {
				theI -= 2;
				continue;
			};

			//if it was selected to go set more spells in the spellbook or there are already more spells in the spellbook, open the spellbook dialog now
			if (dia.SpBook || spCast.selectSpSB) {
				thermoTxt = thermoM("Opening the " + spCast.name + " Spellbook dialog...", false); //change the progress dialog text

				// cut the extra spellbook spells into different chunks of 80
				var SBextras = [];
				if (spCast.selectSpSB) {
					for (var si = 0, sj = spCast.selectSpSB.length; si < sj; si += 80) {
						SBextras.push(spCast.selectSpSB.slice(si, si + 80));
					};
				};

				var diaSB = spDias.spellBook;
				diaSB.listSp = dia.listSp;
				diaSB.fullname = dia.fullname;
				diaSB.curCast = dia.curCast;
				var diaSBi = 0;

				// call the dialog, and keep on calling more if more spells need to be added to the spellbook
				do {
					diaSB.iteration = (diaSBi + 1) + "/" + Math.max(diaSBi + 1, SBextras.length, 1);
					diaSB.selectSp = SBextras[diaSBi] ? SBextras[diaSBi] : [];
					setDialogName(diaSB, "bPre", "name", diaSBi == 0 ? "<< Go Back (also Orders Spellbook)" : "<< Go to Previous Spellbook Dialog");
					var diaSBResult = app.execDialog(diaSB);
					// now replace the SBextras entry with the new diaSB.selectSp
					SBextras[diaSBi] = diaSB.selectSp;

					switch (diaSBResult) {
						case "cancel" :
							var contDiaSB = false;
							break;
						case "book" :
							var contDiaSB = true;
							diaSBi += 1;
							break;
						case "ok" :
							diaSBi += 1;
							var contDiaSB = SBextras[diaSBi] && SBextras[diaSBi].length;
							break;
						case "prev" :
							if (diaSBi == 0) { // go back to the class spell dialog
								theI -= 1;
								var contDiaSB = false;
							} else { // go back to the previous spellbook dialog
								diaSBi -= 1;
								var contDiaSB = true;
							};
							break;
					};
				}
				while (contDiaSB);

				// now add all the spells selected in the spellbook dialogs to a single array, together with the spells selected in the original dialog, sort them, and add them back into the proper places
				SBextras = [].concat.apply([], SBextras);
				var totalSelectSp = OrderSpells(spCast.selectSp.concat(SBextras), "single");
				spCast.selectSp = totalSelectSp.slice(0, 20); //the first 20 of the array
				if (totalSelectSp.length > 20) {
					spCast.selectSpSB = totalSelectSp.slice(20); //the rest of the array
				} else {
					delete spCast.selectSpSB;
				};

				// now if the spellbook dialog was cancelled, do not continue with the rest of the function
				if (diaSBResult == "cancel") {
					SetStringifieds("spells");
					return "stop"; //don't continue with the rest of the function and let the other function know not to continue either
				} else if (diaSBResult == "prev") {
					continue;
				};
			};

			//now ask for the spells to prepare, if so selected in the radio buttons
			if (spCast.typeList && spCast.typeList === 3) {
				thermoTxt = thermoM("Opening the " + spCast.name + " prepared spell selection dialog...", false); //change the progress dialog text

				//make a new object for this
				var diaPrep = spDias.spellsPrepared;
				diaPrep.fullname = dia.fullname;
				diaPrep.curCast = dia.curCast;

				//determine how many spells can be prepared
				diaPrep.nmbrPrep = PrepLevel;
				diaPrep.ability = spCast.abilityToUse[0];
				diaPrep.fixedPrepMod = spCast.fixedPrepMod ? spCast.fixedPrepMod : false;

				//make the array of spells that the preparations can come from
				if (spCast.selectSp) { // spellbook
					var selectedSpells = {
						spells : spCast.selectSp,
						level : [1,9]
					};
					//add the spells from the extra spellbook dialog
					if (spCast.selectSpSB) selectedSpells.spells = selectedSpells.spells.concat(spCast.selectSpSB);
					//add the extra spells if the nonconform is set to true
					if (spCast.extra && spCast.extraSpecial) selectedSpells.spells = selectedSpells.spells.concat(spCast.extra);
					var listPrepRef = CreateSpellList(selectedSpells, true, false, false, undefined, undefined, true); //create an array of all the spells that can be prepared from the spells selected in the previous dialog
				} else { // spell list
					var spListLevel = spCast.list.level; //put the level of the list here for safe keeping
					spCast.list.level = [1, maxSpell]; //set the list level to 1 to max level able to cast
					var listPrepRef = CreateSpellList(spCast.list, true, spCast.extra && spCast.extraSpecial ? spCast.extra : false, false, aCast, spCast.typeSp,  true); //create an array of all the spells that can be prepared at this level
					if (spListLevel) { //put that list level back in the right variable
						spCast.list.level = spListLevel;
					} else {
						delete spCast.list.level;
					}
				};
				diaPrep.listSp = CreateSpellObject(listPrepRef); //create the spells popup object

				//set the previously selected spells and the offset, if any was defined
				diaPrep.selectSp = spCast.selectPrep ? spCast.selectPrep : [];
				diaPrep.offsetSp = spCast.blueTxt && spCast.blueTxt.prep ? spCast.blueTxt.prep : 0;

				//call the dialog and do something with the results
				if (app.execDialog(diaPrep) !== "ok") {
					SetStringifieds("spells");
					return "stop"; //don't continue with the rest of the function and let the other function know not to continue either
				} else {
					//save the new variables
					spCast.selectPrep = OrderSpells(diaPrep.selectSp, "single");
					if (spCast.blueTxt) {
						spCast.blueTxt.prep = diaPrep.offsetSp;
					} else {
						spCast.blueTxt = {prep : diaPrep.offsetSp};
					}
				}
			}
		}
	};

	var toReturn = classesArray.length > 0;

	// If any spellcasting classes exist, open a dialog asking for which of those should be put on the spell sheet pages
	if (classesArray.length > 0) {
		// Make the process bar show some text now, because the last thing shown before a dialog is shown is what is left during the spell sheet generation process
		var thermoTxt = thermoM("Generating the Spell Sheet(s), Acrobat will be unresponsive for a long time..."); //change the progress dialog text

		//first see how the lists are doing
		if (!CurrentCasters.excl && !CurrentCasters.incl) { //no list exists yet, so lets make one
			CurrentCasters.excl = [];
			CurrentCasters.incl = classesArray; //all are included in the order they were found
		} else { //there are lists, but we first need to check if all entries are accounted for
			for (var i = 0; i < CurrentCasters.excl.length; i++) {
				if (!CurrentSpells[CurrentCasters.excl[i]]) {
					CurrentCasters.excl.splice(i, 1);
					i = i - 1;
				}
			}
			for (var i = 0; i < CurrentCasters.incl.length; i++) {
				if (!CurrentSpells[CurrentCasters.incl[i]]) {
					CurrentCasters.incl.splice(i, 1);
					i = i - 1;
				}
			}

			//now see if all of the ones we know are accounted for; if not found, add it to the included array
			for (var i = 0; i < classesArray.length; i++) {
				if (CurrentCasters.incl.indexOf(classesArray[i]) === -1 && CurrentCasters.excl.indexOf(classesArray[i]) === -1) CurrentCasters.incl.push(classesArray[i]);
			}
		}

		//convert the incl and excl CurrentSpells arrays to their named counterparts
		var exclNames = [];
		var inclNames = [];
		for (var i = 0; i < CurrentCasters.excl.length; i++) {
			exclNames.push(CurrentSpells[CurrentCasters.excl[i]].name);
		}
		for (var i = 0; i < CurrentCasters.incl.length; i++) {
			inclNames.push(CurrentSpells[CurrentCasters.incl[i]].name);
		}

		//now add them to the dialog and let the user make a decision
		spDias.sheetOrder.bExcL = exclNames;
		spDias.sheetOrder.bIncL = inclNames;
		spDias.sheetOrder.glossary = CurrentCasters.glossary ? true : false;
		spDias.sheetOrder.dashEmptyFields = CurrentCasters.emptyFields ? false : true;
		spDias.sheetOrder.amendSpellDescriptions = CurrentCasters.amendSpDescr || CurrentCasters.amendSpDescr === undefined ? true : false;
		spDias.sheetOrder.allowSpellAdd = CurrentCasters.allowSpellAdd || CurrentCasters.allowSpellAdd === undefined ? true : false;
		if (app.execDialog(spDias.sheetOrder) !== "ok") {
			toReturn = "stop"; //don't continue with the rest of the function and let the other function know not to continue either
		} else {
			var exclList = spDias.sheetOrder.bExcL;
			var inclList = spDias.sheetOrder.bIncL;

			//now convert the IncL and ExcL spDias.sheetOrder array to their keyed counterparts
			for (var aCast in CurrentSpells) {
				var CSname = CurrentSpells[aCast].name;
				var inExcl = exclList.indexOf(CSname);
				var inIncl = inclList.indexOf(CSname);
				if (inExcl !== -1) {
					exclList[inExcl] = aCast;
				} else if (inIncl !== -1) {
					inclList[inIncl] = aCast;
				}
			}

			//and put the two arrays back into the document level variable CurrentSpells
			CurrentCasters.excl = exclList;
			CurrentCasters.incl = inclList;
			CurrentCasters.glossary = spDias.sheetOrder.glossary;
			CurrentCasters.emptyFields = !spDias.sheetOrder.dashEmptyFields;
			CurrentCasters.amendSpDescr = spDias.sheetOrder.amendSpellDescriptions;
			CurrentCasters.allowSpellAdd = spDias.sheetOrder.allowSpellAdd;
		}
		thermoM(0.5); //progress the progress dialog so that it looks like something is happening (don't close it yet)
	}

	//now save the updated CurrentSpells and CurrentCasters variables to the field
	SetStringifieds("spells");
	if (toReturn == "stop" || !toReturn) thermoM(thermoTxt, true); // Stop progress bar
	return toReturn;
}

//generate the spell sheet for all the different classes
function GenerateSpellSheet(GoOn) {
	//first ask the user for input on what to do with all the spellcasting classes
	if (!GoOn) var GoOn = AskUserSpellSheet();

	if (!GoOn) {
		var toAsk = {
			cMsg : "It seems as though your character has no spellcasting abilities. Make sure that there is something to make a Spell Sheet for.\n\nIt could be that they are not yet implemented or that they have been overlooked. If you think something is going wrong, please contact MorePurpleMoreBetter (flapkan@gmail.com).\n\nWould you instead like to remove any current Spell Sheet(s) and add an empty one that can be filled manually? You can then add/remove more pages using the \"Spells\" and \"Layout\" buttons in the \"JavaScript Window\" or in the bookmarks.\n\nRemoving the Spell Sheets cannot be undone!",
			nIcon : 1,
			cTitle : "No spellcasting found",
			nType : 2, //Yes-No
		}
		if (app.alert(toAsk) === 4) {
			RemoveSpellSheets();
			DoTemplate("SSfront", "Add");
		}
		return; // do not continue with this function for it is pointless
	} else if (GoOn === "stop") {
		// do not continue with this function if one of the dialogs was cancelled, but do recalculate in case a selection changed
		tDoc.calculateNow();
		return false;
	}

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Generating the Spell Sheet(s), Acrobat will be unresponsive for a long time...");
	thermoM(1/(CurrentCasters.incl.length + 3)); //increment the progress dialog's progress
	calcStop();

	//then we remove all the existing sheets (if any)
	RemoveSpellSheets();

	thermoM(2/(CurrentCasters.incl.length + 3)); //increment the progress dialog's progress

	var lineMax = FieldNumbers.spells[0]; //set the maximum we can go on this sheet
	var lineCurrent = 0; //set the current line on the Spell Sheet
	var headerCurrent = 0; //set the current header on the Spell Sheet
	var dividerCurrent = 0; //set the current divider on the Spell Sheet
	var prefixCurrent = ""; //set the current prefix on the Spell Sheet
	var SSfront = false; //set the state of on which Spell Sheet we are working

	//define a function for adding a new page
	var SpellPages = 1;
	var AddPage = function() {
		//add one more page and set the corresponding prefix to the variable
		prefixCurrent = DoTemplate("SSmore", "Add");
		SpellPages += 1;
		//now reset all the incremental variables to 0;
		lineMax = FieldNumbers.spells[1];
		lineCurrent = 0;
		headerCurrent = 0;
		dividerCurrent = 0;
		SSfront = false;
	};

	//now use the newly acquired CurrentSpells information to make a Spell Sheet addition for every entry in the included list
	var isFirst = 0;
	for (var i = 0; i < CurrentCasters.incl.length; i++) {
		var spCast = CurrentSpells[CurrentCasters.incl[i]];

		//get a list of all the spells to put on the Spell Sheet
		var fullSpellList = spCast.selectBo ? spCast.selectBo : [];
		if (spCast.selectCa) fullSpellList = fullSpellList.concat(spCast.selectCa); //add the cantrips
		if (spCast.typeList === 3 && spCast.selectPrep) { //if it has been selected to only do the prepared spells, only add those
			fullSpellList = fullSpellList.concat(spCast.selectPrep);
		} else if (spCast.selectSp) { //otherwise add all the selected spells, if any
			fullSpellList = fullSpellList.concat(spCast.selectSp); //add the spells
			if (spCast.selectSpSB) fullSpellList = fullSpellList.concat(spCast.selectSpSB); //add the spells from the extra spellbook dialog
		}

		var alwaysPrepared = spCast.special ? spCast.special.prepared : []; //make an array of spells that are considered always prepared, starting with the bonus spells that have that flag
		var atwillArray = spCast.special ? spCast.special.atwill : [];
		var oncelrArray = spCast.special ? spCast.special.oncelr : [];
		var oncesrArray = spCast.special ? spCast.special.oncesr : [];
		var otherObject = spCast.special ? spCast.special.other : {};
		var addToFullList = false;

		if (spCast.extra && (spCast.extraSpecial || spCast.typeSp === "list")) {
			var extraSpells = spCast.extra;
			if (spCast.typeList === 3 && spCast.extraSpecial) {
				// if set to only show prepared spells && nonconform use of extra spells, then the `extra` spells above 1st-level are already included in those selected as prepared, so don't add them again here. We do that by only selecting the cantrips
				extraSpells = OrderSpells(extraSpells, "single", false, false, 0);
			} else if (spCast.typeSp === "list" && !spCast.extraSpecial) {
				var extraNoCantrips = OrderSpells(extraSpells, "multi"); // always exclude the cantrips
				extraNoCantrips.shift(); // remove the cantrips
				extraNoCantrips = [].concat.apply([], extraNoCantrips); // reduce to single array
				alwaysPrepared = alwaysPrepared.concat(extraNoCantrips); // and add them to the always prepared array
			};
			fullSpellList = fullSpellList.concat(extraSpells); //add the extra spells
		} else if (spCast.extra && spCast.typeList === 4) {
			addToFullList = true;
		};

		var knownSpells = fullSpellList; //put the total list of selected spells here for safekeeping before we add more to this list

		if (addToFullList) fullSpellList = fullSpellList.concat(spCast.extra); //add the extra spells if there are extra to choose from, but not auto known/prepared

		//now add the general list, if chosen to do the full class list or if this is a 'list' spellcaster that didn't chose to only do the prepared spells
		if (spCast.typeList === 4 || (spCast.typeSp === "list" && spCast.typeList !== 3)) {
			var spListLevel = spCast.list.level; //put the level of the list here for safe keeping
			// Set the list level to generate
			var iLowestLevel = spListLevel ? spListLevel[0] : 0;
			spCast.list.level = [
				spCast.typeList === 4 ? iLowestLevel : Math.max(iLowestLevel, 1),
				spCast.factor && spCast.factor[1] == "warlock" ? 9 : spListLevel ? spListLevel[1] : 9
			];

			//add the full spell list of the class
			var fullClassSpellList = CreateSpellList(spCast.list, false, false, false, CurrentCasters.incl[i], spCast.typeSp);
			fullSpellList = fullSpellList.concat(fullClassSpellList);

			if (spListLevel) { //put that level list back in the right variable
				spCast.list.level = spListLevel;
			} else {
				delete spCast.list.level;
			}
		};

		//now see if we have any spells to add to the spell sheet for this class. If not, skip this class
		var testArray = removeEmptyValues(fullSpellList);
		if (testArray.length === 0) {
			if (isFirst === i) isFirst += 1;
			continue;
		};

		//add "Me" or "Kn" to the column headers or not?
		var MeKn = spCast.firstCol !== undefined ? "##" + spCast.firstCol :
		spCast.known && spCast.known.prepared && spCast.typeList !== 3 ? (spCast.typeSp === "book" && spCast.typeList === 4 ? "##sb" : "##me") :
		spCast.typeList === 4 || (/race|feat|item/i).test(spCast.typeSp) ? "##kn" : "##"; 

		//see if we need to stop short of doing all the spells
		var maxLvl = 9;
		if (spCast.level && spCast.typeList !== 2 && spCast.typeList !== 4) {
			if (spCast.maxSpell && (!spCast.factor || spCast.factor[1] != "warlock")) {
				maxLvl = spCast.maxSpell;
			} else if (spCast.factor && (tDoc[spCast.factor[1] + "SpellTable"] || spCast.spellsTable)) {
				var CasterLevel = Math.ceil(spCast.level / Math.max(1, spCast.spellsTable ? 1 : spCast.factor[0]));
				var theTable = spCast.spellsTable ? spCast.spellsTable : tDoc[spCast.factor[1] + "SpellTable"];
				var tableLevel = Math.min(theTable.length - 1, CasterLevel);
				var maxSpell = theTable[tableLevel].trailingIndexOf(0);
				maxLvl = Number(maxSpell === -1 ? 9 : maxSpell);
			};
		};

		var orderedSpellList = OrderSpells(fullSpellList, "multi", true, spCast.selectBo ? spCast.selectBo : [], maxLvl); //get an array of 12 arrays, one for each spell level, and 2 final ones for the psionic talents/disciplines

		if (i === isFirst) {
			SSfront = true;
			prefixCurrent = DoTemplate("SSfront", "Add"); //for the first entry we need to make the template
		};

		//now sort each of those new arrays and put them on the sheet
		var start = true;
		var isPsionics = "";
		for (var lvl = 0; lvl <= orderedSpellList.length; lvl++) {
			// once we surpass the highest level (9) now do the psionic talents/disciplines
			if (lvl === 10) {
				isPsionics = "psionic";
				MeKn = spCast.firstCol !== undefined ? "##" + spCast.firstCol : "##pp";
			}
			var spArray = orderedSpellList[lvl];
			if (!spArray || !spArray.length) continue;
			//add spell dependencies to fill out the array
			spArray = addSpellDependencies(spArray);
			//first test if there is enough space left on the current page to add what we need to
			//assume that we need to add at least 10 of the spells, the total of this level of spells, whichever is less
			// so 3 (divider + title line) + 4 (header, if applicable) + lowest of [10, arrayLength]
			var needSpace = 3 + (start ? 4 : 0) + Math.min(10, spArray.length);
			if (needSpace > (lineMax - lineCurrent + 1)) AddPage();

			//the first spells to add needs a header in front of it
			if (start) {
				if (lineCurrent === 0 && SSfront) {
					SetSpellSheetElement(prefixCurrent + "spells.remember.0", "header", 0, CurrentCasters.incl[i], false);
				} else {
					Value(prefixCurrent + "spells.remember." + lineCurrent, "setheader##" + CurrentCasters.incl[i] + "##" + headerCurrent);
					lineCurrent += 4;
				}
				headerCurrent += 1;
				start = false;
			}

			//then add the divider
			if (lineCurrent === 0 && SSfront) {
				SetSpellSheetElement(prefixCurrent + "spells.remember.0", "divider", 0, lvl, false);
			} else {
				Value(prefixCurrent + "spells.remember." + lineCurrent, "setdivider##" + lvl + "##" + dividerCurrent);
				lineCurrent += 2;
			}
			dividerCurrent += 1;

			//then add the title line
			Value(prefixCurrent + "spells.remember." + lineCurrent, isPsionics + "setcaptions" + ((lvl === 0 || lvl === 10) && spCast.typeList === 4 && spCast.firstCol === undefined ? "##kn" : MeKn));
			lineCurrent += 1;

			for (var y = 0; y < spArray.length; y++) {
				aSpell = spArray[y];
				var notDupl = y ? aSpell != spArray[y - 1] : true;
				//check if not at the end of the page and, if so, create a new page
				if (lineCurrent > lineMax) AddPage();
				var toCheck = "##";
				if (notDupl && atwillArray.indexOf(aSpell) !== -1) {
					toCheck = "##atwill";
				} else if (notDupl && oncelrArray.indexOf(aSpell) !== -1) {
					toCheck = "##oncelr";
				} else if (notDupl && oncesrArray.indexOf(aSpell) !== -1) {
					toCheck = "##oncesr";
				} else if (notDupl && alwaysPrepared.indexOf(aSpell) !== -1 && spCast.typeList !== 3) {
					toCheck = "##markedbox";
				} else if (notDupl && otherObject[aSpell]) {
					toCheck = "##" + otherObject[aSpell];
				} else if (SpellsList[aSpell] && SpellsList[aSpell].firstCol === undefined && (isPsionics || spCast.typeList === 4 || (spCast.known && spCast.known.prepared && spCast.typeList !== 3))) {
					toCheck = spCast.typeList === 4 ? (knownSpells.indexOf(aSpell) !== -1 ? "##checkedbox" : "##checkbox") : SpellsList[aSpell].level === 0 ? "##atwill" : "##checkbox";
				}
				Value(prefixCurrent + "spells.remember." + lineCurrent, aSpell + toCheck + "##" + CurrentCasters.incl[i] + (notDupl ? "" : "##stop"));
				lineCurrent += 1;
			}
		}

		thermoM((2 + 1)/(CurrentCasters.incl.length + 3)); //increment the progress dialog's progress
	}

	//after the end of the last run, add a glossary, if so selected
	if (CurrentCasters.glossary) {
		if ((lineCurrent + 11) > lineMax) AddPage();
		//then add the glossary
		Value(prefixCurrent + "spells.remember." + lineCurrent, "setglossary");
	}

	var SSvisible = isTemplVis("SSfront", true);
	if (SSvisible[0]) tDoc.getField(SSvisible[1] + "spells.name.0").setFocus(); // set the focus to the top of the Spell Sheet
	thermoM(thermoTxt, true); // Stop progress bar

	return true;
}

//remove all visible spell sheets and reset the template remember fields
function RemoveSpellSheets(noFirst) {
	if (tDoc.info.SpellsOnly) tDoc.getTemplate("blank").spawn(0, false, false);
	DoTemplate("SSmore", "removeall", false, true);
	DoTemplate("SSfront", "removeall", false, true);
	if (tDoc.info.SpellsOnly) {
		var forFirst = noFirst ? "SSmore" : "SSfront";
		tDoc.getTemplate(forFirst).spawn(0, true, false);
		Value("Template.extras." + forFirst, ",P0." + forFirst + ".");
		try {
			tDoc.deletePages(1);
		} catch (theError) {
			if (theError.toString().indexOf("One or more pages are in use and could not be deleted") !== -1 && tDoc.numPages === 1) tDoc.deletePages(1);
		}
	}
};

//make menu for the spell options button
function MakeSpellMenu() {
	//see if the Spell Sheets are visible
	var SSvisible = What("Template.extras.SSfront") !== "" || What("Template.extras.SSmore") !== "";
	var SSmultiple = What("Template.extras.SSmore").split(",").length > 2 || (What("Template.extras.SSfront") !== "" && What("Template.extras.SSmore") !== "");

	//make a list of all the spell sources
	var SpellSourcesArray = [];
	var SpellSourcesCheck = [];
	for (var aSpell in SpellsList) {
		var aSpellSource = parseSource(SpellsList[aSpell].source);
		aSpellSource = aSpellSource ? aSpellSource[0][0] : "HB";
		if (SpellSourcesCheck.indexOf(aSpellSource) === -1) {
			SpellSourcesCheck.push(aSpellSource);
			SpellSourcesArray.push([SourceList[aSpellSource].name, aSpellSource]);
		}
	}

	//use the global variable of all spellcasting and psionic classes
	var CasterClasses = [];
	for (var i = 2; i < AllCasterClasses.length; i++) {
		var sClass = AllCasterClasses[i];
		if (sClass === "any") continue;
		var sClassName = sClass === "-" ? "" : ClassList[sClass] ? ClassList[sClass].name : ClassSubList[sClass] ? ClassSubList[sClass].subname : sClass.capitalize();
		CasterClasses.push([sClass === "-" ? sClass : "with all " + sClassName + " spells", sClass]);
	};
	for (var i = 1; i < AllPsionicClasses.length; i++) {
		var sClass = AllPsionicClasses[i];
		if (sClass === "any") continue;
		var sClassName = sClass === "-" ? "" : ClassList[sClass] ? ClassList[sClass].name : ClassSubList[sClass] ? ClassSubList[sClass].subname : sClass.capitalize();
		CasterClasses.push([sClass === "-" ? sClass : "with all " + sClassName + " psionics", sClass]);
	};
	if (CasterClasses.slice(-1)[0][0] !== "-") 	CasterClasses.push("-"); //add a hyphen, if it is not there already
	CasterClasses = CasterClasses.concat([
		["with all spells, sorted alphabetically", "alphabetical"],
		["with all spells, sorted by level", "grouped by level"]
	]);

	//see if their are any number of spellcasting things
	var anyCasters = false;
	for (var key in CurrentSpells) {
		anyCasters = true;
		break;
	};

	var menuLVL2 = function (menu, name, array) {
		var temp = [];
		temp.cName = name[0];
		temp.oSubMenu = [];
		var isMarked = false;
		for (var i = 0; i < array.length; i++) {
			switch (name[1]) {
			 case "slots" :
				isMarked = array[i][1] === RememberSlots;
				break;
			}
			temp.oSubMenu.push({
				cName : array[i][0],
				cReturn : "ssheet#" + name[1] + "#" + array[i][1] + "#" + isMarked,
				bMarked : isMarked
			})
		}
		menu.push(temp);
	};

	var spellsMenu = [];
	//an option to generate a (new) spell sheet automatically
	if (!tDoc.info.SpellsOnly) {
		spellsMenu.push({
			cName : (SSvisible ? "(Re)g" : "G") + "enerate a Spell Sheet" + (anyCasters ? "" : " (no spellcasting detected)"),
			cReturn : "ssheet#generate",
			bEnabled : anyCasters
		});
	}

	//an option to generate a 'complete' spell sheet
	menuLVL2(spellsMenu, [SSvisible ? "Replace Spell Sheets with 'Complete' Spell Sheet" : "Make a 'Complete' Spell Sheet", "complete"], CasterClasses);

	//an option to make an empty spell sheet
	if (!tDoc.info.SpellsOnly) {
		spellsMenu.push({
			cName : SSvisible ? "Replace Spell Sheets with empty one (to fill manually)" : "Add an empty Spell Sheet (to fill manually)",
			oSubMenu : [{
				cName : "Without text lines",
				cReturn : "ssheet#makeempty"
			}, {
				cName : "With text lines",
				cReturn : "ssheet#makeempty#lines"
			}, {
				cName : "With text lines and checkboxes",
				cReturn : "ssheet#makeempty#lines#boxes"
			}]
		});
	}

	//an option to add an extra empty page
	if (SSvisible) {
		spellsMenu.push({
			cName : "Add an empty Spell Sheet page (to fill manually)",
			oSubMenu : [{
				cName : "Without text lines",
				cReturn : "ssheet#addempty"
			}, {
				cName : "With text lines",
				cReturn : "ssheet#addempty#lines"
			}, {
				cName : "With text lines and checkboxes",
				cReturn : "ssheet#addempty#lines#boxes"
			}]
		});
	}

	//options to delete the current pages
	spellsMenu = spellsMenu.concat([{
		cName : "-"
	}, {
		cName : "Delete all the Spell Sheet(s) (can't be undone)",
		cReturn : "ssheet#delete",
		bEnabled : SSvisible
	}, {
		cName : "Delete the last page of the Spell Sheets (can't be undone)",
		cReturn : "ssheet#" + (SSmultiple ? "deleteone" : "delete"),
		bEnabled : !tDoc.info.SpellsOnly ? SSvisible : SSmultiple
	}, {
		cName : "-"
	}, {
		cName : "Spell sources to use (set before generating)",
		cReturn : "ssheet#source"
	}, {
		cName : "-"
	}]);

	//get the current state of where to show the Spell Slots
	var RememberSlots = What("SpellSlotsRemember");

	if (!typePF && !tDoc.info.SpellsOnly) {
		menuLVL2(spellsMenu, ["Where to show Spell Slots (Spell Points)", "slots"], [["On Spell Sheet", "[false,true]"], ["On first page (in Limited Features)", "[true,false]"], ["On both Spell Sheet and first page", "[true,true]"], ["-", "-"], ["Use Spell Points instead of Spell Slots", "[false,false]"]]);
	} else if (tDoc.info.SpellsOnly) {
		var slotsVisible = What("Template.extras.SSfront") ? isDisplay("P0.SSfront.SpellSlots.CheckboxesSet.lvl1") > 1 : false;
		var spellPointsVis = What("Template.extras.SSfront") ? RememberSlots === "[false,false]" : false;

		//options to show/hide spell slot modifier fields
		spellsMenu = spellsMenu.concat([{
			cName : "Change the number of Spell Slot checkboxes",
			cReturn : "ssheet#toggleslots",
			bMarked : slotsVisible,
			bEnabled : !spellPointsVis
		}, {
			cName : "Use Spell Points instead of Spell Slots",
			cReturn : "ssheet#" + (typePF ? "spellpoints" : "slots#" + (spellPointsVis ? "[false,true]" : "[false,false]") + "#false"),
			bMarked : spellPointsVis,
			bEnabled : What("Template.extras.SSfront") !== ""
		}]);
	} else if (typePF) {
		//options to toggle the use of spell points
		spellsMenu = spellsMenu.concat([{
			cName : "Use Spell Points instead of Spell Slots",
			cReturn : "ssheet#spellpoints",
			bMarked : RememberSlots === "[false,false]"
		}]);
	}

	// An option to see the CurrentEvals explanations
	spellsMenu = spellsMenu.concat([{
		cName : "-"
	}, {
		cName : "Show things changing the spell automations",
		cReturn : "ssheet#showcalcs",
		bEnabled : ObjLength(CurrentEvals.spellStr) ? true : false
	}]);

	Menus.spells = spellsMenu;
};

//create the spell menu and do something with the menu and its results
function MakeSpellMenu_SpellOptions(MenuSelection) {
	if (!MenuSelection) {
		MakeSpellMenu();
		//now call the menu
		MenuSelection = getMenu("spells");
	};

	//and do something with this menus results
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	//see if the Spell Sheets are visible
	var SSvisible = What("Template.extras.SSfront") !== "" || What("Template.extras.SSmore") !== "";
	var SSmultiple = What("Template.extras.SSmore").split(",").length > 2 || (What("Template.extras.SSfront") !== "" && What("Template.extras.SSmore") !== "");
	switch (MenuSelection[1]) {
	 case "generate" :
		GenerateSpellSheet();
		break;
	 case "makeempty" :
		if (SSvisible) {
			var asking = {
				cMsg : "Unfortunately it is not possible to hide the Spell Sheet. They can only be deleted.\n\nDo you want to remove all the Spell Sheets except the first one and remove the content of the first one?\nYou can then manually fill out the Spell Sheet and add/remove more pages using the \"Layout\" and \"Spells\" buttons in the \"JavaScript Window\" or in the bookmarks.\n\nRemoving the Spell Sheets cannot be undone!",
				cTitle : "Delete all the Spell Sheets",
				nIcon : 2, //question
				nType : 2, //Yes-No
			}
			var goThrough = app.alert(asking);
		} else {
			var goThrough = 4;
		}

		if (goThrough === 4) {
			if (SSvisible) RemoveSpellSheets();
			var thePrefix = DoTemplate("SSfront", "Add");
			if (MenuSelection[2] === "lines") {
				AddSpellSheetTextLines(thePrefix, MenuSelection[3] === "boxes", FieldNumbers.spells[0]);
			}
		}
		break;
	 case "addempty" :
		var thePrefix = DoTemplate("SSmore", "Add");
		if (MenuSelection[2] === "lines") {
			AddSpellSheetTextLines(thePrefix, MenuSelection[3] === "boxes");
		}
		break;
	 case "delete" :
		RemoveSpellSheets();
		break;
	 case "deleteone" :
		DoTemplate("SSmore", "Remove");
		break;
	 case "source" :
		resourceDecisionDialog();
		break;
	 case "slots" :
		if (MenuSelection[3] != "true") { //it wasn't marked, so something is about the change
			Value("SpellSlotsRemember", MenuSelection[2]);
			SetSpellSlotsVisibility();
			if (MenuSelection[2] === "[false,false]") {
				SpellPointsLimFea("Add");
				Show("Image.SpellPoints");
				Show("SpellSlots.Checkboxes.SpellPoints");
				var SSfrontA = What("Template.extras.SSfront").split(",")[1];
				if (SSfrontA) {
					Show(SSfrontA + "Image.SpellPoints");
					Show(SSfrontA + "SpellSlots.Checkboxes.SpellPoints");
				};
				ShowSpellPointInfo();
			} else {
				SpellPointsLimFea("Remove");
				Hide("Image.SpellPoints");
				Hide("SpellSlots.Checkboxes.SpellPoints");
				var SSfrontA = What("Template.extras.SSfront").split(",")[1];
				if (SSfrontA) {
					Hide(SSfrontA + "Image.SpellPoints");
					Hide(SSfrontA + "SpellSlots.Checkboxes.SpellPoints");
				};
			};
		};
		break;
	 case "complete" :
		GenerateCompleteSpellSheet(MenuSelection[2]);
		break;
	 case "toggleslots" :
		var hiddenNoPrint = isDisplay("P0.SSfront.SpellSlots.CheckboxesSet.lvl1") > 1 ? "Hide" : "DontPrint";
		for (var ss = 1; ss <= 9; ss++) {
			tDoc[hiddenNoPrint]("P0.SSfront.SpellSlots.CheckboxesSet.lvl" + ss);
		}
		break;
	 case "spellpoints" :
		ToggleSpellPoints();
		break;
	 case "showcalcs" :
		var sSpellEvals = StringEvals(["spellStr", "spellAtkStr"]);
		if (sSpellEvals) ShowDialog("Things Affecting the Spell Automation", sSpellEvals);
		break;
	};
};

//a function that takes an array of spells and orders it by level (and alphabet)
//outputFormat defines whether to return an Array of Arrays ("multi"), or just one array "single";
function OrderSpells(inputArray, outputFormat, sepPsionics, bonusSp, maxLvl) {
	if (!isArray(bonusSp)) bonusSp = [];
	if (maxLvl === undefined) maxLvl = 9;
	var refspObj = {};
	var orderedSpellList = [[], [], [], [], [], [], [], [], [], []]; //array of 10 arrays, one for each spell level
	if (sepPsionics) { //add two more arrays, for the psionics
		orderedSpellList[10] = [];
		orderedSpellList[11] = [];
	};
	//put these spells into their right level-array in orderedSpellList and ignore duplicates
	for (var S = 0; S < inputArray.length; S++) {
		var nxtSpell = inputArray[S];
		if (!SpellsList[nxtSpell]) continue;
		var spLvl = SpellsList[nxtSpell].level;
		if (spLvl > maxLvl && bonusSp.indexOf(nxtSpell) == -1) continue;
		if (inputArray.indexOf(nxtSpell) === S || (spLvl <= maxLvl && bonusSp.indexOf(nxtSpell) !== -1)) {
			var spName = getSpNm(nxtSpell);
			if (sepPsionics && SpellsList[nxtSpell].psionic) spLvl += 10;
			refspObj[spName] = nxtSpell;
			orderedSpellList[spLvl].push(spName);
		};
	};

	//now make sure all of them are sorted
	for (var i = 0; i < orderedSpellList.length; i++) {
		orderedSpellList[i].sort();
		for (var s = 0; s < orderedSpellList[i].length; s++) {
			orderedSpellList[i][s] = refspObj[orderedSpellList[i][s]];
		};
	};

	var returnArray = [];
	switch (outputFormat) {
	 case "single" :
		for (var i = 0; i < orderedSpellList.length; i++) returnArray = returnArray.concat(orderedSpellList[i]);
		break;
	 default :
	 case "multi" :
		returnArray = orderedSpellList;
		break;
	};

	return returnArray;
};

//return the value of a spellsheet's number (field calculation)
function CalcSpellsheetNumber() {
	var prefix = event.target.name.substring(0, event.target.name.indexOf("SpellSheet"));
	var SSmoreA = What("Template.extras.SSmore").split(",");
	SSmoreA[0] = What("Template.extras.SSfront").split(",")[1];
	if (!SSmoreA[0]) SSmoreA.shift();
	return MakeDocName() + (tDoc.info.SpellsOnly ? "; page " : "; Spell Sheet ") + (SSmoreA.indexOf(prefix) + 1) + "/" + SSmoreA.length;
}

//make a menu of all the spells, sorted by caster
function ParseSpellMenu() {
	//define a function for creating the full set of spells-by-level menu for a class
	var createMenu = function(menu, className, fullArray) {
		var nameArray = ["All spells"].concat(spellLevelList);
		var classTemp = {cName : className, oSubMenu : []};
		for (var y = 0; y < fullArray.length; y++) {
			var spellsArray = fullArray[y];
			if (spellsArray.length > 0) {
				var spellsTemp = {cName : nameArray[y], oSubMenu : []};
				for (var i = 0; i < spellsArray.length; i++) {
					spellsTemp.oSubMenu.push({
						cName : SpellsList[spellsArray[i]].name + (SpellsList[spellsArray[i]].ritual ? " (R)" : ""),
						cReturn : "spell" + "#" + spellsArray[i] + "#"
					})
				}
				classTemp.oSubMenu.push(spellsTemp);
			}
		}
		menu.oSubMenu.push(classTemp);
	}

	var amendMenu = function(theMenu, nameChange, extraReturn) {
		theMenu.cName = nameChange;
		for (var a = 0; a < theMenu.oSubMenu.length; a++) {
			if (theMenu.oSubMenu[a].cName === "-") continue;
			for (var b = 0; b < theMenu.oSubMenu[a].oSubMenu.length; b++) {
				if (theMenu.oSubMenu[a].oSubMenu[b].cName === "-") continue;
				for (var c = 0; c < theMenu.oSubMenu[a].oSubMenu[b].oSubMenu.length; c++) {
					if (theMenu.oSubMenu[a].oSubMenu[b].oSubMenu[c].cName === "-") continue;
					theMenu.oSubMenu[a].oSubMenu[b].oSubMenu[c].cReturn += extraReturn;
				}
			}
		}
	}

	var allSpellCasters = [
		"any",
		"-",
		"bard",
		"cleric",
		"druid",
		"paladin",
		"ranger",
		"sorcerer",
		"warlock",
		"wizard",
		"-"
	];

	var moreSpellCasters = [];
	for (var aClass in ClassList) {
		if (aClass === "rangerua") continue;
		if (ClassList[aClass].spellcastingFactor && !(/psionic/i).test(ClassList[aClass].spellcastingFactor)) {
			if (allSpellCasters.indexOf(aClass) === -1 && moreSpellCasters.indexOf(aClass) === -1 && !testSource(aClass, ClassList[aClass], "classExcl")) moreSpellCasters.push(aClass);
		} else {
			var subClasses = ClassList[aClass].subclasses[1];
			for (var SC = 0; SC < subClasses.length; SC++) {
				var aSubClass = subClasses[SC];
				if (ClassSubList[aSubClass].spellcastingFactor && !(/psionic/i).test(ClassSubList[aSubClass].spellcastingFactor) && allSpellCasters.indexOf(aSubClass) === -1 && moreSpellCasters.indexOf(aSubClass) === -1 && !testSource(aSubClass, ClassSubList[aSubClass], "classExcl")) moreSpellCasters.push(aSubClass);
			}
		}
	};

	moreSpellCasters.sort();
	allSpellCasters = allSpellCasters.concat(moreSpellCasters);

	//now see if this newly created list matches the known caster classes
	if (AllCasterClasses && AllCasterClasses.toSource() === allSpellCasters.toSource()) {
		return AddSpellsMenu;
	} else {
		AllCasterClasses = allSpellCasters;
	};

	var AllSpellsMenu = {cName : "without first column", oSubMenu : []};
	for (var s = 0; s < allSpellCasters.length; s++) {
		var aCast = allSpellCasters[s];
		var aObj = ClassList[aCast] ? ClassList[aCast] : (ClassSubList[aCast] ? ClassSubList[aCast] : false);
		if (aCast === "-") {
			AllSpellsMenu.oSubMenu.push({cName : "-"});
			continue;
		}
		var aCastClass = aObj && aObj.spellcastingList ? aObj.spellcastingList : {class : aCast, psionic : false};
		var aCastName = aCast === "any" ? "All spells" : (aObj.fullname ? aObj.fullname : aObj.subname ? aObj.subname : aObj.name) + " spells";

		//get a list of all the spells in the class' spell list and sort it
		var allSpells = CreateSpellList(aCastClass, false);
		allSpells.sort();

		//now make an array with one array for each spell level
		var spellsByLvl = OrderSpells(allSpells, "multi");
		//and add the complete list to as the first of the by level array
		spellsByLvl.unshift(allSpells);

		//now create amenu for this class and add it to the submenu array of AllSpellsMenu
		createMenu(AllSpellsMenu, aCastName, spellsByLvl);
	};

	//start an array of the different menus
	var spellsMenuArray = [AllSpellsMenu];

	//now to do something that makes it possible to copy this object multiple times
	var menuString = AllSpellsMenu.toSource();

	var menuExtraTypes = [
		["with a Checkbox", "checkbox"],
		["with an 'Always Prepared' Checkbox", "markedbox"],
		["with 'At Will'", "atwill"],
		["with '1\xD7 Long Rest'", "oncelr"],
		["with '1\xD7 Short Rest'", "oncesr"],
		["Ask me for the first column", "askuserinput"]
	]
	//add a menu with a changed name
	for (var e = 0; e < menuExtraTypes.length; e++) {
		var aMenu = eval_ish(menuString);
		amendMenu(aMenu, menuExtraTypes[e][0], menuExtraTypes[e][1]);
		spellsMenuArray.push(aMenu);
	}

	//return the newly formed array
	return spellsMenuArray;
}

//make a menu of all the psionics, sorted by caster
function ParsePsionicsMenu() {
	//define a function for creating the full set of spells-by-level menu for a class
	var createMenu = function(className, fullArray) {
		var nameArray = [
			"All psionics",
			"Psionic talents",
			"Psionic disciplines"
		];
		var classTemp = {cName : className, oSubMenu : []};
		for (var y = 0; y < fullArray.length; y++) {
			var spellsArray = fullArray[y];
			if (spellsArray.length > 0) {
				var spellsTemp = {cName : nameArray[y > 1 ? 2 : y], oSubMenu : []};
				for (var i = 0; i < spellsArray.length; i++) {
					spellsTemp.oSubMenu.push({
						cName : SpellsList[spellsArray[i]].name + (SpellsList[spellsArray[i]].dependencies ? " [uses " + (1 + SpellsList[spellsArray[i]].dependencies.length) + " rows]" : ""),
						cReturn : "spell" + "#" + spellsArray[i] + (SpellsList[spellsArray[i]].firstCol ? "#" : SpellsList[spellsArray[i]].level ? "#checkbox" : "#atwill")
					})
				}
				classTemp.oSubMenu.push(spellsTemp);
			}
		}
		AllPsionicsMenu.push(classTemp);
	}

	var allPsionicists = [
		"any",
		"-"
	];

	var morePsionicists = [];
	for (var aClass in ClassList) {
		if (ClassList[aClass].spellcastingFactor && (/psionic/i).test(ClassList[aClass].spellcastingFactor)) {
			if (allPsionicists.indexOf(aClass) === -1 && morePsionicists.indexOf(aClass) === -1 && !testSource(aClass, ClassList[aClass], "classExcl")) morePsionicists.push(aClass);
		} else {
			var subClasses = ClassList[aClass].subclasses[1];
			for (var SC = 0; SC < subClasses.length; SC++) {
				var aSubClass = subClasses[SC];
				if (ClassSubList[aSubClass].spellcastingFactor && (/psionic/i).test(ClassSubList[aSubClass].spellcastingFactor) && allPsionicists.indexOf(aSubClass) === -1 && morePsionicists.indexOf(aSubClass) === -1 && !testSource(aSubClass, ClassSubList[aSubClass], "classExcl")) morePsionicists.push(aSubClass);
			}
		}
	};

	morePsionicists.sort();
	allPsionicists = allPsionicists.concat(morePsionicists);

	//now see if this newly created list matches the known caster classes
	if (AllPsionicClasses && AllPsionicClasses.toSource() === allPsionicists.toSource()) {
		return AddPsionicsMenu;
	} else {
		AllPsionicClasses = allPsionicists;
	};

	var AllPsionicsMenu = [];
	for (var s = 0; s < allPsionicists.length; s++) {
		var aCast = allPsionicists[s];
		var aObj = ClassList[aCast] ? ClassList[aCast] : (ClassSubList[aCast] ? ClassSubList[aCast] : false);
		if (aCast === "-") {
			AllPsionicsMenu.push({cName : "-"});
			continue;
		}
		var aCastClass = aObj && aObj.spellcastingList ? aObj.spellcastingList : {class : aCast, psionic : true};
		var aCastName = aCast === "any" ? "All psionic powers" : aObj.name + " psionic powers";

		//get a list of all the spells in the class' spell list and sort it
		var allSpells = CreateSpellList(aCastClass, false);
		allSpells.sort();

		//now make an array with one array for each spell level
		var spellsByLvl = OrderSpells(allSpells, "multi");
		//and add the complete list to as the first of the by level array
		spellsByLvl.unshift(allSpells);

		//now create amenu for this class and add it to the submenu array of AllPsionicsMenu
		createMenu(aCastName, spellsByLvl);
	};

	//return the newly formed array
	return AllPsionicsMenu;
}

//find the next eligable header or divider
function findNextHeaderDivider(prefix, type) {
	var searchFld = prefix + (type === "header" ? "spellshead.Text.header." : "spellsdiv.Text.");
	var searchMax = type === "header" ? 3 : 9;
	var theReturn = false;
	for (var i = 0; i <= searchMax; i++) {
		if (tDoc.getField(searchFld + i).display === display.hidden) {
			theReturn = i;
			break;
		}
	}
	return theReturn;
}

//make a menu for each spell line and do something with the results
function MakeSpellLineMenu_SpellLineOptions() {
	var SSmaxLine = function(inputPrefix) {
		return inputPrefix.indexOf(".SSfront.") !== -1 ? FieldNumbers.spells[0] : FieldNumbers.spells[1];
	}
	var base = event.target.name;
	var prefix = base.substring(0, base.indexOf("spells."));
	var lineNmbr = parseFloat(base.slice(-2)[0] === "." ? base.slice(-1) : base.slice(-2));
	var SSmoreA = What("Template.extras.SSmore").split(",");
	SSmoreA[0] = What("Template.extras.SSfront").split(",")[1];
	if (!SSmoreA[0]) SSmoreA.shift();
	var thisSheet = SSmoreA.indexOf(prefix);
	var maxLine = SSmaxLine(prefix);
	var RemLine = base.replace("checkbox", "remember");
	var RemLineUp = lineNmbr === 0 && thisSheet === 0 ? false : (lineNmbr === 0 ? SSmoreA[thisSheet - 1] + "spells.remember." + SSmaxLine(SSmoreA[thisSheet - 1]) : RemLine.replace("." + lineNmbr, "." + (lineNmbr - 1)));
	var RemLineDown = lineNmbr === maxLine && thisSheet === (SSmoreA.length - 1) ? false : (lineNmbr === maxLine ? SSmoreA[thisSheet + 1] + "spells.remember." + 0 : RemLine.replace("." + lineNmbr, "." + (lineNmbr + 1)));
	var suffixHeader = findNextHeaderDivider(prefix, "header");
	var suffixDivider = findNextHeaderDivider(prefix, "divider");
	var addPsionics = AllPsionicsArray.length > 0;

	var menuLVL1 = function (menu, array) {
		for (i = 0; i < array.length; i++) {
			var isEnabled = true;
			var extraName = "";
			switch (array[i][1]) {
			 case "move up" :
				var toSearch = RemLineUp ? What(RemLineUp).toLowerCase() : "";
				isEnabled = RemLineUp && toSearch.indexOf("hidethisline") === -1;
				break;
			 case "move down" :
				var toSearch = RemLineDown ? What(RemLineDown).toLowerCase() : "";
				isEnabled = RemLineDown && toSearch.indexOf("hidethisline") === -1 && toSearch.indexOf("setdivider") === -1 && toSearch.indexOf("setheader") === -1;
				break;
			 case "setglossary" :
				var isDisplayed = tDoc.getField(prefix + "spellsgloss.Image").display === display.hidden;
				var isDistance = (lineNmbr + 11) <= maxLine;
				isEnabled = isDisplayed && isDistance;
				extraName = isEnabled ? " [takes up 12 rows]" : (isDistance ? " [max 1 on a page]" : " [too close to bottom of page]");
				break;
			}
			menu.push({
				cName : array[i][0] + extraName,
				cReturn : array[i][1],
				bEnabled : isEnabled
			});
		}
	};

	var menuLVL2 = function (menu, name, array) {
		var isMarked = false;
		var isEnabled = true;
		var extraReturn = "";
		var extraName = "";
		switch (name[1]) {
		 case "setheader" :
			isEnabled = suffixHeader !== false && (lineNmbr + 7) <= maxLine;
			extraReturn = suffixHeader;
			extraName = suffixHeader === false ? " [max 4 on a page]" : ((lineNmbr + 7) >= maxLine ? " [too close to bottom of page]" : " [takes up 4 rows]");
			break;
		 case "setdivider" :
			isEnabled = suffixDivider !== false && (lineNmbr + 3) <= maxLine;
			extraReturn = suffixDivider;
			extraName = suffixDivider === false ? " [max 10 on a page]" : ((lineNmbr + 3) >= maxLine ? " [too close to bottom of page]" : " [takes up 2 rows]");
			break;
		}
		var temp = {
			cName : name[0] + extraName,
			bEnabled : isEnabled
		};
		if (isEnabled) {
			temp.oSubMenu = [];
			for (var i = 0; i < array.length; i++) {
				temp.oSubMenu.push({
					cName : array[i][0],
					cReturn : name[1] + "#" + array[i][1] + "#" + extraReturn,
					bMarked : isMarked
				})
			}
		}
		menu.push(temp);
	};

	//make an array of the default options for lines
	var lineTypes = [
		["without first column", ""],
		["with a Checkbox", "checkbox"],
		["with an 'Always Prepared' Checkbox", "markedbox"],
		["with 'At Will'", "atwill"],
		["with '1\xD7 Long Rest'", "oncelr"],
		["with '1\xD7 Short Rest'", "oncesr"],
		["Ask me for the first column", "askuserinput"]
	];
	//make an array of the default options for first column
	var lineTypesTo = [
		["to empty first column", ""],
		["to a Checkbox", "checkbox"],
		["to an 'Always Prepared' Checkbox", "markedbox"],
		["to 'At Will'", "atwill"],
		["to '1\xD7 Long Rest'", "oncelr"],
		["to '1\xD7 Short Rest'", "oncesr"],
		["Ask me for the first column", "askuserinput"]
	];

	//now make the menu
	var spellsLineMenu = [];

	// add a way to see the spell's full description in a dialog
	var fullDescr = Who(base.replace("checkbox", "description"));
	if (fullDescr) {
		menuLVL1(spellsLineMenu, [["Show full text of " + What(base.replace("checkbox", "name")), "popup"]])
		spellsLineMenu.push({cName : "-"});
	}

	//add the options for adding a spell
	spellsLineMenu.push({cName : "Spell", oSubMenu : AddSpellsMenu});
	if (addPsionics) spellsLineMenu.push({cName : "Psionic", oSubMenu : AddPsionicsMenu});

	//add an option to just set underscores
	menuLVL2(spellsLineMenu, ["Empty Printable Line", "___"], lineTypes);

	//add the options for adding a caption line
	var captionArray = [["with empty first column", ""], ["with 'Me' as first column (memorized)", "me"], ["with 'Kn' as first column (known)", "kn"], ["Ask me for the first column", "askuserinput"]];
	if (addPsionics) captionArray.splice(3, 0, ["for Psionics", "psionicpp"]);
	menuLVL2(spellsLineMenu, ["Column Captions", "setcaptions"], captionArray);

	spellsLineMenu.push({cName : "-"}); //add a divider

	//an option to only change the first column
	menuLVL2(spellsLineMenu, ["Change the first column", "firstcolumn"], lineTypesTo);

	spellsLineMenu.push({cName : "-"}); //add a divider

	//add the options to adding a header
	//make an array of all the 'classes' to choose from
	var classHeaders = [];
	for (var SpellCaster in CurrentSpells) {
		classHeaders.push([CurrentSpells[SpellCaster].name, SpellCaster]);
	}
	classHeaders.sort(); //sort this array
	if (classHeaders.length > 0) classHeaders.unshift(["-", "-"]); //add a divider line, if any classes were added
	classHeaders.unshift(["Empty header without 'to prepare'", "nopreps"]); //add an option to add an empty one
	classHeaders.unshift(["Empty header", ""]); //add an option to add an empty one
	menuLVL2(spellsLineMenu, ["Class Header", "setheader"], classHeaders);

	//add the options for adding a divider
	//make an array of all the spell levels to choose from
	var dividersArray = [];
	var numberArray = [];
	for (var d = 0; d < spellLevelList.length; d++) {
		dividersArray.push([d < 10 ? spellLevelList[d].replace("-l", " L") : "Psionic " + spellLevelList[d], d]);
		numberArray.push([(d + 1) + " empty row" + (d === 0 ? "" : "s"), d + 1]);
	}
	if (!addPsionics) dividersArray.splice(-2,2);
	menuLVL2(spellsLineMenu, ["Spell Level Divider", "setdivider"], dividersArray);

	//add the options for adding a glossary
	menuLVL1(spellsLineMenu, [["Glossary of Abbreviations", "setglossary"]]);

	spellsLineMenu.push({cName : "-"}); //add a divider

	//add the options to move the line up or down
	menuLVL1(spellsLineMenu, [["Move row up", "move up"], ["Move row down", "move down"]]);

	spellsLineMenu.push({cName : "-"}); //add a divider

	//add the options to clear or delete the row
	menuLVL1(spellsLineMenu, [["Clear row", "clear"], ["Delete row [slow]", "delete"]]);

	//add the options to insert empty row(s)
	numberArray.push(["Ask me", "askuserinput"]);
	menuLVL2(spellsLineMenu, ["Insert empty rows [slow]", "insert"], numberArray);

	Menus.spellsLine = spellsLineMenu;

	//now call the menu
	var MenuSelection = getMenu("spellsLine");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying the spell line menu option...");
	thermoM(0.5); // Increment the progress bar
	calcStop();

	switch (MenuSelection[0]) {
	 case "popup" :
		var sourceStr = Who(base.replace("checkbox", "book"));
		showSpellDescriptionDialog(false, false, fullDescr, sourceStr);
		break;
	 case "move up" :
		thermoTxt = thermoM("Moving the spell up one row...", false);
		var upValue = What(RemLineUp);
		Value(RemLineUp, What(RemLine));
		Value(RemLine, upValue);
		break;
	 case "move down" :
		thermoTxt = thermoM("Moving the spell down one row...", false);
		var downValue = What(RemLineDown);
		Value(RemLineDown, What(RemLine));
		Value(RemLine, downValue);
		break;
	 case "spell" :
		thermoTxt = thermoM("Applying the spell...", false);
		if (MenuSelection[2] === "askuserinput") {
			MenuSelection[2] = AskUserTwoLetters(false);
		};
		Value(RemLine, MenuSelection[1] + "##" + MenuSelection[2]);
		if (SpellsList[MenuSelection[1]] && SpellsList[MenuSelection[1]].dependencies) {
			theDeps = SpellsList[MenuSelection[1]].dependencies;
			var theNextLineValue = What(RemLine.replace("." + lineNmbr, "." + (lineNmbr + 1)));
			insertSpellRow(prefix, lineNmbr + 1, theDeps.length - (theNextLineValue ? 0 : 1));
			for (var sD = 0; sD < theDeps.length; sD++) {
				Value(RemLine.replace("." + lineNmbr, "." + (lineNmbr + sD + 1)), theDeps[sD]);
			};
		};
		break;
	 case "setcaptions" :
	 case "___" :
	 case "setdivider" :
		if (MenuSelection[1] === "askuserinput") {
			MenuSelection[1] = AskUserTwoLetters(MenuSelection[0] !== "___");
		} else if ((/psionic/i).test(MenuSelection[1])) {
			MenuSelection[0] = "psionic" + MenuSelection[0];
			MenuSelection[1] = MenuSelection[1].replace(/psionic/i, "");
		}
	 case "setheader" :
	 case "setglossary" :
		if ((/set(header|divider|glossary)/i).test(MenuSelection[0])) {
			tDoc.resetForm([RemLine]);
			insertSpellRow(prefix, lineNmbr, MenuSelection[0] === "setheader" ? 3 : MenuSelection[0] === "setdivider" ? 1 : 11, true);
		};
		Value(RemLine, MenuSelection.join("##"));
		break;
	 case "clear" :
		thermoTxt = thermoM("Removing the spell...", false);
		tDoc.resetForm(ReturnSpellFieldsArray(prefix, lineNmbr).reverse());
		break;
	 case "delete" :
		thermoTxt = thermoM("Deleting the row and moving the rest up...", false);
		deleteSpellRow(prefix, lineNmbr);
		break;
	 case "insert" :
		if (MenuSelection[1] === "askuserinput") {
			MenuSelection[1] = AskUserNumber();
		}
		thermoTxt = thermoM("Inserting " + MenuSelection[1] + " spell row(s) ...", false);
		if (MenuSelection[1] > 0) {
			insertSpellRow(prefix, lineNmbr, MenuSelection[1]);
		}
		break;
	 case "firstcolumn" :
		if (MenuSelection[1] === "askuserinput") {
			MenuSelection[1] = AskUserTwoLetters((/setcaptions/i).test(What(RemLine)));
		}
		thermoTxt = thermoM("Setting " + MenuSelection[1] + " as the spell row first column...", false);
		var RemLineValue = What(RemLine).split("##");
		RemLineValue[1] = MenuSelection[1];
		Value(RemLine, RemLineValue.join("##"));
		break;
	}
	thermoM(thermoTxt, true); // Stop progress bar
};

//aks the user for 2 characters that are used for the caption of the first column of the spell table
function AskUserTwoLetters(caption) {
	var theDialog = {
		theTXT : "",
		initialize : function (dialog) {
			dialog.load({
				"txt0" : "Please type the two characters you want to have as the " + (caption ? "caption for the " : "") + "first column.\n\nAlternatively, you can type a single character between brackets, e.g. '(R)', or two numbers with a hyphen."
			});
		},
		destroy : function (dialog) {
			var oResult = dialog.store();
			this.theTXT = oResult["user"];
		},
		description : {
			name : "FIRST COLUMN DIALOG",
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
					char_width : 30,
					name : "Set the first column " + (caption ? "caption" : "")
				}, {
					type : "static_text",
					alignment : "align_fill",
					item_id : "txt0",
					wrap_name : true,
					char_width : 30,
					name : "Please type the two characters you want to have as the caption for the first column.\n\nAlternatively, you can type a single character between brackets, e.g. '(R)', or two numbers with a hyphen."
				}, {
					type : "edit_text",
					alignment : "align_center",
					item_id : "user",
					char_width : 5,
					height : 20
				}, {
					type : "ok"
				}]
			}]
		}
	}
	app.execDialog(theDialog);
	return theDialog.theTXT;
}

//aks the user for a number on how manu rows to insert that are used for the caption of the first column of the spell table
function AskUserNumber(caption) {
	var theDialog = {
		theNMBR : "",
		initialize : function (dialog) {
			dialog.load({
				"user" : ASround(11)
			});
		},
		destroy : function (dialog) {
			var oResult = dialog.store();
			this.theNMBR = oResult["user"];
		},
		description : {
			name : "SET NUMBER DIALOG",
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
					char_width : 30,
					name : caption ? caption : "Amount of empty rows to insert"
				}, {
					type : "edit_text",
					alignment : "align_center",
					item_id : "user",
					char_width : 4,
					height : 20,
					SpinEdit : true
				}, {
					type : "ok"
				}]
			}]
		}
	}
	app.execDialog(theDialog);
	return theDialog.theNMBR;
}

// Delete a row on the spell list (and move all the rows below it up one)
function deleteSpellRow(prefix, lineNmbr) {
	// Function
	var returnClearance = function(prefix, offsetNmbr) {
		var fldVal = What(prefix + "spells.remember." + offsetNmbr);
		if (!(/set(header|divider|glossary)/i).test(fldVal)) {
			return 0;
		} else if ((/setglossary/i).test(fldVal)) {
			return 12;
		}
		// See how many lines before the next header/divider or until we have 11 lines
		var clearance = (/setdivider/i).test(fldVal) ? 2 : 5;
		var breakAt = (/setdivider/i).test(fldVal) ? 13 : 17;
		var trailingEmpty = 0;
		for (var i = clearance + offsetNmbr; i <= FieldNumbers.spells[1]; i++) {
			var lineVal = What(prefix + "spells.remember." + i);
			if ((/set(header|divider|glossary)/i).test(lineVal)) break;
			clearance++;
			trailingEmpty = lineVal && lineVal.indexOf("___") != 0 ? 0 : trailingEmpty + 1;
			if (clearance == breakAt) break;
		}
		return clearance - trailingEmpty;
	}
	// Array of all the spell sheets and where to start
	var SSmoreA = What("Template.extras.SSmore").split(",");
	SSmoreA[0] = What("Template.extras.SSfront").split(",")[1];
	if (!SSmoreA[0]) SSmoreA.shift();
	var thisSheet = SSmoreA.indexOf(prefix);
	// Go through all the rows, moving them up one
	var offset = 0;
	for (var SS = thisSheet; SS < SSmoreA.length; SS++) {
		var startRow = SS === thisSheet ? lineNmbr : 0;
		var endRow = FieldNumbers.spells[SSmoreA[SS].indexOf("SSfront") != -1 ? 0 : 1];
		var nextPageImgLoc = offset;
		var lookAhead = SSmoreA[SS + 1] ? returnClearance(SSmoreA[SS + 1], nextPageImgLoc) : 0;
		var allEmpty = false, pageEmptyLines = 0;
		// now if we started too close to the end of the page to bring the lookAhead over, set it to "stop"
		if (SS === thisSheet && endRow - startRow < lookAhead - 1) lookAhead = "stop";
		for (var L = startRow; L <= endRow; L++) {
			// What is the next row (next page & offset)
			var nextRow = offset + L + 1 <= endRow ?
					[SSmoreA[SS], offset + L + 1] :
				SSmoreA[SS + 1] && lookAhead !== "stop" ?
					[SSmoreA[SS + 1], L - endRow + offset] : false;
			var thisLineFlds = ReturnSpellFieldsArray(SSmoreA[SS], L).reverse();
			if (!nextRow) {
				// We've reached the end, so clear the last lines of the page (there might be multiple because of the offset)
				for (var i = L; i <= endRow; i++) {
					tDoc.resetForm(ReturnSpellFieldsArray(SSmoreA[SS], i).reverse());
					pageEmptyLines++;
				}
				if (SS == SSmoreA.length - 1) break;
				return;
			}
			// Get the field names and values of the next row
			var nextLineFlds = ReturnSpellFieldsArray(nextRow[0], nextRow[1]).reverse();
			var nextLineVals = nextLineFlds.map(What);
			var thisLineVal = What(thisLineFlds[0]);

			if (!allEmpty && lookAhead != "stop" && lookAhead && endRow - L - offset == lookAhead - 1) {
				// This is the row to check if this row and the rest of the page is empty, because then we can bring the multi-line image and the next lines to this page
				allEmpty = true;
				for (var i = L; i <= endRow; i++) {
					var fldVal = What(SSmoreA[SS] + "spells.remember." + i);
					if (fldVal && fldVal.indexOf("___") != 0) {
						allEmpty = false;
						break;
					}
				}
				if (allEmpty) {
					// The multi-line image (and trailing) of the next page fit, so bring them over
					offset += lookAhead - 1;
					// If there is more empty space on this page, use it to its fullest by going back
					for (var i = L - 1; i >= startRow; i--) {
						var fldVal = What(SSmoreA[SS] + "spells.remember." + i);
						if (fldVal && fldVal.indexOf("___") != 0) break;
						offset++;
						L--;
					}
					L--; // come back one line more, to process all of them with the lookAhead and offset taken care off
					continue;
				} else {
					// The multi-line image of the next won't fit, so continue for the rest of the page, but stop moving anything after that
					lookAhead = "stop";
				}
			}
			// Copy every field's value from the next row (+ offset) and empty the next row
			var nextHasImage = !(/set(header|divider|glossary)/i).test(nextLineVals[0]) ? false : (/setheader/i).test(nextLineVals[0]) ? "header" : (/setdivider/i).test(nextLineVals[0]) ? "divider" : "glos"
			for (var i = 0; i < thisLineFlds.length; i++) {
				if (i === 0 && nextHasImage) {
					var splitVal = nextLineVals[i].split("##");
					var setType = nextHasImage == "header" ? "spellshead.Text.header." : nextHasImage == "divider" ? "spellsdiv.Text." : "spellsgloss.Image";
					HideSpellSheetElement(nextRow[0] + setType + (nextHasImage == "glos" ? "" : splitVal[2]));
					if (nextHasImage !== "glos" && nextRow[0] !== SSmoreA[SS]) {
						splitVal[2] = findNextHeaderDivider(SSmoreA[SS], nextHasImage);
						nextLineVals[i] = splitVal.join("##");
					}
					L += nextHasImage == "header" ? 3 : nextHasImage == "divider" ? 1 : 11;
					Value(thisLineFlds[i], nextLineVals[i]);
					break;
				}
				Value(nextLineFlds[i], "");
				Value(thisLineFlds[i], nextLineVals[i]);
			}
			if (SS == SSmoreA.length - 1 && nextLineVals.join("") === "") pageEmptyLines++;
		}
		// Test if this last page is fully empty and remove it if so
		if (SS == SSmoreA.length - 1 && pageEmptyLines == endRow + 1) DoTemplate("SSmore", "Remove", undefined, true);
	}
};

//insert a number of empty rows on the spell list
function insertSpellRow(prefix, lineNmbr, toMove, ignoreEmptyTop) {
	// Validate the input
	lineNmbr = Number(lineNmbr);
	toMove = Number(toMove);
	// Function
	var removeEmpties = function(array) {
		if (array.length && array[array.length - 1].join("") === "") {
			array.pop();
			removeEmpties(array);
		} else {
			return;
		};
	};
	// First figure out if toMove is more than a page
	var toCheck = toMove;
	var extraPages = 0;
	if (prefix.indexOf(".SSfront.") !== -1 && toCheck > FieldNumbers.spells[0]) {
		toCheck -= FieldNumbers.spells[0];
		extraPages += 1;
	};
	if (toCheck > FieldNumbers.spells[1]) {
		var amountPages = Math.floor(toCheck/FieldNumbers.spells[1]);
		toCheck -= amountPages * FieldNumbers.spells[1];
		extraPages += amountPages;
	};
	// Array of all the spell sheets and where to start
	var SSmoreA = What("Template.extras.SSmore").split(",");
	SSmoreA[0] = What("Template.extras.SSfront").split(",")[1];
	if (!SSmoreA[0]) SSmoreA.shift();
	var thisSheet = SSmoreA.indexOf(prefix);
	// If the next row is an image, start inserting one row below
	if (lineNmbr < FieldNumbers.spells[prefix.indexOf("SSfront") != -1 ? 0 : 1] && (/setheader|setdivider|setglossary/i).test(What(prefix + "spells.remember." + (lineNmbr + 1)))) {
		lineNmbr += 1;
	}
	// Make an array of all the remember field values, starting with the one we are at, until we find enough empty rows (same as toMove)
	var valuesArray = [];
	var emptyCount = 0;
	var resultRow = false;
	var rememberRow = [0];
	for (var SS = thisSheet; SS < SSmoreA.length; SS++) {
		var startRow = SS === thisSheet ? lineNmbr : 0;
		var endRow = FieldNumbers.spells[SSmoreA[SS].indexOf("SSfront") != -1 ? 0 : 1];
		for (var L = startRow; L <= endRow; L++) {
			var thisLineVals = ReturnSpellFieldsArray(SSmoreA[SS], L).reverse().map(What);
			valuesArray.push(thisLineVals);
			if (thisLineVals[0] === "" || thisLineVals[0].indexOf("___") === 0) {
				emptyCount += 1;
				if (emptyCount === toCheck && emptyCount <= toMove) {
					valuesArray.splice(-1 * emptyCount, emptyCount); //remove the last empty items
					resultRow = [SSmoreA[SS], L - emptyCount];
					SS = SSmoreA.length;
					break;
				};
			} else {
				if (emptyCount > 0 && L < emptyCount) { //if we just passed the end of a page, we can use the empty values to 'catch up' some of the movement we need to do
					valuesArray.splice(-1 * emptyCount - 1, emptyCount + 1); //remove the last empty items and the current line
					valuesArray.push(thisLineVals); //add the current line again
					toCheck -= emptyCount; //amend the amount of lines we need to check ahead
					if (toCheck <= 0) { //if this brings the amount of lines to 0 or less, we can stop
						resultRow = [SSmoreA[SS], L - emptyCount];
						SS = SSmoreA.length;
						break;
					}
				} else if (ignoreEmptyTop && SS === thisSheet && emptyCount === L - startRow) { //if we are adding something that want to use as many of the empty rows at the top as possible
					toMove -= emptyCount;
				};
				emptyCount = 0;
			}
			if (rememberRow[0] === 0 && (/setheader|setdivider|setglossary/i).test(thisLineVals[0])) {
				//if the amount of lines we need to move down to is not on this page anymore, we need to add some empty lines to move it to the next page
				var setType = thisLineVals[0].indexOf("setheader") !== -1 ? "header" : thisLineVals[0].indexOf("setdivider") !== -1 ? "divider" : "glossary";
				var thisValueArray = thisLineVals[0].split("##");
				var moveExtra = setType === "header" ? 7 : setType === "divider" ? 3 : 11;
				if ((L + toCheck) <= endRow && (L + toCheck + moveExtra) > endRow) { // the top is less or equal than the endRow, but the bottom of the section is more
					var theStep = endRow - L - toCheck + 1; // how much empty rows to add
					toCheck += theStep;
					//first remove the last thing that was added to the array (this field)
					valuesArray.pop();
					//now add a number of empty fields
					for (var st = 1; st <= theStep; st++) {
						valuesArray.push([""]);
					}
					valuesArray.push(thisLineVals); //add the current line again
				}
				//remember how to hide the element, so we can do it after skipping a couple of rows (the hidden ones)
				rememberRow = [
					setType === "header" ? 3 : setType === "divider" ? 1 : 11,
					SSmoreA[SS],
					setType === "header" ? "spellshead.Text.header." : setType === "divider" ?  "spellsdiv.Text." : "spellsgloss.Image",
					setType === "glossary" ? "" : thisValueArray[2]
				];
			} else if (rememberRow[0] > 0) {
				rememberRow[0] -= 1;
				if (rememberRow[0] === 0) {//now that we passed the last row to skip, hide the header/divider
					HideSpellSheetElement(rememberRow[1] + rememberRow[2] + rememberRow[3]);
					rememberRow = [0];
				}
			}
		}
	}

	//remove all the empty values at the end of the array
	removeEmpties(valuesArray);

	//see how many lines of values we need to add and if we need to add any pages for that
	var theLastRow = resultRow ? resultRow : [SSmoreA[SSmoreA.length - 1], (SSmoreA.length === 1 ? FieldNumbers.spells[0] : FieldNumbers.spells[1]) - emptyCount];
	if ((theLastRow[1] + toCheck) > (theLastRow[0].indexOf(".SSfront.") !== -1 ? FieldNumbers.spells[0] : FieldNumbers.spells[1])) {
		extraPages += 1;
	};

	//add the amount of extra pages that we need
	for (var page = 1; page <= extraPages; page++) {
		DoTemplate("SSmore", "Add");
	};

	//if no values to any of the rows, just stop now
	if (!valuesArray.length) return;

	//calculate at which page we start
	var totalInserts = lineNmbr + toMove + valuesArray.length - 1;
	var jumpPages = 0;
	if (prefix.indexOf(".SSfront.") !== -1) {
		if (totalInserts > FieldNumbers.spells[0]) {
			totalInserts -= FieldNumbers.spells[0];
			jumpPages += 1;
			totalInserts -= 1; //compensate for the fact that a page starts at 0
		};
	};
	if (totalInserts > FieldNumbers.spells[1]) {
		amountPages = Math.floor(totalInserts/FieldNumbers.spells[1]);
		totalInserts -= amountPages * FieldNumbers.spells[1];
		jumpPages += amountPages;
		totalInserts -= amountPages; //compensate for the fact that a page starts at 0
	};

	var startLine = totalInserts;
	var startPage = thisSheet + jumpPages;

	//now update the array of spell pages
	SSmoreA = What("Template.extras.SSmore").split(",");
	SSmoreA[0] = What("Template.extras.SSfront").split(",")[1];
	if (!SSmoreA[0]) SSmoreA.shift();

	//then put all the values back, starting with the bottom row
	var valuesCountdown = valuesArray.length - 1;

	for (var P = startPage; P >= thisSheet; P--) {
		var nowPage = SSmoreA[P];
		var nowStartLine = P === startPage ? startLine : (P === 0 ? FieldNumbers.spells[0] : FieldNumbers.spells[1]);
		var nowEndLine = P === thisSheet ? lineNmbr : 0;
		for (var I = nowStartLine; I >= nowEndLine; I--) {
			if (P === thisSheet && I < (lineNmbr + toMove)) {
				Value(nowPage + "spells.remember." + I, "");
			} else {
				var theValue = valuesArray[valuesCountdown];
				if (theValue[0].indexOf("setheader") !== -1 || theValue[0].indexOf("setdivider") !== -1) { //if a value sets a divider or header, always change the suffix to the next one available on this page
					var setType = theValue[0].indexOf("setheader") !== -1 ? "header" : "divider";
					var thisValueArray = theValue[0].split("##");
					thisValueArray[2] = findNextHeaderDivider(nowPage, setType);
					theValue[0] = thisValueArray.join("##");
				};
				var thisLineFlds = ReturnSpellFieldsArray(nowPage, I).reverse();
				for (var v = 0; v < theValue.length; v++) {
					Value(thisLineFlds[v], theValue[v]);
				}
				valuesCountdown -= 1;
			};
		};
	};
};

// Hide the class header or spell level divider if their value is made completely empty before an On Blur action
function HideSpellSheetElement(theTarget) {
	var base = theTarget ? theTarget : event.target.name;
	var prefix = base.substring(0, base.indexOf("spells"));
	var SSfrontPrefix = What("Template.extras.SSfront").split(",")[1];
	var suffix = Number(base.slice(-1));
	var type = base.indexOf("spellshead") !== -1 ? "header" : base.indexOf("spellsdiv") !== -1 ? "divider" : "glossary";
	// variables to make the spell rows that were hidden visible again
	var headerArray = [
		prefix + "spellshead.Image.Header.Left." + suffix, //0
		prefix + "spellshead.Text.header." + suffix, //1
		prefix + "spellshead.class." + suffix, //2
		prefix + "spellshead.ability." + suffix, //3
		prefix + "spellshead.prepare." + suffix, //4
		prefix + "spellshead.attack." + suffix, //5
		prefix + "spellshead.dc." + suffix, //6
		prefix + "BlueText.spellshead.prepare." + suffix, //7
		prefix + "BlueText.spellshead.attack." + suffix, //8
		prefix + "BlueText.spellshead.dc." + suffix, //9
	];
	if (!typePF) {
		headerArray = headerArray.concat([
			prefix + "spellshead.Image.Dragonheadshadow." + suffix, //10
			prefix + "spellshead.Image.Dragonhead." + suffix, //11
			prefix + "spellshead.Text.prepare." + suffix, //12
			prefix + "spellshead.Box.prepare." + suffix, //13
			prefix + "spellshead.Text.attack." + suffix, //14
			prefix + "spellshead.Box.attack." + suffix, //15
			prefix + "spellshead.Text.dc." + suffix, //16
			prefix + "spellshead.Box.dc." + suffix, //17
			prefix + "spellshead.Text.ability." + suffix, //18
			prefix + "spellshead.Box.ability." + suffix, //19
		]);
		var dividerArray = [
			prefix + "spellsdiv.Text." + suffix, //0
			prefix + "spellsdiv.Image.Dragonhead." + suffix, //1
			prefix + "spellsdiv.Image.Divider." + suffix, //2
			prefix + "spellsdiv.Image.DividerFlip." + suffix, //3
		];
	} else {
		headerArray = headerArray.concat([
			prefix + "spellshead.Image.prepare." + suffix, //10
		]);
		var dividerArray = [
			prefix + "spellsdiv.Image." + suffix, //0
			prefix + "spellsdiv.Text." + suffix, //1
		];
	}
	var glossaryArray = [
		prefix + "spellsgloss.Image"
	];
	if ((theTarget || event.value === "") && !(prefix === SSfrontPrefix && suffix === 0)) {
		calcStop();
		var lineBase = How(base);
		var startLine = parseFloat(lineBase.slice(-2)[0] === "." ? lineBase.slice(-1) : lineBase.slice(-2));
		var endLine = startLine;

		switch(type) {
		 case "header" :
			var hideArray = headerArray;
			endLine += 3;
			break;
		 case "divider" :
			var hideArray = dividerArray;
			endLine += 1;
			break;
		 case "glossary" :
			var hideArray = glossaryArray;
			endLine += 11;
			break;
		}
		for (var m = 0; m < hideArray.length; m++) {
			Hide(hideArray[m]);
		}
		var resetArray = [lineBase];
		for (var l = (startLine + 1); l <= endLine; l++) {
			resetArray.push(lineBase.replace("." + startLine, "." + l));
		}
		tDoc.resetForm(resetArray);
		tDoc.getField(base).submitName = "";

	} else if (base === SSfrontPrefix + "spellshead.Text.header.0") {
		calcStop();
		//search the entry if it matches any of the CurrentSpells entries
		var toSearch = What(base).toLowerCase();
		var toTest = false;
		var toPrep = true;
		var HideShow = false;
		for (var key in CurrentSpells)  {
			if (toSearch.indexOf(key) !== -1 || toSearch.indexOf(CurrentSpells[key].name.toLowerCase()) !== -1) {
				var spCast = CurrentSpells[key];
				Value(headerArray[2], key);
				if (!spCast.abilityToUse) spCast.abilityToUse = getSpellcastingAbility(caster);
				PickDropdown(headerArray[3], spCast.abilityToUse[0]);
				if (!spCast.level || (spCast.typeSp !== "list" && spCast.typeSp !== "book") || spCast.typeList === 3) toPrep = false;
				toTest = true;
				break;
			}
		}
		if (!toTest) {
			Value(SSfrontPrefix + "spellshead.class.0", "");
			if (event.value === "") HideShow = "Show";
		} else if (!toPrep) {
			HideShow = "Hide";
		}

		//show the prepared section or hide it, depending on the above
		if (HideShow) {
			tDoc[HideShow](headerArray[4]);
			if (!typePF) {
				tDoc[HideShow](headerArray[12]);
				tDoc[HideShow](headerArray[13]);
			} else {
				tDoc[HideShow](headerArray[10]);
			}
		}
	}
	// If the text changed, make sure to also edit the remember field so that the element can be recreated when inserting/deleting rows
	if (!theTarget && event.value && !(prefix === SSfrontPrefix && suffix === 0)) {
		var lineBase = How(base);
		var lineBaseArr = What(lineBase).split("##");
		lineBaseArr[3] = event.value;
		Value(lineBase, lineBaseArr.join("##"));
	}
}

// When changing the spellcasting ability of a manual header, save it to the remember field so that the element can be recreated when inserting/deleting rows (field blur)
// If this is a header linked to a CurrentSpells object, change its spellcasting ability and offer to re-generate the sheet
function SaveSpellcastingAbility() {
	if (!event.target) return;
	var base = event.target.name;
	var caster = What(base.replace("ability", "class"));
	var selAbi = event.target.currentValueIndices;
	if (caster && CurrentSpells[caster] && !(CurrentSpells[caster].fixedDC && !CurrentSpells[caster].ability)) {
		var spCast = CurrentSpells[caster];
		if (!selAbi && spCast.abilityBackup) {
			spCast.ability = spCast.abilityBackup;
			spCast.abilityToUse = getSpellcastingAbility(caster);
			PickDropdown(base, spCast.abilityToUse[0]);
		} else if (selAbi && spCast.ability != selAbi) {
			if (!spCast.abilityBackup) spCast.abilityBackup = spCast.ability;
			spCast.ability = selAbi;
			spCast.abilityToUse = getSpellcastingAbility(caster);
			var origSpAbi = !isNaN(spCast.abilityBackup) ? AbilityScores.names[spCast.abilityBackup - 1] : spCast.abilityBackup.toLowerCase() === "race" ? "the same as the race" : "the same as a class, highest score if multiple eligible";
			// Warn the user that to update the spellcasting ability requires regenerating the spells sheets
			var redosheets = app.alert({
				cMsg : "Please know that you can reset the spellcasting ability to its original (" + origSpAbi + ") by selecting the first (empty) option in the dropdown box." + (CurrentCasters.amendSpDescr ? "\n\nYou will need to regenerate the spell sheets if you want this change in spellcasting ability to be applied to the spells. If you have no spells that incorporate your spellcasting ability, than there is no reason the regenerate the spell sheets.\n\nDo you want to generate new spell sheets now?" : ""),
				cTitle : "Spellcasting Ability Changed",
				nIcon : 3,
				nType : CurrentCasters.amendSpDescr ? 2 : 0 // 0: OK; 2: Yes-No
			});
			if (redosheets === 4) {
				SetStringifieds("spells");
				GenerateSpellSheet();
				return;
			}
		}
		SetStringifieds("spells");
		tDoc.calculateNow();
	} else if (!caster || !CurrentSpells[caster]) {
		var prefix = base.substring(0, base.indexOf("spells"));
		var SSfrontPrefix = What("Template.extras.SSfront").split(",")[1];
		var suffix = Number(base.slice(-1));
		if (prefix == SSfrontPrefix && suffix === 0) return;
		var lineBase = How(base.replace("ability", "Text.header"));
		var lineBaseArr = What(lineBase).split("##");
		lineBaseArr[4] = selAbi ? selAbi : "";
		Value(lineBase, lineBaseArr.join("##"));
	}
}

//a one-item menu to hide the glossary
function MakeGlossMenu_GlossOptions() {
	Menus.glossary = [{
		cName : "Remove this glossary",
		cReturn : "removeglossary"
	}];
	var MenuSelection = getMenu("glossary");
	if (!MenuSelection || MenuSelection[0] == "nothing" || MenuSelection[0] !== "removeglossary") return;
	HideSpellSheetElement(event.target.name);
}

// make all lines on the newly generated empty sheet
function AddSpellSheetTextLines(prefix, boxes, maxLine) {
	maxLine = maxLine ? maxLine : FieldNumbers.spells[1];
	var toEnter = "___" + (boxes ? "##checkbox" : "");
	for (var i = 0; i <= maxLine; i++) {
		Value(prefix + "spells.remember." + i, toEnter);
	}
}

//generate the spell sheet for all the different classes
function GenerateCompleteSpellSheet(thisClass, skipdoGoOn) {
	if ((/alphabetical|grouped by level/i).test(thisClass)) {
		GenerateSpellSheetWithAll((/alphabetical/i).test(thisClass), skipdoGoOn);
		return;
	};
	if (app.viewerType !== "Reader" && tDoc.info.SpellsOnly) {
		tDoc.info.SpellsOnly = thisClass;
		tDoc.info.Title = MakeDocName();
		Value("Opening Remember", "No");
	}
	var isSubClass = ClassList[thisClass] ? false : true;
	var thisClassName = ClassList[thisClass] ? ClassList[thisClass].name : ClassSubList[thisClass] ? ClassSubList[thisClass].subname : thisClass.capitalize();
	// Start progress bar so we know it will be visible if a dialog is made
	var thermoTxt = thermoM("Generating the " + thisClassName + " Spell Sheets, Acrobat will be unresponsive for a long time...", false);
	//first ask the user if he really wants to wait for an hour
	var doGoOn = {
		cMsg: "You are about to remove any Spell Sheets that are currently in this document and replace them with a newly generated sheet containing all spells available to the " + thisClassName + (isSubClass ? " sub" : " ") + "class.\n\nThis will not include any spells granted by any currently selected " + (isSubClass ? "" : "subclass, ") + "class feature, nor spells excluded in the Source Selection dialog.\nIf you want to generate a spell list with all the spells available for your currently selected (sub)class and class features, please use the normal way of generating a spell list and select \"Full class list\" in the bottom right of the Spell Selection dialog.\n\nEvery spell level will have 3 empty lines to fill out yourself.\n\nBe aware that this process can take a while.\n\nAre you sure you want to continue?",
		nIcon: 2,
		cTitle: "Continue with generation of complete spell sheet?",
		nType: 2
	};
	if (!skipdoGoOn && app.alert(doGoOn) !== 4) {
		thermoM(thermoTxt, true); // Stop progress bar
		return;
	}

	thermoM(0.1); //increment the progress dialog's progress
	calcStop();

	thermoM(1/7); //increment the progress dialog's progress

	//then we remove all the existing sheets (if any)
	RemoveSpellSheets();

	var lineMax = FieldNumbers.spells[0]; //set the maximum we can go on this sheet
	var lineCurrent = 0; //set the current line on the Spell Sheet
	var headerCurrent = 0; //set the current header on the Spell Sheet
	var dividerCurrent = 0; //set the current divider on the Spell Sheet
	var SSfront = true; //set the state of on which Spell Sheet we are working

	//define a function for adding a new page
	var SpellPages = 1;
	var AddPage = function() {
		//add one more page and set the corresponding prefix to the variable
		prefixCurrent = DoTemplate("SSmore", "Add");
		SpellPages += 1;
		thermoTxt = thermoM("Filling out page " + SpellPages + " of the Spell Sheets...", false); //change the progress dialog text
		//now reset all the incremental variables to 0;
		lineMax = FieldNumbers.spells[1];
		lineCurrent = 0;
		headerCurrent = 0;
		dividerCurrent = 0;
		SSfront = false;
	}

	//now we add all the spells of this single class into a new set of spell sheets

	//see if this is a prepared or known spell list
	var isPrep = false;
	if (ClassList[thisClass] && ClassList[thisClass].spellcastingKnown) {
		isPrep = ClassList[thisClass].spellcastingKnown.prepared;
	} else if (ClassSubList[thisClass] && ClassSubList[thisClass].spellcastingKnown) {
		isPrep = ClassSubList[thisClass].spellcastingKnown.prepared;
	};

	//get an array of all the spells of the class, divided up in 1 array per spell level
	var orderedSpellList = CreateSpellList(thisClass, false, false, true);

	//for the first entry we need to make the template SSfront appear
	var prefixCurrent = tDoc.info.SpellsOnly ? "P0.SSfront." : DoTemplate("SSfront", "Add"); //set the current prefix on the Spell Sheet
	thermoTxt = thermoM("Filling out page 1 of the Spell Sheet...", false); //change the progress dialog text

	//now sort each of those new arrays and put them on the sheet
	var start = true;
	for (var lvl = 0; lvl < orderedSpellList.length; lvl++) {
		var spArray = orderedSpellList[lvl];
		var isPsionics = lvl <= 9 ? "" : "psionic";
		if (spArray.length === 0) continue;
		//add spell dependencies to fill out the array
		spArray = addSpellDependencies(spArray);
		spArray = spArray.concat(["___", "___", "___"]); //add three empty lines to the end of the level-array
		var MeKn = isPsionics ? "##pp" : lvl === 0 ? "##Kn" : (isPrep ? "##Me" : "##Kn");

		//first test if there is enough space left on the current page to add what we need to
		//assume that we need to add at least 10 of the spells, the total of this level of spells, whichever is less
		// so 3 (divider + title line) + 4 (header, if applicable) + lowest of [10, arrayLength]
		var needSpace = 3 + (start ? 4 : 0) + Math.min(10, spArray.length);
		if (needSpace > (lineMax - lineCurrent + 1)) AddPage();

		//the first spells to add needs a header in front of it
		if (start) {
			SetSpellSheetElement(prefixCurrent + "spells.remember.0", "header", 0, thisClass, !isPrep);
			start = false;
		}

		//then add the divider
		if (lineCurrent === 0 && SSfront) {
			SetSpellSheetElement(prefixCurrent + "spells.remember.0", "divider", 0, lvl, false);
		} else {
			Value(prefixCurrent + "spells.remember." + lineCurrent, "setdivider##" + lvl + "##" + dividerCurrent);
			lineCurrent += 2;
		}
		dividerCurrent += 1;

		//then add the title line
		Value(prefixCurrent + "spells.remember." + lineCurrent, isPsionics + "setcaptions" + MeKn);
		lineCurrent += 1;

		for (var y = 0; y < spArray.length; y++) {
			aSpell = spArray[y];
			//check if not at the end of the page and, if so, create a new page
			if (lineCurrent > lineMax) AddPage();
			var toCheck = SpellsList[aSpell] && SpellsList[aSpell].firstCol !== undefined ? "##" : "##checkbox";
			Value(prefixCurrent + "spells.remember." + lineCurrent, aSpell + toCheck + "##" + thisClass);
			lineCurrent += 1;
		}
		thermoM((lvl+2)/(orderedSpellList.length+2));
	}
	//add the glossary if there is still space on the last page
	if ((lineCurrent + 11) <= lineMax) {
		Value(prefixCurrent + "spells.remember." + lineCurrent, "setglossary");
	}
	//set the focus to the top of the spell sheets
	tDoc.getField(What("Template.extras.SSfront").split(",")[1] + BookMarkList["SSfront"]).setFocus();
	thermoM(thermoTxt, true); // Stop progress bar
}

//a way to hide the 'prepared' section on the first page of the spell sheet //if a "target" is given, assume it has to be hidden
function MakePreparedMenu_PreparedOptions(target) {
	Menus.spellsPrepared = [{
		cName : "Hide this prepared spells section",
		cReturn : "removepreps"
	}];

	//now call the menu
	var MenuSelection = target ? ["removepreps"] : getMenu("spellsPrepared");
	var theTarget = target ? target : event.target.name;
	if (!MenuSelection || MenuSelection[0] == "nothing" || MenuSelection[0] !== "removepreps") return;

	Hide(theTarget);
	Hide(theTarget.replace(".Text.", ".").replace(".Image.", "."));
	if (!typePF) Hide(theTarget.replace("Text", "Box"));
}

//revamp the whole sheet to become a "Complete Spell Sheet"
function ChangeToCompleteSpellSheet(thisClass, FAQpath) {
	if (minVer) return;
	ResetAll(true, true);
	thisClass = thisClass ? thisClass : "cleric";
	tDoc.getTemplate("SSfront").spawn(0, true, false);
	tDoc.deletePages({nStart: 1, nEnd: tDoc.numPages - 1});
	tDoc.getTemplate("SSfront").hidden = false;
	tDoc.getTemplate("SSmore").hidden = false;
	tDoc.getTemplate("remember").hidden = false;
	tDoc.getTemplate("blank").hidden = false;
	Value("Template.extras.SSfront", ",P0.SSfront.");

	//remove the saveIMG fields that are now useless
	tDoc.removeField("SaveIMG.Faction");
	tDoc.removeField("SaveIMG.ClassIcon");
	tDoc.removeField("SaveIMG.ALicon");

	for (var i = 0; i <= 3; i++) {
		this.getField("spellshead.prepare." + i).readonly = false;
		this.getField("spellshead.attack." + i).readonly = false;
		this.getField("spellshead.dc." + i).readonly = false;
		this.getField("P0.SSfront.spellshead.prepare." + i).readonly = false;
		this.getField("P0.SSfront.spellshead.attack." + i).readonly = false;
		this.getField("P0.SSfront.spellshead.dc." + i).readonly = false;
	};

	if (!typePF) { //if the Colorful version, remove some more useless fields
		tDoc.removeField("SaveIMG.Level");
		tDoc.removeField("SaveIMG.Attack");
		tDoc.removeField("SaveIMG.Prof");
		tDoc.removeField("SaveIMG.Stats");
		tDoc.removeField("SaveIMG.Header.Right");
		tDoc.removeField("SaveIMG.Arrow");
		tDoc.removeField("SaveIMG.IntArrow");
		tDoc.removeField("SaveIMG.HPdragonhead");
		tDoc.removeField("SaveIMG.SaveDC");
		tDoc.removeField("SaveIMG.DnDLogo");
		tDoc.removeField("SaveIMG.Honor");
		tDoc.removeField("SaveIMG.Sanity");
	}

	var keyPF = "This Spell Sheet is an extraction from MPMB's Character Record Sheet [Printer Friendly]. It follows the design and uses elements of the official D&D 5e character sheet by Wizards of the Coast, but has been heavily modified by Joost Wijnen [morepurplemorebetter] (mpmb@flapkan.com).\\n\\nOther credits:\\n- Gretkatillor on ENworld.org for the code in this sheet was inspired by Gretkatillor's brilliant 'Clean Sheet'.";

	var keyPFR = "This Spell Sheet is an extraction from MPMB's Character Record Sheet [Printer Friendly - Redesign]. It follows the design idea of the official D&D 5e character sheet by Wizards of the Coast, but has been created from the ground up by Joost Wijnen [morepurplemorebetter] (mpmb@flapkan.com).\\n\\nOther credits:\\n- Gretkatillor on ENworld.org for the code in this sheet was inspired by Gretkatillor's brilliant 'Clean Sheet'.";

	var keyCF = "This Spell Sheet is an extraction from MPMB's Character Record Sheet [" + tDoc.info.SheetType + "]. This sheet uses elements designed by Javier Aumente, but has been created from the ground up by Joost Wijnen [morepurplemorebetter] (mpmb@flapkan.com).\\n\\nOther credits:\\n- Gretkatillor on ENworld.org for the code in this sheet was inspired by Gretkatillor's brilliant 'Clean Sheet'."

	//move the pages that we want to extract to a new instance, by running code from a console
	var forConsole = [
		"Execute the following:\n\tFirst:",
		"tDoc.extractPages({nStart: 0, nEnd: 4});",
		"\n\tAnd in the newly created document:",
		"var toDelScripts = ['AbilityScores', 'ClassSelection', 'ListsBackgrounds', 'ListsCompanions', 'ListsCreatures', 'ListsFeats', 'ListsGear', 'ListsMagicItems', 'ListsRaces'];",
		"for (var s = 0; s < toDelScripts.length; s++) {this.removeScript(toDelScripts[s]);};",
		"this.createTemplate({cName:'SSfront', nPage:1 });",
		"this.createTemplate({cName:'SSmore', nPage:2 });",
		"this.createTemplate({cName:'remember', nPage:3 });",
		"this.createTemplate({cName:'blank', nPage:4 });",
		"this.getTemplate('SSfront').hidden = true;",
		"this.getTemplate('SSmore').hidden = true;",
		"this.getTemplate('remember').hidden = true;",
		"this.getTemplate('blank').hidden = true;",
		"this.info.SpellsOnly = '" + thisClass + "';",
		'this.info.SheetVersion = "' + tDoc.info.SheetVersion + '";',
		tDoc.info.SheetVersionType ? 'this.info.SheetVersionType = "' + tDoc.info.SheetVersionType + '";' : '',
		tDoc.info.SheetVersionBuild ? 'this.info.SheetVersionBuild = "' + tDoc.info.SheetVersionBuild + '";' : '',
		'this.info.SheetType = "' + tDoc.info.SheetType + '";',
		'this.info.Keywords = "' + (!typePF ? keyCF : (tDoc.info.SheetType === "Printer Friendly" ? keyPF : keyPFR)) + '";',
		'this.info.ContactEmail = "' + tDoc.info.ContactEmail + '";',
		'this.info.Subject = "D&D 5e; Character Sheet; Spell Sheet; Spell Sheet Generator";',
		"setGlobalVars();",
		"this.info.Title = MakeDocName();",
		"CreateBkmrksCompleteSpellSheet();",
		"this.calculateNow();",
		FAQpath ? 'this.importDataObject({cName: "FAQ.pdf", cDIPath: "' + FAQpath + '"});' : '',
		"Value('Opening Remember', 'Yes');",
		"app.execMenuItem('GeneralInfo');"
	];
	console.clear();
	console.println(forConsole.join("\n").replace(/\n{2,}/g, "\n"));
	console.show();
	tDoc.dirty = false;
}

//create the bookmarks of a Adventure Logsheet
function CreateBkmrksCompleteSpellSheet() {
	var bkmrks = {
		"Functions" : {
			cExpr : "MakeButtons(); tDoc.bookmarkRoot.children[0].open = !tDoc.bookmarkRoot.children[0].open;",
			children : {
				"Spell Sources" : {
					cExpr : "resourceDecisionDialog();",
					color : ["RGB", 0.93, 0.49, 0.098]
				},
				"Spell Options" : {
					cExpr : "MakeSpellMenu_SpellOptions();",
					color : ["RGB", 0.2509765625, 0.5176544189453125, 0.67059326171875]
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
				},
				"Add Extra Materials" : {
					cExpr : "ImportScriptOptions();"
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
		"Get More Content" : {
			cExpr : "contactMPMB('community content');"
		},
		"Contact MPMB" : {
			cExpr : "contactMpmbMenu();",
			color : ["CMYK", 0.76, 1, 0.03, 0.5] // DarkColorList.purple
		}
	};
	createBookmarks(tDoc.bookmarkRoot, bkmrks);
}

// a function to enforce the Spell Points of the printer friendly sheets
function ToggleSpellPoints() {
	if (!typePF) return; //only do this function for Printer Friendly versions
	var SPactive = What("SpellSlotsRemember") !== "[false,false]"; //true if we are going to set it to using spell points

	calcStop();

	//show/hide all visible spell slot checkboxes
	for (var i = 1; i < 10; i++) {
		var ssNR = SPactive ? 0 : What("SpellSlots.CheckboxesSet.lvl" + i);
		SetSpellSlotsCheckboxes(i, ssNR, true);
	}

	//show/hide the BlueText fields for setting the spell slots
	var SSfrontA = What("Template.extras.SSfront").split(",")[1];
	var HideDontPrint = !SPactive && CurrentVars.bluetxt ? "DontPrint" : "Hide";
	tDoc[HideDontPrint]("SpellSlots.CheckboxesSet");
	if (SSfrontA) tDoc[HideDontPrint](SSfrontA + "SpellSlots.CheckboxesSet");

	//show/hide the spell points image and checkboxes
	var ShowHide = SPactive ? "Show" : "Hide";
	tDoc[ShowHide]("Image.SpellPoints");
	tDoc[ShowHide]("SpellSlots.Checkboxes.SpellPoints");
	if (SSfrontA) {
		tDoc[ShowHide](SSfrontA + "Image.SpellPoints");
		tDoc[ShowHide](SSfrontA + "SpellSlots.Checkboxes.SpellPoints");
	}

	// add or remove the limited feature
	SpellPointsLimFea(SPactive ? "Add" : "Remove");

	Value("SpellSlotsRemember", SPactive ? "[false,false]" : "[true,true]");

	if (SPactive) ShowSpellPointInfo();
};

// a function to add (AddRemove == "Add") or remove (AddRemove == "Remove") the spell points limited feature as the first limited feature
function SpellPointsLimFea(AddRemove) {
	if (minVer) return; //only do this function for the full versions
	switch (AddRemove.toLowerCase()) {
	 case "add" :
		var SPexists = false;
		//first see if the limited feature not already exists
		for (var i = 1; i <= FieldNumbers.limfea; i++) {
			if ((/spell.?points?/i).test(What("Limited Feature " + i))) {
				SPexists = true;
				break;
			}
		}
		var SpellPointsAmount = SpellPointsTable[Math.min(SpellPointsTable.length - 1, classes.spellcastlvl.spellpoints)];
		if (!SPexists && What("Limited Feature 1") !== "" && SpellPointsAmount) LimFeaInsert(1);
		if (SpellPointsAmount) {
			AddFeature("Spell Points", SpellPointsAmount, "", "long rest", "Spell Point variant rules, Dungeon Master Guide page 288");
		} else if (SPexists) {
			RemoveFeature("Spell Points");
		};
		break;
	 case "remove" :
		RemoveFeature("Spell Points");
		break;
	}
}

// show a dialog with a warning for using spell points with warlocks
function ShowSpellPointInfo() {
	if (minVer) return; //only do this function for the full versions
	app.alert({
		cMsg : "You have set the sheet to use the " + toUni("Spell Points variant rule") + " from Dungeon Master's Guide, page 288. This hides the Spell Slots and only shows the Spell Point Cost on the spell sheets." + (minVer ? "" : "The amount of Spell Points your character possesses is shown in the Limited Features section on the first page.") + "\n\nPlease be aware that the " + toUni("Warlock class does not work with the Spell Points variant rule") + " and that any spell slots gained from the Warlock class will be effectively invisible. This is also true for any classes you have entered via Custom Script that use their own table for spell slots\nIf your character has levels in the Warlock class or otherwise uses the Warlock way of spellcasting, it is highly recommended not to use the Spell Points function of this sheet.",
		nIcon : 3,
		cTitle : "Spell Points and Warlocks don't mix!"
	})
}

// a way to test is a certain spell is set as known/on a list in the CurrentCasters variable, returning an array of CurrentCaster object names in which it exists
function isSpellUsed(spll, returnBoolean) {
	var rtrnA = [];
	var addAllSpClasses = function(spClass) {
		if (returnBoolean) return;
		var spClassObj = CurrentSpells[spClass];
		if (spClassObj.ability == "class") {
			rtrnA = rtrnA.concat(spClassObj.abilityToUse ? spClassObj.abilityToUse[1] : getSpellcastingAbility(spClass)[1]);
		}
	}

	if (SpellsList[spll]) {
		for (var aClass in CurrentSpells) {
			var spCast = CurrentSpells[aClass];
			var csAttr = ["selectCa", "selectBo", "selectSp", "selectSpSB", "extra"];
			for (var i = 0; i < csAttr.length; i++) {
				if (spCast[csAttr[i]] && spCast[csAttr[i]].indexOf(spll) !== -1) {
					rtrnA.push(aClass);
					addAllSpClasses(aClass);
					break;
				};
			};
			if (rtrnA.indexOf(aClass) === -1 && SpellsList[spll].level && (/list/i).test(spCast.typeSp)) {
				var spObj = newObj(spCast.list);
				spObj.level = [1, 9];
				var theSpList = CreateSpellList(spObj, false, spCast.extra, false, aClass, spCast.typeSp);
				if (theSpList.indexOf(spll) !== -1) {
					rtrnA.push(aClass);
					addAllSpClasses(aClass);
				}
			}
		}
	};

	return returnBoolean ? rtrnA.length > 0 : rtrnA;
};

// a way to test if the character has inherit spellcasting abilities (and if they don't just stem from magic items)
function isSpellcaster(classOnly) {
	for (var aCast in CurrentSpells) {
		if (!classOnly && !MagicItemsList[aCast]) return true;
		if (classOnly && ClassList[aCast] && CurrentSpells[aCast].factor) return true;
	}
	return false;
}

function amendPsionicsToSpellsList() {
	//Add the psionics to the SpellsList object
	if (PsionicsList) {
		var errorPsi = "";
		for (var psiO in PsionicsList) {
			if (SpellsList[psiO]) {
				if (!SpellsList[psiO].psionic) errorPsi += "\n \u2022 " + psiO + " was skipped, because it already exists in SpellsList.";
			} else {
				SpellsList[psiO] = PsionicsList[psiO];
			}
		};
	};
	if (errorPsi) {
		console.println("Error while adding Psionics to the sheet:" + errorPsi);
		console.show();
	};
};

//a way to test is an array of spells is correct
function testSpellArray(spArr) {
	var wrongArr = [];
	var sourceArr = [];
	spArr.forEach(function (sp) {
		if (!SpellsList[sp] || !SpellsList[sp].source) {
			wrongArr.push(sp);
			return;
		};
		var sSrc = stringSource(SpellsList[sp], "").replace(/\d+| /g, "").split(",");
		if (!sSrc || !sSrc[0]) {
			sourceArr.push("Source excluded: " + sp + " (" + SpellsList[sp].source + ")");
		} else {
			for (var i = 0; i < sSrc.length; i++) {
				if (sSrc[i] && sourceArr.indexOf(sSrc[i]) === -1) sourceArr.push(sSrc[i]);
			};
		};
	})
	return wrongArr.length ? "Not good, error with:\n\u2022" + wrongArr.join("\n\u2022") : "All Good, using sources:\n\u2022" + sourceArr.join("\n\u2022");
};

//a way to add dependencies of spells to an array of spells at the right spot
function addSpellDependencies(spArr) {
	var returnArray = [];
	spArr.forEach(function (sp) {
		if (SpellsList[sp]) {
			returnArray.push(sp);
			if (SpellsList[sp].dependencies) returnArray = returnArray.concat(SpellsList[sp].dependencies);
		}
	})
	return returnArray;
}

//set some global variables concerning spells and psionics
function setSpellVariables(reDoAll) {
	if (reDoAll) {
		AllPsionicClasses = false;
		AllCasterClasses = false;
	};
	var spellListAll = CreateSpellList({class : "any", psionic : "all"}, true, false, false, undefined, undefined, true);
	AllSpellsArray = spellListAll[0];
	AllSpellsObject = CreateSpellObject(spellListAll);
	AllPsionicsArray = CreateSpellList({class : "any", psionic : true}, true);
	AddSpellsMenu = ParseSpellMenu();
	AddPsionicsMenu = ParsePsionicsMenu();
}

//a way to generate a spell sheet that has all spells on it (alphabetical = true for an alphabetical list, and false for a list grouped by level)
function GenerateSpellSheetWithAll(alphabetical, skipdoGoOn) {
	if (app.viewerType !== "Reader" && tDoc.info.SpellsOnly) {
		tDoc.info.SpellsOnly = alphabetical ? "alphabetical" : "grouped by level";
		tDoc.info.Title = MakeDocName();
		Value("Opening Remember", "No");
	};
	// Start progress bar so we know it will be visible if a dialog is made
	var thermoTxt = thermoM("Generating Spell Sheets with all spells, Acrobat will be unresponsive for a long time...", false);
	//first ask the user if he really wants to wait for an hour
	var doGoOn = {
		cMsg: "You are about to remove any Spell Sheets that are currently in this document and replace them with a newly generated sheet containing all spells available " + (alphabetical ? "in alphabetical order" : "grouped by level") + ".\n\nThis will not include any spells excluded in the Source Selection dialog.\n\nBe aware that this process can take a while.\n\nAre you sure you want to continue?",
		nIcon: 2,
		cTitle: "Continue with generation of complete spell sheet?",
		nType: 2
	};
	if (!skipdoGoOn && app.alert(doGoOn) !== 4) {
		thermoM(thermoTxt, true); // Stop progress bar
		return;
	}

	thermoM(0.1); //increment the progress dialog's progress
	calcStop();

	thermoM(1/7); //increment the progress dialog's progress

	//then we remove all the existing sheets (if any)
	RemoveSpellSheets(true);

	var lineMax = FieldNumbers.spells[1]; //set the maximum we can go on this sheet
	var lineCurrent = 0; //set the current line on the Spell Sheet
	var headerCurrent = 0; //set the current header on the Spell Sheet
	var dividerCurrent = 0; //set the current divider on the Spell Sheet
	var SSfront = true; //set the state of on which Spell Sheet we are working

	//define a function for adding a new page
	var SpellPages = 1;
	var AddPage = function() {
		//add one more page and set the corresponding prefix to the variable
		prefixCurrent = DoTemplate("SSmore", "Add");
		SpellPages += 1;
		thermoTxt = thermoM("Filling out page " + SpellPages + " of the Spell Sheets...", false); //change the progress dialog text
		//now reset all the incremental variables to 0;
		lineMax = FieldNumbers.spells[1];
		lineCurrent = 0;
		headerCurrent = 0;
		dividerCurrent = 0;
		SSfront = false;
	}

	//now we add all the spells of this single class into a new set of spell sheets

	//get an array of all the spells, divided up in 1 array per spell level
	var fullSpellList = CreateSpellList("any", false, false, true);

	//now if this is an alphabetical list, we want to combine the arrays 1-9 into a single array
	if (alphabetical) {
		var orderedSpellList = new Array(12);
		orderedSpellList[0] = fullSpellList[0];
		orderedSpellList[1] = [].concat.apply([], fullSpellList.slice(1, 10)).sort();
		orderedSpellList[10] = fullSpellList[10];
		orderedSpellList[11] = fullSpellList[11];
	} else {
		var orderedSpellList = fullSpellList;
	}

	//for the first entry we need to make the template SSmore appear
	var prefixCurrent = tDoc.info.SpellsOnly ? "P0.SSmore." : DoTemplate("SSmore", "Add"); //set the current prefix on the Spell Sheet

	thermoTxt = thermoM("Filling out page 1 of the Spell Sheet...", false); //change the progress dialog text

	//now sort each of those new arrays and put them on the sheet
	for (var lvl = 0; lvl < orderedSpellList.length; lvl++) {
		var spArray = orderedSpellList[lvl];
		var isPsionics = lvl <= 9 ? "" : "psionic";
		if (spArray && spArray.length > 0) {
			//add spell dependencies to fill out the array
			spArray = addSpellDependencies(spArray);

			//first test if there is enough space left on the current page to add what we need to
			//assume that we need to add at least 5 of the spells, the total of this level of spells, whichever is less
			// so 3 (divider + title line) + lowest of [5, arrayLength]
			var needSpace = 3 + Math.min(5, spArray.length);
			if (needSpace > (lineMax - lineCurrent + 1)) AddPage();

			//then add the divider
			//if this is an alphabetical list, we want only four headers: "cantrips", "spells", "talents", "disciplines"
			var divLevel = !alphabetical || isPsionics || !lvl ? lvl : 12;
			Value(prefixCurrent + "spells.remember." + lineCurrent, "setdivider##" + divLevel + "##" + dividerCurrent);
			lineCurrent += 2;
			dividerCurrent += 1;

			//then add the title line
			var firstCol = isPsionics && lvl === 11 ? "##pp" : !isPsionics && alphabetical && lvl ? "##lv" : "";
			Value(prefixCurrent + "spells.remember." + lineCurrent, isPsionics + "setcaptions" + firstCol);
			lineCurrent += 1;

			for (var y = 0; y < spArray.length; y++) {
				aSpell = spArray[y];
				//check if not at the end of the page and, if so, create a new page
				if (lineCurrent > lineMax) AddPage();
				var spellLvl = alphabetical && !isPsionics && SpellsList[aSpell] && SpellsList[aSpell].level && SpellsList[aSpell].firstCol === undefined ? "##" + SpellsList[aSpell].level : "";
				Value(prefixCurrent + "spells.remember." + lineCurrent, aSpell + spellLvl);
				lineCurrent += 1;
			}
		}
		thermoM((lvl+2)/(orderedSpellList.length+2));
	};
	//add the glossary if there is still space on the last page
	if ((lineCurrent + 11) <= lineMax) {
		Value(prefixCurrent + "spells.remember." + lineCurrent, "setglossary");
	};
	//set the focus to the top of the spell sheets
	tDoc.getField(What("Template.extras.SSmore").split(",")[1] + BookMarkList["SSmore"]).setFocus();
	thermoM(thermoTxt, true); // Stop progress bar
};

// a function to get the right name of the spell object (i.e. non-SRD name if PHB is included)
function getSpNm(spellKey, getShort, spObj) {
	var spell = spObj ? spObj : SpellsList[spellKey];
	if (!spell || !spell.name) return getShort ? ["", ""] : "";
	var mainName = spell.name;
	var shortName = getShort && spell.nameShort ? spell.nameShort : getShort ? spell.name : "";
	if (spell.nameAlt && !SourceList.P) {
		if (spell.nameAlt.length <= shortName.length) {
			shortName = spell.nameAlt;
		} else {
			mainName = spell.nameAlt;
		}
	}
	return getShort ? [shortName, mainName != shortName ? mainName : ""] : mainName;
};

// A function to return the spellcasting ability
function getSpellcastingAbility(theCast) {
	var spAbility = 0;
	var curAbiScore = 0;
	var spObj = CurrentSpells[theCast];
	var casterArray = [];
	var testFixedDC = (/race|class/i).test(spObj.abilityBackup);
	var bContinueAsClass = false;
	if (spObj && spObj.ability && isNaN(spObj.ability) && !(/race|class/i).test(spObj.ability) && spObj.ability !== theCast) {
		// It is a string, but not "race" or "class", so it must be made to match another
		// Make sure it doesn't match this CurrentSpells entry name to avoid recursion
		if (CurrentSpells[spObj.ability] && CurrentSpells[spObj.ability].ability && CurrentSpells[spObj.ability].ability !== theCast) {
			return !isNaN(CurrentSpells[spObj.ability].ability) ? [CurrentSpells[spObj.ability].ability, [spObj.ability]] : getSpellcastingAbility(spObj.ability);
		} else {
			// No match found, so continue as if it would've said "class"
			testFixedDC = true;
			bContinueAsClass = true;
		}
	}
	if (spObj && spObj.ability && !isNaN(spObj.ability)) {
		spAbility = Number(spObj.ability);
	} else if (spObj && (spObj.ability == "class" || bContinueAsClass)) {
		var abiModArr = ["", "Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"];
		for (aCast in CurrentSpells) {
			// Test if this CurrentSpells entry is a class with spellcasting abilities
			if (aCast == theCast || !CurrentSpells[aCast].ability || isNaN(CurrentSpells[aCast].ability) || !CurrentClasses[aCast] || !CurrentClasses[aCast].spellcastingFactor) continue;
			var aCastAbility = Number(CurrentSpells[aCast].ability);
			if (spAbility == aCastAbility) {
				casterArray.push(aCast);
				continue;
			}
			var tempAbiScore = Number(What(abiModArr[aCastAbility]));
			if (tempAbiScore > curAbiScore) {
				spAbility = aCastAbility;
				curAbiScore = tempAbiScore;
				casterArray = [aCast];
			}
		}
		testFixedDC = true;
	} else if (spObj && spObj.ability == "race") {
		if (CurrentRace.known && CurrentSpells[CurrentRace.known] && CurrentSpells[CurrentRace.known].ability && !isNaN(CurrentSpells[CurrentRace.known].ability)) {
			spAbility = Number(CurrentSpells[CurrentRace.known].ability);
			casterArray = [CurrentRace.known];
		}
		testFixedDC = true;
	}
	// if the spellcasting ability is still 0 after testing class/race, set a fixed DC as if a +0 ability modifier, so just 8 + Prof
	if (testFixedDC) {
		if (spAbility == 0) {
			spObj.fixedDC = 8; // a fixed DC of 8 will always get the prof bonus added
		} else {
			delete spObj.fixedDC;
		}
	}
	return [spAbility, casterArray];
};

// A generic function to call from a calcChanges.spellAdd object to add a certain ability score
// dmgType has to be already escaped for use in regular expressions
// ability has to be the three-letter abbreviation of an ability starting with a capital, a number, or dice type (e.g. '1d8'). Anything else will cause the function call to fail (nothing happens)
function genericSpellDmgEdit(spellKey, spellObj, dmgType, ability, notMultiple, onlyRolls, maximizeRolls) {
	if (!spellKey || !SpellsList[spellKey] || !spellObj || !dmgType || (spellObj.dynamicDamageBonus && spellObj.dynamicDamageBonus.doNotProcess)) return;
	var isDieType = (/^\d*d\d+$/i).test(ability), addDieType;
	var abiMod = isDieType ? ability.replace(/^1d(\d+)$/i, "d$1") : !isNaN(ability) ? ability : tDoc.getField(ability + " Mod") ? Number(What(ability + " Mod")) : ability;
	var abiIsStr = !isDieType && isNaN(abiMod);
	var abiIfUpcasting = abiIsStr && /\/(\d*SL|PP|extra \w+)/i.test(abiMod);

	// Stop now if there is nothing (positive) to add or nothing to maximize
	if (!maximizeRolls && ((isNaN(ability) && abiMod < 1) || abiMod === 0 || (abiIfUpcasting && spellObj.noSpellUpcasting))) return;

	// Get the spell description to use, the 'shorter' spell description, if defined
	var useSpellDescr = spellObj.genericSpellDmgEdit ? spellObj.description : getSpellShortDescription(spellKey, spellObj);

	// If this spell has been previous processed and had its dice maximized, the onlyRolls parameter should not be applicable anymore
	if (onlyRolls && spellObj.genericSpellDmgEdit && spellObj.genericSpellDmgEditMaximizedDice) onlyRolls = false;

	// The function to maximize all dice in a string
	var maximizeDice = function(strDice) {
		var dMatch = strDice.match(/\d+d\d+/ig);
		if (!dMatch) return; // no dice to maximize
		var strReplace = strDice;
		// Replace each dice with their maximum
		for (var d = 0; d < dMatch.length; d++) {
			var iAmount = Number(dMatch[d].replace(/(\d+)d\d+/i, "$1"));
			var iDie = Number(dMatch[d].replace(/\d+d(\d+)/i, "$1"));
			strReplace = strReplace.replace(dMatch[d], iAmount * iDie);
		}
		// Replace numbers in brackes with their total (for /SL stuff)
		var bRx = /\([\+\-]?\d+([\+\-]\d+)+\)/i;
		while (bRx.test(strReplace)) {
			var bMatch = strReplace.match(bRx)[0];
			var bTotal = bMatch.match(/[\+\-]?\d+/g).reduce((a, b) => a + Number(b), 0);
			strReplace = strReplace.replace(bMatch, bTotal);
		}
		// Add consecutive bonuses (per group 'X/SL' and not 'X/SL')
		var qRx = /(([\+\-]?\d+)(\/\d*SL|\/PP|\/extra \w+)?)+( \((Str|Dex|Con|Int|Wis|Cha)\))?/i;
		if (qRx.test(strReplace)) {
			var qMatch = strReplace.match(qRx)[0];
			var qParts = qMatch.match(/[\+\-]?\d+(\/\d*SL|\/PP|\/extra \w+)?/ig);
			var qObj = { nr : 0 };
			for (var q = 0; q < qParts.length; q++) {
				if (!isNaN(qParts[q])) {
					qObj.nr += Number(qParts[q]);
				} else {
					var qPerMatch = qParts[q].match(qRx);
					if (!qPerMatch[3]) continue;
					qObj[qPerMatch[3]] = (qObj[qPerMatch[3]] ? qObj[qPerMatch[3]] : 0) + Number(qPerMatch[2]);
				}
			}
			var qStrReplace = "";
			for (var qType in qObj) {
				var qStr = qObj[qType];
				if (!qStr) continue;
				qStrReplace += (qStrReplace && qStr > 0 ? "+" : "") + qStr + (qType !== "nr" ? qType : "");
			}
			if (qStrReplace) strReplace = strReplace.replace(qMatch, qStrReplace);
		}
		spellObj.genericSpellDmgEditMaximizedDice = true;
		useSpellDescr = useSpellDescr.replace(strDice, strReplace);
	}
	// The function to fix a string of multiple X/SL+Y/SL to (X+Y)/SL
	var fixMultiPerSL = function(strSl) {
		var slMatch = strSl.match(/(\+?)(\d+d?\d*)(\/\d*SL|\/PP|\/extra \w+)\+(\d+d?\d*|\(.*?\))(\3)/i);
		if (!slMatch) return strSl;
		var aVals = [slMatch[2], slMatch[4]]; // Make an array of just the numerical/dice parts
		if ((/\(.*?\)/).test(aVals[1])) {
			// The second group is already a joined group, untangle it to just its numerical/dice parts
			var justNums = aVals[1].match(/\d+d?\d*/ig);;
			if (justNums) aVals = [slMatch[2]].concat(justNums);
		}
		// Add up the different type of dice and fixed numbers
		var oVal = { nr : 0 }, aDice = [];
		for (var i = 0; i < aVals.length; i++) {
			iVal = aVals[i];
			if (!isNaN(iVal)) {
				oVal.nr += Number(iVal);
			} else if (/\d+d\d+/i.test(iVal)) {
				var iValMatch = iVal.match(/(\d+)d(\d+)/i);
				var theDie = Number(iValMatch[2]);
				var theAmnt = Number(iValMatch[1]);
				if (aDice.indexOf(theDie) === -1) aDice.push(theDie);
				oVal[theDie] = (oVal[theDie] ? oVal[theDie] : 0) + theAmnt;
			}
		}
		// Create a new string to return
		aDice.sort((a,b)=>a-b); // sort the dice by size
		aDice.push("nr"); // add the default number at the end
		var strSlRe = "";
		for (var i = 0; i < aDice.length; i++) {
			var iDie = aDice[i];
			if (oVal[iDie]) strSlRe += (i > 0 && oVal[iDie] > 0 ? "+" : "") + oVal[iDie] + (iDie === "nr" ? "" : "d" + iDie);
		}
		if (aDice.length > 1) strSlRe = "(" + strSlRe + ")";
		return strSl.replace(slMatch[0], slMatch[1] + strSlRe + slMatch[3]);
	}
	// The function to fix a string of multiple constants not being added together
	var fixMultiConstants = function(strSl) {
		var qRx = /([\+\-]?\b\d+\b)(?![)/])(?: \((?:Str|Dex|Con|Int|Wis|Cha)\))?/ig;
		var qExec = qRx.exec(strSl);
		if (qExec) {
			var qMatch = strSl.match(qRx);
			var qTotal = qMatch.reduce((a, b) => a + Number(b.match(/[\+\-]?\d+/)[0]), 0);
			// remove all the matches from their string (but use exec, as we could easily get false positives)
			var isStart = !isNaN(qExec[0][0])
			var qInsertIdx = [];
			do {
				qInsertIdx.push([qExec.index, qExec[0].length, qExec[0][0]]);
			} while ((qExec = qRx.exec(strSl)) != null)
			for (var q = qInsertIdx.length - 1; q >= 0; q--) {
				var qLoc = qInsertIdx[q];
				strSl = strSl.substr(0, qLoc[0]) + strSl.substr(qLoc[0] + qLoc[1]);
			}
			strSl = strSl.substr(0, qInsertIdx[0][0]) + (qTotal > 0 && !isStart ? "+" : "") + qTotal + strSl.substr(qInsertIdx[0][0]);
		}
		return strSl;
	}
	// The function to update the actual damage part with the new addition
	var updateDescr = function(useMatch, onceExists, offsetMatch) {
		if (!useMatch || !ability) return useMatch[0];
		// If the first matched group is not the dice (+static modifiers), then go look for which group has this information
		var rxDie = /^(\+?\d+d?\d*)+$/i;
		if (!offsetMatch && !rxDie.test(useMatch[1]) ) {
			for (var i = 2; i < useMatch.length; i++) {
				if (rxDie.test(useMatch[i])) {
					offsetMatch = i - 1;
					break;
				}
			}
		}
		// Get each part of the string
		var useMatchDie = useMatch[1 + offsetMatch];
		var useMatchPre = useMatch.slice(1, 1 + offsetMatch);
		var useMatchPost = useMatch.slice(2 + offsetMatch, useMatch.length);
		// Find the same die (if isDieType) or a number being added (if !isDieType)
		var rRegex = isDieType ? RegExp("(.*?)(\\d" + (onceExists ? "*" : "+") + ")(d" + addDieType[2] + ".*)", "i") : /(.*[\+\-]|^)(\d+(?!d|\d))(.*)/;
		var rRxMatch = useMatchDie.match(rRegex);
		var strReplace = "";
		if (rRxMatch && !abiIsStr) {
			// We found the same die / any number being added, so add our addition to that
			var addNr = isDieType ? Number(addDieType[1]) : abiMod;
			var oldDieAmount = isDieType && rRxMatch[2].toString() === "0" ? 0 : Math.max(Number(rRxMatch[2]), 1);
			var newPart = [rRxMatch[1], (oldDieAmount + addNr), rRxMatch[3]].join("");
			strReplace = useMatchPre + newPart + useMatchPost;
		} else {
			// No same die type / static number beind added, so add our addition as text
			var addNr = "+" + (isDieType && !onceExists ? ability : abiMod);
			strReplace = useMatchPre + useMatchDie + addNr + useMatchPost;
		}
		strReplace = fixMultiConstants(fixMultiPerSL(strReplace));
		useSpellDescr = useSpellDescr.replace(useMatch[0], strReplace);
		return strReplace;
	}

	// Create the matching regex with non-capturing inner groups
	var isHealing = /heal|\bhp\b|restore/.test(dmgType);
	var sRegex = (isHealing ? "(heals? |to life with )" : "") + "((?:\\+?\\d+d?\\d*)+)((?:\\+(?:\\((?:\\+?\\d+d?\\d*)+\\)|\\d+d?\\d*)\\/(?:\\d*SL|PP|extra \\w+))*(?:\\+ ?(?:my )?spell(?:casting)? (?:ability )?mod(?:ifier)?|(?:\\+|-)\\d+ \\(.{3}\\))? (?:" + (isHealing ? "" : dmgType) + ") ?(?:" + (isHealing ? "hp|hit points?" : "dmg|damage") + ")(?: per \\w+| each|/rnd|/turn)?)";

	// If the spell has multiple damage types, we need to check if any or all of them match the dmgType we are looking for
	var onlySomeDmgTypes = false;
	if (spellObj.dynamicDamageBonus && spellObj.dynamicDamageBonus.multipleDmgTypes && isArray(spellObj.dynamicDamageBonus.multipleDmgTypes.dmgTypes)) {
		var multiDmgTypes = spellObj.dynamicDamageBonus.multipleDmgTypes.dmgTypes;
		var rxDmgType = RegExp(dmgType, "i");
		var matchFunc = function (n) { return rxDmgType.test(n); };
		var matchesEvery = multiDmgTypes.every(matchFunc);
		var matchesSome = multiDmgTypes.some(matchFunc);
		if (matchesSome && typeof spellObj.dynamicDamageBonus.multipleDmgTypes.inDescriptionAs === "string") {
			// Matches some (maybe every) damage type, so add use special match group for the regex, because it (probably) doesn't follow the normal syntax
			sRegex = sRegex.replace("(?:" + dmgType + ")", "(?:" + spellObj.dynamicDamageBonus.multipleDmgTypes.inDescriptionAs + ")");
		}
		if (!matchesEvery && matchesSome) {
			// Matches some, but not all damage types, so we want to add a conditional statement akin to what would happen when notMultiple = true and there are multiple damage types. Thus, use that part of the code, with a small addition
			onlySomeDmgTypes = true;
		}
	}
	// Spells that have two damage types but still only a single damage roll moment shouldn't get the damage added twice
	if (!notMultiple && spellObj.dynamicDamageBonus && spellObj.dynamicDamageBonus.allDmgTypesSingleMoment) {
		notMultiple = true;
	}
	// Spells that have multiple damages, but a specific one should be augmented when it isn't allowed to add the modifier to multiple rolls
	if (notMultiple && spellObj.dynamicDamageBonus && spellObj.dynamicDamageBonus.skipDmgGroupIfNotMultiple && typeof spellObj.dynamicDamageBonus.skipDmgGroupIfNotMultiple === "object") {
		var possibleRegex = spellObj.dynamicDamageBonus.skipDmgGroupIfNotMultiple.toInnerString() + sRegex;
		if (RegExp(possibleRegex, "i").test(useSpellDescr)) sRegex = possibleRegex;
	}

	var tRx = RegExp(sRegex, "i");
	var arrRegex = [tRx];
	var tRxMatch = useSpellDescr.match(tRx);
	// Stop now if no match or a match but not for any dice while onlyRolls == true
	var bRollMatch = tRxMatch && (/\d*d\d+/i).test(tRxMatch[2]);
	if (!tRxMatch || (onlyRolls && !bRollMatch) || (maximizeRolls && !bRollMatch && !ability)) return;

	// Spells that have a secondary (or more) damage group of the same damage type that doesn't follow the syntax
	if (spellObj.dynamicDamageBonus && spellObj.dynamicDamageBonus.extraDmgGroupsSameType && typeof spellObj.dynamicDamageBonus.extraDmgGroupsSameType === "object") {
		var eRegex = spellObj.dynamicDamageBonus.extraDmgGroupsSameType;
		arrRegex.push(eRegex); // add it to the array of damage group regex to modify
		sRegex += "|" + eRegex.toInnerString(); // add to sRegex for the multi check below
	}

	// See if we have multiple damage instances that match
	var tRxMatchMulti = useSpellDescr.match(RegExp(sRegex, "ig"));

	// If adding dice instead of a static value
	if (isDieType) {
		if (!(/^\d+d\d+$/i).test(ability)) ability = "1" + ability;
		addDieType = ability.match(/^(\d+)d(\d+)$/i);
	}

	if (notMultiple || onlySomeDmgTypes) {
		if (maximizeRolls) maximizeDice(tRxMatch[0]);
		// testing if the once addition (1× +X) or (+X if..) already exists
		var oRegex = /(\(1\xD7 |\(once |\()((?:\+\d*d?\d+)+)((?: if\.\.)?\))/i;
		if (spellObj.genericSpellDmgEdit && oRegex.test(useSpellDescr)) {
			// Another addition already took place, so merge them with the current
			var oRxMatch = useSpellDescr.match(oRegex);
			updateDescr(oRxMatch, true, 1);
			spellObj.description = useSpellDescr;
			return true; // We are done
		}
		// If a spell has a longer duration than instantaneous or 1 round and is not just on the next weapon hit, we should only add the addition once, not to all damage rolls
		// There are some spells for which this is true and should be done as normal (falsePositives) or spells for which this is not true, but should be done anyway (falseNegatives)
		var isFalsePositive, isFalseNegative;
		if (spellObj.dynamicDamageBonus && spellObj.dynamicDamageBonus.multipleDmgMoments !== undefined) {
			if (spellObj.dynamicDamageBonus.multipleDmgMoments) {
				isFalseNegative = true;
			} else {
				isFalsePositive = true;
			}
		}
		var hasMultipleDmgInstances = isFalseNegative || (!isFalsePositive && !(/instant|1 r(ou)?nd/i).test(spellObj.duration) && !(/next (melee |ranged|rngd )?wea(pon)? (atk|hit) \+?\d+/i).test(useSpellDescr));
		if (onlySomeDmgTypes || hasMultipleDmgInstances) {
			var sOnceBonus = (notMultiple && hasMultipleDmgInstances ? " (1\xD7 +" : " (+") + abiMod + (onlySomeDmgTypes ? " if.." : "") + ")";
			// Add the " (1× +X)" after the "dmg/damage" part, unless there are multiple damage types
			if (tRxMatchMulti.length > 1) {
				// Has multiple damage instances that match, so add it at the end
				spellObj.description = useSpellDescr + sOnceBonus;
			} else {
				// One damage type that this can be added to once, so add it directly there
				spellObj.description = useSpellDescr.replace(tRxMatch[0], tRxMatch[0] + sOnceBonus);
			}
			// This function is done
			spellObj.genericSpellDmgEdit = true;
			return true;
		}
	}
	// Now update the damage part of the description with the new addition
	for (var i = 0; i < tRxMatchMulti.length; i++) {
		if (notMultiple && i > 0) break;
		var aRegex = arrRegex[Math.min(i, arrRegex.length - 1)];
		var aRxMatch = tRxMatchMulti[i].match(aRegex);
		if (!aRxMatch) continue;
		var strNewPart = updateDescr(aRxMatch, false, 0);
		if (maximizeRolls) maximizeDice(strNewPart);
	}
	if (spellObj.description !== useSpellDescr) {
		spellObj.description = useSpellDescr;
		spellObj.genericSpellDmgEdit = true;
		return true;
	}
}

// A function to return the shorter spell description, if defined, and if the current description matches the original description
function getSpellShortDescription(spellKey, spellObj) {
	var useSpellDescr = spellObj.description;
	if (!SpellsList[spellKey]) return useSpellDescr;
	var isMetric = What("Unit System") === "metric";
	var origSpellDescr = isMetric && SpellsList[spellKey].descriptionMetric ? SpellsList[spellKey].descriptionMetric : isMetric ? ConvertToMetric(SpellsList[spellKey].description, 0.5) : SpellsList[spellKey].description;
	var curSpellDescr = spellObj.descriptionBeforeamendSpDescr ? spellObj.descriptionBeforeamendSpDescr : spellObj.description;
	if ( curSpellDescr === origSpellDescr && (spellObj.descriptionShorter || (isMetric && spellObj.descriptionShorterMetric)) ) {
		// This object uses its default description, and has a defined shorter description, so use that
		useSpellDescr = isMetric && spellObj.descriptionShorterMetric ? spellObj.descriptionShorterMetric : isMetric ? ConvertToMetric(spellObj.descriptionShorter, 0.5) : spellObj.descriptionShorter;
		// If the description of this spell was changed to use spellcasting ability, do so again with the shorter version
		if (CurrentCasters.amendSpDescr && spellObj.descriptionBeforeamendSpDescr && spellObj.amendSpDescrCaster) {
			var editSpellDescr = applySpellcastingAbility({
				description : useSpellDescr,
				amendSpDescrCaster : spellObj.amendSpDescrCaster
			});
			if (editSpellDescr) useSpellDescr = editSpellDescr;
		}
	}
	// Do some common replacements to save space for the very limited short description
	var arrTxtReplace = [
		[/ and /ig, ' \u0026 '],
		[/(dif)ficult (ter)(rain|\.)|(dif)(ficult|\.) (ter)rain/ig, '$1. $2.'],
		[/(crea)tures?/ig, '$1'],
		[/(obj)ects?/ig, '$1'],
		[/(r)ounds?/ig, '$1nd'],
		[/(save hal)ves?/ig, '$1f'],
		[/(see) book/ig, '$1 B'],
		[/(adv)antage|(dis)advantage/ig, '$1.']
	];
	for (var i = 0; i < arrTxtReplace.length; i++) {
		useSpellDescr = useSpellDescr.replace(arrTxtReplace[i][0], arrTxtReplace[i][1]);
	};
	return useSpellDescr;
}
