/** Processes the `scores(txt|Maximum|MaxLimited|Override)` attributes.
 * See test_AbilityScores.js for an explanation of the different types.
 * @param {boolean} AddRemove `true` to add, `false` to remove
 * @param {string} sType types allowed by `GetFeatureType()`
 * @param {string} featureName name of the feature, has to be unique
 * @param {number[]} aScoresIn array with 6 or 7 numbers, `scores(Override|Maximum|MaxLimited)` attribute
 * @param {string} [dialogTxt] string to use instead of generating it from `inScoresA`,  `scorestxt` attribute
 * @param {string} [isSpecial] "limited", "maximums", "overrides"
 * @param {number[]|string[]} [aHasMaxIn] array with 6 or 7 numbers, `scores(Maximum|MaxLimited)` attribute
 * @param {boolean} [isStackable] adds to instead of overrides the same featureName. Only applicable if isSpecial == "limited"
 * @param {boolean} [noUserDialog] prevents the dialog to show asking user to proceed or not
**/
function processStats(AddRemove, sType, featureName, aScoresIn, dialogTxt, isSpecial, aHasMaxIn, isStackable, noUserDialog) {
	initiateCurrentStats(); // Initialize some variables if they don't yet exist
	// Redo the arrays, so that they are no longer references
	var aScores = aScoresIn && isArray(aScoresIn) ? [].concat(aScoresIn) : [];
	var aHasMax = aHasMaxIn && isArray(aHasMaxIn) ? [].concat(aHasMaxIn) : null;

	// Fix old style of writing `scorestxt`
	if (dialogTxt) dialogTxt = dialogTxt.replace(/^\s*|^.{1,20}: |;$/g, '');

	var firstLevelStatFrom = tDoc.use2024Rules ? "background" : "race";

	var isSpecialIdx = ["limited", "maximums", "overrides"].indexOf(isSpecial);
	if (isSpecialIdx === -1) isSpecial = null; // Special type not recognized

	sType = GetFeatureType(sType);
	var type = isSpecial && isSpecialIdx > 0 ? isSpecial.replace(/s$/, '') : sType;

	// Special actions depending on type
	if (type === "items" && !isSpecial && aScores) {
		// Magic Item that increase, but is not a one-time addition
		type = "ongoing";
		isSpecial = "ongoing";
	} else if (type === "items" && isSpecial === "limited" && IsNotReset && IsNotImport && !noUserDialog) {
		// Prompt the user for if an item should apply/remove its one-time (stackable) bonuses or not
		var askUserToContinue = scoresMaxLimitedItemAskUser(AddRemove, featureName, aScores, aHasMax, isStackable);
		if (!askUserToContinue) return;
	} else if (isSpecial === "maximums" && aScores) {
		// The first input array is the maximums and there are no scores to adjust
		aHasMax = aScores;
		aScores = null;
	}

	// Find the column to use
	var iColIdx = CurrentStats.cols.findIndex(function (obj) { return obj.type === type; });
	// Create specific columns if they don't exist
	if (iColIdx === -1 && type === "background") { // 5e doesn't have default background column
		iColIdx = ASaddColumn("Backgr-\nound", type, 2);
	} else if (iColIdx === -1 && type === "race") { // 5.5e doesn't have default race column
		iColIdx = ASaddColumn("Species Bonus", type, 2);
	} else if (iColIdx === -1 && type === "classes") {
		var levelsColIndex = CurrentStats.cols.findIndex(function (obj) { return obj.type === "levels"; });
		iColIdx = ASaddColumn("Class Bonus", type, levelsColIndex);
	} else if (iColIdx === -1) {
		return;
	}
	var oCol = CurrentStats.cols[iColIdx];

	var aDescriptions = []; // Gather descriptions for all the ability scores to create one string for the feature at the end

	var applyBonusToColumn = function(objCol, idxScore, iBonus) {
		// Make sure iBonus is a round number
		if (isNaN(iBonus)) {
			if (!/\d/.test(iBonus)) return;
			iBonus = iBonus.replace(/.*(\d+).*/, "$1");
		}
		iBonus = Math.round(Number(iBonus));
		// Apply it, but don't remove the value if this is the firstLevelStatFrom column, because that is always reset to 0
		if (AddRemove) {
			objCol.scores[idxScore] += iBonus;
		} else if (objCol.type !== firstLevelStatFrom) {
			objCol.scores[idxScore] -= iBonus;
		}
	}

	// Types that have their value 
	var registerSpecial = function(sRef, idxScore, sName, iValue) {
		var oRef = CurrentStats[sRef + "s"][idxScore];
		// Save this for safekeeping
		if (AddRemove) {
			oRef[sName] = iValue;
		} else {
			delete oRef[sName];
		}
		// Distill the new value from the resulting reference object and set that as the column value
		var iObjColIdx = CurrentStats.cols.findIndex(function (obj) { return obj.type === sRef; });
		if (iObjColIdx === -1) return;
		var oColScores = CurrentStats.cols[iObjColIdx].scores;
		var iCurrent = oColScores[idxScore];
		oColScores[idxScore] = Object.keys(oRef).reduce(function(iTotal, key) {
			return Math.max(iTotal, oRef[key]);
		}, 0);
		if (sRef === "maximum" && oColScores[idxScore] === 0) oColScores[idxScore] = 20;
		if (iCurrent !== oColScores[idxScore]) CurrentUpdates.types.push("stats" + sRef);
	}

	// Loop through the ability scores
	for (var i = 0; i < 7; i++) {
		var iScore = !aScores ? null : aScores[i];
		var iMax = !aHasMax ? null : aHasMax[i];

		if (oCol.type === firstLevelStatFrom) {
			// Just reset to zero before doing anything, as there can be only one race/background
			oCol.scores[i] = 0;
		}

		var iScoreStillDo = {
			apply: !!iScore && !isSpecial,
			description: !!iScore && !isSpecial && AddRemove,
		};
		var iMaxStillDo = {
			apply: !!iMax && !isSpecial,
			description: !!iMax && !isSpecial && AddRemove,
			isMod: false,
		};

		if (!iScore && !iMax) continue; // nothing to do for this ability

		// Get the current score and its total without ongoing magic items
		var oScoreNow = getAbilityScoreTotals(i);
		var iScoreNow = CurrentStats.applied ? oScoreNow.calculatedBase : oScoreNow.value;

		// If maximum is a modifier, store that info for later
		var isModMax = AddRemove && iMax && isNaN(iMax.substring(0,1)) && !isNaN(iMax.substring(1)) ? iMax : null;
		if (isModMax && isSpecial !== "ongoing") {
			// And if so and not ongoing, apply that modifier to the current maximum to get a total value
			iMax = processModifiers(oScoreNow.maximum, [iMax]);
		}

		switch (isSpecial) {
		  case "limited": // type 3 & 6, score and max to apply depend on current state
			if (!iScore) continue;
			if (!iMax) iMax = 20; // Set to 20 if no maximum is provided
			// Gather the previous entries and the next key
			var oKeys = getFeatureNameIterations(featureName, CurrentStats.refMaxLimited[i], isStackable);
			if (AddRemove) {
				var description = type === "items" ? "one-time " : "";
				description += (iScore >= 0 ? "+" : "") + iScore + " " + oScoreNow.name;
				var displayMax = iMax;
				if (iScoreNow + iScore > iMax) {
					// The score would increase the total beyond its max, so reduce the addition
					iScore = Math.max(0, iMax - iScoreNow);
				} else if (iScoreNow + iScore < iMax) {
					// The total is less than the max, so set the max to the new total
					iMax = Math.max(20, iScoreNow + iScore);
				}
				// Maximum and changes to the description
				var sScoreChange = iScoreNow + (iScore >= 0 ? "+" : "") + iScore + "=" + (iScoreNow + iScore);
				if (isModMax) {
					description += " to its maximum " + isModMax + " (" + sScoreChange + ")";
				} else {
					description += " to a maximum of " + displayMax + " (" + sScoreChange + ")";
				}
				aDescriptions.push(description); // Add description for the tooltip and dialog

				// Store for safekeeping so we know what values to remove when the time comes
				CurrentStats.refMaxLimited[i][oKeys.next] = {
					key: oKeys.next,
					name: featureName,
					iteration: oKeys.iteration,
					type: sType,
					bonusOriginal: aScores[i],
					bonus: iScore,
					maximumOriginal: aHasMax ? aHasMax[i] : null,
					maximum: iMax,
					description: description,
				}
				// Apply the values
				applyBonusToColumn(oCol, i, iScore);
				registerSpecial("maximum", i, oKeys.next, iMax);
			} else {
				oKeys.has.forEach(function (obj) {
					var sKey = obj.key;
					var refObj = CurrentStats.refMaxLimited[i][sKey];
					applyBonusToColumn(oCol, i, refObj.bonus);
					registerSpecial("maximum", i, sKey, refObj.maximum);
					delete CurrentStats.refMaxLimited[i][sKey];
				});
			}
			break;

		  case "ongoing": // type 4 & 5: magic items without `scoresMaxLimited`
			// Magic items are special cases, as their bonus is not tied to a single moment

			if (!iMax) iMax = 20; // Set to 20 if no maximum is provided

			if (AddRemove) {
				CurrentStats.ongoingItems[i][featureName] = {
					name: featureName,
					type: sType,
					bonus: iScore,
					maximum: iMax,
					maximumIsMod: isModMax,
				}
				// Create and add description for the tooltip and dialog
				var description = "ongoing " + (iScore >= 0 ? "+" : "") + iScore + " " + oScoreNow.name;
				if (isModMax) {
					description += " to its maximum " + isModMax;
				} else {
					description += " to a maximum of " + iMax;
				}
				aDescriptions.push(description);
			} else {
				delete CurrentStats.ongoingItems[i][featureName];
			}
			break;

		  case "overrides": // type 8: only sets override
			registerSpecial("override", i, featureName, iScore);
			if (AddRemove) {
				aDescriptions.push(oScoreNow.name + " is " + iScore);
			}
			break;

		  default: // type 1, 2, and 7. type 1: score and no maximum (not magic item).
		  // type 2: maximum applicable separately (legacy, not magic item).
		  // type 7: set only maximum.

			// iScores apply to column
			if (iScore) {
				applyBonusToColumn(oCol, i, iScore);
				// Create iScores description for the tooltip and dialog if adding
				if (AddRemove) {
					aDescriptions.push((iScore >= 0 ? "+" : "") + iScore + " " + oScoreNow.name);
				}
			}

			// iMax apply to column
			if (iMax) {
				registerSpecial("maximum", i, featureName, iMax);
				if (AddRemove) {
					if (isModMax) {
						aDescriptions.push(oScoreNow.name + " maximum adds " + isModMax +
							" (" + oScoreNow.maximum + isModMax + "=" + iMax + ")");
					} else {
						aDescriptions.push(oScoreNow.name + " maximum is " + iMax);
					}
				}
			}
		} // end of switch
	} // end of loop

	// Description to global variable
	if (CurrentStats.txts[sType]) {
		if (AddRemove) {
			var useDialogTxt = dialogTxt ? dialogTxt : formatLineList("", aDescriptions);
			var existingTxt = CurrentStats.txts[sType][featureName];
			if (!dialogTxt && isStackable && existingTxt) {
				// Append to current text
				useDialogTxt = existingTxt + "; " + useDialogTxt;
			} else if (!dialogTxt && existingTxt && existingTxt.indexOf(useDialogTxt) !== -1) {
				/* APPLYING ALREADY IMPORTED FEATURE
					The feature has already been added. The entry already exists and contains the exact text that we are about to add, which isn't predetermined. Go back to previous CurrentStats value and exit this function.
				*/
				CurrentStats = eval(What("CurrentStats.Stringified"));
				return;
			}
			CurrentStats.txts[sType][featureName] = useDialogTxt;
		} else {
			delete CurrentStats.txts[sType][featureName];
			// Remove some columns when empty
			var obsoleteColumns = [
				tDoc.use2024Rules ? "race" : "background",
				"classes",
			];
			if (obsoleteColumns.indexOf(oCol.type) !== -1 && !ObjLength(CurrentStats.txts[oCol.type]) && Number(oCol.scores.join("")) === 0) {
				CurrentStats.cols.splice(iColIdx, 1);
			}
		}
	}

	// Set global variable to the sheet and add to changes dialog
	SetStringifieds("stats");
	CurrentUpdates.types.push("stats" + sType);
}

