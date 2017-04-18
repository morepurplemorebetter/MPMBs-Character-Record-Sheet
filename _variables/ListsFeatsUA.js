//All the feats from the Unearthed Arcana articles are present in this file chronologically

/*	the Eberron Unearthed Arcana of 2015-02-02
	(http://media.wizards.com/2015/downloads/dnd/UA_Eberron_v1.pdf)
*/
//adds the 12 variants of the dragonmark feat
FeatsList["dragonmark [detection]"] = {
	name : "Dragonmark [Detection]",
	source : ["UA:E", 6],
	description : "I learn the Mage Hand cantrip. I can also cast Detect Magic, Detect Thoughts (from 5th level onwards), and Clairvoyance (from 9th level onwards), each once per long rest. Wisdom is my spellcasting ability for these.",
	spellcastingBonus : {
		name : "Dragonmark",
		spellcastingAbility : 5,
		spells : ["mage hand", "detect magic", "detect thoughts", "clairvoyance"],
		selection : ["mage hand", "detect magic", "detect thoughts", "clairvoyance"],
		times : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		oncelr : true
	}
};
FeatsList["dragonmark [finding]"] = {
	name : "Dragonmark [Finding]",
	source : ["UA:E", 6],
	description : "I learn the Mage Hand cantrip. I can also cast Identify, Locate Object (from 5th level onwards), and Clairvoyance (from 9th level onwards), each once per long rest. Wisdom is my spellcasting ability for these.",
	spellcastingBonus : {
		name : "Dragonmark",
		spellcastingAbility : 5,
		spells : ["mage hand", "identify", "locate object", "clairvoyance"],
		selection : ["mage hand", "identify", "locate object", "clairvoyance"],
		times : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		oncelr : true
	}
};
FeatsList["dragonmark [handling]"] = {
	name : "Dragonmark [Handling]",
	source : ["UA:E", 6],
	description : "I learn the Druidcraft cantrip. I can also cast Speak with Animals, Beast Sense (from 5th level onwards), and Conjure Animals (from 9th level onwards), each once per long rest. Wisdom is my spellcasting ability for these.",
	spellcastingBonus : {
		name : "Dragonmark",
		spellcastingAbility : 5,
		spells : ["druidcraft", "speak with animals", "beast sense", "conjure animals"],
		selection : ["druidcraft", "speak with animals", "beast sense", "conjure animals"],
		times : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		oncelr : true
	}
};
FeatsList["dragonmark [healing]"] = {
	name : "Dragonmark [Healing]",
	source : ["UA:E", 6],
	description : "I learn the Spare the Dying cantrip. I can also cast Cure Wounds, Lesser Restoration (from 5th level onwards), and Revivify (from 9th level onwards), each once per long rest. Wisdom is my spellcasting ability for these.",
	spellcastingBonus : {
		name : "Dragonmark",
		spellcastingAbility : 5,
		spells : ["spare the dying", "cure wounds", "lesser restoration", "revivify"],
		selection : ["spare the dying", "cure wounds", "lesser restoration", "revivify"],
		times : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		oncelr : true
	}
};
FeatsList["dragonmark [hospitality]"] = {
	name : "Dragonmark [Hospitality]",
	source : ["UA:E", 6],
	description : "I learn the Friends cantrip. I can also cast Unseen Servant, Rope Trick (from 5th level onwards), and Leomund's Tiny Hut (from 9th level onwards), each once per long rest. Charisma is my spellcasting ability for these.",
	spellcastingBonus : {
		name : "Dragonmark",
		spellcastingAbility : 6,
		spells : ["friends", "unseen servant", "rope trick", "leomund's tiny hut"],
		selection : ["friends", "unseen servant", "rope trick", "leomund's tiny hut"],
		times : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		oncelr : true
	}
};
FeatsList["dragonmark [making]"] = {
	name : "Dragonmark [Making]",
	source : ["UA:E", 6],
	description : "I learn the Mending cantrip. I can also cast Identify, Magic Weapon (from 5th level onwards), and Fabricate (from 9th level onwards), each once per long rest. Intelligence is my spellcasting ability for these.",
	spellcastingBonus : {
		name : "Dragonmark",
		spellcastingAbility : 4,
		spells : ["mending", "identify", "magic weapon", "fabricate"],
		selection : ["mending", "identify", "magic weapon", "fabricate"],
		times : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		oncelr : true
	}
};
FeatsList["dragonmark [passage]"] = {
	name : "Dragonmark [Passage]",
	source : ["UA:E", 6],
	description : "I learn the Light cantrip. I can also cast Expeditious Retreat, Misty Step (from 5th level onwards), and Teleportation Circle (from 9th level onwards), each once per long rest. Intelligence is my spellcasting ability for these.",
	spellcastingBonus : {
		name : "Dragonmark",
		spellcastingAbility : 4,
		spells : ["light", "expeditious retreat", "misty step", "teleportation circle"],
		selection : ["light", "expeditious retreat", "misty step", "teleportation Circle"],
		times : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		oncelr : true
	}
};
FeatsList["dragonmark [scribing]"] = {
	name : "Dragonmark [Scribing]",
	source : ["UA:E", 6],
	description : "I learn the Message cantrip. I can also cast Comprehend Languages, Sending (from 5th level onwards), and Tongues (from 9th level onwards), each once per long rest. Intelligence is my spellcasting ability for these.",
	spellcastingBonus : {
		name : "Dragonmark",
		spellcastingAbility : 4,
		spells : ["message", "comprehend languages", "sending", "tongues"],
		selection : ["message", "comprehend languages", "sending", "tongues"],
		times : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		oncelr : true
	}
};
FeatsList["dragonmark [sentinel]"] = {
	name : "Dragonmark [Sentinel]",
	source : ["UA:E", 6],
	description : "I learn the Blade Ward cantrip. I can also cast Compelled Duel, Blur (from 5th level onwards), and Protection from Energy (from 9th level onwards), each once per long rest. Wisdom is my spellcasting ability for these.",
	spellcastingBonus : {
		name : "Dragonmark",
		spellcastingAbility : 5,
		spells : ["blade ward", "compelled duel", "blur", "protection from energy"],
		selection : ["blade ward", "compelled duel", "blur", "protection from energy"],
		times : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		oncelr : true
	}
};
FeatsList["dragonmark [shadow]"] = {
	name : "Dragonmark [Shadow]",
	source : ["UA:E", 6],
	description : "I learn the Dancing Lights cantrip. I can also cast Disguise Self, Darkness (from 5th level onwards), and Nondetection (from 9th level onwards), each once per long rest. Charisma is my spellcasting ability for these.",
	spellcastingBonus : {
		name : "Dragonmark",
		spellcastingAbility : 6,
		spells : ["dancing lights", "disguise self", "darkness", "nondetection"],
		selection : ["dancing lights", "disguise self", "darkness", "nondetection"],
		times : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		oncelr : true
	}
};
FeatsList["dragonmark [storm]"] = {
	name : "Dragonmark [Storm]",
	source : ["UA:E", 6],
	description : "I learn the Shocking Grasp cantrip. I can also cast Fog Cloud, Gust of Wind (from 5th level onwards), and Sleet Storm (from 9th level onwards), each once per long rest. Intelligence is my spellcasting ability for these.",
	spellcastingBonus : {
		name : "Dragonmark",
		spellcastingAbility : 4,
		spells : ["shocking grasp", "fog cloud", "gust of wind", "sleet storm"],
		selection : ["shocking grasp", "fog cloud", "gust of wind", "sleet storm"],
		times : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		oncelr : true
	}
};
FeatsList["dragonmark [warding]"] = {
	name : "Dragonmark [Warding]",
	source : ["UA:E", 6],
	description : "I learn the Resistance cantrip. I can also cast Alarm, Arcane Lock (from 5th level onwards), and Magic Circle (from 9th level onwards), each once per long rest. Intelligence is my spellcasting ability for these.",
	spellcastingBonus : {
		name : "Dragonmark",
		spellcastingAbility : 4,
		spells : ["resistance", "alarm", "arcane lock", "magic circle"],
		selection : ["resistance", "alarm", "arcane lock", "magic circle"],
		times : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		oncelr : true
	}
};

