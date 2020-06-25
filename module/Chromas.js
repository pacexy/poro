module.exports = [
	{ field: "Name", type: "String", desc: "primary key" },
	{ field: "Skin", type: "String", desc: "" },
	{ field: "Champion", type: "String", desc: "de-normalized for convenience" },
	{ field: "IsBundleExclusive", type: "Boolean", desc: "" },
	{ field: "IsLootExclusive", type: "Boolean", desc: "" },
	{ field: "Special", type: "Text", desc: "" },
	{ field: "ReleaseDate", type: "Date", desc: "Bundle release date (should be moved to bundle table if we do that)" },
	{ field: "BundleRP", type: "Integer", desc: "Bundle release date (should be moved to bundle table if we do that)" },
	{ field: "RP", type: "Integer", desc: "RP for individual skin" },
	{ field: "Hex1", type: "String", desc: "A hex value, no #" },
	{ field: "Hex2", type: "String", desc: "A hex value, no #" },
	{ field: "UniqueSet", type: "String", desc: "Skin and index" },
]
