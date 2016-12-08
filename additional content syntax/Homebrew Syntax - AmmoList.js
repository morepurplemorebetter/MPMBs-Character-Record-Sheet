AmmoList["distantsting"] = { //Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []. The spelling here is used to identify the ammo with.

	name : "DistantSting", //Required; the name of the ammunition
	
	weight : 0.05, //Required; the weight in LB.
	
	icon : "Arrows", //Required; the icon to use for the ammuntion. Depending on the icon you choose, the display and checks have to be assigned correctly. See below for the different options.
	
	checks : [".Top", ".Base"], //Required; the type of checkboxes to display
	
	display : 20, //Required; the amount of checkboxes to display
}

UpdateDropdown("ammo"); //Optional; This updates and resets all dropdown fields that have lists of ammunition

/*
// list of all the different icon options. Copy the three lines (icon, checks, display) into the appropriate place above

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