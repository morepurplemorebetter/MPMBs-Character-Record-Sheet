//a function that returns an array of included and an array of excluded
//inclA must be the same length as inclA_Names, and exclA must be the same length as exclA_Names
function resourceDecisionDialog(inclA, exclA, inclA_Names, exclA_Names) {
	exclA_Names = exclA_Names ? exclA_Names : exclA;
	inclA_Names = inclA_Names ? inclA_Names : inclA;
	
	var selectionDialogue = {
		bExcL : inclA_Names,
		bIncL : exclA_Names,
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
				"txt0" : "Please select which of your spellcasting sources you want to include in the Spell Sheet and in which order they should appear.\n\nNote that generating a new Spell Sheet deletes any current Spell Sheet(s) in this pdf.\n\nPlease be patient, generating a Spell Sheet can take a long time, often more than ten minutes (yes, even on your new gaming rig). During this time Adobe Acrobat will appear unresponsive (but will still be working).",
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
							type : "hier_list_box",
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
							type : "hier_list_box",
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
}