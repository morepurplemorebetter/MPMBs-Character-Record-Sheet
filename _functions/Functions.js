var tDoc = this;
function MakeDocName() {
	return "MorePurpleMoreBetter's D&D 5th edition " + (tDoc.info.SpellsOnly ? "Complete " + tDoc.info.SpellsOnly.capitalize() + " Spell Sheet" : (tDoc.info.AdvLogOnly ? "Adventure Logsheet" : "Character Record Sheet")) + " v" + tDoc.info.SheetVersion.toString() + " (" + tDoc.info.SheetType + ")";
};

function Hide(field) {
	tDoc.getField(field).display = display.hidden;
};

function DontPrint(field) {
	tDoc.getField(field).display = display.noPrint;
};

function Show(field) {
	tDoc.getField(field).display = display.visible;
};

function Editable(field) {
	tDoc.getField(field).readonly = false;
};

function Uneditable(field) {
	tDoc.getField(field).readonly = true;
};

function Value(field, FldValue, tooltip) {
	if (!tDoc.getField(field)) return false;
	tDoc.getField(field).value = FldValue;
	if (tooltip !== undefined) {
		tDoc.getField(field).userName = tooltip;
	}
};

function What(field) {
	return tDoc.getField(field) ? tDoc.getField(field).value : "";
}

function Who(field) {
	return tDoc.getField(field) ? tDoc.getField(field).userName : "";
}

function Clear(field) {
	tDoc.getField(field).clearItems();
};

function AddTooltip(field, tooltip) {
	tDoc.getField(field).userName = tooltip;
};

function SwapTooltip(field1, field2) {
	tt1 = Who(field1);
	tt2 = Who(field2);
	AddTooltip(field1, tt2);
	AddTooltip(field2, tt1);
};

function Checkbox(field, FldValue, tooltip) {
	if (!tDoc.getField(field)) return false;
	var Checkit = (FldValue === undefined) ? true : FldValue;
	var checkNo = isArray(tDoc.getField(field).page) ? tDoc.getField(field).page.length : 1;
	for (var c = 0; c < checkNo; c++) {
		tDoc.getField(field).checkThisBox(c, Checkit);
		if (tooltip !== undefined) {
			tDoc.getField(field).userName = tooltip;
		}
	}
};

function desc(arr) {
	return "\n   " + arr.join("\n   ");
};

