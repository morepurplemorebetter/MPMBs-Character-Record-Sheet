/*  -WHAT IS THIS?-
    The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
    You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
     
    -KEEP IN MIND-
    Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
    It is recommended to enter the code in a fresh sheet before adding any other information.
*/
 
/*  -INFORMATION-
    Subject:    Subclass
    Effect:     This script adds a subclass for the Fighter, called "Alchemical Archer"
                This subclass is made by Zyndr
    Code by:    Zyndr (with amendments by MorePurpleMoreBetter)
    Date:       2016-12-14 (sheet v12.71)
*/
 
ClassSubList["alchemical archer"] = {
    regExpSearch : /^(?=.*\balchemical\b)(?=.*archer).*$/i,
    subname : "Alchemical Archer",
	source : ["HB", 0],
    fullname : "Alchemical Archer",
    abilitySave : 1,
    features : {
        "subclassfeature3" : {
            name : "Facile Crafting",
            source : ["HB", 0],
            minlevel : 3,
            description : "\n   " + "I can craft my class's arrows and arrowheads during a short or long rest" + "\n   " + "Crafting these requires fletching tools, in which I gain proficiency",
        },
        "subclassfeature3.1" : {
            name : "Tools of the Trade",
            source : ["HB", 0],
            minlevel : 3,
            description : "\n   " + "I know how to make arrowheads that deal Bludgeoning, Slashing or Piercing damage" + "\n   " + "I know how to make an arrow that can delivers a vial of liquid, without damaging itself" + "\n   " + "This liquid can be a contact or inhaled poison that is delivered on a hit with the arrow" + "\n   " + "Specialty Arrowheads cost 1g to make; Damage specific arrows cost 1g per 20" + "\n   " + "I can craft 1g worth of arrows in a short rest and 5g worth on a long rest",
			additional : ["", "", "0 Specialty Arrowheads", "0 Specialty Arrowheads", "0 Specialty Arrowheads", "0 Specialty Arrowheads", "1 Specialty Arrowhead", "1 Specialty Arrowhead", "1 Specialty Arrowhead", "2 Specialty Arrowheads", "2 Specialty Arrowheads", "2 Specialty Arrowheads", "2 Specialty Arrowheads", "2 Specialty Arrowheads", "3 Specialty Arrowheads", "3 Specialty Arrowheads", "3 Specialty Arrowheads", "4 Specialty Arrowheads", "4 Specialty Arrowheads", "4 Specialty Arrowheads"],
			extraname : "Specialty Arrowheads",
			extrachoices : ["Barbed Arrow", "Flare Arrow", "Forked Arrow", "Grappling Arrow", "Hollow Arrow", "Recoverable Arrowhead", "Shrapnel Arrow", "Screamer"],
			"barbed arrow" : {
				name : "Barbed Arrow",
				description : "\n   " + "This arrow cannot be removed without dealing additional damage. To remove it, make a Wisdom (Medicine) check or take 1d4 additional damage, or half that on a successful one (minimum 1 damage).",
				source : ["HB", 0],
			},
			"flare arrow" : {
				name : "Flare Arrow",
				description : "\n   " + "Target and any creature within 5ft of it is Blinded until the start of my next turn unless they succeed at a Constitution saving throw." + "\n   " + "Arrow deals Radiant damage.",
				source : ["HB", 0],
			},
			"forked arrow" : {
				name : "Forked Arrow",
				description : "\n   " + "This arrow does 1 die step less of damage (a d8 becomes a d6, a d6 becomes a d4, etc.), and deals maximum damage to soft objects like cloth, rope, etc.",
				source : ["HB", 0],
				eval : "AddWeapon(\"longbow (forked arrow)\"); AddWeapon(\"shortbow (forked arrow)\")",
				removeeval : "RemoveWeapon(\"longbow (forked arrow)\"); RemoveWeapon(\"shortbow (forked arrow)\")",
			},
			"grappling arrow" : {
				name : "Grappling Arrow",
				description : "\n   " + " This arrow has a reed shaft and a tri-pronged mechanical head attached to 50 ft of silken rope. On contact, the arms on the head extend to anchor it. It is ineffective in combat (no damage) and only usable within the normal range increment of the bow.",
				source : ["HB", 0],
			},
			"hollow arrow" : {
				name : "Hollow Arrow",
				description : "\n   " + "This arrow must be removed with a Wisdom (Medicine) check. On their turn they take an additional 1 point of damage for each arrow.",
				source : ["HB", 0],
			},
			"recoverable arrowhead" : {
				name : "Recoverable Arrowhead",
				description : "\n   " + "This arrowhead modification can be added to an existing arrow. The arrow does 1 die step less of damage (a d8 becomes a d6, a d6 becomes a d4, etc.), while also increasing the recovery chance of a non-magical arrow to 100% and a magical arrow to 50%.",
				source : ["HB", 0],
			},
			"shrapnel arrow" : {
				name : "Shrapnel Arrow",
				description : "\n   " + "This arrow does 1 die step less of damage (a d8 becomes a d6, a d6 becomes a d4, etc.), but pieces of it break of internally disrupting actions. Until a Wisdom (Medicine) check is successfully performed over 10 minutes, the target cannot make Reactions.",
				source : ["HB", 0],
				eval : "AddWeapon(\"longbow (shrapnel arrow)\"); AddWeapon(\"shortbow (shrapnel arrow)\")",
				removeeval : "RemoveWeapon(\"longbow (shrapnel arrow)\"); RemoveWeapon(\"shortbow (shrapnel arrow)\")",
			},
			"screamer" : {
				name : "Screamer",
				description : "\n   " + "Target and any creature within 5ft of it is Deafened until the start of my next turn unless they succeed at a Constitution saving throw." + "\n   " + "Arrow deals Thunder damage.",
				source : ["HB", 0],
			},
        },
        "subclassfeature3.2" : {
            name : "Trick Shots",
            source : ["HB", 0],
            minlevel : 3,
            description : "\n   " + "My mastery of the bow is second to none, and I can do seemingly magical things with it" + "\n   " + "The saving throw to resist any effect from these shots is based on my Dexterity",
            additional : ["", "", "I know 2 Tricks", "I know 2 Tricks", "I know 2 Tricks", "I know 2 Tricks", "I know 3 Tricks", "I know 3 Tricks", "I know 3 Tricks", "I know 4 Tricks", "I know 4 Tricks", "I know 4 Tricks", "I know 4 Tricks", "I know 4 Tricks", "I know 5 Tricks", "I know 5 Tricks", "I know 5 Tricks", "I know 6 Tricks", "I know 6 Tricks", "I know 6 Tricks"],
			extraname : "Trick Shot",
			extrachoices : ["Disarming Shot", "Distracting Shot", "Focused Shot", "Hampering Shot", "Manyshot", "Pinning Shot", "Pinpoint Aim", "Point Blank Shot", "Pointed Response", "Rapid Shot", "Spellbreaker", "Volley"],
			"disarming shot" : {
				name : "Disarming Shot",
				description : "\n   " + "My target must make a Strength saving throw or drop one item of my choice that it’s holding. On a failed save, it drops the object I choose. The object lands at its feet.",
				source : ["HB", 0],
				action : ["action", ""]
			},
			"distracting shot" : {
				name : "Distracting Shot",
				description : "\n   " + "The next attack roll against my target by an attacker other than me has Advantage if the attack is made before the start of my next turn.",
				source : ["HB", 0],
				action : ["action", ""]
			},
			"focused shot" : {
				name : "Focused Shot",
				description : "\n   " + "I hit critically on a roll of 19 or 20 and if I critically hit a target, I add your Intelligence modifier to the damage roll. This may be combined with other Trick Shots.",
				source : ["HB", 0],
			},
			"hampering shot" : {
				name : "Hampering Shot",
				description : "\n   " + "Target must make a Dexterity save to have their movement halved until the start of my next turn." + "\n   " + "Failure means they are unable to move until the start of my next turn.",
				source : ["HB", 0],
			},
			"manyshot" : {
				name : "Manyshot",
				description : "\n   " + "I can fire two arrows at the same time at the same target with a single ranged weapon attack. This attack does 1 die step larger damage (a d8 becomes a d10, a d6 becomes a d8, etc.) and consumes 2 arrows.",
				source : ["HB", 0],
				action : ["action", ""]
			},
			"pinning shot" : {
				name : "Pinning Shot",
				description : "\n   " + "If an enemy within the normal range of my bow performs an action that would provoke an opportunity attack if I was within melee range, I may make an attack as a reaction. If this attack hits, it sets the target’s Movement to 0ft until the end of the turn, but deals no damage.",
				source : ["HB", 0],
				action : ["reaction", ""]
			},
			"pinpoint aim" : {
				name : "Pinpoint Aim",
				description : "\n   " + "Taking a bonus action to observe my target, I gain Advantage against that target but I take Disadvantage against and from all others until the start of my next turn. This may be combined with other Trick Shots.",
				source : ["HB", 0],
				action : ["bonus action", ""]
			},
			"point blank shot" : {
				name : "Point Blank Shot",
				description : "\n   " + "Making a bow attack while an enemy is within 5ft of me does not cause me to make the attack at Disadvantage. This may be combined with other Trick Shots.",
				source : ["HB", 0],
			},
			"pointed response" : {
				name : "Pointed Response",
				description : "\n   " + "I may make a melee opportunity attack using an arrow as a weapon. The arrow uses the statistic for a dagger.",
				source : ["HB", 0],
				action : ["reaction", ""]
			},
			"rapid shot" : {
				name : "Rapid Shot",
				description : "\n   " + "I may make an additional bow attack as a bonus action.",
				source : ["HB", 0],
				action : ["bonus action", ""]
			},
			"spellbreaker" : {
				name : "Spellbreaker",
				description : "\n   " + "When casters who have been hit with this count damage to determine the DC for their Constitution (Concentration) check, they count this damage twice. This may be combined with other Trick Shots.",
				source : ["HB", 0],
			},
			"volley" : {
				name : "Volley",
				description : "\n   " + "I can use my action to make a ranged attack against any number of creatures within 10 feet of a point you can see within your weapon’s range. I must have ammunition for each target as normal, and I make a separate attack roll for each target. At 17th level, the radius increases to 30ft.",
				source : ["HB", 0],
				action : ["action", ""]
			},
		},
        "subclassfeature7" : {
            name : "Special Materials",
			source : ["HB", 0],
            minlevel : 7,
            description : "\n   " + "I can create specialized ingredients to enhance my ammunition" + "\n   " + "Each recipe takes time to craft according to the gold value listed" + "\n   " + "A recipe yields a number of doses or uses equal to 1 + my Intelligence modifier" + "\n   " + "I can craft 5g worth of concoctions on a short rest and 25g worth on a long rest",
            additional : ["", "", "", "", "", "", "I know 1 Concoction", "I know 1 Concoction", "I know 1 Concoction", "I know 2 Concoctions", "I know 2 Concoctions", "I know 2 Concoctions", "I know 3 Concoctions", "I know 3 Concoctions", "I know 3 Concoctions", "I know 4 Concoctions", "I know 4 Concoctions", "I know 4 Concoctions", "I know 5 Concoctions", "I know 5 Concoctions"],
			extraname : "Concoctions",
			extrachoices : ["Adrenaline (10g)", "Antitoxin (10g)", "Bastion Brew (10g)", "Caustic Cloud (25g)", "Elemental Attunement (25g)", "Fate's Mark [Ingestion, Injury] (75g)", "Glow Juice (25g)", "Gut Rot [Injury] (75g)", "Healing Salve (10g)", "Mind Fever [Inhaled] (75g)", "Pick-Me-Up (10g)", "Sleeping Powder [Inhaled] (75g)", "Tanglefoot Goo (25g)", "Tracking Goop (25g)", "Withering Hope [Injury] (75g)"],
			"adrenaline (10g)" : {
				name : "Adrenaline (10g)",
				description : "\n   " + "This acrid mixture, once ingested, grants Advantage on all Strength based ability checks and saving throws for 1 minute, but once it fades, it inflicts Disadvantage for the same amount of time.",
				source : ["HB", 0],
			},
			"antitoxin (10g)" : {
				name : "Antitoxin (10g)",
				description : "\n   " + "This topical ointment, if applied as a cure grants additional saves to prevent further effects from each poison in effect. If applied prior to application of the toxin, it grants Advantage on saves versus poisons for 1 + my Intelligence modifier rounds.",
				source : ["HB", 0],
			},
			"bastion brew (10g)" : {
				name : "Bastion Brew (10g)",
				description : "\n   " + "With this bolstering paste, I grant the target temporary hit points equal to 5 x (1 + my Intelligence modifier).",
				source : ["HB", 0],
			},
			"caustic cloud (25g)" : {
				name : "Caustic Cloud (25g)",
				description : "\n   " + "This heavy powder emits a voluminous, billowing cloud of smoke that fills a 20ft sphere. The smoke is generated for a number of rounds equal to 1 + my Intelligence modifier. The sphere spreads around corners, and its area is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it." + "\n   " + "Any creature who enters or starts their turn in the cloud is Blinded while inside (no save) and on exiting must make a Constitution save or continue to be Blinded for 1 + my Intelligence modifier rounds.",
				source : ["HB", 0],
			},
			"elemental attunement (25g)" : {
				name : "Elemental Attunement (25g)",
				description : "\n   " + "This Concotion has 6 variations - Acid, Lightning, Fire, Cold, Radiant and Necrotic. Each applies Vulnerability to the specific element type and Resistance to its opposite for 1 + my Intelligence modifier rounds.",
				source : ["HB", 0],
			},
			"fate's mark [ingestion, injury] (75g)" : {
				name : "Fate's Mark [Ingestion, Injury] (75g)",
				description : "\n   " + "Completely odorless and tasteless, this poison can be delivered through Injury or Ingestion. On initial contact, the victim must make a Constitution save. If they fail, their maximum hit points are reduced by 1d4. Each day thereafter, they must make another Constitution saving throw or have their hit points further reduced by 1d4. The poison lasts in their system until they succeed on their saving throw or they die.",
				source : ["HB", 0],
			},
			"glow juice (25g)" : {
				name : "Glow Juice (25g)",
				description : "\n   " + "This substance reacts with skin making the subject glow brightly for 1 + Int rounds. During this time attacks made against them have Advantage.",
				source : ["HB", 0],
			},
			"gut rot [injury] (75g)" : {
				name : "Gut Rot [Injury] (75g)",
				description : "\n   " + "The victim of this poison must make a Constitution saving throw at the start of each of their turns or do nothing but retch violently. This lasts for 1 minute.",
				source : ["HB", 0],
			},
			"healing salve (10g)" : {
				name : "Healing Salve (10g)",
				description : "\n   " + "This thick paste heals 1d8+1 for each point of Intelligence modifier of the creator (minimum 1d8+1)",
				source : ["HB", 0],
			},
			"mind fever [inhaled] (75g)" : {
				name : "Mind Fever [Inhaled] (75g)",
				description : "\n   " + "This mind affecting poison induces hallucinations that induce fear and make it impossible to determine friend from foe. They must succeed at a Wisdom saving throw or become Frightened of everyone for 1 round per point of Intelligence modifier (minimum 1). If they succeed, they still cannot determine friend from foe for the duration (everyone seems to be a foe).",
				source : ["HB", 0],
			},
			"pick-me-up (10g)" : {
				name : "Pick-Me-Up (10g)",
				description : "\n   " + "This chewed herb cocktail alleviates all exhaustion for 1 + your Intelligence modifier hours, but at the end of the duration all exhaustion returns and the toll of the suppression adds another level of exhaustion.",
				source : ["HB", 0],
			},
			"sleeping powder [inhaled] (75g)" : {
				name : "Sleeping Powder [Inhaled] (75g)",
				description : "\n   " + "This fine powder floats dreamily once dispersed. Any creature who enters or starts their turn in the square it is dispersed in for the next (int) rounds must make a Constitution saving throw or fall into a slumber. They may make a check at the end of every hour to awaken, or are woken as soon as they take damage.",
				source : ["HB", 0],
			},
			"tanglefoot goo (25g)" : {
				name : "Tanglefoot Goo (25g)",
				description : "\n   " + "Target must make a Dexterity saving throw or become Restrained for 1 minute. At the end of each of their turns, they may make a Strength (Athletics) check to free themselves from the restraint.",
				source : ["HB", 0],
			},
			"tracking goop (25g)" : {
				name : "Tracking Goop (25g)",
				description : "\n   " + "When applied, this fluid is transparent. It drips endlessly for 24 hours, and while the initial application remains transparent, the droplets become luminescent allowing for easy tracking (no roll needed unless it crosses water, then roll to reacquire).",
				source : ["HB", 0],
			},
			"withering hope [injury] (75g)" : {
				name : "Withering Hope [Injury] (75g)",
				description : "\n   " + "This powerful poison eats away at the victim’s muscles. On first application, the victim must make a Constitution saving throw or take 2d4 points of damage per Int mod (minimum 2d4). Each round after, for a number of rounds equal to your Int mod (minimum 1) they become Poisoned.",
				source : ["HB", 0],
			}
        }
    }
};
ClassList.fighter.subclasses[1].push("alchemical archer");