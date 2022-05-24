//see if the JS file is installed
try {
	var MPMBImportFunctionsInstalled = MPMBImportFunctions_isInstalled;
} catch (MPMBerrors) {
	var MPMBImportFunctionsInstalled = false;
}

function ImportExport_Button() {
	if (minVer) {
		ImportScriptOptions();
		return;
	};
	var theMenu = getMenu("importexport");

	if (theMenu !== undefined && theMenu[0] !== "nothing") {
		switch (theMenu[1]) {
			case "script" :
				ImportScriptOptions(theMenu);
				break;
			case "import" :
				Import(theMenu[2]);
				break;
			case "export" :
				MakeXFDFExport(theMenu[2]);
				break;
			case "direct" :
				StartDirectImport();
				break;
		};
	};
};

//a function to open the sheet and call a timeout
function StartDirectImport() {
	//test if the version of Acrobat being used is good (DC or later)
	if (app.viewerVersion < 15) {
		app.alert({
			cMsg: "This features requires Adobe Acrobat DC or newer (Reader, Standard, or Pro).\n\nYou can get Adobe Acrobat Reader DC for free at get.adobe.com/reader/",
			cTitle: "Old version of Adobe Acrobat"
		});
		return;
	} else if (MPMBImportFunctionsInstalled) {
		DirectImport();
	} else if (event.target === undefined && !MPMBImportFunctionsInstalled) {
		DirectImport(true);
	} else if (event.target !== undefined && !MPMBImportFunctionsInstalled) {
		AddFolderJavaScript(false);
	}
}

// call this to add the folder level javascript if it is missing
function AddFolderJavaScript(justConsole) {
	var isType = app.viewerType === "Exchange-Pro" ? "Pro" : (app.viewerType === "Exchange" ? "Standard" : "Reader");
	var isContin = app.viewerVersion.substring(6, 8) != 30;
	var vYear = 20 + app.viewerVersion.substring(0, 2);

	var textLoc = "The 'JavaScripts' folder for Adobe Acrobat " + isType + " DC on " + (isWindows ? "Windows 10 x64" : "Mac OS") + " is:";
	var locWin = "C:\\Program Files (x86)\\Adobe\\Acrobat " + (isType === "Reader" ? "Reader " : "") + (isContin ? "DC" : vYear) + "\\" + (isType === "Reader" ? "Reader" : "Acrobat") + "\\Javascripts\\";
	var locMac = "/Applications/Adobe Acrobat " + (isType === "Reader" ? "Reader " : "") + (isContin ? "DC" : vYear) + ".app/Contents/Resources/JavaScripts/";

	var Text0 = justConsole ? "In order to import user-defined icons, you will have to manually add a JavaScript file to your Adobe Acrobat installation. This is necessary, because of Adobe Acrobat's security protocol. You will have to do this only once to get this function working." : "In order to use the 'Direct Import' functionality, you will need to do something to appease Adobe Acrobat's security settings. You have two options:\nOption 1 is that you add a JavaScript file to your installation. After you've done this, you will never see this dialog again.\nOption 2 is that you run the code from console, but you will have to do this every time if you want to use this function.";
	var Text1 = "Do the following steps:\n   1)  Use the button below to save the file somewhere (don't change the filename).\n   2)  Rename the file so that its extension is \".js\" (can't be done while saving).\n   3)  Move the file to the right location mentioned below (can't be saved there directly).\n   4)  Restart Adobe Acrobat and try the 'Direct Import' function again.";
	var Text2 = "The directory where you have to put this file depends on your version of Adobe Acrobat and your operating system. The path shown here is an estimated guess for your installation. It is possible that this folder doesn't exist yet, or that it is hidden.\n" + toUni("Note that you can't save the file directly to this location!");
	var Text3 = "Open the console (a.k.a. \"JavaScript Debugger\") and run the code that is printed there. Running the code is done by selecting the line it is on and pressing " + (isWindows ? "Ctrl+Enter" : "Command+Enter") + " (or the numpad Enter).";
	var LocJS = isWindows ? locWin : locMac;

	var AddJS_dialog = {
		initialize : function(dialog) {
			dialog.load({
				locJ : LocJS
			});
		},
		bADD : function(dialog) {
			tDoc.exportDataObject({ cName: "MPMB-IF Remove '.txt' from the end.js.txt", nLaunch: 0});
		},
		bCON : function(dialog) {
			dialog.end("cons");
		},
		description : {
			name : "ADD FILE TO ACROBAT INSTALLATION DIALOG",
			first_tab : "bADD",
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
						name : justConsole ? "User-defined Icons: requires JavaScript file to be added" : "Add a JavaScript file to your Acrobat installation or use the Console",
						height : 21,
						width : 530
					}, {
						type : "static_text",
						item_id : "txt0",
						alignment : "align_fill",
						font : "dialog",
						wrap_name : true,
						width : 530,
						name : Text0
					}, {
						type : "view",
						item_id : "viJ1",
						back_color: "windowBackground",
						alignment : "align_fill",
						width : 530,
						elements : [{
							type : "cluster",
							item_id : "cluJ",
							alignment : "align_fill",
							font : "heading",
							name : justConsole ? "Add the JavaScript File" : "Option 1: Add a JavaScript File",
							height : 21,
							width : 530,
							elements : [{
								type : "static_text",
								item_id : "txt1",
								alignment : "align_fill",
								font : "dialog",
								bold : true,
								wrap_name : true,
								width : 500,
								name : Text1
							}, {
								type : "button",
								item_id : "bADD",
								name : "Click here to save the JavaScript file",
								font : "heading",
								bold : true,
								alignment : "align_center"
							}, {
								type : "view",
								item_id : "viJ2",
								back_color: "windowDialog",
								alignment : "align_fill",
								width : 500,
								elements : [{
									type : "cluster",
									item_id : "txtJ",
									alignment : "align_fill",
									font : "dialog",
									bold : true,
									width : 500,
									name : textLoc,
									elements : [{
										type : "edit_text",
										item_id : "locJ",
										alignment : "align_fill",
										font : "dialog",
										width : 470,
										readonly : true
									}, {
										type : "static_text",
										item_id : "txt2",
										alignment : "align_fill",
										font : "dialog",
										wrap_name : true,
										width : 470,
										name : Text2
									}, ]
								}, ]
							}, ]
						}, ]
					}, {
						type : "gap",
						height : 5
					}, {
						type : "view",
						item_id : "vieC",
						back_color: "windowBackground",
						alignment : "align_fill",
						width : 530,
						elements : [{
							type : "cluster",
							item_id : "cluC",
							alignment : "align_fill",
							font : "heading",
							name : "Option 2: Run the Code in the Console",
							height : 21,
							width : 530,
							elements : [{
								type : "static_text",
								item_id : "txt3",
								alignment : "align_fill",
								wrap_name : true,
								width : 500,
								name : Text3
							}, {
								type : "button",
								item_id : "bCON",
								name : "Click here to Open the Console",
								font : "heading",
								bold : true,
								alignment : "align_center"
							}, ]
						}, ]
					}, ]
				}, {
					type : justConsole ? "ok_cancel" : "ok",
					ok_name : "Done",
					cancel_name : "Continue without importing icons"
				}, ]
			}, ]
		}
	};

	if (justConsole) delete AddJS_dialog.description.elements[0].elements[0].elements[4];

	var theDialog = app.execDialog(AddJS_dialog);

	if (theDialog === "cons") {
		console.clear();
		console.println("Select the line below that says \"StartDirectImport();\" and press " + (isWindows ? "Ctrl+Enter" : "Command+Enter") + "\n\nStartDirectImport();");
		console.show();
	}

	return theDialog === "ok";
}

//the dialog for the DirectImport function that ask for the path to a file to import from
function DirectImport_Dialogue() {
	var buggedVer = !isWindows && app.viewerVersion > 20 && app.viewerVersion < 20.00920065;
	var isType = app.viewerType === "Exchange-Pro" ? "Pro" : (app.viewerType === "Exchange" ? "Standard" : "Reader");
	var Text0 = "This 'Direct Import' function opens another MPMB's Character Record Sheet and goes through every field and layout setting in it to make this sheet similar to the other. This can take a long time and will not copy everything literally as this sheet will run through its automation to benefit from any updates to its code compared to the other sheet.";
	var TextExpl = [
		"To do this, give the full or relative path to a local file you want to import from.",
		"You can use the 'Browse' button to get the full path.",
		"Acrobat crashes if you try this in MacOS because of a bug in this version of Adobe Acrobat " + isType + " DC, please update your installation to the latest version.",
		(buggedVer ? "[1] Place" : "Alternatively,\n[1] place") + " the sheet you want to import from in the same folder as this sheet,\n[2] give the file name of the sheet you want to import from below (including file extension '.pdf'), and\n[3] make sure the box to use a relative path is checked."
	];
	var Text01 = (buggedVer ? [TextExpl[0], TextExpl[3], "\n" + TextExpl[1], TextExpl[2]] : [TextExpl[0], TextExpl[1], "\n" + TextExpl[3]]).join("\n");
	var Text1 = "If you continue with importing, the current sheet will first be reset without notice!";
	var TextIcons = (app.viewerType === "Reader" ? "Because of limitations in Adobe Acrobat Reader, this function is not available." : "'User-defined icons\' refers to those images that have been set for the symbol, portrait, companion(s) appearance, etc. that have been added from another file.") + "\n\nIcons that have been selected from the sheet built-in options will be imported regardless (faction symbols, Adventure League season icons, class icons).";
	var DirectImport_dialog = {
		fileLoc : "",
		relPath : buggedVer,
		importIcons : false,
		initialize : function(dialog) {
			var isReader = app.viewerType === "Reader";
			dialog.load({
				"img1" : allIcons.import,
				"fLoc" : this.fileLoc,
				"icCl" : "Import user-defined icons as well?" + (isReader ? " (Requires Acrobat Pro or Standard)" : ""),
				"icNo" : true,
				"fRel" : this.relPath
			});
			dialog.enable({
				"icNo" : !isReader,
				"icYe" : !isReader,
				"bFND" : !buggedVer
			});
			dialog.setForeColorRed("txt1");
		},
		bFND : function(dialog) {
			tDoc.getField("SelectFile").browseForFileToSubmit();
			this.fileLoc = What("SelectFile");
			dialog.load({
				"fLoc" : this.fileLoc,
				"fRel" : false
			});
		},
		commit : function(dialog) {
			var oResult = dialog.store();
			this.fileLoc = oResult["fLoc"];
			this.relPath = oResult["fRel"];
			this.importIcons = oResult["icYe"];
		},
		description : {
			name : "IMPORT FROM PDF DIALOG",
			first_tab : buggedVer ? "fLoc" : "bFND",
			elements : [{
				type : "view",
				align_children : "align_left",
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
							item_id : "head",
							alignment : "align_fill",
							font : "heading",
							bold : true,
							height : 21,
							width : 470,
							name : "Import all data, settings, and layout from a MPMB's Character Sheet"
						}]
					}, {
						type : "static_text",
						item_id : "txt0",
						alignment : "align_fill",
						font : "dialog",
						wrap_name : true,
						width : 500,
						name : Text0
					}, {
						type : "static_text",
						item_id : "txtx",
						alignment : "align_fill",
						font : "dialog",
						wrap_name : true,
						width : 500,
						name : Text01
					}, {
						type : "cluster",
						item_id : "fTxt",
						alignment : "align_fill",
						font : "heading",
						bold : true,
						width : 500,
						name : "Full or relative path to a MPMB's Character Record Sheet",
						elements : [{
							type : "view",
							align_children : "align_row",
							elements : [{
								type : "edit_text",
								item_id : "fLoc",
								alignment : "align_fill",
								font : "dialog",
								width : 345,
								next_tab : "bFND"
							}, {
								type : "button",
								item_id : "bFND",
								name : "Browse" + (buggedVer ? " (disabled, see above)" : ""),
								font : "dialog",
								bold : true,
								alignment : "align_center",
								next_tab : "fRel"
							}]
						}, {
							type : "check_box",
							item_id : "fRel",
							alignment : "align_left",
							name : "Relative path (resolve above path relative to the current folder, see below)."
						}, {
							type : "static_text",
							item_id : "cLoc",
							font : "palette",
							width : 470 + (buggedVer ? 30 : 0),
							wrap_name : true,
							name : 'Current folder:\n' + tDoc.path.replace(tDoc.documentFileName, '')
						}]
					}, {
						type : "cluster",
						item_id : "icCl",
						alignment : "align_fill",
						font : "dialog",
						bold : app.viewerType !== "Reader",
						width : 500,
						elements : [{
							type : "view",
							align_children :  "align_left",
							elements : [{
								type : "radio",
								item_id : "icNo",
								name : "No. I will set them again manually (recommended).",
								group_id : "icon",
								height : 20
							}, {
								type : "radio",
								item_id : "icYe",
								name : "Yes. Import the user-defined icons as well (experimental).",
								group_id : "icon",
								height : 20
							}]
						}, {
							type : "static_text",
							item_id : "icTx",
							alignment : "align_fill",
							font : "palette",
							width : 470,
							wrap_name : true,
							name : TextIcons
						}, {
							type : "gap",
							height : 2
						}]
					}, {
						type : "static_text",
						item_id : "txt1",
						alignment : "align_fill",
						font : "dialog",
						bold : true,
						wrap_name : true,
						width : 500,
						name : Text1
					}]
				}, {
					type : "ok_cancel",
					item_id : "okca",
					ok_name : "Import (takes a while)",
					next_tab : "bFND"
				}]
			}]
		}
	};

	var theDialog = app.execDialog(DirectImport_dialog);

	var goII = false;
	if (DirectImport_dialog.importIcons) {
		if (MPMBImportFunctionsInstalled) {
			goII = true;
		} else {
			if (AddFolderJavaScript(true)) theDialog = "cancel"; //if the addJS dialog is cancelled (selected to go on without the user icons), it returns false
		}
	}

	return theDialog === "ok" ? [DirectImport_dialog.fileLoc, DirectImport_dialog.relPath, goII] : false;
};

