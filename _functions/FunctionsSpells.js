function toUni(input) {
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
		"z" : "\uD835\uDE6F",
	};
	var output = "";
	for (i = 0; i < input.length; i++) {
		var tempChar = input.charAt(i);
		output += UniBoldItal[tempChar] ? UniBoldItal[tempChar] : tempChar;
	}
	return output;
};

// find the spell in the SpellsList
function ParseSpell(input) {
	var result = "";
	
	if (input) {
		var foundLen = 0;

		for (var key in SpellsList) { //scan string for all creatures
			var toSearch = "\\b(" + SpellsList[key].name;
			toSearch += SpellsList[key].nameShort ? "|" + SpellsList[key].nameShort : "";
			toSearch += SpellsList[key].nameAlt ? "|" + SpellsList[key].nameAlt : "";
			toSearch += ")\\b";
			var toTest = RegExp(toSearch, "i");
			if (key.length > foundLen && toTest.test(input)) {
				result = key;
				foundLen = key.length;
			}
		}
	}
	return result;
};

// call this on validation of the hidden spell remember field, to apply something to the spell line
// "" = reset all the fields; "HideThisLine" = hide all the fields; recognized spell = apply that spell; not recognized spell = don't do anything (assume name change); "setcaptions" or  "setcaptions##Me" = make this a caption line; if followed by "##Me" or "##Kn", change the first line to be either "Me" or "Kn" as the first column, or show or hide the box for checkmark; "___" = put all lines in the fields, making it fillable by hand
function ApplySpell(FldValue, rememberFldName) {
	if (IsNotSpellSheetGenerating) {
		tDoc.delay = true;
		tDoc.calculate = false;
	}
	
	var input = FldValue !== undefined ? FldValue.split("##") : event.value.split("##");
	var base = rememberFldName ? rememberFldName : event.target.name;
	var isPF = typePF;
	var isPsionics = input[0].match(/psionic/i);
	
	var HeaderList = [
		["", "check", ""], //0
		[isPsionics ? "PSIONIC POWER" : "SPELL", "name", Array(21 + (isPF ? 6 : 0)).join("_")], //1
		["DESCRIPTION", "description", Array(84 + (isPF ? 25 : 0)).join("_")], //2
		["SAVE", "save", Array(4 + (isPF ? 1 : 0)).join("_")], //3
		[isPsionics ? "ORDER" : "SCHOOL", "school", Array(7 + (isPF ? 1 : 0)).join("_")], //4
		["TIME", "time", Array(7 + (isPF ? 1 : 0)).join("_")], //5
		["RANGE", "range", Array(10 + (isPF ? 2 : 0)).join("_")], //6
		["COMP", "components", Array(7).join("_")], //7
		["DURATION", "duration", Array(12 + (isPF ? 3 : 0)).join("_")], //8
		["B", "book", Array(2 + (isPF ? 1 : 0)).join("_")], //9
		["PG.", "page", Array(4).join("_")], //10
	]
	
	//make this a header line if the input is "setcaptions"
	if (input[0].match(/setcaptions/i)) {
		HeaderList[0][0] = input[1] ? input[1].substring(0, input[1].match(/\(.\)/) ? 3 : 2).toUpperCase() : "";
		
		//have a function to create rich text span
		var createSpan = function(input) {
			// First build up an array of Span objects
			var spans = [{
				text : input.substring(0, 1),
				textSize : 7,
			}, {
				text : input.substring(1),
				textSize : 5.6,
			}];
			return spans;
		}
		
		//set the headers values
		for (var i = 0; i < HeaderList.length; i++) {
			var theFld = base.replace("remember", HeaderList[i][1]);
			if (!typePF) {
				var theHeader = createSpan(HeaderList[i][0]);
				tDoc.getField(theFld).richText = true;
				tDoc.getField(theFld).richValue = theHeader;
			} else {
				Value(theFld, HeaderList[i][0]);
				tDoc.getField(theFld).textFont = "ScalaSans-BoldLF"; //change the font and font size
				tDoc.getField(theFld).textSize = 5.75;
			}
			tDoc.getField(theFld).readonly = true;
			Show(theFld);
		}
		
		if (IsNotSpellSheetGenerating) {
			tDoc.calculate = IsNotReset;
			tDoc.delay = !IsNotReset;
		}
		return; //and don't do the rest of this function
	} else if (tDoc.getField(base.replace("remember", "description")).readonly) { //if the field has readonly active, but the value is not "setcaptions", the values must be reset
		for (var i = 0; i < HeaderList.length; i++) {
			var theFld = base.replace("remember", HeaderList[i][1]);
			Value(theFld, "", "");
			if (tDoc.getField(theFld).richText) {
				tDoc.getField(theFld).richValue = "";
				tDoc.getField(theFld).richText = false;
			}
			if (i !== 0) tDoc.getField(theFld).readonly = false;
			if (typePF) { //reset the font and font size
				tDoc.getField(theFld).textFont = tDoc.getField("Template.extras.SSfront").textFont;
				tDoc.getField(theFld).textSize = 6.25;
			}
		}
	}
	
	// Now test if the fields should be hidden, or revealed
	if (input[0].match(/hidethisline|setheader|setdivider|setglossary/i)) {
		//reset all the field's values and hide them
		for (var i = 0; i < HeaderList.length; i++) {
			var theFld = base.replace("remember", HeaderList[i][1]);
			Value(theFld, i !== 0 ? "" : "hide", "");
			Hide(theFld);
		}
		
		if (input[0].match(/hidethisline/i)) {
		//and don't do the rest of this function if we are here to hide this line
			if (IsNotSpellSheetGenerating) {
				tDoc.calculate = IsNotReset;
				tDoc.delay = !IsNotReset;
			}
			return;
		}
	} else if (tDoc.getField(base.replace("remember", "name")).display === display.hidden) { //if fields were hidden, but the value has been removed, show them again
		for (var i = 1; i < HeaderList.length; i++) {
			var theFld = base.replace("remember", HeaderList[i][1]);
			Show(theFld);
		}
	}
	
	//set the icon of the first field
	var setCheck = function() {
		var theCheck = base.replace("remember", "check");
		var okChecks = ["checkbox", "checkedbox", "markedbox", "atwill", "oncelr", "oncesr"];
		var currentCheck = What(theCheck).toLowerCase();
		var input1 = input[1] ? input[1].toLowerCase() : false;
		if (!input1 || okChecks.indexOf(input1) === -1) {
			Value(theCheck, input1 ? input1.toUpperCase().substring(0, input1.match(/\(.\)/) ? 3 : 2) : "");
		} else if (input1 !== currentCheck && okChecks.indexOf(input1) !== -1 && (input1.substring(0, 4) !== currentCheck.substring(0, 4) || okChecks.indexOf(input1) > 1)) {
			Value(theCheck, input[1].toLowerCase());
		}
	}
	
	if (input[0] === "") { //reset all the fields
		if (What(base.replace("remember", HeaderList[1][1])) !== "") {//if going from a spell to nothing, reset all the field's values and tooltips
			for (var i = 0; i < HeaderList.length; i++) {
				var theFld = base.replace("remember", HeaderList[i][1]);
				Value(theFld, "", "");
			};
		} else { //if there wasn't any spell name given to start with, only reset the other fields, but apply any checkbox/firstcolumn thing
			for (var i = 2; i < HeaderList.length; i++) {
				var theFld = base.replace("remember", HeaderList[i][1]);
				Value(theFld, "", "");
			};
			setCheck();
		};
	} else if (input[0].match(/setheader/i)) {
		var theClass = input[1] && CurrentSpells[input[1].toLowerCase()] ? input[1].toLowerCase() : "";
		var theSuffix = input[2] !== undefined && !isNaN(parseFloat(input[2])) ? parseFloat(input[2]) : false;
		var hidePrepared = input.indexOf("nopreps") !== -1;
		if (theSuffix !== false ) {
			SetSpellSheetElement(base, "header", theSuffix, theClass, hidePrepared, isPsionics);
		}
	} else if (input[0].match(/setdivider/i)) {
		var theLevel = input[1] !== undefined && !isNaN(parseFloat(input[1])) ? parseFloat(input[1]) : false;
		var theSuffix = input[2] !== undefined && !isNaN(parseFloat(input[2])) ? parseFloat(input[2]) : false;
		if (theClass !== false && theSuffix !== false ) {
			SetSpellSheetElement(base, "divider", theSuffix, theLevel, false, isPsionics);
		}
	} else if (input[0].match(/setglossary/i)) {
		SetSpellSheetElement(base, "glossary", "");
	} else if (input[0].indexOf("_") === 0) { //make all the fields lines
		//reset all the field's values and tooltips to the lines defined in the array
		for (var i = 0; i < HeaderList.length; i++) {
			var theFld = base.replace("remember", HeaderList[i][1]);
			Value(theFld, HeaderList[i][2], i === 0 ? undefined : "");
		}
		setCheck();
	} else {
		var theSpl = ParseSpell(input[0]);
		//now only do something if a spell was found, otherwise assume the spell's details shouldn't be changed
		if (theSpl !== "") {
			var aSpell = SpellsList[theSpl];
			
			//set the spell name (if it wasn't provided as part of this function and not the same as the remember field)
			// if the name used is a shortened version, set the full name as a tooltip
			var NameFld = base.replace("remember", "name");
			var NameFldValue = What(NameFld);
			var NameFldRitual = NameFldValue.indexOf("(R)") !== -1;
			if (input[0] !== NameFldValue || (aSpell.ritual && !NameFldRitual)) {
				var spName = aSpell.nameShort ? [aSpell.nameShort, aSpell.name] : [aSpell.name, ""];
				spName[0] += aSpell.ritual ? " (R)" : "";
				Value(NameFld, spName[0], spName[1]);
			}
			
			//put in some things into metric if so set
			var spDescr = aSpell.description;
			var spRange = aSpell.range;
			
			if (What("Unit System") === "metric") {
				spDescr = aSpell.descriptionMetric ? aSpell.descriptionMetric : ConvertToMetric(spDescr, 0.5);
				spRange = ConvertToMetric(spRange, 0.5);
			}
			
			//make the tooltip for the description field
			var spTooltip = "";
			if (aSpell.descriptionFull && (aSpell.school || aSpell.psionic)) {
				spTooltip += toUni(aSpell.name) + " \u2014 ";
				spTooltip += aSpell.psionic ? (aSpell.level === 0 ? "Psionic talent" : spellSchoolList[aSpell.school].capitalize() + " discipline") :
					aSpell.level === 0 ? spellSchoolList[aSpell.school].capitalize() + " cantrip" :
					spellLevelList[aSpell.level] + " " + spellSchoolList[aSpell.school];
				spTooltip += aSpell.ritual ? " (ritual)" : "";
				spTooltip += "\n   " + aSpell.descriptionFull;
			};
			
			//set the spell description and the tooltip with the full description
			Value(base.replace("remember", "description"), spDescr, spTooltip);
			
			//set the spell save
			Value(base.replace("remember", "save"), aSpell.save ? aSpell.save : "\u2014");
			
			//set the spell school
			Value(base.replace("remember", "school"), aSpell.school ? aSpell.school : "\u2014");
			
			//set the spell time
			Value(base.replace("remember", "time"), aSpell.time);
			
			//set the spell range
			Value(base.replace("remember", "range"), spRange);
			
			//set the spell components
			Value(base.replace("remember", "components"), aSpell.components ? aSpell.components : "\u2014", aSpell.compMaterial ? aSpell.compMaterial : "");
			
			//set the spell duration
			Value(base.replace("remember", "duration"), aSpell.duration);
			
			//set the spell book name and page
			var spBook = aSpell.source && aSpell.source[0] ? aSpell.source[0].substring(0, 1) : "";
			var spPage = aSpell.source && aSpell.source[1] ? aSpell.source[1] : "";
			var spBookFull = spBook && SourceList[aSpell.source[0]] ? SourceList[aSpell.source[0]].name : "";
			spBookFull += spBookFull && spPage ? ", page " + spPage : "";
			Value(base.replace("remember", "book"), spBook, spBookFull);
			Value(base.replace("remember", "page"), spPage, spBookFull);
			
			if (aSpell.firstCol !== undefined && !input[1]) input[1] = aSpell.firstCol;
		}
		setCheck();
	}

	if (IsNotSpellSheetGenerating) {
		tDoc.calculate = IsNotReset;
		tDoc.delay = !IsNotReset;
	}
}

//on blur, put the value in the remember field, location one (on field blur)
function SetSpell(FldValue, nameFldName) {
	if (event.target && event.target.richText) {
		tDoc.getField(event.target.name).richValue = "";
		tDoc.getField(event.target.name).richText = false;
	} //first disable any rich text value if it was set
	var input = FldValue ? FldValue : What(event.target.name);
	var base = nameFldName ? nameFldName : event.target.name;
	var remFld = base.replace("name", "remember");
	if (input.toLowerCase() === "" || input.toLowerCase() === "setcaptions" || input.indexOf("##") !== -1) { //if the name field has a ## in it, assume we need to replace everything in the remember field
		var toUseValue = input;
	} else { //otherwise only replace the first entry in the remember field
		var remFldValue = What(remFld).split("##");
		remFldValue[0] = input;
		var toUseValue = remFldValue.join("##");
	}
	Value(remFld, toUseValue);
}

//set the text on the spell divider (the level of the spell)
function SetSpellDividerName(field, level, isPsionics) {
	var spellLvl = [
		["Cantrips (", 0, " Level)"],
		["", 1, "st Level"],
		["", 2, "nd Level"],
		["", 3, "rd Level"],
		["", 4, "th Level"],
		["", 5, "th Level"],
		["", 6, "th Level"],
		["", 7, "th Level"],
		["", 8, "th Level"],
		["", 9, "th Level"],
	];
	
	if (isPsionics) {
		Value(field, level ? "Psionic Disciplines" : "Psionic Talents");
	} else if (!typePF) {
		var spans = [{
			text : spellLvl[level][0],
		}, {
			text : spellLvl[level][1].toString(),
			fontFamily : ["Pterra"],
			textSize : 13,
		}, {
			text : spellLvl[level][2],
		}];
		
		tDoc.getField(field).richValue = spans;
	} else {
		Value(field, spellLvl[level].join(""));
	}
}

