var typePF = tDoc.info.SheetType.search(/printer friendly/i) !== -1;
var typeA4 = tDoc.info.SheetType.search(/a4/i) !== -1;
var typeLR = tDoc.info.SheetType.search(/letter/i) !== -1;
var minVer = tDoc.info.SpellsOnly || tDoc.info.AdvLogOnly;

var UnitsList = {
	metric : {
		mass : 0.5,
		length : 0.3,
		lengthInch : 0.025,
		volume : 30,
		surface : 0.1,
		distance : 1.6,
	},
	metricExact : {
		mass : 0.45359237,
		length : 0.3048,
		lengthInch : 0.0254,
		volume : 28.316846592,
		surface : 0.09290304,
		distance : 1.609344,
	},
}

var AbilityScores = {
	abbreviations : ["Str", "Dex", "Con", "Int", "Wis", "Cha"],
	names : ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"],
	"strength" : {
		index : 0
	},
	"dexterity" : {
		index : 1
	},
	"constitution" : {
		index : 2
	},
	"intelligence" : {
		index : 3
	},
	"wisdom" : {
		index : 4
	},
	"charisma" : {
		index : 5
	},
	"current" : {
		"Str" : {
			base : 10,
			race : 0,
			extra : 0,
			magic : 0
		},
		"Dex" : {
			base : 10,
			race : 0,
			extra : 0,
			magic : 0
		},
		"Con" : {
			base : 10,
			race : 0,
			extra : 0,
			magic : 0
		},
		"Int" : {
			base : 10,
			race : 0,
			extra : 0,
			magic : 0
		},
		"Wis" : {
			base : 10,
			race : 0,
			extra : 0,
			magic : 0
		},
		"Cha" : {
			base : 10,
			race : 0,
			extra : 0,
			magic : 0
		},
		"HoS" : {
			base : 10,
			race : 0,
			extra : 0,
			magic : 0
		},
	},
	"improvements" : {
		"classlvl" : "",
		"classprime" : "",
		"classmulti" : "",
		"racefeats" : "",
	}
};

var Menus = {
	"inventory" : "",
	"background" : "",
	"classfeatures" : "",
	"chooselayers" : "",
	"gear" : "",
	"magicitems" : "",
	"color" : "",
	"raceoptions" : "",
	"importexport" : tDoc.info.SpellsOnly ? [{
			cName : "Add custom script",
			cReturn : "go#script"
		}] : [{
			cName : "Add custom script",
			cReturn : "go#script"
		}, {
			cName : "-",
		}, {
			cName : "Import Directly from a PDF (recommended)",
			cReturn : "go#direct"
		}, {
			cName : "-",
		}, {
			cName : "Import .xfdf file (depreciated)",
			cReturn : "go#import#xfdf"
		}, {
			cName : "Export .xfdf file (depreciated)",
			oSubMenu: [{
				cName : "Export .xfdf file of non-calculated fields",
				cReturn : "go#export#partial"
			}, {
				cName : "Export .xfdf file of equipment fields only",
				cReturn : "go#export#equipment"
			}, {
				cName : "Export .xfdf file of description fields only",
				cReturn : "go#export#description"
			}, {
				cName : "-",
			}, {
				cName : "Export .xfdf file of all fields",
				cReturn : "go#export#all"
			}, ],
		}, ],
	"feats" : "",
	"attacks" : "",
	"wildshape" : "",
	"companion" : "",
	"actions" : "",
	"limfea" : "",
	"pages" : "",
	"notes" : "",
	"advlog" : "",
	"icon" : "",
	"spells" : "",
	"spellsLine" : "",
	"glossary" : "",
	"hp" : "",
	"texts" : "",
	"skills" : "",
};

var classes = {
	field : "",
	parsed : [],
	known : {},
	old : {},
	hd : [],
	hp : 0,
	attacks : 1,
	extraskills : [],
	primary : "",
	spellcastlvl : {default : 0, warlock : 0},
	oldspellcastlvl : {default : 0, warlock : 0},
};

var CurrentClasses = {};

var CurrentArmour = {
	field : "",
	known : "",
	mod : "",
	proficiencies : {},
	magic : 0,
};

var CurrentShield = {
	field : "",
	magic : 0,
};

var CurrentWeapons = {
	field : [],
	known : [],
	proficiencies : {},
	extraproficiencies : [],
	manualproficiencies : [],
	compField : {},
	compKnown : {},
};

var CurrentBackground = {};

var CurrentFeats = {
	known : [],
	improvements : [],
	skills : []
};

var IsNotReset = true;
var IsNotImport = true;
var IsNotFeatMenu = true;
var IsNotWeaponMenu = true;
var IsNotSpellSheetGenerating = true;

var FieldsRemember = [];

var FieldNumbers = {
	actions : typeLR ? 11 : 12,
	trueactions : typePF ? 12 : (typeA4 ? 22 : 20),
	attacks : typeA4 ? 6 : 5,
	feats : typeA4 ? 9 : 8,
	langstools : typeA4 ? 8 : 6,
	spells : typePF ? [55, 70] : (typeA4 ? [66, 77] : [61, 72]),
	logs : typePF ? 6 : 7,
	magicitems : typePF ? 12 : (typeA4 ? 16 : 15),
	magicitemsD : typePF ? 5 : 7,
	gear : typePF ? 54 : 46,
	extragear : typePF ? 36 : 42,
	gearMIrow : typePF ? 51 : 43,
	compgear : typePF ? 17 : 24,
	limfea : 16,
}

var CurrentRace = {};

var CurrentCompRace = {};

var CurrentSpells = {};
var CurrentCasters = {};
var CurrentSources = {};
var CurrentEvals = {};

var UpdateSpellSheets = {};

var ExperiencePointsList = ["", 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000, 1000000000];
var levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

var SkillsList = {
	abbreviations : [
		"Acr",
		"Ani",
		"Arc",
		"Ath",
		"Dec",
		"His",
		"Ins",
		"Inti",
		"Inv",
		"Med",
		"Nat",
		"Perc",
		"Perf",
		"Pers",
		"Rel",
		"Sle",
		"Ste",
		"Sur",
		"Init",
		"Too"
	],
	abilityScores : [
		"Dex",
		"Wis",
		"Int",
		"Str",
		"Cha",
		"Int",
		"Wis",
		"Cha",
		"Int",
		"Wis",
		"Int",
		"Wis",
		"Cha",
		"Cha",
		"Int",
		"Dex",
		"Dex",
		"Wis",
		"Dex",
		"Too"
	],
	names : [
		"Acrobatics",
		"Animal Handling",
		"Arcana",
		"Athletics",
		"Deception",
		"History",
		"Insight",
		"Intimidation",
		"Investigation",
		"Medicine",
		"Nature",
		"Perception",
		"Performance",
		"Persuasion",
		"Religion",
		"Sleight of Hand",
		"Stealth",
		"Survival",
		"Initiative",
		"Tool",
	],
	abbreviationsByAS : [
		"Ath",
		"Acr",
		"Sle",
		"Ste",
		"Arc",
		"His",
		"Inv",
		"Nat",
		"Rel",
		"Ani",
		"Ins",
		"Med",
		"Perc",
		"Sur",
		"Dec",
		"Inti",
		"Perf",
		"Pers",
		"Init",
		"Too"
	],
	abilityScoresByAS : [
		"Str",
		"Dex",
		"Dex",
		"Dex",
		"Int",
		"Int",
		"Int",
		"Int",
		"Int",
		"Wis",
		"Wis",
		"Wis",
		"Wis",
		"Wis",
		"Cha",
		"Cha",
		"Cha",
		"Cha",
		"Dex",
		"Too"
	],
	namesByAS : [
		"Athletics",
		"Acrobatics",
		"Sleight of Hand",
		"Stealth",
		"Arcana",
		"History",
		"Investigation",
		"Nature",
		"Religion",
		"Animal Handling",
		"Insight",
		"Medicine",
		"Perception",
		"Survival",
		"Deception",
		"Intimidation",
		"Performance",
		"Persuasion",
		"Initiative",
		"Tool",
	],
};

