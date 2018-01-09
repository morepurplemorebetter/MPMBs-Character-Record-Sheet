var Base_FeatsList = {
  'grappler': {
    name: 'Grappler',
    source: [['SRD', 75], ['P', 167]],
    description: 'I have advantage on attack rolls against a creature I am grappling. As an action, I can try to pin a creature grappled by me. If I succeed on a grapple check, both the creature and I are restrained until the grapple ends.',
    prerequisite: 'Strength 13 or higher',
    prereqeval: "What('Str') >= 13",
    action: ['action', ' feat (pin grappled)']
  }
}
