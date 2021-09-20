// a function to set ability scores to the global variable
function processStats(AddRemove, inType, NameEntity, inScoresA, dialogTxt, isSpecial, inAlsoHasMax, maxIsLimitToNow) {
	// Redo the arrays, so that they are no longer a reference
	var scoresA = inScoresA && isArray(inScoresA) ? [].concat(inScoresA) : [];
	var alsoHasMax = inAlsoHasMax && isArray(inAlsoHasMax) ? [].concat(inAlsoHasMax) : false;
	// initialize some variables
	initiateCurrentStats();
	if (isSpecial && !CurrentStats[isSpecial]) return; // the special type doesn't exist
	inType = GetFeatureType(inType);
	var type = isSpecial ? isSpecial.replace(/s$/, '') : inType;
	var dialogTxt = dialogTxt ? dialogTxt.replace(/^( |\n)*.*: |;$/g, '') : "";
	var curStat = false;
	// Get the column object
	for (var i = 1; i < CurrentStats.cols.length; i++) {
		if (CurrentStats.cols[i].type === type) {
			curStat = CurrentStats.cols[i];
			break;
		}
	}
	if (!curStat && type === "background") {
		ASaddColumn("Backgr-\nound", true);
		i = CurrentStats.cols.length - 1;
		curStat = CurrentStats.cols[i];
	} else if (!curStat) {
		return;
	}
	var imprTxtArr = [], saveMaximumsLimited;
	// Set the ability score changes to the CurrentStats global variable
	for (var s = 0; s < scoresA.length; s++) {
		if (AddRemove && maxIsLimitToNow && alsoHasMax && scoresA[s] && alsoHasMax[s]) {
			/* Only add the bonus up to the maximum listed, or less if possible
			e.g. the text reads "score increases by 2, to a maximum of 22", thus:
				- if the score is now 18 or less, add 2 but add no maximum
				- if the score is now 19, add 2, and set the max to 21
				- if the score is now 20 or more, add 2 and set the max to 22 (no change)
			Save this addition to an object and use that object to remove the addition when the time comes.
			*/
			var iCurScore = Number(What(AbilityScores.abbreviations[s]));
			if (iCurScore + scoresA[s] < alsoHasMax[s]) {
				alsoHasMax[s] = iCurScore + scoresA[s] > 20 ? iCurScore + scoresA[s] : 0;
				saveMaximumsLimited = "save";
			}
		} else if (s === 0 && !AddRemove && maxIsLimitToNow && alsoHasMax && CurrentStats.maximumsLimited && CurrentStats.maximumsLimited[NameEntity]) {
			// When removing, on the first stat, if a reference was saved, update the array with the saved values and signal to delete the save later
			alsoHasMax = [].concat(CurrentStats.maximumsLimited[NameEntity]);
			saveMaximumsLimited = "remove";
		}
		if (type === "race") curStat.scores[s] = 0;
		if (!scoresA[s]) continue;
		if (AddRemove && !dialogTxt && s < 7) {
			var theScoreName = s < 6 ? AbilityScores.names[s] : What("HoSRememberState");
			var theScore = type == "override" ? theScoreName + " is " + scoresA[s]
				: type == "maximum" ? theScoreName + " maximum is " + scoresA[s]
				: (scoresA[s] > 0 ? "+" : "") + scoresA[s] + " " + theScoreName;
			imprTxtArr.push(theScore);
		}
		if (isSpecial) {
			if (AddRemove) {
				CurrentStats[isSpecial][s][NameEntity] = scoresA[s];
			} else {
				delete CurrentStats[isSpecial][s][NameEntity];
			}
			// now set the new highest override/maximum
			curStat.scores[s] = 0;
			var aMods = [];
			for (var a in CurrentStats[isSpecial][s]) {
				var thisStat = CurrentStats[isSpecial][s][a];
				if (isNaN(thisStat.substring(0,1)) && !isNaN(thisStat.substring(1))) {
					aMods.push(thisStat);
				} else if (!isNaN(thisStat) && thisStat > curStat.scores[s]) {
					curStat.scores[s] = Number(thisStat);
				}
			}
			if (type === "maximum" && !curStat.scores[s]) curStat.scores[s] = 20;
			if (aMods.length) curStat.scores[s] = processModifiers(curStat.scores[s], aMods);
		} else {
			if (AddRemove) {
				curStat.scores[s] += scoresA[s];
			} else if (type !== "race") {
				curStat.scores[s] -= scoresA[s];
			}
		}
	}
	// If we changed the input scores or scoresMaximum arrays, save it to a safe place
	if (saveMaximumsLimited === "save") {
		// in case the object was imported from older version
		if (!CurrentStats.maximumsLimited) CurrentStats.maximumsLimited = {};
		CurrentStats.maximumsLimited[NameEntity] = alsoHasMax;
	} else if (saveMaximumsLimited === "remove") {
		delete CurrentStats.maximumsLimited[NameEntity];
	}
	// Perhaps there is no maximum to proceed with anymore. If so, flag it as false
	if (alsoHasMax && alsoHasMax.reduce(function(acc, val) { return acc + val; }, 0) === 0) alsoHasMax = false;
	// Set the descriptive text to the CurrentStats global variable
	if (AddRemove) {
		var useDialogTxt = dialogTxt ? dialogTxt : formatLineList("", imprTxtArr);
		// If the entry doesn't already exist or doesn't contain the text, add it
		if (!CurrentStats.txts[inType][NameEntity] || CurrentStats.txts[inType][NameEntity].indexOf(useDialogTxt) === -1) {
			CurrentStats.txts[inType][NameEntity] = (!dialogTxt && CurrentStats.txts[inType][NameEntity] ? CurrentStats.txts[inType][NameEntity] + "; " : "") + useDialogTxt;
		} else if (!dialogTxt && !alsoHasMax && CurrentStats.txts[inType][NameEntity].indexOf(useDialogTxt) !== -1) {
			// If the entry already exists and contains the exact text that we are about to add, which isn't predetermined, skip it entirely
			CurrentStats = eval(What("CurrentStats.Stringified"));
			return;
		}
	} else {
		delete CurrentStats.txts[inType][NameEntity];
		if (type === "background" && !ObjLength(CurrentStats.txts.background) && Number(curStat.scores.join("")) === 0) {
			CurrentStats.cols.splice(i, 1);
		}
	}
	// Remember the ability score change for those items that also change the maximum and do their maximum change now as well
	if (alsoHasMax) {
		if (AddRemove) {
			CurrentStats.maximumsLinked[NameEntity] = scoresA;
		} else {
			delete CurrentStats.maximumsLinked[NameEntity];
		}
		processStats(AddRemove, inType, NameEntity, alsoHasMax, dialogTxt, "maximums", false);
	} else {
		// Only do this once, either now or with the above processStats call if there are also maximums
		SetStringifieds("stats");
		CurrentUpdates.types.push("stats" + inType);
	}
}

