module.exports = [
	{ field: "Blue", type: "String", desc: "" },
	{ field: "Red", type: "String", desc: "" },
	{ field: "Winner", type: "Integer", desc: "" },

	{ field: "BlueFinal", type: "String", desc: "" },
	{ field: "RedFinal", type: "String", desc: "" },

	{ field: "BlueFootnote", type: "Text (size:800)", desc: "" },
	{ field: "RedFootnote", type: "Text (size:800)", desc: "" },
	{ field: "Footnote ", type: " Text (size:800)", desc: "" },

	{ field: "IsChronobreak ", type: " Boolean", desc: "" },
	{ field: "IsRemake ", type: " Boolean", desc: "" },

	{ field: "FF", type: "Integer", desc: "" },
	{ field: "Selection", type: "String", desc: "Which team has side selection (value is a team name)" },
	{ field: "HasSelection", type: "Boolean", desc: "Was there side selection?" },
	{ field: "MatchHistory", type: "Wikitext", desc: "Link to an official Riot/QQ match history page for the game" },
	{ field: "Recap", type: "Wikitext", desc: "Link to a text recap of the game" },
	{ field: "Reddit", type: "Wikitext", desc: "Link to a reddit thread of the game" },
	
	{ field: "Vod", type: "Wikitext", desc: "" },
	{ field: "VodPB", type: "Wikitext", desc: "" },
	{ field: "VodGameStart", type: "Wikitext", desc: "" },
	{ field: "VodPostgame", type: "Wikitext", desc: "" },
	{ field: "VodHighlights", type: "Wikitext", desc: "" },
	{ field: "VodInterview", type: "Wikitext", desc: "" },
	{ field: "InterviewWith", type: "List (,) of String", desc: "The player who the interview is with" },
	{ field: "MVP", type: "String", desc: "" },
	{ field: "MVPPoints", type: "Integer", desc: "" },

	{ field: "OverviewPage", type: "String", desc: "" },
	{ field: "N_MatchInTab", type: "Integer", desc: "" },
	{ field: "N_TabInPage", type: "Integer", desc: "" },
	{ field: "N_GameInMatch", type: "Integer", desc: "" },
	{ field: "N_Page", type: "Integer", desc: "" },
	
	{ field: "ScoreboardID_Wiki", type: "String", desc: "" },
	{ field: "ScoreboardID_Riot", type: "String", desc: "" },
	
	{ field: "GameID_Wiki", type: "String", desc: "OverviewPage_Tab_MatchInTab_GameInMatch" },

	{ field: "UniqueMatch", type: "String", desc: "Can be joined to MatchSchedule.UniqueMatch" },
	{ field: "UniqueLine", type: "String", desc: "" },
	
	{ field: "WrittenSummary", type: "Text", desc: "A very short qualitative summary of the game" },
]
