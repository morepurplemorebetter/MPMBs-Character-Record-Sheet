// all the very basic functions and text manipulation functions
var tDoc = this;

function Hide(field) {
	if (tDoc.getField(field)) tDoc.getField(field).display = display.hidden;
};

function DontPrint(field) {
	if (tDoc.getField(field)) tDoc.getField(field).display = display.noPrint;
};

function Show(field) {
	if (tDoc.getField(field)) tDoc.getField(field).display = display.visible;
};

function isDisplay(field) {
	return !tDoc.getField(field) ? 100 : tDoc.getField(field).display;
};

function Editable(field) {
	if (tDoc.getField(field)) tDoc.getField(field).readonly = false;
};

function Uneditable(field) {
	if (tDoc.getField(field)) tDoc.getField(field).readonly = true;
};

function Value(field, FldValue, tooltip, submitNm) {
	if (!tDoc.getField(field)) return false;
	tDoc.getField(field).value = FldValue;
	if (tooltip !== undefined) tDoc.getField(field).userName = tooltip;
	if (submitNm !== undefined) tDoc.getField(field).submitName = submitNm;
};

function What(field) {
	return tDoc.getField(field) ? tDoc.getField(field).value : BackwardsCompatible[field] ? eval(BackwardsCompatible[field]) : "";
};

function Who(field) {
	return tDoc.getField(field) ? tDoc.getField(field).userName : "";
};

function How(field) {
	return tDoc.getField(field) ? tDoc.getField(field).submitName : "";
};

function Clear(field) {
	if (tDoc.getField(field)) tDoc.getField(field).clearItems();
};

function AddTooltip(field, tooltip, submitNm) {
	if (!tDoc.getField(field)) return false;
	if (tooltip !== undefined) tDoc.getField(field).userName = tooltip;
	if (submitNm !== undefined) tDoc.getField(field).submitName = submitNm;
};

function SwapTooltip(field1, field2) {
	tt1 = Who(field1);
	tt2 = Who(field2);
	AddTooltip(field1, tt2);
	AddTooltip(field2, tt1);
};

function Checkbox(field, FldValue, tooltip, submitNm) {
	if (!tDoc.getField(field)) return false;
	var Checkit = (FldValue === undefined) ? true : FldValue;
	var checkNo = isArray(tDoc.getField(field).page) ? tDoc.getField(field).page.length : 1;
	for (var c = 0; c < checkNo; c++) {
		tDoc.getField(field).checkThisBox(c, Checkit);
	}
	if (tooltip !== undefined) tDoc.getField(field).userName = tooltip;
	if (submitNm !== undefined) tDoc.getField(field).submitName = submitNm;
};

function desc(arr, joinStr) {
	joinStr = joinStr ? joinStr : "\n   ";
	if (!Array.isArray(arr)) return joinStr + arr;
	return joinStr + arr.join(joinStr);
};

