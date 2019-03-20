var iFileName = "Firearms Specialist Feat.js";

RequiredSheetVersion(13);

FeatsList["firearms specialist"] = {
    name : "Firearms Specialist",
    source : ["HB", 0],
    description : "I'm proficient with Firearms. If I misfire, I can use my reaction to roll a d20. If it is higher than the misfire score, the gun does not misfire. If I take the attack action with a one-handed weapon, I can use my bonus action to fire a gun with the light property.",
    descriptionFull : "You are adept at using guns effectively.\n\u2022 You gain proficiency with Firearms.\n\u2022 If you roll a misfire on an attack with a firearm, you can use your reaction to roll a d20. If the number rolled is higher than the weapon's misfire score, the firearm does not misfire. You cannot use this feature of this feat again until you complete a short or long rest.\n\u2022 When you use the Attack action and attack with a one-handed weapon, you can use a bonus action to attack with a loaded firearm with the light property you are holding.",
    
    weaponProfs : [false, false, ["Firearms"]],
    
    action : [
              ["reaction", "Cancel misfire"],
              ["bonus action", "Off-hand shot"]],
    
    limfeaname : "Cancel misfire",
    usages : 1,
    recovery : "short rest",
}
