//recursively merge two objects and return the result
function MergeRecursive(obj1, obj2) {
	for (var p in obj2) {
		try {
			// Property in destination object set; update its value.
			if (obj2[p].constructor == Object) {
				obj1[p] = MergeRecursive(obj1[p], obj2[p]);
			} else {
				obj1[p] = obj2[p];
			}
		} catch (e) {
			// Property in destination object not set; create it and set its value.
			obj1[p] = obj2[p];
		}
	}
	return obj1;
};

//recursively move single element from object1 into object2
function MergeElement(obj1, elem, obj2) {
	obj2 = SetNegativeElement(obj2);
	for (var p in obj1) {
		// Property in destination object set; update its value.
		if (obj1[p].constructor == Object && p !== elem) {
			if (!obj2[p]) obj2[p] = {};
			var newObj = MergeElement(obj1[p], elem, obj2[p]);
			obj1[p] = newObj[0];
			obj2[p] = newObj[1];
		} else if (p === elem) {
			if (obj1[p].constructor == Object && obj2[p]) {
				obj2[p] = MergeRecursive(obj2[p], obj1[p]);
			} else {
				obj2[p] = obj1[p];
			}
			delete obj1[p];
		}
	}
	return [CleanObject(obj1), CleanObject(obj2)];
};

//recursively remove elements of an object that are themselves empty objects
function CleanObject(obj) {
	for (var p in obj) {
		if (obj[p].constructor == Object) {
			for (var q in obj[p]) {
				if (obj[p][q].constructor == Object) {
					CleanObject(obj[p]);
				}
			}
			if (!ObjLength(obj[p])) delete obj[p];
		}
	}
	return obj;
};

//reduce an object to just the nodes
function ReduceObject(obj) {
	var hasSub = false;
	for (var p in obj) {
		if (obj[p].constructor == Object) {
			hasSub = true;
			obj[p] = ReduceObject(obj[p]);
			var emptyObj = true;
			for (var q in obj[p]) {
				emptyObj = false;
				break;
			}
			if (emptyObj) obj[p] = -1;
		} else {
			delete obj[p];
		}
	}
	return hasSub ? obj : false;
};

//get the positive value of a (sub)object
function GetPositiveElement(obj) {
	var thePos = false;
	for (var p in obj) {
		if (obj[p].constructor == Object) {
			thePos = GetPositiveElement(obj[p]);
		} else if (obj[p] > 0) {
			thePos = p;
		}
		if (thePos !== false) break;
	}
	return thePos;
};

//Set the negative value for all (sub)objects
function SetNegativeElement(obj) {
	for (var p in obj) {
		if (obj[p].constructor == Object) {
			obj[p] = SetNegativeElement(obj[p]);
		} else if (obj[p] > 0) {
			obj[p] = -1 * obj[p];
		}
	}
	return obj;
};

//find the element that is active in an object
function FindActiveElement(obj) {
	obj = newObj(obj);
	var elem = GetPositiveElement(obj);
	if (!elem) {
		var theNodes = ReduceObject(obj);
		if (theNodes) {
			var elem = SelectElement_Dialog(theNodes);
		}
	}
	return elem;
};

//ask the user to make a selection from a hierarchical list element, recursively
function SelectElement_Dialog(theNodes) {
	//first see if there is more than one node in the object
	var countNodes = [0, false];
	for (var p in theNodes) {
		if (theNodes[p].constructor == Object) {
			countNodes = [0, false];
			break;
		} else {
			countNodes[0] += 1;
			countNodes[1] = p;
		}
	}
	var theElem = countNodes[0] === 1 ? countNodes[1] : false;
	var theTxt = "This pop-up is necessary because Adobe Acrobat can only detect if you selected an element, and not if you selected a node (i.e. an element you can collapse/expand).\nPlease select which node you want to move from the options below, or press cancel if you don't want anything to move.";
	var dialogue = {
		selection : false,
		initialize : function (dialog) {
			dialog.load({
				"sele" : theNodes
			});
		},
		commit : function (dialog) {
			var oResult = dialog.store();
			this.selection = FindActiveElement(oResult["sele"]);
		},
		description : {
			name : "NODE SELECTION DIALOG",
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : [{
					type : "static_text",
					item_id : "head",
					font : "heading",
					bold : true,
					wrap_name : true,
					width : 400,
					name : "Select a node to use (because Adobe Acrobat is stupid)"
				}, {
					type : "static_text",
					item_id : "txt0",
					wrap_name : true,
					width : 400,
					name : theTxt
				}, {
					type : "hier_list_box",
					item_id : "sele",
					width : 400,
					height : 200
				}, {
					type : "ok_cancel",
					ok_name : "Select"
				}]
			}]
		}
	}

	if (!theElem && app.execDialog(dialogue) === "ok") {
		theElem = dialogue.selection;
	}
	return theElem;
};

//find the element that is active in obj1 and move it to obj2
function GetElementAndMerge(obj1, obj2) {
	var theReturn = false;
	var elem = FindActiveElement(obj1);
	if (elem) theReturn = MergeElement(obj1, elem, obj2);
	return theReturn;
};

//make an array of an object, with the option to include just the nodes (type === "nodes"), just the elements (type === "elements"), or all (type === "all")
function ObjectToArray(obj, type, testObj) {
	var theArr = [];
	var testArr = testObj && isArray(testObj) ? testObj : (testObj ? ObjectToArray(testObj, "nodes") : []);
	for (var p in obj) {
		if (obj[p].constructor == Object) {
			theArr.push.apply(theArr, ObjectToArray(obj[p], type, testObj));
			if ((/nodes|all/i).test(type) && testArr.indexOf(p) === -1) theArr.push(p);
		} else if ((/elements|all/i).test(type) && testArr.indexOf(p.replace(/^ basic /, "")) === -1) {
			theArr.push(p);
		}
	}
	return theArr;
};

