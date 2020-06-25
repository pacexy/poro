module.exports = [
	{ field: "Team", type: "String", desc: "" },
	{ field: "N_PlayerInTeam", type: "Integer", desc: "To order a query identically to how it is on the page" },
	{ field: "TeamOrder", type: "Integer", desc: "Order of the team within the player's history" },
	{ field: "Link", type: "String", desc: "Deprecated, please use `Player` instead" },
	{ field: "Player", type: "String", desc: "" },
	{ field: "Role", type: "String", desc: "" },
	{ field: "Flag", type: "Wikitext", desc: "" },
	{ field: "Footnote", type: "Wikitext", desc: "" },
	{ field: "OverviewPage", type: "String", desc: "For joining to Tournaments" },
	{ field: "PageAndTeam", type: "String", desc: "For joining to TournamentRosters" },
]
