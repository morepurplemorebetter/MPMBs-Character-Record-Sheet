/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    3rd-party compendium
	Effect:     This script adds most player options from the book "Critical Role: Tal'Dorei Campaign Setting"
				This is based on the printed version of the book (which is v1.1 of the rules)
				All content is made by Matthew Mercer

	Content:	4 subclasses
				4 backgrounds
				9 feats

	Code by:	AqueonTheConjurer & MorePurpleMoreBetter
	Date:		2018-07-13 (sheet v12.999)

	-BE AWARE-
	This content is outdated as an extended and revised re-release of the book was published on 31 December 2021.
	You can find the new version here:
	https://shop.critrole.com/products/taldorei-campaign-setting-reborn
*/

var iFileName = "Tal'Dorei Campaign Setting (Critical Role).js";
RequiredSheetVersion(12.999);

// Define the source
SourceList.TDCS = {
	name: "Tal'Dorei Campaign Setting (Critical Role) v1.1",
	abbreviation: "TDCS",
	group: "Third Party Compendium",
	url: "https://criticalrole.fandom.com/wiki/Critical_Role:_Tal%27Dorei_Campaign_Setting",
	date: "2017/10/17"
};

// Add subclasses
AddSubClass("cleric", "blood domain-tdcs", {
	regExpSearch: /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(blood|health|vitality)).*$/i,
	subname: "Blood Domain",
	source: ["TDCS", 101],
	spellcastingExtra: ["sleep", "ray of sickness", "ray of enfeeblement", "crown of madness", "haste", "slow", "blight", "stoneskin", "dominate person", "hold monster"],
	features: {
		"subclassfeature1" : {
			name : "Bonus Proficiencies",
			source : ["TDCS", 101],
			minlevel : 1,
			weapons : [false, true],
			description : desc([
				"I gain proficiency with martial weapons"
			])
		},
		"subclassfeature1.1" : {
			name : "Bloodletting Focus",
			source : ["TDCS", 101],
			minlevel : 1,
			description : desc([
				"I do extra damage with all my 1st-level or higher spells that inflict damage",
				"If used on a creature with blood, my spells do an extra 2 + spell's level necrotic damage"
			])
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Blood Puppet",
			source : ["TDCS", 101],
			minlevel : 2,
			description : desc([
				"As an action, a creature with blood within 60 ft of me must make a Constitution save",
				"If failed, the target moves up to half its speed in a direction of my choice",
				"Also, it makes one weapon attack against a target of my choice within its range",
				"Dead or unconscious creatures automatically fail their saving throw"
			]),
			action : [["action", ""]],
			additional : levels.map( function(n) {
				if (n < 2) return "";
				return (n < 8 ? "Large " : "Huge") + "or smaller creature";
			})
		},
		"subclassfeature6" : {
			name : "Channel Divinity: Crimson Bond",
			source : ["TDCS", 101],
			minlevel : 6,
			description : desc([
				"As an action, I can focus on a sample of blood that has been spilt less than a week ago",
				"If there is at least 2 ounces, I learn about the creature it came from if within 10 miles",
				"I know the approximate distance, direction, and general state of health of the target",
				"I can maintain this connection by concentrating (as on a spell) for up to 1 hour",
				"While connected, I can end it as an action, forcing the target to make a Con save",
				"If failed, it takes 2d6 necrotic damage and I can either see or hear what the target does",
				"This lasts for my Wis mod in round, for which I'm blinded or deafened (respectively)"
			]),
			action : [["action", ""]]
		},
		"subclassfeature8" : {
			name : "Sanguine Recall",
			source : ["TDCS", 102],
			minlevel : 8,
			description : desc([
				"As an action, I can recover spell slots with a combined level up to half my cleric level",
				"If I do so, I immediately suffer 1d6 necrotic damage per spell slot level recovered"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]],
			additional : levels.map( function(n) {
				if (n < 8) return "";
				return Math.ceil(n/2) + " levels of spell slots";
			})
		},
		"subclassfeature17" : {
			name : "Vascular Corruption Aura",
			source : ["TDCS", 102],
			minlevel : 17,
			description : desc([
				"As an action, I bring forth a 30-ft radius magical aura that lasts for 1 minute",
				"Hostiles with blood that enter it or start their turn in it take 2d6 necrotic damage",
				"Hostiles with blood in the aura only regain half the HP they normally would."
			]),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]]
		}
	}
});
AddSubClass("barbarian", "juggernaut-tdcs", {
	regExpSearch : /juggernaut/i,
	subname : "Path of the Juggernaut",
	source : ["TDCS", 102],
	fullname : "Juggernaut",
	abilitySave : 1,
	features : {
		"subclassfeature3" : {
			name : "Thunderous Blows",
			source : ["TDCS", 102],
			minlevel : 3,
			description : desc([
				"While raging, when I damage a target with a melee attack, I can have it make a Str save",
				"If failed, I push the target 5 ft away from me and I can move into its previous position",
				"I can do this only once per turn; the save DC is 8 + my Prof Bonus + my Str mod"
			]),
			calcChanges : {
				atkAdd : ["if (isMeleeWeapon && (/\\brage\\b/i).test(WeaponText)) { fields.Description += (fields.Description ? '; ' : '') + 'Once per turn, target Str save or pushed 5 ft'; }; ", "If I include the word 'Rage' in a melee weapon's name or description, the description will show that I can use Thunderous Blows once per turn to push the target 5 ft."]
			}
		},
		"subclassfeature3.1" : {
			name : "Stance of the Mountain",
			source : ["TDCS", 102],
			minlevel : 3,
			description : desc([
				"I can no longer be knocked prone while raging unless I become unconscious"
			]),
			savetxt : { immune : ["prone (in rage)"] }
		},
		"subclassfeature6" : {
			name : "Demolishing Might",
			source : ["TDCS", 102],
			minlevel : 6,
			description : desc([
				"My melee attacks do double damage to objects and structures",
				"Against creatures of the construct type my melee attacks do an extra 1d8 damage"
			])
		},
		"subclassfeature10" : {
			name : "Overwhelming Cleave",
			source : ["TDCS", 102],
			minlevel : 10,
			description : desc([
				"As a bonus action after making a weapon attack while raging, I can do an extra attack",
				"This extra attack has to be against another target, within 5 ft of the original target"
			]),
			action : [["bonus action", " (after attack)"]]
		},
		"subclassfeature14" : {
			name : "Unstoppable",
			source : ["TDCS", 103],
			minlevel : 14,
			description : desc([
				"In rage, I'm immune to being frightened, paralyzed, stunned, or my speed being reduced",
				"Additionally, when frightened, paralyzed, or stunned, I can still enter my rage as normal",
				"After my rage is over, I suffer one level of exhaustion"
			]),
			savetxt : { immune : ["frightened (in rage)", "paralyzed (in rage)", "stunned (in rage)", "speed being reduced (in rage)"] }
		}
	}
});
AddSubClass("sorcerer", "runechild-tdcs", {
	regExpSearch : /^(?=.*rune)(?=.*child).*$/i,
	subname : "Runechild",
	source : ["TDCS", 103],
	fullname : "Runechild",
	features : {
		"subclassfeature1" : {
			name : "Essence Runes",
			source : ["TDCS", 103],
			minlevel : 1,
			description : desc([
				"I have a number of runes on my body which I can use to fuel my abilities if charged",
				"As a bonus action, I can spend sorcery points to charge an equal number of runes",
				"Every sorcery point I use for a class feature charges a rune as well at the end of the turn",
				"If I have no sorcery points and no charged runes, I can charge 1 rune as an action",
				"If I have 5+ charged runes, I emit bright light in 5 ft and dim light in another 5 ft",
				"All charged runes become inert after a long rest; Inert runes are invisible"
			]),
			action : [["bonus action", " (charge)"]],
			additional : levels.map( function(n) {
				return n + " rune" + (n > 1 ? "s" : "") + " on my body";
			}),
			usages : "reset after a ",
			usagescalc : "event.value = ''; event.target.setAction('Calculate', ''); event.target.submitName = '';",
			recovery : "long rest"
		},
		"subclassfeature1.1" : {
			name : "Glyphs of Aegis",
			source : ["TDCS", 103],
			minlevel : 1,
			description : desc([
				"As a reaction when I take damage, I can expend charged runes, rolling 1d6 for each",
				"The damage of the attack, hazard, or spell is reduced by the total of the roll"
			]),
			action : [["reaction", ""]],
			additional : "Any number of charged runes"
		},
		"subclassfeature6" : {
			name : "Warding Glyph",
			source : ["TDCS", 103],
			minlevel : 6,
			description : desc([
				"As an action, I can expend one charged rune to give an ally a protective ward for 1 hour",
				"The next time that ally takes damage, the ward goes off and reduces the damage by 1d6"
			]),
			action : [["action", ""]],
			additional : "1 charged rune"
		},
		"subclassfeature6.1" : {
			name : "Sigilic Augmentation",
			source : ["TDCS", 103],
			minlevel : 6,
			description : desc([
				"As a bonus action, I can expend a charged rune to boost myself until my next turn starts",
				"While boosted, I gain adv. with either my Strength, Dexterity, or Constitution checks",
				"I can maintain this benefit by expending a charged rune at the start of each of my turns"
			]),
			action : [["bonus action", ""]],
			additional : "1 charged rune"
		},
		"subclassfeature6.2" : {
			name : "Manifest Inscriptions",
			source : ["TDCS", 103],
			minlevel : 6,
			description : desc([
				"As an action, I can expend a charged rune to reveal hidden magical writing within 15 ft",
				"Magical marks, runes, wards, or glyphs light up with 5-ft radius dim light for 1 round"
			]),
			action : [["action", ""]],
			additional : "1 charged rune"
		},
		"subclassfeature14" : {
			name : "Runic Torrent",
			source : ["TDCS", 103],
			minlevel : 14,
			description : desc([
				"When I cast a spell, I can expend charged runes to have it ignore resistances/immunities",
				"The amount of charged runes expended has to be equal to the level of spell cast"
			]),
			additional : "Spell's level in charged runes"
		},
		"subclassfeature18" : {
			name : "Arcane Exemplar",
			source : ["TDCS", 103],
			minlevel : 18,
			description : desc([
				"As a bonus action, I can expend 6 or more charged runes to gain the following benefits:",
				" \u2022 I gain 40 ft fly speed, +2 to my spell save DC, and resistance to damage from spells",
				" \u2022 When I cast a 1st-level or higher spell, I heal a number of HP equal to the spell's level",
				"This lasts for 3 rounds, plus 1 round for each rune expended above 6",
				"When this ends, I can't move or take actions until after my next turn"
			]),
			action : [["bonus action", ""]],
			usages : 1,
			recovery: "long rest",
			additional : "6+ charged runes"
		}
	}
});
AddSubClass("monk", "way of the cobalt soul-tdcs", {
	regExpSearch : /^(?=.*\bcobalt)(?=.*\b(soul|spirit))((?=.*(warrior|monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
	subname : "Way of the Cobalt Soul",
	source : ["TDCS", 104],
	features : {
		"subclassfeature3" : {
			name : "Bonus Language",
			source : ["TDCS", 104],
			minlevel : 3,
			languageProfs : [1],
			description : " ",
			languageProfs : [1],
			additional : levels.map(function (n) {
				return n < 3 ? '' : "learn " + (n < 11 ? 1 : n < 17 ? 2 : 3) + " language" + (n < 11 ? "" : "s");
			}),
			extrachoices : ["extract aspects"], // so the level-dependent additional is updated
			choicesNotInMenu : true,
			extraname : "Way of the Cobalt Soul 3",
			"mystical erudition" : {
				name : "Mystical Erudition",
				source : ["TDCS", 104],
				description : desc([
					"I can spend 1 ki point to gain adv. on an Int (Arcana), Int (History) or Int (Religion) check"
				]),
				additional : "1 ki point"
			},
			"extract aspects" : {
				name : "Extract Aspects",
				source : ["TDCS", 104],
				description : desc([
					"If I hit a creature with 2 or more attacks in a round, I can use 1 ki point to make it save",
					"The target must make a Con save and if failed, I learn a number of its following aspects:",
					"AC, type, senses, highest save, lowest save, vulnerabilities, resistances, or immunities"
				]),
				additional : levels.map(function (n) {
					return n < 3 ? '' : "1 ki point; learn " + (n < 11 ? 2 : n < 17 ? 3 : 4) + " aspects";
				})
			},
			eval : "ClassFeatureOptions(['monk', 'subclassfeature3', 'mystical erudition', 'extra']); ClassFeatureOptions(['monk', 'subclassfeature3', 'extract aspects', 'extra']);",
			removeeval : "ClassFeatureOptions(['monk', 'subclassfeature3', 'mystical erudition', 'extra'], 'remove'); ClassFeatureOptions(['monk', 'subclassfeature3', 'extract aspects', 'extra'], 'remove');"
		},
		"subclassfeature6" : {
			name : "Honed Awareness",
			source : ["TDCS", 104],
			minlevel : 6,
			description : desc([
				"Each round I can take additional reactions (1 per trigger) equal to my Int mod (min 1)",
				"I need to spend 1 ki point for each reaction beyond the first per round"
			]),
			usages : "Int mod per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "round",
			additional : "1 ki point",
			extraname : "Way of the Cobalt Soul 6",
			"extort truth" : {
				name : "Extort Truth",
				source : ["TDCS", 104],
				description : desc([
					"If I hit a creature with 2 or more attacks in a round, I can use 2 ki points to learn about it",
					"It must do a Cha save or it can't lie for 1 min; I can make these attacks deal no damage",
					"I know if it failed the save; The target is aware of the effect and can give evasive answers"
				]),
				additional : "2 ki points"
			},
			"mind of mercury" : {
				name : "Mind of Mercury",
				source : ["TDCS", 104],
				description : desc([
					"I can spend 1 ki point to gain advantage on an Intelligence (Investigation) check"
				]),
				additional : "1 ki point"
			},
			eval : "ClassFeatureOptions(['monk', 'subclassfeature6', 'extort truth', 'extra']); ClassFeatureOptions(['monk', 'subclassfeature6', 'mind of mercury', 'extra']);",
			removeeval : "ClassFeatureOptions(['monk', 'subclassfeature6', 'extort truth', 'extra'], 'remove'); ClassFeatureOptions(['monk', 'subclassfeature6', 'mind of mercury', 'extra'], 'remove');"
		},
		"subclassfeature11" : {
			name : "Preternatural Counter",
			source : ["TDCS", 104],
			minlevel : 11,
			description : "\n   " + "As a reaction when an attack misses me, I can make a melee attack against the attacker",
			action : [["reaction", ""]],
			eval : "processLanguages(true, 'Monk (Way of the Cobalt Soul 11)', [1]);",
			removeeval : "processLanguages(false, 'Monk (Way of the Cobalt Soul 11)', [1]);",
			changeeval : "if (newClassLvl.monk >= 17 && oldClassLvl.monk < 17) { ClassFeatureOptions(['monk', 'subclassfeature11', 'debilitating barrage', 'extra']); processLanguages(true, 'Monk (Way of the Cobalt Soul 17)', [1]); } else if (newClassLvl.monk < 17 && oldClassLvl.monk >= 17) { ClassFeatureOptions(['monk', 'subclassfeature11', 'debilitating barrage', 'extra'], 'remove'); processLanguages(false, 'Monk (Way of the Cobalt Soul 17)', [1]); };",
			extraname : "Way of the Cobalt Soul 17",
			"debilitating barrage" : {
				name : "Debilitating Barrage",
				source : ["TDCS", 104],
				description : desc([
					"If I hit a creature with 3 or more attacks in a round, I can use 3 ki points to debilitate it",
					"It gets disadv. on attacks until the start of my next turn and it must make a Con save",
					"If failed, it has vulnerability against the first attack within 1 min of a chosen damage type",
					"Targets with resistance or immunity to the chosen damage type don't suffer vulnerability"
				]),
				additional : "3 ki points"
			}
		}
	}
});

// Add backgrounds
AddBackgroundVariant("criminal", "clasp member", {
	regExpSearch : /^(?=.*clasp)(?=.*member).*$/i,
	name : "Clasp Member",
	source : ["TDCS", 105],
	skills : ["Deception"],
	skillstxt : "Deception and either Sleight of Hand or Stealth",
	gold : 10,
	equipright : [
		["Dark, common clothes with hood", "", 3],
		["Thieves' tools, forgery kit, or disguise kit", "", ""],
		["Belt pouch (with coins)", "", 1]
	],
	feature : "A Favor in Turn",
	languageProfs : ["Thieves' Cant"],
	toolProfs : [["Thieves' tools, forgery kit, or disguise kit", 1]],
	extra : ""
});
AddBackgroundVariant("sage", "lyceum student", {
	regExpSearch : /^(?=.*lyceum)(?=.*(student|scholar|researcher|archivist)).*$/i,
	name : "Lyceum Student",
	source : ["TDCS", 106],
	skills : "",
	skillstxt : "Choose two from Arcana, History, and Persuasion",
	gold : 10,
	equipleft : [
		["Ink, 1 ounce bottle of", 1, ""],
		["Ink pen (quill)", "", ""],
		["Parchment, sheets of", 10, ""],
		["Small knife", "", 0.5]
	],
	equipright : [
		["Fine clothes", "", 5],
		["Student uniform", "", 3],
		["Belt pouch (with coins)", "", 1]
	],
	feature : "Student Privilege",
	languageProfs : [2],
	extra : ""
});
AddBackgroundVariant("outlander", "ashari", {
	regExpSearch : /ashari/i,
	name : "Ashari",
	source : ["TDCS", 107],
	skills : ["Nature"],
	skillstxt : "Nature and either Arcana or Survival",
	equipright : [
		["Traveler's clothes", "", 4],
		["Staff", "", 4],
		["Shortbow with 20 arrows or a hunting trap", "", ""],
		["Belt pouch (with coins)", "", 1]
	],
	feature : "Elemental Harmony",
	languageProfs : [1],
	toolProfs : ["Herbalism Kit"],
	extra : ""
});
AddBackgroundVariant("acolyte", "recovered cultist", {
	regExpSearch : /^(?=.*recovered)(?=.*cultist).*$/i,
	name : "Recovered Cultist",
	source : ["TDCS", 107],
	skills : ["Deception", "Religion"],
	equipleft : [
		["Vestments", "", 4]
	],
	equipright : [
		["Common clothes", "", 3],
		["Holy symbol of previous cult", "", 1],
		["Belt pouch (with coins)", "", 1],
	],
	feature : "Wicked Awareness",
	languageProfs : [1]
});

// Add background features
BackgroundFeatureList["a favor in turn"] = {
	description : "I can call in a favor from my criminal organization, such as money, muscle or assistance escaping legal trouble. A request can be no longer than 20 words and is passed up the chain to an undisclosed Spireling for approval. However, they will ask me to repay this favor in some equal way, either now or later, often with intended immediacy.",
	source : ["TDCS", 105]
};
BackgroundFeatureList["student privilege"] = {
	description : "Thanks to my academic credentials, I can access areas of schools and similar institutions that are not open to the general public. This allows me to use any tool kits and relative inexpensive supplies these establishments have, although I cannot remove them from the premises. Staff supervision may be required.",
	source : ["TDCS", 106]
};
BackgroundFeatureList["elemental harmony"] = {
	description : "I am in tune with elemental energy and can produce a small magical effect of the type associated with my chosen Ashari tribe, such as producing a puff of wind, a small burst of flame, a palm-sized rock that lasts for a minute, or enough hot or cold water to fill a small glass.",
	source : ["TDCS", 107]
};
BackgroundFeatureList["wicked awareness"] = {
	description : "My time worshipping in secrecy and shadow at the alter of malevolent forces has left me with insight to how those operate. I can usually spot hidden signs, messages, and signals left in populated places by cults and similar organizations, and have advantage when searching for such details.",
	source : ["TDCS", 108]
};

// Add feats
FeatsList["cruel-tdcs"] = {
	name : "Cruel",
	source : ["TDCS", 108],
	description : "I have a number of cruelty points equal to my Proficiency Bonus, which replenish on a long rest. I can spend these points to: once per turn, deal an additional 1d6 attack damage, regain 1d6 HP when I score a critical hit, or to gain advantage on an Intimidation check.",
	usagescalc : "event.value = How('Proficiency Bonus');",
	recovery : "long rest"
};
FeatsList["dual-focused-tdcs"] = {
	name : "Dual-Focused",
	source : ["TDCS", 108],
	description : "As an action, I can concentrate on 2 spells. Con save (DC 10 + rounds concentrating) at the end of each turn to keep concentration on 2 spells or lose both. When taking damage, the DC to keep concentration is DC 10 + both spells' levels or half damage, whichever is higher.",
	action : [["action", ""]],
	prerequisite : "The ability to cast at least one spell",
	prereqeval : "CurrentSpells.toSource() !== '({})'"
};
FeatsList["flash recall-tdcs"] = {
	name : "Flash Recall",
	source : ["TDCS", 109],
	description : "As an action, I can swap one prepared spell from my class list or spellbook to another of the same or lower spell level. I can do this only once per short rest.",
	action : [["action", ""]],
	usages : 1,
	recovery : "short rest",
	prerequisite : "The ability to prepare spells and cast at least one spell",
	prereqeval : "CurrentSpells.toSource() !== '({})'"
};
FeatsList["gambler-tdcs"] = {
	name : "Gambler",
	source : ["TDCS", 109],
	description : "I have a reputation as a card shark in some circles. I gain adv. on both Deception checks to bluff at games of chance and Persuasion checks to invite to games. I can re-roll my result on the Carousing table (once per day). I gain proficiency with two gaming sets. [+1 Cha]",
	improvements : "Gambler (feat): +1 Charisma;",
	scores : [0, 0, 0, 0, 0, 1],
	toolProfs : [["Gaming set", 2]]
};
FeatsList["mending affinity-tdcs"] = {
	name : "Mending Affinity",
	source : ["TDCS", 109],
	description : "Whenever I regain HP by means of a spell, potion, or class ability, I regain additional HP equal to my Proficiency Bonus. When another stabilizes my with the use of a healer's kit, I also heal a number of HP equal to my Proficiency Bonus. [+1 Constitution]",
	improvements : "Mending Affinity (feat): +1 Constitution;",
	scores : [0, 0, 1, 0, 0, 0]
};
FeatsList["mystic conflux-tdcs"] = {
	name : "Mystic Conflux",
	source : ["TDCS", 109],
	description : "I have advantage on Intelligence (Arcana) checks to determine the nature of a magical object or device. I can attune to a maximum of four magical items, rather than three; other attunement limitations still apply."
};
FeatsList["rapid drinker-tdcs"] = {
	name : "Rapid Drinker",
	source : ["TDCS", 109],
	description : "I can drink a potion as a bonus action rather than an action. I have advantage on saving throws triggered by drinking an alcoholic or dangerous substance.",
	action : [["bonus action", " (potion)"]],
	savetxt : { adv_vs : ["drinking a substance"] }
};
FeatsList["spelldriver-tdcs"] = {
	name : "Spelldriver",
	source : ["TDCS", 109],
	description : "I am no longer limited to casting only one non-cantrip spell in a turn. However, if I cast multiple non-cantrip spells in a turn, only one of them can be of 3rd level or higher.",
	prerequisite : "Character level 8th or higher and the ability to cast at least one spell",
	prereqeval : "CurrentSpells.toSource() !== '({})' && What('Character Level') >= 8"
};
FeatsList["thrown arms master-tdcs"] = {
	name : "Thrown Arms Master",
	source : ["TDCS", 109],
	description : "I can throw all melee weapons. One-handed weapons have a range of 20/60 ft, while two-handed weapons have 15/30 ft. Weapons with the thrown property increase range by +20/+40 ft. If I miss with a thrown light weapon, it boomerangs back. [+1 Str or Dex]",
	improvements : "Thrown Arms Master (feat): +1 Strength or Dexterity;",
	calcChanges : {
		atkAdd : ["if (theWea && isMeleeWeapon && (/simple|martial/i).test(theWea.type)) { if ((/\\d+\\/\\d+/i).test(fields.Range)) { var r_one = fields.Range.replace(/.*?(\\d+)\\/.*/, '$1'); var r_two =fields.Range.replace(/.*\\d+\\/(\\d+).*/, '$1'); fields.Range = fields.Range.replace(r_one+'/', (Number(r_one) + 20)+'/').replace('/'+r_two, '/'+(Number(r_two) + 40)); } else { fields.Range += (/((^|[^+-]\\b)2|\\btwo).?hand(ed)?s?\\b/i).test(theWea.description) ? ', 15/30 ft' : ', 20/60 ft'; }; }; ",
		"I can throw all simple and martial melee weapons, even if they don't have the thrown property. They gain 20/60 ft range (or 15/30 ft if two-handed).\n \u2022 My thrown weapons have an extra +20/+40 ft range."]
	}
};
