module.exports = [
	{ field: 'FinalLocation', type: 'String', desc: 'The page where the term is located' },
	{ field: 'Term', type: 'String', desc: 'Will be _pageName unless the disambig is located at _(Disambiguation)' },
	{ field: 'DisambigType', type: 'String', desc: 'Player, Team, Other' },
	{ field: 'N_LineInPage', type: 'String', desc: '' },
	{ field: 'DisambigID', type: 'String', desc: 'To join to type-specific tables' },
]
