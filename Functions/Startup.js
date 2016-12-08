//functions to call at startup (in the right order)
function InitializeEverything(noButtons) {
	if (!minVer) Hide("d20warning");
	tDoc.delay = true;
	tDoc.calculate = false;
	GetStringifieds();
	RunUserScript();
	
	if (!minVer) {
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
	}
	
	SetHighlighting();
	tDoc.calculate = true;
	tDoc.delay = false;
	if (!noButtons) MakeButtons();
	tDoc.dirty = false; //reset the dirty status, so the user is not asked to save without there having been any changes made
}

var OpeningStatementVar = app.setTimeOut("OpeningStatement();", 3000);
InitializeEverything();