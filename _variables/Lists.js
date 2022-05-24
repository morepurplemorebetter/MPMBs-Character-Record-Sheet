// First some global variables that can be set by custom scripts (are otherwise never changed)
var ignorePrereqs = false; // whether or not to consider the prerequisites for class features, feats, and prestige classes
var ignoreSearchLength = false; // whether or not to consider the length of the names for regExpSearch objects. If set to true, the sheet uses only the date of the source
var ignoreDuplicates = false; // whether or not to allow duplicates of feats and magic items

// A function to load all the variables not stored in the sheet, but generated dynamically
function getDynamicFindVariables() {
	FindClasses();
	FindRace();
	FindCompRace();
	FindWeapons();
	FindCompWeapons();
	FindArmor();
	FindBackground();
	FindFeats();
	FindMagicItems();
}

// A function to create/reset the basic lists for the sheet to use. Things can subsequently be added to the created lists using custom scripts.
function InitiateLists() {
	var lists = [
		"BackgroundList",
		"BackgroundSubList",
		"BackgroundFeatureList",
		"ClassList",
		"ClassSubList",
		"CompanionList",
		"CreatureList",
		"FeatsList",
		"MagicItemsList",
		"ArmourList",
		"WeaponsList",
		"AmmoList",
		"PacksList",
		"GearList",
		"ToolsList",
		"RaceList",
		"RaceSubList",
		"SourceList",
		"SpellsList",
		"PsionicsList",
		"spellLevelList",
		"spellSchoolList"
	];
	for (i = 0; i < lists.length; i++) {
		if (tDoc["Base_" + lists[i]]) {
			tDoc[lists[i]] = newObj(tDoc["Base_" + lists[i]]);
		} else {
			tDoc[lists[i]] = {};
		};
	};
	// now add the armours/weapons/ammunitions added by features
	if (CurrentVars.extraArmour) {
		for (var anArmour in CurrentVars.extraArmour) {
			ArmourList[anArmour] = CurrentVars.extraArmour[anArmour];
		}
	}
	if (CurrentVars.extraWeapons) {
		for (var anWeapon in CurrentVars.extraWeapons) {
			WeaponsList[anWeapon] = CurrentVars.extraWeapons[anWeapon];
		}
	}
	if (CurrentVars.extraAmmo) {
		for (var anAmmo in CurrentVars.extraAmmo) {
			AmmoList[anAmmo] = CurrentVars.extraAmmo[anAmmo];
		}
	}
	if (CurrentVars.extraCreatures) {
		for (var aCrea in CurrentVars.extraCreatures) {
			CreatureList[aCrea] = CurrentVars.extraCreatures[aCrea];
		}
	}
};

// A function to generate the spell variables after running imported scripts
function spellsAfterUserScripts(reDoAllSpells) {
	if (tDoc.info.AdvLogOnly) return;
	amendPsionicsToSpellsList();
	setSpellVariables(reDoAllSpells);
};

function setGlobalVars() {
	tDoc.typePF = (/printer friendly/i).test(tDoc.info.SheetType);
	tDoc.typeA4 = (/a4/i).test(tDoc.info.SheetType);
	tDoc.typeLR = (/letter/i).test(tDoc.info.SheetType);
	tDoc.minVer = tDoc.info.SpellsOnly || tDoc.info.AdvLogOnly;
	tDoc.semVers = getSemVers(tDoc.info.SheetVersion, tDoc.info.SheetVersionType, tDoc.info.SheetVersionBuild);
	tDoc.sheetVersion = semVersToNmbr(semVers);
	tDoc.isWindows = app.platform === "WIN";
	tDoc.patreonVersion = tDoc.getField("SaveIMG.Patreon").submitName === "";
	if (minVer) sentientItemConflictTxt = "";
}
setGlobalVars();

var UnitsList = {
	metric : {
		mass : 0.5,
		'length' : 0.3,
		lengthInch : 2.5,
		volume : 0.03,
		surface : 0.1,
		distance : 1.6,
		liquid : 4,
		liquidQuart : 1
	},
	metricExact : {
		mass : 0.45359237,
		'length' : 0.3048,
		lengthInch : 2.54,
		volume : 0.028316846592,
		surface : 0.09290304,
		distance : 1.609344,
		liquid : 3.785411784,
		liquidQuart : 0.94635295
	}
}

var AbilityScores = {
	abbreviations : ["Str", "Dex", "Con", "Int", "Wis", "Cha"],
	fields : {str : "Str", dex : "Dex", con : "Con", 'int' : "Int", wis : "Wis", cha : "Cha", hos : "HoS", hon : "HoS", san : "HoS"},
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
	"improvements" : {
		"classlvl" : "",
		"classprime" : "",
		"classmulti" : "",
		"racefeats" : ""
	}
};

var Menus = {
	"inventory" : "",
	"background" : "",
	"classfeatures" : "",
	"classfeatures_tempClassesKnown" : [],
	"chooselayers" : "",
	"gear" : "",
	"gearline" : "",
	"magicitems" : "",
	"color" : "",
	"raceoptions" : "",
	"faqextended" : "",
	"faq" : [{
			cName : "Go to the online FAQ (more up to date)",
			cReturn : "faq#online"
		}, {
			cName : "Open the built-in FAQ.pdf",
			cReturn : "faq#pdf"
		}, {
			cName : "-"
		}, {
			cName : "See the license used for distributing WotC material (SRD)",
			cReturn : "faq#ogl"
		}, {
			cName : "See the license under which this document is distributed",
			cReturn : "faq#gplv3"
		}],
	"importscripts" : [{
			cName : "Import a file with additional material",
			cReturn : "go#script#file"
		}, {
			cName : "Add material manually (copy-paste)",
			cReturn : "go#script#manual"
		}, {
			cName : "-"
		}, {
			cName : "Don't know how this works? Click here to learn more!",
			cReturn : "go#script#onlinehelp"
		}, {
			cName : "Find more content online...",
			cReturn : "go#script#content"
		}],
	"importexport" : [{
			cName : "Add homebrew material (custom script)",
			oSubMenu : []
		}, {
			cName : "-"
		}, {
			cName : "Import a character directly from another MPMB's Character Sheet PDF",
			cReturn : "go#direct"
		}, {
			cName : "-"
		}, {
			cName : "Import/Export using files (depreciated, no longer support)",
			oSubMenu : [{
				cName : "Import .xfdf file",
				cReturn : "go#import#xfdf"
			}, {
				cName : "Export .xfdf file",
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
					cName : "-"
				}, {
					cName : "Export .xfdf file of all fields",
					cReturn : "go#export#all"
				}]
			}]
		}],
	"contact" : [{
		cName : "MPMB's website",
		cReturn : "contact#website"
	}, {
		cName : "MPMB's Patreon",
		cReturn : "contact#patreon"
	}, {
		cName : "-"
	}, {
		cName : "Report a bug or request a feature (on Discord)",
		cReturn : "contact#bug"
	}, {
		cName : "-"
	}, {
		cName : "Reddit community",
		cReturn : "contact#reddit"
	}, {
		cName : "Discord server",
		cReturn : "contact#discord"
	}, {
		cName : "-"
	}, {
		cName : "GitHub",
		cReturn : "contact#github"
	}, {
		cName : "Twitter",
		cReturn : "contact#twitter"
	}],
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
	"adventureLeague" : "",
	"sources" : "",
	"unicode" : ""
};
Menus.importexport[0].oSubMenu = Menus.importscripts;

var GearMenus = {
	gear : "",
	tools : "",
	packs : ""
}

var classes = {
	field : "",
	parsed : [],
	known : {},
	old : {},
	hd : [],
	hp : 0,
	attacks : 1,
	totallevel : 0, // classes.parsed.reduce(function(acc, val) { return acc + val[1]; }, 0);
	primary : "",
	oldprimary : "",
	spellcastlvl : {default : 0, warlock : 0},
	oldspellcastlvl : {default : 0, warlock : 0}
};

var CurrentUpdates = {types : []}; // if changed, also change it in ResetAll()
var CurrentClasses = {};
var CurrentBackground = {};
var CurrentRace = {};
var CurrentCompRace = {};
var CurrentSpells = {};
var CurrentCasters = {};
var CurrentSources = {firstTime : true, globalExcl : [], globalKnown : []};
var CurrentEvals = {};
var CurrentScriptFiles = {};
var CurrentVars = { manual : {} };
var UpdateSpellSheets = {};
var CurrentFeatureChoices = {};
var CurrentStats = {};
var CurrentAbilitySaveDCs = {};

var CurrentArmour = {
	field : "",
	known : "",
	mod : "",
	dex : "",
	magic : 0
};

var CurrentShield = {
	field : "",
	magic : 0
};

