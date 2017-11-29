/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	You can add custom content to the Character Sheet's functionality by adding a script written with the syntax shown below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	SpellTable
	Effect:		This is an example of a table that is used for a (sub)class that has the 'spellcastingFactor' defined as "purplemancer1" (where "1" is the factor and the rest is the name)
				Alternatively, you can just add this to the code for your class or subclass (see Homebrew Syntax ClassList and ClassSubList)
	Sheet:		v12.83 (2017-02-18)
	
	Note that the table needs to have these exact dimensions, of level 0-20 and at least 9 entries per row
*/

purplemancerSpellTable = [ //Object name; note that there is no "var" here, and that the name of this variable is the name of the spellcastingFactor without any numbers in it and all lower case, plus the text "SpellTable"
	[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 0 // this should be all zeroes
	[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 1 // there are 9 entries in each array, one for each spell level
	[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 2
	[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 3
	[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 4
	[2, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 5
	[2, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 6
	[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 7
	[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 8
	[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 9
	[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl10
	[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl11
	[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl12
	[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl13
	[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl14
	[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl15
	[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl16
	[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl17
	[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl18
	[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl19
	[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl20
]