//a function to import information directly from another MPMB's Character Record Sheets
function DirectImport(consoleTrigger) {
	//ask the user for the file to import from
	var importFromPath = DirectImport_Dialogue();
	if (!importFromPath) return; //no reason to go on with this

	// initiate a progress bar, so there is at least something
	var thermoTxt = thermoM("Importing directly from PDF...");

	var closeAlert = false, IIerror;
	try {
		if (consoleTrigger && !MPMBImportFunctionsInstalled) {
			global.docTo = this;
			global.docFrom = importFromPath[1] ? app.openDoc({cPath: importFromPath[0], oDoc: this}) : app.openDoc(importFromPath[0]);
			global.docTo.bringToFront();
		} else {
			MPMBOpenFile(this, importFromPath[0], importFromPath[1]);
		}
		closeAlert = global.docFrom && (/^(?=.*morepurplemorebetter)(?=.*character)(?=.*sheet).*$/i).test(global.docFrom.info.title) && global.docFrom.info.SheetVersion ? false : ["File is not one of MPMB's Character Record Sheets", "The opened document is not recognized as being one of MPMB's Character Record Sheets.\nNote that even though it might look like one of MPMB's Character Record Sheets, no form-fillable fields and back-end code was detected. Possibly the document was flattened (printed to PDF) or opened with Preview for Mac, subsequently destroying its automations. Unfortunately nothing can be imported from such a file.\n\nIt will now be closed and no changes will be made to either documents."];
	} catch (errorCode) {
		closeAlert = ["File not found", "Invalid file location or file type \"" + (importFromPath[1] ? tDoc.path.replace(tDoc.documentFileName, "") : "") + importFromPath[0] + "\".\n\nPlease try again and don't forget that the path must include the file extension (.pdf)."];
	};

	if (!closeAlert && (!global.docFrom || global.docFrom.toString() !== "[object Doc]")) {
		closeAlert = ["An error occurred", "An unknown error occurred. Importing failed.\n\nPlease make sure the file you want to import is not currently open in any application."];
	}

	//if opening the doc failed, or it is not one of MPMB's Character Record Sheets (according)
  if (closeAlert) {
	app.alert({
		cTitle: closeAlert[0],
		cMsg: closeAlert[1]
	});
  } else if (global.docFrom && global.docTo) { //we are good to go and import stuff!
	try {
		// Update the progress bar and stop the calculations
		thermoTxt = thermoM("Importing from '" + global.docFrom.documentFileName + "'...");
		thermoM(0.25);
		calcStop(true);

		// First we need to reset the prototypes to the current sheet because Acrobat will use the ones from the latest sheet that was opened
		global.docTo.setPrototypes();
		var FromVersionSem = getSemVers(global.docFrom.info.SheetVersion, global.docFrom.info.SheetVersionType, global.docFrom.info.SheetVersionBuild);
		var FromVersion = semVersToNmbr(FromVersionSem);
		var ToVersion = global.docTo.sheetVersion;
		var fromBefore13 = FromVersion < semVersToNmbr("13.0.0-beta14");
		if (FromVersion > ToVersion || (FromVersion >= semVersToNmbr("13.0.0-beta1") && fromBefore13)) {
			// If importing from a newer version or from a v13.0.0-beta1-beta13
			var versTypeTxt = FromVersion > ToVersion ? ["this sheet is", "newer", "than the one you are importing"] : ["the other sheet is an", "unsupported beta", "that can't be imported to any other MPMB's Character Record Sheet"];
			app.alert({
				cTitle : "Unable to import from " + versTypeTxt[1] + " version",
				cMsg : "The MPMB's Character Record Sheet you are trying to import from is version '" + FromVersionSem + "', while the sheet you are trying to import to is version '" + global.docTo.semVers + "'. This operation is not allowed, because " + versTypeTxt.join(" ") + ".\n\nThe importing process will now be cancelled."
			});
			closeAlert = true;
			throw "user stop";
		} else if (FromVersion < semVersToNmbr(12.999)) { // give a warning about importing from a version that had all materials included automatically
			var askUserIsSure = {
				cTitle : "Continue with import?",
				cMsg : "You are about to import from a sheet with version " + FromVersionSem + ". Unlike the sheet you are importing to (which is v" + global.docTo.semVers + "), v" + FromVersionSem + " of the sheet came with all published source materials included, such as the Player's Handbook, Dungeon Master's Guide, etc. From sheet v12.999 onwards, it only includes the SRD material by default.\n\nIf the same resources weren't added to the current sheet as are used in the old sheet, you will see that some things don't fill out automatically, such as subclass features, feats, racial traits, and background features.\n\nPlease make sure that you have the necessary resources available in the current sheet! See the \"Add Extra Materials\" bookmark for more information on what is already added and how to add the required resources." + (patreonVersion ? "\n\nIf you got this sheet from MPMB's Patreon, you are probably fine to proceed!" : "") + "\n\nAre you sure you want to continue importing?",
				nIcon : 2, //Status
				nType : 2 //Yes, No
			};
			if (app.alert(askUserIsSure) !== 4) {
				closeAlert = true;
				throw "user stop";
			};
		};

		IsNotImport = "no progress bar";
		ignorePrereqs = true;
		ResetAll(true, true); //first reset the current sheet to its initial state, but without the extra templates generated
		Value("Opening Remember", "Yes");
		IsNotImport = false;

		// Make sure no pop-up comes up with welcome text
		if (global.docFrom.getField("Opening Remember")) global.docFrom.Value("Opening Remember", "Yes");

		var fromSheetTypePF = global.docFrom.info.SheetType ? (/printer friendly/i).test(global.docFrom.info.SheetType) : false;
		var fromSheetTypeLR = global.docFrom.info.SheetType ? (/letter/i).test(global.docFrom.info.SheetType) : (global.docFrom.info.Title ? (/letter/i).test(global.docFrom.info.Title) : false);
		var bothPF = typePF && fromSheetTypePF;
		var bothCF = !typePF && !fromSheetTypePF;
		var sameType = bothPF || (bothCF && fromSheetTypeLR === typeLR);

		// Make sure to remove the flattened state from the sheet to import from
		if (fromBefore13) {
			if (global.docFrom.getField("MakeMobileReady Remember") && global.docFrom.getField("MakeMobileReady Remember").value !== "") global.docFrom.MakeMobileReady(false);
		} else {
			global.docFrom.MakeMobileReady(false);
		}

		//copy any custom script and run it
		var filesScriptFrom = global.docFrom.getField("User_Imported_Files.Stringified") && global.docFrom.getField("User_Imported_Files.Stringified").value !== "({})" ? eval(global.docFrom.getField("User_Imported_Files.Stringified").value) : false;
		var filesScriptTo = eval(global.docTo.getField("User_Imported_Files.Stringified").value);
		var newFilesScriptFrom = false;

		if (filesScriptFrom) {
			// add the old to the new, preferring the new if both have the same entries
			var filesScriptToNms = [], equalScrNmRx = /\d+\/\d+\/\d+ - |[._\- ]min(ified)?\b/ig;
			for (var toScr in filesScriptTo) filesScriptToNms.push(toScr.replace(equalScrNmRx, ""));
			var hasAllPubUA = filesScriptToNms.indexOf("all_WotC_pub+UA.js") !== -1, rxAllPubUA = /all_WotC_(published|unearthed_arcana)/i
			for (var fromScr in filesScriptFrom) {
				if (filesScriptToNms.indexOf(fromScr.replace(equalScrNmRx, "")) !== -1 || (hasAllPubUA && rxAllPubUA.test(fromScr))) continue;
				filesScriptTo[fromScr] = filesScriptFrom[fromScr];
				newFilesScriptFrom = true;
			};
			if (newFilesScriptFrom) {
				CurrentScriptFiles = filesScriptTo;
				SetStringifieds("scriptfiles");
			}
		}
		if (ImportField("User Script") || newFilesScriptFrom) {
			InitiateLists();
			RunUserScript(true);
			amendPsionicsToSpellsList();
		};
		// Set the excl./incl. sources
		if (ImportField("CurrentSources.Stringified")) {
			CurrentSources = eval(global.docTo.getField("CurrentSources.Stringified").value);
			if (!CurrentSources.globalKnown) CurrentSources.globalKnown = []; // Doesn't exist in old versions
			cleanExclSources();
			var garbage = resourceExclusionSetting([]);
			SetStringifieds("sources");
			UpdateDropdown("resources");
		};
		//now update the dropdowns and spell menus with these new settings (without unicode if that was set)
		ImportField("UseUnicode");
		setUnicodeUse(What("UseUnicode") != "", true); // also sets the dropdowns
		setSpellVariables(true);

		//reset conditions
		if (!fromSheetTypePF && global.docFrom.ConditionSet) {
			var conResets = [];
			var doCondi = false;
			for (var c = 1; c <= 14; c++) {
				if (c <= 6) {
					conResets.push("Extra.Exhaustion Level " + c);
					if (!doCondi && global.docFrom.getField("Extra.Exhaustion Level " + c).value !== global.docFrom.getField("Extra.Exhaustion Level " + c).defaultValue) doCondi = true;
				}
				conResets.push("Extra.Condition " + c);
				if (!doCondi && global.docFrom.getField("Extra.Condition " + c).value !== global.docFrom.getField("Extra.Condition " + c).defaultValue) doCondi = true;
			};
			if (doCondi) {
				global.docFrom.resetForm(conResets);
				global.docFrom.ConditionSet();
			}
		}

		//set the colours
		if (bothCF) {
			if (ImportField("Color.Theme")) ApplyColorScheme();
			if (ImportField("Color.DragonHeads")) ApplyDragonColorScheme();
			if (ImportField("Color.HPDragon")) ApplyHPDragonColorScheme();
			if (ImportField("Color.DC")) ApplyDCColorScheme();
		};

		//set the highlighting
		if (ImportField("Highlighting")) {
			global.docTo.getField("Highlighting").fillColor = global.docFrom.getField("Highlighting").fillColor;
			app.runtimeHighlight = eval_ish(What("Highlighting"));
			app.runtimeHighlightColor = global.docTo.getField("Highlighting").fillColor;
		};

		//set some remember fields that might impact new page generation
		if (ImportField("Unit System") && typePF) Value("Display.Weighttxt.LbKg", What("Unit System") === "imperial" ? "LB" : "KG");
		ImportField("Decimal Separator"); ImportField("DateFormat_Remember");
		ImportField("BlueText.Players Make All Rolls", {notSubmitName : true, notTooltip : true});

		//set the text options
		if (fromBefore13) {
			if (global.docFrom.getField("WhiteoutRemember")) ToggleWhiteout(eval_ish(global.docFrom.What("WhiteoutRemember")));
			var FontSize_Remember_field = global.docFrom.getField("FontSize Remember") ? global.docFrom.getField("FontSize Remember").value : undefined;
			if ((bothPF || bothCF || FontSize_Remember_field === 0) && FontSize_Remember_field != undefined) ToggleTextSize(FontSize_Remember_field);
			LayerVisibilityOptions(false, global.docFrom.getField("Extra.Layers Remember") ? global.docFrom.getField("Extra.Layers Remember").value : undefined);
			ToggleBlueText(global.docFrom.getField("Extra.Layers Remember") ? global.docFrom.getField("Extra.Layers Remember").value === "Yes" : false);
		} else {
			ToggleWhiteout(!!global.docFrom.CurrentVars.whiteout);
			ToggleTextSize(global.docFrom.CurrentVars.fontsize);
			LayerVisibilityOptions(false, global.docFrom.CurrentVars.vislayers);
			ToggleBlueText(!!global.docFrom.CurrentVars.bluetxt);
		}
		SetStringifieds("vars");

		if (bothPF && ImportField("BoxesLinesRemember")) ShowCalcBoxesLines(What("BoxesLinesRemember"));
		if ((bothPF || bothCF) && global.docFrom.getField("Player Name").textFont !== global.docTo.getField("Player Name").textFont) ChangeFont(global.docFrom.getField("Player Name").textFont);

		//set the league remember toggle
		if (ImportField("League Remember")) {
			if (FromVersion < semVersToNmbr(12.99)) {
				if (What("League Remember") === "On") {
					ToggleAdventureLeague({
						dci : true,
						factionrank : true,
						renown : true,
						actions : true,
						asterisks : true
					});
				} else {
					global.docTo.resetForm(["League Remember"]);
				};
			} else {
				try {
					var theAdvL = eval(What("League Remember"));
					ToggleAdventureLeague({
						dci : theAdvL.dci,
						factionrank : theAdvL.factionrank,
						renown : theAdvL.renown,
						actions : theAdvL.actions,
						asterisks : theAdvL.asterisks
					});
				} catch (e) {
					global.docTo.resetForm(["League Remember"]);
				};
			};
		};

		//set the D&D logos visiblity
		if (global.docFrom.getField("Image.DnDLogo.long") && global.docFrom.getField("Image.DnDLogo.long").display !== global.docTo.getField("Image.DnDLogo.long").display) global.docTo.getField("Image.DnDLogo").display = global.docFrom.getField("Image.DnDLogo.long").display;

		//set the spell slots visiblity
		if (ImportField("SpellSlotsRemember")) {
			SetSpellSlotsVisibility();
			if (What("SpellSlotsRemember") === "[false,false]") {
				SpellPointsLimFea("Add");
				Show("Image.SpellPoints");
				Show("SpellSlots.Checkboxes.SpellPoints");
			}
		}

		//set the order of the skills
		if (global.docFrom.getField("Text.SkillsNames")) MakeSkillsMenu_SkillsOptions(["go", global.docFrom.Who("Text.SkillsNames")]);

		//set the visibility of Honor/Sanity
		if (ImportField("HoSRememberState")) ShowHonorSanity();

		//set the location columns in the equipment sections
		if (ImportField("Gear Location Remember")) {
			var defState = global.docTo.getField("Gear Location Remember").defaultValue.split(",");
			var newState = What("Gear Location Remember").split(",");
			if (defState[0] !== newState[0]) HideInvLocationColumn("Adventuring Gear ", newState[0] == true);
			if (defState[1] !== newState[1]) HideInvLocationColumn("Extra.Gear ", newState[1] == true);
		}
		//set the magic item row in the equipment sections
		if (ImportField("Adventuring Gear Remember")) ShowAttunedMagicalItems();
		//set the carrying capacity type
		ImportField("Weight Carrying Capacity", {doVisiblity: true}, "Weight Carrying Capacity.Field"); ImportField("Weight Heavily Encumbered", {doVisiblity: true});
		//set the weight remember fields
		if (fromBefore13) {
			global.docTo.CurrentVars.weight = [];
			var weightTypes = {
				cArm : "Weight Remember Armor",
				cShi : "Weight Remember Shield",
				cWea : "Weight Remember Weapons",
				cAmL : "Weight Remember Ammo Left",
				cAmR : "Weight Remember Ammo Right",
				cCoi : "Weight Remember Coins",
				cP2L : "Weight Remember Page2 Left",
				cP2M : "Weight Remember Page2 Middle",
				cP2R : "Weight Remember Page2 Right",
				cP3L : "Weight Remember Page3 Left",
				cP3R : "Weight Remember Page3 Right",
				cMaI : "Weight Remember Magic Items"
			}
			for (var weightType in weightTypes) {
				var aWeightFld = global.docFrom.getField(weightTypes[weightType]);
				if (aWeightFld && aWeightFld.value !== "No") global.docTo.CurrentVars.weight.push(weightType);
			}
			global.docTo.SetStringifieds("vars");
		} else {
			if (global.docFrom.CurrentVars.weight) {
				global.docTo.CurrentVars.weight = global.docFrom.CurrentVars.weight;
				global.docTo.SetStringifieds("vars");
			}
		}

		//get the page layout of the sheet and copy it
		var pagesLayout = {};
		var onlySpawnsFrom = FromVersion >= semVersToNmbr(12.996);
		if (global.docFrom.BookMarkList) { //if no bookmarklist exists where we are importing from, don't do anything
			for (var templ in TemplateDep) {
				if (templ === "PRsheet" && (!fromSheetTypePF || !typePF)) continue;
				var onlySpawnsFromT = onlySpawnsFrom || templ.substring(0, 2) === "SS";
				//see if the template exists in the docFrom
				var dFfldT = onlySpawnsFrom ? global.docFrom.isTemplVis(templ) : global.docFrom.BookMarkList[templ] ? global.docFrom.getField(global.docFrom.BookMarkList[templ]) : false;
				if (dFfldT) pagesLayout[templ] = onlySpawnsFrom ? true : dFfldT.page !== -1;
				var dFfldTE = global.docFrom.getField("Template.extras." + templ); //see if any extra versions have been added
				if (dFfldTE) {
					pagesLayout[templ + "Extras"] = dFfldTE.value.split(",").length - (onlySpawnsFromT || !pagesLayout[templ] ? 1 : 0);
					if (pagesLayout[templ + "Extras"]) {
						pagesLayout[templ + "ExtraNmFrom"] = dFfldTE.value.split(",").splice(onlySpawnsFromT || !pagesLayout[templ] ? 1 : 0);
					};
				};
			};
			//now replicate that layout
			for (var templ in TemplateDep) {
				if (pagesLayout[templ] !== undefined && global.docTo.getField(BookMarkList[templ])) {
					var templAte = pagesLayout[templ];
					var tempExtr = pagesLayout[templ + "Extras"];
					var templToVis = global.docTo.isTemplVis(templ);
					if (templToVis && !templAte && !tempExtr) { // remove any visible pages that are not visible in the docFrom
						DoTemplate(templ, "Remove", false, true);
					} else if (templAte && !templToVis && TemplatesWithExtras.indexOf(templ) === -1) { //add the non-duplicatable templates
						DoTemplate(templ);
					} else if (tempExtr) { // add templates with dependencies
						if (sameType || (templ !== "SSmore" && (templ !== "SSfront" || !pagesLayout.SSmoreExtras))) {
							for (var tE = 0; tE < tempExtr; tE++) DoTemplate(templ, "Add");
						};
						pagesLayout[templ + "ExtraNmTo"] = What("Template.extras." + templ).split(",").splice(1);
					};
				};
			};
		};

	//do the fields for the main automations
		//add the weapons (before the rest so weapons added by any new automation are still added)
		for (var i = 1; i <= FieldNumbers.attacks; i++) {
			if (ImportField("Attack." + i + ".Weapon Selection", {notTooltip: true})) ImportField("Attack." + i + ".Description", {notTooltip: true});
		}
		var weaNrFrom = global.docFrom.FieldNumbers && global.docFrom.FieldNumbers.attacks ? global.docFrom.FieldNumbers.attacks : 5;
		if (weaNrFrom > FieldNumbers.attacks) {
			for (var i = FieldNumbers.attacks + 1; i <= weaNrFrom; i++) {
				var weaFldFrom = global.docFrom.getField("Attack." + i + ".Weapon Selection");
				if (weaFldFrom && weaFldFrom.value) AddWeapon(weaFldFrom.value);
			}
		}
		var weaBTflds = global.docTo.getField("BlueText.Attack").getArray();
		for (var i = 0; i < weaBTflds.length; i++) {
			if (weaBTflds[i].name.indexOf("Modifiers Title") === -1) ImportField(weaBTflds[i].name, {notTooltip: true, notSubmitName: true});
		}
		//the ammo
		ImportField("AmmoLeftDisplay.Amount", {notTooltip: true}); ImportField("AmmoLeftDisplay.Name", {notTooltip: true}); ImportField("AmmoLeftDisplay.Weight", {notTooltip: true});
		ImportField("AmmoRightDisplay.Amount", {notTooltip: true}); ImportField("AmmoRightDisplay.Name", {notTooltip: true}); ImportField("AmmoRightDisplay.Weight", {notTooltip: true});

		//set the more proficiencies overflow field before the automation
		ImportField("MoreProficiencies");

		//set the feature choices
		if (ImportField("CurrentFeatureChoices.Stringified")) CurrentFeatureChoices = eval(What("CurrentFeatureChoices.Stringified"));

		//set the level and xp
		ImportField("Character Level", {notTooltip: true}); ImportField("Total Experience", {notTooltip: true}); ImportField("Add Experience", {notTooltip: true});
		ProfBonus("Proficiency Bonus"); //make sure the proficiency bonus is updated

		//set the race
		if (!fromBefore13 && global.docFrom.CurrentVars.oldRace) {
			global.docTo.CurrentVars.oldRace = global.docFrom.CurrentVars.oldRace;
			global.docTo.CurrentVars.oldRaceAmendRemember = global.docFrom.CurrentVars.oldRaceAmendRemember;
			global.docTo.SetStringifieds("vars");
		}
		ImportField("Race", {notTooltip: true, notSubmitName: true});
		if (ImportField("Race Remember")) ApplyRace(What("Race Remember"));

		//set the values of the ability score dialog (after race, so scores manually set for race are not undone)
		var abiScoreFlds = ["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"];
		if (fromBefore13) {
			initiateCurrentStats();
			var equalAbiCol = [0, 1, 4, 7, 5, 2];
			for (var a = 0; a < abiScoreFlds.length; a++) {
				var abiR = global.docFrom.getField(abiScoreFlds[a] + " Remember");
				if (!abiR) continue;
				var abiScAr = abiR.value.split(",");
				for (var i = 0; i < abiScAr.length; i++) {
					var abiSc = Number(abiScAr[i]);
					if (isNaN(abiSc) || !abiScAr[i] || (i == 0 && abiScAr == 8)) continue;
					CurrentStats.cols[equalAbiCol[i]].scores[a] = abiSc;
				}
			}
			SetStringifieds("stats");
		} else if (ImportField("CurrentStats.Stringified")) {
			CurrentStats = eval(What("CurrentStats.Stringified"));
		}

		//set the background
		ImportField("Background", {notTooltip: true, notSubmitName: true}); ImportField("Background Extra", {notTooltip: true});

		//set the class and class features
		if (fromBefore13) ImportExtraChoices();
		ImportField("Class and Levels", {notTooltip: true});

		//set the feats
		var feaNrFrom = global.docFrom.FieldNumbers && global.docFrom.FieldNumbers.feats ? global.docFrom.FieldNumbers.feats : FieldNumbers.feats;
		for (var i = 1; i <= feaNrFrom; i++) {
			if (i <= FieldNumbers.feats) {
				var impFeat = ImportField("Feat Name " + i, {notTooltip: true});
				if (impFeat && !CurrentFeats.known[i - 1]) {
					ImportField("Feat Note " + i);
					ImportField("Feat Description " + i);
				}
			}
			if (i > FieldNumbers.feats) {
				var feaFldFrom = global.docFrom.getField("Feat Name " + i);
				if (!feaFldFrom || !feaFldFrom.value) continue;
				for (var feaNr = 1; feaNr <= FieldNumbers.feats; feaNr++) {
					if (What("Feat Name " + feaNr) === "") {
						Value("Feat Name " + feaNr, feaFldFrom.value);
						if (!CurrentFeats.known[feaNr - 1]) {
							Value("Feat Note " + feaNr, global.docFrom.What("Feat Note " + i));
							Value("Feat Description " + feaNr, global.docFrom.What("Feat Description " + i));
						}
						break;
					}
				}
			}
		};

		// a function to import the magic items
		var importMagicItems = function () {
			var nmbrFlds = global.docFrom.FieldNumbers && global.docFrom.FieldNumbers.magicitems ? global.docFrom.FieldNumbers.magicitems : FieldNumbers.magicitems;
			for (var i = 1; i <= nmbrFlds; i++) {
				var fromFld = global.docFrom.getField("Extra.Magic Item " + i);
				if (!fromFld || !fromFld.value) continue;
				AddMagicItem(
					fromFld.value,
					global.docFrom.getField("Extra.Magic Item Attuned " + i).isBoxChecked(0),
					global.docFrom.What("Extra.Magic Item Description " + i),
					global.docFrom.What("Extra.Magic Item Weight " + i),
					false,
					fromBefore13 ? undefined : global.docFrom.How("Extra.Magic Item Attuned " + i) == ""
				);
			}
		}

		// if from version >= 13, do magic items before setting the rest of the fields
		if (!fromBefore13) importMagicItems();

		//set the ability scores and associated fields
		for (var a = 0; a < abiScoreFlds.length; a++) {
			var abiS = abiScoreFlds[a];
			ImportField(abiS);
			Value(abiS + " Mod", Math.round((What(abiS) - 10.5) * 0.5));
			ImportField(abiS + " ST Prof", {notTooltip: true});
			ImportField(abiS + " ST Bonus", {notTooltip: true, notSubmitName: true});
			ImportField(abiS + " ST Adv", {doReadOnly: true});
			ImportField(abiS + " ST Dis", {doReadOnly: true});
		};
		ImportField("All ST Bonus", {notTooltip: true, notSubmitName: true});
		if (FromVersion >= semVersToNmbr("13.0.9") && global.docFrom.CurrentVars.AbilitySaveDcBonus) {
			global.docTo.CurrentVars.AbilitySaveDcBonus = global.docFrom.CurrentVars.AbilitySaveDcBonus;
			global.docTo.SetStringifieds("vars");
		}

		//set the ability save DC
		ImportField("Spell DC 1 Mod", {notTooltip: true}); ImportField("Spell DC 1 Bonus", {notTooltip: true, notSubmitName: true});
		ImportField("Spell DC 2 Bonus", {notTooltip: true, notSubmitName: true});
		if (ImportField("Spell DC 2 Mod", {notTooltip: true, doVisiblity: true})); Toggle2ndAbilityDC(global.docTo.getField("Spell DC 2 Mod").display === display.visible ? "show" : "hide");

		//set the prof bonus and inspiration
		ImportField("Proficiency Bonus Dice", {notTooltip: true}); ImportField("Proficiency Bonus Modifier", {notTooltip: true, notSubmitName: true}); ImportField("Inspiration", {notTooltip: true});

		//set the skills and associated fields
		var CurrentProfsFrom = global.docFrom.getField("CurrentProfs.Stringified") ? eval(global.docFrom.getField("CurrentProfs.Stringified").value) : false;
		var isAltSkillOrder = Who('Text.SkillsNames') === 'alphabeta' ? false : true;
		ImportField("Jack of All Trades", {notTooltip: true}); ImportField("Remarkable Athlete", {notTooltip: true}); ImportField("All Skills Bonus", {notTooltip: true, notSubmitName: true}); ImportField("Passive Perception Bonus", {notTooltip: true, notSubmitName: true}); ImportField("Too Text", {notTooltip: true, notSubmitName: true});
		for (var i = 0; i < SkillsList.abbreviations.length; i++) {
			var aSkill = SkillsList.abbreviations[i];
			ImportField(aSkill + " Bonus", {notTooltip: true, notSubmitName: true}); ImportField(aSkill + " Prof", {notTooltip: true}); ImportField(aSkill + " Exp", {notTooltip: true}); ImportField(aSkill + " Adv", {doReadOnly: true}); ImportField(aSkill + " Dis", {doReadOnly: true});
			if (!(/^(Init|Too)$/).test(aSkill) && fromBefore13 && global.docTo.getField(aSkill + " Prof").isBoxChecked(0)) {
				// set the "manualClick" entries in the CurrentProfs
				var useSkill = isAltSkillOrder ? SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(aSkill)] : aSkill;
				if (!CurrentProfs.skill[useSkill] || !CurrentProfs.skill[useSkill].length) {
					CurrentProfs.skill[useSkill] = ["manualClick"];
				}
				if (global.docTo.getField(aSkill + " Exp").isBoxChecked(0)) {
					if (!CurrentProfs.skill[useSkill + "_Exp"]) {
						CurrentProfs.skill[useSkill + "_Exp"] = { manualClick : "full" };
					} else {
						for (var aSkillExp in CurrentProfs.skill[useSkill + "_Exp"]) {
							var theSkillExp = CurrentProfs.skill[useSkill + "_Exp"][aSkillExp];
							if ((/only|full/).test(theSkillExp)) break;
						}
						// only 'increment', so add a manualClick to the non-expertise proficiency
						CurrentProfs.skill[useSkill].push("manualClick");
					}
				}
			}
		};
		// copy the "manualClick" entries from the imported CurrentProfs.skill
		if (!fromBefore13 && CurrentProfsFrom && CurrentProfsFrom.skill) {
			for (var anEntry in CurrentProfsFrom.skill) {
				if (anEntry == "descrTxt") continue;
				if (anEntry.indexOf("_Exp") !== -1) {
					if (CurrentProfsFrom.skill[anEntry]["manualClick"]) {
						if (!CurrentProfs.skill[anEntry]) CurrentProfs.skill[anEntry] = {};
						CurrentProfs.skill[anEntry]["manualClick"] = "full";
					}
				} else if (CurrentProfsFrom.skill[anEntry].indexOf("manualClick") !== -1) {
					if (!CurrentProfs.skill[anEntry]) CurrentProfs.skill[anEntry] = [];
					if (CurrentProfs.skill[anEntry].indexOf("manualClick") == -1) CurrentProfs.skill[anEntry].push("manualClick");
				}
			}
		}

		//set the description fields
		ImportField("PC Name"); ImportField("Player Name"); ImportField("Size Category", {notTooltip: true}); ImportField("Height", {notTooltip: true}); ImportField("Weight", {notTooltip: true}); ImportField("Sex"); ImportField("Hair colour", {notTooltip: true}); ImportField("Eyes colour", {notTooltip: true}); ImportField("Skin colour", {notTooltip: true}); ImportField("Age", {notTooltip: true}); ImportField("Alignment", {notTooltip: true}); ImportField("Faith/Deity", {notTooltip: true}); ImportField("Speed", {notTooltip: true}); ImportField("Speed encumbered", {notTooltip: true});

		//add the content from the saving throw and vision field, but not if importing from an older version
		if (FromVersion >= semVersToNmbr(12.998)) {
			//First make sure the "Immune to" and "Adv. on saves vs." match with the import
			var importSaveTxt = function(type) {
				var preTxt = type === "adv_vs" ? "Adv. on saves vs." : type === "immune" ? "Immune to" : false;
				var fld = "Saving Throw advantages / disadvantages";
				var svFld = global.docFrom.getField(fld).value;
				if (!preTxt || !svFld) return;
				var fromArr = [], toArr = [];
				if (CurrentProfsFrom.savetxt[type]) {
					for (var testAtt in CurrentProfsFrom.savetxt[type]) {
						if (type === "immune" || !CurrentProfsFrom.savetxt.immune[testAtt]) {
							fromArr.push(CurrentProfsFrom.savetxt[type][testAtt].name);
						};
					};
				};
				if (CurrentProfs.savetxt[type]) {
					for (var testAtt in CurrentProfs.savetxt[type]) {
						if (type === "immune" || !CurrentProfs.savetxt.immune[testAtt]) {
							toArr.push(CurrentProfs.savetxt[type][testAtt].name);
						};
					};
				};
				var newArr = [].concat(toArr);
				var svMatch = svFld.match(RegExp(preTxt.RegEscape() + ".*?(; |$)", "i"));
				if (!svMatch) return;
				var svOpt = svMatch[0].replace(/; ?$/, "").replace(RegExp(preTxt.RegEscape() + " *?", "i"), "").split(/, and | and |, |; /);
				for (var i = 0; i < svOpt.length; i++) {
					var addObj = svOpt[i].replace(/^and |^ +/i, "");
					if (addObj && !(RegExp("\\b" + addObj + "\\b", "i")).test(toArr)) newArr.push(addObj);
				};
				newArr.sort();
				var toStr = formatLineList(preTxt, toArr);
				var newStr = formatLineList(preTxt, newArr);
				if (toStr !== newStr) {
					ReplaceString(fld, newStr, "; ", toStr, false);
					global.docFrom.getField(fld).value = global.docFrom.getField(fld).value.replace(svMatch[0], "");
				};
			};
			importSaveTxt("adv_vs");
			importSaveTxt("immune");
			//Then get the entries in these fields and add them one by one
			var addConsolidatedEntries = function(fName) {
				var fFld = global.docFrom.getField(fName);
				if (!fFld) return;
				var fArrF = fFld.value.split(/; ?/);
				var fArrT = global.docTo.getField(fName).value.split(/; ?/);
				for (var fF = 0; fF < fArrT.length; fF++) fArrT[fF] = clean(fArrT[fF].toLowerCase(), " ");
				for (var fF = 0; fF < fArrF.length; fF++) {
					var fVal = clean(fArrF[fF], " ");
					if (fArrT.indexOf(fVal.toLowerCase()) === -1) AddString(fName, fVal, "; ");
				};
			};
			addConsolidatedEntries("Vision"); addConsolidatedEntries("Saving Throw advantages / disadvantages");
		};

		//add limited features that are not yet defined (all those without a tooltip)
		for (var i = 1; i < FieldNumbers.limfea; i++) {
			var limFeaFrom = global.docFrom.getField("Limited Feature " + i);
			if (!limFeaFrom || !limFeaFrom.value || limFeaFrom.userName) continue;
			var lFFusa = global.docFrom.getField("Limited Feature Max Usages " + i).value;
			var lFFrec = global.docFrom.getField("Limited Feature Recovery " + i).value;
			AddFeature(limFeaFrom.value, lFFusa, "", lFFrec);
		};

		//add the spell boxes
		for (var i = 1; i <= 9; i++) ImportField("SpellSlots.CheckboxesSet.lvl" + i, {notTooltip: true});

		//set the armour and weapon proficiencies
		ImportField("Proficiency Armor Other Description", {notTooltip: true});
		if (fromBefore13) {
			// manually set proficiency checkboxes
			var profFldsArray = [
				"Proficiency Armor Light",
				"Proficiency Armor Medium",
				"Proficiency Armor Heavy",
				"Proficiency Shields",
				"Proficiency Weapon Simple",
				"Proficiency Weapon Martial"
			];
			for (var i = 0; i < profFldsArray.length; i++) {
				var profFromFld = global.docFrom.getField(profFldsArray[i]);
				var profToFld = global.docTo.getField(profFldsArray[i]);
				if (!profFromFld || !profToFld) continue;
				var profFromChecked = profFromFld.isBoxChecked(0) === 1;
				var profToChecked = profToFld.isBoxChecked(0) === 1;
				if (profFromChecked !== profToChecked) {
					profToFld.checkThisBox(0, profFromChecked);
					setCheckboxProfsManual(profFldsArray[i]);
				}
			}
			// manual weapon additions
			var profsManualFromFnd = global.docFrom.CurrentWeapons.proficiencies["Manually added"];
			var profsManualFromXtr = global.docFrom.CurrentWeapons.manualproficiencies;
			var profsManualFrom = profsManualFromXtr ? profsManualFromXtr : [];
			if (profsManualFromFnd) {
				for (var i = 0; i < profsManualFromFnd.length; i++) {
					var profManualWea = WeaponsList[profsManualFromFnd[i]];
					if (profManualWea) profsManualFrom.push(profManualWea.name);
				}
			}
			if (profsManualFrom.length) {
				Value("Proficiency Weapon Other Description", [What("Proficiency Weapon Other Description")].concat(profsManualFrom).join(", "));
				setOtherWeaponProfsManual();
			}
		} else {
			// manually set proficiency checkboxes
			var profFromVar = global.docFrom.CurrentProfs;
			var profFldsArray = [
				['armour', 'light'],
				['armour', 'medium'],
				['armour', 'heavy'],
				['armour', 'shields'],
				['weapon', 'simple'],
				['weapon', 'martial']
			];
			for (var i = 0; i < profFldsArray.length; i++) {
				var profSort = profFldsArray[i][0];
				var profType = profFldsArray[i][1];
				var normalState = CurrentProfs[profSort][profType] ? true : false;
				if (profFromVar[profSort][profType+"_manual" + (normalState ? "off" : "on")]) {
					CurrentProfs[profSort][profType+"_manual" + (normalState ? "off" : "on")] = true;
					SetProf(profSort, undefined, profType, undefined, true);
				}
			};
			// manual weapon additions
			if (profFromVar.weapon.otherWea && profFromVar.weapon.otherWea["Manually added"]) {
				CurrentProfs.weapon.otherWea["Manually added"] = profFromVar.weapon.otherWea["Manually added"];
				SetProf("weapon", undefined, "other");
			}
		}

		//a function to add the 'new' languages, tools, resistances, actions
		var addNotDefined = function(typeFlds, iterations) {
			var fromOldVersion = FromVersion < semVersToNmbr(12.998);
			var functionAdd = function(typeAdd, input, replaceThis) {
				switch (typeAdd) {
					case "Language " :
					case "Tool " :
						AddLangTool(typeAdd, input, false, false, replaceThis, fromOldVersion);
						break;
					case "Resistance Damage Type " :
						AddResistance(input, false, replaceThis, fromOldVersion);
						break;
					case "Action " :
					case "Bonus Action " :
					case "Reaction " :
						AddAction(typeAdd, input, false, replaceThis, fromOldVersion);
						break;
				};
			};
			for (var i = 1; i <= iterations; i++) {
				var fromFld = global.docFrom.getField(typeFlds + i);
				if (!fromFld || !fromFld.value || fromFld.value === fromFld.defaultValue) continue;
				if (!fromOldVersion) {
					if (fromFld.value !== fromFld.submitName) {
						functionAdd(typeFlds, fromFld.value, fromFld.submitName);
					};
				} else { // can't use the submitName as it wasn't used before v12.998
					var fromFldUNit = fromFld.userName && (/.*?\"(.*?)\".*/).test(fromFld.userName) ? fromFld.userName.replace(/.*?\"(.*?)\".*/, "$1") : (fromFld.userName ? fromFld.userName.replace(/.*?resistance to (.*?) was gained from.*/, "$1") : "");
					if (!fromFld.userName || fromFldUNit.toLowerCase() !== fromFld.value.toLowerCase()) {
						functionAdd(typeFlds, fromFld.value, fromFldUNit);
					};
				};
			};
		};

		//languages and tools
		var nmbrFlds = global.docFrom.FieldNumbers && global.docFrom.FieldNumbers.langstools ? global.docFrom.FieldNumbers.langstools : FieldNumbers.langstools;
		addNotDefined("Language ", nmbrFlds); addNotDefined("Tool ", nmbrFlds);
		nmbrFlds = global.docFrom.FieldNumbers.actions ? global.docFrom.FieldNumbers.actions : FieldNumbers.actions;
		addNotDefined("Reaction ", nmbrFlds); addNotDefined("Bonus Action ", nmbrFlds);
		nmbrFlds = global.docFrom.FieldNumbers && global.docFrom.FieldNumbers.trueactions ? global.docFrom.FieldNumbers.trueactions : FieldNumbers.trueactions;
		addNotDefined("Action ", nmbrFlds);
		addNotDefined("Resistance Damage Type ", 6);

		//armor
		ImportField("AC Armor Description", {notTooltip: true}); ImportField("AC Armor Bonus", {notTooltip: true}); ImportField("AC Armor Weight", {notTooltip: true}); ImportField("AC during Rest");
		ImportField("AC Shield Bonus Description", {notTooltip: true}); ImportField("AC Shield Bonus", {notTooltip: true}); ImportField("AC Shield Weight", {notTooltip: true});
		ImportField("Medium Armor", {notTooltip: true}); ImportField("Heavy Armor", {notTooltip: true});
		if (ImportField("AC Stealth Disadvantage", {notTooltip: true})) ConditionSet();

		//hit points, hit die
		ImportField("HP Max", {notTooltip: true}); ImportField("HP Max Current", {notTooltip: true}); ImportField("HP Temp", {notTooltip: true}); ImportField("HP Current", {notTooltip: true});
		ImportField("HD1 Level"); ImportField("HD1 Die"); ImportField("HD2 Level"); ImportField("HD2 Die"); ImportField("HD3 Level"); ImportField("HD3 Die"); SetHPTooltip(false, false);

		//do the second page
		ImportField("Personality Trait"); ImportField("Ideal"); ImportField("Bond"); ImportField("Flaw");
		ImportField("Background Feature", {notTooltip: true, notSubmitName: true}); ImportField("Background Feature Description", {notTooltip: true, compareNoSpaces: true});
		ImportField("Racial Traits", {notTooltip: true, compareNoSpaces: true});

		//do the adventure gear sections
		ImportField("Platinum Pieces"); ImportField("Gold Pieces"); ImportField("Electrum Pieces"); ImportField("Silver Pieces"); ImportField("Copper Pieces");
		ImportField("Valuables1"); ImportField("Valuables2"); ImportField("Valuables3"); ImportField("Valuables4");
		ImportField("Carrying Capacity Multiplier", {notTooltip: true});

		nmbrFlds = global.docFrom.FieldNumbers && global.docFrom.FieldNumbers.gear ? global.docFrom.FieldNumbers.gear : FieldNumbers.gear;
		for (var i = 1; i <= nmbrFlds; i++) {
			var fromFld = global.docFrom.getField("Adventuring Gear Row " + i);
			if (i <= FieldNumbers.gear) {
				ImportField("Adventuring Gear Row " + i); ImportField("Adventuring Gear Location.Row " + i); ImportField("Adventuring Gear Amount " + i); ImportField("Adventuring Gear Weight " + i);
			} else if (fromFld && fromFld.value) {
				AddToInv("gear", "ronly", fromFld.value, global.docFrom.getField("Adventuring Gear Amount " + i).value, global.docFrom.getField("Adventuring Gear Weight " + i).value, global.docFrom.getField("Adventuring Gear Location.Row " + i).value, false, false, false, true);
			}
		}

	//the third page
		// if from version < 13, do magic items after setting the rest of the fields so their automation is run afterwards
		if (fromBefore13) importMagicItems();

		ImportField("Extra.Other Holdings");

		//extra equipment
		nmbrFlds = global.docFrom.FieldNumbers && global.docFrom.FieldNumbers.extragear ? global.docFrom.FieldNumbers.extragear : FieldNumbers.extragear;
		for (var i = 1; i <= nmbrFlds; i++) {
			var fromFld = global.docFrom.getField("Extra.Gear Row " + i);
			if (i <= FieldNumbers.extragear) {
				ImportField("Extra.Gear Row " + i); ImportField("Extra.Gear Location.Row " + i); ImportField("Extra.Gear Amount " + i); ImportField("Extra.Gear Weight " + i);
			} else if (fromFld && fromFld.value) {
				AddToInv("extra", "ronly", fromFld.value, global.docFrom.getField("Extra.Gear Amount " + i).value, global.docFrom.getField("Extra.Gear Weight " + i).value, global.docFrom.getField("Extra.Gear Location.Row " + i).value, false, false, false, true);
			}
		}


	//the background page
		//set the all the organisation/faction texts and other Adventure League fields
		if (ImportField("Background_Faction.Text")) SetFactionSymbol("Background_Faction.Text", What("Background_Faction.Text"), true);
		ImportField("Background_FactionRank.Text"); ImportField("Background_Renown.Text"); ImportField("DCI.Text");
		//set the rest of the background page
		ImportField("Background_History"); ImportField("Background_Appearance"); ImportField("Background_Enemies");
		if (bothPF) {
			ImportField("Background_Organisation.Left"); ImportField("Background_Organisation.Right");
		} else if (bothCF) {
			ImportField("Background_Organisation");
		} else if (typePF && !fromSheetTypePF) {
			ImportField("Background_Organisation.Left", false, "Background_Organisation");
		} else if (!typePF && fromSheetTypePF) {
			ImportField("Background_Organisation", false, "Background_Organisation.Left");
		}
		ImportField("Lifestyle", {cleanValue: true});

		//some hidden fields that we should do now
		ImportField("ChangesDialogSkip.Stringified"); ImportField("Print Remember"); ImportField("SubClass Remember"); ImportField("Wildshapes.Remember");


	//>> make a function to do all children of a parent field
		var doChildren = function(parentFld, fromPre, toPre, excludeRegEx, inclVisibility, actionsObj) {
			var parentA = global.docTo.getField(toPre + parentFld);
			if (!parentA) return;
			if (actionsObj) {
				actionsObj.notTooltip = true;
				actionsObj.doVisiblity = inclVisibility
			};
			parentA = parentA.getArray();
			for (var pA =  0; pA < parentA.length; pA++) {
				var pAnameTo = parentA[pA].name;
				if (excludeRegEx && (excludeRegEx).test(pAnameTo)) continue;
				var pAnameFrom = pAnameTo.replace(toPre, fromPre);
				ImportField(pAnameTo, actionsObj ? actionsObj : {notTooltip: true, doVisiblity: inclVisibility}, pAnameFrom);
			}
		}

	// do the companion pages
		//run through each one in the array
		var prefixA = pagesLayout && pagesLayout.AScompExtras ? [pagesLayout.AScompExtraNmFrom, pagesLayout.AScompExtraNmTo] : [[], []];
		for (var i = 0; i < prefixA[0].length; i++) {
			var prefixFrom = prefixA[0][i];
			var prefixTo = prefixA[1][i];

			//set the visibility of the different elements
			if (ImportField(prefixTo + "Companion.Layers.Remember", {notTooltip: true, notSubmitName: true}, prefixFrom + "Companion.Layers.Remember")) ShowCompanionLayer(prefixTo);
			doChildren("Whiteout.Cnote", prefixFrom, prefixTo, false, true);

			//get and apply the race and companion type
			var compRaceFldFrom = global.docFrom.getField(prefixFrom + "Comp.Race");
			var compRaceFldTo = global.docFrom.getField(prefixFrom + "Comp.Race");
			if (compRaceFldFrom.value) {
				if (compRaceFldFrom.submitName) compRaceFldTo.submitName = compRaceFldFrom.submitName;
				var compTypeFldFrom = global.docFrom.getField(prefixFrom + "Companion.Remember");
				global.docTo.ApplyCompRace(compRaceFldFrom.value, prefixTo, compTypeFldFrom ? compTypeFldFrom.value : "");
			}

			//set companion ability scores and modifiers
			for (var a = 0; a < AbilityScores.abbreviations.length; a++) {
				var abiS = AbilityScores.abbreviations[a];
				ImportField(prefixTo+"Comp.Use.Ability."+abiS+".Score", {notTooltip: true, notSubmitName: true}, prefixFrom+"Comp.Use.Ability."+abiS+".Score");
				Value(prefixTo+"Comp.Use.Ability."+abiS+".Mod", Math.round((What(prefixTo+"Comp.Use.Ability."+abiS+".Score") - 10.5) * 0.5));
			}

			//set some one-off fields
			ImportField(prefixTo + "Comp.Type", {notTooltip: true, notSubmitName: true}, prefixFrom + "Comp.Type");

			//do the description fields
			doChildren("Comp.Desc", prefixFrom, prefixTo);

			//do the bulk of the fields
			doChildren("Comp.Use", prefixFrom, prefixTo, /\.Score|\.Mod|Text|Calculated|Button|Init\.Dex|HD\.Con/i);

			//do the BlueText fields
			doChildren("BlueText.Comp.Use", prefixFrom, prefixTo);

			//do the equipment fields
			doChildren("Comp.eqp", prefixFrom, prefixTo, /Display|Image|Subtotal|Notes|Whiteout|Text/i);

			//do the notes fields
			doChildren("Cnote", prefixFrom, prefixTo);

			//if importing from Colourful to Colourful, do skills (from Printer Friendly to Printer Friendly is already included above)
			if (bothCF) {
				doChildren("Text.Comp.Use.Skills", prefixFrom, prefixTo, /Name/i);
			} else if (!fromSheetTypePF && typePF) {
				//if importing from Colourful to Printer Friendly, do skills and the extra equipment rows
				var skillsOrderFrom = SkillsList["abbreviations" + (Who("Text.SkillsNames") === "abilities" ? "ByAS" : "")].slice(0, -2);
				var skillsOrderTo = SkillsList.abbreviations.slice(0, -2);
				for (var sN = 0; sN < skillsOrderTo.length; sN++) {
					var skillFrom = global.docFrom.getField(prefixFrom + "Text.Comp.Use.Skills." + skillsOrderFrom[sN] + ".Prof");
					var skillToProf = prefixTo + "Comp.Use.Skills." + skillsOrderTo[sN] + ".Prof";
					var skillToExp = prefixTo + "Comp.Use.Skills." + skillsOrderTo[sN] + ".Exp";
					if (skillFrom && skillFrom.value) {
						Checkbox(skillToProf, skillFrom.value === "proficient" || skillFrom.value === "expertise");
						Checkbox(skillToExp, skillFrom.value === "expertise");
					}
				};

				//companion equipment secion is bigger on the Colourful than on the Printer Friendly
				nmbrFlds = global.docFrom.FieldNumbers && global.docFrom.FieldNumbers.compgear ? global.docFrom.FieldNumbers.compgear : FieldNumbers.compgear;
				for (var i = FieldNumbers.compgear + 1; i <= nmbrFlds; i++) {
					var fromFld = global.docFrom.getField(prefixFrom + "Comp.eqp.Gear Row " + i);
					if (fromFld && fromFld.value) {
						AddToInv(prefixFrom + "Comp.", "l", fromFld.value, global.docFrom.getField(prefixFrom + "Comp.eqp.Gear Amount " + i).value, global.docFrom.getField(prefixFrom + "Comp.eqp.Gear Weight " + i).value, "", false, false, false, true);
					}
				}
			} else if (fromSheetTypePF && !typePF) {
				//if importing from Printer Friendly to Colourful, do skills
				var skillsOrderFrom = SkillsList.abbreviations.slice(0, -2);
				var skillsOrderTo = SkillsList["abbreviations" + (global.docFrom.getField("Text.SkillsNames") && global.docFrom.getField("Text.SkillsNames").userName === "abilities" ? "ByAS" : "")].slice(0, -2);
				for (var sN = 0; sN < skillsOrderTo.length; sN++) {
					var skillTo = prefixTo + "Text.Comp.Use.Skills." + skillsOrderFrom[sN] + ".Prof";
					var skillFromProf = global.docFrom.getField(prefixFrom + "Comp.Use.Skills." + skillsOrderTo[sN] + ".Prof");
					var skillFromExp = global.docFrom.getField(prefixFrom + "Comp.Use.Skills." + skillsOrderTo[sN] + ".Exp");
					if (skillFromProf && skillFromExp) {
						if (skillFromProf.isBoxChecked(0)) {
							Value(skillTo, skillFromExp.isBoxChecked(0) ? "expertise" : "proficient");
						} else {
							Value(skillTo, "nothing");
						}
					}
				};
			}
		}

	//do the notes pages
		prefixA = pagesLayout && pagesLayout.ASnotesExtras ? [pagesLayout.ASnotesExtraNmFrom, pagesLayout.ASnotesExtraNmTo] : [[], []];
		for (var i = 0; i < prefixA[0].length; i++) {
			var prefixFrom = prefixA[0][i];
			var prefixTo = prefixA[1][i];
			doChildren("Whiteout.Notes", prefixFrom, prefixTo, false, true);
			doChildren("Notes", prefixFrom, prefixTo);
		}

	//do the wildshape pages
		prefixA = pagesLayout && pagesLayout.WSfrontExtras ? [pagesLayout.WSfrontExtraNmFrom, pagesLayout.WSfrontExtraNmTo] : [[], []];
		for (var i = 0; i < prefixA[0].length; i++) {
			var prefixFrom = prefixA[0][i];
			var prefixTo = prefixA[1][i];
			doChildren("Wildshapes.Info", prefixFrom, prefixTo); //the info values
			doChildren("Wildshape.Race", prefixFrom, prefixTo);
		}

	//do the adventure logsheet pages
		prefixA = pagesLayout && pagesLayout.ALlogExtras ? [pagesLayout.ALlogExtraNmFrom, pagesLayout.ALlogExtraNmTo] : [[], []];
		var advLogRegChl = FromVersion < semVersToNmbr(12.994) ? /^(?!.*\d)|(?=.*(start|total|date)).*$/i : /^(?!.*\d)|(?=.*(start|total)).*$/i;
		for (var i = 0; i < prefixA[0].length; i++) {
			var prefixFrom = prefixA[0][i];
			var prefixTo = prefixA[1][i];
			if (i === 0) doChildren("AdvLog.1", prefixFrom, prefixTo, /^(?!.*start).*$/i); //the starting values
			if (FromVersion < semVersToNmbr(12.994)) {
				for (var x = 1; x <= FieldNumbers.logs; x++) {
					var dateFldFr = global.docFrom.getField(prefixFrom + "AdvLog." + x + ".date");
					var dateFldTo = global.docTo.getField(prefixTo + "AdvLog." + x + ".date");
					if (!dateFldTo || !dateFldFr) continue;
					var theDateForm = global.docFrom.What("DateFormat_Remember") ? global.docFrom.What("DateFormat_Remember") : "d mmm yyyy";
					var theDateVal = util.scand(theDateForm, dateFldFr.value);
					if (theDateVal) dateFldTo.value = util.printd("yy-mm-dd", theDateVal);
				};
			};
			doChildren("AdvLog", prefixFrom, prefixTo, advLogRegChl);
		}

	//do the spell sheet pages
		//first update the CurrentSpells variable
		if (global.docFrom.CurrentSpells) {
			var classesArray = [];
			for (var aCast in CurrentSpells) {
				classesArray.push(aCast);
				var aCastFrom = aCast;
				if (!global.docFrom.CurrentSpells[aCastFrom]) {
					aCastFrom = aCastFrom.replace(/.*_-_/, '');
					if (!global.docFrom.CurrentSpells[aCastFrom]) continue; //doesn't exist in the sheet importing from
				}
				var spCastTo = CurrentSpells[aCast];
				var spCastFrom = global.docFrom.CurrentSpells[aCastFrom];
				if (spCastFrom.selectCa) spCastTo.selectCa = spCastFrom.selectCa;
				if (spCastFrom.offsetCa) spCastTo.offsetCa = spCastFrom.offsetCa;
				if (spCastFrom.selectBo) spCastTo.selectBo = spCastFrom.selectBo;
				if (spCastFrom.offsetBo) spCastTo.offsetBo = spCastFrom.offsetBo;
				if (spCastFrom.extraBo) spCastTo.extraBo = spCastFrom.extraBo;
				if (spCastFrom.selectSp) spCastTo.selectSp = spCastFrom.selectSp;
				if (spCastFrom.offsetSp) spCastTo.offsetSp = spCastFrom.offsetSp;
				if (spCastFrom.selectSpSB) spCastTo.selectSpSB = spCastFrom.selectSpSB;
				if (spCastFrom.selectPrep) spCastTo.selectPrep = spCastFrom.selectPrep;
				if (spCastFrom.blueTxt) spCastTo.blueTxt = newObj(spCastFrom.blueTxt);
				if (spCastTo.bonus) {
					for (var bKey in spCastTo.bonus) {
						if (!spCastFrom.bonus[bKey]) continue; //doesn't exist in the sheet importing from
						var spBonusFrom = spCastFrom.bonus[bKey];
						var spBonusTo = spCastTo.bonus[bKey];
						var spIsArrayFrom = isArray(spBonusFrom);
						var spIsArrayTo = isArray(spBonusTo);
						if (spIsArrayTo !== spIsArrayFrom) continue; //types don't match
						var loop = spIsArrayTo && spIsArrayFrom;
						var loopEnd = loop ? spBonusTo.length : 1;
						for (var i = 0; i < loopEnd; i++) {
							var spBonusiFrom = loop ? spBonusFrom[i] : spBonusFrom;
							var spBonusiTo = loop ? spBonusTo[i] : spBonusTo;
							if (spBonusiFrom.selection && !spBonusiTo.selection) spBonusiTo.selection = spBonusiFrom.selection;
						}
					}
				};
			};
			if (global.docFrom.CurrentCasters.incl || global.docFrom.CurrentCasters.excl) {
				CurrentCasters = newObj(global.docFrom.CurrentCasters);
				for (var aCast in CurrentCasters) {
					for (var i = 0; i < CurrentCasters.incl.length; i++) {
						if (classesArray.indexOf(CurrentCasters.incl[i]) === -1) {
							CurrentCasters.incl.splice(i, 1);
							i -= 1;
						}
					}
					for (var i = 0; i < CurrentCasters.excl.length; i++) {
						if (classesArray.indexOf(CurrentCasters.excl[i]) === -1) {
							CurrentCasters.excl.splice(i, 1);
							i -= 1;
						}
					}
				}
			}
			SetStringifieds();

			//now do the spell rows, but only if the sheet type is the same or only the first page was visible
			if (pagesLayout && pagesLayout.SSfrontExtras && (sameType || !pagesLayout.SSmoreExtras)) {
				prefixA = [[pagesLayout.SSfrontExtraNmFrom], [pagesLayout.SSfrontExtraNmTo]];
				if (pagesLayout.SSmoreExtras) {
					prefixA[0] = prefixA[0].concat(pagesLayout.SSmoreExtraNmFrom);
					prefixA[1] = prefixA[1].concat(pagesLayout.SSmoreExtraNmTo);
				}
				for (var i = 0; i < prefixA[0].length; i++) {
					var prefixFrom = prefixA[0][i];
					var prefixTo = prefixA[1][i];
					nmbrFlds = global.docFrom.FieldNumbers && global.docFrom.FieldNumbers.spells ? global.docFrom.FieldNumbers.spells : FieldNumbers.spells;
					nmbrFlds = nmbrFlds[i < 1 ? 0 : 1];
					if (i === 0) { //set the first class header on SSfront
						var tClassFld = global.docFrom.getField(prefixFrom + "spellshead.class.0");
						if (tClassFld && tClassFld.value && CurrentSpells[tClassFld.value]) SetSpellSheetElement(prefixTo + "spells.remember.0", "header", 0, tClassFld.value);
						//hide the prepared section if not visible
						var tPrepFldFrom = global.docFrom.getField(prefixFrom + "spellshead." + (fromSheetTypePF ? "Image" : "Text") + ".prepare.0");
						var tPrepFldToNm = prefixTo + "spellshead." + (typePF ? "Image" : "Text") + ".prepare.0";
						if (tPrepFldFrom && tPrepFldFrom.display === display.hidden) {
							MakePreparedMenu_PreparedOptions(tPrepFldToNm);
						};
					}
					//set the spell remember fields
					for (var a = 0; a <= nmbrFlds; a++) {
						ImportField(prefixTo + "spells.remember." + a, {notTooltip: true, notSubmitName: true}, prefixFrom + "spells.remember." + a);
					}
					//set the headers and spell dividers
					for (var a = 0; a <= 9; a++) {
						if (a < 4) {
							ImportField(prefixTo + "spellshead.Text.header." + a, {notTooltip: true, notSubmitName: true, cleanValue: true}, prefixFrom + "spellshead.Text.header." + a);
							ImportField(prefixTo + "spellshead.ability." + a, {notTooltip: true, notSubmitName: true, cleanValue: true}, prefixFrom + "spellshead.ability." + a);
						}
						ImportField(prefixTo + "spellsdiv.Text." + a, {notTooltip: true, notSubmitName: true, cleanValue: true}, prefixFrom + "spellsdiv.Text." + a);
					};
					//set the headers spellcasting abilities
					doChildren("spellshead.ability", prefixFrom, prefixTo);
					//set the headers bluetext values
					doChildren("BlueText.spellshead", prefixFrom, prefixTo);
				}
			};
		};
	//Change calculations to manual
		if (fromBefore13) {
			SetToManual_Dialog.mAtt = global.docFrom.getField("Manual Attack Remember") ? global.docFrom.What("Manual Attack Remember") !== "No" : false;
			SetToManual_Dialog.mBac = global.docFrom.getField("Manual Background Remember") ? global.docFrom.What("Manual Background Remember") !== "No" : false;
			SetToManual_Dialog.mCla = global.docFrom.getField("Manual Class Remember") ? global.docFrom.What("Manual Class Remember") !== "No" : false;
			SetToManual_Dialog.mFea = global.docFrom.getField("Manual Feat Remember") ? global.docFrom.What("Manual Feat Remember") !== "No" : false;
			SetToManual_Dialog.mRac = global.docFrom.getField("Manual Race Remember") ? global.docFrom.What("Manual Race Remember") !== "No" : false;
		} else {
			SetToManual_Dialog.mAtt = !!global.docFrom.CurrentVars.manual.attacks;
			SetToManual_Dialog.mBac = !!global.docFrom.CurrentVars.manual.background;
			SetToManual_Dialog.mCla = !!global.docFrom.CurrentVars.manual.classes;
			SetToManual_Dialog.mFea = !!global.docFrom.CurrentVars.manual.feats;
			SetToManual_Dialog.mRac = !!global.docFrom.CurrentVars.manual.race;
		}
		SetToManual_Button(true);

	//Recalculate the weapons, for things might have changed since importing them
		ReCalcWeapons(false);

		//now that all the attacks of the first page and companion pages have been imported, set the attack colors
		if (bothCF) {
			ApplyAttackColor("", "", "Default");
			ApplyAttackColor("", "", "Comp.");
		};

		//import the icons
		IIerror = ImportIcons(pagesLayout, app.viewerType !== "Reader" && importFromPath[2]);

		// set the focus to the top of the first page
		tDoc.getField("Player Name").setFocus();
	} catch (error) {
		if (error !== "user stop") {
			var eText = "An error occurred during importing:\n " + error;
			for (var e in error) eText += "\n " + e + ": " + error[e];
			console.println(eText);
			console.show();
		};
	};

	// A pop-up to inform the user of the changes
	if (!closeAlert) {
		global.docTo.InitializeEverything(consoleTrigger, true);
		global.docTo.dirty = true;
		global.docTo.calcCont();
		thermoTxt = thermoM("Importing from '" + global.docFrom.documentFileName + "'...");
		thermoM(0.9);

		var aText = "[Can't see the 'OK' button at the bottom? Use ENTER to close this dialog]\n";
		if (app.viewerType !== "Reader" && importFromPath[2]) { // if icons were imported
			aText += toUni("IMPORTANT: Custom Icons") + "\nBecause you imported custom icons, the sheet will not work correctly right away, but only after saving the sheet and opening again. That is why, AFTER YOU CLOSE THIS DIALOG, YOU WILL BE PROMPTED TO SAVE THIS PDF AND IT WILL AUTOMATICALLY CLOSE AFTER THAT.\n\n";
		}
		if (!sameType) {
			aText += toUni("Sheet Types Differ");
			aText += "\nYou seem to have imported from another type of sheet (i.e. not \'" + tDoc.info.SheetType + "\'). This will have the unfortunate side-effect that some things might not have been imported, because there aren't an equal amount of entries for all things on all of MPMB's sheet types. For example, there is room for 6 attacks on the 'Colorful-A4' sheet, but for only 5 on the other types.";
			aText += "\n\n" + toUni("Any of the following sections might be truncated:");
			aText += typeA4 ? "" : "\n  \u2022 1st page: attacks, actions" + (typePF ? ", languages, tools" : "");
			aText += typePF ? "" : "\n  \u2022 2nd page: equipment" + (typeA4 ? "" : ", feats, languages, tools");
			aText += typeA4 ? "" : "\n  \u2022 Additional sheet: magic items" + (typePF ? ", equipment, feats" : "");
			aText += !typePF ? "" : "\n  \u2022 Companion sheet(s): equipment;";
			aText += !typePF ? "" : "\n  \u2022 Adventure Logsheet(s): the last entry of each page is missing";
			aText += typeA4 ? "" : "\n  \u2022 Spell Sheet(s): spells near the bottom of the page";
			aText += "\n\n";
		};
		aText += toUni("Some manual additions might not have transferred over") + "\nSome things that you adjusted manually on your old sheet might not have transferred to the new sheet. This is done intentionally because that way the automation can take advantage of any changes made in the new version.\n"
		aText += [
			toUni("The following things should be considered:"),
			"The 'Class Features' text is now solely what the automation added",
			"The 'Notes' section on the 3rd page is now solely what the automation added",
			"Attack and Ammunition attributes are now solely what the automation set",
			"Magic and Misc AC bonuses are now solely what the automation set",
			"Feat and Magic Item descriptions are now solely what the automation set",
			"Companion pages have been copied exactly, not using any updates in automation",
			"Wild Shapes have been re-calculated, manual changes have been ignored",
			"Ability Score dialog has been duplicated from the old version, changes by newer automation have been ignored. Read that dialog's text carefully to see if you are missing anything",
			sameType || (pagesLayout && !pagesLayout.SSmoreExtras) ? "Only spells recognized by the automation have been set, unrecognized spells are now an empty row." : "No spell sheets have been generated"
		].join("\n  \u2022 ");
		if (fromBefore13) {
			aText += [
				"\n\n" + toUni("Bonuses from magic items"),
				"Be aware that v13 introduces automation for magic items which has immediately been applied on import.",
				"If you added bonuses to modifier fields to account for magic items, those bonuses will have been imported, but the magic item automation will have applied those bonuses as well. It could well be that some things now have twice the bonus that they should have! Please check carefully if all the modifier fields still display the right numbers.",
				"The modifier fields are hidden by default, but you can toggle their visiblity with the Functions >> Modifiers bookmark."
			].join("\n  \u2022 ");
		};
		if (FromVersion < semVersToNmbr(12.998)) {
			aText += [
				"\n\n" + toUni("Importing from older version, before v12.998"),
				"Some proficiencies you adjusted manually, like languages and tools, might not have transferred over correctly. This is because the new version of the sheet uses a different way of setting proficiencies that offer a choice.",
				"Things manually added/changed in the fields for Saving Throw Advantages/Disadvantages and Senses have not been copied."
			].join("\n  \u2022 ");
		};
		app.alert({
			cMsg : aText,
			nIcon : 3,
			cTitle : "Things to consider about the import"
		});
	};
	thermoStop(); // Stop progress bar, forcibly

	// signal the end of importing
	IsNotImport = true;
	ignorePrereqs = false;
	if (IIerror && isNaN(IIerror)) app.alert(IIerror);
  };

	// close the document that was opened to import from (if any)
	if (global.docFrom && global.docFrom.toString() === "[object Doc]") {
		global.docFrom.dirty = false;
		global.docFrom.closeDoc(true);
	};
	// remove the global objects so that they don't make a clutter
	if (global.docTo) delete global.docTo;
	if (global.docFrom) delete global.docFrom;

	// if icons were imported ask to save and then close the sheet
	if (!closeAlert && app.viewerType !== "Reader" && importFromPath[2]) {
		app.execMenuItem("SaveAs");
		app.execMenuItem("Close");
		tDoc.closeDoc();
	}
};

