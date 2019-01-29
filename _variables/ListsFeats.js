var Base_FeatsList = {
	"grappler" : {
		name : "Grappler",
		source : [["SRD", 75], ["P", 167]],
		description : "I have advantage on attack rolls against a creature I am grappling. As an action, I can try to pin a creature grappled by me. If I succeed on a grapple check, both the creature and I are restrained until the grapple ends.",
		descriptionFull : "You've developed the skills necessary to hold your own in close-quarters grappling. You gain the following benefits:\n \u2022 You have advantage on attack rolls against a creature you are grappling.\n \u2022 You can use your action to try to pin a creature grappled by you. To do so, make another grapple check. If you succeed, you and the creature are both restrained until the grapple ends.",
		prerequisite : "Strength 13 or higher",
		prereqeval : function(v) { return What('Str') >= 13; },
		action : ["action", "Pin Grappled"]
	}
};