//adding a way of capitalizing every first letter of every word in a string
String.prototype.capitalize = function () {
	var string = this.toLowerCase().replace(/([^']|^)\b\w/g, function (m) {
		return m.toUpperCase();
	});
	
	// Certain minor words should be left lowercase unless 
	// they are the first or last words in the string
	lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 
	'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
	for (var Ca = 0; Ca < lowers.length; Ca++)
	string = string.replace(new RegExp('\\W' + lowers[Ca] + '\\W', 'g'), function(txt) {
		return txt.toLowerCase();
	});
	
	return string;
};
Number.prototype.capitalize = function () {
	return this.toString().capitalize();
};
RegExp.prototype.capitalize = function () {
	return this.toString().capitalize();
};

//adding a way to convert a string with special characters into a regular expression
String.prototype.RegEscape = function () {
	return this.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
Number.prototype.RegEscape = function () {
	return this.toString().RegEscape();
};
RegExp.prototype.RegEscape = function () {
	return this.toString().RegEscape();
};

//define a way for numbers and regular expressions to return an indexOf(), match(), replace(), search(), slice(), split(), substring(), substr(), toLowerCase(), or toUpperCase() to avoid errors
Number.prototype.indexOf = function (searchValue, fromIndex) {
	return this.toString().indexOf(searchValue, fromIndex);
};
Number.prototype.match = function (regexpObj) {
	return this.toString().match(regexpObj);
};
Number.prototype.replace = function (regexp_substr, newSubStr_function) {
	return this.toString().replace(regexp_substr, newSubStr_function);
};
Number.prototype.search = function (regexpObj) {
	return this.toString().search(regexpObj);
};
Number.prototype.slice = function (beginSlice, endSlice) {
	return this.toString().slice(beginSlice, endSlice);
};
Number.prototype.split = function (separator, limit) {
	return this.toString().split(separator, limit);
};
Number.prototype.substring = function (indexStart, indexEnd) {
	return this.toString().substring(indexStart, indexEnd);
};
Number.prototype.substr = function (start, length) {
	return this.toString().substr(start, length);
};
Number.prototype.toLowerCase = function () {
	return this.toString().toLowerCase();
};
Number.prototype.toUpperCase = function () {
	return this.toString().toUpperCase();
};
RegExp.prototype.indexOf = function (searchValue, fromIndex) {
	return this.toString().indexOf(searchValue, fromIndex);
};
RegExp.prototype.match = function (regexpObj) {
	return this.toString().match(regexpObj);
};
RegExp.prototype.replace = function (regexp_substr, newSubStr_function) {
	return this.toString().replace(regexp_substr, newSubStr_function);
};
RegExp.prototype.search = function (regexpObj) {
	return this.toString().search(regexpObj);
};
RegExp.prototype.slice = function (beginSlice, endSlice) {
	return this.toString().slice(beginSlice, endSlice);
};
RegExp.prototype.split = function (separator, limit) {
	return this.toString().split(separator, limit);
};
RegExp.prototype.substring = function (indexStart, indexEnd) {
	return this.toString().substring(indexStart, indexEnd);
};
RegExp.prototype.substr = function (start, length) {
	return this.toString().substr(start, length);
};
RegExp.prototype.toLowerCase = function () {
	return this.toString().toLowerCase();
};
RegExp.prototype.toUpperCase = function () {
	return this.toString().toUpperCase();
};
Array.prototype.match = function (regexpObj) {
	return this.toString().match(regexpObj);
};
Array.prototype.replace = function (regexp_substr, newSubStr_function) {
	return this.toString().replace(regexp_substr, newSubStr_function);
};
Array.prototype.search = function (regexpObj) {
	return this.toString().search(regexpObj);
};
Array.prototype.split = function (separator, limit) {
	return this.toString().split(separator, limit);
};
Array.prototype.substring = function (indexStart, indexEnd) {
	return this.toString().substring(indexStart, indexEnd);
};
Array.prototype.substr = function (start, length) {
	return this.toString().substr(start, length);
};
Array.prototype.toLowerCase = function () {
	return this.toString().toLowerCase();
};
Array.prototype.toUpperCase = function () {
	return this.toString().toUpperCase();
};

function ChangeWidth(field, amount) {
	var Fld = tDoc.getField(field);
	var aRect = Fld.rect; // Make a copy of Fld.rect
	aRect[2] += amount; // Increment lower right x coordinate by given amount
	Fld.rect = aRect; // Update the value of Fld.rect
	Fld.value = Fld.value; //Set the value of the Fld to match the original value, as to not mess up the font scaling
}

function ClearIcons(field, clickMe) {
	if (!tDoc.getField(field)) return false;
	var iconFld = clickMe ? "SaveIMG.ClickMeIcon" : "SaveIMG.EmptyIcon";
	var oIcon = tDoc.getField(iconFld).buttonGetIcon();
	tDoc.getField(field).buttonSetIcon(oIcon);
	if (clickMe) {
		DontPrint(field);
	} else if (tDoc.getField(field).display === display.noPrint) {
		Show(field);
	}
};

function PickDropdown(field, FldValue) {
	var thisFld = tDoc.getField(field);
	if (!thisFld) return;
	if (!isNaN(FldValue) && thisFld.type === "combobox") {
		tDoc.getField(field).currentValueIndices = Number(FldValue);
	} else {
		Value(field, FldValue);
	}
};

function isArray(input) {
	var giveback = false;
	if (Object.prototype.toString.call(input) === "[object Array]") {
		giveback = true;
	}
	return giveback;
};

function sign(x){return x>0?1:x<0?-1:x;}

function format1(extraDec, fixedDec, unit) {
	var plusDec = extraDec && !isNaN(extraDec) ? Number(extraDec) : 0;
	var decShow = 0;
	AFNumber_Format(2 + plusDec, 1, 0, 0, "", false);
	var decLoc = event.value.indexOf(".");
	var decSep = What("Decimal Separator");
	
	decShow = (3 + plusDec) - decLoc;
	decShow = decShow < 0 ? 0 : decShow;
	
	if (fixedDec !== undefined && !isNaN(fixedDec) && fixedDec !== "") {
		decShow = fixedDec;
	}
	
	if (decSep === "dot") {
		AFNumber_Format(decShow, 0, 0, 0, "", false);
		if (decShow) {
			// Replace any trailing zeroes with nothing
			event.value = event.value.replace(/[0]+$/, "");
			// Replace a trailing decimal with nothing
			event.value = event.value.replace(/\.$/, "");
		}
	} else if (decSep === "comma") {
		AFNumber_Format(decShow, 2, 0, 0, "", false);
		if (decShow) {
			// Replace any trailing zeroes with nothing
			event.value = event.value.replace(/[0]+$/, "");
			// Replace a trailing decimal with nothing
			event.value = event.value.replace(/,$/, "");
		}
	}
	
	if (event.value !== "" && unit && unit === "mass") {
		var UnitSystem = What("Unit System");
		if (UnitSystem === "imperial") {
			event.value += " lb";
		} else if (UnitSystem === "metric") {
			event.value += " kg";
		}
	}
}

//replace all commas and dots with the set decimal separator
function format2() {
	var theDec = What("Decimal Separator") === "dot" ? "." : ",";
	if (event.value) event.value = event.value.replace(/(\.|,)/, theDec);
}

function keystroke1(allowDec, allowNegative) {
	if (!event.willCommit) {
		if (allowDec) {
			var tests = !isNaN(event.change) || (event.change.match(/,|\./g) && (!event.value.match(/,|\./g) || event.value.substring(event.selStart, event.selEnd).match(/,|\./g)));
		} else {
			var tests = !isNaN(event.change);
		}
		if (allowNegative) {
			tests = tests || (event.change === "-" && event.selStart === 0 && (!event.value.match(/-/g) || event.value.substring(event.selStart, event.selEnd).match(/-/g)));
		}
		event.rc = tests;
	} else {
		event.rc = !isNaN(event.value.replace(/,/, "."));
	}
}

function keystroke2() {
	var allowedA = [".", ",", "-", "+", "*", "/"];
	var tests = event.value === "";
	if (!event.willCommit) {
		tests = !isNaN(event.change) || allowedA.indexOf(event.change) !== -1;
	} else if (event.value !== "") {
		tests = false;
		var toUse = event.value.replace(/(\.)+(\,)+/g, ",").replace(/(\.|\,)+/g, "$1");
		toUse = toUse.replace(/(\-)+(\+)+/g, "-").replace(/(\+|\-)+/g, "$1").replace(/(\*|\/|\+|\-)+/g, "$1").replace(/^(\*|\/)/, "");
		var toTest = toUse.replace(/,/g, ".");
		try {
			var tests = !isNaN(eval(toTest));
			event.value = toUse;
		} catch (err) {
			try {
				var tests = !isNaN(eval(toTest.slice(0, -1)));
				event.value = toUse.slice(0, -1);
			} catch (err) {
				var tests = false;
			}
		}
	}
	event.rc = tests;
}

function RoundTo(inputNmbr, roundNmbr, emptyAtZero, applyDec) {
	var input = isNaN(inputNmbr) ? Number(inputNmbr.replace(/,/g,".")) : inputNmbr, result = inputNmbr;
	
	if (roundNmbr && !isNaN(roundNmbr)) {
		if (roundNmbr >= 1) {
			result = Math.round(input / roundNmbr) * roundNmbr;
		} else if (roundNmbr > 0 && roundNmbr < 1) {
			result = Math.round(input * Math.pow(roundNmbr,-1)) / Math.pow(roundNmbr,-1);
		}
	}
	
	if (emptyAtZero && result === 0) {
		result = "";
	} else if (applyDec && result % 1 != 0 && What("Decimal Separator") === "comma") {
		result = result.replace(".", ",");
	}
	
	return result;
}

function NormDecimal(dec) {
  var i = 0;
  var first = ding.match(/,|\./);
  var result = dec.replace(/,|\./g, function(all, match) { return i++===0 ? first : ''; });
  return result;
}

//adding a way to see the number of keys in an object (i.e. length)
function ObjLength(theObj) {
	var size = 0;
	for (var thingy in theObj) {
		size++;
	}
	return size;
};

function MakeButtons() {
	var oIcon = null; // iconstream
	try {
		if (!tDoc.info.SpellsOnly) {
			oIcon = {
				count : 0,
				width : 20,
				height : 20,
				read : function (nBytes) {
					return ButtonIcons.layout.slice(this.count, this.count += nBytes);
				}
			};
			app.addToolButton({
				cName : "LayoutButton",
				cExec : minVer ? "MakeAdvLogMenu_AdvLogOptions(true);" : "MakePagesMenu(); PagesOptions();",
				oIcon : oIcon,
				cTooltext : toUni("Set Pages Layout") + "\nSelect which pages are visible in the sheet.\n\nYou can also add more instances of the following pages:\n   \u2022  Companion page;\n   \u2022  Notes page;\n   \u2022  Wild Shapes page.\n\nNote that if you add more pages or you hide/show the pages many times, the file size might increase.",
				nPos : 0,
				cLabel : "Layout"
			});
		}
		if (!minVer) {
			oIcon = {
				count : 0,
				width : 20,
				height : 20,
				read : function (nBytes) {
					return ButtonIcons.reset.slice(this.count, this.count += nBytes);
				}
			};
			app.addToolButton({
				cName : "ResetButton",
				cExec : "ResetAll();",
				oIcon : oIcon,
				cTooltext : toUni("Reset") + "\nReset the entire sheet and all form fields to their initial value.",
				nPos : 1,
				cLabel : "Reset"
			});
		}
		if (!tDoc.info.AdvLogOnly) {
			oIcon = {
				count : 0,
				width : 20,
				height : 20,
				read : function (nBytes) {
					return ButtonIcons.import.slice(this.count, this.count += nBytes);
				}
			};
			app.addToolButton({
				cName : "ImportExportButton",
				cExec : minVer ? "AddUserScript();" : "ImportExport_Button();",
				oIcon : oIcon,
				cTooltext :  minVer ? toUni("Add Custom Script") + "\nAdd a script to add new spells, modify spells and more, see FAQ." : toUni("Import / Export") + "\n \u2022  Import all the information from an old sheet directly;\n \u2022  Add custom script, see FAQ;\n \u2022  Alternatively, you can import or export data with the .xfdf file format. This method is depreciated, but might still be interesting if you only want to import the equipment sections or only the description sections.\n\nThe description sections include the top of first page, background page, notes, and companion description.",
				nPos : 2,
				cLabel : "Import"
			});
			oIcon = {
				count : 0,
				width : 20,
				height : 20,
				read : function (nBytes) {
					return ButtonIcons.sources.slice(this.count, this.count += nBytes);
				}
			};
			app.addToolButton({
				cName : "SourcesButton",
				cExec : "resourceDecisionDialog();",
				oIcon : oIcon,
				cTooltext : toUni("Select Sources") + "\nOpen a dialogue where you can select which sourcebooks and materials the sheet is allowed to use and which it has to excluded from the automation." + (this.info.SpellsOnly ? "\n\nHere you can select which sources are used for the spells or even exclude certain spells or spell schools. After you have set this, you will have to manually re-generate the spell sheet using the 'Spells' button/bookmark." : "\n\nHere you can make the sheet include all Unearthed Arcana material or even have the sheet exclude certain classes, races, spells, etc. etc.\n\nYou are advised to set the sources before filling out the sheet as it may cause certain fields to be reset."),
				nPos : 3,
				cLabel : "Sources"
			});
		}

		if (!tDoc.info.SpellsOnly) {
			oIcon = {
				count : 0,
				width : 20,
				height : 20,
				read : function (nBytes) {
					return ButtonIcons.textsize.slice(this.count, this.count += nBytes);
				}
			};
			app.addToolButton({
				cName : "SetTextOptionsButton",
				cExec : "MakeTextMenu_TextOptions();",
				oIcon : oIcon,
				cTooltext : toUni("Text Options") + "\nGives a dialog where you can:\n   \u2022  Set the font of all fillable fields" + "\n   \u2022  Set the font size of fields with multiple lines;\n   \u2022  Hide\/show the text lines on all pages" + (!typePF ? "" : ";\n   \u2022  Switch between boxes or lines for single-line fields."),
				nPos : 4,
				cLabel : "Text"
			});
		}
		
		if (!minVer) {
			oIcon = {
				count : 0,
				width : 20,
				height : 20,
				read : function (nBytes) {
					return ButtonIcons.automanual.slice(this.count, this.count += nBytes);
				}
			};
			app.addToolButton({
				cName : "SetToManualButton",
				cExec : "SetToManual_Button();",
				oIcon : oIcon,
				cTooltext : toUni("Auto / Manual") + "\nSwitch between manual or automatic calculation\/implementation of:\n   \u2022  Attacks;\n   \u2022  Background;\n   \u2022  Class;\n   \u2022  Feats;\n   \u2022  Race.",
				nPos : 5,
				cLabel : "Manual"
			});

			oIcon = {
				count : 0,
				width : 20,
				height : 20,
				read : function (nBytes) {
					return ButtonIcons.weight.slice(this.count, this.count += nBytes);
				}
			};
			app.addToolButton({
				cName : "WeightToCalcButton",
				cExec : "WeightToCalc_Button();",
				oIcon : oIcon,
				cTooltext : toUni("Weight Calculation") + "\nOpen the Total Weight dialogue where you can choose what is and what is not counted towards the Total Weight on the second page.\n\nIn the dialogue you can also select which encumbrance rules to use.",
				nPos : 6,
				cLabel : "Weight"
			});

			oIcon = {
				count : 0,
				width : 20,
				height : 20,
				read : function (nBytes) {
					return ButtonIcons.scores.slice(this.count, this.count += nBytes);
				}
			};
			app.addToolButton({
				cName : "AbilityScoresButton",
				cExec : "AbilityScores_Button();",
				oIcon : oIcon,
				cTooltext : toUni("Ability Scores") + "\nOpen the Ability Scores dialog where you can set them using their separate parts, see the Point Buy value, and apply a magic item that overrides.\n\nThis dialog also gives the option to add Honor/Sanity.",
				nPos : 7,
				cLabel : "Scores"
			});
			oIcon = {
				count : 0,
				width : 20,
				height : 20,
				read : function (nBytes) {
					return ButtonIcons.modifiers.slice(this.count, this.count += nBytes);
				}
			};
			app.addToolButton({
				cName : "BlueTextButton",
				cExec : "ToggleBlueText(What(\"BlueTextRemember\"));",
				oIcon : oIcon,
				cTooltext : toUni("Modifier Fields") + "\nHide\/show fields where you can manually add modifiers for:\n   \u2022  Ability save DC;\n   \u2022  Attacks to hit and damage bonusses;\n   \u2022  Attacks damage die;\n   \u2022  Proficiency bonus, or the use of proficiency dice;\n   \u2022  Saves;\n   \u2022  Skills, with Jack of All Trades and Remarkable Athlete;\n   \u2022  Number of spell slots;\n   \u2022  Initiative;\n   \u2022  Carrying capacity multiplier;\n   \u2022  Weights of armor, shield, weapons, and ammunition.\n\nThese are the so-called \"blue text fields\" and they won't print, even when they are visible.",
				cMarked : "event.rc = What(\"BlueTextRemember\") === \"Yes\";",
				nPos : 8,
				cLabel : "Mods"
			});
		}

		if (!tDoc.info.AdvLogOnly) {
			oIcon = {
				count : 0,
				width : 20,
				height : 20,
				read : function (nBytes) {
					return ButtonIcons.spells.slice(this.count, this.count += nBytes);
				}
			};
			app.addToolButton({
				cName : "SpellsButton",
				cExec : "MakeSpellMenu_SpellOptions();",
				oIcon : oIcon,
				cTooltext : toUni("Spells Options") + "\nGet a menu with the options to:\n   \u2022  Create a Spell Sheet;\n   \u2022  Select the sources for that Spell Sheet;\n   \u2022  Delete an existing Spell Sheet;" + (!typePF ? "\n   \u2022  Set the visibility of the Spell Slot check boxes to the Spell Sheet, the Limited Feature section, or both;" : "") + "\n   \u2022  Set the sheet to use Spell Points instead of Spell Slots.\n\nGenerating a Spell Sheet will involve filling out a dialog for each spellcasting class/race/feat. After that you can select which is included in the Spell Sheet and in what order.", //\n\nAlternatively you can create an empty Spell Sheet which you can fill out manually.",
				nPos : 9,
				cLabel : "Spells"
			});
		}
		
		if (!minVer) {
			oIcon = {
				count : 0,
				width : 20,
				height : 20,
				read : function (nBytes) {
					return ButtonIcons.league.slice(this.count, this.count += nBytes);
				}
			};
			app.addToolButton({
				cName : "AdventureLeagueButton",
				cExec : "ToggleAdventureLeague(What(\"League Remember\"));",
				oIcon : oIcon,
				cTooltext : toUni("Adventurers League") + "\nHide\/show fields for Adventurer's League play:\n   \u2022  'DCI' on the 1st page;\n   \u2022  'Faction' and 'Renown' on the 4th page;\n   \u2022  Fixed hp value on the 1st page;\n   \u2022  The action options from the DMG on the 1st page;\n   \u2022  Notes for action options from the DMG on the 3rd page.\n\nThis button also makes the \"Adventurers Logsheet\" visible if it isn't already.\n\nNote that this Character Generator\/Sheet offers some options that are not legal in Adventurer's League play regardless of enabling this button or not.",
				cMarked : "event.rc = What(\"League Remember\") === \"On\";",
				nPos : 10,
				cLabel : "League",
			});

			oIcon = {
				count : 0,
				width : 20,
				height : 20,
				read : function (nBytes) {
					return ButtonIcons.print.slice(this.count, this.count += nBytes);
				}
			};
			app.addToolButton({
				cName : "PrintButton",
				cExec : "PrintButton();",
				oIcon : oIcon,
				cTooltext : toUni("Print") + "\nSelect what pages you want to print and open the print dialog.\n\nThe pages you select will be remembered for the next time you press this button.\n\nYou also get an option to hide all fields on the sheet before printing.",
				nPos : 11,
				cLabel : "Print"
			});
		}
		
		oIcon = {
			count : 0,
			width : 20,
			height : 20,
			read : function (nBytes) {
				return ButtonIcons.tablet.slice(this.count, this.count += nBytes);
			}
		};
		app.addToolButton({
			cName : "MakeMobileReadyButton",
			cExec : "MakeMobileReady(What(\"MakeMobileReady Remember\") === \"\");",
			oIcon : oIcon,
			cTooltext : toUni("Flatten") + "\nSwitch to or from a version of the sheet that is compatible with Acrobat Reader for mobile devices.\nThis flattens all form fields and hides non-printable ones to make the sheet more usable on a phone or tablet.\n\nThe fields used during normal play will stay editable:\n   \u2022  1st page: health, attacks, actions, adv.\/disadv., etc.;\n   \u2022  2nd page: equipment and proficiencies;\n   \u2022  3rd-6th page: all except buttons and portrait\/symbol.",
			cMarked : "event.rc = What(\"MakeMobileReady Remember\") !== \"\";",
			nPos : 12,
			cLabel : "Flatten"
		});
		oIcon = {
			count : 0,
			width : 20,
			height : 20,
			read : function (nBytes) {
				return ButtonIcons.unitsystem.slice(this.count, this.count += nBytes);
			}
		};
		app.addToolButton({
			cName : "SetUnitDecimalsButton",
			cExec : "SetUnitDecimals_Button();",
			oIcon : oIcon,
			cTooltext : toUni("Unit System") + "\nOpen a dialog where you can select the following:\n   \u2022  Unit system: metric or imperial\n   \u2022  Decimal separator: dot or comma.",
			nPos : 13,
			cLabel : "Units"
		});

		oIcon = {
			count : 0,
			width : 20,
			height : 20,
			read : function (nBytes) {
				return ButtonIcons.colors.slice(this.count, this.count += nBytes);
			}
		};
		app.addToolButton({
			cName : "ColorButton",
			cExec : "MakeColorMenu(); ColoryOptions();",
			oIcon : oIcon,
			cTooltext : !typePF ? toUni("Set Color Theme") + "\nControl the color theme of the sheet in the following ways:\n   \u2022  Color of the Headers;\n   \u2022  Color of the Dragon Heads;" + (minVer ? "" : "\n   \u2022  Color of the HP Dragons;\n   \u2022  Color of the Ability Save DCs;") + "\n   \u2022  Color of the form field highlighting.\n\nNote that the color of the highlighting might affect other PDFs you currently have opened. It will revert to normal once you close this sheet, but will be applied again once you open this sheet." : toUni("Set Highlighting Color") + "\nSet the color of the form field highlighting.\n\nYou can select several colors, the adobe default color, or turn form field highlighting off.\n\nNote that the color of the highlighting might affect other PDFs you currently have opened. It will revert to normal once you close this sheet, but will be applied again once you open this sheet.",
			nPos : 14,
			cLabel : "Color"
		});

		oIcon = {
			count : 0,
			width : 20,
			height : 20,
			read : function (nBytes) {
				return ButtonIcons.faq.slice(this.count, this.count += nBytes);
			}
		};
		app.addToolButton({
			cName : "FAQButton",
			cExec : "tDoc.exportDataObject({ cName: \"FAQ.pdf\", nLaunch: 2 });",
			oIcon : oIcon,
			cTooltext : toUni("FAQ") + "\nOpen the frequently asked questions pdf.\n\nThere you can find information on how to add custom code to the sheet, like homebrew races\/weapons\/feats\/etc.",
			nPos : 15,
			cLabel : "FAQ"
		});
	} catch (err) {
		app.addToolButton({
			cName : "TempButton",
			cExec : "",
			cLabel : "Just to make it appear"
		});
		app.removeToolButton({
			cName : "TempButton",
		});
	}
};

function OpeningStatement() {
	if (What("Opening Remember") === "No") {
		this.dirty = false;
		this.pane = "bookmarks"; //open the bookmarks so that on the first opening people can see its existance
		var sheetTitle = "MorePurpleMoreBetter's " + (tDoc.info.SpellsOnly ? "Complete " + tDoc.info.SpellsOnly.capitalize() + " Spell Sheet" : (tDoc.info.AdvLogOnly ? "Adventure Logsheet" : "Character Record Sheet")) + " (" + tDoc.info.SheetType + ") v" + tDoc.info.SheetVersion.toString();
		var Text = "[Can't see the 'OK' button at the bottom? Use ENTER to close this dialog]\n\n";
		Text += "Welcome to " + toUni(sheetTitle);
		Text += " (get the latest version using the bookmark).";
		Text += "\n\n" + toUni("Software") + ": Please use " + toUni("Adobe Acrobat DC") + " with this sheet, as only Adobe Acrobat DC (Reader, Standard, or Pro) is supported.";
		Text += "\n\n" + toUni("Tooltips") + ": This sheet makes extensive use of tooltips (mouseover texts). Hover your cursor over a field to find how you can enter things into the field, reference to the source, explanatory text, or even a list of options your selection offers you.";
		Text += "\n\n" + toUni("Functions") + ": Check out the buttons in the \'JavaScript Window\' (and bookmarks). Hover your cursor over a button in the \'JavaScript Window\' to see what it does.";
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
		if (!minVer && CurrentSources.firstTime) resourceDecisionDialog();
	};
	tDoc.calculate = true;
	tDoc.delay = false;
	if (tDoc.getField("SaveIMG.Patreon").submitName !== "") {
		OpeningStatementVar = app.setTimeOut("PatreonStatement();", 66000);
	};
};

function clean(input, remove) {
	var charArray = (typeof remove !== "undefined") ? remove : [" ", "-", ".", ",", "\\", "/", ":", ";"];
	while (charArray.indexOf(input[0]) !== -1) {
		input = input.slice(1);
	}
	while (charArray.indexOf(input[input.length - 1]) !== -1) {
		input = input.slice(0, -1);
	}
	return input;
};

function AddInvL(item, amount, weight, location) {
	item = clean(item.substring(0, 2) === "- " ? item.substring(2) : item, " "); //remove leading or trailing spaces
	location = location === undefined ? "" : location;
	var RegExItem = ("\\b" + item.RegEscape() + "\\b").replace("s\\b", "s?\\b");
	var tempFound = false;
	var totalslots = FieldNumbers.gear - (What("Adventuring Gear Remember") === true ? 0 : 4);
	var endSearch = event.target && event.target.name === "Equipment.menu" ? FieldNumbers.gear : Math.round(FieldNumbers.gear / (!typePF ? 2 : 3));
	for (var i = 1; i <= endSearch; i++) {
		if (What("Adventuring Gear Remember") === false && i === FieldNumbers.gearMIrow) { continue; }
		var Name = tDoc.getField("Adventuring Gear Row " + i);
		var Nmbr = tDoc.getField("Adventuring Gear Amount " + i);
		var Wht = tDoc.getField("Adventuring Gear Weight " + i);
		var Loc = tDoc.getField("Adventuring Gear Location.Row " + i);
		if ((Name.value.search(RegExp(RegExItem, "i")) !== -1 && Name.value.search(RegExp(RegExItem + " \\+\\d+", "i")) === -1) || Name.value === item) {
			if (Nmbr.value === "") {
				Nmbr.value = 1 + (!isNaN(amount) && amount !== "" ? amount : 1);
			} else if (!isNaN(Nmbr.value)) {
				Nmbr.value += (!isNaN(amount) && amount !== "" ? amount : 1);
			} else {
				Name.value += " + one more";
			};
			i = 500;
			tempFound = true;
		}
	}
	if (!tempFound) {
		var Container = "";
		for (var i = 1; i <= totalslots; i++) {
			if (What("Adventuring Gear Remember") === false && i === FieldNumbers.gearMIrow) { continue; }
			Name = tDoc.getField("Adventuring Gear Row " + i);
			Nmbr = tDoc.getField("Adventuring Gear Amount " + i);
			Wht = tDoc.getField("Adventuring Gear Weight " + i);
			Loc = tDoc.getField("Adventuring Gear Location.Row " + i);
			if (Name.value === "" && Nmbr.value === "" && Wht.value === "") {
				Name.value = Container + item;
				Nmbr.value = amount;
				Wht.value = weight;
				Loc.value = location;
				i = 500;
			} else {
				Container = Name.value.indexOf("-") === 0 || Name.value.indexOf("-") === 1 || Name.value.toLowerCase().indexOf("backpack") !== -1 || Name.value.toLowerCase().indexOf(", with:") !== -1 ? "- " : "";
			}
		}
	}
}

function AddInvM(item, amount, weight, location) {
	if (!typePF) return; //don't do this function in the Printer-Friendly version
	item = clean(item.substring(0, 2) === "- " ? item.substring(2) : item, " "); //remove leading or trailing spaces
	location = location === undefined ? "" : location;
	var RegExItem = ("\\b" + item.RegEscape() + "\\b").replace("s\\b", "s?\\b");
	var tempFound = false;
	var totalslots = FieldNumbers.gear - (What("Adventuring Gear Remember") === true ? 0 : 4);
	var mColumn = Math.round(FieldNumbers.gear / 3 + 1);
	var startSearch = event.target && event.target.name === "Equipment.menu" ? 1 : mColumn;
	var endSearch = event.target && event.target.name === "Equipment.menu" ? FieldNumbers.gear : Math.round(FieldNumbers.gear / 1.5);
	for (var i = startSearch; i <= endSearch; i++) {
		if (What("Adventuring Gear Remember") === false && i === FieldNumbers.gearMIrow) { continue; }
		var Name = tDoc.getField("Adventuring Gear Row " + i);
		var Nmbr = tDoc.getField("Adventuring Gear Amount " + i);
		var Wht = tDoc.getField("Adventuring Gear Weight " + i);
		var Loc = tDoc.getField("Adventuring Gear Location.Row " + i);
		if ((Name.value.search(RegExp(RegExItem, "i")) !== -1 && Name.value.search(RegExp(RegExItem + " \\+\\d+", "i")) === -1) || Name.value === item) {
			if (Nmbr.value === "") {
				Nmbr.value = 1 + (!isNaN(amount) && amount !== "" ? amount : 1);
			} else if (!isNaN(Nmbr.value)) {
				Nmbr.value += (!isNaN(amount) && amount !== "" ? amount : 1);
			} else {
				Name.value += " + one more";
			};
			i = 500;
			tempFound = true;
		}
	}
	if (!tempFound) {
		var Container = "";
		for (var i = mColumn; i <= totalslots; i++) {
			if (What("Adventuring Gear Remember") === false && i === FieldNumbers.gearMIrow) { continue; }
			Name = tDoc.getField("Adventuring Gear Row " + i);
			Nmbr = tDoc.getField("Adventuring Gear Amount " + i);
			Wht = tDoc.getField("Adventuring Gear Weight " + i);
			Loc = tDoc.getField("Adventuring Gear Location.Row " + i);
			if (Name.value === "" && Nmbr.value === "" && Wht.value === "") {
				Name.value = Container + item;
				Nmbr.value = amount;
				Wht.value = weight;
				Loc.value = location;
				i = 500;
			} else {
				Container = Name.value.indexOf("-") === 0 || Name.value.indexOf("-") === 1 || Name.value.toLowerCase().indexOf("backpack") !== -1 || Name.value.toLowerCase().indexOf(", with:") !== -1 ? "- " : "";
			}
		}
	}
}

function AddInvR(item, amount, weight, location) {
	item = clean(item.substring(0, 2) === "- " ? item.substring(2) : item, " "); //remove leading or trailing spaces
	location = location === undefined ? "" : location;
	var RegExItem = ("\\b" + item.RegEscape() + "\\b").replace("s\\b", "s?\\b");
	var tempFound = false;
	var totalslots = FieldNumbers.gear - (What("Adventuring Gear Remember") === true ? 0 : 4);
	var rColumn = Math.round(FieldNumbers.gear / (typePF ? 1.5 : 2) + 1);
	var startSearch = event.target && event.target.name === "Equipment.menu" ? 1 : rColumn;
	for (var i = startSearch; i <= totalslots; i++) {
		if (What("Adventuring Gear Remember") === false && i === FieldNumbers.gearMIrow) { continue; }
		var Name = tDoc.getField("Adventuring Gear Row " + i);
		var Nmbr = tDoc.getField("Adventuring Gear Amount " + i);
		var Wht = tDoc.getField("Adventuring Gear Weight " + i);
		var Loc = tDoc.getField("Adventuring Gear Location.Row " + i);
		if ((Name.value.search(RegExp(RegExItem, "i")) !== -1 && Name.value.search(RegExp(RegExItem + " \\+\\d+", "i")) === -1) || Name.value === item) {
			if (Nmbr.value === "") {
				Nmbr.value = 1 + (!isNaN(amount) && amount !== "" ? amount : 1);
			} else if (!isNaN(Nmbr.value)) {
				Nmbr.value += (!isNaN(amount) && amount !== "" ? amount : 1);
			} else {
				Name.value += " + one more";
			};
			i = 500;
			tempFound = true;
		}
	}
	if (!tempFound) {
		var Container = "";
		for (var i = rColumn; i <= totalslots; i++) {
			if (What("Adventuring Gear Remember") === false && i === FieldNumbers.gearMIrow) { continue; }
			Name = tDoc.getField("Adventuring Gear Row " + i);
			Nmbr = tDoc.getField("Adventuring Gear Amount " + i);
			Wht = tDoc.getField("Adventuring Gear Weight " + i);
			Loc = tDoc.getField("Adventuring Gear Location.Row " + i);
			if (Name.value === "" && Nmbr.value === "" && Wht.value === "") {
				Name.value = Container + item;
				Nmbr.value = amount;
				Wht.value = weight;
				Loc.value = location;
				i = 500;
			} else {
				Container = Name.value.indexOf("-") === 0 || Name.value.indexOf("-") === 1 || Name.value.toLowerCase().indexOf("backpack") !== -1 || Name.value.toLowerCase().indexOf(", with:") !== -1 ? "- " : "";
			}
		}
	}
}

function RemoveInv(item) {
	item = clean(item.substring(0, 2) === "- " ? item.substring(2) : item, " "); //remove leading or trailing spaces
	var RegExItem = ("\\b" + item.RegEscape() + "\\b").replace("s\\b", "s?\\b");
	for (var i = 1; i <= FieldNumbers.gear; i++) {
		if (What("Adventuring Gear Remember") === false && i === FieldNumbers.gearMIrow) { continue; }
		var Name = tDoc.getField("Adventuring Gear Row " + i);
		var Nmbr = tDoc.getField("Adventuring Gear Amount " + i);
		var Wht = tDoc.getField("Adventuring Gear Weight " + i);
		var Loc = tDoc.getField("Adventuring Gear Location.Row " + i);
		if ((Name.value.search(RegExp(RegExItem, "i")) !== -1 && Name.value.search(RegExp(RegExItem + " \\+\\d+", "i")) === -1) || Name.value === item) {
			Name.value = "";
			Nmbr.value = "";
			Wht.value = "";
			Loc.value = "";
			i = 500;
		}
	}
}

function AddInvLExtra(inputitem, amount, weight, location) {
	var item = clean(inputitem.substring(0, 2) === "- " ? inputitem.substring(2) : inputitem, " "); //remove leading or trailing spaces
	location = location === undefined ? "" : location;
	var RegExItem = ("\\b" + item.RegEscape() + "\\b").replace("s\\b", "s?\\b");
	var tempFound = false;
	var endSearch = event.target && event.target.name === "Equipment.menu" ? FieldNumbers.extragear : Math.round(FieldNumbers.extragear / 2);
	for (var i = 1; i <= endSearch; i++) {
		var Name = tDoc.getField("Extra.Gear Row " + i);
		var Nmbr = tDoc.getField("Extra.Gear Amount " + i);
		var Wht = tDoc.getField("Extra.Gear Weight " + i);
		var Loc = tDoc.getField("Extra.Gear Location.Row " + i);
		if ((Name.value.search(RegExp(RegExItem, "i")) !== -1 && Name.value.search(RegExp(RegExItem + " \\+\\d+", "i")) === -1) || Name.value === item) {
			if (Nmbr.value === "") {
				Nmbr.value = 1 + (!isNaN(amount) && amount !== "" ? amount : 1);
			} else if (!isNaN(Nmbr.value)) {
				Nmbr.value += (!isNaN(amount) && amount !== "" ? amount : 1);
			} else {
				Name.value += " + one more";
			};
			i = 500;
			tempFound = true;
		}
	}
	if (!tempFound) {
		var Container = "";
		for (var i = 1; i <= FieldNumbers.extragear; i++) {
			Name = tDoc.getField("Extra.Gear Row " + i);
			Nmbr = tDoc.getField("Extra.Gear Amount " + i);
			Wht = tDoc.getField("Extra.Gear Weight " + i);
			Loc = tDoc.getField("Extra.Gear Location.Row " + i);
			if (Name.value === "" && Nmbr.value === "" && Wht.value === "") {
				Name.value = Container + item;
				Nmbr.value = amount;
				Wht.value = weight;
				Loc.value = location;
				i = 500;
			} else {
				Container = Name.value.indexOf("-") === 0 || Name.value.indexOf("-") === 1 || Name.value.toLowerCase().indexOf("backpack") !== -1 || Name.value.toLowerCase().indexOf(", with:") !== -1 ? "- " : "";
			}
		}
	}
}

function AddInvRExtra(inputitem, amount, weight, location) {
	var item = clean(inputitem.substring(0, 2) === "- " ? inputitem.substring(2) : inputitem, " "); //remove leading or trailing spaces
	location = location === undefined ? "" : location;
	var RegExItem = ("\\b" + item.RegEscape() + "\\b").replace("s\\b", "s?\\b");
	var tempFound = false;
	var rColumn = Math.round(FieldNumbers.extragear / 2 + 1);
	var startSearch = event.target && event.target.name === "Equipment.menu" ? 1 : rColumn;
	for (var i = startSearch; i <= FieldNumbers.extragear; i++) {
		var Name = tDoc.getField("Extra.Gear Row " + i);
		var Nmbr = tDoc.getField("Extra.Gear Amount " + i);
		var Wht = tDoc.getField("Extra.Gear Weight " + i);
		var Loc = tDoc.getField("Extra.Gear Location.Row " + i);
		if ((Name.value.search(RegExp(RegExItem, "i")) !== -1 && Name.value.search(RegExp(RegExItem + " \\+\\d+", "i")) === -1) || Name.value === item) {
			if (Nmbr.value === "") {
				Nmbr.value = 1 + (!isNaN(amount) && amount !== "" ? amount : 1);
			} else if (!isNaN(Nmbr.value)) {
				Nmbr.value += (!isNaN(amount) && amount !== "" ? amount : 1);
			} else {
				Name.value += " + one more";
			};
			i = 500;
			tempFound = true;
		}
	}
	if (!tempFound) {
		var Container = "";
		for (var i = rColumn; i <= FieldNumbers.extragear; i++) {
			Name = tDoc.getField("Extra.Gear Row " + i);
			Nmbr = tDoc.getField("Extra.Gear Amount " + i);
			Wht = tDoc.getField("Extra.Gear Weight " + i);
			Loc = tDoc.getField("Extra.Gear Location.Row " + i);
			if (Name.value === "" && Nmbr.value === "" && Wht.value === "") {
				Name.value = Container + item;
				Nmbr.value = amount;
				Wht.value = weight;
				Loc.value = location;
				i = 500;
			} else {
				Container = Name.value.indexOf("-") === 0 || Name.value.indexOf("-") === 1 || Name.value.toLowerCase().indexOf("backpack") !== -1 || Name.value.toLowerCase().indexOf(", with:") !== -1 ? "- " : "";
			}
		}
	}
}

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
			if (n === 1 && next.value.toLowerCase().indexOf(action.toLowerCase()) !== -1) {
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

function RemoveAction(actiontype, action, isRegex) {
	var TheAction = actiontype.toLowerCase();
	if (TheAction.indexOf("bonus") !== -1) {
		var field = "Bonus Action ";
	} else if (TheAction.indexOf("reaction") !== -1) {
		var field = "Reaction ";
	} else if (TheAction.indexOf("action") !== -1) {
		var field = "Action ";
	}
	action = isRegex ? action : action.toLowerCase();
	var numberOfFields = field === "Action " ? FieldNumbers.trueactions : FieldNumbers.actions;
	for (var i = 1; i <= numberOfFields; i++) {
		var next = tDoc.getField(field + i);
		if (next.value.toLowerCase().search(action) !== -1) {
			DeleteItemType(field, i, numberOfFields);
			i = numberOfFields + 1;
		}
	}
}

function AddResistance(Input, tooltiptext, replaceThis) {
	var useful = 0;
	var tooltipString = Input;
	if (isNaN(Input) && Input.search(/\(.+\)/) === -1) {
		for (var key in DamageTypes) {
			if (Input.toLowerCase().indexOf(key) !== -1) {
				useful = DamageTypes[key].index;
				tooltipString = key.capitalize();
				break;
			}
		}
	};
	var tempString = tooltiptext !== undefined ? "The resistance to \"" + tooltipString + "\" was gained from " + tooltiptext + "." : "";
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
	if (isNaN(Input) && Input.search(/\(.+\)/) === -1) {
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

function Import(type) {
	
	//first ask if this sheet is already set-up the right way before importing and if we can continue
	var AskFirst = {
		cMsg : "Before you import anything into this sheet, please make sure that the following things are set correctly. If you don't do this, not everything will import. You will have to make the following things identical to the sheet you exported the data from:" + "\n  \u2022  The unit and decimal system;" + "\n  \u2022  The layout of the pages.\n      In order to do this, you will have to hide and/or add pages in the same order as you did in the sheet you are importing from. This is because the moment you add an extra page (so after the first of its type), that page gets a name based on the location of that page in the document. That location is based solely on the pages that are visible at the time of itscreation.\n      For example, if the sheet you are importing from has two Adventurers Logsheet pages, and these were added after generating a Spell Sheet of three pages long, while all of the other pages were visible as well, the second Adventurers Logsheet page would have been generated as page number 12. In order for this sheet to properly receive the import for that page, you will first need to generate an Adventurers Logsheet page at page number 12." + "\n\n\nDo you want to continue importing?",
		nIcon : 2,
		cTitle : "Is everything ready for importing?",
		nType : 2,
	};
	
	
	if (app.alert(AskFirst) !== 4) {
		return;
	}
	
	tDoc.delay = true;
	tDoc.calculate = false;
	
	//if the sheet is currently flattened, undo that first
	if (What("MakeMobileReady Remember") !== "") MakeMobileReady(false);
	
	thermoM("start"); //start a progress dialog
	thermoM("Importing the data..."); //change the progress dialog text
	
	templateA = [
		["Template.extras.AScomp", What("Template.extras.AScomp")],
		["Template.extras.ASnotes", What("Template.extras.ASnotes")],
		["Template.extras.WSfront", What("Template.extras.WSfront")],
		["Template.extras.ALlog", What("Template.extras.ALlog")],
	];
	var locStateOld = What("Gear Location Remember").split(",");
	
	if (typeof ProcResponse === "undefined") {
		IsNotImport = false;
		if (type === "fdf") {
			tDoc.importAnFDF();
		} else if (type === "xfdf") {
			tDoc.importAnXFDF();
		}
		if (What("Race Remember").split("-")[1]) ApplyRace(What("Race Remember"));
		IsNotImport = true;
	};
	
	//set the values of the templates back
	for (var i = 0; i < templateA.length; i++) {
		Value(templateA[i][0], templateA[i][1]);
	}
	
	thermoM(13/25); //increment the progress dialog's progress
	thermoM("Getting the sheet ready..."); //change the progress dialog text
	
	//set the layer visibility to what the imported field says
	LayerVisibilityOptions(false);
	
	//set the visibility of Honor/Sanity as imported
	ShowHonorSanity();
	
	thermoM(14/25); //increment the progress dialog's progress
	
	tDoc.resetForm(["MakeMobileReady Remember"]); //make the sheet believe it is not flattened
	
	thermoM(15/25); //increment the progress dialog's progress

	//set the visiblity of the text lines as the imported remember field has been set to
	if (What("WhiteoutRemember") !== false) {
		ToggleWhiteout(false);
	}
	
	thermoM(16/25); //increment the progress dialog's progress

	//set the text size for multiline fields as the imported remember field has been set to
	if (What("FontSize Remember") !== (typePF ? 7 : 5.74)) {
		ToggleTextSize(What("FontSize Remember"));
	}
	
	thermoM(17/25); //increment the progress dialog's progress

	//set the visiblity of the manual attack fiels the first page as the imported remember field has been set to
	if (What("Manual Attack Remember") !== "No") {
		ToggleAttacks("No");
	}
	
	thermoM(18/25); //increment the progress dialog's progress
	
	//set the visiblity of the adventure league as the imported field has been set to
	ToggleAdventureLeague(What("League Remember") === "On" ? "Off" : "On");
	
	thermoM(19/25); //increment the progress dialog's progress

	//set the visiblity of the Blue Text fields as the imported remember field has been set to
	if (What("BlueTextRemember") !== "No") {
		ToggleBlueText("No");
	}
	
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
	
	if (CurrentRace.known && CurrentRace.trait.search(/powerful build/i) !== -1 && What("Carrying Capacity Multiplier") === 3) {
		tDoc.getField("Carrying Capacity Multiplier").value -= 1;
	}

	app.alert({
		cMsg : "Be aware that some fields might not have imported correctly if you imported data that you exported from another version of this sheet.\n\nTooltips might no longer display the correct information after importing (especially if you exported all the fields and not just the non-calculated ones). Also, some fields may be left empty and other fields may display the wrong information. Unfortunately, this can't be helped.\n\nIt is recommended that you check all the fields whether or not correspond with the data that you wanted to import.\n\nUnfortunately, the portrait and symbol on the fourth page can't be imported, you will have to re-do them manually.\n\nIf the sheet you exported information from has extra pages added (e.g. two companion pages, or multiple adventurers logsheets), than those will only be imported if you create those pages first in this document as well, in the exact same order as you did in the previous document.\n\nThe following only applies if you are importing from a version before v11:\nIf you imported a class and/or race that has any options that are selected via the buttons on the second page, then please select those features that grant spellcasting again (even if they are already displayed). Selecting them again will give the automation the information necessary to produce the proper Spell Sheets.",
		nIcon : 1,
		cTitle : "Notes on Importing",
		nType : 0,
	});

	thermoM(); //stop any and all progress dialogs
	
	//re-apply stuff just as when starting the sheet
	InitializeEverything();
	
	tDoc.dirty = true;
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
		cMsg : "Are you sure you want to reset all fields and functions to their initial value?\nThis will undue any changes you have made, including Custom Scripts, page layout, source selection, and imported images.\n\nThis cannot be undone!",
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
		CurrentClasses = {};
		classes.known = {};
		classes.extraskills = [];
		CurrentRace = {};
		CurrentBackground = {};
		CurrentCompRace = {};
		GetStringifieds(GoOn);

		//call upon some functions to reset other stuff than field values
		ShowCalcBoxesLines();
		ToggleWhiteout(false);
		ChangeFont();
		ToggleTextSize();
		ToggleAttacks("Yes");
		ToggleBlueText("Yes");
		ShowHideStealthDisadv();
		ToggleAdventureLeague("On");
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
			"MoreProficiencies",
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
			bMarked : selection[0] === "rules" && selection[1] === "equipment",
		}, {
			cName : "Notes left - Equipment right",
			cReturn : "notes#equipment",
			bMarked : selection[0] === "notes" && selection[1] === "equipment",
		}, {
			cName : "Notes left - Rules right",
			cReturn : "notes#rules",
			bMarked : selection[0] === "notes" && selection[1] === "rules",
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
			"Image.Rules.Left",
		];
		var HideShowLRulesFlds = "Hide";
		var RRulesFlds = [
			"Text.Header.Rules.Right",
			"Image.Header.RightRules",
			"Image.DragonheadRightRules",
			"Image.DragonheadshadowRightRules",
			"Image.Rules.Right",
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
			"Extra.Other Holdings",
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
		"AmmoRightDisplay.Weight",
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

//search the string for possible armour
function ParseArmor(input) {
	if (!input) return "";
	var outputL = 0;
	var output = "";
	
	//scan string for all weapons, including the alternative spellings using regular expression
	for (var key in ArmourList) {
		if (ArmourList[key].regExpSearch) {
			if (testSource(key, ArmourList[key], "armorExcl")) continue; // test if the armour or its source isn't excluded
			var wSearch = ArmourList[key].regExpSearch; //use the defined regular expression of the weapon
			if (input.search(wSearch) !== -1 && outputL < key.length) {
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
	var magicBonus = parseFloat(tempString.match(/(^|\s)[\+|-]\d+/i));
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
		var ArmorStealth = (ArmourList[CurrentArmour.known].type === "medium" && What("Medium Armor Max Mod") === 3) || CurrentArmour.field.match(/mithral/i) ? false : ArmourList[CurrentArmour.known].stealthdis;
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
	var magicBonus = parseFloat(tempString.match(/(^|\s)[\+|-]\d+/i));
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
	var theField = (event.target && event.target.name && event.target.name.search(/ac|reset|import/i) === -1) ? event.target.name : "reset";
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
	for (var i = 1; i <= 2; i++) { //first time around just look if the class matches and then look for its subclasses. If that doesn't yield anything, look if any of the subclasses match
		for (var obj in ClassList) { //scan string for all classes, choosing subclasses over classes
			if (testSource(obj, ClassList[obj], "classExcl")) continue; //only testing if the source of the class isn't excluded
			var cSearch = ClassList[obj].regExpSearch;
			if ((i === 2 && !tempFound) || (tempFoundL < obj.length && tempString.search(cSearch) !== -1)) {
				found = i === 2 ? false : [obj, ""];
				tempFoundL = obj.length;
				for (var z = 0; z < ClassList[obj].subclasses[1].length; z++) {
					var theSub = ClassList[obj].subclasses[1][z];
					var theSubIL = ClassSubList[theSub];
					if (!theSubIL || testSource(theSub, theSubIL, "classExcl")) continue; // test if the subclass exists or if it or its source isn't excluded
					var oldSub = found && found[1] && ClassSubList[found[1]] ? ClassSubList[found[1]] : false;
					if (tempString.search(theSubIL.regExpSearch) !== -1 && (!oldSub || theSubIL.subname.length > oldSub.subname.length)) {
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
	var temp = clean(classes.field.toLowerCase()) === "" ? "" : classes.field.toLowerCase();
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

	//reset the global classes variables
	classes.parsed = [];
	classes.known = {};
	classes.hd = [];
	classes.hp = 0;
	var i = 0;

	//split raw string at string-number divides and push parts into temp array
	for (i = 0; i < temp.length; i++) {
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

	//move elements tempArray into parsed array

	temp = [];
	
	for (i = 0; i < tempArray.length; i++) {
		if (typeof tempArray[i] === "string") {
			tempString = clean(tempArray[i]);
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

	classes.parsed = temp;
	classesTemp = {};

	//find known classes and push them into known array, add hd
	for (i = 0; i < classes.parsed.length; i++) {
		tempString = classes.parsed[i][0];
		tempLevel = classes.parsed[i][1];
		tempFound = ParseClass(tempString);
		
		if (tempFound) { //class detected
			tempClass = tempFound[0];
			tempSubClass = tempFound[1];
			tempDie = ClassList[tempClass].die;

			if (i === 0) {
				primeClass = tempClass;
			};
			classesTemp[tempClass] = {
				name : tempClass,
				level : tempLevel,
				subclass : tempSubClass,
				string : clean(tempString, " ")
			};

			if (classes.hd[tempDie] === undefined) { //add hd
				classes.hd[tempDie] = [tempDie, tempLevel];
			} else {
				classes.hd[tempDie][1] += tempLevel;
			};

			if (classes.hp === 0) { //add first level hp
				classes.hp = tempDie;
			}
		}
	}
	
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
		
		if (!classesTemp[oClass]) { //when removing a class, do the following
			//delete armor and weapon proficiencies gained from class features
			delete CurrentArmour.proficiencies[tempCl.fullname];
			delete CurrentWeapons.proficiencies[tempCl.fullname];
			
			//remove saving throw proficiencies and rest equipment button tooltip, if it was primary class
			if (classes.primary === oClass) {
				Checkbox(tempCl.saves[0] + " ST Prof", false, "");
				Checkbox(tempCl.saves[1] + " ST Prof", false, "");
				
				AddTooltip("Equipment.menu", "Click here to add equipment to the adventuring gear section, or to reset it (this button does not print).\n\nIt is recommended to pick a pack first before you add any background's items.");
			}
			
			//remove tools gained from the class
			for (var tls = 0; tls < tempCl.tools.length; tls++) {
				RemoveTool(tempCl.tools[tls], tempCl.name);
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
			spellcastingExtra : "",
		};

		var Temps = CurrentClasses[aClass];

		//fill in the properties of this newly defined global variable and prefer subclass attributes over class attributes
		for (var prop in Temps) {
			if (prop !== "features") {
				if (classes.known[aClass].subclass && ClassSubList[classes.known[aClass].subclass][prop] !== undefined) {
					Temps[prop] = ClassSubList[classes.known[aClass].subclass][prop];
				} else if (ClassList[aClass][prop] !== undefined) {
					Temps[prop] = ClassList[aClass][prop];
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
		for (prop in ClassList[aClass].features) {
			var cPropAtt = ClassList[aClass].features[prop];
			var fNm = ("0" + cPropAtt.minlevel).slice(-2) + (prop.match(/subclassfeature/i) ? "" : "()") + cPropAtt.name;
			if (fNm.toString().length > 2) {
				fAB.push(fNm);
				fTrans[fNm] = {name: prop, list: "ClassList", item: aClass};
			}
		}
		
		var hasSub = false;
		//add features of subclass
		if (classes.known[aClass].subclass && ClassSubList[classes.known[aClass].subclass].features !== undefined) {
			hasSub = true;
			for (prop in ClassSubList[classes.known[aClass].subclass].features) {
				var csPropAtt = ClassSubList[classes.known[aClass].subclass].features[prop];
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
			if (hasSub && propAtt.list === "ClassList" && propAtt.name.match(/subclassfeature/i)) continue; // skip any "subclassfeature" from the class if a subclass is known
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
			var casterFactor = Temps.spellcastingFactor.match(/\d/g) ? Number(Temps.spellcastingFactor.match(/\d/g).join("")) : 1;
			//now only continue if the class level is the factor or higher
			if (casterFactor <= classes.known[aClass].level) {
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
				cSpells.typeSp = !cSpells.known || cSpells.known.spells === undefined ? false : isArray(cSpells.known.spells) ? cSpells.known.spells[cSpells.level - 1] : cSpells.known.spells;
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
		temp.push(CurrentClasses[aClass].attacks[Math.floor(classes.known[aClass].level - 1, 20)]);		
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
			var casterFactor = Temps.spellcastingFactor.match(/\d/g) ? Number(Temps.spellcastingFactor.match(/\d/g).join("")) : 1;
			//now add this class' levels to the global variable when using the known tables and are of sufficient level
			if (classes.known[aClass].level >= casterFactor && (multiCaster[casterType] > 1 || !Temps.spellcastingTable)) {
				var casterLvl = multiCaster[casterType] > 1 ? Math.floor(classes.known[aClass].level / casterFactor) : Math.ceil(classes.known[aClass].level / casterFactor);
				if (classes.spellcastlvl[casterType]) {
					classes.spellcastlvl[casterType] += casterLvl;
				} else {
					classes.spellcastlvl[casterType] = casterLvl;
				}
			} else if (classes.known[aClass].level >= casterFactor && Temps.spellcastingTable && multiCaster[casterType] === 1) {
				if (!classes.spellcastlvl.otherTables) {
					classes.spellcastlvl.otherTables = Temps.spellcastingTable[classes.known[aClass].level]
				} else {
					classes.spellcastlvl.otherTables = classes.spellcastlvl.otherTables.map(function (num, idx) {
					  return num + Temps.spellcastingTable[classes.known[aClass].level][idx];
					});
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
function ApplyClasses(inputclasstxt, inputlevel) {
	tDoc.delay = true;
	tDoc.calculate = false;
		
	var level = 0;
	var updateall = inputlevel !== undefined ? inputlevel : true;
	classes.field = inputclasstxt;

	thermoM("start"); //start a progress dialog
	thermoM("Recognizing the entered class(es)..."); //change the progress dialog text
	
	//detects classes entered and parses information to global classes variable
	FindClasses(classes.field);

	//only update the tooltips if class is set to manual
	if (What("Manual Class Remember") === "Yes") {
		UpdateTooltips();
		tDoc.calculate = IsNotReset;
		tDoc.delay = false;
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
	//put hit dice on sheet
	
	//add saves and tools of the first class
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
	//put hit dice on sheet
	
	//set the spell slots of the class' levels
	for (var ss = 0; ss <= 8; ss++) {
		var SpellSlotsName = "SpellSlots.CheckboxesSet.lvl" + (ss + 1);
		var SpellSlotsField = Number(What(SpellSlotsName));
		var SpellSlotsTotal = SpellSlotsField;
		if (classes.spellcastlvl.otherTables) SpellSlotsTotal += classes.spellcastlvl.otherTables[ss]; //add the old slots
		if (classes.oldspellcastlvl.otherTables) SpellSlotsTotal -= classes.oldspellcastlvl.otherTables[ss]; //remove the old slots
		for (var casterType in classes.spellcastlvl) {
			if (casterType !== "otherTables") {
				SpellSlotsTotal += tDoc[casterType + "SpellTable"][Math.min(20, classes.spellcastlvl[casterType])][ss]; //add the new slots
				if (classes.oldspellcastlvl[casterType]) {
					SpellSlotsTotal -= tDoc[casterType + "SpellTable"][Math.min(20, classes.oldspellcastlvl[casterType])][ss]; //remove the old slots
				}
			}
		}
		if (SpellSlotsField != SpellSlotsTotal) {
			Value(SpellSlotsName, SpellSlotsTotal);
		}
	}
	if (What("SpellSlotsRemember") === "[false,false]") SpellPointsLimFea("Add");
	
	//don't update other things if only the "Character Level" field was changed (updateall = false)
	if (updateall) {
		thermoM(4/6); //increment the progress dialog's progress
		thermoM("Setting the total character level..."); //change the progress dialog text
		//put hit dice on sheet
		
		//add all levels and set character level
		for (var j = 0; j < classes.parsed.length; j++) {
			level += classes.parsed[j][1];
		};
		level = level === 0 ? 1 : level;
		Value("Character Level", level);
		
		//add tool proficiencies
		for (var aClass in classes.known) {
			n = aClass === classes.primary ? 0 : 1;
			if (CurrentClasses[aClass].tools[n] !== undefined) {
				AddTool(CurrentClasses[aClass].tools[n], CurrentClasses[aClass].name);
			}
		}
	
		//put the ability save DC right
		SetTheAbilitySaveDCs();
		
		if (inputclasstxt !== "") {
			CalcExperienceLevel();
		}; //call to check XP level
	}
	
	thermoM(5/6); //increment the progress dialog's progress
	thermoM("Finalizing the changes of the class(es)..."); //change the progress dialog text
	//put hit dice on sheet
	
	UpdateLevelFeatures("class");
	if (IsSubclassException.toSource() === "({})") {
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
	var Level = tDoc.getField("Character Level");
	var exp = tDoc.getField("Total Experience");
	
	//stop this function if resetting or importing the sheet
	if (!IsNotImport || !IsNotReset || (!Level.value && !exp.value)) {
		return;
	} else {
	tDoc.delay = true;
	tDoc.calculate = false;
	var xplvl = 1;
	var currentxplvl = !Level.value ? 0 : Level.value >= 20 ? ExperiencePointsList[19] : ExperiencePointsList[Level.value - 1];
	var theLvl = Level.value >= 20 ? "higher than 20" : Level.value;

	if (exp.value === 0 || exp.value === "") {
		var txt = "no";
	} else {
		var txt = "only " + exp.value;
	};
	
	var theXP = Number(exp.value.replace(/,/g, "."));
	
	for (var i = 0; i < ExperiencePointsList.length; i++) {
		if (ExperiencePointsList[i] > theXP) {
			xplvl = i;
			i = ExperiencePointsList.length;
		}
	};

	var StringHigherLvl = "This character has " + txt + " experience points. This is not enough to attain the level that has been entered (" + Level.value + "). You need at least " + currentxplvl + " experience points for level " + theLvl + ". You can upgrade the experience points, downgrade the level, or leave it as it is.\n\nBy pressing 'Upgrade XP' you change the experience points total to " + currentxplvl + ".\n\nBy pressing 'Downgrade level' you change the character level to level " + xplvl + ".\n\nBy pressing 'Cancel' neither happens.";

	var StringHigherXP = "This character is level " + Level.value + ", but already has " + exp.value + " experience points. This amount is enough to attain level " + xplvl + ". You can upgrade the level, downgrade the experience points, or leave it as it is.\n\nBy pressing 'Upgrade level' you change the character level to level " + xplvl + ".\n\nBy pressing 'Downgrade XP' you change the experience points total to " + currentxplvl + ".\n\nBy pressing 'Cancel' neither happens.";

	if (Level.value > xplvl) {
		var theText = StringHigherLvl;
		var okReturn = "xp";
		var otherReturn = "lvl";
		var okButton = "Upgrade XP";
		var otherButton = "Downgrade level";
	} else if (Level.value < xplvl) {
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
				"text" : theText,
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
					char_width : 45,
				}, {
					type : "static_text",
					item_id : "text",
					alignment : "align_fill",
					font : "dialog",
					height : 165,
					char_width : 45,
				}, {
					type : "ok_cancel_other",
					ok_name : okButton,
					other_name : otherButton
				}]
			}]
		}
	};

	if ((Level.value < 21 || xplvl < 21) && Level.value !== xplvl) {
		app.execDialog(Experience_Dialog);
		switch (Experience_Dialog.result) {
			case "lvl":
				Value("Character Level", xplvl);
				break;
			case "xp":
				Value("Total Experience", currentxplvl);
				break;
		}
		//update features gained from level
		UpdateLevelFeatures("race");
		
		//call the multiclassing function that will ask for what class to add a level to
		if (AlsoClass) {
			AskMulticlassing();
		}
		
		//update level-dependent things for any ranger companions
		UpdateRangerCompanions();
		
		//show a dialogue about ASI
		CountASIs();
	} else if (CurrentRace.known && !CurrentRace.level && Level.value === 1) {
		UpdateLevelFeatures("race");
	}
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	}
};

function ParseRace(Inputs) {
	var resultArray = ["", ""];
	
	if (Inputs) {
		var tempFound = 0;

		for (var key in RaceList) { //scan string for all races
			var rSearch = RaceList[key].regExpSearch; //use the defined regular expression of the race
			if (tempFound < RaceList[key].name.length && Inputs.search(rSearch) !== -1) {
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
						if (tempFound2 < theR.length && Inputs.search(rvSearch) !== -1) {
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
		spellcastingBonus : "",
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
			thermoM("Removing the old race features..."); //change the progress dialog text
			RemoveRace();
		}
		thermoM("Recognizing the entered race..."); //change the progress dialog text
		FindRace(inputracetxt);
		Value("Race Remember", CurrentRace.known + "-" + CurrentRace.variant);
	}

	if (CurrentRace.known && (CurrentRace.known !== oldRace[0] || CurrentRace.variant !== oldRace[1])) {
		thermoM("Applying the race's features..."); //change the progress dialog text
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
		temp = CurrentClasses[aClass].improvements[classes.known[aClass].level - 1];
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
function ParseWeapon(input) {
	if (!input) return "";
	var outputL = 0;
	var output = "";
	var inputS = input.replace(/off.{0,3}hand/i, "");
	
	//scan string for all weapons, including the alternative spellings using regular expression
	for (var key in WeaponsList) {
		if (WeaponsList[key].regExpSearch) {
			if (testSource(key, WeaponsList[key], "weapExcl")) continue; // test if the weapon or its source isn't excluded
			var wSearch = WeaponsList[key].regExpSearch; //use the defined regular expression of the weapon
			if (inputS.search(wSearch) !== -1 && outputL < WeaponsList[key].name.length) {
				outputL = WeaponsList[key].name.length;
				output = key;
			}
		}
	};
	
	return output;
}

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
		var magicBonus = parseFloat(tempString.match(/(^|\s)[\+|-]\d+/i));
		tempArray[j][1] = !isNaN(magicBonus) ? magicBonus : 0;
	
		//add the true/false switch for adding ability score to damage or not
		tempArray[j][2] = tempArray[j][0] ? WeaponsList[tempArray[j][0]].abilitytodamage : true;
	
		//if this is a spell or a cantrip, see if we can link it to an object in the CurrentCasters variable
		var isSpell = tempArray[j][0] ? (WeaponsList[tempArray[j][0]].SpellsList ? WeaponsList[tempArray[j][0]].SpellsList : tempArray[j][0]) : ParseSpell(tempString);
		if ((!tempArray[j][0] || WeaponsList[tempArray[j][0]].type.match(/spell|cantrip/i)) && SpellsList[isSpell]) {
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
	justProfs = justProfs && !forceReCalcWeapons && (!CurrentEvals.atkAdd || !CurrentEvals.atkAdd.match(/level/i)) ? true : false;
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

	for (var i = 1; i <= FieldNumbers.attacks; i++) {
		var theFld = "Attack." + i + ".Weapon Selection";
		var theFldVal = What(theFld);
		tDoc.getField(theFld).setItems(WeaponsList.DropDownList);
		Value(theFld, theFldVal, string);
	};
	for (var c = 1; c <= 3; c++) {
		theFld = "Comp.Use.Attack." + c + ".Weapon Selection";
		theFldVal = What(theFld);
		tDoc.getField(theFld).setItems(WeaponsList.DropDownList);
		Value(theFld, theFldVal, string);
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
	
	for (var key in ArmourList) {
		if (key === "unarmored" || testSource(key, ArmourList[key], "armorExcl")) continue; // test if the armour or its source isn't excluded
		TheList.push(ArmourList[key].name.capitalize());
	};
	if (TheList.indexOf("Plate") !== TheList.length - 1) TheList.splice(TheList.indexOf("Plate") + 1, 0, "")
	
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
			ArrayDing.push(BackgroundSubList[varKey].name);
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
		if (RaceList[key].sortname) {
			ArrayDing.push(RaceList[key].sortname);
		} else {
			ArrayDing.push(RaceList[key].name.capitalize());
		}
	}
	ArrayDing.sort();
	if (tDoc.getField("Race").submitName === ArrayDing.toSource()) return; //no changes, so no reason to do this
	tDoc.getField("Race").submitName = ArrayDing.toSource();
	var theFldVal = What("Race");
	tDoc.getField("Race").setItems(ArrayDing);
	Value("Race", theFldVal, tempString);
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
}

function SetClassTooltips() {
	var tempString = "";
	tempString += "Class and class level\n";
	tempString += "After typing in a class it will be recognized and its features, HD, and proficiencies will update automatically, conform its level.\n\n";
	tempString += "Single class\n";
	tempString += "Please type in the class or subclass name and fill out the \"Level\" field in the top left with your character level. That way your class level and features will increase automatically when you have enough experience points to go to the next level. Either way, the character level (total level) will be adjusted automatically.\n\n"
	tempString += "Multiclassing\n";
	tempString += "You can enter as many classes as you like, as long as you write down a class level (in the form of a number) after each class name and as long as the first class is the one you started at level 1 with. Example: \"Ranger (beastmaster) 2, Illusionist 4, Eldritch Knight 6\". All things will be added automatically for all recognized classes and the total character level will be updated accordingly.\n\n";
	tempString += "Subclass\n";
	tempString += "You can always enter a subclass at a later time. Just add the subclass name to the class name, like \"Cleric (light domain)\". Alternatively you can replace the class name with the subclass name, like \"Berserker\".\n\n";
	tempString += "Changing class or subclass\n";
	tempString += "If you change the class or subclass, all its proficiencies and features will be removed and the new class' and/or subclass' proficiencies and features will be applied. However, any features added to the third page by using the \"Choose Feature\" button on the second page will not be removed automatically.";
	tDoc.getField("Class and Levels").userName = tempString;
}

function SetDefenceTooltips() {
	var tempString = "";
	tempString += "Armor AC\n";
	tempString += "Upon selecting or typing in a type of armor, its AC and features will be filled out automatically, provided that its a recognized type of armor.\n\n";
	tempString += "Alternative spelling\n";
	tempString += "You can use alternative spellings, descriptions and embellishments. For example: \"Golden Plate of Lathander\" will result in the AC and attributes of a \"Plate\".\n\n"
	tempString += "Using a secondary ability score\n";
	tempString += "Using either \"unarmored\", \"naked\", or \"nothing\" combined with an abbreviation of one of the six ability scores will result in the armor being calculated with that ability score. For example: \"Unarmored (Int)\".\n\n";
	tempString += "Magic bonus\n";
	tempString += "Any magical bonus you type in this field is added to the AC of the armor type. For example: \"Chain mail +1\" or \"Plate -2\".";
	tDoc.getField("AC Armor Description").userName = tempString;

	tempString = "";
	tempString += "Shield AC\n";
	tempString += "Upon typing anything into this field, the shield AC will be set to 2 and any magical bonus that you enter.\n\n";
	tempString += "Magic bonus\n";
	tempString += "Any magical bonus you type in this field is added to the 2 AC of the shield. For example: \"Wooden shield +3\".";
	tDoc.getField("AC Shield Bonus Description").userName = tempString;
}

//Make menu for 'add equipment' button and parse it to Menus.inventory
function MakeInventoryMenu() {
	var InvMenu = [];
	var temp = "";
	var BackgrString = (CurrentBackground.known && CurrentBackground.name) ? CurrentBackground.name + "'s items and gold" : "Background's items and gold";

	var menuLVL1 = function (item, array) {
		for (i = 0; i < array.length; i++) {
			var isMarked = false;
			var isEnabled = true;
			if (array[i] === "Show 'Attuned Magical Items' subsection" && What("Adventuring Gear Remember") === false) {
				isMarked = true;
			} else if (array[i] === "Show location column for Equipment" && What("Gear Location Remember").split(",")[0] === "true") {
				isMarked = true;
			} else if (array[i] === "Show location column for Extra Equipment") {
				if (What("Gear Location Remember").split(",")[1] === "true") isMarked = true;
				if (tDoc.getField(BookMarkList["ASfront"]).page === -1) isEnabled = false;
			} else if (array[i] === "Background's items and gold") {
				isEnabled = false;
			}
			item.push({
				cName : array[i],
				cReturn : item + "#" + array[i],
				bMarked : isMarked,
				bEnabled : isEnabled,
			});
		}
	};

	var menuLVL2 = function (menu, name, array, type) {
		menu.cName = name;
		menu.oSubMenu = [];
		for (i = 0; i < array.length; i++) {
			menu.oSubMenu.push({
				cName : array[i],
				cReturn : type + "#" + array[i]
			})
		}
	};
	
	var amendMenu = function(theMenu, nameChange, extraReturn) {
		theMenu.cName = nameChange
		for (var a = 0; a < theMenu.oSubMenu.length; a++) {
			theMenu.oSubMenu[a].cReturn += "#" + extraReturn;
		}
	};

	//add submenu for packs
	var packArray = [];
	for (var key in PacksList) {
		packArray.push(key.substring(0, 1).toUpperCase() + key.substring(1));
	};
	packArray.sort();
	var packMenu = {};
	menuLVL2(packMenu, "packmenu", packArray, "pack");

	//add two submenus for adventuring gear (left column and right column)
	var gearArray = [];
	for (var item in GearList) {
		gearArray.push(GearList[item].infoname);
	};
	var gearMenu = {};
	menuLVL2(gearMenu, "gearmenu", gearArray, "gear");
	
	var toolArray = [];
	for (var item in ToolsList) {
		toolArray.push(ToolsList[item].infoname);
	};
	var toolMenu = {};
	menuLVL2(toolMenu, "toolmenu", toolArray, "tool");
	
	var menuStringsArray = [
		["Pack", packMenu.toSource()],
		["Gear", gearMenu.toSource()],
		["Tool", toolMenu.toSource()],
	];

	var menuExtraTypes = [["To left column", "left"]];
	if (typePF) menuExtraTypes.push(["To middle column", "middle"]);
	menuExtraTypes.push(["To right column", "right"]);
	
	//add a menu with a changed name 
	for (var i = 0; i < menuStringsArray.length; i++) {
		var tempMenu = {cName : menuStringsArray[i][0], oSubMenu : []};
		for (var e = 0; e < menuExtraTypes.length; e++) {
			var aMenu = eval(menuStringsArray[i][1]);
			amendMenu(aMenu, menuExtraTypes[e][0], menuExtraTypes[e][1]);
			tempMenu.oSubMenu.push(aMenu);
		}
		InvMenu.push(tempMenu);
	}

	menuLVL1(InvMenu, ["-", BackgrString, "Armor && shield (from 1st page)", "Weapons (from 1st page)", "Ammunition (from 1st page)", "-", "All four of the above", "-", "Only new armor && shield", "Only new weapons", "Update ammunition", "-", "All three of the above", "-", "Reset equipment section", "-", "Show 'Attuned Magical Items' subsection", "Show location column for Equipment", "Show location column for Extra Equipment"]);

	Menus.inventory = InvMenu;
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

//call the inventory menu and do something with the results
function InventoryOptions() {
	tDoc.delay = true;
	tDoc.calculate = false;
	var MenuSelection = getMenu("inventory");
	var tempArray = [];

	if (MenuSelection !== undefined) {
		thermoM("start"); //start a progress dialog
		thermoM("Inventory menu option..."); //change the progress 
		if (MenuSelection[0] === "pack") {
			thermoM("Adding pack " + MenuSelection[1] + "..."); //change the progress dialog text
			AddPack(MenuSelection[1], MenuSelection[2]);
		} else if (MenuSelection[0] === "gear" || MenuSelection[0] === "tool") {
			thermoM("Adding " + MenuSelection[0] + " '" + MenuSelection[1] + "'..."); //change the progress dialog text
			AddEquipment(MenuSelection[0], MenuSelection[1], MenuSelection[2]);
		} else if (MenuSelection[1] === "reset equipment section") {
			thermoM("Resetting the equipment section..."); //change the progress dialog text
			tempArray = [
				"Platinum Pieces",
				"Gold Pieces",
				"Electrum Pieces",
				"Silver Pieces",
				"Copper Pieces",
			];
			if (!typePF) tempArray = tempArray.concat(["Lifestyle", "Lifestyle daily cost",]);
			for (i = 1; i <= FieldNumbers.gear; i++) {
				tempArray.push("Adventuring Gear Row " + i);
				tempArray.push("Adventuring Gear Location.Row " + i);
				tempArray.push("Adventuring Gear Amount " + i);
				tempArray.push("Adventuring Gear Weight " + i);
			};
			for (i = 1; i < 5; i++) {
				tempArray.push("Valuables" + i);
			}
			tDoc.resetForm(tempArray);
		} else if (MenuSelection[1].indexOf("'s items and gold") !== -1) {
			thermoM("Adding the " + MenuSelection[1] + "..."); //change the progress dialog text
			AddInvBackgroundItems();
		} else if (MenuSelection[1] === "armor && shield (from 1st page)") {
			thermoM("Adding the armor and shield (from 1st page)..."); //change the progress dialog text
			AddInvArmorShield();
		} else if (MenuSelection[1] === "weapons (from 1st page)") {
			thermoM("Adding the " + MenuSelection[1] + "..."); //change the progress dialog text
			AddInvWeapons();
		} else if (MenuSelection[1] === "ammunition (from 1st page)") {
			thermoM("Adding the " + MenuSelection[1] + "..."); //change the progress dialog text
			AddInvAmmo();
		} else if (MenuSelection[1] === "all four of the above") {
			thermoM("Adding the background items, armor, shield, weapons, and ammunition..."); 
			AddInvBackgroundItems();
			AddInvArmorShield();
			AddInvWeapons();
			AddInvNewAmmo();
		} else if (MenuSelection[1] === "only new armor && shield") {
			thermoM("Updating the armor and shield (from 1st page)..."); //change the progress 
			AddInvNewArmorShield();
		} else if (MenuSelection[1] === "only new weapons") {
			thermoM("Updating the weapons (from 1st page)..."); //change the progress
			AddInvNewWeapons();
		} else if (MenuSelection[1] === "update ammunition") {
			thermoM("Updating the ammunition (from 1st page)..."); //change the progress
			AddInvNewAmmo();
		} else if (MenuSelection[1] === "all three of the above") {
			thermoM("Updating the armor, shield, weapons, and ammunition..."); //change the progress
			AddInvNewArmorShield();
			AddInvNewWeapons();
			AddInvNewAmmo();
		} else if (MenuSelection[1] === "show 'attuned magical items' subsection") {
			thermoM((What("Adventuring Gear Remember") === true ? "showing" : "hiding") + " the 'attuned magical items' subsection..."); //change the progress
			ShowAttunedMagicalItems(What("Adventuring Gear Remember") === true);
		} else if (MenuSelection[1] === "show location column for equipment") {
			thermoM((What("Gear Location Remember").split(",")[0] === "true" ? "hiding" : "showing") + " the location column on page 2..."); //change the progress
			HideInvLocationColumn("Adventuring Gear ", What("Gear Location Remember").split(",")[0] === "true");
		} else if (MenuSelection[1] === "show location column for extra equipment") {
			thermoM((What("Gear Location Remember").split(",")[1] === "true" ? "hiding" : "showing") + " the location column on page 3..."); //change the progress
			HideInvLocationColumn("Extra.Gear ", What("Gear Location Remember").split(",")[1] === "true");
		}
		thermoM("stop"); //stop the top progress dialog
	}
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
};

//see if text contains a background
function ParseBackground(Input) {
	var resultArray = ["", ""];

	if (Input) {
		var tempFound = 0;

		for (var key in BackgroundList) { //scan string for all backgrounds
			if (BackgroundList[key].variant) {
				var BackOpt = BackgroundList[key].variant;
				for (var sub = 0; sub < BackOpt.length; sub++) { //scan string for all variants of the background
					var bVars = BackgroundSubList[BackOpt[sub]];
					if (testSource(BackOpt[sub], bVars, "backgrExcl")) continue; // test if the background variant or its source isn't excluded
					var bvSearch = bVars.regExpSearch; //use the defined regular expression of the background variant
					if (tempFound < bVars.name.length && Input.search(bvSearch) !== -1) {
						resultArray[0] = key;
						resultArray[1] = BackOpt[sub];
						tempFound = bVars.name.length;
					}
				}
			}
			if (testSource(key, BackgroundList[key], "backgrExcl")) continue; // test if the background or its source isn't excluded
			var bSearch = BackgroundList[key].regExpSearch; //use the defined regular expression of the background
			if (tempFound < BackgroundList[key].name.length && Input.search(bSearch) !== -1) {
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
		lifestyle : "",
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
				"aristocratic",
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

//Make menu for 'add background stuff' button and parse it to Menus.background
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
				bEnabled : array[i] !== "No background entry has been detected on the first page",
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
				bMarked : theEntry.search(RegExp(array[i].RegEscape(), "i")) !== -1,
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
				bMarked : theEntry.search(RegExp(array[i][1].RegEscape(), "i")) !== -1,
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

//call the inventory menu and do something with the results
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

//add the armor and shield in the 'defense' section to the inventory
function AddInvArmorShield() {
	var tempMagicSign = CurrentArmour.magic > 0 ? " \+" : CurrentArmour.magic < 0 ? " " : "";
	var tempArmorString = CurrentArmour.magic ? tempMagicSign + CurrentArmour.magic : "";
	if (CurrentArmour.known && ArmourList[CurrentArmour.known] && ArmourList[CurrentArmour.known].weight) {
		var armName = ArmourList[CurrentArmour.known].invName ? ArmourList[CurrentArmour.known].invName : ArmourList[CurrentArmour.known].name;
		AddInvR(armName + tempArmorString, "", What("AC Armor Weight"));
	}
	var temp = What("AC Shield Bonus Description");
	if (temp !== "") {
		var tempShield = temp.toLowerCase().indexOf("shield") === -1 ? temp + " shield" : temp;
		AddInvR(tempShield, "", What("AC Shield Weight"))
	}
};

//add the armor and shield in the 'defense' section to the inventory, provided they are not already there
function AddInvNewArmorShield() {
	var tempMagicSign = CurrentArmour.magic >= 0 ? " +" : " ";
	var tempArmorString = CurrentArmour.magic ? tempMagicSign + CurrentArmour.magic : "";
	if (CurrentArmour.known && ArmourList[CurrentArmour.known] && ArmourList[CurrentArmour.known].weight) {
		var armName = ArmourList[CurrentArmour.known].invName ? ArmourList[CurrentArmour.known].invName : ArmourList[CurrentArmour.known].name;
		var tempArmor = armName + tempArmorString;
		var tempArmorRegEx = tempArmor.RegEscape();
		var isFound = false;
		for (var E = 1; E <= FieldNumbers.gear; E++) {
			if (What("Adventuring Gear Remember") === false && E === FieldNumbers.gearMIrow) { continue; }
			var Name = tDoc.getField("Adventuring Gear Row " + E);
			if ((Name.value.search(RegExp("\\b" + tempArmorRegEx + "\\b", "i")) !== -1 && Name.value.search(RegExp("\\b" + tempArmorRegEx + " \\+\\d+", "i")) === -1) || Name.value === tempArmor) {
				isFound = true;
				E = 500;
			}
		}
		if (!isFound) {
			AddInvR(tempArmor, "", What("AC Armor Weight"));
		}
	}

	var temp = What("AC Shield Bonus Description");
	if (temp !== "") {
		var tempShield = temp.toLowerCase().indexOf("shield") === -1 ? temp + " shield" : temp;
		var tempShieldRegEx = tempShield.RegEscape();
		var isFound = false;
		for (var E = 1; E <= FieldNumbers.gear; E++) {
			if (What("Adventuring Gear Remember") === false && E === FieldNumbers.gearMIrow) { continue; }
			var Name = tDoc.getField("Adventuring Gear Row " + E);
			if ((Name.value.search(RegExp("\\b" + tempShieldRegEx + "\\b", "i")) !== -1 && Name.value.search(RegExp("\\b" + tempShieldRegEx + " \\+\\d+", "i")) === -1) || Name.value === tempShield) {
				isFound = true;
				E = 500;
			}
		}
		if (!isFound) {
			AddInvR(tempShield, "", What("AC Shield Weight"));
		}
	}
};

//add all the weapons in the 'attacks' section to the inventory
function AddInvWeapons() {
	if (CurrentWeapons.known) {
		for (var i = 0; i < FieldNumbers.attacks; i++) {
			var temp = CurrentWeapons.known[i];
			if (temp && temp[0] && (WeaponsList[temp[0]].type === "Simple" || WeaponsList[temp[0]].type === "Martial")) {
				var temp2 = temp[1] === 0 ? "" : (temp[1] > 0 ? " +": " ") + temp[1];
				var temp3 = WeaponsList[temp[0]].name + temp2;
				AddInvR(temp3, "", What("BlueText.Attack." + (i + 1) + ".Weight"));
			}
		}
	}
};

//add all the weapons in the 'attacks' section to the inventory, provided they are not already there
function AddInvNewWeapons() {
	if (CurrentWeapons.known) {
		for (var i = 0; i < FieldNumbers.attacks; i++) {
			var temp = CurrentWeapons.known[i];
			var temp2 = temp[1] === 0 ? "" : (temp[1] > 0 ? " +": " ") + temp[1];
			var temp3 = temp && temp[0] ? WeaponsList[temp[0]].name + temp2 : "";
			var weaponRegEx = temp3.RegEscape();
			if (temp3 && (WeaponsList[temp[0]].type === "Simple" || WeaponsList[temp[0]].type === "Martial")) {
				var isFound = false;
				for (var E = 1; E <= FieldNumbers.gear; E++) {
					if (What("Adventuring Gear Remember") === false && E === FieldNumbers.gearMIrow) { continue; }
					var Name = tDoc.getField("Adventuring Gear Row " + E);
					if ((Name.value.search(RegExp("\\b" + weaponRegEx + "\\b", "i")) !== -1 && Name.value.search(RegExp("\\b" + weaponRegEx + " \\+\\d+", "i")) === -1) || Name.value === temp3) {
						isFound = true;
						E = 500;
					}
				}
				if (!isFound) {
					AddInvR(temp3, "", What("BlueText.Attack." + (i + 1) + ".Weight"));
				}
			}
		}
	}
}

function AddInvAmmo() {
	var Ammos = [
		[
			What("AmmoLeftDisplay.Name"),
			What("AmmoLeftDisplay.Amount"),
			What("AmmoLeftDisplay.Weight")
		],
		[
			What("AmmoRightDisplay.Name"),
			What("AmmoRightDisplay.Amount"),
			What("AmmoRightDisplay.Weight")
		],
	];
	for (var i = 0; i < Ammos.length; i++) {
		if (Ammos[i][0]) {
			var AmmoL = AmmoList[ParseAmmo(Ammos[i][0])];
			if (AmmoL.invName) {
				var theName = AmmoL.invName;
			} else {
				var theName = Ammos[i][0];
			}
			AddInvR(theName, Ammos[i][1], Ammos[i][2]);
		}
	}
}

function AddInvNewAmmo() {
	var Ammos = [
		[
			What("AmmoLeftDisplay.Name"),
			What("AmmoLeftDisplay.Amount"),
			What("AmmoLeftDisplay.Weight")
		],
		[
			What("AmmoRightDisplay.Name"),
			What("AmmoRightDisplay.Amount"),
			What("AmmoRightDisplay.Weight")
		],
	];
	for (var i = 0; i < Ammos.length; i++) {
		if (Ammos[i][0]) {
			var tempFound = false;
			var AmmoL = AmmoList[ParseAmmo(Ammos[i][0])];
			if (AmmoL.invName) {
				var theName = clean(AmmoL.invName, " ");
			} else {
				var theName = Ammos[i][0];
			}
			var RegExItem = ("\\b" + theName.RegEscape() + "\\b").replace("s\\b", "s?\\b");
			for (var j = 1; j <= FieldNumbers.gear; j++) {
				if (What("Adventuring Gear Remember") === false && j === FieldNumbers.gearMIrow) { continue; }
				var Name = tDoc.getField("Adventuring Gear Row " + j);
				var Nmbr = tDoc.getField("Adventuring Gear Amount " + j);
				var Wht = tDoc.getField("Adventuring Gear Weight " + j);
				if (Name.value.search(RegExp(RegExItem, "i")) !== -1 || Name.value === theName) {
					Nmbr.value = Ammos[i][1];
					Wht.value = Ammos[i][2];
					tempFound = true;
					j = 500;
				}
			}
			if (!tempFound) {
				AddInvR(theName, Ammos[i][1], Ammos[i][2]);
			}
		}
	}
}

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
		if (tool.toLowerCase().indexOf("thieves' tools") !== -1 && What("Too Text").toLowerCase().indexOf("thieves' tools") === -1 && What("Too") === "") {
			Value("Too Text", "Thieves' Tools (Dex)")
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

	if (tool.search(/thieves.*tools/i) !== -1 && What("Too Text").search(/thieves.*tools/i) !== -1) {
		tDoc.resetForm(["Too Text"]);
		Checkbox("Too Prof", false);
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
			if (n === 1 && next.value.search(RegExp("\\b" + weapon.RegEscape() + "\\b", "i")) !== -1) {
				i = maxItems + 1;
				n = 3;
			} else if (n === 2 && (next.value === "" || (partialReplace && weapon.search(RegExp("\\b" + next.value.RegEscape() + "\\b", "i")) !== -1))) {
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
	if (thefield.value.search(RegExp(regExString, "i")) === -1 && thefield.value.toLowerCase().indexOf(thestring.toLowerCase()) === -1) {
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
		if (thefield.value.search(RegExp(regExStringsArray[i], "i")) !== -1) {
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
	if (thefield.value.search(RegExp(regExString, "i")) !== -1 && theoldstring) {
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
	if (thefield.value.search(RegExp(regExinputString, "i")) === -1 && thefield.value.indexOf(theinputstring) === -1 && startChr !== -1 && theoldstring) {
		startChr += thestring.length;
		thefield.value = thefield.value.slice(0, startChr) + inputstring + thefield.value.slice(startChr);
	} else {
		AddString(field, inputstring, multilines);
	}
};

// add (change === true) or remove (change === false) a skill proficiency with or without expertise; If expertise === "only" and change === undefined, only add the expertise if the skill already has proficiency
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
		if (expertise !== "only") Checkbox(tempString + " Prof", change);
		if (expertise === "only" ? tDoc.getField(tempString + " Prof").isBoxChecked(0) : expertise) {
			Checkbox(tempString + " Exp", change);
		}
	} else if (typePF) {
		change = change !== undefined ? change : true;
		if (expertise !== "only") Checkbox(prefix + ".Comp.Use.Skills." + tempString + ".Prof", change);
		if (expertise === "only" ? tDoc.getField(prefix + ".Comp.Use.Skills." + tempString + ".Prof").isBoxChecked(0) : expertise) {
			Checkbox(prefix + ".Comp.Use.Skills." + tempString + ".Exp", change);
		}
	} else {
		change = change === false ? "nothing" : expertise && (change || expertise !== "only") ? "expertise" : "proficient";
		Value(prefix + "Text.Comp.Use.Skills." + tempString + ".Prof", change);
	}
};

function AddPack(Input, Column) {
	var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
	var PackName = Input.toLowerCase();
	if (PacksList[PackName]) {
		//empty the top left slot by inserting an empty one, if it isn't already empty, or doesn't already has the same thing as the first thing of the pack
		if (What("Adventuring Gear Row 1") !== PacksList[PackName][0][0]) {
			InvInsert("Adventuring ", 1, "- ");
		}
		var addTo = Column === "left" ? "AddInvL" : (Column === "right" ? "AddInvR" : "AddInvM");
		
		//add the pack defined equipment
		for (var i = 0; i < PacksList[PackName].length; i++) {
			tDoc[addTo](PacksList[PackName][i][0], PacksList[PackName][i][1], RoundTo(PacksList[PackName][i][2] * massMod, 0.001, true))
		}
	}
};

function AddInvBackgroundItems() {
	var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
	var temp = [];
	var temp2 = tDoc.getField("Gold Pieces");
	if (CurrentBackground.equipleft) {
		temp = CurrentBackground.equipleft;
		for (var i = 0; i < temp.length; i++) {
			AddInvL(temp[i][0], temp[i][1], RoundTo(temp[i][2] * massMod, 0.001, true));
		}
	}
	if (CurrentBackground.equipright) {
		temp = CurrentBackground.equipright;
		for (var i = 0; i < temp.length; i++) {
			AddInvR(temp[i][0], temp[i][1], RoundTo(temp[i][2] * massMod, 0.001, true));
		}
	}
	if (CurrentBackground.gold) {
		temp2.value = temp2.value + CurrentBackground.gold;
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
		CurrentRace.level = 0;
		UpdateLevelFeatures("race");
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
		if (CurrentRace.features) {
			for (var key in CurrentRace.features) {
				var FeaUse = isArray(CurrentRace.features[key].usages) ? CurrentRace.features[key].usages[CurrentRace.level - 1] : CurrentRace.features[key].usages;
				RemoveFeature(CurrentRace.features[key].name, FeaUse);
				if (CurrentRace.features[key].action) {
					RemoveAction(CurrentRace.features[key].action[0], CurrentRace.features[key].name + CurrentRace.features[key].action[1]);
				}
			}
		};

		//run custom code included in race
		if (CurrentRace.removeeval) {
			var theRemoveeval = What("Unit System") === "metric" && CurrentRace.removeeval.indexOf("String") !== -1 ? ConvertToMetric(CurrentRace.removeeval, 0.5) : CurrentRace.removeeval;
			eval(theRemoveeval);
		}
		
		//remove the race from the CurrentSpells variable
		delete CurrentSpells[CurrentRace.known];

		CurrentRace.level = 0;
		UpdateLevelFeatures("race");
		ApplyProficiencies(true); //call to update the armor, shield and weapon proficiencies
		UpdateTooltips(); //skills tooltip, ability score tooltip
	};
};

//make sure field is a number or the abbreviation of an ability score (field validation)
function ValidateBonus(goEmpty, allowDC) {
	var test = 0;
	var input = Number(event.value.replace(/,/g,"."));
	if (isNaN(input)) {
		if (allowDC && event.value.toLowerCase() === "dc") {
			test = "dc";
		} else {
			for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
				if (AbilityScores.abbreviations[i].toLowerCase().indexOf(event.value.toLowerCase()) === 0) {
					test = AbilityScores.abbreviations[i];
				}
			}
		}
		event.value = test;
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

	var ExtraBonus = isPP ? What("Passive Perception Bonus") : What(Skill + " Bonus");
	if (isNaN(ExtraBonus)) {
		ExtraBonus = Number(What(ExtraBonus + " Mod"));
	}

	var AllBonus = event.target.name.search("Initiative") === -1 ? What("All Skills Bonus") : 0;
	if (isNaN(AllBonus)) {
		AllBonus = Number(What(AllBonus + " Mod"));
	}

	event.value = Mod === "" ? "" : Number(isPP) + Number(Mod) + Number(ProfBonus) + Number(ExtraBonus) + Number(AllBonus);
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
	var ExtraBonus = What(Save.replace("Comp.", "BlueText.Comp.").replace("Mod", "Bonus"));
	if (isNaN(ExtraBonus)) {
		ExtraBonus = Number(What((Save.substring(0, Sabi) + "Mod").replace(Ability, ExtraBonus)));
	}

	//get the variable entered into the bonus field for all
	var AllBonus = What(Save.replace("Comp.", "BlueText.Comp.").replace("Mod", "Bonus").replace(Ability, "All"));
	if (isNaN(AllBonus)) {
		AllBonus = Number(What((Save.substring(0, Sabi) + "Mod").replace(Ability, AllBonus)));
	}
	
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
	if (usages.match(/ ?\bper\b ?/)) usages = usages.replace(/ ?\bper\b ?/, "");
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
	if (event.target && event.target.name === "Feat Name " + FldNmbr && InputFeat.toLowerCase() === event.target.value.toLowerCase()) return; //no changes were made
	
	tDoc.delay = true;
	tDoc.calculate = false;
		
	var NewFeat = ParseFeat(InputFeat);
	var ArrayNmbr = FldNmbr - 1;
	var FeatFlds = [
		"Feat Name " + FldNmbr,
		"Feat Note " + FldNmbr,
		"Feat Description " + FldNmbr
	];
	var tempString = "";

	//only update the tooltips if feats are set to manual
	if (What("Manual Feat Remember") === "Yes") {
		UpdateTooltips();
		tDoc.calculate = IsNotReset;
		tDoc.delay = false;
		return; //don't do the rest of this function
	}
	
	thermoM("start"); //start a progress dialog
	thermoM("Applying feat..."); //change the progress 

	//remove previous feat at the same field
	if (CurrentFeats.known[ArrayNmbr] && CurrentFeats.known[ArrayNmbr] !== NewFeat) {
		thermoM("Removing the old feat..."); //change the progress dialog text
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
		
		tDoc.getField(FeatFlds[2]).setAction("Calculate", "");
		tDoc.resetForm([FeatFlds[2]]);
		AddTooltip(FeatFlds[2], "");
	}
	
	thermoM("Recognizing the entered feat..."); //change the progress dialog text
	CurrentFeats.known = [];
	CurrentFeats.known[ArrayNmbr] = NewFeat;
	FindFeats(ArrayNmbr);

	if (CurrentFeats.known[ArrayNmbr]) {
		thermoM("Applying the feat's features..."); //change the progress dialog text
		thermoM(1/3); //increment the progress dialog's progress
		
		var theFeat = FeatsList[CurrentFeats.known[ArrayNmbr]];

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
		}
	}
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
		ArrayDing.push(FeatsList[key].name);
	}
	ArrayDing.sort();
	
	if (tDoc.getField("Feat Name 1").submitName === ArrayDing.toSource()) return; //no changes, so no reason to do this
	tDoc.getField("Feat Name 1").submitName = ArrayDing.toSource();
	
	for (var i = 1; i <= FieldNumbers.feats; i++) {
		tDoc.getField("Feat Name " + i).setItems(ArrayDing);
		AddTooltip("Feat Name " + i, "Type in the name of the feat (or select it from the drop-down menu) and its text and features will be filled out automatically, provided it is a recognized feat. Ability scores will not be altered other than their tool tips (mouseover texts).\n\nUpon changing to another feat, all features of the previous feat will be undone.");
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
	tDoc.delay = true;
	tDoc.calculate = false;
	
	if (What("Add Experience")) {
		var XPS = "," + What("Total Experience");
		var AddXP = "," + What("Add Experience");
		XPS = Number(XPS.replace(/,/g, ".").substring(1));
		AddXP = Number(AddXP.replace(/,/g, ".").substring(1));
		Value("Total Experience", RoundTo(XPS + AddXP, 0.01));
		Value("Add Experience", "");
	};

	CalcExperienceLevel(true);
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
}

//calculate the encumbrance (field calculation)
function CalcEncumbrance() {
	var Str = What("Str"), result = "";
	var Size = What("Size Category");
	Size = Size ? Size : 1;
	var CarMult = What("Carrying Capacity Multiplier");
	var decSep = What("Decimal Separator");
	if (isNaN(CarMult)) {
		CarMult = What(CarMult + " Mod");
		CarMult = CarMult < 0 ? 1 : CarMult;
	}
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
}

//change all the level-variables gained from classes and races
function UpdateLevelFeatures(Typeswitch) {
	if (!IsNotReset) return; //stop this function on a reset
	
	thermoM("start"); //start a progress dialog
	thermoM("Updating level-dependent features..."); //change the progress 
	
	var tempThing = "";
	Typeswitch = Typeswitch === undefined ? "all" : Typeswitch;
	var isWildShape = false;

	var oldRaceLvl = Number(CurrentRace.level);
	var newRaceLvl = What("Character Level");

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
				var GoAnyway = keyFea.minlevel <= newRaceLvl;
				thermoM("Updating " + CurrentRace.name + "'s " + keyFea.name + "..."); //change the progress dialog text

				var FeaUse = keyFea.usages;
				if (FeaUse && isArray(FeaUse) && newRaceLvl > 0) {
					FeaUse = FeaUse[newRaceLvl - 1];
					var FeaUseOld = oldRaceLvl > 0 ? FeaUse[oldRaceLvl - 1] : 0;
					GoAnyway = GoAnyway && FeaUse !== FeaUseOld;
				}

				var FeaAdd = keyFea.additional ? " (" + keyFea.additional + ")" : "";
				if (FeaAdd && isArray(keyFea.additional)) {
					FeaAdd = " (" + keyFea.additional[newRaceLvl - 1] + ")";
					GoAnyway = GoAnyway || (keyFea.minlevel <= newRaceLvl && keyFea.additional[newRaceLvl - 1] !== keyFea.additional[oldRaceLvl - 1]);
				}
				
				//see if we are going to add or remove a feature
				var AddRemove = keyFea.minlevel <= newRaceLvl ? "Add" : "Remove"
				
				//make a check to see if level-dependent features should be dealt with
				var checkLVL = keyFea.minlevel <= RaceLevelUp[2] && keyFea.minlevel > RaceLevelUp[1];
				
				//add, remove, or update the feature
				if (keyFea.usages && (GoAnyway || checkLVL)) {
					var FeaTooltip = CurrentRace.name + keyFea.tooltip;
					var AddRemoveFea = AddRemove === "Add" && FeaUse && RaceLevelUp[0] && FeaUse.search(/unlimited|\u221E/i) === -1 ? "Add" : "Remove";
					tDoc[AddRemoveFea + "Feature"](keyFea.name, AddRemoveFea === "Remove" ? FeaUseOld : FeaUse, FeaAdd, keyFea.recovery, FeaTooltip, FeaUseOld);
				}
				
				thermoM(1/2); //increment the progress dialog's progress

				//add or remove action, if defined
				if (keyFea.action && checkLVL) {
					tDoc[AddRemove + "Action"](keyFea.action[0], keyFea.name + keyFea.action[1], "being a " + CurrentRace.name);
				}

				//do custom script, if defined
				if (AddRemove === "Add" && keyFea.eval && (GoAnyway || checkLVL)) {
					eval(keyFea.eval);
				} else if (AddRemove === "Remove" && keyFea.removeeval && (GoAnyway || checkLVL)) {
					eval(keyFea.removeeval);
				}

				//add or remove bonus spells in the CurrentSpells variable, if defined
				var raceSpellBonus = !checkLVL ? false : (keyFea.spellcastingBonus ? keyFea.spellcastingBonus : false);
				if (raceSpellBonus && keyFea.minlevel <= newRaceLvl) {//if gaining the level
					//first see if the entry exists or not, and create it if it doesn't
					if (!CurrentSpells[CurrentRace.known]) {
						CurrentSpells[CurrentRace.known] = {
							name : CurrentRace.name,
							level : newRaceLvl,
							ability : CurrentRace.spellcastingAbility,
							typeSp : "known",
							bonus : {},
						};
					}
					CurrentSpells[CurrentRace.known].bonus[key] = raceSpellBonus;
					UpdateSpellSheets.race = true;
				} else if (raceSpellBonus && CurrentSpells[CurrentRace.known].bonus[key]) {//if losing the level and the thing is defined
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
				
				//add or remove custom calculations to the CurrentEvals variable
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
				if (ClassFeaFld.value.search(RegExp(temp.name.RegEscape())) === -1 && ClassFeaFld.value) {
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
					if (prop.indexOf("subclassfeature") !== -1 && propFea.minlevel <= ClassLevelUp[aClass][2] && !classes.known[aClass].subclass && IsNotReset) {
						thermoM("No subclass known, asking for subclass to add..."); //change the progress dialog text
						var stopNow = PleaseSubclass(aClass); //ask to add a subclass
						if (stopNow) {
							thermoM("stop");
							break; //this function is going to run again, so stop it now for this class
						}
					} else if (prop.indexOf("subclassfeature") !== -1) {
						delete IsSubclassException[aClass];
					} else if (IsSubclassException[aClass]) {
						var FeaNewString = ParseClassFeature(aClass, prop, newClassLvl[aClass], false, FeaChoice);
						LastProp = propFea.minlevel <= ClassLevelUp[aClass][2] ? FeaNewString : LastProp;
						continue; //an exception has been put in place for this class, so ignore all the entries before another subclassfeature, but do keep updating the LastProp variable
					}
					thermoM("Updating " + temp.fullname + "'s " + propFea.name + "..."); //change the progress dialog text
					
					var ForceAll = false;
					//if this is the first time adding in a subclass, its features must be forced. But only if the feature meets the level requirement both before and after the level change
					var theSubClass = classes.known[aClass].subclass;
					if (theSubClass && ClassSubList[theSubClass].features[prop] && classes.old[aClass] && theSubClass !== classes.old[aClass].subclass && propFea.minlevel <= ClassLevelUp[aClass][2] && propFea.minlevel <= ClassLevelUp[aClass][1]) {
						ForceAll = true;
					}
					
					thermoM(2/8); //increment the progress dialog's progress
					
					//make a check to see if level-dependent features should be dealt with
					var CheckLVL = propFea.minlevel <= ClassLevelUp[aClass][2] && propFea.minlevel > ClassLevelUp[aClass][1];

					//check for features that are not level-dependent
					var CheckFea = ForceAll || CheckLVL;
					
					// get all the attributes of this feature
					var Fea = ReturnClassFeatures(aClass, prop, newClassLvl[aClass], FeaChoice, oldClassLvl[aClass], FeaOldChoice);

					// --- add or remove something via custom script, if defined
					var evalAddRemove = CheckFea && propFea.minlevel <= newClassLvl[aClass] ? "eval" : "removeeval";
					if (propFea[evalAddRemove] && CheckFea) {
						var thePropFeaeval = What("Unit System") === "metric" && propFea[evalAddRemove].indexOf("String") !== -1 ? ConvertToMetric(propFea[evalAddRemove], 0.5) : propFea[evalAddRemove];
						eval(thePropFeaeval);
					}
					if (CheckFea && FeaChoice && propFea[FeaChoice][evalAddRemove]) {
						var thePropFeaChoiceeval = What("Unit System") === "metric" && propFea[FeaChoice][evalAddRemove].indexOf("String") !== -1 ? ConvertToMetric(propFea[FeaChoice][evalAddRemove], 0.5) : propFea[FeaChoice][evalAddRemove];
						eval(thePropFeaChoiceeval);
					}
					
					//if the eval changed the choice, do some things with this new choice
					if (FeaChoice !== FeaOldChoice) {
						Fea = ReturnClassFeatures(aClass, prop, newClassLvl[aClass], FeaChoice, oldClassLvl[aClass], FeaOldChoice);
						if (propFea[FeaChoice].skillstxt) classes.extraskills.push(propFea[FeaChoice].skillstxt);
					}
					
					// --- add or remove bonus spells in the CurrentSpells variable, if defined
					var spellBonus = !CheckFea ? false : (propFea.spellcastingBonus ? propFea.spellcastingBonus : (FeaChoice && propFea[FeaChoice].spellcastingBonus ? propFea[FeaChoice].spellcastingBonus : false));
					if (spellBonus && propFea.minlevel <= newClassLvl[aClass]) {//if gaining the level
						//first see if the entry exists or not, and create it if it doesn't
						if (!CurrentSpells[aClass]) {
							CurrentSpells[aClass] = {
								name : temp.fullname,
								level : newClassLvl[aClass],
								ability : temp.abilitySave ? temp.abilitySave : 0,
								typeSp : "known",
								bonus : {},
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
					
					// --- add or remove custom calculations to the CurrentEvals variable
					if (CheckFea && propFea.calcChanges) {
						addEvals(propFea.calcChanges, [propFea.name, aClass], propFea.minlevel <= newClassLvl[aClass]);
					}
					if (CheckFea && FeaChoice && propFea[FeaChoice].calcChanges) {
						addEvals(propFea[FeaChoice].calcChanges, [propFea[FeaChoice].name, aClass], propFea.minlevel <= newClassLvl[aClass]);
					}
					
					// --- if a change was detected, do something via custom script, if defined
					if (propFea.changeeval) {
						var theChangeeval = What("Unit System") === "metric" && propFea.changeeval.indexOf("String") !== -1 ? ConvertToMetric(propFea.changeeval, 0.5) : propFea.changeeval;
						eval(theChangeeval);
					}
					
					thermoM(3/8); //increment the progress dialog's progress

					// --- add or remove action, if defined
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

					// --- add or remove skill proficiencies, if defined
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

					// --- add or remove extra spells in the CurrentSpells variable, if defined
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
					if (((Fea.UseOld || Fea.UseCalcOld) && propFea.minlevel > newClassLvl[aClass] && propFea.minlevel <= oldClassLvl[aClass]) || ((Fea.UseName !== Fea.UseNameOld || (!Fea.Use && !Fea.UseCalc) || (Fea.Recov !== Fea.RecovOld)) && (Fea.UseOld || Fea.UseCalcOld)) || Fea.Use.search(/unlimited|\u221E/i) !== -1) {
						RemoveFeature(Fea.UseNameOld ? Fea.UseNameOld : Fea.UseName, newClassLvl[aClass] === 0 ? "" : Fea.UseOld, "", "", "", "", Fea.UseCalcOld);
						Fea.UseOld = 0;
					}
					// now add the limited feature depending on the changes of the level or changes of something else or if it is being forced, as long as the usages have been defined
					if ((Fea.UseCalc || Fea.Use) && Fea.Use.search(/unlimited|\u221E/i) === -1 && (GoAnyway || (propFea.minlevel <= newClassLvl[aClass] && propFea.minlevel > oldClassLvl[aClass]))) {
						AddFeature(Fea.UseName, Fea.Use, Fea.Add ? " (" + Fea.Add + ")" : "", Fea.Recov, temp.fullname, Fea.UseOld, Fea.UseCalc);
					}
					
					thermoM(7/8); //increment the progress dialog's progress

					//--- get the new and old string of the class features
					var FeaOldString = ParseClassFeature(aClass, prop, oldClassLvl[aClass], ForceAll, FeaOldChoice);
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
					if (prop === "wild shape") {
						isWildShape = [newClassLvl[aClass], Fea.Use, Fea.Recov, Fea.Add];
						WSinUse = true;
					}
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
	if (Typeswitch !== "proficiencies") SetStringifieds(); //set the global variables to their fields for future reference
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
				bEnabled : array[i] !== "No class features detected that require a choice",
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
	var hasEldritchBlast = isSpellUsed("eldritch blast") ? true : false;
	
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
			if (propFea.extrachoices && propFea.minlevel <= classlevel) {
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
function ClassFeatureOptions(Input, AddOrRemove) {
	tDoc.delay = true;
	tDoc.calculate = false;
	var MenuSelection = Input ? Input : getMenu("classfeatures");
	AddOrRemove = AddOrRemove ? AddOrRemove : (MenuSelection && MenuSelection[4] ? MenuSelection[4] : "");
	var tempArray = [];

	if (AddOrRemove !== "stop" && MenuSelection && MenuSelection[0] !== "nothing") {
		thermoM("start"); //start a progress dialog
		thermoM("Applying class feature menu selection..."); //change the progress 
		var theFea = CurrentClasses[MenuSelection[0]].features[MenuSelection[1]];
		var FeaOldChoice = MenuSelection[3] === "extra" ? "" : GetClassFeatureChoice(MenuSelection[0], MenuSelection[1]);

		classlevel = classes.known[MenuSelection[0]].level;

		if (MenuSelection[3] === "extra") {
			//get a string for the feature
			var theFeaExtra = theFea[MenuSelection[2]];
			var FeaSource = theFeaExtra.source && SourceList[theFeaExtra.source[0]] ? ", " + SourceList[theFeaExtra.source[0]].abbreviation + (theFeaExtra.source[1] ? " " + theFeaExtra.source[1] : "") : "";
			var FeaStringMake = "\u25C6 " + theFeaExtra.name + " (" + theFea.extraname + FeaSource + ")" + theFeaExtra.description;
			var FeaString = What("Unit System") === "metric" ? ConvertToMetric(FeaStringMake, 0.5) : FeaStringMake;
			var Fea = ReturnClassFeatures(MenuSelection[0], MenuSelection[1], classlevel, MenuSelection[2], classlevel, MenuSelection[2], false, true);
			
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
			var DoLimFea = Fea.Add !== Fea.AddOld || Fea.Use !== Fea.UseOld || Fea.UseCalc !== Fea.UseCalcOld || Fea.Recov !== Fea.RecovOld || Fea.UseName !== Fea.UseNameOld
			
			//if something changed and the old has a limited feature, remove it
			if (DoLimFea && (Fea.UseOld || Fea.UseCalcOld)) {
				RemoveFeature(Fea.UseNameOld, Fea.UseOld, "", "", "", "", Fea.UseCalcOld);
			}
			//if something changed and the new has a limited feature, add it
			if (DoLimFea && (Fea.Use || Fea.UseCalc) && Fea.Use.search(/unlimited|\u221E/i) === -1) {
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
				bonus : {},
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
	}
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

//add a miscellaneous AC bonus. Filling in a 0 for ACbonus will remove the ability
//submitNm is a string that can be run as eval in an if statement. If this returns True, the armor bonus is not added to the total
function AddACMisc(ACbonus, Name, Tooltip, submitNm) {
	ACMiscFlds = ["AC Misc Mod 1", "AC Misc Mod 2", "AC Misc Mod 1 Description", "AC Misc Mod 2 Description"];
	for (var i = 0; i <= 1; i++) {
		var Mod = tDoc.getField(ACMiscFlds[i]);
		var Desc = tDoc.getField(ACMiscFlds[i + 2]);
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
		"ALlog",
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
}

//show a dialog when the subclass is not set but the level is high enough to need a subclass
function PleaseSubclass(theclass) {
	delete IsSubclassException[theclass];
	var returnTrue = false;
	if (IsNotImport && !classes.known[theclass].subclass && What("SubClass Remember").indexOf(theclass) === -1) {
		var aclass = ClassList[theclass];
		var aclassObj = {};
		var aclassArray = [];
		for (var i = 0; i < aclass.subclasses[1].length; i++) {
			var aSub = aclass.subclasses[1][i];
			if (!ClassSubList[aSub]) {
				console.println("The subclass '" + aSub + "' of the '" + theclass + "' class doesn't exist in the ClassSubList. It has been ignored for now, but it might cause errors with other things in the sheet. So please make sure to remedy this before proceeding!");
				console.show();
				continue;
			};
			if (testSource(aSub, ClassSubList[aSub], "classExcl")) continue;
			aclassObj[ClassSubList[aSub].subname] = aSub;
			aclassArray.push(ClassSubList[aSub].subname);
		};
		if (aclassArray.length === 0) return false; //no subclasses got through the test
		aclassArray.sort();
		
		var testSubClass = aclassObj[aclassArray[Math.round(aclassArray.length / 2) - 1]];

		var SubName1 = ClassSubList[testSubClass].subname;
		var SubName2 = ClassSubList[testSubClass].fullname ? ClassSubList[testSubClass].fullname : ClassSubList[testSubClass].subname;

		var classString = classes.known[theclass].string ? classes.known[theclass].string.capitalize() : aclass.name;
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
			if (i < 4 || (i + 1) <= Math.ceil((aclassArray.length) / 2)) {
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
					"tex0" : theString,
					"tex1" : asteriskString,
					"tex2" : moreString,
					"clu1" : clusterString
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
				AddString("SubClass Remember", theclass, false);
				dialog.end("other");
			},

			description : {
				name : aclass.name + " has no detectable " + aclass.subclasses[0],
				elements : [{
					type : "view",
					elements : [{
						type : "view",
						elements : [{
							type : "static_text",
							name : aclass.name + " has no detectable " + aclass.subclasses[0],
							item_id : "head",
							alignment : "align_top",
							font : "heading",
							bold : true,
							height : 21,
							width : 500,
						}, {
							type : "static_text",
							item_id : "tex0",
							alignment : "align_fill",
							font : "dialog",
							height : 45,
							width : 500,
						}, {
							type : "cluster",
							item_id : "clu1",
							font : "dialog",
							bold : true,
							elements : [{
								type : "view",
								align_children : "align_top",
								elements : [{
										type : "view",
										elements : SubclassArrayLeft,
									}, {
										type : "gap",
										width : 5,
									}, {
										type : "view",
										elements : SubclassArrayRight,
									}]
							}, {
								type : "static_text",
								item_id : "tex1",
								alignment : "align_fill",
								font : "dialog",
								height : !isAsterisk ? 0 : 18 * Math.ceil(asteriskString.length / 80),
								//width : 450,
							}]
						}, {
							type : "static_text",
							item_id : "tex2",
							alignment : "align_fill",
							font : "dialog",
							height : 18 + (18 * Math.ceil(moreString.length / 80)),
							width : 500,
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
			IsSubclassException[theclass] = true;
			returnTrue = true;
			var oldName = classes.known[theclass].string;
			if (!event.target.name || event.target.name !== "Class and Levels") {
				ReplaceString("Class and Levels", newName, false, oldName);
			} else {
				classes.field = classes.field.replace(RegExp(oldName, "i"), newName);
			}
		}
	}
	return returnTrue;
}

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

	var ACmagic = What("AC Magic");
	if (isNaN(ACmagic)) {
		ACmagic = Number(What(ACmagic + " Mod"));
	}
	var ACmisc1 = What("AC Misc Mod 1");
	var ACmisc1Desc = What("AC Misc Mod 1 Description");
	if (isNaN(ACmisc1)) {
		ACmisc1 = Number(What(ACmisc1 + " Mod"));
	}
	if (ACmisc1 && tDoc.getField("AC Misc Mod 1 Description").submitName && eval(tDoc.getField("AC Misc Mod 1 Description").submitName)) ACmisc1 = 0;
	
	var ACmisc2 = What("AC Misc Mod 2");
	var ACmisc2Desc = What("AC Misc Mod 2 Description");
	if (isNaN(ACmisc2)) {
		ACmisc2 = Number(What(ACmisc2 + " Mod"));
	}
	if (ACmisc2 && tDoc.getField("AC Misc Mod 2 Description").submitName && eval(tDoc.getField("AC Misc Mod 2 Description").submitName)) ACmisc2 = 0;
	
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
	var XPnextlvl = lvl && !isNaN(lvl) && lvl < 20 ? ExperiencePointsList[lvl] : "";
	event.value = XPnextlvl;
}

//calculate the Ability Save DC (field calculation)
function CalcAbilityDC() {
	var Nmbr = event.target.name.slice(-1);
	var SpellAbi = What("Spell DC " + Nmbr + " Mod");

	//damage added manually in the bluetext field
	var ExtraBonus = What("Spell DC " + Nmbr + " Bonus");
	if (isNaN(ExtraBonus)) {
		ExtraBonus = What(ExtraBonus + " Mod");
	}

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
			lastRowName = extraPre && lastRowName.indexOf(extraPre) !== 0 ? extraPre + lastRowName : lastRowName;
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
		endslot = FieldNumbers.gearMIrow
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
		type + "Gear Location.Row " + endslot,
	];
	if (!isComp) resetA.pop();
	tDoc.resetForm(resetA);
}

//add adventuring gear using the equipment menu
function AddEquipment(GearTool, Input, Column) {
	var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
	switch (GearTool) {
	case "gear":
		var theStuff = GearList[Input.toLowerCase()];
		break;
	case "tool":
		var theStuff = ToolsList[Input.toLowerCase()];
		break;
	}

	//continue if not a placeholder was selected
	if (theStuff && theStuff.name !== "-") {
		var AddInvLRM = Column === "left" ? "AddInvL" : (Column === "right" ? "AddInvR" : "AddInvM");
		tDoc[AddInvLRM](theStuff.name, theStuff.amount, RoundTo(theStuff.weight * massMod, 0.001, true));
	}
}

//Make menu for the button on each equipment line and parse it to Menus.gear
function MakeInventoryLineMenu() {
	var gearMenu = [];
	var type = event.target.name.indexOf("Adventuring") !== -1 ? "Adventuring " : (event.target.name.indexOf("Extra.") !== -1 ? "Extra." : event.target.name.substring(0, event.target.name.indexOf("Comp.") + 8) + ".");
	var lineNmbr = Number(event.target.name.slice(-2));
	var magic = What("Adventuring Gear Remember") === false && lineNmbr > FieldNumbers.gearMIrow;
	var lastslot = type === "Adventuring " ? FieldNumbers.gear : (type === "Extra." ? FieldNumbers.extragear : FieldNumbers.compgear);
	var totalslots = type === "Adventuring " && !magic && What("Adventuring Gear Remember") === false ? lastslot - 4 : lastslot;
	var moveToPage = type === "Adventuring " ? "Move to Extra Equipment (page 3)" : "Move to Equipment (page 2)";
	var theField = What(type + "Gear Row " + lineNmbr);
	var AScompA = What("Template.extras.AScomp").split(",");
	var prefix = type.substring(0, type.indexOf("Comp."));
	if (type.indexOf("Comp.") !== -1) AScompA.splice(AScompA.indexOf(prefix), 1);

	var noValDisable = [
		"Move to Extra Equipment (page 3)",
		"Move to Equipment (page 2)",
		"Move to right column",
		"Move to left column",
		"Move to middle column",
		"Insert line",
		"Copy to Magic Items (page 3)"
	]
	
	var menuLVL1 = function (item, array) {
		for (i = 0; i < array.length; i++) {
			var disabled = true
			if ((array[i] === "Move up" && (lineNmbr === 1 || (magic && lineNmbr === FieldNumbers.gearMIrow + 1))) || (array[i] === "Move down" && lineNmbr === totalslots) || (array[i] === "Insert line" && lineNmbr === totalslots)) {
				disabled = false;
			} else if (!theField && noValDisable.indexOf(array[i]) !== -1) {
				disabled = false;
			}
			item.push({
				cName : array[i],
				cReturn : array[i],
				bEnabled : disabled
			});
		}
	};
	
	var menuLVL2comp = function (menu, name, array) {
		var temp = {};
		temp.cName = name;
		temp.oSubMenu = [];
		for (var i = 0; i < array.length; i++) {
			var CompNm = What(array[i] + "Comp.Desc.Name");
			var CompPg = tDoc.getField(array[i] + "Comp.Desc.Name").page;
			if (array[i] === "" && !CompPg[1]) {
				continue;
			}
			CompPg = CompPg[1] ? CompPg[1] + 1 : CompPg + 1;
			temp.oSubMenu.push({
				cName : (CompNm ? CompNm : "'Companion name'") + "'s Equipment Section (page " + CompPg + ")",
				cReturn : name + "#" + array[i]
			})
		}
		if (temp.oSubMenu.length === 0 || array.length === 0 || !theField) {
			temp.bEnabled = false;
			delete temp.oSubMenu;
			temp.cReturn = "-";
		}
		menu.push(temp);
	};
	
	var MenuArray = ["Move up", "Move down", "-", moveToPage];
	if (type.indexOf("Comp.eqp.") !== -1) MenuArray.push("Move to Extra Equipment (page 3)");
	menuLVL1(gearMenu, MenuArray);
	menuLVL2comp(gearMenu, "Move to a Companion's Equipment", AScompA);
	
	var MenuArray = ["-"]
	if (type === "Adventuring " || type === "Extra." || (type.indexOf("Comp.eqp.") !== -1 && !typePF)) {
		var numColumns = typePF && type === "Adventuring " ? 3 : 2;
		var perColumn = Math.round(lastslot / numColumns);
		if (lineNmbr / perColumn > 2) {
			MenuArray.push("Move to left column");
			MenuArray.push("Move to middle column");
		} else if (lineNmbr / perColumn > 1) {
			MenuArray.push("Move to left column");
			if (numColumns === 3) MenuArray.push("Move to right column");
		} else {
			if (numColumns === 3) MenuArray.push("Move to middle column");
			MenuArray.push("Move to right column");
		}
		if (magic) {
			MenuArray.push("-");
			MenuArray.push("Copy to Magic Items (page 3)");
		};
	}
	MenuArray = MenuArray.concat(["-", "Insert line", "Delete line", "Clear line"]);
	menuLVL1(gearMenu, MenuArray);

	Menus.gear = gearMenu;
};

//call the inventory menu and do something with the results
function InventoryLineOptions() {
	tDoc.delay = true;
	tDoc.calculate = false;

	var MenuSelection = getMenu("gear");
	var type = event.target.name.indexOf("Adventuring") !== -1 ? "Adventuring " : (event.target.name.indexOf("Extra.") !== -1 ? "Extra." : event.target.name.substring(0, event.target.name.indexOf("Comp.") + 8) + ".");
	var lineNmbr = Number(event.target.name.slice(-2));
	var magic = What("Adventuring Gear Remember") === false && lineNmbr > FieldNumbers.gearMIrow;
	var lastslot = type === "Adventuring " ? FieldNumbers.gear : (type === "Extra." ? FieldNumbers.extragear : FieldNumbers.compgear);
	var totalslots = type === "Adventuring " && !magic && What("Adventuring Gear Remember") === false ? lastslot - 4 : lastslot;
	var prefix = type.substring(0, type.indexOf("Comp."));
	var Fields = [
		type + "Gear Row " + lineNmbr,
		type + "Gear Amount " + lineNmbr,
		type + "Gear Weight " + lineNmbr,
		type + "Gear Location.Row " + lineNmbr,
	];
	var FieldsValue = [
		What(Fields[0]),
		What(Fields[1]),
		What(Fields[2]),
		What(Fields[3]),
	];
	if (lineNmbr !== 1) {
		var FieldsUp = [
			type + "Gear Row " + (lineNmbr - 1),
			type + "Gear Amount " + (lineNmbr - 1),
			type + "Gear Weight " + (lineNmbr - 1),
			type + "Gear Location.Row " + (lineNmbr - 1),
		];
		var FieldsUpValue = [
			What(FieldsUp[0]),
			What(FieldsUp[1]),
			What(FieldsUp[2]),
			What(FieldsUp[3]),
		];
	}
	if (lineNmbr !== totalslots) {
		var FieldsDown = [
			type + "Gear Row " + (lineNmbr + 1),
			type + "Gear Amount " + (lineNmbr + 1),
			type + "Gear Weight " + (lineNmbr + 1),
			type + "Gear Location.Row " + (lineNmbr + 1),
		];
		var FieldsDownValue = [
			What(FieldsDown[0]),
			What(FieldsDown[1]),
			What(FieldsDown[2]),
			What(FieldsDown[3]),
		];
	}
	
	if (type.indexOf("Comp.") !== -1) {
		Fields.pop();
	}
	
	if (MenuSelection !== undefined) {
		switch (MenuSelection[0]) {
		case "move up":
			thermoM("Moving the gear up..."); //change the progress dialog text
			for (var H = 0; H < Fields.length; H++) {
				Value(FieldsUp[H], FieldsValue[H]);
				Value(Fields[H], FieldsUpValue[H]);
				thermoM(H/Fields.length); //increment the progress dialog's progress
			};
			break;
		case "move down":
			thermoM("Moving the gear down..."); //change the progress dialog text
			for (var H = 0; H < Fields.length; H++) {
				Value(FieldsDown[H], FieldsValue[H]);
				Value(Fields[H], FieldsDownValue[H]);
				thermoM(H/Fields.length); //increment the progress dialog's progress
			};
			break;
		case "move to extra equipment (page 3)":
			thermoM("Moving the gear to page 3..."); //change the progress dialog text
			AddInvLExtra(FieldsValue[0], FieldsValue[1], FieldsValue[2], FieldsValue[3]);
			InvDelete(type, lineNmbr);
			break;
		case "move to equipment (page 2)":
			thermoM("Moving the gear to page 2..."); //change the progress dialog text
			AddInvL(FieldsValue[0], FieldsValue[1], FieldsValue[2], FieldsValue[3]);
			InvDelete(type, lineNmbr);
			break;
		case "move to right column":
			thermoM("Moving the gear to the right column..."); //change the progress dialog text
			if (type === "Adventuring ") {
				AddInvR(FieldsValue[0], FieldsValue[1], FieldsValue[2], FieldsValue[3]);
			} else if (type === "Extra.") {
				AddInvRExtra(FieldsValue[0], FieldsValue[1], FieldsValue[2], FieldsValue[3]);
			} else { //companion page
				AddInvRComp(FieldsValue[0], FieldsValue[1], FieldsValue[2], prefix);
			}
			InvDelete(type, lineNmbr);
			break;
		case "move to left column":
			thermoM("Moving the gear to the left column..."); //change the progress dialog text
			if (type === "Adventuring ") {
				AddInvL(FieldsValue[0], FieldsValue[1], FieldsValue[2], FieldsValue[3]);
			} else if (type === "Extra.") {
				AddInvLExtra(FieldsValue[0], FieldsValue[1], FieldsValue[2], FieldsValue[3]);
			} else { //companion page
				AddInvLComp(FieldsValue[0], FieldsValue[1], FieldsValue[2], prefix);
			}
			InvDelete(type, lineNmbr);
			break;
		case "move to middle column":
			thermoM("Moving the gear to the middle column..."); //change the progress dialog text
			if (type === "Adventuring ") {
				AddInvM(FieldsValue[0], FieldsValue[1], FieldsValue[2], FieldsValue[3]);
			}
			InvDelete(type, lineNmbr);
			break;
		case "insert line":
			thermoM("Inserting empty gear line..."); //change the progress dialog text
			InvInsert(type, lineNmbr);
			break;
		case "delete line":
			thermoM("Deleting gear line..."); //change the progress dialog text
			InvDelete(type, lineNmbr);
			break;
		case "clear line":
			thermoM("Clearing gear line..."); //change the progress dialog text
			tDoc.resetForm(Fields);
			break;
		case "copy to magic items (page 3)":
			thermoM("Copying the gear to magic items on page 3..."); //change the progress dialog text
			AddMagicItem(FieldsValue[0], true, "", FieldsValue[2]);
			break;
		case "move to a companion's equipment":
			AddInvLComp(FieldsValue[0], FieldsValue[1], FieldsValue[2], MenuSelection[1]);
			InvDelete(type, lineNmbr);
			break;
		}
	}

	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
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
			"Reaction Used This Round",
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
			"SpellSlots2.Checkboxes.",
		];
		if (What("Manual Attack Remember") === "Yes") exceptionPartsArray.push("Attack.");
		var TooMuchExceptionArray = [
			"AC Stealth Disadvantage",
		]
		var tempReadOnlyArray = [];
		var tempNoPrintArray = [];
		for (var F = 0; F < tDoc.numFields; F++) {
			var Fname = tDoc.getNthFieldName(F);
			if (Fname) {
				var Ffield = tDoc.getField(Fname);

				//check if field is not in one of the exceptionlists, but continue if it is in the TooMuchExceptionArray
				var isException = (exceptionArray.indexOf(Fname) !== -1 || Fname.search(/^(Bonus |Re)?action \d+/i) !== -1) && Fname.search(/button/i) === -1 && Fname.search(/Attack\.\d+\.Weapon$/i) === -1;
				if (!isException && Fname.search(/button/i) === -1) {
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
	} else if (!toggle) {
		var tempArrayBoth = What("MakeMobileReady Remember").split("!#TheListSeparator#!");
		tempReadOnlyArray = tempArrayBoth[0].split(",");
		tempNoPrintArray = tempArrayBoth[1].split(",");
		for (var RO = 0; RO < tempReadOnlyArray.length; RO++) {
			tDoc.getField(tempReadOnlyArray[RO]).readonly = false;
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
		"Copy to Adventuring Gear (page 2)",
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
	tDoc.delay = true;
	tDoc.calculate = false;

	var MenuSelection = getMenu("magicitems");
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
		What(Fields[3]),
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
			What(FieldsUp[3]),
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
			What(FieldsDown[3]),
		];
	}

	if (MenuSelection !== undefined) {
		thermoM("start"); //start a progress dialog
		thermoM("Magic item menu option..."); //change the progress 
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
			thermoM("Copying the magic to equipment section on page 2..."); //change the progress dialog text
			AddInvR(FieldsValue[0], "", (FieldsValue[3] > 0 ? FieldsValue[3] : ""));
			break;
		case "copy to attuned magical items (page 2)" :
			thermoM("Copying the magic to attuned magical items section on page 2..."); //change the progress dialog text
			AddInvMagic(FieldsValue[0], "", (FieldsValue[3] > 0 ? FieldsValue[3] : ""));
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
	}

	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
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
			if (n === 1 && ((Name.value.search(RegExp(RegExItem, "i")) !== -1 && Name.value.search(RegExp(RegExItem + " \\+\\d+", "i")) === -1) || Name.value.toLowerCase() === item.toLowerCase())) {
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
		if ((Name.search(RegExp(RegExItem, "i")) !== -1 && Name.search(RegExp(RegExItem + " \\+\\d+", "i")) === -1) || Name.toLowerCase() === item.toLowerCase()) {
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

//add a magic item to the second page
function AddInvMagic(item, amount, weight, location) {
	location = location === undefined ? "" : location;
	var RegExItem = item.substring(0, 2) === "- " ? "\\b" + item.substring(2).RegEscape() + "\\b" : "\\b" + item.RegEscape() + "\\b";
	var tempFound = false;
	for (var i = 1; i <= FieldNumbers.gear; i++) {
		var Name = tDoc.getField("Adventuring Gear Row " + i);
		var Nmbr = tDoc.getField("Adventuring Gear Amount " + i);
		var Wht = tDoc.getField("Adventuring Gear Weight " + i);
		var Loc = tDoc.getField("Adventuring Gear Location.Row " + i);
		if ((Name.value.search(RegExp(RegExItem, "i")) !== -1 && Name.value.search(RegExp(RegExItem + " \\+\\d+", "i")) === -1) || Name.value === item) {
			if (Nmbr.value === "") {
				Nmbr.value = 2;
			} else if (!isNaN(Nmbr.value) && amount === "") {
				Nmbr.value += 1;
			} else if (!isNaN(Nmbr.value) && !isNaN(amount)) {
				Nmbr.value += amount;
			} else {
				Name.value += " + one more";
			};
			i = 500;
			tempFound = true;
		}
	}
	if (!tempFound) {
		for (var i = (FieldNumbers.gearMIrow + 1); i <= FieldNumbers.gear; i++) {
			Name = tDoc.getField("Adventuring Gear Row " + i);
			Nmbr = tDoc.getField("Adventuring Gear Amount " + i);
			Wht = tDoc.getField("Adventuring Gear Weight " + i);
			Loc = tDoc.getField("Adventuring Gear Location.Row " + i);
			if (Name.value === "" && Nmbr.value === "" && Wht.value === "") {
				Name.value = item;
				Nmbr.value = amount;
				Wht.value = weight;
				Loc.value = location;
				i = 500;
			}
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
	var type = event.target.name.match(/extra.*/i) ? "Extra.Gear " : (event.target.name.match(/Adventuring.*/i) ? "Adventuring Gear " : event.target.name.substring(0, event.target.name.indexOf("Comp.") + 14));
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
				"rCar" : !this.UseEnc,
			});
			
			if (this.AddMiddleC) {
				dialog.load({
					"cP2M" : What("Weight Remember Page2 Middle") !== "No",
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
						type : "cluster",
						align_children : "align_distribute",
						name : "Count towards the Total Weight on the second page",
						bold : true,
						font : "heading",
						char_width : 44,
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
									char_width : 20,
								}, {
									type : "static_text",
									item_id : "tArm",
									name : (this.AddMiddleC ? "\"Armor\"" : "\"Defense\"") + " section on the 1st page.",
								}, ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cShi",
									name : "Shield",
									char_width : 20,
								}, {
									type : "static_text",
									item_id : "tShi",
									name : (this.AddMiddleC ? "\"Armor\"" : "\"Defense\"") + " section on the 1st page.",
								}, ]
							}, {
								type : "view",
								align_children : "align_row",
								char_height : 2,
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cWea",
									name : "Weapons",
									char_width : 20,
								}, {
									type : "static_text",
									item_id : "tWea",
									name : "\"Attacks\" section on the 1st page.",
								}, ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cAmL",
									name : "Ammunition on the left",
									char_width : 20,
								}, {
									type : "static_text",
									item_id : "tAmL",
									name : "\"Attacks\" section on the 1st page.",
								}, ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cAmR",
									name : "Ammunition on the right",
									char_width : 20,
								}, {
									type : "static_text",
									item_id : "tAmR",
									name : "\"Attacks\" section on the 1st page.",
								}, ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cCoi",
									name : "Coins",
									char_width : 20,
								}, {
									type : "static_text",
									item_id : "tCoi",
									name : "\"Equipment\" section on the 2nd page (1 lb per 50).",
								}, ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cP2L",
									name : "Left column equipment",
									char_width : 20,
								}, {
									type : "static_text",
									item_id : "tP2L",
									name : "\"Equipment\" section on the 2nd page.",
								}, ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cP2M",
									name : "Middle column equipment",
									char_width : 20,
								}, {
									type : "static_text",
									item_id : "tP2M",
									name : "\"Equipment\" section on the 2nd page.",
								}, ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cP2R",
									name : "Right column equipment",
									char_width : 20,
								}, {
									type : "static_text",
									item_id : "tP2R",
									name : "\"Equipment\" section on the 2nd page.",
								}, ]
							}, {
								type : "view",
								char_height : 2,
								align_children : "align_row",
								char_width : 40,
								elements : [{
									type : "check_box",
									item_id : "cP3L",
									name : "Left column extra equipment",
									char_width : 20,
								}, {
									type : "static_text",
									item_id : "tP3L",
									name : "\"Extra Equipment\" section on the 3rd page.",
								}, ]
							}, {
								type : "view",
								align_children : "align_row",
								char_width : 40,
								char_height : 2,
								elements : [{
									type : "check_box",
									item_id : "cP3R",
									name : "Right column extra equipment",
									char_width : 20,
								}, {
									type : "static_text",
									item_id : "tP3R",
									name : "\"Extra Equipment\" section on the 3rd page.",
								}, ]
							}, {
								type : "view",
								align_children : "align_row",
								char_width : 40,
								char_height : 2,
								elements : [{
									type : "check_box",
									item_id : "cMaI",
									name : "Magic items",
									char_width : 20,
								}, {
									type : "static_text",
									item_id : "tMaI",
									name : "\"Magic Items\" section on the 3rd page.",
								}, ]
							}, ]
						}, ]
					}, {
						type : "static_text",
						item_id : "text",
						alignment : "align_fill",
						font : "dialog",
						char_height : 9,
						char_width : 45,
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
							name : "Use the variant encumbrance rules",
						}, {
							type : "radio",
							item_id : "rCar",
							group_id : "encu",
							name : "Use the fixed carrying capacity rules",
						}, ]
					}, {
						type : "gap",
						height : 8,
					}, ]
				}, {
					type : "ok_cancel",
					ok_name : "Apply",
				}, ]
			}, ]
		}
	};
	
	var isEnc = tDoc.getField("Weight Carrying Capacity.Field").display === display.hidden;
	WeightToCalc_Dialog.UseEnc = isEnc;
	
	if (!typePF) {
		WeightToCalc_Dialog.AddMiddleC = false;
		//remove the option about the middle column on the second page
		WeightToCalc_Dialog.description.elements[0].elements[0].elements[0].elements[0].elements.splice(7, 1);
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
function ParseAmmo(input) {
	if (!input) return "";
	var tempString = input.toLowerCase();
	var output = "";
	var tempFound = 0;
	
	//scan string for all weapons, including the alternative spellings
	for (var key in AmmoList) {
		if (AmmoList[key].alternatives) {
			for (var z = 0; z < AmmoList[key].alternatives.length; z++) {
				if (tempFound < AmmoList[key].alternatives[z].length && tempString.indexOf(AmmoList[key].alternatives[z]) !== -1) {
					output = key;
					tempFound = AmmoList[key].alternatives[z].length;
				}
			}
		};
		if (tempFound < key.length && tempString.indexOf(key) !== -1) {
			output = key;
			tempFound = key.length;
		};
	}
	
	return output;
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
		"AmmoRightDisplay.Name",
	]
	for (var n = 1; n <= 2; n++) {
		for (var i = 0; i < AmmoFlds.length; i++) {
			var next = tDoc.getField(AmmoFlds[i]);
			if (n === 1 && (next.value.search(RegExp(inputtxt.RegEscape(), "i")) !== -1 || next.value.toLowerCase().indexOf(inputtxt) !== -1)) {
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
		"AmmoRightDisplay.Name",
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
		theDropList.push(theAmmo.name);
	}
	
	tDoc.getField("AmmoLeftDisplay.Name").setItems(theDropList);
	tDoc.getField("AmmoLeftDisplay.Name").userName = string;
	
	tDoc.getField("AmmoRightDisplay.Name").setItems(theDropList);
	tDoc.getField("AmmoRightDisplay.Name").userName = string;
	
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
			"Spell DC 1 Mod.1",
		];
		tDoc[VisibleHidden]("Spell DC 1 Mod.0");
	} else {
		var DC1array = [
			"Text.SaveDC.1",
			"Image.SaveDCarrow.1",
			"Image.SaveDC.1",
			"Spell DC 1 Mod",
			"Spell save DC 1",
			"Spell DC 1 Bonus",
		];
		var DC2array = [
			"Text.SaveDC.2",
			"Image.SaveDCarrow.2",
			"Image.SaveDC.2",
			"Spell DC 2 Mod",
			"Spell save DC 2",
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
		"DividerFlip",
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
		"Comp.eqpB",
	];
	var fillList = [
		"Line",
	];
	var textList = [
		"Background Feature",
		"Background_Faction.Title",
		"Background_FactionRank.Title",
		"Background_Renown.Title",
		"Text.Armor Proficiencies",
		"Text.Weapon Proficiencies",
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
		"IntArrow",
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
		"spellsdiv.",
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
		"Buttons",
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
					bMarked : lookIt === array[i],
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
					bMarked : lookIt === array[i],
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
					bMarked : lookIt === array[i],
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
					bMarked : lookIt === array[i],
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
		tempArray.push(feature.capitalize());
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
				bMarked : (isCurrent === "" && array[i] === "basic") || isCurrent === array[i],
			});
		}
	};

	var RaceMenu = [];
	
	if (racialVarArr.length === 1) {
		RaceMenu = [{
			cName : "No race options that require a choice",
			cReturn : "nothing",
			bEnabled : false,
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
	var INtoM = function (unit) {
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
	var measurements = inputString.match(/\b\d+(,|\.|\/)?\d*\/?(\d+?(,|\.|\/)?\d*)?\s?-?((miles?|ft|foot|feet|sq ft|square foot|square feet|cu ft|cubic foot|cubic feet|lbs?|pounds?)\b|('($|\s)|'\d+\w?"))/ig);

	if (measurements) {
		for (var i = 0; i < measurements.length; i++) {
			if (measurements[i].match(/'/) && measurements[i].match(/\"/)) {
				var orgFT = parseFloat(measurements[i].substring(0,measurements[i].indexOf("'")));
				var orgIN = parseFloat(measurements[i].substring(measurements[i].indexOf("'") + 1, measurements[i].indexOf("\"")));
				var resulted = theConvert(parseFloat(orgIN/12) + parseFloat(orgFT), "ft");
			} else {
				var org = measurements[i].replace(/,/g, ".");
				var orgUnit = org.match(/([a-z]+|')$/)[0], fraction;
				
				if ( fraction = org.match(/(\d+\.?\d*)\/(\d+\.?\d*)/) ){
					var resulted = [theConvert(fraction[1], orgUnit), theConvert(fraction[2], orgUnit)];
				} else {
					var resulted = theConvert(parseFloat(org), orgUnit);
				}
			}
			
			var delimiter = measurements[i].match("-") ? "-" : " ";
			
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
	var INofM = function (unit) {
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
			
			var delimiter = measurements[i].match("-") ? "-" : " ";
			
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
			"MoreProficiencies",
		];
		//Weight fields (that don't include a unit) to update with 4 decimals
		var FldsWeight = [
			"AC Armor Weight",
			"AC Shield Weight",
			"AmmoLeftDisplay.Weight",
			"AmmoRightDisplay.Weight",
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
	}
	
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
}

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
		"Feat Description ",
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
		"Feat Description ",
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
		IsNotFeatMenu = true;
		
		//empty the selected slot
		tDoc.resetForm(Fields);
	}
}

//delete a feat at the position wanted and move the rest up
function FeatDelete(itemNmbr) {
	var maxNmbr = FieldNumbers.feats;
	maxNmbr = itemNmbr > (maxNmbr - 4) || What("Feat Name " + (maxNmbr - 4)) ? maxNmbr : maxNmbr - 4;//stop at the end of the first page if last one on first page is empty
	var FieldNames = [
		"Feat Name ",
		"Feat Note ",
		"Feat Description ",
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
				bEnabled : !disable,
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
				bMarked : lookIt === array[i],
			})
		}
	};

	//make the attack menu
	var attackMenu = [];
	var itemNmbr = Number(event.target.name.slice(-1));
	var maxItems = QI ? FieldNumbers.attacks : 3;
	var theField = What("Manual Attack Remember") === "No" ? What(prefix + Q + "Attack." + itemNmbr + ".Weapon Selection") : What(prefix + Q + "Attack." + itemNmbr + ".Weapon");
	var theWea = CurrentWeapons.known[itemNmbr - 1];
	var isWeapon = QI && ((!theWea[0] && CurrentWeapons.field[itemNmbr - 1]) || (theWea[0] && (WeaponsList[theWea[0]].type === "Simple" || WeaponsList[theWea[0]].type === "Martial")));
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
	tDoc.delay = true;
	tDoc.calculate = false;
	
	var QI = event.target.name.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : event.target.name.substring(0, event.target.name.indexOf("Comp."));
	var maxItems = QI ? FieldNumbers.attacks : 3;

	var MenuSelection = getMenu("attacks");
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
	
	if (MenuSelection !== undefined) {
		thermoM("start"); //start a progress dialog
		thermoM("Weapon menu option..."); //change the progress
		var IconFld = !typePF ? tDoc.getField(prefix + "Image." + Q + "Attack." + itemNmbr).buttonGetIcon() : "";
		var findWeaps = false;
		switch (MenuSelection[0]) {
		 case "move up":
			thermoM("Moving the attack up..."); //change the progress dialog text
			IsNotWeaponMenu = false;
			for (var H = 0; H < FieldNames.length; H++) {
				Value(FieldsUp[H], FieldsValue[H]);
				Value(Fields[H], FieldsUpValue[H]);
				if (!QI && Fields[H].match(/description/i)) SwapTooltip(FieldsUp[H], Fields[H])
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
				if (!QI && Fields[H].match(/description/i)) SwapTooltip(FieldsDown[H], Fields[H])
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
			if (What("Manual Attack Remember") === "No") {
				AddInvR(FieldsValue[3], "", FieldsValue[7]);
			} else {
				AddInvR(FieldsValue[0], "", FieldsValue[7]);
			}
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
	};
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

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
				Value(prefix + FieldNames[H][0] + Q + "Attack." + i + FieldNames[H][1], What(fromFld), !QI && FieldNames[H][1].match(/description/i) ? Who(fromFld) : undefined);
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
			Value(prefix + FieldNames[H][0] + Q + "Attack." + i + FieldNames[H][1], What(fromFld), !QI && FieldNames[H][1].match(/description/i) ? Who(fromFld) : undefined);
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
		"Adventuring Gear Weight " + FieldNumbers.gearMIrow,
	]
	var MagicItems = [
		"Attuned Magic Items Whiteout",
		"Attuned Magic Items Title",
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
}

//at level that ends up editing the level field, ask for which class to add a level to, or start multiclassing
function AskMulticlassing() {
	var Nmbr = classes.parsed.length;
	var Cl1 = classes.parsed[0] ? classes.parsed[0][0].capitalize() : "";
	var Cl2 = classes.parsed[1] ? classes.parsed[1][0].capitalize() : "";
	var Cl3 = classes.parsed[2] ? classes.parsed[2][0].capitalize() : "";
	var Cl4 = classes.parsed[3] ? classes.parsed[3][0].capitalize() : "";
	var CharLVL = parseFloat(What("Character Level"));
	var ClassLVL = 0;
	if (classes.parsed[0]) {
		for (var i = 0; i < Nmbr; i++) {
			ClassLVL += classes.parsed[i][1];
		}
	}
	var toAdd = Number(CharLVL) - Number(ClassLVL);
	
	if (IsNotImport && toAdd !== 0) {
		Multiclassing_Dialog.ClassNmbrs = parseFloat(Nmbr);
		Multiclassing_Dialog.Class1 = Cl1;
		Multiclassing_Dialog.Class2 = Cl2;
		Multiclassing_Dialog.Class3 = Cl3;
		Multiclassing_Dialog.Class4 = Cl4;
		Multiclassing_Dialog.LVLchange = parseFloat(toAdd);
		
		//call the dialog
		app.execDialog(Multiclassing_Dialog);
			
		var dResult = Multiclassing_Dialog.Selection;
		var AddAll = Multiclassing_Dialog.All;
		//do something if the result is adding a new class
		if (dResult !== "" && isNaN(dResult)) {
			classes.parsed[Nmbr] = [];
			classes.parsed[Nmbr][0] = dResult;
			classes.parsed[Nmbr][1] = AddAll ? toAdd : sign(toAdd);
		} else if (dResult !== "") { //do something if one of the existing classes was chosen, and do nothing if an empty string was chosen
			classes.parsed[dResult - 1][1] += AddAll ? toAdd : sign(toAdd);
		}
		
		var newClassText = "";
		if (classes.parsed.length > 1) {
			for (var i = 0; i < classes.parsed.length; i++) {
				newClassText += i !== 0 ? ", " : "";
				newClassText += classes.parsed[i][0].capitalize() + " " + classes.parsed[i][1];
			}
		} else if (classes.parsed.length === 1) {
			newClassText = classes.parsed[0][0].capitalize();
		}
		
		if (!AddAll) {
			AskMulticlassing();
		} else if (newClassText) {
			if (What("Class and Levels") === newClassText) {
				ApplyClasses(newClassText);
			} else {
				Value("Class and Levels", newClassText);
			}
			Value("Character Level", CharLVL);
		}
	}
}

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
				"Line.SpellSlots",
			]
			var LimitedFeatureFields = [
				"Image.LimitedFeatures.Full",
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
			prefix + "SpellSlots" + suffix + ".Extra",
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
			if (theLoc.search(RegExp(toSearch, "i")) === 0) {
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
	var defaultTxt = toUni("The JavaScript") + " you put into the field below will be run immediately and whenever the sheet is opened, using eval().\nIf the script results in an error you will be informed immediately and the script will not be added to the sheet.\n" + toUni("This overwrites") + " whatever code you have previously added to the sheet. What you submit now (all dialogues put together) does not get added to anything you entered before, but will replace it.\n" + toUni("Reset the sheet") + " before you enter code into it (or use a fresh one).\n\n" + toUni("Be warned") + ", things you do here can break the sheet! If you are unsure how to write JavaScript to do what you want, please " + toUni("contact MorePurpleMoreBetter") + " on enworld.org, reddit, or via flapkan@gmail.com.\n\n";
	var extraTxt = toUni("A character limit of 65642") + " applies to the area below. You can add longer scripts by using the \"Open Another Dialogue\" button. That way you get more dialogues like this one. When you press \"Add Script to Sheet\", the code of all dialogues will be joined together (with not characters put inbetween!), is then run/tested and added to the sheet as a whole.\n" + toUni("An error will result in all content being lost") + ", so please save it somewhere else as well!";
	var getTxt = toUni("Using the proper syntax") + ", you can add homebrew materials for classes, races, weapons, feats, spells, backgrounds, etc. Section 3 of the " + toUni("FAQ") + " has more information and links to the syntax.\n\n" + toUni("Pre-Written Scripts ") + " can be obtained using the \"Additional Content\" button to the left. These include some more Unearthed Arcana materials, as well as the materials by Matthew Mercer (Blood Hunter, Gunslinger, College of the Maestro), and more...";
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
			defaultTxt : defaultTxt,
			extraTxt : extraTxt,
			getTxt : getTxt,
			script: theUserScripts.length >= diaIteration ? theUserScripts[diaIteration - 1] : "",

			initialize: function(dialog) {
				dialog.load({
					"jscr": this.script,
					"head": "Add custom JavaScript that is run on startup (dialogue " + this.iteration + "/" + this.diaMax + ")",
					"txt0": this.iteration === 1 ? this.defaultTxt + this.extraTxt : this.extraTxt,
					"txt1": this.getTxt,
				});
				dialog.enable({
					bPre : this.iteration > 1,
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
			bADD: function(dialog) {
				contactMPMB("additions");
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
							type : "static_text",
							item_id : "head",
							alignment : "align_fill",
							font : "heading",
							bold : true,
							height : 21,
							width : 640,
						}, {
							type : "static_text",
							item_id : "txt0",
							alignment : "align_fill",
							font : "dialog",
							char_height : 20,
							width : 640,
						}, {
							type : "view",
							align_children : "align_distribute",
							elements : [{
								type : "view",
								align_children : "align_left",
								elements : [{
									type : "button",
									item_id : "bFAQ",
									name : "Open the FAQ", //Cancel && 
									width : 100,
								}, {
									type : "gap",
									height : 5,
								}, {
									type : "button",
									item_id : "bADD",
									name : "Additional Content",
									width : 100,
								}, ]
							}, { 
								type : "view",
								align_children : "align_right",
								elements : [{
									type : "static_text",
									item_id : "txt1",
									alignment : "align_fill",
									font : "dialog",
									char_height : 10,
									width : 500,
								}, ]
							}, ]
						}, {
							type : "edit_text",
							item_id : "jscr",
							alignment : "align_fill",
							multiline: true,
							height : selBoxHeight,
							width : 640,
						}, {
							type : "gap",
							height : 5,
						}, ]
					}, {
						type : "view",
						align_children : "align_row",
						width : 640,
						elements : [{
							type : "button",
							name : "<< Go to Previous Dialogue",
							item_id : "bPre",
							alignment : "align_right",
						}, {
							type : "ok_cancel_other",
							other_name : "Open Another Dialogue",
							ok_name : "Add Script to Sheet",
							item_id : "OKbt",
							alignment : "align_right",
						}, ]
					}, ]
				}, ]
			}
		};
		if (moreDialogues) {
			AddUserScript_dialog.description.elements[0].elements[1].elements[1].type = "ok_cancel";
			AddUserScript_dialog.description.elements[0].elements[1].elements[1].ok_name = "Go to Next Dialogue >>";
		};
		if (diaIteration > 1) {
			AddUserScript_dialog.description.elements[0].elements[0].elements[1].char_height = 7;
		}
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
		} else {
			diaIteration += 1;
		};
	}
	while (askForScripts !== "ok" && askForScripts !== "cancel");

	if (askForScripts === "ok") {
		theUserScripts = theUserScripts.join("");
		try {
			eval(theUserScripts);
			Value("User Script", theUserScripts.replace(/UpdateDropdown\([^\)]*\)\;?\r?/g, ""));
		} catch (e) {
			app.alert({
				cMsg : "The script you entered is faulty, it returns the following error when run:\n\"" + e + "\"\n\nYour script has not been added to the sheet, please try again after fixing the error.",
				nIcon : 0,
				cTitle : "Error in your script",
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
			cTitle : "Error in user-defined script",
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
		event.value = event.value ? "+" + event.value : event.value;
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