//move a set of fields (type) to the y-coordinate of a given field (target)
//the first of the fields in the moveArray will have its upper-Y be the same as the target
//rect is an array with the order: upper-left x, upper-left y, lower-right x and lower-right y
//type[0] is "header" or "divider"; type[1] is the number on the page
// header is 4 high, divider is 2 high
// if type[0] is "header", caster is the name of the CurrentSpells entry
// if type[0] is "divider", caster is the level of the divider head to set
function SetSpellSheetElement(target, type, suffix, caster, hidePrepared, isPsionics) {
	var prefix = target.substring(0, target.indexOf("spells."));
	if (!suffix && suffix !== 0 && type !== "glossary") { //if suffix is false, it means we have to find the first that is not visible
		suffix = findNextHeaderDivider(prefix, type);
		if (suffix === false) return; //no field was found to move, so stop this function without doing anything
	}
	var headerArray = [
		prefix + "spellshead.Image.Header.Left." + suffix, //0
		prefix + "spellshead.Text.header." + suffix, //1
		prefix + "spellshead.class." + suffix, //2
		prefix + "spellshead.ability." + suffix, //3
		prefix + "spellshead.prepare." + suffix, //4
		prefix + "spellshead.attack." + suffix, //5
		prefix + "spellshead.dc." + suffix, //6
		prefix + "BlueText.spellshead.prepare." + suffix, //7
		prefix + "BlueText.spellshead.attack." + suffix, //8
		prefix + "BlueText.spellshead.dc." + suffix, //9
	];
	if (!typePF) {
		headerArray = headerArray.concat([
			prefix + "spellshead.Image.Dragonheadshadow." + suffix, //10
			prefix + "spellshead.Image.Dragonhead." + suffix, //11
			prefix + "spellshead.Text.prepare." + suffix, //12
			prefix + "spellshead.Box.prepare." + suffix, //13
			prefix + "spellshead.Text.attack." + suffix, //14
			prefix + "spellshead.Box.attack." + suffix, //15
			prefix + "spellshead.Text.dc." + suffix, //16
			prefix + "spellshead.Box.dc." + suffix, //17
			prefix + "spellshead.Text.ability." + suffix, //18
			prefix + "spellshead.Box.ability." + suffix, //19
		]);
		var dividerArray = [
			prefix + "spellsdiv.Text." + suffix, //0
			prefix + "spellsdiv.Image.Dragonhead." + suffix, //1
			prefix + "spellsdiv.Image.Divider." + suffix, //2
			prefix + "spellsdiv.Image.DividerFlip." + suffix, //3
		];
	} else {
		headerArray = headerArray.concat([
			prefix + "spellshead.Image.prepare." + suffix, //10
		]);
		var dividerArray = [
			prefix + "spellsdiv.Image." + suffix, //0
			prefix + "spellsdiv.Text." + suffix, //1
		];
	}
	var glossaryArray = [
		prefix + "spellsgloss.Image" + suffix, //0
	];
	
	switch(type) {
	 case "header" :
		var moveArray = headerArray;
		var maxFld = 3;
		break;
	 case "divider" :
		var moveArray = dividerArray;
		var maxFld = 1;
		break;
	 case "glossary" :
		var moveArray = glossaryArray;
		var maxFld = 11;
		break;
	}
	
	//define functions for returning and setting the coordinates of a field
	var isRect = function(Fld) {
		return tDoc.getField(Fld).rect;
	}
	var setRect = function(Fld, Rct) {
		tDoc.getField(Fld).rect = Rct;
	}
	
	var tRect = isRect(target); // get the location of the target field on the sheet
	var sRect = isRect(moveArray[0]); // get the location of the first field that has to be moved
	var dY = tRect[1] - sRect[1]; // see how much the fields have to be moved by comparing upper-left y coordinates
	
	//now move each of the fields in the moveArray by dY
	for (var m = 0; m < moveArray.length; m++) {
		if (suffix === 0 && prefix.indexOf(".SSfront.") !== -1) { //don't move the top row of the first page, they are already where they should be
		} else {
			var gRect = isRect(moveArray[m]); //get the coordinates
			gRect[1] += dY; //add dY to the upper-left y
			gRect[3] += dY; //add dY to the lower-righ y
			setRect(moveArray[m], gRect); //set the new coordinates
		}
		if (What("BlueTextRemember") === "Yes" && moveArray[m].indexOf("BlueText") !== -1) {
			DontPrint(moveArray[m]);
		} else if (moveArray[m].indexOf("BlueText") === -1 && moveArray[m].indexOf(".class.") === -1) {
			Show(moveArray[m]);
		} else {
			Hide(moveArray[m]);
		}
	}
	
	//now hide the fields that are overlayed
	if (suffix === 0 && prefix.indexOf(".SSfront.") !== -1) { //don't do this for the top row of the first page, they are already where they should be
	} else {
		var hideFldNmbr = Number(target.replace(/.+?\.(\d+)$/, "$1"));
		maxFld += hideFldNmbr;
		for (var h = (hideFldNmbr + 1); h <= maxFld; h++) {
			Value(target.replace("." + hideFldNmbr, "." + h), "hidethisline");
		}
	}
	
	//now set the values of the fields
	if (type === "divider") {
		var divTextFld = dividerArray[!typePF ? 0 : 1]
		//set the name of the divider
		SetSpellDividerName(divTextFld, caster, isPsionics);
		//set the submitName to remember the line where this divider is at
		var submitNameFld = divTextFld;
	} else if (type === "header") {
		var testLength = !typePF ? 10 : 36;
		
		if (caster && CurrentSpells[caster]) {
			var spCast = CurrentSpells[caster];
			isPsionics = isPsionics || (spCast.factor && spCast.factor[1].match(/psionics/i);
			var casterName = spCast.name.replace(/book of /i, "").replace(/ (\(|\[).+?(\)|\])/g, "");
			casterName = casterName + (casterName.length >= testLength || casterName.match(/\b(spells|powers|psionics)\b/i) ? "" : isPsionics ? " Psionics" : " Spells");
			if (What(headerArray[2]) !== caster) { //if the header was not already set to the class
				Value(headerArray[1], casterName); //set the name of the header
				Value(headerArray[2], caster); //set the name of the class
				PickDropdown(headerArray[3], spCast.ability); //set the ability score to use
				if (spCast.blueTxt) { //set the remembered bluetext values, if at all present
					Value(headerArray[7], spCast.blueTxt.prep ? spCast.blueTxt.prep : 0); //set the bluetext for preparing
					Value(headerArray[8], spCast.blueTxt.atk ? spCast.blueTxt.atk : 0); //set the bluetext for attack
					Value(headerArray[9], spCast.blueTxt.dc ? spCast.blueTxt.dc : 0); //set the bluetext for dc
				}
				
				//set the variable to true to later hide the prepared fields if not concerning a list or book
				if (!spCast.level || (spCast.typeSp !== "list" && spCast.typeSp !== "book") || spCast.typeList === 3) {
					hidePrepared = true;
				}
			} else if (What(headerArray[1]) === "") {
				Value(headerArray[1], casterName);
			}
		} else {
			//if no class is known just reset all but the class name text
			tDoc.resetForm(headerArray);
			var casterName = " ";
			if (caster) {
				casterName = caster.replace(/book of | (\(|\[).+?(\)|\])/ig, "").replace(/ (\(|\[).+?(\)|\])/g, "");
				casterName = casterName + (casterName.length >= testLength || casterName.match(/\b(spells|powers|psionics)\b/i) ? "" : isPsionics ? " Psionics" : " Spells");
				if (ClassList[caster]) {
					PickDropdown(headerArray[3], ClassList[caster].abilitySave);
				} else if (ClassSubList[caster]) {
					PickDropdown(headerArray[3], ClassSubList[caster].abilitySave);
				}
			}
			Value(headerArray[1], casterName);
		}
		
		//hide the prepared fields
		if (hidePrepared) {
			Hide(headerArray[4]);
			Hide(headerArray[7]);
			if (!typePF) {
				Hide(headerArray[4]);
				Hide(headerArray[7]);
				Hide(headerArray[12]);
				Hide(headerArray[13]);
			} else {
				Hide(headerArray[10]);
			}
		}
		
		//make the ability score drop-down box editable if this is a complete spell sheet; also add a tooltip
		//also make the three 'calculated' fields editable
		if (tDoc.info.SpellsOnly) {
			tDoc.getField(headerArray[3]).editable = true;
			AddTooltip(headerArray[3], "You can enter anything you want into this field, you are not limited by the drop-down box, that is just there for easy reference.");
			tDoc.getField(headerArray[4]).readonly = false;
			tDoc.getField(headerArray[5]).readonly = false;
			tDoc.getField(headerArray[6]).readonly = false;
		}
		
		//set the submitName to remember the line where this header is at
		var submitNameFld = headerArray[1];
	} else if (type === "glossary") {
		//set the submitName to remember the line where this header is at
		var submitNameFld = glossaryArray[0];
	}
	//set the submitName to remember the line where this is at
	tDoc.getField(submitNameFld).submitName = target;
}

//calculate the number of spells to memorize, attack modifier, and DC (field calculation)
function CalcSpellScores() {
	if (tDoc.info.SpellsOnly) return;
	var type = event.target.name.replace(/.*spellshead\.(\w+).*/, "$1");
	var Fld = event.target.name.replace("spellshead." + type, "spellshead.DINGDONG");
	var theMod = What(Fld.replace("DINGDONG", "ability"));
	
	var theResult = "";
	//now only continue with a calculation if a ability was chosen in the drop-down menu
	if (theMod !== "nothing") {
		//the ability score modifier
		theResult = Number(What(theMod));
		
		//damage added manually in the bluetext field
		var ExtraBonus = What(event.target.name.replace("spellshead", "BlueText.spellshead"));
		if (isNaN(ExtraBonus)) {
			ExtraBonus = What(ExtraBonus + " Mod");
		}
		theResult += Number(ExtraBonus);
		
		switch (type) {
		 case "dc" :
			//add a base of 8 and then add the proficiency bonus
			theResult += 8;
		 case "attack" :
			//add the proficiency bonus
			theResult += Number(What("Proficiency Bonus"));
			break;
		 case "prepare" :
			//find the associated class
			var aClass = What(Fld.replace("DINGDONG", "class"));
			//add the class level
			if (CurrentSpells[aClass]) {
				var cSpells = CurrentSpells[aClass];
				if (cSpells.factor && cSpells.factor[0]) {
					theResult += Math.max(Math.floor(cSpells.level / cSpells.factor[0]), 1);
				} else {
					theResult += cSpells.level;
				}
			}
			break;
		}
	}
	
	event.value = theResult;
}

//change the icon of the checkbox based on the value of this field (field validation)
function SetSpellCheckbox() {
	var type = event.target.name.indexOf("checkbox") !== -1 ? "checkbox" : "check";

	if (type === "check") {
		var theEV = event.value.toLowerCase();
		if (event.target.submitName === theEV) return; //the newly added value is the same as the previous value, so there is nothing to do
		var theIcon = false;
		var theCheckBox = event.target.name.replace("check", "checkbox");
		var showThis = "Hide";
		var showBox = "Show";
		var insideColor = color.transparent;
		var borderColor = color.transparent;
		var theCaption = "";
		var borderWidth = 0;
		var borderType = border.s;
		switch(theEV) {
		 case "checkedbox" :
			theIcon = tDoc.getField("SaveIMG.Spells.Checkedbox").buttonGetIcon();
			break;
		 case "markedbox" :
			theIcon = tDoc.getField("SaveIMG.Spells.Markedbox").buttonGetIcon();
			break;
		 case "checkbox" :
			theIcon = tDoc.getField("SaveIMG.Spells.Uncheckedbox").buttonGetIcon();
			break;
		 case "atwill" :
			theIcon = tDoc.getField("SaveIMG.Spells.AtWill").buttonGetIcon();
			break;
		 case "oncelr" :
			theIcon = tDoc.getField("SaveIMG.Spells.1xLR").buttonGetIcon();
			break;
		 case "oncesr" :
			theIcon = tDoc.getField("SaveIMG.Spells.1xSR").buttonGetIcon();
			break;
		 case "hide" :
			showBox = "Hide";
			showThis = "Hide";
			break;
		 case "" : //make it a button that we can use to call a menu
			insideColor = !typePF ? ColorList[What("Color.Theme")].CMYK : ["RGB", 0.659, 0.659, 0.659];
			borderColor = color.white;
			theCaption = ">";
			borderWidth = !typePF ? 2 : 1;
			borderType = border.b;
		 default :
			theIcon = tDoc.getField("SaveIMG.EmptyIcon").buttonGetIcon();
			showBox = "DontPrint";
			showThis = event.value !== "" ? "Show" : "Hide";
		}
		event.target.submitName = theEV;
		tDoc[showThis](event.target.name); //show or hide the "check" field
		tDoc[showBox](theCheckBox); //show or hide the "checkbox" field
		if (theIcon) tDoc.getField(theCheckBox).buttonSetIcon(theIcon);
		tDoc.getField(theCheckBox).fillColor = insideColor;
		tDoc.getField(theCheckBox).lineWidth = borderWidth;
		if (typePF) {
			tDoc.getField(theCheckBox).strokeColor = borderColor;
			for (var L = 0; L <= 2; L++) {
				tDoc.getField(theCheckBox).buttonSetCaption(theCaption, L);
			}
			tDoc.getField(theCheckBox).borderStyle = borderType;
		}
	} else if (type === "checkbox") {
		if (event.modifier || event.shift) { //if Shift/Ctrl/Cmd was pressed while clicking
			MakeSpellLineMenu_SpellLineOptions();
		} else {
			var theCheck = event.target.name.replace("checkbox", "check");
			switch(What(theCheck).toLowerCase()) {
			 case "checkedbox" :
				Value(theCheck, "checkbox");
				break;
			 case "checkbox" :
				Value(theCheck, "checkedbox");
				break;
			 default :
				MakeSpellLineMenu_SpellLineOptions();
			}
		}
	}
}

//generate a list of all the spells; if display = true it means this is meant for the drop-down boxes
function CreateSpellList(inputObject, display, extraArray, returnOrdered) {
	if (typeof inputObject === "string") {
		switch (inputObject) {
			case "eldritch knight" :
				inputObject = {
					class : "wizard",
					school : ["Evoc", "Abjur"],
					level : [0, 4], //lower and higher limit
				};
				break;
			case "arcane trickster" :
				inputObject = {
					class : "wizard",
					school : ["Ench", "Illus"],
					level : [0, 4], //lower and higher limit
				};
				break;
			default :
				inputObject = {class : inputObject};
		}
	}
	//define some arrays
	var returnArray = [];
	var spByLvl = {sp0 : [], sp1 : [], sp2 : [], sp3 : [], sp4 : [], sp5 : [], sp6 : [], sp7 : [], sp8 : [], sp9 : []};
	
	//now go through all the spells in the list and see if they agree with the criteria
	for (var key in SpellsList) {
		var aSpell = SpellsList[key];
		//first test if the spell's source is on the list of sources to use
		var addSp = !testSource(key, aSpell, "spellsExcl");
		//now test if the spell meets all the criteria set in the inputObject
		if (addSp && inputObject.spells) {
			addSp = inputObject.spells.indexOf(key) !== -1;
		}
		if (addSp && inputObject.notspells) {
			addSp = inputObject.notspells.indexOf(key) === -1;
		}
		if (addSp && inputObject.class) {
			if (isArray(inputObject.class)) {
				var testClass = false;
				for (var c = 0; c < inputObject.class.length; c++) {
					if (aSpell.classes.indexOf(inputObject.class[c]) !== -1) {
						addSp = true;
						break;
					};
				};
			} else {
				addSp = inputObject.class === "any" || aSpell.classes.indexOf(inputObject.class) !== -1;
			}
		}
		if (addSp && inputObject.level) {
			addSp = aSpell.level >= inputObject.level[0] && aSpell.level <= inputObject.level[1];
		}
		if (addSp && inputObject.school && aSpell.level !== 0) { //only check for school if not a cantrip
			addSp = inputObject.school.indexOf(aSpell.school) !== -1;
		}
		if (addSp && inputObject.attackOnly) {
			addSp = !aSpell.save && aSpell.description.toLowerCase().indexOf("spell attack") !== -1;
		}
		if (extraArray && extraArray.indexOf(key) !== -1) addSp = true;
		if (addSp && inputObject.ritual !== undefined) {
			addSp = aSpell.ritual ? aSpell.ritual == inputObject.ritual : !inputObject.ritual;
		}
		if (addSp && inputObject.psionic !== undefined) {
			addSp = aSpell.psionic ? aSpell.psionic == inputObject.psionic : !inputObject.psionic;
		}
		if (addSp) {
			if (display) {
				spByLvl["sp" + aSpell.level].push(aSpell.name);
			} else if (returnOrdered) {
				spByLvl["sp" + aSpell.level].push(key);
			} else {
				returnArray.push(key);
			}
		}
	}
	
	if (display) {
		var count = 0;
		//now cycle through all the spell level arrays and add them, if not empty, to the returnArray
		for (var i = 0; i <= 9; i++) {
			var spA = spByLvl["sp" + i];
			//if the array has more than 0 entries, make it ready for the drop-down boxes in the dialog
			if (spA.length > 0) {
				spA.sort();
				spA.unshift("", i !== 0 ? ">> " + spellLevelList[i] + " <<" : ">> Cantrips <<");
				returnArray = returnArray.concat(spA);
				count += 1;
			}
		}
		if (count === 1) returnArray.splice(1, 1); //if only one level of spells turned up, we don't need the introductory header
	} else if (returnOrdered) {
		//now cycle through all the spell level arrays and add them, if not empty, to the returnArray as an array
		for (var i = 0; i <= 9; i++) {
			var spA = spByLvl["sp" + i];
			spA.sort();
			returnArray.push(spA);
		}
	}
	
	return returnArray;
};

//generate a number of zero-width characterSet
function GetZeroWidths(number) {
	var toAdd = "";
	for (var z = 0; z <= number; z++) {
		toAdd += "\u200B"; //add a zero-width space
	}
	//now replace every 20 of these things with one zero-width joiner (\u200C)
	toAdd = toAdd.replace(/\u200B{20}/g, "\u200C");
	return toAdd;
}

//create an object of a spell list array to be used in the dialog
function CreateSpellObject(inputArray) {
	var returnObject = {};
	
	for (var i = 0; i < inputArray.length; i++) {
		var theObject = GetZeroWidths(i) + inputArray[i];;
		returnObject[theObject] = (i + 1) * -1;
	}
	return returnObject;
}

//a dialog for user input on spells
var SpellSheetSelect_Dialog = {
	
	listBo : [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], //array of lists
	namesBo : [], //always 15 long!
	keysBo : [], //always 15 long!
	listCa : {},
	listSp : {},
	selectBo : [], //always 15 long!
	selectCa : [],
	selectAd : [],
	selectSp : [],
	selectSpRadio : 1,
	nmbrBo : 0,
	nmbrCa : 0,
	nmbrSp : 0,
	typeSp : "known",
	offsetBo : 0,
	offsetCa : 0,
	offsetSp : 0,
	showBo : true,
	showCa : true,
	showAd : true,
	showSp : true,
	showSpRadio : true,
	spNm : "Spells",
	caNm : "Cantrips",
	txt : "",
	header : "",
	fullname : "",
	SpBook : false,
	levelSp : 1,
	
	//when starting the dialog
	initialize : function (dialog) {
		this.SpBook = false;
		this.txt = "Please set the " + this.spNm.toLowerCase() + "/" + this.caNm.toLowerCase() + " you want to have on the Spell Sheet.\nNote that some things might not be available in this dialog, because what you are editing has no access to it.\nYou can always use ENTER to confirm or ESC to cancel this dialogue.";
		
		var psiSpells = this.spNm === "Spells" ? "Spells" : "Psionics";
		
		//make a string for the information
		var info = "Which grants:\t";
		if (this.showCa) info += this.caNm + " known:\t" + toUni(this.nmbrCa) + "\n\t\t";
		switch (this.typeSp) {
		 case "book" :
			info += this.spNm + " known:\t" + toUni("All in spellbook") + "\n\t\t";
			break;
		 case "list" :
			info += this.spNm + " known:\t" + toUni("All on the class' spell list") + "\n\t\t";
			break
		 case "known" :
			info += this.spNm + " known:\t" + toUni(this.nmbrSp) + "\n\t\t";
			break;
		}
		if (this.levelSp) info += "of Spell Level:\t" + toUni(spellLevelList[this.levelSp]) + (this.levelSp > 1 ? " (and lower)" : "") + "\n\t\t";
		if (this.showBo) info += "Extra " + psiSpells + ":\t" + toUni(this.nmbrBo);
		
		var theBo = this.nmbrBo + this.offsetBo;
		var theCa = this.nmbrCa + this.offsetCa;
		var theSp = this.nmbrSp + this.offsetSp;
		
		//set the value of various text entries
		dialog.load({
			"Hea0" : "Set " + this.header.capitalize() + " " + this.spNm,
			"txt0" : this.txt,
			"BonK" : ASround(theBo),
			"CanK" : ASround(theCa),
			"SplK" : ASround(theSp),
			"txC1" : this.fullname,
			"txC2" : info,
			"BonT" : "Extra " + psiSpells,
			"CanT" : this.caNm,
			"AdIT" : "Subclass " + psiSpells,
			"SplT" : this.typeSp === "book" ? "Spellbook" : this.spNm,
		});
		
		//set the visibility of the clusters
		dialog.visible({
			"BoCL" : this.showBo,
			"CaCL" : this.showCa,
			"AdCL" : this.showAd,
			"SpCL" : this.showSp,
			"RaCL" : this.showSpRadio,
			"SplK" : this.showSp && this.typeSp !== "book",
		});
		
		//enable the various entries or disable them and load their values
		var toEnable = {};
		var toLoad = {};
		if (this.showSpRadio) toLoad["SpR" + this.selectSpRadio] = true;
		for (var i = 1; i <= 18; i++) {
			var BS = "BS" + ("0" + i).slice(-2);
			var BT = "BT" + ("0" + i).slice(-2);
			var Ca = "Ca" + ("0" + i).slice(-2);
			var Sp = "Sp" + ("0" + i).slice(-2);
			var Ad = "Ad" + ("0" + i).slice(-2);
			if (this.showBo && i <= 15) {
				toEnable[BS] = i <= theBo;
				toLoad[BS] = this.listBo[i - 1];
				toLoad[BT] = this.namesBo[i - 1];
			}
			if (this.showAd && this.selectAd[i - 1]) {
				toLoad[Ad] = this.selectAd[i - 1].capitalize();
			}
			if (this.showCa && i <= 10) {
				toEnable[Ca] = i <= theCa;
				toLoad[Ca] = this.listCa;
			}
			if (this.showSp) {
				toEnable[Sp] = i <= theSp;
				toLoad[Sp] = this.listSp;
			}
		}
		dialog.enable(toEnable);
		dialog.load(toLoad);
		
		//a function to set the right object to positive
		var setSpell = function(aObj, aSpell) {
			var isFound = false;
			for (var a in aObj) {
				if (!isFound) {
					var theAspell = ParseSpell(a);
					if (aSpell === theAspell) {
						aObj[a] = 1;
						isFound = true;
					}
				}
			}
			return aObj; //if nothing was found
		}
		
		//set the various entries to the right values
		var iResult = dialog.store();
		var toSet = {};
		for (var i = 1; i <= 18; i++) {
			//first the cantrips
			if (i <= theCa) {
				var Ca = "Ca" + ("0" + i).slice(-2);
				var aCaSet = this.selectCa[i - 1];
				if (aCaSet) toSet[Ca] = setSpell(iResult[Ca], aCaSet);
			}
			//then the spells
			if (i <= theSp) {
				var Sp = "Sp" + ("0" + i).slice(-2);
				var aSpSet = this.selectSp[i - 1];
				if (aSpSet) toSet[Sp] = setSpell(iResult[Sp], aSpSet);
			}
			//then the bonus spells
			if (i <= theBo) {
				var Bo = "BS" + ("0" + i).slice(-2);
				var aBoSet = this.selectBo[i - 1];
				if (aBoSet) toSet[Bo] = setSpell(iResult[Bo], aBoSet);
			}
		}
		dialog.load(toSet);
	},
	
	saveIt : function (dialog) {
		var oResult = dialog.store();
		
		this.offsetBo = oResult["BonK"] - this.nmbrBo;
		this.offsetCa = oResult["CanK"] - this.nmbrCa;
		this.offsetSp = oResult["SplK"] - this.nmbrSp;
		
		//a function to return the right one in the list
		var findSpell = function(aObj) {
			for (var a in aObj) {
				if (aObj[a] > 0) return ParseSpell(a);
			}
			return ""; //if nothing was found
		}
		
		this.selectCa = [];
		this.selectSp = [];
		this.selectBo = [];
		for (var i = 1; i <= 18; i++) {
			var Bo = "BS" + ("0" + i).slice(-2);
			var Ca = "Ca" + ("0" + i).slice(-2);
			var Sp = "Sp" + ("0" + i).slice(-2);
			
			var resultSp = i <= oResult["SplK"] ? findSpell(oResult[Sp]) : "";
			if (resultSp) this.selectSp.push(resultSp);
			if (i <= 15) this.selectBo.push(i <= oResult["BonK"] ? findSpell(oResult[Bo]) : "");
			if (i <= 10) {
				var resultCa = i <= oResult["CanK"] ? findSpell(oResult[Ca]) : "";
				if (resultCa) this.selectCa.push(resultCa);
			}
		}
		
		//set the results of the radio button
		this.selectSpRadio = oResult["SpR1"] ? 1 : (oResult["SpR2"] ? 2 : 3);
	},
	
	BonK : function (dialog) {
		var elements = dialog.store();
		var theBo = ASround(elements["BonK"]);
		dialog.load({
			"BonK" : theBo,
		});
		var allBo = {};
		for (var B = 1; B <= 15; B++) {
			allBo["BS" + ("0" + B).slice(-2)] = B <= theBo;
			allBo["BT" + ("0" + B).slice(-2)] = B <= theBo;
		}
		dialog.enable(allBo);
	},
	
	CanK : function (dialog) {
		var elements = dialog.store();
		var theCa = ASround(elements["CanK"]);
		dialog.load({
			"CanK" : theCa,
		});
		var allCa = {};
		for (var C = 1; C <= 10; C++) {
			allCa["Ca" + ("0" + C).slice(-2)] = C <= theCa;
		}
		dialog.enable(allCa);
	},
	
	SplK : function (dialog) {
		var elements = dialog.store();
		var theSp = ASround(elements["SplK"]);
		dialog.load({
			"SplK" : theSp,
		});
		var allSp = {};
		for (var S = 1; S <= 18; S++) {
			allSp["Sp" + ("0" + S).slice(-2)] = S <= theSp;
		}
		dialog.enable(allSp);
	},
	
	ok : function (dialog) {
		if (this.typeSp === "book") this.SpBook = true;
		this.saveIt(dialog);
	},
	
	other : function (dialog) {
		this.saveIt(dialog);
		dialog.end("ok");
	},
	
	description : {
		name : "Set Spells",
		elements : [{
			type : "view", //view to add ok buttons below everything else
			align_children : "align_left",
			elements : [{
				type : "view", //total view
				align_children : "align_distribute",
				elements : [{
					type : "view", //left view
					alignment : "align_left",
					char_width : 39,
					elements : [{
						type : "static_text",
						item_id : "Hea0",
						alignment : "align_fill",
						font : "title",
						bold : true,
						height : 21,
						char_width : 39,
					}, {
						type : "static_text",
						item_id : "txt0",
						alignment : "align_fill",
						font : "dialog",
						height : 60,
						char_width : 39,
					}, {
						type : "view", //class name view
						align_children : "align_row",
						char_width : 39,
						elements : [{
							type : "static_text",
							item_id : "txt1",
							char_width : 10,
							name : "Currently editing:",
						}, {
							type : "static_text",
							item_id : "txC1",
							char_width : 28,
							font : "dialog",
							bold : true,
						}]
					}, {
						type : "static_text",
						item_id : "txC2",
						char_width : 39,
						height : 60,
					}, {
						type : "cluster", //bonus spells cluster
						alignment : "align_center",
						item_id : "BoCL",
						char_width : 40,
						elements : [{
							type : "view", //view with one row
							align_children : "align_distribute",
							char_width : 15,
							elements : [{
								type : "static_text",
								item_id : "BonT",
								name : "Extra Spells",
								height : 22,
								char_width : 12,
								alignment : "align_left",
								font : "heading",
								bold : true,
							}, {
								type : "edit_text",
								item_id : "BonK",
								alignment : "align_right",
								char_width : 3,
								height : 22,
								SpinEdit : true,
							}, {
								type : "static_text",
								item_id : "BoT2",
								name : "Origin of Entry",
								height : 22,
								char_width : 15,
								alignment : "align_left",
								font : "heading",
							}]
						}, {
							type : "view", //view with a row
							align_children : "align_row",
							char_width : 29,
							elements : [{
								type : "popup",
								item_id : "BS01",
								char_width : 15,
								height : 15,
							}, {
								type : "static_text",
								item_id : "BT01",
								alignment : "align_left",
								char_width : 14,
								height : 15,
							}]
						}, {
							type : "view", //view with a row
							align_children : "align_row",
							char_width : 29,
							elements : [{
								type : "popup",
								item_id : "BS02",
								char_width : 15,
								height : 15,
							}, {
								type : "static_text",
								item_id : "BT02",
								alignment : "align_left",
								char_width : 14,
								height : 15,
							}]
						}, {
							type : "view", //view with a row
							align_children : "align_row",
							char_width : 29,
							elements : [{
								type : "popup",
								item_id : "BS03",
								char_width : 15,
								height : 15,
							}, {
								type : "static_text",
								item_id : "BT03",
								alignment : "align_left",
								char_width : 14,
								height : 15,
							}]
						}, {
							type : "view", //view with a row
							align_children : "align_row",
							char_width : 29,
							elements : [{
								type : "popup",
								item_id : "BS04",
								char_width : 15,
								height : 15,
							}, {
								type : "static_text",
								item_id : "BT04",
								alignment : "align_left",
								char_width : 14,
								height : 15,
							}]
						}, {
							type : "view", //view with a row
							align_children : "align_row",
							char_width : 29,
							elements : [{
								type : "popup",
								item_id : "BS05",
								char_width : 15,
								height : 15,
							}, {
								type : "static_text",
								item_id : "BT05",
								alignment : "align_left",
								char_width : 14,
								height : 15,
							}]
						}, {
							type : "view", //view with a row
							align_children : "align_row",
							char_width : 29,
							elements : [{
								type : "popup",
								item_id : "BS06",
								char_width : 15,
								height : 15,
							}, {
								type : "static_text",
								item_id : "BT06",
								alignment : "align_left",
								char_width : 14,
								height : 15,
							}]
						}, {
							type : "view", //view with a row
							align_children : "align_row",
							char_width : 29,
							elements : [{
								type : "popup",
								item_id : "BS07",
								char_width : 15,
								height : 15,
							}, {
								type : "static_text",
								item_id : "BT07",
								alignment : "align_left",
								char_width : 14,
								height : 15,
							}]
						}, {
							type : "view", //view with a row
							align_children : "align_row",
							char_width : 29,
							elements : [{
								type : "popup",
								item_id : "BS08",
								char_width : 15,
								height : 15,
							}, {
								type : "static_text",
								item_id : "BT08",
								alignment : "align_left",
								char_width : 14,
								height : 15,
							}]
						}, {
							type : "view", //view with a row
							align_children : "align_row",
							char_width : 29,
							elements : [{
								type : "popup",
								item_id : "BS09",
								char_width : 15,
								height : 15,
							}, {
								type : "static_text",
								item_id : "BT09",
								alignment : "align_left",
								char_width : 14,
								height : 15,
							}]
						}, {
							type : "view", //view with a row
							align_children : "align_row",
							char_width : 29,
							elements : [{
								type : "popup",
								item_id : "BS10",
								char_width : 15,
								height : 15,
							}, {
								type : "static_text",
								item_id : "BT10",
								alignment : "align_left",
								char_width : 14,
								height : 15,
							}]
						}, {
							type : "view", //view with a row
							align_children : "align_row",
							char_width : 29,
							elements : [{
								type : "popup",
								item_id : "BS11",
								char_width : 15,
								height : 15,
							}, {
								type : "static_text",
								item_id : "BT11",
								alignment : "align_left",
								char_width : 14,
								height : 15,
							}]
						}, {
							type : "view", //view with a row
							align_children : "align_row",
							char_width : 29,
							elements : [{
								type : "popup",
								item_id : "BS12",
								char_width : 15,
								height : 15,
							}, {
								type : "static_text",
								item_id : "BT12",
								alignment : "align_left",
								char_width : 14,
								height : 15,
							}]
						}, {
							type : "view", //view with a row
							align_children : "align_row",
							char_width : 29,
							elements : [{
								type : "popup",
								item_id : "BS13",
								char_width : 15,
								height : 15,
							}, {
								type : "static_text",
								item_id : "BT13",
								alignment : "align_left",
								char_width : 14,
								height : 15,
							}]
						}, {
							type : "view", //view with a row
							align_children : "align_row",
							char_width : 29,
							elements : [{
								type : "popup",
								item_id : "BS14",
								char_width : 15,
								height : 15,
							}, {
								type : "static_text",
								item_id : "BT14",
								alignment : "align_left",
								char_width : 14,
								height : 15,
							}]
						}, {
							type : "view", //view with a row
							align_children : "align_row",
							char_width : 29,
							elements : [{
								type : "popup",
								item_id : "BS15",
								char_width : 15,
								height : 15,
							}, {
								type : "static_text",
								item_id : "BT15",
								alignment : "align_left",
								char_width : 14,
								height : 15,
							}]
						}, {
							type : "gap",
							height : 1,
						}]
					}]			
				}, {
					type : "view", //middle (cantrip & added spells) view with one column
					align_children : "align_left",
					char_width : 15,
					elements : [{
						type : "cluster", //cantrip cluster
						align_children : "align_left",
						item_id : "CaCL",
						char_width : 15,
						elements : [{
							type : "view", //view one row
							align_children : "align_distribute",
							char_width : 15,
							elements : [{
								type : "static_text",
								item_id : "CanT",
								name : "Cantrips",
								height : 22,
								char_width : 12,
								alignment : "align_left",
								font : "heading",
								bold : true,
							}, {
								type : "edit_text",
								alignment : "align_right",
								item_id : "CanK",
								char_width : 3,
								height : 22,
								SpinEdit : true,
							}]
						}, {
							type : "popup",
							item_id : "Ca01",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Ca02",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Ca03",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Ca04",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Ca05",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Ca06",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Ca07",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Ca08",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Ca09",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Ca10",
							char_width : 15,
							height : 15,
						}, {
							type : "gap",
							height : 5,
						}]
					}, {
						type : "cluster", //subclass spells cluster (only for cleric/druid/paladin)
						align_children : "align_left",
						item_id : "AdCL",
						char_width : 15,
						elements : [{
							type : "static_text",
							item_id : "AdIT",
							name : "Subclass Spells",
							char_width : 15,
							height : 20,
							font : "heading",
							bold : true,
						}, {
							type : "static_text",
							item_id : "Ad01",
							char_width : 15,
							height : 15,
						}, {
							type : "static_text",
							item_id : "Ad02",
							char_width : 15,
							height : 15,
						}, {
							type : "static_text",
							item_id : "Ad03",
							char_width : 15,
							height : 15,
						}, {
							type : "static_text",
							item_id : "Ad04",
							char_width : 15,
							height : 15,
						}, {
							type : "static_text",
							item_id : "Ad05",
							char_width : 15,
							height : 15,
						}, {
							type : "static_text",
							item_id : "Ad06",
							char_width : 15,
							height : 15,
						}, {
							type : "static_text",
							item_id : "Ad07",
							char_width : 15,
							height : 15,
						}, {
							type : "static_text",
							item_id : "Ad08",
							char_width : 15,
							height : 15,
						}, {
							type : "static_text",
							item_id : "Ad09",
							char_width : 15,
							height : 15,
						}, {
							type : "static_text",
							item_id : "Ad10",
							char_width : 15,
							height : 25,
						}]
					}]
				}, {
					type : "view", //
					elements : [{
						type : "cluster", //spell cluster
						align_children : "align_left",
						item_id : "SpCL",
						char_width : 16,
						elements : [{
							type : "view", //view with one row
							align_children : "align_distribute",
							char_width : 15,
							elements : [{
								type : "static_text",
								item_id : "SplT",
								name : "Spells",
								height : 22,
								char_width : 12,
								alignment : "align_left",
								font : "heading",
								bold : true,
							}, {
								type : "edit_text",
								item_id : "SplK",
								alignment : "align_right",
								char_width : 3,
								height : 22,
								SpinEdit : true,
							}]
						}, {
							type : "popup",
							item_id : "Sp01",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp02",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp03",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp04",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp05",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp06",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp07",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp08",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp09",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp10",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp11",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp12",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp13",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp14",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp15",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp16",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp17",
							char_width : 15,
							height : 15,
						}, {
							type : "popup",
							item_id : "Sp18",
							char_width : 15,
							height : 15,
						}, {
							type : "gap",
							height : 5,
						}]
					}, {
						type : "cluster", //radio button cluster
						item_id : "RaCL",
						name : "What Spells to Show",
						align_children : "align_left",
						char_width : 15,
						font : "heading",
						bold : true,
						elements : [{
							type : "radio",
							item_id : "SpR1",
							group_id : "RadB",
							name : "Spells of levels I can cast",
						}, {
							type : "radio",
							item_id : "SpR2",
							group_id : "RadB",
							name : "All spells regardless of level",
						}, {
							type : "radio",
							item_id : "SpR3",
							group_id : "RadB",
							name : "Prepared spells only",
						}]
					}]
				}]
			}, {
				type : "ok_cancel_other",
				ok_name : "Add More Spells to the Spellbook",
				alignment : "align_right",
				other_name : "Continue to Next Dialog",
				cancel_name : "Cancel and Stop",
			}]
		}]
	}
}

var SpellSheetOrder_Dialog = {
	
	bExcL : [],
	bIncL : [],
	glossary : false,
	
	initialize : function (dialog) {
		//set the ExcLuded list
		var ExcObj = {};
		for (var Ex = 0; Ex < this.bExcL.length; Ex++) {
			ExcObj[this.bExcL[Ex]] = -1;
		}
		dialog.load({
			"ExcL" : ExcObj,
			"IncL" : {},
			"txt0" : "Please select which of your spellcasting sources you want to include in the Spell Sheet and in which order they should appear.\n\nNote that generating a new Spell Sheet deletes any current Spell Sheet(s) in this pdf.\n\nPlease be patient, generating a Spell Sheet can take a long time, often more than ten minutes, and sometimes up to an hour (yes, even on your new gaming rig). During this time Adobe Acrobat will appear unresponsive (but will still be working).",
			"Glos" : this.glossary,
		});
		
		//set the IncLuded list
		for (var In = 0; In < this.bIncL.length; In++) {
			var loadObject = {};
			loadObject[this.bIncL[In]] = -1 * [1 + In];
			dialog.insertEntryInList({"IncL" : loadObject});
		}
		
	},
	
	commit : function (dialog) {
		//put both elements into the arrays
		var oResult = dialog.store();
		var aExcL = oResult["ExcL"];
		var aIncL = oResult["IncL"];
		this.glossary = oResult["Glos"];
		
		//make the ExcLuded array
		this.bExcL = [];
		for (var Ex in aExcL) this.bExcL.push(Ex);
		
		//make the IncLuded array in the right order
		var tempIncL = [];
		for (var In in aIncL) {
			var theLoc = Math.abs(aIncL[In]);
			tempIncL[theLoc] = In;
		}
		//now put the values that are not empty into the final array
		this.bIncL = [];
		for (var i = 0; i < tempIncL.length; i++) {
			if (tempIncL[i]) this.bIncL.push(tempIncL[i]);
		}
	},
	
	BTRA : function (dialog) {
		// move all (remaining) items from ExcL to IncL
		var elements = dialog.store()["ExcL"];
		var n = 0;
		for (var p in dialog.store()["IncL"]) n -=1;
		for (var element in elements) {
			n -= 1;
			var loadObject = {};
			loadObject[element] = n;
			dialog.insertEntryInList({"IncL" : loadObject });
		}
		dialog.removeAllEntriesFromList("ExcL");
		dialog.focus("IncL");
	},
	
	BTR1 : function (dialog) {
		// move selected (one) item from ExcL to IncL
		var refresh = false;
		var sourceObject = {};
		var elements = dialog.store()["ExcL"];
		var IncLlen = 0;
		for (var p in dialog.store()["IncL"]) IncLlen +=1;
		for (var element in elements) {
			if (elements[element] > 0) {
				var loadObject = {};
				loadObject[element] = -1 * (IncLlen + 1);
				dialog.insertEntryInList({"IncL" : loadObject});
				refresh = true;
			} else {
				sourceObject[element] = -1;
			}
		}
		if (refresh) {
			dialog.load({"ExcL" : sourceObject});
			dialog.focus("ExcL");
		}
	},
	
	BTL1 : function (dialog) {
		// move selected (one) item from IncL to ExcL, without changing the IncL order
		var refresh = false;
		var sourceObject = dialog.store()["ExcL"];
		var elements = dialog.store()["IncL"];
		var resetArray = [];
		for (var element in elements) {
			if (elements[element] > 0) {
				sourceObject[element] = -1;
				refresh = true;
			} else {
				var theLoc = Math.abs(elements[element]);
				resetArray[theLoc] = element;
			}
		}
		if (refresh) {
			//restore the ExcL list
			dialog.load({"ExcL" : sourceObject});
			//reload everything into the IncL list
			dialog.removeAllEntriesFromList("IncL");
			var n = 0;
			for (var i = 0; i < resetArray.length; i++) {
				if (resetArray[i]) {
					n -= 1;
					var loadObject = {};
					loadObject[resetArray[i]] = n;
					dialog.insertEntryInList({"IncL" : loadObject});
				}
			}
			dialog.focus("IncL");
		}
	},
	
	BTLA : function (dialog) {
		// move all items from IncL to ExcL and sort ExcL
		var elements = dialog.store()["IncL"];
		var isLST1 = dialog.store()["ExcL"];
		for (var element in elements) {
			isLST1[element] = -1;
		}
		dialog.removeAllEntriesFromList("IncL");
		dialog.load({"ExcL" : isLST1});
		dialog.focus("ExcL");
	},
	
	BTNU : function (dialog) {
		//move the selected, if any, up
		//first make an array in the right order
		var aIncL = dialog.store()["IncL"];
		var tempIncL = [];
		var Move = false;
		for (var In in aIncL) {
			var theLoc = Math.abs(aIncL[In]);
			if (aIncL[In] > 0) Move = In;
			tempIncL[theLoc] = In;
		}
		//so now we have an array in the right order, we just need to move it up one space in the array
		if (Move) {
			//first clean the array of any empty values
			var tempIncL2 = [];
			for (var i = 0; i < tempIncL.length; i++) {
				if (tempIncL[i]) tempIncL2.push(tempIncL[i]);
			}
			//move the value we want into the one above
			var toMove = tempIncL2.indexOf(Move);
			if (toMove !== 0) {
				var temp = tempIncL2[toMove];
				tempIncL2[toMove] = tempIncL2[toMove - 1];
				tempIncL2[toMove - 1] = temp;
				
				dialog.removeAllEntriesFromList("IncL");
				var n = 0;
				for (var i = 0; i < tempIncL2.length; i++) {
					n -= 1;
					var loadObject = {};
					loadObject[tempIncL2[i]] = n * (tempIncL2[i] === Move ? -1 : 1);
					dialog.insertEntryInList({"IncL" : loadObject});
				}
			}
		}
		dialog.focus("IncL");
	},
	
	BTND : function (dialog) {
		//move the selected, if any, down
		//first make an array in the right order
		var aIncL = dialog.store()["IncL"];
		var tempIncL = [];
		var Move = false;
		for (var In in aIncL) {
			var theLoc = Math.abs(aIncL[In]);
			if (aIncL[In] > 0) Move = In;
			tempIncL[theLoc] = In;
		}
		//so now we have an array in the right order, we just need to move it down one space in the array
		if (Move) {
			//first clean the array of any empty values
			var tempIncL2 = [];
			for (var i = 0; i < tempIncL.length; i++) {
				if (tempIncL[i]) tempIncL2.push(tempIncL[i]);
			}
			//move the value we want into the one above
			var toMove = tempIncL2.indexOf(Move);
			if (toMove !== (tempIncL2.length - 1)) {
				var temp = tempIncL2[toMove];
				tempIncL2[toMove] = tempIncL2[toMove + 1];
				tempIncL2[toMove + 1] = temp;
				
				dialog.removeAllEntriesFromList("IncL");
				var n = 0;
				for (var i = 0; i < tempIncL2.length; i++) {
					n -= 1;
					var loadObject = {};
					loadObject[tempIncL2[i]] = n * (tempIncL2[i] === Move ? -1 : 1);
					dialog.insertEntryInList({"IncL" : loadObject});
				}
			}
		}
		dialog.focus("IncL");
	},
	
	description : {
		name : "Pick which are excluded and included",
		elements : [{
			type : "view",
			align_children : "align_left",
			elements : [{
				type : "static_text",
				item_id : "head",
				alignment : "align_fill",
				font : "heading",
				bold : true,
				height : 21,
				width : 700,
				name : "Select what to include in the Spell Sheet"
			}, {
				type : "static_text",
				item_id : "txt0",
				char_height : 10,
				width : 700,
			}, {
				type : "check_box",
				item_id : "Glos",
				name : "Add a Glossary of Abbreviations to the end of the Spell Sheet(s)",
			}, {
				type : "view",
				align_children : "align_row",
				elements : [{
					type : "cluster",
					name : "Exclude from Spell Sheet",
					font : "heading",
					elements : [{
						width : 180,
						height : 130,
						type : "list_box",
						item_id : "ExcL"
					}]
				}, {
					type : "view",
					elements : [{
						type : "button",
						item_id : "BTRA",
						name: ">>",
					}, {
						type : "button",
						item_id : "BTR1",
						name: ">",
					}, {
						type : "button",
						item_id : "BTL1",
						name: "<",
					}, {
						type : "button",
						item_id : "BTLA",
						name: "<<",
					}]
				}, {
					type : "cluster",
					name : "Include in Spell Sheet",
					font : "heading",
					elements : [{
						width : 180,
						height : 130,
						type : "list_box",
						item_id : "IncL",
					}]
				}, {
					type : "view",
					width : 12,
					elements : [{
						type : "button",
						item_id : "BTNU",
						name: "\u22CF",
					},{
						type : "button",
						item_id : "BTND",
						name: "\u22CE",
					}]
				}]
			}, {
				type : "ok_cancel",
				ok_name : "Generate the Spell Sheet (takes extremely long)",
				cancel_name : "Don't generate a Spell Sheet",
			}]
		}]
	},
}

//a dialog for spellbooks, adding 80 places to add spells
//a dialog for user input for more spells (after the initial 22) for a spellsbook
var SpellBookSelect_Dialog = {
	listSp : {},
	selectSp : [],
	fullname : "",
	
	//when starting the dialog
	initialize : function (dialog) {		
		//set the value of various text entries
		dialog.load({
			"Hea0" : "Additional Spellbook Spells for " + this.fullname,
		});
		
		//enable the various entries or disable them and load their values
		var toLoad = {};
		for (var i = 1; i <= 80; i++) {
			var Sp = "Sp" + ("0" + i).slice(-2);
			toLoad[Sp] = this.listSp;
		}
		dialog.load(toLoad);
		
		//a function to set the right object to positive
		var setSpell = function(aObj, aSpell) {
			var isFound = false;
			for (var a in aObj) {
				if (!isFound) {
					var theAspell = ParseSpell(a);
					if (aSpell === theAspell) {
						aObj[a] *= -1;
						isFound = true;
					}
				}
			}
			return aObj; //if nothing was found
		}
		
		//set the various entries to the right values
		var iResult = dialog.store();
		var toSet = {};
		for (var i = 1; i <= 80; i++) {
			//then the spells
			if (i <= this.selectSp.length) {
				var Sp = "Sp" + ("0" + i).slice(-2);
				var aSpSet = this.selectSp[i - 1];
				if (aSpSet) toSet[Sp] = setSpell(iResult[Sp], aSpSet);
			}
		}
		dialog.load(toSet);
	},
	
	commit : function (dialog) {
		var oResult = dialog.store();
		
		//a function to return the right one in the list
		var findSpell = function(aObj) {
			for (var a in aObj) {
				if (aObj[a] > 0) return ParseSpell(a);
			}
			return ""; //if nothing was found
		}
		this.selectSp = [];
		for (var i = 1; i <= 80; i++) {
			var Sp = "Sp" + ("0" + i).slice(-2);
			var resultSp = findSpell(oResult[Sp]);
			if (resultSp) this.selectSp.push(resultSp);
		}
	},
	
	description : {
		name : "Set Spells",
		elements : [{
			type : "view", //view to add ok buttons below everything else
			align_children : "align_left",
			elements : [{
				type : "static_text",
				item_id : "Hea0",
				alignment : "align_fill",
				font : "title",
				bold : true,
				height : 21,
				char_width : 60,
				
			}, {
				type : "view", //total view
				align_children : "align_distribute",
				elements : [{
					type : "view", //left view
					align_children : "align_left",
					char_width : 15,
					elements : [{
						type : "popup",
						item_id : "Sp01",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp02",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp03",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp04",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp05",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp06",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp07",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp08",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp09",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp10",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp11",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp12",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp13",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp14",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp15",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp16",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp17",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp18",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp19",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp20",
						char_width : 15,
						height : 15,
					}, {
						type : "gap",
						height : 5,
					}]
				}, {
					type : "view", //left view
					align_children : "align_left",
					char_width : 15,
					elements : [{
						type : "popup",
						item_id : "Sp21",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp22",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp23",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp24",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp25",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp26",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp27",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp28",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp29",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp30",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp31",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp32",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp33",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp34",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp35",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp36",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp37",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp38",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp39",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp40",
						char_width : 15,
						height : 15,
					}, {
						type : "gap",
						height : 5,
					}]
				}, {
					type : "view", //left view
					align_children : "align_left",
					char_width : 15,
					elements : [{
						type : "popup",
						item_id : "Sp41",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp42",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp43",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp44",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp45",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp46",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp47",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp48",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp49",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp50",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp51",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp52",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp53",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp54",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp55",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp56",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp57",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp58",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp59",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp60",
						char_width : 15,
						height : 15,
					}, {
						type : "gap",
						height : 5,
					}]
				}, {
					type : "view", //left view
					align_children : "align_left",
					char_width : 15,
					elements : [{
						type : "popup",
						item_id : "Sp61",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp62",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp63",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp64",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp65",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp66",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp67",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp68",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp69",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp70",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp71",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp72",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp73",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp74",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp75",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp76",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp77",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp78",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp79",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp80",
						char_width : 15,
						height : 15,
					}, {
						type : "gap",
						height : 5,
					}]
				}]
			}, {
				type : "ok_cancel",
				ok_name : "Continue to Next Dialog",
				cancel_name : "Cancel and Stop",
			}]
		}]
	}
}

var SpellsPrepared_Dialog = {
	listSp : {},
	selectSp : [],
	nmbrSp : 0,
	offsetSp : 0,
	fullname : "Paladin (Oath of the Ancients)",
	ability : 4,
	nmbrPrep : 20,
	
	//when starting the dialog
	initialize : function (dialog) {
		//get the ability modifier and ability name
		var abiNm = AbilityScores.names[this.ability - 1];
		var abiMod = What(AbilityScores.abbreviations[this.ability - 1] + " Mod");
		//set the amount of spells that can be prepared
		this.nmbrSp = Number(this.nmbrPrep) + Number(abiMod);
		
		var theSp = this.nmbrSp + this.offsetSp;
		
		//set the value of various text entries
		dialog.load({
			"Hea0" : "Prepared spells for " + this.fullname,
			"txt0" : "The number of spells to prepare is:\t" + toUni(this.nmbrPrep) + "  (level)\t\t" + (abiMod < 0 ? "- " : "+ ") + toUni(Math.abs(abiMod)) + "  (" + abiNm + " modifier)",
			"SplK" : ASround(theSp),
		});
		
		//enable the various entries or disable them and load their values
		var toEnable = {};
		var toLoad = {};
		if (this.showSpRadio) toLoad["SpR" + this.selectSpRadio] = true;
		for (var i = 1; i <= 30; i++) {
			var Sp = "Sp" + ("0" + i).slice(-2);
			toEnable[Sp] = i <= theSp;
			toLoad[Sp] = this.listSp;
		}
		dialog.enable(toEnable);
		dialog.load(toLoad);
		
		//a function to set the right object to positive
		var setSpell = function(aObj, aSpell) {
			var isFound = false;
			for (var a in aObj) {
				if (!isFound) {
					var theAspell = ParseSpell(a);
					if (aSpell === theAspell) {
						aObj[a] = 1;
						isFound = true;
					}
				}
			}
			return aObj; //if nothing was found
		}
		
		//set the various entries to the right values
		var iResult = dialog.store();
		var toSet = {};
		for (var i = 1; i <= 30; i++) {
			if (i <= theSp) {
				var Sp = "Sp" + ("0" + i).slice(-2);
				var aSpSet = this.selectSp[i - 1];
				if (aSpSet) toSet[Sp] = setSpell(iResult[Sp], aSpSet);
			}
		}
		dialog.load(toSet);
	},
	
	commit : function (dialog) {
		var oResult = dialog.store();
		
		this.offsetSp = oResult["SplK"] - this.nmbrSp;
		
		//a function to return the right one in the list
		var findSpell = function(aObj) {
			for (var a in aObj) {
				if (aObj[a] > 0) return ParseSpell(a);
			}
			return ""; //if nothing was found
		}
		
		this.selectSp = [];
		for (var i = 1; i <= 30; i++) {
			var Sp = "Sp" + ("0" + i).slice(-2);
			var resultSp = i <= oResult["SplK"] ? findSpell(oResult[Sp]) : "";
			if (resultSp) this.selectSp.push(resultSp);
		}
	},
	
	SplK : function (dialog) {
		var elements = dialog.store();
		var theSp = ASround(elements["SplK"]);
		dialog.load({
			"SplK" : theSp,
		});
		var allSp = {};
		for (var S = 1; S <= 30; S++) {
			allSp["Sp" + ("0" + S).slice(-2)] = S <= theSp;
		}
		dialog.enable(allSp);
	},
	
	description : {
		name : "Set Prepared Spells",
		elements : [{
			type : "view", //view to add ok buttons below everything else
			align_children : "align_left",
			elements : [{
				type : "view", //top row view
				align_children : "align_distribute",
				char_width : 54,
				elements : [{
					type : "static_text",
					item_id : "Hea0",
					alignment : "align_fill",
					font : "title",
					bold : true,
					height : 22,
					char_width : 51,
				}, {
					type : "edit_text",
					item_id : "SplK",
					alignment : "align_right",
					char_width : 3,
					height : 22,
					SpinEdit : true,
				}]
			}, {
				type : "static_text",
				item_id : "txt0",
				height : 22,
				char_width : 54,
			}, {
				type : "view", //view with three columns of spells
				align_children : "align_distribute",
				elements : [{
					type : "view", //first column view
					char_width : 15,
					elements : [{
						type : "popup",
						item_id : "Sp01",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp02",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp03",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp04",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp05",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp06",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp07",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp08",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp09",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp10",
						char_width : 15,
						height : 15,
					}]
				}, {
					type : "view", //second column view
					char_width : 15,
					elements : [{
						type : "popup",
						item_id : "Sp11",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp12",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp13",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp14",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp15",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp16",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp17",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp18",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp19",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp20",
						char_width : 15,
						height : 15,
					}]
				}, {
					type : "view", //third column view
					char_width : 15,
					elements : [{
						type : "popup",
						item_id : "Sp21",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp22",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp23",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp24",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp25",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp26",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp27",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp28",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp29",
						char_width : 15,
						height : 15,
					}, {
						type : "popup",
						item_id : "Sp30",
						char_width : 15,
						height : 15,
					}]
				}]
			}, {
				type : "gap",
			}, {
				type : "ok_cancel",
				ok_name : "Continue to Next Dialog",
				cancel_name : "Cancel and Stop",
			}]
		}]
	}
}

//ask the user to set all the spells for all the classes he has
function AskUserSpellSheet() {
	var dia = SpellSheetSelect_Dialog;
	var classesArray = [];
	
	// go through all the entries in CurrentSpells and ask the user for input that we then store back in that same variable
	for (var aCast in CurrentSpells) {
		thermoM("start"); //start a progress dialog
		thermoM("Generating the " + aCast + " dialog..."); //change the progress dialog text
		thermoM(1/2); //increment the progress dialog's progress
		
		var spCast = CurrentSpells[aCast];
		classesArray.push(aCast);
		
		//put some general things in variables
		if (spCast.level && spCast.factor && spCast.factor[0]) {
			var scLevel = spCast.level / spCast.factor[0];
			var highestLevel = spCast.spellsTable ? spCast.spellsTable[Math.ceil(scLevel)].indexOf(0) : tDoc[spCast.factor[1] + "SpellTable"][Math.ceil(scLevel)].indexOf(0);
			scLevel = Math.max(Math.floor(scLevel), 1);
			highestLevel = Number(highestLevel === -1 ? 9 : highestLevel);
		} else {
			var scLevel = false;
			var highestLevel = false;
		};
		
		//see if this is a psionic caster
		var isPsionics = spCast.factor && spCast.factor[1].match(/psionic/i);
		
		//set all the general parts of the dialog
		dia.caNm = isPsionics ? "Talents" : "Cantrips";
		dia.spNm = isPsionics ? "Disciplines" : "Spells";
		dia.levelSp = highestLevel;
		dia.header = aCast; //the name in the dialog's header
		dia.fullname = spCast.name + (spCast.level ? ", level " + spCast.level : ""); //the full name of the feature including level
		if (spCast.list) {
			var GoAhead = true;
			var spListLevel = spCast.list.level; //put the level of the list here for safe keeping

			//see what spell section to activate
			if (spCast.known.cantrips) {
				dia.showCa = true; //show the cantrips section
				dia.nmbrCa = isArray(spCast.known.cantrips) ? spCast.known.cantrips[spCast.level - 1] : spCast.known.cantrips; //set the amount of cantrips
				dia.offsetCa = spCast.offsetCa ? spCast.offsetCa : 0; //set the manually added cantrips
				dia.selectCa = spCast.selectCa ? spCast.selectCa : []; //set the cantrips already selected
				
				//now to create the lists
				spCast.list.level = [0,0]; //set the list level to 0
				var listCaRef = CreateSpellList(spCast.list, true); //create an array of all the cantrips
				dia.listCa = CreateSpellObject(listCaRef); //create the cantrip popup object
			} else {
				dia.showCa = false; //hide the cantrip section
			}
			//now also do this for the spells
			dia.nmbrSp = spCast.known.spells === undefined ? "" : isArray(spCast.known.spells) ? spCast.known.spells[spCast.level - 1] : spCast.known.spells; //set the amount of spells
			dia.typeSp = dia.nmbrSp === "" ? "" : isNaN(dia.nmbrSp) ? dia.nmbrSp : "known"; //set the type of spells (book, list, known)
			dia.nmbrSp = !isNaN(dia.nmbrSp) ? dia.nmbrSp : 18; //if spells known is not a number, set the dialog to the max of 18
			dia.showSpRadio = spCast.level && (dia.typeSp === "list" || dia.typeSp === "book"); //show the spell radio buttons if concerning a list (druid/cleric/paladin)
			dia.showSp = dia.typeSp !== "list" && dia.typeSp !== ""; //show the spells section
			dia.selectSpRadio = spCast.typeList ? spCast.typeList : 1;
			dia.offsetSp = spCast.offsetSp ? spCast.offsetSp : 0; //set the manually added spells
			dia.selectSp = spCast.selectSp ? spCast.selectSp : []; //set the spells already selected
			if (dia.typeSp !== "list") {
				//now to create the lists to select spells from
				spCast.list.level = [1, spListLevel ? spListLevel[1] : 9]; //set the list level to 1 to max set before
				var listSpRef = CreateSpellList(spCast.list, true, spCast.extra && spCast.extra[100] !== "AddToKnown" ? spCast.extra : false); //create an array of all the spells
				dia.listSp = CreateSpellObject(listSpRef); //create the spell popup object
			}
			if (spListLevel) { //put that level list back in the right variable
				spCast.list.level = spListLevel;
			} else {
				delete spCast.list.level;
			}
		} else {
			dia.nmbrCa = 0;
			dia.showCa = false;
			dia.nmbrSp = 0;
			dia.showSp = false;
			dia.typeSp = spCast.typeSp;
			dia.showSpRadio = false;
			var GoAhead = false;
		}
		
		if (spCast.extra) {
			dia.showAd = true; //show the subclass spells section
			dia.selectAd = spCast.extra; //set the array of known subclass spells
		} else {
			dia.showAd = false; //hide the subclass spell section
			
		}
		
		//set the bonus spell things to their basic value
		dia.nmbrBo = 0;
		dia.offsetBo = spCast.offsetBo ? spCast.offsetBo : 0; //manually added bonus spells
		dia.selectBo = [];
		dia.listBo = [];
		dia.namesBo = [];
		dia.keysBo = [];
		var BonusSpecialActions = {
			prepared : [], //auto prepared
			atwill : [], //at will
			oncelr : [], //once per long rest
			oncesr : [], //once per short rest
			other : [], //once per short rest
		}
		//now loop through all the bonus entries, if any
		if (spCast.bonus) {for (var bKey in spCast.bonus) {
			var GoAhead = true;
			var spBonus = spCast.bonus[bKey];
			var loop = isArray(spBonus);
			var loopEnd = loop ? spBonus.length : 1;
			for (var i = 0; i < loopEnd; i++) {
				var spBonusi = loop ? spCast.bonus[bKey][i] : spCast.bonus[bKey];
				var theBonusArray = CreateSpellList(spBonusi, true);
				var theBonusObject = CreateSpellObject(theBonusArray);
				
				var iterate = !spBonusi.times ? 1 : isArray(spBonusi.times) ? spBonusi.times[spCast.level - 1] : spBonusi.times; //if we have to apply this thing multiple times, do so
				for (var y = 1; y <= iterate; y++) {
					dia.nmbrBo += 1; //count the number of bonus things
					dia.listBo.push(theBonusObject); //add object to the array
					dia.namesBo.push(spBonusi.name); //add name to the array
					dia.keysBo.push(bKey); //add key to the array for referencing it later
					BonusSpecialActions.prepared.push(spBonusi.prepared); //those that are autoprepared for referencing it later
					BonusSpecialActions.atwill.push(spBonusi.atwill); //those that are at will for referencing it later
					BonusSpecialActions.oncelr.push(spBonusi.oncelr); //those that are once per long rest for referencing it later
					BonusSpecialActions.oncesr.push(spBonusi.oncesr); //those that are once per long rest for referencing it later
					BonusSpecialActions.other.push(spBonusi.firstCol); //those that are once per long rest for referencing it later
					if (spBonusi.selection) {
						dia.selectBo.push(spBonusi.selection[y - 1]);
					} else {
						dia.selectBo.push(undefined);
					}
				}
			}
		}}
		//fill the rest of the bonus items that are essential
		for (var i = dia.nmbrBo; i <= 14; i++) {
			dia.listBo.push(AllSpellsObject);
			dia.namesBo.push("");
			if (spCast.extraBo) dia.selectBo[i] = spCast.extraBo[i - dia.nmbrBo];
		}
		
		if (!GoAhead) continue; //not a single spellcasting attribute was found, so skip over this entry in the CurrentSpells variable
		
		//now set the ok buttons at the bottom of the dialog
		var ding = dia.description.elements[0].elements[1];
		if (dia.typeSp !== "book") {
			ding.type = "ok_cancel";
			ding.ok_name = "Continue to Next Dialog";
		} else {
			ding.type = "ok_cancel_other";
			ding.ok_name = "Add More to the Spellbook";
		}
		
		thermoM("Opening the " + aCast + " dialog..."); //change the progress dialog text
		
		//now call the dialog and do something with the results if OK was pressed
		if (app.execDialog(dia) !== "ok") {
			SetStringifieds("spells");
			thermoM("stop"); //stop the top progress dialog
			return "stop"; //don't continue with the rest of the function and let the other function know not to continue either
		} else {
			thermoM("Progressing the " + aCast + " dialog..."); //change the progress dialog text
			
			spCast.typeSp = dia.typeSp;
			if (dia.showCa) {
				spCast.selectCa = dia.selectCa;
				spCast.selectCa.sort();
				spCast.offsetCa = dia.offsetCa;
			}
			if (dia.showSp) {
				spCast.selectSp = OrderSpells(dia.selectSp, "single");
				spCast.offsetSp = dia.offsetSp;
			}
			if (dia.showSpRadio) {
				spCast.typeList = dia.selectSpRadio;
			}
			spCast.selectBo = dia.selectBo;
			spCast.offsetBo = dia.offsetBo;
			spCast.special = {
				prepared : [], //auto prepared
				atwill : [], //at will
				oncelr : [], //once per long rest
				oncesr : [], //once per short rest
				other : {}, //other flags
			}
			var boNmr = 0;
			if (spCast.bonus) {for (var bKey in spCast.bonus) {
				var spBonus = spCast.bonus[bKey];
				var loop = isArray(spBonus);
				var loopEnd = loop ? spBonus.length : 1;
				for (var i = 0; i < loopEnd; i++) {
					var spBonusi = loop ? spCast.bonus[bKey][i] : spCast.bonus[bKey];
					spBonusi.selection = [];
					
					var iterate = !spBonusi.times ? 1 : isArray(spBonusi.times) ? spBonusi.times[spCast.level - 1] : spBonusi.times; //if we have to apply this thing multiple times, do so
					for (var y = 1; y <= iterate; y++) {
						if (BonusSpecialActions.prepared[boNmr]) spCast.special.prepared.push(dia.selectBo[boNmr]); //those that are autoprepared for referencing it later
						if (BonusSpecialActions.atwill[boNmr]) spCast.special.atwill.push(dia.selectBo[boNmr]); //those that are autoprepared for referencing it later
						if (BonusSpecialActions.oncelr[boNmr]) spCast.special.oncelr.push(dia.selectBo[boNmr]); //those that are autoprepared for referencing it later
						if (BonusSpecialActions.oncesr[boNmr]) spCast.special.oncesr.push(dia.selectBo[boNmr]); //those that are autoprepared for referencing it later
						if (BonusSpecialActions.other[boNmr]) spCast.special.other[dia.selectBo[boNmr]] = BonusSpecialActions.other[boNmr].substring(0, BonusSpecialActions.other[boNmr].match(/\(.\)/) ? 3 : 2); //those that have a special first column, up to two characters
						spBonusi.selection.push(dia.selectBo[boNmr]); //set the selection(s)
						boNmr += 1; //count the number of bonus things
					}
				}
			}}
			var EvenMoreBo = [];
			if (spCast.offsetBo > 0) {
				for (var i = boNmr; i < 10; i++) {
					if (dia.selectBo[i]) EvenMoreBo.push(dia.selectBo[i]);
				}
			}
			if (EvenMoreBo.length) {
				spCast.extraBo = EvenMoreBo;
			} else {
				delete spCast.extraBo;
			}
		
			thermoM("Opening the " + aCast + " Spellbook dialog..."); //change the progress dialog text
			
			//if it was selected to go set more spells in the spellbook, open another dialog now
			if (dia.SpBook) {
				var diaSB = SpellBookSelect_Dialog;
				diaSB.listSp = dia.listSp;
				diaSB.fullname = dia.fullname;
				diaSB.selectSp = spCast.selectSpSB ? spCast.selectSpSB : [];
				
				if (app.execDialog(diaSB) !== "ok") {
					SetStringifieds("spells");
					thermoM("stop"); //stop the top progress dialog
					return "stop"; //don't continue with the rest of the function and let the other function know not to continue either
				} else {
					var totalSelectSp = OrderSpells(spCast.selectSp.concat(diaSB.selectSp), "single");
					spCast.selectSp = totalSelectSp.slice(0, 18); //the first 18 of the array
					if (totalSelectSp.length > 18) {
						spCast.selectSpSB = totalSelectSp.slice(18); //the rest of the array after the 22nd
					} else {
						delete spCast.selectSpSB;
					}
				}
			}
			
			//now ask for the spells to prepare, if so selected in the radio buttons
			if (spCast.typeList && spCast.typeList === 3) {
				//make a new object for this
				var diaPrep = SpellsPrepared_Dialog;
				diaPrep.fullname = dia.fullname;
				
				//determine how many spells can be prepared
				diaPrep.nmbrPrep = scLevel;
				diaPrep.ability = spCast.ability;
				
				//make the array of spells that the preparations can come from
				if (spCast.selectSp) {
					var listPrepRef = spCast.selectSp;
					if (spCast.selectSpSB) listPrepRef = listPrepRef.concat(spCast.selectSpSB); //add the spells from the extra spellbook dialog
				} else {
					var spListLevel = spCast.list.level; //put the level of the list here for safe keeping
					spCast.list.level = [1, highestLevel]; //set the list level to 1 to max level able to cast
					var listPrepRef = CreateSpellList(spCast.list, true); //create an array of all the spells that can be prepared at this level
					if (spListLevel) { //put that list level back in the right variable
						spCast.list.level = spListLevel;
					} else {
						delete spCast.list.level;
					}
				}
				diaPrep.listSp = CreateSpellObject(listPrepRef); //create the spells popup object
				
				//set the previously selected spells and the offset, if any was defined
				diaPrep.selectSp = spCast.selectPrep ? spCast.selectPrep : [];
				diaPrep.offsetSp = spCast.blueTxt && spCast.blueTxt.prep ? spCast.blueTxt.prep : 0;
				
				//call the dialog and do something with the results
				if (app.execDialog(diaPrep) !== "ok") {
					SetStringifieds("spells");
					thermoM("stop"); //stop the top progress dialog
					return "stop"; //don't continue with the rest of the function and let the other function know not to continue either
				} else {
					//save the new variables
					spCast.selectPrep = OrderSpells(diaPrep.selectSp, "single");
					if (spCast.blueTxt) {
						spCast.blueTxt.prep = diaPrep.offsetSp;
					} else {
						spCast.blueTxt = {prep : diaPrep.offsetSp};
					}
				}
			}
		}
		thermoM("stop"); //stop the top progress dialog
	}
	
	if (classesArray.length > 0) {		
		//first see how the lists are doing
		if (!CurrentCasters.excl && !CurrentCasters.incl) { //no list exists yet, so lets make one
			CurrentCasters.excl = [];
			CurrentCasters.incl = classesArray; //all are included in the order they were found
		} else { //there are lists, but we first need to check if all entries are accounted for
			for (var i = 0; i < CurrentCasters.excl.length; i++) {
				if (!CurrentSpells[CurrentCasters.excl[i]]) {
					CurrentCasters.excl.splice(i, 1);
					i = i - 1;
				}
			}
			for (var i = 0; i < CurrentCasters.incl.length; i++) {
				if (!CurrentSpells[CurrentCasters.incl[i]]) {
					CurrentCasters.incl.splice(i, 1);
					i = i - 1;
				}
			}
			
			//now see if all of the ones we know are accounted for; if not found, add it to the included array
			for (var i = 0; i < classesArray.length; i++) {
				if (CurrentCasters.incl.indexOf(classesArray[i]) === -1 && CurrentCasters.excl.indexOf(classesArray[i]) === -1) CurrentCasters.incl.push(classesArray[i]);
			}
		}
		//now see if anything has been defined for adding a glossary or not
		if (CurrentCasters.glossary === undefined) {
			CurrentCasters.glossary = false;
		}
		
		//convert the incl and excl CurrentSpells arrays to their named counterparts
		var exclNames = [];
		var inclNames = [];
		for (var i = 0; i < CurrentCasters.excl.length; i++) {
			exclNames.push(CurrentSpells[CurrentCasters.excl[i]].name);
		}
		for (var i = 0; i < CurrentCasters.incl.length; i++) {
			inclNames.push(CurrentSpells[CurrentCasters.incl[i]].name);
		}
		
		//now add them to the dialog and let the user make a decision
		SpellSheetOrder_Dialog.bExcL = exclNames;
		SpellSheetOrder_Dialog.bIncL = inclNames;
		SpellSheetOrder_Dialog.glossary = CurrentCasters.glossary;
		if (app.execDialog(SpellSheetOrder_Dialog) !== "ok") {
			SetStringifieds("spells");
			return "stop"; //don't continue with the rest of the function and let the other function know not to continue either
		} else {
			var exclList = SpellSheetOrder_Dialog.bExcL;
			var inclList = SpellSheetOrder_Dialog.bIncL;
			
			//now convert the IncL and ExcL SpellSheetOrder_Dialog array to their keyed counterparts
			for (var aCast in CurrentSpells) {
				var CSname = CurrentSpells[aCast].name;
				var inExcl = exclList.indexOf(CSname);
				var inIncl = inclList.indexOf(CSname);
				if (inExcl !== -1) {
					exclList[inExcl] = aCast;
				} else if (inIncl !== -1) {
					inclList[inIncl] = aCast;
				}
			}
			
			//and put the two arrays back into the document level variable CurrentSpells
			CurrentCasters.excl = exclList;
			CurrentCasters.incl = inclList;
			CurrentCasters.glossary = SpellSheetOrder_Dialog.glossary;
		}
	}
	
	//now save the updated CurrentSpells and CurrentCasters variables to the field
	SetStringifieds("spells");
	
	//now return true if dialogs were presented, and false if they weren't
	return classesArray.length > 0;
}

//generate the spell sheet for all the different classes
function GenerateSpellSheet(GoOn) {
	//first we do need to remember any BlueText values, so we will be keeping those safe somewhere
	var SSarray = What("Template.extras.SSfront").split(",");
	SSarray = SSarray.concat(What("Template.extras.SSmore").split(","));
	for (var A = 0; A < SSarray.length; A++) {
		if (SSarray[A] === "") continue;
		for (var i = 0; i < 4; i++) {
			var aCast = What(SSarray[A] + "spellshead.class." + i);
			if (aCast && CurrentSpells[aCast]) {
				CurrentSpells[aCast].blueTxt = {
					prep : What(SSarray[A] + "BlueText.spellshead.prepare." + i),
					atk : What(SSarray[A] + "BlueText.spellshead.attack." + i),
					dc : What(SSarray[A] + "BlueText.spellshead.dc." + i),
				};
			}
		}
	}
	
	//first ask the user for input on what to do with all the spellcasting classes
	if (!GoOn) var GoOn = AskUserSpellSheet();
	
	if (!GoOn) {
		var toAsk = {
			cMsg : "It seems as though your character has no spellcasting abilities. Make sure that there is something to make a Spell Sheet for.\n\nIt could be that they are not yet implemented (racial spellcasting does not work yet) or that they have been overlooked. If you think something is going wrong, please contact MorePurpleMoreBetter (flapkan@gmail.com).\n\nWould you instead like to remove any current Spell Sheet(s) and add an empty one that can be filled manually? You can then add/remove more pages using the \"Spells\" and \"Layout\" buttons in the \"JavaScript Window\" or in the bookmarks.\n\nRemoving the Spell Sheets cannot be undone!",
			nIcon : 1,
			cTitle : "No spellcasting found",
			nType : 2, //Yes-No
		}
		if (app.alert(toAsk) === 4) {
			RemoveSpellSheets();
			DoTemplate("SSfront", "Add");
		}
		return; // do not continue with this function for it is pointless
	} else if (GoOn === "stop" ) {
		return; // do not continue with this function if one of the dialogs was cancelled
	}
	
	thermoM("start"); //start a progress dialog
	thermoM("Generating the Spell Sheet(s), Acrobat will be unresponsive for a long time..."); //change the progress dialog text
	
	thermoM(1/(CurrentCasters.incl.length + 3)); //increment the progress dialog's progress
	
	//then we remove all the existing sheets (if any)
	RemoveSpellSheets();
	
	thermoM(2/(CurrentCasters.incl.length + 3)); //increment the progress dialog's progress
	
	var lineMax = FieldNumbers.spells[0]; //set the maximum we can go on this sheet
	var lineCurrent = 0; //set the current line on the Spell Sheet
	var headerCurrent = 0; //set the current header on the Spell Sheet
	var dividerCurrent = 0; //set the current divider on the Spell Sheet
	var prefixCurrent = ""; //set the current prefix on the Spell Sheet
	var SSfront = false; //set the state of on which Spell Sheet we are working
	
	//define a function for adding a new page
	var SpellPages = 1;
	var AddPage = function() {
		//add one more page and set the corresponding prefix to the variable
		prefixCurrent = DoTemplate("SSmore", "Add");
		SpellPages += 1;
		//now reset all the incremental variables to 0;
		lineMax = FieldNumbers.spells[1];
		lineCurrent = 0;
		headerCurrent = 0;
		dividerCurrent = 0;
		SSfront = false;
	}
	
	//now use the newly acquired CurrentSpells information to make a Spell Sheet addition for every entry in the included list
	IsNotSpellSheetGenerating = false;
	var isFirst = 0;
	for (var i = 0; i < CurrentCasters.incl.length; i++) {
		
		var spCast = CurrentSpells[CurrentCasters.incl[i]];
		var isPsionics = spCast.factor && spCast.factor[1].match(/psionic/i) ? "psionic" : ""; //see if this is a psionic caster
		
		//get a list of all the spells to put on the Spell Sheet
		var fullSpellList = [];
		if (spCast.selectCa) fullSpellList = fullSpellList.concat(spCast.selectCa); //add the cantrips
		if (spCast.typeList === 3 && spCast.selectPrep) { //if it has been selected to only do the prepared spells, only add those
			fullSpellList = fullSpellList.concat(spCast.selectPrep);
		} else if (spCast.selectSp) { //otherwise add all the selected spells, if any
			fullSpellList = fullSpellList.concat(spCast.selectSp); //add the spells
			if (spCast.selectSpSB) fullSpellList = fullSpellList.concat(spCast.selectSpSB); //add the spells from the extra spellbook dialog
		}
		if (spCast.selectBo) fullSpellList = fullSpellList.concat(spCast.selectBo); //add the bonus spells
		
		var alwaysPrepared = spCast.special ? spCast.special.prepared : []; //make an array of spells that are considered always prepared, starting with the bonus spells that have that flag
		var atwillArray = spCast.special ? spCast.special.atwill : [];
		var oncelrArray = spCast.special ? spCast.special.oncelr : [];
		var oncesrArray = spCast.special ? spCast.special.oncesr : [];
		var otherObject = spCast.special ? spCast.special.other : {};
		if (spCast.typeSp === "list") {
			if (spCast.extra) {
				fullSpellList = fullSpellList.concat(spCast.extra); //add the extra spells
				alwaysPrepared = alwaysPrepared.concat(spCast.extra); //and add them to the always prepared array
			}
			
			//now add the general list, if not choosen to only do the prepared spells
			if (spCast.typeList !== 3) {
				var spListLevel = spCast.list.level; //put the level of the list here for safe keeping
				spCast.list.level = [1, spListLevel ? spListLevel[1] : 9]; //set the list level to 1 to max set before
				fullSpellList = fullSpellList.concat(CreateSpellList(spCast.list)); //add the full spell list of the class, excluding cantrips
				if (spListLevel) { //put that level list back in the right variable
					spCast.list.level = spListLevel;
				} else {
					delete spCast.list.level;
				}
			}
		} else if (spCast.extra && spCast.extra[100] === "AddToKnown" && spCast.factor && spCast.factor[0]) { // add spells to the full list for classes with spells known/spellbook, if set to add to the known. Only add the levels that can be used
			var CasterLevel = Math.ceil(spCast.level / spCast.factor[0]);
			var maxSpell = spCast.spellsTable ? spCast.spellsTable[CasterLevel].indexOf(0) : tDoc[spCast.factor[1] + "SpellTable"][CasterLevel].indexOf(0);
			maxSpell = Number(maxSpell === -1 ? 9 : maxSpell);
			for (var eS = 0; eS < spCast.extra.length; eS++) {
				var eSpell = spCast.extra[eS];
				if (!eSpell) break;
				if (SpellsList[eSpell] && SpellsList[eSpell].level <= maxSpell) fullSpellList.push(eSpell);
			}
		}
		
		//now see if we have any spells to add to the spell sheet for this class. If not, skip this class
		var testArray = removeEmptyValues(fullSpellList);
		if (testArray.length === 0) {
			isFirst = i === 0 ? 1 : 0;
			continue;
		}
		
		var MeKn = spCast.firstCol ? "##" + spCast.firstCol : isPsionics ? "##pp" : (spCast.known && spCast.known.prepared && spCast.typeList !== 3 ? "##me" : (spCast.typeSp === "race" ? "##kn" : "##")); //add "Me" or "Kn" to the name or not?
		
		var orderedSpellList = OrderSpells(fullSpellList, "multi"); //get an array of 10 arrays, one for each spell level
		
		//see if we need to stop short of doing all the spells
		var maxLvl = 9;
		if (spCast.level && spCast.typeList && spCast.typeList !== 2 && spCast.factor && spCast.factor[0]) {
			var CasterLevel = Math.ceil(spCast.level / spCast.factor[0]);
			var maxSpell = spCast.spellsTable ? spCast.spellsTable[CasterLevel].indexOf(0) : tDoc[spCast.factor[1] + "SpellTable"][CasterLevel].indexOf(0);
			maxLvl = Number(maxSpell === -1 ? 9 : maxSpell);
		}
		
		if (i === isFirst) {
			SSfront = true;
			prefixCurrent = DoTemplate("SSfront", "Add"); //for the first entry we need to make the template
		}
		
		//now sort each of those new arrays and put them on the sheet
		var start = true;
		for (var lvl = 0; lvl <= maxLvl; lvl++) {
			var spArray = orderedSpellList[lvl];
			if (spArray.length > 0) {
				//add spell dependencies to fill out the array
				spArray = addSpellDependencies(spArray);
				//first test if there is enough space left on the current page to add what we need to
				//assume that we need to add at least 10 of the spells, the total of this level of spells, whichever is less
				// so 3 (divider + title line) + 4 (header, if applicable) + lowest of [10, arrayLength]
				var needSpace = 3 + (start ? 4 : 0) + Math.min(10, spArray.length);
				if (needSpace >= (lineMax - lineCurrent + 1)) AddPage();
				
				//the first spells to add needs a header in front of it
				if (start) {
					if (lineCurrent === 0 && SSfront) {
						SetSpellSheetElement(prefixCurrent + "spells.remember.0", "header", 0, CurrentCasters.incl[i], false, isPsionics);
					} else {
						Value(prefixCurrent + "spells.remember." + lineCurrent, isPsionics + "setheader##" + CurrentCasters.incl[i] + "##" + headerCurrent);
						lineCurrent += 4;
					}
					headerCurrent += 1;
					start = false;
				}
				
				//then add the divider
				if (lineCurrent === 0 && SSfront) {
					SetSpellSheetElement(prefixCurrent + "spells.remember.0", "divider", 0, lvl, false, isPsionics);
				} else {
					Value(prefixCurrent + "spells.remember." + lineCurrent, isPsionics + "setdivider##" + lvl + "##" + dividerCurrent);
					lineCurrent += 2;
				}
				dividerCurrent += 1;
				
				//then add the title line
				Value(prefixCurrent + "spells.remember." + lineCurrent, isPsionics + "setcaptions" + MeKn);
				lineCurrent += 1;
				
				for (var y = 0; y < spArray.length; y++) {
					aSpell = spArray[y];
					//check if not at the end of the page and, if so, create a new page
					if (lineCurrent > lineMax) AddPage();
					var toCheck = "";
					if (atwillArray.indexOf(aSpell) !== -1) {
						toCheck = "##atwill";
					} else if (oncelrArray.indexOf(aSpell) !== -1) {
						toCheck = "##oncelr";
					} else if (oncesrArray.indexOf(aSpell) !== -1) {
						toCheck = "##oncesr";
					} else if (alwaysPrepared.indexOf(aSpell) !== -1 && spCast.typeList !== 3) {
						toCheck = "##markedbox";
					} else if (otherObject[aSpell]) {
						toCheck = "##" + otherObject[aSpell];
					} else if (SpellsList[aSpell] && SpellsList[aSpell].firstCol === undefined && (isPsionics || (spCast.known && spCast.known.prepared && spCast.typeList !== 3))) {
						if (SpellsList[aSpell].level === 0) {
							toCheck = "##atwill";
						} else {
							toCheck = "##checkbox";
						}
					}
					Value(prefixCurrent + "spells.remember." + lineCurrent, aSpell + toCheck);
					lineCurrent += 1;
				}
			}
		}
		
		thermoM((2 + 1)/(CurrentCasters.incl.length + 3)); //increment the progress dialog's progress
	}
		
	//after the end of the last run, add a glossary, if so selected
	if (CurrentCasters.glossary) {
		if ((lineCurrent + 11) > lineMax) AddPage();
		//then add the glossary
		Value(prefixCurrent + "spells.remember." + lineCurrent, "setglossary");
	}
	
	IsNotSpellSheetGenerating = true;
	
	if (What("Template.extras.SSfront").split(",").length > 1) tDoc.getField(What("Template.extras.SSfront").split(",")[1] + "Spells Button").setFocus(); // set the focus to the top of the Spell Sheet
	thermoM(); //stop all the progress dialogs
}

//remove all visible spell sheets and reset the templates
function RemoveSpellSheets() {
	//delete all of the pages
	var SSarray = What("Template.extras.SSfront").split(",");
	if (SSarray.length > 1) {
		SSarray = SSarray.concat(What("Template.extras.SSmore").split(","));
		for (var A = 1; A < SSarray.length; A++) {
			if (A === 1 && tDoc.info.SpellsOnly) {
				continue;
			} else if (SSarray[A]) {
				thePage = tDoc.getField(SSarray[A] + BookMarkList["SSmore"]).page;
				tDoc.deletePages(thePage);
			}
		}
		//reset the template remember fields
		if (!tDoc.info.SpellsOnly) {
			tDoc.resetForm(["Template.extras.SSmore", "Template.extras.SSfront"]);
			//grey out the appropriate bookmarks
			amendBookmarks(BookMarkList["SSfront_Bookmarks"], false);
		} else {
			tDoc.resetForm(["Template.extras.SSmore", "P0.SSfront"]);
			HideSpellSheetElement("P0.SSfront.spellshead.Text.header.0");
			for (var x = 1; x <= 9; x++) {
				var spellsH = "P0.SSfront.spellshead.Text.header." + x;
				var spellsD = "P0.SSfront.spellsdiv.Text." + x;
				if (x <= 3 && tDoc.getField(spellsH).display === display.visible) HideSpellSheetElement(spellsH);
				if (tDoc.getField(spellsD).display === display.visible) HideSpellSheetElement(spellsD);
			}
		}
	}
}

//make menu for the spell options button
//after that, do something with the menu and its results
function MakeSpellMenu_SpellOptions() {
	tDoc.delay = true;
	tDoc.calculate = false;
	
	//make a list of all the spell sources
	var SpellSourcesArray = [];
	var SpellSourcesCheck = [];
	for (var aSpell in SpellsList) {
		var aSpellSource = SpellsList[aSpell].source && SpellsList[aSpell].source[0] ? SpellsList[aSpell].source[0] : "HB";
		if (SpellSourcesCheck.indexOf(aSpellSource) === -1) {
			SpellSourcesCheck.push(aSpellSource);
			SpellSourcesArray.push([SourceList[aSpellSource].name, aSpellSource]);
		}
	}
	
	//use the global variable of all spellcasting classes
	var CasterClasses = [];
	for (var i = 2; i < AllCasterClasses.length; i++) {
		var sClass = AllCasterClasses[i];
		if (sClass === "any") continue;
		CasterClasses.push([sClass === "-" ? sClass : "with all " + sClass.capitalize() + " spells", sClass]);
	}
	
	//see if their are any number of spellcasting things
	var anyCasters = false;
	for (var key in CurrentSpells) {
		anyCasters = true;
		break;
	}
	
	//see if the Spell Sheets are visible
	var SSvisible = What("Template.extras.SSfront").split(",").length > 1;
	var SSmultiple = What("Template.extras.SSmore").split(",").length > 1;
	
	var menuLVL2 = function (menu, name, array) {
		var temp = [];
		temp.cName = name[0];
		temp.oSubMenu = [];
		var isMarked = false;
		for (var i = 0; i < array.length; i++) {
			switch (name[1]) {
			 case "slots" :
				isMarked = array[i][1] === RememberSlots;
				break;
			}
			temp.oSubMenu.push({
				cName : array[i][0],
				cReturn : name[1] + "#" + array[i][1] + "#" + isMarked,
				bMarked : isMarked,
			})
		}
		menu.push(temp);
	};
	
	var spellsMenu = [];
	//an option to generate a (new) spell sheet automatically
	if (!tDoc.info.SpellsOnly) {
		spellsMenu.push({
			cName : (SSvisible ? "(Re)g" : "G") + "enerate a Spell Sheet" + (anyCasters ? "" : " (no spellcasting detected)"),
			cReturn : "generate",
			bEnabled : anyCasters,
		});
	}
	
	//an option to generate a 'complete' spell sheet
	menuLVL2(spellsMenu, [SSvisible ? "Replace Spell Sheets with 'Complete' Spell Sheet" : "Make a 'Complete' Spell Sheet", "complete"], CasterClasses);
	
	//an option to make an empty spell sheet
	if (!tDoc.info.SpellsOnly) {
		spellsMenu.push({
			cName : SSvisible ? "Replace Spell Sheets with empty one (to fill manually)" : "Add an empty Spell Sheet (to fill manually)",
			oSubMenu : [{
				cName : "Without text lines",
				cReturn : "makeempty",
			}, {
				cName : "With text lines",
				cReturn : "makeempty#lines",
			}, {
				cName : "With text lines and checkboxes",
				cReturn : "addempty#lines#boxes",
			}],
		});
	}
	
	//an option to add an extra empty page
	if (SSvisible) {
		spellsMenu.push({
			cName : "Add an empty Spell Sheet page (to fill manually)",
			oSubMenu : [{
				cName : "Without text lines",
				cReturn : "addempty",
			}, {
				cName : "With text lines",
				cReturn : "addempty#lines",
			}, {
				cName : "With text lines and checkboxes",
				cReturn : "addempty#lines#boxes",
			}],
		});
	}
	
	//options to delete the current pages
	spellsMenu = spellsMenu.concat([{
		cName : "-"
	}, {
		cName : "Delete all the Spell Sheet(s) (can't be undone)",
		cReturn : "delete",
		bEnabled : SSvisible,
	}, {
		cName : "Delete the last page of the Spell Sheets (can't be undone)",
		cReturn : SSmultiple ? "deleteone" : "delete",
		bEnabled : !tDoc.info.SpellsOnly ? SSvisible : SSmultiple,
	}, {
		cName : "-"
	}, {
		cName : "Spell sources to use (set before generating)",
		cReturn : "source",
	}, {
		cName : "-"
	}]);
	
	//get the current state of where to show the Spell Slots
	var RememberSlots = What("SpellSlotsRemember");
	
	if (!typePF && !tDoc.info.SpellsOnly) {
		menuLVL2(spellsMenu, ["Where to show Spell Slots (Spell Points)", "slots"], [["On Spell Sheet", "[false,true]"], ["On first page (in Limited Features)", "[true,false]"], ["On both Spell Sheet and first page", "[true,true]"], ["-", "-"], ["Use Spell Points instead of Spell Slots", "[false,false]"]]);
	} else if (tDoc.info.SpellsOnly) {
		var slotsVisible = tDoc.getField("P0.SSfront.SpellSlots.CheckboxesSet.lvl1").display === display.noPrint;
		var spellPointsVis = RememberSlots === "[false,false]";
		
		//options to show/hide spell slot modifier fields
		spellsMenu = spellsMenu.concat([{
			cName : "Change the number of Spell Slot checkboxes",
			cReturn : "toggleslots",
			bMarked : slotsVisible,
			bEnabled : !spellPointsVis
		}, {
			cName : "Use Spell Points instead of Spell Slots",
			cReturn : typePF ? "spellpoints" : "slots#" + (spellPointsVis ? "[false,true]" : "[false,false]") + "#false",
			bMarked : spellPointsVis
		}]);
	} else if (typePF) {
		//options to toggle the use of spell points
		spellsMenu = spellsMenu.concat([{
			cName : "Use Spell Points instead of Spell Slots",
			cReturn : "spellpoints",
			bMarked : RememberSlots === "[false,false]"
		}]);
	}
	
	Menus.spells = spellsMenu;
	
	//now call the menu
	var MenuSelection = getMenu("spells");
	
	//and do something with this menus results
	if (MenuSelection !== undefined) {
		switch (MenuSelection[0]) {
		 case "generate" :
			GenerateSpellSheet();
			break;
		 case "makeempty" :
			if (SSvisible) {
				var asking = {
					cMsg : "Unfortunately it is not possible to hide the Spell Sheet. They can only be deleted.\n\nDo you want to remove all the Spell Sheets except the first one and remove the content of the first one?\nYou can then manually fill out the Spell Sheet and add/remove more pages using the \"Layout\" and \"Spells\" buttons in the \"JavaScript Window\" or in the bookmarks.\n\nRemoving the Spell Sheets cannot be undone!",
					cTitle : "Delete all the Spell Sheets",
					nIcon : 2, //question
					nType : 2, //Yes-No
				}
				var goThrough = app.alert(asking);
			} else {
				var goThrough = 4;
			}
			
			if (goThrough === 4) {
				if (SSvisible) RemoveSpellSheets();
				var thePrefix = DoTemplate("SSfront", "Add");
				if (MenuSelection[1] === "lines") {
					AddSpellSheetTextLines(thePrefix, MenuSelection[2] === "boxes", FieldNumbers.spells[0]);
				}
			}
			break;
		 case "addempty" :
			var thePrefix = DoTemplate("SSmore", "Add");
			if (MenuSelection[1] === "lines") {
				AddSpellSheetTextLines(thePrefix, MenuSelection[2] === "boxes");
			}
			break;
		 case "delete" :
			RemoveSpellSheets();
			break;
		 case "deleteone" :
			DoTemplate("SSmore", "Remove");
			break;
		 case "source" :
			resourceDecisionDialog();
			break;
		 case "slots" :
			if (MenuSelection[2] !== "true") { //it wasn't marked, so something is about the change
				Value("SpellSlotsRemember", MenuSelection[1]);
				SetSpellSlotsVisibility();
				if (MenuSelection[1] === "[false,false]") {
					SpellPointsLimFea("Add");
					Show("Image.SpellPoints");
					Show("SpellSlots.Checkboxes.SpellPoints");
					var SSfrontA = What("Template.extras.SSfront").split(",")[1];
					if (SSvisible) {
						Show(SSfrontA + "Image.SpellPoints");
						Show(SSfrontA + "SpellSlots.Checkboxes.SpellPoints");
					}
					ShowSpellPointInfo();
				} else if (RememberSlots === "[false,false]") {
					SpellPointsLimFea("Remove");
					Hide("Image.SpellPoints");
					Hide("SpellSlots.Checkboxes.SpellPoints");
					var SSfrontA = What("Template.extras.SSfront").split(",")[1];
					if (SSvisible) {
						Hide(SSfrontA + "Image.SpellPoints");
						Hide(SSfrontA + "SpellSlots.Checkboxes.SpellPoints");
					}
				}
			}
			break;
		 case "complete" :
			GenerateCompleteSpellSheet(MenuSelection[1]);
			break;
		 case "toggleslots" :
			var hiddenNoPrint = slotsVisible ? "Hide" : "DontPrint";
			for (var ss = 1; ss <= 9; ss++) {
				tDoc[hiddenNoPrint]("P0.SSfront.SpellSlots.CheckboxesSet.lvl" + ss);
			}
			break;
		 case "spellpoints" :
			ToggleSpellPoints();
			break;
		}
	}
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

//a function that takes an array of spells and orders it by level (and alphabet)
//outputFormat defines whether to return an Array of Arrays ("multi"), or just one array "single";
function OrderSpells(inputArray, outputFormat) {
	var orderedSpellList = [[], [], [], [], [], [], [], [], [], []]; //array of 10 arrays, one for each spell level
	
	//put these spells into their right level-array in orderedSpellList
	for (var S = 0; S < inputArray.length; S++) {
		var nxtSpell = inputArray[S];
		if (SpellsList[nxtSpell] && orderedSpellList[SpellsList[nxtSpell].level].indexOf(nxtSpell) === -1) {
			orderedSpellList[SpellsList[nxtSpell].level].push(nxtSpell);
		};
	};
	
	//now make sure all of them are sorted
	for (var i = 0; i < 10; i++) orderedSpellList[i].sort();
	
	var returnArray = [];
	switch (outputFormat) {
	 case "multi" :
		returnArray = orderedSpellList;
		break;
	 case "single" :
		for (var i = 0; i < 10; i++) returnArray = returnArray.concat(orderedSpellList[i]);
		break;
	};
	
	return returnArray;
}

//return the value of a logsheet's number (field calculation)
function CalcSpellsheetNumber() {
	var prefix = event.target.name.substring(0, event.target.name.indexOf("SpellSheet"));
	var SSmoreA = What("Template.extras.SSmore").split(",");
	SSmoreA[0] = What("Template.extras.SSfront").split(",")[1];
	return MakeDocName() + (tDoc.info.SpellsOnly ? "; page " : "; Spell Sheet ") + (SSmoreA.indexOf(prefix) + 1) + "/" + SSmoreA.length;
}

//make a menu of all the spells, sorted by caster
function ParseSpellMenu() {
	//define a function for creating the full set of spells-by-level menu for a class
	var createMenu = function(menu, className, fullArray) {
		var nameArray = [
			"All spells",
			"Cantrips",
			"1st-level",
			"2nd-level",
			"3rd-level",
			"4th-level",
			"5th-level",
			"6th-level",
			"7th-level",
			"8th-level",
			"9th-level",
		];
		var classTemp = new Object();
		classTemp.cName = className;
		classTemp.oSubMenu = [];
		for (var y = 0; y < fullArray.length; y++) {
			var spellsArray = fullArray[y];
			if (spellsArray.length > 0) {
				var spellsTemp = new Object();
				spellsTemp.cName = nameArray[y];
				spellsTemp.oSubMenu = [];
				for (var i = 0; i < spellsArray.length; i++) {
					spellsTemp.oSubMenu.push({
						cName : SpellsList[spellsArray[i]].name,
						cReturn : "spell" + "#" + spellsArray[i] + "#",
					})
				}
				classTemp.oSubMenu.push(spellsTemp);
			}
		}
		menu.oSubMenu.push(classTemp);
	}
	
	var amendMenu = function(theMenu, nameChange, extraReturn) {
		theMenu.cName = nameChange;
		for (var a = 0; a < theMenu.oSubMenu.length; a++) {
			if (theMenu.oSubMenu[a].cName === "-") continue;
			for (var b = 0; b < theMenu.oSubMenu[a].oSubMenu.length; b++) {
				if (theMenu.oSubMenu[a].oSubMenu[b].cName === "-") continue;
				for (var c = 0; c < theMenu.oSubMenu[a].oSubMenu[b].oSubMenu.length; c++) {
					if (theMenu.oSubMenu[a].oSubMenu[b].oSubMenu[c].cName === "-") continue;
					theMenu.oSubMenu[a].oSubMenu[b].oSubMenu[c].cReturn += extraReturn;
				}
			}
		}
	}
	
	var allSpellCasters = [
		"any",
		"-",
		"bard",
		"cleric",
		"druid",
		"paladin",
		"ranger",
		"sorcerer",
		"warlock",
		"wizard",
		"-"
	];
	
	var moreSpellCasters = [];
	for (var aClass in ClassList) {
		if (aClass === "rangerua") continue;
		if (ClassList[aClass].spellcastingFactor) {
			if (allSpellCasters.indexOf(aClass) === -1 && moreSpellCasters.indexOf(aClass) === -1 && !testSource(aClass, ClassList[aClass], "classExcl")) moreSpellCasters.push(aClass);
		} else {
			var subClasses = ClassList[aClass].subclasses[1];
			for (var SC = 0; SC < subClasses.length; SC++) {
				var aSubClass = subClasses[SC];
				if (ClassSubList[aSubClass].spellcastingFactor && allSpellCasters.indexOf(aSubClass) === -1 && moreSpellCasters.indexOf(aSubClass) === -1 && !testSource(aSubClass, ClassSubList[aSubClass], "classExcl")) moreSpellCasters.push(aSubClass);
			}
		}
	};
	
	moreSpellCasters.sort();
	allSpellCasters = allSpellCasters.concat(moreSpellCasters);
	
	//now see if this newly created list matches the known caster classes
	if (AllCasterClasses && AllCasterClasses.toSource() === allSpellCasters.toSource()) {
		return AddSpellsMenu;
	} else {
		AllCasterClasses = allSpellCasters;
	};
	
	var AllSpellsMenu = {cName : "without first column", oSubMenu : []};
	for (var s = 0; s < allSpellCasters.length; s++) {
		var aCast = allSpellCasters[s];
		var aObj = ClassList[aCast] ? ClassList[aCast] : (ClassSubList[aCast] ? ClassSubList[aCast] : false);
		if (aCast === "-") {
			AllSpellsMenu.oSubMenu.push({cName : "-"});
			continue;
		}
		var aCastClass = aObj && aObj.spellcastingList ? aObj.spellcastingList : {class : aCast};
		var aCastName = aCast === "any" ? "All spells" : aCast.capitalize() + " spells";
		
		//get a list of all the spells in the class' spell list and sort it
		var allSpells = CreateSpellList(aCastClass, false);
		allSpells.sort();
		
		//now make an array with one array for each spell level
		var spellsByLvl = OrderSpells(allSpells, "multi");
		//and add the complete list to as the first of the by level array
		spellsByLvl.unshift(allSpells);
		
		//now create amenu for this class and add it to the submenu array of AllSpellsMenu
		createMenu(AllSpellsMenu, aCastName, spellsByLvl);
	};
	
	//start an array of the different menus
	var spellsMenuArray = [AllSpellsMenu];
	
	//now to do something that makes it possible to copy this object multiple times
	var menuString = AllSpellsMenu.toSource();
	
	var menuExtraTypes = [
		["with a Checkbox", "checkbox"],
		["with an 'Always Prepared' Checkbox", "markedbox"],
		["with 'At Will'", "atwill"],
		["with '1\u00D7 Long Rest'", "oncelr"],
		["with '1\u00D7 Short Rest'", "oncesr"],
		["Ask me for the first column", "askuserinput"],
	]
	//add a menu with a changed name 
	for (var e = 0; e < menuExtraTypes.length; e++) {
		var aMenu = eval(menuString);
		amendMenu(aMenu, menuExtraTypes[e][0], menuExtraTypes[e][1]);
		spellsMenuArray.push(aMenu);
	}
	
	//return the newly formed array
	return spellsMenuArray;
}

//find the next eligable header or divider
function findNextHeaderDivider(prefix, type) {
	var searchFld = prefix + (type === "header" ? "spellshead.Text.header." : "spellsdiv.Text.");
	var searchMax = type === "header" ? 3 : 9;
	var theReturn = false;
	for (var i = 0; i <= searchMax; i++) {
		if (tDoc.getField(searchFld + i).display === display.hidden) {
			theReturn = i;
			break;
		}
	}
	return theReturn;
}

//make a menu for each spell line and do something with the results
function MakeSpellLineMenu_SpellLineOptions() {
	tDoc.delay = true;
	tDoc.calculate = false;
	
	var SSmaxLine = function(inputPrefix) {
		return inputPrefix.indexOf(".SSfront.") !== -1 ? FieldNumbers.spells[0] : FieldNumbers.spells[1];
	}
	
	var base = event.target.name;
	var prefix = base.substring(0, base.indexOf("spells."));
	var lineNmbr = parseFloat(base.slice(-2)[0] === "." ? base.slice(-1) : base.slice(-2));
	var SSmoreA = What("Template.extras.SSmore").split(",");
	var thisSheet = SSmoreA.indexOf(prefix);
	var maxLine = SSmaxLine(prefix);
	var RemLine = base.replace("checkbox", "remember");
	var RemLineUp = lineNmbr === 0 && prefix.indexOf(".SSfront.") !== -1 ? false : (lineNmbr === 0 ? SSmoreA[thisSheet - 1] + "spells.remember." + SSmaxLine(SSmoreA[thisSheet - 1]) : RemLine.replace("." + lineNmbr, "." + (lineNmbr - 1)));
	var RemLineDown = lineNmbr === maxLine && thisSheet === (SSmoreA.length - 1) ? false : (lineNmbr === maxLine ? SSmoreA[thisSheet + 1] + "spells.remember." + 0 : RemLine.replace("." + lineNmbr, "." + (lineNmbr + 1)));
	var suffixHeader = findNextHeaderDivider(prefix, "header");
	var suffixDivider = findNextHeaderDivider(prefix, "divider");
	
	var menuLVL1 = function (menu, array) {
		for (i = 0; i < array.length; i++) {
			var isEnabled = true;
			var extraName = "";
			switch (array[i][1]) {
			 case "move up" :
				var toSearch = RemLineUp ? What(RemLineUp).toLowerCase() : "";
				isEnabled = RemLineUp && toSearch.indexOf("hidethisline") === -1;
				break;
			 case "move down" :
				var toSearch = RemLineDown ? What(RemLineDown).toLowerCase() : "";
				isEnabled = RemLineDown && toSearch.indexOf("hidethisline") === -1 && toSearch.indexOf("setdivider") === -1 && toSearch.indexOf("setheader") === -1;
				break;
			 case "setglossary" :
				var isDisplayed = tDoc.getField(prefix + "spellsgloss.Image").display === display.hidden;
				var isDistance = (lineNmbr + 11) <= maxLine;
				isEnabled = isDisplayed && isDistance;
				extraName = isEnabled ? " [takes up 12 rows]" : (isDistance ? " [max 1 on a page]" : " [too close to bottom of page]");
				break;
			}
			menu.push({
				cName : array[i][0] + extraName,
				cReturn : array[i][1],
				bEnabled : isEnabled,
			});
		}
	};
	
	var menuLVL2 = function (menu, name, array) {
		var isMarked = false;
		var isEnabled = true;
		var extraReturn = "";
		var extraName = "";
		switch (name[1]) {
		 case "setheader" :
			isEnabled = suffixHeader !== false && (lineNmbr + 7) <= maxLine;
			extraReturn = suffixHeader;
			extraName = suffixHeader === false ? " [max 4 on a page]" : ((lineNmbr + 7) >= maxLine ? " [too close to bottom of page]" : " [takes up 4 rows]");
			break;
		 case "setdivider" :
			isEnabled = suffixDivider !== false && (lineNmbr + 3) <= maxLine;
			extraReturn = suffixDivider;
			extraName = suffixDivider === false ? " [max 10 on a page]" : ((lineNmbr + 3) >= maxLine ? " [too close to bottom of page]" : " [takes up 2 rows]");
			break;
		}
		var temp = {
			cName : name[0] + extraName,
			bEnabled : isEnabled
		};
		if (isEnabled) {
			temp.oSubMenu = [];
			for (var i = 0; i < array.length; i++) {
				temp.oSubMenu.push({
					cName : array[i][0],
					cReturn : name[1] + "#" + array[i][1] + "#" + extraReturn,
					bMarked : isMarked,
				})
			}
		}
		menu.push(temp);
	};
	
	//make an array of the default options for lines
	var lineTypes = [
		["without first column", ""],
		["with a Checkbox", "checkbox"],
		["with an 'Always Prepared' Checkbox", "markedbox"],
		["with 'At Will'", "atwill"],
		["with '1\u00D7 Long Rest'", "oncelr"],
		["with '1\u00D7 Short Rest'", "oncesr"],
		["Ask me for the first column", "askuserinput"]
	];
	//make an array of the default options for first column
	var lineTypesTo = [
		["to empty first column", ""],
		["to a Checkbox", "checkbox"],
		["to an 'Always Prepared' Checkbox", "markedbox"],
		["to 'At Will'", "atwill"],
		["to '1\u00D7 Long Rest'", "oncelr"],
		["to '1\u00D7 Short Rest'", "oncesr"],
		["Ask me for the first column", "askuserinput"]
	];
	
	//now make the menu
	var spellsLineMenu = [];
	
	//add the options for adding a spell
	spellsLineMenu.push({cName : "Spell", oSubMenu : AddSpellsMenu});
	
	//add an option to just set underscores
	menuLVL2(spellsLineMenu, ["Empty Printable Line", "___"], lineTypes);
	
	//add the options for adding a caption line
	menuLVL2(spellsLineMenu, ["Column Captions", "setcaptions"], [["with empty first column", ""], ["with 'Me' as first column", "me"], ["with 'Kn' as first column", "kn"], ["for Psionics", "psionicpp"], ["Ask me for the first column", "askuserinput"]]);
	
	spellsLineMenu.push({cName : "-"}); //add a divider
	
	//an option to only change the first column
	menuLVL2(spellsLineMenu, ["Change the first column", "firstcolumn"], lineTypesTo);
	
	spellsLineMenu.push({cName : "-"}); //add a divider
	
	//add the options to adding a header
	//make an array of all the 'classes' to choose from
	var classHeaders = [];
	for (var SpellCaster in CurrentSpells) {
		classHeaders.push([CurrentSpells[SpellCaster].name, SpellCaster]);
	}
	classHeaders.sort(); //sort this array
	if (classHeaders.length > 0) classHeaders.unshift(["-", "-"]); //add a divider line, if any classes were added
	classHeaders.unshift(["Empty header without 'to prepare'", "nopreps"]); //add an option to add an empty one
	classHeaders.unshift(["Empty header", ""]); //add an option to add an empty one
	menuLVL2(spellsLineMenu, ["Class Header", "setheader"], classHeaders);
	
	//add the options for adding a divider
	//make an array of all the spell levels to choose from
	var dividersArray = [];
	var numberArray = [];
	for (var d = 0; d < spellLevelList.length; d++) {
		dividersArray.push([d === 0 ? "Cantrips (0 Level)" : spellLevelList[d].replace("-l", " L"), d]);
		numberArray.push([(d + 1) + " empty row" + (d === 0 ? "" : "s"), d + 1]);
	}
	dividersArray.push(["Psionic Talents", "psionic0"])
	dividersArray.push(["Psionic Disciplines", "psionic1"])
	menuLVL2(spellsLineMenu, ["Spell Level Divider", "setdivider"], dividersArray);
	
	//add the options for adding a glossary
	menuLVL1(spellsLineMenu, [["Glossary of Abbreviations", "setglossary"]]);
	
	spellsLineMenu.push({cName : "-"}); //add a divider
	
	//add the options to move the line up or down
	menuLVL1(spellsLineMenu, [["Move row up", "move up"], ["Move row down", "move down"]]);

	spellsLineMenu.push({cName : "-"}); //add a divider
	
	//add the options to clear or delete the row
	menuLVL1(spellsLineMenu, [["Clear row", "clear"], ["Delete row [slow]", "delete"]]);
	
	//add the options to insert empty row(s)
	numberArray.push(["Ask me", "askuserinput"]);
	menuLVL2(spellsLineMenu, ["Insert empty rows [slow]", "insert"], numberArray);
	
	Menus.spellsLine = spellsLineMenu;
	
	//now call the menu
	var MenuSelection = getMenu("spellsLine");
	
	//and do something with this menus results
	if (MenuSelection !== undefined) {
		switch (MenuSelection[0]) {
		 case "move up" :
			var upValue = What(RemLineUp);
			Value(RemLineUp, What(RemLine));
			Value(RemLine, upValue);
			break;
		 case "move down" :
			var downValue = What(RemLineDown);
			Value(RemLineDown, What(RemLine));
			Value(RemLine, downValue);
			break;
		 case "spell" :
			if (MenuSelection[2] === "askuserinput") {
				MenuSelection[2] = AskUserTwoLetters(false);
			}
			Value(RemLine, MenuSelection[1] + "##" + MenuSelection[2]);
			break;
		 case "setcaptions" :
		 case "___" :
		 case "setheader" :
		 case "setdivider" :
		 case "setglossary" :
			if (MenuSelection[1] === "askuserinput") {
				MenuSelection[1] = AskUserTwoLetters(MenuSelection[0] !== "___");
			} else if (MenuSelection[1].match(/psionic/i)) {
				MenuSelection[0] = "psionic" + MenuSelection[0];
				MenuSelection[1] = MenuSelection[1].replace(/psionic/i, "");
			}
			Value(RemLine, MenuSelection.join("##"));
			break;
		 case "clear" :
			if (What(RemLine) === "") Value(RemLine, " ");
			tDoc.resetForm([RemLine]);
			break;
		 case "delete" :
			deleteSpellRow(prefix, lineNmbr);
			break;
		 case "insert" :
			if (MenuSelection[1] === "askuserinput") {
				MenuSelection[1] = AskUserNumber();
			}
			if (MenuSelection[1] > 0) {
				insertSpellRow(prefix, lineNmbr, MenuSelection[1]);
			}
			break;
		 case "firstcolumn" :
			if (MenuSelection[1] === "askuserinput") {
				MenuSelection[1] = AskUserTwoLetters(What(RemLine).match(/setcaptions/i));
			}
			var RemLineValue = What(RemLine).split("##");
			RemLineValue[1] = MenuSelection[1];
			Value(RemLine, RemLineValue.join("##"));
			break;
		}
	}
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

//aks the user for 2 characters that are used for the caption of the first column of the spell table
function AskUserTwoLetters(caption) {
	var theDialog = {
		theTXT : "",
		initialize : function (dialog) {
			dialog.load({
				"txt0" : "Please type the two characters you want to have as the " + (caption ? "caption for the " : "") + "first column.\n\nAlternatively, you can type a single character between brackets, e.g. '(R)'.",
			});
		},
		destroy : function (dialog) {
			var oResult = dialog.store();
			this.theTXT = oResult["user"];
		},
		description : {
			name : "Set the first column " + (caption ? "caption" : ""),
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : [{
					type : "static_text",
					item_id : "head",
					alignment : "align_fill",
					font : "heading",
					bold : true,
					height : 21,
					char_width : 30,
					name : "Set the first column " + (caption ? "caption" : "")
				}, {
					type : "static_text",
					alignment : "align_fill",
					item_id : "txt0",
					char_height : 8,
					char_width : 30,
				}, {
					type : "edit_text",
					alignment : "align_center",
					item_id : "user",
					char_width : 5,
					height : 20,
				}, {
					type : "ok"
				}]
			}]
		}
	}
	app.execDialog(theDialog);
	return theDialog.theTXT;
}

//aks the user for a number on how manu rows to insert that are used for the caption of the first column of the spell table
function AskUserNumber() {
	var theDialog = {
		theNMBR : "",
		initialize : function (dialog) {
			dialog.load({
				"user" : ASround(11),
			});
		},
		destroy : function (dialog) {
			var oResult = dialog.store();
			this.theNMBR = oResult["user"];
		},
		description : {
			name : "Amount of empty rows to insert",
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : [{
					type : "static_text",
					item_id : "head",
					alignment : "align_fill",
					font : "heading",
					bold : true,
					height : 21,
					char_width : 30,
					name : "Amount of empty rows to insert"
				}, {
					type : "edit_text",
					alignment : "align_center",
					item_id : "user",
					char_width : 4,
					height : 20,
					SpinEdit : true,
				}, {
					type : "ok"
				}]
			}]
		}
	}
	app.execDialog(theDialog);
	return theDialog.theNMBR;
}

