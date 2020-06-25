module.exports = [
	{ field: "Date", type: "DateTime", desc: "" },
	{ field: "OriginalName", type: "String", desc: "Original name of the team" },
	{ field: "NewName", type: "String", desc: "New name of the team" },
	{ field: "Verb", type: "String", desc: "Rename, rebrand, etc" },
	{ field: "Slot", type: "String", desc: "The tournament slot acquired if applicable" },
	{ field: "IsSamePage", type: "String", desc: "Mostly for internal use, if the before & after are the same wiki page" },
	{ field: "NewsId", type: "String", desc: "For joining all types of news together" },
]
