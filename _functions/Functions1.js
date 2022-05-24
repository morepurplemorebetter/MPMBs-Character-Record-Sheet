function MakeDocName() {
	return "MorePurpleMoreBetter's D&D 5th edition " + (tDoc.info.SpellsOnly ? "Complete " + tDoc.info.SpellsOnly.capitalize() + " Spell Sheet" : (tDoc.info.AdvLogOnly ? "Adventure Logsheet" : "Character Record Sheet")) + " v" + semVers + " (" + tDoc.info.SheetType + ")";
};

function MakeButtons() {
	CreateIcons();
	try {
		if (!tDoc.info.SpellsOnly) {
			app.addToolButton({
				cName : "LayoutButton",
				cExec : minVer ? "MakeAdvLogMenu_AdvLogOptions(true);" : "MakePagesMenu(); PagesOptions();",
				oIcon : allIcons.layout,
				cTooltext : toUni("Set Pages Layout") + "\nSelect which pages are visible in the sheet and set the different lay-out options on those pages. Some pages might offer extra options on the page itself.\n\nNote that you can have multiple instances of the following pages:\n   \u2022  Companion page;\n   \u2022  Notes page;\n   \u2022  Wild Shapes page;\n   \u2022  Spell Sheet page.;\n   \u2022  Adventure Logsheet.\n\nIf you add more pages or you hide/show the pages many times, the file size might increase.",
				nPos : 0,
				cLabel : "Layout"
			});
		}
		if (!minVer) {
			app.addToolButton({
				cName : "ResetButton",
				cExec : "ResetAll();",
				oIcon : allIcons.reset,
				cTooltext : toUni("Reset") + "\nReset the entire sheet and all form fields to their initial value.",
				nPos : 1,
				cLabel : "Reset"
			});
		}
		if (!tDoc.info.AdvLogOnly) {
			app.addToolButton({
				cName : "ImportExportButton",
				cExec : "ImportExport_Button();",
				oIcon : allIcons.import,
				cTooltext :  minVer ? toUni("Add Custom Script") + "\nAdd a script to add new spells, modify spells and more, see FAQ." : toUni("Import / Export") + "\n \u2022  Import all the information from an old sheet directly;\n \u2022  Add custom script, see FAQ;\n \u2022  Alternatively, you can import or export data with the .xfdf file format. This method is depreciated, but might still be interesting if you only want to import the equipment sections or only the description sections.\n\nThe description sections include the top of first page, background page, notes, and companion description.",
				nPos : 2,
				cLabel : "Import"
			});
			app.addToolButton({
				cName : "SourcesButton",
				cExec : "resourceDecisionDialog();",
				oIcon : allIcons.sources,
				cTooltext : toUni("Select Sources") + "\nOpen a dialog where you can select which sourcebooks and materials the sheet is allowed to use and which it has to excluded from the automation." + (this.info.SpellsOnly ? "\n\nHere you can select which sources are used for the spells or even exclude certain spells or spell schools. After you have set this, you will have to manually re-generate the spell sheet using the 'Spells' button/bookmark." : "\n\nHere you can make the sheet include all Unearthed Arcana material or even have the sheet exclude certain classes, races, spells, etc. etc.\n\nYou are advised to set the sources before filling out the sheet as it may cause certain fields to be reset."),
				nPos : 3,
				cLabel : "Sources"
			});
		}

		if (!tDoc.info.SpellsOnly) {
			app.addToolButton({
				cName : "SetTextOptionsButton",
				cExec : "MakeTextMenu_TextOptions();",
				oIcon : allIcons.textsize,
				cTooltext : toUni("Text Options") + "\nWith this button you can:\n   \u2022  Set the font of all fillable fields" + "\n   \u2022  Set the font size of fields with multiple lines;\n   \u2022  Hide\/show the text lines on all pages" + (!typePF ? "" : ";\n   \u2022  Switch between boxes or lines for single-line fields."),
				nPos : 4,
				cLabel : "Text"
			});
		}

		if (!minVer) {
			app.addToolButton({
				cName : "ClassesButton",
				cExec : "SelectClass();",
				oIcon : allIcons.classes,
				cTooltext : toUni("Set Character Classes") + "\nOpen a pop-up dialog where you can set the classes, subclasses, and levels the character has.\n\nYou get drop-down boxes for selecting a class and its subclass, and can test what text you enter is being recognized as what class/subclass.",
				nPos : 5,
				cLabel : "Class"
			});
			app.addToolButton({
				cName : "SetToManualButton",
				cExec : "SetToManual_Button();",
				oIcon : allIcons.automanual,
				cTooltext : toUni("Auto / Manual") + "\nSwitch between manual or automatic calculation\/implementation of:\n   \u2022  Attacks;\n   \u2022  Background;\n   \u2022  Class;\n   \u2022  Feats;\n   \u2022  Race.",
				nPos : 6,
				cLabel : "Manual"
			});
			app.addToolButton({
				cName : "WeightToCalcButton",
				cExec : "WeightToCalc_Button();",
				oIcon : allIcons.weight,
				cTooltext : toUni("Weight Calculation") + "\nOpen the Total Weight dialog where you can choose what is and what is not counted towards the Total Weight on the second page.\n\nIn the dialog you can also select which encumbrance rules to use.",
				nPos : 7,
				cLabel : "Weight"
			});
			app.addToolButton({
				cName : "AbilityScoresButton",
				cExec : "AbilityScores_Button();",
				oIcon : allIcons.scores,
				cTooltext : toUni("Ability Scores") + "\nOpen the Ability Scores dialog where you can set them using their separate parts, see the Point Buy value, and apply a magic item that overrides.\n\nThis dialog also gives the option to add Honor/Sanity.",
				nPos : 8,
				cLabel : "Scores"
			});
			app.addToolButton({
				cName : "BlueTextButton",
				cExec : "ToggleBlueText();",
				oIcon : allIcons.modifiers,
				cTooltext : toUni("Modifier Fields") + "\nHide\/show fields where you can manually add modifiers for:\n   \u2022  Ability save DC;\n   \u2022  Attacks to hit and damage bonusses;\n   \u2022  Attacks damage die;\n   \u2022  Proficiency bonus, or the use of proficiency dice;\n   \u2022  Saves;\n   \u2022  Skills, with Jack of All Trades and Remarkable Athlete;\n   \u2022  Number of spell slots;\n   \u2022  Initiative;\n   \u2022  Carrying capacity multiplier;\n   \u2022  Weights of armor, shield, weapons, and ammunition.\n\nThese are the so-called \"blue text fields\" and they won't print, even when they are visible.",
				cMarked : "event.rc = CurrentVars.bluetxt;",
				nPos : 9,
				cLabel : "Mods"
			});
		}

		if (!tDoc.info.AdvLogOnly) {
			app.addToolButton({
				cName : "SpellsButton",
				cExec : "MakeSpellMenu_SpellOptions();",
				oIcon : allIcons.spells,
				cTooltext : toUni("Spells Options") + "\nGet a menu with the options to:\n   \u2022  Create a Spell Sheet;\n   \u2022  Select the sources for that Spell Sheet;\n   \u2022  Delete an existing Spell Sheet;" + (!typePF ? "\n   \u2022  Set the visibility of the Spell Slot check boxes to the Spell Sheet, the Limited Feature section, or both;" : "") + "\n   \u2022  Set the sheet to use Spell Points instead of Spell Slots.\n\nGenerating a Spell Sheet will involve filling out a dialog for each spellcasting class/race/feat. After that you can select which is included in the Spell Sheet and in what order.", //\n\nAlternatively you can create an empty Spell Sheet which you can fill out manually.",
				nPos : 10,
				cLabel : "Spells"
			});
		}

		if (!minVer) {
			app.addToolButton({
				cName : "AdventureLeagueButton",
				cExec : "MakeAdventureLeagueMenu(); AdventureLeagueOptions();",
				oIcon : allIcons.league,
				cTooltext : toUni("Adventurers League") + "\nHide\/show fields for Adventurers League play:\n   \u2022  'DCI' on the 1st page;\n   \u2022  'Faction Rank' and 'Renown' on the Background page;\n   \u2022  Sets HP value on the 1st page to 'always fixed';" + (typePF ? "" : "\n   \u2022  Removes the action options from the DMG on the 1st page;") + "\n   \u2022  Adds asterisks for action options taken from the DMG in the reference section.\n\nThis button can also make the \"Adventurers Logsheet\" visible if it isn't already.\n\nNote that this Character Generator\/Sheet offers some options that are not legal in Adventurer's League play regardless of enabling this button or not.",
				cMarked : "event.rc = Number(tDoc.getField('League Remember').submitName);",
				nPos : 11,
				cLabel : "League"
			});
			app.addToolButton({
				cName : "PrintButton",
				cExec : "PrintButton();",
				oIcon : allIcons.print,
				cTooltext : toUni("Print") + "\nSelect what pages you want to print and open the print dialog.\n\nThe pages you select will be remembered for the next time you press this button.\n\nYou also get an option to hide all fields on the sheet before printing.",
				nPos : 12,
				cLabel : "Print"
			});
		};
		app.addToolButton({
			cName : "MakeMobileReadyButton",
			cExec : "MakeMobileReady();",
			oIcon : allIcons.tablet,
			cTooltext : toUni("Flatten") + "\nSwitch to or from a version of the sheet that is compatible with Acrobat Reader for mobile devices.\nThis flattens all form fields and hides non-printable ones to make the sheet more usable on a phone or tablet.\n\nThe fields used during normal play will stay editable:\n   \u2022  1st page: health, attacks, actions, adv.\/disadv., etc.;\n   \u2022  2nd page: equipment and proficiencies;\n   \u2022  3rd-6th page: all except buttons and portrait\/symbol.",
			cMarked : "event.rc = CurrentVars.mobileset ? CurrentVars.mobileset.active : false;",
			nPos : 13,
			cLabel : "Flatten"
		});
		app.addToolButton({
			cName : "SetUnitDecimalsButton",
			cExec : "SetUnitDecimals_Button();",
			oIcon : allIcons.unitsystem,
			cTooltext : toUni("Unit System") + "\nOpen a dialog where you can select the following:\n   \u2022  Unit system: metric or imperial\n   \u2022  Decimal separator: dot or comma.",
			nPos : 14,
			cLabel : "Units"
		});
		app.addToolButton({
			cName : "ColorButton",
			cExec : "MakeColorMenu(); ColoryOptions();",
			oIcon : allIcons.colors,
			cTooltext : !typePF ? toUni("Set Color Theme") + "\nControl the color theme of the sheet in the following ways:\n   \u2022  Color of the Headers;\n   \u2022  Color of the Dragon Heads;" + (minVer ? "" : "\n   \u2022  Color of the HP Dragons;\n   \u2022  Color of the Ability Save DCs;") + "\n   \u2022  Color of the form field highlighting.\n\nNote that the color of the highlighting might affect other PDFs you currently have opened. It will revert to normal once you close this sheet, but will be applied again once you open this sheet." : toUni("Set Highlighting Color") + "\nSet the color of the form field highlighting.\n\nYou can select several colors, the adobe default color, or turn form field highlighting off.\n\nNote that the color of the highlighting might affect other PDFs you currently have opened. It will revert to normal once you close this sheet, but will be applied again once you open this sheet.",
			nPos : 15,
			cLabel : "Color"
		});
		app.addToolButton({
			cName : "FAQButton",
			cExec : "MakeFaqMenu_FaqOptions();",
			oIcon : allIcons.faq,
			cTooltext : toUni("FAQ") + "\nOpen the frequently asked questions website or pdf, find the latest version, or contact MPMB.\n\nThere you can find information on how to add custom code to the sheet, like homebrew races\/weapons\/feats\/etc.",
			nPos : 16,
			cLabel : "FAQ"
		});
	} catch (err) {
		app.addToolButton({
			cName : "MakeItAppear",
			cExec : "",
			cLabel : ""
		});
		app.removeToolButton({
			cName : "MakeItAppear"
		});
	}
};

function OpeningStatement() {
	var reminders = Number(tDoc.getField("Opening Remember").submitName);
	if (!app.viewerVersion || !reminders || (app.viewerVersion < 15 && reminders <= 3)) {
		CurrentSources.globalExcl = ["UA:RR", "UA:TMC"];
		var oldVerAlert = app.alert({
			nIcon : 0,
			cTitle : "Please update your Adobe Acrobat",
			cMsg : "This version of Adobe Acrobat is not supported for use with MPMB's D&D 5e Character Tools. You need at least Adobe Acrobat DC (Reader, Pro, or Standard) to use this PDF's full automation. Please know that if you continue to use the sheet with this outdated version of Adobe Acrobat, some features will not work (correctly) and others might produce errors (e.g. the Source Selection and the Mystic class).\n\nDo you want to close this pdf and visit the Adobe website where you can download the latest version of Adobe Acrobat Reader for free (https://get.adobe.com/reader/)?\n\nPlease understand that if you choose 'No', there will be no support if anything doesn't work.\n\n" + (!reminders ? "As you aren't using Adobe Acrobat to view this PDF, you will not be redirected to the website to download Adobe Acrobat Reader for free. Please go there manually.\n\nhttps://get.adobe.com/reader/" : reminders == 1 ? "You will get this warning again the next two times that you open this sheet in an unsupported version of Adobe Acrobat." : reminders == 2 ? "You will get this warning again the next time you open this sheet in an unsupported version of Adobe Acrobat." : "This is the last time this pdf character sheet shows this warning."),
			nType : 2
		});
		if (oldVerAlert === 4) {
			app.launchURL("https://get.adobe.com/reader/", true);
			tDoc.closeDoc();
			return;
		};
		tDoc.getField("Opening Remember").submitName += 1;
	};
	if (What("Opening Remember") === "No") {
		tDoc.dirty = false;
		tDoc.pane = "bookmarks"; //open the bookmarks so that on the first opening people can see its existence
		var sheetTitle = "MorePurpleMoreBetter's " + (tDoc.info.SpellsOnly ? "Complete " + tDoc.info.SpellsOnly.capitalize() + " Spell Sheet" : (tDoc.info.AdvLogOnly ? "Adventure Logsheet" : "Character Record Sheet")) + " (" + tDoc.info.SheetType + ") v" + semVers;
		var Text = "[Can't see the 'OK' button at the bottom? Use ENTER to close this dialog]\n\n";
		Text += "Welcome to " + toUni(sheetTitle);
		Text += " (get the latest version using the bookmark).";
		Text += patreonVersion ? "" : "\n\n" + toUni("Only SRD") + ": This sheet is only allowed to contain content from the System Reference Document and no other Wizards of the Coast publications, as they are protected by copyright. If you want to get more content to use with the sheet, see the \"Add Extra Materials\" bookmark.";
		Text += "\n\n" + toUni("Tooltips") + ": This sheet makes extensive use of tooltips (mouseover texts). Hover your cursor over a field to find how you can enter things into the field, reference to the source, explanatory text, or even a list of options your selection offers you.";
		Text += "\n\n" + toUni("Functions") + ": Check out the buttons in the \'JavaScript Window\'-toolbar and the bookmarks. Hover your cursor over a button in the \'JavaScript Window\'-toolbar to see what it does.";
		Text += minVer ? "" : "\n\n" + toUni("Modifiers") + ": With the \"Mods\" button you can add modifiers to the calculated values.";
		Text += tDoc.info.SpellsOnly ? "" : "\n\n" + toUni("Layout") + ": With the \"Layout\" button you can hide, add, and remove certain pages.";
		Text += tDoc.info.AdvLogOnly ? "" : "\n\n" + toUni("Spells") + ": With the \"Spells\" button you can have the sheet generate a spell sheet based on your character, or manually create one.";
		Text += !typePF ? "\n\n" + toUni("Color Options") + ": With the \"Color\" button or the top right logo on the first page, you can change the graphical elements of this sheet to 11 different colors." : "";
		Text += tDoc.info.AdvLogOnly ? "" : "\n\n" + toUni("Sources") + ": With the \"Sources\" button you can set which resources you want the sheet to use, including most Unearthed Arcana material (e.g. the Revised Ranger). You can also get more using the \"Get Additional Content\" bookmark, like the Gunslinger, Blood Hunter, College of the Maestro by Matthew Mercer, and many others...";
		Text += "\n\nHave fun with the sheet and the adventures you embark on with its help!\n - MorePurpleMoreBetter - ";
		var oCk = {
			bInitialValue : true,
			bAfterValue : false
		};
		app.alert({
			cMsg : Text,
			nIcon : 3,
			cTitle : "Before you get started with MPMB's " + (tDoc.info.SpellsOnly ? "Complete Spell Sheet" : (tDoc.info.AdvLogOnly ? "Adventure Logsheet" : "Character Record Sheet")),
			oCheckbox : oCk
		});
		if (oCk.bAfterValue) {
			Value("Opening Remember", "Yes");
		};
		if (!minVer && CurrentSources.firstTime && app.viewerVersion >= 15) resourceDecisionDialog(true);
	};
	if (tDoc.getField("SaveIMG.Patreon").submitName !== "") {
		OpeningStatementVar = app.setTimeOut("PatreonStatement();", 66000);
	};
};

function ResetTooltips() {
	var TooltipArray = [
		"Proficiency Armor Light",
		"Proficiency Armor Medium",
		"Proficiency Armor Heavy",
		"Proficiency Shields",
		"Proficiency Weapon Simple",
		"Proficiency Weapon Martial",
		"Proficiency Weapon Other",
		"AC Misc Mod 1 Description",
		"AC Misc Mod 2 Description",
		"Speed",
		"Speed encumbered",
		"Highlighting",
		"Saving Throw advantages / disadvantages",
		"Vision"
	];
	var clearSubmits = [
		"All ST Bonus",
		"Init Bonus",
		"Passive Perception Bonus",
		"All Skills Bonus",
		"Spell DC 1 Bonus",
		"Spell DC 2 Bonus"
	]
	var clearCalcs = [];
	for (var i = 1; i <= FieldNumbers.langstools; i++) {
		TooltipArray.push("Tool " + i);
		TooltipArray.push("Language " + i);
	}
	for (i = 1; i <= FieldNumbers.actions; i++) {
		TooltipArray.push("Bonus Action " + i);
		TooltipArray.push("Reaction " + i);
	}
	for (i = 1; i <= FieldNumbers.trueactions; i++) {
		TooltipArray.push("Action " + i);
	}
	for (i = 0; i <= AbilityScores.abbreviations.length; i++) {
		TooltipArray.push((i === AbilityScores.abbreviations.length ? "HoS" : AbilityScores.abbreviations[i]) + " ST Prof");
		clearSubmits.push((i === AbilityScores.abbreviations.length ? "HoS" : AbilityScores.abbreviations[i]) + " ST Bonus");
	}
	for (i = 1; i <= FieldNumbers.limfea; i++) {
		TooltipArray.push("Limited Feature " + i);
		clearCalcs.push("Limited Feature Max Usages " + i);
	}
	for (i = 1; i <= 6; i++) {
		TooltipArray.push("Resistance Damage Type " + i);
	}
	for (i = 1; i <= FieldNumbers.attacks; i++) {
		var fld = "BlueText.Attack." + i;
		clearSubmits.push(fld + ".To Hit Bonus");
		clearSubmits.push(fld + ".Damage Bonus");
		clearSubmits.push(fld + ".Damage Die");
	}
	for (i = 1; i <= FieldNumbers.magicitems; i++) {
		clearSubmits.push("Extra.Magic Item Attuned " + i);
	}

	//remove the tooltips from every fieldname in the array
	for (i = 0; i < TooltipArray.length; i++) {
		AddTooltip(TooltipArray[i], "", "");
	};
	for (i = 0; i < clearSubmits.length; i++) {
		AddTooltip(clearSubmits[i], undefined, "");
	};
	for (i = 0; i < clearCalcs.length; i++) {
		AddTooltip(clearCalcs[i], undefined, "");
		tDoc.getField(clearCalcs[i]).setAction("Calculate", "");
	};
	AddTooltip("Equipment.menu", "Click here to add equipment to the adventuring gear section, or to reset it (this button does not print).\n\nIt is recommended to pick a pack first before you add any background's items.");
	AddTooltip("Background Extra", 'First fill out a background in the field to the left.\n\nOnce a background is recognized that offers additional options, those additional options will be displayed here. For example, the "Origin" for the "Outlander" background.');
	SetHPTooltip("reset");
	setSkillTooltips(true);
	correctMIattunedVisibility();
};

function AddResistance(input, tooltip, replaceThis, replaceMatch) {
	var useful = undefined;
	var usefulreplace = undefined;
	var inputCl = clean(input, false, true);
	var replaceThisString = replaceThis ? clean(replaceThis, false, true) : "";
	if (DamageTypes[inputCl.toLowerCase()]) {
		useful = DamageTypes[inputCl.toLowerCase()].index;
	};
	if (replaceThis && DamageTypes[replaceThisString.toLowerCase()]) {
		usefulreplace = DamageTypes[replaceThisString.toLowerCase()].index;
	};
	var tooltipString = tooltip ? formatMultiList("\"" + inputCl + "\" resistance was gained from:", tooltip) : "";
	var doReplace = false;
	var testRegex = useful !== undefined ? /does_not_match/ : MakeRegex(inputCl);
	for (var n = 1; n <= 2; n++) {
		for (var k = 1; k <= 6; k++) {
			var next = tDoc.getField("Resistance Damage Type " + k);
			if (n === 1 && (next.currentValueIndices === useful || next.value == inputCl || next.submitName == inputCl || ((testRegex).test(next.value) && similarLen(next.value, inputCl)))) {
				if (!replaceThis) {
					next.userName = tooltipString;
					next.submitName = inputCl;
				};
				return;
			} else if (n === 1 && replaceThis && (next.submitName == replaceThisString || next.value == replaceThisString || (usefulreplace !== undefined && next.currentValueIndices === usefulreplace) || (replaceMatch && replaceThisString.toLowerCase().indexOf(next.value.toLowerCase()) !== -1))) {
				doReplace = k;
			} else if (n === 2 && (doReplace === k || (!doReplace && clean(next.value) === ""))) {
				if (useful !== undefined) {
					next.currentValueIndices = useful;
				} else {
					next.value = inputCl;
				};
				if (!replaceThis) {
					next.submitName = next.value;
					next.userName = tooltipString;
				};
				break;
			};
		};
	};
};

function RemoveResistance(Input) {
	var useStr = clean(Input, false, true);
	var useReg = MakeRegex(useStr);
	for (var k = 1; k <= 6; k++) {
		var fld = "Resistance Damage Type " + k;
		var ResFld = What(fld);
		if (ResFld === useStr | ((useReg).test(ResFld) && similarLen(ResFld, useStr))) {
			DeleteItemType("Resistance Damage Type ", k, 6);
			return;
		} else if (How(fld) == useStr) {
			AddTooltip(fld, "", "");
			return;
		};
	};
};

function AddDmgType(Field, Input) {
	var useful = !Input ? 0 : (DamageTypes[Input.toLowerCase()] ? DamageTypes[Input.toLowerCase()].index : Input);
	PickDropdown(Field, useful);
};

// Toggle between text lines toggle = true to hide the lines and toggle = false to show the lines
function ToggleWhiteout(toggle) {
	if (CurrentVars.whiteout == undefined) CurrentVars.whiteout = tDoc.getField("Whiteout.Standard.0").display == display.visible;

	if (toggle !== undefined && ((toggle && CurrentVars.whiteout) || (!toggle && !CurrentVars.whiteout))) return;
	var nowWhat = !CurrentVars.whiteout; // Toggle the current state

	// Start progress bar and stop calculations
	var thermoTxt = thermoM((nowWhat ? "Hide" : "Show") + " the text lines for mult-line fields...");
	calcStop();

	MakeMobileReady(false); // Undo flatten, if needed

	// Add the fields for all the template pages into an array
	var compTemps = What("Template.extras.AScomp").split(","); // so include the ""
	var noteTemps = What("Template.extras.ASnotes").split(",").splice(1);
	var wildTemps = What("Template.extras.WSfront").split(",").splice(1);
	var logTemps = What("Template.extras.ALlog").split(",").splice(1);
	var templateA = compTemps.concat(noteTemps).concat(wildTemps).concat(logTemps);

	// Show/hide the whiteout field on page 3 depending on the state of the layers
	if (!typePF && !minVer) {
		if (CurrentVars.vislayers == undefined) CurrentVars.vislayers = ["rules", "equipment"];
		if (nowWhat) {
			if (CurrentVars.vislayers[0] === "notes") Show("Extra.Notes Whiteout");
			if (CurrentVars.vislayers[1] === "equipment") Show("Extra.Other Holdings Whiteout");
		} else {
			Hide("Extra.Notes Whiteout");
			Hide("Extra.Other Holdings Whiteout");
		}
	}

	// Show/hide the whiteout fields as per the array
	for (var i = 0; i < templateA.length; i++) {
		var whiteFld = templateA[i] + "Whiteout";
		if (nowWhat) {
			Show(whiteFld);
		} else {
			Hide(whiteFld);
		}
		thermoM((i+1)/(templateA.length+2)); // Increment the progress bar
	};

	CurrentVars.whiteout = nowWhat;
	SetStringifieds("vars"); // Save the settings to a field

	thermoM(thermoTxt, true); // Stop progress bar
};

function ResetAll(GoOn, noTempl, deleteImports) {
	var oCk = {
		cMsg : "Also delete all imported scripts, both files and manual input (i.e. permanently delete everything but the SRD content)",
		bInitialValue : false,
		bAfterValue : false
	};
	var ResetDialog = {
		cTitle : "Reset the whole sheet",
		cMsg : "Are you sure you want to reset all fields and functions to their initial value?\n\nThis will undo any changes you have made, including page layout and imported images.\n\nThis cannot be undone!",
		nIcon : 1, //Warning
		nType : 2, //Yes, No
		oCheckbox : oCk
	};
	if (!GoOn && app.alert(ResetDialog) !== 4) return;
	var keepImports = GoOn && deleteImports ? false : !oCk.bAfterValue;
	if (keepImports) {
		var userScriptString = What("User Script");
	};
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Resetting the sheet" + (GoOn ? ' "' + tDoc.documentFileName + '"' : '') + "...");
	calcStop(true);
	IsNotReset = false;

	//make a variable of the current state of location columns in the equipment sections
	var locColumns = What("Gear Location Remember").split(",");

	MakeMobileReady(false); // Undo flatten, if needed

	thermoM(1/9); //increment the progress dialog's progress

	//delete any extra templates and make any template that is invisible, visible
	RemoveSpellSheets(); //first do all the Spell Sheets
	var defaultShowTempl = ["ASfront", "ASbackgr", "PRsheet"];
	for (var R in TemplateDep) {
		if (R === "SSfront" || R === "SSmore" || (!typePF && R === "PRsheet")) continue; //don't do this for the spell sheets, they have their own function; also don't do it for the player reference sheet in not the Printer Friendly version, as it doesn't exist
		//first see if the template is visible
		var isTempVisible = isTemplVis(R);
		var tempExtras = What("Template.extras." + R);

		//if invisible, and one of the defaultShowTempl, make it visible
		if (!isTempVisible && defaultShowTempl.indexOf(R) !== -1) {
			DoTemplate(R, "Add");
		} else if (tempExtras) { //if there can be multiples of a template, remove them
			DoTemplate(R, "RemoveAll", false, true); //remove all of them
		} else if (isTempVisible && defaultShowTempl.indexOf(R) === -1) {
			DoTemplate(R, "Remove"); //remove all of them
		};
	};

	setListsUnitSystem("imperial"); //reset the values of some variables to the right unit system

	thermoM(2/9); //increment the progress dialog's progress

	// Reset of all the form field values
	tDoc.resetForm();
	thermoM(3/9); //increment the progress dialog's progress
	tDoc.resetForm(); // do this twice so that all variables based on fields are also reset
	for (var i = 1; i <= FieldNumbers.limfea; i++) {
		tDoc.getField("Limited Feature Max Usages " + i).setAction("Calculate", "");
		tDoc.getField("Limited Feature Max Usages " + i).submitName = "";
	};
	tDoc.getField("AC Misc Mod 1 Description").submitName = "";
	tDoc.getField("AC Misc Mod 2 Description").submitName = "";
	tDoc.getField("Opening Remember").submitName = 1;
	tDoc.getField("Character Level").submitName = 0;
	thermoM(4/9); //increment the progress dialog's progress

	//Reset the color scheme to red
	setColorThemes(true);
	thermoM(5/9); //increment the progress dialog's progress

	//reset some global variables
	CurrentClasses = {};
	classes.known = {};
	classes.old = {};
	CurrentRace = {};
	CurrentBackground = {};
	CurrentCompRace = {};
	CurrentUpdates = {types : []};
	GetStringifieds(keepImports);

	if (keepImports) { // remove the imports and reset the sources
		SetStringifieds("sources");
		SetStringifieds("scriptfiles");
		Value("User Script", userScriptString);
	} else { // re-apply the imports and keep the sources setting
		InitiateLists();
		resourceDecisionDialog(true, true); //to make sure that even if the sheet is used before re-opening, the resources are set to default
		UpdateDropdown("resources");
		spellsAfterUserScripts(true);
	};

	// Reset the calculation order
	ResetTooltips();
	setCalcOrder();

	thermoM(6/9); //increment the progress dialog's progress

	// Call upon some functions to reset other stuff than field values
	ConditionSet(true);
	ShowCalcBoxesLines();
	ToggleWhiteout(false);
	ChangeFont();
	ToggleTextSize();
	ToggleAttacks(false);
	ToggleBlueText(false);
	Toggle2ndAbilityDC("hide");
	AdventureLeagueOptions("advleague#all#0");
	SetSpellSlotsVisibility();
	ShowHonorSanity();
	delete CurrentVars.vislayers; LayerVisibilityOptions();
	ShowCompanionLayer();
	if (locColumns[0] === "true") HideInvLocationColumn("Adventuring Gear ", true);
	if (locColumns[1] === "true") HideInvLocationColumn("Extra.Gear ", true);
	ShowAttunedMagicalItems(true); // in equipment section
	SetHighlighting();
	UpdateALdateFormat();
	DnDlogo();

	thermoM(7/9); //increment the progress dialog's progress

	//Reset portrait & symbol to original blank
	ClearIcons("HeaderIcon", true);
	ClearIcons("AdvLog.HeaderIcon", true);
	ClearIcons("Portrait", true);
	ClearIcons("Symbol", true);
	ClearIcons("Comp.img.Portrait", true);

	//re-apply the rich text (deleted because of resetting the form fields)
	MakeSkillsMenu_SkillsOptions(["skills", "alphabeta"]);
	SetRichTextFields();

	thermoM(8/9); //increment the progress dialog's progress

	//generate an instance of the AScomp and ASnotes templates
	if (!noTempl) {
		DoTemplate("AScomp", "Add");
		DoTemplate("ASnotes", "Add");
	};
	// now move the focus to the first page
	tDoc.getField(BookMarkList["CSfront"]).setFocus();

	// Set global variable to reflect end of reset
	IsNotReset = true;
	InitializeEverything(true, true);
	thermoM(thermoTxt, true); // Stop progress bar
	tDoc.dirty = true;
};

// Select the text size to use (0 for auto), or if left empty, select the default text size of 5.74 (7 for Printer Friendly)
function ToggleTextSize(size) {
	if (CurrentVars.fontsize == undefined) CurrentVars.fontsize = typePF ? 7 : 5.74;
	var fontSize = size == undefined || isNaN(size) ? (typePF ? 7 : 5.74) : parseFloat(size);
	if (fontSize == CurrentVars.fontsize) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Changing the font size to " + (fontSize ? fontSize : "'Auto'") + "...");
	calcStop();

	if (!tDoc.info.AdvLogOnly) {
		var LinesFld = [
			"Vision",
			"Saving Throw advantages / disadvantages",
			"HP Current",
			"Racial Traits",
			"Class Features",
			"Background Feature Description",
			"Personality Trait",
			"Ideal",
			"Bond",
			"Flaw",
			"Extra.Notes",
			"Extra.Other Holdings",
			"Background_History",
			"Background_Appearance",
			"Background_Enemies",
			"MoreProficiencies"
		].concat(typePF ?
			["Background_Organisation.Left", "Background_Organisation.Right"] :
			["Background_Organisation"]
		);
		for (var i = 1; i <= FieldNumbers.magicitems; i++) {
			LinesFld.push("Extra.Magic Item Description " + i);
		};
		for (var i = 1; i <= FieldNumbers.feats; i++) {
			LinesFld.push("Feat Description " + i);
		};

		//add the lines for all the companion pages
		var compTemps = What("Template.extras.AScomp").split(",");
		for (var T = 0; T < compTemps.length; T++) {
			var prefix = compTemps[T];
			LinesFld = LinesFld.concat([
				prefix + "Comp.Use.HP.Current",
				prefix + "Comp.Use.Senses",
				prefix + "Comp.Use.Features",
				prefix + "Comp.Use.Traits",
				prefix + "Cnote.Left",
				prefix + "Cnote.Right"
			]);
		}

		//add the lines for all the notes pages
		var noteTemps = What("Template.extras.ASnotes").split(",");
		for (var T = 0; T < noteTemps.length; T++) {
			var prefix = noteTemps[T];
			LinesFld = LinesFld.concat([
				prefix + "Notes.Left",
				prefix + "Notes.Right"
			]);
		}

		//add the lines for all the wild shapes pages
		var wildTemps = What("Template.extras.WSfront").split(",");
		for (var T = 0; T < wildTemps.length; T++) {
			var prefix = wildTemps[T];
			for (var W = 1; W <= 4; W++) {
				LinesFld = LinesFld.concat([
					prefix + "Wildshape." + W + ".HP Current",
					prefix + "Wildshape." + W + ".Traits"
				]);
			}
		}
	} else {
		var LinesFld = []
	}

	//add the lines for all the logsheet pages
	var logTemps = What("Template.extras.ALlog").split(",");
	for (var T = 0; T < logTemps.length; T++) {
		var prefix = logTemps[T];
		for (var L = 1; L <= FieldNumbers.logs; L++) {
			LinesFld.push(prefix + "AdvLog." + L + ".notes");
		}
	}

	for (var i = 0; i < LinesFld.length; i++) {
		tDoc.getField(LinesFld[i]).textSize = fontSize;
		thermoM((i+1)/LinesFld.length); // Increment the progress bar
	};

	CurrentVars.fontsize = fontSize;
	SetStringifieds("vars"); // Save the settings to a field
	thermoM(thermoTxt, true); // Stop progress bar
};

//set the visibility of the layers on the third page. Input is true if a menu is to be created, or false if the remembered setting is to be taken.
function show3rdPageNotes() {
	if (typePF || !What("Extra.Notes")) return;
	LayerVisibilityOptions(false, ['notes', false]);
}
function LayerVisibilityOptions(showMenu, useSelect) {
	if (typePF || minVer) return; //don't do this function in the Printer-Friendly version

	var isReset = false;
	if (CurrentVars.vislayers == undefined) {
		isReset = !showMenu;
		CurrentVars.vislayers = ["rules", "equipment"];
	}
	MakeMobileReady(false); // Undo flatten, if needed

	var possibleOptions = ["notes", "rules", "equipment"];
	if (!useSelect || useSelect === "justMenu") {
		Menus.chooselayers = [{
			cName : "Rules left - Equipment right",
			cReturn : "3rdpage#rules#equipment",
			bMarked : CurrentVars.vislayers[0] === "rules" && CurrentVars.vislayers[1] === "equipment"
		}, {
			cName : "Notes left - Equipment right",
			cReturn : "3rdpage#notes#equipment",
			bMarked : CurrentVars.vislayers[0] === "notes" && CurrentVars.vislayers[1] === "equipment"
		}, {
			cName : "Notes left - Rules right",
			cReturn : "3rdpage#notes#rules",
			bMarked : CurrentVars.vislayers[0] === "notes" && CurrentVars.vislayers[1] === "rules"
		}];
		if (useSelect === "justMenu") return;
	};

	var selection = useSelect ? useSelect : showMenu ? getMenu("chooselayers") : CurrentVars.vislayers;
	if (!selection || selection[0] == "nothing") return;

	if (selection[0] === "3rdpage") selection.shift();
	if (!selection[0] || possibleOptions.indexOf(selection[0]) == -1) selection[0] = CurrentVars.vislayers[0];
	if (!selection[1] || possibleOptions.indexOf(selection[1]) == -1) selection[1] = CurrentVars.vislayers[1];

	if (!isReset && selection[0] == CurrentVars.vislayers[0] && selection[1] == CurrentVars.vislayers[1]) return; // nothing changed

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Show the 3rd page " + selection[0] + " and " + selection[1] + " sections...");
	calcStop();

	Value("Extra.Layers Remember", selection);
	var LNotesFlds = [
		"Text.Header.Notes.Left",
		"Extra.Notes",
	];
	var HideShowLNotesFlds = "Hide";
	var LRulesFlds = [
		"Text.Header.Rules.Left",
		"Image.Rules.Left"
	];
	var HideShowLRulesFlds = "Hide";
	var RRulesFlds = [
		"Text.Header.Rules.Right",
		"Image.Header.RightRules",
		"Image.DragonheadRightRules",
		"Image.DragonheadshadowRightRules",
		"Image.Rules.Right"
	];
	var HideShowRRulesFlds = "Hide";
	var REquipFlds = [
		"Text.Header.Equip.Right",
		"Image.Equip.Right",
		"Image.DividerExtraGear",
		"Image.DragonheadExtraGear",
		"Display.Weighttxt.LbKgPage3",
		"Extra.Gear Weight Subtotal Left",
		"Extra.Gear Weight Subtotal Right",
		"Extra.Other Holdings"
	];
	var HideShowREquipFlds = "Hide";
	var REquipFldsNP = [];
	var HideShowREquipFldsNP = "Hide";
	for (i = 1; i <= FieldNumbers.extragear; i++) {
		REquipFldsNP.push("Extra.Gear Button " + i);
		REquipFlds.push("Extra.Gear Row " + i);
		REquipFlds.push("Extra.Gear Amount " + i);
		REquipFlds.push("Extra.Gear Weight " + i);
	};

	// Hide/show the whiteout fields on the right and left side depending on the visible layer and the settings of text line visibility
	if (CurrentVars.whiteout && selection[0] === "notes") {
		Show("Extra.Notes Whiteout");
	} else {
		Hide("Extra.Notes Whiteout");
	}
	if (CurrentVars.whiteout && selection[1] === "equipment") {
		Show("Extra.Other Holdings Whiteout");
	} else {
		Hide("Extra.Other Holdings Whiteout");
	}

	//do something with the input
	switch (selection[0]) {
		case "notes":
			HideShowLNotesFlds = "Show";
			break;
		case "rules":
			HideShowLRulesFlds = "Show";
			break;
	}

	switch (selection[1]) {
		case "rules":
			HideShowRRulesFlds = "Show";
			Hide("Extra.Gear Location");
			break;
		case "equipment":
			HideShowREquipFlds = "Show";
			HideShowREquipFldsNP = "DontPrint";
			if (What("Gear Location Remember").split(",")[1] === "true") {
				Show("Extra.Gear Location");
			}
			break;
	}

	//set the visibility of the fields
	for (var L = 0; L < LNotesFlds.length; L++) {
		tDoc[HideShowLNotesFlds](LNotesFlds[L]);
	}
	for (L = 0; L < LRulesFlds.length; L++) {
		tDoc[HideShowLRulesFlds](LRulesFlds[L]);
	}
	for (var R = 0; R < RRulesFlds.length; R++) {
		tDoc[HideShowRRulesFlds](RRulesFlds[R]);
	}
	for (R = 0; R < REquipFlds.length; R++) {
		tDoc[HideShowREquipFlds](REquipFlds[R]);
	}
	for (R = 0; R < REquipFldsNP.length; R++) {
		tDoc[HideShowREquipFldsNP](REquipFldsNP[R]);
	}

	CurrentVars.vislayers = selection;
	SetStringifieds("vars"); // Save the settings to a field
	thermoM(thermoTxt, true); // Stop progress bar
}

// Toggle between calculated (Toggle = false) and manual (Toggle = true) attack fields
function ToggleAttacks(Toggle) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Changing the attacks to " + (Toggle === "Yes" ? "calculated" : "manual") + "...");
	calcStop();

	MakeMobileReady(false); // Undo flatten, if needed

	CurrentVars.manual.attacks = Toggle;
	var VisibleHidden = !Toggle ? "Show" : "Hide";
	var HiddenVisible = !Toggle ? "Hide" : "Show";
	var NoPrintHidden = !Toggle ? "DontPrint" : "Hide";
	var ReadOnly = !Toggle ? "Uneditable" : "Editable";
	var compTemps = What("Template.extras.AScomp").split(",");
	var incr = compTemps.length * 4 + FieldNumbers.attacks * 2;

	for (var i = 1; i <= FieldNumbers.attacks; i++) {
		tDoc[HiddenVisible]("Attack." + i + ".Weapon");
		tDoc[ReadOnly]("Attack." + i + ".To Hit");
		tDoc[ReadOnly]("Attack." + i + ".Damage");
		tDoc[VisibleHidden]("Attack." + i + ".Weapon Selection");
		tDoc[VisibleHidden]("Attack." + i + ".Proficiency");
		tDoc[VisibleHidden]("Attack." + i + ".Mod");
		thermoM(i/incr); //increment the progress dialog's progress
	}

	for (var T = 0; T < compTemps.length; T++) {
		for (var i = 1; i <= 3; i++) {
			var prefix = compTemps[T];
			tDoc[HiddenVisible](prefix + "Comp.Use.Attack." + i + ".Weapon");
			tDoc[ReadOnly](prefix + "Comp.Use.Attack." + i + ".To Hit");
			tDoc[ReadOnly](prefix + "Comp.Use.Attack." + i + ".Damage");
			tDoc[VisibleHidden](prefix + "Comp.Use.Attack." + i + ".Weapon Selection");
			tDoc[VisibleHidden](prefix + "Comp.Use.Attack." + i + ".Proficiency");
			tDoc[VisibleHidden](prefix + "Comp.Use.Attack." + i + ".Mod");
			thermoM((i * (T + 1) + FieldNumbers.attacks)/incr); //increment the progress dialog's progress
		}
		tDoc[VisibleHidden](prefix + "Attack.Titles");
	}

	if (CurrentVars.bluetxt) {
		tDoc[NoPrintHidden]("BlueText.Attack");
		for (var T = 0; T < compTemps.length; T++) {
			prefix = compTemps[T];
			tDoc[NoPrintHidden](prefix + "BlueText.Comp.Use.Attack");
			thermoM((T + 1 + FieldNumbers.attacks + compTemps.length * 3)/incr); //increment the progress dialog's progress
		}
		for (var i = 1; i <= FieldNumbers.attacks; i++) {
			DontPrint("BlueText.Attack." + i + ".Weight Title");
			DontPrint("BlueText.Attack." + i + ".Weight");
			thermoM((i + FieldNumbers.attacks + compTemps.length * 4)/incr); //increment the progress dialog's progress
		};
	}

	thermoM(thermoTxt, true); // Stop progress bar
};

// Show the bluetext modifier fields (toggle = true) or hide them (toggle = false)
// If toggle is undefined, toggle their visibility
function ToggleBlueText(toggle) {
	if (CurrentVars.bluetxt === undefined) CurrentVars.bluetxt = isDisplay("Acr Bonus") != display.hidden;

	if (toggle !== undefined && toggle == CurrentVars.bluetxt) return;
	var nowWhat = !CurrentVars.bluetxt; // Toggle the current state

	// Start progress bar and stop calculations
	var thermoTxt = thermoM((nowWhat ? "Showing" : "Hiding") + " the modifier fields...");
	calcStop();

	MakeMobileReady(false); // Undo flatten, if needed

	var HiddenNoPrint = nowWhat ? "DontPrint" : "Hide";

	var BlueTxt = [
		"BlueText",
		"Proficiency Bonus Modifiers Title",
		"Proficiency Bonus Modifier",
		"Proficiency Bonus Dice Title",
		"Proficiency Bonus Dice",
		"Skill Modifiers Title",
		"Acr Bonus",
		"Ani Bonus",
		"Arc Bonus",
		"Ath Bonus",
		"Dec Bonus",
		"His Bonus",
		"Ins Bonus",
		"Inti Bonus",
		"Inv Bonus",
		"Med Bonus",
		"Nat Bonus",
		"Perc Bonus",
		"Perf Bonus",
		"Pers Bonus",
		"Rel Bonus",
		"Sle Bonus",
		"Ste Bonus",
		"Sur Bonus",
		"Too Bonus",
		"All Skills Bonus",
		"Skill Modifiers All Text",
		"Save Modifiers Title",
		"Str ST Bonus",
		"Dex ST Bonus",
		"Con ST Bonus",
		"Int ST Bonus",
		"Wis ST Bonus",
		"Cha ST Bonus",
		"All ST Bonus",
		"Save Modifiers All Text",
		"Passive Perception Bonus",
		"Spell DC 1 Bonus",
		"Carrying Capacity Multiplier",
		"Carrying Capacity Multiplier Title",
		"Remarkable Athlete",
		"Remarkable Athlete Title",
		"Jack of All Trades",
		"Jack of All Trades Title",
		"AC Armor Weight Title",
		"AC Armor Weight",
		"AC Shield Weight Title",
		"AC Shield Weight",
		"AmmoLeftDisplay.WeightText",
		"AmmoLeftDisplay.Weight",
		"AmmoRightDisplay.WeightText",
		"AmmoRightDisplay.Weight"
	];

	if (typePF) {
		BlueTxt.push("Init Bonus");
		BlueTxt.push("Comp.Use.Combat.Init.Bonus");
		BlueTxt.push("AC Stealth Disadvantage");
		BlueTxt.push("AC Stealth Disadvantage Title");
	}

	//add the fields for all the companion template pages into the array
	var compTemps = What("Template.extras.AScomp").split(",");
	compTemps.splice(compTemps.indexOf(""), 1);
	for (var T = 0; T < compTemps.length; T++) {
		BlueTxt.push(compTemps[T] + "BlueText");
		if (typePF) {
			BlueTxt.push(compTemps[T] + "Comp.Use.Combat.Init.Bonus");
		}
	}

	for (var i = 0; i < BlueTxt.length; i++) {
		tDoc[HiddenNoPrint](BlueTxt[i]);
		thermoM(i/(BlueTxt.length + 7)); //increment the progress dialog's progress
	};

	//only show the modifier "Spell DC 2 Bonus" if the second spell DC is actually visible
	if (HiddenNoPrint === "Hide" || tDoc.getField("ShowHide 2nd DC").buttonGetCaption() === "Hide 2nd DC") {
		tDoc[HiddenNoPrint]("Spell DC 2 Bonus");
	}

	//undo the showing of certain blue text fields depending on the manual settings
	if (CurrentVars.manual.attacks) {
		Hide("BlueText.Attack");
		Hide("BlueText.Comp.Use.Attack");
		for (var T = 0; T < compTemps.length; T++) {
			Hide(compTemps[T] + "BlueText.Comp.Use.Attack");
		}
	};

	//because of the above, some fields may be hidden even though they should be visible
	for (var i = 1; i <= FieldNumbers.attacks; i++) {
		tDoc[HiddenNoPrint]("BlueText.Attack." + i + ".Weight Title");
		tDoc[HiddenNoPrint]("BlueText.Attack." + i + ".Weight");
	};

	//show the spellslots bluetext fields or hide them
	var SSarray = What("Template.extras.SSfront").split(",");
	var SSvisible = SSarray.length > 1;
	var SSpresuffix = [];
	if (!typePF) {
		var showSlots = eval_ish(What("SpellSlotsRemember"));
		if (showSlots[0]) SSpresuffix.push(["", ".0"]); //show the ones on the first page
		if (showSlots[1]) SSpresuffix.push(["", ".1"]); //show the ones on the spell sheet template page
		if (showSlots[1] && SSvisible) SSpresuffix.push([SSarray[1], ""]); //show the ones on the spell sheet page, if visible
	} else if (What("SpellSlotsRemember") !== "[false,false]") { //only do something if not currently using spell points
		SSpresuffix = [["", ""]];
		if (SSvisible) SSpresuffix.push([SSarray[1], ""]); //show the ones on the spell sheet page, if visible
	}
	for (var e = 0; e < SSpresuffix.length; e++) {
		for (var i = 1; i <= 9; i++) {
			tDoc[HiddenNoPrint](SSpresuffix[e][0] + "SpellSlots.CheckboxesSet.lvl" + i + SSpresuffix[e][1]);
		};
	};

	for (var i = 1; i <= FieldNumbers.magicitems; i++) {
		if (!typePF) {
			tDoc[HiddenNoPrint]("Extra.Magic Item Weight Title " + i);
		}
		tDoc[HiddenNoPrint]("Extra.Magic Item Weight " + i);
		thermoM((BlueTxt.length + i)/(BlueTxt.length + FieldNumbers.magicitems)); //increment the progress dialog's progress
	};
	if (typePF) {
		tDoc[HiddenNoPrint]("Extra.Magic Item Weight Title");
	};

	//now go through all the spell sheets and show the correct blueText fields
	SSarray = SSarray.concat(What("Template.extras.SSmore").split(","));
	if (HiddenNoPrint === "DontPrint") Hide("BlueText.spellshead"); //first hide all the bluetext fields of the spell sheet templates
	for (var A = 0; A < SSarray.length; A++) {
		var prefix = SSarray[A];
		if (prefix == "" && HiddenNoPrint == "Hide") continue; //skip the ones where the prefix is nothing
		for (var i = 0; i < 4; i++) {
			var SSfieldsArray = [
				prefix + "spellshead.Text.header." + i,			//0
				prefix + "spellshead.prepare." + i,				//1
				prefix + "BlueText.spellshead.prepare." + i,	//2
				prefix + "BlueText.spellshead.attack." + i,		//3
				prefix + "BlueText.spellshead.dc." + i			//4
			];
			if (HiddenNoPrint == "Hide") {
				Hide(SSfieldsArray[2]);
				Hide(SSfieldsArray[3]);
				Hide(SSfieldsArray[4]);
			} else if (HiddenNoPrint == "DontPrint" && tDoc.getField(SSfieldsArray[0]).display === display.visible) {
				if (tDoc.getField(SSfieldsArray[1]).display === display.visible) {
					DontPrint(SSfieldsArray[2]);
				}
				DontPrint(SSfieldsArray[3]);
				DontPrint(SSfieldsArray[4]);
			}
		}
	}

	if (What("HoSRememberState") && HiddenNoPrint === "DontPrint") {
		DontPrint("HoS ST Bonus");
	} else {
		Hide("HoS ST Bonus");
	}

	CurrentVars.bluetxt = nowWhat;
	SetStringifieds("vars"); // Save the settings to a field
	thermoM(thermoTxt, true); // Stop progress bar
};

//make a menu for the adventure league button/bookmark and put it in the global variable
function MakeAdventureLeagueMenu() {
	var submenuItems = [
		["Set the HP on the 1st page to automatically use fixed values", "hp", tDoc.getField("HP Max").submitName.split(",")[3] === "fixed"], // 0
		["Show DCI field on 1st page", "dci", isDisplay("DCI.Text") === display.visible] // 1
	].concat(typePF ?
		[["Show Renown on the Background page", "renown", isDisplay("Background_Renown.Text") === display.visible]] : // 2
		[["Remove DMG actions from 1st page (not legal in AL play)", "actions", true]] // 2
	).concat([
		[typePF ? "Show space for Faction Rank on the Background page" : "Show space for Faction, Faction Rank, and Renown on the Background page", "factionrank", isDisplay("Background_FactionRank.Text") === display.visible], // 3
	]).concat(typePF ?
		[["Mark actions on the Player Reference page that are not legal in AL play", "asterisks", isDisplay("Text.PRsheet.AL.asterisk") === display.visible]] : //4
		[]
	).concat([
		["Use the fixed carrying capacity rules", "encumbrance", tDoc.getField("Weight Carrying Capacity.Field").display === display.visible], // 5
		["-", "-", false], // 6
		["Show Adventure Logsheet(s)", "allog", isTemplVis("ALlog")], // 7
		["-", "-", false], // 8
		["Prepare the sheet for Adventurers League play (i.e. do all of the above)", "all#1", false], // 9
		["Undo all of those marked above", "all#0", false] // 10
	]);

	if (!typePF) {
		for (var i = 1; i <= FieldNumbers.trueactions; i++) {
			if ((/^(?=.*overrun)(?=.*tumble).*$/i).test(What("Action " + i))) {
				submenuItems[2][2] = false;
				break;
			};
		};
	};

	var AdvLeagueMenu = [];
	for (i = 0; i < submenuItems.length; i++) {
		AdvLeagueMenu.push({
			cName : submenuItems[i][0],
			cReturn : "advleague#" + submenuItems[i][1] + "#" + (submenuItems[i][2] ? 0 : 1),
			bMarked : submenuItems[i][2]
		});
	};

	Menus.adventureLeague = AdvLeagueMenu;

	tDoc.getField("League Remember").submitName = submenuItems.slice(0,4).every(function(theN) { return theN[2]; }) ? 1 : 0;
};

//call the adventure league menu (or use the input) and do something with the results
function AdventureLeagueOptions(MenuSelection) {
	MenuSelection = MenuSelection ? MenuSelection : getMenu("adventureLeague");

	if (MenuSelection[0] !== "advleague") return;

	var set = Number(MenuSelection[2]);
	var toSaveSelection = {};
	var selectionAll = {};
	for (i = 0; i < Menus.adventureLeague.length; i++) {
		var theAll = Menus.adventureLeague[i];
		var thecReturn = theAll.cReturn.split("#")[1];
		toSaveSelection[thecReturn] = MenuSelection[1] === "all" || MenuSelection[1] === thecReturn ? set : theAll.bMarked;
		if (MenuSelection[1] !== "all" || (/^(-|all)$/i).test(thecReturn) || set == theAll.bMarked) continue;
		selectionAll[thecReturn] = set;
	};
	if (MenuSelection[1] === "all") {
		if (set) selectionAll.disableOptionalRules = set;
		tDoc.getField("League Remember").submitName = set;
		ToggleAdventureLeague(selectionAll);
	} else {
		var selection = {
			allog : undefined,
			dci : undefined,
			factionrank : undefined,
			renown : undefined,
			actions : undefined,
			asterisks : undefined,
			hp : undefined,
			encumbrance : undefined
		};
		selection[MenuSelection[1]] = set;
		ToggleAdventureLeague(selection);
		if (!set) tDoc.getField("League Remember").submitName = set;
	};
	//Save the toSaveSelection for later reprisal when importing
	Value("League Remember", toSaveSelection.toSource());
};

// Set the visibility of the fields for faction, faction ranks, renown, and DCI
function ToggleAdventureLeague(Setting) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Changing the Adventurers League settings...");
	calcStop();

	Setting = Setting ? Setting : {};
	var isBackgrVisible = isTemplVis("ASbackgr");

	MakeMobileReady(false); // Undo flatten, if needed

	//Show the adventurers log, if not already visible
	if (Setting.allog !== undefined) {
		if (isTemplVis("ALlog")) {
			DoTemplate("ALlog", "RemoveAll");
		} else {
			DoTemplate("ALlog", "Add");
		};
	};

	//Show the DCI field
	if (Setting.dci !== undefined) {
		tDoc[Setting.dci ? "Show" : "Hide"]("DCI.Title");
		tDoc[Setting.dci ? "Show" : "Hide"]("DCI.Text");
		if (!typePF) {
			tDoc[Setting.dci ? "Hide" : "Show"]("Class and Levels.0");
			tDoc[Setting.dci ? "Show" : "Hide"]("Class and Levels.1");
		};
	};

	//Show the Faction and Renown fields
	if (Setting.factionrank !== undefined) {
		var VisibleHidden = Setting.factionrank ? "Show" : "Hide";
		var HiddenVisible = Setting.factionrank ? "Hide" : "Show";
		if (!typePF) {
			var FactionList = [
				"Background_Organisation.1",
				"Background_Faction.Title",
				"Background_Faction.Text",
				"Background_FactionRank.Title",
				"Background_FactionRank.Text",
				"Background_Renown.Title",
				"Background_Renown.Text"
			];
			if (isBackgrVisible) {
				FactionList.push("Background_Organisation.3");
				tDoc[HiddenVisible]("Background_Organisation.2");
			};
			for (var i = 0; i < FactionList.length; i++) {
				tDoc[VisibleHidden](FactionList[i]);
			};
		} else {
			tDoc[VisibleHidden]("Background_FactionRank.Text");
			tDoc[VisibleHidden]("Image.Background_FactionRank");
			tDoc[HiddenVisible]("Background_Organisation.Right");
		};
	};

	//Show the Renown field
	if (typePF && Setting.renown !== undefined) {
		tDoc[Setting.renown ? "Show" : "Hide"]("Background_Renown.Title");
		tDoc[Setting.renown ? "Show" : "Hide"]("Background_Renown.Text");
	};

	//Show the asterisks on the reference sheet field
	if (typePF && Setting.asterisks !== undefined) {
		tDoc[Setting.asterisks ? "Show" : "Hide"]("Text.PRsheet.AL");
	};

	//Remove the DMG actions on the 1st page
	if (!typePF && Setting.actions !== undefined) {
		if (Setting.actions) {
			RemoveAction("action", "Overrun / Tumble (or as bonus action)", "Default action");
			AddAction("action", "Grapple / Shove (instead of 1 attack)", "Default action", "As 1 attack: Disarm / Grapple / Shove");
		} else {
			AddAction("action", "Overrun / Tumble (or as bonus action)", "Default action");
			AddAction("action", "As 1 attack: Disarm / Grapple / Shove", "Default action", "Grapple / Shove (instead of 1 attack)");
		};
	};

	//Set the HP to using fixed values
	if (Setting.hp !== undefined) {
		var theHP = tDoc.getField("HP Max").submitName.split(",");
		theHP[3] = Setting.hp ? "fixed" : "nothing";
		tDoc.getField("HP Max").submitName = theHP.join();
		if (Setting.hp) CurrentUpdates.types.push("hp");
	};

	//Set the encumbrance rules to using fixed value
	if (Setting.encumbrance !== undefined) {
		SetEncumbrance(!Setting.encumbrance);
	};

	//Disable some optional rules when changing everything to AL
	if (Setting.disableOptionalRules) {
		Checkbox('Proficiency Bonus Dice', false);
		setPlayersMakeAllRolls(false);
	}

	thermoM(thermoTxt, true); // Stop progress bar
};

//search the string for possible armour
function ParseArmor(input, onlyInv) {
	var found = "";
	if (!input) return found;

	input = removeDiacritics(input);
	var foundLen = 0;
	var foundDat = 0;

	for (var key in ArmourList) {
		var kObj = ArmourList[key];
		if ((onlyInv && kObj.weight == undefined) // see if only doing equipable items
			|| !kObj.regExpSearch || !(kObj.regExpSearch).test(input) // see if the regex matches
			|| testSource(key, kObj, "armorExcl") // test if the armour or its source isn't excluded
		) continue;

		// only go on with this entry if:
		// we are using the search length (default) and this entry has a longer name or this entry has an equal length name but has a newer source
		// or if we are not using the search length, just look at the newest source date
		var tempDate = sourceDate(kObj.source);
		if ((!ignoreSearchLength && kObj.name.length < foundLen) || (!ignoreSearchLength && kObj.name.length == foundLen && tempDate < foundDat) || (ignoreSearchLength && tempDate <= foundDat)) continue;

		// we have a match, set the values
		found = key;
		foundLen = kObj.name.length
		foundDat = tempDate;
	}
	return found;
};

//Find if the armor is a known armor
function FindArmor(input) {
	if (input === undefined) {
		CurrentArmour.field = What("AC Armor Description");
	};
	var tempString = CurrentArmour.field.toLowerCase();
	CurrentArmour.known = ParseArmor(CurrentArmour.field);

	CurrentArmour.dex = "";
	if (CurrentArmour.known && ArmourList[CurrentArmour.known] && ArmourList[CurrentArmour.known].dex !== undefined && !isNaN(ArmourList[CurrentArmour.known].dex)) {
		CurrentArmour.dex = ArmourList[CurrentArmour.known].dex;
	}

	//add magical bonus, denoted by a "+"
	CurrentArmour.magic = 0;
	var magicRegex = /(?:^|\s|\(|\[)([\+-]\d+)/;
	if (magicRegex.test(tempString)) {
		CurrentArmour.magic = parseFloat(tempString.match(magicRegex)[1]);
	}

	CurrentArmour.mod = "";
	if (CurrentArmour.known && ArmourList[CurrentArmour.known] && ArmourList[CurrentArmour.known].addMod) {
		// check if it is an ability score
		for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
			var temp = AbilityScores.abbreviations[i];
			if (tempString.indexOf("("+temp.toLowerCase()+")") !== -1) {
				CurrentArmour.mod = temp;
				break;
			}
		}
		// or perhaps it wants to add the proficiency bonus
		if (!CurrentArmour.mod && tempString.indexOf("(prof)") !== -1) {
			CurrentArmour.mod = "Prof";
		}
	}

	CurrentArmour.acString = "";
	if (CurrentArmour.known) {
		CurrentArmour.acString = ArmourList[CurrentArmour.known].ac;
		if (CurrentArmour.mod) CurrentArmour.acString += "+" + CurrentArmour.mod;
		if (CurrentArmour.magic) CurrentArmour.acString += (CurrentArmour.magic < 0 ? "" : "+") + CurrentArmour.magic;
	}
};

// Change the armor features
function ApplyArmor(input) {
	if (IsSetDropDowns) return; // when just changing the dropdowns, don't do anything
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying armor...");
	calcStop();

	CurrentArmour.field = input;
	var ArmorFields = [
		"AC Armor Bonus", //0
		"Medium Armor", //1
		"Heavy Armor", //2
		"AC Stealth Disadvantage", //3
		"AC Armor Weight", //4
		"AC Dexterity Modifier" //5
	];
	FindArmor(input);

	if (CurrentArmour.known !== undefined && ArmourList[CurrentArmour.known] !== undefined) {
		var ArmorType = ArmourList[CurrentArmour.known].type ? ArmourList[CurrentArmour.known].type.toLowerCase() : "";
		var ArmorStealth = (ArmorType === "medium" && What("Medium Armor Max Mod") === 3) || (/mithral|vind rune/i).test(CurrentArmour.field) ? false : ArmourList[CurrentArmour.known].stealthdis ? ArmourList[CurrentArmour.known].stealthdis : false;
		Checkbox(ArmorFields[3], ArmorStealth);
		Checkbox(ArmorFields[1], ArmorType === "medium");
		Checkbox(ArmorFields[2], ArmorType === "heavy");
		thermoM(1/3); //increment the progress dialog's progress

		Value(ArmorFields[0], CurrentArmour.acString);
		thermoM(2/3); //increment the progress dialog's progress

		//add weight of the armor
		if (ArmourList[CurrentArmour.known].weight) {
			var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
			Value(ArmorFields[4], RoundTo(ArmourList[CurrentArmour.known].weight * massMod, 0.001, true));
		} else {
			Value(ArmorFields[4], 0);
		}
	} else {
		tDoc.resetForm(ArmorFields);
	}
	ConditionSet();
	thermoM(thermoTxt, true); // Stop progress bar
};

//a function to calculate the value of the Dex field in the Armour section (returns a value)
function calcMaxDexToAC() {
	var dexMod = What("Dex Mod");
	if (dexMod === "" || isNaN(dexMod)) return "";
	dexMod = Number(dexMod);
	if (CurrentArmour.dex !== "" && CurrentArmour.dex !== undefined && !isNaN(CurrentArmour.dex)) {
		dexMod = CurrentArmour.dex == -10 ? 0 : Math.min(dexMod, CurrentArmour.dex);
	} else if (tDoc.getField("Heavy Armor").isBoxChecked(0)) {
		dexMod = 0;
	} else if (tDoc.getField("Medium Armor").isBoxChecked(0)) {
		dexMod = Math.min(dexMod, Number(What("Medium Armor Max Mod")));
	};
	return dexMod;
};

//a function to calculate the value of the Dex field in the Armour section (returns a value)
function calcCompMaxDexToAC(prefix, armourKey, dexMod) {
	if (prefix === "" || !ArmourList[armourKey]) return 0;
	if (dexMod === undefined || isNaN(dexMod)) dexMod = Number(What(prefix + "Comp.Use.Ability.Dex.Mod"));
	var theArmour = ArmourList[armourKey];
	if (theArmour.dex) {
		dexMod = theArmour.dex == -10 ? 0 : Math.min(dexMod, theArmour.dex);
	} else if (theArmour.type === "heavy") {
		dexMod = 0;
	} else if (theArmour.type === "medium" && dexMod > 2) {
		dexMod = 2;
	};
	return dexMod;
};

// add the armour; only overwrites if force == true
function AddArmor(armour, force, comp) {
	if (!armour) return;
	var prefix = comp ? comp : !event.target || !event.target.name ? "" : getTemplPre(event.target.name, "AScomp", true);
	var ACfld = prefix ? prefix + "Comp.Use.AC" : "AC Armor Description";
	var curAC = What(ACfld);
	if (curAC && !force) return;
	if (prefix) { // calculate what the value should be and add it
		var armKey = ParseArmor(armour);
		if (!armKey) return;
		var newAC = ArmourList[armKey].ac + calcCompMaxDexToAC(prefix, armKey);
		Value(ACfld, newAC);
	} else {
		Value(ACfld, armour);
	};
};
// remove the armour if it is the same
function RemoveArmor(armour, comp) {
	if (!armour) return;
	var prefix = comp ? comp : !event.target || !event.target.name ? "" : getTemplPre(event.target.name, "AScomp", true);
	var ACfld = prefix ? prefix + "Comp.Use.AC" : "AC Armor Description";
	var curAC = What(ACfld);
	var armKey = ParseArmor(armour);
	if (armKey && prefix) { // calculate what the value would be
		var newAC = ArmourList[armKey].ac + calcCompMaxDexToAC(prefix, armKey);
		if (curAC == newAC) tDoc.resetForm([ACfld]); // remove it if it's the same
	} else if (!prefix && (CurrentArmour.known === armKey || (!armKey && curAC.indexOf(armour) !== -1))) {
		tDoc.resetForm([ACfld]);
	};
};

// find the magic bonus in the shield description
function FindShield(input) {
	if (!input) {
		CurrentShield.field = What("AC Shield Bonus Description").toLowerCase();
	}
	var tempString = CurrentShield.field;
	var temp = "";

	//add magical bonus, denoted by a "+"
	CurrentShield.magic = 0;
	var magicRegex = /(?:^|\s|\(|\[)([\+-]\d+)/;
	if (magicRegex.test(tempString)) {
		CurrentShield.magic = parseFloat(tempString.match(magicRegex)[1]);
	}
}

// Change the armor features
function ApplyShield(input) {
	CurrentShield.field = input.toLowerCase();

	FindShield(input);

	if (input) {
		var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
		Value("AC Shield Bonus", 2 + CurrentShield.magic);
		Value("AC Shield Weight", RoundTo(6 * massMod, 0.001, true));
	} else {
		tDoc.resetForm(["AC Shield Bonus", "AC Shield Weight"]);
	}
}

//Change advantage or disadvantage of saves, skills, checks, attacks, etc. based on condition
function ConditionSet(isReset) {
	if (!isReset && !IsNotConditionSet) return;
	if (typePF) { // only the stealth disadvantage is part of the printer friendly version
		// Start progress bar and stop calculations
		var thermoTxt = thermoM("Armor stealth disadvantage...");
		calcStop();
		IsNotConditionSet = false;
		var thisFld = "ArmDis";
		var thisChck = !isReset && tDoc.getField("AC Stealth Disadvantage").isBoxChecked(0) ? true : false;
		SetProf("advantage", thisChck, ["Ste", false], "Armor");
		IsNotConditionSet = true;
		thermoM(thermoTxt, true); // Stop progress bar
		return;
	}
	var cFlds = {
		Exh1 : { name : "Extra.Exhaustion Level 1" },
		Exh2 : { name : "Extra.Exhaustion Level 2" },
		Exh3 : { name : "Extra.Exhaustion Level 3" },
		Exh4 : { name : "Extra.Exhaustion Level 4" },
		Exh5 : { name : "Extra.Exhaustion Level 5" },
		Exh6 : { name : "Extra.Exhaustion Level 6" },
		Blinded : { name : "Extra.Condition 1" },
		Deafened : { name : "Extra.Condition 3" },
		Frightened : { name : "Extra.Condition 4" },
		Grappled : { name : "Extra.Condition 5" },
		Incapacitated : { name : "Extra.Condition 6" },
		Invisible : { name : "Extra.Condition 7" },
		Paralyzed : { name : "Extra.Condition 8" },
		Petrified : { name : "Extra.Condition 9" },
		Poisoned : { name : "Extra.Condition 10" },
		Prone : { name : "Extra.Condition 11" },
		Restrained : { name : "Extra.Condition 12" },
		Stunned : { name : "Extra.Condition 13" },
		Unconscious : { name : "Extra.Condition 14" },
		ArmDis : { name : "AC Stealth Disadvantage" }
	}

	var thisFld = "ArmDis";
	for (var aFld in cFlds) {
		if (!tDoc.getField(cFlds[aFld].name)) continue;
		cFlds[aFld].checked = tDoc.getField(cFlds[aFld].name).isBoxChecked(0);
		if (event.target && event.target.name && cFlds[aFld].name == event.target.name) thisFld = aFld;
		if ((/Exh\d/).test(aFld)) cFlds[aFld].origchecked = thisFld === aFld ? !cFlds[aFld].checked : cFlds[aFld].checked;
	}
	var thisChck = !isReset && thisFld && cFlds[thisFld].checked ? true : false;
	if (!isReset && (!thisFld || !tDoc.getField(cFlds[aFld].name))) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying the conditions...");
	calcStop();
	IsNotConditionSet = false;

	// Do something with other fields dependent on the selection
	//var stealthLoc = Who("Text.SkillsNames") === "alphabeta" ? "Ste" : "Ath";
	if (isReset || (/Exh\d/).test(thisFld)) {
		// If this is an exhaustion level, check the ones below and/or uncheck the ones above
		if (!isReset) {
			var exhNmbr = Number(thisFld.slice(-1));
			var strtNmbr = thisChck ? 1 : exhNmbr;
			var endNmbr = thisChck ? exhNmbr : 7;
			for (var X = strtNmbr; X < endNmbr; X++) {
				Checkbox("Extra.Exhaustion Level " + X, thisChck);
				cFlds["Exh" + X].checked = thisChck;
			}
		}
		// if the level 2 changes, set the current speed
		if (isReset || cFlds.Exh2.origchecked != cFlds.Exh2.checked || cFlds.Exh5.origchecked != cFlds.Exh5.checked) {
			SetProf("speed", cFlds.Exh5.checked ? false : cFlds.Exh2.checked, { allModes : "/2" }, "Exhaustion level 2 (condition)");
		}
		// if the level 3 changed, set all the saving throws to adv/dis
		if (isReset || cFlds.Exh3.origchecked != cFlds.Exh3.checked) {
			for (var B = 0; B < AbilityScores.abbreviations.length; B++) {
				SetProf("advantage", cFlds.Exh3.checked, [AbilityScores.abbreviations[B], false], "Exhaustion level 2 (condition)");
			};
		}
		// if the level 4 changes, set the current HP max
		if (!isReset && cFlds.Exh4.origchecked != cFlds.Exh4.checked) {
			var maxHP = What("HP Max");
			var halfMaxHP = Math.floor(maxHP / 2);
			var curMaxHP = What("HP Max Current");
			if (cFlds.Exh4.checked) {
				var extraMin = curMaxHP ? maxHP - curMaxHP : 0;
				Value("HP Max Current", halfMaxHP - extraMin);
			} else if (curMaxHP == halfMaxHP || !halfMaxHP) {
				Value("HP Max Current", "");
			} else {
				var extraMin = halfMaxHP - curMaxHP;
				Value("HP Max Current", maxHP - extraMin);
			}
		}
	}
	if (isReset || (/Unconscious|Paralyzed|Petrified|Stunned/).test(thisFld)) {
		if (thisFld == "Unconscious" && thisChck) {
			// if unconscious, also check prone, but don't automatically stand up when no longer unconscious
			Checkbox(cFlds.Prone.name, true);
			cFlds.Prone.checked = true;
		} else if (isReset || thisFld == "Petrified") {
			SetProf("resistance", thisChck, "All", "Petrified (condition)", "All (petrified)");
			SetProf("savetxt", thisChck, { immune : ["poison", "disease"] }, "Petrified (condition)");
		}
		// Incapacitated and fail str/dex saves if any of these are checked, but only undo if none are
		var anyChecked = cFlds.Paralyzed.checked || cFlds.Petrified.checked || cFlds.Stunned.checked || cFlds.Unconscious.checked;
		Checkbox(cFlds.Incapacitated.name, anyChecked);
		cFlds.Incapacitated.checked = anyChecked;
		SetProf("savetxt", anyChecked, { text : ["Fail Str/Dex saves"] }, "Conditions (paralyzed, petrified, stunned, or unconscious)");
	}
	if (isReset || thisFld == "Blinded") {
		SetProf("vision", thisChck, "Blinded: fail checks involving sight", "Blinded (condition)", 0);
	}
	if (isReset || thisFld == "Deafened") {
		SetProf("vision", thisChck, "Deafened: fail checks involving hearing", "Deafened (condition)", 0);
	}
	if (isReset || thisFld == "Restrained") {
		SetProf("advantage", thisChck, ["Dex", false], "Restrained (condition)");
	}
	if (isReset || thisFld == "Invisible") {
		SetProf("advantage", thisChck, ["Att", true], "Invisible (condition)");
	}
	if (!isReset && thisFld == "Incapacitated" && (cFlds.Unconscious.checked || cFlds.Paralyzed.checked || cFlds.Petrified.checked || cFlds.Stunned.checked)) {
		Checkbox(cFlds.Incapacitated.name, true);
		cFlds.Incapacitated.checked = true;
	}
	if (isReset || thisFld == "ArmDis") {
		SetProf("advantage", thisChck, ["Ste", false], "Armor");
	}
	thermoM(0.25); //increment the progress dialog's progress

	// Ability checks disadvantage
	if (isReset || (/Exh|Frightened|Poisoned/).test(thisFld)) {
		var abiDisadv = cFlds.Exh1.checked || cFlds.Frightened.checked || cFlds.Poisoned.checked;
		for (var S = 0; S < SkillsList.abbreviations.length; S++) {
			SetProf("advantage", abiDisadv, [SkillsList.abbreviations[S], false], "Exhaustion, Frightened, or Poisoned (conditions)");
		};
	}
	thermoM(0.5); //increment the progress dialog's progress

	// Attack disadvantage
	if (isReset || (/Exh|Blinded|Frightened|Poisoned|Prone|Restrained/).test(thisFld)) {
		var attDisadv = cFlds.Exh3.checked || cFlds.Frightened.checked || cFlds.Poisoned.checked || cFlds.Prone.checked || cFlds.Restrained.checked || (cFlds.Blinded.checked && What("Class Features").toLowerCase().indexOf("feral senses") === -1);
		SetProf("advantage", attDisadv, ["Att", false], "Exhaustion, Blinded, Frightened, Poisoned, Prone, or Restrained (conditions)");
	}
	thermoM(0.75); //increment the progress dialog's progress

	// Set movement speed
	if (isReset || (/Exh|Grappled|Paralyzed|Petrified|Restrained|Stunned|Unconscious/).test(thisFld)) {
		var spdFormat = cFlds.Exh5.checked || cFlds.Grappled.checked || cFlds.Paralyzed.checked || cFlds.Petrified.checked || cFlds.Restrained.checked || cFlds.Stunned.checked || cFlds.Unconscious.checked ? "event.value = '0 " + (What("Unit System") == "imperial" ? "ft" : "m") + "';" :"";
		var spdFlds = ["Speed", "Speed encumbered"];
		for (var i = 0; i < spdFlds.length; i++) {
			tDoc.getField(spdFlds[i]).setAction("Format", spdFormat);
			Value(spdFlds[i], What(spdFlds[i]));
		}
	}

	IsNotConditionSet = true;
	thermoM(thermoTxt, true); // Stop progress bar
};

// apply the Class and Levels field change (field validation)
function classesFieldVal() {
	// if you ctrl/shift click into the field, any changes in it must be ignored as the class selection dialog is opened
	if (event.target.remVal !== undefined) {
		event.value = event.target.remVal;
		delete event.target.remVal;
	} else {
		ApplyClasses(event.value, true);
	};
}

// search the string for possible class and subclass
function ParseClass(input) {
	var classFound = "", classFoundLen = 0, classFoundDat = 0;
	var subFound = "", subFoundLen = 0, subFoundDat = 0;
	input = removeDiacritics(input);

	// Loop through all the classes and see if any of them match and then look for its subclasses
	// If that doesn't yield anything, look if any of the subclasses match regardless of class' names
	for (var i = 1; i <= 2; i++) {
		if (i == 2 && classFound) break; // something was already found in round 1, so no need for round 2
		for (var key in ClassList) { //scan string for all classes, choosing subclasses over classes
			var kObj = ClassList[key];
			if (i == 1) { // reset the subs for every class we look through if still looking at classes mainly
				subFoundLen = 0;
				subFoundDat = 0;
			}

			if ((i == 1 && !(kObj.regExpSearch).test(input)) // see if the class regex matches (round 1 only)
				|| testSource(key, kObj, "classExcl") // test if the class or its source isn't excluded
				|| (key === "ranger" && !testSource("rangerua", ClassList.rangerua, "classExcl")) // ignore the PHB ranger if the UA ranger is present
			) continue;

			// only go on with this entry if:
			// we are using the search length (default) and this entry has a longer name or this entry has an equal length name but has a newer source
			// or if we are not using the search length, just look at the newest source date
			var tempDate = sourceDate(kObj.source);
			if (i == 1 && ((!ignoreSearchLength && kObj.name.length < classFoundLen) || (!ignoreSearchLength && kObj.name.length == classFoundLen && tempDate < classFoundDat) || (ignoreSearchLength && tempDate <= classFoundDat))) continue;

			if (i == 1) { // we have a matching class! (round 1 only)
				classFound = key;
				classFoundLen = kObj.name.length;
				classFoundDat = tempDate;
				subFound = "";
				subFoundLen = 0;
				subFoundDat = 0;
			}

			// see if any of the sublasses match
			for (var sub = 0; sub < kObj.subclasses[1].length; sub++) {
				var subKey = kObj.subclasses[1][sub];
				var sObj = ClassSubList[subKey];

				if (!sObj // skip if the subclass isn't known in the ClassSubList object
					|| !(sObj.regExpSearch).test(input) // see if the subclass regex matches (round 1 only)
					|| testSource(subKey, sObj, "classExcl") // test if the subclass or its source isn't excluded
				) continue;

				// only go on with this entry if:
				// we are using the search length (default) and this entry has a longer name or this entry has an equal length name but has a newer source
				// or if we are not using the search length, just look at the newest source date
				var tempSubDate = sourceDate(sObj.source);
				if ((!ignoreSearchLength && sObj.subname.length < subFoundLen) || (!ignoreSearchLength && sObj.subname.length == subFoundLen && tempSubDate < subFoundDat) || (ignoreSearchLength && tempSubDate <= subFoundDat)) continue;

				// we have a match for both the class and the subclass!
				classFound = key;
				classFoundLen = kObj.name.length;
				classFoundDat = tempDate;
				subFound = subKey;
				subFoundLen = sObj.subname.length;
				subFoundDat = tempSubDate;
			}
		}
	}
	return classFound ? [classFound, subFound] : false;
};

// detects classes entered and parses information to global classes variable
function FindClasses(NotAtStartup, isFieldVal) {
	if (!NotAtStartup) classes.field = What("Class and Levels"); // called from startup

	// Initialize some variables
	var primeClass = "", gatherVars, deletedCurrentSpells = [];

	// Put the old classes.known in classes.old so the differences in level can be queried later
	classes.old = {};
	classes.oldprimary = classes.primary;
	classes.oldspellcastlvl = classes.spellcastlvl;
	for (var aClass in classes.known) {
		classes.old[aClass] = {
			classlevel : classes.known[aClass].level,
			subclass : classes.known[aClass].subclass,
			fullname : CurrentClasses[aClass].fullname
		}
	}

	// Remove starting numbers and clean the start/end of the string
	classes.field = classes.field.replace(/^[ \-.,\\/:;\d]+|[ \-.,\\/:;]+$/g, '');
	classes.totallevel = 0;

	// Get the different classes from the class field string
	classes.parsed = [];
	if (classes.field != "") {
		var ClDelimiter = clean(What("Delimiter"));
		var fieldRem = classes.field;
		var fieldSplit = fieldRem.match(/\D+|(\d+(\.|,))?\d+/g);
		var tempLevel = fieldSplit.length > 2 ? 1 : Math.max(Number(What("Character Level")), 1);
		// now loop through the found elements and add them to the classes.parsed array
		for (var i = 0; i < fieldSplit.length; i = i+2) {
			if (ClDelimiter) fieldSplit[i].replace(RegExp("^" + ClDelimiter.RegEscape(), "i"), '');
			var fieldLevel = fieldSplit[i+1] !== undefined ? parseFloat(fieldSplit[i+1]) : tempLevel;
			classes.parsed.push([clean(fieldSplit[i]), fieldLevel]);
			classes.totallevel += fieldLevel;
		}
	}

	// Reset the global classes variables
	classes.hd = [];
	classes.hp = 0;

	//find known classes and push them into known array, add hd
	var classesTemp = {};
	for (i = 0; i < classes.parsed.length; i++) {
		var tempLevel = classes.parsed[i][1];
		var tempFound = ParseClass(classes.parsed[i][0]);

		if (!tempFound) continue; // class not detected
		var tempClass = tempFound[0];
		var tempSubClass = tempFound[1];
		var tempSubClassOld = classes.old[aClass] && classes.old[aClass].subclass ? classes.old[aClass].subclass : false;
		var tempClObj = ClassList[tempClass];
		var tempDie = tempSubClass && ClassSubList[tempSubClass].die ? ClassSubList[tempSubClass].die : tempClObj.die;

		// see if the found class isn't a prestige class and if all prereqs are met. If not, skip this class
		var tempPrereq = !ignorePrereqs && tempClObj.prestigeClassPrereq ? tempClObj.prestigeClassPrereq : false;
		if (tempPrereq) {
			if (!isNaN(tempPrereq)) {
				tempPrereq = Number(tempPrereq) <= (classes.totallevel - tempLevel);
			} else {
				try {
					if (typeof tempPrereq == "string") {
						tempPrereq = eval(tempPrereq);
					} else if (typeof tempPrereq == 'function') {
						if (!gatherVars) gatherVars = gatherPrereqevalVars();
						tempPrereq(gatherVars);
					}
				} catch (err) {
					tempPrereq = true;
				}
			}
			// ask the user if we should apply this prestige class (only if not a reset, import, or load on startup)
			if (tempPrereq === false && IsNotReset && IsNotImport && NotAtStartup) {
				var prestClMsg = app.alert({
					nType : 2, // Yes,No
					nIcon : 1, // Warning
					cTitle : "Prestige class prerequisites not met!",
					cMsg : "The prestige class '" + tempClObj.name + "' has a prerequisite which wasn't met. Apply this prestige class anyway?\n\nIf you select 'No', the " + tempLevel + " level(s) of this prestige class will be counted towards the total character level, but none of its features will be added."
				});
				if (prestClMsg == 3) continue; // user decided not to apply the prestige class
			}
		}

		// set the primary class if not yet defined and this is not a prestige class
		if (primeClass === "" && !tempClObj.prestigeClassPrereq) primeClass = tempClass;

		// set the object for this class (later to be set to classes.known)
		classesTemp[tempClass] = {
			name : tempClass,
			level : tempLevel,
			subclass : tempSubClass,
			string : classes.parsed[i][0]
		};

		// Ask for subclass if none is defined and this is not a reset, import, or a sheet startup event and not after just removing a subclass
		if (IsNotReset && IsNotImport && NotAtStartup && !tempSubClass && tempClObj.subclasses[1].length && !tempSubClassOld) {
			// first check at what level this class gets it subclass and if we are at that level yet
			var enoughLevel = false;
			for (var propKey in tempClObj.features) {
				var tempProp = tempClObj.features[propKey];
				if (propKey.indexOf("subclassfeature") == -1 || !tempProp.minlevel || tempProp.minlevel > tempLevel) continue;
				enoughLevel = true;
				break;
			}
			if (enoughLevel) {
				var newSubClass = PleaseSubclass(tempClass, classesTemp[tempClass].string);
				if (newSubClass) {
					classesTemp[tempClass].subclass = newSubClass[0];
					classesTemp[tempClass].string = newSubClass[1];
					classes.field = classes.field.replace(classes.parsed[i][0], newSubClass[1]);
					classes.parsed[i][0] = newSubClass[1];
				}
			}
		}

		if (classes.hd[tempDie] === undefined) { //add hd
			classes.hd[tempDie] = [tempDie, tempLevel];
		} else {
			classes.hd[tempDie][1] += tempLevel;
		};

		if (classes.hp === 0) { //add first level hp
			classes.hp = tempDie;
		};
	};

	// if there is only a single class, remove the level from the classes.field (if present)
	if (classes.parsed.length == 1 && classes.field.indexOf(classes.parsed[0][1]) !== -1) {
		classes.field = clean(classes.field.replace(classes.parsed[0][1], ''));
	}

	// if any of the above changed the classes.field set it
	if (NotAtStartup && !isFieldVal && What("Class and Levels") != classes.field) {
		tDoc.getField("Class and Levels").remVal = classes.field;
		Value("Class and Levels", classes.field);
	} else if (NotAtStartup && isFieldVal && event.value != classes.field) {
		event.value = classes.field;
	}

	// if the found classes are the exact same as the classes.known, don't do anything
	var isChange = primeClass !== classes.primary;
	if (!isChange) {
		var testArray = [];
		for (var testCl in classesTemp) testArray.push(testCl);
		for (var testCl in classes.known) testArray.push(testCl);
		for (var t = 0; t < testArray.length; t++) {
			var theKcl = classes.known[testArray[t]];
			var theNcl = classesTemp[testArray[t]];
			if (theKcl && theNcl && theNcl.name === theKcl.name && theNcl.level === theKcl.level && theNcl.subclass === theKcl.subclass) {
				theKcl.string = theNcl.string; // because otherwise we skip this change, if it is the only thing that changes
				continue;
			}
			isChange = true;
			break;
		};
	};
	if (!isChange && NotAtStartup) {
		ApplyClassLevel(true);
		return true;
	};

	// Check every class in classes old and if they are not in classesTemp, remove their features
	if (NotAtStartup) { for (var oClass in classes.old) {
		// if this class exists, was the primary class, and is no longer, change things up
		if (classesTemp[oClass] && classes.primary === oClass && primeClass !== classes.primary) {
			// first remove its primary class attributes
			ApplyClassBaseAttributes(false, oClass, true);
			// then add its non-primary class attributes
			ApplyClassBaseAttributes(true, oClass, false);
		}

		if (!classesTemp[oClass]) {
			// remove the class base features if removing the class
			ApplyClassBaseAttributes(false, oClass, classes.primary == oClass);
			// reset the tooltip of the equipment menu if this was the primary class
			if (classes.primary == oClass) AddTooltip("Equipment.menu", "Click here to add equipment to the adventuring gear section, or to reset it (this button does not print).\n\nIt is recommended to pick a pack first before you add any background's items.");
			// remove the class from the CurrentSpells variable
			delete CurrentSpells[oClass];
		} else if (classesTemp[oClass].subclass !== classes.old[oClass].subclass) {
			// when only changing the subclass, or adding a new one, remove the base features of the subclass and add those of the new class
			ApplyClassBaseAttributes([classes.old[oClass].subclass, classesTemp[oClass].subclass], oClass, classes.primary == oClass);
			// if the class doesn't have spellcasting, but the old subclass did, remove it from the CurrentSpells variable (if the new subclass has spellcasting, we will create that again below)
			var oldSubClass = classes.old[oClass].subclass ? ClassSubList[classes.old[oClass].subclass] : false;
			if (oldSubClass && oldSubClass.spellcastingFactor && !ClassList[oClass].spellcastingFactor) {
				deletedCurrentSpells.push(oClass);
				delete CurrentSpells[oClass];
			}
		}

		// update things when removing a whole class or when removing a subclass
		if (!classesTemp[oClass] || (classesTemp[oClass].subclass !== classes.old[oClass].subclass && classes.old[oClass].subclass)) {
			// Temporarily add the class to classes known for the next step
			classes.known = {};
			classes.known[oClass] = {
				name : oClass,
				level : 0,
				subclass : classes.old[oClass].subclass
			}
			// Remove all the features of the class (remember, new level is set to 0 above)
			UpdateLevelFeatures("class");

			// If changing subclass, set the class' old level to 0 so all features are added again in full
			if (classesTemp[oClass]) classes.old[oClass].classlevel = 0;

			// If removing the (sub)class, also remove the class from the SubClass Remember field
			if (!classesTemp[oClass] || !classesTemp[oClass].subclass) {
				RemoveString("SubClass Remember", oClass, false);
			}
		}
	} }

	classes.known = classesTemp;
	classes.primary = primeClass;

	var multiCaster = {default : 0, warlock : 0};

	temp = [1];
	//lookup classes and subclasses and put their attributes in CurrentClasses global variable
	for (var aClass in classes.known) {

		//define new global variable based on the known classes
		CurrentClasses[aClass] = {
			name : "", //must exist
			subname : "", //must exist
			fullname : "", //must exist
			source : "", //must exist
			attacks : [1], //must exist
			features : {}, //must exist
			equipment : "", //must exist
			prereqs : "", //must exist
			primaryAbility : "", //must exist
			improvements : [0] //must exist
		};

		var Temps = CurrentClasses[aClass];
		var classObj = ClassList[aClass];
		var subClObj = classes.known[aClass].subclass && ClassSubList[classes.known[aClass].subclass] ? ClassSubList[classes.known[aClass].subclass] : false;

		// Fill in the properties of this newly defined global variable and prefer subclass attributes over class attributes
		for (var prop in classObj) { // the class
			if ((/^(subname|features)$/i).test(prop)) continue;
			Temps[prop] = classObj[prop];
		}
		if (subClObj) { // the subclass, if it exists
			for (var prop in subClObj) {
				if ((/^(name|features|prereqs|primaryAbility)$/i).test(prop)) continue;
				Temps[prop] = subClObj[prop];
			}
			// --- backwards compatibility --- //
			// if an old attribute exists in the subclass, but the ClassList object uses the new attribute name, make sure the subclass's version is used
			var backwardsAttr = [["armor", "armorProfs"], ["weapons", "weaponProfs"]];
			for (var i = 0; i < backwardsAttr.length; i++) {
				var aBW = backwardsAttr[i];
				if (subClObj[aBW[0]] && subClObj[aBW[1]] == undefined && classObj[aBW[1]]) delete Temps[aBW[1]];
			}
		}

		//special something for classes that have alternative ability scores that can be used for the DC
		if (Temps.abilitySave && Temps.abilitySaveAlt) {
			var as1 = Number(What(AbilityScores.abbreviations[Temps.abilitySave - 1]));
			var as2 = Number(What(AbilityScores.abbreviations[Temps.abilitySaveAlt - 1]));
			if (as1 < as2) Temps.abilitySave = Temps.abilitySaveAlt;
		}

		var fAB = [];
		var fTrans = {};
		//add features of the class
		for (prop in classObj.features) {
			var cPropAtt = classObj.features[prop];
			var fNm = ("0" + cPropAtt.minlevel).slice(-2) + ((/subclassfeature/i).test(prop) ? "" : "()") + cPropAtt.name;
			//subClObj && subClObj.features[prop]
			if (fNm.toString().length > 2) {
				fAB.push(fNm);
				fTrans[fNm] = {name: prop, list: "ClassList", item: aClass};
			}
		}

		//add features of subclass
		if (subClObj && subClObj.features) {
			for (prop in subClObj.features) {
				var csPropAtt = subClObj.features[prop];
				var fNm = ("0" + csPropAtt.minlevel).slice(-2) + csPropAtt.name;
				if (fNm.toString().length > 2) {
					fAB.push(fNm);
					fTrans[fNm] = {name: prop, list: "ClassSubList", item: classes.known[aClass].subclass};
				}
			}
		}

		fAB.sort();

		for (var f = 0; f < fAB.length; f++) {
			var propAtt = fTrans[fAB[f]];
			if (subClObj && propAtt.list === "ClassList" && subClObj.features[propAtt.name]) continue; // skip any features from the class if a subclass is known and has that same feature
			Temps.features[propAtt.name] = tDoc[propAtt.list][propAtt.item].features[propAtt.name];
			// set the extrachoice attribute of the feature if it is dependent on a choice
			if (Temps.features[propAtt.name].choiceSetsExtrachoices) {
				applyExtrachoicesOfChoice(aClass, propAtt.name, false, true);
			}
		}

		//make fullname if not defined by subclass
		if (Temps.fullname === "") {
			Temps.fullname = Temps.name + (Temps.subname ? " (" + Temps.subname + ")" : "");
		}

		//see if this class is a spellcaster and what we need to do with that
		if (Temps.spellcastingFactor) {
			var casterType = !isNaN(Temps.spellcastingFactor) ? "default" : Temps.spellcastingFactor.replace(/\d/g, "");
			var casterFactor = !isNaN(Temps.spellcastingFactor) ? Number(Temps.spellcastingFactor) : (/\d/g).test(Temps.spellcastingFactor) ? Number(Temps.spellcastingFactor.match(/\d/g).join("")) : 1;
			// now only continue if the class level is the factor or higher
			var isCasterAtLvl = function(lvl) {
				var theRe = Math.max(casterFactor, 1) <= lvl;
				// or if the class has its own spell slot progression, check against that
				if (!theRe && Temps.spellcastingTable && Temps.spellcastingTable[lvl]) {
					theRe = 0 < Temps.spellcastingTable[lvl].reduce(function (total, num) {
						return total + num;
					});
				}
				return theRe;
			}
			var casterAtCurLvl = isCasterAtLvl(classes.known[aClass].level);
			var casterAtOldLvl = classes.old[aClass] ? isCasterAtLvl(classes.old[aClass].classlevel) : 0;
			if (casterAtCurLvl) {
				// add one to the casterType for seeing if this casterType is multiclassing later on
				if (multiCaster[casterType]) {
					multiCaster[casterType] += 1;
				} else {
					multiCaster[casterType] = 1;
				}
				// create the base object (or recreate if subclass changed or added)
				if (NotAtStartup && (casterAtCurLvl != casterAtOldLvl || classes.known[aClass].subclass !== classes.old[aClass].subclass)) {
					var cSpells = CreateCurrentSpellsEntry("class", aClass);
					// then update this base object so that it is a spellcasting class with options
					if (cSpells) {
						cSpells.list = Temps.spellcastingList ? Temps.spellcastingList : {class : aClass};
						cSpells.known = Temps.spellcastingKnown ? Temps.spellcastingKnown : "";
						cSpells.typeSp = !cSpells.known || !cSpells.known.spells || isArray(cSpells.known.spells) || !isNaN(cSpells.known.spells) ? "known" : cSpells.known.spells;
						cSpells.factor = [casterFactor, casterType];
						cSpells.spellsTable = Temps.spellcastingTable ? Temps.spellcastingTable : false;
						if (Temps.spellcastingExtra && deletedCurrentSpells.indexOf(aClass) !== -1) {
							// Set the extra (and extraSpecial) attributes if we had to recreate this CurrentSpells object
							processSpellcastingExtra(true, aClass, 0, "", Temps.spellcastingExtra, Temps.spellcastingExtraApplyNonconform);
						};
					}
				} else if (NotAtStartup && CurrentSpells[aClass]) {
					CurrentSpells[aClass].level = classes.known[aClass].level;
				}
			} else if (NotAtStartup && CurrentSpells[aClass] && !ObjLength(CurrentSpells[aClass].bonus)) {
				// not high enough level to be a spellcaster anymore and no bonus spells, so remove the object if it exists
				delete CurrentSpells[aClass];
				CurrentUpdates.types.push("spells");
			}
		}

		//add number of attacks to temp array
		temp.push(Temps.attacks[Math.min(classes.known[aClass].level, Temps.attacks.length) - 1]);
	}
	//pick highest number of attacks in temp array and put that into global classes variable
	classes.attacks = Math.max.apply(Math, temp);

	//reset the global variable for spellcasting levels
	classes.spellcastlvl = {default : 0, warlock : 0, spellpoints : 0};
	//loop through the classes to find the new spellcasting level totals (can't be done in previous loop, because we need to know the total amount of casters of each type, which is set in previous loop)
	for (var aClass in classes.known) {
		var Temps = CurrentClasses[aClass];
		var cSpells = CurrentSpells[aClass];
		// don't go on if this is not a spellcaster or its factor is lower than its level (thus, no spell slots at this level)
		if (!cSpells || !cSpells.factor || (!Temps.spellcastingTable && cSpells.factor[0] > cSpells.level)) continue;
		var casterFactor = cSpells.factor[0];
		var casterType = cSpells.factor[1];
		// Now calculate the effective caster level and add it to the casterType
		if (Temps.spellcastingTable && multiCaster[casterType] === 1) {
			var casterLvl = Math.min(Temps.spellcastingTable.length - 1, classes.known[aClass].level);
			// Sum the values in the row at the current caster level and add it to the otherTables
			classes.spellcastlvl.otherTables = !classes.spellcastlvl.otherTables ? Temps.spellcastingTable[casterLvl] : classes.spellcastlvl.otherTables.map(function (num, idx) {
				return num + Temps.spellcastingTable[casterLvl][idx];
			});
		} else {
			if (classes.spellcastlvl[casterType] == undefined) classes.spellcastlvl[casterType] = 0;
			classes.spellcastlvl[casterType] += Math[multiCaster[casterType] > 1 && !Temps.spellcastingFactorRoundupMulti ? "floor" : "ceil"](cSpells.level / casterFactor);
		}
		if (casterType === "default") classes.spellcastlvl.spellpoints += Math[!Temps.spellcastingFactorRoundupMulti ? "floor" : "ceil"](cSpells.level / casterFactor);
	}

	if (!NotAtStartup) { // add the current classes.known into classes.old on startup of the sheet
		for (var aClass in classes.known) {
			classes.old[aClass] = {
				classlevel : classes.known[aClass].level,
				subclass : classes.known[aClass].subclass,
				fullname : CurrentClasses[aClass].fullname
			}
		}
		classes.oldspellcastlvl = classes.spellcastlvl;
		classes.oldprimary = classes.primary;
	} else { // if not a startup event, update the field with the CurrentSpells variable
		SetStringifieds("spells");
	}

	return false;
};

// apply the effect of the classes
function ApplyClasses(inputclasstxt, isFieldVal) {
	isFieldVal = isFieldVal ? isFieldVal : false;
	classes.field = inputclasstxt;

	// Stop if class is set to manual or if the entered classes are the same as classes.known
	if (CurrentVars.manual.classes || FindClasses(true, isFieldVal)) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying the class(es)...");
	calcStop();
	thermoM(1/4); // Increment the progress bar

	// Tell prompt there was a class change
	CurrentUpdates.types.push("classes");

	// Put hit dice on sheet
	var hdChanged = false;
	if (classes.hd.length > 0) classes.hd.sort(function (a, b) { return a - b; }); // sort by biggest HD
	for (var i = 0; i < 3; i++) { // loop through the 3 HD fields
		var hdLvl = classes.hd[i] ? Math.min(classes.hd[i][1], 999) : "";
		var hdDie = classes.hd[i] ? classes.hd[i][0] : "";
		if (!hdChanged) hdChanged = What("HD" + (i+1) + " Level") != hdLvl || What("HD" + (i+1) + " Die") != hdDie;
		Value("HD" + (i+1) + " Level", hdLvl);
		Value("HD" + (i+1) + " Die", hdDie);
	}
	// If the HD changed, prompt the user about this and update the HP tooltip
	if (hdChanged || CurrentEvals.hp) CurrentUpdates.types.push("hp");

	thermoM(2/4); // Increment the progress bar

	// Add attributes of each class, if we didn't do so already
	var primaryChange = !classes.oldprimary || classes.oldprimary !== classes.primary;
	for (var aClass in classes.known) {
		// don't process this class if it already existed, but do process it if it became the new primary class
		if (classes.old[aClass] && (!primaryChange || classes.primary !== aClass)) continue;
		// process its attributes
		ApplyClassBaseAttributes(true, aClass, classes.primary == aClass);
		// set the tooltip if the new primary class
		if (classes.primary == aClass) {
			AddTooltip("Equipment.menu", "Click here to add equipment to the adventuring gear section, or to reset it (this button does not print).\n\nIt is recommended to pick a pack first before you add any background's items.\n\n" + CurrentClasses[classes.primary].equipment);
		}
	}

	thermoM(3/4); // Increment the progress bar

	// Have the prompt check if something changed in Ability Score Increases gained form levels
	CurrentUpdates.types.push("testasi");

	// If something changed in spellcasting
	if (classes.oldspellcastlvl.toSource() != classes.spellcastlvl.toSource()) {
		thermoTxt = thermoM("Setting spell slots...", false); //change the progress dialog text
		// Set the spell slots of the class' levels
		for (var ss = 0; ss <= 8; ss++) {
			var SpellSlotsName = "SpellSlots.CheckboxesSet.lvl" + (ss + 1);
			var SpellSlotsField = Number(What(SpellSlotsName));
			var SpellSlotsTotal = SpellSlotsField;
			for (var casterType in classes.spellcastlvl) {
				var spTable = tDoc[casterType + "SpellTable"];
				if (casterType == "otherTables") {
					SpellSlotsTotal += classes.spellcastlvl.otherTables[ss];
				} else if (spTable) {
					SpellSlotsTotal += spTable[Math.min(spTable.length - 1, classes.spellcastlvl[casterType])][ss];
					SpellSlotsTotal -= classes.oldspellcastlvl[casterType] ? spTable[Math.min(spTable.length - 1, classes.oldspellcastlvl[casterType])][ss] : 0;
				}
			}
			if (classes.oldspellcastlvl.otherTables) SpellSlotsTotal -= classes.oldspellcastlvl.otherTables[ss];
			if (SpellSlotsField != SpellSlotsTotal) Value(SpellSlotsName, SpellSlotsTotal);
		}
		// Update the spell points limited feature (if enabled)
		if (What("SpellSlotsRemember") === "[false,false]") SpellPointsLimFea("Add");
	}
	// Have the prompt check if something changed to warrant generating new spell sheets
	if (classes.spellcastlvl.default || classes.spellcastlvl.warlock || classes.spellcastlvl.otherTables || classes.oldspellcastlvl.default || classes.oldspellcastlvl.warlock || classes.oldspellcastlvl.otherTables) {
		CurrentUpdates.types.push("testclassspellcasting");
	}

	thermoM(thermoTxt, true); // Stop progress bar

	ApplyClassLevel(); // Lastly, update the level and level-dependent features (or just the class features if level didn't change)

	// Set some visibilities dependent on class-levels
	SetTheAbilitySaveDCs();
	AddAttacksPerAction();
	ClassMenuVisibility();
};

function ClassMenuVisibility() {
	// Show the option button if a class has features that offers a choice
	if (MakeClassMenu()) {
		DontPrint("Class Features Menu");
	} else {
		Hide("Class Features Menu");
	}
}

// a function to apply the class level depending on how it was changed
function ApplyClassLevel(noChange) {
	if (IsCharLvlVal !== false) { // called during a Level field change event
		IsCharLvlVal = classes.totallevel;
	} else if (Number(What("Character Level")) != classes.totallevel) {
		Value("Character Level", classes.totallevel);
	} else if (!noChange) { // the classes changed, but the total level didn't, so only call to update the class features
		UpdateLevelFeatures("class");
	}
}

// apply the Character Level field change (field validation)
function levelFieldVal() {
	var lvlOld = Number(What(event.target.name));
	var lvl = Number(event.value);
	if (lvlOld == lvl) { // no level change, but it could be an empty string changed to '0' or vice versa
		event.value = lvl > 0 ? lvl : '';
		return;
	}

	IsCharLvlVal = lvl; // save level to global variable

	if (lvl != classes.totallevel && IsNotReset && IsNotImport) { // new level not the same as total level for found classes, so ask how to allocate this level to a (new) class
		AskMulticlassing();
	}

	if (IsCharLvlVal != lvl) { // the above might have changed the total level, so correct that
		lvl = IsCharLvlVal;
	}

	UpdateLevelFeatures("all", Math.max(1,lvl)); // update all level features and use the set level

	IsCharLvlVal = false; // reset global variable

	// make sure to update the experience points (or similar system) and alert the user
	CurrentUpdates.types.push("xp");

	event.value = lvl > 0 ? lvl : '';
}

function getCurrentLevelByXP(level, exp) {
	level = Number(level);
	exp = Number(exp.replace(",", "."));
	var LVLbyXP = ExperiencePointsList.reduce(function(acc, val) { return acc += exp >= Number(val) ? 1 : 0; }, 0);
	var XPforLVL = !level || isNaN(level) || level < 2 ? 0 : ExperiencePointsList[Math.min(ExperiencePointsList.length - 1, level - 1)];
	return [LVLbyXP, XPforLVL];
}

//Check if the level or XP entered matches the XP or level
function CalcExperienceLevel() {
	// initialise some variables
	var Level = Number(What("Character Level"));
	var exp = What("Total Experience");
	var getLvlXp = getCurrentLevelByXP(Level, exp);
	var LVLbyXP = getLvlXp[0];
	var XPforLVL = getLvlXp[1];

	// if the level and experience points match or both are 0, stop this function
	// also stop this function if the level is higher than the xp table allows (> 20)
	// also stop this function if the experience points are more than the xp table allows (> 1000000000)
	if (Level === LVLbyXP || (!Level && !exp) || Level >= ExperiencePointsList.length || LVLbyXP >= (ExperiencePointsList.length)) return;

	// create the strings for the dialog
	var LVLtxt = Level >= ExperiencePointsList.length ? "a level higher than 20" : "level " + Level;
	var XPtxt = !exp ? "no" : "only " + exp;
	var StringHigherLvl = "This character has " + XPtxt + " experience points. This is not enough to attain the level is currently has (" + Level + "). You need at least " + XPforLVL + " experience points for " + LVLtxt + ".\n\nYou can upgrade the experience points to " + XPforLVL + ", downgrade the level to " + LVLbyXP + ", or leave it as it is.";
	var StringHigherXP = "This character is level " + Level + ", but already has " + exp + " experience points. This amount is enough to attain level " + LVLbyXP + ".\n\nYou can upgrade the level to " + LVLbyXP + ", downgrade the experience points to " + XPforLVL + ", or leave it as it is.";

	var Experience_Dialog = {
		result : false,
		//when pressing the ok button
		commit : function (dialog) {
			this.result = Level > LVLbyXP ? "XPre" : "LVLr";
		},
		//when pressing the other button
		other : function (dialog) {
			this.result = Level > LVLbyXP ? "LVLr" : "XPre";
			dialog.end("ok");
		},
		description : {
			name : "EXPERIENCE POINTS DIALOG",
			elements : [{
				type : "view",
				elements : [{
					type : "static_text",
					name : "Level and Experience Points do not match!",
					item_id : "head",
					alignment : "align_top",
					font : "heading",
					bold : true,
					height : 21,
					char_width : 45
				}, {
					type : "static_text",
					item_id : "text",
					alignment : "align_fill",
					font : "dialog",
					char_width : 45,
					wrap_name : true,
					name : Level > LVLbyXP ? StringHigherLvl : StringHigherXP
				}, {
					type : "ok_cancel_other",
					ok_name : Level > LVLbyXP ? "Upgrade XP to " + XPforLVL : "Upgrade level to " + LVLbyXP,
					other_name : Level > LVLbyXP ? "Downgrade level to " + LVLbyXP : "Downgrade XP to " + XPforLVL,
				}]
			}]
		}
	};

	var dia = app.execDialog(Experience_Dialog);
	switch (Experience_Dialog.result) {
		case "LVLr":
			Value("Character Level", LVLbyXP);
			break;
		case "XPre":
			Value("Total Experience", XPforLVL);
			break;
	};
};

function AddExperiencePoints() {
	if (!What("Add Experience")) return;
	var XPS = Number(What("Total Experience").replace(/,/g, "."));
	var AddXP = Number(What("Add Experience").replace(/,/g, "."));
	Value("Total Experience", RoundTo(XPS + AddXP, 0.01));
	Value("Add Experience", "");
	CalcExperienceLevel(true);
};

function ParseRace(input) {
	var resultArray = ["", "", []];
	if (!input) return resultArray;

	input = removeDiacritics(input);
	var foundLen = 0;
	var foundDat = 0;

	for (var key in RaceList) {
		var kObj = RaceList[key];

		if (!kObj.regExpSearch.test(input) // see if race regex matches
			|| testSource(key, kObj, "racesExcl") // test if the race or its source isn't excluded
		) continue;

		// only go on with this entry if:
		// we are using the search length (default) and this entry has a longer name or this entry has an equal length name but has a newer source
		// or if we are not using the search length, just look at the newest source date
		var tempDate = sourceDate(kObj.source);
		if ((!ignoreSearchLength && kObj.name.length < foundLen) || (!ignoreSearchLength && kObj.name.length == foundLen && tempDate < foundDat) || (ignoreSearchLength && tempDate <= foundDat)) continue;

		// we have a match, set the values
		resultArray = [key, "", []];
		foundLen = kObj.name.length;
		foundDat = tempDate;

		// now see if we need to look for racial variants
		if (kObj.variants) {
			var foundLen2 = 0;
			var foundDat2 = 0;
			for (var sub = 0; sub < kObj.variants.length; sub++) { // scan string for all variants of the race
				var theR = key + "-" + kObj.variants[sub];
				var rVars = RaceSubList[theR];
				if (!rVars) {
					console.println("The racial variant '" + kObj.variants[sub] + "' for the '" + kObj.name + "' race is not found in the RaceSubList. Please contact the author of this race to have this issue corrected. The variant will be ignored for now.");
					console.show();
					continue;
				}
				var theRname = rVars.name ? rVars.name : kObj.variants[sub];

				// test if the racial variant or its source isn't excluded
				if (testSource(theR, rVars, "racesExcl")) continue;

				resultArray[2].push(kObj.variants[sub]);

				// see if racial variant regex matches
				if (!(rVars.regExpSearch).test(input)) continue;

				// only go on with this entry if:
				// we are using the search length (default) and this entry has a longer name or this entry has an equal length name but has a newer source
				// or if we are not using the search length, just look at the newest source date
				var tempDate = sourceDate(rVars.source);
				if ((!ignoreSearchLength && theRname.length < foundLen2) || (!ignoreSearchLength && theRname.length == foundLen2 && tempDate < foundDat) || (ignoreSearchLength && tempDate <= foundDat)) continue;

				// we have a match, set the values
				resultArray[1] = kObj.variants[sub];
				foundLen2 = theRname.length;
				foundDat2 = tempDate;
			}
		}
	}
	return resultArray;
};

//detects race entered and put information to global CurrentRace variable
function FindRace(inputracetxt, novardialog, aOldRace) {
	var tempString = inputracetxt === undefined ? What("Race Remember") : inputracetxt;
	var tempFound = ParseRace(tempString);
	if (!aOldRace && CurrentVars.oldRace) {
		aOldRace = CurrentVars.oldRace;
	} else if (IsNotImport && aOldRace && (!CurrentVars.oldRace || CurrentVars.oldRace[0] !== aOldRace[0])) {
		// only change if the known is new or changes, not just the variant
		CurrentVars.oldRace = aOldRace;
		SetStringifieds("vars");
	}

	CurrentRace = {
		known : tempFound[0],
		knownOld : aOldRace ? aOldRace[0] : "",
		variant : tempFound[1],
		variantOld : aOldRace ? aOldRace[1] : "",
		variants : tempFound[2],
		level : 0,
		name : "", //must exist
		source : "", //must exist
		plural : "", //must exist
		size : 3, //must exist
		age : "", //must exist
		height : "", //must exist
		weight : "", //must exist
		trait : "", //must exist
		features : "" //must exist
	};

	if (inputracetxt === undefined && CurrentVars.manual.race) return; // don't do the rest of this function if race is set to manual and this is not a startup event

	//show the option button if the race has selectable variants
	if (!tempFound[2].length) {
		Hide("Race Features Menu");
	} else {
		DontPrint("Race Features Menu");
		// if no variant was found, ask the user if he wants to select one
		if (!novardialog && IsNotImport && inputracetxt && !tempFound[1] && !CurrentVars.manual.race) {
			var aRace = RaceList[tempFound[0]];
			var rSource = stringSource(aRace, 'first,abbr', "    [", "]");
			var aBasic = "Basic " + aRace.name.toLowerCase() + rSource;
			var rVarNames = [aBasic];
			var rVarObj = {};
			rVarObj[aBasic] = "";
			for (var i = 0; i < tempFound[2].length; i++) {
				var varR = tempFound[2][i];
				var varRobj = RaceSubList[tempFound[0] + "-" + varR];
				var varRname = varR.capitalize() + " " + aRace.name.toLowerCase();
				var varRsrc = varRobj && varRobj.source ? stringSource(varRobj, 'first,abbr', "    [", "]") : rSource;
				rVarNames.push(varRname + varRsrc);
				rVarObj[varRname + varRsrc] = varR;
			}
			var aResp = AskUserOptions("Select Racial Variant", "The '" + aRace.name + "' race offers a choice of variants. Note that variants are not the same as subraces. If you want to select a different subrace, use the drop-down box in the Race field.\n\nYou can change the selected variant by typing the full name of another variant into the Race field, or with the Racial Options button in the Racial Traits section on the second page.", rVarNames, "radio", true);
			if (rVarObj[aResp]) CurrentRace.variant = rVarObj[aResp];
		}
	}

	// set the properties of the CurrentRace object
	if (CurrentRace.known) {
		// the properties of the main race
		for (var prop in RaceList[CurrentRace.known]) {
			if ((/^(known(Old)?|variants?(Old)?|level)$/i).test(prop)) continue;
			CurrentRace[prop] = RaceList[CurrentRace.known][prop];
		}
		// the properties of the variant (overriding anything from the main)
		if (CurrentRace.variant) {
			var subrace = CurrentRace.known + "-" + CurrentRace.variant;
			for (var prop in RaceSubList[subrace]) {
				if ((/^(known(Old)?|variants?(Old)?|level)$/i).test(prop)) continue;
				CurrentRace[prop] = RaceSubList[subrace][prop];
			}
			// --- backwards compatibility --- //
			// if an old attribute exists in the racial variant, but the RaceList object uses the new attribute name, make sure the variant's version is used
			var backwardsAttr = [["improvements", "scorestxt"], ["armor", "armorProfs"], ["addarmor", "armorAdd"], ["weaponprofs", "weaponProfs"], ["weapons", "weaponsAdd"]];
			for (var i = 0; i < backwardsAttr.length; i++) {
				var aBW = backwardsAttr[i];
				if (RaceSubList[subrace][aBW[0]] && RaceSubList[subrace][aBW[1]] == undefined && RaceList[CurrentRace.known][aBW[1]]) CurrentRace[aBW[1]] = RaceSubList[subrace][aBW[0]];
			}
		}
		// the properties from a previous race (overriding anything from the main) (inputracetxt === undefined at startup)
		if (CurrentRace.useFromPreviousRace) {
			CurrentRace = newObj(CurrentRace);
			var bSkipDialogAndForce = inputracetxt && IsNotImport ? undefined : CurrentVars.oldRaceAmendRemember ? true : false;
			AmendOldToNewRace(CurrentRace.useFromPreviousRace, bSkipDialogAndForce);
		}
	}

	// set the current race level when loading the sheet
	if (!inputracetxt && CurrentRace.known) CurrentRace.level = What("Character Level") ? Number(What("Character Level")) : 1;
};

//apply the effect of the player's race
function ApplyRace(inputracetxt, novardialog) {
	if (IsSetDropDowns) return; // when just changing the dropdowns, don't do anything

	if (CurrentVars.manual.race) { // if race is set to manual, just put the text in the Race Remember
		var newRace = ParseRace(inputracetxt);
		Value("Race Remember", newRace[0] + (newRace[1] ? "-" + newRace[1]  : ""));
		return;
	}

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying race...");
	calcStop();

	var newRace = ParseRace(inputracetxt);
	var oldRace = [CurrentRace.known, CurrentRace.variant];
	if (newRace[0] !== oldRace[0] || newRace[1] !== oldRace[1]) {
		if (CurrentRace.known) {// remove the old race if one was detected
			thermoTxt = thermoM("Removing the " + CurrentRace.name + " features...", false); //change the progress dialog text

			// Remove tooltips from some fields
			var tooltipRemove = ["Height", "Weight", "Age"];
			for (i = 0; i < tooltipRemove.length; i++) {
				AddTooltip(tooltipRemove[i], "", "");
			};
			AddTooltip("Size Category", "Selected size category will effect encumbrance on the second page.");
			Value("Racial Traits", "", "");

			// Remove the common attributes from the CurrentRace object and remove the CurrentRace features
			UpdateLevelFeatures("race", 0);
		}
		FindRace(inputracetxt, novardialog, oldRace);
		Value("Race Remember", CurrentRace.known + (CurrentRace.variant ? "-" + CurrentRace.variant : ""));
	}

	if (CurrentRace.known && (CurrentRace.known !== oldRace[0] || CurrentRace.variant !== oldRace[1])) {
		thermoTxt = thermoM("Applying the " + CurrentRace.name + " features...", false); //change the progress dialog text
		thermoM(1/10); //increment the progress dialog's progress

		// Add race height
		var theHeight = What("Unit System") === "metric" && CurrentRace.heightMetric ? CurrentRace.heightMetric : CurrentRace.height;
		AddTooltip("Height", CurrentRace.plural + theHeight);
		// Add race weight
		var theWeight = What("Unit System") === "metric" ? CurrentRace.weightMetric : CurrentRace.weight;
		AddTooltip("Weight", CurrentRace.plural + theWeight);
		// Add race age
		AddTooltip("Age", CurrentRace.plural + CurrentRace.age);
		// Add race size
		SetCreatureSize(false, [inputracetxt, CurrentRace.plural], CurrentRace.size);
		// Add racial traits
		var tempString = stringSource(CurrentRace, "full,page", CurrentRace.name + " is found in ", ".");
		var theTraits = What("Unit System") === "imperial" ? CurrentRace.trait : ConvertToMetric(CurrentRace.trait, 0.5);
		Value("Racial Traits", theTraits, tempString);

		thermoM(2/6); //increment the progress dialog's progress

		// Process the common attributes from the CurrentRace object and its features
		UpdateLevelFeatures("race");

		thermoM(3/4); //increment the progress dialog's progress
	};

	thermoTxt = thermoM("Finalizing the changes of the race...", false); //change the progress dialog text
	SetTheAbilitySaveDCs();

	SetStringifieds(); // set the global variables to their fields for future reference

	thermoM(thermoTxt, true); // Stop progress bar
};

// Use parts of the old race to amend to the newrace, using CurrentRace.known(Old) and CurrentRace.variant(Old)
function AmendOldToNewRace(oInstr, bSkipDialogAndForce) {
	// If the knownOld race doesn't exist, fix the variable
	if (CurrentRace.knownOld && !RaceList[CurrentRace.knownOld]) {
		CurrentRace.knownOld = "";
		CurrentRace.variantOld = "";
	}
	var iAskUser = 3; // No
	var oOldRace = RaceList[CurrentRace.knownOld];
	var oOldVariant = RaceSubList[CurrentRace.knownOld + "-" + CurrentRace.variantOld];
	// Check if there is a new and old race known and they aren't identical
	if (!CurrentRace.known || !CurrentRace.knownOld || CurrentRace.known === CurrentRace.knownOld) {
		// Show a message for how this type of race works
		if (bSkipDialogAndForce === undefined && !CurrentRace.knownOld) {
			app.alert({
				nIcon : 3, // Status
				cTitle : "Tip for using the " + CurrentRace.name + " race",
				cMsg : "The " + CurrentRace.name + " race has the option to use some specific traits from another race, its 'base race'. To use this option, first select a race as normal, and then change it to " + CurrentRace.name + ". If you do that, you will be prompted wheter or not you want to use the race you had selected first as the base race." + (oInstr.message ? "\n\n" + oInstr.message : "")
			})
		}
	} else if (bSkipDialogAndForce === undefined) {
		// Ask the user if they want to use the previous race as a base for the new race
		var sOldRaceName = oOldVariant && oOldVariant.name ? oOldVariant.name : oOldRace.name;
		iAskUser = app.alert({
			nIcon : 2, // Question
			nType : 2, // Yes (return = 4), No (return = 3)
			cTitle : "Use traits from " + sOldRaceName + " for " + CurrentRace.name,
			cMsg : "The " + CurrentRace.name + " race has the option to use some specific traits from another race. As you had previously selected " + sOldRaceName + " as the race, would you want to use its features?\n\n" + toUni("Press 'Yes' to use traits from " + sOldRaceName + " or\npress 'No' to use the default traits for " + CurrentRace.name + ".") + (oInstr.message ? "\n\n" + oInstr.message : "")
		});
		CurrentVars.oldRaceAmendRemember = iAskUser === 4;
		SetStringifieds("vars");
	} else if (bSkipDialogAndForce) {
		iAskUser = 4; // Yes
	}
	if (iAskUser === 4) { // Use the traits fromt he previous race
		// First make the base race combined object
		var oBaseRace = newObj(oOldRace);
		if (oOldVariant) {
			oOldVariant = newObj(oOldVariant);
			for (var prop in oOldVariant) {
				oBaseRace[prop] = oOldVariant[prop];
			}
			// --- backwards compatibility --- //
			// if an old attribute exists in the racial variant, but the RaceList object uses the new attribute name, make sure the variant's version is used
			var backwardsAttr = [["improvements", "scorestxt"], ["armor", "armorProfs"], ["addarmor", "armorAdd"], ["weaponprofs", "weaponProfs"], ["weapons", "weaponsAdd"]];
			for (var i = 0; i < backwardsAttr.length; i++) {
				var aBW = backwardsAttr[i];
				if (oOldVariant[aBW[0]] && oOldVariant[aBW[1]] == undefined && oBaseRace[aBW[1]]) oBaseRace[aBW[1]] = oOldVariant[aBW[0]];
			}
		}
		// Merge the source
		if (oBaseRace.source) CurrentRace.source = CurrentRace.source.concat(oBaseRace.source);
		// Merge the name in the trait
		if (oInstr.replaceNameInTrait && CurrentRace.trait && oBaseRace.name) {
			var sReplace = oInstr.replaceNameInTrait[0], sReplaceWith;
			switch (oInstr.replaceNameInTrait[1] ? oInstr.replaceNameInTrait[1].toLowerCase() : "") {
				case "replace" :
					sReplaceWith = oBaseRace.name;
					break;
				case "prefix" :
					sReplaceWith = oBaseRace.name.capitalize() + " " + sReplace;
					break;
				case "insert" :
					sReplaceWith = sReplace + " " + oBaseRace.name + (oInstr.replaceNameInTrait[2] ? " " + oInstr.replaceNameInTrait[2] : "");
					break;
				case "suffix" :
				default :
					sReplaceWith = sReplace + " " + oBaseRace.name;
			}
			CurrentRace.trait = CurrentRace.trait.replace(sReplace, sReplaceWith)
		}
		// Define a function to handle the merging
		var mergeAttr = function(aProp, oFrom, oTo) {
			var oBaseRef = oFrom;
			var oCurRef = oTo;
			var oCurRefCreated;
			for (var p = 0; p < aProp.length; p++) {
				var sProp = aProp[p];
				if (oBaseRef[sProp]) {
					if (p === (aProp.length - 1)) { // last in the array
						oCurRef[sProp] = oBaseRef[sProp];
						return true;
					} else if (typeof oBaseRef[sProp] === "object") {
						// move the reference objects one step deeper
						oBaseRef = newObj(oBaseRef[sProp]);
						if (!oCurRef[sProp]) {
							oCurRef[sProp] = {};
							if (!oCurRefCreated) oCurRefCreated = aProp[0];
						}
						oCurRef = oCurRef[sProp];
					}
				} else {
					// This (sub)property doesn't exist, so skip this whole entry in the gainTraits array, but first delete any stuff we created from the CurrentRace as its an empty object
					if (oCurRefCreated && CurrentRace[oCurRefCreated]) {
						var toClean = CleanObject(CurrentRace[oCurRefCreated]);
						if (!ObjLength(CurrentRace[oCurRefCreated])) delete CurrentRace[oCurRefCreated];
					}
					return false;
				}
			}
		}
		// Now have the CurrenRace object inheret the traits as needed
		for (var i = 0; i < oInstr.gainTraits.length; i ++) {
			aProp = oInstr.gainTraits[i].split(".");
			if ((/^(known(Old)?|variants?(Old)?|level|name|features|trait)$/i).test(aProp[0])) continue;
			// Merge the attribute of the base race
			mergeAttr(aProp, oBaseRace, CurrentRace);
			// Merge the traits in the features, if any
			if (!oBaseRace.features) continue;
			for (var sFea in oBaseRace.features) {
				var oFea = oBaseRace.features[sFea];
				var oTemp = {
					name : oFea.name,
					minlevel : oFea.minlevel,
					limfeaname : oFea.limfeaname,
					usages : oFea.usages,
					recovery : oFea.recovery,
					action : oFea.action,
					source : CurrentRace.source
				};
				if (mergeAttr(aProp, oFea, oTemp)) {
					if (!CurrentRace.features) CurrentRace.features = {};
					var sAttrName = sFea;
					while (CurrentRace.features[sAttrName]) {
						sAttrName += " bonus";
					}
					CurrentRace.features[sAttrName] = oTemp;
				}
			}
		}
	} else if (oInstr.defaultTraits) { // Use the defaultTraits
		for (var prop in oInstr.defaultTraits) {
			if ((/^(known(Old)?|variants?(Old)?|level|name|plural|source)$/i).test(prop)) continue;
			if (prop === "features") { // merge instead of replace
				if (!CurrentRace.features) CurrentRace.features = {};
				for (var fea in oInstr.defaultTraits.features) {
					CurrentRace.features = oInstr.defaultTraits.features[fea];
				}
				continue;
			}
			CurrentRace[prop] = oInstr.defaultTraits[prop];
		}
	}
}

//search the string for possible weapon
function ParseWeapon(input, onlyInv) {
	var found = "";
	if (!input) return found;

	input = removeDiacritics(input.replace(/off.{0,3}hand/i, ""));
	var foundLen = 0;
	var foundDat = 0;
	for (var key in WeaponsList) {
		var kObj = WeaponsList[key];
		var bObj = kObj.baseWeapon ? WeaponsList[kObj.baseWeapon] : false;
		if ((onlyInv && kObj.weight == undefined) // see if only doing equipable items
			|| (kObj.baseWeapon && !bObj) // see if it has a baseWeapon, but that baseWeapon doesn't exist
			|| !kObj.regExpSearch || !(kObj.regExpSearch).test(input) // see if the regex matches
			|| testSource(key, kObj, "weapExcl") // test if the armour or its source isn't excluded
		) continue;

		/* Only go with this entry if:
			(1) we are using the search length (default) and this entry has a longer name
			or (2) we are using the search length and this entry has an equal length name but has a newer source
			or (3) if we are not using the search length, just look at the newest source date.
		However,
			use its baseWeapon name length if it is more than its name length.
			or the lenght of the matching regex if it is less. */
		var tempNmLn = ignoreSearchLength ? 0 : Math.min(input.length, input.match(kObj.regExpSearch)[0].length, kObj.name.length);
		if (!ignoreSearchLength && bObj) {
			// has a baseWeapon, so use that as well to determine the length to test with
			var tempNmLn = Math.max(tempNmLn, Math.min(input.length, (bObj.regExpSearch).test(input) ? input.match(bObj.regExpSearch)[0].length : 100, bObj.name.length));
		}
		var tempDate = sourceDate(kObj.source);
		if ((!ignoreSearchLength && tempNmLn < foundLen)
			|| (!ignoreSearchLength && tempNmLn == foundLen && tempDate < foundDat)
			|| (ignoreSearchLength && tempDate <= foundDat)
		) continue;

		// we have a match, set the values
		found = key;
		foundLen = tempNmLn
		foundDat = tempDate;
	}
	return found;
};

//detects weapons entered and put information to global CurrentWeapons variable
function FindWeapons(ArrayNmbr) {
	var tempArray = [];
	var startArray = ArrayNmbr;
	var endArray = ArrayNmbr + 1;

	//do all the weapons, if no ArrayNmbr has been entered
	if (ArrayNmbr === undefined) {
		for (var i = 0; i < FieldNumbers.attacks; i++) {
			CurrentWeapons.field[i] = What("Attack." + (i + 1) + ".Weapon Selection").toLowerCase();
		}
		var startArray = 0;
		var endArray = CurrentWeapons.field.length;
	}

	//parse the weapons into tempArray
	for (var j = startArray; j < endArray; j++) {
		var tempString = CurrentWeapons.field[j];
		tempArray[j] = [
			ParseWeapon(tempString), //see if the field contains a known weapon
			0, // the magical bonus
			true, // whether to add the ability modifier to damage or not
			"", // the spell/cantrip this attack refers to
			[] // if a spell/cantrip, this will be an array of the classes on which spell list this attack is
		];

		var aWea = WeaponsList[tempArray[j][0]];
		var theWea = {};
		if (aWea && aWea.baseWeapon && WeaponsList[aWea.baseWeapon]) {
			for (var attr in WeaponsList[aWea.baseWeapon]) theWea[attr] = WeaponsList[aWea.baseWeapon][attr];
		}
		if (aWea) for (var attr in aWea) theWea[attr] = aWea[attr];

		//add magical bonus, denoted by a "+" or "-"
		var magicRegex = /(?:^|\s|\(|\[)([\+-]\d+)/;
		if (magicRegex.test(tempString)) {
			tempArray[j][1] = parseFloat(tempString.match(magicRegex)[1]);
		}

		//add the true/false switch for adding ability score to damage or not
		tempArray[j][2] = aWea && theWea.abilitytodamage !== undefined ? theWea.abilitytodamage : true;

		//if this is a spell or a cantrip, see if we can link it to an object in the CurrentCasters variable
		var isSpell = !aWea ? ParseSpell(tempString) : theWea.SpellsList ? theWea.SpellsList : SpellsList[tempArray[j][0]] ? tempArray[j][0] : theWea.baseWeapon && SpellsList[theWea.baseWeapon] ? theWea.baseWeapon : ParseSpell(tempArray[j][0]);
		if (isSpell && (!aWea || (/spell|cantrip/i).test(theWea.type + theWea.list))) {
			tempArray[j][3] = isSpell;
			if (!tempArray[j][0]) tempArray[j][2] = false;
			tempArray[j][4] = isSpellUsed(isSpell);
		};

		//put tempArray in known
		CurrentWeapons.known[j] = tempArray[j];
	};
};

//update the weapons to apply the change in proficiencies
function ReCalcWeapons(justProfs, force) {
	// Stop calculations
	calcStop();

	justProfs = justProfs && !force && !CurrentEvals.atkAdd;
	for (var xy = 0; xy < CurrentWeapons.known.length; xy++) {
		if (CurrentWeapons.field[xy]) {
			ApplyWeapon(CurrentWeapons.field[xy], "Attack." + (xy + 1) + ".Weapon Selection", true, justProfs, force);
		};
	};
};

function SetWeaponsdropdown(forceTooltips) {
	var tempString = "Type in the name of the attack (or select it from the drop-down menu) and all its attributes will be filled out automatically, provided that its a recognized attack.";
	tempString += "\n\n" + toUni("Magic bonus") + '\nAny magical bonus you type in this field is added to both the to hit and damage (e.g. type " +2Longsword").';
	tempString += "\n\n" + toUni("Off-hand weapons") + '\nIf the name or description fields include the word "off-hand", "secondary", "spell", or "cantrip", the ability modifier will only be added to the to hit bonus, and not to the damage.';
	tempString += "\n\n" + toUni("Damage Die") + '\nThis is determined by the value in the "modifier" field, see below.';
	tempString += "\n\n" + toUni("To Hit and Damage calculations") + '\nThese are calculated using the proficiency bonus, the selected ability modifier and any bonus added in the "modifier" fields, see below.';
	tempString += "\n\n" + toUni("Context-aware calculations") + "\nSome class features, racial features, and feats can affect the attack to hit and damage calculations. You can read what these are by clicking the button in this line.";
	tempString += "\n\n" + toUni("Modifier or blue text fields") + '\nThese are hidden by default. You can toggle their visibility with the "Mods" button in the \'JavaScript Window\' or the "Modifiers" bookmark.';

	var added = [], otherLists = [];
	var weaponlists = {
		startlist : [],
		endlist : [
			"Axe, Hand",
			"Axe, Battle",
			"Axe, Great",
			"Bow, Short",
			"Bow, Long",
			"Crossbow, Hand",
			"Crossbow, Light",
			"Crossbow, Heavy",
			"Hammer, Light",
			"Hammer, War",
			"Hammer, Great",
			"Sword, Short",
			"Sword, Long",
			"Sword, Great"
		],
		melee : [],
		ranged : [],
		improvised : [],
		spell : []
	};

	for (var key in WeaponsList) {
		var weaKey = WeaponsList[key];
		var weaList = weaKey.list ? weaKey.list.toLowerCase() : "";
		if (!weaList || testSource(key, weaKey, "weapExcl")) continue; // test if the weapon or its source is set to be included
		if (!weaponlists[weaList]) {
			otherLists.push(weaList);
			weaponlists[weaList] = [];
		}
		var weaName = WeaponsList[key].name.capitalize();
		if (added.indexOf(weaName) === -1) {
			added.push(weaName);
			weaponlists[weaList].push(weaName);
		}
	};

	// make the definitive list of weapons for the dropdown box
	var setweapons = [];
	var addWeaList = function (weArr, addFirst, noSort, addAtStart) {
		if (!noSort) weArr.sort();
		if (addFirst) weArr.unshift(addFirst);
		if (weArr.length) {
			weArr.unshift("");
			setweapons = !addAtStart ? setweapons.concat(weArr) : weArr.concat(setweapons);
		}
	};
	addWeaList(weaponlists.melee.concat(weaponlists.ranged), "Unarmed Strike"); // add the natural weapons
	addWeaList(weaponlists.improvised, "Improvised Weapon"); // add the improvised weapons
	addWeaList(weaponlists.spell, "Spell Attack"); // add the spells/cantrips
	addWeaList(weaponlists.endlist, false, true); // add the endlist weapons
	// now add any lists that are not preset
	otherLists.sort();
	for (var i = 0; i < otherLists.length; i++) addWeaList(weaponlists[otherLists[i]]);

	// first set the companion sheets attack dropdowns
	var AScompA = What("Template.extras.AScomp").split(",");
	var listToSource = setweapons.toSource();
	for (var i = 0; i < AScompA.length; i++) {
		var prefix = AScompA[i];
		for (var c = 1; c <= 3; c++) {
			var theFld = prefix + "Comp.Use.Attack." + c + ".Weapon Selection";
			var theFldSuNm = prefix + "Comp.Use.Attack." + c + ".Proficiency";
			if (tDoc.getField(theFldSuNm).submitName === listToSource) {
				if (forceTooltips) AddTooltip(theFld, tempString);
				continue; // no changes, so no reason to set this field
			}
			tDoc.getField(theFldSuNm).submitName = listToSource;
			var theFldVal = What(theFld);
			IsNotWeaponMenu = false;
			tDoc.getField(theFld).setItems(setweapons);
			IsNotWeaponMenu = true;
			if (theFldVal !== What(theFld)) Value(theFld, theFldVal, tempString);
		};
	}

	// now add the special weapons added by features, as we only want those on the first page
	addWeaList(weaponlists.startlist, false, false, true);
	listToSource = setweapons.toSource();

	// lastly set this array for the attack dropdowns on the first page
	for (var i = 1; i <= FieldNumbers.attacks; i++) {
		var theFld = "Attack." + i + ".Weapon Selection";
		var theFldSuNm = "Attack." + i + ".Proficiency";
		if (tDoc.getField(theFldSuNm).submitName === listToSource) {
			if (forceTooltips) AddTooltip(theFld, tempString);
			continue; // no changes, so no reason to set this field
		}
		tDoc.getField(theFldSuNm).submitName = listToSource;
		var theFldVal = What(theFld);
		IsNotWeaponMenu = false;
		tDoc.getField(theFld).setItems(setweapons);
		IsNotWeaponMenu = true;
		if (theFldVal !== What(theFld)) Value(theFld, theFldVal, tempString);
	};
};

function SetArmordropdown(forceTooltips) {
	var tempString = toUni("Armor AC") + "\nType the name of the armor (or select it from the drop-down menu) and its AC and features will be filled out automatically, provided that its a recognized armor.";
	tempString += "\n\n" + toUni("Alternative spelling") + '\nYou can use alternative spellings, descriptions and embellishments. For example: "Golden Breastplate of Lathander" will result in the AC and attributes of a "Breastplate".';
	tempString += "\n\n" + toUni("Unarmored Defense") + '\nUsing either "unarmored", "naked", "nothing", or "no armor" combined with an abbreviation of one of the six ability scores will result in the armor being calculated with that ability score. For example: "Unarmored Defense (Int)".\nIf you do not include the abbreviation, the sheet will auto-fill an armor AC of 10.';
	tempString += "\n\n" + toUni("Magic bonus") + '\nAny magical bonus you type in this field is added to the AC of the armor type. For example: "Chain mail +1" or "Plate -2".';

	var added = [], otherLists = [];
	var presetLists = ["firstlist", "magic", "light", "medium", "heavy"];
	var aLists = { startlist : [], firstlist : [""], light : [""], medium : [], heavy : [], magic : [] };
	for (var key in ArmourList) {
		var theArm = ArmourList[key]
		// first test if the armour or its source isn't excluded
		if (testSource(key, theArm, "armorExcl")) continue;
		var armNm = theArm.name.capitalize();
		var armList = theArm.list ? theArm.list.toLowerCase() : theArm.type ? theArm.type.toLowerCase() : "";
		// test if the armour should be excluded (no list/type) or is already listed
		if (!armList || added.indexOf(armNm) !== -1) continue;
		added.push(armNm);

		if (!aLists[armList]) {
			otherLists.push(armList);
			aLists[armList] = [armNm];
		} else {
			aLists[armList].push(armNm);
		}
	};

	// now create the final array element to set to the armour field
	var setarmours = [];

	// first add the startlist if it has any members
	if (aLists.startlist.length) {
		aLists.startlist.sort();
		aLists.startlist.unshift("");
		setarmours = aLists.startlist;
	}
	// then add the presetLists
	for (var i = 0; i < presetLists.length; i++) setarmours = setarmours.concat(aLists[presetLists[i]]);
	// then add the newly added otherLists
	otherLists.sort();
	for (var i = 0; i < otherLists.length; i++) {
		aLists[otherLists[i]].sort();
		aLists[otherLists[i]].unshift("");
		setarmours = setarmours.concat(aLists[otherLists[i]]);
	}

	var listToSource = setarmours.toSource();
	if (tDoc.getField("AC Armor Description").submitName === listToSource) {
		if (forceTooltips) AddTooltip("AC Armor Description", tempString);
		return; // no changes, so no reason to do any more
	}
	tDoc.getField("AC Armor Description").submitName = listToSource;

	var theFldVal = What("AC Armor Description");
	tDoc.getField("AC Armor Description").setItems(setarmours);
	Value("AC Armor Description", theFldVal, tempString);
};

function SetBackgrounddropdown(forceTooltips) {
	var ArrayDing = [""];
	var tempString = toUni("Background") + "\nType in the name of the background (or select it from the drop-down menu) and its features and proficiencies will be filled out automatically, provided that its a recognized background.";
	tempString += "\n\n" + toUni("Changing background") + "\nIf you change the background, all the features of the previous background will be removed and the features of the new background will be applied.";

	for (var key in BackgroundList) {
		if (testSource(key, BackgroundList[key], "backgrExcl")) continue;
		var backNm = BackgroundList[key].name;
		if (ArrayDing.indexOf(backNm) === -1) ArrayDing.push(backNm);
		var varArr = BackgroundList[key].variant ? BackgroundList[key].variant : [];
		for (var i = 0; i < varArr.length; i++) {
			var varKey = varArr[i];
			if (testSource(varKey, BackgroundSubList[varKey], "backgrExcl")) continue;
			backNm = BackgroundSubList[varKey].name;
			if (ArrayDing.indexOf(backNm) === -1) ArrayDing.push(backNm);
		}
	};
	ArrayDing.sort();
	if (tDoc.getField("Background").submitName === ArrayDing.toSource()) {
		if (forceTooltips) AddTooltip("Background", tempString);
		return; //no changes, so no reason to do this
	}
	tDoc.getField("Background").submitName = ArrayDing.toSource();
	var theFldVal = What("Background");
	tDoc.getField("Background").setItems(ArrayDing);
	Value("Background", theFldVal, tempString);
};

function SetRacesdropdown(forceTooltips) {
	var ArrayDing = [""];
	var tempString = toUni("Race") + "\nType in the name of the race (or select it from the drop-down menu) and its traits and features will be filled out automatically, provided that its a recognized race. You are not limited by the names in the list. Just typing \"Drow\" will also be recognized, for example.";
	tempString += "\n\n" + toUni("Alternative spelling") + "\nDifferent, setting-dependent race names are recognized as well. For example, typing \"Moon Elf\" will result in all the traits and features of the \"High Elf\" from the Player's Handbook.";
	tempString += "\n\n" + toUni("Changing race") + "\nIf you change the race, all the features of the previous race will be removed and the features of the new race will be applied.";

	for (var key in RaceList) {
		if (testSource(key, RaceList[key], "racesExcl")) continue;
		var raceNm = RaceList[key].sortname ? RaceList[key].sortname : RaceList[key].name.capitalize();
		if (ArrayDing.indexOf(raceNm) === -1) ArrayDing.push(raceNm);
	}
	ArrayDing.sort();
	if (tDoc.getField("Race").submitName === ArrayDing.toSource()) {
		if (forceTooltips) AddTooltip("Race", tempString);
		return; //no changes, so no reason to do this
	}
	tDoc.getField("Race").submitName = ArrayDing.toSource();
	var theFldVal = What("Race");
	tDoc.getField("Race").setItems(ArrayDing);
	Value("Race", theFldVal, tempString);
};

//parse the results from the menu into an array
function getMenu(menuname) {
	try {
		var temp = app.popUpMenuEx.apply(app, Menus[menuname]);
	} catch (err) {
		var temp = null;
	}
	return temp === null ? ["nothing", "toreport"] : temp.toLowerCase().split("#");
};

/* ---- INVENTORY FUNCTIONS START ---- */

// set the value of the gear field to be remembered (on focus)
function RememberGearTempOnFocus() {
	event.target.temp = event.target.value;
};

// set the weight of the gear field (on blur)
function SetGearWeightOnBlur() {
	var theValue = event.target.value;
	var weightFld = event.target.name.replace("Row", "Weight");

	if (!theValue) {
		tDoc.resetForm([weightFld, event.target.name.replace("Row", "Amount")])
	} else if (event.target.temp && event.target.temp === theValue) {
		//do nothing
	} else {
		var theGear = ParseGear(theValue);
		if (theGear) {
			var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
			if (theGear[0] === "MagicItemsList") {
				var theWeight = theGear[2] && MagicItemsList[theGear[1]][theGear[2]].weight ? MagicItemsList[theGear[1]][theGear[2]].weight : MagicItemsList[theGear[1]].weight;
			} else {
				var theWeight = tDoc[theGear[0]][theGear[1]].weight;
			}
			theWeight = RoundTo(theWeight * massMod, 0.001, true);
			var weightCurrent = What(weightFld);
			var setWeight = false;
			if (weightCurrent && event.target.temp) {
				var theGearOld = event.target.temp ? ParseGear(event.target.temp) : "";
				if (theGearOld && (theGearOld[0] !== theGear[0] || theGearOld[1] !== theGear[1])) setWeight = true;
			} else if (!weightCurrent || weightCurrent !== theWeight) {
				setWeight = true;
			}
			if (setWeight) Value(weightFld, theWeight);
		}
	}

	//now reset the temp
	delete event.target.temp;
};

// find if the entry is an equipment
function ParseGear(input) {
	if (!input) return false;
	var foundLen = 0, testLen = 0;
	var result = false;
	var tempString = removeDiacritics(input.toLowerCase());
	var tempStrLen = tempString.length;

	//see if it is a magic item
	var findMagicItem = ParseMagicItem(tempString, true)
	if (findMagicItem[0]) {
		foundLen = findMagicItem[2];
		result = ["MagicItemsList", findMagicItem[0], findMagicItem[1]];
	};

	//see if it is an armour
	var findArmor = ParseArmor(tempString, true);
	if (findArmor) {
		testLen = Math.min(
			findArmor.length,
			tempStrLen,
			tempString.match(ArmourList[findArmor].regExpSearch)[0].length
		);
		if (testLen > foundLen) {
			foundLen = testLen;
			result = ["ArmourList", findArmor];
		};
	};

	//see if it is a weapon
	var findWeapon = ParseWeapon(tempString, true);
	if (findWeapon) {
		testLen = Math.min(
			findWeapon.length,
			tempStrLen,
			tempString.match(WeaponsList[findWeapon].regExpSearch)[0].length
		);
		if (testLen > foundLen) {
			foundLen = testLen;
			result = ["WeaponsList", findWeapon];
		};
	};

	//see if it is an ammunition weapon
	var findAmmo = ParseAmmo(tempString, true);
	if (findAmmo) {
		testLen = Math.min(findAmmo[1], tempStrLen);
		if (testLen > foundLen) {
			foundLen = testLen;
			result = ["AmmoList", findAmmo[0]];
		};
	};

	//see if it is gear
	for (var key in GearList) { //scan string for all gear
		var aList = GearList[key];
		if (!aList.name || aList.name === "-" || testSource(key, aList, "gearExcl")) continue;
		var searchName = aList.name.replace(/\uFEFF|,[^,]+$/g, "");
		var aListRegEx = MakeRegex(searchName);
		if ((aListRegEx).test(tempString)) {
			var testLen = searchName.length;
			if (testLen >= foundLen) {
				result = ["GearList", key];
				foundLen = testLen;
			};
		};
	};

	//see if it is a tool
	for (var key in ToolsList) { //scan string for all tools
		var aList = ToolsList[key];
		if (!aList.name || aList.name === "-" || testSource(key, aList, "gearExcl")) continue;
		var searchName = aList.name.replace(/\uFEFF|,[^,]+$/g, "");
		var aListRegEx = MakeRegex(searchName);
		if ((aListRegEx).test(tempString)) {
			var testLen = searchName.length;
			if (testLen >= foundLen) {
				result = ["ToolsList", key];
				foundLen = testLen;
			};
		};
	};

	return result;
};

// a way to add an item to one of the equipment sections
// area = "gear" "magic" "extra" "comp"
// column = "l", "m", "r"; can be followed/preceded by 'only' to limit searching to just that column
function AddToInv(area, column, item, amount, weight, location, searchRegex, AddTestReplace, checkKey, isCorrectUnits) {
	if (item == undefined || area == undefined) return;
	//set area and prefix, if any
	var prefix = area.indexOf("AScomp.") !== -1 ? area.substring(0, area.indexOf("AScomp.") + 7) : "";
	area = area.toLowerCase();
	if (!checkKey) {
		var isItem = ParseGear(item);
		if (isItem) checkKey = isItem[1]
	};
	//set start and end row
	var maxRow = FieldNumbers[(/adventuring|gear|magic/).test(area) ? "gear" : area.indexOf("extra") !== -1 ? "extragear" : area.indexOf("comp") !== -1 ? "compgear" : false];
	if (!maxRow) return;
	column = column ? column.toLowerCase() : "";
	var columnCalc = !column ? false : typePF && (/adventuring|gear/).test(area) ? (column.indexOf("r") !== -1 ? 1.5 : column.indexOf("m") !== -1 ? 3 : false) : (column.indexOf("r") !== -1 ? 2 : false);
	var startRow = area.indexOf("magic") !== -1 ? FieldNumbers.gearMIrow + 1 : columnCalc ? Math.round(maxRow / columnCalc + 1) : 1;
	var endRow = (/adventuring|gear/).test(area) && !What("Adventuring Gear Remember") ? maxRow - 4 : maxRow;

	//set start and end row for searching
	var startSearch = column.indexOf("only") !== -1 ? startRow : 1;
	var endSearch = column.indexOf("only") === -1 ? endRow : typePF && (/adventuring|gear/).test(area) ? (!columnCalc ? Math.round(maxRow / 3) : columnCalc === 3 ? Math.round(maxRow / 1.5) : endRow) : (columnCalc ? endRow : Math.round(maxRow / 2));

	//define the names
	var rowNm = prefix + (area.indexOf("extra") !== -1 ? "Extra.Gear " :  area.indexOf("comp") !== -1 ? "Comp.eqp.Gear " : "Adventuring Gear ");
	var itemRow = rowNm + "Row ";
	var amountRow = rowNm + "Amount ";
	var weightRow = rowNm + "Weight ";
	var locationRow = rowNm + "Location.Row ";

	//prepare the item name for searching
	var searchItem = clean(item, false, true);
	searchRegex = searchRegex ? searchRegex : MakeRegex(searchItem.replace(/\uFEFF|\,[^\,]+$/g, (/(\+|-)\d+/).test(searchItem) ? "" : "(?!.*(\\+|-)\\d+)"));

	//search through the items and do something if it is found
	for (var i = startSearch; i <= endSearch; i++) {
		var theRow = clean(What(itemRow + i), false, true);
		var isKey = !checkKey ? false : ParseGear(theRow);
		if ((theRow === searchItem || (searchRegex).test(theRow)) && (!checkKey || isKey[1] === checkKey)) {
			if (!AddTestReplace) {
				var curAmount = What(amountRow + i);
				if (curAmount === "") {
					Value(amountRow + i, 1 + (amount && !isNaN(amount) ? amount : 1));
				} else if (!isNaN(curAmount)) {
					Value(amountRow + i, Number(curAmount) + (amount && !isNaN(amount) ? amount : 1));
				} else {
					Value(itemRow + i, What(itemRow + i) + " (+ one more)");
				};
			} else if (AddTestReplace === "replace") {
				Value(amountRow + i, amount);
			};
			return;
		};
	};

	//as nothing above was found, add the item to the first empty row of the selected column
	var Container = "";
	if (!isCorrectUnits && What("Unit System") !== "imperial") weight = RoundTo(weight * UnitsList.metric.mass, 0.001, true);
	item = clean(item, [" ", "-", ".", ",", "\\", "/", ";"]);
	for (var i = startRow; i <= endRow; i++) {
		var theRow = What(itemRow + i);
		if (!theRow) {
			Value(itemRow + i, Container + item);
			Value(amountRow + i, amount !== undefined ? amount : "");
			Value(weightRow + i, weight !== undefined ? weight : "");
			Value(locationRow + i, location !== undefined ? location : "");
			return;
		} else {
			Container = (/^.{0,2}-|backpack|\bbag\b|^(?=.*saddle)(?=.*bag).*$|\bsack\b|\bchest\b|, with|, contain/i).test(theRow) ? "- " : "";
		};
	};
};

// redirect the old function names for legacy support
function AddInvL(item, amount, weight, location) { AddToInv("gear", "l", item, amount, weight, location, false, false, false, true); };
function AddInvM(item, amount, weight, location) { AddToInv("gear", "m", item, amount, weight, location, false, false, false, true); };
function AddInvR(item, amount, weight, location) { AddToInv("gear", "r", item, amount, weight, location, false, false, false, true); };
function AddInvMagic(item, amount, weight, location) { AddToInv("magic", false, item, amount, weight, location, false, false, false, true); };
function AddInvLExtra(item, amount, weight, location) { AddToInv("extra", "l", item, amount, weight, location, false, false, false, true); };
function AddInvRExtra(item, amount, weight, location) { AddToInv("extra", "r", item, amount, weight, location, false, false, false, true); };
function AddInvLComp(item, amount, weight, prefix) { AddToInv(prefix + "comp", "l", item, amount, weight, location, false, false, false, true); };
function AddInvRComp(item, amount, weight, prefix) { AddToInv(prefix + "comp", "r", item, amount, weight, location, false, false, false, true); };

// make an array of all the gear, tools, and packs, saving each to the menus variable
function SetGearVariables() {
	if (minVer) return;
	//make a menu array for all the packs
	GearMenus.packs = [];
	var packArray = [];
	for (var key in PacksList) {
		if (testSource(key, PacksList[key], "gearExcl")) continue;
		packArray.push(key);
	};
	packArray.sort();
	for (var i = 0; i < packArray.length; i++) {
		GearMenus.packs.push({
			cName : PacksList[packArray[i]].name,
			cReturn : "pack#" + packArray[i]
		});
	};

	//make a menu array for all the gear
	GearMenus.gear = [];
	var gearTypes = {};
	var gearArray = [];
	for (var key in GearList) {
		if (testSource(key, GearList[key], "gearExcl")) continue;
		if (!GearList[key].type) {
			gearArray.push(key);
		} else {
			var aType = GearList[key].type.toLowerCase();
			if (gearArray.indexOf(aType) == -1) {
				gearArray.push(aType);
				gearTypes[aType] = [];
			}
			gearTypes[aType].push(key);
		}
	};
	gearArray.sort();
	for (var i = 0; i < gearArray.length; i++) {
		var aGear = gearArray[i];
		if (gearTypes[aGear]) {
			gearTypes[aGear].sort();
			var theSub = gearTypes[aGear].map( function (n) {
				return {
					cName : GearList[n].infoname,
					cReturn : "gear#" + n
				}
			});
			GearMenus.gear.push({
				cName : aGear.capitalize(),
				oSubMenu : theSub
			});
		} else {
			var theGear = GearList[aGear];
			GearMenus.gear.push({
				cName : theGear.infoname,
				cReturn : "gear#" + aGear
			});
		}
	};

	//make a menu array for all the tools
	GearMenus.tools = [];
	var toolsTypes = {};
	var toolsArray = [];
	for (var key in ToolsList) {
		if (testSource(key, ToolsList[key], "gearExcl")) continue;
		if (!ToolsList[key].type) {
			toolsArray.push(key);
		} else {
			var aType = ToolsList[key].type.toLowerCase();
			if (toolsArray.indexOf(aType) == -1) {
				toolsArray.push(aType);
				toolsTypes[aType] = [];
			}
			toolsTypes[aType].push(key);
		}

	};
	toolsArray.sort();
	for (var i = 0; i < toolsArray.length; i++) {
		var aTool = toolsArray[i];
		if (toolsTypes[aTool]) {
			toolsTypes[aTool].sort();
			var theSub = toolsTypes[aTool].map( function (n) {
				return {
					cName : ToolsList[n].infoname,
					cReturn : "tool#" + n
				}
			});
			GearMenus.tools.push({
				cName : aTool.capitalize(),
				oSubMenu : theSub
			});
		} else {
			var theTool = ToolsList[aTool];
			GearMenus.tools.push({
				cName : theTool.infoname,
				cReturn : "tool#" + aTool
			});
		}
	};
};

//Make menu for 'add equipment' button and parse it to Menus.inventory
function MakeInventoryMenu() {
	var InvMenu = [];

	var backgroundKn = CurrentBackground.name ? CurrentBackground.name : "Background";

	//first make the top three entries (Pack, Gear, Tool)
	var itemMenu = function(menu, name, array, object) {
		var temp = {
			cName : name,
			oSubMenu : []
		};
		for (var i = 0; i < array.length; i++) {
			temp.oSubMenu[i] = {
				cName : array[i][0],
				oSubMenu : newObj(object)
			};
			for (var j = 0; j < temp.oSubMenu[i].oSubMenu.length; j++) {
				var tempObject = temp.oSubMenu[i].oSubMenu[j];
				if (tempObject.cReturn) tempObject.cReturn += "#" + array[i][1];
				if (tempObject.oSubMenu) {
					for (var k = 0; k < tempObject.oSubMenu.length; k++) {
						var tempObjectK = tempObject.oSubMenu[k];
						if (tempObjectK.cReturn) tempObjectK.cReturn += "#" + array[i][1];
					}
				}
			};
		};
		menu.push(temp);
	};

	var menuExtraTypes = [
		["To left column", "lonly"],
		["To middle column", "monly"],
		["To right column", "ronly"]
	];
	if (!typePF) menuExtraTypes.splice(1, 1);
	itemMenu(InvMenu, "Pack", menuExtraTypes, GearMenus.packs);
	itemMenu(InvMenu, "Gear", menuExtraTypes, GearMenus.gear);
	itemMenu(InvMenu, "Tool", menuExtraTypes, GearMenus.tools);

	//add the other single-level options to the menu
	var menuLVL1 = function (item, array) {
		for (i = 0; i < array.length; i++) {
			var isMarked = array[i][1] === "attuned" ? What("Adventuring Gear Remember") == false :
				array[i][1] === "location2" ? What("Gear Location Remember").split(",")[0] == "true" :
				array[i][1] === "location3" ? What("Gear Location Remember").split(",")[1] == "true" : false;
			var isEnabled = array[i][1] === "location3" ? isTemplVis("ASfront") : array[i][1].indexOf("background") !== -1 ? backgroundKn !== "Background" : true;
			item.push({
				cName : array[i][0],
				cReturn : array[i][1],
				bMarked : isMarked,
				bEnabled : isEnabled
			});
		}
	};

	menuLVL1(InvMenu, [
		["-", "-"],
		[backgroundKn + "'s items and gold", "background"],
		["Armor && Shield (from 1st page) [only adds new]", "armour"],
		["Weapons && Ammunition (from 1st page) [only updates/adds new]", "weapon"],
		["-", "-"],
		["All three of the above (" + backgroundKn + ", armour, weapons)", "background-armour-weapon"],
		["Just two of the above (armour, weapons)", "armour-weapon"],
		["-", "-"],
		["Reset equipment section", "reset"],
		["-", "-"],
		["Show 'Attuned Magical Items' subsection", "attuned"],
		["Show location column for Equipment (this page)", "location2"],
		["Show location column for Extra Equipment (3rd page)", "location3"]
	]);

	Menus.inventory = InvMenu;
};

//call the inventory menu ('add equipment' button) and do something with the results
function InventoryOptions(input) {
	var MenuSelection = input ? input : getMenu("inventory");

	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying the inventory menu option...");
	thermoM(0.5); // Increment the progress bar
	calcStop();

	if (MenuSelection[0] === "pack") {
		var thePack = PacksList[MenuSelection[1]];
		thermoTxt = thermoM("Adding pack " + thePack.name + "...", false); //change the progress dialog text
		var columnCalc = typePF ? (MenuSelection[2].indexOf("r") !== -1 ? 1.5 : MenuSelection[2].indexOf("m") !== -1 ? 3 : false) : (MenuSelection[2].indexOf("r") !== -1 ? 2 : false);
		var startRow = columnCalc ? Math.round(FieldNumbers.gear / columnCalc + 1) : 1;
		if (What("Adventuring Gear Row " + startRow)) InvInsert("Adventuring ", startRow);
		for (var i = 0; i < thePack.items.length; i++) {
			var theGear = thePack.items[i];
			AddToInv("gear", MenuSelection[2], theGear[0], theGear[1], theGear[2]);
		};
	} else if (MenuSelection[0] === "gear" || MenuSelection[0] === "tool") {
		var theGear = MenuSelection[0] === "gear" ? GearList[MenuSelection[1]] : ToolsList[MenuSelection[1]];
		thermoTxt = thermoM("Adding '" + theGear.name + "' to the adventuring gear...", false); //change the progress dialog text
		AddToInv("gear", MenuSelection[2], theGear.name, theGear.amount, theGear.weight);
	} else if (MenuSelection[0] === "reset") {
		thermoTxt = thermoM("Resetting the equipment section...", false); //change the progress dialog text
		var tempArray = ["Platinum Pieces", "Gold Pieces", "Electrum Pieces", "Silver Pieces", "Copper Pieces"];
		if (!typePF) {
			for (var i = 1; i < 5; i++) { tempArray.push("Valuables" + i); };
			tempArray = tempArray.concat(["Lifestyle", "Lifestyle daily cost"]);
		};
		for (var i = 1; i <= FieldNumbers.gear; i++) {
			tempArray.push("Adventuring Gear Row " + i);
			tempArray.push("Adventuring Gear Location.Row " + i);
			tempArray.push("Adventuring Gear Amount " + i);
			tempArray.push("Adventuring Gear Weight " + i);
		};
		tDoc.resetForm(tempArray);
	} else if (MenuSelection[0] === "attuned") {
		thermoTxt = thermoM("Toggling the visibility of the Attuned Magical Items subsection...", false);
		ShowAttunedMagicalItems(What("Adventuring Gear Remember") === true);
	} else if (MenuSelection[0] === "location2") {
		thermoTxt = thermoM("Toggling the visibility of the location column on page 2...", false);
		HideInvLocationColumn("Adventuring Gear ", What("Gear Location Remember").split(",")[0] === "true");
	} else if (MenuSelection[0] === "location3") {
		thermoTxt = thermoM("Toggling the visibility of the location column on page 3...", false);
		HideInvLocationColumn("Extra.Gear ", What("Gear Location Remember").split(",")[1] === "true");
	} else if (MenuSelection[0].indexOf("background") !== -1) {
		thermoTxt = thermoM("Adding background items to equipment section...", false);
		AddInvBackgroundItems();
	};
	if (MenuSelection[0].indexOf("armour") !== -1) {
		thermoTxt = thermoM("Adding/updating armor and shield in equipment section...", false);
		AddInvArmorShield();
	};
	if (MenuSelection[0].indexOf("weapon") !== -1) {
		thermoTxt = thermoM("Adding/updating weapons and ammunition in equipment section...", false);
		AddInvWeaponsAmmo();
	};

	thermoM(thermoTxt, true); // Stop progress bar
};

function AddInvBackgroundItems() {
	if (!CurrentBackground.known) return;
	if (CurrentBackground.gold) Value("Gold Pieces", Number(What("Gold Pieces").replace(",", ".")) + CurrentBackground.gold);
	var addEquip = function (array, LR) {
		for (var i = 0; i < array.length; i++) {
			AddToInv("gear", LR, array[i][0], array[i][1], array[i][2]);
		};
	};
	if (CurrentBackground.equipleft) addEquip(CurrentBackground.equipleft, "l");
	if (CurrentBackground.equipright) addEquip(CurrentBackground.equipright, "r");
};

function AddInvArmorShield() {
	//add the armour
	var theArm = What("AC Armor Description");
	var theArmWght = What("AC Armor Weight");
	var theArmKn = ArmourList[CurrentArmour.known];
	if (theArm && theArmWght && (theArmKn ? theArmKn.weight : true)) {
		var regexArmNm = RegExp("(" + theArmKn.name.RegEscape() + ")", "i");
		var hasInvName = theArmKn && theArmKn.invName ? theArmKn.invName.replace(regexArmNm, "") : false;
		var theTxt = hasInvName && !(RegExp(hasInvName.RegEscape(), "i")).test(theArm) && (regexArmNm).test(theArm) && similarLen(theArmKn.name, theArm) ? theArm.replace(regexArmNm, "$1" + hasInvName) : theArm;
		var searchRegex = MakeRegex(theTxt.replace(/ ?\([^\)]\)| ?\[[^\]]\]/g, ""), theArmKn.magic ? "" : "(?!.*(\\+|-)\\d+)");

		AddToInv("gear", "r", theTxt, "", theArmWght, "", searchRegex, "replace", false, true);
	};


	//add the shield
	var theShi = What("AC Shield Bonus Description");
	var theShiWght = What("AC Shield Weight");
	if (theShi && theShiWght) {
		var theTxt = theShi + (theShi.length < 6 && !(/shield/i).test(theShi) ? " shield" : "");
		var searchRegex = MakeRegex(theTxt.replace(/ ?\([^\)]\)| ?\[[^\]]\]/g, ""), CurrentShield.magic ? "" : "(?!.*(\\+|-)\\d+)");

		AddToInv("gear", "r", theTxt, "", theShiWght, "", searchRegex, "replace", false, true);
	}
};

//add all the weapons and ammo from the first page to the second page
function AddInvWeaponsAmmo() {
	//a way to see if there are any special calculation-driven entries in the attack's name
	var specialAtkName = function (atkNm) {
		var isSpecial = false;
		var toMatch = /\(\/.*?\/[ig]{0,2}\)\.test\(v\.WeaponText(Name)?\)/g;
		if (CurrentEvals.atkCalc && (toMatch).test(CurrentEvals.atkCalc)) {
			isSpecial = CurrentEvals.atkCalc.match(toMatch).some( function (C) {
				try {
					return eval_ish(C.replace("v.WeaponText", "atkNm"));
				} catch (err) {};
			});
		};
		return isSpecial;
	};

	//make an array of the weapons to add; only those with weight and not alternative attack entries
	var testArray = [];
	var items = {};
	for (var i = 1; i <= FieldNumbers.attacks; i++) {
		var theAtk = CurrentWeapons.known[i - 1];
		var theWea = theAtk[0] ? theAtk[0] : false;
		var theFld = What("Attack." + i + ".Weapon Selection");
		var theWeight = What("BlueText.Attack." + i + ".Weight");
		if (theWeight && !theAtk[3] && !specialAtkName(theFld)) {
			var theTxt = (theWea ? theWea : theFld) + theAtk[1];
			if (testArray.indexOf(theTxt) === -1) {
				items[theTxt] = {
					key : theWea, // item key
					name : clean(theFld.replace(/\(?\[?(off.{0,3}hand|secondary)\)?\]?/i, "")), // the name in the field
					weight : theWeight,
					magic : theAtk[1], // magic bonus
					amount : 1, // the number of these
					isOffHand : (/^(?!.*(spell|cantrip))(?=.*(off.{0,3}hand|secondary)).*$/i).test(theFld)
				};
			} else {
				if (similarLen(theFld.replace(/off.{0,3}hand|secondary/i, ""), items[theTxt].name)) {
					if ((/^(?!.*(spell|cantrip))(?=.*(off.{0,3}hand|secondary)).*$/i).test(theFld) || items[theTxt].isOffHand) {
						items[theTxt].amount = 2;
						items[theTxt].isOffHand = false;
					}
				} else if (theWea && !items[theFld]) {
					items[theFld] = {
						key : theWea, // item key
						name : clean(theFld.replace(/\(?\[?(off.{0,3}hand|secondary)\)?\]?/i, "")), // the name in the field
						weight : theWeight,
						magic : theAtk[2], // magic bonus
						amount : 1, // the number of these
						isOffHand : (/^(?!.*(spell|cantrip))(?=.*(off.{0,3}hand|secondary)).*$/i).test(theFld)
					};
				};
			};
			testArray.push(theTxt);
		};
	};

	//then do the ammo
	var addAmmo = function(aNm, aNr, aWght) {
		var theAmmo = ParseAmmo(aNm);
		var magicBonus = 0;
		var magicRegex = /(?:^|\s|\(|\[)([\+-]\d+)/;
		if (magicRegex.test(aNm)) {
			magicBonus = parseFloat(aNm.match(magicRegex)[1])
		};
		if (isNaN(magicBonus)) magicBonus = 0;
		for (var it in items) {
			var aItem = items[it];
			if (aItem.magic === magicBonus && ((!theAmmo && aItem.name.indexOf(aNm) !== -1) || (theAmmo && aItem.key === theAmmo && (it.replace(/\d+/, "") === theAmmo || similarLen(aItem.name, aNm))))) {
				aItem.amount = aNr + (theAmmo && aItem.isAmmo ? aItem.amount : 0);
				aItem.isAmmo = true;
				return;
			};
		};
		var theTxt = theAmmo ? theAmmo : aNm;
		if (!items[theTxt]) {
			var InvName = theAmmo && AmmoList[theAmmo].invName ? AmmoList[theAmmo].invName : aNm;
			var parsedInv = ParseGear(InvName);
			items[theTxt] = {
				key : parsedInv ? parsedInv[1] : theAmmo, // item key
				name : InvName, // the name of the ammo
				weight : aWght,
				magic : 0, // magic bonus
				amount : aNr, // the number of these
				isAmmo : true
			};
		};
	};
	if (What("AmmoLeftDisplay.Weight") && What("AmmoLeftDisplay.Amount")) addAmmo(What("AmmoLeftDisplay.Name"), What("AmmoLeftDisplay.Amount"), What("AmmoLeftDisplay.Weight"));
	if (What("AmmoRightDisplay.Weight") && What("AmmoRightDisplay.Amount")) addAmmo(What("AmmoRightDisplay.Name"), What("AmmoRightDisplay.Amount"), What("AmmoRightDisplay.Weight"));

	// loop through the items and add them to the adventuring gear
	for (var it in items) {
		var aItem = items[it];
		var searchRegex = MakeRegex(aItem.name.replace(/ ?\([^\)]\)| ?\[[^\]]\]/g, ""), aItem.magic ? "" : "(?!.*(\\+|-)\\d+)");
		AddToInv("gear", "r", aItem.name, aItem.amount, aItem.weight, "", searchRegex, "replace", aItem.key, true);
	};
};

//Make menu for the button on each equipment line and parse it to Menus.gearline
function MakeInventoryLineMenu() {
	var type = event.target.name.indexOf("Adventuring") !== -1 ? "Adventuring " :
		event.target.name.indexOf("Extra.") !== -1 ? "Extra." :
		event.target.name.substring(0, event.target.name.indexOf("Comp.") + 8) + ".";
	var lineNmbr = Number(event.target.name.slice(-2));
	var theField = What(type + "Gear Row " + lineNmbr);
	var hasMagic = type === "Adventuring " && What("Adventuring Gear Remember") === false;
	var magic = hasMagic && lineNmbr > FieldNumbers.gearMIrow;
	var maxRow = FieldNumbers[type === "Adventuring " ? "gear" : type === "Extra." ? "extragear" : "compgear"];
	var upRow = lineNmbr === 1 ? false : magic ? lineNmbr !== FieldNumbers.gearMIrow + 1 : true;
	var downRow = lineNmbr === maxRow ? false : hasMagic ? lineNmbr !== FieldNumbers.gearMIrow - 1 : true;

	var numColumns = typePF && type === "Adventuring " ? 3 : 2;
	var curCol = typePF && type.indexOf("Comp.") !== -1 ? 1 : Math.ceil(lineNmbr / Math.round(maxRow / numColumns));
	var moveCol = curCol > 1 ? "left" : numColumns === 3 ? "middle" : "right";
	var moveCol2 = numColumns !== 3 ? false : curCol === 3 ? "middle" : "right";

	var amendMenu = function(inputArray) {
		var array = newObj(inputArray);
		for (var i = 0; i < array.length; i++) {
			if (array[i].oSubMenu) {
				var theSub = array[i].oSubMenu;
				for (var j = 0; j < theSub.length; j++) {
					if (theSub[j].cReturn) theSub[j].cReturn = type + "#" + lineNmbr + "#" + theSub[j].cReturn;
				}
			} else {
				array[i].cReturn = type + "#" + lineNmbr + "#" + array[i].cReturn;
			}
		};
		return array;
	};

	var gearMenu = [{
		cName : "Put item on this line" + (theField ? " (overwrites current)" : ""),
		oSubMenu : [{
			cName : "Gear",
			oSubMenu : amendMenu(GearMenus.gear)
		}, {
			cName : "Tool",
			oSubMenu : amendMenu(GearMenus.tools)
		}]
	}, {
		cName : "-"
	}];

	var menuLVL1 = function (menu, array) {
		for (var i = 0; i < array.length; i++) {
			var isEnabled = (array[i][1] === "up" && !upRow) || (array[i][1] === "down" && !downRow) || (!theField && (/move|insert/i).test(array[i][1])) ? false : true;
			menu.push({
				cName : array[i][0],
				cReturn : type + "#" + lineNmbr + "#" + array[i][1],
				bEnabled : isEnabled
			});
		};
	};

	var AddCompOptions = function(menu) {
		var AScompA = What("Template.extras.AScomp").split(",").splice(1);
		var prefix = type.substring(0, type.indexOf("Comp."));
		if (type.indexOf("Comp.") !== -1) AScompA.splice(AScompA.indexOf(prefix), 1);
		if (!theField || !AScompA.length) {
			menu.push({
				cName : "Move to a Companion's Equipment",
				bEnabled : false
			})
			return;
		};
		var temp = {
			cName : "Move to a Companion's Equipment",
			oSubMenu : []
		};
		for (var i = 0; i < AScompA.length; i++) {
			//if (type.indexOf("Comp.") !== -1 && prefix === AScompA[i]) continue;
			var CompNm = What(AScompA[i] + "Comp.Desc.Name");
			var CompPg = tDoc.getField(AScompA[i] + "Comp.Desc.Name").page + 1;
			var eqpVis = eval_ish(What(AScompA[i] + "Companion.Layers.Remember"))[1];
			temp.oSubMenu.push({
				cName : (CompNm ? CompNm : "NAME") + "'s Equipment Section " + (eqpVis ? "" : "\[not visible currently\] ") + "(page " + CompPg + ")",
				cReturn : type + "#" + lineNmbr + "#" + "movepage#" + AScompA[i] + "Comp."
			});
		};
		menu.push(temp);
	};

	menuLVL1(gearMenu, [
		["Move up", "up"],
		["Move down", "down"],
		["-", "-"]
	]);
	if (!typePF || type.indexOf("Comp.") === -1) menuLVL1(gearMenu, [["Move to " + moveCol + " column", "movecol#" + moveCol.substr(0, 1) + "only"]]);
	if (moveCol2) menuLVL1(gearMenu, [["Move to " + moveCol2 + " column", "movecol#" + moveCol2.substr(0, 1) + "only"]]);

	gearMenu.push({cName : "-"});

	if (type !== "Adventuring ") menuLVL1(gearMenu, [["Move to Equipment (page 2)", "movepage#gear"]]);
	if (type !== "Extra.") menuLVL1(gearMenu, [["Move to Extra Equipment (page 3)", "movepage#extra"]]);
	AddCompOptions(gearMenu);

	gearMenu.push({cName : "-"});

	if (magic) menuLVL1(gearMenu, [["Copy to Magic Items (page 3)", "copy#magic"], ["-", "-"]]);

	menuLVL1(gearMenu, [
		["Insert line", "insert"],
		["Delete line", "delete"],
		["Clear line", "clear"]
	]);

	Menus.gearline = gearMenu;
};

//call the inventory line menu and do something with the results
function InventoryLineOptions() {

	var MenuSelection = getMenu("gearline");

	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying inventory line menu option...");
	calcStop();

	var toRightCase = function (intxt) {
		return intxt.split(".").map(function (n) {
			return n == "eqp" ? n : n == "ascomp" ? "AScomp" : n.substr(0,1).toUpperCase() + n.substr(1);
		}).join(".");
	}
	var type = toRightCase(MenuSelection[0]);
	var lineNmbr = Number(MenuSelection[1]);

	var Fields = [
		type + "Gear Row " + lineNmbr,
		type + "Gear Amount " + lineNmbr,
		type + "Gear Weight " + lineNmbr,
		type + "Gear Location.Row " + lineNmbr
	];
	var FieldsValue = [
		What(Fields[0]),
		What(Fields[1]),
		What(Fields[2]),
		What(Fields[3])
	];

	switch (MenuSelection[2]) {
	 case "up" :
	 case "down" :
		thermoTxt = thermoM("Moving the gear " + MenuSelection[2] + "...", false); //change the progress dialog text
		var A = MenuSelection[2] === "up" ? -1 : 1;
		var FieldsNext = [
			type + "Gear Row " + (lineNmbr + A),
			type + "Gear Amount " + (lineNmbr + A),
			type + "Gear Weight " + (lineNmbr + A),
			type + "Gear Location.Row " + (lineNmbr + A)
		];
		var FieldsNextValue = [
			What(FieldsNext[0]),
			What(FieldsNext[1]),
			What(FieldsNext[2]),
			What(FieldsNext[3])
		];
		for (var H = 0; H < Fields.length; H++) {
			Value(FieldsNext[H], FieldsValue[H]);
			Value(Fields[H], FieldsNextValue[H]);
			thermoM(H/Fields.length); //increment the progress dialog's progress
		};
		break;
	 case "movecol" :
		var toCol = MenuSelection[3];
		thermoTxt = thermoM("Moving the gear to the " + (toCol.indexOf("r") !== -1 ? "right" : toCol.indexOf("m") !== -1 ? "middle" : "left") + " column...", false); //change the progress dialog text
		InvDelete(type, lineNmbr);
		AddToInv(type, MenuSelection[3], FieldsValue[0], FieldsValue[1], FieldsValue[2], FieldsValue[3], false, false, false, true);
		break;
	 case "movepage" :
		thermoTxt = thermoM("Moving the gear to another page...", false); //change the progress dialog text
		InvDelete(type, lineNmbr);
		var toPageType = toRightCase(MenuSelection[3]);
		AddToInv(toPageType, "l", FieldsValue[0], FieldsValue[1], FieldsValue[2], FieldsValue[3], false, false, false, true);
		break;
	 case "copy" :
		thermoTxt = thermoM("Copying the gear to magic items on page 3...", false); //change the progress dialog text
		AddMagicItem(FieldsValue[0], true, "", FieldsValue[2]);
		break;
	case "insert":
		thermoTxt = thermoM("Inserting empty gear line...", false); //change the progress dialog text
		InvInsert(type, lineNmbr);
		break;
	case "delete":
		thermoTxt = thermoM("Deleting gear line...", false); //change the progress dialog text
		InvDelete(type, lineNmbr);
		break;
	case "clear":
		thermoTxt = thermoM("Clearing gear line...", false); //change the progress dialog text
		tDoc.resetForm(Fields);
		break;
	case "gear":
	case "tool":
		var theGear = MenuSelection[2] === "gear" ? GearList[MenuSelection[3]] : ToolsList[MenuSelection[3]];
		thermoTxt = thermoM("Adding '" + theGear.name + "' to the line...", false); //change the progress dialog text
		var theNm = (lineNmbr > 1 && (/^.{0,2}-|backpack|\bbag\b|^(?=.*saddle)(?=.*bag).*$|\bsack\b|\bchest\b|, with|, contain/i).test(What(type + "Gear Row " + (lineNmbr - 1))) ? "- " : "") + theGear.name;
		Value(Fields[0], theNm);
		Value(Fields[1], theGear.amount);
		Value(Fields[2], What("Unit System") === "metric" ? RoundTo(theGear.weight * UnitsList.metric.mass, 0.001, true) : theGear.weight);
		break;
	};

	thermoM(thermoTxt, true); // Stop progress bar
};

//insert a slot at the position wanted
function InvInsert(type, slot, extraPre) {
	//stop the function if the selected slot is already empty
	if (What(type + "Gear Row " + slot) === "") {
		return;
	}

	var isComp = type.indexOf("Comp.") !== -1;
	var totalslots = isComp ? FieldNumbers.compgear : (type === "Extra." ? FieldNumbers.extragear : (What("Adventuring Gear Remember") === false && slot <= FieldNumbers.gearMIrow ? FieldNumbers.gearMIrow : FieldNumbers.gear));

	//look for the first empty slot below the slot
	var endslot = "";
	for (var i = slot + 1; i <= totalslots; i++) {
		if (What(type + "Gear Row " + i) === "") {
			endslot = i;
			i = totalslots + 1;
		}
	}

	//only continue if an empty slot was found in the fields
	if (endslot) {
		var extraPre = extraPre ? extraPre : "";
		//cycle to the slots starting with the empty one and add the values of the one above
		for (var i = endslot; i > slot; i--) {
			var lastRowName = What(type + "Gear Row " + (i - 1));
			lastRowName = (extraPre && lastRowName.indexOf(extraPre) !== 0 ? extraPre : "") + lastRowName;
			Value(type + "Gear Row " + i, lastRowName);
			Value(type + "Gear Amount " + i, What(type + "Gear Amount " + (i - 1)));
			Value(type + "Gear Weight " + i, What(type + "Gear Weight " + (i - 1)));
			if (!isComp) Value(type + "Gear Location.Row " + i, What(type + "Gear Location.Row " + (i - 1)));
		}

		//empty the selected slot
		Value(type + "Gear Row " + slot, "");
		Value(type + "Gear Amount " + slot, "");
		Value(type + "Gear Weight " + slot, "");
		if (!isComp) Value(type + "Gear Location.Row " + slot, "");
	}
}

//delete a slot at the position wanted and move the rest up
function InvDelete(type, slot) {
	var isComp = type.indexOf("Comp.") !== -1;
	var lastslot = isComp ? FieldNumbers.compgear : (type === "Adventuring " ? FieldNumbers.gear : FieldNumbers.extragear);
	var numColumns = typePF && type === "Adventuring " ? 3 : 2;
	var perColumn = Math.round(lastslot / numColumns);
	var endslot = isComp && typePF ? lastslot : perColumn * Math.ceil(slot / perColumn);
	if (type === "Adventuring " && endslot === FieldNumbers.gear && What("Adventuring Gear Remember") === false && slot <= FieldNumbers.gearMIrow) {
		endslot = FieldNumbers.gearMIrow;
	}

	//move every line up one space, starting with the selected line
	for (var i = slot; i < endslot; i++) {
		Value(type + "Gear Row " + i, What(type + "Gear Row " + (i + 1)));
		Value(type + "Gear Amount " + i, What(type + "Gear Amount " + (i + 1)));
		Value(type + "Gear Weight " + i, What(type + "Gear Weight " + (i + 1)));
		if (!isComp) Value(type + "Gear Location.Row " + i, What(type + "Gear Location.Row " + (i + 1)));
	}
	//delete the contents of the final line
	var resetA = [
		type + "Gear Row " + endslot,
		type + "Gear Amount " + endslot,
		type + "Gear Weight " + endslot,
		type + "Gear Location.Row " + endslot
	];
	if (!isComp) resetA.pop();
	tDoc.resetForm(resetA);
}

/* ---- INVENTORY FUNCTIONS END ---- */

//see if text contains a background
function ParseBackground(input) {
	var resultArray = ["", ""];
	if (!input) return resultArray;

	input = removeDiacritics(input);
	var foundLen = 0;
	var foundDat = 0;

	for (var key in BackgroundList) {
		var kObj = BackgroundList[key];

		// first we look for background variants
		if (kObj.variant) {
			var matchedThisSub = false;
			var BackOpt = kObj.variant;
			for (var sub = 0; sub < BackOpt.length; sub++) { // scan string for all variants of the background
				var bVars = BackgroundSubList[BackOpt[sub]];

				if (!(bVars.regExpSearch).test(input) // see if background variant regex matches
					|| testSource(BackOpt[sub], bVars, "backgrExcl") // test if the background variant or its source isn't excluded
				) continue;

				// only go on with this entry if:
				// we are using the search length (default) and this entry has a longer name or this entry has an equal length name but has a newer source
				// or if we are not using the search length, just look at the newest source date
				var tempDate = sourceDate(bVars.source);
				if ((!ignoreSearchLength && bVars.name.length < foundLen) || (!ignoreSearchLength && bVars.name.length == foundLen && tempDate < foundDat) || (ignoreSearchLength && tempDate <= foundDat)) continue;

				// we have a match, set the values
				resultArray = [key, BackOpt[sub]];
				foundLen = bVars.name.length;
				foundDat = tempDate;
				matchedThisSub = true;
			}
		}

		// continue with the background object, maybe it is a (better) match
		if (!(kObj.regExpSearch).test(input) // see if regex matches
			|| testSource(key, kObj, "backgrExcl") // test if the background or its source isn't excluded
		) continue;

		// only go on with this entry if:
		// we are using the search length (default) and this entry has a longer name or this entry has an equal length name but has a newer source
		// or if we are not using the search length, just look at the newest source date
		var tempDate = sourceDate(kObj.source);
		if ((!ignoreSearchLength && kObj.name.length < foundLen) || (!ignoreSearchLength && kObj.name.length == foundLen && tempDate < foundDat) || (ignoreSearchLength && tempDate <= foundDat)) continue;

		// we have a match, set the values
		resultArray = [key, matchedThisSub ? resultArray[1] : ""];
		foundLen = kObj.name.length;
		foundDat = tempDate;
	}
	return resultArray;
};

//detects background entered and put information to global CurrentBackground variable
function FindBackground(input) {
	var tempString = input === undefined ? What("Background").toLowerCase() : input;
	var tempFound = ParseBackground(tempString);
	CurrentBackground = {
		known : tempFound[0],
		variant : tempFound[1],
		name : "", //must exist
		source : [], //must exist
		trait : [], //must exist
		ideal : [], //must exist
		bond : [], //must exist
		flaw : [] //must exist
	};

	// set the properties of the CurrentBackground object
	if (tempFound[0]) {
		// the properties of the main background
		for (var prop in BackgroundList[tempFound[0]]) {
			if ((/^(known|variants?|level)$/i).test(prop)) continue;
			CurrentBackground[prop] = BackgroundList[tempFound[0]][prop];
		}
		// the properties of the variant (overriding anything from the main)
		if (tempFound[1]) {
			for (var prop in BackgroundSubList[tempFound[1]]) {
				if ((/^(known|variants?|level)$/i).test(prop)) continue;
				CurrentBackground[prop] = BackgroundSubList[tempFound[1]][prop];
			}
		}
	}
};

//apply the various attributes of the background
function ApplyBackground(input) {
	if (IsSetDropDowns || CurrentVars.manual.background) return; // when just changing the dropdowns or background is set to manual, don't do anything

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying background...");
	calcStop();

	var xtrFld = tDoc.getField("Background Extra");
	var newBackground = ParseBackground(input);
	var oldBackground = [CurrentBackground.known, CurrentBackground.variant];
	if (newBackground[0] !== oldBackground[0] || newBackground[1] !== oldBackground[1]) {
		if (CurrentBackground.known) {
			thermoTxt = thermoM("Removing the " + CurrentBackground.name + " background features...", false); //change the progress dialog text

			// remove the background common attributes
			var Fea = ApplyFeatureAttributes(
				"background", // type
				CurrentBackground.known, // fObjName [aParent, fObjName]
				[1, 0, false], // lvlA [old-level, new-level, force-apply]
				false, // choiceA [old-choice, new-choice, "only"|"change"]
				false // forceNonCurrent
			);

			// reset the background feature
			if (CurrentBackground.feature) Value("Background Feature", "");

			// reset the background extra field
			xtrFld.clearItems();
			xtrFld.userName = "First fill out a background in the field " + (typePF ? "above" : "to the left") + '.\n\nOnce a background is recognized that offers additional options (e.g. the "Origin" of the "Outlander" background), those additional options will be available here.';

			// reset the lifestyle
			if (CurrentBackground.lifestyle && What("Lifestyle") === CurrentBackground.lifestyle) Value("Lifestyle", "");

			thermoM(2/5); //increment the progress dialog's progress
		};
		FindBackground(input);
	}

	if (CurrentBackground.known && (CurrentBackground.known !== oldBackground[0] || CurrentBackground.variant !== oldBackground[1])) {
		thermoTxt = thermoM("Applying the " + CurrentBackground.name + " background features...", false); //change the progress dialog text

		// Apply the background feature
		if (CurrentBackground.feature) Value("Background Feature", CurrentBackground.feature);

		// Apply the background extra
		if (CurrentBackground.extra) {
			xtrFld.setItems([""].concat(CurrentBackground.extra.slice(1)));
			xtrFld.userName = CurrentBackground.extra[0] + "\n(" + CurrentBackground.name + " background)";
		} else {
			xtrFld.userName = "There are no extra choices defined for your " + CurrentBackground.name + " background.\nThus, this drop-down box is empty.\n\nFeel free to use it for additional background comments.";
		};

		// Apply the lifestyle, if defined
		if (CurrentBackground.lifestyle) Value("Lifestyle", CurrentBackground.lifestyle);

		thermoM(3/5); //increment the progress dialog's progress

		// Apply the background common attributes
		var Fea = ApplyFeatureAttributes(
			"background", // type
			CurrentBackground.known, // fObjName [aParent, fObjName]
			[0, 1, false], // lvlA [old-level, new-level, force-apply]
			false, // choiceA [old-choice, new-choice, "only"|"change"]
			false // forceNonCurrent
		);
	}

	thermoM(thermoTxt, true); // Stop progress bar
};

//Make menu for 'background traits' button and parse it to Menus.background
function MakeBackgroundMenu() {
	var backMenu = [];

	var menuLVL1 = function (item, array) {
		for (i = 0; i < array.length; i++) {
			item.push({
				cName : array[i][0],
				cReturn : item + "#" + array[i][1],
				bEnabled : array[i][1] !== "nothing"
			});
		}
	};

	var menuLVL2 = function (menu, name, array) {
		var temp = {
			cName : name + (name == "Personality Trait" ? " (select 2)" : ""),
			oSubMenu : []
		};
		var theEntry = What(name);
		for (i = 0; i < array.length; i++) {
			var toUse = isArray(array[i]) ? array[i][1] : array[i];
			temp.oSubMenu.push({
				cName : toUse,
				cReturn : name + "#" + i,
				bMarked : (RegExp(toUse.RegEscape(), "i")).test(theEntry)
			})
		}
		menu.push(temp);
	};

	if (CurrentBackground.known) {
		menuLVL2(backMenu, "Personality Trait", CurrentBackground.trait);
		menuLVL2(backMenu, "Ideal", CurrentBackground.ideal);
		menuLVL2(backMenu, "Bond", CurrentBackground.bond);
		menuLVL2(backMenu, "Flaw", CurrentBackground.flaw);
	} else {
		menuLVL1(backMenu, [["No background entry has been detected on the first page", "nothing"]]);
	};

	menuLVL1(backMenu, ["-", ["Reset the four fields", "reset"]]);

	Menus.background = backMenu;
};

//call the background menu and do something with the results
function BackgroundOptions() {
	var MenuSelection = getMenu("background");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;
	if (MenuSelection[0] === "personality trait") {
		AddString("Personality Trait", CurrentBackground.trait[MenuSelection[1]], " ");
	} else if (MenuSelection[0] === "ideal") {
		Value("Ideal", CurrentBackground.ideal[MenuSelection[1]][1]);
	} else if (MenuSelection[0] === "bond") {
		Value("Bond", CurrentBackground.bond[MenuSelection[1]]);
	} else if (MenuSelection[0] === "flaw") {
		Value("Flaw", CurrentBackground.flaw[MenuSelection[1]]);
	} else if (MenuSelection[1] === "reset") {
		tDoc.resetForm(["Personality Trait", "Ideal", "Bond", "Flaw"]);
	}
};

// add a tool or a language (typeLT = "tool" || "language"); uniqueID is the whole submitname for something that has a choice, it is the input + ID
function AddLangTool(typeLT, input, tooltip, uniqueID, replaceThis, replaceMatch) {
	switch (clean(typeLT, false, true).toLowerCase()) {
		case "language" :
			var fld = "Language ";
			var type = "language";
			break;
		case "tool" :
			var fld = "Tool ";
			var type = "tool";
			break;
		default :
			return;
	};
	var inputCl = clean(input, false, true);
	var replaceThisString = replaceThis ? clean(replaceThis, false, true) : false;
	var doReplace = false;
	var overflow = What("MoreProficiencies").toLowerCase().indexOf(inputCl.toLowerCase()) !== -1;
	var theSubmit = uniqueID ? uniqueID : inputCl;
	var useReg = MakeRegex(inputCl);
	var tooltipString = tooltip ? formatMultiList("\"" + (uniqueID ? uniqueID.replace(/.*_#_(.*)_#_.*/, "$1") : inputCl) + "\" " + type + " proficiency was gained from:", tooltip) : "";
	for (var n = 1; n <= 3; n++) {
		for (var i = 1; i <= FieldNumbers.langstools; i++) {
			var next = tDoc.getField(fld + i);
			if (n === 1 && (!uniqueID || (uniqueID && next.submitName == uniqueID)) && (next.value == inputCl || next.submitName == theSubmit || ((useReg).test(next.value) && similarLen(next.value, inputCl)))) {
				if (!replaceThis) {
					next.userName = tooltipString;
					next.submitName = theSubmit;
				};
				return;
			} else if (n === 2 && replaceThis && (next.submitName == replaceThisString || next.value == replaceThisString || (replaceMatch && replaceThisString.toLowerCase().indexOf(next.value.toLowerCase()) !== -1))) {
				doReplace = i;
				break;
			} else if (n === 3 && (doReplace === i || (!doReplace && clean(next.value) === ""))) {
				next.value = inputCl;
				if (!replaceThis) {
					next.submitName = theSubmit;
					next.userName = tooltipString;
				};
				if (overflow) {
					RemoveString("MoreProficiencies", inputCl + " (" + type + ")");
					RemoveString("MoreProficiencies", inputCl);
				};
				return;
			};
		};
	};
	if (!overflow) AddString("MoreProficiencies", inputCl + " (" + type + ")", "; ");
};

// remove a tool or a language (typeLT = "tool" || "language") // choice = the input from the dialog; uniqueID is for something that offers a choice, so which might have been changed but should still be removed if it matches
function RemoveLangTool(typeLT, input, uniqueID, choice) {
	switch (clean(typeLT, false, true).toLowerCase()) {
		case "language" :
			var fld = "Language ";
			var type = "language";
			break;
		case "tool" :
			var fld = "Tool ";
			var type = "tool";
			break;
		default :
			return;
	};
	var useStr = clean(input, false, true);
	var useReg = MakeRegex(useStr);
	var theSubmit = uniqueID ? uniqueID : useStr;
	for (var i = 1; i <= FieldNumbers.langstools; i++) {
		var next = tDoc.getField(fld + i);
		if ((uniqueID && next.submitName === theSubmit) || (!uniqueID && (next.value === useStr || ((useReg).test(next.value) && similarLen(next.value, useStr))))) {
			DeleteItemType(fld, i, FieldNumbers.langstools);
			return;
		} else if (next.submitName === theSubmit) {
			AddTooltip(fld + i, "", "");
			return;
		};
	};
	var choiceCl = choice ? clean(choice, false, true) : useStr;
	RemoveString("MoreProficiencies", choiceCl + " (" + type + ")");
	RemoveString("MoreProficiencies", choiceCl);

};

// redirect the old function names for legacy support
function AddLanguage(language, tooltip, replaceThis) { AddLangTool("language", language, tooltip, false, replaceThis) };
function RemoveLanguage(language, tooltip) { RemoveLangTool("language", language) };
function AddTool(tool, toolstooltip, replaceThis) { AddLangTool("tool", tool, toolstooltip, false, replaceThis) };
function RemoveTool(tool, toolstooltip) { RemoveLangTool("tool", tool) };

function AddWeapon(weapon, partialReplace, prefix) {
	if (!prefix) prefix = !prefix && event.target && event.target.name ? getTemplPre(event.target.name, "AScomp", true) : "";
	var QI = prefix ? false : !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var maxItems = QI ? FieldNumbers.attacks : 3;

	var makeWordBoundryRegex = function (inStr) {
		return RegExp(inStr.RegEscape().replace(/(^\W*)(.*?)(\W*$)/i, "$1\\b$2\\b$3"), "i");
	}
	var searchWea = clean(weapon.toLowerCase(), " "); //remove leading or trailing spaces
	var regexWea = makeWordBoundryRegex(searchWea);
	for (var n = 1; n <= 2; n++) {
		for (var i = 1; i <= maxItems; i++) {
			var next = tDoc.getField(prefix + Q + "Attack." + i + ".Weapon Selection");
			if (n === 1 && (regexWea).test(next.value)) {
				return;
			} else if (n === 2 && (next.value === "" || (partialReplace && (makeWordBoundryRegex(next.value)).test(searchWea)))) {
				next.value = weapon;
				return;
			}
		}
	}
};

function RemoveWeapon(weapon) {
	if (!IsNotImport) return;
	var QI = !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	var maxItems = QI ? FieldNumbers.attacks : 3;

	var regexWea = RegExp(clean(weapon.toLowerCase(), " ").RegEscape().replace(/(^\W*)(.*?)(\W*$)/i, "$1\\b$2\\b$3"), "i");
	for (var i = maxItems; i >= 1; i--) {
		if ((regexWea).test(What(prefix + Q + "Attack." + i + ".Weapon Selection"))) {
			WeaponDelete(i);
		}
	}
};

function AddString(field, inputstring, newline) {
	if (!inputstring && inputstring !== 0) return;
	var thefield = tDoc.getField(field);
	if (!thefield) return;
	var thestring = inputstring.replace(/\n/g, "\r");
	var regExString = thestring.RegEscape();
	var multithestring = "\r" + thestring;
	var multilines = thefield.type === "text" && thefield.multiline && newline === true && thefield.value !== "";
	var separator = (newline !== true && newline !== false && thefield.value !== "") ? (newline ? newline : " ") : "";
	if (!(RegExp(regExString, "i")).test(thefield.value) && thefield.value.toLowerCase().indexOf(thestring.toLowerCase()) === -1) {
		if (!multilines && thefield.value !== "") {
			var cleanSep = clean(separator, " ");
			var cleanFld = clean(thefield.value, " ");
			if (cleanFld.slice(cleanSep.length * -1) === cleanSep) separator = " ";
			thefield.value = cleanFld + separator + thestring;
		} else {
			thefield.value += multilines ? multithestring : thestring;
		}
	}
};

function RemoveString(field, toremove, newline) {
	if (!toremove && toremove !== 0) return;
	var thestring = toremove.replace(/\n/g, "\r");
	var regExString = thestring.RegEscape();
	var thefield = tDoc.getField(field);
	if (!thefield) return;
	var stringsArray, regExStringsArray;
	if (newline === false) {
		stringsArray = [thestring];
		regExStringsArray = [regExString];
	} else {
		stringsArray = [
			thestring + "\r",
			"\r" + thestring,
			", " + thestring,
			"; " + thestring,
			thestring + ", ",
			thestring + "; ",
			thestring + " ",
			" " + thestring,
			thestring
		];
		regExStringsArray = [
			regExString + "\\r",
			"\\r" + regExString,
			", " + regExString,
			"; " + regExString,
			regExString + ", ",
			regExString + "; ",
			regExString + " ",
			" " + regExString,
			regExString
		];
	}
	for (var i = 0; i < stringsArray.length; i++) {
		var regex = RegExp(regExStringsArray[i], "i");
		if ((regex).test(thefield.value)) {
			thefield.value = thefield.value.replace(regex, "");
			break;
		} else if (thefield.value.indexOf(stringsArray[i]) !== -1) {
			thefield.value = thefield.value.replace(stringsArray[i], "");
			break;
		}
	}
};

function ReplaceString(field, inputstring, newline, theoldstring, alreadyRegExp) {
	var thefield = tDoc.getField(field);
	if (!thefield) return;
	var thestring = theoldstring.replace(/\n/g, "\r");
	var regExString = alreadyRegExp ? thestring : thestring.RegEscape();
	var multilines = newline !== undefined ? newline : thefield.multiline;
	if ((RegExp(regExString, "i")).test(thefield.value) && theoldstring) {
		thefield.value = thefield.value.replace(RegExp(regExString, "i"), inputstring);
	} else if (thefield.value.indexOf(thestring) !== -1 && theoldstring) {
		thefield.value = thefield.value.replace(thestring, inputstring);
	} else {
		AddString(field, inputstring, multilines);
		return;
	};
	if (field == "Extra.Notes") show3rdPageNotes();
};

// add (change === true) or remove (change === false) a skill proficiency with or without expertise; If expertise === "only", only add/remove the expertise, considering the skill already has proficiency; If expertise === "increment", only add/remove the expertise, considering the skill already has proficiency, otherwise add proficiency
function AddSkillProf(SkillName, change, expertise, returnSkillName, bonus, compPage) {
	var QI = compPage ? !compPage : !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var prefix = QI ? "" : compPage ? compPage : getTemplPre(event.target.name, "AScomp", true);
	var tempString = SkillName;
	if (SkillName.length > 4) {
		if (SkillsList.abbreviations.indexOf(SkillName.substring(0, 4)) !== -1) {
			tempString = SkillName.substring(0, 4);
		} else if (SkillsList.abbreviations.indexOf(SkillName.substring(0, 3)) !== -1) {
			tempString = SkillName.substring(0, 3);
		}
	};
	if (SkillsList.abbreviations.indexOf(tempString) == -1) return; // skill not found, so nothing to do
	var alphaB = Who("Text.SkillsNames") === "alphabeta";
	if ((QI || typePF) && !alphaB) tempString = SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(tempString)];
	if (!QI && !typePF) {
		var skFld = prefix + "Text.Comp.Use.Skills." + tempString + ".Prof";
		var curProf = What(skFld);
		if ((/only|increment/i).test(expertise)) {
			var newval = change && curProf == "proficient" ? "expertise" : !change && curProf == "expertise" ? "proficient" : expertise == "only" ? curProf : change && curProf == "nothing" ? "proficient" : "nothing";
		} else {
			var newval = !change ? "nothing" : expertise ? "expertise" : "proficient";
		}
		Value(skFld, newval);
		if (bonus !== undefined && bonus !== false) Value(prefix + ".BlueText.Comp.Use.Skills." + tempString + ".Bonus", bonus);
	} else {
		var profFld = QI ? tempString + " Prof" : prefix + ".Comp.Use.Skills." + tempString + ".Prof";
		var expFld = QI ? tempString + " Exp" : prefix + ".Comp.Use.Skills." + tempString + ".Exp";
		var bonusFld = QI ? tempString + " Bonus" : prefix + ".BlueText.Comp.Use.Skills." + tempString + ".Bonus";
		var curProf = tDoc.getField(profFld).isBoxChecked(0);
		var curExp = tDoc.getField(expFld).isBoxChecked(0);
		var exp, prof;
		if ((/only|increment/i).test(expertise)) {
			exp = change && curProf ? true : false;
			prof = expertise == "only" ? curProf : !change && curExp;
		} else {
			exp = change && expertise;
			prof = change;
		}
		Checkbox(expFld, exp);
		Checkbox(profFld, prof);
		if (bonus !== undefined && bonus !== false) Value(bonusFld, bonus);
	}
	// return the skill name if concerning a companion page
	if (returnSkillName) return SkillsList.names[SkillsList.abbreviations.indexOf(tempString)];
};

//make sure field is a number or the abbreviation of an ability score (field validation)
function ValidateBonus(goEmpty, allowDC) {
	var test = 0;
	var input = Number(event.value.replace(/,/g,"."));
	if (isNaN(input)) {
		var notComp = getTemplPre(event.target.name, "AScomp");
		test = event.value;
		if (!allowDC) test = test.replace(/dc/ig, "");
		["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS", "Prof"].forEach( function(AbiS) {
			test = test.replace(RegExp("(\\b|\\d)" + AbiS[0] + AbiS[1] + "?" + AbiS[2] + "?" + "(\\b|\\d)", "ig"), "$1" + AbiS + "$2");
		});
		var calc = EvalBonus(test, notComp, "test");
		event.value = calc === undefined ? event.target.value : test;
	} else {
		var calc = Math.round(input);
		event.value = event.value === "" && goEmpty ? "" : calc;
	};
	if (calc !== undefined) event.target.valueCalculated = calc;
};

// Display the EvalBonus for this field, if calculated (field format)
function DisplayBonus() {
	if (event.value && event.target.valueCalculated !== undefined) event.value = event.target.valueCalculated;
}

// Calculate the EvalBonus for this field, if calculated (field calculation)
function DisplayBonusCalculate() {
	if (event.value && isNaN(event.value)) {
		var prefix = getTemplPre(event.target.name, "AScomp", true);
		if (prefix === "") prefix = true;
		var evalVal = EvalBonus(event.value, prefix);
		if (evalVal !== event.target.valueCalculated) {
			event.target.valueCalculated = evalVal;
			event.target.value = event.value; // so that the display is actually updated
		}
	}
}

// Calculate the skill modifier (field calculation)
function CalcSkill() {
	event.value = SkillsList.values[event.target.name] === undefined ? '' : SkillsList.values[event.target.name];
}
function CalcAllSkills(isCompPage) {
	if (isCompPage) {
		var pr = getTemplPre(event.target.name, "AScomp", true);
		if (!pr) return;
	} else {
		var pr = false;
		var remAth = tDoc.getField("Remarkable Athlete").isBoxChecked(0);
		var jackOf = tDoc.getField("Jack of All Trades").isBoxChecked(0);
	}
	var abiFlds = ["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"];
	var alphaB = Who("Text.SkillsNames") == "alphabeta";
	var setVals = SkillsList.values;
	var mod = {};
	for (var i = 0; i < abiFlds.length; i++) {
		var abi = abiFlds[i];
		mod[abi] = What(!pr ? abi + " Mod" : pr + "Comp.Use.Ability." + abi + ".Mod");
	}
	var profB = Number(!pr ? How("Proficiency Bonus") : What(pr + "Comp.Use.Proficiency Bonus"));
	var profDie = tDoc.getField(!pr ? "Proficiency Bonus Dice" : pr + "BlueText.Comp.Use.Proficiency Bonus Dice").isBoxChecked(0);
	var isInit = false;
	var allBonus = EvalBonus(What(!pr ? "All Skills Bonus" : pr + "BlueText.Comp.Use.Skills.All.Bonus"), !pr ? true : pr);
	var passPercFld = !pr ? "Passive Perception" : pr + "Comp.Use.Skills.Perc.Pass.Mod";
	for (var i = 0; i < SkillsList.abbreviations.length; i++) {
		var sk = SkillsList.abbreviations[i];
		isInit = sk == "Init";
		if (sk == "Too" && pr) continue;
		var skFld = alphaB || (pr && !typePF) ? sk : SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(sk)];
		var setFld = !pr ? (isInit ? "Initiative bonus" : skFld) : pr + "Comp.Use." + (isInit ? "Combat.Init" : "Skills." + skFld) + ".Mod";
		var theAbi = SkillsList.abilityScores[i];
		var doPass = sk == "Perc";
		if (!theAbi || theAbi == "Too" || mod[theAbi] === undefined || mod[theAbi] === "") {
			setVals[setFld] = "";
			if (doPass) setVals[passPercFld] = "";
			continue;
		}
		// ability score modifier
		setVals[setFld] = mod[theAbi];
		var addProf = 0;
		// proficiency bonus
		if (isInit) {
			if (!pr) setVals[setFld] += remAth ? Math.ceil(profB / 2) : jackOf ? Math.floor(profB / 2) : 0;
		} else if ((doPass || !profDie) && !pr) {
			if (tDoc.getField(setFld + " Prof").isBoxChecked(0)) {
				addProf = profB;
				if (tDoc.getField(setFld + " Exp").isBoxChecked(0)) addProf += profB;
			} else if (remAth && (/^(Str|Dex|Con)$/).test(theAbi)) {
				addProf = Math.ceil(profB / 2);
			} else if (jackOf) {
				addProf = Math.floor(profB / 2);
			}
		} else if ((doPass || !profDie) && typePF) {
			if (tDoc.getField(pr + "Comp.Use.Skills." + skFld + ".Prof").isBoxChecked(0)) {
				addProf = profB;
				if (tDoc.getField(pr + "Comp.Use.Skills." + skFld + ".Exp").isBoxChecked(0)) addProf += profB;
			}
		} else if (doPass || !profDie) {
			var profType = What(pr + "Text.Comp.Use.Skills." + skFld + ".Prof");
			if (profType == "expertise") {
				addProf = profB * 2;
			} else if (profType == "proficient") {
				addProf = profB;
			}
		}
		if (!profDie) setVals[setFld] += addProf;
		// modifier field
		var modFld = isInit && !pr ? "Init Bonus" : isInit && pr ? pr + "Comp.Use.Combat.Init.Bonus" : !pr ? setFld + " Bonus" : pr + "BlueText.Comp.Use.Skills." + skFld + ".Bonus";
		setVals[setFld] += EvalBonus(What(modFld), !pr ? true : pr);
		// all skill bonus
		if (!isInit) setVals[setFld] += allBonus;
		// passive perception
		if (doPass) {
			setVals[passPercFld] = setVals[setFld] + 10;
			setVals[passPercFld] += EvalBonus(What(!pr ? "Passive Perception Bonus" : pr + "BlueText.Comp.Use.Skills.Perc.Pass.Bonus"), !pr ? true : pr);
			if (!pr) {
				// advantage/disadvantage on the 1st page
				if (!typePF) {
					setVals[passPercFld] += tDoc.getField(setFld + " Adv").isBoxChecked(0) ? 5 : tDoc.getField(setFld + " Dis").isBoxChecked(0) ? -5 : 0;
				} else {
					var pasPercSN = How("Passive Perception Bonus");
					setVals[passPercFld] += pasPercSN == "Adv" ? 5 : pasPercSN == "Dis" ? -5 : 0;
				}
				if (profDie) {
					// add the proficiency bonus if set to using proficiency die
					setVals[passPercFld] += addProf;
				}
			}
		}
	}
	CalcSkill();
};

//calculate the saving throw modifier (field calculation)
function CalcSave() {
	//get the ability modifier belonging to the save
	var Save = event.target.name;
	var QI = event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	var Sabi = QI ? 4 : 21 + prefix.length;
	var Ability = Save.substring(0, Sabi - 1).slice(-3);
	if (prefix && CurrentCompRace[prefix] && CurrentCompRace[prefix].savesLinked) {
		// copy the total from the first page, ignoring any modifiers on this page
		event.value = What(Ability + " ST Mod");
		return;
	}
	var Mod = What(Save.substring(0, Sabi) + "Mod");

	//get the proficiency bonus if applicable
	var Sprof = tDoc.getField(Save.replace("Mod", "Prof")).isBoxChecked(0) === 1;
	var useDice = QI ? tDoc.getField("Proficiency Bonus Dice").isBoxChecked(0) === 1 : tDoc.getField(prefix + "BlueText.Comp.Use.Proficiency Bonus Dice").isBoxChecked(0) === 1;
	var ProfBonus = useDice || !Sprof ? 0 : What(prefix + Q + "Proficiency Bonus");

	//get the variable entered into the bonus field
	var ExtraBonus = EvalBonus(What(Save.replace("Comp.", "BlueText.Comp.").replace("Mod", "Bonus")), QI ? true : prefix);

	//get the variable entered into the bonus field for all
	var AllBonus = EvalBonus(What(Save.replace("Comp.", "BlueText.Comp.").replace("Mod", "Bonus").replace(Ability, "All")), QI ? true : prefix);

	//calculate the total
	var theResult = Mod === "" ? "" : Number(Mod) + Number(ProfBonus) + Number(ExtraBonus) + Number(AllBonus);

	//change the total to fail if some condition dictates it
	if (!typePF && QI && (Ability === "Str" || Ability === "Dex") && (tDoc.getField("Extra.Condition 8").isBoxChecked(0) === 1 || tDoc.getField("Extra.Condition 9").isBoxChecked(0) === 1 || tDoc.getField("Extra.Condition 13").isBoxChecked(0) === 1 || tDoc.getField("Extra.Condition 14").isBoxChecked(0) === 1)) {
		theResult = "fail";
	}

	event.value = theResult;
};

//calculate the ability modifier (field calculation)
function CalcMod() {
	var Base = event.target.name.indexOf("Comp.") !== -1 || event.target.name.indexOf("Wildshape.") !== -1;
	var AbiNm = Base ? event.target.name.replace(".Mod", ".Score") : event.target.name.replace(" Mod", "");
	var theScore = What(AbiNm);
	event.value = theScore ? (Math.round((theScore - 10.5) * 0.5)) : "";
}

function processRecovery(recovery, additionalRecovery) {
	var recoveryStr = "";
	switch (recovery) {
		case "long rest":
			recoveryStr += "LR";
			break;
		case "short rest":
			recoveryStr += "SR";
			break;
		case "dawn":
			recoveryStr += "Dawn";
			break;
		default:
			recoveryStr += recovery.trim().capitalize();
			break;
	}
	if (additionalRecovery) {
		recoveryStr += "/" + additionalRecovery.trim();
	}
	return leftpad(recoveryStr,(typePF ? 5 : 4));
}

// Add a limited feature: add (UpdateOrReplace = "replace"), or only update the text (UpdateOrReplace = "update"), or update both the text and the usages (UpdateOrReplace = number of previous usages), or just add the number of usages (UpdateOrReplace = "bonus")
function AddFeature(identifier, usages, additionaltxt, recovery, tooltip, UpdateOrReplace, Calc, additionalRecovery) {
	tooltip = tooltip ? tooltip : "";
	var additionaltxt = additionaltxt.indexOf(identifier) != -1 ? "" : additionaltxt && What("Unit System") === "metric" ? ConvertToMetric(additionaltxt, 0.5) : additionaltxt;
	UpdateOrReplace = UpdateOrReplace || UpdateOrReplace === 0 || UpdateOrReplace === "" ? UpdateOrReplace : "replace";
	var calculation = Calc ? Calc : "";
	var SslotsVisible = !typePF && eval_ish(What("SpellSlotsRemember"))[0];
	var recovery = (/^(long rest|short rest|dawn)$/).test(recovery) && !additionalRecovery ? recovery : processRecovery(recovery, additionalRecovery);
	if ((/ ?\bper\b ?/).test(usages)) usages = usages.replace(/ ?\bper\b ?/, "");
	for (var n = 1; n <= 2; n++) {
		for (var i = 1; i <= FieldNumbers.limfea; i++) {
			var featureFld = tDoc.getField("Limited Feature " + i);
			var usageFld = tDoc.getField("Limited Feature Max Usages " + i);
			var recoveryFld = tDoc.getField("Limited Feature Recovery " + i);
			if (n === 1 && featureFld.value.toLowerCase().indexOf(identifier.toLowerCase()) !== -1) { //if the feature is found
				if (UpdateOrReplace === "replace" || ((!recoveryFld.value || recoveryFld.value == recovery) && !isNaN(usageFld.value) && !isNaN(UpdateOrReplace) && !isNaN(usages))) {
					featureFld.value = identifier + additionaltxt;
					if (tooltip && featureFld.userName.indexOf(tooltip) === -1) featureFld.userName += ", " + tooltip;
					usageFld.setAction("Calculate", calculation);
					usageFld.submitName = calculation; //so it can be referenced later
					recoveryFld.value = recovery;
					if (!isNaN(usageFld.value) && !isNaN(UpdateOrReplace) && !isNaN(usages)) {
						usageFld.value += usages - Number(UpdateOrReplace);
					} else {
						usageFld.value = usages;
					}
				} else if ((featureFld.value.toLowerCase().indexOf(additionaltxt.toLowerCase()) !== -1 || UpdateOrReplace === "bonus") && !isNaN(usages)) {
					if (tooltip && featureFld.userName.indexOf(tooltip) === -1) featureFld.userName += ", " + tooltip;
					usageFld.value += usages - (!isNaN(UpdateOrReplace) ? Number(UpdateOrReplace) : 0);
				} else { //UpdateOrReplace == "update" || isNaN(usages)
					featureFld.value = identifier + additionaltxt;
					usageFld.setAction("Calculate", calculation);
					usageFld.submitName = calculation; //so it can be referenced later
					usageFld.value = usages;
					recoveryFld.value = recovery;
				}
				i = FieldNumbers.limfea + 1;
				n = 3;
			} else if (n === 2 && featureFld.value === "") { //if the feature is not found
				if (SslotsVisible && i > 5 && i < 9) continue; //don't add something to the bottom three rows on the first page if the spell slots are visible
				featureFld.value = identifier + additionaltxt;
				if (tooltip) featureFld.userName = "The feature \"" + identifier + "\" was gained from " + tooltip;
				usageFld.setAction("Calculate", calculation);
				usageFld.submitName = calculation; //so it can be referenced later
				usageFld.value = usages;
				recoveryFld.value = recovery;
				i = FieldNumbers.limfea + 1;
			}
		}
	}
};

// Remove a limited feature
function RemoveFeature(identifier, usages, additionaltxt, recovery, tooltip, UpdateOrReplace, Calc) {
	var theFlds = [
		"Limited Feature ",
		"Limited Feature Max Usages ",
		"Limited Feature Recovery ",
		"Limited Feature Used "
	];
	var EndFldsArray = [];
	for (var F = 0; F < theFlds.length; F++) {
		EndFldsArray.push(theFlds[F] + FieldNumbers.limfea);
	}
	for (var i = 1; i <= FieldNumbers.limfea; i++) {
		var FldsArray = [];
		for (var l = 0; l < theFlds.length; l++) {
			FldsArray.push(theFlds[l] + i);
		}
		var featureFld = tDoc.getField(FldsArray[0]);
		var usageFld = tDoc.getField(FldsArray[1]);
		if (featureFld.value.toLowerCase().indexOf(identifier.toLowerCase()) !== -1) {
			if (!usages || usageFld.value === usages || Calc || isNaN(usages)) {
				LimFeaDelete(i); //delete the limited feature at this row and move all the ones up below it
			} else {
				usageFld.value -= usages;
				if (tooltip && featureFld.userName.indexOf(tooltip) !== -1) featureFld.userName = featureFld.userName.replace(tooltip, "").replace(/, *$/, "").replace(/, , /g, ", ");
			}
			i = FieldNumbers.limfea + 1;
		}
	}
}

// >>>> Feat functions <<<< \\

// Make an array of all feat fields of that field number
function ReturnFeatFieldsArray(FldNmbr) {
	fldsArray = [
		"Feat Name " + FldNmbr,			// 0
		"Feat Note " + FldNmbr,			// 1
		"Feat Description " + FldNmbr	// 2
	];
	return fldsArray;
}

// Lookup the name of a Feat and if it exists in the FeatsList
function ParseFeat(input) {
	var found = "";
	var subFound = "";
	if (!input) return [found, subFound, []];

	input = removeDiacritics(input).toLowerCase();
	var foundLen = 0;
	var foundDat = 0;
	var subFoundLen = 0;
	var subFoundDat = 0;
	var subOptionArr = [];
	var isMatch, isMatchSub, tempDate, tempDateSub, tempNameLen;
	var varArr;

	// Scan string for all magic items
	for (var key in FeatsList) {
		var kObj = FeatsList[key];

		// test if the magic item or its source isn't excluded
		if (testSource(key, kObj, "featsExcl")) continue;

		isMatch = input.indexOf(kObj.name.toLowerCase()) !== -1;
		tempDate = sourceDate(kObj.source);
		subFoundLen = 0;
		subFoundDat = 0;
		isMatchSub = "";
		varArr = [];

		if (kObj.choices) {
			for (var i = 0; i < kObj.choices.length; i++) {
				var keySub = kObj.choices[i].toLowerCase();
				var sObj = kObj[keySub];
				if (!sObj || testSource(key + "-" + keySub, sObj, "featsExcl")) continue;
				varArr.push(kObj.choices[i]);
				var isMatchSub = false;
				if (sObj.name) {
					isMatchSub = input.indexOf(sObj.name.toLowerCase()) !== -1;
				} else if (isMatch) {
					isMatchSub = input.indexOf(keySub) !== -1;
				}
				if (isMatchSub) {
					// the choice matched, but only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source than the other choices
					tempDateSub = sObj.source ? sourceDate(sObj.source) : tempDate;
					tempNameLen = (sObj.name ? sObj.name : keySub).length
					if (tempNameLen < subFoundLen || (tempNameLen == subFoundLen && tempDateSub < subFoundDat)) continue;
					// we have a match for a choice, so set the values
					subFoundLen = tempNameLen;
					subFoundDat = tempDateSub;
					foundLen = kObj.name.length;
					foundDat = tempDate;
					found = key;
					subFound = keySub;
					subOptionArr = varArr;
				}
			}
		}
		if (!isMatch || subFoundLen) continue; // no match or sub already matched

		// only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source. This differs from the regExpSearch objects
		if (kObj.name.length < foundLen || (kObj.name.length == foundLen && tempDate < foundDat)) continue;

		// we have a match, set the values
		found = key;
		subFound = "";
		subOptionArr = varArr;
		foundLen = kObj.name.length
		foundDat = tempDate;
	}
	return [found, subFound, subOptionArr];
};

// Check all Feat fields and parse the once known into the global variable
function FindFeats() {
	CurrentFeats.known = [];
	CurrentFeats.choices = [];
	for (var i = 1; i <= FieldNumbers.feats; i++) {
		var parsedFeat = ParseFeat( What("Feat Name " + i) );
		CurrentFeats.known.push(parsedFeat[0]);
		CurrentFeats.choices.push(parsedFeat[1]);
	}
}

// Add the text and features of a Feat
function ApplyFeat(input, FldNmbr) {
	if (IsSetDropDowns || CurrentVars.manual.feats || !IsNotFeatMenu) return; // When just changing the dropdowns or feats are set to manual or this is a menu action, don't do anything
	var Fflds = ReturnFeatFieldsArray(FldNmbr);
	// Not called from a field? Then just set the field and let this function be called anew
	if ((!event.target || event.target.name !== Fflds[0]) && What(Fflds[0]) !== input) {
		Value(Fflds[0], input);
		return;
	};

	var parseResult = ParseFeat(input);
	var newFeat = parseResult[0];
	var newFeatVar = parseResult[1];
	var aFeat = FeatsList[newFeat];
	var aFeatVar = aFeat && newFeatVar ? aFeat[newFeatVar] : false;
	var ArrayNmbr = FldNmbr - 1;
	var oldFeat = CurrentFeats.known[ArrayNmbr];
	var oldFeatVar = CurrentFeats.choices[ArrayNmbr];
	var setFieldValueTo;
	var failedChoice = false;

	var doNotCommit = function(toSetVal) {
		if (thermoTxt) thermoM(thermoTxt, true); // Stop progress bar
		if (!IsNotImport) return;
		event.rc = false;
		if (isArray(event.target.page)) OpeningStatementVar = app.setTimeOut("tDoc.getField('" + event.target.name + ".1').setFocus();", 10);
	}

	// If no variant was found, but there is a choice, ask it now
	if (aFeat && aFeat.choices && !newFeatVar) {
		if (parseResult[2].length) {
			var selectFeatVar = false;
			if (parseResult[2].length == 1) {
				selectFeatVar = parseResult[2][0];
			} else if (aFeat.selfChoosing && typeof aFeat.selfChoosing == "function") {
				try {
					selectFeatVar = aFeat.selfChoosing();
				} catch (error) {
					var eText = "The function in the 'selfChoosing' attribute of '" + newFeat + "' produced an error! Please contact the author of the feat code to correct this issue:\n " + error;
					for (var e in error) eText += "\n " + e + ": " + error[e];
					console.println(eText);
					console.show();
				}
				selectFeatVar = selectFeatVar && typeof selectFeatVar == "string" && aFeat[selectFeatVar.toLowerCase()] ? selectFeatVar : false;
			}
			if (!newFeatVar && !IsNotImport) {
				failedChoice = true;
			} else {
				if (!selectFeatVar) selectFeatVar = AskUserOptions("Select " + aFeat.name + " Type", "The '" + aFeat.name + "' feat has several forms. Select which form you want to add to the sheet at this time.\n\nYou can change the selected form with the little square button in the feat line that this feat is in.", parseResult[2], "radio", true);
				newFeatVar = selectFeatVar.toLowerCase();
				aFeatVar = aFeat[newFeatVar];
				setFieldValueTo = aFeatVar.name ? aFeatVar.name : aFeat.name + " [" + selectFeatVar + "]";
			}
		} else if (!IsNotImport) {
			failedChoice = true;
		} else {
			app.alert({
				cTitle : "Error processing options for " + aFeat.name,
				cMsg : "The feat that you have selected, '" + aFeat.name + "' offers a choice for the form it comes in. Unfortunately, the sheet has run into an issue where there are no forms to choose from because of resources being excluded. Use the \"Source Material\" bookmark to correct this.\n\nThis could also be an issue with the imported script containing the feat not being written correctly. If so, please contact the author of that import script."
			});
			doNotCommit();
			return;
		}
	}

	// if there was a choice but none was selected for whatever reason (importing), do not apply anything and warn the user
	if (failedChoice) {
		Value(Fflds[2], 'ERROR, please reapply "' + aFeat.name + '" above.');
		if (!IsNotImport) {
			console.println("The feat '" + aFeat.name + "' requires you to make a selection of a sub-choice. However, because this feat was added during importing from another MPMB's Character Record Sheet, no pop-up dialog could be displayed to allow you to make a selection. Please reapply this feat to show the pop-up dialog and make a selection for its sub-choice.");
			console.show();
		}
		if (thermoTxt) thermoM(thermoTxt, true); // Stop progress bar
		event.target.setVal = "ERROR, please reapply: " + (aFeat.name.substr(0,2) + "\u200A" + aFeat.name.substr(2)).split(" ").join("\u200A ");
		return;
	}

	if (oldFeat === newFeat && oldFeatVar === newFeatVar) {
		if (setFieldValueTo) event.target.setVal = setFieldValueTo;
		return; // No changes were made
	}

	// Start progress bar
	var thermoTxt = thermoM("Applying feat...");
	thermoM(1/6); // Increment the progress bar

	// Create the object to use (merge parent and choice)
	if (!newFeatVar) {
		var theFeat = aFeat;
		aFeatVar = "";
	} else {
		var theFeat = {
			name : aFeatVar.name ? aFeatVar.name : setFieldValueTo ? setFieldValueTo : input
		}
		var FeatAttr = ["source", "description", "descriptionFull", "calculate", "prerequisite", "prereqeval"];
		for (var a = 0; a < FeatAttr.length; a++) {
			var aKey = FeatAttr[a];
			if (aFeatVar[aKey]) {
				theFeat[aKey] = aFeatVar[aKey];
			} else if (aFeat[aKey]) {
				theFeat[aKey] = aFeat[aKey];
			}
		}
	}

	// Check if the feat doesn't already exist (with the same choice, if any)
	if (IsNotImport && !ignoreDuplicates && aFeat) {
		// count occurrence of parent & choice
		var parentDupl = 0;
		var choiceDupl = 0;
		for (var i = 0; i < CurrentFeats.known.length; i++) {
			if (i == ArrayNmbr) continue;
			if (CurrentFeats.known[i] == newFeat) {
				parentDupl++;
				if (newFeatVar && CurrentFeats.choices[i] == newFeatVar) choiceDupl++;
			}
		}
		if ((parentDupl && !aFeat.allowDuplicates) || (choiceDupl && !aFeatVar.allowDuplicates)) {
			var stopFunct = app.alert({
				cTitle : "Can only have one instance of a feat",
				cMsg : "The feat that you have selected, '" + (choiceDupl ? theFeat.name : aFeat.name) + "' is already present on the sheet and you can't have duplicates of it." + (newFeatVar && !choiceDupl ? "\n\nHowever, as this is a composite feat that exists in different forms, and you don't have '" + theFeat.name + "' yet, the sheet can allow you to add it regardless of the rules. Do you want to continue adding this feat?" : ""),
				nIcon : !newFeatVar || choiceDupl ? 0 : 1,
				nType : !newFeatVar || choiceDupl ? 0 : 2
			});
			if (stopFunct === 1 || stopFunct === 3) {
				doNotCommit();
				return;
			}
		}
	}

	// Before stopping the calculations, first test if the feat has a prerequisite and if it meets that
	if (IsNotImport && IsNotReset && theFeat && theFeat.prereqeval && !ignorePrereqs && event.target && event.target.name == Fflds[0]) {
		try {
			if (typeof theFeat.prereqeval == 'string') {
				var meetsPrereq = eval(theFeat.prereqeval);
			} else if (typeof theFeat.prereqeval == 'function') {
				var gatherVars = gatherPrereqevalVars();
				gatherVars.choice = newFeatVar;
				var meetsPrereq = theFeat.prereqeval(gatherVars);
			}
		} catch (error) {
			var eText = "The 'prereqeval' attribute for the feat '" + theFeat.name + "' produces an error and is subsequently ignored. If this is one of the built-in feats, please contact morepurplemorebetter using one of the contact bookmarks to let him know about this bug. Please do not forget to list the version number of the sheet, name and version of the software you are using, and the name of the feat.\nThe sheet reports the error as\n " + error;
			for (var e in error) eText += "\n " + e + ": " + error[e];
			console.println(eText);
			console.show();
			var meetsPrereq = true;
		};
		if (!meetsPrereq) {
			thermoTxt = thermoM("The feat '" + theFeat.name + "' has prerequisites that have not been met...", false); //change the progress dialog text
			thermoM(1/5); //increment the progress dialog's progress

			var askUserFeat = app.alert({
				cTitle : "The prerequisites for '" + theFeat.name + "' have not been met",
				cMsg : "The feat that you have selected, '" + theFeat.name + "' has a prerequisite listed" + (theFeat.prerequisite ? ' as: \n\t"' + theFeat.prerequisite + '"' : ".") + "\n\nYour character does not meet this requirement. Are you sure you want to apply this feat?",
				nIcon : 1,
				nType : 2
			});

			if (askUserFeat !== 4) { // If "NO" was pressed
				doNotCommit();
				return;
			}
		};
	};

	// if a feat variant was chosen, make sure this field will show that selection, now that it can't be cancelled anymore due to not meeting a prerequisite
	if (setFieldValueTo) event.target.setVal = setFieldValueTo;

	calcStop(); // Now stop the calculations

	// Remove previous feat at the same field
	if (oldFeat !== newFeat || oldFeatVar !== newFeatVar) {
		// Remove everything from the description field, value, calculation, tooltip, submitname
		tDoc.getField(Fflds[2]).setAction("Calculate", "");
		Value(Fflds[2], "", "", "");
		if (oldFeat) {
			if (oldFeat !== newFeat) {
				// Remove its attributes
				var Fea = ApplyFeatureAttributes(
					"feat", // type
					oldFeat, // fObjName
					[CurrentFeats.level, 0, false], // lvlA [old-level, new-level, force-apply]
					[oldFeatVar, "", false], // choiceA [old-choice, new-choice, "only"|"change"]
					false // forceNonCurrent
				);
			}
			// remove the source from the notes field
			var oldSource = oldFeatVar && FeatsList[oldFeat][oldFeatVar].source ? FeatsList[oldFeat][oldFeatVar] : FeatsList[oldFeat];
			var sourceStringOld = stringSource(oldSource, "first", "[", "]");
			if (sourceStringOld) RemoveString(Fflds[1], sourceStringOld);
		}
	}

	// Update the CurrentFeats.known variable
	CurrentFeats.known[ArrayNmbr] = newFeat;
	CurrentFeats.choices[ArrayNmbr] = newFeatVar;

	// Do something if there is a new feat to apply
	if (aFeat) {
		thermoTxt = thermoM("Applying '" + theFeat.name + "' feat...", false); //change the progress dialog text
		thermoM(1/3); //increment the progress dialog's progress

		// Set the field description/calculation
		if (theFeat.calculate) {
			var theCalc = What("Unit System") === "imperial" ? theFeat.calculate : ConvertToMetric(theFeat.calculate, 0.5);
			if (typePF) theCalc = theCalc.replace("\n", " ");
			tDoc.getField(Fflds[2]).setAction("Calculate", theCalc);
		}

		// Create the tooltip
		var tooltipStr = toUni(theFeat.name);
		if (theFeat.prerequisite) tooltipStr += "\n \u2022 Prerequisite: " + theFeat.prerequisite;
		tooltipStr += stringSource(theFeat, "full,page", "\n \u2022 Source: ", ".");
		if (theFeat.descriptionFull) tooltipStr += isArray(theFeat.descriptionFull) ? desc(theFeat.descriptionFull).replace(/^\n   /i, "\n\n") : "\n\n" + theFeat.descriptionFull;

		// Get the description
		var theDesc = !theFeat.description ? "" : What("Unit System") === "imperial" ? theFeat.description : ConvertToMetric(theFeat.description, 0.5);
		if (typePF) theDesc = theDesc.replace("\n", " ");
		// Set it all to the appropriate field
		Value(Fflds[2], theDesc, tooltipStr, theFeat.calculate ? theCalc : "");

		// Set the notes field
		var sourceString = stringSource(theFeat, "first", "[", "]");
		if (sourceString) AddString(Fflds[1], sourceString, " ");

		// Apply the rest of its attributes
		var justChange = oldFeat == newFeat && oldFeatVar !== newFeatVar;
		var Fea = ApplyFeatureAttributes(
			"feat", // type
			newFeat, // fObjName
			[justChange ? CurrentFeats.level : 0, CurrentFeats.level, justChange], // lvlA [old-level, new-level, force-apply]
			justChange ? [oldFeatVar, newFeatVar, "change"] : ["", newFeatVar, false], // choiceA [old-choice, new-choice, "only"|"change"]
			false // forceNonCurrent
		);
	}

	thermoM(thermoTxt, true); // Stop progress bar
};

function SetFeatsdropdown(forceTooltips) {
	var ArrayDing = [""];
	var tempString = "Type in the name of the feat (or select it from the drop-down menu) and its text and features will be filled out automatically, provided it is a recognized feat.\n\nAbility scores will not be automatically altered other than their tool tips (mouseover texts) and in the Scores dialog.";
	for (var key in FeatsList) {
		if (testSource(key, FeatsList[key], "featsExcl")) continue;
		var feaNm = FeatsList[key].name;
		if (ArrayDing.indexOf(feaNm) === -1) ArrayDing.push(feaNm);
	}
	ArrayDing.sort();

	var ArrayDingSource = ArrayDing.toSource();
	var applyItems = tDoc.getField("Feat Name 1").submitName !== ArrayDingSource;
	if (applyItems) tDoc.getField("Feat Name 1").submitName = ArrayDingSource;

	for (var i = 1; i <= FieldNumbers.feats; i++) {
		var theFeatFld = "Feat Name " + i;
		var theFeati = What(theFeatFld);
		if (applyItems) {
			tDoc.getField(theFeatFld).setItems(ArrayDing);
			Value(theFeatFld, theFeati, tempString);
		} else if (forceTooltips) {
			AddTooltip(theFeatFld, tempString);
		}
	}
}

//Make menu for the button on each Feat line and parse it to Menus.feats
function MakeFeatMenu_FeatOptions(MenuSelection, itemNmbr) {
	var featMenu = [];
	if (!itemNmbr) itemNmbr = parseFloat(event.target.name.slice(-2));
	var ArrayNmbr = itemNmbr - 1;
	var Fflds = ReturnFeatFieldsArray(itemNmbr);
	var theField = What(Fflds[0]) != "";
	var noUp = itemNmbr === 1;
	var noDown = itemNmbr === FieldNumbers.feats;
	var upToOtherPage = itemNmbr !== (FieldNumbers.featsD + 1) ? "" : typePF ? " (to third page)" : " (to second page)";
	var downToOtherPage = itemNmbr === FieldNumbers.featsD ? " (to overflow page)" : "";
	var aFeat, keyFeat = CurrentFeats.known[ArrayNmbr];

	if (!MenuSelection || MenuSelection === "justMenu") {
		// a function to add the other items
		var menuLVL1 = function (array) {
			for (i = 0; i < array.length; i++) {
				featMenu.push({
					cName : array[i][0],
					cReturn : "feat#" + array[i][1],
					bEnabled : array[i][2] !== undefined ? array[i][2] : true
				});
			}
		};
		// if this feat allows for a choice, add that option as the first thing in the menu
		if (keyFeat) {
			aFeat = FeatsList[keyFeat];
			if (aFeat.choices) {
				var aFeatOpts = aFeat.choices;
				var choiceMenu = {
					cName : "Change type of " + aFeat.name,
					oSubMenu : []
				};
				for (var i = 0; i < aFeatOpts.length; i++) {
					var aCh = aFeatOpts[i];
					var aChL = aCh.toLowerCase();
					if (!aFeat[aChL] || testSource(keyFeat + "-" + aChL, aFeat[aChL], "featsExcl")) continue;
					choiceMenu.oSubMenu.push({
						cName : aCh + stringSource(aFeat[aChL].source ? aFeat[aChL] : aFeat, "first,abbr", "\t   [", "]"),
						cReturn : "feat#choice#" + aChL,
						bMarked : CurrentFeats.choices[ArrayNmbr] == aChL
					});
				}
				if (choiceMenu.oSubMenu.length > 1) featMenu.push(choiceMenu);
			}
			// an option to read the whole description
			if (Who(Fflds[2])) menuLVL1([["Show full text of " + aFeat.name, "popup"]]);
			// add a separator if we have any items in the menu so far
			if (featMenu.length) featMenu.push({cName : "-"});
		}
		menuLVL1([
			["Move up" + upToOtherPage, "up", !noUp],
			["Move down" + downToOtherPage, "down", !noDown],
			["-", "-"],
			["Insert empty feat", "insert", noDown || !theField ? false : true],
			["Delete feat", "delete"],
			["Clear feat", "clear"],
		]);
		Menus.feats = featMenu;
		if (MenuSelection == "justMenu") return;
	}
	MenuSelection = getMenu("feats");
	if (!MenuSelection || MenuSelection[0] == "nothing" || MenuSelection[0] != "feat") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Apply feat menu option...");

	switch (MenuSelection[1]) {
		case "popup" :
			ShowDialog("Feat's full description", Who(Fflds[2]));
			break;
		case "choice" :
			aFeat = FeatsList[keyFeat];
			if (MenuSelection[2] && aFeat && aFeat[MenuSelection[2]] && CurrentFeats.choices[ArrayNmbr] !== MenuSelection[2]) {
				var aFeatVar = aFeat[MenuSelection[2]];
				if (aFeatVar.name) {
					Value(Fflds[0], aFeatVar.name);
				} else {
					for (var i = 0; i < aFeat.choices.length; i++) {
						if (aFeat.choices[i].toLowerCase() == MenuSelection[2]) {
							Value(Fflds[0], aFeat.name + " [" + aFeat.choices[i] + "]");
							break;
						}
					}
				}
			}
			break;
		case "up" :
			if (noUp) return;
		case "down" :
			if (MenuSelection[1] == "down" && noDown) return;
			calcStop();
			IsNotFeatMenu = false;
			thermoTxt = thermoM("Moving the feat " + MenuSelection[1] + "...", false);
			// Get the other fields
			var otherNmbr = MenuSelection[1] == "down" ? itemNmbr + 1 : itemNmbr - 1;
			var FfldsO = ReturnFeatFieldsArray(otherNmbr);
			// Now swap all the fields
			for (var i = 0; i < Fflds.length; i++) {
				var exclObj = i != 0 ? {} : { userName : true, submitName : true, noCalc : true };
				copyField(Fflds[i], FfldsO[i], exclObj, true);
				thermoM(i/Fflds.length); //increment the progress dialog's progress
			}
			// Correct the entry in the CurrentMagicItems.known array
			if (!CurrentVars.manual.feats) {
				var thisKnown = CurrentFeats.known[itemNmbr - 1];
				var thisChoice = CurrentFeats.choices[itemNmbr - 1];
				CurrentFeats.known[itemNmbr - 1] = CurrentFeats.known[otherNmbr - 1];
				CurrentFeats.known[otherNmbr - 1] = thisKnown;
				CurrentFeats.choices[itemNmbr - 1] = CurrentFeats.choices[otherNmbr - 1];
				CurrentFeats.choices[otherNmbr - 1] = thisChoice;
			}
			IsNotFeatMenu = true;
			break;
		case "insert" :
			FeatInsert(itemNmbr);
			break;
		case "delete" :
			FeatDelete(itemNmbr);
			break;
		case "clear" :
			thermoTxt = thermoM("Clearing feat...", false);
			FeatClear(itemNmbr, true);
			break;
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

//insert a feat at the position wanted
function FeatInsert(itemNmbr) {
	// Stop the function if the selected slot is already empty
	if (!What("Feat Name " + itemNmbr)) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Inserting empty feat...");
	calcStop();
	IsNotFeatMenu = false;

	// Look for the first empty slot below the slot
	var endslot = false;
	for (var i = itemNmbr + 1; i <= FieldNumbers.feats; i++) {
		if (What("Feat Name " + i) === "") {
			endslot = i;
			break;
		}
	}

	//only continue if an empty slot was found in the fields
	if (endslot) {
		// Cycle through the slots starting with the found empty one and add the values of the one above
		for (var f = endslot; f > itemNmbr; f--) {
			// Copy all the fields
			var FfldsFrom = ReturnFeatFieldsArray(f - 1);
			var FfldsTo = ReturnFeatFieldsArray(f);
			for (var i = 0; i < FfldsFrom.length - 1; i++) {
				var exclObj = i != 0 ? {} : { userName : true, submitName : true, noCalc : true };
				copyField(FfldsFrom[i], FfldsTo[i], exclObj);
			}
			// Correct the known array & choices arrays
			if (!CurrentVars.manual.feats) {
				CurrentFeats.known[f - 1] = CurrentFeats.known[f - 2];
				CurrentFeats.choices[f - 1] = CurrentFeats.choices[f - 2];
			}
		}

		// Empty the selected slot
		FeatClear(itemNmbr)
	}

	IsNotFeatMenu = true;
	thermoM(thermoTxt, true); // Stop progress bar
}

//delete a feat at the position wanted and move the rest up
function FeatDelete(itemNmbr) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Deleting feat...");
	calcStop();

	var maxNmbr = FieldNumbers.feats;
	// Stop at the end of the first page if last one on first page is empty
	if (itemNmbr <= FieldNumbers.featsD && !What("Feat Name " + FieldNumbers.featsD)) maxItem = FieldNumbers.featsD;

	// First clear the current feat so that it's automation is run
	FeatClear(itemNmbr, true);
	IsNotFeatMenu = false;

	// Make every line identical to the one below, starting with the selected line
	for (var f = itemNmbr; f < maxItem; f++) {
		// Copy all the fields
		var FfldsFrom = ReturnFeatFieldsArray(f + 1);
		var FfldsTo = ReturnFeatFieldsArray(f);
		for (var i = 0; i < FfldsFrom.length - 1; i++) {
			var exclObj = i != 0 ? {} : { userName : true, submitName : true, noCalc : true };
			copyField(FfldsFrom[i], FfldsTo[i], exclObj);
		}
		// Correct the known array & choices arrays
		if (!CurrentVars.manual.feats) {
			CurrentFeats.known[f - 1] = CurrentFeats.known[f];
			CurrentFeats.choices[f - 1] = CurrentFeats.choices[f];
		}
	}

	// Clear the final line
	FeatClear(maxItem);

	IsNotFeatMenu = true;
	thermoM(thermoTxt, true); // Stop progress bar
}

// Add a feat to the second/third page or overflow page
function AddFeat(sFeat) {
	if (!sFeat) return;
	// Check if this feat is recognized and if so, quit if it already exists
	var aParsedFeat = ParseFeat(sFeat);
	if (aParsedFeat[0] && CurrentFeats.known.indexOf(aParsedFeat[0]) !== -1 && !FeatsList[aParsedFeat[0]].allowDuplicates && !FeatsList[aParsedFeat[0]].choices) {
		return;
	} else if (aParsedFeat[0]) {
		for (var i = 0; i < CurrentFeats.known.length; i++) {
			if (CurrentFeats.known[i] === aParsedFeat[0] && CurrentFeats.choices[i] === aParsedFeat[1]) return;
		}
	}
	// Then check if the string isn't already in one of the feat name fields and if not, add it
	var sFeatLC = sFeat.toLowerCase();
	var RegExFeat = RegExp("\\b" + sFeat.RegEscape() + "\\b", "i");
	for (var n = 1; n <= 2; n++) {
		for (var i = 1; i <= FieldNumbers.feats; i++) {
			var sFldNm = "Feat Name " + i;
			var sCurFeat = What(sFldNm);
			if (n === 1 && (RegExFeat.test(sCurFeat) || sCurFeat.toLowerCase() === sFeatLC)) {
				return; // the feat already exists
			} else if (n === 2 && sCurFeat === "") {
				// if the next empty field on the overflow page and the overflow page is hidden, show it
				if (i > FieldNumbers.featsD && !tDoc.getField(BookMarkList["Overflow sheet"])) DoTemplate("ASoverflow", "Add");
				Value(sFldNm, sFeat);
				return; // feat was successfully added
			}
		}
	}
}

// Remove a feat from the second/third page or overflow page
function RemoveFeat(sFeat) {
	// First try if this is a recognizable feat and remove that
	var aParsedFeat = ParseFeat(sFeat);
	var iFeatKnwn = CurrentFeats.known.indexOf(aParsedFeat[0]);
	if (aParsedFeat[0] && iFeatKnwn !== -1) {
		if (!FeatsList[aParsedFeat[0]].allowDuplicates && !FeatsList[aParsedFeat[0]].choices) {
			FeatClear(iFeatKnwn + 1, true);
			return;
		} else {
			for (var i = 0; i < CurrentFeats.known.length; i++) {
				if (CurrentFeats.known[i] === aParsedFeat[0] && CurrentFeats.choices[i] === aParsedFeat[1]) {
					FeatClear(i + 1, true);
					return;
				}
			}
		}
	}
	// Not recognized, so try it the hard way
	var sFeatLC = sFeat.toLowerCase();
	var RegExFeat = RegExp("\\b" + sFeat.RegEscape() + "\\b", "i");
	for (var i = 1; i <= FieldNumbers.feats; i++) {
		var sFldNm = "Feat Name " + i;
		var sCurFeat = What(sFldNm);
		if (RegExFeat.test(sCurFeat) || sCurFeat.toLowerCase() === sFeatLC) {
			FeatClear(i, true);
			break;
		}
	}
}

// Clear a feat at the position given
function FeatClear(itemNmbr, doAutomation) {
	var Fflds = ReturnFeatFieldsArray(itemNmbr);
	if (doAutomation && !CurrentVars.manual.feats && CurrentFeats.known[itemNmbr - 1]) {
		IsNotFeatMenu = true;
		Value("Feat Name " + itemNmbr, "");
		tDoc.resetForm(Fflds[1]);
	} else {
		if (!CurrentVars.manual.feats) CurrentFeats.known[itemNmbr - 1] = "";
		AddTooltip(Fflds[2], "", "");
		tDoc.getField(Fflds[2]).setAction("Calculate", "");
		if (IsNotReset) tDoc.resetForm(Fflds);
	}
}

//this is now an empty function so that legacy code doesn't produce an error
function ChangeSpeed(input) {
	console.println("ChangeSpeed(" + input + ") was called, but this function is no longer supported since v12.998 of the sheet. Instead, a new, more comprehensive syntax for setting speed is available from v12.998 onwards.");
	console.show();
};

function ResetFeaSR() {
	for (var z = 1; z <= FieldNumbers.limfea; z++) {
		var recoveryFld = What("Limited Feature Recovery " + z).toLowerCase();
		if (recoveryFld.indexOf("short rest") !== -1 || recoveryFld.indexOf("sr") !== -1) {
			resetForm(["Limited Feature Used " + z]);
		}
	}
}

function ResetFeaLR() {
	calcStop();
	for (var z = 1; z <= FieldNumbers.limfea; z++) {
		var recoveryFld = What("Limited Feature Recovery " + z).toLowerCase();
		if (recoveryFld.indexOf("short rest") !== -1 || recoveryFld.indexOf("sr") !== -1 || recoveryFld.indexOf("long rest") !== -1 || recoveryFld.indexOf("lr") !== -1) {
			resetForm(["Limited Feature Used " + z]);
		}
	}
	var SpellSlotsReset = [];
	var SSfrontA = What("Template.extras.SSfront").split(",")[1];
	if (SSfrontA) SpellSlotsReset.push(SSfrontA + "SpellSlots.Checkboxes");
	if (!typePF) SpellSlotsReset.push("SpellSlots.Checkboxes");
	if (!typePF && SSfrontA) SpellSlotsReset.push(SSfrontA + "SpellSlots2.Checkboxes");
	if (SpellSlotsReset.length > 0) tDoc.resetForm(SpellSlotsReset);
}

function ResetFeaDawn() {
	for (var z = 1; z <= FieldNumbers.limfea; z++) {
		var recoveryFld = What("Limited Feature Recovery " + z).toLowerCase();
		if (recoveryFld.indexOf("dawn") !== -1 || recoveryFld.indexOf("day") !== -1) {
			resetForm(["Limited Feature Used " + z]);
		}
	}
}

function HealItNow() {
	calcStop();
	var QI = !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);

	var fields = [
		"HP Current",
		"HP Temp",
		"Death Save Fail1",
		"Death Save Fail2",
		"Death Save Fail3",
		"Death Save Success1",
		"Death Save Success2",
		"Death Save Success3"
	];
	var CompFields = [
		prefix + "Comp.Use.HP.Current",
		prefix + "Comp.Use.HP.Temp",
		prefix + "Comp.Use.DeathSave"
	];
	tDoc.resetForm(QI ? fields : CompFields);

	// now heal half the HD, starting with the highest (HD1), and using remaining leftovers
	if (QI) {
		var HD1 = Number(What("HD1 Used"));
		var HD2 = Number(What("HD2 Used"));
		var HD3 = Number(What("HD3 Used"));
		var toHeal = Math.max(1, Math.floor((Number(What("HD1 Level")) + Number(What("HD2 Level")) + Number(What("HD3 Level"))) / 2));

		//now go through the HD and recover theMenu
		if (toHeal > 0 && HD1) {
			Value("HD1 Used", HD1 - toHeal <= 0 ? "" : Math.max(1, HD1 - toHeal));
			toHeal -= HD1;
		};
		if (toHeal > 0 && HD2) {
			Value("HD2 Used", HD2 - toHeal <= 0 ? "" : Math.max(1, HD2 - toHeal));
			toHeal -= HD2;
		};
		if (toHeal > 0 && HD3) {
			Value("HD3 Used", HD3 - toHeal <= 0 ? "" : Math.max(1, HD3 - toHeal));
			toHeal -= HD3;
		};
	} else {
		var toHeal = Math.max(1, Math.floor(What(prefix + "Comp.Use.HD.Level") / 2));
		var HD1 = Number(What(prefix + "Comp.Use.HD.Used"));

		if (HD1 - toHeal <= 0) {
			Value(prefix + "Comp.Use.HD.Used", "");
		} else if (HD1 - toHeal > 0) {
			Value(prefix + "Comp.Use.HD.Used", HD1 - toHeal);
		}
	}
};

//calculate the encumbrance (field calculation)
function CalcEncumbrance() {
	var Str = What("Str"), result = "";
	var Size = What("Size Category");
	Size = Size ? Size : 1;
	var CarMult = Math.max(What("Carrying Capacity Multiplier"), 0);
	var decSep = What("Decimal Separator");
	var FldName = event.target.name;
	var Mult1 = FldName.indexOf("Push") !== -1 || FldName.indexOf("Carrying Capacity") !== -1 ? 15 : FldName.indexOf("Heavily") !== -1 ? 10 : 5;
	var Mult2 = FldName.indexOf("Push") !== -1 ? 30 : FldName.indexOf("Heavily") !== -1 ? 15 : 10;
	var UnitSystem = What("Unit System");
	if (UnitSystem === "imperial") {
		var Unit = " lb";
		var UnitMult = 1;
		var pushSep = " - ";
	} else if (UnitSystem === "metric") {
		var Unit = " kg";
		var UnitMult = UnitsList.metric.mass;
		var pushSep = "-";
	}

	var BasicMult = Number(Size) * Number(CarMult);
	var TotalMult = Number(Str) * Number(Size) * Number(CarMult);
	if (CarMult === 0 || (!Str && FldName.indexOf("Text") === -1)) {
		result = "";
	} else if (FldName.indexOf("Text") !== -1 && FldName.indexOf("Push") !== -1) {
		result = RoundTo((BasicMult * Mult1 * UnitMult), 0.1) + pushSep + RoundTo((BasicMult * Mult2 * UnitMult), 0.1);
	} else if (FldName.indexOf("Text") !== -1) {
		result = RoundTo((BasicMult * Mult1 * UnitMult), 0.1);
	} else if (FldName.indexOf("Carrying Capacity") !== -1) {
		result = Math.floor(TotalMult * Mult1 * UnitMult) + Unit;
	} else {
		result = Math.floor(1 + TotalMult * Mult1 * UnitMult) + " - " + (!typePF ? "\n" : "") + Math.floor(TotalMult * Mult2 * UnitMult) + Unit;
	}
	if (decSep === "comma" && result) {
		result = "." + result;
		result = result.replace(/\./g, ",");
		result = result.substring(1);
	}
	event.value = result;
}

function ParseClassFeature(theClass, theFeature, FeaLvl, ForceOld, SubChoice, Fea, ForceFeaOld) {
	// First make sure we know where the feature comes from (if it exists in both class and subclass, use subclass, unless ForceOld is true)
	var aSubClass = classes.known[theClass].subclass;
	var FeaList = ClassList[theClass].features[theFeature] && (ForceOld || !aSubClass || !ClassSubList[aSubClass].features[theFeature]) ? 'ClassList' : ClassSubList[aSubClass].features[theFeature] ? 'ClassSubList' : false;
	if (!FeaList) return ["", ""];

	var FeaKey = FeaList == 'ClassList' ? ClassList[theClass].features[theFeature] : ClassSubList[aSubClass].features[theFeature];
	var old = (ForceOld || ForceFeaOld) && Fea ? "Old" : "";
	if (old) Fea.source = Fea.sourceOld;
	var FeaClass = FeaList == 'ClassSubList' && CurrentClasses[theClass].subname ? CurrentClasses[theClass].subname : CurrentClasses[theClass].name;
	if (!Fea) Fea = GetLevelFeatures(FeaKey, FeaLvl, SubChoice, "", "");

	if (!Fea.UseName) return ["", ""]; // return empty strings if there is no name

	var FeaSource = stringSource(Fea, "first,abbr", ", ");
	var FeaRef = " (" + FeaClass + " " + FeaKey.minlevel + FeaSource + ")";
	var FeaUse = Fea["Use" + old] + (Fea["Use" + old] && !isNaN(Fea["Use" + old]) ? "\xD7 per " : "") + Fea["Recov" + old] + (Fea["AltRecov" + old] ? " or " + Fea["AltRecov" + old] : "");
	var FeaPost = "";
	if (Fea["Add" + old] && FeaUse) {
		FeaPost = " [" + Fea["Add" + old] + ", " + FeaUse + "]";
	} else if (Fea["Add" + old]) {
		FeaPost = " [" + Fea["Add" + old] + "]";
	} else if (FeaUse) {
		FeaPost = " [" + FeaUse + "]";
	}

	var FeaName = SubChoice && FeaKey[SubChoice] ? FeaKey[SubChoice].name : FeaKey.name;
	var FeaFirstLine = "\u25C6 " + FeaName + FeaRef;
	var FeaDescr = Fea["Descr" + old];
	if (isArray(FeaDescr)) FeaDescr = desc(FeaDescr);
	if (What("Unit System") == "metric") {
		FeaPost = ConvertToMetric(FeaPost, 0.5);
		FeaDescr = ConvertToMetric(FeaDescr, 0.5);
	}
	var FeaOtherLines = FeaPost + FeaDescr;

	return [FeaFirstLine + (Fea.extFirst ? FeaPost : ""), "\r" + FeaFirstLine + FeaOtherLines, FeaFirstLine];
};

function ParseClassFeatureExtra(theClass, theFeature, extraChoice, Fea, ForceOld, ForceExtraname) {
	var clObj = typeof theClass == "string" ? CurrentClasses[theClass].features[theFeature] : theClass;
	var FeaKey = clObj && clObj[extraChoice.toLowerCase()] ? clObj[extraChoice.toLowerCase()] : false;
	if (!FeaKey || !FeaKey.name) return ["", ""];
	var old = ForceOld ? "Old" : "";
	if (old) Fea.source = Fea.sourceOld;

	var extraNm = FeaKey.extraname ? FeaKey.extraname : ForceExtraname ? ForceExtraname : clObj.extraname ? clObj.extraname : clObj.name;
	var FeaRef = " (" + extraNm + stringSource(Fea, "first,abbr", ", ") + ")";
	var FeaUse = Fea["Use" + old] + (Fea["Use" + old] && !isNaN(Fea["Use" + old]) ? "\xD7 per " : "") + Fea["Recov" + old] + (Fea["AltRecov" + old] ? " or " + Fea["AltRecov" + old] : "");
	var FeaPost = "";
	if (Fea["Add" + old] && FeaUse) {
		FeaPost = " [" + Fea["Add" + old] + ", " + FeaUse + "]";
	} else if (Fea["Add" + old]) {
		FeaPost = " [" + Fea["Add" + old] + "]";
	} else if (FeaUse) {
		FeaPost = " [" + FeaUse + "]";
	};

	var FeaFirstLine = "\u25C6 " + FeaKey.name + FeaRef;
	var FeaDescr = Fea["Descr" + old];
	if (isArray(FeaDescr)) FeaDescr = desc(FeaDescr);
	if (What("Unit System") == "metric") {
		FeaPost = ConvertToMetric(FeaPost, 0.5);
		FeaDescr = ConvertToMetric(FeaDescr, 0.5);
	}
	var FeaOtherLines = FeaPost + FeaDescr;

	return [FeaFirstLine + (ForceOld ? "" : FeaPost), "\r" + FeaFirstLine + FeaOtherLines, FeaFirstLine];
};

//change all the level-variables gained from classes and races
function UpdateLevelFeatures(Typeswitch, newLvlForce) {
	if (!IsNotReset) return; //stop this function on a reset

	// initialise some variables
	Typeswitch = Typeswitch === undefined ? "all" : Typeswitch;
	var thermoTxt, Fea, feaA;
	var curLvl = newLvlForce !== undefined ? newLvlForce : What("Character Level") ? Number(What("Character Level")) : 1;

	// make sure the proficiency bonus is set correctly
	ProfBonus('Proficiency Bonus', newLvlForce);

	// Start progress bar and stop calculations
	thermoTxt = thermoM("Updating level-dependent features...");
	calcStop();
	thermoM(1/8); //increment the progress dialog's progress

	// apply creature level-dependent features on companion pages (don't compare level, because the total level can stay the same while class levels change)
	if ((/companion|creature|all|notclass/i).test(Typeswitch) && isTemplVis('AScomp')) {
		var AScompA = What('Template.extras.AScomp').split(',');
		for (var a = 1; a < AScompA.length; a++) {
			var prefix = AScompA[a];
			var aComp = CurrentCompRace[AScompA[a]];
	
			//increment the progress dialog's progress
			thermoM(a/AScompA.length);

			// Do stuff only if the companion is from the CreatureList, as the RaceList will be made for the main character
			if (aComp.typeFound !== "creature") continue;

			//update the progress dialog's text
			var compDispName = What(prefix + "Comp.Desc.Name");
			if (!compDispName) compDispName = aComp.name;
			thermoTxt = thermoM("Updating " + compDispName + " level-dependent features...", false);

			UpdateCompLevelFeatures(prefix, aComp);
		}
	}

	// apply race level changes
	var oldRaceLvl = CurrentRace.level;
	var newRaceLvl = curLvl;
	if (CurrentRace.known && (/race|all|notclass/i).test(Typeswitch) && newRaceLvl != oldRaceLvl) {
		thermoTxt = thermoM("Updating " + CurrentRace.name + " features...", false);
		thermoM(3/8); //increment the progress dialog's progress
		// do the CurrentRace object itself
		Fea = ApplyFeatureAttributes(
			"race", // type
			[CurrentRace.known, CurrentRace.known], // fObjName [aParent, fObjName]
			[oldRaceLvl, newRaceLvl, false], // lvlA [old-level, new-level, force-apply]
			false, // choiceA [old-choice, new-choice, "only"|"change"]
			false // forceNonCurrent
		);
		thermoM(5/8); //increment the progress dialog's progress
		// iterate through the racial features and apply/update them
		if (CurrentRace.features) {
			feaA = [];
			for (var key in CurrentRace.features) feaA.push(key);
			if (oldRaceLvl > newRaceLvl) feaA.reverse(); // when removing, loop through them backwards
			for (var f = 0; f < feaA.length; f++) {
				var prop = feaA[f]
				// --- backwards compatibility --- //
				// set the name and limfeaname from the depreciated tooltip attribute
				var propFea = CurrentRace.features[prop];
				if (propFea.tooltip && !propFea.limfeaname) {
					propFea.limfeaname = propFea.name;
					propFea.name = propFea.tooltip.replace(/^ *\(|\)$/g, '');
				}

				try {
					Fea = ApplyFeatureAttributes(
						"race", // type
						[CurrentRace.known, prop], // fObjName [aParent, fObjName]
						[oldRaceLvl, newRaceLvl, false], // lvlA [old-level, new-level, force-apply]
						false, // choiceA [old-choice, new-choice, "only"|"change"]
						false // forceNonCurrent
					);
				} catch (error) {
					var eText = 'The "' + propFea.name + '" feature from the "' + CurrentRace.name + '" race produced an error! Please contact the author of the feature to correct this issue:\n ' + error;
					for (var e in error) eText += "\n " + e + ": " + error[e];
					console.println(eText);
					console.show();
				}
			}
		}
		// update the racial level
		CurrentRace.level = newRaceLvl;
		if (CurrentSpells[CurrentRace.known]) CurrentSpells[CurrentRace.known].level = newRaceLvl;
	}

	// apply feat level changes
	var oldFeatLvl = CurrentFeats.level;
	var newFeatLvl = curLvl;
	if ((/feat|all|notclass/i).test(Typeswitch) && oldFeatLvl != newFeatLvl) {
		for (var f = 0; f < CurrentFeats.known.length; f++) {
			var aFeat = CurrentFeats.known[f];
			var aFeatVar = CurrentFeats.choices[f];
			var theFeat = FeatsList[aFeat];
			if (!theFeat) continue;

			thermoTxt = thermoM("Updating " + theFeat.name + " features...", false);
			thermoM((f+1)/CurrentFeats.known.length); //increment the progress dialog's progress

			try {
				Fea = ApplyFeatureAttributes(
					"feat", // type
					aFeat, // fObjName
					[oldFeatLvl, newFeatLvl, false], // lvlA [old-level, new-level, force-apply]
					[aFeatVar, aFeatVar, false], // choiceA [old-choice, new-choice, "only"|"change"]
					false // forceNonCurrent
				);
			} catch (error) {
				var eText = 'The feat "' + theFeat.name + '" produced an error! Please contact the author of the feature to correct this issue:\n ' + error;
				for (var e in error) eText += "\n " + e + ": " + error[e];
				console.println(eText);
				console.show();
			}
		}
		CurrentFeats.level = newFeatLvl;
	}

	// apply magic item level changes
	var oldItemLvl = CurrentMagicItems.level;
	var newItemLvl = curLvl;
	if ((/item|all|notclass/i).test(Typeswitch) && oldItemLvl != newItemLvl) {
		for (var f = 0; f < CurrentMagicItems.known.length; f++) {
			var anItem = CurrentMagicItems.known[f];
			var anItemVar = CurrentMagicItems.choices[f];
			var theItem = MagicItemsList[anItem];
			if (!theItem) continue;

			// if the attunement field is visible, but the checkbox is not checked, skip it
			var attuneFld = tDoc.getField("Extra.Magic Item Attuned " + (f+1));
			if (!theItem || (attuneFld.display == display.visible && !attuneFld.isBoxChecked(0))) continue;

			thermoTxt = thermoM("Updating " + theItem.name + " features...", false);
			thermoM((f+1)/CurrentMagicItems.known.length); //increment the progress dialog's progress

			try {
				Fea = ApplyFeatureAttributes(
					"item", // type
					anItem, // fObjName
					[oldItemLvl, newItemLvl, false], // lvlA [old-level, new-level, force-apply]
					[anItemVar, anItemVar, false], // choiceA [old-choice, new-choice, "only"|"change"]
					false // forceNonCurrent
				);
			} catch (error) {
				var eText = 'The magic item "' + theItem.name + '" produced an error! Please contact the author of the feature to correct this issue:\n ' + error;
				for (var e in error) eText += "\n " + e + ": " + error[e];
				console.println(eText);
				console.show();
			}
		}
		CurrentMagicItems.level = newItemLvl;
	}

	// apply class level changes
	if ((/^(?!=notclass)(all|class).*$/i).test(Typeswitch)) {

		// first see if any wild shapes are in use
		var WSinUse = false;
		var prefixA = What("Template.extras.WSfront").split(",").slice(1);
		for (var p = 0; p < prefixA.length; p++) {
			for (var i = 1; i <= 4; i++) {
				var theFld = What(prefixA[p] + "Wildshape.Race." + i);
				if (!theFld || theFld.toLowerCase() === "make a selection") continue;
				if (!theFld && theFld.toLowerCase() !== "make a selection" && ParseCreature(theFld)) {
					WSinUse = true;
					p = prefixA.length;
					break;
				}
			}
		}

		// set some general variables
		var oldClassLvl = {}, newClassLvl = {}, ClassLevelUp = {}; // NODIG???

		// loop through all known classes and updates its features
		for (var aClass in classes.known) {
			var cl = CurrentClasses[aClass];
			var newSubClass = classes.known[aClass].subclass;
			var oldSubClass = classes.old[aClass] ? classes.old[aClass].subclass : "";

			// get the class level, new and old
			oldClassLvl[aClass] = classes.old[aClass] ? classes.old[aClass].classlevel : 0;
			newClassLvl[aClass] = classes.known[aClass].level;
			ClassLevelUp[aClass] = [
				newClassLvl[aClass] >= oldClassLvl[aClass], // true if going level up/same, false if going down
				Math.min(oldClassLvl[aClass], newClassLvl[aClass]), // lowest level
				Math.max(oldClassLvl[aClass], newClassLvl[aClass]) // highest level
			];

			// now skip this class if neither the level nor subclass changed
			if (newClassLvl[aClass] === oldClassLvl[aClass] && newSubClass === oldSubClass) continue;

			// update the progress dialog
			thermoTxt = thermoM("Updating " + cl.fullname + " features...", false);
			thermoM(1/5);

			// process the class heading
			if (newClassLvl[aClass] == 0) { // remove the heading
				var oldHeaderString = cl.fullname + ", level " + oldClassLvl[aClass] + ":";
				if (What("Class Features").indexOf("\r\r" + oldHeaderString) !== -1) oldHeaderString = "\r\r" + oldHeaderString;
				RemoveString("Class Features", oldHeaderString, false);
			} else if (oldClassLvl[aClass] == 0) { // add the heading
				var newHeaderString = cl.fullname + ", level " + newClassLvl[aClass] + ":";
				if (What("Class Features")) newHeaderString = "\r\r" + newHeaderString;
				AddString("Class Features", newHeaderString, false);
			} else { // update the heading
				var newHeaderString = cl.fullname + ", level " + newClassLvl[aClass] + ":";
				var oldHeaderString = !classes.old[aClass] ? "" : classes.old[aClass].fullname.RegEscape() + ".*, level \\d+:";
				ReplaceString("Class Features", newHeaderString, false, oldHeaderString, true);
			}

			// loop through the features
			var LastProp = newHeaderString, feaA = [];
			for (var key in cl.features) feaA.push(key);
			if (oldClassLvl[aClass] > newClassLvl[aClass]) feaA.reverse(); // when removing, loop through them backwards
			for (var f = 0; f < feaA.length; f++) {
				var prop = feaA[f];
				var propFea = cl.features[prop];
				var isSubClassProp = newSubClass && ClassSubList[newSubClass].features[prop] ? true : false;
				var isClassProp = ClassList[aClass].features[prop] ? true : false;

				// update the progress dialog
				thermoTxt = thermoM("Updating " + cl.fullname + ": " + propFea.name + "...", false);
				thermoM((f+1)/feaA.length);

				// if this is the first time applying the features after changing subclass, things might need to be forced if the class was previously at a level that a subclass was already warranted
				var forceProp = isSubClassProp && newSubClass != oldSubClass && propFea.minlevel <= oldClassLvl[aClass] && propFea.minlevel <= newClassLvl[aClass];

				try {
					// apply the common attributes of the feature
					Fea = ApplyFeatureAttributes(
						"class", // type
						[aClass, prop], // fObjName [aParent, fObjName]
						[oldClassLvl[aClass], newClassLvl[aClass], forceProp], // lvlA [old-level, new-level, force-apply]
						false, // choiceA [old-choice, new-choice, "only"|"change"]
						false // forceNonCurrent
					);

					// add/remove/update the feature text on the second page
					var FeaOldString = ParseClassFeature(aClass, prop, oldClassLvl[aClass], forceProp, Fea.ChoiceOld, forceProp ? false : Fea);
					Fea.extFirst = true; // signal that we need the full first line for FeaNewString
					var FeaNewString = ParseClassFeature(aClass, prop, newClassLvl[aClass], false, Fea.Choice, Fea);
					// see what type of change we have to do
					var textAction = Fea.CheckLVL && !Fea.AddFea ? "remove" : // level dropped below minlevel
						Fea.CheckLVL && Fea.AddFea && (!forceProp || (forceProp && !isClassProp)) ? "insert" : // level rose above minlevel and there is nothing to replace
						forceProp || (Fea.AddFea && Fea.changed && Fea.Descr !== Fea.DescrOld) ? "replace" : // forcing the new version or update the whole text after a description change
						Fea.AddFea && Fea.changed && Fea.Descr === Fea.DescrOld ? "first" : // update just header after a usages/recovery/additional change
						false;
					// do the text change, if any
					if (textAction) {
						var doTextAction = applyClassFeatureText(textAction, ["Class Features"], FeaOldString, FeaNewString, LastProp);
						if (doTextAction === false && textAction !== "remove") {
							// This failed, so just add it to the end of the field
							AddString("Class Features", FeaNewString[1], true);
						}
					}

					// keep track of the last property's header text (don't use FeaNewString, as it might include an additional or recovery)
					LastProp = propFea.minlevel <= ClassLevelUp[aClass][2] ? FeaNewString[2] : LastProp;
				} catch (error) {
					var eText = 'The "' + propFea.name + '" feature from the "' + cl.fullname + '" class produced an error! Please contact the author of the feature to correct this issue:\n ' + error;
					for (var e in error) eText += "\n " + e + ": " + error[e];
					console.println(eText);
					console.show();
				}

				// see if this is a wild shape feature
				if (prop.indexOf("wild shape") !== -1 && Fea.changed) WSinUse = [newClassLvl[aClass], Fea.Use, Fea.Recov, Fea.Add];

				/* loop through the feature's selected extra options, but only:
					- during import to set the feature for the first time (!IsNotImport && Fea.AddFea)
					- if removing the feature (Fea.CheckLVL && !Fea.AddFea)
					- if level-dependent things might have changed for existing extrachoices (!Fea.CheckLVL && Fea.AddFea)
				*/
				if ((!IsNotImport && propFea.extrachoices && Fea.AddFea) || (IsNotImport && Fea.CheckLVL !== Fea.AddFea)) {
					var xtrSel = GetFeatureChoice("classes", aClass, prop, true);
					for (var x = 0; x < xtrSel.length; x++) {
						var xtrProp = xtrSel[x];
						if (!propFea[xtrProp] || (!IsNotImport && propFea.extrachoices.join("##").toLowerCase().indexOf(xtrProp) == -1)) continue; // skip this feature if not found OR this is an import event and the feature is not in the extrachoices array
						// apply the common attributes of the feature extra choice
						var xtrFea = ApplyFeatureAttributes(
							"class", // type
							[aClass, prop], // fObjName [aParent, fObjName]
							[oldClassLvl[aClass], newClassLvl[aClass], false], // lvlA [old-level, new-level, force-apply]
							Fea.AddFea ? ["", xtrProp, "only"] : [xtrProp, "", "only"], // choiceA [old-choice, new-choice, "only"|"change"]
							false // forceNonCurrent
						);
						// add/remove/update the feature text on the third/second page
						var xtrFeaOldString = ParseClassFeatureExtra(aClass, prop, xtrProp, xtrFea, true);
						var xtrFeaNewString = ParseClassFeatureExtra(aClass, prop, xtrProp, xtrFea, false);
						// see what type of change we have to do
						var xtrTextAction = Fea.CheckLVL && !Fea.AddFea ? "remove" : // level dropped below minlevel
							xtrFea.AddFea && xtrFea.changed && xtrFea.Descr !== xtrFea.DescrOld ? "replace" : // update the whole text after a description change
							xtrFea.AddFea && xtrFea.changed && xtrFea.Descr === xtrFea.DescrOld ? "first" : // update just header after a usages/recovery/additional change
							false;
						// do the text change, if any
						if (IsNotImport && xtrTextAction) {
							applyClassFeatureText(xtrTextAction, ["Extra.Notes", "Class Features"], xtrFeaOldString, xtrFeaNewString, false);
						} else if (propFea.extrachoices && !IsNotImport) {
							AddString("Extra.Notes", xtrFeaNewString[1].replace(/^(\r|\n)*/, ''), true);
						}
					}
				}
			}
		}

		// (re-)apply and re-calculate all the wild shapes as something might have changed after going level up
		if (WSinUse) WildshapeUpdate(WSinUse != true ? WSinUse : false);
	}

	thermoM(thermoTxt, true); // Stop progress bar
};

// Make menu for 'choose class feature' button and parse it to Menus.classfeatures
function MakeClassMenu(bKeepTempClassesKnown) {
	var gatherVars, hasEldritchBlast, isFS = false, selFS = GetFightingStyleSelection();
	var testPrereqs = function(toEval, objNm, feaNm) {
		if (!gatherVars) {
			gatherVars = gatherPrereqevalVars();
			hasEldritchBlast = gatherVars.hasEldritchBlast;
		}
		gatherVars.choice = objNm;
		var theRe = true;
		try {
			if (typeof toEval == 'string') {
				theRe = eval(toEval);
			} else if (typeof toEval == 'function') {
				theRe = toEval(gatherVars);
			}
		} catch (error) {
			var eText = "The prerequisite check code (prereqeval) for '" + objNm + "' of the '" + feaNm + "' feature produced an error! Please contact the author of the feature to correct this issue:\n " + error;
			for (var e in error) eText += "\n " + e + ": " + error[e];
			console.println(eText);
			console.show();
		}
		return theRe;
	}

	var nrFoundInExtraChoices = function(testArray, choicesArray) {
		var cnt = 0;
		if (testArray.length) {
			var arr = choicesArray.map(function(n) { return n.toLowerCase(); });
			for (var i = 0; i < testArray.length; i++) {
				if (arr.indexOf(testArray[i]) !== -1) cnt++;
			}
		}
		return cnt;
	}

	var menuLVL3 = function (menu, name, array, classNm, featureNm, extrareturn, feaObj, curSel, moreReturn) {
		var temp = [], toSub = {};
		for (var i = 0; i < array.length; i++) {
			var extraNm = "";
			var feaObjNm = array[i].toLowerCase();
			var feaObjA = feaObj[feaObjNm];
			if (!feaObjA) { // object doesn't exist, so warn user
				console.println("The object corresponding to '" + array[i] + "' doesn't exist in the '" + featureNm + "' feature. This is a discrepancy between the '" + extrareturn + "choices' array and the names of the objects. Note that the object name needs to be exactly '" + array[i].toLowerCase() + "' (identical, but fully lower case).");
				console.show();
				continue;
			};
			// is this feature selected? Than mark it!
			var isActive = extrareturn ? curSel.indexOf(feaObjNm) !== -1 : curSel == feaObjNm;

			if (!isActive && testSource("", feaObjA)) continue; // object's source is excluded, so skip it if not currently selected

			// now see if we should disable this because of prerequisites
			var isEnabled = feaObjA.prereqeval && !ignorePrereqs && !isActive ? testPrereqs(feaObjA.prereqeval, feaObjNm, featureNm) : true;
			if (isEnabled === "skip") continue; // special failsafe for choices that return "skip" on their prepreqeval
			if (isEnabled && !isActive && isFS && selFS[feaObjNm]) {
				isEnabled = false;
				extraNm = selFS[feaObjNm][2];
			}
			var removeStop = !isActive ? "add" : extrareturn ? "remove" : "stop";

			if (!isActive && isEnabled === "markButDisable") {
				isActive = true;
				isEnabled = false;
			}

			// now make the menu entry
			var oSrc = { source : feaObjA.source ? feaObjA.source : feaObj.source };
			var mItem = {
				cName : array[i] + extraNm + stringSource(oSrc, "first,abbr", "\t   [", "]"),
				cReturn : classNm + "#" + featureNm + "#" + array[i] + "#" + extrareturn + "#" + removeStop + (moreReturn ? moreReturn : ""),
				bMarked : isActive,
				bEnabled : isEnabled
			};
			// test if the menu entry shouldn't be another layer deeper
			if (feaObjA.submenu) {
				// create entry for this submenu if it doesn't already exist
				if (!toSub[feaObjA.submenu]) {
					toSub[feaObjA.submenu] = [];
					temp.push({
						cName : feaObjA.submenu,
						oSubMenu : []
					})
				}
				toSub[feaObjA.submenu].push(mItem);
			} else {
				temp.push(mItem);
			}
		};
		// if there are any entries in toSub, we must sort the temp array and add the submenu arrays
		if (ObjLength(toSub)) {
			temp.sort(function(a, b) {
				return a.cName.localeCompare(b.cName);
			});
			for (var t = 0; t < temp.length; t++) {
				if (temp[t].oSubMenu && toSub[temp[t].cName]) {
					temp[t].oSubMenu = toSub[temp[t].cName];
					temp[t].bMarked = temp[t].oSubMenu.some(function (n) { return n.bMarked; });
				}
			}
		}
		if (temp.length && !(!extrareturn && temp.length === 1 && temp[0].bMarked)) {
			// only add a menu item if there is actually anything to select
			menu.push({
				cName : name,
				oSubMenu : temp
			});
		}
	};

	var ClassMenu = [], aClass, cl, prop, propFea, toTest, toTestNr, toChooseNr, toChooseStr;

	for (aClass in classes.known) {
		var clLvl = classes.known[aClass].level;
		cl = CurrentClasses[aClass];
		var tempItem = [];
		for (prop in cl.features) {
			propFea = cl.features[prop];
			if (propFea.choices && !propFea.choicesNotInMenu && propFea.minlevel <= clLvl) {
				isFS = (/fighting style/i).test(prop + propFea.name);
				toTest = GetFeatureChoice("classes", aClass, prop, false);
				propFea.choices.sort();
				menuLVL3(tempItem, propFea.name, propFea.choices, aClass, prop, "", propFea, toTest);
			};
			if (propFea.extrachoices && !propFea.choicesNotInMenu && !propFea.extrachoicesNotInMenu && propFea.minlevel <= clLvl) {
				toTest = GetFeatureChoice("classes", aClass, prop, true);
				toTestNr = nrFoundInExtraChoices(toTest, propFea.extrachoices);
				propFea.extrachoices.sort();
				toChooseNr = propFea.extraTimes ? propFea.extraTimes[Math.min(propFea.extraTimes.length, clLvl) - 1] : 0;
				toChooseNr += getBonusClassExtraChoiceNr(aClass, prop); // Add extra allowed for 'bonus' entries
				toChooseStr = " (" + "selected " + toTestNr + (toChooseNr ? " of " + toChooseNr : "") + ")";
				menuLVL3(tempItem, propFea.extraname + toChooseStr, propFea.extrachoices, aClass, prop, "extra", propFea, toTest);
			};
		};
		if (tempItem.length > 0) {
			// Sort the submenu to be easier to read Optional features | Variants | features
			var tempSorted = {
				optional : [],
				variants : [],
				features : []
			};
			for (var i = 0; i < tempItem.length; i++) {
				var iMenu = tempItem[i];
				tempSorted[(/optional/i).test(iMenu.cName) ? "optional" : (/or a variant/i).test(iMenu.cName) ? "variants" : "features"].push(iMenu);
			}
			// Add dividers
			if (tempSorted.optional.length && (tempSorted.variants.length || tempSorted.features.length)) {
				tempSorted.optional.sort();
				tempSorted.optional.push({ cName : "-", cReturn : "-" });
			}
			if (tempSorted.variants.length && tempSorted.features.length) {
				tempSorted.variants.push({ cName : "-", cReturn : "-" });
			}
			ClassMenu.push({
				cName : cl.fullname,
				oSubMenu : tempSorted.optional.concat(tempSorted.variants).concat(tempSorted.features)
			});
		};
	};

	var bonusClassFeatures = getBonusClassExtraChoices();
	if (bonusClassFeatures) {
		Menus.classfeatures_tempClassesKnown = [];
		ClassMenu.push({ cName : "-" }); // Add a divider
		for (var i = 0; i < bonusClassFeatures.length; i++) {
			var oBonus = bonusClassFeatures[i];
			aClass = oBonus["class"];
			cl = oBonus.subclass ? ClassSubList[oBonus.subclass] : ClassList[aClass];
			prop = oBonus.feature;
			propFea = cl.features[prop];
			propFea.extrachoices.sort();
			toTest = GetFeatureChoice("classes", aClass, prop, true);
			toTestNr = nrFoundInExtraChoices(toTest, propFea.extrachoices);
			var clName = !oBonus.subclass ? cl.name : cl.fullname ? cl.fullname : ClassList[aClass].name + " (" + cl.subname + ")";
			var menuName = "Bonus " + clName + " " + propFea.extraname + " (selected " + toTestNr + " of " + oBonus.bonus + ")";
			var sMoreReturn = "#extrabonus" + (oBonus.subclass ? "#" + oBonus.subclass : "");
			// temporarily add the class to classes.known, so that prereq scripts will not produce errors
			var tempClassesKnown = false;
			if (!classes.known[aClass]) {
				classes.known[aClass] = {
					name : aClass,
					level : 0,
					subclass : oBonus.subclass ? oBonus.subclass : ""
				}
				if (bKeepTempClassesKnown) {
					Menus.classfeatures_tempClassesKnown.push(aClass);
				} else {
					tempClassesKnown = true;
				}
			} else if (oBonus.subclass && !classes.known[aClass].subclass && Menus.classfeatures_tempClassesKnown.indexOf(aClass) !== -1) {
				classes.known[aClass].subclass = oBonus.subclass;
			}
			menuLVL3(ClassMenu, menuName, propFea.extrachoices, aClass, prop, "extra", propFea, toTest, sMoreReturn);
			if (tempClassesKnown) {
				delete classes.known[aClass];
			}
		}
	}

	// if no options were found, set the menu to something else and make the return false
	if (ClassMenu.length === 0) {
		Menus.classfeatures = [{
			cName : "No class features detected that require a choice",
			cReturn : "nothing",
			bEnabled : false
		}];
		return false;
	} else {
		Menus.classfeatures = ClassMenu;
		return true;
	}
};

// Call the Class Features menu and do something with the results
function ClassFeatureOptions(Input, AddRemove, ForceExtraname) {
	// first see if we have something to do
	var MenuSelection = Input;
	if (!Input) {
		MakeClassMenu(true);
		MenuSelection = getMenu("classfeatures");
	}
	if (!MenuSelection || MenuSelection[0] == "nothing" || MenuSelection[4] == "stop") return cleanTempClassesKnown();

	// initialize some variables
	var triggerIsMenu = event.target && event.target.name && event.target.name == "Class Features Menu";
	var addIt = AddRemove ? AddRemove.toLowerCase() == "add" : MenuSelection[4] ? MenuSelection[4] == "add" : true;
	var aClass = MenuSelection[0];
	var prop = MenuSelection[1];
	var choice = MenuSelection[2];
	var extra = !!MenuSelection[3];
	var extraBonus = MenuSelection[5] ? true : false; // a feature with bonus entries that currently isn't available
	var sSubclass = MenuSelection[6] ? MenuSelection[6] : false;
	var propFea = false;
	if (extraBonus && (sSubclass || !CurrentClasses[aClass])) {
		propFea = sSubclass ? ClassSubList[sSubclass].features[prop] : ClassList[aClass].features[prop];
		var unknownClass = true;
	} else if (CurrentClasses[aClass]) {
		propFea = CurrentClasses[aClass].features[prop];
		var unknownClass = false;
	}
	var propFeaCs = propFea ? propFea[choice] : false;
	if (!propFea || !propFeaCs) return cleanTempClassesKnown(); // no objects to process, so go back

	var clLvl = unknownClass ? propFea.minlevel : classes.known[aClass].level;
	var clLvlOld = unknownClass ? propFea.minlevel : !triggerIsMenu && Input && classes.old[aClass] ? classes.old[aClass].classlevel : clLvl;
	if (!unknownClass && propFea.minlevel && Math.max(clLvl, clLvlOld) < propFea.minlevel) {
		// Trying to process a class feature for which there is no high enough level
		if (!extra) { // If this is not an 'extrachoice', stop now
			return cleanTempClassesKnown();
		} else { // Set both current and old level to the minimal required level
			clLvl = propFea.minlevel;
			clLvlOld = propFea.minlevel;
		}
	}

	// Start progress bar and stop calculations
	var thermoTxt = thermoM((!extra ? "Applying " : addIt ? "Adding " : "Removing ") + propFeaCs.name + "...");
	thermoM(1/5); //increment the progress dialog's progress
	calcStop();

	if (extra) { // an extra choice for the third page

		// if removing, first check if it actually exists
		if (!addIt && GetFeatureChoice("classes", aClass, prop, true).indexOf(choice) == -1) {
			thermoM(thermoTxt, true); // Stop progress bar
			return cleanTempClassesKnown();
		};

		// apply the common attributes of the feature
		var Fea = ApplyFeatureAttributes(
			"class", // type
			[aClass, prop], // fObjName [aParent, fObjName]
			addIt ? [0, clLvl, false] : [clLvlOld, 0, false], // lvlA [old-level, new-level, force-apply]
			addIt ? ["", choice, "only"] : [choice, "", "only"], // choiceA [old-choice, new-choice, "only"|"change"]
			!unknownClass ? false : sSubclass ? sSubclass : aClass // forceNonCurrent
		);

		thermoM(3/5); //increment the progress dialog's progress

		// do something with the text of the feature
		var feaString = ParseClassFeatureExtra(
			unknownClass ? propFea : aClass,
			prop, choice, Fea, !addIt, ForceExtraname);

		if (addIt) { // add the string to the third page
			AddString("Extra.Notes", feaString[1].replace(/^(\r|\n)*/, ''), true);
			show3rdPageNotes(); // for a Colourful sheet, show the notes section on the third page
			var extraNm = propFeaCs.extraname ? propFeaCs.extraname : ForceExtraname ? ForceExtraname : propFea.extraname ? propFea.extraname : propFea.name;
			var changeMsg = "The " + extraNm + ' "' + propFeaCs.name + '" has been added to the Notes section on the third page' + (!typePF ? ", while the Rules section on the third page has been hidden" : "") + ". They wouldn't fit in the Class Features section if the class is taken to level 20.";
			CurrentUpdates.types.push("notes");
			if (!CurrentUpdates.notesChanges) {
				CurrentUpdates.notesChanges = [changeMsg];
			} else {
				CurrentUpdates.notesChanges.push(changeMsg);
			}
		} else { // remove the string from the third (or second) page
			applyClassFeatureText("remove", ["Extra.Notes", "Class Features"], feaString, "", false);
		}
	} else if (addIt) { // a choice to replace the feature on the second page
		var choiceOld = GetFeatureChoice("classes", aClass, prop, false);
		// apply the common attributes of the feature
		var Fea = ApplyFeatureAttributes(
			"class", // type
			[aClass, prop], // fObjName [aParent, fObjName]
			[clLvlOld, clLvl, true], // lvlA [old-level, new-level, force-apply]
			[choiceOld, choice, "change"], // choiceA [old-choice, new-choice, "only"|"change"]
			false // forceNonCurrent
		);
		thermoM(3/5); //increment the progress dialog's progress
		// do something with the text of the feature
		var feaString = ParseClassFeature(aClass, prop, clLvl, false, choice, Fea);
		var feaStringOld = ParseClassFeature(aClass, prop, clLvlOld, false, choiceOld, Fea, true);
		applyClassFeatureText("replace", ["Class Features"], feaStringOld, feaString, false);
	}

	cleanTempClassesKnown();

	thermoM(thermoTxt, true); // Stop progress bar
}

// Delete the temporary additions to classes.known, if any
function cleanTempClassesKnown() {
	for (var i = 0; i < Menus.classfeatures_tempClassesKnown.length; i++) {
		delete classes.known[Menus.classfeatures_tempClassesKnown[i]];
	}
	Menus.classfeatures_tempClassesKnown = [];
}

// Set the choice for other class features dependent on the choice of this class feature
/* choiceDependencies : [{
	feature : "subclassfeature6",
	choiceAttribute : true // OPTIONAL //
}] */
function processClassFeatureChoiceDependencies(lvlA, aClass, aFeature, fChoice) {
	var lvlOld = lvlA[0], lvlNew = lvlA[1];
	var pObj = CurrentClasses[aClass].features;
	var fObj = pObj[aFeature];
	var theDep = fObj.choiceDependencies;
	if (!isArray(theDep)) theDep = [theDep];
	for (var i = 0; i < theDep.length; i++) {
		var aDep = theDep[i];
		var tObj = pObj[aDep.feature];
		if (!tObj || lvlNew < tObj.minlevel) continue;
		var newChoice = aDep.choiceAttribute && fObj[fChoice].dependentChoices ? fObj[fChoice].dependentChoices : fChoice;
		var curChoice = GetFeatureChoice('class', aClass, aDep.feature);
		if (!tObj[newChoice] || newChoice == curChoice) continue;
		if (lvlOld >= tObj.minlevel) {
			// the feature is already present on the sheet, so parse it through ClassFeatureOptions
			ClassFeatureOptions([aClass, aDep.feature, newChoice]);
		} else {
			// the feature will be added during this same UpdateLevelFeatures call, so just set it to be remembered
			SetFeatureChoice("class", aClass, aDep.feature, newChoice);
		}
	}
}

// A way for a class feature to add an extra choice (from its own object) at a specific level
/* autoSelectExtrachoices : [{
	extrachoice : "flurry of blows",
	minlevel : 5, // OPTIONAL //
	extraname : "Ki Feature" // OPTIONAL //
}] */
function processClassFeatureExtraChoiceDependencies(lvlA, aClass, aFeature, fObj, bSkipDepCheck) {
	var lvlH = Math.max(lvlA[0], lvlA[1]), lvlL = Math.min(lvlA[0], lvlA[1]);
	var theDep = fObj.autoSelectExtrachoices;
	if (!isArray(theDep)) theDep = [theDep];
	for (var i = 0; i < theDep.length; i++) {
		var aDep = theDep[i];
		var minLvl = aDep.minlevel ? aDep.minlevel : fObj.minlevel;
		// stop if nothing found or there was no level change that affected this feature
		if (!aDep.extrachoice || (!bSkipDepCheck && !fObj[aDep.extrachoice]) || !(lvlH >= minLvl && lvlL < minLvl)) continue;
		// set or remove the class feature, depending on its level
		ClassFeatureOptions(
			[aClass, aFeature, aDep.extrachoice, 'extra'],
			lvlA[1] < minLvl ? 'remove' : false,
			aDep.extraname
		);
	}
}

// The print feature button
function PrintButton() {
	var thePageOptions = [
		"CSfront",
		"CSback",
		"ASfront",
		"ASoverflow",
		"ASbackgr",
		"AScomp",
		"ASnotes",
		"WSfront",
		"SSfront",
		"ALlog"
	];
	if (typePF) {
		thePageOptions.push("PRsheet");
		SetPrintPages_Dialog.bshowPR = true;
	}

	var PrintFld = What("Print Remember").split("!#TheListSeparator#!");
	var PageArray = PrintFld[1] !== "0" ? PrintFld[1].split(",") : null;

	for (var x = 0; x < thePageOptions.length; x++) {
		//set the check marks in the dialog, depending on previous settings
		SetPrintPages_Dialog["b" + thePageOptions[x]] = PageArray.indexOf(thePageOptions[x]) !== -1;

		//set whether or not the fields are editable in the dialog (not editable if page is hidden)
		var isVisible = isTemplVis(thePageOptions[x]);
		SetPrintPages_Dialog["a" + thePageOptions[x]] = isVisible;
	}

	if (PrintFld[0] === "true") {
		SetPrintPages_Dialog["bDupl"] = true;
	} else {
		SetPrintPages_Dialog["bDupl"] = false;
	}

	var theDialog = app.execDialog(SetPrintPages_Dialog);

	var Proceed = false;
	switch (theDialog) {
	 case "ok":
		Proceed = true;
	 case "save":
		var ResultsArray = [0];
		for (var p = 0; p < thePageOptions.length; p++) {
			if (SetPrintPages_Dialog["b" + thePageOptions[p]]) {
				ResultsArray.push(thePageOptions[p]);
			}
		}
		Value("Print Remember", SetPrintPages_Dialog["bDupl"] + "!#TheListSeparator#!" + ResultsArray.toString());
		if (Proceed) {
			PrintTheSheet();
		};
	 case "cancel":
		if (SetPrintPages_Dialog.bHide) {
			HideShowEverything(false);
			SetPrintPages_Dialog.bHide = false;
		}
	}
};

//call the print dialog
function PrintTheSheet() {
	var PrintFld = What("Print Remember").split("!#TheListSeparator#!");
	var PageArray = PrintFld[1] !== "0" ? PrintFld[1].split(",") : null;
	if (PageArray) {
		var PagesToPrint = [];
		for (var P = 1; P < PageArray.length; P++) {
			//in the case of the three extendable types, also go add all the extra sheets
			if (PageArray[P] === "SSfront") {
				var prefixArray = What("Template.extras.SSmore").split(",");
				prefixArray[0] = What("Template.extras.SSfront").split(",")[1];
				if (!prefixArray[0]) prefixArray.shift();
			} else if (TemplatesWithExtras.indexOf(PageArray[P]) !== -1) {
				var prefixArray = What("Template.extras." + PageArray[P]).split(",");
			} else {
				var prefixArray = [""];
			}
			for (var A = 0; A < prefixArray.length; A++) {
				var testFld = tDoc.getField(prefixArray[A] + BookMarkList[PageArray[P]]).page;
				if (isArray(testFld)) {
					for (var tF = 0; tF < testFld.length; tF++) {
						if (testFld[tF] !== -1) {
							PagesToPrint.push([testFld[tF], testFld[tF]]);
						}
					}
				} else if (testFld !== -1) {
					PagesToPrint.push([testFld, testFld]);
				}
			}
		}
	}
	var GoPrint = tDoc.getPrintParams();
	GoPrint.interactive = GoPrint.constants.interactionLevel.full;

	if (PrintFld[0] === "true") {
		GoPrint.DuplexType = GoPrint.constants.duplexTypes.DuplexFlipLongEdge;
	} else {
		GoPrint.DuplexType = GoPrint.constants.duplexTypes.Simplex;
	}
	if (PageArray) {
		GoPrint.printRange = PagesToPrint;
	};
	tDoc.print(GoPrint);
};

//Hide (true) or show (false) all the different form fields in the entire sheet
function HideShowEverything(toggle) {
	if (toggle) {
		// Start progress bar and stop calculations
		var thermoTxt = thermoM("Hiding all the fields...");
		calcStop();

		//first undo the visibility of the blue-text fields, if visible
		ToggleBlueText(false);

		if (FieldsRemember.length) HideShowEverything(false);

		var exceptionRegex = /(Sheet|Copyright)Information|(Whiteout|Title|^(?!Too).* Text)$|(Whiteout|Image|Text|Line|Display)\.|Circle|Location\.Line|Medium Armor Max Mod|Comp\.Type|Ammo(Right|Left)\.Icon|spellshead\.Box/;
		for (var F = 0; F < tDoc.numFields; F++) {
			thermoM(F/tDoc.numFields); //increment the progress dialog's progress
			var Fname = tDoc.getNthFieldName(F);
			var Ffield = tDoc.getField(Fname);
			if ((exceptionRegex).test(Fname)) continue;
			if (Ffield.page.length) {
				for (var i = 0; i < Ffield.page.length; i++) {
					var Fnamei = Fname + "." + i;
					var Ffieldi = tDoc.getField(Fnamei);
					if (Ffieldi.display !== 1) {
						FieldsRemember.push([Fnamei, Ffieldi.display]);
						Ffieldi.display = 1
					};
				};
			} else if (Ffield.display !== 1) {
				FieldsRemember.push([Fname, Ffield.display]);
				Ffield.display = 1;
			};
		};
	} else if (!toggle) {
		// Start progress bar and stop calculations
		var thermoTxt = thermoM("Restoring the visibility of all the fields...");
		calcStop();
		for (var H = 0; H < FieldsRemember.length; H++) {
			thermoM(H/FieldsRemember.length); //increment the progress dialog's progress
			tDoc.getField(FieldsRemember[H][0]).display = FieldsRemember[H][1];
		};
		FieldsRemember = [];
	};
	// Stop the progress bar and force calculations to start again because this is function is called while a dialog is displayed
	thermoM(thermoTxt, true);
	calcCont(true);
};

// Calculate the AC (field calculation)
function CalcAC() {
	var acFlds = {
		armour : "AC Armor Bonus",
		shield : "AC Shield Bonus",
		dex : "AC Dexterity Modifier",
		magic : "AC Magic",
		misc1 : "AC Misc Mod 1",
		misc2 : "AC Misc Mod 2"
	};
	var acVals = {};
	// Get the total AC value
	var AC = 0;
	for (var fld in acFlds) {
		acVals[fld] = fld === "dex" ? Number(What(acFlds[fld])) : EvalBonus(What(acFlds[fld]), true);
		AC += acVals[fld];
	}

	// It is possible that some of the modifiers (magic / misc) should not be added if some conditions aren't met
	var theArmor = CurrentArmour.known ? ArmourList[CurrentArmour.known] : false;
	// First gather some variables that the evals can test against
	var gatherVars = {
		theArmor : theArmor ? theArmor : {},
		usingShield : What("AC Shield Bonus Description") != "",
		// wearingArmor is only true for made armor, as natural/magic doesn't have a 'type'
		wearingArmor : !theArmor ? What("AC Armor Description") != "" : !!theArmor.type,
		mediumArmor : tDoc.getField('Medium Armor').isBoxChecked(0),
		heavyArmor : tDoc.getField('Heavy Armor').isBoxChecked(0),
		shieldProf : tDoc.getField("Proficiency Shields").isBoxChecked(0),
		lightProf : tDoc.getField("Proficiency Armor Light").isBoxChecked(0),
		mediumProf : tDoc.getField("Proficiency Armor Medium").isBoxChecked(0),
		heavyProf : tDoc.getField("Proficiency Armor Heavy").isBoxChecked(0)
	}
	// And add a variables for backwards compatibility
	var ACshield = gatherVars.usingShield;
	// Now run through those conditions and remove the ones from the total that weren't met
	for (var entry in CurrentProfs.specialarmour) {
		var aMod = CurrentProfs.specialarmour[entry];
		if (aMod.stopeval) {
			try {
				var removeMod = false;
				if (typeof aMod.stopeval == 'string') {
					removeMod = eval(aMod.stopeval);
				} else if (typeof aMod.stopeval == 'function') {
					removeMod = aMod.stopeval(gatherVars);
				}
				if (removeMod) {
					var removeVal = EvalBonus(aMod.mod, true);
					AC -= removeVal;
					if (acVals[aMod.type] !== undefined) acVals[aMod.type] -= removeVal;
				}
			} catch (error) {
				var eText = "The check if the AC bonus from '" + aMod.name + "' should be added or not produced an error! This check will be removed from the sheet for now, but please contact the author of the feature to have this issue corrected:\n " + error;
				for (var e in error) eText += "\n " + e + ": " + error[e];
				console.println(eText);
				console.show();
				delete aMod.stopeval;
			}
		}
	}
	// Now update the display value for the magic and misc modifier fields
	for (var fld in acVals) {
		if (fld === "dex") continue;
		var modFld = tDoc.getField(acFlds[fld]);
		if (modFld.valueCalculated !== acVals[fld]) {
			modFld.valueCalculated = acVals[fld];
			Value(acFlds[fld], What(acFlds[fld]));
		}
	}

	if (!acVals.armour) {
		event.value = "";
	} else if (tDoc.getField("BlueText.Players Make All Rolls").isBoxChecked(0)) {
		AC -= 12;
		event.value = AC < 0 ? AC : "+" + AC;
	} else {
		event.value = AC;
	}
};

// Format the AC for when "Players Make All Rolls" is enabled (field format)
function formatACforPMAR() {
	DisplayBonus();
	if (!tDoc.getField("BlueText.Players Make All Rolls").isBoxChecked(0) || !event.value) return;
	var ACmod = event.value - 12;
	event.value = ACmod < 0 ? ACmod : "+" + ACmod;
}

// Make sure the magic/miscellaneous AC fields have a proper description (and don't overflow)
function formatACdescr() {
	var testLen = typePF ? 41 : 36;
	if (event.value.length > testLen) {
		var isMagic = event.target.name.indexOf("Magic") !== -1;
		event.value = "Various" + (isMagic ? " magic" : "") + " bonuses"
	}
}

function SetToManual_Button(noDialog) {
	var BackgroundFld = !!CurrentVars.manual.background;
	var BackgroundFeatureFld = !!CurrentVars.manual.backgroundFeature;
	var ClassFld = !!CurrentVars.manual.classes;
	var FeatFld = !!CurrentVars.manual.feats;
	var ItemFld = !!CurrentVars.manual.items;
	var RaceFld = !!CurrentVars.manual.race;

	if (!noDialog) {
		//set the checkboxes in the dialog to starting position
		SetToManual_Dialog.mAtt = CurrentVars.manual.attacks;
		SetToManual_Dialog.mBac = BackgroundFld;
		SetToManual_Dialog.mBFe = BackgroundFeatureFld;
		SetToManual_Dialog.mCla = ClassFld;
		SetToManual_Dialog.mFea = FeatFld;
		SetToManual_Dialog.mMag = ItemFld;
		SetToManual_Dialog.mRac = RaceFld;

		//call the dialog and proceed if Apply is pressed
		if (app.execDialog(SetToManual_Dialog) != "ok") return;
	}

	//do something with the results of attacks checkbox
	if (SetToManual_Dialog.mAtt !== CurrentVars.manual.attacks) ToggleAttacks(SetToManual_Dialog.mAtt);

	//do something with the results of background checkbox
	if (SetToManual_Dialog.mBac !== BackgroundFld) {
		if (SetToManual_Dialog.mBac) {
			CurrentVars.manual.background = What("Background") + " ";
			Hide("Background Menu");
		} else {
			FindBackground(CurrentVars.manual.background);
			CurrentVars.manual.background = false;
			DontPrint("Background Menu");
			ApplyBackground(What("Background"));
		}
	}

	//do something with the results of background feature checkbox
	if (SetToManual_Dialog.mBFe !== BackgroundFeatureFld) {
		if (SetToManual_Dialog.mBFe) {
			CurrentVars.manual.backgroundFeature = What("Background Feature") + " ";
		} else {
			CurrentVars.manual.backgroundFeature = false;
			ApplyBackgroundFeature(What("Background Feature"), CurrentVars.manual.backgroundFeature);
		}
	}

	//do something with the results of class checkbox
	if (SetToManual_Dialog.mCla !== ClassFld) {
		if (SetToManual_Dialog.mCla) {
			var classString = What("Class and Levels");
			if (classes.parsed.length < 2 && classString.indexOf(classes.totallevel) == -1) classString += " " + classes.totallevel;
			CurrentVars.manual.classes = What("Class and Levels") + " ";
			Hide("Class Features Menu");
		} else {
			var newClassValue = What("Class and Levels");
			// restore the old class value so that we have a working classes.old
			var oldClassValue = CurrentVars.manual.classes;
			tDoc.getField("Class and Levels").remVal = oldClassValue;
			Value("Class and Levels", oldClassValue);
			// now set class processing back to automatic and apply the new value
			CurrentVars.manual.classes = false;
			Value("Class and Levels", newClassValue);
		}
	}

	//do something with the results of feat checkbox
	if (SetToManual_Dialog.mFea !== FeatFld) {
		if (SetToManual_Dialog.mFea) {
			CurrentVars.manual.feats = [CurrentFeats.known.slice(0), CurrentFeats.level];
			// remove the auto-calculations from feat fields
			for (var i = 1; i <= FieldNumbers.feats; i++) tDoc.getField("Feat Description " + i).setAction("Calculate", "");
		} else if (CurrentVars.manual.feats) {
			// set the old known feats back and apply the current ones
			var oldKnowns = CurrentVars.manual.feats[0];
			CurrentFeats.level = CurrentVars.manual.feats[1];
			CurrentVars.manual.feats = false;
			var remIgnoreDuplicates = ignoreDuplicates;
			ignoreDuplicates = true;
			for (var i = 1; i <= FieldNumbers.feats; i++) {
				CurrentFeats.known[i - 1] = oldKnowns[i - 1];
				ApplyFeat(What("Feat Name " + i), i);
			}
			// loop through the known feats and if any are still the same as before, first delete it and then apply it again
			for (var i = 0; i < FieldNumbers.feats; i++) {
				if (oldKnowns[i] && CurrentFeats.known[i] == oldKnowns[i]) {
					Value("Feat Name " + (i+1), "");
					Value("Feat Name " + (i+1), FeatsList[oldKnowns[i]].name);
				}
			}
			ignoreDuplicates = remIgnoreDuplicates;
			// update the feat level to the current level
			UpdateLevelFeatures("feat");
		}
	}
	//do something with the results of magic item checkbox
	if (SetToManual_Dialog.mMag !== ItemFld) {
		if (SetToManual_Dialog.mMag) {
			// make an array of the attunement status of the magic items
			var attuneArray = [];
			for (var i = 0; i < CurrentMagicItems.known.length; i++) {
				var theMI = MagicItemsList[CurrentMagicItems.known[i]];
				if (!theMI || !theMI.attunement) {
					attuneArray.push(undefined);
				} else {
					attuneArray.push(tDoc.getField("Extra.Magic Item Attuned " + (i + 1)).isBoxChecked(0));
				}
			}
			CurrentVars.manual.items = [CurrentMagicItems.known.slice(0), attuneArray, CurrentMagicItems.level];
			// remove the auto-calculations from magic item fields
			for (var i = 1; i <= FieldNumbers.magicitems; i++) {
				var descFld = "Extra.Magic Item Description " + i;
				tDoc.getField(descFld).setAction("Calculate", "");
				AddTooltip(descFld, undefined, "");
			}
		} else if (CurrentVars.manual.items) {
			// set the old known magic items back and apply the current ones
			var oldKnowns = CurrentVars.manual.items[0];
			var oldAttuned = CurrentVars.manual.items[1];
			CurrentMagicItems.level = CurrentVars.manual.items[2];
			CurrentVars.manual.items = false;
			var remIgnoreDuplicates = ignoreDuplicates;
			ignoreDuplicates = true;
			for (var i = 1; i <= FieldNumbers.magicitems; i++) {
				CurrentMagicItems.known[i - 1] = oldKnowns[i - 1];
				ApplyMagicItem(What("Extra.Magic Item " + i), i);
			}
			// loop through the known magic items and if any are still the same as before, first delete it and then apply it again
			for (var i = 0; i < FieldNumbers.magicitems; i++) {
				if (oldKnowns[i] && CurrentMagicItems.known[i] == oldKnowns[i]) {
					Value("Extra.Magic Item " + (i+1), "");
					Value("Extra.Magic Item " + (i+1), MagicItemsList[oldKnowns[i]].name);
				}
			}
			ignoreDuplicates = remIgnoreDuplicates;
			// update the magic item level to the current level
			UpdateLevelFeatures("item");
		}
	}

	//do something with the results of race checkbox
	if (SetToManual_Dialog.mRac !== RaceFld) {
		if (SetToManual_Dialog.mRac) {
			CurrentVars.manual.race = [What("Race Remember"), CurrentRace.level];
			Hide("Race Features Menu");
		} else {
			FindRace(CurrentVars.manual.race[0], true);
			if (CurrentRace.known) CurrentRace.level = CurrentVars.manual.race[1];
			CurrentVars.manual.race = false;
			ApplyRace(What("Race Remember"));
			if (CurrentRace.known) UpdateLevelFeatures("race");
		}
	}

	SetStringifieds("vars");
}

//calculate how much experience points are needed for the next level (field calculation)
function CalcXPnextlvl() {
	var lvl = Number(What("Character Level"));
	event.value = lvl && !isNaN(lvl) && lvl < (ExperiencePointsList.length - 1) ? ExperiencePointsList[lvl] : "";
};

//calculate the Ability Save DC (field calculation)
function CalcAbilityDC() {
	var Nmbr = event.target.name.slice(-1);
	var sFldMod = "Spell DC " + Nmbr + " Mod";
	var Indx = tDoc.getField(sFldMod).currentValueIndices;
	var useSSDC = false, useSSDCname = false, useSSDCothers = false;
	var sFldBonus = "Spell DC " + Nmbr + " Bonus";
	var sFldBonusVal = What(sFldBonus);
	var DCtot = "";
	if (Indx) {
		var modIpvDC = tDoc.getField("BlueText.Players Make All Rolls").isBoxChecked(0);
		// Now test if this ability score is not also present on the spell sheet pages and if there are modifiers used that we should apply here as well.
		var foundSSDC = [], foundSSDCref = {};
		var aSaveA = CurrentVars.AbilitySaveDcFound ? CurrentVars.AbilitySaveDcFound["abi" + Indx] : false;
		if (aSaveA) {
			for (var i = 0; i < aSaveA.length; i++) {
				var aSpCast = CurrentSpells[aSaveA[i]];
				if (!aSpCast) {
					// One of the entries is not also a spellcaster, so no bonuses to spell save DC should be used at all
					useSSDC = false;
					break;
				}
				if (aSpCast && aSpCast.calcSpellScores) {
					useSSDC = true;
					foundSSDC.push(aSpCast.calcSpellScores.dc);
					if (!foundSSDCref[aSpCast.calcSpellScores.dc]) foundSSDCref[aSpCast.calcSpellScores.dc] = [];
					foundSSDCref[aSpCast.calcSpellScores.dc].push(aSpCast.name);
				}
			}
		}
		if (useSSDC) {
			var useSSDCmin = Math.min.apply(Math, foundSSDC);
			useSSDCname = formatLineList("", foundSSDCref[useSSDCmin]);
			useSSDCothers = foundSSDC.length > foundSSDCref[useSSDCmin].length;
			DCtot = useSSDCmin - (modIpvDC ? 8 : 0);
		} else {
			DCtot = (modIpvDC ? 0 : 8) + Number(How("Proficiency Bonus")) + Number(What(What(sFldMod))) + EvalBonus(sFldBonusVal, true);
		}
	}
	event.value = DCtot && modIpvDC && DCtot >= 0 ? "+" + DCtot : DCtot;

	// Empty the modifier field and set to read-only if using the ones on the spell sheet page
	tDoc.getField(sFldBonus).readonly = useSSDC;
	AddTooltip(sFldMod, !useSSDCname ? "" : "The value shown is linked to the spell save DC on the spell sheets for the " + useSSDCname + "." + (useSSDCothers ? " There are other spell save DCs on the spell sheets that use Intelligence, but those have bonuses that don't apply to all, hence the number shown here is the lowest for this ability score." : "") + "\n\nBecause the value is linked to the spell sheet, you can't currently change or set a modifier here, only on the spell sheet page.");
	// Show or hide the modifier if they are supposed to 
	if (CurrentVars.bluetxt) {
		if (useSSDC) {
			Hide(sFldBonus);
		} else {
			DontPrint(sFldBonus);
		}
	}
}
//find the ability score the tool (or custom skill) is keyed off on
function UpdateTooSkill() {
	var TooSkillTxt = event.target && event.target.name == "Too Text" ? event.value.toLowerCase() : What("Too Text").toLowerCase();
	var Ability = "Too";
	for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
		if (TooSkillTxt.indexOf("(" + AbilityScores.abbreviations[i].toLowerCase() + ")") !== -1) {
			Ability = AbilityScores.abbreviations[i];
			break;
		}
	}
	SkillsList.abilityScores[SkillsList.abbreviations.indexOf("Too")] = Ability;
	SkillsList.abilityScoresByAS[SkillsList.abbreviations.indexOf("Too")] = Ability;
}

// Create the span objects for emulating smallcaps
// non-letter characters preceded by a ^ are always made big
// non-letter characters preceded by a _ are always made small
function createSmallCaps(input, fontSize, extraObj) {
	if (typePF) return input;
	var fontSizeLookup = {
		6 : 4.2,
		7: 4.9,
		8: 5.6
	};
	var fontSizeSmall = fontSizeLookup[fontSize] ? fontSizeLookup[fontSize] : fontSize * 0.7;
	// Set some things to be allways big
	var txt = input.replace(/([^\^])(:)/, "$1^$2");
	var spans = [];
	var nBig = "";
	var nSmall = "";
	var sp = "";
	var updateTxts = function(toBig, tChar) {
		if (toBig && nSmall) {
			var spObj = {
				text : nSmall.toUpperCase(),
				textSize : fontSizeSmall
			};
			if (extraObj) MergeRecursive(spObj, extraObj);
			spans.push(spObj);
			nSmall = "";
		} else if (nBig) {
			var spObj = {
				text : nBig.toUpperCase(),
				textSize : fontSize
			};
			if (extraObj) MergeRecursive(spObj, extraObj);
			spans.push(spObj);
			nBig = "";
		}
		if (toBig) {
			nBig += tChar;
		} else {
			nSmall += tChar;
		}
		sp = "";
	}
	for (var t = 0; t < txt.length; t++) {
		var aTxt = txt[t];
		if (aTxt == " ") {
			sp += " ";
		} else if (aTxt == "^" || aTxt == "_") {
			updateTxts(aTxt == "^", sp+txt[t+1]);
			t++;
		} else {
			updateTxts(!isNaN(aTxt) || ((/\w/).test(aTxt) && aTxt == aTxt.toUpperCase()), sp+aTxt);
		};
	}
	if (nSmall) updateTxts(true, "");
	if (nBig) updateTxts(false, "");
	return spans;
}
function SetRichTextFields(onlyAttackTitles, onlySkills) {
	var AScompA = What("Template.extras.AScomp").split(",");

	//set the skills
	var alphaB = Who("Text.SkillsNames") === "alphabeta";
	var skillTXT = [];
	var PFcolor = ["RGB", 0.658, 0.658, 0.654];
	for (var s = 0; s < (SkillsList.abbreviations.length - 2); s++) {
		var sNm = alphaB ? SkillsList.names[s] : SkillsList.namesByAS[s];
		var sAS = alphaB ? SkillsList.abilityScores[s] : SkillsList.abilityScoresByAS[s];
		if (typePF) {
			skillTXT.push({text : sNm + " ", textSize: 7});
			skillTXT.push({text : "(" + sAS + ")\n", textSize: 7, textColor: PFcolor});
			skillTXT.push({text : "\n", textSize: 6});
		} else {
			skillTXT.push({text : sNm + " ", textSize: 9});
			skillTXT.push({text : "(" + sAS.toUpperCase() + ")\n", textSize: 7});
			skillTXT.push({text : "\n", textSize: 5});
		}
	}
	var sLoop = typePF ? AScompA : [""];
	for (var A = 0; A < sLoop.length; A++) {
		tDoc.getField(sLoop[A] + "Text.SkillsNames").richValue = skillTXT;
	}
	if (typePF || onlySkills) return; //don't do this function in the Printer-Friendly version

	rtSpans = createSmallCaps("Prof  Ability", 6);
	for (var A = 0; A < AScompA.length; A++) {
		tDoc.getField(AScompA[A] + "Attack.Titles").richValue = rtSpans;
	}
	if (onlyAttackTitles) return; // don't do the rest of the function

	tDoc.getField("Attuned Magic Items Title").richValue = createSmallCaps("Attuned Magical Items", 7).concat(createSmallCaps(" ^(max ^3^)", 6));

	rtSpans = createSmallCaps("Loc", 7, {alignment : "center"});
	tDoc.getField("Adventuring Gear Location.Title").richValue = rtSpans;
	tDoc.getField("Extra.Gear Location.Title").richValue = rtSpans;

	// the weapon and armor proficiency names
	var themeColor = ColorList[What("Color.Theme")].RGB;
	tDoc.getField("Text.Armor Proficiencies").richValue = createSmallCaps("Armor:", 8, {textColor : themeColor});
	tDoc.getField("Text.Weapon Proficiencies").richValue = createSmallCaps("Weapons:", 8, {textColor : themeColor});

	// the equipment table headers
	var LbKg = What("Unit System") === "imperial";
	rtSpans = createSmallCaps(What("Unit System") === "imperial" ? "LBs" : "Kg", 7, {alignment : "center"});
	tDoc.getField("Display.Weighttxt.LbKg").richValue = rtSpans;
	tDoc.getField("Display.Weighttxt.LbKgPage3").richValue = rtSpans;
	for (var A = 0; A < AScompA.length; A++) {
		tDoc.getField(AScompA[A] + "Comp.eqp.Display.Weighttxt").richValue = rtSpans;
	}
}

//make all the fields, with some exceptions, read-only (toggle = true) or editable (toggle = false)

// Make most fields read-only for use with Adobe Acrobat for Mobile Devices
// toggle = true for making it mobile ready or toggle = false for the other way around
// If no toggle is defined, do the opposite of the current state
function MakeMobileReady(toggle) {
	if (!CurrentVars.mobileset) { // if the variable is not defined yet, define it now
		CurrentVars.mobileset = {
			active : false,
			readonly : [],
			hidden : []
		}
	}
	if (toggle !== undefined && ((CurrentVars.mobileset.active && toggle) || (!CurrentVars.mobileset.active && !toggle))) return;

	var nowWhat = !CurrentVars.mobileset.active; // Toggle the current state

	// Start progress bar and stop calculations
	var thermoTxt = thermoM(nowWhat ? "Making the sheet ready for mobile use..." : "Making all form fields editable again...");
	calcStop();

	if (nowWhat) {
		//first undo the visibility of the blue-text fields, if visible
		ToggleBlueText(false);

		CurrentVars.mobileset.readonly = [];
		CurrentVars.mobileset.hidden = [];
		var exceptionArray = [
			"Link to downloadpage",
			"Link to donation",
			"Inspiration",
			"HD1 Used",
			"HD2 Used",
			"HD3 Used",
			"AC during Rest",
			"Add Experience",
			"Saving Throw advantages / disadvantages",
			"Vision",
			"Speed",
			"Speed encumbered",
			"Platinum Pieces",
			"Gold Pieces",
			"Electrum Pieces",
			"Silver Pieces",
			"Copper Pieces",
			"Extra.Other Holdings",
			"AmmoLeftDisplay.Name",
			"AmmoLeftDisplay.Amount",
			"AmmoRightDisplay.Name",
			"AmmoRightDisplay.Amount",
			"Reaction Used This Round"
		];
		var exceptionRegex = /Comp\.Use\.HD\.Used|Comp\.Use\.HP|Cnote\.Left|Cnote\.Right|Comp\.eqp\.Notes|Comp\.img\.Notes|Notes\.Left|Notes\.Right|HP Max|HP Max Current|HP Temp|HP Current|Limited Feature Used | Adv| Dis|AmmoLeft\.|AmmoRight\.|Death Save |\.DeathSave\.|Resistance Damage Type |Adventuring Gear Row |Adventuring Gear Location\.Row |Adventuring Gear Amount |Adventuring Gear Weight |Language |Tool |Valuables|Extra\.Exhaustion Level |Extra\.Condition |Extra\.Gear Row |Extra\.Gear Location\.Row |Extra\.Gear Amount |Extra\.Gear Weight |Extra\.Notes|Background_|SpellSlots\.Checkboxes\.|SpellSlots2\.Checkboxes\./;
		var tooMuchExceptionRegex = /AC Stealth Disadvantage|button|Attack\.\d+\.Weapon$/i;
		var totLen = tDoc.numFields;
		for (var F = 0; F < totLen; F++) {
			var Fname = tDoc.getNthFieldName(F);
			if (!Fname) continue;
			var Ffield = tDoc.getField(Fname);

			// Check if field is not in one of the exceptionlists, but continue if it is in the tooMuchExceptionRegex
			var isException = !tooMuchExceptionRegex.test(Fname) && (exceptionArray.indexOf(Fname) !== -1 || (/^(Bonus |Re)?action \d+/i).test(Fname) || exceptionRegex.test(Fname));
			if (CurrentVars.manual.attacks && !isException) isException = (/Attack\./).test(Fname);
			if (CurrentVars.manual.feats && !isException) isException = (/^(?!.*Button)Feat .+\d+$/).test(Fname);
			if (CurrentVars.manual.items && !isException) isException = (/^(?!.*Button)Extra\.Magic Item .*\d+$/).test(Fname);
			if (isException) continue;

			//add fields that are visible and not read-only to array and make them read-only
			if (Ffield.display === display.visible && Ffield.readonly === false) {
				CurrentVars.mobileset.readonly.push(Fname);
				Ffield.readonly = true;
			}
			//add fields that are visible but non-printable to an array and make them hidden
			if (Ffield.display === display.noPrint) {
				CurrentVars.mobileset.hidden.push(Fname);
				Hide(Fname);
			}

			thermoM(F/totLen); // Increment the progress bar
		};

		// We also have to set all the spell sheet checkboxes back to readable, if they are visible
		var SSfrontA = What("Template.extras.SSfront").split(",");
		var SSmoreA = What("Template.extras.SSmore").split(",");
		SSmoreA[0] = SSfrontA[1];
		if (!SSmoreA[0]) SSmoreA.shift();
		for (var SS = 0; SS < SSmoreA.length; SS++) {
			var maxLine = FieldNumbers.spells[SSfrontA[1] && SSmoreA[SS] === SSfrontA[1] ? 0 : 1];
			for (var S = 0; S < maxLine; S++) {
				var SSbox = tDoc.getField(SSmoreA[SS] + "spells.checkbox." + S);
				if (SSbox.display === display.visible) SSbox.readonly = false;
			}
		}
		// Hide the D20 warning in the corner so that it won't interfere with the bug in Acrobat Reader for iOS/Android
		if (tDoc.getField("d20warning")) tDoc.getField("d20warning").rect = [0,0,0,0];
	} else {
		var totLen = CurrentVars.mobileset.readonly.length + CurrentVars.mobileset.hidden.length + 1;
		for (var RO = 0; RO < CurrentVars.mobileset.readonly.length; RO++) {
			Editable(CurrentVars.mobileset.readonly[RO]);
			thermoM(RO/totLen); // Increment the progress bar
		}
		var strtLen = CurrentVars.mobileset.readonly.length;
		for (var DP = 0; DP < CurrentVars.mobileset.hidden.length; DP++) {
			DontPrint(CurrentVars.mobileset.hidden[DP]);
			thermoM((DP+strtLen)/totLen); // Increment the progress bar
		}
		CurrentVars.mobileset.readonly = [];
		CurrentVars.mobileset.hidden = [];
	}

	CurrentVars.mobileset.active = nowWhat;
	SetStringifieds("vars"); // Save the settings to a field
	thermoM(thermoTxt, true); // Stop progress bar
}

//Calculate the weight of a column of items in the equipment section [field calculation]
function CalcWeightSubtotal() {
	var type = (/extra.*/i).test(event.target.name) ? "Extra.Gear " : ((/Adventuring.*/i).test(event.target.name) ? "Adventuring Gear " : event.target.name.substring(0, event.target.name.indexOf("Comp.") + 14));
	var column = event.target.name.slice(-4) === "Left" ? "Left" : (event.target.name.slice(-5) === "Right" ? "Right" : "Middle");
	var allGear = type === "Extra.Gear " ? FieldNumbers.extragear : (type === "Adventuring Gear " ? FieldNumbers.gear : FieldNumbers.compgear);
	var division = typePF && type === "Adventuring Gear " ? 3 : 2;
	var divisionHalf = typePF && type === "Adventuring Gear " ? 1.5 : 2;
	var total = column === "Right" ? allGear : Math.round(column === "Left" ? allGear / division : allGear / divisionHalf);
	var start = column === "Left" ? 1 : Math.round(column === "Right" ? allGear / divisionHalf : allGear / division) + 1;

	if (column === "Middle" && event.target.name.indexOf("Middle") === -1) {
		column = "All";
		start = 1;
		total = allGear;
	}

	var totalweight = 0;
	for (var i = start; i <= total; i++) {
		var amount = What(type + "Amount " + i);
		var weight = What(type + "Weight " + i);
		if (amount && isNaN(amount) && amount.indexOf(",") !== -1) {
			amount = parseFloat(amount.replace(",", "."));
		}
		if (weight && isNaN(weight) && weight.indexOf(",") !== -1) {
			weight = parseFloat(weight.replace(",", "."));
		}

		if (weight) {
			if (amount === "" || isNaN(amount)) {
				totalweight += weight;
			} else {
				totalweight += amount * weight;
			}
		}
	}
	event.value = totalweight === 0 ? "" : totalweight;
}

//Calculate the total weight carried, based on the value of the remember fields (field calculation)
function CalcWeightCarried(manualTrigger) {
	if (!CurrentVars.weight) {
		CurrentVars.weight = ["cCoi", "cP2L", "cP2R"];
		if (typePF) CurrentVars.weight.push("cP2M");
		SetStringifieds("vars");
	}

	var coinMod = What("Unit System") === "imperial" ? 50 : 100;
	var weightTypes = {
		cArm : "AC Armor Weight",
		cShi : "AC Shield Weight",
		cWea : Array.apply(null, Array(FieldNumbers.attacks)).map(function (n, idx) {
			return "BlueText.Attack." + (idx+1) + ".Weight";
		}),
		cAmL : "AmmoLeftDisplay.Weight",
		cAmR : "AmmoRightDisplay.Weight",
		cCoi : ["Platinum Pieces", "Gold Pieces", "Electrum Pieces", "Silver Pieces", "Copper Pieces"],
		cP2L : "Adventuring Gear Weight Subtotal Left",
		cP2M : "Adventuring Gear Weight Subtotal Middle",
		cP2R : "Adventuring Gear Weight Subtotal Right",
		cP3L : "Extra.Gear Weight Subtotal Left",
		cP3R : "Extra.Gear Weight Subtotal Right",
		cMaI : Array.apply(null, Array(FieldNumbers.magicitems)).map(function (n, idx) {
			return "Extra.Magic Item Weight " + (idx+1);
		})
	}
	var totalWeight = 0;
	for (var i = 0; i < CurrentVars.weight.length; i++) {
		var useFld = weightTypes[CurrentVars.weight[i]];
		if (!useFld) continue;
		if (isArray(useFld)) {
			var aWeight = 0;
			for (var j = 0; j < useFld.length; j++) {
				aWeight += Number(What(useFld[j]).replace(/,/, "."));
			}
		} else {
			var aWeight = Number(What(useFld).replace(/,/, "."));
		}
		if (CurrentVars.weight[i] == "cCoi") {
			aWeight = Math.floor(aWeight / coinMod * 10) / 10;
		} else if (CurrentVars.weight[i] == "cAmL") {
			aWeight *= Number(What("AmmoLeftDisplay.Amount"));
		} else if (CurrentVars.weight[i] == "cAmR") {
			aWeight *= Number(What("AmmoRightDisplay.Amount"));
		}
		if (!isNaN(aWeight)) totalWeight += aWeight;
	}
	if (manualTrigger) {
		Value("Weight Carried", totalWeight === 0 ? "" : totalWeight);
	} else {
		event.value = totalWeight === 0 ? "" : totalWeight;
	}
}

//call this to choose which weights to add to the "Total Carried", and which weights not to add
function WeightToCalc_Button() {
	//The dialog for setting what things are added to the total weight carried on page 2
	var explTxt = 'Note that you can change the weight of the armor, shield, weapons, and ammunition on the 1st page and the magic items on the 3rd page by using the "Modifier" fields that appear when you press the "Mods" button (abacus icon) or the "Modifiers" bookmark.\nFor ammunition, only the listed "total" is counted as that already includes the unchecked ammo icons.';
	var weightOptions = ["cArm", "cShi", "cWea", "cAmL", "cAmR", "cCoi", "cP2L", "cP2R", "cP3L", "cP3R", "cMaI"];
	if (typePF) weightOptions.push("cP2M");
	var WeightToCalc_Dialog = {
		UseEnc : true,

		//when starting the dialog
		initialize : function (dialog) {
			var toLoad = {
				"rEnc" : this.UseEnc,
				"rCar" : !this.UseEnc,
				"img1" : allIcons.weight
			};
			for (var i = 0; i < weightOptions.length; i++) {
				toLoad[weightOptions[i]] = CurrentVars.weight.indexOf(weightOptions[i]) !== -1
			}
			dialog.load(toLoad);
		},

		//when pressing the ok button
		commit : function (dialog) {
			var oResult = dialog.store();
			CurrentVars.weight = [];
			for (var i = 0; i < weightOptions.length; i++) {
				if (oResult[weightOptions[i]]) CurrentVars.weight.push(weightOptions[i]);
			}
			this.UseEnc = oResult["rEnc"];
			SetStringifieds("vars");
		},

		description : {
			name : "CARRIED WEIGHT DIALOG",
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
						name : "Weight Carried Settings"
					}]
				}, {
					type : "static_text",
					item_id : "text",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					char_width : 50,
					name : explTxt
				}, {
					type : "cluster",
					alignment : "align_fill",
					align_children : "align_left",
					font : "heading",
					bold : true,
					name : "Include in the Carried Weight on the second page",
					elements : [{
						type : "view",
						char_height : 2,
						align_children : "align_row",
						elements : [{
							type : "check_box",
							item_id : "cArm",
							name : "Armor",
							char_width : 22
						}, {
							type : "static_text",
							item_id : "tArm",
							name : (typePF ? '"Armor' : '"Defense') + '" section on the 1st page.'
						} ]
					}, {
						type : "view",
						char_height : 2,
						align_children : "align_row",
						elements : [{
							type : "check_box",
							item_id : "cShi",
							name : "Shield",
							char_width : 22
						}, {
							type : "static_text",
							item_id : "tShi",
							name : (typePF ? '"Armor' : '"Defense') + '" section on the 1st page.'
						} ]
					}, {
						type : "view",
						align_children : "align_row",
						char_height : 2,
						elements : [{
							type : "check_box",
							item_id : "cWea",
							name : "Weapons",
							char_width : 22
						}, {
							type : "static_text",
							item_id : "tWea",
							name : '"Attacks" section on the 1st page.'
						} ]
					}, {
						type : "view",
						char_height : 2,
						align_children : "align_row",
						elements : [{
							type : "check_box",
							item_id : "cAmL",
							name : "Ammunition on the left",
							char_width : 22
						}, {
							type : "static_text",
							item_id : "tAmL",
							name : '"Attacks" section on the 1st page.'
						} ]
					}, {
						type : "view",
						char_height : 2,
						align_children : "align_row",
						elements : [{
							type : "check_box",
							item_id : "cAmR",
							name : "Ammunition on the right",
							char_width : 22
						}, {
							type : "static_text",
							item_id : "tAmR",
							name : '"Attacks" section on the 1st page.'
						} ]
					}, {
						type : "view",
						char_height : 2,
						align_children : "align_row",
						elements : [{
							type : "check_box",
							item_id : "cCoi",
							name : "Coins",
							char_width : 22
						}, {
							type : "static_text",
							item_id : "tCoi",
							name : '"Equipment" section on the 2nd page (1 lb per 50).'
						} ]
					}, {
						type : "view",
						char_height : 2,
						align_children : "align_row",
						elements : [{
							type : "check_box",
							item_id : "cP2L",
							name : "Left column equipment",
							char_width : 22
						}, {
							type : "static_text",
							item_id : "tP2L",
							name : '"Equipment" section on the 2nd page.'
						} ]
					}].concat(typePF ? [{
						type : "view",
						char_height : 2,
						align_children : "align_row",
						elements : [{
							type : "check_box",
							item_id : "cP2M",
							name : "Middle column equipment",
							char_width : 22
						}, {
							type : "static_text",
							item_id : "tP2M",
							name : '"Equipment" section on the 2nd page.'
						} ]
					}] : []).concat([{
						type : "view",
						char_height : 2,
						align_children : "align_row",
						elements : [{
							type : "check_box",
							item_id : "cP2R",
							name : "Right column equipment",
							char_width : 22
						}, {
							type : "static_text",
							item_id : "tP2R",
							name : '"Equipment" section on the 2nd page.'
						} ]
					}, {
						type : "view",
						char_height : 2,
						align_children : "align_row",
						elements : [{
							type : "check_box",
							item_id : "cP3L",
							name : "Left column extra equipment",
							char_width : 22
						}, {
							type : "static_text",
							item_id : "tP3L",
							name : '"Extra Equipment" section on the 3rd page.'
						} ]
					}, {
						type : "view",
						align_children : "align_row",
						char_height : 2,
						elements : [{
							type : "check_box",
							item_id : "cP3R",
							name : "Right column extra equipment",
							char_width : 22
						}, {
							type : "static_text",
							item_id : "tP3R",
							name : '"Extra Equipment" section on the 3rd page.'
						} ]
					}, {
						type : "view",
						align_children : "align_row",
						char_height : 2,
						elements : [{
							type : "check_box",
							item_id : "cMaI",
							name : "Magic items",
							char_width : 22
						}, {
							type : "static_text",
							item_id : "tMaI",
							name : '"Magic Items" section on the 3rd (and overflow) page.'
						} ]
					} ])
				}, {
					type : "cluster",
					alignment : "align_fill",
					align_children : "align_left",
					name : "Weight allowance rules to use (PHB, page 176)",
					bold : true,
					font : "heading",
					elements : [{
						type : "radio",
						item_id : "rCar",
						group_id : "encu",
						name : "Use the fixed carrying capacity rules"
					}, {
						type : "radio",
						item_id : "rEnc",
						group_id : "encu",
						name : "Use the variant encumbrance rules"
					} ]
				}, {
					type : "ok_cancel",
					ok_name : "Apply"
				} ]
			} ]
		}
	};

	var isEnc = tDoc.getField("Weight Carrying Capacity.Field").display === display.hidden;
	WeightToCalc_Dialog.UseEnc = isEnc;

	app.execDialog(WeightToCalc_Dialog);

	if (WeightToCalc_Dialog.UseEnc !== isEnc) SetEncumbrance(WeightToCalc_Dialog.UseEnc);

	CalcWeightCarried(true); // manual trigger the field calculation for the total field
};

//set the type of encumbrance rules to use (if variant = true, use the variant rules)
function SetEncumbrance(variant) {
	var ShowHide = variant ? "Show" : "Hide";
	var HideShow = variant ? "Hide" : "Show";
	tDoc[HideShow]("Weight Carrying Capacity");
	tDoc[ShowHide]("Weight Heavily Encumbered");
};

//see if a known ammunition is in a string, and return the ammo name
function ParseAmmo(input, onlyInv) {
	var found = "";
	if (!input) return found;

	input = removeDiacritics(input).toLowerCase();
	var foundLen = 0;
	var foundDat = 0;
	var keyLen = 0;
	//scan string for all ammunition, including the alternative spellings
	for (var key in AmmoList) {
		if ((onlyInv && AmmoList[key].weight == undefined) // see if only doing equipable items
			|| testSource(key, AmmoList[key], "ammoExcl") // test if the ammo or its source isn't excluded
		) continue;

		var tempDate = sourceDate(AmmoList[key].source);

		// see if any of the alternatives match
		if (AmmoList[key].alternatives) {
			for (var z = 0; z < AmmoList[key].alternatives.length; z++) {
				var theAlt = AmmoList[key].alternatives[z];
				var doTest = typeof theAlt != "string";
				var altLen = theAlt.toString().length;

				if (altLen < foundLen || (altLen == foundLen && tempDate < foundDat) // only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source date. This differs from the regExpSearch objects
					|| (doTest ? !theAlt.test(input) : input.indexOf(theAlt) === -1) // see if string matches
				) continue;


				// we have a match, set the values
				found = key;
				foundLen = altLen;
				keyLen = doTest ? key.length : foundLen;
				foundDat = tempDate;
			}
		};

		// now see if the parent is a (better) match
		if (found == key // stop if one of the alternatives already matched
			|| key.length < foundLen || (key == foundLen && tempDate < foundDat) // only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source. This differs from the regExpSearch objects
			|| input.indexOf(key) === -1 // see if string matches
		) continue;

		// we have a match, set the values
		found = key;
		foundLen = key.length;
		keyLen = foundLen;
		foundDat = tempDate;
	}
	return onlyInv && found ? [found, keyLen] : found;
}

//Reset the visibility of all the ammo fields of a particular side (input = "Left" or "Right")
function ResetAmmo(AmmoLeftRight) {
	AmmoLeftRight = AmmoLeftRight.substring(0, 4) === "Ammo" ? AmmoLeftRight : "Ammo" + AmmoLeftRight;
	Hide(AmmoLeftRight);
	Show(AmmoLeftRight + ".Icon.Arrows");
	Show(AmmoLeftRight + ".Top");
	Show(AmmoLeftRight + ".Base");
	Value(AmmoLeftRight + "Display.MaxAmount", 20);
}

//Set the Ammo fields upon filling out the Ammo name
function ApplyAmmo(inputtxt, Fld) {
	if (IsSetDropDowns) return; // when just changing the dropdowns, don't do anything

	calcStop();
	var LeftRight = !event.target || !event.target.name || event.target.name.substring(0, 8) === "AmmoLeft" ? "AmmoLeft" : event.target.name.substring(0, 9) === "AmmoRight" ? "AmmoRight" : "Ammo" + Fld;
	var theAmmo = ParseAmmo(inputtxt);
	var parseAsWeapon = theAmmo ? false : ParseWeapon(inputtxt);
	if (parseAsWeapon && AmmoList[parseAsWeapon]) theAmmo = parseAsWeapon;

	if (theAmmo) {
		var aList = AmmoList[theAmmo];
		Hide(LeftRight);
		var ammoIcon = AmmoIcons[aList.icon];
		if (!ammoIcon) ammoIcon = AmmoIcons.Arrows;
		Show(LeftRight + ".Icon." + aList.icon);
		for (var i = 0; i < ammoIcon.checks.length; i++) {
			Show(LeftRight + ammoIcon.checks[i]);
		}
		var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
		var theWeight = aList.weight ? RoundTo(aList.weight * massMod, 0.001, true) : 0;
		Value(LeftRight + "Display.Weight", theWeight);
		Value(LeftRight + "Display.MaxAmount", ammoIcon.display);
	} else {
		tDoc.resetForm([LeftRight + "Display.Weight"]);
		if (!inputtxt) {
			ResetAmmo(LeftRight);
			tDoc.resetForm([LeftRight + "Display.Amount"]);
		}
	}

	LoadAmmo();
}

//Add the ammunition to one of the ammo fields. Inputtxt must be a known AmmoList entry
function AddAmmo(inputtxt, amount) {
	var AmmoFlds = [ "AmmoLeftDisplay.Name", "AmmoRightDisplay.Name" ];
	var AmountFlds = [ "AmmoLeftDisplay.Amount", "AmmoRightDisplay.Amount" ];
	amount = amount && !isNaN(Number(amount)) ? Number(amount) : 0;
	for (var n = 1; n <= 2; n++) {
		for (var i = 0; i < AmmoFlds.length; i++) {
			var next = tDoc.getField(AmmoFlds[i]);
			if (n === 1 && ((RegExp(inputtxt.RegEscape(), "i")).test(next.value) || next.value.toLowerCase().indexOf(inputtxt.toLowerCase()) !== -1)) {
				if (amount) tDoc.getField(AmountFlds[i]).value += amount;
				return;
			} else if (n === 2 && next.value === "") {
				next.value = AmmoList[inputtxt] ? AmmoList[inputtxt].name : inputtxt;
				if (amount) Value(AmountFlds[i], amount);
				return;
			}
		}
	}
}

//Remove the ammunition if it exists in one of the ammo fields
function RemoveAmmo(inputtxt) {
	var AmmoFlds = [ "AmmoLeftDisplay.Name", "AmmoRightDisplay.Name" ];
	for (var i = 0; i < AmmoFlds.length; i++) {
		var next = tDoc.getField(AmmoFlds[i]);
		if (next.value.toLowerCase().indexOf(inputtxt.toLowerCase()) !== -1) {
			next.value = "";
			break;
		}
	}
}

//Set the 'quiver' to correspond with the amount of ammo
function LoadAmmo(Amount, Fld) {
	calcStop();

	var LeftRight = event.target.name.substring(0, 8) === "AmmoLeft" ? "AmmoLeft" : event.target.name.substring(0, 9) === "AmmoRight" ? "AmmoRight" : "Ammo" + Fld;
	var Units = Amount !== undefined ? Amount : Number(What(LeftRight + "Display.Amount"));
	var Counter = 0;
	var NextFld = "";
	var NextFldVis = 0;

	if (event.target.name.slice(-6) === "Amount" || event.target.name.slice(-5) === "Reset" || event.target.name.slice(-4) === "Name") {
		Value(LeftRight + "Display.SaveAmount", Units);
		Value(LeftRight + "Display.CurrentAmount", Math.min(Units, What(LeftRight + "Display.MaxAmount")));
	}

	//stop the function if Units are 0
	if (Number(Units) === 0) {
		if (event.target.name.indexOf("Display") !== -1) {
			tDoc.resetForm([LeftRight]);
		}
		return;
	}

	//go through evey ammo field and see if they are visible. If visible, update counter and check if the field should be checked (ammo unavailable), or uncheck (ammo available)
	if (tDoc.getField(LeftRight + ".Bullet.1").display === display.visible) { //only look at the bullet fields
		for (var i = 1; i <= 50; i++) {
			NextFld = LeftRight + ".Bullet." + i;
			NextFldVis = tDoc.getField(NextFld).display
			if (NextFldVis === display.visible) {
				Counter += 1;
				if (Counter <= Units) {
					Checkbox(NextFld, false);
				} else {
					Checkbox(NextFld, true);
				}
			}
		}
	} else { //look into the top/base fields
		for (var i = 1; i <= 20; i++) {
			var TopBase = i <= 10 ? ".Top." : ".Base.";
			try {
				NextFld = LeftRight + TopBase + i;
				NextFldVis = tDoc.getField(NextFld).display;
			} catch (err) {
				NextFld = LeftRight + TopBase + "Axe." + i;
				NextFldVis = tDoc.getField(NextFld).display;
			}
			if (NextFldVis === display.visible) {
				Counter += 1;
				if (Counter <= Units) {
					Checkbox(NextFld, false);
				} else {
					Checkbox(NextFld, true);
				}
			}
		}
	}
}

//set the dropdown menus for ammo
function SetAmmosdropdown(forceTooltips) {
	var tempString = "Select or type in the ammunition you want to use and all its attributes will be filled out automatically.";
	tempString += "\n\n" + toUni("Ammunition weight") + "\nThe weight of the ammo can be added to the total weight carried on the 2nd page. In order to do this you have to push the \"Weight\" button in the \"JavaScript Window\".";
	tempString += "\nYou can change the weight of the ammunition in the \"override section\" (a.k.a. the \"blue text fields\").";
	tempString += "\n\n" + toUni("Blue text fields") + "\nIn order to see these you first need to push the \"Mods\" button in the \"JavaScript Window\".";
	var theDropList = [""];

	for (ammo in AmmoList) {
		var theAmmo = AmmoList[ammo];
		if (testSource(ammo, theAmmo, "ammoExcl")) continue; // test if the weapon or its source is set to be included
		if (theDropList.indexOf(theAmmo.name) === -1) theDropList.push(theAmmo.name);
	}
	theDropList.sort();

	var listToSource = theDropList.toSource();
	if (tDoc.getField("AmmoLeftDisplay.Name").submitName === listToSource) {
		if (forceTooltips) {
			AddTooltip("AmmoLeftDisplay.Name", tempString);
			AddTooltip("AmmoRightDisplay.Name", tempString);
		}
		return; //no changes, so no reason to do this
	}
	tDoc.getField("AmmoLeftDisplay.Name").submitName = listToSource;

	var remAmmo = What("AmmoLeftDisplay.Name");
	tDoc.getField("AmmoLeftDisplay.Name").setItems(theDropList);
	Value("AmmoLeftDisplay.Name", remAmmo, tempString);

	remAmmo = What("AmmoRightDisplay.Name");
	tDoc.getField("AmmoRightDisplay.Name").setItems(theDropList);
	Value("AmmoRightDisplay.Name", remAmmo, tempString);
}

//Toggle the visibility of the secondary ability save DC. ShowHide = "show" or "hide".
function Toggle2ndAbilityDC(ShowHide) {
	var isVis2nd = isDisplay("Image.SaveDC" + (typePF ? "" : ".2")) === 0;

	if (ShowHide && (/show/i).test(ShowHide) == isVis2nd) {
		return; //stop the function, there is nothing to do
	}

	var theCaption = isVis2nd ? "Show 2nd DC" : "Hide 2nd DC";
	var HiddenVisible = isVis2nd ? "Hide" : "Show";
	var VisibleHidden = isVis2nd ? "Show" : "Hide";
	var HiddenNoPrint = !isVis2nd && CurrentVars.bluetxt ? "DontPrint" : "Hide";

	for (var L = 0; L <= 2; L++) {
		tDoc.getField("ShowHide 2nd DC").buttonSetCaption(theCaption, L);
	}

	if (typePF) {
		var DC2array = [
			"Image.SaveDC",
			"Spell DC 2 Mod",
			"Spell save DC 2",
			"Spell DC 1 Mod.1"
		];
		tDoc[VisibleHidden]("Spell DC 1 Mod.0");
	} else {
		var DC1array = [
			"Text.SaveDC.1",
			"Image.SaveDCarrow.1",
			"Image.SaveDC.1",
			"Spell DC 1 Mod",
			"Spell save DC 1",
			"Spell DC 1 Bonus"
		];
		var DC2array = [
			"Text.SaveDC.2",
			"Image.SaveDCarrow.2",
			"Image.SaveDC.2",
			"Spell DC 2 Mod",
			"Spell save DC 2"
		];

		var toMove = isVis2nd ? 27 : -27;
		for (var i = 0; i < DC1array.length; i++) {
			var theFld = tDoc.getField(DC1array[i]);
			var gRect = theFld.rect; // Get the location of the field on the sheet
			gRect[0] += toMove; // Add the widen amount to the upper left x-coordinate
			gRect[2] += toMove; // Add the widen amount to the lower right x-coordinate
			theFld.rect = gRect; // Update the value of b.rect
			theFld.value = theFld.value; // Re-input the value as to counteract the changing of font rendering
		}
	}

	for (var j = 0; j < DC2array.length; j++) {
		tDoc[HiddenVisible](DC2array[j]);
	}
	tDoc[HiddenNoPrint]("Spell DC 2 Bonus");
}

//change the colorscheme that is used for the entire sheet
function ApplyColorScheme(aColour) {
	if (typePF || (!aColour && What("Color.Theme") === tDoc.getField("Color.Theme").defaultValue)) return; //don't do this function in the Printer-Friendly version or if resetting with the default colour still active
	var colour = aColour ? aColour.toLowerCase() : What("Color.Theme");
	//stop the function if the input color is not recognized
	if (!ColorList[colour]) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying " + colour + " color theme...");
	calcStop();

	//set the chosen color to a place it can be found again
	Value("Color.Theme", colour);

	if (tDoc.info.AdvLogOnly) {
		var ALlogA = What("Template.extras.ALlog").split(",");
		var theIconH = tDoc.getField("SaveIMG.Header.Left." + colour).buttonGetIcon();
		var theIconD = tDoc.getField("SaveIMG.Divider." + colour).buttonGetIcon();
		for (tA = 0; tA < ALlogA.length; tA++) {
			tDoc.getField(ALlogA[tA] + "Line").fillColor = ColorList[colour].CMYK;
			tDoc.getField(ALlogA[tA] + "Button").strokeColor = ColorList[colour].CMYK;
			tDoc.getField(ALlogA[tA] + "Image.Header.Left").buttonSetIcon(theIconH);
			tDoc.getField(ALlogA[tA] + "Image.Divider").buttonSetIcon(theIconD);
		}
		thermoM(thermoTxt, true); // Stop progress bar
		return; // do not continue any further with this function
	}

	//get any extra prefixes
	var makeTempArray = function (template) {
		var tempReturn = [];
		var temp = What("Template.extras." + template);
		if (temp) {
			temp = temp.split(",");
			temp.splice(temp.indexOf(""), 1);
			tempReturn = temp;
		}
		return tempReturn;
	}
	var AScompA = makeTempArray("AScomp");
	var ASnotesA = makeTempArray("ASnotes");
	var WSfrontA = makeTempArray("WSfront");
	var ALlogA = makeTempArray("ALlog");

	var SSmoreA = What("Template.extras.SSmore").split(","); //here we do include the first "" value
	var SSfrontA = What("Template.extras.SSfront") ? What("Template.extras.SSfront").split(",")[1] : false;
	if (SSfrontA) SSmoreA.push(SSfrontA);

	// set the fill colours of the spellsheet boxes
	var fillListIfDontPrint = [];
	for (var SS = 0; SS < SSmoreA.length; SS++) {
		var maxSpells = SSmoreA[SS] === SSfrontA ? FieldNumbers.spells[0] : FieldNumbers.spells[1];
		for (var L = 0; L <= maxSpells; L++) {
			fillListIfDontPrint.push(SSmoreA[SS] + "spells.checkbox." + L);
		}
	}
	for (fLdp = 0; fLdp < fillListIfDontPrint.length; fLdp++) {
		var thefLdp = tDoc.getField(fillListIfDontPrint[fLdp]);
		if (thefLdp.display === display.noPrint && thefLdp.fillColor[0] !== "T") {
			thefLdp.fillColor = ColorList[colour].CMYK;
		}
	}

	//first do the Spell Sheets, which have their very peculiar way of naming
	var SSimgFields = [
		"Title",
		"Header.Left",
		"Divider",
		"DividerFlip"
	];
	for (var i = 0; i < SSimgFields.length; i++) {
		theIcon = tDoc.getField("SaveIMG." + SSimgFields[i] + "." + colour).buttonGetIcon();
		if (SSfrontA && SSimgFields[i] === "Title") {
			tDoc.getField(SSfrontA + "Image." + SSimgFields[i]).buttonSetIcon(theIcon);
		} else if (SSimgFields[i] !== "Title") { for (var SS = 0; SS < SSmoreA.length; SS++) {
			var maxLoop = SSimgFields[i] === "Header.Left" ? 3 : 9;
			var extraTxt = SSimgFields[i] === "Header.Left" ? "spellshead." : "spellsdiv.";
			for (var L = 0; L <= maxLoop; L++) {
				tDoc.getField(SSmoreA[SS] + extraTxt + "Image." + SSimgFields[i] + "." + L).buttonSetIcon(theIcon);
			}
		}}
	}

	if (tDoc.info.SpellsOnly) { // if this pdf is only filled with spell sheets, we don't need to go on
		thermoM(thermoTxt, true); // Stop progress bar
		return; // do not continue any further with this function
	}

	//create the lists of the borders, fill, and text of the following fields
	var borderList = [
		"Circle",
		"Button",
		"Attack.Button",
		"Comp.Use.Attack.Button",
		"Comp.eqpB"
	];
	var fillList = [
		"Line"
	];
	var textList = [
		"Background Feature",
		"Background_Faction.Title",
		"Background_FactionRank.Title",
		"Background_Renown.Title",
		"Text.Armor Proficiencies",
		"Text.Weapon Proficiencies"
	];

	//add any possible other template prefixes to the list
	if (AScompA[0]) {
		for (tA = 0; tA < AScompA.length; tA++) {
			borderList.push(AScompA[tA] + "Circle");
			borderList.push(AScompA[tA] + "Comp.Use.Attack.Button");
			borderList.push(AScompA[tA] + "Comp.eqpB");
			fillList.push(AScompA[tA] + "Line");
		}
	}
	if (WSfrontA[0]) {
		for (tA = 0; tA < WSfrontA.length; tA++) {
			borderList.push(WSfrontA[tA] + "Circle");
			fillList.push(WSfrontA[tA] + "Line");
		}
	}
	if (ALlogA[0]) {
		for (tA = 0; tA < ALlogA.length; tA++) {
			fillList.push(ALlogA[tA] + "Line");
		}
	}

	//add more fields to the list; fields that are not part of the templates
	for (var i = 1; i <= FieldNumbers.gear; i++) {
		borderList.push("Adventuring Gear Button " + i);
	}
	for (var i = 1; i <= FieldNumbers.magicitems; i++) {
		borderList.push("Extra.Magic Item Button " + i);
		textList.push("Extra.Magic Item " + i);
	}
	for (var i = 1; i <= FieldNumbers.extragear; i++) {
		borderList.push("Extra.Gear Button " + i);
	}
	for (var i = 1; i <= FieldNumbers.feats; i++) {
		borderList.push("Feat Button " + i);
		textList.push("Feat Name " + i);
	}

	thermoM(2/7); //increment the progress dialog's progress

	//change the colors of the borders, fill, and text
	for (bL = 0; bL < borderList.length; bL++) {
		tDoc.getField(borderList[bL]).strokeColor = ColorList[colour].CMYK;
	}
	for (fL = 0; fL < fillList.length; fL++) {
		tDoc.getField(fillList[fL]).fillColor = ColorList[colour].CMYK;
	}
	for (tL = 0; tL < textList.length; tL++) {
		tDoc.getField(textList[tL]).textColor = ColorList[colour].RGB;
	}

	//change the color of the text "Weapons:" and "Armor:" on the second page
	var armorProfArray = tDoc.getField("Text.Armor Proficiencies").richValue;
	var weaponProfArray = tDoc.getField("Text.Weapon Proficiencies").richValue;

	for (var aP = 0; aP < armorProfArray.length; aP++) {
		armorProfArray[aP].textColor = ColorList[colour].RGB;
	}
	for (var wP = 0; wP < weaponProfArray.length; wP++) {
		weaponProfArray[wP].textColor = ColorList[colour].RGB;
	}

	tDoc.getField("Text.Armor Proficiencies").richValue = armorProfArray;
	tDoc.getField("Text.Weapon Proficiencies").richValue = weaponProfArray;

	thermoM(3/7); //increment the progress dialog's progress

	//get a list of the image fields
	var imgFields = [
		"Level",
		"Title",
		"Divider",
		"Stats",
		"Prof",
		"Header.Left",
		"Header.Right",
		"Arrow",
		"IntArrow"
	];

	//set the colored icons
	for (var i = 0; i < imgFields.length; i++) {
		var theIcon = tDoc.getField("SaveIMG." + imgFields[i] + "." + colour).buttonGetIcon();

		temp = [""];

		if (imgFields[i] === "Divider") {
			//also set it for the divider that can be hidden on the third page
			tDoc.getField("Image.DividerExtraGear").buttonSetIcon(theIcon);
			//if divider, also add the adventurers log template names
			temp = temp.concat(ALlogA);
		} else if (imgFields[i] === "Header.Right") {
			//also set it for the header that can be hidden on the third page
			tDoc.getField("Image.Header.RightRules").buttonSetIcon(theIcon);
		}

		//if anything but level or title, also do something with the extra template pages
		if (imgFields[i] !== "Level" && imgFields[i] !== "Title" && imgFields[i] !== "Header.Right") {
			//also set it for the companion and wild shape templates names
			temp = temp.concat(AScompA);
			//if not prof or arrow, also add the wild shape templates names
			if (imgFields[i] !== "Prof" && imgFields[i] !== "Arrow") {
				temp = temp.concat(WSfrontA);
			}
		}
		//if left header, also add the notes and adventurers log templates names
		if (imgFields[i] === "Header.Left") {
			temp = temp.concat(ASnotesA).concat(ALlogA);
		}

		for (var te = 0; te < temp.length; te++) {
			tDoc.getField(temp[te] + "Image." + imgFields[i]).buttonSetIcon(theIcon);
			if ((te === 0 || temp[te].indexOf("AScomp") !== -1) && imgFields[i] === "Divider") {
				tDoc.getField(temp[te] + "Comp.eqp.Image." + imgFields[i]).buttonSetIcon(theIcon);
			}
		}
	}

	thermoM(4/7); //increment the progress dialog's progress

	//make an array of the extra companion templates with an empty value at the start (so it is never empty)
	var prefixAScomp = [""].concat(AScompA);

	//set the attack field color for any of them that is set to change together with the headers
	theIcon = tDoc.getField("SaveIMG.Attack." + colour).buttonGetIcon();
	for (var a = 1; a <= FieldNumbers.attacks; a++) {
		if (What("BlueText.Attack." + a + ".Weight Title") === "same as headers") {
			tDoc.getField("Image.Attack." + a).buttonSetIcon(theIcon);
		}
		if (a <= 3) { for (var pA = 0; pA < prefixAScomp.length; pA++) {
			if (What(prefixAScomp[pA] + "BlueText.Comp.Use.Attack." + a + ".Weight Title") === "same as headers") {
				tDoc.getField(prefixAScomp[pA] + "Image.Comp.Use.Attack." + a).buttonSetIcon(theIcon);
			}
		}}
	}

	thermoM(5/7); //increment the progress dialog's progress

	//make an array of the extra wildshape templates with an empty value at the start (so it is never empty)
	var prefixWSfront = [""].concat(WSfrontA);

	//re-do all the skill proficiencies of the companion and wild shape pages
	for (var s = 0; s < (SkillsList.abbreviations.length - 2); s++) {
		var theSkill = SkillsList.abbreviations[s];
		for (pAS = 0; pAS < prefixAScomp.length; pAS++) {
			var compSkill = prefixAScomp[pAS] + "Text.Comp.Use.Skills." + theSkill + ".Prof";
			if (What(compSkill) !== "nothing") Value(compSkill, What(compSkill));
		}

		for (pWS = 0; pWS < prefixWSfront.length; pWS++) {
			for (var w = 1; w <= 4; w++) {
				var wildSkill = prefixWSfront[pWS] + "Text.Wildshape." + w + ".Skills." + theSkill + ".Prof";
				if (What(wildSkill) !== "nothing") Value(wildSkill, What(wildSkill));
			}
		}
	}

	thermoM(6/7); //increment the progress dialog's progress

	// Set the highlighting color if it has been coupled to the headers
	if (Who("Highlighting") === "headers") {
		app.runtimeHighlightColor = LightColorList[colour];
		tDoc.getField("Highlighting").fillColor = LightColorList[colour];
	}
	// See if any of the Ability Save DC's or the HP Dragons have the color connected to this
	if (What("Color.DC").indexOf("headers") != -1) ApplyDCColorScheme();
	if (What("Color.HPDragon") == "headers") ApplyHPDragonColorScheme();

	thermoM(thermoTxt, true); // Stop progress bar
}

//change the colorscheme that is used for the dragon heads sheet
function ApplyDragonColorScheme(aColour) {
	if (typePF || (!aColour && What("Color.DragonHeads") === tDoc.getField("Color.DragonHeads").defaultValue)) return; //don't do this function in the Printer-Friendly version or if resetting with the default colour still active
	var colour = aColour ? aColour.toLowerCase() : What("Color.DragonHeads");
	var theColor = ColorList[colour].CMYK;
	var theColorDark = DarkColorList[colour];
	//stop the function if the input color is not recognized
	if (!ColorList[colour]) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying " + colour + " Dragon Heads...");
	calcStop();

	//set the chosen color to a place it can be found again
	Value("Color.DragonHeads", colour);

	//change the dragonheads
	var theIcon = tDoc.getField("SaveIMG.Dragonhead." + colour).buttonGetIcon();

	if (tDoc.info.AdvLogOnly) {
		var ALlogA = What("Template.extras.ALlog").split(",");
		var buttons = [];
		for (tA = 0; tA < ALlogA.length; tA++) {
			buttons.push(ALlogA[tA] + "AdvLog.Options");
			tDoc.getField(ALlogA[tA] + "Image.Dragonhead").buttonSetIcon(theIcon);
		}
		//set the fill and border colors of the buttons
		if (theColor && theColorDark) {
			for (var b = 0; b < buttons.length; b++) {
				tDoc.getField(buttons[b]).fillColor = theColor;
				tDoc.getField(buttons[b]).strokeColor = theColorDark;
			}
		}
		thermoM(thermoTxt, true); // Stop progress bar
		return; // do not continue any further with this function
	}

	//first do the Spell Sheets, which have their very peculiar way of naming
	var SSmoreA = What("Template.extras.SSmore").split(",");
	var SSfrontA = What("Template.extras.SSfront") ? What("Template.extras.SSfront").split(",")[1] : false;
	if (SSfrontA) SSmoreA.push(SSfrontA);
	var SSnameFields = [
		"spellshead.",
		"spellsdiv."
	];
	for (var SS = 0; SS < SSmoreA.length; SS++) {
		for (var i = 0; i < SSnameFields.length; i++) {
			var maxLoop = SSnameFields[i] === "spellshead." ? 3 : 9;
			for (var L = 0; L <= maxLoop; L++) {
				tDoc.getField(SSmoreA[SS] + SSnameFields[i] + "Image.Dragonhead." + L).buttonSetIcon(theIcon);
			}
		}
	}

	thermoM(1/6); //increment the progress dialog's progress

	if (tDoc.info.SpellsOnly) { // if this pdf is only filled with spell sheets, we don't need to go on
		thermoM(thermoTxt, true); // Stop progress bar
		return; // do not continue any further with this function
	}

	//get any extra prefixes
	var AScompA = What("Template.extras.AScomp").split(",");
	var ASnotesA = What("Template.extras.ASnotes").split(",");
	var WSfrontA = What("Template.extras.WSfront").split(",");
	var ALlogA = What("Template.extras.ALlog").split(",");
	var prefixFullA = [""].concat(AScompA).concat(ASnotesA).concat(WSfrontA).concat(ALlogA);

	thermoM(2/6); //increment the progress dialog's progress

	tDoc.getField("Image.DragonheadExtraGear").buttonSetIcon(theIcon);
	tDoc.getField("Image.DragonheadRightRules").buttonSetIcon(theIcon);
	for (var pA = 0; pA < prefixFullA.length; pA++) {
		if (pA > 0 && !prefixFullA[pA]) continue; //ignore anything but the first "" in the array
		tDoc.getField(prefixFullA[pA] + "Image.Dragonhead").buttonSetIcon(theIcon);
	}
	for (tA = 0; tA < AScompA.length; tA++) { //also do the dragonhead that can be hidden on the Companion page
		tDoc.getField(AScompA[tA] + "Comp.eqp.Image.Dragonhead").buttonSetIcon(theIcon);
	}

	//set the color of the D&D logo on the third page
	theIcon = tDoc.getField("SaveIMG.DnDLogo." + colour).buttonGetIcon();
	tDoc.getField("Image.DnDLogo.long").buttonSetIcon(theIcon);

	thermoM(3/6); //increment the progress dialog's progress

	var buttons = [
		"Show Buttons",
		"ShowHide 2nd DC",
		"Background Menu",
		"Race Features Menu",
		"Class Features Menu",
		"Equipment.menu",
		"Extra.Layers Button",
		"Buttons"
	];

	//add the buttons names of the extra templates to buttons array
	for (tA = 0; tA < AScompA.length; tA++) {
		buttons.push(AScompA[tA] + "Companion.Options");
		buttons.push(AScompA[tA] + "Cnote.Options");
		buttons.push(AScompA[tA] + "Buttons");
	}
	for (tA = 0; tA < ASnotesA.length; tA++) {
		buttons.push(ASnotesA[tA] + "Notes.Options");
	}
	for (tA = 0; tA < WSfrontA.length; tA++) {
		buttons.push(WSfrontA[tA] + "Wildshapes.Settings");
	}
	for (tA = 0; tA < ALlogA.length; tA++) {
		buttons.push(ALlogA[tA] + "AdvLog.Options");
	}
	//set the fill and border colors of the buttons
	if (theColor && theColorDark) {
		for (var b = 0; b < buttons.length; b++) {
			tDoc.getField(buttons[b]).fillColor = theColor;
			tDoc.getField(buttons[b]).strokeColor = theColorDark;
		}
	}

	//make an array of the extra companion templates with an empty value at the start (so it is never empty)
	var prefixA = [""].concat(AScompA);

	thermoM(4/6); //increment the progress dialog's progress

	//set the attack field color for any of them that is set to change together with the dragon heads
	theIcon = tDoc.getField("SaveIMG.Attack" + "." + colour).buttonGetIcon();
	for (var a = 1; a <= FieldNumbers.attacks; a++) {
		if (What("BlueText.Attack." + a + ".Weight Title") === "same as dragon heads") {
			tDoc.getField("Image.Attack." + a).buttonSetIcon(theIcon);
		}
		if (a <= 3) { for (pA = 0; pA < prefixA.length; pA++) {
			if (What(prefixA[pA] + "BlueText.Comp.Use.Attack." + a + ".Weight Title") === "same as dragon heads") {
				tDoc.getField(prefixA[pA] + "Image.Comp.Use.Attack." + a).buttonSetIcon(theIcon);
			}
		}}
	}

	thermoM(5/6); //increment the progress dialog's progress

	// Set the highlighting color if it has been coupled to the dragon heads color
	if (Who("Highlighting") === "dragons") {
		app.runtimeHighlightColor = LightColorList[colour];
		tDoc.getField("Highlighting").fillColor = LightColorList[colour];
	}
	// See if any of the Ability Save DC's or the HP Dragons have the color connected to this
	if (What("Color.DC").indexOf("dragons") != -1) ApplyDCColorScheme();
	if (What("Color.HPDragon") == "dragons") ApplyHPDragonColorScheme();

	thermoM(thermoTxt, true); // Stop progress bar
}

//change the colorscheme that is used for the dragon heads sheet
function ApplyHPDragonColorScheme(aColour) {
	if (typePF || (!aColour && What("Color.HPDragon") === tDoc.getField("Color.HPDragon").defaultValue)) return; //don't do this function in the Printer-Friendly version or if resetting with the default colour still active
	var fndColour = aColour ? aColour.toLowerCase() : What("Color.HPDragon");
	var colour = fndColour == "headers" ? What("Color.Theme") : fndColour == "dragons" ? What("Color.DragonHeads") : fndColour;

	//stop the function if the input color is not recognized
	if (!ColorList[colour]) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying " + colour + " HP Dragons...");
	calcStop();

	//set the chosen color to a place where it can be found again
	Value("Color.HPDragon", fndColour);

	//get any extra prefixes
	var makeTempArray = function (template) {
		var tempReturn = [];
		var temp = What("Template.extras." + template);
		if (temp) {
			temp = temp.split(",");
			temp.splice(temp.indexOf(""), 1);
			tempReturn = temp;
		}
		return tempReturn;
	}
	var AScompA = makeTempArray("AScomp");
	var WSfrontA = makeTempArray("WSfront");
	var prefixFullA = [""].concat(AScompA).concat(WSfrontA);

	thermoM(1/2); //increment the progress dialog's progress

	var theIcon = tDoc.getField("SaveIMG.HPdragonhead" + "." + colour).buttonGetIcon();
	for (var pA = 0; pA < prefixFullA.length; pA++) {
		tDoc.getField(prefixFullA[pA] + "Image.HPdragonhead").buttonSetIcon(theIcon);
	}

	thermoM(thermoTxt, true); // Stop progress bar
}

//Make menu for choosing the color, the 'color' button, and parse it to Menus.color
function MakeColorMenu() {

	var ColorMenu = [];
	var tempArray = [];

	//add all the colours to the array, ommitting some if not using the full (bonus) version
	for (var key in ColorList) {
		tempArray.push([key.capitalize(), key]);
	};
	tempArray.sort();

	if (typePF) {
		var menuLVL1 = function (item, array, name) {
			var lookIt = Who("Highlighting");
			for (i = 0; i < array.length; i++) {
				item.push({
					cName : array[i][0],
					cReturn : "color#" + name + "#" + array[i][1],
					bMarked : lookIt === array[i][1]
				});
			}
		};
		tempArray.unshift(
			["Turn highlighting off", "turn highlighting off"],
			["-", "-"],
			["Sheet default", "sheet default"],
			["Adobe default", "adobe default"],
			["-", "-"]
		);
		menuLVL1(ColorMenu, tempArray, "highlights");
	} else {
		var DCMenu = {cName : "Ability Save DCs", oSubMenu : []};

		var menuLVL1 = function (item, array, name) {
			var lookIt = What("Color.Theme");
			for (i = 0; i < array.length; i++) {
				item.push({
					cName : array[i][0],
					cReturn : "color#" + name + "#" + array[i][1],
					bMarked : lookIt === array[i][1]
				});
			}
		};

		var menuLVL2 = function (name, array) {
			var menu = {
				cName : name[0],
				oSubMenu : []
			};
			var lookIt = name[1] === "highlights" ? Who("Highlighting") : name[1] === "hpdragons" ? What("Color.HPDragon") : name[1] === "dragonheads" ? What("Color.DragonHeads") : false;
			for (i = 0; i < array.length; i++) {
				menu.oSubMenu.push({
					cName : array[i][0],
					cReturn : "color#" + name[1] + "#" + array[i][1],
					bMarked : lookIt === array[i][1]
				})
			};
			return menu;
		};

		var menuLVL3 = function (menu, name, array, extraReturn) {
			var temp = [];
			var lookIt = What("Color.DC").split(",")[extraReturn - 1];
			for (i = 0; i < array.length; i++) {
				temp.push({
					cName : array[i][0],
					cReturn : "color#" + name[1] + "#" + array[i][1] + "#" + extraReturn,
					bMarked : lookIt === array[i][1]
				});
			}
			menu.oSubMenu.push({
				cName : name[0],
				oSubMenu : temp
			});
		};

		var tempArrayExt = tempArray.slice(0);
		tempArrayExt.unshift(
			["Same as Headers", "headers"],
			["Same as Dragon Heads", "dragons"],
			["-", "-"]
		);

		//make a submenu to set the form field highlight color, or turn highlighting off
		var HighlightArray = tempArrayExt.slice(0);
		HighlightArray.unshift(
			["Turn highlighting off", "turn highlighting off"],
			["-", "-"],
			["Sheet default", "sheet default"],
			["Adobe default", "adobe default"],
			["-", "-"]
		);
		ColorMenu.push(menuLVL2(["Form Highlights", "highlights"], HighlightArray));

		//make the Dragon Head submenu
		ColorMenu.push(menuLVL2(["Dragon Heads", "dragonheads"], tempArray));

		//make, if this is not a spell sheet, the Dragon HP and ability save DCs submenu
		if (!minVer) {
			ColorMenu.push(menuLVL2(["HP Dragons", "hpdragons"], tempArrayExt));
			menuLVL3(DCMenu, ["Ability Save DC 1 (left)", "abilitydc"], tempArrayExt, 1);
			menuLVL3(DCMenu, ["Ability Save DC 2 (right)", "abilitydc"], tempArrayExt, 2);
			ColorMenu.push(DCMenu);
		}

		ColorMenu.push({cName : "-"}); //add a divider

		//make the color menu
		menuLVL1(ColorMenu, tempArray, "theme");

		ColorMenu.push({cName : "-"}); //add a divider

		// 'all' option
		ColorMenu.push(menuLVL2(["All of the above (except highlighting)", "all"], tempArray));
	}

	Menus.colour = ColorMenu;
};

//call the color menu and do something with the results
function ColoryOptions(input) {
	var MenuSelection = input ? input : getMenu("colour");

	if (!MenuSelection || MenuSelection[0] == "nothing" || MenuSelection[0] !== "color") return;
	switch (MenuSelection[1]) {
		case "theme" :
			ApplyColorScheme(MenuSelection[2]);
			break;
		case "dragonheads" :
			ApplyDragonColorScheme(MenuSelection[2]);
			break;
		case "hpdragons" :
			ApplyHPDragonColorScheme(MenuSelection[2]);
			break;
		case "abilitydc" :
			ApplyDCColorScheme(MenuSelection[2], MenuSelection[3]);
			break;
		case "highlights" :
			var highlightsOn = true;
			switch (MenuSelection[2]) {
				case "turn highlighting off" :
					highlightsOn = false;
				case "adobe default" :
					var theColour = ["RGB", 0.8, 0.8431, 1]; //Adobe default form field highlighting colour
					break;
				case "sheet default" :
					var theColour = ["RGB", 0.9, 0.9, 1];
					break;
				case "headers" :
					var theColour = LightColorList[What("Color.Theme")];
					break;
				case "dragons" :
					var theColour = LightColorList[What("Color.DragonHeads")];
					break;
				default :
					if (!LightColorList[MenuSelection[2]]) return;
					var theColour = LightColorList[MenuSelection[2]];
					break;
			};
			app.runtimeHighlight = highlightsOn;
			Value("Highlighting", app.runtimeHighlight, MenuSelection[2]);
			app.runtimeHighlightColor = theColour;
			tDoc.getField("Highlighting").fillColor = theColour;
			break;
		case "all" :
			ApplyColorScheme(MenuSelection[2]);
			ApplyDragonColorScheme(MenuSelection[2]);
			ApplyHPDragonColorScheme(MenuSelection[2]);
			ApplyDCColorScheme(MenuSelection[2], 1);
			ApplyDCColorScheme(MenuSelection[2], 2);
			break;
	};
};

//see if text contains a background
function ParseBackgroundFeature(input) {
	var strResult = "";
	if (!input) return strResult;

	input = removeDiacritics(input).toLowerCase();
	var foundLen = 0;
	var foundDat = 0;

	for (var key in BackgroundFeatureList) {
		var kObj = BackgroundFeatureList[key];

		if (input.indexOf(key) === -1 // see if the input contains the feature
			|| testSource(key, kObj, "backFeaExcl") // test if the feature or its source isn't excluded
		) continue;

		// only go on with this entry if:
		// we are using the search length (default) and this entry has a longer name or this entry has an equal length name but has a newer source
		// or if we are not using the search length, just look at the newest source date
		var tempDate = sourceDate(kObj.source);
		if ((!ignoreSearchLength && key.length < foundLen) || (!ignoreSearchLength && key.length == foundLen && tempDate < foundDat) || (ignoreSearchLength && tempDate <= foundDat)) continue;

		// we have a match, set the values
		strResult = key;
		foundLen = key.length;
		foundDat = tempDate;
	}
	return strResult;
};

//Add the text of the feature selected
function ApplyBackgroundFeature(input, inputForceOld) {
	if (IsSetDropDowns || CurrentVars.manual.backgroundFeature) return; // when just changing the dropdowns, don't do anything

	var sCurSel = ParseBackgroundFeature(inputForceOld ? inputForceOld : What("Background Feature"));
	var sParseFeature = ParseBackgroundFeature(input);
	if (sParseFeature === sCurSel) return; // No changes were made, so stop now

	var thermoTxt = thermoM("Applying background feature...");
	calcStop();

	var sFldNm = "Background Feature Description";
	var sTooltip = stringSource(CurrentBackground, "full,page", "The \"" + CurrentBackground.name + "\" background is found in ", ".\n");
	var sNewDescr = input === "" ? "" : What(sFldNm);

	if (sCurSel) {
		// Remove the old background feature common attributes
		var Fea = ApplyFeatureAttributes(
			"background feature", // type
			sCurSel, // fObjName [aParent, fObjName]
			[1, 0, false], // lvlA [old-level, new-level, force-apply]
			false, // choiceA [old-choice, new-choice, "only"|"change"]
			false // forceNonCurrent
		);
	}
	if (sParseFeature) {
		// Add the new background feature common attributes
		var Fea = ApplyFeatureAttributes(
			"background feature", // type
			sParseFeature, // fObjName [aParent, fObjName]
			[0, 1, false], // lvlA [old-level, new-level, force-apply]
			false, // choiceA [old-choice, new-choice, "only"|"change"]
			false // forceNonCurrent
		);
		var sFeaCap = sParseFeature.capitalize();
		var oBackFea = BackgroundFeatureList[sParseFeature];
		var sNewDescr = What("Unit System") === "imperial" ? oBackFea.description : ConvertToMetric(oBackFea.description, 0.5);
		sTooltip += stringSource(oBackFea, "full,page", "The \"" + sFeaCap + "\" background feature is found in ", ".");
	}
	Value("Background Feature Description", sNewDescr, sTooltip);
	thermoM(thermoTxt, true); // Stop progress bar
};

//set the dropdown box options for the background features
function SetBackgroundFeaturesdropdown(forceTooltips) {
	var tempArray = [""];
	var tempString = "Select or type in the background feature you want to use and its text will be filled out below automatically.\n\n" + toUni("Background selection") + "\nThe relevant background feature is automatically selected upon selecting a background on the first page. Doing that will always override whatever you wrote here. So, please first fill out a background before you select an alternative feature here.";

	for (var feature in BackgroundFeatureList) {
		if (testSource(feature, BackgroundFeatureList[feature], "backFeaExcl")) continue;
		var feaNm = feature.capitalize();
		if (tempArray.indexOf(feaNm) === -1) tempArray.push(feaNm);
	};
	tempArray.sort();

	if (tDoc.getField("Background Feature").submitName === tempArray.toSource()) {
		if (forceTooltips) AddTooltip("Background Feature", tempString);
		return; //no changes, so no reason to do this
	}
	tDoc.getField("Background Feature").submitName = tempArray.toSource();

	var theFldVal = What("Background Feature");
	tDoc.getField("Background Feature").setItems(tempArray);
	Value("Background Feature", theFldVal, tempString);
}

//Make menu for 'choose race feature' button and parse it to Menus.raceoptions
function MakeRaceMenu() {
	//make an array of the variants that are not excluded by the resource settings
	var racialVarArr = ["basic"];
	if (CurrentRace.known && CurrentRace.variants) {
		for (var r = 0; r < CurrentRace.variants.length; r++) {
			var theR = CurrentRace.known + "-" + CurrentRace.variants[r];
			if (testSource(theR, RaceSubList[theR], "racesExcl")) continue; // test if the racial variant or its source isn't excluded
			racialVarArr.push(CurrentRace.variants[r]);
		}
	};

	var menuLVL1R = function (item, array) {
		var isCurrent = CurrentRace.variant;
		var raceSrc = stringSource(RaceList[CurrentRace.known], "first,abbr", "\t   [", "]");
		for (var i = 0; i < array.length; i++) {
			var varR = RaceSubList[CurrentRace.known + "-" + array[i]];
			var varSrc = varR && varR.source ? stringSource(varR, "first,abbr", "\t   [", "]") : raceSrc;
			item.push({
				cName : array[i].capitalize() + " " + RaceList[CurrentRace.known].name + varSrc,
				cReturn : CurrentRace.known + "#" + array[i],
				bMarked : (isCurrent === "" && array[i] === "basic") || isCurrent === array[i]
			});
		}
	};

	var RaceMenu = [];

	if (racialVarArr.length === 1) {
		RaceMenu = [{
			cName : "No race options that require a choice",
			cReturn : "nothing",
			bEnabled : false
		}];
	} else {
		menuLVL1R(RaceMenu, racialVarArr);
	}

	Menus.raceoptions = RaceMenu;
}

//call the Race Features menu and do something with the results
function RaceFeatureOptions() {
	var MenuSelection = getMenu("raceoptions");

	if (MenuSelection && MenuSelection[0] !== "nothing") {
		ApplyRace(MenuSelection.toString(), true);
	}
}

function ConvertToMetric(inputString, rounded, exact) {
	if (typeof inputString != 'string' || inputString === "") {return "";};
	var rounding = rounded ? rounded : 1;
	var ratio = exact ? "metricExact" : "metric";
	var fraction;

	var theConvert = function (amount, units) {
		amount = Number(amount);
		var total, unit, isRounded;
		switch (units){
		 case "mile" : case "miles" :
			total = amount * UnitsList[ratio].distance;
			unit = "km";
			break;
		 case "ft" : case "foot" : case "feet" : case "'" :
			total = amount * UnitsList[ratio].length;
			unit = "m";
			break;
		 case "in" : case "inch" : case "inches" : case '"' :
			total = amount * UnitsList[ratio].lengthInch;
			unit = "cm";
			break;
		 case "cu ft" : case "cubic foot" : case "cubic feet" :
			total = amount * UnitsList[ratio].volume;
			unit = "m3";
			break;
		 case "sq ft" : case "square foot" : case "square feet" :
			total = amount * UnitsList[ratio].surface;
			unit = "m2";
			break;
		 case "lb" : case "lbs" : case "pound" : case "pounds" :
			total = amount * UnitsList[ratio].mass;
			unit = "kg";
			break;
		 case "gal" : case "gallon" : case "gallons" :
			total = amount * UnitsList[ratio].liquid;
			unit = "L";
			break;
		 case "qt" : case "qts" : case "quart" : case "quarts" :
			total = amount * UnitsList[ratio].liquidQuart;
			unit = "L";
			break;
		 case "\u00B0 f" : case "\u00B0f" : case "degree fahrenheit" : case "degrees fahrenheit" : case "fahrenheit" :
			total = RoundTo((amount - 32) * 5/9, exact ? 0.01 : 1, false, true);
			unit = "\u00B0C";
			isRounded = true;
			break;
		}
		return [total, unit, isRounded];
	}

	// find all labeled measurements in string
	var measurements = inputString.match(/(\b|-)\d+[,./]?\d*\/?(-?\d+?[,./]?\d*)?\s?-?('\d+\w?"($|\W)|'($|\W)|"($|\W)|(in|inch|inches|miles?|ft|foot|feet|sq ft|square foot|square feet|cu ft|cubic foot|cubic feet|lbs?|pounds?|gal|gallons?|qts?|quarts?|\u00B0 ?f|degrees? fahrenheit|fahrenheit)\b)/ig);

	if (measurements) {
		for (var i = 0; i < measurements.length; i++) {
			if ((/'.+"/).test(measurements[i])) {
				if ((/'.+"\W/).test(measurements[i])) {
					measurements[i] = measurements[i].substr(0, measurements[i].length - 1);
				}
				var orgFT = parseFloat(measurements[i].substring(0,measurements[i].indexOf("'")));
				var orgIN = parseFloat(measurements[i].substring(measurements[i].indexOf("'") + 1, measurements[i].indexOf('"')));
				var resulted = theConvert(parseFloat(orgIN/12) + parseFloat(orgFT), "ft");
			} else {
				if ((/\d+('|")\W/).test(measurements[i])) {
					measurements[i] = measurements[i].substr(0, measurements[i].length - 1);
				}
				var org = measurements[i].replace(/,/g, ".");
				var orgUnit = org.match(/[-\s]*([\u00B0 A-z'"]+)$/)[1].toLowerCase();
				var fraction;

				if (fraction = org.match(/(-?\d+\.?\d*)\/(-?\d+\.?\d*)/) ){
					var resulted = [theConvert(fraction[1], orgUnit), theConvert(fraction[2], orgUnit)];
				} else {
					var resulted = theConvert(parseFloat(org), orgUnit);
				}
			}
	
			var delimiter = (/.*\d+([\s- ]*?)\w/).test(measurements[i]) ? measurements[i].match(/.*\d+([\s- ]*?)\w/)[1] : " ";

			if (isArray(resulted[0])) {
				var theResult = RoundTo(resulted[0][0], rounding, false, true) + "/" + RoundTo(resulted[1][0], rounding, false, true) + delimiter + resulted[1][1];
			} else {
				var theResult = (resulted[2] ? resulted[0] : RoundTo(resulted[0], rounding, false, true)) + delimiter + resulted[1];
			}
			inputString = inputString.replace(measurements[i], theResult);
		}
	}
	return inputString;
}

function ConvertToImperial(inputString, rounded, exact, toshorthand) {
	if (typeof inputString != 'string' || inputString === "") {return "";};
	var ratio = exact ? "metricExact" : "metric";
	var rounding = rounded ? rounded : 1;
	var fraction;
	var INofCM = function (unit) {
		return unit;
	}

	var theConvert = function (amount, units) {
		amount = Number(amount);
		var total, unit, isRounded;
		switch (units){
		 case "cm" :
			if (amount < 30) {
				total = amount / UnitsList[ratio].lengthInch;
				unit = "in";
				break;
			}
			amount = amount / 100;
		 case "m" : case "meter" : case "meters" : case "metre" : case "metres" :
			total = amount / UnitsList[ratio].length;
			unit = "ft";
			break;
		 case "km" :
			total = amount / UnitsList[ratio].distance;
			unit = total === 1 ? "mile" : "miles";
			break;
		 case "m3" : case "cubic meter" : case "cubic meters" : case "cubic metre" : case "cubic metres" :
			total = amount / UnitsList[ratio].volume;
			unit = "cu ft";
			break;
		 case "m2" : case "square metre" : case "square metres" : case "square meter" : case "square meters" :
			total = amount / UnitsList[ratio].surface;
			unit = "sq ft";
			break;
		 case "g" :
			amount = amount / 1000;
		 case "kg" : case "kilo" : case "kilos" :
			total = amount / UnitsList[ratio].mass;
			unit = "lb";
			break;
		 case "l" : case "liter" : case "liters" : case "litre" : case "litres" :
			if (amount <= 3) {
				total = amount / UnitsList[ratio].liquidQuart;
				unit = "qt";
				break;
			}
			total = amount / UnitsList[ratio].liquid;
			unit = "gal";
			break;
		 case "\u00B0 c" : case "\u00B0c" : case "degree celcius" : case "degrees celcius" : case "celcius" :
			total = RoundTo((amount * 9/5) + 32, exact ? 0.01 : 1, false, true);
			unit = "\u00B0F";
			isRounded = true;
			break;
		}
		return [total, unit, isRounded];
	}

	// find all labeled measurements in string
	var measurements = inputString.match(/(\b|-)\d+[,./]?\d*\/?(-?\d+?[,./]?\d*)?\s?-?(m2|square meters?|square metres?|m3|cubic meters?|cubic metres?|cm|km|m|meters?|metres?|l|liters?|litres?|kg|g|kilos?|\u00B0 ?c|degrees? celcius|celcius)\b/ig);

	if (measurements) {
		for (var i = 0; i < measurements.length; i++) {
			var org = measurements[i].replace(/,/g, ".");
			var orgUnit = org.match(/[-\s]*([\u00B0 A-z']+)$/)[1].toLowerCase();
			var fraction;

			if (fraction = org.match(/(-?\d+\.?\d*)\/(-?\d+\.?\d*)/)){
				var resulted = [theConvert(fraction[1], orgUnit), theConvert(fraction[2], orgUnit)];
			} else {
				var resulted = theConvert(parseFloat(org), orgUnit);
			}

			var delimiter = (/.*\d+([\s- ]*?)\w/).test(measurements[i]) ? measurements[i].match(/.*\d+([\s- ]*?)\w/)[1] : " ";

			if (isArray(resulted[0])) {
				var theResult = RoundTo(resulted[0][0], rounding, false, true) + "/" + RoundTo(resulted[1][0], rounding, false, true) + delimiter + resulted[1][1];
			} else if (toshorthand && resulted[1] === "ft" && resulted[0] % 1 != 0) {
				var theFT = Math.floor(resulted[0]);
				var theINCH = Math.round(resulted[0] % 1 / (1/12));
				var theResult = theFT + "'" + theINCH + "\"";
			} else {
				var theResult = (resulted[2] ? resulted[0] : RoundTo(resulted[0], rounding, false, true)) + delimiter + resulted[1];
			}
			inputString = inputString.replace(measurements[i], theResult);
		}
	}
	return inputString;
}

//update all the decimals in a string or number to reflect the new decimal chosen.
function UpdateDecimals(inputString) {
	var theDec = What("Decimal Separator");
	var theInput = inputString.toString();

	if (theDec === "dot") {
		var measurements = theInput.match(/\b\d+,\d+/g);
		if (measurements) {
			for (var i = 0; i < measurements.length; i++) {
				var theResult = measurements[i].replace(",", ".");
				theInput = theInput.replace(measurements[i], theResult);
			}
		}
	} else if (theDec === "comma") {
		var measurements = theInput.match(/\b\d+\.\d+/g);
		if (measurements) {
			for (var i = 0; i < measurements.length; i++) {
				var theResult = measurements[i].replace(".", ",");
				theInput = theInput.replace(measurements[i], theResult);
			}
		}
	}
	theInput = isNaN(theInput) ? theInput : Number(theInput);
	return theInput;
}

function SetUnitDecimals_Button() {
	var unitSys = What("Unit System");
	var decSep = What("Decimal Separator");

	//set the dialog to represent current settings
	SetUnitDecimals_Dialog.bSys = unitSys;
	SetUnitDecimals_Dialog.bDec = decSep;

	//call the dialog and do something if ok is pressed
	if (app.execDialog(SetUnitDecimals_Dialog) != "ok") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Set units and decimals...");
	calcStop();

	if (!minVer) {
		//fields to update the string from
		var FldsGameMech = [
			"Vision",
			"Saving Throw advantages / disadvantages",
			"Racial Traits",
			"Class Features",
			"Speed",
			"Speed encumbered",
			"Background Feature Description",
			"Extra.Notes",
			"MoreProficiencies"
		];
		//Weight fields (that don't include a unit) to update with 4 decimals
		var FldsWeight = [
			"AC Armor Weight",
			"AC Shield Weight",
			"AmmoLeftDisplay.Weight",
			"AmmoRightDisplay.Weight"
		];
		//field calculations to update
		var FldsCalc = [], MIfldsCalc = [];
		var AScompA = What("Template.extras.AScomp").split(",").slice(1);
		var WSfrontA = What("Template.extras.WSfront").split(",").slice(1);
		for (var C = 0; C < AScompA.length; C++) {
			var prefix = AScompA[C];
			FldsGameMech.push(prefix + "Comp.Use.Speed");
			FldsGameMech.push(prefix + "Comp.Use.Features");
			FldsGameMech.push(prefix + "Comp.Use.Senses");
			FldsGameMech.push(prefix + "Comp.Use.Traits");
			FldsGameMech.push(prefix + "Cnote.Left");
			FldsGameMech.push(prefix + "Cnote.Right");
			for (var a = 1; a <= FieldNumbers.compgear; a++) {
				FldsWeight.push(prefix + "Comp.eqp.Gear Weight " + a);
			}
		}
		for (var i = 1; i <= 77; i++) {
			if (i <= FieldNumbers.magicitems) FldsGameMech.push("Extra.Magic Item Description " + i);
			if (i <= FieldNumbers.limfea) FldsGameMech.push("Limited Feature " + i);
			if (i <= FieldNumbers.feats) {
				FldsGameMech.push("Feat Description " + i);
				FldsCalc.push("Feat Description " + i);
			}
			if (i <= FieldNumbers.magicitems) {
				FldsGameMech.push("Extra.Magic Item Description " + i);
				MIfldsCalc.push("Extra.Magic Item Description " + i);
				FldsWeight.push("Extra.Magic Item Weight " + i);
			}
			if (i <= FieldNumbers.actions) {
				FldsGameMech.push("Bonus Action " + i);
				FldsGameMech.push("Reaction " + i);
			}
			if (i <= FieldNumbers.trueactions) {
				FldsGameMech.push("Action " + i);
			}
			if (i <= FieldNumbers.attacks) {
				FldsGameMech.push("Attack." + i + ".Range");
				FldsGameMech.push("Attack." + i + ".Description");
				FldsWeight.push("BlueText.Attack." + i + ".Weight");
			}
			if (i <= 4) {
				for (var W = 0; W < WSfrontA.length; W++) {
					prefix = WSfrontA[W];
					FldsGameMech.push(prefix + "Wildshape." + i + ".Attack.1.Range");
					FldsGameMech.push(prefix + "Wildshape." + i + ".Attack.1.Description");
					FldsGameMech.push(prefix + "Wildshape." + i + ".Attack.2.Range");
					FldsGameMech.push(prefix + "Wildshape." + i + ".Attack.2.Description");
					FldsGameMech.push(prefix + "Wildshape." + i + ".Speed");
					FldsGameMech.push(prefix + "Wildshape." + i + ".Traits");
				}
			}
			if (i <= 3) {
				for (var C = 0; C < AScompA.length; C++) {
					prefix = AScompA[C];
					FldsGameMech.push(prefix + "Comp.Use.Attack." + i + ".Range");
					FldsGameMech.push(prefix + "Comp.Use.Attack." + i + ".Description");
				}
			}
			if (i <= FieldNumbers.extragear) FldsWeight.push("Extra.Gear Weight " + i);
			if (i <= FieldNumbers.gear) FldsWeight.push("Adventuring Gear Weight " + i);
		}
	}
	if (!tDoc.info.AdvLogOnly) {
		var spellsArray = []; // an array of all the spell fields
		var SSmoreA = What("Template.extras.SSmore").split(",");
		SSmoreA[0] = What("Template.extras.SSfront").split(",")[1];
		if (!SSmoreA[0]) SSmoreA.shift();
		var SkipArray = ["hidethisline", "setcaptions", "setheader", "setdivider", "setglossary"];
		if (SSmoreA[0]) {
			for (var SS = 0; SS < SSmoreA.length; SS++) {
				var fldsNmbrs = SS === 0 ? FieldNumbers.spells[0] : FieldNumbers.spells[1];
				for (var q = 0; q < fldsNmbrs; q++) {
					var SSrem = SSmoreA[SS] + "spells.remember." + q;
					var SSremV = What(SSrem);
					if (SSremV && SkipArray.indexOf(SSremV.split("##")[0]) === -1) {
						spellsArray.push([SSremV, SSrem]);
					}
				}
			}
		}
	}
	if (!minVer && SetUnitDecimals_Dialog.bSys !== unitSys) { //do something if the unit system was changed
		thermoTxt = thermoM("Converting to " + SetUnitDecimals_Dialog.bSys + "...", false); //change the progress dialog text
		setListsUnitSystem(SetUnitDecimals_Dialog.bSys); //update some variables
		Value("Unit System", SetUnitDecimals_Dialog.bSys);
		Value("Decimal Separator", SetUnitDecimals_Dialog.bDec);
		if (typePF) {
			var LbKg = What("Unit System") === "imperial" ? "LB" : "KG";
			Value("Display.Weighttxt.LbKg", LbKg);
			var tpls = What("Template.extras.AScomp").split(",");
			for (var t = 0; t < tpls.length; t++) Value(tpls[t]+"Comp.eqp.Display.Weighttxt", LbKg);
		} else {
			SetRichTextFields();
		}

		if (SetUnitDecimals_Dialog.bSys === "imperial") {
			var conStr = "ConvertToImperial";
			var weightConv = function (amount) {
				return RoundTo(amount / UnitsList.metric.mass, 0.001);
			}
			var raceHeight = "height";
			var raceWeight = "weight";
		} else {
			var conStr = "ConvertToMetric";
			var weightConv = function (amount) {
				return RoundTo(amount * UnitsList.metric.mass, 0.001);
			}
			var raceHeight = "heightMetric";
			var raceWeight = "weightMetric";
		}

		var totalInc = FldsGameMech.length + FldsWeight.length + FldsCalc.length + MIfldsCalc.length + 2;

		for (var C = 0; C < FldsGameMech.length; C++) {
			var theValue = What(FldsGameMech[C]);
			if (theValue) {
				Value(FldsGameMech[C], tDoc[conStr](theValue, 0.5));
			}
			thermoM(C/totalInc); //increment the progress dialog's progress
		}
		for (C = 0; C < FldsWeight.length; C++) {
			var theValue = What(FldsWeight[C]);
			if (theValue) {
				Value(FldsWeight[C], weightConv(theValue));
			}
			thermoM((FldsGameMech.length + C)/totalInc); //increment the progress dialog's progress
		}
		for (C = 0; C < FldsCalc.length; C++) {
			if (CurrentFeats.known[C] && FeatsList[CurrentFeats.known[C]].calculate) {
				var theCalc = FeatsList[CurrentFeats.known[C]].calculate;
				tDoc.getField(FldsCalc[C]).setAction("Calculate", tDoc[conStr](theCalc, 0.5));
				thermoM((FldsGameMech.length + FldsWeight.length + C)/totalInc); //increment the progress dialog's progress
			}
		}
		for (C = 0; C < MIfldsCalc.length; C++) {
			if (CurrentMagicItems.known[C] && MagicItemsList[CurrentMagicItems.known[C]].calculate) {
				var theCalc = MagicItemsList[CurrentMagicItems.known[C]].calculate;
				tDoc.getField(MIfldsCalc[C]).setAction("Calculate", tDoc[conStr](theCalc, 0.5));
				thermoM((FldsGameMech.length + FldsWeight.length + FldsCalc.length + C)/totalInc); //increment the progress dialog's progress
			}
		}
		if (What("Height")) {
			Value("Height", tDoc[conStr](What("Height"), 0.01, true, true));
		}
		if (What("Weight")) {
			Value("Weight", tDoc[conStr](What("Weight"), 0.01, true));
		}
		if (CurrentRace.known) {
			if (CurrentRace[raceHeight]) {
				AddTooltip("Height", CurrentRace.plural + CurrentRace[raceHeight]);
			}
			if (CurrentRace[raceWeight]) {
				AddTooltip("Weight", CurrentRace.plural + CurrentRace[raceWeight]);
			}
			if (CurrentRace.speed[0]) {
				var tempString = tDoc[conStr](tDoc.getField("Speed").userName, 0.5);
				AddTooltip("Speed", tempString);
				AddTooltip("Speed encumbered", tempString);
			}
		}
		thermoM((totalInc - 1)/totalInc); //increment the progress dialog's progress

		for (var p = 0; p < AScompA.length; p++) {
			prefix = AScompA[p];
			if (What(prefix + "Comp.Desc.Height")) {
				Value(prefix + "Comp.Desc.Height", tDoc[conStr](What(prefix + "Comp.Desc.Height"), 0.01, true, true));
			}
			if (What(prefix + "Comp.Desc.Weight")) {
				Value(prefix + "Comp.Desc.Weight", tDoc[conStr](What(prefix + "Comp.Desc.Height"), 0.01, true));
			}
			if (CurrentCompRace[prefix] && CurrentCompRace[prefix].known && CurrentCompRace[prefix].typeFound === "race") {
				if (CurrentCompRace[prefix][raceHeight]) {
					AddTooltip("Height", CurrentCompRace[prefix].plural + CurrentCompRace[prefix][raceHeight]);
				}
				if (CurrentCompRace[prefix][raceWeight]) {
					AddTooltip("Weight", CurrentCompRace[prefix].plural + CurrentCompRace[prefix][raceWeight]);
				}
			}
		}

		//run through all the spells fields with a description and re-do the description
		for (var Sa = 0; Sa < spellsArray.length; Sa++) {
			ApplySpell(spellsArray[Sa][0], spellsArray[Sa][1]);
		}

	} else if (!minVer && SetUnitDecimals_Dialog.bDec !== decSep) { //or if only the decimal separator has been changed
		thermoTxt = thermoM("Converting to " + SetUnitDecimals_Dialog.bDec + " decimal separator...", false); //change the progress dialog text
		setListsUnitSystem(unitSys); //update some variables
		Value("Decimal Separator", SetUnitDecimals_Dialog.bDec);

		FldsWeight.push("Total Experience");
		FldsWeight.push("Add Experience");
		FldsWeight.push("Platinum Pieces");
		FldsWeight.push("Gold Pieces");
		FldsWeight.push("Electrum Pieces");
		FldsWeight.push("Silver Pieces");
		FldsWeight.push("Copper Pieces");
		FldsGameMech.push("Height");
		FldsGameMech.push("Weight");

		for (var p = 0; p < AScompA.length; p++) {
			prefix = AScompA[p];
			FldsGameMech.push(prefix + "Comp.Desc.Height");
			FldsGameMech.push(prefix + "Comp.Desc.Weight");
		}

		var totalInc = FldsGameMech.length + FldsWeight.length;

		for (var D = 0; D < FldsGameMech.length; D++) {
			var theValue = What(FldsGameMech[D]);
			if (theValue) {
				Value(FldsGameMech[D], UpdateDecimals(theValue));
			}
			thermoM(D/totalInc); //increment the progress dialog's progress
		}

		for (D = 0; D < FldsWeight.length; D++) {
			Value(FldsWeight[D], What(FldsWeight[D]));
			thermoM((FldsGameMech.length + D)/totalInc); //increment the progress dialog's progress
		}
	} else if (tDoc.info.SpellsOnly && (SetUnitDecimals_Dialog.bSys !== unitSys || SetUnitDecimals_Dialog.bDec !== decSep)) { //do something if it was changed
		thermoTxt = thermoM("Converting to " + SetUnitDecimals_Dialog.bSys + "...", false); //change the progress dialog text
		Value("Unit System", SetUnitDecimals_Dialog.bSys);
		Value("Decimal Separator", SetUnitDecimals_Dialog.bDec);
		//run through all the spells fields with a description and re-do them
		for (var Sa = 0; Sa < spellsArray.length; Sa++) {
			ApplySpell(spellsArray[Sa][0], spellsArray[Sa][1]);
		}
	} else if (tDoc.info.AdvLogOnly) {
		Value("Unit System", SetUnitDecimals_Dialog.bSys);
		Value("Decimal Separator", SetUnitDecimals_Dialog.bDec);
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

function SetTextOptions_Button() {
	var FontSize = CurrentVars.fontsize !== undefined ? CurrentVars.fontsize : typePF ? 7 : 5.74;
	var nowFont = tDoc.getField((tDoc.info.AdvLogOnly ? "AdvLog." : "") + "Player Name").textFont;
	var FontDef = typePF ? "SegoeUI" : "SegoePrint";
	var FontDefSize = typePF ? 7 : 5.74;
	if (FontList[nowFont]) FontDefSize = FontList[nowFont];

	var fontArray = {};
	for (var fo in FontList) {
		if (fo !== nowFont) {
			fontArray[fo] = -1;
		} else {
			fontArray[fo] = 1;
		}
	};
	SetTextOptions_Dialog.bSize = FontSize.toString();
	SetTextOptions_Dialog.bDefSize = FontDefSize;
	SetTextOptions_Dialog.bDefFont = FontDef;
	SetTextOptions_Dialog.bDefSizeSheet = FontList[FontDef];
	SetTextOptions_Dialog.bFont = nowFont;
	SetTextOptions_Dialog.bFontsArray = fontArray;

	// Call the dialog and do something if ok is pressed
	if (app.execDialog(SetTextOptions_Dialog) === "ok") {
		if (SetTextOptions_Dialog.bSize !== FontSize) {
			ToggleTextSize(SetTextOptions_Dialog.bSize);
		}
		if (SetTextOptions_Dialog.bFont !== nowFont) {
			ChangeFont(SetTextOptions_Dialog.bFont);
		}
	}
};

// Make an array of all attack fields of that fieldnumber (!prefix for 1st page)
function ReturnAttackFieldsArray(fldNmbr, prefix) {
	var fldsBase = [
		["", ".Weapon"], //0
		["", ".To Hit"], //1
		["", ".Damage"], //2
		["", ".Weapon Selection"], //3
		["", ".Proficiency"], //4
		["", ".Mod"], //5
		["", ".Range"], //6
		["BlueText.", ".Weight"], //7
		["", ".Damage Type"], //8
		["BlueText.", ".To Hit Bonus"], //9
		["BlueText.", ".Damage Bonus"], //10
		["BlueText.", ".Damage Die"], //11
		["", ".Description"], //12
		["BlueText.", ".Weight Title"], //13
	];
	var flds = [];
	if (!prefix) prefix = "";
	var Q = prefix ? "Comp.Use." : "";
	for (var i = 0; i < fldsBase.length; i++) {
		flds[i] = prefix + fldsBase[i][0] + Q + "Attack." + fldNmbr + fldsBase[i][1];
	}
	return flds;
}

//Make menu for the button on each Attack line and parse it to Menus.attacks
function MakeAttackLineMenu_AttackLineOptions(MenuSelection, itemNmbr, prefix) {
	var attackMenu = [];
	if (!itemNmbr) itemNmbr = Number(event.target.name.slice(-1));
	if (prefix === undefined && event.target && event.target.name) {
		var QI = event.target.name.indexOf("Comp.") === -1;
		prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	} else {
		if (prefix && !CurrentWeapons.compKnown[prefix]) return;
		var QI = prefix ? false : true;
		if (!prefix) prefix = "";
	}
	var Q = QI ? "" : "Comp.Use.";
	var maxItems = QI ? FieldNumbers.attacks : 3;

	var Fields = ReturnAttackFieldsArray(itemNmbr, prefix);
	var fldsBase = [
		["", ".Weapon"], //0
		["", ".To Hit"], //1
		["", ".Damage"], //2
		["", ".Weapon Selection"], //3
		["", ".Proficiency"], //4
		["", ".Mod"], //5
		["", ".Range"], //6
		["BlueText.", ".Weight"], //7
		["", ".Damage Type"], //8
		["BlueText.", ".To Hit Bonus"], //9
		["BlueText.", ".Damage Bonus"], //10
		["BlueText.", ".Damage Die"], //11
		["", ".Description"], //12
		["BlueText.", ".Weight Title"], //13
	];
	for (var i = 0; i < fldsBase.length; i++) {
		Fields[i] = prefix + fldsBase[i][0] + Q + "Attack." + itemNmbr + fldsBase[i][1];
	}

	var theField = What( Fields[ CurrentVars.manual.attacks ? 0 : 3] );
	var theWea = QI ? CurrentWeapons.known[itemNmbr - 1] : CurrentWeapons.compKnown[prefix][itemNmbr - 1];
	var weaWeight = theWea[0] && WeaponsList[theWea[0]] ? WeaponsList[theWea[0]].weight :
		theWea[0] && QI && CurrentCompRace[prefix] && CurrentCompRace[prefix].attacks ? CurrentCompRace[prefix].attacks[theWea[0]].weight :
		What(Fields[7]);
	var noUp = itemNmbr === 1;
	var noDown = itemNmbr === maxItems;

	if (!MenuSelection || MenuSelection === "justMenu") {
		var menuLVL1 = function (array) {
			for (var i = 0; i < array.length; i++) {
				attackMenu.push({
					cName : array[i][0],
					cReturn : "attack#" + array[i][1],
					bEnabled : array[i][2] !== undefined ? array[i][2] : true 
				});
			}
		};
		menuLVL1([
			//[name, return, enabled]
			["Move up", "up", !noUp],
			["Move down", "down", !noDown],
			["-", "-"],
			[QI ? "Copy to Adventuring Gear (page 2)" : "Copy to Equipment section", "copytoequip", weaWeight],
			["-", "-"],
			["Insert empty attack", "insert", theField && !noDown],
			["Delete attack", "delete"],
			["Clear attack", "clear"]
		]);

		var menuLVL2 = function (name, array, markThis) {
			var temp = {
				cName : name[0],
				oSubMenu : []
			}
			for (var i = 0; i < array.length; i++) {
				temp.oSubMenu.push({
					cName : array[i].capitalize(),
					cReturn : "attack#" + name[1] + "#" + array[i],
					bMarked : array[i] === markThis
				})
			}
			attackMenu.push(temp);
		};

		// Add the colour menu
		if (!typePF) {
			attackMenu.push({ cName : "-" });
			var ColorArray = ["black"];
			for (var key in ColorList) ColorArray.push(key);
			ColorArray.sort();
			ColorArray.unshift("same as headers", "same as dragon heads", "-");
			menuLVL2(["Outline Color", "colour"], ColorArray, What(Fields[13]));
		}

		// Add option to show dialog with calcChanges
		if (QI) {
			menuLVL1([
				//[name, return, enabled]
				["-", "-"],
				["Show things changing the attack automations", "showcalcs", ObjLength(CurrentEvals.atkStr) && (CurrentEvals.atkAdd || CurrentEvals.atkCalc) ? true : false]
			]);
		}

		//set the complete menu as the global variable
		Menus.attacks = attackMenu;
		if (MenuSelection == "justMenu") return;
	}
	MenuSelection = MenuSelection ? MenuSelection : getMenu("attacks");
	if (!MenuSelection || MenuSelection[0] == "nothing" || MenuSelection[0] != "attack") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying attack menu option...");
	var findWeaps = false;
	calcStop();

	switch (MenuSelection[1]) {
		case "up" :
			if (noUp) return;
		case "down" :
			if (MenuSelection[1] === "down" && noDown) return;
			thermoTxt = thermoM("Moving the attack " + MenuSelection[1] + "...", false);
			IsNotWeaponMenu = false;
			// Get the other fields
			var otherNmbr = MenuSelection[1] === "down" ? itemNmbr + 1 : itemNmbr - 1;
			var FieldsOth = ReturnAttackFieldsArray(otherNmbr, prefix);
			// Now swap all the fields
			for (var i = 0; i < Fields.length; i++) {
				var exclObj = {
					userName : i !== 12, // tooltip only for description
					submitName : i === 4, // submitname only not for proficiency
					defaultValue : !typePF && i === 13, // weight title keep default value
					noCalc : true
				};
				copyField(Fields[i], FieldsOth[i], exclObj, true);
				thermoM(i/(Fields.length)); //increment the progress dialog's progress
			}
			// Re-apply the attack colour, as this could've changed
			if (!typePF) {
				ApplyAttackColor(itemNmbr, undefined, Q, prefix);
				ApplyAttackColor(otherNmbr, undefined, Q, prefix);
			}
			IsNotWeaponMenu = true;
			findWeaps = true;
			break;
		case "copytoequip" :
			thermoTxt = thermoM("Copying to Equipment section...", false);
			AddToInv(QI ? "gear" : prefix + "comp", QI ? "r" : "l", What(Fields[3]), "", What(Fields[7]), "", false, false, false, true);
			break;
		case "insert" :
			WeaponInsert(itemNmbr, prefix);
			break;
		case "delete" :
			WeaponDelete(itemNmbr, prefix);
			break;
		case "clear" :
			thermoTxt = thermoM("Clearing attack...", false);
			WeaponClear(itemNmbr, prefix)
			findWeaps = true;
			break;
		case "colour" :
			thermoTxt = thermoM("Changing attack outline color...", false);
			ApplyAttackColor(itemNmbr, MenuSelection[2], Q, prefix);
			break;
		case "showcalcs" :
			var atkCalcStr = StringEvals(["atkStr", "spellAtkStr"]);
			if (atkCalcStr) ShowDialog("Things Affecting the Attack Automation", atkCalcStr);
			break;
	}

	//re-populate the CurrentWeapons variable because of the thing that just changed
	if (findWeaps && QI) {
		FindWeapons();
	} else if (findWeaps) {
		FindCompWeapons(undefined, prefix);
	}

	thermoM(thermoTxt, true); // Stop progress bar
};

//clear a weapon field
function WeaponClear(itemNmbr, prefix) {
	var Fields = ReturnAttackFieldsArray(itemNmbr, prefix);
	tDoc.resetForm(Fields);
	if (!typePF) ApplyAttackColor(itemNmbr, undefined, prefix ? "Comp." : "", prefix);
	// Remove the submitname from the to hit & damage modifier fields
	AddTooltip(Fields[9], undefined, "");
	AddTooltip(Fields[10], undefined, "");
}

//insert a weapon at the position wanted
function WeaponInsert(itemNmbr, prefix) {
	if (!prefix) prefix = "";
	var Q = prefix ? "Comp.Use." : "";
	var Fields = ReturnAttackFieldsArray(itemNmbr, prefix);
	var theFieldI = CurrentVars.manual.attacks ? 0 : 3;
	var maxItems = prefix ? 3 : FieldNumbers.attacks;

	// Stop the function if the selected slot is already empty
	if (!What(Fields[theFieldI])) return;

	// Look for the first empty slot below the slot
	var endslot = false;
	for (var i = itemNmbr + 1; i <= maxItems; i++) {
		var aFld = ReturnAttackFieldsArray(i, prefix)[theFieldI];
		if (What(aFld) === "") {
			endslot = i;
			break;
		}
	}
	if (!endslot) return; //only continue if an empty slot was found in the fields

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Inserting empty attack...");
	calcStop();
	IsNotWeaponMenu = false;

	// Cycle through the slots starting with the empty one and add the values of the one above
	for (var s = endslot; s > itemNmbr; s--) {
		var AttFldsFrom = ReturnAttackFieldsArray(s - 1);
		var AttFldsTo = ReturnAttackFieldsArray(s);
		for (var i = 0; i < AttFldsFrom.length; i++) {
			var exclObj = {
				userName : i !== 12, // tooltip only for description
				submitName : i === 4, // submitname only not for proficiency
				defaultValue : !typePF && i === 13, // weight title keep default value
				noCalc : true
			};
			copyField(AttFldsFrom[i], AttFldsTo[i], exclObj);
		}
		if (!typePF) ApplyAttackColor(s, undefined, Q, prefix);
	}
	IsNotWeaponMenu = true;

	// Empty the selected slot
	WeaponClear(itemNmbr, prefix);

	// Re-populate the CurrentWeapons variable because of the thing that just changed
	if (prefix) {
		FindCompWeapons(undefined, prefix);
	} else {
		FindWeapons();
	}
}

//delete a weapon at the position wanted and move the rest up
function WeaponDelete(itemNmbr, prefix) {
	if (!prefix) prefix = "";
	var Q = prefix ? "Comp.Use." : "";
	var maxItems = prefix ? 3 : FieldNumbers.attacks;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Deleting attack...");
	calcStop();

	// Empty the selected slot
	WeaponClear(itemNmbr, prefix);

	IsNotWeaponMenu = false;
	// Move every line up one space, starting with the selected line
	for (var s = itemNmbr; s < maxItems; s++) {
		var AttFldsFrom = ReturnAttackFieldsArray(s + 1);
		var AttFldsTo = ReturnAttackFieldsArray(s);
		for (var i = 0; i < AttFldsFrom.length; i++) {
			var exclObj = {
				userName : i !== 12, // tooltip only for description
				submitName : i === 4, // submitname only not for proficiency
				defaultValue : !typePF && i === 13, // weight title keep default value
				noCalc : true
			};
			copyField(AttFldsFrom[i], AttFldsTo[i], exclObj);
		}
		if (!typePF) ApplyAttackColor(s, undefined, Q, prefix);
	}
	IsNotWeaponMenu = true;

	// Empty the final slot
	WeaponClear(maxItems, prefix);

	// Re-populate the CurrentWeapons variable because of the thing that just changed
	if (prefix) {
		FindCompWeapons(undefined, prefix);
	} else {
		FindWeapons();
	}
}

//show (true) or hide (false) the subsection of "attuned magical items" in the adventure gear table
function ShowAttunedMagicalItems(currentstate) {
	if (currentstate === undefined) currentstate = !eval_ish(What("Adventuring Gear Remember"));
	var ExtraLine = [
		"Adventuring Gear Row " + FieldNumbers.gearMIrow,
		"Adventuring Gear Amount " + FieldNumbers.gearMIrow,
		"Adventuring Gear Weight " + FieldNumbers.gearMIrow
	]
	var MagicItems = [
		"Attuned Magic Items Whiteout",
		"Attuned Magic Items Title"
	]
	if (!typePF) MagicItems.push("Line.adventuringGear");
	if (!currentstate) {
		var HideShow = "Hide";
		var ShowHide = "Show";
		var NoPrintHide = "DontPrint";
	} else {
		var HideShow = "Show";
		var ShowHide = "Hide";
		var NoPrintHide = "Hide";
	}
	if (currentstate || What("Gear Location Remember").split(",")[0] === "true") {
		ExtraLine.push("Adventuring Gear Location.Row " + FieldNumbers.gearMIrow);
	}
	for (var E = 0; E < ExtraLine.length; E++) {
		tDoc[ShowHide](ExtraLine[E]);
	}
	tDoc[NoPrintHide]("Adventuring Gear Button " + FieldNumbers.gearMIrow)
	for (var M = 0; M < MagicItems.length; M++) {
		tDoc[HideShow](MagicItems[M]);
	}
	Value("Adventuring Gear Remember", !currentstate);
}

//hide (true) or show (false) the location column in the adventure gear or extra equipment table
function HideInvLocationColumn(type, currentstate) {
	var total = type === "Extra.Gear " ? FieldNumbers.extragear : FieldNumbers.gear;
	var suffix = type === "Extra.Gear " ? ".1" : "";
	//change the size of the gear input rows
	if (currentstate) {
		var HideShow = "Hide";
		var widen = !typePF ? 12 : 16;
	} else {
		var HideShow = "Show";
		var widen = !typePF ? -12 : -16;
	}
	for (var i = 1; i <= total; i++) {
		var RowName = tDoc.getField(type + "Row " + i + suffix);
		var gRect = RowName.rect; // get the location of the field on the sheet
		gRect[2] += widen; // add the widen amount to the lower right x-coordinate
		RowName.rect = gRect; // Update the value of b.rect
		RowName.value = RowName.value; //re-input the value as to counteract the changing of font
	}
	if (typePF || (type === "Extra.Gear " && What("Extra.Layers Remember").split(",")[1] === "equipment") || type === "Adventuring Gear ") { //only show things on the third page, if the extra equipment section is visible
		tDoc[HideShow](type + "Location");
		if (!currentstate && type === "Adventuring Gear " && What("Adventuring Gear Remember") === false) {
			Hide("Adventuring Gear Location.Row " + FieldNumbers.gearMIrow);
		}
	}
	var theState = What("Gear Location Remember").split(",");
	theState = type === "Extra.Gear " ? [theState[0], !currentstate] : [!currentstate, theState[1]];
	Value("Gear Location Remember", theState);
};

//put the ability save DC right, and show both if more than one race/class with ability save DC
function SetTheAbilitySaveDCs() {
	// Reset the global variable
	CurrentAbilitySaveDCs = { bonus : CurrentVars.AbilitySaveDcBonus ? CurrentVars.AbilitySaveDcBonus : {}, found : {}, priority : {}, order : [] };

	// The main thing to do as a function to be called later
	var processAbility = function(sType, sName, obj) {
		var sSave = obj.abilitySave;
		var sAbiNm = "abi" + sSave;
		if (!CurrentAbilitySaveDCs.found[sAbiNm]) {
			CurrentAbilitySaveDCs.found[sAbiNm] = [];
			CurrentAbilitySaveDCs.priority[sAbiNm] = [];
		}
		CurrentAbilitySaveDCs.found[sAbiNm].push(sName);
		/* Now get the priority, which should result in a list of the abilities from:
			 1	Classes without spellcasting progression (i.e. spellcastingBonus is ignored)
			 2	Race without spellcasting
			 3	Classes with spellcasting
			 4	Race with spellcasting
			Spellcasting will already be visible on the spell sheet pages
			For the classes, the primary class will get the highest priority and the rest in the order they are entered
		*/
		var iPrio = sType === "class" ? 21 : 20; // class before race
		// remove 10 priority if the save DC also appears on the spell sheet pages
		if (obj.spellcastingAbility && obj.spellcastingAbility === sSave) {
			iPrio -= 10;
		} else if (CurrentSpells[sName] && // is a spellcasting entry, and
			(sType !== "class" || CurrentSpells[sName].known) && // is either not a class or has spellcasting progression, and
			(
				(CurrentSpells[sName].abilityToUse && CurrentSpells[sName].abilityToUse[0] === sSave) || // has abilityToUse defined and it is the same, or
				(!isNaN(CurrentSpells[sName].ability) && CurrentSpells[sName].ability === sSave) // has a number as ability and it is the same
			)
		) {
			iPrio -= 10;
		}
		// Add 1 if this is the primary class
		if (sType === "class" && classes.primary === sName) iPrio += 1;
		CurrentAbilitySaveDCs.priority[sAbiNm].push(iPrio);
	}

	// Do all the classes
	for (var sClass in classes.known) {
		if (CurrentClasses[sClass].abilitySave) processAbility("class", sClass, CurrentClasses[sClass]);
	}
	// Do the race
	if (CurrentRace.abilitySave) processAbility("race", CurrentRace.known, CurrentRace);

	// Now save the found to the global variable
	CurrentVars.AbilitySaveDcFound = CurrentAbilitySaveDCs.found;

	// Update the bonus part of the global variable with what's currently on the sheet and in doing so save the above found to the field as well
	SaveTheAbilitySaveDCsBonuses();

	// See which ability has the highest priority
	var aPriorities = [];
	for (var sAbiNm in CurrentAbilitySaveDCs.priority) {
		var iAbiPrio = Math.max.apply(Math, CurrentAbilitySaveDCs.priority[sAbiNm]);
		aPriorities.push(iAbiPrio + sAbiNm);
	}
	CurrentAbilitySaveDCs.order = aPriorities.sort().reverse();

	// Now apply the first two of those (i.e. the 2 with the highest priority)
	for (var i = 0; i < 2; i++) {
		var iAbiPick = 0;
		var aAbiBon = [0, ""];
		if (aPriorities[i]) {
			iAbiPick = Number(aPriorities[i].substr(-1))
			var sAbiNm = aPriorities[i].substr(2);
			if (CurrentAbilitySaveDCs.bonus[sAbiNm]) {
				aAbiBon = CurrentAbilitySaveDCs.bonus[sAbiNm];
			}
		}
		PickDropdown("Spell DC " + (i+1) + " Mod", iAbiPick);
		Value("Spell DC " + (i+1) + " Bonus", aAbiBon[0], undefined, aAbiBon[1]);
		if (i === 1) Toggle2ndAbilityDC(iAbiPick ? "show" : "hide");
	}
}
function SaveTheAbilitySaveDCsBonuses() {
	if (!CurrentAbilitySaveDCs.bonus) CurrentAbilitySaveDCs.bonus = CurrentVars.AbilitySaveDcBonus ? CurrentVars.AbilitySaveDcBonus : {};
	// Save the current bonuses to the variable (thus overwriting the ones in there now, if any)
	for (var i = 1; i <= 2; i++) {
		var sFldAbi = tDoc.getField("Spell DC " + i + " Mod").currentValueIndices;
		var sBonusFld = "Spell DC " + i + " Bonus";
		var sBonusVal = What(sBonusFld);
		var sBonusExpl = How(sBonusFld);
		if (sFldAbi && (sBonusVal || sBonusExpl)) {
			var sAbiNm = "abi" + sFldAbi;
			CurrentAbilitySaveDCs.bonus[sAbiNm] = [sBonusVal, sBonusExpl];
			continue;
		}
	}
	// Now save it back to the global CurrentVars variable and save that for later use/import
	CurrentVars.AbilitySaveDcBonus = CurrentAbilitySaveDCs.bonus;
	SetStringifieds("vars");
}

//remove the item at the line number, and move all things below it up so that no empty line is left
//Type is the name of the field without the number; Line is the number of the line; Total is the total amount of fields there are
function DeleteItemType(Type, Line, Total) {
	//move every line up one space, starting with the selected line
	for (var D = Line; D < Total; D++) {
		Value(Type + D, What(Type + (D + 1)), Who(Type + (D + 1)), How(Type + (D + 1)));
	};

	//delete the contents of the final line
	tDoc.resetForm([Type + Total]);
	//set the tooltip of the final line to nothing
	AddTooltip(Type + Total, "", "");
}

//set the global variable for the form field highlighting; and reset it if applicable
function SetHighlighting() {
	if (!IsNotReset) { //if called during a reset
		//set the remember highlight colour to the sheet's default
		tDoc.getField("Highlighting").fillColor = ["RGB", 0.9, 0.9, 1];
		AddTooltip("Highlighting", "sheet default");
		Highlighting.rememberState = eval_ish(What("Highlighting"));
		Highlighting.rememberColor = tDoc.getField("Highlighting").fillColor;
	}
	app.runtimeHighlight = Highlighting.rememberState;
	app.runtimeHighlightColor = Highlighting.rememberColor;
}

//set spell slots checkboxes, use the value of the field to set the picture and right checkbox form fields [through field validation]
var ignoreSetSpellSlotsCheckboxes = false;
function SetSpellSlotsCheckboxes(SpellLVL, theSlots, onlyDisplay) {
	if (ignoreSetSpellSlotsCheckboxes) return;
	calcStop();
	var tempNr = What("Template.extras.SSfront").split(",").length;

	//now set the fields of the prefix type, or non-prefix type, depending on which one was just set
	if (!onlyDisplay && tempNr > 1) {
		var otherPrefix = event.target && event.target.name.indexOf("SpellSlots") !== 0 ? "" : What("Template.extras.SSfront").split(",")[1];
		ignoreSetSpellSlotsCheckboxes = true;
		Value(otherPrefix + "SpellSlots.CheckboxesSet.lvl" + SpellLVL, theSlots);
		ignoreSetSpellSlotsCheckboxes = false;
	}

	if (!onlyDisplay && What("SpellSlotsRemember") === "[false,false]") return;

	var startTry = minVer && !typePF ? 2 : 1;
	var maxTries = tempNr + (typePF || minVer ? 0 : 1);
	for (var s = startTry; s <= maxTries; s++) {
		var suffix = s === 1 || typePF ? "" : "2";
		var prefix = s === maxTries && tempNr > 1 ? What("Template.extras.SSfront").split(",")[1] : "";
		var isDisplayed = typePF || tDoc.getField(prefix + "Image.SpellSlots" + suffix + ".List").display === display.visible;
		var ExtraFld = prefix + "SpellSlots" + suffix + ".Extra.lvl" + SpellLVL;
		if (parseFloat(theSlots) > 4) {
			Value(ExtraFld, "OF " + parseFloat(theSlots));
			Slots = 4;
		} else {
			Value(ExtraFld, "");
			Slots = parseFloat(theSlots);
		}

		var BoxesFld = [
			prefix + "SpellSlots" + suffix + ".Checkboxes.lvl" + SpellLVL + ".mid", //0
			prefix + "SpellSlots" + suffix + ".Checkboxes.lvl" + SpellLVL + ".top1", //1
			prefix + "SpellSlots" + suffix + ".Checkboxes.lvl" + SpellLVL + ".top2.1", //2
			prefix + "SpellSlots" + suffix + ".Checkboxes.lvl" + SpellLVL + ".top2.2", //3
			prefix + "SpellSlots" + suffix + ".Checkboxes.lvl" + SpellLVL + ".bottom1", //4
			prefix + "SpellSlots" + suffix + ".Checkboxes.lvl" + SpellLVL + ".bottom2.1", //5
			prefix + "SpellSlots" + suffix + ".Checkboxes.lvl" + SpellLVL + ".bottom2.2", //6
		];

		//reset the checkboxes form fields so all are empty and hidden
		tDoc.resetForm(BoxesFld);
		for (var i = 0; i < BoxesFld.length; i++) {
			Hide(BoxesFld[i]);
		}
		ClearIcons(prefix + "Image.SpellSlots" + suffix + ".Checkboxes." + SpellLVL);

		//set the right image and show form fields depending on the number entered and whether or not the field is even visible
		if (isDisplayed && Slots > 0) { //only go ahead if there are more than 0 slots to be done
			var theIcon = tDoc.getField("SaveIMG.SpellSlots." + Slots).buttonGetIcon();
			tDoc.getField(prefix + "Image.SpellSlots" + suffix + ".Checkboxes." + SpellLVL).buttonSetIcon(theIcon);
			switch (Slots) {
			 case 1:
				 Show(BoxesFld[0]);
				 break;
			 case 2:
				 Show(BoxesFld[1]);
				 Show(BoxesFld[4]);
				 break;
			 case 3:
				 Show(BoxesFld[2]);
				 Show(BoxesFld[3]);
				 Show(BoxesFld[4]);
				 break;
			 case 4:
				 Show(BoxesFld[2]);
				 Show(BoxesFld[3]);
				 Show(BoxesFld[5]);
				 Show(BoxesFld[6]);
				 break;
			}
		}
	}
}

//show the spell slot section (Toggle = "Off") or hide it (Toggle = "On")
function SetSpellSlotsVisibility() {
	if (!IsNotReset) {
		Hide("Image.SpellPoints");
		Hide("SpellSlots.Checkboxes.SpellPoints");
	}
	if (typePF) return; //don't do this function in the Printer-Friendly version
	calcStop();

	MakeMobileReady(false); // Undo flatten, if needed

	var toShow = eval_ish(What("SpellSlotsRemember"));

	//define a function to show (showOrHide = true) or hide (showOrHide = false) all the spellslots; suffix is "" or "2"
	var doSpellSlots = function(showOrHide, suffix, prefix) {
		var HiddenVisible = showOrHide ? "Hide" : "Show";
		var VisibleHidden = showOrHide ? "Show" : "Hide";
		var NoPrintHidden = showOrHide && CurrentVars.bluetxt ? "DontPrint" : "Hide";
		var HiddenNoPrint = showOrHide ? "Hide" : "DontPrint";

		//the ones that only apply to the first page
		if (suffix !== 2) {
			var SpellSlotsFields0 = [
				"Text.Header.SpellSlots",
				"Line.SpellSlots"
			]
			var LimitedFeatureFields = [
				"Image.LimitedFeatures.Full"
			];
			var LimitedFeatureButtons = [];
			//append the LimitedFeatureFields array with the fillable form fields
			for (var i = 6; i <= 8; i++) {
				LimitedFeatureFields.push("Limited Feature " + i);
				LimitedFeatureFields.push("Limited Feature Max Usages " + i);
				LimitedFeatureFields.push("Limited Feature Recovery " + i);
				LimitedFeatureFields.push("Limited Feature Used " + i);
				LimitedFeatureButtons.push("Button.Limited Feature " + i);
			};

			//show or hide the fields of the bottom 3 limited features
			for (var i = 0; i < LimitedFeatureFields.length; i++) {
				tDoc[HiddenVisible](LimitedFeatureFields[i]);
			};
			//show or hide the buttons of the bottom 3 limited features
			for (var i = 0; i < LimitedFeatureButtons.length; i++) {
				tDoc[HiddenNoPrint](LimitedFeatureButtons[i]);
			};
			//show or hide the fields of the spell slots that are ony on the first page
			for (var i = 0; i < SpellSlotsFields0.length; i++) {
				tDoc[VisibleHidden](SpellSlotsFields0[i]);
			};
		}

		var SpellSlotFields = [
			prefix + "Image.SpellSlots" + suffix,
			prefix + "SpellSlots" + suffix + ".Extra"
		];

		//show or hide the fields of the spell slots
		for (var i = 0; i < SpellSlotFields.length; i++) {
			tDoc[VisibleHidden](SpellSlotFields[i]);
		};

		var extrasuffix = minVer ? "" : (suffix !== 2 ? ".0" : (prefix ? "" : ".1"));

		//show the bluetext fields, if appropriate
		for (var i = 1; i <= 9; i++) {
			tDoc[NoPrintHidden](prefix + "SpellSlots.CheckboxesSet.lvl" + i + extrasuffix);
		}
	}

	//see if we need to hide or show the Spell Slots on the first page
	if (!minVer) {
		var display1 = tDoc.getField("Image.SpellSlots.List").display === display.visible;
		if (display1 !== toShow[0]) doSpellSlots(toShow[0], "", "");
	} else {
		var display1 = toShow[0];
	}

	//see if we need to hide or show the Spell Slots on the spell sheet page
	var prefix = What("Template.extras.SSfront").split(",")[1];
	var display2 = tDoc.getField("Image.SpellSlots2.List").display === display.visible;
	if (display2 !== toShow[1]) {
		doSpellSlots(toShow[1], 2, "");
		if (prefix) doSpellSlots(toShow[1], 2, prefix);
	}

	//update the checkbox fields of the spell slots if any changes have been made
	if (display1 !== toShow[0] || display2 !== toShow[1]) {
		for (var i = 1; i <= 9; i++) {
			SetSpellSlotsCheckboxes(i, What("SpellSlots.CheckboxesSet.lvl" + i), true);
		}
	}
}

//determine the types of locations there are, and add them to the corresponding fields to calculate their subtotals in weight carried [through field format]
function SetCarriedLocations() {
	var type = event.target.name.substring(0,10) === "Extra.Gear" ? "Extra.Gear " : "Adventuring Gear ";
	var row = parseFloat(event.target.name.slice(-2));
	var total = type === "Extra.Gear " ? FieldNumbers.extragear : FieldNumbers.gear;
	var theEvent = clean(event.target.value, " ");
	var locationList = [];
	var locationTestList = [];
	//loop through all the fields and add any found locations to the array
	for (var i = 1; i <= total; i++) {
		var theLoc = clean(What(type + "Location.Row " + i), " ");
		if (i !== row && theLoc !== "" && locationTestList.indexOf(theLoc.toLowerCase()) === -1) {
			locationList.push(theLoc);
			locationTestList.push(theLoc.toLowerCase());
		} else if (i === row && theEvent !== "" && locationTestList.indexOf(theEvent.toLowerCase()) === -1) {
			locationList.push(theEvent);
			locationTestList.push(theEvent.toLowerCase());
		}
	}
	locationList.sort();
	//loop through the list of locations and add the first 6 found to the subtotal fields
	var locationFields = type === "Extra.Gear " || !typePF ? 6 : 9;
	for (var i = 0; i < locationFields; i++) {
		var aLoc = locationList[i] ? locationList[i] : "";
		Value(type + "Location.SubtotalName " + (i + 1), aLoc);
	}
}

//calculate the subtotal for a given gear location [field calculation]
function CalcCarriedLocation() {
	var type = event.target.name.substring(0,10) === "Extra.Gear" ? "Extra.Gear " : "Adventuring Gear ";
	var number = parseFloat(event.target.name.slice(-1));
	var total = type === "Extra.Gear " ? FieldNumbers.extragear : FieldNumbers.gear;
	var toSearch = clean(What(type + "Location.SubtotalName " + number));
	if (toSearch !== "") {
		var totalweight = 0;
		for (var i = 1; i <= total; i++) {
			var theLoc = clean(What(type + "Location.Row " + i), " ").RegEscape();
			if ((RegExp("\\b" + toSearch + "\\b", "i")).test(theLoc)) {
				var amount = What(type + "Amount " + i);
				var weight = What(type + "Weight " + i);
				if (amount && isNaN(amount) && amount.indexOf(",") !== -1) {
					amount = parseFloat(amount.replace(",", "."));
				}
				if (weight && isNaN(weight) && weight.indexOf(",") !== -1) {
					weight = parseFloat(weight.replace(",", "."));
				}

				if (weight) {
					if (amount === "" || isNaN(amount)) {
						totalweight += weight;
					} else {
						totalweight += amount * weight;
					}
				}
			}
		}
		event.value = totalweight;
	} else {
		event.value = "";
	}
}

//make the appropriate attack field a different color, depending on the menu entry
function ApplyAttackColor(attackNmbr, aColour, type, prefix) {
	if (typePF) return; //don't do this function in the Printer-Friendly version
	var QI = type ? type.indexOf("Comp.") === -1 : !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var prefixA = [""];
	if (!QI && event.target && event.target.name && !prefix) {
		prefixA = [getTemplPre(event.target.name, "AScomp", true)];
	} else if (!QI && prefix) {
		prefixA = [prefix];
	} else if (!QI && !prefix) {
		prefixA = What("Template.extras.AScomp").split(",");
	}
	var Q = QI ? "" : "Comp.Use.";
	var maxItems = QI ? FieldNumbers.attacks : 3;

	startNmbr = attackNmbr ? attackNmbr : 1;
	endNmbr = attackNmbr ? attackNmbr : maxItems;
	for (var pA = 0; pA < prefixA.length; pA++) {
		for (var a = startNmbr; a <= endNmbr; a++) {
			var colour = aColour ? aColour.toLowerCase() : What(prefixA[pA] + "BlueText." + Q + "Attack." + a + ".Weight Title");
			switch (colour) {
				case "same as headers" :
					colour = What("Color.Theme");
					break;
				case "same as dragon heads" :
					colour = What("Color.DragonHeads");
					break;
			}
			if (colour !== "black" && !ColorList[colour]) break;
			var theIcon = tDoc.getField("SaveIMG.Attack." + colour).buttonGetIcon();

			tDoc.getField(prefixA[pA] + "Image." + Q + "Attack." + a).buttonSetIcon(theIcon);
			if (aColour) Value(prefixA[pA] + "BlueText." + Q + "Attack." + a + ".Weight Title", aColour.toLowerCase());
		}
	}
}

//toggle the appearance of the button when it is pushed, cycling between nothing (black), proficiency (colour), and expertise (*) [field action]
function ToggleSkillProf() {
	var isProf = tDoc.getField(event.target.name.replace("Name", "Prof"));
	isProf.currentValueIndices = isProf.currentValueIndices < 2 ? isProf.currentValueIndices + 1 : 0;
}

//apply the change of the field to the colorscheme of the sheet [field format]
function ApplySkillProf() {
	var toChange = event.target.name.substring(0, event.target.name.length - 5);
	switch(event.target.value) {
		case "nothing":
			tDoc.getField(toChange).textColor = color.black;
			break;
		case "proficient":
		case "expertise":
			var theColor = ColorList[What("Color.Theme")];
			if (theColor) tDoc.getField(toChange).textColor = theColor.RGB;
	}
}

//set all the color schemes as the fields dictate
function setColorThemes(reset) {
	if (typePF) return; //don't do this function in the Printer-Friendly version
	ApplyColorScheme(reset ? tDoc.getField("Color.Theme").defaultValue : false);
	ApplyDragonColorScheme(reset ? tDoc.getField("Color.DragonHeads").defaultValue : false);
	ApplyHPDragonColorScheme(reset ? tDoc.getField("Color.HPDragon").defaultValue : false);
	var DCdefaultClrs = tDoc.getField("Color.DC").defaultValue.split(",");
	ApplyDCColorScheme(reset ? DCdefaultClrs[0] : false, 1);
	ApplyDCColorScheme(reset ? DCdefaultClrs[1] : false, 2);
	ApplyAttackColor("", "", "Default");
	ApplyAttackColor("", "", "Comp.");
}

//calculate the proficiency bonus (field calculation)
function ProfBonus(useTarget, newLvlForce) {
	var thisEvent = useTarget && tDoc.getField(useTarget) ? tDoc.getField(useTarget) : event.target;
	var QI = getTemplPre(thisEvent.name, "AScomp");
	var lvl = newLvlForce !== undefined ? newLvlForce : Number(What(QI === true ? "Character Level" : QI + "Comp.Use.HD.Level"));
	var ProfMod = QI === true ? What("Proficiency Bonus Modifier") : 0;
	var useDice = tDoc.getField(QI === true ? "Proficiency Bonus Dice" : QI + "BlueText.Comp.Use.Proficiency Bonus Dice").isBoxChecked(0) === 1;
	var ProfB = lvl ? ProficiencyBonusList[Math.min(lvl, ProficiencyBonusList.length) - 1] : 0;
	thisEvent.submitName = ProfB + ProfMod;
	thisEvent.value = useDice || !lvl ? "" : thisEvent.submitName;
}

//show the proficiency die (field format)
function ProfBonusDisplay(input) {
	var QI = getTemplPre(event.target.name, "AScomp");
	var ProfB = QI === true ? event.target.submitName : input;
	var useDice = tDoc.getField(QI === true ? "Proficiency Bonus Dice" : QI + "BlueText.Comp.Use.Proficiency Bonus Dice").isBoxChecked(0) === 1;
	event.value = useDice ? GetProfDice(ProfB) : !isNaN(event.value) && event.value > 0 ? "+" + event.value : event.value;
}

function GetProfDice(ProfB) {
	var theReturn = "";
	if (ProfB >= 6) {
		theReturn = "d12";
	} else if (ProfB >= 5) {
		theReturn = "d10";
	} else if (ProfB >= 4) {
		theReturn = "d8";
	} else if (ProfB >= 3) {
		theReturn = "d6";
	} else if (ProfB !== "") {
		theReturn = "d4";
	}
	return theReturn;
}