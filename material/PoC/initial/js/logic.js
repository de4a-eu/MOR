/**
 * 
 */
	var showExample = "";
	var paramsMap = new Map();
	function getSelValue(id) {
		var o = document.getElementById(id)
		return o.options[o.selectedIndex].value
	}
	function selected() {
		document.getElementById("evform").style.display="none";
		fillAvailableSources("MarriageCertificate", "en", getSelValue("countryMarriageCertificate")); 
		fillAvailableSources("BirthCertificate", "en", getSelValue("countryBirthCertificate"))
		document.getElementById("explicit").style.display="block";
	}
	function buildExample(lang, nodePath, node, isExample) {
		var m = morTermApi (nodePath, lang)
		//console.log(m);
		if (isExample) {
			if (node.hasChildNodes() || m.example != "" ) {
				showExample = showExample + "<br>";
				var n = nodePath.split("/").length;
				for (var i=0; i<n; i++) showExample = showExample + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				showExample = showExample + "<span class='label' title=\"" + m.description + "\">" + m.label + "</span>" + (m.example == ""?"":" (<em>ej. " + m.example + "</em>)") + "";
			}
		} else {
				showExample = showExample + "<br>";
				var n = nodePath.split("/").length;
				for (var i=0; i<n; i++) showExample = showExample + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				var content = null;
				if (node.hasChildNodes() && node.childNodes[0].nodeValue)
					content = node.childNodes[0].nodeValue.replace(/^\s+|\s+$/g,"");
				showExample = showExample + "<span class='label' title=\"" + m.description + "\">" +m.label + "</span>" + (content==null?"":" => <em>" + content + "</em>") + "";
		}
	}
	function showNode(nodes, parentPath, lang, isExample) {
		for (var i = 0; i < nodes.length; i++) { 
	        if (nodes[i].nodeType == 1) {
					console.log(parentPath+"/"+nodes[i].nodeName); 
					if (nodes[i].hasChildNodes() && nodes[i].childNodes[0].nodeValue.replace(/ /g,"")!="") 
					console.log( " > text > '" + nodes[i].childNodes[0].nodeValue.replace(/^\s+|\s+$/g,"")+"'")
				
	            buildExample(lang.toLowerCase(), parentPath+"/"+nodes[i].nodeName, nodes[i], isExample);
	            showNode(nodes[i].childNodes, parentPath+"/"+nodes[i].nodeName, lang, isExample);
	        }
	        
	    }
	}
	var langs = ["EN", "ES"];
	function show(canonicalEvidenceType, lang, isExample) {
		var domParser = new DOMParser();
		var xmlDocument = domParser.parseFromString(canonical[canonicalEvidenceType], "text/xml");
		showExample="";
		buildExample(lang.toLowerCase(), xmlDocument.documentElement.nodeName, xmlDocument.documentElement, isExample);
		showNode(xmlDocument.documentElement.childNodes, xmlDocument.documentElement.nodeName, lang, isExample);
		var a = document.getElementById("area");
		a.style.display="inline-block";
		a.style.whiteSpace = "nowrap";
		var radio = '<input type="radio" name="rLang" value="EN" onchange=\'show("'+canonicalEvidenceType+'", this.value, '+isExample+')\' class="langOff"> EN';
		a.innerHTML = '<input type="button" value="x" title="Close" id="close" onclick=document.getElementById(\"area\").style.display="none">'+ showExample +'<br><br>';
		var radioHTML = "";
		for (var i=0; i<langs.length; i++) {
			var langHTML = radio;
			if (lang.toUpperCase() == langs[i]) langHTML = langHTML.replace(/Off"/, 'On" checked="checked"');
			if (! langs[i] != "EN") langHTML = langHTML.replace(/EN/g, langs[i]);
			if (i>0) langHTML = "&nbsp;|&nbsp;" + langHTML;
			radioHTML = radioHTML + langHTML ;
		}
		a.innerHTML = a.innerHTML  + "<center>"+ radioHTML +"</center>"
		//console.log(showExample);
    }
    function setATU(rd) {
    	var pref = rd.id.split("_")[0];
    	var li = document.getElementById(pref.replace("rd","li"));
    	var box = document.getElementById(pref.replace("rd","in"));
    	box.value = rd.value;
    	box.name = rd.id.split("_")[1];
    	old = rd.value;
    	rd.checked = true;
    	console.log(rd.value +" >> "+rd.getAttribute("id"));
    	li.style.display = "none";
    	return true;
    }

    function fillAvailableSources(c, lang, countryCode) {
    	var sel = document.getElementById("li"+c);
		var ials = (countryCode == undefined) ? availableSourcesApi(c) : countryAvailableSourcesApi(c,countryCode);
		console.log("fillAvailableSources > c, ials.length = " + c +", "+ ials.length)
		if (ials.length == 0) {
			document.getElementById("in"+c).style.display = "none";
			document.getElementById("ck"+c).checked= "checked";
			document.getElementById("ck"+c).disabled= true;
		} else {
			document.getElementById("in"+c).style.display = "block";
			if (ials[0].provisions.length==1) {
				document.getElementById("in"+c).disabled= true
				document.getElementById("in"+c).value = getAtuLatinNamePath(ials[0].provisions[0].atuCode)
			} else {
				document.getElementById("in"+c).disabled= false
			}
			document.getElementById("ck"+c).checked= "";
			document.getElementById("ck"+c).disabled= false;
		}
		for (var s=0; s<ials.length; s++) {
    		var srv = ials[s].provisions;
    		for (var i=0; i<srv.length; i++) {
	    		var atuCode = srv[i].atuCode;
	    		var atuLevel = ials[s].atuLevel;
	    		var latinNamePath = srv[i].atuLatinName;
				var li=document.createElement('li');
				var rd = document.createElement('input');
				rd.setAttribute("type", "radio");
				rd.setAttribute("name", "rd"+c);
				rd.setAttribute("value", latinNamePath);
				rd.setAttribute("id", "rd"+c+"_"+atuCode);
				var label = document.createElement("LABEL");
				label.innerHTML = " " + latinNamePath;
				label.htmlFor = "rd"+c+"_"+atuCode;
				//label.htmlFor = atu.substr(0,2);
				rd.setAttribute("atuCode", atuCode);
				rd.setAttribute("atuLabel", latinNamePath);
	
				var dataowner = document.createAttribute("do");
				dataowner.value = srv[i].dataOwnerPrefLabel;
				rd.setAttributeNode(dataowner);
				var cet = document.createAttribute("cet");
				cet.value = c;
				rd.setAttributeNode(cet);
				var doId = document.createAttribute("pid");
				doId.value = srv[i].dataOwnerId;
				rd.setAttributeNode(doId);
				if (srv[i].hasOwnProperty("redirectURL")) {
					var redURL = document.createAttribute("redirectURL");
					redURL.value = srv[i].redirectURL;
					rd.setAttributeNode(redURL);
				} else {
					var params = document.createAttribute("params");
					params.value = srv[i].hasOwnProperty("params");
					if (params.value) {
						paramsMap["rd"+c+"_"+atuCode] = srv[i].params;
					}
					rd.setAttributeNode(params);
				}				
				rd.addEventListener( 'click', function(){
	  				setATU(this);
				} );
				label.addEventListener( 'click', function(){
	  				setATU(document.getElementById(this.htmlFor));
				} );
				li.appendChild(rd);
				li.appendChild(label);
				sel.appendChild(li); 				
			}			 			
    	}
    }
	var proofs = new Array();
	function proceed(lang) {
		var selected = document.getElementsByClassName("idropdown");
		var msg = "";
		for(var i = 0; i < selected.length; i++) {
			var proofName = selected[i].id.substr(2);
			if (! document.getElementById("ck"+proofName).checked) {
				console.log("selected "+selected[i].name);
				var items = document.getElementById("li"+proofName).getElementsByTagName("li");
				var label = null;
				var selVal = document.getElementById("in"+proofName).value;
				for (var k=1; k<items.length; k++) {
					var rd = items[k].getElementsByTagName("input")[0];
					if (rd.value == selVal) {
						label = selVal;
						proofs.push(rd);
					}
				}
				var canEvidType = morTermApi (proofName, lang);
				if (label != null) 
					msg = msg + "<li>" + canEvidType.label + " from " + label + "</li>";
				else {
					var a = document.getElementById("area");
					a.style.display="block";
					a.innerHTML = '<br>'
						+ "Please select either the upload of the document or a valid source for the provision of "+ canEvidType.label
						+ "<br><br><center><input type='button' value='Close'  onclick=document.getElementById('area').style.display='none'></center>";
						return;			
				}
			}
		}
		if (msg != "") {
			var a = document.getElementById("area");
			a.style.display="block";
			a.innerHTML = '<br>' 
				+ "The DE4A Technical System will be used to request the next cross-border evidence:<br><ul>"+ msg 
				+ "</ul>You will be able to inspect the received evidence and chosee if you want to proceed."
				+"<br><br><b>Are you sure that you want use the DE4A Technical System?<br><br>"
				+"<center><input type='button' value='Confirm'  onclick=\"request('en')\">&nbsp;&nbsp;&nbsp;<input type='button' value='Cancel'  onclick=document.getElementById('area').style.display='none'></center>";
		} else {
			preview('en')
		}
	}
	
	var processedProofs = [];
	var processing = (-1);
	var cont = (-1);
	
	function request(lang) {
		var d = document.getElementById('area');
		d.style.display='none';
		console.log("request > cont : processedProofs.length", ++cont, ";", processedProofs.length)
		document.getElementById('explicit').style.display='none';
		document.getElementById('preview').style.display='none';
		var ini = (-1);
		if (processing < 0 ) {
			for (var i=0; i<proofs.length; i++) {
				if (! processedProofs.includes(proofs[i])) {
					console.log("request > to process " + i)
					ini = i
					processedProofs.push(proofs[ini]);
					break
				}
			}
		} else if (processing != 1000) {
			ini = processing + 1
			processing = (-1)
			//request(lang)
		} 
		if (ini > 0 ) {
			var c = proofs[ini-1].id.substr(2).split("_")[0];	
			document.getElementById(c+'_REQ_URL').style.display='none';
			document.getElementById(c+'_PARAM').style.display='none';
		}
		if (ini >= 0 & ini < proofs.length) {		
			var op = proofs[ini];
			if (op.hasAttribute("redirectURL")) {
				d.style.minHeight = "50%";
				d.style.maxWidth = "50%";
				d.style.whiteSpace = "normal";
				d.innerHTML = 
						'<input type="button" value="x" id="close" onclick="request(\''+lang+'\')">'
						+"<br><br><b><img src='img/OIP.jpg' style='cursor:none !important;margin-left:3em;margin-right:3em;float:left;'><br>Go to and from USIP portal<b> '<i>"+op.getAttribute("redirectURL")+"</i>' to retrieve evidence from "+op.getAttribute("do");
				d.style.display='block';
				cont--
				return; 
			}
			var canonical = proofs[ini].id.substr(2).split("_")[0];	
			document.getElementById(canonical+'_REQ_URL').style.display='none';
			document.getElementById(canonical+'_PARAM').style.display='none';
			
				
			if (proofs[ini].hasAttribute("params")){
				if (proofs[ini].getAttribute("params") == "true") {
						var div = document.getElementById(canonical+'_PARAM');
						document.getElementById('preview').style.display='block';
						div.style.display = "inline-block";
						processing = ini
						showParams(proofs[ini].id,canonical+'_PARAM',lang);
				} else {
					ini++
					//processing = ini;
					if (ini < proofs.length)
						request(lang, ini)
				}
			} else if (proofs[ini].hasAttribute("redirectURL")) {
					var div = document.getElementById(canonical+'_REQ_URL');
					document.getElementById('preview').style.display='block';
					div.style.display='table-row';
					processing = ini
					div.innerHTML = div.innerHTML
						.replace("@@country@@",proofs[ini].getAttribute("atuLabel"))
						.replace("@@evidence@@",morTermApi(canonical,lang).label)
						.replace("@@do@@",proofs[ini].getAttribute("do"));
			} 
		}
		
		if (proofs.length == 0 ) {
			console.log("request > no proofs")
			cont--
			preview(null)
			processing = 1000
			return	
		} else if (processing < 0 && ini < 0 || ini >= proofs.length) {
			console.log("request > preview (processedProofs, cont) " + processedProofs.length +", "+cont)
			preview(lang)
			processedProofs.pop();
			cont--
			if (cont < 0 )
				processedProofs.pop();
			processing = 1000
			return		
		} else
		if (processing == 1000) {
			console.log("request > 1000: processedProofs, cont " + processedProofs.length+", "+cont)
			if (processedProofs.length == 0)
			preview(null)
			else
				processedProofs.pop();
			cont--
			return
		}		
		cont--
	}
	function showField(termName, idx, lang) {
		var term = morTermApi (termName, lang);
		var desc = "";
		var label = "";
		var optional = true;
		var field = "";
		if (term.hasOwnProperty("atuCode")) {
			return "<div class='tr'>"
						+"<div class='td param' style='float:left'><input type='radio' name='atu' value='"+term.atuCode+"'> "+term.atuLatinName+"</div>"
					+"</div>";
		} else {
			desc = term.description ;
			label = term.label;
			optional = term.optional;
			var type = term.type;
			if (type=="xs:string") {
				var placeholder="";
				try {
					placeholder="placeholder='"+term.get("example")+"'";
				} catch(e) { }
				field = "<input type='text' id='param"+idx+"' name='param"+idx+"' " + placeholder + " title='"+desc+"'>";
			} else if (type=="xs:boolean" && optional) {
				field = "<input type='checkbox' id='param"+idx+"' name='param"+idx+"' title='"+desc+"'>";
			} else if (type=="xs:date") {
				field = "<input type='date' id='param"+idx+"' name='param"+idx+"' title='"+desc+"'>";
			} else if (type.indexOf("xs:enumeration") == 0) {
				field = "<select id='param"+idx+"' name='param"+idx+"' title='"+desc+"'>";
				term.enum.forEach(
					t => {
						field += "<option value='"+t.label+"'>"+t,description+">";		
					}
				)
				field += "</select>";
			} else if (type == "enumType") {
				field = "";
				for (var i=0; i<term.enum.length; i++) {
					var enumTerm = morTermApi (term.enum[i], lang);
					field = field + (i>0?"<br>":"") + '<input type="radio" value="'+term.enum[i]+'" name="param'+idx+'" title="'+enumTerm.description+'"> ' + enumTerm.label;
				}
			}
			return "<div class='tr'>"
						+"<div class='td param' title='"+desc+"'>"+label+(!optional?"*</div>":"</div>")
						+"<div class='td param'>"+field+"</div>"
					+"</div>";
		}
	}
	function showParams(paramsKey, divId, lang) {
		var paramsets = paramsMap[paramsKey];
		var div = document.getElementById(divId); 
		var source = document.getElementById(paramsKey); //radio input with the source attributes
		var term = morTermApi (source.getAttribute("cet"), lang);
		div.innerHTML = "<div style='display:table'><div class='addparh2'>"+term.label
			+"<br><div class='addparh2'>"+source.getAttribute("do")+"</div></div>";
		["ES", "EN"].forEach(   
			item => div.innerHTML += '<center style="display:inline-block"><input type="radio" name="pLang" value="'+item.toLocaleLowerCase()+'" onchange=\'showParams("'+paramsKey+'", "'+divId+'", this.value)\''+(lang.toUpperCase() == item?'class="langOn" checked="checked"> ': 'class="langOff"> ')+ item + "&nbsp;");
			div.innerHTML += '</div>';
			for (var i=0; i<paramsets.length; i++) {
					var title = morTermApi(paramsets[i].title,lang);
					div.innerHTML += "<h3 title=\""+title.description+"\"><input type='radio' name='paramset'"+ (i==0?"checked='checked'>":">") +title.label+"</h3>";
					div.innerHTML += '<div style="display:table">';
					if (! paramsets[i].hasOwnProperty("paramset") ) { //fill with ATUs of the atu level given in title
						paramsets[i].paramset = atuCodesPerLevelPathApi(paramsets[i].title);
					}
					for (var j=0; j<paramsets[i].paramset.length; j++) {
						div.innerHTML += showField(paramsets[i].paramset[j], i+"_"+j, lang) ;
					}
					div.innerHTML += '</div>';
			}
	}
	function preview(lang) {
		var d = document.getElementById('area')
		d.style.display='none';
		document.getElementById('explicit').style.display='none';
		document.getElementById('preview').style.display='none';
		if (lang == null){
			for (var i=0; i<proofs.length; i++) {
				var canonical = proofs[i].id.substr(2).split("_")[0];
				document.getElementById(canonical+'_AUTO').style.display='none';
				document.getElementById(canonical+'_MANU').style.display='none';
			}
			d.style.display="block";
			d.style.minWidth="80%";
			d.style.minHeight="80%";
			d.innerHTML =  
						"<br><br><br><br><center><input type='button' value='Finish PoC'  onclick=location.reload()></center><br><br>";
			processedProofs = []
			return;
		}
		var p = document.getElementsByClassName("idropdown");
		for (var i=0; i<p.length; i++) {
			var canonical = p[i].id.substr(2).split("_")[0];
			if ( document.getElementById("ck"+canonical).checked ) { //manual
				document.getElementById(canonical+'_AUTO').style.display='none';
				document.getElementById(canonical+'_MANU').style.display='table-row';
			}
		}
		for (var i=0; i<proofs.length; i++) { //auto
			var canonical = proofs[i].id.substr(2).split("_")[0];
			document.getElementById(canonical+'_REQ_URL').style.display='none';
			document.getElementById(canonical+'_PARAM').style.display='none';
			document.getElementById(canonical+'_AUTO').style.display='table-row';
			document.getElementById("revert_"+canonical+'_MANU').style.display='block';
			document.getElementById(canonical+'_MANU').style.display='none';
			document.getElementById("text_"+canonical+'_AUTO').innerHTML =
				"Retrieved from "+proofs[i].getAttribute("do") +", "+proofs[i].getAttribute("atuLabel");
		}
		document.getElementById('preview').style.display='block';
	}
	function revert(canonical) {
		document.getElementById(canonical+'_AUTO').style.display='table-row';
		document.getElementsByName("radio_"+canonical+'_AUTO')[0].checked=true;
		document.getElementById(canonical+'_MANU').style.display='none';		
	}
	function cancel(canonical) {
		document.getElementById(canonical+'_AUTO').style.display='none';
		document.getElementById(canonical+'_MANU').style.display='table-row';		
	}
	var old = "";
	function hideLi () {
		var cases = document.getElementsByTagName("input");
		for (var i=0; i<cases.length; i++) {
			if (cases[i].id.substr(0,2) == "in" ) {
				console.log("li" + cases[i].id.substr(2))
				document.getElementById("li" + cases[i].id.substr(2)).style.display="none";
			}
		}	
		old="";
	}
	function showLi (obj, canonical) {
		console.log(obj.value)
		console.log((new Date).toLocaleTimeString())
		console.log (old +"=="+ obj.value+canonical)
		old = obj.value+canonical;
		var li = document.getElementById("li"+canonical);
		li.style.top = parseInt(obj.offsetTop)+20 + "px";
		li.style.left = parseInt(obj.offsetLeft) + "px";
		li.style.display= "block";
		//if (old == obj.value+canonical) return;
		var items = li.getElementsByTagName("li");
		for (var i=1; i<items.length; i++) {
			var a = items[i].getElementsByTagName("label")[0];
			var rd = items[i].getElementsByTagName("input")[0];
			if (a.innerHTML.indexOf("<")>=0) a.innerHTML= a.innerHTML.replace(/<[^>]*>/g,"");
			
			var prefix = a.innerHTML.lastIndexOf("&gt; ");
			if (prefix < 0 ) prefix = (-5);
			rd.checked = (a.innerHTML.substr(prefix+5) == obj.value);
			//var idx = a.innerHTML.indexOf(obj.value);
			if (obj.value == "") {
				items[i].style.display="list-item";
			} else
			if (a.innerHTML.match(new RegExp(obj.value,"i"))) {
				items[i].style.display = "list-item";
				a.innerHTML = a.innerHTML.replace(new RegExp(obj.value,'gi'),"<b>"+obj.value.toUpperCase()+"</b>");
			} else {
				items[i].style.display="none";
			}
		};
		console.log((new Date).toLocaleTimeString())
	}
