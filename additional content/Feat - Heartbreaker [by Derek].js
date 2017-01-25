/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Feat
	Effect:		This script adds a feat called "Heartbreaker"
	Code by:	Derek
	Date:		2016-01-23 (sheet v9.9.9)
*/

FeatsList["heartbreaker"] = {
	name : "Heartbreaker",
	source : ["HB", 0],
	description : "Advantage on Charisma (Deception) and (Persuasion) if dealing with a person of the opposite sex, if they are not hostile. When, in combat, a person of the opposite sex makes an attack against you, you can use your reaction to say some biting or honey words and impose disadvantade on that attack. A person of the opposite sex has disadvantage vs your charms",
	prerequisite : "Charisma 13 or higher",
	action : ["reaction", ""],
}