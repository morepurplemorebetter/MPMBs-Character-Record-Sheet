/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	You can add custom content to the Character Sheet's functionality by adding a script written with the syntax shown below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Tool (for the equipment menu)
	Effect:		This is the syntax for adding a new tool
	Sheet:		v12.995 (2017-06-29)

	NOTE that any items added like this will appear at the end of the list of gear visible in the equipment menu.
	They will appear in the order you add them.
*/

ToolsList["disguise kit"] = { //Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
	
	infoname : "Disguise kit [25 gp]", //Required; This is the name as it will appear in the equipment menu
	
	name : "Disguise kit", //Required; The name as it will be put into the equipment table
	
	amount : "", //Required; The amount as will be put into the equipment table. You can put "" here if you like
	
	weight : 3 //Required, has to be a number; The weight as will be put into the equipment table. Note that the total weight is calculated as Amount×Weight. You can put "" here if you like
};