/** For `isStackable`, a way to get all featureName-iterations, including the next
 * Get the iterations of a key inside an object and what the next iteration should be
 * @param {string} baseName name of the item, the key
 * @param {object} inObj the object to search in if the baseName exists as a key
 * @param {boolean} isStackable if there can be multiple of this or not
 * @returns {object}
 */
function getFeatureNameIterations(baseName, inObj, isStackable) {
	var reObj = {
		has: [],
		next: baseName,
		iteration: 1,
	}
	while (inObj[reObj.next]) {
		reObj.has.push(inObj[reObj.next]);
		if (!isStackable) break;
		reObj.iteration++;
		reObj.next = baseName + " [" + reObj.iteration + "]";
	}
	return reObj;
}

/** Pop-up to ask the user whether these one-time item increases should be applied now/again or be removed
 * @param {boolean} AddRemove `true` to add, `false` to remove
 * @param {string} sItemName name of the item, has to be unique
 * @param {number[]} aScores array with 6 or 7 numbers: amount to add/subtract from each ability
 * @param {number[]|string[]} aMaximums array with 6 or 7 numbers or modifier strings: maximum that the corresponding aScores is limited to
 * @param {boolean} isStackable if the item can be applied multiple times on top of itself
 * @param {boolean} bCancelToRemove for the function `recurringItemApplyLegacy`
 * @returns 
 */
