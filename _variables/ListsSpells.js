var AtHigherLevels = "\n   " + toUni("At Higher Levels") + ": ";

var Base_spellLevelList = [
    "Cantrips (0-level)",
    "1st-level",
    "2nd-level",
    "3rd-level",
    "4th-level",
    "5th-level",
    "6th-level",
    "7th-level",
    "8th-level",
    "9th-level",
    "Talents",
    "Disciplines"
];

var Base_spellSchoolList = {
    Abjur: "abjuration",
    Conj: "conjuration",
    Div: "divination",
    Ench: "enchantment",
    Evoc: "evocation",
    Illus: "illusion",
    Necro: "necromancy",
    Trans: "transmutation",
    Avatar: "avatar",
    Awake: "awakened",
    Immor: "immortal",
    Nomad: "nomad",
    "Wu Jen": "wu jen"
};

var Base_SpellsList = {
    "acid splash": {
        name: "Acid Splash",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 114], ["P", 211]],
        level: 0,
        school: "Conj",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Instantaneous",
        save: "Dex",
        description:
            "1 crea or 2 crea within 5 ft of each other save or 1d6 Acid dmg; +1d6 at CL 5, 11, and 17",
        descriptionCantripDie:
            "1 crea or 2 crea within 5 ft of each other save or `CD`d6 Acid dmg",
        descriptionFull:
            "You hurl a bubble of acid. Choose one creature you can see within range, or choose two creatures you can see within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage." +
            "\n   " +
            "This spell's damage increases by 1d6 when you reach 5th Level (2d6), 11th level (3d6) and 17th level (4d6)."
    },
    aid: {
        name: "Aid",
        classes: ["cleric", "paladin"],
        source: [["SRD", 114], ["P", 211]],
        level: 2,
        school: "Abjur",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "A tiny strip of white cloth",
        duration: "8 h",
        description:
            "3 creatures gain 5+5/SL current HP and HP max for the duration",
        descriptionFull:
            "Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target's hit point maximum and current hit points increase by 5 for the duration." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 3rd level or higher, a target's hit points increase by an additional 5 for each slot level above 2nd."
    },
    alarm: {
        name: "Alarm",
        classes: ["ranger", "wizard"],
        source: [["SRD", 114], ["P", 211]],
        ritual: true,
        level: 1,
        school: "Abjur",
        time: "1 min",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "A tiny bell and a piece of fine silver wire",
        duration: "8 h",
        description:
            "Door, window, or 20-ft cube area; audible (60 ft) or mental alarm (1 mile) if undesignated crea enters",
        descriptionFull:
            "You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the spell ends, an alarm alerts you whenever a tiny or larger creature touches or enters the warded area. When you cast the spell, you can designate creatures that won't set off the alarm. You also choose whether the alarm is mental or audible." +
            "\n   " +
            "A mental alarm alerts you with a ping in your mind if you are within 1 mile of the warded area. This ping awakens you if you are sleeping." +
            "\n   " +
            "An audible alarm produces the sound of a hand bell for 10 seconds within 60 feet."
    },
    "alter self": {
        name: "Alter Self",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 114], ["P", 211]],
        level: 2,
        school: "Trans",
        time: "1 a",
        range: "Self",
        components: "V,S",
        duration: "Conc, 1 h",
        description:
            "Change appearance, gain +1 magical 1d6 natural weapons, or water breathing and swim spd",
        descriptionFull:
            "You assume a different form. When you cast the spell, choose one of the following options, the effects of which last for the duration of the spell. While the spell lasts, you can end one option as an action to gain the benefits of a different one." +
            "\n   " +
            toUni("Aquatic Adaptation") +
            ": You adapt your body to an aquatic environment, sprouting gills, and growing webbing between your fingers. You can breathe underwater and gain a swimming speed equal to your walking speed." +
            "\n   " +
            toUni("Change Appearance") +
            ": You transform your appearance. You decide what you look like, including your height, weight, facial features, sound of your voice, hair length, coloration, and distinguishing characteristics, if any. You can make yourself appear as a member of another race, though none of your statistics change. You also don't appear as a creature of a different size than you, and your basic shape stays the same, if you're bipedal, you can't use this spell to become quadrupedal, for instance. At any time for the duration of the spell, you can use your action to change your appearance in this way again." +
            "\n   " +
            toUni("Natural Weapons") +
            ": You grow claws, fangs, spines, horns, or a different natural weapon of your choice. Your unarmed strikes deal 1d6 bludgeoning, piercing, or slashing damage, as appropriate to the natural weapon you chose, and you are proficient with you unarmed strikes. Finally, the natural weapon is magic and you have a +1 bonus to the attack and damage rolls you make using it."
    },
    "animal friendship": {
        name: "Animal Friendship",
        classes: ["bard", "druid", "ranger"],
        source: [["SRD", 115], ["P", 212]],
        level: 1,
        school: "Ench",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "A morsel of food",
        duration: "24 h",
        save: "Wis",
        description: "1+1/SL beasts Int<4 save or charmed for the duration",
        descriptionFull:
            "This spell lets you convince a beast that you mean it no harm. Choose a beast that you can see within range. It must see and hear you. If the beast's Intelligence is 4 or higher, the spell fails. Otherwise, the beast must succeed on a Wisdom saving throw or be charmed by you for the spell's duration. If you or one of your companions harms the target, the spell ends." +
            AtHigherLevels +
            "When you cast this spell using a 2nd level spell slot or higher, you can affect one additional beast for each slot level above 1st."
    },
    "animal messenger": {
        name: "Animal Messenger",
        classes: ["bard", "druid", "ranger"],
        source: [["SRD", 115], ["P", 212]],
        ritual: true,
        level: 2,
        school: "Ench",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "A morsel of food",
        duration: "24 h",
        description:
            "Tiny beast delivers 25 word message up to 25 miles (50 miles if flyer); +48h/SL duration",
        descriptionFull:
            "By means of this spell, you use an animal to deliver a message. Choose a Tiny beast you can see within range, such as a squirrel, a blue ray, or a bird. You specify a location, which you must have visited, and a recipient who matches a general description, such as a man or woman dressed in the uniform of the town guard or a red-haired dwarf wearing a pointed hat. You also speak a message of up to twenty-five words. The target beast travels for the duration of the spell towards the specified location, covering about 50 miles per 24 hours for a flying messenger or 25 miles for other animals." +
            "\n   " +
            "When the messenger arrives, it delivers your message to the creature that you described, replicating the sound of your voice. The messenger speaks only to a creature matching the description you gave. If the messenger doesn't reach its destination before the spell ends, the message is lost, and the beast makes its way back to where you cast this spell." +
            AtHigherLevels +
            "If you cast this spell using a spell slot of 3rd level or higher, the duration of the spell increases by 48 hours for each slot level above 2nd."
    },
    "animal shapes": {
        name: "Animal Shapes",
        classes: ["druid"],
        source: [["SRD", 115], ["P", 212]],
        level: 8,
        school: "Trans",
        time: "1 a",
        range: "30 ft",
        components: "V,S",
        duration: "Conc, 24 h",
        description:
            "Any willing creatures transform into up to Large CR4 beasts; retain Wis, Int, Cha, but nothing else",
        descriptionFull:
            "Your magic turns others into beasts. Choose any number of willing creatures that you can see within range. You transform each target into the form of a large or smaller beast with a challenge rating of 4 or lower. On subsequent turns, you can use your actions to transform affected creatures into new forms." +
            "\n   " +
            "The transformation lasts for the duration for each target, or until the target drops to 0 hit points or dies. You can choose a different form for each target. A target's game statistics are replaced by the statistics of the chosen beast, though the target retains its alignment and Intelligence, Wisdom, and Charisma scores. The target assumes the hit points of its new form, and when it reverts to its normal form, it returns to the number of hit point it had before it transformed. If it reverts as a result of dropping to 0 hit points, any excess damage carries over to its normal form. As long as the excess damage doesn't reduce the creature's normal form to 0 hit points, it isn't knocked unconscious. The creature is limited in the actions it can perform by the nature of its new form, and it can't speak or cast spells." +
            "\n   " +
            "The target's gear melds into the new form. The target can't activate, wield, or otherwise benefit from any of its equipment."
    },
    "animate dead": {
        name: "Animate Dead",
        classes: ["cleric", "wizard"],
        source: [["SRD", 115], ["P", 212]],
        level: 3,
        school: "Necro",
        time: "1 min",
        range: "10 ft",
        components: "V,S,M",
        compMaterial:
            "A drop of blood, a piece of flesh, and a pinch of bone dust",
        duration: "Instantaneous",
        description:
            "Turn corpses into 1+2/SL Skeletons or Zombies; control for 24h; bns a command within 60 ft",
        descriptionFull:
            "This spell creates an undead servant. Choose a pile of bones or a corpse of a Medium or Small humanoid within range. Your spell imbues the target with a foul mimicry of life, raising it as an undead creature. The target becomes a skeleton if you chose bones or a zombie if you chose a corpse (the DM has the creature's game statistics)." +
            "\n   " +
            "On each of your turns, you can use a bonus action to mentally command any creature you made with this spell if the creature is within 60 feet of you (if you control multiple creatures, you can command any or all of them at the same time, issuing the same command to each one). You decide what action the creature will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the creature only defends itself against hostile creatures. Once given an order, the creature continues to follow it until its task is complete." +
            "\n   " +
            "The creature is under your control for 24 hours, after which it stops obeying any command you've given it. To maintain the control of the creature for another 24 hours, you must cast this spell on the creature again before the current 24-hour period ends. This use of the spell reasserts your control over up to four creatures you have animated with this spell, rather than animating a new one." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 4th level or higher, you animate or reassert control over two additional undead creatures for each slot above 3rd. Each of the creatures must come from a different corpse or pile of bones."
    },
    "animate objects": {
        name: "Animate Objects",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 116], ["P", 213]],
        level: 5,
        school: "Trans",
        time: "1 a",
        range: "120 ft",
        components: "V,S",
        duration: "Conc, 1 min",
        description:
            "10+2/SL nonmagical objects not worn or carried; bns a command within 500 ft; see book",
        descriptionFull:
            "Objects come to life at your command. Choose up to ten nonmagical objects within range that are not being worn or carried. Medium targets count as two objects, Large targets count as four objects, Huge targets count as eight objects. You can't animate any object larger than Huge. Each target animates and becomes a creature under your control until the spell ends or until reduced to 0 hit points." +
            "\n   " +
            "As a bonus action, you can mentally command any creature you made with this spell if the creature is within 500 feet of you (if you control multiple creatures, you can command any or all of them at the same time, issuing the same command to each one). You decide what action the creature will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the creature only defends itself against hostile creatures. Once given an order, the creature continues to follow it until its task is complete." +
            "\n\n" +
            toUni("Animated Object Statistics") +
            "\n" +
            toUni("Size") +
            "\t" +
            toUni("HP   ") +
            toUni("AC   ") +
            toUni("To Hit    ") +
            toUni("Damage") +
            "\t" +
            toUni("Str   ") +
            toUni("Dex") +
            "\nTiny\t20    18        +8        1d4+4\t  4       18" +
            "\nSmall\t25    16        +6        1d8+2\t  6       14" +
            "\nMedium\t40    13        +5        2d6+1\t10       12" +
            "\nLarge\t50    10        +6        2d10+2\t14       10" +
            "\nHuge\t80    10        +8        2d12+4\t18         6" +
            "\n\n" +
            "An animated object is a construct with AC, hit points, attacks, Strength, and Dexterity determine by its size. Its Constitution is 10 and its Intelligence and Wisdom are 3, and its Charisma is 1. Its speed is 30 feet, if the objects lack legs or other appendages it can use for locomotion, it instead has a flying speed of 30 feet and can hover. If the object is securely attached to a surface or larger object, such as a chain bolted to a wall, its speed is 0. It has blindsight with a radius of 30 feet and is blind beyond that distance. When the animated object drops to 0 hit points, it reverts to its original object form, and any remaining damage carries over to its original object form." +
            "\n   " +
            "If you command an object to attack, it can make a single melee attack against a creature within 5 feet of it. It makes a slam attack with an attack bonus and bludgeoning damage determine by its size. The DM might rule that a specific object inflicts slashing or piercing damage based on its form." +
            AtHigherLevels +
            "If you cast this spell using a spell slot of 6th level or higher, you can animate two additional objects for each slot level above 5th."
    },
    "antilife shell": {
        name: "Antilife Shell",
        classes: ["druid"],
        source: [["SRD", 116], ["P", 213]],
        level: 5,
        school: "Abjur",
        time: "1 a",
        range: "10-ft rad",
        components: "V,S",
        duration: "Conc, 1 h",
        description:
            "Only undead and constructs can come within 10 ft; if forced upon living creature the spell ends",
        descriptionFull:
            "A shimmering barrier extends out from you in a 10-foot radius and moves with you, remaining centered on you and hedging out creatures other than undead and constructs." +
            "\n   " +
            "The barrier lasts for the duration. The barrier prevents an affected creature from passing or reaching through. An affected creature can cast spells or make attacks with ranged or reach weapons through the barrier." +
            "\n   " +
            "If you move so that an affect creature is forced to pass through the barrier, the spell ends."
    },
    "antimagic field": {
        name: "Antimagic Field",
        classes: ["cleric", "wizard"],
        source: [["SRD", 117], ["P", 213]],
        level: 8,
        school: "Abjur",
        time: "1 a",
        range: "10-ft rad",
        components: "V,S,M",
        compMaterial: "A pinch of powdered iron or iron filings",
        duration: "Conc, 1 h",
        description:
            "No magical effects functions in area except those created by an artefact or a deity",
        descriptionFull:
            "A 10-foot-radius invisible sphere of antimagic surrounds you. This area is divorced from the magical energy that suffuses the multiverse. Within the sphere, spells can't be cast, summoned creatures disappear, and even magic items become mundane. Until the spell ends, the sphere moves with you, centered on you." +
            "\n   " +
            "Spells and other magical effects, except those created by an artifact or a deity, are suppressed in the sphere and can't protrude into it. A slot expended to cast a suppressed spell is consumed. While an effect is suppressed, it doesn't function, but the time it spends suppressed counts against its duration." +
            "\n   " +
            toUni("Targeted Effects") +
            ": Spells and other magical effects, such as magic missile and charm person, that target a creature or an object in the sphere have no effect on that target." +
            "\n   " +
            toUni("Areas of Magic") +
            ": The area of another spell or magical effect, such as fireball, can't extend into the sphere. If the sphere overlaps an area of magic, the part of the area that is covered by the sphere is suppressed. For example, the flames created by a wall of fire are suppressed within the sphere, creating a gap in the wall if the overlap is large enough." +
            "\n   " +
            toUni("Spells") +
            ": Any active spell or other magical effect on a creature or an object in the sphere is suppressed while the creature or object is in it." +
            "\n   " +
            toUni("Magic Items") +
            ": The properties and powers of magic items are suppressed in the sphere. For example, a +1 long sword in the sphere functions as a nonmagical long sword. A magic weapon's properties and powers are suppressed if it is used against a target in the sphere or wielded by an attacker in the sphere. If a magic weapon or piece of magic ammunition fully leaves the sphere (For example, if you fire a magic arrow or throw a magic spear at a target outside the sphere), the magic of the item ceases to be suppressed as soon as it exits." +
            "\n   " +
            toUni("Magical Travel") +
            ": Teleportation and planar travel fail to work in the sphere, whether the sphere is the destination or the departure point for such magical travel. A portal to another location, world, or plane of existence, as well as an opening to an extradimensional space such as that created by the rope trick spells, temporarily closes while in the sphere." +
            "\n   " +
            toUni("Creatures and Objects") +
            ": A creature or object summoned or created by magic temporarily winks out of existence in the sphere. Such a creature instantly reappears once the space the creature occupied is no longer within the sphere." +
            "\n   " +
            toUni("Dispel Magic") +
            ": Spells and magical effects such as dispel magic have no effect on the sphere. Likewise, the spheres created by different antimagic field spells don't nullify each other."
    },
    "antipathy/sympathy": {
        name: "Antipathy/Sympathy",
        classes: ["druid", "wizard"],
        source: [["SRD", 117], ["P", 214]],
        level: 8,
        school: "Ench",
        time: "1 h",
        range: "60 ft",
        components: "V,S,M",
        compMaterial:
            "Either a lump of alum soaked in vinegar for the antipathy effect or a drop of honey for the sympathy effect",
        duration: "10 days",
        save: "Wis",
        description:
            "Creature, object, or area up to 200-ft cube attracts or repels specific type of intelligent crea; see book",
        descriptionFull:
            "This spell attracts or repels creatures of your choice. You target something within range, either a Huge or smaller object or creature or an area that is no larger than a 200-foot cube. Then specify a kind of intelligent creature, such as red dragons, goblins, or vampires. You invest the target with an aura that either attracts or repels the specified creatures for the duration. Choose antipathy or sympathy as the aura's effect." +
            "\n   " +
            toUni("Antipathy") +
            ": The enchantment causes creatures of the kind you designated to feel an intense urge to leave the area and avoid the target. When such a creature can see the target or comes within 60 feet of it, the creature must succeed on a Wisdom saving throw or become frightened. The creature remains frightened while it can see the target or is within 60 feet of it. While frightened by the target, the creature must use its movement to move to the nearest safe spot from which it can't see the target. If the creature moves more than 60 feet from the target and can't see it, the creature is no longer frightened, but the creature becomes frightened again if it regains sight of the target or moves within 60 feet of it." +
            "\n   " +
            toUni("Sympathy") +
            ": The enchantment causes the specified creatures to feel an intense urge to approach the target while within 60 feet of it or able to see it. When such a creature can see the target or comes within 60 feet of it, the creature must succeed on a Wisdom saving throw or use its movement on each of its turns to enter the area or move within reach of the target. When the creature has done so, it can't willingly move away from the target. If the target damages or otherwise harms an affected creature, the affected creature can make a Wisdom saving throw to end the effect, as described below." +
            "\n   " +
            toUni("Ending the Effect") +
            ": If an affected creature ends its turn while not within 60 feet of the target or able to see it, the creature makes a Wisdom saving throw. ON a successful save, the creature is no longer affected by the target and recognizes the feeling of repugnance or attraction as magical. In addition, a creature affected by the spells is allowed another Wisdom saving throw every 24 hours while the spell persists." +
            "\n   " +
            "A creature that successfully saves against this effect is immune to it for 1 minute, after which time it can be affected again."
    },
    "arcane eye": {
        name: "Arcane Eye",
        classes: ["wizard"],
        source: [["SRD", 118], ["P", 214]],
        level: 4,
        school: "Div",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "A bit of bat fur",
        duration: "Conc, 1 h",
        description:
            'Create invisible, moving (unlimited range, 30 ft/rnd) 1" magic eye with darkvision I see through',
        descriptionFull:
            "You create an invisible, magical eye within range that hovers in the air for the duration." +
            "\n   " +
            "You mentally receive visual information from the eye, which has normal vision and darkvision out to 30 feet. The eye can look in every direction." +
            "\n   " +
            "As an action, you can move the eye up to 30 feet in any direction. There is no limit to how far away from you the eye can move, but it can't enter another plane of existence. A solid barrier blocks the eye's movement, but the eye can pass through an opening as small as 1 inch in diameter."
    },
    "arcane lock": {
        name: "Arcane Lock",
        classes: ["wizard"],
        source: [["SRD", 118], ["P", 215]],
        level: 2,
        school: "Abjur",
        time: "1 a",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial:
            "Gold dust worth at least 25 gp, which the spell consumes",
        duration: "Till dispelled",
        description:
            "Entryway locked; password or designated crea opens; +10 DC break/pick lock (25gp cons.)",
        descriptionFull:
            "You touch a closed door, window, gate, chest, or other entryway, and it becomes locked for the duration. You and the creatures you designate when you cast this spell can open the object normally. You can also set a password that, when spoken within 5 feet of the object, suppresses this spell for 1 minute. Otherwise, it is impassable until it is broken or the spell is dispelled or suppressed. Casting knock on the object suppresses arcane lock for 10 minutes." +
            "\n   " +
            "While affected by this spell, the object is more difficult to break or force open; the DC to break it or pick any locks on it increases by 10."
    },
    "astral projection": {
        name: "Astral Projection",
        classes: ["cleric", "warlock", "wizard"],
        source: [["SRD", 119], ["P", 215]],
        level: 9,
        school: "Necro",
        time: "1 h",
        range: "10 ft",
        components: "V,S,M\u2020",
        compMaterial:
            "For each creature you affect with this spell, you must provide one jacinth worth at least 1,000 gp and one ornately carved bar of silver worth at least 100 gp, all of which the spell consumes",
        duration: "Special (D)",
        description:
            "Me + 8 willing crea projected to Astral Plane with identical statistics (per crea 1100gp cons.)",
        descriptionFull:
            "You and up to eight willing creatures within range project your astral bodies into the Astral Plane (the spell fails and the casting is wasted if you are already on that plane). The material body you leave behind is unconscious and in a state of suspended animation, it doesn't need food or air and doesn't age." +
            "\n   " +
            "Your astral body resembles your mortal form in almost every way, replicating your game statistics and possessions. The principal difference is the addition of a silvery cord that extends from between your shoulder blades and trails behind you, fading to invisibility after 1 foot. This cord is your tether to your material body. As long as the tether remains intact, you can find your way home. If the cord is cut-something that can happen only when an effect specifically states that it does-your soul and body are separated, killing you instantly." +
            "\n   " +
            "Your astral form can freely travel through the Astral Plane and can pass through portals there leading to any other plane. If you enter a new plane or return to the plane you were on when casting this spell, your body and possessions are transported along the silver cord, allowing you to re-enter your body as you enter the new plane. Your astral form is a separate incarnation. Any damage or other effects that apply to it have no effect on your physical body, nor do they persist when you return to it." +
            "\n   " +
            "The spell ends for you and your companions when you use your action to dismiss it. When the spell ends, the affected creature returns to its physical body, and it awakens." +
            "\n   " +
            "The spell might also end early for you or one of your companions. A successful dispel magic spell used against an astral or physical body ends the spell for that creature. If a creature's original body or its astral form drops to 0 hit points, the spell ends for that creature. If the spell ends and the silver cord is intact, the cord pulls the creature's astral form back to its body, ending its state of suspended animation." +
            "\n   " +
            "If you are returned to your body prematurely, your companions remain in their astral forms and must find their own way back to their bodies, usually by dropping to 0 hit points."
    },
    augury: {
        name: "Augury",
        classes: ["cleric"],
        source: [["SRD", 120], ["P", 215]],
        ritual: true,
        level: 2,
        school: "Div",
        time: "1 min",
        range: "Self",
        components: "V,S,M\u0192",
        compMaterial:
            "Specially marked sticks, bones, or similar tokens worth at least 25 gp",
        duration: "Instantaneous",
        description:
            "Omen about specific course of action I plan to take in the next 30 min (25gp)",
        descriptionFull:
            "By casting gem-inlaid sticks, rolling dragon bones, laying out ornate cards, or employing some other divining tool, you receive an omen from an otherworldly entity about the results of a specific course of action that you plan to take within the next 30 minutes. The DM chooses from the following possible omens." +
            "\n " +
            "\u2022 Weal, for good results" +
            "\n " +
            "\u2022 Woe, for bad results" +
            "\n " +
            "\u2022 Weal and woe, for both good and bad results" +
            "\n " +
            "\u2022 Nothing, for results that aren't especially good or bad" +
            "\n\n" +
            "The spell doesn't take into account any possible circumstances that might change the outcome, such as the casting of additional spells or the loss or gain of a companion." +
            "\n   " +
            "If you cast the spell two or more times before completing your next long rest, there is a cumulative 25 percent chance for each casting after the first that you get a random reading. The DM makes this roll in secret."
    },
    awaken: {
        name: "Awaken",
        classes: ["bard", "druid"],
        source: [["SRD", 120], ["P", 216]],
        level: 5,
        school: "Trans",
        time: "8 h",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial:
            "An agate worth at least 1,000 gp, which the spell consumes",
        duration: "Instantaneous",
        description:
            "Give beast or plant Int 10 and ability to move. Follows commands for 30 days (1000gp cons.)",
        descriptionFull:
            "After spending the casting time tracing magical pathways within a precious gemstone, you touch a huge or smaller beast or plant. The target must have either no Intelligence score or an Intelligence of 3 or less. The target gains an Intelligence of 10. The target also gains the ability to speak one language you know. If the target is a plant, it gains the ability to move its limbs, roots, vines, creepers, and so forth, and it gains senses similar to a human's. Your DM chooses statistics appropriate for the awakened plant, such as the statistics for the awakened shrub or the awakened tree." +
            "\n   " +
            "The awakened beast or plant is charmed by you for 30 days or until you and your companions do anything harmful to it. When the charmed condition ends, the awakened creature chooses whether to remain friendly to you, based on how you treated it while it was charmed."
    },
    bane: {
        name: "Bane",
        classes: ["bard", "cleric"],
        source: [["SRD", 120], ["P", 216]],
        level: 1,
        school: "Ench",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "A drop of blood",
        duration: "Conc, 1 min",
        save: "Cha",
        description:
            "3+1/SL creatures save or have to subtract 1d4 on every attack or save for the duration",
        descriptionFull:
            "Up to three creatures of your choice that you can see within range must make Charisma saving throws. Whenever a target that fails this saving throw makes an attack roll or a saving throw before the spell ends, the target must roll a d4 and subtract the number rolled from the attack roll or saving throw." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st."
    },
    banishment: {
        name: "Banishment",
        classes: ["cleric", "paladin", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 120], ["P", 217]],
        level: 4,
        school: "Abjur",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M",
        compMaterial: "An item distasteful to the target",
        duration: "Conc, 1 min",
        save: "Cha",
        description:
            "1+1/SL crea save or banished; crea return if spell lasts < 1 min",
        descriptionFull:
            "You attempt to send one creature that you can see within range to another place of existence. The target must succeed on a Charisma saving throw or be banished." +
            "\n   " +
            "If the target is native to the plane of existence you're on, you banish the target to a harmless demiplane. While there, the target is incapacitated. The target remains there until the spell ends, at which point the target reappears in the space it left or in the nearest unoccupied space if that space is occupied." +
            "\n   " +
            "If the target is native to a different plane of existence that the one you're on, the target is banished with a faint popping noise, returning to its home plane. If the spell ends before 1 minute has passed, the target reappears in the space it left or in the nearest unoccupied space if that space is occupied. Otherwise, the target doesn't return." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 5th level or higher, you can target one additional creature for each slot level above 4th."
    },
    barkskin: {
        name: "Barkskin",
        classes: ["druid", "ranger"],
        source: [["SRD", 121], ["P", 217]],
        level: 2,
        school: "Trans",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "A handful of oak bark",
        duration: "Conc, 1 h",
        description:
            "1 willing crea AC cannot be reduced below 16, regardless of armor it is wearing",
        descriptionFull:
            "You touch a willing creature. Until the spell ends, the target's skin has a rough, bark-like appearance, and the target's AC can't be less than 16, regardless of what kind of armor it is wearing."
    },
    "beacon of hope": {
        name: "Beacon of Hope",
        classes: ["cleric"],
        source: [["SRD", 121], ["P", 217]],
        level: 3,
        school: "Abjur",
        time: "1 a",
        range: "30 ft",
        components: "V,S",
        duration: "Conc, 1 min",
        description:
            "Any crea in range adv. on Wis/Death saves and gains max HP from any healing",
        descriptionFull:
            "This spell bestows hope and vitality. Choose any number of creatures within range. For the duration, each target has advantage on Wisdom saving throws and death saving throws, and regains the maximum number of hit points possible from any healing."
    },
    "bestow curse": {
        name: "Bestow Curse",
        classes: ["bard", "cleric", "wizard"],
        source: [["SRD", 121], ["P", 218]],
        level: 3,
        school: "Necro",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "1 creature save or cursed, see book; duration SL4:conc, 10 min; SL5:8h; SL7:24h; SL9:until dispelled",
        descriptionFull:
            "You touch a creature, and that creature must succeed on a Wisdom saving throw or become cursed for the duration of the spell. When you cast this spell, choose the nature of the curse from the following options." +
            "\n " +
            "\u2022 Choose one ability score. While cursed, the target has disadvantage on ability checks and saving throws made with that ability score." +
            "\n " +
            "\u2022 While cursed, the target has disadvantage on attack rolls against you." +
            "\n " +
            "\u2022 While cursed, the target must make a Wisdom saving throw at the start of each of its turns. If it fails, it wastes its action that turn doing nothing." +
            "\n " +
            "\u2022 While the target is cursed, your attacks and spells deal an extra 1d8 necrotic damage to the target." +
            "\n\n" +
            "A remove curse spell ends this effect. At the DM's option, you may choose an alternative curse effect, but it should be no more powerful than those described above. The DM has final say on such a curse's effect." +
            AtHigherLevels +
            "If you cast this spell using a spell slot of 4th level or higher, the duration is concentration, up to 10 minutes. If you use a spell slot of 5th level or higher, the duration is 8 hours. If you use a spell slot of 7th level or higher, the duration is 24 hours. If you use a 9th level spell slot, the spell lasts until it is dispelled. Using a spell slot of 5th level or higher grants a duration that doesn't require concentration."
    },
    "bigby's hand": {
        name: "Bigby's Hand",
        nameAlt: "Arcane Hand",
        classes: ["wizard"],
        source: [["SRD", 118], ["P", 218]],
        level: 5,
        school: "Evoc",
        time: "1 a",
        range: "120 ft",
        components: "V,S,M",
        compMaterial: "An eggshell and a snakeskin glove",
        duration: "Conc, 1 min",
        description:
            "Large hand attacks, pushes, grapples or shields, see book; AC 20, my max HP; bns a move 60 ft",
        descriptionFull:
            "You create a Large hand of shimmering, translucent force in an unoccupied space that you can see within range. The hand lasts for the spell's duration, and it moves at your command, mimicking the movements of your own hand." +
            "\n   " +
            "The hand is an object that has AC 20 and hit points equal to your hit point maximum. If it drops to 0 hit points, the spell ends. It has a Strength of 26 (+8) and a Dexterity of 10 (+0). The hand doesn't fill its space." +
            "\n   " +
            "When you cast the spell and as a bonus action on your subsequent turns, you can move the hand up to 60 feet and then cause one of the following effects with it." +
            "\n   " +
            "Clenched Fist. The hand strikes one creature or object within 5 feet of it. Make a melee spell attack for the hand using your game statistics. On a hit, the target takes 4d8 force damage." +
            "\n   " +
            "Forceful Hand. The hand attempts to push a creature within 5 feet of it in a direction you choose. Make a check with the hand's Strength contested by the Strength (Athletics) check of the target. If the target is Medium or smaller, you have advantage on the check. If you succeed, the hand pushes the target up to 5 feet plus a number of feet equal to five times your spellcasting ability modifier. The hand moves with the target to remain within 5 feet of it." +
            "\n   " +
            "Grasping Hand. The hand attempts to grapple a Huge or smaller creature within 5 feet of it. You use the hand's Strength score to resolve the grapple. If the target is Medium or smaller, you have advantage on the check. While the hand is grappling the target, you can use a bonus action to have the hand crush it. When you do so, the target takes bludgeoning damage equal to 2d6 + your spellcasting ability modifier." +
            "\n   " +
            "Interposing Hand. The hand interposes itself between you and a creature you choose until you give the hand a different command. The hand moves to stay between you and the target, providing you with half cover against the target. The target can't move through the hand's space if its Strength score is less than or equal to the hand's Strength score. If its Strength score is higher than the hand's Strength score, the target can move toward you through the hand's space, but that space is difficult terrain for the target." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 6th level or higher, the damage from the clenched fist option increases by 2d8 and the damage from the grasping hand increases by 2d6 for each slot level above 5th."
    },
    "blade barrier": {
        name: "Blade Barrier",
        classes: ["cleric"],
        source: [["SRD", 122], ["P", 218]],
        level: 6,
        school: "Evoc",
        time: "1 a",
        range: "90 ft",
        components: "V,S",
        duration: "Conc, 10 min",
        save: "Dex",
        description:
            "100\u00D720\u00D75ft (l\u00D7w\u00D7h) wall or 30 rad 20\u00D75ft (w\u00D7h) ring; 6d10 Slashing dmg; save halves; 3/4 cover",
        descriptionMetric:
            "60\u00D76\u00D71,5m (l\u00D7w\u00D7h) wall or 9 rad 6\u00D71,5m (w\u00D7h) ring; 6d10 Slashing dmg; save halves; 3/4 cover",
        descriptionFull:
            "You create a vertical wall of whirling, razor-sharp blades made of magical energy. The wall appears within range and lasts for the duration. You can make a straight wall up to 100 feet long, 20 feet high, and 5 feet thick, or a ringed wall up to 60 feet in diameter, 20 feet high, and 5 feet thick. The wall provides three-quarters cover to creatures behind it, and its space is difficult terrain." +
            "\n   " +
            "When a creature enters the wall's area for the first time on a turn or starts its turn there, the creature must make a Dexterity saving throw. On a failed save, the creature takes 6d10 slashing damage. On a successful save, the creature takes half as much damage."
    },
    bless: {
        name: "Bless",
        classes: ["cleric", "paladin"],
        source: [["SRD", 122], ["P", 219]],
        level: 1,
        school: "Ench",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "A sprinkling of holy water",
        duration: "Conc, 1 min",
        description:
            "3+1/SL creatures can add 1d4 on every attack roll or saving throw during the duration",
        descriptionFull:
            "You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st."
    },
    blight: {
        name: "Blight",
        classes: ["druid", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 122], ["P", 219]],
        level: 4,
        school: "Necro",
        time: "1 a",
        range: "30 ft",
        components: "V,S",
        duration: "Instantaneous",
        save: "Con",
        description:
            "1 creature takes 8d8+1d8/SL Necrotic dmg; save halves; plants have dis. on save",
        descriptionFull:
            "Necromantic energy washes over a creature of your choice that you can see within range, draining moisture and vitality from it. The target must make a Constitution saving throw. The target takes 8d8 necrotic damage on a failed save, or half as much damage on a successful one. This spell has no effect on undead or constructs." +
            "\n   " +
            "If you target a plant creature or a magical plant, it makes the saving throw with disadvantage, and the spell deals maximum damage to it." +
            "\n   " +
            "If you target a nonmagical plant that isn't a creature, such as a tree or shrub, it doesn't make a saving throw, it simply withers and dies." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d8 for each slot level above 4th."
    },
    "blindness/deafness": {
        name: "Blindness/Deafness",
        classes: ["bard", "cleric", "sorcerer", "wizard"],
        source: [["SRD", 122], ["P", 219]],
        level: 2,
        school: "Necro",
        time: "1 a",
        range: "30 ft",
        components: "V",
        duration: "1 min",
        save: "Con",
        description:
            "1+1/SL crea save or blinded or deafened; extra save at end of every turn",
        descriptionFull:
            "You can blind or deafen a foe. Choose one creature that you can see within range to make a Constitution saving throw. If it fails, the target is either blinded or deafened (your choice) for the duration. At the end of each of its turns, the target can make a Constitution saving throw. On a success, the spell ends." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd."
    },
    blink: {
        name: "Blink",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 122], ["P", 219]],
        level: 3,
        school: "Trans",
        time: "1 a",
        range: "Self",
        components: "V,S",
        duration: "1 min (D)",
        description:
            "50% chance every turn to travel to Ethereal Plane and return to an empty space within 10 ft next turn",
        descriptionFull:
            "Roll a d20 at the end of each of your turns for the duration of the spell. On a roll of 11 or higher, you vanish from your current plane of existence and appear in the Ethereal Plane (the spell fails and the casting is wasted if you were already on that plane). At the start of you next turn, and when the spell ends if you are on the Ethereal Plane, you return to an unoccupied space of your choice that you can see within 10 feet of the space you vanished from. If no unoccupied space is available within that range, you appear in the nearest unoccupied space (chosen at random if more than one space is equally near). You can dismiss this spell as an action." +
            "\n   " +
            "While on the Ethereal Plane, you can see and hear the plane you originated from, which is cast in shades of gray, and you can't see anything more than 60 feet away. You can only affect and be affected by other creatures on the Ethereal Plane. Creature that aren't there can't perceive you or interact with you, unless they have the ability to do so."
    },
    blur: {
        name: "Blur",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 123], ["P", 219]],
        level: 2,
        school: "Illus",
        time: "1 a",
        range: "Self",
        components: "V",
        duration: "Conc, 1 min",
        description:
            "Enemies have dis. on attacks vs. me; no effect against crea without vision or immune to illus.",
        descriptionFull:
            "Your body becomes blurred, shifting and wavering to all who can see you. For the duration, any creature has disadvantage on attack rolls against you. An attacker is immune to this effect if it doesn't rely on sight, as with blindsight, or can see through illusions, as with truesight."
    },
    "branding smite": {
        name: "Branding Smite",
        classes: ["paladin"],
        source: [["SRD", 123], ["P", 219]],
        level: 2,
        school: "Evoc",
        time: "1 bns",
        range: "Self",
        components: "V",
        duration: "Conc, 1 min",
        description:
            "Next weapon hit +2d6+1d6/SL Radiant dmg; invisible target becomes visible for spell duration",
        descriptionFull:
            "The next time you hit a creature with a weapon attack before this spell ends, the weapon gleams with astral radiance as you strike. The attack deals an extra 2d6 radiant damage to the target, which becomes visible if it is invisible, and the target sheds dim light in a 5-foot radius and can't become invisible until the spell ends." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 3rd level or higher, the extra damage increases by 1d6 for each slot level above 2nd."
    },
    "burning hands": {
        name: "Burning Hands",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 123], ["P", 220]],
        level: 1,
        school: "Evoc",
        time: "1 a",
        range: "15-ft cone",
        components: "V,S",
        duration: "Instantaneous",
        save: "Dex",
        description:
            "All in area 3d6+1d6/SL Fire dmg; save halves; unattended flammable objects ignite",
        descriptionFull:
            "As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            "The fire ignites any flammable objects in the area that aren't being worn or carried." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st."
    },
    "call lightning": {
        name: "Call Lightning",
        classes: ["druid"],
        source: [["SRD", 123], ["P", 220]],
        level: 3,
        school: "Conj",
        time: "1 a",
        range: "120 ft",
        components: "V,S",
        duration: "Conc, 10 min",
        save: "Dex",
        description:
            "60-ft rad 10-ft high cloud; 1 a all in 5-ft rad under cloud 3d10+1d10/SL Lightning dmg; save half",
        descriptionFull:
            "A storm cloud appears in the shape of a cylinder that is 10 feet tall with a 60-foot radius, centered on a point you can see within range directly above you. The spell fails if you can't see a point in the air where the storm cloud could appear (for example, if you are in a room that can't accommodate the cloud)." +
            "\n   " +
            "When you cast the spell, choose a point you can see under the cloud. A bolt of lightning flashes down from the cloud to that point. Each creature within 5 feet of that point must make a Dexterity saving throw. A creature takes 3d10 lightning damage on a failed save, or half as much damage on a successful one. On each of your turns until the spell ends, you can use your action to call down lightning in this way again, targeting the same point or a different one." +
            "\n   " +
            "If you are outdoors in stormy conditions when you cast this spell, the spell gives you control over the existing storm instead of creating a new one. Under such conditions, the spell's damage increases by 1d10." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 4th level or higher level, the damage increases by 1d10 for each slot level above 3rd."
    },
    "calm emotions": {
        name: "Calm Emotions",
        classes: ["bard", "cleric"],
        source: [["SRD", 123], ["P", 221]],
        level: 2,
        school: "Ench",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Conc, 1 min",
        save: "Cha",
        description:
            "20-ft rad all humanoids save or I suppress either charm/fear effects or hostility ",
        descriptionFull:
            "You attempt to suppress strong emotions in a group of people. Each humanoid in a 20-foot-radius sphere centered on a point you choose within range must make a Charisma saving throw a creature can choose to fail this saving throw if it wishes. If a creature fails its saving throw, choose one of the following two effects." +
            "\n   " +
            "You can suppress any effect causing a target to be charmed or frightened. When this spell ends, any suppressed effect resumes, provided that its duration has not expired in the meantime." +
            "\n   " +
            "Alternatively, you can make a target indifferent about creatures of your choice that it is hostile toward. This indifference ends if the target is attacked or harmed by a spell or if it witnesses any of its friends being harmed. When the spell ends, the creature becomes hostile again, unless the DM rules otherwise."
    },
    "chain lightning": {
        name: "Chain Lightning",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 124], ["P", 221]],
        level: 6,
        school: "Evoc",
        time: "1 a",
        range: "150 ft",
        components: "V,S,M",
        compMaterial:
            "A bit of fur, a piece of amber, glass, or crystal rod, and three silver pins",
        duration: "Instantaneous",
        save: "Dex",
        description:
            "Lightning bolt 1 crea and 3+1/SL crea within 30 ft; 10d8 Lightning dmg; save halves",
        descriptionFull:
            "You create a bolt of lightning that arcs toward a target of your choice that you can see within range. Three bolts then leap from that target to as many as three other targets, each of which must be within 30 feet of the first target. A target can be a creature or an object and can be targeted by only one of the bolts." +
            "\n   " +
            "A target must make a Dexterity saving throw. The target takes 10d8 lightning damage on a failed save, or half as much on a successful one." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 7th level or higher, one additional bolt leaps from the first target to another target for each slot level above 6th."
    },
    "charm person": {
        name: "Charm Person",
        classes: ["bard", "druid", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 124], ["P", 221]],
        level: 1,
        school: "Ench",
        time: "1 a",
        range: "30 ft",
        components: "V,S",
        duration: "1 h",
        save: "Wis",
        description:
            "1+1/SL humanoids, each max 30 ft apart, save or charmed; adv. on save if me/ally is fighting it",
        descriptionFull:
            "You attempt to charm a humanoid you can see within range. It must make a Wisdom saving throw, and does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is charmed by you until the spell ends or until you or your companions do anything harmful to it. The charmed creature regards you as a friendly acquaintance. When the spell ends, the creature knows it was charmed by you." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them."
    },
    "chill touch": {
        name: "Chill Touch",
        classes: ["sorcerer", "warlock", "wizard"],
        source: [["SRD", 124], ["P", 221]],
        level: 0,
        school: "Necro",
        time: "1 a",
        range: "120 ft",
        components: "V,S",
        duration: "1 rnd",
        description:
            "Spell attack for 1d8 Necrotic dmg; can't regain HP; undead dis. atks vs. me; +1d8 at CL 5, 11, and 17",
        descriptionCantripDie:
            "Spell attack for `CD`d8 Necrotic dmg; can't regain hp; undead dis. atks vs. me",
        descriptionFull:
            "You create a ghostly, skeletal hand in the space of a creature within range. Make a ranged spell attack against the creature to assail it with the chill of the grave. On a hit, the target takes 1d8 necrotic damage, and it can't regain hit points until the start of your next turn. Until then, the hand clings to the target." +
            "\n   " +
            "If you hit an undead target, it also has disadvantage on attack rolls against you until the end of your next turn." +
            "\n   " +
            "This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
    },
    "circle of death": {
        name: "Circle of Death",
        classes: ["sorcerer", "warlock", "wizard"],
        source: [["SRD", 124], ["P", 221]],
        level: 6,
        school: "Necro",
        time: "1 a",
        range: "150 ft",
        components: "V,S,M\u0192",
        compMaterial:
            "The powder of a crushed black pearl worth at least 500 gp",
        duration: "Instantaneous",
        save: "Con",
        description:
            "60-ft rad all 8d6+2d6/SL Necrotic dmg; save halves (500gp)",
        descriptionFull:
            "A sphere of negative energy ripples out in a 60-foot-radius sphere from a point within range. Each creature in that area must make a Constitution saving throw. A target takes 8d6 necrotic damage on a failed save, or half as much damage on a successful one." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 7th level or higher, the damage increases by 2d6 for each slot level above 6th."
    },
    clairvoyance: {
        name: "Clairvoyance",
        classes: ["bard", "cleric", "sorcerer", "wizard"],
        source: [["SRD", 124], ["P", 222]],
        level: 3,
        school: "Div",
        time: "10 min",
        range: "1 mile",
        components: "V,S,M\u0192",
        compMaterial:
            "A focus worth at least 100 gp, either a jeweled horn for hearing or a glass eye for scrying",
        duration: "Conc, 10 min",
        description:
            "See or hear a familiar place; 1 a to switch between seeing and hearing (100gp)",
        descriptionFull:
            "You create an invisible sensor within range in a location familiar to you (a place you have visited or seen before) or in an obvious location that is unfamiliar to you (such as behind a door, around a corner, or in a grove of trees). The sensor remains in place for the duration, and it can't be attacked or otherwise interacted with. When you cast the spell, you choose seeing or hearing. You can use the chosen sense through the sensor as if you were in its space. As your action, you can switch between seeing and hearing. A creature that can see the sensor (such as a creature benefitting from see invisibility or truesight) sees a luminous, intangible orb about the size of your fist." +
            "\n   " +
            "When you cast the spell, you choose seeing or hearing. You can use the chosen sense through the sensor as if you were in its space. As your action, you can switch between seeing and hearing. A creature that can see the sensor (such as a creature benefitting from see invisibility or truesight) sees a luminous, intangible orb about the size of your fist." +
            "\n   " +
            "A creature that can see the sensor (such as a creature benefitting from see invisibility or truesight) sees a luminous, intangible orb about the size of your fist."
    },
    clone: {
        name: "Clone",
        classes: ["wizard"],
        source: [["SRD", 125], ["P", 222]],
        level: 8,
        school: "Necro",
        time: "1 h",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial:
            "A diamond worth at least 1,000 gp and at least 1 cubic inch of flesh of the creature that is to be cloned, which the spell consumes, and a vessel worth at least 2,000 gp that has a sealable lid and is large enough to hold a Medium creature, such as a huge urn, coffin, mud-filled cyst in the ground, or crystal container filled with salt water",
        duration: "Instantaneous",
        description:
            "Create a clone of a living crea; after death its soul can move to the clone (1K gp cons.; 2K gp)",
        descriptionFull:
            "This spell grows an inert duplicate of a living creature as a safeguard against death. This clone forms inside as a sealed vessel and grows to full size and maturity after 120 days you can also choose to have the clone be a younger version of the same creature. It remains inert and endures indefinitely, as long as its vessel remains undisturbed." +
            "\n   " +
            "At any time after the clone matures, if the original creature dies, its soul transfers to the clone, provided that the soul is free and willing to return. The clone is physically identical to the original and has the same personality, memories, and abilities, but none of the original's equipment. The original creature's physical remains, if they still exist, become inert and can't thereafter be restored to life, since the creature's soul is elsewhere."
    },
    cloudkill: {
        name: "Cloudkill",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 125], ["P", 222]],
        level: 5,
        school: "Conj",
        time: "1 a",
        range: "120 ft",
        components: "V,S",
        duration: "Conc, 10 min",
        save: "Con",
        description:
            "20-ft rad 5d8+1d8/SL Poison dmg; save halves; move 10 ft/rnd; heavily obscured, difficult terrain",
        descriptionFull:
            "You create a 20-foot-radius sphere of poisonous, yellow-green fog centered on a point you choose within range. The fog spreads around corners. It lasts for the duration or until strong wind disperses the fog, ending the spell. Its area is heavily obscured." +
            "\n   " +
            "When a creature enters the spell's area for the first time on a turn or starts its turn there, that creature must make a Constitution saving throw. The creature takes 5d8 poison damage on a failed save, or half as much damage on a successful one. Creatures are affected even if they hold their breath or don't need to breathe." +
            "\n   " +
            "The fog moves 10 feet away from you at the start of each of your turns, rolling along the surface of the ground. The vapors, being heavier than air, sink to the lowest level of the land, even pouring down openings." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 5th."
    },
    "color spray": {
        name: "Color Spray",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 125], ["P", 222]],
        level: 1,
        school: "Illus",
        time: "1 a",
        range: "15-ft cone",
        components: "V,S,M",
        compMaterial:
            "A pinch of powder or sand that is colored red, yellow, and blue",
        duration: "1 rnd",
        description:
            "6d10+2d10/SL HP of crea blinded, starting with the lowest current HP crea",
        descriptionFull:
            "A dazzling array of flashing, colored light springs from your hand. Roll 6d10, the total is how many hit points of creatures this spell can effect. Creatures in a 15-foot cone originating from you are affected in ascending order of their current hit points (ignoring unconscious creatures and creatures that can't see)." +
            "\n   " +
            "Starting with the creature that has the lowest current hit points, each creature affected by this spell is blinded until the end of your next turn. Subtract each creature's hit points from the total before moving on to the creature with the next lowest hit points. A creature's hit points must be equal to or less than the remaining total for the creature to be affected." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, roll an additional 2d10 for each slot level above 1st."
    },
    command: {
        name: "Command",
        classes: ["cleric", "paladin"],
        source: [["SRD", 125], ["P", 223]],
        level: 1,
        school: "Ench",
        time: "1 a",
        range: "60 ft",
        components: "V",
        duration: "1 rnd",
        save: "Wis",
        description:
            "1+1/SL crea, each max 30 ft apart, save or follow one word command, e.g. approach, drop, flee, halt",
        descriptionFull:
            "You speak a one-word command to a creature you can see within range. The target must succeed on a Wisdom saving throw or follow the command on its next turn. The spell has no effect if the target is undead, if it doesn't understand your language, or if your command is directly harmful to it." +
            "\n   " +
            "Some typical commands and their effects follow. You might issue a command other than one described here. If you do so, the DM determines how the target behaves. If the target can't follow your command, the spell ends." +
            "\n   " +
            toUni("Approach") +
            ": The target moves toward you by the shortest and most direct route, ending its turn if it moves within 5 feet of you." +
            "\n   " +
            toUni("Drop") +
            ": The target drops whatever it is holding and then ends its turn." +
            "\n   " +
            toUni("Flee") +
            ": The target spends its turn moving away from you by the fastest available means." +
            "\n   " +
            toUni("Grovel") +
            ": The target falls prone and then ends its turn." +
            "\n   " +
            toUni("Halt") +
            ": The target doesn't move and takes no actions. A flying creature stays aloft, provided that it is able to do so. If it must move to stay aloft, it flies the minimum distance needed to remain in the air." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them."
    },
    commune: {
        name: "Commune",
        classes: ["cleric"],
        source: [["SRD", 126], ["P", 223]],
        ritual: true,
        level: 5,
        school: "Div",
        time: "1 min",
        range: "Self",
        components: "V,S,M",
        compMaterial: "Incense and a vial of holy or unholy water",
        duration: "1 min",
        description:
            "Ask up to three yes/no questions to my deity or a divine proxy (25gp)",
        descriptionFull:
            "You contact your deity or a divine proxy and ask up to three questions that can be answered with a yes or no. You must ask your questions before the spell ends. You receive a correct answer for each question." +
            "\n   " +
            "Divine beings aren't necessarily omniscient, so you might receive \"unclear\" as an answer if a question pertains to information that lies beyond the deity's knowledge. In a case where a one-word answer could be misleading or contrary to the deity's interests, the DM might offer a short phrase as an answer instead." +
            "\n   " +
            "If you cast the spell two or more times before finishing your next long rest, there is a cumulative 25 percent chance for each casting after the first that you get no answer. The DM makes this roll in secret."
    },
    "commune with nature": {
        name: "Commune with Nature",
        nameShort: "Commune w. Nature",
        classes: ["druid", "ranger"],
        source: [["SRD", 126], ["P", 224]],
        ritual: true,
        level: 5,
        school: "Div",
        time: "1 min",
        range: "Self",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "Know 3 facts about natural features in 3 miles rad (300 ft rad underground)",
        descriptionFull:
            "You briefly become one with nature and gain knowledge of the surrounding territory. In the outdoors, the spell gives you knowledge of the land within 3 miles of you. In caves and other natural underground settings, the radius is limited to 300 feet. The spell doesn't function where nature has been replaced by construction, such as in dungeons and towns." +
            "\n   " +
            "You instantly gain knowledge of up to three facts of your choice about any of the following subjects as they relate to the area - terrain and bodies of water; prevalent plants, minerals, animals, or peoples; powerful celestials, fey, fiends, elementals, or undead; influence from other planes of existence; buildings." +
            "\n   " +
            "For example, you could determine the location of powerful undead in the area, the location of major sources of safe drinking water, and the location of any nearby towns."
    },
    "comprehend languages": {
        name: "Comprehend Languages",
        nameShort: "Comp. Languages",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 126], ["P", 224]],
        ritual: true,
        level: 1,
        school: "Div",
        time: "1 a",
        range: "Self",
        components: "V,S,M",
        compMaterial: "A pinch of soot and salt",
        duration: "1 h",
        description:
            "Understand all spoken language or written language when touched; does not help vs. cyphers",
        descriptionFull:
            "For the duration, you understand the literal meaning of any spoken language that you hear. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minute to read one page of text." +
            "\n   " +
            "This spell doesn't decode secret messages in a text or glyph, such as an arcane sigil, that isn't part of a written language."
    },
    compulsion: {
        name: "Compulsion",
        classes: ["bard"],
        source: [["SRD", 126], ["P", 224]],
        level: 4,
        school: "Ench",
        time: "1 a",
        range: "30 ft",
        components: "V,S",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "Any crea that hear me save or I can, as bns, have it move fully in one direction; save again after move",
        descriptionFull:
            "Creatures of your choice that you can see within range and that can hear you must make a Wisdom saving throw. A target automatically succeeds on this saving throw if it can't be charmed. On a failed save, a target is affected by this spell. Until the spell ends, you can use a bonus action on each of your turns to designate a direction that is horizontal to you. Each affected target must use as much of its movement as possible to move in that direction on its next turn. It can take its action before it moves. After moving in this way, it can make another Wisdom saving throw to try to end the effect." +
            "\n   " +
            "A target isn't compelled to move into an obviously deadly hazard, such as a fire pit, but it will provoke opportunity attacks to move in the designated direction."
    },
    "cone of cold": {
        name: "Cone of Cold",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 127], ["P", 224]],
        level: 5,
        school: "Evoc",
        time: "1 a",
        range: "60-ft cone",
        components: "V,S,M",
        compMaterial: "A small crystal or glass cone",
        duration: "Instantaneous",
        save: "Con",
        description:
            "8d8+1d8/SL Cold dmg; save halves; crea killed become frozen statues until thawed",
        descriptionFull:
            "A blast of cold air erupts from your hands. Each creature in a 60-foot cone must make a Constitution saving throw. A creature takes 8d8 cold damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            "A creature killed by this spell becomes a frozen statue until it thaws." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d8 for each slot level above 5th."
    },
    confusion: {
        name: "Confusion",
        classes: ["bard", "druid", "sorcerer", "wizard"],
        source: [["SRD", 127], ["P", 224]],
        level: 4,
        school: "Ench",
        time: "1 a",
        range: "90 ft",
        components: "V,S,M",
        compMaterial: "Three nut shells",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "10+5/SL-ft rad all save or confused, see book; extra save at end of every turn",
        descriptionFull:
            "This spell assaults and twists creatures' minds, spawning delusions and provoking uncontrolled actions. Each creature in a 10-foot-radius sphere centered on a point you choose within range must succeed on a Wisdom saving throw when you cast this spell or be affected by it." +
            "\n   " +
            "An affected target can't take reactions and must roll a d10 at the start of each of its turns to determine its behavior for that turn." +
            "\n\n" +
            toUni("d10") +
            "\t" +
            toUni("Behavior") +
            "\n   " +
            "1\tThe creature uses all its movement to move in a random direction. To determine the direction, roll a d8 and assign a direction to each die face. The creature doesn't take an action this turn." +
            "\n   " +
            "2-6\tThe creature doesn't move or take actions this turn." +
            "\n   " +
            "7-8\tThe creature uses its action to make a melee attack against a randomly determined creature within its reach. If there is no creature within its reach, the creature does nothing this turn." +
            "\n   " +
            "9-10\tThe creature can act and move normally." +
            "\n\n" +
            "At the end of its turns, an affected target can make a Wisdom saving throw. If it succeeds, this effect ends for that target." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 5th level or higher, the radius of the sphere increases by 5 feet for each slot above 4th."
    },
    "conjure animals": {
        name: "Conjure Animals",
        classes: ["druid", "ranger"],
        source: [["SRD", 127], ["P", 225]],
        level: 3,
        school: "Conj",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Conc, 1 h",
        description: "Summon 2+2/2SL CR of beasts; obey my verbal commands",
        descriptionFull:
            "You summon fey spirits that take the form of beasts and appear in unoccupied spaces that you can see within range. Choose one of the following options for what appears." +
            "\n " +
            "\u2022 One beast of challenge rating 2 or lower" +
            "\n " +
            "\u2022 Two beasts of challenge rating 1 or lower" +
            "\n " +
            "\u2022 Four beasts of challenge rating 1/2 or lower" +
            "\n " +
            "\u2022 Eight beasts of challenge rating 1/4 or lower" +
            "\n\n" +
            "Each beast is also considered fey, and it disappears when it drops to 0 hit points or when the spell ends." +
            "\n   " +
            "The summoned creatures are friendly to you and your companions. Roll initiative for the summoned creatures as a group, which has its own turns. They obey any verbal commands that you issue to them (no action required by you). If you don't issue any commands to them, they defend themselves from hostile creatures, but otherwise take no actions. The DM has the creatures' statistics." +
            AtHigherLevels +
            "When you cast this spell using certain higher-level spell slots, you choose one of the summoning options above, and more creatures appear - twice as many with a 5th-level slot, three times as many with a 7th-level slot, and four times as many with a 9th-level slot."
    },
    "conjure celestial": {
        name: "Conjure Celestial",
        classes: ["cleric"],
        source: [["SRD", 127], ["P", 225]],
        level: 7,
        school: "Conj",
        time: "1 min",
        range: "90 ft",
        components: "V,S",
        duration: "Conc, 1 h",
        description:
            "CR 4+1/2SL celestial; obeys my verbal commands if they do not go against its alignment",
        descriptionFull:
            "You summon a celestial of challenge rating 4 or lower, which appears in an unoccupied space that you can see within range. The celestial disappears when it drops to 0 hit points or when the spell ends." +
            "\n   " +
            "The celestial is friendly to you and your companions for the duration. Roll initiative for the celestial, which has its own turns. It obeys any verbal commands that you issue to it (no action required by you), as long as they don't violate its alignment. If you don't issue any commands to the celestial, it defends itself from hostile creatures but otherwise takes no actions The DM has the celestial's statistics. At Higher Levels:" +
            "\n   " +
            "When you cast this spell using a 9th-level spell slot, you summon a celestial of challenge rating 5 or lower."
    },
    "conjure elemental": {
        name: "Conjure Elemental",
        classes: ["druid", "wizard"],
        source: [["SRD", 128], ["P", 225]],
        level: 5,
        school: "Conj",
        time: "1 min",
        range: "90 ft",
        components: "V,S,M",
        compMaterial:
            "Burning incense for air, soft clay for earth, sulfur and phosphorus for fire, or water and sand for water",
        duration: "Conc, 1 h",
        description:
            "CR 5+1/SL elemental; obeys my verbal commands; breaks free on broken conc.",
        descriptionFull:
            "You call forth an elemental servant. Choose an area of air, earth, fire, or water that fills a 10-foot cube within range. An elemental of challenge rating 5 or lower appropriate to the area you chose appears in an unoccupied space within 10 feet of it. For example, a fire elemental emerges from a bonfire, and an earth elemental rises up from the ground. The elemental disappears when it drops to 0 hit points or when the spell ends." +
            "\n   " +
            "The elemental is friendly to you and your companions for the duration. Roll initiative for the elemental, which has its own turns. It obeys any verbal commands that you issue to it (no action required by you). If you don't issue any commands to the elemental, it defends itself from hostile creatures but otherwise takes no actions." +
            "\n   " +
            "If your concentration is broken, the elemental doesn't disappear. Instead, you lose control of the elemental, it becomes hostile toward you and your companions, and it might attack. An uncontrolled elemental can't be dismissed by you, and it disappears 1 hour after you summoned it. The DM has the elemental's statistics." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 6th level or higher, the challenge rating increases by 1 for each slot level above 5th."
    },
    "conjure fey": {
        name: "Conjure Fey",
        classes: ["druid", "warlock"],
        source: [["SRD", 128], ["P", 226]],
        level: 6,
        school: "Conj",
        time: "1 min",
        range: "90 ft",
        components: "V,S",
        duration: "Conc, 1 h",
        description:
            "CR 6+1/SL fey; obeys my verbal commands not against its align.; breaks free on broken conc.",
        descriptionFull:
            "You summon a fey creature of challenge rating 6 or lower, or a fey spirit that takes the form of a beast of challenge rating 6 or lower. It appears in an unoccupied space that you can see within range. The fey creature disappears when it drops to 0 hit points or when the spell ends." +
            "\n   " +
            "The fey creature is friendly to you and your companions for the duration. Roll initiative for the creature, which has its own turns. It obeys any verbal commands that you issue to it (no action required by you), as long as they don't violate its alignment. If you don't issue any commands to the fey creature, it defends itself from hostile creatures but otherwise takes no actions." +
            "\n   " +
            "If your concentration is broken, the fey creature doesn't disappear. Instead, you lose control of the fey creature, it becomes hostile toward you and your companions, and it might attack. An uncontrolled fey creature can't be dismissed by you, and it disappears 1 hour after you summoned it. The DM has the fey creature's statistics." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 7th level or higher, the challenge rating increases by 1 for each slot level above 6th."
    },
    "conjure minor elementals": {
        name: "Conjure Minor Elementals",
        nameShort: "Conj. Minor Elementals",
        classes: ["druid", "wizard"],
        source: [["SRD", 128], ["P", 226]],
        level: 4,
        school: "Conj",
        time: "1 min",
        range: "90 ft",
        components: "V,S",
        duration: "Conc, 1 h",
        description: "Summon 2+2/2SL CR of elementals; obey my verbal commands",
        descriptionFull:
            "You summon elementals that appear in unoccupied spaces that you can see within range. You choose one the following options for what appears." +
            "\n " +
            "\u2022 One elemental of challenge rating 2 or lower" +
            "\n " +
            "\u2022 Two elementals of challenge rating 1 or lower" +
            "\n " +
            "\u2022 Four elementals of challenge rating 1/2 or lower" +
            "\n " +
            "\u2022 Eight elementals of challenge rating 1/4 or lower." +
            "\n\n" +
            "An elemental summoned by this spell disappears when it drops to 0 hit points or when the spell ends." +
            "\n   " +
            "The summoned creatures are friendly to you and your companions. Roll initiative for the summoned creatures as a group, which has its own turns. They obey any verbal commands that you issue to them (no action required by you). If you don't issue any commands to them, they defend themselves from hostile creatures, but otherwise take no actions. The DM has the creatures' statistics." +
            AtHigherLevels +
            "When you cast this spell using certain higher-level spell slots, you choose one of the summoning options above, and more creatures appear - twice as many with a 6th-level slot and three times as many with an 8th-level slot."
    },
    "conjure woodland beings": {
        name: "Conjure Woodland Beings",
        nameShort: "Conj. Woodland Beings",
        classes: ["druid", "ranger"],
        source: [["SRD", 129], ["P", 226]],
        level: 4,
        school: "Conj",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M",
        compMaterial: "One holly berry per creature summoned",
        duration: "Conc, 1 h",
        description: "Summon 2+2/2SL CR of fey; obey my verbal commands",
        descriptionFull:
            "You summon fey creatures that appear in unoccupied spaces that you can see within range. Choose one of the following options for what appears." +
            "\n " +
            "\u2022 One fey creature of challenge rating 2 or lower" +
            "\n " +
            "\u2022 Two fey creatures of challenge rating 1 or lower" +
            "\n " +
            "\u2022 Four fey creatures of challenge rating 1/2 or lower" +
            "\n " +
            "\u2022 Eight fey creatures of challenge rating 1/4 or lower" +
            "\n\n" +
            "A summoned creature disappears when it drops to 0 hit points or when the spell ends. The summoned creatures are friendly to you and your companions. Roll initiative for the summoned creatures as a group, which have their own turns. They obey any verbal commands that you issue to them (no action required by you). If you don't issue any commands to them, they defend themselves from hostile creatures, but otherwise take no actions. The DM has the creatures' statistics." +
            AtHigherLevels +
            "When you cast this spell using certain higher-level spell slots, you choose one of the summoning options above, and more creatures appear - twice as many with a 6th-level slot and three times as many with an 8th-level slot."
    },
    "contact other plane": {
        name: "Contact Other Plane",
        classes: ["warlock", "wizard"],
        source: [["SRD", 129], ["P", 226]],
        ritual: true,
        level: 5,
        school: "Div",
        time: "1 min",
        range: "Self",
        components: "V",
        duration: "1 min",
        save: "Int",
        description:
            "I make DC 15 save to ask extraplanar entity 5 questions with one word answers; insane on fail",
        descriptionFull:
            "You mentally contact a demigod, the spirit of a long-dead sage, or some other mysterious entity from another plane. Contacting this extraplanar intelligence can strain or even break your mind. When you cast this spell, make a DC 15 Intelligence saving throw. On a failure, you take 6d6 psychic damage and are insane until you finish a long rest. While insane, you can't take actions, can't understand what other creatures say, can't read, and speak only in gibberish. A greater restoration spell cast on you ends this effect." +
            "\n   " +
            "On a successful save, you can ask the entity up to five questions. You must ask your questions before the spell ends. The DM answers each question with one word, such as yes, no, maybe, never, irrelevant, unclear (if the entity doesn't know the answer to the question). If a one-word answer would be misleading, the DM might instead offer a short phrase as an answer."
    },
    contagion: {
        name: "Contagion",
        classes: ["cleric", "druid"],
        source: [["SRD", 129], ["P", 227]],
        level: 5,
        school: "Necro",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "7 days",
        save: "Con",
        description:
            "Melee spell attack for poisoned; save each rnd, 3 success: spell ends, 3 fail: poison ends, disease; see B",
        descriptionFull:
            "Your touch inflicts disease. Make a melee spell attack against a creature within your reach. On a hit, the target is poisoned." +
            "\n   " +
            "At the end of each of the poisoned target's turns, the target must make a Constitution saving throw. If the target succeeds on three of these saves, it is no longer poisoned, and the spell ends. If the target fails three of these saves, the target is no longer poisoned, but choose one of the diseases below. The target is subjected to the chosen disease for the spell's duration." +
            "\n   " +
            "Since this spell induces a natural disease in its target, any effect that removes a disease or otherwise ameliorates a disease's effects apply to it." +
            "\n   " +
            toUni("Blinding Sickness") +
            ": Pain grips the creature's mind, and its eyes turn milky white. The creature has disadvantage on Wisdom checks and Wisdom saving throws and is blinded." +
            "\n   " +
            toUni("Filth Fever") +
            ": A raging fever sweeps through the creature's body. The creature has disadvantage on Strength checks, Strength saving throws, and attack rolls that use Strength." +
            "\n   " +
            toUni("Flesh Rot") +
            ": The creature's flesh decays. The creature has disadvantage on Charisma checks and vulnerability to all damage." +
            "\n   " +
            toUni("Mindfire") +
            ": The creature's mind becomes feverish. The creature has disadvantage on Intelligence checks and Intelligence saving throws, and the creature behaves as if under the effects of the confusion spell during combat." +
            "\n   " +
            toUni("Seizure") +
            ": The creature is overcome with shaking. The creature has disadvantage on Dexterity checks, Dexterity saving throws, and attack rolls that use Dexterity." +
            "\n   " +
            toUni("Slimy Doom") +
            ": The creature begins to bleed uncontrollably. The creature has disadvantage on Constitution checks and Constitution saving throws. In addition, whenever the creature takes damage, it is stunned until the end of its next turn."
    },
    contingency: {
        name: "Contingency",
        classes: ["wizard"],
        source: [["SRD", 130], ["P", 227]],
        level: 6,
        school: "Evoc",
        time: "10 min",
        range: "Self",
        components: "V,S,M\u0192",
        compMaterial:
            "A statuette of yourself carved from ivory and decorated with gems worth at least 1,500 gp",
        duration: "10 days",
        description:
            "Prepare another SL<6 spell I can cast to activate when some condition is met (1500gp)",
        descriptionFull:
            "Choose a spell of 5th level or lower that you can cast, that has a casting time of 1 action, and that can target you. You cast that spell\u2014called the contingent spell\u2014as part of casting contingency, expending spell slots for both, but the contingent spell doesn't come into effect. Instead, it takes effect when a certain circumstance occurs. You describe that circumstance when you cast the two spells. For example, a contingency cast with water breathing might stipulate that water breathing comes into effect when you are engulfed in water or a similar liquid." +
            "\n   " +
            "The contingent spell takes effect immediately after the circumstance is met for the first time, whether or not you want it to, and then contingency ends." +
            "\n   " +
            "The contingent spell takes effect only on you, even if it can normally target others. You can use only one contingency spell at a time. If you cast this spell again, the effect of another contingency spell on you ends. Also, contingency ends on you if its material component is ever not on your person."
    },
    "continual flame": {
        name: "Continual Flame",
        classes: ["cleric", "wizard"],
        source: [["SRD", 130], ["P", 227]],
        level: 2,
        school: "Evoc",
        time: "1 a",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial: "Ruby dust worth 50 gp, which the spell consumes",
        duration: "Till dispelled",
        description: "Create a permanent flame (50gp cons.)",
        descriptionFull:
            "A flame, equivalent in brightness to a torch, springs forth from an object that you touch. The effect looks like a regular flame, but it creates no heat and doesn't use oxygen. A continual flame can be covered or hidden but not smothered or quenched."
    },
    "control water": {
        name: "Control Water",
        classes: ["cleric", "druid", "wizard"],
        source: [["SRD", 130], ["P", 227]],
        level: 4,
        school: "Trans",
        time: "1 a",
        range: "300 ft",
        components: "V,S,M",
        compMaterial: "A drop of water and a pinch of dust",
        duration: "Conc, 10 min",
        description:
            "Control an amount of water in a 100 ft cube as 1 a; flood, part, redirect, or whirlpool, see book",
        descriptionFull:
            "Until the spell ends, you control any freestanding water inside an area you choose that is a cube up to 100 feet on a side. You can choose from any of the following effects when you cast this spell. As an action on your turn, you can repeat the same effect or choose a different one." +
            "\n   " +
            toUni("Flood") +
            ": You cause the water level of all standing water in the area to rise by as much as 20 feet. If the area includes a shore, the flooding water spills over onto dry land. If you choose an area in a large body of water, you instead create a 20-foot tall wave that travels from one side of the area to the other and then crashes down. Any Huge or smaller vehicles in the wave's path are carried with it to the other side. Any Huge or smaller vehicles struck by the wave have a 25 percent chance of capsizing. The water level remains elevated until the spell ends or you choose a different effect. If this effect produced a wave, the wave repeats on the start of your next turn while the flood effect lasts." +
            "\n   " +
            toUni("Part Water") +
            ": You cause water in the area to move apart and create a trench. The trench extends across the spell's area, and the separated water forms a wall to either side. The trench remains until the spell ends or you choose a different effect. The water then slowly fills in the trench over the course of the next round until the normal water level is restored." +
            "\n   " +
            toUni("Redirect Flow") +
            ": You cause flowing water in the area to move in a direction you choose, even if the water has to flow over obstacles, up walls, or in other unlikely directions. The water in the area moves as you direct it, but once it moves beyond the spell's area, it resumes its flow based on the terrain conditions. The water continues to move in the direction you chose until the spell ends or you choose a different effect." +
            "\n   " +
            toUni("Whirlpool") +
            ": This effect requires a body of water at least 50 feet square and 25 feet deep. You cause a whirlpool to form in the center of the area. The whirlpool forms a vortex that is 5 feet wide at the base, up to 50 feet wide at the top, and 25 feet tall. Any creature or object in the water and within 25 feet of the vortex is pulled 10 feet toward it. A creature can swim away from the vortex by making a Strength (Athletics) check against your spell save DC. When a creature enters the vortex for the first time on a turn or starts its turn there, it must make a Strength saving throw. On a failed save, the creature takes 2d8 bludgeoning damage and is caught in the vortex until the spell ends. On a successful save, the creature takes half damage, and isn't caught in the vortex. A creature caught in the vortex can use its action to try to swim away from the vortex as described above, but has disadvantage on the Strength (Athletics) check to do so. The first time each turn that an object enters the vortex, the object takes 2d8 bludgeoning damage, this damage occurs each round it remains in the vortex."
    },
    "control weather": {
        name: "Control Weather",
        classes: ["cleric", "druid", "wizard"],
        source: [["SRD", 131], ["P", 228]],
        level: 8,
        school: "Trans",
        time: "10 min",
        range: "5-mile rad",
        components: "V,S,M",
        compMaterial:
            "Burning incense and bits of earth and wood mixed in water",
        duration: "Conc, 8 h",
        description:
            "Change current weather; changes take 1d4\u00D710 min; change precipitation, temperature, wind, see B",
        descriptionFull:
            "You take control of the weather within 5 miles of you for the duration. You must be outdoors to cast this spell. Moving to a place where you don't have a clear path to the sky ends the spell early." +
            "\n   " +
            "When you cast the spell, you change the current weather conditions, which are determined by the DM based on the climate and season. You can change precipitation, temperature, and wind. It takes 1d4 \u00D7 10 minutes for the new conditions to take effect. Once they do so, you can change the conditions again. When the spell ends, the weather gradually returns to normal." +
            "\n   " +
            "When you change the weather conditions, find a current condition on the following tables and change its stage by one, up or down. When changing the wind, you can change its direction." +
            "\n\n" +
            toUni("Precipitation") +
            "\n " +
            toUni("Stage") +
            "\t" +
            toUni("Condition") +
            "\n     " +
            "1\tClear" +
            "\n     " +
            "2\tLight clouds" +
            "\n     " +
            "3\tOvercast or ground fog" +
            "\n     " +
            "4\tRain, hail or snow" +
            "\n     " +
            "5\tTorrential rain, driving hail or blizzard" +
            "\n\n" +
            toUni("Temperature") +
            "\t\t" +
            toUni("Wind") +
            "\n " +
            toUni("Stage") +
            "\t" +
            toUni("Condition") +
            "\t " +
            toUni("Stage") +
            "\t" +
            toUni("Condition") +
            "\n     " +
            "1\tUnbearable heat" +
            "\t     " +
            "1\tCalm" +
            "\n     " +
            "2\tHot" +
            "\t\t     " +
            "2\tModerate wind" +
            "\n     " +
            "3\tWarm" +
            "\t\t     " +
            "3\tStrong wind" +
            "\n     " +
            "4\tCool" +
            "\t\t     " +
            "4\tGale" +
            "\n     " +
            "5\tCold" +
            "\t\t     " +
            "5\tStorm" +
            "\n     " +
            "6\tArctic cold"
    },
    counterspell: {
        name: "Counterspell",
        classes: ["sorcerer", "warlock", "wizard"],
        source: [["SRD", 131], ["P", 228]],
        level: 3,
        school: "Abjur",
        time: "1 rea",
        range: "60 ft",
        components: "S",
        duration: "Instantaneous",
        description:
            "Stop a spell being cast; make DC 10+SL spellcasting ability check if above the spell slot lvl used",
        descriptionFull:
            "You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 3rd level or lower, its spell fails and has no effect. If it is casting a spell of 4th level or higher, make an ability check using your spellcasting ability. The DC equals 10 + the spell's level. On a success, the creature's spell fails and has no effect." +
            "\n   " +
            "At Higher Level. When you cast this spell using a spell slot of 4th level or higher, the interrupted spell has no effect if its level is less than or equal to the level of the spell slot you used."
    },
    "create food and water": {
        name: "Create Food and Water",
        classes: ["cleric", "paladin"],
        source: [["SRD", 131], ["P", 229]],
        level: 3,
        school: "Conj",
        time: "1 a",
        range: "30 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "Create 45 pounds of food and 30 gallons of water; enough for 15 humanoids or 5 steeds for 24h",
        descriptionFull:
            "You create 45 pounds of food and 30 gallons of water on the ground or in containers within range, enough to sustain up to fifteen humanoids or five steeds for 24 hours. The food is bland but nourishing, and spoils if uneaten after 24 hours. The water is clean and doesn't go bad."
    },
    "create or destroy water": {
        name: "Create or Destroy Water",
        classes: ["cleric", "druid"],
        source: [["SRD", 132], ["P", 229]],
        level: 1,
        school: "Trans",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial:
            "A drop of water if creating water or a few grains of sand if destroying it",
        duration: "Instantaneous",
        description:
            "Create/destroy 10+2/SL gal of water in open container or create rain/destroy fog in 30+5/SL-ft cu",
        descriptionFull:
            "You either create or destroy water." +
            "\n   " +
            toUni("Create Water") +
            ": You create up to 10 gallons of clean water within range in an open container. Alternatively, the water falls as rain in a 30-foot cube within range, extinguishing exposed flames in the area." +
            "\n   " +
            toUni("Destroy Water") +
            ": You destroy up to 10 gallons of water in an open container within range. Alternatively, you destroy fog in a 30-foot cube within range." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, you create or destroy 10 additional gallons of water, or the size of the cube increases by 5 feet, for each slot level above 1st."
    },
    "create undead": {
        name: "Create Undead",
        classes: ["cleric", "warlock", "wizard"],
        source: [["SRD", 132], ["P", 229]],
        level: 6,
        school: "Necro",
        time: "1 min",
        range: "10 ft",
        components: "V,S,M\u2020",
        compMaterial:
            "One clay pot filled with grave dirt, one clay pot filled with brackish water, and one 150 gp black onyx stone for each corpse.",
        duration: "Instantaneous",
        description:
            "Turn corpses into 3+1/SL ghouls i.a.; control 24h; bns a command 120 ft; see B (150gp/corpse cons.)", // i.a. -> inter alia -> among others
        descriptionFull:
            "You can cast this spell only at night. Choose up to three corpses of Medium or Small humanoids within range. Each corpse becomes a ghoul under your control. (The DM has game statistics for these creatures.)" +
            "\n   " +
            "As a bonus action on each of your turns, you can mentally command any creature you animated with this spell if the creature is within 120 feet of you (if you control multiple creatures, you can command any or all of them at the same time, issuing the same command to each one). You decide what action the creature will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the creature only defends itself against hostile creatures. Once given an order, the creature continues to follow it until its task is complete." +
            "\n   " +
            "The creature is under your control for 24 hours, after which it stops obeying any command you have given it. To maintain control of the creature for another 24 hours, you must cast this spell on the creature before the current 24-hour period ends. This use of the spell reasserts your control over up to three creatures you have animated with this spell, rather than animating new ones." +
            AtHigherLevels +
            "When you cast this spell using a 7th-level spell slot, you can animate or reassert control over four ghouls. When you cast this spell using an 8th-level spell slot, you can animate or reassert control over five ghouls or two ghasts or wights. When you cast this spell using a 9th-level spell slot, you can animate or reassert control over six ghouls, three ghasts or wights, or two mummies."
    },
    creation: {
        name: "Creation",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 132], ["P", 229]],
        level: 5,
        school: "Illus",
        time: "1 min",
        range: "30 ft",
        components: "V,S,M",
        compMaterial:
            "A tiny piece of matter of the same type of the item you plan to create",
        duration: "Special",
        description:
            "Create a nonliving object up to a 5+5/SL-ft cube of vegetable matter, stone, metal, gems or rare metals",
        descriptionFull:
            "You pull wisps of shadow material from the Shadowfell to create a nonliving object of vegetable matter within range - soft goods, rope, wood, or something similar. You can also use this spell to create mineral objects such as stone, crystal, or metal. The object created must be no larger than a 5-foot cube, and the object must be of a form and material that you have seen before." +
            "\n   " +
            "The duration depends on the object's material. If the object is composed of multiple materials, use the shortest duration." +
            "\n\n" +
            toUni("Material") +
            "\t\t" +
            toUni("Duration") +
            "\n" +
            "Vegetable matter\t1 day" +
            "\n" +
            "Stone or crystal\t12 hours" +
            "\n" +
            "Precious metals\t1 hour" +
            "\n" +
            "Gems\t\t10 minutes" +
            "\n\n" +
            "Adamantine/Mithral - 1 minute" +
            "\n   " +
            "Using any material created by this spell as another spell's material component causes that spell to fail." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 6th level or higher, the cube increases by 5 feet for each slot level above 5th."
    },
    "cure wounds": {
        name: "Cure Wounds",
        classes: ["bard", "cleric", "druid", "paladin", "ranger"],
        source: [["SRD", 132], ["P", 230]],
        level: 1,
        school: "Evoc",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "1 living creature heals 1d8+1d8/SL+spellcasting ability modifier HP",
        descriptionFull:
            "A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st."
    },
    "dancing lights": {
        name: "Dancing Lights",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 133], ["P", 230]],
        level: 0,
        school: "Evoc",
        time: "1 a",
        range: "120 ft",
        components: "V,S,M",
        compMaterial: "A bit of phosphorous or wychwood, or a glowworm",
        duration: "Conc, 1 min",
        description:
            "4 torch-sized lights or 1 humanoid-sized light; 10-ft rad dim light; bns a to move 60 ft",
        descriptionFull:
            "You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration. You can also combine the four lights into one glowing vaguely humanoid form of Medium size. Whichever form you choose, each light sheds dim light in a 10-foot radius." +
            "\n   " +
            "As a bonus action on your turn, you can move the lights up to 60 feet to a new spot within range. A light must be within 20 feet of another light created by this spell, and a light winks out if it exceeds the spell's range."
    },
    darkness: {
        name: "Darkness",
        classes: ["sorcerer", "warlock", "wizard"],
        source: [["SRD", 133], ["P", 230]],
        level: 2,
        school: "Evoc",
        time: "1 a",
        range: "60 ft",
        components: "V,M",
        compMaterial: "Bat fur and a drop of pitch or piece of coal",
        duration: "Conc, 10 min",
        description:
            "15-ft rad darkness on point or object; darkvision doesn't work; only magical light of SL 3+ works in it",
        descriptionFull:
            "Magical darkness spreads from a point you choose within range to fill a 15-foot-radius sphere for the duration. The darkness spreads around corners. A creature with darkvision can't see through this darkness, and nonmagical light can't illuminate it." +
            "\n   " +
            "If the point you choose is on an object you are holding or one that isn't being worn or carried, the darkness emanates from the object and moves with it. Completely covering the source of the darkness with an opaque object, such as a bowl or a helm, blocks the darkness." +
            "\n   " +
            "If any of this spell's area overlaps with an area of light created by a spell of 2nd level or lower, the spell that created the light is dispelled."
    },
    darkvision: {
        name: "Darkvision",
        classes: ["druid", "ranger", "sorcerer", "wizard"],
        source: [["SRD", 133], ["P", 230]],
        level: 2,
        school: "Trans",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "Either a pinch of dried carrot or an agate",
        duration: "8 h",
        description: "1 willing creature has darkvision 60 ft for the duration",
        descriptionFull:
            "You touch a willing creature to grant it the ability to see in the dark. For the duration, that creature has darkvision out to a range of 60 feet."
    },
    daylight: {
        name: "Daylight",
        classes: ["cleric", "druid", "paladin", "ranger", "sorcerer"],
        source: [["SRD", 133], ["P", 230]],
        level: 3,
        school: "Evoc",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "1 h",
        description:
            "60-ft rad bright light + 60-ft dim light on point or object; only magical darkness of SL 4+ works in it",
        descriptionFull:
            "A 60-foot-radius sphere of light spreads out from a point you choose within range. The sphere is bright light and sheds dim light for an additional 60 feet." +
            "\n   " +
            "If you chose a point on an object you are holding or one that isn't being worn or carried, the light shines from the object with and moves with it. Completely covering the affected object with an opaque object, such as a bowl or a helm, blocks the light." +
            "\n   " +
            "If any of this spell's area overlaps with an area of darkness created by a spell of 3rd level or lower, the spell that created the darkness is dispelled."
    },
    "death ward": {
        name: "Death Ward",
        classes: ["cleric", "paladin"],
        source: [["SRD", 133], ["P", 230]],
        level: 4,
        school: "Abjur",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "8 h",
        description:
            "Once, when crea drops to 0 HP it drops to 1 HP instead; or negates first instantaneous kill effect",
        descriptionFull:
            "You touch a creature and grant it a measure of protection from death. The first time the target would drop to 0 hit points as a result of taking damage, the target instead drops to 1 hit point, and the spell ends. If the spell is still in effect when the target is subjected to an effect that would kill it instantaneously without dealing damage, that effect is instead negated against the target, and the spells ends."
    },
    "delayed blast fireball": {
        name: "Delayed Blast Fireball",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 133], ["P", 230]],
        level: 7,
        school: "Evoc",
        time: "1 a",
        range: "150 ft",
        components: "V,S,M",
        compMaterial: "A tine ball of bat guano and sulfur",
        duration: "Conc, 1 min",
        save: "Dex",
        description:
            "Create bead; at chosen moment, or if conc. is broken, 20-ft rad 12d6+1d6/SL Fire dmg; save halves",
        descriptionFull:
            "A beam of yellow light flashes from your pointing finger, then condenses to linger at a chosen point within range as a glowing bead for the duration. When the spell ends, either because your concentration is broken or because you decide to end it, the bead blossoms with a low roar into an explosion of flame that spreads around corners. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A creature takes fire damage equal to the total accumulated damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            "The spell's base damage is 12d6. If at the end of your turn the bead has not yet detonated, the damage increases by 1d6." +
            "\n   " +
            "If the glowing bead is touched before the interval has expired, the creature touching it must make a Dexterity saving throw. On a failed save, the spell ends immediately, causing the bead to erupt in flame. On a successful save, the creature can throw the bead up to 40 feet. When it strikes a creature or a solid object, the spell ends, and the bead explodes." +
            "\n   " +
            "The fire damages objects in the area and ignites flammable objects that aren't being worn or carried." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 8th level or higher, the base damage increases by 1d6 for each slot level above 7th."
    },
    demiplane: {
        name: "Demiplane",
        classes: ["warlock", "wizard"],
        source: [["SRD", 134], ["P", 231]],
        level: 8,
        school: "Conj",
        time: "1 a",
        range: "60 ft",
        components: "S",
        duration: "1 h",
        description:
            "Create door to a demiplane of 30-ft cube; when spell ends, creatures inside remain trapped",
        descriptionFull:
            "You create a shadowy door on a flat solid surface that you can see within range. The door is large enough to allow Medium creatures to pass through unhindered. When opened, the door leads to a demiplane that appears to be an empty room 30 feet in each dimension, made of wood or stone. When the spell ends, the door disappears, and any creatures or objects inside the demiplane remain trapped there, as the door also disappears from the other side." +
            "\n   " +
            "Each time you cast this spell, you can create a new demiplane, or have the shadowy door connect to a demiplane you created with a previous casting of this spell. Additionally, if you know the nature and contents of a demiplane created by a casting of this spell by another creature, you can have the shadowy door connect to its demiplane instead."
    },
    "detect evil and good": {
        name: "Detect Evil and Good",
        classes: ["cleric", "paladin"],
        source: [["SRD", 134], ["P", 231]],
        level: 1,
        school: "Div",
        time: "1 a",
        range: "Self",
        components: "V,S",
        duration: "Conc, 10 min",
        description:
            "Know if aberration, celestial, elemental, fey, fiend, undead, and des-/consecrated area within 30 ft",
        descriptionFull:
            "For the duration, you know if there is an aberration, celestial, elemental, fey, fiend, or undead within 30 feet of you, as well as where the creature is located. Similarly, you know if there is a place of object within 30 feet of you that has been magically consecrated or desecrated. The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt."
    },
    "detect magic": {
        name: "Detect Magic",
        classes: [
            "bard",
            "cleric",
            "druid",
            "paladin",
            "ranger",
            "sorcerer",
            "wizard"
        ],
        source: [["SRD", 134], ["P", 231]],
        ritual: true,
        level: 1,
        school: "Div",
        time: "1 a",
        range: "Self",
        components: "V,S",
        duration: "Conc, 10 min",
        description:
            "Know presence of magic within 30 ft; 1 a to see auras and determine school",
        descriptionFull:
            "For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any." +
            "\n   " +
            "The spell can penetrate most barriers, but is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt."
    },
    "detect poison and disease": {
        name: "Detect Poison and Disease",
        nameShort: "Detect Poison/Disease",
        classes: ["cleric", "druid", "paladin", "ranger"],
        source: [["SRD", 134], ["P", 231]],
        ritual: true,
        level: 1,
        school: "Div",
        time: "1 a",
        range: "Self",
        components: "V,S,M",
        compMaterial: "A yew leaf",
        duration: "Conc, 10 min",
        description:
            "Know presence, location, and type of poisons, poisonous creatures, and diseases within 30 ft",
        descriptionFull:
            "For the duration, you can sense the presence and location of poisons, poisonous creatures, and diseases within 30 feet of you. You also identify the kind of poison, poisonous creature, or disease in each case." +
            "\n   " +
            "The spell can penetrate most barriers, but is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt."
    },
    "detect thoughts": {
        name: "Detect Thoughts",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 135], ["P", 231]],
        level: 2,
        school: "Div",
        time: "1 a",
        range: "Self",
        components: "V,S,M",
        compMaterial: "A copper piece",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "1 a read thoughts of visible Int>3 crea or detect presence of invisible within 30 ft; save for probing",
        descriptionFull:
            "For the duration, you can read the thoughts of certain creatures. When you cast the spell and as your action on each turn until the spell ends, you can focus your mind on any one creature that you can see within 30 feet of you. If the creature you choose has an Intelligence of 3 or lower or doesn't speak any language, the creature is unaffected." +
            "\n   " +
            "You initially learn the surface thoughts of the creature - what is most on its mind in that moment. As an action, you can either shift your attention to another creature's thoughts or attempt to probe deeper into the same creature's mind. If you probe deeper, the target must make a Wisdom saving throw. If it fails, you gain insight into its reasoning (if any), its emotional state, and something that looms large in its mind (such as something it worries over, loves, or hates). If it succeeds, the spell ends. Either way, the target knows that you are probing into its mind, and unless you shift your attention to another creature's thoughts, the creature can use its action on its turn to make an Intelligence check contested by your Intelligence check if it succeeds, the spell ends." +
            "\n   " +
            "Questions verbally directed at the target creature naturally shape the course of its thoughts, so this spell is particularly effective as part of an interrogation." +
            "\n   " +
            "You can also use this spell to detect the presence of thinking creatures you can't see. When you cast the spell or as your action during the duration, you can search for thoughts within 30 feet of you. The spell can penetrate barriers, but 2 feet of rock, 2 inches of any metal other than lead, or a thin sheet of lead blocks you. You can't detect a creature with an Intelligence of 3 or lower or one that doesn't speak any language." +
            "\n   " +
            "Once you detect the presence of a creature in this way, you can read its thoughts for the rest of the duration as described above, even if you can't see it, but it must still be within range."
    },
    "dimension door": {
        name: "Dimension Door",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 135], ["P", 233]],
        level: 4,
        school: "Conj",
        time: "1 a",
        range: "500 ft",
        components: "V",
        duration: "Instantaneous",
        description:
            "Teleport myself and 1 willing crea within 5 ft, up to 500 ft to a place I can see, specify, or describe",
        descriptionFull:
            "You teleport yourself from your current location to any other spot within range. You arrive at exactly the spot desired. It can be a place you can see, one you can visualize, or one you can describe by stating distance and direction, such as 200 feet straight downward or upward to the northwest at a 45-degree angle, 300 feet." +
            "\n   " +
            "You can bring along objects as long as their weight doesn't exceed what you can carry. You can also bring one willing creature of your size or smaller who is carrying gear up to its carrying capacity. The creature must be within 5 feet of you when you cast this spell." +
            "\n   " +
            "If you would arrive in a place already occupied by an object or a creature, you and any creature traveling with you each take 4d6 force damage, and the spell fails to teleport you."
    },
    "disguise self": {
        name: "Disguise Self",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 135], ["P", 233]],
        level: 1,
        school: "Illus",
        time: "1 a",
        range: "Self",
        components: "V,S",
        duration: "1 h (D)",
        description:
            "Alter appearance; Int(Investigation) check vs. spell DC to determine disguise",
        descriptionFull:
            "You make yourself, including your clothing, armor, weapons, and other belongings on your person, look different until the spell ends or until you use your action to dismiss it. You can seem 1 foot shorter or taller and can appear thin, fat, or in between. You can't change your body type, so you must adopt a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you." +
            "\n   " +
            "The changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to your outfit, objects pass through the hat, and anyone who touches it would feel nothing or would feel your head and hair. If you use this spell to appear thinner than you are, the hand of someone who reaches out to touch you would bump into you while it was seemingly still in midair." +
            "\n   " +
            "To discern that you are disguised, a creature can use its action to inspect your appearance and must succeed on an Intelligence (Investigation) check against your spell save DC."
    },
    disintegrate: {
        name: "Disintegrate",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 135], ["P", 233]],
        level: 6,
        school: "Trans",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M",
        compMaterial: "A lodestone and a pinch of dust",
        duration: "Instantaneous",
        save: "Dex",
        description:
            "1 crea save or 10d6+3d6/SL+40 Force dmg; or up to 10-ft cube nonmagical object is destroyed",
        descriptionFull:
            "A thin green ray springs from your pointing finger to a target that you can see within range. The target can be a creature, an object, or a creation of magical force, such as the wall created by Wall of Force." +
            "\n   " +
            "A creature targeted by this spell must make a Dexterity saving throw. On a failed save, the target takes 10d6+40 force damage. The target is disintegrated if this damage leaves it with 0 hit points." +
            "\n   " +
            "A disintegrated creature and everything it is wearing and carrying, except magic items, are reduced to a pile of fine gray dust. The creature can be restored to life only by means of a true resurrection or a wish spell." +
            "\n   " +
            "This spell automatically disintegrates a Large or smaller nonmagical object or a creation of magical force. If the target is a Huge or larger object or creation of force, this spell disintegrates a 10-foot-cube portion of it. A magic item is unaffected by this spell." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 7th level or higher, the damage increases by 3d6 for each slot level above 6th."
    },
    "dispel evil and good": {
        name: "Dispel Evil and Good",
        classes: ["cleric", "paladin"],
        source: [["SRD", 136], ["P", 233]],
        level: 5,
        school: "Abjur",
        time: "1 a",
        range: "Self",
        components: "V,S,M",
        compMaterial: "Holy water or powdered silver and iron",
        duration: "Conc, 1 min",
        description:
            "Cele., elem., fey, fiends, and undead dis. on attacks vs. me; end early for dismissal/break enchantment",
        descriptionFull:
            "Shimmering energy surrounds and protects you from fey, undead, and creatures originating from beyond the Material Plane. For the duration, celestials, elementals, fey, fiends, and undead have disadvantage on attack rolls against you. You can end the spell early by using either of the following special functions." +
            "\n   " +
            toUni("Break Enchantment") +
            ": As your action, you touch a creature you can reach that is charmed, frightened, or possessed by a celestial, an elemental, a fey, a fiend, or an undead. The creature you touch is no longer charmed, frightened, or possessed by such creatures." +
            "\n   " +
            toUni("Dismissal") +
            ": As your action, make a melee spell attack against a celestial, an elemental, a fey, a fiend, or an undead you can reach. On a hit, you attempt to drive the creature back to its home plane. The creature must succeed on a Charisma saving throw or be sent back to its home plane (if it isn't there already). If they aren't on their home plane, undead are sent to the Shadowfell, and fey are sent to the Feywild."
    },
    "dispel magic": {
        name: "Dispel Magic",
        classes: [
            "bard",
            "cleric",
            "druid",
            "paladin",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        source: [["SRD", 136], ["P", 234]],
        level: 3,
        school: "Abjur",
        time: "1 a",
        range: "120 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "Dispel all magical effects on crea or object; make DC 10+SL spellcasting ability check if above SL used",
        descriptionFull:
            "Choose one creature, object, or magical effect within range. Any spell of 3rd level or lower on the target ends. For each spell of 4th level or higher on the target, make an ability check using your spellcasting ability. The DC equals 10 + the spell's level. On a successful check, the spell ends." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 4th level or higher, you automatically end the effects of a spell on the target if the spell's level is equal to or less than the level of the spell slot you used."
    },
    divination: {
        name: "Divination",
        classes: ["cleric"],
        source: [["SRD", 136], ["P", 234]],
        ritual: true,
        level: 4,
        school: "Div",
        time: "1 a",
        range: "Self",
        components: "V,S,M\u2020",
        compMaterial:
            "Incense and a sacrificial offering appropriate to your religion, together worth at least 25 gp, which the spell consumes",
        duration: "Instantaneous",
        description:
            "Get answer to one question about a goal, event, or activity to occur within the next 7 days (25gp cons.)",
        descriptionFull:
            "Your magic and an offering put you in contact with a god or a god's servants. You ask a single question concerning a specific goal, event, or activity to occur within 7 days. The DM offers a truthful reply. The reply might be a short phrase, a cryptic rhyme, or an omen." +
            "\n   " +
            "The spell doesn't take into account any possible circumstances that might change the outcome, such as the casting of additional spells or the loss or gain of a companion." +
            "\n   " +
            "If you cast this spell two or more times before finishing your next long rest, there is a cumulative 25 percent chance for each casting after the first that you get a random reading. The DM makes this roll in secret."
    },
    "divine favor": {
        name: "Divine Favor",
        classes: ["paladin"],
        source: [["SRD", 136], ["P", 234]],
        level: 1,
        school: "Evoc",
        time: "1 bns",
        range: "Self",
        components: "V,S",
        duration: "Conc, 1 min",
        description:
            "My weapon attacks deal an +1d4 Radiant damage for the duration",
        descriptionFull:
            "Your prayer empowers you with divine radiance. Until the spell ends, your weapon attacks deal and extra 1d4 radiant damage on a hit."
    },
    "divine word": {
        name: "Divine Word",
        classes: ["cleric"],
        source: [["SRD", 137], ["P", 234]],
        level: 7,
        school: "Evoc",
        time: "1 bns",
        range: "30 ft",
        components: "V",
        duration: "Instantaneous",
        save: "Cha",
        description:
            "Any crea save or deaf/blind/stunned/dead depending on current HP; banishes extraplanar crea",
        descriptionFull:
            "You utter a divine word, imbued with the power that shaped the world at the dawn of creation. Choose any number of creatures you can see within range. Each creature that can hear you must make a Charisma saving throw. On a failed save, a creature suffers an effect based on its current hit points." +
            "\n " +
            "\u2022 50 hit points or fewer - deafened for 1 minute" +
            "\n " +
            "\u2022 40 hit points or fewer - deafened and blinded for 10 minutes" +
            "\n " +
            "\u2022 30 hit points or fewer - blinded, deafened, and stunned for 1 hour" +
            "\n " +
            "\u2022 20 hit points or fewer - killed instantly" +
            "\n\n" +
            "Regardless of its current hit points, a celestial, an elemental, a fey, or a fiend that fails its save is forced back to its plane of origin (if it isn't there already) and can't return to your current plane for 24 hours by any means short of a wish spell."
    },
    "dominate beast": {
        name: "Dominate Beast",
        classes: ["druid", "sorcerer"],
        source: [["SRD", 137], ["P", 234]],
        level: 4,
        school: "Ench",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "1 beast save or charmed, follows telepathic commands, 1 a for complete control; +SL for duration",
        descriptionFull:
            "You attempt to beguile a beast that you can see within range. It must succeed on a Wisdom saving throw or be charmed by you for the duration. If you or creatures that are friendly to you are fighting it, it has advantage on the saving throw." +
            "\n   " +
            "While the beast is charmed, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the creature while you are conscious (no action required), which it does its best to obey. You can specify a simple and general course of action, such as Attack that creature, Run over there, or Fetch that object. If the creature completes the order and doesn't receive further direction from you, it defends and preserves itself to the best of its ability." +
            "\n   " +
            "You can use your action to take total and precise control of the target. Until the end of your next turn, the creature takes only the actions you choose, and doesn't do anything that you don't allow it to do. During this time, you can also cause the creature to use a reaction, but this requires you to use your own reaction as well." +
            "\n   " +
            "Each time the target takes damage, it makes a new Wisdom saving throw against the spell. If the saving throw succeeds, the spell ends." +
            AtHigherLevels +
            "When you cast this spell with a 5th-level spell slot, the duration is concentration, up to 10 minutes. When you use a 6th-level spell slot, the duration is concentration, up to 1 hour. When you use a spell slot of 7th level or higher, the duration is concentration, up to 8 hours."
    },
    "dominate monster": {
        name: "Dominate Monster",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 137], ["P", 235]],
        level: 8,
        school: "Ench",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Conc, 1 h",
        save: "Wis",
        description:
            "1 crea save or charmed, follows telepathic commands, 1 a for complete control; SL9: conc, 8h",
        descriptionFull:
            "You attempt to beguile a creature that you can see within range. It must succeed on a Wisdom saving throw or be charmed by you for the duration. If you or creatures that are friendly to you are fighting it, it has advantage on the saving throw." +
            "\n   " +
            "While the creature is charmed, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the creature while you are conscious (no action required), which it does its best to obey. You can specify a simple and general course of action, such as Attack that creature, Run over there, or Fetch that object. If the creature completes the order and doesn't receive further direction from you, it defends and preserves itself to the best of its ability." +
            "\n   " +
            "You can use your action to take total and precise control of the target. Until the end of your next turn, the creature takes only the actions you choose, and doesn't do anything that you don't allow it to do. During this time, you can also cause the creature to use a reaction, but this requires you to use your own reaction as well." +
            "\n   " +
            "Each time the target takes damage, it makes a new Wisdom saving throw against the spell. If the saving throw succeeds, the spell ends." +
            AtHigherLevels +
            "When you cast this spell with a 9th-level spell slot, the duration is concentration, up to 8 hours."
    },
    "dominate person": {
        name: "Dominate Person",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 138], ["P", 235]],
        level: 5,
        school: "Ench",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "1 humanoid save or charmed, follows telepathic commands, 1 a for complete control; +SL for dur.",
        descriptionFull:
            "You attempt to beguile a humanoid that you can see within range. It must succeed on a Wisdom saving throw or be charmed by you for the duration. If you or creatures that are friendly to you are fighting it, it has advantage on the saving throw." +
            "\n   " +
            "While the target is charmed, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the creature while you are conscious (no action required), which it does its best to obey. You can specify a simple and general course of action, such as Attack that creature, Run over there, or Fetch that object. If the creature completes the order and doesn't receive further direction from you, it defends and preserves itself to the best of its ability." +
            "\n   " +
            "You can use your action to take total and precise control of the target. Until the end of your next turn, the creature takes only the actions you choose, and doesn't do anything that you don't allow it to do. During this time you can also cause the creature to use a reaction, but this requires you to use your own reaction as well." +
            "\n   " +
            "Each time the target takes damage, it makes a new Wisdom saving throw against the spell. If the saving throw succeeds, the spell ends." +
            AtHigherLevels +
            "When you cast this spell using a 6th-level spell slot, the duration is concentration, up to 10 minutes. When you use a 7th-level spell slot, the duration is concentration, up to 1 hour. When you use a spell slot of 8th level or higher, the duration is concentration, up to 8 hours."
    },
    "drawmij's instant summons": {
        name: "Drawmij's Instant Summons",
        nameShort: "Draw. Instant Sum.",
        nameAlt: "Instant Summons",
        classes: ["wizard"],
        source: [["SRD", 157], ["P", 235]],
        ritual: true,
        level: 6,
        school: "Conj",
        time: "1 min",
        range: "Touch",
        components: "V,S,M\u0192",
        compMaterial: "A sapphire worth 1,000 gp",
        duration: "Till dispelled",
        description:
            "Link object to sapphire (1000gp); 1 a crush gem to summon the unattended object or learn of wielder",
        descriptionFull:
            "You touch an object weighing 10 pounds or less whose longest dimension is 6 feet or less. The spell leaves an invisible mark on its surface and invisibly inscribes the name of the item on the sapphire you use as the material component. Each time you cast this spell, you must use a different sapphire." +
            "\n   " +
            "At any time thereafter, you can use your action to speak the item's name and crush the sapphire. The item instantly appears in your hand regardless of physical or planar distances, and the spell ends." +
            "\n   " +
            "If another creature is holding or carrying the item, crushing the sapphire doesn't transport the item to you, but instead you learn who the creature possessing the object is and roughly where that creature is located at that moment." +
            "\n   " +
            "Dispel magic or a similar effect successfully applied to the sapphire ends this spell's effect."
    },
    dream: {
        name: "Dream",
        classes: ["bard", "warlock", "wizard"],
        source: [["SRD", 138], ["P", 236]],
        level: 5,
        school: "Illus",
        time: "1 min",
        range: "Special",
        components: "V,S,M",
        compMaterial:
            "A handful of sand, a dab of ink, and a writing quill plucked from a sleeping bird",
        duration: "8 h",
        description:
            "Me or willing crea enters a crea's dreams, manifesting as a messenger with whom it can communicate",
        descriptionFull:
            "This spell shapes a creature's dreams. Choose a creature known to you as the target of this spell. The target must be on the same plane of existence as you. Creatures that don't sleep, such as elves, can't be contacted by this spell. You, or a willing creature you touch, enters a trance state, acting as a messenger. While in the trance, the messenger is aware of his or her surroundings, but can't take actions or move." +
            "\n   " +
            "If the target is asleep, the messenger appears in the target's dreams and can converse with the target as long as it remains asleep, through the duration of the spell. The messenger can also shape the environment of the dream, creating landscapes, objects, and other images. The messenger can emerge from the trance at any time, ending the effect of the spell early. The target recalls the dream perfectly upon waking. If the target is awake when you cast the spell, the messenger knows it, and can either end the trance (and the spell) or wait for the target to fall asleep, at which point the messenger appears in the target's dreams." +
            "\n   " +
            "You can make the messenger appear monstrous and terrifying to the target. If you do, the messenger can deliver a message of no more than ten words and then the target must make a Wisdom saving throw. On a failed save, echoes of the phantasmal monstrosity spawn a nightmare that lasts the duration of the target's sleep and prevents the target from gaining any benefit from that rest. In addition, when the target wakes up, it takes 3d6 psychic damage." +
            "\n   " +
            "If you have a body part, lock of hair, clipping from a nail, or similar portion of the target's body, the target makes its saving throw with disadvantage."
    },
    druidcraft: {
        name: "Druidcraft",
        classes: ["druid"],
        source: [["SRD", 138], ["P", 236]],
        level: 0,
        school: "Trans",
        time: "1 a",
        range: "30 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "Small nature effect; predict weather, expedite small plant growth, snuff light, harmless sensory effect",
        descriptionFull:
            "Whispering to the spirits of nature, you create one of the following effects within range." +
            "\n " +
            "\u2022 You create a tiny, harmless sensory effect that predicts what the weather will be at your location for the next 24 hours. The effect might manifest as a golden orb for clear skies, a cloud for rain, falling snowflakes for snow, and so on. This effect persists for 1 round." +
            "\n " +
            "\u2022 You instantly make a flower blossom, a seed pod open, or a leaf bud bloom." +
            "\n " +
            "\u2022 You create an instantaneous, harmless sensory effect, such as falling leaves, a puff of wind, the sound of a small animal, or the faint odor of skunk. The effect must fit in a 5-foot cube." +
            "\n " +
            "\u2022 You instantly light or snuff out a candle, a torch, or a small campfire."
    },
    earthquake: {
        name: "Earthquake",
        classes: ["cleric", "druid", "sorcerer"],
        source: [["SRD", 139], ["P", 236]],
        level: 8,
        school: "Evoc",
        time: "1 a",
        range: "500 ft",
        components: "V,S,M",
        compMaterial: "A pinch of dirt, a piece of rock, and a lump of clay",
        duration: "Conc, 1 min",
        description:
            "Cause an earthquake in a 100-ft rad, damaging structures and creating dangerous fissures, see book",
        descriptionFull:
            "You create a seismic disturbance at a point on the ground that you can see within range. For the duration, an intense tremor rips through the ground in a 100-foot- radius circle centered on that point and shakes creatures and structures in contact with the ground in that area." +
            "\n   " +
            "The ground in the area becomes difficult terrain. Each creature on the ground that is concentrating must make a Constitution saving throw. On a failed save, the creature's concentration is broken." +
            "\n   " +
            "When you cast this spell and at the end of each turn you spend concentrating on it, each creature on the ground in the area must make a Dexterity saving throw. On a failed save, the creature is knocked prone." +
            "\n   " +
            "This spell can have additional effects depending on the terrain in the area, as determined by the DM." +
            "\n   " +
            "Fissures. Fissures open throughout the spell's area at the start of your next turn after you cast the spell. A total of 1d6 such fissures open in locations chosen by the DM. Each is 1d10 \u00D7 10 feet deep, 10 feet wide, and extends from one edge of the spell's area to the opposite side. A creature standing on a spot where a fissure opens must succeed on a Dexterity saving throw or fall in. A creature that successfully saves moves with the fissure's edge as it opens. A fissure that opens beneath a structure causes it to automatically collapse (see below)." +
            "\n   " +
            "Structures. The tremor deals 50 bludgeoning damage to any structure in contact with the ground in the area when you cast the spell and at the start of each of your turns until the spell ends. If a structure drops to 0 hit points, it collapses and potentially damages nearby creatures. A creature within half the distance of a structure's height must make a Dexterity saving throw. On a failed save, the creature takes 5d6 bludgeoning damage, is knocked prone, and is buried in the rubble, requiring a DC 20 Strength (Athletics) check as an action to escape. The DM can adjust the DC higher or lower, depending on the nature of the rubble. On a successful save, the creature takes half as much damage and doesn't fall prone or become buried."
    },
    "eldritch blast": {
        name: "Eldritch Blast",
        classes: ["warlock"],
        source: [["SRD", 139], ["P", 237]],
        level: 0,
        school: "Evoc",
        time: "1 a",
        range: "120 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "Spell attack beam 1d10 Force damage; beams can be combined or split; CL5:2, CL11:3, CL17:4 beams",
        descriptionCantripDie:
            "Spell attack for `CD` beam(s), each 1d10 Force damage; beams can be combined or split",
        descriptionFull:
            "A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage." +
            "\n   " +
            "The spell creates more than one beam when you reach higher levels - two beams at 5th level, three beams at 11th level, and four beams at 17th level. you can direct the beams at the same target or at different ones. Make a separate attack roll for each beam."
    },
    "enhance ability": {
        name: "Enhance Ability",
        classes: ["bard", "cleric", "druid", "sorcerer"],
        source: [["SRD", 139], ["P", 237]],
        level: 2,
        school: "Trans",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "Fur or a feather from a beast",
        duration: "Conc, 1 h",
        description:
            "1+1/SL crea adv. on checks with 1 stat; choosing Str, Dex, Con gives secondary benefits",
        descriptionFull:
            "You touch a creature and bestow upon it a magical enhancement. Choose one of the following effects - the target gains the effect until the spell ends." +
            "\n   " +
            toUni("Bear's Endurance") +
            ": The target has advantage on Constitution checks. It also gains 2d6 temporary hit points, which are lost when the spell ends." +
            "\n   " +
            toUni("Bull's Strength") +
            ": The target has advantage on Strength checks, and his or her carrying capacity doubles." +
            "\n   " +
            toUni("Cat's Grace") +
            ": The target has advantage on Dexterity checks. It also doesn't take damage from falling 20 feet or less if it isn't incapacitated." +
            "\n   " +
            toUni("Eagle's Splendor") +
            ": The target has advantage on Charisma checks." +
            "\n   " +
            toUni("Fox's Cunning") +
            ": The target has advantage on Intelligence checks." +
            "\n   " +
            toUni("Owl's Wisdom") +
            ": The target has advantage on Wisdom checks." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd."
    },
    "enlarge/reduce": {
        name: "Enlarge/Reduce",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 140], ["P", 237]],
        level: 2,
        school: "Trans",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "A pinch of powdered iron",
        duration: "Conc, 1 min",
        save: "Con",
        description:
            "1 crea/object save or enlarged (Str adv. +1d4 weapon dmg), reduced (Str dis. -1d4 weapon dmg)",
        descriptionFull:
            "You cause a creature or an object you can see within range to grow larger or smaller for the duration. Choose either a creature or an object that is neither worn nor carried. If the target is unwilling, it can make a Constitution saving throw. On a success, the spell has no effect." +
            "\n   " +
            "If the target is a creature, everything it is wearing and carrying changes size with it. Any item dropped by an affected creature returns to normal size at once." +
            "\n   " +
            toUni("Enlarge") +
            ": The target's size doubles in all dimensions, and its weight is multiplied by eight. This growth increases its size by one category - from Medium to Large, for example. If there isn't enough room for the target to double its size, the creature or object attains the maximum possible size in the space available. Until the spell ends, the target also has advantage on Strength checks and Strength saving throws. The target's weapons also grow to match its new size. While these weapons are enlarged, the target's attack with them deal 1d4 extra damage." +
            "\n   " +
            toUni("Reduce") +
            ": The target's size is halved in all dimensions, and its weight is reduced to one-eighth of normal. This reduction decreases its size by one category - from Medium to Small, for example. Until the spell ends, the target also has disadvantage on Strength checks and Strength saving throws. The target's weapons also shrink to match its new size. While these weapons are reduced, the target's attacks with them deal 1d4 less damage (this can't reduce the damage below 1)."
    },
    entangle: {
        name: "Entangle",
        classes: ["druid"],
        source: [["SRD", 140], ["P", 238]],
        level: 1,
        school: "Conj",
        time: "1 a",
        range: "90 ft",
        components: "V,S",
        duration: "Conc, 1 min",
        save: "Str",
        description:
            "20-ft square save or restrained; Str check vs. Spell DC to escape; for duration area is difficult terrain",
        descriptionFull:
            "Grasping weeds and vines sprout from the ground in a 20-foot square starting from a point within range. For the duration, these plants turn the ground in the area into difficult terrain." +
            "\n   " +
            "A creature in the area when you cast the spell must succeed on a Strength saving throw or be restrained by the entangling plants until the spell ends. A creature restrained by the plants can use its action to make a Strength check against your spell save DC. On a success, it frees itself." +
            "\n   " +
            "When the spell ends, the conjured plants wilt away."
    },
    enthrall: {
        name: "Enthrall",
        classes: ["bard", "warlock"],
        source: [["SRD", 140], ["P", 238]],
        level: 2,
        school: "Ench",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "1 min",
        save: "Wis",
        description:
            "While I speak, any crea save (adv. if fighting) or dis. on Wis(Perception) for any other than me",
        descriptionFull:
            "You weave a distracting string of words, causing creatures of your choice that you can see within range and that can hear you to make a Wisdom saving throw. Any creature that can't be charmed succeeds on this saving throw automatically, and if you or your companions are fighting a creature, it has advantage on the save. On a failed save, the target has disadvantage on Wisdom (Perception) checks made to perceive any creature other than you until the spell ends or until the target can no longer hear you. The spell ends if you are incapacitated or can no longer speak."
    },
    etherealness: {
        name: "Etherealness",
        classes: ["bard", "cleric", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 140], ["P", 238]],
        level: 7,
        school: "Trans",
        time: "1 a",
        range: "Self",
        components: "V,S",
        duration: "8 h (D)",
        description:
            "Me or 3/SL willing go to Ethereal Plane; move there, but able to perceive 60 ft into the normal plane",
        descriptionFull:
            "You step into the border regions of the Ethereal Plane, in the area where it overlaps with your current plane. You remain in the Border Ethereal for the duration or until you use your action to dismiss the spell. During this time, you can move in any direction. If you move up or down, every foot of movement costs an extra foot. You can see and hear the plan you originated from, but everything there looks gray, and you can't see anything more than 60 feet away." +
            "\n   " +
            "While on the Ethereal Plane, you can only affect and be affected by other creatures on that plane. Creatures that aren't on the Ethereal Plane can't perceive you and can't interact with you, unless a special ability or magic has given them the ability to do so." +
            "\n   " +
            "You ignore all objects and effects that aren't on the Ethereal Plane, allowing you to move through objects you perceive on the plan you originated from." +
            "\n   " +
            "When the spell ends, you immediately return to the plane you originated from in the spot you currently occupy. If you occupy the same spot as a solid object or creature when this happens, you are immediately shunted to the nearest unoccupied space that you can occupy and take force damage equal to twice the number of feet you are moved." +
            "\n   " +
            "This spell has no effect if you cast it while you are on the Ethereal Plane or a plane that doesn't border it, such as one of the Outer Planes." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 8th level or higher, you can target up to three willing creatures (including you) for each slot level above 7th. The creatures must be within 10 feet of you when you cast the spell."
    },
    "evard's black tentacles": {
        name: "Evard's Black Tentacles",
        nameAlt: "Black Tentacles",
        classes: ["wizard"],
        source: [["SRD", 121], ["P", 238]],
        level: 4,
        school: "Conj",
        time: "1 a",
        range: "90 ft",
        components: "V,S,M",
        compMaterial:
            "A piece of tentacle from a giant octopus or a giant squid",
        duration: "Conc, 1 min",
        save: "Dex",
        description:
            "All that enter/start 20-ft rad save or restrained \u0026 3d6 Bludgeoning dmg/rnd; Str/Dex check to escape",
        descriptionFull:
            "Squirming, ebony tentacles fill a 20-foot square on ground that you can see within range. For the duration, these tentacles turn the ground in the area into difficult terrain." +
            "\n   " +
            "When a creature enters the affected area for the first time on a turn or starts its turn there, the creature must succeed on a Dexterity saving throw or take 3d6 bludgeoning damage and be restrained by the tentacles until the spell ends. A creature that starts its turn in the area and is already restrained by the tentacles takes 3d6 bludgeoning damage." +
            "\n   " +
            "A creature restrained by the tentacles can use its action to make a Strength or Dexterity check (its choice) against your spell save DC. On a success, it frees itself."
    },
    "expeditious retreat": {
        name: "Expeditious Retreat",
        classes: ["sorcerer", "warlock", "wizard"],
        source: [["SRD", 141], ["P", 238]],
        level: 1,
        school: "Trans",
        time: "1 bns",
        range: "Self",
        components: "V,S",
        duration: "Conc, 10 min",
        description:
            "I can take Dash action now, and as a bonus action for the duration",
        descriptionFull:
            "This spell allows you to move at an incredible pace. When you cast this spell, and then as a bonus action on each of your turns until the spell ends, you can take the Dash action."
    },
    eyebite: {
        name: "Eyebite",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 141], ["P", 238]],
        level: 6,
        school: "Necro",
        time: "1 a",
        range: "Self",
        components: "V,S",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "1 crea/rnd within 60 ft save or either fall asleep, panicked, or sickened, my choice",
        descriptionFull:
            "For the spell's duration, your eyes become an inky void imbued with dread power. One creature of your choice within 60 feet of you that you can see must succeed on a Wisdom saving throw or be affected by one of the following effects of your choice for the duration. On each of your turns until the spell ends, you can use your action to target another creature but can't target a creature again if it has succeeded on a saving throw against this casting of Eyebite." +
            "\n   " +
            toUni("Asleep") +
            ": The target falls unconscious. It wakes up if it takes any damage or if another creature uses its action to shake the sleeper awake." +
            "\n   " +
            toUni("Panicked") +
            ": The target is frightened of you. On each of its turns, the frightened creature must take the Dash action and move away from you by the safest and shortest available route, unless there is nowhere to move. If the target moves to a place at least 60 feet away from you where it can no longer see you, this effect ends." +
            "\n   " +
            toUni("Sickened") +
            ": The target has disadvantage on attack rolls and ability checks. At the end of each of its turns, it can make another Wisdom saving throw. If it succeeds, the effect ends."
    },
    fabricate: {
        name: "Fabricate",
        classes: ["wizard"],
        source: [["SRD", 141], ["P", 239]],
        level: 4,
        school: "Trans",
        time: "10 min",
        range: "120 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "Create simple object from raw materials; or complex object if proficient in the appropriate tools",
        descriptionFull:
            "You convert raw materials into products of the same material. For example, you can fabricate a wooden bridge from a clump of trees, a rope from a patch of hemp, and clothes from flax or wool." +
            "\n   " +
            "Choose raw materials that you can see within range. You can fabricate a Large or smaller object (contained within a 10-foot cube, or eight connected 5-foot cubes), given a sufficient quantity of raw material. If you are working with metal, stone, or another mineral substance, however, the fabricated object can be no larger than Medium (contained within a single 5-foot cube). The quality of objects made by the spell is commensurate with the quality of the raw materials." +
            "\n   " +
            "Creatures or magic items can't be created or transmuted by this spell. You also can't use it to create items that ordinarily require a high degree of craftsmanship, such as jewelry, weapons, glass, or armor, unless you have proficiency with the type of artisan's tools used to craft such objects."
    },
    "faerie fire": {
        name: "Faerie Fire",
        classes: ["bard", "druid"],
        source: [["SRD", 141], ["P", 239]],
        level: 1,
        school: "Evoc",
        time: "1 a",
        range: "60 ft",
        components: "V",
        duration: "Conc, 1 min",
        save: "Dex",
        description:
            "20-ft cube all obj/crea save or outlined in 10 ft dim light and attacks have adv.; see invisible crea",
        descriptionFull:
            "Each object in a 20-foot cube within range is outlined in blue, green, or violet light (your choice). Any creature in the area when the spell is cast is also outlined in light if it fails a Dexterity saving throw. For the duration, objects and affected creatures shed dim light in a 10-foot radius." +
            "\n   " +
            "Any attack roll against an affected creature or object has advantage if the attacker can see it, and the affected creature or object can't benefit from being invisible."
    },
    "false life": {
        name: "False Life",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 142], ["P", 239]],
        level: 1,
        school: "Necro",
        time: "1 a",
        range: "Self",
        components: "V,S,M",
        compMaterial: "A small amount of alcohol or distilled spirits",
        duration: "1 h",
        description: "I gain 1d4+4+5/SL temporary hit points for the duration",
        descriptionFull:
            "Bolstering yourself with a necromantic facsimile of life, you gain 1d4+4 temporary hit points for the duration." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, you gain 5 additional temporary hit points for each slot level above 1st."
    },
    fear: {
        name: "Fear",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 142], ["P", 239]],
        level: 3,
        school: "Illus",
        time: "1 a",
        range: "30-ft cone",
        components: "V,S,M",
        compMaterial: "A white feather or the heart of a hen",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "All crea save or drop what it is holding and frightened; extra save at end of turn if not in line of sight",
        descriptionFull:
            "You project a phantasmal image of a creature's worst fears. Each creature in a 30-foot cone must succeed on a Wisdom saving throw or drop whatever it is holding and become frightened for the duration." +
            "\n   " +
            "While frightened by this spell, a creature must take the Dash action and move away from you by the safest available route on each of its turns, unless there is nowhere to move. If the creature ends its turn in a location where it doesn't have line of sight to you, the creature can make a Wisdom saving throw. On a successful save, the spell ends for that creature."
    },
    "feather fall": {
        name: "Feather Fall",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 142], ["P", 239]],
        level: 1,
        school: "Trans",
        time: "1 rea",
        range: "60 ft",
        components: "V,M",
        compMaterial: "A small feather or piece of down",
        duration: "1 min",
        description:
            "5 creatures descent only 60 ft/rnd for duration or until landed, taking no falling damage",
        descriptionFull:
            "Reaction - When you or a creature within 60 feet of you falls Choose up to five falling creatures within range. A falling creature's rate of descent slows to 60 feet per round until the spell ends. If the creature lands before the spell ends, it takes no falling damage and can land on its feet, and the spell ends for that creature."
    },
    feeblemind: {
        name: "Feeblemind",
        classes: ["bard", "druid", "warlock", "wizard"],
        source: [["SRD", 142], ["P", 239]],
        level: 8,
        school: "Ench",
        time: "1 a",
        range: "150 ft",
        components: "V,S,M",
        compMaterial: "A handful of clay, crystal, glass, or mineral spheres",
        duration: "Instantaneous",
        save: "Int",
        description:
            "1 crea 4d6 Psychic dmg and save or Int and Cha become 1; extra save every 30 days to end spell",
        descriptionFull:
            "You blast the mind of a creature that you can see within range, attempting to shatter its intellect and personality. The target takes 4d6 psychic damage and must make an Intelligence saving throw." +
            "\n   " +
            "On a failed save, the creature's Intelligence and Charisma scores become 1. The creature can't cast spells, activate magic items, understand language, or communicate in any intelligible way. The creature can, however, identify its friends, follow them, and even protect them." +
            "\n   " +
            "At the end of every 30 days, the creature can repeat its saving throw against this spell. If it succeeds on its saving throw, the spell ends." +
            "\n   " +
            "The spell can also be ended by greater restoration, heal or wish."
    },
    "find familiar": {
        name: "Find Familiar",
        classes: ["wizard"],
        source: [["SRD", 143], ["P", 240]],
        ritual: true,
        level: 1,
        school: "Conj",
        time: "1 h",
        range: "10 ft",
        components: "V,S,M\u2020",
        compMaterial:
            "10 gp worth of charcoal, incense, and herbs that must be consumed by fire in a brass brazier",
        duration: "Instantaneous",
        description:
            "Gain the services of a familiar; can see through its eyes; it can deliver touch spells; see B (10gp cons.)",
        descriptionFull:
            "You gain the service of a familiar, a spirit that takes an animal form you choose - bat, cat, crab, frog (toad), hawk, lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, or weasel. Appearing in an unoccupied space within range, the familiar has the statistics of the chosen form, though it is a celestial, fey or fiend (your choice) instead of a beast." +
            "\n   " +
            "Your familiar acts independently of you, but it always obeys your commands. In combat, it rolls its own initiative and acts on its own turn. A familiar can't attack, but it can take other actions as normal." +
            "\n   " +
            "When the familiar drops to 0 hit points, it disappears, leaving behind no physical form. It reappears after you cast this spell again. While your familiar is within 100 feet of you, you can communicate with it telepathically. Additionally, as an action, you can see through your familiar's eyes and hear what it hears until the start of your next turn, gaining the benefits of any special senses that the familiar has. During this time, you are deaf and blind with regard to your own senses." +
            "\n   " +
            "As an action, you can temporarily dismiss your familiar. It disappears into a pocket dimension where it awaits you summons. Alternatively, you can dismiss it forever. As an action while it is temporarily dismissed, you can cause it to reappear in any unoccupied space within 30 feet of you." +
            "\n   " +
            "You can't have more than one familiar at a time. If you cast this spell while you already have a familiar, you instead cause it to adopt a new form. Choose one of the forms from the above list. Your familiar transforms into the chosen creature." +
            "\n   " +
            "Finally, when you cast a spell with a range of touch, your familiar can deliver the spell as if it had cast the spell. Your familiar must be within 100 feet of you, and it must use its reaction to deliver the spell when you cast it. If the spell requires an attack roll, you use your attack modifier for the roll."
    },
    "find steed": {
        name: "Find Steed",
        classes: ["paladin"],
        source: [["SRD", 143], ["P", 240]],
        level: 2,
        school: "Conj",
        time: "10 min",
        range: "30 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "Gain the services of a steed; communicate with each other telepathically; share spells with it; see book",
        descriptionFull:
            "You summon a spirit that assumes the form of an unusually intelligent, strong, and loyal steed, creating a long-lasting bond with it. Appearing in an unoccupied space within range, the steed takes on a form that you choose, such as a warhorse, a pony, a camel, an elk, or a mastiff. (Your DM might allow other animals to be summoned as steeds.) The steed has the statistics of the chosen form, though it is a celestial, fey, or fiend (your choice) instead of its normal type. Additionally, if your steed has an Intelligence of 5 or less, its Intelligence becomes 6, and it gains the ability to understand one language of your choice that you speak." +
            "\n   " +
            "Your steed serves you as a mount, both in combat and out, and you have an instinctive bond with it that allows you to fight as a seamless unit. While mounted on your steed, you can make any spell you cast that targets only you also target your steed." +
            "\n   " +
            "When the steed drops to 0 hit points, it disappears, leaving behind no physical form. You can also dismiss your steed at any time as an action, causing it to disappear. In either case, casting this spell again summons the same steed, restored to its hit point maximum." +
            "\n   " +
            "While your steed is within 1 mile of you, you can communicate with each other telepathically." +
            "\n   " +
            "You can't have more than one steed bonded by this spell at a time. As an action, you can release the steed from its bond at any time, causing it to disappear."
    },
    "find the path": {
        name: "Find the Path",
        classes: ["bard", "cleric", "druid"],
        source: [["SRD", 143], ["P", 240]],
        level: 6,
        school: "Div",
        time: "1 min",
        range: "Self",
        components: "V,S,M\u0192",
        compMaterial:
            "A set of divinatory tools - such as bones, ivory sticks, cards, teeth, or carved runes - worth 100 gp and an object from the location you wish to find",
        duration: "Conc, 1 day",
        description:
            "Know the shortest route to a location I am familiar with and are on the same plane with (100gp)",
        descriptionFull:
            "This spell allows you to find the shortest, most direct physical route to a specific fixed location that you are familiar with on the same plane of existence. If you name a destination on another plan of existence, a destination that moves (such as a mobile fortress), or a destination that isn't specific (such as a green dragon's lair), the spell fails." +
            "\n   " +
            "For the duration, as long as you are on the same plane of existence as the destination, you know how far it is and in what direction it lies. While you are traveling there, whenever you are presented with a choice of paths along the way, you automatically determine which path is the shortest and most direct route (but not necessarily the safest route) to the destination."
    },
    "find traps": {
        name: "Find Traps",
        classes: ["cleric", "druid", "ranger"],
        source: [["SRD", 144], ["P", 241]],
        level: 2,
        school: "Div",
        time: "1 a",
        range: "120 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "Sense presence of any trap within line of sight; not exact location, but general nature of trap",
        descriptionFull:
            "You sense the presence of any trap within range that is within line of sight. A trap, for the purpose of this spell, includes anything that would inflict a sudden or unexpected effect you consider harmful or undesirable, which was specifically intended as such by its creator. Thus, the spell would sense an area affected by the alarm spell, a glyph of warding, or a mechanical pit trap, but it would not reveal a natural weakness in the floor, an unstable ceiling, or a hidden sinkhole." +
            "\n   " +
            "This spell merely reveals that a trap is present. You don't learn the location of each trap, but you do learn the general nature of the danger posed by a trap you sense."
    },
    "finger of death": {
        name: "Finger of Death",
        classes: ["sorcerer", "warlock", "wizard"],
        source: [["SRD", 144], ["P", 241]],
        level: 7,
        school: "Necro",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Instantaneous",
        save: "Con",
        description:
            "1 crea 7d8+30 Necrotic dmg; save halves; crea killed becomes zombie under my command",
        descriptionFull:
            "You send negative energy coursing through a creature that you can see within range, causing it searing pain. The target must make a Constitution saving throw. It takes 7d8+30 necrotic damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            "A humanoid killed by this spell rises at the start of your next turn as a zombie that is permanently under your command, following your verbal orders to the best of its ability."
    },
    "fire bolt": {
        name: "Fire Bolt",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 144], ["P", 241]],
        level: 0,
        school: "Evoc",
        time: "1 a",
        range: "120 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "Spell attack for 1d10 Fire dmg; unattended flammable objects ignite; +1d10 at CL 5, 11, and 17",
        descriptionCantripDie:
            "Spell attack for `CD`d10 Fire dmg; unattended flammable objects ignite",
        descriptionFull:
            "You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn't being worn or carried." +
            "\n   " +
            "This spell's damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10)."
    },
    "fire shield": {
        name: "Fire Shield",
        classes: ["wizard"],
        source: [["SRD", 144], ["P", 241]],
        level: 4,
        school: "Evoc",
        time: "1 a",
        range: "Self",
        components: "V,S,M",
        compMaterial: "A bit of phosphorous or a firefly",
        duration: "10 min (D)",
        description:
            "Fiery shield gives either Fire or Cold dmg resist. and deals 2d8 of the other dmg type to melee attackers",
        descriptionFull:
            "Thin and wispy flames wreathe your body for the duration, shedding bright light in a 10-foot radius and dim light for an additional 10 feet. You can end the spell early by using an action to dismiss it." +
            "\n   " +
            "The flames provide you with a warm shield or a chill shield, as you choose. The warm shield grants you resistance to cold damage, and the chill shield grants you resistance to fire damage." +
            "\n   " +
            "In addition, whenever a creature within 5 feet of you hits you with a melee attack, the shield erupts with flame. The attacker takes 2d8 fire damage from a warm shield, or 2d8 cold damage from a cold shield."
    },
    "fire storm": {
        name: "Fire Storm",
        classes: ["cleric", "druid", "sorcerer"],
        source: [["SRD", 145], ["P", 241]],
        level: 7,
        school: "Evoc",
        time: "1 a",
        range: "150 ft",
        components: "V,S",
        duration: "Instantaneous",
        save: "Dex",
        description:
            "10 connected 10-ft cubes all crea 7d10 Fire dmg; save halves; unattended flammable objects ignite",
        descriptionFull:
            "A storm made up of sheets of roaring flame appears in a location you choose within range. The area of the storm consists of up to ten 10-foot cubes, which you can arrange as you wish. Each cube must have at least one face adjacent to the face of another cube. Each creature in the area must make Dexterity saving throw. It takes 7d10 fire damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            "The fire damages objects in the area and ignites flammable objects that aren't being worn or carried. If you choose, plant life in the area is unaffected by this spell."
    },
    fireball: {
        name: "Fireball",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 144], ["P", 241]],
        level: 3,
        school: "Evoc",
        time: "1 a",
        range: "150 ft",
        components: "V,S,M",
        compMaterial: "A tiny ball of bat guana and sulfur",
        duration: "Instantaneous",
        save: "Dex",
        description:
            "20-ft rad all crea 8d6+1d6/SL Fire dmg; save halves; unattended flammable objects ignite",
        descriptionFull:
            "A bright streak flashes from your pointing finger to a point you choose within range then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot radius must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            "The fire spreads around corners. It ignites flammable objects in the area that aren't being worn or carried." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd."
    },
    "flame blade": {
        name: "Flame Blade",
        classes: ["druid"],
        source: [["SRD", 145], ["P", 242]],
        level: 2,
        school: "Evoc",
        time: "1 bns",
        range: "Self",
        components: "V,S,M",
        compMaterial: "Leaf of sumac",
        duration: "Conc, 10 min",
        description:
            "Summon fiery blade; 1 a to make a melee spell attack for 3d6+1d6/2SL Fire dmg; 10 ft bright light",
        descriptionFull:
            "You evoke a fiery blade in your free hand. The blade is similar in size and shape to a scimitar, and it lasts for the duration. If you let go of the blade, it disappears, but you can evoke the blade again as a bonus action." +
            "\n   " +
            "You can use your action to make a melee spell attack with the fiery blade. On a hit, the target takes 3d6 fire damage." +
            "\n   " +
            "The flaming blade sheds bright light in a 10-foot radius and dim light for an additional 10 feet." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for every two slot levels above 2nd."
    },
    "flame strike": {
        name: "Flame Strike",
        classes: ["cleric"],
        source: [["SRD", 145], ["P", 242]],
        level: 5,
        school: "Evoc",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M",
        compMaterial: "Pinch of sulfur",
        duration: "Instantaneous",
        save: "Dex",
        description:
            "10-ft rad 40-ft high all crea 4d6 Fire and 4d6 Radiant dmg; save halves; +1d6/SL Fire or Radiant",
        descriptionFull:
            "A vertical column of divine fire roars down from the heavens in a location you specify. Each creature in a 10-foot radius, 40-foot-high cylinder centered on a point within range must make a Dexterity saving throw. A creature takes 4d6 fire damage and 4d6 radiant damage on a failed save, or half as much damage on a successful one." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 6th level or higher, the fire damage or the radiant damage (your choice) increases by 1d6 for each slot level above 5th."
    },
    "flaming sphere": {
        name: "Flaming Sphere",
        classes: ["druid", "wizard"],
        source: [["SRD", 145], ["P", 242]],
        level: 2,
        school: "Conj",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M",
        compMaterial:
            "A bit of tallow, a pinch of brimstone, and a dusting of powdered iron",
        duration: "Conc, 1 min",
        save: "Dex",
        description:
            "2.5-ft rad flaming sphere; bns a move 30 ft; all within 5-ft rad 2d6+1d6/SL Fire dmg; save halves",
        descriptionFull:
            "A 5-foot-diameter sphere of fire appears in an unoccupied space of your choice within range and lasts for the duration. Any creature that ends its turn within 5 feet of the sphere must make a Dexterity saving throw. The creature takes 2d6 fire damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            "As a bonus action, you can move the sphere up to 30 feet. If you ram the sphere into a creature, that creature must make the saving throw against the sphere's damage, and the sphere stops moving this turn." +
            "\n   " +
            "When you move the sphere, you can direct it over barriers up to 5 feet tall and jump it across pits up to 10 feet wide. The sphere ignites flammable objects not being worn or carried, and it sheds bright light in a 20-foot radius and dim light for an additional 20 feet." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd."
    },
    "flesh to stone": {
        name: "Flesh to Stone",
        classes: ["warlock", "wizard"],
        source: [["SRD", 145], ["P", 243]],
        level: 6,
        school: "Trans",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M",
        compMaterial: "A pinch of lime, water, and earth",
        duration: "Conc, 1 min",
        save: "Con",
        description:
            "1 crea save or restrained; save at end of turn, 3 consecutive fail: petrified, 3 consecutive success: free",
        descriptionFull:
            "You attempt to turn one creature that you can see within range into stone. If the targets body is made of flesh, the creature must make a Constitution saving throw. On a failed save, it is restrained as its flesh begins to harden. On a successful save, the creature isn't affected." +
            "\n   " +
            "A creature restrained by this spell must make another Constitution saving throw at the end of each of its turns. If it successfully saves against this spell three times, the spell ends. If it fails saves three times, it is turned to stone and subjected to the petrified condition for the duration. The successes and failures don't need to be consecutive, keep track of both until the target collects three of a kind." +
            "\n   " +
            "If the creature is physically broken while petrified, it suffers from similar deformities if it reverts to its original state." +
            "\n   " +
            "If you maintain your concentration on this spell for the entire possible duration, the creature is turned to stone until the effect is removed."
    },
    fly: {
        name: "Fly",
        classes: ["sorcerer", "warlock", "wizard"],
        source: [["SRD", 146], ["P", 243]],
        level: 3,
        school: "Trans",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "A wing feather from any bird",
        duration: "Conc, 10 min",
        description: "1+1/SL willing creatures gain fly 60 ft speed",
        descriptionFull:
            "You touch a willing creature. The target gains a flying speed of 60 feet for the duration. When the spell ends, the target falls if it is still aloft, unless it can stop the fall." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 4th level or higher, you can target one additional creature for each slot level above 3rd."
    },
    "fog cloud": {
        name: "Fog Cloud",
        classes: ["druid", "ranger", "sorcerer", "wizard"],
        source: [["SRD", 146], ["P", 243]],
        level: 1,
        school: "Conj",
        time: "1 a",
        range: "120 ft",
        components: "V,S",
        duration: "Conc, 1 h",
        description:
            "20-ft+20-ft/SL rad fog that spreads around corners; heavily obscures; 10 mph wind disperses it",
        descriptionFull:
            "You create a 20-foot-radius sphere of fog centered on a point within range. The sphere spreads around corners, and its area is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, the radius of the fog increases by 20 feet for each slot level above 1st."
    },
    forbiddance: {
        name: "Forbiddance",
        classes: ["cleric"],
        source: [["SRD", 146], ["P", 243]],
        ritual: true,
        level: 6,
        school: "Abjur",
        time: "10 min",
        range: "Touch",
        components: "V,S,M\u0192",
        compMaterial:
            "A sprinkling of holy water, rare incense, and powdered ruby worth at least 1,000 gp",
        duration: "1 day",
        description:
            "40K sq ft 30 ft high no extraplanar travel; 1 crea type 5d10 Radiant/Necrotic dmg/rnd (1000gp)",
        descriptionFull:
            "You create a ward against magical travel that protects up to 40,000 square feet of floor space to a height of 30 feet above the floor. For the duration, creatures can't teleport into the area or use portals, such as those created by the gate spell, to enter the area. The spell proofs the area against planar travel, and therefore prevents creatures from accessing the area by way of the Astral Plane, Ethereal Plane, Feywild, Shadowfell, or the plane shift spell." +
            "\n   " +
            "In addition, the spell damages types of creatures that you choose when you cast it. Choose one or more of the following - celestials, elementals, fey, fiends, and undead. When a chosen creature enters the spell's area for the first time on a turn or starts its turn there, the creature takes 5d10 radiant or necrotic damage (your choice when you cast this spell)." +
            "\n   " +
            "When you cast this spell, you can designate a password. A creature that speaks the password as it enters the area takes no damage from the spell." +
            "\n   " +
            "The spell's area can't overlap with the area of another forbiddance spell. If you cast forbiddance every day for 30 days in the same location, the spell lasts until it is dispelled, and the material components are consumed on the last casting."
    },
    forcecage: {
        name: "Forcecage",
        classes: ["bard", "warlock", "wizard"],
        source: [["SRD", 147], ["P", 243]],
        level: 7,
        school: "Evoc",
        time: "1 a",
        range: "100 ft",
        components: "V,S,M\u0192",
        compMaterial: "Ruby dust worth 1,500 gp",
        duration: "1 h",
        save: "Cha",
        description:
            "20-ft cube cage, or 10-ft cube solid; blocks all spells; extraplanar travel in/out on save (1500gp)",
        descriptionFull:
            "An immobile, invisible, cube-shaped prison composed of magical force springs into existence around an area you choose within range. The prison can be a cage or a solid box as you choose." +
            "\n   " +
            "A prison in the shape of a cage can be up to 20 feet on a side and is made from 1/2-inch diameter bars spaced 1/2 inch apart." +
            "\n   " +
            "A prison in the shape of a box can be up to 10 feet on a side, creating a solid barrier that prevents any matter from passing through it and blocking any spells cast into or out of the area." +
            "\n   " +
            "When you cast the spell, any creature that is completely inside the cage's area is trapped. Creatures only partially within the area, or those too large to fit inside the area, are pushed away from the center of the area until they are completely outside the area." +
            "\n   " +
            "A creature inside the cage can't leave it by nonmagical means. If the creature tries to use teleportation or interplanar travel to leave the cage, it must first make a Charisma saving throw. On a success, the creature can use that magic to exit the cage. On a failure, the creature can't exit the cage and wastes the use of the spell or effect. The cage also extends into the Ethereal Plane, blocking ethereal travel." +
            "\n   " +
            "This spell can't be dispelled by dispel magic."
    },
    foresight: {
        name: "Foresight",
        classes: ["bard", "druid", "warlock", "wizard"],
        source: [["SRD", 147], ["P", 244]],
        level: 9,
        school: "Div",
        time: "1 min",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "A hummingbird feather",
        duration: "8 h",
        description:
            "1 willing crea can't be surprised; adv. on attacks, ability checks, and saves; dis. on attacks vs. target",
        descriptionFull:
            "You touch a willing creature and bestow a limited ability to see into the immediate future. For the duration, the target can't be surprised and has advantage on attack rolls, ability checks, and saving throws. Additionally, other creatures have disadvantage on attack rolls against the target for the duration." +
            "\n   " +
            "This spell immediately ends if you cast it again before its duration ends."
    },
    "freedom of movement": {
        name: "Freedom of Movement",
        classes: ["bard", "cleric", "druid", "ranger"],
        source: [["SRD", 147], ["P", 244]],
        level: 4,
        school: "Abjur",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial:
            "A leather strap, bound around the arm or a similar appendage",
        duration: "1 h",
        description:
            "1 willing crea; magic cannot reduce speed, paralyze, restrain; use 5 ft to escape nonmagical restrains",
        descriptionFull:
            "You touch a willing creature. For the duration, the target's movement is unaffected by difficult terrain, and spells and other magical effects can neither reduce the target's speed nor cause the target to be paralyzed or restrained." +
            "\n   " +
            "The target can also spend 5 feet of movement to automatically escape from nonmagical restraints, such as manacles or a creature that has it grappled. Finally, being underwater imposes no penalties on the target's movement or attacks."
    },
    "gaseous form": {
        name: "Gaseous Form",
        classes: ["sorcerer", "warlock", "wizard"],
        source: [["SRD", 148], ["P", 244]],
        level: 3,
        school: "Trans",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "A bit of gauze and a wisp of smoke",
        duration: "Conc, 1 h",
        description:
            "1 willing crea into a misty cloud with fly 10 ft, resist. to nonmagical dmg, adv. on Str/Dex/saves",
        descriptionFull:
            "You transform a willing creature you touch, along with everything it's wearing and carrying, into a misty cloud for the duration. The spell ends if the creature drops to 0 hit points. An incorporeal creature isn't affected." +
            "\n   " +
            "While in this form, the target's only method of movement is a flying speed of 10 feet. The target can enter and occupy the space of another creature. The target has resistance to nonmagical damage, and it has advantage on Strength, Dexterity, and Constitution saving throws. The target can pass through small holes, narrow openings, and even mere cracks, though it treats liquids as though they were solid surfaces. The target can't fall and remains hovering in the air even when stunned or otherwise incapacitated." +
            "\n   " +
            "While in the form of a misty cloud, the target can't talk or manipulate objects, and any objects it was carrying or holding can't be dropped, used, or otherwise interacted with. The target can't attack or cast spells."
    },
    gate: {
        name: "Gate",
        classes: ["cleric", "sorcerer", "wizard"],
        source: [["SRD", 148], ["P", 244]],
        level: 9,
        school: "Conj",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M\u0192",
        compMaterial: "A diamond worth at least 5,000 gp",
        duration: "Conc, 1 min",
        description:
            "Create a portal to a precise location on a different plane; can transport named crea to me (5000gp)",
        descriptionFull:
            "You conjure a portal linking an unoccupied space you can see within range to a precise location on a different plane of existence. The portal is a circular opening, which you can make 5 to 20 feet in diameter. You can orient the portal in any direction you choose. The portal lasts for the duration." +
            "\n   " +
            "The portal has a front and a back on each plane where it appears. Travel through the portal is possible only by moving through its front. Anything that does so is instantly transported to the other plane, appearing in the unoccupied space nearest to the portal." +
            "\n   " +
            "Deities and other planar rulers can prevent portals created by this spell from opening in their presence or anywhere within their domains." +
            "\n   " +
            "When you cast this spell, you can speak the name of a specific creature (a pseudonym, title, or nickname doesn't work). If that creature is on a plane other than the one you are on, the portal opens in the named creature's immediate vicinity and draws the creature through it to the nearest unoccupied space on your side of the portal. You gain no special power over the creature, and it is free to act as the DM deems appropriate. It might leave, attack you, or help you."
    },
    geas: {
        name: "Geas",
        classes: ["bard", "cleric", "druid", "paladin", "wizard"],
        source: [["SRD", 148], ["P", 244]],
        level: 5,
        school: "Ench",
        time: "1 min",
        range: "60 ft",
        components: "V",
        duration: "30 days (D)",
        save: "Wis",
        description:
            "1 crea save or charmed, it must obey commands or 5d10 Psychic dmg; SL7: 1 year, SL9: until disp.",
        descriptionFull:
            "You place a magical command on a creature that you can see within range, forcing it to carry out some service or refrain from some action or course of activity as you decide. If the creature can understand you, it must succeed on a Wisdom saving throw or become charmed by you for the duration. While the creature is charmed by you, it takes 5d10 psychic damage each time it acts in a manner directly counter to your instructions, but no more than once each day. A creature that can't understand you is unaffected by the spell." +
            "\n   " +
            "You can issue any command you choose, short of an activity that would result in certain death. Should you issue a suicidal command, the spell ends." +
            "\n   " +
            "You can end the spell early by using an action to dismiss it. A remove curse, greater restoration, or wish spell also ends it." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 7th or 8th level, the duration is 1 year. When you cast this spell using a spell slot of the spell lasts until it is ended by one of the spells mentioned above."
    },
    "gentle repose": {
        name: "Gentle Repose",
        classes: ["cleric", "wizard"],
        source: [["SRD", 148], ["P", 245]],
        ritual: true,
        level: 2,
        school: "Necro",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial:
            "A pinch of salt and one copper piece placed on each of the corpse's eyes, which must remain there for the duration",
        duration: "10 days",
        description:
            "1 corpse protected from decay and prevent it from becoming undead; add duration to raising dead",
        descriptionFull:
            "You touch a corpse or other remains. For the duration, the target is protected from decay and can't become undead." +
            "\n   " +
            "The spell also effectively extends the time limit on raising the target from the dead, since days spent under the influence of this spell don't count against the time limit of spells such as raise dead."
    },
    "giant insect": {
        name: "Giant Insect",
        classes: ["druid"],
        source: [["SRD", 149], ["P", 245]],
        level: 4,
        school: "Trans",
        time: "1 a",
        range: "30 ft",
        components: "V,S",
        duration: "Conc, 10 min",
        description:
            "Transform centipedes, spiders, wasps, or scorpions into giant versions; obey my verbal commands",
        descriptionFull:
            "You transform up to ten centipedes, three spiders, five wasps, or one scorpion within range into giant versions of their natural forms for the duration. A centipede becomes a giant centipede, a spider becomes a giant spider, a wasp becomes a giant wasp, and a scorpion becomes a giant scorpion." +
            "\n   " +
            "Each creature obeys your verbal commands, and in combat, they act on your turn each round. The DM has the statistics for these creatures and resolves their actions and movement." +
            "\n   " +
            "A creature remains in its giant size for the duration, until it drops to 0 hit points, or until you use an action to dismiss the effect on it." +
            "\n   " +
            "The DM might allow you to choose different targets. For example, if you transform a bee, its giant version might have the same statistics as a giant wasp."
    },
    glibness: {
        name: "Glibness",
        classes: ["bard", "warlock"],
        source: [["SRD", 149], ["P", 245]],
        level: 8,
        school: "Trans",
        time: "1 a",
        range: "Self",
        components: "V",
        duration: "1 h",
        description:
            "I can choose to roll a 15 on any Charisma check; magic cannot detect if I am lying",
        descriptionFull:
            "Until the spell ends, when you make a Charisma check, you can replace the number you roll with a 15. Additionally, no matter what you say, magic that would determine if you are telling the truth indicates that you are being truthful."
    },
    "globe of invulnerability": {
        name: "Globe of Invulnerability",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 149], ["P", 245]],
        level: 6,
        school: "Abjur",
        time: "1 a",
        range: "10-ft rad",
        components: "V,S,M",
        compMaterial:
            "A glass or crystal bead that shatters when the spell ends",
        duration: "Conc, 1 min",
        description:
            "SL<(6+1/SL) cast outside area cannot effect inside area; casting with a higher spell slot does not help",
        descriptionFull:
            "An immobile, faintly shimmering barrier springs into existence in a 10-foot radius around you and remains for the duration." +
            "\n   " +
            "Any spell of 5th level or lower cast from outside the barrier can't affect creatures or objects within it, even if the spell is cast using a higher level spell slot. Such a spell can target creatures and objects within the barrier, but the spell has no effect on them. Similarly, the area within the barrier is excluded from the areas affected by such spells." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 7th level or higher, the barrier blocks spells of one level higher for each slot level above 6th."
    },
    "glyph of warding": {
        name: "Glyph of Warding",
        classes: ["bard", "cleric", "wizard"],
        source: [["SRD", 149], ["P", 245]],
        level: 3,
        school: "Abjur",
        time: "1 h",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial:
            "Incense and powdered diamond worth at least 200 gp, which the spell consumes",
        duration: "Till triggered",
        description:
            "Create a glyph that triggers on set condition; Int(Investigation) vs. Spell DC; see book (200gp cons.)",
        descriptionFull:
            "When you cast this spell, you inscribe a glyph that later unleashes a magical effect. You inscribe it either on a surface (such as a table or a section of floor or wall) or within an object that can be closed (such as a book, a scroll, or a treasure chest) to conceal the glyph. The glyph can cover an area no larger than 10 feet in diameter. If the surface or object is moved more than 10 feet from where you cast this spell, the glyph is broken, and the spell ends without being triggered." +
            "\n   " +
            "The glyph is nearly invisible and requires a successful Intelligence (Investigation) check against your spell save DC to be found." +
            "\n   " +
            "You decide what triggers the glyph when you cast the spell. For glyphs inscribed on a surface, the most typical triggers include touching or standing on the glyph, removing another object covering the glyph, approaching within a certain distance of the glyph, or manipulating the object on which the glyph is inscribed. For glyphs inscribed within an object, the most common triggers include opening that object, approaching within a certain distance of the object, or seeing or reading the glyph. Once a glyph is triggered, this spell ends." +
            "\n   " +
            "You can further refine the trigger so the spell activates only under certain circumstances or according to physical characteristics (such as height or weight), creature kind (for example, the ward could be set to affect aberrations or drow), or alignment. You can also set conditions for creatures that don't trigger the glyph, such as those who say a certain password." +
            "\n   " +
            "When you inscribe the glyph, choose explosive runes or a spell glyph." +
            "\n   " +
            toUni("Explosive Runes") +
            ": When triggered, the glyph erupts with magical energy in a 20-foot-radius sphere centered on the glyph. The sphere spreads around corners. Each creature in the aura must make a Dexterity saving throw. A creature takes 5d8 acid, cold, fire, lightning, or thunder damage on a failed saving throw (your choice when you create the glyph), or half as much damage on a successful one." +
            "\n   " +
            toUni("Spell Glyph") +
            ": You can store a prepared spell of 3rd level or lower in the glyph by casting it as part of creating the glyph. The spell must target a single creature or an area. The spell being stored has no immediate effect when cast in this way. When the glyph is triggered, the stored spell is cast. If the spell has a target, it targets the creature that triggered the glyph. If the spell affects an area, the area is centered on that creature. If the spell summons hostile creatures or creates harmful objects or traps, they appear as close as possible to the intruder and attack it. If the spell requires concentration, it lasts until the end of its full duration." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 4th level or higher, the damage of an explosive runes glyph increases by 1d8 for each slot level above 3rd. If you create a spell glyph, you can store any spell of up to the same level as the slot you use for the glyph of warding."
    },
    goodberry: {
        name: "Goodberry",
        classes: ["druid", "ranger"],
        source: [["SRD", 150], ["P", 246]],
        level: 1,
        school: "Trans",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "A sprig of mistletoe",
        duration: "Instantaneous",
        description:
            "Create 10 berries; 1 a to eat 1 berry for 1 HP and nourishment for 1 day; berries lose potency after 24h",
        descriptionFull:
            "Up to ten berries appear in your hand and are infused with magic for the duration. A creature can use its action to eat one berry. Eating a berry restores 1 hit point, and the berry provides enough nourishment to sustain a creature for one day." +
            "\n   " +
            "The berries lose their potency if they have not been consumed within 24 hours of the casting of this spell."
    },
    grease: {
        name: "Grease",
        classes: ["wizard"],
        source: [["SRD", 150], ["P", 246]],
        level: 1,
        school: "Conj",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M",
        compMaterial: "A bit of pork rind or butter",
        duration: "1 min",
        save: "Dex",
        description:
            "10-ft square difficult terrain; all entering, in area at casting or at end of turn save or fall prone",
        descriptionFull:
            "Slick grease covers the ground in a 10-foot square centered on a point within range and turns it into difficult terrain for the duration." +
            "\n   " +
            "When the grease appears, each creature standing in its area must succeed on a Dexterity saving throw or fall prone. A creature that enters the area or ends its turn there must also succeed on a Dexterity saving throw or fall prone."
    },
    "greater invisibility": {
        name: "Greater Invisibility",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 150], ["P", 246]],
        level: 4,
        school: "Illus",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "Conc, 1 min",
        description:
            "1 crea invisible until end of the spell; anything the target is wearing or carrying is also invisible",
        descriptionFull:
            "You or a creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target's person."
    },
    "greater restoration": {
        name: "Greater Restoration",
        classes: ["bard", "cleric", "druid"],
        source: [["SRD", 150], ["P", 246]],
        level: 5,
        school: "Abjur",
        time: "1 a",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial: "Diamond dust worth 100 gp, which the spell consumes",
        duration: "Instantaneous",
        description:
            "Reduce exhaustion or end charm, petrify, curse, stat or max HP reduction (100gp cons.)",
        descriptionFull:
            "You imbue a creature you touch with positive energy to undo a debilitating effect. You can reduce the target's exhaustion level by one, or end one of the following effects on the target." +
            "\n " +
            "\u2022 One effect that charmed or petrified the target" +
            "\n " +
            "\u2022 One curse, including the target's attunement to a cursed magic item" +
            "\n " +
            "\u2022 Any reduction to one of the target's ability scores" +
            "\n " +
            "\u2022 One effect reducing the target's hit point maximum."
    },
    "guardian of faith": {
        name: "Guardian of Faith",
        classes: ["cleric"],
        source: [["SRD", 150], ["P", 246]],
        level: 4,
        school: "Conj",
        time: "1 a",
        range: "30 ft",
        components: "V",
        duration: "8 h",
        save: "Dex",
        description:
            "Place spectre; hostiles coming in 10 ft of it 20 Radiant dmg; save half; vanishes after it deals 60 dmg",
        descriptionFull:
            "A Large spectral guardian appears and hovers for the duration in an unoccupied space of your choice that you can see within range. The guardian occupies that space and is indistinct except for a gleaming sword and shield emblazoned with the symbol of your deity." +
            "\n   " +
            "Any creature hostile to you that moves to a space within 10 feet of the guardian for the first time on a turn must succeed on a Dexterity saving throw. The creature takes 20 radiant damage on a failed save, or half as much damage on a successful one. The guardian vanishes when it has dealt a total of 60 damage."
    },
    "guards and wards": {
        name: "Guards and Wards",
        classes: ["bard", "wizard"],
        source: [["SRD", 151], ["P", 248]],
        level: 6,
        school: "Abjur",
        time: "10 min",
        range: "Touch",
        components: "V,S,M\u0192",
        compMaterial:
            "Burning incense, a small measure of brimstone and oil, a knotted string, a small amount of umber hulk blood, and a small silver rod worth at least 10 gp",
        duration: "24 h",
        description:
            "Protect an area with an assortment of effects including fog, web, illusions and locks; see book (10gp)",
        descriptionFull:
            "You create a ward that protects up to 2,500 square feet of floor space (an area 50 feet square, or one hundred 5-foot squares or twenty-five 10-foot squares). The warded area can be up to 20 feet tall, and shaped as you desire. You can ward several stories of a stronghold by dividing the area among them, as long as you can walk into each contiguous area while you are casting the spell." +
            "\n   " +
            "When you cast this spell, you can specify individuals that are unaffected by any or all of the effects that you choose. You can also specify a password that, when spoken aloud, makes the speaker immune to these effects." +
            "\n   " +
            "Guards and wards creates the following effects within the warded area." +
            "\n   " +
            toUni("Corridors") +
            ": Fog fills all the warded corridors, making them heavily obscured. In addition, at each intersection or branching passage offering a choice of direction, there is a 50 percent chance that a creature other than you will believe it is going in the opposite direction from the one it chooses." +
            "\n   " +
            toUni("Doors") +
            ": All doors in the warded area are magically locked, as if sealed by an arcane lock spell. In addition, you can cover up to ten doors with an illusion (equivalent to the illusory object function of the minor illusion spell) to make them appear as plain sections of wall." +
            "\n   " +
            toUni("Stairs") +
            ": Webs fill all stairs in the warded area from top to bottom, as the web spell. These strands regrow in 10 minutes if they are burned or torn away while guards and wards lasts." +
            "\n   " +
            toUni("Other Spell Effect") +
            ": You can place your choice of one of the following magical effects within the warded area of the stronghold." +
            "\n " +
            "\u2022 Place dancing lights in four corridors. You can designate a simple program that the lights repeat as long as guards and wards lasts." +
            "\n " +
            "\u2022 Place magic mouth in two locations." +
            "\n " +
            "\u2022 Place stinking cloud in two locations. The vapors appear in the places you designate they return within 10 minutes if dispersed by wind while guards and wards lasts." +
            "\n " +
            "\u2022 Place a constant gust of wind in one corridor or room. Place a suggestion in one location. You select an area of up to 5 feet square, and any creature that enters or passes through the area receives the suggestion mentally." +
            "\n\n" +
            "The whole warded area radiates magic. A dispel magic cast on a specific effect, if successful, removes only that effect." +
            "\n   " +
            "You can create a permanently guarded and warded structure by casting this spell there every day for one year."
    },
    guidance: {
        name: "Guidance",
        classes: ["cleric", "druid"],
        source: [["SRD", 151], ["P", 248]],
        level: 0,
        school: "Div",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "Conc, 1 min",
        description:
            "1 willing creature adds 1d4 to ability check of its choice, after rolling, once during the duration",
        descriptionFull:
            "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check of its choice. It can roll the die before or after making the ability check. The spell then ends."
    },
    "guiding bolt": {
        name: "Guiding Bolt",
        classes: ["cleric"],
        source: [["SRD", 151], ["P", 248]],
        level: 1,
        school: "Evoc",
        time: "1 a",
        range: "120 ft",
        components: "V,S",
        duration: "1 rnd",
        description:
            "Spell attack for 4d6+1d6/SL Radiant dmg and next attack against target has advantage",
        descriptionFull:
            "A flash of light streaks toward a creature of your choice within range. Make a ranged spell attack against the target. On a hit, the target takes 4d6 radiant damage, and the next attack roll made against this target before the end of your next turn has advantage, thanks to the mystical dim light glittering on the target until then." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st."
    },
    "gust of wind": {
        name: "Gust of Wind",
        classes: ["druid", "sorcerer", "wizard"],
        source: [["SRD", 152], ["P", 248]],
        level: 2,
        school: "Evoc",
        time: "1 a",
        range: "60-ft line",
        components: "V,S,M",
        compMaterial: "A legume seed",
        duration: "Conc, 1 min",
        save: "Str",
        description:
            "60-ft long 10-ft wide line of wind; crea starting turn in wind save or pushed 15 ft; see book",
        descriptionFull:
            "A line of strong wind 60 feet long and 10 feet wide blasts from you in a direction you choose for the spell's duration. Each creature that starts its turn in the line must succeed on a Strength saving throw or be pushed 15 feet away from you in a direction following the line." +
            "\n   " +
            "Any creature in the line must spend 2 feet of movement for every 1 foot it moves when moving closer to you." +
            "\n   " +
            "The gust disperses gas or vapor, and it extinguishes candles, torches, and similar unprotected flames in the area. It causes protected flames, such as those of lanterns, to dance wildly and has a 50 percent chance to extinguish them." +
            "\n   " +
            "As a bonus action on each of your turns before the spell ends, you can change the direction in which the line blasts from you."
    },
    hallow: {
        name: "Hallow",
        classes: ["cleric"],
        source: [["SRD", 152], ["P", 249]],
        level: 5,
        school: "Evoc",
        time: "24 h",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial:
            "Herbs, oils, and incense worth at least 1,000 gp, which the spell consumes",
        duration: "Till dispelled",
        description:
            "30-ft rad protected against celestials, elementals, fey, fiend, and undead; add additional effects; see B",
        descriptionFull:
            "You touch a point and infuse an area around it with holy (or unholy) power. The area can have a radius up to 60 feet, and the spell fails if the radius includes an area already under the effect a hallow spell. The affected area is subject to the following effects." +
            "\n   " +
            "First, celestials, elementals, fey, fiends, and undead can't enter the area, nor can such creatures charm, frighten, or possess creatures within it. Any creature charmed, frightened, or possessed by such a creature is no longer charmed, frightened, or possessed upon entering the area. You can exclude one or more of those types of creatures from this effect." +
            "\n   " +
            "Second, you can bind an extra effect to the area. Choose the effect from the following list, or choose an effect offered by the DM. Some of these effects apply to creatures in the area, you can designate whether the effect applies to all creatures, creatures that follow a specific deity or leader, or creatures of a specific sort, such as ores or trolls. When a creature that would be affected enters the spell's area for the first time on a turn or starts its turn there, it can make a Charisma saving throw. On a success, the creature ignores the extra effect until it leaves the area." +
            "\n   " +
            toUni("Courage") +
            ": Affected creatures can't be frightened while in the area." +
            "\n   " +
            toUni("Darkness") +
            ": Darkness fills the area. Normal light, as well as magical light created by spells of a lower level than the slot you used to cast this spell, can't illuminate the area." +
            "\n   " +
            toUni("Daylight") +
            ": Bright light fills the area. Magical darkness created by spells of a lower level than the slot you used to cast this spell can't extinguish the light." +
            "\n   " +
            toUni("Energy Protection") +
            ": Affected creatures in the area have resistance to one damage type of your choice, except for bludgeoning, piercing, or slashing." +
            "\n   " +
            toUni("Energy Vulnerability") +
            ": Affected creatures in the area have vulnerability to one damage type of your choice, except for bludgeoning, piercing, or slashing." +
            "\n   " +
            toUni("Everlasting Rest") +
            ": Dead bodies interred in the area can't be turned into undead." +
            "\n   " +
            toUni("Extradimensional Interference") +
            ": Affected creatures can't move or travel using teleportation or by extradimensional or interplanar means." +
            "\n   " +
            toUni("Fear") +
            ": Affected creatures are frightened while in the area." +
            "\n   " +
            toUni("Silence") +
            ": No sound can emanate from within the area, and no sound can reach into it." +
            "\n   " +
            toUni("Tongues") +
            ": Affected creatures can communicate with any other creature in the area, even if they don't share a common language."
    },
    "hallucinatory terrain": {
        name: "Hallucinatory Terrain",
        classes: ["bard", "druid", "warlock", "wizard"],
        source: [["SRD", 152], ["P", 249]],
        level: 4,
        school: "Illus",
        time: "10 min",
        range: "300 ft",
        components: "V,S,M",
        compMaterial: "A stone, a twig, and a bit of green plant",
        duration: "24 h",
        description:
            "150-ft cube of terrain resembles some other sort of terrain; Int (Investigation) vs. Spell DC; see book",
        descriptionFull:
            "You make natural terrain in a 150-foot cube in range look, sound, and smell like some other sort of natural terrain. Thus, open fields or a road can be made to resemble a swamp, hill, crevasse, or some other difficult or impassable terrain. A pond can be made to seem like a grassy meadow, a precipice like a gentle slope, or a rock-strewn gully like a wide and smooth road. Manufactured structures, equipment, and creatures within the area aren't changed in appearance." +
            "\n   " +
            "The tactile characteristics of the terrain are unchanged, so creatures entering the area are likely to see through the illusion. If the difference isn't obvious by touch, a creature carefully examining the illusion can attempt an Intelligence (Investigation) check against your spell save DC to disbelieve it. A creature who discerns the illusion for what it is, sees it as a vague image superimposed on the terrain."
    },
    harm: {
        name: "Harm",
        classes: ["cleric"],
        source: [["SRD", 153], ["P", 249]],
        level: 6,
        school: "Necro",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Instantaneous",
        save: "Con",
        description:
            "1 crea 14d6 Necrotic dmg, reduce max HP by same; not <1 HP; save halves and no max HP reduce",
        descriptionFull:
            "You unleash a virulent disease on a creature that you can see within range. The target must make a Constitution saving throw. On a failed save, it takes 14d6 necrotic damage, or half as much damage on a successful save. The damage can't reduce the target's hit points below 1. If the target fails the saving throw, its hit point maximum is reduced for 1 hour by an amount equal to the necrotic damage it took. Any effect that removes a disease allows a creature's hit point maximum to return to normal before that time passes."
    },
    haste: {
        name: "Haste",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 153], ["P", 250]],
        level: 3,
        school: "Trans",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "A shaving of licorice root",
        duration: "Conc, 1 min",
        description:
            "1 willing crea +2 AC, speed doubled, adv. on Dex saves, extra action (1 attack, dash, disengage, hide)",
        descriptionFull:
            "Choose a willing creature that you can see within range. Until the spell ends, the target's speed is doubled, it gains a +2 bonus to AC, it has advantage on Dexterity saving throws, and it gains an additional action on each of its turns. That action can be used only to take the Attack (one weapon attack only), Dash, Disengage, Hide, or Use an Object action." +
            "\n   " +
            "When the spell ends, the target can't move or take actions until after its next turn, as a wave of lethargy sweeps over it."
    },
    heal: {
        name: "Heal",
        classes: ["cleric", "druid"],
        source: [["SRD", 153], ["P", 250]],
        level: 6,
        school: "Evoc",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "1 living creature heals 70+10/SL HP and is cured of blindness, deafness, and all diseases",
        descriptionFull:
            "Choose a creature that you can see within range. A surge of positive energy washes through the creature, causing it to regain 70 hit points. The spell also ends blindness, deafness, and any diseases affecting the target. This spell has no effect on constructs or undead." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 7th level or higher, the amount of healing increases by 10 for each slot level above 6th."
    },
    "healing word": {
        name: "Healing Word",
        classes: ["bard", "cleric", "druid"],
        source: [["SRD", 153], ["P", 250]],
        level: 1,
        school: "Evoc",
        time: "1 bns",
        range: "60 ft",
        components: "V",
        duration: "Instantaneous",
        description:
            "1 living creature heals 1d4+1d4/SL+spellcasting ability modifier HP",
        descriptionFull:
            "A creature of your choice that you can see within range regains hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d4 for each slot level above 1st."
    },
    "heat metal": {
        name: "Heat Metal",
        classes: ["bard", "druid"],
        source: [["SRD", 153], ["P", 250]],
        level: 2,
        school: "Trans",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M",
        compMaterial: "A piece of iron and a flame",
        duration: "Conc, 1 min",
        save: "Con",
        description:
            "1 metal obj 2d8+1d8/SL Fire dmg to touch; save or drop obj; if held: dis. atk/chk; bns a reheat obj",
        descriptionFull:
            "Choose a manufactured metal object, such as a metal weapon or a suit of heavy or medium metal armor, that you can see within range. You cause the object to glow red-hot. Any creature in physical contact with the object takes 2d8 fire damage when you cast the spell. Until the spell ends, you can use a bonus action on each of your subsequent turns to cause this damage again." +
            "\n   " +
            "If a creature is holding or wearing the object and takes the damage from it, the creature must succeed on a Constitution saving throw or drop the object if it can. If it doesn't drop the object, it has disadvantage on attack rolls and ability checks until the start of your next turn." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot above 2nd."
    },
    "hellish rebuke": {
        name: "Hellish Rebuke",
        classes: ["warlock"],
        source: [["SRD", 154], ["P", 250]],
        level: 1,
        school: "Evoc",
        time: "1 rea",
        range: "60 ft",
        components: "V,S",
        duration: "Instantaneous",
        save: "Dex",
        description:
            "Cast when taking dmg, crea that dealt dmg 2d10+1d10/SL Fire dmg; save halves",
        descriptionFull:
            "You point your finger, and the creature that damaged you is momentarily surrounded by hellish flames. The creature must make a Dexterity saving throw. It takes 2d10 fire damage on a failed save, or half as much damage on a successful one." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d10 for each slot level above 1st."
    },
    "heroes' feast": {
        name: "Heroes' Feast",
        classes: ["cleric", "druid"],
        source: [["SRD", 154], ["P", 250]],
        level: 6,
        school: "Conj",
        time: "10 min",
        range: "30 ft",
        components: "V,S,M\u2020",
        compMaterial:
            "A gem-encrusted bowl worth at least 1,000 gp, which the spell consumes",
        duration: "Instantaneous",
        description:
            "Up to 12 crea; 1h to consume; for 24h: disease/poison immune, +2d10 max HP, see B (1000gp cons.)",
        descriptionFull:
            "You bring forth a great feast, including magnificent food and drink. The feast takes 1 hour to consume and disappears at the end of that time, and the beneficial effects don't set in until this hour is over. Up to twelve creatures can partake of the feast." +
            "\n   " +
            "A creature that partakes of the feast gains several benefits. The creature is cured of all diseases and poison, becomes immune to poison and being frightened, and makes all Wisdom saving throws with advantage. Its hit point maximum also increases by 2d10, and it gains the same number of hit points. These benefits last for 24 hours."
    },
    heroism: {
        name: "Heroism",
        classes: ["bard", "paladin"],
        source: [["SRD", 154], ["P", 250]],
        level: 1,
        school: "Ench",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "Conc, 1 min",
        description:
            "1+1/SL crea immune to fear, gain spellcasting ability modifier temp. HP start of each turn as spell lasts",
        descriptionFull:
            "A willing creature you touch is imbued with bravery. Until the spell ends, the creature is immune to being frightened and gains temporary hit points equal to your spellcasting ability modifier at the start of each of its turns. When the spell ends, the target loses any remaining temporary hit points from this spell." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st."
    },
    "hold monster": {
        name: "Hold Monster",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 154], ["P", 251]],
        level: 5,
        school: "Ench",
        time: "1 a",
        range: "90 ft",
        components: "V,S,M",
        compMaterial: "A small, straight piece of iron",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "1+1/SL crea (not undead), each max 30 ft apart, save or paralyzed; extra save at end of each turn",
        descriptionFull:
            "Choose a creature that you can see within range. The target must succeed on a Wisdom saving throw or be paralyzed for the duration. This spell has no effect on undead. At the end of each of its turns, the target can make another Wisdom saving throw. On a success, the spell ends on the target." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 6th level or higher, you can target on additional creature for each slot level above 5th. The creatures must be within 30 feet of each other when you target them."
    },
    "hold person": {
        name: "Hold Person",
        classes: ["bard", "cleric", "druid", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 154], ["P", 251]],
        level: 2,
        school: "Ench",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M",
        compMaterial: "A small, straight piece of iron",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "1+1/SL humanoids, within 30 ft of each other, save or paralyzed; extra save at end of each turn",
        descriptionFull:
            "Choose a humanoid that you can see within range. The target must succeed on a Wisdom saving throw or be paralyzed for the duration. At the end of each of its turns, the target can make another Wisdom saving throw. On a success, the spell ends on the target." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 3rd level or higher, you can target on additional humanoid for each slot level above 2nd. The humanoids must be within 30 feet of each other when you target them."
    },
    "holy aura": {
        name: "Holy Aura",
        classes: ["cleric"],
        source: [["SRD", 155], ["P", 251]],
        level: 8,
        school: "Abjur",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M\u0192",
        compMaterial:
            "A tiny reliquary worth at least 1,000 gp containing a sacred relic, such as a scrap of cloth from a saint's robe or a piece of parchment from a religious text",
        duration: "Conc, 1 min",
        save: "Con",
        description:
            "Any in area adv. on saves; dis. atks vs. targets; fiend/undead atk a target save or blinded (1000gp)",
        descriptionFull:
            "Divine light washes out from you and coalesces in a soft radiance in a 30-foot radius around you. Creatures of your choice in that radius when you cast this spell shed dim light in a 5-foot radius and have advantage on all saving throws, and other creatures have disadvantage on attack rolls against them until the spell ends. In addition, when a fiend or an undead hits an affected creature with a melee attack, the aura flashes with brilliant light. The attacker must succeed on a Constitution saving throw or be blinded until the spell ends."
    },
    "hunter's mark": {
        name: "Hunter's Mark",
        classes: ["ranger"],
        source: [["SRD", 155], ["P", 251]],
        level: 1,
        school: "Div",
        time: "1 bns",
        range: "90 ft",
        components: "V",
        duration: "Conc, 1 h",
        description:
            "1 crea +1d6 dmg from my weapon atks; adv. Wis (Perception/Survival) vs. target; SL3: 8h; SL5: 24h",
        descriptionFull:
            "You choose a creature you can see within range and mystically mark it as your quarry. Until the spell ends, you deal an extra 1d6 damage to the target whenever you hit it with a weapon attack, and you have advantage on any Wisdom (Perception) or Wisdom (Survival) check you make to find it. If the target drops to 0 hit points before this spell ends, you can use a bonus action on a subsequent turn of yours to mark a new creature." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 3rd or 4th level, you can maintain your concentration on the spell for up to 8 hours. When you use a spell slot of 5th level or higher, you can maintain your concentration on the spell for up to 24 hours."
    },
    "hypnotic pattern": {
        name: "Hypnotic Pattern",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 155], ["P", 252]],
        level: 3,
        school: "Illus",
        time: "1 a",
        range: "120 ft",
        components: "S,M",
        compMaterial:
            "A glowing stick o f incense or a crystal vial filled with phosphorescent material",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "30-ft cube all crea save or charmed, incapacitated, speed 0 for duration; ends if crea takes dmg",
        descriptionFull:
            "You create a twisting pattern of colors that weaves through the air inside a 30-foot cube within range. The pattern appears for a moment and vanishes. Each creature in the area who sees the pattern must make a Wisdom saving throw. On a failed save, the creature becomes charmed for the duration. While charmed by this spell, the creature is incapacitated and has a speed of 0." +
            "\n   " +
            "The spell ends for an affected creature if it takes any damage or if someone else uses an action to shake the creature out of its stupor."
    },
    "ice storm": {
        name: "Ice Storm",
        classes: ["druid", "sorcerer", "wizard"],
        source: [["SRD", 155], ["P", 252]],
        level: 4,
        school: "Evoc",
        time: "1 a",
        range: "300 ft",
        components: "V,S,M",
        compMaterial: "A pinch of dust and a few drops of water",
        duration: "Instantaneous",
        save: "Dex",
        description:
            "20-ft rad 40-ft high all crea 2d8+1d8/SL Bludg. dmg \u0026 4d6 Cold dmg; save half; 1 rnd difficult ter.",
        descriptionFull:
            "A hail of rock-hard ice pounds to the ground in a 20-foot-radius, 40-foot-high cylinder centered on a point within range. Each creature in the cylinder must make a Dexterity saving throw. A creature takes 2d8 bludgeoning damage and 4d6 cold damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            "Hailstones turn the storm's area of effect into difficult terrain until the end of your next turn." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 5th level or higher, the bludgeoning damage increases by 1d8 for each slot level above 4th."
    },
    identify: {
        name: "Identify",
        classes: ["bard", "wizard"],
        source: [["SRD", 155], ["P", 252]],
        ritual: true,
        level: 1,
        school: "Div",
        time: "1 min",
        range: "Touch",
        components: "V,S,M\u0192",
        compMaterial: "A pearl worth at least 100 gp and an owl feather",
        duration: "Instantaneous",
        description:
            "1 magical item or magic-imbued crea/obj; learn properties, how to use, and spells affecting it (100gp)",
        descriptionFull:
            "You choose one object that you must touch throughout the casting of the spell. If it is a magic item or some other magic-imbued object, you learn its properties and how to use them, whether it requires attunement to use, and how many charges it has, if any. You learn whether any spells are affecting the item and what they are. If the item was created by a spell, you learn which spell created it." +
            "\n   " +
            "If you instead touch a creature throughout the casting, you learn what spells, if any, are currently affecting it."
    },
    "illusory script": {
        name: "Illusory Script",
        classes: ["bard", "warlock", "wizard"],
        source: [["SRD", 156], ["P", 252]],
        ritual: true,
        level: 1,
        school: "Illus",
        time: "1 min",
        range: "Touch",
        components: "S,M\u2020",
        compMaterial:
            "A lead-based ink worth at least 10 gp, which the spell consumes",
        duration: "10 days",
        description:
            "Write a message that only I, designated crea, and any with truesight can understand (10gp cons.)",
        descriptionFull:
            "You write on parchment, paper, or some other suitable writing material and imbue it with a potent illusion that lasts for the duration." +
            "\n   " +
            "To you and any creatures you designate when you cast the spell, the writing appears normal, written in your hand, and conveys whatever meaning you intended when you wrote the text. To all others, the writing appears as if it were written in an unknown or magical script that is unintelligible. Alternatively, you can cause the writing to appear to be an entirely different message, written in a different hand and language, though the language must be one you know." +
            "\n   " +
            "Should the spell be dispelled, the original script and the illusion both disappear." +
            "\n   " +
            "A creature with truesight can read the hidden message."
    },
    imprisonment: {
        name: "Imprisonment",
        classes: ["warlock", "wizard"],
        source: [["SRD", 156], ["P", 252]],
        level: 9,
        school: "Abjur",
        time: "1 min",
        range: "30 ft",
        components: "V,S,M\u2020",
        compMaterial:
            "A vellum depiction or a carved statuette in the likeness of the target, and a special component that varies according to the version of the spell you choose, worth at least 500 gp per Hit Die of the target",
        duration: "Till dispelled",
        save: "Wis",
        description:
            "1 crea save or trapped in chosen way with no means of escape; see book (500gp/HD cons.)",
        descriptionFull:
            "You create a magical restraint to hold a creature that you can see within range. The target must succeed on a Wisdom saving throw or be bound by the spell, if it succeeds, it is immune to this spell if you cast it again. While affected by this spell, the creature doesn't need to breathe, eat, or drink, and it doesn't age. Divination spells can't locate or perceive the target." +
            "\n   " +
            "When you cast the spell, you choose one of the following forms of imprisonment." +
            "\n   " +
            toUni("Burial") +
            ": The target is entombed far beneath the earth in a sphere of magical force that is just large enough to contain the target. Nothing can pass through the sphere, nor can any creature teleport or use planar travel to get into or out of it." +
            "\n   " +
            "The special component for this version of the spell is a small mithral orb." +
            "\n   " +
            toUni("Chaining") +
            ": Heavy chains, firmly rooted in the ground, hold the target in place. The target is restrained until the spell ends, and it can't move or be moved by any means until then." +
            "\n   " +
            "The special component for this version of the spell is a fine chain of precious metal." +
            "\n   " +
            toUni("Hedged Prison") +
            ": The spell transports the target into a tiny demiplane that is warded against teleportation and planar travel. The demiplane can be a labyrinth, a cage, a tower, or any similar confined structure or area of your choice." +
            "\n   " +
            "The special component for this version of the spell is a miniature representation of the prison made from jade." +
            "\n   " +
            toUni("Minimus Containment") +
            ": The target shrinks to a height of 1 inch and is imprisoned inside a gemstone or similar object. Light can pass through the gemstone normally (allowing the target to see out and other creatures to see in), but nothing else can pass through, even by means of teleportation or planar travel. The gemstone can't be cut or broken while the spell remains in effect." +
            "\n   " +
            "The special component for this version of the spell is a large, transparent gemstone, such as a corundum, diamond, or ruby." +
            "\n   " +
            toUni("Slumber") +
            ": The target falls asleep and can't be awoken." +
            "\n   " +
            "The special component for this version of the spell consists of rare soporific herbs." +
            "\n   " +
            toUni("Ending the Spell") +
            ": During the casting of the spell, in any of its versions, you can specify a condition that will cause the spell to end and release the target. The condition can be as specific or as elaborate as you choose, but the DM must agree that the condition is reasonable and has a likelihood of coming to pass. The conditions can be based on a creature's name, identity, or deity but otherwise must be based on observable actions or qualities and not based on intangibles such as level, class, or hit points." +
            "\n   " +
            "A dispel magic spell can end the spell only if it is cast as a 9th-level spell, targeting either the prison or the special component used to create it." +
            "\n   " +
            "You can use a particular special component to create only one prison at a time. If you cast the spell again using the same component, the target of the first casting is immediately freed from its binding."
    },
    "incendiary cloud": {
        name: "Incendiary Cloud",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 157], ["P", 253]],
        level: 8,
        school: "Conj",
        time: "1 a",
        range: "150 ft",
        components: "V,S",
        duration: "Conc, 1 min",
        save: "Dex",
        description:
            "20-ft rad all 10d8 Fire damage; save halves; heavily obscures; move 10 ft/rnd in chosen direction",
        descriptionFull:
            "A swirling cloud of smoke shot through with white-hot embers appears in a 20-foot-radius sphere centered on a point within range. The cloud spreads around corners and is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it." +
            "\n   " +
            "When the cloud appears, each creature in it must make a Dexterity saving throw. A creature takes 10d8 fire damage on a failed save, or half as much damage on a successful one. A creature must also make this saving throw when it enters the spell's area for the first time on a turn or ends its turn there." +
            "\n   " +
            "The cloud moves 10 feet directly away from you in a direction that you choose at the start of each of your turns."
    },
    "inflict wounds": {
        name: "Inflict Wounds",
        classes: ["cleric"],
        source: [["SRD", 157], ["P", 253]],
        level: 1,
        school: "Necro",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "Instantaneous",
        description: "Spell attack for 3d10+1d10/SL Necrotic dmg",
        descriptionFull:
            "Make a melee spell attack against a creature you can reach. On a hit, the target takes 3d10 necrotic damage." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d10 for each slot level above 1st."
    },
    "insect plague": {
        name: "Insect Plague",
        classes: ["cleric", "druid", "sorcerer"],
        source: [["SRD", 157], ["P", 254]],
        level: 5,
        school: "Conj",
        time: "1 a",
        range: "300 ft",
        components: "V,S,M",
        compMaterial:
            "A few grains of sugar, some kernels of grain, and a smear of fat",
        duration: "Conc, 10 min",
        save: "Con",
        description:
            "20-ft rad all 4d10+1d10/SL Piercing dmg; save halves; ignores cover; lightly obscures; difficult ter.",
        descriptionFull:
            "Swarming, biting locusts fill a 20-foot-radius sphere centered on a point you choose within range. The sphere spreads around corners. The sphere remains for the duration, and its area is lightly obscured. The sphere's area is difficult terrain." +
            "\n   " +
            "When the area appears, each creature in it must make a Constitution saving throw. A creature takes 4d10 piercing damage on a failed save, or half as much damage on a successful one. A creature must also make this saving throw when it enters the spell's area for the first time on a turn or ends its turn there." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d10 for each slot level above 5th."
    },
    invisibility: {
        name: "Invisibility",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 157], ["P", 254]],
        level: 2,
        school: "Illus",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "An eyelash encased in gum arabic",
        duration: "Conc, 1 h",
        description:
            "1+1/SL crea invisible; attacking/casting makes the crea visible; anything worn/carried also invisible",
        descriptionFull:
            "A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target's person. The spell ends for a target that attacks or casts a spell." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd."
    },
    jump: {
        name: "Jump",
        classes: ["druid", "ranger", "sorcerer", "wizard"],
        source: [["SRD", 158], ["P", 254]],
        level: 1,
        school: "Trans",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "A grasshopper's hind leg",
        duration: "1 min",
        description: "1 creature's jump distance is tripled for the duration",
        descriptionFull:
            "You touch a creature. The creature's jump distance is tripled until the spell ends."
    },
    knock: {
        name: "Knock",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 158], ["P", 254]],
        level: 2,
        school: "Trans",
        time: "1 a",
        range: "60 ft",
        components: "V",
        duration: "Instantaneous",
        description:
            "1 object is unlocked (1 lock), unstuck, unbarred, arcane lock suppressed for 10 min; audible for 300 ft",
        descriptionFull:
            "Choose an object that you can see within range. The object can be a door, a box, a chest, a set of manacles, a padlock, or another object that contains a mundane or magical means that prevents access." +
            "\n   " +
            "A target that is held shut by a mundane lock or that is stuck or barred becomes unlocked, unstuck, or unbarred. If the object has multiple locks, only one of them is unlocked." +
            "\n   " +
            "If you choose a target that is held shut with arcane lock, that spell is suppressed for 10 minutes, during which time the target can be opened and shut normally." +
            "\n   " +
            "When you cast the spell, a loud knock, audible from as far away as 300 feet, emanates from the target object."
    },
    "legend lore": {
        name: "Legend Lore",
        classes: ["bard", "cleric", "wizard"],
        source: [["SRD", 158], ["P", 254]],
        level: 5,
        school: "Div",
        time: "10 min",
        range: "Self",
        components: "V,S,M\u2020",
        compMaterial:
            "Incense worth at least 250 gp, which the spell consumes, and four ivory strips worth at least 50 gp each",
        duration: "Instantaneous",
        description:
            "Learn summary of lore of named or described person, place, or object (200gp; 250gp cons.)",
        descriptionFull:
            "Name or describe a person, place, or object. The spell brings to your mind a brief summary of the significant lore about the thing you named. The lore might consist of current tales, forgotten stories, or even secret lore that has never been widely known. If the thing you named isn't of legendary importance, you gain no information." +
            "\n   " +
            "The more information you already have about the thing, the more precise and detailed the information you receive is. The information you learn is accurate but might be couched in figurative language. For example, if you have a mysterious magic axe on hand, the spell might yield this information - Woe to the evildoer whose hand touches the axe, for even the haft slices the hand of the evil ones. Only a true Child of Stone, lover and beloved of Moradin, may awaken the true powers of the axe, and only with the sacred word Rudnogg on the lips."
    },
    "leomund's secret chest": {
        name: "Leomund's Secret Chest",
        nameAlt: "Secret Chest",
        classes: ["wizard"],
        source: [["SRD", 177], ["P", 254]],
        level: 4,
        school: "Conj",
        time: "1 a",
        range: "Touch",
        components: "V,S,M\u0192",
        compMaterial:
            "An exquisite chest, 3 feet by 2 feet by 2 feet, constructed from rare materials worth at least 5,000 gp, and a Tiny replica made from the same materials worth at least 50 gp",
        duration: "Instantaneous",
        description:
            "Hide chest with content in Ethereal Plane for 60 days, after that chance of loss; 1 a reappear (5050gp)",
        descriptionFull:
            "You hide a chest, and all its contents, on the Ethereal Plane. You must touch the chest and the miniature replica that serves as a material component for the spell. The chest can contain up to 12 cubic feet of nonliving material (3 feet by 2 feet by 2 feet)." +
            "\n   " +
            "While the chest remains on the Ethereal Plane, you can use an action and touch the replica to recall the chest. It appears in an unoccupied space on the ground within 5 feet of you. You can send the chest back to the Ethereal Plane by using an action and touching both the chest and the replica." +
            "\n   " +
            "After 60 days, there is a cumulative 5 percent chance per day that the spell's effect ends. This effect ends if you cast this spell again, if the smaller replica chest is destroyed, or if you choose to end the spell as an action. If the spell ends and the larger chest is on the Ethereal Plane, it is irretrievably lost."
    },
    "leomund's tiny hut": {
        name: "Leomund's Tiny Hut",
        nameAlt: "Tiny Hut",
        classes: ["bard", "wizard"],
        source: [["SRD", 187], ["P", 255]],
        ritual: true,
        level: 3,
        school: "Evoc",
        time: "1 min",
        range: "10-ft rad",
        components: "V,S,M",
        compMaterial: "A small crystal bead",
        duration: "8 h",
        description:
            "10-ft rad immobile dome of force holds 9 Medium crea; blocks magic; ends if I leave; see book",
        descriptionFull:
            "A 10-foot-radius immobile dome of force springs into existence around and above you and remains stationary for the duration. The spell ends if you leave its area." +
            "\n   " +
            "Nine creatures of Medium size or smaller can fit inside the dome with you. The spell fails if its area includes a larger creature or more than nine creatures. Creatures and objects within the dome when you cast this spell can move through it freely. All other creatures and objects are barred from passing through it. Spells and other magical effects can't extend through the dome or be cast through it. The atmosphere inside the space is comfortable and dry, regardless of the weather outside." +
            "\n   " +
            "Until the spell ends, you can command the interior to become dimly lit or dark. The dome is opaque from the outside, of any color you choose, but it is transparent from the inside."
    },
    "lesser restoration": {
        name: "Lesser Restoration",
        classes: ["bard", "cleric", "druid", "paladin", "ranger"],
        source: [["SRD", 158], ["P", 255]],
        level: 2,
        school: "Abjur",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "1 crea cured of 1 disease, or 1 condition: blinded, deafened, paralyzed, or poisoned",
        descriptionFull:
            "You touch a creature and can end either one disease or one condition afflicting it. The condition can be blinded, deafened, paralyzed, or poisoned."
    },
    levitate: {
        name: "Levitate",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 158], ["P", 255]],
        level: 2,
        school: "Trans",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M",
        compMaterial:
            "Either a small leather loop or a piece of golden wire bent into a cup shape with a long shank on one end",
        duration: "Conc, 10 min",
        save: "Con",
        description:
            "1 crea/obj up to 500 lb save or rise vertically, up to 20 ft; 1 a (move a if self) move up/down 20 ft",
        descriptionFull:
            "One creature or loose object of your choice that you can see within range rises vertically, up to 20 feet, and remains suspended there for the duration. The spell can levitate a target that weighs up to 500 pounds. An unwilling creature that succeeds on a Constitution saving throw is unaffected." +
            "\n   " +
            "The target can move only by pushing or pulling against a fixed object or surface within reach (such as a wall or a ceiling), which allows it to move as if it were climbing. You can change the target's altitude by up to 20 feet in either direction on your turn. If you are the target, you can move up or down as part of your move. Otherwise, you can use your action to move the target, which must remain within the spell's range." +
            "\n   " +
            "When the spell ends, the target floats gently to the ground if it is still aloft."
    },
    light: {
        name: "Light",
        classes: ["bard", "cleric", "sorcerer", "wizard"],
        source: [["SRD", 159], ["P", 255]],
        level: 0,
        school: "Evoc",
        time: "1 a",
        range: "Touch",
        components: "V,M",
        compMaterial: "A firefly or phosphorescent moss",
        duration: "1 h (D)",
        description:
            "1 obj up to 10-ft cube sheds bright light 20-ft rad and dim light 20-ft; cannot have multiple instances",
        descriptionFull:
            "You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The spell ends if you cast it again or dismiss it as an action." +
            "\n   " +
            "If you target an object held or worn by a hostile creature, that creature must succeed on a Dexterity saving throw to avoid the spell."
    },
    "lightning bolt": {
        name: "Lightning Bolt",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 159], ["P", 255]],
        level: 3,
        school: "Evoc",
        time: "1 a",
        range: "100-ft line",
        components: "V,S,M",
        compMaterial: "A bit of fur and a rod of amber, crystal, or glass",
        duration: "Instantaneous",
        save: "Dex",
        description:
            "100-ft long 5-ft wide all 8d6+1d6/SL Lightn. dmg; save halves; unattended flammable obj ignite",
        descriptionFull:
            "A stroke of lightning forming a line of 100 feet long and 5 feet wide blasts out from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. A creature takes 8d6 lightning damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            "The lightning ignites flammable objects in the area that aren't being worn or carried." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot above 3rd."
    },
    "locate animals or plants": {
        name: "Locate Animals or Plants",
        nameShort: "Locate Animal/Plants",
        classes: ["bard", "druid", "ranger"],
        source: [["SRD", 159], ["P", 256]],
        ritual: true,
        level: 2,
        school: "Div",
        time: "1 a",
        range: "Self",
        components: "V,S,M",
        compMaterial: "A bit of fur from a bloodhound",
        duration: "Instantaneous",
        description:
            "Learn direction and distance to closest named or described kind of beast or plant within 5 miles",
        descriptionFull:
            "Describe or name a specific kind of beast or plant. Concentrating on the voice of nature in your surroundings, you learn the direction and distance to the closest creature or plant of that kind within 5 miles, if any are present."
    },
    "locate creature": {
        name: "Locate Creature",
        classes: ["bard", "cleric", "druid", "paladin", "ranger", "wizard"],
        source: [["SRD", 159], ["P", 256]],
        level: 4,
        school: "Div",
        time: "1 a",
        range: "Self",
        components: "V,S,M",
        compMaterial: "A bit of fur from a bloodhound",
        duration: "Conc, 1 h",
        description:
            "Learn direction to closest named or described kind or specific creature within 1000 ft; see book",
        descriptionFull:
            "Describe or name a creature that is familiar to you. You sense the direction to the creature's location, as long as that creature is within 1,000 feet of you. If the creature is moving, you know the direction of its movement." +
            "\n   " +
            "The spell can locate a specific creature known to you, or the nearest creature of a specific kind (such as a human or a unicorn), so long as you have seen such a creature up close - within 30 feet - at least once. If the creature you described or named is in a different form, such as being under the effects of a polymorph spell, this spell doesn't locate the creature." +
            "\n   " +
            "This spell can't locate a creature if running water at least 10 feet wide blocks a direct path between you and the creature."
    },
    "locate object": {
        name: "Locate Object",
        classes: ["bard", "cleric", "druid", "paladin", "ranger", "wizard"],
        source: [["SRD", 159], ["P", 256]],
        level: 2,
        school: "Div",
        time: "1 a",
        range: "Self",
        components: "V,S,M",
        compMaterial: "A forked twig",
        duration: "Conc, 10 min",
        description:
            "Learn direction to closest named or described kind or specific object within 1000 ft; see book",
        descriptionFull:
            "Describe or name an object that is familiar to you. You sense the direction to the object's location, as long as that object is within 1,000 feet of you. If the object is in motion, you know the direction of its movement." +
            "\n   " +
            "The spell can locate a specific object known to you, as long as you have seen it up close - within 30 feet - at least once. Alternatively, the spell can locate the nearest object of a particular kind, such as a certain kind of apparel, jewelry, furniture, tool, or weapon." +
            "\n   " +
            "This spell can't locate an object if any thickness of lead, even a thin sheet, blocks a direct path between you and the object."
    },
    longstrider: {
        name: "Longstrider",
        classes: ["bard", "druid", "ranger", "wizard"],
        source: [["SRD", 160], ["P", 256]],
        level: 1,
        school: "Trans",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "A pinch of dirt",
        duration: "1 h",
        description:
            "1+1/SL creature's speed increases by 10 ft for the duration",
        descriptionFull:
            "You touch a creature. The target's speed increases by 10 feet until the spell ends." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st."
    },
    "mage armor": {
        name: "Mage Armor",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 160], ["P", 256]],
        level: 1,
        school: "Abjur",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "A piece of cured leather",
        duration: "8 h (D)",
        description:
            "1 crea that isn't wearing armor has AC 13 + Dex modifier for the duration; spell ends if it dons armor",
        descriptionFull:
            "You touch a willing creature who isn't wearing armor, and a protective magical force surrounds it until the spell ends. The target's base AC becomes 13 + its Dexterity modifier. The spell ends it if the target dons armor or if you dismiss the spell as an action."
    },
    "mage hand": {
        name: "Mage Hand",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 160], ["P", 256]],
        level: 0,
        school: "Conj",
        time: "1 a",
        range: "30 ft",
        components: "V,S",
        duration: "1 min (D)",
        description:
            "Create spectral hand for simple tasks or carry up to 10 lb; 1 a to control; can't have multiple instances",
        descriptionFull:
            "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again." +
            "\n   " +
            "You can use your action to control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it." +
            "\n   " +
            "The hand can't attack, activate magical items, or carry more than 10 pounds."
    },
    "magic circle": {
        name: "Magic Circle",
        classes: ["cleric", "paladin", "warlock", "wizard"],
        source: [["SRD", 160], ["P", 256]],
        level: 3,
        school: "Abjur",
        time: "1 min",
        range: "10 ft",
        components: "V,S,M\u2020",
        compMaterial:
            "Holy water or powdered silver and iron worth at least 100 gp, which the spell consumes",
        duration: "1 h",
        description:
            "Celes., elem., fey, fiends, or undead can't enter/leave; dis. on atk; +1h/SL dura.; see B (100gp cons.)",
        descriptionFull:
            "You create a 10-foot-radius, 20-foot-tall cylinder of magical energy centered on a point on the ground that you can see within range. Glowing runes appear wherever the cylinder intersects with the floor or other surface." +
            "\n   " +
            "Choose one or more of the following types of creatures - celestials, elementals, fey, fiends, or undead. The circle affects a creature of the chosen type in the following ways." +
            "\n " +
            "\u2022 The creature can't willingly enter the cylinder by nonmagical means. If the creature tries to use teleportation or interplanar travel to do so, it must first succeed on a Charisma saving throw." +
            "\n " +
            "\u2022 The creature has disadvantage on attack rolls against targets within the cylinder." +
            "\n " +
            "\u2022 Targets within the cylinder can't be charmed, frightened, or possessed by the creature." +
            "\n\n" +
            "When you cast this spell, you can elect to cause its magic to operate in the reverse direction, preventing a creature of the specified type from leaving the cylinder and protecting targets outside it." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 4th level or higher, the duration increases by 1 hour for each slot level above 3rd."
    },
    "magic jar": {
        name: "Magic Jar",
        classes: ["wizard"],
        source: [["SRD", 160], ["P", 257]],
        level: 6,
        school: "Necro",
        time: "1 min",
        range: "Self",
        components: "V,S,M\u0192",
        compMaterial:
            "A gem, crystal, reliquary, or some other ornamental container worth at least 500 gp",
        duration: "Till dispelled",
        description:
            "Transport my soul into container from which I can attempt to possess humanoids; see B (500gp)",
        descriptionFull:
            "Your body falls into a catatonic state as your soul leaves it and enters the container you used for the spell's material component. While your soul inhabits the container, you are aware of your surroundings as if you were in the container's space. You can't move or use reactions. The only action you can take is to project your soul up to 100 feet out of the container, either returning to your living body (and ending the spell) or attempting to possess a humanoids body." +
            "\n   " +
            "You can attempt to possess any humanoid within 100 feet of you that you can see (creatures warded by a protection from evil and good or magic circle spells can't be possessed). The target must make a Charisma saving throw. On a failure, your soul moves into the target's body, and the target's soul becomes trapped in the container. On a success, the target resists your efforts to possess it, and you can't attempt to possess it again for 24 hours." +
            "\n   " +
            "Once you possess a creature's body, you control it. Your game statistics are replaced by the statistics of the creature though you retain your alignment and your Intelligence, Wisdom, and Charisma scores. You retain the benefit of your own class feature. If the target has any class levels, you can't use any of its class features." +
            "\n   " +
            "Meanwhile, the possessed creature's soul can perceive from the container using its own senses, but it can't move or take actions at all." +
            "\n   " +
            "While possessing a body, you can use your action to return from the host body to the container if it is within 100 feet of you, returning the host creature's soul to its body. If the host body dies while you're in it, the creature dies, and you must make a Charisma saving throw against your own spellcasting DC. On a success, you return to the container if it is within 100 feet of you. Otherwise, you die." +
            "\n   " +
            "If the container is destroyed or the spell ends, your soul immediately returns to your body. If your body is more than 100 feet away from you, or if your body is dead when you attempt to return to it, you die. If another creature's soul is in the container when it is destroyed, the creature's soul returns to its body if the body is alive and within 100 feet. Otherwise, that creature dies." +
            "\n   " +
            "When the spell ends, the container is destroyed."
    },
    "magic missile": {
        name: "Magic Missile",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 161], ["P", 257]],
        level: 1,
        school: "Evoc",
        time: "1 a",
        range: "120 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "3+1/SL darts hit creature(s) I can see for 1d4+1 Force dmg per dart",
        descriptionFull:
            "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4+1 force damage to its target. The darts all strike simultaneously and you can direct them to hit one creature or several." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, the spell creates one more dart for each slot above 1st."
    },
    "magic mouth": {
        name: "Magic Mouth",
        classes: ["bard", "wizard"],
        source: [["SRD", 161], ["P", 257]],
        ritual: true,
        level: 2,
        school: "Illus",
        time: "1 min",
        range: "30 ft",
        components: "V,S,M\u2020",
        compMaterial:
            "A small bit of honeycomb and jade dust worth at least 10 gp, which the spell consumes",
        duration: "Till dispelled",
        description:
            "Implant a 25 word message in an object that is uttered on chosen trigger condition (10gp cons.)",
        descriptionFull:
            "You implant a message within an object in range, a message that is uttered when a trigger condition is met. Choose an object that you can see and that isn't being worn or carried by another creature. Then speak the message, which must be 25 words or less, though it can be delivered over as long as 10 minutes. Finally, determine the circumstance that will trigger the spell to deliver your message." +
            "\n   " +
            "When that circumstance occurs, a magical mouth appears on the object and recites the message in your voice and at the same volume you spoke. If the object you chose has a mouth or something that looks like a mouth (for example, the mouth of a statue), the magical mouth appears there so that words appear to come from the object's mouth. When you cast this spell, you can have the spell end after it delivers its message, or it can remain and repeats its message whenever the trigger occurs." +
            "\n   " +
            "The triggering circumstance can be as general or as detailed as you like, though it must be based on visual or audible conditions that occur within 30 feet of the object. For example, you could instruct the mouth to speak when any creature moves within 30 feet of the object or when a silver bell rings within 30 feet of it."
    },
    "magic weapon": {
        name: "Magic Weapon",
        classes: ["paladin", "wizard"],
        source: [["SRD", 161], ["P", 257]],
        level: 2,
        school: "Trans",
        time: "1 bns",
        range: "Touch",
        components: "V,S",
        duration: "Conc, 1 h",
        description:
            "1 nonmagical weapon becomes magical with +1 bonus to attack and damage; SL4: +2, SL6: +3",
        descriptionFull:
            "You touch a nonmagical weapon. Until the spell ends, that weapon becomes a magic weapon with a +1 bonus to attack rolls and damage rolls." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 4th level or higher, the bonus increases to +2. When you use a spell slot of 6th level or higher, the bonus increases to +3."
    },
    "major image": {
        name: "Major Image",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 162], ["P", 258]],
        level: 3,
        school: "Illus",
        time: "1 a",
        range: "120 ft",
        components: "V,S,M",
        compMaterial: "A bit of fleece",
        duration: "Conc, 10 min",
        description:
            "20-ft cube illusion includes visible, audible, olfactory, temperature; 1 a move it; SL6: no conc.; see B",
        descriptionFull:
            "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 20-foot cube. The image appears at a spot that you can see within range and lasts for the duration. It seems completely real, including sounds, smells, and temperature appropriate to the thing depicted. You can't create sufficient heat or cold to cause damage, a sound loud enough to deal thunder damage or deafen a creature, or a smell that might sicken a creature (like a troglodyte's stench)." +
            "\n   " +
            "As long as you are within range of the illusion, you can use your action to cause the image to move to any other spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking. Similarly, you can cause the illusion to make different sounds at different times, even making it carry on a conversation, for example." +
            "\n   " +
            "Physical interaction with the image reveals it to be an illusion, because things can pass through it. A creature that uses its action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and its other sensory qualities become faint to the creature." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 6th level or higher, the spell lasts until dispelled, without requiring your concentration."
    },
    "mass cure wounds": {
        name: "Mass Cure Wounds",
        classes: ["bard", "cleric", "druid"],
        source: [["SRD", 162], ["P", 258]],
        level: 5,
        school: "Evoc", // errata from conjuration
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "6 living creatures within 30-ft rad heal 3d8+1d8/SL+spellcasting ability modifier HP",
        descriptionFull:
            "A wave of healing energy washes out from a point of your choice within range. Choose up to six creatures in a 30-foot-radius sphere centered on that point. Each target regains hit points equal to 3d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 6th level or higher, the healing increases by 1d8 for each slot level above 5th."
    },
    "mass heal": {
        name: "Mass Heal",
        classes: ["cleric"],
        source: [["SRD", 163], ["P", 258]],
        level: 9,
        school: "Evoc", // errata from conjuration
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "Split 700 HP of healing over creatures in range; also cured of blindness, deafness, and all diseases",
        descriptionFull:
            "A flood of healing energy flows from you into injured creatures around you. You restore up to 700 hit points, divided as you choose among any number of creatures that you can see within range. Creatures healed by this spell are also cured of all diseases and any effect making them blinded or deafened. This spell has no effect on undead or constructs."
    },
    "mass healing word": {
        name: "Mass Healing Word",
        classes: ["cleric"],
        source: [["SRD", 163], ["P", 258]],
        level: 3,
        school: "Evoc",
        time: "1 bns",
        range: "60 ft",
        components: "V",
        duration: "Instantaneous",
        description:
            "6 living creatures heal 1d4+1d4/SL+spellcasting ability modifier HP",
        descriptionFull:
            "As you call out words of restoration, up to six creatures of your choice that you can see within range regain hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 4th level or higher, the healing increases by 1d4 for each slot level above 3rd."
    },
    "mass suggestion": {
        name: "Mass Suggestion",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 163], ["P", 258]],
        level: 6,
        school: "Ench",
        time: "1 a",
        range: "60 ft",
        components: "V,M",
        compMaterial:
            "A snake's tongue and either a bit of honeycomb or a drop of sweet oil",
        duration: "24 h",
        save: "Wis",
        description:
            "12 crea save or follow stated course of action; SL7: 10 day; SL8: 30 days; SL9: 366 days; see book",
        descriptionFull:
            "You suggest a course of activity (limited to a sentence or two) and magically influence up to twelve creatures of your choice that you can see within range and that can hear and understand you. Creatures that can't be charmed are immune to this effect. The suggestion must be worded in such a manner as to make the course of action sound reasonable. Asking the creature to stab itself, throw itself onto a spear, immolate itself, or do some other obviously harmful act automatically negates the effect of the spell." +
            "\n   " +
            "Each target must make a Wisdom saving throw. On a failed save, it pursues the course of action you described to the best of its ability. The suggested course of action can continue for the entire duration. If the suggested activity can be completed in a shorter time, the spell ends when the subject finishes what it was asked to do." +
            "\n   " +
            "You can also specify conditions that will trigger a special activity during the duration. For example, you might suggest that a group of soldiers give all their money to the first beggar they meet. If the condition isn't met before the spell ends, the activity isn't performed." +
            "\n   " +
            "If you or any of your companions damage a creature affected by this spell, the spell ends for that creature." +
            AtHigherLevels +
            "When you cast this spell using a 7th-level spell slot, the duration is 10 days. When you use an 8th-level spell slot, the duration is 30 days. When you use a 9th-level spell slot, the duration is a year and a day."
    },
    maze: {
        name: "Maze",
        classes: ["wizard"],
        source: [["SRD", 163], ["P", 258]],
        level: 8,
        school: "Conj",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Conc, 10 min",
        save: "Int",
        description:
            "1 crea banished to labyrinthine demiplane; DC 20 Int check each rnd to escape; appears in same spot",
        descriptionFull:
            "You banish a creature that you can see within range into a labyrinthine demiplane. The target remains there for the duration or until it escapes the maze." +
            "\n   " +
            "The target can use its action to attempt to escape. When it does so, it makes a DC 20 Intelligence check. If it succeeds, it escapes, and the spell ends (a minotaur or goristro demon automatically succeeds)." +
            "\n   " +
            "When the spell ends, the target reappears in the space it left or, if that space is occupied, in the nearest unoccupied space."
    },
    "meld into stone": {
        name: "Meld into Stone",
        classes: ["cleric", "druid"],
        source: [["SRD", 163], ["P", 259]],
        ritual: true,
        level: 3,
        school: "Trans",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "8 h",
        description:
            "I merge into a stone object large enough to contain me; can't see through the stone; see book",
        descriptionFull:
            "You step into a stone object or surface large enough to fully contain your body, melding yourself and all the equipment you carry with the stone for the duration. Using your movement, you step into the stone at a point you can touch. Nothing of your presence remains visible or otherwise detectable by nonmagical senses." +
            "\n   " +
            "While merged with the stone, you can't see what occurs outside it, and any Wisdom (Perception) checks you make to hear sounds outside it are made with disadvantage. You remain aware of the passage of time and can cast spells on yourself while merged in the stone. You can use your movement to leave the stone where you entered it, which ends the spell. You otherwise can't move." +
            "\n   " +
            "Minor physical damage to the stone doesn't harm you, but its partial destruction or a change in its shape (to the extent that you no longer fit within it) expels you and deals 6d6 bludgeoning damage to you. The stone's complete destruction (or transmutation into a different substance) expels you and deals 50 bludgeoning damage to you. If expelled, you fall prone in an unoccupied space closest to where you first entered."
    },
    "melf's acid arrow": {
        name: "Melf's Acid Arrow",
        nameAlt: "Acid Arrow",
        classes: ["wizard"],
        source: [["SRD", 114], ["P", 259]],
        level: 2,
        school: "Evoc",
        time: "1 a",
        range: "90 ft",
        components: "V,S,M",
        compMaterial: "Powdered rhubarb leaf and an adder's stomach",
        duration: "Instantaneous",
        description:
            "Spell attack for 4d4+1d4/SL Acid dmg and 2d4+1d4/SL next turn; on miss half dmg no next turn",
        descriptionFull:
            "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd."
    },
    mending: {
        name: "Mending",
        classes: ["bard", "cleric", "druid", "sorcerer", "wizard"],
        source: [["SRD", 164], ["P", 259]],
        level: 0,
        school: "Trans",
        time: "1 min",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "Two lodestones",
        duration: "Instantaneous",
        description:
            "Repair a single broken object no larger than 1 cu ft; can't restore magic to broken magic item",
        descriptionFull:
            "This spell repairs a single break or tear in an object you touch, such as broken chain link, two halves of a broken key, a torn clack, or a leaking wineskin. As long as the break or tear is no larger than 1 foot in any dimension, you mend it, leaving no trace of the former damage." +
            "\n   " +
            "This spell can physically repair a magic item or construct, but the spell can't restore magic to such an object."
    },
    message: {
        name: "Message",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 164], ["P", 259]],
        level: 0,
        school: "Trans",
        time: "1 a",
        range: "120 ft",
        components: "V,S,M",
        compMaterial: "A short piece of copper wire",
        duration: "1 rnd",
        description:
            "1 crea I point to hears whispered message and can reply with a whisper; nobody can overhear",
        descriptionFull:
            "You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear." +
            "\n   " +
            "You can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier. Magical silence, 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood blocks the spell. The spell doesn't have to follow a straight line and can travel freely around corners or through openings."
    },
    "meteor swarm": {
        name: "Meteor Swarm",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 164], ["P", 259]],
        level: 9,
        school: "Evoc",
        time: "1 a",
        range: "1 mile",
        components: "V,S",
        duration: "Instantaneous",
        save: "Dex",
        description:
            "4\u00D7 40-ft rad all 20d6 Bludgeoning dmg and 20d6 Fire dmg; save halves; areas do not stack",
        descriptionFull:
            "Blazing orbs of fire plummet to the ground at four different points you can see within range. Each creature in a 40-foot-radius sphere centered on each point you choose must make a Dexterity saving throw. The sphere spreads around corners. A creature takes 20d6 fire damage and 20d6 bludgeoning damage on a failed save, or half as much damage on a successful one. A creature in the area of more than one fiery burst is affected only once." +
            "\n   " +
            "The spell damages objects in the area and ignites flammable objects that aren't being worn or carried."
    },
    "mind blank": {
        name: "Mind Blank",
        classes: ["bard", "wizard"],
        source: [["SRD", 164], ["P", 259]],
        level: 8,
        school: "Abjur",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "24 h",
        description:
            "1 crea immune to charms, psychic damage, divination, mind reading, and any mind altering effects",
        descriptionFull:
            "Until the spell ends, one willing creature you touch is immune to psychic damage, any effect that would sense its emotions or read its thoughts, divination spells, and the charmed condition. The spell even foils wish spells and spells or effects of similar power used to affect the target's mind or to gain information about the target."
    },
    "minor illusion": {
        name: "Minor Illusion",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 164], ["P", 260]],
        level: 0,
        school: "Illus",
        time: "1 a",
        range: "30 ft",
        components: "S,M",
        compMaterial: "A bit of fleece",
        duration: "1 min (D)",
        description:
            "5-ft cube illusion includes visible or audible; Int(Investigation) check vs. Spell DC; see book",
        descriptionFull:
            "You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again." +
            "\n   " +
            "If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a lion's roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends." +
            "\n   " +
            "If you create an image of an object - such as a chair, muddy footprints, or a small chest - it must be no larger than a 5-foot cube. The image can't create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, because things can pass through it." +
            "\n   " +
            "If a creature uses its action to examine the sound or image, the creature can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the illusion becomes faint to the creature."
    },
    "mirage arcane": {
        name: "Mirage Arcane",
        classes: ["bard", "druid", "wizard"],
        source: [["SRD", 165], ["P", 260]],
        level: 7,
        school: "Illus",
        time: "10 min",
        range: "Sight",
        components: "V,S",
        duration: "10 days",
        description:
            "1 sq mile alter terrain illusion includes visible, audible, olfactory, tactile; can make difficult ter.; see B",
        descriptionMetric:
            "260 ha alter terrain illusion includes visible, audible, olfactory, tactile; can make difficult ter.; see B",
        descriptionFull:
            "You make terrain in an area up to 1 mile square look, sound, smell, and even feel like some other sort of terrain. The terrain's general shape remains the same, however. Open fields or a road could be made to resemble a swamp, hill, crevasse, or some other difficult or impassable terrain. A pond can be made to seem like a grassy meadow, a precipice like a gentle slope, or a rock-strewn gully like a wide and smooth road." +
            "\n   " +
            "Similarly, you can alter the appearance of structures, or add them where none are present. The spell doesn't disguise, conceal, or add creatures." +
            "\n   " +
            "The illusion includes audible, visual, tactile, and olfactory elements, so it can turn clear ground into difficult terrain (or vice versa) or otherwise impede movement through the area. Any piece of the illusory terrain (such as a rock or stick) that is removed from the spell's area disappears immediately." +
            "\n   " +
            "Creatures with truesight can see through the illusion to the terrain's true form, however, all other elements of the illusion remain, so while the creature is aware of the illusion's presence, the creature can still physically interact with the illusion."
    },
    "mirror image": {
        name: "Mirror Image",
        classes: ["sorcerer", "warlock", "wizard"],
        source: [["SRD", 165], ["P", 260]],
        level: 2,
        school: "Illus",
        time: "1 a",
        range: "Self",
        components: "V,S",
        duration: "1 min (D)",
        description:
            "Create three illusionary duplicates of me; destroyed if hit; randomize attacks; AC 10 + my Dex mod",
        descriptionFull:
            "Three illusory duplicates of yourself appear in your space. Until the spell ends, the duplicates move with you and mimic your actions, shifting position so it's impossible to track which image is real. You can use your action to dismiss the illusory duplicates." +
            "\n   " +
            "Each time a creature targets you with an attack during the spell's duration, roll a d20 to determine whether the attack instead targets one of your duplicates." +
            "\n   " +
            "If you have three duplicates, you must roll a 6 or higher to change the attack's target to a duplicate. With two duplicates, you must roll an 8 or higher. With one duplicate, you must roll an 11 or higher." +
            "\n   " +
            "A duplicate's AC equals 10 + your Dexterity modifier. If an attack hits a duplicate, the duplicate is destroyed. A duplicate can be destroyed only by an attack that hits it. It ignores all other damage and effects. The spell ends when all three duplicates are destroyed." +
            "\n   " +
            "A creature is unaffected by this spell if it can't see, if it relies on senses other than sight, such as blindsight, or if it can perceive illusions as false, as with truesight."
    },
    mislead: {
        name: "Mislead",
        classes: ["bard", "wizard"],
        source: [["SRD", 165], ["P", 260]],
        level: 5,
        school: "Illus",
        time: "1 a",
        range: "Self",
        components: "S",
        duration: "Conc, 1 h",
        description:
            "I go invisible; create illusionary duplicate of me, 1 a move it, bns a switch between its senses and mine",
        descriptionFull:
            "You become invisible at the same time that an illusory double of you appears where you are standing. The double lasts for the duration, but the invisibility ends if you attack or cast a spell." +
            "\n   " +
            "You can use your action to move your illusory double up to twice your speed and make it gesture, speak, and behave in whatever way you choose. You can see through its eyes and hear through its ears as if you were located where it is. On each of your turns as a bonus action, you can switch from using its senses to using your own, or back again. While you are using its senses, you are blinded and deafened in regard to your own surroundings."
    },
    "misty step": {
        name: "Misty Step",
        classes: ["sorcerer", "warlock", "wizard"],
        source: [["SRD", 165], ["P", 260]],
        level: 2,
        school: "Conj",
        time: "1 bns",
        range: "Self",
        components: "V",
        duration: "Instantaneous",
        description: "I teleport 30 feet to a unoccupied space I can see",
        descriptionFull:
            "Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see."
    },
    "modify memory": {
        name: "Modify Memory",
        classes: ["bard", "wizard"],
        source: [["SRD", 166], ["P", 261]],
        level: 5,
        school: "Ench",
        time: "1 a",
        range: "30 ft",
        components: "V,S",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "1 crea save or charmed, alter 1 memory of last (SL6: 7, SL7: 30, SL8: 365) day; SL:9 any memory",
        descriptionFull:
            "You attempt to reshape another creature's memories. One creature that you can see must make a Wisdom saving throw. If you are fighting the creature, it has advantage on the saving throw. On a failed save, the target becomes charmed by you for the duration. The charmed target is incapacitated and unaware of its surroundings, though it can still hear you. If it takes any damage or is targeted by another spell, this spell ends, and none of the target's memories are modified." +
            "\n   " +
            "While this charm lasts, you can affect the target's memory of an event that it experienced within the last 24 hours and that lasted no more than 10 minutes. You can permanently eliminate all memory of the event, allow the target to recall the event with perfect clarity and exacting detail, change its memory of the details of the event, or create a memory of some other event." +
            "\n   " +
            "You must speak to the target to describe how its memories are affected, and it must be able to understand your language for the modified memories to take root. Its mind fills in any gaps in the details of your description. If the spell ends before you have finished describing the modified memories, the creature's memory isn't altered. Otherwise, the modified memories take hold when the spell ends." +
            "\n   " +
            "A modified memory doesn't necessarily affect how a creature behaves, particularly if the memory contradicts the creature's natural inclinations, alignment, or beliefs. An illogical modified memory, such as implanting a memory of how much the creature enjoyed dousing itself in acid, is dismissed, perhaps as a bad dream. The DM might deem a modified memory too nonsensical to affect a creature in a significant manner." +
            "\n   " +
            "A remove curse or greater restoration spell cast on the target restores the creature's true memory." +
            AtHigherLevels +
            "If you cast this spell using a spell slot of 6th level or higher, you can alter the target's memories of an event that took place up to 7 days ago (6th level), 30 days ago (7th level), 1 year ago (8th level), or any time in the creature's past (9th level)."
    },
    moonbeam: {
        name: "Moonbeam",
        classes: ["druid"],
        source: [["SRD", 166], ["P", 261]],
        level: 2,
        school: "Evoc",
        time: "1 a",
        range: "120 ft",
        components: "V,S,M",
        compMaterial:
            "Several seeds of any moonseed plant and a piece of opalescent feldspar",
        duration: "Conc, 1 min",
        save: "Con",
        description:
            "5-ft rad 40-ft high with dim light; all save or 2d10+1d10/SL; 1 a to move it 60 ft; see book",
        descriptionFull:
            "A silvery beam of pale light shines down in a 5-foot radius, 40-foot-high cylinder centered on a point within range. Until the spell ends, dim light fills the cylinder." +
            "\n   " +
            "When a creature enters the spell's area for the first time on a turn or starts its turn there, it is engulfed in ghostly flames that cause searing pain, and it must make a Constitution saving throw. It takes 2d10 radiant damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            "A shapechanger makes its saving throw with disadvantage. If it fails, it also instantly reverts to its original form and can't assume a different form until it leaves the spell's light." +
            "\n   " +
            "On each of your turns after you cast this spell, you can use an action to move the beam up to 60 feet in any direction." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d10 for each slot level above 2nd."
    },
    "mordenkainen's faithful hound": {
        name: "Mordenkainen's Faithful Hound",
        nameShort: "Mor. Faithful Hound",
        nameAlt: "Faithful Hound",
        classes: ["wizard"],
        source: [["SRD", 142], ["P", 261]],
        level: 4,
        school: "Conj",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "A tiny silver whistle, a piece of bone, and a thread",
        duration: "8 h (D)",
        description:
            "Invisible, immobile dog melee atks as spell atk for 4d8 Piercing dmg; sees invisible/ethereal; see book",
        descriptionFull:
            "You conjure a phantom watchdog in an unoccupied space that you can see within range, where it remains for the duration, until you dismiss it as an action, or until you move more than 100 feet away from it." +
            "\n   " +
            "The hound is invisible to all creatures except you and can't be harmed. When a Small or larger creature comes within 30 feet of it without first speaking the password that you specify when you cast this spell, the hound starts barking loudly. The hound sees invisible creatures and can see into the Ethereal Plane. It ignores illusions." +
            "\n   " +
            "At the start of each of your turns, the hound attempts to bite one creature within 5 feet of it that is hostile to you. The hound's attack bonus is equal to your spellcasting ability modifier + your proficiency bonus. On a hit, it deals 4d8 piercing damage."
    },
    "mordenkainen's magnificent mansion": {
        name: "Mordenkainen's Magnificent Mansion",
        nameShort: "Mor. Magni. Mansion",
        nameAlt: "Magnificent Mansion",
        classes: ["bard", "wizard"],
        source: [["SRD", 162], ["P", 261]],
        level: 7,
        school: "Conj",
        time: "1 min",
        range: "300 ft",
        components: "V,S,M\u0192",
        compMaterial:
            "A miniature portal carved from ivory, a small piece of polished marble, and a tiny silver spoon, each item worth at least 5 gp",
        duration: "24 h",
        description:
            "Create extradimensional mansion with rooms, food and servants to serve 100 people; see book (15gp)",
        descriptionFull:
            "You conjure an extradimensional dwelling in range that lasts for the duration. You choose where its one entrance is located. The entrance shimmers faintly and is 5 feet wide and 10 feet tall. You and any creature you designate when you cast the spell can enter the extradimensional dwelling as long as the portal remains open. You can open or close the portal if you are within 30 feet of it. While closed, the portal is invisible." +
            "\n   " +
            "Beyond the portal is a magnificent foyer with numerous chambers beyond. The atmosphere is clean, fresh, and warm." +
            "\n   " +
            "You can create any floor plan you like, but the space can't exceed 50 cubes, each cube being 10 feet on each side. The place is furnished and decorated as you choose. It contains sufficient food to serve a nine course banquet for up to 100 people. A staff of 100 near-transparent servants attends all who enter. You decide the visual appearance of these servants and their attire. They are completely obedient to your orders. Each servant can perform any task a normal human servant could perform, but they can't attack or take any action that would directly harm another creature. Thus the servants can fetch things, clean, mend, fold clothes, light fires, serve food, pour wine, and so on. The servants can go anywhere in the mansion but can't leave it. Furnishings and other objects created by this spell dissipate into smoke if removed from the mansion. When the spell ends, any creatures inside the extradimensional space are expelled into the open spaces nearest to the entrance."
    },
    "mordenkainen's private sanctum": {
        name: "Mordenkainen's Private Sanctum",
        nameShort: "Mor. Private Sanctum",
        nameAlt: "Private Sanctum",
        classes: ["wizard"],
        source: [["SRD", 171], ["P", 262]],
        level: 4,
        school: "Abjur",
        time: "10 min",
        range: "120 ft",
        components: "V,S,M",
        compMaterial:
            "A thin sheet of lead, a piece of opaque glass, a wad of cotton or cloth, and powdered chrysolite",
        duration: "24 h (D)",
        description:
            "Up to 100+100/SL ft cube is magically secured in chosen way; see book",
        descriptionFull:
            "You make an area within range magically secure. The area is a cube that can be as small as 5 feet to as large as 100 feet on each side. The spell lasts for the duration or until you use an action to dismiss it." +
            "\n   " +
            "When you cast the spell, you decide what sort of security the spell provides, choosing any or all of the following properties." +
            "\n " +
            "\u2022 Sound can't pass through the barrier at the edge of the warded area." +
            "\n " +
            "\u2022 The barrier of the warded area appears dark and foggy, preventing vision (including darkvision) through it." +
            "\n " +
            "\u2022 Sensors created by divination spells can't appear inside the protected area or pass through the barrier at its perimeter." +
            "\n " +
            "\u2022 Creatures in the area can't be targeted by divination spells." +
            "\n " +
            "\u2022 Nothing can teleport into or out of the warded area." +
            "\n " +
            "\u2022 Planar travel is blocked within the warded area." +
            "\n\n" +
            "Casting this spell on the same spot every day for a year makes this effect permanent." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 5th level or higher, you can increase the size of the cube by 100 feet for each slot level beyond 4th. Thus you could protect a cube that can be up to 200 feet on one side by using a spell slot of 5th level."
    },
    "mordenkainen's sword": {
        name: "Mordenkainen's Sword",
        nameAlt: "Arcane Sword",
        classes: ["bard", "wizard"],
        source: [["SRD", 119], ["P", 262]],
        level: 7,
        school: "Evoc",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M\u0192",
        compMaterial:
            "A miniature platinum sword with a grip and pommel of copper and zinc, worth 250 gp",
        duration: "Conc, 1 min",
        description:
            "Hovering sword makes melee spell attacks for 3d10 Force dmg; bns a to move 20 ft and/or attack",
        descriptionFull:
            "You create a sword-shaped plane of force that hovers within range. It lasts for the duration." +
            "\n   " +
            "When the sword appears, you make a melee spell attack against a target of your choice within 5 feet of the sword. On a hit. the target takes 3d10 force damage. Until the spell ends, you can use a bonus action on each of your turns to move the sword up to 20 feet to a spot you can see and repeat this attack against the same target or a different one."
    },
    "move earth": {
        name: "Move Earth",
        classes: ["druid", "sorcerer", "wizard"],
        source: [["SRD", 166], ["P", 263]],
        level: 6,
        school: "Trans",
        time: "1 a",
        range: "120 ft",
        components: "V,S,M",
        compMaterial:
            "An iron blade and a small bag containing a mixture of soils - clay, loam, and sand",
        duration: "Conc, 2 h",
        description:
            "Every 10 min of concentration, gradually reshape 40 cu ft of dirt, sand, or clay; see book",
        descriptionFull:
            "Choose an area of terrain no larger than 40 feet on a side within range. You can reshape dirt, sand, or clay in the area in any manner you choose for the duration. You can raise or lower the area's elevation, create or fill in a trench, erect or flatten a wall, or form a pillar. The extent of any such changes can't exceed half the area's largest dimension. So, if you affect a 40-foot square, you can create a pillar up to 20 feet high, raise or lower the square's elevation by up to 20 feet, dig a trench up to 20 feet deep, and so on. It takes 10 minutes for these changes to complete." +
            "\n   " +
            "At the end of every 10 minutes you spend concentrating on the spell, you can choose a new area of terrain to affect." +
            "\n   " +
            "Because the terrain's transformation occurs slowly, creatures in the area can't usually be trapped or injured by the ground's movement." +
            "\n   " +
            "This spell can't manipulate natural stone or stone construction. Rocks and structures shift to accommodate the new terrain. If the way you shape the terrain would make a structure unstable, it might collapse." +
            "\n   " +
            "Similarly, this spell doesn't directly affect plant growth. The moved earth carries any plants along with it."
    },
    nondetection: {
        name: "Nondetection",
        classes: ["bard", "ranger", "wizard"],
        source: [["SRD", 167], ["P", 263]],
        level: 3,
        school: "Abjur",
        time: "1 a",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial:
            "A pinch of diamond dust worth 25 gp sprinkled over the target, which the spell consumes",
        duration: "8 h",
        description:
            "1 crea or object up to 10 cu ft hidden from all divination magic (25gp cons.)",
        descriptionFull:
            "For the duration, you hide a target that you touch from divination magic. The target can be a willing creature or a place or an object no larger than 10 feet in any dimension. The target can't be targeted by any divination magic or perceived through magical scrying sensors."
    },
    "nystul's magic aura": {
        name: "Nystul's Magic Aura",
        nameAlt: "Arcanist's Magic Aura",
        classes: ["wizard"],
        source: [["SRD", 119], ["P", 263]],
        level: 2,
        school: "Illus",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "A small square of silk",
        duration: "24 h",
        description:
            "Create a false magic item with chosen properties or shroud a magical item from detection",
        descriptionFull:
            "You place an illusion on a creature or an object you touch so that divination spells reveal false information about it. The target can be a willing creature or an object that isn't being carried or worn by another creature." +
            "\n   " +
            "When you cast the spell, choose one or both of the following effects. The effect lasts for the duration. If you cast this spell on the same creature or object every day for 30 days, placing the same effect on it each time, the illusion lasts until it is dispelled." +
            "\n   " +
            toUni("False Aura") +
            ": You change the way the target appears to spells and magical effects, such as detect magic, that detect magical auras. You can make a nonmagical object appear magical, a magical object appear nonmagical, or change the object's magical aura so that it appears to belong to a specific school of magic that you choose. When you use this effect on an object, you can make the false magic apparent to any creature that handles the item." +
            "\n   " +
            toUni("Mask") +
            ": You change the way the target appears to spells and magical effects that detect creature types, such as a paladin's Divine Sense or the trigger of a symbol spell. You choose a creature type and other spells and magical effects treat the target as if it were a creature of that type or of that alignment."
    },
    "otiluke's freezing sphere": {
        name: "Otiluke's Freezing Sphere",
        nameAlt: "Freezing Sphere",
        classes: ["wizard"],
        source: [["SRD", 147], ["P", 263]],
        level: 6,
        school: "Evoc",
        time: "1 a",
        range: "300 ft",
        components: "V,S,M",
        compMaterial: "A small crystal sphere",
        duration: "Instantaneous",
        save: "Con",
        description:
            "60-ft rad all 10d6+1d6/SL Cold dmg; save halves; freezes water; can save up to 1 min before using",
        descriptionFull:
            "A frigid globe of cold energy streaks from your fingertips to a point of your choice within range, where it explodes in a 60-foot-radius sphere. Each creature within the area must make a Constitution saving throw. On a failed save, a creature takes 10d6 cold damage. On successful save, it takes half as much damage." +
            "\n   " +
            "If the globe strikes a body of water or a liquid that is principally water (not including water-based creatures), it freezes the liquid to a depth of 6 inches over an area 30 feet square. This ice lasts for 1 minute. Creatures that were swimming on the surface of frozen water are trapped in the ice. A trapped creature can use an action to make a Strength check against your spell save DC to break free." +
            "\n   " +
            "You can refrain from firing the globe after completing the spell, if you wish. A small globe about the size of a sling stone, cool to the touch, appears in your hand. At any time, you or a creature you give the globe to can throw the globe (to a range of 40 feet) or hurl it with a sling (to the sling's normal range). It shatters on impact, with the same effect as the normal casting of the spell. You can also set the globe down without shattering it. After 1 minute, if the globe hasn't already shattered, it explodes." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 7th level or higher, the damage increases by 1d6 for each slot level above 6th."
    },
    "otiluke's resilient sphere": {
        name: "Otiluke's Resilient Sphere",
        nameAlt: "Resilient Sphere",
        classes: ["wizard"],
        source: [["SRD", 175], ["P", 264]],
        level: 4,
        school: "Evoc",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial:
            "A hemispherical piece of clear crystal and a matching hemispherical piece of gum arabic",
        duration: "Conc, 1 min",
        save: "Dex",
        description:
            "1 crea/obj up to Large save or enclosed in impenetrable sphere; can be moved as hamsterball ",
        descriptionFull:
            "A sphere of shimmering force encloses a creature or object of Large size or smaller within range. An unwilling creature must make a Dexterity saving throw. On a failed save, the creature is enclosed for the duration." +
            "\n   " +
            "Nothing, not physical objects, energy, or other spell effects, can pass through the barrier, in or out, though a creature in the sphere can breathe there. The sphere is immune to all damage, and a creature or object inside can't be damaged by attacks or effects originating from outside, nor can a creature inside the sphere damage anything outside it." +
            "\n   " +
            "The sphere is weightless and just large enough to contain the creature or object inside. An enclosed creature can use its action to push against the sphere's walls and thus roll the sphere at up to half the creature's speed. Similarly, the globe can be picked up and moved by other creatures." +
            "\n   " +
            "A disintegrate spell targeting the globe destroys it without harming anything inside it."
    },
    "otto's irresistible dance": {
        name: "Otto's Irresistible Dance",
        nameAlt: "Irresistible Dance",
        classes: ["bard", "wizard"],
        source: [["SRD", 158], ["P", 264]],
        level: 6,
        school: "Ench",
        time: "1 a",
        range: "30 ft",
        components: "V",
        duration: "Conc, 1 min",
        save: "Dex",
        description:
            "1 crea dances in place, can't move, dis. on attacks/saves, adv. on atks vs. target; Wis save each rnd",
        descriptionFull:
            "Choose one creature that you can see within range. The target begins a comic dance in place - shuffling, tapping its feet, and capering for the duration. Creatures that can't be charmed are immune to this spell." +
            "\n   " +
            "A dancing creature must use all its movement to dance without leaving its space and has disadvantage on Dexterity saving throws and attack rolls. While the target is affected by this spell, other creatures have advantage on attack rolls against it. As an action, a dancing creature makes a Wisdom saving throw to regain control of itself. On a successful save, the spell ends."
    },
    "pass without trace": {
        name: "Pass Without Trace",
        classes: ["druid", "ranger"],
        source: [["SRD", 167], ["P", 264]],
        level: 2,
        school: "Abjur",
        time: "1 a",
        range: "Self",
        components: "V,S,M",
        compMaterial:
            "Ashes from a burned leaf of mistletoe and a sprig of spruce",
        duration: "Conc, 1 h",
        description:
            "Any within 30-ft rad +10 Dex(Stealth) checks, leave no tracks, can't be tracked by nonmagical means",
        descriptionFull:
            "A veil of shadows and silence radiates from you, masking you and your companions from detection. For the duration, each creature you choose within 30 feet of you (including you) has a +10 bonus to Dexterity (Stealth) checks and can't be tracked except by magical means. A creature that receives this bonus leaves behind no tracks or other traces of its passage."
    },
    passwall: {
        name: "Passwall",
        classes: ["wizard"],
        source: [["SRD", 167], ["P", 264]],
        level: 5,
        school: "Trans",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "A pinch of sesame seeds",
        duration: "1 h",
        description:
            "Create a passage (max. 5 ft wide, 8 ft tall, 20 ft deep) in a wooden, plaster or stone surface for 1 h",
        descriptionFull:
            "A passage appears at a point of your choice that you can see on a wooden, plaster, or stone surface (such as a wall, a ceiling, or a floor) within range, and lasts for the duration. You choose the opening's dimensions - up to 5 feet wide, 8 feet tall, and 20 feet deep. The passage creates no instability in a structure surrounding it." +
            "\n   " +
            "When the opening disappears, any creatures or objects still in the passage created by the spell are safely ejected to an unoccupied space nearest to the surface on which you cast the spell."
    },
    "phantasmal killer": {
        name: "Phantasmal Killer",
        classes: ["wizard"],
        source: [["SRD", 167], ["P", 265]],
        level: 4,
        school: "Illus",
        time: "1 a",
        range: "120 ft",
        components: "V,S",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "1 crea save or frightened; end of each turn save to end or 4d10+1d10/SL Psychic dmg", // errata from start of turn to end of turn
        descriptionFull:
            "You tap into the nightmares of a creature you can see within range and create an illusory manifestation of its deepest fears, visible only to that creature. The target must make a Wisdom saving throw. On a failed save, the target becomes frightened for the duration. At the end of each of the target's turns before the spell ends, the target must succeed on a Wisdom saving throw or take 4d10 psychic damage. On a successful save, the spell ends." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d10 for each slot level above 4th."
    },
    "phantom steed": {
        name: "Phantom Steed",
        classes: ["wizard"],
        source: [["SRD", 167], ["P", 265]],
        ritual: true,
        level: 3,
        school: "Illus",
        time: "1 min",
        range: "30 ft",
        components: "V,S",
        duration: "1 h (D)",
        description:
            "Summon quasi-real steed with 100 ft speed (10 mph); I designate rider; spells ends if it takes dmg",
        descriptionFull:
            "A Large quasi-real, horse-like creature appears on the ground in an unoccupied space of your choice within range. You decide the creature's appearance, but it is equipped with a saddle, bit, and bridle. Any of the equipment created by the spell vanishes in a puff of smoke if it is carried more than 10 feet away from the steed." +
            "\n   " +
            "For the duration, you or a creature you choose can ride the steed. The creature uses the statistics for a riding horse, except it has a speed of 100 feet and can travel 10 miles in an hour, or 13 miles at a fast pace. When the spell ends, the steed gradually fades, giving the rider 1 minute to dismount. The spell ends if you use an action to dismiss it or if the steed takes any damage."
    },
    "planar ally": {
        name: "Planar Ally",
        classes: ["cleric"],
        source: [["SRD", 168], ["P", 265]],
        level: 6,
        school: "Conj",
        time: "10 min",
        range: "60 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "Otherwordly entity sends celestial, elemental or fiend to a location near me; see book",
        descriptionFull:
            "You beseech an otherworldly entity for aid. The being must be known to you - a god, a primordial, a demon prince, or some other being of cosmic power. That entity sends a celestial, an elemental, or a fiend loyal to it to aid you, making the creature appear in an unoccupied space within range. If you know a specific creature's name, you can speak that name when you cast this spell to request that creature, though you might get a different creature anyway (DM's choice)." +
            "\n   " +
            "When the creature appears, it is under no compulsion to behave in any particular way. You can ask the creature to perform a service in exchange for payment, but it isn't obliged to do so. The requested task could range from simple (fly us across the chasm, or help us fight a battle) to complex (spy on our enemies, or protect us during our foray into the dungeon). You must be able to communicate with the creature to bargain for its services." +
            "\n   " +
            "Payment can take a variety of forms. A celestial might require a sizable donation of gold or magic items to an allied temple, while a fiend might demand a living sacrifice or a gift of treasure. Some creatures might exchange their service for a quest undertaken by you." +
            "\n   " +
            "As a rule of thumb, a task that can be measured in minutes requires a payment worth 100 gp per minute. A task measured in hours requires 1,000 gp per hour. And a task measured in days (up to 10 days) requires 10,000 gp per day. The DM can adjust these payments based on the circumstances under which you cast the spell. If the task is aligned with the creature's ethos, the payment might be halved or even waived. Nonhazardous tasks typically require only half the suggested payment, while especially dangerous tasks might require a greater gift. Creatures rarely accept tasks that seem suicidal." +
            "\n   " +
            "After the creature completes the task, or when the agreed-upon duration of service expires, the creature returns to its home plane after reporting back to you, if appropriate to the task and if possible. If you are unable to agree on a price for the creature's service, the creature immediately returns to its home plane." +
            "\n   " +
            "A creature enlisted to join your group counts as a member of it, receiving a full share of experience points awarded."
    },
    "planar binding": {
        name: "Planar Binding",
        classes: ["bard", "cleric", "druid", "wizard"],
        source: [["SRD", 168], ["P", 265]],
        level: 5,
        school: "Abjur",
        time: "1 h",
        range: "60 ft",
        components: "V,S,M\u2020",
        compMaterial:
            "A jewel worth at least 1,000 gp, which the spell consumes",
        duration: "24 h",
        save: "Cha",
        description:
            "1 celestial/elem/fey/fiend save or bound; SL6: 10, SL7: 30, SL8: 180, SL9: 366 days (1000gp cons.)",
        descriptionFull:
            "With this spell, you attempt to bind a celestial, an elemental, a fey, or a fiend to your service. The creature must be within range for the entire casting of the spell. (Typically, the creature is first summoned into the center of an inverted magic circle in order to keep it trapped while this spell is cast.) At the completion of the casting, the target must make a Charisma saving throw. On a failed save, it is bound to serve you for the duration. If the creature was summoned or created by another spell, that spell's duration is extended to match the duration of this spell." +
            "\n   " +
            "A bound creature must follow your instructions to the best of its ability. You might command the creature to accompany you on an adventure, to guard a location, or to deliver a message. The creature obeys the letter of your instructions, but if the creature is hostile to you, it strives to twist your words to achieve its own objectives. If the creature carries out your instructions completely before the spell ends, it travels to you to report this fact if you are on the same plane of existence. If you are on a different plane of existence, it returns to the place where you bound it and remains there until the spell ends." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of a higher level, the duration increases to 10 days with a 6th-level slot, to 30 days with a 7th-level slot, to 180 days with an 8th-level slot, and to a year and a day with a 9th-level spell slot."
    },
    "plane shift": {
        name: "Plane Shift",
        classes: ["cleric", "druid", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 168], ["P", 266]],
        level: 7,
        school: "Conj",
        time: "1 a",
        range: "Touch",
        components: "V,S,M\u0192",
        compMaterial:
            "A forked, metal rod worth at least 250 gp, atttuned to a particular plane of existence",
        duration: "Instantaneous",
        save: "Cha",
        description:
            "Me + 8 willing crea teleport to different plane; or spell attack + save or transported to random plane",
        descriptionFull:
            "You and up to eight willing creatures who link hands in a circle are transported to a different plane of existence. You can specify a target destination in general terms, such as the City of Brass on the Elemental Plane of Fire or the palace of Dispater on the second level of the Nine Hells, and you appear in or near that destination. If you are trying to reach the City of Brass, for example, you might arrive in its Street of Steel, before its Gate of Ashes, or looking at the city from across the Sea of Fire, at the DM's discretion." +
            "\n   " +
            "Alternatively, if you know the sigil sequence of a teleportation circle on another plane of existence, this spell can take you to that circle. If the teleportation circle is too small to hold all the creatures you transported, they appear in the closest unoccupied spaces next to the circle." +
            "\n   " +
            "You can use this spell to banish an unwilling creature to another plane. Choose a creature within your reach and make a melee spell attack against it. On a hit, the creature must make a Charisma saving throw. If the creature fails the save, it is transported to a random location on the plane of existence you specify. A creature so transported must find its own way back to your current plane of existence."
    },
    "plant growth": {
        name: "Plant Growth",
        classes: ["bard", "druid", "ranger"],
        source: [["SRD", 169], ["P", 266]],
        level: 3,
        school: "Trans",
        time: "1 a/8h",
        range: "150 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "1 a: 100-ft rad plants overgrow for 1/4 speed; 8h: 1 mile diameter plants yield double food at harvest",
        descriptionFull:
            "This spell channels vitality into plants within a specific area. There are two possible uses for the spell, granting either immediate or long-term benefits." +
            "\n   " +
            "If you cast this spell using 1 action, choose a point within range. All normal plants in a 100-foot radius centered on that point become thick and overgrown. A creature moving through the area must spend 4 feet of movement for every 1 foot it moves." +
            "\n   " +
            "You can exclude one or more areas of any size within the spell's area from being affected." +
            "\n   " +
            "If you cast this spell over 8 hours, you enrich the land. All plants in a half-mile radius centered on a point within range become enriched for 1 year. The plants yield twice the normal amount of food when harvested."
    },
    "poison spray": {
        name: "Poison Spray",
        classes: ["druid", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 169], ["P", 266]],
        level: 0,
        school: "Conj",
        time: "1 a",
        range: "10 ft",
        components: "V,S",
        duration: "Instantaneous",
        save: "Con",
        description:
            "1 creature save or 1d12 Poison dmg; +1d12 at CL 5, 11, and 17",
        descriptionCantripDie: "1 creature save or `CD`d12 Poison dmg",
        descriptionFull:
            "You extend your hand toward a creature you can see within range and project a puff of noxious gas from your palm. The creature must succeed on a Constitution saving throw or take 1d12 poison damage." +
            "\n   " +
            "This spell's damage increases by 1d12 when you reach 5th level (2d12), 11th level (3d12), and 17 level (4d12)."
    },
    polymorph: {
        name: "Polymorph",
        classes: ["bard", "druid", "sorcerer", "wizard"],
        source: [["SRD", 169], ["P", 266]],
        level: 4,
        school: "Trans",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M",
        compMaterial: "A caterpillar cocoon",
        duration: "Conc, 1 h",
        save: "Wis",
        description:
            "1 creature with > 0 HP save or transformed into beast of choice of same CR or lower; see book",
        descriptionFull:
            "This spell transforms a creature that you can see within range into a new form. An unwilling creature must make a Wisdom saving throw to avoid the effect. The spell has no effect on a shapechanger or a creature with 0 hit points" +
            "\n   " +
            "The transformation lasts for the duration, or until the target drops to 0 hit points or dies. The new form can be any beast whose challenge rating is equal to or less than the target's (or the target's level, if it doesn't have a challenge rating). The target's game statistics, including mental ability scores, are replaced by the statistics of the chosen beast. It retains its alignment and personality." +
            "\n   " +
            "The target assumes the hit points of its new form. When it reverts to its normal form, the creature returns to the number of hit points it had before it transformed. If it reverts as a result of dropping to 0 hit points, any excess damage carries over to its normal form. As long as the excess damage doesn't reduce the creature's normal form to 0 hit points, it isn't knocked unconscious." +
            "\n   " +
            "The creature is limited in the actions it can perform by the nature of its new form, and it can't speak, cast spells, or take any other action that requires hands or speech." +
            "\n   " +
            "The target's gear melds into the new form. The creature can't activate, use, wield, or otherwise benefit from any of its equipment."
    },
    "power word kill": {
        name: "Power Word Kill",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 170], ["P", 266]],
        level: 9,
        school: "Ench",
        time: "1 a",
        range: "60 ft",
        components: "V",
        duration: "Instantaneous",
        description: "1 creature with 100 current HP or less dies",
        descriptionFull:
            "You utter a word of power that can compel one creature you can see within range to die instantly. If the creature you chose has 100 hit points or fewer, it dies. Otherwise, the spell has no effect."
    },
    "power word stun": {
        name: "Power Word Stun",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 170], ["P", 267]],
        level: 8,
        school: "Ench",
        time: "1 a",
        range: "60 ft",
        components: "V",
        duration: "Instantaneous",
        save: "Con",
        description:
            "1 creature with 150 current HP or less is stunned; save at end of each turn to end spell",
        descriptionFull:
            "You speak a word of power that can overwhelm the mind of one creature you can see within range, leaving it dumbfounded. If the target has 150 hit points or fewer, it is stunned. Otherwise, the spell has no effect." +
            "\n   " +
            "The stunned target must make a Constitution saving throw at the end of each of its turns. On a successful save, this stunning effect ends."
    },
    "prayer of healing": {
        name: "Prayer of Healing",
        classes: ["cleric"],
        source: [["SRD", 170], ["P", 267]],
        level: 2,
        school: "Evoc",
        time: "10 min",
        range: "30 ft",
        components: "V",
        duration: "Instantaneous",
        description:
            "6 living creatures heal 2d8+1d8/SL+spellcasting ability modifier HP",
        descriptionFull:
            "Up to six creatures of your choice that you can see within range each regain hit points equal to 2d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 3rd level or higher, the healing increases by 1d8 for each slot level above 2nd."
    },
    prestidigitation: {
        name: "Prestidigitation",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 170], ["P", 267]],
        level: 0,
        school: "Trans",
        time: "1 a",
        range: "10 ft",
        components: "V,S",
        duration: "1 h (D)",
        description:
            "Minor trick; harmless sensory effect, illusory image, snuff light, clean/soil/chill/warm/flavor etc.",
        descriptionFull:
            "This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within range." +
            "\n " +
            "\u2022 You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor." +
            "\n " +
            "\u2022 You instantaneously light or snuff out a candle, a torch, or a small campfire." +
            "\n " +
            "\u2022 You instantaneously clean or soil an object no larger than 1 cubic foot." +
            "\n " +
            "\u2022 You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour." +
            "\n " +
            "\u2022 You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour." +
            "\n " +
            "\u2022 You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn." +
            "\n\n" +
            "If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action."
    },
    "prismatic spray": {
        name: "Prismatic Spray",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 170], ["P", 267]],
        level: 7,
        school: "Evoc",
        time: "1 a",
        range: "60-ft cone",
        components: "V,S",
        duration: "Instantaneous",
        save: "Dex",
        description:
            "All random effect, see book: either 10d6 dmg, restrained, or blinded; save halves/negates",
        descriptionFull:
            "Eight multicolored rays of light flash from your hand. Each ray is a different color and has a different power and purpose. Each creature in a 60-foot cone must make a Dexterity saving throw. For each target, roll a d8 to determine which color ray affects it." +
            "\n   " +
            toUni("1-Red") +
            ": The target takes 10d6 fire damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            toUni("2-Orange") +
            ": The target takes 10d6 acid damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            toUni("3-Yellow") +
            ": The target takes 10d6 lightning damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            toUni("4-Green") +
            ": The target takes 10d6 poison damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            toUni("5-Blue") +
            ": The target takes 10d6 cold damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            toUni("6-Indigo") +
            ": On a failed save, the target is restrained. It must then make a Constitution saving throw at the end of each of its turns. If it successfully saves three times, the spell ends. If it fails its save three times, it permanently turns to stone and is subjected to the petrified condition. The successes and failures don't need to be consecutive, keep track of both until the target collects three of a kind." +
            "\n   " +
            toUni("7-Violet") +
            ": On a failed save, the target is blinded. It must then make a Wisdom saving throw at the start of your next turn. A successful save ends the blindness. If it fails that save, the creature is transported to another plane of existence of the DM's choosing and is no longer blinded. (Typically, a creature that is on a plane that isn't its home plane is banished home, while other creatures are usually cast into the Astral or Ethereal planes.)" +
            "\n   " +
            toUni("8-Special") +
            ": The target is struck by two rays. Roll twice more, rerolling any 8."
    },
    "prismatic wall": {
        name: "Prismatic Wall",
        classes: ["wizard"],
        source: [["SRD", 171], ["P", 267]],
        level: 9,
        school: "Abjur",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "10 min",
        save: "Con",
        description:
            "Up to 90 ft long 30 ft high 5 inch thick; all in 20 ft save or blinded; 7 layers with effects, see book",
        descriptionFull:
            "A shimmering, multicolored plane of light forms a vertical opaque wall - up to 90 feet long, 30 feet high, and 1 inch thick - entered on a point you can see within range. Alternatively, you can shape the wall into a sphere up to 30 feet in diameter centered on a point you choose within range. The wall remains in place for the duration. If you position the wall so that it passes through a space occupied by a creature, the spell fails, and your action and the spell slot are wasted." +
            "\n   " +
            "The wall sheds bright light out to a range of 100 feet and dim light for an additional 100 feet. You and creatures you designate at the time you cast the spell can pass through and remain near the wall without harm. If another creature that can see the wall moves to within 20 feet of it or starts its turn there, the creature must succeed on a Constitution saving throw or become blinded for 1 minute." +
            "\n   " +
            "The wall consists of seven layers, each with a different color. When a creature attempts to reach into or pass through the wall, it does so one layer at a time through all the wall's layers. As it passes or reaches through each layer, the creature must make a Dexterity saving throw or be affected by that layer's properties as described below." +
            "\n   " +
            "The wall can be destroyed, also one layer at a time, in order from red to violet, by means specific to each layer. Once a layer is destroyed, it remains so for the duration of the spell. An antimagic field has no effect on a prismatic wall." +
            "\n   " +
            toUni("Red") +
            ": The creature takes 10d6 fire damage on a failed save, or half as much damage on a successful one. While this layer is in place, nonmagical ranged attacks can't pass through the wall. The layer can be destroyed by dealing at least 25 cold damage to it." +
            "\n   " +
            toUni("Orange") +
            ": The creature takes 10d6 acid damage on a failed save, or half as much damage on a successful one. While this layer is in place, magical ranged attacks can't pass through the wall. The layer is destroyed by a strong wind." +
            "\n   " +
            toUni("Yellow") +
            ": The creature takes 10d6 lightning damage on a failed save, or half as much damage on a successful one. This layer can be destroyed by dealing at least 60 force damage to it." +
            "\n   " +
            toUni("Green") +
            ": The creature takes 10d6 poison damage on a failed save, or half as much damage on a successful one. A passwall spell, or another spell of equal or greater level that can open a portal on a solid surface, destroys this layer." +
            "\n   " +
            toUni("Blue") +
            ": The creature takes 10d6 cold damage on a failed save, or half as much damage on a successful one. This layer can be destroyed by dealing at least 25 fire damage to it." +
            "\n   " +
            toUni("Indigo") +
            ": On a failed save, the creature is restrained. It must then make a Constitution saving throw at the end of each of its turns. If it successfully saves three times, the spell ends. If it fails its save three times, it permanently turns to stone and is subjected to the petrified condition. The successes and failures don't need to be consecutive, keep track of both until the creature collects three of a kind. While this layer is in place, spells can't be cast through the wall. The layer is destroyed by bright light shed by a daylight spell or a similar spell of equal or higher level." +
            "\n   " +
            toUni("Violet") +
            ": On a failed save, the creature is blinded. It must then make a Wisdom saving throw at the start of your next turn. A successful save ends the blindness. If it fails that save, the creature is transported to another plane of the DM's choosing and is no longer blinded. (Typically, a creature that is on a plane that isn't its home plane is banished home, while other creatures are usually cast into the Astral or Ethereal planes.) This layer is destroyed by a dispel magic spell or a similar spell of equal or higher level that can end spells and magical effects."
    },
    "produce flame": {
        name: "Produce Flame",
        classes: ["druid"],
        source: [["SRD", 172], ["P", 269]],
        level: 0,
        school: "Conj",
        time: "1 a",
        range: "Self",
        components: "V,S",
        duration: "10 min (D)",
        description:
            "Flame 10 ft bright light; once 30 ft ranged spell attack for 1d8 Fire dmg; +1d8 at CL 5, 11, and 17",
        descriptionCantripDie:
            "Flame 10 ft bright light; once 30 ft ranged spell attack for `CD`d8 Fire dmg",
        descriptionFull:
            "A flickering flame appears in your hand. The flame remains there for the duration and harms neither you nor your equipment. The flame sheds bright light in a 10-foot radius and dim light for an additional 10 feet. The spell ends if you dismiss it as an action or if you cast it again." +
            "\n   " +
            "You can also attack with the flame, although doing so ends the spell. When you cast this spell, or as an action on a later turn, you can hurl the flame at a creature within 30 feet of you. Make a ranged spell attack. On a hit, the target takes 1d8 fire damage." +
            "\n   " +
            "This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
    },
    "programmed illusion": {
        name: "Programmed Illusion",
        classes: ["bard", "wizard"],
        source: [["SRD", 172], ["P", 269]],
        level: 6,
        school: "Illus",
        time: "1 a",
        range: "120 ft",
        components: "V,S,M\u0192",
        compMaterial: "A bit of fleece and jade dust worth at least 25 gp",
        duration: "Till dispelled",
        description:
            "30-ft cube illusion includes visible, audible; triggers on set condition; see book (25gp)",
        descriptionFull:
            "You create an illusion of an object, a creature, or some other visible phenomenon within range that activates when a specific condition occurs. The illusion is imperceptible until then. It must be no larger than a 30-foot cube, and you decide when you cast the spell how the illusion behaves and what sounds it makes. This scripted performance can last up to 5 minutes." +
            "\n   " +
            "When the condition you specify occurs, the illusion springs into existence and performs in the manner you described. Once the illusion finishes performing, it disappears and remains dormant for 10 minutes. After this time, the illusion can be activated again." +
            "\n   " +
            "The triggering condition can be as general or as detailed as you like, though it must be based on visual or audible conditions that occur within 30 feet of the area. For example, you could create an illusion of yourself to appear and warn off others who attempt to open a trapped door, or you could set the illusion to trigger only when a creature says the correct word or phrase." +
            "\n   " +
            "Physical interaction with the image reveals it to be an illusion, because things can pass through it. A creature that uses its action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and any noise it makes sounds hollow to the creature."
    },
    "project image": {
        name: "Project Image",
        classes: ["bard", "wizard"],
        source: [["SRD", 172], ["P", 270]],
        level: 7,
        school: "Illus",
        time: "1 a",
        range: "500 miles",
        components: "V,S,M\u0192",
        compMaterial:
            "A small replica of you made from materials worth at least 5 gp",
        duration: "Conc, 1 day",
        description:
            "Project image of me to familiar place; 1 a manipulate; bns a switch between its senses and mine (5gp)",
        descriptionFull:
            "You create an illusory copy of yourself that lasts for the duration. The copy can appear at any location within range that you have seen before, regardless of intervening obstacles. The illusion looks and sounds like you but is intangible. If the illusion takes any damage, it disappears, and the spell ends." +
            "\n   " +
            "You can use your action to move this illusion up to twice your speed, and make it gesture, speak, and behave in whatever way you choose. It mimics your mannerisms perfectly." +
            "\n   " +
            "You can see through its eyes and hear through its ears as if you were in its space. On your turn as a bonus action, you can switch from using its senses to using your own, or back again. While you are using its senses, you are blinded and deafened in regard to your own surroundings." +
            "\n   " +
            "Physical interaction with the image reveals it to be an illusion, because things can pass through it. A creature that uses its action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and any noise it makes sounds hollow to the creature."
    },
    "protection from energy": {
        name: "Protection from Energy",
        classes: ["cleric", "druid", "ranger", "sorcerer", "wizard"],
        source: [["SRD", 173], ["P", 270]],
        level: 3,
        school: "Abjur",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "Conc, 1 h",
        description:
            "1 creature gains resistance to either Acid, Cold, Fire, Lightning, or Thunder damage for duration",
        descriptionFull:
            "For the duration, the willing creature you touch has resistance to one damage type of your choice - acid, cold, fire, lightning, or thunder."
    },
    "protection from evil and good": {
        name: "Protection from Evil and Good",
        nameShort: "Prot. from Evil/Good",
        classes: ["cleric", "paladin", "warlock", "wizard"],
        source: [["SRD", 173], ["P", 270]],
        level: 1,
        school: "Abjur",
        time: "1 a",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial:
            "Holy water or powdered silver and iron, which the spell consumes",
        duration: "Conc, 10 min",
        description:
            "1 crea immune fear/charm/possess by abber./celest./elem./fey/fiends/undead, they also dis. on atks",
        descriptionFull:
            "Until the spell ends, one willing creature you touch is protected against certain types of creatures - aberrations, celestials, elementals, fey, fiends, and undead." +
            "\n   " +
            "The protection grants several benefits. Creatures of those types have disadvantage on attack rolls against the target. The target also can't be charmed, frightened, or possessed by them. If the target is already charmed, frightened, or possessed by such a creature, the target has advantage on any new saving throw against the relevant effect."
    },
    "protection from poison": {
        name: "Protection from Poison",
        classes: ["cleric", "druid", "paladin", "ranger"],
        source: [["SRD", 173], ["P", 270]],
        level: 2,
        school: "Abjur",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "1 h",
        description:
            "1 crea cured from 1 poison, gains resistance to Poison damage, and adv. on saves vs. being poisoned",
        descriptionFull:
            "You touch a creature. If it is poisoned, you neutralize the poison. If more than one poison afflicts the target, you neutralize on poison that you know is present, or you neutralize one at random." +
            "\n   " +
            "For the duration, the target has advantage on saving throws against being poisoned, and it has resistance to poison damage."
    },
    "purify food and drink": {
        name: "Purify Food and Drink",
        classes: ["cleric", "druid", "paladin"],
        source: [["SRD", 173], ["P", 270]],
        ritual: true,
        level: 1,
        school: "Trans",
        time: "1 a",
        range: "10 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "5-ft rad of food and drink is rendered free of all poison and disease",
        descriptionFull:
            "All nonmagical food and drink within a 5-foot-radius sphere centered on a point of your choice within range is purified and rendered free of poison and disease."
    },
    "raise dead": {
        name: "Raise Dead",
        classes: ["bard", "cleric", "paladin"],
        source: [["SRD", 173], ["P", 270]],
        level: 5,
        school: "Necro",
        time: "1 h",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial:
            "A diamond worth at least 500 gp, which the spell consumes",
        duration: "Instantaneous",
        description:
            "Restores a creature's body that has died in the last 10 days to life with 1 HP; see book (500gp cons.)",
        descriptionFull:
            "You return a dead creature you touch to life, provided that it has been dead no longer than 10 days. If the creature's soul is both willing and at liberty to rejoin the body, the creature returns to life with 1 hit point." +
            "\n   " +
            "This spell also neutralizes any poison and cures nonmagical diseases that affected the creature at the time it died. This spell doesn't, however, remove magical diseases, curses, or similar effects, if these aren't first removed prior to casting the spell, they take effect when the creature returns to life. The spell can't return an undead creature to life." +
            "\n   " +
            "This spell closes all mortal wounds, but it doesn't restore missing body parts. If the creature is lacking body parts or organs integral for its survival - its head, for instance - the spell automatically fails." +
            "\n   " +
            "Coming back from the dead is an ordeal. The target takes a -4 penalty to all attack rolls, saving throws, and ability checks. Every time the target finishes a long rest, the penalty is reduced by 1 until it disappears."
    },
    "rary's telepathic bond": {
        name: "Rary's Telepathic Bond",
        nameShort: "Rary's Telepath. Bond",
        nameAlt: "Telepathic Bond",
        classes: ["wizard"],
        source: [["SRD", 185], ["P", 270]],
        ritual: true,
        level: 5,
        school: "Div",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial:
            "Pieces of eggshell from two different kinds of creatures",
        duration: "1 h",
        description:
            "8 willing crea with Int>2 gain a telepathic bond that works for any distance on the same plane",
        descriptionFull:
            "You forge a telepathic link among up to eight willing creatures of your choice within range, psychically linking each creature to all the others for the duration. Creatures with Intelligence scores of 2 or less aren't affected by this spell." +
            "\n   " +
            "Until the spell ends, the targets can communicate telepathically through the bond whether or not they have a common language. The communication is possible over any distance, though it can't extend to other planes of existence."
    },
    "ray of enfeeblement": {
        name: "Ray of Enfeeblement",
        classes: ["warlock", "wizard"],
        source: [["SRD", 174], ["P", 271]],
        level: 2,
        school: "Necro",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Conc, 1 min",
        save: "Con",
        description:
            "Spell attack; crea does half dmg with weapon attacks that use Str; save at end of each turn to end",
        descriptionFull:
            "A black beam of enervating energy springs from your finger toward a creature within range. Make a ranged spell attack against the target. On a hit, the target deals only half damage with weapon attacks that use Strength until the spell ends." +
            "\n   " +
            "At the end of each of the target's turns, it can make a Constitution saving throw against the spell. On a success, the spell ends."
    },
    "ray of frost": {
        name: "Ray of Frost",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 174], ["P", 271]],
        level: 0,
        school: "Evoc",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "Spell attack for 1d8 Cold dmg and -10 ft speed until start of my next turn; +1d8 at CL 5, 11, and 17",
        descriptionCantripDie:
            "Spell attack for `CD`d8 Cold dmg and -10 ft speed until start of my next turn",
        descriptionFull:
            "A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn." +
            "\n   " +
            "The spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
    },
    regenerate: {
        name: "Regenerate",
        classes: ["bard", "cleric", "druid"],
        source: [["SRD", 174], ["P", 271]],
        level: 7,
        school: "Trans",
        time: "1 min",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "A prayer wheel and holy water",
        duration: "1 h",
        description:
            "1 crea heals 4d8+15 HP and 1 HP/rnd for rest of duration; restores lost body parts in 2 min",
        descriptionFull:
            "You touch a creature and stimulate its natural healing ability. The target regains 4d8 + 15 hit points. For the duration of the spell, the target regains 1 hit point at the start of each of its turns (10 hit points each minute)." +
            "\n   " +
            "The target's severed body members (fingers, legs, tails, and so on), if any, are restored after 2 minutes. If you have the severed part and hold it to the stump, the spell instantaneously causes the limb to knit to the stump."
    },
    reincarnate: {
        name: "Reincarnate",
        classes: ["druid"],
        source: [["SRD", 174], ["P", 271]],
        level: 5,
        school: "Trans",
        time: "1 h",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial:
            "Rare oils and unguents worth at least 1,000 gp, which the spell consumes",
        duration: "Instantaneous",
        description:
            "Brings humanoid that died in last 10 days to life in a new random adult body, see book (1000gp cons.)",
        descriptionFull:
            "You touch a dead humanoid or a piece of a dead humanoid. Provided that the creature has been dead no longer than 10 days, the spell forms a new adult body for it and then calls the soul to enter that body. If the target's soul isn't free or willing to do so, the spell fails." +
            "\n   " +
            "The magic fashions a new body for the creature to inhabit, which likely causes the creature's race to change. The DM rolls a d100 and consults the following table to determine what form the creature takes when restored to life, or the DM chooses a form." +
            "\n\n   " +
            toUni("d100") +
            "\t" +
            toUni("Race") +
            "\n   " +
            "01-04\tDragonborn" +
            "\n   " +
            "05-13\tDwarf, hill" +
            "\n   " +
            "14-21\tDwarf, mountain" +
            "\n   " +
            "22-25\tElf, dark" +
            "\n   " +
            "26-34\tElf, high" +
            "\n   " +
            "35-42\tElf, wood" +
            "\n   " +
            "43-46\tGnome, forest" +
            "\n   " +
            "47-52\tGnome, rock" +
            "\n   " +
            "53-56\tHalf-elf" +
            "\n   " +
            "57-60\tHalf-orc" +
            "\n   " +
            "61-68\tHalfling, lightfoot" +
            "\n   " +
            "69-76\tHalfling, stout" +
            "\n   " +
            "77-96\tHuman" +
            "\n   " +
            "97-00\tTiefling" +
            "\n\n" +
            "The reincarnated creature recalls its former life and experiences. It retains the capabilities it had in its original form, except it exchanges its original race for the new one and changes its racial traits accordingly."
    },
    "remove curse": {
        name: "Remove Curse",
        classes: ["cleric", "paladin", "warlock", "wizard"],
        source: [["SRD", 174], ["P", 271]],
        level: 3,
        school: "Abjur",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "1 creature or object is freed of all curses; cursed magic items break attunement with owner",
        descriptionFull:
            "At your touch, all curses affecting one creature or object end. If the object is a cursed magic item, its curse remains, but the spell breaks its owner's attunement to the object so it can be removed or discarded."
    },
    resistance: {
        name: "Resistance",
        classes: ["cleric", "druid"],
        source: [["SRD", 175], ["P", 272]],
        level: 0,
        school: "Abjur",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "A miniature cloak",
        duration: "Conc, 1 min",
        description:
            "1 willing crea can add 1d4 to one saving throw after rolling, once during the duration",
        descriptionFull:
            "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one saving throw of its choice. It can roll the die before or after the saving throw. The spell then ends."
    },
    resurrection: {
        name: "Resurrection",
        classes: ["bard", "cleric"],
        source: [["SRD", 175], ["P", 272]],
        level: 7,
        school: "Necro",
        time: "1 h",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial:
            "A diamond worth at least 1,000 gp, which the spell consumes",
        duration: "Instantaneous",
        description:
            "Resurrects a creature, that has died in the last century, with whole body; see book (1000gp cons.)",
        descriptionFull:
            "You touch a dead creature that has been dead for no more than a century, that didn't die of old age, and that isn't undead. If its soul is free and willing, the target returns to life with all its hit points." +
            "\n   " +
            "This spell neutralizes any poisons and cures normal diseases afflicting the creature when it died. It doesn't, however, remove magical diseases, curses, and the like, if such affects aren't removed prior to casting the spell, they afflict the target on its return to life." +
            "\n   " +
            "This spell closes all mortal wounds and restores any missing body parts." +
            "\n   " +
            "Coming back from the dead is an ordeal. The target takes a -4 penalty to all attack rolls, saving throws, and ability checks. Every time the target finishes a long rest, the penalty is reduced by 1 until it disappears." +
            "\n   " +
            "Casting this spell to restore life to a creature that has been dead for one year or longer taxes you greatly. Until you finish a long rest, you can't cast spells again, and you have disadvantage on all attack rolls, ability checks, and saving throws."
    },
    "reverse gravity": {
        name: "Reverse Gravity",
        classes: ["druid", "sorcerer", "wizard"],
        source: [["SRD", 175], ["P", 272]],
        level: 7,
        school: "Trans",
        time: "1 a",
        range: "100 ft",
        components: "V,S,M",
        compMaterial: "A lodestone and iron filings",
        duration: "Conc, 1 min",
        save: "Dex",
        description:
            "50-ft rad 100-ft high everything falls upward; save to grab hold onto something solid",
        descriptionFull:
            "This spell reverses gravity in a 50-foot-radius, 100-foot high cylinder centered on a point within range. All creatures and objects that aren't somehow anchored to the ground in the area fall upward and reach the top of the area when you cast this spell. A creature can make a Dexterity saving throw to grab onto a fixed object it can reach, thus avoiding the fall." +
            "\n   " +
            "If some solid object (such as a ceiling) is encountered in this fall, falling objects and creatures strike it just as they would during a normal downward fall. If an object or creature reaches the top of the area without striking anything, it remains there, oscillating slightly, for the duration." +
            "\n   " +
            "At the end of the duration, affected objects and creatures fall back down."
    },
    revivify: {
        name: "Revivify",
        classes: ["cleric", "paladin"],
        source: [["SRD", 175], ["P", 272]],
        level: 3,
        school: "Necro", // errata from conjuration
        time: "1 a",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial: "Diamonds worth 300 gp, which the spell consumes",
        duration: "Instantaneous",
        description:
            "Restores a creature's body that has died in the last min to life with 1 HP (300gp cons.)",
        descriptionFull:
            "You touch a creature that has died within the last minute. That creature returns to life with 1 hit point. This spell can't return to life a creature that has died of old age, nor can it restore any missing body parts."
    },
    "rope trick": {
        name: "Rope Trick",
        classes: ["wizard"],
        source: [["SRD", 176], ["P", 272]],
        level: 2,
        school: "Trans",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "Powdered corn extract and a twisted loop of parchment",
        duration: "1 h",
        description:
            "Rope up to 60 ft stands vertical; extradimens. space with invisible 3\u00D75 ft entrance at top, for 8 crea",
        descriptionFull:
            "You touch a length of rope that is up to 60 feet long. One end of the rope then rises into the air until the whole rope hangs perpendicular to the ground. At the upper end of the rope, an invisible entrance opens to an extradimensional space that lasts until the spell ends." +
            "\n   " +
            "The extradimensional space can be reached by climbing to the top of the rope. The space can hold as many as eight Medium or smaller creatures. The rope can be pulled into the space, making the rope disappear from view outside the space." +
            "\n   " +
            "Attacks and spells can't cross through the entrance into or out of the extradimensional space, but those inside can see out of it as if through a 3-foot-by-5-foot window centered on the rope." +
            "\n   " +
            "Anything inside the extradimensional space drops out when the spell ends."
    },
    "sacred flame": {
        name: "Sacred Flame",
        classes: ["cleric"],
        source: [["SRD", 176], ["P", 272]],
        level: 0,
        school: "Evoc",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Instantaneous",
        save: "Dex",
        description:
            "1 creature save or 1d8 Radiant dmg; no bonus for cover on save; +1d8 at CL 5, 11, and 17",
        descriptionCantripDie:
            "1 creature save or `CD`d8 Radiant dmg; no bonus for cover on save",
        descriptionFull:
            "Flame-like radiance descends on a creature that you can see within range. The target must succeed on a Dexterity saving throw or take 1d8 radiant damage. The target gains no benefit from cover for this saving throw." +
            "\n   " +
            "The spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
    },
    sanctuary: {
        name: "Sanctuary",
        classes: ["cleric"],
        source: [["SRD", 176], ["P", 272]],
        level: 1,
        school: "Abjur",
        time: "1 bns",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "A small silver mirror",
        duration: "1 min",
        save: "Wis",
        description:
            "1 crea warded; any who want to attack/target must first make save; doesn't protect vs. area spells",
        descriptionFull:
            "You ward a creature within range against attack. Until the spell ends, any creature who targets the warded creature with an attack or a harmful spell must first make a Wisdom saving throw. On a failed save, the creature must choose a new target or lose the attack or spell. This spell doesn't protect the warded creature from area effects, such as the explosion of a fireball." +
            "\n   " +
            "If the warded creature makes an attack, casts a spell that affects an enemy, or deals damage to another creature, this spell ends."
    },
    "scorching ray": {
        name: "Scorching Ray",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 176], ["P", 273]],
        level: 2,
        school: "Evoc",
        time: "1 a",
        range: "120 ft",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "3+1/SL rays hit creature(s) on spell attack with each ray for 2d6 Fire dmg per ray",
        descriptionFull:
            "You create three rays of fire and hurl them at targets within range. You can hurl them at one target or several." +
            "\n   " +
            "Make a ranged spell attack for each ray. On a hit, the target takes 2d6 fire damage." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 3rd level or higher, you create one additional ray for each slot level above 2nd."
    },
    scrying: {
        name: "Scrying",
        classes: ["bard", "cleric", "druid", "warlock", "wizard"],
        source: [["SRD", 176], ["P", 273]],
        level: 5,
        school: "Div",
        time: "10 min",
        range: "Self",
        components: "V,S,M\u0192",
        compMaterial:
            "A focus worth at least 1,000 gp, such as a crystal ball, a silver mirror, or a font filled with holy water",
        duration: "Conc, 10 min",
        save: "Wis",
        description:
            "1 crea save or sensor follows it around; or create sensor in familiar location; see book (1000gp)",
        descriptionFull:
            "You can see and hear a particular creature you choose that is on the same plane of existence as you. The target must make a Wisdom saving throw, which is modified by how well you know the target and the sort of physical connection you have to it. If a target knows you're casting this spell, it can fail the saving throw voluntarily if it wants to be observed." +
            "\n\n" +
            toUni("Knowledge") +
            "\t\t\t   " +
            toUni("Save Modifier") +
            "\n" +
            "Secondhand (you have heard of the target)\t+5" +
            "\n" +
            "Firsthand (you have met the target)\t\t+0" +
            "\n" +
            "Familiar (you know the target well)\t\t-5" +
            "\n\n" +
            toUni("Connection") +
            "\t\t\t   " +
            toUni("Save Modifier") +
            "\n" +
            "Likeness or picture\t\t\t\t-2" +
            "\n" +
            "Possession or garment\t\t\t-4" +
            "\n" +
            "Body part, lock of hair, bit of nail, or the like\t-10" +
            "\n\n" +
            "On a successful save, the target isn't affected, and you can't use this spell against it again for 24 hours." +
            "\n   " +
            "On a failed save, the spell creates an invisible sensor within 10 feet of the target. You can see and hear through the sensor as if you were there. The sensor moves with the target, remaining within 10 feet of it for the duration. A creature that can see invisible objects sees the sensor as a luminous orb about the size of your fist." +
            "\n   " +
            "Instead of targeting a creature, you can choose a location you have seen before as the target of this spell. When you do, the sensor appears at that location and doesn't move."
    },
    "see invisibility": {
        name: "See Invisibility",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 177], ["P", 274]],
        level: 2,
        school: "Div",
        time: "1 a",
        range: "Self",
        components: "V,S,M",
        compMaterial:
            "A pinch of Talc and a small sprinkling of powdered silver",
        duration: "1 h",
        description:
            "See invisible/ethereal creatures and objects as if they were visible; ethereals are ghostly, translucent",
        descriptionFull:
            "For the duration, you see invisible creatures and objects as if they were visible, and you can see into the Ethereal Plane. Ethereal creatures and objects appear ghostly and translucent."
    },
    seeming: {
        name: "Seeming",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 177], ["P", 274]],
        level: 5,
        school: "Illus",
        time: "1 a",
        range: "30 ft",
        components: "V,S",
        duration: "8 h (D)",
        save: "Cha",
        description:
            "Any crea save or disguised by changing physical appearance; Int(Investigation) check vs. spell DC",
        descriptionFull:
            "This spell allows you to change the appearance of any number of creatures that you can see within range. You give each target you choose a new, illusory appearance. An unwilling target can make a Charisma saving throw, and if it succeeds, it is unaffected by this spell." +
            "\n   " +
            "The spell disguises physical appearances as well as clothing, armor, weapons, and equipment. You can make each creature seem 1 foot shorter or taller and appear thin, fat, or in-between. You can't change a target's body type, so you must choose a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you. The spell lasts for the duration, unless you use your action to dismiss it sooner." +
            "\n   " +
            "The changes wrought by this spell fail to hold up to physical inspections. For example, if you use this spell to add a hat to a creature's outfit objects pass through the hat, and anyone who touches it would feel nothing or would feel the creature's head and hair. If you use this spell to appear thinner then you are, the hand of someone who reaches out to touch you would bump into you while it was seemingly still in midair." +
            "\n   " +
            "A creature can use its action to inspect a target and make an Intelligence (Investigation) check against your spell save DC. If it succeeds, it becomes aware that the target is disguised."
    },
    sending: {
        name: "Sending",
        classes: ["bard", "cleric", "wizard"],
        source: [["SRD", 177], ["P", 274]],
        level: 3,
        school: "Evoc",
        time: "1 a",
        range: "Unlimited",
        components: "V,S,M",
        compMaterial: "A short piece of fine copper wire",
        duration: "1 rnd",
        description:
            "Send a 25 word message to a familiar creature; it recognizes me and can respond with 25 words",
        descriptionFull:
            "You send a short message of twenty-five words or less to a creature with you are familiar. The creature hears the message in its mind, recognizes you as the sender if it knows you, and can answer in a like manner immediately. The spell enables creatures with Intelligence scores of at least 1 to understand the meaning of your message." +
            "\n   " +
            "You can send the message across any distance and even to other planes of existence, but if the target is on a different plane than you, there is a 5 percent chance that the message doesn't arrive."
    },
    sequester: {
        name: "Sequester",
        classes: ["wizard"],
        source: [["SRD", 178], ["P", 274]],
        level: 7,
        school: "Trans",
        time: "1 a",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial:
            "A powder composed of diamond, emerald, ruby, and sapphire dust worth at least 5,000 gp, which the spell consumes",
        duration: "Till dispelled",
        description:
            "1 willing crea/obj suspended, invisible, hidden from divination magic; see book (5000gp cons.)",
        descriptionFull:
            "By means of this spell, a willing creature or an object can be hidden away, safe from detection for the duration. When you cast the spell and touch the target, it becomes invisible and can't be targeted by divination spells or perceived through scrying sensors created by the divination of spells." +
            "\n   " +
            "If the target is a creature, it falls into a state of suspended animation. Time ceases to flow for it, and it doesn't grow older." +
            "\n   " +
            "You can set a condition for the spell to end early. The condition can be anything you choose, but it must occur or be visible within 1 mile of the target. Examples include after 1,000 years or when the tarrasque awakes. This spell also ends if the target takes any damage."
    },
    shapechange: {
        name: "Shapechange",
        classes: ["druid", "wizard"],
        source: [["SRD", 178], ["P", 274]],
        level: 9,
        school: "Trans",
        time: "1 a",
        range: "Self",
        components: "V,S,M\u0192",
        compMaterial:
            "A jade circlet worth at least 1,500 gp, which you must place on your head before you cast the spell",
        duration: "Conc, 1 h",
        description:
            "Take form of creature with CR of CL or lower; keep Int, Wis, Cha and alignment; see book (1500gp)",
        descriptionFull:
            "You assume the form of a different creature for the duration. The new form can be any creature with a challenge rating equal to your level or lower. The creature can't be a construct or an undead, and you must have seen the sort of creature at least once. You transform into an average example of that creature, one without any class levels or the Spellcasting trait." +
            "\n   " +
            "Your game statistics are replaced by the statistics of the chosen creature, though you retain your alignment and Intelligence, Wisdom, and Charisma scores You also retain all of your skill and saving throw proficiencies, in addition to gaining those of the creature, If the creature has the same proficiency as you, and the bonus listed in its statistics is higher than yours, use the creature's bonus in place of yours. You can't use any legendary actions or lair actions of the new form." +
            "\n   " +
            "You assume the hit points and Hit Dice of the new form. When you revert to your normal, you return to the number of hit points you had before you transformed. If you revert as a result of dropping to 0 hit points, any excess damage carries over to your normal form. As long as the excess damage doesn't reduce your normal form to 0 hit points, you aren't knocked unconscious." +
            "\n   " +
            "You retain the benefit of any features from your class, race, or other source and can use them, provided that your new form is physically capable of doing so. You can't use any special senses you have (for example, darkvision) unless your new form also has that sense. You can only speak if the creature can normally speak." +
            "\n   " +
            "When you transform, you choose whether your equipment falls to the ground, merges into the new form, or is worn by it. Worn equipment functions as normal. The DM determines whether it is practical for the new form to wear a piece of equipment, based on the creature's shape and size. Your equipment doesn't change shape or size to match the new form, and any equipment that the new form can't wear must either fall to the ground or merge into your new form. Equipment that merges has no effect in that state." +
            "\n   " +
            "During this spell's duration, you can use your action to assume a different form following the same restrictions and rules for the original form, with one exception - if your new form has more hit pints than your current one, your hit points remain at their current value."
    },
    shatter: {
        name: "Shatter",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 178], ["P", 275]],
        level: 2,
        school: "Evoc",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M",
        compMaterial: "A chip of mica",
        duration: "Instantaneous",
        save: "Con",
        description:
            "10-ft rad all 3d8+1d8/SL Thunder dmg; save halves; nonmagical unattended objects also take dmg",
        descriptionFull:
            "A sudden loud ringing noise, painfully intense, erupts from a point of your choice within range. Each creature in a 10-foot-radius sphere centered on that point must make a Constitution saving throw. A creature takes 3d8 thunder damage on a failed save, or half as much damage on a successful one. A creature made of inorganic material such as stone, crystal, or metal has disadvantage on this saving throw." +
            "\n   " +
            "A nonmagical object that isn't being worn or carried also takes the damage if it's in the spell's area." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of or higher, the damage increases by 1d8 for each slot level above 2nd."
    },
    shield: {
        name: "Shield",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 179], ["P", 275]],
        level: 1,
        school: "Abjur",
        time: "1 rea",
        range: "Self",
        components: "V,S",
        duration: "1 rnd",
        description:
            "If hit by attack +5 AC until start of next turn; or stop Magic Missile spell from doing any dmg to me",
        descriptionFull:
            "An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile."
    },
    "shield of faith": {
        name: "Shield of Faith",
        classes: ["cleric", "paladin"],
        source: [["SRD", 179], ["P", 275]],
        level: 1,
        school: "Abjur",
        time: "1 bns",
        range: "60 ft",
        components: "V,S,M",
        compMaterial: "A small parchment with a bit of holy text written on it",
        duration: "Conc, 10 min",
        description: "1 creature gains +2 AC for the duration",
        descriptionFull:
            "A shimmering field appears and surrounds a creature of your choice within range, granting it a +2 bonus to AC for the duration."
    },
    shillelagh: {
        name: "Shillelagh",
        classes: ["druid"],
        source: [["SRD", 179], ["P", 275]],
        level: 0,
        school: "Trans",
        time: "1 bns",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "Mistletoe, a shamrock leaf, and a club or quarterstaff",
        duration: "1 min",
        description:
            "Club/quarterstaff I hold does 1d8 dmg and uses my spellcasting ability modifier instead of Str",
        descriptionFull:
            "The wood of a club or quarterstaff you are holding is imbued with nature's power. For the duration, you can use your spellcasting ability instead of Strength for the attack and damage rolls of melee attacks using that weapon, and the weapon's damage die becomes a d8. The weapon also becomes magical, if it isn't already. The spell ends if you cast it again or if you let go of the weapon."
    },
    "shocking grasp": {
        name: "Shocking Grasp",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 179], ["P", 275]],
        level: 0,
        school: "Evoc",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "Instantaneous",
        description:
            "Spell attack, adv. if metal armor, 1d8 Lightning dmg, no rea 1 turn; +1d8 at CL 5, 11, and 17",
        descriptionCantripDie:
            "Spell attack, adv. if metal armor, `CD`d8 Lightning dmg, no rea 1 turn",
        descriptionFull:
            "Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target. You have advantage on the attack roll if the target is wearing armor made of metal. On a hit, the target takes 1d8 lightning damage, and it can't take reactions until the start of its next turn." +
            "\n   " +
            "The spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
    },
    silence: {
        name: "Silence",
        classes: ["bard", "cleric", "ranger"],
        source: [["SRD", 179], ["P", 275]],
        ritual: true,
        level: 2,
        school: "Illus",
        time: "1 a",
        range: "120 ft",
        components: "V,S",
        duration: "Conc, 10 min",
        description:
            "20-ft rad no sound propagates; all within deafened, immune to Thunder dmg, can't use verbal comp.",
        descriptionFull:
            "For the duration, no sound can be created within or pass through a 20-foot-radius sphere centered on a point you choose within range. Any creature or object entirely inside the sphere is immune to thunder damage, and creatures are deafened while entirely inside it. Casting a spell that includes a verbal component is impossible there."
    },
    "silent image": {
        name: "Silent Image",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 179], ["P", 276]],
        level: 1,
        school: "Illus",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M",
        compMaterial: "A bit of fleece",
        duration: "Conc, 10 min",
        description:
            "15-ft cube illusion includes visible; 1 a move it; Int(Investigation) check vs. spell DC; see book",
        descriptionFull:
            "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 15-foot cube. The image appears at a spot within range and lasts for the duration. The image is purely visual, it isn't accompanied by sound, smell, or other sensory effects." +
            "\n   " +
            "You can use your action to cause the image to move to any spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking." +
            "\n   " +
            "Physical interaction with the image reveals it to be an illusion, because things can pass through it. A creature that uses its action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image."
    },
    simulacrum: {
        name: "Simulacrum",
        classes: ["wizard"],
        source: [["SRD", 180], ["P", 276]],
        level: 7,
        school: "Illus",
        time: "12 h",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial:
            "Snow or ice in quantities sufficient to made a life-size copy of the duplicated creature; some hair, fingernail clippings, or other piece of that creature's body placed inside the snow or ice; and powdered ruby worth 1,500 gp, sprinkled over the duplicate and consumed by the spell",
        duration: "Till dispelled",
        description:
            "Create snow/ice duplicate of humanoid/beast; follows my verbal commands; see B (1500gp cons.)",
        descriptionFull:
            "You shape an illusory duplicate of one beast or humanoid that is within range for the entire casting time of the spell. The duplicate is a creature, partially real and formed from ice or snow, and it can take actions and otherwise be affected as a normal creature. It appears to be the same as the original, but it has half the creature's hit point maximum and is formed without any equipment. Otherwise, the illusion uses all the statistics of the creature it duplicates, except that it is a construct." +
            "\n   " +
            "The simulacrum is friendly to you and creatures you designate. It obeys your spoken commands, moving and acting in accordance with your wishes and acting on your turn in combat. The simulacrum lacks the ability to learn or become more powerful, so it never increases its level or other abilities, nor can it regain expended spell slots." +
            "\n   " +
            "If the simulacrum is damaged, you can repair it in an alchemical laboratory, using rare herbs and minerals worth 100 gp per hit point it regains. The simulacrum lasts until it drops to 0 hit points, at which point it reverts to snow and melts instantly." +
            "\n   " +
            "If you cast this spell again, any currently active duplicates you created with this spell are instantly destroyed."
    },
    sleep: {
        name: "Sleep",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 180], ["P", 276]],
        level: 1,
        school: "Ench",
        time: "1 a",
        range: "90 ft",
        components: "V,S,M",
        compMaterial: "A pinch of find sand, rose petals, or a cricket",
        duration: "1 min",
        description:
            "20-ft rad 5d8+2d8/SL HP of conscious creatures fall asleep, starting with the lowest current HP crea",
        descriptionFull:
            "This spell sends creatures into a magical slumber. Roll 5d8, the total is how many hit points of creatures this spell can affect. Creatures within 20 feet of a point you choose within range are affected in ascending order of their current hit points (ignoring unconscious creatures)." +
            "\n   " +
            "Starting with the creature that has the lowest current hit points, each creature affected by this spell falls unconscious until the spell ends, the sleeper takes damage, or someone uses an action to shake or slap the sleeper awake. Subtract each creature's hit points from the total before moving on to the creature with the next lowest hit points. A creature's hit points must be equal to or less than the remaining total for that creature to be affected." +
            "\n   " +
            "Undead and creatures immune to being charmed aren't affected by this spell." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, roll an additional 2d8 for each slot level above 1st."
    },
    "sleet storm": {
        name: "Sleet Storm",
        classes: ["druid", "sorcerer", "wizard"],
        source: [["SRD", 180], ["P", 276]],
        level: 3,
        school: "Conj",
        time: "1 a",
        range: "150 ft",
        components: "V,S,M",
        compMaterial: "A pinch of dust and a few drops of water",
        duration: "Conc, 1 min",
        save: "Dex",
        description:
            "40-ft rad 20-ft high; heavily obsc.; douses flames; difficult ter.; save or prone; Con save or lose conc.",
        descriptionFull:
            "Until the spell ends, freezing rain and sleet fall in a 20-foot-tall cylinder with a 40-foot radius centered on a point you choose within range. The area is heavily obscured, and exposed flames in the area are doused." +
            "\n   " +
            "The ground in the area is covered with slick ice, making it difficult terrain. When a creature enters the spell's area for the first time on a turn or starts its turn there, it must make a Dexterity saving throw. On a failed save, it falls prone." +
            "\n   " +
            "If a creature starts its turn in the spell's area and is concentrating on a spell, the creature must make a successful Constitution saving throw against your spell save DC or lose concentration"
    },
    slow: {
        name: "Slow",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 180], ["P", 277]],
        level: 3,
        school: "Trans",
        time: "1 a",
        range: "120 ft",
        components: "V,S,M",
        compMaterial: "A drop of molasses",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "6 crea in 40-ft cube save or half spd, -2 AC, -2 Dex saves, no rea, only 1 a or bns a, 1 atk; see book",
        descriptionFull:
            "You alter time around up to six creatures of your choice in a 40-foot cube within range. Each target must succeed on a Wisdom saving throw or be affected by this spell for the duration." +
            "\n   " +
            "An affected target's speed is halved, it takes a -2 penalty to AC and Dexterity saving throws, and it can't use reactions. On its turn, it can use either an action or a bonus action, not both. Regardless of the creature's abilities or magic items, it can't make more than one melee or ranged attack during its turn." +
            "\n   " +
            "If the creature attempts to cast a spell with a casting time of 1 action, roll a d20. On an 11 or higher, the spell doesn't take effect until the creature's next turn, and the creature must use its action on that turn to complete the spell. If it can't, the spell is wasted." +
            "\n   " +
            "A creature affected by this spell makes another Wisdom saving throw at the end of each of its turns. On a successful save, the effect ends for it."
    },
    "spare the dying": {
        name: "Spare the Dying",
        classes: ["cleric"],
        source: [["SRD", 181], ["P", 277]],
        level: 0,
        school: "Necro",
        time: "1 a",
        range: "Touch",
        components: "V,S",
        duration: "Instantaneous",
        description: "1 living creature with 0 current HP becomes stable",
        descriptionFull:
            "You touch a living creature that has 0 hit points. The creature becomes stable. This spell has no effect on undead or constructs."
    },
    "speak with animals": {
        name: "Speak with Animals",
        classes: ["bard", "druid", "ranger"],
        source: [["SRD", 181], ["P", 277]],
        ritual: true,
        level: 1,
        school: "Div",
        time: "1 a",
        range: "Self",
        components: "V,S",
        duration: "10 min",
        description:
            "Speak verbally with and understand beasts for duration; interaction limited by intelligence of beasts",
        descriptionFull:
            "You gain the ability to comprehend and verbally communicate with beasts for the duration. The knowledge and awareness of many beasts is limited by their intelligence, but at minimum, beasts can give you information about nearby locations and monsters, including whatever they can perceive or have perceived within the past day. You might be able to persuade a beast to perform a small favor for you, at the DM's discretion."
    },
    "speak with dead": {
        name: "Speak with Dead",
        classes: ["bard", "cleric"],
        source: [["SRD", 181], ["P", 277]],
        level: 3,
        school: "Necro",
        time: "1 a",
        range: "10 ft",
        components: "V,S,M",
        compMaterial: "Burning incense",
        duration: "10 min",
        description:
            "1 corpse with mouth answers 5 questions with what it knew in life; can cast on same every 10 days",
        descriptionFull:
            "You grant the semblance of life and intelligence to a corpse of your choice within range, allowing it to answer the questions you pose. The corpse must still have a mouth and can't be undead. The spell fails if the corpse was the target of this spell within the last 10 days." +
            "\n   " +
            "Until the spell ends, you can ask the corpse up to five questions. The corpse knows only what it knew in life, including the languages it knew. Answers are usually brief, cryptic, or repetitive, and the corpse is under no compulsion to offer a truthful answer if you are hostile to it or it recognizes you as an enemy. This spell doesn't return the creature's soul to its body, only its animating spirit. Thus, the corpse can't learn new information, doesn't comprehend anything that has happened since it died, and can't speculate about future events."
    },
    "speak with plants": {
        name: "Speak with Plants",
        classes: ["bard", "druid", "ranger"],
        source: [["SRD", 181], ["P", 277]],
        level: 3,
        school: "Trans",
        time: "1 a",
        range: "30-ft rad",
        components: "V,S",
        duration: "10 min",
        description:
            "Speak with plants in range about last 24h events; turn difficult plant terrain to normal or vice versa",
        descriptionFull:
            "You imbue plants within 30 feet of you with limited sentience and animation, giving them the ability to communicate with you and follow your simple commands. You can question plants about events in the spell's area within the past day, gaining information about creatures that have passed, weather, and other circumstances." +
            "\n   " +
            "You can also turn difficult terrain caused by plant growth (such as thickets and undergrowth) into ordinary terrain that lasts for the duration. Or you can turn ordinary terrain where plants are present into difficult terrain that lasts for the duration, causing vines and branches to hinder pursuers, for example." +
            "\n   " +
            "Plants might be able to perform other tasks on your behalf, at the DM's discretion. The spell doesn't enable plants to uproot themselves and move about, but they can freely move branches, tendrils, and stalks." +
            "\n   " +
            "If a plant creature is in the area, you can communicate with it as if you shared a common language, but you gain no magical ability to influence it." +
            "\n   " +
            "This spell can cause the plants created by the entangle spell to release a restrained creature."
    },
    "spider climb": {
        name: "Spider Climb",
        classes: ["sorcerer", "warlock", "wizard"],
        source: [["SRD", 182], ["P", 277]],
        level: 2,
        school: "Trans",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial: "A drop of bitumen and a spider",
        duration: "Conc, 1 h",
        description:
            "1 gains climbing speed equal to walking speed; can go on walls and ceilings with hands free",
        descriptionFull:
            "Until the spell ends, one willing creature you touch gains the ability to move up, down, and across vertical surfaces and upside down along ceilings, while leaving its hands free. The target also gains a climbing speed equal to its walking speed."
    },
    "spike growth": {
        name: "Spike Growth",
        classes: ["druid", "ranger"],
        source: [["SRD", 182], ["P", 277]],
        level: 2,
        school: "Trans",
        time: "1 a",
        range: "150 ft",
        components: "V,S,M",
        compMaterial:
            "Seven sharp thorns or seven small twigs, each sharpened to a point",
        duration: "Conc, 10 min",
        description:
            "20-ft rad difficult terrain; all 2d4 Piercing dmg per 5 ft moved; Wis(Perc) vs. Spell DC to recognize",
        descriptionFull:
            "The ground in a 20-foot radius centered on a point within range twists and sprouts hard spikes and thorns. The area becomes difficult terrain for the duration. When a creature moves into or within the area, it takes 2d4 piercing damage for every 5 feet it travels." +
            "\n   " +
            "The transformation of the ground is camouflaged to look natural. Any creature that can't see the area at the time the spell is cast must make a Wisdom (Perception) check against your spell save DC to recognize the terrain as hazardous before entering it."
    },
    "spirit guardians": {
        name: "Spirit Guardians",
        classes: ["cleric"],
        source: [["SRD", 182], ["P", 278]],
        level: 3,
        school: "Conj",
        time: "1 a",
        range: "15-ft rad",
        components: "V,S,M",
        compMaterial: "A holy symbol",
        duration: "Conc, 10 min",
        save: "Wis",
        description:
            "Undesignated crea start turn/enter in area half speed, 3d8+1d8/SL Radiant/Necrotic dmg; save half",
        descriptionFull:
            "You call forth spirits to protect you. They flit around you to a distance of 15 feet for the duration. If you are good or neutral, their spectral form appears angelic or fey (your choice). If you are evil, they appear fiendish." +
            "\n   " +
            "When you cast this spell, you can designate any number of creatures you can see to be unaffected by it. An affected creature's speed is halved in the area, and when the creature enters the area for the first time on a turn or starts its turn there, it must make a Wisdom saving throw. On a failed save, the creature takes 3d8 radiant damage (if you are good or neutral) or 3d8 necrotic damage (if you are evil). On a successful save, the creature takes half as much damage." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d8 for each slot level above 3rd."
    },
    "spiritual weapon": {
        name: "Spiritual Weapon",
        classes: ["cleric"],
        source: [["SRD", 182], ["P", 278]],
        level: 2,
        school: "Evoc",
        time: "1 bns",
        range: "60 ft",
        components: "V,S",
        duration: "1 min",
        description:
            "Create weapon; spell atk 1d8+1d8/2SL+ability modifier Force dmg; bns a to move 20 ft and/or attack",
        descriptionFull:
            "You create a floating, spectral weapon within range that lasts for the duration or until you cast this spell again. When you cast the spell, you can make a melee spell attack against a creature within 5 feet of the weapon. On a hit, the target takes force damage equal to 1d8 + your spellcasting ability modifier." +
            "\n   " +
            "As a bonus action on your turn, you can move the weapon up to 20 feet and repeat the attack against a creature within 5 feet of it." +
            "\n   " +
            "The weapon can take whatever form you choose. Clerics of deities who are associated with a particular weapon (as St. Cuthbert is known for his mace and Thor for his hammer) make this spell's effect resemble that weapon." +
            AtHigherLevels +
            "When you cast this spell using a spell slot 3rd level of or higher, the damage increases by 1d8 for every two slot levels above the 2nd."
    },
    "stinking cloud": {
        name: "Stinking Cloud",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 182], ["P", 278]],
        level: 3,
        school: "Conj",
        time: "1 a",
        range: "90 ft",
        components: "V,S,M",
        compMaterial: "A rotten egg or several skunk cabbage leaves",
        duration: "Conc, 1 min",
        save: "Con",
        description:
            "20-ft rad; ignores cover, heavily obscures; all in area at start of turn save against poison or can't act",
        descriptionFull:
            "You create a 20-foot-radius sphere of yellow, nauseating gas centered on a point within range. The cloud spreads around corners, and its area is heavily obscured. The cloud lingers in the air for the duration." +
            "\n   " +
            "Each creature that is completely within the cloud at the start of its turn must make a Constitution saving throw against poison. On a failed save, the creature spends its action that turn retching and reeling. Creatures that don't need to breathe or are immune to poison automatically succeed on this saving throw." +
            "\n   " +
            "A moderate wind (at least 10 miles per hour) disperses the cloud after 4 rounds. A strong wind (at least 20 miles per hour) disperses it after 1 round."
    },
    "stone shape": {
        name: "Stone Shape",
        classes: ["cleric", "druid", "wizard"],
        source: [["SRD", 183], ["P", 278]],
        level: 4,
        school: "Trans",
        time: "1 a",
        range: "Touch",
        components: "V,S,M",
        compMaterial:
            "Soft clay, which must be worked into roughly the desired shape of the stone object",
        duration: "Instantaneous",
        description:
            "Form 5 cu ft of stone into any shape; can have up to two hinges and a latch, but no finer mechanisms",
        descriptionFull:
            "You touch a stone object of Medium size or smaller or a section of stone no more than 5 feet in any dimension and form it into any shape that suits your purpose. So, for example, you could shape a large rock into a weapon, idol, or coffer, or make a small passage through a wall, as long as the wall is less than 5 feet thick. You could also shape a stone door or its frame to seal the door shut. The object you create can have up to two hinges and a latch, but finer mechanical detail isn't possible."
    },
    stoneskin: {
        name: "Stoneskin",
        classes: ["druid", "ranger", "sorcerer", "wizard"],
        source: [["SRD", 183], ["P", 278]],
        level: 4,
        school: "Abjur",
        time: "1 a",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial: "Diamond dust worth 100 gp, which the spell consumes",
        duration: "Conc, 1 h",
        description:
            "1 willing crea resistance to nonmagical Bludgeoning, Piercing, and Slashing dmg (100gp cons.)",
        descriptionFull:
            "This spell turns the flesh of a willing creature you touch as hard as stone. Until the spell ends, the target has resistance to nonmagical bludgeoning, piercing, and slashing damage."
    },
    "storm of vengeance": {
        name: "Storm of Vengeance",
        classes: ["druid"],
        source: [["SRD", 183], ["P", 279]],
        level: 9,
        school: "Conj",
        time: "1 a",
        range: "Sight",
        components: "V,S",
        duration: "Conc, 1 min",
        save: "Con",
        description:
            "360-ft rad all save or 2d6 Thunder dmg and deafened for 5 min; effect changes every round; see book",
        descriptionFull:
            "A churning storm cloud forms, centered on a point you can see and spreading to a radius of 360 feet. Lightning flashes in the area, thunder booms, and strong winds roar. Each creature under the cloud (no more than 5,000 feet beneath the cloud) when it appears must make a Constitution saving throw. On a failed save, a creature takes 2d6 thunder damage and becomes deafened for 5 minutes." +
            "\n   " +
            "Each round you maintain concentration on this spell, the storm produces different effects on your turn." +
            "\n   " +
            toUni("Round 2") +
            ": Acidic rain falls from the cloud. Each creature and object under the cloud takes 1d6 acid damage." +
            "\n   " +
            toUni("Round 3") +
            ": You call six bolts of lightning from the cloud to strike six creatures or objects of your choice beneath the cloud. A given creature or object can't be struck by more than one bolt. A struck creature must make a Dexterity saving throw. The creature takes 10d6 lightning damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            toUni("Round 4") +
            ": Hailstones rain down from the cloud. Each creature under the cloud takes 2d6 bludgeoning damage." +
            "\n   " +
            toUni("Round 5-10") +
            ": Gusts and freezing rain assail the area under the cloud. the area becomes difficult terrain and is heavily obscured. Each creature there takes 1d6 cold damage. Ranged weapon attacks in the area are impossible. The wind and rain count as a severe distraction for the purposes of maintaining concentration on spells. Finally, gusts of strong wind (ranging from 20 to 50 miles per hour) automatically disperse fog, mists, and similar phenomena in the area whether mundane or magical."
    },
    suggestion: {
        name: "Suggestion",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 183], ["P", 279]],
        level: 2,
        school: "Ench",
        time: "1 a",
        range: "30 ft",
        components: "V,M",
        compMaterial:
            "A snake's tongue and either a bit of honeycomb or a drop of sweet oil",
        duration: "Conc, 8 h",
        save: "Wis",
        description:
            "1 crea save or follow understood reasonable stated course of action; ends if I or allies harm target",
        descriptionFull:
            "You suggest a course of activity (limited to a sentence or two) and magically influence a creature you can see within range that can hear and understand you. Creatures that can't be charmed are immune to this effect. The suggestion must be worded in such a manner as to make the course of action sound reasonable. Asking the creature to stab itself, throw itself onto a spear, immolate itself, or do some other obviously harmful act ends the spell." +
            "\n   " +
            "The target must make a Wisdom saving throw. On a failed save, it pursues the course of action you described to the best of its ability. The suggested course of action can continue for the entire duration. If the suggested activity can be completed in a shorter time, the spell ends when the subject finishes what it was asked to do." +
            "\n   " +
            "You can also specify conditions that will trigger a special activity during the duration. For example, you might suggest that a knight give her warhorse to the first beggar she meets. If the condition isn't met before the spell expires, the activity isn't performed." +
            "\n   " +
            "If you or any of your companions damage the target, the spell ends."
    },
    sunbeam: {
        name: "Sunbeam",
        classes: ["druid", "sorcerer", "wizard"],
        source: [["SRD", 184], ["P", 279]],
        level: 6,
        school: "Evoc",
        time: "1 a",
        range: "60-ft line",
        components: "V,S,M",
        compMaterial: "A magnifying glass",
        duration: "Conc, 1 min",
        save: "Con",
        description:
            "60-ft long 5-ft wide all 6d8 Radiant dmg, 1 rnd blind; save halves and not blinded; 1 a for new line",
        descriptionFull:
            "A beam of brilliant light flashes out from your hand in a 5-foot-wide, 60-foot-line. Each creature in the line must make a Constitution saving throw. On a failed save, a creature takes 6d8 radiant damage and is blinded until your next turn. On a successful save, it takes half as much damage and isn't blinded by this spell. Undead and oozes have disadvantage on this saving throw." +
            "\n   " +
            "You can create a new line of radiance as your action on any turn until the spell ends." +
            "\n   " +
            "For the duration, a mote of brilliant radiance shines in your hand. It sheds bright light in a 30-foot radius and dim light for an additional 30 feet. The light is sunlight."
    },
    sunburst: {
        name: "Sunburst",
        classes: ["druid", "sorcerer", "wizard"],
        source: [["SRD", 184], ["P", 279]],
        level: 8,
        school: "Evoc",
        time: "1 a",
        range: "150 ft",
        components: "V,S,M",
        compMaterial: "Fire and a piece of sunstone",
        duration: "Instantaneous",
        save: "Con",
        description:
            "60-ft rad all 12d6 Radiant dmg, 1 min blind; save halves and not blinded; save at end of each turn",
        descriptionFull:
            "Brilliant sunlight flashes in a 60-foot radius centered on a point you choose within range. Each creature in that light must make a Constitution saving throw. On a failed save, a creature takes 12d6 radiant damage and is blinded for 1 minute. On a successful save, it takes half as much damage and isn't blinded by this spell. Undead and oozes have disadvantage on this saving throw." +
            "\n   " +
            "A creature blinded by this spell makes another Constitution saving throw at the end of each of its turns. On a successful save, it is no longer blinded." +
            "\n   " +
            "This spell dispels any darkness in its area that was created by a spell."
    },
    symbol: {
        name: "Symbol",
        classes: ["bard", "cleric", "wizard"],
        source: [["SRD", 184], ["P", 280]],
        level: 7,
        school: "Abjur",
        time: "1 min",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial:
            "Mercury, phosphorus, and powdered diamond and opal with a total value of at least 1,000 gp, which the spell consumes",
        duration: "Till triggered",
        description:
            "Inscribe a glyph to activate for chosen effect on set trigger; see book (1000gp cons.)",
        descriptionFull:
            "When you cast this spell, you inscribe a harmful glyph either on a surface (such as a section of floor, a wall, or a table) or within an object that can be closed to conceal the glyph (such as a book, a scroll, or a treasure chest). If you choose a surface, the glyph can cover an area of the surface no larger than 10 feet in diameter. If you choose an object, that object must remain in its place, if the object is moved more than 10 feet from where you cast this spell, the glyph is broken, and the spell ends without being triggered." +
            "\n   " +
            "The glyph is nearly invisible, requiring an Intelligence (Investigation) check against your spell save DC to find it." +
            "\n   " +
            "You decide what triggers the glyph when you cast the spell. For glyphs inscribed on a surface, the most typical triggers include touching or stepping on the glyph, removing another object covering it, approaching within a certain distance of it, or manipulating the object that holds it. For glyphs inscribed within an object, the most common triggers are opening the object, approaching within a certain distance of it, or seeing or reading the glyph." +
            "\n   " +
            "You can further refine the trigger so the spell is activated only under certain circumstances or according to a creature's physical characteristics (such as height or weight), or physical kind (for example, the ward could be set to affect hags or shapechangers). You can also specify creatures that don't trigger the glyph, such as those who say a certain password." +
            "\n   " +
            "When you inscribe the glyph, choose one of the options below for its effect. Once triggered, the glyph glows, filling a 60-foot-radius sphere with dim light for 10 minutes, after which time the spell ends. Each creature in the sphere when the glyph activates is targeted by its effect, as is a creature that enters the sphere for the first time on a turn or ends its turn there." +
            "\n   " +
            toUni("Death") +
            ": Each target must make a Constitution saving throw, taking 10d10 necrotic damage on a failed save, or half as much damage on a successful save." +
            "\n   " +
            toUni("Discord") +
            ": Each target must make a Constitution saving throw. On a failed save, a target bickers and argues with other creatures for 1 minute. During this time, it is incapable of meaningful communication and has disadvantage on attack rolls and ability checks." +
            "\n   " +
            toUni("Fear") +
            ": Each target must make a Wisdom saving throw and becomes frightened for 1 minute on a failed save. While frightened, the target drops whatever it is holding and must move at least 30 feet away from the glyph on each of its turns, if able." +
            "\n   " +
            toUni("Hopelessness") +
            ": Each target must make a Charisma saving throw. On a failed save, the target is overwhelmed with despair for 1 minute. During this time, it can't attack or target any creature with harmful abilities, spells, or other magical effects." +
            "\n   " +
            toUni("Insanity") +
            ": Each target must make an Intelligence saving throw. On a failed save, the target is driven insane for 1 minute. An insane creature can't take actions, can't understand what other creatures say, can't read, and speaks only in gibberish. The DM controls its movement, which is erratic." +
            "\n   " +
            toUni("Pain") +
            ": Each target must make a Constitution saving throw and becomes incapacitated with excruciating pain for 1 minute on a failed save." +
            "\n   " +
            toUni("Sleep") +
            ": Each target must make a Wisdom saving throw and falls unconscious for 10 minutes on a failed save. A creature awakens if it takes damage or if someone uses an action to shake or slap it awake." +
            "\n   " +
            toUni("Stunning") +
            ": Each target must make a Wisdom saving throw and becomes stunned for 1 minute on a failed save."
    },
    "tasha's hideous laughter": {
        name: "Tasha's Hideous Laughter",
        nameAlt: "Hideous Laughter",
        classes: ["bard", "wizard"],
        source: [["SRD", 154], ["P", 280]],
        level: 1,
        school: "Ench",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "Tiny tarts and a feather that is waved in the air",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "1 crea with Int>4 save or fall prone, incapacitated, can't stand; save end of each turn or if taking dmg",
        descriptionFull:
            "A creature of your choice that you can see within range perceives everything as hilariously funny and falls into fits of laugher if this spell affects it. The target must succeed on a Wisdom saving throw of fall prone, becoming incapacitated and unable to stand up for the duration. A creature with an Intelligence score of 4 or less isn't affected." +
            "\n   " +
            "At the end of each of its turns, and each time it takes damage, the target can make another Wisdom saving throw. The target has advantage on the saving throw if it's triggered by damage. On a success, the spell ends."
    },
    telekinesis: {
        name: "Telekinesis",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 185], ["P", 280]],
        level: 5,
        school: "Trans",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "Conc, 10 min",
        description:
            "Move Huge creature or 1000 lb object 30 ft as 1 a; spellcasting ability check vs. Str check; see B",
        descriptionFull:
            "You gain the ability to move or manipulate creatures or objects by thought. When you cast the spell, and as your action each round for the duration, you can exert your will on one creature or object that you can see within range, causing the appropriate effect below. You can affect the same target round after round, or choose a new one at any time. If you switch targets, the prior target is no longer affected by the spell." +
            "\n   " +
            toUni("Creature") +
            ": You can try to move a Huge or smaller creature. Make an ability check with your spellcasting ability contested by the creature's Strength check. If you win the contest, you move the creature up to 30 feet in any direction, including upward but not beyond the range of this spell. Until the end of your next turn, the creature is restrained in your telekinetic grip. A creature lifted upward is suspended in mid-air." +
            "\n   " +
            "On subsequent rounds, you can use your action to attempt to maintain your telekinetic grip on the creature by repeating the contest." +
            "\n   " +
            toUni("Object") +
            ": You can try to move an object that weighs up to 1,000 pounds. If the object isn't being worn or carried, you automatically move it up to 30 feet in any direction, but not beyond the range of this spell." +
            "\n   " +
            "If the object is worn or carried by a creature, you must make an ability check with your spellcasting ability contested by that creature's Strength check. If you succeed, you pull the object away from that creature and can move it up to 30 feet in any direction but not beyond the range of this spell." +
            "\n   " +
            "You can exert fine control on objects with your telekinetic grip, such as manipulating a simple tool, opening a door or a container, stowing or retrieving an item from an open container, or pouring the contents from a vial."
    },
    teleport: {
        name: "Teleport",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 185], ["P", 281]],
        level: 7,
        school: "Conj",
        time: "1 a",
        range: "10 ft",
        components: "V",
        duration: "Instantaneous",
        description:
            "I + 8 willing crea, or an object teleport to a place I know, have seen, or can describe; see book",
        descriptionFull:
            [
                "This spell instantly transports you and up to eight willing creatures of your choice that you can see within range, or a single object that you can see within range, to a destination you select. If you target an object, it must be able to fit entirely inside a 10-foot cube, and it can't be held or carried by an unwilling creature. The destination you choose must be known to you, and it must be on the same plane of existence as you. Your familiarity with the destination determines whether you arrive there successfully. The DM rolls d100 and consults the table.\n",
                toUni("Familiarity\tMishap\tSimilar\t  Off\t   On"),
                "\t\t\t  " + toUni("Area\tTarget\tTarget"),
                "Permanent Circle\t    -\t    -\t    -\t01-100",
                "Associated Object\t    -\t    -\t    -\t01-100",
                "Very Familiar\t01-05\t06-13\t14-24\t25-100",
                "Seen Casually\t01-33\t34-43\t44-53\t54-100",
                "Viewed Once\t01-43\t44-53\t54-73\t74-100",
                "Description\t01-43\t44-53\t54-73\t74-100",
                "False Description\t01-50\t51-100\t    -\t    -\n"
            ].join("\n") +
            desc([
                toUni("Familiarity") +
                    ': "Permanent Circle" means a permanent teleportation circle whose sigil sequence you know. "Associated Object" means that you possess an object taken from the desired destination within the last six months, such as a book from a wizard\'s library, bed linen from a royal suite, or a chunk of marble from a Lich\'s secret tomb.',
                '"Very Familiar" is a place you have been very often, a place you have carefully studied, or a place you can see when you cast the spell. "Seen Casually" is some place you have seen more than once but with which you aren\'t very familiar. "Viewed Once" is a place you have seen once, possibly using magic. "Description" is a place whose location and appearance you know through someone else\'s description, perhaps from a map.',
                "\"False Description\" is a place that doesn't exist. Perhaps you tried to scry an enemy's sanctum but instead viewed an illusion, or you are attempting to teleport to a familiar location that no longer exists.",
                toUni("On Target") +
                    ": You and your group (or the target object) appear where you want to go.",
                toUni("Off Target") +
                    ": You and your group (or the target object) appear a random distance away from the destination in a random direction. Distance off target is 1d10 \u00D7 1d10 percent of the distance that was to be travelled. For example, if you tried to travel 120 miles, landed off target, and rolled a 5 and 3 on the two d10s, then you would be off target by 15 percent, or 18 miles. The DM determines the direction off target randomly by rolling a d8 and designating 1 as north, 2 as north-east, 3 as east, and so on around the points of the compass. If you were teleporting to a coastal city and wound up 18 miles out at sea, you could be in trouble.",
                toUni("Similar Area") +
                    ": You and your group (or the target object) wind up in a different area that's visually or thematically similar to the target area. If you are heading for your home laboratory, for example, you might wind up in another wizard's laboratory or in an alchemical supply shop that has many of the same tools and implements as your laboratory. Generally, you appear in the closest similar place, but since the spell has no range limit, you could conceivably wind up anywhere on the plane.",
                toUni("Mishap") +
                    ": The spell's unpredictable magic results in a difficult journey. Each teleporting creature (or the target object) takes 3d10 force damage and the DM rerolls on the table to see where you wind up (multiple mishaps can occur, dealing damage each time)."
            ])
    },
    "teleportation circle": {
        name: "Teleportation Circle",
        classes: ["bard", "sorcerer", "wizard"],
        source: [["SRD", 186], ["P", 281]],
        level: 5,
        school: "Conj",
        time: "1 min",
        range: "10 ft",
        components: "V,M\u2020",
        compMaterial:
            "Rare chalks and inks infused with precious gems with 50 gp, which the spell consumes",
        duration: "1 rnd",
        description:
            "Create a circle to teleport to another teleportation circle on same plane; see book (50gp cons.)",
        descriptionFull:
            "As you cast the spell, you draw a 10-foot-diameter circle on the ground inscribed with sigils that link your location to a permanent teleportation circle of your choice whose sigil sequence you know and that is on the same plane of existence as you. A shimmering portal opens within the circle you drew and remains open until the end of your next turn. Any creature that enters the portal instantly appears within 5 feet of the destination circle or in the nearest unoccupied space if that space is occupied." +
            "\n   " +
            "Many major temples, guilds, and other important places have permanent teleportation circles inscribed somewhere within their confines. Each such circle includes a unique sigil sequence - a string of magical runes arranged in a particular pattern. When you first gain the ability to cast this spell, you learn the sigil sequences for two destinations on the Material Plane, determined by the DM. You can learn additional sigil sequences during your adventures. You can commit a new sigil sequence to memory after studying it for 1 minute." +
            "\n   " +
            "You can create a permanent teleportation circle by casting this spell in the same location every day for one year. You need not use the circle to teleport when you cast the spell in this way."
    },
    "tenser's floating disk": {
        name: "Tenser's Floating Disk",
        nameAlt: "Floating Disk",
        classes: ["wizard"],
        source: [["SRD", 146], ["P", 282]],
        ritual: true,
        level: 1,
        school: "Conj",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "A drop of mercury",
        duration: "1 h",
        description:
            "Create a 3 ft diameter disk that carries 500 lb and follows me if I move more than 20 ft away",
        descriptionFull:
            "This spell creates a circular, horizontal plane of force, 3 feet in diameter and 1 inch thick, that floats 3 feet above the ground in an unoccupied space of your choice that you can see within range. The disk remains for the duration, and can hold up to 500 pounds. If more weight is placed on it, the spell ends, and everything on the disk falls to the ground." +
            "\n   " +
            "The disk is immobile while you are within 20 feet of it. If you move more than 20 feet away from it, the disk follows you so that it remains within 20 feet of you. It can more across uneven terrain, up or down stairs, slopes and the like, but it can't cross an elevation change of 10 feet or more. For example, the disk can't move across a 10-foot-deep pit, nor could it leave such a pit if it was created at the bottom." +
            "\n   " +
            "If you move more than 100 feet from the disk (typically because it can't move around an obstacle to follow you), the spell ends."
    },
    thaumaturgy: {
        name: "Thaumaturgy",
        classes: ["cleric"],
        source: [["SRD", 187], ["P", 282]],
        level: 0,
        school: "Trans",
        time: "1 a",
        range: "30 ft",
        components: "V",
        duration: "1 min (D)",
        description:
            "Minor wonder; my voice booms, flames flicker, tremors in the ground, ominous sounds, etc.",
        descriptionFull:
            "You manifest a minor wonder, a sign of supernatural power, within range. You create one of the following magical effects within range." +
            "\n " +
            "\u2022 Your voice booms up to three times as loud as normal for 1 minute." +
            "\n " +
            "\u2022 You cause flames to flicker, brighten, dim, or change color for 1 minute." +
            "\n " +
            "\u2022 You cause harmless tremors in the ground for 1 minute." +
            "\n " +
            "\u2022 You create an instantaneous sound that originates from a point of your choice within range, such as a rumble of thunder, the cry of a raven, or ominous whispers." +
            "\n " +
            "\u2022 You instantaneously cause an unlocked door or window to fly open or slam shut." +
            "\n " +
            "\u2022 You alter the appearance of your eyes for 1 minute." +
            "\n\n" +
            "If you cast this spell multiple times, you can have up to three of its 1-minute effects active at a time, and you can dismiss such an effect as an action."
    },
    thunderwave: {
        name: "Thunderwave",
        classes: ["bard", "druid", "sorcerer", "wizard"],
        source: [["SRD", 187], ["P", 282]],
        level: 1,
        school: "Evoc",
        time: "1 a",
        range: "15-ft cube",
        components: "V,S",
        duration: "Instantaneous",
        save: "Con",
        description:
            "All crea/obj in area 2d8+1d8/SL Thunder dmg, pushed 10 ft away; save halves and not pushed",
        descriptionFull:
            "A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much damage and isn't pushed." +
            "\n   " +
            "In addition, unsecured objects that are completely within the area of effect are automatically pushed 10 feet away from you by the spell's effect, and the spell emits a thunderous boom audible out to 300 feet." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st."
    },
    "time stop": {
        name: "Time Stop",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 187], ["P", 283]],
        level: 9,
        school: "Trans",
        time: "1 a",
        range: "Self",
        components: "V",
        duration: "Instantaneous",
        description:
            "I instantly take 1d4+1 turns; if affecting other creatures or worn or carried object the spell ends",
        descriptionFull:
            "You briefly stop the flow of time for everyone but yourself. No time passes for other creatures, while you take 1d4+1 turns in a row, during which you can use actions and move as normal." +
            "\n   " +
            "This spell ends if one of the actions you use during this period, or any effects that you create during this period, affects a creature other than you or an object being worn or carried by someone other than you. In addition, the spell ends if you move to a place more than 1,000 feet from the location where you cast it."
    },
    tongues: {
        name: "Tongues",
        classes: ["bard", "cleric", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 187], ["P", 283]],
        level: 3,
        school: "Div",
        time: "1 a",
        range: "Touch",
        components: "V,M",
        compMaterial: "A small clay model of a ziggurat",
        duration: "1 h",
        description:
            "1 crea understands all spoken languages, all with a language can understand what it means",
        descriptionFull:
            "This spell grants the creature you touch the ability to understand any spoken language it hears. Moreover, when the target speaks, any creature that knows at least one language and can hear the target understands what it says."
    },
    "transport via plants": {
        name: "Transport via Plants",
        classes: ["druid"],
        source: [["SRD", 188], ["P", 283]],
        level: 6,
        school: "Conj",
        time: "1 a",
        range: "10 ft",
        components: "V,S",
        duration: "1 rnd",
        description:
            "For duration all can transport from a Large plant to a plant on the same plane that I have touched",
        descriptionFull:
            "This spell creates a magical link between a Large or larger inanimate plant within range and another plant, at any distance, on the same plane of existence. You must have seen or touched the destination plant at least once before. For the duration, any creature can step into the target plant and exit from the destination plant by using 5 feet of movement."
    },
    "tree stride": {
        name: "Tree Stride",
        classes: ["druid", "ranger"],
        source: [["SRD", 188], ["P", 283]],
        level: 5,
        school: "Conj",
        time: "1 a",
        range: "Self",
        components: "V,S",
        duration: "Conc, 1 min",
        description:
            "I can teleport 1/rnd for 5 ft move through a tree to another tree of the same kind within 500 ft",
        descriptionFull:
            "You gain the ability to enter a tree and move from inside it to inside another tree of the same kind within 500 feet. Both trees must be living and at least the same size as you. You must use 5 feet of movement to enter a tree. You instantly know the location of all other trees of the same kind within 500 feet and, as part of the move used to enter the tree, can either pass into one of those trees or step out of the tree you're in. You appear in a spot of your choice within 5 feet of the destination tree, using another 5 feet of movement. If you have no movement left, you appear within 5 feet of the tree you entered." +
            "\n   " +
            "You can use this transportation ability once per round for the duration. You must end each turn outside a tree."
    },
    "true polymorph": {
        name: "True Polymorph",
        classes: ["bard", "warlock", "wizard"],
        source: [["SRD", 188], ["P", 283]],
        level: 9,
        school: "Trans",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial:
            "A drop of mercury, a dollop of gum arabic, and a wisp of smoke",
        duration: "Conc, 1 h",
        save: "Wis",
        description:
            "1 crea/obj > 0 HP save or transformed into another crea/obj with equal CR or lower; see book",
        descriptionFull:
            "Choose one creature or nonmagical object that you can see within range. You transform the creature into a different creature, the creature into a nonmagical object, or the object into a creature (the object must be neither worn nor carried by another creature). The transformation lasts for the duration, or until the target drops to 0 hit points or dies. If you concentrate on this spell for the full duration, the transformation lasts until it is dispelled." +
            "\n   " +
            "This spell has no effect on a shapechanger or a creature with 0 hit points. An unwilling creature can make a Wisdom saving throw, and if it succeeds, it isn't affected by this spell." +
            "\n   " +
            toUni("Creature into Creature") +
            ": If you turn a creature into another kind of creature, the new form can be any kind you choose whose challenge rating is equal to or less than the target's (or its level, if the target doesn't have a challenge rating). The target's game statistics, including mental ability scores, are replaced by the statistics of the new form. It retains its alignment and personality." +
            "\n   " +
            "The target assumes the hit points of its new form, and when it reverts to its normal form, the creature returns to the number of hit points it had before it transformed. If it reverts as a result of dropping to 0 hit points, any excess damage carries over to its normal form. As long as the excess damage doesn't reduce the creature's normal form to 0 hit points, it isn't knocked unconscious." +
            "\n   " +
            "The creature is limited in the actions it can perform by the nature of its new form, and it can't speak, cast spells, or take any other action that requires hands or speech unless its new form is capable of such actions." +
            "\n   " +
            "The target's gear melds into the new form. The creature can't activate, use, wield, or otherwise benefit from any of its equipment." +
            "\n   " +
            toUni("Object into Creature") +
            ": You can turn an object into any kind of creature, as long as the creature's size is no larger than the object's size and the creature's challenge rating is 9 or lower. The creature is friendly to you and your companions. It acts on each of your turns. You decide what action it takes and how it moves. The DM has the creature's statistics and resolves all of its actions and movement." +
            "\n   " +
            "If the spell becomes permanent, you no longer control the creature. It might remain friendly to you, depending on how you have treated it." +
            "\n   " +
            toUni("Creature into Object") +
            ": If you turn a creature into an object, it transforms along with whatever it is wearing and carrying into that form, as long as the object's size is no larger than the creature's size. The creature's statistics become those of the object, and the creature has no memory of time spent in this form, after the spell ends and it returns to its normal form."
    },
    "true resurrection": {
        name: "True Resurrection",
        classes: ["cleric", "druid"],
        source: [["SRD", 189], ["P", 284]],
        level: 9,
        school: "Necro",
        time: "1 h",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial:
            "A sprinkle of holy water and diamonds worth at least 25,000 gp, which the spell consumes",
        duration: "Instantaneous",
        description:
            "Resurrects a creature, that has died in last 200 years, with new body; see book (25000gp cons.)",
        descriptionFull:
            "You touch a creature that has been dead for no longer than 200 years and that died for any reason except old age. If the creature's soul is free and willing, the creature is restored to life with all its hit points." +
            "\n   " +
            "This spell closes all wounds, neutralizes any poison, cures all diseases, and lifts any curses affecting the creature when it died. The spell replaces damaged or missing organs and limbs. If the creature was undead, it is restored to its non-undead form." +
            "\n   " +
            "The spell can even provide a new body if the original no longer exists, in which case you must speak the creature's name. The creature then appears in an unoccupied space you choose within 10 feet of you."
    },
    "true seeing": {
        name: "True Seeing",
        classes: ["bard", "cleric", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 189], ["P", 284]],
        level: 6,
        school: "Div",
        time: "1 a",
        range: "Touch",
        components: "V,S,M\u2020",
        compMaterial:
            "An ointment for the eyes that costs 25 gp, is made from mushroom powder, saffron, and fat, and is consumed by the spell",
        duration: "1 h",
        description:
            "1 willing crea gains truesight 120 ft; see through illusions, hidden doors, ethereal plane (25gp cons.)",
        descriptionFull:
            "This spell gives the willing creature you touch the ability to see things as they actually are. For the duration, the creature has truesight, notices secret doors hidden by magic, and can see into the Ethereal Plane, all out to a range of 120 feet."
    },
    "true strike": {
        name: "True Strike",
        classes: ["bard", "sorcerer", "warlock", "wizard"],
        source: [["SRD", 189], ["P", 284]],
        level: 0,
        school: "Div",
        time: "1 a",
        range: "30 ft",
        components: "S",
        duration: "Conc, 1 rnd",
        description:
            "1 creature against whom I gain advantage on my next attack roll",
        descriptionFull:
            "You extend your hand and point a finger at a target in range. Your magic grants you a brief insight into the target's defenses. On your next turn, you gain advantage on your first attack roll against the target, provided that this spell hasn't ended."
    },
    "unseen servant": {
        name: "Unseen Servant",
        classes: ["bard", "warlock", "wizard"],
        source: [["SRD", 189], ["P", 284]],
        ritual: true,
        level: 1,
        school: "Conj",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M",
        compMaterial: "A piece of string and a bit of wood",
        duration: "1 h",
        description:
            "Create a mindless, invisible, shapeless, Medium servant for simple tasks; bns a to mentally command it",
        descriptionFull:
            "This spell creates an invisible, mindless, shapeless, Medium force that performs simple tasks at your command until the spell ends. The servant springs into existence in an unoccupied space on the ground within range. It has AC 10, 1 hit point, and a Strength of 2, and it can't attack. If it drops to 0 hit points, the spell ends." +
            "\n   " +
            "Once on each of your turns as a bonus action, you can mentally command the servant to move up to 15 feet and interact with an object. The servant can perform simple tasks that a human servant could do, such as fetching things, cleaning, mending, folding clothes, lighting fires, serving food, and pouring wine. Once you give the command, the servant performs the task to the best of its ability until it completes the task, then waits for your next command." +
            "\n   " +
            "If you command the servant to perform a task that would move it more than 60 feet away from you, the spell ends."
    },
    "vampiric touch": {
        name: "Vampiric Touch",
        classes: ["warlock", "wizard"],
        source: [["SRD", 189], ["P", 285]],
        level: 3,
        school: "Necro",
        time: "1 a",
        range: "Self",
        components: "V,S",
        duration: "Conc, 1 min",
        description:
            "Spell attack each turn as 1 a for 3d6+1d6/SL Necrotic dmg; I heal half the damage dealt",
        descriptionFull:
            "The touch of your shadow-wreathed hand can siphon force from others to heal your wounds. Make a melee spell attack against a creature within your reach. On a hit, the target takes 3d6 necrotic damage, and you regain hit points equal to half the amount of necrotic damage dealt. Until the spell ends, you can make the attack again on each of your turns as an action." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd."
    },
    "vicious mockery": {
        name: "Vicious Mockery",
        classes: ["bard"],
        source: [["SRD", 189], ["P", 285]],
        level: 0,
        school: "Ench",
        time: "1 a",
        range: "60 ft",
        components: "V",
        duration: "Instantaneous",
        save: "Wis",
        description:
            "1 creature save or 1d4 Psychic dmg and dis. on next attack roll; +1d4 at CL 5, 11, and 17",
        descriptionCantripDie:
            "1 creature save or `CD`d4 Psychic dmg and dis. on next attack roll",
        descriptionFull:
            "You unleash a string of insults laced with subtle enchantments at a creature you can see within range. If the target can hear you (thought it need not understand you), it must succeed on a Wisdom saving throw or take 1d4 psychic damage and have disadvantage on the next attack roll it makes before the end of its next turn." +
            "\n   " +
            "This spell's damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4) and 17th level (4d4)."
    },
    "wall of fire": {
        name: "Wall of Fire",
        classes: ["druid", "sorcerer", "wizard"],
        source: [["SRD", 190], ["P", 285]],
        level: 4,
        school: "Evoc",
        time: "1 a",
        range: "120 ft",
        components: "V,S,M",
        compMaterial: "A small piece of phosphorus",
        duration: "Conc, 1 min",
        save: "Dex",
        description:
            "60\u00D71\u00D720ft (l\u00D7w\u00D7h) or 10-ft rad all in and 10 ft on 1 side 5d8+1d8/SL Fire dmg; save halves; see B",
        descriptionMetric:
            "18\u00D70,3\u00D76m (l\u00D7w\u00D7h) or 3-m rad all in and 3 m on 1 side 5d8+1d8/SL Fire dmg; save halves; see B",
        descriptionFull:
            "You create a wall of fire on a solid surface within range. You can make the wall up to 60 feet long, 20 feet high, and 1 foot thin, or a ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thin. The wall is opaque and lasts for the duration." +
            "\n   " +
            "When the wall appears, each creature within its area must make a Dexterity saving throw. On a failed save, a creature takes 5d8 fire damage, or half as much damage on a successful save." +
            "\n   " +
            "One side of the wall, selected by you when you cast this spell, deals 5d8 fire damage to each creature that ends its turn within 10 feet of that side or inside the wall. A creature takes the same damage when it enters the wall for the first time on a turn or ends its turn there. The other side of the wall deals no damage." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d8 for each slot level above 4th."
    },
    "wall of force": {
        name: "Wall of Force",
        classes: ["wizard"],
        source: [["SRD", 190], ["P", 285]],
        level: 5,
        school: "Evoc",
        time: "1 a",
        range: "120 ft",
        components: "V,S,M",
        compMaterial: "A pinch of powder made by crushing a clear gemstone",
        duration: "Conc, 10 min",
        description:
            "10 10\u00D710-ft panels or 10-ft rad (hemi)sphere invisible, impenetrable wall; can float in air; see book",
        descriptionFull:
            "An invisible wall of force springs into existence at a point you choose within range. The wall appears in any orientation you choose, as a horizontal or vertical barrier or at an angle. It can be free floating or resting on a solid surface. You can form it into a hemispherical dome or a sphere with a radius of up to 10 feet, or you can shape a flat surface made up of ten 10-foot-by-10-foot panels. Each panel must be contiguous with another panel. In any form, the wall is 1/4 inch thick. It lasts for the duration. If the wall cuts through a creature's space when it appears, the creature is pushed to one side of the wall (your choice which side)." +
            "\n   " +
            "Nothing can physically pass through the wall. It is immune to all damage and can't be dispelled by dispel magic. A disintegrate spell destroys the wall instantly, however. The wall also extends into the Ethereal Plane, blocking ethereal travel through the wall."
    },
    "wall of ice": {
        name: "Wall of Ice",
        classes: ["wizard"],
        source: [["SRD", 190], ["P", 285]],
        level: 6,
        school: "Evoc",
        time: "1 a",
        range: "120 ft",
        components: "V,S,M",
        compMaterial: "A small piece of quartz",
        duration: "Conc, 10 min",
        save: "Dex",
        description:
            "10 10\u00D710-ft panels 1-ft thick wall; at casting 10d6 Cold dmg; save halves; can cut through; see book",
        descriptionFull:
            "You create a wall of ice on a solid surface within range. You can form it into a hemispherical dome or a sphere with radium of up to 10 feet, or you can shape a flat surface made up of ten 10-foot-square panels. Each panel must be contiguous with another panel. In any form, the wall is 1 foot thick and lasts for the duration." +
            "\n   " +
            "If the wall cuts through a creature's space when it appears, the creature within its area is pushed to one side of the wall and must make a Dexterity saving throw. On a failed save, the creature takes 10d6 cold damage, or half as much damage on a successful save." +
            "\n   " +
            "The wall is an object that can be damaged and thus breached. It has AC 12 and 30 hit points per 10-foot section, and it is vulnerable to fire damage. Reducing a 10-foot section of wall to 0 hit points destroys it and leaves behind a sheet of frigid air in the space the wall occupied. A creature moving through the sheet of frigid air for the first time on a turn must make a Constitution saving throw. The creature takes 5d6 cold damage on a failed save, or half as much damage on a successful one." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 7th level or higher, the damage the wall deals when it appears increases by 2d6, and the damage from passing through the sheet of frigid air increases by 1d6 for each slot level above 6th."
    },
    "wall of stone": {
        name: "Wall of Stone",
        classes: ["druid", "sorcerer", "wizard"],
        source: [["SRD", 190], ["P", 287]],
        level: 5,
        school: "Evoc",
        time: "1 a",
        range: "120 ft",
        components: "V,S,M",
        compMaterial: "A small block of granite",
        duration: "Conc, 10 min",
        description:
            '10 10\u00D710-ft panels 6" thick wall connected with existing stone; half thickness, double surface; see B',
        descriptionMetric:
            "10 10\u00D73m panels 15cm thick wall connected with existing stone; half thickness, double surface; see B",
        descriptionFull:
            "A nonmagical wall of solid stone springs into existence at a point you choose within range. The wall is 6 inches thick and is composed of ten 10-foot-by-10-foot panels. Each panel must be contiguous with at least on other panel. Alternatively, you can create 10-foot-by-20-foot panels that are only 3 inches thick." +
            "\n   " +
            "If the wall cuts through a creature's space when it appears, the creature is pushed to one side of the wall (your choice). If a creature would be surrounded on all sides by the wall (or the wall and another solid surface), that creature can make a Dexterity saving throw. On a success, it can use its reaction to move up to its speed so that it is no longer enclosed by the wall." +
            "\n   " +
            "The wall can have any shape you desire, though it can't occupy the same space as a creature or object. the wall doesn't need to be vertical or resting on any firm foundation. It must, however, merge with and be solidly supported by existing stone. Thus you can use this spell to bridge a chasm or create a ramp." +
            "\n   " +
            "If you create a span greater than 20 feet in length, you must halve the size of each panel to create supports. You can crudely shape the wall to create crenellations, battlements, and so on." +
            "\n   " +
            "The wall is an object made of stone that can be damaged and thus breached. Each panel has AC 15 and 30 hit points per inch of thickness. Reducing a panel to 0 hit points destroys it and might cause connected panels to collapse at the DM's discretion." +
            "\n   " +
            "If you maintain your concentration on this spell for its whole duration, the wall becomes permanent and can't be dispelled. Otherwise, the wall disappears when the spell ends."
    },
    "wall of thorns": {
        name: "Wall of Thorns",
        classes: ["druid"],
        source: [["SRD", 191], ["P", 287]],
        level: 6,
        school: "Conj",
        time: "1 a",
        range: "120 ft",
        components: "V,S,M",
        compMaterial: "A handful of thorns",
        duration: "Conc, 10 min",
        save: "Dex",
        description:
            "60\u00D75\u00D720ft (l\u00D7w\u00D7h) or 10-ft rad all 7d8+1d8/SL Piercing dmg; save halves; 1/4 move; see book",
        descriptionMetric:
            "18\u00D71,5\u00D76m (l\u00D7w\u00D7h) or 3-m rad all 7d8+1d8/SL Piercing dmg; save halves; 1/4 move; see book",
        descriptionFull:
            "You create a wall of tough, pliable, tangled brush bristling with needle-sharp thorns. The wall appears within range on a solid surface and lasts for the duration. You choose to make the wall up to 60 feet long, 10 feet high, and 5 feet thick or a circle that has a 20-foot diameter and is up to 20 feet high and 5 feet thick. The wall blocks line of sight." +
            "\n   " +
            "When the wall appears, each creature within its area must make a Dexterity saving throw. On a failed save, a creature takes 7d8 piercing damage, or half as much damage on a successful save." +
            "\n   " +
            "A creature can move through the wall, albeit slowly and painfully. For every 1 foot a creature moves through the wall, it must spend 4 feet of movement. Furthermore, the first time a creature enters the wall on a turn or ends its turn there, the creature must make a Dexterity saving throw. It takes 7d8 slashing damage on a failed save, or half as much on a successful save." +
            AtHigherLevels +
            "When you cast this spell using a spell slot of 7th level or higher, both types of damage increase by 1d8 for each slot level above 6th."
    },
    "warding bond": {
        name: "Warding Bond",
        classes: ["cleric"],
        source: [["SRD", 191], ["P", 287]],
        level: 2,
        school: "Abjur",
        time: "1 a",
        range: "Touch",
        components: "V,S,M\u0192",
        compMaterial:
            "A pair of platinum rings worth at least 50 gp each, which you and target must wear for the duration",
        duration: "1 h (D)",
        description:
            "1 crea +1 AC, +1 saves, resistance all dmg; if takes dmg I take same dmg; ends if >60 ft away (100gp)",
        descriptionFull:
            "This spell wards a willing creature you touch and creates a mystic connection between you and the target until the spell ends. While the target is within 60 feet of you, it gains a +1 bonus to AC and saving throws, and it has resistance to all damage. Also, each time it takes damage, you take the same amount of damage." +
            "\n   " +
            "The spell ends if you drop to 0 hit points or if you and the target become separated by more than 60 feet. It also ends if the spell is cast again on either of the connected creatures. You can also dismiss the spell as an action."
    },
    "water breathing": {
        name: "Water Breathing",
        classes: ["druid", "ranger", "sorcerer", "wizard"],
        source: [["SRD", 191], ["P", 287]],
        ritual: true,
        level: 3,
        school: "Trans",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "A short reed or piece of straw",
        duration: "24 h",
        description:
            "10 willing creatures can breathe underwater for the duration",
        descriptionFull:
            "This spell grants up to ten willing creatures you can see within range the ability to breathe underwater until the spell ends. Affected creatures also retain their normal mode of respiration."
    },
    "water walk": {
        name: "Water Walk",
        classes: ["cleric", "druid", "ranger", "sorcerer"],
        source: [["SRD", 191], ["P", 287]],
        ritual: true,
        level: 3,
        school: "Trans",
        time: "1 a",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "A piece of cork",
        duration: "1 h",
        description:
            "10 willing creatures can move across any liquid for the duration; rise to surface if underwater",
        descriptionFull:
            "This spell grants the ability to move across any liquid surface - such as water, acid, mud, snow, quicksand, or lava - as if it were harmless solid ground (creatures crossing molten lava can still take damage from the heat). Up to ten willing creatures you can see within range gain this ability for the duration." +
            "\n   " +
            "If your target a creature submerged in a liquid, the spell carries the target to the surface of the liquid at a rate of 60 feet per round."
    },
    web: {
        name: "Web",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 192], ["P", 287]],
        level: 2,
        school: "Conj",
        time: "1 a",
        range: "60 ft",
        components: "V,S,M",
        compMaterial: "A bit of spiderweb",
        duration: "Conc, 1 h",
        save: "Dex",
        description:
            "20-ft cube, anchored, all save or restrained; dif. ter.; lightly obscures; Str check vs. Spell DC to free",
        descriptionFull:
            "You conjure a mass of thick, sticky webbing at a point of your choice within range. The webs fill a 20-foot cube from that point for the duration. The webs are difficult terrain and lightly obscure their area." +
            "\n   " +
            "If the webs aren't anchored between two solid masses (such as walls or trees) or layered across a floor, wall, or ceiling, the conjured web collapses on itself, and the spell ends at the start of your next turn. Webs layered over a flat surface have a depth of 5 feet." +
            "\n   " +
            "Each creature that starts its turn in the webs or that enters them during its turn must make a Dexterity saving throw. On a failed save, the creature is restrained as long as it remains in the webs or until it breaks free." +
            "\n   " +
            "A creature restrained by the webs can use its actions to make a Strength check against your spell save DC. If it succeeds, it is no longer restrained." +
            "\n   " +
            "The webs are flammable. Any 5-foot cube of webs exposed to fire burns away in 1 round, dealing 2d4 fire damage to any creature that starts its turn in the fire."
    },
    weird: {
        name: "Weird",
        classes: ["wizard"],
        source: [["SRD", 192], ["P", 288]],
        level: 9,
        school: "Illus",
        time: "1 a",
        range: "120 ft",
        components: "V,S",
        duration: "Conc, 1 min",
        save: "Wis",
        description:
            "30-ft rad all save or frightened for duration; extra save at end of each round or 4d10 Psychic dmg", // errata from start of turn to end of turn
        descriptionFull:
            "Drawing on the deepest fears of a group of creatures, you create illusory creatures in their minds, visible only to them. Each creature in a 30-foot-radius sphere centered on a point of your choice within range must make a Wisdom saving throw. On a failed save, a creature becomes frightened for the duration. The illusion calls on the creature's deepest fears, manifesting its worst nightmares as an implacable threat. At the end of each of the frightened creature's turns, it must succeed on a Wisdom saving throw or take 4d10 psychic damage. On a successful save, the spell ends for that creature."
    },
    "wind walk": {
        name: "Wind Walk",
        classes: ["druid"],
        source: [["SRD", 192], ["P", 288]],
        level: 6,
        school: "Trans",
        time: "1 min",
        range: "30 ft",
        components: "V,S,M",
        compMaterial: "Fire and holy water",
        duration: "8 h",
        description:
            "Me + 10 willing creatures assume gaseous form with fly 300 ft, resist. to nonmagical dmg; see book",
        descriptionFull:
            "You and up to ten willing creatures you can see within range assume a gaseous form for the duration, appearing as wisps of cloud. While in this cloud form, a creature has a flying speed of 300 feet and has resistance to damage from nonmagical weapons. The only actions a creature can take in this form are the Dash action or to revert to its normal form. Reverting takes 1 minute, during which time a creature is incapacitated and can't move. Until the spell ends, a creature can revert to cloud form, which also requires the 1-minute transformation." +
            "\n   " +
            "If a creature is in cloud form and flying when the effect ends, the creature descends 60 feet per round for 1 minute until it lands, which it does safely. If it can't land after 1 minute, the creature falls the remaining distance."
    },
    "wind wall": {
        name: "Wind Wall",
        classes: ["druid", "ranger"],
        source: [["SRD", 192], ["P", 288]],
        level: 3,
        school: "Evoc",
        time: "1 a",
        range: "120 ft",
        components: "V,S,M",
        compMaterial: "A tiny fan and a feather of exotic origin",
        duration: "Conc, 1 min",
        save: "Str",
        description:
            "50\u00D71\u00D715ft (l\u00D7w\u00D7h) wall, any line-shape, at cast all in 3d8 Bludg. dmg; save halves; blocks arrows",
        descriptionMetric:
            "15\u00D70,3\u00D74,5m (l\u00D7w\u00D7h) wall, any line-shape, at cast all in 3d8 Bludg. dmg; save halves; blocks arrows",
        descriptionFull:
            "A wall of strong wind rises from the ground at a point you choose within range. You can make the wall up to 50 feet long, 15 feet high, and 1 foot thick. You can shape the wall in any way you choose so long as it makes one continuous path along the ground. The wall lasts for the duration." +
            "\n   " +
            "When the wall appears, each creature within its area must make a Strength saving throw. A creature takes 3d8 bludgeoning damage on a failed save, or half as much damage on a successful one." +
            "\n   " +
            "The strong wind keeps fog, smoke, and other gases at bay. Small or smaller flying creatures or objects can't pass through the wall. Loose, lightweight materials brought into the wall fly upward. Arrows, bolts, and other ordinary projectiles launched at targets behind the wall are deflected upward and automatically miss. (Boulders hurled by giants or siege engines, and similar projectiles, are unaffected.) Creatures in gaseous form can't pass through it."
    },
    wish: {
        name: "Wish",
        classes: ["sorcerer", "wizard"],
        source: [["SRD", 193], ["P", 288]],
        level: 9,
        school: "Conj",
        time: "1 a",
        range: "Self",
        components: "V",
        duration: "Instantaneous",
        description:
            "Duplicate any 8th lvl or lower spell, create objects, heal, resurrect, alter time, etc.; see book",
        descriptionFull:
            "Wish is the mightiest spell a mortal creature can cast. By simply speaking aloud, you can alter the very foundations of reality in accord with your desires." +
            "\n   " +
            "The basic use of this spell is to duplicate any other spell of 8th level or lower. You don't need to meet any requirements in that spell, including costly components. The spell simply takes effect. Alternatively, you can create one of the following effects of your choice." +
            "\n " +
            "\u2022 You create one object of up to 25,000 gp in value that isn't a magic item. The object can be no more than 300 feet in any dimension, and it appears in an unoccupied space you can see on the ground." +
            "\n " +
            "\u2022 You allow up to twenty creatures that you can see to regain all hit points, and you end all effects on them described in the greater restoration spell." +
            "\n " +
            "\u2022 You grant up to ten creatures that you can see resistance to a damage type you choose." +
            "\n " +
            "\u2022 You grant up to ten creatures you can see immunity to a single spell or other magical effect for 8 hours. For instance, you could make yourself and all your companions immune to a lich's life drain attack." +
            "\n " +
            "\u2022 You undo a single recent event by forcing a reroll of any roll made within the last round (including your last turn). Reality reshapes itself to accommodate the new result. For example, a wish spell could undo an opponent's successful save, a foe's critical hit, or a friend's failed save. You can force the reroll to be made with advantage or disadvantage, and you can choose whether to use the reroll or the original roll." +
            "\n\n" +
            "You might be able to achieve something beyond the scope of the above examples. State your wish to the DM as precisely as possible. The DM has great latitude in ruling what occurs in such an instance, the greater the wish, the greater the likelihood that something goes wrong. This spell might simply fail, the effect you desire might only be partly achieved, or you might suffer some unforeseen consequence as a result of how you worded the wish. For example, wishing that a villain were dead might propel you forward in time to a period when that villain is no longer alive, effectively removing you from the game. Similarly, wishing for a legendary magic item or artifact might instantly transport you to the presence of the item's current owner." +
            "\n   " +
            "The stress of casting this spell to produce any effect other than duplicating another spell weakens you. After enduring that stress, each time you cast a spell until you finish a long rest, you take 1d10 necrotic damage per level of that spell. This damage can't be reduced or prevented in any way. In addition, your Strength drops to 3, if it isn't 3 or lower already, for 2d4 days. For each of those days that you spend resting and doing nothing more than light activity, your remaining recovery time decreases by 2 days. Finally, there is a 33 percent chance that you are unable to cast wish ever again if you suffer this stress."
    },
    "word of recall": {
        name: "Word of Recall",
        classes: ["cleric"],
        source: [["SRD", 193], ["P", 289]],
        level: 6,
        school: "Conj",
        time: "1 a",
        range: "5 ft",
        components: "V",
        duration: "Instantaneous",
        description:
            "Me + 5 willing crea teleport to sanctuary of my deity, designated as such by casting this spell there",
        descriptionFull:
            "You and up to five willing creatures within 5 feet of you instantly teleport to a previously designated sanctuary. You and any creatures that teleport with you appear in the nearest unoccupied space to the spot you designated when you prepared your sanctuary (see below). If you cast this spell without first preparing a sanctuary, the spell has no effect." +
            "\n   " +
            "You must designate a sanctuary by casting this spell within a location, such as a temple, dedicated to or strongly linked to your deity. If you attempt to cast the spell in this manner in an area that isn't dedicated to your deity, the spell has no effect."
    },
    "zone of truth": {
        name: "Zone of Truth",
        classes: ["bard", "cleric", "paladin"],
        source: [["SRD", 193], ["P", 289]],
        level: 2,
        school: "Ench",
        time: "1 a",
        range: "60 ft",
        components: "V,S",
        duration: "10 min",
        save: "Cha",
        description:
            "15-ft rad all in or enter save or unable to lie; I'm aware if saved or not; crea aware it cannot lie",
        descriptionFull:
            "You create a magical zone that guards against deception in a 15-foot-radius sphere centered on a point of your choice within range. Until the spell ends, a creature that enters the spell's area for the first time on a turn or starts its turn there must make a Charisma saving throw. On a failed save, a creature can't speak a deliberate lie while in the radius. You know whether each creature succeeds or fails on its saving throw." +
            "\n   " +
            "An affected creature is aware of the spell and can thus avoid answering questions to which it would normally respond with a lie. Such creatures can be evasive in its answers as long as it remains within the boundaries of the truth."
    }
};

var AllSpellsArray, AllSpellsObject, AddSpellsMenu, AllCasterClasses;
