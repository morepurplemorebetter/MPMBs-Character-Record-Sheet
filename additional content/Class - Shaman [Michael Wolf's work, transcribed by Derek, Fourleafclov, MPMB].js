/*  -WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*  -INFORMATION-
	Subject:    Class
	Effect:     This script adds the class called "Shaman" and its 6 subclasses "Speaker of Ancestors", "Speaker of Dreams", "Speaker of Fire", "Speaker of Stone", "Speaker of Water", and "Speaker of Wind"
				This is taken from the DMs Guild website (http://www.dmsguild.com/product/170851/) v1.5.4
				This content is made by Michael Wolf
	Original:   Derek (with amendments by MorePurpleMoreBetter)
	Completed:  /u/Fourleafclov (with amendments by MorePurpleMoreBetter)
	Date:       2017-04-05 (sheet v12.94)

	Code Version:   1.0 (previous version 0.9 from 2016-11-07)

	Please support the creator of this content (Michael Wolf) and download his material from the DMs Guild website: http://www.dmsguild.com/browse.php?x=0&y=0&author=Michael%20Wolf
*/

//first make the sheet know which spells are shaman spells
[//level 0 (cantrips)
	"create bonfire", "druidcraft", "guidance", "mending", "message", "resistance", "vicious mockery",

	//level 1
	"absorb elements", "beast bond", "charm person", "command", "cure wounds", "detect poison and disease", "dissonant whispers", "entangle", "faerie fire", "fog cloud", "heroism", "hex", "protection from evil and good",

	//level 2
	"barkskin", "darkness", "enhance ability", "hold person", "misty step", "moonbeam", "pass without trace", "protection from poison", "spider climb", "spike growth", "warding bond",

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
].forEach(function (shamanSpells) {
	if (SpellsList[shamanSpells]) SpellsList[shamanSpells].classes.push("shaman");
});

//now make the shaman class
ClassList["shaman"] = {
	regExpSearch : /shaman/i,
	name : "Shaman",
	source : ["MW:SC", 2],
	primaryAbility : "\n \u2022 Shaman: Charisma;",
	abilitySave : 6,
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
		[false, false, ["club", "dagger", "javelin", "mace", "quarterstaff", "scimitar", "sickle", "sling", "spear"]],
	],
	equipment : "Shaman starting equipment:\n \u2022 A wooden shield -or- any simple weapon;\n \u2022 A scimitar -or- any simple melee weapon;\n \u2022 Leather armor, an explorer's pack and shamanic focus\n\nAlternatively, choose 2d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Shamanic Calling", ["speaker of ancestors", "speaker of dreams", "speaker of flames", "speaker of stones", "speaker of waters", "speaker of winds"]],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : "default0",
	spellcastingKnown : {
		cantrips : [1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		spells : "list",
		prepared : true
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
			description : desc([
				"I can cast prepared shaman cantrips/spells, using Charisma as my spellcasting ability",
				"Casting shaman spells costs 1 spirit point per spell level; I regain these on a short rest",
				"I can use an shamanic focus as a spellcasting focus"
			]),
			usages : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
			recovery : "short rest",
			additional : "Spirit Points"
		},
		"subclassfeature1" : {
			name : "Shamanic Calling",
			source : ["MW:SC", 4],
			minlevel : 1,
			description : "\n   " + "Choose the spirit that has called me and put it in the \"Class\" field"
		},
		"shamanic invocations" : {
			name : "Shamanic Invocations",
			source : ["MW:SC", 4],
			minlevel : 2,
			description : "\n   " + "Use the \"Choose Feature\" button above to add Shamanic Invocations to the third page",
			additional : ["", "1 invocation known", "1 invocation known", "1 invocation known", "2 invocations known", "2 invocations known", "3 invocations known", "3 invocations known", "4 invocations known", "4 invocations known", "4 invocations known", "5 invocations known", "5 invocations known", "5 invocations known", "6 invocations known", "6 invocations known", "6 invocations known", "7 invocations known", "7 invocations known", "7 invocations known"],
			extraname : "Shamanic Invocation",
			extrachoices : ["Ascendant Step (prereq: level 9 shaman)", "Battle Frenzy (prereq: level 12 shaman, Gift of Savagery)", "Call of the Elements (prereq: level 9 shaman, Speaker of Flames/Stones/Waters/Winds)", "Elemental Empowerment (prereq: level 7 shaman, Gift of Savagery)", "Entreat the Spirits (prereq: level 9 shaman)", "Fauna Shaman (prereq: level 5 shaman)", "Force of Will", "Glimpse the Path (prereq: level 5 shaman, Gift of Sight)", "Keeper of Lore", "Mask of Beasts (prereq: level 9 shaman)", "Mask of Many Faces", "Master of Myriad Forms (prereq: level 15 shaman)", "Pierce the Shadows (prereq: Gift of Sight)", "Rally the Ancestors (prereq: level 9 shaman, Speaker of Ancestors)", "Rewrite the Past (prereq: level 12 shaman, Speaker of Dreams)", "Rite of Cleansing", "River's Secrets (prereq: level 5 shaman)", "Savage Magic (prereq: level 5 shaman, Gift of Savagery)", "See the Unwritten (prereq: level 12 shaman, Gift of Sight)", "Seeker of Visions (prereq: level 7 shaman, Gift of Sight)", "Sight Beyond Sight (prereq: level 15 shaman, Gift of Sight)", "Sky Shaping (prereq: level 5 shaman)", "Smoke Teller", "Soul Reading (prereq: level 5 shaman)", "Speaker of All (prereq: level 12 shaman)", "Spirit Sight (prereq: Gift of Sight)", "Spirit Warrior (prereq: Gift of Savagery)", "Stand Firm (prereq: Gift of Savagery)", "Tongue of Beasts", "Tongue of Wild Spaces (prereq: level 5 shaman)", "Twilight Shepherd (prereq: level 9 shaman)", "Unfiltered Perceptions (prereq: level 7 shaman)", "Unrestrained Savagery (prereq: level 5 shaman, Gift of Savagery)", "Voice of the Forgotten (prereq: level 7 shaman)", "Walker of the World (prereq: level 7 shaman)"],
			"ascendant step (prereq: level 9 shaman)" : {
				name : "Ascendant Step",
				description : "\n   " + "I can cast Levitate on myself at will, without spirit points or material components",
				source : ["MW:SC", 13],
				spellcastingBonus : {
					name : "Ascendant Step",
					spells : ["levitate"],
					selection : ["levitate"],
					atwill : true
				},
				prereqeval : "classes.known.shaman.level >= 9"
			},
			"battle frenzy (prereq: level 12 shaman, gift of savagery)" : {
				name : "Battle Frenzy",
				description : "\n   " + "I can make one attack as a bonus action when taking the attack action",
				source : ["MW:SC", 13],
				action : ["bonus action", " (with Attack action)"],
				prereqeval : "classes.known.shaman.level >= 12 && What('Class Features Remember').indexOf('shaman,spiritual gift,gift of savagery') !== -1"
			},
			"call of the elements (prereq: level 9 shaman, speaker of flames/stones/waters/winds)" : {
				name : "Call of the Elements",
				description : "\n   " + "Once per long rest, I can cast Conjure Elemental to conjure my element, no spirit points",
				source : ["MW:SC", 13],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Call of the Elements",
					spells : ["conjure elemental"],
					selection : ["conjure elemental"],
					oncelr : true
				},
				prereqeval : "classes.known.shaman.level >= 9 && (/flames|stones|waters|winds/i).test(classes.known.shaman.subclass)"
			},
			"elemental empowerment (prereq: level 7 shaman, gift of savagery)" : {
				name : "Elemental Empowerment",
				description : "\n   " + "When casting Elemental Weapon on my spirit weapon I can do so as a bonus action" + "\n   " + "I can concentrate on an Elemental Weapon casting until my next short or long rest" + "\n   " + "I can spend 1 spirit point to avoid breaking my concentration on Elemental Weapon",
				source : ["MW:SC", 13],
				prereqeval : "classes.known.shaman.level >= 9 && What('Class Features Remember').indexOf('shaman,spiritual gift,gift of savagery') !== -1"
			},
			"entreat the spirits (prereq: level 9 shaman)" : {
				name : "Entreat the Spirits",
				description : "\n   " + "I can cast Commune with Nature, but only as a ritual",
				source : ["MW:SC", 13],
				spellcastingBonus : {
					name : "Entreat the Spirits",
					spells : ["commune with nature"],
					selection : ["commune with nature"],
					firstCol : "(R)"
				},
				prereqeval : "classes.known.shaman.level >= 9"
			},
			"fauna shaman (prereq: level 5 shaman)" : {
				name : "Fauna Shaman",
				description : "\n   " + "I can cast Animal Friendship and Beast Sense, but only as rituals",
				source : ["MW:SC", 14],
				spellcastingBonus : {
					name : "Fauna Shaman",
					spells : ["animal friendship", "beast sense"],
					selection : ["animal friendship", "beast sense"],
					firstCol : "(R)",
					times : 2
				},
				prereqeval : "classes.known.shaman.level >= 5"
			},
			"force of will" : {
				name : "Force of Will",
				description : "\n   " + "When dealing damage with a shaman cantrip, I add my Charisma modifier to the damage" + "\n   " + "In addition, I may spend 1 spirit point to add my shaman level to the damage",
				source : ["MW:SC", 14],
				calcChanges : {
					atkCalc : ["if (thisWeapon[4].indexOf('shaman') !== -1 && thisWeapon[3] && SpellsList[thisWeapon[3]].level === 0) { output.extraDmg += What('Cha Mod'); }; ", "My shaman cantrips get my Charima modifier added to their damage. In addition, I may spend 1 spirit point to add my shaman level to the damage whenever I hit with a shaman cantrip."]
				}
			},
			"glimpse the path (prereq: level 5 shaman, gift of sight)" : {
				name : "Glimpse the Path",
				description : "\n   " + "I can cast Augury, but only as a ritual",
				source : ["MW:SC", 14],
				spellcastingBonus : {
					name : "Glimpse the Path",
					spells : ["augury"],
					selection : ["augury"],
					firstCol : "(R)"
				},
				prereqeval : "classes.known.shaman.level >= 5 && What('Class Features Remember').indexOf('shaman,spiritual gift,gift of sight') !== -1"
			},
			"keeper of lore" : {
				name : "Keeper of Lore",
				description : "\n   " + "I can read all writing",
				source : ["MW:SC", 14]
			},
			"mask of beasts (prereq: level 9 shaman)" : {
				name : "Mask of Beasts",
				description : "\n   " + "Once per long rest, I can cast Polymorph on myself, without expending spirit points",
				source : ["MW:SC", 14],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Mask of Beasts",
					spells : ["polymorph"],
					selection : ["polymorph"],
					oncelr : true
				},
				prereqeval : "classes.known.shaman.level >= 9"
			},
			"mask of many faces" : {
				name : "Mask of Many Faces",
				description : "\n   " + "I can cast Disguise Self at will, without expending spirit points",
				source : ["MW:SC", 14],
				spellcastingBonus : {
					name : "Mask of Many Faces",
					spells : ["disguise self"],
					selection : ["disguise self"],
					atwill : true
				}
			},
			"master of myriad forms (prereq: level 15 shaman)" : {
				name : "Master of Myriad Forms",
				description : "\n   " + "I can cast Alter Self at will, without expending spirit points",
				source : ["MW:SC", 14],
				spellcastingBonus : {
					name : "Master of Myriad Forms",
					spells : ["alter self"],
					selection : ["alter self"],
					atwill : true
				},
				prereqeval : "classes.known.shaman.level >= 15"
			},
			"pierce the shadows (prereq: gift of sight)" : {
				name : "Pierce the Shadows",
				description : "\n   " + "I can see in magical and nonmagical darkness out to 120 ft",
				source : ["MW:SC", 14],
				eval : "AddString(\"Vision\", \"Devil's Sight 120 ft\", \"; \");",
				removeeval : "RemoveString(\"Vision\", \"Devil's Sight 120 ft\", \"; \");",
				prereqeval : "What('Class Features Remember').indexOf('shaman,spiritual gift,gift of sight') !== -1"
			},
			"rally the ancestors (prereq: level 9 shaman, speaker of ancestors)" : {
				name : "Rally the Ancestors",
				description : "\n   " + "Once per long rest, I can cast Animate Dead, without expending spirit points",
				source : ["MW:SC", 14],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Rally the Ancestors",
					spells : ["animate dead"],
					selection : ["animate dead"],
					oncelr : true
				},
				prereqeval : "classes.known.shaman.level >= 9 && classes.known.shaman.subclass === 'speaker of ancestors'"
			},
			"rewrite the past (prereq: level 12 shaman, speaker of dreams)" : {
				name : "Rewrite the Past",
				description : "\n   " + "Once per long rest, I can cast modify memory, without expending spirit points",
				source : ["MW:SC", 14],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Rewrite the Past",
					spells : ["modify memory"],
					selection : ["modify memory"],
					oncelr : true
				},
				prereqeval : "classes.known.shaman.level >= 12 && classes.known.shaman.subclass === 'speaker of dreams'"
			},
			"rite of cleansing" : {
				name : "Rite of Cleansing",
				description : "\n   " + "I can cast Purify Food and Water, but only as a ritual",
				source : ["MW:SC", 14],
				spellcastingBonus : {
					name : "Rite of Cleansing",
					spells : ["purify food and water"],
					selection : ["purify food and water"],
					firstCol : "(R)"
				},
			},
			"river's secrets (prereq: level 5 shaman)" : {
				name : "River's Secrets",
				description : "\n   " + "I can cast Water Breathing and Water Walk, but only as rituals",
				source : ["MW:SC", 14],
				spellcastingBonus : {
					name : "River's Secrets",
					spells : ["water breathing", "water walk"],
					selection : ["water breathing", "water walk"],
					firstCol : "(R)",
					times : 2
				},
				prereqeval : "classes.known.shaman.level >= 5"
			},
			"savage magic (prereq: level 5 shaman, gift of savagery)" : {
				name : "Savage Magic",
				description : " [1 spirit point]" + "\n   " + "When making a spell attack as part of a shaman spell, I may use my spirit weapon instead" + "\n   " + "For 1 spirit point, I make a spirit weapon attack that deals damage and the spell's effect",
				source : ["MW:SC", 14],
				prereqeval : "classes.known.shaman.level >= 5 && What('Class Features Remember').indexOf('shaman,spiritual gift,gift of savagery') !== -1"
			},
			"see the unwritten (prereq: level 12 shaman, gift of sight)" : {
				name : "See the Unwritten",
				description : "\n   " + "I roll three d20s for my Gift of Sight, rather than two",
				source : ["MW:SC", 14],
				prereqeval : "classes.known.shaman.level >= 12 && What('Class Features Remember').indexOf('shaman,spiritual gift,gift of sight') !== -1"
			},
			"seeker of visions (prereq: level 7 shaman, gift of sight)" : {
				name : "Seeker of Visions",
				description : "\n   " + "I can cast Divination, but only as a ritual",
				source : ["MW:SC", 14],
				spellcastingBonus : {
					name : "Seeker of Visions",
					spells : ["divination"],
					selection : ["divination"],
					firstCol : "(R)"
				},
				prereqeval : "classes.known.shaman.level >= 7 && What('Class Features Remember').indexOf('shaman,spiritual gift,gift of sight') !== -1"
			},
			"sight beyond sight (prereq: level 15 shaman, gift of sight)" : {
				name : "Sight Beyond Sight",
				description : "\n   " + "I see the true form of any in 30 ft even if shapechanged, illusion or transmutation magic",
				source : ["MW:SC", 14],
				eval : "AddString(\"Vision\", \"Sight Beyond Sight 30 ft\", \"; \");",
				removeeval : "RemoveString(\"Vision\", \"Sight Beyond Sight 30 ft\", \"; \");",
				prereqeval : "classes.known.shaman.level >= 15 && What('Class Features Remember').indexOf('shaman,spiritual gift,gift of sight') !== -1"
			},
			"sky shaping (prereq: level 5 shaman)" : {
				name : "Sky Shaping",
				description : "\n   " + "I can cast Skywrite, but only as a ritual",
				source : ["MW:SC", 14],
				spellcastingBonus : {
					name : "Sky Shaping",
					spells : ["skywrite"],
					selection : ["skywrite"],
					firstCol : "(R)"
				},
				prereqeval : "classes.known.shaman.level >= 5"
			},
			"smoke teller" : {
				name : "Smoke Teller",
				description : "\n   " + "As an action, I can control smoke within 10 ft and form it into an image up to 5-ft cube" + "\n   " + "Each round I concentrate on this, I can use my action to expand or change the image" + "\n   " + "As an action, I expand the image by a 5-ft cube, up to a 20-ft cube" + "\n   " + "As an action, I can change the image, its color, and have it appear to be moving" + "\n   " + "The smoke lightly obscures and dissipates 1 minute after I stop concentrating on it",
				source : ["MW:SC", 14],
				action : ["action", ""]
			},
			"soul reading (prereq: level 5 shaman)" : {
				name : "Soul Reading",
				description : "\n   " + "Once per long rest, I can cast Detect Thoughts, without expending spirit points",
				source : ["MW:SC", 14],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Soul Reading",
					spells : ["detect thoughts"],
					selection : ["detect thoughts"],
					oncelr : true
				},
				prereqeval : "classes.known.shaman.level >= 5"
			},
			"speaker of all (prereq: level 12 shaman)" : {
				name : "Speaker of All",
				description : "\n   " + "I understand all spoken languages and any creature with a language understands me",
				source : ["MW:SC", 14],
				prereqeval : "classes.known.shaman.level >= 12"
			},
			"spirit sight (prereq: gift of sight)" : {
				name : "Spirit Sight",
				description : "\n   " + "I can cast Detect Magic at will, without expending spirit points",
				source : ["MW:SC", 15],
				spellcastingBonus : {
					name : "Spirit Sight",
					spells : ["detect magic"],
					selection : ["detect magic"],
					atwill : true
				},
				prereqeval : "What('Class Features Remember').indexOf('shaman,spiritual gift,gift of sight') !== -1"
			},
			"spirit warrior (prereq: gift of savagery)" : {
				name : "Spirit Warrior",
				description : "\n   " + "After finishing a rest, I can increase my HP and max HP by 1 for every spirit points spend" + "\n   " + "This lasts until I finish another short or long rest",
				additional : levels.map(function (n) {
					return "up to " + (n < 9 ? Math.floor(n / 2) : 5) + " spirit points";
				}),
				source : ["MW:SC", 15],
				prereqeval : "What('Class Features Remember').indexOf('shaman,spiritual gift,gift of savagery') !== -1"
			},
			"stand firm (prereq: gift of savagery)" : {
				name : "Stand Firm",
				description : "\n   " + "While not wearing armor, my AC is 13 + my Constitution modifier + shield",
				source : ["MW:SC", 15],
				prereqeval : "What('Class Features Remember').indexOf('shaman,spiritual gift,gift of savagery') !== -1"
			},
			"tongue of beasts" : {
				name : "Tongue of Beasts",
				description : "\n   " + "I can cast Speak with Animals at will, without expending spirit points",
				source : ["MW:SC", 15],
				spellcastingBonus : {
					name : "Tongue of Beasts",
					spells : ["speak with animals"],
					selection : ["speak with animals"],
					atwill : true
				}
			},
			"tongue of wild spaces (prereq: level 5 shaman)" : {
				name : "Tongue of Wild Spaces",
				description : "\n   " + "I can cast Speak with Plants at will, without expending spirit points",
				source : ["MW:SC", 15],
				spellcastingBonus : {
					name : "Tongue of Wild Spaces",
					spells : ["speak with plants"],
					selection : ["speak with plants"],
					oncelr : true
				},
				prereqeval : "classes.known.shaman.level >= 5"
			},
			"twilight shepherd (prereq: level 9 shaman)" : {
				name : "Twilight Shepherd",
				description : "\n   " + "Once per long rest, I can cast reincarnate, using spirit points",
				source : ["MW:SC", 15],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Twilight Shepherd",
					spells : ["reincarnate"],
					selection : ["reincarnate"],
					oncelr : true
				},
				prereqeval : "classes.known.shaman.level >= 9"
			},
			"unfiltered perceptions (prereq: level 7 shaman)" : {
				name : "Unfiltered Perception",
				description : "\n   " + "I can't be blinded or deafened unless seeing or hearing through another source" + "\n   " + "I can sense the presence, not exact location, of invisible creatures or objects within 10 ft",
				source : ["MW:SC", 15],
				eval : "AddString(\"Vision\", \"Sense Invisible 10 ft\", \"; \");",
				removeeval : "RemoveString(\"Vision\", \"Sense Invisible 10 ft\", \"; \");",
				prereqeval : "classes.known.shaman.level >= 7"
			},
			"unrestrained savagery (prereq: level 5 shaman, gift of savagery)" : {
				name : "Unrestrained Savagery",
				description : "\n   " + "When taking the Attack action, I can attack twice with my spirit weapon",
				source : ["MW:SC", 15],
				prereqeval : "classes.known.shaman.level >= 5 && What('Class Features Remember').indexOf('shaman,spiritual gift,gift of savagery') !== -1"
			},
			"voice of the forgotten (prereq: level 7 shaman)" : {
				name : "Voice of the Forgotten",
				description : "\n   " + "I can cast speak with dead at will, without expending spirit points",
				source : ["MW:SC", 15],
				spellcastingBonus : {
					name : "Voice of the Forgotten",
					spells : ["speak with dead"],
					selection : ["speak with dead"],
					atwill : true
				},
				prereqeval : "classes.known.shaman.level >= 7"
			},
			"walker of the world (prereq: level 7 shaman)" : {
				name : "Walker of the World",
				description : "\n   " + "My movement speed increases by 10 feet while not wearing armor" + "\n   " + "While underground, I always know which way is north and my depth below the surface",
				source : ["MW:SC", 15],
				prereqeval : "classes.known.shaman.level >= 7"
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
				description : desc([
					"As an action, I create a melee spirit weapon in an empty hand, which counts magical",
					"I can choose the type of melee weapon every time I create it, and it does 1d8 damage",
					"The weapon disappears if it is more than 5 ft away from me for 1 minute",
					"I can transform a magic weapon into my spiritual weapon in an hour-long ritual",
					"I can use an action to re-summon it in any form and can dismiss it as a free action"
				]),
				action : ["action", ""],
				eval : "AddWeapon(\"Spirit Weapon\");",
				removeeval : "RemoveWeapon(\"Spirit Weapon\");"
			},
			"gift of sight" : {
				name : "Gift of Sight",
				source : ["MW:SC", 5],
				description : desc([
					"When I finish a long rest, I roll two d20s and record the numbers rolled",
					"I can use either number to replace one attack roll, saving throw, or ability check",
					"This roll could be made by me or a creature that I can see"
				])
			}
		},
		"hidden lore" : {
			name : "Hidden Lore",
			source : ["MW:SC", 5],
			minlevel : 11,
			description : desc([
				"I can choose one spell from the shaman spell list of each level mentioned above",
				"I can cast these spells each once per long rest without needing to use a spell slot"
			]),
			additional : ["", "", "", "", "", "", "", "", "", "", "6th level", "6th level", "6th and 7th level", "6th and 7th level", "6th, 7th, and 8th level", "6th, 7th, and 8th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level"],
			spellcastingBonus : {
				name : "Hidden Lore (6)",
				class : "shaman",
				level : [6, 6],
				oncelr : true
			},
			changeeval : "if (classes.known.shaman.level < 13) {delete CurrentSpells.shaman.bonus[\"hidden lore (7)\"]} else {if (!CurrentSpells.shaman.bonus[\"hidden lore (7)\"]) {CurrentSpells.shaman.bonus[\"hidden lore (7)\"] = {name : \"Hidden Lore (7)\", class : \"shaman\", level : [7, 7], oncelr : true}}}; if (classes.known.shaman.level < 15) {delete CurrentSpells.shaman.bonus[\"hidden lore (8)\"]} else {if (!CurrentSpells.shaman.bonus[\"hidden lore (8)\"]) {CurrentSpells.shaman.bonus[\"hidden lore (8)\"] = {name : \"Hidden Lore (8)\", class : \"shaman\", level : [8, 8], oncelr : true}}}; if (classes.known.shaman.level < 17) {delete CurrentSpells.shaman.bonus[\"hidden lore (9)\"]} else {if (!CurrentSpells.shaman.bonus[\"hidden lore (9)\"]) {CurrentSpells.shaman.bonus[\"hidden lore (9)\"] = {name : \"Hidden Lore (9)\", class : \"shaman\", level : [9, 9], oncelr : true}}}"
		},
		"timeless body" : {
			name : "Timeless Body",
			source : ["MW:SC", 5],
			minlevel : 18,
			description : "\n   " + "I age more slowly, only 1 year for every 10 years that pass"
		},
		"spiritual master" : {
			name : "Spiritual Master",
			source : ["MW:SC", 5],
			minlevel : 20,
			description : "\n   " + "For 1 minute, I can cast all spells from my shaman spell list as if they were prepared",
			recovery : "long rest",
			usages : 1
		}
	}
}