//a function to import a field from the global.docFrom
//several extra things can be set: actionsObj.SubmitCalc, actionsObj.notTooltip, actionsObj.notSubmitName, actionsObj.doReadOnly, actionsObj.cleanValue, actionsObj.doVisiblity, actionsObj.compareNoSpaces
function ImportField(fldNm, actionsObj, fromFldNm) {
	if (!global.docTo || !global.docFrom || !global.docTo.getField(fldNm) || !global.docFrom.getField(fromFldNm ? fromFldNm : fldNm)) return false; //either of the documents or fields doesn't exist

	if (!actionsObj) actionsObj = {};

	var didChange = false;
	var toFld = global.docTo.getField(fldNm);
	var fromFld = global.docFrom.getField(fromFldNm ? fromFldNm : fldNm);

	//check if the types of the fields match enough to proceed
	var combiTypes = ["button", "checkbox", "listbox", "radiobutton", "signature"];
	if ((combiTypes.indexOf(toFld.type) !== -1 || combiTypes.indexOf(fromFld.type) !== -1) && toFld.type !== fromFld.type) return false;

	//copy the value
	if (fromFld.value !== fromFld.defaultValue) {
		var testValFrom = fromFld.value.toString();
		var testValTo = toFld.value.toString();
		if (actionsObj.replaceFrom) testValFrom = testValFrom.replace(actionsObj.replaceFrom, actionsObj.replaceWith ? actionsObj.replaceWith : "");
		if (toFld.type === "combobox" && !toFld.editable && testValFrom !== testValTo) {
			try {toFld.value = fromFld.value} catch (e) {};
		} else if (!actionsObj.cleanValue && !actionsObj.compareNoSpaces && testValFrom !== testValTo) {
			toFld.value = fromFld.value;
			didChange = true;
		} else if (actionsObj.cleanValue) {
			testValFrom = clean(testValFrom);
			testValTo = clean(testValTo);
			if (testValFrom !== testValTo) {
				toFld.value = fromFld.value;
				didChange = true;
			}
		} else if (actionsObj.compareNoSpaces) {
			testValFrom = testValFrom.replace(/\r/g, "").replace(/ /g, "");
			testValTo = testValTo.replace(/\r/g, "").replace(/ /g, "");
			if (testValFrom !== testValTo) {
				toFld.value = fromFld.value;
				didChange = true;
			}
		}
	}

	//set the submitName and calculation
	if (actionsObj.SubmitCalc && fromFld.submitName && toFld.submitName !== fromFld.submitName) { //we need to set a calculation of the fields and copy the submitName
		toFld.setAction("Calculate", fromFld.submitName);
		actionsObj.notSubmitName = false;
	}
	if (!actionsObj.notSubmitName && fromFld.submitName && toFld.submitName !== fromFld.submitName) {
		toFld.submitName = fromFld.submitName;
		didChange = true;
	}

	//copy the tooltip
	if (!actionsObj.notTooltip && fromFld.userName && toFld.userName !== fromFld.userName) {
		toFld.userName = fromFld.userName;
		didChange = true;
	}

	//copy the readonly status
	if (actionsObj.doReadOnly && fromFld.readonly) toFld.readonly = true;

	if (actionsObj.doVisiblity) {
		var toFldVisCheck = toFld.getArray().length === 1 ? toFld : global.docTo.getField(fromFldNm);
		if (toFldVisCheck.display !== fromFld.display) {
			toFld.display = fromFld.display;
			didChange = true;
		}
	}

	return didChange;
};

