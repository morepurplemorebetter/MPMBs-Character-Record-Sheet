/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass & Warlock's Eldritch Invocations
	Effect:		This script adds a subclass for the Warlock, called "The Big, Bad Wolf"
				This script also adds 11 new Eldritch Invocations for the Warlock
				This is taken from the DMs Guild website (http://www.dmsguild.com/product/201431/)
				This subclass is made by A.T. Craven
	Code by:	MorePurpleMoreBetter
	Date:		2017-03-15 (sheet v12.88)
	
	Please support the creator of this content (A.T. Craven) and download his material from the DMs Guild website: http://www.dmsguild.com/browse.php?author=A.%20T.%20Craven
*/

//make the subclass
ClassSubList["warlock-the big bad wolf"] = {
	regExpSearch : /^(?=.*\bbig\b)(?=.*\bbad\b)(?=.*\bwolf\b).*$/i,
	subname : "the Big, Bad Wolf",
	source : ["ATC:BBW", 1],
	spellcastingExtra : ["command", "thunderwave", "alter self", "pass without trace", "knock", "nondetection", "dominate beast", "phantasmal killer", "cloudkill", "dominate person"],
	features : {
		"subclassfeature1" : {
			name : "Cry Wolf",
			source : ["ATC:BBW", 1],
			minlevel : 1,
			description : desc([
				"As an action, a creature within 60 ft that can see my face must make a Wis save",
				"It has disadv. on this save if I'm lightly/heavily obscured, in dim light, or in darkness",
				"If failed, it is frightened of me until the end of my next turn"
			]),
			usages : 1,
			recovery : "short rest",
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Growl of the Wolf",
			source : ["ATC:BBW", 1],
			minlevel : 6,
			description : desc([
				"As a reaction when I take damage, I can reduce it by 1d6 + Cha mod + warlock level"
			]),
			usages : 1,
			recovery : "short rest",
			additional : levels.map(function (n) {
				if (n < 6) return "";
				return "1d6+" + n + "+Cha";
			}),
			action : ["reaction", ""]
		},
		"subclassfeature10" : {
			name : "Step of the Wolf",
			source : ["ATC:BBW", 1],
			minlevel : 10,
			description : desc([
				"As a bonus action, I can teleport from and into dim light or darkness within 60 ft",
				"After, a target I damage with a spell/weapon attack before the turn ends is frightened",
				"The target is frightened of me until the end of my next turn"
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature14" : {
			name : "Fangs of the Wolf",
			source : ["ATC:BBW", 2],
			minlevel : 14,
			description : desc([
				"With a howl, all within 10 ft of me must make a Charisma saving throw",
				"If failed, it takes 2d6 psychic damage and is paralyzed until the end of my next turn",
				"On a success, it takes no damage, but is frightened of me until the end of my next turn"
			]),
			usages : 1,
			recovery : "short rest"
		}
	}
};
ClassList.warlock.subclasses[1].push("warlock-the big bad wolf");

//make the source
SourceList["ATC:BBW"] = {
	abbreviation : "ATC:BBW",
	name : "A.T. Craven: the Big, Bad Wolf",
	group : "Dungeon Masters Guild",
	url : "http://www.dmsguild.com/product/201431/"
};

//set dire wolf and death dog as options for the pact of the chain feature
CreatureList["dire wolf"].companion = "pact_of_the_chain";
if (CreatureList["death dog"]) CreatureList["death dog"].companion = "pact_of_the_chain";

//add the invocations
[{
	objname : "The Better to See You With",
	name : "The Better to See You With",
	description : "\n   " + "I can cast Faerie Fire at will (PHB 239)",
	source : ["ATC:BBW", 3],
	spellcastingBonus : {
		name : "The Better to See You With",
		spells : ["faerie fire"],
		selection : ["faerie fire"],
		atwill : true
	}
}, {
	objname : "Obscuring Fog",
	name : "Obscuring Fog",
	description : "\n   " + "I can cast Fog Cloud at will, as a 1st-level spell (PHB 243)",
	source : ["ATC:BBW", 3],
	spellcastingBonus : {
		name : "Obscuring Fog",
		spells : ["fog cloud"],
		selection : ["fog cloud"],
		atwill : true
	}
}, {
	objname : "Hex Beacon (prereq: level 5 warlock)",
	name : "Hex Beacon",
	description : "\n   " + "Adv. on Perception, Survival, Investigation, Nature checks to find a target of my Hex spell",
	source : ["ATC:BBW", 3],
	prereqeval : "classes.known.warlock.level >= 5"
}, {
	objname : "Whispers from the Dark (prereq: level 5 warlock)",
	name : "Whispers from the Dark",
	description : "\n   " + "Once per short rest, I can cast Dissonant Whispers as a 1st-level spell (PHB 234)",
	source : ["ATC:BBW", 3],
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : {
		name : "Whispers from the Dark",
		spells : ["dissonant whispers"],
		selection : ["dissonant whispers"],
		oncesr : true
	},
	prereqeval : "classes.known.warlock.level >= 5"
}, {
	objname : "Stalker's Step (prereq: level 7 warlock)",
	name : "Stalker's Step",
	description : "\n   " + "Once per short rest, I can cast Pass Without Trace on myself without spell slot (PHB 264)",
	source : ["ATC:BBW", 3],
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : {
		name : "Stalker's Step",
		spells : ["pass without trace"],
		selection : ["pass without trace"],
		oncesr : true
	},
	prereqeval : "classes.known.warlock.level >= 7"
}, {
	objname : "The Better to Find You With (prereq: level 9 warlock)",
	name : "The Better to Find You With",
	description : "\n   " + "Once per short rest, I can cast Locate Creature using a warlock spell slot, no mater. comp.",
	source : ["ATC:BBW", 3],
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : {
		name : "The Better to Find You With",
		spells : ["locate creature"],
		selection : ["locate creature"],
		oncesr : true
	},
	prereqeval : "classes.known.warlock.level >= 9"
}, {
	objname : "Let Me In (prereq: level 9 warlock)",
	name : "Let Me In",
	description : "\n   " + "I can cast Knock at will (PHB 254)",
	source : ["ATC:BBW", 3],
	spellcastingBonus : {
		name : "Let Me In",
		spells : ["knock"],
		selection : ["knock"],
		atwill : true
	},
	prereqeval : "classes.known.warlock.level >= 9"
}, {
	objname : "Unseen Artisans (prereq: level 15 warlock)",
	name : "Unseen Artisans",
	description : "\n   " + "Once per short rest, I can cast Fabricate without using a spell slot (PHB 239)",
	source : ["ATC:BBW", 3],
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : {
		name : "Unseen Artisans",
		spells : ["fabricate"],
		selection : ["fabricate"],
		atwill : true
	},
	prereqeval : "classes.known.warlock.level >= 15"
}, {
	objname : "Fangs of the Wolf (prereq: level 12 warlock, the Big, Bad Wolf patron, Pact of the Blade)",
	name : "Fangs of the Wolf",
	description : "\n   " + "My Pact weapon does +1d6 psychic damage against targets that are frightened of me" + "\n   " + "I then gain half this psychic damage as temporary HP",
	source : ["ATC:BBW", 3],
	calcChanges : {
		atkAdd : ["if (inputText.match(/\\bpact\\b/i)) { fields.Description += (fields.Description ? '; ' : '') + '+1d6 psychic damage vs. target frightened of me'; }; ", "If I include the word 'Pact' in a weapon's name, it will be treated as a Pact Weapon. When I hit a target that is frightened of me with my Pact weapon, the attack does an additional 1d6 psychic damage. I then gain half this bonus damage as temporary HP."]
	},
	prereqeval : "classes.known.warlock.subclass === 'warlock-the big bad wolf' && classes.known.warlock.level >= 12 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the blade') !== -1"
}, {
	objname : "Pack of the Wolf (prereq: level 15 warlock, the Big, Bad Wolf patron, Pact of the Chain)",
	name : "Pack of the Wolf",
	description : "\n   " + "I gain adv. on attacks vs. targets when my familiar is within 5 ft of it, not incapacitated",
	source : ["ATC:BBW", 3],
	prereqeval : "classes.known.warlock.subclass === 'warlock-the big bad wolf' && classes.known.warlock.level >= 15 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the chain') !== -1"
}, {
	objname : "Wisdom of the Wolf (prereq: level 15 warlock, the Big, Bad Wolf patron, Pact of the Tome)",
	name : "Wisdom of the Wolf",
	description : desc([
		"My Book of Shadows allows me to cast Counterspell without using spell slots",
		"If I counter a spell this way, it is stored in my Book of Shadows for 48 hours, until release",
		"As an action, I can release a stored spell, casting it as if my own"
	]),
	source : ["ATC:BBW", 3],
	usages : "Charisma modifier per ",
	usagescalc : "event.value = What('Cha Mod');",
	recovery : "short rest",
	spellcastingBonus : {
		name : "Wisdom of the Wolf",
		spells : ["counterspell"],
		selection : ["counterspell"]
	},
	prereqeval : "classes.known.warlock.subclass === 'warlock-the big bad wolf' && classes.known.warlock.level >= 15 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the tome') !== -1"
}].forEach( function (invoc) {
	ClassList.warlock.features["eldritch invocations"].extrachoices.push(invoc.objname);
	ClassList.warlock.features["eldritch invocations"][invoc.objname.toLowerCase()] = invoc;
});
ClassList.warlock.features["eldritch invocations"].extrachoices.sort();