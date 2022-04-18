 for i in `ls *csv`
 do 
	j="`echo $i | cut -d"." -f1`"
	echo $j
	grep -e "$j.*label" mor_en_translation_slovene.txt | cut -f3 > sl/"$j"_label.txt 
	grep -e "$j.*description" mor_en_translation_slovene.txt | cut -f3 > sl/"$j"_desc.txt 
	grep -e "$j.*label" mor_en_translation_slovene.txt | sed 's/_.*//' > sl/"$j"_terms.txt
	paste -d"|" sl/"$j"_terms.txt sl/"$j"_label.txt sl/"$j"_desc.txt > sl/"$j".txt
 done
