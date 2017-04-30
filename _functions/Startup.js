//functions to call at startup (in the right order)
function InitializeEverything(noButtons, noVars) {
	if (!minVer) Hide("d20warning");
	tDoc.delay = true;
	tDoc.calculate = false;
	GetStringifieds(); //populate some variables stored in fields
	
	RunUserScript();
	
	//define some document level variables after running the user scripts
	if (!tDoc.info.AdvLogOnly && !noVars) {
		AmendSpellsList();
		setSpellVariables();
	};
	
	if (!minVer) {
		SetGearVariables();
		setListsUnitSystem(false, true);
		if (!noVars) UAstartupCode();
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
	};
	
	SetHighlighting();
	if (!noButtons) MakeButtons();
	tDoc.dirty = false; //reset the dirty status, so the user is not asked to save without there having been any changes made
	tDoc.calculate = true;
	tDoc.delay = false;
}

var OpeningStatementVar = app.setTimeOut("OpeningStatement();", 3000);
InitializeEverything();