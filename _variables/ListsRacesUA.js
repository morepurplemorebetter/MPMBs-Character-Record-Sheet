//All the races from the Unearthed Arcana articles are present in this file chronologically

//the Eberron Unearthed Arcana (http://media.wizards.com/2015/downloads/dnd/UA_Eberron_v1.pdf) of 2015-02-02
//adds three races: the race Changeling
RaceList["changeling"] = {
	regExpSearch : /changeling/i,
	name : "Changeling",
	source : ["UA:E", 1],
	plural : "Changelings",
	size : 3,
	skills : ["Deception"],
	speed : [30, 20],
	languages : ["Common", "+2 from Changeling"],
	age : " reach adulthood in their early teens and live around 80 years",
	height : " stand between 5 and 6 feet tall (5'1\" + 2d4\")",
	weight : " weigh around 140 lb (115 + 2d4 \xD7 2d4 lb)",
	heightMetric : " stand between 1,5 to over 1,8 metres tall (155 + 5d4 cm)",
	weightMetric : " weigh around 65 kg (52 + 5d4 \xD7 4d4 / 10 kg)",
	improvements : "Changeling: +1 Dexterity, +1 Charisma;",
	scores : [0, 1, 0, 0, 0, 1],
	trait : "Changeling (+1 Dexterity, +1 Charisma)\nShapechanger:\n   As an action, I can polymorph into any humanoid of my size that I have seen, or back into my true form.\n   However, my equipment does not change with me.\n   If I die, I revert to my natural appearance.",
	eval : "AddAction(\"action\", \"Polymorph\", \"being a Changeling\");",
	removeeval : "RemoveAction(\"action\", \"Polymorph\");"
};

//the race Warforged
RaceList["warforged"] = {
	regExpSearch : /warforged/i,
	name : "Warforged",
	source : ["UA:E", 3],
	plural : "Warforged",
	size : 3,
	speed : [30, 20],
	languages : ["Common", "+1 from Warforged"],
	age : " are created as adults and will only start to show signs of physical deterioration after 150 years, but have no further aging effects",
	height : " stand between 6 and 7 feet tall (5'10\" + 2d6\")",
	weight : " weigh around 300 lb (270 + 2d6 \xD7 4 lb)",
	heightMetric : " stand between 1,8 and 2,1 metres tall (178 + 5d6 cm)",
	weightMetric : " weigh around 135 lb (125 + 5d6 \xD7 8 / kg)",
	improvements : "Warforged: +1 Strength, +1 Constitution;",
	scores : [1, 0, 1, 0, 0, 0],
	trait : "Warforged (+1 Strength, +1 Constitution)\nLiving Construct:\n   Even though I was constructed, I am a living creature. I am immune to disease. I do not need to eat or breathe, but I can ingest food and drink if I wish.\n   Instead of sleeping, I enter an inactive state for 4 hours each day. I do not dream in this state; I am fully aware of my surroundings and notice approaching enemies and other events as normal. I still need 8 hours for a long rest.",
	eval : "AddACMisc(1, \"Composite Plating\", \"Composite Plating was gained from being a Warforged\")",
	removeeval : "AddACMisc(0, \"Composite Plating\", \"Composite Plating was gained from being a Warforged\")"
};