var DamageTypes = {
	"acid" : {
		index : 1
	},
	"bludgeoning" : {
		index : 2
	},
	"cold" : {
		index : 3
	},
	"fire" : {
		index : 4
	},
	"force" : {
		index : 5
	},
	"lightning" : {
		index : 6
	},
	"necrotic" : {
		index : 7
	},
	"piercing" : {
		index : 8
	},
	"poison" : {
		index : 9
	},
	"psychic" : {
		index : 10
	},
	"radiant" : {
		index : 11
	},
	"slashing" : {
		index : 12
	},
	"thunder" : {
		index : 13
	},
};

//The dialog for setting the pages to print
var SetPrintPages_Dialog = {
	//variables to be set by the calling function
	bCSfront : false,
	bCSback : false,
	bASfront : false,
	bASbackgr : false,
	bAScomp : false,
	bASnotes : false,
	bWSfront : false,
	bALlog : false,
	bSSmore : false,
	bPRsheet : false,
	bASoverflow : false,
	bHide : false,
	bDupl : false,
	bshowPR : false,
	aCSfront : true,
	aCSback : true,
	aASfront : true,
	aASbackgr : true,
	aAScomp : true,
	aASnotes : true,
	aWSfront : true,
	aALlog : true,
	aSSmore : false,
	aPRsheet : false,
	aASoverflow : false,

	//when starting the dialog
	initialize : function (dialog) {
		dialog.load({
			"Pag1" : this.bCSfront,
			"Pag2" : this.bCSback,
			"Pag3" : this.bASfront,
			"Pag4" : this.bASbackgr,
			"Pag5" : this.bAScomp,
			"Pag6" : this.bASnotes,
			"Pag7" : this.bWSfront,
			"Pag8" : this.bALlog,
			"Pag9" : this.bSSmore,
			"Pag0" : this.bPRsheet,
			"Pa10" : this.bASoverflow,
			"Hide" : this.bHide,
			"txt0" : "Please select the pages you want to print or save for future use.\n\nThe values you enter here will be remembered for the next time you push the \"Print\" button in the \"JavaScript Window\" or bookmarks section.\n\nNote that what you do here will have no effect on 'normal' print commands (i.e. using the file menu or Ctrl+P).",
			"txt1" : "Note that this cannot be changed in the next dialog, the print pop-up. The selection you make here will always override anything you do in the next dialog or print settings.",
		});
		
		if (this.bDupl) {
			dialog.load({
				"dupl" : true,
			});
		} else {
			dialog.load({
				"sing" : true,
			});
		}
		
		dialog.visible({
			"Pag0" : this.bshowPR
		})
		
		dialog.enable({
			"Pag1" : this.aCSfront,
			"Pag2" : this.aCSback,
			"Pag3" : this.aASfront,
			"Pag4" : this.aASbackgr,
			"Pag5" : this.aAScomp,
			"Pag6" : this.aASnotes,
			"Pag7" : this.aWSfront,
			"Pag8" : this.aALlog,
			"Pag9" : this.aSSmore,
			"Pag0" : this.aPRsheet,
			"Pa10" : this.aASoverflow,
		});
	},

	//when pressing the ok button
	commit : function (dialog) {},

	//when pressing the other button
	other : function (dialog) {
		dialog.end("save");
	},

	//when the dialog is ended in one way or another
	destroy : function (dialog) {
		var oResult = dialog.store();
		this.bCSfront = oResult["Pag1"];
		this.bCSback = oResult["Pag2"];
		this.bASfront = oResult["Pag3"];
		this.bASbackgr = oResult["Pag4"];
		this.bAScomp = oResult["Pag5"];
		this.bASnotes = oResult["Pag6"];
		this.bWSfront = oResult["Pag7"];
		this.bALlog = oResult["Pag8"];
		this.bSSmore = oResult["Pag9"];
		this.bPRsheet = oResult["Pag0"];
		this.bASoverflow = oResult["Pa10"];
		this.bDupl = oResult["dupl"];
	},

	//fun whenever the Hide checkbox is clicked
	Hide : function (dialog) {
		this.bHide = !this.bHide;
		HideShowEverything(this.bHide);
	},

	description : {
		name : "Choose the pages you want to print",
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
					char_width : 40,
					name : "Choose the pages you want to print"
				}, {
					type : "static_text",
					item_id : "txt0",
					alignment : "align_fill",
					font : "dialog",
					char_height : 11,
					char_width : 40,
				}, {
					type : "cluster",
					align_children : "align_distribute",
					elements : [{
						type : "view",
						elements : [{
							type : "check_box",
							item_id : "Pag1",
							name : "Page 1: Essentials",
						}, {
							type : "check_box",
							item_id : "Pag2",
							name : "Page 2: Features/equipment",
						}, {
							type : "check_box",
							item_id : "Pag3",
							name : (typePF ? "Feats" : "Conditions") + "/magic items page",
						}, {
							type : "check_box",
							item_id : "Pa10",
							name : "Overflow page",
						}, {
							type : "check_box",
							item_id : "Pag9",
							name : "Spell Sheet(s)",
						}, ]
					}, {
						type : "view",
						elements : [{
							type : "check_box",
							item_id : "Pag4",
							name : "Background page",
						}, {
							type : "check_box",
							item_id : "Pag5",
							name : "Companion page(s)",
						}, {
							type : "check_box",
							item_id : "Pag6",
							name : "Notes page(s)",
						}, {
							type : "check_box",
							item_id : "Pag7",
							name : "Wild Shapes page(s)",
						}, {
							type : "check_box",
							item_id : "Pag8",
							name : "Adventurers Logsheet(s)",
						}, {
							type : "check_box",
							item_id : "Pag0",
							name : "Reference sheet",
						}, ]
					}, ]
				}, {
					type : "cluster",
					align_children : "align_left",
					elements : [{
						type : "view",
						align_children : "align_distribute",
						elements : [{
							type : "radio",
							item_id : "dupl",
							group_id : "prin",
							name : "Duplex printing (both sides)",
						}, {
							type : "radio",
							item_id : "sing",
							group_id : "prin",
							name : "Simplex printing (single side)",
						}, ]
					}, {
						type : "view",
						elements : [{
							type : "static_text",
							item_id : "txt1",
							alignment : "align_fill",
							font : "dialog",
							char_height : 5,
							char_width : 38,
						}, ]
					}, ],
				},  {
					type : "cluster",
					align_children : "align_distribute",
					elements : [{
						type : "check_box",
						item_id : "Hide",
						name : "Hide all fields as to print a truly empty sheet to fill out by hand",
					}, ],
				}, {
					type : "gap",
					height : 8,
				}, ]
			}, {
				type : "ok_cancel_other",
				ok_name : "Print",
				other_name : "Remember"
			}, ]
		}, ]
	}
};

