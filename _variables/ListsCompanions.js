var Base_CompanionList = {
	"familiar" : {
		name : "familiar (Find Familiar spell)"
	}
};


var compString = {
	mount : {
		featurestring : "\u25C6 Find Steed: If dropped to 0 HP, the steed disappears, leaving behind no physical form",
		string : "Find Steed (2nd-level conjuration spell, PHB 240):" +
				"\n\u2022 " + "Summon a spirit in the form of a steed, appearing in an unoccupied space within 30 ft" +
				"\n   " + "It assumes a chosen form: warhorse, pony, camel, elk, or mastiff (DM can allow more forms)" +
				"\n   " + "The steed has the statistics of the chosen form, though its type is celestial, fey, or fiend" +
				"\n   " + "If it has an Intelligence of 5 or less, its Intelligence becomes 6 " +
				"\n   " + "It gains the ability to understand one language that I, the caster, can speak" +
				"\n   " + "When the steed drops to 0 hit points, it disappears, leaving behind no physical form" +
				"\n\u2022 " + "The steed serves me as a mount. I have a bond with it that allows us to fight as a seamless unit" +
				"\n\u2022 " + "While mounted on my steed, I can make any spell I cast that targets only me also target it" +
				"\n\u2022 " + "While my steed is within 1 mile of me, we can communicate with each other telepathically" +
				"\n\u2022 " + "I can dismiss my steed at any time as an action, causing it to disappear" +
				"\n\u2022 " + "Casting this spell again summons the same steed, restored to its max HP, without conditions" +
				"\n\u2022 " + "I can't have more than one steed bonded at a time; as an action, I can release it from its bond",
		actions : [["action", "Find Steed (dismiss)"]],
		actionTooltip : "the Find Steed spell"
	},
	steed : {
		featurestring : "\u25C6 Find Greater Steed: If dropped to 0 HP, the steed disappears, leaving behind no physical form",
		string : "Find Greater Steed (4th-level conjuration spell, XGtE 156):" +
				"\n\u2022 " + "Summon a spirit in the form of a steed, appearing in an unoccupied space within 30 ft" +
				"\n   " + "It has the chosen form: griffon, pegasus, peryton, dire wolf, rhinoceros, or saber-toothed tiger" +
				"\n   " + "The steed has the statistics of the chosen form, though its type is celestial, fey, or fiend" +
				"\n   " + "If it has an Intelligence of 5 or less, its Intelligence becomes 6 " +
				"\n   " + "It gains the ability to understand one language that I, the caster, can speak" +
				"\n   " + "When the steed drops to 0 hit points, it disappears, leaving behind no physical form" +
				"\n\u2022 " + "The steed serves me as a mount. I have a bond with it that allows us to fight as a seamless unit" +
				"\n\u2022 " + "While mounted on my steed, I can make any spell I cast that targets only me also target it" +
				"\n\u2022 " + "While my steed is within 1 mile of me, I can communicate with it telepathically" +
				"\n\u2022 " + "I can dismiss my steed at any time as an action, causing it to disappear" +
				"\n\u2022 " + "Casting this spell again summons the same steed, restored to its max HP, without conditions" +
				"\n\u2022 " + "I can't have more than one steed bonded at a time; as an action, I can release it from its bond",
		actions : [["action", "Find Greater Steed (dismiss)"]],
		actionTooltip : "the Find Greater Steed spell"
	},
	familiar : {
		featurestring : "\u25C6 Find Familiar: If dropped to 0 HP, the familiar disappears, leaving behind no physical form. The familiar must obey all commands of the master",
		string : "Find Familiar (1st-level conjuration [ritual] spell, PHB 240):" +
			"\n\u2022 " + "Summon a spirit that serves as a familiar, appearing in an unoccupied space within 10 ft" +
			"\n   " + "It assumes a chosen form (can change at every casting): bat, cat, crab, frog (toad), hawk," +
			"\n   " + "lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, or weasel." +
			"\n   " + "It has the chosen form's statistics, but its type changes from beast to celestial, fey, or fiend" +
			"\n   " + "When the familiar drops to 0 hit points, it disappears, leaving behind no physical form" +
			"\n   " + "It reappears when I cast this spell again (in a new form if so desired)" +
			"\n\u2022 " + "The familiar acts independently of me, but it always obeys my commands" +
			"\n   " + "In combat, it rolls its own initiative and acts on its own turn, but it can't attack" +
			"\n\u2022 " + "While it is within 100 ft of me, I can communicate with it telepathically" +
			"\n\u2022 " + "As an action, I see/hear what it does (but not with my senses) until the start of my next turn" +
			"\n\u2022 " + "As an action, I can temporarily dismiss it, having it disappears into a pocket dimension" +
			"\n\u2022 " + "As an action, while it is temporarily dismissed, I can cause it to reappear within 30 ft" +
			"\n\u2022 " + "I can't have more than one familiar bonded at a time; as an action, I can dismiss it forever" +
			"\n\u2022 " + "When I cast a spell with a range of touch, my familiar can deliver the spell" +
			"\n   " + "It must be within 100 ft of me and it must use its reaction to deliver the spell when I cast it" +
			"\n   " + "It acts as if it cast the spell, but it can use my modifiers for any attack rolls the spell requires",
		actions : [["action", "Find Familiar (dismiss/reappear)"], ["action", "Use familiar's senses"]],
		actionTooltip : "the Find Familiar spell"
	},
	pact_of_the_chain : {
		featurestring : "\u25C6 Pact of the Chain: If dropped to 0 HP, the familiar disappears, leaving behind no physical form. It must obey all commands of the master",
		string : "Pact of the Chain (variant of the Find Familiar 1st-level conjuration [ritual] spell, PHB 240):" +
			"\n\u2022 " + "Summon a spirit that serves as a familiar, appearing in an unoccupied space within 10 ft" +
			"\n   " + "It assumes a chosen form (can change at every casting): bat, cat, crab, frog (toad), hawk," +
			"\n   " + "lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, weasel," +
			"\n   " + "or one of the special forms: imp, pseudodragon, quasit, or sprite." +
			"\n   " + "It has the chosen form's statistics, but its type changes from beast to celestial, fey, or fiend" +
			"\n   " + "When the familiar drops to 0 hit points, it disappears, leaving behind no physical form" +
			"\n   " + "It reappears when I cast this spell again (in a new form if so desired)" +
			"\n\u2022 " + "The familiar acts independently of me, but it always obeys my commands" +
			"\n   " + "In combat, it rolls its own initiative and acts on its own turn, but it can't attack on its turn" +
			"\n\u2022 " + "While it is within 100 ft of me, I can communicate with it telepathically" +
			"\n\u2022 " + "With my Attack action, I can forgo one attacks to have the familiar make one with its reaction" +
			"\n\u2022 " + "As an action, I see/hear what it does (but not with my senses) until the start of my next turn" +
			"\n\u2022 " + "As an action, I can temporarily dismiss it, having it disappears into a pocket dimension" +
			"\n\u2022 " + "As an action, while it is temporarily dismissed, I can cause it to reappear within 30 ft" +
			"\n\u2022 " + "I can't have more than one familiar bonded at a time; as an action, I can dismiss it forever" +
			"\n\u2022 " + "When I cast a spell with a range of touch, my familiar can deliver the spell" +
			"\n   " + "It must be within 100 ft of me and it must use its reaction to deliver the spell when I cast it" +
			"\n   " + "It acts as if it cast the spells, but it can use my modifiers for any attack rolls the spell requires",
		actions : [["action", "Have familiar attack (part of my Attack action)"], ["action", "Familiar (dismiss/reappear)"], ["action", "Use familiar's senses"]],
		actionTooltip : "Warlock (Pact of the Chain)"
	},
	companion : {
		featurestring : "",
		string : "Ranger's Companion (PHB 93):" +
			"\n\u2022 " + "A beast no larger than medium of challenge rating 1/4 or lower" +
			"\n\u2022 " + "If the beast dies, I can spend 8 hours magically bonding with another that isn't hostile to me" +
			"\n\u2022 " + "When moving in favored terrain with only the beast, I can move stealthily at a normal pace" +
			"\n\u2022 " + "The beast adds my proficiency bonus to its AC, attack rolls, damage rolls," +
			"\n   " + "as well as to any saving throws and skills it is proficient with." +
			"\n\u2022 " + "The beast's Hit Point maximum equals four times my ranger level if higher than its normal HP" +
			"\n\u2022 " + "The beast takes its turn on my initiative" +
			"\n\u2022 " + "I can verbally command the beast where to move (no action)" +
			"\n\u2022 " + "As an action, I can have the beast do an Attack, Dash, Disengage, or Help action on its turn" +
			"\n\u2022 " + "If I don't command it to take an action, it takes the Dodge action instead",
		actions : []
	},
	companionrr : {
		featurestring : "",
		string : "Ranger's Animal Companion (UA:RR 5):" +
			"\n\u2022 " + "Call forth and bond with an animal from the wilderness by spending 8 hours and 50 gp" +
			"\n\u2022 " + "The animal can be an ape, black bear, boar, giant badger, giant weasel, mule, panther, or wolf" +
			"\n\u2022 " + "I can have one companion at a time; If it dies, I can spend 8 hours and 25 gp to bring it back" +
			"\n\u2022 " + "My companion uses my Proficiency Bonus instead of its own and also adds it to AC & damage" +
			"\n\u2022 " + "My companion gains a Hit Dice for every ranger level I gain after 3rd" +
			"\n\u2022 " + "My companion can divide 2 points among its ability scores (to max 20) whenever I gain an ASI" +
			"\n\u2022 " + "My companion is proficient in two skills of my choice, as well as all saving throws" +
			"\n\u2022 " + "My companion obeys my commands as best it can, or act on its own if I can't command it" +
			"\n\u2022 " + "My companion rolls for initiative and takes actions as normal, but can't use Multiattack" +
			"\n\u2022 " + "When moving stealthily together with only my companion, we can move at a normal pace" +
			"\n\u2022 " + "My companion gains a bonus on damage rolls against my favored enemies just like me",
		actions : []
	},
	mechanicalserv : {
		featurestring : "",
		string : "Artificer's Mechanical Servant (UA:A 4):" +
			"\n\u2022 " + "The mechanical servant has the statistics of a chosen large beast of challenge rating 2 or lower" +
			"\n  " + "It has the Construct type, understands any language that I know, and has 60 ft Darkvision" +
			"\n  " + "In addition, it is immune to poison damage, being poisoned, and being charmed" +
			"\n\u2022 " + "I can have one servant at a time; If it dies, I can repair it or create a new one" +
			"\n  " + "I can repair the servant over the course of a long rest, which restores it to 1 HP" +
			"\n  " + "I can build a new servant by spending 8 hours a day for 7 days and 1000 gp of materials" +
			"\n\u2022 " + "The servant rolls initiative and takes actions as normal, obeying my commands as best it can" +
			"\n\u2022 " + "As a reaction when I am attacked in melee and my mechanical servant is within 5 ft of me," +
			"\n  I can command the servant to use its reaction to make a melee attack against the attacker",
		actions : [["reaction", "Mechanical Servant (if attacked)"]]
	}
};