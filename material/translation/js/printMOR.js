/**
 * @param {string} termURI
 * @param {HTML DIV object} div
 */
function printMORterm2 (termURI, div) {
	//if (debug) console.log("[DEBUG]<printMORterm> "+termURI+","+div.id)
	if (debug && termURI.indexOf("/")<0) console.log("[DEBUG]<printMORterm> "+termURI+","+div.id)
	div.innerHTML += "<h3>" + termURI + "</h3><ul>"
	var pre = preMorJSON.hasOwnProperty(termURI)?preMorJSON[termURI]:null
	if (debug && pre!=null) console.log("[DEBUG]<printMORterm> preMor "+JSON.stringify(pre))
	var d = morJSON[termURI]
	for (var k in d) 
		if (k != "predetail"){
		if (debug) {
			console.log("[DEBUG]<printMORterm> k="+k+" constructor="+d[k].constructor)
			console.log("[DEBUG]<printMORterm> d[k]="+ d[k] )
		}
			if (d[k].constructor === objectConstructor) {
				div.innerHTML += "<li><b>"+k+"</b><ol>"
				for (var kk in d[k]) {
					//if (debug) console.log("[DEBUG]<printMORterm> kk="+kk)
					div.innerHTML += "<li><b>" + kk + "</b>: " + d[k][kk] 
						+ "<span style='color:red'>"
						+ (pre != null && pre.hasOwnProperty(k) && pre[k].hasOwnProperty(kk)
							?(pre[k][kk]!=d[k][kk]?" ["+pre[k][kk]+"]":""):" [x]")+"</span>"
						+"</li>"
					if (debug) console.log("[DEBUG]<printMORterm> "+(pre==null?"nulo":(pre.hasOwnProperty(k)?
							(pre[k].hasOwnProperty(kk)?pre[k][kk]:" no kk "+kk):" no k "+k)))
				}
				div.innerHTML += "</ol></li>"
			} else {
				div.innerHTML += "<li><b>" + k + "</b>: "+ d[k] 
					+ "<span style='color:red'>"+(pre != null && pre.hasOwnProperty(k)?(pre[k]!=d[k]?" ["+pre[k]+"]":""):" [x]")+"</span>"
					+ "</li>"
				if (debug) console.log("[DEBUG]<printMORterm> "+(pre==null?"nulo":(pre.hasOwnProperty(k)?pre[k]:"no "+k)))
			}
		}
	//div.innerHTML += ("<pre>"+(pre!=null?JSON.stringify(pre):"no pre")+"</pre>")
	div.innerHTML += "</ul>"
}
function printMORterm (termURI, div) {
	if (debug) console.log("[DEBUG]<printMORterm> "+termURI+","+div.id + " / "+langMOR)
	div.innerHTML += "<h3>" + termURI + "</h3><ul>"
	var termJson = morJSON[termURI]
	for (var at in termJson) {
		//if (debug) console.log("[DEBUG]<printMORterm> at termJson : "+at)
		if (at == langMOR) {
			var langJson = termJson[at]
			for (var ele in langJson) {
				//if (debug) console.log("[DEBUG]<printMORterm> ele in langJson : "+ele)
				div.innerHTML += "<li><b>" + ele + "</b>: "+ langJson[ele] + "</li>"
			}
		} else {
			div.innerHTML += "<li><b>" + at + "</b>: "+ termJson[at] + "</li>"
		}
	}
	div.innerHTML += "</ul>"
}
/**
 * @param {string} termURI
 */
function printMORjson(div) {
	if (debug) console.log("[DEBUG]<printMORjson> "+div.id)
	div.innerHTML = ""
	for (var uri in morJSON) 
		if (uri.indexOf("/")<0){
			div.innerHTML += "<h2>"+uri+"<span style='cursor:pointer' onclick=printDetail('"+uri+"')> +/-</span></h2><div id='"+uri+"' style='display:none'></div>"
			//printMORterm(uri, div)
		}
}
/**
 * @param {string} termURI
 */
function printDetail(termURI) {
	if (debug) console.log("[DEBUG]<printDetail> "+termURI)
	var d = document.getElementById(termURI)
	if (d.style.display == "none") {
		d.style.display = "block"
		if (d.innerHTML != "") return
		for (var k in morJSON)
			if (k.startsWith(termURI+"/"))
				printMORterm (k, d)
	} else {
		d.style.display = "none"
	}
}