// Call all the prototypes within their own function so we can call it again when importing, forcing the latest version
function setPrototypes() {
	// Adding a way of capitalizing every first letter of every word in a string
	String.prototype.capitalize = function () {
		// Based on https://github.com/blakeembrey/change-case/tree/master/packages/title-case
		var SMALL_WORDS = /\b(an?d?|a[st]|because|but|by|en|for|i[fn]|neither|nor|o[fnr]|only|over|per|so|some|tha[tn]|the|to|up|upon|vs?|versus|via|when|with|without|yet)\b/i;
		var TOKENS = /[^\s:]+|./g;
		var WHITESPACE = /\s/;
		var IS_MANUAL_CASE = /.(?=[A-Z]|\..)/;
		var ALPHANUMERIC_PATTERN = /[A-Za-z0-9\u00C0-\u017F]/;
		var input = this;
		var result = "";
		var m = TOKENS.exec(input);

		while (m !== null) {
			var token = m[0];
			var index = m.index;
			if (
				// Ignore already capitalized words.
				!IS_MANUAL_CASE.test(token) &&
				// Ignore small words except at beginning or end.
				(!SMALL_WORDS.test(token) ||
					index === 0 ||
					index + token.length === input.length) &&
				// Ignore URLs.
				(input.charAt(index + token.length) !== ":" ||
					WHITESPACE.test(input.charAt(index + token.length + 1)))
				) {
				// Find and uppercase first word character, skips over *modifiers*.
				result += token.replace(ALPHANUMERIC_PATTERN, function(m) {
					return m.toUpperCase()
				});
			} else {
				result += token;
			}
			m = TOKENS.exec(input);
		}

		return result;
	}
	// if using older Adobe Acrobat, define missing prototype
	if (!String.prototype.trim) {
		String.prototype.trim = function () {
			return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
		};
	}
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

	//add stuff otherwise not available in older version of Adobe Acrobat
	if (!Object.keys) {
		Object.keys = function(obj) {
			var arrRe = [];
			for (var a in obj) arrRe.push(a);
			return arrRe;
		}
	}

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
	RegExp.prototype.toInnerString = function () {
		return this.toString().replace(/^\/|\/\w*$/g, '');
	};
	RegExp.prototype.indexOf = function (searchValue, fromIndex) {
		return this.toInnerString().indexOf(searchValue, fromIndex);
	};
	RegExp.prototype.match = function (regexpObj) {
		return this.toInnerString().match(regexpObj);
	};
	RegExp.prototype.replace = function(oldstr, newstr) {
		return RegExp(this.toInnerString().replace(oldstr, newstr), this.toString().replace(/.*\/(\w*)$/, "$1"));
	};
	RegExp.prototype.search = function (regexpObj) {
		return this.toInnerString().search(regexpObj);
	};
	RegExp.prototype.slice = function (beginSlice, endSlice) {
		return this.toInnerString().slice(beginSlice, endSlice);
	};
	RegExp.prototype.split = function (separator, limit) {
		return this.toInnerString().split(separator, limit);
	};
	RegExp.prototype.substring = function (indexStart, indexEnd) {
		return this.toInnerString().substring(indexStart, indexEnd);
	};
	RegExp.prototype.substr = function (start, length) {
		return this.toInnerString().substr(start, length);
	};
	RegExp.prototype.toLowerCase = function () {
		return this.toInnerString().toLowerCase();
	};
	RegExp.prototype.toUpperCase = function () {
		return this.toInnerString().toUpperCase();
	};
	Array.prototype.match = function (regexpObj) {
		return this.toString().match(regexpObj);
	};
	Array.prototype.replace = function (regexp_substr, newSubStr_function) {
		return this.toString().replace(regexp_substr, newSubStr_function);
	};
	Array.prototype.search = function (regexpObj) {
		// Used by older versions (v13.0.8 - 13.1.0), but kept for backwards compatibility
		this.find(regexpObj);
	};
	Array.prototype.find = function (regexpObj) {
		if (regexpObj instanceof RegExp !== true) regexpObj = regexpObj.toString().RegEscape();
		for (var i = 0; i < this.length; i++) {
			if (this[i].toString().search(regexpObj) !== -1) return i;
		}
		return -1;
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
	Array.prototype.trailingIndexOf = function(e) {
		var index = -1, len = this.length;
		for (var i = len - 1; i > -1; i--) {
			if (i in this && e === this[i]) {
				index = i;
			} else {
				break;
			}
		}
		return index;
	};
	Array.prototype.delete = function (del) {
		// Used by older versions (v13.0.8 - 13.1.0), but kept for backwards compatibility
		this.eject(del);
	};
	Array.prototype.eject = function (del) { // v13.1.1
		// Ensure this is a unique function name so it can't be overwritten by old
		var iIndx = this.find(del);
		return iIndx === -1 ? -1 : this.splice(iIndx, 1);
	};
};
setPrototypes();

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
		if (FldValue >= 0) tDoc.getField(field).currentValueIndices = Number(FldValue);
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

//remove the empty values from an array (removes all things that are considered false, such as 0, "", undefined, false)
function removeEmptyValues(array) {
	var returnArray = [];
	for (var i = 0; i < array.length; i++) {
		if (array[i]) returnArray.push(array[i]);
	}
	return returnArray;
};

function sign(x) {
	return x > 0 ? 1 : x < 0 ? -1 : x;
};

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
		event.change = event.change.replace(/ /g, '');
		if (allowDec) {
			var tests = !isNaN(event.change) || ((/,|\./g).test(event.change) && (!(/,|\./g).test(event.value) || (/,|\./g).test(event.value.substring(event.selStart, event.selEnd))));
		} else {
			var tests = !isNaN(event.change);
		}
		if (allowNegative) {
			tests = tests || (event.change === "-" && event.selStart === 0 && (!(/-/g).test(event.value) || (/-/g).test(event.value.substring(event.selStart, event.selEnd))));
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
			var tests = !isNaN(eval_ish(toTest));
			event.value = toUse;
		} catch (err) {
			try {
				var tests = !isNaN(eval_ish(toTest.slice(0, -1)));
				event.value = toUse.slice(0, -1);
			} catch (err) {
				var tests = false;
			}
		}
	}
	event.rc = tests;
};