//import the icons
function ImportIcons(pagesLayout, viaSaving) {
	if (!global.docTo || !global.docFrom) return true; //either of the documents or fields doesn't exist

	var fromSheetTypePF = global.docFrom.info.SheetType ? (/printer friendly/i).test(global.docFrom.info.SheetType) : false;
	var bothPF = typePF && fromSheetTypePF;
	var bothCF = !typePF && !fromSheetTypePF;
	var FromVersionSem = getSemVers(global.docFrom.info.SheetVersion, global.docFrom.info.SheetVersionType, global.docFrom.info.SheetVersionBuild);
	var FromVersion = semVersToNmbr(FromVersionSem);
	if (FromVersion < semVersToNmbr(3.7)) return true; //the form is of a version before there were any icon fields

	var IconArray = [
		["Portrait", "Portrait"],
		["Symbol", "Symbol"],
		["Comp.img.Portrait", "Comp.img.Portrait"]
	];
	if (pagesLayout && pagesLayout.AScompExtras) {
		for (var i = 0; i < pagesLayout.AScompExtraNmFrom.length; i++) {
			IconArray.push([pagesLayout.AScompExtraNmFrom[i] + "Comp.img.Portrait", pagesLayout.AScompExtraNmTo[i] + "Comp.img.Portrait"]);
		}
	};
	if (pagesLayout && bothPF) {
		IconArray.push(["HeaderIcon", "HeaderIcon"]);
		IconArray.push(["AdvLog.HeaderIcon", "AdvLog.HeaderIcon"]);
		if (pagesLayout.ALlogExtras) {
			for (var i = 0; i < pagesLayout.ALlogExtraNmFrom.length; i++) {
				IconArray.push([pagesLayout.ALlogExtraNmFrom[i] + "AdvLog.HeaderIcon", pagesLayout.ALlogExtraNmTo[i] + "AdvLog.HeaderIcon"]);
			}
		}
	};
	//now only use the field names that appear in both sheets
	var FldsArray = [];
	for (var iA = 0; iA < IconArray.length; iA++) {
		if (global.docFrom.getField(IconArray[iA][0]) && global.docTo.getField(IconArray[iA][1])) {
			FldsArray.push([global.docFrom.getField(IconArray[iA][0]), IconArray[iA][1]]);
		}
	}

	//see if the icons match one of the prematched ones (only from v10.6 or later)
	var skipArray = [];
	if (FromVersion >= semVersToNmbr(10.6)) {
		if (FromVersion < semVersToNmbr(11.8)) {
			var IconsList = [
				["SaveIMG.harpers", "SaveIMG.Faction.harpers.symbol"],
				["SaveIMG.emeraldenclave", "SaveIMG.Faction.emeraldenclave.symbol"],
				["SaveIMG.lordsalliance", "SaveIMG.Faction.lordsalliance.symbol"],
				["SaveIMG.ordergauntlet", "SaveIMG.Faction.ordergauntlet.symbol"],
				["SaveIMG.zhentarim", "SaveIMG.Faction.zhentarim.symbol"]
			];
			var KnownIcons = [];
			for (var iL = 0; iL < IconsList.length; iL++) {
				if (global.docFrom.getField(IconsList[iL][0]) && global.docTo.getField(IconsList[iL][1])) {
					KnownIcons.push([global.docFrom.getField(IconsList[iL][0]).buttonGetIcon(), global.docTo.getField(IconsList[iL][1]).buttonGetIcon()]);
				}
			}
		} else {
			//populate the IconList with the different types of icons known
			var IconList = global.docTo.getField("SaveIMG.Faction").getArray();
			IconList = IconList.concat(global.docTo.getField("SaveIMG.ClassIcon").getArray());
			IconList = IconList.concat(global.docTo.getField("SaveIMG.ALicon").getArray());
			var KnownIcons = [];
			for (var iL = 0; iL < IconList.length; iL++) {
				var docFromIcon = global.docFrom.getField(IconList[iL].name);
				if (docFromIcon) KnownIcons.push([docFromIcon.buttonGetIcon(), IconList[iL].buttonGetIcon()]);
			}
		}

		//now set the icons of fields to be the same as from the imported sheet, if recognized
		for (var fA = 0; fA < FldsArray.length; fA++) {
			var fromIcon = FldsArray[fA][0].buttonGetIcon();
			//run through the icons to see if there is a match
			for (var iK = 0; iK < KnownIcons.length; iK++) {
				if (fromIcon === KnownIcons[iK][0]) {
					var changeFld = global.docTo.getField(FldsArray[fA][1]);
					changeFld.buttonSetIcon(KnownIcons[iK][1]);
					changeFld.display = display.visible;
					skipArray.push(fA);
					break;
				}
			}
		}
	}

	//now if selected and possible, see if we can transfer the icons for the remaining fields
	//for the sheets before v3.0, there is no way of making an empty page. Chances are very slim that anybody is still using those
	var goodImport = 1;
	var madeFlds = false;
	if (MPMBImportFunctionsInstalled && viaSaving) {
		var ClickIMG = global.docFrom.getField("SaveIMG.ClickMeIcon") ? global.docFrom.getField("SaveIMG.ClickMeIcon").buttonGetIcon() : false;
		var EmptyIMG = global.docFrom.getField("SaveIMG.EmptyIcon") ? global.docFrom.getField("SaveIMG.EmptyIcon").buttonGetIcon() : (global.docFrom.getField("Portrait_Blank") ? global.docFrom.getField("Portrait_Blank").buttonGetIcon() : false);
		var fromPagT = global.docFrom.numPages;

		//add a blank template page as first page
		if (global.docFrom.getTemplate("blank")) {
			global.docFrom.getTemplate("blank").spawn(fromPagT, true, false);
			var usePage = fromPagT;
		} else if (global.docFrom.getTemplate("ASnotes")) { //or add a blank notes template page as first page
			global.docFrom.getTemplate("ASnotes").spawn(fromPagT, true, false);
			global.docFrom.removeField("P0.ASnotes");
			var usePage = fromPagT;
		} else { //take the current notes page and delete all fields on it
			var notesFlds = global.docFrom.getField("Notes Left") ? global.docFrom.getField("Notes Left") : (global.docFrom.getField("Notes.Left") ? global.docFrom.getField("Notes.Left") : false);
			if (!notesFlds) {
				goodImport = "Unable to import the user-defined pictures";
			} else {
				var usePage = notesFlds.page;
				//now delete all the fields on this page that might cause problems upon importing
				for (var f = 0; f < global.docFrom.numFields; f++) {
					var fNm = global.docFrom.getNthFieldName(f);
					var fPage = global.docFrom.getField(fNm).page;
					if (fPage === usePage && global.docTo.getField(fNm)) global.docFrom.removeField(fNm);
				}
			}
		}

		//now add fields on this new page with the icons to import
		if (goodImport) {
			var fldIncr = 0;
			for (var fA = 0; fA < FldsArray.length; fA++) { if (skipArray.indexOf(fA) === -1) {
				var fromIcon = FldsArray[fA][0].buttonGetIcon();
				//check if this icon is actually in use and not just an empty one
				if ((ClickIMG && ClickIMG === fromIcon) || (EmptyIMG && EmptyIMG === fromIcon)) continue;
				var nwFld = global.docFrom.addField({
					cName : "tempIconImports." + fldIncr,
					cFieldType : "button",
					nPageNum : usePage,
					oCoords : [40, 40, 0, 0]
				});
				nwFld.buttonPosition = position.iconOnly;
				nwFld.buttonSetIcon(fromIcon);
				nwFld.userName = FldsArray[fA][1];
				fldIncr += 1;
				var madeFlds = true;
			}};
		};

		//now save this document and import this newly made page into the new document, as the last page
		if (madeFlds) {
		try {
			// First delete all the document-level scripts from the old sheet, otherwise we import them along
			var oldDocLvl = ["Functions", "ListsClassesUA", "ListsClassesUAArtificer", "ListsClassesUAMystic", "ListsFeatsUA", "ListsRacesUA", "ListsSpellsUA"];
			for (var d = 0; d < oldDocLvl.length; d++) {
				global.docFrom.removeScript(oldDocLvl[d]);
			}
			//import the page as the last page
			if (!MPMBImportPage(global.docTo, global.docFrom.path, usePage)) throw "Unable to import the user-defined icons-page.";

			//now continue with the newly added page
			var newFields = global.docTo.getField("tempIconImports").getArray();
			for (var nF = 0; nF < newFields.length; nF++) {
				var setFld = global.docTo.getField(newFields[nF].userName)
				setFld.buttonSetIcon(newFields[nF].buttonGetIcon());
				setFld.display = display.visible;
			}

			global.docTo.deletePages(global.docTo.numPages - 1); //remove the newly added page again
		} catch (e) {
			goodImport = "An error occured during importing the user-defined icons.";
		}
		}
	} else if (viaSaving && !MPMBImportFunctionsInstalled) {goodImport = "JavaScript file not installed";};

	return goodImport;
};

