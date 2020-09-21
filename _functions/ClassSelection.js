// a way to set one value to positive in an object, and all the rest to -1
function SetPositiveElement(objIn, element) {
	var obj = JSON.parse(JSON.stringify(objIn));
	for (var p in obj) {
		if (obj[p].constructor == Object) {
			obj[p] = SetPositiveElement(obj[p], element);
		} else if (p == element) {
			obj[p] = Math.abs(obj[p]);
		} else if (obj[p] > 0) {
			obj[p] = -1 * obj[p];
		}
	}
	return obj;
};

//a dialog that allows immediate feedback on what a class' name will look like and create a comprehensive, complete string to put in the class field
function SelectClass() {
	if (app.viewerVersion < 15) {
		FunctionIsNotAvailable();
		return;
	} else if (CurrentVars.manual.classes) {
		var openManualDia = app.alert({
			cTitle : "Class processing is set to manual",
			nType : 2,
			nIcon : 1,
			cMsg : "Class processing has been turned off. Because of that, the class selection dialog won't work.\n\nWould you like to open the dialog to turn class processing back on?"
		});
		if (openManualDia == 4) SetToManual_Button();
		if (CurrentVars.manual.classes) return;
	}
	if (CurrentSources.firstTime) OpeningStatement();
	var theChar = What("PC Name") ? What("PC Name") : "your character";
	var hasUAranger = false;
	var ClassFld = What("Class and Levels");
	var charLvl = IsCharLvlVal !== false ? IsCharLvlVal : Number(What("Character Level"));
	//make an object for each class' list of subclasses
	var setClassesToDialog = function() {
		hasUAranger = !testSource("rangerua", ClassList.rangerua, "classExcl");
		ClassSelection_Dialog.classes = {" " : 1};
		ClassSelection_Dialog.classesRef = {};
		ClassSelection_Dialog.subclasses = {};
		ClassSelection_Dialog.subclassesRef = {};
		for (var aClass in ClassList) {
			var CL = ClassList[aClass];
			if (testSource(aClass, ClassList[aClass], "classExcl") || aClass != ParseClass(CL.name)[0]) continue; // Only include if the class or its source isn't excluded and parsing its name yields the right reference
			ClassSelection_Dialog.classes[CL.name] = -1;
			ClassSelection_Dialog.classesRef[CL.name] = aClass;
			ClassSelection_Dialog.subclasses[aClass] = {" " : 1};
			CL.subclasses[1].forEach( function(aSubClass) {
				var sCL = ClassSubList[aSubClass];
				if (!sCL || testSource(aSubClass, sCL, "classExcl") || aSubClass != ParseClass(sCL.fullname ? sCL.fullname : CL.name + " (" + sCL.subname + ")")[1]) return;
				ClassSelection_Dialog.subclasses[aClass][sCL.subname] = -1;
				ClassSelection_Dialog.subclassesRef[aClass+"-"+sCL.subname] = aSubClass;
			});
		};
		setDialogName(ClassSelection_Dialog, "rngr", "wrap_name", hasUAranger ? true : false);
		setDialogName(ClassSelection_Dialog, "rngr", "name", hasUAranger ? dialogTxt.rngr : "");
	};
	//add the classes to the dialog
	var loadKnownClassesToDialog = function() {
		//first add the class field text
		ClassSelection_Dialog.finalText = ClassFld;
		//then add the total level
		ClassSelection_Dialog.finalLevel = 0;
		//then fill the text for each class
		ClassSelection_Dialog.curSelec = [];
		classes.parsed.forEach( function(clP) {
			ClassSelection_Dialog.finalLevel += clP[1];
			ClassSelection_Dialog.curSelec.push([
				clP[1], // level
				clP[0], // string as it is in the class field
				"", // recognized class
				"" // recognized subclass
			]);
		});
		ClassSelection_Dialog.currentLevel = charLvl;
		ClassSelection_Dialog.LVLchange = charLvl - ClassSelection_Dialog.finalLevel;
		if (!ClassSelection_Dialog.LVLchange) {
			setDialogName(ClassSelection_Dialog, "lvlu", "wrap_name", false);
			setDialogName(ClassSelection_Dialog, "lvlu", "name", "");
			setDialogName(ClassSelection_Dialog, "bOKE", "type", "ok_cancel");
		};
		//have something to compare the classes.known against for filling in the other variables
		var selecCompare = ClassSelection_Dialog.curSelec.reduce(function(acc, val) { return acc.concat(val[1]); }, []);
		//now fill in the recognized class and subclass, if any
		for (var aClass in classes.known) {
			var theCl = classes.known[aClass];
			if (selecCompare.indexOf(theCl.string) !== -1) {
				var clPn = ClassSelection_Dialog.curSelec[selecCompare.indexOf(theCl.string)];
				clPn[2] = aClass;
				clPn[3] = theCl.subclass;
			} else {
				console.println("Error while trying to match the class '" + aClass + "' to a string in the Class field.");
				console.show();
			};
		};
	};
	var setNumberOfLinesInDialog = function(AddExtra) {
		var setHeight = 23;
		ClassSelection_Dialog.lines = 0;
		for (var i = 0; i <= 9; i++) {
			ClassSelection_Dialog.lines += setHeight > 0 ? 1 : 0;
			var cS = ClassSelection_Dialog.curSelec[i];
			var de = ClassSelection_Dialog.description.elements[0].elements[4].elements[i];
			if (!AddExtra || de.height < 0) {
				if (i > 0) {
					de.height = setHeight + (setHeight < 0 ? 0 : 2);
					de.margin_height = setHeight > 0 ? 0 : setHeight;
					de.elements.forEach( function (elem) {
						elem.height = setHeight;
					});
				};
				if (AddExtra) { // if we are adding just one more, this function is now done
					break;
				} else if (!cS || cS.length === 0) { // otherwise see if we have more classes and hide all from this one, so that at least one more than the ones that are filled are shown
					setHeight = isWindows ? -12 : -6;
				};
			};
		};
	};
	var dialogTxt = {
		dsc1 : "When you select a class or a subclass in the drop-down boxes in this dialog, the text field in the same line will update accordingly, and vice versa.\nThe drop-down boxes will only update once you click/tab outside of the text field.",
		dsc2 : "Although the sheet knows of only one way to set the text field from the drop-down boxes, it understands very many different textual inputs. You can test this by typing something in the text field and see what the sheet recognizes it as. For example, if you enter 'War Priest' it will be recognized as a 'Cleric (War Domain)', and when you enter 'Exalted Knight of Obedience' it will be recognized as 'Paladin (Oath of Devotion)'.",
		lvlu : theChar + "'s level has increased by 1, to a total of 1. Please change the level of one or more classes accordingly, or add a new class.\nYou can see the amount of levels that you still have left to distribute at the bottom in red (\u03B4-level).",
		note : "* This first row has to be used and is considered the class taken at 1st level, i.e. the class that grants all its proficiencies.",
		rngr : "IMPORTANT: As you have included the source 'Unearthed Arcana: The Ranger, Revised', the UA Ranger will be used when you select a Ranger. If you want to make a PHB Ranger, you will first have to exclude the Revised Ranger or its source (UA:RR). You can do so with the button below.",
	};
	var ClassSelection_Dialog = {
		finalText : "",
		finalLevel : 0,
		currentLevel : 0,
		LVLchange : 0,
		curSelec : [],
		delimiter : What("Delimiter"),
		lines : 1,
		initialize : function (dialog) {
			var toLoad = {
				img1 : allIcons.classes,
				full : this.finalText,
				lvlu : this.LVLchange ? theChar + "'s level has increased by " + this.LVLchange + ", to a total of " + this.currentLevel + ". Please change the level of one or more classes accordingly, or add a new class.\nYou can see the amount of levels that you still have left to distribute at the bottom in red (\u03B4-level)." : "",
				tLVL : this.finalLevel.toString(),
				nLVL : "\u03B4-level: " + (this.currentLevel - this.finalLevel),
				DeLi : this.delimiter,
				bAdR : this.lines > 9 ? "Max 10 Rows" : "Add Extra Row"
			};
			var toUse = {
				bAdR : this.lines < 10,
				nLVL : this.LVLchange ? this.currentLevel - this.finalLevel : false
			};
			for (var i = 0; i <= 9; i++) {
				toUse["r" + i + "VW"] = i < this.lines;
				var cs = this.curSelec[i];
				if (!cs || cs.length === 0) {
					this.curSelec[i] = [];
					toLoad["r" + i + "CD"] = this.getRemainingClassList();
					continue;
				};
				toLoad["r" + i + "LV"] = !isNaN(cs[0]) ? cs[0].toString() : (0).toString();
				toLoad["r" + i + "TX"] = cs[1];

				var theClass = cs[2] && ClassList[cs[2]] ? ClassList[cs[2]].name : false;
				toLoad["r" + i + "CD"] = theClass ? SetPositiveElement(this.getRemainingClassList(theClass), theClass) : this.getRemainingClassList();
				toLoad["r" + i + "CS"] = cs[2] ? this.getSrc(ClassList[cs[2]]) : "";

				var theSubClass = theClass && this.subclasses[cs[2]] && cs[3] && ClassSubList[cs[3]] ? ClassSubList[cs[3]].subname : false;
				toLoad["r" + i + "SD"] = theClass ? SetPositiveElement(this.subclasses[cs[2]], theSubClass) : {};
				toLoad["r" + i + "SS"] = cs[3] ? this.getSrc(ClassSubList[cs[3]]) : "";
			};
			dialog.load(toLoad);
			dialog.enable(toUse);
			var toShow = {nLVL : toUse.nLVL};
			dialog.visible(toUse);
			dialog.setForeColorRed("nLVL");
			dialog.setForeColorRed("rngr");
		},
		lvlChange : function (dialog, e) {
			var cs = this.curSelec[e];
			cs[0] = dialog.store()["r" + e + "LV"];
			if (isNaN(cs[0]) || cs[0] < 0) {
				cs[0] = 0;
				var toLoad = {};
				toLoad["r" + e + "LV"] = "0";
				dialog.load(toLoad);
			};
			this.updateFull(dialog);
		},
		getSrc : function (obj) {
			if (!obj.source) return "";
			var theSrc = parseSource(obj.source);
			return theSrc ? SourceList[theSrc[0][0]].abbreviation : "";
		},
		textChange : function (dialog, e) {
			var cs = this.curSelec[e];
			var oldLvl = cs[0];
			//set the new things
			cs[1] = dialog.store()["r" + e + "TX"];
			var hasCl = ParseClass(cs[1]);
			cs[0] = !hasCl && !cs[1] ? 0 : cs[0] ? cs[0] : Math.max(1, this.currentLevel - this.finalLevel);
			cs[2] = hasCl ? hasCl[0] : "";
			cs[3] = hasCl ? hasCl[1] : "";
			//change the class and subclass drop-downs of the row
			var toLoad = {};
			if (oldLvl !== cs[0]) toLoad["r" + e + "LV"] = cs[0].toString();

			toLoad["r" + e + "SD"] = !hasCl ? {} : SetPositiveElement(this.subclasses[cs[2]], cs[3] ? ClassSubList[cs[3]].subname : false);
			toLoad["r" + e + "CS"] = cs[2] ? this.getSrc(ClassList[cs[2]]) : "";
			toLoad["r" + e + "SS"] = cs[3] ? this.getSrc(ClassSubList[cs[3]]) : "";
			toLoad = this.reloadClassDropdowns(toLoad);

			dialog.load(toLoad);
			this.updateFull(dialog);
		},
		classChange : function (dialog, e) {
			var result = GetPositiveElement(dialog.store()["r" + e + "CD"]);
			var cs = this.curSelec[e];
			var oldLvl = cs[0];
			//set the new things
			cs[0] = !result || result === " " ? 0 : cs[0] ? cs[0] : Math.max(1, this.currentLevel - this.finalLevel);
			cs[2] = result && result !== " " ? this.classesRef[result] : "";
			cs[3] = "";
			cs[1] = cs[2] ? ClassList[cs[2]].name : "";
			//change the text and subclass drop-down of the row
			var toLoad = {};
			if (oldLvl !== cs[0]) toLoad["r" + e + "LV"] = cs[0].toString();
			toLoad["r" + e + "CS"] = cs[2] ? this.getSrc(ClassList[cs[2]]) : "";
			toLoad["r" + e + "SD"] = cs[2] ? this.subclasses[cs[2]] : {};
			toLoad["r" + e + "SS"] = "";
			toLoad["r" + e + "TX"] = cs[1];
			toLoad = this.reloadClassDropdowns(toLoad);

			dialog.load(toLoad);
			this.updateFull(dialog);
		},
		subChange : function (dialog, e) {
			var result = GetPositiveElement(dialog.store()["r" + e + "SD"]);
			var cs = this.curSelec[e];
			//remember some of the old things
			var oldSubCl = cs[3];
			var oldSubName = !cs[3] ? "" : ClassSubList[cs[3]].fullname ? ClassSubList[cs[3]].fullname : " (" + ClassSubList[cs[3]].subname + ")";
			var oldSubNameSrch = RegExp("( ?\\(?)" + oldSubName.RegEscape() + "(\\)?)", "i");
			var oldNameMatch = (!cs[3] ? ClassList[cs[2]].name : ClassSubList[cs[3]].fullname ? oldSubName : ClassList[cs[2]].name + oldSubName).toLowerCase() == clean(cs[1]).toLowerCase();
			//set the new things
			cs[3] = result && result !== " " ? this.subclassesRef[cs[2]+"-"+result] : "";
			var newSubName = !cs[3] ? "" : ClassSubList[cs[3]].fullname ? ClassSubList[cs[3]].fullname : ClassSubList[cs[3]].subname;
			var newName = !cs[3] ? ClassList[cs[2]].name : ClassSubList[cs[3]].fullname ? newSubName : ClassList[cs[2]].name + " (" + newSubName + ")";
			cs[1] = !cs[3] ? ClassList[cs[2]].name : oldNameMatch ? newName : !oldSubCl ? cs[1] + " (" + newSubName + ")" : (oldSubNameSrch).test(cs[1]) ? cs[1].replace(oldSubNameSrch, "$1" + newSubName + "$2") : newName;
			//change the text of the row
			var toLoad = {};
			toLoad["r" + e + "TX"] = cs[1];
			toLoad["r" + e + "SS"] = cs[3] ? this.getSrc(ClassSubList[cs[3]]) : "";
			dialog.load(toLoad);
			this.updateFull(dialog);
		},
		getRemainingClassList : function(currentClass) {
			var self = this;
			var selectedClasses = this.curSelec.map(function(classInfo){return classInfo[2] || '';});
			var filteredClasses = Object.keys(this.classes)
				.filter(function(className){
					return className === currentClass || selectedClasses.indexOf(className.toLowerCase()) === -1;
				})
				.reduce(function(obj, key) {
					obj[key] = self.classes[key];
					return obj;
				}, {});
			return filteredClasses;
		},
		reloadClassDropdowns : function (toLoad) {
			for (var i = 0; i <= 9; i++) {
				var loopClass = this.curSelec[i];
				if (!loopClass || loopClass.length === 0) {
					this.curSelec[i] = [];
					toLoad["r" + i + "CD"] = this.getRemainingClassList();
					continue;
				}
				var theClass = loopClass[2] && ClassList[loopClass[2]] ? ClassList[loopClass[2]].name : false;
				toLoad["r" + i + "CD"] = theClass ? SetPositiveElement(this.getRemainingClassList(theClass), theClass) : this.getRemainingClassList();
			}
			return toLoad;
		},
		updateFull : function (dialog) {
			var oResult = dialog.store();
			var toLoad = {full : "", tLVL : 0};
			for (var i = 0; i < this.curSelec.length; i++) {
				var cs = this.curSelec[i];
				if (!cs || !Number(cs[0]) || !cs[1]) {
					if (i === 0) break;
					continue;
				};
				toLoad.tLVL += !isNaN(cs[0]) ? Number(cs[0]) : 0;
				if (i > 0 && toLoad.full === this.curSelec[0][1].replace(/\d/g, '')) toLoad.full += " " + this.curSelec[0][0];
				toLoad.full += (toLoad.full ? this.delimiter : "") + cs[1].replace(/\d/g, '');
				if (i > 0) toLoad.full += " " + cs[0];
			};
			this.finalText = toLoad.full;
			this.finalLevel = toLoad.tLVL;
			toLoad.tLVL = toLoad.tLVL.toString();
			toLoad.nLVL = "\u03B4-level: " + (this.currentLevel - this.finalLevel);
			var toUse = { nLVL : this.LVLchange ? this.currentLevel - this.finalLevel : false };
			dialog.load(toLoad);
			dialog.enable(toUse);
			dialog.visible(toUse);
		},
		commit : function (dialog) {},
		DeLi : function (dialog) {
			this.delimiter = dialog.store()["DeLi"];
			this.updateFull(dialog);
		},
		bAdR : function (dialog) { dialog.end("bAdR"); },
		bSrc : function (dialog) { MakeSourceMenu_SourceOptions(); },
		bCSS : function (dialog) { dialog.end("bCSS"); },
		r0LV : function (dialog) { this.lvlChange(dialog, 0); },
		r0TX : function (dialog) { this.textChange(dialog, 0); },
		r0CD : function (dialog) { this.classChange(dialog, 0); },
		r0SD : function (dialog) { this.subChange(dialog, 0); },
		r1LV : function (dialog) { this.lvlChange(dialog, 1); },
		r1TX : function (dialog) { this.textChange(dialog, 1); },
		r1CD : function (dialog) { this.classChange(dialog, 1); },
		r1SD : function (dialog) { this.subChange(dialog, 1); },
		r2LV : function (dialog) { this.lvlChange(dialog, 2); },
		r2TX : function (dialog) { this.textChange(dialog, 2); },
		r2CD : function (dialog) { this.classChange(dialog, 2); },
		r2SD : function (dialog) { this.subChange(dialog, 2); },
		r3LV : function (dialog) { this.lvlChange(dialog, 3); },
		r3TX : function (dialog) { this.textChange(dialog, 3); },
		r3CD : function (dialog) { this.classChange(dialog, 3); },
		r3SD : function (dialog) { this.subChange(dialog, 3); },
		r4LV : function (dialog) { this.lvlChange(dialog, 4); },
		r4TX : function (dialog) { this.textChange(dialog, 4); },
		r4CD : function (dialog) { this.classChange(dialog, 4); },
		r4SD : function (dialog) { this.subChange(dialog, 4); },
		r5LV : function (dialog) { this.lvlChange(dialog, 5); },
		r5TX : function (dialog) { this.textChange(dialog, 5); },
		r5CD : function (dialog) { this.classChange(dialog, 5); },
		r5SD : function (dialog) { this.subChange(dialog, 5); },
		r6LV : function (dialog) { this.lvlChange(dialog, 6); },
		r6TX : function (dialog) { this.textChange(dialog, 6); },
		r6CD : function (dialog) { this.classChange(dialog, 6); },
		r6SD : function (dialog) { this.subChange(dialog, 6); },
		r7LV : function (dialog) { this.lvlChange(dialog, 7); },
		r7TX : function (dialog) { this.textChange(dialog, 7); },
		r7CD : function (dialog) { this.classChange(dialog, 7); },
		r7SD : function (dialog) { this.subChange(dialog, 7); },
		r8LV : function (dialog) { this.lvlChange(dialog, 8); },
		r8TX : function (dialog) { this.textChange(dialog, 8); },
		r8CD : function (dialog) { this.classChange(dialog, 8); },
		r8SD : function (dialog) { this.subChange(dialog, 8); },
		r9LV : function (dialog) { this.lvlChange(dialog, 9); },
		r9TX : function (dialog) { this.textChange(dialog, 9); },
		r9CD : function (dialog) { this.classChange(dialog, 9); },
		r9SD : function (dialog) { this.subChange(dialog, 9); },
		description : {
			name : "CLASS SELECTION DIALOG",
			elements : [{
				type : "view",
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
						item_id : "titl",
						alignment : "align_fill",
						font : "title",
						bold : true,
						height : 23,
						char_width : 80,
						name : "Select the class(es) for " + theChar
					}]
				}, {
					type : "static_text",
					item_id : "lvlu",
					alignment : "align_fill",
					font : "dialog",
					bold : true,
					name : dialogTxt.lvlu,
					wrap_name : true,
					char_height : -1,
					char_width : 80
				}, {
					type : "static_text",
					item_id : "dsc1",
					alignment : "align_fill",
					font : "dialog",
					name : dialogTxt.dsc1,
					wrap_name : true,
					char_width : 80
				}, {
					type : "static_text",
					item_id : "dsc2",
					alignment : "align_fill",
					font : "palette",
					name : dialogTxt.dsc2,
					wrap_name : true,
					char_width : 80
				}, {
					type : "cluster", //the cluster that contains all the rows
					align_children : "align_center",
					char_width : 80,
					font : "heading",
					bold : true,
					name : theChar + "'s Classes",
					elements : [{
						item_id : "r0VW", // row 0 (with heading row)
						type : "view",
						align_children : "align_distribute",
						elements : [{
							type : "view",
							align_children : "align_left",
							elements : [{
								item_id : "heNR",
								type : "static_text",
								font : "heading",
								height : 20,
								char_width : 3,
								name : "#"
							}, {
								item_id : "r0NR",
								type : "static_text",
								height : 23,
								char_width : 3,
								font : "heading",
								name : "1*"
							}]
						}, {
							type : "view",
							align_children : "align_left",
							elements : [{
								item_id : "heLV",
								type : "static_text",
								font : "dialog",
								bold : true,
								height : 20,
								char_width : 3,
								name : "Level"
							}, {
								item_id : "r0LV",
								type : "edit_text",
								height : 23,
								char_width : 2,
								SpinEdit : true
							}]
						}, {
							type : "view",
							align_children : "align_left",
							elements : [{
								item_id : "heTX",
								type : "static_text",
								font : "dialog",
								bold : true,
								height : 20,
								char_width : 25,
								name : "Text per class, as it will appear on the sheet"
							}, {
								item_id : "r0TX",
								type : "edit_text",
								height : 23,
								char_width : 25,
								truncate : "truncate_end"
							}]
						}, {
							type : "view",
							align_children : "align_left",
							elements : [{
								item_id : "heCD",
								type : "static_text",
								font : "dialog",
								bold : true,
								height : 20,
								char_width : 8,
								name : " Class"
							}, {
								item_id : "r0CD",
								type : "popup",
								char_width : 8
							}]
						}, {
							type : "view",
							align_children : "align_left",
							elements : [{
								item_id : "heCS",
								type : "static_text",
								height : 20,
								char_width : 7,
								name : "Source"
							}, {
								item_id : "r0CS",
								type : "static_text",
								height : 23,
								char_width : 7
							}]
						}, {
							type : "view",
							align_children : "align_left",
							elements : [{
								item_id : "heSD",
								type : "static_text",
								font : "dialog",
								bold : true,
								height : 20,
								char_width : 15,
								name : " Subclass / Archetype"
							}, {
								item_id : "r0SD",
								type : "popup",
								char_width : 15
							}]
						}, {
							type : "view",
							align_children : "align_left",
							elements : [{
								item_id : "heSS",
								type : "static_text",
								height : 20,
								char_width : 6,
								name : "Source"
							}, {
								item_id : "r0SS",
								type : "static_text",
								height : 23,
								char_width : 6
							}]
						}]
					}, {
						item_id : "r1VW", // row 1
						type : "view",
						align_children : "align_distribute",
						elements : [{
							item_id : "r1NR",
							type : "static_text",
							char_width : 3,
							font : "heading",
							name : "2"
						}, {
							item_id : "r1LV",
							type : "edit_text",
							char_width : 2,
							SpinEdit : true
						}, {
							item_id : "r1TX",
							type : "edit_text",
							char_width : 25
						}, {
							item_id : "r1CD",
							type : "popup",
							char_width : 8
						}, {
							item_id : "r1CS",
							type : "static_text",
							char_width : 7
						}, {
							item_id : "r1SD",
							type : "popup",
							char_width : 15
						}, {
							item_id : "r1SS",
							type : "static_text",
							char_width : 6
						}]
					}, {
						item_id : "r2VW", // row 2
						type : "view",
						align_children : "align_distribute",
						elements : [{
							item_id : "r2NR",
							type : "static_text",
							char_width : 3,
							font : "heading",
							name : "3"
						}, {
							item_id : "r2LV",
							type : "edit_text",
							char_width : 2,
							SpinEdit : true
						}, {
							item_id : "r2TX",
							type : "edit_text",
							char_width : 25
						}, {
							item_id : "r2CD",
							type : "popup",
							char_width : 8
						}, {
							item_id : "r2CS",
							type : "static_text",
							char_width : 7
						}, {
							item_id : "r2SD",
							type : "popup",
							char_width : 15
						}, {
							item_id : "r2SS",
							type : "static_text",
							char_width : 6
						}]
					}, {
						item_id : "r3VW", // row 3
						type : "view",
						align_children : "align_distribute",
						elements : [{
							item_id : "r3NR",
							type : "static_text",
							char_width : 3,
							font : "heading",
							name : "4"
						}, {
							item_id : "r3LV",
							type : "edit_text",
							char_width : 2,
							SpinEdit : true
						}, {
							item_id : "r3TX",
							type : "edit_text",
							char_width : 25
						}, {
							item_id : "r3CD",
							type : "popup",
							char_width : 8
						}, {
							item_id : "r3CS",
							type : "static_text",
							char_width : 7
						}, {
							item_id : "r3SD",
							type : "popup",
							char_width : 15
						}, {
							item_id : "r3SS",
							type : "static_text",
							char_width : 6
						}]
					}, {
						item_id : "r4VW", // row 4
						type : "view",
						align_children : "align_distribute",
						elements : [{
							item_id : "r4NR",
							type : "static_text",
							char_width : 3,
							font : "heading",
							name : "5"
						}, {
							item_id : "r4LV",
							type : "edit_text",
							char_width : 2,
							SpinEdit : true
						}, {
							item_id : "r4TX",
							type : "edit_text",
							char_width : 25
						}, {
							item_id : "r4CD",
							type : "popup",
							char_width : 8
						}, {
							item_id : "r4CS",
							type : "static_text",
							char_width : 7
						}, {
							item_id : "r4SD",
							type : "popup",
							char_width : 15
						}, {
							item_id : "r4SS",
							type : "static_text",
							char_width : 6
						}]
					}, {
						item_id : "r5VW", // row 5
						type : "view",
						align_children : "align_distribute",
						elements : [{
							item_id : "r5NR",
							type : "static_text",
							char_width : 3,
							font : "heading",
							name : "6"
						}, {
							item_id : "r5LV",
							type : "edit_text",
							char_width : 2,
							SpinEdit : true
						}, {
							item_id : "r5TX",
							type : "edit_text",
							char_width : 25
						}, {
							item_id : "r5CD",
							type : "popup",
							char_width : 8
						}, {
							item_id : "r5CS",
							type : "static_text",
							char_width : 7
						}, {
							item_id : "r5SD",
							type : "popup",
							char_width : 15
						}, {
							item_id : "r5SS",
							type : "static_text",
							char_width : 6
						}]
					}, {
						item_id : "r6VW", // row 6
						type : "view",
						align_children : "align_distribute",
						elements : [{
							item_id : "r6NR",
							type : "static_text",
							char_width : 3,
							font : "heading",
							name : "7"
						}, {
							item_id : "r6LV",
							type : "edit_text",
							char_width : 2,
							SpinEdit : true
						}, {
							item_id : "r6TX",
							type : "edit_text",
							char_width : 25
						}, {
							item_id : "r6CD",
							type : "popup",
							char_width : 8
						}, {
							item_id : "r6CS",
							type : "static_text",
							char_width : 7
						}, {
							item_id : "r6SD",
							type : "popup",
							char_width : 15
						}, {
							item_id : "r6SS",
							type : "static_text",
							char_width : 6
						}]
					}, {
						item_id : "r2VW", // row 7
						type : "view",
						align_children : "align_distribute",
						elements : [{
							item_id : "r7NR",
							type : "static_text",
							char_width : 3,
							font : "heading",
							name : "8"
						}, {
							item_id : "r7LV",
							type : "edit_text",
							char_width : 2,
							SpinEdit : true
						}, {
							item_id : "r7TX",
							type : "edit_text",
							char_width : 25
						}, {
							item_id : "r7CD",
							type : "popup",
							char_width : 8
						}, {
							item_id : "r7CS",
							type : "static_text",
							char_width : 7
						}, {
							item_id : "r7SD",
							type : "popup",
							char_width : 15
						}, {
							item_id : "r7SS",
							type : "static_text",
							char_width : 6
						}]
					}, {
						item_id : "r2VW", // row 8
						type : "view",
						align_children : "align_distribute",
						elements : [{
							item_id : "r8NR",
							type : "static_text",
							char_width : 3,
							font : "heading",
							name : "9"
						}, {
							item_id : "r8LV",
							type : "edit_text",
							char_width : 2,
							SpinEdit : true
						}, {
							item_id : "r8TX",
							type : "edit_text",
							char_width : 25
						}, {
							item_id : "r8CD",
							type : "popup",
							char_width : 8
						}, {
							item_id : "r8CS",
							type : "static_text",
							char_width : 7
						}, {
							item_id : "r8SD",
							type : "popup",
							char_width : 15
						}, {
							item_id : "r8SS",
							type : "static_text",
							char_width : 6
						}]
					}, {
						item_id : "r2VW", // row 9
						type : "view",
						align_children : "align_distribute",
						elements : [{
							item_id : "r9NR",
							type : "static_text",
							char_width : 3,
							font : "heading",
							name : "10"
						}, {
							item_id : "r9LV",
							type : "edit_text",
							char_width : 2,
							SpinEdit : true
						}, {
							item_id : "r9TX",
							type : "edit_text",
							char_width : 25
						}, {
							item_id : "r9CD",
							type : "popup",
							char_width : 8
						}, {
							item_id : "r9CS",
							type : "static_text",
							char_width : 7
						}, {
							item_id : "r9SD",
							type : "popup",
							char_width : 15
						}, {
							item_id : "r9SS",
							type : "static_text",
							char_width : 6
						}]
					}, {
						type : "view", // asterisk and add extra row button
						align_children : "align_row",
						alignment : "align_fill",
						elements : [{
							item_id : "note",
							type : "static_text",
							font : "dialog",
							bold : true,
							name : dialogTxt.note,
							wrap_name : true,
							char_width : 69
						}, {
							item_id : "bAdR",
							type : "button",
							alignment : "align_right",
							name : "Add Empty Row"
						}]
					}]
				}, {
					type : "view", // totals and delimiter
					align_children : "align_row",
					alignment : "align_center",
					elements : [{
						type : "view",
						back_color: "dialogBackground",
						gradient_direction: "topToBottom",
						gradient_type: "normalToDark",
						item_id : "viJ1",
						alignment : "align_fill",
						elements : [{
							type : "cluster",
							char_width : 12,
							alignment : "align_left",
							align_children : "align_row",
							font : "heading",
							bold : true,
							name : "Total Level",
							elements : [{
								item_id : "tLVL",
								type : "static_text",
								font : "heading",
								bold : true,
								height : 25,
								char_width : 2
							}, {
								item_id : "nLVL",
								type : "static_text",
								font : "heading",
								bold : true,
								height : 25,
								char_width : 9
							},]
						}]
					}, {
						type : "view",
						back_color: "dialogBackground",
						gradient_direction: "topToBottom",
						gradient_type: "normalToDark",
						item_id : "viJ2",
						alignment : "align_fill",
						elements : [{
							type : "cluster",
							alignment : "align_right",
							font : "heading",
							bold : true,
							name : "Text that will be put in the Class field on the 1st page",
							elements : [{
								item_id : "full",
								type : "static_text",
								font : "dialog",
								bold : true,
								height : 25,
								char_width : 55,
								truncate : "truncate_end"
							}]
						}]
					}, {
						type : "cluster",
						char_width : 6,
						alignment : "align_left",
						align_children : "align_center",
						font : "heading",
						bold : true,
						name : "Delimiter",
						elements : [{
							item_id : "DeLi",
							type : "edit_text",
							height : 25,
							char_width : 4
						}]
					}]
				}, {
					item_id : "rngr", // UA ranger warning text
					type : "static_text",
					alignment : "align_fill",
					font : "palette",
					bold : true,
					name : dialogTxt.rngr,
					wrap_name : true,
					char_height : -1,
					char_width : 80
				}, {
					type : "view", // the bottom row of buttons
					align_children : "align_distribute",
					alignment : "align_fill",
					elements : [{
						type : "view", // buttons for viewing/changing sources
						align_children : "align_row",
						alignment : "align_left",
						elements : [{
							item_id : "bCSS",
							type : "button",
							font : "dialog",
							bold : true,
							name : "Change Available Classes && Archetypes"
						}, {
							item_id : "bSrc",
							type : "button",
							name : "List Source Abbreviations"
						}]
					}, {
						type : "ok",
						item_id : "bOKE",
						alignment : "align_right",
						ok_name : "Apply"
					}]
				}]
			}]
		}
	};
	setClassesToDialog();
	loadKnownClassesToDialog();
	setNumberOfLinesInDialog();

	var dia, txtFinal, lvlFinal;
	do {
		// don't open the dialog if this is triggered by the Character Level field being set to 0
		if (IsCharLvlVal === 0 && !dia) {
			var dia = "ok";
			txtFinal = "";
			lvlFinal = 0;
		} else {
			var dia = app.execDialog(ClassSelection_Dialog);
			txtFinal = ClassSelection_Dialog.finalText;
			lvlFinal = ClassSelection_Dialog.finalLevel;
		}
		if (dia === "bCSS") {
			var remUArgr = hasUAranger;
			resourceDecisionDialog();
			setClassesToDialog();
			for (var c = 0; c < ClassSelection_Dialog.curSelec.length; c++) {
				var sel = ClassSelection_Dialog.curSelec[c];
				if (!sel || !sel[2]) continue;
				if (remUArgr !== hasUAranger && (/ranger(ua)?/i).test(sel[2])) {
					sel[1] = "Ranger";
					sel[2] = hasUAranger ? "rangerua" : "ranger";
					sel[3] = "";
				} else if (testSource(sel[2], ClassList[sel[2]], "classExcl")) {
					sel[2] = "";
					sel[3] = "";
				} else if (sel[3] && testSource(sel[3], ClassSubList[sel[3]], "classExcl")) {
					sel[3] = "";
				}
			};
		} else if (dia === "bAdR") {
			setNumberOfLinesInDialog(true);
		} else if (dia === "ok" && ClassFld && (!txtFinal || !lvlFinal)) {
			var askSure = app.alert({
				nIcon : 2,
				cTitle : "Are You Sure? - Remove All Classes & Levels",
				cMsg : "You are about to remove all levels and classes from your character!\nAre you sure you want to continue?" + (IsCharLvlVal == 0 && !dia ? "" : "\n\nNote that you have to use the first line in the Class Selection dialog, for that is the class your character took at 1st level. If the first line if left empty or its level is set to zero, the sheet will assume you want to delete all the character's classes and levels.") + "\n\nClick 'No' to go back to the Class Selection dialog.",
				nType : 2
			});
			if (askSure !== 4) dia = "Go Again!";
		};
	} while (dia !== "ok" && dia !== "cancel");

	if (dia === "ok") { // apply the changes
		// update the delimiter
		Value("Delimiter", ClassSelection_Dialog.delimiter);
		// if the final class text doesn't have a number in it, add the total level at the end
		// this is done so that with only single class that only has its level changed, it is still applied
		if (!(/\d/).test(txtFinal)) txtFinal += " " + lvlFinal;
		// update the class field
		if (ClassFld !== txtFinal) { // text changed
			delete tDoc.getField("Class and Levels").remVal;
			Value("Class and Levels", txtFinal);
		} else { // text stayed the same, so just update the class level
			classes.totallevel = lvlFinal;
			ApplyClassLevel();
		}
	};
};

