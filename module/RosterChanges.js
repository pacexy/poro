module.exports = [
	{ field: "Date_Sort", type: "DateTime", desc: "Invisible to the reader, but must be an exact date. Can guess if the date is approximate, put qualifying information into Date_Display" },
	{ field: "Player", type: "String", desc: "" },
	{ field: "Direction", type: "String", desc: "Join or Leave" },
	
	{ field: "Team", type: "String", desc: "team that was joined or left" },
	
	{ field: "RolesIngame", type: "List (;) of String", desc: "only ingame roles" },
	{ field: "RolesStaff", type: "List (;) of String", desc: "only support staff roles" },
	{ field: "Roles", type: "List (;) of String", desc: "list of all roles" },
	{ field: "RoleDisplay", type: "String", desc: "Already embeddable" },
	{ field: "Role", type: "String", desc: "Temp legacy support" },
	
	{ field: "RoleModifier", type: "Boolean", type: "String", desc: "Sub or Trainee" },
	{ field: "Status", type: "String", desc: "Inactive, etc." },
	
	{ field: "CurrentTeamPriority", type: "Integer", desc: "Ordering of the team for player pages, 1 is highest priority" },
	
	{ field: "PlayerUnlinked", type: "Boolean", desc: "Should the player's name be unlinked (e.g. support staff distantly removed from esports)" },
	{ field: "AlreadyJoined", type: "String", desc: "If preload is set_to_leave_already_joined, this is the name of the team they already joined, otherwise null" },
	{ field: "Tournaments", type: "List (,) of String", desc: "For internal use of which tournaments to display the roster changes in" },
	{ field: "Source", type: "Wikitext", desc: "source for the change" },
	{ field: "IsGCD", type: "Boolean", desc: "is the change GCD-only? i.e. no team announce" },
	{ field: "Preload", type: "String", desc: "Mostly for internal use, the preload that the change used so we can filter by type" },
	{ field: "PreloadSortNumber", type: "Integer", desc: "For sorting lines within a date" },
	{ field: "Tags", type: "List (,) of String", desc: "Users will set yes/no on a set of predefined flags that may add entries to this list. GCD," },
	{ field: "NewsId", type: "String", desc: "For joining all types of news together" },
	{ field: "RosterChangeId", type: "String", desc: "For joining to Tenures" },
	{ field: "N_LineInNews", type: "Integer", desc: "For sorting roster changes within a single news item (e.g. role change leave then join)" },
]
