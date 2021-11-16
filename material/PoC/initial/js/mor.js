/**
 * 
 */
 var morJSON = {
	"BirthCertificate": {
		"en": {
			"label": "Birth Proof",
			"description": "Data that proves a Birth",
			"example": ""
		},
		"es": {
			"label": "Prueba de Nacimiento",
			"description": "Prueba de Nacimiento",
			"example": ""
		}
	},
	"BirthCertificate/Child": {
		"en": {
			"label": "Person born",
			"description": "Data of the Person born",
			"example": ""
		},
		"es": {
			"label": "Nacido",
			"description": "Persona del nacimiento",
			"example": ""
		}
	},
	"BirthCertificate/Child/GivenName": {
		"ref": "Person/GivenName",
		"en": {
			"label": "Forename",
			"description": "Given name at birth",
			"example": "Mary"
		},
		"es": {
			"description": "Nombre del nacido",
			"example": "Juana"
		}
	},
	"BirthCertificate/Child/FamilyName": {
		"ref": "Person/FamilyName",
		"en": {
			"label": "Surname",
			"description": "Family name at birth",
			"example": "Ford"
		},
		"es": {			
			"description": "Apellidos del nacido",
			"example": "de Arco Martínez"
		}
	},
	"BirthCertificate/Child/Gender": {
		"en": {
			"label": "Gender",
			"description": "Gender at birth",
			"example": "Female"
		},
		"es": {
			"label": "Sexo",
			"description": "Sexo del nacido",
			"example": "Femenino"
		}
	},
	"BirthCertificate/Child/BirthDate": {
		"en": {
			"label": "Birth Date",
			"description": "Date of the birth",
			"example": "20/12/1989"
		},
		"es": {
			"label": "Fecha de Nacimiento",
			"description": "Fecha en que tuvo lugar el nacimiento",
			"example": "20/12/1989"
		}
	},
	"BirthCertificate/Child/PlaceOfBirth": {
		"en": {
			"label": "Birth Place",
			"description": "Place of the birth",
			"example": ""
		},
		"es": {
			"label": "Lugar de Nacimiento",
			"description": "Lugar en que tuvo lugar el nacimiento",
			"example": ""
		}
	},
	"BirthCertificate/Child/PlaceOfBirth/geographicIdentifier": {
		"en": {
			"label": "Geographical code",
			"description": "Code of the geographical location",
			"example": ""
		},
		"es": {
			"label": "Código geográfico",
			"description": "Código geográfico del lugar el nacimiento",
			"example": ""
		}
	},
	"BirthCertificate/Child/PlaceOfBirth/geographicName": {
		"en": {
			"label": "Location name",
			"description": "Name of the geographical location",
			"example": "Dublin, Ireland"
		},
		"es": {
			"label": "Denominación",
			"description": "Denominación del lugar el nacimiento",
			"example": "Robledo de Chavela, Madrid, España"
		}
	},
	"BirthCertificate/Parent1": {
		"type": "title",
		"en": {
			"label": "Parent",
			"description": "Parent's identifying details",
			"example": ""
		},
		"es": {
			"label": "Progenitor",
			"description": "Datos identificativos de un Progenitor",
			"example": ""
		}
	},
	"BirthCertificate/Parent2": {
		"ref": "BirthCertificate/Parent1"
	},
	"BirthCertificate/Parent1/GivenName": {
		"ref": "Person/GivenName",
		"en": {
			"description": "Parent's Given Name"
		},
		"es": {
			"description": "Nombre del progenitor",
		}
	},
	"BirthCertificate/Parent2/GivenName": {
		"ref": "BirthCertificate/Parent1/GivenName",
		"en": {
			"example": "James"
		},
		"es": {
			"example": "María"
		}
	},	
	"BirthCertificate/Parent1/FamilyName": {
		"ref": "Person/FamilyName",
		"en": {
			"description": "Parent's Family Name"
		},
		"es": {			
			"description": "Apellidos del progenitor"
		}
	},
	"BirthCertificate/Parent2/FamilyName": {
		"ref": "BirthCertificate/Parent1/FamilyName",
		"es": {			
			"example": "Mariñas"
		}
	},
	"BirthCertificate/Parent1/Identifier": {
		"ref": "Person/Identifier",
		"en": {			
			"description": "Parent's identity number details"
		},
		"es": {
			"description": "Documento de Identidad del progenitor"
		}
	},
	"BirthCertificate/Parent1/Identifier/IdType": {
		"ref": "Person/Identifier/IdType"
	},
	"BirthCertificate/Parent1/Identifier/Number": {
		"ref": "Person1/Identifier/Number"
	},
	"BirthCertificate/Parent2/Identifier": {
		"ref": "Person1/Identifier",
	},
	"BirthCertificate/Parent2/Identifier/IdType": {
		"ref": "Person1/Identifier/IdType"
	},
	"BirthCertificate/Parent2/Identifier/Number": {
		"ref": "Person1/Identifier/Number"
	},
	"MarriageCertificate": {
		"type": "title",
		"en": {
			"label": "Marriage Proof",
			"description": "Data that proves a Marriage",
			"example": ""
		},
		"es": {
			"label": "Prueba de Matrimonio",
			"description": "Prueba de Matrimonio",
			"example": ""
		}
	},
	"MarriageCertificate/MarriageDate": {
		"type": "xs:Date",
		"en": {
			"label": "Marriage Date",
			"description": "Date of the Marriage",
			"example": "20/12/2020"
		},
		"es": {
			"label": "Fecha de Matrimonio",
			"description": "Fecha en que tuvo lugar el Matrimonio",
			"example": "20/12/2020"
		}
	},
	"MarriageCertificate/PlaceOfMarriage": {
		"type": "xs:string",
		"en": {
			"label": "Marriage Place",
			"description": "Place of the marriage",
			"example": ""
		},
		"es": {
			"label": "Lugar de Matrimonio",
			"description": "Lugar en que tuvo lugar el Matrimonio",
			"example": ""
		}
	},
	"MarriageCertificate/PlaceOfMarriage/geographicIdentifier": {
		"type": "xs:string",
		"en": {
			"label": "Geographical code",
			"description": "Code of the geographical location",
			"example": ""
		},
		"es": {
			"label": "Código geográfico",
			"description": "Código geográfico del lugar el nacimiento",
			"example": ""
		}
	},
	"MarriageCertificate/PlaceOfMarriage/geographicName": {
		"type": "xs:string",
		"en": {
			"label": "Location name",
			"description": "Name of the geographical location",
			"example": "Dublin, Ireland"
		},
		"es": {
			"label": "Denominación",
			"description": "Denominación del lugar",
			"example": "San Pedro del Pinatar, Murcia, España"
		}
	},
	"MarriageCertificate/Spouse": {
		"type": "xs:string",
		"en": {
			"label": "Spouse",
			"description": "Spouse Data",
			"example": ""
		},
		"es": {
			"label": "Cónyuge",
			"description": "Datos identificativos de un Cónyuge",
			"example": ""
		}
	},
	"MarriageCertificate/Spouse/GivenName": {
		"type": "xs:string",
		"en": {
			"label": "Forename",
			"description": "Given name at birth",
			"example": "Mary"
		},
		"es": {
			"label": "Nombre",
			"description": "Nombre del cónyuge",
			"example": "María"
		}
	},
	"MarriageCertificate/Spouse/FamilyName": {
		"type": "xs:string",
		"en": {
			"label": "Surname",
			"description": "Family name at birth",
			"example": "Ford"
		},
		"es": {
			"label": "Apellidos",
			"description": "Apellidos del cónyuge",
			"example": "Garcia Pérez"
		}
	},
	"MarriageCertificate/Spouse/Gender": {
		"ref" : "Person/Gender",
		"en": {
			"description": "Gender at marriage",
		},
		"es": {
			"description": "Sexo al casarse",
		}
	},
	"MarriageCertificate/Spouse/BirthDate": {
		"ref": "Person/BirthDate",
		"en": {
			"description": "Spouse's date of the birth",
		},
		"es": {
			"description": "Fecha de nacimiento del cónyuge",
		}
	},
	"MarriageCertificate/Spouse/Identifier": {
		"type": "xs:string",
		"en": {
			"label": "Identitiy card",
			"description": "Identitiy card",
			"example": ""
		},
		"es": {
			"label": "Documento de Identidad",
			"description": "Documento de Identida del cónyuge",
			"example": ""
		}
	},
	"MarriageCertificate/Spouse/Identifier/IdType": {
		"ref": "Person/Identifier/IdType"
	},
	"MarriageCertificate/Spouse/Identifier/Number": {
		"ref": "Person/Identifier/Number"
	},
	"Person/GivenName": {
		"type": "xs:string",
		"en": {
			"label": "Given name",
			"description": "Current given name",
			"example": "Eve"
		},
		"es": {
			"label": "Nombre",
			"description": "Nombre actual de la persona",
			"example": "Alicia"
		}
	},
	"Person/FamilyName": {
		"type": "xs:string",
		"en": {
			"label": "Family name",
			"description": "Current family name",
			"example": "Ford"
		},
		"es": {
			"label": "Apellidos",
			"description": "Apellidos actuales de la persona",
			"example": "de Arco Martínez"
		}
	},
	"Person/BirthDate" : {
		"type": "xs:dae",
		"en": {
			"label": "Birth Date",
			"description": "Person's date of the birth",
			"example": "20/12/1989"
		},
		"es": {
			"label": "Fecha de Nacimiento",
			"description": "Fecha de nacimiento de la persona",
			"example": "20/12/1989"
		}
	},
	"GenderCodeList" : {
		"enum" : ["Gender/Female","Gender/Male","Gender/Other"],
		"en": {
			"label": "Gender",
			"description": "Gender of the person",
			"example": "Female"
		},
		"es": {
			"label": "Sexo",
			"description": "Sexo de la persona",
			"example": "Femenino"
		}
	},
	"Person/Gender2": {
		"type": "enumType@GenderCodeList"
	},	
	"Person/Gender": {
		"type": "enumType",
		"enum" : ["Gender/Female","Gender/Male","Gender/Other"],
		"en": {
			"label": "Gender",
			"description": "Gender of the person",
			"example": "Female"
		},
		"es": {
			"label": "Sexo",
			"description": "Sexo de la persona",
			"example": "Femenino"
		}
	},	
	"Gender/Other": {
		"type": "enumElement",
		"en": {
			"label": "Other",
			"description": "Other gender differnt from male or female",
			"example": ""
		},
		"es": {
			"label": "Otro",
			"description": "Sexo distinto del masculino o el femenino",
			"example": ""
		}
	},	
	"Gender/Female": {
		"type": "enumElement",
		"en": {
			"label": "Female",
			"description": "Female gender",
			"example": ""
		},
		"es": {
			"label": "Mujer",
			"description": "Sexo femenino",
			"example": ""
		}
	},	
	"Gender/Male": {
		"type": "enumElement",
		"en": {
			"label": "Male",
			"description": "Male gender",
			"example": ""
		},
		"es": {
			"label": "Masculino",
			"description": "Sexo masculino",
			"example": ""
		}
	},	
	"Person/Identifier": {
		"type": "xs:string",
		"en": {
			"label": "Identifier",
			"description": "Person's identitiy card details",
			"example": "Passport"
		},
		"es": {
			"label": "Identificación",
			"description": "Identificación de la Persona",
			"example": "DNI"
		}
	},	
	"Person/Identifier/IdType": {
		"type": "xs:string",
		"en": {
			"label": "Type",
			"description": "Type of Identitiy card",
			"example": "Passport"
		},
		"es": {
			"label": "Tipo",
			"description": "Tipo de Documento de Identidad",
			"example": "DNI"
		}
	},
	"Person/Identifier/Number": {
		"type": "xs:string",
		"en": {
			"label": "Number",
			"description": "Identitiy number",
			"example": "Z-22930472W"
		},
		"es": {
			"label": "Número",
			"description": "Número de identidad",
			"example": "22930472W"
		}
	},
	"ES/nuts2": {
		"en": {
			"label": "Autonomous Communities and Cities",
			"description": "",
			"example": ""
		},
		"es": {
			"label": "Comunidades y Ciudades Autónomas",
			"description": "",
			"example": ""
		}
	},
	"SI/nuts3": {
		"en": {
			"label": "Slovenian Region",
			"description": "",
			"example": ""
		},
		"es": {
			"label": "Región de Slovenia",
			"description": "",
			"example": ""
		}
	},	
	"DL/nuts1": {
		"en": {
			"label": "Digital Communities",
			"description": "",
			"example": ""
		},
		"es": {
			"label": "Comunidades Digitales",
			"description": "",
			"example": ""
		}
	},
	"CivilRegistry/SearchEntry": {
		"type" : "title",
		"en": {
			"label": "Search by entry",
			"description": "Search by entry of the Civil Registry",
			"example": ""
		},
		"es": {
			"label": "Buscar por Entrada de Registro",
			"description": "Búsqueda por entrada del Registro Civil",
			"example": ""
		}
	},
	"CivilRegistry/Book": {
		"type": "xs:date",
		"en": {
			"label": "Book Year",
			"description": "Book of the Civil Registry",
			"example": "23xZ",
			"optional": false
		},
		"es": {
			"label": "Libro",
			"description": "Libro del Registro Civil",
			"example": "23xZ",
			"optional": false
		}
	},
	"CivilRegistry/Volume": {
		"type": "xs:string",
		"en": {
			"label": "Volume",
			"description": "Volume of the Civil Registry",
			"example": "II",
			"optional": false
		},
		"es": {
			"label": "Volumen",
			"description": "Volumen del Registro Civil",
			"example": "II",
			"optional": false
		}
	},
	"CivilRegistry/Page": {
		"type": "xs:string",
		"en": {
			"label": "Page",
			"description": "Page of the Civil Registry",
			"example": "34",
			"optional": false
		},
		"es": {
			"label": "Página",
			"description": "Página del Registro Civil",
			"example": "34",
			"optional": false
		}
	},
	"CivilRegistry/SearchFiliation": {
		"type" : "title",
		"en": {
			"label": "Search by supplementary person's data",
			"description": "Search by supplementary person's data in Spain",
			"example": ""
		},
		"es": {
			"label": "Buscar por Datos complementarios",
			"description": "Datos complementarios de la persona",
			"example": ""
		}
	},
	"Person/FirstFamilyName": {
		"type": "xs:string",
		"en": {
			"label": "First FamilyName",
			"description": "First Family Name of the Person",
			"example": "García",
			"optional": false
		},
		"es": {
			"label": "Primer Apellido",
			"description": "Primer Apellido de la Persona",
			"example": "García",
			"optional": false
		}
	},
	"Person/SecondFamilyName": {
		"type": "xs:string",
		"en": {
			"label": "Second FamilyName",
			"description": "Second Family Name of the Person",
			"example": "Muñoz",
			"optional": true
		},
		"es": {
			"label": "Segundo Apellido",
			"description": "Segundo Apellido de la Persona",
			"example": "Muñoz",
			"optional": true
		}
	},
	"Person/hasnotSecondFamilyName": {
		"type": "xs:boolean",
		"en": {
			"label": "Second FamilyName Absence",
			"description": "Checked if the Person has not Second Family Name",
			"example": "",
			"optional": true
		},
		"es": {
			"label": "Ausencia de Segundo Apellido",
			"description": "Activar si la persona carece de segundo apellido ",
			"example": "",
			"optional": true
		}
	}
};