//source exclusions when loading the sheet for the first time or after import script update
function resourceExclusionSetting(spellSources, noChanges, oldResults) {
	if (!noChanges) {
		// Exclude newly added Unearthed Arcana if none were known or all were excluded before
		// Also exclude newly added sources that have the defaultExcluded flag
		var exclAllUA = true;
		for (var i = 0; i < CurrentSources.globalKnown.length; i++) {
			var src = CurrentSources.globalKnown[i];
			var aSrc = SourceList[src];
			exclAllUA = !aSrc || !aSrc.group || !(/unearthed arcana/i).test(aSrc.group) || CurrentSources.globalExcl.indexOf(src) !== -1;
			if (!exclAllUA) break;
		};
		var newGlobalKnown = [];
		for (var src in SourceList) {
			if (tDoc.info.SpellsOnly && spellSources.indexOf(src) === -1) continue;
			newGlobalKnown.push(src);
			var aSrc = SourceList[src];
			if (CurrentSources.globalExcl.indexOf(src) === -1 && (
				(exclAllUA && (/unearthed arcana/i).test(aSrc.group)) || 
				(SourceList[src].defaultExcluded && CurrentSources.globalKnown.indexOf(src) === -1)
			)) {
				CurrentSources.globalExcl.push(src);
			}
		}
		CurrentSources.globalKnown = newGlobalKnown;
	}
	// Exclude new objects that have the defaultExcluded flag
	var resourceOptions = [{
		exclObj : "classExcl",
		name : "Class(es)",
		listObj : "ClassList",
		subAttribute : "subclasses",
		subName : "Archetype(s)",
		subListObj : "ClassSubList",
		subListObjName : "subname"
	}, {
		exclObj : "racesExcl",
		name : "Player Races",
		listObj : "RaceList",
		subAttribute : "variants",
		subName : "Racial Variants",
		subListObj : "RaceSubList"
	}, {
		exclObj : "backgrExcl",
		name : "Backgrounds",
		listObj : "BackgroundList",
		subAttribute : "variant",
		subName : "Backgrounds",
		subListObj : "BackgroundSubList"
	}, {
		exclObj : "backFeaExcl",
		name : "Background Features",
		listObj : "BackgroundFeatureList"
	}, {
		exclObj : "featsExcl",
		name : "Feats",
		listObj : "FeatsList",
		subAttribute : "choices"
	}, {
		exclObj : "weapExcl",
		name : "Weapons/Attacks",
		listObj : "WeaponsList"
	}, {
		exclObj : "armorExcl",
		name : "Armor",
		listObj : "ArmourList"
	}, {
		exclObj : "ammoExcl",
		name : "Ammunition",
		listObj : "AmmoList"
	}, {
		exclObj : "magicitemExcl",
		name : "Magic Items",
		listObj : "MagicItemsList",
		subAttribute : "choices"
	}, {
		exclObj : "spellsExcl",
		name : "Spells/Psionics",
		listObj : "SpellsList"
	}, {
		exclObj : "creaExcl",
		name : "Creatures",
		listObj : "CreatureList"
	}, {
		exclObj : "compExcl",
		name : "Companion Options",
		listObj : "CompanionList"
	}];
	if (tDoc.info.SpellsOnly) {
		resourceOptions = [{
			exclObj : "spellsExcl",
			name : "Spells/Psionics",
			listObj : "SpellsList"
		}];
	}
	var theExclusions = {}, returnObj = { str : [], new : [], all : [], found : false };
	var newTxt = toUni("NEW ");
	var addNewExcl = function(type, typeNm, obj, objID, objNm) {
		if (!obj.defaultExcluded) return;
		if (!CurrentSources[type]) CurrentSources[type] = [];
		if (!CurrentSources[type + "Default"]) CurrentSources[type + "Default"] = [];
		if (!theExclusions[typeNm]) theExclusions[typeNm] = [];
		returnObj.found = true;
		var srcExcl = testSource(objID, obj);
		var curExcl = CurrentSources[type].indexOf(objID) !== -1;
		var treatAsNew = oldResults && (oldResults.new.indexOf(type+objID) !== -1 || oldResults.all.indexOf(type+objID) == -1);
		var exclName = objNm + stringSource(obj, "first", " (", ")");
		if (CurrentSources[type + "Default"].indexOf(objID) == -1) {
			CurrentSources[type + "Default"].push(objID);
			if (!curExcl) {
				CurrentSources[type].push(objID);
				curExcl = true;
				exclName = newTxt + exclName;
				returnObj.new.push(type+objID);
			}
		} else if (treatAsNew) {
			exclName = newTxt + exclName;
			returnObj.new.push(type+objID);
		}
		if (curExcl && !srcExcl) {
			theExclusions[typeNm].push(exclName);
			returnObj.all.push(type+objID);
		}
	}
	for (var i = 0; i < resourceOptions.length; i++) {
		var opt = resourceOptions[i];
		var optObj = tDoc[opt.listObj];
		var optSub = opt.subAttribute;
		var featOrMI = opt.exclObj == "featsExcl" || opt.exclObj == "magicitemExcl";
		for (var key in optObj) {
			var mainObj = optObj[key];
			var mainObjName = mainObj.name ? mainObj.name : key.capitalize();
			if (mainObj.defaultExcluded && (!featOrMI || !mainObj[optSub])) {
				addNewExcl(opt.exclObj, opt.name, mainObj, key, mainObjName);
			}
			// dependent entries
			var subObjs = mainObj[optSub];
			if (opt.exclObj == "classExcl") subObjs = subObjs[1];
			if (!optSub || !subObjs) continue; // nothing found, so stop
			var optSubObj = featOrMI ? mainObj : tDoc[opt.subListObj];
			for (var c = 0; c < subObjs.length; c++) {
				var subKey = subObjs[c].toLowerCase();
				if (opt.exclObj == "racesExcl") subKey = key + "-" + subKey;
				var subObj = optSubObj[subKey];
				if (subObj && subObj.defaultExcluded) {
					var subID = subKey;
					var subName = mainObjName + ": " + (
						opt.subListObjName && subObj[opt.subListObjName] ? subObj[opt.subListObjName] :
						subObj.name ? subObj.name :
						opt.exclObj == "racesExcl" ? subObjs[c].capitalize() + " " + mainObjName :
						subObjs[c]);
					if (featOrMI) {
						subID = key + "-" + subID;
						subName = subObj.name ? subObj.name : mainObjName + " [" + subObjs[c] + "]";
					}
					addNewExcl(opt.exclObj, opt.subName, subObj, subID, subName);
				}
			}
		}
	}
	for (var exclusion in theExclusions) {
		theExclusions[exclusion].sort();
		var addStr = formatMultiList(exclusion, theExclusions[exclusion]);
		if (addStr) returnObj.str.push(addStr);
	}
	returnObj.str = returnObj.str.join("\n\n");
	return returnObj;
}

