/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Alternate Sheet Feature
	Effect:		This script removes (almost) all material from other sources than the PHB
				Only non-PHB gear is not removed, because those entries don't have a source listed
	Code by:	MorePurpleMoreBetter
	Date:		2016-09-28 (sheet v12.25)
*/

var allowedSources = ["P"]; //add more source abbreviations to this array to keep more of the sources (see "Complete SourceList" for the abbreviations to use here: http://bit.ly/MPMBcoding_Syntax)

//remove all the non-PHB backgrounds
for (var key in BackgroundSubList) {
	if (BackgroundSubList[key].source && allowedSources.indexOf(BackgroundSubList[key].source[0]) === -1) {
		delete BackgroundSubList[key];
	}
}
for (key in BackgroundList) {
	if (allowedSources.indexOf(BackgroundList[key].source[0]) === -1) {
		delete BackgroundList[key];
	} else { //remove variants that are no longer available
		var theVariants = BackgroundList[key].variant;
		BackgroundList[key].variant = [];
		for (var i = 0; i < theVariants.length; i++) {
			if (BackgroundList[theVariants[i]]) {
				BackgroundList[key].variant.push(theVariants[i]);
			}
		}
		if (BackgroundList[key].variant.length === 0) {
			delete BackgroundList[key].variant;
		}
	}
}

//remove all the non-PHB background features
for (key in BackgroundFeatureList) {
	if (allowedSources.indexOf(BackgroundFeatureList[key].source[0]) === -1) {
		delete BackgroundFeatureList[key];
	}
}

//remove all the non-PHB subclasses
for (key in ClassSubList) {
	for (keyF in ClassSubList[key].features) {
		if (allowedSources.indexOf(ClassSubList[key].features[keyF].source[0]) === -1) {
			delete ClassSubList[key];
			break;
		}
	}
}

//remove all the non-PHB classes
for (key in ClassList) {
	if (allowedSources.indexOf(ClassList[key].source[0]) === -1) {
		delete ClassList[key];
	} else { //remove subclasses that are no longer available
		var theSubs = ClassList[key].subclasses[1];
		ClassList[key].subclasses[1] = [];
		for (var i = 0; i < theSubs.length; i++) {
			if (ClassSubList[theSubs[i]]) {
				ClassList[key].subclasses[1].push(theSubs[i]);
			}
		}
	}
}

//remove all the non-PHB feats
for (key in FeatsList) {
	if (allowedSources.indexOf(FeatsList[key].source[0]) === -1) {
		delete FeatsList[key];
	}
}

//remove all the non-PHB race options
for (key in RaceSubList) {
	if (RaceSubList[key].source && allowedSources.indexOf(RaceSubList[key].source[0]) === -1) {
		delete RaceSubList[key];
	}
}

//remove all the non-PHB races
for (key in RaceList) {
	if (allowedSources.indexOf(RaceList[key].source[0]) === -1) {
		delete RaceList[key];
	} else if (RaceList[key].variants) { //remove race options that are no longer available
		var theVars = RaceList[key].variants;
		RaceList[key].variants = [];
		for (var i = 0; i < theVars.length; i++) {
			if (RaceSubList[key + "-" + theVars[i]]) {
				RaceList[key].variants.push(theVars[i]);
			}
		}
		if (RaceList[key].variants.length === 0) {
			delete RaceList[key].variants;
		}
	}
}

//remove all the non-PHB spells
for (key in SpellsList) {
	if (allowedSources.indexOf(SpellsList[key].source[0]) === -1) {
		delete SpellsList[key];
	}
}

UpdateDropdown("race");
UpdateDropdown("background");
UpdateDropdown("backgroundfeature");
UpdateDropdown("feat");
UpdateDropdown("wildshape");