//delete a row on the spell list (and move all the rows below it up one)
function deleteSpellRow(prefix, lineNmbr) {
	//remove the content of the current row
	tDoc.resetForm([prefix + "spells.remember." + lineNmbr]);
	
	//make an array of all the rows below this one on the sheet
	var SSmoreA = What("Template.extras.SSmore").split(",");
	SSmoreA[0] = What("Template.extras.SSfront").split(",")[1];
	var thisSheet = SSmoreA.indexOf(prefix);
	var offset = 0;
	for (var SS = thisSheet; SS < SSmoreA.length; SS++) {
		var startRow = SS === thisSheet ? startRow = lineNmbr : 0;
		var endRow = SS === 0 ? FieldNumbers.spells[0] : FieldNumbers.spells[1];
		var theLine = SSmoreA[SS] + "spells.remember.";
		for (var L = startRow; L <= endRow; L++) {
			if (L === endRow && SS === (SSmoreA.length - 1)) {
				Value(theLine + L, "");
				continue;
			}
			var nextRow = L !== endRow ? theLine + (L + 1 + offset) : SSmoreA[SS + 1] + "spells.remember." + 0;
			var nextValue = What(nextRow);
			if (SS === (SSmoreA.length - 1) || (nextValue && L !== endRow)) {
				Value(theLine + L, nextValue);
			} else if (L === endRow && nextValue.indexOf("setheader") === -1 && nextValue.indexOf("setdivider") === -1) {
				Value(theLine + L, nextValue);
			} else if (L === endRow && (nextValue.indexOf("setheader") !== -1 || nextValue.indexOf("setdivider") !== -1)) {
				Value(theLine + L, "");
				SS = SSmoreA.length;
			} else if ((L + 7) > endRow) {
				//see what the first row of the next sheet will be
				var nextSheet = What(SSmoreA[SS + 1] + "spells.remember." + 0);
				if (nextSheet.indexOf("setheader") === -1 && nextValue.indexOf("setdivider") === -1) {
					Value(theLine + L, nextValue);
				} else if (nextSheet.indexOf("setheader") !== -1 && (L + 7) === endRow) {
					//see if the value of the next 7 rows are empty
					var isTest = true;
					for (var t = (L + 1); t <= endRow; t++) {
						if (What(theLine + t) !== "") isTest = false;
					}
					//all the lines are empty, so bring the header and the next 7 lines to this sheet
					if (isTest) {
						for (var t = 0; t <= 7; t++) {
							var theNextValue = What(SSmoreA[SS + 1] + "spells.remember." + t);
							if (theNextValue.indexOf("setheader") !== -1 || thisLine.indexOf("setdivider") !== -1) {
								var setType = theNextValue.indexOf("setheader") !== -1 ? "header" : "divider";
								var theNextValueArray = theNextValue.split("##");
								//first hide the element on the next page
								HideSpellSheetElement(SSmoreA[SS + 1] + (setType === "header" ? "spellshead.Text.header." : "spellsdiv.Text.") + theNextValueArray[2]);
								//now set the array to something that works on this page
								theNextValueArray[2] = findNextHeaderDivider(SSmoreA[SS], setType);
								theNextValue = theNextValueArray.join("##");
							}
							Value(theLine + L + t, theNextValue);
						}
						L === endRow; //skip to end of this sheet
						offset = 7; //set an offset for the rest of the deletion sequence until another header/divider is copied to a new page
					}
				} else if (nextSheet.indexOf("setdivider") !== -1 && (L + 3) === endRow) {
					//see if the value of the next 3 rows are empty
					var isTest = true;
					for (var t = (L + 1); t <= endRow; t++) {
						if (What(theLine + t) !== "") isTest = false;
					}
					//all the lines are empty, so bring the divider and the next 3 lines to this sheet
					if (isTest) {
						for (var t = 0; t <= 3; t++) {
							var theNextValue = What(SSmoreA[SS + 1] + "spells.remember." + t);
							if (theNextValue.indexOf("setheader") !== -1 || thisLine.indexOf("setdivider") !== -1) {
								var setType = theNextValue.indexOf("setheader") !== -1 ? "header" : "divider";
								var theNextValueArray = theNextValue.split("##");
								HideSpellSheetElement(SSmoreA[SS + 1] + (setType === "header" ? "spellshead.Text.header." : "spellsdiv.Text.") + theNextValueArray[2]);
								theNextValueArray[2] = findNextHeaderDivider(SSmoreA[SS], setType);
								theNextValue = theNextValueArray.join("##");
							}
							Value(theLine + L + t, theNextValue);
						}
						L === endRow; //skip to end of this sheet
						offset = 3; //set an offset for the rest of the deletion sequence until another header/divider is copied to a new page
					}
				} else if (nextSheet.indexOf("setglossary") !== -1 && (L + 11) === endRow) {
					//see if the value of the next 11 rows are empty
					var isTest = true;
					for (var t = (L + 1); t <= endRow; t++) {
						if (What(theLine + t) !== "") isTest = false;
					}
					//all the lines are empty, so bring the glossary to this sheet, and skip the rest of this sheet (because they are all hidden)
					if (isTest) {
						L === endRow; //skip to end of this sheet
						offset = 11; //set an offset for the rest of the deletion sequence until another header/divider is copied to a new page
					}
				}
			}
		}
	}
}

