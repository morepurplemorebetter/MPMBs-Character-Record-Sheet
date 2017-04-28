var FeatsList = {
	"actor" : {
		name : "Actor",
		source : ["P", 165],
		description : "Advantage on Charisma (Deception) and (Performance) if trying to pass as another. I can mimic a person's speech or other creature's sounds if I've heard it for at least 1 minute. Wisdom (Insight) vs. Charisma (Deception) to determine the sound is faked. [+1 Charisma]",
		improvements : "Actor (feat): +1 Charisma;",
		scores : [0, 0, 0, 0, 0, 1]
	},
	"alert" : {
		name : "Alert",
		source : ["P", 165],
		description : "I can't be surprised while I'm conscious. I have a +5 bonus on initiative rolls. Other creatures don't gain advantage on attack rolls against me as a result of being hidden from me.",
		eval : "Value(\"Init Bonus\", 5);",
		removeeval : "Value(\"Init Bonus\", \"\");"
	},
	"athlete" : {
		name : "Athlete",
		source : ["P", 165],
		description : "Standing up from prone uses only 5 ft of movement. Climbing doesn't cost me extra movement. I can make a running long jump or a running high jump after moving only 5 feet on foot, rather than 10 feet. [+1 Strength or Dexterity]",
		improvements : "Athlete (feat): +1 Strength or Dexterity;"
	},
	"charger" : {
		name : "Charger",
		source : ["P", 165],
		description : "When taking the Dash action and moving 10 feet or more in a straight line, I can immediately take a bonus action to make either one melee weapon attack with +5 damage or try to shove the target up to 10 feet away.",
		action : ["bonus action", " (after Dash action)"]
	},
	"crossbow expert" : {
		name : "Crossbow Expert",
		source : ["P", 165],
		description : "I ignore the loading quality of crossbows I'm proficient with. I don't suffer disadvantage on ranged attack rolls for being within 5 feet of a hostile. When I attack with a one-handed weapon, I can use a bonus action to attack with a loaded hand crossbow I'm holding.",
		action : ["bonus action", " (with Attack action)"],
		calcChanges : {
			atkAdd : ["if ((/crossbow/i).test(WeaponName) && fields.Proficiency) {fields.Description = fields.Description.replace(/(,? ?loading|loading,? ?)/i, '');};", "I ignore the loading quality of crossbows I'm proficient with."]
		}
	},
	"defensive duelist" : {
		name : "Defensive Duelist",
		source : ["P", 165],
		description : "When wielding a finesse weapon with which I am proficient and another creature hits me with a melee attack, I can use my reaction to add my proficiency bonus to my AC for that attack, potentially causing the attack to miss me.",
		prerequisite : "Dexterity 13 or higher",
		action : ["reaction", " (when hit in melee)"]
	},
	"dual wielder" : {
		name : "Dual Wielder",
		source : ["P", 165],
		description : "I can use two-weapon fighting even when the one-handed melee weapons I'm wielding aren't light. I can draw or stow two one-handed weapons when I would normally be able to draw or stow only one. +1 AC while wielding separate melee weapons in each hand.",
		eval : "AddACMisc(1, \"Dual Wielder (if 2 weapons)\", \"When wielding a melee weapon in each hand, the Dual Wielder feat gives a +1 bonus to AC\", \"ACshield\");",
		removeeval : "AddACMisc(0, \"Dual Wielder (if 2 weapons)\", \"When wielding a melee weapon in each hand, the Dual Wielder feat gives a +1 bonus to AC\");"
	},
	"dungeon delver" : {
		name : "Dungeon Delver",
		source : ["P", 166],
		description : "I have advantage on Wis (Perception) and Int (Investigation) checks made to detect the presence of secret doors. I can search for traps while traveling at a normal pace. I have resistance to damage dealt by traps and advantage on saves to avoid or resist traps.",
		eval : "AddString('Saving Throw advantages / disadvantages', 'Adv. vs. traps', '; '); AddResistance('Traps', 'Dungeon Delver'); AddString('Vision', 'Adv. on Perception and Investigation for secret doors', '; ');",
		removeeval : "RemoveString('Saving Throw advantages / disadvantages', 'Adv. vs. traps'); RemoveResistance('Traps'); RemoveString('Vision', 'Adv. on Perception and Investigation for secret doors');"
	},
	"durable" : {
		name : "Durable",
		source : ["P", 166],
		description : "When I roll a hit die to regain hit points, the minimum number of hit points I regain from the roll equals twice my Constitution modifier (minimum of 2). [+1 Constitution]",
		improvements : "Durable (feat): +1 Constitution;",
		scores : [0, 0, 1, 0, 0, 0]
	},
	"elemental adept" : {
		name : "Elemental Adept",
		source : ["P", 166],
		description : "Choose one of the damage types: acid, cold, fire, lightning, or thunder. Spells I cast ignore resistance to damage from this damage type. For any spell I cast that deals this damage type, I can treat any 1 on a damage die as a 2.",
		prerequisite : "The ability to cast at least one spell"
	},
	"grappler" : {
		name : "Grappler",
		source : ["P", 167],
		description : "I have advantage on attack rolls against a creature I am grappling. As an action, I can try to pin a creature grappled by me. If I succeed on a grapple check, both the creature and I are restrained until the grapple ends.",
		prerequisite : "Strength 13 or higher",
		action : ["action", " feat (pin grappled)"]
	},
	"great weapon master" : {
		name : "Great Weapon Master",
		source : ["P", 167],
		description : "If I score a critical hit or reduce a creature to 0 hit points with a melee weapon in my turn, I can make one melee weapon attack as a bonus action. With a heavy melee weapon, I can choose to take a -5 penalty on the attack roll for +10 on the attack's damage.",
		action : ["bonus action", " (after crit or take-down)"],
		calcChanges : {
			atkCalc : ["if (isMeleeWeapon && (/heavy/i).test(fields.Description) && (/power.{0,3}attack|great.{0,3}weapon.{0,3}master/i).test(WeaponText)) {output.extraDmg += 10; output.extraHit -= 5;};", "If I include the words 'Power Attack' or 'Great Weapon Master' in a heavy melee weapon's name or description, the calculation will put a -5 penalty on the attack's To Hit and +10 on its Damage."]
		}
	},
	"healer" : {
		name : "Healer",
		source : ["P", 167],
		description : "Using a healer's kit to stabilize someone gives them 1 hit point as well. As an action, I can spend one use of a healer's kit to restore 1d6 + 4 + (creature's HD) hit points. After that, the creature can't gain hit points from this feat again until it finishes a short rest.",
		action : ["action", " (1d6+4+HD with healing kit)"]
	},
	"heavily armored" : {
		name : "Heavily Armored",
		source : ["P", 167],
		description : "I gain proficiency with heavy armor. [+1 Strength]",
		prerequisite : "Proficiency with medium armor",
		improvements : "Heavily Armored (feat): +1 Strength;",
		scores : [1, 0, 0, 0, 0, 0],
		armor : [false, false, true, false]
	},
	"heavy armor master" : {
		name : "Heavy Armor Master",
		source : ["P", 167],
		description : "While wearing heavy armor, bludgeoning, piercing, and slashing damage taken from nonmagical weapons is reduced by 3. [+1 Strength]",
		prerequisite : "Proficiency with heavy armor",
		improvements : "Heavy Armor Master (feat): +1 Strength;",
		scores : [1, 0, 0, 0, 0, 0]
	},
	"inspiring leader" : {
		name : "Inspiring Leader",
		source : ["P", 167],
		calculate : "event.value = \"I can spend 10 minutes inspiring up to 6 friendly creatures within 30 feet who can see or hear and can understand me. Each gains lvl (\" + What(\"Character Level\") + \") + Cha mod (\" + What(\"Cha Mod\") + \") temporary hit points. One can't gain temporary hit points from this feat again until after a short rest.\"",
		prerequisite : "Charisma 13 or higher"
	},
	"keen mind" : {
		name : "Keen Mind",
		source : ["P", 167],
		description : "I always know which way is north and the number of hours left before the next sunrise or sunset. I can accurately recall anything I have seen or heard within the past month. [+1 Intelligence]",
		improvements : "Keen Mind (feat): +1 Intelligence;",
		scores : [0, 0, 0, 1, 0, 0]
	},
	"lightly armored" : {
		name : "Lightly Armored",
		source : ["P", 167],
		description : "I gain proficiency with light armor. [+1 Strength or Dexterity]",
		improvements : "Lightly Armored (feat): +1 Strength or Dexterity;",
		armor : [true, false, false, false]
	},
	"linguist" : {
		name : "Linguist",
		source : ["P", 167],
		calculate : "event.value = \"I can ably create written ciphers that others can't decipher unless I teach them, they succeed on an Intelligence check DC \" + (What(\"Int\") + What(\"Proficiency Bonus\")) + \" (Intelligence score + proficiency bonus), or they use magic to decipher it. I learn three languages of my choice. [+1 Intelligence]\"",
		improvements : "Linguist (feat): +1 Intelligence;",
		scores : [0, 0, 0, 1, 0, 0],
		eval : "AddLanguage(\"+3 from Linguist feat\", \"the Linguist feat\");",
		removeeval : "RemoveLanguage(\"+3 from Linguist feat\", \"the Linguist feat\");"
	},
	"lucky" : {
		name : "Lucky",
		source : ["P", 167],
		description : "Use one of three luck points to roll an extra d20 for attacking, being attacked, an ability check, or a saving throw before the outcome is determined. If more than one creature uses luck, no extra dice are rolled. I regain expended luck points when I finish a long rest.",
		eval : "AddFeature(\"Lucky (attack/check/save)\", 3, \"\", \"long rest\", \"the Lucky feat\");",
		removeeval : "RemoveFeature(\"Lucky (attack/check/save)\");"
	},
	"mage slayer" : {
		name : "Mage Slayer",
		source : ["P", 168],
		description : "As a reaction, I can make a melee weapon attack on a creature within 5 ft of me that casts a spell. Concentration checks from damage from me are made with disadvantage. I have advantage on saving throws against spells cast by creatures within 5 feet of me.",
		eval : "AddString('Saving Throw advantages / disadvantages', 'Advantage on saves vs. spells cast within 5 ft', '; '); AddAction('reaction', 'Melee weapon attack (if spell cast in 5 ft)', 'the Mage Slayer feat');",
		removeeval : "RemoveString('Saving Throw advantages / disadvantages', 'Advantage on saves vs. spells cast within 5 ft'); RemoveAction('reaction', 'Melee weapon attack (if spell cast in 5 ft)');"
	},
	"magic initiate [bard]" : {
		name : "Magic Initiate [Bard]",
		source : ["P", 168],
		description : "I learn two cantrips and one 1st-level spell of my choice from the bard's spell list.\nI can cast the spell it at its lowest level once per long rest.\nCharisma is my spellcasting ability for these.",
		eval : "CurrentSpells[\"magic initiate bard\"] = {name : \"Magic Initiate [Bard]\", ability : 6, list : {class : \"bard\"}, known : {cantrips : 2}, bonus : {bonus1 : {name : \"1st-Level Spell\", class : \"bard\", level : [1, 1], oncelr : true}}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"magic initiate bard\"]; SetStringifieds(\"spells\");",
	},
	"magic initiate [cleric]" : {
		name : "Magic Initiate [Cleric]",
		source : ["P", 168],
		description : "I learn two cantrips and one 1st-level spell of my choice from the cleric's spell list.\nI can cast the spell it at its lowest level once per long rest.\nWisdom is my spellcasting ability for these.",
		eval : "CurrentSpells[\"magic initiate cleric\"] = {name : \"Magic Initiate [Cleric]\", ability : 5, list : {class : \"cleric\"}, known : {cantrips : 2}, bonus : {bonus1 : {name : \"1st-Level Spell\", class : \"cleric\", level : [1, 1], oncelr : true}}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"magic initiate cleric\"]; SetStringifieds(\"spells\");",
	},
	"magic initiate [druid]" : {
		name : "Magic Initiate [Druid]",
		source : ["P", 168],
		description : "I learn two cantrips and one 1st-level spell of my choice from the druid's spell list.\nI can cast the spell it at its lowest level once per long rest.\nWisdom is my spellcasting ability for these.",
		eval : "CurrentSpells[\"magic initiate druid\"] = {name : \"Magic Initiate [Druid]\", ability : 5, list : {class : \"druid\"}, known : {cantrips : 2}, bonus : {bonus1 : {name : \"1st-Level Spell\", class : \"druid\", level : [1, 1], oncelr : true}}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"magic initiate druid\"]; SetStringifieds(\"spells\");",
	},
	"magic initiate [sorcerer]" : {
		name : "Magic Initiate [Sorcerer]",
		source : ["P", 168],
		description : "I learn two cantrips and one 1st-level spell of my choice from the sorcerer's spell list.\nI can cast the spell it at its lowest level once per long rest.\nCharisma is my spellcasting ability for these.",
		eval : "CurrentSpells[\"magic initiate sorcerer\"] = {name : \"Magic Initiate [Sorcerer]\", ability : 6, list : {class : \"sorcerer\"}, known : {cantrips : 2}, bonus : {bonus1 : {name : \"1st-Level Spell\", class : \"sorcerer\", level : [1, 1], oncelr : true}}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"magic initiate sorcerer\"]; SetStringifieds(\"spells\");",
	},
	"magic initiate [warlock]" : {
		name : "Magic Initiate [Warlock]",
		source : ["P", 168],
		description : "I learn two cantrips and one 1st-level spell of my choice from the warlock's spell list.\nI can cast the spell it at its lowest level once per long rest.\nCharisma is my spellcasting ability for these.",
		eval : "CurrentSpells[\"magic initiate warlock\"] = {name : \"Magic Initiate [Warlock]\", ability : 6, list : {class : \"warlock\"}, known : {cantrips : 2}, bonus : {bonus1 : {name : \"1st-Level Spell\", class : \"warlock\", level : [1, 1], oncelr : true}}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"magic initiate warlock\"]; SetStringifieds(\"spells\");",
	},
	"magic initiate [wizard]" : {
		name : "Magic Initiate [Wizard]",
		source : ["P", 168],
		description : "I learn two cantrips and one 1st-level spell of my choice from the wizard's spell list.\nI can cast the spell it at its lowest level once per long rest.\nIntelligence is my spellcasting ability for these.",
		eval : "CurrentSpells[\"magic initiate wizard\"] = {name : \"Magic Initiate  [Wizard]\", ability : 4, list : {class : \"wizard\"}, known : {cantrips : 2}, bonus : {bonus1 : {name : \"1st-Level Spell\", class : \"wizard\", level : [1, 1], oncelr : true}}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"magic initiate wizard\"]; SetStringifieds(\"spells\");",
	},
	"martial adept" : {
		name : "Martial Adept",
		source : ["P", 168],
		calculate : "event.value = \"I learn two maneuvers of my choice from those available to the Battle Master archetype. The saving throw DC for this is \" + (8 + What(\"Proficiency Bonus\") + Math.max(What(\"Str Mod\"), What(\"Dex Mod\"))) + \" (8 + proficiency bonus + Str/Dex mod). I gain one superiority die (d6), which I regain when I finish a short rest.\"",
		eval : "AddFeature(\"Combat Superiority \", 1, \"(d6)\", \"short rest\", \"the Martial Adept feat\", \"bonus\");",
		removeeval : "RemoveFeature(\"Combat Superiority \", 1);"
	},
	"medium armor master" : {
		name : "Medium Armor Master",
		source : ["P", 168],
		description : "Wearing medium armor doesn't impose disadvantage on my Dexterity (Stealth) checks. When I wear medium armor, I can add up to 3, rather than 2, to my AC if my Dexterity is 16 or higher.",
		prerequisite : "Proficiency with medium armor",
		eval : "Value(\"Medium Armor Max Mod\", 3); if (CurrentArmour.known && ArmourList[CurrentArmour.known].type === \"medium\") {Checkbox(\"AC Stealth Disadvantage\", false)}",
		removeeval : "tDoc.resetForm([\"Medium Armor Max Mod\"]); if (CurrentArmour.known && ArmourList[CurrentArmour.known].type === \"medium\") {Checkbox(\"AC Stealth Disadvantage\", ArmourList[CurrentArmour.known].stealthdis)};"
	},
	"mobile" : {
		name : "Mobile",
		source : ["P", 168],
		description : "When I use the Dash action, difficult terrain doesn't cost me extra movement that turn. When I make a melee attack against a creature, I don't provoke opportunity attacks from that creature for the rest of the turn, whether I hit or not. [+10 ft speed]",
		eval : "ChangeSpeed(10);",
		removeeval : "ChangeSpeed(-10);"
	},
	"moderately armored" : {
		name : "Moderately Armored",
		source : ["P", 168],
		description : "I gain proficiency with medium armor and shields. [+1 Strength or Dexterity]",
		prerequisite : "Proficiency with light armor",
		improvements : "Moderately Armored (feat): +1 Strength or Dexterity;",
		armor : [false, true, false, true]
	},
	"mounted combatant" : {
		name : "Mounted Combatant",
		source : ["P", 168],
		description : "I have advantage on melee attack rolls against unmounted creatures smaller than my mount. I can force attacks targeting my mount to target me instead. When a Dex save would halve damage, my mount takes no damage on success and half damage on failure."
	},
	"observant" : {
		name : "Observant",
		source : ["P", 168],
		description : "If I can see a creature's mouth while it is speaking a language I understand, I can interpret what it's saying by reading its lips. I have a +5 bonus to passive Wisdom (Perception) and passive Intelligence (Investigation) scores. [+1 Intelligence or Wisdom]",
		improvements : "Observant (feat): +1 Intelligence or Wisdom;",
		eval : "Value(\"Passive Perception Bonus\", 5, \"The Observant feat gives a +5 bonus to passive Wisdom (Perception)\");",
		removeeval : "Value(\"Passive Perception Bonus\", \"\", \"\");"
	},
	"polearm master" : {
		name : "Polearm Master",
		source : ["P", 168],
		description : "As a bonus action, when I take the Attack action with only a glaive/halberd/quarterstaff, I can make an attack with the butt end for 1d4 bludgeoning. While wielding a glaive/ halberd/pike/quarterstaff, I get an opportunity attack when a creature enters my reach.",
		eval : "AddAction(\"bonus action\", \"Butt end attack (after attack with polearm)\", \"the Polearm Master feat\"); AddWeapon(\"polearm butt end\");",
		removeeval : "RemoveAction(\"bonus action\", \"Butt end attack (after attack with polearm)\"); RemoveWeapon(\"polearm butt end\");",
		weapons : [false, false, ["polearm butt end"]]
	},
	"resilient [strength]" : {
		name : "Resilient [Strength]",
		source : ["P", 168],
		description : "I gain proficiency with Strength saving throws. [+1 Strength]",
		improvements : "Resilient (feat): +1 Strength;",
		scores : [1, 0, 0, 0, 0, 0],
		eval : "Checkbox(\"Str ST Prof\", true, \"Proficiency with Strength saving throw was gained from the Resilient feat\")",
		removeeval : "Checkbox(\"Str ST Prof\", false, \"\")"

	},
	"resilient [dexterity]" : {
		name : "Resilient [Dexterity]",
		source : ["P", 168],
		description : "I gain proficiency with Dexterity saving throws. [+1 Dexterity]",
		improvements : "Resilient (feat): +1 Dexterity;",
		scores : [0, 1, 0, 0, 0, 0],
		eval : "Checkbox(\"Dex ST Prof\", true, \"Proficiency with Dexterity saving throw was gained from the Resilient feat\")",
		removeeval : "Checkbox(\"Dex ST Prof\", false, \"\")"

	},
	"resilient [constitution]" : {
		name : "Resilient [Constitution]",
		source : ["P", 168],
		description : "I gain proficiency with Constitution saving throws. [+1 Constitution]",
		improvements : "Resilient (feat): +1 Constitution;",
		scores : [0, 0, 1, 0, 0, 0],
		eval : "Checkbox(\"Con ST Prof\", true, \"Proficiency with Constitution saving throw was gained from the Resilient feat\")",
		removeeval : "Checkbox(\"Con ST Prof\", false, \"\")"

	},
	"resilient [intelligence]" : {
		name : "Resilient [Intelligence]",
		source : ["P", 168],
		description : "I gain proficiency with Intelligence saving throws. [+1 Intelligence]",
		improvements : "Resilient (feat): +1 Intelligence;",
		scores : [0, 0, 0, 1, 0, 0],
		eval : "Checkbox(\"Int ST Prof\", true, \"Proficiency with Intelligence saving throw was gained from the Resilient feat\")",
		removeeval : "Checkbox(\"Int ST Prof\", false, \"\")"

	},
	"resilient [wisdom]" : {
		name : "Resilient [Wisdom]",
		source : ["P", 168],
		description : "I gain proficiency with Wisdom saving throws. [+1 Wisdom]",
		improvements : "Resilient (feat): +1 Wisdom;",
		scores : [0, 0, 0, 0, 1, 0],
		eval : "Checkbox(\"Wis ST Prof\", true, \"Proficiency with Wisdom saving throw was gained from the Resilient feat\")",
		removeeval : "Checkbox(\"Wis ST Prof\", false, \"\")"

	},
	"resilient [charisma]" : {
		name : "Resilient [Charisma]",
		source : ["P", 168],
		description : "I gain proficiency with Charisma saving throws. [+1 Charisma]",
		improvements : "Resilient (feat): +1 Charisma;",
		scores : [0, 0, 0, 0, 0, 1],
		eval : "Checkbox(\"Cha ST Prof\", true, \"Proficiency with Charisma saving throw was gained from the Resilient feat\")",
		removeeval : "Checkbox(\"Cha ST Prof\", false, \"\")"

	},
	"ritual caster [bard]" : {
		name : "Ritual Caster [Bard]",
		source : ["P", 169],
		description : "I can cast spells in my ritual book as rituals only. I gain two 1st-level ritual bard spells.\nI can copy ritual bard spells that I find into my book if they are not more than half my level (2 hours and 50 gp per spell level). Charisma is my spellcasting ability for these.",
		prerequisite : "Intelligence or Wisdom 13 or higher",
		eval : "CurrentSpells[\"ritual caster bard\"] = {name : \"Ritual Book [Bard]\", ability : 6, list : {class : \"bard\", ritual : true}, known : {spells : \"book\"}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"ritual caster bard\"]; SetStringifieds(\"spells\");"
	},
	"ritual caster [cleric]" : {
		name : "Ritual Caster [Cleric]",
		source : ["P", 169],
		description : "I can cast spells in my ritual book as rituals only. I gain two 1st-level ritual cleric spells.\nI can copy ritual cleric spells that I find into my book if they are not more than half my level (2 hours and 50 gp per spell level). Wisdom is my spellcasting ability for these.",
		prerequisite : "Intelligence or Wisdom 13 or higher",
		eval : "CurrentSpells[\"ritual caster cleric\"] = {name : \"Ritual Book [Cleric]\", ability : 5, list : {class : \"cleric\", ritual : true}, known : {spells : \"book\"}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"ritual caster cleric\"]; SetStringifieds(\"spells\");"
	},
	"ritual caster [druid]" : {
		name : "Ritual Caster [Druid]",
		source : ["P", 169],
		description : "I can cast spells in my ritual book as rituals only. I gain two 1st-level ritual druid spells.\nI can copy ritual druid spells that I find into my book if they are not more than half my level (2 hours and 50 gp per spell level). Wisdom is my spellcasting ability for these.",
		prerequisite : "Intelligence or Wisdom 13 or higher",
		eval : "CurrentSpells[\"ritual caster druid\"] = {name : \"Ritual Book [Druid]\", ability : 5, list : {class : \"druid\", ritual : true}, known : {spells : \"book\"}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"ritual caster druid\"]; SetStringifieds(\"spells\");"
	},
	"ritual caster [sorcerer]" : {
		name : "Ritual Caster [Sorcerer]",
		source : ["P", 169],
		description : "I can cast spells in my ritual book as rituals only. I gain two 1st-level ritual sorcerer spells.\nI can copy ritual sorcerer spells that I find into my book if they are not more than half my level (2 hours and 50 gp per spell level). Charisma is my spellcasting ability for these.",
		prerequisite : "Intelligence or Wisdom 13 or higher",
		eval : "CurrentSpells[\"ritual caster sorcerer\"] = {name : \"Ritual Book [Sorcerer]\", ability : 6, list : {class : \"sorcerer\", ritual : true}, known : {spells : \"book\"}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"ritual caster sorcerer\"]; SetStringifieds(\"spells\");"
	},
	"ritual caster [warlock]" : {
		name : "Ritual Caster [Warlock]",
		source : ["P", 169],
		description : "I can cast spells in my ritual book as rituals only. I gain two 1st-level ritual warlock spells.\nI can copy ritual warlock spells that I find into my book if they are not more than half my level (2 hours and 50 gp per spell level). Charisma is my spellcasting ability for these.",
		prerequisite : "Intelligence or Wisdom 13 or higher",
		eval : "CurrentSpells[\"ritual caster warlock\"] = {name : \"Ritual Book [Warlock]\", ability : 6, list : {class : \"warlock\", ritual : true}, known : {spells : \"book\"}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"ritual caster warlock\"]; SetStringifieds(\"spells\");"
	},
	"ritual caster [wizard]" : {
		name : "Ritual Caster [Wizard]",
		source : ["P", 169],
		description : "I can cast spells in my ritual book as rituals only. I gain two 1st-level ritual wizard spells.\nI can copy ritual wizard spells that I find into my book if they are not more than half my level (2 hours and 50 gp per spell level). Intelligence is my spellcasting ability for these.",
		prerequisite : "Intelligence or Wisdom 13 or higher",
		eval : "CurrentSpells[\"ritual caster wizard\"] = {name : \"Ritual Book [Wizard]\", ability : 4, list : {class : \"wizard\", ritual : true}, known : {spells : \"book\"}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"ritual caster wizard\"]; SetStringifieds(\"spells\");"
	},
	"savage attacker" : {
		name : "Savage Attacker",
		source : ["P", 169],
		description : "Once per turn, when I roll damage for a melee weapon attack, I can reroll the weapon's damage dice and use either total."
	},
	"sentinel" : {
		name : "Sentinel",
		source : ["P", 169],
		description : "Creatures I hit with opportunity attacks have 0 speed for this turn. The Disengage action doesn't work on me. When a creature within 5 ft makes an attack against a target other than me, I can use my reaction to make a melee weapon attack against the attacker.",
		action : ["reaction", " (after attack on ally)"]
	},
	"sharpshooter" : {
		name : "Sharpshooter",
		source : ["P", 170],
		description : "My ranged weapon attacks don't have disadvantage on long range and ignore half cover and three-quarters cover. With a ranged weapon that I am proficient with, I can choose to take a -5 penalty on the attack roll for +10 on the attack's damage.",
		calcChanges : {
			atkCalc : ["if (isRangedWeapon && (/power.{0,3}attack|sharp.{0,3}shoo?t/i).test(WeaponText)) {output.extraDmg += 10; output.extraHit -= 5;};", "If I include the words 'Power Attack', 'Sharpshooter', or 'Sharpshot' in a ranged weapon's name or description, the calculation will put a -5 penalty on the attack's To Hit and +10 on its Damage."]
		}
	},
	"shield master" : {
		name : "Shield Master",
		source : ["P", 170],
		description : "As a bonus action, when I use the Attack action, I can shove someone within 5 ft with my shield. I add my shield's AC bonus to Dex saves vs. effects targeting only me. As a reaction, if I succeed on a Dex save for half damage, I can interpose my shield to avoid the damage.",
		eval : "AddAction(\"bonus action\", \"Shove with shield (with Attack action)\", \"the Shield Master feat\"); AddAction(\"reaction\", \"Interpose shield (if Dex save half dmg)\", \"the Shield Master feat\");",
		removeeval : "RemoveAction(\"bonus action\", \"Shove with shield (with Attack action)\"); RemoveAction(\"reaction\", \"Interpose shield (if Dex save half dmg)\");"
	},
	"skilled" : {
		name : "Skilled",
		source : ["P", 170],
		description : "I gain proficiency with any combination of three skills or tools of my choice.",
		skills : "\n\n" + toUni("Skilled (feat)") + ": Choose three skills or tools."
	},
	"skulker" : {
		name : "Skulker",
		source : ["P", 170],
		description : "I can try to hide when I am lightly obscured. My position is not revealed when I am hidden from a creature and miss it with a ranged weapon attack. Dim light doesn't impose disadvantage on my Wisdom (Perception) checks relying on sight.",
		prerequisite : "Dexterity 13 or higher",
		eval : "AddString('Vision', 'No disadv. on Perception in dim light to see', '; ');",
		removeeval : "RemoveString('Vision', 'No disadv. on Perception in dim light to see');"
	},
	"spell sniper [bard]" : {
		name : "Spell Sniper [Bard]",
		source : ["P", 170],
		description : "Any spell that I cast that has a ranged attack roll has its range doubled and ignores half cover and three-quarters cover. I learn one bard cantrip that requires an attack roll. Charisma is my spellcasting ability for this.",
		prerequisite : "The ability to cast at least one spell",
		eval : "CurrentSpells[\"spell sniper bard\"] = {name : \"Spell Sniper [Bard]\", ability : 6, list : {class : \"bard\", attackOnly : \"true\"}, known : {cantrips : 1}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"spell sniper bard\"]; SetStringifieds(\"spells\");",
		calcChanges : {
			atkAdd : ["if (!spellSniper && !isDC && isSpell && (/^(?!.*melee).*\\d+ ?(f.{0,2}t|m).*$/i).test(fields.Range)) {var spellSniper = true; var rangeNmbr = fields.Range.match(/\\d+/); rangeNmbr.forEach(function(dR) {fields.Range = fields.Range.replace(dR, Number(dR) * 2);});}; ", "My spells and cantrips that require a ranged attack roll, have their range doubled."]
		}
	},
	"spell sniper [cleric]" : {
		name : "Spell Sniper [Cleric]",
		source : ["P", 170],
		description : "Any spell that I cast that has a ranged attack roll has its range doubled and ignores half cover and three-quarters cover. I learn one cleric cantrip that requires an attack roll. Wisdom is my spellcasting ability for this.",
		prerequisite : "The ability to cast at least one spell",
		eval : "CurrentSpells[\"spell sniper cleric\"] = {name : \"Spell Sniper [Cleric]\", ability : 5, list : {class : \"cleric\", attackOnly : \"true\"}, known : {cantrips : 1}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"spell sniper cleric\"]; SetStringifieds(\"spells\");",
		calcChanges : {
			atkAdd : ["if (!spellSniper && !isDC && isSpell && (/^(?!.*melee).*\\d+ ?(f.{0,2}t|m).*$/i).test(fields.Range)) {var spellSniper = true; var rangeNmbr = fields.Range.match(/\\d+/); rangeNmbr.forEach(function(dR) {fields.Range = fields.Range.replace(dR, Number(dR) * 2);});}; ", "My spells and cantrips that require a ranged attack roll, have their range doubled."]
		}
	},
	"spell sniper [druid]" : {
		name : "Spell Sniper [Druid]",
		source : ["P", 170],
		description : "Any spell that I cast that has a ranged attack roll has its range doubled and ignores half cover and three-quarters cover. I learn one druid cantrip that requires an attack roll. Wisdom is my spellcasting ability for this.",
		prerequisite : "The ability to cast at least one spell",
		eval : "CurrentSpells[\"spell sniper druid\"] = {name : \"Spell Sniper [Druid]\", ability : 5, list : {class : \"druid\", attackOnly : \"true\"}, known : {cantrips : 1}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"spell sniper druid\"]; SetStringifieds(\"spells\");",
		calcChanges : {
			atkAdd : ["if (!spellSniper && !isDC && isSpell && (/^(?!.*melee).*\\d+ ?(f.{0,2}t|m).*$/i).test(fields.Range)) {var spellSniper = true; var rangeNmbr = fields.Range.match(/\\d+/); rangeNmbr.forEach(function(dR) {fields.Range = fields.Range.replace(dR, Number(dR) * 2);});}; ", "My spells and cantrips that require a ranged attack roll, have their range doubled."]
		}
	},
	"spell sniper [sorcerer]" : {
		name : "Spell Sniper [Sorcerer]",
		source : ["P", 170],
		description : "Any spell that I cast that has a ranged attack roll has its range doubled and ignores half cover and three-quarters cover. I learn one sorcerer cantrip that requires an attack roll. Charisma is my spellcasting ability for this.",
		prerequisite : "The ability to cast at least one spell",
		eval : "CurrentSpells[\"spell sniper sorcerer\"] = {name : \"Spell Sniper [Sorcerer]\", ability : 6, list : {class : \"sorcerer\", attackOnly : \"true\"}, known : {cantrips : 1}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"spell sniper sorcerer\"]; SetStringifieds(\"spells\");",
		calcChanges : {
			atkAdd : ["if (!spellSniper && !isDC && isSpell && (/^(?!.*melee).*\\d+ ?(f.{0,2}t|m).*$/i).test(fields.Range)) {var spellSniper = true; var rangeNmbr = fields.Range.match(/\\d+/); rangeNmbr.forEach(function(dR) {fields.Range = fields.Range.replace(dR, Number(dR) * 2);});}; ", "My spells and cantrips that require a ranged attack roll, have their range doubled."]
		}
	},
	"spell sniper [warlock]" : {
		name : "Spell Sniper [Warlock]",
		source : ["P", 170],
		description : "Any spell that I cast that has a ranged attack roll has its range doubled and ignores half cover and three-quarters cover. I learn one warlock cantrip that requires an attack roll. Charisma is my spellcasting ability for this.",
		prerequisite : "The ability to cast at least one spell",
		eval : "CurrentSpells[\"spell sniper warlock\"] = {name : \"Spell Sniper [Warlock]\", ability : 6, list : {class : \"warlock\", attackOnly : \"true\"}, known : {cantrips : 1}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"spell sniper warlock\"]; SetStringifieds(\"spells\");",
		calcChanges : {
			atkAdd : ["if (!spellSniper && !isDC && isSpell && (/^(?!.*melee).*\\d+ ?(f.{0,2}t|m).*$/i).test(fields.Range)) {var spellSniper = true; var rangeNmbr = fields.Range.match(/\\d+/); rangeNmbr.forEach(function(dR) {fields.Range = fields.Range.replace(dR, Number(dR) * 2);});}; ", "My spells and cantrips that require a ranged attack roll, have their range doubled."]
		}
	},
	"spell sniper [wizard]" : {
		name : "Spell Sniper [Wizard]",
		source : ["P", 170],
		description : "Any spell that I cast that has a ranged attack roll has its range doubled and ignores half cover and three-quarters cover. I learn one wizard cantrip that requires an attack roll. Intelligence is my spellcasting ability for this.",
		prerequisite : "The ability to cast at least one spell",
		eval : "CurrentSpells[\"spell sniper wizard\"] = {name : \"Spell Sniper [Wizard]\", ability : 4, list : {class : \"wizard\", attackOnly : \"true\"}, known : {cantrips : 1}}; SetStringifieds(\"spells\");",
		removeeval : "delete CurrentSpells[\"spell sniper wizard\"]; SetStringifieds(\"spells\");",
		calcChanges : {
			atkAdd : ["if (!spellSniper && !isDC && isSpell && (/^(?!.*melee).*\\d+ ?(f.{0,2}t|m).*$/i).test(fields.Range)) {var spellSniper = true; var rangeNmbr = fields.Range.match(/\\d+/); rangeNmbr.forEach(function(dR) {fields.Range = fields.Range.replace(dR, Number(dR) * 2);});}; ", "My spells and cantrips that require a ranged attack roll, have their range doubled."]
		}
	},
	"svirfneblin magic" : {
		name : "Svirfneblin Magic",
		source : ["E", 7],
		prerequisite : "Being a Svirfneblin (Deep Gnome)",
		description : "I can cast Nondetection on myself at will, without a material component. I can also cast the spells Blindness/Deafness, Blur, and Disguise Self once each. I regain the ability to cast these spells when I finish a long rest. Intelligence is my spellcasting ability for these spells.",
		spellcastingBonus : [{
			name : "at will (self only)",
			spellcastingAbility : 4,
			spells : ["nondetection"],
			selection : ["nondetection"],
			atwill : true
		}, {
			name : "1x long rest (self only)",
			spells : ["disguise self", "blindness/deafness", "blur"],
			selection : ["disguise self", "blindness/deafness", "blur"],
			oncelr : true,
			times : 3
		}]
	},
	"tavern brawler" : {
		name : "Tavern Brawler",
		source : ["P", 170],
		description : "I am proficient with improvised weapons. My unarmed strike does 1d4 damage. When I hit a creature with an unarmed strike or improvised weapon on my turn, I can attempt to grapple the target as a bonus action. [+1 Strength or Constitution]",
		improvements : "Tavern Brawler (feat): +1 Strength or Constitution;",
		eval : "AddAction(\"bonus action\", \"Grapple (on hit with unarmed/improv.)\", \"the Tavern Brawler feat\");",
		removeeval : "RemoveAction(\"bonus action\", \"Grapple (on hit with unarmed/improv.)\");",
		weapons : [false, false, ["improvised weapons"]],
		calcChanges : {
			atkAdd : ["if (isMeleeWeapon && ((/unarmed strike/i).test(WeaponName) || (/improvised/i).test(WeaponName) || (/improvised weapon/i).test(theWea.type))) {fields.Description += (fields.Description ? '; ' : '') + 'After hitting, can attempt to grapple as a bonus action'; fields.Proficiency = true; }; if ((/unarmed strike/i).test(WeaponName) && fields.Damage_Die == 1) {fields.Damage_Die = '1d4'; }; ", "My unarmed strikes do 1d4 damage instead of 1;\n - After hitting a creature with an unarmed strike or improvised weapon in melee, I can attempt to start a grapple as a bonus action."]
		}
	},
	"tough" : {
		name : "Tough",
		source : ["P", 170],
		description : "My hit point maximum increases by an amount equal to twice my character level.",
		calcChanges : {
			hp : "extrahp += totalhd * 2; extrastring += '\\n + ' + totalhd + ' \\u00D7 2 from the Tough feat (' + (totalhd * 2) + ')';"
		}
	},
	"war caster" : {
		name : "War Caster",
		source : ["P", 170],
		prerequisite : "The ability to cast at least one spell",
		description : "Advantage on Con saves to maintain concentration on spells when damaged. Perform somatic components even when holding weapons or shield in one or both hands. Cast spell of 1 action casting time that targets only one creature instead of an opportunity attack.",
		action : ["reaction", " - Opportunity Spell"],
		eval : "AddString(\"Saving Throw advantages \/ disadvantages\", \"Adv. on Con (Concentration) saves when damaged\", \"; \");",
		removeeval : "RemoveString(\"Saving Throw advantages \/ disadvantages\", \"Adv. on Con (Concentration) saves when damaged\", false);"
	},
	"weapon master" : {
		name : "Weapon Master",
		source : ["P", 170],
		description : "I gain proficiency with four simple or martial weapons of my choice.\n[+1 Strength or Dexterity]",
		improvements : "Weapon Master (feat): +1 Strength or Dexterity;",
	}
};