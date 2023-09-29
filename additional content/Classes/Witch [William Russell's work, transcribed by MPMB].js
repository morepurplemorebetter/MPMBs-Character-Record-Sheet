/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds a class, called "Witch" and its 3 subclasses
				This class has been made and published by William Russell in 2016
				Although it had been published on DMs Guild, it has been
				taken offline sometime in 2018 and is thus no longer available, see:
				https://web.archive.org/web/20180718193751/https://www.dmsguild.com/product/183491/Witch-Class-5e

	Code by:	MorePurpleMoreBetter
	Date:		2023-04-24 (sheet v13.1.6)

	Caution:	MorePurpleMoreBetter advises against using this class as it isn't well constructed (most of its features don't adhere to 5e standards and many rules are interpertations by MPMB as the author references game mechanics from older editions of D&D). This code was made on commission for a patron.
*/

var iFileName = "Witch [William Russell's work, transcribed by MPMB].js";
RequiredSheetVersion("13.1.3");

SourceList["WR:W"] = {
	name : "William Russell: Witch",
	abbreviation : "WR:W",
	group : "Dungeon Masters Guild",
	url : "https://www.dropbox.com/s/39mm98n3uygfiai/Witch_Class_5e_9305741.pdf?dl=1",
	date : "2016/05/18"
};

// First make sure the sorcerer class doesn't interfere
ClassList.sorcerer.regExpSearch = /sorcerer/i;

// Tell the sheet the spells on the Witch's spell list
[
	// Cantrips (0 Level)
	"chill touch", "dancing lights", "friends", "guidance", "light", "mage hand", "mending", "message", "minor illusion", "poison spray", "prestidigitation", "resistance", "spare the dying",
	// 1st level
	"alarm", "animal friendship", "bane", "charm person", "comprehend languages", "create or destroy water", "detect magic", "detect poison and disease", "disguise self", "dissonant whispers", "feather fall", "fog cloud", "healing word", "heroism", "hex", "identify", "illusory script", "purify food and drink", "silent image", "sleep", "speak with animals", "thunderwave", "unseen servant", "witch bolt",
	// 2nd level
	"aid", "animal messenger", "augury", "beast sense", "blindness/deafness", "continual flame", "detect evil and good", "detect thoughts", "enhance ability", "enthrall", "gentle repose", "gust of wind", "hold person", "knock", "levitate", "locate animals or plants", "locate object", "magic mouth", "moonbeam", "phantasmal force", "protection from evil and good", "see invisibility", "shatter", "silence", "suggestion", "zone of truth",
	// 3rd level
	"animate dead", "clairvoyance", "counterspell", "create food and water", "conjure animals", "daylight", "dispel magic", "fear", "fly", "gaseous form", "glyph of warding", "haste", "leomund's tiny hut", "magic circle", "remove curse", "sending", "slow", "speak with dead", "speak with plants", "stinking cloud", "tongues", "water breathing",
	// 4th level
	"banishment", "compulsion", "control water", "death ward", "divination", "dominate beast", "freedom of movement", "locate creature", "polymorph",
	// 5th level
	"animate objects", "awaken", "commune", "commune with nature", "contagion", "dominate person", "hold monster", "mislead", "modify memory", "planar binding", "scrying", "seeming", "telekinesis",
	// 6th level
	"arcane gate", "find the path", "forbiddance", "mass suggestion", "programmed illusion", "true seeing",
	// 7th level
	"conjure celestial", "etherealness", "forcecage", "project image", "symbol", "teleport",
	// 8th level
	"control weather", "feeblemind", "glibness", "power word stun",
	// 9th level
	"astral projection", "foresight", "shapechange", "true polymorph"
].forEach( function (s) {
	if(SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("witch-wr") === -1) SpellsList[s].classes.push("witch-wr");
});