//insert a number of empty rows on the spell list
function insertSpellRow(prefix, lineNmbr, toMove) {
	lineNmbr = Number(lineNmbr);
	toMove = Number(toMove);
	//first figure out if toMove is more than a page
	var toCheck = toMove;
	var extraPages = 0;
	if (prefix.indexOf(".SSfront.") !== -1) {
		if (toCheck > FieldNumbers.spells[0]) {
			toCheck -= FieldNumbers.spells[0];
			extraPages += 1;
		}
	}
	if (toCheck > FieldNumbers.spells[1]) {
		var amountPages = Math.floor(toCheck/FieldNumbers.spells[1]);
		toCheck -= amountPages * FieldNumbers.spells[1];
		extraPages += amountPages;
	}
	
	//make an array of all the remember field values, starting with the one we are at, until we find enough empty rows (same as toMove)
	var valuesArray = [];
	var emptyCount = 0;
	var SSmoreA = What("Template.extras.SSmore").split(",");
	SSmoreA[0] = What("Template.extras.SSfront").split(",")[1];
	var thisSheet = SSmoreA.indexOf(prefix);
	var resultRow = false;
	var rememberRow = [0];
	for (var SS = thisSheet; SS < SSmoreA.length; SS++) {
		var startRow = SS === thisSheet ? lineNmbr : 0;
		var endRow = SS === 0 ? FieldNumbers.spells[0] : FieldNumbers.spells[1];
		var theLine = SSmoreA[SS] + "spells.remember.";
		for (var L = startRow; L <= endRow; L++) {
			var thisLine = What(theLine + L);
			valuesArray.push(thisLine);
			if (!(L === startRow && SS === thisSheet) && (thisLine === "" || thisLine.indexOf("___") === 0)) {
				emptyCount += 1;
				if (emptyCount === toCheck) {
					valuesArray.splice(-1 * emptyCount, emptyCount); //remove the last empty items
					
					resultRow = [SSmoreA[SS], L - emptyCount];
					L = endRow + 1;
					SS = SSmoreA.length;
					continue;
				}
			} else {
				if (emptyCount > 0 && L < emptyCount) { //if we just passed the end of a page, we can use the empty values to 'catch up' some of the movement we need to do
					valuesArray.splice(-1 * emptyCount - 1, emptyCount + 1); //remove the last empty items and the current line
					valuesArray.push(thisLine); //add the current line again
					toCheck -= emptyCount; //amend the amount of lines we need to check ahead
					if (toCheck <= 0) { //if this brings the amount of lines to 0 or less, we can stop
						resultRow = [SSmoreA[SS], L - emptyCount];
						L = endRow + 1;
						SS = SSmoreA.length;
						continue;
					}
				}
				emptyCount = 0;
			}
			if (rememberRow[0] === 0 && (thisLine.indexOf("setheader") !== -1 || thisLine.indexOf("setdivider") !== -1 || thisLine.indexOf("setglossary") !== -1)) {
				//if the amount of lines we need to move down too is not on this page anymore, we need to add some empty lines to move it to the next page
				var setType = thisLine.indexOf("setheader") !== -1 ? "header" : thisLine.indexOf("setdivider") !== -1 ? "divider" : "glossary";
				var thisValueArray = thisLine.split("##");
				var moveExtra = setType === "header" ? 7 : setType === "divider" ? 3 : 11;
				if ((L + toCheck) <= endRow && (L + toCheck + moveExtra) > endRow) { // the top is less or equal than the endRow, but the bottom of the section is more
					var theStep = endRow - L - toCheck + 1; // how much empty rows to add
					toCheck += theStep;
					//first remove the last thing that was added to the array (this field)
					valuesArray.pop();
					//now add a number of empty fields
					for (var st = 1; st <= theStep; st++) {
						valuesArray.push("");
					}
					valuesArray.push(thisLine); //add the current line again
				}
				//remember how to hide the element, so we can do it after skipping a couple of rows (the hidden ones)
				rememberRow = [
					setType === "header" ? 3 : setType === "divider" ? 1 : 11,
					SSmoreA[SS],
					setType === "header" ? "spellshead.Text.header." : setType === "divider" ?  "spellsdiv.Text." : "spellsgloss.Image",
					setType === "glossary" ? "" : thisValueArray[2],
				];
			} else if (rememberRow[0] > 0) {
				rememberRow[0] -= 1;
				if (rememberRow[0] === 0) {//now that we passed the last row to skip, hide the header/divider
					HideSpellSheetElement(rememberRow[1] + rememberRow[2] + rememberRow[3]);
					rememberRow = [0];
				}
			}
		}
	}
	
	//remove all the empty values at the end of the array
	var removeEmpties = function(array) {
		if (array[array.length - 1] === "") {
			array.pop();
			removeEmpties(array);
		} else {
			return;
		}
	}
	removeEmpties(valuesArray);
	
	//see how many lines of values we need to add and if we need to add any pages for that
	var theLastRow = resultRow ? resultRow : [SSmoreA[SSmoreA.length - 1], (SSmoreA.length === 1 ? FieldNumbers.spells[0] : FieldNumbers.spells[1]) - emptyCount];
	if ((theLastRow[1] + toCheck) > (theLastRow[0] === "" ? FieldNumbers.spells[0] : FieldNumbers.spells[1])) {
		extraPages += 1;
	}
	
	//add the amount of extra pages that we need
	for (var page = 1; page <= extraPages; page++) {
		DoTemplate("SSmore", "Add");
	}
	
	//calculate at which page we start
	var totalInserts = lineNmbr + toMove + valuesArray.length - 1;
	var jumpPages = 0;
	if (prefix.indexOf(".SSfront.") !== -1) {
		if (totalInserts > FieldNumbers.spells[0]) {
			totalInserts -= FieldNumbers.spells[0];
			jumpPages += 1;
			totalInserts -= 1; //compensate for the fact that a page starts at 0
		}
	}
	if (totalInserts > FieldNumbers.spells[1]) {
		amountPages = Math.floor(totalInserts/FieldNumbers.spells[1]);
		totalInserts -= amountPages * FieldNumbers.spells[1];
		jumpPages += amountPages;
		totalInserts -= amountPages; //compensate for the fact that a page starts at 0
	}
	
	var startLine = totalInserts;
	var startPage = thisSheet + jumpPages;
	
	//now update the array of spell pages
	SSmoreA = What("Template.extras.SSmore").split(",");
	SSmoreA[0] = What("Template.extras.SSfront").split(",")[1];
	
	//then put all the values back, starting with the bottom row
	var valuesCountdown = valuesArray.length - 1;
	
	for (var P = startPage; P >= thisSheet; P--) {
		var nowPage = SSmoreA[P];
		var nowStartLine = P === startPage ? startLine : (P === 0 ? FieldNumbers.spells[0] : FieldNumbers.spells[1]);
		var nowEndLine = P === thisSheet ? lineNmbr : 0;
		for (var I = nowStartLine; I >= nowEndLine; I--) {
			if (P === thisSheet && I < (lineNmbr + toMove)) {
				Value(nowPage + "spells.remember." + I, "");
			} else {
				var theValue = valuesArray[valuesCountdown];
				if (theValue.indexOf("setheader") !== -1 || theValue.indexOf("setdivider") !== -1) { //if a value sets a divider or header, always change the suffix to the next one available on this page
					var setType = theValue.indexOf("setheader") !== -1 ? "header" : "divider";
					var thisValueArray = theValue.split("##");
					thisValueArray[2] = findNextHeaderDivider(nowPage, setType);
					theValue = thisValueArray.join("##");
				}
				Value(nowPage + "spells.remember." + I, theValue);
				valuesCountdown -= 1;
			}
		}
	}
}

