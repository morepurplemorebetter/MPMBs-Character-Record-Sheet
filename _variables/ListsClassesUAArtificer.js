/*
	the Artificer Unearthed Arcana of 2017-01-09
	(http://media.wizards.com/2016/dnd/downloads/1_UA_Artificer_20170109.pdf)
	
	WARNING: there are no official multiclassing rules for Artificer; the ones provided here are extrapolated based on other classes.
*/
//adds a class, the Artificer, with two subclasses, Alchemist and Gunsmith
//this code was for a big part contributed by RCanine on ENworld

ClassList.artificer = {
	regExpSearch : /^(?=.*artificer)(?!.*wizard).*$/i,
	name : "Artificer",
	source : ["UA:A", 1],
	primaryAbility : "\n \u2022 Artificer: Intelligence;",
	abilitySave : 4,
	prereqs : "\n \u2022 Artificer: Intelligence 13;",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5],
	die : 8,
	saves : ["Con", "Int"],
	skills : ["\n\n" + toUni("Artificer") + ": Choose three from Arcana, Deception, History, Investigation, Medicine, Nature, Religion, and Sleight of Hand.", "\n\n" + toUni("Multiclass Artificer") + ": Choose one from Arcana, Deception, History, Investigation, Medicine, Nature, Religion, and Sleight of Hand."],
	tools : ["Thieves' tools + any two tools", "Any one tool"],
	armor : [
		[true, true, false, false]
	],
	weapons : [
		[true, false]
	],
	equipment : "Artificer starting equipment:\n \u2022 A handaxe and a light hammer -or- any two simple weapons;\n \u2022 Scale mail -or- studded leather armor;\n \u2022 A light crossbow and 20 bolts;\n \u2022 A dungeoneer's pack;\n \u2022 Thieves' tools.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Artificer Specialism", ["artificer-alchemist", "artificer-gunsmith"]],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : 3,
	spellcastingKnown : {
		spells : [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13]
	},
	features : {
		"subclassfeature1" : {
			name : "Artificer Specialist",
			source : ["UA:A", 2],
			minlevel : 1,
			description : desc([
				"Choose an Artificer Specialism and put it in the \"Class\" field on the first page",
				"Choose either Alchemist or Gunsmith"
			])
		},
		"magic item analysis" : {
			name : "Magic Item Analysis",
			source : ["UA:A", 2],
			minlevel : 1,
			description : desc(["I can cast Detect Magic and Identify as rituals without requiring material components"]),
			spellcastingBonus : [{
				name : "Magic Item Analysis",
				spells : ["detect magic"],
				selection : ["detect magic"],
				firstCol : "(R)"
			}, {
				name : "Magic Item Analysis",
				spells : ["identify"],
				selection : ["identify"],
				firstCol : "(R)"
			}]
		},
		"tool expertise" : {
			name : "Tool Expertise",
			source : ["UA:A", 3],
			minlevel : 2,
			description : desc(["I have expertise with any tool proficiencies I gain from the Artificer class"]),
			skillstxt : "\n\n" + toUni("Artificer") + ": expertise with with any tool proficiencies gained from the Artificer class.",
			eval : "if ((/thieves.? tools/i).test(What(\"Too Text\"))) { Checkbox(\"Too Exp\", true); };",
			removeeval : "if ((/thieves.? tools/i).test(What(\"Too Text\"))) { Checkbox(\"Too Exp\", false); };"
		},
		"wondrous invention" : {
			name : "Wondrous Invention",
			source : ["UA:A", 3],
			minlevel : 2,
			description : desc(["I gain a magic item that I have crafted; Use the \"Choose Features\" button above"]),
			additional : levels.map(function (n) {
				if (n < 2) return "";
				if (n < 5) return "1 item";
				if (n < 10) return "2 items";
				if (n < 15) return "3 items";
				if (n < 20) return "4 items";
				return "5 items";
			}),
			extraname : "Wondrous Invention",
			extrachoices : ["Bag of Holding (prereq: level 2 artificer)", "Cap of Water Breathing (prereq: level 2 artificer)", "Driftglobe (prereq: level 2 artificer)", "Goggles of Night (prereq: level 2 artificer)", "Sending Stones (prereq: level 2 artificer)", "Alchemy Jug (prereq: level 5 artificer)", "Helm of Comprehending Languages (prereq: level 5 artificer)", "Lantern of Revealing (prereq: level 5 artificer)", "Ring of Swimming (prereq: level 5 artificer)", "Robe of Useful Items (prereq: level 5 artificer)", "Rope of Climbing (prereq: level 5 artificer)", "Wand of Magic Detection (prereq: level 5 artificer)", "Wand of Secrets (prereq: level 5 artificer)", "Bag of Beans (prereq: level 10 artificer)", "Chime of Opening (prereq: level 10 artificer)", "Decanter of Endless Water (prereq: level 10 artificer)", "Eyes of Minute Seeing (prereq: level 10 artificer)", "Folding Boat (prereq: level 10 artificer)", "Heward’S Handy Haversack (prereq: level 10 artificer)", "Boots of Striding and Springing (prereq: level 15 artificer)", "Bracers of Archery (prereq: level 15 artificer)", "Brooch of Shielding (prereq: level 15 artificer)", "Broom of Flying (prereq: level 15 artificer)", "Hat of Disguise (prereq: level 15 artificer)", "Slippers of Spider Climbing (prereq: level 15 artificer)", "Eyes of the Eagle (prereq: level 20 artificer)", "Gem of Brightness (prereq: level 20 artificer)", "Gloves of Missile Snaring (prereq: level 20 artificer)", "Gloves of Swimming and Climbing (prereq: level 20 artificer)", "Ring of Jumping (prereq: level 20 artificer)", "Ring of Mind Shielding (prereq: level 20 artificer)", "Wings of Flying (prereq: level 20 artificer)"] //come back to this with the function to make the individual entries
		},
		"spellcasting" : {
			name : "Spellcasting",
			source : ["UA:A", 3],
			minlevel : 3,
			description : desc([
				"I can cast artificer spells that I know, using Intelligence as my spellcasting ability",
				"I can use an arcane focus as a spellcasting focus"
			])
		},
		"infuse magic" : {
			name : "Infuse Magic",
			source : ["UA:A", 4],
			minlevel : 4,
			description : desc([
				"By spending 1 minute, I can infuse one of my artificer spells into a nonmagical item",
				"This expends a spell slot as normal and the spell must have a casting time of 1 action",
				"An item holds max one spell for 8 hours; I can have up to my Int mod of infused items",
				"A creature holding an infused item can use an action to cast the spell, using my ability",
				"The spell's target is the creature activating it or, with area of effect spells, the item"
			])
		},
		"mechanical servant" : {
			name : "Mechanical Servant",
			source : ["UA:A", 4],
			minlevel : 6,
			description : desc([
				"I create a construct that obeys my orders; It acts on its own initiative",
				"I can repair it to 1 HP during a long rest, or build a new one in a week with 1000 gp",
				"As a reaction when I'm attacked in melee, I can have it make a melee attack back"
			])
		},
		"superior attunement" : {
			name : "Superior Attunement",
			source : ["UA:A", 4],
			minlevel : 5,
			description : "",
			additional : levels.map(function (n) {
				if (n < 5) return "";
				if (n < 15) return "attune to 4 magic items instead of 3";
				if (n < 20) return "attune to 5 magic items instead of 3";
				return "attune to 6 magic items instead of 3";
			})
		},
		"soul of artifice" : {
			name : "Soul of Artifice",
			source : ["UA:A", 4],
			minlevel : 20,
			description : desc(["I gain a +1 bonus to all saving throws per magic item I am currently attuned to"]),
			save : "+1 to all saves per attuned magic item"
		}
	}
};