//The dialog for setting things to be processed manually
var SetToManual_Dialog = {
	//variables to be set by the calling function
	mAtt : false,
	mBac : false,
	mCla : false,
	mFea : false,
	mRac : false,

	//when starting the dialog
	initialize : function (dialog) {
		dialog.load({
			"Atta" : this.mAtt,
			"Back" : this.mBac,
			"Clas" : this.mCla,
			"Feat" : this.mFea,
			"Race" : this.mRac,
			"text" : "Here you can select the functions of this sheet that you want to be done manually instead of calculated (which is the default setting).\n\nSimply check of any items you want to set to manual and press \"Apply\".\n\nIf some items are already set to manual, simply uncheck the box, press \"Apply\", and that feature will be calculated and added to the sheet immediately."
		});
	},

	//when pressing the ok button
	commit : function (dialog) {
		var oResult = dialog.store();
		this.mAtt = oResult["Atta"];
		this.mRac = oResult["Race"];
		this.mBac = oResult["Back"];
		this.mCla = oResult["Clas"];
		this.mFea = oResult["Feat"];
	},

	//fun whenever the Attack checkbox is clicked
	Atta : function (dialog) {
		this.mAtt = !this.mAtt;
		ToggleAttacks(this.mAtt ? "No" : "Yes");
	},

	description : {
		name : "Choose the functions you want to set to manual",
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
					char_width : 40,
					name : "Choose the functions you want to set to manual"
				}, {
					type : "static_text",
					item_id : "text",
					alignment : "align_fill",
					font : "dialog",
					char_height : 11,
					char_width : 40,
				}, {
					type : "cluster",
					align_children : "align_distribute",
					elements : [{
						type : "view",
						elements : [{
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Atta",
								name : "Attacks",
								char_width : 12,
							}, {
								type : "static_text",
								item_id : "tAtt",
								name : "No drop-down box; to hit and damage are calculated manually",
							}, ]
						}, {
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Back",
								name : "Background",
								char_width : 12,
							}, {
								type : "static_text",
								item_id : "tBac",
								name : "Do nothing when changing the background",
							}, ]
						}, {
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Clas",
								name : "Class",
								char_width : 12,
							}, {
								type : "static_text",
								item_id : "tCla",
								name : "Do nothing when changing the class or level",
							}, ]
						}, {
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Feat",
								name : "Feat",
								char_width : 12,
							}, {
								type : "static_text",
								item_id : "tFea",
								name : "Stop auto-calculation and auto-fill for feats",
							}, ]
						}, {
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Race",
								name : "Race",
								char_width : 12,
							},  {
								type : "static_text",
								item_id : "tRac",
								name : "Do nothing when changing the race",
							}, ]
						}, ]
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

var ColorList = {
	aqua : { //wizard
		RGB : ["RGB", 0.1176, 0.4431, 0.7176],
		CMYK : ["CMYK", 0.85, 0.5, 0.01, 0]
	}, //1e71b7
	blue : { //paladin
		RGB : ["RGB", 0, 0.651, 0.8314],
		CMYK : ["CMYK", 0.75, 0.13, 0.09, 0]
	}, //00a6d4
	brown : { //warlock
		RGB : ["RGB", 0.4784, 0.3647, 0.3294],
		CMYK : ["CMYK", 0.38, 0.53, 0.51, 0.4]
	}, //7a5d54
	gray : { //rogue
		RGB : ["RGB", 0.5, 0.5, 0.5],
		CMYK : ["CMYK", 0.5, 0.39, 0.39, 0.21]
	}, //7e7f7f
	green : { //druid
		RGB : ["RGB", 0.0157, 0.4, 0.2],
		CMYK : ["CMYK", 0.9, 0.33, 0.96, 0.27]
	}, //046633
	orange : { //sorcerer
		RGB : ["RGB", 0.9098, 0.3059, 0.0588],
		CMYK : ["CMYK", 0, 0.8, 1, 0]
	}, //e84e0f
	pink : {
		RGB : ["RGB", 0.9098, 0.1961, 0.4863],
		CMYK : ["CMYK", 0, 0.9, 0.15, 0]
	}, //e8327c
	purple : { //bard
		RGB : ["RGB", 0.3922, 0.1412, 0.5059],
		CMYK : ["CMYK", 0.76, 1, 0.03, 0]
	}, //642481
	red : { //fighter
		RGB : ["RGB", 0.7412, 0.0941, 0.1333],
		CMYK : ["CMYK", 0.18, 1, 0.91, 0.08]
	}, //bd1822
	teal : { //ranger
		RGB : ["RGB", 0, 0.6275, 0.6],
		CMYK : ["CMYK", 0.79, 0.12, 0.45, 0]
	}, //00a099
	yellow : { //cleric
		RGB : ["RGB", 0.9529, 0.5725, 0],
		CMYK : ["CMYK", 0, 0.5, 1, 0]
	}, //f39200
} //for gradients, add 15% brightness as BHS color

var DarkColorList = {
	aqua : ["CMYK", 0.85, 0.5, 0.01, 0.5], //144671
	blue : ["CMYK", 0.75, 0.13, 0.09, 0.5], //066882
	brown : ["CMYK", 0.38, 0.53, 0.51, 0.9], //291d16
	gray : ["CMYK", 0.7, 0.6, 0.56, 0.67], //303131
	green : ["CMYK", 0.9, 0.33, 0.96, 0.77], //003012
	orange : ["CMYK", 0, 0.8, 1, 0.5], //8d3200
	pink : ["CMYK", 0, 0.9, 0.15, 0.5], //8e204c
	purple : ["CMYK", 0.76, 1, 0.03, 0.5], //401150
	red : ["CMYK", 0.18, 1, 0.91, 0.58], //6e110b
	teal : ["CMYK", 0.79, 0.12, 0.45, 0.5], //00645f
	yellow : ["CMYK", 0, 0.5, 1, 0.5], //935b00
} // +50% black

var LightColorList = {
	aqua : ["CMYK", 0.68, 0.29, 0, 0], //4e9ad9
	blue : ["CMYK", 0.7, 0.06, 0.11, 0], //2bb3d9
	brown : ["CMYK", 0.29, 0.39, 0.38, 0.14], //ad9189
	gray : ["CMYK", 0.33, 0.25, 0.26, 0.04], //b3b3b3
	green : ["CMYK", 0.8, 0.13, 0.78, 0], //219a5e
	orange : ["CMYK", 0, 0.62, 0.7, 0], //f77d4d
	pink : ["CMYK", 0, 0.69, 0.01, 0], //f772a9
	purple : ["CMYK", 0.58, 0.78, 0.01, 0], //844e99
	red : ["CMYK", 0.1, 0.79, 0.55, 0], //db535c
	teal : ["CMYK", 0.7, 0, 0.35, 0], //26bdb8
	yellow : ["CMYK", 0, 0.38, 0.82, 0], //f8ad3c
}