//hide the class header or spell level divider if their value is made completely empty before an On Blur action
function HideSpellSheetElement(theTarget) {
	var base = theTarget ? theTarget : event.target.name;
	var prefix = base.substring(0, base.indexOf("spells"));
	var SSfrontPrefix = What("Template.extras.SSfront").split(",")[1];
	var suffix = Number(base.slice(-1));
	var type = base.indexOf("spellshead") !== -1 ? "header" : base.indexOf("spellsdiv") !== -1 ? "divider" : "glossary";
	// variables to make the spell rows that were hidden visible again
	var headerArray = [
		prefix + "spellshead.Image.Header.Left." + suffix, //0
		prefix + "spellshead.Text.header." + suffix, //1
		prefix + "spellshead.class." + suffix, //2
		prefix + "spellshead.ability." + suffix, //3
		prefix + "spellshead.prepare." + suffix, //4
		prefix + "spellshead.attack." + suffix, //5
		prefix + "spellshead.dc." + suffix, //6
		prefix + "BlueText.spellshead.prepare." + suffix, //7
		prefix + "BlueText.spellshead.attack." + suffix, //8
		prefix + "BlueText.spellshead.dc." + suffix, //9
	];
	if (!typePF) {
		headerArray = headerArray.concat([
			prefix + "spellshead.Image.Dragonheadshadow." + suffix, //10
			prefix + "spellshead.Image.Dragonhead." + suffix, //11
			prefix + "spellshead.Text.prepare." + suffix, //12
			prefix + "spellshead.Box.prepare." + suffix, //13
			prefix + "spellshead.Text.attack." + suffix, //14
			prefix + "spellshead.Box.attack." + suffix, //15
			prefix + "spellshead.Text.dc." + suffix, //16
			prefix + "spellshead.Box.dc." + suffix, //17
			prefix + "spellshead.Text.ability." + suffix, //18
			prefix + "spellshead.Box.ability." + suffix, //19
		]);
		var dividerArray = [
			prefix + "spellsdiv.Text." + suffix, //0
			prefix + "spellsdiv.Image.Dragonhead." + suffix, //1
			prefix + "spellsdiv.Image.Divider." + suffix, //2
			prefix + "spellsdiv.Image.DividerFlip." + suffix, //3
		];
	} else {
		headerArray = headerArray.concat([
			prefix + "spellshead.Image.prepare." + suffix, //10
		]);
		var dividerArray = [
			prefix + "spellsdiv.Image." + suffix, //0
			prefix + "spellsdiv.Text." + suffix, //1
		];
	}
	var glossaryArray = [
		prefix + "spellsgloss.Image",
	];
	if ((theTarget || event.value === "") && !(prefix === SSfrontPrefix && suffix === 0)) {
		var lineBase = tDoc.getField(base).submitName;
		var startLine = parseFloat(lineBase.slice(-2)[0] === "." ? lineBase.slice(-1) : lineBase.slice(-2));
		var endLine = startLine;
		
		switch(type) {
		 case "header" :
			var hideArray = headerArray;
			endLine += 3;
			break;
		 case "divider" :
			var hideArray = dividerArray;
			endLine += 1;
			break;
		 case "glossary" :
			var hideArray = glossaryArray;
			endLine += 11;
			break;
		}
		for (var m = 0; m < hideArray.length; m++) {
			Hide(hideArray[m]);
		}
		var resetArray = [lineBase];
		for (var l = (startLine + 1); l <= endLine; l++) {
			resetArray.push(lineBase.replace("." + startLine, "." + l));
		}
		tDoc.resetForm(resetArray);
		tDoc.getField(base).submitName = "";
		
		//if this is a header, add the blue text values to the document level variable
		if (type === "header") {
			var aCast = What(headerArray[2]);
			if (aCast && CurrentSpells[aCast]) {
				CurrentSpells[aCast].blueTxt = {};
				CurrentSpells[aCast].blueTxt.prep = What(headerArray[7]);
				CurrentSpells[aCast].blueTxt.atk = What(headerArray[8]);
				CurrentSpells[aCast].blueTxt.dc = What(headerArray[9]);
			}
		}
	} else if (base === SSfrontPrefix + "spellshead.Text.header.0") {
		//search the entry if it matches any of the CurrentSpells entries
		var toSearch = What(base).toLowerCase();
		var toTest = false;
		var toPrep = true;
		var HideShow = false;
		for (var key in CurrentSpells)  {
			if (toSearch.indexOf(key) !== -1 || toSearch.indexOf(CurrentSpells[key].name.toLowerCase()) !== -1) {
				var spCast = CurrentSpells[key];
				Value(headerArray[2], key);
				PickDropdown(headerArray[3], spCast.ability);
				if (!spCast.level || (spCast.typeSp !== "list" && spCast.typeSp !== "book") || spCast.typeList === 3) toPrep = false;
				toTest = true;
				break;
			}
		}
		if (!toTest) {
			Value(SSfrontPrefix + "spellshead.class.0", "");
			if (event.value === "") HideShow = "Show";
		} else if (!toPrep) {
			HideShow = "Hide";
		}
		
		//show the prepared section or hide it, depending on the above
		if (HideShow) {
			tDoc[HideShow](headerArray[4]);
			if (!typePF) {
				tDoc[HideShow](headerArray[12]);
				tDoc[HideShow](headerArray[13]);
			} else {
				tDoc[HideShow](headerArray[10]);
			}
		}
	}
}