// Then create the Witch ClassList object
ClassList['witch-wr'] = {
	regExpSearch : /witch/i,
	name : "Witch",
	source : [["WR:W", 0]],
	primaryAbility : "Wisdom",
	abilitySave : 5,
	prereqs : "Wisdom 13",
	die : 6,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Int", "Wis"],
	skillstxt : {
		primary : "Choose two from Arcana, History, Insight, Medicine, Nature, and Religion"
	},
	toolProfs : {
		primary : ["Herbalism Kit"]
	},
	weaponProfs : {
		primary : [false, true]
	},
	equipment : "Witch starting equipment:" +
		"\n \u2022 A Quaterstaff -or- a dagger" +
		"\n \u2022 A component pouch -or- a focus" +
		"\n \u2022 A sholar's pack -or- an explorer's pack" +
		"\n \u2022 A Grimoire (spellbook)" +
		"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Tradition", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : 1,
	spellcastingKnown : {
		cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : "book"
	},
	features : {
		"spellcasting" : {
			name : "Spellcasting",
			source : [["WR:W", 3]],
			minlevel : 1,
			description : desc([
				"I can cast cantrips and any spell in my grimoire, using Wisdom as my spellcasting ability",
				"To cast a spell in my grimoire, it must read from it on the right page for that spell",
				"As an action, I can pull out and prepare my grimoire; I can use a druidic or arcane focus",
				"I can cast all witch spells in my grimoire as rituals if they have the ritual tag"
			]),
			additional : levels.map(function (n, idx) {
				return [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4][idx] + " cantrips known";
			}),
			action : [["action", "Ready Grimoire"]]
		},
		"spiral dance" : { // Changed it to be a minimum of 1 level of spell slots, as otherwise it doesn't make sense to get that at 1st level
			name : "Spiral Dance",
			source : [["WR:W", 4]],
			minlevel : 1,
			description : desc([
				"By dancing beneath the night sky, I can recover some 6th-level or lower spell slots"
			]),
			additional : levels.map(function (n) {
				var lvls = Math.max(1, Math.ceil(n / 4));
				return lvls + " level" + (lvls > 1 ? "s" : "") + " of spell slots";
			}),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature2" : {
			name : "Tradition",
			source : [["WR:W", 5]],
			minlevel : 2,
			description : '\n   Choose a Witching Tradition that represents your style and put it in the "Class" field'
		},
		"wild shape" : { // use this object name so the sheet known to populate the wild shape pages
			name : "Animal Shift",
			source : [["WR:W", 4]],
			minlevel : 3, // the table says 3rd-level, the text says 5th
			description : desc([
				"As a bonus action, I assume the shape of a Small or Tiny beast I have seen before:",
				" \u2022 I gain all its game statistics except Intelligence, Wisdom, or Charisma",
				" \u2022 I get its skill/saving throw prof. while keeping my own, using whichever is higher",
				" \u2022 I assume the beast's HP and HD; I get mine back when I revert back",
				" \u2022 I can't cast spells in beast form, but transforming doesn't break concentration",
				" \u2022 I retain features from class, race, etc., but I don't retain special senses",
				" \u2022 The DM choses which equipment merges or stays worn",
				" \u2022 I revert if out of time or unconscious; if KOd by damage, excess damage carries over"
			]),
			usages : levels.map(function (n) {
				return n < 3 ? "" : n < 6 ? 1 : n < 10 ? 2 : n < 13 ? 3 : n < 18 ? 4 : 5;
			}),
			recovery : "long rest",
			additional : levels.map(function (n) {
				if (n < 3) return "";
				var half = Math.floor(n/2);
				return "CR " + half + ", Small or Tiny; " + half + " hrs";
			}),
			action : [["bonus action", " (start/end)"]] // the text talks about a move action to start, but that doesn't exist in 5e
		},
		"scribe spirit kin" : { // see Find Spirit Kin listed in witch's spell list
			name : "Scribe Spirit Kin",
			source : [["WR:W", 9]],
			minlevel : 3,
			description : desc([
				"I can have a single Spirit Kin, a beast up to my level in HD or pseudodragon, see spell",
				"I can transfer spells from my Grimoire to my Spirit Kin, who has its own spell slots",
				"It casts using my spellcasting ability; Spells transferred can't be re-added to my Grimoire",
				"If it is killed, I can learn transferred spells again, but they don't reappear automatically"
			]),
			spellcastingBonus : {
				name : "Spirit Kin",
				spells : ["find spirit kin"],
				selection : ["find spirit kin"]
			}
		},
		"improved animal shift" : {
			name : "Improved Animal Shift",
			source : [["WR:W", 10]],
			minlevel : 15,
			description : desc([
				"If I absorb my Grimoire when shifting, I can cast spells while in animal form",
				"I can use somatic/verbal components, but materials only if the form can properly hold it"
			])
		},
		"drawing the moon" : {
			name : "Drawing the Moon",
			source : [["WR:W", 10]],
			minlevel : 20,
			description : desc([
				"When I exclusively meditate during a short rest, I can have it count as a long rest instead",
				"I have to make 3 DC 15 Con saves to do so; If I fail any, I can't try this again for 24 hrs"
			]),
			usages : 3,
			recovery : 'week'
		}
	}
};