// a format function for the "Die" field of the Hit Dice section
function FormatHD() {
	var theResult = clean(event.value, " ");
	if (theResult !== "") {
		var QI = getTemplPre(event.target.name, "AScomp");
		var theCon = Number(What(QI === true ? "Con Mod" : QI + "Comp.Use.Ability.Con.Mod"));
		event.value = "d" + theResult + (theCon < 0 ? theCon : "+" + theCon);
	}
};

//format the date (format)
function FormatDay() {
	var isDate = util.scand('yy-mm-dd', event.value);
	event.value = event.value && isDate ? util.printd(What("DateFormat_Remember"), isDate) : "";
};

//make sure the date is entered in the correct format (keystroke)
function KeystrokeDay() {
	if (event.willCommit && event.value) {
		var isDate = util.scand('yy-mm-dd', event.value);
		if (!isDate) {
			event.value = "";
			if (IsNotImport) {
				app.alert({
					cMsg : "Please enter a valid date using the date-picker (the little arrow in the field) or enter the date manually using of the form \"Year-Month-Day\".\n\nYou can change the way the date is displayed with the \"Logsheet Options\" at the top of each Adventurers Logsheet. Note that the format of the date in the field never changes, only the way it is displayed.",
					cTitle : "Invalid date format",
					nIcon : 1
				});
			};
		};
	};
};

//a field "format" function to add a space at the start and end of the field, to make sure it looks better on the sheet
function addWhitespace() {
	event.value = " " + event.value + " ";
};

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

// start a progress dialog
// input can be a percentage of the progress or a string to display
// if remove is set to true, the entry corresponding to the input text is removed
// if remove is set to false, overwrite the current entry
function thermoM(input, remove) {
	if (input === "start" || !IsNotImport || IsNotImport === "no progress bar") return "";
	var t = app.thermometer;
	if (!input || input.toLowerCase() == "stop") {
		if (!thermoStopSet && t.text != undefined) thermoStopSet = app.setTimeOut("thermoStop();", 500);
		return "";
	}
	var dT = 10;
	if (remove !== undefined && isNaN(input)) { // remove the input if remove = true, or the latest entry if remove = false
		var toRem = remove ? input : thermoCount[thermoCount.length -1];
		if (thermoCount.indexOf(toRem) !== -1) {
			thermoCount.splice(thermoCount.indexOf(toRem), 1);
			if (!remove) thermoDur[input] = thermoDur[toRem];
			delete thermoDur[toRem];
			if (remove && thermoCount.length) {
				t.text = thermoCount[thermoCount.length -1];
				t.value = thermoDur[t.text];
			}
		}
	}
	if (!remove && isNaN(input)) { // start new with the input text
		if (t.text == undefined) {
			t.begin();
			t.duration = dT;
		}
		t.text = input;
		if (thermoCount.indexOf(input) == -1) {
			thermoCount.push(input);
			t.value = thermoDur[input] ? thermoDur[input] : 1;
			thermoDur[input] = t.value;
		} else {
			t.value++;
			thermoDur[input] = t.value;
		}
	} else if (!remove && t.text != undefined) { // update progress with the input number (if there is an active progress bar)
		t.value = dT * input;
		thermoDur[thermoCount[thermoCount.length -1]] = t.value;
	}
	// close all dialogs half a second after the last bit of code finishes
	if (!thermoStopSet && t.text != undefined) thermoStopSet = app.setTimeOut("thermoStop();", 500);
	return t.text != undefined ? t.text : "";
};

// end all instances of the progress dialog
function thermoStop() {
	if (thermoStopSet) {
		app.clearTimeOut(thermoStopSet);
		thermoStopSet = false;
	}
	thermoCount = [];
	thermoDur = {};
	var i = 0;
	while(i < 1000 && app.thermometer.text != undefined) {
		app.thermometer.end();
		i++
	};
};

