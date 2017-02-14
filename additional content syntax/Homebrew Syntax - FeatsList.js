FeatsList["extra ability"] = { //note the use of only lower case! The spelling here is used to identify the feat with. Also note the absence of the word "var" and the use of brackets []

	name : "Extra Ability", //Required
	
	source : ["HB", 0], //Required; the source of the feat
	
	description : "Advantage on Charisma (Deception) and (Performance) if trying to pass as another. I can mimic a person's speech or other creature's sounds if I've heard it for at least 1 minute. Wisdom (Insight) vs. Charisma (Deception) to determine the sound is faked. [+1 Charisma]", //Required; the description as it will appear in the form field on the sheet
	
	prerequisite : "Dexterity 13 or higher", //Optional; adds a prerequisite to the feat (this line can be removed if not applicable)
	
	improvements : "Actor (feat): +1 Charisma;", //Optional; the text that will be displayed when needing to give a list of all the ability score improvements from various sources (such as in the Ability Score dialog) [this line can be removed if not applicable]
	
	armor : [false, false, true, false], //Optional; the 4 entries are for proficiency in: ["light", "medium", "heavy", "shields"]. Be sure to always add all four statements of true/false!
	
	weapons : [true, false, ["hand crossbow"]], //Optional; the 3 entries are for: ["simple", "martial", "other"]. Be sure to always add both statements of true/false!
	
	skills : "\n\nSkilled (feat): Choose three skills or tools." //Optional; adds the following text to any display of skills gained. Take note of the leading "\n\n", they are essential. (this line can be removed if not applicable)
	
	calculate : "event.value = \"I can spend 10 minutes inspiring up to 6 friendly creatures within 30 feet who can see or hear and can understand me. Each gains lvl (\" + What(\"Character Level\") + \") + Cha mod (\" + What(\"Cha Mod\") + \") temporary hit points. One can't gain temporary hit points from this feat again until after a short rest.\"", //Optional; this can be used instead of a description. This will set a calculated value for the feat field instead of a description. Note the use of \" within the syntax instead of just "
};

UpdateDropdown("feat"); //Optional; This updates and resets all feat dropdown fields