function scoresMaxLimitedItemAskUser(AddRemove, sItemName, aScores, aMaximums, isStackable, bCancelToRemove) {
	var oCompiled = {
		hasAmount: 0,
		get thisIteration() { return this.hasAmount + 1; },
		benefitsNew: [],
		benefitsOld: [],
	}
	// Loop over the scores
	for (var i = 0; i < 7; i++) {
		var scoreName = i < 6 ? AbilityScores.names[i] : What("HoSRememberState");
		// Add the benefits for this ability score, if any
		var benefit = "";
		var iScore = aScores ? aScores[i] : null;
		var iMax = aMaximums ? aMaximums[i] : null;
		var isModMax = iMax && isNaN(iMax.substring(0,1)) && !isNaN(iMax.substring(1));
		if (iScore) {
			benefit = (iScore >= 0 ? "+" : "") + iScore + " " + scoreName;
			if (isModMax) {
				// iMax is a modifier
				benefit += " to its maximum " + iMax;
			} else if (iMax && iMax !== 20) {
				benefit += " to a maximum of " + iMax;
			}
		} else if (iMax) {
			benefit = scoreName + " maximum " + (isModMax ? "adds " : "is ") + iMax;
		}
		if (benefit) oCompiled.benefitsNew.push(benefit)
		// Get previous additions of this
		var oKeys = getFeatureNameIterations(sItemName, CurrentStats.refMaxLimited[i], isStackable);
		if (oKeys.has.length === 0) continue; // No previous editions, so nothing to do 
		// Update the number of iterations that have already gone before
		if (oKeys.has.length >= oCompiled.hasAmount) oCompiled.hasAmount = oKeys.has.length;
		// If there can't be multiple of this and we are adding a second one, stop this function
		if (AddRemove && !isStackable && oCompiled.hasAmount > 0) return false;
		// Total the bonus to this stat
		var oTotals = oKeys.has.reduce(function(total, obj) {
			return {
				bonus: total.bonus + obj.bonus,
				maximum: Math.max(total.maximum, obj.maximum),
			};
		}, {bonus: 0, maximum: 0 })
		// Create its string and add that to benefitsOld
		if (oTotals.bonus) {
			oCompiled.benefitsOld.push((oTotals.bonus > 0 ? "+" : "") + oTotals.bonus + " " + scoreName);
		} else if (oTotals.maximum && oTotals.maximum !== 20) {
			oCompiled.benefitsOld.push(scoreName + " maximum is " + oTotals.maximum);
		}
	}
	// Get the message
	if (AddRemove) {
		// Compile the message when adding
		var aMessage = [
			"Do you want to apply the one-time ability score bonus from the " + sItemName + (oCompiled.thisIteration > 1 ? "for a " + toOrdinal(oCompiled.thisIteration) + "time" : "") + "?",
			formatLineList('Click "Yes" to add', oCompiled.benefitsNew) + ".",
		];
		if (oCompiled.benefitsOld.length) {
			aMessage.push(formatLineList("This is in addition to the", oCompiled.benefitsOld) + " that it already provided.");
		}
		if (!bCancelToRemove) {
			aMessage.push("You can have this change remain even when you remove the " + sItemName + " from the sheet. When you remove it, you will be prompted whether you want to remove or keep its ability score bonuses.");
		}
		if (isStackable) {
			aMessage.push("You can benefit from the " + sItemName + " multiple times. The next time you select it after choosing to having its benefits remain, you will be asked to apply its ability score increase on top of its previous increases.");
		}
		if (bCancelToRemove && oCompiled.thisIteration > 1) { // legacy
			aMessage.push('Click "Cancel" to remove all its previously added benefits. If you want to remove these benefits at a later time, add the ' +  sItemName + " again to get this prompt again.");
		}
		aMessage.push('Click "No" for no ability score increases to be added or removed.');
	} else {
		if (!oCompiled.hasAmount) {
			// Nothing to remove, so no reason to prompt
			return true;
		}
		// Compile the message when removing
		var listCaption = isStackable && oCompiled.hasAmount > 1 ? "The total from its " + oCompiled.hasAmount + " additions is:" : "Its addition is:";
		var aMessage = [
			"Do you want the ability score increases from the " + sItemName + " to remain after the " + sItemName + " is removed from the sheet?\n"+
			formatLineList(listCaption, oCompiled.benefitsOld) + ".",
		];
		if (isStackable) {
			aMessage.push("You can benefit from the " + sItemName + " multiple times. If you have its benefits remain now, the next time you select it you will be asked to apply its benefits on top of its current benefits.");
		}
		aMessage.push('Click "Yes" to keep the above ability score increases.\n'+
			'Click "No" to remove all the above ability score increases.');
	}
	// Upon applying the item with `scoresMaxLimited`, ask user if they want to add its score bonus (a extra time if `scoresStackable = true`)
	// Upon removing the item with `scoresMaxLimited`, ask user if they want to remove its score bonuses
	var iResponse = app.alert({
		nIcon: 2, // Question
		nType: AddRemove && bCancelToRemove && oCompiled.thisIteration > 1 ? 3 : 2, // 2 = Yes/No, 3 = Yes/No/Cancel
		nTitle: sItemName + " Ability Score Changes",
		cMsg: aMessage.join("\n\n"),
	});
	if (iResponse == 4) { // Yes
		return AddRemove; 
	} else if (iResponse == 3) { // No
		return !AddRemove;
	} else if (iResponse == 2) { // Cancel (legacy option)
		return "delete";
	}
}

