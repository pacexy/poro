module.exports = [
	{ field: "Date", type: "DateTime", desc: "" },
	{ field: "OriginalName", type: "String", desc: "Original name of the player, disambiguated if needed" },
	{ field: "NewName", type: "String", desc: "New name of the player, disambiguated if needed" },
	{ field: "NewsId", type: "String", desc: "For joining all types of news together" },
	{ field: "IsRestyle", type: "Boolean", desc: 'If the text should say "previously styled" instead of "previously named"' },
]
