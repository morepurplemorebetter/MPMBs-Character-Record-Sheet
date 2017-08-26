/*	-WHAT IS THIS?-
	The script featured here is made	 as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass (for the Cleric, called "Zeal Domain") from the Magic: The Gathering plane of Amonkhet
				This is taken from the Plane Shift: Amonkhet article (https://media.wizards.com/2017/downloads/magic/plane-shift_amonkhet.pdf)
	Code by:	/u/MILKB0T (and tiny corrections by MPMB)
	Date:		2017-08-26 (sheet v12.998)
	
	Note that this script doesn't add anything else from the Plane Shift: Amonkhet article, just the one subclass
*/

SourceList["PS:A"] = {
	name: "Plane Shift: Amonkhet", // 2017-07-05
	abbreviation: "PS:A",
	group: "Plane Shift",
	url: "https://media.wizards.com/2017/downloads/magic/plane-shift_amonkhet.pdf"
};

ClassSubList["cleric-zeal domain"] = {
	regExpSearch: /^(?=.*(cleric|priest|clergy|acolyte))(?=.*\b(zeal|destruction|inferno)\b).*$/i,
	subname: "Zeal Domain",
	source: ["PS:A", 28],
	spellcastingExtra: ["searing smite", "thunderous smite", "magic weapon", "shatter", "haste", "fireball", "fire shield", "freedom of movement", "destructive wave", "flame strike"],
	features: {
		"subclassfeature1": {
			name: "Bonus Proficiency",
			source: ["PS:A", 28],
			minlevel: 1,
			description: "\n   " + "I gain proficiency with martial weapons and heavy armor",
			armor: [false, false, true, false],
			weapons: [false, true]
		},
		"subclassfeature1.1": {
			name: "Priest of Zeal",
			source: ["PS:A", 28],
			minlevel: 1,
			description: "\n   " + "When I use the Attack action, I can make a weapon attack as a bonus action",
			usages: "Wisdom modifier per ",
			usagescalc: "event.value = Math.max(1, tDoc.getField('Wis Mod').value);",
			recovery: "long rest",
			action: ["bonus action", " (with Attack action)"]
		},
		"subclassfeature2": {
			name: "Channel Divinity: Consuming Fervor",
			source: ["PS:A", 28],
			minlevel: 2,
			description: "\n   " + "Instead of rolling, I can do maximum damage when I do fire or thunder damage"
		},
		"subclassfeature6": {
			name: "Resounding Strike",
			source: ["PS:A", 28],
			minlevel: 6,
			description: "\n   " + "When I deal thunder damage to a Large or smaller foe, I can push it up to 10 ft away"
		},
		"subclassfeature8": {
			name: "Divine Strike",
			source: ["PS:A", 28],
			minlevel: 8,
			description: "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
			additional: levels.map(function (n) {
				if (n < 8)
					return "";
				return "+" + (n < 14 ? 1 : 2) + "d8 weapon damage";
			}),
			calcChanges: {
				atkAdd: ["if (classes.known.cleric && classes.known.cleric.level > 7 && !isSpell) {fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 weapon damage'; }; ", "Once per turn, I can have one of my weapon attacks that hit do extra weapon damage."]
			}
		},
		"subclassfeature17": {
			name: "Blaze of Glory",
			source: ["PS:A", 28],
			minlevel: 17,
			description: desc([
				"As a reaction, I can do a final heroic act when I'm reduced to 0 HP or killed outright",
				"I move my speed towards my attacker and attack it once in melee with advantage",
				"If the attack hits, it does an extra 5d10 fire and extra 5d10 weapon damage",
				"After this I suffer the consequences of the damage as I would normally do"
			]),
			usages: 1,
			recovery: "long rest",
			action: ["reaction"]
		}
	}
};
ClassList.cleric.subclasses[1].push("cleric-zeal domain");
