const fs = require('fs');
const _ = require('lodash');

function translations_match(paths, allow_duplicates, search_for_variables, translation_variable_name){

    return new Promise((resolve, reject) => {
        
        if(!paths){
            reject(new Error('Missing paths!'));
        }

        if(!translation_variable_name){
            var translation_variable_name = 't';    //default
        }

        var forMatches = [];
        var matches = [];
        var new_matches = [];

        paths.forEach((path) => {
            
            let file_matches;
    
            var file;
            try{
                file = fs.readFileSync(path, 'utf8');
            } catch (err) {
                console.log('err',err);
            }
    
            // let regex = `{${translation_variable_name}([(][^)]*[)])}`    
            // regex = new RegExp(regex,'g');
            let regex = new RegExp(/[{(]t\((['"])([^]*?)\1\)[})]/g); // NEW CODE
            // let regex = new RegExp(/{[(]t\((['"])(['"]?)([^'"]*?)\2\)[})]/g) // NEWER CODE
            
            if(file){
                file_matches = file.match(regex);   //Get translation -> example. {t("HOME")}
            }
            console.log(file_matches);
            if(file_matches){
                // let regex2 = new RegExp(/(?<=\()[^)]*(?=\))/g);     
                let regex2 = new RegExp(/(?<=t\(['"])(.*?)(?=['"]\))/g); // NEW CODE
                
                forMatches = file_matches.toString().match(regex2);    //convert to String -> example. "HOME"
                
                
                for ( let match of forMatches ) {
                    if ( match?.includes(')}') || match?.includes('))') || match?.includes('(t(') || match?.includes('{t(')) {
                        continue;
                    } else matches.push(match)
                }
               

                // for(let i = 0; i < matches.length; i++){

                //     let firstChar = matches[i];
                //     firstChar = firstChar.slice(0,1);

                //     if(search_for_variables){
                //         if(firstChar != '"' && firstChar != "'"){
                //             new_matches.push(matches[i]);
                //         }    
                //     }else{
                //         if(firstChar == '"' || firstChar == "'"){   
                //             matches[i] = matches[i].substring(1,matches[i].length-1);       //remove double quotes
                //             new_matches.push(matches[i]);
                //         }
                //     }
                // }
            }
        })

        // if(!allow_duplicates){
        //     new_matches = _.uniq(new_matches);
        // }

        if(!allow_duplicates){ // NEW CODE
            matches = _.uniq(matches);
        }

        resolve(matches)
    })
      
}

module.exports = {translations_match}