var poJSON = {
	"iso6523-actorid-upis::9991:LU000000025" : {
		"prefLabel" : "CENTRE DES TECHNOLOGIES DE L'INFORMATION DE L'ETAT",
		"atuCode" : "LU",
		"lang" : "fr"
	},
	"iso6523-actorid-upis::9991:SI990000105" : {
		"prefLabel" : "Minister za notranje zadeve",
		"atuCode" : "SI",
		"lang" : "si"
	},
	"iso6523-actorid-upis::9921:E00003901" : {
		"prefLabel" : "Registro Civil, Ministerio de Justicia",
		"atuCode" : "ES",
		"lang" : "es"
	},
	"iso6523-actorid-upis::9991:DL000000002" : {
		"prefLabel" : "Binary Central Agency",
		"atuCode" : "DL2",
		"lang" : "en"
	},
	"iso6523-actorid-upis::9991:DL000000001" : {
		"prefLabel" : "Quantum Central Agency",
		"atuCode" : "DL1",
		"lang" : "es"
	},
	"iso6523-actorid-upis::9991:BE000000025" : {
		"prefLabel" : "Ministère de la Justice",
		"atuCode" : "BE",
		"lang" : "fr"
	},
	"iso6523-actorid-upis::9991:BE000000001" : {
		"prefLabel" : "Ministère de la Justice de la Région Bruxelles",
		"atuCode" : "BE1",
		"lang" : "fr"
	},
	"iso6523-actorid-upis::9991:BE000000002" : {
		"prefLabel" : "Ministère de la Justice de la Région Flanders",
		"atuCode" : "BE2",
		"lang" : "fr"
	}	
}