//a function that sets the global variable of excluded materials
//inclA must be the same length as inclA_Names, and exclA must be the same length as exclA_Names
function resourceDecisionDialog(atOpening, atReset, forceDDupdate) {
	if (!atOpening && app.viewerVersion < 15) FunctionIsNotAvailable();
	var isFirstTime = atReset ? atReset : CurrentSources.firstTime;
	var spellSources = [];
	if (tDoc.info.SpellsOnly) {
		var fAddToSpellSources = function(aRawSource) {
			var aSources = parseSource(aRawSource);
			if (!aSources) return;
			for (var i = 0; i < aSources.length; i++) {
				if (spellSources.indexOf(aSources[i][0]) === -1) spellSources.push(aSources[i][0]);
			};
		}
		// If this is a spell sheet, only use sources that have spells or spellcasting classes associated with them
		for (var u in SpellsList) fAddToSpellSources(SpellsList[u].source);
		for (var sClass in ClassList) {
			var objClass = ClassList[sClass];
			if (objClass.spellcastingFactor && sClass !== "rangerua") {
				fAddToSpellSources(objClass.source);
			}
			if (objClass.subclasses && isArray(objClass.subclasses[1])) {
				for (var i = 0; i < objClass.subclasses[1].length; i++) {
					var objSubClass = ClassSubList[objClass.subclasses[1][i]]
					if (objSubClass && objSubClass.spellcastingFactor)
						fAddToSpellSources(objSubClass.source);
				};
			}
		};
	};

	// Create the CurrentSources object if this is the first time
	if (isFirstTime) {
		CurrentSources = {
			firstTime : atReset ? "nextOpen" : false,
			globalExcl : [], globalKnown : []
		};
	};
	// Update default excluded if this is the first time or import scripts were changed
	var newExcluded = resourceExclusionSetting(spellSources);
	SetStringifieds("sources");
	if (atOpening && (atReset || app.viewerVersion < 15)) return;
	if (atOpening && CurrentSources.firstTime === "nextOpen") {
		CurrentSources.firstTime = false;
		isFirstTime = true;
	};

	var remCS = What("CurrentSources.Stringified");
	var onlySRD = [];
	var exclObj = {}, inclObj = {};
	for (var src in SourceList) {
		if (this.info.SpellsOnly && spellSources.indexOf(src) === -1) continue;
		var srcGroup = !SourceList[src].group ? "other" : SourceList[src].group;
		var srcName = SourceList[src].name.replace(RegExp(srcGroup + " ?:? ?", "i"), "") + " (" + SourceList[src].abbreviation + ")";
		if (srcGroup === "Unearthed Arcana" && SourceList[src].date) srcName = SourceList[src].date + " " + srcName;
		if (!srcGroup || srcGroup === "default") continue;
		onlySRD.push(src);
		if (!/(core|primary) source/i.test(srcGroup.indexOf)) srcGroup = "\u200B" + srcGroup;
		if (!exclObj[srcGroup]) exclObj[srcGroup] = {};
		if (!inclObj[srcGroup]) inclObj[srcGroup] = {};
		if (CurrentSources.globalExcl.indexOf(src) !== -1) {
			exclObj[srcGroup][srcName] = -1;
		} else {
			inclObj[srcGroup][srcName] = -1;
		};
	};
	onlySRD = onlySRD.length === 1 && onlySRD[0] === "SRD";

	var getMoreCont = "\u200B\u200B>> click this line to get more content <<";
	exclObj[getMoreCont] = -1;
	exclObj = CleanObject(exclObj); inclObj = CleanObject(inclObj);

	var tries = 0;
	var selBoxHeight = 250;
	do {
		try {
			var mons = app.monitors.primary();
			var resHigh = mons && mons[0] && mons[0].rect ? mons[0].rect[3] : false;
			if (resHigh && resHigh < 800) selBoxHeight = 250 - Math.min(100, 825 - resHigh);
			tries = 100;
		} catch (e) {
			tries += 1;
		}
	} while (tries < 5);

	var Text00 = "[Can't see the bottom of this dialog? Use ENTER to confirm or ESC to cancel]";
	var Text01 = 'As you are opening the sheet for the first time, please select which resources to use. It is recommended that you set the resources to use before inputting anything into the sheet. However, you can open this dialog at any time with the "Sources" button (book icon) or "Source Material" bookmark.';
	var Text02 = toUni("Important") + ": If something appears in multiple sources under the same name, like the Ranger class appearing in the SRD, PHB, and 'UA: Ranger, Revised', the newer included source will be used.";
	var Text1 = "Use the buttons below to select what the sheet is and isn't allowed to use for each category, without having to exclude a sourcebook in its entirety.\nNote that if you excluded a sourcebook above, its content will not show up at all with the buttons below.";
	var txtDefaultExcluded0 = 'Some imported elements are set to be excluded by default and are listed below. You can include these using the buttons in the "Exclude elements of the sourcebooks included above" section of this dialog.';
	var txtDefaultExcluded1 = "Note that elements whose sourcebook have been excluded are not part of this list, nor are those that you've already manually included. This list can change when you include/exclude sourcebooks or elements, or import new content.";

	var selectionDialogue = {
		exclActive : false,
		inclActive : false,
		exclObject : exclObj,
		inclObject : inclObj,
		sourceLink : "",
		scrpMenu : false,
		defaultExcl : newExcluded,
		spellSources : spellSources,
		initialize : function (dialog) {
			dialog.load({
				"img1" : allIcons.sources,
				"ExcL" : this.exclObject,
				"IncL" : this.inclObject,
				"ExTx" : this.defaultExcl.str
			});
			dialog.visible({
				"bWhy" : onlySRD
			});
			dialog.setForeColorRed("tx02");
		},
		updateLink : function (dialog, ExcInc) {
			//get the positive element
			var exclNow = dialog.store()[ExcInc];
			var sourceNm = GetPositiveElement(exclNow);
			//run through the sourcelist and get the name of the source
			var theSrc = false;
			for (var src in SourceList) {
				var srcName = SourceList[src].name.replace(RegExp(SourceList[src].group + " ?:? ?", "i"), "") + " (" + SourceList[src].abbreviation + ")";
				if (SourceList[src].group === "Unearthed Arcana" && SourceList[src].date) srcName = SourceList[src].date + " " + srcName;
				if (sourceNm === srcName) {
					theSrc = src;
					break;
				};
			};
			if (theSrc && SourceList[theSrc].url) {
				this.sourceLink = SourceList[theSrc].url;
				dialog.load({
					"bLin" : 'Lookup "' + SourceList[theSrc].name + '" resource'
				});
			};
		},
		updateCS : function (dialog, oResultExcL) {
			//put the excluded element into an array
			var exclArr = ObjectToArray(oResultExcL, "elements");
			//set the CurrentSources variable
			CurrentSources.globalExcl = [];
			for (var src in SourceList) {
				var srcName = SourceList[src].name.replace(RegExp(SourceList[src].group + " ?:? ?", "i"), "") + " (" + SourceList[src].abbreviation + ")";
				if (SourceList[src].group === "Unearthed Arcana" && SourceList[src].date) srcName = SourceList[src].date + " " + srcName;
				if (exclArr.indexOf(srcName) !== -1) CurrentSources.globalExcl.push(src);
				this.updateDefExcl(dialog);
			};
		},
		updateDefExcl : function (dialog) {
			if (!this.defaultExcl.found) return;
			this.defaultExcl = resourceExclusionSetting(this.spellSources, true, this.defaultExcl);
			dialog.load({ "ExTx" : this.defaultExcl.str });
		},
		ExcL : function (dialog) {
			var exclElems = dialog.store()["ExcL"];
			var isGetItem = GetPositiveElement(exclElems) === getMoreCont;
			if (isGetItem) {
				if (this.exclActive != "stop") {
					this.exclActive = "stop";
					this.bMor(dialog);
				} else {
					this.exclActive = false;
				};
				exclElems[getMoreCont] = -1;
				dialog.load({"ExcL" : exclElems});
			} else {
				this.exclActive = true;
				this.updateLink(dialog, "ExcL");
			};
		},
		IncL : function (dialog) {
			this.inclActive = true;
			this.updateLink(dialog, "IncL");
		},
		BTRA : function (dialog) {
			// move all (remaining) items from ExcL to IncL
			var elements = dialog.store();
			var exclNow = elements["ExcL"];
			delete exclNow[getMoreCont];
			var inclNow = elements["IncL"];
			var exclNew = {}; exclNew[getMoreCont] = -1;
			dialog.load({
				"ExcL" : exclNew,
				"IncL" : MergeRecursive(inclNow, exclNow)
			});
			dialog.focus("IncL");
			this.exclActive = false;
			this.inclActive = true;
			CurrentSources.globalExcl = [];
		},
		BTR1 : function (dialog) {
			// move selected (one) item from ExcL to IncL
			if (!this.exclActive) return;
			var elements = dialog.store();
			var exclNow = elements["ExcL"];
			delete exclNow[getMoreCont];
			var inclNow = elements["IncL"];
			var moveThem = GetElementAndMerge(exclNow, inclNow);
			if (moveThem) {
				moveThem[0][getMoreCont] = -1;
				dialog.load({
					"ExcL" : moveThem[0],
					"IncL" : moveThem[1]
				});
				dialog.focus("IncL");
				this.exclActive = false;
				this.inclActive = true;
			}
			this.updateCS(dialog, moveThem[0]);
		},
		BTL1 : function (dialog) {
			// move selected (one) item from IncL to ExcL
			if (!this.inclActive) return;
			var elements = dialog.store();
			var exclNow = elements["ExcL"];
			var inclNow = elements["IncL"];
			var moveThem = GetElementAndMerge(inclNow, exclNow);
			if (moveThem) {
				dialog.load({
					"IncL" : moveThem[0],
					"ExcL" : moveThem[1]
				});
				dialog.focus("ExcL");
				this.exclActive = true;
				this.inclActive = false;
			}
			this.updateCS(dialog, moveThem[1]);
		},
		BTLA : function (dialog) {
			// move all items from IncL to ExcL and sort ExcL
			var elements = dialog.store()
			var exclNow = elements["ExcL"];
			var inclNow = elements["IncL"];
			var allExcl = MergeRecursive(exclNow, inclNow)
			dialog.load({
				"ExcL" : allExcl,
				"IncL" : {}
			});
			dialog.focus("ExcL");
			this.exclActive = true;
			this.inclActive = false;
			this.updateCS(dialog, allExcl);
		},
		bCla : function (dialog) {resourceSelectionDialog("class"); this.updateDefExcl(dialog);},
		bRac : function (dialog) {resourceSelectionDialog("race"); this.updateDefExcl(dialog);},
		bFea : function (dialog) {resourceSelectionDialog("feat"); this.updateDefExcl(dialog);},
		bSpe : function (dialog) {resourceSelectionDialog("spell"); this.updateDefExcl(dialog);},
		bBac : function (dialog) {resourceSelectionDialog("background"); this.updateDefExcl(dialog);},
		bBaF : function (dialog) {resourceSelectionDialog("background feature"); this.updateDefExcl(dialog);},
		bCre : function (dialog) {resourceSelectionDialog("creature"); this.updateDefExcl(dialog);},
		bCom : function (dialog) {resourceSelectionDialog("companion"); this.updateDefExcl(dialog);},
		bAtk : function (dialog) {resourceSelectionDialog("weapon"); this.updateDefExcl(dialog);},
		bArm : function (dialog) {resourceSelectionDialog("armor"); this.updateDefExcl(dialog);},
		bAmm : function (dialog) {resourceSelectionDialog("ammo"); this.updateDefExcl(dialog);},
		bMag : function (dialog) {resourceSelectionDialog("magic item"); this.updateDefExcl(dialog);},
		bLin : function (dialog) {if (this.sourceLink) app.launchURL(this.sourceLink, true)},
		bSrc : function (dialog) { MakeSourceMenu_SourceOptions(); },
		bMor : function (dialog) {
			var MenuSelection = getMenu("importscripts");
			if (MenuSelection !== undefined && MenuSelection[0] !== "nothing") {
				MenuSelection[3] = true;
				this.scrpMenu = MenuSelection;
				dialog.end("scrp");
			};
		},
		bWhy : function (dialog) {
			var goToWeb = {
				cTitle : "Why does this sheet only include content from the System Reference Document?",
				cMsg : "This sheet only includes content from the System Reference Document (SRD), because including any other material from Wizards of the Coast (WotC) would be a violation of their copyright. MorePurpleMoreBetter (MPMB) can't provide you with anything more from WotC other than the SRD, which is covered under the Open Gaming License (OGL).\n\nHowever, using the 'Get more' button, you can add content to the sheet that you or somebody else made.\n\nMPMB has some pre-written 3rd-party materials such as the 'Remastered: Way of the Four Elements', DMs Guild creations by Matt Mercer (Blood Hunter, Gunslinger, College of the Maestro), Michael Wolf (Shaman), and more...\nThere is also a subreddit dedicated to sharing people's own creations.\n\nWould you like to go a website where you can learn more about how this works and find more content?",
				nIcon : 2,
				nType : 2
			};
			if (app.alert(goToWeb) === 4) contactMPMB("how to add content");
		},
		description : {
			name : "SOURCE SELECTION DIALOG",
			first_tab : "appl",
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
						font : "title",
						bold : true,
						wrap_name : true,
						width : 770,
						name : "Select which resources the sheet's automation should use"
					}]
				}, {
					type : "view",
					align_children : "align_top",
					elements : [{
						type : "view",
						align_children : "align_left",
						elements : [{
							type : "static_text",
							item_id : "tx00",
							wrap_name : true,
							font : "palette",
							width : 815,
							name : Text00 + (isFirstTime ? "\n\n" + Text01 : "")
						}, {
							type : "cluster",
							name : "The Sourcebooks",
							font : "heading",
							bold : true,
							elements : [{
								type : "view",
								align_children : "align_distribute",
								elements : [{
									type : "view",
									elements : [{
										type : "static_text",
										height : 21,
										alignment : "align_center",
										item_id : "Etxt",
										name : "Excluded from the automation",
										font : "heading"
									}, {
										width : 325,
										height : selBoxHeight,
										type : "hier_list_box",
										item_id : "ExcL"
									}]
								}, {
									type : "view",
									alignment : "align_top",
									elements : [{
										type : "button",
										item_id : "bMor",
										name : "Get more",
										font : "dialog",
										bold : true
									}, {
										type : "button",
										item_id : "bWhy",
										name : "Why only SRD?",
										font : "dialog",
										bold : true
									}, {
										type : "gap"
									}, {
										type : "button",
										item_id : "BTRA",
										name : ">>"
									}, {
										type : "button",
										item_id : "BTR1",
										name : ">"
									}, {
										type : "button",
										item_id : "BTL1",
										name : "<"
									}, {
										type : "button",
										item_id : "BTLA",
										name : "<<"
									}]
								}, {
									type : "view",
									elements : [{
										type : "static_text",
										height : 21,
										alignment : "align_center",
										item_id : "Itxt",
										name : "Included in the automation",
										font : "heading"
									}, {
										width : 325,
										height : selBoxHeight,
										type : "hier_list_box",
										item_id : "IncL"
									}]
								}]
							}, {
								type : "view",
								align_children : "align_distribute",
								alignment : "align_fill",
								elements : [{
									type : "link_text",
									font : "dialog",
									bold : true,
									item_id : "bLin",
									alignment : "align_left",
									width : 575
								}, {
									type : "button",
									item_id : "bSrc",
									alignment : "align_right",
									name : "List Source Abbreviations"
								}]
							}]
						}, {
							type : "cluster",
							name : "Exclude elements of the sourcebooks included above",
							font : "heading",
							bold : true,
							elements : [{
								type : "static_text",
								item_id : "txt1",
								wrap_name : true,
								font : "palette",
								width : 775,
								name : Text1
							}].concat(minVer ? [{
								type : "button",
								font : "dialog",
								bold : true,
								item_id : "bSpe",
								name : "Spells/Psionics",
								alignment : "align_center"
							}] : [{
								type : "view",
								align_children : "align_distribute",
								alignment : "align_fill",
								elements : [{
									type : "button",
									font : "dialog",
									bold : true,
									item_id : "bCla",
									name : "Classes/Archetypes"
								}, {
									type : "button",
									font : "dialog",
									bold : true,
									item_id : "bBac",
									name : "Backgrounds"
								}, {
									type : "button",
									font : "dialog",
									bold : true,
									item_id : "bAtk",
									name : "Weapons/Attacks"
								}, {
									type : "button",
									font : "dialog",
									bold : true,
									item_id : "bMag",
									name : "Magic Items"
								}, {
									type : "button",
									font : "dialog",
									bold : true,
									item_id : "bSpe",
									name : "Spells/Psionics"
								}, {
									type : "button",
									font : "dialog",
									bold : true,
									item_id : "bCom",
									name : "Companion Options"
								}]
							}, {
								type : "view",
								align_children : "align_distribute",
								alignment : "align_fill",
								elements : [{
									type : "button",
									font : "dialog",
									bold : true,
									item_id : "bRac",
									name : "Player Races"
								}, {
									type : "button",
									font : "dialog",
									bold : true,
									item_id : "bBaF",
									name : "Background Features"
								}, {
									type : "button",
									font : "dialog",
									bold : true,
									item_id : "bAmm",
									name : "Ammunition"
								}, {
									type : "button",
									font : "dialog",
									bold : true,
									item_id : "bArm",
									name : "Armor"
								}, {
									type : "button",
									font : "dialog",
									bold : true,
									item_id : "bFea",
									name : "Feats"
								}, {
									type : "button",
									font : "dialog",
									bold : true,
									item_id : "bCre",
									name : "Creatures"
								}]
							}])
						}]
					}].concat(!newExcluded.found ? [] : [{
						type : "view",
						alignment : "align_fill",
						align_children : "align_left",
						elements : [{
							type : "cluster",
							name : "Automatically Excluded Elements",
							font : "heading",
							bold : true,
							alignment : "align_top",
							elements : [{
								type : "static_text",
								item_id : "ExH0",
								wrap_name : true,
								font : "palette",
								width : 275,
								name : txtDefaultExcluded0
							}, {
								type : "static_text",
								item_id : "ExH1",
								wrap_name : true,
								font : "palette",
								width : 275,
								name : txtDefaultExcluded1
							}, {
								type : "edit_text",
								item_id : "ExTx",
								alignment : "align_fill",
								readonly : true,
								multiline: true,
								height : isFirstTime ? 398 : 360,
								width : 275
							}]
						}]
					}])
				}, {
					type : "view",
					alignment : "align_fill",
					align_children : "align_distribute",
					elements : [{
						type : "static_text",
						item_id : "tx02",
						wrap_name : true,
						width : newExcluded.found ? 815 : 510,
						name : Text02
					}, {
						item_id : "appl",
						type : "ok_cancel",
						alignment : "align_right",
						ok_name : "Apply"
					}]
				}]
			}]
		}
	};

	var CallDialogue = app.execDialog(selectionDialogue);
	if (CallDialogue === "ok" || CallDialogue === "scrp" || (CallDialogue === "cancel" && forceDDupdate)) {
		cleanExclSources();
		SetStringifieds("sources");
	} else {
		CurrentSources = eval(remCS);
	};
	if (CallDialogue === "scrp") {
		ImportScriptOptions(selectionDialogue.scrpMenu);
	} else if (CallDialogue === "ok" || forceDDupdate) {
		// Start progress bar and stop calculations
		var thermoTxt = thermoM("Applying the changes to the sources...");
		calcStop();
		UpdateDropdown("resources");

		// Change how some things are now recognized by the sheet
		getDynamicFindVariables();

		// Set the visibility of the Choose Feature and Racial Options button
		ClassMenuVisibility();
		if (ParseRace(What("Race"))[2].length) {
			DontPrint("Race Features Menu");
		} else {
			Hide("Race Features Menu");
		}
		//if something changed for the spells make the spell menu again
		var oldCS = eval(remCS);
		if (forceDDupdate || oldCS.globalExcl !== CurrentSources.globalExcl || oldCS.classExcl !== CurrentSources.classExcl || oldCS.spellsExcl !== CurrentSources.spellsExcl) {
			setSpellVariables(forceDDupdate || oldCS.spellsExcl !== CurrentSources.spellsExcl);
			SetGearVariables();
		};
		if (forceDDupdate || oldCS.globalExcl !== CurrentSources.globalExcl || oldCS.magicitemExcl !== CurrentSources.magicitemExcl) {
			ParseMagicItemMenu();
		}
		thermoM(thermoTxt, true); // Stop progress bar
	};
};