//test if a font works or not
function testFont(fontTest) {
	var remFont = tDoc.getField((tDoc.info.AdvLogOnly ? "AdvLog." : "") + "Player Name").textFont;
	try {
		tDoc.getField((tDoc.info.AdvLogOnly ? "AdvLog." : "") + "Player Name").textFont = fontTest;
		tDoc.getField((tDoc.info.AdvLogOnly ? "AdvLog." : "") + "Player Name").textFont = remFont;
		return true;
	} catch (e) {
		return false;
	}
};

function clean(input, remove, diacretics) {
	if (remove && isArray(remove)) remove = remove.join('').replace(/(-|\\|\^|\])/g, '\\$1');
	var removeRegex = remove ? RegExp("/^[" + remove + "]+|[" + remove + "]+$", "g") : /^[ \-.,\\/:;]+|[ \-.,\\/:;]+$/g;
	input = input.replace(removeRegex, '');
	return diacretics ? removeDiacritics(input) : input;
};

//convert string to usable, complex regex
function MakeRegex(inputString, extraRegex) {
	return RegExp("^(?=.*\\b" + inputString.replace(/\W/g, " ").replace(/^ +| +$/g, "").RegEscape().replace(/('?s'?)\b/ig, "\($1\)?").replace(/ +/g, "s?\\b)(?=.*\\b") + "s?\\b)" + (extraRegex ? extraRegex : "") + ".*$", "i");
};

function toUni(input) {
	if (!What("UseUnicode")) return input;
	input = input.toString();
	var UniBoldItal = {
		"0" : "\uD835\uDFCE",
		"1" : "\uD835\uDFCF",
		"2" : "\uD835\uDFD0",
		"3" : "\uD835\uDFD1",
		"4" : "\uD835\uDFD2",
		"5" : "\uD835\uDFD3",
		"6" : "\uD835\uDFD4",
		"7" : "\uD835\uDFD5",
		"8" : "\uD835\uDFD6",
		"9" : "\uD835\uDFD7",
		"A" : "\uD835\uDE3C",
		"B" : "\uD835\uDE3D",
		"C" : "\uD835\uDE3E",
		"D" : "\uD835\uDE3F",
		"E" : "\uD835\uDE40",
		"F" : "\uD835\uDE41",
		"G" : "\uD835\uDE42",
		"H" : "\uD835\uDE43",
		"I" : "\uD835\uDE44",
		"J" : "\uD835\uDE45",
		"K" : "\uD835\uDE46",
		"L" : "\uD835\uDE47",
		"M" : "\uD835\uDE48",
		"N" : "\uD835\uDE49",
		"O" : "\uD835\uDE4A",
		"P" : "\uD835\uDE4B",
		"Q" : "\uD835\uDE4C",
		"R" : "\uD835\uDE4D",
		"S" : "\uD835\uDE4E",
		"T" : "\uD835\uDE4F",
		"U" : "\uD835\uDE50",
		"V" : "\uD835\uDE51",
		"W" : "\uD835\uDE52",
		"X" : "\uD835\uDE53",
		"Y" : "\uD835\uDE54",
		"Z" : "\uD835\uDE55",
		"a" : "\uD835\uDE56",
		"b" : "\uD835\uDE57",
		"c" : "\uD835\uDE58",
		"d" : "\uD835\uDE59",
		"e" : "\uD835\uDE5A",
		"f" : "\uD835\uDE5B",
		"g" : "\uD835\uDE5C",
		"h" : "\uD835\uDE5D",
		"i" : "\uD835\uDE5E",
		"j" : "\uD835\uDE5F",
		"k" : "\uD835\uDE60",
		"l" : "\uD835\uDE61",
		"m" : "\uD835\uDE62",
		"n" : "\uD835\uDE63",
		"o" : "\uD835\uDE64",
		"p" : "\uD835\uDE65",
		"q" : "\uD835\uDE66",
		"r" : "\uD835\uDE67",
		"s" : "\uD835\uDE68",
		"t" : "\uD835\uDE69",
		"u" : "\uD835\uDE6A",
		"v" : "\uD835\uDE6B",
		"w" : "\uD835\uDE6C",
		"x" : "\uD835\uDE6D",
		"y" : "\uD835\uDE6E",
		"z" : "\uD835\uDE6F"
	};
	var output = "";
	for (var i = 0; i < input.length; i++) {
		var tempChar = input.charAt(i);
		output += UniBoldItal[tempChar] ? UniBoldItal[tempChar] : tempChar;
	}
	return output;
};

