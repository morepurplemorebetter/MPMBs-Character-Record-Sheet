function AbilityScores_Button() {
	var MainTxt0 = "Here you can edit the ability scores using the components they are made up off.";
	MainTxt0 += "\nPlease use the lists below as a reference for what your character can do with its ability scores.";
	MainTxt0 += "\n\nThe standard array is: 15, 14, 13, 12, 10, and 8. Standard Point Buy is 27 points. You can't go higher than 15 before racial modifiers.";
	MainTxt0 += "\n\nAbility score improvements gained from class cannot take the total over 20.";

	var Header2 = "Improvements from Race and Feats";
	var MainTxt2 = AbilityScores.improvements.racefeats.replace(/^\n/, "").replace(/^\n/, "");
	//var Txt2Height = !MainTxt2 ? -1 : 30 + (MainTxt2.match(/\n/g) || []).length * 15;

	var Header3 = "Improvements from Class Levels";
	var MainTxt3 = AbilityScores.improvements.classlvl ? "Add 2 points to ability scores -or- take 1 feat.\n" + AbilityScores.improvements.classlvl.replace("\n", "") : "";
	//var Txt3Height = !MainTxt3 ? 0 : 30 + (MainTxt3.match(/\n/g) || []).length * 15;

	var Header4 = "Primary Ability Scores";
	var MainTxt4 = AbilityScores.improvements.classprime.replace(/^\n/, "").replace(/^\n/, "");
	//var Txt4Height = !MainTxt4 ? 0 : 30 + (MainTxt4.match(/\n/g) || []).length * 15;

	var Header5 = "Multiclassing Requirements";
	var MainTxt5 = AbilityScores.improvements.classmulti.replace(/^\n/, "").replace(/^\n/, "");
	//var Txt5Height = !MainTxt5 ? 0 : 30 + (MainTxt5.match(/\n/g) || []).length * 15;

	//get the ability score arrays from the fields and parse them into the global variable
	for (var i = 0; i <= AbilityScores.abbreviations.length; i++) {
		var AbiI = i === AbilityScores.abbreviations.length ? "HoS" : AbilityScores.abbreviations[i];
		var tempArray = What(AbiI + " Remember").split(",");
		AbilityScores.current[AbiI].base = tempArray[0];
		AbilityScores.current[AbiI].race = tempArray[1];
		AbilityScores.current[AbiI].extra = tempArray[2];
		AbilityScores.current[AbiI].magic = tempArray[3];
		AbilityScores.current[AbiI].extra2 = tempArray[4] ? tempArray[4] : "0";
		AbilityScores.current[AbiI].feat = tempArray[5] ? tempArray[5] : "0";
	};

	//The dialog for calculating the ability scores
	var AbilityScores_Dialog = {
		totalStr : 0,
		totalDex : 0,
		totalCon : 0,
		totalInt : 0,
		totalWis : 0,
		totalCha : 0,
		totalHoS : 0,
		arrayStr : [],
		arrayDex : [],
		arrayCon : [],
		arrayInt : [],
		arrayWis : [],
		arrayCha : [],
		arrayHoS : [],
		fieldHoS : What("HoSRememberState"),

		//when pressing the ok button
		commit : function (dialog) {
			var elements = dialog.store();
			this.totalStr = elements["tStr"];
			this.totalDex = elements["tDex"];
			this.totalCon = elements["tCon"];
			this.totalInt = elements["tInt"];
			this.totalWis = elements["tWis"];
			this.totalCha = elements["tCha"];
			this.totalHoS = elements["tHoS"];
			this.arrayStr = [elements["bStr"], elements["rStr"], elements["eStr"], elements["mStr"], elements["EStr"], elements["fStr"]];
			this.arrayDex = [elements["bDex"], elements["rDex"], elements["eDex"], elements["mDex"], elements["EDex"], elements["fDex"]];
			this.arrayCon = [elements["bCon"], elements["rCon"], elements["eCon"], elements["mCon"], elements["ECon"], elements["fCon"]];
			this.arrayInt = [elements["bInt"], elements["rInt"], elements["eInt"], elements["mInt"], elements["EInt"], elements["fInt"]];
			this.arrayWis = [elements["bWis"], elements["rWis"], elements["eWis"], elements["mWis"], elements["EWis"], elements["fWis"]];
			this.arrayCha = [elements["bCha"], elements["rCha"], elements["eCha"], elements["mCha"], elements["ECha"], elements["fCha"]];
			this.arrayHoS = [elements["bHoS"], elements["rHoS"], elements["eHoS"], elements["mHoS"], elements["EHoS"], elements["fHoS"]];
		},

		//when starting the dialog
		initialize : function (dialog) {
			var theHoS = this.fieldHoS;
			var enableHoS = theHoS === "Sanity" || theHoS === "Honor";
			var popupHoS =  {" " : -1, "Honor" : -1, "Sanity" : -1};
			for (var thing in popupHoS) {
				if ((thing === " " && !theHoS) || thing === theHoS) {
					popupHoS[thing] = 1;
				}
			};
			dialog.visible({
				"oHoS" : enableHoS,
				"bHoS" : enableHoS,
				"pHoS" : enableHoS,
				"rHoS" : enableHoS,
				"fHoS" : enableHoS,
				"eHoS" : enableHoS,
				"EHoS" : enableHoS,
				"mHoS" : enableHoS,
				"tHoS" : enableHoS
			});

			dialog.load({
				"img1" : allIcons.scores,
				"oNm0" : "Current Score",
				"oStr" : ASround(What("Str")),
				"oDex" : ASround(What("Dex")),
				"oCon" : ASround(What("Con")),
				"oInt" : ASround(What("Int")),
				"oWis" : ASround(What("Wis")),
				"oCha" : ASround(What("Cha")),
				"oHoS" : ASround(What("HoS")),
				"aNm0" : "Ability Name",
				"aHoS" : popupHoS,
				"bNm0" : "Score Base",
				"bStr" : AbilityScores.current.Str.base,
				"bDex" : AbilityScores.current.Dex.base,
				"bCon" : AbilityScores.current.Con.base,
				"bInt" : AbilityScores.current.Int.base,
				"bWis" : AbilityScores.current.Wis.base,
				"bCha" : AbilityScores.current.Cha.base,
				"bHoS" : AbilityScores.current.HoS.base,
				"pNm0" : "Point Buy",
				"rNm0" : "Racial Bonus",
				"rStr" : AbilityScores.current.Str.race,
				"rDex" : AbilityScores.current.Dex.race,
				"rCon" : AbilityScores.current.Con.race,
				"rInt" : AbilityScores.current.Int.race,
				"rWis" : AbilityScores.current.Wis.race,
				"rCha" : AbilityScores.current.Cha.race,
				"rHoS" : AbilityScores.current.HoS.race,
				"fNm0" : "Feat Bonus",
				"fStr" : AbilityScores.current.Str.feat,
				"fDex" : AbilityScores.current.Dex.feat,
				"fCon" : AbilityScores.current.Con.feat,
				"fInt" : AbilityScores.current.Int.feat,
				"fWis" : AbilityScores.current.Wis.feat,
				"fCha" : AbilityScores.current.Cha.feat,
				"fHoS" : AbilityScores.current.HoS.feat,
				"eNm0" : "Level Bonus",
				"eStr" : AbilityScores.current.Str.extra,
				"eDex" : AbilityScores.current.Dex.extra,
				"eCon" : AbilityScores.current.Con.extra,
				"eInt" : AbilityScores.current.Int.extra,
				"eWis" : AbilityScores.current.Wis.extra,
				"eCha" : AbilityScores.current.Cha.extra,
				"eHoS" : AbilityScores.current.HoS.extra,
				"ENm0" : "Magic Bonus",
				"EStr" : AbilityScores.current.Str.extra2,
				"EDex" : AbilityScores.current.Dex.extra2,
				"ECon" : AbilityScores.current.Con.extra2,
				"EInt" : AbilityScores.current.Int.extra2,
				"EWis" : AbilityScores.current.Wis.extra2,
				"ECha" : AbilityScores.current.Cha.extra2,
				"EHoS" : AbilityScores.current.HoS.extra2,
				"mNm0" : "Magical Override",
				"mStr" : AbilityScores.current.Str.magic,
				"mDex" : AbilityScores.current.Dex.magic,
				"mCon" : AbilityScores.current.Con.magic,
				"mInt" : AbilityScores.current.Int.magic,
				"mWis" : AbilityScores.current.Wis.magic,
				"mCha" : AbilityScores.current.Cha.magic,
				"mHoS" : AbilityScores.current.HoS.magic,
				"tNm0" : "New Total"
			});
			var elements = dialog.store();
			dialog.load({
				"pStr" : ASround(ASCalcPointBuy(elements["bStr"])),
				"pDex" : ASround(ASCalcPointBuy(elements["bDex"])),
				"pCon" : ASround(ASCalcPointBuy(elements["bCon"])),
				"pInt" : ASround(ASCalcPointBuy(elements["bInt"])),
				"pWis" : ASround(ASCalcPointBuy(elements["bWis"])),
				"pCha" : ASround(ASCalcPointBuy(elements["bCha"])),
				"pHoS" : ASround(ASCalcPointBuy(elements["bHoS"])),
				"tStr" : ASCalcTotal(elements, "Str"),
				"tDex" : ASCalcTotal(elements, "Dex"),
				"tCon" : ASCalcTotal(elements, "Con"),
				"tInt" : ASCalcTotal(elements, "Int"),
				"tWis" : ASCalcTotal(elements, "Wis"),
				"tCha" : ASCalcTotal(elements, "Cha"),
				"tHoS" : ASCalcTotal(elements, "HoS")
			});
			elements = dialog.store();
			dialog.load({
				"tPBT" : ASCalcPointBuyTotal(elements)
			});
		},

		//Strength line commands
		//fun whenever the base number changes
		bStr : function (dialog) {
			var elements = dialog.store();
			var theBase = ASround(elements["bStr"]);
			dialog.load({
				"bStr" : theBase,
				"pStr" : ASround(ASCalcPointBuy(theBase)),
				"tStr" : ASCalcTotal(elements, "Str")
			});
			elements = dialog.store();
			dialog.load({
				"tPBT" : ASCalcPointBuyTotal(elements)
			});
		},

		//fun whenever the race number changes
		rStr : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"rStr" : ASround(elements["rStr"]),
				"tStr" : ASCalcTotal(elements, "Str")
			});
		},

		//fun whenever the feat number changes
		fStr : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"fStr" : ASround(elements["fStr"]),
				"tStr" : ASCalcTotal(elements, "Str")
			});
		},

		//fun whenever the extra number changes
		eStr : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"eStr" : ASround(elements["eStr"]),
				"tStr" : ASCalcTotal(elements, "Str")
			});
		},

		//fun whenever the extra number changes
		EStr : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"EStr" : ASround(elements["EStr"]),
				"tStr" : ASCalcTotal(elements, "Str")
			});
		},

		//fun whenever the magic number changes
		mStr : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"mStr" : ASround(elements["mStr"]),
				"tStr" : ASCalcTotal(elements, "Str")
			});
		},

		//Dexterity line commands
		//fun whenever the base number changes
		bDex : function (dialog) {
			var elements = dialog.store();
			var theBase = ASround(elements["bDex"]);
			dialog.load({
				"bDex" : theBase,
				"pDex" : ASround(ASCalcPointBuy(theBase)),
				"tDex" : ASCalcTotal(elements, "Dex")
			});
			elements = dialog.store();
			dialog.load({
				"tPBT" : ASCalcPointBuyTotal(elements)
			});
		},

		//fun whenever the race number changes
		rDex : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"rDex" : ASround(elements["rDex"]),
				"tDex" : ASCalcTotal(elements, "Dex")
			});
		},

		//fun whenever the feat number changes
		fDex : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"fDex" : ASround(elements["fDex"]),
				"tDex" : ASCalcTotal(elements, "Dex")
			});
		},

		//fun whenever the extra number changes
		eDex : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"eDex" : ASround(elements["eDex"]),
				"tDex" : ASCalcTotal(elements, "Dex")
			});
		},

		//fun whenever the extra number changes
		EDex : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"EDex" : ASround(elements["EDex"]),
				"tDex" : ASCalcTotal(elements, "Dex")
			});
		},

		//fun whenever the magic number changes
		mDex : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"mDex" : ASround(elements["mDex"]),
				"tDex" : ASCalcTotal(elements, "Dex")
			});
		},

		//Constitution line commands
		//fun whenever the base number changes
		bCon : function (dialog) {
			var elements = dialog.store();
			var theBase = ASround(elements["bCon"]);
			dialog.load({
				"bCon" : theBase,
				"pCon" : ASround(ASCalcPointBuy(theBase)),
				"tCon" : ASCalcTotal(elements, "Con")
			});
			elements = dialog.store();
			dialog.load({
				"tPBT" : ASCalcPointBuyTotal(elements)
			});
		},

		//fun whenever the race number changes
		rCon : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"rCon" : ASround(elements["rCon"]),
				"tCon" : ASCalcTotal(elements, "Con")
			});
		},

		//fun whenever the race number changes
		fCon : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"fCon" : ASround(elements["fCon"]),
				"tCon" : ASCalcTotal(elements, "Con")
			});
		},

		//fun whenever the extra number changes
		eCon : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"eCon" : ASround(elements["eCon"]),
				"tCon" : ASCalcTotal(elements, "Con")
			});
		},

		//fun whenever the extra number changes
		ECon : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"ECon" : ASround(elements["ECon"]),
				"tCon" : ASCalcTotal(elements, "Con")
			});
		},

		//fun whenever the magic number changes
		mCon : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"mCon" : ASround(elements["mCon"]),
				"tCon" : ASCalcTotal(elements, "Con")
			});
		},

		//Intelligence line commands
		//fun whenever the base number changes
		bInt : function (dialog) {
			var elements = dialog.store();
			var theBase = ASround(elements["bInt"]);
			dialog.load({
				"bInt" : theBase,
				"pInt" : ASround(ASCalcPointBuy(theBase)),
				"tInt" : ASCalcTotal(elements, "Int")
			});
			elements = dialog.store();
			dialog.load({
				"tPBT" : ASCalcPointBuyTotal(elements)
			});
		},

		//fun whenever the race number changes
		rInt : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"rInt" : ASround(elements["rInt"]),
				"tInt" : ASCalcTotal(elements, "Int")
			});
		},

		//fun whenever the race number changes
		fInt : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"fInt" : ASround(elements["fInt"]),
				"tInt" : ASCalcTotal(elements, "Int")
			});
		},

		//fun whenever the extra number changes
		eInt : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"eInt" : ASround(elements["eInt"]),
				"tInt" : ASCalcTotal(elements, "Int")
			});
		},

		//fun whenever the extra number changes
		EInt : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"EInt" : ASround(elements["EInt"]),
				"tInt" : ASCalcTotal(elements, "Int")
			});
		},

		//fun whenever the magic number changes
		mInt : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"mInt" : ASround(elements["mInt"]),
				"tInt" : ASCalcTotal(elements, "Int")
			});
		},

		//Wisdom line commands
		//fun whenever the base number changes
		bWis : function (dialog) {
			var elements = dialog.store();
			var theBase = ASround(elements["bWis"]);
			dialog.load({
				"bWis" : theBase,
				"pWis" : ASround(ASCalcPointBuy(theBase)),
				"tWis" : ASCalcTotal(elements, "Wis")
			});
			elements = dialog.store();
			dialog.load({
				"tPBT" : ASCalcPointBuyTotal(elements)
			});
		},

		//fun whenever the race number changes
		rWis : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"rWis" : ASround(elements["rWis"]),
				"tWis" : ASCalcTotal(elements, "Wis")
			});
		},

		//fun whenever the race number changes
		fWis : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"fWis" : ASround(elements["fWis"]),
				"tWis" : ASCalcTotal(elements, "Wis")
			});
		},

		//fun whenever the extra number changes
		eWis : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"eWis" : ASround(elements["eWis"]),
				"tWis" : ASCalcTotal(elements, "Wis")
			});
		},

		//fun whenever the extra number changes
		EWis : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"EWis" : ASround(elements["EWis"]),
				"tWis" : ASCalcTotal(elements, "Wis")
			});
		},

		//fun whenever the magic number changes
		mWis : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"mWis" : ASround(elements["mWis"]),
				"tWis" : ASCalcTotal(elements, "Wis")
			});
		},

		//Charisma line commands
		//fun whenever the base number changes
		bCha : function (dialog) {
			var elements = dialog.store();
			var theBase = ASround(elements["bCha"]);
			dialog.load({
				"bCha" : theBase,
				"pCha" : ASround(ASCalcPointBuy(theBase)),
				"tCha" : ASCalcTotal(elements, "Cha")
			});
			elements = dialog.store();
			dialog.load({
				"tPBT" : ASCalcPointBuyTotal(elements)
			});
		},

		//fun whenever the race number changes
		rCha : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"rCha" : ASround(elements["rCha"]),
				"tCha" : ASCalcTotal(elements, "Cha")
			});
		},

		//fun whenever the race number changes
		fCha : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"fCha" : ASround(elements["fCha"]),
				"tCha" : ASCalcTotal(elements, "Cha")
			});
		},

		//fun whenever the extra number changes
		eCha : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"eCha" : ASround(elements["eCha"]),
				"tCha" : ASCalcTotal(elements, "Cha")
			});
		},

		//fun whenever the extra number changes
		ECha : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"ECha" : ASround(elements["ECha"]),
				"tCha" : ASCalcTotal(elements, "Cha")
			});
		},

		//fun whenever the magic number changes
		mCha : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"mCha" : ASround(elements["mCha"]),
				"tCha" : ASCalcTotal(elements, "Cha")
			});
		},

		//Honor/Sanity line commands
		//fun whenever the base number changes
		bHoS : function (dialog) {
			var elements = dialog.store();
			var theBase = ASround(elements["bHoS"]);
			dialog.load({
				"bHoS" : theBase,
				"pHoS" : ASround(ASCalcPointBuy(theBase)),
				"tHoS" : ASCalcTotal(elements, "HoS")
			});
			elements = dialog.store();
			dialog.load({
				"tPBT" : ASCalcPointBuyTotal(elements)
			});
		},

		//fun whenever the race number changes
		rHoS : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"rHoS" : ASround(elements["rHoS"]),
				"tHoS" : ASCalcTotal(elements, "HoS")
			});
		},

		//fun whenever the race number changes
		fHoS : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"fHoS" : ASround(elements["fHoS"]),
				"tHoS" : ASCalcTotal(elements, "HoS")
			});
		},

		//fun whenever the extra number changes
		eHoS : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"eHoS" : ASround(elements["eHoS"]),
				"tHoS" : ASCalcTotal(elements, "HoS")
			});
		},

		//fun whenever the extra number changes
		EHoS : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"EHoS" : ASround(elements["EHoS"]),
				"tHoS" : ASCalcTotal(elements, "HoS")
			});
		},

		//fun whenever the magic number changes
		mHoS : function (dialog) {
			var elements = dialog.store();
			dialog.load({
				"mHoS" : ASround(elements["mHoS"]),
				"tHoS" : ASCalcTotal(elements, "HoS")
			});
		},

		//do something when the value of the HoS drop-down box changes
		aHoS : function (dialog) {
			var popupHoS = dialog.store()["aHoS"];
			for (var thing in popupHoS) {
				if (popupHoS[thing] > 0) {
					this.fieldHoS = thing === " " ? "" : thing;
				}
			};
			dialog.visible({
				"oHoS" : this.fieldHoS !== "",
				"bHoS" : this.fieldHoS !== "",
				"pHoS" : this.fieldHoS !== "",
				"rHoS" : this.fieldHoS !== "",
				"fHoS" : this.fieldHoS !== "",
				"eHoS" : this.fieldHoS !== "",
				"EHoS" : this.fieldHoS !== "",
				"mHoS" : this.fieldHoS !== "",
				"tHoS" : this.fieldHoS !== ""
			});
			var elements = dialog.store();
			dialog.load({
				"tPBT" : ASCalcPointBuyTotal(elements)
			});
		},

		description : {
			name : "Set Ability Scores",
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
							item_id : "Hea0",
							alignment : "align_fill",
							font : "title",
							bold : true,
							height : 23,
							width : 65,
							name : "Calculate the Ability Scores"
						}]
					}, {
						name : MainTxt0,
						type : "static_text",
						item_id : "txt0",
						alignment : "align_fill",
						font : "dialog",
						wrap_name : true,
						char_width : 65
					}, {
						type : "view",
						char_width : 65,
						align_children : "align_distribute",
						elements : [].concat(MainTxt2 || MainTxt4 ? [{
							type : "view",
							align_children : "align_left",
							elements : [].concat(MainTxt2 ? [{
								name : Header2,
								type : "cluster",
								alignment : "align_left",
								item_id : "Hea2",
								font : "dialog",
								bold : true,
								elements : [{
									name : MainTxt2,
									type : "static_text",
									item_id : "txt2",
									alignment : "align_fill",
									font : "dialog",
									wrap_name : true,
									char_width : 32
								}]
							}] : []).concat(MainTxt4 ? [{
								name : Header4,
								type : "cluster",
								alignment : "align_left",
								item_id : "Hea4",
								font : "dialog",
								bold : true,
								elements : [{
									name : MainTxt4,
									type : "static_text",
									item_id : "txt4",
									alignment : "align_fill",
									font : "dialog",
									wrap_name : true,
									char_width : 32
								}]
							}] : [])
						}] : []).concat(MainTxt3 || MainTxt5 ? [{
							type : "view",
							align_children : "align_right",
							elements : [].concat(MainTxt3 ? [{
								name : Header3,
								type : "cluster",
								alignment : "align_right",
								item_id : "Hea3",
								font : "dialog",
								bold : true,
								elements : [{
									name : MainTxt3,
									type : "static_text",
									item_id : "txt3",
									alignment : "align_fill",
									font : "dialog",
									wrap_name : true,
									char_width : 32
								}]
							}] : []).concat(MainTxt5 ? [{
								name : Header5,
								type : "cluster",
								alignment : "align_right",
								item_id : "Hea5",
								font : "dialog",
								bold : true,
								elements : [{
									name : MainTxt5,
									type : "static_text",
									item_id : "txt5",
									alignment : "align_fill",
									font : "dialog",
									wrap_name : true,
									char_width : 32
								}]
							}] : [])
						}] : [])
					}, {
						type : "cluster",
						align_children : "align_distribute",
						elements : [{
							type : "view",
							elements : [{
								type : "static_text",
								item_id : "oNm0",
								font : "dialog",
								bold : true,
								char_width : 6,
								height : 32,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "oStr",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "oDex",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "oCon",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "oInt",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "oWis",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "oCha",
								name : "0",
								char_width : 3,
								height : 29,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "oHoS",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}]
						}, {
							type : "view",
							elements : [{
								type : "view",
								align_children : "align_distribute",
								elements : [{
									type : "view",
									elements : [{
										type : "static_text",
										item_id : "aNm0",
										font : "dialog",
										bold : true,
										char_width : 6,
										height : 32,
										alignment : "align_left"
									}, {
										type : "static_text",
										item_id : "aStr",
										height : 25,
										name : "Strength"
									}, {
										type : "static_text",
										item_id : "aDex",
										height : 25,
										name : "Dexterity"
									}, {
										type : "static_text",
										item_id : "aCon",
										height : 25,
										name : "Constitution"
									}, {
										type : "static_text",
										item_id : "aInt",
										height : 25,
										name : "Intelligence"
									}, {
										type : "static_text",
										item_id : "aWis",
										height : 25,
										name : "Wisdom"
									}, {
										type : "static_text",
										item_id : "aCha",
										height : 25,
										name : "Charisma"
									}, {
										type : "popup",
										item_id : "aHoS",
										height : 22,
										char_width : 6
									}]
								}, {
									type : "view",
									elements : [{
										type : "static_text",
										item_id : "bNm0",
										font : "dialog",
										bold : true,
										char_width : 4,
										height : 30,
										alignment : "align_left"
									}, {
										type : "edit_text",
										item_id : "bStr",
										char_width : 3,
										height : 25,
										SpinEdit : true
									}, {
										type : "edit_text",
										item_id : "bDex",
										char_width : 3,
										height : 25,
										SpinEdit : true
									}, {
										type : "edit_text",
										item_id : "bCon",
										char_width : 3,
										height : 25,
										SpinEdit : true
									}, {
										type : "edit_text",
										item_id : "bInt",
										char_width : 3,
										height : 25,
										SpinEdit : true
									}, {
										type : "edit_text",
										item_id : "bWis",
										char_width : 3,
										height : 25,
										SpinEdit : true
									}, {
										type : "edit_text",
										item_id : "bCha",
										char_width : 3,
										height : 25,
										SpinEdit : true
									}, {
										type : "edit_text",
										item_id : "bHoS",
										char_width : 3,
										height : 25,
										SpinEdit : true
									}]
								}]
							}, {
								type : "view",
								char_width : 12,
								alignment: "align_fill",
								align_children : "align_right",
								elements : [{
									type : "static_text",
									item_id : "tPNm",
									font : "dialog",
									bold : true,
									char_height : 3,
									char_width : 4,
									name : "Point Buy total:"
								}]
							}]
						}, {
							type : "view",
							elements : [{
								type : "static_text",
								item_id : "pNm0",
								font : "dialog",
								bold : true,
								char_width : 4,
								height : 32,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "pStr",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "pDex",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "pCon",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "pInt",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "pWis",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "pCha",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "pHoS",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "tPBT",
								name : "0",
								char_width : 3,
								height : 25,
								font : "dialog",
								bold : true,
								alignment : "align_center"
							}]
						}, {
							type : "view",
							elements : [{
								type : "static_text",
								item_id : "rNm0",
								font : "dialog",
								bold : true,
								char_width : 4,
								height : 30,
								alignment : "align_left"
							}, {
								type : "edit_text",
								item_id : "rStr",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "rDex",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "rCon",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "rInt",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "rWis",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "rCha",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "rHoS",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}]
						}, {
							type : "view",
							elements : [{
								type : "static_text",
								item_id : "fNm0",
								font : "dialog",
								bold : true,
								char_width : 4,
								height : 30,
								alignment : "align_left"
							}, {
								type : "edit_text",
								item_id : "fStr",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "fDex",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "fCon",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "fInt",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "fWis",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "fCha",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "fHoS",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}]
						}, {
							type : "view",
							elements : [{
								type : "static_text",
								item_id : "eNm0",
								font : "dialog",
								bold : true,
								char_width : 4,
								height : 30,
								alignment : "align_left"
							}, {
								type : "edit_text",
								item_id : "eStr",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "eDex",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "eCon",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "eInt",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "eWis",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "eCha",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "eHoS",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}]
						}, {
							type : "view",
							elements : [{
								type : "static_text",
								item_id : "ENm0",
								font : "dialog",
								bold : true,
								char_width : 4,
								height : 30,
								alignment : "align_left"
							}, {
								type : "edit_text",
								item_id : "EStr",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "EDex",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "ECon",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "EInt",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "EWis",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "ECha",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "EHoS",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}]
						}, {
							type : "view",
							elements : [{
								type : "static_text",
								item_id : "mNm0",
								font : "dialog",
								bold : true,
								char_width : 6,
								height : 30,
								alignment : "align_left"
							}, {
								type : "edit_text",
								item_id : "mStr",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "mDex",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "mCon",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "mInt",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "mWis",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "mCha",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}, {
								type : "edit_text",
								item_id : "mHoS",
								char_width : 3,
								height : 25,
								SpinEdit : true
							}]
						}, {
							type : "view",
							elements : [{
								type : "static_text",
								item_id : "tNm0",
								font : "dialog",
								bold : true,
								char_width : 4,
								height : 32,
								alignment : "align_center"
							}, {
								type : "static_text",
								item_id : "tStr",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center",
								font : "dialog",
								bold : true
							}, {
								type : "static_text",
								item_id : "tDex",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center",
								font : "dialog",
								bold : true
							}, {
								type : "static_text",
								item_id : "tCon",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center",
								font : "dialog",
								bold : true
							}, {
								type : "static_text",
								item_id : "tInt",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center",
								font : "dialog",
								bold : true
							}, {
								type : "static_text",
								item_id : "tWis",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center",
								font : "dialog",
								bold : true
							}, {
								type : "static_text",
								item_id : "tCha",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center",
								font : "dialog",
								bold : true
							}, {
								type : "static_text",
								item_id : "tHoS",
								name : "0",
								char_width : 3,
								height : 25,
								alignment : "align_center",
								font : "dialog",
								bold : true
							}]
						}]
					}, {
						type : "ok_cancel",
						ok_name : "Apply"
					}]
				}]
			}]
		}
	};
	var Results = app.execDialog(AbilityScores_Dialog);

	//don't continue with the function if "apply" was not pressed in the dialog
	if (Results === "ok") {
		// Start a progress bar and stop calculations
		var thermTxt = thermoM("Applying ability scores...");
		calcStop();
		var remCon = What("Con");

		ShowHonorSanity(AbilityScores_Dialog.fieldHoS);

		//apply the results: make the ability scores display what they are meant to display. Add the various inputs to their various remember fields
		for (var i = 0; i <= AbilityScores.abbreviations.length; i++) {
			var AbiI = i === AbilityScores.abbreviations.length ? "HoS" : AbilityScores.abbreviations[i];

			//if the HoS was not activated, don't do anything with those results
			if (AbiI === "HoS" && !AbilityScores_Dialog.fieldHoS) continue;

			thermoM((i+2)/(AbilityScores.abbreviations.length+2)); // Increment the progress bar

			//set the value to be remembered
			Value(AbiI + " Remember", AbilityScores_Dialog["array" + AbiI]);

			//set the value of the display field
			var resultScore = AbilityScores_Dialog["total" + AbiI];
			resultScore = isNaN(resultScore) || resultScore < 1 ? "" : resultScore;
			Value(AbiI, resultScore);
			Value(AbiI + " Mod", Math.round((Number(resultScore) - 10.5) * 0.5));
		}

		//if Con changed, edit the HPTooltip
		if (AbilityScores_Dialog["totalCon"] !== remCon) {
			SetHPTooltip();
		}

		// Update the weapons to make use of changes in ability scores (Finesse)
		ReCalcWeapons();

		// End the progress bar
		thermoM(thermTxt, true);
	}
}