//the race Shifter with its 6 subraces
RaceList["shifter"] = {
	regExpSearch : /shifter/i,
	name : "Shifter",
	source : ["UA:E", 2],
	plural : "Shifters",
	size : 3,
	speed : [30, 20],
	languages : ["Common", "Sylvan"],
	vision : "Darkvision 60 ft",
	age : " reach adulthood at the end of their teens and live around 100 years",
	height : " range from under 5 to 6 feet tall (4'6\" + 2d8\")",
	weight : " weigh around 140 lb (95 + 2d8 \xD7 2d4 lb)",
	heightMetric : " range from under 1,5 to 1,8 metres tall (4'6\" + 5d8 cm)",
	weightMetric : " weigh around 65 kg (43 + 5d8 \xD7 4d4 / kg)",
	improvements : "Shifter: +1 Dexterity and +1 to other ability score depending on type of shifter;",
	scores : [0, 1, 0, 0, 0, 0],
	trait : "Shifter (+1 Dexterity and +1 to other ability score depending on type of shifter)\n   Use the \"Racial Options\" button to select type of shifter.\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and another bonus depending on the type of shifter.",
	features : {
		"shift" : {
			name : "Shift",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			tooltip : "",
			action : ["bonus action", ""]
		}
	},
	variants : ["beasthide", "cliffwalk", "longstride", "longtooth", "razorclaw", "wildhunt"]
};
RaceSubList["shifter-beasthide"] = {
	regExpSearch : /beasthide/i,
	name : "Beasthide shifter",
	source : ["UA:E", 2],
	plural : "Beasthide shifters",
	improvements : "Beasthide Shifter: +1 Dexterity, +1 Constitution;",
	scores : [0, 1, 1, 0, 0, 0],
	trait : "Beasthide Shifter (+1 Dexterity, +1 Constitution)\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and I gain a +1 bonus to my AC."
};
RaceSubList["shifter-cliffwalk"] = {
	regExpSearch : /cliffwalk/i,
	name : "Cliffwalk shifter",
	source : ["UA:E", 2],
	plural : "Cliffwalk shifters",
	improvements : "Cliffwalk Shifter: +2 Dexterity;",
	scores : [0, 2, 0, 0, 0, 0],
	trait : "Cliffwalk Shifter (+2 Dexterity)\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and I gain a climb speed of 30 feet."
};
RaceSubList["shifter-longstride"] = {
	regExpSearch : /longstride/i,
	name : "Longstride shifter",
	source : ["UA:E", 2],
	plural : "Longstride shifters",
	improvements : "Longstride Shifter: +2 Dexterity;",
	scores : [0, 2, 0, 0, 0, 0],
	trait : "Longstride Shifter (+2 Dexterity)\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and I can use the Dash action as a bonus action."
};
RaceSubList["shifter-longtooth"] = {
	regExpSearch : /(longtooth|longteeth)/i,
	name : "Longtooth shifter",
	source : ["UA:E", 2],
	plural : "Longtooth shifters",
	weapons : ["longtooth"],
	improvements : "Longtooth Shifter: +1 Strength, +1 Dexterity;",
	scores : [1, 1, 0, 0, 0, 0],
	trait : "Longtooth Shifter (+1 Strength, +1 Dexterity)\nShifting: On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again. While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and, as an action, I can make can make a bite attack. This is a melee weapon attack that uses Strength and deals 1d6 piercing damage. If this attack hits a target that is my size or smaller, the target is also grappled."
};
RaceSubList["shifter-razorclaw"] = {
	regExpSearch : /razorclaw/i,
	name : "Razorclaw shifter",
	source : ["UA:E", 2],
	plural : "Razorclaw shifters",
	weapons : ["razorclaw"],
	improvements : "Razorclaw Shifter: +2 Dexterity;",
	scores : [0, 2, 0, 0, 0, 0],
	trait : "Razorclaw Shifter (+2 Dexterity)\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and, as a bonus action, I can make an unarmed strike that can use my Dexterity for the attack roll and damage, dealing slashing damage."
};
RaceSubList["shifter-wildhunt"] = {
	regExpSearch : /wildhunt/i,
	name : "Wildhunt shifter",
	source : ["UA:E", 3],
	plural : "Wildhunt shifters",
	improvements : "Wildhunt Shifter: +1 Dexterity, +1 Wisdom;",
	scores : [0, 1, 0, 0, 1, 0],
	trait : "Wildhunt Shifter (+1 Dexterity, +1 Wisdom)\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and I gain advantage on all Wisdom-based checks and saving throws."
};