//the Alchemist subclass for the Artificer
ClassSubList["artificer-alchemist"] = {
	regExpSearch : /^(?=.*artificer)(?=.*alchemist)(?!.*wizard).*$/i,
	subname : "Alchemist",
	source : ["UA:A", 5],
	features : {
		"subclassfeature1" : {
			name : "Alchemist's Satchel",
			source : ["UA:A", 5],
			minlevel : 1,
			description : desc([
				"I craft an Alchemist's Satchel, a magic item with which I can create concoctions",
				"Whenever I reach in, it holds the material for the Alchemical Formula I want to use",
				"If lost, I craft another by spending 8 hours a day for 3 days and 100 gp of materials"
			])
		},
		"subclassfeature1.1" : {
			name : "Alchemy Formulae",
			source : ["UA:A", 5],
			minlevel : 1,
			description : desc([
				"I learn Alchemical Formulae that I can use if I have my Alchemist's Satchel within reach",
				"I learn the Alchemical Acid and Fire formulae, and additional depending on my level",
				"Use the \"Choose Features\" button above to select additional Alchemical Formulae"
			]),
			additional : levels.map(function (n) {
				if (n < 3) return "1 additional formula";
				if (n < 9) return "2 additional formula";
				if (n < 14) return "3 additional formula";
				if (n < 17) return "4 additional formula";
				return "5 additional formula";
			}),
			extraname : "Alchemical Formula",
			extrachoices : ["Healing Draught", "Smoke Stick", "Swift Step Draught", "Tanglefoot Bag", "Thunderstone"],
			"healing draught" : {
				name : "Healing Draught",
				source : ["UA:A", 5],
				description : desc([
					"As an action, I can take a vial of healing liquid from my satchel, which lasts for 1 hour",
					"Anyone can drink this as an action, healing in doing so, after which the vial disappears",
					"One vial heals a number of d8 equal to half my artificer level (rounded up) in HP",
					"After being healed this way, a creature can't do so again until it finishes a long rest",
					"While a Healing Draught exists, I can't use this formula to create another one"
				]),
				action : ["action", ""]
			},
			"smoke stick" : {
				name : "Smoke Stick",
				source : ["UA:A", 5],
				description : desc([
					"As an action, I can take a smoke stick from my satchel and throw it up to 30 ft away",
					"The stick produces smoke in a 10-ft radius around it, blocking vision, incl. darkvision",
					"It disappears after 1 minute; After creating one, I can't create a new one for 1 minute"
				]),
				action : ["action", ""]
			},
			"swift step draught" : {
				name : "Swift Step Draught",
				source : ["UA:A", 5],
				description : desc([
					"As a bonus action, I take a vial of brown liquid from my satchel, which lasts for 1 minute",
					"Any creature can drink this vial as an action, gaining +20 ft speed for 1 minute",
					"After use, the vial disappears; After creating one, I can't create a new one for 1 minute"
				]),
				action : ["bonus action", ""]
			},
			"tanglefoot bag" : {
				name : "Tanglefoot Bag",
				source : ["UA:A", 6],
				description : desc([
					"As an action, I can hurl a bag of black tar to a point on the ground within 30 ft",
					"It bursts and covers the ground with sticky goo in a 5-ft radius, which lasts for 1 min",
					"It is difficult terrain and anyone starting its turn in it has its speed halved for that turn",
					"After creating one, I can't create a new one for 1 minute"
				]),
				action : ["action", ""]
			},
			"thunderstone" : {
				name : "Thunderstone",
				source : ["UA:A", 6],
				description : desc([
					"As an action, I can hurl a crystalline shard at a creature/object/surface within 30 ft",
					"It shatters on impact and any creature within 10 ft must make a Constitution save",
					"If failed, a creature is knocked prone and pushed 10 ft away from the point of impact"
				]),
				action : ["action", ""]
			}
		},
		"subclassfeature1.2" : {
			name : "Formula: Alchemical Acid",
			source : ["UA:A", 5],
			minlevel : 1,
			description : desc([
				"As an action, I can hurl a vial of acid at a creature or object within 30 ft",
				"It shatters on impact and the target must succeed on a Dex save or take acid damage",
				"An object automatically fails its saving throw and takes maximum damage"
			]),
			additional : levels.map(function (n) {
				return Math.ceil(n / 2) + "d6 acid damage";
			}),
			action : ["action", ""],
			eval : "AddWeapon('Alchemical Acid');",
			removeeval : "RemoveWeapon('Alchemical Acid');",
			calcChanges : {
				atkAdd : ["if (WeaponName === 'alchemical acid' && classes.known.artificer && classes.known.artificer.level) {fields.Proficiency = true; fields.Damage_Die = function(n){return Math.ceil(n / 2) + 'd6';}(classes.known.artificer.level); }; ", ""]
			}
		},
		"subclassfeature1.3" : {
			name : "Formula: Alchemical Fire",
			source : ["UA:A", 5],
			minlevel : 1,
			description : desc([
				"As an action, I can hurl a vial of volatile liquid at a creature/object/surface within 30 ft",
				"It explodes and all within a 5-ft radius must succeed on a Dex save or take fire damage"
			]),
			additional : levels.map(function (n) {
				return Math.ceil(n / 3) + "d6 fire damage";
			}),
			action : ["action", ""],
			eval : "AddWeapon('Alchemical Fire');",
			removeeval : "RemoveWeapon('Alchemical Fire');",
			calcChanges : {
				atkAdd : ["if (WeaponName === 'alchemical fire' && classes.known.artificer && classes.known.artificer.level) {fields.Proficiency = true; fields.Damage_Die = function(n){return Math.ceil(n / 3) + 'd6';}(classes.known.artificer.level); }; ", ""]
			}
		}
	}
};

