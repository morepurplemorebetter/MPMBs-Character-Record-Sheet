/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Class
	Effect:     This script adds the class called "Cardcaster" with its 5 subclasses and its unique spellcasting system
				The subclasses include "Knight of Swords", "Page of Wands", and "Queen of Cups" from EN5ider 106
				And also include "King of Pentacles" and "Jack of Beasts" from EN5ider 110

				This class has been made by EN World EN5ider

				This class can be found here: https://www.patreon.com/posts/6947104

				Please support the creators of this content on their Patreon: https://www.patreon.com/ensider

	Code by:	MorePurpleMoreBetter
	Date:		2018-08-13 (sheet v13.0.0beta4)

	As no multiclassing rules are given in the source, the ones here are an interpretation by MPMB.

	Note that because the spells available to this class very so much during play, the character sheet will generate a spell sheet with all possible spells available through the cards. This way the spell sheet is a reference during play and not a list of available spells at any one time.
*/
var iFileName = "Cardcaster [EN World EN5ider, transcribed by MPMB].js";
RequiredSheetVersion(13);

// The cardcaster class (EN5ider 106)
SourceList["EN5:106"] = {
	name : "EN World EN5ider [106] Cardcaster",
	abbreviation : "EN5:106",
	group : "EN World EN5ider",
	url : "https://www.patreon.com/posts/6947104",
	date : "2016/10/07"
};

//first make the sheet know which spells are cardcaster spells (i.e. spells found on cards)
[
	// 0 - The fool
	"detect poison and disease", "expeditious retreat", "tasha's hideous laughter", "mage armor",
	// I - The Magician
	"burning hands", "create or destroy water", "detect magic", "tenser's floating disk", "unseen servant", "silent image",
	// II - The High Priestess
	"charm person", "fog cloud", "identify", "sleep",
	// II - The Empress
	"animal friendship", "entangle", "goodberry", "speak with animals",
	// IV - The Emperor
	"detect evil and good", "hold person", "command", "protection from evil and good",
	// V - The Hierophant
	"bane", "bless", "sanctuary", "shield of faith",
	// VI - The Lovers
	"detect thoughts", "mirror image", "suggestion", "zone of truth",
	// VII - The Chariot
	"blur", "enlarge/reduce", "magic weapon", "spiritual weapon",
	// VIII - Justice
	"bestow curse", "clairvoyance", "lightning bolt", "protection from energy",
	// IX - The Hermit
	"counterspell", "dispel magic", "remove curse", "leomund's tiny hut",
	// X - Wheel of Fortune
	"confusion", "death ward", "divination", "freedom of movement",
	// XI - Strength
	"otiluke's resilient sphere", "stone shape", "stoneskin",
	// XII - The Hanged Man
	"dominate beast", "dominate person", "geas", "planar binding",
	// XIII - Death
	"animate dead", "cloudkill", "contagion", "insect plague",
	// XIV - Temperance
	"contingency", "globe of invulnerability", "true seeing",
	// XV - The Devil
	"eyebite", "forcecage", "mass suggestion",
	// XVI - The Tower
	"disintegrate", "divine word", "mordenkainen's magnificent mansion", "reverse gravity",
	// XVII - The Star
	"conjure celestial", "plane shift", "prismatic spray", "regenerate",
	// XVIII - The Moon
	"antipathy/sympathy", "feeblemind", "maze", "mind blank",
	// XIX - The Sun
	"demiplane", "holy aura", "incendiary cloud", "sunburst",
	// XX - Judgement
	"foresight", "imprisonment", "mass heal", "meteor swarm", "power word kill",
	// XXI - The World
	"time stop", "true polymorph", "true resurrection", "wish"
].forEach( function (s) {
	if(SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("cardcaster") === -1) SpellsList[s].classes.push("cardcaster");
});

