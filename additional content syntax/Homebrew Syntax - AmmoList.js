/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	You can add custom content to the Character Sheet's functionality by adding a script written with the syntax shown below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Ammunition
	Effect:		This is the syntax for adding a new type of ammunition to the sheet
				Note that if you want this ammunition to be added automatically when selecting a certain weapon, you need to include its object-name as the 'ammo' attribute. Even if you don't do this, the ammo you define will be filled when typed into an ammo box
	Sheet:		v12.83 (2017-02-18)
*/

AmmoList["distantsting"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []. The spelling here is used to identify the ammo with.

	name : "DistantSting", //Required; the name of the ammunition
	
	weight : 0.05, //Required; the weight in lb
	
	icon : "Arrows", //Required; the icon to use for the ammuntion. Depending on the icon you choose, the display and checks have to be assigned correctly. See below for the different options
	
	checks : [".Top", ".Base"], //Required; the type of checkboxes to display
	
	display : 20, //Required; the amount of checkboxes to display
	
	invName : "Stings, Distant", //Optional; the name as it will be added to the equipment section if selected to do so in the equipment menu. If you omit this, the sheet will use the above defined 'name' when adding this to the equipment section
	
	alternatives : ["distant sting", "stingdistant", "sting distant"], //Optional; an arry of alternative names that the code can recognize for this same ammo entry. These need to be all lower case!
}

UpdateDropdown("ammo"); //Optional; This updates all dropdown fields that have lists of ammunition

/* list of all the different icon options. Copy the three lines (icon, checks, display) into the appropriate place above

//arrows:
	icon : "Arrows",
	checks : [".Top", ".Base"],
	display : 20,

//axes:
	icon : "Axes",
	checks : [".Top.Axe", ".Base.Axe"],
	display : 8,

//bullets:
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,

//daggers:
	icon : "Daggers",
	checks : [".Top"],
	display : 10,

//flasks:
	icon : "Flasks",
	checks : [".Top", ".Base"],
	display : 20,
	
//hammers:
	icon : "Hammers",
	checks : [".Top.Axe", ".Base.Axe"],
	display : 8,
	
//spears:
	icon : "Spears",
	checks : [".Base"],
	display : 10,

//vials:
	icon : "Vials",
	checks : [".Top", ".Base"],
	display : 20,
*/