// a function to initiate the global variable if it doesn't yet exist
function initiateCurrentStats(forceIt) {
	if (!forceIt) for (var entry in CurrentStats) return; // do nothing if the variable already exists
	CurrentStats = {
		"cols" : [{
			type : 'base',
			name : "Score Base",
			scores : [8,8,8,8,8,8,8]
		}, {
			type : 'race',
			name : "Racial Bonus",
			scores : [0,0,0,0,0,0,0]
		}, {
			type : 'feats',
			name : "Feat Bonus",
			scores : [0,0,0,0,0,0,0]
		}, {
			type : 'classes',
			name : "Class Bonus",
			scores : [0,0,0,0,0,0,0]
		}, {
			type : 'levels',
			name : "Level Bonus",
			scores : [0,0,0,0,0,0,0]
		}, {
			type : 'magic',
			name : "Magic Bonus",
			scores : [0,0,0,0,0,0,0]
		}, {
			type : 'items',
			name : "Magic Items*",
			scores : [0,0,0,0,0,0,0]
		}, {
			type : 'override',
			name : "Magical Override",
			scores : [0,0,0,0,0,0,0]
		}, {
			type : 'maximum',
			name : "Max Total**",
			scores : [20,20,20,20,20,20,20]
		}],
		"txts" : {
			"classes" : {},
			"race" : {},
			"feats" : {},
			"items" : {},
			"magic" : {},
			"background" : {}
		},
		"overrides" : [{},{},{},{},{},{},{}],
		"maximums" :  [{},{},{},{},{},{},{}],
		"maximumsLinked" : {},
		"maximumsLimited" : {}
	}
	SetStringifieds("stats");
}

// a function to round a number to no decimals and return it as a string
function ASround(input) {
	input = parseFloat(input.replace(",", "."));
	return isNaN(input) ? "0" : Math.round(input).toFixed(0);
}

// a function to calculate the point buy value of a stat
function ASCalcPointBuy(theScore) {
	theScore = parseFloat(theScore.replace(",","."));
	if (isNaN(theScore) || theScore <= 8) {
		var toReturn = 0;
	} else {
		var toReturn = theScore - 8;
		if (theScore > 13) toReturn += theScore - 13;
	}
	return toReturn.toFixed(0);
}