/*	the Feats Unearthed Arcana of 2016-06-06
	(http://media.wizards.com/2016/downloads/DND/UA-Feats-V1.pdf)
*/
//adds 8 feats: 4 'weapon mastery' feats and 4 'tool' feats
//doesn't add the "Warhammer Master" feat, as that is only in the article to illustrate how not to design a feat
FeatsList["fell handed"] = {
	name : "Fell Handed",
	source : ["UA:F", 2],
	description : "With a handaxe, battleaxe, greataxe, warhammer, or maul, I get +1 to hit, knock prone if I have adv. and hit with both rolls, with disadv. still do Str mod in bludg. damage if I miss but the other die would've hit, can use Help to give ally +2 to hit vs. enemy with a shield.",
	calcChanges : {
		atkAdd : ["if ((/handaxe|battleaxe|greataxe|warhammer|maul/).test(WeaponName)) {fields.Description += (fields.Description ? '; ' : '') + 'Adv: knock prone if both dice hit; Disadv: Str Mod bludg. damage on miss but 2nd die would hit';}; ", "With a handaxe, battleaxe, greataxe, warhammer, or maul, I get the following benefits:\n - +1 to hit;\n - When attacking with advantage, the target is knocked prone if both die would hit;\n - When attacking with disadvantage and missing, still do my Strength modifier in bludgeoning damage."],
		atkCalc : ["if ((/handaxe|battleaxe|greataxe|warhammer|maul/).test(WeaponName)) {output.extraHit += 1;}; ", ""]
	}
};
FeatsList["blade mastery"] = {
	name : "Blade Mastery",
	source : ["UA:F", 2],
	description : "With a shortsword, longsword, greatsword, scimitar, or rapier, I get +1 to hit, advantage on opportunity attacks, and with the weapon in hand I can use my reaction to assume a parrying stance that gives me +1 AC until the start of my next turn.",
	calcChanges : {
		atkAdd : ["if ((/shortsword|longsword|greatsword|scimitar|rapier/).test(WeaponName)) {fields.Description += (fields.Description ? '; ' : '') + 'Advantage on opportunity attacks';}; ", "With a shortsword, longsword, greatsword, scimitar, or rapier, I get the following benefits:\n - +1 to hit;\n - Advantage on opportunity attacks."],
		atkCalc : ["if ((/shortsword|longsword|greatsword|scimitar|rapier/).test(WeaponName)) {output.extraHit += 1;}; ", ""]
	},
	eval : "AddAction('reaction', 'Blade Mastery Parrying Stance', 'the Blade Mastery feat');",
	removeeval : "RemoveAction('reaction', 'Blade Mastery Parrying Stance');",
};
FeatsList["flail mastery"] = {
	name : "Flail Mastery",
	source : ["UA:F", 3],
	calculate : "event.value = 'With a flail, I get +1 to hit, and enemies hit by an opportunity attack with it have to make a Str save DC ' + (8 + Number(What('Proficiency Bonus')) + What('Str Mod')) + ' (8 + Prof. bonus + Str mod) or be knocked prone. As a bonus action, I can get +2 to hit with my flail vs. targets with shields until the end of my turn.';",
	calcChanges : {
		atkAdd : ["if (WeaponName === 'flail') {fields.Description += (fields.Description ? '; ' : '') + 'On opportunity attack hit, Strength save (DC 8 + Prof. bonus + Str mod) or knocked prone';}; ", "With a flail, I get the following benefits:\n - +1 to hit;\n - Targets hit with it must make a Strength saving throw (DC 8 + proficiency bonus + Strength modifier) or be knocked prone."],
		atkCalc : ["if (WeaponName === 'flail') {output.extraHit += 1;}; ", ""]
	},
	eval : "AddAction('bonus action', 'Flail Mastery', 'the Flail Mastery feat');",
	removeeval : "RemoveAction('bonus action', 'Flail Mastery');",
};
FeatsList["spear mastery"] = {
	name : "Spear Mastery",
	source : ["UA:F", 3],
	description : "With a spear, I get +1 to hit and it does d8 damage (versatile d10). As a bonus action, I select a target at least 20 ft away. If it moves in reach on its next turn, I can attack it as a reaction, extra damage die. As a bonus action, I can increase the speer's reach with 5 ft.",
	calcChanges : {
		atkAdd : ["if (WeaponName === 'spear') { fields.Damage_Die = fields.Damage_Die === '1d6' ? '1d8' : fields.Damage_Die; fields.Description = fields.Description.replace('versatile (1d8)', 'versatile (1d10)'); }; ", "With a spear, I get the following benefits:\n - +1 to hit;\n - The spear damage die increases to d8 (versatile d10)."],
		atkCalc : ["if (WeaponName === 'spear') {output.extraHit += 1;}; ", ""]
	},
	eval : "AddAction('bonus action', 'Spear Mastery (set vs. charge)', 'the Spear Mastery feat'); AddAction('bonus action', 'Spear Mastery (increase reach)', 'the Spear Mastery feat');",
	removeeval : "RemoveAction('bonus action', 'Spear Mastery (set vs. charge)'); RemoveAction('bonus action', 'Spear Mastery (increase reach)');",
};
FeatsList["alchemist"] = {
	name : "Alchemist",
	source : ["UA:F", 4],
	description : "I gain proficiency with alchemist's supplies, or expertise if already proficient. As an action, I can identify a potion within 5 ft. During a rest with alchemist's supplies, I can make a potion of healing, of any rarity. Consuming it within 1 hour maximizes its effects [+1 Int]",
	improvements : "Alchemist (feat): +1 Intelligence;",
	scores : [0, 0, 0, 1, 0, 0],
	eval : "AddTool('Alchemist\\'s Supplies', 'the Alchemist feat'); AddAction('action', 'Alchemist (identify potion)', 'the Alchemist feat'); if ((/(alchemist|alchemy).*(supplies|kit)/i).test(What('Too Text'))) { Checkbox('Too Exp', true); } else if (What('Too') === '') {Checkbox('Too Prof', true); Value('Too Text', 'Alchemist Kit (Int)'); };",
	removeeval : "RemoveTool('Alchemist\\'s Supplies', 'the Alchemist feat'); RemoveAction('action', 'Alchemist (identify potion)'); if ((/(alchemist|alchemy).*(supplies|kit)/i).test(What('Too Text'))) { if (tDoc.getField('Too Exp').isBoxChecked(0)) { Checkbox('Too Exp', false); } else { tDoc.resetForm(['Too Prof', 'Too Exp', 'Too Text']); }; };"
};
FeatsList["burglar"] = {
	name : "Burglar",
	source : ["UA:F", 4],
	description : "I gain proficiency with thieves' tools, or expertise with them if I'm already proficient. [+1 Dexterity]",
	improvements : "Burglar (feat): +1 Dexterity;",
	scores : [0, 1, 0, 0, 0, 0],
	eval : "if ((/thieves.*tools/i).test(What('Too Text'))) { Checkbox('Too Exp', true); }; AddTool('Thieves\\' Tools', 'the Burglar feat'); ",
	removeeval : "if ((/thieves.*tools/i).test(What('Too Text'))) { if (tDoc.getField('Too Exp').isBoxChecked(0)) { Checkbox('Too Exp', false); } else { RemoveTool('Thieves\\' Tools', 'the Burglar feat'); tDoc.resetForm(['Too Prof', 'Too Exp', 'Too Text']); }; };"
};
FeatsList["gourmand"] = {
	name : "Gourmand",
	source : ["UA:F", 4],
	description : "I gain proficiency with cook's utensils, or expertise if already proficient. As an action, I can detect poison in food within 5 ft. In a long rest with food/supplies, I can have 6 creatures regain 2 extra HD and give them adv. on Con saves vs. disease for 24 hours. [+1 Con]",
	improvements : "Gourmand (feat): +1 Constitution;",
	scores : [0, 0, 1, 0, 0, 0],
	eval : "AddTool('Cook\\'s Utensils', 'the Gourmand feat'); AddAction('action', 'Gourmand (inspect food)', 'the Gourmand feat'); if ((/cook.*utensils/i).test(What('Too Text'))) { Checkbox('Too Exp', true); } else if (What('Too') === '') {Checkbox('Too Prof', true); Value('Too Text', 'Cook\\'s Utensils (Int)'); };",
	removeeval : "RemoveTool('Cook\\'s Utensils', 'the Gourmand feat'); RemoveAction('action', 'Gourmand (inspect food)'); if ((/cook.*utensils/i).test(What('Too Text'))) { if (tDoc.getField('Too Exp').isBoxChecked(0)) { Checkbox('Too Exp', false); } else { tDoc.resetForm(['Too Prof', 'Too Exp', 'Too Text']); }; };"
};
FeatsList["master of disguise"] = {
	name : "Master of Disguise",
	source : ["UA:F", 4],
	description : "I gain proficiency with the disguise kit, or expertise with it if I'm already proficient. After observing a creature for 1 hour, I can craft a disguise to mimic it in 8 hours with a disguise kit. Once finished, I can don this disguise as an action. [+1 Charisma]",
	improvements : "Master of Disguise (feat): +1 Charisma;",
	scores : [0, 0, 0, 0, 0, 1],
	eval : "AddTool('Disguise Kit', 'the Master of Disguise feat'); AddAction('action', 'Master of Disguise (don disguise)', 'the Master of Disguise feat'); if ((/disguise.*kit/i).test(What('Too Text'))) { Checkbox('Too Exp', true); } else if (What('Too') === '') {Checkbox('Too Prof', true); Value('Too Text', 'Disguise Kit (Cha)'); };",
	removeeval : "RemoveTool('Disguise Kit', 'the Master of Disguise feat'); RemoveAction('action', 'Master of Disguise (don disguise)'); if ((/disguise.*kit/i).test(What('Too Text'))) { if (tDoc.getField('Too Exp').isBoxChecked(0)) { Checkbox('Too Exp', false); } else { tDoc.resetForm(['Too Prof', 'Too Exp', 'Too Text']); }; };"
};

