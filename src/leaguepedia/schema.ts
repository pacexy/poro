export const schemaMap = {
  Alphabets: {
    Alphabet: '', // String
    IsTransliterated: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  BroadcastMusicTrackTypes: {
    Type: '', // String
    Priority: 0, // Integer
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  BroadcastMusicTracks: {
    TrackID: '', // String
    TrackName: '', // String
    Album: '', // String
    Publishers: '', // String
    Label: '', // String
    TrackLength: '', // String
    Artists: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  BroadcastMusicUsages: {
    TrackID: '', // String
    Tournament: '', // String
    Type: '', // String
    Link: '', // String
    LinkType: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  CargoAttachments: {
    CargoTable: '', // String
    TemplateName: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  ChampionFlashcards: {
    Year: 0, // Integer
    Champion: '', // String
    ChampionRange: '', // String
    DamageType: '', // String
    CCLevel: 0, // Integer
    BurstLevel: 0, // Integer
    SustainedLevel: 0, // Integer
    TankLevel: 0, // Integer
    Goal: '', // String
    Strengths: '', // String
    Weaknesses: '', // String
    Ultimate: '', // String
    Mechanic: '', // String
    Classes: [''], // List of String
    Roles: [''], // List of String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Champions: {
    Name: '', // String
    Title: '', // String
    ReleaseDate: new Date(), // Date
    BE: 0, // Integer
    RP: 0, // Integer
    Attributes: [''], // List of String
    Resource: '', // String
    RealName: '', // String
    Health: 1, // Float
    HPLevel: 1, // Float
    HPDisplay: '', // Wikitext
    HPLevelDisplay: '', // Wikitext
    HPRegen: 1, // Float
    HPRegenLevel: 1, // Float
    Mana: 1, // Float
    ManaLevel: 1, // Float
    ManaRegen: 1, // Float
    ManaRegenLevel: 1, // Float
    Energy: 1, // Float
    EnergyRegen: 1, // Float
    Movespeed: 1, // Float
    AttackDamage: 1, // Float
    ADLevel: 1, // Float
    AttackSpeed: 1, // Float
    ASLevel: 1, // Float
    AttackRange: 1, // Float
    Armor: 1, // Float
    ArmorLevel: 1, // Float
    MagicResist: 1, // Float
    MagicResistLevel: 1, // Float
    Pronoun: '', // String
    KeyDdragon: '', // String
    KeyInteger: 0, // Integer
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  ChromaSets: {
    Champion: '', // String
    Skin: '', // String
    ReleaseDate: new Date(), // Date
    RP: 0, // Integer
    Name: '', // String
    NumberOfChromas: 0, // Integer
    UniqueSet: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Chromas: {
    Name: '', // String
    Skin: '', // String
    Champion: '', // String
    IsBundleExclusive: false, // Boolean
    IsLootExclusive: false, // Boolean
    Special: '', // Text
    ReleaseDate: new Date(), // Date
    BundleRP: 0, // Integer
    RP: 0, // Integer
    Hex1: '', // String
    Hex2: '', // String
    UniqueSet: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Contracts: {
    Player: '', // String
    Team: '', // String
    ContractEnd: new Date(), // Date
    IsRemoval: false, // Boolean
    NewsId: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  CurrentLeagues: {
    Event: '', // String
    Page: '', // Page
    Priority: 0, // Integer
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Disambiguations: {
    FinalLocation: '', // String
    Term: '', // String
    DisambigType: '', // String
    N_LineInPage: '', // String
    DisambigID: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Entities: {
    Entity: '', // String
    EntityName: '', // String
    EntityPage: '', // String
    EntityType: '', // String
    Display: '', // String
    IsLowercase: false, // Boolean
    DisambigSentence: '', // Wikitext
    AnnounceNew: false, // Boolean
    DontAnnounceNew: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  ExternalContent: {
    Title: '', // Text
    URL: '', // Text
    ContentType: '', // String
    MediaType: '', // String
    Language: '', // String
    Players: [''], // List of String
    Tournaments: [''], // List of String
    Teams: [''], // List of String
    Date: new Date(), // Datetime
    Year: 0, // Integer
    Publication: '', // String
    N_ItemInDate: 0, // Integer
    Authors: [''], // List of String
    Translators: '', // String
    Series: '', // String
    SeriesSeason: '', // String
    SeriesSeasonNumber: 0, // Integer
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  GCDArchive: {
    Region: '', // String
    RegionAbbreviation: '', // String
    PageDate: new Date(), // Date
    PageDateTime: new Date(), // Datetime
    UpdateDate: new Date(), // Date
    PageURLDate: new Date(), // Date
    IsNew: false, // Boolean
    Diff: '', // String
    Diff_URL: '', // Wikitext
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Hooks: {
    Hook: '', // String
    Module: '', // Page
    Action: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  IgnorePagedata: {
    TypeOfIgnore: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  IndividualAchievements: {
    Player: '', // String
    Link: '', // String
    Team: '', // String
    OverviewPage: '', // String
    Display: '', // String
    Place: '', // String
    Place_Number: 0, // Integer
    AchievementType: '', // String
    Description: '', // Wikitext
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Items: {
    Name: '', // String
    Recipe: [''], // List of String
    Cost: 0, // Integer
    TotalCost: 0, // Integer
    AD: 0, // Integer
    LifeSteal: 0, // Integer
    Health: 0, // Integer
    HPRegen: 0, // Integer
    Armor: 0, // Integer
    MR: 0, // Integer
    AttackDamage: 0, // Integer
    Crit: 0, // Integer
    AttackSpeed: 0, // Integer
    ArmorPen: 0, // Integer
    AttackRange: 0, // Integer
    Mana: 0, // Integer
    ManaRegen: 0, // Integer
    Energy: 0, // Integer
    EnergyRegen: 0, // Integer
    AP: 0, // Integer
    CDR: 0, // Integer
    AbilityHaste: 0, // Integer
    Omnivamp: 0, // Integer
    PhysVamp: 0, // Integer
    SpellVamp: 0, // Integer
    MPen: 0, // Integer
    MovespeedFlat: 0, // Integer
    MovespeedPercent: 0, // Integer
    Tenacity: 0, // Integer
    GoldGen: 0, // Integer
    OnHit: 0, // Integer
    BonusHP: 0, // Integer
    Healing: 0, // Integer
    HSPower: 0, // Integer
    SlowResist: 0, // Integer
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  LeagueGroups: {
    LongName: '', // String
    ShortName: '', // String
    Leagues: [''], // List of String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Leagues: {
    League: '', // String
    League_Short: '', // String
    Region: '', // String
    Level: '', // String
    IsOfficial: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  ListplayerCurrent: {
    ID: '', // String
    Link: '', // String
    Name: '', // String
    N: 0, // Integer
    Country: '', // String
    Role: '', // String
    IsSubstitute: '', // String
    IsTrainee: '', // String
    Team: '', // String
    ContractDate: new Date(), // Date
    Residency: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  LowPriorityRedirects: {
    IsLowPriority: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  MatchSchedule: {
    Team1: '', // String
    Team2: '', // String
    Team1Final: '', // String
    Team2Final: '', // String
    Winner: '', // String
    Team1Points: 0, // Integer
    Team2Points: 0, // Integer
    Team1PointsTB: 0, // Integer
    Team2PointsTB: 0, // Integer
    Team1Score: 0, // Integer
    Team2Score: 0, // Integer
    Team1Poster: '', // String
    Team2Poster: '', // String
    Team1Advantage: 0, // Integer
    Team2Advantage: 0, // Integer
    FF: 0, // Integer
    Player1: '', // String
    Player2: '', // String
    MatchDay: 0, // Integer
    DateTime_UTC: new Date(), // Datetime
    HasTime: false, // Boolean
    DST: '', // String
    IsFlexibleStart: false, // Boolean
    IsReschedulable: false, // Boolean
    OverrideAllowPredictions: false, // Boolean
    IsTiebreaker: false, // Boolean
    OverviewPage: '', // String
    ShownName: '', // String
    ShownRound: '', // Text
    BestOf: 0, // Integer
    Round: '', // String
    Phase: '', // String
    N_MatchInPage: 0, // Integer
    Tab: '', // String
    N_MatchInTab: 0, // Integer
    N_TabInPage: 0, // Integer
    N_Page: 0, // Integer
    Patch: '', // String
    PatchPage: '', // String
    Hotfix: '', // String
    DisabledChampions: [''], // List of String
    PatchFootnote: '', // Text
    InitialN_MatchInTab: 0, // Integer
    InitialPageAndTab: '', // String
    GroupName: '', // String
    Stream: '', // Wikitext
    StreamDisplay: '', // Text
    Venue: '', // String
    CastersPBP: '', // Text
    CastersColor: '', // Text
    Casters: [''], // List of String
    MVP: '', // String
    MVPPoints: 0, // Integer
    VodInterview: '', // Wikitext
    VodHighlights: '', // Wikitext
    InterviewWith: [''], // List of String
    Recap: '', // Text
    Reddit: '', // Text
    QQ: 0, // Integer
    Wanplus: '', // String
    WanplusId: 0, // Integer
    PageAndTeam1: '', // String
    PageAndTeam2: '', // String
    Team1Footnote: '', // Text
    Team2Footnote: '', // Text
    Footnote: '', // Text
    UniqueMatch: '', // String
    MatchId: '', // String
    UserSignup: '', // String
    Tags: [''], // List of String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  MatchScheduleGame: {
    Blue: '', // String
    Red: '', // String
    Winner: 0, // Integer
    BlueFinal: '', // String
    RedFinal: '', // String
    BlueFootnote: '', // Text
    RedFootnote: '', // Text
    Footnote: '', // Text
    IsChronobreak: false, // Boolean
    IsRemake: false, // Boolean
    FF: 0, // Integer
    Selection: '', // String
    HasSelection: false, // Boolean
    MatchHistory: '', // Wikitext string
    Recap: '', // Wikitext
    Reddit: '', // Wikitext
    Vod: '', // Wikitext
    VodPB: '', // Wikitext
    VodGameStart: '', // Wikitext
    VodPostgame: '', // Wikitext
    VodHighlights: '', // Wikitext
    VodInterview: '', // Wikitext
    InterviewWith: [''], // List of String
    MVP: '', // String
    MVPPoints: 0, // Integer
    OverviewPage: '', // String
    N_MatchInTab: 0, // Integer
    N_TabInPage: 0, // Integer
    N_GameInMatch: 0, // Integer
    N_Page: 0, // Integer
    GameId: '', // String
    MatchId: '', // String
    RiotPlatformGameId: '', // String
    RiotPlatformId: '', // String
    RiotGameId: '', // String
    RiotHash: '', // String
    WrittenSummary: '', // Text
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  NASGLadder2018: {
    Display: '', // String
    Link: '', // String
    Year: '', // String
    Cycle1: 0, // Integer
    Cycle2: 0, // Integer
    Cycle3: 0, // Integer
    Cycle4: 0, // Integer
    Cycle5: 0, // Integer
    Cycle6: 0, // Integer
    Cycle7: 0, // Integer
    Cycle8: 0, // Integer
    Total: 0, // Integer
    Role: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  NASGLadder5Cycles: {
    Display: '', // String
    Link: '', // String
    Year: '', // String
    Cycle1: 0, // Integer
    Cycle2: 0, // Integer
    Cycle3: 0, // Integer
    Cycle4: 0, // Integer
    Cycle5: 0, // Integer
    Total: 0, // Integer
    Role: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  NASGLadder7Cycles: {
    Display: '', // String
    Link: '', // String
    Year: '', // String
    Cycle1: 0, // Integer
    Cycle2: 0, // Integer
    Cycle3: 0, // Integer
    Cycle4: 0, // Integer
    Cycle5: 0, // Integer
    Cycle6: 0, // Integer
    Cycle7: 0, // Integer
    Total: 0, // Integer
    Role: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  NTLGlossary: {
    Term: '', // String
    Term_LC: '', // String
    Definition: '', // Wikitext
    Categories: [''], // List of String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  NewsItems: {
    Date_Display: '', // String
    Date_Sort: new Date(), // Datetime
    IsApproxDate: false, // Boolean
    EarliestPossibleDate: new Date(), // Date
    LatestPossibleDate: new Date(), // Date
    Sentence: '', // Wikitext
    SentenceWithDate: '', // Wikitext
    Sentence_Team: '', // Wikitext
    Sentence_Player: '', // Wikitext
    Sentence_Tournament: '', // Wikitext
    Subject: '', // String
    SubjectType: '', // String
    SubjectLink: '', // String
    Preload: '', // String
    Region: '', // String
    Players: [''], // List of String
    Teams: [''], // List of String
    Tournaments: [''], // List of String
    Tags: [''], // List of String
    Source: '', // Wikitext
    N_LineInDate: 0, // Integer
    NewsId: '', // String
    ExcludeFrontpage: false, // Boolean
    ExcludePortal: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Organizations: {
    Name: '', // String
    OverviewPage: '', // String
    Location: '', // String
    Region: '', // String
    Image: '', // String
    Twitter: '', // String
    Youtube: '', // String
    Facebook: '', // String
    Instagram: '', // String
    Discord: '', // String
    Snapchat: '', // String
    Vk: '', // String
    Subreddit: '', // String
    IsLowercase: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  ParticipantsArgs: {
    OverviewPage: '', // String
    N_TeamInPage: 0, // Integer
    Pool: '', // String
    Args: '', // Text
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  PatchNotes: {
    EntityType: '', // String
    Entity: '', // String
    Changes: '', // Wikitext
    Patch: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Pentakills: {
    N: 0, // Integer
    DateDisplay: '', // String
    DateSort: new Date(), // Date
    Region: '', // String
    Tournament: '', // String
    OverviewPage: '', // String
    Team: '', // String
    TeamVs: '', // String
    Name: '', // String
    Link: '', // String
    Champion: '', // String
    Role: '', // String
    Win: false, // Boolean
    Kills: 0, // Integer
    Deaths: 0, // Integer
    Assists: 0, // Integer
    ScoreboardLink: '', // String
    Vod: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  PicksAndBansS7: {
    Team1Role1: '', // String
    Team1Role2: '', // String
    Team1Role3: '', // String
    Team1Role4: '', // String
    Team1Role5: '', // String
    Team2Role1: '', // String
    Team2Role2: '', // String
    Team2Role3: '', // String
    Team2Role4: '', // String
    Team2Role5: '', // String
    Team1Ban1: '', // String
    Team1Ban2: '', // String
    Team1Ban3: '', // String
    Team1Ban4: '', // String
    Team1Ban5: '', // String
    Team1Pick1: '', // String
    Team1Pick2: '', // String
    Team1Pick3: '', // String
    Team1Pick4: '', // String
    Team1Pick5: '', // String
    Team2Ban1: '', // String
    Team2Ban2: '', // String
    Team2Ban3: '', // String
    Team2Ban4: '', // String
    Team2Ban5: '', // String
    Team2Pick1: '', // String
    Team2Pick2: '', // String
    Team2Pick3: '', // String
    Team2Pick4: '', // String
    Team2Pick5: '', // String
    Team1: '', // String
    Team2: '', // String
    Winner: 0, // Integer
    Team1Score: 0, // Integer
    Team2Score: 0, // Integer
    Team1PicksByRoleOrder: '', // String
    Team2PicksByRoleOrder: '', // String
    OverviewPage: '', // String
    Phase: '', // String
    UniqueLine: '', // String
    IsComplete: false, // Boolean
    Tab: '', // String
    N_Page: 0, // Integer
    N_TabInPage: 0, // Integer
    N_MatchInPage: 0, // Integer
    N_GameInPage: 0, // Integer
    N_GameInMatch: 0, // Integer
    N_MatchInTab: 0, // Integer
    N_GameInTab: 0, // Integer
    GameId: '', // String
    MatchId: '', // String
    GameID_Wiki: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  PlayerCompetitiveRulings: {
    Player: '', // String
    Team: '', // String
    PlayerRegion: '', // String
    RulingRegion: '', // String
    Date: new Date(), // Date
    Link: '', // Wikitext
    Rules: [''], // List of String
    Fine: 0, // Integer
    FineUnit: '', // String
    NGames: 0, // Integer
    Events: [''], // List of String
    Suspension: '', // String
    SuspensionStart: new Date(), // Date
    SupsensionEnd: new Date(), // Date
    Notes: '', // Text
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  PlayerImages: {
    FileName: '', // String
    Link: '', // String
    Team: '', // String
    Tournament: '', // String
    ImageType: '', // String
    Caption: '', // Text
    IsProfileImage: false, // Boolean
    SortDate: new Date(), // Date
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  PlayerLeagueHistory: {
    Player: '', // String
    Teams: [''], // List of String
    League: '', // String
    LeagueHistory: '', // Text
    TotalGames: 0, // Integer
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  PlayerPronunciationFiles: {
    Player: '', // String
    Name: '', // String
    RecordedBy: '', // String
    RecordedBy_User: '', // String
    Source: '', // String
    Date: new Date(), // Date
    Language: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  PlayerRedirects: {
    AllName: '', // String
    OverviewPage: '', // String
    ID: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  PlayerRenames: {
    Date: new Date(), // Datetime
    OriginalName: '', // String
    NewName: '', // String
    NewsId: '', // String
    IsRestyle: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Players: {
    ID: '', // String
    OverviewPage: '', // String
    Player: '', // String
    Image: '', // String
    Name: '', // String
    NativeName: '', // String
    NameAlphabet: '', // String
    NameFull: '', // String
    Country: '', // String
    Nationality: [''], // List of String
    NationalityPrimary: '', // String
    Age: 0, // Integer
    Birthdate: new Date(), // Date
    ResidencyFormer: '', // String
    Team: '', // String
    Team2: '', // String
    CurrentTeams: [''], // List of String
    TeamSystem: '', // String
    Team2System: '', // String
    Residency: '', // String
    Role: '', // String
    FavChamps: [''], // List of String
    SoloqueueIds: '', // Text
    Askfm: '', // String
    Discord: '', // Text
    Facebook: '', // Text
    Instagram: '', // String
    Lolpros: '', // String
    Reddit: '', // String
    Snapchat: '', // String
    Stream: '', // Text
    Twitter: '', // String
    Vk: '', // Text
    Website: '', // Text
    Weibo: '', // Text
    Youtube: '', // Text
    TeamLast: '', // String
    RoleLast: '', // String
    IsRetired: false, // Boolean
    ToWildrift: false, // Boolean
    IsPersonality: false, // Boolean
    IsSubstitute: false, // Boolean
    IsTrainee: false, // Boolean
    IsLowercase: false, // Boolean
    IsAutoTeam: false, // Boolean
    IsLowContent: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  PostgameJsonMetadata: {
    RiotPlatformGameId: '', // String
    RiotPlatformId: '', // String
    RiotGameId: '', // String
    RiotHash: '', // String
    GameId: '', // String
    MatchId: '', // String
    N_GameInMatch: 0, // Integer
    OverviewPage: '', // String
    StatsPage: '', // String
    TimelinePage: '', // String
    Version: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  RegionStatuses: {
    Region: '', // String
    Year: '', // String
    Status: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Regions: {
    RegionLong: '', // String
    RegionMedium: '', // String
    Priority: 0, // Integer
    IsCurrent: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  ResidencyChanges: {
    Player: '', // String
    NewsId: '', // String
    ResidencyOld: '', // String
    ResidencyNew: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Retirements: {
    Player: '', // String
    NewsId: '', // String
    Unretires: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  RosterChangePortalDates: {
    Region: '', // String
    DateStart: new Date(), // Date
    DateEnd: new Date(), // Date
    Year: 0, // Integer
    Period: '', // String
    PeriodName: '', // String
    PeriodSort: 0, // Integer
    OverviewPage: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  RosterChangePortalPages: {
    SplitOrder: 0, // Integer
    Year: 0, // Integer
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  RosterChanges: {
    Date_Sort: new Date(), // Datetime
    Player: '', // String
    Direction: '', // String
    Team: '', // String
    RolesIngame: [''], // List of String
    RolesStaff: [''], // List of String
    Roles: [''], // List of String
    RoleDisplay: '', // String
    Role: '', // String
    RoleModifier: '', // String
    Status: '', // String
    CurrentTeamPriority: 0, // Integer
    PlayerUnlinked: false, // Boolean
    AlreadyJoined: '', // String
    Tournaments: [''], // List of String
    Source: '', // Wikitext
    IsGCD: false, // Boolean
    Preload: '', // String
    PreloadSortNumber: 0, // Integer
    Tags: [''], // List of String
    NewsId: '', // String
    RosterChangeId: '', // String
    N_LineInNews: 0, // Integer
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  RosterRumors: {
    Date: new Date(), // Date
    Status: '', // String
    IsOver: false, // Boolean
    NotHappening: false, // Boolean
    Player: '', // String
    Regions: [''], // List of String
    TeamStart: '', // String
    TeamEnd: '', // String
    LeagueStart: '', // String
    LeagueEnd: '', // String
    RegionStart: '', // String
    RegionEnd: '', // String
    RoleStart: '', // String
    RoleEnd: '', // String
    IsSubStart: false, // Boolean
    IsSubEnd: false, // Boolean
    IsTraineeStart: false, // Boolean
    IsTraineeEnd: false, // Boolean
    CustomText: '', // Wikitext
    SourceLink: '', // Text
    SourceAuthors: [''], // List of String
    SourceSite: '', // String
    StatusLink: '', // Text
    N_LineInDate: 0, // Integer
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  RunesDataPages: {
    OverviewPage: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  ScoreboardCounters: {
    OverviewPage: '', // String
    Tab: '', // String
    N_ScoreboardPage: 0, // Integer
    N_MatchInPage: 0, // Integer
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  ScoreboardGames: {
    OverviewPage: '', // String
    Tournament: '', // String
    Team1: '', // String
    Team2: '', // String
    WinTeam: '', // String
    LossTeam: '', // String
    DateTime_UTC: new Date(), // Datetime
    DST: '', // String
    Team1Score: 0, // Integer
    Team2Score: 0, // Integer
    Winner: 0, // Integer
    Gamelength: '', // String
    Gamelength_Number: 1, // Float
    Team1Bans: [''], // List of String
    Team2Bans: [''], // List of String
    Team1Picks: [''], // List of String
    Team2Picks: [''], // List of String
    Team1Players: [''], // List of String
    Team2Players: [''], // List of String
    Team1Dragons: 0, // Integer
    Team2Dragons: 0, // Integer
    Team1Barons: 0, // Integer
    Team2Barons: 0, // Integer
    Team1Towers: 0, // Integer
    Team2Towers: 0, // Integer
    Team1Gold: 1, // Float
    Team2Gold: 1, // Float
    Team1Kills: 0, // Integer
    Team2Kills: 0, // Integer
    Team1RiftHeralds: 0, // Integer
    Team2RiftHeralds: 0, // Integer
    Team1Inhibitors: 0, // Integer
    Team2Inhibitors: 0, // Integer
    Patch: '', // String
    PatchSort: '', // String
    MatchHistory: '', // String
    VOD: '', // String
    N_Page: 0, // Integer
    N_MatchInTab: 0, // Integer
    N_MatchInPage: 0, // Integer
    N_GameInMatch: 0, // Integer
    Gamename: '', // String
    UniqueLine: '', // String
    GameId: '', // String
    MatchId: '', // String
    RiotPlatformGameId: '', // String
    RiotPlatformId: '', // String
    RiotGameId: '', // String
    RiotHash: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  ScoreboardPlayers: {
    OverviewPage: '', // String
    Name: '', // String
    Link: '', // String
    Champion: '', // String
    Kills: 0, // Integer
    Deaths: 0, // Integer
    Assists: 0, // Integer
    SummonerSpells: [''], // List of String
    Gold: 0, // Integer
    CS: 0, // Integer
    DamageToChampions: 0, // Integer
    Items: [''], // List of String
    Trinket: '', // String
    KeystoneMastery: '', // String
    KeystoneRune: '', // String
    PrimaryTree: '', // String
    SecondaryTree: '', // String
    Runes: '', // Text
    TeamKills: 0, // Integer
    TeamGold: 0, // Integer
    Team: '', // String
    TeamVs: '', // String
    Time: new Date(), // Datetime
    PlayerWin: '', // String
    DateTime_UTC: new Date(), // Datetime
    DST: '', // String
    Tournament: '', // String
    Role: '', // String
    Role_Number: 0, // Integer
    IngameRole: '', // String
    Side: 0, // Integer
    GameIDWiki: '', // String
    GameIDRiot: '', // String
    UniqueGame: '', // String
    UniqueLine: '', // String
    UniqueLineVs: '', // String
    UniqueRole: '', // String
    UniqueRoleVs: '', // String
    GameId: '', // String
    MatchId: '', // String
    GameTeamId: '', // String
    GameRoleId: '', // String
    GameRoleIdVs: '', // String
    StatsPage: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  ScoreboardTeams: {
    Team: '', // String
    Side: '', // String
    Number: 0, // Integer
    IsWinner: false, // Boolean
    Score: 0, // Integer
    Bans: [''], // List of String
    Picks: [''], // List of String
    Roster: [''], // List of String
    Dragons: 0, // Integer
    Barons: 0, // Integer
    Towers: 0, // Integer
    Gold: 0, // Integer
    Kills: 0, // Integer
    RiftHeralds: 0, // Integer
    Inhibitors: 0, // Integer
    OverviewPage: '', // String
    StatsPage: '', // String
    UniqueGame: '', // String
    UniqueTeam: '', // String
    GameId: '', // String
    MatchId: '', // String
    GameTeamId: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  SisterTeams: {
    Team: '', // Page
    Team_Markup: '', // Wikitext
    Status: '', // String
    ActiveList: [''], // List of String
    InactiveList: [''], // List of String
    Active_Markup: [''], // List of Wikitext
    Inactive_Markup: [''], // List of Wikitext
    AllTeams: [''], // List of String
    AllTeams_Markup: [''], // List of Wikitext
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Skins: {
    Name: '', // String
    Champion: '', // String
    RP: 0, // Integer
    ReleaseDate: new Date(), // Date
    Artists: [''], // List of String
    IsLegacy: false, // Boolean
    Special: '', // String
    HasChromas: false, // Boolean
    IsClassic: false, // Boolean
    IsReleased: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  SkinsUsed: {
    Champion: '', // String
    Skin: '', // String
    Chroma: '', // String
    OverviewPage: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Standings: {
    OverviewPage: '', // String
    Team: '', // String
    PageAndTeam: '', // String
    N: 0, // Integer
    Place: 0, // Integer
    WinSeries: 0, // Integer
    LossSeries: 0, // Integer
    TieSeries: 0, // Integer
    WinGames: 0, // Integer
    LossGames: 0, // Integer
    Points: 0, // Integer
    PointsTiebreaker: 1, // Float
    Streak: 0, // Integer
    StreakDirection: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  StandingsArgs: {
    OverviewPage: '', // String
    TournamentGroup: '', // String
    N: 0, // Integer
    Args: '', // Text
    RowArgs: '', // Text
    Finalorder: '', // Text
    UniqueLine: '', // String
    IsOver: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  TeamRedirects: {
    AllName: '', // String
    OtherName: '', // String
    UniqueLine: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  TeamRenames: {
    Date: new Date(), // Datetime
    OriginalName: '', // String
    NewName: '', // String
    Verb: '', // String
    Slot: '', // String
    IsSamePage: '', // String
    NewsId: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  TeamRosterPhotos: {
    FileName: '', // String
    Team: '', // String
    Tournament: '', // String
    Caption: '', // Text
    SortDate: new Date(), // Date
    Hide: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Teams: {
    Name: '', // String
    OverviewPage: '', // String
    Short: '', // String
    Location: '', // String
    TeamLocation: '', // String
    Region: '', // String
    OrganizationPage: '', // String
    Image: '', // String
    Twitter: '', // String
    Youtube: '', // String
    Facebook: '', // String
    Instagram: '', // String
    Discord: '', // String
    Snapchat: '', // String
    Vk: '', // String
    Subreddit: '', // String
    Website: '', // Text
    RosterPhoto: '', // String
    IsDisbanded: false, // Boolean
    RenamedTo: '', // String
    IsLowercase: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  TeamsWithAutoRosters: {
    OverviewPage: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Tenures: {
    Player: '', // String
    Team: '', // String
    DateJoin: new Date(), // Date
    DateLeave: new Date(), // Date
    Duration: 0, // Integer
    ContractEnd: '', // String
    RosterChangeIdJoin: '', // String
    RosterChangeIdLeave: '', // String
    ResidencyLeave: '', // String
    NameLeave: '', // String
    NextTeam: '', // String
    NextIsRetired: false, // Boolean
    NextIsWildrift: false, // Boolean
    IsCurrent: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  TenuresUnbroken: {
    Player: '', // String
    Team: '', // String
    DateJoin: new Date(), // Date
    DateLeave: new Date(), // Date
    Duration: 0, // Integer
    ContractEnd: '', // String
    RosterChangeIdJoin: '', // String
    RosterChangeIdLeave: '', // String
    RosterChangeIds: [''], // List of String
    ResidencyLeave: '', // String
    NameLeave: '', // String
    NextTeam: '', // String
    NextIsRetired: false, // Boolean
    NextIsWildrift: false, // Boolean
    IsCurrent: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  TournamentGroups: {
    Team: '', // String
    OverviewPage: '', // String
    GroupName: '', // String
    GroupDisplay: '', // String
    GroupN: 0, // Integer
    PageAndTeam: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  TournamentPlayers: {
    Team: '', // String
    N_PlayerInTeam: 0, // Integer
    TeamOrder: 0, // Integer
    Link: '', // String
    Player: '', // String
    Role: '', // String
    Flag: '', // Wikitext
    Footnote: '', // Wikitext
    OverviewPage: '', // String
    PageAndTeam: '', // String
    IsDistribution: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  TournamentResults: {
    Event: '', // String
    Tier: '', // String
    Date: new Date(), // Date
    RosterPage: '', // Page
    Place: '', // String
    ForceNewPlace: false, // Boolean
    Place_Number: 0, // Integer
    Qualified: false, // Boolean
    Prize: 0, // Integer
    Prize_USD: 1, // Float
    Prize_Euro: 1, // Float
    PrizeUnit: '', // String
    Prize_Markup: '', // String
    PrizeOther: '', // String
    Phase: '', // String
    Team: '', // String
    IsAchievement: false, // Boolean
    LastResult: '', // String
    LastTeam: '', // String
    LastOpponent_Markup: '', // Wikitext
    GroupName: '', // String
    LastOutcome: '', // String
    PageAndTeam: '', // String
    OverviewPage: '', // String
    UniqueLine: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  TournamentResults1v1: {
    Event: '', // String
    Tier: '', // String
    Date: new Date(), // Date
    Place: '', // String
    Prize: 0, // Integer
    Prize_USD: 1, // Float
    Prize_Euro: 1, // Float
    PrizeUnit: '', // String
    Prize_Markup: '', // String
    PrizeOther: '', // String
    Phase: '', // String
    Player: '', // String
    PlayerLink: '', // String
    Team: '', // String
    LastResult: '', // String
    LastOpponent: '', // String
    LastOpponentLink: '', // String
    LastOutcome: '', // String
    LastOpponentTeam: '', // String
    OverviewPage: '', // String
    UniqueLine: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  TournamentRosters: {
    Team: '', // String
    OverviewPage: '', // String
    Region: '', // String
    RosterLinks: '', // Text
    Roles: '', // Text
    Flags: '', // Text
    Footnotes: [''], // List of Wikitext
    IsUsed: '', // Text
    Tournament: '', // String
    Short: '', // String
    IsComplete: false, // Boolean
    PageAndTeam: '', // String
    UniqueLine: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  TournamentTabs: {
    BasePage: '', // String
    BasePageDisplay: '', // String
    Events: [''], // List of String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  Tournaments: {
    Name: '', // String
    OverviewPage: '', // String
    DateStart: new Date(), // Date
    Date: new Date(), // Date
    DateStartFuzzy: new Date(), // Date
    League: '', // String
    Region: '', // String
    Prizepool: '', // String
    Currency: '', // String
    Country: '', // String
    ClosestTimezone: '', // String
    Rulebook: '', // String
    EventType: '', // String
    Links: '', // String
    Sponsors: '', // String
    Organizer: '', // String
    Organizers: [''], // List of String
    StandardName: '', // String
    StandardName_Redirect: '', // String
    BasePage: '', // String
    Split: '', // String
    SplitNumber: 0, // Integer
    TournamentLevel: '', // String
    IsQualifier: false, // Boolean
    IsPlayoffs: false, // Boolean
    IsOfficial: false, // Boolean
    Year: '', // String
    LeagueIconKey: '', // String
    AlternativeNames: [''], // List of String
    ScrapeLink: '', // Text
    Tags: [''], // List of String
    SuppressTopSchedule: false, // Boolean
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  UserPredictionGroups: {
    GroupName: '', // String
    Members: [''], // List of String
    NumberOfMembers: 0, // Integer
    OverviewPage: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  UserPredictions: {
    User: '', // String
    OverviewPage: '', // String
    NumberOfPredictions: 0, // Integer
    NumberCorrect: 0, // Integer
    NumberOver: 0, // Integer
    NumberMadeAndOver: 0, // Integer
    PredictionList: [''], // List of Text
    PredictionOrder: [''], // List of Text
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },

  _pageData: {
    _creationDate: new Date(), // Datetime
    _modificationDate: new Date(), // Datetime
    _creator: '', // String
    _categories: [''], // List of String
    _numRevisions: 0, // Integer
    _isRedirect: false, // Boolean
    _pageNameOrRedirect: '', // String
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },
}
