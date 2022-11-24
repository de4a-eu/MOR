BEGIN {
	FS="\t"
	file["en"] = "en.json"
	file["es"] = "es.json"
	file["sl"] = "sl.json"
	file["pt"] = "pt.json"
	file["fr"] = "fr.json"
	file["ro"] = "ro.json"
	for (v in file)
		printf "{" > file[v]
}
{
	if (NR == 1) {
		for(i=1; i<=NF; i++) {head[i] = $i}
		 
	} else if ($2 != "Origin") {
	  #if csv files are concatenated, heading rows have to be ignored
		gsub(/[\001-\007\013\016-\037\n\r]/,"") #remove non-printable characters
		card = $4 ""
		if ($4 == "") card = "00"
		else if (length($4)<2) card = sprintf ("0%s", card)
		#print length($4) " - " card
		gen = sprintf("%s\n\"%s\" : {\n\t\"type\" : \"%s\",\n\t\"cardinality\" : \"%s\",\n\t\"comment\" : \"%s\",\n", (NR>2?"} ,":""), $1, $3, card, $5)
		for (i=6; i<NF; i=i+4) {
			split(head[i], a, "_")
			split(head[i+1], a2, "_")
			split(head[i+2], a3, "_")
			split(head[i+3], a4, "_")
			printf "%s\t\"%s\" : {\n", gen, a[2] >> file[a[2]]
			printf "\t\t\"%s\" : \"%s\",\n", tolower(a[1]), gensub(/"/,"'","G",$(i)) >> file[a[2]]
			printf "\t\t\"%s\" : \"%s\",\n", tolower(a2[1]), gensub(/\\|"/,"'","G",$(i+1)) >> file[a[2]]
			printf "\t\t\"%s\" : \"%s\",\n", tolower(a3[1]), gensub(/\\|"/,"'","G",$(i+2)) >> file[a[2]]
			printf "\t\t\"%s\" : \"%s\"\n", tolower(a4[1]), ($(i+3)==1?"true":"false") >> file[a[2]]
			print "\t}" >> file[a[2]]
		}
	}
}
END {
	for (v in file)
		printf "\t}\n}" > file[v]
}

