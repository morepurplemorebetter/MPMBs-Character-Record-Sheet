function MakeDocName() {
	return "MorePurpleMoreBetter's D&D 5th edition " + (tDoc.info.SpellsOnly ? "Complete " + tDoc.info.SpellsOnly.capitalize() + " Spell Sheet" : (tDoc.info.AdvLogOnly ? "Adventure Logsheet" : "Character Record Sheet")) + " v" + tDoc.info.SheetVersion.toString() + " (" + tDoc.info.SheetType + ")";
};

function MakeButtons() {
	CreateIcons();
	var oIcon = null; // iconstream
	try {
		if (!tDoc.info.SpellsOnly) {
			app.addToolButton({
				cName : "LayoutButton",
				cExec : minVer ? "MakeAdvLogMenu_AdvLogOptions(true);" : "MakePagesMenu(); PagesOptions();",
				oIcon : allIcons.layout,
				cTooltext : toUni("Set Pages Layout") + "\nSelect which pages are visible in the sheet.\n\nYou can also add more instances of the following pages:\n   \u2022  Companion page;\n   \u2022  Notes page;\n   \u2022  Wild Shapes page.\n\nNote that if you add more pages or you hide/show the pages many times, the file size might increase.",
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
				cExec : minVer ? "AddUserScript();" : "ImportExport_Button();",
				oIcon : allIcons.import,
				cTooltext :  minVer ? toUni("Add Custom Script") + "\nAdd a script to add new spells, modify spells and more, see FAQ." : toUni("Import / Export") + "\n \u2022  Import all the information from an old sheet directly;\n \u2022  Add custom script, see FAQ;\n \u2022  Alternatively, you can import or export data with the .xfdf file format. This method is depreciated, but might still be interesting if you only want to import the equipment sections or only the description sections.\n\nThe description sections include the top of first page, background page, notes, and companion description.",
				nPos : 2,
				cLabel : "Import"
			});
			app.addToolButton({
				cName : "SourcesButton",
				cExec : "resourceDecisionDialog();",
				oIcon : allIcons.sources,
				cTooltext : toUni("Select Sources") + "\nOpen a dialogue where you can select which sourcebooks and materials the sheet is allowed to use and which it has to excluded from the automation." + (this.info.SpellsOnly ? "\n\nHere you can select which sources are used for the spells or even exclude certain spells or spell schools. After you have set this, you will have to manually re-generate the spell sheet using the 'Spells' button/bookmark." : "\n\nHere you can make the sheet include all Unearthed Arcana material or even have the sheet exclude certain classes, races, spells, etc. etc.\n\nYou are advised to set the sources before filling out the sheet as it may cause certain fields to be reset."),
				nPos : 3,
				cLabel : "Sources"
			});
		}

		if (!tDoc.info.SpellsOnly) {
			app.addToolButton({
				cName : "SetTextOptionsButton",
				cExec : "MakeTextMenu_TextOptions();",
				oIcon : allIcons.textsize,
				cTooltext : toUni("Text Options") + "\nGives a dialog where you can:\n   \u2022  Set the font of all fillable fields" + "\n   \u2022  Set the font size of fields with multiple lines;\n   \u2022  Hide\/show the text lines on all pages" + (!typePF ? "" : ";\n   \u2022  Switch between boxes or lines for single-line fields."),
				nPos : 4,
				cLabel : "Text"
			});
		}
		
		if (!minVer) {
			app.addToolButton({
				cName : "ClassesButton",
				cExec : "SelectClass();",
				oIcon : allIcons.classes,
				cTooltext : toUni("Set Character Classes") + "\nOpen a pop-up dialogue where you can set the classes, subclasses, and levels the character has.\n\nYou get drop-down boxes for selecting a class and its subclass, and can test what class something you enter is being recognized as.",
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
				cTooltext : toUni("Weight Calculation") + "\nOpen the Total Weight dialogue where you can choose what is and what is not counted towards the Total Weight on the second page.\n\nIn the dialogue you can also select which encumbrance rules to use.",
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
				cExec : "ToggleBlueText(What('BlueTextRemember'));",
				oIcon : allIcons.modifiers,
				cTooltext : toUni("Modifier Fields") + "\nHide\/show fields where you can manually add modifiers for:\n   \u2022  Ability save DC;\n   \u2022  Attacks to hit and damage bonusses;\n   \u2022  Attacks damage die;\n   \u2022  Proficiency bonus, or the use of proficiency dice;\n   \u2022  Saves;\n   \u2022  Skills, with Jack of All Trades and Remarkable Athlete;\n   \u2022  Number of spell slots;\n   \u2022  Initiative;\n   \u2022  Carrying capacity multiplier;\n   \u2022  Weights of armor, shield, weapons, and ammunition.\n\nThese are the so-called \"blue text fields\" and they won't print, even when they are visible.",
				cMarked : "event.rc = What('BlueTextRemember') === 'Yes';",
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
			cExec : "MakeMobileReady(What('MakeMobileReady Remember') === '');",
			oIcon : allIcons.tablet,
			cTooltext : toUni("Flatten") + "\nSwitch to or from a version of the sheet that is compatible with Acrobat Reader for mobile devices.\nThis flattens all form fields and hides non-printable ones to make the sheet more usable on a phone or tablet.\n\nThe fields used during normal play will stay editable:\n   \u2022  1st page: health, attacks, actions, adv.\/disadv., etc.;\n   \u2022  2nd page: equipment and proficiencies;\n   \u2022  3rd-6th page: all except buttons and portrait\/symbol.",
			cMarked : "event.rc = What('MakeMobileReady Remember') !== '';",
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
			cExec : "tDoc.exportDataObject({ cName: 'FAQ.pdf', nLaunch: 2 });",
			oIcon : allIcons.faq,
			cTooltext : toUni("FAQ") + "\nOpen the frequently asked questions pdf.\n\nThere you can find information on how to add custom code to the sheet, like homebrew races\/weapons\/feats\/etc.",
			nPos : 16,
			cLabel : "FAQ"
		});
	} catch (err) {
		app.addToolButton({
			cName : "TempButton",
			cExec : "",
			cLabel : "Just to make it appear"
		});
		app.removeToolButton({
			cName : "TempButton"
		});
	}
};

function OpeningStatement() {
	var reminders = Number(tDoc.getField("Opening Remember").submitName);
	if (!app.viewerVersion || !reminders || (app.viewerVersion < 15 && reminders <= 3)) {
		CurrentSources.globalExcl = ["UA:TMC"];
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
		this.dirty = false;
		this.pane = "bookmarks"; //open the bookmarks so that on the first opening people can see its existance
		var sheetTitle = "MorePurpleMoreBetter's " + (tDoc.info.SpellsOnly ? "Complete " + tDoc.info.SpellsOnly.capitalize() + " Spell Sheet" : (tDoc.info.AdvLogOnly ? "Adventure Logsheet" : "Character Record Sheet")) + " (" + tDoc.info.SheetType + ") v" + tDoc.info.SheetVersion.toString();
		var Text = "[Can't see the 'OK' button at the bottom? Use ENTER to close this dialog]\n\n";
		Text += "Welcome to " + toUni(sheetTitle);
		Text += " (get the latest version using the bookmark).";
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
		if (!minVer && CurrentSources.firstTime && app.viewerVersion >= 15) resourceDecisionDialog();
	};
	tDoc.calculate = true;
	tDoc.delay = false;
	if (tDoc.getField("SaveIMG.Patreon").submitName !== "") {
		OpeningStatementVar = app.setTimeOut("PatreonStatement();", 66000);
	};
};

function RemoveTooltips() {
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
		"Height",
		"Weight",
		"Age",
		"Racial Traits",
		"Highlighting"
	];
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
	for (i = 0; i < AbilityScores.abbreviations.length; i++) {
		TooltipArray.push(AbilityScores.abbreviations[i] + " ST Prof");
	}
	for (i = 1; i <= FieldNumbers.limfea; i++) {
		TooltipArray.push("Limited Feature " + i);
	}
	for (i = 1; i <= 6; i++) {
		TooltipArray.push("Resistance Damage Type " + i);
	}

	//remove the tooltips from every fieldname in the array
	for (i = 0; i < TooltipArray.length; i++) {
		AddTooltip(TooltipArray[i], "");
	}
	AddTooltip("Equipment.menu", "Click here to add equipment to the adventuring gear section, or to reset it (this button does not print).\n\nIt is recommended to pick a pack first before you add any background's items.");
	AddTooltip("Background Extra", "First fill out a background in the field to the left.\n\nOnce a background is recognized that offers additional options, those additional options will be displayed here. For example, the \"Origin\" for the \"Outlander\" background.");
	AddTooltip("Size Category", "Selected size category will effect encumbrance on the second page.");

	// now call to update the tooltips with the new empty global variables
	UpdateTooltips();
};

function AddAction(actiontype, action, actiontooltip, replaceThis) {
	var TheAction = actiontype.toLowerCase();
	if (TheAction.indexOf("bonus") !== -1) {
		var field = "Bonus Action ";
	} else if (TheAction.indexOf("reaction") !== -1) {
		var field = "Reaction ";
	} else if (TheAction.indexOf("action") !== -1) {
		var field = "Action ";
	}
	var numberOfFields = field === "Action " ? FieldNumbers.trueactions : FieldNumbers.actions;
	var tempString = actiontooltip ? "The " + actiontype.toLowerCase() + " \"" + action + "\" was gained from " + actiontooltip + "." : "";
	var doReplace = false;
	for (var n = 1; n <= 2; n++) {
		for (var i = 1; i <= numberOfFields; i++) {
			var next = tDoc.getField(field + i);
			if (n === 1 && next.value.toLowerCase().indexOf(action.toLowerCase()) !== -1 && (!replaceThis || next.value.toLowerCase().indexOf(replaceThis.toLowerCase()) === -1)) {
				i = 90; n = 3;
			} else if (n === 1 && replaceThis && next.value.toLowerCase().indexOf(replaceThis.toLowerCase()) !== -1) {
				doReplace = true;
			} else if (n === 2 && ((doReplace && next.value.toLowerCase().indexOf(replaceThis.toLowerCase()) !== -1) || (!doReplace && next.value === ""))) {
				next.value = action;
				if (!doReplace) next.userName = tempString;
				i = 90;
			}
		}
	}
}

function RemoveAction(actiontype, action) {
	var TheAction = actiontype.toLowerCase();
	if (TheAction.indexOf("bonus") !== -1) {
		var field = "Bonus Action ";
	} else if (TheAction.indexOf("reaction") !== -1) {
		var field = "Reaction ";
	} else if (TheAction.indexOf("action") !== -1) {
		var field = "Action ";
	}
	var numberOfFields = field === "Action " ? FieldNumbers.trueactions : FieldNumbers.actions;
	for (var i = 1; i <= numberOfFields; i++) {
		var next = tDoc.getField(field + i);
		if ((typeof action == "object" && (action).test(next.value)) || (typeof action == "string" && next.value.toLowerCase().indexOf(action.toLowerCase()) !== -1)) {
			DeleteItemType(field, i, numberOfFields);
			i = numberOfFields + 1;
		}
	}
}

function AddResistance(Input, tooltiptext, replaceThis) {
	var useful = 0;
	var tooltipString = Input;
	if (isNaN(Input) && !(/\(.+\)/).test(Input)) {
		for (var key in DamageTypes) {
			if (Input.toLowerCase().indexOf(key) !== -1) {
				useful = DamageTypes[key].index;
				tooltipString = key.capitalize();
				break;
			}
		}
	};
	var tempString = tooltiptext ? "The resistance to \"" + tooltipString + "\" was gained from " + tooltiptext + "." : "";
	var doReplace = false;
	for (var n = 1; n <= 2; n++) {
		for (var k = 1; k < 7; k++) {
			var next = tDoc.getField("Resistance Damage Type " + k);
			if (n === 1 && ((useful && next.currentValueIndices === useful) || (!useful && next.value.toLowerCase().indexOf(Input.toLowerCase()) !== -1))) {
				k = 7;
				n = 3;
			} else if (n === 1 && replaceThis && next.value.toLowerCase().indexOf(replaceThis.toLowerCase()) !== -1) {
				doReplace = true;
			} else if (n === 2 && ((doReplace && next.value.toLowerCase().indexOf(replaceThis.toLowerCase()) !== -1) || (!doReplace && clean(next.value) === ""))) {
				if (useful) {
					next.currentValueIndices = useful;
				} else {
					next.value = Input;
				}
				if (!doReplace) next.userName = tempString;
				k = 7;
			}
		}
	}
};

function RemoveResistance(Input) {
	var useful = Input;
	var temp = false;
	if (isNaN(Input) && !(/\(.+\)/).test(Input)) {
		useful = Input.toLowerCase();
		for (var key in DamageTypes) {
			if (!temp && useful.indexOf(key) !== -1) {
				useful = DamageTypes[key].index;
				temp = true;
			}
		}
	};
	for (var k = 1; k < 7; k++) {
		var ResFld = tDoc.getField("Resistance Damage Type " + k);
		if ((temp && ResFld.currentValueIndices === useful) || ResFld.value === useful) {
			DeleteItemType("Resistance Damage Type ", k, 6);
			k = 7;
		}
	}
};

function AddDmgType(Field, Input) {
	var useful = !Input ? 0 : (DamageTypes[Input.toLowerCase()] ? DamageTypes[Input.toLowerCase()].index : Input);
	PickDropdown(Field, useful);
};

// Toggle between text lines being visible and whiteout hidden Toggle = false ("Yes") or lines being hidden and whiteout visible Toggle = true ("No")
function ToggleWhiteout(Toggle) {
	thermoM("start"); //start a progress dialog
	thermoM("Changing the visibility of the lines..."); //change the progress dialog text
	tDoc.delay = true;
	tDoc.calculate = false;
	//if the sheet is currently flattened, undo that first
	if (What("MakeMobileReady Remember") !== "") MakeMobileReady(false);
	
	var HiddenVisible = !Toggle ? "Hide" : "Show";
	var NoPrintHidden = !Toggle ? "DontPrint" : "Hide";
	var HiddenNoPrint = !Toggle ? "Hide" : "DontPrint";
	
	//add the fields for all the template pages into an array
	var compTemps = What("Template.extras.AScomp").split(",");
	var noteTemps = What("Template.extras.ASnotes").split(",");
	noteTemps.splice(noteTemps.indexOf(""), 1);
	var wildTemps = What("Template.extras.WSfront").split(",");
	wildTemps.splice(wildTemps.indexOf(""), 1);
	var logTemps = What("Template.extras.ALlog").split(",");
	logTemps.splice(logTemps.indexOf(""), 1);
	var templateA = compTemps.concat(noteTemps).concat(wildTemps).concat(logTemps);

	//show/hide the whiteout fields as per the array
	for (var i = 0; i < templateA.length; i++) {
		tDoc[HiddenVisible](templateA[i] + "Whiteout");
		thermoM(i/(templateA.length + 3)); //increment the progress dialog's progress
	};
	
	if (!typePF && !minVer) {
		//show/hide the whiteout field on page 3 depending on the state of the layers
		var selection = What("Extra.Layers Remember").split(",");
		var HiddenLayersLeft = Toggle && selection[0] === "notes" ? "Show" : "Hide";
		var HiddenLayersRight = Toggle && selection[1] === "equipment" ? "Show" : "Hide";
		tDoc[HiddenLayersLeft]("Extra.Notes Whiteout");
		thermoM((templateA.length + 1)/(templateA.length + 3)); //increment the progress dialog's progress
		tDoc[HiddenLayersRight]("Extra.Other Holdings Whiteout");
		thermoM((templateA.length + 2)/(templateA.length + 3)); //increment the progress dialog's progress
	}

	Value("WhiteoutRemember", Toggle);
	
	thermoM("stop"); //stop the top progress dialog
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
};

function ResetAll(GoOn) {
	var ResetDialog = {
		cTitle : "Reset the whole sheet",
		cMsg : "Are you sure you want to reset all fields and functions to their initial value?\nThis will undo any changes you have made, including Custom Scripts, page layout, source selection, and imported images.\n\nThis cannot be undone!",
		nIcon : 1, //Warning
		nType : 2, //Yes, No
	}
	
	if (GoOn || app.alert(ResetDialog) === 4) {
		thermoM("start"); //start a progress dialog
		if (GoOn) {
			thermoM("Resetting the sheet \"" + tDoc.documentFileName + "\"..."); //change the progress dialog text
		} else {
			thermoM("Resetting the sheet..."); //change the progress dialog text
		}
		
		tDoc.delay = true;
		tDoc.calculate = false;
		
		// Set global variable to reflect reset
		IsNotReset = false;
		
		//make a variable of the current state of location columns in the equipment sections
		var locColumns = What("Gear Location Remember").split(",");

		//Undo the MakeMobileReady if it was active
		if (What("MakeMobileReady Remember") !== "") {
			MakeMobileReady(false);
		}
		
		thermoM(1/9); //increment the progress dialog's progress
		
		//delete any extra templates and make any template that is invisible, visible
		RemoveSpellSheets(); //first do all the Spell Sheets
		for (var R in TemplateDep) {
			if (R === "SSfront" || R === "SSmore" || (!typePF && R === "PRsheet")) continue; //don't do this for the spell sheets, they have their own function; also don't do it for the player reference sheet in not the Printer Friendly version, as it doesn't exist
			//first see if the template is visible
			var isTempVisible = tDoc.getField(BookMarkList[R]).page !== -1;
			var tempExtras = What("Template.extras." + R);
			
			//if invisible, make it visible
			if (!isTempVisible) {
				if (R !== "ALlog" && R !== "WSfront" && R !== "ASoverflow") DoTemplate(R); //only show the page if it is not the adventurers logsheet page or the wild shapes page or the overflow page
			//if visible AND extra templates are an option, remove any extra templates
			} else if (tempExtras) {
				tempExtras = tempExtras.split(",");
				if (tempExtras) {
					for (var RtE = 1; RtE < tempExtras.length; RtE++) {
						DoTemplate(R, "Remove");
					}
				}
			}
			if (isTempVisible && (R === "ALlog" || R === "WSfront" || R === "ASoverflow")) {
				DoTemplate(R); //remove the adventurers logsheet page or wild shapes page or the overflow page
			}
		}
		// now move the focus to the first page
		tDoc.getField(BookMarkList["CSfront"]).setFocus();
		tDoc.getField("All ST Bonus").setAction("Calculate", "var placeholder = 1;");
		
		setListsUnitSystem("imperial"); //reset the values of some variables to the right unit system
		
		thermoM(2/9); //increment the progress dialog's progress
		
		//reset of all the form field values
		tDoc.resetForm(["Wildshape.Race", "Race", "Class and Levels", "Background", "Comp.Race"]);
		thermoM(3/9); //increment the progress dialog's progress
		for (var i = 1; i <= FieldNumbers.limfea; i++) {
			tDoc.getField("Limited Feature Max Usages " + i).setAction("Calculate", "");
			tDoc.getField("Limited Feature Max Usages " + i).submitName = "";
		}
		tDoc.getField("AC Misc Mod 1 Description").submitName = "";
		tDoc.getField("AC Misc Mod 2 Description").submitName = "";
		tDoc.getField("Opening Remember").submitName = 1;
		tDoc.resetForm();
		thermoM(4/9); //increment the progress dialog's progress
		
		//Reset the color scheme to red
		setColorThemes();
		thermoM(5/9); //increment the progress dialog's progress

		//reset some global variables
		CurrentArmour.proficiencies = {};
		CurrentWeapons.proficiencies = {};
		CurrentWeapons.extraproficiencies = [];
		CurrentWeapons.manualproficiencies = [];
		ApplyProficiencies(true);
		CurrentClasses = {};
		classes.known = {};
		classes.extraskills = [];
		CurrentRace = {};
		CurrentBackground = {};
		CurrentCompRace = {};
		GetStringifieds(GoOn);
		resourceDecisionDialog(true, true); //to make sure that even if the sheet is used before re-opening, the resources are set to default

		//call upon some functions to reset other stuff than field values
		ShowCalcBoxesLines();
		ToggleWhiteout(false);
		ChangeFont();
		ToggleTextSize();
		ToggleAttacks("Yes");
		ToggleBlueText("Yes");
		ShowHideStealthDisadv();
		AdventureLeagueOptions("advleague#all#0");
		SetSpellSlotsVisibility();
		ShowHonorSanity();
		thermoM(6/9); //increment the progress dialog's progress
		LayerVisibilityOptions(false);
		ShowCompanionLayer();
		ConditionSet();
		RemoveTooltips();
		ShowAttunedMagicalItems(true);
		if (locColumns[0] === "true") HideInvLocationColumn("Adventuring Gear ", true);
		if (locColumns[1] === "true") HideInvLocationColumn("Extra.Gear ", true);
		SetHighlighting();
		SetHPTooltip("reset");
		UpdateALdateFormat();
		DnDlogo();
		Hide("Weight Carrying Capacity");
		Show("Weight Heavily Encumbered");
		thermoM(7/9); //increment the progress dialog's progress
		
		//Reset portrait & symbol to original blank
		ClearIcons("HeaderIcon", true);
		ClearIcons("AdvLog.HeaderIcon", true);
		ClearIcons("Portrait", true);
		ClearIcons("Symbol", true);
		ClearIcons("Comp.img.Portrait", true);
		
		//re-apply the rich text (deleted because of resetting the form fields)
		MakeSkillsMenu_SkillsOptions(["go", "alphabeta"]);
		AddTooltip("Text.SkillsNames", "alphabeta");
		SetRichTextFields();
		
		//Set the initial state of the Ability Save DC number 2
		Toggle2ndAbilityDC("hide");
		
		thermoM(8/9); //increment the progress dialog's progress
		
		//Set global variable to reflect end of reset
		IsNotReset = true;
		
		thermoM("stop"); //stop the top progress dialog

		tDoc.calculate = IsNotReset;
		tDoc.delay = !IsNotReset;
		tDoc.calculateNow();
	}
};

// Select the text size to use, or, if left empty, select the default text size of 5.74
function ToggleTextSize(Toggle) {
	thermoM("start"); //start a progress dialog
	tDoc.delay = true;
	tDoc.calculate = false;
	
	var ToggleSize = Toggle !== undefined && !isNaN(Toggle) ? parseFloat(Toggle) : (typePF ? 7 : 5.74);
	thermoM("Changing the font size to " + (ToggleSize ? "'Auto'" : ToggleSize) + "..."); //change the progress dialog text
	
	Value("FontSize Remember", ToggleSize);
	
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
		];
		if (!typePF) {
			LinesFld.push("Background_Organisation");
		} else {
			LinesFld.push("Background_Organisation.Left");
			LinesFld.push("Background_Organisation.Right");
		}
		
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
			LinesFld.push(prefix + "Comp.Use.HP.Current");
			LinesFld.push(prefix + "Comp.Use.Senses");
			LinesFld.push(prefix + "Comp.Use.Features");
			LinesFld.push(prefix + "Comp.Use.Traits");
			LinesFld.push(prefix + "Cnote.Left");
			LinesFld.push(prefix + "Cnote.Right");
		}
		
		//add the lines for all the notes pages
		var noteTemps = What("Template.extras.ASnotes").split(",");
		for (var T = 0; T < noteTemps.length; T++) {
			var prefix = noteTemps[T];
			LinesFld.push(prefix + "Notes.Left");
			LinesFld.push(prefix + "Notes.Right");
		}
		
		//add the lines for all the wild shapes pages
		var wildTemps = What("Template.extras.WSfront").split(",");
		for (var T = 0; T < wildTemps.length; T++) {
			var prefix = wildTemps[T];
			for (var W = 1; W <= 4; W++) {
				LinesFld.push(prefix + "Wildshape." + W + ".HP Current");
				LinesFld.push(prefix + "Wildshape." + W + ".Traits");
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
		tDoc.getField(LinesFld[i]).textSize = ToggleSize;
		thermoM(i/LinesFld.length); //increment the progress dialog's progress
	};
	
	thermoM("stop"); //stop the top progress dialog
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
};

//set the visibility of the layers on the third page. Input is true if a menu is to be created, or false if the remembered setting is to be taken.
function LayerVisibilityOptions(input) {
	if (typePF) return; //don't do this function in the Printer-Friendly version
	tDoc.delay = true;
	tDoc.calculate = false;

	//Undo the MakeMobileReady if it was active
	if (input && What("MakeMobileReady Remember") !== "") {
		MakeMobileReady(false);
	}
	
	var selection = What("Extra.Layers Remember").split(",");
	
	Menus.chooselayers = [{
			cName : "Rules left - Equipment right",
			cReturn : "rules#equipment",
			bMarked : selection[0] === "rules" && selection[1] === "equipment"
		}, {
			cName : "Notes left - Equipment right",
			cReturn : "notes#equipment",
			bMarked : selection[0] === "notes" && selection[1] === "equipment"
		}, {
			cName : "Notes left - Rules right",
			cReturn : "notes#rules",
			bMarked : selection[0] === "notes" && selection[1] === "rules"
		}, ]
	
	if (input) {
		selection = getMenu("chooselayers");
		if (selection[0] !== "nothing") {
			Value("Extra.Layers Remember", selection);
		}
	}
	
	if (selection[0] !== "nothing") {
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
		
		//hide/show the whitout fields on the right and left side depending on the visible layer and the settings of text line visibility
		if (What("WhiteoutRemember")) {
			if (selection[0] === "notes") {
				Show("Extra.Notes Whiteout");
			} else {
				Hide("Extra.Notes Whiteout");
			}
			if (selection[1] === "equipment") {
				Show("Extra.Other Holdings Whiteout");
			} else {
				Hide("Extra.Other Holdings Whiteout");
			}
		} else {
			Hide("Extra.Notes Whiteout");
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

		//set the visiblity of the fields
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
	}
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

// Toggle between calculated (Yes) and manual (No) attack fields
function ToggleAttacks(Toggle) {
	thermoM("start"); //start a progress dialog
	thermoM("Changing the attacks to " + (Toggle === "Yes" ? "calculated" : "manual") + "..."); //change the progress dialog text

	//Undo the MakeMobileReady if it was active
	if (What("MakeMobileReady Remember") !== "") {
		MakeMobileReady(false);
	}

	var YesNo = Toggle === "Yes" ? "No" : "Yes";
	var VisibleHidden = Toggle === "Yes" ? "Show" : "Hide";
	var HiddenVisible = Toggle === "Yes" ? "Hide" : "Show";
	var NoPrintHidden = Toggle === "Yes" ? "DontPrint" : "Hide";
	var ReadOnly = Toggle === "Yes" ? "Uneditable" : "Editable";
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
	
	if (What("BlueTextRemember") === "Yes") {
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

	Value("Manual Attack Remember", YesNo);
	
	thermoM("stop"); //stop the top progress dialog
};

//Toggle between visible (No) and hidden (Yes) fields that have 'blue text' (i.e. that are no-print modifiers)
function ToggleBlueText(Toggle) {
	thermoM("start"); //start a progress dialog
	tDoc.delay = true;
	tDoc.calculate = false;

	//Undo the MakeMobileReady if it was active
	if (What("MakeMobileReady Remember") !== "") {
		MakeMobileReady(false);
	}
	
	thermoM((Toggle === "Yes" ? "Hiding" : "Showing") + " the modifier fields..."); //change the progress dialog text

	var YesNo = Toggle === "Yes" ? "No" : "Yes";
	var HiddenNoPrint = Toggle === "Yes" ? "Hide" : "DontPrint";

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
	if (What("Manual Attack Remember") === "Yes") {
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
		var showSlots = eval(What("SpellSlotsRemember"));
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
	if (SSvisible) {
		for (var A = 0; A < SSarray.length; A++) {
			var prefix = SSarray[A];
			if (prefix === "") continue; //skip the ones where the prefix is nothing
			for (var i = 0; i < 4; i++) {
				var SSfieldsArray = [
					prefix + "spellshead.Text.header." + i, //0
					prefix + "spellshead.class." + i, //1
					prefix + "BlueText.spellshead.prepare." + i, //2
					prefix + "BlueText.spellshead.attack." + i, //3
					prefix + "BlueText.spellshead.dc." + i,  //4
					prefix + "spellshead.prepare." + i, //5
				];
				if (HiddenNoPrint === "Hide") {
					Hide(SSfieldsArray[2]);
					Hide(SSfieldsArray[3]);
					Hide(SSfieldsArray[4]);
				} else if (HiddenNoPrint === "DontPrint" && tDoc.getField(SSfieldsArray[0]).display === display.visible) {
					var aCast = What(SSfieldsArray[1]);
					if (tDoc.getField(SSfieldsArray[5]).display === display.visible) {
						DontPrint(SSfieldsArray[2]);
					}
					DontPrint(SSfieldsArray[3]);
					DontPrint(SSfieldsArray[4]);
				}
			}
		}
	}

	if (What("HoSRememberState") && HiddenNoPrint === "DontPrint") {
		DontPrint("HoS ST Bonus");
	} else {
		Hide("HoS ST Bonus");
	}
	
	Value("BlueTextRemember", YesNo);
	thermoM("stop"); //stop the top progress dialog
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) {
		tDoc.calculateNow();
	};
};

// Toggle faction, faction ranks, renown, and DCI to visible (Off) or hidden (On)
function ToggleAdventureLeague(Toggle, skipLogSheet) {
	tDoc.delay = true;
	tDoc.calculate = false;

	//Undo the MakeMobileReady if it was active
	if (What("MakeMobileReady Remember") !== "") {
		MakeMobileReady(false);
	}
	
	//Show the adventurers log, if not already visible
	if (!skipLogSheet && Toggle === "Off" && tDoc.getField(BookMarkList["ALlog"]).page === -1) {
		DoTemplate("ALlog");
	}

	var OnOff = Toggle === "Off" ? "On" : "Off";
	var HiddenVisible = Toggle === "Off" ? "Hide" : "Show";	var VisibleHidden = Toggle === "Off" ? "Show" : "Hide";
	var NoPrintHidden = Toggle === "Off" ? "DontPrint" : "Hide";
	var HiddenNoPrint = Toggle === "Off" ? "Hide" : "DontPrint";
	var isBackgrVisible = tDoc.getField(BookMarkList["ASbackgr"]).page !== -1
	
	if (!typePF) {
		var FactionList = [
			"Background_Organisation.1",
			"Background_Faction.Title",
			"Background_Faction.Text",
			"Background_FactionRank.Title",
			"Background_FactionRank.Text",
			"Background_Renown.Title",
			"Background_Renown.Text",
			"Class and Levels.1",
			"DCI.Text",
			"DCI.Title"
		];
		if (isBackgrVisible) {
			FactionList.push("Background_Organisation.3")
			tDoc[HiddenVisible]("Background_Organisation.2");
		}
		
		tDoc[HiddenVisible]("Background_Organisation.0");
		tDoc[HiddenVisible]("Class and Levels.0");
	
		if (Toggle === "Off") {
			RemoveAction("action", "Overrun / Tumble (or as bonus action)");
			RemoveAction("action", "As 1 attack: Disarm / Grapple / Shove");
			AddAction("action", "Grapple / Shove (instead of 1 attack)");
		} else {
			RemoveAction("action", "Grapple / Shove (instead of 1 attack)");
			AddAction("action", "Overrun / Tumble (or as bonus action)");
			AddAction("action", "As 1 attack: Disarm / Grapple / Shove");
		}
	} else {
		var FactionList = [
			"Background_FactionRank.Text",
			"Image.Background_FactionRank",
			"Background_Renown.Title",
			"Background_Renown.Text",
			"DCI.Text",
			"DCI.Title",
			"Text.PRsheet.AL"
		];
		
		tDoc[HiddenVisible]("Background_Organisation.Right");
	}

	for (var i = 0; i < FactionList.length; i++) {
		tDoc[VisibleHidden](FactionList[i]);
	};
	
	Value("League Remember", OnOff);
	
	var theHP = tDoc.getField("HP Max").submitName.split(",");
	theHP[3] = Toggle === "Off" ? "fixed" : "nothing";
	tDoc.getField("HP Max").submitName = theHP.join();
	if (OnOff === "On") SetHPTooltip();
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
};

//make a menu for the adventure league button/bookmark and put it in the global variable
function MakeAdventureLeagueMenu() {	
	var submenuItems = [
		["Set the HP on the 1st page to automatically use fixed values", "hp", tDoc.getField("HP Max").submitName.split(",")[3] === "fixed"], // 0
		["Show DCI field on 1st page", "dci", isDisplay("DCI.Text") === display.visible], // 1
		["Remove DMG actions from 1st page (not legal in AL play)", "actions", true], // 2
		[typePF ? "Show space for Faction Rank on the Background page" : "Show space for Faction, Faction Rank, and Renown on the Background page", "factionrank", isDisplay("Background_FactionRank.Text") === display.visible], // 3
		["-", "-", false], // 4
		["Show Adventure Logsheet", "allog", tDoc.getField(BookMarkList["ALlog"]).page !== -1], // 5
		["-", "-", false], // 6
		["Prepare the sheet for Adventurers League play (i.e. do all of the above)", "all#1", false], // 7
		["Undo all of those marked above", "all#0", false], // 8
	];
	
	if (typePF) {
		submenuItems[2] = ["Show Renown on the Background page", "renown", isDisplay("Background_Renown.Text") === display.visible];
		submenuItems.splice(4, 0, ["Mark actions on the Player Reference page that are not legal in AL play", "asterisks", isDisplay("Text.PRsheet.AL.asterisk") === display.visible])
	} else {
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
	
	if (MenuSelection[0] === "advleague") {
		tDoc.delay = true;
		tDoc.calculate = false;
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
				hp : undefined
			};
			selection[MenuSelection[1]] = set;
			ToggleAdventureLeague(selection);
			if (!set) tDoc.getField("League Remember").submitName = set;
		};
		//Save the toSaveSelection for later reprisal when importing
		Value("League Remember", toSaveSelection.toSource());
		
		tDoc.calculate = IsNotReset;
		tDoc.delay = !IsNotReset;
		if (IsNotReset) tDoc.calculateNow();
	};
};

// Set the visibility of the fields for faction, faction ranks, renown, and DCI
function ToggleAdventureLeague(Setting) {
	Setting = Setting ? Setting : {};
	var isBackgrVisible = tDoc.getField(BookMarkList["ASbackgr"]).page !== -1

	//Undo the MakeMobileReady if it was active
	if (What("MakeMobileReady Remember") !== "") {
		MakeMobileReady(false);
	};
	
	//Show the adventurers log, if not already visible
	if (Setting.allog !== undefined) {
		DoTemplate("ALlog");
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
			RemoveAction("action", "Overrun / Tumble (or as bonus action)");
			AddAction("action", "Grapple / Shove (instead of 1 attack)", "", "As 1 attack: Disarm / Grapple / Shove");
		} else {
			AddAction("action", "Overrun / Tumble (or as bonus action)");
			AddAction("action", "As 1 attack: Disarm / Grapple / Shove", "", "Grapple / Shove (instead of 1 attack)");
		};
	};

	//Set the HP to using fixed values
	if (Setting.hp !== undefined) {
		var theHP = tDoc.getField("HP Max").submitName.split(",");
		theHP[3] = Setting.hp ? "fixed" : "nothing";
		tDoc.getField("HP Max").submitName = theHP.join();
		SetHPTooltip();
	};
};

//search the string for possible armour
function ParseArmor(input, onlyInv) {
	if (!input) return "";
	input = removeDiacritics(input);
	var outputL = 0;
	var output = "";
	
	//scan string for all weapons, including the alternative spellings using regular expression
	for (var key in ArmourList) {
		if (ArmourList[key].regExpSearch) {
			if ((onlyInv && ArmourList[key].weight == undefined) || testSource(key, ArmourList[key], "armorExcl")) continue; // test if the armour or its source isn't excluded
			var wSearch = ArmourList[key].regExpSearch; //use the defined regular expression of the weapon
			if ((wSearch).test(input) && outputL < key.length) {
				outputL = key.length;
				output = key;
			}
		}
	}
	
	return output;
};

//Find if the armor is a known armor
function FindArmor(input) {
	if (input === undefined) {
		CurrentArmour.field = What("AC Armor Description").toLowerCase();
	};
	var tempString = CurrentArmour.field;
	var temp = "";
	var tempFound = false;
	CurrentArmour.known = ParseArmor(tempString);
	
	CurrentArmour.dex = "";
	if (CurrentArmour.known && ArmourList[CurrentArmour.known] && ArmourList[CurrentArmour.known].dex !== undefined && !isNaN(ArmourList[CurrentArmour.known].dex)) {
		CurrentArmour.dex = ArmourList[CurrentArmour.known].dex;
	}

	//add magical bonus, denoted by a "+"
	var magicBonus = parseFloat(tempString.match(/(^|\s|\(|\[)[\+|-]\d+/));
	CurrentArmour.magic = !isNaN(magicBonus) ? Number(magicBonus) : 0;
	
	CurrentArmour.mod = "";
	if (CurrentArmour.known && ArmourList[CurrentArmour.known] && ArmourList[CurrentArmour.known].addMod) {
		for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
			temp = AbilityScores.abbreviations[i];
			if (tempString.indexOf(temp.toLowerCase()) !== -1) {
				CurrentArmour.mod = temp + " Mod";
				i = AbilityScores.abbreviations.length;
			}
		}
	}
};

// Change the armor features
function ApplyArmor(input) {
	thermoM("start"); //start a progress dialog
	thermoM("Applying armor..."); //change the progress 
	tDoc.delay = true;
	tDoc.calculate = false;
	CurrentArmour.field = input.toLowerCase();
	var ArmorFields = [
		"AC Armor Bonus", //0
		"Medium Armor", //1
		"Heavy Armor", //2
		"AC Stealth Disadvantage", //3
		"AC Armor Weight", //4
		"AC Dexterity Modifier" //5
	];

	thermoM("Testing if it is a known armor..."); //change the progress dialog text
	FindArmor(input);

	tDoc.getField(ArmorFields[0]).setAction("Calculate", "var placeholder = \"just to keep the calculation from being done too late\";");

	if (CurrentArmour.known !== undefined && ArmourList[CurrentArmour.known] !== undefined) {
		thermoM("Applying the recognized armor..."); //change the progress dialog text
		var ArmorStealth = (ArmourList[CurrentArmour.known].type === "medium" && What("Medium Armor Max Mod") === 3) || (/mithral/i).test(CurrentArmour.field) ? false : ArmourList[CurrentArmour.known].stealthdis;
		Checkbox(ArmorFields[3], ArmorStealth);
		ConditionSet();
		Checkbox(ArmorFields[1], ArmourList[CurrentArmour.known].type === "medium");
		Checkbox(ArmorFields[2], ArmourList[CurrentArmour.known].type === "heavy");
		thermoM(1/3); //increment the progress dialog's progress
		
		if (CurrentArmour.mod) {
			var theCalc = "event.value = " + ArmourList[CurrentArmour.known].ac + " + Number(What(\"" + CurrentArmour.mod + "\")) + " + CurrentArmour.magic;
			tDoc.getField(ArmorFields[0]).setAction("Calculate", theCalc);
		} else {
			Value(ArmorFields[0], ArmourList[CurrentArmour.known].ac + CurrentArmour.magic);
		}
		thermoM(2/3); //increment the progress dialog's progress
		
		//add weight of the armor
		if (ArmourList[CurrentArmour.known].weight) {
			var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
			Value(ArmorFields[4], RoundTo(ArmourList[CurrentArmour.known].weight * massMod, 0.001, true));
		} else {
			Value(ArmorFields[4], 0);
		}
		
		thermoM("stop"); //stop the top progress dialog
	} else {
		thermoM("Resetting the armor fields..."); //change the progress dialog text
		tDoc.resetForm(ArmorFields);
		thermoM("stop"); //stop the top progress dialog
	}
	ShowHideStealthDisadv();
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
};

//a function to calculate the value of the Dex field in the Armour section (returns a value)
function calcMaxDexToAC() {
	var dexMod = What("Dex Mod");
	if (dexMod === "") {
		
	} else if (CurrentArmour.dex !== "") {
		dexMod = CurrentArmour.dex == -10 ? 0 : Math.min(dexMod, CurrentArmour.dex);
	} else if (tDoc.getField("Heavy Armor").isBoxChecked(0)) {
		dexMod = 0;
	} else if (tDoc.getField("Medium Armor").isBoxChecked(0)) {
		dexMod = Math.min(dexMod, Number(What("Medium Armor Max Mod")));
	};

	return dexMod;
};

// find the magic bonus in the shield description
function FindShield(input) {
	if (!input) {
		CurrentShield.field = What("AC Shield Bonus Description").toLowerCase();
	}
	var tempString = CurrentShield.field;
	var temp = "";

	//add magical bonus, denoted by a "+"
	var magicBonus = parseFloat(tempString.match(/(^|\s|\(|\[)[\+|-]\d+/));
	CurrentShield.magic = !isNaN(magicBonus) ? Number(magicBonus) : 0;
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
function ConditionSet() {
	if (typePF) return; //don't do this function in the Printer-Friendly version
	thermoM("start"); //start a progress dialog
	thermoM("Applying the conditions..."); //change the progress dialog text
	tDoc.delay = true;
	tDoc.calculate = false;
	
	var Exh1 = tDoc.getField("Extra.Exhaustion Level 1");
	var Exh2 = tDoc.getField("Extra.Exhaustion Level 2");
	var Exh3 = tDoc.getField("Extra.Exhaustion Level 3");
	var Exh4 = tDoc.getField("Extra.Exhaustion Level 4");
	var Exh5 = tDoc.getField("Extra.Exhaustion Level 5");
	var Exh6 = tDoc.getField("Extra.Exhaustion Level 6");
	var Blinded = tDoc.getField("Extra.Condition 1");
	var Frightened = tDoc.getField("Extra.Condition 4");
	var Grappled = tDoc.getField("Extra.Condition 5");
	var Invisible = tDoc.getField("Extra.Condition 7");
	var Paralyzed = tDoc.getField("Extra.Condition 8");
	var Petrified = tDoc.getField("Extra.Condition 9");
	var Poisoned = tDoc.getField("Extra.Condition 10");
	var Prone = tDoc.getField("Extra.Condition 11");
	var Restrained = tDoc.getField("Extra.Condition 12");
	var Stunned = tDoc.getField("Extra.Condition 13");
	var Unconscious = tDoc.getField("Extra.Condition 14");
	var ArmDis = tDoc.getField("AC Stealth Disadvantage");
	
	//check if by (un)checking this field, another field needs to be (un)checked as well
	var theField = (event.target && event.target.name && !(/ac|reset|import/i).test(event.target.name)) ? event.target.name : "reset";
	var FieldNmbr = Number(theField.slice(-2));
	var FieldChecked = theField !== "reset" && event.target.type === "checkbox" ? event.target.isBoxChecked(0) : "reset";
	var CheckItAlso = FieldChecked === 1;
	
	//Do something with other fields dependent on the selection
	if (theField.indexOf("Extra.Exhaustion Level ") !== -1) {
		//if checking the box, check the lower ones as well
		if (FieldChecked === 1 && FieldNmbr > 1) {
			for (var X = 1; X < FieldNmbr; X++) {
				Checkbox("Extra.Exhaustion Level " + X, true);
			}
		} else if (FieldChecked === 0 && FieldNmbr < 6) { //if unchecking the box, uncheck the higher ones as well
			for (var x = FieldNmbr; x <= 6; x++) {
				Checkbox("Extra.Exhaustion Level " + x, false);
			}
		}
	} else if (theField === "Extra.Condition 14") { //If Unconscious
		Checkbox("Extra.Condition 6", CheckItAlso); //Incapacitated
		if(CheckItAlso) {Checkbox("Extra.Condition 11", true)}; //Prone, but don't remove condition upon removing unconscious
	} else if (theField === "Extra.Condition 8") { //If Paralyzed
		Checkbox("Extra.Condition 6", CheckItAlso); //Incapacitated
	} else if (theField === "Extra.Condition 9") { //If Petrified
		Checkbox("Extra.Condition 6", CheckItAlso); //Incapacitated
		Checkbox("Extra.Condition 8", CheckItAlso); //Paralyzed
		if (CheckItAlso) {
			AddResistance("All (petrified)", "being petrified");
		} else {
			RemoveResistance("All (petrified)");
		}
	} else if (theField === "Extra.Condition 13") { //If Stunned
		Checkbox("Extra.Condition 6", CheckItAlso); //Incapacitated
	} else if (theField === "Extra.Condition 1") { //If Blinded
		if (FieldChecked === 1) {
			AddString("Vision", "Blinded: fail checks involving sight", "; ");
		} else {
			RemoveString("Vision", "Blinded: fail checks involving sight");
		}
	} else if (theField === "Extra.Condition 3") { //If Deafened
		if (FieldChecked === 1) {
			AddString("Vision", "Deafened: fail checks involving hearing", "; ");
		} else {
			RemoveString("Vision", "Deafened: fail checks involving hearing");
		}
	}
	thermoM(1/10); //increment the progress dialog's progress
	
	//keep incapacitated checked if one of the conditions requires it
	if (Paralyzed.isBoxChecked(0) === 1 || Petrified.isBoxChecked(0) === 1  || Stunned.isBoxChecked(0) === 1 || Unconscious.isBoxChecked(0) === 1) {
		Checkbox("Extra.Condition 6", true); //Incapacitated
	}
	thermoM(2/10); //increment the progress dialog's progress
	
	//Add string to saving throw advantages / disadvantages
	if (Paralyzed.isBoxChecked(0) === 1 || Stunned.isBoxChecked(0) === 1 || Unconscious.isBoxChecked(0) === 1) {
		AddString("Saving Throw advantages \/ disadvantages", "Fail Str/Dex saves", "; ");
	} else {
		RemoveString("Saving Throw advantages \/ disadvantages", "Fail Str/Dex saves");
	}
	thermoM(3/10); //increment the progress dialog's progress
	
	//put the speed in the remember field back in its place before doing anything with it
	if (What("Speed Remember") !== "") {
		var SpdRem = What("Speed Remember").split("!#TheListSeparator#!");
		Value("Speed", SpdRem[0]);
		Value("Speed encumbered", SpdRem[1]);
		Value("Speed Remember", "");
	}
	//get the current field values
	var Spd = What("Speed");
	var SpdEnc = What("Speed encumbered");
	thermoM(4/10); //increment the progress dialog's progress
	
	//look at all the speed-changing conditions, starting with the ones that make it 0
	if (What("Speed") !== "" && (Grappled.isBoxChecked(0) === 1 || Restrained.isBoxChecked(0) === 1 || Exh5.isBoxChecked(0) === 1)) {
		//remember the current value in the remember field
		Value("Speed Remember", Spd + "!#TheListSeparator#!" + SpdEnc);
		Value("Speed", What("Unit System") === "imperial" ? "0 ft" : "0 m");
		Value("Speed encumbered", What("Unit System") === "imperial" ? "0 ft" : "0 m");
	} else if (What("Speed") !== "" && Exh2.isBoxChecked(0) === 1) {
		//remember the current value in the remember field
		Value("Speed Remember", Spd + "!#TheListSeparator#!" + SpdEnc);
		ChangeSpeed(0, true);
	}
	thermoM(5/10); //increment the progress dialog's progress
	
	//see if checks have disadvantage or not
	if (Exh1.isBoxChecked(0) === 1 || Frightened.isBoxChecked(0) === 1 || Poisoned.isBoxChecked(0) === 1) {
		for (var S = 0; S < SkillsList.abbreviations.length; S++) {
			Hide(SkillsList.abbreviations[S] + " Adv");
			Checkbox(SkillsList.abbreviations[S] + " Dis", true);
			Uneditable(SkillsList.abbreviations[S] + " Dis");
		};
	} else {
		for (var S = 0; S < SkillsList.abbreviations.length; S++) {
			Show(SkillsList.abbreviations[S] + " Adv");
			Checkbox(SkillsList.abbreviations[S] + " Dis", false);
			Editable(SkillsList.abbreviations[S] + " Dis");
		};
		var StealthLoc = Who("Text.SkillsNames") === "alphabeta" ? "Ste" : "Ath";
		if (ArmDis.isBoxChecked(0) === 1) {
			Hide(StealthLoc + " Adv");
			Checkbox(StealthLoc + " Dis", true);
			Uneditable(StealthLoc + " Dis");
		};
	};
	thermoM(6/10); //increment the progress dialog's progress
	
	//see if attacks have advantage, disadvantage or nothing
	var AttDis = (Exh3.isBoxChecked(0) === 1 || (Blinded.isBoxChecked(0) === 1 && What("Class Features").toLowerCase().indexOf("feral senses") === -1) || Frightened.isBoxChecked(0) === 1 || Poisoned.isBoxChecked(0) === 1 || Prone.isBoxChecked(0) === 1 || Restrained.isBoxChecked(0) === 1);
	var AttAdv = Invisible.isBoxChecked(0) === 1;
	if (AttDis && !AttAdv) {
		Hide("Att Adv");
		Checkbox("Att Dis", true);
		Uneditable("Att Dis");
	} else if (!AttDis && AttAdv) {
		Hide("Att Dis");
		Checkbox("Att Adv", true);
		Uneditable("Att Adv");
	} else {
		Show("Att Adv");
		Show("Att Dis");
		Checkbox("Att Adv", false);
		Checkbox("Att Dis", false);
		Editable("Att Adv");
		Editable("Att Dis");
	};
	thermoM(7/10); //increment the progress dialog's progress
	
	//See if saves have disadvantage
	if (Exh3.isBoxChecked(0) === 1) {
		for (var B = 0; B < AbilityScores.abbreviations.length; B++) {
			Hide(AbilityScores.abbreviations[B] + " ST Adv");
			Checkbox(AbilityScores.abbreviations[B] + " ST Dis", true);
			Uneditable(AbilityScores.abbreviations[B] + " ST Dis");
		};
	} else {
		for (var B = 0; B < AbilityScores.abbreviations.length; B++) {
			Show(AbilityScores.abbreviations[B] + " ST Adv");
			Checkbox(AbilityScores.abbreviations[B] + " ST Dis", false);
			Editable(AbilityScores.abbreviations[B] + " ST Dis");
		};
		if (Restrained.isBoxChecked(0) === 1) {
			Hide("Dex ST Adv");
			Checkbox("Dex ST Dis", true);
			Editable("Dex ST Dis");
		}
	}
	thermoM(8/10); //increment the progress dialog's progress
	
	//halve the Current Max Hit points
	if (theField.indexOf("Extra.Exhaustion Level ") !== -1) {
		if (Exh4.isBoxChecked(0) === 1 && What("HP Max Current") === "") {
			Value("HP Max Current", Math.floor(Number(What("HP Max")) / 2));
		} else if (Exh4.isBoxChecked(0) === 0 && What("HP Max Current") === Math.floor(Number(What("HP Max")) / 2)) {
			Value("HP Max Current", "");
		}
	}
	thermoM(9/10); //increment the progress dialog's progress
	
	thermoM("stop"); //stop the top progress dialog
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
};

//search the string for possible class and subclass
function ParseClass(tempString) {
	var found = false, tempFound = false, tempFoundL = 0;
	tempString = removeDiacritics(tempString);
	for (var i = 1; i <= 2; i++) { //first time around just look if the class matches and then look for its subclasses. If that doesn't yield anything, look if any of the subclasses match
		for (var obj in ClassList) { //scan string for all classes, choosing subclasses over classes
			if (testSource(obj, ClassList[obj], "classExcl") || (obj === "ranger" && !testSource("rangerua", ClassList.rangerua, "classExcl"))) continue; //only testing if the source of the class isn't excluded
			var cSearch = ClassList[obj].regExpSearch;
			if ((i === 2 && !tempFound) || (tempFoundL < obj.length && (cSearch).test(tempString))) {
				found = i === 2 ? false : [obj, ""];
				tempFoundL = obj.length;
				for (var z = 0; z < ClassList[obj].subclasses[1].length; z++) {
					var theSub = ClassList[obj].subclasses[1][z];
					var theSubIL = ClassSubList[theSub];
					if (!theSubIL || testSource(theSub, theSubIL, "classExcl")) continue; // test if the subclass exists or if it or its source isn't excluded
					var oldSub = found && found[1] && ClassSubList[found[1]] ? ClassSubList[found[1]] : false;
					if ((theSubIL.regExpSearch).test(tempString) && (!oldSub || ((theSubIL.subname === oldSub.subname && theSub.length > found[1].length) || (theSubIL.subname !== oldSub.subname && theSubIL.subname.length > oldSub.subname.length)))) {
						found = [obj, theSub];
						tempFound = true;
						i = 8;
					};
				};
				if (!tempFound && i === 1) {
					tempFound = true;
					i = 3;
				};
			};
		};
	};
	return found;
};

//detects classes entered and parses information to global classes variable
function FindClasses(Event) {
	if (Event === undefined) {
		classes.field = What("Class and Levels");
	};
	var temp = clean(classes.field.replace(/^\d+/, "")) === "" ? "" : classes.field.replace(/^\d+/, "").toLowerCase();
	var tempArray = [];
	var tempPosition = 0;
	var tempChar = "";
	var tempType = 0;
	var tempString = "";
	var tempDie = "";
	var tempFound = false;
	var tempClass = "";
	var tempSubClass = "";
	var tempLevel = "";
	var primeClass = "";
	
	//put the old classes.known in classes.old so the differences in level can be queried
	var oldClassesString = classes.old.toSource();
	var oldClasses = eval(oldClassesString);
	var goDeleteUSS = true;
	classes.old = {};
	classes.oldprimary = classes.primary;
	classes.oldspellcastlvl = classes.spellcastlvl;
	for (var aClass in classes.known) {
		classes.old[aClass] = {
			classlevel : IsSubclassException[aClass] && oldClasses[aClass] && oldClasses[aClass].classlevel ? oldClasses[aClass].classlevel : IsSubclassException[aClass] ? 0 : classes.known[aClass].level,
			subclass : classes.known[aClass].subclass,
			fullname : CurrentClasses[aClass].fullname
		}
		delete CurrentArmour.proficiencies[CurrentClasses[aClass].name];
		delete CurrentWeapons.proficiencies[CurrentClasses[aClass].name];
		if (IsSubclassException[aClass]) goDeleteUSS = false;
	}
	if(goDeleteUSS) delete UpdateSpellSheets.class;

	//split raw string at string-number divides and push parts into temp array
	for (var i = 0; i < temp.length; i++) {
		tempChar = parseInt(temp.charAt(i), 10);
		if (isNaN(tempChar)) {
			if (tempType === 2) {
				tempArray.push(Number(temp.substring(tempPosition, i)));
				tempPosition = i;
			}
			if (i === temp.length - 1) {
				tempArray.push(String(temp.substring(tempPosition, i + 1)));
			}
			tempType = 1;
		} else {
			if (tempType === 1) {
				tempArray.push(String(temp.substring(tempPosition, i)));
				tempPosition = i;
			}
			if (i === temp.length - 1) {
				tempArray.push(Number(temp.substring(tempPosition, i + 1)));
			}
			tempType = 2;
		}
	}

	//move elements from tempArray into parsed array
	temp = [];
	var ClDelimiter = RegExp("^" + What("Delimiter").RegEscape(), "i");
	for (i = 0; i < tempArray.length; i++) {
		if (typeof tempArray[i] === "string") {
			tempString = clean(tempArray[i].replace(ClDelimiter, ""));
			if (tempString.length > 0) {
				temp[temp.length] = [];
				temp[temp.length - 1][0] = tempString;
				if (i === tempArray.length - 1) {
					temp[temp.length - 1][1] = 0; //set class level to 0 if none given
				}
			}
		} else if (typeof tempArray[i] === "number" && temp.length > 0) {
			temp[temp.length - 1][1] = Math.min(Math.max(tempArray[i], 1), 999);
		}
		if (temp[temp.length - 1][1] === 0) { //set class level to Character Level field if only 1 class, or 1 if multiclassing
			temp[temp.length - 1][1] = temp.length - 1 === 0 && What("Character Level") ? What("Character Level") : 1;
		}
	}
	
	//reset the global classes variables
	classes.hd = [];
	classes.hp = 0;

	classes.parsed = temp;
	classesTemp = {};
	
	//determine the character level
	var level = classes.parsed.reduce(function(acc, val) { return acc + val[1]; }, 0);

	//find known classes and push them into known array, add hd
	for (i = 0; i < classes.parsed.length; i++) {
		tempString = classes.parsed[i][0];
		tempLevel = classes.parsed[i][1];
		tempFound = ParseClass(tempString);
		
		if (tempFound) { //class detected and meets any Prestige Class prereqs it has
			tempClass = tempFound[0];
			tempSubClass = tempFound[1];
			tempDie = ClassList[tempClass].die;
			
			//see if the found class isn't a prestige class and if all prereqs are met. If not, skip this class
			var tempPrereq = !ignorePrereqs && ClassList[tempClass].prestigeClassPrereq ? ClassList[tempClass].prestigeClassPrereq : false;
			if (tempPrereq) {
				if (!isNaN(tempPrereq)) {
					if (tempPrereq > level - tempLevel) continue;
				} else {
					try {
						tempPrereq = eval(tempPrereq);
					} catch (err) {
						tempPrereq = true;
					}
					if (tempPrereq === false) continue;
				}
			}

			if (primeClass === "" && !ClassList[tempClass].prestigeClassPrereq) {
				primeClass = tempClass;
			};
			classesTemp[tempClass] = {
				name : tempClass,
				level : tempLevel,
				subclass : tempSubClass,
				string : classes.field.match(RegExp(clean(tempString, " ").RegEscape(), "i"))[0]
			};

			if (classes.hd[tempDie] === undefined) { //add hd
				classes.hd[tempDie] = [tempDie, tempLevel];
			} else {
				classes.hd[tempDie][1] += tempLevel;
			};

			if (classes.hp === 0) { //add first level hp
				classes.hp = tempDie;
			};
		};
	};
	
	//if the found classes are the exact same as the classes.known, don't do anything
	var isChange = primeClass !== classes.primary;
	if (!isChange) {
		var testArray = [];
		for (var testCl in classesTemp) testArray.push(testCl);
		for (var testCl in classes.known) testArray.push(testCl);
		for (var t = 0; t < testArray.length; t++) {
			var theKcl = classes.known[testArray[t]];
			var theNcl = classesTemp[testArray[t]];
			if (!isChange && theKcl && theNcl && theNcl.name === theKcl.name && theNcl.level === theKcl.level && theNcl.subclass === theKcl.subclass) {
				theKcl.string = theNcl.string; //because otherwise we skip this change, if it is the only thing that changes
				continue;
			}
			isChange = true;
			break;
		};
	};
	if (!isChange) {
		// only update the character level field, as it might still have changed from unrecognized classes
		if (What("Character Level") != level) {
			Value("Character Level", level);
			CalcExperienceLevel();
		};
		return true;
	};
	
	//check every class in classes old and if they are not in classesTemp, remove their features. Don't do anything on a reset
	if (IsNotReset) {
	for (var oClass in classes.old) {
		classes.known = {};
		
		//temporarily add the class to classes known for the next step
		classes.known[oClass] = {
			name : oClass,
			level : 0,
			subclass : classes.old[oClass].subclass
		}
		
		var tempCl = CurrentClasses[oClass];
		var oClassLvl = classes.old[oClass].classlevel;
		
		//remove saving throw proficiencies and rest equipment button tooltip, if it was primary class
		if (primeClass !== classes.primary && classes.primary === oClass) {
		
			//delete armor and weapon proficiencies gained from class features
			delete CurrentArmour.proficiencies[tempCl.fullname];
			delete CurrentWeapons.proficiencies[tempCl.fullname];
			
			Checkbox(tempCl.saves[0] + " ST Prof", false, "");
			Checkbox(tempCl.saves[1] + " ST Prof", false, "");
			
			AddTooltip("Equipment.menu", "Click here to add equipment to the adventuring gear section, or to reset it (this button does not print).\n\nIt is recommended to pick a pack first before you add any background's items.");
		}
		
		if (!classesTemp[oClass]) { //when removing a class, do the following
		
			//delete armor and weapon proficiencies gained from class features
			delete CurrentArmour.proficiencies[tempCl.fullname];
			delete CurrentWeapons.proficiencies[tempCl.fullname];
			
			//remove tools gained from the class
			for (var tls = 0; tls < tempCl.tools.length; tls++) {
				var classTools = tempCl.tools[tls];
				if (isArray(classTools)) {
					classTools.forEach( function(acTool) { AddTool(acTool, tempCl.name); });
				} else {
					RemoveTool(classTools, tempCl.name);
				}
			}
			
			//delete class header string
			var ClassHeaderString = tempCl.fullname + ", level " + oClassLvl + ":";
			if (What("Class Features").indexOf("\r\r"+ ClassHeaderString) !== -1) {
				ClassHeaderString = "\r\r"+ ClassHeaderString;
			}
			RemoveString("Class Features", ClassHeaderString, false);
			
			//delete stuff from features using the function with the class switch
			UpdateLevelFeatures("class");
			
			//remove the class from the SubClass Remember field
			RemoveString("SubClass Remember", oClass, false);
			
			//remove the class from the CurrentSpells variable
			delete CurrentSpells[oClass];
			
		} else if (classes.old[oClass].subclass && classesTemp[oClass].subclass !== classes.old[oClass].subclass) {//when only changing the subclass, do the following
			
			//delete class header string
			var ClassHeaderString = tempCl.fullname + ", level " + oClassLvl + ":";
			if (What("Class Features").indexOf("\r\r"+ ClassHeaderString) !== -1) {
				ClassHeaderString = "\r\r"+ ClassHeaderString;
			}
			RemoveString("Class Features", ClassHeaderString, false);
			
			//delete armor and weapon proficiencies gained from class features
			delete CurrentArmour.proficiencies[tempCl.fullname];
			delete CurrentWeapons.proficiencies[tempCl.fullname];
			
			//delete stuff from features using the function with the class switch
			UpdateLevelFeatures("class");
			
			//set the class' old level to 0 so all features are added again
			classes.old[oClass].classlevel = 0;
			
			//if removing the subclass, also remove the class from the SubClass Remember field
			if (!classesTemp[oClass].subclass) {
				RemoveString("SubClass Remember", oClass, false);
			}
			
			//remove certain aspects from the CurrentSpells variable if they belonged to the (sub)class, if the subclass was a spellcaster
			if (CurrentSpells[oClass] && tempCl.spellcastingFactor) {
				var ocSpells = CurrentSpells[oClass];
				ocSpells.extra = tempCl.spellcastingExtra ? "" : ocSpells.extra ? ocSpells.extra : "";
				if (tempCl.spellcastingBonus) {
					delete ocSpells.bonus[tempCl.name];
				}
			}
		}
	}
	}
	
	classes.known = classesTemp;
	classes.primary = primeClass;
	
	var multiCaster = {default : 0, warlock : 0};
	
	temp = [1];
	//lookup classes and subclasses and put their attributes in CurrentClasses global variable
	for (var aClass in classes.known) {
	
		//define new global variable based on the known classes
		CurrentClasses[aClass] = {
			name : "",
			source : [],
			primaryAbility : "",
			abilitySave : 0,
			abilitySaveAlt : 0,
			prereqs : "",
			improvements : [],
			saves : [],
			skills : [],
			tools : [],
			armor : [],
			weapons : [],
			equipment : "",
			attacks : [],
			features : {},
			subname : "",
			fullname : "",
			spellcastingFactor : 0,
			spellcastingTable : "",
			spellcastingList : "",
			spellcastingKnown : "",
			spellcastingExtra : ""
		};

		var Temps = CurrentClasses[aClass];
		var classObj = ClassList[aClass];
		var subClObj = classes.known[aClass].subclass && ClassSubList[classes.known[aClass].subclass] ? ClassSubList[classes.known[aClass].subclass] : false;

		//fill in the properties of this newly defined global variable and prefer subclass attributes over class attributes
		for (var prop in Temps) {
			if (prop !== "features") {
				if (classes.known[aClass].subclass && subClObj[prop] !== undefined) {
					Temps[prop] = subClObj[prop];
				} else if (classObj[prop] !== undefined) {
					Temps[prop] = classObj[prop];
				}
			}
		}
		
		//special something for classes that have alternative ability scores that can be used for the DC
		if (Temps.abilitySave && Temps.abilitySaveAlt) {
			var as1 = Number(What(AbilityScores.abbreviations[Temps.abilitySave - 1] + " Mod"));
			var as2 = Number(What(AbilityScores.abbreviations[Temps.abilitySaveAlt - 1] + " Mod"));
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
			if (subClObj && propAtt.list === "ClassList" && ((/subclassfeature/i).test(propAtt.name) || subClObj.features[propAtt.name])) continue; // skip any features from the class if a subclass is known and has that same feature
			Temps.features[propAtt.name] = tDoc[propAtt.list][propAtt.item].features[propAtt.name];
		}

		//make fullname if not defined by subclass
		if (Temps.fullname === "") {
			tempString = Temps.subname ? " (" + Temps.subname + ")" : "";
			Temps.fullname = Temps.name + tempString;
		}

		//add class weapon and armor proficiencies to global variables (only if classes are not set to manual)
		if (What("Manual Class Remember") !== "Yes") {
			n = aClass === classes.primary ? 0 : 1;
			if (Temps.armor[n] !== undefined) {
				CurrentArmour.proficiencies[Temps.name] = Temps.armor[n];
			}
			if (Temps.weapons[n] !== undefined) {
				CurrentWeapons.proficiencies[Temps.name] = Temps.weapons[n];
			}
		}
		
		//see if this class is a spellcaster and what we need to do with that
		if (Temps.spellcastingFactor) {
			var casterType = !isNaN(Temps.spellcastingFactor) ? "default" : Temps.spellcastingFactor.replace(/\d/g, "");
			var casterFactor = (/\d/g).test(Temps.spellcastingFactor) ? Number(Temps.spellcastingFactor.match(/\d/g).join("")) : 1;
			//now only continue if the class level is the factor or higher
			if (Math.max(casterFactor, 1) <= classes.known[aClass].level) {
				//add one to the casterType for seeing if this casterType is multiclassing later on
				if (multiCaster[casterType]) {
					multiCaster[casterType] += 1;
				} else {
					multiCaster[casterType] = 1;
				}
			//now update the entry in the CurrentSpells variable
				//first see if the entry exists or not, and create it if it doesn't
				if (!CurrentSpells[aClass]) {
					CurrentSpells[aClass] = {};
					CurrentSpells[aClass].bonus = {};
				}
				var cSpells = CurrentSpells[aClass];
				cSpells.name = Temps.fullname;
				cSpells.level = classes.known[aClass].level;
				cSpells.ability = Temps.abilitySave;
				cSpells.list = Temps.spellcastingList ? Temps.spellcastingList : {class : aClass};
				cSpells.known = Temps.spellcastingKnown;
				cSpells.typeSp = !cSpells.known || cSpells.known.spells === undefined ? false : isArray(cSpells.known.spells) ? cSpells.known.spells[Math.min(cSpells.known.spells.length, cSpells.level) - 1] : cSpells.known.spells;
				cSpells.typeSp = cSpells.typeSp === "" ? "" : isNaN(cSpells.typeSp) ? cSpells.typeSp : "known";
				cSpells.factor = [casterFactor, casterType];
				cSpells.spellsTable = Temps.spellcastingTable ? Temps.spellcastingTable : false;
				
				//spells from subclass that are auto-prepared (cleric/druid/paladin) or added to class list to choose from (warlock)
				cSpells.extra = Temps.spellcastingExtra ? Temps.spellcastingExtra : cSpells.extra ? cSpells.extra : "";
				
				//spells from a (sub)class feature that allow the addition of non-standard spells to the spell list (either known list or otherwise), with certain conditions (i.e. a cantrip from the wizard spell list)
				if (Temps.spellcastingBonus && !cSpells.bonus[Temps.name]) {
					cSpells.bonus[Temps.name] = Temps.spellcastingBonus;
				}
			}
		}

		//add number of attacks to temp array
		temp.push(CurrentClasses[aClass].attacks[Math.min(classes.known[aClass].level, CurrentClasses[aClass].attacks.length) - 1]);		
	}
	//pick highest number of attacks in temp array and put that into global classes variable
	classes.attacks = Math.max.apply(Math, temp);

	//reset the global variable for spellcasting levels
	classes.spellcastlvl = {default : 0, warlock : 0};
	//loop through the classes to find the new spellcasting level totals
	for (var aClass in classes.known) {
		var Temps = CurrentClasses[aClass];
		//add the spellcasting level to the classes.spellcastlvl global variable
		if (Temps.spellcastingFactor) {
			var casterType = !isNaN(Temps.spellcastingFactor) ? "default" : Temps.spellcastingFactor.replace(/\d/g, "");
			var casterFactor = (/\d/g).test(Temps.spellcastingFactor) ? Number(Temps.spellcastingFactor.match(/\d/g).join("")) : 1;
			//now add this class' levels to the global variable when using the known tables and are of sufficient level
			if (casterFactor && classes.known[aClass].level >= casterFactor) {
				if (multiCaster[casterType] > 1 || !Temps.spellcastingTable) {
					var casterLvl = multiCaster[casterType] > 1 ? Math.floor(classes.known[aClass].level / casterFactor) : Math.ceil(classes.known[aClass].level / casterFactor);
					if (classes.spellcastlvl[casterType]) {
						classes.spellcastlvl[casterType] += casterLvl;
					} else {
						classes.spellcastlvl[casterType] = casterLvl;
					}
				} else if (Temps.spellcastingTable && multiCaster[casterType] === 1) {
					var casterLvl = Math.min(Temps.spellcastingTable.length - 1, classes.known[aClass].level);
					if (!classes.spellcastlvl.otherTables) {
						classes.spellcastlvl.otherTables = Temps.spellcastingTable[casterLvl]
					} else {
						classes.spellcastlvl.otherTables = classes.spellcastlvl.otherTables.map(function (num, idx) {
						  return num + Temps.spellcastingTable[casterLvl][idx];
						});
					}
				}
			}
		}
	}
	
	//add the current classes.known into classes.old on startup of the sheet
	if (!Event) {
		for (var aClass in classes.known) {
			classes.old[aClass] = {
				classlevel : classes.known[aClass].level,
				subclass : classes.known[aClass].subclass,
				fullname : CurrentClasses[aClass].fullname
			}
		}
		classes.oldspellcastlvl = classes.spellcastlvl;
	}
};

//apply the effect of the classes
function ApplyClasses(inputclasstxt, updateall) {
	updateall = updateall !== undefined ? updateall : true;
	classes.field = inputclasstxt;

	thermoM("start"); //start a progress dialog
	thermoM("Recognizing the entered class(es)..."); //change the progress dialog text

	//detects classes entered and parses information to global classes variable, if nothing has changed, it returns true and we can stop this function
	if (FindClasses(classes.field)) {
		thermoM("stop"); //stop the top progress dialog
		return;
	}

	tDoc.delay = true;
	tDoc.calculate = false;

	//only update the tooltips if class is set to manual
	if (What("Manual Class Remember") === "Yes") {
		UpdateTooltips();
		tDoc.calculate = IsNotReset;
		tDoc.delay = !IsNotReset;
		thermoM("stop"); //stop the top progress dialog
		return; //don't do the rest of this function
	}
	
	thermoM(1/6); //increment the progress dialog's progress
	thermoM("Applying the hit dice..."); //change the progress dialog text
	//put hit dice on sheet
	
	var n = 1;
	if (classes.hd.length > 0) {
		classes.hd.sort(function (a, b) {
			return a - b;
		});
	}
	for (var i = 0; i < classes.hd.length; i++) {
		if (classes.hd[i] !== undefined && n < 4) {
			Value("HD" + n + " Level", Math.min(classes.hd[i][1], 999));
			Value("HD" + n + " Die", classes.hd[i][0]);
			n++;
		}
	}
	while (n < 4) {
		Value("HD" + n + " Level", "");
		Value("HD" + n + " Die", "");
		n++;
	};
	
	thermoM(2/6); //increment the progress dialog's progress
	thermoM("Adding saves and proficiencies..."); //change the progress dialog text
	
	//add saves and tools of the primary class
	if (classes.primary) {
		var save1 = CurrentClasses[classes.primary].saves[0];
		var save2 = CurrentClasses[classes.primary].saves[1];
		var save1txt = "Proficiency with " + AbilityScores.names[AbilityScores.abbreviations.indexOf(save1)] + " saving throws was gained from " + CurrentClasses[classes.primary].name;
		var save2txt = "Proficiency with " + AbilityScores.names[AbilityScores.abbreviations.indexOf(save2)] + " saving throws was gained from " + CurrentClasses[classes.primary].name;
		Checkbox(save1 + " ST Prof", true, save1txt);
		Checkbox(save2 + " ST Prof", true, save2txt);
		
		AddTooltip("Equipment.menu", "Click here to add equipment to the adventuring gear section, or to reset it (this button does not print).\n\nIt is recommended to pick a pack first before you add any background's items.\n\n" + CurrentClasses[classes.primary].equipment);
	}
	
	thermoM(3/6); //increment the progress dialog's progress
	thermoM("Setting the spell slots..."); //change the progress dialog text
	
	//set the spell slots of the class' levels
	for (var ss = 0; ss <= 8; ss++) {
		var SpellSlotsName = "SpellSlots.CheckboxesSet.lvl" + (ss + 1);
		var SpellSlotsField = Number(What(SpellSlotsName));
		var SpellSlotsTotal = SpellSlotsField;
		if (classes.spellcastlvl.otherTables) SpellSlotsTotal += classes.spellcastlvl.otherTables[ss]; //add the old slots
		if (classes.oldspellcastlvl.otherTables) SpellSlotsTotal -= classes.oldspellcastlvl.otherTables[ss]; //remove the old slots
		for (var casterType in classes.spellcastlvl) {
			if (casterType !== "otherTables" && tDoc[casterType + "SpellTable"]) {
				var spTable = tDoc[casterType + "SpellTable"];
				SpellSlotsTotal += spTable[Math.min(spTable.length - 1, classes.spellcastlvl[casterType])][ss]; //add the new slots
				if (classes.oldspellcastlvl[casterType]) {
					SpellSlotsTotal -= spTable[Math.min(spTable.length - 1, classes.oldspellcastlvl[casterType])][ss]; //remove the old slots
				}
			}
		}
		if (SpellSlotsField != SpellSlotsTotal) {
			Value(SpellSlotsName, SpellSlotsTotal);
		}
	}
	if (What("SpellSlotsRemember") === "[false,false]") SpellPointsLimFea("Add");
	
	thermoM(4/6); //increment the progress dialog's progress
	thermoM("Setting the total character level..."); //change the progress dialog text
	
	//add tool proficiencies
	for (var aClass in classes.known) {
		n = aClass === classes.primary ? 0 : 1;
		if (CurrentClasses[aClass].tools[n] !== undefined) {
			var classTools = CurrentClasses[aClass].tools[n];
			if (isArray(classTools)) {
				classTools.forEach( function(acTool) { AddTool(acTool, CurrentClasses[aClass].name); });
			} else {
				AddTool(classTools, CurrentClasses[aClass].name);
			}
		}
	}

	//put the ability save DC right
	SetTheAbilitySaveDCs();
	
	//add all levels and set character level
	if (updateall) {
		var level = classes.parsed.reduce(function(acc, val) { return acc + val[1]; }, 0);
		Value("Character Level", level);
		CalcExperienceLevel();
	};
	
	thermoM(5/6); //increment the progress dialog's progress
	
	var noSubClExc = IsSubclassException.toSource() === "({})";
	
	UpdateLevelFeatures("class");
	
	// if a subclass was just selected, run applyclasses again
	if (IsSubclassException.toSource() !== "({})" && event.target.name && event.target.name === "Class and Levels" && event.value !== classes.field) ApplyClasses(classes.field);
	
	if (noSubClExc) {
		thermoM("Finalizing the changes of the class(es)..."); //change the progress dialog text
		AddAttacksPerAction(); //update number of attacks
		ApplyProficiencies(true); //call to update armor, shield and weapon proficiencies
		UpdateTooltips(); //skills tooltip, ability score tooltip
		
		//show the option button if the class has features that offers a choice
		MakeClassMenu();
		if (Menus.classfeatures[0].cName !== "No class features detected that require a choice") {
			DontPrint("Class Features Menu");
		} else {
			Hide("Class Features Menu");
		}
		
		SetStringifieds(); //set the global variables to their fields for future reference
		CheckForSpellUpdate(); //see if there is a reason to update the spells sheets
	}
	thermoM("stop"); //stop the top progress dialog

	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
};

//Check if the level or XP entered matches the XP or level
function CalcExperienceLevel(AlsoClass) {
	var oldLevel = Number(tDoc.getField("Character Level").submitName);
	var Level = What("Character Level");
	var exp = Number(What("Total Experience").replace(",", "."));
	
	//stop this function if resetting or importing the sheet
	if (!IsNotImport || !IsNotReset || (!Level && !exp)) return;

	tDoc.delay = true;
	tDoc.calculate = false;
	var LVLbyXP = ExperiencePointsList.reduce(function(acc, val) { return acc += exp >= Number(val) ? 1 : 0; }, 0);
	var XPforLVL = !Level ? 0 : ExperiencePointsList[Math.min(ExperiencePointsList.length - 1, Level) - 1];
	var LVLtxt = Level >= ExperiencePointsList.length ? "a level higher than 20" : "level " + Level;
	var XPtxt = !exp ? "no" : "only " + exp;

	var StringHigherLvl = "This character has " + XPtxt + " experience points. This is not enough to attain the level that has been entered (" + Level + "). You need at least " + XPforLVL + " experience points for " + LVLtxt + ". You can upgrade the experience points, downgrade the level, or leave it as it is.\n\nBy pressing 'Upgrade XP' you change the experience points total to " + XPforLVL + ".\n\nBy pressing 'Downgrade level' you change the character level to level " + LVLbyXP + ".\n\nBy pressing 'Cancel' neither happens.";

	var StringHigherXP = "This character is level " + Level + ", but already has " + exp + " experience points. This amount is enough to attain level " + LVLbyXP + ". You can upgrade the level, downgrade the experience points, or leave it as it is.\n\nBy pressing 'Upgrade level' you change the character level to level " + LVLbyXP + ".\n\nBy pressing 'Downgrade XP' you change the experience points total to " + XPforLVL + ".\n\nBy pressing 'Cancel' neither happens.";

	if (Level > LVLbyXP) {
		var theText = StringHigherLvl;
		var okReturn = "xp";
		var otherReturn = "lvl";
		var okButton = "Upgrade XP";
		var otherButton = "Downgrade level";
	} else if (Level < LVLbyXP) {
		var theText = StringHigherXP;
		var okReturn = "lvl";
		var otherReturn = "xp";
		var okButton = "Upgrade level";
		var otherButton = "Downgrade XP";
	};

	var Experience_Dialog = {
		result : false,

		//when starting the dialog
		initialize : function (dialog) {
			dialog.load({
				"text" : theText
			});
		},

		//when pressing the ok button
		commit : function (dialog) {
			this.result = okReturn;
		},

		//when pressing the cancel button
		other : function (dialog) {
			this.result = otherReturn;
			dialog.end("other");
		},

		description : {
			name : "Level and Experience Points do not match!",
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
					height : 165,
					char_width : 45
				}, {
					type : "ok_cancel_other",
					ok_name : okButton,
					other_name : otherButton
				}]
			}]
		}
	};

	if ((Level < ExperiencePointsList.length || LVLbyXP < (ExperiencePointsList.length - 1)) && Level !== LVLbyXP) {
		app.execDialog(Experience_Dialog);
		switch (Experience_Dialog.result) {
			case "lvl":
				Value("Character Level", LVLbyXP);
				break;
			case "xp":
				Value("Total Experience", XPforLVL);
				break;
		}
	};
	if (oldLevel !== Number(What("Character Level"))) {
		tDoc.getField("Character Level").submitName = What("Character Level");
		//update features gained from level
		UpdateLevelFeatures("race");
		
		//call the multiclassing function that will ask for what class to add a level to
		if (AlsoClass) AskMulticlassing();
		
		//update level-dependent things for any ranger companions
		UpdateRangerCompanions();
		
		//show a dialogue about ASI
		CountASIs();
	};
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
};

function ParseRace(Inputs) {
	var resultArray = ["", ""];
	
	if (Inputs) {
		Inputs = removeDiacritics(Inputs);
		var tempFound = 0;

		for (var key in RaceList) { //scan string for all races
			var rSearch = RaceList[key].regExpSearch; //use the defined regular expression of the race
			if (tempFound < RaceList[key].name.length && (rSearch).test(Inputs)) {
				if (testSource(key, RaceList[key], "racesExcl")) continue; // test if the race or its source isn't excluded
				resultArray = [key, ""];
				tempFound = RaceList[key].name.length;
				var tempFound2 = 0;
				if (RaceList[key].variants) {
					var RaceOpt = RaceList[key].variants;
					for (var sub = 0; sub < RaceOpt.length; sub++) { //scan string for all variants of the race
						var theR = key + "-" + RaceOpt[sub];
						var rVars = RaceSubList[theR];
						if (testSource(theR, rVars, "racesExcl")) continue; // test if the racial variant or its source isn't excluded
						var rvSearch = rVars.regExpSearch; //use the defined regular expression of the racial variant
						if (tempFound2 < theR.length && (rvSearch).test(Inputs)) {
							resultArray[1] = RaceOpt[sub];
							tempFound2 = theR.length;
						}
					}
				}
			}
		}
	}
	return resultArray;
};

//detects race entered and put information to global CurrentRace variable
function FindRace(inputracetxt) {
	var tempString = inputracetxt === undefined ? What("Race Remember") : inputracetxt;
	var tempFound = ParseRace(tempString);
	
	CurrentRace = {
		known : tempFound[0],
		variant : tempFound[1],
		level : "",
		name : "", //must exist
		source : "", //must exist
		plural : "", //must exist
		size : 3, //must exist
		speed : [30, 20], //must exist
		languages : [], //must exist
		vision : "",
		savetxt : "",
		dmgres : "",
		weaponprofs : "",
		weapons : "",
		armor : "",
		tools : "",
		skills : "",
		skillstxt : "",
		age : "", //must exist
		height : "", //must exist
		weight : "", //must exist
		heightMetric : "",
		weightMetric : "",
		improvements : "", //must exist
		scores : [0,0,0,0,0,0], //must exist
		trait : "", //must exist
		eval : "",
		removeeval : "",
		features : "",
		variants : "",
		abilitySave : 0,
		spellcastingAbility : 0,
		spellcastingBonus : ""
	};
	
	for (var prop in CurrentRace) {
		if (prop !== "known" && prop !== "variant") {
			if (CurrentRace.variant && RaceSubList[CurrentRace.known + "-" + CurrentRace.variant][prop] !== undefined) {//select the sub-racial prop
				CurrentRace[prop] = RaceSubList[CurrentRace.known + "-" + CurrentRace.variant][prop];
			} else if (CurrentRace.known && RaceList[CurrentRace.known][prop] !== undefined) {//select the racial prop
				CurrentRace[prop] = RaceList[CurrentRace.known][prop];
			}
		}
	}
	
	//show the option button if the race has selectable variants
	MakeRaceMenu();
	if (Menus.raceoptions[0].cName === "No race options that require a choice") {
		Hide("Race Features Menu");
	} else {
		DontPrint("Race Features Menu");
	}

	if (CurrentRace.known && What("Manual Race Remember") !== "Yes") {
		//add, if existing, the racial armor and weapon proficiencies to the global variable
		if (CurrentRace.armor) {
			CurrentArmour.proficiencies[CurrentRace.name] = CurrentRace.armor;
		};
		if (CurrentRace.weaponprofs) {
			CurrentWeapons.proficiencies[CurrentRace.name] = CurrentRace.weaponprofs;
		};
	}
	
	//if a spellcaster, update the entry in the SpellsClassList
	if (CurrentRace.spellcastingBonus) {
		//first see if the entry exists or not, and create it if it doesn't
		if (!CurrentSpells[CurrentRace.known]) {
			CurrentSpells[CurrentRace.known] = {};
			CurrentSpells[CurrentRace.known].bonus = {};
		}
		var rSpells = CurrentSpells[CurrentRace.known];
		rSpells.name = CurrentRace.name;
		rSpells.level = What("Character Level") !== "" ? What("Character Level") : 1;
		rSpells.ability = CurrentRace.spellcastingAbility;
		rSpells.typeSp = "race";
		
		//spells from a (sub)class feature that allow the addition of non-standard spells to the spell list (either known list or otherwise), with certain conditions (i.e. a cantrip from the wizard spell list)
		if (CurrentRace.spellcastingBonus && !rSpells.bonus[CurrentRace.known]) {
			rSpells.bonus[CurrentRace.known] = CurrentRace.spellcastingBonus;
		}
	}
};

//apply the effect of the player's race
function ApplyRace(inputracetxt) {
	if (event.target && event.target.name === "Race" && inputracetxt.toLowerCase() === event.target.value.toLowerCase()) return; //no changes were made
	
	tDoc.delay = true;
	tDoc.calculate = false;

	//only update the tooltips and CurrentRace.known if race is set to manual
	if (What("Manual Race Remember") === "Yes") {
		FindRace(inputracetxt);
		UpdateTooltips();
		tDoc.calculate = IsNotReset;
		tDoc.delay = false;
		return; //don't do the rest of this function
	}

	thermoM("start"); //start a progress dialog
	thermoM("Applying race..."); //change the progress 
	
	var newRace = ParseRace(inputracetxt);
	var oldRace = [CurrentRace.known, CurrentRace.variant];
	if (newRace[0] !== oldRace[0] || (newRace[0] === oldRace[0] && newRace[1] !== "" && newRace[1] !== oldRace[1])) {
		if (IsNotReset && CurrentRace.known) {//don't continue on a reset, otherwise remove the old race if one was detected
			thermoM("Removing the " + CurrentRace.name + " features..."); //change the progress dialog text
			RemoveRace();
		}
		thermoM("Recognizing the entered race..."); //change the progress dialog text
		FindRace(inputracetxt);
		Value("Race Remember", CurrentRace.known + "-" + CurrentRace.variant);
	}

	if (CurrentRace.known && (CurrentRace.known !== oldRace[0] || CurrentRace.variant !== oldRace[1])) {
		thermoM("Applying the " + CurrentRace.name + " features..."); //change the progress dialog text
		thermoM(1/6); //increment the progress dialog's progress
		
		//add necessary race information such as height, weight, age, size, traits, languages
		var theHeight = What("Unit System") === "imperial" ? CurrentRace.height : CurrentRace.heightMetric ? CurrentRace.heightMetric : CurrentRace.height;
		var theWeight = What("Unit System") === "imperial" ? CurrentRace.weight : CurrentRace.weightMetric ? CurrentRace.weightMetric : CurrentRace.weight;
		AddTooltip("Height", CurrentRace.plural + theHeight);
		AddTooltip("Weight", CurrentRace.plural + theWeight);
		AddTooltip("Age", CurrentRace.plural + CurrentRace.age);
		
		var tempString = CurrentRace.source && SourceList[CurrentRace.source[0]] ? CurrentRace.name + " is found in the " + SourceList[CurrentRace.source[0]].name + (CurrentRace.source[1] ? ", page " + CurrentRace.source[1] : "") : "";
		
		var theTraits = What("Unit System") === "imperial" ? CurrentRace.trait : ConvertToMetric(CurrentRace.trait, 0.5);
		Value("Racial Traits", theTraits, tempString);
		
		for (var L = 0; L < CurrentRace.languages.length; L++) {
			AddLanguage(CurrentRace.languages[L], "being a " + CurrentRace.name);
		}
		
		thermoM(2/6); //increment the progress dialog's progress

		//add the Race's speed
		tempString = CurrentRace.plural + " have a base speed of " + CurrentRace.speed[0] + (!isNaN(CurrentRace.speed[0]) ? " ft" : "");
		tempString = What("Unit System") === "imperial" ? tempString : ConvertToMetric(tempString, 0.5);
		tempString = tempString.replace("\n", ", ");
		var SpdToChange = [CurrentRace.speed[0], CurrentRace.speed[1]];
		//see if the speed to change is a string or not
		for (var Sp = 0; Sp <= 1; Sp++) {
			var Field = Sp === 0 ? "Speed" : "Speed encumbered";
			AddTooltip(Field, tempString); //set the tooltip
			if (isNaN(SpdToChange[Sp])) {
				var OldSpd = What(Field) ? parseFloat(What(Field)) : 0;
				var SpdCon = SpdToChange[Sp];
				if (What("Unit System") === "metric") {
					OldSpd = RoundTo(OldSpd / 0.3, 0.5);
					SpdCon = ConvertToMetric(SpdCon, 0.5);
				}
				SpdToChange[Sp] = OldSpd;
				Value(Field, SpdCon);
			}
		}
		ChangeSpeed(SpdToChange, false);
		
		thermoM(3/6); //increment the progress dialog's progress

		//set race's size
		PickDropdown("Size Category", CurrentRace.size);
		var theSize = CurrentRace.size === 3 ? "Medium" : "Small";
		AddTooltip("Size Category", CurrentRace.plural + " size is " + theSize + ".\nSelected size category will effect encumbrance on the second page.");

		//add, if existing, the racial features, proficiencies, vision, etc. etc.
		if (CurrentRace.vision) {
			var theVision = What("Unit System") === "imperial" ? CurrentRace.vision : ConvertToMetric(CurrentRace.vision, 0.5);	
			AddString("Vision", theVision, "; ");
		}
		if (CurrentRace.savetxt) {
			var theSavetxt = What("Unit System") === "imperial" ? CurrentRace.savetxt : ConvertToMetric(CurrentRace.savetxt, 0.5);
			AddString("Saving Throw advantages / disadvantages", theSavetxt, "; ");
		}
		if (CurrentRace.dmgres) {
			for (var i = 0; i < CurrentRace.dmgres.length; i++) {
				AddResistance(CurrentRace.dmgres[i], CurrentRace.name);
			}
		};
		if (CurrentRace.weapons) {
			for (i = 0; i < CurrentRace.weapons.length; i++) {
				AddWeapon(CurrentRace.weapons[i]);
			}
		};
		if (CurrentRace.tools) {
			for (i = 0; i < CurrentRace.tools.length; i++) {
				AddTool(CurrentRace.tools[i], CurrentRace.name);
			}
		};
		if (CurrentRace.skills) {
			for (i = 0; i < CurrentRace.skills.length; i++) {
				AddSkillProf(CurrentRace.skills[i]);
			}
		};
		
		thermoM(4/6); //increment the progress dialog's progress

		//run custom code included in race
		if (CurrentRace.eval) {
			var theEval = What("Unit System") === "metric" && CurrentRace.eval.indexOf("String") !== -1 ? ConvertToMetric(CurrentRace.eval, 0.5) : CurrentRace.eval;
			eval(theEval);
		}

		//get the ability score arrays from the fields, implement the racial bonuses, and put them back in the field
		for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
			var tempArray = What(AbilityScores.abbreviations[i] + " Remember").split(",");
			tempArray[1] = CurrentRace.scores[i];
			Value(AbilityScores.abbreviations[i] + " Remember", tempArray);
		}
		
		thermoM(5/6); //increment the progress dialog's progress

		SetTheAbilitySaveDCs();
		UpdateLevelFeatures("race");
	};

	thermoM("Finalizing the changes of the race..."); //change the progress dialog text
	ApplyProficiencies(true); //call to update armor, shield and weapon proficiencies
	UpdateTooltips(); //skills tooltip, ability score tooltip
	SetStringifieds(); //set the global variables to their fields for future reference
	
	thermoM("stop"); //stop the top progress dialog
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
};

//add the tooltips to the skills tooltips, and ability score tooltips
function UpdateTooltips() {
	var stringAbilities = "Ability scores\n(Improvements cannot take an ability score over 20)";
	stringAbilities += "\n\nAbility score improvements from race and feats:";
	var stringSkills = "Skill proficiencies gained from:";
	AbilityScores.improvements.racefeats = "";
	var stringAbiImpr = "";
	AbilityScores.improvements.classlvl = "";
	var stringAbiPrimair = "";
	AbilityScores.improvements.classprime = "";
	var stringAbiMulti = "";
	AbilityScores.improvements.classmulti = "";
	var temp = "";

	if (CurrentRace.known) {
		if (CurrentRace.skills || CurrentRace.skillstxt) {
			stringSkills += "\n\n" + toUni(CurrentRace.name) + ": "
			temp = CurrentRace.skillstxt ? 1 : CurrentRace.skills.length;
			for (var i = 0; i < temp; i++) {
				stringSkills += (i === 0 || temp === 2) ? "" : ", ";
				stringSkills += (i === 1 && temp === 2) ? " and " : "";
				stringSkills += (i === (temp - 1) && temp > 2) ? "and " : "";
				stringSkills += CurrentRace.skillstxt ? CurrentRace.skillstxt : CurrentRace.skills[i];
			};
			stringSkills += ".";
		};
		AbilityScores.improvements.racefeats += "\n \u2022 " + CurrentRace.improvements;
	};

	for (var i = 0; i < CurrentFeats.improvements.length; i++) {
		AbilityScores.improvements.racefeats += "\n \u2022 " + CurrentFeats.improvements[i];
	}

	stringAbilities += AbilityScores.improvements.racefeats;

	if (CurrentBackground.known) {
		if (CurrentBackground.skills || CurrentBackground.skillstxt) {
			stringSkills += "\n\n" + toUni(CurrentBackground.name) + ": "
			temp = CurrentBackground.skillstxt ? 1 : CurrentBackground.skills.length;
			for (var i = 0; i < temp; i++) {
				stringSkills += (i === 0 || temp === 2) ? "" : ", ";
				stringSkills += (i === 1 && temp === 2) ? " and " : "";
				stringSkills += (i === (temp - 1) && temp > 2) ? "and " : "";
				stringSkills += CurrentBackground.skillstxt ? CurrentBackground.skillstxt : CurrentBackground.skills[i];
			};
			stringSkills += ".";
		};
	};
	var multiClass = ObjLength(classes.known) > 1;
	for (var aClass in classes.known) {
		n = aClass === classes.primary ? 0 : 1;
		if (CurrentClasses[aClass].skills[n] !== undefined) {
			stringSkills += CurrentClasses[aClass].skills[n];
		};
		stringAbiPrimair += n === 0 ? "\n\nClasses primary ability scores:" : "";
		AbilityScores.improvements.classprime += CurrentClasses[aClass].primaryAbility;
		stringAbiMulti += (n === 0 && multiClass) ? "\n\nMulticlassing required ability scores:" : "";
		AbilityScores.improvements.classmulti += multiClass ? CurrentClasses[aClass].prereqs : "";
		temp = CurrentClasses[aClass].improvements[Math.min(CurrentClasses[aClass].improvements.length, classes.known[aClass].level) - 1];
		if (temp > 0) {
			stringAbiImpr += AbilityScores.improvements.classlvl === "" ? "\n\nAbility score improvements from classes:\n(either add 2 points to ability scores or take 1 feat)" : "";
			AbilityScores.improvements.classlvl += "\n \u2022 " + CurrentClasses[aClass].name + ": \u00D7" + temp + ";";
		}
	}
	stringAbilities += stringAbiImpr + AbilityScores.improvements.classlvl;
	stringAbilities += stringAbiPrimair + AbilityScores.improvements.classprime;
	stringAbilities += stringAbiMulti + AbilityScores.improvements.classmulti;
	
	for (var i = 0; i < classes.extraskills.length; i++) {
		stringSkills += classes.extraskills[i];
	}

	for (var i = 0; i < CurrentFeats.skills.length; i++) {
		stringSkills += CurrentFeats.skills[i];
	}

	for (i = 0; i < (SkillsList.abbreviations.length); i++) {
		if (SkillsList.abbreviations[i] !== "Init") {
			AddTooltip(SkillsList.abbreviations[i] + " Prof", stringSkills);
			AddTooltip(SkillsList.abbreviations[i] + " Exp", stringSkills);
		}
	};
	AddTooltip("SkillsClick", "Click here to change the order of the skills. You can select either alphabetic order or ordered by ability score.\n\n" + stringSkills);

	for (i = 0; i < AbilityScores.abbreviations.length; i++) {
		AddTooltip(AbilityScores.abbreviations[i], stringAbilities);
	};

	SetHPTooltip(); //HP Max tooltip
};

//see if a known weapon is in a string, and return the weapon
function ParseWeapon(input, onlyInv) {
	if (!input) return "";
	var outputL = 0;
	var output = "";
	var inputS = removeDiacritics(input.replace(/off.{0,3}hand/i, ""));
	
	//scan string for all weapons, including the alternative spellings using regular expression
	for (var key in WeaponsList) {
		if (WeaponsList[key].regExpSearch) {
			if ((onlyInv && WeaponsList[key].weight == undefined) || testSource(key, WeaponsList[key], "weapExcl")) continue; // test if the weapon or its source isn't excluded
			var wSearch = WeaponsList[key].regExpSearch; //use the defined regular expression of the weapon
			if ((wSearch).test(inputS) && outputL < WeaponsList[key].name.length) {
				outputL = WeaponsList[key].name.length;
				output = key;
			}
		}
	};
	
	return output;
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
		
		//add magical bonus, denoted by a "+" or "-"
		var magicBonus = parseFloat(tempString.match(/(^|\s|\(|\[)[\+|-]\d+/));
		tempArray[j][1] = !isNaN(magicBonus) ? magicBonus : 0;
	
		//add the true/false switch for adding ability score to damage or not
		tempArray[j][2] = tempArray[j][0] ? WeaponsList[tempArray[j][0]].abilitytodamage : true;
	
		//if this is a spell or a cantrip, see if we can link it to an object in the CurrentCasters variable
		var isSpell = !tempArray[j][0] ? ParseSpell(tempString) : WeaponsList[tempArray[j][0]].SpellsList ? WeaponsList[tempArray[j][0]].SpellsList : SpellsList[tempArray[j][0]] ? tempArray[j][0] : ParseSpell(tempArray[j][0]);
		if ((!tempArray[j][0] || (/spell|cantrip/i).test(WeaponsList[tempArray[j][0]].type)) && isSpell) {
			tempArray[j][3] = isSpell;
			if (!tempArray[j][0]) tempArray[j][2] = false;
			tempArray[j][4] = isSpellUsed(isSpell);
		};
		
		//put tempArray in known
		CurrentWeapons.known[j] = tempArray[j];
	}
};

//update the weapons to apply the change in proficiencies
var forceReCalcWeapons = false;
function ReCalcWeapons(justProfs) {
	IsNotReset = false;
	justProfs = justProfs && !forceReCalcWeapons && (!CurrentEvals.atkAdd || !(/level/i).test(CurrentEvals.atkAdd)) ? true : false;
	for (var xy = 0; xy < CurrentWeapons.known.length; xy++) {
		if (CurrentWeapons.field[xy]) {
			ApplyWeapon(CurrentWeapons.field[xy], "Attack." + (xy + 1) + ".Weapon Selection", true, justProfs);
		}
	}
	IsNotReset = true;
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	forceReCalcWeapon = false;
};

function SetWeaponsdropdown() {
	tDoc.delay = true;
	tDoc.calculate = false;
	var string = "Type in the name of the attack (or select it from the drop-down menu) and all its attributes will be filled out automatically, provided that its a recognized attack.";
	string += "\n\n" + toUni("Magic bonus") + "\nAny magical bonus you type in this field is added to both the to hit and damage (e.g. type \"Longsword +2\").";
	string += "\n\n" + toUni("Off-hand weapons") + "\nIf the name or description fields include the word \"off-hand\", \"secondary\", \"spell\", or \"cantrip\", the ability modifier will only be added to the to hit bonus, and not to the damage.";
	string += "\n\n" + toUni("Damage Die") + "\nThis is determined by the value in the \"modifier\" field, see below.";
	string += "\n\n" + toUni("To Hit and Damage calculations") + "\nThese are calculated using the proficiency bonus, the selected ability modifier and any bonus added in the \"modifier\" fields, see below.";
	string += "\n\n" + toUni("Context-aware calculations") + "\nSome class features, racial features, and feats can affect the attack to hit and damage calculations. You can read what these are by clicking the button in this line.";
	string += "\n\n" + toUni("Modifier or blue text fields") + "\nThese are hidden by default. You can toggle their visibility with the \"Mods\" button in the \'JavaScript Window\' or the \"Modifiers\" bookmark.";
	
	var weaponlists = {
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
		spell : [],
		"spell specific" : []
	};
	var knownweaponlists = ["endlist", "melee", "ranged", "improvised", "spell", "spell specific"];
	
	for (var key in WeaponsList) {
		var weaKey = WeaponsList[key];
		if (!weaKey.list || testSource(key, weaKey, "weapExcl")) continue; // test if the weapon or its source is set to be included
		if (!weaponlists[weaKey.list]) weaponlists[weaKey.list] = [];
		var weaName = WeaponsList[key].name.capitalize();
		if (weaponlists[weaKey.list].indexOf(weaName) === -1) weaponlists[weaKey.list].push(weaName);
	};
	
	//make the definitive list of weapons for the dropdown box
	var setweapons = [];
	var addWeaList = function (weArr, addFirst, noSort) {
		if (!noSort) weArr.sort();
		if (addFirst) weArr.unshift(addFirst);
		weArr.unshift("");
		setweapons = setweapons.concat(weArr);
	};
	addWeaList(weaponlists.melee.concat(weaponlists.ranged), "Unarmed Strike"); //add the natural weapons
	addWeaList(weaponlists.improvised, "Improvised Weapon"); //add the improvised weapons
	addWeaList(weaponlists.spell, "Spell Attack"); //add the spells
	addWeaList(weaponlists["spell specific"]); //add the specific spells
	addWeaList(weaponlists.endlist, false, true); //add the endlist weapons
	//now add any lists that are not known
	for (var listW in weaponlists) {
		if (knownweaponlists.indexOf(listW) === -1) {
			addWeaList(weaponlists[listW]);
		};
	};
	
	for (var i = 1; i <= FieldNumbers.attacks; i++) {
		var theFld = "Attack." + i + ".Weapon Selection";
		var theFldSuNm = "Attack." + i + ".Proficiency";
		if (tDoc.getField(theFldSuNm).submitName === setweapons.toSource()) continue; //no changes, so no reason to set this field
		tDoc.getField(theFldSuNm).submitName = setweapons.toSource();
		var theFldVal = What(theFld);
		IsNotWeaponMenu = false;
		tDoc.getField(theFld).setItems(setweapons);
		IsNotWeaponMenu = true;
		if (theFldVal !== What(theFld)) Value(theFld, theFldVal, string);
	};
	for (var c = 1; c <= 3; c++) {
		theFld = "Comp.Use.Attack." + c + ".Weapon Selection";
		theFldSuNm = "Comp.Use.Attack." + c + ".Proficiency";
		if (tDoc.getField(theFldSuNm).submitName === setweapons.toSource()) continue; //no changes, so no reason to set this field
		tDoc.getField(theFldSuNm).submitName = setweapons.toSource();
		theFldVal = What(theFld);
		IsNotWeaponMenu = false;
		tDoc.getField(theFld).setItems(setweapons);
		IsNotWeaponMenu = true;
		if (theFldVal !== What(theFld)) Value(theFld, theFldVal, string);
	};
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
};

function SetArmordropdown() {
	tDoc.delay = true;
	tDoc.calculate = false;
	var string = toUni("Armor AC") + "\nType the name of the armor (or select it from the drop-down menu) and its AC and features will be filled out automatically, provided that its a recognized armor.";
	string += "\n\n" + toUni("Alternative spelling") + "\nYou can use alternative spellings, descriptions and embellishments. For example: \"Golden Plate of Lathander\" will result in the AC and attributes of a \"Plate\".";
	string += "\n\n" + toUni("Unarmored Defense") + "\nUsing either \"unarmored\", \"naked\", \"nothing\", or \"no armor\" combined with an abbreviation of one of the six ability scores will result in the armor being calculated with that ability score. For example: \"Unarmored Defense (Int)\".\nIf you do not include the abbreviation, the sheet will auto-fill an armor AC of 10.";
	string += "\n\n" + toUni("Magic bonus") + "\nAny magical bonus you type in this field is added to the AC of the armor type. For example: \"Chain mail +1\" or \"Plate -2\".";
	
	var TheList = [
		"",
		"Unarmored",
		"Unarmored Defense (Con)",
		"Unarmored Defense (Wis)"
	];
	
	var armNm = "";
	for (var key in ArmourList) {
		if (key === "unarmored" || testSource(key, ArmourList[key], "armorExcl")) continue; // test if the armour or its source isn't excluded
		if (armNm === "Plate") TheList.push("");
		armNm = ArmourList[key].name.capitalize();
		if (TheList.indexOf(armNm) === -1) TheList.push(armNm);
	};
	
	if (tDoc.getField("AC Armor Description").submitName === TheList.toSource()) return; //no changes, so no reason to do this
	tDoc.getField("AC Armor Description").submitName = TheList.toSource();

	var theFldVal = What("AC Armor Description");
	tDoc.getField("AC Armor Description").setItems(TheList);
	Value("AC Armor Description", theFldVal, string);
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
};

function SetBackgrounddropdown() {
	tDoc.delay = true;
	tDoc.calculate = false;
	var ArrayDing = [""];
	var tempString = "";
	tempString += toUni("Background") + "\nType in the name of the background (or select it from the drop-down menu) and its features and proficiencies will be filled out automatically, provided that its a recognized background.";
	tempString += "\n\n" + toUni("Changing background") + "\nIf you change the background, all the features of the previous background will be removed and the features of the new background will be applied.";
	
	for (var key in BackgroundList) {
		if (testSource(key, BackgroundList[key], "backgrExcl")) continue;
		ArrayDing.push(BackgroundList[key].name);
		for (var i = 0; i < BackgroundList[key].variant.length; i++) {
			var varKey = BackgroundList[key].variant[i];
			if (testSource(varKey, BackgroundSubList[varKey], "backgrExcl")) continue;
			var backNm = BackgroundSubList[varKey].name;
			if (ArrayDing.indexOf(backNm) === -1) ArrayDing.push(backNm);
		}
	};
	ArrayDing.sort();
	if (tDoc.getField("Background").submitName === ArrayDing.toSource()) return; //no changes, so no reason to do this
	tDoc.getField("Background").submitName = ArrayDing.toSource();
	var theFldVal = What("Background");
	tDoc.getField("Background").setItems(ArrayDing);
	Value("Background", theFldVal, tempString);
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
};

function SetRacesdropdown() {
	tDoc.delay = true;
	tDoc.calculate = false;
	var tempString = "";
	var ArrayDing = [""];
	tempString += toUni("Race") + "\nType in the name of the race (or select it from the drop-down menu) and its traits and features will be filled out automatically, provided that its a recognized race. You are not limited by the names in the list. Just typing \"Drow\" will also be recognized, for example.";
	tempString += "\n\n" + toUni("Alternative spelling") + "\nDifferent, setting-dependent race names are recognized as well. For example, typing \"Moon Elf\" will result in all the traits and features of the \"High Elf\" from the Player's Handbook.";
	tempString += "\n\n" + toUni("Changing race") + "\nIf you change the race, all the features of the previous race will be removed and the features of the new race will be applied.";
	
	for (var key in RaceList) {
		if (testSource(key, RaceList[key], "racesExcl")) continue;
		var raceNm = RaceList[key].sortname ? RaceList[key].sortname : RaceList[key].name.capitalize();
		if (ArrayDing.indexOf(raceNm) === -1) ArrayDing.push(raceNm);
	}
	ArrayDing.sort();
	if (tDoc.getField("Race").submitName === ArrayDing.toSource()) return; //no changes, so no reason to do this
	tDoc.getField("Race").submitName = ArrayDing.toSource();
	var theFldVal = What("Race");
	tDoc.getField("Race").setItems(ArrayDing);
	Value("Race", theFldVal, tempString);
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
};

//parse the results from the menu into an array
function getMenu(menuname) {
	try {
		var temp = app.popUpMenuEx.apply(app, Menus[menuname]);
	} catch (err) {
		var temp = null;
	}
	temp = temp === null ? "nothing#toreport" : temp;
	temp = temp.toLowerCase();
	temp = temp.split("#");
	return temp;
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
			var theWeight = RoundTo(tDoc[theGear[0]][theGear[1]].weight * massMod, 0.001, true);
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
function ParseGear(input, exclAmmunition) {
	if (!input) return false;
	var foundLen = 0;
	var result = false;
	var tempString = removeDiacritics(input.toLowerCase());
	
	//see if it is an armour
	var findArmor = ParseArmor(tempString, true);
	if (findArmor) {
		foundLen = tempString.match(ArmourList[findArmor].regExpSearch)[0].length;
		if (foundLen === tempString.length) foundLen = findArmor.length;
		result = ["ArmourList", findArmor];
	};
	
	//see if it is a weapon
	var findWeapon = ParseWeapon(tempString, true);
	if (findWeapon) {
		var testLen = tempString.match(WeaponsList[findWeapon].regExpSearch)[0].length;
		if (testLen === tempString.length) testLen = findWeapon.length;
		if (testLen > foundLen) {
			foundLen = testLen;
			result = ["WeaponsList", findWeapon];
		};
	};
	
	//see if it is an ammunition weapon
	var findAmmo = ParseAmmo(tempString, true);
	if (findAmmo) {
		var testLen = findAmmo[1];
		if (testLen > foundLen) {
			foundLen = testLen;
			result = ["AmmoList", findAmmo[0]];
		};
	};
	
	//see if it is gear
	for (var key in GearList) { //scan string for all gear
		var aList = GearList[key];
		if (!aList.name || aList.name === "-" || testSource(key, aList, "gearExcl") || (exclAmmunition && key.indexOf("ammunition") !== -1)) continue;
		//var aListRegEx = RegExp(("\\b" + aList.name.replace(/\uFEFF|\,[^\,]+$/g, "").RegEscape() + "\\b").replace("s\\b", "s?\\b"), "i");
		var aListRegEx = MakeRegex(aList.name.replace(/\uFEFF|\,[^\,]+$/g, ""));
		if ((aListRegEx).test(tempString)) {
			//var testLen = tempString.match(aListRegEx)[0].length;
			var testLen = aList.name.length;
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
		//var aListRegEx = RegExp(("\\b" + aList.name.replace(/\uFEFF|\,[^\,]+$/g, "").RegEscape() + "\\b").replace("s\\b", "s?\\b"), "i");
		var aListRegEx = MakeRegex(aList.name.replace(/\uFEFF|\,[^\,]+$/g, ""));
		if ((aListRegEx).test(tempString)) {
			//var testLen = tempString.match(aListRegEx)[0].length;
			var testLen = aList.name.length;
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
		var isKey = !checkKey ? false : ParseGear(theRow, true);
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
	item = clean(item);
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
	var gearArray = [];
	for (var key in GearList) {
		if (testSource(key, GearList[key], "gearExcl")) continue;
		gearArray.push(key);
	};
	gearArray.sort();
	for (var i = 0; i < gearArray.length; i++) {
		var theGear = GearList[gearArray[i]];
		GearMenus.gear.push({
			cName : theGear.infoname,
			cReturn : !theGear.name || theGear.name === "-" ? null : "gear#" + gearArray[i]
		});
	};

	//make a menu array for all the tools
	GearMenus.tools = [];
	var toolsArray = [];
	for (var key in ToolsList) {
		if (testSource(key, ToolsList[key], "gearExcl")) continue;
		toolsArray.push(key);
	};
	toolsArray.sort();
	for (var i = 0; i < toolsArray.length; i++) {
		var theTool = ToolsList[toolsArray[i]];
		GearMenus.tools.push({
			cName : theTool.infoname,
			cReturn : !theTool.name || theTool.name === "-" ? null : "tool#" + toolsArray[i]
		});
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
				oSubMenu : eval(object.toSource())
			};
			for (var j = 0; j < temp.oSubMenu[i].oSubMenu.length; j++) {
				var tempObject = temp.oSubMenu[i].oSubMenu[j];
				if (tempObject.cReturn) tempObject.cReturn += "#" + array[i][1];
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
			var isMarked = array[i][1] === "attuned" ? What("Adventuring Gear Remember") === false :
				array[i][1] === "location2" ? What("Gear Location Remember").split(",")[0] === "true" :
				array[i][1] === "location3" ? What("Gear Location Remember").split(",")[1] === "true" : false;
			var isEnabled = array[i][1] === "location3" ? tDoc.getField(BookMarkList["ASfront"]).page !== -1 : array[i][1].indexOf("background") !== -1 ? backgroundKn !== "Background" : true;
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
function InventoryOptions() {
	var MenuSelection = getMenu("inventory");
	
	if (!MenuSelection) return;
	
	tDoc.delay = true;
	tDoc.calculate = false;
	thermoM("start"); //start a progress dialog
	thermoM("Inventory menu option..."); //change the progress
	
	if (MenuSelection[0] === "pack") {
		var thePack = PacksList[MenuSelection[1]];
		thermoM("Adding pack " + thePack.name + "..."); //change the progress dialog text
		var columnCalc = typePF ? (MenuSelection[2].indexOf("r") !== -1 ? 1.5 : MenuSelection[2].indexOf("m") !== -1 ? 3 : false) : (MenuSelection[2].indexOf("r") !== -1 ? 2 : false);
		var startRow = columnCalc ? Math.round(FieldNumbers.gear / columnCalc + 1) : 1;
		if (What("Adventuring Gear Row " + startRow)) InvInsert("Adventuring ", startRow);
		for (var i = 0; i < thePack.items.length; i++) {
			var theGear = thePack.items[i];
			AddToInv("gear", MenuSelection[2], theGear[0], theGear[1], theGear[2]);
		};
	} else if (MenuSelection[0] === "gear" || MenuSelection[0] === "tool") {
		var theGear = MenuSelection[0] === "gear" ? GearList[MenuSelection[1]] : ToolsList[MenuSelection[1]];
		thermoM("Adding '" + theGear.name + "' to the adventuring gear..."); //change the progress dialog text
		AddToInv("gear", MenuSelection[2], theGear.name, theGear.amount, theGear.weight);
	} else if (MenuSelection[0] === "reset") {
		thermoM("Resetting the equipment section..."); //change the progress dialog text
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
		thermoM("Toggling the visibility of the Attuned Magical Items subsection...");
		ShowAttunedMagicalItems(What("Adventuring Gear Remember") === true);
	} else if (MenuSelection[0] === "location2") {
		thermoM("Toggling the visibility of the location column on page 2...");
		HideInvLocationColumn("Adventuring Gear ", What("Gear Location Remember").split(",")[0] === "true");
	} else if (MenuSelection[0] === "location3") {
		thermoM("Toggling the visibility of the location column on page 3...");
		HideInvLocationColumn("Extra.Gear ", What("Gear Location Remember").split(",")[1] === "true");
	} else if (MenuSelection[0].indexOf("background") !== -1) {
		thermoM("Adding background items to equipment section...");
		AddInvBackgroundItems();
	};
	if (MenuSelection[0].indexOf("armour") !== -1) {
		thermoM("Adding/updating armor and shield in equipment section...");
		AddInvArmorShield();
	};
	if (MenuSelection[0].indexOf("weapon") !== -1) {
		thermoM("Adding/updating weapons and ammunition in equipment section...");
		AddInvWeaponsAmmo();
	};
	
	thermoM("stop"); //stop the top progress dialog
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
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
	//see if two strings don't differ too much in length
	var similarLen = function (str1, str2) {
		return Math.abs(str1.length - str2.length) < 5 || Math.abs(str1.length, str2.length) / Math.max(str1.length, str2.length) < 0.2;
	};
	
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
		var toMatch = /\(\/.*?\/i?g?i?\)\.test\(WeaponText\)/g;
		if (CurrentEvals.atkCalc && (toMatch).test(CurrentEvals.atkCalc)) {
			isSpecial = CurrentEvals.atkCalc.match(toMatch).some( function (C) {
				try {
					return eval(C.replace("WeaponText", "atkNm"));
				} catch (err) {};
			});
		};
		return isSpecial;
	};
	
	//see if two strings don't differ too much in length
	var similarLen = function (str1, str2) {
		return Math.abs(str1.length - str2.length) < 5 || Math.abs(str1.length, str2.length) / Math.max(str1.length, str2.length) < 0.2;
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
		var magicBonus = parseFloat(aNm.match(/(^|\s)[\+|-]\d+/i));
		if (isNaN(magicBonus)) magicBonus = 0;
		for (var it in items) {
			var aItem = items[it];
			if (aItem.magic === magicBonus && ((!theAmmo && aItem.name.indexOf(aNm) !== -1) || (theAmmo && aItem.key === theAmmo && (it.replace(/\d+/, "") === theAmmo || similarLen(aItem.name, aNm))))) {
				aItem.amount = aNr;
				return;
			};
		};
		var theTxt = theAmmo ? theAmmo : aNm;
		if (!items[theTxt]) {
			items[theTxt] = {
				key : theAmmo, // item key
				name : aNm, // the name in the field
				weight : aWght,
				magic : 0, // magic bonus
				amount : aNr // the number of these
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
	var magic = type === "Adventuring " && What("Adventuring Gear Remember") === false && lineNmbr > FieldNumbers.gearMIrow;
	var maxRow = FieldNumbers[type === "Adventuring " ? "gear" : type === "Extra." ? "extragear" : "compgear"];
	var upRow = lineNmbr === 1 ? false : magic ? lineNmbr !== FieldNumbers.gearMIrow + 1 : true;
	var downRow = lineNmbr === maxRow ? false : magic ? lineNmbr !== FieldNumbers.gearMIrow - 1 : true
	
	var numColumns = typePF && type === "Adventuring " ? 3 : 2;
	var curCol = typePF && type.indexOf("Comp.") !== -1 ? 1 : Math.ceil(lineNmbr / Math.round(maxRow / numColumns));
	var moveCol = curCol > 1 ? "left" : numColumns === 3 ? "middle" : "right";
	var moveCol2 = numColumns !== 3 ? false : curCol === 3 ? "middle" : "right";
	
	var amendMenu = function(inputArray) {
		var array = eval(inputArray.toSource());
		for (var i = 0; i < array.length; i++) {
			array[i].cReturn = type + "#" + lineNmbr + "#" + array[i].cReturn;
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
		var AScompA = What("Template.extras.AScomp").split(",");
		var prefix = type.substring(0, type.indexOf("Comp."));
		if (type.indexOf("Comp.") !== -1) AScompA.splice(AScompA.indexOf(prefix), 1);
		var temp = {
			cName : "Move to a Companion's Equipment",
			oSubMenu : []
		};
		var isEnabled = !theField ? false : AScompA.length > 1 || tDoc.getField(BookMarkList["AScomp"]).page !== -1;
		for (var i = 0; i < AScompA.length; i++) {
			if ((type.indexOf("Comp.") !== -1 && prefix === AScompA[i]) || (i === 0 && tDoc.getField(BookMarkList["AScomp"]).page === -1)) continue;
			var CompNm = What(AScompA[i] + "Comp.Desc.Name");
			var CompPg = tDoc.getField(AScompA[i] + "Comp.Desc.Name").page;
			if (isArray(CompPg)) CompPg = CompPg[1];
			temp.oSubMenu.push({
				cName : (CompNm ? CompNm : "NAME") + "'s Equipment Section (page " + CompPg + ")",
				cReturn : type + "#" + lineNmbr + "#" + "movepage#" + AScompA[i] + "Comp.",
				bEnabled : isEnabled
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
	
	if (!MenuSelection) return;
	tDoc.delay = true;
	tDoc.calculate = false;
	var type = MenuSelection[0].capitalize().replace("Ascomp", "AScomp").replace("Eqp", "eqp");
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
		thermoM("Moving the gear " + MenuSelection[2] + "..."); //change the progress dialog text
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
		thermoM("Moving the gear to the " + (toCol.indexOf("r") !== -1 ? "right" : toCol.indexOf("m") !== -1 ? "middle" : "left") + " column..."); //change the progress dialog text
		InvDelete(type, lineNmbr);
		AddToInv(type, MenuSelection[3], FieldsValue[0], FieldsValue[1], FieldsValue[2], FieldsValue[3], false, false, false, true);
		break;
	 case "movepage" :
		thermoM("Moving the gear to another page..."); //change the progress dialog text
		InvDelete(type, lineNmbr);
		var toPageType = MenuSelection[3].capitalize().replace("Ascomp", "AScomp").replace("Eqp", "eqp");
		AddToInv(toPageType, "l", FieldsValue[0], FieldsValue[1], FieldsValue[2], FieldsValue[3], false, false, false, true);
		break;
	 case "copy" :
		thermoM("Copying the gear to magic items on page 3..."); //change the progress dialog text
		AddMagicItem(FieldsValue[0], true, "", FieldsValue[2]);
		break;
	case "insert":
		thermoM("Inserting empty gear line..."); //change the progress dialog text
		InvInsert(type, lineNmbr);
		break;
	case "delete":
		thermoM("Deleting gear line..."); //change the progress dialog text
		InvDelete(type, lineNmbr);
		break;
	case "clear":
		thermoM("Clearing gear line..."); //change the progress dialog text
		tDoc.resetForm(Fields);
		break;
	case "gear":
	case "tool":
		var theGear = MenuSelection[2] === "gear" ? GearList[MenuSelection[3]] : ToolsList[MenuSelection[3]];
		thermoM("Adding '" + theGear.name + "' to the line..."); //change the progress dialog text
		var theNm = (lineNmbr > 1 && (/^.{0,2}-|backpack|\bbag\b|^(?=.*saddle)(?=.*bag).*$|\bsack\b|\bchest\b|, with|, contain/i).test(What(type + "Gear Row " + (lineNmbr - 1))) ? "- " : "") + theGear.name;
		Value(Fields[0], theNm);
		Value(Fields[1], theGear.amount);
		Value(Fields[2], theGear.weight);
		break;
	};	
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
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
function ParseBackground(Input) {
	var resultArray = ["", ""];

	if (Input) {
		var tempFound = 0;
		Input = removeDiacritics(Input);
		for (var key in BackgroundList) { //scan string for all backgrounds
			if (BackgroundList[key].variant) {
				var BackOpt = BackgroundList[key].variant;
				for (var sub = 0; sub < BackOpt.length; sub++) { //scan string for all variants of the background
					var bVars = BackgroundSubList[BackOpt[sub]];
					if (testSource(BackOpt[sub], bVars, "backgrExcl")) continue; // test if the background variant or its source isn't excluded
					var bvSearch = bVars.regExpSearch; //use the defined regular expression of the background variant
					if (tempFound < bVars.name.length && (bvSearch).test(Input)) {
						resultArray[0] = key;
						resultArray[1] = BackOpt[sub];
						tempFound = bVars.name.length;
					}
				}
			}
			if (testSource(key, BackgroundList[key], "backgrExcl")) continue; // test if the background or its source isn't excluded
			var bSearch = BackgroundList[key].regExpSearch; //use the defined regular expression of the background
			if (tempFound < BackgroundList[key].name.length && (bSearch).test(Input)) {
				resultArray[0] = key;
				tempFound = BackgroundList[key].name.length;
			}
		}
	}
	
	return resultArray;
};

//detects background entered and put information to global CurrentBackground variable
function FindBackground(Event) {
	var tempString = Event === undefined ? What("Background").toLowerCase() : Event;
	var tempFound = ParseBackground(tempString);
	CurrentBackground = {
		known : tempFound[0],
		variant : tempFound[1],
		name : "",
		skills : [],
		skillstxt : "",
		gold : 0,
		equipleft : "",
		equipright : "",
		languages : "",
		feature : "",
		trait : [],
		ideal : [],
		bond : [],
		flaw : [],
		extra : "",
		tools : "",
		source : [],
		lifestyle : ""
	};

	for (var prop in CurrentBackground) {
		if (prop !== "known" && prop !== "variant") {
			if (CurrentBackground.variant && BackgroundSubList[CurrentBackground.variant][prop] !== undefined) {
				CurrentBackground[prop] = BackgroundSubList[CurrentBackground.variant][prop]
			} else if (CurrentBackground.known && BackgroundList[CurrentBackground.known][prop] !== undefined) {
				CurrentBackground[prop] = BackgroundList[CurrentBackground.known][prop];
			}
		}
	};
};

//apply the various attributes of the background
function ApplyBackground(input) {
	if (event.target && event.target.name === "Background" && input.toLowerCase() === event.target.value.toLowerCase()) return; //no changes were made
	
	tDoc.delay = true;
	tDoc.calculate = false;
	
	//only update the tooltips and background known field if backgrounds are set to manual
	if (What("Manual Background Remember") === "Yes") {
		FindBackground(input.toLowerCase());
		UpdateTooltips();
		tDoc.calculate = IsNotReset;
		tDoc.delay = false;
		return; //don't do the rest of this function
	}
	
	thermoM("start"); //start a progress dialog
	thermoM("Applying background..."); //change the progress 
	
	var newBackground = ParseBackground(input.toLowerCase());
	if (IsNotReset && (newBackground[0] !== CurrentBackground.known || newBackground[1] !== CurrentBackground.variant)) {
		RemoveBackground();
		thermoM("Removing the old background features..."); //change the progress dialog text
	};
	var tempField = tDoc.getField("Background Extra");
	var tempArray = [""];
	thermoM("Recognizing the entered background..."); //change the progress dialog text
	FindBackground(input.toLowerCase());

	if (CurrentBackground.known) {
		thermoM("Applying the background's features..."); //change the progress dialog text
		thermoM(1/5); //increment the progress dialog's progress
		
		Value("Background Feature", CurrentBackground.feature);
		
		if (isArray(CurrentBackground.skills)) {
			for (var i = 0; i < CurrentBackground.skills.length; i++) {
				AddSkillProf(CurrentBackground.skills[i]);
			}
		}
		
		thermoM(2/5); //increment the progress dialog's progress
		
		if (CurrentBackground.extra) {
			for (i = 1; i < CurrentBackground.extra.length; i++) {
				tempArray.push(CurrentBackground.extra[i]);
			};
			tempField.setItems(tempArray);
			tempField.userName = CurrentBackground.extra[0] + " of your " + CurrentBackground.name + " background.";
		} else {
			tempField.clearItems();
			tempField.userName = "There are no extra choices defined for your " + CurrentBackground.name + " background.\nThus, this drop-down box is empty.";
		};
		
		thermoM(3/5); //increment the progress dialog's progress

		if (CurrentBackground.tools) {
			for (i = 0; i < CurrentBackground.tools.length; i++) {
				AddTool(CurrentBackground.tools[i], CurrentBackground.name);
			}
		};

		if (CurrentBackground.languages) {
			for (var L = 0; L < CurrentBackground.languages.length; L++) {
				var theLang = CurrentBackground.languages[L];
				if (theLang.substring(0, 1) === "+") {
					theLang += CurrentBackground.name;
				}
				AddLanguage(theLang, "being a " + CurrentBackground.name);
			}
		}
		
		//add the lifestyle, if defined
		if (CurrentBackground.lifestyle) {
			var LifestyleArray = [
				"empty",
				"wretched",
				"squalid",
				"poor",
				"modest",
				"comfortable",
				"wealthy",
				"aristocratic"
			];
			var styleIndex = LifestyleArray.indexOf(CurrentBackground.lifestyle);
			if (styleIndex !== -1) PickDropdown("Lifestyle", styleIndex);
		}
		
		thermoM(4/5); //increment the progress dialog's progress
	} else {
		tempField.clearItems();
		tempField.userName = "First fill out a background in the field to the left.\n\nOnce a background is recognized that offers additional options, those additional options will be displayed here. For example, the \"Origin\" for the \"Outlander\" background.";
		if (input === "") {
			Value("Background Feature", "");
		}
	}
	thermoM("Finalizing the changes of the background..."); //change the progress dialog text

	UpdateTooltips(); //skills tooltip, ability score tooltip
	thermoM("stop"); //stop the top progress dialog
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
};

//apply the various attributes of the background
function RemoveBackground() {
	var tempField = tDoc.getField("Background Extra");
	tempField.clearItems();
	tempField.userName = "First fill out a background in the field to the left.\n\nOnce a background is recognized that offers additional options, those additional options will be displayed here. For example, the \"Origin\" for the \"Outlander\" background.";

	Value("Background Feature", "");

	if (CurrentBackground.known) {
		if (isArray(CurrentBackground.skills)) {
			for (var i = 0; i < CurrentBackground.skills.length; i++) {
				AddSkillProf(CurrentBackground.skills[i], false);
			}
		}
		if (CurrentBackground.tools) {
			for (i = 0; i < CurrentBackground.tools.length; i++) {
				RemoveTool(CurrentBackground.tools[i], CurrentBackground.name);
			}
		};
		if (CurrentBackground.languages) {
			for (var L = 0; L < CurrentBackground.languages.length; L++) {
				var theLang = CurrentBackground.languages[L];
				if (theLang.substring(0, 1) === "+") {
					theLang += CurrentBackground.name;
				}
				RemoveLanguage(theLang, "being a " + CurrentBackground.name);
			}
		}
		//remove the lifestyle, if defined
		if (CurrentBackground.lifestyle && CurrentBackground.lifestyle === clean(What("Lifestyle").toLowerCase(), " ")) {
			Value("Lifestyle", "");
			Value("Lifestyle daily cost", "");
		}
	};
};

//Make menu for 'background traits' button and parse it to Menus.background
function MakeBackgroundMenu() {
	var backMenu = [];
	var traitMenu = {};
	var idealMenu = {};
	var bondMenu = {};
	var flawMenu = {};

	var menuLVL1 = function (item, array) {
		for (i = 0; i < array.length; i++) {
			item.push({
				cName : array[i],
				cReturn : item + "#" + array[i],
				bEnabled : array[i] !== "No background entry has been detected on the first page"
			});
		}
	};

	var menuLVL2 = function (menu, name, array) {
		menu.cName = name;
		menu.oSubMenu = [];
		var theEntry = What(name);
		for (i = 0; i < array.length; i++) {
			menu.oSubMenu.push({
				cName : array[i],
				cReturn : name + "#" + i,
				bMarked : (RegExp(array[i].RegEscape(), "i")).test(theEntry)
			})
		}
	};

	var menuLVL2plus = function (menu, name, array) {
		menu.cName = name;
		menu.oSubMenu = [];
		var theEntry = What(name);
		for (i = 0; i < array.length; i++) {
			menu.oSubMenu.push({
				cName : array[i][0],
				cReturn : name + "#" + i,
				bMarked : (RegExp(array[i][1].RegEscape(), "i")).test(theEntry)
			})
		}
	};

	if (CurrentBackground.known) {
		menuLVL2(traitMenu, "Personality Trait", CurrentBackground.trait);
		menuLVL2plus(idealMenu, "Ideal", CurrentBackground.ideal);
		menuLVL2(bondMenu, "Bond", CurrentBackground.bond);
		menuLVL2(flawMenu, "Flaw", CurrentBackground.flaw);

		backMenu.push(traitMenu);
		backMenu.push(idealMenu);
		backMenu.push(bondMenu);
		backMenu.push(flawMenu);
	} else {
		menuLVL1(backMenu, ["No background entry has been detected on the first page"]);
	};

	menuLVL1(backMenu, ["-", "Reset the four fields"]);

	Menus.background = backMenu;
};

//call the background menu and do something with the results
function BackgroundOptions() {
	tDoc.delay = true;
	tDoc.calculate = false;
	var MenuSelection = getMenu("background");
	if (MenuSelection !== undefined) {
		if (MenuSelection[0] === "personality trait") {
			AddString("Personality Trait", CurrentBackground.trait[MenuSelection[1]], " ");
		} else if (MenuSelection[0] === "ideal") {
			Value("Ideal", CurrentBackground.ideal[MenuSelection[1]][1]);
		} else if (MenuSelection[0] === "bond") {
			Value("Bond", CurrentBackground.bond[MenuSelection[1]]);
		} else if (MenuSelection[0] === "flaw") {
			Value("Flaw", CurrentBackground.flaw[MenuSelection[1]]);
		} else if (MenuSelection[1] === "reset the four fields") {
			tDoc.resetForm(["Personality Trait", "Ideal", "Bond", "Flaw"]);
		}
	}
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
};

function AddLanguage(language, tooltip, replaceThis) {
	var tempString = language && tooltip ? "The language \"" + language + "\" was gained from " + tooltip + "." : "";
	var overflow = What("MoreProficiencies").toLowerCase().indexOf(language.toLowerCase()) === -1;
	if (overflow) {
		var doReplace = false;
		for (var n = 1; n <= 2; n++) {
			for (var i = 1; i <= FieldNumbers.langstools; i++) {
				var next = tDoc.getField("Language " + i);
				if (n === 1 && (next.value.toLowerCase().indexOf(language.toLowerCase()) !== -1 || (next.userName && next.userName === tempString))) {
					i = 9; n = 3; overflow = false;
				} else if (n === 1 && replaceThis && next.value.toLowerCase().indexOf(replaceThis.toLowerCase()) !== -1) {
					doReplace = true;
				} else if (n === 2 && ((doReplace && next.value.toLowerCase().indexOf(replaceThis.toLowerCase()) !== -1) || (!doReplace && next.value === ""))) {
					next.value = language;
					if (!doReplace) next.userName = tempString;
					i = 9; overflow = false;
				}
			}
		}
	}
	if (overflow) AddString("MoreProficiencies", language + " (language)", "; ");
};

function RemoveLanguage(language, tooltip) {
	var tempString = language !== undefined ? ("The language \"" + language + "\" was gained from " + tooltip + ".") : "";
	var overflow = true;
	for (var i = 1; i <= FieldNumbers.langstools; i++) {
		var next = tDoc.getField("Language " + i);
		if (next.value.toLowerCase().indexOf(language.toLowerCase()) !== -1 || next.userName === tempString) {
			DeleteItemType("Language ", i, FieldNumbers.langstools);
			i = 9;
			overflow = false;
		}
	}
	if (overflow) {
		RemoveString("MoreProficiencies", language + " (language)");
		RemoveString("MoreProficiencies", language);
	}
};

function AddTool(tool, toolstooltip, replaceThis) {
	var tempString = toolstooltip !== undefined ? "The proficiency with \"" + tool + "\" was gained from " + toolstooltip + "." : "";
	var overflow = What("MoreProficiencies").toLowerCase().indexOf(tool.toLowerCase()) === -1;
	if (overflow) {
		var doReplace = false;
		for (var n = 1; n <= 2; n++) {
			for (var i = 1; i <= FieldNumbers.langstools; i++) {
				var next = tDoc.getField("Tool " + i);
				if (n === 1 && (next.value.toLowerCase().indexOf(tool.toLowerCase()) !== -1 || (next.userName && next.userName === tempString))) {
					i = 9; n = 3; overflow = false;
				} else if (n === 1 && replaceThis && next.value.toLowerCase().indexOf(replaceThis.toLowerCase()) !== -1) {
					doReplace = true;
				} else if (n === 2 && ((doReplace && next.value.toLowerCase().indexOf(replaceThis.toLowerCase()) !== -1) || (!doReplace && next.value === ""))) {
					next.value = tool;
					if (!doReplace) next.userName = tempString;
					i = 9; overflow = false;
				}
			}
		}
		if ((/thieves.*tools/i).test(tool) && !(/thieves.*tools/i).test(What("Too Text")) && What("Too") === "") {
			Value("Too Text", "Thieves' Tools (Dex)");
			Checkbox("Too Prof", true);
		}
	}
	if (overflow) AddString("MoreProficiencies", tool, "; ");
};

function RemoveTool(tool, toolstooltip) {
	var tempString = toolstooltip !== undefined ? ("The proficiency with \"" + tool + "\" was gained from " + toolstooltip + ".") : "";
	var overflow = true;
	for (var i = 1; i <= FieldNumbers.langstools; i++) {
		var next = tDoc.getField("Tool " + i);
		if (next.value.toLowerCase().indexOf(tool.toLowerCase()) !== -1 || next.userName === tempString) {
			DeleteItemType("Tool ", i, FieldNumbers.langstools);
			i = 9;
			overflow = false;
		}
	}

	if ((/thieves.*tools/i).test(tool) && (/thieves.*tools/i).test(What("Too Text"))) {
		tDoc.resetForm(["Too Prof", "Too Exp", "Too Text"]);
	}
	
	if (overflow) RemoveString("MoreProficiencies", tool);
};

function AddWeapon(weapon, partialReplace) {
	var QI = !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : event.target.name.substring(0, event.target.name.indexOf("Comp."));
	var maxItems = QI ? FieldNumbers.attacks : 3;
	
	weapon = clean(weapon.toLowerCase(), " ") //remove leading or trailing spaces
	for (var n = 1; n <= 2; n++) {
		for (var i = 1; i <= maxItems; i++) {
			var next = tDoc.getField(prefix + Q + "Attack." + i + ".Weapon Selection");
			if (n === 1 && (RegExp("\\b" + weapon.RegEscape() + "\\b", "i")).test(next.value)) {
				i = maxItems + 1;
				n = 3;
			} else if (n === 2 && (next.value === "" || (partialReplace && (RegExp("\\b" + next.value.RegEscape() + "\\b", "i")).test(weapon)))) {
				next.value = weapon.capitalize();
				i = maxItems + 1;
				n = 3;
			}
		}
	}
};

function RemoveWeapon(weapon) {
	if (!IsNotImport) return;
	var QI = !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : event.target.name.substring(0, event.target.name.indexOf("Comp."));
	var maxItems = QI ? FieldNumbers.attacks : 3;
	
	weapon = clean(weapon.toLowerCase(), " ") //remove leading or trailing spaces
	for (var i = 1; i <= maxItems; i++) {
		var next = tDoc.getField(prefix + Q + "Attack." + i + ".Weapon Selection");
		if (next.value.toLowerCase().indexOf(weapon) !== -1) {
			WeaponDelete(i);
			i = maxItems + 1;
		}
	}
};

function AddString(field, inputstring, newline) {
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
	var thestring = toremove.replace(/\n/g, "\r");
	var regExString = thestring.RegEscape();
	var thefield = tDoc.getField(field);
	if (!thefield) return;
	var stringsArray = [
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
	var regExStringsArray = [
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
	if (newline === false) {
		stringsArray = [thestring];
		regExStringsArray = [regExString];
	}
	for (var i = 0; i < stringsArray.length; i++) {
		if ((RegExp(regExStringsArray[i], "i")).test(thefield.value)) {
			thefield.value = thefield.value.replace(RegExp(regExStringsArray[i], "i"), "");
			i = stringsArray.length;
		} else if (thefield.value.indexOf(stringsArray[i]) !== -1) {
			thefield.value = thefield.value.replace(stringsArray[i], "");
			i = stringsArray.length;
		}
	}
};

function ReplaceString(field, inputstring, newline, theoldstring, alreadyRegExp) {
	var thefield = tDoc.getField(field);
	if (!thefield) return;
	var thestring = theoldstring.replace(/\n/g, "\r");
	var regExString = alreadyRegExp ? thestring : thestring.RegEscape();
	var multilines = newline !== undefined ? newline : thefield.multiline;
	if ((RegExp(regExString, "i")).test(thefield.value)  && theoldstring) {
		thefield.value = thefield.value.replace(RegExp(regExString, "i"), inputstring);
	} else if (thefield.value.indexOf(thestring) !== -1 && theoldstring) {
		thefield.value = thefield.value.replace(thestring, inputstring);
	} else {
		AddString(field, inputstring, multilines);
	}
};

function SpliceString(field, inputstring, newline, theoldstring) {
	var thefield = tDoc.getField(field);
	if (!thefield) return;
	var thestring = theoldstring.replace(/\n/g, "\r");
	var regExString = thestring.RegEscape();
	var theinputstring = inputstring.replace(/\n/g, "\r");
	var regExinputString = theinputstring.RegEscape();
	var multilines = newline !== undefined ? newline : thefield.multiline;
	var startChr = thefield.value.search(RegExp(regExString, "i"));
	startChr = startChr === -1 ? thefield.value.indexOf(thestring) : startChr;
	if (!(RegExp(regExinputString, "i")).test(thefield.value) && thefield.value.indexOf(theinputstring) === -1 && startChr !== -1 && theoldstring) {
		startChr += thestring.length;
		thefield.value = thefield.value.slice(0, startChr) + inputstring + thefield.value.slice(startChr);
	} else {
		AddString(field, inputstring, multilines);
	}
};

// add (change === true) or remove (change === false) a skill proficiency with or without expertise; If expertise === "only", only add/remove the expertise, considering the skill already has proficiency; If expertise === "increment", only add/remove the expertise, considering the skill already has proficiency, otherwise add proficiency
function AddSkillProf(SkillName, change, expertise) {
	var QI = !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var prefix = QI ? "" : event.target.name.substring(0, event.target.name.indexOf("Comp."));
	var tempString = SkillName;
	if (SkillName.length > 4) {
		if (SkillsList.abbreviations.indexOf(SkillName.substring(0, 4)) !== -1) {
			tempString = SkillName.substring(0, 4);
		} else if (SkillsList.abbreviations.indexOf(SkillName.substring(0, 3)) !== -1) {
			tempString = SkillName.substring(0, 3);
		}
	};
	var alphaB = Who("Text.SkillsNames") === "alphabeta";
	if ((QI || typePF) && !alphaB) tempString = SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(tempString)];
	if (QI) {
		change = change !== undefined ? change : true;
		if ((/only|increment/i).test(expertise) ? tDoc.getField(tempString + " Prof").isBoxChecked(0) : expertise) {
			Checkbox(tempString + " Exp", change);
		}
		if (expertise !== "only") Checkbox(tempString + " Prof", change);
	} else if (typePF) {
		change = change !== undefined ? change : true;
		if ((/only|increment/i).test(expertise) ? tDoc.getField(prefix + ".Comp.Use.Skills." + tempString + ".Prof").isBoxChecked(0) : expertise) {
			Checkbox(prefix + ".Comp.Use.Skills." + tempString + ".Exp", change);
		}
		if (expertise !== "only") Checkbox(prefix + ".Comp.Use.Skills." + tempString + ".Prof", change);
	} else {
		change = change === false ? "nothing" : expertise && (change || expertise !== "only") ? "expertise" : "proficient";
		Value(prefix + "Text.Comp.Use.Skills." + tempString + ".Prof", change);
	}
};

//remove the effect of the player's race
function RemoveRace() {
	//stop this function if resetting the sheet
	if (!IsNotReset) {
		if (CurrentRace.removeeval) {
			var theRemoveeval = What("Unit System") === "metric" && CurrentRace.removeeval.indexOf("String") !== -1 ? ConvertToMetric(CurrentRace.removeeval, 0.5) : CurrentRace.removeeval;
			eval(theRemoveeval);
		};
		UpdateLevelFeatures("race", 0);
		return;
	} else if (CurrentRace.known) {
		//remove necessary race information such as height, weight, age, traits, languages
		AddTooltip("Height", "");
		AddTooltip("Weight", "");
		AddTooltip("Age", "");

		for (var L = 0; L < CurrentRace.languages.length; L++) {
			RemoveLanguage(CurrentRace.languages[L], "being a " + CurrentRace.name);
		}

		var SpdsToChange = [CurrentRace.speed[0], CurrentRace.speed[1]];
		//see if the speed to change is a string or not
		for (var Ss = 0; Ss <= 1; Ss++) {
			var Field = Ss === 0 ? "Speed" : "Speed encumbered";
			AddTooltip(Field, ""); //remove the tooltip
			if (isNaN(SpdsToChange[Ss])) {
				var OldSpd = What(Field) ? parseFloat(What(Field)) + (What("Unit System") === "imperial" ? " ft" : " m") : 0;
				Value(Field, OldSpd);
				var SpdCon = parseFloat(SpdsToChange[Ss]);
				if (What("Unit System") === "metric") {
					SpdCon = parseFloat(ConvertToMetric(SpdCon, 0.5));
				}
				SpdsToChange[Ss] = -1 * SpdCon;
			} else {
				SpdsToChange[Ss] = -1 * SpdsToChange[Ss];
			}
		}
		ChangeSpeed(SpdsToChange, false);

		//remove the racial traits
		Value("Racial Traits", "", "");

		//remove, if existed, the racial features, proficiencies, vision, etc. etc.
		if (CurrentRace.vision) {
			var theVision = What("Unit System") === "imperial" ? CurrentRace.vision : ConvertToMetric(CurrentRace.vision, 0.5);
			RemoveString("Vision", theVision);
		}
		if (CurrentRace.savetxt) {
			var theSavetxt = What("Unit System") === "imperial" ? CurrentRace.savetxt : ConvertToMetric(CurrentRace.savetxt, 0.5);
			RemoveString("Saving Throw advantages / disadvantages", theSavetxt);
		}
		if (CurrentRace.dmgres) {
			for (var i = 0; i < CurrentRace.dmgres.length; i++) {
				RemoveResistance(CurrentRace.dmgres[i]);
			}
		};
		if (CurrentRace.tools) {
			for (i = 0; i < CurrentRace.tools.length; i++) {
				RemoveTool(CurrentRace.tools[i], CurrentRace.name);
			}
		};
		if (CurrentRace.skills) {
			for (i = 0; i < CurrentRace.skills.length; i++) {
				AddSkillProf(CurrentRace.skills[i], false);
			}
		};
		if (CurrentRace.armor) {
			delete CurrentArmour.proficiencies[CurrentRace.name];
		};
		if (CurrentRace.weaponprofs) {
			delete CurrentWeapons.proficiencies[CurrentRace.name];
		};
		if (CurrentRace.weapons) {
			for (i = 0; i < CurrentRace.weapons.length; i++) {
				RemoveWeapon(CurrentRace.weapons[i]);
			}
		};
		
		//get the ability score arrays from the fields, set the racial bonuses to 0, and put them back in the field
		for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
			var tempArray = What(AbilityScores.abbreviations[i] + " Remember").split(",");
			tempArray[1] = 0;
			Value(AbilityScores.abbreviations[i] + " Remember", tempArray);
		}

		//run custom code included in race
		if (CurrentRace.removeeval) {
			var theRemoveeval = What("Unit System") === "metric" && CurrentRace.removeeval.indexOf("String") !== -1 ? ConvertToMetric(CurrentRace.removeeval, 0.5) : CurrentRace.removeeval;
			eval(theRemoveeval);
		}
		
		//remove the race from the CurrentSpells variable
		delete CurrentSpells[CurrentRace.known];

		UpdateLevelFeatures("race", 0);
		ApplyProficiencies(true); //call to update the armor, shield and weapon proficiencies
		UpdateTooltips(); //skills tooltip, ability score tooltip
	};
};

//make sure field is a number or the abbreviation of an ability score (field validation)
function ValidateBonus(goEmpty, allowDC) {
	var test = 0;
	var input = Number(event.value.replace(/,/g,"."));
	if (isNaN(input)) {
		var notComp = event.target.name.indexOf("Comp.") === -1 ? true : event.target.name.substring(0, event.target.name.indexOf("Comp."));
		test = event.value;
		if (!allowDC) test = test.replace(/dc/ig, "");
		["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"].forEach( function(AbiS) {
			test = test.replace(RegExp("(\\b|\\d)" + AbiS[0] + AbiS[1] + "?" + AbiS[2] + "?" + "(\\b|\\d)", "ig"), "$1" + AbiS + "$2");
		});
		event.value = EvalBonus(test, notComp, "test") !== undefined ? test : 0;
	} else {
		event.value = event.value === "" && goEmpty ? "" : Math.round(input);
	}
};

//calculate the skill modifier (field calculation)
function CalcSkill() {
	var isPP = event.target.name === "Passive Perception" ? 10 : 0;
	var alphaB = Who("Text.SkillsNames") === "alphabeta";
	var Skill = !isPP ? clean(event.target.name.substring(0, 4)) : (alphaB ? "Perc" : "Perf");
	var skillLookup = alphaB ? SkillsList.abilityScores : SkillsList.abilityScoresByAS;
	var Ability = skillLookup[SkillsList.abbreviations.indexOf(Skill)];
	if (Ability === "Too") {
		event.value = "";
		return; //don't do the rest of this function
	}
	var Mod = What(Ability + " Mod");
	var ProfBonus = 0;
	var theProf = Number(What("Proficiency Bonus"));
	if (tDoc.getField("Proficiency Bonus Dice").isBoxChecked(0) === 1 && (event.target.name.indexOf("Passive") !== -1 || event.target.name.indexOf("Initiative") !== -1)) {
		theProf = tDoc.getField("Proficiency Bonus").submitName;
	}

	if (tDoc.getField(Skill + " Prof") && tDoc.getField(Skill + " Prof").isBoxChecked(0) === 1) {
		ProfBonus = theProf;
		if (tDoc.getField(Skill + " Exp").isBoxChecked(0) === 1) {
			ProfBonus = ProfBonus * 2;
		}
	} else if (tDoc.getField("Remarkable Athlete").isBoxChecked(0) && (Ability === "Str" || Ability === "Dex" || Ability === "Con")) {
		ProfBonus = Math.ceil(theProf / 2);
	} else if (tDoc.getField("Jack of All Trades").isBoxChecked(0)) {
		ProfBonus = Math.floor(theProf / 2);
	}

	var ExtraBonus = EvalBonus(What(Skill + " Bonus"), true);

	var AllBonus = (/Initiative/).test(event.target.name) ? 0 : EvalBonus(What("All Skills Bonus"), true);

	var PassBonus = isPP ? EvalBonus(What("Passive Perception Bonus"), true) : 0;

	event.value = Mod === "" ? "" : Number(isPP) + Number(Mod) + Number(ProfBonus) + Number(ExtraBonus) + Number(AllBonus) + Number(PassBonus);
};

//calculate the saving throw modifier (field calculation)
function CalcSave() {
	//get the ability modifier belonging to the save
	var Save = event.target.name;
	var QI = event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : event.target.name.substring(0, event.target.name.indexOf("Comp."));
	var Sabi = QI ? 4 : 21 + prefix.length;
	var Ability = Save.substring(0, Sabi - 1).slice(-3);
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
	if (!typePF && QI && (Ability === "Str" || Ability === "Dex") && (tDoc.getField("Extra.Condition 8").isBoxChecked(0) === 1 || tDoc.getField("Extra.Condition 13").isBoxChecked(0) === 1 || tDoc.getField("Extra.Condition 14").isBoxChecked(0) === 1)) {
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

//update the proficiencies for armor and weapons
function ApplyProficiencies(updatefields) {
	var ProfFields = [
		"Proficiency Armor Light", //0
		"Proficiency Armor Medium", //1
		"Proficiency Armor Heavy", //2
		"Proficiency Shields", //3
		"Proficiency Weapon Simple", //4
		"Proficiency Weapon Martial", //5
		"Proficiency Weapon Other", //6
		"Proficiency Weapon Other Description" //7
	];
	var ProfRem = What("Proficiencies Remember");
	var ArmorLight = false;
	var ArmorLightTip = "";
	var ArmorMedium = false;
	var ArmorMediumTip = "";
	var ArmorHeavy = false;
	var ArmorHeavyTip = "";
	var Shields = false;
	var ShieldsTip = "";
	var WeaponSimple = false;
	var WeaponSimpleTip = "";
	var WeaponMartial = false;
	var WeaponMartialTip = "";
	var WeaponOther = false;
	var WeaponOtherTip = "";
	var WeaponOtherString = "";
	var WeaponOtherArray = [];
	var tempArray = [];
	var TypeProf = 0;
	var WeaponType = "";

	//do nothing on startup (updatefields = false)
	if (updatefields) {
		tDoc.resetForm(ProfFields);

		//parse the armor and shield proficiencies
		for (var key in CurrentArmour.proficiencies) {
			if (CurrentArmour.proficiencies[key][0]) {
				ArmorLight = true;
				ArmorLightTip += ArmorLightTip === "" ? "Light armor proficiency gained from:\n \u2022 " : ";\n \u2022 ";
				ArmorLightTip += key;
			}
			if (CurrentArmour.proficiencies[key][1]) {
				ArmorMedium = true;
				ArmorMediumTip += ArmorMediumTip === "" ? "Medium armor proficiency gained from:\n \u2022 " : ";\n \u2022 ";
				ArmorMediumTip += key;
			}
			if (CurrentArmour.proficiencies[key][2]) {
				ArmorHeavy = true;
				ArmorHeavyTip += ArmorHeavyTip === "" ? "Heavy armor proficiency gained from:\n \u2022 " : ";\n \u2022 ";
				ArmorHeavyTip += key;
			}
			if (CurrentArmour.proficiencies[key][3]) {
				Shields = true;
				ShieldsTip += ShieldsTip === "" ? "Shields proficiency gained from:\n \u2022 " : ";\n \u2022 ";
				ShieldsTip += key;
			}
		}
		
		// now check if the armor proficiencies have been manually turned on or off, and use this to override previous setting
		if (ProfRem.indexOf("lighton") !== -1) {
			ArmorLight = true;
			ArmorLightTip += ArmorLightTip === "" ? "Light armor proficiency gained from:\n \u2022 " : ";\n \u2022 ";
			ArmorLightTip += "Manually enabled";
		} else if (ProfRem.indexOf("lightoff") !== -1) {
			ArmorLight = false;
			ArmorLightTip += ArmorLightTip === "" ? "Light armor proficiency gained from:\n \u2022 " : ";\n \u2022 ";
			ArmorLightTip += "Manually disabled";
		}
		if (ProfRem.indexOf("mediumon") !== -1) {
			ArmorMedium = true;
			ArmorMediumTip += ArmorMediumTip === "" ? "Medium armor proficiency gained from:\n \u2022 " : ";\n \u2022 ";
			ArmorMediumTip += "Manually enabled";
		} else if (ProfRem.indexOf("mediumoff") !== -1) {
			ArmorMedium = false;
			ArmorMediumTip += ArmorMediumTip === "" ? "Medium armor proficiency gained from:\n \u2022 " : ";\n \u2022 ";
			ArmorMediumTip += "Manually disabled";
		}
		if (ProfRem.indexOf("heavyon") !== -1) {
			ArmorHeavy = true;
			ArmorHeavyTip += ArmorHeavyTip === "" ? "Heavy armor proficiency gained from:\n \u2022 " : ";\n \u2022 ";
			ArmorHeavyTip += "Manually enabled";
		} else if (ProfRem.indexOf("heavyoff") !== -1) {
			ArmorHeavy = false;
			ArmorHeavyTip += ArmorHeavyTip === "" ? "Heavy armor proficiency gained from:\n \u2022 " : ";\n \u2022 ";
			ArmorHeavyTip += "Manually disabled";
		}
		if (ProfRem.indexOf("shieldson") !== -1) {
			Shields = true;
			ShieldsTip += ShieldsTip === "" ? "Shields proficiency gained from:\n \u2022 " : ";\n \u2022 ";
			ShieldsTip += "Manually enabled";
		} else if (ProfRem.indexOf("shieldsoff") !== -1) {
			Shields = false;
			ShieldsTip += ShieldsTip === "" ? "Shields proficiency gained from:\n \u2022 " : ";\n \u2022 ";
			ShieldsTip += "Manually disabled";
		}
		ArmorLightTip += ArmorLightTip !== "" ? "." : "";
		ArmorMediumTip += ArmorMediumTip !== "" ? "." : "";
		ArmorHeavyTip += ArmorHeavyTip !== "" ? "." : "";
		ShieldsTip += ShieldsTip !== "" ? "." : "";

		//check boxes and at tooltips for armor and shield proficiencies
		Checkbox("Proficiency Armor Light", ArmorLight, ArmorLightTip);
		Checkbox("Proficiency Armor Medium", ArmorMedium, ArmorMediumTip);
		Checkbox("Proficiency Armor Heavy", ArmorHeavy, ArmorHeavyTip);
		Checkbox("Proficiency Shields", Shields, ShieldsTip);
	}
	
	//parse the weapon proficiencies
	for (var key in CurrentWeapons.proficiencies) {
		var theProf = CurrentWeapons.proficiencies[key];
		//do this for the manually added other weapons
		if (key === "Manually added") {
			var theProf = [
				theProf[0],
				theProf[1],
				theProf[2].concat(CurrentWeapons.manualproficiencies)
			];
		}
		if (theProf[0]) {
			WeaponSimple = true;
			WeaponSimpleTip += WeaponSimpleTip === "" ? "Simple weapon proficiency gained from:\n \u2022 " : ";\n \u2022 ";
			WeaponSimpleTip += key;
		}
		if (theProf[1]) {
			WeaponMartial = true;
			WeaponMartialTip += WeaponMartialTip === "" ? "Martial weapon proficiency gained from:\n \u2022 " : ";\n \u2022 ";
			WeaponMartialTip += key;
		}
		if (theProf[2] && theProf[2].length > 0) {
			WeaponOtherTip += WeaponOtherTip === "" ? "Other weapon proficiencies gained from:\n \u2022 " : ";\n \u2022 ";
			WeaponOtherTip += key + ": ";
			for (var i = 0; i < theProf[2].length; i++) {
				if (CurrentWeapons.proficiencies[key][2][i]) { //to make sure that no CurrentWeapons.manualproficiencies are added to the tempArray
					tempArray.push(CurrentWeapons.proficiencies[key][2][i]);
				}
				WeaponOtherTip += i === 0 ? "" : ", ";
				WeaponOtherTip += theProf[2][i];
			}
		}
	}
	
	//do nothing on startup (updatefields = false)
	if (updatefields) {
		// now check if the weapon proficiencies have been manually turned on or off, and use this to override previous setting
		if (ProfRem.indexOf("simpleon") !== -1) {
			WeaponSimple = true;
			WeaponSimpleTip += WeaponSimpleTip === "" ? "Simple weapon proficiency gained from:\n \u2022 " : ";\n \u2022 ";
			WeaponSimpleTip += "Manually enabled";
		} else if (ProfRem.indexOf("simpleoff") !== -1) {
			WeaponSimple = false;
			WeaponSimpleTip += WeaponSimpleTip === "" ? "Simple weapon proficiency gained from:\n \u2022 " : ";\n \u2022 ";
			WeaponSimpleTip += "Manually disabled";
		}
		if (ProfRem.indexOf("martialon") !== -1) {
			WeaponMartial = true;
			WeaponMartialTip += WeaponMartialTip === "" ? "Martial weapon proficiency gained from:\n \u2022 " : ";\n \u2022 ";
			WeaponMartialTip += "Manually enabled";
		} else if (ProfRem.indexOf("martialoff") !== -1) {
			WeaponMartial = false;
			WeaponMartialTip += WeaponMartialTip === "" ? "Martial weapon proficiency gained from:\n \u2022 " : ";\n \u2022 ";
			WeaponMartialTip += "Manually disabled";
		}
		WeaponSimpleTip += WeaponSimpleTip !== "" ? "." : "";
		WeaponMartialTip += WeaponMartialTip !== "" ? "." : "";
		WeaponOtherTip += WeaponOtherTip !== "" ? "." : "";
	
		//check boxes and at tooltips for Simple and Martial weapon proficiencies, but not on startup (updatefields = false)
		Checkbox("Proficiency Weapon Simple", WeaponSimple, WeaponSimpleTip);
		Checkbox("Proficiency Weapon Martial", WeaponMartial, WeaponMartialTip);
	}

	//check each weapon in the other list of weapon proficiencies if proficiency isn't gained in another way. If not, add to array
	for (var j = 0; j < tempArray.length; j++) {
		if (WeaponsList[tempArray[j]]) {
			WeaponType = WeaponsList[tempArray[j]].type;
			TypeProf = (WeaponType === "Simple" || WeaponType === "Martial") ? tDoc.getField("Proficiency Weapon " + WeaponType).isBoxChecked(0) : 0;
		} else {
			TypeProf = 0;
		}
		if (TypeProf === 0 && WeaponOtherArray.indexOf(tempArray[j]) === -1) {
			WeaponOtherArray.push(tempArray[j]);
		}
	}
	
	WeaponOtherArray.sort();
	CurrentWeapons.extraproficiencies = WeaponOtherArray;
	
	//add the extraArray to the WeaponOtherArray
	if (CurrentWeapons.manualproficiencies.length > 0) {
		for (var ew = 0; ew < CurrentWeapons.manualproficiencies.length; ew++) {
			WeaponOtherArray.push(CurrentWeapons.manualproficiencies[ew]);
		}
		WeaponOtherArray.sort();
	}

	//do nothing on startup (updatefields = false)
	if (updatefields) {
		for (i = 0; i < WeaponOtherArray.length; i++) {
			WeaponOtherString += i === 0 ? "" : ", ";
			WeaponOtherString += WeaponOtherArray[i].capitalize();
		}

		//check box, add string and add tooltips for other weapon proficiencies
		Checkbox("Proficiency Weapon Other", (WeaponOtherString.length > 0) ? true : false, WeaponOtherTip);
		Value("Proficiency Weapon Other Description", WeaponOtherString, WeaponOtherTip);

		//update the weapons to reflect the new proficiencies
		ReCalcWeapons(true);
	}
};

//limited feature: add (UpdateOrReplace = "replace"), or only update the text (UpdateOrReplace = "update"), or update both the text and the usages (UpdateOrReplace = number of previous usages), or just add the number of usages (UpdateOrReplace = "bonus")
function AddFeature(identifier, usages, additionaltxt, recovery, tooltip, UpdateOrReplace, Calc) {
	tooltip = tooltip ? tooltip : "";
	var additionaltxt = additionaltxt && What("Unit System") === "metric" ? ConvertToMetric(additionaltxt, 0.5) : additionaltxt;
	UpdateOrReplace = UpdateOrReplace ? UpdateOrReplace : "replace";
	var calculation = Calc ? Calc : "";
	var SslotsVisible = !typePF && eval(What("SpellSlotsRemember"))[0];
	var recovery = recovery === "long rest" || recovery === "short rest" || recovery === "dawn" ? recovery : recovery.capitalize();
	if ((/ ?\bper\b ?/).test(usages)) usages = usages.replace(/ ?\bper\b ?/, "");
	for (var n = 1; n <= 2; n++) {
		for (var i = 1; i <= FieldNumbers.limfea; i++) {
			var featureFld = tDoc.getField("Limited Feature " + i);
			var usageFld = tDoc.getField("Limited Feature Max Usages " + i);
			var recoveryFld = tDoc.getField("Limited Feature Recovery " + i);
			if (n === 1 && featureFld.value.toLowerCase().indexOf(identifier.toLowerCase()) !== -1) { //if the feature is found
				if (UpdateOrReplace === "replace") {
					featureFld.value = identifier + additionaltxt;
					if (tooltip) featureFld.userName = "The feature \"" + identifier + "\" was gained from " + tooltip;
					usageFld.setAction("Calculate", calculation);
					usageFld.submitName = calculation; //so it can be referenced later
					usageFld.value = usages;
					recoveryFld.value = recovery;
				} else if ((featureFld.value.toLowerCase().indexOf(additionaltxt.toLowerCase()) !== -1 || UpdateOrReplace === "bonus") && !isNaN(usages)) {
					featureFld.userName += featureFld.userName.indexOf(tooltip) === -1 ? ", " + tooltip : "";
					usageFld.value += usages - (!isNaN(UpdateOrReplace) ? UpdateOrReplace : 0);
				} else if (!isNaN(UpdateOrReplace) && !isNaN(usages)) {
					featureFld.value = identifier + additionaltxt;
					usageFld.value += usages - UpdateOrReplace;
				} else { //UpdateOrReplace = "update"
					featureFld.value = identifier + additionaltxt;
					usageFld.setAction("Calculate", calculation);
					usageFld.submitName = calculation; //so it can be referenced later
					usageFld.value = usages;
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

//remove a feature
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
			}
			i = FieldNumbers.limfea + 1;
		}
	}
}

//set the global CurrentRace.level variables when initializing sheet
function LoadLevelsonStartup() {
	if (CurrentRace.known) {
		CurrentRace.level = What("Character Level");
	}
	//add the proficiencies gained from class features
	UpdateLevelFeatures("proficiencies");
}

//lookup the name of a Feat and if it exists in the FeatsList
function ParseFeat(Inputtxt) {
	if (!Inputtxt) return "";
	Inputtxt = removeDiacritics(Inputtxt);
	var tempFound = 0;
	var temp = "";
	for (var key in FeatsList) {
		if (testSource(key, FeatsList[key], "featsExcl")) continue; // test if the feat or its source isn't excluded
		if (tempFound < key.length && Inputtxt.toLowerCase().indexOf(key) !== -1) {
			temp = key;
			tempFound = key.length;
		}
	}
	return temp;
}

//check all Feat fields and parse the once known into the global variable, as well as any proficiencies and tooltiptexts that need to go into global variables
function FindFeats(ArrayNmbr) {
	CurrentFeats.improvements = [];
	CurrentFeats.skills = [];

	for (var i = 0; i < FieldNumbers.feats; i++) {
		if (i !== ArrayNmbr) {
			var FeatFld = What("Feat Name " + (i + 1));
			CurrentFeats.known[i] = ParseFeat(FeatFld);
		}
	}

	for (i = 0; i < CurrentFeats.known.length; i++) {
		if (CurrentFeats.known[i]) {
			var theFeat = FeatsList[CurrentFeats.known[i]];
			//only add the armor proficiencies to global variables if feats are not set to manual
			if (theFeat.armor && What("Manual Feat Remember") !== "Yes") {
				CurrentArmour.proficiencies[theFeat.name + " feat"] = theFeat.armor;
			}
			if (theFeat.weapons && What("Manual Feat Remember") !== "Yes") {
				CurrentWeapons.proficiencies[theFeat.name + " feat"] = theFeat.weapons;
			}
			if (theFeat.improvements) {
				CurrentFeats.improvements.push(theFeat.improvements);
			}
			if (theFeat.skills) {
				CurrentFeats.skills.push(theFeat.skills);
			}
		}
	}
}

//add the text and features of a Feat
function ApplyFeat(InputFeat, FldNmbr) {
	var FeatFlds = [
		"Feat Name " + FldNmbr,
		"Feat Note " + FldNmbr,
		"Feat Description " + FldNmbr
	];
	if (!event.target || event.target.name !== FeatFlds[0]) {
		Value(FeatFlds[0], InputFeat);
		return;
	};
	var NewFeat = ParseFeat(InputFeat);
	var theFeat = FeatsList[NewFeat];
	var ArrayNmbr = FldNmbr - 1;
	
	if (CurrentFeats.known[ArrayNmbr] === NewFeat) return; //no changes were made
	var tempString = "";
	var setSpellVars = false;

	//only update the tooltips if feats are set to manual
	if (What("Manual Feat Remember") === "Yes") {
		UpdateTooltips();
		return; //don't do the rest of this function
	}
	
	thermoM("start"); //start a progress dialog
	thermoM("Applying feat..."); //change the progress
	thermoM(1/6); //increment the progress dialog's progress
		
	//first test if the feat has a prerequisite and if it meets that
	if (IsNotFeatMenu && IsNotReset && theFeat && theFeat.prereqeval) {
		try {
			var meetsPrereq = eval(theFeat.prereqeval);
		} catch (e) {
			console.println("The prereqeval for the feat '" + theFeat.name + "' produces an error and is subsequently ignored. If this is one of the built-in feats, please contact morepurplemorebetter using on of the contact bookmarks to let him know about this bug. Don't forget to name the version number of the sheet, of the software you are using, and the name of the feat.");
			console.show();
			var meetsPrereq = true;
		};
		if (!meetsPrereq) {
			thermoM("The feat '" + theFeat.name + "' has prerequisites that have not been met..."); //change the progress dialog text
			thermoM(1/5); //increment the progress dialog's progress
			
			var askUserFeat = app.alert({
				cTitle : "The prerequisites for '" + theFeat.name + "' have not been met",
				cMsg : "The feat that you have selected, '" + theFeat.name + "' has a prerequisite listed" + (theFeat.prerequisite ? " as: \n\t\"" + theFeat.prerequisite + "\"" : ".") + "\n\nYour character does not meet this requirement. Are you sure you want to apply this feat?",
				nIcon : 1,
				nType : 2
			});
			
			if (askUserFeat !== 4) { // do not continue and remove the feat
				
				if (event.target && event.target.name === FeatFlds[0]) {
					event.rc = false;
					if (isArray(tDoc.getField(event.target.name).page)) OpeningStatementVar = app.setTimeOut("tDoc.getField('" + event.target.name + ".1').setFocus();", 10);
				};
				thermoM("stop"); //stop the top progress dialog
				return;
			};
		};
	};
	
	tDoc.delay = true;
	tDoc.calculate = false;

	//remove previous feat at the same field
	if (CurrentFeats.known[ArrayNmbr] && CurrentFeats.known[ArrayNmbr] !== NewFeat) {
		console.println("removing"); //DEBUGGING!!!
		thermoM("Removing the old feat..."); //change the progress dialog text
		thermoM(1/4); //increment the progress dialog's progress
		var theFeat = FeatsList[CurrentFeats.known[ArrayNmbr]];
		if (IsNotFeatMenu && theFeat.armor) {
			delete CurrentArmour.proficiencies[theFeat.name + " feat"];
		}
		if (IsNotFeatMenu && theFeat.weapons) {
			delete CurrentWeapons.proficiencies[theFeat.name + " feat"];
		}
		if (IsNotFeatMenu && theFeat.source && SourceList[theFeat.source[0]]) {
			var sourceStringOld = "(" + SourceList[theFeat.source[0]].abbreviation + (theFeat.source[1] ? ", page " + theFeat.source[1] + ")" : "");
			RemoveString(FeatFlds[1], sourceStringOld);
		}

		if (IsNotFeatMenu && theFeat.removeeval) {
			var TheRemoveEval = What("Unit System") === "metric" && theFeat.removeeval.indexOf("String") !== -1 ? ConvertToMetric(theFeat.removeeval, 0.5) : theFeat.removeeval;
			eval(TheRemoveEval);
		}
		
		if (IsNotFeatMenu && theFeat.calcChanges) {
			addEvals(theFeat.calcChanges, [theFeat.name, "feat"], false);
		}
		
		if (IsNotFeatMenu && theFeat.scores) {
			//get the ability score arrays from the fields, remove the feat bonuses, and put them back in the field
			for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
				var tempArray = What(AbilityScores.abbreviations[i] + " Remember").split(",");
				tempArray[5] = (tempArray[5] ? Number(tempArray[5]) : 0) - theFeat.scores[i];
				Value(AbilityScores.abbreviations[i] + " Remember", tempArray);
			};
		};
		
		if (IsNotFeatMenu && theFeat.spellcastingBonus) {
			delete CurrentSpells[CurrentFeats.known[ArrayNmbr]];
			setSpellVars = true;
		};
		
		if (IsNotFeatMenu && theFeat.action) {
			var FeatAct = What("Unit System") === "metric" ? ConvertToMetric(theFeat.action[1], 0.5) : theFeat.action[1];
			RemoveAction(theFeat.action[0], theFeat.name + FeatAct);
		};
		
		tDoc.getField(FeatFlds[2]).setAction("Calculate", "");
		if (IsNotFeatMenu) tDoc.resetForm([FeatFlds[2]]);
		AddTooltip(FeatFlds[2], "");
	};
	
	CurrentFeats.known = [];
	CurrentFeats.known[ArrayNmbr] = NewFeat;
	FindFeats(ArrayNmbr);

	if (CurrentFeats.known[ArrayNmbr]) {
		var theFeat = FeatsList[NewFeat];
		thermoM("Applying the feat's features..."); //change the progress dialog text
		thermoM(1/3); //increment the progress dialog's progress

		if (IsNotFeatMenu && theFeat.description) {
			var theDesc = What("Unit System") === "imperial" ? theFeat.description : ConvertToMetric(theFeat.description, 0.5);
			if (typePF) theDesc.replace("\n", " ");
			Value(FeatFlds[2], theDesc);
		} else if (theFeat.calculate) {
			var theCalc = What("Unit System") === "imperial" ? theFeat.calculate : ConvertToMetric(theFeat.calculate, 0.5);
			if (typePF) theCalc.replace("\n", " ");
			tDoc.getField(FeatFlds[2]).setAction("Calculate", theCalc);
		}
		
		thermoM(2/3); //increment the progress dialog's progress
		
		if (theFeat.source && SourceList[theFeat.source[0]]) {
			tempString = "The " + theFeat.name + " feat is taken from the " + SourceList[theFeat.source[0]].name + (theFeat.source[1] ? ", page " + theFeat.source[1] : "");
			var sourceString = "(" + SourceList[theFeat.source[0]].abbreviation + (theFeat.source[1] ? ", page " + theFeat.source[1] : "") + ")";
			if (IsNotFeatMenu) {
				AddString(FeatFlds[1], sourceString, "; ");
			}
		}
		if (theFeat.prerequisite) {
			tempString += tempString === "" ? "" : "\n\n";
			tempString += "Prerequisite for the " + theFeat.name + " feat is: " + theFeat.prerequisite;
		}
		AddTooltip(FeatFlds[2], tempString);
		if (IsNotFeatMenu && theFeat.eval) {
			var TheEval = What("Unit System") === "metric" && theFeat.eval.indexOf("String") !== -1 ? ConvertToMetric(theFeat.eval, 0.5) : theFeat.eval;
			eval(TheEval);
		}
		if (IsNotFeatMenu && theFeat.calcChanges) {
			addEvals(theFeat.calcChanges, [theFeat.name, "feat"], true);
		};
		
		if (IsNotFeatMenu && theFeat.scores) {
			//get the ability score arrays from the fields, add the feat bonuses, and put them back in the field
			for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
				var tempArray = What(AbilityScores.abbreviations[i] + " Remember").split(",");
				tempArray[5] = (tempArray[5] ? Number(tempArray[5]) : 0) + theFeat.scores[i];
				Value(AbilityScores.abbreviations[i] + " Remember", tempArray);
			};
		};
		
		if (IsNotFeatMenu && theFeat.spellcastingBonus) {
			var spFeatArr = isArray(theFeat.spellcastingBonus);
			var spFeatLvl = false;
			var spAbility = 6;
			(!spFeatArr ? [theFeat.spellcastingBonus] : theFeat.spellcastingBonus).forEach(function(spB) {
				if (!spFeatLvl && spB.times && isArray(spB.times)) spFeatLvl = true;
				if (spB.spellcastingAbility) spAbility = spB.spellcastingAbility;
			});
			CurrentSpells[NewFeat] = {
				name : theFeat.name + " (feat)",
				level : spFeatLvl ? What("Character Level") : undefined,
				ability : spAbility,
				typeSp : "feat",
				bonus : {
					"someFeat" : theFeat.spellcastingBonus
				}
			};
			setSpellVars = true;
		};
		
		if (IsNotFeatMenu && theFeat.action) {
			var FeatAct = What("Unit System") === "metric" ? ConvertToMetric(theFeat.action[1], 0.5) : theFeat.action[1];
			AddAction(theFeat.action[0], theFeat.name + FeatAct, "the " + theFeat.name + " feat");
		};
	}
	if (setSpellVars) SetStringifieds("spells"); //set the global variables to their fields for future reference
	thermoM("Finalizing the changes of the feat..."); //change the progress dialog text
	ApplyProficiencies(true); //call to update armor, shield and weapon proficiencies
	UpdateTooltips(); //skills tooltip, ability score tooltip
	thermoM("stop"); //stop the top progress dialog
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
};

function SetFeatsdropdown() {
	tDoc.delay = true;
	tDoc.calculate = false;
	var ArrayDing = [""];
	for (var key in FeatsList) {
		if (testSource(key, FeatsList[key], "featsExcl")) continue;
		var feaNm = FeatsList[key].name;
		if (ArrayDing.indexOf(feaNm) === -1) ArrayDing.push(feaNm);
	}
	ArrayDing.sort();
	
	if (tDoc.getField("Feat Name 1").submitName === ArrayDing.toSource()) return; //no changes, so no reason to do this
	tDoc.getField("Feat Name 1").submitName = ArrayDing.toSource();
	
	for (var i = 1; i <= FieldNumbers.feats; i++) {
		var theFeatFld = "Feat Name " + i;
		var theFeati = What(theFeatFld);
		tDoc.getField(theFeatFld).setItems(ArrayDing);
		Value(theFeatFld, theFeati, "Type in the name of the feat (or select it from the drop-down menu) and its text and features will be filled out automatically, provided it is a recognized feat. Ability scores will not be altered other than their tool tips (mouseover texts).\n\nUpon changing to another feat, all features of the previous feat will be undone.");
	}
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
}

//change both speeds with a certain amount in feet (it will automatically convert to meters if needed)
function ChangeSpeed(Input, Halve) {
	if (!Input) {
		return;
	}
	var StandardUnits = What("Unit System") === "imperial";
	if (isArray(Input)) {
		if (StandardUnits) {
			var amount = [parseFloat(Input[0]), parseFloat(Input[1])];
		} else {
			var amount = [RoundTo(parseFloat(Input[0]) * 0.3, 0.5), RoundTo(parseFloat(Input[1]) * 0.3, 0.5)];
		}
	} else {
		Input = StandardUnits ? parseFloat(Input) : RoundTo(parseFloat(Input) * 0.3, 0.5);
		var amount = [Input, Input];
	}
	
	//put the speed in the remember field back in its place before doing anything with it
	setSpeedToNull = false;
	if (What("Speed Remember") !== "") {
		var setSpeedToNull = true;
		var SpdRem = What("Speed Remember").split("!#TheListSeparator#!");
		Value("Speed", SpdRem[0]);
		Value("Speed encumbered", SpdRem[1]);
	}
	
	for (var n = 0; n <= 1; n++) {
		var Field = n === 0 ? "Speed" : "Speed encumbered";
		var Spd = What(Field);
		var unit = isNaN(Spd) ? "" : StandardUnits ? " ft" : " m";
		var measurements = "";
		if (measurements = Spd.match(/-?\d+(,|\.)?\d*/g)) {
			var theResult = Spd;
			for (var i = 0; i < measurements.length; i++) {
				var org = parseFloat(measurements[i].replace(/,/g, "."));
				var oldAmount = Halve ? Number(org) / 2 : Number(org);
				var newSpd = oldAmount + amount[n];
				newSpd = What("Decimal Separator") === "dot" ? newSpd : ("." + newSpd).replace(/\./g, ",").substring(1);
				newSpd += unit;
				theResult = theResult.replace(measurements[i], newSpd);
			}
		} else {
			var theResult = What("Decimal Separator") === "dot" ? amount[n] : ("." + amount[n]).replace(/\./g, ",").substring(1);
			theResult += unit;
		}
		//remove zero values
		theResult = theResult.replace(/\r?\b\-?0 (ft|m)( swim| fly)?\r?/ig, "");
		Value(Field, theResult);
	}
	
	if (setSpeedToNull) {
		Value("Speed Remember", What("Speed") + "!#TheListSeparator#!" + What("Speed encumbered"));
		var theZero = StandardUnits ? "0 ft" : "0 m";
		Value("Speed", theZero);
		Value("Speed encumbered", theZero);
	}
}

function ResetFeaSR() {
	tDoc.delay = true;
	tDoc.calculate = false;
	for (var z = 1; z <= FieldNumbers.limfea; z++) {
		var recoveryFld = What("Limited Feature Recovery " + z).toLowerCase();
		if (recoveryFld.indexOf("short rest") !== -1 || recoveryFld.indexOf("sr") !== -1) {
			resetForm(["Limited Feature Used " + z]);
		}
	}
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
}

function ResetFeaLR() {
	tDoc.delay = true;
	tDoc.calculate = false;
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
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
}

function ResetFeaDawn() {
	tDoc.delay = true;
	tDoc.calculate = false;
	for (var z = 1; z <= FieldNumbers.limfea; z++) {
		var recoveryFld = What("Limited Feature Recovery " + z).toLowerCase();
		if (recoveryFld.indexOf("dawn") !== -1 || recoveryFld.indexOf("day") !== -1) {
			resetForm(["Limited Feature Used " + z]);
		}
	}
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
}

function HealItNow() {
	tDoc.delay = true;
	tDoc.calculate = false;
	var QI = !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var prefix = QI ? "" : event.target.name.substring(0, event.target.name.indexOf("Comp."));
	
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
		var HDtotal = HD1 + HD2 + HD3;
		var toHeal = Math.max(1, Math.floor(HDtotal / 2));

		if (HD1 - toHeal === 0) {
			Value("HD1 Used", "");
		} else if (HD1 - toHeal > 0) {
			Value("HD1 Used", HD1 - toHeal);
		} else {
			Value("HD1 Used", "");
			toHeal -= HD1;
			if (HD2 - toHeal === 0) {
				Value("HD2 Used", "");
			} else if (HD2 - toHeal > 0) {
				Value("HD2 Used", HD2 - toHeal);
			} else {
				Value("HD2 Used", "");
				toHeal -= HD2;
				if (HD3 - toHeal === 0) {
					Value("HD3 Used", "");
				} else if (HD3 - toHeal > 0) {
					Value("HD3 Used", HD2 - toHeal);
				} else {
					Value("HD3 Used", "");
					toHeal -= HD2;
				}
			}
		}
	} else {
		var toHeal = Math.max(1, Math.floor(What(prefix + "Comp.Use.HD.Level") / 2));
		var HD1 = Number(What(prefix + "Comp.Use.HD.Used"));

		if (HD1 - toHeal <= 0) {
			Value(prefix + "Comp.Use.HD.Used", "");
		} else if (HD1 - toHeal > 0) {
			Value(prefix + "Comp.Use.HD.Used", HD1 - toHeal);
		}
	}
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
}

function AddExperiencePoints() {	
	if (What("Add Experience")) {
		var XPS = Number(What("Total Experience").replace(/,/g, "."));
		var AddXP = Number(What("Add Experience").replace(/,/g, "."));
		Value("Total Experience", RoundTo(XPS + AddXP, 0.01));
		Value("Add Experience", "");
	};
	CalcExperienceLevel(true);
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

function ParseClassFeature(theClass, theFeature, FeaLvl, ForceOld, SubChoice) {
	var FeaKey = ForceOld ? ClassList[theClass].features[theFeature] : CurrentClasses[theClass].features[theFeature];
	if (!FeaKey) return "";
	var FeaClass = !ForceOld && theFeature.indexOf("subclassfeature") !== -1 && CurrentClasses[theClass].subname ? CurrentClasses[theClass].subname : CurrentClasses[theClass].name;
	var FeaName = SubChoice ? FeaKey[SubChoice].name : FeaKey.name;
	var theReturn = ""
	if (FeaName) {
		var Fea = ReturnClassFeatures(theClass, theFeature, FeaLvl, SubChoice, "", "", ForceOld);
		
		var FeaSource = Fea.Source && SourceList[Fea.Source[0]] ? ", " + SourceList[Fea.Source[0]].abbreviation + (Fea.Source[1] ? " " + Fea.Source[1] : "") : "";
		var FeaRef = " (" + FeaClass + " " + FeaKey.minlevel + FeaSource + ")";
		if (Fea.Use && !isNaN(Fea.Use)) Fea.Use += "\u00D7 per ";
		var FeaPost = "";
		if (Fea.Add && Fea.Use) {
			FeaPost = " [" + Fea.Add + ", " + Fea.Use + Fea.Recov + "]";
		} else if (Fea.Add) {
			FeaPost = " [" + Fea.Add + "]";
		} else if (Fea.Use) {
			FeaPost = " [" + Fea.Use + Fea.Recov + "]";
		}
		var FeaDesc = SubChoice && FeaKey[SubChoice].description ? FeaKey[SubChoice].description : (FeaKey.description ? FeaKey.description : "");
		theReturn = "\n\u25C6 " + FeaName + FeaRef + FeaPost + FeaDesc;
	}
	var theFinalReturn = theReturn !== "" && What("Unit System") === "metric" ? ConvertToMetric(theReturn, 0.5) : theReturn;
	return theFinalReturn;
};

function ParseClassFeatureExtra(theClass, theFeature, extraChoice, Fea, ForceOld) {
	var FeaKey = CurrentClasses[theClass] ? CurrentClasses[theClass].features[theFeature][extraChoice.toLowerCase()] : false;
	var old = ForceOld ? "Old" : "";
	if (!FeaKey) return "";
	var FeaExtraName = CurrentClasses[theClass].features[theFeature].extraname;
	var FeaSource = Fea.Source && SourceList[Fea.Source[0]] ? ", " + SourceList[Fea.Source[0]].abbreviation + (Fea.Source[1] ? " " + Fea.Source[1] : "") : "";
	var FeaRef = " (" + FeaExtraName + FeaSource + ")";
	var FeaUse = !Fea["Use" + old] ? "" : Fea["Use" + old] + (!isNaN(Fea["Use" + old]) ? "\u00D7 per " : "");
	var FeaPost = "";
	if (Fea["Add" + old] && FeaUse) {
		FeaPost = " [" + Fea["Add" + old] + ", " + FeaUse + Fea["Recov" + old] + "]";
	} else if (Fea["Add" + old]) {
		FeaPost = " [" + Fea["Add" + old] + "]";
	} else if (FeaUse) {
		FeaPost = " [" + FeaUse + Fea["Recov" + old] + "]";
	};
	var theReturn = "\u25C6 " + FeaKey.name + FeaRef + FeaPost + FeaKey.description;
	var theFinalReturn = theReturn !== "" && What("Unit System") === "metric" ? ConvertToMetric(theReturn, 0.5) : theReturn;
	return theFinalReturn;
};

//change all the level-variables gained from classes and races
function UpdateLevelFeatures(Typeswitch, raceLvl) {
	if (!IsNotReset) return; //stop this function on a reset
	
	thermoM("start"); //start a progress dialog
	thermoM("Updating level-dependent features..."); //change the progress 
	
	var tempThing = "";
	Typeswitch = Typeswitch === undefined ? "all" : Typeswitch;
	var isWildShape = false;

	var oldRaceLvl = Number(CurrentRace.level);
	var newRaceLvl = raceLvl !== undefined ? raceLvl : What("Character Level");

	//check if race level went up (RaceLevelUp[0] = true) down (RaceLevelUp[0] = false), or nothing has changed (RaceLevelUp[0] = "stop"); RaceLevelUp[1] = lowest lvl, RaceLevelUp[2] = highest lvl
	var RaceLevelUp = [true, oldRaceLvl, newRaceLvl];
	if (oldRaceLvl > newRaceLvl) {
		RaceLevelUp = [false, newRaceLvl, oldRaceLvl];
	} else if (newRaceLvl === oldRaceLvl) {
		RaceLevelUp = ["stop", 0, 0];
	}

	//update racial level-dependent features
	if ((Typeswitch === "all" || Typeswitch === "race") && RaceLevelUp[0] !== "stop" && CurrentRace.known) {
		delete UpdateSpellSheets.race;
		if (CurrentRace.features) {
			for (var key in CurrentRace.features) {
				// now we know whether to add or remove features
				var keyFea = CurrentRace.features[key];
				thermoM("Updating " + CurrentRace.name + "'s " + keyFea.name + "..."); //change the progress dialog text
				
				//make a check to see if level-dependent features should be dealt with
				var checkLVL = keyFea.minlevel <= RaceLevelUp[2] && keyFea.minlevel > RaceLevelUp[1];
				
				//see if we are going to add or remove a feature
				var AddRemove = keyFea.minlevel <= newRaceLvl ? "Add" : "Remove"

				// --- add or remove Limited Features --- //
				
				// get all the attributes of this feature
				var Fea = ReturnClassFeatures("race", key, newRaceLvl, false, oldRaceLvl, false);
				
				//see if we need to force updating the limited feature section
				var GoAnyway = newRaceLvl > 0 && keyFea.minlevel <= oldRaceLvl && (Fea.Add !== Fea.AddOld || Fea.Use !== Fea.UseOld || Fea.UseCalc !== Fea.UseCalcOld || Fea.Recov !== Fea.RecovOld);

				if ((Fea.Use || Fea.UseCalc) && (GoAnyway || checkLVL)) {
					var FeaTooltip = CurrentRace.name + keyFea.tooltip;
					var AddRemoveFea = AddRemove === "Add" && Fea.Use && !(/unlimited|\u221E/i).test(Fea.Use) ? "Add" : "Remove";
					tDoc[AddRemoveFea + "Feature"](keyFea.name, AddRemoveFea === "Add" ? Fea.Use : Fea.UseOld, Fea.Add ? " (" + Fea.Add + ")" : "", Fea.Recov, FeaTooltip, Fea.UseOld, Fea.UseCalc);
				};
				
				thermoM(1/2); //increment the progress dialog's progress

				// --- add or remove action, if defined --- //
				if (keyFea.action && checkLVL) {
					tDoc[AddRemove + "Action"](keyFea.action[0], keyFea.name + keyFea.action[1], "being a " + CurrentRace.name);
				}

				// --- add or remove something via custom script, if defined --- //
				if (AddRemove === "Add" && keyFea.eval && checkLVL) {
					eval(keyFea.eval);
				} else if (AddRemove === "Remove" && keyFea.removeeval && checkLVL) {
					eval(keyFea.removeeval);
				}

				// --- add or remove bonus spells in the CurrentSpells variable, if defined --- //
				var raceSpellBonus = !checkLVL ? false : (keyFea.spellcastingBonus ? keyFea.spellcastingBonus : false);
				if (raceSpellBonus && keyFea.minlevel <= newRaceLvl) {//if gaining the level
					//first see if the entry exists or not, and create it if it doesn't
					if (!CurrentSpells[CurrentRace.known]) {
						CurrentSpells[CurrentRace.known] = {
							name : CurrentRace.name,
							level : newRaceLvl,
							ability : CurrentRace.spellcastingAbility,
							typeSp : "race",
							bonus : {}
						};
					}
					CurrentSpells[CurrentRace.known].bonus[key] = raceSpellBonus;
					UpdateSpellSheets.race = true;
				} else if (raceSpellBonus && CurrentSpells[CurrentRace.known] && CurrentSpells[CurrentRace.known].bonus[key]) {//if losing the level and the thing is defined
					delete CurrentSpells[CurrentRace.known].bonus[key];
					if (!CurrentRace.spellcastingBonus) { //the race has no level 1 spell ability, so maybe delete more than just this bonus entry
						var bonusTest = true;
						for (var tester in CurrentSpells[CurrentRace.known].bonus) {
							bonusTest = false;
						}
						if (bonusTest) { //no additional bonus entries were found, so delete the entire CurrentSpells entry
							delete CurrentSpells[CurrentRace.known];
						}
					}
					UpdateSpellSheets.race = true;
				}
				
				// --- add or remove custom calculations to the CurrentEvals variable --- //
				if (checkLVL && keyFea.calcChanges) {
					addEvals(keyFea.calcChanges, [keyFea.name, CurrentRace.name], keyFea.minlevel <= newRaceLvl);
				}
			}
		}
		//update the racial level
		CurrentRace.level = newRaceLvl;
		if (CurrentSpells[CurrentRace.known]) {
			CurrentSpells[CurrentRace.known].level = newRaceLvl;
		}
	}

	var oldClassLvl = {};
	var newClassLvl = {};
	var ClassLevelUp = {};
	//define level change per class
	for (var aClass in classes.known) {
		oldClassLvl[aClass] = classes.old[aClass] ? classes.old[aClass].classlevel : 0;
		newClassLvl[aClass] = classes.known[aClass].level;
		//check if class level went up (ClassLevelUp[aClass][0] = true) down (ClassLevelUp[aClass][0] = false), or nothing has changed (ClassLevelUp[aClass][0] = "stop"); ClassLevelUp[aClass][1] = lowest lvl, ClassLevelUp[aClass][2] = highest lvl
		ClassLevelUp[aClass] = [true, oldClassLvl[aClass], newClassLvl[aClass]];
		if (oldClassLvl[aClass] > newClassLvl[aClass]) {
			ClassLevelUp[aClass] = [false, newClassLvl[aClass], oldClassLvl[aClass]];
		} else if (newClassLvl[aClass] === oldClassLvl[aClass] && classes.old[aClass] && classes.known[aClass].subclass === classes.old[aClass].subclass) { //only stop if the old and new levels are the same and the subclass hasn't changed
			ClassLevelUp[aClass] = ["stop", newClassLvl[aClass], newClassLvl[aClass]];
		}
	}
	
	//make a list of the current wild shapes entered
	var WSinUse = false;
	var prefixA = What("Template.extras.WSfront").split(",");
	for (var p = 0; p < prefixA.length; p++) {
		for (var i = 1; i <= 4; i++) {
			var theFld = What(prefixA[p] + "Wildshape.Race." + i);
			if (!theFld || theFld.toLowerCase() === "make a selection") continue;
			var theShape = ParseCreature(theFld);
			if (theShape) {
				WSinUse = true;
				i = 5;
				p = prefixA.length;
			}
		}
	}
	
	var ClassFeaFld = tDoc.getField("Class Features");
	//add or remove proficiencies, features, and others gained from level-dependent class features
	if (Typeswitch === "all" || Typeswitch === "class" || Typeswitch === "proficiencies") {
		classes.extraskills = [];
		for (var aClass in classes.known) {
			var temp = CurrentClasses[aClass];
			var LastProp = "";
			thermoM("Updating " + temp.fullname + "'s features..."); //change the progress dialog text
			
			//add or update class header if not only updating proficiencies
			if (Typeswitch !== "proficiencies" && Typeswitch !== "stop") {
				var ClassHeaderString = "";

				//See if the class already exists and if the field is empty
				if (!(RegExp(temp.name.RegEscape())).test(ClassFeaFld.value) && ClassFeaFld.value) {
					ClassHeaderString += "\n\n";
				}

				//make the string for the classheader
				ClassHeaderString += temp.fullname + ", level " + newClassLvl[aClass] + ":";
				var oldHeaderString = classes.old[aClass] ? classes.known[aClass].subclass !== classes.old[aClass].subclass ? ClassList[aClass].name.RegEscape() + ".*:" : temp.fullname.RegEscape() + ".*:" : "";
				
				//apply the string for the classheader, if the class has a level other than 0
				if (newClassLvl[aClass] !== 0) {
					ReplaceString("Class Features", ClassHeaderString, false, oldHeaderString, true);
				}
			}
			for (var prop in temp.features) {
				var propFea = temp.features[prop];
				
				thermoM("Updating " + temp.fullname + "'s " + propFea.name + "..."); //change the progress dialog text
				thermoM(0); //increment the progress dialog's progress
				
				//find if there is a choice that has been made for this class feature
				var FeaChoice = GetClassFeatureChoice(aClass, prop);
				var FeaOldChoice = FeaChoice; // just here so the FeaChoice can be set by the eval property if needed
				
				if (propFea.minlevel <= newClassLvl[aClass]) {
					if (propFea.armor) {
						CurrentArmour.proficiencies[temp.fullname] = propFea.armor;
					}
					if (propFea.weapons) {
						CurrentWeapons.proficiencies[temp.fullname] = propFea.weapons;
					}
					if (propFea.skillstxt) {
						classes.extraskills.push(propFea.skillstxt);
					}
					if (FeaChoice && propFea[FeaChoice].skillstxt) {
						classes.extraskills.push(propFea[FeaChoice].skillstxt);
					}
				} else if (oldClassLvl[aClass] > newClassLvl[aClass] && propFea.minlevel > newClassLvl[aClass]) {
					if (propFea.armor && CurrentArmour.proficiencies[temp.fullname]) {
						delete CurrentArmour.proficiencies[temp.fullname];
					}
					if (propFea.weapons && CurrentWeapons.proficiencies[temp.fullname]) {
						delete CurrentWeapons.proficiencies[temp.fullname];
					}
				}
				
				thermoM(1/8); //increment the progress dialog's progress
					
				/* add features, and others, gained from level-dependent class features only if not calling for proficiencies */
				if (Typeswitch !== "proficiencies" && ClassLevelUp[aClass][0] !== "stop") {
					
					//if this is about a feature only available to a subclass, but no subclass is defined, ask to add a subclass
					var theSubClass = classes.known[aClass].subclass;
					if (prop.indexOf("subclassfeature") !== -1 && propFea.minlevel <= ClassLevelUp[aClass][2] && !theSubClass && IsNotReset) {
						thermoM("No subclass known, asking for subclass to add..."); //change the progress dialog text
						var stopNow = PleaseSubclass(aClass); //ask to add a subclass
						if (stopNow) {
							thermoM("stop");
							break; //this function is going to run again, so stop it now for this class
						}
					} else if (IsSubclassException[aClass] && (prop.indexOf("subclassfeature") !== -1 || (theSubClass && ClassSubList[theSubClass].features[prop]))) {
						delete IsSubclassException[aClass];
					} else if (IsSubclassException[aClass]) {
						var FeaNewString = ParseClassFeature(aClass, prop, newClassLvl[aClass], false, FeaChoice);
						LastProp = propFea.minlevel <= ClassLevelUp[aClass][2] ? FeaNewString : LastProp;
						continue; //an exception has been put in place for this class, so ignore all the entries before another subclassfeature, but do keep updating the LastProp variable
					}
					thermoM("Updating " + temp.fullname + "'s " + propFea.name + "..."); //change the progress dialog text
					
					//make a check to see if level-dependent features should be dealt with
					var CheckLVL = propFea.minlevel <= ClassLevelUp[aClass][2] && propFea.minlevel > ClassLevelUp[aClass][1];
					
					var ForceAll = false;
					var ForceSpecial = false;
					//if this is the first time adding in a subclass, its features must be forced. But only if the feature meets the level requirement both before and after the level change
					if (theSubClass && ClassSubList[theSubClass].features[prop] && classes.old[aClass] && theSubClass !== classes.old[aClass].subclass && ((prop.indexOf("subclassfeature") === -1 && CheckLVL) || (propFea.minlevel <= ClassLevelUp[aClass][2] && propFea.minlevel <= ClassLevelUp[aClass][1]))) {
						ForceAll = true;
						ForceSpecial = prop.indexOf("subclassfeature") === -1 && CheckLVL;
					};
					
					thermoM(2/8); //increment the progress dialog's progress

					//check for features that are not level-dependent
					var CheckFea = ForceAll || CheckLVL;
					
					// get all the attributes of this feature
					var Fea = ReturnClassFeatures(aClass, prop, newClassLvl[aClass], FeaChoice, oldClassLvl[aClass], FeaOldChoice);

					// --- add or remove something via custom script, if defined --- //
					var evalAddRemove = CheckFea && propFea.minlevel <= newClassLvl[aClass] ? "eval" : "removeeval";

					if (propFea[evalAddRemove] && CheckFea) {
						var thePropFeaeval = What("Unit System") === "metric" && propFea[evalAddRemove].indexOf("String") !== -1 ? ConvertToMetric(propFea[evalAddRemove], 0.5) : propFea[evalAddRemove];
						eval(thePropFeaeval);
					}
					if (CheckFea && FeaChoice && propFea[FeaChoice][evalAddRemove]) {
						var thePropFeaChoiceeval = What("Unit System") === "metric" && propFea[FeaChoice][evalAddRemove].indexOf("String") !== -1 ? ConvertToMetric(propFea[FeaChoice][evalAddRemove], 0.5) : propFea[FeaChoice][evalAddRemove];
						eval(thePropFeaChoiceeval);
					}
					
					// --- if the eval changed the choice, do some things with this new choice --- //
					if (FeaChoice !== FeaOldChoice) {
						Fea = ReturnClassFeatures(aClass, prop, newClassLvl[aClass], FeaChoice, oldClassLvl[aClass], FeaOldChoice);
						if (propFea[FeaChoice].skillstxt) classes.extraskills.push(propFea[FeaChoice].skillstxt);
					}
					
					// --- add or remove bonus spells in the CurrentSpells variable, if defined --- //
					var spellBonus = !CheckFea ? false : (propFea.spellcastingBonus ? propFea.spellcastingBonus : (FeaChoice && propFea[FeaChoice].spellcastingBonus ? propFea[FeaChoice].spellcastingBonus : false));
					if (spellBonus && propFea.minlevel <= newClassLvl[aClass]) {//if gaining the level
						//first see if the entry exists or not, and create it if it doesn't
						if (!CurrentSpells[aClass]) {
							CurrentSpells[aClass] = {
								name : temp.fullname,
								level : newClassLvl[aClass],
								ability : temp.abilitySave ? temp.abilitySave : 0,
								typeSp : "known",
								bonus : {}
							};
							if (propFea.spellFirstColTitle) {
								CurrentSpells[aClass].firstCol = propFea.spellFirstColTitle;
							}
						}
						CurrentSpells[aClass].bonus[prop] = spellBonus;
						UpdateSpellSheets.class = true;
					} else if (spellBonus && CurrentSpells[aClass].bonus[prop]) {//if losing the level and the thing is defined
						delete CurrentSpells[aClass].bonus[prop];
						if (!temp.spellcastingFactor) { //the class has no spellcasting other than these bonus things, so check if there is any left after deleting this one
							var bonusTest = true;
							for (var tester in CurrentSpells[aClass].bonus) {
								bonusTest = false;
							}
							if (bonusTest) { //no additional bonus entries were found, so delete the entire CurrentSpells entry
								delete CurrentSpells[aClass];
							}
						}
						UpdateSpellSheets.class = true;
					}
					
					// --- add or remove custom calculations to the CurrentEvals variable --- //
					if (CheckFea && propFea.calcChanges) {
						addEvals(propFea.calcChanges, [propFea.name, aClass], propFea.minlevel <= newClassLvl[aClass]);
					}
					if (CheckFea && FeaChoice && propFea[FeaChoice].calcChanges) {
						addEvals(propFea[FeaChoice].calcChanges, [propFea[FeaChoice].name, aClass], propFea.minlevel <= newClassLvl[aClass]);
					}
					
					// --- if a change was detected, do something via custom script, if defined --- //
					if (propFea.changeeval) {
						var theChangeeval = What("Unit System") === "metric" && propFea.changeeval.indexOf("String") !== -1 ? ConvertToMetric(propFea.changeeval, 0.5) : propFea.changeeval;
						eval(theChangeeval);
					}
					
					thermoM(3/8); //increment the progress dialog's progress

					// --- add or remove action, if defined --- //
					var ActionAddRemove = CheckFea && propFea.minlevel <= newClassLvl[aClass] ? "Add" : "Remove";
					if (propFea.action && CheckFea) {
						var thePropFeaAct = What("Unit System") === "metric" && propFea.action[1] ? ConvertToMetric(propFea.action[1], 0.5) : propFea.action[1];
						tDoc[ActionAddRemove + "Action"](propFea.action[0], propFea.name + thePropFeaAct, temp.fullname);
					}
					if (CheckFea && FeaChoice && propFea[FeaChoice].action) {
						var thePropFeaChoiceAct = What("Unit System") === "metric" ? ConvertToMetric(propFea[FeaChoice].action[1], 0.5) : propFea[FeaChoice].action[1];
						tDoc[ActionAddRemove + "Action"](propFea[FeaChoice].action[0], propFea[FeaChoice].name + thePropFeaChoiceAct, temp.fullname);
					}
					
					thermoM(4/8); //increment the progress dialog's progress

					// --- add or remove skill proficiencies, if defined --- //
					var SkillAddRemove = CheckFea && propFea.minlevel <= newClassLvl[aClass] ? true : false;
					if (propFea.skills && CheckFea) {
						for (var sk = 0; sk < propFea.skills.length; sk++) {
							AddSkillProf(propFea.skills[sk], SkillAddRemove);
						}
					}
					if (CheckFea && FeaChoice && propFea[FeaChoice].skills) {
						for (var sk = 0; sk < propFea[FeaChoice].skills.length; sk++) {
							AddSkillProf(propFea[FeaChoice].skills[sk], SkillAddRemove);
						}
					}

					// --- add or remove extra spells in the CurrentSpells variable, if defined --- //
					var spellExtra = !CheckFea ? false : (propFea.spellcastingExtra ? propFea.spellcastingExtra : (FeaChoice && propFea[FeaChoice].spellcastingExtra ? propFea[FeaChoice].spellcastingExtra : false));
					if (spellExtra && propFea.minlevel <= newClassLvl[aClass]) {//if gaining the level
						CurrentSpells[aClass].extra = spellExtra;
					} else if (spellExtra) {//if losing the level
						CurrentSpells[aClass].extra = "";
					}
					
					thermoM(5/8); //increment the progress dialog's progress

					// --- add or remove save text, if defined --- //
					if (propFea.save && CheckFea) {
						var thePropFeaSave = What("Unit System") === "imperial" ? propFea.save : ConvertToMetric(propFea.save, 0.5);
						tDoc[ActionAddRemove + "String"]("Saving Throw advantages \/ disadvantages", thePropFeaSave, "; ");
					}
					if (CheckFea && FeaChoice && propFea[FeaChoice].save) {
						var thePropFeaChoiceSave = What("Unit System") === "imperial" ? propFea[FeaChoice].save : ConvertToMetric(propFea[FeaChoice].save, 0.5);
						tDoc[ActionAddRemove + "String"]("Saving Throw advantages \/ disadvantages", thePropFeaChoiceSave, "; ");
					}
					
					thermoM(6/8); //increment the progress dialog's progress

					// --- add or remove Limited Features --- //
					
					//check if feature needs to be forcibly replaced because there is a change in any one of them
					GoAnyway = ForceAll || (newClassLvl[aClass] > 0 && propFea.minlevel <= oldClassLvl[aClass] && (Fea.Add !== Fea.AddOld || Fea.Use !== Fea.UseOld || Fea.UseCalc !== Fea.UseCalcOld || Fea.Recov !== Fea.RecovOld || Fea.UseName !== Fea.UseNameOld));
					
					//remove the limited feature if it should be removed because of downgrading the level --or-- the old feature was defined, but the new isn't --or-- if the old has a different name than the new --or-- if the new amount of usages is unlimited
					if (((Fea.UseOld || Fea.UseCalcOld) && propFea.minlevel > newClassLvl[aClass] && propFea.minlevel <= oldClassLvl[aClass]) || ((Fea.UseName !== Fea.UseNameOld || (!Fea.Use && !Fea.UseCalc) || (Fea.Recov !== Fea.RecovOld)) && (Fea.UseOld || Fea.UseCalcOld)) || (/unlimited|\u221E/i).test(Fea.Use)) {
						RemoveFeature(Fea.UseNameOld ? Fea.UseNameOld : Fea.UseName, newClassLvl[aClass] === 0 ? "" : Fea.UseOld, "", "", "", "", Fea.UseCalcOld);
						Fea.UseOld = 0;
					}
					// now add the limited feature depending on the changes of the level or changes of something else or if it is being forced, as long as the usages have been defined
					if ((Fea.UseCalc || Fea.Use) && !(/unlimited|\u221E/i).test(Fea.Use) && (GoAnyway || (propFea.minlevel <= newClassLvl[aClass] && propFea.minlevel > oldClassLvl[aClass]))) {
						AddFeature(Fea.UseName, Fea.Use, Fea.Add ? " (" + Fea.Add + ")" : "", Fea.Recov, temp.fullname, Fea.UseOld, Fea.UseCalc);
					}
					
					thermoM(7/8); //increment the progress dialog's progress

					//--- get the new and old string of the class features
					var FeaOldString = ParseClassFeature(aClass, prop, ForceSpecial ? newClassLvl[aClass] : oldClassLvl[aClass], ForceAll, FeaOldChoice);
					var FeaNewString = ParseClassFeature(aClass, prop, newClassLvl[aClass], false, FeaChoice);
					
					//make variables for the text in the class features field
					var SpliceReplaceRemove = GoAnyway && !ForceAll && propFea.minlevel <= newClassLvl[aClass] ? "Replace" : (propFea.minlevel <= newClassLvl[aClass] ? "Splice" : "Remove");

					if (ForceAll) { //if adding a feature for previous levels because of a sublevel change, first remove the old version
						RemoveString("Class Features", FeaOldString, false);
					}
					
					//add, remove, or update the text in the class features field
					if (GoAnyway || CheckLVL) {
						tDoc[SpliceReplaceRemove + "String"]("Class Features", SpliceReplaceRemove === "Remove" ? FeaOldString : FeaNewString, false, SpliceReplaceRemove === "Replace" ? FeaOldString : (LastProp !== "" ? LastProp.slice(-55) : ClassHeaderString));
						if (SpliceReplaceRemove === "Remove" && propFea.choices) {
							RemoveClassFeatureChoice(aClass, prop);
						}
					}
					if (prop.indexOf("wild shape") !== -1) {
						isWildShape = [newClassLvl[aClass], Fea.Use, Fea.Recov, Fea.Add];
						WSinUse = true;
					}
					
					//if the feature has extrachoices and old- or newlevel meets minlevel of the feature, go over them one by one to see if they changed with level
					if (propFea.extrachoices && propFea.minlevel <= ClassLevelUp[aClass][2]) {
						var addRemoveEC = propFea.minlevel > newClassLvl[aClass] && propFea.minlevel <= oldClassLvl[aClass] ? "remove" : propFea.minlevel < newClassLvl[aClass] ? "update" : false;
						if (addRemoveEC) {propFea.extrachoices.forEach( function(extraF) {
							extraF = extraF.toLowerCase();
							var feaExtra = propFea[extraF];
							var textFlds = [What("Extra.Notes"), What("Class Features")];
							var testTxt = feaExtra.name + " (" + propFea.extraname;
							if (!feaExtra || textFlds.join("").indexOf(testTxt) === -1 || (addRemoveEC === "Update" && !isArray(feaExtra.recovery) && !isArray(feaExtra.usages) && !isArray(feaExtra.additional))) return; //no need to do this feature
							if (addRemoveEC === "remove") { //remove the feature
								ClassFeatureOptions([aClass, prop, extraF, "extra"], addRemoveEC, oldClassLvl[aClass]);
							} else if (addRemoveEC === "update") {
								var ecFea = ReturnClassFeatures(aClass, prop, newClassLvl[aClass], extraF, oldClassLvl[aClass], extraF, false, true);
								var ecFeaNewString = ParseClassFeatureExtra(aClass, prop, extraF, ecFea, false);
								var ecFeaOldString = ParseClassFeatureExtra(aClass, prop, extraF, ecFea, true);
								if (ecFeaOldString !== ecFeaNewString) {
									ReplaceString(textFlds[0].indexOf(testTxt) !== -1 ? "Extra.Notes" : "Class Features", ecFeaNewString, false, ecFeaOldString);
									if ((ecFea.Use || ecFea.UseCalc) && !(/unlimited|\u221E/i).test(ecFea.Use)) {
										AddFeature(ecFea.UseName, ecFea.Use, ecFea.Add ? " (" + ecFea.Add + ")" : "", ecFea.Recov, CurrentClasses[aClass].fullname, ecFea.UseOld, ecFea.UseCalc);
									} else if ((/unlimited|\u221E/i).test(ecFea.Use) || (ecFea.UseOld || ecFea.UseCalcOld)) {
										RemoveFeature(ecFea.UseNameOld, ecFea.UseOld, "", "", "", "", ecFea.UseCalcOld);
									};
								};
							};
						}); };
					};
				}
				LastProp = propFea.minlevel <= ClassLevelUp[aClass][2] ? FeaNewString : LastProp;
			}
		}
		//now update the wild shapes on the seventh page, if appropriate
		if (WSinUse && Typeswitch !== "proficiencies") {
			WildshapeUpdate(isWildShape); //(re-)apply and re-calculate all the wild shapes as something might have changed after going level up
		}
	}
	thermoM("Finalizing updating level features..."); //change the progress dialog text
	thermoM("stop"); //stop the top progress dialog
};

//Make menu for 'choose class feature' button and parse it to Menus.classfeatures
var ignorePrereqs = false;
function MakeClassMenu() {
	var menuLVL1 = function (item, array, thereturn) {
		for (var i = 0; i < array.length; i++) {
			item.push({
				cName : array[i],
				cReturn : thereturn + "#" + array[i],
				bEnabled : array[i] !== "No class features detected that require a choice"
			});
		}
	};

	var menuLVL2 = function (menu, name, array) {
		menu.cName = name;
		menu.oSubMenu = [];
		for (var i = 0; i < array.length; i++) {
			menu.oSubMenu.push({
				cName : array[i],
				cReturn : name + "#" + array[i]
			})
		}
	};

	var menuLVL3 = function (menu, name, array, classNm, featureNm, extrareturn, feaObj) {
		var temp = [];
		for (var i = 0; i < array.length; i++) {
			var feaObjA = feaObj[array[i].toLowerCase()];
			if (!feaObjA) {
				console.println("The object corresponding to '" + array[i] + "' doesn't exist in the '" + featureNm + "' feature. This is a discrepency between the '" + extrareturn + "choices' array and the names of the objects. Note that the object name needs to be exactly '" +array[i].toLowerCase() + "' (identical but all lower case).");
				console.show();
				continue;
			};
			if (testSource("", feaObjA)) continue;
			var testWith = extrareturn === "extra" ? feaObjA.name + " (" + name : array[i].toLowerCase();
			var theTest = (extrareturn === "extra" ? toTestE : toTest).indexOf(testWith) !== -1;
			var removeStop = extrareturn === "extra" ? (theTest ? "remove" : false) : (theTest ? "stop" : false);
			var isEnabled = ignorePrereqs || theTest || !feaObjA.prereqeval ? true : eval(feaObjA.prereqeval);
			temp.push({
				cName : array[i],
				cReturn : classNm + "#" + featureNm + "#" + array[i] + "#" + extrareturn + "#" + removeStop,
				bMarked : theTest,
				bEnabled : isEnabled
			})
		}
		menu.oSubMenu.push({
			cName : name,
			oSubMenu : temp
		});
	};

	var ClassMenu = [], toTest = "";
	var toTestE = What("Extra.Notes") + What("Class Features");
	var hasEldritchBlast = isSpellUsed("eldritch blast").length || (/(eldritch|agonizing) (blast|spear)/i).test(CurrentWeapons.known);
	
	for (var aClass in classes.known) {
		var classname = aClass;
		var classlevel = classes.known[aClass].level;
		var Temps = CurrentClasses[classname];
		var tempItem = {
			cName : Temps.fullname,
			oSubMenu : []
		};
		for (var prop in Temps.features) {
			var propFea = Temps.features[prop];
			if (propFea.choices && !propFea.choicesNotInMenu && propFea.minlevel <= classlevel) {
				toTest = GetClassFeatureChoice(classname, prop);
				menuLVL3(tempItem, propFea.name, propFea.choices, classname, prop, "", propFea);
			}
			if (propFea.extrachoices && !propFea.choicesNotInMenu && propFea.minlevel <= classlevel) {
				menuLVL3(tempItem, propFea.extraname, propFea.extrachoices, classname, prop, "extra", propFea);
			}
		}
		if (tempItem.oSubMenu.length > 0) {
			ClassMenu.push(tempItem);
		}
	}
	if (ClassMenu.length === 0) {
		menuLVL1(ClassMenu, ["No class features detected that require a choice"], "nothing")
	}

	Menus.classfeatures = ClassMenu;
};

//call the Class Features menu and do something with the results
function ClassFeatureOptions(Input, inputRemove, useLVL) {
	tDoc.delay = true;
	tDoc.calculate = false;
	var MenuSelection = Input ? Input : getMenu("classfeatures");
	AddOrRemove = inputRemove ? inputRemove : (MenuSelection && MenuSelection[4] ? MenuSelection[4] : "");
	var tempArray = [];

	if (AddOrRemove !== "stop" && MenuSelection && MenuSelection[0] !== "nothing") {
		thermoM("start"); //start a progress dialog
		thermoM("Applying class feature menu selection..."); //change the progress 
		var theFea = CurrentClasses[MenuSelection[0]].features[MenuSelection[1]];
		var FeaOldChoice = MenuSelection[3] === "extra" ? "" : GetClassFeatureChoice(MenuSelection[0], MenuSelection[1]);

		var classlevel = inputRemove === "remove" && classes.old[MenuSelection[0]] ? classes.old[MenuSelection[0]].classlevel : classes.known[MenuSelection[0]].level;

		if (MenuSelection[3] === "extra") {
			//get a string for the feature
			var theFeaExtra = theFea[MenuSelection[2]];
			var Fea = ReturnClassFeatures(MenuSelection[0], MenuSelection[1], classlevel, MenuSelection[2], classlevel, MenuSelection[2], false, true);
			var FeaString = ParseClassFeatureExtra(MenuSelection[0], MenuSelection[1], MenuSelection[2], Fea, false);
			
			//if the feature is already present in the Extra.Notes, it must now be removed
			if (AddOrRemove === "remove") {
				thermoM("Removing the feature from the notes on page 3..."); //change the progress dialog text
				RemoveString("Extra.Notes", FeaString, true);
				RemoveString("Class Features", FeaString, true);
				
				//remove any entry in the Limited Feature section, if appropriate
				if (Fea.Use || Fea.UseCalc) RemoveFeature(Fea.UseName, Fea.Use, "", "", "", "", Fea.UseCalc);
			} else {
				thermoM("Adding the feature to the notes on page 3..."); //change the progress dialog text
				AddString("Extra.Notes", FeaString, true);
				
				//add an entry in the Limited Feature section, if appropriate
				if (Fea.Use || Fea.UseCalc) AddFeature(Fea.UseName, Fea.Use, Fea.Add ? " (" + Fea.Add + ")" : "", Fea.Recov, CurrentClasses[MenuSelection[0]].fullname, "bonus", Fea.UseCalc);

				//set the extra layers to visible 'notes' field on the left
				if (!typePF) {
					var LayersFld = What("Extra.Layers Remember").split(",");
					LayersFld[0] = "notes";
					Value("Extra.Layers Remember", LayersFld);
					LayerVisibilityOptions(false);
				}
				
				//give some information as to where the choice has been written to
				if (IsNotImport && What("Extra Class Feature Remember").indexOf(theFea.extraname) === -1) {
					var oCk = {
						bInitialValue : true,
						bAfterValue : false
					};
					app.alert({
						cMsg : "The " + theFea.extraname + " \"" + theFeaExtra.name + "\" has been added to the \"Notes\" section on the third page" + (!typePF ? ", while the \"Rules\" section on the third page has been hidden" : "") + ".\n\nAdding this to the \"Class Features\" on the second page would not leave enough room for other class features at level 20.\n\nYou can copy the text to the class features if you want" + (!typePF ? " (and even bring back the \"Rules\" section)" : "") + ". This will not interfere with any of the sheets automation, and will even allow you to remove the feature again with the same menu. However, future " + theFea.extraname + "s you add will still be added to the third page notes section.",
						nIcon : 3,
						cTitle : theFea.name + "has been added to the third page",
						oCheckbox : oCk
					});
					if (oCk.bAfterValue) {
						AddString("Extra Class Feature Remember", theFea.extraname);
					}
				}
			}
		} else if (MenuSelection[2] === FeaOldChoice) { // the selection is the same as it was, so don't do anything
			tDoc.calculate = IsNotReset;
			tDoc.delay = !IsNotReset;
			if (IsNotReset) tDoc.calculateNow();
			return;
		} else {
			thermoM("Changing the feature on page 2..."); //change the progress dialog text

			//if any, remove the old selection from the remember field
			if (FeaOldChoice) RemoveString("Class Features Remember", [MenuSelection[0], MenuSelection[1], FeaOldChoice].toString(), false);
			//add this selection to the remember field
			AddString("Class Features Remember", MenuSelection.slice(0, 3).toString(), false);

			//get the old string and the new string
			var FeaOldString = ParseClassFeature(MenuSelection[0], MenuSelection[1], classes.known[MenuSelection[0]].level, false, FeaOldChoice);
			var FeaNewString = ParseClassFeature(MenuSelection[0], MenuSelection[1], classes.known[MenuSelection[0]].level, false, MenuSelection[2]);

			//replace the old string with the new string
			ReplaceString("Class Features", FeaNewString, false, FeaOldString);
			
			//get the variables for making the limited feature section
			var Fea = ReturnClassFeatures(MenuSelection[0], MenuSelection[1], classlevel, MenuSelection[2], classlevel, FeaOldChoice);
			
			//continue if anything changed
			var DoLimFea = Fea.Add !== Fea.AddOld || Fea.Use !== Fea.UseOld || Fea.UseCalc !== Fea.UseCalcOld || Fea.Recov !== Fea.RecovOld || Fea.UseName !== Fea.UseNameOld;
			
			//if something changed and the old has a limited feature, remove it
			if (DoLimFea && (Fea.UseOld || Fea.UseCalcOld)) {
				RemoveFeature(Fea.UseNameOld, Fea.UseOld, "", "", "", "", Fea.UseCalcOld);
			}
			//if something changed and the new has a limited feature, add it
			if (DoLimFea && (Fea.Use || Fea.UseCalc) && !(/unlimited|\u221E/i).test(Fea.Use)) {
				AddFeature(Fea.UseName, Fea.Use, Fea.Add ? " (" + Fea.Add + ")" : "", Fea.Recov, CurrentClasses[MenuSelection[0]].fullname, 0, Fea.UseCalc);
			}
		}
		var theSubFea = theFea[MenuSelection[2]];
		var theOldSubFea = AddOrRemove === "remove" ? theSubFea : theFea[FeaOldChoice];
		
		thermoM(1/6); //increment the progress dialog's progress
		thermoM("Applying the effects of the feature change..."); //change the progress dialog text
		
		//add, if defined, skill text of the feature, and undo, if defined skill text of previous if changed
		var updateTheTxt = false;
		if (theSubFea.skillstxt && AddOrRemove !== "remove") {
			classes.extraskills.push(theSubFea.skillstxt);
			updateTheTxt = true;
		}
		if ((FeaOldChoice || AddOrRemove === "remove") && theOldSubFea.skillstxt) {
			var skillsIndex = classes.extraskills.indexOf(theOldSubFea.skillstxt);
			if (skillsIndex !== -1) {
				classes.extraskills.splice(skillsIndex, 1);
				updateTheTxt = true;
			}
		}
		if (updateTheTxt) {
			UpdateTooltips();
		}
		
		thermoM(2/6); //increment the progress dialog's progress
		
		//do any possible eval of the feature, and undo eval of previous if changed
		if ((FeaOldChoice || AddOrRemove === "remove") && theOldSubFea.removeeval) {
			var theRemoveeval = What("Unit System") === "metric" && theOldSubFea.removeeval.indexOf("String") !== -1 ? ConvertToMetric(theOldSubFea.removeeval, 0.5) : theOldSubFea.removeeval;
			eval(theRemoveeval);
		}
		if (theSubFea.eval && AddOrRemove !== "remove") {
			var theEval = What("Unit System") === "metric" && theSubFea.eval.indexOf("String") !== -1 ? ConvertToMetric(theSubFea.eval, 0.5) : theSubFea.eval;
			eval(theEval);
		}
		
		//add or remove custom calculations to the CurrentEvals variable, and undo any of a previous choice, if changed
		if ((FeaOldChoice || AddOrRemove === "remove") && theOldSubFea.calcChanges) {
			addEvals(theOldSubFea.calcChanges, [theOldSubFea.name, MenuSelection[0]], false);
		}
		if (theSubFea.calcChanges && AddOrRemove !== "remove") {
			addEvals(theSubFea.calcChanges, [theSubFea.name, MenuSelection[0]], true);
		}
		
		thermoM(3/6); //increment the progress dialog's progress

		//add, if defined, skill proficiencies of the feature, and undo, if defined skill proficiencies of previous if changed
		if ((FeaOldChoice || AddOrRemove === "remove") && theOldSubFea.skills) {
			for (var sk = 0; sk < theOldSubFea.skills.length; sk++) {
				AddSkillProf(theOldSubFea.skills[sk], false);
			}
		}
		if (theSubFea.skills && AddOrRemove !== "remove") {
			for (var sk = 0; sk < theSubFea.skills.length; sk++) {
				AddSkillProf(theSubFea.skills[sk], true);
			}
		}
		
		//add, if defined, spells of the feature, and undo, if defined spells of previous if changed
		if (!CurrentSpells[MenuSelection[0]] && AddOrRemove !== "remove" && (theSubFea.spellcastingExtra || theSubFea.spellcastingBonus)) { //first see if the entry exists or not, and create it if it doesn't
			CurrentSpells[MenuSelection[0]] = {
				name : CurrentClasses[MenuSelection[0]].fullname,
				level : classes.known[MenuSelection[0]].level,
				ability : CurrentClasses[MenuSelection[0]].abilitySave ? CurrentClasses[MenuSelection[0]].abilitySave : 0,
				typeSp : "known",
				bonus : {}
			};
		}
		var cSpells = CurrentSpells[MenuSelection[0]];
		if ((FeaOldChoice || AddOrRemove === "remove") && theOldSubFea.spellcastingExtra) {
			cSpells.extra = "";
		}
		if (theSubFea.spellcastingExtra && AddOrRemove !== "remove") {
			cSpells.extra = theSubFea.spellcastingExtra;
		}
		
		//add, if defined, bonus spells of the feature, and undo, if defined bonus spells of previous if changed
		var checkSpellObj = false;
		if (FeaOldChoice && theOldSubFea.spellcastingBonus) {
			delete cSpells.bonus[FeaOldChoice];
			checkSpellObj = true;
		} else if (AddOrRemove === "remove" && theOldSubFea.spellcastingBonus) {
			delete cSpells.bonus[MenuSelection[2]];
			checkSpellObj = true;
		}
		if (theSubFea.spellcastingBonus && AddOrRemove !== "remove") {
			cSpells.bonus[MenuSelection[2]] = theSubFea.spellcastingBonus;
			if (theSubFea.spellFirstColTitle) {
				cSpells.firstCol = theSubFea.spellFirstColTitle;
			}
		}
		
		if (checkSpellObj && !CurrentClasses[MenuSelection[0]].spellcastingFactor) { //if some things were deleted from an otherwise empty object, check it and delete it
			var bonusTest = true;
			for (var tester in CurrentSpells[MenuSelection[0]].bonus) {
				bonusTest = false;
			}
			if (bonusTest) { //no additional bonus entries were found, so delete the entire CurrentSpells entry of this class
				delete CurrentSpells[MenuSelection[0]];
			}
		}
		
		thermoM(4/6); //increment the progress dialog's progress

		//add, if defined, action of the feature, and undo, if defined action of previous if changed
		if ((FeaOldChoice || AddOrRemove === "remove") && theOldSubFea.action) {
			RemoveAction(theOldSubFea.action[0], theOldSubFea.name + theOldSubFea.action[1]);
		}
		if (theSubFea.action && AddOrRemove !== "remove") {
			AddAction(isArray(theSubFea.action) ? theSubFea.action[0] : theSubFea.action, theSubFea.name + (isArray(theSubFea.action) && theSubFea.action[1] ? theSubFea.action[1] : ""), CurrentClasses[MenuSelection[0]].fullname);
		}
		
		thermoM(5/6); //increment the progress dialog's progress

		//add, if defined, save of the feature, and undo, if defined save of previous if changed
		if ((FeaOldChoice || AddOrRemove === "remove") && theOldSubFea.save) {
			var theOldSave = What("Unit System") === "imperial" ? theOldSubFea.save : ConvertToMetric(theOldSubFea.save, 0.5);
			RemoveString("Saving Throw advantages / disadvantages", theOldSave);
		}
		if (theSubFea.save && AddOrRemove !== "remove") {
			var theSave = What("Unit System") === "imperial" ? theSubFea.save : ConvertToMetric(theSubFea.save, 0.5);
			AddString("Saving Throw advantages / disadvantages", theSave, "; ");
		}
		
		thermoM("stop"); //stop the top progress dialog
		SetStringifieds(); //set the global variables to their fields for future reference
		if (!Input && forceReCalcWeapons) ReCalcWeapons();
	}
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

//add a miscellaneous AC bonus. Filling in a 0 for ACbonus will remove the ability
//submitNm is a string that can be run as eval in an if statement. If this returns True, the armor bonus is not added to the total
function AddACMisc(ACbonus, Name, Tooltip, submitNm) {
	ACMiscFlds = [["AC Misc Mod 1", "AC Misc Mod 1 Description"], ["AC Misc Mod 2", "AC Misc Mod 2 Description"]];
	for (var i = 0; i < ACMiscFlds.length; i++) {
		var Mod = tDoc.getField(ACMiscFlds[i][0]);
		var Desc = tDoc.getField(ACMiscFlds[i][1]);
		if (ACbonus !== 0) { //if adding something
			if (Desc.userName === Tooltip || Desc.value === Name) {
				i = 2
			} else if (!Mod.value) {
				Mod.value = ACbonus;
				Desc.value = Name;
				Desc.userName = Tooltip;
				Desc.submitName = submitNm ? submitNm : "";
				i = 2
			}
		} else { //if removing something
			if (Desc.value.toLowerCase() === Name.toLowerCase() || Desc.userName === Tooltip) {
				Mod.value = "";
				Desc.value = "";
				Desc.userName = "";
				Desc.submitName = "";
				i = 2
			}
		}
	}
}

//the print feature button
function PrintButton() {
	tDoc.delay = true;
	tDoc.calculate = false;
	
	var thePageOptions = [
		"CSfront",
		"CSback",
		"ASfront",
		"ASoverflow",
		"ASbackgr",
		"AScomp",
		"ASnotes",
		"WSfront",
		"SSmore",
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
		var theTempP = tDoc.getField(BookMarkList[thePageOptions[x]]).page;
		SetPrintPages_Dialog["a" + thePageOptions[x]] = thePageOptions[x] !== "SSmore" ? theTempP !== -1 : What("Template.extras.SSfront") !== "";
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
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
}

//call the print dialog
function PrintTheSheet() {
	var PrintFld = What("Print Remember").split("!#TheListSeparator#!");
	var PageArray = PrintFld[1] !== "0" ? PrintFld[1].split(",") : null;
	if (PageArray) {
		var PagesToPrint = [];
		for (var P = 1; P < PageArray.length; P++) {
			//in the case of the three extendable types, also go add all the extra sheets
			if (PageArray[P] === "SSmore") {
				var prefixArray = What("Template.extras.SSfront").split(",");
				if (prefixArray[1]) prefixArray = prefixArray.slice(1).concat(What("Template.extras.SSmore").split(",").slice(1));
			} else if (PageArray[P] === "AScomp" || PageArray[P] === "ASnotes" || PageArray[P] === "WSfront" || PageArray[P] === "ALlog") {
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

//make sure the right fields are shown
function CorrectWronglyVisible() {
	var Toggle = What("League Remember");
	var VisibleHidden = Toggle === "Off" ? "Show" : "Hide";
	var HiddenVisible = Toggle === "Off" ? "Hide" : "Show";
	tDoc[VisibleHidden]("Class and Levels.0");
	tDoc[HiddenVisible]("Class and Levels.1");
	tDoc[VisibleHidden]("Background_Organisation.0");
	tDoc[HiddenVisible]("Background_Organisation.1");
	
}

//Hide (true) or show (false) all the different form fields in the entire sheet
function HideShowEverything(toggle) {	
	var exceptionList = [
		"Spell save DC Whiteout",
		"SheetInformation",
		"SpellSheetInformation",
		"CopyrightInformation",
		"DCI.Title",
		"Background_Faction.Title",
		"Background_FactionRank.Title",
		"Background_Renown.Title",
		"Attuned Magic Items Whiteout",
		"Attuned Magic Items Title",
		"Weight Encumbered Text",
		"Weight Heavily Encumbered Text",
		"Weight Push/Drag/Lift Text",
		"Adventuring Gear Location.Title",
		"Adventuring Gear Location.Line",
		"Extra.Gear Location.Title",
		"Extra.Gear Location.Line",
		"Medium Armor Max Mod"
	]
	if (toggle) {
		//first undo the visibility of the blue-text fields, if visible
		if (What("BlueTextRemember") === "Yes") ToggleBlueText("Yes");
		
		var tempArray = [];
		for (var F = 0; F < tDoc.numFields; F++) {
			var Fname = tDoc.getNthFieldName(F);
			var Ffield = tDoc.getField(Fname);
			if (exceptionList.indexOf(Fname) === -1 && Fname.indexOf("Whiteout.") === -1 && Fname.indexOf("Display.") === -1 && Fname.indexOf("Image.") === -1 && Fname.indexOf("Text.") === -1 && Fname.indexOf("Line.") === -1 && Fname.indexOf("AmmoLeft.Icon") === -1 && Fname.indexOf("AmmoRight.Icon") === -1 && Fname.indexOf("Comp.Type") === -1 && Fname.indexOf("Circle") === -1 && Fname.indexOf("spellshead.Box") === -1) {
				tempArray.push([Fname, Ffield.display]);
				Hide(Fname);
			}
		}
		FieldsRemember = tempArray;
	} else if (!toggle) {
		for (var H = 0; H < FieldsRemember.length; H++) {
			tDoc.getField(FieldsRemember[H][0]).display = FieldsRemember[H][1];
		}
		FieldsRemember = [];
		CorrectWronglyVisible();
	}
}

//calculate the AC (field calculation)
function CalcAC() {
	var ACbase = What("AC Armor Bonus");
	var ACshield = What("AC Shield Bonus");
	var ACdex = What("AC Dexterity Modifier");

	var ACmagic = EvalBonus(What("AC Magic"), true);
	
	var ACmisc1 = EvalBonus(What("AC Misc Mod 1"), true);
	var ACmisc1Desc = tDoc.getField("AC Misc Mod 1 Description");
	if (ACmisc1 && ACmisc1Desc.submitName && eval(ACmisc1Desc.submitName)) ACmisc1 = 0;
	
	var ACmisc2 = EvalBonus(What("AC Misc Mod 2"), true);
	var ACmisc2Desc = tDoc.getField("AC Misc Mod 2 Description");
	if (ACmisc2 && ACmisc2Desc.submitName && eval(ACmisc2Desc.submitName)) ACmisc2 = 0;
	
	if (ACbase === "") {
		event.value = "";
	} else {
		event.value = Number(ACbase) + Number(ACshield) + Number(ACdex) + Number(ACmagic) + Number(ACmisc1) + Number(ACmisc2);
	}
}

function SetToManual_Button() {
	tDoc.delay = true;
	tDoc.calculate = false;

	var AttackFld = What("Manual Attack Remember") === "Yes";
	var BackgroundFld = What("Manual Background Remember") === "Yes";
	var ClassFld = What("Manual Class Remember") === "Yes";
	var FeatFld = What("Manual Feat Remember") === "Yes";
	var RaceFld = What("Manual Race Remember") === "Yes";

	//set the checkboxes in the dialog to starting position
	SetToManual_Dialog.mAtt = AttackFld;
	SetToManual_Dialog.mBac = BackgroundFld;
	SetToManual_Dialog.mCla = ClassFld;
	SetToManual_Dialog.mFea = FeatFld;
	SetToManual_Dialog.mRac = RaceFld;

	//call the dialog
	var theDialog = app.execDialog(SetToManual_Dialog);

	//do something with the results of background checkbox
	if (SetToManual_Dialog.mBac !== BackgroundFld) {
		if (SetToManual_Dialog.mBac) {
			Value("Manual Background Remember", "Yes");
			//RemoveBackground();
		} else {
			Value("Manual Background Remember", "No");
			CurrentBackground.known = "";
			ApplyBackground(What("Background"));
		}
	}

	//do something with the results of class checkbox
	if (SetToManual_Dialog.mCla !== ClassFld) {
		if (SetToManual_Dialog.mCla) {
			Value("Manual Class Remember", "Yes");
			Hide("Class Features Menu");
		} else {
			Value("Manual Class Remember", "No");
			classes.known = {};
			ApplyClasses(What("Class and Levels"));
		}
	}

	//do something with the results of feat checkbox
	if (SetToManual_Dialog.mFea !== FeatFld) {
		if (SetToManual_Dialog.mFea) {
			Value("Manual Feat Remember", "Yes");
			for (var i = 1; i <= FieldNumbers.feats; i++) {
				tDoc.getField("Feat Description " + i).setAction("Calculate", "");
			}
		} else {
			Value("Manual Feat Remember", "No");
			var CurrentFeats = {
				known : [],
				improvements : [],
				skills : []
			};
			for (var i = 0; i < FieldNumbers.feats; i++) {
				ApplyFeat(What("Feat Name " + (i + 1)), (i + 1));
			}
		}
	}

	//do something with the results of race checkbox
	if (SetToManual_Dialog.mRac !== RaceFld) {
		if (SetToManual_Dialog.mRac) {
			Value("Manual Race Remember", "Yes");
			Hide("Race Features Menu");
		} else {
			Value("Manual Race Remember", "No");
			CurrentRace.known = "";
			ApplyRace(What("Race"));
		}
	}

	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

//calculate how much experience points are needed for the next level (field calculation)
function CalcXPnextlvl() {
	var lvl = Number(What("Character Level"));
	event.value = lvl && !isNaN(lvl) && lvl < (ExperiencePointsList.length - 1) ? ExperiencePointsList[lvl] : "";
};

//calculate the Ability Save DC (field calculation)
function CalcAbilityDC() {
	var Nmbr = event.target.name.slice(-1);
	var SpellAbi = What("Spell DC " + Nmbr + " Mod");

	//damage added manually in the bluetext field
	var ExtraBonus = EvalBonus(What("Spell DC " + Nmbr + " Bonus"), true);

	if (SpellAbi !== "" && SpellAbi !== " " && What(SpellAbi) !== "") {
		event.value = 8 + Number(What("Proficiency Bonus")) + Number(What(SpellAbi)) + Number(ExtraBonus);
	} else {
		event.value = "";
	}
}

//find the ability score the tool (or custom skill) is keyed off on
function UpdateTooSkill() {
	tDoc.delay = true;
	tDoc.calculate = false;

	var TooSkillTxt = What("Too Text").toLowerCase();
	var Ability = "Too";
	for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
		if (TooSkillTxt.indexOf("(" + AbilityScores.abbreviations[i].toLowerCase() + ")") !== -1) {
			Ability = AbilityScores.abbreviations[i];
			i = AbilityScores.abbreviations.length;
		}
	}
	SkillsList.abilityScores[SkillsList.abbreviations.indexOf("Too")] = Ability;
	SkillsList.abilityScoresByAS[SkillsList.abbreviations.indexOf("Too")] = Ability;

	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
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
	// First build up an array of Span objects
	var spans = new Array();
	spans[0] = new Object();
	spans[0].text = "P";
	spans[0].textSize = 6;
	spans[1] = new Object();
	spans[1].text = "ROF   ";
	spans[1].textSize = 4.2;
	spans[2] = new Object();
	spans[2].text = "A";
	spans[2].textSize = 6;
	spans[3] = new Object();
	spans[3].text = "BILITY";
	spans[3].textSize = 4.2;
	for (var A = 0; A < AScompA.length; A++) {
		tDoc.getField(AScompA[A] + "Attack.Titles").richValue = spans;
	}
	//if a variable was entered into the function, it means we are only doing the attack titles
	if (onlyAttackTitles) return; // don't do the rest of the function
	
	var spans2 = new Array();
	spans2[0] = new Object();
	spans2[0].text = "A";
	spans2[0].textSize = 7;
	spans2[1] = new Object();
	spans2[1].text = "TTUNED";
	spans2[1].textSize = 4.9;
	spans2[2] = new Object();
	spans2[2].text = " M";
	spans2[2].textSize = 7;
	spans2[3] = new Object();
	spans2[3].text = "AGICAL";
	spans2[3].textSize = 4.9;
	spans2[4] = new Object();
	spans2[4].text = " I";
	spans2[4].textSize = 7;
	spans2[5] = new Object();
	spans2[5].text = "TEMS";
	spans2[5].textSize = 4.9;
	spans2[6] = new Object();
	spans2[6].text = " (";
	spans2[6].textSize = 6;
	spans2[7] = new Object();
	spans2[7].text = "MAX";
	spans2[7].textSize = 4.2;
	spans2[8] = new Object();
	spans2[8].text = " 3)";
	spans2[8].textSize = 6;

	tDoc.getField("Attuned Magic Items Title").richValue = spans2;
	
	var spans3 = new Array();
	spans3[0] = new Object();
	spans3[0].text = "L";
	spans3[0].textSize = 7;
	spans3[0].alignment = "center";
	spans3[1] = new Object();
	spans3[1].text = "OC";
	spans3[1].textSize = 4.9;
	spans3[1].alignment = "center";
	
	tDoc.getField("Adventuring Gear Location.Title").richValue = spans3;
	tDoc.getField("Extra.Gear Location.Title").richValue = spans3;
	
	var themeColor = ColorList[What("Color.Theme")].RGB;
	
	var spans4 = new Array();
	spans4[0] = new Object();
	spans4[0].text = "A";
	spans4[0].textSize = 8;
	spans4[0].textColor = themeColor;
	spans4[1] = new Object();
	spans4[1].text = "RMOR";
	spans4[1].textSize = 5.6;
	spans4[1].textColor = themeColor;
	spans4[2] = new Object();
	spans4[2].text = ":";
	spans4[2].textSize = 8;
	spans4[2].textColor = themeColor;
	
	tDoc.getField("Text.Armor Proficiencies").richValue = spans4;
	
	var spans5 = new Array();
	spans5[0] = new Object();
	spans5[0].text = "W";
	spans5[0].textSize = 8;
	spans5[0].textColor = themeColor;
	spans5[1] = new Object();
	spans5[1].text = "EAPONS";
	spans5[1].textSize = 5.6;
	spans5[1].textColor = themeColor;
	spans5[2] = new Object();
	spans5[2].text = ":";
	spans5[2].textSize = 8;
	spans5[2].textColor = themeColor;
	
	tDoc.getField("Text.Weapon Proficiencies").richValue = spans5;
}

//make all the fields, with some exceptions, read-only (toggle = true) or editable (toggle = false)
function MakeMobileReady(toggle) {
	tDoc.delay = true;
	tDoc.calculate = false;

	if (toggle) {
		//first undo the visibility of the blue-text fields, if visible
		if (What("BlueTextRemember") === "Yes") ToggleBlueText("Yes");
		
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
		var exceptionPartsArray = [
			"Comp.Use.HD.Used",
			"Comp.Use.HP",
			"Cnote.Left",
			"Cnote.Right",
			"Comp.eqp.Notes",
			"Comp.img.Notes",
			"Notes.Left",
			"Notes.Right",
			"HP Max",
			"HP Max Current",
			"HP Temp",
			"HP Current",
			"Limited Feature Used ",
			" Adv",
			" Dis",
			"AmmoLeft.",
			"AmmoRight.",
			"Death Save ",
			".DeathSave.",
			"Resistance Damage Type ",
			"Adventuring Gear Row ",
			"Adventuring Gear Location.Row ",
			"Adventuring Gear Amount ",
			"Adventuring Gear Weight ",
			"Language ",
			"Tool ",
			"Valuables",
			"Extra.Exhaustion Level ",
			"Extra.Condition ",
			"Extra.Magic Item ",
			"Extra.Gear Row ",
			"Extra.Gear Location.Row ",
			"Extra.Gear Amount ",
			"Extra.Gear Weight ",
			"Extra.Notes",
			"Background_",
			"SpellSlots.Checkboxes.",
			"SpellSlots2.Checkboxes."
		];
		if (What("Manual Attack Remember") === "Yes") exceptionPartsArray.push("Attack.");
		var TooMuchExceptionArray = [
			"AC Stealth Disadvantage"
		]
		var tempReadOnlyArray = [];
		var tempNoPrintArray = [];
		for (var F = 0; F < tDoc.numFields; F++) {
			var Fname = tDoc.getNthFieldName(F);
			if (Fname) {
				var Ffield = tDoc.getField(Fname);

				//check if field is not in one of the exceptionlists, but continue if it is in the TooMuchExceptionArray
				var isException = (exceptionArray.indexOf(Fname) !== -1 || (/^(Bonus |Re)?action \d+/i).test(Fname)) && !(/button/i).test(Fname) && !(/Attack\.\d+\.Weapon$/i).test(Fname);
				if (!isException && !(/button/i).test(Fname)) {
					for (var x = 0; x < exceptionPartsArray.length; x++) {
						if (Fname.indexOf(exceptionPartsArray[x]) !== -1) {
							isException = true;
							x = exceptionPartsArray.length;
						}
					}
				}

				//if not an exception continue
				if (!isException) {
					//add fields that are visible and not read-only to array and make them read-only
					if (Ffield.display === display.visible && Ffield.readonly === false) {
						tempReadOnlyArray.push(Fname);
						Ffield.readonly = true;
					}
					//add fields that are visible but non-printable to an array and make them hidden
					if (Ffield.display === display.noPrint) {
						tempNoPrintArray.push(Fname);
						Hide(Fname);
					}
				}
			}
		}
		var SSfrontA = What("Template.extras.SSfront").split(",");
		if (SSfrontA.length > 1) {
			//we also have to set all the checkboxes back to readable, if they are visible
			var SSmoreA = SSfrontA.concat(What("Template.extras.SSmore").split(","));
			for (var SS = 0; SS < SSmoreA.length; SS++) {
				if (SSmoreA[SS] === "") continue;
				var maxLine = SSmoreA[SS] === SSfrontA[1] ? FieldNumbers.spells[0] : FieldNumbers.spells[1];
				for (var S = 0; S < maxLine; S++) {
					var SSbox = tDoc.getField(SSmoreA[SS] + "spells.checkbox." + S);
					if (SSbox.display === display.visible) SSbox.readonly = false;
				}
			}
		}

		Value("MakeMobileReady Remember", tempReadOnlyArray.toString() + "!#TheListSeparator#!" + tempNoPrintArray.toString());
		
		//hide the D20 warning so that it won't interfere with the bug in Acrobat Reader for iOS/Android
		tDoc.getField("d20warning").rect = [0,0,0,0];
	} else if (!toggle) {
		var tempArrayBoth = What("MakeMobileReady Remember").split("!#TheListSeparator#!");
		tempReadOnlyArray = tempArrayBoth[0].split(",");
		tempNoPrintArray = tempArrayBoth[1].split(",");
		for (var RO = 0; RO < tempReadOnlyArray.length; RO++) {
			Editable(tempReadOnlyArray[RO]);
		}
		for (var DP = 0; DP < tempNoPrintArray.length; DP++) {
			DontPrint(tempNoPrintArray[DP]);
		}
		Value("MakeMobileReady Remember", "");
	}

	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

//Make menu for the button on each Magic Item line and parse it to Menus.magicitems
function MakeMagicItemMenu() {
	var magicMenu = [];
	var itemNmbr = parseFloat(event.target.name.slice(-2));
	var theField = What("Extra.Magic Item " + itemNmbr);

	var menuLVL1 = function (item, array) {
		for (i = 0; i < array.length; i++) {
			var disabled = true
			if ((array[i] === "Move up" && itemNmbr === 1) || (array[i] === "Move down" && itemNmbr === FieldNumbers.magicitems) || (array[i] === "Insert empty item" && itemNmbr === FieldNumbers.magicitems)) {
				disabled = false;
			} else if (!theField && (array[i] === "Insert empty item" || array[i] === "Copy to Attuned Magical Items (page 2)" || array[i] === "Copy to Adventuring Gear (page 2)")) {
				disabled = false;
			}
			var extraName = "";
			if (array[i] === "Move down" && itemNmbr === (FieldNumbers.magicitemsD)) {
				extraName = " (to overflow page)";
			} else if (array[i] === "Move up" && itemNmbr === (FieldNumbers.magicitemsD + 1)) {
				extraName = " (to third page)";
			}
			item.push({
				cName : array[i] + extraName,
				cReturn : array[i],
				bEnabled : disabled
			});
		}
	};
	theArray = [
		"Move up",
		"Move down",
		"-",
		"Copy to Adventuring Gear (page 2)"
	]
	if (What("Adventuring Gear Remember") === false) {
		theArray.push("Copy to Attuned Magical Items (page 2)");
	}
	theArray2 = [
		"-",
		"Insert empty item",
		"Delete item",
		"Clear item",	
	]
	magicArray = theArray.concat(theArray2);
	menuLVL1(magicMenu, magicArray);

	Menus.magicitems = magicMenu;
};

//call the Magic Item menu and do something with the results
function MagicItemOptions() {

	var MenuSelection = getMenu("magicitems");

	if (MenuSelection !== undefined) {
		tDoc.delay = true;
		tDoc.calculate = false;
		thermoM("start"); //start a progress dialog
		thermoM("Magic item menu option..."); //change the progress 
		var itemNmbr = parseFloat(event.target.name.slice(-2));
		var Fields = [
			"Extra.Magic Item " + itemNmbr,
			"Extra.Magic Item Attuned " + itemNmbr,
			"Extra.Magic Item Description " + itemNmbr,
			"Extra.Magic Item Weight " + itemNmbr
		];
		var FieldsValue = [
			What(Fields[0]),
			tDoc.getField(Fields[1]).isBoxChecked(0),
			What(Fields[2]),
			What(Fields[3])
		];
		if (itemNmbr !== 1) {
			var FieldsUp = [
				"Extra.Magic Item " + (itemNmbr - 1),
				"Extra.Magic Item Attuned " + (itemNmbr - 1),
				"Extra.Magic Item Description " + (itemNmbr - 1),
				"Extra.Magic Item Weight " + (itemNmbr - 1)
			];
			var FieldsUpValue = [
				What(FieldsUp[0]),
				tDoc.getField(FieldsUp[1]).isBoxChecked(0),
				What(FieldsUp[2]),
				What(FieldsUp[3])
			];
		}
		if (itemNmbr !== FieldNumbers.magicitems) {
			var FieldsDown = [
				"Extra.Magic Item " + (itemNmbr + 1),
				"Extra.Magic Item Attuned " + (itemNmbr + 1),
				"Extra.Magic Item Description " + (itemNmbr + 1),
				"Extra.Magic Item Weight " + (itemNmbr + 1)
			];
			var FieldsDownValue = [
				What(FieldsDown[0]),
				tDoc.getField(FieldsDown[1]).isBoxChecked(0),
				What(FieldsDown[2]),
				What(FieldsDown[3])
			];
		}
		
		switch (MenuSelection[0]) {
		case "move up" :
			thermoM("Moving the magic item up..."); //change the progress dialog text
			for (var H = 0; H < Fields.length; H++) {
				var toDo = H === 1 ? "Checkbox" : "Value";
				tDoc[toDo](FieldsUp[H], FieldsValue[H]);
				tDoc[toDo](Fields[H], FieldsUpValue[H]);
				thermoM(H/Fields.length); //increment the progress dialog's progress
			};
			break;
		case "move down" :
			thermoM("Moving the magic item down..."); //change the progress dialog text
			for (var H = 0; H < Fields.length; H++) {
				var toDo = H === 1 ? "Checkbox" : "Value";
				tDoc[toDo](FieldsDown[H], FieldsValue[H]);
				tDoc[toDo](Fields[H], FieldsDownValue[H]);
				thermoM(H/Fields.length); //increment the progress dialog's progress
			};
			break;
		case "copy to adventuring gear (page 2)" :
			thermoM("Copying the item to equipment section on page 2..."); //change the progress dialog text
			AddToInv("gear", "r", FieldsValue[0], "", FieldsValue[3] > 0 ? FieldsValue[3] : "", "", false, false, false, true);
			break;
		case "copy to attuned magical items (page 2)" :
			thermoM("Copying the item to attuned magical items section on page 2..."); //change the progress dialog text
			AddToInv("magic", false, FieldsValue[0], "", FieldsValue[3] > 0 ? FieldsValue[3] : "", "", false, false, false, true);
			break;
		case "insert empty item" :
			thermoM("Inserting empty magic item..."); //change the progress dialog text
			MagicItemInsert(itemNmbr);
			break;
		case "delete item" :
			thermoM("Deleting magic item..."); //change the progress dialog text
			MagicItemDelete(itemNmbr);
			break;
		case "clear item" :
			thermoM("Clearing magic item..."); //change the progress dialog text
			tDoc.resetForm(Fields);
			break;
		}
		thermoM("stop"); //stop the top progress dialog

		tDoc.calculate = IsNotReset;
		tDoc.delay = !IsNotReset;
		if (IsNotReset) tDoc.calculateNow();
	}
}

//add a magic item to the third page or overflow page
function AddMagicItem(item, attuned, itemDescr, itemWeight, overflow) {
	var RegExItem = item.substring(0, 2) === "- " ? "\\b" + item.substring(2).RegEscape() + "\\b" : "\\b" + item.RegEscape() + "\\b";
	var tempFound = false;
	var attunement = attuned ? true : false;
	var startFld = overflow ? FieldNumbers.magicitemsD + 1 : 1;
	for (var n = 1; n <= 2; n++) {
		for (var i = startFld; i <= FieldNumbers.magicitems; i++) {
			var Name = tDoc.getField("Extra.Magic Item " + i);
			var Attune = "Extra.Magic Item Attuned " + i;
			var Description = tDoc.getField("Extra.Magic Item Description " + i);
			var Weight = tDoc.getField("Extra.Magic Item Weight " + i);
			if (n === 1 && (((RegExp(RegExItem, "i")).test(Name.value) && !(RegExp(RegExItem + " \\+\\d+", "i")).test(Name.value)) || Name.value.toLowerCase() === item.toLowerCase())) {
				i = FieldNumbers.magicitems + 1;
				n = 3;
				tempFound = true;
			} else if (n === 2 && !tempFound && Name.value === "" && Description.value === "") {
				Name.value = item;
				Checkbox(Attune, attunement);
				Description.value = itemDescr;
				Weight.value = itemWeight;
				i = FieldNumbers.magicitems + 1;
				if (overflow && !tDoc.getField(BookMarkList["Overflow sheet"])) DoTemplate("ASoverflow");
			}
		}
	}
}

//remove a magic item from the third page or overflow page
function RemoveMagicItem(item) {
	var RegExItem = item.substring(0, 2) === "- " ? "\\b" + item.substring(2).RegEscape() + "\\b" : "\\b" + item.RegEscape() + "\\b";
	for (var i = 1; i <= FieldNumbers.magicitems; i++) {
		var Name = What("Extra.Magic Item " + i);
		if (((RegExp(RegExItem, "i")).test(Name) && !(RegExp(RegExItem + " \\+\\d+", "i")).test(Name)) || Name.toLowerCase() === item.toLowerCase()) {
			tDoc.resetForm([
				"Extra.Magic Item " + i,
				"Extra.Magic Item Attuned " + i,
				"Extra.Magic Item Description " + i,
				"Extra.Magic Item Weight " + i
			]);
			break;
		}
	}
}

//insert a magic item at the position wanted
function MagicItemInsert(itemNmbr) {
	//stop the function if the selected slot is already empty
	if (What("Extra.Magic Item " + itemNmbr) === "") {
		return;
	}

	//look for the first empty slot below the slot
	var endslot = "";
	for (var i = itemNmbr + 1; i <= FieldNumbers.magicitems; i++) {
		if (What("Extra.Magic Item " + i) === "") {
			endslot = i;
			i = FieldNumbers.magicitems + 1;
		}
	}

	//only continue if an empty slot was found in the fields
	if (endslot) {
		//cycle to the slots starting with the empty one and add the values of the one above
		for (var i = endslot; i > itemNmbr; i--) {
			Value("Extra.Magic Item " + i, What("Extra.Magic Item " + (i - 1)));
			Checkbox("Extra.Magic Item Attuned " + i, tDoc.getField("Extra.Magic Item Attuned " + (i - 1)).isBoxChecked(0));
			Value("Extra.Magic Item Description " + i, What("Extra.Magic Item Description " + (i - 1)));
		}

		//empty the selected slot
		tDoc.resetForm([
			"Extra.Magic Item " + itemNmbr,
			"Extra.Magic Item Attuned " + itemNmbr,
			"Extra.Magic Item Description " + itemNmbr
		])
	}
}

//delete a magic item at the position wanted and move the rest up
function MagicItemDelete(itemNmbr) {
	var maxItem = FieldNumbers.magicitems;
	maxItem = itemNmbr > FieldNumbers.magicitemsD || What("Extra.Magic Item " + FieldNumbers.magicitemsD) ? maxItem : FieldNumbers.magicitemsD;//stop at the end of the first page if last one on first page is empty
	//move every line up one space, starting with the selected line
	for (var i = itemNmbr; i < maxItem; i++) {
		Value("Extra.Magic Item " + i, What("Extra.Magic Item " + (i + 1)));
		Checkbox("Extra.Magic Item Attuned " + i, tDoc.getField("Extra.Magic Item Attuned " + (i + 1)).isBoxChecked(0));
		Value("Extra.Magic Item Description " + i, What("Extra.Magic Item Description " + (i + 1)));
	}
	//delete the contents of the final line
	tDoc.resetForm([
		"Extra.Magic Item " + maxItem,
		"Extra.Magic Item Attuned " + maxItem,
		"Extra.Magic Item Description " + maxItem
	])
}

//see if any manually added weapons in the other field exist, and add them to the tempArray if recognized as a weapon, or to extraArray if not
function FindManualOtherWeapons(startup) {
	if (!startup) {
		var OtherWeapons = What("Proficiency Weapon Other Description");
		var tempArray = [];
		var extraArray = [];
		
		if (OtherWeapons) {
			var OWarray = OtherWeapons.split(/[/,\\\;\~]+/); //split the current list with some commonly used separators
			
			for (var ow = 0; ow < OWarray.length; ow++) {
				var OWfound = ParseWeapon(OWarray[ow]);
				if (OWfound) {
					var tempFound = false;
					for (var key in CurrentWeapons.proficiencies) {
						if (key !== "Manually added" && CurrentWeapons.proficiencies[key][2] && CurrentWeapons.proficiencies[key][2].indexOf(OWfound) !== -1) {
							tempFound = true;
						}
					}
					if (!tempFound) {
						tempArray.push(OWfound);
					}
				} else if (OWarray[ow]) { //if not a known weapon, but there is some custom text there
					extraArray.push(OWarray[ow].toLowerCase().replace(/^\s+|\s+$/g, "")); //add it, but only after removing leading and trailing white spaces, or otherwise it will look ugly
				}
			}
		}
			
		//put the arrays into the global variables
		CurrentWeapons.proficiencies["Manually added"] = [false, false, tempArray.sort()];
		CurrentWeapons.manualproficiencies = extraArray.sort();
		//put the arrays in the remember field
		Value("Other Weapon Proficiencies Remember", tempArray.sort() +  "!#TheListSeparator#!" + extraArray.sort());
	} else {
		//get the arrays from the remember field
		var tempArray = What("Other Weapon Proficiencies Remember").split("!#TheListSeparator#!");
		
		//put the arrays into the global variables
		if (tempArray[0]) {
			CurrentWeapons.proficiencies["Manually added"] = [false, false, tempArray[0].split(",")];
		}
		if (tempArray[1]) {
			CurrentWeapons.manualproficiencies = tempArray[1].split(",");
		}
	}
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
function CalcWeightCarried() {
	var ArmorW = 0;
	var ShieldW = 0;
	var WeaponsW = 0;
	var AmmoLeftW = 0;
	var AmmoRightW = 0;
	var CoinsW = 0;
	var Page2Left = 0;
	var Page2Middle = 0;
	var Page2Right = 0;
	var Page3Left = 0;
	var Page3Right = 0;
	var MagicItems = 0;
	
	
	//The weight of Armor
	var ArmorFld = What("AC Armor Weight");
	if (ArmorFld && What("Weight Remember Armor") !== "No") {
		ArmorW = Number(ArmorFld.replace(/,/, "."));
	}
	
	//The weight of the Shield
	var ShieldFld = What("AC Shield Weight");
	if (ShieldFld && What("Weight Remember Shield") !== "No") {
		ShieldW = Number(ShieldFld.replace(/,/, "."));
	}
	
	//The weight of the Weapons
	if (What("Weight Remember Weapons") !== "No") {
		for (var w = 1; w <= FieldNumbers.attacks; w++) {
			WeaponsW += Number(What("BlueText.Attack." + w + ".Weight").replace(/,/, "."));
		}
	}
	
	//The weight of ammo left column
	var AmmoLeftFld = What("AmmoLeftDisplay.Weight");
	if (AmmoLeftFld && What("Weight Remember Ammo Left") !== "No") {
		AmmoLeftFld = Number(AmmoLeftFld.replace(/,/, "."));	
		AmmoLeftW = AmmoLeftFld * Number(What("AmmoLeftDisplay.Amount"));
	}
	
	//The weight of ammo right column
	var AmmoRightFld = What("AmmoRightDisplay.Weight");
	if (AmmoRightFld && What("Weight Remember Ammo Right") !== "No") {
		AmmoRightFld = Number(AmmoRightFld.replace(/,/, "."));
		AmmoRightW = AmmoRightFld * Number(What("AmmoRightDisplay.Amount"));
	}
	
	var coinMod = What("Unit System") === "imperial" ? 50 : 100;
	
	//The weight of coins
	if (What("Weight Remember Coins") !== "No") {
		CoinsW = Math.floor(Number(What("Weight Remember Coins Total")) / coinMod * 10) / 10;
	}
	
	//The weight of the left column of page 2
	if (What("Weight Remember Page2 Left") !== "No") {
		Page2Left = Number(What("Adventuring Gear Weight Subtotal Left"));
	}
	
	//The weight of the left column of page 2
	if (What("Weight Remember Page2 Middle") === "Yes") {
		Page2Middle = Number(What("Adventuring Gear Weight Subtotal Middle"));
	}
	
	//The weight of the right column of page 2
	if (What("Weight Remember Page2 Right") !== "No") {
		Page2Right = Number(What("Adventuring Gear Weight Subtotal Right"));
	}
	
	//The weight of the left column of page 3
	if (What("Weight Remember Page3 Left") !== "No") {
		Page3Left = Number(What("Extra.Gear Weight Subtotal Left"));
	}
	
	//The weight of the right column of page 3
	if (What("Weight Remember Page3 Right") !== "No") {
		Page3Right = Number(What("Extra.Gear Weight Subtotal Right"));
	}
	
	//The weight of the Magic Items of page 3
	if (What("Weight Remember Magic Items") !== "No") {
		MagicItems = Number(What("Weight Remember Magic Items Total"));
	}
	
	var TotalWeight = ArmorW + ShieldW + WeaponsW + AmmoLeftW + AmmoRightW + CoinsW + Page2Left + Page2Middle + Page2Right + Page3Left + Page3Right + MagicItems;
	event.value = TotalWeight === 0 ? "" : TotalWeight;
}

//call this to choose which weights to add to the "Total Carried", and which weights not to add
function WeightToCalc_Button() {
	tDoc.delay = true;
	tDoc.calculate = false;

	//The dialog for setting what things are added to the total weight carried on page 2
	var WeightToCalc_Dialog = {
		AddMiddleC : true,
		UseEnc : true,

		//when starting the dialog
		initialize : function (dialog) {
			dialog.load({
				"img1" : allIcons.weight,
				"cArm" : What("Weight Remember Armor") !== "No",
				"cShi" : What("Weight Remember Shield") !== "No",
				"cWea" : What("Weight Remember Weapons") !== "No",
				"cAmL" : What("Weight Remember Ammo Left") !== "No",
				"cAmR" : What("Weight Remember Ammo Right") !== "No",
				"cCoi" : What("Weight Remember Coins") !== "No",
				"cP2L" : What("Weight Remember Page2 Left") !== "No",
				"cP2R" : What("Weight Remember Page2 Right") !== "No",
				"cP3L" : What("Weight Remember Page3 Left") !== "No",
				"cP3R" : What("Weight Remember Page3 Right") !== "No",
				"cMaI" : What("Weight Remember Magic Items") !== "No",
				"text" : "Note that you can change the weight of the armor, shield, weapons, and ammunition on the 1st page and the magic items on the 3rd page by using the \"bluetext fields\" that appear when you press the \"Mods\" button.\nFor the ammunition, only the number listed under \"total\" is counted as that already includes the unchecked ammo icons.",
				"rEnc" : this.UseEnc,
				"rCar" : !this.UseEnc
			});
			
			if (this.AddMiddleC) {
				dialog.load({
					"cP2M" : What("Weight Remember Page2 Middle") !== "No"
				})
			}
		},

		//when pressing the ok button
		commit : function (dialog) {
			var oResult = dialog.store();
			Value("Weight Remember Armor", oResult["cArm"] ? "Yes" : "No");
			Value("Weight Remember Shield", oResult["cShi"] ? "Yes" : "No");
			Value("Weight Remember Weapons", oResult["cWea"] ? "Yes" : "No");
			Value("Weight Remember Ammo Left", oResult["cAmL"] ? "Yes" : "No");
			Value("Weight Remember Ammo Right", oResult["cAmR"] ? "Yes" : "No");
			Value("Weight Remember Coins", oResult["cCoi"] ? "Yes" : "No");
			Value("Weight Remember Page2 Left", oResult["cP2L"] ? "Yes" : "No");
			Value("Weight Remember Page2 Right", oResult["cP2R"] ? "Yes" : "No");
			Value("Weight Remember Page3 Left", oResult["cP3L"] ? "Yes" : "No");
			Value("Weight Remember Page3 Right", oResult["cP3R"] ? "Yes" : "No");
			Value("Weight Remember Magic Items", oResult["cMaI"] ? "Yes" : "No");
			this.UseEnc = oResult["rEnc"];
			if (this.AddMiddleC) {
				Value("Weight Remember Page2 Middle", oResult["cP2M"] ? "Yes" : "No");
			}
		},

		description : {
			name : "Choose the things you want to count to Total Weight",
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
							alignment : "align_bottom",
							width : 20,
							height : 20
						}, {
							type : "static_text",
							item_id : "head",
							alignment : "align_fill",
							font : "heading",
							bold : true,
							height : 21,
							name : "What to count towards the Total Weight on the second page"
						}]
					}, {
						type : "cluster",
						align_children : "align_distribute",
						elements : [{
							type : "view",
							align_children : "align_left",
							elements : [{
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cArm",
									name : "Armor",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tArm",
									name : (this.AddMiddleC ? "\"Armor\"" : "\"Defense\"") + " section on the 1st page."
								} ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cShi",
									name : "Shield",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tShi",
									name : (this.AddMiddleC ? "\"Armor\"" : "\"Defense\"") + " section on the 1st page."
								} ]
							}, {
								type : "view",
								align_children : "align_row",
								char_height : 2,
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cWea",
									name : "Weapons",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tWea",
									name : "\"Attacks\" section on the 1st page."
								} ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cAmL",
									name : "Ammunition on the left",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tAmL",
									name : "\"Attacks\" section on the 1st page."
								} ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cAmR",
									name : "Ammunition on the right",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tAmR",
									name : "\"Attacks\" section on the 1st page."
								} ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cCoi",
									name : "Coins",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tCoi",
									name : "\"Equipment\" section on the 2nd page (1 lb per 50)."
								} ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cP2L",
									name : "Left column equipment",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tP2L",
									name : "\"Equipment\" section on the 2nd page."
								} ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cP2M",
									name : "Middle column equipment",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tP2M",
									name : "\"Equipment\" section on the 2nd page."
								} ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cP2R",
									name : "Right column equipment",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tP2R",
									name : "\"Equipment\" section on the 2nd page."
								} ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cP3L",
									name : "Left column extra equipment",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tP3L",
									name : "\"Extra Equipment\" section on the 3rd page."
								} ]
							}, {
								type : "view",
								align_children : "align_row",
								char_width : 40,
								char_height : 2,
								elements : [{
									type : "check_box",
									item_id : "cP3R",
									name : "Right column extra equipment",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tP3R",
									name : "\"Extra Equipment\" section on the 3rd page."
								} ]
							}, {
								type : "view",
								align_children : "align_row",
								char_width : 40,
								char_height : 2,
								elements : [{
									type : "check_box",
									item_id : "cMaI",
									name : "Magic items",
									char_width : 20
								}, {
									type : "static_text",
									item_id : "tMaI",
									name : "\"Magic Items\" section on the 3rd page."
								} ]
							} ]
						} ]
					}, {
						type : "static_text",
						item_id : "text",
						alignment : "align_fill",
						font : "dialog",
						char_height : 9,
						char_width : 45
					}, {
						type : "cluster",
						align_children : "align_left",
						name : "What weight allowance to show (PHB, page 176)",
						bold : true,
						font : "heading",
						char_width : 44,
						elements : [{
							type : "radio",
							item_id : "rEnc",
							group_id : "encu",
							name : "Use the variant encumbrance rules"
						}, {
							type : "radio",
							item_id : "rCar",
							group_id : "encu",
							name : "Use the fixed carrying capacity rules"
						} ]
					}, {
						type : "gap",
						height : 8
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
	
	if (!typePF) {
		WeightToCalc_Dialog.AddMiddleC = false;
		//remove the option about the middle column on the second page
		WeightToCalc_Dialog.description.elements[0].elements[0].elements[1].elements[0].elements.splice(7, 1);
	}
	app.execDialog(WeightToCalc_Dialog);
	
	if (WeightToCalc_Dialog.UseEnc !== isEnc) {
		var ShowHide = WeightToCalc_Dialog.UseEnc ? "Show" : "Hide";
		var HideShow = WeightToCalc_Dialog.UseEnc ? "Hide" : "Show";
		tDoc[HideShow]("Weight Carrying Capacity");
		tDoc[ShowHide]("Weight Heavily Encumbered");
	}
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

//see if a known ammunition is in a string, and return the ammo name
function ParseAmmo(input, onlyInv) {
	if (!input) return "";
	var tempString = removeDiacritics(input.toLowerCase());
	var output = "";
	var tempFound = 0;
	
	//scan string for all ammunition, including the alternative spellings
	for (var key in AmmoList) {
		if ((onlyInv && AmmoList[key].weight == undefined) || testSource(key, AmmoList[key], "ammoExcl")) continue; // test if the weapon or its source isn't excluded
		if (AmmoList[key].alternatives) {
			for (var z = 0; z < AmmoList[key].alternatives.length; z++) {
				var theAlt = AmmoList[key].alternatives[z];
				var doTest = typeof theAlt != "string";
				if (tempFound < theAlt.toString().length && (doTest ? theAlt.test(tempString) : tempString.indexOf(theAlt) !== -1)) {
					output = key;
					tempFound = theAlt.toString().length;
				}
			}
		};
		if (tempFound < key.length && tempString.indexOf(key) !== -1) {
			output = key;
			tempFound = key.length;
		};
	}
	
	if (onlyInv && output) {
		return [output, tempFound];
	} else {
		return output;
	}
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
	tDoc.delay = true;
	tDoc.calculate = false;
	
	var LeftRight = !event.target || !event.target.name || event.target.name.substring(0, 8) === "AmmoLeft" ? "AmmoLeft" : event.target.name.substring(0, 9) === "AmmoRight" ? "AmmoRight" : "Ammo" + Fld;
	var theAmmo = ParseAmmo(inputtxt);
	var parseAsWeapon = theAmmo ? false : ParseWeapon(inputtxt);
	if (parseAsWeapon && AmmoList[parseAsWeapon]) theAmmo = parseAsWeapon;
	
	if (theAmmo) {
		var aList = AmmoList[theAmmo];
		Hide(LeftRight);
		Show(LeftRight + ".Icon." + aList.icon);
		for (var i = 0; i < aList.checks.length; i++) {
			Show(LeftRight + aList.checks[i]);
		}
		var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
		Value(LeftRight + "Display.Weight", RoundTo(aList.weight * massMod, 0.001, true));
		Value(LeftRight + "Display.MaxAmount", aList.display);
	} else {
		tDoc.resetForm([LeftRight + "Display.Weight"]);
		if (!inputtxt) {
			ResetAmmo(LeftRight);
			tDoc.resetForm([LeftRight + "Display.Amount"]);
		}
	}
	
	LoadAmmo();
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

//Add the ammunition to one of the ammo fields. Inputtxt must be a known AmmoList entry
function AddAmmo(inputtxt) {
	var AmmoFlds = [
		"AmmoLeftDisplay.Name",
		"AmmoRightDisplay.Name"
	]
	for (var n = 1; n <= 2; n++) {
		for (var i = 0; i < AmmoFlds.length; i++) {
			var next = tDoc.getField(AmmoFlds[i]);
			if (n === 1 && ((RegExp(inputtxt.RegEscape(), "i")).test(next.value) || next.value.toLowerCase().indexOf(inputtxt) !== -1)) {
				i = AmmoFlds.length;
				n = 3;
			} else if (n === 2 && next.value === "") {
				next.value = AmmoList[inputtxt] ? AmmoList[inputtxt].name : inputtxt;
				i = AmmoFlds.length;
				n = 3;
			}
		}
	}
}

//Remove the ammunition if it exists in one of the ammo fields
function RemoveAmmo(inputtxt) {
	var AmmoFlds = [
		"AmmoLeftDisplay.Name",
		"AmmoRightDisplay.Name"
	]
	for (var i = 0; i < AmmoFlds.length; i++) {
		var next = tDoc.getField(AmmoFlds[i]);
		if (next.value.toLowerCase().indexOf(inputtxt) !== -1) {
			next.value = "";
			i = AmmoFlds.length;
		}
	}
}

//Set the 'quiver' to correspond with the amount of ammo
function LoadAmmo(Amount, Fld) {
	tDoc.delay = true;
	tDoc.calculate = false;
	
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
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

//set the dropdown menus for ammo
function SetAmmosdropdown() {
	tDoc.delay = true;
	tDoc.calculate = false;
	
	var string = "Select or type in the ammunition you want to use and all its attributes will be filled out automatically.";
	string += "\n\n" + toUni("Ammunition weight") + "\nThe weight of the ammo can be added to the total weight carried on the 2nd page. In order to do this you have to push the \"Weight\" button in the \"JavaScript Window\".";
	string += "\nYou can change the weight of the ammunition in the \"override section\" (a.k.a. the \"blue text fields\").";
	string += "\n\n" + toUni("Blue text fields") + "\nIn order to see these you first need to push the \"Mods\" button in the \"JavaScript Window\".";
	var theDropList = [""];
	
	for (ammo in AmmoList) {
		var theAmmo = AmmoList[ammo];
		if (testSource(ammo, theAmmo, "ammoExcl")) continue; // test if the weapon or its source is set to be included
		if (theDropList.indexOf(theAmmo.name) === -1) theDropList.push(theAmmo.name);
	}
	theDropList.sort();
	
	if (tDoc.getField("AmmoLeftDisplay.Name").submitName === theDropList.toSource()) return;
	tDoc.getField("AmmoLeftDisplay.Name").submitName = theDropList.toSource();
	
	var remAmmo = What("AmmoLeftDisplay.Name");
	tDoc.getField("AmmoLeftDisplay.Name").setItems(theDropList);
	tDoc.getField("AmmoLeftDisplay.Name").userName = string;
	Value("AmmoLeftDisplay.Name", remAmmo);
	
	remAmmo = What("AmmoRightDisplay.Name");
	tDoc.getField("AmmoRightDisplay.Name").setItems(theDropList);
	tDoc.getField("AmmoRightDisplay.Name").userName = string;
	Value("AmmoRightDisplay.Name", remAmmo);
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
}

//Toggle the visibility of the secondary ability save DC. ShowHide = "show" or "hide".
function Toggle2ndAbilityDC(ShowHide) {
	tDoc.delay = true;
	tDoc.calculate = false;
	
	var ToShow = tDoc.getField("ShowHide 2nd DC").buttonGetCaption() === "Hide 2nd DC";
	var expectedShowHide = ToShow ? "hide" : "show";
	
	if (ShowHide && ShowHide.toLowerCase() !== expectedShowHide) {
		return; //stop the function, there is nothing to do
	}
	
	var theCaption = ToShow ? "Show 2nd DC" : "Hide 2nd DC";
	var HiddenVisible = ToShow ? "Hide" : "Show";
	var VisibleHidden = ToShow ? "Show" : "Hide";
	var HiddenNoPrint = !ToShow && What("BlueTextRemember") === "Yes" ? "DontPrint" : "Hide";
		
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
		
		var toMove = ToShow ? 27 : -27;
		for (var i = 0; i < DC1array.length; i++) {
			var theFld = tDoc.getField(DC1array[i]);
			var gRect = theFld.rect; // get the location of the field on the sheet
			gRect[0] += toMove; // add the widen amount to the upper left x-coordinate
			gRect[2] += toMove; // add the widen amount to the lower right x-coordinate
			theFld.rect = gRect; // Update the value of b.rect
			theFld.value = theFld.value; //re-input the value as to counteract the changing of font
		}
	}
	
	for (var j = 0; j < DC2array.length; j++) {
		tDoc[HiddenVisible](DC2array[j]);
	}
	tDoc[HiddenNoPrint]("Spell DC 2 Bonus");
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

//change the colorscheme that is used for the entire sheet. Choose from: "red", "green", ""
function ApplyColorScheme(aColour) {
	if (typePF || (!aColour && What("Color.Theme") === tDoc.getField("Color.Theme").defaultValue)) return; //don't do this function in the Printer-Friendly version or if resetting with the default colour still active
	var colour = aColour ? aColour.toLowerCase() : What("Color.Theme");
	//stop the function if the input color is not recognized
	if (!ColorList[colour]) {
		return;
	}
	
	thermoM("start"); //start a progress dialog
	thermoM("Applying " + colour + " color scheme..."); //change the progress dialog text
	
	//set the chosen color to a place it can be found again
	Value("Color.Theme", colour);
	
		
	//set the highlighting color if it has been coupled to the headers
	if (Who("Highlighting") === "headers") {
		app.runtimeHighlightColor = LightColorList[colour];
		tDoc.getField("Highlighting").fillColor = LightColorList[colour];
	}
	
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
		thermoM("stop"); //stop the top progress dialog
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
		thermoM("stop"); //stop the top progress dialog
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
	
	//see if any of the Ability Save DC's have the color connected to this
	ApplyDCColorScheme();
	
	thermoM("stop"); //stop the top progress dialog
}

//change the colorscheme that is used for the dragon heads sheet
function ApplyDragonColorScheme(aColour) {
	if (typePF || (!aColour && What("Color.DragonHeads") === tDoc.getField("Color.DragonHeads").defaultValue)) return; //don't do this function in the Printer-Friendly version or if resetting with the default colour still active
	var colour = aColour ? aColour.toLowerCase() : What("Color.DragonHeads");
	var theColor = ColorList[colour].CMYK;
	var theColorDark = DarkColorList[colour];
	//stop the function if the input color is not recognized
	if (!ColorList[colour]) {
		return;
	}
	
	thermoM("start"); //start a progress dialog
	thermoM("Applying " + colour + " Dragon Heads..."); //change the progress dialog text
	
	//set the chosen color to a place it can be found again
	Value("Color.DragonHeads", colour);
	
	//set the highlighting color if it has been coupled to the dragon heads color
	if (Who("Highlighting") === "same as dragon heads") {
		app.runtimeHighlightColor = LightColorList[colour];
		tDoc.getField("Highlighting").fillColor = LightColorList[colour];
	}
	
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
		thermoM("stop"); //stop the top progress dialog
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
		thermoM("stop"); //stop the top progress dialog
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
	
	//see if any of the Ability Save DC's have the color connected to this
	ApplyDCColorScheme();
	
	thermoM("stop"); //stop the top progress dialog
}

//change the colorscheme that is used for the dragon heads sheet
function ApplyHPDragonColorScheme(aColour) {
	if (typePF || (!aColour && What("Color.HPDragon") === tDoc.getField("Color.HPDragon").defaultValue)) return; //don't do this function in the Printer-Friendly version or if resetting with the default colour still active
	var colour = aColour ? aColour.toLowerCase() : What("Color.HPDragon");
	
	//stop the function if the input color is not recognized
	if (ColorList[colour]) {
		thermoM("start"); //start a progress dialog
		thermoM("Applying " + colour + " HP Dragons..."); //change the progress dialog text
		
		//set the chosen color to a place where it can be found again
		Value("Color.HPDragon", colour);
		
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
		
		thermoM("stop"); //stop the top progress dialog
	}
}

//Make menu for choosing the color, the 'color' button, and parse it to Menus.color
function MakeColorMenu() {
	
	var ColorMenu = [];
	var tempArray = [];

	//add all the colours to the array, ommitting some if not using the full (bonus) version
	for (var key in ColorList) {
		tempArray.push(key);
	};
	tempArray.sort();
	
	if (typePF) {
		var menuLVL1 = function (item, array, name) {
			var lookIt = Who("Highlighting");
			for (i = 0; i < array.length; i++) {
				item.push({
					cName : array[i].capitalize(),
					cReturn : name + "#" + array[i],
					bMarked : lookIt === array[i]
				});
			}
		};
		tempArray.unshift("turn highlighting off", "-", "sheet default", "adobe default", "-");
		menuLVL1(ColorMenu, tempArray, "form highlights");
	} else {
		var HighlightMenu = [];
		var DragonMenu = [];
		var HPDragonMenu = [];
		var DCMenu = {cName : "Ability Save DCs", oSubMenu : []};

		var menuLVL1 = function (item, array) {
			var lookIt = What("Color.Theme");
			for (i = 0; i < array.length; i++) {
				item.push({
					cName : array[i].capitalize(),
					cReturn : array[i],
					bMarked : lookIt === array[i]
				});
			}
		};

		var menuLVL2 = function (menu, name, array) {
			menu.cName = name;
			menu.oSubMenu = [];
			var lookIt = name === "Form Highlights" ? Who("Highlighting") : name === "HP Dragons" ? What("Color.HPDragon") : What("Color.DragonHeads");
			for (i = 0; i < array.length; i++) {
				menu.oSubMenu.push({
					cName : array[i].capitalize(),
					cReturn : name + "#" + array[i],
					bMarked : lookIt === array[i]
				})
			}
		};
		
		var menuLVL3 = function (menu, name, array, extraReturn) {
			var temp = [];
			var lookIt = What("Color.DC").split(",")[extraReturn.split("#")[1] - 1];
			for (i = 0; i < array.length; i++) {
				temp.push({
					cName : array[i].capitalize(),
					cReturn : extraReturn + "#" + array[i],
					bMarked : lookIt === array[i]
				})
			}
			menu.oSubMenu.push({
				cName : name,
				oSubMenu : temp
			});
		};
		
		var tempArrayExt = tempArray.slice(0);
		tempArrayExt.unshift("same as headers", "same as dragon heads", "-"); 
		
		//make a submenu to set the form field highlight color, or turn highlighting off
		var HighlightArray = tempArrayExt.slice(0);
		HighlightArray.unshift("turn highlighting off", "-", "sheet default", "adobe default", "-");
		menuLVL2(HighlightMenu, "Form Highlights", HighlightArray)
		ColorMenu.push(HighlightMenu);
		
		//make the Dragon Head submenu
		menuLVL2(DragonMenu, "Dragon Heads", tempArray)
		ColorMenu.push(DragonMenu);
		
		//make, if this is not a spell sheet, the Dragon HP and ability save DCs submenu
		if (!minVer) {
			menuLVL2(HPDragonMenu, "HP Dragons", tempArray)
			ColorMenu.push(HPDragonMenu);
			menuLVL3(DCMenu, "Ability Save DC 1 (left)", tempArrayExt, "abilitydc#1");
			menuLVL3(DCMenu, "Ability Save DC 2 (right)", tempArrayExt, "abilitydc#2");
			ColorMenu.push(DCMenu);
		}
		
		tempArray.unshift("-"); //add a divider at the start for the final menu
		
		//make the color menu
		menuLVL1(ColorMenu, tempArray);
	}

	Menus.colour = ColorMenu;
};

//call the color menu and do something with the results
function ColoryOptions() {
	var MenuSelection = getMenu("colour");
	var tempArray = [];
	var theColour = ["RGB", 0.8, 0.8431, 1]; //Adobe default form field highlighting colour
	
	if (MenuSelection !== undefined && MenuSelection[0] !== "nothing" && ColorList[MenuSelection[0]]) {
		ApplyColorScheme(MenuSelection[0]);
	} else if (MenuSelection[0] === "dragon heads" && ColorList[MenuSelection[1]]) {
		ApplyDragonColorScheme(MenuSelection[1]);
	} else if (MenuSelection[0] === "hp dragons" && ColorList[MenuSelection[1]]) {
		ApplyHPDragonColorScheme(MenuSelection[1]);
	} else if (MenuSelection[0] === "form highlights" && ColorList[MenuSelection[1]]) {
		app.runtimeHighlight = true;
		theColour = LightColorList[MenuSelection[1]];
		app.runtimeHighlightColor = theColour;
		tDoc.getField("Highlighting").fillColor = theColour;
		Value("Highlighting", "true", MenuSelection[1]);
	} else if (MenuSelection[0] === "form highlights") {
		switch (MenuSelection[1]) {
		 case "turn highlighting off" :
			app.runtimeHighlight = false;
			break;
		 case "adobe default" :
			app.runtimeHighlight = true;
			break;
		 case "sheet default" :
			app.runtimeHighlight = true;
			theColour = ["RGB", 0.9, 0.9, 1];
			break;
		 case "same as headers" :
			app.runtimeHighlight = true;
			theColour = LightColorList[What("Color.Theme")];
			break;
		 case "same as dragon heads" :
			app.runtimeHighlight = true;
			theColour = LightColorList[What("Color.DragonHeads")];
			break;
		}
		Value("Highlighting", app.runtimeHighlight, MenuSelection[1]);
		app.runtimeHighlightColor = theColour;
		tDoc.getField("Highlighting").fillColor = theColour;
	} else if (MenuSelection[0] ===  "abilitydc") {
		ApplyDCColorScheme(MenuSelection[2], MenuSelection[1]);
	}
};

//Add the text of the feature selected
function ApplyBackgroundFeature(input) {
	if (event.target && event.target.name === "Background Feature" && input.toLowerCase() === event.target.value.toLowerCase()) return; //no changes were made
	
	var TheInput = input.toLowerCase();
	var TempFound = false;
	var tempString = CurrentBackground.name && CurrentBackground.source && SourceList[CurrentBackground.source[0]] ? "The background '" + CurrentBackground.name + "' is found in the " + SourceList[CurrentBackground.source[0]].name + (CurrentBackground.source[1] ? ", page " + CurrentBackground.source[1] : "") + "\n" : "";
	
	if (input === "") {
		Value("Background Feature Description", "", "");
	} else {
		for (var feature in BackgroundFeatureList) {
			if (!TempFound && TheInput.indexOf(feature) !== -1) {
				if (testSource(feature, BackgroundFeatureList[feature], "backFeaExcl")) continue; // test if the background feature or its source isn't excluded
				var FeaName = feature.capitalize();
				tempString += BackgroundFeatureList[feature].source && SourceList[BackgroundFeatureList[feature].source[0]] ? "The feature '" + FeaName + "' is found in the " + SourceList[BackgroundFeatureList[feature].source[0]].name + (BackgroundFeatureList[feature].source[1] ? ", page " + BackgroundFeatureList[feature].source[1] : "") : "";
				
				var theDesc = What("Unit System") === "imperial" ? BackgroundFeatureList[feature].description : ConvertToMetric(BackgroundFeatureList[feature].description, 0.5);
				Value("Background Feature Description", theDesc, tempString);
				
				TempFound = true;
			}
		}
	}
}

//set the dropdown box options for the background features
function SetBackgroundFeaturesdropdown() {
	var tempArray = [""];
	var string = "Select or type in the background feature you want to use and its text will be filled out below automatically.\n\n" + toUni("Background selection") + "\nThe relevant background feature is automatically selected upon selecting a background on the first page. Doing that will always override whatever you wrote here. So, please first fill out a background before you select a alternative feature here.";
	
	for (var feature in BackgroundFeatureList) {
		if (testSource(feature, BackgroundFeatureList[feature], "backFeaExcl")) continue;
		var feaNm = feature.capitalize();
		if (tempArray.indexOf(feaNm) === -1) tempArray.push(feaNm);
	};
	tempArray.sort();

	if (tDoc.getField("Background Feature").submitName === tempArray.toSource()) return; //no changes, so no reason to do this
	tDoc.getField("Background Feature").submitName = tempArray.toSource();
	
	var theFldVal = What("Background Feature");
	tDoc.getField("Background Feature").setItems(tempArray);
	Value("Background Feature", theFldVal, string);
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
		for (var i = 0; i < array.length; i++) {
			item.push({
				cName : array[i].capitalize() + " " + RaceList[CurrentRace.known].name,
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
	tDoc.delay = true;
	tDoc.calculate = false;
	var MenuSelection = getMenu("raceoptions");
	
	if (MenuSelection && MenuSelection[0] !== "nothing") {
		if (MenuSelection[1] === "basic") {
			RemoveRace();
			CurrentRace.known = "";
		}
		ApplyRace(MenuSelection.toString());
	}
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

function ConvertToMetric(inputString, rounded, exact) {
	if (typeof inputString != 'string' || inputString === "") {return "";};
	var rounding = rounded ? rounded : 1;
	var ratio = exact ? "metricExact" : "metric";
	var INtoCM = function (unit) {
		return unit * UnitsList[ratio].lengthInch;
	}
	var FTtoM = function (unit) {
		return unit * UnitsList[ratio].length;
	}
	var MILEtoKM = function (unit) {
		return unit * UnitsList[ratio].distance;
	}
	var CUFTtoM = function (unit) {
		return unit * UnitsList[ratio].volume;
	}
	var SQFTtoM = function (unit) {
		return unit * UnitsList[ratio].surface;
	}
	var LBtoKG = function (unit) {
		return unit * UnitsList[ratio].mass;
	}
	
	var theConvert = function (amount, units) {
		switch (units){
		 case "mile" : case "miles" :
			var total = MILEtoKM(Number(amount));
			var unit = "km";
			break;
		 case "ft" : case "foot" : case "feet" : case "'" :
			var total = FTtoM(Number(amount));
			var unit = "m";
			break;
		 case "in" : case "inch" : case "inches" :
			var total = INtoCM(Number(amount));
			var unit = "cm";
			break;
		 case "cu ft" : case "cubic foot" : case "cubic feet" :
			var total = CUFTtoM(Number(amount));
			var unit = "l";
			break;
		 case "sq ft" : case "square foot" : case "square feet" :
			var total = SQFTtoM(Number(amount));
			var unit = "m2";
			break;
		 case "lb" : case "lbs" : case "pound" : case "pounds" :
			var total = LBtoKG(Number(amount));
			var unit = "kg";
			break;
		}
		return [total, unit];
	}
	
	// find all labeled measurements in string
	var measurements = inputString.match(/\b\d+(,|\.|\/)?\d*\/?(\d+?(,|\.|\/)?\d*)?\s?-?((in|inch|inches|miles?|ft|foot|feet|sq ft|square foot|square feet|cu ft|cubic foot|cubic feet|lbs?|pounds?)\b|('($|\s)|'\d+\w?"))/ig);

	if (measurements) {
		for (var i = 0; i < measurements.length; i++) {
			if ((/'/).test(measurements[i]) && (/\"/).test(measurements[i])) {
				var orgFT = parseFloat(measurements[i].substring(0,measurements[i].indexOf("'")));
				var orgIN = parseFloat(measurements[i].substring(measurements[i].indexOf("'") + 1, measurements[i].indexOf("\"")));
				var resulted = theConvert(parseFloat(orgIN/12) + parseFloat(orgFT), "ft");
			} else {
				var org = measurements[i].replace(/,/g, ".");
				var orgUnit = org.match(/([a-z]+|')$/)[0], fraction;
				
				if (fraction = org.match(/(\d+\.?\d*)\/(\d+\.?\d*)/) ){
					var resulted = [theConvert(fraction[1], orgUnit), theConvert(fraction[2], orgUnit)];
				} else {
					var resulted = theConvert(parseFloat(org), orgUnit);
				}
			}
			
			var delimiter = (/-/).test(measurements[i]) ? "-" : " ";
			
			if (isArray(resulted[0])) {
				var theResult = RoundTo(resulted[0][0], rounding, false, true) + "/" + RoundTo(resulted[1][0], rounding, false, true) + delimiter + resulted[1][1];
			} else {
				var theResult = RoundTo(resulted[0], rounding, false, true) + delimiter + resulted[1];
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
	var INofCM = function (unit) {
		return unit / UnitsList[ratio].lengthInch;
	}
	var FTofM = function (unit) {
		return unit / UnitsList[ratio].length;
	}
	var MILEofKM = function (unit) {
		return unit / UnitsList[ratio].distance;
	}
	var CUFTofM = function (unit) {
		return unit / UnitsList[ratio].volume;
	}
	var SQFTofM = function (unit) {
		return unit / UnitsList[ratio].surface;
	}
	var LBofKG = function (unit) {
		return unit / UnitsList[ratio].mass;
	}
	
	var theConvert = function (amount, units) {
		switch (units){
		 case "cm" :
			if (amount < 30) {
				var total = INofCM(Number(amount));
				var unit = "in";
				break;
			}
			amount = amount / 100;
		 case "m" : case "meter" :  case "metre" :
			var total = FTofM(Number(amount));
			var unit = "ft";
			break;
		 case "km" :
			var total = MILEofKM(Number(amount));
			var unit = total === 1 ? "mile" : "miles";
			break;
		 case "l" : case "liter" : case "litre" :
			var total = CUFTofM(Number(amount));
			var unit = "cu ft";
			break;
		 case "m2" : case "square metre" : case "square meter" :
			var total = SQFTofM(Number(amount));
			var unit = "sq ft";
			break;
		 case "g" :
			amount = amount / 1000;
		 case "kg" : case "kilos" : case "kilo" :
			var total = LBofKG(Number(amount));
			var unit = "lb";
			break;
		}
		return [total, unit];
	}
	
	// find all labeled measurements in string
	var measurements = inputString.match(/\b\d+(,|\.|\/)?\d*\/?(\d+?(,|\.|\/)?\d*)?\s?-?(square meter|square metre|m2|cm|km|m|meter|metre|l|liter|litre|kg|g|kilos?)\b/ig);
	
	if (measurements) {
		for (var i = 0; i < measurements.length; i++) {
			var org = measurements[i].replace(/,/g, ".");
			var orgUnit = org.match(/([a-z]+)$/)[0], fraction;
			
			if (fraction = org.match(/(\d+\.?\d*)\/(\d+\.?\d*)/)){
				var resulted = [theConvert(fraction[1], orgUnit), theConvert(fraction[2], orgUnit)];
			} else {
				var resulted = theConvert(parseFloat(org), orgUnit);
			}
			
			var delimiter = (/-/).test(measurements[i]) ? "-" : " ";
			
			if (isArray(resulted[0])) {
				var theResult = RoundTo(resulted[0][0], rounding, false, true) + "/" + RoundTo(resulted[1][0], rounding, false, true) + delimiter + resulted[1][1];
			} else if (toshorthand && resulted[1] === "ft" && resulted[0] % 1 != 0) {
				var theFT = Math.round(resulted[0]);
				var theINCH = Math.round((resulted[0] - theFT) / (1/12));
				var theResult = theFT + "'" + theINCH + "\"";
			} else {
				var theResult = RoundTo(resulted[0], rounding, false, true) + delimiter + resulted[1];
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
	tDoc.delay = true;
	tDoc.calculate = false;
	
	var unitSys = What("Unit System");
	var decSep = What("Decimal Separator");
	
	//set the dialog to represent current settings
	SetUnitDecimals_Dialog.bSys = unitSys;
	SetUnitDecimals_Dialog.bDec = decSep;
	
	if (!minVer) {
		//fields to update the string from
		var FldsGameMech = [
			"Vision",
			"Saving Throw advantages / disadvantages",
			"Racial Traits",
			"Class Features",
			"Speed",
			"Speed encumbered",
			"Speed Remember",
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
		var FldsCalc = [];
		var AScompA = What("Template.extras.AScomp").split(",");
		var WSfrontA = What("Template.extras.WSfront").split(",");
		for (var C = 0; C < AScompA.length; C++) {
			var prefix = AScompA[C];
			FldsGameMech.push(prefix + "Comp.Use.Speed");
			FldsGameMech.push(prefix + "Comp.Use.Features");
			FldsGameMech.push(prefix + "Comp.Use.Senses");
			FldsGameMech.push(prefix + "Comp.Use.Traits");
			FldsGameMech.push(prefix + "Cnote.Left");
			FldsGameMech.push(prefix + "Cnote.Right");
		}
		for (var i = 1; i <= 77; i++) {
			if (i <= FieldNumbers.magicitems) FldsGameMech.push("Extra.Magic Item Description " + i);
			if (i <= FieldNumbers.limfea) FldsGameMech.push("Limited Feature " + i);
			if (i <= FieldNumbers.feats) {
				FldsGameMech.push("Feat Description " + i);
				FldsCalc.push("Feat Description " + i);
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
		
	var theDialog = app.execDialog(SetUnitDecimals_Dialog) === "ok";
	
	//call the dialog and do somthing if ok is pressed	
	if (theDialog) {
		thermoM("start"); //start a progress dialog
		thermoM("Set unit dialog..."); //change the progress 
		if (!minVer && SetUnitDecimals_Dialog.bSys !== unitSys) { //do something if the unit system was changed
			thermoM("Converting to " + SetUnitDecimals_Dialog.bSys + "..."); //change the progress dialog text
			setListsUnitSystem(SetUnitDecimals_Dialog.bSys); //update some variables
			Value("Unit System", SetUnitDecimals_Dialog.bSys);
			Value("Decimal Separator", SetUnitDecimals_Dialog.bDec);
			if (typePF) {
				Value("Display.Weighttxt.LbKg", SetUnitDecimals_Dialog.bSys === "imperial" ? "LB" : "KG");
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
			
			var totalInc = FldsGameMech.length + FldsWeight.length + FldsCalc.length + 2;
			
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
			
			//run through all the spells fields with a description and re-do the 
			for (var Sa = 0; Sa < spellsArray.length; Sa++) {
				ApplySpell(spellsArray[Sa][0], spellsArray[Sa][1]);
			}
			
		} else if (!minVer && SetUnitDecimals_Dialog.bDec !== decSep) { //or if only the decimal separator has been changed
			thermoM("Converting to " + SetUnitDecimals_Dialog.bDec + " decimal separator..."); //change the progress dialog text
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
		} else if (tDoc.info.SpellsOnly && SetUnitDecimals_Dialog.bSys !== unitSys) { //do something if the unit system was changed
			thermoM("Converting to " + SetUnitDecimals_Dialog.bSys + "..."); //change the progress dialog text
			Value("Unit System", SetUnitDecimals_Dialog.bSys);
			Value("Decimal Separator", SetUnitDecimals_Dialog.bDec);
			//run through all the spells fields with a description and re-do the 
			for (var Sa = 0; Sa < spellsArray.length; Sa++) {
				ApplySpell(spellsArray[Sa][0], spellsArray[Sa][1]);
			}
		} else if (tDoc.info.AdvLogOnly) {
			Value("Unit System", SetUnitDecimals_Dialog.bSys);
			Value("Decimal Separator", SetUnitDecimals_Dialog.bDec);
		}
		thermoM("stop"); //stop the top progress dialog
	}
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

function SetTextOptions_Button() {
	
	var FontSize = parseFloat(What("FontSize Remember"));
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
	
	//call the dialog and do somthing if ok is pressed	
	if (app.execDialog(SetTextOptions_Dialog) === "ok") {
		if (SetTextOptions_Dialog.bSize !== FontSize) {
			ToggleTextSize(SetTextOptions_Dialog.bSize);
		}
		if (SetTextOptions_Dialog.bFont !== nowFont) {
			ChangeFont(SetTextOptions_Dialog.bFont);
		}
	}
};

function ImportExport_Button() {
	var theMenu = getMenu("importexport");
	
	if (theMenu !== undefined && theMenu[0] !== "nothing") {
		switch (theMenu[1]) {
			case "script" :
				AddUserScript();
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

//Make menu for the button on each Feat line and parse it to Menus.feats
function MakeFeatMenu() {
	var featMenu = [];
	var itemNmbr = parseFloat(event.target.name.slice(-2));
	var theField = What("Feat Name " + itemNmbr);

	var menuLVL1 = function (item, array) {
		for (i = 0; i < array.length; i++) {
			var disable = true
			if ((array[i] === "Move up" && itemNmbr === 1) || (array[i] === "Move down" && itemNmbr === FieldNumbers.feats) || (array[i] === "Insert empty feat" && (!theField || itemNmbr === FieldNumbers.feats))) {
				disable = false;
			}
			var extraName = "";
			if (array[i] === "Move down" && itemNmbr === (FieldNumbers.feats - 4)) {
				extraName = " (to overflow page)";
			} else if (array[i] === "Move up" && itemNmbr === (FieldNumbers.feats - 3)) {
				extraName = !typePF ? " (to second page)" : " (to third page)";
			}
			item.push({
				cName : array[i] + extraName,
				cReturn : array[i],
				bEnabled : disable
			});
		}
	};

	menuLVL1(featMenu, ["Move up", "Move down", "-", "Insert empty feat", "Delete feat", "Clear feat"]);

	Menus.feats = featMenu;
};

//call the Feat menu and do something with the results
function FeatOptions() {
	tDoc.delay = true;
	tDoc.calculate = false;

	var MenuSelection = getMenu("feats");
	var itemNmbr = parseFloat(event.target.name.slice(-2));
	var FieldNames = [
		"Feat Name ",
		"Feat Note ",
		"Feat Description "
	];
	var Fields = [], FieldsValue = [], FieldsUp = [], FieldsUpValue = [], FieldsDown = [], FieldsDownValue = [];

	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(FieldNames[F] + itemNmbr);
		FieldsValue.push(What(Fields[F]));
		if (itemNmbr !== 1) {
			FieldsUp.push(FieldNames[F] + (itemNmbr - 1));
			FieldsUpValue.push(What(FieldsUp[F]));
		}
		if (itemNmbr !== FieldNumbers.feats) {
			FieldsDown.push(FieldNames[F] + (itemNmbr + 1));
			FieldsDownValue.push(What(FieldsDown[F]));
		}
	}
	if (MenuSelection !== undefined) {
		thermoM("start"); //start a progress dialog
		thermoM("Feat menu option..."); //change the progress 
		switch (MenuSelection[0]) {
		 case "move up":
			thermoM("Moving the feat up..."); //change the progress dialog text
			IsNotFeatMenu = false;
			for (var H = 0; H < FieldNames.length; H++) {
				Value(FieldsUp[H], FieldsValue[H]);
				Value(Fields[H], FieldsUpValue[H]);
				thermoM(H/FieldNames.length); //increment the progress dialog's progress
			};
			IsNotFeatMenu = true;
			break;
		 case "move down":
			thermoM("Moving the feat down..."); //change the progress dialog text
			IsNotFeatMenu = false;
			for (var H = 0; H < FieldNames.length; H++) {
				Value(FieldsDown[H], FieldsValue[H]);
				Value(Fields[H], FieldsDownValue[H]);
				thermoM(H/FieldNames.length); //increment the progress dialog's progress
			};
			IsNotFeatMenu = true;
			break;
		 case "insert empty feat":
			thermoM("Inserting empty feat..."); //change the progress dialog text
			FeatInsert(itemNmbr);
			break;
		 case "delete feat":
			thermoM("Deleting feat..."); //change the progress dialog text
			FeatDelete(itemNmbr);
			break;
		 case "clear feat":
			thermoM("Clearing feat..."); //change the progress dialog text
			tDoc.resetForm(Fields);
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

//insert a feat at the position wanted
function FeatInsert(itemNmbr) {
	//stop the function if the selected slot is already empty
	if (What("Feat Name " + itemNmbr) === "") {
		return;
	}

	//look for the first empty slot below the slot
	var endslot = "";
	for (var i = itemNmbr + 1; i <= FieldNumbers.feats; i++) {
		if (What("Feat Name " + i) === "") {
			endslot = i;
			i = (FieldNumbers.feats + 1);
		}
	}
	
	var FieldNames = [
		"Feat Name ",
		"Feat Note ",
		"Feat Description "
	];
	var Fields = [];
	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(FieldNames[F] + itemNmbr);
	}

	//only continue if an empty slot was found in the fields
	if (endslot) {
		//cycle to the slots starting with the empty one and add the values of the one above
		IsNotFeatMenu = false;
		for (var i = endslot; i > itemNmbr; i--) {
			for (var H = 0; H < FieldNames.length; H++) {
				Value(FieldNames[H] + i, What(FieldNames[H] + (i - 1)));
			}
		}
		
		//empty the selected slot
		tDoc.resetForm(Fields);
		
		IsNotFeatMenu = true;
	}
}

//delete a feat at the position wanted and move the rest up
function FeatDelete(itemNmbr) {
	var maxNmbr = FieldNumbers.feats;
	maxNmbr = itemNmbr > (maxNmbr - 4) || What("Feat Name " + (maxNmbr - 4)) ? maxNmbr : maxNmbr - 4;//stop at the end of the first page if last one on first page is empty
	var FieldNames = [
		"Feat Name ",
		"Feat Note ",
		"Feat Description "
	];
	var Fields = [];
	var EndFields = [];
	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(FieldNames[F] + itemNmbr);
		EndFields.push(FieldNames[F] + maxNmbr);
	}
	
	//delete the currently selected line so that the feats code is removed as well
	tDoc.resetForm(Fields);
	
	//move every line up one space, starting with the selected line
	IsNotFeatMenu = false;
	for (var i = itemNmbr; i < maxNmbr; i++) {
		for (var H = 0; H < FieldNames.length; H++) {
			Value(FieldNames[H] + i, What(FieldNames[H] + (i + 1)));
		};
	}
	IsNotFeatMenu = true;
	
	//delete the contents of the final line
	tDoc.resetForm(EndFields);
}

//Make menu for the button on each Attack line and parse it to Menus.attacks
function MakeWeaponMenu() {
	var QI = event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : event.target.name.substring(0, event.target.name.indexOf("Comp."));

	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			var disable = false;
			if ((array[i] === "Move up" && itemNmbr === 1) || (array[i] === "Move down" && itemNmbr === maxItems) || (array[i] === "Insert empty attack" && (!theField || itemNmbr === maxItems))) {
				disable = true;
			} else if (!theField && !isEquipment && array[i] === "Copy to Adventuring Gear (page 2)") {
				disable = true;
			}
			item.push({
				cName : array[i],
				cReturn : array[i],
				bEnabled : !disable
			});
		}
	};

	var menuLVL2 = function (menu, name, array) {
		menu.cName = name;
		menu.oSubMenu = [];
		var lookIt = What(prefix + "BlueText." + Q + "Attack." + itemNmbr + ".Weight Title");
		for (var i = 0; i < array.length; i++) {
			menu.oSubMenu.push({
				cName : array[i].capitalize(),
				cReturn : name + "#" + array[i],
				bMarked : lookIt === array[i]
			})
		}
	};

	//make the attack menu
	var attackMenu = [];
	var itemNmbr = Number(event.target.name.slice(-1));
	var maxItems = QI ? FieldNumbers.attacks : 3;
	var theField = What("Manual Attack Remember") === "No" ? What(prefix + Q + "Attack." + itemNmbr + ".Weapon Selection") : What(prefix + Q + "Attack." + itemNmbr + ".Weapon");
	var theWea = CurrentWeapons.known[itemNmbr - 1];
	var isWeapon = QI && ((!theWea[0] && CurrentWeapons.field[itemNmbr - 1]) || (theWea[0] && WeaponsList[theWea[0]].weight));
	var isEquipment = QI && What("BlueText.Attack." + itemNmbr + ".Weight") && (What("Manual Attack Remember") === "Yes" || isWeapon) ? true : false;
	
	//decide what items to put on there
	var menuItems = [["Move up", "Move down"], ["-", "Copy to Adventuring Gear (page 2)"], ["-", "Insert empty attack", "Delete attack", "Clear attack"]];
	var attackMenuItems = QI ? menuItems[0].concat(menuItems[1]).concat(menuItems[2]) : menuItems[0].concat(menuItems[2]);
	menuLVL1(attackMenu, attackMenuItems);
	
	if (!typePF) {
		//make the color menu
		var ColorMenu = [];
		var ColorArray = ["black"]; //add a black option
		
		//add all the colours to the tempArray, ommitting some if not using the full (bonus) version
		for (var key in ColorList) {
			ColorArray.push(key);
		};
		ColorArray.sort();
		ColorArray.unshift("same as headers", "same as dragon heads", "-");
		menuLVL2(ColorMenu, "Outline Color", ColorArray);
		
		//add the colormenu to the attack menu
		attackMenu.push({cName : "-"});
		attackMenu.push(ColorMenu);
	}
	
	if (QI && CurrentEvals.atkStr) {
		menuLVL1(attackMenu, ["-", "Show what things are affecting the attack calculations"]);
	}
	
	//set the complete menu as the global variable
	Menus.attacks = attackMenu;
};

//call the weapon menu and do something with the results
function WeaponOptions() {
	var MenuSelection = getMenu("attacks");
	
	if (MenuSelection === undefined) return;
	tDoc.delay = true;
	tDoc.calculate = false;
	
	thermoM("start"); //start a progress dialog
	thermoM("Weapon menu option..."); //change the progress
	
	var QI = event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : event.target.name.substring(0, event.target.name.indexOf("Comp."));
	var maxItems = QI ? FieldNumbers.attacks : 3;

	var itemNmbr = Number(event.target.name.slice(-1));
	var FieldNames = [
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
	var Fields = [], FieldsValue = [], FieldsUp = [], FieldsUpValue = [], FieldsDown = [], FieldsDownValue = [];

	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(prefix + FieldNames[F][0] + Q + "Attack." + itemNmbr + FieldNames[F][1]);
		FieldsValue.push(What(Fields[F]));
		if (itemNmbr !== 1) {
			FieldsUp.push(prefix + FieldNames[F][0] + Q + "Attack." + (itemNmbr - 1) + FieldNames[F][1]);
			FieldsUpValue.push(What(FieldsUp[F]));
		}
		if (itemNmbr !== maxItems) {
			FieldsDown.push(prefix + FieldNames[F][0] + Q + "Attack." + (itemNmbr + 1) + FieldNames[F][1]);
			FieldsDownValue.push(What(FieldsDown[F]));
		}
	}
	var IconFld = !typePF ? tDoc.getField(prefix + "Image." + Q + "Attack." + itemNmbr).buttonGetIcon() : "";
	var findWeaps = false;
	switch (MenuSelection[0]) {
	 case "move up":
		thermoM("Moving the attack up..."); //change the progress dialog text
		IsNotWeaponMenu = false;
		for (var H = 0; H < FieldNames.length; H++) {
			Value(FieldsUp[H], FieldsValue[H]);
			Value(Fields[H], FieldsUpValue[H]);
			if (!QI && (/description/i).test(Fields[H])) SwapTooltip(FieldsUp[H], Fields[H])
			thermoM(H/FieldNames.length); //increment the progress dialog's progress
		};
		if (!typePF) {
			var IconUp = tDoc.getField(prefix + "Image." + Q + "Attack." + (itemNmbr - 1)).buttonGetIcon();
			tDoc.getField(prefix + "Image." + Q + "Attack." + (itemNmbr - 1)).buttonSetIcon(IconFld);
			tDoc.getField(prefix + "Image." + Q + "Attack." + itemNmbr).buttonSetIcon(IconUp);
		}
		IsNotWeaponMenu = true;
		findWeaps = true;
		break;
	 case "move down":
		thermoM("Moving the attack down..."); //change the progress dialog text
		IsNotWeaponMenu = false;
		for (var H = 0; H < FieldNames.length; H++) {
			Value(FieldsDown[H], FieldsValue[H]);
			Value(Fields[H], FieldsDownValue[H]);
			if (!QI && (/description/i).test(Fields[H])) SwapTooltip(FieldsDown[H], Fields[H])
			thermoM(H/FieldNames.length); //increment the progress dialog's progress
		};
		if (!typePF) {
			var IconDown = tDoc.getField(prefix + "Image." + Q + "Attack." + (itemNmbr + 1)).buttonGetIcon();
			tDoc.getField(prefix + "Image." + Q + "Attack." + (itemNmbr + 1)).buttonSetIcon(IconFld);
			tDoc.getField(prefix + "Image." + Q + "Attack." + itemNmbr).buttonSetIcon(IconDown);
		}
		IsNotWeaponMenu = true;
		findWeaps = true;
		break;
	 case "copy to adventuring gear (page 2)":
		thermoM("Copying the attack to the equipment on page 2..."); //change the progress dialog text
		AddToInv("gear", "r", FieldsValue[3], "", FieldsValue[7], "", false, false, false, true);
		break;
	 case "insert empty attack":
		thermoM("Inserting empty attack..."); //change the progress dialog text
		WeaponInsert(itemNmbr);
		break;
	 case "delete attack":
		thermoM("Deleting attack..."); //change the progress dialog text
		WeaponDelete(itemNmbr);
		break;
	 case "clear attack":
		thermoM("Clearing attack..."); //change the progress dialog text
		tDoc.resetForm(Fields);
		if (!QI) AddTooltip(Fields[12], "Description and notes");
		//reset the color outline
		ApplyAttackColor(itemNmbr);
		findWeaps = true;
		break;
	 case "outline color":
		thermoM("Changing the attack outline color..."); //change the progress dialog text
		ApplyAttackColor(itemNmbr, MenuSelection[1]);
		break;
	 case "show what things are affecting the attack calculations":
		if (CurrentEvals.atkStr) {
			ShowDialog("Things Affecting the Attack Calculations", CurrentEvals.atkStr);
		}
		break;
	}
	
	//re-populate the CurrentWeapons variable because of the thing that just changed
	if (findWeaps && QI) {
		FindWeapons();
	} else if (findWeaps) {
		FindCompWeapons(undefined, prefix);
	}
	
	thermoM("stop"); //stop the top progress dialog
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
};

//insert a weapon at the position wanted
function WeaponInsert(itemNmbr) {
	var QI = !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : event.target.name.substring(0, event.target.name.indexOf("Comp."));
	var maxItems = QI ? FieldNumbers.attacks : 3;
	var theField = What("Manual Attack Remember") === "No" ? ".Weapon Selection" : ".Weapon";

	//stop the function if the selected slot is already empty
	if (What(prefix + Q + "Attack." + itemNmbr + theField) === "") {
		return;
	}

	//look for the first empty slot below the slot
	var endslot = "";
	for (var i = itemNmbr + 1; i <= maxItems; i++) {
		if (What(prefix + Q + "Attack." + i + theField) === "") {
			endslot = i;
			i = (maxItems + 1);
		}
	}
	
	var FieldNames = [
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
	var Fields = [];
	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(prefix + FieldNames[F][0] + Q + "Attack." + itemNmbr + FieldNames[F][1]);
	}

	//only continue if an empty slot was found in the fields
	if (endslot) {
		//cycle to the slots starting with the empty one and add the values of the one above
		IsNotWeaponMenu = false;
		for (var i = endslot; i > itemNmbr; i--) {
			//move the values
			for (var H = 0; H < FieldNames.length; H++) {
				var fromFld = prefix + FieldNames[H][0] + Q + "Attack." + (i - 1) + FieldNames[H][1];
				Value(prefix + FieldNames[H][0] + Q + "Attack." + i + FieldNames[H][1], What(fromFld), !QI && (/description/i).test(FieldNames[H][1]) ? Who(fromFld) : undefined);
			}
			if (!typePF) {
				var theIcon = tDoc.getField(prefix + "Image." + Q + "Attack." + (i - 1)).buttonGetIcon();
				tDoc.getField(prefix + "Image." + Q + "Attack." + i).buttonSetIcon(theIcon);
			}
		}
		
		//empty the selected slot
		tDoc.resetForm(Fields);
		if (!QI) AddTooltip(Fields[12], "Description and notes");
		IsNotWeaponMenu = true;
		
		//re-populate the CurrentWeapons variable because of the thing that just changed
		if (QI) {
			FindWeapons();
		} else {
			FindCompWeapons(undefined, prefix);
		}
	}
}

//delete a weapon at the position wanted and move the rest up
function WeaponDelete(itemNmbr) {
	var QI = !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : event.target.name.substring(0, event.target.name.indexOf("Comp."));
	var maxItems = QI ? FieldNumbers.attacks : 3;
	
	var FieldNames = [
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
	var Fields = [];
	var EndFields = [];
	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(prefix + FieldNames[F][0] + Q + "Attack." + itemNmbr + FieldNames[F][1]);
		EndFields.push(prefix + FieldNames[F][0] + Q + "Attack." + maxItems + FieldNames[F][1]);
	}
	
	//delete the currently selected line so that the weapons code is removed as well
	tDoc.resetForm(Fields);
	
	//move every line up one space, starting with the selected line
	IsNotWeaponMenu = false;
	for (var i = itemNmbr; i < maxItems; i++) {
		if (!typePF) {
			//move the images, for every line that contains a weapon
			var theColorField = prefix + "BlueText." + Q + "Attack." + (i + 1) + ".Weight Title";
			if (!QI || (i !== (maxItems - 1) && What(theColorField) !== tDoc.getField(theColorField).defaultValue)) {
				var theIcon = tDoc.getField(prefix + "Image." + Q + "Attack." + (i + 1)).buttonGetIcon();
				tDoc.getField(prefix + "Image." + Q + "Attack." + i).buttonSetIcon(theIcon);
			}
		}
		
		//move the values
		for (var H = 0; H < FieldNames.length; H++) {			
			var fromFld = prefix + FieldNames[H][0] + Q + "Attack." + (i + 1) + FieldNames[H][1];
			Value(prefix + FieldNames[H][0] + Q + "Attack." + i + FieldNames[H][1], What(fromFld), !QI && (/description/i).test(FieldNames[H][1]) ? Who(fromFld) : undefined);
		};
	}
	
	//delete the contents of the final line
	tDoc.resetForm(EndFields);
	if (!QI) AddTooltip(EndFields[12], "Description and notes");
	
	//reset the final line's image to the default
	ApplyAttackColor(maxItems, "");
	IsNotWeaponMenu = true;
		
	//re-populate the CurrentWeapons variable because of the thing that just changed
	if (QI) {
		FindWeapons();
	} else {
		FindCompWeapons(undefined, prefix);
	}
}

//show (true) or hide (false) the subsection of "attuned magical items" in the adventure gear table
function ShowAttunedMagicalItems(currentstate) {
	if (currentstate === undefined) currentstate = !eval(What("Adventuring Gear Remember"));
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
	var AbilitySaveArray = [];
	
	//check all the classes
	for (var aClass in classes.known) {
		var CurrentAbilitySave = CurrentClasses[aClass].abilitySave;
		if (CurrentAbilitySave && AbilitySaveArray.indexOf(CurrentAbilitySave) === -1) {
			AbilitySaveArray.push(CurrentAbilitySave);
		}
	}
	
	//check the race
	var CurrentAbilitySave = CurrentRace.abilitySave;
	if (CurrentAbilitySave && AbilitySaveArray.indexOf(CurrentAbilitySave) === -1) {
		AbilitySaveArray.push(CurrentAbilitySave);
	}
	
	//put the ability save DC right, and show both if more than one class with ability save DC
	if (AbilitySaveArray[0]) {
		PickDropdown("Spell DC 1 Mod", AbilitySaveArray[0]);
	} else {
		PickDropdown("Spell DC 1 Mod", 0);
	}
	
	if (AbilitySaveArray[1]) {
		Toggle2ndAbilityDC("show");
		PickDropdown("Spell DC 2 Mod", AbilitySaveArray[1]);
	} else {
		Toggle2ndAbilityDC("hide");
	}
}

//remove the item at the line number, and move all things below it up so that no empty line is left
//Type is the name of the field without the number; Line is the number of the line; Total is the total amount of fields there are
function DeleteItemType(Type, Line, Total) {
	//move every line up one space, starting with the selected line
	for (var D = Line; D < Total; D++) {
		Value(Type + D, What(Type + (D + 1)), Who(Type + (D + 1)));
	}
	
	//delete the contents of the final line
	tDoc.resetForm([Type + Total]);
	//set the tooltip of the final line to nothing
	AddTooltip(Type + Total, "");
}

//set the global variable for the form field highlighting; and reset it if applicable
function SetHighlighting() {
	if (!IsNotReset) { //if called during a reset
		//set the remember highlight colour to the sheet's default
		tDoc.getField("Highlighting").fillColor = ["RGB", 0.9, 0.9, 1];
		AddTooltip("Highlighting", "sheet default");
		Highlighting.rememberState = eval(What("Highlighting"));
		Highlighting.rememberColor = tDoc.getField("Highlighting").fillColor;
	}
	app.runtimeHighlight = Highlighting.rememberState;
	app.runtimeHighlightColor = Highlighting.rememberColor;
}

//set spell slots checkboxes, use the value of the field to set the picture and right checkbox form fields [through field validation]
var ignoreSetSpellSlotsCheckboxes = false;
function SetSpellSlotsCheckboxes(SpellLVL, theSlots, onlyDisplay) {
	if (ignoreSetSpellSlotsCheckboxes) return;
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
	tDoc.delay = true;
	tDoc.calculate = false;
	
	//if the sheet is currently flattened, undo that first
	if (What("MakeMobileReady Remember") !== "") MakeMobileReady(false);
	
	var toShow = eval(What("SpellSlotsRemember"));
	
	//define a function to show (showOrHide = true) or hide (showOrHide = false) all the spellslots; suffix is "" or "2"
	var doSpellSlots = function(showOrHide, suffix, prefix) {
		var HiddenVisible = showOrHide ? "Hide" : "Show";
		var VisibleHidden = showOrHide ? "Show" : "Hide"; 
		var NoPrintHidden = showOrHide && What("BlueTextRemember") === "Yes" ? "DontPrint" : "Hide";
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

	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
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

//add a script to be run upon start of the sheet
function AddUserScript() {
	var theUserScripts = What("User Script").match(/(.|\r){1,65500}/g);
	if (!theUserScripts) theUserScripts = [];
	var defaultTxt = toUni("The JavaScript") + " you put into the field below will be run immediately and whenever the sheet is opened, using eval().\nIf the script results in an error you will be informed immediately and the script will not be added to the sheet or saved.\n" + toUni("This overwrites") + " whatever code you have previously added to the sheet, when you click \"Add Script to Sheet\".\n" + toUni("Resetting the sheet is recommended") + " before you have enter custom content into it (or use a fresh one).\n\n" + toUni("Be warned") + ", things you do here can break the sheet! You can " + toUni("ask MorePurpleMoreBetter for help") + " using the contact bookmarks.\n\n";
	var extraTxt = toUni("A character limit of 65642") + " applies to the area below. You can add longer scripts by using the \"Open Another Dialogue\" button. That way you get more dialogues like this one. When you press \"Add Script to Sheet\", the code of all dialogues will be joined together (with no characters put inbetween!), is then run/tested and added to the sheet as a whole.\n" + toUni("An error will result in all content being lost") + ", so please save it somewhere else before exiting this dialogue!";
	var getTxt = toUni("Using the proper syntax") + ", you can add homebrew materials for classes, races, weapons, feats, spells, backgrounds, creatures, etc. etc.\nSection 3 of the " + toUni("FAQ") + " has more information and links to this syntax, or you can use the \"Syntax\" buttons above.\n\n" + toUni("Pre-Written Scripts") + " can be found using the \"Extras\" buttons above. These include 3rd-party materials such as the 'Remastered: Way of the Four Elements', DMs Guild creations by Matt Mercer (Blood Hunter, Gunslinger, College of the Maestro), Michael Wolf (Shaman), and more...\n\n" + toUni("Use the JavaScript Console") + " to better determine errors in your script (with the \"JS Console\" button).";
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
			getTxt : getTxt,
			defaultTxt : defaultTxt,
			extraTxt : extraTxt,
			script: theUserScripts.length >= diaIteration ? theUserScripts[diaIteration - 1] : "",

			initialize: function(dialog) {
				dialog.load({
					"img1" : allIcons.import,
					"jscr": this.script,
					"head": "Add custom JavaScript that is run on startup (dialogue " + this.iteration + "/" + this.diaMax + ")",
					"txt0": this.iteration === 1 ? this.defaultTxt + this.extraTxt : this.extraTxt,
					"txt1": this.getTxt
				});
				dialog.enable({
					bPre : this.iteration > 1
				})
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
				var results = dialog.store();
				this.script = results["jscr"];
				dialog.end("bfaq");
			},
			bPre: function(dialog) {
				var results = dialog.store();
				this.script = results["jscr"];
				dialog.end("bpre");
			},
			bDBA: function(dialog) {
				contactMPMB("additions");
			},
			bDBS: function(dialog) {
				contactMPMB("syntax");
			},
			bGHA: function(dialog) {
				contactMPMB("additionsGit");
			},
			bGHS: function(dialog) {
				contactMPMB("syntaxGit");
			},
			bCon: function(dialog) {
				var results = dialog.store();
				this.script = results["jscr"];
				dialog.end("bcon");
			},
			description : {
				name : "Add your custom JavaScript that has to run on startup",
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
								alignment : "align_bottom",
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
							type : "static_text",
							item_id : "txt0",
							alignment : "align_fill",
							font : "dialog",
							char_height : diaIteration === 1 ? 17 : 6,
							width : 750
						}, {
							type : "view",
							align_children : "align_distribute",
							width : 750,
							elements : [{
								type : "button",
								item_id : "bFAQ",
								name : "Open the FAQ",
								font : "dialog",
								bold : true
							}, {
								type : "button",
								item_id : "bDBA",
								name : "Extras - Dropbox",
								font : "dialog",
								bold : true
							}, {
								type : "button",
								item_id : "bDBS",
								name : "Syntax - Dropbox",
								font : "dialog",
								bold : true
							}, {
								type : "button",
								item_id : "bGHA",
								name : "Extras - GitHub",
								font : "dialog",
								bold : true
							}, {
								type : "button",
								item_id : "bGHS",
								name : "Syntax - GitHub",
								font : "dialog",
								bold : true
							}, {
								type : "button",
								item_id : "bCon",
								name : "JS Console",
								font : "dialog",
								bold : true
							}]
						}, {
							type : "static_text",
							item_id : "txt1",
							alignment : "align_fill",
							font : "dialog",
							char_height : 11,
							width : 750
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
						width : 750,
						elements : [{
							type : "button",
							name : "<< Go to Previous Dialogue",
							item_id : "bPre",
							alignment : "align_right"
						}, {
							type : "ok_cancel_other",
							other_name : "Open Another Dialogue",
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
			setDialogName(AddUserScript_dialog, "OKbt", "ok_name", "Go to Next Dialogue >>");
		};
		var theDialog = app.execDialog(AddUserScript_dialog);
		theUserScripts[diaIteration - 1] = AddUserScript_dialog.script;
		if (clean(AddUserScript_dialog.script, [" ", "\t"]).slice(-1) === "}") theUserScripts[diaIteration - 1] += ";\n";
		if (theDialog === "ok" && moreDialogues) theDialog = "next";
		return theDialog;
	};

	do {
		var askForScripts = getDialog(diaIteration);
		if (askForScripts === "bpre") {
			diaIteration -= 1;
		} else if (askForScripts === "bfaq") {
			tDoc.exportDataObject({ cName: "FAQ.pdf", nLaunch: 2 });
		} else if (askForScripts === "bcon") {
			console.println("\nYour code has been copied below, but hasn't been commited/saved to the sheet!\nYou can run code here by selecting the appropriate lines and pressing " + (isWindows ? "Ctrl+Enter" : "Command+Enter") + ".\n\n" + theUserScripts.join(""));
			console.show();
		} else {
			diaIteration += 1;
		};
	}
	while (askForScripts !== "ok" && askForScripts !== "cancel" && askForScripts !== "bcon");

	if (askForScripts === "ok") {
		theUserScripts = theUserScripts.join("");
		try {
			eval(theUserScripts);
			Value("User Script", theUserScripts.replace(/UpdateDropdown\([^\)]*\)\;?\r?/g, ""));
		} catch (e) {
			app.alert({
				cMsg : "The script you entered is faulty, it returns the following error when run:\n\"" + e + "\"\n\nYour script has not been added to the sheet, please try again after fixing the error.\n\nIf you run your code from the console, it will give you a line number for where the error is. You can open this console from inside the \"Add Custom Script\" dialogue.",
				nIcon : 0,
				cTitle : "Error in your script"
			});
			var goOn = false;
		};
	};
};

//run the custom defined user script, if any exists
function RunUserScript() {
	var toRunScript = What("User Script");
	try {
		if (toRunScript) {
			eval(toRunScript);
		}
	}
	catch (e) {
		app.alert({
			cMsg : "The script entered by a user to run on startup is faulty, it returns the following error when run:\n\"" + e + "\"\n\nThe script has been removed from this pdf.",
			nIcon : 0,
			cTitle : "Error in user-defined script"
		});
		tDoc.resetForm(["User Script"]);
	}
}

//make the appropriate attack field a different color, depending on the menu entry
function ApplyAttackColor(attackNmbr, aColour, type, prefix) {
	if (typePF) return; //don't do this function in the Printer-Friendly version
	var QI = type ? type !== "Comp." : !event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1;
	var prefixA = [""];
	if (!QI && event.target && event.target.name && !prefix) {
		prefixA = [event.target.name.substring(0, event.target.name.indexOf("Comp."))];
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
			if (!ColorList[colour]) break;
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
function setColorThemes() {
	if (typePF) return; //don't do this function in the Printer-Friendly version
	ApplyColorScheme();
	ApplyDragonColorScheme();
	ApplyHPDragonColorScheme();
	ApplyAttackColor("", "", "Default");
	ApplyAttackColor("", "", "Comp.");
}

//calculate the proficiency bonus (field calculation)
function ProfBonus() {
	var QI = event.target.name.indexOf("Comp.") === -1;
	var prefix = QI ? "" : event.target.name.substring(0, event.target.name.indexOf("Comp."));
	var lvl = QI ? What("Character Level") : What(prefix + "Comp.Use.HD.Level");
	var ProfMod = QI ? What("Proficiency Bonus Modifier") : 0;
	var useDice = QI ? tDoc.getField("Proficiency Bonus Dice").isBoxChecked(0) === 1 : tDoc.getField(prefix + "BlueText.Comp.Use.Proficiency Bonus Dice").isBoxChecked(0) === 1;
	
	if (lvl >= 17) {
		event.target.submitName = 6 + ProfMod;
	} else if (lvl >= 13) {
		event.target.submitName = 5 + ProfMod;
	} else if (lvl >= 9) {
		event.target.submitName = 4 + ProfMod;
	} else if (lvl >= 5) {
		event.target.submitName = 3 + ProfMod;
	} else if (lvl >= 1) {
		event.target.submitName = 2 + ProfMod;
	} else {
		event.target.submitName = 0 + ProfMod;
	}
	
	if (useDice || !lvl) {
		event.value = "";
	} else {
		event.value = event.target.submitName;
	}
}

//show the proficiency die (field format)
function ProfBonusDisplay(input) {
	var QI = event.target.name.indexOf("Comp.") === -1;
	var prefix = QI ? "" : event.target.name.substring(0, event.target.name.indexOf("Comp."));
	var ProfB = QI ? event.target.submitName : input;
	var useDice = QI ? tDoc.getField("Proficiency Bonus Dice").isBoxChecked(0) === 1 : tDoc.getField(prefix + "BlueText.Comp.Use.Proficiency Bonus Dice").isBoxChecked(0) === 1;
	if (useDice) {
		event.value = GetProfDice(ProfB);
	} else {
		event.value = !isNaN(event.value) && event.value > 0 ? "+" + event.value : event.value;
	}
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