//the Gunsmith subclass for the Artificer
ClassSubList["artificer-gunsmith"] = {
	regExpSearch : /^(?=.*artificer)(?=.*gunsmith)(?!.*wizard).*$/i,
	subname : "Gunsmith",
	source : ["UA:A", 6],
	features : {
		"subclassfeature1.1" : {
			name : "Master Smith",
			source : ["UA:A", 6],
			minlevel : 1,
			description : desc(["I gain proficiency with smith's tools and I learn the mending cantrip"]),
			spellcastingBonus : {
				name : "Master Smith",
				spells : ["mending"],
				selection : ["mending"]
			},
			eval : "AddTool(\"Smith's tools\", \"Gunsmith (Master Smith)\");",
			removeeval : "RemoveTool(\"Smith's tools\", \"Gunsmith (Master Smith)\");"
		},
		"subclassfeature1.2" : {
			name : "Thunder Cannon",
			source : ["UA:A", 6],
			minlevel : 1,
			description : desc([
				"I craft a magical firearm, my thunder cannon, with which I am proficient",
				"If lost, I craft another by spending 8 hours a day for 3 days and 100 gp of materials"
			]),
			weapons : [false, false, ["thunder cannon"]],
			action : ["bonus action", " (reload)"],
			eval : "AddWeapon('Thunder Cannon');",
			removeeval : "RemoveWeapon('Thunder Cannon');"
		},
		"subclassfeature1.3" : {
			name : "Arcane Magazine",
			source : ["UA:A", 6],
			minlevel : 1,
			description : desc([
				"I craft a leather bag that holds my tools, ammunition, and materials for the weapon",
				"I can use it to produce 40 rounds of ammo after a long rest or 10 after a short rest",
				"If lost, I can create a new one as part of a long rest with 25 gp of materials"
			])
		},
		"subclassfeature3" : {
			name : "Thunder Monger",
			source : ["UA:A", 6],
			minlevel : 3,
			description : desc(["As an action, I can make an attack with my thunder cannon that does extra damage"]),
			additional : levels.map(function (n) {
				if (n < 3) return "";
				return "+" + Math.floor((n - 1) / 2) + "d6 thunder damage";
			}),
			action : ["action", ""],
			eval : "AddWeapon('Thunder Cannon (Monger)');",
			removeeval : "RemoveWeapon('Thunder Cannon (Monger)');",
			calcChanges : {
				atkAdd : ["if (WeaponName === 'thunder cannon-thunder monger' && classes.known.artificer && classes.known.artificer.level > 2) {fields.Description += '; +' + function(n){return Math.floor((n - 1) / 2) + 'd6 thunder damage';}(classes.known.artificer.level); }; ", ""]
			}
		},
		"subclassfeature9" : {
			name : "Blast Wave",
			source : ["UA:A", 6],
			minlevel : 9,
			description : desc([
				"As an action, I can make a special attack with my thunder cannon in a 15-ft cone",
				"Creatures in the area must make a Str save or take damage and pushed back 10 ft"
			]),
			additional : levels.map(function (n) {
				return n < 9 ? "" :
				n < 13 ? "2d6 force damage" :
				n < 17 ? "3d6 force damage" :
				"4d6 force damage";
			}),
			action : ["action", ""],
			eval : "AddWeapon('Thunder Cannon (Blast Wave)');",
			removeeval : "RemoveWeapon('Thunder Cannon (Blast Wave)');",
			calcChanges : {
				atkAdd : ["if (WeaponName === 'thunder cannon-blast wave' && classes.known.artificer && classes.known.artificer.level >= 13) {fields.Damage_Die = function(n){return (n < 17 ? 3 : 4) + 'd6';}(classes.known.artificer.level); }; ", ""]
			}
		},
		"subclassfeature14" : {
			name : "Piercing Round",
			source : ["UA:A", 6],
			minlevel : 14,
			description : desc([
				"As an action, I can make a special attack with my thunder cannon in a 30-ft line",
				"Creatures in the 5-ft wide line must make a Dex save or take damage"
			]),
			additional : levels.map(function (n) {
				return n < 14 ? "" :
				n < 19 ? "4d6 lightning damage" :
				"6d6 lightning damage";
			}),
			action : ["action", ""],
			eval : "AddWeapon('Thunder Cannon (Piercing Round)');",
			removeeval : "RemoveWeapon('Thunder Cannon (Piercing Round)');",
			calcChanges : {
				atkAdd : ["if (WeaponName === 'thunder cannon-piercing round' && classes.known.artificer && classes.known.artificer.level >= 19) {fields.Damage_Die = '6d6'; }; ", ""]
			}
		},
		"subclassfeature17" : {
			name : "Explosive Round",
			source : ["UA:A", 7],
			minlevel : 17,
			description : desc([
				"As an action, I can make a special exploding attack with my thunder cannon",
				"A 30-ft radius sphere somewhere within range of the thunder cannon is affected",
				"Creatures in the area must make a Dexterity saving throw or take 4d8 fire damage"
			]),
			additional : "4d8 fire damage",
			action : ["action", ""],
			eval : "AddWeapon('Thunder Cannon (Explosive Round)');",
			removeeval : "RemoveWeapon('Thunder Cannon (Explosive Round)');"
		}
	}
};

