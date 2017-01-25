/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Bard, called "College of the Maestro" v1.2
				This is taken from the DMs Guild website (http://www.dmsguild.com/product/183630/)
				This subclass is made by Matthew Mercer
	Code by:	MorePurpleMoreBetter
	Date:		2016-08-05 (sheet v12.01)
	
	Please support the creator of this content (Matthew Mercer) and download his material from the DMs Guild website: http://www.dmsguild.com/browse.php?x=0&y=0&author=Matthew%20Mercer
*/

ClassSubList["college of the maestro"] = {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*maestro).*$/i,
	subname : "College of the Maestro",
	source : ["MM:CM", 1],
	features : {
		"subclassfeature3" : {
			name : "Battle Muse",
			source : ["MM:CM", 1],
			minlevel : 3,
			description : "\n   " + "I gain an extra use of my Bard Inspiration feature, and again at both level 6 and 14",
			additional : ["", "", "+1 bardic inspiration", "+1 bardic inspiration", "+1 bardic inspiration", "+2 bardic inspirations", "+2 bardic inspirations", "+2 bardic inspirations", "+2 bardic inspirations", "+2 bardic inspirations", "+2 bardic inspirations", "+2 bardic inspirations", "+2 bardic inspirations", "+3 bardic inspirations", "+3 bardic inspirations", "+3 bardic inspirations", "+3 bardic inspirations", "+3 bardic inspirations", "+3 bardic inspirations", "+3 bardic inspirations"],
			changeeval : "var bardLVL = classes.known.bard.level; var recov = bardLVL < 5 ? \"long rest\" : \"short rest\"; var extr = bardLVL < 2 ? 0 : (bardLVL < 6 ? 1 : (bardLVL < 14 ? 2 : 3)); var addi = \" [\" + CurrentClasses.bard.features[\"bardic inspiration\"].additional[bardLVL - 1] + \"]\"; AddFeature(\"Bardic Inspiration\", \"\", addi, recov, \"Bard (College of the Maestro)\", \"replace\", \"event.value = Math.max(1 + \" + extr + \", What(\'Cha Mod\') + \" + extr + \");\");",
		},
		"subclassfeature3.1" : {
			name : "Symphony of Conflict",
			source : ["MM:CM", 1],
			minlevel : 3,
			description : "\n   " + "Use the \"Choose Features\" button above to add Conducting Techniques to the third page" + "\n   " + "This requires a free hand, baton or wand; I need to see the target and it must hear me" + "\n   " + "Any saving throws have a DC equal to my spell save DC",
			additional : ["", "", "2 conducting techniques", "2 conducting techniques", "2 conducting techniques", "3 conducting techniques", "3 conducting techniques", "3 conducting techniques", "3 conducting techniques", "3 conducting techniques", "3 conducting techniques", "3 conducting techniques", "3 conducting techniques", "4 conducting techniques", "4 conducting techniques", "4 conducting techniques", "4 conducting techniques", "4 conducting techniques", "4 conducting techniques", "4 conducting techniques"],
			extraname : "Conducting Technique",
			extrachoices : ["Aria of Suspense (Ansia)", "Crash (Marcato)", "Dirge of Dread (Finale)", "Dissonance (Discordia)", "Guiding Tone (Fermata)", "Hasten Tempo (Accelerando)", "Hymn of Harmony (Armonia)", "Majestic Anthem (Maestoso)", "Resonance (Risonanza)", "Sprint (Presto)"],
			"aria of suspense (ansia)" : {
				name : "Aria of Suspense (Ansia)",
				description : " [1 bardic inspiration die]" + "\n   " + "As an action, anyone of my choosing within 60 ft of me can't be surprised for 10 minutes" + "\n   " + "They also add the die roll on saves vs. traps and environmental effects for the duration",
				source : ["MM:CM", 1],
				action : ["action", ""]
			},
			"crash (marcato)" : {
				name : "Crash (Marcato)",
				description : " [1 bardic inspiration die]" + "\n   " + "When someone within 60 ft hits with an attack, I can use my reaction to amplify it" + "\n   " + "The target of the attack must make a Strength saving throw or be knocked prone" + "\n   " + "If failed, the target of the attack also takes half the die roll worth of thunder damage",
				source : ["MM:CM", 1],
				action : ["reaction", ""]
			},
			"dirge of dread (finale)" : {
				name : "Dirge of Dread (Finale)",
				description : " [1 bardic inspiration die]" + "\n   " + "When an ally within 60 ft reduces a creature to 0 HP, I can use my reaction to frighten" + "\n   " + "Half the die roll (min 1) of creatures within 15 ft of the ally have to make a Wisdom save" + "\n   " + "If failed, frightened until the end of the ally's next turn; can only affect once per 24 hours",
				source : ["MM:CM", 1],
				action : ["reaction", ""]
			},
			"dissonance (discordia)" : {
				name : "Dissonance (Discordia)",
				description : " [1 bardic inspiration die]" + "\n   " + "When a creature within 60 ft makes a saving throw, I can use my reaction to thwart it" + "\n   " + "I reduce the save total by half the die roll; I can do this after the save was rolled",
				source : ["MM:CM", 1],
				action : ["reaction", ""]
			},
			"guiding tone (fermata)" : {
				name : "Guiding Tone (Fermata)",
				description : " [1 bardic inspiration die]" + "\n   " + "As a bonus action, a target within 60 ft has to make a Wis save or is pushed back 10 ft" + "\n   " + "I choose the direction of the push; If failed, it also takes half the die roll in psychic damage",
				source : ["MM:CM", 1],
				action : ["bonus action", ""]
			},
			"hasten tempo (accelerando)" : {
				name : "Hasten Tempo (Accelerando)",
				description : " [1 bardic inspiration die]" + "\n   " + "As a bonus action, a creature within 60 ft adds the die roll to its current initiative value" + "\n   " + "If this moves the target up the initiative order above me, it can immidiately take its turn" + "\n   " + "A creature can't be affected by this again until after finishing a short or long rest",
				source : ["MM:CM", 2],
				action : ["bonus action", ""]
			},
			"hymn of harmony (armonia)" : {
				name : "Hymn of Harmony (Armonia)",
				description : "\n   " + "My Bardic Inspiration dice can be used to regain extra HP, whenever any HP is regained",
				source : ["MM:CM", 2],
			},
			"majestic anthem (maestoso)" : {
				name : "Majestic Anthem (Maestoso)",
				description : " [1 bardic inspiration die]" + "\n   " + "As an action, any within 60 ft gain temporary HP equal to the die roll + my Cha modifier" + "\n   " + "I can select any creatures in range; The temporary HP last until the end of my next turn",
				source : ["MM:CM", 2],
				action : ["action", ""]
			},
			"resonance (risonanza)" : {
				name : "Resonance (Risonanza)",
				description : " [1 bardic inspiration die]" + "\n   " + "As a bonus action, I select a weapon within 60 ft to deal additional thunder damage" + "\n   " + "Until the end of my next turn, the weapon adds half the die roll (min 1) to its damage",
				source : ["MM:CM", 2],
				action : ["bonus action", ""]
			},
			"sprint (presto)" : {
				name : "Sprint (Presto)",
				description : "\n   " + "My Bardic Inspiration dice can be expended to increase movement speed for one turn" + "\n   " + "The speed gained depends on the die roll: 1-4: +10 ft; 5-8: +15 ft; 9-12: +20 ft.",
				source : ["MM:CM", 2],
			},
		},
		"subclassfeature6" : {
			name : "Frenetic Crescendo",
			source : ["MM:CM", 1],
			minlevel : 6,
			usages : 1,
			recovery : "long rest",
			description : "\n   " + "As an action, I can grant one Bardic Inspiration die to any creature within 60 ft" + "\n   " + "All normal restrictions of Bardic Inspiration dice apply",
			action : ["action", ""]
		},
		"subclassfeature14" : {
			name : "Virtuoso of Captivation",
			source : ["MM:CM", 1],
			minlevel : 14,
			usages : 1,
			recovery : "short rest",
			description : "\n   " + "As an action, I start a mystical symphony that affects any that can hear me in 60 ft" + "\n   " + "Any creature of my choosing has disadv. on saves vs. being charmed and magical sleep" + "\n   " + "Affected also have disadv. on Wis (Perception) checks to see or hear others than me" + "\n   " + "To keep the symphony going, for up to 10 min, I have to expend my action every turn",
			action : ["action", ""]
		},
	}
};
ClassList.bard.subclasses[1].push("college of the maestro");

SourceList["MM:CM"] = {
	name : "Matthew Mercer: College of the Maestro",
	abbreviation : "MM:CM",
	group : "Dungeon Masters Guild",
	url : "http://www.dmsguild.com/product/183630/"
};