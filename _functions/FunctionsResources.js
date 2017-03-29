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
			var hasSub = false;
			for (var q in obj[p]) {
				hasSub = true;
				if (obj[p][q].constructor == Object) {
					CleanObject(obj[p]);
				}
			}
			if (!hasSub) delete obj[p];
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
	obj = eval(obj.toSource());
	var elem = GetPositiveElement(obj);
	if (!elem) {
		var theNodes = ReduceObject(obj);
		if (theNodes) {
			var elem = SelectElement_Dialog(theNodes);
		}
	}
	return elem;
};

//ask the user to make a selection from a heirarchical list element, recursively
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
	var dialogue = {
		selection : false,
		input : theNodes,
		initialize : function (dialog) {
			dialog.load({
				"sele" : this.input,
				"txt0" : "This pop-up is necessary because Adobe Acrobat can only detect if you selected an element, and not if you selected a node (i.e. an element you can collapse/expand).\nPlease select which node you want to move from the options below, or press cancel if you don't want anything to move."
			});
		},
		commit : function (dialog) {
			var oResult = dialog.store();
			this.selection = FindActiveElement(oResult["sele"]);
		},
		description : {
			name : "Pick the node",
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : [{
					type : "static_text",
					item_id : "head",
					font : "heading",
					bold : true,
					height : 21,
					width : 400,
					name : "Select a node to use (because Adobe Acrobat is stupid)"
				}, {
					type : "static_text",
					item_id : "txt0",
					char_height : 8,
					width : 400
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

//a function that sets the global variable of excluded materials
//inclA must be the same length as inclA_Names, and exclA must be the same length as exclA_Names
function resourceDecisionDialog() {
	var isFirstTime = CurrentSources.firstTime;
	if (this.info.SpellsOnly) { //if this is a spell sheet, only use sources that have spells associated with them
		var spellSources = [];
		for (var u in SpellsList) {
			var sSource = SpellsList[u].source;
			var aSource = isArray(sSource) ? sSource[0] : sSource;
			if (aSource && spellSources.indexOf(aSource) === -1) spellSources.push(aSource);
		}
		for (var aClass in ClassList) {
			var cSource = ClassList[aClass].source;
			if (!cSource || !ClassList[aClass].spellcastingFactor || aClass === "rangerua") continue;
			aSource = isArray(cSource) ? cSource[0] : cSource;
			if (aSource && spellSources.indexOf(aSource) === -1) spellSources.push(aSource);
		}
	}
	
	var exclObj = {}, inclObj = {};
	if (isFirstTime) {
		CurrentSources = {
			firstTime : false,
			globalExcl : []
		};
		for (var src in SourceList) {
			if (this.info.SpellsOnly && spellSources.indexOf(src) === -1) continue;
			if (SourceList[src].group === "Unearthed Arcana") {
				CurrentSources.globalExcl.push(src);
			}
		};
		Value("CurrentSources.Stringified", CurrentSources.toSource());
	};
	var remCS = CurrentSources.toSource();
	
	for (var src in SourceList) {
		if (this.info.SpellsOnly && spellSources.indexOf(src) === -1) continue;
		var srcGroup = SourceList[src].group;
		var srcName = SourceList[src].name.replace(RegExp(srcGroup + " ?:? ?", "i"), "") + " (" + SourceList[src].abbreviation + ")";
		if (!srcGroup || srcGroup === "default") continue;
		if (srcGroup !== "Official Sources") srcGroup = "\u200B" + srcGroup;
		if (!exclObj[srcGroup]) exclObj[srcGroup] = {};
		if (!inclObj[srcGroup]) inclObj[srcGroup] = {};
		if (CurrentSources.globalExcl.indexOf(src) !== -1) {
			exclObj[srcGroup][srcName] = -1;
		} else {
			inclObj[srcGroup][srcName] = -1;
		}
	};
	
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
	
	var selectionDialogue = {
		exclActive : true,
		inclActive : false,
		exclObject : exclObj,
		inclObject : inclObj,
		sourceLink : "",
		initialize : function (dialog) {
			dialog.load({
				"ExcL" : this.exclObject,
				"IncL" : this.inclObject,
				"txt0" : (isFirstTime ? "As this is the first time you are opening the sheet, please select which resources it is allowed to use. It is highly recommended that you set the resources you want to use before inputting anything into the sheet. However, you can open this dialogue at any time using the \"Sources\" button (with the book icon) and change it.\n" : "") + "First you can set the sourcebooks the sheet is allowed to use for its automation.\nBelow that, you can open dialogues to include or exclude different parts of the sourcebooks set to be included.\nNote that you can always add more resources using the \"Add Custom Script\" bookmark.\nYou can always use ENTER to confirm or ESC to cancel this dialogue.",
				"txt1" : "By pressing one of the buttons below, you open another dialogue where you can exclude and include parts of the sourcebooks. This way you can make a selection of things that the sheet is and isn't allowed to use for each category, without having to exclude a sourcebook in its entirety. Note that if you excluded a sourcebook above, its content will not show up in the dialogue created when you press the buttons below, as all of its content will be ignored by the sheet's automation.",
				"txt2" : toUni("Warning:") + " If you change anything that affects any drop-down boxes on the sheet, those will be updated." + (isFirstTime ? " If a lot of drop-down boxes are affected, this can take several minutes." : "\nPlease be aware, that this will reset those drop-down boxes to their default value. After that, the sheet will re-enter the values, which in turn will trigger the automation. This automation will then be run using the resources selected above. This can take several minutes."),
				"bLin" : "This button links to the web page of the selected sourcebook"
			});
		},
		commit : function (dialog) {},
		updateLink : function (dialog, ExcInc) {
			//get the positive element
			var exclNow = dialog.store()[ExcInc];
			var sourceNm = GetPositiveElement(exclNow);
			//run through the sourcelist and get the name of the source
			var theSrc = false;
			for (var src in SourceList) {
				if (sourceNm === (SourceList[src].name.replace(/unearthed arcana: /i, "") + " (" + SourceList[src].abbreviation + ")")) {
					theSrc = src;
					break;
				}
			};
			if (theSrc && SourceList[theSrc].url) {
				this.sourceLink = SourceList[theSrc].url;
				dialog.load({
					"bLin" : "Click here to look up the \"" + SourceList[theSrc].name + "\" resource"
				})
			}
		},
		updateCS : function (oResultExcL) {
			//put the excluded element into an array
			var exclArr = ObjectToArray(oResultExcL, "elements");
			//set the CurrentSources variable
			CurrentSources.globalExcl = [];
			for (var src in SourceList) {
				var srcName = SourceList[src].name.replace(/unearthed arcana: /i, "") + " (" + SourceList[src].abbreviation + ")";
				if (exclArr.indexOf(srcName) !== -1) CurrentSources.globalExcl.push(src);
			};
		},
		ExcL : function (dialog) {
			this.exclActive = true;
			this.updateLink(dialog, "ExcL");
		},
		IncL : function (dialog) {
			this.inclActive = true;
			this.updateLink(dialog, "IncL");
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
			CurrentSources.globalExcl = [];
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
			this.updateCS(moveThem[0]);
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
			this.updateCS(moveThem[1]);
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
			this.updateCS(allExcl);
		},
		bCla : function (dialog) {resourceSelectionDialog("class");},
		bRac : function (dialog) {resourceSelectionDialog("race");},
		bFea : function (dialog) {resourceSelectionDialog("feat");},
		bSpe : function (dialog) {resourceSelectionDialog("spell");},
		bBac : function (dialog) {resourceSelectionDialog("background");},
		bBaF : function (dialog) {resourceSelectionDialog("background feature");},
		bCre : function (dialog) {resourceSelectionDialog("creature");},
		bAtk : function (dialog) {resourceSelectionDialog("weapon");},
		bArm : function (dialog) {resourceSelectionDialog("armor");},
		bLin : function (dialog) {if (this.sourceLink) app.launchURL(this.sourceLink, true)},
		description : {
			name : "Pick which resources are excluded and included",
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
					name : "Select which resources the sheet's automation should use"
				}, {
					type : "static_text",
					item_id : "txt0",
					char_height : isFirstTime ? 11 : 6,
					width : 720,
				}, {
					type : "cluster",
					name : "The Sourcebooks",
					font : "heading",
					bold : true,
					elements : [{
						type : "static_text",
						item_id : "txtf",
						height : 21,
						width : 710,
						name : "Please select which sources you want to exclude or include in their entirety."
					}, {
						type : "view",
						align_children : "align_row",
						elements : [{
							type : "cluster",
							name : "Excluded from the automation",
							font : "heading",
							elements : [{
								width : 250,
								height : selBoxHeight,
								type : "hier_list_box",
								item_id : "ExcL"
							}]
						}, {
							type : "view",
							elements : [{
								type : "button",
								item_id : "BTRA",
								name : ">>",
							}, {
								type : "button",
								item_id : "BTR1",
								name : ">",
							}, {
								type : "button",
								item_id : "BTL1",
								name : "<",
							}, {
								type : "button",
								item_id : "BTLA",
								name : "<<",
							}]
						}, {
							type : "cluster",
							name : "Included in the automation",
							font : "heading",
							elements : [{
								width : 250,
								height : selBoxHeight,
								type : "hier_list_box",
								item_id : "IncL",
							}]
						}]
					}, {
						type : "button",
						font : "dialog",
						bold : true,
						item_id : "bLin",
						alignment : "align_center",
						width : 700,
						name : "This button links to the web page of the selected sourcebook"
					}]
				}, {
					type : "cluster",
					name : "Exclude parts of the sourcebooks included above",
					font : "heading",
					bold : true,
					elements : [{
						type : "static_text",
						item_id : "txt1",
						char_height : 7,
						width : 710,
					}, {
						type : "view",
						align_children : "align_row",
						alignment : "align_center",
						elements : [{
							type : "button",
							font : "dialog",
							bold : true,
							item_id : "bCla",
							name : "Classes && Archetypes",
						}, {
							type : "button",
							font : "dialog",
							bold : true,
							item_id : "bRac",
							name : "Player Races",
						}, {
							type : "button",
							font : "dialog",
							bold : true,
							item_id : "bBac",
							name : "Backgrounds",
						}, {
							type : "button",
							font : "dialog",
							bold : true,
							item_id : "bBaF",
							name : "Background Features",
						}]
					}, {
						type : "view",
						align_children : "align_row",
						alignment : "align_center",
						elements : [{
							type : "button",
							font : "dialog",
							bold : true,
							item_id : "bAtk",
							name : "Weapons/Attacks",
						}, {
							type : "button",
							font : "dialog",
							bold : true,
							item_id : "bArm",
							name : "Armor",
						}, {
							type : "button",
							font : "dialog",
							bold : true,
							item_id : "bFea",
							name : "Feats",
						}, {
							type : "button",
							font : "dialog",
							bold : true,
							item_id : "bSpe",
							name : "Spells/Psionics",
						}, {
							type : "button",
							font : "dialog",
							bold : true,
							item_id : "bCre",
							name : "Creatures",
						}]
					}]
				}, {
					type : "static_text",
					item_id : "txt2",
					char_height : isFirstTime ? 3 : 5,
					width : 720,
				}, {
					type : "ok_cancel",
					ok_name : "Apply (can take a long time)",
				}]
			}]
		}
	};
	
	if (minVer) {
		selectionDialogue.description.elements[0].elements[3].elements[1] = {
			type : "button",
			font : "dialog",
			bold : true,
			item_id : "bSpe",
			name : "Spells/Psionics",
			alignment : "align_center",
		}
		selectionDialogue.description.elements[0].elements[3].elements[2] = {};
	};
	
	if (app.execDialog(selectionDialogue) === "ok") {
		UpdateDropdown("resources");
		SetStringifieds("sources");
		
		//if something changed for the spells make the spell menu again
		var oldCS = eval(remCS);
		if (oldCS.globalExcl !== CurrentSources.globalExcl || oldCS.classExcl !== CurrentSources.classExcl || oldCS.spellsExcl !== CurrentSources.spellsExcl) {
			setSpellVariables(oldCS.spellsExcl !== CurrentSources.spellsExcl);
		};
	} else {
		CurrentSources = eval(remCS);
	};
};

