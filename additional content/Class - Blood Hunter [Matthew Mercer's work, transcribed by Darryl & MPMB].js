/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds a class called "Blood Hunter" (v1.8) and the three subclasses for it: "Order of the Ghostslayer", "Order of the Profane Soul", and "Order of the Mutant"
	This is taken from the DMs Guild website (http://www.dmsguild.com/product/170777/)
	This subclass is made by Matthew Mercer
	Code by:	Darryl Cook & MorePurpleMoreBetter
	Date:		2016-11-15 (sheet v12.56)

	Please support the creator of this content (Matthew Mercer) and download his material from the DMs Guild website: http://www.dmsguild.com/browse.php?x=0&y=0&author=Matthew%20Mercer
	
	Please take note that multiclassing the "Order of the Profane Soul" subclass with Warlock will result in too many spells/cantrips being asked for in the spell selection dialogues.
*/

ClassList["blood hunter"] = {
	regExpSearch : /^(?=.*blood)(?=.*hunter).*$/i,
	name : "Blood Hunter",
	source : ["MM:BH", 0],
	primaryAbility : "\n \u2022 Blood Hunter: Strength or Dexterity;",
	prereqs : "\n \u2022 Blood Hunter: Strength 13 or Dexterity 13;",
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Str", "Wis"],
	skills : ["\n\n" + toUni("Blood Hunter") + ": Choose two from Acrobatics, Arcane, Athletics, Insight, Investigation, and Survival."],
	tools : ["Alchemist's supplies", "Alchemist's supplies"],
	armor : [
		[true, true, false, false],
		[true, true, false, false]
	],
	weapons : [
		[true, true],
		[true, true]
	],
	equipment : "Blood Hunter starting equipment:\n \u2022 Scale mail -or- studded leather armor;\n \u2022 A martial weapon -or- two simple weapons;\n \u2022 A light crossbow and 20 bolts -or- a hand crossbow and 20 bolts;\n \u2022 An explorer's pack.\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Blood Hunter Orders", ["order of the mutant", "order of the ghostslayer", "order of the profane soul"]],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"hunter's bane" : {
			name : "Hunter's Bane",
			source : ["MM:BH", 3],
			minlevel : 1,
			description : "\n   " + "When tracking a Fey, Fiends, or Undead, I can't be surprised by a creature of that type" + "\n   " + "I have adv. on Wis (Survival) checks to track and Int checks to recall info about them" + "\n   " + "From 11th level, I can take rite damage for adv. on Wis (Insight) or Cha (Intimidation)",
		},
		"crimson rite" : {
			name : "Crimson Rite",
			source : ["MM:BH", 3],
			minlevel : 1,
			description : "\n   " + "Use the \"Choose Features\" button above to add a Crimson Rite to the third page" + "\n   " + "As a bonus action, I imbue a weapon with a rite, lasting until my next short/long rest" + "\n   " + "A weapon can only hold a single rite at a time; the rite ends if it leaves my hand" + "\n   " + "While active, attacks with the weapon add the rite damage die to their damage" + "\n   " + "When activated, I take my character level in damage and lower my max HP the same",
			additional : ["1d4; 1 primal rite", "1d4; 1 primal rite", "1d4; 1 primal rite", "1d4; 1 primal rite", "1d4; 1 primal rite", "1d6; 2 primal rites", "1d6; 2 primal rites", "1d6; 2 primal rites", "1d6; 2 primal rites", "1d6; 2 primal rites", "1d8; 3 primal rites", "1d8; 3 primal rites", "1d8; 3 primal rites", "1d8; 3 primal rites, 1 esoteric rite", "1d8; 3 primal rites, 1 esoteric rite", "1d10; 3 primal rites, 1 esoteric rite", "1d10; 3 primal rites, 1 esoteric rite", "1d10; 3 primal rites, 1 esoteric rite", "1d10; 3 primal rites, 1 esoteric rite", "1d10; 3 primal rites, 1 esoteric rite"],
			action : ["bonus action", ""],
			extraname : "Crimson Rite",
			extrachoices : ["Flame (Primal Rite)", "Frozen (Primal Rite)", "Storm (Primal Rite)", "Roar (Esoteric Rite)", "Oracle (Esoteric Rite)", "Dead (Esoteric Rite)"],
			"flame (primal rite)" : {
				source : ["MM:BH", 3],
				name : "Rite of the Flame",
				description : "\n   " + "I can select fire as the damage type for my crimson rite damage die"
			},
			"frozen (primal rite)" : {
				source : ["MM:BH", 3],
				name : "Rite of the Frozen",
				description : "\n   " + "I can select cold as the damage type for my crimson rite damage die"
			},
			"storm (primal rite)" : {
				source : ["MM:BH", 3],
				name : "Rite of the Storm",
				description : "\n   " + "I can select lightning as the damage type for my crimson rite damage die"
			},
			"roar (esoteric rite)" : {
				source : ["MM:BH", 3],
				name : "Rite of the Roar",
				description : "\n   " + "I can select thunder as the damage type for my crimson rite damage die"
			},
			"oracle (esoteric rite)" : {
				source : ["MM:BH", 3],
				name : "Rite of the Oracle",
				description : "\n   " + "I can select psychic as the damage type for my crimson rite damage die"
			},
			"dead (esoteric rite)" : {
				source : ["MM:BH", 3],
				name : "Rite of the Dead",
				description : "\n   " + "I can select necrotic as the damage type for my crimson rite damage die"
			},
		},
		"fighting style" : {
			name : "Fighting Style",
			source : ["MM:BH", 3],
			minlevel : 2,
			description : "\n   " + "Choose a Fighting Style using the \"Choose Feature\" button above",
			choices : ["Archery", "Dueling", "Great Weapon Fighting", "Two-Weapon Fighting"],
			"archery" : {
				name : "Archery Fighting Style",
				description : "\n   " + "+2 bonus to attack rolls I make with ranged weapons",
				eval : "this.getField(\"Attack To Hit Bonus Global\").value += 2",
				removeeval : "this.getField(\"Attack To Hit Bonus Global\").value -= 2"
			},
			"dueling" : {
				name : "Dueling Fighting Style",
				description : "\n   " + "+2 to damage rolls when wielding a melee weapon in one hand and no other weapon",
				eval : "this.getField(\"Attack Damage Bonus Global\").value += 2",
				removeeval : "this.getField(\"Attack Damage Bonus Global\").value -= 2"
			},
			"great weapon fighting" : {
				name : "Great Weapon Fighting Style",
				description : " [not with Crimson Rite die]" + "\n   " + "Reroll 1 or 2 on damage if wielding two-handed/versatile melee weapon in both hands",
			},
			"two-weapon fighting" : {
				name : "Two-Weapon Fighting Style",
				description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks"
			},
		},
		"blood maledict" : {
			name : "Blood Maledict",
			source : ["MM:BH", 3],
			minlevel : 2,
			description : "\n   " + "Use the \"Choose Features\" button above to add a Blood Curse to the third page" + "\n   " + "I can use a Blood Curse on any creature with blood in its body" + "\n   " + "I can amplify its effect by taking damage equal to my Crimson Rite damage die",
			additional : ["", "1 blood curse", "1 blood curse", "1 blood curse", "1 blood curse", "2 blood curses", "2 blood curses", "2 blood curses", "2 blood curses", "3 blood curses", "3 blood curses", "3 blood curses", "3 blood curses", "4 blood curses", "4 blood curses", "4 blood curses", "4 blood curses", "5 blood curses", "5 blood curses", "5 blood curses"],
			usages : [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4],
			recovery : "short rest",
			extraname : "Blood Curse",
			extrachoices : ["Blood Curse of Binding", "Blood Curse of the Eyeless", "Blood Curse of the Fallen Puppet", "Blood Curse of the Fending Rite", "Blood Curse of the Marked", "Blood Curse of Mutual Suffering", "Blood Curse of Purgation", "Blood Curse of Spell Sunder"],
			"blood curse of binding" : {
				name : "Blood Curse of Binding",
				source : ["MM:BH", 3],
				description : "\n   " + "As a bonus action, I can bind an enemy within 30 ft that is up to one size larger than me" + "\n   " + "It makes a Str save (DC 8+Prof+Wis mod) or has speed 0 until the start of my next turn" + "\n   - " + "Amplify: I can affect up to two sizes larger than me and the curse becomes ongoing" + "\n     " + "At the end of its turn, the target can make another Str save to stop the curse",
				action : ["bonus action", ""]
			},
			"blood curse of the eyeless" : {
				name : "Blood Curse of the Eyeless",
				source : ["MM:BH", 4],
				description : "\n   " + "As a reaction when an enemy with eyes within 30 ft attacks me, I can impose disadv." + "\n   - " + "Amplify: I can also do this when the attack was targeting another creature",
				action : ["reaction", ""]
			},
			"blood curse of the fallen puppet" : {
				name : "Blood Curse of the Fallen Puppet",
				source : ["MM:BH", 4],
				description : "\n   " + "As a reaction when a creature falls unconscious/dies in 30 ft of me, I can make it attack" + "\n   " + "The creature makes one attack against a target of my choice within its attack range" + "\n   - " + "Amplify: the attack and damage roll gain a bonus equal to my Wisdom modifier (min 1)",
				action : ["reaction", ""]
			},
			"blood curse of the fending rite" : {
				name : "Blood Curse of the Fending Rite",
				source : ["MM:BH", 4],
				description : "\n   " + "As a reaction when an enemy casts a spell requiring a Dex save, I can gain a bonus" + "\n   " + "I can add my Wisdom modifier (min 1) to that Dexterity saving throw" + "\n   - " + "Amplify: allies within 5 ft of me gain the same bonus on their save vs. the spell",
				action : ["reaction", ""]
			},
			"blood curse of the marked" : {
				name : "Blood Curse of the Marked",
				source : ["MM:BH", 4],
				description : "\n   " + "As a bonus action, I can mark an enemy within 30 ft of me until the end of my turn" + "\n   " + "While marked, my rite damage to the target is doubled" + "\n   - " + "Amplify: The marked target loses resistance to my rite damage type",
				action : ["bonus action", ""]
			},
			"blood curse of mutual suffering" : {
				name : "Blood Curse of Mutual Suffering",
				source : ["MM:BH", 4],
				description : "\n   " + "As a bonus action, I can link to a creature within 30 ft of me for up to a minute" + "\n   " + "If it damages me while linked it takes half the damage as necrotic and the curse ends" + "\n   - " + "Amplify: The target takes full damage instead of half and can't use necrotic resistance",
				action : ["bonus action", ""]
			},
			"blood curse of purgation" : {
				name : "Blood Curse of Purgation",
				source : ["MM:BH", 4],
				description : "\n   " + "As a bonus action, I give a creature within 30 ft an immediate save vs. being poisoned" + "\n   - " + "Amplify: The target can instead make a save vs. being blinded, deafened, or paralysed",
				action : ["bonus action", ""]
			},
			"blood curse of spell sunder" : {
				name : "Blood Curse of Spell Sunder",
				source : ["MM:BH", 4],
				description : "\n   " + "As a reaction when a spell is cast within 30 ft with an attack roll, I impose disadv. to it" + "\n   - " + "Amplify: I make a Wis check (DC 10 + spell's level) to make the spell miss me completely",
				action : [" reaction ", " "]
			},
		},
		"subclassfeature3" : {
			name : "Blood Hunter Order",
			source : ["MM:BH", 5],
			minlevel : 3,
			description : "\n   " + "Choose a Blood Hunter Order you commit to and put it in the \"Class\" field" + "\n   " + "Choose either the Order of the Ghostslayer, Profane Soul, or Mutant",
		},
		"grim psychometry" : {
			name : "Grim Psychometry",
			source : ["MM:BH", 4],
			minlevel : 9,
			description : "\n   " + "I can meditate for 10 minutes on an object to discern details of a lingering evil past" + "\n   " + "The DM reveals information based on my Wis check; This only works once on an object",
		},
		"dark velocity" : {
			name : "Dark Velocity",
			source : ["MM:BH", 4],
			minlevel : 10,
			description : "\n   " + "While in dim light I have +10 ft speed, and attacks of opportunity have disadv. vs. me",
		},
		"hardened soul" : {
			name : "Hardened Soul",
			source : ["MM:BH", 4],
			minlevel : 14,
			description : "\n   " + "I am immune to being frightened, and have adv. on saves against magical charm effects",
			save : "Immune to being frightened; Adv. vs. magical charm effects"
		},
		"sanguine mastery" : {
			name : "Sanguine Mastery",
			source : ["MM:BH", 4],
			minlevel : 20,
			description : "\n   " + "No longer do crimson rites reduce my max HP, nor does amplifying curses deal damage" + "\n   " + "When I'm below 1/4 max HP and conscious, all my rite damage die are maximized",
		},
	},
};

