type siteMode = "on" | "off" | "alert";

type sectorState = "enabled" | "disabled" | "locked";

type deltaDirection = "positive" | "negative";

type AllowedAlert = {
	id: number;
	body: string;
	modifier: "REGEX" | "ENDS" | "CONTAINS" | "BEGINS";
};

type Site = {
	id: string;
	siteNameForUser: string;
	pikud: "צפון" | "מרכז" | "דרום";
	siteType: "BBU" | "DUS";
	siteIP: string;
	isPortable: boolean;
	defaultLocation: string;
};

type SiteData = {
	success: boolean;
	displayName: string;
	amosName: string;
	status: string;
	area: string;
	isPortable: boolean;
	data: SiteDataDatum[];
};

type SiteDataDatum = {
	id: number;
	index: string;
	siteID: string;
	date: string;
	st_cell: St;
	st_rru: Alt;
	st_mme: St;
	st_ike: St;
	rr: Rr;
	ue_print_admitted: UePrintAdmitted;
	getEarfcn: ConfiguredMaxTxPowerData;
	invxrf: Invxrf;
	configuredMaxTxPowerData: ConfiguredMaxTxPowerData;
	alt: Alt;
	gpsData?: GpsData;
};

type Alt = {
	generalInfo: GeneralInfo;
	data: AltDatum[];
};

type AltDatum = {
	date: Date;
	servicePriority: string;
	description: string;
};

type GeneralInfo = {
	commandName: string;
	status: string
	totalRows: number;
};

type ConfiguredMaxTxPowerData = {
	generalInfo: GeneralInfo;
	data: ConfiguredMaxTxPowerDataDatum[];
};

type ConfiguredMaxTxPowerDataDatum = {
	sector: string;
	mo: string;
	attribute: string;
	value: string;
	mode?: string;
};

type GpsData = {
	generalInfo: GeneralInfo;
	data: GpsDataDatum[];
};

type GpsDataDatum = {
	latitude: string;
	longitude: string;
	noOfSatellitesInView: string;
	noOfSatellitesInUse: string;
};

type Invxrf = {
	generalInfo: GeneralInfo;
	data: InvxrfDatum[];
};

type InvxrfDatum = {
	auxPiu: string;
	lnh: string;
	board: string;
	rf: string;
	bp: string;
	tx: string;
	txWDbm: string;
	vswr: string;
	vswrRl: string;
	rxDbm: string;
	ues: string;
	sector: string;
	antennaGroup: string;
	cells: string;
	pci: string;
};

type Rr = {
	generalInfo: GeneralInfo;
	data: RrDatum[];
};

type RrDatum = {
	sector: string;
	counter: string;
	value: string;
};

type St = {
	generalInfo: GeneralInfo;
	data: StCellDatum[];
};

type StCellDatum = {
	sector?: string;
	sectorId: string;
	proxy: string;
	admState: string;
	opState: string;
	mo: string;
	ipsecTunnel?: string;
	mmeName?: string;
};

type UePrintAdmitted = {
	generalInfo: GeneralInfo;
	data: UePrintAdmittedDatum[];
};

type UePrintAdmittedDatum = {
	sectorId: string;
	cellID: string;
	ueS: string;
	bearers: string;
};