//a one-item menu to hide the glossay
function MakeGlossMenu_GlossOptions() {
	tDoc.delay = true;
	tDoc.calculate = false;
	
	var glossMenu = [{
		cName : "Remove this glossary",
		cReturn : "removeglossary"
	}];
	
	Menus.glossary = glossMenu;
	
	//now call the menu
	var MenuSelection = getMenu("glossary");
	
	//and do something with this menus results
	if (MenuSelection !== undefined && MenuSelection[0] === "removeglossary") {
		HideSpellSheetElement(event.target.name);
	}
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
	if (IsNotReset) tDoc.calculateNow();
}

//check if there are any changes from the last level to the new concerning spells
function CheckForSpellUpdate() {
	var toAsk = eval(What("SpellSheetUpdate.Remember"));
	for (var exceptions in IsSubclassException) toAsk = true;
	if (toAsk || !IsNotImport) return; //we don't need to do this function now
	var askUserUpdateSS = UpdateSpellSheets.race || UpdateSpellSheets.class;
	if (!askUserUpdateSS) { //check if not one of the class levels requires the re-generation of the spell sheet
		for (var theCaster in CurrentSpells) {
			if (classes.known[theCaster]) {
				var aCast = CurrentSpells[theCaster];
				var lvlOld = classes.old[theCaster] && classes.old[theCaster].classlevel ? classes.old[theCaster].classlevel - 1 : 0;
				var lvlNew = classes.known[theCaster].level - 1;
				if (aCast.known) {
					// see if there is a cantrips array in the known section and the amount of known
					if (isArray(aCast.known.cantrips)) {
						askUserUpdateSS = aCast.known.cantrips[lvlOld] !== aCast.known.cantrips[lvlNew];
					}
					// see if there is a spells array in the known section and the amount of known
					if (!askUserUpdateSS && isArray(aCast.known.spells)) {
						askUserUpdateSS = aCast.known.spells[lvlOld] !== aCast.known.spells[lvlNew];
					} else if (!askUserUpdateSS && aCast.typeSp && (aCast.typeSp === "book" || aCast.typeSp === "list") && aCast.typeList !== 2) {
						// if this is a list/book and the caster just got access to a new spell slot level
						if (aCast.spellsTable) {
							askUserUpdateSS = aCast.spellsTable[lvlOld + 1].indexOf(0) !== aCast.spellsTable[lvlNew + 1].indexOf(0);
						} else if (aCast.factor && aCast.factor[0]) {
							askUserUpdateSS = tDoc[aCast.factor[1] + "SpellTable"][lvlOld + 1].indexOf(0) !== tDoc[aCast.factor[1] + "SpellTable"][lvlNew + 1].indexOf(0);
						}
					}
				}
				//see if any of the bonus additions has an array for which the value changed with the changing of the level
				if (!askUserUpdateSS && aCast.bonus) {
					for (var theBonus in aCast.bonus) {
						aBonus = aCast.bonus[theBonus];
						if (aBonus.times && isArray(aBonus.times)) {
							askUserUpdateSS = aBonus.times[lvlOld] !== aBonus.times[lvlNew];
						}
						if (askUserUpdateSS) break;
					}
				}
			}
			if (askUserUpdateSS) break;
		}
	}
	
	//now if any of the above was true, ask the user if a new spell sheet should be generated
	if (askUserUpdateSS) AskForSpellUpdate()
}