var CurrentWeapons = {
	field : [],
	known : [],
	compField : {},
	compKnown : {},
	offHands : []
};

var CurrentFeats = {
	known : [],
	choices : [],
	level : !minVer && What("Character Level") ? Number(What("Character Level")) : 1
};

var CurrentMagicItems = {
	known : [],
	choices : [],
	level : CurrentFeats.level
};

var CurrentProfs = { // Also change field defaultValue!
	skill : {},
	armour : {},
	weapon : {},
	save : {},
	resistance : {},
	language : {},
	tool : {},
	savetxt : {},
	vision : {},
	speed : {},
	specialarmour : {},
	carryingcapacity : {},
	advantage : {}
};

var thermoCount = [], thermoDur = {};
var calcStartSet = false, thermoStopSet = false;
var ChangesDialogSkip = {};
var IsSubclassException = {};
var IsNotReset = true;
var IsNotImport = true;
var IsNotFeatMenu = true;
var IsNotMagicItemMenu = true;
var IsNotWeaponMenu = true;
var IsNotConditionSet = true;
var IsNotUserScript = true;
var IsSetDropDowns = false;
var IsCharLvlVal = false;

var FieldsRemember = [];

var FieldNumbers = {
	actions : typeLR ? 11 : 12,
	trueactions : typePF ? 12 : (typeA4 ? 22 : 20),
	attacks : typeA4 ? 6 : 5,
	feats : typeA4 ? 9 : 8,
	featsD : typeA4 ? 5 : 4,
	langstools : typeA4 ? 8 : 6,
	spells : typePF ? [55, 70] : (typeA4 ? [66, 77] : [61, 72]),
	logs : typePF ? 6 : 7,
	magicitems : typePF ? 12 : (typeA4 ? 15 : 14),
	magicitemsD : typePF ? 5 : 6,
	gear : typePF ? 54 : 46,
	extragear : typePF ? 36 : 42,
	gearMIrow : typePF ? 51 : 43,
	compgear : typePF ? 17 : 24,
	limfea : 16
}

var ExperiencePointsList = ["", 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000, 1000000000];
var levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var ProficiencyBonusList = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];
var cantripDie = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4];

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
		"Tool"
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
		"Tool"
	],
	values : {}
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
	}
};

var Lifestyles = {
	types : [
		"",
		"wretched",
		"squalid",
		"poor",
		"modest",
		"comfortable",
		"wealthy",
		"aristocratic"
	],
	expenses : [
		"",
		"\u2014",
		"1 sp",
		"2 sp",
		"1 gp",
		"2 gp",
		"4 gp",
		"10 gp min."
	],
	names : [
		"",
		(typePF ? " " : "") + "Wretched",
		(typePF ? "  " : "") + "Squalid",
		(typePF ? "     " : "") + "Poor",
		(typePF ? "   " : "") + "Modest",
		(typePF ? " " : "") + "Comfortable",
		(typePF ? "   " : "") + "Wealthy",
		"Aristocratic",
	]
};

var Alignments = [
	"Lawful Good",
	"Neutral Good",
	"Chaotic Good",
	"Lawful Neutral",
	"Neutral",
	"Chaotic Neutral",
	"Lawful Evil",
	"Neutral Evil",
	"Chaotic Evil"
];

var AmmoIcons = {
	"Arrows" : {
		checks : [".Top", ".Base"],
		display : 20
	},
	"Axes" : {
		checks : [".Top.Axe", ".Base.Axe"],
		display : 8
	},
	"Bullets" : {
		checks : [".Bullet"],
		display : 50
	},
	"Daggers" : {
		checks : [".Top"],
		display : 10
	},
	"Flasks" : {
		checks : [".Top", ".Base"],
		display : 20
	},
	"Hammers" : {
		checks : [".Top.Axe", ".Base.Axe"],
		display : 8
	},
	"Spears" : {
		checks : [".Base"],
		display : 10
	},
	"Vials" : {
		checks : [".Top", ".Base"],
		display : 20
	}
}

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
	bSSfront : false,
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
	aSSfront : false,
	aPRsheet : false,
	aASoverflow : false,

	//when starting the dialog
	initialize : function (dialog) {
		dialog.load({
			"img1" : allIcons.print,
			"Pag1" : this.bCSfront,
			"Pag2" : this.bCSback,
			"Pag3" : this.bASfront,
			"Pag4" : this.bASbackgr,
			"Pag5" : this.bAScomp,
			"Pag6" : this.bASnotes,
			"Pag7" : this.bWSfront,
			"Pag8" : this.bALlog,
			"Pag9" : this.bSSfront,
			"Pag0" : this.bPRsheet,
			"Pa10" : this.bASoverflow,
			"Hide" : this.bHide
		});

		if (this.bDupl) {
			dialog.load({
				"dupl" : true
			});
		} else {
			dialog.load({
				"sing" : true
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
			"Pag9" : this.aSSfront,
			"Pag0" : this.aPRsheet,
			"Pa10" : this.aASoverflow
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
		this.bSSfront = oResult["Pag9"];
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
						char_width : 30,
						name : "Choose the pages you want to print"
					}]
				}, {
					type : "static_text",
					item_id : "txt0",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					char_width : 40,
					name : "Please select the pages you want to print or save for future use.\n\nThe values you enter here will be remembered for the next time you push the \"Print\" button in the \"JavaScript Window\" or bookmarks section.\n\nNote that what you do here will have no effect on 'normal' print commands (i.e. using the file menu or Ctrl+P)."
				}, {
					type : "cluster",
					align_children : "align_distribute",
					elements : [{
						type : "view",
						elements : [{
							type : "check_box",
							item_id : "Pag1",
							name : "Page 1: Essentials"
						}, {
							type : "check_box",
							item_id : "Pag2",
							name : "Page 2: Features/equipment"
						}, {
							type : "check_box",
							item_id : "Pag3",
							name : (typePF ? "Feats" : "Conditions") + "/magic items page"
						}, {
							type : "check_box",
							item_id : "Pa10",
							name : "Overflow page"
						}, {
							type : "check_box",
							item_id : "Pag9",
							name : "Spell Sheet(s)"
						}]
					}, {
						type : "view",
						elements : [{
							type : "check_box",
							item_id : "Pag4",
							name : "Background page"
						}, {
							type : "check_box",
							item_id : "Pag5",
							name : "Companion page(s)"
						}, {
							type : "check_box",
							item_id : "Pag6",
							name : "Notes page(s)"
						}, {
							type : "check_box",
							item_id : "Pag7",
							name : "Wild Shapes page(s)"
						}, {
							type : "check_box",
							item_id : "Pag8",
							name : "Adventurers Logsheet(s)"
						}, {
							type : "check_box",
							item_id : "Pag0",
							name : "Reference sheet"
						}]
					}]
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
							name : "Duplex printing (both sides)"
						}, {
							type : "radio",
							item_id : "sing",
							group_id : "prin",
							name : "Simplex printing (single side)"
						}]
					}, {
						type : "view",
						elements : [{
							type : "static_text",
							item_id : "txt1",
							alignment : "align_fill",
							font : "dialog",
							wrap_name : true,
							char_width : 38,
							name : "Note that this cannot be changed in the next dialog, the print pop-up. The selection you make here will always override anything you do in the next dialog or print settings."
						}]
					}]
				},  {
					type : "cluster",
					align_children : "align_distribute",
					elements : [{
						type : "check_box",
						item_id : "Hide",
						name : "Hide all fields as to print a truly empty sheet to fill out by hand"
					}]
				}, {
					type : "gap",
					height : 8
				}]
			}, {
				type : "ok_cancel_other",
				ok_name : "Print",
				other_name : "Remember"
			}]
		}]
	}
};

