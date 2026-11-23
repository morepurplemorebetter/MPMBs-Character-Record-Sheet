var iFileName = "Monk - Way of the Cobalt Soul [by Matt Mercer, transcribed by Smashman].js";
RequiredSheetVersion(13);

SourceList["MM:WCS"] = {
	name: "Way of the Cobalt Soul",
	abbreviation: "MM:WCS",
	group: "Twitter",
	url: "https://twitter.com/matthewmercer/status/1105321543788199936",
	date: "2019-03-12"
};

AddSubClass("monk", "way of the cobalt soul-update", {
	regExpSearch: /^(?=.*\bcobalt)(?=.*\b(soul|spirit))((?=.*(warrior|monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
	subname: "Way of the Cobalt Soul",
	source: [["MM:WCS", 1]],
	features: {
		"subclassfeature3": {
			name: "Mystical Erudition",
			source: [["MM:WCS", 1]],
			minlevel: 3,
			description: desc([
				"I gain a language; and proficiency with one skill from Arcana, History, Nature or Religion",
   			"At both 11th and 17th level, I learn one additional language",
   			"At those levels I also gain proficiency or expertise (if proficient) in one skill from list above"
			]),
			languageProfs: [1],
			additional: levels.map(function (n) {
				if (n < 3) return '';
				var num = n < 11 ? 1 : n < 17 ? 2 : 3;
				return num + " language" + (n < 11 ? "" : "s") + " \u0026 " + num + " skill" + (n < 11 ? "" : "s");
			}),
			changeeval: function(level) {
				if (level[1] >= 11 && level[0] < 11) {
					processLanguages(true, "Monk (Way of the Cobalt Soul): Mystical Erudition 11", [1]);
				}
				else if (level[1] < 11 && level[0] >= 11) {
					processLanguages(false, "Monk (Way of the Cobalt Soul): Mystical Erudition 11", [1]);
				}

				if (level[1] >= 17 && level[0] < 17) {
					processLanguages(true, "Monk (Way of the Cobalt Soul): Mystical Erudition 17", [1]);
				}
				else if (level[1] < 17 && level[0] >= 17) {
					processLanguages(false, "Monk (Way of the Cobalt Soul): Mystical Erudition 17", [1]);
				}
			},
			extraname: "Mystical Erudition",
			extrachoices: ["Arcana Proficiency", "Arcana Expertise", "History Proficiency", "History Expertise", "Nature Proficiency", "Nature Expertise", "Religion Proficiency", "Religion Expertise"],
			extraTimes: levels.map(function (n) { return n < 11 ? 1 : n < 17 ? 2 : 3; }),
			"arcana proficiency" : {
				name: "Arcana Proficiency", description : "",
				source: [["MM:WCS", 1]],
				prereqeval : function(v) { return v.skillProfs.indexOf("Arcana") == -1; },
				skills: ["Arcana"]
			},
			"arcana expertise" : {
				name : "Arcana Expertise", description : "",
				source: [["MM:WCS", 1]],
				prereqeval : function(v) { return classes.known.monk && classes.known.monk.level >= 11 && v.skillProfs.indexOf("Arcana") !== -1; },
				skills : [["Arcana", "only"]]
			},
			"history proficiency" : {
				name: "History Proficiency", description : "",
				source: [["MM:WCS", 1]],
				prereqeval : function(v) { return v.skillProfs.indexOf("History") == -1; },
				skills: ["History"]
			},
			"history expertise" : {
				name : "History Expertise", description : "",
				source: [["MM:WCS", 1]],
				prereqeval : function(v) { return classes.known.monk && classes.known.monk.level >= 11 && v.skillProfs.indexOf("History") !== -1; },
				skills : [["History", "only"]]
			},
			"nature proficiency" : {
				name: "Nature Proficiency", description : "",
				source: [["MM:WCS", 1]],
				prereqeval : function(v) { return v.skillProfs.indexOf("Nature") == -1; },
				skills: ["Nature"]
			},
			"nature expertise" : {
				name : "Nature Expertise", description : "",
				source: [["MM:WCS", 1]],
				prereqeval : function(v) { return classes.known.monk && classes.known.monk.level >= 11 && v.skillProfs.indexOf("Nature") !== -1; },
				skills : [["Nature", "only"]]
			},
			"religion proficiency" : {
				name: "Religion Proficiency", description : "",
				source: [["MM:WCS", 1]],
				prereqeval : function(v) { return v.skillProfs.indexOf("Religion") == -1; },
				skills: ["Religion"]
			},
			"religion expertise" : {
				name : "Religion Expertise", description : "",
				source: [["MM:WCS", 1]],
				prereqeval : function(v) { return classes.known.monk && classes.known.monk.level >= 11 && v.skillProfs.indexOf("Religion") !== -1; },
				skills : [["Religion", "only"]]
			},
			"extract aspects": {
				name: "Extract Aspects",
				source: [["MM:WCS", 1]],
				description: desc([
					"If I hit a creature with a Flurry of Blows attack, I can learn about the creature",
					"I learn creature's vulnerabilities, resistances and immunities (damage \u0026 conditions)"
				])
			},
			autoSelectExtrachoices: [{
				extrachoice: "extract aspects",
				extraname: "Way of the Cobalt Soul 3"
			}]
		},
		"subclassfeature6": {
			name: "Preternatural Counter",
			source: [["MM:WCS", 1]],
			minlevel: 6,
			description: desc([
				"As a reaction when an attack misses me, I can make a melee attack against the attacker"
			]),
			action: [["reaction", ""]],
			"extort truth": {
				name: "Extort Truth",
				source: [["MM:WCS", 1]],
				description: desc([
					"If I hit a creature with two or more attacks in one round, I can force it to make a Cha save",
					"If failed, the creature can't lie for 1 min and all Cha checks directed at target have adv.",
					"I know if it failed the save; The target is aware of the effect and can give evasive answers",
					"I can choose to deal no damage with the attacks that trigger this feature"
				]),
				additional: "1 ki point"
			},
			autoSelectExtrachoices: [{
				extrachoice: "extort truth",
				extraname: "Way of the Cobalt Soul 6"
			}]
		},
		"subclassfeature11": {
			name: "Mind of Mercury",
			source: [["MM:WCS", 2]],
			minlevel: 11,
			description: desc([
				"If I have taken my reaction this round, I can spend 1 ki point to take a reaction",
				"I can only use this feature once per turn in a round"
			]),
			additional: "1 ki point",
			"debilitating barrage": {
				name: "Debilitating Barrage",
				source: [["MM:WCS", 2]],
				description: desc([
					"If I hit a creature with a Flurry of Blows attack, I can use 3 ki points to debilitate it",
					"The target has vulnerability against first instance of a damage type I choose, within 1 min"
				]),
				additional: "3 ki points"
			},
			autoSelectExtrachoices: [{
				extrachoice: "debilitating barrage",
				minlevel: 17,
				extraname: "Way of the Cobalt Soul 17"
			}]
		}
	}
});