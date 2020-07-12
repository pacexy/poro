module.exports = [
	{ field: "Name", type: "String", desc: "" },
	{ field: "Short", type: "String", desc: "The short name of the team. This should agree with Riot always, if not please report it to us!!!" },
	{ field: "Location", type: "String", desc: "" },
	{ field: "TeamLocation", type: "String", desc: "" },
	{ field: "Region", type: "String", desc: "" },
	{ field: "OrganizationPage", type: "String", desc: "Organizations have a potential for relatively annoying disambiguations. Let's just call them by their page name here. Let's also try to avoid needing redirects." },
	{ field: "Image", type: "String", desc: "" },

	{ field: "Twitter", type: "String", desc: "" },
	{ field: "Youtube", type: "String", desc: "" },
	{ field: "Facebook", type: "String", desc: "" },
	{ field: "Instagram", type: "String", desc: "" },
	{ field: "Discord", type: "String", desc: "" },
	{ field: "Snapchat", type: "String", desc: "" },
	{ field: "Vk", type: "String", desc: "" },
	{ field: "Subreddit", type: "String", desc: "" },

	{ field: "RosterPhoto", type: "String", desc: "" },
	{ field: "IsDisbanded", type: "Boolean", desc: "" },
	{ field: "RenamedTo", type: "String", desc: "Name of the team renamed to or null" },
	{ field: "IsLowercase", type: "Boolean", desc: "" },
]