//the buttons on the main resourceDecisionDialog point here, which can handle classes (type === "class"), races (type === "race"), feats (type === "feat"), spells (type === "spell"), backgrounds (type === "background"), background features (type === "background feature"), creatures (type === "creature")
function resourceSelectionDialog(type) {
	var exclObj = {}, inclObj = {}, inclInArr = "elements", refObj = {}, theExtra = ["", 0];

	for (var aSrc in SourceList) {
		if (SourceList[aSrc].uniS) continue;
		SourceList[aSrc].uniS = toSup(SourceList[aSrc].abbreviation);
	};

	//a way to add the source abbreviation to the string
	var amendSource = function(uString, uObj, altObj) {
		var theSrc = uObj.source ? uObj.source : (altObj && altObj.source ? altObj.source : false);
		theSrc = parseSource(theSrc);
		if (theSrc) {
			for (var i = 0; i < theSrc.length; i++) {
				if (CurrentSources.globalExcl.indexOf(theSrc[i][0]) !== -1) continue;
				uString += " " + SourceList[theSrc[i][0]].uniS;
			};
		};
		return uString;
	};

	switch (type) {
	 case "class" :
		var theName = "Classes or Archetypes";
		inclInArr = "all";
		var CSatt = "classExcl";
		for (var u in ClassList) {
			var uGroup = amendSource(ClassList[u].name, ClassList[u]);
			refObj[uGroup] = u;
			var uTest = testSource(u, ClassList[u], CSatt, true);
			if (uTest === "source") continue;
			if (!exclObj[uGroup]) exclObj[uGroup] = {};
			if (!inclObj[uGroup]) inclObj[uGroup] = {};
			for (var z = 0; z < ClassList[u].subclasses[1].length; z++) {
				var uSub = ClassList[u].subclasses[1][z];
				uSubTest = testSource(uSub, ClassSubList[uSub], CSatt, true);
				if (uSubTest === "source") continue;
				var uName = amendSource(ClassSubList[uSub].subname, ClassSubList[uSub], ClassList[u]);
				refObj[uName] = uSub;
				if (uTest || uSubTest) {
					exclObj[uGroup][uName] = -1;
				} else {
					inclObj[uGroup][uName] = -1;
				}
			}
			// but what if a class doesn't have any subclasses defined (like a prestige class)
			if (!ClassList[u].subclasses[1].length && uTest != "source") {
				if (uTest) {
					exclObj[uGroup] = -1;
				} else {
					inclObj[uGroup] = -1;
				}
			}
		};
		break;
	 case "race" :
		var theName = "Player Races";
		theExtra = ["\nRaces with variants will have all variants listed. The 'basic' version of the race is only listed so that you can exclude all variants except the basic version. Excluding the 'basic' version while still including any variant will have no effect.", 3];
		inclInArr = "all";
		var CSatt = "racesExcl";
		for (var u in RaceList) {
			var useName = RaceList[u].sortname ? RaceList[u].sortname : RaceList[u].name;
			var uGroup = amendSource(useName, RaceList[u]);
			var uTest = testSource(u, RaceList[u], CSatt, true);
			if (uTest === "source") continue;
			var doAny = false;
			if (RaceList[u].variants) {
				if (!exclObj[uGroup]) exclObj[uGroup] = {};
				if (!inclObj[uGroup]) inclObj[uGroup] = {};
				var rLen = RaceList[u].variants.length;
				for (var z = 0; z < rLen + 1; z++) {
					var uSub = z === rLen ? u : u + "-" + RaceList[u].variants[z];
					var uRaceVar = z === rLen ? RaceList[u] : RaceSubList[uSub];
					var uSubTest = testSource(uSub, uRaceVar, CSatt, true);
					if (uSubTest === "source") continue;
					doAny = z !== rLen ? true : doAny;
					if (z === rLen && !doAny) continue;
					var uName = z === rLen ? " basic " + useName : (uRaceVar && uRaceVar.name ? uRaceVar.name : RaceList[u].variants[z].capitalize() + " " + useName);
					uName = amendSource(uName, uRaceVar, RaceList[u]);
					refObj[uName] = uSub;
					if (uSubTest) {
						exclObj[uGroup][uName] = -1;
					} else {
						inclObj[uGroup][uName] = -1;
					}
				}
			}
			if (!doAny) {
				if (uTest) {
					exclObj[uGroup] = -1;
				} else {
					inclObj[uGroup] = -1;
				}
			}
			refObj[uGroup] = u;
		};
		break;
	 case "feat" :
		var theName = "Feats";
		var CSatt = "featsExcl";
		var parObj = FeatsList;
	 case "magic item" :
		if (type === "magic item") {
			var theName = "Magic Items";
			var CSatt = "magicitemExcl";
			var parObj = MagicItemsList;
		}
		for (var u in parObj) {
			var uGroup = amendSource(parObj[u].name, parObj[u]);
			var uTest = testSource(u, parObj[u], CSatt, true);
			if (uTest === "source") continue;
			if (parObj[u].choices) {
				if (!exclObj[uGroup]) exclObj[uGroup] = {};
				if (!inclObj[uGroup]) inclObj[uGroup] = {};
				var rLen = parObj[u].choices.length;
				for (var z = 0; z < rLen; z++) {
					var uSub = parObj[u].choices[z];
					var uSubL = uSub.toLowerCase();
					var uSubVar = parObj[u][uSubL];
					var uSubRef = u + "-" + uSubL;
					var uSubTest = testSource(uSubRef, uSubVar.source ? uSubVar : parObj[u], CSatt, true);
					if (uSubTest === "source") continue;
					var uName = amendSource(uSubVar.name ? uSubVar.name : uSub, uSubVar, parObj[u]);
					if (uSubTest) {
						exclObj[uGroup][uName] = -1;
					} else {
						inclObj[uGroup][uName] = -1;
					}
					refObj[uName] = uSubRef;
				}
			} else {
				if (uTest) {
					exclObj[uGroup] = -1;
				} else {
					inclObj[uGroup] = -1;
				}
			}
			refObj[uGroup] = u;
		};
		break;
	 case "spell" :
		var theName = "Spells";
		var CSatt = "spellsExcl";
		for (var u in SpellsList) {
			var uName = amendSource(SpellsList[u].name, SpellsList[u]);
			var uTest = testSource(u, SpellsList[u], CSatt, true);
			if (uTest === "source" || !SpellsList[u] || !SpellsList[u].classes) continue;
			if (spellSchoolList[SpellsList[u].school]) {
				var uGroup = ((/avatar|awakened|immortal|nomad|wu jen/i).test(spellSchoolList[SpellsList[u].school]) ? "Order of " : "School of ") + spellSchoolList[SpellsList[u].school].capitalize();
			} else {
				var uGroup = SpellsList[u].level == 0 && SpellsList[u].classes[0] === "mystic" ? "Psionic Talents" : "Other";
			};
			refObj[uName] = u;
			if (!exclObj[uGroup]) exclObj[uGroup] = {};
			if (!inclObj[uGroup]) inclObj[uGroup] = {};
			if (uTest) {
				exclObj[uGroup][uName] = -1;
			} else {
				inclObj[uGroup][uName] = -1;
			}
		};
		break;
	 case "background" :
		var theName = "Backgrounds";
		var CSatt = "backgrExcl";
		for (var u in BackgroundList) {
			var uName = amendSource(BackgroundList[u].name, BackgroundList[u]);
			refObj[uName] = u;
			if (BackgroundList[u].variant) {
				for (var z = 0; z < BackgroundList[u].variant.length; z++) {
					var uSub = BackgroundList[u].variant[z];
					var uSubTest = testSource(uSub, BackgroundSubList[uSub], CSatt, true);
					if (uSubTest === "source") continue;
					var uSubName = amendSource(BackgroundSubList[uSub].name, BackgroundSubList[uSub], BackgroundList[u]);
					refObj[uSubName] = uSub;
					if (uSubTest) {
						exclObj[uSubName] = -1;
					} else {
						inclObj[uSubName] = -1;
					}
				}
			}
			var uTest = testSource(u, BackgroundList[u], CSatt, true);
			if (uTest === "source") continue;
			if (uTest) {
				exclObj[uName] = -1;
			} else {
				inclObj[uName] = -1;
			}
		};
		break;
	 case "background feature" :
		var theName = "Background Features";
		var CSatt = "backFeaExcl";
		for (var u in BackgroundFeatureList) {
			var uName = amendSource(u.capitalize(), BackgroundFeatureList[u]);
			var uTest = testSource(u, BackgroundFeatureList[u], CSatt, true);
			if (uTest === "source") continue;
			refObj[uName] = u;
			if (uTest) {
				exclObj[uName] = -1;
			} else {
				inclObj[uName] = -1;
			}
		};
		break;
	 case "creature" :
		var theName = "Creatures";
		var CSatt = "creaExcl";
		for (var u in CreatureList) {
			var uName = amendSource(CreatureList[u].name, CreatureList[u]);
			var uTest = testSource(u, CreatureList[u], CSatt, true);
			if (uTest === "source") continue;
			var uGroup = CreatureList[u].type;
			refObj[uName] = u;
			if (!exclObj[uGroup]) exclObj[uGroup] = {};
			if (!inclObj[uGroup]) inclObj[uGroup] = {};
			if (uTest) {
				exclObj[uGroup][uName] = -1;
			} else {
				inclObj[uGroup][uName] = -1;
			}
		};
		break;
	 case "companion" :
		var theName = "Special Companion Options";
		var CSatt = "compExcl";
		for (var u in CompanionList) {
			var oEntry = CompanionList[u];
			var uName = amendSource(oEntry.nameMenu ? oEntry.nameMenu : oEntry.name, oEntry);
			var uTest = testSource(u, oEntry, CSatt, true);
			if (uTest === "source") continue;
			refObj[uName] = u;
			if (uTest) {
				exclObj[uName] = -1;
			} else {
				inclObj[uName] = -1;
			}
		};
		break;
	 case "weapon" :
		var theName = "Weapons/Attacks";
		var CSatt = "weapExcl";
		for (var u in WeaponsList) {
			var uName = amendSource(WeaponsList[u].name, WeaponsList[u]);
			var uTest = testSource(u, WeaponsList[u], CSatt, true);
			if (uTest === "source" || WeaponsList[u].list == "startlist") continue;
			var uGroup = !(/martial|simple/i).test(WeaponsList[u].type) ? WeaponsList[u].type : WeaponsList[u].list ? WeaponsList[u].type + " - " + WeaponsList[u].list : WeaponsList[u].baseWeapon ? WeaponsList[u].baseWeapon + " - variants" : "Other";
			refObj[uName] = u;
			if (!exclObj[uGroup]) exclObj[uGroup] = {};
			if (!inclObj[uGroup]) inclObj[uGroup] = {};
			if (uTest) {
				exclObj[uGroup][uName] = -1;
			} else {
				inclObj[uGroup][uName] = -1;
			}
		};
		break;
	 case "ammo" :
		var theName = "Ammunition";
		var CSatt = "ammoExcl";
		for (var u in AmmoList) {
			var uName = AmmoList[u].name;
			var uTest = testSource(u, AmmoList[u], CSatt, true);
			if (uTest === "source" || AmmoList[u].list == "startlist") continue;

			var ammSource = parseSource(AmmoList[u].source);
			var uGroup = ammSource ? SourceList[ammSource[0][0]].name : "Homebrew";
			refObj[uName] = u;
			if (!exclObj[uGroup]) exclObj[uGroup] = {};
			if (!inclObj[uGroup]) inclObj[uGroup] = {};
			if (uTest) {
				exclObj[uGroup][uName] = -1;
			} else {
				inclObj[uGroup][uName] = -1;
			}
		};
		break;
	 case "armor" :
		var theName = "Armors";
		var CSatt = "armorExcl";
		for (var u in ArmourList) {
			var uName = amendSource(ArmourList[u].name, ArmourList[u]);
			var uTest = testSource(u, ArmourList[u], CSatt, true);
			if (uTest === "source" || ArmourList[u].list == "startlist") continue;
			var uGroup = ArmourList[u].type ? ArmourList[u].type.capitalize() : "Other";
			refObj[uName] = u;
			if (!exclObj[uGroup]) exclObj[uGroup] = {};
			if (!inclObj[uGroup]) inclObj[uGroup] = {};
			if (uTest) {
				exclObj[uGroup][uName] = -1;
			} else {
				inclObj[uGroup][uName] = -1;
			}
		};
		break;
	};

	exclObj = CleanObject(exclObj); inclObj = CleanObject(inclObj);

	var Text0 = "Please select which " + theName + " you want to exclude or include from being used by the sheet." + theExtra[0] + "\n\nNote that " + theName + " from sourcebooks that you excluded in the previous dialog are not shown here at all.";

	var selectionDialogue = {
		inclInA : inclInArr,
		exclActive : true,
		inclActive : false,
		exclObject : exclObj,
		inclObject : inclObj,
		exclArr : [],
		initialize : function (dialog) {
			dialog.load({
				"ExcL" : this.exclObject,
				"IncL" : this.inclObject
			});
		},
		commit : function (dialog) {
			//put both elements into the arrays
			var oResult = dialog.store();
			this.exclArr = ObjectToArray(oResult["ExcL"], this.inclInA, this.inclInA === "all" ? oResult["IncL"] : false);
		},
		ExcL : function (dialog) {
			this.exclActive = true;
		},
		IncL : function (dialog) {
			this.inclActive = true;
		},
		BTRA : function (dialog) {
			// move all (remaining) items from ExcL to IncL
			var elements = dialog.store();
			var exclNow = elements["ExcL"];
			var inclNow = elements["IncL"];
			dialog.load({
				"ExcL" : {},
				"IncL" : MergeRecursive(inclNow, exclNow)
			});
			dialog.focus("IncL");
			this.exclActive = false;
			this.inclActive = true;
		},
		BTR1 : function (dialog) {
			// move selected (one) item from ExcL to IncL
			if (!this.exclActive) return;
			var elements = dialog.store();
			var exclNow = elements["ExcL"];
			var inclNow = elements["IncL"];
			var moveThem = GetElementAndMerge(exclNow, inclNow);
			if (moveThem) {
				dialog.load({
					"ExcL" : moveThem[0],
					"IncL" : moveThem[1]
				});
				dialog.focus("IncL");
				this.exclActive = false;
				this.inclActive = true;
			}
		},
		BTL1 : function (dialog) {
			// move selected (one) item from IncL to ExcL
			if (!this.inclActive) return;
			var elements = dialog.store();
			var exclNow = elements["ExcL"];
			var inclNow = elements["IncL"];
			var moveThem = GetElementAndMerge(inclNow, exclNow);
			if (moveThem) {
				dialog.load({
					"IncL" : moveThem[0],
					"ExcL" : moveThem[1]
				});
				dialog.focus("ExcL");
				this.exclActive = true;
				this.inclActive = false;
			}
		},
		BTLA : function (dialog) {
			// move all items from IncL to ExcL and sort ExcL
			var elements = dialog.store()
				var exclNow = elements["ExcL"];
			var inclNow = elements["IncL"];
			dialog.load({
				"ExcL" : MergeRecursive(exclNow, inclNow),
				"IncL" : {}
			});
			dialog.focus("ExcL");
			this.exclActive = true;
			this.inclActive = false;
		},
		bSrc : function (dialog) { MakeSourceMenu_SourceOptions(); },
		description : {
			name : theName.toUpperCase() + " SOURCE SELECTION DIALOG",
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : [{
					type : "static_text",
					item_id : "head",
					alignment : "align_fill",
					font : "title",
					bold : true,
					height : 21,
					width : 720,
					name : "Select which " + theName + " the sheet's automation should use"
				}, {
					type : "static_text",
					item_id : "txt0",
					wrap_name : true,
					width : 710,
					name : Text0
				}, {
					type : "view",
					align_children : "align_row",
					elements : [{
						type : "cluster",
						name : "Excluded from the automation",
						font : "heading",
						elements : [{
							width : 250,
							height : 250,
							type : "hier_list_box",
							item_id : "ExcL"
						}]
					}, {
						type : "view",
						elements : [{
							type : "button",
							item_id : "BTRA",
							name : ">>"
						}, {
							type : "button",
							item_id : "BTR1",
							name : ">"
						}, {
							type : "button",
							item_id : "BTL1",
							name : "<"
						}, {
							type : "button",
							item_id : "BTLA",
							name : "<<"
						}]
					}, {
						type : "cluster",
						name : "Included in the automation",
						font : "heading",
						elements : [{
							width : 250,
							height : 250,
							type : "hier_list_box",
							item_id : "IncL"
						}]
					}]
				}, {
					type : "view", // the bottom row of buttons
					align_children : "align_distribute",
					alignment : "align_fill",
					elements : [{
						item_id : "bSrc",
						type : "button",
						alignment : "align_left",
						name : "List Source Abbreviations"
					}, {
						type : "ok_cancel",
						alignment : "align_right",
						ok_name : "Apply"
					}]
				}]
			}]
		}
	};

	if (app.execDialog(selectionDialogue) === "ok") {
		CurrentSources[CSatt] = [];
		for (var a = 0; a < selectionDialogue.exclArr.length; a++) {
			var theA = selectionDialogue.exclArr[a];
			CurrentSources[CSatt].push(refObj[theA]);
		}
		if (type === "weapon") {
			for (var key in WeaponsList) {
				var weaKey = WeaponsList[key];
				if (testSource(key, weaKey, "weapExcl")) continue;
				if (weaKey.ammo && CurrentSources.ammoExcl.indexOf(weaKey.ammo) !== -1) CurrentSources.ammoExcl.splice(CurrentSources.ammoExcl.indexOf(weaKey.ammo), 1);
			};
		}
	};
};

