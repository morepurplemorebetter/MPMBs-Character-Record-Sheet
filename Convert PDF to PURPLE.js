// Console commands for Adobe Acrobat Pro to convert a v14.0.5-beta to v26.4.1 PURPLE
app.clearTimeOut(OpeningStatementVar);

var purple = {
    background: {
        RGB: ["RGB", 59/255, 32/255, 79/255], // 3b204f
        CMYK: ["CMYK", 0.83, 0.96, 0.37, 0.36],
    },
    text: {
        RGB: ["RGB", 154/255, 107/255, 171/255], // 7f55a2
        CMYK: ["CMYK", 0.43, 0.67, 0.01, 0],
    },
    textDark: {
        RGB: ["RGB", 127/255, 85/255, 162/255], // 7f55a2
        CMYK: ["CMYK", 0.58, 0.78, 0, 0],
    },
    lines: {
        RGB: ["RGB", 99/255, 45/255, 139/255], // 632d8b
        CMYK: ["CMYK", 0.76, 1, 0.04, 0],
    },
    filler: {
        RGB: ["RGB", 77/255, 40/255, 108/255], // 4d286c
        CMYK: ["CMYK", 0.84, 1, 0.25, 0.13],
    },
}

for (var F = 0; F < this.numFields; F++) {
    var Fname = this.getNthFieldName(F);
    var Ffield = this.getField(Fname);
    if (Ffield.textColor && Ffield.textColor.toString() === color.black.toString()) {
        // If black
        Ffield.textColor = purple.text.RGB;
    } else if (Ffield.textColor) {
        // If not black
        Ffield.textColor = purple.textDark.RGB;
    }
    // Buttons
    if (Ffield.type === "button" && Fname.indexOf("spells.checkbox") == -1) {
        if (Ffield.strokeColor[0] !== "T") Ffield.strokeColor = purple.lines.RGB;
        if (Ffield.fillColor[0] !== "T") Ffield.fillColor = purple.filler.RGB;
    }
}
getField("spells.checkbox").strokeColor = purple.background.CMYK;
getField("spells.checkbox").fillColor = purple.filler.RGB;

// Update Button images
for (var i = 0; i <= 9; i++) {
    if (i < 4) {
        getField("spellshead.Image.Header.Left."+i).buttonImportIcon(dir+"Spellsheet - Spellshead"+".pdf");
        getField("spellshead.Image.prepare."+i).buttonImportIcon(dir+"Spellsheet - Spellshead.prepared"+".pdf");
    }
    getField("spellsdiv.Image."+i).buttonImportIcon(dir+"Spellsheet - Spelldiv"+".pdf");
}
getField("spellsgloss.Image").buttonImportIcon(dir+"Spellsheet - Glossary"+".pdf");
for (var i = 1; i <= 12; i++) {
    getField("Image.MagicItemAttuned."+i).buttonImportIcon(dir+"Partial - Magic Item Attuned Checkbox"+".pdf");
}

// calc lines/boxes
["ALlog", "ASbackgr", "AScomp", "ASfront", "ASoverflow", "CSback", "WSfront"].forEach(function (type) {
    var lines = getField("Image.calc_lines."+type);
    var boxes = getField("Image.calc_boxes."+type);
    if (lines) {
        lines.buttonImportIcon(dir+"calc_lines - "+type+".pdf");
    } else {
        console.println("No lines for "+type);
    }
    if (boxes) {
        boxes.buttonImportIcon(dir+"calc_boxes - "+type+".pdf");
    } else {
        console.println("No boxes for "+type);
    }
});

// Spell Sheet first column
[{
    name: "checkbox",
    file: "Checkbox",
    x: 0, y: 0,
}, {
    name: "checkedbox",
    file: "Checkedbox",
    x: 1, y: 0,
}, {
    name: "atwill",
    file: "At Will",
    x: 0, y: 1,
}, {
    name: "markedbox",
    file: "Markedbox",
    x: 1, y: 1,
}, {
    name: "oncelr",
    file: "OnceLR",
    x: 0, y: 2,
}, {
    name: "oncelr_used",
    file: "OnceLR_Used",
    x: 1, y: 2,
}, {
    name: "oncelr+markedbox",
    file: "MarkedBox+OnceLR",
    x: 0, y: 3,
}, {
    name: "oncelr+markedbox_used",
    file: "MarkedBox+OnceLR_Used",
    x: 1, y: 3,
}, {
    name: "oncesr",
    file: "OnceSR",
    x: 0, y: 4,
}, {
    name: "oncesr_used",
    file: "OnceSR_Used",
    x: 1, y: 4,
}, {
    name: "oncesr+markedbox",
    file: "MarkedBox+OnceSR",
    x: 0, y: 5,
}, {
    name: "oncesr+markedbox_used",
    file: "MarkedBox+OnceSR_Used",
    x: 1, y: 5,
}].forEach(function (thing) {
    var cName = "SaveIMG.FirstCol." + thing.name;
    getField(cName).buttonImportIcon(dir + "Spellsheet 1stCol - " + thing.file + ".pdf");
});