ClassSubList["order of the ghostslayer"] = {
	regExpSearch : /^(?=.*ghost)(?=.*slayer).*$/i,
	subname : "Order of the Ghostslayer",
	source : ["MM:BH", 5],
	fullname : "Ghostslayer",
	features : {
		"subclassfeature3" : {
			name : "Rite of the Dawn",
			source : ["MM:BH", 5],
			minlevel : 3,
			description : "\n   " + "I know the Rite of the Dawn and used on undead it does my Wis mod in extra damage" + "\n   " + "From 11th level, it does this additional damage on all targets, regardless of type",
			additional : ["", "", "+Wisdom mod to undead", "+Wisdom mod to undead", "+Wisdom mod to undead", "+Wisdom mod to undead", "+Wisdom mod to undead", "+Wisdom mod to undead", "+Wisdom mod to undead", "+Wisdom mod to undead", "+Wisdom mod to all", "+Wisdom mod to all", "+Wisdom mod to all", "+Wisdom mod to all", "+Wisdom mod to all", "+Wisdom mod to all", "+Wisdom mod to all", "+Wisdom mod to all", "+Wisdom mod to all", "+Wisdom mod to all"],
			extraname : "Crimson Rite",
			"dawn" : {
				source : ["MM:BH", 5],
				name : "Rite of the Dawn",
				description : "\n   " + "I can select radiant as the damage type for my crimson rite damage die"
			},
			eval : "ClassFeatureOptions([\"blood hunter\", \"subclassfeature3\", \"dawn\", \"extra\"]);",
			removeeval : "ClassFeatureOptions([\"blood hunter\", \"subclassfeature3\", \"dawn\", \"extra\"], \"remove\");",
		},
		"subclassfeature7" : {
			name : "Hallowed Veins",
			source : ["MM:BH", 5],
			minlevel : 7,
			description : "\n   " + "My blood curses can now affect any creature, regardless of form or lack of blood",
		},
		"subclassfeature11" : {
			name : "Supernal Surge",
			source : ["MM:BH", 5],
			minlevel : 11,
			description : "\n   " + "As a bonus action, I can take on a ghostly form for my Wis mod in rounds (min 1)" + "\n   " + "While active, I can move through objects and creatures as if they were difficult terrain" + "\n   " + "While active, I can make a single weapon attack as a bonus action on each of my turns" + "\n   " + "If I end my turn inside an object, I take 1d10 force damage; more if my form ends",
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"subclassfeature15" : {
			name : "Gravesight",
			source : ["MM:BH", 5],
			minlevel : 15,
			description : "\n   " + "Out to 30 feet, I can see in normal darkness as well as invisible creatures and objects",
			eval : "AddString(\"Vision\",\"Darkvisiion 30 ft; See invisible 30 ft\", \"; \");",
			removeeval : "RemoveString(\"Vision\", \"Darkvisiion 30 ft; See invisible 30 ft\");"
		},
		"subclassfeature18" : {
			name : "Vengeful Spirit",
			source : ["MM:BH", 5],
			minlevel : 18,
			description : "\n   " + "When I reach 0 HP, I can let my soul fight on at the beginning on my next turn" + "\n   " + "The spirit can move through objects and creatures as if they were difficult terrain" + "\n   " + "It takes my weapons, uses my stats/AC, and can use all my abilities except Blood Curses" + "\n   " + "It is immune to cold, necrotic, non-magical weapon damage, and my Crimson Rite" + "\n   " + "When it takes any damage, my body dies, or I regain any HP, the spirit vanishes",
		},
	},
};

ClassSubList["order of the profane soul"] = {
	regExpSearch : /^(?=.*profane)(?=.*soul).*$/i,
	subname : "Order of the Profane Soul",
	source : ["MM:BH", 6],
	abilitySave : 5,
	spellcastingFactor : "warlock3",
	spellcastingTable : [
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 0
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 1
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 2
		[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 3
		[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 4
		[2, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 5
		[2, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 6
		[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 7
		[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 8
		[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 9
		[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl10
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl11
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl12
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl13
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl14
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl15
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl16
		[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl17
		[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl18
		[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl19
		[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl20
	],
	spellcastingKnown : {
		cantrips : [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		spells : [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 11],
	},
	spellcastingList : {
		class : "warlock",
		level : [0, 4],
	},
	features : {
		"subclassfeature3" : {
			name : "Otherwordly Patron",
			source : ["MM:BH", 6],
			minlevel : 3,
			description : "\n   " + "Choose an Otherwordly Patron using the \"Choose Feature\" button above",
			choices : ["the Archfey", "the Fiend", "the Great Old One", "the Undying"],
			"the archfey" : {
				name : "Otherwordly Patron: the Archfey",
				description : "\n   " + "When I do rite damage, the target loses invisibility, 1/2 \u0026 3/4 cover til my next turn",
				eval : "var ToAdd = [\"blood hunter\", \"subclassfeature7.1\", \"the archfey\"]; if (classes.known[\"blood hunter\"].level >= 7 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)} ToAdd[1] = \"subclassfeature15\"; if (classes.known[\"blood hunter\"].level >= 15 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};"
			},
			"the fiend" : {
				name : "Otherwordly Patron: the Fiend",
				description : "\n   " + "When using the Rite of the Flame I may reroll a 1 on the rite damage die, once",
				eval : "var ToAdd = [\"blood hunter\", \"subclassfeature7.1\", \"the fiend\"]; if (classes.known[\"blood hunter\"].level >= 7 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)} ToAdd[1] = \"subclassfeature15\"; if (classes.known[\"blood hunter\"].level >= 15 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};"
			},
			"the great old one" : {
				name : "Otherwordly Patron: the Great Old One",
				description : "\n   " + "When I do a critical hit, the target Wis save or frightened of me until my next turn end",
				eval : "var ToAdd = [\"blood hunter\", \"subclassfeature7.1\", \"the great old one\"]; if (classes.known[\"blood hunter\"].level >= 7 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)} ToAdd[1] = \"subclassfeature15\"; if (classes.known[\"blood hunter\"].level >= 15 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};"
			},
			"the undying" : {
				name : "Otherwordly Patron: the Undying",
				description : "\n   " + "When I kill a hostile with a weapon attack, I regain HP equal to my rite damage die",
				eval : "var ToAdd = [\"blood hunter\", \"subclassfeature7.1\", \"the undying\"]; if (classes.known[\"blood hunter\"].level >= 7 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)} ToAdd[1] = \"subclassfeature15\"; if (classes.known[\"blood hunter\"].level >= 15 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};"
			},
		},
		"subclassfeature3.1" : {
			name : "Pact Magic",
			source : ["MM:BH", 5],
			minlevel : 3,
			description : "\n   " + "I can cast warlock cantrips/spells that I know, using Charisma as my spellcasting ability" + "\n   " + "A weapon with an active rite as my spellcasting focus; I regain spell slots in a short rest",
			additional : ["", "", "2 cantrips \u0026 2 spells known", "2 cantrips \u0026 2 spells known", "2 cantrips \u0026 3 spells known", "2 cantrips \u0026 3 spells known", "2 cantrips \u0026 4 spells known", "2 cantrips \u0026 4 spells known", "2 cantrips \u0026 5 spells known", "3 cantrips \u0026 5 spells known", "3 cantrips \u0026 6 spells known", "3 cantrips \u0026 6 spells known", "3 cantrips \u0026 7 spells known", "3 cantrips \u0026 7 spells known", "3 cantrips \u0026 8 spells known", "3 cantrips \u0026 8 spells known", "3 cantrips \u0026 9 spells known", "3 cantrips \u0026 9 spells known", "3 cantrips \u0026 10 spells known", "3 cantrips \u0026 11 spells known"],
		},
		"subclassfeature7" : {
			name : "Mystic Frenzy",
			source : ["MM:BH", 6],
			minlevel : 7,
			description : "\n   " + "When I cast a cantrip as an action, I can make one weapon attack as a bonus action",
			action : ["bonus action", " (with cantrip)"]
		},
		"subclassfeature7.1" : {
			name : "Revealed Arcana",
			source : ["MM:BH", 6],
			minlevel : 7,
			description : "\n   " + "Choose an Otherwordly Patron using the \"Choose Feature\" button above",
			usages : 1,
			recovery : "long rest",
			choices : ["the Archfey", "the Fiend", "the Great Old One", "the Undying"],
			choicesNotInMenu : true,
			"the archfey" : {
				name : "Revealed Arcana: the Archfey",
				description : "\n   " + "Once per long rest, I can cast Blur using a profane soul spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["blur"],
					selection : ["blur"],
					oncelr : true,
				},
			},
			"the fiend" : {
				name : "Revealed Arcana: the Fiend",
				description : "\n   " + "Once per long rest, I can cast Scorching Ray using a profane soul spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["scorching ray"],
					selection : ["scorching ray"],
					oncelr : true,
				},
			},
			"the great old one" : {
				name : "Revealed Arcana: the Great Old One",
				description : "\n   " + "Once per long rest, I can cast Detect Thoughts using a profane soul spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["detect thoughts"],
					selection : ["detect thoughts"],
					oncelr : true,
				},
			},
			"the undying" : {
				name : "Revealed Arcana: the Undying",
				description : "\n   " + "Once per long rest, I can cast Blindness/Deafness using a profane soul spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["blindness/deafness"],
					selection : ["blindness/deafness"],
					oncelr : true,
				},
			},
			eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?blood hunter,subclassfeature3,(the (archfey|fiend|great old one|undying)).*/i; if (CFrem.match(tReg)) {FeaChoice = CFrem.replace(tReg, \"$1\"); AddString(\"Class Features Remember\", \"blood hunter,subclassfeature7.1,\" + FeaChoice, false);};};",
		},
		"subclassfeature11" : {
			name : "Diabolic Channel",
			source : ["MM:BH", 6],
			minlevel : 11,
			description : "\n   " + "As an action, I can infuse a weapon with an active rite with a spell and make an attack" + "\n   " + "The spell has to be level 1+ \u0026 1 action casting time or can do something with 1 action" + "\n   " + "If the attack hits, it does weapon damage and casts the spell/effect on the target",
			action : ["action", ""],
		},
		"subclassfeature15" : {
			name : "Unsealed Arcana",
			source : ["MM:BH", 6],
			minlevel : 15,
			description : "\n   " + "Choose an Otherwordly Patron using the \"Choose Feature\" button above",
			usages : 1,
			recovery : "long rest",
			choices : ["the Archfey", "the Fiend", "the Great Old One", "the Undying"],
			choicesNotInMenu : true,
			"the archfey" : {
				name : "Unsealed Arcana: the Archfey",
				source : ["MM:BH", 6],
				description : "\n   " + "Once per long rest, I can cast Slow using a profane soul spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["slow"],
					selection : ["slow"],
					oncelr : true,
				},
			},
			"the fiend" : {
				name : "Unsealed Arcana: the Fiend",
				source : ["MM:BH", 6],
				description : "\n   " + "Once per long rest, I can cast Fireball using a profane soul spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["fireball"],
					selection : ["fireball"],
					oncelr : true,
				},
			},
			"the great old one" : {
				name : "Unsealed Arcana: the Great Old One",
				source : ["MM:BH", 6],
				description : "\n   " + "Once per long rest, I can cast Haste using a profane soul spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["haste"],
					selection : ["haste"],
					oncelr : true,
				},
			},
			"the undying" : {
				name : "Unsealed Arcana: the Undying",
				source : ["MM:BH", 7],
				description : "\n   " + "Once per long rest, I can cast Bestow Curse using a profane soul spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["bestow curse"],
					selection : ["bestow curse"],
					oncelr : true,
				},
			},
		eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?blood hunter,subclassfeature3,(the (archfey|fiend|great old one|undying)).*/i; if (CFrem.match(tReg)) {FeaChoice = CFrem.replace(tReg, \"$1\"); FeaOldChoice = GetClassFeatureChoice(\"blood hunter\", \"subclassfeature15\"); AddString(\"Class Features Remember\", \"blood hunter,subclassfeature15,\" + FeaChoice, false);};};",
		},
		"subclassfeature18" : {
			name : "Soul Syphon",
			source : ["MM:BH", 7],
			minlevel : 18,
			description : "\n   " + "When I kill a creature of CR15+ with an attack, I recover an expended spell slot",
		},
	},
};

ClassSubList["order of the mutant"] = {
	regExpSearch : /mutant/i,
	subname : "Order of the Mutant",
	source : ["MM:BH", 7],
	features : {
		"subclassfeature3" : {
			name : "Formulas",
			source : ["MM:BH", 7],
			minlevel : 3,
			description : "\n   " + "Use the \"Choose Features\" button above to add Mutagen Formulae to the third page" + "\n   " + "When I gain a new mutagen formula I can also replace one I know with another",
			additional : ["", "", "3 mutagen formulae", "3 mutagen formulae", "3 mutagen formulae", "3 mutagen formulae", "4 mutagen formulae", "4 mutagen formulae", "4 mutagen formulae", "4 mutagen formulae", "5 mutagen formulae", "5 mutagen formulae", "5 mutagen formulae", "5 mutagen formulae", "6 mutagen formulae", "6 mutagen formulae", "6 mutagen formulae", "7 mutagen formulae", "7 mutagen formulae", "7 mutagen formulae"],
			extraname : "Mutagen Formula",
			extrachoices : ["Aether (prereq: level 11 blood hunter)", "Celerity", "Conversant", "Cruelty (prereq: level 11 blood hunter)", "Impermeable", "Mobility", "Nighteye", "Potency", "Precision (prereq: level 11 blood hunter)", "Rapidity", "Reconstruction (prereq: level 7 blood hunter)", "Sagacity", "Shielded", "Unbreakable", "Wariness"],
			"aether (prereq: level 11 blood hunter)" : {
				name : "Aether",
				source : ["MM:BH", 7],
				description : "\n   " + "I gain 20 ft flying speed" + "\n    - " + "Side effect: I have disadvantage on Strength and Dexterity ability checks",
			},
			"celerity" : {
				name : "Celerity",
				source : ["MM:BH", 7],
				description : "\n   " + "My Dexterity score increases by an amount equal to my mutation score" + "\n    - " + "Side effect: My Wisdom score decreases by an amount equal to my mutation score",
			},
			"conversant" : {
				name : "Conversant",
				source : ["MM:BH", 7],
				description : "\n   " + "I gain advantage on Intelligence ability checks" + "\n    - " + "Side effect: I have disadvantage on Charisma ability checks",
			},
			"cruelty (prereq: level 11 blood hunter)" : {
				name : "Cruelty",
				source : ["MM:BH", 7],
				description : "\n   " + "I can make a single weapon attack as a bonus action" + "\n    - " + "Side effect: I have disadvantage on all saving throws",
				action : ["bonus action", ""]
			},
			"impermeable" : {
				name : "Impermeable",
				source : ["MM:BH", 7],
				description : "\n   " + "I gain resistance to piercing damage" + "\n    - " + "Side effect: I gain vulnerability to slashing damage",
			},
			"mobility" : {
				name : "mobility",
				source : ["MM:BH", 7],
				description : "\n   " + "I gain immunity to the grappled and restrained conditions; At 11th level also paralyzed" + "\n    - " + "Side effect: I gain a penalty to initiative rolls equal to 2 times my mutation score",
			},
			"nighteye" : {
				name : "Nighteye",
				source : ["MM:BH", 7],
				description : "\n   " + "I gain darkvision up to 60 ft, or add an extra 60 ft to it if I already have darkvision" + "\n    - " + "Side effect: I gain sunlight sensitivity",
			},
			"potency" : {
				name : "Potency",
				source : ["MM:BH", 7],
				description : "\n   " + "My Strength score increases by an amount equal to my mutation score" + "\n    - " + "Side effect: My Dexterity score decreases by an amount equal to my mutation score"
			},
			"precision (prereq: level 11 blood hunter)" : {
				name : "Precision",
				source : ["MM:BH", 7],
				description : "\n   " + "My weapon attacks score critical hits on attack rolls of 19 and 20" + "\n    - " + "Side effect: All healing that I recieve is halved",
			},
			"rapidity" : {
				name : "Rapidity",
				source : ["MM:BH", 8],
				description : "\n   " + "My speed increases with 10 ft (15 ft at 15th level)" + "\n    - " + "Side effect: I have disadvantage on Dexterity ability checks.",
			},
			"reconstruction (prereq: level 7 blood hunter)" : {
				name : "Reconstruction",
				source : ["MM:BH", 8],
				description : "\n   " + "At the start of my turn in combat when I'm conscious and above 0 HP, I regenerate HP" + "\n   " + "The amount of HP I regenerate is equal to 2 times my mutagen score" + "\n    - " + "Side effect: My speed decreases by 10 ft",
			},
			"sagacity" : {
				name : "Sagacity",
				source : ["MM:BH", 8],
				description : "\n   " + "My Wisdom score increases by an amount equal to my mutation score" + "\n    - " + "Side effect: My armorclass is reduced by my mutation score"
			},
			"shielded" : {
				name : "Shielded",
				source : ["MM:BH", 8],
				description : "\n   " + "I gain resistance to slashing damage" + "\n    - " + "Side effect: I gain vulnerability to bludgeoning damage",
			},
			"unbreakable" : {
				name : "Unbreakable",
				source : ["MM:BH", 8],
				description : "\n   " + "I gain resistance to bludgeoning damage" + "\n    - " + "Side effect: I gain vulnerability to piercing damage",
			},
			"wariness" : {
				name : "Wariness",
				source : ["MM:BH", 8],
				description : "\n   " + "I gain a bonus to my initiative rolls equal to 2 times my mutation score" + "\n    - " + "Side effect: I gain disadvantage on Wisdom (Perception) checks",
			},
		},
		"subclassfeature3.1" : {
			name : "Mutagen Craft",
			source : ["MM:BH", 7],
			minlevel : 3,
			description : "\n   " + "I can craft mutagen during a short rest, which remain usable until my next long rest" + "\n   " + "I can craft as many mutagen each short rest as listed above, but only one of each" + "\n   " + "Taking a mutagen is a bonus action; Mutagen only affect medium or smaller creatures" + "\n   " + "The effects of a mutagen overlap and last until taking a short rest to willingly stop it",
			usages : [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3],
			recovery : "short rest",
			additional : ["", "", "Mutation Score: 1", "Mutation Score: 1", "Mutation Score: 2", "Mutation Score: 2", "Mutation Score: 2", "Mutation Score: 2", "Mutation Score: 3", "Mutation Score: 3", "Mutation Score: 3", "Mutation Score: 3", "Mutation Score: 4", "Mutation Score: 4", "Mutation Score: 4", "Mutation Score: 4", "Mutation Score: 5", "Mutation Score: 5", "Mutation Score: 5", "Mutation Score: 5"],
			action : ["bonus action", " (Consume Mutagen)"]
		},
		"subclassfeature11" : {
			name : "Strange Metabolism",
			source : ["MM:BH", 7],
			minlevel : 11,
			description : "\n   " + "As a bonus action, I can ignore the side effects of a single mutagen for 1 minute",
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"subclassfeature15" : {
			name : "Robust Physiology",
			source : ["MM:BH", 7],
			minlevel : 15,
			description : "\n   " + "I gain immunity to poison damage and the poison condition",
			save : "Immune to poison damage and the poison condition"
		},
		"subclassfeature18" : {
			name : "Exalted Mutation",
			source : ["MM:BH", 7],
			minlevel : 18,
			description : "\n   " + "I permanently gain the (side) effects of one mutagen, chosen from the formulae I know",
		},
	},
};

SourceList["MM:BH"] = {
	name : "Matthew Mercer: Blood Hunter Class",
	abbreviation : "MM:BH",
	group : "Dungeon Masters Guild",
	url : "http://www.dmsguild.com/product/170777/"
};

if (ClassSubList.hunter) ClassSubList.hunter.regExpSearch = /^(?!.*(blood|barbarian|bard|cleric|druid|fighter|monk|paladin|rogue|sorcerer|warlock|wizard))(?=.*(hunter|huntress)).*$/i;
if (ClassSubList["hunter conclave"]) ClassSubList["hunter conclave"].regExpSearch = /^(?!.*(blood|barbarian|bard|cleric|druid|fighter|monk|paladin|rogue|sorcerer|warlock|wizard))(?=.*(hunter|huntress)).*$/i;