// import the class features that were manually selected from the extrachoices arrays in older versions
function ImportExtraChoices() {
	if (!global.docFrom.getField("Extra.Notes")) return; //nothing to do
	//use the content of the sheet we are importing from as a means to test what choices/extrachoices things had been selected
	var toTest = global.docFrom.getField("Class Features Remember").value;
	var toTestE = global.docFrom.getField("Extra.Notes").value + "\r" + global.docFrom.getField("Class Features").value;
	for (var aClass in global.docFrom.classes.known) {
		var classlevel = global.docFrom.classes.known[aClass].level;
		var Temps = global.docFrom.CurrentClasses[aClass];
		if (!Temps) continue;
		for (var prop in Temps.features) {
			var propFea = Temps.features[prop];
			if (propFea.minlevel > classlevel) continue;
			if (propFea.extrachoices && propFea.extraname) {
				propFea.extrachoices.forEach( function(opt) {
					opt = opt.toLowerCase();
					var propOpt = propFea[opt];
					if (toTestE.indexOf(propOpt.name + " (" + propFea.extraname) !== -1) {
						global.docTo.SetFeatureChoice("classes", aClass, prop, opt, opt);
					};
				});
			}
			if (propFea.choices) {
				propFea.choices.forEach( function(opt) {
					opt = opt.toLowerCase();
					var propStr = [aClass, prop, opt].toString();
					if (toTest.indexOf(propStr) !== -1) {
						global.docTo.SetFeatureChoice("classes", aClass, prop, opt);
					};
				});
			}
		}
	}
};