function ASCalcPointBuy(theScore) {
	theScore = isNaN(theScore) ? 0 : Number(theScore);
	if (theScore <= 8) {
		return 0;
	} else if (theScore <= 13) {
		return theScore - 8;
	} else if (theScore > 13) {
		return theScore - 8 + (theScore - 13);
	}
}

function ASCalcPointBuyTotal(elements) {
	var TheTotal = 0;
	for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
		TheTotal += Number(elements["p" + AbilityScores.abbreviations[i]]);
	}
	if (elements.aHoS[" "] < 0) {
		TheTotal += Number(elements["pHoS"]);
	}
	return ASround(TheTotal);
}

function ASround(input) {
	input = input.replace(",", ".");
	input = isNaN(parseFloat(input)) ? 0 : parseFloat(input);
	return Math.round(Number(input)).toFixed(0);
}

function ASCalcTotal(elements, AStype) {
	var Base = Number(elements["b" + AStype]);
	var Race = Number(elements["r" + AStype]);
	var Feat = Number(elements["f" + AStype]);
	var Extra = Number(elements["e" + AStype]);
	var Extra2 = Number(elements["E" + AStype]);
	var Magic = ASround(Number(elements["m" + AStype]));
	var TheTotal = ASround(Base + Race + Feat + Extra + Extra2);
	return Number(Magic) > Number(TheTotal) ? Magic : TheTotal;
}