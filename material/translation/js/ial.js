/**
 * {boolean} To switch on/off debugging traces in the web browser console
 */
 var debug=true
 /**
 * {string} Server base pathof the IAL api
 */
const serverIALapi = "https://de4a.simplegob.com/ial/api/provision/"
 /**
  * {string} Preffix for all canonical evidence URNs
  */
 const canEvidUrn = "urn:de4a-eu:CanonicalEvidenceType::"
 /**
  * {string} IAL provisions retrieved after executing retrieveIALProvisions()
  */
let ialProvisions = null

/**
 * This function calls the IAL API with the given parameters and returns the HTTP code of the response.
 * The response text is stored in the variable "ialProvisions" or null if an error is returned
 * @value {array} canEvidTokenOptions : a mandatory array with the options of a multiple SELECT element, whose values are canonical evidence type token (e.g. BirthEvidence) and the selected ones are included in the request
 * @value {string} atuCode : an optional string with the code of an administrative territorial unit to request, usually a NUTS-0 code corresponding to the issuing country
 * @value {boolean} asXml :  an optional boolean. "True" forces that the "ialProvisions" text is in XML format; otherwise, it is in JSON format   
 * @return {int} : HTTP status code of the return; "200" is representing a suscessful call. "404" when the search has not found results.
 */
function ialAPIrequestOptions(canEvidTokenOptions,atuCode,asXml) {
	var tokenList = ""
	var cont = 0
	for (var i=0; i<canEvidTokenOptions.length;i++) {
		if (canEvidTokenOptions[i].selected) {
			tokenList += (cont>0?",":"")+canEvidTokenOptions[i].value
			cont++
		}
	}
	if (debug) console.log("[DEBUG]<ialAPIrequestOptions> " + tokenList + "("+cont+"/"+canEvidTokenOptions.length+")")
	return ialAPIrequestList (tokenList, atuCode, asXml)
}

/**
 * This function calls the IAL API with the given parameters and returns the HTTP code of the response.
 * The response text is stored in the variable "ialProvisions" or null if an error is returned
 * @value {list} canEvidTokenList : a mandatory comma-separated list with the canonical evidence type tokens to request (e.g. BirthEvidence)
 * @value {string} atuCode : an optional string with the code of an administrative territorial unit to request, usually a NUTS-0 code corresponding to the issuing country
 * @value {boolean} asXml :  an optional boolean. "True" forces that the "ialProvisions" text is in XML format; otherwise, it is in JSON format   
 * @return {int} : HTTP status code of the return; "200" is representing a suscessful call. "404" when the search has not found results.
 */
function ialAPIrequestList(canEvidTokenList,atuCode,asXml) {
	var urlApi = serverIALapi 
	if (canEvidTokenList.indexOf(",")>0) {
		var canEvidTokenArray = canEvidTokenList.split(",")
		if (debug) console.log("[DEBUG]<ialAPIrequestList> " + canEvidTokenArray.length)
		var cont=0
		for (var i=0; i<canEvidTokenArray.length;i++) {
			urlApi += (cont>0?",":"")+canEvidUrn+canEvidTokenArray[i]
			cont++
		}
	} else {
		urlApi += canEvidUrn+canEvidTokenList
	}
	if (atuCode != "") {
		urlApi += "/" + atuCode
	}
	return retrieveIALProvisions (urlApi, (asXml==true?true:false))
}

/**
 * This function calls the IAL API with the given parameters and returns the HTTP code of the response.
 * The response text is stored in the variable "ialProvisions" or null if an error is returned
 * @value {string} urlApi : a mandatory string with the final URL of the request
 * @value {boolean} asXml :  an optional boolean. "True" forces that the "ialProvisions" text is in XML format; otherwise, it is in JSON format   
 * @return {int} : HTTP status code of the return; "200" is representing a suscessful call. "404" when the search has not found results.
 */
function retrieveIALProvisions (urlApi, asXml) {
	const xmlhttp = new XMLHttpRequest()
	xmlhttp.onreadystatechange = function(){
    	if (debug) console.log("[DEBUG]<retrieveIALProvisions> readystate change: " + this.readyState + " , " + this.status)
    	if(this.readyState == 4) {
			/*
			 * For now, when the request parameters are not found in the IAL repository, the API returns 200 and the response contiains an error message in the requested format (XML or JSON)
			 */
			 if ( this.status == 200){
				if (debug) console.log("[DEBUG]<retrieveIALProvisions> Response: ", this.responseType +"\n "+this.response)
				if (this.response.indexOf("ERROR")>0) {
					console.log("[ERROR]<retrieveIALProvisions> ERROR with HTTP/200: ", this.status +"\n"+this.response)
					return (this.responseText.indexOf("no-match")>0?404:418)
				} else
					ialProvisions = this.responseText 
			}
			else {
				console.log("[ERROR]<retrieveIALProvisions> ERROR: HTTP/", this.status +"\n"+this.response)
				ialProvisions = null
			}
			return this.status
		}
	}
	xmlhttp.open("GET", urlApi, false)
	if (debug) console.log("[DEBUG]<retrieveIALProvisions> Required "+(asXml?"XML":"JSON")+" response")
	if (! asXml) {
		xmlhttp.setRequestHeader('Accept', 'application/json; charset=utf-8')
	} else
		xmlhttp.setRequestHeader('Accept','text/xml; charset=utf-8');
	console.log("[TRACE]<retrieveIALProvisions> GET "+urlApi)
	xmlhttp.send()
}