//call a dialogue to see if the user wants to update the spell sheets
function AskForSpellUpdate() {
	if (eval(What("SpellSheetUpdate.Remember"))) return;
	var askPopUp = {
		cMsg : "A change has been detected in the spellcasting abilities of your character that require the Spell Sheet(s) to be updated.\n\nWould you like to generate a (new) Spell Sheet?",
		cTitle : "Would you like to generate a new Spell Sheet?",
		nIcon : 2,
		nType : 2,
		oCheckbox : {
			cMsg : "Do not show this message again, I will update the Spell Sheet manually from now on.",
			bInitialValue : false,
			bAfterValue : false
		},
	};
	var rAskPopUp = app.alert(askPopUp);
	Value("SpellSheetUpdate.Remember", askPopUp.oCheckbox.bAfterValue);
	if (rAskPopUp === 4) GenerateSpellSheet();
}

// make all lines on the newly generated empty sheet
function AddSpellSheetTextLines(prefix, boxes, maxLine) {
	maxLine = maxLine ? maxLine : FieldNumbers.spells[1];
	var toEnter = "___" + (boxes ? "##checkbox" : "");
	for (var i = 0; i <= maxLine; i++) {
		Value(prefix + "spells.remember." + i, toEnter);
	}
}

//generate the spell sheet for all the different classes
function GenerateCompleteSpellSheet(thisClass, skipdoGoOn) {
	if (app.viewerType !== "Reader" && tDoc.info.SpellsOnly) {
		tDoc.info.SpellsOnly = thisClass;
		tDoc.info.Title = MakeDocName();
		Value("Opening Remember", "No");
	}
	//first ask the user if he really wants to wait for an hour
	var doGoOn = {
		cMsg: "You are about to remove any Spell Sheets that are currently in this document and replace them with a newly generated sheet containing all spells available to the " + thisClass.capitalize() + " class.\n\nThis will not include any access to spells granted by a subclass.\n\nEvery spell level will have 3 empty lines to fill out yourself.\n\nThis process will take a very, very long time! For classes with a lot of spells, such as a Wizard, this could be well over an hour (or several hours, depending on your machine).\n\nAre you sure you want to continue?",
		nIcon: 2,
		cTitle: "Continue with slow generation of complete spell sheet?",
		nType: 2,
	};
	if (!skipdoGoOn && app.alert(doGoOn) !== 4) return;
	
	thermoM("start"); //start a progress dialog
	thermoM("Generating the " + thisClass.capitalize() + " Spell Sheets..."); //change the progress dialog text
	
	thermoM(1/7); //increment the progress dialog's progress
	
	//then we remove all the existing sheets (if any)
	RemoveSpellSheets();
	
	var lineMax = FieldNumbers.spells[0]; //set the maximum we can go on this sheet
	var lineCurrent = 0; //set the current line on the Spell Sheet
	var headerCurrent = 0; //set the current header on the Spell Sheet
	var dividerCurrent = 0; //set the current divider on the Spell Sheet
	var prefixCurrent = ""; //set the current prefix on the Spell Sheet
	var SSfront = true; //set the state of on which Spell Sheet we are working
	
	//define a function for adding a new page
	var SpellPages = 1;
	var AddPage = function() {
		//add one more page and set the corresponding prefix to the variable
		prefixCurrent = DoTemplate("SSmore", "Add");
		SpellPages += 1;
		thermoM("Filling out page " + SpellPages + " of the Spell Sheets..."); //change the progress dialog text
		//now reset all the incremental variables to 0;
		lineMax = FieldNumbers.spells[1];
		lineCurrent = 0;
		headerCurrent = 0;
		dividerCurrent = 0;
		SSfront = false;
	}
	
	//now we add all the spells of this single class into a new set of spell sheets
	IsNotSpellSheetGenerating = false;
	
	var MeArray = ["cleric", "druid", "paladin", "wizard"];
	
	var orderedSpellList = CreateSpellList(thisClass, false, false, true); //get an array of all the spells of the class, divided up in 1 array per spell level
		
	//for the first entry we need to make the template SSfront appear
	if (tDoc.info.SpellsOnly) {
		prefixCurrent = "P0.SSfront.";
	} else { //if this a normal character sheet, we now have to make the first spell sheet
		prefixCurrent = DoTemplate("SSfront", "Add"); //for the first entry we need to make the template
	}
	thermoM("Filling out page 1 of the Spell Sheet..."); //change the progress dialog text
	
	//now sort each of those new arrays and put them on the sheet
	var start = true;
	for (var lvl = 0; lvl <= 9; lvl++) {
		var spArray = orderedSpellList[lvl];
		if (spArray.length > 0) {
			spArray = spArray.concat(["___", "___", "___"]); //add three empty lines to the end of the level-array
			var MeKn = lvl === 0 ? "##Kn" : (MeArray.indexOf(thisClass) === -1 ? "##Kn" : "##Me");
			
			//first test if there is enough space left on the current page to add what we need to
			//assume that we need to add at least 10 of the spells, the total of this level of spells, whichever is less
			// so 3 (divider + title line) + 4 (header, if applicable) + lowest of [10, arrayLength]
			var needSpace = 3 + (start ? 4 : 0) + Math.min(10, spArray.length);
			if (needSpace >= (lineMax - lineCurrent + 1)) AddPage();
			
			//the first spells to add needs a header in front of it
			if (start) {
				SetSpellSheetElement(prefixCurrent + "spells.remember.0", "header", 0, thisClass, MeArray.indexOf(thisClass) === -1);
				start = false;
			}
			
			//then add the divider
			if (lineCurrent === 0 && SSfront) {
				SetSpellSheetElement(prefixCurrent + "spells.remember.0", "divider", 0, lvl);
			} else {
				Value(prefixCurrent + "spells.remember." + lineCurrent, "setdivider##" + lvl + "##" + dividerCurrent);
				lineCurrent += 2;
			}
			dividerCurrent += 1;
			
			//then add the title line
			Value(prefixCurrent + "spells.remember." + lineCurrent, "setcaptions" + MeKn);
			lineCurrent += 1;
			
			for (var y = 0; y < spArray.length; y++) {
				aSpell = spArray[y];
				//check if not at the end of the page and, if so, create a new page
				if (lineCurrent > lineMax) AddPage();
				Value(prefixCurrent + "spells.remember." + lineCurrent, aSpell + "##checkbox");
				lineCurrent += 1;
			}
		}
	}
	
	//add the glossary if there is still space on the last page
	if ((lineCurrent + 11) <= lineMax) {
		Value(prefixCurrent + "spells.remember." + lineCurrent, "setglossary");
	}
	
	IsNotSpellSheetGenerating = true;
	
	thermoM(); //stop all the progress dialogs
}