//the Waterborne Adventures Unearthed Arcana (https://media.wizards.com/2015/downloads/dnd/UA_Waterborne_v3.pdf) of 2015-05-04
//adds the race Minotaur (Krynn) and its three variants.
RaceList["minotaur"] = {
	regExpSearch : /(minotaur|krynn)/i,
	name : "Minotaur",
	source : ["UA:WA", 1],
	plural : "Minotaurs",
	size : 3,
	speed : [30, 20],
	languages : ["Common"],
	tools : ["Navigator's tools", "Vehicles (water)"],
	weapons : ["horns"],
	age : " rearch adulthood around age 17 and live up to 150 years",
	height : " are well over 6 feet tall",
	weight : " weigh around 300 lb",
	heightMetric : " are well over 1,8 metres tall",
	weightMetric : " weigh around 135 kg",
	improvements : "Minotaur: +1 Strength, and either +1 Intelligence, +1 Wisdom, or another +1 Strength;",
	scores : [1, 0, 0, 0, 0, 0],
	trait : "Minotaur (+1 Strength, and either +1 Int, Wis, or Str) use \"Racial Options\" button\nHorns: I am proficient with my horns, a 1d10 piercing damage melee weapon that grant me advantage on shoving a creature, but not to avoid being shoved myself.\nGoring Rush: When taking a Dash action, I can make a horns attack as a bonus action.\nHammering Horns: When taking a melee Attack action, I can attempt to shove with my horns as a bonus action. I cannot use this to knock a creature prone.\nLabyrinthine Recall: I can perfectly recall any path I have travelled.",
	eval : "AddAction(\"bonus action\", \"Horns attack (when taking dash action)\", \"being a Minotaur\"); AddAction(\"bonus action\", \"Shove another (when taking attack action)\", \"being a Minotaur\");",
	removeeval : "RemoveAction(\"bonus action\", \"Horns attack (when taking dash action)\"); RemoveAction(\"bonus action\", \"Shove another (when taking attack action)\");",
	variants : ["cunning", "intellect", "strength"],
};
RaceSubList["minotaur-cunning"] = {
	regExpSearch : /(cunning|wisdom)/i,
	name : "Minotaur [Cunning]",
	source : ["UA:WA", 2],
	improvements : "Minotaur [cunning]: +1 Strength, +1 Wisdom;",
	scores : [1, 0, 0, 0, 1, 0],
	trait : "Minotaur [cunning] (+1 Strength, +1 Wisdom)\nHorns: I am proficient with my horns, a 1d10 piercing damage melee weapon that grant me advantage on shoving a creature, but not to avoid being shoved myself.\nGoring Rush: When taking a Dash action, I can make a horns attack as a bonus action.\nHammering Horns: When taking a melee Attack action, I can attempt to shove with my horns as a bonus action. I cannot use this to knock a creature prone.\nLabyrinthine Recall: I can perfectly recall any path I have travelled.",
};
RaceSubList["minotaur-intellect"] = {
	regExpSearch : /(intellect|intelligence)/i,
	name : "Minotaur [Intellect]",
	source : ["UA:WA", 2],
	improvements : "Minotaur [intellect]: +1 Strength, +1 Intelligence;",
	scores : [1, 0, 0, 1, 0, 0],
	trait : "Minotaur [intellect] (+1 Strength, +1 Intelligence)\nHorns: I am proficient with my horns, a 1d10 piercing damage melee weapon that grant me advantage on shoving a creature, but not to avoid being shoved myself.\nGoring Rush: When taking a Dash action, I can make a horns attack as a bonus action.\nHammering Horns: When taking a melee Attack action, I can attempt to shove with my horns as a bonus action. I cannot use this to knock a creature prone.\nLabyrinthine Recall: I can perfectly recall any path I have travelled.",
};
RaceSubList["minotaur-strength"] = {
	regExpSearch : /(strength|strong|\bmight\b)/i,
	name : "Minotaur [Strength]",
	source : ["UA:WA", 2],
	improvements : "Minotaur [strength]: +2 Strength;",
	scores : [1, 0, 0, 0, 0, 0],
	trait : "Minotaur [strength] (+2 Strength)\nHorns: I am proficient with my horns, a 1d10 piercing damage melee weapon that grant me advantage on shoving a creature, but not to avoid being shoved myself.\nGoring Rush: When taking a Dash action, I can make a horns attack as a bonus action.\nHammering Horns: When taking a melee Attack action, I can attempt to shove with my horns as a bonus action. I cannot use this to knock a creature prone.\nLabyrinthine Recall: I can perfectly recall any path I have travelled.",
};

