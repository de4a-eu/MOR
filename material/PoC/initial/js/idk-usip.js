
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
 			"atuLevel" : "nuts0" ,
 			"provisions" : [
 				{
 					"dataOwnerId" : "iso6523-actorid-upis::9921:E00003901",
 					"redirectURL": "https://pid.gob.es/usip"
 				}
 			]
 		},
 		{
 			"countryCode" : "LU",
 			"atuLevel" : "nuts0",
 			"provisions" : [
 				{
 					"dataOwnerId" : "iso6523-actorid-upis::9991:LU000000025",
 					"redirectURL": "https://ctie.lu/usip"
 				}
 			]
 		}, 
 		{
 			"countryCode" : "DL",
 		 	"atuLevel" : "nuts1",
 			"provisions" : [
 				{
 					"dataOwnerId" : "iso6523-actorid-upis::9991:DL000000001",
 					"redirectURL": "https://quantum.gov.dl/usip"
 				},
 				{
 					"dataOwnerId" : "iso6523-actorid-upis::9991:DL000000002",
 					"redirectURL": "https://binary.gov.dl/usip"
 				}
 			]
 		}, 
 		{
  			"countryCode" : "SI",
 		 	"atuLevel" : "nuts0",
 			"provisions" : [
 				{
 					"dataOwnerId" : "iso6523-actorid-upis::9991:SI990000105",
 					"redirectURL": "https://moai.gov.si/usip"
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
 					"redirectURL": "https://pid.gob.es/usip"
 				}
 			]
 		},
 		{
 			"countryCode" : "LU",
 			"atuLevel" : "nuts0",
 			"provisions" : [
 				{
 					"dataOwnerId" : "iso6523-actorid-upis::9991:LU000000025",
 					"redirectURL": "https://ctie.lu/usip"
 				}
 			]
 		}, 
 		{
  			"countryCode" : "SI",
 		 	"atuLevel" : "nuts0",
 			"provisions" : [
 				{
 					"dataOwnerId" : "iso6523-actorid-upis::9991:SI990000105",
 					"redirectURL": "https://moai.gov.si/usip"
 				}
 			]
 		}
	]
}