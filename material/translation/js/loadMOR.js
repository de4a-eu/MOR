/**
 * To switch on/off debugging traces in the web browser console
 */
var debug = true
/**
 * Server path to get the json as response of the MOR api
 * In the MVP of MOR, the API call returns all the MOR terms with their definition in one given language 
 */
//const serverMORapi = "https://raw.githubusercontent.com/de4a-wp3/MOR/main/MOR-app/src/assets/i18n/" /* WP3 mocked URL */
const serverMORapi = "https://raw.githubusercontent.com/de4a-wp3/MOR/main/material/translation/DomicileRegistrationEvidence/"
//const serverMORapi = "https://de4a.simplegob.com/ial/mor/"
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

var addedTerms = new Set()
function addInheritedChildren(term, type) {
	if (debug) console.log("[DEBUG]<addInheritedChildren> called term="+term+" ("+morJSON.hasOwnProperty(term)+"), type="+type+" ("+morJSON.hasOwnProperty(type)+")")
	if (!morJSON.hasOwnProperty(type) || morJSON[type].type == "xs:enumeration") {
		//nothing can be done for the inheritance if "type" does not exist as a MOR term or its type is "xs:enumeration"
		if (addedTerms.has(term)) addedTerms.delete(term)
		if (debug) console.log("[DEBUG]<addInheritedChildren> type "+(morJSON.hasOwnProperty(type)?"as xs:enumeration":" not found "))
		return null
	}
	var hasTerm = morJSON.hasOwnProperty(term)
	if (! hasTerm || morJSON[term].type == type) {
		for (var child in morJSON) 
			if (child.startsWith(type)) {
			//Each MOR term with an URI starting by "type" is a MOR term potentially inheritable by "term"
				var termChildPath = term+"/"+child.substring(type.length)
				termChildPath = termChildPath.replace(/\/\//g,"/")
				termChildPath = termChildPath.replace(/\/$/,"")
				if (debug) console.log("[DEBUG]<addInheritedChildren> inspection of child="+child+" as termChildPath=" +termChildPath + " that exists "+morJSON.hasOwnProperty(termChildPath), type,term+"/"+child.substring(type.length))
				if (morJSON.hasOwnProperty(termChildPath)) {
					//the MOR term "term" has already a child that overloads the definition of "type"'s child
					var d = morJSON[termChildPath]
					for (var ele in d) {
						var changed = false
						var val = d[ele]
						if (debug) console.log("[DEBUG]<addInheritedChildren> checking ele="+ele+" val="+val +" for child="+child+" as termChildPath=" +termChildPath)
						if (ele == "type" && val != morJSON[child][ele] && morJSON[child][ele].replace(/ /g,"").length >0) {
							if (debug) console.log("[DEBUG]<addInheritedChildren> replacing type "+ele+" ["+JSON.stringify(d[ele])+"] x ["+JSON.stringify(morJSON[child][ele])+"]")
							d[ele] = morJSON[child][ele]
							changed = true
						} else 
						if (ele != langMOR && val.replace(/ /g,"").length == 0) {
							//if the value of the "term"'s element is empty, it is assigned with the value of such element in the "type"'s child
							if (debug) console.log("[DEBUG]<addInheritedChildren> replacing "+ele+" ["+JSON.stringify(d[ele])+"] x ["+JSON.stringify(morJSON[child][ele])+"]")
							d[ele] = morJSON[child][ele]
							if (d[ele].replace(/ /g,"").length > 0) changed = true
							if (debug) console.log("[DEBUG]<addInheritedChildren> new "+ele+" ["+JSON.stringify(morJSON[termChildPath][ele])+"]")
						} else 
						if (ele == langMOR){
							for (var langEle in d[ele]) {
								if (debug) console.log("[DEBUG]<addInheritedChildren> lang "+ele+"/"+langEle+" ["+JSON.stringify(morJSON[termChildPath][ele][langEle])+"] from child ["+JSON.stringify(morJSON[child][ele][langEle])+"]")
								if (d[ele][langEle].replace(/ /g,"").length == 0) {
									d[ele][langEle] = morJSON[child][ele][langEle]
									if (d[ele][langEle].replace(/ /g,"").length > 0) changed = true
									if (debug) console.log("[DEBUG]<addInheritedChildren> new "+ele+"/"+langEle+" ["+JSON.stringify(morJSON[termChildPath][ele][langEle])+"]")
								}
							}
						}
						if (changed && !morJSON[termChildPath].type.startsWith("xs") && ! termChildPath.match(/[\w-_]+Enum/) ) addedTerms.add(termChildPath)
					}
				} else {
					//"termChildPath" is not a MOR term, so it is added 
					morJSON[termChildPath] = morJSON[child]
					if (debug) console.log("[DEBUG]<addInheritedChildren> added new "+termChildPath+" ["+JSON.stringify(morJSON[termChildPath])+"] type="+child+":"+morJSON[child].type)
					if (! termChildPath.startsWith("GUI") && ! termChildPath.match(/[\w-_]+Enum/) && ! morJSON[termChildPath].type.startsWith("xs") && morJSON[termChildPath].type != "")  
						addedTerms.add(termChildPath)
				} 
			}
			
	}
	if (addedTerms.has(term)) addedTerms.delete(term)
	if (debug) console.log("[DEBUG]<addInheritedChildren> addedTerms: "+addedTerms.size)
}
function fillInheritanceMORjson() {
	for (var uri in morJSON) {
		if (! uri.startsWith("GUI") && ! uri.match(/[\w-_]+Enum/) && ! morJSON[uri].type.startsWith("xs") ) {
			addInheritedChildren(uri, morJSON[uri].type)
			if (debug) console.log("[DEBUG]<fillInheritanceMORjson> uri="+uri+" : "+JSON.stringify(morJSON[uri]))
			//if (debug) console.log("[DEBUG]<fillInheritanceMORjson> POST preMorJSON[uri]: "+JSON.stringify(preMorJSON[uri]))
		} //GUI and Enum terms have not inheritance 
	}
	while (addedTerms.size > 0) {
		for (var uri of addedTerms) 
			if (! uri.startsWith("GUI") && ! uri.match(/[\w-_]+Enum/) && ! morJSON[uri].type.startsWith("xs") ) 
				addInheritedChildren(uri, morJSON[uri].type)
			else {
				if (debug) console.log("[DEBUG]<fillInheritanceMORjson> uri="+uri+" of type "+morJSON[uri].type+" not processed")
				addedTerms.delete(uri)
			}
			
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
	console.log("[INFO]<loadMOR> loaded "+lang)
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
 function printCanonicalType (canonicalType, containerElement, lang, level, summary) {
	if (debug) console.log("[DEBUG]<printCanonicalType> "+canonicalType+" level "+level +" summary "+summary)
	
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
			if (level == 0) {
				container.innerHTML = ""
				elements = []
			}
			/*
			var keys = [];
   			for(var k in morJSON) keys.push(k);
   			keys.sort()
   			*/
   			var keys = Object.keys(morJSON).sort()
			for (var i in keys) {
				let uri = keys[i]
				var indent = uri.split("/").length - 1
				let mtype = morJSON[uri].type
				if (debug) console.log("[DEBUG]<printCanonicalType> key="+uri + " indent="+indent, uri.indexOf("@")<0 , uri.startsWith(canonicalType), summary == 0 , uri.indexOf("Certifies")>0 , indent == 2, "/"+mtype+"/", mtype.indexOf("xs:token")) 
				if (uri.indexOf("@")<0 && uri.startsWith(canonicalType) && (summary == 0 || (uri.indexOf("Certifies")>0 && indent == 2 )) &&  mtype.indexOf("xs:token")<0 ) {
					var d = morJSON[uri][lang]
					

					var div = document.createElement("div");
					div.classList.add("MORtitle")
					div.setAttribute("title", uri)
					div.setAttribute("style", "--m:" + (indent * 20)+"px")

					var divdesc = document.createElement("div");
					divdesc.classList.add("MORdesc")
					divdesc.classList.add("MORindent")
					divdesc.innerHTML = d.description
					//divdesc.innerHTML = "<span class=\"MORindent"+indent+"\">"+desc+"</span>"
					
					div.setAttribute("id", uri)
					let cardinality = ""
					switch (d.cardinality) {
							case "00" : cardinality = "[0..1]"
							case "01" : cardinality = "[0..n]"
							case "11" : cardinality = "[1..n]"
							case "10" : cardinality = "[1..1]"
							default : console.log("[WARN]<printCanonicalType> ("+canonicalType+") unknown cardinality ") 
					}
					div.innerHTML = "<span class=\"MORlabel MORindent\" style=\"--m: "+indent*20+"px\">"+d.label +" "+ cardinality+"</span>"
					//div.innerHTML = label +" "+ cardinality
					div.appendChild(divdesc)
					containerElement.appendChild(div)
				}
			}
	
 }
 
function changeDivAdd(id) {
	let d = document.getElementById(id)
	d.style.display = (d.style.display=="none"?"block":"none")
}
