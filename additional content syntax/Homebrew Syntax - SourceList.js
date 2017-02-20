/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	You can add custom content to the Character Sheet's functionality by adding a script written with the syntax shown below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Source
	Effect:		This is the syntax for adding a new source that can be referenced by other JavaScript Syntax
				Note that the sheet will ignore any reference to a source that is not defined
	Sheet:		v12.83 (2017-02-18)
*/

SourceList["UA:LDU"] = { //Object name; This is the way the source is called upon, so the way you would enter it as the "Source" in any other of the JavaScript Syntax. Note that this is case sensitive! //Also note that this has to be an unique value. Look at the default sources in the "Complete SourceList.js" file
	
	name : "Unearthed Arcana: Light, Dark, Underdark!", //Required; The name of the source as written in full. This will be used in the tooltips/mouseover text.
	
	abbreviation : "UA:LDU", //Required; The abbreviation of the source. This can only be letters and a colon! This will be used to refer to the source in the form fields //Note that this doesn't have to be the same as the way the source is called upon, but it can be for convenience
	
	group : "Unearthed Arcana" //Optional; Adding this will make the sheet put the source into a group when using the "Sources" function where you can include/exclude sources. // The default options for this are "Unearthed Arcana", "Official Sources", "Official Sources (small)", and "default". // If you enter "default", the source can't be excluded using the "Sources" function
	
	url : "http://media.wizards.com/2016/dnd/downloads/UA_Cleric.pdf" //Optional; A link to the source if it can be found on the internet. This link is used in the Source Selection Dialogue
}