/*	the Feats for Skills Unearthed Arcana of 2017-04-17
	(http://media.wizards.com/2017/dnd/downloads/UA-SkillFeats.pdf)
*/
//adds 18 feats, correspondning with the 18 skills
FeatsList["acrobat"] = {
	name : "Acrobat",
	source : ["UA:FS", 1],
	description : "I gain expertise with Acrobatics, or proficiency if not so already. As a bonus action, I can make a DC 15 Dexterity (Acrobatics) check to have difficult terrain not cost me extra movement for this turn. [+1 Dexterity]",
	improvements : "Acrobat (feat): +1 Dexterity;",
	scores : [0, 1, 0, 0, 0, 0],
	eval : "AddSkillProf('Acr', true, 'increment')",
	removeeval : "AddSkillProf('Acr', false, 'increment')",
	action : ["bonus action", ""]
};
FeatsList["animal handler"] = {
	name : "Animal Handler",
	source : ["UA:FS", 1],
	description : "I gain expertise with Animal Handling, or proficiency if not so already. As a bonus action, I can command a friendly beast not under another's command within 60 ft. If it hears me, I decide its next turn or give a general command lasting for 1 minute. [+1 Wisdom]",
	improvements : "Animal Handler (feat): +1 Wisdom;",
	scores : [0, 0, 0, 0, 1, 0],
	eval : "AddSkillProf('Ani', true, 'increment')",
	removeeval : "AddSkillProf('Ani', false, 'increment')",
	action : ["bonus action", ""]
};
FeatsList["arcanist"] = {
	name : "Arcanist",
	source : ["UA:FS", 1],
	description : "I gain expertise with Arcana, or proficiency if not so already. I learn the Prestidigitation cantrip. I can cast Detect Magic without using a spell slot. Once I do so, I can't do it again until I finish a long rest. [+1 Intelligence]",
	improvements : "Arcanist (feat): +1 Intelligence;",
	scores : [0, 0, 0, 1, 0, 0],
	eval : "AddSkillProf('Arc', true, 'increment')",
	removeeval : "AddSkillProf('Arc', false, 'increment')",
	spellcastingBonus : [{
		name : "Arcanist",
		spellcastingAbility : 4,
		spells : ["prestidigitation"],
		selection : ["prestidigitation"],
		atwill : true
	}, {
		name : "Arcanist (1x long rest)",
		spells : ["detect magic"],
		selection : ["detect magic"],
		oncelr : true
	}]
};
FeatsList["brawny"] = {
	name : "Brawny",
	source : ["UA:FS", 1],
	description : "I gain expertise with Athletics, or proficiency if not so already. I count as one size larger when determining my carrying capacity and the weight I can push, drag, or lift. [+1 Strength]",
	improvements : "Brawny (feat): +1 Strength;",
	scores : [1, 0, 0, 0, 0, 0],
	eval : "AddSkillProf('Ath', true, 'increment'); tDoc.getField('Carrying Capacity Multiplier').value *= 2;",
	removeeval : "AddSkillProf('Ath', false, 'increment'); tDoc.getField('Carrying Capacity Multiplier').value /= 2;"
};
FeatsList["diplomat"] = {
	name : "Diplomat",
	source : ["UA:FS", 2],
	description : "I gain expertise with Persuasion, or proficiency if not so already. With a one minute long conversation outside of combat, I can make a Persuasion vs. its Insight. If successful, it is charmed by me as long as it remains within 60 ft and 1 minute after that [+1 Charisma]",
	improvements : "Diplomat (feat): +1 Charisma;",
	scores : [0, 0, 0, 0, 0, 1],
	eval : "AddSkillProf('Pers', true, 'increment')",
	removeeval : "AddSkillProf('Pers', false, 'increment')"
};
FeatsList["empathic"] = {
	name : "Empathic",
	source : ["UA:FS", 2],
	description : "I gain expertise with Insight, or proficiency if not so already. As an action, a humanoid within 30 ft I can see must make its Deception vs. my Insight or I gain advantage on attacks and ability checks against it until the end of my next turn. [+1 Wisdom]",
	improvements : "Empathic (feat): +1 Wisdom;",
	scores : [0, 0, 0, 0, 1, 0],
	eval : "AddSkillProf('Ins', true, 'increment')",
	removeeval : "AddSkillProf('Ins', false, 'increment')"
};
FeatsList["historian"] = {
	name : "Historian",
	source : ["UA:FS", 2],
	description : "I gain expertise with History, or proficiency if not so already. When I use the Help action to help a creature that can understand me with an ability check, I can make a DC 15 Int (History) check to give a bonus equal to my proficiency bonus. [+1 Intelligence]",
	improvements : "Historian (feat): +1 Intelligence;",
	scores : [0, 0, 0, 1, 0, 0],
	eval : "AddSkillProf('His', true, 'increment')",
	removeeval : "AddSkillProf('His', false, 'increment')",
	action : ["action", ""]
};
FeatsList["investigator"] = {
	name : "Investigator",
	source : ["UA:FS", 2],
	description : "I gain expertise with Investigation, or proficiency if not so already. As a bonus action, I can take the Search action. [+1 Intelligence]",
	improvements : "Investigator (feat): +1 Intelligence;",
	scores : [0, 0, 0, 1, 0, 0],
	eval : "AddSkillProf('Inv', true, 'increment')",
	removeeval : "AddSkillProf('Inv', false, 'increment')",
	action : ["bonus action", " (Search)"]
};
FeatsList["medic"] = {
	name : "Medic",
	source : ["UA:FS", 2],
	description : "I gain expertise with Medicine, or proficiency if not so already. During a short rest, I can attend to the wounds of up to 6 creatures. With a DC 15 Wis (Medicine) check for each creature, that target gets the maximum result on one of its HD that it uses. [+1 Wisdom]",
	improvements : "Medic (feat): +1 Wisdom;",
	scores : [0, 0, 0, 0, 1, 0],
	eval : "AddSkillProf('Med', true, 'increment')",
	removeeval : "AddSkillProf('Med', false, 'increment')"
};
FeatsList["menacing"] = {
	name : "Menacing",
	source : ["UA:FS", 2],
	description : "I gain expertise with Intimidation, or proficiency if not so already. Instead of 1 attack in my Attack action, a humanoid within 30 ft I can see and that can see and hear me must make its Insight vs. my Intimidation or be frightened until end of my next turn. [+1 Cha]",
	improvements : "Menacing (feat): +1 Charisma;",
	scores : [0, 0, 0, 0, 0, 1],
	eval : "AddSkillProf('Inti', true, 'increment')",
	removeeval : "AddSkillProf('Inti', false, 'increment')"
};
FeatsList["naturalist"] = {
	name : "Naturalist",
	source : ["UA:FS", 3],
	description : "I gain expertise with Nature, or proficiency if not so already. I learn the Druidcraft cantrip. I can cast Detect Poison and Disease without using a spell slot. Once I do so, I can't do it again until I finish a long rest. [+1 Intelligence]",
	improvements : "Naturalist (feat): +1 Intelligence;",
	scores : [0, 0, 0, 1, 0, 0],
	eval : "AddSkillProf('Nat', true, 'increment')",
	removeeval : "AddSkillProf('Nat', false, 'increment')",
	spellcastingBonus : [{
		name : "Naturalist",
		spellcastingAbility : 4,
		spells : ["druidcraft"],
		selection : ["druidcraft"],
		atwill : true
	}, {
		name : "Naturalist (1x long rest)",
		spells : ["detect poison and disease"],
		selection : ["detect poison and disease"],
		oncelr : true
	}]
};
FeatsList["perceptive"] = {
	name : "Perceptive",
	source : ["UA:FS", 3],
	description : "I gain expertise with Perception, or proficiency if not so already. I don't have disadvantage on my Perception checks from being in a lightly obscured area (dim light), provided that I can still both see and hear. [+1 Wisdom]",
	improvements : "Perceptive (feat): +1 Wisdom;",
	scores : [0, 0, 0, 0, 1, 0],
	eval : "AddSkillProf('Perc', true, 'increment'); AddString('Vision', 'No disadv. on Perception in lightly obscured/dim light', '; ');",
	removeeval : "AddSkillProf('Perc', false, 'increment'); RemoveString('Vision', 'No disadv. on Perception in lightly obscured/dim light to see');"
};
FeatsList["performer"] = {
	name : "Performer",
	source : ["UA:FS", 3],
	description : "I gain expertise with Performance, or proficiency if not so already. While performing, I can distract one humanoid. It must make its Insight vs. my Performance or have disadv. on its Perception and Investigation checks until I stop performing. [+1 Charisma]",
	improvements : "Performer (feat): +1 Charisma;",
	scores : [0, 0, 0, 0, 0, 1],
	eval : "AddSkillProf('Perf', true, 'increment')",
	removeeval : "AddSkillProf('Perf', false, 'increment')"
};
FeatsList["quick-fingered"] = {
	name : "Quick-Fingered",
	source : ["UA:FS", 3],
	description : "I gain expertise with Sleight of Hand, or proficiency if not so already. As a bonus action, I can make a Dexterity (Sleight of Hand) check to plan something on someone else, conceal an object on a creature, lift a purse, or take something from a pocket. [+1 Dexterity]",
	improvements : "Quick-Fingered (feat): +1 Dexterity;",
	scores : [0, 1, 0, 0, 0, 0],
	eval : "AddSkillProf('Sle', true, 'increment')",
	removeeval : "AddSkillProf('Sle', false, 'increment')",
	action : ["bonus action", ""]
};
FeatsList["silver-tongued"] = {
	name : "Silver-Tongued",
	source : ["UA:FS", 3],
	description : "I gain expertise with Deception, or proficiency if not so already. Instead of 1 attack in my Attack action, a humanoid within 30 ft makes its Insight vs. my Deception or until end of my next turn, I gain adv. on attacks and don't provoke its opportunity attacks. [+1 Cha]",
	improvements : "Silver-Tongued (feat): +1 Charisma;",
	scores : [0, 0, 0, 0, 0, 1],
	eval : "AddSkillProf('Dec', true, 'increment')",
	removeeval : "AddSkillProf('Dec', false, 'increment')"
};
FeatsList["stealthy"] = {
	name : "Stealthy",
	source : ["UA:FS", 4],
	description : "I gain expertise with Stealth, or proficiency if not so already. When I'm hidden, I can move 10 ft to another position without revealing myself, provided that I won't be clearly visible in this new position either. [+1 Dexterity]",
	improvements : "Stealthy (feat): +1 Dexterity;",
	scores : [0, 1, 0, 0, 0, 0],
	eval : "AddSkillProf('Ste', true, 'increment')",
	removeeval : "AddSkillProf('Ste', false, 'increment')"
};
FeatsList["survivalist"] = {
	name : "Survivalist",
	source : ["UA:FS", 4],
	description : "I gain expertise with Survival, or proficiency if not so already. I can cast Alarm without using a spell slot. Once I do so, I can't do it again until I finish a long rest. [+1 Wisdom]",
	improvements : "Survivalist (feat): +1 Wisdom;",
	scores : [0, 0, 0, 0, 1, 0],
	eval : "AddSkillProf('Sur', true, 'increment')",
	removeeval : "AddSkillProf('Sur', false, 'increment')",
	spellcastingBonus : {
		name : "1x long rest",
		spellcastingAbility : 5,
		spells : ["alarm"],
		selection : ["alarm"],
		oncelr : true
	}
};
FeatsList["theologian"] = {
	name : "Theologian",
	source : ["UA:FS", 4],
	description : "I gain expertise with Religion, or proficiency if not so already. I learn the Thaumaturgy cantrip. I can cast Detect Evil and Good without using a spell slot. Once I do so, I can't do it again until I finish a long rest. [+1 Intelligence]",
	improvements : "Theologian (feat): +1 Intelligence;",
	scores : [0, 0, 0, 1, 0, 0],
	eval : "AddSkillProf('Rel', true, 'increment')",
	removeeval : "AddSkillProf('Rel', false, 'increment')",
	spellcastingBonus : [{
		name : "Theologian",
		spellcastingAbility : 4,
		spells : ["thaumaturgy"],
		selection : ["thaumaturgy"],
		atwill : true
	}, {
		name : "Theologian (1x long rest)",
		spells : ["detect evil and good"],
		selection : ["detect evil and good"],
		oncelr : true
	}]
};