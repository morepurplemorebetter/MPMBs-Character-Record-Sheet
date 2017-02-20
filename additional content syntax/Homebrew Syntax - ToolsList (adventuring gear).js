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
	Sheet:		v12.83 (2017-02-18)

	NOTE that any items added like this will appear at the end of the list of gear visible in the equipment menu.
	They will appear in the order you add them.
*/

ToolsList["disguise kit [25 gp]"] = { //Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []. The spelling here is used to identify the tool with and has to be the exact same as what you enter in "infoname" below, but lower case.
	
	infoname : "Disguise kit [25 gp]", //Required; Has to be exact the same as what is entered above, but can use upper case if you want
	
	name : "Disguise kit", //Required; The name as it will be put into the equipment table
	
	amount : "", //Required; The amount as will be put into the equipment table
	
	weight : 3 //Required, has to be a number; The weight as will be put into the equipment table. Note that the total weight is calculated as Amount×Weight
};