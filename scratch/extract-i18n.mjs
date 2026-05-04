import fs from 'fs';

const fileContent = fs.readFileSync('src/data/translations.js', 'utf8');

const match = fileContent.match(/const translations = (\{[\s\S]*?\n\};)/);
if (match) {
  let jsObjString = match[1];
  let translations;
  eval('translations = ' + jsObjString);
  
  for (const lang of Object.keys(translations)) {
    const dir = `locales/${lang}`;
    fs.mkdirSync(dir, { recursive: true });
    
    fs.writeFileSync(`${dir}/translation.json`, JSON.stringify(translations[lang], null, 2));
    console.log(`Wrote ${dir}/translation.json`);
  }
} else {
  console.log("Could not extract translations.");
}