// Create the shadowcaster class
ClassList["cardcaster"] = {
	regExpSearch : /^(?=.*card)(?=.*caster).*$/i,
	name : "Cardcaster",
	source : ["EN5:106", 2],
	primaryAbility : "\n \u2022 Cardcaster: Intelligence;",
	abilitySave : 4,
	prereqs : "\n \u2022 Cardcaster: Intelligence 13;",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 6,
	saves : ["Int", "Wis"],
	skills : ["\n\n" + toUni("Cardcaster") + ": Choose two from Arcana, Deception,, History, Insight,  Investigation, Nature, and Religion."],
	armor : [
		[false, false, false, false]
	],
	weapons : [
		[false, false, ["dagger", "dart", "light crossbow", "quarterstaff", "sling"]]
	],
	equipment : "Cardcaster starting equipment:\n \u2022 A quarterstaff, -or- a dagger, -or-  a longsword (if proficient);\n \u2022 A component pouch, -or- an arcane focus, -or- a holy symbol;\n \u2022 A scholar's pack -or- a priest's pack;\n \u2022 Leather armor;\n \u2022 A set of tarot cards.\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Focus Card", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : "cardcaster0",
	spellcastingKnown : {
		spells : "list"
	},
	majorArcana1 : "Cardcaster's Major Arcana (Cardcaster 1, EN5:106 4) [cards 0-XI]" +
		"\r0 - The Fool" + desc(["\u2022 Detect Poison and Disease\t\u2022 Expeditious retreat","\u2022 Tasha's Hideous Laughter\t\u2022 Mage Armor"]) +
		"\r\rI - The Magician" + desc(["\u2022 Create or Destroy Water\t\u2022 Burning Hands\t\u2022 Detect Magic", "\u2022 Tenser's Floating Disk\t\u2022 Silent Image\t\u2022 Unseen Servant"]) +
		"\r\rII - The High Priestess" + desc(["\u2022 Charm Person\t\t\u2022 Fog Cloud", "\u2022 Identify\t\t\t\u2022 Sleep"]) +
		"\r\rIII - The Empress" + desc(["\u2022 Animal Friendship\t\t\u2022 Entangle", "\u2022 Goodberry\t\t\u2022 Speak with Animals"]) +
		"\r\rIV - The Emperor" + desc(["\u2022 Detect Evil and Good\t\u2022 Command", "\u2022 Protection From Evil and Good\t\u2022 Hold Person"]) +
		"\r\rV - The Hierophant" + desc(["\u2022 Bane\t\t\t\u2022 Bless", "\u2022 Sanctuary\t\t\u2022 Shield of Faith"]) +
		"\r\rVI - The Lovers" + desc(["\u2022 Detect Thoughts\t\t\u2022 Mirror Image", "\u2022 Suggestion\t\t\u2022 Zone of Truth"]) +
		"\r\rVII - The Chariot" + desc(["\u2022 Blur\t\t\t\u2022 Enlarge/Reduce", "\u2022 Magic Weapon\t\t\u2022 Spiritual Weapon"]) +
		"\r\rVIII - Justice" + desc(["\u2022 Bestow Curse\t\t\u2022 Clairvoyance", "\u2022 Lightning Bolt\t\t\u2022 Protection From Energy"]) +
		"\r\rIX - The Hermit" + desc(["\u2022 Counterspell\t\t\u2022 Dispel Magic", "\u2022 Leomund's Tiny Hut\t" + (typePF ? "" : "\t") + "\u2022 Remove Curse"]) +
		"\r\rX - Wheel of Fortune " + desc(["\u2022 Confusion\t\t\u2022 Death Ward", "\u2022 Divination\t\t\u2022 Freedom of Movement"]) +
		"\r\rXI - Strength" + desc(["\u2022 Otiluke's Resilient Sphere\t\u2022 Stone Shape\t\u2022 Stoneskin"]),
	majorArcana2 : "Cardcaster's Major Arcana (Cardcaster 1, EN5:106 5) [cards XII-XXI]" +
		"\rXII - The Hanged Man" + desc(["\u2022 Dominate Beast\t\t\u2022 Dominate Person", "\u2022 Geas\t\t\t\u2022 Planar Binding"]) +
		"\r\rXIII - Death" + desc(["\u2022 Animate Dead\t\t\u2022 Cloudkill", "\u2022 Contagion\t\t\u2022 Insect Plague"]) +
		"\r\rXIV - Temperance" + desc(["\u2022 Globe of Invulnerability\t\u2022 Contingency\t\u2022 True Seeing", "If I play Temperance or the Devil, I can't use either again until I finish a long rest"]) +
		"\r\rXV - The Devil" + desc(["\u2022 Eyebite\t\t\t\u2022 Forcecage\t" + (typePF ? "" : "\t") + "\u2022 Mass Suggestion", "If I play Temperance or the Devil, I can't use either again until I finish a long rest"]) +
		"\r\rXVI - The Tower" + desc(["\u2022 Disintegrate\t\t\u2022 Divine Word", "\u2022 Reverse Gravity\t\t\u2022 Mordenkainen's Magnificent Mansion", "If I play the Tower or the Star, I can't use either again until I finish a long rest"]) +
		"\r\rXVII - The Star" + desc(["\u2022 Conjure Celestial\t\t\u2022 Plane Shift", "\u2022 Prismatic Spray\t\t\u2022 Regenerate", "If I play the Tower or the Star, I can't use either again until I finish a long rest"]) +
		"\r\rXVIII - The Moon" + desc(["\u2022 Antipathy/Sympathy\t\u2022 Feeblemind", "\u2022 Maze\t\t\t\u2022 Mind Blank", "If I play the Moon or the Sun, I can't use either again until I finish a long rest"]) +
		"\r\rXIX - The Sun" + desc(["\u2022 Demiplane\t\t\u2022 Holy Aura", "\u2022 Incendiary Cloud\t\t\u2022 Sunburst", "If I play the Moon or the Sun, I can't use either again until I finish a long rest"]) +
		"\r\rXX - Judgement" + desc(["\u2022 Foresight\t\t\u2022 Imprisonment\t\u2022 Mass Heal", "\u2022 Meteor Swarm\t\t\u2022 Power Word Kill", "If I play Judgement or the World, I can't use either again until I finish a long rest"]) +
		"\r\rXXI - The World" + desc(["\u2022 Time Stop\t\t\u2022 True Polymorph", "\u2022 True Resurrection\t\t\u2022 Wish", "If I play Judgement or the World, I can't use either again until I finish a long rest"]),
	addMajorArcana : function() {
		AddToNotes(ClassList.cardcaster.majorArcana1, 'Major Arcana cards 0-XI of the Cardcaster class');
		AddToNotes(ClassList.cardcaster.majorArcana2, 'Major Arcana cards XII-XXI of the Cardcaster class');
	},
	removeMajorArcana : function() {
		AddToNotes('', '', ClassList.cardcaster.majorArcana1);
		AddToNotes('', '', ClassList.cardcaster.majorArcana2);
	},
	features : {
		"cards of power" : {
			name : "Cards of Power",
			source : ["EN5:106", 2],
			minlevel : 1,
			description : desc([
				"I can cast spells with my deck of tarot cards, using Intelligence as my spellcasting ability",
				"I can use an arcane focus, holy symbol, or tarot card as spellcasting focus"
			]),
			additional : levels.map(function(n) {
				var majorArcana = n < 3 ? 'V' : n < 5 ? 'VII' : n < 7 ? 'IX' : n < 9 ? 'XI' : n < 11 ? 'XIII' : n < 13 ? 'XV' : n < 15 ? 'XVII' : n < 17 ? 'XIX' : 'XXI';
				var handSize = n < 3 ? 2 : n < 6 ? 3 : n < 11 ? 4 : n < 15 ? 5 : n < 19 ? 6 : 7;
				return "deck: cards 0-" + majorArcana + "; full hand: " + handSize + " cards";
			}),
			extraname : "Cardcaster 1",
			"card magic" : {
				name : "Card Magic",
				source : ["EN5:106", 2],
				description : desc([
					"I have a special deck of tarot cards with each card containing a number of spells",
					"See the 'Notes' page for a listing of all the cards and the spells they contain",
					"I can play a card from my hand, casting one of the spells of my choice from the card",
					"Playing a card takes the same amount of time as casting the chosen spell would take",
					"I have to provide components as normal; Once I play a card, it is moved to the discard pile",
					"At the end of my turn, when I have less than a full hand, I draw cards until my hand is full",
					"After a long rest, I can discard any cards in my hand and draw new ones up to a full hand",
					"Before drawing new cards like this, I first have to shuffle the discard pile and deck together",
					"The cards in my deck, the size of a full hand, and the amount of plays depend on my level",
					"Some cards have restrictions on playing them after another card",
					"I can discard restricted cards at any time and then draw a replacement card"
				])
			},
			"ritual casting" : {
				name : "Ritual Casting",
				source : ["EN5:106", 3],
				minlevel : 1,
				description : desc([
					"I can cast spells on the cards in my hand as rituals if they have the ritual tag",
					"Doing so doesn't count as playing the card and I don't have to discard the card",
					"In addition, I can memorize any divination spells with the ritual tag I come across",
					"Memorizing a spell takes 2 hours and 50 gp per level of the spell",
					"Once memorized, I can cast the divination ritual spell as a ritual at any time"
				])
			},
			eval : "if (CurrentSpells.cardcaster) { CurrentSpells.cardcaster.typeList = 2; }; ClassFeatureOptions(['cardcaster', 'cards of power', 'card magic', 'extra']); try { ClassList.cardcaster.addMajorArcana(); } catch (er) {}; ClassFeatureOptions(['cardcaster', 'cards of power', 'ritual casting', 'extra']); CurrentSpells['cardcaster-divination rituals'] = {name : 'Divination Rituals', ability : 4, list : {school : ['Div'], ritual : true}, known : {spells : 'book'}}; SetStringifieds('spells');", // Select the 'All spells known regardless of level' checkbox by default
			removeeval : "ClassFeatureOptions(['cardcaster', 'cards of power', 'card magic', 'extra'], 'remove'); try { ClassList.cardcaster.removeMajorArcana(); } catch (er) {}; ClassFeatureOptions(['cardcaster', 'cards of power', 'ritual casting', 'extra'], 'remove'); delete CurrentSpells['cardcaster-divination rituals']; SetStringifieds('spells');"
			//eval : "if (CurrentSpells.cardcaster) { CurrentSpells.cardcaster.typeList = 2; }; ClassFeatureOptions(['cardcaster', 'cards of power', 'card magic', 'extra']); try { AddToNotes(ClassList.cardcaster.features['cards of power'].majorArcana1, 'Major Arcana cards 0-XI of the Cardcaster class'); AddToNotes(ClassList.cardcaster.features['cards of power'].majorArcana2, 'Major Arcana cards XII-XXI of the Cardcaster class'); } catch (er) {}; ClassFeatureOptions(['cardcaster', 'cards of power', 'ritual casting', 'extra']); CurrentSpells['cardcaster-divination rituals'] = {name : 'Divination Rituals', ability : 4, list : {school : ['Div'], ritual : true}, known : {spells : 'book'}}; SetStringifieds('spells');", // Select the 'All spells known regardless of level' checkbox by default
			//removeeval : "ClassFeatureOptions(['cardcaster', 'cards of power', 'card magic', 'extra'], 'remove'); try {AddToNotes('', '', ClassList.cardcaster.features['cards of power'].majorArcana1); AddToNotes('', '', ClassList.cardcaster.features['cards of power'].majorArcana2);} catch (er) {}; ClassFeatureOptions(['cardcaster', 'cards of power', 'ritual casting', 'extra'], 'remove'); delete CurrentSpells['cardcaster-divination rituals']; SetStringifieds('spells');"
		},
		"major arcana plays" : {
			name : "Major Arcana Plays",
			source : ["EN5:106", 2],
			minlevel : 1,
			description : desc([
				"I can play a card from my hand only a limited number of times per long rest"
			]),
			usages : levels.map(function(n) {
				return n < 2 ? 2 : n < 3 ? 3 : n < 4 ? 4 : n < 6 ? 5 : n < 7 ? 6 : n < 10 ? 7 : 8;
			}),
			recovery : "long rest"
		},
		"subclassfeature1" : {
			name : "Focus Card",
			source : ["EN5:106", 4],
			minlevel : 1,
			description : desc([
				"Choose your Focus Card of the minor arcana and put it in the \"Class\" field",
				"Choose either the Knight of Swords, Page of Wands, or Queen of Cups"
			])
		},
		"arcana surge" : {
			name : "Arcana Surge",
			source : ["EN5:106", 4],
			minlevel : 3,
			description : desc([
				"Spells I cast through tarot cards count as being cast with a higher level spell slot"
			]),
			additional : levels.map(function(n) {
				return n < 3 ? "" : (n < 5 ? '2nd' : n < 7 ? '3rd' : n < 9 ? '4th' : '5th') + "-level spell slot";
			})
		},
		"mulligan" : {
			name : "Mulligan",
			source : ["EN5:106", 4],
			minlevel : 11,
			description : desc([
				"Once per day after finishing a short rest, I can discard as many cards as I want",
				"I then draw new cards again until I have a full hand"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"card mastery" : {
			name : "Card Mastery",
			source : ["EN5:106", 4],
			minlevel : 18,
			description : desc([
				"By spending 8 hours in contemplation, I can select one major arcana card from 0-V",
				"The selected card is always in my hand and doesn't count towards a full hand",
				"I can play the card as often as I like without expending a Major Arcana Play"
			])
		},
		"signature card" : {
			name : "Signature Card",
			source : ["EN5:106", 4],
			minlevel : 20,
			description : desc([
				'Choose a Signature Card using the "Choose Feature" button above',
				"The selected card is always in my hand and doesn't count towards a full hand",
				"I can play this card twice per short rest without expending a Major Arcana Play",
				"However, doing so doesn't benefit from Arcana Surge"
			]),
			usages : 2,
			recovery : "short rest",
			choices : ["VI - The Lovers", "VII - The Chariot", "VIII - Justice", "IX - The Hermit"],
			"vi - the lovers" : {
				name : "Signature Card: The Lovers",
				description : desc([
					"The Lovers card is always in my hand and doesn't count towards a full hand",
					"I can play this card twice per short rest without expending a Major Arcana Play",
					"However, doing so doesn't benefit from Arcana Surge"
				])
			},
			"vii - the chariot" : {
				name : "Signature Card: The Chariot",
				description : desc([
					"The Chariot card is always in my hand and doesn't count towards a full hand",
					"I can play this card twice per short rest without expending a Major Arcana Play",
					"However, doing so doesn't benefit from Arcana Surge"
				])
			},
			"viii - justice" : {
				name : "Signature Card: Justice",
				description : desc([
					"The card Justice is always in my hand and doesn't count towards a full hand",
					"I can play this card twice per short rest without expending a Major Arcana Play",
					"However, doing so doesn't benefit from Arcana Surge"
				])
			},
			"ix - the hermit" : {
				name : "Signature Card: The Hermit",
				description : desc([
					"The Hermit card is always in my hand and doesn't count towards a full hand",
					"I can play this card twice per short rest without expending a Major Arcana Play",
					"However, doing so doesn't benefit from Arcana Surge"
				])
			}
		}
	}
};

// Add the subclasses
AddSubClass("cardcaster", "knight of swords", {
	regExpSearch : /^(?=.*card)(?=.*caster)(?=.*knight)(?=.*sword).*$/i,
	subname : "Knight of Swords",
	source : ["EN5:106", 6],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	die : 8,
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiencies \u0026 Cantrips",
			source : ["EN5:106", 6],
			minlevel : 1,
			description : desc([
				"I know the Mage Hand and Sacred Flame cantrips",
				"I gain proficiency with short- \u0026 longswords, rapiers, light \u0026 medium armor, and shields"
			]),
			weapons : [false, false, ["shortsword", "longsword", "rapier"]],
			armor : [true, true, false, true],
			spellcastingBonus : {
				name : "Knight of Swords",
				spells : ["mage hand", "sacred flame"],
				selection : ["mage hand", "sacred flame"],
				times : 2
			}
		},
		"subclassfeature1.1" : {
			name : "Warrior's Fortitude",
			source : ["EN5:106", 6],
			minlevel : 1,
			description : "\n   " + "My Hit Dice from the cardcaster class increase to d8s"
		},
		"subclassfeature2" : {
			name : "Resounding Charge",
			source : ["EN5:106", 6],
			minlevel : 2,
			description : desc([
				"As a bonus action, I call up the wind to speed my way until the end of my next turn",
				"While this lasts, my movement doesn't provoke opportunity attacks",
				"Also, any hostile creature I become adjacent to must succeed on a Str save or fall prone"
			]),
			action : ["bonus action", ""],
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature10" : {
			name : "Mark of Fate",
			source : ["EN5:106", 6],
			minlevel : 10,
			description : desc([
				"As a bonus action, I can select a creature I can see within 60 ft; This lasts for 1 minute",
				"Whenever it takes damage while this lasts, it takes extra damage equal to my Int mod"
			]),
			action : ["bonus action", ""],
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Fatesever",
			source : ["EN5:106", 6],
			minlevel : 14,
			description : desc([
				"When I hit with a melee weapon attack, I can add my level to the damage",
				"I regain a use of Fatesever whenever I'm hit by a melee weapon attack"
			]),
			usages : 1,
			recovery : "long rest",
			additional : levels.map(function(n) {
				return n < 14 ? "" : "+" + n + " damage";
			}),
			calcChanges : {
				atkAdd : ["if (classes.known.cardcaster && classes.known.cardcaster.level > 13 && isMeleeWeapon) {fields.Description += (fields.Description ? '; ' : '') + 'Once per long rest +' + classes.known.cardcaster.level + ' damage'; }; ", "Once per long rest, I can have one of my melee weapon attacks that hit do extra damage equal to my cardcaster level."]
			}
		},
		"subclassfeature14.1" : {
			name : "Bonus Proficiencies",
			source : ["EN5:106", 6],
			minlevel : 14,
			description : "\n   " + "I gain proficiency with heavy armor, and light and martial weapons",
			armor : [false, false, true, false],
			weapons : [true, true]
		}
	}
});
AddSubClass("cardcaster", "page of wands", {
	regExpSearch : /^(?=.*card)(?=.*caster)(?=.*page)(?=.*wands).*$/i,
	subname : "Page of Wands",
	source : ["EN5:106", 6],
	features : {
		"subclassfeature1" : {
			name : "Cantrips",
			source : ["EN5:106", 6],
			minlevel : 1,
			description : "\n   " + "I know the Minor Illusion and Produce Flames cantrips",
			spellcastingBonus : {
				name : "Page of Wands",
				spells : ["minor illusion", "produce flames"],
				selection : ["minor illusion", "produce flames"],
				times : 2
			}
		},
		"subclassfeature1.1" : {
			name : "Seeds of Possibility",
			source : ["EN5:106", 6],
			minlevel : 1,
			description : desc([
				"After finishing a short rest, I can choose a card from the discard pile, if between 0-XIII",
				"I add it to my hand and can play it once without using a major arcana play"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature2" : {
			name : "Sprout of Curiosity",
			source : ["EN5:106", 6],
			minlevel : 2,
			description : "\n   " + "Before I draw cards after a long rest, I select one card from my deck to add to my hand"
		},
		"subclassfeature6" : {
			name : "Backburn",
			source : ["EN5:106", 7],
			minlevel : 6,
			description : desc([
				"After I finish a short rest, I can put any 0-XIII cards from my hand back into the deck",
				"I then discard the rest of my hand and shuffle the deck before drawing a new full hand"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature10" : {
			name : "Bloom of Revelation",
			source : ["EN5:106", 7],
			minlevel : 10,
			description : desc([
				"As an action, I can beseech the tarot to reveal themselves and play a card of my choice",
				"If I succeed, I can play any card of any tier, without restrictions or using an arcana play",
				"If the card is not part of my deck, I do not put it on the discard pile",
				"If I succeed, I can't use this feature again for 7 days"
			]),
			action : ["action", ""],
			usages : 1,
			recovery : "long rest",
			additional : levels.map(function (n) {
				return n < 10 ? "" : (n < 20 ? n : 100) + "% chance";
			})
		},
		"subclassfeature14" : {
			name : "Fruit of Knowledge",
			source : ["EN5:106", 7],
			minlevel : 14,
			description : desc([
				"Whenever I draw cards from the deck, I draw twice as many and keep the ones I want",
				"The ones I don't want go back into my deck and I then shuffle my deck"
			])
		}
	}
});
AddSubClass("cardcaster", "queen of cups", {
	regExpSearch : /^(?=.*card)(?=.*caster)(?=.*queen)(?=.*cups).*$/i,
	subname : "Queen of Cups",
	source : ["EN5:106", 7],
	features : {
		"subclassfeature1" : {
			name : "Sincerity",
			source : ["EN5:106", 7],
			minlevel : 1,
			description : desc([
				"I know the Friends, Message, and Ray of Frost cantrips",
				"I gain proficiency with the Insight and Persuasion skills"
			]),
			spellcastingBonus : {
				name : "Queen of Cups",
				spells : ["friends", "message", "ray of frost"],
				selection : ["friends", "message", "ray of frost"],
				times : 3
			},
			skills : ["Insight", "Persuasion"],
			skillstxt : "\n\n" + toUni("Cardcaster (Queen of Cups)") + ": Insight and Persuasion."
		},
		"subclassfeature2" : {
			name : "Toast to Friendship",
			source : ["EN5:106", 7],
			minlevel : 2,
			description : desc([
				"When I activate a card targeting one or more friendly creature, we gain temp HP",
				"Only one of the targets gets temp HP; It is equal to my cardcaster level + my Int mod"
			]),
			additional : levels.map(function (n) {
				return n < 2 ? "" : "temp HP: " + n + " + Int mod";
			})
		},
		"subclassfeature6" : {
			name : "Floweth Over",
			source : ["EN5:106", 7],
			minlevel : 6,
			description : desc([
				"When I activate a card to cast a spell with a range of self, I can instead target another",
				"I choose a target in 30 ft and it counts as casting the spell (it must maintain conc.)"
			])
		},
		"subclassfeature10" : {
			name : "Queen's Entourage",
			source : ["EN5:106", 7],
			minlevel : 10,
			description : desc([
				"I can telepathically speak with a creature I can see within 60 ft if it knows a language",
				"I can also establish telepathic communication with up to 5 friendly targets within 60 ft",
				"Members of this group can then communicate telepathically with each other as well"
			])
		},
		"subclassfeature14" : {
			name : "Court of Cups",
			source : ["EN5:106", 7],
			minlevel : 14,
			description : "\n   " + "I gain resistance to acid, cold, necrotic, and psychic damage",
			dmgres : ["Acid", "Cold", "Necrotic", "Psychic"]
		}
	}
});

// The greatest secrets (EN5ider 110)
SourceList["EN5:110"] = {
	name : "EN World EN5ider [110] Greatest Secrets",
	abbreviation : "EN5:110",
	group : "EN World EN5ider",
	url : "https://www.patreon.com/posts/7106683",
	date : "2016/10/28"
};
AddSubClass("cardcaster", "king of pentacles", {
	regExpSearch : /^(?=.*card)(?=.*caster)(?=.*king)(?=.*pentacles).*$/i,
	subname : "King of Pentacles",
	source : ["EN5:110", 2],
	features : {
		"subclassfeature1" : {
			name : "Lucre \u0026 Cantrips",
			source : ["EN5:110", 2],
			minlevel : 1,
			description : "\n   " + "I know the Fire Bolt and Prestidigitation cantrips; I start play with an extra 50 gp",
			spellcastingBonus : {
				name : "King of Pentacles",
				spells : ["fire bolt", "prestidigitation"],
				selection : ["fire bolt", "prestidigitation"],
				times : 2
			}
		},
		"subclassfeature1.1" : {
			name : "Spendthrift",
			source : ["EN5:110", 2],
			minlevel : 1,
			description : "\n   " + "I can get 25% discount on any one item purchased, up to a maximum depending on level",
			additional : levels.map(function (n) {
				var total = (Math.pow(n, 2) * 100);
				total = total > 1000 ? total / 1000 + 'k' : total;
				return "max " + total + " gp discount";
			}),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature2" : {
			name : "Profit Margin",
			source : ["EN5:110", 2],
			minlevel : 2,
			description : "\n   " + "Whenever I find cash or receive a cash payout, it mysteriously increases by 10%"
		},
		"subclassfeature6" : {
			name : "Insightful Shopper",
			source : ["EN5:110", 2],
			minlevel : 6,
			description : desc([
				"When completing a long rest in a location where I can shop, I can write down 3 items",
				"These can't be worth more than 100 gp each and have to be available where I'm at",
				"As an action, I can 'find' one of the (remaining) written down items on my person",
				"This has to be in a logical space that can hold the item in question, such as a backpack",
				"I can declare each written item only once before writing a new list"
			]),
			usages : 1,
			recovery : "long rest",
			action : ["action", ""]
		},
		"subclassfeature10" : {
			name : "Bribe the Fates",
			source : ["EN5:110", 3],
			minlevel : 10,
			description : desc([
				"After a creature I can see in 20 ft roll a d20, I can sacrifice cash to give adv. or disadv.",
				"Coins worth 10 \u00D7 my character level in gp disappear; I can do this after the roll is shown",
				"If I do this again before a long rest, the costs is 10 times higher than the previous use"
			]),
			recovery : "long rest",
			usages : "",
			usagescalc : "var FieldNmbr = parseFloat(event.target.name.slice(-2)); var usages = What('Limited Feature Used ' + FieldNmbr); var useMult = isNaN(Number(usages)) || !Number(usages) ? 1 : Math.pow(10, usages); var charLvl = What('Character Level'); var total = (Math.round(charLvl * useMult) * 10); total = total > 1000000 ? total / 1000000 + 'M' : total > 1000 ? total / 1000 + 'k' : total; event.value = total + ' gp';"
		},
		"subclassfeature14" : {
			name : "Mystical Mint",
			source : ["EN5:110", 3],
			minlevel : 14,
			description : desc([
				"Whenever I roll the max result on a d20, percentile die, or damage, I generate wealth",
				"I mysteriously gain the number rolled \u00D7 10 in gold pieces (not affected by Profit Margin)"
			])
		}
	}
});
AddSubClass("cardcaster", "jack of beasts", {
	regExpSearch : /^(?=.*card)(?=.*caster)(?=.*jack)(?=.*beasts).*$/i,
	subname : "Jack of Beasts",
	source : ["EN5:110", 3],
	spellcastingList : {
		'class' : 'cardcaster',
		extraspells : ["animal friendship", "shield of faith", "speak with animals", "animal messenger", "locate animals or plants", "enhance ability", "conjure animals", "animate dead", "speak with dead", "conjure minor elementals", "conjure woodland beings", "hold monster", "animate objects", "conjure elemental", "conjure fey", "create undead", "conjure celestial", "forcecage", "animal shapes", "dominate monster", "astral projection", "gate"]
	},
	monstrousArcana1 : ClassList.cardcaster.majorArcana1.replace(/\r\r(\w+) -/g, '\r   \u2022 SPL_$1 [MA]\r\r$1 -').replace(/SPL_(I|II|III) /g, 'Animal Friendship ').replace('SPL_IV', 'Shield of Faith').replace(/SPL_(V|VI) /g, 'Speak with Animals ').replace('SPL_VII ', 'Animal Messenger [MA]\t\u2022 Locate Animals or Plants ').replace('SPL_VIII', 'Enhance Ability').replace('SPL_IX', 'Conjure Animals').replace('SPL_X ', 'Animate Dead [MA]\t\t\u2022 Speak with Dead ').replace('SPL_XI', 'Conjure Minor Elementals') + '\r   \u2022 Conjure Woodland Beings [MA]',
	monstrousArcana2 : ClassList.cardcaster.majorArcana2.replace(/(   If I play.*)\r\r(\w+) -/g, '   \u2022 SPL_$2 [MA]\r$1\r\r$2 - ').replace('\r\rXIII - Death', '\r   \u2022 Hold Monster [MA]\r\rXIII - Death').replace('\r\rXIV - Temperance', '\r   \u2022 Animate Objects [MA]\t\u2022 Conjure Elemental [MA]\r\r\XIV - Temperance').replace('SPL_XV ', 'Conjure Fey ').replace('SPL_XVI ', 'Create Undead ').replace('SPL_XVII ', 'Conjure Celestial ').replace('SPL_XVIII ', 'Forcecage ').replace('SPL_XIX', 'Animal Shapes').replace('SPL_XX ', 'Dominate Monster ').replace('SPL_XXI', 'Astral Projection').replace(/(\u2022 Wish)/, '$1\r   \u2022 Gate [MA]'),
	addMonstrousArcana : function () {
		AddToNotes(ClassSubList['cardcaster-jack of beasts'].monstrousArcana1, 'Monstrous Arcana cards 0-XI of Cardcaster (Jack of Beasts)');
		AddToNotes(ClassSubList['cardcaster-jack of beasts'].monstrousArcana2, 'Monstrous Arcana cards XII-XXI of Cardcaster (Jack of Beasts)');
	},
	removeMonstrousArcana : function () {
		AddToNotes('', '', ClassSubList['cardcaster-jack of beasts'].monstrousArcana1);
		AddToNotes('', '', ClassSubList['cardcaster-jack of beasts'].monstrousArcana2);
	},
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiency, Ritual, \u0026 Cantrips",
			source : ["EN5:110", 2],
			minlevel : 1,
			description : desc([
				"I know the Chill Touch and Dancing Lights cantrips; I am proficient in Animal Handling",
				"I know Find Familiar and can cast it as a ritual and with spell slots if I have any"
			]),
			spellcastingBonus : [{
				name : "Jack of Beasts",
				spells : ["chill touch", "dancing lights"],
				selection : ["chill touch", "dancing lights"],
				times : 2
			}, {
				name : "Bonus Ritual",
				spells : ["find familiar"],
				selection : ["find familiar"]
			}],
			skills : ["Animal Handling"],
			skillstxt : "\n\n" + toUni("Cardcaster (Jack of Beasts)") + ": Animal Handling."
		},
		"subclassfeature1.1" : {
			name : "Monstrous Arcana",
			source : ["EN5:110", 3],
			minlevel : 1,
			description : "\n   " + "I have additional spell options for every major arcana card (see [MA] on 'Notes' page)",
			eval : "try { if (ClassSubList['cardcaster-jack of beasts']) { ClassList.cardcaster.removeMajorArcana(); ClassSubList['cardcaster-jack of beasts'].addMonstrousArcana(); }; } catch (er) {}; ",
			removeeval : "try { if (ClassSubList['cardcaster-jack of beasts']) { ClassSubList['cardcaster-jack of beasts'].removeMonstrousArcana(); }; } catch (er) {}; "
		},
		"subclassfeature2" : {
			name : "Eye of the Cardshark",
			source : ["EN5:110", 3],
			minlevel : 2,
			description : desc([
				"As a bonus action, I can choose a creature I can see within 30 ft to gain insight into it",
				"I learn its max HP, current HP, and any damage type against which it has vulnerabilities"
			]),
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"subclassfeature6" : {
			name : "Empowered Summoner",
			source : ["EN5:110", 3],
			minlevel : 6,
			description : desc([
				"Creatures I manipulate or summon with a card, as well as my familiar, gain bonuses",
				"It gains my cardcaster level as temp HP and adds my Prof B. to its weapon damage rolls"
			])
		},
		"subclassfeature10" : {
			name : "Voice of the Void",
			source : ["EN5:110", 4],
			minlevel : 10,
			description : desc([
				"I'm always under the effect of Tongues and Speak with Animals, which can't be dispelled",
				"My Speak with Animals works for any creature without a language",
				"I can use this feature to cast Speak with Dead or Speak with Plants once per short rest"
			]),
			usages : 1,
			recovery : "short rest",
			action : ["action", ""],
			spellcastingBonus : {
				name : "Voice of the Void",
				spells : ["speak with dead", "speak with plants"],
				selection : ["speak with dead", "speak with plants"],
				times : 2
			}
		},
		"subclassfeature14" : {
			name : "Capture Card",
			source : ["EN5:110", 4],
			minlevel : 14,
			description : desc([
				"As an action, I can have a creature I see in 20 ft make a Cha save if it has 10 HP or less",
				"Only creatures with a max HP of 30 or more can be affected; Int 8+ have adv. on save",
				"If failed or willing, it disappears into an extradimensional space within one of my cards",
				"If it succeeds on its save, I can't use this feature on that creature again for a year",
				"I can only hold one unwilling creature; Creatures' HP are restored when I do a long rest",
				"As an action, I can discard a card and use a play to summon it within 20 ft for 1 hour",
				"It's friendly and obeys me as Dominate Monster; As an action, I can return it to the card",
				"If it dies, I can restore it with 8 hours meditation; Unwilling Int 12+ save each long rest"
			]),
			action : ["action", ""]
		}
	}
});
