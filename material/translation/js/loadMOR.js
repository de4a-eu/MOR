/**
 * To switch on/off debugging traces in the web browser console
 */
var debug = true
/**
 * Server path to get the json as response of the MOR api
 * In the MVP of MOR, the API call returns all the MOR terms with their definition in one given language 
 */
//const serverMORapi = "https://raw.githubusercontent.com/de4a-wp3/MOR/main/MOR-app/src/assets/i18n/" /* WP3 mocked URL */
const serverMORapi = "https://de4a.simplegob.com/ial/mor/"
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
/**
 * @param {string} lang 
 * This function implements the MVP MOR API call and load the response in the morJSON variable after applying the inheritance between MOR terms
 */
function loadMOR(lang) {
	callMORMVPapi(lang)
	langMOR = lang
	fillInheritanceMORjson()
}
/**
 * Function to print the label and description of elements in a canonical evidence structure, considering inheritance behaviour
 * @param {string} canonicalType //MOR term path (URI) of the canonical type in the MOR Json
 * @param {HTML DOM Object} containerElement //HTML DOM Object to insert the <div> elements to print the canonical Type XML structure
 * @param {sting} lang //lang of the MOR Json
 * @param {integer} level -optional, by default = 0- //level in the tree hierarquy of the structure
 * @param {MOR term path} canonicalSubTerm -optional- //MOR term path (URI) when canonicalType is a superterm in the inheritance 
 */
 var elements = new Array()
 function printCanonicalType (canonicalType, containerElement, lang, level, canonicalSubTerm) {
	const indent = (level === undefined  || level == null ? 0: level)
	if (debug) console.log("[DEBUG]<printCanonicalType> "+canonicalType+" level "+level +" sub "+canonicalSubTerm)
	if (canonicalType == null || canonicalType === undefined) {
		console.log("[ERROR]<printCanonicalType> not URI for "+canonicalType)
		return
	} 	
	if (indent == 0 && canonicalType.indexOf("/")>0) {
		console.log("[ERROR]<printCanonicalType> wrong URI for "+canonicalType)
		return
	} 
	if (containerElement == null || containerElement === undefined) {
		console.log("[ERROR]<printCanonicalType> not container element for  "+canonicalType)
		return
	} 	
	if (morJSON == null || morJSON === undefined) {
		console.log("[ERROR]<printCanonicalType> ("+canonicalType+") mor JSON not initiated" )
		return
	} 
	if (! morJSON.hasOwnProperty(canonicalType)) {
		console.log("[ERROR]<printCanonicalType> "+canonicalType+" not found in mor JSON" )
		return
	}	
	var d = morJSON[canonicalType]
	const parent = d.hasOwnProperty("type")?d.type:""
	
	if (debug) console.log("[DEBUG]<printCanonicalType> "+canonicalType+"\n"+JSON.stringify(d))
	if (! d.hasOwnProperty(lang)) {
		console.log("[ERROR]<printCanonicalType> ("+canonicalType+") Lang "+lang+" not found in mor JSON" )
		return
	}	
	if (debug) console.log("[DEBUG]<printCanonicalType> "+canonicalType+","+containerElement.id)
	if (level == 0) {
		container.innerHTML = ""
		elements = []
	}
	var div = document.createElement("div");
	div.classList.add("MORtitle")
	div.setAttribute("title", canonicalType+"_"+canonicalSubTerm)
	if (elements.includes((canonicalSubTerm==null||canonicalSubTerm===undefined)?canonicalType:canonicalSubTerm)) return
	elements.push((canonicalSubTerm==null||canonicalSubTerm===undefined)?canonicalType:canonicalSubTerm)
	if (debug) console.log("[DEBUG]<printCanonicalType> push elements "+canonicalType+"\n>>>"+elements)
	let desc = d[lang].hasOwnProperty("description")?d[lang].description:"";
	let label = d[lang].hasOwnProperty("label")?d[lang].label:"";
	let card = d.hasOwnProperty("cardinality")?d.cardinality:"";
	if (morJSON.hasOwnProperty(parent) && morJSON[parent].hasOwnProperty(lang)) {
		if (desc == "" && morJSON[parent][lang].hasOwnProperty("description")) desc = morJSON[parent][lang].description
		if (label == "" && morJSON[parent][lang].hasOwnProperty("label")) label = morJSON[parent][lang].label
		if (card == "" && morJSON[parent].hasOwnProperty("cardinality")) card = morJSON[parent].cardinality
	}
	var divdesc = document.createElement("div");
	divdesc.classList.add("MORdesc")
	divdesc.classList.add("MORindent")
	divdesc.setAttribute("style", "--m:" + (indent * 20)+"px")
	divdesc.innerHTML = desc
	//divdesc.innerHTML = "<span class=\"MORindent"+indent+"\">"+desc+"</span>"
	
	div.setAttribute("id", canonicalType)
	let cardinality = ""
	switch (card) {
			case "00" : cardinality = "[0..1]"
			case "01" : cardinality = "[0..n]"
			case "11" : cardinality = "[1..n]"
			case "10" : cardinality = ""
			default : console.log("[WARN]<printCanonicalType> ("+canonicalType+") unknown cardinality ") 
	}

	//div.innerHTML = "<span class=\"MORlabel MORindent"+indent+"\">"+label +" "+ cardinality+"</span>"
	div.innerHTML = "<span class=\"MORlabel MORindent\" style=\"--m: "+indent*20+"px\">"+label +" "+ cardinality+"</span>"
	//div.innerHTML = label +" "+ cardinality
	div.appendChild(divdesc)
	containerElement.appendChild(div)
	//containerElement.appendChild(divdesc)
	let children = new Map()
	for (var k in morJSON) 
		if (k.startsWith(canonicalType+"/") && k.indexOf("@")<0) {
			let depth = k.split("/").length
			if (debug) console.log("[DEBUG]<printCanonicalType> "+canonicalType+" calling1 ("+(depth)+") to "+k)
			children.set(k, morJSON[k].type)
			//printCanonicalType (k, containerElement, lang, indent+1)
			printCanonicalType (k, containerElement, lang, depth, canonicalSubTerm)
		} 
		
	if (parent != "" && morJSON.hasOwnProperty(parent) && morJSON[parent].hasOwnProperty("type") && morJSON[parent].type != "xs:enumeration") {
		var divadd = document.createElement("div")
		divadd.classList.add("MORadd")
		//divadd.classList.add("MORindent")
		divadd.setAttribute("style", "display:none;")
		divadd.setAttribute("id", canonicalType+containerElement.id+lang+level+parent)
		var cont = 0
		for (var i in morJSON) 
			if (i.startsWith(parent+"/") && i.indexOf("@")<0 && ! children.has(i.replace(parent,canonicalType))) {
				let term = (canonicalSubTerm == null || canonicalSubTerm === undefined)?i.replace(parent,canonicalType):i.replace(parent,canonicalSubTerm)
				let depth = term.split("/").length
				if (debug) console.log("[DEBUG]<printCanonicalType> "+canonicalType+" in children "+term+" of "+parent + " calling2 ("+(depth)+")") 
					//printCanonicalType (i, containerElement, lang, indent+2)
				//printCanonicalType (i, divadd, lang, indent+depth)
				printCanonicalType (i, divadd, lang, depth, term)
				cont++
			}
			
		if (cont > 0) {
			let but = document.createElement("input")
			but.setAttribute("type", "button")
			but.setAttribute("value","...")
			but.classList.add("MORindent")
			but.setAttribute("style", "--m:" + (indent * 20)+"px;display:block;")
			but.setAttribute("onclick", "changeDivAdd('"+canonicalType+containerElement.id+lang+level+parent+"')")
			containerElement.appendChild(but)
		}
		containerElement.appendChild(divadd)
	}
} 
function changeDivAdd(id) {
	let d = document.getElementById(id)
	d.style.display = (d.style.display=="none"?"block":"none")
}