// Add the spirit kin
SpellsList["find spirit kin"] = {
	name : "Find Spirit Kin",
	classes : ["witch"],
	source : [["WR:W", 12]],
	ritual : true,
	level : 2,
	school : "Conj",
	time : "1 h",
	range : "10 ft",
	components : "V,S,M\u2020",
	compMaterial : "10 gp worth of charcoal, incense, and herbs that must be consumed by fire in a brass brazier",
	duration : "Instantaneous",
	description : "Gain services of a beast; I can see through its eyes; it can deliver touch spells; see B (10gp cons.)",
	descriptionFull : "You gain the service of a familiar, a living, breathing animal. You can choose a pseudodragon or any beast with HD equal to or below your witch level. It appears in an unoccupied space within range." + "\n   " + "Your familiar acts independently of you, but it always obeys your commands. In combat, it rolls its own initiative and acts on its own turn. A familiar can't attack, but it can take other actions as normal." + "\n   " + "When the familiar drops to 0 hit points, it disappears, leaving behind no physical form. It reappears after you cast this spell again. While your familiar is within 100 feet of you, you can communicate with it telepathically. Additionally, as an action, you can see through your familiar's eyes and hear what it hears until the start of your next turn, gaining the benefits of any special senses that the familiar has. During this time, you are deaf and blind with regard to your own senses." + "\n   " + "As an action, you can temporarily dismiss your familiar. It disappears into a pocket dimension where it awaits you summons. Alternatively, you can dismiss it forever. As an action while it is temporarily dismissed, you can cause it to reappear in any unoccupied space within 30 feet of you." + "\n   " + "You can't have more than one familiar at a time. If you cast this spell while you already have a familiar, you instead cause it to adopt a new form. Choose one of the forms from the above list. Your familiar transforms into the chosen creature." + "\n   " + "Finally, when you cast a spell with a range of touch, your familiar can deliver the spell as if it had cast the spell. Your familiar must be within 100 feet of you, and it must use its reaction to deliver the spell when you cast it. If the spell requires an attack roll, you use your attack modifier for the roll."
}
CompanionList.spirit_kin = {
	name : "Spirit Kin",
	nameTooltip : "the Find Spirit Kin spell",
	nameOrigin : "2nd-level conjuration [ritual] spell",
	nameMenu : "Spirit Kin (Witch feature)",
	source : [["WR:W", 9]],
	includeCheck : function(sCrea, objCrea, iCreaCR) {
		var iWitchLevel = classes.known['witch-wr'] ? classes.known['witch-wr'].level : 1;
		return sCrea === 'pseudodragon' || (objCrea.type.toLowerCase() === "beast" && objCrea.hd && objCrea.hd[0] <= iWitchLevel) ? true : false;
	},
	action : [
		["action", "Spirit Kin (dismiss/reappear)"],
		["action", "Use spirit kin's senses"]
	],
	attributesChange : function(sCrea, objCrea) {
		objCrea.attacks = []; // can't do any attacks
	},
	calcChanges : {
		// use hp calculation to determine the amount of spell slots to show, as they are HD-dependent
		hp : function (totalHD, HDobj, prefix) {
			var sFeatures = What(prefix + 'Comp.Use.Features');
			var currentHD = sFeatures.match(/spell slots \[(\d+) HD\][\s\S]*?\u00A0/i);
			// Stop if the string is not found or the HD is already correct
			if (!currentHD || Number(currentHD[1]) == totalHD) return;
			// Build the string with ballot boxes
			var aSlots = CompanionList.spirit_kin.spellTable[Math.min(totalHD, 20)];
			var sBox = '\u274F';
			var sNewStr = 'spell slots [' + totalHD + ' HD]:' + (typePF ? '\n   ' : '  ');
			for (var i = 0; i < aSlots.length; i++) {
				if (aSlots[i]) {
					sNewStr += Base_spellLevelList[i+1].replace('-level', '') + ": " + sBox.repeat(aSlots[i]);
					if ((i+1) === aSlots.length || !aSlots[i+1]) {
						// closing with non-breaking space to find this string again
						sNewStr += '\u00A0';
					} else if (typePF && i === 2) {
						// add a line break on the Printer Friendly sheet after the 3rd level slots
						sNewStr += '\n   ';
					} else {
						sNewStr += typePF ? '\t' : '    ';
					}
				};
			}
			Value(prefix + 'Comp.Use.Features', sFeatures.replace(currentHD[0], sNewStr));
		}
	},
	attributesAdd : {
		header : "Spirit Kin",
		features : [{
			name : "Find Spirit Kin",
			description : "If dropped to 0 HP, the spirit kin disappears, leaving behind no physical form. The spirit kin must obey all commands of its master."
		}, {
			name : "Spellcasting",
			description : "The spirit kin can cast spells scribed to it by its master. It casts these using its master's spellcasting ability, but using its own spell slots [0 HD]:\u00A0"
		}]
	},
	notes : function() {
		var a = newObj(CompanionList.familiar.notes);
		a[0].description = [
			"appearing in an unoccupied space within 10 ft",
			"It assumes a chosen beast (HD no more than witch level) or pseudodragon form",
			"It has that form's statistics, but can't make attacks; Its form can be changed at every casting",
			"When the spirit kin drops to 0 hit points, it disappears, leaving behind no physical form",
			"It reappears when I cast this spell again (in a new form if so desired)"
		].join("\n   ");
		a.forEach(function (obj) {
			obj.name = obj.name.replace('familiar', 'spirit kin');
			obj.description = obj.description.replace('familiar', 'spirit kin');
		});
		return a;
	}(),
	spellTable : [
		[0, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0],
		[2, 1, 0, 0, 0, 0],
		[2, 1, 0, 0, 0, 0],
		[2, 1, 0, 0, 0, 0],
		[2, 1, 0, 0, 0, 0],
		[3, 2, 1, 0, 0, 0],
		[3, 2, 1, 0, 0, 0],
		[3, 2, 1, 0, 0, 0],
		[3, 2, 1, 0, 0, 0],
		[3, 2, 2, 1, 0, 0],
		[3, 2, 2, 1, 0, 0],
		[3, 2, 2, 1, 0, 0],
		[3, 2, 2, 1, 0, 0],
		[3, 2, 2, 2, 1, 0],
		[3, 2, 2, 2, 1, 0],
		[3, 2, 2, 2, 1, 0],
		[3, 2, 2, 2, 2, 1]
	]
};

