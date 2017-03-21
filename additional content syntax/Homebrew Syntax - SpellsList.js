/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	You can add custom content to the Character Sheet's functionality by adding a script written with the syntax shown below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Spell
	Effect:		This is the syntax for adding a new spell
	Sheet:		v12.88 (2017-03-19)
	
	Please note that there is no code here to update drop-down boxes because the rop-down boxes in the spell selection dialogues are generated automatically and will include any spells you add correctly
	
	If you are looking for a way to add a cantrip/spell to the drop-down boxes in the attack sections, then you will have to look at the WeaponsList syntax and add the cantrip/spell as a weapon (as well)
*/

SpellsList["abi-dalzim's horrid wilting"] = { //Object name; note the use of only lower case! The spelling here is used to identify the spell with and has to be exactly the same as "name" but in lower case. Also note the absence of the word "var" and the use of brackets []
	
	name : "Abi-Dalzim's Horrid Wilting", //Required; The name of the spell. This will be put in the Spell field on the Spell Sheet. Except, if a "nameShort" is present, this name will be put in the mouseover text (tooltip) of the Spell field on the Spell Sheet.
	
	nameShort : "Abi-D's Horrid Wilting", //Optional; A shortened name of the spell that fits on the Spell Sheet. If present, this name will be put on the Spell Sheet and the full name above will be put in the mouseover text (tooltip) of the Spell field on the Spell Sheet.
	
	nameAlt : "Horrid Wilting", //Optional; An alternative name that can be used to identify the spell with on the sheet
	
	classes : ["bard", "cleric", "druid", "sorcerer", "wizard"], //Required; Array of all the classes that have this spell on their list. Needs at least one entry. Even with one entry you still need to put the brackets around it []. Note the use of only lower case!
	
	source : ["HB", 0], //Required; the source and the page number. "HB" stands for homebrew. //Note that filling out this incorrectly will prohibit the spell from showing up in the spell selection dialogues. //If you want to add a custom source, see "Homebrew Syntax - SourceList.js"
	
	ritual : false, //Optional; Whether (true) or not (false) this spell is a ritual
	
	level : 0, //Required; The Spell Level. Has to be a number from 0 to 9
	
	school : "Trans", //Optional; Spell School as it will show up on the Spell Sheet; Can only select from: "Abjur", "Conj", "Div", "Ench", "Evoc", "Illus", "Necro", "Trans", and for psionic discipline orders: "Avatar", "Awake", "Immor", "Nomad", "Wu Jen"
	
	time : "1 min", //Required; Casting Time as it will show up on the Spell Sheet
	
	range : "Touch", //Required; Spell Range as it will show up on the Spell Sheet
	
	components : "V,S,M", //Optional; Components as they will show up on the Spell Sheet
	
	compMaterial : "Two lodestones", //Optional; Material Component. This string will be put in the mouseover text (tooltip) of the component field
	
	duration : "Instantaneous", //Required; Spell Duration as it will show up on the Spell Sheet
	
	description : "Repair a single broken object no larger than 1 cu ft; can't restore magic to broken magic item", //Required; Short Spell Description as it will show up on the Spell Sheet
	
	descriptionFull : "This spell repairs a single break or tear in an object you touch, such as broken chain link, two halves of a broken key, a torn clack, or a leaking wineskin. As long as the break or tear is no larger than 1 foot in any dimension, you mend it, leaving no trace of the former damage." + "\n   " + "This spell can physically repair a magic item or construct, but the spell can't restore magic to such an object.", //Optional; The full Spell Description. This string will be put in the mouseover text (tooltip) of the description field
	
	firstCol : "6", //Optional; Set something to be put in the first column on the spell sheet. This can be something like power point cost or ki cost, but also the commands "atwill", "oncelr", "oncesr", "markedbox", "checkbox", or "checkedbox" for the appropriate icon
	
	dependencies : [], //Optional; An array of spells (SpellsList object names) that will be put in the rows below this spell when this spell is added to the spell sheet
	
	psionic : true, //Optional; If you set this to true, the sheet will treat this spell as a psionic talent/discipline
};