/** Backwards compatibility of `MagicItemsList["manual of bodily health"].applyStatBonus`
 * Add one-time stat bonus and maximum increase like the 5e Manual/Tome magic items
 * @param {string} sItemName name of the magic item
 * @param {number|string} ability name, index number, or abbreviation of the ability to affect
 * @param {number} iBonus bonus to both the ability and its static maximum
**/
function recurringItemApplyLegacy(sItemName, ability, iBonus) {
	if (!IsNotReset || !IsNotImport) return;
	initiateCurrentStats();

	var stat = getAbilityScore(ability);
	var aScores = [0,0,0,0,0,0,0];
	aScores[stat.index] = iBonus;
	var aMaximums = [0,0,0,0,0,0,0];
	aMaximums[stat.index] = "+" + iBonus;

	var askUserToContinue = scoresMaxLimitedItemAskUser(true, sItemName, aScores, aMaximums, true, true);

	if (askUserToContinue === true) { // Add the bonus (again)
		var AddRemove = true;
	} else if (askUserToContinue === "delete") { // Remove all of it
		var AddRemove = false;
	} else { // User clicked "No", so do nothing
		return;
	}
	// Call the main function
	processStats(AddRemove, "items", sItemName, aScores, false, "limited", aMaximums, true, true);
}