//The dialog for setting things to be processed manually
var SetToManual_Dialog = {
	//variables to be set by the calling function
	mAtt : false,
	mBac : false,
	mBFe : false,
	mCla : false,
	mFea : false,
	mRac : false,
	mMag : false,

	//when starting the dialog
	initialize : function (dialog) {
		dialog.load({
			"img1" : allIcons.automanual,
			"Atta" : this.mAtt,
			"Back" : this.mBac,
			"BaFe" : this.mBFe,
			"Clas" : this.mCla,
			"Feat" : this.mFea,
			"Item" : this.mMag,
			"Race" : this.mRac
		});
	},

	//when pressing the ok button
	commit : function (dialog) {
		var oResult = dialog.store();
		this.mAtt = oResult["Atta"];
		this.mRac = oResult["Race"];
		this.mBac = oResult["Back"];
		this.mBFe = oResult["BaFe"];
		this.mCla = oResult["Clas"];
		this.mFea = oResult["Feat"];
		this.mMag = oResult["Item"];
	},

	description : {
		name : "Choose the functions you want to set to manual",
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
						item_id : "head",
						alignment : "align_fill",
						font : "heading",
						bold : true,
						height : 21,
						char_width : 35,
						name : "Choose the functions you want to set to manual"
					}]
				}, {
					type : "static_text",
					item_id : "text",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					char_width : 40,
					name : "Here you can select the functions of this sheet that you want to be done manually instead of calculated (which is the default setting).\n\nSimply check of any items you want to set to manual and press \"Apply\".\n\nIf some items are already set to manual, simply uncheck the box, press \"Apply\", and that feature will be calculated and added to the sheet immediately."
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
								char_width : 15
							}, {
								type : "static_text",
								item_id : "tAtt",
								name : "No drop-down box; to hit and damage are calculated manually"
							}]
						}, {
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Back",
								name : "Background",
								char_width : 15
							}, {
								type : "static_text",
								item_id : "tBac",
								name : "Do nothing when changing the background"
							}]
						}, {
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "BaFe",
								name : "Background Feature",
								char_width : 15
							}, {
								type : "static_text",
								item_id : "tBaF",
								name : "Do nothing when changing the background feature"
							}]
						}, {
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Clas",
								name : "Class",
								char_width : 15
							}, {
								type : "static_text",
								item_id : "tCla",
								name : "Do nothing when changing the class or level"
							}]
						}, {
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Feat",
								name : "Feats",
								char_width : 15
							}, {
								type : "static_text",
								item_id : "tFea",
								name : "Disable auto-calculation and auto-fill for feats"
							}]
						}, {
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Item",
								name : "Magic Items",
								char_width : 15
							}, {
								type : "static_text",
								item_id : "tFea",
								name : "Disable auto-calculation and auto-fill for magic items"
							}]
						}, {
							type : "view",
							align_children : "align_row",
							char_height : 2,
							char_width : 38,
							elements : [{
								type : "check_box",
								item_id : "Race",
								name : "Race",
								char_width : 15
							},  {
								type : "static_text",
								item_id : "tRac",
								name : "Do nothing when changing the race"
							}]
						}]
					}]
				}, {
					type : "gap",
					height : 8
				}]
			}, {
				type : "ok_cancel",
				ok_name : "Apply"
			}]
		}]
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
	}, //642481 //rgb(100,35,129)
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
	} //f39200
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
	yellow : ["CMYK", 0, 0.5, 1, 0.5] //935b00
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
	yellow : ["CMYK", 0, 0.38, 0.82, 0] //f8ad3c
}

//The dialog for setting the unit system and decimal
var SetUnitDecimals_Dialog = {
	//variables to be set by the calling function
	bSys : "imperial",
	bDec : "dot",

	//when starting the dialog
	initialize : function (dialog) {
		var isImp = this.bSys === "imperial";
		var isDot = this.bDec === "dot";
		dialog.load({
			"img1" : allIcons.unitsystem,
			"SyIm" : isImp,
			"SyMe" : !isImp,
			"DeDo" : isDot,
			"DeCo" : !isDot
		});
	},

	//when pressing the ok button
	commit : function (dialog) {
		var oResult = dialog.store();
		this.bSys = oResult["SyIm"] ? "imperial" : "metric";
		this.bDec = oResult["DeDo"] ? "dot" : "comma";
	},

	description : {
		name : "Choose the unit system and decimal separator",
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
						item_id : "head",
						alignment : "align_fill",
						font : "title",
						bold : true,
						wrap_name : true,
						width : 480,
						name : "Choose the unit system and decimal separator"
					}]
				}, {
					type : "static_text",
					item_id : "txt0",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					width : 480,
					name : "Any changes you make will be applied immediately to all fields that would logically be impacted by them.\nThe conversion is not completely accurate, as some accuracy is sacrificed for numbers that are easier to use during play."
				}, {
					type : "static_text",
					item_id : "txt1",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					width : 480,
					name : " \u2022 Distances in game mechanics are converted as if 1 ft is 30 cm"+
					"\n \u2022 Weights in game mechanics are converted as if 2 lb is 1 kg"+
					"\n \u2022 Liquid volumes in game mechanics are converted as if 1 gallon is 4 liters"+
					"\n \u2022 Converted units in game mechanics are rounded to the nearest half"+
					"\n \u2022 Equipment weight is calculated to three decimals accuracy"+
					"\n \u2022 The Character's Height and Weight fields are converted with more accuracy"+
					"\n \u2022 Units you added manually might not be converted as not all unit conversions are supported"
				}, {
					type : "static_text",
					item_id : "txt2",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					width : 480,
					name : "Any features that auto-fill will recognize these settings and use them to update the sheet, so you only have to set this once.\nThe Spell Sheet can't be flawlessly changed from one unit system to another on the fly. Changing unit systems is best done before generating a Spell Sheet.\nFields that are never auto-filled by sheet automation, such as the character history or notes, will not be changed."
				}, {
					type : "view",
					align_children : "align_row",
					aligment : "align_center",
					width : 480,
					elements : [{
						type : "cluster",
						align_children : "align_left",
						font : "heading",
						bold : true,
						name : "Unit System",
						elements : [{
							type : "radio",
							item_id : "SyIm",
							group_id : "Syst",
							name : "Imperial"
						}, {
							type : "radio",
							item_id : "SyMe",
							group_id : "Syst",
							name : "Metric"
						}]
					}, {
						type : "gap",
						char_width : 3
					}, {
						type : "cluster",
						align_children : "align_left",
						font : "heading",
						bold : true,
						name : "Decimal Separator",
						elements : [{
							type : "radio",
							item_id : "DeDo",
							group_id : "Deci",
							name : "Dot (and comma as thousands separator)"
						}, {
							type : "radio",
							item_id : "DeCo",
							group_id : "Deci",
							name : "Comma (and dot as thousands separator)"
						}]
					}]
				}, {
					type : "gap",
					height : 8
				}]
			}, {
				type : "ok_cancel"
			}]
		}]
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
			"img1" : allIcons.textsize,
			"StSz" : this.bDefSize.toString(),
			"sOSi" : this.bSize.toString(),
			"fAlS" : this.bFontsArray,
			"fStS" : this.bDefFont
		});

		dialog.enable({
			"fStS" : false,
			"StSz" : false
		});

		if (Number(this.bSize) === this.bDefSize) {
			dialog.load({
				"sSta" : true
			});
		} else if (Number(this.bSize) === 0) {
			dialog.load({
				"sAut" : true
			});
		} else {
			dialog.load({
				"sOth" : true
			});
		}

		if (this.bFont === this.bDefFont) {
			dialog.load({
				"fSta" : true
			});
		} else if (this.bFontsArray[this.bFont]) {
			dialog.load({
				"fAlt" : true
			});
		} else {
			dialog.load({
				"fOth" : true,
				"fOtS" : this.bFont
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
		if (isNaN(cResult) && (/,/).test(cResult)) {
			var Parsed = parseFloat(cResult.replace(/,/, "."));
		} else {
			var Parsed = parseFloat(cResult);
		}

		dialog.load({
			"sOth" : true,
			"sOSi" : Parsed.toString()
		});
	},

	fSta : function (dialog) {
		this.bDefSize = this.bDefSizeSheet;
		dialog.load({
			"StSz" : this.bDefSize.toString()
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
				"StSz" : this.bDefSize.toString()
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
				"StSz" : this.bDefSize.toString()
			});
		} else if (testFont(cResult)) {
			this.bDefSize = FontList[cResult];
			dialog.load({
				"fAlt" : true,
				"StSz" : this.bDefSize.toString()
			});
		} else {
			app.alert({
				cMsg : "The font \"" + cResult + "\" does not appear to be working on your machine.\nEither it isn't spelled in the proper PDSysFont way, or it is not found on your system.\n\nNote that writing a font as a PDSysFont is not straightforward. You can use the names in the drop-down box as a guide (i.e. don't use spaces and pay attention to capitalization).",
				nIcon : 0,
				cTitle : "Error trying to apply the font"
			});
			this.bDefSize = this.bDefSizeSheet;
			dialog.load({
				"fSta" : true,
				"StSz" : this.bDefSize.toString()
			});
		}
	},
	fOth : function (dialog) {
		var cResult = dialog.store()["fOtS"];

		if (cResult === "") {
			this.bDefSize = this.bDefSizeSheet;
			this.fOthTest = false;
			dialog.load({
				"StSz" : this.bDefSize.toString()
			});
		} else if (testFont(cResult)) {
			this.bDefSize = this.bDefSizeSheet;
			this.fOthTest = true;
			dialog.load({
				"StSz" : this.bDefSize.toString()
			});
		} else {
			this.fOthTest = false;
			app.alert({
				cMsg : "The font \"" + cResult + "\" does not appear to be working on your machine.\nEither it isn't spelled in the proper PDSysFont way, or it is not found on your system.\n\nNote that writing a font as a PDSysFont is not straightforward. You can use the names in the drop-down box as a guide (i.e. don't use spaces and pay attention to capitalization).",
				nIcon : 0,
				cTitle : "Error trying to apply the font"
			});
			this.bDefSize = this.bDefSizeSheet;
			dialog.load({
				"fSta" : true,
				"StSz" : this.bDefSize.toString()
			});
		}
	},

	fOtS : function (dialog) {
		var cResult = dialog.store()["fOtS"].replace(/\s+/g, "");

		if (cResult === "") {
			this.bDefSize = this.bDefSizeSheet;
			this.fOthTest = false;
			dialog.load({
				"StSz" : this.bDefSize.toString()
			});
		} else if (testFont(cResult)) {
			this.bDefSize = this.bDefSizeSheet;
			this.fOthTest = true;
			dialog.load({
				"fOth" : true,
				"fOtS" : cResult.toString(),
				"StSz" : this.bDefSize.toString()
			});
		} else {
			this.fOthTest = false;
			app.alert({
				cMsg : "The font \"" + cResult + "\" does not appear to be working on your machine.\nEither it isn't spelled in the proper PDSysFont way, or it is not found on your system.\n\nNote that writing a font as a PDSysFont is not straightforward. You can use the names in the drop-down box as a guide (i.e. don't use spaces and pay attention to capitalization).",
				nIcon : 0,
				cTitle : "Error trying to apply the font"
			});
			this.bDefSize = this.bDefSizeSheet;
			dialog.load({
				"fSta" : true,
				"StSz" : this.bDefSize.toString()
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
						font : "title",
						bold : true,
						height : 21,
						char_width : 40,
						name : "Set the Font and the Font Size"
					}]
				}, {
					type : "static_text",
					item_id : "txt0",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					char_width : 50,
					name : "Below you can set the font size and change the font of all the form fields.\n\nNote that if you use a font of your own choosing (custom font), it might not be possible to align the text properly with the text lines, regardless of the font size you select."
				}, {
					type : "static_text",
					item_id : "txt1",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					char_width : 50,
					name : "The settings for font size will be applied to all text fields that support multiple lines of text. Fields with a single line of text have a font size of 'auto'.\n\nIf you set the font size to 'auto', the text will resize to the size of the field. You can subsequently make the text smaller by entering more text or by entering line breaks."
				}, {
					type : "cluster",
					align_children : "align_left",
					char_width : 50,
					name : "Select the Font",
					font : "heading",
					bold : true,
					elements : [{
						type : "view",
						align_children : "align_distribute",
						height : 23,
						elements : [{
							type : "radio",
							item_id : "fSta",
							group_id : "Font",
							name : "Default font:",
							height : 22
						}, {
							type : "edit_text",
							item_id : "fStS",
							char_width : 8,
							height : 20,
							font : "dialog",
							bold : true
						}]
					}, {
						type : "view",
						align_children : "align_distribute",
						height : 23,
						elements : [{
							type : "radio",
							item_id : "fAlt",
							group_id : "Font",
							name : "Tested font, can be aligned with the lines in Adobe Acrobat:",
							height : 22
						}, {
							type : "popup",
							item_id : "fAlS",
							char_width : 10
						}]
					}, {
						type : "view",
						align_children : "align_distribute",
						height : 23,
						elements : [{
							type : "radio",
							item_id : "fOth",
							group_id : "Font",
							name : "Custom font (using the PDSysFont font name):",
							height : 22
						}, {
							type : "edit_text",
							item_id : "fOtS",
							char_width : 20,
							height : 20
						}]
					}]
				}, {
					type : "cluster",
					align_children : "align_left",
					char_width : 50,
					name : "Select the Font Size",
					font : "heading",
					bold : true,
					elements : [{
						type : "view",
						align_children : "align_row",
						height : 20,
						elements : [{
							type : "radio",
							item_id : "sSta",
							group_id : "Size",
							name : "Standard font size, tested to align with the lines in Adobe Acrobat:"
						}, {
							type : "edit_text",
							item_id : "StSz",
							char_width : 4,
							height : 20,
							font : "dialog",
							bold : true
						}]
					}, {
						type : "view",
						align_children : "align_left",
						height : 20,
						elements : [{
							type : "radio",
							item_id : "sAut",
							group_id : "Size",
							name : "Auto font size. The text will resize to the size of the field."
						}]
					}, {
						type : "view",
						align_children : "align_distribute",
						height : 20,
						elements : [{
							type : "radio",
							item_id : "sOth",
							group_id : "Size",
							name : "Custom font size (use your system's decimal separator):"
						}, {
							type : "edit_text",
							item_id : "sOSi",
							char_width : 4,
							height : 20,
							SpinEdit : true
						}]
					}]
				}, {
					type : "gap",
					height : 8
				}]
			}, {
				type : "ok_cancel"
			}]
		}]
	}
};

