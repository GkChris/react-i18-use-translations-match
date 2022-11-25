## ***About***
Tool for the i18 useTranslations().

Function translations_match returns an array that contains all the values of the translations used in react with the react-i18's useTranslations.
It's promise based and can be used with async/await. 

It's possible to declare the variable name that you use for translations, as well as matching variable translations instead of hardcoded.

This tool is well compatible with the ***pathdoras-box*** tool. These two tools combined can return all translations used in a project with a few lines of code.

#### Usage
Import the *translations_match* function.

First parameter (Array of strings) contains paths. These are the paths that the translations_match searches with regex.

Second parameter (Optional) is the name of the translations variable (string). Default is 't'. 

Third parameter (Optional - Boolean) is used to allow dublicates. Default is false.

Fourth parameter (Optional - Boolean) is used to switch between seearching for hardcoded translations as {t('home')} to variables {t(home)}. Default is true, searching for hardcoded translations.

```Javascript
const {translations_match} = require('./regex_match');

async function get_translations(){
    let paths = ["path/your_file.js", "path2/your_file2.js"];
    let translations = await translations_match(
        paths,
        '<Your translation variable name>',
        Boolean,
        Boolean
    );
    return translations;
}

get_translations()
```


#### Example

Let's suppose you have the following translations in your react js file

```Javascript
{t("home")}
```

Running the example skipping the optional parameter will return the following array.

```Javascript
["home"]
```