AddSubClass("witch-wr", "fey tradition", {
	regExpSearch : /^(?=.*witch)(?=.*fey).*$/i,
	subname : "Fey Tradition",
	source : [["WR:W", 5]],
	fullname : "Fey Witch",
	spellcastingExtra : ["faerie fire", "tasha's hideous laughter", "invisibility", "misty step", "hypnotic pattern", "major image", "greater invisibility", "hallucinatory terrain", "dream", "geas", "conjure fey", "otto's irresistible dance", "mirage arcane", "prismatic spray", "mind blank", "weird"],
	features : {
		"subclassfeature2" : {
			name : "Fey Seeming",
			source : [["WR:W", 5]],
			minlevel : 2,
			description : " [see DMG 244-245]" + desc([
				"As a reaction, I can improve the social attitudes of those that meet me by one step",
				"Those that I've shown myself to be dangerous to are immune to this for 24 hours"
			])
		},
		"subclassfeature5" : {
			name : "Court Membership",
			source : [["WR:W", 5]],
			minlevel : 5,
			description : desc([
				"As can freely attend the court I have joined; Fey consider me to be one of their own",
				"I am immune to some planar effects: temporal warping and Feywild's memory loss"
			]),
			additional : levels.map(function (n) {
				return n < 5 ? "" : n < 9 ? "Fledgling" : n < 14 ? "Ward" : "Full member";
			})
		},
		"subclassfeature7" : {
			// made it last 1+Cha mod rounds instead of turns
			name : "Faerie Circle",
			source : [["WR:W", 5]],
			minlevel : 7,
			description : desc([
				"As an action, I can summon a circle of blue mushrooms in a 10-ft cube around me",
				"Any hostile that enter or start their turn in the area are affected by Charm Person",
				"They must make a Wisdom save as normal; The mushrooms last for 1 + Cha mod rounds"
			]),
			action : [["action", ""]]
		},
		"subclassfeature9" : {
			// made it take an action, as it isn't specified
			// no mention of how long the portal lasts though...
			name : "Ward of the Court",
			source : [["WR:W", 6]],
			minlevel : 9,
			description : desc([
				"As an action, I can open a portal to the Feywild, to which I'm allowed to freely travel"
			]),
			usages : "Charisma modifier per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "week"
		},
		"subclassfeature11" : {
			name : "Fey Weird",
			source : [["WR:W", 6]],
			minlevel : 11,
			description : desc([
				"As an action, I can make a spell attack against one living creature I can see within 30 ft",
				"If I hit, I can use a 4th-level or higher spell slot to reduce its size as per Enlarge/Reduce",
				"Also, it drops equipment as appropriate; This is a curse and can be removed as such",
				"It lasts my level in minutes; Reduce: -1d4 weapon damage, disadv. on Str checks/saves"
			]),
			action : [["action", ""]],
			additional : levels.map(function (n) {
				return n < 11 ? "" : "lasts " + n + " minutes";
			})
		},
		"subclassfeature14" : {
			name : "Brethren of the Court",
			source : [["WR:W", 6]],
			minlevel : 14,
			description : desc([
				"I appear more fey-like; I can request the court's boon once a month (e.g. 2000 gp items)",
				"I gain 30 ft Darkvision, +1 Cha, \u0026 Fey Ancestry (adv. vs. charm, immune to magic sleep)"
			]),
			scores : [0,0,0,0,0,1],
			vision : [["Darkvision", "fixed 30"], ["Darkvision", "+30"]],
			savetxt : {
				text : ["Magic can't put me to sleep"],
				adv_vs : ["charmed"]
			},
			usages : 1,
			recovery : "month",
			limfeaname : "Boon of the court"
		},
		"subclassfeature17" : {
			// made it last 1+Con mod rounds instead of turns
			// +4 Dex instead of +4 Agility
			// made it take a bonus action, in line with the short duration
			name : "Wildling Form",
			source : [["WR:W", 6]],
			minlevel : 17,
			description : desc([
				"As a bonus action, I can imbue myself with raw Feywild energy for 1 + Con mod rounds",
				"This grants me +4 Dexterity, +5 ft speed, double jump distances, and halves my weight"
			]),
			usages : 3,
			recovery : "long rest"
		}
	}
});

