module.exports = [
	{ field: "FileName", type: "String", desc: "Alias to avoid using _pageName" },
	{ field: "Link", type: "String", desc: "" },
	{ field: "Team", type: "String", desc: "" },
	{ field: "Tournament", type: "String", desc: "" },
	{ field: "ImageType", type: "String", desc: "" },
	{ field: "Caption", type: "Text", desc: "Caption to be shown in a gallery" },
	{ field: "IsProfileImage", type: "Boolean", desc: "can this image be used as the profile picture in an infobox?" },
	{ field: "SortDate", type: "Date", desc: "Use this to overwrite the tournament's start date or if no tournament is provided" },
]