//the buttons on the main resourceDecisionDialog point here, which can handle classes (type === "class"), races (type === "race"), feats (type === "feat"), spells (type === "spell"), backgrounds (type === "background"), background features (type === "background feature"), creatures (type === "creature")
function resourceSelectionDialog(type) {
	var exclObj = {}, inclObj = {}, inclInArr = "elements", refObj = {}, theExtra = ["", 0];

	for (var aSrc in SourceList) {
		if (SourceList[aSrc].uniS) continue;
		SourceList[aSrc].uniS = toSup(SourceList[aSrc].abbreviation);
	}
	
	//a way to add the source abbreviation to the string
	var amendSource = function(uString, uObj, altObj) {
		var theSrc = uObj.source ? uObj.source : (altObj && altObj.source ? altObj.source : false);
		if (theSrc) {
			theSrc = isArray(theSrc) ? theSrc[0] : theSrc;
			var theAbb = SourceList[theSrc] ? " " + SourceList[theSrc].uniS : "";
			uString += theAbb;
		}
		return uString;
	}
	
	switch (type) {
	 case "class" :
		var theName = "Classes or Archetypes";
		inclInArr = "all";
		var CSatt = "classExcl";
		for (var u in ClassList) {
			var uGroup = amendSource(ClassList[u].name, ClassList[u]);
			refObj[uGroup] = u;
			if (!exclObj[uGroup]) exclObj[uGroup] = {};
			if (!inclObj[uGroup]) inclObj[uGroup] = {};
			var uTest = testSource(u, ClassList[u], CSatt, true);
			for (var z = 0; z < ClassList[u].subclasses[1].length; z++) {
				var uSub = ClassList[u].subclasses[1][z];
				var uName = amendSource(ClassSubList[uSub].subname, ClassSubList[uSub], ClassList[u]);
				refObj[uName] = uSub;
				uSubTest = testSource(uSub, ClassSubList[uSub], CSatt, true);
				if (uTest === "source" || uSubTest === "source") continue;
				if (uTest || uSubTest) {
					exclObj[uGroup][uName] = -1;
				} else {
					inclObj[uGroup][uName] = -1;
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
		for (var u in FeatsList) {
			var uName = amendSource(FeatsList[u].name, FeatsList[u]);
			var uTest = testSource(u, FeatsList[u], CSatt, true);
			if (uTest === "source") continue;
			var uGroup = (/\[.+\]/).test(u) ? u.replace(/( ?\[.+\])/, "").capitalize() : false;
			refObj[uName] = u;
			if (uGroup) {
				uGroup = amendSource(uGroup, FeatsList[u]);
				if (!exclObj[uGroup]) exclObj[uGroup] = {};
				if (!inclObj[uGroup]) inclObj[uGroup] = {};
				if (uTest) {
					exclObj[uGroup][uName] = -1;
				} else {
					inclObj[uGroup][uName] = -1;
				}
			} else {
				if (uTest) {
					exclObj[uName] = -1;
				} else {
					inclObj[uName] = -1;
				}
			}
		};
		break;
	 case "spell" :
		var theName = "Spells";
		var CSatt = "spellsExcl";
		for (var u in SpellsList) {
			var uName = amendSource(SpellsList[u].name, SpellsList[u]);
			var uTest = testSource(u, SpellsList[u], CSatt, true);
			if (uTest === "source" || !SpellsList[u] || !SpellsList[u].school || !SpellsList[u].classes) continue;
			var uGroup = spellSchoolList[SpellsList[u].school].capitalize();
			uGroup = ((/avatar|awakened|immortal|nomad|wu jen/i).test(uGroup) ? "Order of " : "School of ") + uGroup;
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
	 case "weapon" :
		var theName = "Weapons/Attacks";
		var CSatt = "weapExcl";
		for (var u in WeaponsList) {
			var uName = amendSource(WeaponsList[u].name, WeaponsList[u]);
			var uTest = testSource(u, WeaponsList[u], CSatt, true);
			if (uTest === "source") continue;
			
			var uGroup = (/martial|simple/i).test(WeaponsList[u].type) && !WeaponsList[u].list ? "Other" : WeaponsList[u].type;
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
			if (uTest === "source") continue;
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
				"IncL" : this.inclObject,
				"txt0" : "Please select which " + theName + " you want to exclude or include from being used by the sheet." + theExtra[0] + "\n\nNote that " + theName + " from sourcebooks that you excluded in the previous dialogue are not shown here at all."
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
		description : {
			name : "Pick which resources are excluded and included",
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
					char_height : 5 + theExtra[1],
					width : 710
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
							name : ">>",
						}, {
							type : "button",
							item_id : "BTR1",
							name : ">",
						}, {
							type : "button",
							item_id : "BTL1",
							name : "<",
						}, {
							type : "button",
							item_id : "BTLA",
							name : "<<",
						}]
					}, {
						type : "cluster",
						name : "Included in the automation",
						font : "heading",
						elements : [{
							width : 250,
							height : 250,
							type : "hier_list_box",
							item_id : "IncL",
						}]
					}]
				}, {
					type : "ok_cancel",
					ok_name : "Apply",
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
	};
};

//a function to test if the input is not being excluded by the resource dialogue
function testSource(key, obj, CSatt, concise) {
	var theRe = false;
	if (obj.source) {
		var theSource = isArray(obj.source) ? obj.source[0] : obj.source;
		theRe = SourceList[theSource] && CurrentSources.globalExcl.indexOf(theSource) !== -1;
		if (theRe && concise) theRe = "source";
	}
	if (!theRe && CSatt && CurrentSources[CSatt] && CurrentSources[CSatt].indexOf(key) !== -1) theRe = true;
	return theRe;
};

function toSup(inString) {
	var doChar = function(aChar) {
		switch(aChar) {
			case "1" : return "\xB9";
			case "2" : return "\xB2";
			case "3" : return "\xB3";
			case "4" : return "\u2074";
			case "5" : return "\u2075";
			case "6" : return "\u2076";
			case "7" : return "\u2077";
			case "8" : return "\u2078";
			case "9" : return "\u2079";
			case "+" : return "\u207A";
			case "-" : return "\u207B";
			case "=" : return "\u207C";
			case "(" : return "\u207D";
			case ")" : return "\u207E";
			case "A" : if (useCaps) return "\u1D2C";
			case "a" : return "\u1D43";
			case "B" : if (useCaps) return "\u1D2E";
			case "b" : return "\u1D47";
			case "C" :
			case "c" : return "\u1D9C";
			case "D" : if (useCaps) return "\u1D30";
			case "d" : return "\u1D48";
			case "E" : if (useCaps) return "\u1D31";
			case "e" : return "\u1D49";
			case "F" :
			case "f" : return "\u1DA0";
			case "G" : if (useCaps) return "\u1D33";
			case "g" : return "\u1D4D";
			case "H" : if (useCaps) return "\u1D34";
			case "h" : return "\u02B0";
			case "I" : if (useCaps) return "\u1D35";
			case "i" : return "\u2071";
			case "J" : if (useCaps) return "\u1D36";
			case "j" : return "\u02B2";
			case "K" : if (useCaps) return "\u1D37";
			case "k" : return "\u1D4F";
			case "L" : if (useCaps) return "\u1D38";
			case "l" : return "\u02E1";
			case "M" : if (useCaps) return "\u1D39";
			case "m" : return "\u1D50";
			case "N" : if (useCaps) return "\u1D3A";
			case "n" : return "\u207F";
			case "O" : if (useCaps) return "\u1D3C";
			case "o" : return "\u1D52";
			case "Q" :
			case "P" : if (useCaps) return "\u1D3E";
			case "q" :
			case "p" : return "\u1D56";
			case "R" : if (useCaps) return "\u1D3F";
			case "r" : return "\u02B3";
			case "S" :
			case "s" : return "\u02E2";
			case "T" : if (useCaps) return "\u1D40";
			case "t" : return "\u1D57";
			case "U" : if (useCaps) return "\u1D41";
			case "u" : return "\u1D58";
			case "V" : if (useCaps) return "\u2C7D";
			case "v" : return "\u1D5B";
			case "W" : if (useCaps) return "\u1D42";
			case "w" : return "\u02B7";
			case "X" :
			case "x" : return "\u02E3";
			case "Y" :
			case "y" : return "\u02B8";
			case "Z" :
			case "z" : return "\u1DBB";
		}
		return aChar;
	};
	var input = inString.split(/\:|\ |\.|\,|\_/);
	var output = [];
	var useCaps = true;
	for (i = 0; i < input.length; i++) {
		useCaps = !useCaps || (/c|f|s|x|y|z/i).test(input[i]) ? false : true;
		output[i] = "";
		for (c = 0; c < input[i].length; c++) {
			output[i] += doChar(input[i].charAt(c));
		}
	}
	return output.join("-");
};