/* ---- the old, depreciated import function ---- */
function Import(type) {

	//first ask if this sheet is already set-up the right way before importing and if we can continue
	var AskFirst = {
		cMsg : "This method is no longer supported and will result in your character only being partially imported. If you want to be guaranteed of a good import, use the option \"Import Directly from a MPMB's PDF\" instead!"+"\n\nBefore you import anything into this sheet, please make sure that the following things are set correctly. If you don't do this, not everything will import. You will have to make the following things identical to the sheet you exported the data from:" + "\n  \u2022  The unit and decimal system;" + "\n  \u2022  The layout of the pages.\n      In order to do this, you will have to hide and/or add pages in the same order as you did in the sheet you are importing from. This is because the moment you add an extra page (so after the first of its type), that page gets a name based on the location of that page in the document. That location is based solely on the pages that are visible at the time of itscreation.\n      For example, if the sheet you are importing from has two Adventurers Logsheet pages, and these were added after generating a Spell Sheet of three pages long, while all of the other pages were visible as well, the second Adventurers Logsheet page would have been generated as page number 12. In order for this sheet to properly receive the import for that page, you will first need to generate an Adventurers Logsheet page at page number 12." + "\n\n\nDo you want to continue importing?",
		nIcon : 2,
		cTitle : "Is everything ready for importing?",
		nType : 2
	};


	if (app.alert(AskFirst) !== 4) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Importing the data...");
	calcStop();

	MakeMobileReady(false); // Undo flatten, if needed

	templateA = [
		["Template.extras.AScomp", What("Template.extras.AScomp")],
		["Template.extras.ASnotes", What("Template.extras.ASnotes")],
		["Template.extras.WSfront", What("Template.extras.WSfront")],
		["Template.extras.ALlog", What("Template.extras.ALlog")]
	];
	var locStateOld = What("Gear Location Remember").split(",");

	if (typeof ProcResponse === "undefined") {
		IsNotImport = false;
		ignorePrereqs = true;
		if (type === "fdf") {
			tDoc.importAnFDF();
		} else if (type === "xfdf") {
			tDoc.importAnXFDF();
		}
		if (What("Race Remember").split("-")[1]) ApplyRace(What("Race Remember"));
		IsNotImport = true;
		ignorePrereqs = false;
	};

	GetStringifieds(); // Get the variables

	//set the values of the templates back
	for (var i = 0; i < templateA.length; i++) {
		Value(templateA[i][0], templateA[i][1]);
	}

	thermoM(13/25); //increment the progress dialog's progress
	thermoTxt = thermoM("Getting the sheet ready...", false); //change the progress dialog text

	//set the layer visibility to what the imported field says
	LayerVisibilityOptions();

	//set the visibility of Honor/Sanity as imported
	ShowHonorSanity();

	thermoM(14/25); //increment the progress dialog's progress

	if (CurrentVars.mobileset) CurrentVars.mobileset.active = false;

	thermoM(15/25); //increment the progress dialog's progress

	//set the visiblity of the text lines as the imported remember field has been set to
	ToggleWhiteout(CurrentVars.whiteout);

	thermoM(16/25); //increment the progress dialog's progress

	//set the text size for multiline fields as the imported remember field has been set to
	ToggleTextSize(CurrentVars.fontsize);

	thermoM(17/25); //increment the progress dialog's progress

	//set the visiblity of the manual attack fields on the first page as the imported remember field has been set to
	if (CurrentVars.manual.attacks) ToggleAttacks(true);

	thermoM(18/25); //increment the progress dialog's progress

	//set the visiblity of the adventure league as the imported field has been set to
	if (What("League Remember") === "On") {
		ToggleAdventureLeague({
			dci : true,
			factionrank : true,
			renown : true,
			actions : true,
			asterisks : true
		});
	} else {
		try {
			var theAdvL = eval(What("League Remember"));
			ToggleAdventureLeague({
				dci : theAdvL.dci,
				factionrank : theAdvL.factionrank,
				renown : theAdvL.renown,
				actions : theAdvL.actions,
				asterisks : theAdvL.asterisks
			});
		} catch (e) {
			global.docTo.resetForm(["League Remember"]);
		};
	};

	thermoM(19/25); //increment the progress dialog's progress

	//set the visiblity of the Blue Text fields as the imported remember field has been set to
	ToggleBlueText(CurrentVars.bluetxt);

	thermoM(20/25); //increment the progress dialog's progress

	//set the visiblity of the spell slots on the first page as the imported remember field has been set to
	SetSpellSlotsVisibility();

	thermoM(21/25); //increment the progress dialog's progress

	//set the visiblity of the location columns as the imported remember field has been set to

	var locStateNew = What("Gear Location Remember").split(",");
	if (locStateNew[0] !== locStateOld[0]) { //only do something if current visiblity (locStateOld) is not what was imported
		HideInvLocationColumn("Adventuring Gear ", locStateOld[0] === "true");
	}
	if (locStateNew[1] !== locStateOld[1]) { //only do something if current visiblity (locStateOld) is not what was imported
		HideInvLocationColumn("Extra.Gear ", locStateOld[1] === "true");
	}

	thermoM(22/25); //increment the progress dialog's progress

	//set the visiblity of the attuned magical item line on the second page as the imported remember field has been set to
	if (What("Adventuring Gear Remember") !== false) {
		ShowAttunedMagicalItems(false);
	}

	thermoM(23/25); //increment the progress dialog's progress

	//set all the color schemes as the newly imported fields dictate
	setColorThemes();

	thermoM(24/25); //increment the progress dialog's progress

	//set the weight carried multiplier back one if a race with powerful build was added
	if (CurrentRace.known && (/powerful build/i).test(CurrentRace.trait) && What("Carrying Capacity Multiplier") === 3) {
		tDoc.getField("Carrying Capacity Multiplier").value -= 1;
	}

	app.alert({
		cMsg : "Be aware that some fields might not have imported correctly if you imported data that you exported from another version of this sheet.\n\nTooltips might no longer display the correct information after importing (especially if you exported all the fields and not just the non-calculated ones). Also, some fields may be left empty and other fields may display the wrong information. Unfortunately, this can't be helped.\n\nIt is recommended that you check all the fields whether or not correspond with the data that you wanted to import.\n\nUnfortunately, the portrait and symbol on the fourth page can't be imported, you will have to re-do them manually.\n\nIf the sheet you exported information from has extra pages added (e.g. two companion pages, or multiple adventurers logsheets), than those will only be imported if you create those pages first in this document as well, in the exact same order as you did in the previous document.\n\nThe following only applies if you are importing from a version before v11:\nIf you imported a class and/or race that has any options that are selected via the buttons on the second page, then please select those features that grant spellcasting again (even if they are already displayed). Selecting them again will give the automation the information necessary to produce the proper Spell Sheets.",
		nIcon : 1,
		cTitle : "Notes on Importing",
		nType : 0
	});

	thermoM(thermoTxt, true); // Stop progress bar

	//re-apply stuff just as when starting the sheet
	InitializeEverything();

	tDoc.dirty = true;
};

/* ---- the old, depreciated export functions ---- */
//Export only the parts of the sheet that are unaffected by automation
function MakeExportArray() {
	var notExport = [
		"Spell DC 1 Mod",
		"Spell DC 2 Mod",
		"Speed Remember",
		"Racial Traits",
		"Class Features",
		"Proficiency Armor Light",
		"Proficiency Armor Medium",
		"Proficiency Armor Heavy",
		"Proficiency Shields",
		"Proficiency Weapon Simple",
		"Proficiency Weapon Martial",
		"Proficiency Weapon Other",
		"Background Feature",
		"Background Feature Description",
		"SheetInformation",
		"SpellSheetInformation",
		"CopyrightInformation",
		"Opening Remember"
	]
	var tempArray = [];
	for (var F = 0; F < tDoc.numFields; F++) {
		var Fname = tDoc.getNthFieldName(F);
		var Fvalue = What(Fname) !== tDoc.getField(Fname).defaultValue;
		var Frtf = tDoc.getField(Fname).type === "text" && tDoc.getField(Fname).richText;
		var Fcalc = (/Bonus$/i).test(Fname) || tDoc.getField(Fname).calcOrderIndex === -1;
		if (!Frtf && Fvalue && Fcalc && notExport.indexOf(Fname) === -1 && Fname.indexOf("Limited Feature") === -1 && Fname.indexOf("SpellSlots") === -1 && !(/^(Comp.Use.)?Attack.\d.(?!Weapon Selection)|^Feat Description \d$|^Tool \d$|^Language \d$|^(bonus |re)?action \d$|^HD\d (Used|Level|Die|Con Mod)$|Wildshape.\d.|^Resistance Damage Type \d$|^Extra.Exhaustion Level \d$|^Extra.Condition \d+$|^Template\.extras.+$|spells\..*\.\d+|spellshead|spellsdiv|spellsgloss/i).test(Fname)) {
			tempArray.push(Fname);
		}
	}
	return tempArray.length > 0 ? tempArray : "";
}

//Export only the parts of the sheet that are unaffected by automation
function MakeEquipmentExportArray() {
	var toExport = [
		"Platinum Pieces",
		"Gold Pieces",
		"Electrum Pieces",
		"Silver Pieces",
		"Copper Pieces",
		"Lifestyle",
		"Extra.Other Holdings"
	];
	for (var i = 1; i <= FieldNumbers.gear; i++) {
		toExport.push("Adventuring Gear Row " + i);
		toExport.push("Adventuring Gear Location.Row " + i);
		toExport.push("Adventuring Gear Amount " + i);
		toExport.push("Adventuring Gear Weight " + i);
		if (!typePF && i <= 4) toExport.push("Valuables" + i);
		if (i <= FieldNumbers.magicitems) {
			toExport.push("Extra.Magic Item " + i);
			toExport.push("Extra.Magic Item Attuned " + i);
			toExport.push("Extra.Magic Item Description " + i);
			toExport.push("Extra.Magic Item Weight " + i);
		}
		if (i <= FieldNumbers.extragear) {
			toExport.push("Extra.Gear Row " + i);
			toExport.push("Extra.Gear Location.Row " + i);
			toExport.push("Extra.Gear Amount " + i);
			toExport.push("Extra.Gear Weight " + i);
		}
	}
	var tempArray = [];
	for (var F = 0; F < toExport.length; F++) {
		if (tDoc.getField(toExport[F]).type !== "checkbox" && What(toExport[F]) !== tDoc.getField(toExport[F]).defaultValue) {
			tempArray.push(toExport[F]);
		} else if (tDoc.getField(toExport[F]).type === "checkbox" && tDoc.getField(toExport[F]).isBoxChecked(0)) {
			tempArray.push(toExport[F]);
		}
	}
	return tempArray.length > 0 ? tempArray : "";
}

//Export only the parts of the sheet that are unaffected by automation
function MakeDescriptionExportArray() {
	var toExport = [
		"PC Name",
		"Player Name",
		"Height",
		"Weight",
		"Sex",
		"Hair colour",
		"Eyes colour",
		"Skin colour",
		"Age",
		"Alignment",
		"Faith/Deity",
		"Personality Trait",
		"Ideal",
		"Bond",
		"Flaw",
		"Background_History",
		"Background_Appearance",
		"Background_Enemies",
		"Background_Organisation",
		"Background_Faction.Text",
		"Background_FactionRank.Text",
		"Background_Renown.Text",
		"Comp.Desc.Name",
		"Comp.Desc.Sex",
		"Comp.Desc.Age",
		"Comp.Desc.Height",
		"Comp.Desc.Weight",
		"Comp.Desc.Alignment",
		"Notes.Left",
		"Notes.Right"
	];
	var tempArray = [];
	for (var F = 0; F < toExport.length; F++) {
		if (tDoc.getField(toExport[F]).type !== "checkbox" && What(toExport[F]) !== tDoc.getField(toExport[F]).defaultValue) {
			tempArray.push(toExport[F]);
		} else if (tDoc.getField(toExport[F]).type === "checkbox" && tDoc.getField(toExport[F]).isBoxChecked(0)) {
			tempArray.push(toExport[F]);
		}
	}
	return tempArray.length > 0 ? tempArray : "";
}

function MakeXFDFExport(partial) {
	if (partial !== "all") { // if given the command to only partially export
		MakeSkillsMenu_SkillsOptions(["go", "alphabeta"]); // first make sure the skills are sorted alphabetically
		var theArray = partial === "equipment" ? MakeEquipmentExportArray() : (partial === "description" ? MakeDescriptionExportArray() : MakeExportArray());
		if (!theArray) {
			app.alert("Nothing was found that was worthy to export. None of the fields that are not auto-filled seem to have anything but there default values in them. If you still want to export the settings, try exporting all field values.", 0, 0, "Nothing to Export");
			return; // stop the function, because no fields were found that are exportable
		}
		var theSettings = {aFields: theArray};
	} else {
		var theSettings = {bAllFields: true};
	}
	try {
		tDoc.exportAsXFDF(theSettings);
	} catch (err) {
		var toExport = tDoc.exportAsXFDFStr(theSettings);

		var explainTXT = "This is a work-around for Acrobat Reader. It requires a little bit more work, but otherwise you will have to get Acrobat Pro in order to do this more easily. You will be able to import the file you create into MPMB's Character Sheet version 10.2 or later.\nThe field below contains all the exported data in a XML format. All you have to do is copy this data and save it as an .xfdf file with UTF-8 encoding.";
		var explainTXT2 = app.platform === "WIN" ? "If you don't know how to do this, just follow the steps below:\n\nOn Windows:\n  1 - Open Notepad and copy the complete content of the field below into it;\n  2 - On the Notepad menu bar, select File -- Save;\n  3 - Change the file name to anything you like, as long as it ends with \".xfdf\" (instead of \".txt\");\n  4 - At Encoding, choose \"UTF-8\";\n  5 - Press Save." : " If you don't know how to do this, just follow the steps below:\n\nOn Mac:\n  1 - Open TextEdit and copy the complete content of the field below into it;\n  2 - On the TextEdit menu bar, select Format -- Make Plain Text;\n  3 - Then, on the TextEdit menu bar, select File -- Save As;\n  4 - Change the file name to anything you like, as long as it ends with \".xfdf\" (instead of \".txt\");\n  5 - At Plain Text Encoding, choose \"UTF-8\";\n  6 - Press Save.";

		var DisplayExport_dialog = {

			initialize: function(dialog) {
				dialog.load({
					"expo": toExport
				});
			},

			description : {
				name : "XFDF FILE CREATION DIALOG",
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
							char_width : 39,
							name : "Create a .xfdf file from the text below"
						}, {
							type : "static_text",
							item_id : "txt0",
							alignment : "align_fill",
							font : "dialog",
							wrap_name : true,
							char_width : 55,
							name : explainTXT
						}, {
							type : "static_text",
							item_id : "txt1",
							alignment : "align_fill",
							font : "dialog",
							wrap_name : true,
							char_width : 55,
							name : explainTXT2
						}, {
							type : "edit_text",
							item_id : "expo",
							alignment : "align_fill",
							multiline: true,
							char_height : 35,
							char_width : 55
						}, {
							type : "gap",
							height : 5
						}, ]
					}, {
						type : "ok"
					}, ]
				}, ]
			}
		}
		app.execDialog(DisplayExport_dialog);
	}
};