AddSubClass("witch-wr", "hedge tradition", {
	regExpSearch : /^(?=.*witch)(?=.*hedge).*$/i,
	subname : "Hedge Tradition",
	source : [["WR:W", 6]],
	fullname : "Hedge Witch",
	spellcastingExtra : ["cure wounds", "entangle", "calm emotions", "lesser restoration", "mass healing word", "plant growth", "revivify", "spirit guardians", "greater restoration", "mass cure wounds", "guards and wards", "heal", "regenerate", "resurrection", "animal shapes", "power word heal"],
	features : {
		"subclassfeature2" : {
			name : "Medicinal Knowledge",
			source : [["WR:W", 6]],
			minlevel : 2,
			description : desc([
				"I add my Int modifier to the amount of hp I heal with spells that add my Wis modifier"
			]),
			calcChanges : {
				spellAdd : [
					// Add Int modifier to any spell that already adds the spellcasting ability modifier
					function (spellKey, spellObj, spName) {
						var iIntMod = Number(What('Int Mod'));
						if (spellObj.psionic || iIntMod < 1 || !/spell(casting)? (ability )?mod(ifier)? hp/i.test(SpellsList[spellKey].description)) return false;
						return genericSpellDmgEdit(spellKey, spellObj, "heal", 'Int');
					},
					"I add my Intelligence modifier along with my Wisdom modifier when casting healing spells."
				]
			}
		},
		"subclassfeature5" : {
			name : "Elemental Connection",
			source : [["WR:W", 6]],
			minlevel : 5,
			description : desc([
				'Select an element using the "Choose Feature" button above'
			]),
			choices : ["Air", "Earth", "Fire", "Water"],
			"air" : {
				name : "Air Elemental Connection",
				description : desc([
					"My spells are air-themed and I have resistance against lightning damage"
				]),
				dmgRes : ["Lightning"]
			},
			"earth" : {
				name : "Earth Elemental Connection",
				description : desc([
					"My spells are earth-themed and I have resistance against acid damage"
				]),
				dmgRes : ["Acid"]
			},
			"fire" : {
				name : "Fire Elemental Connection",
				description : desc([
					"My spells are fire-themed and I have resistance against fire damage"
				]),
				dmgRes : ["Fire"]
			},
			"water" : {
				name : "Water Elemental Connection",
				description : desc([
					"My spells are water-themed and I have resistance against cold damage"
				]),
				dmgRes : ["Cold"]
			},
			choiceDependencies : [{
				feature : "subclassfeature14"
			}]
		},
		"subclassfeature7" : {
			name : "Imbue Grain",
			source : [["WR:W", 7]],
			minlevel : 7,
			description : desc([
				"I can imbue a seed with a single-target healing spell I cast, by using a spell slot as normal",
				"Later, it can then be consumed as a potion; I can have only 20 imbued seeds at a time"
			]),
			additional : levels.map(function (n) {
				if (n < 7) return "";
				var maxSpell = defaultSpellTable[Math.min(n,defaultSpellTable.length)].trailingIndexOf(0);
				if (maxSpell === -1) maxSpell = 9;
				return "up to " + spellLevelList[maxSpell-2] + " spells";
			})
		},
		"subclassfeature9" : {
			name : "Elemental Essence",
			source : [["WR:W", 7]],
			minlevel : 9,
			description : desc([
				"I don't need to eat or sleep; Elementals are initially not openly aggressive towards me"
			])
		},
		"subclassfeature11" : {
			/*
			  This feature is a mess and very much open to interpertation:
			  - it lists a 'full action' which does not exist in 5e, so an action is assumed
			  - it lists multiple areas of effect, so the more specific one with a range is used instead of "where the witch is standing"
			  - the specific range does not say whether the 15 ft circle is diameter or radius, so radius is assumed
			  - it does not specify a duration, so a 1 minute duration is added
			  - there are only two multi-target healing spells on the Hedge Witch's spell list
			*/
			name : "Healing Roots",
			source : [["WR:W", 7]],
			minlevel : 11,
			description : desc([
				"As an action, I can imbue a 15-ft radius, 1-ft high cylinder within 30 ft with healing",
				"I choose a multi-target healing spell I know; The roots in the area then heal for 1 minute",
				"Any friendly target beginning their turn in the area are healed as per the spell",
				"This uses two spell slots: one for casting the spell and another that is one level below"
			]),
			action : [['action', '']]
		},
		"subclassfeature14" : {
			name : "Elemental Presence",
			source : [["WR:W", 7]],
			minlevel : 14,
			description : desc([
				'Select an element using the "Choose Feature" button above'
			]),
			choices : ["Air", "Earth", "Fire", "Water"],
			choicesNotInMenu : true,
			"air" : {
				name : "Air Elemental Presence",
				description : desc([
					"I gain a magical 60 ft fly speed, as per the Fly spell; It doesn't work if I'm unconscious"
				]),
				speed : {
					fly : { spd : 60, enc : 50 }
				}
			},
			"earth" : { // no range was specified, so assumed 60 ft
				name : "Earth Elemental Presence",
				description : desc([
					"I gain tremorsense out to 60 ft"
				]),
				vision : [["Tremorsense", 60]]
			},
			"fire" : {
				name : "Fire Elemental Presence",
				description : desc([
					"I emit a heat that deals 2 damage to any living being that physically touches me"
				]),
			},
			"water" : {
				name : "Water Elemental Presence",
				description : desc([
					"I can breathe underwater and gain a 30 ft swim speed"
				]),
				speed : {
					swim : { spd : 30, enc : 20 }
				}
			}
		},
		"subclassfeature17" : {
			name : "Twine Souls",
			source : [["WR:W", 7]],
			minlevel : 17,
			description : desc([
				"As an action, I heal a target I can see by half my max HP, I then take that in damage"
			]),
			usages : 1,
			recovery : 'week'
		},
		action : [['action', '']]
	}
});

