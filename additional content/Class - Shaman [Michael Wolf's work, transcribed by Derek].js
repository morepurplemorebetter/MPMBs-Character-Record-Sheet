/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds the class called "Shaman" and one of its subclasses, called "Speaker of Stone"
				This is taken from the DMs Guild website (http://www.dmsguild.com/product/170851/) v1.5.1
				This content is made by Michael Wolf
				This code doesn't cover all of the content, and it would be helpful if anybody would expand upon it
	Code by:	Derek (with amendments by MorePurpleMoreBetter)
	Date:		2016-11-07 (sheet v12.5)
	
	Please support the creator of this content (Michael Wolf) and download his material from the DMs Guild website: http://www.dmsguild.com/browse.php?x=0&y=0&author=Michael%20Wolf
*/

/*
	Code version:	0.9
	
	Completed:
		- Core class
		- 4 Invocations
		- Subclasses:
			- Speaker of Stone
		- Spirit Weapon
		
	Incomplete:
		- Subclasses:
			- Speaker of Ancestors
			- Speaker of Dreams
			- Speaker of Fire
			- Speaker of Water
			- Speaker of Wind
		- Invocations
*/

//first make the sheet know which spells are shaman spells
var shamanSpells = [
	//level 0 (cantrips)
	"create bonfire", "druidcraft", "guidance", "mending", "message", "resistance", "vicious mockery",

	//level 1
	"absorb elements", "beast bond", "charm person", "command", "cure wounds", "detect poison and disease", "dissonant whispers", "entangle", "faerie fire", "fog cloud", "heroism", "hex", "protection from evil and good",
	
	//level 2
	"aid", "barkskin", "darkness", "enhance ability", "hold person", "misty step", "moonbeam", "pass without trace", "protection from poison", "spider climb", "spike growth",

	//level 3
	"clairvoyance", "daylight", "dispel magic", "elemental weapon", "gaseous form", "magic circle", "plant growth", "protection from energy", "remove curse", "spirit guardians",

	//level 4
	"dominate beast", "elemental bane", "fire shield", "hallucinatory terrain", "stoneskin",

	//level 5
	"hold monster", "scrying", "telekinesis", "tree stride",

	//level 6
	"bones of the earth", "chain lightning", "find the path", "heroes' feast", "mass suggestion", "move earth", "sunbeam", "transport via plants", "true seeing", "wall of ice", "wind walk",

	//level 7
	"etherealness", "mirage arcane", "plane shift", "regenerate", "reverse gravity", "whirlwind",

	//level 8
	"animal shapes", "antipathy/sympathy", "control weather", "earthquake",

	//level 9
	"astral projection", "foresight", "shapechange", "true resurrection"	
];

//amend the SpellsList entries
for (var i = 0; i < shamanSpells.length; i++) {
	if (SpellsList[shamanSpells[i]]) SpellsList[shamanSpells[i]].classes.push("shaman");
}

//remove "shaman" from the druid regular expression
ClassList["druid"].regExpSearch = /druid/i;
ClassSubList["circle of the moon"].regExpSearch = /^(?=.*druid)((?=.*\bmoon\b)|((?=.*\bmany\b)(?=.*\bforms?\b))).*$/i;
ClassSubList["circle of the land"].regExpSearch = /^(?=.*druid)(?=.*\b(land|arctic|coast|deserts?|forests?|grasslands?|savannah|steppes?|mountains?|swamps?|underdark)\b).*$/i;

//now make the shaman class
ClassList["shaman"] = {
	regExpSearch : /shaman/i,
	name : "Shaman",
	source : ["MW:SC", 2],
	primaryAbility : "\n \u2022 Shaman: Charisma;",
	abilitySave : 5,
	prereqs : "\n \u2022 Shaman: Charisma 13;",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 8,
	saves : ["Wis", "Cha"],
	skills : ["\n\n" + toUni("Shaman") + ": Choose two from Animal Handling, Arcana, Insight, Medicine, Nature, Perception, Persuasion, Religion, and Survival."],
	tools : ["Herbalism kit"],	
	armor : [
		[true, false, false, true],
		[true, false, false, true]
	],
	weapons : [
		[false, false, ["club", "dagger", "javelin", "mace", "quarterstaff", "scimitar",
"sickle", "sling", "spear"]],
	],
	equipment : "Shaman starting equipment:\n \u2022 A wooden shield -or- any simple weapon;\n \u2022 A scimitar -or- any simple melee weapon;\n \u2022 Leather armor, an explorer's pack and shamanic focus",
	subclasses : ["Shamanic Calling", ["speaker of stone"]],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : 1,
	spellcastingKnown : {
		cantrips : [1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		spells : "list",
		prepared : true,
	},
	spellcastingList : {
		// 0 - 5th level spells from Shaman spell list.
		class : "shaman",
		level : [0, 5]
	},
	features : {
 		"spirit magic" : {
			name : "Spirit Magic",
			source : ["MW:SC", 4],
			minlevel : 1,
			description : "\n   " + "I can cast shaman cantrips/spells that I know, using Charisma as my spellcasting ability" + "\n   " + "I can use an shamanic focus as a spellcasting focus" + "\n   " + "It costs 1 spirit point per spell level; I regain these on a short rest",
			usages : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
			recovery : "short rest",
			additional : "Spirit points"
		},
		"subclassfeature1" : {
			name : "Shamanic Calling",
			source : ["MW:SC", 4],
			minlevel : 1,
			description : "\n   " + "Choose the spirit that has called me and put it in the \"Class\" field",
		},
		"shamanic invocations" : {
			name : "Shamanic Invocations",
			source : ["MW:SC", 4],
			minlevel : 2,
			description : "\n   " + "Use the \"Choose Features\" button above to add Shamanic Invocations to the third page",
			additional : ["", "1 invocations known", "1 invocations known", "1 invocations known", "2 invocations known", "2 invocations known", "3 invocations known", "3 invocations known", "4 invocations known", "4 invocations known", "4 invocations known", "5 invocations known", "5 invocations known", "5 invocations known", "6 invocations known", "6 invocations known", "6 invocations known", "7 invocations known", "7 invocations known", "7 invocations known"],
			extraname : "Shamanic Invocation",
			extrachoices : ["Unrestrained Savagery", "Stand Firm", "Battle Frenzy", "Elemental Empowerment", "Twilight Shepherd"],
			"unrestrained savagery" : {
				name : "Unrestrained Savagery",
				description : "\n   " + "I can attack twice when taking the attack action",
				source : ["MW:SC", 15],
			},
			"stand firm" : {
				name : "Stand Firm",
				description : "\n   " + "My AC is 13 + Constitution modifier + shield",
				source : ["MW:SC", 15],
			},
			"battle frenzy" : {
				name : "Battle Frenzy",
				description : "\n   " + "I can make one attack as a bonus action when taking the attack action",
				source : ["MW:SC", 13],
				action : ["bonus action", " (with Attack action)"]
			},
			"elemental empowerment" : {
				name : "Elemental Empowerment",
				description : "\n   " + "I can cast elemental weapon as a bonus action and spend 1 spirit point to hold concentration",
				source : ["MW:SC", 13],
				action : ["bonus action", ""]
			},
			"twilight shepherd" : {
				name : "Twilight Shepherd",
				description : "\n   " + "I can cast reincarnate using spirit points",
				source : ["MW:SC", 15],
				usages : 1,
				recovery : "long rest",
				action : ["action", ""]
			},
		},
		"spiritual gift" : {
			name : "Spiritual Gift",
			source : ["MW:SC", 4],
			minlevel : 3,
			description : "\n   " + "Choose a Spiritual Gift using the \"Choose Feature\" button above",
			choices : ["Gift of Savagery", "Gift of Sight"],
			"gift of savagery" : {
				name : "Gift of Savagery",
				source : ["MW:SC", 4],
				description : "\n   " + "As an action, I create a melee spirit weapon in an empty hand, which counts magical" + "\n   " + "I can choose the type of melee weapon every time I create it, and it does 1d8 damage" + "\n   " + "The weapon disappears if it is more than 5 ft away from me for 1 minute" + "\n   " + "I can transform a magic weapon into my spiritual weapon in an hour-long ritual" + "\n   " + "I can use an action to re-summon it in any form and can dismiss it as a free action",
				action : ["action", ""],
				eval : "AddWeapon(\"Spirit Weapon\");",
				removeeval : "RemoveWeapon(\"Spirit Weapon\");",
			},
			"gift of sight" : {
				name : "Gift of Sight",
				source : ["MW:SC", 5],
				description : "\n   " + "When I finish a long rest, I roll two d20s and record the numbers rolled" + "\n   " + "I can use either number to replace one attack roll, saving throw, or ability check" + "\n   " + "This roll could be made by me or a creature that I can see",
			},
		},
		"hidden lore" : {
			name : "Hidden Lore",
			source : ["MW:SC", 5],
			minlevel : 11,
			description : "\n   " + "I can choose one spell from the shaman spell list of each level mentioned above" + "\n   " + "I can cast these spells each once per long rest without needing to use a spell slot",
			additional : ["", "", "", "", "", "", "", "", "", "", "6th level", "6th level", "6th and 7th level", "6th and 7th level", "6th, 7th, and 8th level", "6th, 7th, and 8th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level"],
			spellcastingBonus : {
				name : "Hidden Lore (6)",
				class : "shaman",
				level : [6, 6],
				oncelr : true,
			},
			changeeval : "if (classes.known.shaman.level < 13) {delete CurrentSpells.shaman.bonus[\"hidden lore (7)\"]} else {if (!CurrentSpells.shaman.bonus[\"hidden lore (7)\"]) {CurrentSpells.shaman.bonus[\"hidden lore (7)\"] = {name : \"Hidden Lore (7)\", class : \"shaman\", level : [7, 7], oncelr : true}}}; if (classes.known.shaman.level < 15) {delete CurrentSpells.shaman.bonus[\"hidden lore (8)\"]} else {if (!CurrentSpells.shaman.bonus[\"hidden lore (8)\"]) {CurrentSpells.shaman.bonus[\"hidden lore (8)\"] = {name : \"Hidden Lore (8)\", class : \"shaman\", level : [8, 8], oncelr : true}}}; if (classes.known.shaman.level < 17) {delete CurrentSpells.shaman.bonus[\"hidden lore (9)\"]} else {if (!CurrentSpells.shaman.bonus[\"hidden lore (9)\"]) {CurrentSpells.shaman.bonus[\"hidden lore (9)\"] = {name : \"Hidden Lore (9)\", class : \"shaman\", level : [9, 9], oncelr : true}}}",
		},
		"timeless body" : {
			name : "Timeless Body",
			source : ["MW:SC", 5],
			minlevel : 18,
			description : "\n   " + "I age more slowly, only 1 year for every 10 years that pass",
		},
		"spiritual master" : {
			name : "Spiritual Master",
			source : ["MW:SC", 5],
			minlevel : 20,
			description : "\n   " + "For 1 minute, I can cast all spells from my shaman spell list as if they were prepared",
			recovery : "long rest",
			usages : 1,
		}
	}
}

//create the Speaker of Stone subclass
ClassSubList["speaker of stone"] = {
	regExpSearch : /^(?=.*speaker)(?=.*stone).*$/i, 
	subname : "Speaker of Stone",
	source : ["MW:SC", 9],
	spellcastingExtra : ["earth tremor", "sanctuary", "earthbind", "lesser restoration", "erupting earth", "meld into stone", "grasping vine", "stone shape", "greater restoration", "transmute rock"],
    features : {
        "subclassfeature1" : {
            name : "Blessings of Stone",
            source : ["MW:SC", 9],
            minlevel : 1,
			skills : ["Athletics"],
			skillstxt : "\n\n" + toUni("Blessings of Stone (Speaker of Stone 1)") + ": Athletics.",
            description : "\n   " + "I gain the Magic Stone, Mold Earth, and Thorn Whip cantrips" + "\n   " + "I learn the Terran dialect of the Primordial language and become proficient in Athletics",
            eval : "AddLanguage(\"Terran\", \"dialect of the Primordial language\");",
            removeeval : "RemoveLanguage(\"Terran\", \"dialect of the Primordial language\");",
			spellcastingBonus : [{
				name : "Blessings of Stone (Magic Stone)",
				spells : ["magic stone"],
				selection : ["magic stone"],
			}, {
				name : "Blessings of Stone (Mold Earth)",
				spells : ["mold earth"],
				selection : ["mold earth"],
			}, {
				name : "Blessings of Stone (Thorn Whip)",
				spells : ["thorn whip"],
				selection : ["thorn whip"],
			}],
        },
        "subclassfeature1.1" : {
            name : "Stoneshaman",
            source : ["MW:SC", 10],
            minlevel : 1,
            description : "\n   " + "As an action, I can talk to stone spirits" + "\n   " + "I can ask up to three questions before the effect ends" + "\n   " + "Stone spirits have tremor sense up to 100 feet",
        },
        "subclassfeature6" : {
            name : "Unyielding Stone",
            source : ["MW:SC", 10],
            minlevel : 6,
            description : "\n   " + "As a reaction when hit by a seen attacker, I can turn to stone to nullify the damage",
			recovery : "short rest",
			usages : 1,
            action : ["reaction", ""]
        },
		"subclassfeature10" : {
            name : "Roots of the Mountain",
            source : ["MW:SC", 10],
            minlevel : 10,
			description : "\n   " + "I have resistance to bludgeoning damage" + "\n   " + "Advantage on Str and Dex saves made against effects that would knock me prone",
			eval : "AddResistance(\"Bludgeoning\", \"Mountain Roots\");",
			removeeval : "RemoveResistance(\"Bludgeoning\", \"Mountain Roots\");",			
			save : "Adv. on Str and Dex saves vs. effects that make me prone",
        },
        "subclassfeature14" : {
			name : "Preserve in Stone",
			source : ["MW:SC", 10],
			minlevel : 14,
			description : "\n   " + "Spend 10 minutes to cast the pretrify condition onto a creature",
			action : ["action", ""]
        }
    }
};

//create the Spirit Weapon attack option
WeaponsList["spirit weapon"] = {
    regExpSearch : /^spirit(?=.*weapon).*$/i,
    name : "Spirit Weapon",
    ability : 1,
    type : "Natural",
    damage : [1, 8, "slashing"],
    range : "Melee, 5 ft",
    description : "A ghostly melee weapon of a type of my choice, which determines the damage type",
    abilitytodamage : true,
    monkweapon : false,
};

SourceList["MW:SC"] = {
	name : "Michael Wolf: Shaman Class",
	abbreviation : "MW:SC",
	group : "Dungeon Masters Guild",
	url : "http://www.dmsguild.com/product/170851/"
};