// the function to call to start and apply the ability score dialog
function AbilityScores_Button(onlySetTooltip) {
	// initialize some variables
	initiateCurrentStats();
	var titleTxt = "Ability Scores";
	var explanatoryTxt = [
		"The standard array is: 15, 14, 13, 12, 10, and 8.",
		"Normal Point Buy is 27 points and you can't have a Score Base over 15.",
		"Unless otherwise noted, ability score improvements can't take the total over 20, see the Max Total column.",
		"*Magic Items column is only populated by the automation. Their value is added to the Magical Override if applicable.",
		"**Override columns (and Magical Override + Magic Items) will ignore the maximum total."
	].join("\n");
	var curHoS = What("HoSRememberState");
	var asab2 = ["St", "Dx", "Cn", "In", "Ws", "Ch", "HS"];
	var asab3 = ["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"];

	// set the descriptive text for the dialog
	var sections = {
		ref : {
			title : "Primary class abilities \u0026 Multiclassing prerequisites",
			loc : "left",
			txt : ""
		},
		race : {
			title : "Racial ability score improvements",
			loc : "right",
			txt : ""
		},
		asi : {
			title : "Class levels ability score improvements",
			loc : "left",
			txt : ""
		},
		classes : {
			title : "Class Features ability score improvements",
			loc : "right",
			txt : ""
		},
		feats : {
			title : "Feat ability score improvements",
			loc : "right",
			txt : ""
		},
		items : {
			title : "Magic Item ability score boosts",
			loc : "left",
			txt : ""
		},
		magic : {
			title : "Other magic ability score boosts",
			loc : "right",
			txt : ""
		},
		background : {
			title : "Background ability score improvements",
			loc : "left",
			txt : ""
		}
	};

	// Create the strings from the CurrentClasses objects
	var refTxt = [];
	var asiTxt = [];
	var multiClass = ObjLength(CurrentClasses) > 1;
	for (var aClass in classes.known) {
		var tClass = CurrentClasses[aClass];
		var clHead = "\u2022 " + toUni(tClass.name) + ": ";
		// String for class primary abilities and multiclass prerequisites
		var primeAbi = multiClass && tClass.prereqs ? tClass.prereqs : tClass.primaryAbility;
		if (primeAbi) primeAbi = primeAbi.replace(/^( |\n)*.*: |;$/g, '');
		refTxt.push(clHead + primeAbi);
		// String for ASI from class level
		var imprLVL = Math.min(classes.known[aClass].level, tClass.improvements.length);
		if (tClass.improvements[imprLVL - 1]) asiTxt.push(clHead + "\xD7" + tClass.improvements[imprLVL - 1]);
	}
	if (refTxt.length) {
		refTxt.sort();
		sections.ref.txt = refTxt.join(";\n") + ".";
	}
	if (asiTxt.length) {
		asiTxt.sort();
		sections.asi.txt = "Add 2 points to ability scores -or- take 1 feat:\n" + asiTxt.join(";\n") + ".";
	}

	// Create the strings from the CurrentStats objects
	for (var sType in CurrentStats.txts) {
		if (!sections[sType]) continue;
		var tArr = [];
		for (var sName in CurrentStats.txts[sType]) {
			tArr.push("\u2022 " + toUni(sName) + ": " + CurrentStats.txts[sType][sName]);
		}
		if (tArr.length) {
			tArr.sort();
			sections[sType].txt = tArr.join(";\n") + ".";
		}
	}

	// Also set the tooltips of the ability score fields
	var tooltipTxt = [];
	for (var section in sections) {
		var sect = sections[section];
		if (sect.txt) tooltipTxt.push(sect.title + "\n" + sect.txt);
	}
	tooltipTxt = tooltipTxt.join("\n\n");
	var remTooltip = Who("Str");
	for (i = 0; i < AbilityScores.abbreviations.length; i++) {
		AddTooltip(AbilityScores.abbreviations[i], tooltipTxt);
	};
	if (onlySetTooltip) return remTooltip !== tooltipTxt; // if only doing the tooltips, exit the function now

	// Create the columns for the dialog
	var leftTxts = [];
	var rightTxts = [];
	var halfWidth = CurrentStats.cols.length * 4 + 5;
	for (var section in sections) {
		var sect = sections[section];
		if (!sect.txt) continue;
		var newCluster = {
			name : sect.title.replace("\u0026", "\u0026\u0026"),
			type : "cluster",
			alignment : "align_" + sect.loc,
			item_id : "cl" + section.substr(0,2),
			font : "dialog",
			bold : true,
			elements : [{
				name : sect.txt.replace("\u0026", "\u0026\u0026"),
				type : "static_text",
				item_id : "tx" + section.substr(0,2),
				alignment : "align_fill",
				font : "dialog",
				wrap_name : true,
				char_width : halfWidth
			}]
		};
		if (sect.loc == "left") {
			leftTxts.push(newCluster);
		} else {
			rightTxts.push(newCluster);
		}

	}

	// a function to create the dialog from the global CurrentStats variable
	var openStatsDialog = function() {
		// Create the columns
		var theColumns = [];

		// start at 1, because base column is already there
		for (var i = 1; i < CurrentStats.cols.length; i++) {
			var theStat = CurrentStats.cols[i];
			var aNo = ("0" + i).slice(-2);
			var theCol = {
				type: "view",
				elements: [{
					type : "static_text",
					item_id : aNo + "Nm",
					font : "dialog",
					bold : true,
					char_width : theStat.type == 'items' ? 4 : theStat.name.toLowerCase().indexOf("override") == -1 ? 5 : 6,
					height : 30,
					alignment : "align_left",
					wrap_name : true,
					name : theStat.name
				}]
			};
			for (var s = 0; s < 7; s++) {
				theCol.elements.push({
					type : "edit_text",
					item_id : aNo + asab2[s],
					char_width : 3,
					height : 25,
					SpinEdit : theStat.type != 'items',
					name : "0",
					readonly : theStat.type == 'items'
				})
			}
			if (theStat.type == 'maximum') {
				var theMaxCol = theCol;
			} else {
				theColumns.push(theCol);
			}
		}

		// Create the dialog variable
		var AbilityScores_Dialog = {
			fieldHoS : curHoS,

			initialize : function (dialog) {
				var popupHoS =  {
					"*7th ability*" : !curHoS,
					"Honor" : curHoS == "Honor",
					"Sanity" : curHoS == "Sanity"
				};
				// set the current scores, stat names, and dialog icon
				var toSet = {
					"exTx" : explanatoryTxt,
					"img1" : allIcons.scores,
					"olNm" : "Current Score",
					"olSt" : ASround(What("Str")),
					"olDx" : ASround(What("Dex")),
					"olCn" : ASround(What("Con")),
					"olIn" : ASround(What("Int")),
					"olWs" : ASround(What("Wis")),
					"olCh" : ASround(What("Cha")),
					"olHS" : ASround(What("HoS")),
					"nmNm" : "Ability Name",
					"nmSt" : "Strength",
					"nmDx" : "Dexterity",
					"nmCn" : "Constitution",
					"nmIn" : "Intelligence",
					"nmWs" : "Wisdom",
					"nmCh" : "Charisma",
					"nmHS" : popupHoS,
					"pbNm" : "Point Buy",
					"tPNm" : "Point Buy total:",
					"tNm0" : "New Total",
					"00Nm" : CurrentStats.cols[0].name,
					"abNm" : "Ability Abbr.",
					"abSt" : "Str",
					"abDx" : "Dex",
					"abCn" : "Con",
					"abIn" : "Int",
					"abWs" : "Wis",
					"abCh" : "Cha",
					"abHS" : "HoS",
					"cAdB" : "Add Column",
					"cReB" : "Remove Column"
				};
				// set the values
				var anyExtraCols = false;
				for (var i = 0; i < CurrentStats.cols.length; i++) {
					var thisCol = CurrentStats.cols[i];
					if (thisCol.type == 'extra') anyExtraCols = true;
					var aNo = ("0" + i).slice(-2);
					for (var s = 0; s < 7; s++) {
						if (thisCol.scores[s]) toSet[aNo + asab2[s]] = thisCol.scores[s].toString();
					}
				}
				// load these things into the dialog
				dialog.load(toSet);

				// disable the 'remove column' button if there are no extra columns
				if (!anyExtraCols) dialog.enable({ "cReB" : false });

				// now update the totals
				for (var s = 0; s < 7; s++) {
					this.updateTotal(dialog, asab2[s]);
					this.updatePB(dialog, asab2[s]);
				}

				// now see if we should hide the Honor/Sanity row
				if (curHoS == "") this.showHoS(dialog, false);
			},

			commit : function (dialog) {
				var res = dialog.store();
				// Save to the global variable
				this.setCurrentStats(dialog);
				// Start progress bar and stop calculations
				var thermoTxt = thermoM("Applying stats...");
				calcStop();
				// Set the new ability scores to the fields (and their mods, so functions use the new one)
				for (var s = 0; s < 7; s++) {
					var theAbi = res["to"+asab2[s]];
					Value(asab3[s], theAbi);
					Value(asab3[s] + " Mod", Math.round((Number(theAbi) - 10.5) * 0.5));
				}
				// Update the Honor/Sanity
				if (this.fieldHoS !== curHoS) ShowHonorSanity(this.fieldHoS);
				// Apply HP tooltips if Con changed
				if (res["olCn"] != res["toCn"]) CurrentUpdates.types.push("hp");
				// Recalculate attack entries, as they might have changed (Finesse)
				CurrentUpdates.types.push("attacks");
				thermoM(thermoTxt, true); // Stop progress bar
			},

			setCurrentStats : function (dialog) {
				var res = dialog.store();
				for (var i = 0; i < CurrentStats.cols.length; i++) {
					var aNo = ("0" + i).slice(-2);
					CurrentStats.cols[i].scores = [];
					for (var s = 0; s < 7; s++) {
						CurrentStats.cols[i].scores[s] = Number(res[aNo + asab2[s]]);
					}
				}
			},

			nmHS : function (dialog) {
				var popupHoS = dialog.store()["nmHS"];
				for (var thing in popupHoS) {
					if (popupHoS[thing] > 0) {
						var isFilled = thing.substr(0,1) !== "*";
						this.fieldHoS = isFilled ? thing : "";
						this.showHoS(dialog, isFilled);
						return;
					}
				};
			},

			showHoS : function (dialog, showIt) {
				var toShow = {
					"olHS" : showIt,
					"pbHS" : showIt,
					"toHS" : showIt,
					"abHS" : showIt
				};
				for (var i = 0; i < CurrentStats.cols.length; i++) {
					var aNo = ("0" + i).slice(-2);
					toShow[aNo + asab2[6]] = showIt;
				}
				dialog.visible(toShow);
			},

			updateVals : function (dialog, fldNm, alsoPB) {
				// make sure it is a number
				var res = dialog.store();
				var newLoad = {};
				newLoad[fldNm] = ASround(res[fldNm]);
				dialog.load(newLoad);
				// update the totals
				this.updateTotal(dialog, fldNm);
				// update the point buy
				if (alsoPB) this.updatePB(dialog, fldNm);
			},

			// Unfortunately, + bonuses from Magic Items stack with the override from other sources
			// See here: https://www.sageadvice.eu/2016/09/29/does-the-bonus-strength-from-the-hammer-of-thunderbolts-stack-with-your-giants-strength-belt/
			updateTotal : function (dialog, fldNm) {
				var res = dialog.store();
				var type = fldNm.slice(-2);
				var indx = asab2.indexOf(type);
				var theTotal = 0;
				var theMax = 20;
				var theOverrides = [0];
				var fromItems = 0;
				for (var i = 0; i < CurrentStats.cols.length; i++) {
					var thisCol = CurrentStats.cols[i];
					var aNo = ("0" + i).slice(-2);
					var itsVal = Number(res[aNo + type]);
					if (thisCol.type == "maximum") {
						theMax = itsVal;
					} else if (thisCol.name.toLowerCase().indexOf("override") !== -1) {
						theOverrides.push(itsVal);
					} else {
						theTotal += itsVal;
						if (thisCol.type == "items") fromItems += itsVal;
					}
				}
				var theOverride = Math.max.apply(Math, theOverrides);
				var toSet = 0;
				if (!fromItems) {
					// no magic items involved that both add stats and have an override
					toSet = theOverride >= theTotal ? theOverride : Math.min(theMax, theTotal);
				} else {
					// See what magic item bonuses we should stack with the overrides
					var itemRef = fromItems;
					var refObj = { lists : [] };
					var otherMaxes = [];
					var alsoAddTheMax = true;

					// Loop through all the maximums by name for this stat
					for (var aMax in CurrentStats.maximums[indx]) {
						var thisMax = CurrentStats.maximums[indx][aMax];
						// If this maximum is a modifier, just use the total maximum
						if (isNaN(thisMax.substring(0,1)) && !isNaN(thisMax.substring(1))) thisMax = theMax;
						if (!CurrentStats.txts.items[aMax]) {
							// Not a magic item, so add it to maximums from other sources
							otherMaxes.push(thisMax);
							continue;
						}
						// If the item added both a max and a bonus for this stat, remove its bonus from the itemRef and save a reference to it for later
						var thisMaxAddition = CurrentStats.maximumsLinked[aMax];
						if (!thisMaxAddition || !thisMaxAddition[indx]) continue;
						var thisMaxName = ("0" + thisMax).slice(-2) + aMax;
						refObj.lists.push(thisMaxName); // So we can sort it by size later
						refObj[thisMaxName] = [thisMaxAddition[indx], thisMax];
						itemRef -= thisMaxAddition[indx];
						if (alsoAddTheMax && thisMax === theMax) alsoAddTheMax = false;
					}
					// If there are maximums from other sources, recalculate the max we should use going forward
					if (alsoAddTheMax) otherMaxes.push(theMax);
					if (otherMaxes.length) theMax = Math.max.apply(Math, otherMaxes);

					// Now create the base as we removed all the magic item bonuses that bring it above 20
					// use the highest of the baseRef (no items) and the baseWithItems (items that didn't increase the max)
					var baseRef = Math.min(theTotal - fromItems, theMax); 
					var baseWithItems = Math.min(baseRef + itemRef, 20); // items that didn't set a max, can only increase up to 20
					if (baseWithItems > baseRef) baseRef = baseWithItems;
					// the 'override' value to start with, considering that magic item bonuses stack with magic item overrides
					var overRef = Math.min(theOverride + itemRef, Math.max(alsoAddTheMax ? theMax : 20, theOverride));

					// Next iterate through all the ones that increase the maximum, starting with the lowest maximum
					// Only adding the bonus for this magic item, if the other 
					refObj.lists.sort();
					var baseNew = baseRef;
					for (var s = 0; s < refObj.lists.length; s++) {
						var sAdd = refObj[refObj.lists[s]];
						// Increase the base with its own bonus up to its own maximum
						baseNew = Math.max(baseRef, Math.min(baseNew + sAdd[0], sAdd[1]));
						// Get the overRef by getting the lowest of the override + this magic item bonus compared with (its own maximum or the total override, whichever is higher)
						overRef = Math.min(overRef + sAdd[0], Math.max(sAdd[1], theOverride));
					}
					// The total to set is the highest of the base and the override
					toSet = Math.max(baseNew, overRef);
				}
				var totalLoad = {};
				totalLoad["to"+type] = Math.round(toSet).toString();
				dialog.load(totalLoad);
			},

			updatePB : function (dialog, fldNm) {
				var res = dialog.store();
				var type = fldNm.slice(-2);
				var PBset = {};
				PBset["pb"+type] = ASCalcPointBuy(res["00"+type]);
				dialog.load(PBset);
				this.updatePBtotal(dialog);
			},

			updatePBtotal : function (dialog) {
				var res = dialog.store();
				var PBset = { "toPB" : 0 };
				for (var s = 0; s < 7; s++) {
					var toAdd = res["pb" + asab2[s]];
					PBset.toPB += isNaN(toAdd) ? 0 : Number(toAdd);
				}
				PBset.toPB = PBset.toPB.toFixed(0);
				dialog.load(PBset);
			},

			cAdB : function (dialog) { // add a column
				this.setCurrentStats(dialog);
				dialog.end("cadd");
			},

			cReB : function (dialog) { // remove a column
				this.setCurrentStats(dialog);
				dialog.end("crem");
			},

			description : {
				name : "ABILITY SCORES DIALOG",
				elements : [{
					type : "view",
					elements : [{
						type : "view", // the top row
						align_children : "align_row",
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
							height : 23,
							width : 100,
							name : titleTxt
						}]
					}, {
						type : "view", // improvement texts
						align_children : "align_distribute",
						elements : [{
							type : "view", // left column of clusters
							align_children : "align_left",
							elements : leftTxts
						}, {
							type : "view", // right column of clusters
							align_children : "align_right",
							elements : rightTxts
						}]
					}, {
						type : "view", // the value columns
						alignment : "align_fill",
						align_children : "align_distribute",
						elements : ([{
							type : "view", // old scores
							elements : [{
								type : "static_text",
								item_id : "olNm",
								font : "dialog",
								bold : true,
								char_width : 5,
								height : 32,
								alignment : "align_center",
								wrap_name : true,
								name : "Current Score"
							}, {
								type : "static_text",
								item_id : "olSt",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "olDx",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "olCn",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "olIn",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "olWs",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "olCh",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "olHS",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}]
						}, {
							type : "view", // a combined view for two columns to have the point buy total text
							elements : [{
								type : "view",
								align_children : "align_distribute",
								elements : [{
									type : "view", // ability score names
									elements : [{
										type : "static_text",
										item_id : "nmNm",
										font : "dialog",
										bold : true,
										char_width : 4,
										height : 32,
										wrap_name : true,
										alignment : "align_left",
										name : "Ability Name"
									}, {
										type : "static_text",
										item_id : "nmSt",
										height : 25,
										name : "Strength"
									}, {
										type : "static_text",
										item_id : "nmDx",
										height : 25,
										name : "Dexterity"
									}, {
										type : "static_text",
										item_id : "nmCn",
										height : 25,
										name : "Constitution"
									}, {
										type : "static_text",
										item_id : "nmIn",
										height : 25,
										name : "Intelligence"
									}, {
										type : "static_text",
										item_id : "nmWs",
										height : 25,
										name : "Wisdom"
									}, {
										type : "static_text",
										item_id : "nmCh",
										height : 24,
										name : "Charisma"
									}, {
										type : "popup",
										item_id : "nmHS",
										height : 22,
										char_width : 6
									}]
								}, {
									type : "view", // base scores
									elements : [{
										type : "static_text",
										item_id : "00Nm",
										font : "dialog",
										bold : true,
										char_width : 4,
										height : 30,
										alignment : "align_left",
										wrap_name : true,
										name : "Base Score"
									}, {
										type : "edit_text",
										item_id : "00St",
										char_width : 3,
										height : 25,
										SpinEdit : true
									}, {
										type : "edit_text",
										item_id : "00Dx",
										char_width : 3,
										height : 25,
										SpinEdit : true
									}, {
										type : "edit_text",
										item_id : "00Cn",
										char_width : 3,
										height : 25,
										SpinEdit : true
									}, {
										type : "edit_text",
										item_id : "00In",
										char_width : 3,
										height : 25,
										SpinEdit : true
									}, {
										type : "edit_text",
										item_id : "00Ws",
										char_width : 3,
										height : 25,
										SpinEdit : true
									}, {
										type : "edit_text",
										item_id : "00Ch",
										char_width : 3,
										height : 25,
										SpinEdit : true
									}, {
										type : "edit_text",
										item_id : "00HS",
										char_width : 3,
										height : 25,
										SpinEdit : true
									}]
								}]
							}, {
								type : "static_text",
								item_id : "tPNm",
								font : "dialog",
								bold : true,
								height : 25,
								char_width : 8,
								alignment : "align_right",
								name : "Point Buy total:"
							}]
						}, {
							type : "view", // point buy values
							elements : [{
								type : "static_text",
								item_id : "pbNm",
								font : "dialog",
								bold : true,
								char_width : 4,
								height : 32,
								wrap_name : true,
								alignment : "align_center",
								name : "Point Buy"
							}, {
								type : "static_text",
								item_id : "pbSt",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "pbDx",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "pbCn",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "pbIn",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "pbWs",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "pbCh",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "pbHS",
								name : "0",
								char_width : 3,
								height : 22,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "toPB",
								name : "0",
								char_width : 3,
								height : 25,
								font : "dialog",
								bold : true,
								alignment : "align_center"
							}]
						}]).concat(
							theColumns // the columns created above
						).concat([{
							type : "view", // the totals
							elements : [{
								type : "static_text",
								item_id : "toNm",
								font : "dialog",
								bold : true,
								char_width : 4,
								height : 32,
								wrap_name : true,
								alignment : "align_center",
								name : "New Total"
							}, {
								type : "static_text",
								item_id : "toSt",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center",
								font : "dialog",
								bold : true
							}, {
								type : "static_text",
								item_id : "toDx",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center",
								font : "dialog",
								bold : true
							}, {
								type : "static_text",
								item_id : "toCn",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center",
								font : "dialog",
								bold : true
							}, {
								type : "static_text",
								item_id : "toIn",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center",
								font : "dialog",
								bold : true
							}, {
								type : "static_text",
								item_id : "toWs",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center",
								font : "dialog",
								bold : true
							}, {
								type : "static_text",
								item_id : "toCh",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center",
								font : "dialog",
								bold : true
							}, {
								type : "static_text",
								item_id : "toHS",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center",
								font : "dialog",
								bold : true
							}]
						}]).concat(
							theMaxCol // the maximum column created above
						).concat([{
							type : "view", // ability score names
							elements : [{
								type : "static_text",
								item_id : "abNm",
								font : "dialog",
								bold : true,
								char_width : 4,
								height : 32,
								wrap_name : true,
								aligabent : "align_left",
								name : "Ability Abbr."
							}, {
								type : "static_text",
								item_id : "abSt",
								height : 25,
								name : "Str"
							}, {
								type : "static_text",
								item_id : "abDx",
								height : 25,
								name : "Dex"
							}, {
								type : "static_text",
								item_id : "abCn",
								height : 25,
								name : "Con"
							}, {
								type : "static_text",
								item_id : "abIn",
								height : 25,
								name : "Int"
							}, {
								type : "static_text",
								item_id : "abWs",
								height : 25,
								name : "Wis"
							}, {
								type : "static_text",
								item_id : "abCh",
								height : 25,
								name : "Cha"
							}, {
								type : "static_text",
								item_id : "abHS",
								height : 25,
								name : "HoS"
							}]
						}])
					}, {
						type : "view",
						align_children : "align_distribute",
						alignment : "align_fill",
						elements : [{
							type : "cluster",
							name : "Remarks",
							item_id : "exCl",
							font : "dialog",
							bold : true,
							elements : [{
								type : "static_text",
								alignment : "align_left",
								item_id : "exTx",
								font : "dialog",
								wrap_name : true,
								width : 625,
								name : explanatoryTxt
							}]
						}, {
							type : "cluster",
							name : "Add or remove columns",
							align_children : "align_center",
							item_id : "coCl",
							font : "dialog",
							bold : true,
							elements : [{
								type : "button",
								item_id : "cAdB",
								name : "Add Column"
							}, {
								type : "button",
								item_id : "cReB",
								name : "Remove Column"
							}]
						}]
					}, {
						item_id : "appl",
						type : "ok_cancel",
						ok_name : "Apply"
					}]
				}]
			}
		}

		// Add the functions to the dialog variables
		var addFldFunction = function (i, fldID) {
			var a = fldID;
			AbilityScores_Dialog[a] = function(dialog) { this.updateVals(dialog, a, a.indexOf("00") === 0); };
		}
		for (var i = 0; i < CurrentStats.cols.length; i++) {
			var theStat = CurrentStats.cols[i];
			var aNo = ("0" + i).slice(-2);
			for (var s = 0; s < 7; s++) {
				addFldFunction(i, aNo + asab2[s]);
			}
		}

		return app.execDialog(AbilityScores_Dialog);
	};

	do {
		var theDia = openStatsDialog();
		var reopenDia = theDia !== "ok" && theDia !== "cancel";
		if (theDia == "cadd") ASaddColumn();
		if (theDia == "crem") ASremoveColumn();
	} while (reopenDia);

	if (theDia == "ok") {
		SetStringifieds("stats");
	} else {
		CurrentStats = eval(What("CurrentStats.Stringified"));
	}
}

