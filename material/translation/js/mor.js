var selectedLang = "es"
var countries = ""
var languages = ""
function getCountryNameByNuts0(nuts0) {
	if (countries == "") countries = morCountries()
	var c = countries.filter(
      function(countries){ return countries.nuts0 == nuts0 }
  	);
	return c[0][selectedLang];
}
function selectCountryDO(requesterCountry, evidenceType, reqParam) {
	if (reqParam == null || reqParam == "" || reqParam == "null") {
		console.log(evidenceType+ ": vacio")
	} else {
		var div = document.getElementById("evidences")
		
		if (countries == "") {
			countries = morCountries()
		}
		var sel = "<select name='doCountry_"+evidenceType+"'>"
		for (var i=0; i<countries.length; i++) { 
			sel += 
				"<option value='"
				+countries[i].nuts0+"'"
				+(countries[i].nuts0==requesterCountry?" selected>":">")
				+countries[i].en
				+"</option>"
		}
		sel += "</select>"
		console.log(evidenceType+ ": "+reqParam)
		div.innerHTML = div.innerHTML + "<div class='tr'><div class='td hovertext' title='' style='text-align:right' id='"+evidenceType+"'></div><div class='td' style='text-align:left'>"+sel+"</div></div>"
		writeLabel(evidenceType, evidenceType)
	}
}
function writeLabel(term, id) {
	var obj = document.getElementById(id)
	var t = getTerm(term)
	if (t) {
		if (t[selectedLang].hasOwnProperty("description"))
			obj.title = t[selectedLang]["description"]
		obj.innerHTML = obj.innerHTML + t[selectedLang]["label"]
	}
	else
		obj.innerHTML = obj.innerHTML +  term
}
function writeLangSel(id, lang) {
	var obj = document.getElementById(id)
	if (languages == "") languages = morLanguages()[selectedLang]
	var sel = ""
	var keys = Object.keys(languages)
	for (var i=0; i<keys.length; i++) { 
		sel += 
			"<option value='"
			+keys[i]+"'"
			+(keys[i]==selectedLang?" selected>":">")
			+languages[keys[i]]
			+"</option>"
	}
	obj.innerHTML = sel

}
function userRequest(lang,requesterCountry,birthEvidence,marriageEvidence,domicileRegistrationEvidence) {
	selectedLang = lang
	writeLabel("Person/GivenName", "givenName")
	writeLabel("Person/FamilyName", "familyName")
	writeLabel("Person/BirthDate", "birthDate")
	writeLabel("RequestPage/PersonTitle", "evidencesubject")
	writeLangSel("langSel")
	selectCountryDO(requesterCountry,"BirthEvidence", birthEvidence)
	selectCountryDO(requesterCountry,"MarriageEvidence", marriageEvidence)
	selectCountryDO(requesterCountry,"DomicileRegistrationEvidence", domicileRegistrationEvidence)

}