var Highlighting = {
	initialState : app.runtimeHighlight,
	initialColor : app.runtimeHighlightColor,
	rememberState : eval_ish(What("Highlighting")),
	rememberColor : tDoc.getField("Highlighting").fillColor
};

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
	[0, 0, 0, 0, 4, 0, 0, 0, 0]
]

var SpellPointsTable = [0, 4, 6, 14, 17, 27, 32, 38, 44, 57, 64, 73, 73, 83, 83, 94 ,94, 107, 114, 123, 133];

//list of recommended fonts and there size to use
var FontList = {
	"SegoePrint" : !typePF ? 5.74 : 6.3,
	"SegoeUI" : !typePF ? 6.35 : 7,
	"SegoeUI-Semibold" : !typePF ? 6.3 : 6.9,
	"Garamond" : !typePF ? 7.7 : 8.45,
	"TimesNewRoman" : !typePF ? 7.4 : 8.1,
	"Calibri" : !typePF ? 7.47 : 8.2
};

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
	"SSmore" : "spells.name.0",
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
	"SSmore_Bookmarks" : tDoc.bookmarkRoot.children[0].children[8],
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

	"Companion sheet" : "Companion.Options",
	"Companion sheet_template" : "AScomp",
	"Descriptive Header" : "Comp.Type",
	"Abilities" : "Comp.Use.Ability.Str.Score",
	"Skills" : "Comp.Use.Skills.Acr.Mod",
	"Attacks" : "Comp.Use.Attack.1.Weapon Selection",
	"Initiative" : "Comp.Use.Combat.Init.Mod",
	"Initiative / Speed / HD" : "Comp.Use.Combat.Init.Mod",
	"Speed" : "Comp.Use.Speed",
	"AC / Prof Bonus / HP" : "Comp.Use.AC",
	"Defense" : "Comp.Use.AC",
	"Health" : "Comp.Use.HP.Current",
	"Features" : "Comp.Use.Features",
	"Proficiency Bonus" : "Comp.Use.Proficiency Bonus",
	"Traits" : "Comp.Use.Traits",
	"Notes " : "Cnote.Left",

	"Notes sheet" : "Notes.Left",
	"Notes sheet_template" : "ASnotes",
	"Notes" : "Notes.Left",

	"Wild Shapes" : "Wildshapes.Settings",
	"Wild Shapes_template" : "WSfront",
	"Wild Shape 1" : "Wildshape.Race.1",
	"Wild Shape 2" : "Wildshape.Race.2",
	"Wild Shape 3" : "Wildshape.Race.3",
	"Wild Shape 4" : "Wildshape.Race.4",

	"Spell Sheets" : "spells.name.0",
	"Spell Sheets_template" : "SSfront",

	"Adventurers Logsheet" : "AdvLog.Options",
	"Adventurers Logsheet_template" : "ALlog",
	"Logsheet Entry 1" : "Text.AdvLog.1",
	"Logsheet Entry 2" : "Text.AdvLog.2",
	"Logsheet Entry 3" : "Text.AdvLog.3",
	"Logsheet Entry 4" : "Text.AdvLog.4",
	"Logsheet Entry 5" : "Text.AdvLog.5",
	"Logsheet Entry 6" : "Text.AdvLog.6",
	"Logsheet Entry 7" : "Text.AdvLog.7",

	"Reference Sheet" : "PRsheet.toFocus.1",
	"Reference Sheet_template" : "PRsheet"
};