// a function to initiate the global variable if it doesn't yet exist
function initiateCurrentStats(forceIt) {
	if (!forceIt) for (var entry in CurrentStats) return; // do nothing if the variable already exists
	CurrentStats = {
		cols: [{
			type: "base",
			name: "Score Base",
			scores: [8,8,8,8,8,8,8],
		}, {
			type: tDoc.use2024Rules ? "background" : "race",
			name: tDoc.use2024Rules ? "Backgr-\nound" : "Racial Bonus",
			scores: [0,0,0,0,0,0,0],
		}, {
			type: "feats",
			name: "Feat Bonus",
			scores: [0,0,0,0,0,0,0],
		}, {
			type: "levels",
			name: "ASIs from Class",
			scores: [0,0,0,0,0,0,0],
		}, {
			type: "items", 
			name: "Magic Items",
			scores: [0,0,0,0,0,0,0],
		}, {
			type: "ongoing", // passive item effects that have another limit than 20 (i.e. with `scoresMaximum` and no `scoresMaxLimited`)
			name: "Items up to Max X\xB9",
			scores: [0,0,0,0,0,0,0],
			notUserEditable: true,
		}, {
			type: "override",
			name: "Magical Override\xB2",
			scores: [0,0,0,0,0,0,0],
		}, {
			type: "maximum",
			name: "Max Total\xB2",
			scores: [20,20,20,20,20,20,20],
		}],
		txts: {
			"classes": {},
			"background": {},
			"race": {},
			"feats": {},
			"items": {},
			"magic": {},
		},
		overrides:       [{}, {}, {}, {}, {}, {}, {}], // `scoresOverride`
		maximums:        [{}, {}, {}, {}, {}, {}, {}], // maximums to display (all except those in `this.ongoingItems`)
		ongoingItems:    [{}, {}, {}, {}, {}, {}, {}], // items with `scoresMaximum`
		refMaxLimited:   [{}, {}, {}, {}, {}, {}, {}], // store applied `scores` &&`scoresMaxLimited` so we know what to remove
		applied: false, // if the score dialog has been used and should be leading or not
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
	if (!CurrentStats.applied) {
		// Never before applied to the sheet, so we should calculate the base if possible
		var oBaseColIdx = CurrentStats.cols.findIndex(function (obj) { return obj.type === "base"; });
		var oBaseCol = CurrentStats.cols[oBaseColIdx];
		for (var i = 0; i < oBaseCol.scores.length; i++) {
			var oStat = getAbilityScoreTotals(i);
			// No need to calculate the base if there is nothing in the field or the calculated version is the same as the field value
			if (oStat.value && oBaseCol.scores[i] === 8 && oStat.value !== oStat.calculatedTotal) {
				oBaseCol.scores[i] = oStat.value - oStat.bonus - oStat.ongoingBonus;
			}
		}
	}
	var titleTxt = "Ability Scores";
	var explanatoryTxt = [
		[
			"The standard array is 15, 14, 13, 12, 10, and 8.",
			"Normal Point Buy is 27 points and you can't have a Score Base over 15.",
			"Unless otherwise noted, ability score improvements can't take the total over 20, see the \"Max Total\" column.",
		].join("\n"),
		[
			'\xB9 The "Items up to Max X" column is set by automated magic items that apply a ongoing bonus (i.e. not one-time). These adhere to their own maximums, which are not displayed in the row. The value in this column can change depending on other column values.',
			'\xB2 "Override" and "Items up to Max X" columns ignore the maximum. Manual changes to the "Magical Override" and "Max Total" column will be overwritten by automation if you (de)select something that affects their value.',
		].join("\n"),
	];
	var curHoS = What("HoSRememberState");
	var asab2 = ["St", "Dx", "Cn", "In", "Ws", "Ch", "HS"];
	var asab3 = ["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"];

	// set the descriptive text for the dialog
	var sections = {
		ref : {
			title : "Primary class abilities \x26 Multiclassing prerequisites",
			loc : "left",
			txt : ""
		},
		background : {
			title : "Background ability score improvements",
			loc : "right",
			txt : ""
		},
		race : {
			title : (tDoc.use2024Rules ? "Species" : "Racial") + " ability score improvements",
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
			tArr.push("\u2022 " + toUni(sName, "bold") + ": " + CurrentStats.txts[sType][sName]);
		}
		if (tArr.length) {
			tArr.sort();
			sections[sType].txt = tArr.join(".\n") + ".";
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
			name : sect.title.replace("\x26", "\x26\x26"),
			type : "cluster",
			alignment : "align_" + sect.loc,
			item_id : "cl" + section.substr(0,2),
			font : "dialog",
			bold : true,
			elements : [{
				name : sect.txt.replace("\x26", "\x26\x26"),
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
			var uneditable = theStat.notUserEditable
			var aNo = ("0" + i).slice(-2);
			var theCol = {
				type: "view",
				elements: [{
					type: "static_text",
					item_id: aNo + "Nm",
					font: "dialog",
					bold: true,
					char_width: /override/i.test(theStat.name) ? 6 : 5,
					height: 30,
					alignment: "align_left",
					wrap_name: true,
					name: theStat.name,
				}],
			};
			for (var s = 0; s < 7; s++) {
				theCol.elements.push({
					type: "edit_text",
					item_id: aNo + asab2[s],
					char_width: 3,
					height: 25,
					SpinEdit: !uneditable,
					name: "0",
					readonly: uneditable,
				});
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
				var popupHoS = {
					"*7th ability*" : !curHoS,
					"Honor" : curHoS == "Honor",
					"Sanity" : curHoS == "Sanity"
				};
				// set the current scores, stat names, and dialog icon
				var toSet = {
					"exT0" : explanatoryTxt[0],
					"exT1" : explanatoryTxt[1],
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
				CurrentStats.applied = true;
				// Update the Honor/Sanity
				if (this.fieldHoS !== curHoS) ShowHonorSanity(this.fieldHoS);
				// See if any stats changed
				var statChange = { any : false, con : false, mental : false };
				for (var s = 0; s < 7; s++) {
					var abbr2 = asab2[s];
					if (res["ol"+abbr2] != res["to"+abbr2]) {
						statChange.any = true;
						if (abbr2 == "Cn") {
							statChange.con = true;
						} else if (!statChange.mental && /In|Ws|Ch/.test(abbr2)) {
							statChange.mental = true;
						}
					}
				}
				// Stop now if no totals changed
				if (!statChange.any) return;
				// Start progress bar and stop calculations
				var thermoTxt = thermoM("Applying stats...");
				calcStop();
				// Set the new ability scores to the fields (and their mods, so functions use the new one)
				for (var s = 0; s < 7; s++) {
					var theAbi = Number(res["to"+asab2[s]]);
					Value(asab3[s], theAbi);
					Value(asab3[s] + " Mod", Math.round((theAbi - 10.5) * 0.5));
				}
				// Apply HP tooltips if Con changed
				if (statChange.con) CurrentUpdates.types.push("hp");
				// Recalculate attack entries, as they might have changed (Finesse)
				CurrentUpdates.types.push("attacks");
				// Recalculate wild shapes, if the mental stats changed
				if (statChange.mental) WildshapeRecalc();
				// Redo which Ability Save DCs are visible, if any class has an alt
				for (var sClass in CurrentClasses) {
					if (CurrentClasses[sClass].abilitySaveAlt) {
						SetTheAbilitySaveDCs();
						break;
					}
				}
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

			updateTotal : function (dialog, fldNm) {
				var res = dialog.store();
				var type = fldNm.slice(-2);
				var stat = getAbilityScoreTotals(type, res);
				var totalLoad = {};
				totalLoad["to" + type] = ASround(stat.calculatedTotal);
				totalLoad[stat.ongoingColIdx + type] = ASround(stat.ongoingBonus);
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
						type: "view",
						align_children: "align_distribute",
						alignment: "align_fill",
						elements: [{
							type: "cluster",
							name: "Remarks",
							item_id: "exCl",
							font: "dialog",
							bold: true,
							elements: [{
								type: "static_text",
								alignment: "align_left",
								item_id: "exT0",
								font: "palette",
								wrap_name: true,
								width: 600,
								name: explanatoryTxt[0],
							}, {
								type: "static_text",
								alignment: "align_left",
								item_id: "exT1",
								font: "palette",
								wrap_name: true,
								width: 600,
								name: explanatoryTxt[1],
							}],
						}, {
							type : "cluster",
							name : "Add or Remove Columns",
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

/** Get the name, index, abbreviations, value and modifier for an ability
 * @param {number|string} ability the index, name, or abbreviation of an ability
 * @returns 
 */
function getAbilityScore(ability) {
	var asab2 = ["St", "Dx", "Cn", "In", "Ws", "Ch", "HS"];
	var asab3 = ["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"];
	var idx = !isNaN(ability) && asab2[ability] ? ability :
			ability.length === 2 && asab2.indexOf(ability) !== -1 ? asab2.indexOf(ability) :
			asab3.indexOf(ability.substring(0, 3)) !== -1 ? asab3.indexOf(ability.substring(0, 3)) : false;
	if (idx === false) return false;

	var stat = {
		name: idx < 6 ? AbilityScores.names[idx] : What("HoSRememberState"),
		index: idx,
		abbr2: asab2[idx],
		abbr3: asab3[idx],
		value: Number(What(AbilityScores.abbreviations[idx])),
	};
	stat.mod = Math.round((stat.value - 10.5) * 0.5);
	return stat;
}

/**
 * Returns the current values of an ability score
 * @param {number|string} ability the index, name, or abbreviation of an ability
 * @param {object} [dialogStore] the return from `dialog.store()`
 * @returns {object}
 */
function getAbilityScoreTotals(ability, dialogStore) {
	var stat = getAbilityScore(ability);
	if (!stat) return;
	var idx = stat.index;

	stat = Object.assign({
		base: 8, // value from the base column
		bonuses: [], // value from each column that modifies the base (not ongoing, maximum or override)
		bonus: 0, // sum of bonuses
		maximums: Object.keys(CurrentStats.maximums[idx]).map(function (key) {
			return { name: key, value: CurrentStats.maximums[idx][key] };
		}), // all registered maximums
		maximum: 20, // maximum used (can be something manually set)
		ongoingBonuses: [], // effective bonuses from ongoingItems
		ongoingBonus: 0, // sum of ongoingBonuses
		overrides: Object.keys(CurrentStats.overrides[idx]).map(function (key) {
			return { name: key, value: CurrentStats.overrides[idx][key] };
		}), // all registered overrides
		override: 0, // override used (can be something manually set)
		get calculatedBase() { return Math.min(this.base + this.bonus, this.maximum); },
		get calculatedAll() { return this.calculatedBase + this.ongoingBonus; },
		get calculatedTotal() { return Math.max(this.calculatedAll, this.override); },
		ongoingColIdx: false, // Needed for the updateTotal function in the dialog
	}, stat);

	// Add the values from the columns (so we also include manual changes)
	for (var i = 0; i < CurrentStats.cols.length; i++) {
		var oCol = CurrentStats.cols[i];
		var iColScore = oCol.scores[idx];
		if (dialogStore) {
			var aNo = ("0" + i).slice(-2);
			iColScore = Number(dialogStore[aNo + stat.abbr2]);
		}
		if (oCol.type === "base") {
			stat.base = iColScore;
		} else if (oCol.type === "maximum") {
			stat.maximum = iColScore;
		} else if (oCol.type === "override" || /override/i.test(oCol.name)) {
			stat.override = Math.max(stat.override, iColScore);
		} else if (oCol.type === "ongoing") {
			// We are going to set this column's value from the reference object later
			stat.ongoingColIdx = ("0" + i).slice(-2);
		} else {
			stat.bonuses.push({ name: oCol.type, value: iColScore });
			stat.bonus += iColScore;
		}
	}

	// Add the values from the ongoing items
	// To do this, first get an array and sort it by maximum, so we can apply from the lowest
	var aOngoingItems = Object.values(CurrentStats.ongoingItems[idx]).sort(function (a, b) {
		return a.maximum - b.maximum;
	});
	var iOngoingTotal = stat.calculatedBase;
	var iOngoingMax = stat.maximum;
	for (var i = 0; i < aOngoingItems.length; i++) {
		var oItem = aOngoingItems[i];
		var iItemMax = oItem.maximum;
		if (oItem.maximumIsMod) {
			iItemMax = processModifiers(iOngoingMax, [oItem.maximum]);
			iOngoingMax = iItemMax;
		}
		var iItemBonus = Math.min(iOngoingTotal + oItem.bonus, iItemMax) - iOngoingTotal;
		// Unless the item has a negative bonus, do not let the effective bonus go negative
		if (oItem.bonus > 0 && iItemBonus < 0) iItemBonus = 0;
		stat.ongoingBonuses.push({ name: oItem.name, value: iItemBonus });
		stat.ongoingBonus += iItemBonus;
		iOngoingTotal += iItemBonus;
	}

	return stat;
}

// a function to ask the user for a new column caption and add that column
function ASaddColumn(inputName, typeName, index) {
	var diaHead = "Give the new column an unique caption";
	var diaText = "The field is intentionally small so that you have an idea of how big the caption can be. If something doesn't fit nicely, it will definitely not display correctly in the ability score dialog.\n\nIf you include the word 'override' in the caption, the column will be treated as an overriding column instead of an adding column. This means that a value will be used if higher than the other values added together.";
	var diaText2 = "If you leave the above field blank, no column will be created.";
	var theDialog = {
		initialize: function (dialog) {
			dialog.load({
				"img1" : allIcons.scores
			});
		},
		commit: function (dialog) {
			var res = dialog.store();
			this.column = res["user"];
		},
		description: {
			name: "NEW COLUMN DIALOG",
			elements: [{
				type: "view",
				align_children: "align_left",
				elements: [{
					type: "view", // the top row
					align_children: "align_row",
					elements: [{
						type: "image",
						item_id: "img1",
						width: 20,
						height: 20,
					}, {
						type: "static_text",
						item_id: "head",
						alignment: "align_fill",
						font: "heading",
						bold: true,
						height: 21,
						char_width: 25,
						name: diaHead,
					}],
				}, {
					type: "static_text",
					alignment: "align_fill",
					item_id: "txt0",
					wrap_name: true,
					char_width: 30,
					name: diaText
				}, {
					type: "edit_text",
					alignment: "align_center",
					item_id: "user",
					char_width: 6,
					height: 35,
					multiline: true,
				}, {
					type: "static_text",
					alignment: "align_fill",
					item_id: "txt1",
					wrap_name: true,
					char_width: 30,
					font: "dialog",
					bold: true,
					name: diaText2,
				}, {
					type: "ok_cancel",
					ok_nam: "Add Column",
				}],
			}],
		},
	};
	var newColName = inputName ? inputName : app.execDialog(theDialog) === "ok" && theDialog.column ? theDialog.column : false;
	if (newColName) {
		var oColumn = {
			type: typeName ? typeName : 'extra',
			name: newColName,
			scores: [0,0,0,0,0,0,0],
		};
		if (index === undefined || index > CurrentStats.cols.length) {
			index = CurrentStats.cols.length;
		}
		CurrentStats.cols.splice(index, 0, oColumn);
	}
	return index;
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
