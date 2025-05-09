var AddFeatsMenu;

var Base_FeatsList = {
	"alert" : {
		name: "Alert",
		type: "origin",
		source: [["SRD24", 87], ["P24", 200]],
		addMod: [{
			type: "skill", field: "Init", mod: "prof",
			text: "I can add my Proficiency Bonus to Initiative rolls."
		}],
		description: "I can add my Proficiency Bonus to my Initiative rolls. Immediately after you I roll Initiative, I can swap Initiative with one willing ally as long as neither of us has the Incapacitated condition.",
		descriptionFull: [
			"You gain the following benefits.",
		 	toUni("Initiative Proficiency") + ". When you roll Initiative, you can add your Proficiency Bonus to the roll.",
		 	toUni("Initiative Swap") + ". Immediately after you roll Initiative, you can swap your Initiative with the Initiative of one willing ally in the same combat. You can't make this swap if you or the ally has the Incapacitated condition."
		].join("\n   ")
	},
	"savage attacker": {
		name: "Savage Attacker",
		type: "origin",
		source: [["SRD24", 87], ["P24", 201]],
		description: "",
		descriptionFull: "You've trained to deal particularly damaging strikes. Once per turn when you hit a target with a weapon, you can roll the weapon's damage dice twice and use either roll against the target."
	},
	"skilled" : {
		name: "Skilled",
		type: "origin",
		source: [["SRD24", 87], ["P24", 201]],
		skillstxt: "Choose three skills or tools",
		description: "I gain proficiency in any combination of three skills or tools of my choice.",
		descriptionFull: [
			"You gain proficiency in any combination of three skills or tools of your choice.",
			toUni("Repeatable") + ". You can take this feat more than once."
		].join("\n   "),
		allowDuplicates : true
	}
};