var TemplateNames = {
	"CSfront" : "Character sheet front",
	"CSback" : "Character sheet back",
	"ASfront" : (!typePF ? "Conditions / Magic Items" : "Feats / Magic Items") + " sheet (3rd page)",
	"ASoverflow" : "Overflow (magic items, feats, actions, etc.) sheet",
	"ASbackgr" : "Background and Organization sheet",
	"AScomp" : "Companion sheet",
	"ASnotes" : "Notes sheet",
	"WSfront" : "Wild Shapes sheet",
	"ALlog" : "Adventurers Logsheet",
	"SSfront" : "Spell sheet",
	"SSmore" : "Spell sheet",
	"PRsheet" : "Rules Reference sheet"
};

var TemplatesWithExtras = ["AScomp", "ASnotes", "WSfront", "SSfront", "SSmore", "ALlog"];

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
	"PRsheet" : ["ALlog", "SSmore", "SSfront", "WSfront", "ASnotes", "AScomp", "ASbackgr", "ASoverflow", "ASfront"]
};

var TemplateResetRanges = {
	"AScomp" : ["Comp", "Text.Comp", "Companion", "Cnote", "BlueText.Comp"],
	"ASnotes" : ["Notes"],
	"WSfront" : ["Wildshape.Race"],
	"ALlog" : ["AdvLog", "Text.AdvLog"]
};

var factions = {
	"emeraldenclave" : {
		name : "The Emerald Enclave",
		type : "Forgotten Realms",
		ranks : [
			"Springwarden (rank 1)",
			"Summerstrider (rank 2)",
			"Autumnreaver (rank 3)",
			"Winterstalker (rank 4)",
			"Master of the Wild (rank 5)"
		]
	},
	"harpers" : {
		name : "The Harpers",
		type : "Forgotten Realms",
		ranks : [
			"Watcher (rank 1)",
			"Harpshadow (rank 2)",
			"Brightcandle (rank 3)",
			"Wise Owl (rank 4)",
			"High Harper (rank 5)"
		]
	},
	"lordsalliance" : {
		name : "The Lords' Alliance",
		type : "Forgotten Realms",
		ranks : [
			"Cloak (rank 1)",
			"Redknife (rank 2)",
			"Stingblade (rank 3)",
			"Warduke (rank 4)",
			"Lioncrown (rank 5)"
		]
	},
	"ordergauntlet" : {
		name : "The Order of the Gauntlet",
		type : "Forgotten Realms",
		ranks : [
			"Chevall (rank 1)",
			"Marcheon (rank 2)",
			"Whitehawk (rank 3)",
			"Vindicator (rank 4)",
			"Righteous Hand (rank 5)"
		]
	},
	"zhentarim" : {
		name : "The Zhentarim",
		type : "Forgotten Realms",
		ranks : [
			"Fang (rank 1)",
			"Wolf (rank 2)",
			"Viper (rank 3)",
			"Ardragon (rank 4)",
			"Dread Lord (rank 5)"
		]
	},
	"azorius" : {
		name : "Azorius Senate",
		type : "Ravnica",
		ranks : [
			"Official (rank 1)",
			"Authority (rank 2)",
			"Minister, Judge, or Senator (rank 3)",
			"Arbiter (rank 4)"
		]
	},
	"boros" : {
		name : "Boros Legion",
		type : "Ravnica",
		ranks : [
			"Sergeant (rank 1)",
			"Skyknight (special)",
			"Wojek (special)",
			"Brigadier (rank 2)",
			"Sunhome Guard (special)",
			"Captain (rank 3)",
			"Commander (rank 4)"
		]
	},
	"dimir" : {
		name : "House Dimir",
		type : "Ravnica",
		ranks : [
			"Independent Agent",
			"Collector of Secrets",
			"Inner Circle",
			"Guildmaster's Confidant"
		]
	},
	"golgari" : {
		name : "Golgari Swarm",
		type : "Ravnica",
		ranks : [
			"Agent",
			"Monstrous Favors",
			"Ochran (special)",
			"Adviser",
			"High Chancellor",
			"Matka (special)"
		]
	},
	"gruul" : {
		name : "Gruul Clans",
		type : "Ravnica",
		ranks : [
			"Proven",
			"Beast-Friend",
			"Celebrated",
			"Chieftan"
		]
	},
	"izzet" : {
		name : "Izzet League",
		type : "Ravnica",
		ranks : [
			"Researcher (rank 1)",
			"Scorchbringer (special)",
			"Supervisor (rank 2)",
			"Independent Researcher (special)",
			"Director (rank 3)",
			"Advisor (rank 4)"
		]
	},
	"orzhov" : {
		name : "Orzhov Syndicate",
		type : "Ravnica",
		ranks : [
			"Syndic (rank 1)",
			"Knight (rank 2)",
			"Ministrant (rank 3)",
			"Pontiff (rank 4)"
		]
	},
	"rakdos" : {
		name : "Cult of Rakdos",
		type : "Ravnica",
		ranks : [
			"Extra",
			"Sideshow Act",
			"Blood Witch (special)",
			"Star Performer",
			"Ringmaster"
		]
	},
	"selesnya" : {
		name : "Selesnya Conclave",
		type : "Ravnica",
		ranks : [
			"Evangel (special)",
			"Votary (special)",
			"Sagittar (special)",
			"Selesnya Charm",
			"Equenaut (special)",
			"Hierarch (special)",
			"Ledev Guardian (special)",
			"Dignitary (special)"
		]
	},
	"simic" : {
		name : "Simic Combine",
		type : "Ravnica",
		ranks : [
			"Technician (rank 1)",
			"Researcher (rank 2)",
			"Luminary (special)",
			"Project Leader (rank 3)",
			"Clade Leader (rank 4)",
			"Speaker (special)"
		]
	}
}

var LinksLatest = {
	advlog : {
		PF : "http://www.dmsguild.com/product/194068",
		CF : "http://www.dmsguild.com/product/194069"
	},
	character : {
		PF : "https://www.patreon.com/posts/19406992", // while website is not finished "https://flapkan.com/#download",
		CF : "https://www.patreon.com/posts/19406992" // while website is not finished "https://flapkan.com/colourful_character_sheet"
	},
	patreon : "https://flapkan.com/patrons"
};

// A backwards compatible way to call the field content of those that are now part of the CurrentVars object
var BackwardsCompatible = {
	'MakeMobileReady Remember' : "!CurrentVars.mobileset ? '' : CurrentVars.mobileset.active ? true : '';",
	'WhiteoutRemember' : "CurrentVars.whiteout",
	'FontSize Remember' : "CurrentVars.fontsize",
	'Extra.Layers Remember' : 'CurrentVars.vislayers.toString()',
	'BlueTextRemember' : "CurrentVars.bluetxt ? 'Yes' : 'No';",
	'Class Features Remember' : "classFeaChoiceBackwardsComp();",
	'Manual Attack Remember' : "CurrentVars.manual.attacks ? 'No' : 'Yes';",
	'Manual Background Remember' : "CurrentVars.manual.background ? 'No' : 'Yes';",
	'Manual Class Remember' : "CurrentVars.manual.classes ? 'No' : 'Yes';",
	'Manual Feat Remember' : "CurrentVars.manual.feats ? 'No' : 'Yes';",
	'Manual Race Remember' : "CurrentVars.manual.race ? 'No' : 'Yes';"
}

// Define this here (as well) so that it can be used by the Base_ClassList
var Base_spellLevelList = ["Cantrips (0-level)", "1st-level", "2nd-level", "3rd-level", "4th-level", "5th-level", "6th-level", "7th-level", "8th-level", "9th-level", "Talents", "Disciplines"];

