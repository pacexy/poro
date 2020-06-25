module.exports = [
	{ field: "Player", type: "String", desc: "" },
	{ field: "Name", type: "String ", desc: "in case we have multiple recordings when players namechange" },
	{ field: "RecordedBy", type: "String", desc: "" },
	{ field: "RecordedBy_User", type: "String ", desc: "link to wiki userpage" },
	{ field: "Source", type: "String ", desc: "Broadcast, Team, Player - how well-sourced this is" },
	{ field: "Date", type: "Date", desc: "For sorting purposes" },
	{ field: "Language", type: "String", desc: "Language it's pronounced in" },
]
