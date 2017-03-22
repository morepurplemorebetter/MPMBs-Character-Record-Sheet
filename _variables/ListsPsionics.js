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
		descriptionFull : "As an action, you plant a false belief in the mind of one creature that you can see within 60 feet of you. You can create a sound or an image. Only the target of this talent perceives the sound or image you create." + "\n   " +  "If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a creature's roar, a musical instrument, or any other sound you pick. It lasts for 1 minute." + "\n   " +  "If you create an object, it must fit within a 5-foot cube and can’t move or be reflective. The image can't create any effect that influences a sense other than sight. The image lasts for 1 minute, and it disappears if the creature touches it."
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
		descriptionFull : "As an action, you target one creature you can see within 90 feet of you. The target must succeed on a Dexterity saving throw or take 1d8 acid, cold, fire, lightning, or thunder damage (your choice)." + "\n   " +  "The talent’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)"
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
		descriptionFull : "As a bonus action, you can communicate telepathically with one willing creature you can see within 120 feet of you. The target must have an Intelligence of at least 2, otherwise this talent fails and the action is wasted." + "\n   " +  "This communication can occur until the end of the current turn. You don’t need to share a language with the target for it to understand your telepathic utterances, and it understands you even if it lacks a language. You also gain access to one memory of the target’s choice, gaining perfect recall of one thing it saw or did."
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
		descriptionFull : "As an action, you target one creature you can see within 60 feet of you. The target must succeed on a Constitution saving throw or take 1d6 force damage. If it takes any of this damage and is Large or smaller, it is knocked prone." + "\n   " +  "The talent’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)"
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
		descriptionFull : "As an action, you target one creature you can see within 120 feet of you. The target must succeed on an Intelligence saving throw or take 1d10 psychic damage." + "\n   " +  "The talent’s damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10)."
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
		descriptionFull : "You can use your action to manipulate or move one object within 30 feet of you. The object can’t weigh more than 10 pounds, and you can’t affect an object being worn or carried by another creature. If the object is loose, you can move it up to 30 feet in any direction." + "\n   " +  "This talent allows you to open an unlocked door, pour out a beer stein, and so on." + "\n   " +  "The object falls to the ground at the end of your turn if you leave it suspended in midair."
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
		descriptionFull : "As an action, you try to grasp one creature you can see within 120 feet of you, with a hand crafted from telekinetic energy. The target must succeed on a Strength saving throw or take 1d6 force damage. If it takes any of this damage and is Large or smaller, you can move it up to 10 feet in a straight line in a direction of your choice. You can’t lift the target off the ground unless it is already airborne or underwater." + "\n   " +  "The talent’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
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
		dependencies : ["bf1-bestial claws", "bf2-bestial transformation", "bf3-bt - amphibious" , "bf4-bt - climbing", "bf5-bt - flight", "bf6-bt - keen senses", "bf7-bt - perfect senses", "bf8-bt - swimming", "bf9-bt - tough hide"] //array of object names that should be filled after this one on the spell sheet
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
		save: "Str",
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
		save: "Con",
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
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "60-ft line", //don't forget the hyphen for all things like this, like "20-ft rad", "30-ft cube", "40-ft cone", etc.
		duration : "Instantaneous",
		save: "Con",
		description : "60-ft long 5-ft wide line all creatures 6d6(+1d6/extra PP) Acid dmg; save halves",
		descriptionFull : "You exhale a wave of acid in a 60-foot line that is 5 feet wide. Each creature in the line must make a Constitution saving throw, taking 6d6 acid damage on a failed save, or half as much on a successful one. You can increase the damage by 1d6 per additional psi point spent on it.",
		firstCol : "5-7" //power point cost
	},
	"cm5-breath of the green dragon" : {
		name : "Breath of the Green Dragon",
		source : ["UA:TMC", 12],
		psionic : true,
		level : 1,
		school : "Immor", //"Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
		time : "1 a",
		range : "90-ft cone",
		duration : "Instantaneous",
		save: "Con",
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
		firstCol : 5//power point cost
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
		descriptionFull : "As an action, choose up to six creatures within 60 feet of you. Each target must make a Charisma saving throw. On a failed save, a target takes 8d6 psychic damage, and it is frightened until your concentration ends. On a successful save, a target takes half as much damage." + "\n   " +  "While frightened by this effect, a target’s speed is reduced to 0, and the target can use its action, and any bonus action it might have, only to make melee attacks. The frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
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

	//the iron durability discipline (contributed by Matt O.)
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
		dependencies : ["id1-iron hide", "id2-steel hide", "id3-iron resistance"]//array of object names that should be filled after this one on the spell sheet
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

var AllPsionicsArray, AllPsionicsObject, AddPsionicsMenu, AllPsionicClasses;