//The dialog for setting the unit system and decimal
var SetUnitDecimals_Dialog = {
	//variables to be set by the calling function
	bSys : "imperial",
	bDec : "dot",

	//when starting the dialog
	initialize : function (dialog) {
		dialog.load({
			"txt0" : "Any changes you make will be applied immediately to all fields that would logically be impacted by them. The conversion is not completely accurate, as some accuracy is sacrificed for numbers that are easier to use during play.\n\n \u2022 Distances in game mechanics are converted by assuming 1 ft is 30 cm;\n \u2022 Weights used in game mechanics are converted by assuming 2 lb is 1 kg;\n \u2022 All converted units used in game mechanics are rounded to the nearest half;\n \u2022 Equipment weight is calculated to three decimals accuracy;\n \u2022 The Character's Height and Weight fields are converted with more accuracy.\n\nNote that units you added manually might not be converted correctly as not all units are supported.\nAny features that auto-fill will recognize these settings and use them to update the sheet. So you only have to set this once.\nThe Spell Sheet can't be flawlessly changed from one unit system to another on the fly. Changing unit systems is best done before generating a Spell Sheet.\nFields that are never auto-filled by sheet automation, such as the character history or notes on the 6th page, will not be changed.",
		});
		
		if (this.bSys === "imperial") {
			dialog.load({
				"SyIm" : true,
			});
		} else {
			dialog.load({
				"SyMe" : true,
			});
		}
		if (this.bDec === "dot") {
			dialog.load({
				"DeDo" : true,
			});
		} else {
			dialog.load({
				"DeCo" : true,
			});
		}
	},

	//when pressing the ok button
	commit : function (dialog) {
		var oResult = dialog.store();
		if (oResult["SyIm"]) {
			this.bSys = "imperial";
		} else {
			this.bSys = "metric";			
		}
		if (oResult["DeDo"]) {
			this.bDec = "dot";
		} else {
			this.bDec = "comma";
		}
	},

	description : {
		name : "Choose the unit system and decimal separator",
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
					name : "Choose the unit system and decimal separator"
				}, {
					type : "static_text",
					item_id : "txt0",
					alignment : "align_fill",
					font : "dialog",
					char_height : 27,
					char_width : 43,
				}, {
					type : "view",
					align_children : "align_row",
					char_width : 43,
					elements : [{
						type : "cluster",
						align_children : "align_left",
						char_width : 15,
						elements : [{
							type : "view",
							align_children : "align_left",
							elements : [{
								type : "static_text",
								item_id : "SyTx",
								font : "dialog",
								bold : true,
								height : 17,
								char_width : 15,
								name : "Unit System",
							}],
						}, {
							type : "view",
							align_children : "align_left",
							char_width : 15,
							elements : [{
								type : "radio",
								item_id : "SyIm",
								group_id : "Syst",
								name : "Imperial",
							}, {
								type : "radio",
								item_id : "SyMe",
								group_id : "Syst",
								name : "Metric",
							}, ]
						}, ],
					}, {
						type : "gap",
						char_width : 3,
					}, {
						type : "cluster",
						align_children : "align_left",
						char_width : 15,
						elements : [{
							type : "view",
							align_children : "align_left",
							elements : [{
								type : "static_text",
								item_id : "DeTx",
								font : "dialog",
								bold : true,
								height : 17,
								char_width : 15,
								name : "Decimal Separator",
							}],
						}, {
							type : "view",
							align_children : "align_left",
							char_width : 15,
							elements : [{
								type : "radio",
								item_id : "DeDo",
								group_id : "Deci",
								name : "Dot (comma as thousands separator)",
							}, {
								type : "radio",
								item_id : "DeCo",
								group_id : "Deci",
								name : "Comma (dot as thousands separator)",
							}, ],
						}, ],
					}, ],
				}, {
					type : "gap",
					height : 8,
				}, ]
			}, {
				type : "ok_cancel",
			}, ]
		}, ]
	}
};

