module.exports = [
	{ field: "Entity", type: "String", desc: "Unique name (aka page name) of entity with proper case-sensitivity" },
	{ field: "EntityName", type: "String", desc: "Un-disambiguated name" },
	{ field: "EntityPage", type: "String", desc: "Wrapper for _pageName" },
	{ field: "EntityType", type: "String", desc: "Player, Team, Tournament, Caster, Coach, Personality, Other" },
	{ field: "IsLowercase", type: "Boolean", desc: "should the name of the page be lowercased" },
	{ field: "DisambigSentence", type: "Wikitext", desc: "Sentence that should display on a disambiguation page" },
]
