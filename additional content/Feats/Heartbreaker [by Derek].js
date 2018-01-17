/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Feat
	Effect:		This script adds a feat called "Heartbreaker"
	Code by:	Derek
	Date:		2016-01-23 (sheet v9.9.9)
*/

var iFileName = "Heartbreaker [by Derek].js";
RequiredSheetVersion(10);

FeatsList["heartbreaker"] = {
	name : "Heartbreaker",
	source : ["HB", 0],
	description : "Advantage on Charisma (Deception) and (Persuasion) if dealing with a person of the opposite sex, if they are not hostile. When, in combat, a person of the opposite sex makes an attack against you, you can use your reaction to say some biting or honey words and impose disadvantade on that attack. A person of the opposite sex has disadvantage vs your charms",
	prerequisite : "Charisma 13 or higher",
	action : ["reaction", ""]
}