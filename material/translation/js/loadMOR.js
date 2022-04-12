/**
 * To switch on/off debugging traces in the web browser console
 */
const debug = true
/**
 * Server path to get the json as response of the MOR api
 * In the MVP of MOR, the API call returns all the MOR terms with their definition in one given language 
 */
const serverMORapi = "https://raw.githubusercontent.com/de4a-wp3/MOR/main/MOR-app/src/assets/i18n/"
/**
 * JSON object with all the MOR terms with descriptions in some specific language
 */
var morJSON
/**
 * lang(s) of the morJSON 
 */
var langMOR
/** 
 * Map with the MOR Term URIs of the morJSON
 *	@key {string} termPath : URI of a MOR term
 *  @value {string} termType : URI of the type of the MOR term or the URI of an ancestor MOR term
 */
var exElements = new Map()

/**
 * According to the MVP implementation of the MOR api, this function gets the content of the {lang}.json file located at serverMORapi
 * @value {string} lang : name of the json file to get that corresponds to the language of the labels and descriptions of the MOR terms
 * @return {string} : content of the returned json
 */
function callMORMVPapi(lang) {
	var urlApi = serverMORapi+lang+".json"
	const xmlhttp = new XMLHttpRequest()
	xmlhttp.onreadystatechange = function(){
    	if (debug) console.log("[DEBUG]<callMORMVPapi> readystate change: " + this.readyState + " , " + this.status)
    	if(this.readyState == 4 && this.status == 200){
			if (debug) console.log("[DEBUG]<callMORMVPapi> New morJSON: ", this.responseText.length)
			morJSON = JSON.parse(this.responseText)
			return
		}
	}
	xmlhttp.open("GET", urlApi, false)
	console.log("[TRACE]<callMORMVPapi> GET "+urlApi)
	xmlhttp.send()
}
/**
 * @return {JSON object} with the properties that define a MOR term
 * @param {string} path: URI of the MOR term
 * @param (string) type: URI of a MOR term that is either the type of the term identified with "path" or an ancestor 
 */
function getTermDetail(path, type) {
	if (debug) console.log("[DEBUG]<getTermDetail> ", path, type, path.split("/").length)
	//"detail" is the JSON object corresponding of the property "path" o null if such a property is not part of the MOR Json
	var detail = (morJSON.hasOwnProperty(path)?morJSON[path]:null) 
	var parentDetail = null
	if (detail != null && detail.type != "" && morJSON.hasOwnProperty(detail.type)) {
		//found the "type" property in the JSON object "detail"
		parentDetail = morJSON[detail.type]
	} else if (type != "") {
		//there is an ancestor
		var x = ""
		var apath = path.split("/")
		var i = apath.length - 1
		while (parentDetail == null && i>=0) {
			//from the last section of "path" to the whole path, we look in the MOR Json 
			//for the concatenation of the ancestor path "type" and such a part of "path"
			x = apath[i] + (x!=""?"/":"") + x //part of "path"
			var parentPath = type+"/"+x //path of a possible supertype term
			if (morJSON.hasOwnProperty(parentPath)) {
				//supertype term found
				parentDetail = morJSON[parentPath]
				getTermDetail(parentPath, parentPath) //recursive call to fill any empty property of the object with the value of supertypes' properties
			}
			if (debug) console.log("[DEBUG]<getTermDetail> Looking parent path ",parentPath, " de ", path, (parentDetail==null))
			i--
		} 
	} 
	if (parentDetail != null && detail == null)
		//the JSON object is not identified by the "path" parameter but by the parentPath of a supertype term found with the ancestor
		detail = parentDetail
	else if (parentDetail != null) {
		//if there is an JSON object identified by "path" and also a corresponding supertype JSON object,
		//any empty property can be substituted by the corresponding the supertype's property
			if (detail.cardinality == "") {
				detail.cardinality = parentDetail.cardinality
			}
			if (detail[langMOR].label == "") {
				detail[langMOR].label = parentDetail[langMOR].label
			}
			if (detail[langMOR].description == "") {
				detail[langMOR].description = parentDetail[langMOR].description
			}
			if (detail[langMOR].example == "") {
				detail[langMOR].example = parentDetail[langMOR].example
			}
	}
	return detail
}
/**
 * morJSON content prior the inheritance. Only for testing purposes
 */
var preMorJSON = JSON.parse("{}")
/**
 * lang(s) of the morJSON 
 */
function fillInheritanceMORjson() {
	for (var uri in morJSON) {
		if (! uri.startsWith("GUI") && ! uri.match(/[\w-_]+Enum/) ) {
			preMorJSON[uri] = JSON.parse(JSON.stringify(morJSON[uri])) //Only for testing purposes with testInheritance.html
			//if (debug) console.log("[DEBUG]<fillInheritanceMORjson> preMorJSON[uri]: "+JSON.stringify(preMorJSON[uri]))
			var d = getTermDetail(uri, "")
			morJSON[uri] = d
			//if (debug) console.log("[DEBUG]<fillInheritanceMORjson> POST preMorJSON[uri]: "+JSON.stringify(preMorJSON[uri]))
		} //GUI and Enum terms have not inheritance 
	}
} 

function loadMOR(lang) {
	callMORMVPapi(lang)
	langMOR = lang
	fillInheritanceMORjson()
}