var licenseOGL = [
  "OPEN GAME LICENSE Version 1.0a",
  'The following text is the property of Wizards of the Coast, Inc. and is Copyright 2000 Wizards of the Coast, Inc ("Wizards"). All Rights Reserved.',
  '1. Definitions:' + desc(['(a) "Contributors" means the copyright and/or trademark owners who have contributed Open Game Content;',
  '(b) "Derivative Material" means copyrighted material including derivative works and translations (including into other computer languages), potation, modification, correction, addition, extension, upgrade, improvement, compilation, abridgment or other form in which an existing work may be recast, transformed or adapted;',
  '(c) "Distribute" means to reproduce, license, rent, lease, sell, broadcast, publicly display, transmit or otherwise distribute;',
  '(d) "Open Game Content" means the game mechanic and includes the methods, procedures, processes and routines to the extent such content does not embody the Product Identity and is an enhancement over the prior art and any additional content clearly identified as Open Game Content by the Contributor, and means any work covered by this License, including translations and derivative works under copyright law, but specifically excludes Product Identity.',
  '(e) "Product Identity" means product and product line names, logos and identifying marks including trade dress; artifacts; creatures characters; stories, storylines, plots, thematic elements, dialogue, incidents, language, artwork, symbols, designs, depictions, likenesses, formats, poses, concepts, themes and graphic, photographic and other visual or audio representations; names and descriptions of characters, spells, enchantments, personalities, teams, personas, likenesses and special abilities; places, locations, environments, creatures, equipment, magical or supernatural abilities or effects, logos, symbols, or graphic designs; and any other trademark or registered trademark clearly identified as Product identity by the owner of the Product Identity, and which specifically excludes the Open Game Content;',
  '(f) "Trademark" means the logos, names, mark, sign, motto, designs that are used by a Contributor to identify itself or its products or the associated products contributed to the Open Game License by the Contributor',
  '(g) "Use", "Used" or "Using" means to use, Distribute, copy, edit, format, modify, translate and otherwise create Derivative Material of Open Game Content.',
  '(h) "You" or "Your" means the licensee in terms of this agreement.']),
  "2. The License: This License applies to any Open Game Content that contains a notice indicating that the Open Game Content may only be Used under and in terms of this License. You must affix such a notice to any Open Game Content that you Use. No terms may be added to or subtracted from this License except as described by the License itself. No other terms or conditions may be applied to any Open Game Content distributed using this License.",
  "3.Offer and Acceptance: By Using the Open Game Content You indicate Your acceptance of the terms of this License.",
  "4. Grant and Consideration: In consideration for agreeing to use this License, the Contributors grant You a perpetual, worldwide, royalty-free, non-exclusive license with the exact terms of this License to Use, the Open Game Content.",
  "5.Representation of Authority to Contribute: If You are contributing original material as Open Game Content, You represent that Your Contributions are Your original creation and/or You have sufficient rights to grant the rights conveyed by this License.",
  "6.Notice of License Copyright: You must update the COPYRIGHT NOTICE portion of this License to include the exact text of the COPYRIGHT NOTICE of any Open Game Content You are copying, modifying or distributing, and You must add the title, the copyright date, and the copyright holder's name to the COPYRIGHT NOTICE of any original Open Game Content you Distribute.",
  "7. Use of Product Identity: You agree not to Use any Product Identity, including as an indication as to compatibility, except as expressly licensed in another, independent Agreement with the owner of each element of that Product Identity. You agree not to indicate compatibility or co-adaptability with any Trademark or Registered Trademark in conjunction with a work containing Open Game Content except as expressly licensed in another, independent Agreement with the owner of such Trademark or Registered Trademark. The use of any Product Identity in Open Game Content does not constitute a challenge to the ownership of that Product Identity. The owner of any Product Identity used in Open Game Content shall retain all rights, title and interest in and to that Product Identity.",
  "8. Identification: If you distribute Open Game Content You must clearly indicate which portions of the work that you are distributing are Open Game Content.",
  "9. Updating the License: Wizards or its designated Agents may publish updated versions of this License. You may use any authorized version of this License to copy, modify and distribute any Open Game Content originally distributed under any version of this License.",
  "10 Copy of this License: You MUST include a copy of this License with every copy of the Open Game Content You Distribute.",
  "11. Use of Contributor Credits: You may not market or advertise the Open Game Content using the name of any Contributor unless You have written permission from the Contributor to do so.",
  "12 Inability to Comply: If it is impossible for You to comply with any of the terms of this License with respect to some or all of the Open Game Content due to statute, judicial order, or governmental regulation then You may not Use any Open Game Material so affected.",
  "13 Termination: This License will terminate automatically if You fail to comply with all terms herein and fail to cure such breach within 30 days of becoming aware of the breach. All sublicenses shall survive the termination of this License.",
  "14 Reformation: If any provision of this License is held to be unenforceable, such provision shall be reformed only to the extent necessary to make it enforceable.",
  "15 COPYRIGHT NOTICE Open Game License v 1.0 Copyright 2000, Wizards of the Coast, Inc.",
  "System Reference Document 5.1 Copyright 2016, Wizards of the Coast, Inc.; Authors Mike Mearls, Jeremy Crawford, Chris Perkins, Rodney Thompson, Peter Lee, James Wyatt, Robert J. Schwalb, Bruce R. Cordell, Chris Sims, and Steve Townshend, based on original material by E. Gary Gygax and Dave Arneson.",
  "MPMB's Character Record Sheet© Copyright 2014, Joost Wijnen; Flapkan Productions.",
  "END OF LICENSE"
];