//a function to test if the input is not being excluded by the resource dialog (returns true if excluded)
function testSource(key, obj, CSatt, concise) {
	if (!obj) return true;
	if (!obj.source && (!CSatt || CSatt == "classExcl")) return false;
	var theRe = false;
	var tSrc = !obj.source && CSatt && CSatt !== "classExcl" ? false : parseSource(obj.source);
	if (tSrc && tSrc.length > 0) {
		var srcExcluded = function(srcObj) {
			return !SourceList[srcObj[0]] || CurrentSources.globalExcl.indexOf(srcObj[0]) !== -1;
		};
		var isExcl = tSrc.every(srcExcluded);
		theRe = isExcl && concise ? "source" : isExcl;
	};
	if (!theRe && CSatt && CurrentSources[CSatt]) {
		theRe = CurrentSources[CSatt].indexOf(key) !== -1;
		if (!theRe && obj.choices && CSatt !== "classExcl") {
			var exclChoices = 0;
			for (var i = 0; i < obj.choices.length; i++) {
				var aCh = obj.choices[i].toLowerCase();
				if (!obj[aCh] || CurrentSources[CSatt].indexOf(key + "-" + aCh) !== -1) exclChoices++;
			}
			if (obj.choices.length == exclChoices) theRe = true;
		}
	} 
	return theRe;
};