//and On Click function for the Class and Levels field
function ClickClasses() {
	if (!CurrentVars.manual.classes && app.viewerVersion >= 15 && (!event.target.value || event.modifier || event.shift)) {
		event.target.remVal = event.target.value;
		tDoc.getField("Player Name").setFocus();
		SelectClass();
	};
};

// After changing the level field, ask which class to add a level to, or start multiclassing
function AskMulticlassing(lvlAlreadyAdded) {
	if (app.viewerVersion >= 15) {
		SelectClass();
		return;
	};
	var Multiclassing_Dialog = {
		//variables to be set by the calling function
		Class1 : "",
		Class2 : "",
		Class3 : "",
		Class4 : "",
		ClassNmbrs : 0,
		All : true,
		LVLchange : 1,
		Selection : 0,

		//when starting the dialog
		initialize : function (dialog) {
			var theChar = What("PC Name") ? What("PC Name") : "your character";
			dialog.load({
				"txt0" : theChar.substring(0,1).toUpperCase() + theChar.substring(1) + "'s level has increased by " + parseFloat(this.LVLchange) + ". Select one of the classes of " + theChar + " that you want to add this to. Alternatively, you can fill out a new class to add the level to.",
				"txt1" : "Because you changed the character level by more than 1, you can choose to either have all levels be added to the selected class, or only 1. If you want only 1 level to be added to the class, uncheck the box below. That way you will be prompted for the next levels with this dialog again.",
				"tCl1" : this.Class1,
				"tCl2" : this.Class2,
				"tCl3" : this.Class3,
				"tCl4" : this.Class4,
				"cAll" : true,
				"rCl1" : parseFloat(this.ClassNmbrs) >= 1,
				"rCl2" : false,
				"rCl3" : false,
				"rCl4" : false,
				"rClN" : parseFloat(this.ClassNmbrs) <= 0
			});
			dialog.enable({
				"rClN" : true,
				"rCl1" : parseFloat(this.ClassNmbrs) >= 1,
				"rCl2" : parseFloat(this.ClassNmbrs) >= 2,
				"rCl3" : parseFloat(this.ClassNmbrs) >= 3,
				"rCl4" : parseFloat(this.ClassNmbrs) >= 4,
				"cAll" : true
			});
			dialog.visible({
				"vCl1" : parseFloat(this.ClassNmbrs) >= 1,
				"vCl2" : parseFloat(this.ClassNmbrs) >= 2,
				"vCl3" : parseFloat(this.ClassNmbrs) >= 3,
				"vCl4" : parseFloat(this.ClassNmbrs) >= 4,
				"vAll" : Math.abs(this.LVLchange) > 1
			})
		},

		//when pressing the ok button
		commit : function (dialog) {
			var oResult = dialog.store();
			if (oResult["rCl1"]) {
				this.Selection = 1;
			} else if (oResult["rCl2"]) {
				this.Selection = 2;
			} else if (oResult["rCl3"]) {
				this.Selection = 3;
			} else if (oResult["rCl4"]) {
				this.Selection = 4;
			} else if (oResult["rClN"]) {
				this.Selection = oResult["tClN"];
			}
			this.All = oResult["cAll"];
		},

		//do this whenever a custom text is entered so that the right bullet point is selected
		tClN : function (dialog) {
			dialog.load({
				"rClN" : true
			});
		},

		description : {
			name : "LEVEL UP CLASS DIALOG",
			elements : [{
				type : "view",
				elements : [{
					type : "view",
					elements : [{
						type : "static_text",
						item_id : "head",
						alignment : "align_fill",
						font : "heading",
						bold : true,
						height : 21,
						char_width : 43,
						name : "Choose Which Class to Level Up"
					}, {
						type : "static_text",
						item_id : "txt0",
						alignment : "align_fill",
						font : "dialog",
						char_height : 5,
						char_width : 40
					}, {
						type : "view",
						align_children : "align_left",
						char_width : 40,
						elements : [{
							type : "view",
							item_id : "vClN",
							align_children : "align_row",
							elements : [{
								type : "radio",
								item_id : "rClN",
								group_id : "Class",
								name : "New class:",
								char_width : 10
							}, {
								type : "edit_text",
								item_id : "tClN",
								alignment : "align_fill",
								char_width : 30,
								height : 20
							}, ]
						}, {
							type : "view",
							item_id : "vCl1",
							align_children : "align_row",
							elements : [{
								type : "radio",
								item_id : "rCl1",
								group_id : "Class",
								name : "Class 1:",
								char_width : 10
							}, {
								type : "static_text",
								item_id : "tCl1",
								char_width : 30,
								height : 20,
								alignment : "align_fill",
								font : "dialog",
								bold : true
							}, ]
						}, {
							type : "view",
							item_id : "vCl2",
							align_children : "align_row",
							elements : [{
								type : "radio",
								item_id : "rCl2",
								group_id : "Class",
								name : "Class 2:",
								char_width : 10
							}, {
								type : "static_text",
								item_id : "tCl2",
								char_width : 30,
								height : 20,
								alignment : "align_fill",
								font : "dialog",
								bold : true
							}, ]
						}, {
							type : "view",
							item_id : "vCl3",
							align_children : "align_row",
							elements : [{
								type : "radio",
								item_id : "rCl3",
								group_id : "Class",
								name : "Class 3:",
								char_width : 10
							}, {
								type : "static_text",
								item_id : "tCl3",
								char_width : 30,
								height : 20,
								alignment : "align_fill",
								font : "dialog",
								bold : true
							}, ]
						}, {
							type : "view",
							item_id : "vCl4",
							align_children : "align_row",
							elements : [{
								type : "radio",
								item_id : "rCl4",
								group_id : "Class",
								name : "Class 4:",
								char_width : 10
							}, {
								type : "static_text",
								item_id : "tCl4",
								char_width : 30,
								height : 20,
								alignment : "align_fill",
								font : "dialog",
								bold : true
							}, ]
						}, ]
					}, {
						type : "view",
						item_id : "vAll",
						align_children : "align_left",
						char_width : 40,
						elements : [{
							type : "static_text",
							item_id : "txt1",
							alignment : "align_fill",
							font : "dialog",
							char_height : 6,
							char_width : 38
						}, {
							type : "view",
							align_children : "align_left",
							elements : [{
								type : "check_box",
								item_id : "cAll",
								name : "Apply the entire level change to the selected class."
							}, ]
						}, ]
					}, ]
				}, {
					type : "ok"
				}, ]
			}, ]
		}
	};

	var CharLVL = IsCharLvlVal !== false ? IsCharLvlVal : Number(What("Character Level"));
	var toAdd = CharLVL - Number(classes.totallevel) - (lvlAlreadyAdded ? lvlAlreadyAdded : 0);

	if (!IsNotReset || !IsNotImport || !toAdd) return;

	Multiclassing_Dialog.ClassNmbrs = classes.parsed.length;
	Multiclassing_Dialog.Class1 = classes.parsed[0] ? classes.parsed[0][0]: "";
	Multiclassing_Dialog.Class2 = classes.parsed[1] ? classes.parsed[1][0]: "";
	Multiclassing_Dialog.Class3 = classes.parsed[2] ? classes.parsed[2][0]: "";
	Multiclassing_Dialog.Class4 = classes.parsed[3] ? classes.parsed[3][0]: "";
	Multiclassing_Dialog.LVLchange = toAdd;

	//call the dialog
	app.execDialog(Multiclassing_Dialog);

	var dResult = Multiclassing_Dialog.Selection;
	var AddAll = Multiclassing_Dialog.All;
	//do something if the result is adding a new class
	if (dResult !== "" && isNaN(dResult)) {
		classes.parsed[classes.parsed.length] = [
			dResult,
			AddAll ? toAdd : sign(toAdd)
		];
	} else if (dResult !== "") { //do something if one of the existing classes was chosen, and do nothing if an empty string was chosen
		classes.parsed[dResult - 1][1] += AddAll ? toAdd : sign(toAdd);
	}

	if (!AddAll || dResult === "") {
		// not everything was applied yet, so lets ask what to do for the next level
		AskMulticlassing(dResult === "" ? 0 : lvlAlreadyAdded? lvlAlreadyAdded + 1 : 1);
		return;
	}

	// Create the new string for the class field
	// always add the total class level so that even if only single class that only has its level changed, it is still applied
	var newClassText = classes.parsed.map( function (n) { return n.join(" ") }).join(", ")
	// update the class field
	if (What("Class and Levels") !== newClassText) { // text changed
		delete tDoc.getField("Class and Levels").remVal;
		Value("Class and Levels", newClassText);
	} else { // text stayed the same, so just update the class level
		classes.totallevel = CharLVL;
		ApplyClassLevel();
	}
};

