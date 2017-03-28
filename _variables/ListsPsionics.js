var PsychicFocus = "\n   " + toUni("Psychic Focus") + ": ";

//Psionic Talents/Disciplines for the Mystic
var PsionicsList = {
	//the psionic talents (with help from rabidknave)
	"beacon" : {
		name : "Beacon",
		classes : ["mystic"],
		source : ["UA:TMC", 27],
		psionic : true,
		level : 0,
		time : "1 bns",
		range : "Self",
		duration : "1 h (D)",
		description : "Your body sheds bright light 20-ft rad and dim light 20-ft, in chosen color; dismiss as a bonus action",
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
		description : "One-handed melee weapon you're holding merges with hand; it can't be removed for the duration",
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
		duration : "Next turn end",
		save : "Wis",
		description : "1 creature save or treats you as invisible until the end of your next turn",
		descriptionFull : "As an action, you erase your image from the mind of one creature you can see within 120 feet of you; the target must succeed on a Wisdom saving throw, or you are invisible to it until the end of your next turn."
	},
	"delusion" : {
		name : "Delusion",
		classes : ["mystic"],
		source : ["UA:TMC", 27],
		psionic : true,
		level : 0,
		time : "1 a",
		range : "60 ft",
		duration : "1 min",
		description : "1 crea either hears a sound (whisper-scream), or sees up to 5-ft cube object that disappears on touch",
		descriptionFull : "As an action, you plant a false belief in the mind of one creature that you can see within 60 feet of you. You can create a sound or an image. Only the target of this talent perceives the sound or image you create." + "\n   " + "If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a creature's roar, a musical instrument, or any other sound you pick. It lasts for 1 minute." + "\n   " + "If you create an object, it must fit within a 5-foot cube and can’t move or be reflective. The image can't create any effect that influences a sense other than sight. The image lasts for 1 minute, and it disappears if the creature touches it."
	},
	"energy beam" : {
		name : "Energy Beam",
		classes : ["mystic"],
		source : ["UA:TMC", 27],
		psionic : true,
		level : 0,
		time : "1 a",
		range : "90 ft",
		duration : "Instantaneous",
		save : "Dex",
		description : "1 crea save or 1d8 Acid, Cold, Fire, Lightning, or Thunder dmg; +1d8 at CL 5, 11, and 17",
		descriptionFull : "As an action, you target one creature you can see within 90 feet of you. The target must succeed on a Dexterity saving throw or take 1d8 acid, cold, fire, lightning, or thunder damage (your choice)." + "\n   " + "The talent’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)"
	},
	"light step" : {
		name : "Light Step",
		classes : ["mystic"],
		source : ["UA:TMC", 27],
		psionic : true,
		level : 0,
		time : "1 bns",
		range : "Self",
		duration : "This turn end",
		description : "Your walking speed increases by 10 ft; standing up costs 0 movement, once",
		descriptionFull : "As a bonus action, you alter your density and weight to improve your mobility. For the rest of your turn, your walking speed increases by 10 feet, and the first time you stand up this turn, you do so without expending any of your movement if your speed is greater than 0."
	},
	"mind meld" : {
		name : "Mind Meld",
		classes : ["mystic"],
		source : ["UA:TMC", 27],
		psionic : true,
		level : 0,
		time : "1 bns",
		range : "120 ft",
		duration : "This turn end",
		description : "You communicate telepathically with 1 willing crea (int > 1) and gain access to 1 memory of theirs",
		descriptionFull : "As a bonus action, you can communicate telepathically with one willing creature you can see within 120 feet of you. The target must have an Intelligence of at least 2, otherwise this talent fails and the action is wasted." + "\n   " + "This communication can occur until the end of the current turn. You don’t need to share a language with the target for it to understand your telepathic utterances, and it understands you even if it lacks a language. You also gain access to one memory of the target’s choice, gaining perfect recall of one thing it saw or did."
	},
	"mind slam" : {
		name : "Mind Slam",
		classes : ["mystic"],
		source : ["UA:TMC", 28],
		psionic : true,
		level : 0,
		time : "1 a",
		range : "60 ft",
		duration : "Instantaneous",
		save : "Con",
		description : "1 crea save or 1d6 Psychic dmg, and knocked prone if Large or smaller; +1d6 at CL 5, 11, and 17",
		descriptionFull : "As an action, you target one creature you can see within 60 feet of you. The target must succeed on a Constitution saving throw or take 1d6 force damage. If it takes any of this damage and is Large or smaller, it is knocked prone." + "\n   " + "The talent’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)"
	},
	"mind thrust" : {
		name : "Mind Thrust",
		classes : ["mystic"],
		source : ["UA:TMC", 28],
		psionic : true,
		level : 0,
		time : "1 a",
		range : "120 ft",
		duration : "Instantaneous",
		save : "Int",
		description : "1 crea save or 1d10 Psychic dmg; +1d10 at CL 5, 11, and 17",
		descriptionFull : "As an action, you target one creature you can see within 120 feet of you. The target must succeed on an Intelligence saving throw or take 1d10 psychic damage." + "\n   " + "The talent’s damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10)."
	},
	"mystic charm" : {
		name : "Mystic Charm",
		classes : ["mystic"],
		source : ["UA:TMC", 28],
		psionic : true,
		level : 0,
		time : "1 a",
		range : "120 ft",
		duration : "Next turn end",
		save : "Cha",
		description : "1 humanoid save or charmed until end of your next turn",
		descriptionFull : "As an action, you beguile one humanoid you can see within 120 feet of you. The target must succeed on a Charisma saving throw or be charmed by you until the end of your next turn."
	},
	"mystic hand" : {
		name : "Mystic Hand",
		classes : ["mystic"],
		source : ["UA:TMC", 28],
		psionic : true,
		level : 0,
		time : "1 a",
		range : "30 ft",
		duration : "This turn end",
		description : "Move 1 unattended object (up to 10 lbs) up to 30 ft, or manipulate an object",
		descriptionFull : "You can use your action to manipulate or move one object within 30 feet of you. The object can’t weigh more than 10 pounds, and you can’t affect an object being worn or carried by another creature. If the object is loose, you can move it up to 30 feet in any direction." + "\n   " + "This talent allows you to open an unlocked door, pour out a beer stein, and so on." + "\n   " + "The object falls to the ground at the end of your turn if you leave it suspended in midair."
	},
	"psychic hammer" : {
		name : "Psychic Hammer",
		classes : ["mystic"],
		source : ["UA:TMC", 28],
		psionic : true,
		level : 0,
		time : "1 a",
		range : "120 ft",
		duration : "Instantaneous",
		save : "Str",
		description : "1 crea save or 1d6 Force dmg and moved up to 10 ft in chosen direction; +1d6 at CL 5, 11, and 17",
		descriptionFull : "As an action, you try to grasp one creature you can see within 120 feet of you, with a hand crafted from telekinetic energy. The target must succeed on a Strength saving throw or take 1d6 force damage. If it takes any of this damage and is Large or smaller, you can move it up to 10 feet in a straight line in a direction of your choice. You can’t lift the target off the ground unless it is already airborne or underwater." + "\n   " + "The talent’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
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
		description : "You don't need to eat, breathe, or sleep; You can long rest with 8 hours of light activity, without sleep",
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
		duration : "Next turn end",
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
		description : "You gain advantage on Wisdom (Insight) checks",
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

	//the bestial form discipline (contributed by rabidknave)
	"bestial form" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Bestial Form",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You gain advantage on Wisdom (Animal Handling) checks",
		descriptionFull : "You transform your body, gaining traits of different beasts." + PsychicFocus + "While focused on this discipline, you have advantage on Wisdom (Animal Handling) checks.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["bf1-bestial claws", "bf2-bestial transformation", "bf3-bt - amphibious", "bf4-bt - climbing", "bf5-bt - flight", "bf6-bt - keen senses", "bf7-bt - perfect senses", "bf8-bt - swimming", "bf9-bt - tough hide"] //array of object names that should be filled after this one on the spell sheet
	},
	"bf1-bestial claws" : {
		name : "Bestial Claws",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "5 ft",
		duration : "Instantaneous",
		description : "Melee weapon attack with manifested claw, dealing 1d10/PP Slashing dmg", //the /PP has to come directly after the damage die
		descriptionFull : "You manifest long claws for an instant and make a melee weapon attack against one creature within 5 feet of you. On a hit, this attack deals 1d10 slashing damage per psi point spent.",
		firstCol : "1-7" //power point cost
	},
	"bf2-bestial transformation" : {
		name : "Bestial Transformation",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "1 hr (D)",
		description : "Alter physique to gain one or more of following effects; sum PP cost for a single use; end with bns a",
		descriptionFull : "As a bonus action, you alter your physical form to gain different characteristics. When you use this ability, you can choose one or more of the following effects. Each effect has its own psi point cost. Add them together to determine the total cost. This transformation lasts for 1 hour, until you die, or until you end it as a bonus action.",
		firstCol : "2-7" //power point cost
	},
	"bf3-bt - amphibious" : {
		name : " - Amphibious",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "",
		range : "Self",
		duration : "1 hr (D)",
		description : "You are able to breathe air and water by gaining gills",
		descriptionFull : "You gain gills; you can breathe air and water",
		firstCol : 2 //power point cost
	},
	"bf4-bt - climbing" : {
		name : " - Climbing",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "",
		range : "Self",
		duration : "1 hr (D)",
		description : "You gain climbing speed equal to your walking speed by growing tiny hooked claws",
		descriptionFull : "You grow tiny hooked claws that give you gain a climbing speed equal to your walking speed.",
		firstCol : 2 //power point cost
	},
	"bf5-bt - flight" : {
		name : " - Flight",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "",
		range : "Self",
		duration : "1 hr (D)",
		description : "You gain flying speed equal to your walking speed by sprouting wings",
		descriptionFull : "Wings sprout from your back. You gain a flying speed equal to your walking speed.",
		firstCol : 5 //power point cost
	},
	"bf6-bt - keen senses" : {
		name : " - Keen Senses",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "",
		range : "Self",
		duration : "1 hr (D)",
		description : "You gain advantage on Wisdom (Perception) checks through more sensitive eyes and ears",
		descriptionFull : "Your eyes and ears become more sensitive. You gain advantage on Wisdom (Perception) checks.",
		firstCol : 2 //power point cost
	},
	"bf7-bt - perfect senses" : {
		name : " - Perfect Senses",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "",
		range : "Self",
		duration : "1 hr (D)",
		description : "You see invisible creatures/objects within 10 ft, even when blinded, through smell",
		descriptionFull : "You gain a keen sense of smell and an instinct to detect prey. You can see invisible creatures and objects within 10 feet of you, even if you are blinded.",
		firstCol : 3 //power point cost
	},
	"bf8-bt - swimming" : {
		name : " - Swimming",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "",
		range : "Self",
		duration : "1 hr (D)",
		description : "You gain swimming speed equal to your walking speed by growing fins and webbed feet/hands",
		descriptionFull : "You gain fins and webbing between your fingers and toes; you gain a swimming speed equal to your walking speed.",
		firstCol : 2 //power point cost
	},
	"bf9-bt - tough hide" : {
		name : " - Tough Hide",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "",
		range : "Self",
		duration : "1 hr (D)",
		description : "You gain +2 bonus to AC through thicker skin",
		descriptionFull : "Your skin becomes as tough as leather; you gain a +2 bonus to AC.",
		firstCol : 2 //power point cost
	},

	//the brute force discipline (contributed by rabidknave)
	"brute force" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Brute Force",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You gain advantage on Strength (Athletics) checks",
		descriptionFull : "You augment your natural strength with psionic energy, granting you the ability to achieve incredible feats of might." + PsychicFocus + "While focused on this discipline, you have advantage on Strength (Athletics) checks.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["bf1-brute strike", "bf2-knock back", "bf3-mighty leap", "bf4-feat of strength"] //array of object names that should be filled after this one on the spell sheet
	},
	"bf1-brute strike" : {
		name : "Brute Strike",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "This turn end",
		description : "Your next melee attack during this turn deals +1d6/PP damage, of the same type as the melee attack",
		descriptionFull : "As a bonus action, you gain a bonus to your next damage roll against a target you hit with a melee attack during the current turn. The bonus equals +1d6 per psi point spent, and the bonus damage is the same type as the attack. If the attack has more than one damage type, you choose which one to use for the bonus damage.",
		firstCol : "1-7" //power point cost
	},
	"bf2-knock back" : {
		name : "Knock Back",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 rea",
		range : "Self",
		duration : "Instantaneous",
		save : "Str",
		description : "Use after melee atk hit; crea hit saves or move 10 ft/PP away; if it then hits obj, takes 1d6/PP Bludg. dmg", //added the damage
		descriptionFull : "When you hit a target with a melee attack, you can activate this ability as a reaction. The target must succeed on a Strength saving throw or be knocked 10 feet away from you per psi point spent. The target moves in a straight line. If it hits an object, this movement immediately ends and the target takes 1d6 bludgeoning damage per psi point spent.",
		firstCol : "1-7" //power point cost
	},
	"bf3-mighty leap" : {
		name : "Mighty Leap",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "Move",
		range : "Self",
		duration : "Instantaneous",
		description : "As part of your movement, jump 20 ft/PP in any direction",
		descriptionFull : "As part of your movement, you jump in any direction up to 20 feet per psi point spent.",
		firstCol : "1-7" //power point cost
	},
	"bf4-feat of strength" : {
		name : "Feat of Strength",
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Next turn end",
		description : "You gain +5 bonus to Strength checks until the end of next turn",
		descriptionFull : "As a bonus action, you gain a +5 bonus to Strength checks until the end of your next turn.",
		firstCol : 2 //power point cost
	},

	//the celerity discipline (contributed by rabidknave)
	"celerity" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Celerity",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "Your walking speed increases by 10 ft",
		descriptionFull : "You channel psionic power into your body, honing your reflexes and agility to an incredible degree. The world seems to slow down while you continue to move as normal." + PsychicFocus + "While focused on this discipline, your walking speed increases by 10 feet.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["c1-rapid step", "c2-agile defense", "c3-blur of motion", "c4-surge of speed", "c5-surge of action"] //array of object names that should be filled after this one on the spell sheet
	},
	"c1-rapid step" : {
		name : "Rapid Step",
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "This turn end",
		description : "Your walking, swim, and climb speeds increases by 10 ft/PP; doesn't grant new movement modes",
		descriptionFull : "As a bonus action, you increase your walking speed by 10 feet per psi point spent until the end of the current turn. If you have a climbing or swimming speed, this increase applies to that speed as well.",
		firstCol : "1-7" //power point cost
	},
	"c2-agile defense" : {
		name : "Agile Defense",
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Instantaneous",
		description : "You can take the Dodge action now, as part of using this power",
		descriptionFull : "As a bonus action, you take the Dodge action.",
		firstCol : 2 //power point cost
	},
	"c3-blur of motion" : {
		name : "Blur of Motion",
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "Self",
		duration : "This turn end",
		description : "Your invisible while moving during the current turn",
		descriptionFull : "As an action, you cause yourself to be invisible during any of your movement during the current turn.",
		firstCol : 2 //power point cost
	},
	"c4-surge of speed" : {
		name : "Surge of Speed",
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "This turn end",
		description : "You don't provoke opportunity attacks and gain a climbing speed equal to your walking speed",
		descriptionFull : "As a bonus action, you gain two benefits until the end of the current turn: you don’t provoke opportunity attacks, and you have a climbing speed equal to your walking speed.",
		firstCol : 2 //power point cost
	},
	"c5-surge of action" : {
		name : "Surge of Action",
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Instantaneous",
		description : "You can take either the Dash action or make one weapon attack now, as part of using this power",
		descriptionFull : "As a bonus action, you can Dash or make one weapon attack.",
		firstCol : 5 //power point cost
	},

	//the corrosive metabolism discipline (contributed by rabidknave)
	"corrosive metabolism" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Corrosive Metabolism",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 11],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You gain resistance to Acid and Poison damage",
		descriptionFull : "Your control over your body allows you to deliver acid or poison attacks." + PsychicFocus + "While focused on this discipline, you have resistance to acid and poison damage.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["cm1-corrosive touch", "cm2-venom strike", "cm3-acid spray", "cm4-breath of the black dragon", "cm5-breath of the green dragon"] //array of object names that should be filled after this one on the spell sheet
	},
	"cm1-corrosive touch" : {
		name : "Corrosive Touch",
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "Touch", //use "Touch" instead of "5 ft" when its about reach
		duration : "Instantaneous",
		save : "Dex",
		description : "1 crea 1d10/PP Acid damage; save halves", // use "; save halves" for this kind of situations
		descriptionFull : "As an action, you deliver a touch of acid to one creature within your reach. The target must make a Dexterity saving throw, taking 1d10 acid damage per psi point spent on a failed save, or half as much damage on a successful one.",
		firstCol : "1-7" //power point cost
	},
	"cm2-venom strike" : {
		name : "Venom Strike",
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "30 ft",
		duration : "Instantaneous",
		save : "Con",
		description : "1 crea 1d6/PP Poison damage; save halves; if save failed, poisoned until end of your next turn",
		descriptionFull : "As an action, you create a poison spray that targets one creature you can see within 30 feet of you. The target must make a Constitution saving throw. On a failed save, it takes 1d6 poison damage per psi point spent and is poisoned until the end of your next turn. On a successful save, the target takes half as much damage and isn’t poisoned.",
		firstCol : "1-7" //power point cost
	},
	"cm3-acid spray" : {
		name : "Acid Spray",
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 rea",
		range : "5 ft",
		duration : "Instantaneous",
		description : "Use after you take Piercing or Slashing damage; all creatures in range take 2d6 Acid damage",
		descriptionFull : "As a reaction when you take piercing or slashing damage, you cause acid to spray from your wound; each creature within 5 feet of you takes 2d6 acid damage.",
		firstCol : 2 //power point cost
	},
	"cm4-breath of the black dragon" : {
		name : "Breath of the Black Dragon",
		nameShort : "Breath o/t Black Dragon",
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60-ft line", //don't forget the hyphen for all things like this, like "20-ft rad", "30-ft cube", "40-ft cone", etc.
		duration : "Instantaneous",
		save : "Con",
		description : "60-ft long 5-ft wide line all creatures 6d6(+1d6/extra PP) Acid dmg; save halves",
		descriptionFull : "You exhale a wave of acid in a 60-foot line that is 5 feet wide. Each creature in the line must make a Constitution saving throw, taking 6d6 acid damage on a failed save, or half as much on a successful one. You can increase the damage by 1d6 per additional psi point spent on it.",
		firstCol : "5-7" //power point cost
	},
	"cm5-breath of the green dragon" : {
		name : "Breath of the Green Dragon",
		nameShort : "Breath o/t Green Dragon",
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "90-ft cone",
		duration : "Instantaneous",
		save : "Con",
		description : "All creatures 10d6 poison damage; save halves",
		descriptionFull : "You exhale a cloud of poison in a 90-foot cone. Each creature in the line must make a Constitution saving throw, taking 10d6 poison damage on a failed save, or half as much damage on a successful one.",
		firstCol : 7 //power point cost
	},

	//the crown of despair discipline (contributed by rabidknave)
	"crown of despair" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Crown of Despair",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "5-ft rad",
		components : "Psi-F.",
		duration : "While focused",
		description : "You gain advantage on Charisma (Intimidation) checks",
		descriptionFull : "You have learned to harvest seeds of despair in a creature’s psyche, wracking it with self-doubt and inaction." + PsychicFocus + "While focused on this discipline, you have advantage on Charisma (Intimidation) checks.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["cd1-crowned in sorrow", "cd2-call to inaction", "cd3-visions of despair", "cd4-dolorous mind"] //array of object names that should be filled after this one on the spell sheet
	},
	"cd1-crowned in sorrow" : {
		name : "Crowned in Sorrow", //empty for all things that are part of a "dependencies" of another object
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Next turn start",
		save : "Cha",
		description : "1 crea 1d8/PP Psychic dmg and can't take reactions; save halves damage and normal reactions",
		descriptionFull : "As an action, one creature you can see within 60 feet of you must make a Charisma saving throw. On a failed save, it takes 1d8 psychic damage per psi point spent, and it can’t take reactions until the start of its next turn. On a successful save, it takes half as much damage.",
		firstCol : "1-7" //power point cost
	},
	"cd2-call to inaction" : {
		name : "Call to Inaction", //empty for all things that are part of a "dependencies" of another object
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 min",
		range : "Self",
		duration : "Conc, 10 min",
		save : "Wis",
		description : "After 1 min conversation, 1 crea save or incapacitated; ends if it or its ally is attacked (charm effect)",
		descriptionFull : "If you spend 1 minute conversing with a creature, you can attempt to seed it with overwhelming ennui. At the end of the minute, you can use an action to force the creature to make a Wisdom saving throw. The save automatically succeeds if the target is immune to being charmed. On a failed save, it sits and is incapacitated until your concentration ends. This effect immediately ends if the target or any ally it can see is attacked or takes damage. On a successful save, the creature is unaffected and has no inkling of your attempt to bend its will.",
		firstCol : 2 //power point cost
	},
	"cd3-visions of despair" : {
		name : "Visions of Despair", //empty for all things that are part of a "dependencies" of another object
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "1 rnd",
		save : "Cha",
		description : "1 crea 3d6(+1d6/extra PP) Psychic dmg and speed reduced to 0; save halves and no speed reduction",
		descriptionFull : "As an action, you force one creature you can see within 60 feet of you to make a Charisma saving throw. On a failed save, it takes 3d6 psychic damage, and its speed is reduced to 0 until the end of its next turn. On a successful save, it takes half as much damage. You can increase the damage by 1d6 per additional psi point spent on it.",
		firstCol : "3-7" //power point cost
	},
	"cd4-dolorous mind" : {
		name : "Dolorous Mind",
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 min",
		save : "Cha",
		description : "1 crea save or incapacitated and speed 0; save at end of each turn",
		descriptionFull : "As an action, you choose one creature you can see within 60 feet of you. It must succeed on a Charisma saving throw, or it is incapacitated and has a speed of 0 until your concentration ends. It can repeat this saving throw at the end of each of its turns, ending the effect on itself on a success.",
		firstCol : 5 //power point cost
	},

	//the crown of disgust discipline
	"crown of disgust" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Crown of Disgust",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 13],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "5-ft rad",
		components : "Psi-F.",
		duration : "While focused",
		description : "5-ft rad around you is difficult terrain for creatures that aren't immune to being frightened",
		descriptionFull : "You cause a creature to be flooded with emotions of disgust." + PsychicFocus + "While you are focused on this discipline, the area in a 5-foot radius around you is difficult terrain for any enemy that isn’t immune to being frightened.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["cd1-eye of horror", "cd2-wall of repulsion", "cd3-visions of disgust", "cd4-world of horror"] //array of object names that should be filled after this one on the spell sheet
	},
	"cd1-eye of horror" : {
		name : "Eye of Horror",
		source : ["UA:TMC", 13],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Next turn end",
		save : "Cha",
		description : "1 crea save or 1d6/PP Psychic damage and can't move closer; save halves and no movement restriction",
		descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must make a Charisma saving throw. On a failed save, it takes 1d6 psychic damage per psi point spent and can’t move closer to you until the end of its next turn. On a successful save, it takes half as much damage.",
		firstCol : "1-7" //power point cost
	},
	"cd2-wall of repulsion" : {
		name : "Wall of Repulsion",
		source : ["UA:TMC", 13],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 10 min",
		save : "Wis",
		description : "Up to 30\u00D71\u00D710 ft (l\u00D7w\u00D7h) invisible wall of energy; save to move through it, even for unwilling move",
		description : "Up to 9\u00D70,3\u00D73 m (l\u00D7w\u00D7h) invisible wall of energy; save to move through it, even for unwilling move",
		descriptionFull : "As an action, you create an invisible, insubstantial wall of energy within 60 feet of you that is up to 30 feet long, 10 feet high, and 1 foot thick. The wall lasts until your concentration ends. Any creature attempting to move through it must make a Wisdom saving throw. On a failed save, a creature can’t move through the wall until the start of its next turn. On a successful save, the creature can pass through it. A creature must make this save whenever it attempts to pass through the wall, whether willingly or unwillingly.",
		firstCol : 3 //power point cost
	},
	"cd3-visions of disgust" : {
		name : "Visions of Disgust",
		source : ["UA:TMC", 13],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 min",
		save : "Wis",
		description : "1 crea save or 5d6 Psychic dmg (half on save) & 1d6 Psychic dmg per crea within 5 ft at its turn end",
		descriptionFull : "You cause a creature to regard all other beings as horrid, alien entities. As an action, choose one creature you can see within 60 feet of you. The target must make a Wisdom saving throw. On a failed save, it takes 5d6 psychic damage, and until your concentration ends, it takes 1d6 psychic damage per creature within 5 feet of it at the end of each of its turns. On a successful save, the target takes only half the initial damage and suffers none of the other effects.",
		firstCol : 5 //power point cost
	},
	"cd4-world of horror" : {
		name : "World of Horror",
		source : ["UA:TMC", 13],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 min",
		save : "Cha",
		description : "6 crea 8d6 Psychic dmg, frightened, \u0026 do only melee atks; save halves, no other effects; save each rnd",
		descriptionFull : "As an action, choose up to six creatures within 60 feet of you. Each target must make a Charisma saving throw. On a failed save, a target takes 8d6 psychic damage, and it is frightened until your concentration ends. On a successful save, a target takes half as much damage." + "\n   " + "While frightened by this effect, a target’s speed is reduced to 0, and the target can use its action, and any bonus action it might have, only to make melee attacks. The frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
		firstCol : 7 //power point cost
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
		description : "Any crea within range has disadvantage on melee attack rolls against targets other than you",
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
		duration : "Next turn end",
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
		descriptionFull : "You cause a creature's rage to grow so hot that it attacks without heeding its own safety. As a bonus action, choose one creature you can see within 60 feet of you. The target must succeed on a Wisdom saving throw or, until your concentration ends, any creature within 5 feet of it can use a reaction to make a melee attack against it whenever the target makes a melee attack. The save automatically succeeds if the target is immune to being charmed.",
		firstCol : 5 //power point cost
	},

	//the diminution discipline (contributed by mattohara & TheBob427)
	"diminution" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Diminution",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 14],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You have advantage on Dexterity (Stealth) checks",
		descriptionFull : "You manipulate the matter that composes your body, drastically reducing your size without surrendering any of your might." + PsychicFocus + "While focused on this discipline, you have advantage on Dexterity (Stealth) checks.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["d1-miniature form", "d2-toppling shift", "d3-sudden shift", "d4-microscopic form"] //array of object names that should be filled after this one on the spell sheet
	},
	"d1-miniature form" : {
		name : "Miniature Form",
		source : ["UA:TMC", 14],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Conc, 10 min",
		description : "Become Tiny, gain +5 to Dex (Stealth) and can fit through gaps of up to 6\" without squeezing",
		descriptionMetric : "Become Tiny, gain +5 to Dex (Stealth) and can fit through gaps of up to 15 cm without squeezing",
		descriptionFull : "As a bonus action, you become Tiny until your concentration ends. While this size, you gain a +5 bonus to Dexterity (Stealth) checks and can move through gaps up to 6 inches across without squeezing.",
		firstCol : 2 //power point cost
	},
	"d2-toppling shift" : {
		name : "Toppling Shift",
		source : ["UA:TMC", 14],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "5 ft",
		duration : "Instantaneous",
		save : "Str",
		description : "1 creature save or be knocked prone",
		descriptionFull : "As a bonus action, you shift to an incredibly small size and then suddenly return to normal, sending an opponent flying backward. Choose one creature you can see within 5 feet of you. It must succeed on a Strength saving throw or be knocked prone.",
		firstCol : 2 //power point cost
	},
	"d3-sudden shift" : {
		name : "Sudden Shift",
		source : ["UA:TMC", 14],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 rea",
		range : "Self",
		duration : "Instantaneous",
		description : "Use when hit by an attack; it misses, and you move up to 5 ft without provoking opportunity attacks",
		descriptionFull : "As a reaction when you are hit by an attack, you shift down to minute size to avoid the attack. The attack misses, and you move up to 5 feet without provoking opportunity attacks before returning to normal size.",
		firstCol : 5 //power point cost
	},
	"d4-microscopic form" : {
		name : "Microscopic Form",
		source : ["UA:TMC", 14],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Conc, 10 min",
		description : "Become diminutive, gain +5 AC, +10 to Dex (Stealth), can fit through 1\" gaps, but can't use wea atks",
		descriptionMetric : "Become diminutive, gain +5 AC, +10 to Dex (Stealth), can fit through 2,5 cm gaps, can't use wea atks",
		descriptionFull : "As a bonus action, you become smaller than Tiny until your concentration ends. While this size, you gain a +10 bonus to Dexterity (Stealth) checks and a +5 bonus to AC, you can move through gaps up to 1 inch across without squeezing, and you can’t make weapon attacks.",
		firstCol : 7 //power point cost
	},

	//the giant growth discipline (contributed by mattohara & TheBob427)
	"giant growth" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Giant Growth",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 14],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Touch",
		components : "Psi-F.",
		duration : "While focused",
		description : "Your reach increases by 5 ft",
		descriptionFull : "You infuse yourself with psionic energy to grow to tremendous size, bolstering your strength and durability." + PsychicFocus + "While focused on this discipline, your reach increases by 5 feet.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["gg1-ogre form", "gg2-giant form"] //array of object names that should be filled after this one on the spell sheet
	},
	"gg1-ogre form" : {
		name : "Ogre Form",
		source : ["UA:TMC", 14],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Conc, 1 min",
		description : "10 temp. hp; for duration: become Large, +5 ft reach, melee attacks deal +1d4 Bludgeoning dmg",
		descriptionFull : "As a bonus action, you gain 10 temporary hit points. In addition, until your concentration ends, your melee weapon attacks deal an extra 1d4 bludgeoning damage on a hit, and your reach increases by 5 feet. If you’re smaller than Large, you also become Large for the duration.",
		firstCol : 2 //power point cost
	},
	"gg2-giant form" : {
		name : "Giant Form",
		source : ["UA:TMC", 14],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Conc, 1 min",
		description : "30 temp. hp; for duration: become Huge, +10 ft reach, melee attacks deal +2d6 Bludgeoning dmg",
		descriptionFull : "As a bonus action, you gain 30 temporary hit points. In addition, until your concentration ends, your melee weapon attacks deal an extra 2d6 bludgeoning damage on a hit, and your reach increases by 10 feet. If you’re smaller than Huge, you also become Huge for the duration.",
		firstCol : 7 //power point cost
	},

	//the intellect fortress discipline (contributed by TheBob427)
	"intellect fortress" : {
		name : "Intellect Fortress",
		classes : ["mystic"],
		source : ["UA:TMC", 14],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F",
		duration : "While focused",
		description : "You gain resistance to Psychic damage",
		descriptionFull : "You forge an indomitable wall of psionic energy around your mind-one that allows you to launch counterattacks against your opponents." + PsychicFocus + "While focused on this discipline, you have resistance to psychic damage.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["if1-psychic backlash", "if2-psychic parry", "if3-psychic redoubt"] //array of object names that should be filled after this one on the spell sheet
	},
	"if1-psychic backlash" : {
		name : "Psychic Backlash",
		source : ["UA:TMC", 14],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 rea",
		range : "Sight",
		duration : "Instantaneous",
		description : "You impose dis. on an attack roll vs. you; if you're hit anyway, the attacker takes 2d10 Psychic damage",
		descriptionFull : "As a reaction, you can impose disadvantage on an attack roll against you if you can see the attacker. If the attack still hits you, the attacker takes 2d10 psychic damage.",
		firstCol : 2 //power point cost
	},
	"if2-psychic parry" : {
		name : "Psychic Parry",
		source : ["UA:TMC", 14],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 rea",
		range : "Self",
		duration : "Instantaneous",
		description : "Add +1/PP to the result of an Int, Wis, or Cha save; use after rolling, but before knowing if successful",
		descriptionFull : "As a reaction when you make an Intelligence, a Wisdom, or a Charisma saving throw, you gain a +1 bonus to that saving throw for each psi point you spend on this ability. You can use this ability after rolling the die but before suffering the results.",
		firstCol : "1-7" //power point cost
	},
	"if3-psychic redoubt" : {
		name : "Psychic Redoubt",
		source : ["UA:TMC", 14],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "30 ft",
		duration : "Conc, 10 min",
		description : "Any creatures in range gain resistance to Psychic damage and advantage on Int, Wis, and Cha saves",
		descriptionFull : "As an action, you create a field of protective psychic energy. Choose any number of creatures within 30 feet of you. Until your concentration ends, each target has resistance to psychic damage and advantage on Intelligence, Wisdom, and Charisma saving throws.",
		firstCol : 5 //power point cost
	},

	//the iron durability discipline (contributed by mattohara)
	"iron durability" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Iron Durability",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 15],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You gain a +1 bonus to AC",
		descriptionFull : "You transform your body to become a living metal, allowing you to shrug off attacks that would cripple weaker creatures." + PsychicFocus + "While focused on this discipline, you gain a +1 bonus to AC.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["id1-iron hide", "id2-steel hide", "id3-iron resistance"] //array of object names that should be filled after this one on the spell sheet
	},
	"id1-iron hide" : {
		name : "Iron Hide",
		source : ["UA:TMC", 15],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 rea",
		range : "Self",
		duration : "Next turn end",
		description : "You gain +1/PP AC; use when hit by attack; bonus works against triggering attack",
		descriptionFull : "As a reaction when you are hit by an attack, you gain a +1 bonus to AC for each psi point you spend on this ability. The bonus lasts until the end of your next turn. This bonus applies against the triggering attack.",
		firstCol : "1-7" //power point cost
	},
	"id2-steel hide" : {
		name : "Steel Hide",
		source : ["UA:TMC", 15],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Next turn end",
		description : "You gain resistance to Bludgeoning, Piercing, and Slashing damage",
		descriptionFull : "As a bonus action, you gain resistance to bludgeoning, piercing, and slashing damage until the end of your next turn.",
		firstCol : 2 //power point cost
	},
	"id3-iron resistance" : {
		name : "Iron Resistance",
		source : ["UA:TMC", 15],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "Self",
		duration : "Conc, 1 h",
		description : "You gain resistance to bludgeoning, piercing, or slashing (your choice)",
		descriptionFull : "As an action, you gain resistance to bludgeoning, piercing, or slashing damage (your choice), which lasts until your concentration ends.",
		firstCol : 7 //power point cost
	},

	//the mantle of awe discipline (contributed by mattohara)
	"mantle of awe" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Mantle of Awe",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 15],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You gain a bonus to Charisma checks, bonus equals half you Intelligence modifier (min 1)",
		descriptionFull : "You learn to use psionic energy to manipulate others with a subtle combination of psi and your own, natural charm." + PsychicFocus + "While focused on this discipline, you gain a bonus to Charisma checks. The bonus equals half your Intelligence modifier (minimum of +1).",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["moa1-charming presence", "moa2-center of attention", "moa3-invoke awe"] //array of object names that should be filled after this one on the spell sheet
	},
	"moa1-charming presence" : {
		name : "Charming Presence",
		source : ["UA:TMC", 15],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "30 ft",
		duration : "10 min",
		description : "2d8/PP hp of conscious, not in combat, not immune to charm crea charmed; use hp max, not current",
		descriptionFull : "As an action, you exert an aura of sympathetic power. Roll 2d8 per psi point spent on this ability; the total is how many hit points worth of creatures this option can affect. Creatures within 30 feet of you are affected in ascending order of their hit point maximums, ignoring incapacitated creatures, creatures immune to being charmed, and creatures engaged in combat." + "\n   " + "Starting with the creature that has the lowest hit point maximum, each creature affected by this option is charmed by you for 10 minutes, regarding you as a friendly acquaintance. Subtract each creature’s hit point maximum from the total before moving on to the next creature. A creature’s hit point maximum must be equal to or less than the remaining total for that creature to be affected.",
		firstCol : "1-7" //power point cost
	},
	"moa2-center of attention" : {
		name : "Center of Attention",
		source : ["UA:TMC", 15],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 min",
		save : "Cha",
		description : "1 crea save or all other creatures are invisible to it; ends if it leaves your sight/earshot or takes dmg",
		descriptionFull : "As an action, you exert an aura of power that grabs a creature's attention. Choose one creature you can see within 60 feet of you. It must make a Charisma saving throw. On a failed save, the creature is so thoroughly distracted by you that all other creatures are invisible to it until your concentration ends. This effect ends if the creature can no longer see or hear you or if it takes damage.",
		firstCol : 2 //power point cost
	},
	"moa3-invoke awe" : {
		name : "Invoke Awe",
		source : ["UA:TMC", 15],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 10 min",
		save : "Int",
		description : "5 crea save or charmed, obey verbal commands; no self harm; will atk crea that atk you; save each rnd",
		descriptionFull : "As an action, you exert an aura that inspires awe in others. Choose up to 5 creatures you can see within 60 feet of you. Each target must succeed on an Intelligence saving throw or be charmed by you until your concentration ends. While charmed, the target obeys all your verbal commands to the best of its ability and without doing anything obviously self-destructive. The charmed target will attack only creatures that it has seen attack you since it was charmed or that it was already hostile toward. At the end of each of its turns, it can repeat the saving throw, ending the effect on itself on a success.",
		firstCol : 7 //power point cost
	},

	//the mantle of command discipline
	"mantle of command" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Mantle of Command",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 15],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "When ending a turn you didn't move in, use your rea to have 1 ally within 30 ft move half its speed",
		descriptionFull : "You exert an aura of trust and authority, enhancing the coordination among your allies." + PsychicFocus + "While focused on this discipline, when you end your turn and didn’t move during it, you can use your reaction to allow one ally you can see within 30 feet of you to move up to half their speed, following a path of your choice. To move in this way, the ally mustn’t be incapacitated.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["mc1-coordinated movement", "mc2-commander's sight", "mc3-command to strike", "mc4-strategic mind", "mc5-overwhelming attack"] //array of object names that should be filled after this one on the spell sheet
	},
	"mc1-coordinated movement" : {
		name : "Coordinated Movement",
		source : ["UA:TMC", 15],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "60 ft",
		duration : "Instantaneous",
		description : "Up to 5 allies you can see can use their reaction to move half their speed, following a path you choose",
		descriptionFull : "As a bonus action, choose up to five allies you can see within 60 feet of you. Each of those allies can use their reaction to move up to half their speed, following a path of your choice.",
		firstCol : 2 //power point cost
	},
	"mc2-commander's sight" : {
		name : "Commander's Sight",
		source : ["UA:TMC", 15],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 rnd",
		description : "You mark 1 crea; until the start of your next turn, your allies have adv. on attacks vs. it",
		descriptionFull : "As an action, choose one creature you can see within 60 feet of you. Until the start of your next turn, your allies have advantage on attack rolls against that target.",
		firstCol : 2 //power point cost
	},
	"mc3-command to strike" : {
		name : "Command to Strike",
		source : ["UA:TMC", 15],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Instantaneous",
		description : "1 ally you can see can use their reaction to take the Attack action, with you choosing the targets",
		descriptionFull : "As an action, choose one ally you can see within 60 feet of you. That ally can use their reaction to immediately take the Attack action. You choose the targets.",
		firstCol : 3 //power point cost
	},
	"mc4-strategic mind" : {
		name : "Strategic Mind",
		source : ["UA:TMC", 15],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 min",
		description : "1 ally can, on its turn, either add 1d4 to its attack rolls or take Dash or Disengage as a bonus action",
		descriptionFull : "As an action, you exert an aura of trust and command that unites your allies into a cohesive unit. Until your concentration ends, any ally within 60 feet of you on their turn can, as a bonus action, take the Dash or Disengage action or roll a d4 and add the number rolled to each attack roll they make that turn.",
		firstCol : 5 //power point cost
	},
	"mc5-overwhelming attack" : {
		name : "Overwhelming Attack",
		source : ["UA:TMC", 15],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Instantaneous",
		description : "Up to 5 allies you see can use their reactions to take the Attack action, with you choosing the targets",
		descriptionFull : "As an action, choose up to five allies you can see within 60 feet of you. Each of those allies can use their reaction to take the Attack action. You choose the targets of the attacks.",
		firstCol : 7 //power point cost
	},

	//the mantle of courage discipline
	"mantle of courage" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Mantle of Courage",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 16],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You and allies within 10 ft of you that can see you have advantage on saves vs. being frightened",
		descriptionFull : "You focus your mind on courage, radiating confidence and bravado to your allies." + PsychicFocus + "While focused on this discipline, you and allies within 10 feet of you who can see you have advantage on saving throws against being frightened.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["mc1-incite courage", "mc2-aura of victory", "mc3-pillar of confidence"] //array of object names that should be filled after this one on the spell sheet
	},
	"mc1-incite courage" : {
		name : "Incite Courage",
		source : ["UA:TMC", 16],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "60 ft",
		duration : "Instantaneous",
		description : "Up to 6 creatures are no longer frightened",
		descriptionFull : "As a bonus action, choose up to six creatures you can see within 60 feet of you. If any of those creatures is frightened, that condition ends on that creature.",
		firstCol : 2 //power point cost
	},
	"mc2-aura of victory" : {
		name : "Aura of Victory",
		source : ["UA:TMC", 16],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "30 ft",
		duration : "Conc, 10 min",
		description : "When an enemy you can see is reduced to 0 hp, you and allies within range gain 2/PP temporary hp",
		descriptionFull : "As a bonus action, you project psionic energy until your concentration ends. The energy fortifies you and your allies when your enemies are felled; whenever an enemy you can see is reduced to 0 hit points, you and each of your allies within 30 feet of you gain temporary hit points equal to double the psi points spent to activate this effect.",
		firstCol : "1-7" //power point cost
	},
	"mc3-pillar of confidence" : {
		name : "Pillar of Confidence",
		source : ["UA:TMC", 16],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Next turn end",
		description : "You \u0026 up to 5 crea gain, on their turn, a special action to either make 1 wea atk, Dash, or Disengage",
		descriptionFull : "As an action, you and up to five creatures you can see within 60 feet of you each gain one extra action to use on their individual turns. The action goes away if not used before the end of your next turn. the action can be used only to make one weapon attack or to take the Dash or Disengage action.",
		firstCol : 6 //power point cost
	},

	//the mantle of fear discipline
	"mantle of fear" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Mantle of Fear",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 16],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You gain advantage on Charisma (Intimidation) checks",
		descriptionFull : "You tap into a well of primal fear and turn yourself into a beacon of terror to your enemies." + PsychicFocus + "While focused on this discipline, you have advantage on Charisma (Intimidation) checks.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["mf1-incite fear", "mf2-unsettling aura", "mf3-incite panic"] //array of object names that should be filled after this one on the spell sheet
	},
	"mf1-incite fear" : {
		name : "Incite Fear",
		source : ["UA:TMC", 16],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 min",
		save : "Wis",
		description : "1 crea save or be frightened of you; repeat save each turn when out of line of sight",
		descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must succeed on a Wisdom saving throw or become frightened of you until your concentration ends. Whenever the frightened target ends its turn in a location where it can’t see you, it can repeat the saving throw, ending the effect on itself on a success.",
		firstCol : 2 //power point cost
	},
	"mf2-unsettling aura" : {
		name : "Unsettling Aura",
		source : ["UA:TMC", 16],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "60 ft",
		duration : "Conc, 1 h",
		description : "All crea in range that can see you move only half speed when moving towards you (frightening effect)",
		descriptionFull : "As a bonus action, you cloak yourself in unsettling psychic energy. Until your concentration ends, any enemy within 60 feet of you that can see you must spend 1 extra foot of movement for every foot it moves toward you. A creature ignores this effect if immune to being frightened.",
		firstCol : 3 //power point cost
	},
	"mf3-incite panic" : {
		name : "Incite Panic",
		source : ["UA:TMC", 16],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "90 ft",
		duration : "Conc, 1 min",
		save : "Wis",
		description : "8 crea save each rnd or frightened and spend turn on random move or melee atk; 3 saves ends; see B",
		descriptionFull : "As an action, choose up to eight creatures you can see within 90 feet of you that can see you. At the start of each of a target’s turns before your concentration ends, the target must make a Wisdom saving throw. On a failed save, the target is frightened until the start of its next turn, and you roll a die. If you roll an odd number, the frightened target moves half its speed in a random direction and takes no action on that turn, other than to scream in terror. If you roll an even number, the frightened target makes one melee attack against a random target within its reach. If there is no such target, it moves half its speed in a random direction and takes no action on that turn. This effect ends on a target if it succeeds on three saving throws against it.",
		firstCol : 5 //power point cost
	},

	//the mantle of fury discipline
	"mantle of fury" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Mantle of Fury",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 16],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You and allies within 10 ft at start of your turn gain +5 ft walking speed for that turn",
		descriptionFull : "You allow the primal fury lurking deep within your mind to burst forth, catching you and your allies in an implacable bloodthirst." + PsychicFocus + "While focused on this discipline in combat, you and any ally who starts their turn within 10 feet of you gains a 5-foot increase to their walking speed during that turn.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["mf1-incite fury", "mf2-mindless charge", "mf3-aura of bloodletting", "mf4-overwhelming fury"] //array of object names that should be filled after this one on the spell sheet
	},
	"mf1-incite fury" : {
		name : "Incite Fury",
		source : ["UA:TMC", 16],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "60 ft",
		duration : "Conc, 1 min",
		description : "3 creatures can add 1d4 to the damage of melee weapon attacks during the duration",
		descriptionFull : "As a bonus action, choose up to three allies you can see within 60 feet of you (you can choose yourself in place of one of the allies). Until your concentration ends, each target can roll a d4 when rolling damage for a melee weapon attack and add the number rolled to the damage roll.",
		firstCol : 2 //power point cost
	},
	"mf2-mindless charge" : {
		name : "Mindless Charge",
		source : ["UA:TMC", 16],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "60 ft",
		duration : "Instantaneous",
		description : "3 creatures can use their reactions to move their speed straight towards the nearest enemy",
		descriptionFull : "As a bonus action, choose up to three creatures you can see within 60 feet of you. Each target can immediately use its reaction to move up to its speed in a straight line toward its nearest enemy.",
		firstCol : 2 //power point cost
	},
	"mf3-aura of bloodletting" : {
		name : "Aura of Bloodletting",
		source : ["UA:TMC", 16],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "60 ft",
		duration : "Conc, 1 min",
		description : "You and all creatures within range during the duration have advantage on melee attack rolls",
		descriptionFull : "As a bonus action, you unleash an aura of rage. Until your concentration ends, you and any creature within 60 feet of you has advantage on melee attack rolls.",
		firstCol : 3 //power point cost
	},
	"mf4-overwhelming fury" : {
		name : "Overwhelming Fury",
		source : ["UA:TMC", 16],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 min",
		save : "Cha",
		description : "1 creature save or it can use its actions only to make melee attacks; save at the end of each of its turns",
		descriptionFull : "As an action, you flood rage into one creature you can see within 60 feet of you. The target must succeed on a Charisma saving throw, or it can use its actions only to make melee attacks until your concentration ends. It can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
		firstCol : 5 //power point cost
	},

	//the mantle of joy discipline
	"mantle of joy" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Mantle of Joy",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 17],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You gain advantage on Charisma (Persuasion) checks",
		descriptionFull : "You tap into the joy within you, radiating it outward in soothing, psychic energy that brings hope and comfort to creatures around you." + PsychicFocus + "While focused on this discipline, you have advantage on Charisma (Persuasion) checks.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["mj1-soothing presence", "mj2-comforting aura", "mj3-aura of jubilation", "mj4-beacon of recovery"] //array of object names that should be filled after this one on the spell sheet
	},
	"mj1-soothing presence" : {
		name : "Soothing Presence",
		source : ["UA:TMC", 17],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "60 ft",
		duration : "Instantaneous",
		description : "3 creatures gain 3/PP temporary hit points",
		descriptionFull : "As a bonus action, choose up to three creatures you can see within 60 feet of you. Each target gains 3 temporary hit points per psi point spent on this effect.",
		firstCol : "1-7" //power point cost
	},
	"mj2-comforting aura" : {
		name : "Comforting Aura",
		source : ["UA:TMC", 17],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Sight",
		duration : "Conc, 1 min",
		description : "3 creatures can add 1d4 on every saving throw during the duration",
		descriptionFull : "As a bonus action, choose up to three allies you can see (you can choose yourself in place of one of the allies). Until your concentration ends, each target can roll a d4 when making a saving throw and add the number rolled to the total.",
		firstCol : 2 //power point cost
	},
	"mj3-aura of jubilation" : {
		name : "Aura of Jubilation",
		source : ["UA:TMC", 17],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "60 ft",
		duration : "Conc, 1 min",
		description : "All creatures within range that can see you have disadvantage on Perception and Investigation checks",
		descriptionFull : "As a bonus action, you radiate a distracting mirth until your concentration ends. Each creature within 60 feet of you that can see you suffers disadvantage on any checks using the Perception and Investigation skills.",
		firstCol : 3 //power point cost
	},
	"mj4-beacon of recovery" : {
		name : "Beacon of Recovery",
		source : ["UA:TMC", 17],
		psionic : true,
		level : 1,
		school : "Avatar", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "60 ft",
		duration : "Instantaneous",
		description : "You + 5 allies can make an extra save against every effect that allows a save at the start/end of a turn",
		descriptionFull : "As a bonus action, you and up to five allies you can see within 60 feet of you can immediately make saving throws against every effect they’re suffering that allows a save at the start or end of their turns.",
		firstCol : 5 //power point cost
	},

	//the nomadic arrow discipline (contributed by mattohara)
	"nomadic arrow" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Nomadic Arrow",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 21],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "Your ranged weapon attacks ignore disadvantage, but can't get adv. if it was subject to dis.",
		descriptionFull : "You imbue a ranged weapon with a strange semblance of sentience, allowing it to unerringly find its mark." + PsychicFocus + "While you are focused on this discipline, any attack roll you make for a ranged weapon attack ignores disadvantage. If disadvantage would normally apply to the roll, that roll also can’t benefit from advantage.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["na1-speed dart", "na2-seeking missile", "na3-faithful archer"] //array of object names that should be filled after this one on the spell sheet
	},
	"na1-speed dart" : {
		name : "Speed Dart",
		source : ["UA:TMC", 21],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "This turn end",
		description : "1 ranged weapon gains psionic power; next hit with it deals +1d10/PP Psychic damage",
		descriptionFull : "As a bonus action, you imbue one ranged weapon you hold with psionic power. The next attack you make with it that hits before the end of the current turn deals an extra 1d10 psychic damage per psi point spent.",
		firstCol : "1-7" //power point cost
	},
	"na2-seeking missile" : {
		name : "Seeking Missile",
		source : ["UA:TMC", 21],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 rea",
		range : "Self",
		duration : "Instantaneous",
		description : "When you miss with a ranged attack, you can reroll the attack roll against the same target",
		descriptionFull : "As a reaction when you miss with a ranged weapon attack, you can repeat the attack roll against the same target.",
		firstCol : 2 //power point cost
	},
	"na3-faithful archer" : {
		name : "Faithful Archer",
		source : ["UA:TMC", 21],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Conc, 1 min",
		description : "1 ranged weapon gains sentience; free attack with it at the start of each turn; thrown weapons return",
		descriptionFull : "As a bonus action, you imbue a ranged weapon with a limited sentience. Until your concentration ends, you can make an extra attack with the weapon at the start of each of your turns (no action required). If it is a thrown weapon, it returns to your grasp each time you make any attack with it.",
		firstCol : 5 //power point cost
	},

	//the nomadic chameleon discipline (contributed by mattohara)
	"nomadic chameleon" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Nomadic Chameleon",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 22],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You gain advantage on Dexterity (Stealth) checks",
		descriptionFull : "You create a screen of psychic power that distorts your appearance, allowing you to blend into the background or even turn invisible." + PsychicFocus + "While focused on this discipline, you have advantage on Dexterity (Stealth) checks.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["nc1-chameleon", "nc2-step from sight", "nc3-enduring invisibility"] //array of object names that should be filled after this one on the spell sheet
	},
	"nc1-chameleon" : {
		name : "Chameleon",
		source : ["UA:TMC", 22],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "Self",
		duration : "This turn end",
		description : "You can hide, regardless of requirements; at end of turn, remain hidden only if requirements are met",
		descriptionFull : "As an action, you can attempt to hide even if you fail to meet the requirements needed to do so. At the end of the current turn, you remain hidden only if you then meet the normal requirements for hiding.",
		firstCol : 2 //power point cost
	},
	"nc2-step from sight" : {
		name : "Step from Sight",
		source : ["UA:TMC", 22],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "60 ft",
		duration : "Conc, 1 min",
		description : "You(+1 crea/extra PP) become invisible; attacking/targeting/affecting other crea makes a crea visible",
		descriptionFull : "As a bonus action, cloak yourself from sight. You can target one additional creature for every additional psi point you spend on this ability. The added targets must be visible to you and within 60 feet of you." + "\n   " + "Each target turns invisible and remains so until your concentration ends or until immediately after it targets, damages, or otherwise affects any creature with an attack, a spell, or another ability.",
		firstCol : "3-7" //power point cost
	},
	"nc3-enduring invisibility" : {
		name : "Enduring Invisibility",
		source : ["UA:TMC", 22],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Conc, 1 min",
		description : "You turn invisible for the duration",
		descriptionFull : "As a bonus action, you turn invisible and remain so until your concentration ends.",
		firstCol : 7 //power point cost
	},

	//the nomadic mind discipline (contributed by mattohara)
	"nomadic mind" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Nomadic Mind",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 22],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You gain proficiency with one skill, tool, or language",
		descriptionFull : "You dispatch part of your psyche into the noosphere, the collective vista of minds and knowledge possessed by living things." + PsychicFocus + "Whenever you focus on this discipline, you choose one skill or tool and have proficiency with it until your focus ends. Alternatively, you gain the ability to read and write one language of your choice until your focus ends.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["nm1-wandering mind", "nm2-find creature", "nm3-item lore", "nm4-psychic speech", "nm5-wandering eye", "nm6-phasing eye"] //array of object names that should be filled after this one on the spell sheet
	},
	"nm1-wandering mind" : {
		name : "Wandering Mind",
		source : ["UA:TMC", 22],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "10 min",
		range : "Self",
		duration : "1 h",
		description : "Gain prof. with 1 skill/2PP: Animal Hand., History, Medicine, Nature, Performance, Religion, Survival",
		descriptionFull : "You enter a deep contemplation. If you concentrate for this option’s full duration, you then gain proficiency with up to three of the following skills (one skill for every 2 psi points spent): Animal Handling, Arcana, History, Medicine, Nature, Performance, Religion, and Survival. The benefit lasts for 1 hour, no concentration required.",
		firstCol : "2-6" //power point cost
	},
	"nm2-find creature" : {
		name : "Find Creature",
		source : ["UA:TMC", 22],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 h",
		range : "Self",
		duration : "Instantaneous",
		description : "Learn general location of a creature, within 1-3 miles; if it's on other plane, learn which plane instead",
		descriptionFull : "You cast your mind about for information about a specific creature. If you concentrate for this option’s full duration, you then gain a general understanding of the creature’s current location. You learn the region, city, town, village, or district where it is, pinpointing an area between 1 and 3 miles on a side (DM’s choice). If the creature is on another plane of existence, you instead learn which plane.",
		firstCol : 2 //power point cost
	},
	"nm3-item lore" : {
		name : "Item Lore",
		source : ["UA:TMC", 22],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 h",
		range : "5 ft",
		duration : "Instantaneous",
		description : "1 magical item or magic-imbued crea/obj; learn properties, how to use, and spells affecting it",
		descriptionFull : "You carefully study an item. If you concentrate for this option’s full duration while remaining within 5 feet of the item, you then gain the benefits of an identify spell cast on that item.",
		firstCol : 3 //power point cost
	},
	"nm4-psychic speech" : {
		name : "Psychic Speech",
		source : ["UA:TMC", 22],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "Self",
		duration : "1 h",
		description : "You understands all spoken/written languages and all with a language can understand what you say",
		descriptionFull : "As an action, you attune your mind to the psychic imprint of all language. For 1 hour, you gain the ability to understand any language you hear or attempt to read. In addition, when you speak, all creatures that can understand a language understand what you say, regardless of what language you use.",
		firstCol : 5 //power point cost
	},
	"nm5-wandering eye" : {
		name : "Wandering Eye",
		source : ["UA:TMC", 22],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 h",
		description : "Create invisible, moving (unlimited range, 30ft/rnd) 1\" magic eye with darkvision you see through",
		description : "Create invisible, moving (unlimited range, 10m/rnd) 2,5cm magic eye /w darkvision you see through",
		descriptionFull : "As an action, you create a psychic sensor within 60 feet of you. The sensor lasts until your concentration ends. The sensor is invisible and hovers in the air. You mentally receive visual information from it, which has normal vision and darkvision with a range of 60 feet. The sensor can look in all directions. As an action, you can move the sensor up to 30 feet in any direction. There is no limit to how far away from you the eye can move, but it can’t enter another plane of existence. A solid barrier blocks the eye’s movement, but the eye can pass through an opening as small as 1 inch in diameter.",
		firstCol : 6 //power point cost
	},
	"nm6-phasing eye" : {
		name : "Phasing Eye",
		source : ["UA:TMC", 22],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 h",
		description : "As Wandering Eye above, except the eye can move through objects but can't end its movement in one",
		descriptionFull : "As Wandering Eye above, except the eye can move through solid objects but can’t end its movement in one. If it does so, the effect immediately ends.",
		firstCol : 7 //power point cost
	},

	//the nomadic step discipline (contributed by Justin W.)
	"nomadic step" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Nomadic Step",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 22],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "1/turn; after you teleport, increase speed by 10 ft until end of your turn",
		descriptionFull : "You exert your mind on the area around you, twisting the intraplanar pathways you perceive to allow instantaneous travel." + PsychicFocus + "After you teleport on your turn while focused on this discipline, your walking speed increases by 10 feet until the end of the turn, as you are propelled by the magic of your teleportation. You can receive this increase only once per turn.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["ns1-step of a dozen paces", "ns2-nomadic anchor", "ns3-defensive step", "ns4-there and back again", "ns5-transposition", "ns6-baleful transposition", "ns7-phantom caravan", "ns8-nomad's gate"] //array of object names that should be filled after this one on the spell sheet
	},
	"ns1-step of a dozen paces" : {
		name : "Step of a Dozen Paces",
		source : ["UA:TMC", 22],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Instantaneous",
		description : "You teleport up to 20 ft/PP to where you can see, instead of moving this turn; only if not moved yet",
		descriptionFull : "If you haven’t moved yet on your turn, you take a bonus action to teleport up to 20 feet per psi point spent to an unoccupied space you can see, and your speed is reduced to 0 until the end of the turn.",
		firstCol : "1-7" //power point cost
	},
	"ns2-nomadic anchor" : {
		name : "Nomadic Anchor",
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "120 ft",
		duration : "8 h",
		description : "Create 5-ft cu teleport anchor; any teleport from this discipline can go to it if within range",
		descriptionFull : "As an action, you create an invisible, intangible teleportation anchor in a 5-foot cube you can see within 120 feet of you. For the next 8 hours, whenever you use this psionic discipline to teleport, you can instead teleport to the anchor, even if you can’t see it, but it must be within range of the teleportation ability.",
		firstCol : 1 //power point cost
	},
	"ns3-defensive step" : {
		name : "Defensive Step",
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 rea",
		range : "Self",
		duration : "Instantaneous",
		description : "When hit by an attack, you gain +4 AC, and then teleport 10 ft to a space you can see",
		descriptionFull : "When you are hit by an attack, you can use your reaction to gain a +4 bonus to AC against that attack, possibly turning it into a miss. You then teleport up to 10 feet to an unoccupied space you can see.",
		firstCol : 2 //power point cost
	},
	"ns4-there and back again" : {
		name : "There and Back Again",
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "End of Turn",
		description : "You teleport 20 ft and move half your speed; you may teleport back to starting spot at end of your turn",
		descriptionFull : "As a bonus action, you teleport up to 20 feet to an unoccupied space you can see and then move up to half your speed. At the end of your turn, you can teleport back to the spot you occupied before teleporting, unless it is now occupied or on a different plane of existence.",
		firstCol : 2 //power point cost
	},
	"ns5-transposition" : {
		name : "Transposition",
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "60 ft",
		duration : "Instantaneous",
		description : "Willing creature and you teleport, swapping places, instead of moving this turn; only if not moved yet",
		descriptionFull : "If you haven’t moved yet on your turn, choose an ally you can see within 60 feet of you. As a bonus action, you and that creature teleport, swapping places, and your speed is reduced to 0 until the end of the turn. This ability fails and is wasted if either of you can’t fit in the destination space.",
		firstCol : 3 //power point cost
	},
	"ns6-baleful transposition" : {
		name : "Baleful Transposition",
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "120 ft",
		duration : "Instantaneous",
		save : "Wis",
		description : "1 creature save or it and you teleport, swapping places",
		descriptionFull : "As an action, choose one creature you can see within 120 feet of you. That creature must make a Wisdom saving throw. On a failed save, you and that creature teleport, swapping places. This ability fails and is wasted if either of you can’t fit in the destination space.",
		firstCol : 5 //power point cost
	},
	"ns7-phantom caravan" : {
		name : "Phantom Caravan",
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Instantaneous",
		description : "You and up to 6 willing creatures teleport up to 1 mile to a spot you can see",
		descriptionFull : "As an action, you and up to six willing creatures of your choice that you can see within 60 feet of you teleport up to 1 mile to a spot you can see. If there isn’t an open space for all the targets to occupy at the arrival point, this ability fails and is wasted.",
		firstCol : 6 //power point cost
	},
	"ns8-nomad's gate" : {
		name : "Nomad's Gate",
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "5 ft",
		duration : "Conc, 1 h",
		description : "Create a 5-ft cu in range, and another up to 1 mile away; anyone entering one, teleports to the other",
		descriptionFull : "As an action, you create a 5-foot cube of dim, gray light within 5 feet of you. You create an identical cube at any point of your choice within 1 mile that you have viewed within the past 24 hours. Until your concentration ends, anyone entering one of the cubes immediately teleports to the other one, appearing in an unoccupied space next to it. The teleportation fails if there is no space for the creature to appear in.",
		firstCol : 7 //power point cost
	},

	//the precognition discipline (contributed by Justin W.)
	"precognition" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Precognition",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You gain advangage on initiative rolls",
		descriptionFull : "By analyzing information around you, from subtle hints to seemingly disconnected facts, you learn to weave a string of probabilities in an instant that gives you extraordinary insights." + PsychicFocus + "While focused on this discipline, you have advantage on initiative rolls.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["p1-precognitive hunch", "p2-all-around sight", "p3-danger sense", "p4-victory before battle"] //array of object names that should be filled after this one on the spell sheet
	},
	"p1-precognitive hunch" : {
		name : "Precognitive Hunch",
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Conc, 1 min",
		description : "You add 1d4 to attack rolls, saving throws, and ability checks",
		descriptionFull : "As a bonus action, you open yourself to receive momentary insights that improve your odds of success; until your concentration ends, whenever you make an attack roll, a saving throw, or an ability check, you roll a d4 and add it to the total.",
		firstCol : 2 //power point cost
	},
	"p2-all-around sight" : {
		name : "All-Around Sight",
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 rea",
		range : "Self",
		duration : "Instantaneous",
		description : "After an attack hits you, impose disadvantage on that attack roll",
		descriptionFull : "In response to an attack hitting you, you use your reaction to impose disadvantage on that attack roll, possibly causing it to miss.",
		firstCol : 3 //power point cost
	},
	"p3-danger sense" : {
		name : "Danger Sense",
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "Self",
		duration : "Conc, 8 h",
		description : "You gain +10 on the initiative roll, can't be surprised, and attacks against you can't gain advantage",
		descriptionFull : "As an action, you create a psychic model of reality in your mind and set it to show you a few seconds into the future. Until your concentration ends, you can’t be surprised, attack rolls against you can’t gain advantage, and you gain a +10 bonus to initiative.",
		firstCol : 5 //power point cost
	},
	"p4-victory before battle" : {
		name : "Victory Before Battle",
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "\u2014",
		range : "60-ft rad",
		duration : "Instantaneous",
		description : "Use when rolling initiative; grant yourself and up to 5 creatures +10 on the initiative roll",
		descriptionFull : "When you roll initiative, you can use this ability to grant yourself and up to five creatures of your choice within 60 feet of you a +10 bonus to initiative.",
		firstCol : 7 //power point cost
	},

	//the psionic restoration discipline (contributed by Justin W.)
	"psionic restoration" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Psionic Restoration",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "While focused, you can touch a creature with 0 hp as a bonus action and stabilize it",
		descriptionFull : "You wield psionic energy to cure wounds and restore health to yourself and others." + PsychicFocus + "While focused on this discipline, you can use a bonus action to touch a creature that has 0 hit points and stabilize it.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["pr1-mend wounds", "pr2-restore health", "pr3-restore life", "pr4-restore vigor"] //array of object names that should be filled after this one on the spell sheet
	},
	"pr1-mend wounds" : {
		name : "Mend Wounds",
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "Touch",
		duration : "Instantaneous",
		description : "1 creature is healed for 1d8/PP hp",
		descriptionFull : "As an action, you can spend psi points to restore hit points to one creature you touch. The creature regains 1d8 hit points per psi point spent.",
		firstCol : "1-7" //power point cost
	},
	"pr2-restore health" : {
		name : "Restore Health",
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "Touch",
		duration : "Instantaneous",
		description : "1 creature is cured of either blindness, deafness, paralysis, poison, or 1 disease",
		descriptionFull : "As an action, you touch one creature and remove one of the following conditions from it: blinded, deafened, paralyzed, or poisoned. Alternatively, you remove one disease from the creature.",
		firstCol : 3 //power point cost
	},
	"pr3-restore life" : {
		name : "Restore Life",
		source : ["UA:TMC", 23],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "Touch",
		duration : "Instantaneous",
		description : "Resurrects 1 crea that has died in last minute to 1 hp, if not missing vital body parts or died of old age",
		descriptionFull : "As an action, you touch one creature that has died within the last minute. The creature returns to life with 1 hit point. This ability can’t return to life a creature that has died of old age, nor can it restore a creature missing any vital body parts.",
		firstCol : 5 //power point cost
	},
	"pr4-restore vigor" : {
		name : "Restore Vigor",
		source : ["UA:TMC", 24],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "Touch",
		duration : "Instantaneous",
		description : "1 crea removes either 1 ability score reduction, 1 hp max reduction effect, or 1 level of exhaustion",
		descriptionFull : "As an action, you can touch one creature and choose one of the following: remove any reductions to one of its ability scores, remove one effect that reduces its hit point maximum, or reduce its exhaustion level by one.",
		firstCol : 7 //power point cost
	},

	//the psionic weapon discipline (contributed by Justin W.)
	"psionic weapon" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Psionic Weapon",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 24],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "1 weapon or unarmed strike does Psychic dmg and counts as magical; no Str or Dex to dmg until CL6",
		descriptionFull : "You have learned how to channel psionic energy into your attacks, lending them devastating power." + PsychicFocus + "Whenever you focus on this discipline, choose one weapon you’re holding or your unarmed strike. When you attack with it while focused on this discipline, its damage is psychic and magical, rather than its normal damage type. Until you reach 6th level as a mystic, you don’t add your Strength or Dexterity modifier to the psychic attack’s damage rolls.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["pw1-ethereal weapon", "pw2-lethal strike", "pw3-augmented weapon"] //array of object names that should be filled after this one on the spell sheet
	},
	"pw1-ethereal weapon" : {
		name : "Ethereal Weapon",
		source : ["UA:TMC", 24],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Next turn end",
		description : "1 crea save or auto hit by your next wea/unarmed atk; save halves atk dmg \u0026 negates any side-effects",
		descriptionFull : "As a bonus action, you temporarily transform one weapon you’re holding or your unarmed strike into pure psionic energy. The next attack you make with it before the end of your turn ignores the target’s armor, requiring no attack roll. Instead, the target makes a Dexterity saving throw against this discipline. On a failed save, the target takes the attack’s normal damage and suffers its additional effects. On a successful save, the target takes half damage from the attack but suffers no additional effects that would normally be imposed on a hit.",
		firstCol : 1 //power point cost
	},
	"pw2-lethal strike" : {
		name : "Lethal Strike",
		source : ["UA:TMC", 24],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Next turn end",
		description : "Your next weapon or unarmed attack that hits does +1d10/PP Psychic damage",
		descriptionFull : "As a bonus action, you imbue a weapon you’re holding or your unarmed strike with psychic energy. The next time you hit with it before the end of your turn, it deals an extra 1d10 psychic damage per psi point spent.",
		firstCol : "1-7" //power point cost
	},
	"pw3-augmented weapon" : {
		name : "Augmented Weapon",
		source : ["UA:TMC", 24],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Touch",
		duration : "Conc, 10 min",
		description : "1 weapon becomes a magic weapon with a +3 bonus to its attack and damage rolls",
		descriptionFull : "As a bonus action, touch one simple or martial weapon. Until your concentration ends, that weapon becomes a magic weapon with a +3 bonus to its attack and damage rolls.",
		firstCol : 5 //power point cost
	},

	//the psychic assault discipline
	"psychic assault" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Psychic Assault",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 24],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You gain a +2 bonus to damage rolls with psionic talents that deal Psychic damage",
		descriptionFull : "You wield your mind like a weapon, unleashing salvos of psionic energy." + PsychicFocus + "While focused on this discipline, you gain a +2 bonus to damage rolls with psionic talents that deal psychic damage.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["pa1-psionic blast", "pa2-ego whip", "pa3-id insinuation", "pa4-psychic blast", "pa5-psychic crush"] //array of object names that should be filled after this one on the spell sheet
	},
	"pa1-psionic blast" : {
		name : "Psionic Blast",
		source : ["UA:TMC", 24],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Instantaneous",
		description : "1 creature takes 1d8/PP Psychic damage",
		descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target takes 1d8 psychic damage per psi point spent on this ability.",
		firstCol : "1-7" //power point cost
	},
	"pa2-ego whip" : {
		name : "Ego Whip",
		source : ["UA:TMC", 24],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Instantaneous",
		save : "Int",
		description : "1 crea save or 3d8 Psychic dmg, next turn just Dodge/Disengage/Hide action; save half \u0026 act normal",
		descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must make an Intelligence saving throw. On a failed save, the creature takes 3d8 psychic damage, and it is filled with self-doubt, leaving it able to use its action on its next turn only to take the Dodge, Disengage, or Hide action. On a successful saving throw, it takes half as much damage.",
		firstCol : 3 //power point cost
	},
	"pa3-id insinuation" : {
		name : "Id Insinuation",
		source : ["UA:TMC", 24],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Instantaneous",
		save : "Int",
		description : "1 crea save or 5d8 Psychic dmg, next turn only Dodge/Attack action; save halves \u0026 act normal",
		descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must make an Intelligence saving throw. On a failed save, the creature takes 5d8 psychic damage, and it goes into a fury, as its id runs rampant. On its next turn, it can use its action only to take the Dodge or Attack action. On a successful save, it takes half as much damage.",
		firstCol : 5 //power point cost
	},
	"pa4-psychic blast" : {
		name : "Psychic Blast",
		source : ["UA:TMC", 24],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60-ft cone",
		duration : "Instantaneous",
		save : "Int",
		description : "All creatures 8d8(+2d8/extra PP) Psychic dmg; save halves",
		descriptionFull : "As an action, you unleash devastating psychic energy in a 60-foot cone. Each creature in that area must make an Intelligence saving throw, taking 8d8 psychic damage on a failed save, or half as much damage on a successful one. You can increase the damage by 2d8 if you spend 1 more psi point on this ability.",
		firstCol : "6-7" //power point cost
	},
	"pa5-psychic crush" : {
		name : "Psychic Crush",
		source : ["UA:TMC", 24],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "120 ft",
		duration : "Instantaneous",
		save : "Int",
		description : "20-ft cu all crea save or 8d8 Psychic dmg \u0026 stunned until your next turn ends; save halves \u0026 no stun",
		descriptionFull : "As an action, you create a 20-foot cube of psychic energy within 120 feet of you. Each creature in that area must make an Intelligence saving throw. On a failed save, a target takes 8d8 psychic damage and is stunned until the end of your next turn. On a successful save, a target takes half as much damage.",
		firstCol : 7 //power point cost
	},

	//the psychic disruption discipline (contributed by Justin W.)
	"psychic disruption" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Psychic Disruption",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 24],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You have advantage on Charisma (Deception) checks",
		descriptionFull : "You create psychic static that disrupts other creatures’ ability to think clearly." + PsychicFocus + "While focused on this discipline, you have advantage on Charisma (Deception) checks.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["pd1-distracting haze", "pd2-daze", "pd3-mind storm"] //array of object names that should be filled after this one on the spell sheet
	},
	"pd1-distracting haze" : {
		name : "Distracting Haze",
		source : ["UA:TMC", 24],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 min",
		save : "Int",
		description : "1 crea save or 1d10/PP Psychic dmg, can't see more than 10 ft; save halves and see normal",
		descriptionFull : "As an action, choose one creature you can see within 60 feet of you. That creature must make an Intelligence saving throw. On a failed save, it takes 1d10 psychic damage per psi point spent and can’t see anything more than 10 feet from it until your concentration ends. On a successful save, it takes half as much damage.",
		firstCol : "1-7" //power point cost
	},
	"pd2-daze" : {
		name : "Daze",
		source : ["UA:TMC", 25],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Next turn end",
		save : "Int",
		description : "1 crea save or incapacitated until end of your next turn or it takes any damage",
		descriptionFull : "As an action, choose one creature you can see within 60 feet of you. That creature must make an Intelligence saving throw. On a failed save, the target is incapacitated until the end of your next turn or until it takes any damage.",
		firstCol : 3 //power point cost
	},
	"pd3-mind storm" : {
		name : "Mine Storm",
		source : ["UA:TMC", 25],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Next turn end",
		save : "Wis",
		description : "20-ft rad all crea 6d8(+1d6/extra PP) Psychic dmg and dis. on saves; save halves and no dis. on saves",
		descriptionFull : "As an action, choose a point you can see within 60 feet of you. Each creature in a 20-foot-radius sphere centered on that point must make a Wisdom saving throw. On a failed save, a target takes 6d8 psychic damage and suffers disadvantage on all saving throws until the end of your next turn. On a successful save, a creature takes half as much damage. You can increase the damage by 1d6 per additional psi point spent on this ability.",
		firstCol : "5-7" //power point cost
	},

	//the psychic inquisition discipline (contributed by Justin W.)
	"psychic inquisition" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Psychic Inquisition",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 25],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You know when a creature telepathically communicating with you is lying",
		descriptionFull : "You reach into a creature’s mind to uncover information or plant ideas within it." + PsychicFocus + "While focused on this discipline, you know when a creature communicating with you via telepathy is lying.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["pi1-hammer of inquisition", "pi2-forceful query", "pi3-ransack mind", "pi4-phantom idea"] //array of object names that should be filled after this one on the spell sheet
	},
	"pi1-hammer of inquisition" : {
		name : "Hammer of Inquisition",
		source : ["UA:TMC", 25],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Instantaneous",
		save : "Int",
		description : "1 crea save or 1d10/PP Psychic dmg, dis. next Wis save before your next turn; save halves \u0026 no effects",
		descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must make an Intelligence saving throw. On a failed save, it takes 1d10 psychic damage per psi point spent and suffers disadvantage on its next Wisdom saving throw before the end of your next turn. On a successful save, it takes half as much damage.",
		firstCol : "1-7" //power point cost
	},
	"pi2-forceful query" : {
		name : "Forceful Query",
		source : ["UA:TMC", 25],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "30 ft",
		duration : "Instantaneous",
		save : "Int",
		description : "1 crea save or they must truthfully answer a yes or no question (charm effect)",
		descriptionFull : "As an action, you ask a question of one creature that can see and hear you within 30 feet of you. The question must be phrased so that it can be answered with a yes or no, otherwise this ability fails. The target must succeed on a Wisdom saving throw, or it replies with a truthful answer. A creature is immune to this ability if it is immune to being charmed.",
		firstCol : 2 //power point cost
	},
	"pi3-ransack mind" : {
		name : "Ransack Mind",
		source : ["UA:TMC", 25],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 h",
		range : "30 ft",
		duration : "12/24/48 h",
		save : "Int",
		description : "1 crea 3 saves if in range for full duration; learn key memories from 12/24/48 h (1/2/3 failed saves)",
		descriptionFull : "While you concentrate on this ability, you probe one creature’s mind. The creature must remain within 30 feet of you, and you must be able to see it. If you reach the ability’s full duration, the target must make three Intelligence saving throws, and you learn information from it based on the number of saving throws it fails." + "\n   " + "With one failed saving throw, you learn its key memories from the past 12 hours." + "\n   " + "With two failed saving throws, you learn its key memories from the past 24 hours." + "\n   " + "With three failed saving throws, you learn its key memories from the past 48 hours.",
		firstCol : 5 //power point cost
	},
	"pi4-phantom idea" : {
		name : "Phantom Idea",
		source : ["UA:TMC", 25],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 h",
		range : "30 ft",
		duration : "4/24/48 h",
		save : "Int",
		description : "1 crea 3 saves if in range for full duration; implant memory lasting 4/24/48 h (1/2/3 failed saves)",
		descriptionFull : "While you concentrate on this ability, you probe one creature’s mind. The creature must remain within 30 feet of you, and you must be able to see it. If you reach the ability’s full duration, the target must make three Intelligence saving throws, and you plant a memory or an idea in it, which lasts for a number of hours based on the number of saving throws it fails. You choose whether the idea or memory is trivial (such as “I had porridge for breakfast” or “Ale is the worst”) or personality-defining (“I failed to save my village from orc marauders and am therefore a coward” or “Magic is a scourge, so I renounce it”)." + "\n   " + "With one failed saving throw, the idea or memory lasts for the next 4 hours. With two failed saving throws, it lasts for 24 hours. With three failed saving throws, it lasts for 48 hours.",
		firstCol : 6 //power point cost
	},

	//the psychic phantoms discipline (contributed by Justin W.)
	"psychic phantoms" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Psychic Phantoms",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 25],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You gain advantage on Charisma (Deception) checks",
		descriptionFull : "Your power reaches into a creature’s mind and causes it false perceptions." + PsychicFocus + "While focused on this discipline, you have advantage on Charisma (Deception) checks.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["pp1-distracting figment", "pp2-phantom foe", "pp3-phantom betrayal", "pp4-phantom riches"] //array of object names that should be filled after this one on the spell sheet
	},
	"pp1-distracting figment" : {
		name : "Distracting Figment",
		source : ["UA:TMC", 25],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Next turn end",
		save : "Int",
		description : "1 crea save or 1d10/PP Psychic dmg, can't use rea, melee atks vs. it have adv.; save halves \u0026 no effects",
		descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must make an Intelligence saving throw. On a failed save, it takes 1d10 psychic damage per psi point spent and thinks it perceives a threatening creature just out of its sight; until the end of your next turn, it can’t use reactions, and melee attack rolls against it have advantage. On a successful save, it takes half as much damage.",
		firstCol : "1-7" //power point cost
	},
	"pp2-phantom foe" : {
		name : "Phantom Foe",
		source : ["UA:TMC", 25],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 min",
		save : "Int",
		description : "1 crea save or no rea and 1d8(+1d8/extra PP) Psychic dmg at start its turn; save at end of each turn",
		descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must make an Intelligence saving throw. On a failed save, it perceives a horrid creature adjacent to it until your concentration ends. During this time, the target can’t take reactions, and it takes 1d8 psychic damage at the start of each of its turns. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. You can increase the damage by 1d8 for each additional psi point spent on the ability.",
		firstCol : "3-7" //power point cost
	},
	"pp3-phantom betrayal" : {
		name : "Phantom Betrayal",
		source : ["UA:TMC", 26],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 min",
		save : "Int",
		description : "1 crea save or targets its allies with attacks/damaging effects; save at end of each turn (charm effect)",
		descriptionFull : "As an action, you plant delusional paranoia in a creature’s mind. Choose one creature you can see within 60 feet of you. The target must succeed on an Intelligence saving throw, or until your concentration ends, it must target its allies with attacks and other damaging effects. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. A creature is immune to this ability if it is immune to being charmed.",
		firstCol : 5 //power point cost
	},
	"pp4-phantom riches" : {
		name : "Phantom Riches",
		source : ["UA:TMC", 26],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 min",
		save : "Int",
		description : "1 crea save or you move it and it can't act if not taking dmg since last turn; save at end of each turn",
		descriptionFull : "As an action, you plant the phantom of a greatly desired object in a creature’s mind. Choose one creature you can see within 60 feet of you. The target must make an Intelligence saving throw. On a failed save, you gain partial control over the target’s behavior until your concentration ends; the target moves as you wish on each of its turns, as it thinks it pursues the phantom object it desires. If it hasn’t taken damage since its last turn, it can use its action only to admire the object you created in its perception. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
		firstCol : 7 //power point cost
	},

	//the telepathic contact discipline (contributed by Justin W.)
	"telepathic contact" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Telepathic Contact",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 26],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "Use telepathy class feature with up to 6 crea; If no telepathy feature, gain telepathy 120 ft instead",
		descriptionFull : "By channeling psionic power, you gain the ability to control other creatures by substituting your will for their own." + PsychicFocus + "While focused on this discipline, you gain the ability to use your Telepathy class feature with up to six creatures at once. If you don’t have that feature from the mystic class, you instead gain it while focused on this discipline.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["tc1-exacting query", "tc2-occluded mind", "tc3-broken will", "tc4-psychic grip", "tc5-psychic domination"] //array of object names that should be filled after this one on the spell sheet
	},
	"tc1-exacting query" : {
		name : "Exacting Query",
		source : ["UA:TMC", 26],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "120 ft",
		duration : "Instantaneous",
		save : "Int",
		description : "1 crea save or answer 1 telepathically asked question; on save, target is immune until you long rest",
		descriptionFull : "As an action, you target one creature you can communicate with via telepathy. The target must make an Intelligence saving throw. On a failed save, the target truthfully answers one question you ask it via telepathy. On a successful save, the target is unaffected, and you can’t use this ability on it again until you finish a long rest. A creature is immune to this ability if it is immune to being charmed.",
		firstCol : 2 //power point cost
	},
	"tc2-occluded mind" : {
		name : "Occluded Mind",
		source : ["UA:TMC", 26],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "120 ft",
		duration : "5 min",
		save : "Int",
		description : "1 crea save or believes telepathic statement; on save, target immune until you long rest (charm effect)",
		descriptionFull : "As an action, you target one creature you can communicate with via telepathy. The target must make an Intelligence saving throw. On a failed save, the target believes one statement of your choice for the next 5 minutes that you communicate to it via telepathy. The statement can be up to ten words long, and it must describe you or a creature or an object the target can see. On a successful save, the target is unaffected, and you can’t use this ability on it again until you finish a long rest. A creature is immune to this ability if it is immune to being charmed.",
		firstCol : 2 //power point cost
	},
	"tc3-broken will" : {
		name : "Broken Will",
		source : ["UA:TMC", 26],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "120 ft",
		duration : "1 rnd",
		save : "Int",
		description : "1 crea save or you control it on its next turn; on save, target immune until you long rest (charm effect)",
		descriptionFull : "As an action, you target one creature you can communicate with via telepathy. The target must make an Intelligence saving throw. On a failed save, you choose the target’s movement and action on its next turn. On a successful save, the target is unaffected, and you can’t use this ability on it again until you finish a long rest. A creature is immune to this ability if it is immune to being charmed.",
		firstCol : 5 //power point cost
	},
	"tc4-psychic grip" : {
		name : "Psychic Grip",
		source : ["UA:TMC", 26],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 min",
		save : "Int",
		description : "1 crea save or paralyzed; save at end of each turn, on failure you use rea to have it move half its speed",
		descriptionFull : "As an action, you target one creature you can see within 60 feet of you. The target must succeed on an Intelligence saving throw, or it is paralyzed until your concentration ends. At the end of each of its turns, it can repeat the saving throw. On a success, this effect ends. On a failure, you can use your reaction to force the target to move up to half its speed, even though it’s paralyzed.",
		firstCol : 6 //power point cost
	},
	"tc5-psychic domination" : {
		name : "Psychic Domination",
		source : ["UA:TMC", 26],
		psionic : true,
		level : 1,
		school : "Awake", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60 ft",
		duration : "Conc, 1 min",
		save : "Int",
		description : "1 crea save or you direct its actions and move on its turns; save at end of each turn (charm effect)",
		descriptionFull : "As an action, you target one creature you can see within 60 feet of you. The target must succeed on an Intelligence saving throw, or you choose the creature’s actions and movement on its turns until your concentration ends. At the end of each of its turns, it can repeat the saving throw, ending the effect on itself on a success. A creature is immune to this ability if it is immune to being charmed.",
		firstCol : 7 //power point cost
	},

	//the third eye discipline (contributed by Justin W.)
	"third eye" : { //the first entry of the discipline has the effect of the Psychic Focus
		name : "Third Eye",
		classes : ["mystic"], //only has "mystic" for the first entry of the discipline
		source : ["UA:TMC", 26],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		components : "Psi-F.",
		duration : "While focused",
		description : "You gain darkvision 60 ft; if already darkvision of 60 ft or more, increase range by 10 ft instead",
		descriptionFull : "You create a third, psychic eye in your mind which you cast out into the world. It channels thoughts and knowledge back to you, greatly enhancing your senses." + PsychicFocus + "While focused on this discipline, you have darkvision with a range of 60 feet. If you already have darkvision with that range or greater, increase its range by 10 feet.",
		firstCol : "checkbox", //power point cost, or "checkbox" when it concerns the psychic focus
		dependencies : ["te1-tremorsense", "te2-unwavering eye", "te3-piercing sight", "te4-truesight"] //array of object names that should be filled after this one on the spell sheet
	},
	"te1-tremorsense" : {
		name : "Tremorsense",
		source : ["UA:TMC", 26],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Conc, 1 min",
		description : "You gain tremorsense with a radius of 30 ft",
		descriptionFull : "As a bonus action, you gain tremorsense with a radius of 30 feet, which lasts until your concentration ends.",
		firstCol : 2 //power point cost
	},
	"te2-unwavering eye" : {
		name : "Unwavering Eye",
		source : ["UA:TMC", 26],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "1 min",
		description : "You gain advantage on Wisdom checks",
		descriptionFull : "As a bonus action, you gain advantage on Wisdom checks for 1 minute",
		firstCol : 2 //power point cost
	},
	"te3-piercing sight" : {
		name : "Piercing Sight",
		source : ["UA:TMC", 27],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Conc, 1 min",
		description : "You see through objects that are up to 1 ft thick within 30 ft",
		descriptionFull : "As a bonus action, you gain the ability to see through objects that are up to 1 foot thick within 30 feet of you. This sight lasts until your concentration ends.",
		firstCol : 3 //power point cost
	},
	"te4-truesight" : {
		name : "Truesight",
		source : ["UA:TMC", 27],
		psionic : true,
		level : 1,
		school : "Nomad", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 bns",
		range : "Self",
		duration : "Conc, 1 min",
		description : "You gain truesight with a radius of 30 ft",
		descriptionFull : "As a bonus action, you gain truesight with a radius of 30 feet, which lasts until your concentration ends.",
		firstCol : 5 //power point cost
	},
};

var AllPsionicsArray, AddPsionicsMenu, AllPsionicClasses;
