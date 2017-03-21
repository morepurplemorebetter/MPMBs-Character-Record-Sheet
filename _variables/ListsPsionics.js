var PsychicFocus = "\n   " + toUni("Psychic Focus") + ": ";

//Psionic Talents/Disciplines for the Mystic
var PsionicsList = {
	
	//the psionic talents
	"beacon" : {
		name : "Beacon",
		classes : ["mystic"],
		source : ["UA:TMC", 27],
		psionic : true,
		level : 0,
		time : "1 bns",
		range : "Self",
		duration : "1 h (D)",
		description : "My body sheds bright light 20-ft rad and dim light 20-ft, in chosen color; dismiss as a bonus action",
		descriptionFull : "As a bonus action, you cause bright light to radiate from your body in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. The light lasts for 1 hour, and you can extinguish it earlier as a bonus action."
	},
	"blade meld" : {
		name : "Blade Meld",
		classes : ["mystic"],
		source : ["UA:TMC", 27],
		psionic : true,
		level : 0,
		time : "1 bns",
		range : "Self",
		duration : "1 min",
		description : "One-handed melee weapon I'm holding merges with my hand; it can't be removed for the duration",
		descriptionFull : "As a bonus action, a one-handed melee weapon you hold becomes one with your hand. For the next minute, you can’t let go of the weapon nor can it be forced from your grasp."
	},
	"blind spot" : {
		name : "Blind Spot",
		classes : ["mystic"],
		source : ["UA:TMC", 27],
		psionic : true,
		level : 0,
		time : "1 a",
		range : "120 ft",
		duration : "1 rnd",
		save : "Wis",
		description : "1 creature save or treats me as invisible until the end of my next turn",
		descriptionFull : "As an action, you erase your image from the mind of one creature you can see within 120 feet of you; the target must succeed on a Wisdom saving throw, or you are invisible to it until the end of your next turn."
	},

	//the adaptive body discipline
	"adaptive body" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Adaptive Body",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 10],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "I don't need to eat, breathe, or sleep; I can get a long rest after 8 hours of light activity, without sleep",
		descriptionFull : "You can alter your body to match your surroundings, allowing you to withstand punishing environments. With greater psi energy, you can extend this protection to others." + PsychicFocus + "While focused on this discipline, you don't need to eat, breathe, or sleep. To gain the benefits of a long rest, you can spend 8 hours engaged in light activity, rather than sleeping during any of it.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["ab1-environmental adaptation", "ab2-adaptive shield", "ab3-energy adaptation", "ab4-energy immunity"] //array of object names that should be filled after this one on the spell sheet
	},
	"ab1-environmental adaptation" : {
		name : "Environmental Adaptation",
		nameShort : "Environmental Adapt.",
		source : ["UA:TMC", 10],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "Touch",
		duration : "1 h",
		description : "1 creature ignores the effects of extreme heat or cold (but not Fire or Cold damage)",
		descriptionFull : "As an action, you or a creature you touch ignores the effects of extreme heat or cold (but not cold or fire damage) for the next hour.",
		firstCol : 2 //power point cost
	},
	"ab2-adaptive shield" : {
		name : "Adaptive Shield",
		source : ["UA:TMC", 10],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 rea",
		range : "Self",
		duration : "1 rnd",
		description : "If taking Acid, Cold, Fire, Lightning, or Thunder damage, gain resistance to it until end of next turn",
		descriptionFull : "When you take acid, cold, fire, lightning, or thunder damage, you can use your reaction to gain resistance to damage of that type -including the triggering damage- until the end of your next turn.",
		firstCol : 3 //power point cost
	},
	"ab3-energy adaptation" : {
		name : "Energy Adaptation",
		source : ["UA:TMC", 10],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "Touch",
		duration : "Conc, 1 h",
		description : "1 creature gains resistance to either Acid, Cold, Fire, Lightning, or Thunder damage",
		descriptionFull : "As an action, you can touch one creature and give it resistance to acid, cold, fire, lightning, or thunder damage (your choice), which lasts until your concentration ends.",
		firstCol : 5 //power point cost
	},
	"ab4-energy immunity" : {
		name : "Energy Immunity",
		source : ["UA:TMC", 10],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "Touch",
		duration : "Conc, 1 h",
		description : "1 creature gains immunity to either Acid, Cold, Fire, Lightning, or Thunder damage",
		descriptionFull : "As an action, you can touch one creature and give it immunity to acid, cold, fire, lightning, or thunder damage (your choice), which lasts until your concentration ends.",
		firstCol : 7 //power point cost
	},
	
	//the aura sight discipline (contributed by Justin W.)
	"aura sight" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Aura Sight",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 10], //the number is the page number in the PDF in the PDF
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "Advantage on Wisdom (Insight) checks",
		descriptionFull : "You refocus your sight to see the energy that surrounds all creatures. You perceive auras, energy signatures that can reveal key elements of a creature’s nature." + PsychicFocus + "While focused on this discipline, you have advantage on Wisdom (Insight) checks.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["as1-asses foe", "as2-read moods", "as3-view aura", "as4-perceive the unseen"] //array of object names that should be filled after this one on the spell sheet
	},
	"as1-asses foe" : {
		name : "Asses Foe",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Sight", 
		duration : "Instantaneous",
		description : "Learn one creature's current HP total and all its immunities, resistances, and vulnerabilities",
		descriptionFull : "As a bonus action, you analyze the aura of one creature you see. You learn its current hit point total and all its immunities, resistances, and vulnerabilities.",
		firstCol : 2 //power point cost
	},
	"as2-read moods" : {
		name : "Read Moods",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Sight",
		duration : "Instantaneous",
		description : "Learn an one-word summary of the emotional state of up to 6 crea",
		descriptionFull : "As a bonus action, you learn a one-word summary of the emotional state of up to six creatures you can see, such as happy, confused, afraid, or violent.",
		firstCol : 2 //power point cost
	},
	"as3-view aura" : {
		name : "View Aura",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "Sight",
		duration : "Conc, 1 h",
		description : "Monitor 1 crea: current HP, if magic effects it, basic emotional state; adv. on Insight/Cha checks vs. it",
		descriptionFull : "As an action, you study one creature’s aura. Until your concentration ends, while you can see the target, you learn if it’s under the effect of any magical or psionic effects, its current hit point total, and its basic emotional state. While this effect lasts, you have advantage on Wisdom (Insight) and Charisma checks you make against it.",
		firstCol : 3 //power point cost
	},
	"as4-perceive the unseen" : {
		name : "Perceive the Unseen",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Sight",
		duration : "Conc, 1 min",
		description : "See all creatures, including hidden and invisible ones, regardless of lighting conditions",
		descriptionFull : "As a bonus action, you gain the ability to see auras even of invisible or hidden creatures. Until your concentration ends, you can see all creatures, including hidden and invisible ones, regardless of lighting conditions.",
		firstCol : 5 //power point cost
	},

	//the crown of rage discipline
	"crown of rage" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Crown of Rage",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 13],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "5-ft rad",
		components : "Psi-F.",
		duration : "While focused",
		description : "Any crea within range has disadvantage on melee attack rolls against targets other than me",
		descriptionFull : "You place a mote of pure fury within a creature’s mind, causing its bloodlust to overcome its senses and for it to act as you wish it to." + PsychicFocus + "While you are focused on this discipline, any enemy within 5 feet of you that makes a melee attack roll against creatures other than you does so with disadvantage.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["cr1-primal fury", "cr2-fighting words", "cr3-mindless courage", "cr4-punishing fury"] //array of object names that should be filled after this one on the spell sheet
	},
	"cr1-primal fury" : {
		name : "Primal Fury",
		source : ["UA:TMC", 13],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Instantaneous",
		save : "Cha",
		description : "1 crea save or 1d6/PP Psychic dmg, use rea to move its speed toward nearest enemy (charm effect)",
		descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must succeed on a Charisma saving throw or take 1d6 psychic damage per psi point spent on this ability and immediately use its reaction to move its speed in a straight line toward its nearest enemy. The save automatically succeeds if the target is immune to being charmed.",
		firstCol : "1-7" //power point cost
	},
	"cr2-fighting words" : {
		name : "Fighting Words",
		source : ["UA:TMC", 13],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 min",
		range : "Self",
		duration : "Conc, 10 min",
		save : "Wis",
		description : "After 1 min conversation, 1 crea save or attack one other, chosen crea for 5 rnds (charm effect)",
		descriptionFull : "If you spend 1 minute conversing with a creature, you can attempt to leave a simmering violence in its mind. At the end of the minute, you can use an action to force the creature to make a Wisdom saving throw to resist feeling violent urges against one creature you describe to it or name. The save automatically succeeds if the target is immune to being charmed. On a failed save, the target attacks the chosen creature if it sees that creature before your concentration ends, using weapons or spells against a creature it was already hostile toward or unarmed strikes against an ally or a creature it was neutral toward. Once the fight starts, it continues to attack for 5 rounds before this effect ends. This effect immediately ends if the target or any ally it can see is attacked or takes damage from any creature other than the one it has been incited against. On a successful save, the creature is unaffected and has no inkling of your attempt to bend its will.",
		firstCol : 2 //power point cost
	},
	"cr3-mindless courage" : {
		name : "Mindless Courage",
		source : ["UA:TMC", 13],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "60 ft",
		duration : "1 rnd",
		save : "Wis",
		description : "1 crea save or it can only move towards the nearest enemy it can see, or not move at all (charm effect)",
		descriptionFull : "You cause a creature's bloodlust to overcome its sense of preservation. As a bonus action, choose one creature you can see within 60 feet of you. The target must succeed on a Wisdom saving throw or, until the end of your next turn, it can’t willingly move unless its movement brings it closer to its nearest enemy that it can see. The save automatically succeeds if the target is immune to being charmed.",
		firstCol : 2 //power point cost
	},
	"cr4-punishing fury" : {
		name : "Punishing Fury",
		source : ["UA:TMC", 14],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "60 ft",
		duration : "Conc, 1 min",
		save : "Wis",
		description : "1 crea save or when it makes melee atk, all in 5 ft of it can make melee atk vs. it as rea (charm effect)",
		descriptionFull : "You cause a creature's rage to grow so hot that it attacks without heeding its own safety. As a bonus action, choose one creature you can see within 60 feet of you. The target must succeed on a Wisdom saving throw or, until your concentration ends, any creature within 5 feet of it can use a reaction to make a melee attack against it whenever the target makes a melee attack. The save automatically succeeds if the target is immune to being charmed. ",
		firstCol : 5 //power point cost
	},
};

var AllPsionicsArray, AllPsionicsObject, AddPsionicsMenu, AllPsionicClasses;