var licenseGPLV3 = [
	'GNU General Public License Version 3',
	'The following text is Copyright (C) 2007 Free Software Foundation, Inc. Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.',
	"PREAMBLE\nThe GNU General Public License is a free, copyleft license for software and other kinds of works.\nThe licenses for most software and other practical works are designed to take away your freedom to share and change the works. By contrast, the GNU General Public License is intended to guarantee your freedom to share and change all versions of a program--to make sure it remains free software for all its users. We, the Free Software Foundation, use the GNU General Public License for most of our software; it applies also to any other work released this way by its authors. You can apply it to your programs, too.\nWhen we speak of free software, we are referring to freedom, not price. Our General Public Licenses are designed to make sure that you have the freedom to distribute copies of free software (and charge for them if you wish), that you receive source code or can get it if you want it, that you can change the software or use pieces of it in new free programs, and that you know you can do these things.\nTo protect your rights, we need to prevent others from denying you these rights or asking you to surrender the rights. Therefore, you have certain responsibilities if you distribute copies of the software, or if you modify it: responsibilities to respect the freedom of others.\nFor example, if you distribute copies of such a program, whether gratis or for a fee, you must pass on to the recipients the same freedoms that you received. You must make sure that they, too, receive or can get the source code. And you must show them these terms so they know their rights.\nDevelopers that use the GNU GPL protect your rights with two steps: (1) assert copyright on the software, and (2) offer you this License giving you legal permission to copy, distribute and/or modify it.\nFor the developers' and authors' protection, the GPL clearly explains that there is no warranty for this free software. For both users' and authors' sake, the GPL requires that modified versions be marked as changed, so that their problems will not be attributed erroneously to authors of previous versions.\nSome devices are designed to deny users access to install or run modified versions of the software inside them, although the manufacturer can do so. This is fundamentally incompatible with the aim of protecting users' freedom to change the software. The systematic pattern of such abuse occurs in the area of products for individuals to use, which is precisely where it is most unacceptable. Therefore, we have designed this version of the GPL to prohibit the practice for those products. If such problems arise substantially in other domains, we stand ready to extend this provision to those domains in future versions of the GPL, as needed to protect the freedom of users.\nFinally, every program is threatened constantly by software patents. States should not allow patents to restrict development and use of software on general-purpose computers, but in those that do, we wish to avoid the special danger that patents applied to a free program could make it effectively proprietary. To prevent this, the GPL assures that patents cannot be used to render the program non-free.\nThe precise terms and conditions for copying, distribution and modification follow.",
	"TERMS AND CONDITIONS",
	'0. Definitions:\n"This License" refers to version 3 of the GNU General Public License.\n"Copyright" also means copyright-like laws that apply to other kinds of works, such as semiconductor masks.\n"The Program" refers to any copyrightable work licensed under this License. Each licensee is addressed as "you". "Licensees" and "recipients" may be individuals or organizations.\nTo "modify" a work means to copy from or adapt all or part of the work in a fashion requiring copyright permission, other than the making of an exact copy. The resulting work is called a "modified version" of the earlier work or a work "based on" the earlier work.\nA "covered work" means either the unmodified Program or a work based on the Program.\nTo "propagate" a work means to do anything with it that, without permission, would make you directly or secondarily liable for infringement under applicable copyright law, except executing it on a computer or modifying a private copy. Propagation includes copying, distribution (with or without modification), making available to the public, and in some countries other activities as well.\nTo "convey" a work means any kind of propagation that enables other parties to make or receive copies. Mere interaction with a user through a computer network, with no transfer of a copy, is not conveying.\nAn interactive user interface displays "Appropriate Legal Notices" to the extent that it includes a convenient and prominently visible feature that (1) displays an appropriate copyright notice, and (2) tells the user that there is no warranty for the work (except to the extent that warranties are provided), that licensees may convey the work under this License, and how to view a copy of this License. If the interface presents a list of user commands or options, such as a menu, a prominent item in the list meets this criterion.',
	'1. Source Code.\nThe "source code" for a work means the preferred form of the work for making modifications to it. "Object code" means any non-source form of a work.\nA "Standard Interface" means an interface that either is an official standard defined by a recognized standards body, or, in the case of interfaces specified for a particular programming language, one that is widely used among developers working in that language.\nThe "System Libraries" of an executable work include anything, other than the work as a whole, that (a) is included in the normal form of packaging a Major Component, but which is not part of that Major Component, and (b) serves only to enable use of the work with that Major Component, or to implement a Standard Interface for which an implementation is available to the public in source code form. A "Major Component", in this context, means a major essential component (kernel, window system, and so on) of the specific operating system (if any) on which the executable work runs, or a compiler used to produce the work, or an object code interpreter used to run it.\nThe "Corresponding Source" for a work in object code form means all the source code needed to generate, install, and (for an executable work) run the object code and to modify the work, including scripts to control those activities. However, it does not include the work\'s System Libraries, or general-purpose tools or generally available free programs which are used unmodified in performing those activities but which are not part of the work. For example, Corresponding Source includes interface definition files associated with source files for the work, and the source code for shared libraries and dynamically linked subprograms that the work is specifically designed to require, such as by intimate data communication or control flow between those subprograms and other parts of the work.\nThe Corresponding Source need not include anything that users can regenerate automatically from other parts of the Corresponding Source.\nThe Corresponding Source for a work in source code form is that same work.',
	'2. Basic Permissions.\nAll rights granted under this License are granted for the term of copyright on the Program, and are irrevocable provided the stated conditions are met. This License explicitly affirms your unlimited permission to run the unmodified Program. The output from running a covered work is covered by this License only if the output, given its content, constitutes a covered work. This License acknowledges your rights of fair use or other equivalent, as provided by copyright law.\nYou may make, run and propagate covered works that you do not convey, without conditions so long as your license otherwise remains in force. You may convey covered works to others for the sole purpose of having them make modifications exclusively for you, or provide you with facilities for running those works, provided that you comply with the terms of this License in conveying all material for which you do not control copyright. Those thus making or running the covered works for you must do so exclusively on your behalf, under your direction and control, on terms that prohibit them from making any copies of your copyrighted material outside their relationship with you.\nConveying under any other circumstances is permitted solely under the conditions stated below. Sublicensing is not allowed; section 10 makes it unnecessary.',
	"3. Protecting Users' Legal Rights From Anti-Circumvention Law.\nNo covered work shall be deemed part of an effective technological measure under any applicable law fulfilling obligations under article 11 of the WIPO copyright treaty adopted on 20 December 1996, or similar laws prohibiting or restricting circumvention of such measures.\nWhen you convey a covered work, you waive any legal power to forbid circumvention of technological measures to the extent such circumvention is effected by exercising rights under this License with respect to the covered work, and you disclaim any intention to limit operation or modification of the work as a means of enforcing, against the work's users, your or third parties' legal rights to forbid circumvention of technological measures.",
	"4. Conveying Verbatim Copies.\nYou may convey verbatim copies of the Program's source code as you receive it, in any medium, provided that you conspicuously and appropriately publish on each copy an appropriate copyright notice; keep intact all notices stating that this License and any non-permissive terms added in accord with section 7 apply to the code; keep intact all notices of the absence of any warranty; and give all recipients a copy of this License along with the Program.\nYou may charge any price or no price for each copy that you convey, and you may offer support or warranty protection for a fee.",
	'5. Conveying Modified Source Versions.\nYou may convey a work based on the Program, or the modifications to produce it from the Program, in the form of source code under the terms of section 4, provided that you also meet all of these conditions:' + desc([
		'(a) The work must carry prominent notices stating that you modified it, and giving a relevant date.',
		'(b) The work must carry prominent notices stating that it is released under this License and any conditions added under section 7. This requirement modifies the requirement in section 4 to "keep intact all notices".',
		'(c) You must license the entire work, as a whole, under this License to anyone who comes into possession of a copy. This License will therefore apply, along with any applicable section 7 additional terms, to the whole of the work, and all its parts, regardless of how they are packaged. This License gives no permission to license the work in any other way, but it does not invalidate such permission if you have separately received it.',
		'(d) If the work has interactive user interfaces, each must display Appropriate Legal Notices; however, if the Program has interactive interfaces that do not display Appropriate Legal Notices, your work need not make them do so.'
	]) + '\nA compilation of a covered work with other separate and independent works, which are not by their nature extensions of the covered work, and which are not combined with it such as to form a larger program, in or on a volume of a storage or distribution medium, is called an "aggregate" if the compilation and its resulting copyright are not used to limit the access or legal rights of the compilation\'s users beyond what the individual works permit. Inclusion of a covered work in an aggregate does not cause this License to apply to the other parts of the aggregate.',
	'6. Conveying Non-Source Forms.\nYou may convey a covered work in object code form under the terms of sections 4 and 5, provided that you also convey the machine-readable Corresponding Source under the terms of this License, in one of these ways:' + desc([
		'(a) Convey the object code in, or embodied in, a physical product (including a physical distribution medium), accompanied by the Corresponding Source fixed on a durable physical medium customarily used for software interchange.',
		'(b) Convey the object code in, or embodied in, a physical product (including a physical distribution medium), accompanied by a written offer, valid for at least three years and valid for as long as you offer spare parts or customer support for that product model, to give anyone who possesses the object code either (1) a copy of the Corresponding Source for all the software in the product that is covered by this License, on a durable physical medium customarily used for software interchange, for a price no more than your reasonable cost of physically performing this conveying of source, or (2) access to copy the Corresponding Source from a network server at no charge.',
		'(c) Convey individual copies of the object code with a copy of the written offer to provide the Corresponding Source. This alternative is allowed only occasionally and noncommercially, and only if you received the object code with such an offer, in accord with subsection 6b.',
		'(d) Convey the object code by offering access from a designated place (gratis or for a charge), and offer equivalent access to the Corresponding Source in the same way through the same place at no further charge. You need not require recipients to copy the Corresponding Source along with the object code. If the place to copy the object code is a network server, the Corresponding Source may be on a different server (operated by you or a third party) that supports equivalent copying facilities, provided you maintain clear directions next to the object code saying where to find the Corresponding Source. Regardless of what server hosts the Corresponding Source, you remain obligated to ensure that it is available for as long as needed to satisfy these requirements.',
		'(e) Convey the object code using peer-to-peer transmission, provided you inform other peers where the object code and Corresponding Source of the work are being offered to the general public at no charge under subsection 6d.'
	]) + '\nA separable portion of the object code, whose source code is excluded from the Corresponding Source as a System Library, need not be included in conveying the object code work.\nA "User Product" is either (1) a "consumer product", which means any tangible personal property which is normally used for personal, family, or household purposes, or (2) anything designed or sold for incorporation into a dwelling. In determining whether a product is a consumer product, doubtful cases shall be resolved in favor of coverage. For a particular product received by a particular user, "normally used" refers to a typical or common use of that class of product, regardless of the status of the particular user or of the way in which the particular user actually uses, or expects or is expected to use, the product. A product is a consumer product regardless of whether the product has substantial commercial, industrial or non-consumer uses, unless such uses represent the only significant mode of use of the product.\n"Installation Information" for a User Product means any methods, procedures, authorization keys, or other information required to install and execute modified versions of a covered work in that User Product from a modified version of its Corresponding Source. The information must suffice to ensure that the continued functioning of the modified object code is in no case prevented or interfered with solely because modification has been made.\nIf you convey an object code work under this section in, or with, or specifically for use in, a User Product, and the conveying occurs as part of a transaction in which the right of possession and use of the User Product is transferred to the recipient in perpetuity or for a fixed term (regardless of how the transaction is characterized), the Corresponding Source conveyed under this section must be accompanied by the Installation Information. But this requirement does not apply if neither you nor any third party retains the ability to install modified object code on the User Product (for example, the work has been installed in ROM).\nThe requirement to provide Installation Information does not include a requirement to continue to provide support service, warranty, or updates for a work that has been modified or installed by the recipient, or for the User Product in which it has been modified or installed. Access to a network may be denied when the modification itself materially and adversely affects the operation of the network or violates the rules and protocols for communication across the network.\nCorresponding Source conveyed, and Installation Information provided, in accord with this section must be in a format that is publicly documented (and with an implementation available to the public in source code form), and must require no special password or key for unpacking, reading or copying.',
	'7. Additional Terms.\n"Additional permissions" are terms that supplement the terms of this License by making exceptions from one or more of its conditions. Additional permissions that are applicable to the entire Program shall be treated as though they were included in this License, to the extent that they are valid under applicable law. If additional permissions apply only to part of the Program, that part may be used separately under those permissions, but the entire Program remains governed by this License without regard to the additional permissions.\nWhen you convey a copy of a covered work, you may at your option remove any additional permissions from that copy, or from any part of it. (Additional permissions may be written to require their own removal in certain cases when you modify the work.) You may place additional permissions on material, added by you to a covered work, for which you have or can give appropriate copyright permission.\nNotwithstanding any other provision of this License, for material you add to a covered work, you may (if authorized by the copyright holders of that material) supplement the terms of this License with terms:' + desc([
		'(a) Disclaiming warranty or limiting liability differently from the terms of sections 15 and 16 of this License; or',
		'(b) Requiring preservation of specified reasonable legal notices or author attributions in that material or in the Appropriate Legal Notices displayed by works containing it; or',
		'(c) Prohibiting misrepresentation of the origin of that material, or requiring that modified versions of such material be marked in reasonable ways as different from the original version; or',
		'(d) Limiting the use for publicity purposes of names of licensors or authors of the material; or',
		'(e) Declining to grant rights under trademark law for use of some trade names, trademarks, or service marks; or',
		'(f) Requiring indemnification of licensors and authors of that material by anyone who conveys the material (or modified versions of it) with contractual assumptions of liability to the recipient, for any liability that these contractual assumptions directly impose on those licensors and authors.'
	]) + 'All other non-permissive additional terms are considered "further restrictions" within the meaning of section 10. If the Program as you received it, or any part of it, contains a notice stating that it is governed by this License along with a term that is a further restriction, you may remove that term. If a license document contains a further restriction but permits relicensing or conveying under this License, you may add to a covered work material governed by the terms of that license document, provided that the further restriction does not survive such relicensing or conveying.\nIf you add terms to a covered work in accord with this section, you must place, in the relevant source files, a statement of the additional terms that apply to those files, or a notice indicating where to find the applicable terms.\nAdditional terms, permissive or non-permissive, may be stated in the form of a separately written license, or stated as exceptions; the above requirements apply either way.',
	'8. Termination.\nYou may not propagate or modify a covered work except as expressly provided under this License. Any attempt otherwise to propagate or modify it is void, and will automatically terminate your rights under this License (including any patent licenses granted under the third paragraph of section 11).\nHowever, if you cease all violation of this License, then your license from a particular copyright holder is reinstated (a) provisionally, unless and until the copyright holder explicitly and finally terminates your license, and (b) permanently, if the copyright holder fails to notify you of the violation by some reasonable means prior to 60 days after the cessation.\nMoreover, your license from a particular copyright holder is reinstated permanently if the copyright holder notifies you of the violation by some reasonable means, this is the first time you have received notice of violation of this License (for any work) from that copyright holder, and you cure the violation prior to 30 days after your receipt of the notice.\nTermination of your rights under this section does not terminate the licenses of parties who have received copies or rights from you under this License. If your rights have been terminated and not permanently reinstated, you do not qualify to receive new licenses for the same material under section 10.',
	'9. Acceptance Not Required for Having Copies.\nYou are not required to accept this License in order to receive or run a copy of the Program. Ancillary propagation of a covered work occurring solely as a consequence of using peer-to-peer transmission to receive a copy likewise does not require acceptance. However, nothing other than this License grants you permission to propagate or modify any covered work. These actions infringe copyright if you do not accept this License. Therefore, by modifying or propagating a covered work, you indicate your acceptance of this License to do so.',
	'10. Automatic Licensing of Downstream Recipients.\nEach time you convey a covered work, the recipient automatically receives a license from the original licensors, to run, modify and propagate that work, subject to this License. You are not responsible for enforcing compliance by third parties with this License.\nAn "entity transaction" is a transaction transferring control of an organization, or substantially all assets of one, or subdividing an organization, or merging organizations. If propagation of a covered work results from an entity transaction, each party to that transaction who receives a copy of the work also receives whatever licenses to the work the party\'s predecessor in interest had or could give under the previous paragraph, plus a right to possession of the Corresponding Source of the work from the predecessor in interest, if the predecessor has it or can get it with reasonable efforts.\nYou may not impose any further restrictions on the exercise of the rights granted or affirmed under this License. For example, you may not impose a license fee, royalty, or other charge for exercise of rights granted under this License, and you may not initiate litigation (including a cross-claim or counterclaim in a lawsuit) alleging that any patent claim is infringed by making, using, selling, offering for sale, or importing the Program or any portion of it.',
	'11. Patents.\nA "contributor" is a copyright holder who authorizes use under this License of the Program or a work on which the Program is based. The work thus licensed is called the contributor\'s "contributor version".\nA contributor\'s "essential patent claims" are all patent claims owned or controlled by the contributor, whether already acquired or hereafter acquired, that would be infringed by some manner, permitted by this License, of making, using, or selling its contributor version, but do not include claims that would be infringed only as a consequence of further modification of the contributor version. For purposes of this definition, "control" includes the right to grant patent sublicenses in a manner consistent with the requirements of this License.\nEach contributor grants you a non-exclusive, worldwide, royalty-free patent license under the contributor\'s essential patent claims, to make, use, sell, offer for sale, import and otherwise run, modify and propagate the contents of its contributor version.\nIn the following three paragraphs, a "patent license" is any express agreement or commitment, however denominated, not to enforce a patent (such as an express permission to practice a patent or covenant not to sue for patent infringement). To "grant" such a patent license to a party means to make such an agreement or commitment not to enforce a patent against the party.\nIf you convey a covered work, knowingly relying on a patent license, and the Corresponding Source of the work is not available for anyone to copy, free of charge and under the terms of this License, through a publicly available network server or other readily accessible means, then you must either (1) cause the Corresponding Source to be so available, or (2) arrange to deprive yourself of the benefit of the patent license for this particular work, or (3) arrange, in a manner consistent with the requirements of this License, to extend the patent license to downstream recipients. "Knowingly relying" means you have actual knowledge that, but for the patent license, your conveying the covered work in a country, or your recipient\'s use of the covered work in a country, would infringe one or more identifiable patents in that country that you have reason to believe are valid.\nIf, pursuant to or in connection with a single transaction or arrangement, you convey, or propagate by procuring conveyance of, a covered work, and grant a patent license to some of the parties receiving the covered work authorizing them to use, propagate, modify or convey a specific copy of the covered work, then the patent license you grant is automatically extended to all recipients of the covered work and works based on it.\nA patent license is "discriminatory" if it does not include within the scope of its coverage, prohibits the exercise of, or is conditioned on the non-exercise of one or more of the rights that are specifically granted under this License. You may not convey a covered work if you are a party to an arrangement with a third party that is in the business of distributing software, under which you make payment to the third party based on the extent of your activity of conveying the work, and under which the third party grants, to any of the parties who would receive the covered work from you, a discriminatory patent license (a) in connection with copies of the covered work conveyed by you (or copies made from those copies), or (b) primarily for and in connection with specific products or compilations that contain the covered work, unless you entered into that arrangement, or that patent license was granted, prior to 28 March 2007.\nNothing in this License shall be construed as excluding or limiting any implied license or other defenses to infringement that may otherwise be available to you under applicable patent law.',
	"12. No Surrender of Others' Freedom.\nIf conditions are imposed on you (whether by court order, agreement or otherwise) that contradict the conditions of this License, they do not excuse you from the conditions of this License. If you cannot convey a covered work so as to satisfy simultaneously your obligations under this License and any other pertinent obligations, then as a consequence you may not convey it at all. For example, if you agree to terms that obligate you to collect a royalty for further conveying from those to whom you convey the Program, the only way you could satisfy both those terms and this License would be to refrain entirely from conveying the Program.",
	'13. Use with the GNU Affero General Public License.\nNotwithstanding any other provision of this License, you have permission to link or combine any covered work with a work licensed under version 3 of the GNU Affero General Public License into a single combined work, and to convey the resulting work. The terms of this License will continue to apply to the part which is the covered work, but the special requirements of the GNU Affero General Public License, section 13, concerning interaction through a network will apply to the combination as such.',
	'14. Revised Versions of this License.\nThe Free Software Foundation may publish revised and/or new versions of the GNU General Public License from time to time. Such new versions will be similar in spirit to the present version, but may differ in detail to address new problems or concerns.\nEach version is given a distinguishing version number. If the Program specifies that a certain numbered version of the GNU General Public License "or any later version" applies to it, you have the option of following the terms and conditions either of that numbered version or of any later version published by the Free Software Foundation. If the Program does not specify a version number of the GNU General Public License, you may choose any version ever published by the Free Software Foundation.\nIf the Program specifies that a proxy can decide which future versions of the GNU General Public License can be used, that proxy\'s public statement of acceptance of a version permanently authorizes you to choose that version for the Program.\nLater license versions may give you additional or different permissions. However, no additional obligations are imposed on any author or copyright holder as a result of your choosing to follow a later version.',
	'15. Disclaimer of Warranty.\nTHERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.',
	'16. Limitation of Liability.\nIN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.',
	'17. Interpretation of Sections 15 and 16.\nIf the disclaimer of warranty and limitation of liability provided above cannot be given local legal effect according to their terms, reviewing courts shall apply local law that most closely approximates an absolute waiver of all civil liability in connection with the Program, unless a warranty or assumption of liability accompanies a copy of the Program in return for a fee.',
	'END OF TERMS AND CONDITIONS'
];
