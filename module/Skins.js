module.exports = [
	{ field: "Name", type: "String", desc: "" },
	{ field: "Champion", type: "String", desc: "" },
	{ field: "RP", type: "Integer", desc: "" },
	{ field: "ReleaseDate", type: "Date", desc: "" },
	{ field: "Artists", type: "List (,) of String", desc: "splash artists" },
	{ field: "IsLegacy", type: "Boolean", desc: "" },
	{ field: "Special", type: "String", desc: "" },
	{ field: "HasChromas", type: "Boolean", desc: "" },
	{ field: "IsClassic", type: "Boolean", desc: "true means the skin isn't actually a non-default skin and shouldn't be included in totals" },
	{ field: "IsReleased", type: "Boolean", desc: "" },
]