AddSubClass("witch-wr", "shadow tradition", {
	regExpSearch : /^(?=.*witch)(?=.*shadow).*$/i,
	subname : "Shadow Tradition",
	source : [["WR:W", 8]],
	fullname : "Shadow Witch",
	spellcastingExtra : ["inflict wounds", "ray of sickness", "crown of madness", "darkness", "bestow curse", "vampiric touch", "blight", "confusion", "raise dead", "insect plague", "create undead", "harm", "finger of death", "simulacrum", "dominate monster", "power word kill"],
	features : {
		"subclassfeature2" : {
			// A bite attack as a reaction... to what? Made it into a regular bite attack instead that deals piercing damage
			name : "Visage of the Dark",
			source : [["WR:W", 8]],
			minlevel : 2,
			description : desc([
				"My look changes as I gain stringy hair, pale skin, dark eyes, and long, sharp teeth",
				"I can use my sharp teeth to make unarmed strikes dealing 1d4 piercing damage"
			]),
			weaponOptions : {
				baseWeapon : "unarmed strike",
				regExpSearch : /\bbite\b/i,
				name : "Bite",
				source : [["WR:W", 8]],
				damage : [1, 4, "piercing"]
			},
			weaponsAdd : ["Bite"]
		},
		"subclassfeature5" : {
			name : "Shadowborne",
			source : [["WR:W", 8]],
			minlevel : 5,
			description : desc([
				"I gain prof. in Stealth and immunity to being frightened \u0026 effects of Shadowfell Despair"
			]),
			skills : ["Stealth"],
			savetxt : { immune : ["frightened"] },
		},
		"subclassfeature7" : {
			name : "Blood Magic Components",
			source : [["WR:W", 8]],
			minlevel : 7,
			description : desc([
				'Use the "Choose Feature" button to select which version to use, the default or the variant'
			]),
			defaultChoice : "default (replace components)",
			choices : ["Default (replace components)", "Variant (mechanical bonus)"],
			"default (replace components)" : {
				name : "Blood Magic",
				description : desc([
					"I can use blood to replace material components of spells, if I can touch the blood",
					"This works regardless the origin of the blood, my own or blood in a container",
					"It can replace 10 gp per 2 hp (from living specimen), or per 1 ml (from container)"
				])
			},
			"variant (mechanical bonus)" : {
				// Beware, this is clearly overpowered
				name : "Blood Magic [variant]",
				description : desc([
					"I can use blood that I can touch to bolster my spells, regardless the origin of the blood",
					"Per 2 hp (from living specimen), or per 1 ml (from container) it can give a +1 bonus",
					"This bonus can be to either the spell attack roll, the spell's DC, or the spell's damage"
				])
			}
		},
		"subclassfeature9" : {
			name : "Channel Darkness",
			source : [["WR:W", 8]],
			minlevel : 9,
			description : desc([
				"I can increase the damage of a single-target spell by channeling the Shadowfell into it",
				"The bonus only applies on a single roll, to one target; I can used it after the spell hits"
			]),
			usages : "Cha mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest",
			additional : levels.map(function (n) {
				return n < 9 ? "" : "+" + n + " damage";
			})
		},
		"subclassfeature11" : {
			name : "Curse Chain",
			source : [["WR:W", 8]],
			minlevel : 11,
			description : desc([
				"I can have my curse spells affect an additional target within 5 ft, by using an extra slot",
				"Thus, I expend two spell slot of the spell's level or higher and affect an additional target"
			])
		},
		"subclassfeature14" : {
			// made it take an action, as it isn't specified
			// added 1 minute duration, as it isn't specified
			name : "Eyes of the Hag",
			source : [["WR:W", 9]],
			minlevel : 14,
			description : desc([
				"As an action, I can have any creature within 30 ft that can see me make a Wisdom save",
				"If failed, they get Shadowfell Despair for 1 minute; On success, immune for 1 minute"
			]),
			action : [["action", ""]],
			usages : 3,
			recovery : "long rest",
			toNotesPage : [{
				name : "Shadowfell Despair Table",
				source : [["D", 52]],
				note : [
					" d6\tEffect",
					'1-3\tApathy. The creature has disadvantage on death saving throws and on Dexterity checks for initiative, and gains the following flaw: "I don\'t believe I can make a difference to anyone or anything."',
					'4-5\tDread. The creature has disadvantage on all saving throws and gains the following flaw: "I am convinced that this place is going to kill me."',
					'6\tMadness. The creature has disadvantage on ability checks and saving throws that use Intelligence, Wisdom, or Charisma, and gains the following flaw: "I can\'t tell what\'s real anymore."'
				]
			}]
		},
		"subclassfeature17" : {
			name : "Shadow Strike",
			source : [["WR:W", 9]],
			minlevel : 17,
			description : desc([
				"I can count as have line of sight to creature even if I can see only its shadow",
				"This works only with single-target spells; I can distinguish between overlapping shadows"
			]),
			usages : "Charisma modifier per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "day"
		}
	}
});
