/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:	Sun Blade, but for all sword types
	Effect:		This script overwrites the SRD magic item "Sun Blade" with a version that
				allows you to pick the type of sword it uses as a base.
	Code by:	MorePurpleMoreBetter
	Date:		2024-08-21 (sheet v13.2.0)

	CHANGES FROM THE SRD
	- Can be any type of sword.
	- Doesn't grant Finesse if the weapon has the Heavy property.
	- Shortsword proficiency only grants proficiency with this weapon if it's a longsword.

	REMARKS
	- This overwrites the existing Sun Blade code, you'll only have this version.
	  However, picking a longsword should result in the original magic item.
	- The full description is still identical to the SRD.
*/
var iFileName = "Sun Blade, but for all sword types [homebrew, transcribed by MPMB].js";
RequiredSheetVersion("13.0.9");

MagicItemsList['sun blade'] = {
	name : "Sun Blade",
	source : [["SRD", 246], ["D", 205]],
	type : "weapon (any sword)",
	rarity : "rare",
	magicItemTable : "G",
	attunement : true,
	description : "As a bonus action, I can have this hilt create a blade of radiance. While the blade exists, it acts like a sword that does +2 to attack and damage rolls, radiant damage (+1d8 to undead), has finesse, emits bright sunlight in a 15-ft radius and dim light in another 15 ft. As an action, I can change the light's radius by 5 ft.",
	descriptionLong : "As a bonus action, I can have this hilt create or dismiss a blade of pure radiance. While the blade exists, it acts like a sword that grants a +2 bonus to attack and damage rolls, does radiant damage and has the finesse property (if not Heavy). It also deals +1d8 radiant damage to undead and emits sunlight, bright light in a 15-ft radius and dim light in an additional 15-ft radius. As an action, I can expand or reduce both the bright and dim light's radius by 5 ft each, to a maximum of 30 ft each or a minimum of 10 ft each.",
	descriptionFull : "This item appears to be a longsword hilt. While grasping the hilt, you can use a bonus action to cause a blade of pure radiance to spring into existence, or make the blade disappear. While the blade exists, this magic longsword has the finesse property. If you are proficient with shortswords or longswords, you are proficient with the sun blade.\n   You gain a +2 bonus to attack and damage rolls made with this weapon, which deals radiant damage instead of slashing damage. When you hit an undead with it, that target takes an extra 1d8 radiant damage.\n   The sword's luminous blade emits bright light in a 15-foot radius and dim light for an additional 15 feet. The light is sunlight. While the blade persists, you can use an action to expand or reduce its radius of bright and dim light by 5 feet each, to a maximum of 30 feet each or a minimum of 10 feet each.",
	weight : 3,
	action : [["bonus action", " (start/stop)"], ["action", " (change light)"]],
	chooseGear : {
		type : "weapon",
		prefixOrSuffix : "suffix",
		descriptionChange : ["replace", "sword"],
		excludeCheck : function (inObjKey, inObj) {
			var testRegex = /sword|scimitar|rapier/i;
			return !testRegex.test(inObjKey) && (!inObj.baseWeapon || !testRegex.test(inObj.baseWeapon));
		}
	},
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && /sword|scimitar|rapier/i.test(v.baseWeaponName) && /^(?=.*sun)(?=.*blade).*$/i.test(v.WeaponTextName)) {
					v.theWea.isMagicWeapon = true;
					fields.Damage_Type = "Radiant";
					fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
					var addFinesse = /(^|[,;]) ?heavy([,;]|$)|finesse/i.test(fields.Description) ? '' : 'Finesse; ';
					fields.Description += (fields.Description ? '; ' : '') + addFinesse + '+1d8 damage to undead';
					if (v.baseWeaponName === "longsword" && !fields.Proficiency) {
						fields.Proficiency = CurrentProfs.weapon.otherWea && CurrentProfs.weapon.otherWea.finalProfs.indexOf("shortsword") !== -1;
					}
				}
			},
			'If I include the words "Sun Blade" in a the name of a sword, it will be treated as the magic weapon Sun Blade. It adds +2 to hit and damage rolls made with it, deals radiant damage, and deals +1d8 damage to undead. It gains the Finesse property unless it has the Heavy property. Having shortsword proficiency also makes me proficient with it, but only if it is a longsword.',
			1
		],
		atkCalc : [
			function (fields, v, output) {
				if (v.isMeleeWeapon && /sword|scimitar|rapier/i.test(v.baseWeaponName) && /^(?=.*sun)(?=.*blade).*$/i.test(v.WeaponTextName)) {
					v.theWea.isMagicWeapon = true;
					output.magic = v.thisWeapon[1] + 2;
				}
			}, ''
		]
	}
}
