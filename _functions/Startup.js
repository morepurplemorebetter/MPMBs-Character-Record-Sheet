//functions to call at startup (in the right order)
function InitializeEverything(noButtons, noVars) {
	if (!minVer) Hide("d20warning");
	calcStop();
	GetStringifieds(); //populate some variables stored in fields
	
	// Define some document level variables before and after running the user scripts
	if (!noVars) {
		InitiateLists();
		RunUserScript(true);
		spellsAfterUserScripts();
	};
	
	if (!minVer) {
		SetGearVariables();
		setListsUnitSystem(false, true);
		FindClasses();
		FindRace();
		FindCompRace();
		FindWeapons();
		FindCompWeapons();
		FindArmor();
		FindBackground();
		FindFeats();
		LoadLevelsonStartup();
		FindManualOtherWeapons(true);
		ApplyProficiencies(false);
		UpdateTooltips();
		SetRichTextFields();
		MakeAdventureLeagueMenu();
	};
	
	SetHighlighting();
	if (!noButtons) MakeButtons();
	tDoc.dirty = false; //reset the dirty status, so the user is not asked to save without there having been any changes made
}

InitializeEverything();
var OpeningStatementVar = app.setTimeOut("OpeningStatement();", 3000);
