const fs = require("fs");
let data = fs.readFileSync("mor_translation.csv", "utf-8").split("\r\n");
data.splice(0, 2);
data = data.map((line) => {
  let values = line.split(";");
  let key = values[0].split("_en_");
  return {
    key: key[0],
    type: key[1],
    en: values[1],
    es: values[2],
    pt: values[3],
    fr: values[4],
    sl: values[5],
  };
});

["en", "es", "pt", "fr", "sl"].forEach((lang) => {
  let output = data.reduce((r, a) => {
    r[a.key] = r[a.key] || {};
    if (a[lang]) r[a.key][a.type] = a[lang];
    return r;
  }, Object.create(null));

  output = Object.fromEntries(
    Object.entries(output).filter(
      ([key]) => Object.keys(output[key]).length > 0
    )
  );

  fs.writeFileSync(lang + ".json", JSON.stringify(output, null, 2));
});