//The dialog for setting the text font size and hiding or showing text lines
var SetTextOptions_Dialog = {
	//variables to be set by the calling function
	bSize : 5.74,
	bDefSize : 8.4,
	bDefSizeSheet : 5.74,
	bFont : "SegoePrint",
	bFontsArray : {"SegoeUI" : -1, "SegoeUI-Semibold" : -1},
	fOthTest : false,
	bDefFont : "SegoePrint",

	//when starting the dialog
	initialize : function (dialog) {	
		dialog.load({
			"txt0" : "Below you can set the font size and" + " change the font of all the form fields.\n\nNote that if you use a font of your own choosing (custom font), it might not be possible to align the text properly with the text lines, regardless of the font size you select.\n\nThe settings for font size will be applied to all text fields that support multiple lines of text. Fields with a single line of text have a font size of 'auto'.\n\nIf you set the font size to 'auto', the text will resize to the size of the field. You can subsequently make the text smaller by entering more text or by entering line breaks.",
			"StSz" : this.bDefSize.toString(),
			"sOSi" : this.bSize.toString(),
			"fAlS" : this.bFontsArray,
			"fStS" : this.bDefFont,
		});
		
		dialog.enable({
			"fStS" : false,
			"StSz" : false,
		});
		
		if (Number(this.bSize) === this.bDefSize) {
			dialog.load({
				"sSta" : true,
			});
		} else if (Number(this.bSize) === 0) {
			dialog.load({
				"sAut" : true,
			});
		} else {
			dialog.load({
				"sOth" : true,
			});			
		}
		
		if (this.bFont === this.bDefFont) {
			dialog.load({
				"fSta" : true,
			});
		} else if (this.bFontsArray[this.bFont]) {
			dialog.load({
				"fAlt" : true,
			});
		} else {
			dialog.load({
				"fOth" : true,
				"fOtS" : this.bFont,
			});			
		}
	},

	//when pressing the ok button
	commit : function (dialog) {
		var oResult = dialog.store();
		
		if (oResult["sSta"]) {
			this.bSize = oResult["StSz"];
		} else if (oResult["sAut"]) {
			this.bSize = 0;			
		} else if (oResult["sOth"]) {
			this.bSize = oResult["sOSi"];			
		}
		
		if (oResult["fSta"]) {
			this.bFont = this.bDefFont;
		} else if (oResult["fAlt"]) {
			var elResult = dialog.store()["fAlS"];
			var fResult = this.bDefFont;
			for (var el in elResult) {
				if (elResult[el] > 0) {
					fResult = el;
				}
			}
			this.bFont = fResult;
		} else if (oResult["fOth"]) {
			if (this.fOthTest) {
				this.bFont = oResult["fOtS"];
			} else {
				this.bFont = this.bDefFont;
			}
		}
	},
	
	//do this whenever a number is entered to make sure it has a dot as decimal separator and not trailing zeroes
	sOSi : function (dialog) {
		var cResult = dialog.store()["sOSi"];
		if (isNaN(cResult) && cResult.match(/,/)) {
			var Parsed = parseFloat(cResult.replace(/,/, "."));
		} else {
			var Parsed = parseFloat(cResult);
		}
		
		dialog.load({
			"sOth" : true,
			"sOSi" : Parsed.toString(),
		});
	},
	
	fSta : function (dialog) {
		this.bDefSize = this.bDefSizeSheet;
		dialog.load({
			"StSz" : this.bDefSize.toString(),
		});
	},
	
	fAlt : function (dialog) {
		var fontResult = dialog.store()["fAlS"];
		var cResult = "";
		for (var Fo in fontResult) {
			if (fontResult[Fo] > 0) {
				var cResult = Fo.toString();
			}
		}
		if (testFont(cResult)) {
			this.bDefSize = FontList[cResult];
			dialog.load({
				"fAlt" : true,
				"StSz" : this.bDefSize.toString(),
			});
		}
	},
	
	fAlS : function (dialog) {
		var fontResult = dialog.store()["fAlS"];
		var cResult = "";
		for (var Fo in fontResult) {
			if (fontResult[Fo] > 0) {
				var cResult = Fo.toString();
			}
		}
		if (cResult === "") {
			this.bDefSize = this.bDefSizeSheet;
			dialog.load({
				"StSz" : this.bDefSize.toString(),
			});
		} else if (testFont(cResult)) {
			this.bDefSize = FontList[cResult];
			dialog.load({
				"fAlt" : true,
				"StSz" : this.bDefSize.toString(),
			});
		} else {
			app.alert({
				cMsg : "The font \"" + cResult + "\" does not appear to be working on your machine.\nEither it isn't spelled in the proper PDSysFont way, or it is not found on your system.\n\nNote that writing a font as a PDSysFont is not straightforward. You can use the names in the drop-down box as a guide (i.e. don't use spaces and pay attention to capitalization).",
				nIcon : 0,
				cTitle : "Error trying to apply the font",
			});
			this.bDefSize = this.bDefSizeSheet;
			dialog.load({
				"fSta" : true,
				"StSz" : this.bDefSize.toString(),
			});
		}
	},
	fOth : function (dialog) {
		var cResult = dialog.store()["fOtS"];
		
		if (cResult === "") {
			this.bDefSize = this.bDefSizeSheet;
			this.fOthTest = false;
			dialog.load({
				"StSz" : this.bDefSize.toString(),
			});
		} else if (testFont(cResult)) {
			this.bDefSize = this.bDefSizeSheet;
			this.fOthTest = true;
			dialog.load({
				"StSz" : this.bDefSize.toString(),
			});
		} else {
			this.fOthTest = false;
			app.alert({
				cMsg : "The font \"" + cResult + "\" does not appear to be working on your machine.\nEither it isn't spelled in the proper PDSysFont way, or it is not found on your system.\n\nNote that writing a font as a PDSysFont is not straightforward. You can use the names in the drop-down box as a guide (i.e. don't use spaces and pay attention to capitalization).",
				nIcon : 0,
				cTitle : "Error trying to apply the font",
			});
			this.bDefSize = this.bDefSizeSheet;
			dialog.load({
				"fSta" : true,
				"StSz" : this.bDefSize.toString(),
			});
		}
	},
	
	fOtS : function (dialog) {
		var cResult = dialog.store()["fOtS"].replace(/\s+/g, "");
		
		if (cResult === "") {
			this.bDefSize = this.bDefSizeSheet;
			this.fOthTest = false;
			dialog.load({
				"StSz" : this.bDefSize.toString(),
			});
		} else if (testFont(cResult)) {
			this.bDefSize = this.bDefSizeSheet;
			this.fOthTest = true;
			dialog.load({
				"fOth" : true,
				"fOtS" : cResult.toString(),
				"StSz" : this.bDefSize.toString(),
			});
		} else {
			this.fOthTest = false;
			app.alert({
				cMsg : "The font \"" + cResult + "\" does not appear to be working on your machine.\nEither it isn't spelled in the proper PDSysFont way, or it is not found on your system.\n\nNote that writing a font as a PDSysFont is not straightforward. You can use the names in the drop-down box as a guide (i.e. don't use spaces and pay attention to capitalization).",
				nIcon : 0,
				cTitle : "Error trying to apply the font",
			});
			this.bDefSize = this.bDefSizeSheet;
			dialog.load({
				"fSta" : true,
				"StSz" : this.bDefSize.toString(),
			});
		}
	},

	description : {
		name : "Set the Font, the Font Size, and Hide Text Lines",
		elements : [{
			type : "view",
			elements : [{
				type : "view",
				elements : [{
					type : "static_text",
					item_id : "head",
					alignment : "align_fill",
					font : "title",
					bold : true,
					height : 21,
					char_width : 50,
					name : "Set the Font and the Font Size"
				}, {
					type : "static_text",
					item_id : "txt0",
					alignment : "align_fill",
					font : "dialog",
					char_height : 15,
					char_width : 50,
				}, {
					type : "cluster",
					align_children : "align_left",
					char_width : 50,
					elements : [{
						type : "view",
						align_children : "align_left",
						height : 18,
						elements : [{
							type : "static_text",
							item_id : "txtf",
							name : "Select the Font",
							height : 18,
							font : "heading",
							bold : true,
						}, ]
					}, {
						type : "view",
						align_children : "align_distribute",
						height : 23,
						elements : [{
							type : "radio",
							item_id : "fSta",
							group_id : "Font",
							name : "Default font:",
							height : 22,
						}, {
							type : "edit_text",
							item_id : "fStS",
							char_width : 8,
							height : 20,
							font : "dialog",
							bold : true,
						}, ]
					}, {
						type : "view",
						align_children : "align_distribute",
						height : 23,
						elements : [{
							type : "radio",
							item_id : "fAlt",
							group_id : "Font",
							name : "Tested font, can be aligned with the lines in Adobe Acrobat:",
							height : 22,
						}, {
							type : "popup",
							item_id : "fAlS",
							char_width : 10,
						}, ]
					}, {
						type : "view",
						align_children : "align_distribute",
						height : 23,
						elements : [{
							type : "radio",
							item_id : "fOth",
							group_id : "Font",
							name : "Custom font (using the PDSysFont font name):",
							height : 22,
						}, {
							type : "edit_text",
							item_id : "fOtS",
							char_width : 20,
							height : 20,
						}, ]
					}, ]
				}, {
					type : "cluster",
					align_children : "align_left",
					char_width : 50,
					elements : [{
						type : "view",
						align_children : "align_left",
						height : 18,
						elements : [{
							type : "static_text",
							item_id : "txts",
							name : "Select the Font Size",
							height : 18,
							font : "heading",
							bold : true,
						}, ]
					}, {
						type : "view",
						align_children : "align_row",
						height : 20,
						elements : [{
							type : "radio",
							item_id : "sSta",
							group_id : "Size",
							name : "Standard font size, tested to align with the lines in Adobe Acrobat:",
						}, {
							type : "edit_text",
							item_id : "StSz",
							char_width : 4,
							height : 20,
							font : "dialog",
							bold : true,
						}, ]
					}, {
						type : "view",
						align_children : "align_left",
						height : 20,
						elements : [{
							type : "radio",
							item_id : "sAut",
							group_id : "Size",
							name : "Auto font size. The text will resize to the size of the field.",
						}, ]
					}, {
						type : "view",
						align_children : "align_distribute",
						height : 20,
						elements : [{
							type : "radio",
							item_id : "sOth",
							group_id : "Size",
							name : "Custom font size (use your system's decimal separator):",
						}, {
							type : "edit_text",
							item_id : "sOSi",
							char_width : 4,
							height : 20,
							SpinEdit : true,
						}, ]
					}, ]
				}, {
					type : "gap",
					height : 8,
				}, ]
			}, {
				type : "ok_cancel",
			}, ]
		}, ]
	}
}

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
			"txt0" : theChar.substring(0,1).toUpperCase() + theChar.substring(1) + "'s level has increased by " + parseFloat(this.LVLchange) + ". Select one of the classes of " + theChar + " that you you want to add this to. Alternatively, you can fill out a new class to add the level to.",
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
			"rClN" : parseFloat(this.ClassNmbrs) <= 0,
		});
		dialog.enable({
			"rClN" : true,
			"rCl1" : parseFloat(this.ClassNmbrs) >= 1,
			"rCl2" : parseFloat(this.ClassNmbrs) >= 2,
			"rCl3" : parseFloat(this.ClassNmbrs) >= 3,
			"rCl4" : parseFloat(this.ClassNmbrs) >= 4,
			"cAll" : Math.abs(this.LVLchange) > 1,
		});
		dialog.visible({
			"vCl1" : parseFloat(this.ClassNmbrs) >= 1,
			"vCl2" : parseFloat(this.ClassNmbrs) >= 2,
			"vCl3" : parseFloat(this.ClassNmbrs) >= 3,
			"vCl4" : parseFloat(this.ClassNmbrs) >= 4,
			"vAll" : Math.abs(this.LVLchange) > 1,
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
			"rClN" : true,
		});
	},
	
	description : {
		name : "Choose Which Class to Level Up",
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
					char_width : 40,
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
							char_width : 10,
						}, {
							type : "edit_text",
							item_id : "tClN",
							alignment : "align_fill",
							char_width : 30,
							height : 20,
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
							char_width : 10,
						}, {
							type : "static_text",
							item_id : "tCl1",
							char_width : 30,
							height : 20,
							alignment : "align_fill",
							font : "dialog",
							bold : true,
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
							char_width : 10,
						}, {
							type : "static_text",
							item_id : "tCl2",
							char_width : 30,
							height : 20,
							alignment : "align_fill",
							font : "dialog",
							bold : true,
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
							char_width : 10,
						}, {
							type : "static_text",
							item_id : "tCl3",
							char_width : 30,
							height : 20,
							alignment : "align_fill",
							font : "dialog",
							bold : true,
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
							char_width : 10,
						}, {
							type : "static_text",
							item_id : "tCl4",
							char_width : 30,
							height : 20,
							alignment : "align_fill",
							font : "dialog",
							bold : true,
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
						char_width : 38,
					}, {
						type : "view",
						align_children : "align_left",
						elements : [{
							type : "check_box",
							item_id : "cAll",
							name : "Apply the entire level change to the selected class.",
						}, ]
					}, ]
				}, ]
			}, {
				type : "ok",
			}, ]
		}, ]
	}
}

