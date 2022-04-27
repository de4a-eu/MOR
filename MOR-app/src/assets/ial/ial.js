const urlPathIAL = ".../provisions/"
const mockedUrlPathIAL = "https://raw.githubusercontent.com/de4a-wp3/MOR/main/MOR-app/src/assets/ial/"
const ialXsl = "https://raw.githubusercontent.com/de4a-wp3/MOR/main/MOR-app/src/assets/ial/ial-json.xsl"
let xsl = null
const mocked = true
const debug = true
/**
 * @return mocked IAL provisions corresponding to the given parameters, in XML format according to IAL.xsd
 * @param {String} canonicalObjectTypeUrnList list of comma separated URNs of canonical evidence types or canonical event catalogue of the provisions
 * @param {String} atuCode code of the administrative territorial unit (NUT0-3 or LAU) of the provisions
 */
function getMockedIal(canonicalObjectTypeUrnList, atuCode) {
if (canonicalObjectTypeUrnList=="urn:de4a-eu:CanonicalEvidenceType:BirthEvidence:1.0,urn:de4a-eu:CanonicalEvidenceType:MarriageEvidence:1.0" && atuCode == "ES")
	return "ial-es-birth1-marriage1.xml"
if (canonicalObjectTypeUrnList=="urn:de4a-eu:CanonicalEvidenceType:BirthEvidence:1.0" && atuCode == "ES")
	return "ial-es-birth2.xml"
if (canonicalObjectTypeUrnList=="urn:de4a-eu:CanonicalEvidenceType:MarriageEvidence:1.0" && atuCode == "ES")
	return  "ial-es-marriage1.xml"
if (canonicalObjectTypeUrnList=="urn:de4a-eu:CanonicalEvidenceType:BirthEvidence:1.0,urn:de4a-eu:CanonicalEvidenceType:MarriageEvidence:1.0" && atuCode == "SI")
	return  "ial-si-birth1-marriage1.xml"
if (canonicalObjectTypeUrnList=="urn:de4a-eu:CanonicalEvidenceType:BirthEvidence:1.0" && atuCode == "SI")
	return  "ial-si-birth.xml"
if (canonicalObjectTypeUrnList=="urn:de4a-eu:CanonicalEvidenceType:MarriageEvidence:1.0" && atuCode == "SI")
	return  "ial-si-marriage1.xml"
if (canonicalObjectTypeUrnList=="urn:de4a-eu:CanonicalEvidenceType:MarriageEvidence:1.0")
	return  "ial-ie-marriage0.xml"
if (canonicalObjectTypeUrnList=="urn:de4a-eu:CanonicalEvidenceType:BirthEvidence:1.0")
	return  "ial-ie-birth0.xml"
}
/**
 * @return IAL provisions corresponding to the given parameters, in XML format according to IAL.xsd
 * @param {Array} canonicalObjectTypeUrnArray array with the URNs of canonical evidence types or canonical event catalogue of the provisions
 * @param {String} atuCode code of the administrative territorial unit (NUT0-3 or LAU) of the provisions
 */
function getIalXmlProvisions (canonicalObjectTypeUrnArray, atuCode) {
	function getUrl() {
		let list = canonicalObjectTypeUrnArray.join()
		if (mocked) {
			return mockedUrlPathIAL + getMockedIal(list, (atuCode=="ES" ? "ES" : (atuCode=="SI" ? "SI" : "*")))
		} else
		//IAL path: {serverDomain}/provision/{canonicalObjectTypeIds}?atuCode={atuCode}
			return urlPathIAL + list + "/atuCode=" + atuCode
	}
	let url = getUrl()
	let xml = null
	console.log("[TRACE]<getIalProvisions> GET "+url)
	let xmlhttp = new XMLHttpRequest()
	xmlhttp.onreadystatechange = function(){
    	if (debug) console.log("[DEBUG]<getIalProvisions> readystate change: " + this.readyState + " , " + this.status)
    	if(this.readyState == 4 && this.status == 200){
			if (debug) console.log("[DEBUG]<getIalProvisions> response: ", this.responseText)
			/*if (1==0 && typeof XSLTProcessor == "undefined") {
				xml = new ActiveXObject("Msxml2.DOMDocument.3.0");
				xml.async = false
				xml.load(this.responseText)
			} else*/
				xml = (new DOMParser()).parseFromString(this.responseText,"text/xml");;
			//xml = this.responseText
		}
	}
	xmlhttp.open("GET", url, false)
	xmlhttp.send()
	return xml
}
/**
 * @return JSON Object for the IAL provisions in XML format provided as parameter
 * @param {XMLDoc} xmlProvisions IAL provisions in XML format according to IAL.xsd 
 */
function getIalJsonProvisions (xmlProvisions) {
	let jsonStr
	//if xsl has not been obtained
	if (debug) console.log("[DEBUG]<getIalJsonProvisions> code for IE: "+(typeof XSLTProcessor == "undefined"))
	if (xsl == null) {
		let xmlhttp = new XMLHttpRequest()
		xmlhttp.onreadystatechange = function(){
	    	if (debug) console.log("[DEBUG]<getIalJsonProvisions> readystate change: " + this.readyState + " , " + this.status)
	    	if(this.readyState == 4 && this.status == 200){
				if (debug) console.log("[DEBUG]<getIalJsonProvisions> response: ", this.responseText)
				// code for IE
				if (typeof XSLTProcessor == "undefined") {
					var xslDoc = (new ActiveXObject("MSXML2.FreeThreadedDOMDocument.3.0"))
					xslDoc.async = false
					xslDoc.loadXML(this.responseText)
					if (debug) console.log("[DEBUG]<getIalJsonProvisions> xslDoc.parseError: "+xslDoc.parseError.errorCode +","+ xslDoc.parseError.reason)
					xsl = new ActiveXObject("Msxml2.XSLTemplate.3.0")
					xsl.stylesheet = xslDoc
				} else {
					xsl = (new DOMParser()).parseFromString(this.responseText,"text/xml")
				}  
				if (debug) console.log("[DEBUG]<getIalJsonProvisions> type of xsl: " + (typeof xsl))
			}
		}
		//get the XLS template to transform the XML format to JSON format 
		xmlhttp.open("GET", ialXsl, false)
		try {xmlhttp.responseType = "msxml-document"} catch(err) {}
		xmlhttp.send()
	}
	// code for IE
	if (typeof XSLTProcessor == "undefined") {
		var objXSLTProc = xsl.createProcessor()
		objXSLTProc.input = xmlProvisions
		objXSLTProc.transform()
		jsonStr = objXSLTProc.output.replace((/  |\r\n|\n|\r/gm),"") //if the outcome has tab and new line characters
	}
	// code for Chrome, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument) {
	  	let xsltProcessor = new XSLTProcessor()
		xsltProcessor.importStylesheet(xsl)
		jsonStr = xsltProcessor.transformToFragment(xmlProvisions, document).textContent
	}
	let json = JSON.parse(jsonStr)
	if (debug) console.log("[DEBUG]<getIalJsonProvisions> response: JSON Atulevel"+ json["urn:de4a-eu:CanonicalEvidenceType:MarriageEvidence:1.0"]["ES"].Provision.AtuLevel)
	if (debug) console.log("[DEBUG]<getIalJsonProvisions> response: ", jsonStr)
	return json
}