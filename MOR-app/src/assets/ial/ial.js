const urlPathIAL = ".../provisions/"
const mockedUrlPathIAL = "https://raw.githubusercontent.com/de4a-wp3/MOR/main/MOR-app/src/assets/ial/"
const ialXsl = "https://raw.githubusercontent.com/de4a-wp3/MOR/main/MOR-app/src/assets/ial/ial-json.xsl"
const mocked = true
const debug = true
/**
 * "ial" two-dimensional array: 
 *	- @dimension1: {canonicalObjectTypeIds}
 *			List of URNs of the canonical object type Ids (evidence type or event catalogue) separated by comma
 *  - @dimension2: {atuCode}
 */
function getMockedIal(canonicalEvidenceTypeIds, atuCode) {
if (canonicalEvidenceTypeIds=="urn:de4a-eu:CanonicalEvidenceType:BirthEvidence:1.0,urn:de4a-eu:CanonicalEvidenceType:MarriageEvidence:1.0" && atuCode == "ES")
	return "ial-es-birth1-marriage1.xml"
if (canonicalEvidenceTypeIds=="urn:de4a-eu:CanonicalEvidenceType:BirthEvidence:1.0" && atuCode == "ES")
	return "ial-es-birth2.xml"
if (canonicalEvidenceTypeIds=="urn:de4a-eu:CanonicalEvidenceType:MarriageEvidence:1.0" && atuCode == "ES")
	return  "ial-es-marriage1.xml"
if (canonicalEvidenceTypeIds=="urn:de4a-eu:CanonicalEvidenceType:BirthEvidence:1.0,urn:de4a-eu:CanonicalEvidenceType:MarriageEvidence:1.0" && atuCode == "SI")
	return  "ial-si-birth1-marriage1.xml"
if (canonicalEvidenceTypeIds=="urn:de4a-eu:CanonicalEvidenceType:BirthEvidence:1.0" && atuCode == "SI")
	return  "ial-si-birth.xml"
if (canonicalEvidenceTypeIds=="urn:de4a-eu:CanonicalEvidenceType:MarriageEvidence:1.0" && atuCode == "SI")
	return  "ial-si-marriage1.xml"
if (canonicalEvidenceTypeIds=="urn:de4a-eu:CanonicalEvidenceType:MarriageEvidence:1.0")
	return  "ial-ie-marriage0.xml"
if (canonicalEvidenceTypeIds=="urn:de4a-eu:CanonicalEvidenceType:BirthEvidence:1.0")
	return  "ial-ie-birth0.xml"
}
/**
 * 
 */
function getIalXmlProvisions (canonicalEvidenceTypeArray, atuCode) {
	function getUrl() {
		var list = canonicalEvidenceTypeArray.join()
		if (mocked) {
			return mockedUrlPathIAL + getMockedIal(list, (atuCode=="ES" ? "ES" : (atuCode=="SI" ? "SI" : "*")))
		} else
		//IAL path: {serverDomain}/provision/{canonicalObjectTypeIds}?atuCode={atuCode}
			return urlPathIAL + list + "/atuCode=" + atuCode
	}
	var url = getUrl()
	var xml = ""
	console.log("[TRACE]<getIalProvisions> GET "+url)
	var xmlhttp = new XMLHttpRequest()
	xmlhttp.onreadystatechange = function(){
    	if (debug) console.log("[DEBUG]<getIalProvisions> readystate change: " + this.readyState + " , " + this.status)
    	if(this.readyState == 4 && this.status == 200){
			if (debug) console.log("[DEBUG]<getIalProvisions> response: ", this.responseText)
			xml = (new DOMParser()).parseFromString(this.responseText,"text/xml");;
			//xml = this.responseText
		}
	}
	xmlhttp.open("GET", url, false)
	xmlhttp.send()
	return xml
}
/**
 * @return JSON Object for the IAL provisions in XML format
 * @param {XMLDoc} IAL provisions in XML format according to IAL.xsd 
 */
function getIalJsonProvisions (xmlProvisions) {
	var xmlhttp = new XMLHttpRequest()
	var xsl = ""
	xmlhttp.onreadystatechange = function(){
    	if (debug) console.log("[DEBUG]<getIalJsonProvisions> readystate change: " + this.readyState + " , " + this.status)
    	if(this.readyState == 4 && this.status == 200){
			if (debug) console.log("[DEBUG]<getIalJsonProvisions> response: ", this.responseText)
			xsl = (new DOMParser()).parseFromString(this.responseText,"text/xml");;
			//xml = this.responseText
		}
	}
	//get the XLS template to transform the XML format to JSON format 
	xmlhttp.open("GET", ialXsl, false)
	try {xmlhttp.responseType = "msxml-document"} catch(err) {}
	xmlhttp.send()
	// code for IE
	if (window.ActiveXObject || xmlhttp.responseType == "msxml-document") {
	  return xml.transformNode(xsl);
	}
	// code for Chrome, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument) {
	  	var xsltProcessor = new XSLTProcessor()
		xsltProcessor.importStylesheet(xsl)
		var out = xsltProcessor.transformToFragment(xmlProvisions, document)
		if (debug) console.log("[DEBUG]<getIalJsonProvisions> response: ", out.textContent)
		return JSON.parse(out.textContent)
	}
}