//Magic Item additions 
var MagicItemsList = {
	"alchemy jug" : {
		name : "Alchemy Jug",
		source : ["D", 150],
		description : "A heavy ceramic jug. As an action, the jug can be commanded to hold a chosen liquid. With another action, the jug can be uncorked and the liquid can be poured out, at 2 gal. per minute. Once commanded to produce a liquid, it can't produce a different one or more than the max of one, until the next dawn. Liquids (with max): Acid (8 fl. oz.), Basic poison (1/2 fl. oz.), Beer (4 gal.), Honey (1 gal.), Mayonnaise (2 gal.), Oil (1 quart), Vinegar (2 gal.), Fresh water (8 gal.), Salt water (12 gal.), Wine (1 gal.)",
		descriptionLong : true,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 12,
		descriptionFull : "This ceramic jug appears to be able to hold a gallon of liquid and weighs 12 pounds whether full or empty. Sloshing sounds can be heard from within the jug when it is shaken, even if the jug is empty." + "\n   " + "You can use an action and name one liquid from the table below to cause the jug to produce the chosen liquid. Afterward, you can uncork the jug as an action and pour that liquid out, up to 2 gallons per minute. The maximum amount of liquid the jug can produce depends on the liquid you named." + "\n   " + "Once the jug starts producing a liquid, it can't produce a different one, or more of one that has reached its maximum, until the next dawn.\n\n" + toUni("Max") + "\t" + toUni("Liquid") + "\t\t" + toUni("Max") + "\t" + toUni("Liquid") + "\n8 ounces\tAcid\t\t1 quart\tOil\n1/2 ounce\tBasic poison\t2 gallons\tVinegar\n4 gallons\tBeer\t\t8 gallons\tWater, fresh\n1 gallon\tHoney\t\t12 gallons\tWater, salt\n2 gallons\tMayonnaise\t1 gallon\tWine"
	},
	"bag of beans" : {
		name : "Bag of Beans",
		source : ["D", 152],
		description : "This heavy cloth bag (0.5 lb) contains 3d4 dry beans (0.25 lb each). Dumping the bag's contents out on the ground, will cause the beans to explode in a 10-ft radius. All in the area must make a DC 15 Dex save or take 5d4 fire damage, or half on a successful save. The fire ignites unattended flammable objects in the area.\nPlanting a bean from the bag in dirt or sand and then watering it, causes an effect 1 minute later from the ground where it was planted, as determined by the DM.",
		descriptionLong : true,
		category : "wondrous item",
		rarity : "rare",
		attunement : false,
		weight : 2.5,
		descriptionFull : "Inside this heavy cloth bag are 3d4 dry beans. The bag weighs 1/2 pound plus 1/4 pound for each bean it contains." + "\n   " + "If you dump the bag's contents out on the ground, they explode in a 10-foot radius, extending from the beans. Each creature in the area, including you, must make a DC 15 Dexterity saving throw, taking 5d4 fire damage on a failed save, or half as much damage on a successful one. The fire ignites flammable objects in the area that aren't being worn or carried." + "\n   " + "If you remove a bean from the bag, plant it in dirt or sand, and then water it, the bean produces an effect 1 minute later from the ground where it was planted. The GM can choose an effect from the following table, determine it randomly, or create an effect.\n\n" + toUni("d100") + "\t" + toUni("Effect") + "\n" + toUni("01") + "\t5d4 toadstools sprout. If a creature eats a toadstool, roll any die. On an odd roll, the eater must succeed on a DC 15 Constitution saving throw or take 5d6 poison damage and become poisoned for 1 hour. On an even roll, the eater gains 5d6 temporary hit points for 1 hour.\n" + toUni("02-10") + "\tA geyser erupts and spouts water, beer, berry juice, tea, vinegar, wine, or oil (GM's choice) 30 feet into the air for 1d12 rounds.\n" + toUni("11-20") + "\tA treant sprouts. There's a 50 percent chance that the treant is chaotic evil and attacks.\n" + toUni("21-30") + "\tAn animate, immobile stone statue in your likeness rises. It makes verbal threats against you. If you leave it and others come near, it describes you as the most heinous of villains and directs the newcomers to find and attack you. If you are on the same plane of existence as the statue, it knows where you are. The statue becomes inanimate after 24 hours.\n" + toUni("31-40") + "\tA campfire with blue flames springs forth and burns for 24 hours (or until it is extinguished).\n" + toUni("41-50") + "\t1d6 + 6 shriekers sprout.\n" + toUni("51-60") + "\t1d4 + 8 bright pink toads crawl forth. Whenever a toad is touched, it transforms into a Large or smaller monster of the GM's choice. The monster remains for 1 minute, then disappears in a puff of bright pink smoke.\n" + toUni("61-70") + "\tA hungry bulette burrows up and attacks.\n" + toUni("71-80") + "\tA fruit tree grows. It has 1d10 + 20 fruit, 1d8 of which act as randomly determined magic potions, while one acts as an ingested poison of the GM's choice. The tree vanishes after 1 hour. Picked fruit remains, retaining any magic for 30 days.\n" + toUni("81-90") + "\tA nest of 1d4 + 3 eggs springs up. Any creature that eats an egg must make a DC 20 Constitution saving throw. On a successful save, a creature permanently increases its lowest ability score by 1, randomly choosing among equally low scores. On a failed save, the creature takes 10d6 force damage from an internal magical explosion.\n" + toUni("91-99") + "\tA pyramid with a 60-foot-square base bursts upward. Inside is a sarcophagus containing a mummy lord. The pyramid is treated as the mummy lord's lair, and its sarcophagus contains treasure of the GM's choice." + "\n" + toUni("100") + "\tA giant beanstalk sprouts, growing to a height of the GM's choice. The top leads where the GM chooses, such as to a great view, a cloud giant's castle, or a different plane of existence."
	},
	"bag of holding" : {
		name : "Bag of Holding",
		source : ["D", 153],
		description : "The bag can hold up to 500 lb, not exceeding a volume of 64 cu ft, but weighs 15 lb regardless of content. Retrieving an item from it requires an action. If the bag is overloaded, pierced, or torn, it is destroyed, leaving its contents in the Astral plane.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 15,
		descriptionFull : "This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 15 pounds, regardless of its contents. Retrieving an item from the bag requires an action." + "\n   " + "If the bag is overloaded, pierced, or torn, it ruptures and is destroyed, and its contents are scattered in the Astral Plane. If the bag is turned inside out, its contents spill forth, unharmed, but the bag must be put right before it can be used again. Breathing creatures inside the bag can survive up to a number of minutes equal to 10 divided by the number of creatures (minimum 1 minute), after which time they begin to suffocate." + "\n   " + "Placing a bag of holding inside an extradimensional space created by a handy haversack, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it to a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened."
	},
	"boots of striding and springing" : {
		name : "Boots of Striding and Springing",
		source : ["D", 156],
		description : "While wearing these boots, my walking speed increases to 30 ft, and it isn't reduced if I'm encumbered or wearing heavy armor. In addition, I can jump three times the normal distance, though I can't jump farther my your remaining movement would allow.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		weight : 1,
		descriptionFull : "While you wear these boots, your walking speed becomes 30 feet, unless your walking speed is higher, and your speed isn't reduced if you are encumbered or wearing heavy armor. In addition, you can jump three times the normal distance, though you can't jump farther than your remaining movement would allow."
	},
	"bracers of archery" : {
		name : "Bracers of Archery",
		source : ["D", 156],
		description : "While wearing these bracers, I have proficiency with the longbow and shortbow, and I gain a +2 bonus to damage rolls on ranged attacks made with such weapons.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		weight : 1,
		descriptionFull : "While wearing these bracers, you have proficiency with the longbow and shortbow, and you gain a +2 bonus to damage rolls on ranged attacks made with such weapons."
	},
	"brooch of shielding" : {
		name : "Brooch of Shielding",
		source : ["D", 156],
		description : "While wearing this brooch, I have resistance to force damage, and I have immunity to damage from the magic missile spell.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		weight : 0,
		descriptionFull : "While wearing this brooch, you have resistance to force damage, and you have immunity to damage from the magic missile spell."
	},
	"broom of flying" : {
		name : "Broom of Flying",
		source : ["D", 156],
		description : "If I speak this broom's command word while standing astride it, it then hovers beneath me and can be ridden. It has a 50 ft flying speed and can carry up to 400 lb. While carring over 200 lb, its speed becomes 30 ft. The broom stops hovering when I land.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 3,
		descriptionFull : "This wooden broom, which weighs 3 pounds, functions like a mundane broom until you stand astride it and speak its command word. It then hovers beneath you and can be ridden in the air. It has a flying speed of 50 feet. It can carry up to 400 pounds, but its flying speed becomes 30 feet while carrying over 200 pounds. The broom stops hovering when you land." + "\n   " + "You can send the broom to travel alone to a destination within 1 mile of you if you speak the command word, name the location, and are familiar with that place. The broom comes back to you when you speak another command word, provided that the broom is still within 1 mile of you."
	},
	"cap of water breathing" : {
		name : "Cap of Water Breathing",
		source : ["D", 157],
		description : "If wearing this cap underwater, I can speak its command word as an action to create a bubble of air around my head, allowing me to breathe normally. This bubble stays until I again speak the command word, the cap is removed, or I am not underwater.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "While wearing this cap underwater, you can speak its command word as an action to create a bubble of air around your head. It allows you to breathe normally underwater. This bubble stays with you until you speak the command word again, the cap is removed, or you are no longer underwater."
	},
	"chime of opening" : {
		name : "Chime of Opening",
		source : ["D", 158],
		description : "As an action, I can strike it and point it at an object within 120 ft that can be opened. One lock or latch on it opens unless the sound can't reach the object. If no locks or latches remain, the object itself opens. The chime has ten charges.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "rare",
		attunement : false,
		weight : 1,
		descriptionFull : "This hollow metal tube measures about 1 foot long and weighs 1 pound. You can strike it as an action, pointing it at an object within 120 feet of you that can be opened, such as a door, lid, or lock. The chime issues a clear tone, and one lock or latch on the object opens unless the sound can't reach the object. If no locks or latches remain, the object itself opens." + "\n   " + "The chime can be used ten times. After the tenth time, it cracks and becomes useless."
	},
	"decanter of endless water" : {
		name : "Decanter of Endless Water",
		source : ["D", 161],
		description : "I can use an action to remove the stopper from this flask and speak one of three command words, making fresh/salt water (my choice) pour out until the start of my next turn. 'Stream' produces 1 gallon of water. 'Fountain' produces 5 gallons of water.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 2,
		descriptionFull : "This stoppered flask sloshes when shaken, as if it contains water. The decanter weighs 2 pounds." + "\n   " + "You can use an action to remove the stopper and speak one of three command words, whereupon an amount of fresh water or salt water (your choice) pours out of the flask. The water stops pouring out at the start of your next turn. Choose from the following options:" + "\n \u2022 " + "'Stream' produces 1 gallon of water." + "\n \u2022 " + "'Fountain' produces 5 gallons of water." + "\n \u2022 " + "'Geyser' produces 30 gallons of water that gushes forth in a geyser 30 feet long and 1 foot wide. As a bonus action while holding the decanter, you can aim the geyser at a creature you can see within 30 feet of you. The target must succeed on a DC 13 Strength saving throw or take 1d4 bludgeoning damage and fall prone. Instead of a creature, you can target an object that isn't being worn or carried and that weighs no more than 200 pounds. The object is either knocked over or pushed up to 15 feet away from you."
	},
	"driftglobe" : {
		name : "Driftglobe",
		source : ["D", 166],
		description : "When I'm within 60 ft of this small glass sphere, I can speak its command word to make it shine light as the Light or Daylight spell. The daylight effect, once used, can't be used again until the next dawn. Then, as an action, I can speak another command to make it hover 5 ft off the ground. It hovers until grasped from the air. If I move more than 60 ft from the hovering globe, it follows me at a distance of 60 ft, taking the shortest route. If it can't move, it sinks to the ground and becomes inactive with shining light.",
		descriptionLong : true,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 1,
		descriptionFull : "This small sphere of thick glass weighs 1 pound. If you are within 60 feet of it, you can speak its command word and cause it to emanate the light or daylight spell. Once used, the daylight effect can't be used again until the next dawn." + "\n   " + "You can speak another command word as an action to make the illuminated globe rise into the air and float no more than 5 feet off the ground. The globe hovers in this way until you or another creature grasps it. If you move more than 60 feet from the hovering globe, it follows you until it is within 60 feet of you. It takes the shortest route to do so. If prevented from moving, the globe sinks gently to the ground and becomes inactive, and its light winks out."
	},
	"eyes of minute seeing" : {
		name : "Eyes of Minute Seeing",
		source : ["D", 168],
		description : "These crystal lenses fit over the eyes. While wearing them, I can see much better than normal out to a range of 1 ft. I have advantage on Int (Investigation) checks that rely on sight while searching an area or studying an object within that range.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "These crystal lenses fit over the eyes. While wearing them, you can see much better than normal out to a range of 1 foot. You have advantage on Intelligence (Investigation) checks that rely on sight while searching an area or studying an object within that range."
	},
	"eyes of the eagle" : {
		name : "Eyes of the Eagle",
		source : ["D", 168],
		description : "These crystal lenses fit over the eyes. While wearing them, I have advantage on Wisdom (Perception) checks that rely on sight. In conditions of clear visibility, I can make out details of even extremely distant creatures and objects as small as 2 feet across.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		weight : 0,
		descriptionFull : "These crystal lenses fit over the eyes. While wearing them, you have advantage on Wisdom (Perception) checks that rely on sight. In conditions of clear visibility, you can make out details of even extremely distant creatures and objects as small as 2 feet across."
	},
	"folding boat" : {
		name : "Folding Boat",
		source : ["D", 170],
		description : "A wooden box of 12 by 6 by 6 inches, that can be opened to put items in. As an action, I can speak one of the three command words. One causes it to unfold into a boat 10 ft by 4 ft by 2 ft deep, with oars, an anchor, a mast, and a lateen sail, and can hold four Medium creatures. Two causes it to unfold into a ship 24 ft by 8 ft by 6 ft deep, with a deck, rowing seats, five sets of oars, a steering oar, an anchor, a deck cabin, and a mast with a square sail and can hold fifteen Medium creatures comfortably. Three causes it to fold up.",
		descriptionLong : true,
		category : "wondrous item",
		rarity : "rare",
		attunement : false,
		weight : 4,
		descriptionFull : "This object appears as a wooden box that measures 12 inches long, 6 inches wide, and 6 inches deep. It weighs 4 pounds and floats. It can be opened to store items inside. This item also has three command words, each requiring you to use an action to speak it." + "\n   " + "One command word causes the box to unfold into a boat 10 feet long, 4 feet wide, and 2 feet deep. The boat has one pair of oars, an anchor, a mast, and a lateen sail. The boat can hold up to four Medium creatures comfortably." + "\n   " + "The second command word causes the box to unfold into a ship 24 feet long, 8 feet wide, and 6 feet deep. The ship has a deck, rowing seats, five sets of oars, a steering oar, an anchor, a deck cabin, and a mast with a square sail. The ship can hold fifteen Medium creatures comfortably." + "\n   " + "When the box becomes a vessel, its weight becomes that of a normal vessel its size, and anything that was stored in the box remains in the boat." + "\n   " + "The third command word causes the folding boat to fold back into a box, provided that no creatures are aboard. Any objects in the vessel that can't fit inside the box remain outside the box as it folds. Any objects in the vessel that can fit inside the box do so."
	},
	"gem of brightness" : {
		name : "Gem of Brightness",
		source : ["D", 171],
		description : "This prism has 50 charges. I can speak one of 3 command words as an action. 1) uses no charges to shed bright light in 30-ft radius and dim light for an extra 30 ft, lasting until I say the word as a bonus action or I use another function. 2) uses 1 charge to fire a beam of light at someone I see within 60 ft, who must make a DC 15 Con save or be blinded for 1 minute. It gets a save at the end of each of its turns to end the effect. 3) expends 5 charges to flare a 30-ft cone of light with the same effect as the beam to all in the area.",
		descriptionLong : true,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "This prism has 50 charges. While you are holding it, you can use an action to speak one of three command words to cause one of the following effects:" + "\n \u2022 " + "The first command word causes the gem to shed bright light in a 30-foot radius and dim light for an additional 30 feet. This effect doesn't expend a charge. It lasts until you use a bonus action to repeat the command word or until you use another function of the gem." + "\n \u2022 " + "The second command word expends 1 charge and causes the gem to fire a brilliant beam of light at one creature you can see within 60 feet of you. The creature must succeed on a DC 15 Constitution saving throw or become blinded for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success." + "\n \u2022 " + "The third command word expends 5 charges and causes the gem to flare with blinding light in a 30-foot cone originating from it. Each creature in the cone must make a saving throw as if struck by the beam created with the second command word." + "\n   " + "When all of the gem's charges are expended, the gem becomes a nonmagical jewel worth 50 gp."
	},
	"gloves of missile snaring" : {
		name : "Gloves of Missile Snaring",
		source : ["D", 172],
		description : "When a ranged weapon attack hits me and I have a hand free, I can use my reaction to reduce the damage of that attack by 1d10 + my Dex mod. If I reduce the damage to 0, I can catch the missile if it is small enough for me to hold in that hand.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		weight : 0,
		descriptionFull : "These gloves seem to almost meld into your hands when you don them. When a ranged weapon attack hits you while you're wearing them, you can use your reaction to reduce the damage by 1d10 + your Dexterity modifier, provided that you have a free hand. If you reduce the damage to 0, you can catch the missile if it is small enough for you to hold in that hand."
	},
	"gloves of swimming and climbing" : {
		name : "Gloves of Swimming and Climbing",
		source : ["D", 172],
		description : "While wearing these gloves, climbing and swimming don't cost me extra movement, and I gain a +5 bonus to Strength (Athletics) checks made to climb or swim.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		weight : 0,
		descriptionFull : "While wearing these gloves, climbing and swimming don't cost you extra movement, and you gain a +5 bonus to Strength (Athletics) checks made to climb or swim."
	},
	"goggles of night" : {
		name : "Goggles of Night",
		source : ["D", 172],
		description : "While wearing these dark lenses, I have darkvision out to a range of 60 feet. If I already have darkvision, wearing the goggles increases its range by 60 feet.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "While wearing these dark lenses, you have darkvision out to a range of 60 feet. If you already have darkvision, wearing the goggles increases its range by 60 feet."
	},
	"hat of disguise" : {
		name : "Hat of Disguise",
		source : ["D", 173],
		description : "While wearing this hat, I can use an action to cast the disguise self spell from it at will. The spell ends if the hat is removed.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		weight : 0,
		descriptionFull : "While wearing this hat, you can use an action to cast the disguise self spell from it at will. The spell ends if the hat is removed."
	},
	"helm of comprehending languages" : {
		name : "Helm of Comprehending Languages",
		source : ["D", 173],
		description : "While wearing this helm, I can use an action to cast the comprehend languages spell from it at will.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 3,
		descriptionFull : "While wearing this helm, you can use an action to cast the comprehend languages spell from it at will."
	},
	"heward’s handy haversack" : {
		name : "Heward’S Handy Haversack",
		source : ["D", 174],
		description : "The backpack weighs 5 lb, but has two side pouches that hold up to 20 lb (2 cu ft), while it's central pouch holds up to 80 lb (8 cu ft). Retrieving an item from it requires an action. If the bag is overloaded, pierced, or torn, it is destroyed, as is its content.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "rare",
		attunement : false,
		weight : 5,
		descriptionFull : "This backpack has a central pouch and two side pouches, each of which is an extradimensional space. Each side pouch can hold up to 20 pounds of material, not exceeding a volume of 2 cubic feet. The large central pouch can hold up to 8 cubic feet or 80 pounds of material. The backpack always weighs 5 pounds, regardless of its contents." + "\n   " + "Placing an object in the haversack follows the normal rules for interacting with objects. Retrieving an item from the haversack requires you to use an action. When you reach into the haversack for a specific item, the item is always magically on top." + "\n   " + "The haversack has a few limitations. If it is overloaded, or if a sharp object pierces it or tears it, the haversack ruptures and is destroyed. If the haversack is destroyed, its contents are lost forever, although an artifact always turns up again somewhere. If the haversack is turned inside out, its contents spill forth, unharmed, and the haversack must be put right before it can be used again. If a breathing creature is placed within the haversack, the creature can survive for up to 10 minutes, after which time it begins to suffocate." + "\n   " + "Placing the haversack inside an extradimensional space created by a bag of holding, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it and deposited in a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened."
	},
	"lantern of revealing" : {
		name : "Lantern of Revealing",
		source : ["D", 179],
		description : "This lantern burns for 6 hours on 1 pint of oil. It shines bright light in a 30-ft radius and dim light for an extra 30 ft. Invisible objects and creatures are visible in the bright light. As an action, I can lower the hood, making it only dim light in a 5-ft radius.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 2,
		descriptionFull : "While lit, this hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet. Invisible creatures and objects are visible as long as they are in the lantern's bright light. You can use an action to lower the hood, reducing the light to dim light in a 5-foot radius."
	},
	"ring of jumping" : {
		name : "Ring of Jumping",
		source : ["D", 191],
		description : "While wearing this ring, I can cast the jump spell from it as a bonus action at will, but can target only myself when I do so.",
		descriptionLong : false,
		category : "ring",
		rarity : "uncommon",
		attunement : true,
		weight : 0,
		descriptionFull : "While wearing this ring, you can cast the jump spell from it as a bonus action at will, but can target only yourself when you do so."
	},
	"ring of mind shielding" : {
		name : "Ring of Mind Shielding",
		source : ["D", 191],
		description : "With this ring, I'm immune to magic that allows others to read my thoughts, determine whether I'm lying, know my alignment, or know my creature type. Telepathic communication with me only works if I allow it. As an action, I can make the ring invisible.",
		descriptionLong : false,
		category : "ring",
		rarity : "uncommon",
		attunement : true,
		weight : 0,
		descriptionFull : "While wearing this ring, you are immune to magic that allows other creatures to read your thoughts, determine whether you are lying, know your alignment, or know your creature type. Creatures can telepathically communicate with you only if you allow it." + "\n   " + "You can use an action to cause the ring to become invisible until you use another action to make it visible, until you remove the ring, or until you die." + "\n   " + "If you die while wearing the ring, your soul enters it, unless it already houses a soul. You can remain in the ring or depart for the afterlife. As long as your soul is in the ring, you can telepathically communicate with any creature wearing it. A wearer can't prevent this telepathic communication."
	},
	"ring of swimming" : {
		name : "Ring of Swimming",
		source : ["D", 193],
		description : "I have a swimming speed of 40 feet while wearing this ring.",
		descriptionLong : false,
		category : "ring",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "You have a swimming speed of 40 feet while wearing this ring."
	},
	"robe of useful items" : {
		name : "Robe of Useful Items",
		source : ["D", 195],
		description : "This robe has cloth patches of various shapes and colors covering it. While wearing the robe, I can use an action to detach one of the patches, causing it to become the object or creature it represents. The robe has two of each of the following patches: Dagger, Bullseye lantern (filled and lit), Steel mirror, 10-ft pole, Hempen rope (50 ft, coiled), and Sack. In addition, the robe has 4d4 other patches. The DM chooses the patches or determines them randomly. Once the last patch is removed, the robe becomes an ordinary garment.",
		descriptionLong : true,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 1,
		descriptionFull : "This robe has cloth patches of various shapes and colors covering it. While wearing the robe, you can use an action to detach one of the patches, causing it to become the object or creature it represents. Once the last patch is removed, the robe becomes an ordinary garment." + "\n\n" + "The robe has two of each of the following patches:" + "\n \u2022 " + "Dagger" + "\n \u2022 " + "Bullseye lantern (filled and lit)" + "\n \u2022 " + "Steel mirror" + "\n \u2022 " + "10-foot pole" + "\n \u2022 " + "Hempen rope (50 feet, coiled)" + "\n \u2022 " + "Sack" + "\n\nIn addition, the robe has 4d4 other patches. The GM chooses the patches or determines them randomly.\n\n" + toUni("d100") + "\t" + toUni("Effect") + "\n" + toUni("01-08") + "\tBag of 100 gp\n" + toUni("09-15") + "\tSilver coffer (1 foot long, 6 inches wide and deep) worth 500 gp\n" + toUni("16-22") + "\tIron door (up to 10 feet wide and 10 feet high, barred on one side of your choice), which you can place in an opening you can reach; it conforms to fit the opening, attaching and hinging itself\n" + toUni("23-30") + "\t10 gems worth 100 gp each\n" + toUni("31-44") + "\tWooden ladder (24 feet long)\n" + toUni("45-51") + "\tA riding horse with saddle bags\n" + toUni("52-59") + "\tPit (a cube 10 feet on a side), which you can place on the ground within 10 feet of you\n" + toUni("60-68") + "\t4 potions of healing\n" + toUni("69-75") + "\tRowboat (12 feet long)\n" + toUni("76-83") + "\tSpell scroll containing one spell of 1st to 3rd level\n" + toUni("84-90") + "\t2 mastiffs\n" + toUni("91-96") + "\tWindow (2 feet by 4 feet, up to 2 feet deep), which you can place on a vertical surface you can reach\n" + toUni("97-00") + "\tPortable ram"
	},
	"rope of climbing" : {
		name : "Rope of Climbing",
		source : ["D", 197],
		description : "This 60-ft length of silk rope can hold up to 3,000 pounds. As an action while holding one end of the rope, I can speak the command word to animate it. Then, as a bonus action, I can command the other end to move to a chosen destination, at 10 ft on my turn. I can also tell it to stop moving, to fasten itself securely, to unfasten itself, to knot or unknot itself, or to coil itself for carrying. While knotted, the rope shortens to 50 ft and grants advantage to climb it. The rope has AC 20 and 20 HP, regaining 1 HP per 5 minutes.",
		descriptionLong : true,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 3,
		descriptionFull : "This 60-foot length of silk rope weighs 3 pounds and can hold up to 3,000 pounds. If you hold one end of the rope and use an action to speak the command word, the rope animates. As a bonus action, you can command the other end to move toward a destination you choose. That end moves 10 feet on your turn when you first command it and 10 feet on each of your turns until reaching its destination, up to its maximum length away, or until you tell it to stop. You can also tell the rope to fasten itself securely to an object or to unfasten itself, to knot or unknot itself, or to coil itself for carrying." + "\n   " + "If you tell the rope to knot, large knots appear at 1-foot intervals along the rope. While knotted, the rope shortens to a 50-foot length and grants advantage on checks made to climb it." + "\n   " + "The rope has AC 20 and 20 hit points. It regains 1 hit point every 5 minutes as long as it has at least 1 hit point. If the rope drops to 0 hit points, it is destroyed."
	},
	"sending stones" : {
		name : "Sending Stones",
		source : ["D", 199],
		description : "While I touch one of the pair of stones, I can use an action to cast the sending spell, targeting the bearer of the other stone. If no creature has the other stone, the spell won’t cast. Once it is cast, neither stone can be used again until the next dawn.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "Sending stones come in pairs, with each smooth stone carved to match the other so the pairing is easily recognized. While you touch one stone, you can use an action to cast the sending spell from it. The target is the bearer of the other stone. If no creature bears the other stone, you know that fact as soon as you use the stone and don’t cast the spell." + "\n   " + "Once sending is cast through the stones, they can’t be used again until the next dawn. If one of the stones in a pair is destroyed, the other one becomes nonmagical."
	},
	"slippers of spider climbing" : {
		name : "Slippers of Spider Climbing",
		source : ["D", 200],
		description : "With these light shoes, I can move up, down, and across vertical surfaces and upside down along ceilings, while leaving my hands free. I have a climbing speed equal to my walking speed. The slippers don't work on a slippery surface (e.g. oily or icy).",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		weight : 0.5,
		descriptionFull : "While you wear these light shoes, you can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free. You have a climbing speed equal to your walking speed. However, the slippers don't allow you to move this way on a slippery surface, such as one covered by ice or oil."
	},
	"wand of magic detection" : {
		name : "Wand of Magic Detection",
		source : ["D", 211],
		description : "This wand has 3 charges. While holding it, I can expend 1 charge as an action to cast the detect magic spell from it. The wand regains 1d3 expended charges daily at dawn.",
		descriptionLong : false,
		category : "wand",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "This wand has 3 charges. While holding it, you can expend 1 charge as an action to cast the detect magic spell from it. The wand regains 1d3 expended charges daily at dawn."
	},
	"wand of secrets" : {
		name : "Wand of Secrets",
		source : ["D", 211],
		description : "The wand has 3 charges. While holding it, I can use an action to expend 1 of its charges, and if a secret door or trap is within 30 feet of me, the wand pulses and points at the one nearest to me. The wand regains 1d3 expended charges daily at dawn.",
		descriptionLong : false,
		category : "wand",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "The wand has 3 charges. While holding it, you can use an action to expend 1 of its charges, and if a secret door or trap is within 30 feet of you, the wand pulses and points at the one nearest to you. The wand regains 1d3 expended charges daily at dawn."
	},
	"wings of flying" : {
		name : "Wings of Flying",
		source : ["D", 214],
		description : "With this cloak, I can speak its command word as an action, turning it into a pair of bat or bird wings on my back for 1 hour or until I repeat the command word as an action. This gives me a flying speed of 60 ft. Once used, it takes 1d12 hours to recharge.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "rare",
		attunement : true,
		weight : 2,
		descriptionFull : "While wearing this cloak, you can use an action to speak its command word. This turns the cloak into a pair of bat wings or bird wings on your back for 1 hour or until you repeat the command word as an action. The wings give you a flying speed of 60 feet. When they disappear, you can't use them again for 1d12 hours."
	}
};