// a function to ask the user for a new column caption and add that column
function ASaddColumn(inputName, isBackground) {
	var diaHead = "Give the new column an unique caption";
	var diaText = "The field is intentionally small so that you have an idea of how big the caption can be. If something doesn't fit nicely, it will definitely not display correctly in the ability score dialog.\n\nIf you include the word 'override' in the caption, the column will be treated as an overriding column instead of an adding column. This means that a value will be used if higher than the other values added together.";
	var diaText2 = "If you leave the above field blank, no column will be created.";
	var theDialog = {
		initialize : function (dialog) {
			dialog.load({
				"img1" : allIcons.scores
			});
		},
		commit : function (dialog) {
			var res = dialog.store();
			this.column = res["user"];
		},
		description : {
			name : "NEW COLUMN DIALOG",
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : [{
					type : "view", // the top row
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
						char_width : 25,
						name : diaHead
					}]
				}, {
					type : "static_text",
					alignment : "align_fill",
					item_id : "txt0",
					wrap_name : true,
					char_width : 30,
					name : diaText
				}, {
					type : "edit_text",
					alignment : "align_center",
					item_id : "user",
					char_width : 6,
					height : 35,
					multiline : true
				}, {
					type : "static_text",
					alignment : "align_fill",
					item_id : "txt1",
					wrap_name : true,
					char_width : 30,
					font : "dialog",
					bold : true,
					name : diaText2
				}, {
					type : "ok_cancel",
					ok_nam : "Add Column"
				}]
			}]
		}
	};
	var newColName = inputName ? inputName : app.execDialog(theDialog) === "ok" && theDialog.column ? theDialog.column : false;
	if (newColName) {
		CurrentStats.cols.push({
			type : isBackground ? 'background' : 'extra',
			name : newColName,
			scores : [0,0,0,0,0,0,0]
		});
	}
}