var Highlighting = {
	initialState : app.runtimeHighlight,
	initialColor : app.runtimeHighlightColor,
	rememberState : eval(tDoc.getField("Highlighting").value),
	rememberColor : tDoc.getField("Highlighting").fillColor,
}

var defaultSpellTable = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 0, 0, 0, 0, 0, 0, 0, 0],
	[3, 0, 0, 0, 0, 0, 0, 0, 0],
	[4, 2, 0, 0, 0, 0, 0, 0, 0],
	[4, 3, 0, 0, 0, 0, 0, 0, 0],
	[4, 3, 2, 0, 0, 0, 0, 0, 0],
	[4, 3, 3, 0, 0, 0, 0, 0, 0],
	[4, 3, 3, 1, 0, 0, 0, 0, 0],
	[4, 3, 3, 2, 0, 0, 0, 0, 0],
	[4, 3, 3, 3, 1, 0, 0, 0, 0],
	[4, 3, 3, 3, 2, 0, 0, 0, 0],
	[4, 3, 3, 3, 2, 1, 0, 0, 0],
	[4, 3, 3, 3, 2, 1, 0, 0, 0],
	[4, 3, 3, 3, 2, 1, 1, 0, 0],
	[4, 3, 3, 3, 2, 1, 1, 0, 0],
	[4, 3, 3, 3, 2, 1, 1, 1, 0],
	[4, 3, 3, 3, 2, 1, 1, 1, 0],
	[4, 3, 3, 3, 2, 1, 1, 1, 1],
	[4, 3, 3, 3, 3, 1, 1, 1, 1],
	[4, 3, 3, 3, 3, 2, 1, 1, 1],
	[4, 3, 3, 3, 3, 2, 2, 1, 1]
]

var warlockSpellTable = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 2, 0, 0, 0, 0, 0, 0],
	[0, 0, 2, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 2, 0, 0, 0, 0, 0],
	[0, 0, 0, 2, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 0, 0, 0, 0],
	[0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 4, 0, 0, 0, 0],
	[0, 0, 0, 0, 4, 0, 0, 0, 0],
	[0, 0, 0, 0, 4, 0, 0, 0, 0],
	[0, 0, 0, 0, 4, 0, 0, 0, 0],
]

var SpellPointsTable = [0, 4, 6, 14, 17, 27, 32, 38, 44, 57, 64, 73, 73, 83, 83, 94 ,94, 107, 114, 123, 133];

var compString = {
	mount : {
		featurestring : "\u25C6 Find Steed: If dropped to 0 HP, the steed disappears, leaving behind no physical form",
		string : "Find Steed (2nd-level conjuration spell, PHB 240):" +
				"\n\u2022 " + "Summon a spirit in the form of a steed, appearing in an unoccupied space within 30 ft" +
				"\n   " + "It assumes a chosen form: warhorse, pony, camel, elk, or mastiff (DM can allow more forms)" +
				"\n   " + "The steed has the statistics of the chosen form, though its type is celestial, fey, or fiend" +
				"\n   " + "If it has an Intelligence of 5 or less, its Intelligence becomes 6 " +
				"\n   " + "It gains the ability to understand one language that I, the caster, can speak" +
				"\n   " + "When the steed drops to 0 hit points, it disappears, leaving behind no physical form" +
				"\n\u2022 " + "The steed serves me as a mountl I have a bond with it that allows us to fight as a seamless unit" +
				"\n\u2022 " + "While mounted on my steed, I can make any spell I cast that targets only me also target it" +
				"\n\u2022 " + "While my steed is within 1 mile of me, I can communicate with it telepathically" +
				"\n\u2022 " + "I can dismiss my steed at any time as an action, causing it to disappear" +
				"\n\u2022 " + "Casting this spell again summons the same steed, restored to its hit point maximum" +
				"\n\u2022 " + "I can't have more than one steed bonded at a time; as an action, I can release it from its bond",
		actions : [["action", "Find Steed (dismiss)"]],
		actionTooltip : "the Find Steed spell",
	},
	familiar : {
		featurestring : "\u25C6 Find Familiar: If dropped to 0 HP, the familiar disappears, leaving behind no physical form. The familiar must obey all commands of the master",
		string : "Find Familiar (1st-level conjuration [ritual] spell, PHB 240):" +
			"\n\u2022 " + "Summon a spirit that serves as a familiar, appearing in an unoccupied space within 10 ft" +
			"\n   " + "It assumes a chosen form (can change at every casting): bat, cat, crab, frog (toad), hawk," +
			"\n   " + "lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, or weasel." +
			"\n   " + "It has the chosen form's statistics, but its type changes from beast to celestial, fey, or fiend" +
			"\n   " + "When the familiar drops to 0 hit points, it disappears, leaving behind no physical form" +
			"\n   " + "It reappears when I cast this spell again (in a new form if so desired)" +
			"\n\u2022 " + "The familiar acts independently of me, but it always obeys my commands" +
			"\n   " + "In combat, it rolls its own initiative and acts on its own turn, but it can't attack" +
			"\n\u2022 " + "While it is within 100 ft of me, I can communicate with it telepathically" +
			"\n\u2022 " + "As an action, I see/hear what it does (but not with my senses) until the start of my next turn" +
			"\n\u2022 " + "As an action, I can temporarily dismiss it, having it disappears into a pocket dimension" +
			"\n\u2022 " + "As an action, while it is temporarily dismissed, I can cause it to reappear within 30 ft" +
			"\n\u2022 " + "I can't have more than one familiar bonded at a time; as an action, I can dismiss it forever" +
			"\n\u2022 " + "When I cast a spell with a range of touch, my familiar can deliver the spell" +
			"\n   " + "It must be within 100 ft of me and it must use its reaction to deliver the spell when I cast it" +
			"\n   " + "It acts as if it cast the spells, but it can use my modifiers for any attack rolls the spell requires",
		actions : [["action", "Find Familiar (dismiss/reappear)"], ["action", "Use familiar's senses"]],
		actionTooltip : "the Find Familiar spell",
	},
	pact_of_the_chain : {
		featurestring : "\u25C6 Pact of the Chain: If dropped to 0 HP, the familiar disappears, leaving behind no physical form. It must obey all commands of the master",
		string : "Pact of the Chain (variant of the Find Familiar 1st-level conjuration [ritual] spell, PHB 240):" +
			"\n\u2022 " + "Summon a spirit that serves as a familiar, appearing in an unoccupied space within 10 ft" +
			"\n   " + "It assumes a chosen form (can change at every casting): bat, cat, crab, frog (toad), hawk," +
			"\n   " + "lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, weasel," +
			"\n   " + "or one of the special forms: imp, pseudodragon, quasit, or sprite." +
			"\n   " + "It has the chosen form's statistics, but its type changes from beast to celestial, fey, or fiend" +
			"\n   " + "When the familiar drops to 0 hit points, it disappears, leaving behind no physical form" +
			"\n   " + "It reappears when I cast this spell again (in a new form if so desired)" +
			"\n\u2022 " + "The familiar acts independently of me, but it always obeys my commands" +
			"\n   " + "In combat, it rolls its own initiative and acts on its own turn, but it can't attack on its turn" +
			"\n\u2022 " + "While it is within 100 ft of me, I can communicate with it telepathically" +
			"\n\u2022 " + "With my Attack action, I can forgo one attacks to have the familiar make one with its reaction" +
			"\n\u2022 " + "As an action, I see/hear what it does (but not with my senses) until the start of my next turn" +
			"\n\u2022 " + "As an action, I can temporarily dismiss it, having it disappears into a pocket dimension" +
			"\n\u2022 " + "As an action, while it is temporarily dismissed, I can cause it to reappear within 30 ft" +
			"\n\u2022 " + "I can't have more than one familiar bonded at a time; as an action, I can dismiss it forever" +
			"\n\u2022 " + "When I cast a spell with a range of touch, my familiar can deliver the spell" +
			"\n   " + "It must be within 100 ft of me and it must use its reaction to deliver the spell when I cast it" +
			"\n   " + "It acts as if it cast the spells, but it can use my modifiers for any attack rolls the spell requires",
		actions : [["action", "Have familiar attack (part of my Attack action)"], ["action", "Familiar (dismiss/reappear)"], ["action", "Use familiar's senses"]],
		actionTooltip : "Warlock (Pact of the Chain)",
	},
	companion : {
		featurestring : "",
		string : "Ranger's Companion (PHB 93):" +
			"\n\u2022 " + "A beast no larger than medium of challenge rating 1/4 or lower" +
			"\n\u2022 " + "If the beast dies, I can spend 8 hours magically bonding with another that isn't hostile to me" +
			"\n\u2022 " + "When moving in favored terrain with only the beast, I can move stealthily at a normal pace" +
			"\n\u2022 " + "The beast adds my proficiency bonus to its AC, attack rolls, damage rolls," +
			"\n   " + "as well as to any saving throws and skills it is proficient with." +
			"\n\u2022 " + "The beast's Hit Point maximum equals four times my ranger level if higher than its normal HP" +
			"\n\u2022 " + "The beast takes a turn on my initiative, but only takes an action if commanded to" +
			"\n\u2022 " + "I can verbally command the beast where to move (no action)" +
			"\n\u2022 " + "As an action, I can have the beast do an Attack/Dash/Disengage/Dodge/Help action on its turn",
		actions : [],
	},
	companionrr : {
		featurestring : "",
		string : "Ranger's Animal Companion (UA:RR 5):" +
			"\n\u2022 " + "Call forth and bond with an animal from the wilderness by spending 8 hours and 50 gp" +
			"\n\u2022 " + "The animal can be an ape, black bear, boar, giant badger, giant weasel, mule, panther, or wolf" +
			"\n\u2022 " + "I can have one companion at a time; If it dies, I can spend 8 hours and 25 gp to bring it back" +
			"\n\u2022 " + "My companion uses my Proficiency Bonus instead of its own and also adds it to AC & damage" +
			"\n\u2022 " + "My companion gains a Hit Dice for every ranger level I gain after 3rd" +
			"\n\u2022 " + "My companion can divide 2 points among its ability scores (to max 20) whenever I gain an ASI" +
			"\n\u2022 " + "My companion is proficient in two skills of my choice, as well as all saving throws" +
			"\n\u2022 " + "My companion obeys my commands as best it can, or act on its own if I can't command it" +
			"\n\u2022 " + "My companion rolls for initiative and takes actions as normal, but can't use Multiattack" +
			"\n\u2022 " + "When moving stealthily together with only my companion, we can move at a normal pace" +
			"\n\u2022 " + "My companion gains a bonus on damage rolls against my favored enemies just like me",
		actions : [],
	},
	mechanicalserv : {
		featurestring : "",
		string : "Artificer's Mechanical Servant (UA:A 4):" +
			"\n\u2022 " + "The mechanical servant has the statistics of a chosen large beast of challenge rating 2 or lower" +
			"\n  " + "It has the Construct type, understands any language that I know, and has 60 ft Darkvision" +
			"\n  " + "In addition, it is immune to poison damage, being poisoned, and being charmed" +
			"\n\u2022 " + "I can have one servant at a time; If it dies, I can repair it or create a new one" +
			"\n  " + "I can repair the servant over the course of a long rest, which restores it to 1 HP" +
			"\n  " + "I can build a new servant by spending 8 hours a day for 7 days and 1000 gp of materials" +
			"\n\u2022 " + "The servant rolls initiative and takes actions as normal, obeying my commands as best it can" +
			"\n\u2022 " + "As a reaction when I am attacked in melee and my mechanical servant is within 5 ft of me," +
			"\n  I can command the servant to use its reaction to make a melee attack against the attacker",
		actions : [["reaction", "Mechanical Servant (if attacked)"]],
	},
};