//a function to make the source attribute into a consistent array [[source, page]] and move excluded sources to the end
function parseSource(srcObj) {
	if (!srcObj) return false;
	var uObj = false;
	if (typeof srcObj == "string") {
		if (SourceList[srcObj]) uObj = [[srcObj, 0]];
	} else if (srcObj.length === 2 && typeof srcObj[0] == "string" && !isArray(srcObj[1])) {
		if (SourceList[srcObj[0]]) uObj = [srcObj];
	} else if (srcObj.length === 1 && !isArray(srcObj[0])) {
		if (SourceList[srcObj[0]]) uObj = [[srcObj[0], 0]];
	} else {
		uObj = srcObj;
	}
	if (!uObj) return false;
	var theRe = [];
	var theSRD = [];
	var areExcl = [];
	for (var i = 0; i < uObj.length; i++) {
		var toUse = !isArray(uObj[i]) ? [uObj[i], 0] : uObj[i].length > 1 ? uObj[i] : [uObj[i][0], 0];
		if (!toUse[0] || !SourceList[toUse[0]]) {
			continue;
		} else if (uObj[i][0] === "SRD") {
			theSRD.push(toUse);
		} else if (CurrentSources.globalExcl.indexOf(toUse[0]) !== -1) {
			areExcl.push(toUse);
		} else {
			theRe.push(toUse);
		};
	};
	return theRe.concat(theSRD).concat(areExcl);
};