// a function to ask for the user which column to remove
function ASremoveColumn() {
	var diaHead = "Select the column to remove";
	var diaText = "Removing a column can't be undone once you press 'Apply' in the ability scores dialog! Any values in the column will then forever be lost.";
	var diaText2 = "If you leave the selection blank, nothing will be removed.";
	var diaPopup = { " " : 1 };
	for (var i = 6; i < CurrentStats.cols.length; i++) {
		var theCol = CurrentStats.cols[i];
		if (theCol.type == 'extra') diaPopup[theCol.name] = -1;
	}
	var theDialog = {
		popupObj : diaPopup,
		initialize : function (dialog) {
			dialog.load({
				"img1" : allIcons.scores,
				"popu" : this.popupObj
			});
		},
		commit : function (dialog) {
			var res = dialog.store()["popu"];
			this.column = GetPositiveElement(res);
		},
		description : {
			name : "REMOVE COLUMN DIALOG",
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : [{
					type : "view", // the top row
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
						char_width : 25,
						name : diaHead
					}]
				}, {
					type : "static_text",
					alignment : "align_fill",
					item_id : "txt1",
					wrap_name : true,
					char_width : 30,
					name : diaText
				}, {
					type : "popup",
					alignment : "align_center",
					item_id : "popu",
					char_width : 12,
					height : 25
				}, {
					type : "static_text",
					alignment : "align_fill",
					item_id : "txt1",
					wrap_name : true,
					char_width : 30,
					font : "dialog",
					bold : true,
					name : diaText2
				}, {
					type : "ok_cancel",
					ok_nam : "Add Column"
				}]
			}]
		}
	};
	if (app.execDialog(theDialog) != "ok" || !theDialog.column || theDialog.column == " ") return;
	for (var i = 6; i < CurrentStats.cols.length; i++) {
		var theCol = CurrentStats.cols[i];
		if (theCol.type == 'extra' && theCol.name == theDialog.column) {
			CurrentStats.cols.splice(i, 1);
			break;
		}
	}
}
