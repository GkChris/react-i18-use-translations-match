## ***About***
Tool for the i18 useTranslations().

Function translations_match returns an array that contains all the values of the translations used in react with the react-i18's useTranslations.
It's promise based and can be used with async/await. 

It's possible to declare the variable name that you use for translations, as well as matching variable translations instead of hardcoded.

This tool is well compatible with the ***pathdoras-box*** tool. These two tools combined can return all translations used in a project with a few lines of code.

#### Usage
Import the *translations_match* function.

First parameter (Array of strings) contains paths. These are the paths that the translations_match searches with regex.
Example. 
```Javascript
let paths = ["../react-app/src/pages/home.js", "../react-app/src/pages/about.js"] 
```

Second parameter (Optional - Boolean) is used to allow duplicates. Default is false. Pass true to return duplicates.

Third parameter (Optional - Boolean) is used to switch between searching for hardcoded translations as {t('home')} to variables as {t(home)}. Default is falsem searching for hardcode. Pass true to search for variables.

Fourth parameter (Optional - String) is the name of the translations variable (string). Default is 't'. 

```Javascript
const {translations_match} = require('./regex_match');

async function get_translations(){
    let paths = ["path/your_file.js", "path2/your_file2.js"];
    let translations = await translations_match(paths);
    return translations;
}

get_translations()
```


#### Example

Assuming you have the following translations in your react js file

```Javascript
{t("home")}
```

Running the example skipping the optional parameter will return the following array.

```Javascript
["home"]
```


#### Combined with pathdoras-box example

Assuming you want to scan every react-app/src file to find your translations.
You can use pathdoras-box to get paths and then call the translations_match function to receive an array that contains all your app's translations.

```Javascript
const {pathtool} = require('pathdoras-box');
const {translations_match} = require('react-i18-use-translations-match');
const your_path_to_src = '../react-app/src';


async function get_translations(dirname){
    var results = [];
    let paths = await pathtool(dirname, results);
    let keys = await translations_match(paths);
    return keys;
}

get_translations(your_path_to_src)
```

To install pathdoras-box

```
npm i pathdoras-box
```