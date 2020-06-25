module.exports = [
	{ field: "Player", type: "String", desc: "" },
	{ field: "Teams", type: "List (,) of String", desc: "List of teams for the purpose of querying from team pages which to include" },
	{ field: "League", type: "String", desc: "Name of the league group this data is for" },
	{ field: "LeagueHistory", type: "Text (size=2000)", desc: "History within this league - separator between tournaments is ;;;. Separator between tournament name and team list is ::. Separator between team is ;;. " },
	{ field: "TotalGames", type: "Integer", desc: "" },
]