//the That Old Black Magic Unearthed Arcana (http://media.wizards.com/2015/downloads/dnd/07_UA_That_Old_Black_Magic.pdf) of 2015-12-17
//adds a racial variant: the Abyssal Tiefling
function AmendRaces() { //a function to create these tiefling alternatives, together with the Feral Tiefling from SCAG
	[{
		objname : "feral tiefling",
		replaceTraitTxt : ["+1 Intelligence, +2 Charisma", "+2 Dexterity, +1 Intelligence"],
		replaceNameTxt : ["tiefling", "feral tiefling"],
		regExpSearch : /^(?=.*feral)((?=.*tiefling)|(?=.*planetouched)(?=.*(hell|abyss|fiend|devil))).*$/i,
		name : "Feral tiefling",
		source : ["S", 118],
		plural : "Feral tieflings",
		sortname : "Tiefling, Feral",
		improvements : "Feral Tiefling: +2 Dexterity, +1 Intelligence;",
		scores : [0, 2, 0, 1, 0, 0],
		trait : "Feral Tiefling (+2 Dexterity, +1 Intelligence)\n\nInfernal Legacy:\n   I know the Thaumaturgy cantrip.\n   At 3rd level, I can cast the Hellish Rebuke spell once per long rest as a 2nd-level spell.\n   At 5th level, I can also cast the Darkness spell once per long rest.\n   Charisma is my spellcasting ability for these spells."
	}, {
		objname : "abyssal tiefling",
		replaceTraitTxt : ["+1 Intelligence, +2 Charisma", "+1 Constitution, +2 Charisma"],
		replaceNameTxt : ["tiefling", "abyssal tiefling"],
		regExpSearch : /^(?=.*abyssal)((?=.*tiefling)|(?=.*planetouched)(?=.*(hell|abyss|fiend|devil))).*$/i,
		name : "Abyssal tiefling",
		source : ["UA:TOBM", 1],
		plural : "Abyssal tieflings",
		sortname : "Tiefling, Abyssal",
		improvements : "Abyssal Tiefling: +1 Constitution, +2 Charisma;",
		scores : [0, 0, 1, 0, 0, 2],
		trait : "Abyssal Tiefling (+1 Constitution, +2 Charisma)\nAbyssal Toughness: My hit point maximum increases with half the levels I have (min 1). Abyssal Arcana: After each long rest I gain randomly determined spellcasting ability (d6). This is a cantrip, and on both 3rd and 5th level a spell that I can cast once, at 2nd-level.\n1: (Dancing Lights, Burning Hands, Alter Self); 2: (True Strike, Charm Person, Darkness)" + (!typePF ? ";" : " ") + " 3: (Light, Magic Missile, Invisibility); 4: (Spare the Dying, Hideous Laughter, Mirror Image)" + (!typePF ? ";" : " ") + " 5: (Message, Cure Wounds, Levitate); 6: (Prestidigitation, Thunderwave, Spider Climb)",
		languages : ["Common", "Abyssal"],
		spellcastingBonus : {
			name : "Abyssal Arcana (level 1)",
			spells : ["dancing lights", "true strike", "light", "message", "spare the dying", "prestidigitation"],
			atwill : true
		},
		features : {
			"abyssal fortitude" : {
				name : "Abyssal Fortitude",
				minlevel : 1,
				calcChanges : {
					hp : "extrahp += Math.max(1,Math.floor(totalhd/2)); extrastring += \"\\n + \" + Math.max(1,Math.floor(totalhd/2)) + \" from Abyssal Fortitude\";"
				}
			},
			"abyssal arcana (level 3)" : {
				name : "Abyssal Arcana (level 3)",
				minlevel : 3,
				usages : 1,
				recovery : "long rest",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Abyssal Arcana (level 3)",
					spells : ["burning hands", "charm person", "magic missile", "cure wounds", "tasha's hideous laughter", "thunderwave"],
					oncelr : true
				}
			},
			"abyssal arcana (level 5)" : {
				name : "Abyssal Arcana (level 5)",
				minlevel : 5,
				usages : 1,
				recovery : "long rest",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Abyssal Arcana (level 5)",
					spells : ["alter self", "darkness", "invisibility", "levitate", "mirror image", "spider climb"],
					oncelr : true
				}
			}
		}
	}].forEach( function(tRace) {
		//make a new RaceList object for each race
		RaceList[tRace.objname] = eval(RaceList.tiefling.toSource());
		for (var rFea in tRace) {
			if ((/objname|replaceTraitTxt|replaceNameTxt/).test(rFea)) continue;
			RaceList[tRace.objname][rFea] = tRace[rFea];
		};
		//now do the variants
		RaceList[tRace.objname].variants.forEach( function(nVar) {
			RaceSubList[tRace.objname + "-" + nVar] = eval(RaceSubList["tiefling-" + nVar].toSource());
			var thisVar = RaceSubList[tRace.objname + "-" + nVar];
			thisVar.trait = thisVar.trait.replace(tRace.replaceTraitTxt[0], tRace.replaceTraitTxt[1]);
			thisVar.trait = thisVar.trait.replace(tRace.replaceNameTxt[0].capitalize(), tRace.replaceNameTxt[1].capitalize());
			thisVar.name = thisVar.name.replace(tRace.replaceNameTxt[0], tRace.replaceNameTxt[1]);
			thisVar.plural = thisVar.plural.replace(tRace.replaceNameTxt[0], tRace.replaceNameTxt[1]);
		});
	});
};