//show a dialog when the subclass is not set but the level is high enough to need a subclass
function PleaseSubclass(aClass, classString) {
	if (!IsNotImport || What("SubClass Remember").indexOf(aClass) !== -1) return;

	var aclass = ClassList[aClass];
	var aclassObj = {};
	var aclassArray = [];
	for (var i = 0; i < aclass.subclasses[1].length; i++) {
		var aSub = aclass.subclasses[1][i];
		if (!ClassSubList[aSub]) {
			console.println("The subclass '" + aSub + "' of the '" + aClass + "' class doesn't exist in the ClassSubList. It has been ignored for now, but it might cause errors with other things in the sheet. So please make sure to remedy this before proceeding!");
			console.show();
			continue;
		};
		if (testSource(aSub, ClassSubList[aSub], "classExcl") || aclassArray.indexOf(ClassSubList[aSub].subname) !== -1) continue;
		aclassObj[ClassSubList[aSub].subname] = aSub;
		aclassArray.push(ClassSubList[aSub].subname);
	};
	if (aclassArray.length === 0) return false; //no subclasses got through the test
	aclassArray.sort();

	var testSubClass = aclassObj[aclassArray[Math.round(aclassArray.length / 2) - 1]];

	var SubName1 = ClassSubList[testSubClass].subname;
	var SubName2 = ClassSubList[testSubClass].fullname ? ClassSubList[testSubClass].fullname : ClassSubList[testSubClass].subname;

	classString = classString ? classString : classes.known[aClass].string ? classes.known[aClass].string : aclass.name;
	var theString = "The " + aclass.name + " class you entered into the Class field on the first page has a high enough level to add a subclass. However, no " + aclass.subclasses[0] + " has been detected."
	var clusterString = "Select the " + aclass.subclasses[0];
	var moreString = "Alternatively, you can add a subclass manually by typing it into the Class field on the first page. Just put your chosen " + aclass.subclasses[0] + " next to, or in place of, \"" + classString + "\".\n\nFor example: \"" + classString + " (" + SubName1 + ")\", or just \"" + SubName2 + "\".";

	var SubclassArrayLeft = [];
	var SubclassArrayRight = [];
	var isAsterisk = false;
	for (var i = 0; i < aclassArray.length; i++) {
		var theSub = ClassSubList[aclassObj[aclassArray[i]]];

		if (!isAsterisk && theSub.fullname) isAsterisk = true;

		if (theSub.fullname && theSub.fullname !== theSub.subname) {
			var theName = theSub.subname + " (" + theSub.fullname + "*)";
		} else {
			var theName = theSub.subname + (theSub.fullname ? "*" : "");
		}

		var temp = {
			type : "radio",
			group_id : "Subs",
			item_id : "Su" + ("0" + i).slice(-2),
			name : theName
		}
		if ((i + 1) <= Math.ceil((aclassArray.length) / 2)) {
			SubclassArrayLeft.push(temp);
		} else {
			SubclassArrayRight.push(temp);
		}
	}

	var asteriskString = isAsterisk ? "* This name will replace \"" + classString + "\" in the Class field instead of amending to it." : "";

	var SubclassSelect_Dialog = {
		result : -1,

		//when starting the dialog
		initialize : function (dialog) {
			dialog.load({
				img1 : allIcons.classes
			});
		},

		//when pressing the ok button
		commit : function (dialog) {
			var oResult = dialog.store();
			for (var i = 0; i < aclassArray.length; i++) {
				if (oResult["Su" + ("0" + i).slice(-2)]) {
					this.result = i;
					i = aclassArray.length;
				}
			}
		},

		//when pressing the other button
		other : function (dialog) {
			AddString("SubClass Remember", aClass, false);
			dialog.end("other");
		},

		description : {
			name : "SUBCLASS SELECTION DIALOG",
			elements : [{
				type : "view",
				elements : [{
					type : "view",
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
							item_id : "titl",
							alignment : "align_fill",
							font : "title",
							bold : true,
							height : 23,
							width : 470,
							name : aclass.name + " has no detectable " + aclass.subclasses[0]
						}]
					}, {
						type : "static_text",
						item_id : "tex0",
						alignment : "align_fill",
						font : "dialog",
						name : theString,
						wrap_name : true,
						width : 500
					}, {
						type : "cluster",
						item_id : "clu1",
						name : clusterString,
						font : "dialog",
						bold : true,
						elements : [{
							type : "view",
							align_children : "align_distribute",
							alignment : "align_center",
							elements : [{
									type : "view",
									elements : SubclassArrayLeft
								}, {
									type : "gap",
									width : 5
								}, {
									type : "view",
									elements : SubclassArrayRight
								}]
						}].concat(!asteriskString ? [] : [{
							type : "static_text",
							item_id : "tex1",
							alignment : "align_fill",
							font : "dialog",
							name : asteriskString,
							wrap_name : true,
							width : 480
						}])
					}, {
						type : "static_text",
						item_id : "tex2",
						alignment : "align_fill",
						font : "dialog",
						name : moreString,
						wrap_name : true,
						width : 500
					}]
				}, {
					type : "ok_cancel_other",
					ok_name : "Add " + aclass.subclasses[0],
					other_name : "I get it, don't show me this again"
				}]
			}]
		}
	};

	var theDialog = app.execDialog(SubclassSelect_Dialog);
	if (theDialog === "ok" && SubclassSelect_Dialog.result > -1) {
		var selection = aclassObj[aclassArray[SubclassSelect_Dialog.result]];
		var newName = ClassSubList[selection].fullname ? ClassSubList[selection].fullname : aclass.name + " (" + ClassSubList[selection].subname + ")";
		return [selection, newName];
	};
	return false;
};
