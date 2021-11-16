
var canonical = new Map();
canonical["BirthCertificate"] = "\
<BirthCertificate>\
	<Child>\
		<GivenName>Lisa</GivenName>\
		<FamilyName>Simpson</FamilyName>\
		<Gender>Female</Gender>\
		<BirthDate>20/02/2002</BirthDate>\
		<PlaceOfBirth>\
			<geographicIdentifier></geographicIdentifier>\
			<geographicName>Springfield, Earth</geographicName>\
		</PlaceOfBirth>\
	</Child>\
	<Parent1>\
		<GivenName>Homer</GivenName>\
		<FamilyName>Simpson</FamilyName>\
	</Parent1>\
	<Parent2>\
		<GivenName>Marge</GivenName>\
		<FamilyName>Simpson</FamilyName>\
	</Parent2>\
</BirthCertificate>\
";

 canonical["MarriageCertificate"] = "\
<MarriageCertificate>\
	<MarriageDate>01/01/1990</MarriageDate>\
	<PlaceOfMarriage>\
		<geographicIdentifier/>\
		<geographicName>Springfield, Earth</geographicName>\
	</PlaceOfMarriage>\
	<Spouse>\
		<GivenName>Homer</GivenName>\
		<FamilyName>Simpson</FamilyName>\
		<Gender>Male</Gender>\
		<BirthDate>01/05/1970</BirthDate>\
		<Identifier>\
			<IdType>SS Number</IdType>\
			<Number>9984430223</Number>\
		</Identifier>\
	</Spouse>\
	<Spouse>\
		<GivenName>Marge</GivenName>\
		<FamilyName>Singleton</FamilyName>\
		<Gender>Female</Gender>\
		<BirthDate>11/01/1970</BirthDate>\
		<Identifier>\
			<IdType>SS Number</IdType>\
			<Number>3300987734</Number>\
		</Identifier>\
	</Spouse>\
</MarriageCertificate>\
";
 

var ialJSON = {
 	"BirthCertificate" : [
 		{
 			"countryCode" : "ES",
 			"atuLevel" : "nuts0",
 			"provisions"  : [
 				{
 					"dataOwnerId" : "iso6523-actorid-upis::9921:E00003901", 
					"params" : [
						{
							"title" : "CivilRegistry/SearchEntry",
							"paramset" : [
								"CivilRegistry/Book",
								"CivilRegistry/Volume",
								"CivilRegistry/Page"
							]
						},
						{
							"title" : "CivilRegistry/SearchFiliation",
							"paramset" : [
								"Person/Gender",
								"Person/FirstFamilyName",
								"Person/SecondFamilyName",
								"Person/hasnotSecondFamilyName"
							]
						}
					]
				}
 			]
 		},
		{
 			"countryCode" : "LU",
 			"atuLevel" : "nuts0",
 			"provisions"  : [
 				{
 					"dataOwnerId" : "iso6523-actorid-upis::9991:LU000000025", 
 				}
 			]
 		}, 
 		{
 			"countryCode" : "SI",
 		 	"atuLevel" : "nuts0",
 			"provisions"  : [
 				{
 					"dataOwnerId" : "iso6523-actorid-upis::9991:SI990000105"
 				}
 			]
 		}, 
 		{
 			"countryCode" : "BE",
 		 	"atuLevel" : "nuts1",
 			"provisions"  : [
 				{
 					"dataOwnerId" : "iso6523-actorid-upis::9991:BE000000001",
 					"atuCode" : "BE1"
 				},
 				{
 					"dataOwnerId" : "iso6523-actorid-upis::9991:BE000000002",
 					"atuCode" : "BE2"
 				}
 			]
 		}
 	],
 	"MarriageCertificate" : [
 		{
  			"countryCode" : "ES",
 			"atuLevel" : "nuts0" ,
 			"provisions" : [
 				{
 					"dataOwnerId" : "iso6523-actorid-upis::9921:E00003901", 
					"params" : [
						{
							"title" : "ES/nuts2"	
						}
					]					
 				}
 			]
 		},
 		{
 			"countryCode" : "LU",
 			"atuLevel" : "nuts0",
 			"provisions"  : [
 				{
 					"dataOwnerId" : "iso6523-actorid-upis::9991:LU000000025", 
 				}
 			]
 		}, 
 		{
  			"countryCode" : "SI",
 		 	"atuLevel" : "nuts0",
 			"provisions"  : [
 				{
 					"dataOwnerId" : "iso6523-actorid-upis::9991:SI990000105", 
					"params" : [
						{
							"title" : "SI/nuts3",
							"paramset" : [
								"SI/SI031",
								"SI/SI034"
							]				
						}
					]				 
 				}
 			]
 		}
 	]
 }