//a way to hide the 'prepared' section on the first page of the spell sheet //if a "target" is given, assume it has to be hidden
function MakePreparedMenu_PreparedOptions(target) {
	tDoc.delay = true;
	tDoc.calculate = false;
	
	Menus.spellsPrepared = [{
		cName : "Hide this prepared spells section",
		cReturn : "removepreps",
	}];
	
	//now call the menu
	var MenuSelection = target ? ["removepreps"] : getMenu("spellsPrepared");
	
	var theTarget = target ? target : event.target.name;
	
	//and do something with this menus results
	if (MenuSelection !== undefined && MenuSelection[0] === "removepreps") {
		Hide(theTarget);
		Hide(theTarget.replace(".Text.", ".").replace(".Image.", "."));
		if (!typePF) {
			Hide(theTarget.replace("Text", "Box"));
		}
	}
	
	tDoc.calculate = IsNotReset;
	tDoc.delay = !IsNotReset;
}

//revamp the whole sheet to become a "Complete Spell Sheet"
function ChangeToCompleteSpellSheet(thisClass) {
	if (minVer) return;
	ResetAll();
	thisClass = thisClass ? thisClass : "cleric";
	tDoc.getTemplate("SSfront").spawn(0, true, false);
	tDoc.deletePages({nStart: 1, nEnd: tDoc.numPages - 1});
	tDoc.getTemplate("SSfront").hidden = false;
	tDoc.getTemplate("SSmore").hidden = false;
	tDoc.getTemplate("remember").hidden = false;
	tDoc.getTemplate("blank").hidden = false;
	tDoc.getField("Template.extras.SSfront").defaultValue = ",P0.SSfront.";
	tDoc.resetForm(["Template.extras.SSfront"]);
	
	//remove the saveIMG fields that are now useless
	tDoc.removeField("SaveIMG.Faction");
	tDoc.removeField("SaveIMG.ClassIcon");
	tDoc.removeField("SaveIMG.ALicon");
	
	for (var i = 0; i <= 3; i++) {
		this.getField("spellshead.prepare." + i).readonly = false;
		this.getField("spellshead.attack." + i).readonly = false;
		this.getField("spellshead.dc." + i).readonly = false;
		this.getField("P0.SSfront.spellshead.prepare." + i).readonly = false;
		this.getField("P0.SSfront.spellshead.attack." + i).readonly = false;
		this.getField("P0.SSfront.spellshead.dc." + i).readonly = false;
	};

	if (typePF) { //if the Printer Friendly version, update the copyright
		tDoc.getField("CopyrightInformation").defaultValue = "Inspired by Wizards of the Coast character sheet; made by Joost Wijnen - Flapkan@gmail.com";
		tDoc.getField("P0.SSfront.CopyrightInformation").defaultValue = "Inspired by Wizards of the Coast character sheet; made by Joost Wijnen - Flapkan@gmail.com";
		tDoc.resetForm(["CopyrightInformation", "P0.SSfront.CopyrightInformation"]);
	} else { //if the Colorful version, remove some more useless fields
		tDoc.removeField("SaveIMG.Level");
		tDoc.removeField("SaveIMG.Attack");
		tDoc.removeField("SaveIMG.Prof");
		tDoc.removeField("SaveIMG.Stats");
		tDoc.removeField("SaveIMG.Header.Right");
		tDoc.removeField("SaveIMG.Arrow");
		tDoc.removeField("SaveIMG.IntArrow");
		tDoc.removeField("SaveIMG.HPdragonhead");
		tDoc.removeField("SaveIMG.SaveDC");
		tDoc.removeField("SaveIMG.DnDLogo");
		tDoc.removeField("SaveIMG.Honor");
		tDoc.removeField("SaveIMG.Sanity");
	}

	var keyPF = "This Spell Sheet is an extraction from MPMB's Character Record Sheet [Printer Friendly]. It follows the design and uses elements of the official D&D 5e character sheet by Wizards of the Coast, but has been heavily modified by Joost Wijnen [morepurplemorebetter] (flapkan@gmail.com).\\n\\nOther credits:\\n- Gretkatillor on ENworld.org for the code in this sheet was inspired by Gretkatillor's brilliant 'Clean Sheet'.";

	var keyPFR = "This Spell Sheet is an extraction from MPMB's Character Record Sheet [Printer Friendly - Redesign]. It follows the design idea of the official D&D 5e character sheet by Wizards of the Coast, but has been created from the ground up by Joost Wijnen [morepurplemorebetter] (flapkan@gmail.com).\\n\\nOther credits:\\n- Gretkatillor on ENworld.org for the code in this sheet was inspired by Gretkatillor's brilliant 'Clean Sheet'.";

	var keyCF = "This Spell Sheet is an extraction from MPMB's Character Record Sheet [" + tDoc.info.SheetType + "]. This sheet uses elements designed by Javier Aumente, but has been created from the ground up by Joost Wijnen [morepurplemorebetter] (flapkan@gmail.com).\\n\\nOther credits:\\n- Gretkatillor on ENworld.org for the code in this sheet was inspired by Gretkatillor's brilliant 'Clean Sheet'."
	
	//move the pages that we want to extract to a new instance, by running code from a console
	var forConsole = "tDoc.extractPages({nStart: 0, nEnd: 4});\n\n";
	forConsole += "this.info.SpellsOnly = \"" + thisClass + "\";";
	forConsole += " var toDelScripts = ['ListsBackgrounds', 'ListsClassesUA', 'ListsCreatures', 'ListsFeats', 'ListsGear', 'ListsRaces', 'ListsRacesUA']; for (var s = 0; s < toDelScripts.length; s++) {this.removeScript(toDelScripts[s]);};";
	forConsole += " this.createTemplate({cName:\"SSfront\", nPage:1 });";
	forConsole += " this.createTemplate({cName:\"SSmore\", nPage:2 });";
	forConsole += " this.createTemplate({cName:\"remember\", nPage:3 });";
	forConsole += " this.createTemplate({cName:\"blank\", nPage:4 });";
	forConsole += " this.getTemplate(\"SSfront\").hidden = true;";
	forConsole += " this.getTemplate(\"SSmore\").hidden = true;";
	forConsole += " this.getTemplate(\"remember\").hidden = true;";
	forConsole += " this.getTemplate(\"blank\").hidden = true;";
	forConsole += " this.info.SheetVersion = \"" + tDoc.info.SheetVersion + "\";";
	forConsole += " this.info.SheetType = \"" + tDoc.info.SheetType + "\";";
	forConsole += " this.info.Keywords = \"" + (!typePF ? keyCF : (tDoc.info.SheetType === "Printer Friendly" ? keyPF : keyPFR)) + "\";";
	forConsole += " this.info.ContactEmail = \"Flapkan@gmail.com\";";
	forConsole += " this.info.Subject = \"D&D 5e; Character Sheet; Spell Sheet; Spell Sheet Generator\";";
	forConsole += " this.info.Title = MakeDocName();";
	forConsole += " typePF = this.info.SheetType.search(/printer friendly/i) !== -1;";
	forConsole += " typeA4 = this.info.SheetType.search(/a4/i) !== -1;";
	forConsole += " typeLR = this.info.SheetType.search(/letter/i) !== -1;";
	forConsole += " minVer = this.info.SpellsOnly || this.info.AdvLogOnly;";
	forConsole += " CreateBkmrksCompleteSpellSheet();";
	forConsole += " this.calculateNow();";
	forConsole += " this.importDataObject({cName: \"FAQ.pdf\", cDIPath: \"/D/Joost's Documenten/Dungeons & Dragons/5th Edition/- Sheets Creation/- MPMB's Character Record Sheet/Frequently Asked Questions/FAQ.pdf\"});";
	forConsole += " Value(\"Opening Remember\", \"Yes\");";
	forConsole += " app.execMenuItem(\"GeneralInfo\");";
	console.show();
	console.println("Execute the following:\n" + forConsole);
}

//create the bookmarks of a Adventure Logsheet
function CreateBkmrksCompleteSpellSheet() {
	//make the functions bookmark section
	tDoc.bookmarkRoot.createChild({cName: "Functions", cExpr: "MakeButtons();", nIndex: 0});

	tDoc.bookmarkRoot.children[0].createChild({cName: "Spell Sources", cExpr: "resourceDecisionDialog();", nIndex: 0});
	tDoc.bookmarkRoot.children[0].children[0].color = ["RGB", 0.93, 0.49, 0.098];

	tDoc.bookmarkRoot.children[0].createChild({cName: "Spells Options", cExpr: "MakeSpellMenu_SpellOptions();", nIndex: 1});
	tDoc.bookmarkRoot.children[0].children[1].color = ["RGB", 0.2509765625, 0.5176544189453125, 0.67059326171875];

	tDoc.bookmarkRoot.children[0].createChild({cName: "Flatten", cExpr: "MakeMobileReady(What(\"MakeMobileReady Remember\") === \"\");", nIndex: 2});
	tDoc.bookmarkRoot.children[0].children[2].color = ["RGB", 0.2823486328125, 0.1921539306640625, 0.478424072265625];
	
	tDoc.bookmarkRoot.children[0].createChild({cName: "Unit System", cExpr: "SetUnitDecimals_Button();", nIndex: 3});
	tDoc.bookmarkRoot.children[0].children[3].color = ["RGB",0.463,0.192,0.467];
	
	var NameBm = typePF ? "Set Highlight Color" : "Set Color Theme";
	tDoc.bookmarkRoot.children[0].createChild({cName: NameBm, cExpr: "MakeColorMenu(); ColoryOptions();", nIndex: 4});
	tDoc.bookmarkRoot.children[0].children[4].color = ["RGB", 0.5, 0.5, 0.5];
	
	tDoc.bookmarkRoot.children[0].createChild({cName: "Add Custom Script", cExpr: "AddUserScript();", nIndex: 5});

	//make links bookmark section	
	tDoc.bookmarkRoot.createChild({cName: "Links", cExpr: "", nIndex: 1});
	tDoc.bookmarkRoot.children[1].style = 2;
	
	tDoc.bookmarkRoot.children[1].createChild({cName: "Get Additional Content (Custom Scripts)", cExpr: "contactMPMB(\"additions\");", nIndex: 0});
	
	tDoc.bookmarkRoot.children[1].createChild({cName: "Get the Full Character Record Sheet", cExpr: "contactMPMB(\"fullversion\");", nIndex: 1});
	
	var NameLink = tDoc.info.SheetType === "Printer Friendly" ? "Get the Printer Friendly Redesign" : "Get the Latest Version";
	tDoc.bookmarkRoot.children[1].createChild({cName: NameLink, cExpr: "contactMPMB(\"latestversion\");", nIndex: 2});
	
	NameLink = typePF ? "Get the Colorful Design" : "Get the Printer Friendly Design";
	tDoc.bookmarkRoot.children[1].createChild({cName: NameLink, cExpr: "contactMPMB(\"otherdesign\");", nIndex: 3});
	for (var c = 0; c < tDoc.bookmarkRoot.children[1].children.length; c++) tDoc.bookmarkRoot.children[1].children[c].style = 2;

	//make FAQ bookmark section
	tDoc.bookmarkRoot.createChild({cName: "FAQ", cExpr: "tDoc.exportDataObject({ cName: \"FAQ.pdf\", nLaunch: 2 });", nIndex: 2});
	tDoc.bookmarkRoot.children[2].style = 2;
	
	//make the contact bookmark section
	tDoc.bookmarkRoot.createChild({cName: "Contact MPMB", cExpr: "contactMPMB(\"patreon\");", nIndex: 3});
	tDoc.bookmarkRoot.children[3].style = 2;
	tDoc.bookmarkRoot.children[3].createChild({cName: "on DMs Guild", cExpr: "contactMPMB(\"dmsguild\");", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on EN world", cExpr: "contactMPMB(\"enworld\");", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "via Email", cExpr: "contactMPMB(\"email\");", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on GitHub", cExpr: "contactMPMB(\"github\");", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on Reddit", cExpr: "contactMPMB(\"reddit\");", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on Twitter", cExpr: "contactMPMB(\"twitter\");", nIndex: 0});
	tDoc.bookmarkRoot.children[3].createChild({cName: "on Patreon", cExpr: "contactMPMB(\"patreon\");", nIndex: 0});
	
	//make all bookmarks bold
	for (var p = 0; p < tDoc.bookmarkRoot.children.length; p++) {
		tDoc.bookmarkRoot.children[p].style = 2;
		if (tDoc.bookmarkRoot.children[p].children) {
			for (var c = 0; c < tDoc.bookmarkRoot.children[p].children.length; c++) {
				tDoc.bookmarkRoot.children[p].children[c].style = 2;
			}
		}
	}
}

// a function to enforce the Spell Points of the printer friendly sheets
function ToggleSpellPoints() {
	if (!typePF) return; //only do this function for Printer Friendly versions
	var SPactive = What("SpellSlotsRemember") !== "[false,false]"; //true if we are going to set it to using spell points
	
	//show/hide all visible spell slot checkboxes
	for (var i = 1; i < 10; i++) {
		var ssNR = SPactive ? 0 : What("SpellSlots.CheckboxesSet.lvl" + i);
		SetSpellSlotsCheckboxes(i, ssNR, true);
	}
	
	//show/hide the BlueText fields for setting the spell slots
	var SSfrontA = What("Template.extras.SSfront").split(",")[1];
	var HideDontPrint = !SPactive && What("BlueTextRemember") === "Yes" ? "DontPrint" : "Hide";
	tDoc[HideDontPrint]("SpellSlots.CheckboxesSet");
	if (SSfrontA) tDoc[HideDontPrint](SSfrontA + "SpellSlots.CheckboxesSet");
	
	//show/hide the spell points image and checkboxes
	var ShowHide = SPactive ? "Show" : "Hide";
	tDoc[ShowHide]("Image.SpellPoints");
	tDoc[ShowHide]("SpellSlots.Checkboxes.SpellPoints");
	if (SSfrontA) {
		tDoc[ShowHide](SSfrontA + "Image.SpellPoints");
		tDoc[ShowHide](SSfrontA + "SpellSlots.Checkboxes.SpellPoints");
	}
	
	// add or remove the limited feature
	SpellPointsLimFea(SPactive ? "Add" : "Remove");
	
	Value("SpellSlotsRemember", SPactive ? "[false,false]" : "[true,true]");
	
	if (SPactive) ShowSpellPointInfo();
}

// a function to add (AddRemove == "Add") or remove (AddRemove == "Remove") the spell points limited feature as the first limited feature
function SpellPointsLimFea(AddRemove) {
	if (minVer) return; //only do this function for the full versions
	switch (AddRemove.toLowerCase()) {
	 case "add" :
		var SPexists = false;
		//first see if the limited feature not already exists
		for (var i = 1; i <= FieldNumbers.limfea; i++) {
			if (What("Limited Feature " + i).search(/spell.?points?/i) !== -1) {
				SPexists = true;
				break;
			}
		}
		var SpellPointsAmount = SpellPointsTable[classes.spellcastlvl.default];
		if (!SPexists && What("Limited Feature 1") !== "") LimFeaInsert(1);
		AddFeature("Spell Points", SpellPointsAmount, "", "long rest", "Spell Point variant rules, Dungeon Master Guide page 288");
		break;
	 case "remove" :
		RemoveFeature("Spell Points");
		break;
	}
}

// show a dialogue with a warning for using spell points with warlocks
function ShowSpellPointInfo() {
	if (minVer) return; //only do this function for the full versions
	app.alert({
		cMsg : "You have set the sheet to use the " + toUni("Spell Points variant rule") + " from Dungeon Master's Guide, page 288. This hides the Spell Slots and only shows the Spell Point Cost on the spell sheets." + (minVer ? "" : "The amount of Spell Points your character possesses is shown in the Limited Features section on the first page.") + "\n\nPlease be aware that the " + toUni("Warlock class does not work with the Spell Points variant rule") + " and that any spell slots gained from the Warlock class will be effectively invisible. This is also true for any classes you have entered via Custom Script that use their own table for spell slots\nIf your character has levels in the Warlock class or otherwise uses the Warlock way of spellcasting, it is highly recommended not to use the Spell Points function of this sheet.",
		nIcon : 3,
		cTitle : "Spell Points and Warlocks don't mix!",
	})
}

// a way to test is a certain spell is set as known/on a list in the CurrentCasters variable, returning an array of CurrentCaster object names in which it exists
function isSpellUsed(spll) {
	var rtrnA = [];
	if (SpellsList[spll]) {
		for (var aClass in CurrentSpells) {
			var sClass = CurrentSpells[aClass];
			var csAttr = ["selectCa", "selectBo", "selectSp", "selectSpSB", "extra"];
			for (var i = 0; i < csAttr.length; i++) {
				if (sClass[csAttr[i]] && sClass[csAttr[i]].indexOf(spll) !== -1) {
					rtrnA.push(aClass);
					break;
				};
			};
			if (rtrnA.indexOf(aClass) === -1 && SpellsList[spll].level && sClass.typeSp.match(/list/i)) {
				var spObj = eval(sClass.list.toSource());
				spObj.level = [1, 9];
				var theSpList = CreateSpellList(spObj);
				if (theSpList.indexOf(spll) !== -1) rtrnA.push(aClass);
			}
		}
	};
	return rtrnA;
};

function AmendSpellsList() {
	// Artificer spells
	[	// level 1
		"alarm",
		"cure wounds",
		"disguise self",
		"expeditious retreat",
		"false life",
		"jump",
		"longstrider",
		"sanctuary",
		"shield of faith",
		// level 2
		"aid",
		"alter self",
		"arcane lock",
		"blur",
		"continual flame",
		"darkvision",
		"enhance ability",
		"enlarge/reduce",
		"invisibility",
		"lesser restoration",
		"levitate",
		"magic weapon",
		"protection from poison",
		"rope trick",
		"see invisibility",
		"spider climb",
		// level 3
		"blink",
		"fly",
		"gaseous form",
		"glyph of warding",
		"haste",
		"protection from energy",
		"revivify",
		"water breathing",
		"water walk",
		// level 4
		"arcane eye",
		"death ward",
		"fabricate",
		"freedom of movement",
		"leomund's secret chest",
		"mordenkainen's faithful hound",
		"mordenkainen's private sanctum",
		"otiluke's resilient sphere",
		"stone shape",
		"stoneskin"
	].forEach(function (spell) {
		if (SpellsList[spell]) SpellsList[spell].classes.push("artificer");
	});
}

//a way to test is an array of spells is correct
function testSpellArray(spArr) {
	var wrongArr = [];
	spArr.forEach(function (sp) {
		if (!SpellsList[sp]) wrongArr.push(sp);
	})
	return wrongArr.length ? wrongArr : "All Good";
};

//a way to add dependencies of spells to an array of spells at the right spot
function addSpellDependencies(spArr) {
	var returnArray = [];
	spArr.forEach(function (sp) {
		if (SpellsList[sp]) {
			returnArray.push(sp);
			if (SpellsList[sp].dependencies) returnArray = returnArray.concat(SpellsList[sp].dependencies);
		}
	})
	return returnArray;
}