function toSup(inString) {
	if (!What("UseUnicode")) return " ["+inString+"]";
	var doChar = function(aChar) {
		switch(aChar) {
			case "0" : return "\u2070";
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

//a way to remove diacretics (leestekens)

/*
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/
var defaultDiacriticsRemovalMap = [
	{
		'base' : 'A',
		'letters' : '\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'
	}, {
		'base' : 'AA',
		'letters' : '\uA732'
	}, {
		'base' : 'AE',
		'letters' : '\u00C6\u01FC\u01E2'
	}, {
		'base' : 'AO',
		'letters' : '\uA734'
	}, {
		'base' : 'AU',
		'letters' : '\uA736'
	}, {
		'base' : 'AV',
		'letters' : '\uA738\uA73A'
	}, {
		'base' : 'AY',
		'letters' : '\uA73C'
	}, {
		'base' : 'B',
		'letters' : '\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181'
	}, {
		'base' : 'C',
		'letters' : '\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E'
	}, {
		'base' : 'D',
		'letters' : '\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\u00D0'
	}, {
		'base' : 'DZ',
		'letters' : '\u01F1\u01C4'
	}, {
		'base' : 'Dz',
		'letters' : '\u01F2\u01C5'
	}, {
		'base' : 'E',
		'letters' : '\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E'
	}, {
		'base' : 'F',
		'letters' : '\u0046\u24BB\uFF26\u1E1E\u0191\uA77B'
	}, {
		'base' : 'G',
		'letters' : '\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E'
	}, {
		'base' : 'H',
		'letters' : '\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'
	}, {
		'base' : 'I',
		'letters' : '\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'
	}, {
		'base' : 'J',
		'letters' : '\u004A\u24BF\uFF2A\u0134\u0248'
	}, {
		'base' : 'K',
		'letters' : '\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'
	}, {
		'base' : 'L',
		'letters' : '\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'
	}, {
		'base' : 'LJ',
		'letters' : '\u01C7'
	}, {
		'base' : 'Lj',
		'letters' : '\u01C8'
	}, {
		'base' : 'M',
		'letters' : '\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C'
	}, {
		'base' : 'N',
		'letters' : '\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4'
	}, {
		'base' : 'NJ',
		'letters' : '\u01CA'
	}, {
		'base' : 'Nj',
		'letters' : '\u01CB'
	}, {
		'base' : 'O',
		'letters' : '\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C'
	}, {
		'base' : 'OI',
		'letters' : '\u01A2'
	}, {
		'base' : 'OO',
		'letters' : '\uA74E'
	}, {
		'base' : 'OU',
		'letters' : '\u0222'
	}, {
		'base' : 'OE',
		'letters' : '\u008C\u0152'
	}, {
		'base' : 'oe',
		'letters' : '\u009C\u0153'
	}, {
		'base' : 'P',
		'letters' : '\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'
	}, {
		'base' : 'Q',
		'letters' : '\u0051\u24C6\uFF31\uA756\uA758\u024A'
	}, {
		'base' : 'R',
		'letters' : '\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'
	}, {
		'base' : 'S',
		'letters' : '\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'
	}, {
		'base' : 'T',
		'letters' : '\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'
	}, {
		'base' : 'TZ',
		'letters' : '\uA728'
	}, {
		'base' : 'U',
		'letters' : '\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'
	}, {
		'base' : 'V',
		'letters' : '\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'
	}, {
		'base' : 'VY',
		'letters' : '\uA760'
	}, {
		'base' : 'W',
		'letters' : '\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'
	}, {
		'base' : 'X',
		'letters' : '\u0058\u24CD\uFF38\u1E8A\u1E8C'
	}, {
		'base' : 'Y',
		'letters' : '\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'
	}, {
		'base' : 'Z',
		'letters' : '\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'
	}, {
		'base' : 'a',
		'letters' : '\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250'
	}, {
		'base' : 'aa',
		'letters' : '\uA733'
	}, {
		'base' : 'ae',
		'letters' : '\u00E6\u01FD\u01E3'
	}, {
		'base' : 'ao',
		'letters' : '\uA735'
	}, {
		'base' : 'au',
		'letters' : '\uA737'
	}, {
		'base' : 'av',
		'letters' : '\uA739\uA73B'
	}, {
		'base' : 'ay',
		'letters' : '\uA73D'
	}, {
		'base' : 'b',
		'letters' : '\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253'
	}, {
		'base' : 'c',
		'letters' : '\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184'
	}, {
		'base' : 'd',
		'letters' : '\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A'
	}, {
		'base' : 'dz',
		'letters' : '\u01F3\u01C6'
	}, {
		'base' : 'e',
		'letters' : '\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD'
	}, {
		'base' : 'f',
		'letters' : '\u0066\u24D5\uFF46\u1E1F\u0192\uA77C'
	}, {
		'base' : 'g',
		'letters' : '\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F'
	}, {
		'base' : 'h',
		'letters' : '\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'
	}, {
		'base' : 'hv',
		'letters' : '\u0195'
	}, {
		'base' : 'i',
		'letters' : '\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'
	}, {
		'base' : 'j',
		'letters' : '\u006A\u24D9\uFF4A\u0135\u01F0\u0249'
	}, {
		'base' : 'k',
		'letters' : '\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'
	}, {
		'base' : 'l',
		'letters' : '\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747'
	}, {
		'base' : 'lj',
		'letters' : '\u01C9'
	}, {
		'base' : 'm',
		'letters' : '\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'
	}, {
		'base' : 'n',
		'letters' : '\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5'
	}, {
		'base' : 'nj',
		'letters' : '\u01CC'
	}, {
		'base' : 'o',
		'letters' : '\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275'
	}, {
		'base' : 'oi',
		'letters' : '\u01A3'
	}, {
		'base' : 'ou',
		'letters' : '\u0223'
	}, {
		'base' : 'oo',
		'letters' : '\uA74F'
	}, {
		'base' : 'p',
		'letters' : '\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755'
	}, {
		'base' : 'q',
		'letters' : '\u0071\u24E0\uFF51\u024B\uA757\uA759'
	}, {
		'base' : 'r',
		'letters' : '\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'
	}, {
		'base' : 's',
		'letters' : '\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B'
	}, {
		'base' : 't',
		'letters' : '\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'
	}, {
		'base' : 'tz',
		'letters' : '\uA729'
	}, {
		'base' : 'u',
		'letters' : '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'
	}, {
		'base' : 'v',
		'letters' : '\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'
	}, {
		'base' : 'vy',
		'letters' : '\uA761'
	}, {
		'base' : 'w',
		'letters' : '\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'
	}, {
		'base' : 'x',
		'letters' : '\u0078\u24E7\uFF58\u1E8B\u1E8D'
	}, {
		'base' : 'y',
		'letters' : '\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF'
	}, {
		'base' : 'z',
		'letters' : '\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'
	}
];
var diacriticsMap = {};
for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
	var letters = defaultDiacriticsRemovalMap[i].letters;
	for (var j = 0; j < letters.length; j++) {
		diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap[i].base;
	}
};

// "what?" version ... http://jsperf.com/diacritics/12
function removeDiacritics(str) {
	return str.replace(/[^\u0000-\u007E]/g, function (a) {
		return diacriticsMap[a] || a;
	});
};

// a way to change an attribute of a particular itemID element in a dialog.
function setDialogName(dialogElem, itemID, attrNm, setAttr) {
	if (dialogElem.description && dialogElem.description.elements) dialogElem = dialogElem.description.elements;
	for (var i = 0; i < dialogElem.length; i++) {
		var tElem = dialogElem[i];
		if (tElem.item_id && tElem.item_id === itemID) {
			tElem[attrNm] = setAttr;
			return true;
		} else if (tElem.elements) {
			var isSet = setDialogName(tElem.elements, itemID, attrNm, setAttr);
			if (isSet) return true;
		};
	};
	return false;
};

//return a random number between 1 and the input 'die'
function RollD(die) {
	return Math.floor(Math.random() * die) + 1;
};

//set the other checkbox Dis/Adv off when clicking this field (on MouseUp)
function SetDisAdv() {
	var Adv = (/Adv$/).test(event.target.name);
	this.getField(event.target.name.replace(Adv ? "Adv" : "Dis", Adv ? "Dis" : "Adv")).value = "Off";
};

//see if two strings don't differ too much in length
function similarLen(str1, str2) {
	return Math.abs(str1.length - str2.length) < 5 || Math.abs(str1.length, str2.length) / Math.max(str1.length, str2.length) < 0.2;
};

//test if a template is visible or not
function isTemplVis(tempNm, returnPrefix) {
	if (!BookMarkList[tempNm] || !tDoc.getField(BookMarkList[tempNm])) return false;
	var isVisible = false;
	var multiTemp = TemplatesWithExtras.indexOf(tempNm) !== -1;
	var firstTempl = "";
	if (!multiTemp) {
		var tempPage = tDoc.getField(BookMarkList[tempNm]).page;
		isVisible = (isArray(tempPage) ? Math.max.apply(Math, tempPage) : tempPage) !== -1;
	} else {
		isVisible = What("Template.extras." + tempNm) !== "";
		firstTempl = What("Template.extras." + tempNm).split(",")[1];
	};
	if (!isVisible && tempNm === "SSfront") {
		isVisible = isTemplVis("SSmore", returnPrefix);
		if (isArray(isVisible)) {
			firstTempl = isVisible[1];
			isVisible = isVisible[0];
		};
	};
	return returnPrefix && firstTempl ? [isVisible, firstTempl] : isVisible;
};

// A way to return a new, fresh object
function newObj(inObj) {
	return typeof inObj === "string" ? inObj : eval(inObj.toSource());
};

// A way to return an string as an expression (use eval() if it contains a function)
function eval_ish(inStr) {
	return (/function|=>/).test(inStr) ? eval(inStr) : Function('return ' + inStr)();
};

// Returns the template prefix, or true if not the template, or an empty string if rEmpty is true
function getTemplPre(tName, templ, rEmpty) {
	templ = templ + ".";
	return tName.indexOf(templ) === -1 ? (rEmpty ? "" : true) : tName.substring(0, tName.indexOf(templ)) + templ;
};

// Create the semantic version of the input (x.y.z-preRelease+build)
function getSemVers(version, preRelease, build) {
	var strV = version.toString().replace(/^\D+/, "").split(/[\.,\-\+;]+/); // remove prefix that is not a number and split by dividers
	// --- backwards compatibility --- //
	if (strV[1] && strV[1][0] === "0" && !strV[2]) {
		strV[2] = strV[1].substr(1);
		strV[1] = 0;
	}
	// Check the first three values found
	var arrV = [];
	for (var i = 0; i < 3; i++) {
		if (i === 2 && Number(strV[0]) < 13 && !strV[i]) continue;
		if (!strV[i]) strV[i] = 0;
		arrV.push(strV[i]);
	}
	// Return a semantic versioning (x.y.z-preRelease+build)
	if (preRelease && !(/\d/).test(preRelease)) preRelease += 1; // Make sure "beta" is written as "beta1"
	return arrV.join(".") + (preRelease ? "-" + preRelease : "") + (build ? "+" + build : "");
}

/*
	Change a semantic versioning scheme (x.y.z-preRelease+build) to a number
	13.2.10				-> 13002010.9
	13.3.21-alpha2		-> 13003021.102
	13.5.8-beta29		-> 13005008.529
	13.89.16+201028		-> 13089016.900201028
	13.1.4-beta1+200901	-> 13001004.501200901

	And for backwards compatibility
	9.9.6				->  9090006
	9.9.6b				->  9090006.5
	11.85				-> 11085000
	11.9				-> 11090000
	11.95b				-> 11095000.5
*/
function semVersToNmbr(inSemV) {
	inSemV = inSemV.replace(/^\D+/, "").toString(); // remove prefix and make sure it is a string
	if (!/\d/.test(inSemV)) return 0; // If there are no numbers in the string return zero
	// Get the integer part
	var strV = inSemV.replace(/[\-\+b].*/g, "").split(".");
	for (var i = 0; i < 3; i++) {
		if (!strV[i] || isNaN(parseFloat(strV[i]))) {
			strV[i] = "000";
			continue;
		} else if (i === 1 && Number(strV[i]) < 10 && Number(strV[0]) < 13) {
			// --- backwards compatibility --- //
			strV[i] *= 10;
		}
		strV[i] = ("00" + strV[i]).slice(-3);
	};
	var arrV = [
		strV.join(""),
		parseFloat(strV[0]) < 13 ? "000" : "900"
	];
	// Get the pre-release part
	var preRelease = inSemV.match(/-([^\+]+)/);
	if (preRelease && /\d/.test(preRelease[1])) {
		var preRelBase = Number(preRelease[1].match(/\d+/)[0]);
		if (/beta|b\d/i.test(preRelease[1])) {
			preRelBase += 500;
		} else if (/alpha|alfa|a\d/i.test(preRelease[1])) {
			preRelBase += 100;
		}
		arrV[1] = ("00" + preRelBase).slice(-3);
	} else if (/b$/.test(inSemV)) {
		// --- backwards compatibility --- //
		arrV[1] = "500";
	}
	// Get the build part
	var build = inSemV.match(/\+(\d+)/);
	if (build) arrV[1] += build[1];
	// Create the number
	var reNmbr = parseFloat(arrV.join("."));
	return isNaN(reNmbr) ? 0 : reNmbr;
};

// Stop calculations and drawing of fields in the whole PDF to speed up changes
// give a namedStop to make sure that it only can be started again with the same namedStop (and if no other namedStops are present)
function calcStop(noSheetUpdate) {
	noSheetUpdate = noSheetUpdate !== undefined ? noSheetUpdate : !IsNotReset || !IsNotImport;
	app.calculate = false;
	tDoc.calculate = false;
	tDoc.delay = true;
	if (!calcStartSet) calcStartSet = app.setTimeOut("calcCont(" + noSheetUpdate + ", true);", 250);
};

// function to start the calculations of the PDF again
function calcCont(noSheetUpdate, viaTimeOut) {
	if (!noSheetUpdate) UpdateSheetWeapons(); // first recalculate the weapons if set to do so, before restarting any calculations
	if (calcStartSet) {
		app.clearTimeOut(calcStartSet);
		calcStartSet = false;
	}
	var currentDirty = tDoc.dirty;
	app.calculate = true;
	tDoc.calculate = true;
	tDoc.delay = false;
	tDoc.calculateNow();
	tDoc.dirty = currentDirty;
	thermoStop();
	if (!noSheetUpdate) {
		UpdateSheetDisplay();
		thermoStop();
	} else if (viaTimeOut) {
		CurrentUpdates = {types : []};
	}
};

// function to find the value (date) of a source
function sourceDate(srcArr) {
	if (!srcArr) return 0;
	srcArr = !isArray(srcArr) ? [srcArr] : [].concat.apply([], srcArr);
	var dateArr = [0];
	for (var i = 0; i < srcArr.length; i++) {
		var src = srcArr[i];
		if (!SourceList[src] || CurrentSources.globalExcl.indexOf(src) !== -1) continue;
		var srcDate = src === "SRD" ? 1 : src === "HB" ? 90001231 : SourceList[src].date ? Number(SourceList[src].date.replace(/\D/g, "")) : 'stop';
		if (!isNaN(srcDate)) dateArr.push(srcDate);
	};
	return Math.max.apply(Math, dateArr);
};

function leftpad (str, len, ch) {
	str = String(str);
	var i = -1;
	if (!ch && ch !== 0) ch = ' ';
	len = len - str.length;
	while (++i < len) {
		str = ch + str;
	}
	return str;
}

// function to close the sheet without saving because JavaScript ran out of memory
function outOfMemoryErrorHandling(closeFile) {
	var cMsg = "The imported custom content JavaScript has returned an \"Out of Memory\" error. This means that your machine does not have enough free RAM to use this PDF without errors. This can be caused by other software using too much RAM, but most of the time is the result of the operating system not being restarted for too long.";
	cMsg += closeFile || !tDoc.dirty ? "\n\nThe PDF will now automatically close without any content being saved." : "\n\nThe changes you made to the custom content JavaScript have not been saved. You will now be prompted to save the sheet (without the JavaScript changes) and then the sheet will automatically close.";
	cMsg += "\n\nPLEASE REBOOT YOUR MACHINE AND TRY AGAIN!"
	app.alert({
		cMsg : cMsg,
		nIcon : 1,
		cTitle : "ERROR: Out of Memory -- Closing PDF",
		nType : 0
	});
	if (closeFile) {
		tDoc.dirty = false;
	}
	app.execMenuItem("Close");
	tDoc.closeDoc();
};
