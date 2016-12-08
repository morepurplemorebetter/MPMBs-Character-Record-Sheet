//code to run when exiting the sheet
function RunBeforeExit() {
	//resetting the highlighting of the form fields
	app.runtimeHighlight = Highlighting.initialState;
	app.runtimeHighlightColor = Highlighting.initialColor;
}