//create the Speaker of Ancestors subclass
ClassSubList["speaker of ancestors"] = {
	regExpSearch : /^(?=.*speaker)(?=.*ancestors).*$/i,
	subname : "Speaker of Ancestors",
	source : ["MW:SC", 6],
	spellcastingExtra : ["inflict wounds", "unseen servant", "blindness/deafness", "gentle repose", "feign death", "revivify", "banishment", "blight", "antilife shell", "legend lore"],
	features : {
		"subclassfeature1" : {
			name : "Blessings of the Ancestors",
			source : ["MW:SC", 6],
			minlevel : 1,
			skills : ["History"],
			skillstxt : "\n\n" + toUni("Blessings of the Ancestors") + ": History.",
			description : desc([
				"I learn the Chill Touch, Spare the Dying, and Thaumaturgy cantrips",
				"I learn one language of my choice from my Ancestors and become proficient in History"
			]),
			eval : "AddLanguage('+1 from Ancestors', 'Shaman (Blessing of the Ancestors)');",
			removeeval : "RemoveLanguage('+1 from Ancestors', 'Shaman (Blessing of the Ancestors)');",
			spellcastingBonus : {
				name : "Blessings of the Ancestors",
				spells : ["chill touch", "spare the dying", "thaumaturgy"],
				selection : ["chill touch", "spare the dying", "thaumaturgy"],
				times : 3
			}
		},
		"subclassfeature1.1" : {
			name : "Channel Divinity",
			source : ["MW:SC", 6],
			minlevel : 1,
			description : "\n   " + "I channel my ancestral spirits to cause effects; the save for this is my shaman spell DC",
			usages : [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
			recovery : "short rest"
		},
		"subclassfeature1.2" : {
			name : "Channel Divinity: Turn Undead",
			source : ["MW:SC", 6],
			minlevel : 1,
			description : desc([
				"As an action, all undead within 30 ft that can see/hear me must make a Wisdom save",
				"If an undead fails this save, it is turned for 1 minute or until it takes any damage",
				"Turned: move away, never within 30 ft of me, no reactions or actions other than Dash",
				"Turned: may Dodge instead of Dash when nowhere to move and unable to escape bonds"
			]),
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Channel Divinity: Control Undead",
			source : ["MW:SC", 6],
			minlevel : 6,
			description : desc([
				"As an action, one undead (CR < shaman level) I can see in 30 ft must make a Wis save",
				"If failed, it must obey my commands for 24 hours or until I use this on another"
			]),
			action : ["action", ""]
		},
		"subclassfeature10" : {
			name : "Death's Comfort",
			source : ["MW:SC", 6],
			minlevel : 10,
			description : desc([
				"I have resistance to necrotic damage",
				"My HP maximum can't be reduced, and I no longer need food or water"
			]),
			eval : "AddResistance('Necrotic', 'Death\\'s Comfort')",
			removeeval : "RemoveResistance('Necrotic');"
		},
		"subclassfeature14" : {
			name : "Deny the Untimely",
			source : ["MW:SC", 7],
			minlevel : 14,
			description : desc([
				"I can escape death if I can name a creature or circumstances that causes it beforehand",
				"When I finish a long rest, I can make this declaration, in a reasonably specific manner",
				"If I die as stated within 24 hours, I get the effects of Resurrection, 1 min after death"
			]),
			recovery : "short rest",
			action : ["action", ""]
		}
	}
}

//create the Speaker of Dreams subclass
ClassSubList["speaker of dreams"] = {
	regExpSearch : /^(?=.*speaker)(?=.*dreams).*$/i,
	subname : "Speaker of Dreams",
	source : ["MW:SC", 7],
	spellcastingExtra : ["silent image", "sleep", "phantasmal force", "suggestion", "major image", "sending", "dimension door", "phantasmal killer", "dream", "seeming"],
	features : {
		"subclassfeature1" : {
			name : "Blessings of Dream",
			source : ["MW:SC", 7],
			minlevel : 1,
			skills : ["Deception", "Performance", "Sleight of Hand", "Stealth"],
			skillstxt : "\n\n" + toUni("Blessings of Dream") + ": Choose one from One of Deception, Performance, Sleight of Hand, or Stealth.",
			description : desc([
				"I learn the Minor Illusion, Prestidigitation, and Touch of Madness cantrips",
				"I become proficient with one skill: Deception, Performance, Sleight of Hand, or Stealth"
			]),
			spellcastingBonus : {
				name : "Blessings of Dream",
				spells : ["minor illusion", "prestidigitation", "touch of madness"],
				selection : ["minor illusion", "prestidigitation", "touch of madness"],
				times : 3
			}
		},
		"subclassfeature1.1" : {
			name : "Dreamreader",
			source : ["MW:SC", 7],
			minlevel : 1,
			description : desc([
				"I can communicate telepathically with any creature I can see within 30 ft",
				"By touching a sleeper's forehead, I can experience, but not interact with, its dream",
				"Dream reading lasts for 1 minute, until my concentration is broken, or it awakens"
			]),
		},
		"subclassfeature6" : {
			name : "Read Thoughts",
			source : ["MW:SC", 8],
			minlevel : 6,
			description : desc([
				"As an action, a creature within 60 ft must make a Wis save or I can read its thoughts",
				"If it succeeds, I can't use this feature on it again until I finish a long rest",
				"If it fails, I can read its surface thoughts for 1 minute, when within 60 ft of me",
				"As an action, I can end this early and have it be subject to a Suggestion spell instead"
			]),
			usages : 1,
			recovery : "short rest",
			action : ["action", ""]
		},
		"subclassfeature10" : {
			name : "Thought Shield",
			source : ["MW:SC", 8],
			minlevel : 10,
			description : desc([
				"My thoughts can not be read by any means unless I allow it",
				"I am immune to being charmed and have resistance to psychic damage",
				"When a creature deals psychic damage to me, that creature takes the same damage"
			]),
			eval : "AddResistance('Psychic', 'Thought Shield')",
			removeeval : "RemoveResistance('Psychic');",
			save : "Immune to Charm Effects",
		},
		"subclassfeature14" : {
			name : "Dreamscape",
			source : ["MW:SC", 8],
			minlevel : 14,
			description : desc([
				"As an action, I can have a creature I can see within 60 ft make a Wisdom save",
				"If failed, it is charmed or frightened (my choice) while I concentrate, up to 1 min",
				"This ends early if it takes damage; It can see and hear only itself, me, and the illusion"
			]),
			usages : 1,
			recovery : "short rest",
			action : ["action", ""]
		}
	}
}

//create the Speaker of Flames subclass
ClassSubList["speaker of flames"] = {
	regExpSearch : /^(?=.*speaker)(?=.*flames).*$/i,
	subname : "Speaker of Flames",
	source : ["MW:SC", 8],
	spellcastingExtra : ["burning hands", "healing word", "heat metal", "pyrotechnics", "fireball", "revivify", "fabricate", "wall of fire", "immolation", "mass cure wounds"],
	features : {
		"subclassfeature1" : {
			name : "Blessings of Flame",
			source : ["MW:SC", 8],
			minlevel : 1,
			description : desc([
				"I learn the Control Flames, Fire Bolt, and Produce Flame cantrips",
				"I learn the Ignan dialect of the Primordial language, and proficiency in an artisan's tool"
			]),
			eval : "AddLanguage('Ignan', 'Shaman (Blessing of Flame)'); AddTool('Type of artisan\\'s tools', 'Shaman (Blessing of Flame)');", 
			removeeval : "RemoveLanguage('Ignan', 'Shaman (Blessing of Flame)'); RemoveTool('Type of artisan\\'s tools', 'Shaman (Blessing of Flame)');",
			spellcastingBonus : {
				name : "Blessings of the Flame",
				spells : ["control flames", "fire bolt", "produce flame"],
				selection : ["control flames", "fire bolt", "produce flame"],
				times : 3
			}
		},
		"subclassfeature1.1" : {
			name : "Flamespeaker",
			source : ["MW:SC", 9],
			minlevel : 1,
			description : desc([
				"As an action, I can talk to the spirit of a fire within 10 ft, and ask it three questions",
				"A fire knows it surroundings since it was lit or previous lightings at the same spot",
				"It can describe the individual who lit it and knows the of objects/materials it burned",
				"If it burned a corpse fully, I can ask one question about what the corpse knew in life",
				"Once I speak with a fire, I can't speak with it again for 24 hours"
			]),
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Burn Away",
			source : ["MW:SC", 9],
			minlevel : 6,
			description : desc([
				"As a reaction when damaged, I can teleport 30 ft to an empty space I can see",
				"Each creature within 5 ft of where I teleported from or to, must make a Dex save",
				"It takes 2d10 fire damage on a failed save, or half as much on a successful one"
			]),
			recovery : "short rest",
			usages : 1,
			action : ["reaction", ""]
		},
		"subclassfeature10" : {
			name : "Absorb Fire",
			source : ["MW:SC", 9],
			minlevel : 10,
			description : desc([
				"I'm immune to fire damage and I regain HP instead of being damaged by it",
				"The HP regained equals half the fire damage taken, up to half my HP maximum"
			]),
			save : "Immunity to Fire"
		},
		"subclassfeature14" : {
			name : "Flames of Creation",
			source : ["MW:SC", 9],
			minlevel : 14,
			description : desc([
				"By working smokeless flame for 10 min, I can create a nonliving object within 30 ft",
				"This object must be composed of naturally occurring materials ans lasts indefinitely",
				"It is visually magical, provides dim light to 5 ft, is warm to the touch, floats on water",
				"The object disappears if it suffers noticeable damage, or I dismiss it as an action",
				"I can maintain a number of objects equal to my Charisma modifier",
				"Can't create spell components, magic items, items requiring craftmanship I don't have"
			]),
			action : ["action", " (dismiss)"]
		}
	}
}

//create the Speaker of Stone subclass
ClassSubList["speaker of stones"] = {
	regExpSearch : /^(?=.*speaker)(?=.*stones).*$/i,
	subname : "Speaker of Stones",
	source : ["MW:SC", 9],
	spellcastingExtra : ["earth tremor", "sanctuary", "earthbind", "lesser restoration", "erupting earth", "meld into stone", "grasping vine", "stone shape", "greater restoration", "transmute rock"],
	features : {
		"subclassfeature1" : {
			name : "Blessings of Stone",
			source : ["MW:SC", 9],
			minlevel : 1,
			skills : ["Athletics"],
			skillstxt : "\n\n" + toUni("Blessings of Stone") + ": Athletics",
			description : desc([
				"I learn the Magic Stone, Mold Earth, and Thorn Whip cantrips",
				"I learn the Terran dialect of the Primordial language, and gain proficiency in Athletics"
			]),
			eval : "AddLanguage('Terran', 'Shaman (Blessing of Stone)');",
			removeeval : "RemoveLanguage('Terran', 'Shaman (Blessing of Stone)');",
			spellcastingBonus : {
				name : "Blessings of the Stone",
				spells : ["magic stone", "mold earth", "thorn whip"],
				selection : ["magic stone", "mold earth", "thorn whip"],
				times : 3
			}
		},
		"subclassfeature1.1" : {
			name : "Stonespeaker",
			source : ["MW:SC", 10],
			minlevel : 1,
			description : desc([
				"As an action, I can talk to spirits of a stone I touch, and ask it three questions",
				"Stone spirits know what touched them, is inside them, and 100 ft of surroundings",
				"Once I speak with a stone, I can't speak with it again for 10 days"
			]),
			action : ["action", ""]
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
			description : desc([
				"I have resistance to bludgeoning damage",
				"I have adv. on Str and Dex saves made against effects that would knock me prone"
			]),
			eval : "AddResistance('Bludgeoning', 'Roots of the Mountain');",
			removeeval : "RemoveResistance('Bludgeoning');",
			save : "Adv. on Str and Dex saves vs. effects that make me prone",
		},
		"subclassfeature14" : {
			name : "Preserve in Stone",
			source : ["MW:SC", 10],
			minlevel : 14,
			description : desc([
				"By meditating for 10 min, I can turn a willing/incapacitated or object into stone",
				"As an action, I can release a petrified creature/object; I can have only 1 at a time"
			]),
			action : ["action", " (release)"]
		}
	}
};

//create the Speaker of Waters subclass
ClassSubList["speaker of waters"] = {
	regExpSearch : /^(?=.*speaker)(?=.*waters).*$/i,
	subname : "Speaker of Waters",
	source : ["MW:SC", 11],
	spellcastingExtra : ["create or destroy water", "ice knife", "calm emotions", "zone of truth", "counterspell", "tidal wave", "control water", "locate creature", "dominate person", "maelstrom"],
	features : {
		"subclassfeature1" : {
			name : "Blessings of Waters",
			source : ["MW:SC", 11],
			minlevel : 1,
			skills : ["Investigation"],
			skillstxt : "\n\n" + toUni("Blessings of Waters") + ": Investigation",
			description : desc([
				"I learn the Acid Splash, Frostbite, and Shape Water cantrips",
				"I learn the Aquan dialect of the Primordial language, and proficiency in Investigation"
			]),
			eval : "AddLanguage('Aquan', 'Shaman (Blessing of Waters)');",
			removeeval : "RemoveLanguage('Aquan', 'Shaman (Blessing of Waters)');",
			spellcastingBonus : {
				name : "Blessings of the Waters",
				spells : ["acid splash", "frostbite", "shape water"],
				selection : ["acid splash", "frostbite", "shape water"],
				times : 3
			}
		},
		"subclassfeature1.1" : {
			name : "Waterspeaker",
			source : ["MW:SC", 11],
			minlevel : 1,
			description : desc([
				"As an action, I talk to the spirit of a body of water I touch, and ask it three questions",
				"The water can't see creatures, objects, events on dry land, but can hear normally",
				"The water is aware of any creatures and objects that moved through it or are within it",
				"If a creature drank from it in the last 10 days, it can answers one question about it",
				"Once I speak with a body of water, I can't speak with it again for 10 days"
			]),
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Aqueous Form",
			source : ["MW:SC", 11],
			minlevel : 6,
			description : desc([
				"As a reaction when grappled or restrained, I can automatically escape the restraints",
				"I can use this feature at any time during being grappled or restrained"
			]),
			recovery : "short rest",
			usages : 1,
			action : ["reaction", ""]
		},
		"subclassfeature10" : {
			name : "Master of Ice and Steam",
			source : ["MW:SC", 11],
			minlevel : 10,
			description : desc([
				"I have resistance to cold and fire damage and suffer no harm from -20\xB0 to 120\xB0 F",
				"I have adv. on saves vs. effects that would reduce my speed or light me on fire"
			]),
			eval : "AddResistance('Cold', 'Master of Ice and Steam'); AddResistance('Fire', 'Master of Ice and Steam');",
			removeeval : "RemoveResistance('Cold'); RemoveResistance('Fire');",
			save : "Adv. saves vs. effects that reduce speed or light me on fire"
		},
		"subclassfeature14" : {
			name : "Move Across the Waters",
			source : ["MW:SC", 12],
			minlevel : 14,
			description : desc([
				"By meditating for 10 minutes in a pool of water, I can send my reflection to others",
				"The body of water must be at least 1 ft in diameter and calm to display reflections",
				"I then know the location of all appropriate water pools within 500 miles",
				"As an action, I can move my reflection to another pool or animate it inside a pool",
				"I can see, hear, and speak though this reflection; Switch to my senses as a bonus action",
				"This effect lasts for 1 hour or until concentration is broken"
			]),
			recovery : "long rest",
			usages : 1,
			action : ["action", ""]
		}
	}
}

//create the Speaker of Winds subclass
ClassSubList["speaker of winds"] = {
	regExpSearch : /^(?=.*speaker)(?=.*winds).*$/i,
	subname : "Speaker of Winds",
	source : ["MW:SC", 12],
	spellcastingExtra : ["catapult", "feather fall", "blur", "gust of wind", "fly", "lightning bolt", "freedom of movement", "storm sphere", "control winds", "passwall"],
	features : {
		"subclassfeature1" : {
			name : "Blessings of the Wind",
			source : ["MW:SC", 12],
			minlevel : 1,
			skills : ["Acrobatics"],
			skillstxt : "\n\n" + toUni("Blessings of the Wind") + ": Acrobatics",
			description : desc([
				"I learn the Gust, Lashing Wind, and Shocking Grasp cantrips",
				"I learn the Auran dialect of the Primordial language, and gain proficiency in Acrobatics"
			]),
			eval : "AddLanguage('Auran', 'Shaman (Blessing of the Wind)');",
			removeeval : "RemoveLanguage('Auran', 'Shaman (Blessing of the Wind)');",
			spellcastingBonus : {
				name : "Blessings of the Wind",
				spells : ["gust", "lashing wind", "shocking grasp"],
				selection : ["gust", "lashing wind", "shocking grasp"],
				times : 3
			}
		},
		"subclassfeature1.1" : {
			name : "Windspeaker",
			source : ["MW:SC", 12],
			minlevel : 1,
			description : desc([
				"As an action, I talk to the spirit of the wind around me, and ask it three questions",
				"Wind knows what happened outdoors, above ground, within 5 miles, in the last hour",
				"The wind does know if a specific creature, plant, or object is visibly within 5 miles",
				"I can ask the wind to carry a 25-word message to a downwind creature within 5 miles",
				"Once I do this, I can't speak with wind within 1 mile of the same location for 24 hours"
			]),
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Gustcloak",
			source : ["MW:SC", 13],
			minlevel : 6,
			description : desc([
				"As a reaction when a creature makes an attack roll against me, I impose disadvantage",
				"If it misses, my next attack roll before the end of my next turn has adv. against it"
			]),
			recovery : "short rest",
			usages : 1,
			action : ["reaction", ""]
		},
		"subclassfeature10" : {
			name : "Weather the Storm",
			source : ["MW:SC", 13],
			minlevel : 10,
			description : "\n   " + "I have resistance to lightning and thunder damage, I am immune to being paralyzed",
			eval : "AddResistance('Lightning', 'Weather the Storm'); AddResistance('Thunder', 'Weather the Storm');",
			removeeval : "RemoveResistance('Lightning'); RemoveResistance('Thunder');",
			save : "Immunity to being Paralyzed",
		},
		"subclassfeature14" : {
			name : "Stormwalker",
			source : ["MW:SC", 13],
			minlevel : 14,
			description : desc([
				"I have learned to summon storms that can transport to locations I'm familiar with",
				"By meditating for 24 hours in an outdoor location, I can bond with that location",
				"I can maintain an amount of bonds up to my Charisma Modifier",
				"To severe a bond, I have to spend an hour in meditation",
				"By spending 10 minutes invoking spirits of a bonded location, I summon a small storm",
				"This small stom teleports me and up to 8 allies within 10 ft to the invoked location",
				"Instead of allies, I can take an object with me, as long as it fits in a 10-ft cube",
				"Travelers disappear and appear with a sudden flash of lightning from the small storm",
				"Travelers are treated as being on another plane during the 10 minute travel time"
			]),
			recovery : "long rest",
			usages : 1,
			action : ["action", ""]
		}
	}
};

//create the Spirit Weapon attack option
WeaponsList["spirit weapon"] = {
	regExpSearch : /^(?=.*spirit)(?=.*weapon).*$/i,
	name : "Spirit Weapon",
	ability : 1,
	type : "Natural",
	damage : [1, 8, "slashing"],
	range : "Melee",
	description : "Ghostly melee weapon of a chosen type, which determines the damage type; Counts as magical",
	abilitytodamage : true,
	monkweapon : false
};

//create the spells
SpellsList["lashing wind"] = {
	name : "Lashing Wind",
	source : ["MW:SC", 17],
	ritual : false,
	level : 0,
	school : "Trans",
	time : "1 a",
	range : "30 ft",
	components : "V,S,",
	duration : "Instantaneous",
	description : "Spell atk 1 crea, 1d6 Slashing dmg and if size up to Large, pushed away 5 ft; +1d4 at CL 5, 11, and 17", //fixed the spell description so it fits on the spell sheet
	descriptionFull : "I release a blast of howling wind from my hands that slash at a creature in range. Make a ranged spell attack against the target. If the attack hits, the creature takes 1d6 slashing damage, and if the creature is Large or smaller, I push the creature up to 5 feet away from me." + "\n   " + "This spell’s damage increases by 1d6 when I reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
};
SpellsList["touch of madness"] = {
	name : "Touch of Madness",
	source : ["MW:SC", 17],
	ritual : false,
	level : 0,
	school : "Ench",
	time : "1 a",
	range : "Touch",
	components : "V,S,",
	duration : "Instantaneous",
	description : "Spell atk 1 creature, 1d4 Psychic dmg and dis. on next attack roll; +1d4 at CL 5, 11, and 17",
	descriptionFull : "Maddening whispers and babbling nonsense rush into the mind of a creature I try to touch. Make a melee spell attack against the target. If the attack hits, the creature takes 1d4 psychic damage, and the creature has disadvantage on the next attack roll it makes before the end of its next turn." + "\n   " + "This spell’s damage increases by 1d4 when I reach 5th level (2d4), 11th level (3d4), and 17th level (4d4)"
};

//add the source
SourceList["MW:SC"] = {
	name : "Michael Wolf: Shaman Class",
	abbreviation : "MW:SC",
	group : "Dungeon Masters Guild",
	url : "http://www.dmsguild.com/product/170851/"
};
