/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds the player race "Nimblewright"
				This is taken from the Mirt's Undermountain Survival Guide found on DMs Guild (https://www.dmsguild.com/product/269024/)
	Code by:	MorePurpleMoreBetter
	Date:		2019-09-15 (sheet v13.0.0beta19)
*/

var iFileName = "Nimblewright [Mirt's Undermountain Survival Guide, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["MUSG"] = {
	name : "Mirt's Undermountain Survival Guide",
	abbreviation : "MUSG",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/269024/Mirts-Undermountain-Survival-Guide",
	date : "2019/03/08"
};

RaceList["nimblewright"] = {
	regExpSearch : /nimblewright/i,
	name : "Nimblewright",
	source : [["MUSG", 10]],
	plural : "Nimblewrights",
	size : 3,
	speed : { walk : { spd : 30, enc : 20 } },
	vision : [["Darkvision", 60]],
	languageProfs : ["Common"],
	age : " are typically between 1 and 100 years old and do not deteriorate due to age.",
	height : " stand between 5 and 6 feet tall",
	weight : " weigh between 80 and 100 pounds",
	heightMetric : " stand between 1,5 and 1,8 metres tall",
	weightMetric : " weigh between 40 and 50 kg",
	scores : [0, 2, 1, 0, 0, 0],
	trait : [
		"Nimblewright (+2 Dexterity, +1 Constitution) [construct type]\nConstruct Resilience: Adv. on saves vs. being poisoned and resistance to poison damage. I'm immune to disease and don't need to eat, drink, breathe or sleep. I don't suffer the effects of exhaustion due to lack of rest. Magic can't put me to sleep.",
		"Sentry's Rest: To benefit from a long rest, I need to be motionless for 6 hours, during which I can see and hear as normal.",
		"Repairable: The Mending cantrip can be used to stabilize me.",
		"Sure-Footed: Adv. on Str/Dex saves to avoid being knocked prone. See the Notes page for my 'Components'."].join(typePF ? "\n" : " "),
	dmgres : ["Poison"],
	savetxt : {
		text : ["Magic can't put me to sleep"],
		adv_vs : ["poison", "knocked prone (Str/Dex only)"],
		immune : ["disease"]
	},
	toNotesPage : [{
		name : "Nimblewright Components",
		source : [["MUSG", 11]],
		note : [
			"As a nimblewright, my type is Construct rather than Humanoid.",
			"I can install one nimblewright component in my body, which gives me a benefit. I can swap or remove a component during a short or long rest, and I can only power one component at a time.",
			"Choose three nimblewright components, which I carry and for which I am outfitted, from the list below.\n",
			"\u2022 Bright Eyes: With this component installed, I have 60 ft Darkvision.",
			"\u2022 Fleet Feet: With this component installed, my base walking speed increases 10 feet.",
			"\u2022 Hidden Compartment: With this component installed, I have a spring-loaded hidden compartment on my body that can carry and hide one Tiny creature or object.",
			"\u2022 Keen Ears: With this component installed, I have advantage on Wisdom (Perception) checks that rely on hearing.",
			"\u2022 Power Lifter: With this component installed, I count as one size larger when determining my carrying capacity and the weight I can push, drag, or lift.",
			"\u2022 Voice Box: With this component installed, I can speak any language I understand. Without this component installed, I can't speak any language, only understand, read, or write them.",
			 "\nThe installed component can be changed with the \"Racial Options\" button on the second page.",
			 "Note that when you change the component using the \"Racial Options\" button, the text in this field will be removed and re-added. Do not make any changes to this text or add any text to this field if you want to use the button to change components, as that will cause trouble with the automation. Instead, note down the three components that can be accessed someplace else."
		]
	}]
};

AddRacialVariant("nimblewright", "bright eyes component", {
	regExpSearch : /^(?=.*bright)(?=.*eyes).*$/i,
	source : [["MUSG", 11]],
	trait : RaceList.nimblewright.trait.replace("construct type", "bright eyes"),
	vision : [["Darkvision", 60]]
});
AddRacialVariant("nimblewright", "fleet feet component", {
	regExpSearch : /^(?=.*fleet)(?=.*feet).*$/i,
	source : [["MUSG", 11]],
	trait : RaceList.nimblewright.trait.replace("construct type", "fleet feet"),
	speed : { walk : { spd : 40, enc : 30 } }
});
AddRacialVariant("nimblewright", "hidden compartment component", {
	regExpSearch : /^(?=.*hidden)(?=.*compartment).*$/i,
	source : [["MUSG", 11]],
	trait : RaceList.nimblewright.trait.replace("construct type", "hidden compartment")
});
AddRacialVariant("nimblewright", "keen ears component", {
	regExpSearch : /^(?=.*keen)(?=.*ears).*$/i,
	source : [["MUSG", 11]],
	trait : RaceList.nimblewright.trait.replace("construct type", "keen ears"),
	vision : [["Adv. on Perception with hearing", 0]]
});
AddRacialVariant("nimblewright", "power lifter component", {
	regExpSearch : /^(?=.*power)(?=.*lifter).*$/i,
	source : [["MUSG", 11]],
	trait : RaceList.nimblewright.trait.replace("construct type", "power lifter"),
	carryingCapacity : 2
});
AddRacialVariant("nimblewright", "voice box component", {
	regExpSearch : /^(?=.*voice)(?=.*box).*$/i,
	source : [["MUSG", 11]],
	trait : RaceList.nimblewright.trait.replace("construct type", "voice box")
});
