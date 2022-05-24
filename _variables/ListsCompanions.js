var Base_CompanionList = {
	"familiar" : {
		name : "Find Familiar",
		nameTooltip : "the Find Familiar spell",
		nameOrigin : "1st-level conjuration [ritual] spell",
		nameMenu : "Familiar (Find Familiar spell)", // required
		source : [["SRD", 143], ["P", 240]], // required
		includeCheck : function(sCrea, objCrea, iCreaCR) {
			// return true if to be included, or a string to add a note to the menu option
			return !!isDisplay("DCI.Text") && objCrea.companion.indexOf("familiar_not_al") !== -1 ? " (if DM approves)" : false;
		},
		action : [
			["action", "Familiar (dismiss/reappear)"],
			["action", "Use familiar's senses"]
		],
		notes : [{
			name : "Summon a spirit that serves as a familiar",
			description : [
				"appearing in an unoccupied space within 10 ft",
				"It assumes a chosen form (can change at every casting): bat, cat, crab, frog (toad), hawk,",
				"lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, or weasel.",
				"It has the chosen form's statistics, but its type changes from beast to celestial, fey, or fiend",
				"When the familiar drops to 0 hit points, it disappears, leaving behind no physical form",
				"It reappears when I cast this spell again (in a new form if so desired)"
			].join("\n   "),
			joinString : ", "
		}, {
			name : "The familiar acts independently of me",
			description : [
				"but it always obeys my commands",
				"In combat, it rolls its own initiative and acts on its own turn, but it can't attack"
			].join("\n   "),
			joinString : ", "
		}, {
			name : "While it is within 100 ft of me",
			description : "I can communicate with it telepathically",
			joinString : ", "
		}, {
			name : "As an action, I see/hear what it does",
			description : " (but not with my senses) until the start of my next turn",
			joinString : ""
		}, {
			name : "As an action, I can temporarily dismiss it",
			description : "having it disappear into a pocket dimension",
			joinString : ", "
		}, {
			name : "As an action, while it is temporarily dismissed",
			description : "I can cause it to reappear within 30 ft",
			joinString : ", "
		}, {
			name : "I can't have more than one familiar bonded at a time",
			description : "As an action, I can dismiss it forever",
			joinString : "; "
		}, {
			name : "When I cast a spell with a range of touch",
			description : [
				"my familiar can deliver the spell",
				"It must be within 100 ft of me and it must use its reaction to deliver the spell when I cast it",
				"It acts as if it cast the spell, but it can use my modifiers for any attack rolls the spell requires"
			].join("\n   "),
			joinString : ", "
		}],
		attributesAdd : {
			header : "Familiar",
			features : [{
				name : "Find Familiar",
				description : "If dropped to 0 HP, the familiar disappears, leaving behind no physical form. The familiar must obey all commands of its master."
			}]
		},
		attributesChange : function(sCrea, objCrea) {
			// can't do any attacks
			objCrea.attacks = [];
			if (objCrea.type.toLowerCase() === "beast") {
				objCrea.type = ["Celestial", "Fey", "Fiend"];
				objCrea.subtype = "";
			}
		},
	},
	"pact_of_the_chain" : {
		name : "Pact of the Chain",
		nameTooltip : "Warlock (Pact of the Chain)",
		nameOrigin : "variant of the Find Familiar 1st-level conjuration [ritual] spell",
		nameMenu : "Pact of the Chain familiar (Warlock feature)",
		source : [["SRD", 47], ["P", 107]],
		includeCheck : function(sCrea, objCrea, iCreaCR) {
			// return true if to be included, or a string to add a note to the menu option
			return objCrea.companion.indexOf("familiar") !== -1 ? true : !!isDisplay("DCI.Text") && objCrea.companion.indexOf("familiar_not_al") !== -1 ? " (if DM approves)" : false;
		},
		action : [
			["action", "Familiar (dismiss/reappear)"],
			["action", "Use familiar's senses"]
		],
		attributesAdd : {
			header : "Familiar",
			features : [{
				name : "Pact of the Chain",
				description : "If dropped to 0 HP, the familiar disappears, leaving behind no physical form. The familiar must obey all commands of its master."
			}]
		},
		attributesChange : function(sCrea, objCrea) {
			if (objCrea.type.toLowerCase() === "beast") {
				objCrea.type = ["Celestial", "Fey", "Fiend"];
				objCrea.subtype = "";
			}
		}
	},
	"mount" : {
		name : "Find Steed",
		nameTooltip : "the Find Steed spell",
		nameOrigin : "2nd-level conjuration spell",
		nameMenu : "Steed (Find Steed spell)",
		source : [["SRD", 143], ["P", 240]],
		action : [["action", "Find Steed (dismiss)"]],
		notes : [{
			name : "Summon a spirit in the form of a steed",
			description : [
				"appearing in an unoccupied space within 30 ft",
				"It assumes a chosen form: warhorse, pony, camel, elk, or mastiff (DM can allow more forms)",
				"The steed has the statistics of the chosen form, though its type is celestial, fey, or fiend",
				"If it has an Intelligence of 5 or less, its Intelligence becomes 6 ",
				"It gains the ability to understand one language that I, the caster, can speak",
				"When the steed drops to 0 hit points, it disappears, leaving behind no physical form"
			].join("\n   "),
			joinString : ", "
		}, {
			name : "The steed serves me as a mount",
			description : "I have a bond with it that allows us to fight as a seamless unit",
			joinString : ". "
		}, {
			name : "While mounted on my steed",
			description : "I can make any spell I cast that targets only me also target it",
			joinString : ", "
		}, {
			name : "While my steed is within 1 mile of me",
			description : "I can communicate with it telepathically",
			joinString : ", "
		}, {
			name : "I can dismiss my steed at any time as an action",
			description : "causing it to disappear",
			joinString : ", "
		}, {
			name : "Casting this spell again",
			description : "summons the same steed, restored to its max HP, without conditions",
			joinString : " "
		}, {
			name : "I can't have more than one steed bonded at a time",
			description : "As an action, I can release it from its bond",
			joinString : "; "
		}],
		attributesAdd : {
			header : "Mount",
			type : ["Celestial", "Fey", "Fiend"],
			subtype : "",
			features : [{
				name : "Find Steed",
				description : "If dropped to 0 HP, the steed disappears, leaving behind no physical form."
			}],
			languages : "understands one language its master speaks (master's choice)"
		},
		attributesChange : function(sCrea, objCrea) {
			if (objCrea.scores[3] < 6) objCrea.scores[3] = 6;
		}
	},
	"companion" : {
		name : "Ranger's Companion",
		nameTooltip : "Beast Master: Ranger's Companion",
		nameOrigin : "Beast Master 3",
		nameMenu : "Ranger's Companion (Beast Master feature)",
		source : [["P", 93]],
		includeCheck : function(sCrea, objCrea, iCreaCR) {
			return objCrea.type.toLowerCase() === "beast" && objCrea.size >= 3 && iCreaCR <= 1/4 ? true : false;
		},
		action : [["action", "Ranger's Companion (command)"]],
		notes : [{
			name : "A beast no larger than Medium",
			description : "of challenge rating 1/4 or lower",
			joinString : " "
		}, {
			name : "If the beast dies",
			description : "I can spend 8 hours magically bonding with another that isn't hostile to me",
			joinString : ", "
		}, {
			name : "When moving in favored terrain with only the beast",
			description : "we can move stealthily at a normal pace",
			joinString : ", "
		}, {
			name : "The beast adds my proficiency bonus",
			description : typePF ? "to its AC, attack rolls, damage rolls, and saves/skills it is proficient with" : [
				"to its AC, attack rolls, damage rolls,",
				"as well as to any saving throws and skills it is proficient with."
			].join("\n   "),
			joinString : " "
		}, {
			name : "The beast's hit point maximum equals",
			description : "four times my ranger level if higher than its normal HP",
			joinString : " "
		}, {
			name : "In Combat",
			description : [
				"The beast takes its turn on my initiative",
				"I can verbally command the beast where to move (no action)",
				"As an action, I can have the beast do an Attack, Dash, Disengage, or Help action on its turn",
				"If I don't command it to take an action, it takes the Dodge action instead"
			].join("\n   "),
			joinString : typePF ? ": " : ":\n   "
		}, {
			name : "Extra Attack (Ranger 5, PHB 89)",
			description : "If the beast takes the Attack action, I can use my Extra Attack feature to attack once myself",
			joinString : "\n   ",
			minlevel : 5
		}, {
			name : "Exceptional Training (Beast Master 7, PHB 93)",
			description : [
				"The beast's attacks count as magical for the purpose of overcoming resistances and immunities",
				"As a bonus action, I can command it to take the Dash, Disengage, or Help action on its turn"
			].join("\n   "),
			joinString : "\n   ",
			minlevel : 7,
			eval : function(prefix, lvl) {
				for (var i = 1; i <= 3; i++) {
					if (!What(prefix + "Comp.Use.Attack." + i + ".Weapon Selection")) continue;
					var sDescrFld = prefix + "Comp.Use.Attack." + i + ".Description";
					if (!/(,|;)? ?counts as magical/i.test(What(sDescrFld))) {
						AddString(sDescrFld, "Counts as magical", "; ");
					};
				}
				processActions(true, "Beast Master: Ranger's Companion", [["bonus action", "Exceptional Training (Dash/Disengage/Help)"]], "Ranger's Companion");
			},
			removeeval : function(prefix, lvl) {
				for (var i = 1; i <= 3; i++) {
					var sDescrFld = prefix + "Comp.Use.Attack." + i + ".Description";
					var sDescr = What(sDescrFld);
					var rCaM = /(,|;)? ?counts as magical/i;
					if (rCaM.test(sDescr)) Value(sDescrFld, sDescr.replace(rCaM, ''));
				}
				processActions(false, "Beast Master: Ranger's Companion", [["bonus action", "Exceptional Training (Dash/Disengage/Help)"]], "Ranger's Companion");
			}
		}, {
			name : "Bestial Fury (Beast Master 11, PHB 93)",
			description : "The beast can make two attacks (or multiattack) when I command it to take an Attack action",
			joinString : "\n   ",
			minlevel : 11,
			eval : function(prefix, lvl) {
				Value(prefix + "Comp.Use.Attack.perAction", 2);
			},
			removeeval : function(prefix, lvl) {
				Value(prefix + "Comp.Use.Attack.perAction", 1);
			}
		}, {
			name : "Share Spells (Beast Master 15, PHB 93)",
			description : "When I cast a spell on myself, I can have it also affect the beast if it is within 30 ft of me",
			joinString : "\n   ",
			minlevel : 15
		}],
		attributesAdd : {
			header : "Companion",
			minlevelLinked : ["ranger", "rangerua", "spell-less ranger"],
			attacksAction : 1
		},
		attributesChange : function(sCrea, objCrea) {
			// Add oProf to attacks to hit and damage
			for (var i = 0; i < objCrea.attacks.length; i++) {
				var oAtk = objCrea.attacks[i];
				if (!oAtk.modifiers) {
					oAtk.modifiers = ["oProf", "oProf"];
				} else {
					oAtk.modifiers[0] += "+oProf";
					oAtk.modifiers[1] += "+oProf";
				}
				if (oAtk.description) { // Remove multiattack
					oAtk.description = oAtk.description.replace(/(((One|Two|2).+as an Attack action)|(2 per Attack));? ?/i, '');
				}
			};
			// Change multiattack trait/feature/action to level 11 feature
			["traits", "features", "actions"].forEach(function (n) {
				if (!objCrea[n]) return;
				for (var i = 0; i < objCrea[n].length; i++) {
					var oN = objCrea[n][i];
					if (oN.name && /multiattack/i.test(oN.name)) {
						objCrea[n][i].minlevel = 11;
					}
				}
			})
		},
		changeeval : function (prefix, lvl) {
			var sNameEntity = "Ranger's Companion";
			var sExplanation = "A ranger's companion adds its master's proficiency bonus (oProf) to its AC, all skills and saving throws it is proficient with, and the to hit and damage of its attacks.";
			// Add oProf to the AC, if not already present
			var sACfld = prefix + "Comp.Use.AC";
			if (lvl[0] === 0 && What(sACfld).indexOf("oProf") === -1) {
				AddToModFld(sACfld, "oProf", false, sNameEntity, sExplanation);
			}
			// Add oProf to proficient Saving Throws / Skills and remove where no longer proficient
			var processFld = function(sType, sFld, sModFld) {
				var bIsProf = sType === "skill" && !typePF ? What(sFld) !== "nothing" : tDoc.getField(sFld).isBoxChecked(0);
				var boProfMod = What(sModFld).indexOf("oProf") !== -1;
				if ((!bIsProf && boProfMod) || (bIsProf && !boProfMod)) {
					AddToModFld(sModFld, "oProf", !bIsProf, sNameEntity, sExplanation);
				}
			}
			// Loop through the saves and process them
			for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
				var sFld = prefix + "Comp.Use.Ability." + AbilityScores.abbreviations[i] + ".ST.Prof";
				if (!tDoc.getField(sFld)) continue;
				var sModFld = prefix + "BlueText.Comp.Use.Ability." + AbilityScores.abbreviations[i] + ".ST.Bonus";
				processFld("save", sFld, sModFld);
			}
			// Loop through the skills and process them
			for (var i = 0; i < SkillsList.abbreviations.length; i++) {
				var sFld = prefix + (typePF ? "" : "Text.") + "Comp.Use.Skills." + SkillsList.abbreviations[i] + ".Prof";
				if (!tDoc.getField(sFld)) continue;
				var sModFld = prefix + "BlueText.Comp.Use.Skills." + SkillsList.abbreviations[i] + ".Bonus";
				processFld("skill", sFld, sModFld);
			}
		},
		calcChanges : {
			hp : function (totalHD, HDobj, prefix) {
				var classTxt = "", useLvl, totHP, strHp;
				if (!classes.known.ranger && !classes.known["spell-less ranger"] && !classes.known["rangerua"]) {
					useLvl = classes.totallevel;
				} else {
					classTxt = "ranger ";
					useLvl = (classes.known.ranger ? classes.known.ranger.level : 0) + (classes.known["spell-less ranger"] ? classes.known["spell-less ranger"].level : (classes.known.rangerua ? classes.known.rangerua.level : 0));
				}
				var rngrCompHp = 4 * useLvl;
				var rngrCompHpStr = " 4 \xD7 " + useLvl + " from four times my " + classTxt + "level (" + rngrCompHp + ")";
				if (!CurrentCompRace[prefix] || CurrentCompRace[prefix].typeFound !== "creature") {
					totHP = rngrCompHp;
					strHp = " =" + rngrCompHpStr;
				} else {
					var creaHp = CurrentCompRace[prefix] && CurrentCompRace[prefix].hp ? CurrentCompRace[prefix].hp : 0;
					var creaName = CurrentCompRace[prefix] && CurrentCompRace[prefix].name ? CurrentCompRace[prefix].name.toLowerCase() : "creature";
					totHP = Math.max(rngrCompHp, creaHp);
					strHp = " = the highest of either:\n I. " + creaHp + " from a " + creaName + "'s normal maximum HP\n II." + rngrCompHpStr;
					if (HDobj.alt.length) {
						// there are already other alternate HP calculations, so use them if higher
						totHP = Math.max.apply(Math, HDobj.alt.concat(totHP));
						strHp += "\n III. Other alternative hit point calculation(s) (" + totHP + ")";
					}
				}
				HDobj.alt.push(totHP);
				HDobj.altStr.push(strHp);
			},
			setAltHp : true
		}
	}
};
Base_CompanionList.pact_of_the_chain.notes = function() {
	var a = newObj(Base_CompanionList.familiar.notes);
	a[0].description = a[0].description.replace("or weasel.", "weasel,\n   or one of the special forms: imp, pseudodragon, quasit, or sprite.");
	a[1].description = a[1].description.replace("but it can't attack", "but it can't attack on its turn");
	a.splice(3, 0, {
		name : "With my Attack action",
		description : "I can forgo one attack to have the familiar make one with its reaction",
		joinString : ", "
	});
	return a;
}();
