module.exports = [
	{ field: "Name ", type: " String", desc: "DEPRECATED DO NOT USE!!!!!!!!!!!!!!!!!!!!!!!" },
	{ field: "Link ", type: " String", desc: "Should actually be used, includes disambiguation" },
	{ field: "Champion ", type: " String", desc: "" },
	{ field: "Kills ", type: " Integer", desc: "" },
	{ field: "Deaths ", type: " Integer", desc: "" },
	{ field: "Assists ", type: " Integer", desc: "" },
	{ field: "SummonerSpells ", type: " List (,) of String", desc: "" },
	{ field: "Gold ", type: " Integer", desc: "" },
	{ field: "CS ", type: " Integer", desc: "" },
	{ field: "Items ", type: " List (,) of String", desc: "" },
	{ field: "Trinket ", type: " String", desc: "" },

	{ field: "KeystoneMastery ", type: " String", desc: "Only if applicable" },
	{ field: "KeystoneRune ", type: " String", desc: "Only if applicable" },

	{ field: "TeamKills", type: "Integer", desc: "" },
	{ field: "TeamGold", type: "Integer", desc: "" },

	-- Game Info
	{ field: "Team ", type: " String", desc: "" },
	{ field: "TeamVs ", type: " String", desc: "" },
	{ field: "Time ", type: " Datetime", desc: "" },
	{ field: "PlayerWin ", type: " String", desc: "" },

	{ field: "DateTime_UTC ", type: " Datetime", desc: "" },
	{ field: "DST ", type: " String", desc: "" },

	-- Object Metadata
	{ field: "Tournament ", type: " String", desc: "this is the name entered to the scoreboard and should not be used if possible" },
	{ field: "Role ", type: " String", desc: "" },
	{ field: "Role_Number ", type: " Integer", desc: "" },
	{ field: "Side ", type: " Integer", desc: "" },
	{ field: "GameIDWiki ", type: " String", desc: "" },
	{ field: "GameIDRiot ", type: " String", desc: "" },
	{ field: "UniqueLine", type: "String", desc: "" },
	{ field: "UniqueGame ", type: " String", desc: "Join to ScoreboardGames, ScoreboardTeams" },
	{ field: "UniqueLineVs ", type: " String", desc: "" },
	{ field: "OverviewPage ", type: " String", desc: "" },
	
	{ field: "StatsPage", type: "String", desc: "For internal usage, the name of the player's year stats page" },
	
	{ field: "Note1", type: "String", desc: "Unused field in case we need to add information to the table and can't rebuild it" },
	{ field: "Note2", type: "String", desc: "Unused field in case we need to add information to the table and can't rebuild it" },
	{ field: "Note3", type: "String", desc: "Unused field in case we need to add information to the table and can't rebuild it" },
	{ field: "Note4", type: "String", desc: "Unused field in case we need to add information to the table and can't rebuild it" },
]