//a function to make a readable string of the source
// verbosity = full (full source name), abbr (source abbreviation), page (, page), first (only first one found that is included), multi (add line break after each entry)
function stringSource(obj, verbosity, prefix, suffix) {
	var theSrc = parseSource(obj.source);
	if (theSrc) {
		var theRe = "";
		verbosity = verbosity.toLowerCase();
		var sFull = verbosity.indexOf("full") !== -1;
		var pFull = verbosity.indexOf("page") !== -1;
		for (var i = 0; i < theSrc.length; i++) {
			if (CurrentSources.globalExcl.indexOf(theSrc[i][0]) !== -1) continue;
			if (theRe) theRe += !pFull ? ", " : verbosity.indexOf("multi") !== -1 ? ";\n" : "; ";
			theRe += sFull ? SourceList[theSrc[i][0]].name : SourceList[theSrc[i][0]].abbreviation;
			theRe += !theSrc[i][1] ? "" : (pFull ? ", page " : " ") + theSrc[i][1];
			if (verbosity.indexOf("first") !== -1) break;
		};
		if (theRe && theRe.indexOf("\n") !== -1) theRe += ".";
		return theRe ? (prefix ? prefix : "") + theRe + (suffix ? suffix : "") : "";
	} else {
		return "";
	};
};

