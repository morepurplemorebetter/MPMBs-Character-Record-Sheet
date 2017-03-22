/*
	the Mystic Class Unearthed Arcana of 2017-03-13
	(http://media.wizards.com/2017/dnd/downloads/UAMystic3.pdf)
	
	WARNING: there are no official multiclassing rules for the Mystic; the ones provided here are extrapolated based on other classes.
*/
//adds a class, the Mystic, with six subclasses, the Order of the Avatar, the Order of the Awakened, the Order of the Immortal, the Order of the Nomad, the Order of the Soul Knife, or the Order of the Wu Jen

ClassList.mystic = {
	regExpSearch : /^((?=.*(psion|mystic))|(?=.*psychic)(?=.*warrior)).*$/i,
	name : "Mystic",
	source : ["UA:TMC", 1],
	primaryAbility : "\n \u2022 Mystic: Intelligence;",
	abilitySave : 4,
	prereqs : "\n \u2022 Mystic: Intelligence 13;",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 8,
	saves : ["Wis", "Int"],
	skills : ["\n\n" + toUni("Mystic") + ": Choose two from Arcana, History, Insight, Medicine, Nature, Perception, and Religion."],
	armor : [
		[true, false, false, false]
	],
	weapons : [
		[true, false]
	],
	equipment : "Mystic starting equipment:\n \u2022 A spear -or- a mace;\n \u2022 Leather mail -or- studded leather armor;\n \u2022 A light crossbow and 20 bolts -or- any simple weapon;\n \u2022 A scholar's pack -or- an explorer's pack.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Mystic Order", ["mystic-avatar", "mystic-awakened", "mystic-immortal", "mystic-nomad", "mystic-soul knife", "mystic-wu jen"]],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : "psionic0",
	spellcastingKnown : {
		cantrips : levels.map(function (n) { return n < 3 ? 1 : n < 10 ? 2 : n < 17 ? 3 : 4; }),
		spells : levels.map(function (n) { return n < 3 ? 1 : n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : n < 12 ? 5 : n < 15 ? 6 : n < 18 ? 7 : 8; })
	},
	features : {
		"psi points" : {
			name : "Psi Points",
			source : ["UA:TMC", 3],
			minlevel : 1,
			description : desc([
				"I use psi points to fuel my psionic disciplines, up to my psi limit per instance",
//				"I can tap into my psionic talents without using psi points"
			]),
			usages : levels.map(function (n) {
				return n < 2 ? 4 : n < 3 ? 6 : n < 4 ? 14 : n < 5 ? 17 :
				n < 6 ? 27 : n < 7 ? 32 : n < 8 ? 38 : n < 9 ? 44 : n < 10 ? 57 :
				n < 18 ? 64 : 71;
			}),
			recovery : "long rest",
			additional : levels.map(function (n) {
				return (n < 3 ? 2 : n < 5 ? 3 : n < 7 ? 5 : n < 9 ? 6 : 7) + " psi limit";
			})
		},
		"psionics" : {
			name : "Psionics",
			source : ["UA:TMC", 3],
			minlevel : 1,
			description : desc([
				"I can use psionic talents/disciplines that I know, using Intelligence as my psionic ability",
//				"Whenever I gain a mystic level, I can replace a discipline I know with another"
			]),
			additional : levels.map(function (n) {
				var talent = n < 3 ? "1 talent" : (n < 10 ? 2 : n < 17 ? 3 : 4) + " talents";
				var discpl = n < 3 ? "1 discipline" : (n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : n < 12 ? 5 : n < 15 ? 6 : n < 18 ? 7 : 8) + " disciplines";
				return talent + " \u0026 " + discpl + " known";
			})
		},
		"psychic focus" : {
			name : "Psychic Focus",
			source : ["UA:TMC", 3],
			minlevel : 1,
			description : desc([
				"As a bonus action, I can choose one of my psionic disciplines and gain its focus benefit",
				"I can only focus on one at a time; It stays until I focus on another, or I'm incapacitated"
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature1" : {
			name : "Mystic Order",
			source : ["UA:TMC", 4],
			minlevel : 1,
			description : desc([
				"Choose a Mystic Order that shapes the nature of your rage and put it in the \"Class\" field"
			])
		},
		"mystical recovery" : {
			name : "Mystical Recovery",
			source : ["UA:TMC", 4],
			minlevel : 2,
			description : desc([
				"As a bonus action after using psi points on a discipline, I can regain HP per point spent"
			]),
			action : ["bonus action", ""]
		},
		"telepathy" : {
			name : "Telepathy",
			source : ["UA:TMC", 4],
			minlevel : 2,
			description : desc([
				"I can telepathically speak to creatures I can see within 120 ft, if they know a language" // 'to' not 'with', so one-way
			])
		},
		"strength of mind" : {
			name : "Strength of Mind",
			source : ["UA:TMC", 4],
			minlevel : 4,
			description : desc([
				"After a short rest, I can change my Wisdom save proficiency to another ability score"
			])
		},
		"potent psionics" : {
			name : "Potent Psionics",
			source : ["UA:TMC", 4],
			minlevel : 8,
			description : desc([
				"Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
				"In addition, I add my Intelligence modifier to my psionic talent damage rolls"
			]),
			additional : levels.map(function (n) {
				if (n < 8) return "";
				return "+" + (n < 14 ? 1 : 2) + "d8 psychic damage";
			}),
			calcChanges : {
				atkAdd : ["if (classes.known.mystic && classes.known.mystic.level > 7 && !isSpell) { fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.mystic.level < 14 ? 1 : 2) + 'd8 psychic damage'; }; ", "Once per turn, I can have one of my weapon attacks that hit do extra psychic damage.\n - My psionic talents get my Intelligence modifier added to their damage roll."],
				atkCalc : ["if (classes.known.mystic && classes.known.mystic.level > 7 && thisWeapon[4].indexOf('mystic') !== -1 && thisWeapon[3] && SpellsList[thisWeapon[3]].level === 0) { output.extraDmg += What('Int Mod'); }; ", ""]
			}
		},
		"consumptive power" : {
			name : "Consumptive Power",
			source : ["UA:TMC", 5],
			minlevel : 10,
			description : desc([
				"Once per long rest, I can use my HP to fuel a psionic discipline instead of psi points",
				"I lose the HP; My HP max is reduced with the same until I finish my next long rest"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"psionic mastery" : {
			name : "Psionic Mastery",
			source : ["UA:TMC", 5],
			minlevel : 11,
			description : desc([
				"As an action, I can gain a pool of special psi points that last until I finish a long rest",
				"I can use these, without psi limit, for disciplines that require an action or bonus action",
				"I can use either these or psi points from my normal pool for a discipline, but not both",
				"I can concentrate on all disciplines that use these special points at the same time",
				"I lose concentration if I cast a discipline requiring concentration from my normal pool"
			]),
			usages : levels.map(function (n) {
				if (n < 11) return "";
				return n < 13 ? 1 : n < 15 ? 2 : n < 17 ? 3 : 4;
			}),
			recovery : "long rest",
			additional : levels.map(function (n) {
				if (n < 11) return "";
				return "pool of " + (n < 15 ? 9 : 11) + " psi points";
			}),
			action : ["action", ""]
		},
		"psionic body" : {
			name : "Psionic Body",
			source : ["UA:TMC", 5],
			minlevel : 20,
			description : desc([
				"I no longer age and I have resistance to bludgeoning, piercing, and slashing damage",
				"I'm immune to disease, poison damage, and the poisoned condition",
				"If I die, I have a 55% chance of discorporating instead and returning 1d3 days later"
			]),
			save : "Immune to poison and disease",
			eval : "AddResistance('Bludgeoning', 'Mystic (Psionic Body)'); AddResistance('Piercing', 'Mystic (Psionic Body)'); AddResistance('Slashing', 'Mystic (Psionic Body)');",
			removeeval : "RemoveResistance('Bludgeoning'); RemoveResistance('Piercing'); RemoveResistance('Slashing');"
		}
	}
};

//the Order of the Avatar subclass for the Mystic
ClassSubList["mystic-avatar"] = {
	regExpSearch : /^((?=.*(psion|mystic))|(?=.*psychic)(?=.*warrior))(?=.*avatar).*$/i,
	subname : "Order of the Avatar",
	source : ["UA:TMC", 5],
	features : {
		"subclassfeature1" : {
			name : "Bonus Disciplines",
			source : ["UA:TMC", 5],
			minlevel : 1,
			description : "\n   " + "I know two additional psionic disciplines, chosen from the avatar disciplines",
			spellcastingBonus : {
				name : "Bonus Disciplines",
				class : "mystic",
				school : ["Avatar"], //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
				level : [1, 9],
				psionic : true,
				times : 2
			}
		},
		"subclassfeature1.1" : {
			name : "Armor Training",
			source : ["UA:TMC", 5],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with medium armor and shields.",
			armor : [false, true, false, true]
		},
		"subclassfeature3" : {
			name : "Avatar of Battle",
			source : ["UA:TMC", 5],
			minlevel : 3,
			description : "\n   " + "Allies within 30 ft of me gain +2 on initiative rolls while I'm not incapacitated"
		},
		"subclassfeature6" : {
			name : "Avatar of Healing",
			source : ["UA:TMC", 6],
			minlevel : 6,
			description : desc([
				"Allies within 30 ft of me that get healed through a psionic discipline, get extra healing",
				"They add my Intelligence modifier to the HP regained, as long as I'm not incapacitated"
			])
		},
		"subclassfeature14" : {
			name : "Avatar of Speed",
			source : ["UA:TMC", 6],
			minlevel : 14,
			description : "\n   " + "Allies within 30 ft of me can use Dash as a bonus action while I'm not incapacitated"
		}
	}
};

//the Order of the Awakened subclass for the Mystic
ClassSubList["mystic-awakened"] = {
	regExpSearch : /^((?=.*(psion|mystic))|(?=.*psychic)(?=.*warrior))(?=.*awakened).*$/i,
	subname : "Order of the Awakened",
	source : ["UA:TMC", 6],
	features : {
		"subclassfeature1" : {
			name : "Bonus Disciplines",
			source : ["UA:TMC", 6],
			minlevel : 1,
			description : " [+2 awakened disciplines]",
			spellcastingBonus : {
				name : "Bonus Disciplines",
				class : "mystic",
				school : ["Awake"], //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
				level : [1, 9],
				psionic : true,
				times : 2
			}
		},
		"subclassfeature1.1" : {
			name : "Awakened Talent",
			source : ["UA:TMC", 6],
			minlevel : 1,
			description : desc([
				"I gain proficiency with two skills of my choice, taken from the list below:",
				"Animal Handling, Deception, Insight, Intimidation, Investigation, Perception, Persuasion"
			]),
			skillstxt : "\n\n" + toUni("Order of the Awakened") + ": Choose two skills from: Animal Handling, Deception, Insight, Intimidation, Investigation, Perception, and Persuasion."
		},
		"subclassfeature3" : {
			name : "Psionic Investigation",
			source : ["UA:TMC", 6],
			minlevel : 3,
			description : desc([
				"By concentrating on an object I'm holding for 10 minutes, I learn the object's history",
				"I see/hear its surroundings the previous hour and know who hold it in the last 24 hours",
				"Also, for the next 24 hours, I can use an action to locate it and see its surroundings"
			]),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature6" : {
			name : "Psionic Surge",
			source : ["UA:TMC", 6],
			minlevel : 6,
			description : desc([
				"I can end my psychic focus to impose disadv. on a save vs. a discipline or talent I use",
				"Once I do this, I can't regain psychic focus in any discipline until I can use this again"
			]),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature14" : {
			name : "Spectral Form",
			source : ["UA:TMC", 6],
			minlevel : 14,
			description : desc([
				"As an action, I can become ghostly and move through objects and creatures for 10 min",
				"I also have resistance to all damage and move at half speed; I can end it as an action"
			]),
			usages : 1,
			recovery : "long rest",
			action : ["action", ""]
		}
	}
};

//the Order of the Immortal subclass for the Mystic
ClassSubList["mystic-immortal"] = {
	regExpSearch : /^((?=.*(psion|mystic))|(?=.*psychic)(?=.*warrior))(?=.*immortal).*$/i,
	subname : "Order of the Immortal",
	source : ["UA:TMC", 6],
	features : {
		"subclassfeature1" : {
			name : "Bonus Disciplines",
			source : ["UA:TMC", 7],
			minlevel : 1,
			description : "\n   " + "I know two additional psionic disciplines, taken from the immortal disciplines",
			spellcastingBonus : {
				name : "Bonus Disciplines",
				class : "mystic",
				school : ["Immor"], //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
				level : [1, 9],
				psionic : true,
				times : 2
			}
		},
		"subclassfeature1.1" : {
			name : "",
			source : ["UA:TMC", 7],
			minlevel : 1,
			description : desc([
				""
			])
		},
		"subclassfeature3" : {
			name : "",
			source : ["UA:TMC", 7],
			minlevel : 3,
			description : desc([
				""
			])
		},
		"subclassfeature6" : {
			name : "",
			source : ["UA:TMC", 7],
			minlevel : 6,
			description : desc([
				""
			])
		},
		"subclassfeature14" : {
			name : "",
			source : ["UA:TMC", 7],
			minlevel : 14,
			description : desc([
				""
			])
		}
	}
};

//the Order of the Nomad subclass for the Mystic
ClassSubList["mystic-nomad"] = {
	regExpSearch : /^((?=.*(psion|mystic))|(?=.*psychic)(?=.*warrior))(?=.*nomad).*$/i,
	subname : "Order of the Nomad",
	source : ["UA:TMC", 7],
	features : {
		"subclassfeature1" : {
			name : "Bonus Disciplines",
			source : ["UA:TMC", 7],
			minlevel : 1,
			description : "\n   " + "I know two additional psionic disciplines, taken from the nomad disciplines",
			spellcastingBonus : {
				name : "Bonus Disciplines",
				class : "mystic",
				school : ["Nomad"], //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
				level : [1, 9],
				psionic : true,
				times : 2
			}
		},
		"subclassfeature1.1" : {
			name : "",
			source : ["UA:TMC", 7],
			minlevel : 1,
			description : desc([
				""
			])
		},
		"subclassfeature3" : {
			name : "",
			source : ["UA:TMC", 7],
			minlevel : 3,
			description : desc([
				""
			])
		},
		"subclassfeature6" : {
			name : "",
			source : ["UA:TMC", 7],
			minlevel : 6,
			description : desc([
				""
			])
		},
		"subclassfeature14" : {
			name : "",
			source : ["UA:TMC", 7],
			minlevel : 14,
			description : desc([
				""
			])
		}
	}
};

//the Order of the Soul Knife subclass for the Mystic
ClassSubList["mystic-soul knife"] = {
	regExpSearch : /^(?=.*soul)(?=.*knife).*$/i,
	subname : "Order of the Soul Knife",
	source : ["UA:TMC", 7],
	fullname : "Soul Knife",
	features : {
		"subclassfeature1" : {
			name : "Martial Training",
			source : ["UA:TMC", 7],
			minlevel : 1,
			description : "\n   " + ""
		},
		"subclassfeature1.1" : {
			name : "",
			source : ["UA:TMC", 8],
			minlevel : 1,
			description : desc([
				""
			])
		},
		"subclassfeature3" : {
			name : "",
			source : ["UA:TMC", 8],
			minlevel : 3,
			description : desc([
				""
			])
		},
		"subclassfeature6" : {
			name : "",
			source : ["UA:TMC", 8],
			minlevel : 6,
			description : desc([
				""
			])
		},
		"subclassfeature14" : {
			name : "",
			source : ["UA:TMC", 8],
			minlevel : 14,
			description : desc([
				""
			])
		}
	}
};

//the Order of the Wu Jen subclass for the Mystic
ClassSubList["mystic-wu jen"] = {
	regExpSearch : /^(?=.*wu)(?=.*jen).*$/i,
	subname : "Order of the Wu Jen",
	source : ["UA:TMC", 8],
	fullname : "Wu Jen",
	features : {
		"subclassfeature1" : {
			name : "Bonus Disciplines",
			source : ["UA:TMC", 8],
			minlevel : 1,
			description : "\n   " + "I know two additional psionic disciplines, taken from the wu jen disciplines",
			spellcastingBonus : {
				name : "Bonus Disciplines",
				class : "mystic",
				school : ["Wu Jen"], //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
				level : [1, 9],
				psionic : true,
				times : 2
			}
		},
		"subclassfeature1.1" : {
			name : "",
			source : ["UA:TMC", 8],
			minlevel : 1,
			description : desc([
				""
			])
		},
		"subclassfeature3" : {
			name : "",
			source : ["UA:TMC", 8],
			minlevel : 3,
			description : desc([
				""
			])
		},
		"subclassfeature6" : {
			name : "",
			source : ["UA:TMC", 8],
			minlevel : 6,
			description : desc([
				""
			])
		},
		"subclassfeature14" : {
			name : "",
			source : ["UA:TMC", 8],
			minlevel : 14,
			description : desc([
				""
			])
		}
	}
};

/*	TO DO:
	- Add a way to set Psionics from the line menu
	- Generate complete spell sheet of the mystic
*/