var atusJSON = {
 	"LU" : { "LU" : "LUXEMBOURG" },
 	"SI" : { 
 		"SI" : "SLOVENIJA",
 		"SI031" : "Mura",
 		"SI034" : "Savinja"
 	},
 	"DL" : {
 		"DL" : "DIGITALAND",
 		"DL1" : "Region of Quantum", 
		"DL2" : "Region of Binary"   		
 	},
 	"BE" : {
 		 "BE" : "BELGIQUE-BELGIË" ,
 		 "BE1" : "RÉGION DE BRUXELLES-CAPITALE/BRUSSELS HOOFDSTEDELIJK GEWEST" , 
	 	 "BE2" : "VLAAMS GEWEST" , 
	 	 "BE3" : "RÉGION WALLONNE" 
 	},
 	"ES" : {
 		"ES" : "ESPAÑA" ,
		"ES11" : "Galicia" ,
		"ES12" : "Principado de Asturias" ,
		"ES13" : "Cantabria" ,
		"ES21" : "País Vasco" ,
		"ES22" : "Comunidad Foral de Navarra" ,	
 		"ES23" : "La Rioja" , 
  		"ES24" : "Aragón" ,		
  		"ES30" : "Comunidad de Madrid" ,
  		"ES41" : "Castilla y León" ,
  		"ES42" : "Castilla-La Mancha" ,
  		"ES43" : "Extremadura" ,
  		"ES51" : "Cataluña" ,
  		"ES52" : "Comunidad Valenciana" ,
  		"ES53" : "Illes Balears" ,
  		"ES61" : "Andalucía" ,
  		"ES62" : "Región de Murcia" ,
  		"ES63" : "Ciudad Autónoma de Ceuta" ,
  		"ES64" : "Ciudad Autónoma de Melilla" ,
  		"ES70" : "Canarias" 

 	}
 };
 /**
  * /idk/{canonicalEvidenceTypeId}
  * 	<countryCode> : //array of objects
  			//object of the array
  *			atuLevel : //nuts0-3, LAU, EDU
  *			provisions : //array of objects, only with Intermediation Pattern
  *				//object of the array
  *				atuPath : //path of the atu composed by the atuLevel and its antecesors
  *				provision : //uri of the provision
  * Example:
  		{
  * 	  "country" : "ES",
  * 	 	"atuLevel" : "nuts0",
  * 	 	"provisions"  : [
  				{
  					"atuPath" : "ES", 
  					"provision" : "urn:eu-de4a:provision::9920:ESS2833002E:BirthCertificate",
  					"dataOwnerId" : "",
  					"dataOwnerPrefLabel : "",
  					"redirectUrl" : "",
  				}
  			]
  * 	 },
    *			params : //array of objects, only with Intermediation Pattern
  *				//object of the array
  *				title : //termURI to show as header of the parameter set
  *				paramset : //array of termURIs that correspond to each parameter
  
  * 	 {
  			"country" : "DL",
  * 	 	"atuLevel" : "nuts1",
  * 	 	"provisions"  : [{"atuPath" : "DL/DL1", "provision" : "urn:eu-de4a:provision::9991:DL000000001:BirthCertificate"}]
  * 	 }  
  */
    function availableSourcesApi (canonicalEvType) {
    	var r = ialJSON[canonicalEvType];
		for (var i=0; i<r.length; i++) {
			for (var j=0; j<r[i].provisions.length; j++) {
				r[i].provisions[j].dataOwnerPrefLabel = poJSON[r[i].provisions[j].dataOwnerId].prefLabel;
				r[i].provisions[j].atuCode = poJSON[r[i].provisions[j].dataOwnerId].atuCode;
				r[i].provisions[j].atuLatinName = atusJSON[r[i].countryCode][r[i].provisions[j].atuCode];
				r[i].provisions[j].provisionType = r[i].provisions[j].hasOwnProperty("redirectURL")?"usip":"ip";
			}
		}
		return r;
	}
