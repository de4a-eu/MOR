## Translation assets

This directory contains the full definition of MOR terms. There is a CSV file per complex MOR Term, so:
* **canonical evidence types** are named "Evidence" as suffix, 
* **code lists** are named "Enum" as suffix, 
* **gui** elements named as GUI,
* and the rest are **reusable concepts** such as the ISA2 core vocabularies.

The fields of a MOR CSV file are separated by "|" and their sequence is:
>	* Term URI
>	* Origin
>	* Type
>	* Cardinality (two binary digits:  if the term is optional and  if the term can have several values)
>	* Comments
>	* Label_en
>	* Description_en
>	* Example_en
>	* Verified_en
>	* Label_es
>	* Description_es
>	* Example_es
>	* Verified_es
>	* Label_sl
>	* Description_sl
>	* Example_sl
>	* Verified_sl
>	* Label_pt
>	* Description_pt
>	* Example_pt
>	* Verified_pt
>	* Label_fr
>	* Description_fr
>	* Example_fr
>	* Verified_fr

The first version of CSV files has been generated from **scripts/MOR_en_es_si_pr_fr.xlsm**, which contains a macro that generate a csv from each sheet in "D:\tmp". 

The **script/mor.awk** script converts a MOR csv file into the MOR json format. The resulting _"xx.json"_ files are stored under "MOR-app/src/assets/i18n".
The **MOR json format** has the next syntax:
>	     [URI_term] : object
>	     	type : string
>	     	cardinality : string
>	     	comment : string
>	     	[lang] : object
>	     		"label" :  string
>	     		"description" : string
>	     		"example" : string
>	     		"verified" : boolean

In the MVP of MOR, the whole MOR in a language is downloaded, so there is only one "[lang]" object. However, the syntax is ready to obtain a list of terms in several languages at once, which would be the future funtionality of the MOR API.

The directory **validation** contains some HTML files to validate the MOR json files correctness:
* _"testMORJsonStorage.html"_  a Mcontains a form to verify the correctness ofOR JSON file (xx.json) when describing a concept 
 
* _"testXMLExample.html"_ contains a form to verify the correctness ofOR JSON file (xx.json) when describing an evidence type
	In the upper level, there are two canonical evidence samples in the XML format of the corresponding canonical evidence types: 
	- birth-evidence-1.7-generated-example.xml
	- marriage-evidence-1.7-generated-example.xml

