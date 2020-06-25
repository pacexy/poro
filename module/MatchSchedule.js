module.exports = [
	{ field: "Team1", type: "String", desc: "" },
	{ field: "Team2", type: "String", desc: "" },
	{ field: "Team1Final", type: "String", desc: "If the team renamed midsplit, this is entered for all games before they renamed" },
	{ field: "Team2Final", type: "String", desc: "If the team renamed midsplit, this is entered for all games before they renamed" },
	{ field: "Winner", type: "String", desc: "" },
	{ field: "Team1Points", type: "Integer", desc: "" },
	{ field: "Team2Points", type: "Integer", desc: "" },
	{ field: "Team1PointsTB", type: "Integer", desc: "Tiebreaker points awarded from this match" },
	{ field: "Team2PointsTB", type: "Integer", desc: "Tiebreaker points awareded from this match" },
	{ field: "Team1Score", type: "Integer", desc: "Game score in the series" },
	{ field: "Team2Score", type: "Integer", desc: "Game score in the series" },
	{ field: "Team1Poster", type: "String", desc: "For LPL posters (and any others that get done)" },
	{ field: "Team2Poster", type: "String", desc: "For LPL posters (and any others that get done)" },
	{ field: "Team1Advantage", type: "Integer", desc: "Game advantage given to team 1 prior to series start (rarely relevant)" },
	{ field: "Team2Advantage", type: "Integer", desc: "Game advantage given to team 1 prior to series start (rarely relevant)" },
	{ field: "FF", type: "Integer", desc: "" },

	{ field: "Player1", type: "String", desc: "Iff the match is a 1v1" },
	{ field: "Player2", type: "String", desc: "Iff the match is a 1v1" },

	{ field: "MatchDay", type: "Integer", desc: "A number representing the day within the tab" },
	{ field: "DateTime_UTC", type: "DateTime", desc: "Start time in UTC" },
	{ field: "HasTime", type: "Boolean", desc: "Was a time parameter entered, or is it defaulting to midnight?" },
	{ field: "DST", type: "String", desc: "Does DST apply to this game? Yes/No/Spring/Fall" },

	{ field: "IsFlexibleStart", type: " Boolean", desc: "if the game starts after the one before ends, instead of exactly at the time" },
	{ field: "IsReschedulable", type: " Boolean", desc: "if the entire day of games could be rescheduled" },
	
	{ field: "OverrideAllowPredictions", type: "Boolean", desc: "if set to true, predictions will be forced open (useful for tiebreakers)" },

	{ field: "IsTiebreaker", type: "Boolean", desc: "Is this a tiebreaker game (as opposed to regular season)? Checking this will omit the game from some queries" },
	{ field: "OverviewPage", type: "String", desc: "Title of the overview page on the wiki for this event" },
	{ field: "ShownName", type: "String", desc: "Display name of this event in TopSchedule, etc. For internal use only. Please use Tournaments.StandardName instead." },
	{ field: "ShownRound", type: "Text", desc: "" },
	{ field: "BestOf", type: "Integer", desc: "1/2/3/5" },
	{ field: "Round", type: "String", desc: "" },
	{ field: "Phase", type: "String", desc: "" },
	{ field: "N_MatchInPage", type: "Integer", desc: "Index of this match within the wikipage on which it's stored" },
	{ field: "Tab", type: "String", desc: "NAME of the tab. Generally corresponds to a week or a phase of playoffs" },
	{ field: "N_MatchInTab", type: "Integer", desc: "Index of the match within the tab" },
	{ field: "N_TabInPage", type: "Integer", desc: "Index of the tab within the page on which it's stored" },
	{ field: "N_Page", type: "Integer", desc: "Index of the page within the set of data pages corresponding to this event" },
	
	{ field: "Patch", type: "String", desc: "Patch with no hotfix or disable information" },
	{ field: "Hotfix", type: "String", desc: "Hotfix or null (usually null)" },
	{ field: "Disabled", type: "List (,) of String", desc: "List of disabled champions" },
	{ field: "PatchFootnote", type: "Text", desc: "Set alongside patch variables, e.g. to note that champions were only disabled some games" },
	
	{ field: "InitialN_MatchInTab", type: "Integer", desc: "" },
	{ field: "InitialPageAndTab", type: "String", desc: "" },

	{ field: "GroupName", type: "String", desc: "" },

	{ field: "Team1From", type: "String", desc: "What match did team 1 play that qualified them to this match" },
	{ field: "Team2From", type: "String", desc: "What match did team 2 play that qualified them to this match" },
	{ field: "Team1FromResult", type: "Integer", desc: "1: winner of that match, 0: loser of that match" },
	{ field: "Team2FromResult", type: "Integer", desc: "1: winner of that match, 0: loser of that match" },

	{ field: "Stream", type: " Wikitext", desc: "" },
	{ field: "StreamDisplay", type: " Text", desc: "Unindexed! Don't query on this" },
	{ field: "Venue", type: " String", desc: "" },

	{ field: "CastersPBP", type: "String", desc: "Don't query on this, use Casters instead" },
	{ field: "CastersColor", type: "String", desc: "Don't query on this, use Casters instead" },
	{ field: "Casters", type: "List (,) of String", desc: "List of all casters, for querying all at once" },

	{ field: "MVP", type: " String", desc: "" },
	{ field: "MVPPoints", type: " Integer", desc: "" },
	{ field: "VodInterview", type: " Wikitext", desc: "" },
	{ field: "VodHighlights", type: " Wikitext", desc: "" },
	{ field: "InterviewWith", type: " List (,) of String", desc: "" },
	{ field: "Recap", type: " Wikitext", desc: "" },
	{ field: "Reddit", type: " Wikitext", desc: "" },
	
	{ field: "PageAndTeam1", type: "String", desc: "For joining to groups" },
	{ field: "PageAndTeam2", type: "String", desc: "For joining to groups" },

	{ field: "Team1Footnote", type: " Text (size:800)", desc: "" },
	{ field: "Team2Footnote", type: " Text (size:800)", desc: "" },
	{ field: "Footnote", type: " Text (size:800)", desc: "" },

	{ field: "UniqueMatch", type: "String", desc: "" },
]