//list of recommended fonts and there size to use
var FontList = {
	"SegoePrint" : !typePF ? 5.74 : 6.3,
	"SegoeUI" : !typePF ? 6.35 : 7,
	"SegoeUI-Semibold" : !typePF ? 6.3 : 6.9,
	"Garamond" : !typePF ? 7.7 : 8.45,
	"TimesNewRoman" : !typePF ? 7.4 : 8.1,
	"Calibri" : !typePF ? 7.47 : 8.2,
}

//list of field names that correspond to the name of the bookmark
var BookMarkList = {
	"CSfront" : "Show Buttons",
	"CSback" : "Background Menu",
	"ASfront" : !typePF ? "Text.Header.Status" : "Extra.Notes",
	"ASoverflow" : "Extra.Magic Item " + (FieldNumbers.magicitemsD + 1),
	"ASbackgr" : !typePF ? "Text.Header.Background2" : "Sex",
	"AScomp" : "Comp.Desc.Name",
	"ASnotes" : "Notes.Left",
	"WSfront" : "Wildshapes.Settings",
	"ALlog" : "AdvLog.Options",
	"SSfront" : "spells.name.0",
	"SSmore" : "spells.name.0", //maak dit hetzelfde als SSfront, zodat het gedetecteerd wordt alsof deze zichtbaar is wanneer SSfront zichtbaar is en er vervolgens alleen clones worden toegevoegd i.p.v. het origineel
	"PRsheet" : "PRsheet.toFocus",
	
	"CSfront_Bookmarks" : tDoc.bookmarkRoot.children[0].children[0],
	"CSback_Bookmarks" : tDoc.bookmarkRoot.children[0].children[1],
	"ASfront_Bookmarks" : tDoc.bookmarkRoot.children[0].children[2],
	"ASoverflow_Bookmarks" : tDoc.bookmarkRoot.children[0].children[3],
	"ASbackgr_Bookmarks" : tDoc.bookmarkRoot.children[0].children[4],
	"AScomp_Bookmarks" : tDoc.bookmarkRoot.children[0].children[5],
	"ASnotes_Bookmarks" : tDoc.bookmarkRoot.children[0].children[6],
	"WSfront_Bookmarks" : tDoc.bookmarkRoot.children[0].children[7],
	"SSfront_Bookmarks" : tDoc.bookmarkRoot.children[0].children[8],
	"ALlog_Bookmarks" : tDoc.bookmarkRoot.children[0].children[9],
	"PRsheet_Bookmarks" : tDoc.bookmarkRoot.children[0].children[10],
	
	"Character sheet front" : !typePF ? "Text.Level" : "Show Buttons",
	"Level / Character Attributes" : "Character Level",
	"Character Information" : "PC Name.0",
	"Abilities " : "Str",
	"Saving Throws" : "Saving Throw advantages / disadvantages",
	"HP / Proficiency Bonus / AC" : "HP Max",
	"Armor" : "AC Armor Description",
	"Saving Throw Advantages / Disadvantages" : "Saving Throw advantages / disadvantages",
	"Ability save DC" : "Spell save DC 1",
	"Proficiency Bonus / Inspiration" : "Proficiency Bonus",
	"Proficiencies " : "Language 1",
	"Senses" : "Vision",
	"Limited Features" : "Limited Feature 1",
	"Skills " : "Acr",
	"Combat" : "Text.Header.Combat",
	"Initiative / Speed" : "Initiative bonus",
	"Defense / Health" : "HP Current",
	"Attacks / Actions" : "Attack.1.Weapon Selection",
	"Actions" : "Action 1",
	"Attacks " : "Attack.1.Weapon Selection",
	
	"Character sheet back" : !typePF ? "Text.Header.Features" : "Background Menu",
	"Features " : "Text.Header.Features",
	"Racial Traits" : "Racial Traits",
	"Class Features" : "Class Features",
	"Background Feature" : "Background Feature",
	"Proficiencies" : "Text.Header.Proficiencies",
	"Background " : "Text.Header.Background",
	"Background Traits" : "Background Menu",
	"Personality Trait" : "Personality Trait",
	"Ideal" : "Ideal",
	"Bond" : "Bond",
	"Flaw" : "Flaw",
	"Feats" : !typePF ? "Feat Name 1" : "Feat Name 1.1",
	"Equipment" : "Adventuring Gear Row 1",
	"Coins, Gems, and other Valuables" : "Valuables1",
	
	"Additional sheet" : !typePF ? "Text.Header.Status.1" : "Extra.Notes.1",
	"Additional sheet_template" : "ASfront",
	"Status" : "Text.Header.Status.1",
	"Exhaustion" : "Extra.Exhaustion Level 1.1",
	"Conditions" : "Extra.Condition 1.1",
	"Combat Rules / Notes" : "Extra.Notes.1",
	"Notes  " : "Extra.Notes.1",
	"Possessions" : "Text.Header.Possessions.1",
	"Magic Items" : "Extra.Magic Item 1.1",
	"Extra Equipment" : "Extra.Gear Row 1.1",
	"Other Holdings" : "Extra.Other Holdings.1",
	
	"Overflow sheet" : "Extra.Magic Item " + (FieldNumbers.magicitemsD + 1) + ".1",
	"Overflow sheet_template" : "ASoverflow",
	"Magic Items " : "Extra.Magic Item " + (FieldNumbers.magicitemsD + 1) + ".1",
	"Feats " : "Feat Name " + (FieldNumbers.feats - 3) + ".1",
	"Limited Features " : "Limited Feature 9.1",
	"Actions " : "Action " + (FieldNumbers.trueactions - 5) + ".1",
	"Proficiencies " : "MoreProficiencies.1",
	
	"Background sheet" :  !typePF ? "Text.Header.Background2.1" : "Sex.1",
	"Background sheet_template" : "ASbackgr",
	"Character Description" : "Sex.1",
	"Background" : "Text.Header.Background2.1",
	"Character History" : "Background_History.1",
	"Character Portrait" : "Portrait.1",
	"Appearance" : "Background_Appearance.1",
	"Enemies" : "Background_Enemies.1",
	"Allies & Organizations" :  !typePF ? "Symbol.1" : "Background_Organisation.Left.1",
	"Organization Symbol" : "Symbol.1",
	"Lifestyle" : "Lifestyle.1",
	
	"Companion sheet" : "Companion.Options.1",
	"Companion sheet_template" : "AScomp",
	"Descriptive Header" : "Comp.Type.1",
	"Abilities" : "Comp.Use.Ability.Str.Score.1",
	"Skills" : "Comp.Use.Skills.Acr.Mod.1",
	"Attacks" : "Comp.Use.Attack.1.Weapon Selection.1",
	"Initiative" : "Comp.Use.Combat.Init.Mod.1",
	"Initiative / Speed / HD" : "Comp.Use.Combat.Init.Mod.1",
	"Speed" : "Comp.Use.Speed.1",
	"AC / Prof Bonus / HP" : "Comp.Use.AC.1",
	"Defense" : "Comp.Use.AC.1",
	"Health" : "Comp.Use.HP.Current.1",
	"Features" : "Comp.Use.Features.1",
	"Proficiency Bonus" : "Comp.Use.Proficiency Bonus.1",
	"Traits" : "Comp.Use.Traits.1",
	"Notes " : "Cnote.Left.1",
	
	"Notes sheet" : "Notes.Left.1",
	"Notes sheet_template" : "ASnotes",
	"Notes" : "Notes.Left.1",
	
	"Wild Shapes" : "Wildshapes.Settings.1",
	"Wild Shapes_template" : "WSfront",
	"Wild Shape 1" : "Wildshape.Race.1.1",
	"Wild Shape 2" : "Wildshape.Race.2.1",
	"Wild Shape 3" : "Wildshape.Race.3.1",
	"Wild Shape 4" : "Wildshape.Race.4.1",
	
	"Spell Sheets" : "spells.name.0",
	"Spell Sheets_template" : "SSfront",
	
	"Adventurers Logsheet" : "AdvLog.Options.1",
	"Adventurers Logsheet_template" : "ALlog",
	"Logsheet Entry 1" : "Text.AdvLog.1.1",
	"Logsheet Entry 2" : "Text.AdvLog.2.1",
	"Logsheet Entry 3" : "Text.AdvLog.3.1",
	"Logsheet Entry 4" : "Text.AdvLog.4.1",
	"Logsheet Entry 5" : "Text.AdvLog.5.1",
	"Logsheet Entry 6" : "Text.AdvLog.6.1",
	"Logsheet Entry 7" : "Text.AdvLog.7.1",
	
	"Reference Sheet" : "PRsheet.toFocus.1",
	"Reference Sheet_template" : "PRsheet",
};