/**
  * /idk/{canonicalEvidenceTypeId}/{countryCode}
  */	
	function countryAvailableSourcesApi (canonicalEvType, countryCode) {
    	var c = ialJSON[canonicalEvType];
    	var r = new Array();
		for (var i=0; i<c.length; i++) {
			if (c[i].countryCode == countryCode) {
				r[0] = c[i];
				for (var j=0; j<c[i].provisions.length; j++) {
					r[0].provisions[j].dataOwnerPrefLabel = poJSON[c[i].provisions[j].dataOwnerId].prefLabel;
					r[0].provisions[j].atuCode = poJSON[c[i].provisions[j].dataOwnerId].atuCode;
					r[0].provisions[j].atuLatinName = atusJSON[c[i].countryCode][c[i].provisions[j].atuCode];
					r[0].provisions[j].provisionType = c[i].provisions[j].hasOwnProperty("redirectURL")?"usip":"ip";
				}
			}
		}
		return r;
	}
	/*
	 * /idk/?mor={nodePath}&lang={lang}
	 */
	function morTermApi (nodePath, lang) {
		console.log("moreTermApi: "+nodePath)
		if (! morJSON.hasOwnProperty(nodePath) ) {
			var atuCode = nodePath.substr(nodePath.lastIndexOf("/")+1);
			var m = '{"atuCode" : "'+atuCode+'", "atuLatinName" : "'+atusJSON[atuCode.substr(0,2)][atuCode]
				+'", "atuPathLatinName" : "'+getAtuLatinNamePath(atuCode)+'"}';
			return JSON.parse(m);
		}
		var m = morJSON[nodePath];
		var type = m.type;
		var enumArray = m.enum;
		var r = null;
		if (m.hasOwnProperty("ref")) {
			var oldstr = m.ref.split(":")[0];
			var newstr = m.ref.split(":")[1];
			r = morTermApi (m.ref, lang);
			if (m.hasOwnProperty(lang)) {
				m = m[lang];
				if (!m.hasOwnProperty("description")) 
					m.description = r.hasOwnProperty("description")?r.description:"";
				if (!m.hasOwnProperty("label")) 
					m.label = r.hasOwnProperty("label")?r.label:"";
				if (!m.hasOwnProperty("example")) 
					m.example = r.hasOwnProperty("example")?r.example:"";
				if ( typeof typeArray === 'undefined' ) {
					m.type = r.hasOwnProperty("type")?r.type:"title";
				}
				if ( m.type == "enumType") {
					if (typeof enumArray === 'undefined' ) {
						m.enum = r.hasOwnProperty("enum")?r.enum:"";
					} else
						m.enum = enumArray;
				}
				return m;
			} else 
				return r;
		} else {
			r = m[lang];
			r.type = m.type;
			r.enum = m.enum;
			return r;
		}
	}
	
	function getAtuLatinNamePath(atuCode) {
    	var countryCode = atuCode.substr(0,2);
    	var prefix = "";
    	var atus = atusJSON[countryCode];
    	for (var i=2; i<=atuCode.length; i++) {
    		prefix =  atusJSON[countryCode][atuCode.substr(0,i)] + (i>2?", ":"") +prefix;
    	}
    	console.log("getLatinNamePath("+atuCode+")="+prefix);
    	return prefix;
    }
    /*
	function publicOrgApi(agentId) {
		return poJSON[agentId]
	}
	*/
	function atuCodesPerLevelPathApi(levelPath) { //p.e BE/nuts2
		var countryCode = levelPath.substr(0,2);
		var atuCodes = new Array();
		var level = parseInt(levelPath.substr(levelPath.length-1,1)) + 2;
		var atus = atusJSON[countryCode];
		for (var atu in atus) {
			if (atu.length == level) atuCodes.push(atu)
		}
		return atuCodes
	}

    