//add a script to be run upon start of the sheet
function AddUserScript(retResDia) {
	var theUserScripts = What("User Script").match(/(.|\r){1,65500}/g);
	if (!theUserScripts) theUserScripts = [];
	var defaultTxt = toUni("The JavaScript") + " you paste into the field below will be run now and whenever the sheet is opened, using eval(). If that script results in an error you will be informed immediately and the script will not be added to the sheet.\n" + toUni("This overwrites") + " whatever code you have previously added to the sheet using this dialog.\n" + toUni("Resetting the sheet is recommended") + " before you enter any custom content into it.";
	var defaultTxt2 = "Be warned, things you do here can break the sheet! You can ask MorePurpleMoreBetter for help using the contact bookmarks.";
	var extraTxt = toUni("A character limit of 65642") + " applies to the area below. You can add longer scripts with the \"Open Another Dialog\" button. When you press \"Add Script to Sheet\", the code of all dialogs will be joined together (with no characters put inbetween!), is subsequently run/tested and added to the sheet as a whole.";
	var extraTxt2 = "An error will result in all content being lost, so please save it somewhere else before exiting this dialog!";
	var getTxt = toUni("Pre-Written Scripts") + " can be found using the \"Get Content\" buttons.\n- MPMB has scripts for 3rd-party materials, including Matt Mercer's Blood Hunter, Gunslinger, and College of the Maestro.\n- The community has created scripts for more content, including links to all those made by MPMB.";
	var getTxt2 = toUni("Using the proper JavaScript syntax") + ", you can add homebrew classes, races, weapons, feats, spells, backgrounds, creatures, etc. etc.\nSection 3 of the " + toUni("FAQ") + " has information and links to resources about creating your own additions, as does the \"I don't get it?\" button.";
	var getTxt3 = toUni("Use the JavaScript Console") + " to better determine errors in your script (with the \"JavaScript Console\" button).";
	var diaIteration = 1;

	var tries = 0;
	var selBoxHeight = 340;
	do {
		try {
			var mons = app.monitors.primary();
			var resHigh = mons && mons[0] && mons[0].rect ? mons[0].rect[3] : false;
			if (resHigh && resHigh < 900) selBoxHeight = Math.max(100, 340 - (900 - resHigh));
			tries = 100;
		} catch (e) {
			tries += 1;
		}
	} while (tries < 5);

	var getDialog = function() {
		var diaMax = Math.max(theUserScripts.length, diaIteration);
		var moreDialogues = diaMax > diaIteration;
		var AddUserScript_dialog = {
			initScripts : theUserScripts,
			iteration : diaIteration,
			diaMax : diaMax,
			script: theUserScripts.length >= diaIteration ? theUserScripts[diaIteration - 1] : "",

			initialize: function(dialog) {
				dialog.load({
					"img1" : allIcons.import,
					"jscr" : this.script,
					"head" : "Manually add custom JavaScript that is run on startup (dialog " + this.iteration + "/" + this.diaMax + ")"
				});
				dialog.enable({
					bPre : this.iteration > 1
				});
				dialog.setForeColorRed("txtB");
				dialog.setForeColorRed("txtF");
			},
			commit: function(dialog) { // called when OK pressed
				var results = dialog.store();
				this.script = results["jscr"];
			},
			other: function(dialog) { // called when OTHER pressed
				var results = dialog.store();
				this.script = results["jscr"];
				dialog.end("next");
			},
			bFAQ: function(dialog) {
				if (getFAQ(false, true)) {
					dialog.end("bfaq");
					var results = dialog.store();
					this.script = results["jscr"];
				}
			},
			bPre: function(dialog) {
				var results = dialog.store();
				this.script = results["jscr"];
				dialog.end("bpre");
			},
			bWhy: function(dialog) { contactMPMB("how to add content"); },
			bCoC: function(dialog) { contactMPMB("community content"); },
			bCoM: function(dialog) { contactMPMB("mpmb content"); },
			bCon: function(dialog) {
				var results = dialog.store();
				this.script = results["jscr"];
				dialog.end("bcon");
			},
			description : {
				name : "MANUAL CUSTOM SCRIPT DIALOG",
				first_tab : "OKbt",
				elements : [{
					type : "view",
					align_children : "align_left",
					elements : [{
						type : "view",
						elements : [{
							type : "view",
							align_children : "align_row",
							elements : [{
								type : "image",
								item_id : "img1",
								height : 20,
								width : 20
							}, {
								type : "static_text",
								item_id : "head",
								alignment : "align_fill",
								font : "heading",
								bold : true,
								height : 21,
								width : 720
							}]
						}, {
							type : "static_text",
							item_id : "txtD",
							alignment : "align_fill",
							font : "dialog",
							wrap_name : diaIteration === 1,
							char_height : -1,
							width : 750,
							name : diaIteration !== 1 ? "" : defaultTxt
						}, {
							type : "static_text",
							item_id : "txtB",
							alignment : "align_fill",
							font : "dialog",
							bold : true,
							wrap_name : diaIteration === 1,
							char_height : -1,
							width : 750,
							name : diaIteration !== 1 ? "" : defaultTxt2
 						}, {
							type : "cluster",
							width : 750,
							font : "heading",
							bold : true,
							name : "How to get/make the JavaScript script to enter here?",
							elements : [{
								type : "view",
								align_children : "align_distribute",
								elements : [{
									type : "button",
									item_id : "bCoC",
									name : "Get Content: Community",
									font : "dialog",
									bold : true
								}, {
									type : "button",
									item_id : "bCoM",
									name : "Get Content: MPMB",
									font : "dialog",
									bold : true
								}, {
									type : "button",
									item_id : "bWhy",
									name : "I don't get it?",
									font : "dialog",
									bold : true
								}, {
									type : "button",
									item_id : "bFAQ",
									name : "Open the FAQ",
									font : "dialog",
									bold : true
								}, {
									type : "button",
									item_id : "bCon",
									name : "JavaScript Console",
									font : "dialog",
									bold : true
								}]
							}, {
								type : "static_text",
								item_id : "txtG",
								alignment : "align_fill",
								font : "dialog",
								wrap_name : true,
								width : 720,
								name : getTxt
							}, {
								type : "static_text",
								item_id : "txtH",
								alignment : "align_fill",
								font : "dialog",
								wrap_name : true,
								width : 720,
								name : getTxt2
							}, {
								type : "static_text",
								item_id : "txtI",
								alignment : "align_fill",
								font : "dialog",
								wrap_name : true,
								width : 720,
								name : getTxt3
							}]
						}, {
							type : "static_text",
							item_id : "txtE",
							alignment : "align_fill",
							font : "dialog",
							wrap_name : true,
							width : 750,
							name : extraTxt
						}, {
							type : "static_text",
							item_id : "txtF",
							alignment : "align_fill",
							font : "dialog",
							bold : true,
							wrap_name : true,
							width : 750,
							name : extraTxt2
						}, {
							type : "edit_text",
							item_id : "jscr",
							alignment : "align_fill",
							multiline: true,
							height : selBoxHeight,
							width : 750
						}, {
							type : "gap",
							height : 5
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
							other_name : "Open Another Dialog",
							ok_name : "Add Script to Sheet",
							item_id : "OKbt",
							alignment : "align_right"
						}]
					}]
				}]
			}
		};
 		if (moreDialogues) {
			setDialogName(AddUserScript_dialog, "OKbt", "type", "ok_cancel");
			setDialogName(AddUserScript_dialog, "OKbt", "ok_name", "Go to Next Dialog >>");
		};
		var theDialog = app.execDialog(AddUserScript_dialog);
		theUserScripts[diaIteration - 1] = AddUserScript_dialog.script;
		if (clean(AddUserScript_dialog.script, [" ", "\t"]).slice(-1) === "}") theUserScripts[diaIteration - 1] += ";\n";
		if (theDialog === "ok" && moreDialogues) theDialog = "next";
		return theDialog;
	};

	do {
		var askForScripts = getDialog();
		if (askForScripts === "bpre") {
			diaIteration -= 1;
		} else if (askForScripts === "bfaq") {
			getFAQ(["faq", "pdf"]);
		} else if (askForScripts === "bcon") {
			console.println("\nYour code has been copied below, but hasn't been commited/saved to the sheet!\nYou can run code here by selecting the appropriate lines and pressing " + (isWindows ? "Ctrl+Enter" : "Command+Enter") + ".\n\n" + theUserScripts.join(""));
			console.show();
		} else {
			diaIteration += 1;
		};
	} while (askForScripts !== "ok" && askForScripts !== "cancel" && askForScripts !== "bcon");

	if (askForScripts === "ok") {
		InitiateLists();
		theUserScripts = theUserScripts.join("");
		if (RunUserScript(false, theUserScripts)) {
			Value("User Script", theUserScripts);
			app.alert({
				cMsg : "Your script has been successfully added/changed in the sheet!\n\nYou will now be returned to the Source Selection Dialog so that you can choose with more detail how your script interact with the sheet.\n\nNote that once you close the Source Selection Dialog, all drop-down boxes will be updated so that your changes will be visible on the sheet. This can take some time.",
				nIcon : 3,
				cTitle : "Success!"
			});
			retResDia = "also";
		} else {
			InitiateLists();
			RunUserScript(false, false);
		};
		amendPsionicsToSpellsList();
	};
	if (retResDia) resourceDecisionDialog(false, false, retResDia === "also"); // return to the Dialog for Selecting Resources
};

// Run the custom defined user scripts, if any exist
function RunUserScript(atStartup, manualUserScripts) {
	var ScriptsAtEnd = [];
	var ScriptAtEnd = [];
	var minSheetVersion = [0, ""];
	var RunFunctionAtEnd = function(inFunction) {
		if (inFunction && typeof inFunction === "function") ScriptAtEnd.push(inFunction);
	};
	var runIt = function(aScript, scriptName, isManual) {
		var RequiredSheetVersion = function(inNumber) {
			if (atStartup) return;
			var minSemVers = /-|\+|beta/i.test(inNumber.toString()) ? inNumber.toString().replace(/^\D+/, "").replace(/([^\-])\.?beta/, "$1-beta") : getSemVers(inNumber);
			var testNmbr = semVersToNmbr(minSemVers);
			if (testNmbr > minSheetVersion[0]) minSheetVersion = [testNmbr, minSemVers];
		};
		try {
			IsNotUserScript = false;
			ScriptAtEnd = [];
			minSheetVersion = [0, ""];
			eval(aScript);
			IsNotUserScript = true;
			if (ScriptAtEnd.length > 0) ScriptsAtEnd = ScriptsAtEnd.concat(ScriptAtEnd);
			if (sheetVersion < minSheetVersion[0]) {
				var failedTestMsg = {
					cMsg : 'The script "' + scriptName + '" says it was made for a newer version of the sheet (v' + minSheetVersion[1] + "), and might thus not be compatible with this version of the sheet (v" + semVers + ").\n\nDo you want to continue using this script in the sheet? If you select no, the script will be removed.\n\nNote that you can update to the newer version of the sheet with the 'Get the Latest Version' bookmark!",
					nIcon : 2,
					cTitle : "Script was made for newer version!",
					nType : 2
				};
				if (app.alert(failedTestMsg) !== 4) return false;
			};
			return true;
		} catch (e) {
			if ((/out of memory/i).test(e.toSource())) return "outOfMemory";
			IsNotUserScript = true;
			var forNewerVersion = sheetVersion < minSheetVersion[0];
			var wrongVersion = forNewerVersion ? " says it was made for a newer version of the sheet (v" + minSheetVersion[1] + "; this sheet is only v" + semVers + "). That is probably why " : " is faulty, ";
			app.alert({
				cMsg : isManual ? "The script you entered" + wrongVersion + "it returns the following error when run:\n\"" + e + "\"\n\nYour script has not been added to the sheet, please try again after fixing the problem.\n\nIf you run your code from the console, it will give you a line number for where the error is. You can open this console from inside the \"Add Custom Script\" dialog." : 'The script "' + scriptName + '"' + wrongVersion + "it returns the following error when run:\n\"" + e + "\"\n\nThe script has been removed from this pdf.\n\nFor a more specific error, that includes the line number of the error, try running the script from the JavaScript console (with the 'JS Console' button).",
				nIcon : 0,
				cTitle : forNewerVersion ? "Script was made for newer version!" : "Error in running user script"
			});
			return false;
		};
	};

	// first run the code added by importing whole file(s)
	var scriptsResult = true;
	var changesInFilesScript = false;
	for (var iScript in CurrentScriptFiles) {
		var runIScript = runIt(CurrentScriptFiles[iScript], iScript);
		if (!runIScript) {
			delete CurrentScriptFiles[iScript];
			changesInFilesScript = true;
			scriptsResult = runIScript;
		} else if (runIScript == "outOfMemory") {
			break;
		}
	};
	if (changesInFilesScript) SetStringifieds("scriptfiles");

	// secondly, run the manually added code
	var manualScript = manualUserScripts ? manualUserScripts : What("User Script");
	if (manualScript) {
		var manualScriptResult = runIt(manualScript, "manually entered using using the text dialog", manualUserScripts);
		if (!manualScriptResult) {
			if (manualUserScripts) return false;
			tDoc.resetForm(["User Script"]);
		}
	};

	// run the functions that are meant to be saved till the very end of all the scripts
	if (ScriptsAtEnd.length > 0) {
		var functionErrors = [];
		IsNotUserScript = false;
		for (var i = 0; i < ScriptsAtEnd.length; i++) {
			try { ScriptsAtEnd[i](); } catch (err) {
				functionErrors.push('The function starting with "' + ScriptsAtEnd[i].toString().slice(0,100) + '"\ngave the error:' + err);
			};
		};
		IsNotUserScript = true;
		if (!atStartup && functionErrors.length > 0) {
			app.alert({
				cMsg : "One or more of the script you entered has a 'RunFunctionAtEnd()' statement. One or more of those functions gave an error. The sheet can't tell you which of those gave an error exactly, but it can tell you what the errors are:\n\n" + functionErrors.join("\n\n"),
				nIcon : 0,
				cTitle : "Error in RunFunctionAtEnd() from user script(s)"
			});
		};
	};

	// fix wrong reference (common mistake when adding classes)
	deleteUnknownReferences();

	// when run at startup and one of the script fails, update all the dropdowns
	if (manualScriptResult == "outOfMemory" || runIScript == "outOfMemory") {
		outOfMemoryErrorHandling(atStartup);
	} else if (atStartup && (!scriptsResult || !manualScriptResult)) {
		UpdateDropdown("resources");
	} else if (!atStartup && manualUserScripts) { // i.e. run to test manual import with RunUserScript(false, Script);
		return manualScriptResult;
	} else if (!atStartup && !manualUserScripts) { // i.e. run to test file import with RunUserScript(false, false);
		return scriptsResult;
	};
};

// Fix a common mistake in adding classes, having subclass references that don't work
function deleteUnknownReferences() {
	// Loop through all classes
	for (var sClass in ClassList) {
		var oClass = ClassList[sClass];
		// If the subclasses attribute doesn't exist or is malformed, fix it
		if (!oClass.subclasses || !isArray(oClass.subclasses) || !isArray(oClass.subclasses[1])) {
			oClass.subclasses = [
				oClass.subclasses[0] && typeof oClass.subclasses[0] === "string" ? oClass.subclasses[0] : "Archetype",
				[]
			];
			continue;
		}
		// Loop through all the subclasses from end to start and delete any that don't exist in the ClassSubList object and any duplicates
		var arrDupl = [];
		for (var i = oClass.subclasses[1].length - 1; i >= 0; i--) {
			var sSubcl = oClass.subclasses[1][i];
			if (!ClassSubList[sSubcl] || arrDupl.indexOf(sSubcl) !== -1) {
				oClass.subclasses[1].splice(i, 1);
			} else {
				arrDupl.push(sSubcl);
			}
		}
	}
}

// Define some custom import script functions as document-level functions so custom scripts including these can still be run from console
function RequiredSheetVersion(inNumber) {
	var minSemVers = /-|beta|\+/i.test(inNumber.toString()) ? inNumber.toString().replace(/^\D+/, "").replace(/([^\-])\.?beta/, "$1-beta") : getSemVers(inNumber);
	var testNmbr = semVersToNmbr(minSemVers);
	if (sheetVersion < testNmbr) {
		app.alert({
			cMsg : "The RequiredSheetVersion() function in your script suggests that the script is made for a newer version, v" + minSemVers + ", of MPMB's Character Record Sheets.\nBe aware that this sheet is only v" + semVers + " and might thus not work properly.\nAlternatively, you might not be using the RequiredSheetVersion() function incorrectly.",
			nIcon : 2,
			cTitle : "Script was made for newer version!"
		});
	}
};
function RunFunctionAtEnd(inFunc) {
	if (!inFunc && typeof inFunc !== "function") return;
	var funcstart = inFunc.toString().replace(/function *\([^)]*\) *{(\r\n)*\t*/i,"").substr(0,50);
	app.alert({
		cMsg : "The script you are running from the console contains the function RunFunctionAtEnd(). This function can be exectured from the console, but will be executed immediately after you close this dialog, and not at the end of all the code you are trying to run from console. When you import this script as a file, or manually paste it into the dialog for scripts, it will be run at the end of all scripts as intended.\n\nAfter clicking 'OK', the function will be run that starts with the following:\n\t\"" + funcstart + "...\"",
		nIcon : 1,
		cTitle : "RunFunctionAtEnd() works different when executed from the console"
	});
	try {
		inFunc();
	} catch(e) {
		app.alert({
			cMsg : "The function entered in 'RunFunctionAtEnd()', that starts with:\n\t\"" + funcstart + "...\"\nproduces the following error, which might be because it was executed from the console:\n\n" + e,
			nIcon : 0,
			cTitle : "Error in RunFunctionAtEnd() from user script(s)"
		});
	};
};

// a way to add a racial variant without conflicts
function AddRacialVariant(race, variantName, variantObj) {
	race = race.toLowerCase();
	variantName = variantName.toLowerCase();
	if (!RaceList[race]) return;
	if (!RaceList[race].variants || !isArray(RaceList[race].variants)) RaceList[race].variants = [];
	var suffix = 1;
	while (RaceList[race].variants.indexOf(variantName) !== -1) {
		suffix += 1;
		variantName += suffix;
	};
	RaceList[race].variants.push(variantName);
	RaceSubList[race + "-" + variantName] = variantObj;
};

// a way to add a subclass without conflicts
function AddSubClass(iClass, subclassName, subclassObj) {
	iClass = iClass.toLowerCase();
	subclassName = subclassName.toLowerCase();
	if (!ClassList[iClass]) return;
	var suffix = 1;
	var fullScNm = iClass + "-" + subclassName;
	while (ClassList[iClass].subclasses[1].indexOf(fullScNm) !== -1 || ClassSubList[fullScNm]) {
		suffix += 1;
		fullScNm += suffix;
	};
	ClassList[iClass].subclasses[1].push(fullScNm);
	ClassSubList[fullScNm] = subclassObj;
	return fullScNm;
};

// a way to add a background variant without conflicts
function AddBackgroundVariant(background, variantName, variantObj) {
	background = background.toLowerCase();
	variantName = variantName.toLowerCase();
	if (!BackgroundList[background]) return;
	if (!BackgroundList[background].variant || !isArray(BackgroundList[background].variant)) BackgroundList[background].variant = [];
	var suffix = 1;
	var fullBvNm = background + "-" + variantName;
	while (BackgroundList[background].variant.indexOf(fullBvNm) !== -1) {
		suffix += 1;
		fullBvNm += suffix;
	};
	BackgroundList[background].variant.push(fullBvNm);
	BackgroundSubList[fullBvNm] = variantObj;
};

// A way to add an (extra)choice to a class feature / racial feature / feat / magic item
/* Input Valiables Definition
	pObj    parent object, e.g. ClassList.warlock.features["eldritch invocations"]
	cType   type of choice, false for `choice`, true for `extrachoice`
	cName   name of the choice as it will appear in the menu (with capitalisation)
	cObj    the choice object
	force   if != false, force creation of the (extra)choices array
	        if cType == true, use the force string for the extraname
	bSort	if != false sort the array after the choice was added
			Not for class features, where (extra)choices arrays are sorted before displaying the menu,
			but good for magic items, where the arrays are never sorted automatically.
*/
function AddFeatureChoice(pObj, cType, cName, cObj, force, bSort) {
	if (!pObj) return; // parent object doesn't exist
	var aObj = pObj; // the object where the (extra)choice will be added to
	var cNameLC = cName.toLowerCase();
	cType = cType ? "extrachoices" : "choices";
	if (!pObj[cType]) { // choice array doesn't exist
		if (!force) return; // no choice array and not forced, so quit now
		if (cType === "extrachoices" && typeof force == "string") {
			FixAutoSelForceChoices(pObj);
			if (pObj.choiceSetsExtrachoices) {
				pObj.extrachoicesRemember = [];
			}
			if (pObj.choices && pObj.defaultChoice) {
				pObj.choiceSetsExtrachoices = true;
				aObj = pObj[pObj.defaultChoice];
			}
			if (!aObj.extraname) aObj.extraname = force;
		}
		aObj[cType] = [];
	}
	// Stop if adding something that already exists, so no reason to continue
	if (aObj[cNameLC] && aObj[cNameLC].toSource() == cObj.toSource()) return;
	// when adding a new choice that contains extrachoices of its own
	if (cType === "choices") {
		if (cObj.extrachoices) {
			// copy the extrachoices for remembering the original value, if any
			if (pObj.extrachoices && !pObj.extrachoicesRemember) {
				pObj.extrachoicesRemember = pObj.extrachoices;
				pObj.extranameRemember = pObj.extraname;
				pObj.extraTimesRemember = pObj.extraTimes;
			}
			pObj.choiceSetsExtrachoices = true;
		}
		// also do something if it contains autoSelectExtrachoices
		if (cObj.autoSelectExtrachoices) {
			if (pObj.autoSelectExtrachoices && !pObj.autoSelectExtrachoicesRemember) {
				pObj.autoSelectExtrachoicesRemember = pObj.autoSelectExtrachoices;
			}
			FixAutoSelForceChoices(pObj, false, cObj);
		}
	}
	// See if something by its name already exists and amend it, if so
	var useName = cName;
	var suffix = 1;
	while (aObj[cType].indexOf(useName) !== -1 || aObj[useName.toLowerCase()]) {
		suffix += 1;
		useName = cName + " [" + suffix + "]";
	};
	// Add the new (extra)choice
	aObj[cType].push(useName);
	if (bSort) aObj[cType].sort();
	if (cType === "extrachoices" && aObj.extrachoicesRemember) pObj.extrachoicesRemember.push(useName);
	aObj[useName.toLowerCase()] = cObj;
}
// --- backwards compatibility --- //
function AddWarlockInvocation(invocName, invocObj) { // Add a warlock invocation
	AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, invocName, invocObj);
};
function AddWarlockPactBoon(boonName, boonObj) { // Add a warlock pact boon
	AddFeatureChoice(ClassList.warlock.features["pact boon"], false, boonName, boonObj);
};

