/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file.
	You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded sheet or to first reset sheet.
	Thus you don't run the risk of things that have already been filled out causing conflicts.

	-HOW TO READ-
	Every line comes with a comment immediately after it to show whether it is // Optional // or // Required //,
	followed by a more explanatory comment

	-THIS IS JAVASCRIPT-
	The imports scripts work by creating a new entry inside an existing object or by calling functions.
	You can create new or overwrite existing global variables by omitting 'var'.
	You will need to understand the basics of JavaScript variables: strings, arrays, and JSON objects.
	Note that every opening symbol must have its closing counterpart: (), {}, [], "", ''.
	If these are not present, the code will give an error when imported.
	Use proper editing software for code (like Notepad++). Text processors like Microsoft Word will screw up your code.
	To help finding syntax errors, use (online) code checking software like https://jshint.com

	-COMMENTS IN THE EXAMPLE-
	Anything on a line after two forward slashes is a comment and will be ignored when running the code.
	Multiline comments are possible. Open them using the forward slash followed by an asterisk and close them with the opposite.
	The below contains a lot of these comments. The comments are not necessary for the script to work, so feel free to remove them.
*/

/*	-INFORMATION-

	Subject:	Source

	Effect:		This is the syntax for adding a new source to the sheet.

	Remarks:	The object name of a source is used for almost everything that you can import into the sheet.
				A tip is to invoke a new source object at the start of an import script to make sure it is available for whatever you are adding.

	Sheet:		v13.0.0 (2019-??-??)
*/

var iFileName = "Homebrew Syntax - SourceList.js";
/* 	iFileName // OPTIONAL //
	TYPE:	string
	USE:	how the file will be named in the sheet if you import it as a file

	Note that this is a variable called 'iFileName'.
	Variables invoked inside an import script will not be available after importing.
	However, if you invoke the variable without the 'var', it will be available after importing.

	This doesn't actually have to be the same as the name of the file.
	Only the first occurrence of this variable will be used.
*/

RequiredSheetVersion(13);
/*	RequiredSheetVersion // OPTIONAL //
	TYPE:	function call with a number
	USE:	the minimum required version number of the sheet for the script to work

	If the sheet where you import this script into is of an earlier version, the player will be given a warning.
	Input a number, not a string (so don't enclose the number in quotation marks)!
	Although the sheet uses semantic versioning, you have to input a number here.
	To find this number of a sheet, open its Document Properties in Adobe Acrobat (Ctrl + D) and look in the 'Custom' tab.
*/

SourceList["BoP"] = {
/* 	SourceList object name // REQUIRED //
	TYPE:	string
	USE:	object name of the source as it will be used by the sheet

	By adding a new object to the existing SourceList object, we create a new source.
	The object name here is 'BoP'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.

	The object name doesn't have to be the same as the abbreviation used for the source (see below), but it does make it easier.

	Do not use a single-letter object name, those are reserved for official WotC publications.
	Doing so will make it likely that you overwrite an existing source.

	Note that "HB" is already used by the "Homebrew" source.
	Note that this doesn't have to be only lower case!
	Also note the absence of the word "var" and the use of brackets [].
*/
	name : "Book of Purple",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the source as it will be used by the sheet

	This is the full name of the source.
	The full name will only be used in tooltips and dialogs, so make it as long as you want.
*/
	abbreviation : "BoP",
/*	name // REQUIRED //
	TYPE:	string
	USE:	abbreviation of the source as it will be used by the sheet

	The abbreviation doesn't have to be the same as the object name used for the source (see above), but it does make it easier.

	This is a greatly shortened name of the source.
	The abbreviation will be used extensively throughout the sheets, so be sure to make it easily recognizable.
*/
	date : "2019/02/26",
/*	date // OPTIONAL //
	TYPE:	string
	USE:	date of the source

	The date has use the syntax yyyy/mm/dd,
	thus year, month, day, with leading zeroes for the month and day.

	When present, this date is used by the sheet to see what source is newer.
	When a thing is selected and it matches multiple entries (e.g. two RaceList entries that use the same name),
	the sheet will use the one from the newer source, if the source is not set to be excluded.

	A SourceList entry without this attribute will always considered to be newer than one with it.
*/
	group : "BoP",
/*	group // OPTIONAL //
	TYPE:	string
	USE:	group to list the source under in the Source Materials dialog

	This grouping is only used to make it easier to include/exclude a whole group of sources in the Source Materials dialog.

	If the group name is part of the name of the source followed by a colon,
	the group name will be removed from the source name in the Source Materials dialog.
	For example, if the 'name' attribute is "MPMB: Book of Purple" and this attribute is "MPMB",
	then the source will appear as "Book of Purple" in the group "MPMB" in the Source Materials dialog.

	Common groups are:
	 "Primary Sources"			// WotC publications like the Players Handbook
	 "Adventure Books"			// WotC adventures like the Curse of Strahd
	 "Adventurers League"		// AL specific publications like the Tortle Package
	 "Unearthed Arcana"			// Unearthed Arcana articles
	 "Dungeon Masters Guild"	// Homebrew found on the Dungeon Masters Guild website
	 "Reddit/r/UnearthedArcana"	// Homebrew found on the /r/UnearthedArcana subreddit
	 "D&D Beyond"				// Homebrew found on the D&D Beyond website
*/
	url : "https://nonexisting-website.com/Book_of_Purple.pdf",
/*	url // OPTIONAL //
	TYPE:	string
	USE:	link to the source online

	This URL is only used in the Source Materials dialog.

	Please use https if available.
*/
}
