module.exports = [
	{ field: "Team", type: "String", desc: "" },
	{ field: "Region", type: "String", desc: "Always use Teams.Region as a fallback for this field, but this should be defined at least for international events" },
	{ field: "RosterLinks", type: "Text", desc: "", sep: ";;" },
	{ field: "Roles", type: "Text", desc: "", sep: ";;" },
	{ field: "Flags", type: "Text", desc: "", sep: ";;" },
	{ field: "Footnotes", type: "List (;;) of Wikitext", desc: "" },
	{ field: "IsUsed", type: "Text", desc: "Did the players actually play in this event?", sep: ";;" },
	{ field: "Tournament", type: "String", desc: "" },
	{ field: "IsComplete", type: "Boolean", desc: 'Will be false for some legacy events with incomplete rosters' },
	{ field: "PageAndTeam", type: "String", desc: "Used for joining with TournamentResults so that Null results in this table are properly found as such, without false positives from joining only on page name" },
	{ field: "UniqueLine", type: "String (size=200)", desc: "" },
]