// a way to add fighting styles to multiple classes; fsName is how it will appear in the menu
function AddFightingStyle(classArr, fsName, fsObj) {
	if (classArr.indexOf("ranger") !== -1 && classArr.indexOf("rangerua") == -1 && ClassList["rangerua"]) classArr.push("rangerua");
	for (var i = 0; i < classArr.length; i++) {
		var aClass = ClassList[classArr[i]];
		var sClass = ClassSubList[classArr[i]];
		if (aClass) {
			AddFeatureChoice(aClass.features["fighting style"], false, fsName, fsObj);
			if (classArr[i] === "fighter" && ClassSubList["fighter-champion"]) {
				AddFeatureChoice(ClassSubList["fighter-champion"].features["subclassfeature10"], false, fsName, fsObj);
			}
		} else if (sClass) {
			for (var clFea in sClass.features) {
				var sFea = sClass.features[clFea];
				if (sFea.choices && (/^(?=.*fighting)(?=.*style).*$/i).test(sFea.name)) {
					AddFeatureChoice(sClass.features[clFea], false, fsName, fsObj);
				}
			}
		}
	};
};

// make an existing class feature into a feature with choices, and add the original as a default choice
function CreateClassFeatureVariant(clName, clFea, varName, varObj) {
	if (ClassList[clName] && ClassList[clName].features[clFea]) {
		var aFea = ClassList[clName].features;
	} else if (ClassSubList[clName] && ClassSubList[clName].features[clFea]) {
		var aFea = ClassSubList[clName].features;
	} else {
		return;
	}
	if (!aFea[clFea].choices) {
		// Create a new choice system, with the 'normal' feature as a choice that is selected by default
		var origFea = newObj(aFea[clFea]);
		var choiceNm = "\x1B[original] " + origFea.name;
		var choiceNmLC = choiceNm.toLowerCase();
		aFea[clFea] = {
			name : origFea.name + " or a Variant",
			source: origFea.source,
			minlevel : origFea.minlevel,
			description : '\n   Select ' + origFea.name + ' or a variant using the "Choose Feature" button above',
			choices : [choiceNm],
			defaultChoice : choiceNmLC,
			choiceSetsExtrachoices : origFea.extrachoices ? true : false
		}
		aFea[clFea][choiceNmLC] = origFea;
		if (origFea.autoSelectExtrachoices) {
			aFea[clFea].autoSelectExtrachoices = origFea.autoSelectExtrachoices;
			FixAutoSelForceChoices(aFea[clFea], origFea.extraname, origFea);
		}
		if (origFea.extrachoices) {	
			// add the extrachoices offered in the choice to the parent object
			for (var i = 0; i < origFea.extrachoices.length; i++) {
				var xtrStr = origFea.extrachoices[i].toLowerCase();
				if (origFea[xtrStr]) aFea[clFea][xtrStr] = origFea[xtrStr];
			}
		}
	}
	AddFeatureChoice(aFea[clFea], false, varName, varObj);
}

// Fix autoSelectExtrachoices
function FixAutoSelForceChoices(pObj, sExtraname, cObj) {
	if (!pObj.autoSelectExtrachoices) return;
	if (!isArray(pObj.autoSelectExtrachoices)) pObj.autoSelectExtrachoices = [pObj.autoSelectExtrachoices];
	for (var i = 0; i < pObj.autoSelectExtrachoices.length; i++) {
		var aObj = pObj.autoSelectExtrachoices[i];
		if (!aObj || !aObj.extrachoice) continue;
		// make sure the parent object has the extrachoice as an attribute
		if (cObj && cObj[aObj.extrachoice] && !pObj[aObj.extrachoice]) {
			pObj[aObj.extrachoice] = cObj[aObj.extrachoice];
		} else if (!pObj[aObj.extrachoice]) {
			continue;
		}
		// force the extraname per object, so it is never taken from the parent object
		if (!pObj[aObj.extrachoice].extraname && !aObj.extraname) {
			aObj.extraname = sExtraname ? sExtraname : pObj.extraname;
		}
	}
}

// side-loading a file and adding it to the field for safe-keeping
function ImportUserScriptFile(filePath) {
	// open the dialog to select the file or URL
	var iFileStream = filePath ? util.readFileIntoStream(filePath) : util.readFileIntoStream();
	if (!iFileStream) return false;
	var iFileCont = util.stringFromStream(iFileStream);
	if ((/<(!DOCTYPE )?html/i).test(iFileCont)) {
		// Import is probably an HTML file, lets try and get the JavaScript from it in case it's from GitHub or PasteBin
		var htmlAttr = {
			github : {
				"class" : "data",
				"nodeNm" : "table"
			},
			pastebin : {
				"class" : "textarea",
				"nodeNm" : "#text"
			}
		}
		var knownHTML = (/github/i).test(iFileCont) ? "github" : (/pastebin/i).test(iFileCont) ? "pastebin" : false;
		if (knownHTML) {
			try {
				var scriptContent = "", fndNode;
				var aDom = new Dom(iFileCont);
				var jsElem = aDom.getElementsByClassName(htmlAttr[knownHTML].class);
				if (jsElem.length !== 1) throw "didn't work as expected";
				for (var i = 0; jsElem[0].childNodes.length; i++) {
					if (jsElem[0].childNodes[i].nodeName == htmlAttr[knownHTML].nodeNm) {
						fndNode = jsElem[0].childNodes[i];
						scriptContent = decodeXml(fndNode.textContent).replace(/^\s+|\s+$/, '');
						break;
					}
				}
				if ( !scriptContent || ( /view raw/i.test(scriptContent) && /href=("|').*?raw=true\1/i.test(jsElem[0].innerHTML) ) ) {
					throw "didn't work as expected";
				} else if (knownHTML === "github") {
					scriptContent = scriptContent.replace(/(\n )+/g, '\n');
				}
				iFileCont = scriptContent;
			} catch (error) {
/* Uncomment for testing
				var eText = "Error importing HTML from " + knownHTML + ": " + error;
				for (var e in error) eText += "\n " + e + ": " + error[e];
				console.println(eText);
				console.show();
*/
				knownHTML = false;
			}
		}
		if (!knownHTML) {
			app.alert({
				cTitle : "Please select a JavaScript file",
				cMsg : "The file you imported is an HTML document (a website). Please make sure that the file you select to import is JavaScript.\n\nYou can create a JavaScript file by copying code, pasting it into your favourite plain-text editor (such as Notepad on Windows), and subsequently saving it. You don't necessarily need the .js file extension for the file to be importable into this character sheet." + (!isWindows ? "" : "\n\nNote that you can input a URL into the 'Open file' dialog, but that URL has to point to a plain code file. A good example of a URL that points to a plain code file is the URL you are send to when you select the 'Raw' option on GitHub: https://raw.githubusercontent.com/") + "\n\nThe file you selected will not be imported.",
				nIcon : 1
			});
			return false;
		}
	};
	var iFileName = iFileCont.match(/iFileName ?= ?("|')(.*?[^\\])\1/);
	if (iFileName) {
		iFileName = iFileName[2].replace(/\\/g, "");
		var iFileNameLC = iFileName.toLowerCase();
		var useFileName = util.printd("yyyy/mm/dd", new Date()) + " - " + iFileName
	} else {
		var useFileName = util.printd("yyyy/mm/dd HH:mm", new Date()) + " - " + "no iFileName";
	}
	var iFileNameMatch = false;
	if (iFileName) {
		for (var aFileName in CurrentScriptFiles) {
			var endFileName = aFileName.replace(/\d+\/\d+\/\d+ - /, "");
			if (endFileName.toLowerCase() === iFileNameLC) {
				iFileNameMatch = aFileName;
				break;
			};
		};
	};
	if (iFileNameMatch && CurrentScriptFiles[iFileNameMatch]) {
		var askToOverwrite = {
			cMsg : "There is already a file by the name \"" + endFileName + "\", do you want to overwrite it?\n\nIf you select 'No', the file will not be changed.",
			nIcon : 2, //question mark
			cTitle : "File already exists, overwrite it?",
			nType : 2, //Yes-No
		};
		if (app.alert(askToOverwrite) !== 4) return false;
		delete CurrentScriptFiles[iFileNameMatch];
	};
	CurrentScriptFiles[useFileName] = iFileCont;
	SetStringifieds("scriptfiles");
	return true;
};

// Open the dialog for importing whole files with content
function ImportScriptFileDialog(retResDia) {
	var defaultTxt = "Import or delete files that add content and/or custom scripts to the sheet.";
	var defaultTxt2 = "In modern operating systems, you can enter a URL in the 'Open' dialog directly instead of first downloading a file and then navigating to it.";
	var defaultTxt3 = "Use the \"Get Content\" buttons below to get pre-written files!";
	var getTxt2 = toUni("Using the proper JavaScript syntax") + ", you can add homebrew classes, races, weapons, feats, spells, backgrounds, creatures, etc. etc.\nSection 3 of the " + toUni("FAQ") + " has information and links to resources about creating your own additions, as does the \"I don't get it?\" button.";
	var getTxt = toUni("Pre-Written Scripts") + " can be found using the \"Get Content\" buttons.\n- MPMB has scripts for 3rd-party materials, including Matt Mercer's Blood Hunter, Gunslinger, and College of the Maestro.\n- The community has created scripts for more content, including links to all those made by MPMB.";
	var getTxt3 = toUni("Use the JavaScript Console") + " to better determine errors in your script (with the \"JavaScript Console\" button).";
	var filesScriptRem = What("User_Imported_Files.Stringified");
	var dialogObj = {};
	for (var scriptFile in CurrentScriptFiles) {
		dialogObj[scriptFile] = -1;
	};

	var AddScriptFiles_dialog = {
		initialize: function(dialog) {
			dialog.load({
				img1 : allIcons.import,
				scrF : dialogObj,
				head : defaultTxt
			});
			dialog.setForeColorRed("txtB");
			dialog.enable({
				bRem : false,
				bSee : false
			});
		},
		commit: function(dialog) {},
		bFAQ: function(dialog) {
			if (getFAQ(false, true)) {
				dialog.end("bfaq");
				var results = dialog.store();
				this.script = results["jscr"];
			}
		},
		bWhy: function(dialog) { contactMPMB("how to add content"); },
		bCoC: function(dialog) { contactMPMB("community content"); },
		bCoM: function(dialog) { contactMPMB("mpmb content"); },
		bCon: function(dialog) {
			var results = dialog.store();
			this.script = results["jscr"];
			dialog.end("bcon");
		},
		scrF: function(dialog) {
			var allElem = dialog.store()["scrF"];
			var remElem = GetPositiveElement(allElem);
			if (remElem) {
				var remElemNm = remElem.length > 50 ? remElem.substr(0,50) + "..." : remElem;
				dialog.load({
					bRem : "DELETE " + remElemNm,
					bSee : "SEE CONTENT of " + remElemNm
				});
				dialog.enable({
					bRem : true,
					bSee : true
				});
			};
		},
		bAdd: function(dialog) {
			ImportUserScriptFile();
			var dialogObj = {};
			for (var scriptFile in CurrentScriptFiles) {
				dialogObj[scriptFile] = -1;
			};
			dialog.load({
				"scrF" : dialogObj,
				bRem : "DELETE selected file",
				bSee : "SEE CONTENT of selected file"
			});
			dialog.enable({
				bRem : false,
				bSee : false
			});
		},
		removeOrSee: function(dialog, deleteIt) {
			var allElem = dialog.store()["scrF"];
			var fndElem = GetPositiveElement(allElem);
			if (!fndElem) return;
			if (CurrentScriptFiles[fndElem]) {
				if (deleteIt) {
					delete CurrentScriptFiles[fndElem];
					SetStringifieds("scriptfiles");
				} else {
					ShowDialog("Content of '" + fndElem + "'", CurrentScriptFiles[fndElem]);
				}
			} else {
				app.alert("The name '" + fndElem + "' in the dialog was not found in any of the scripts the sheet. It will be removed from the dialog, but nothing in the sheet will change.");
				deleteIt = true;
			};
			if (deleteIt) {
				delete allElem[fndElem];
				dialog.load({ scrF : allElem });
			}
		},
		bRem: function(dialog) { this.removeOrSee(dialog, true); },
		bSee: function(dialog) { this.removeOrSee(dialog, false); },
		description : {
			name : "IMPORT CUSTOM SCRIPT DIALOG",
			first_tab : "OKbt",
			elements : [{
				type : "view",
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
							width : 720
						}]
					}, {
						type : "cluster",
						font : "heading",
						bold : true,
						name : "Current files with JavaScript additions",
						align_children : "align_row",
						elements : [{
							width : 300,
							height : 150,
							type : "hier_list_box",
							item_id : "scrF"
						}, {
							type : "view",
							elements : [{
								type : "view",
								align_children : "align_row",
								elements : [{
									type : "button",
									item_id : "bAdd",
									name : "Add file",
									font : "heading",
									bold : true
								}, {
									type : "static_text",
									item_id : "txtT",
									alignment : "align_fill",
									font : "dialog",
									bold : true,
									wrap_name : true,
									width : 300,
									name : defaultTxt2
								}]
							}, {
								type : "button",
								item_id : "bRem",
								name : "DELETE selected file",
								width : 380
							}, {
								type : "button",
								item_id : "bSee",
								name : "SEE CONTENT of selected file",
								width : 380
							}, {
								type : "static_text",
								item_id : "txtB",
								alignment : "align_fill",
								font : "dialog",
								bold : true,
								wrap_name : true,
								width : 380,
								name : defaultTxt3
							}]
						}]
					}, {
						type : "cluster",
						font : "heading",
						bold : true,
						name : "How to get/make the JavaScript files to enter here?",
						elements : [{
							type : "view",
							alignmen : "align_fill",
							align_children : "align_row",
							width : 730,
							elements : [{
								type : "button",
								item_id : "bCoC",
								name : "Get Content: Community",
								font : "dialog",
								bold : true
							}, {
								type : "button",
								item_id : "bCoM",
								name : "Get Content: MPMB",
								font : "dialog",
								bold : true
							}, {
								type : "button",
								item_id : "bWhy",
								name : "I don't get it?",
								font : "dialog",
								bold : true
							}, {
								type : "button",
								item_id : "bFAQ",
								name : "Open the FAQ",
								font : "dialog",
								bold : true
							}, {
								type : "button",
								item_id : "bCon",
								name : "JavaScript Console",
								font : "dialog",
								bold : true
							}]
						}, {
							type : "static_text",
							item_id : "txtC",
							alignment : "align_fill",
							font : "dialog",
							wrap_name : true,
							width : 720,
							name : getTxt
						}, {
							type : "static_text",
							item_id : "txtD",
							alignment : "align_fill",
							font : "dialog",
							wrap_name : true,
							width : 720,
							name : getTxt2
						}, {
							type : "static_text",
							item_id : "txtE",
							alignment : "align_fill",
							font : "dialog",
							wrap_name : true,
							width : 720,
							name : getTxt3
						}]
					}]
				}, {
					item_id : "OKbt",
					type : "ok_cancel",
					ok_name : "Apply changes",
					cancel_name : "Cancel changes"
				}]
			}]
		}
	};


	do {
		var scriptFilesDialog = app.execDialog(AddScriptFiles_dialog);
		if (scriptFilesDialog === "bfaq") {
			getFAQ(["faq", "pdf"]);
		} else if (scriptFilesDialog === "bcon") {
			console.println("\nAny changes you made in the import script files dialog have not been applied!\nYou can run code here by pasting it in, selecting the appropriate lines and pressing " + (isWindows ? "Ctrl+Enter" : "Command+Enter") + ".");
			console.show();
		};
	} while (scriptFilesDialog !== "ok" && scriptFilesDialog !== "bCon" && scriptFilesDialog !== "cancel");

	if (scriptFilesDialog === "ok") {
		if (filesScriptRem !== What("User_Imported_Files.Stringified")) { // only do something if anything changed!
			InitiateLists();
			var runScriptsTest = RunUserScript(false, false);
			if (!runScriptsTest) { // the scripts failed, so run them again just to be sure that no rogue elements end up in the variables
				InitiateLists();
				RunUserScript(false, false);
			}
			amendPsionicsToSpellsList();
			if (filesScriptRem !== What("User_Imported_Files.Stringified") || runScriptsTest) {
				retResDia = "also";
				app.alert({
					cMsg : (runScriptsTest ? "All" : "Some") + " of the script file(s) have been " + (runScriptsTest ? "successfully " : "") + "changed in the sheet!\n\nYou will now be returned to the Source Selection Dialog so that you can choose with more detail how your script interact with the sheet.\n\nNote that once you close the Source Selection Dialog, all drop-down boxes will be updated so that your changes will be visible on the sheet. This can take some time.",
					nIcon : 3,
					cTitle : runScriptsTest ? "Success!" : "Partial success"
				});
			};
		};
	} else {
		Value("User_Imported_Files.Stringified", filesScriptRem);
		CurrentScriptFiles = eval(filesScriptRem);
	};
	if (retResDia) resourceDecisionDialog(false, false, retResDia === "also"); // return to the Dialog for Selecting Resources
};

// Open the menu to import materials
function ImportScriptOptions(input) {
	var MenuSelection = input ? input : getMenu("importscripts");
	if (MenuSelection === undefined || MenuSelection[0] === "nothing") return;
	switch (MenuSelection[2]) {
		case "file" :
			ImportScriptFileDialog(MenuSelection[3]);
			break;
		case "manual" :
			AddUserScript(MenuSelection[3]);
			break;
		case "onlinehelp" :
			contactMPMB("how to add content");
			break;
		case "content" :
			contactMPMB("community content");
			break;
	};
};
