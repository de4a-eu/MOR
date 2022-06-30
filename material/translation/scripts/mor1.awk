BEGIN {
	FS="|"
	myfile = "mor.json"
	printf "{" > myfile
}
{
	if (NR == 1) {
		for(i=1; i<=NF; i++) {
			head[i] = $i
			#print i "=" head[i]
		}
		 
	} else if ($2 != "Origin") {
		gsub(/[\001-\007\013\016-\037\n\t\r]/,"") #remove non-printable characters
		gen = sprintf("%s\n\"%s\" : {\n\t\"type\" : \"%s\",\n\t\"cardinality\" : \"%s\",\n\t\"comment\" : \"%s\",\n", (NR>2?"} ,":""), $1, $3, $4, $5)
		printf "%s" , gen >> myfile
		for (i=6; i<NF; i=i+4) {
			split(head[i], a, "_")
			split(head[i+1], a2, "_")
			split(head[i+2], a3, "_")
			split(head[i+3], a4, "_")

			#print a[1] "_" a[2]
			printf "\t\"%s\" : {\n", a[2] >> myfile
			printf "\t\t\"%s\" : \"%s\",\n", tolower(a[1]), gensub(/"/,"'","G",$(i)) >> myfile
			printf "\t\t\"%s\" : \"%s\",\n", tolower(a2[1]), gensub(/\\|"/,"'","G",$(i+1)) >> myfile
			printf "\t\t\"%s\" : \"%s\",\n", tolower(a3[1]), gensub(/\\|"/,"'","G",$(i+2)) >> myfile
			printf "\t\t\"%s\" : \"%s\"\n", tolower(a4[1]), ($(i+3)==1?"true":"false") >> myfile
			printf "\t}" >> myfile
			if (i+3<NF-1) print "\t," >> myfile
			else print "" >> myfile
		}
	}
}
END {
	printf "\t}\n}" > myfile
}

