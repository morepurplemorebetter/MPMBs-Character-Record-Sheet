SourceList["UA:LDU"] = { //This is the way the source is called upon, so the way you would enter it as the "Source" in any other JavaScript. Note that this is case sensitive! //Also note that this has to be an unique value. Look at the default sources in the "Complete SourceList.js" file
	
	name : "Unearthed Arcana: Light, Dark, Underdark!", //Required; The name of the source as written in full. This will be used in the tooltips/mouseover text.
	
	abbreviation : "UA:LDU", //Required; The abbreviation of the source. This will be used to refer to the source in the form fields //Note that this doesn't have to be the same as the way the source is called upon, but it can be for convenience
	
	group : "Unearthed Arcana" //Optional; Adding this will make the sheet put the source into a group when using the "Sources" function where you can include/exclude sources. // The default options for this are "Unearthed Arcana", "Official Sources", "Official Sources (small)", and "default". // If you enter "default", the source can't be excluded using the "Sources" function
}