var TemplateDep = {
	"ASfront" : [],
	"ASoverflow" : ["ASfront"],
	"ASbackgr" : ["ASoverflow", "ASfront"],
	"AScomp" : ["ASbackgr", "ASoverflow", "ASfront"],
	"ASnotes" : ["AScomp", "ASbackgr", "ASoverflow", "ASfront"],
	"WSfront" : ["ASnotes", "AScomp", "ASbackgr", "ASoverflow", "ASfront"],
	"SSfront" : ["WSfront", "ASnotes", "AScomp", "ASbackgr", "ASoverflow", "ASfront"],
	"SSmore" : ["SSfront", "WSfront", "ASnotes", "AScomp", "ASbackgr", "ASoverflow", "ASfront"],
	"ALlog" : ["SSmore", "SSfront", "WSfront", "ASnotes", "AScomp", "ASbackgr", "ASoverflow", "ASfront"],
	"PRsheet" : ["ALlog", "SSmore", "SSfront", "WSfront", "ASnotes", "AScomp", "ASbackgr", "ASoverflow", "ASfront"],
}

var TemplateResetRanges = {
	"AScomp" : ["Comp", "Text.Comp", "Companion", "Cnote", "BlueText.Comp"],
	"ASnotes" : ["Notes"],
	"WSfront" : ["Wildshape.Race"],
	"ALlog" : ["AdvLog", "Text.AdvLog"],
}

var thermoCount = [];
var thermoDur = {};
var IsSubclassException = {};

var factionRanks = {
	"emeraldenclave" : [
		"",
		"Springwarden (rank 1)",
		"Summerstrider (rank 2)",
		"Autumnreaver (rank 3)",
		"Winterstalker (rank 4)",
		"Master of the Wild (rank 5)"
		],
	"harpers" : [
		"",
		"Watcher (rank 1)",
		"Harpshadow (rank 2)",
		"Brightcandle (rank 3)",
		"Wise Owl (rank 4)",
		"High Harper (rank 5)"
		],
	"lordsalliance" : [
		"",
		"Cloak (rank 1)",
		"Redknife (rank 2)",
		"Stingblade (rank 3)",
		"Warduke (rank 4)",
		"Lioncrown (rank 5)"
		],
	"ordergauntlet" : [
		"",
		"Chevall (rank 1)",
		"Marcheon (rank 2)",
		"Whitehawk (rank 3)",
		"Vindicator (rank 4)",
		"Righteous Hand (rank 5)"
		],
	"zhentarim" : [
		"",
		"Fang (rank 1)",
		"Wolf (rank 2)",
		"Viper (rank 3)",
		"Ardragon (rank 4)",
		"Dread Lord (rank 5)"
		]
}

var LinkDMsGuild = {
	character : {
		PF : "186823",
		CF : "193053"
	},
	spell : {
		PF : "187619",
		CF : "193298"
	},
	advlog : {
		PF : "194068",
		CF : "194069"
	}
};

var cantripDie = levels.map(function (n) {
	if (n < 5) return 1;
	if (n < 11) return 2;
	if (n < 17) return 3;
	return 4;
});