// Whiteout fields
getField("Attuned Magic Items Whiteout").fillColor = purple.background.CMYK;
getField("Whiteout").fillColor = purple.background.CMYK;

// Icons
getField("SaveIMG.ClickMeIcon").buttonImportIcon(dir+"Icon - Click Me button"+".pdf");

// Spell slot circles
app.clearTimeOut(OpeningStatementVar);
var dir = "/C/Folder"; // change this to location of edited optional parts
getField("SaveIMG.FirstCol.checkedbox").buttonImportIcon(dir + "Spellsheet 1stCol - Checkedbox.pdf");
for (var i = 1; i <= 4; i++) {
    getField("SaveIMG.SpellSlots." + i).buttonImportIcon(dir + "Spellsheet - " + i + " circles.pdf");
}

// BLUETEXT FIELDS NOG DOEN!!!
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
    "Init Bonus",
    "Comp.Use.Combat.Init.Bonus",
    "AC Stealth Disadvantage",
    "AC Stealth Disadvantage Title",
    "SpellSlots.CheckboxesSet",
    "Extra.Magic Item Weight Title",
    "HoS ST Bonus",
]
var compTemps = What("Template.extras.AScomp").split(",");
compTemps.splice(compTemps.indexOf(""), 1);
for (var T = 0; T < compTemps.length; T++) {
    BlueTxt.push(compTemps[T] + "BlueText");
    BlueTxt.push(compTemps[T] + "Comp.Use.Combat.Init.Bonus");
}
for (var i = 1; i <= FieldNumbers.magicitems; i++) {
    BlueTxt.push("Extra.Magic Item Weight " + i);
};
for (var i = 0; i < BlueTxt.length; i++) {
    try {
        getField(BlueTxt[i]).textColor = color.red;
    } catch (e) {
        console.println("Error with "+BlueTxt[i]);
    }
};

// Save
{ // update v26.x.x to v26.4.1
	tDoc.info.SheetVersionType = "";
	tDoc.info.SheetVersionBuild = "";
	app.clearTimeOut(OpeningStatementVar);
	var strFldr = "/C/Git/"; // change this to location of the repos
	var baseFldr = "MPMBs-Character-Record-Sheet/";
	var importFldr = "Imports-for-MPMB-s-Character-Sheet/WotC material/";
	[
		"Functions1",
		"Functions2",
		"FunctionsSpells",
		"Lists",
	].forEach( function(co) {
		var rFolder = co.indexOf("Lists") !== -1 || co === "Icons" ? "_variables/" : "_functions/";
		var rFile = strFldr + baseFldr + rFolder + co + ".js";
		try {
			var rStream = util.readFileIntoStream(rFile);
			var cFile = util.stringFromStream(rStream);
			this.addScript(co, cFile);
		} catch (e) { console.println("failed to add script: " + co) };
	});
	app.clearTimeOut(OpeningStatementVar); // Clear it again if adding the "Startup" script file

  // Change sheet type
    tDoc.info.SheetType = "PURPLE";
  // Turn default highlighting off
    this.getField("Highlighting").defaultValue = "false";
    this.getField("Highlighting").value = "false";
    this.getField("Highlighting").userName = "turn highlighting off";
  // Skill names in the right colours
    SetRichTextFields();

  // save the free version for the website
	var newVer = ["26.4.1", "", "260401"];
	Publish(newVer[0], newVer[1], "");
	this.saveAs(this.path.replace(/\(v.*?\)/i, "(v" + semVers + ")"));

  // save for distribution through Patreon and cloud sharing
	Publish(newVer[0], newVer[1], newVer[2], true);
	ImportUserScriptFile(strFldr + importFldr + "all_WotC_pub+UA.min.js");
	RunUserScript(false, false);
	resourceDecisionDialog(true, true);
	UpdateDropdown("all");
	this.saveAs(this.path.replace(this.documentFileName, "- pre-loaded/" + this.documentFileName.replace(/\(v.*?\)/i, "(v" + semVers + ")")));
	this.dirty = false;
	this.closeDoc();
};