// make a menu off all the sources where clicking on them gets you to their linked URL
function MakeSourceMenu_SourceOptions() {
	var SourceMenu = [{
		cName : "[clicking a source will open a web page]",
		bEnabled : false
	}, {
		cName : "All",
		oSubMenu : []
	}, {
		cName : "Core Sources",
		oSubMenu : []
	}, {
		cName : "Primary Sources",
		oSubMenu : []
	}, {
		cName : "Adventure Books",
		oSubMenu : []
	}, {
		cName : "Adventurers League",
		oSubMenu : []
	}, {
		cName : "Extra Life",
		oSubMenu : []
	}, {
		cName : "Unearthed Arcana",
		oSubMenu : []
	}];

	var menuLoc = {
		"core sources" : 2,
		"primary sources" : 3,
		"adventure books" : 4,
		"adventurers league" : 5,
		"extra life" : 6,
		"unearthed arcana" : 7
	};

	var abbrObj = { arr : [], obj : {}, lowObj : {} };
	for (var aSource in SourceList) {
		abbrObj.arr.push(SourceList[aSource].abbreviation);
		abbrObj.obj[SourceList[aSource].abbreviation] = aSource;
		abbrObj.lowObj[aSource.toLowerCase()] = aSource;
	};
	abbrObj.arr.sort();

	var extraMenuItems = false;
	for (var i = 0; i < abbrObj.arr.length; i++) {
		var aSource = abbrObj.obj[abbrObj.arr[i]];
		if (/^(DMguild|HB)$/.test(aSource)) continue;
		var src = SourceList[aSource];
		var useGroup = src.group.toLowerCase();
		var theIndex = menuLoc[useGroup];
		if (!theIndex) {
			if (!extraMenuItems) {
				SourceMenu.push({ cName : "-" });
				extraMenuItems = true;
			};
			theIndex = SourceMenu.length;
			SourceMenu.push({
				cName : src.group,
				oSubMenu : []
			});
			menuLoc[useGroup] = theIndex;
		};

		var allItem = {
			cName : (src.abbreviation + (new Array(10)).join("\u2002")).substr(0, 10) + src.name,
			cReturn : "sourcelist#" + aSource
		};
		if ((/(\d+\/\d+\/\d+)(.*)/).test(allItem.cName)) allItem.cName = allItem.cName.replace(/(\d+\/\d+\/\d+)(.*)/, "$2 ($1)");
		SourceMenu[1].oSubMenu.push(allItem);
		var srcItem = {
			cName : allItem.cName.replace(RegExp(src.group + ":? ?", "i"), ""),
			cReturn : allItem.cReturn
		};
		SourceMenu[theIndex].oSubMenu.push(srcItem);
	};

	for (var entry in SourceMenu) {
		if (SourceMenu[entry].oSubMenu) {
			if (!SourceMenu[entry].oSubMenu.length) {
				delete SourceMenu[entry];
				continue;
			}
			SourceMenu[entry].oSubMenu.sort();
		}
	}

	SourceMenu.push({ cName : "-" });
	SourceMenu.push({
		cName : "Open a dialog with a list of the sources",
		cReturn : "sourcelist#dialogue"
	});

	//parse it into a global variable
	Menus.sources = SourceMenu;

	//now call the menu
	var MenuSelection = getMenu("sources");

	if (!MenuSelection || MenuSelection[0] == "nothing") return;
	if (MenuSelection[1] === "dialogue") {
		ShowDialog("List of Sources, sorted by abbreviation", "sources");
		return;
	};
	var theSrc = abbrObj.lowObj[MenuSelection[1]];

	if (SourceList[theSrc].url) {
		app.launchURL(SourceList[theSrc].url, true);
	};
};

// A function to remove excluded objects that no longer exist
function cleanExclSources() {
	var getSubs = function(pObj, objEntry) {
		var anObj = pObj[objEntry];
		if (!anObj.choices) return [];
		var chArr = [];
		for (var i = 0; i < anObj.choices.length; i++) {
			var chI = anObj.choices[i].toLowerCase();
			if (anObj[chI]) chArr.push(objEntry + "-" + chI);
		}
		return chArr;
	}
	var getRelObject = function(attrNm) {
		var reArr = [], entry;
		switch (attrNm) {
			case "globalExcl" :
				for (entry in SourceList) reArr.push(entry);
				break;
			case "classExcl" :
				for (entry in ClassList) reArr.push(entry);
				for (entry in ClassSubList) reArr.push(entry);
				break;
			case "racesExcl" :
				for (entry in RaceList) reArr.push(entry);
				for (entry in RaceSubList) reArr.push(entry);
				break;
			case "featsExcl" :
				for (entry in FeatsList) {
					reArr.push(entry);
					reArr = reArr.concat(getSubs(FeatsList, entry));
				}
				break;
			case "magicitemExcl" :
				for (entry in MagicItemsList) {
					reArr.push(entry);
					reArr = reArr.concat(getSubs(MagicItemsList, entry));
				}
				break;
			case "spellsExcl" :
				for (entry in SpellsList) reArr.push(entry);
				break;
			case "backgrExcl" :
				for (entry in BackgroundList) reArr.push(entry);
				for (entry in BackgroundSubList) reArr.push(entry);
				break;
			case "backFeaExcl" :
				for (entry in BackgroundFeatureList) reArr.push(entry);
				break;
			case "creaExcl" :
				for (entry in CreatureList) reArr.push(entry);
				break;
			case "weapExcl" :
				for (entry in WeaponsList) reArr.push(entry);
				break;
			case "ammoExcl" :
				for (entry in AmmoList) reArr.push(entry);
				break;
			case "armorExcl" :
				for (entry in ArmourList) reArr.push(entry);
				break;
			default :
				return false;
		}
		return reArr;
	}
	for (var anExcl in CurrentSources) {
		if (anExcl.indexOf("Excl") == -1) continue;
		var isKnown = getRelObject(anExcl);
		if (!isKnown) continue;
		var newExcl = [];
		for (var i = 0; i < CurrentSources[anExcl].length; i++) {
			var iEntry = CurrentSources[anExcl][i];
			if (isKnown.indexOf(iEntry) !== -1) newExcl.push(iEntry);
		}
		CurrentSources[anExcl] = newExcl;
	}
};
