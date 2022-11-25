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
    
            let regex = `{${translation_variable_name}([(][^)]*[)])}`    
    
            regex = new RegExp(regex,'g');
            
            if(file){
                file_matches = file.match(regex);   //Get translation -> example. {t("HOME")}
            }
        
            if(file_matches){
                let regex2 = new RegExp(/(?<=\()[^)]*(?=\))/g);     
            
                matches = file_matches.toString().match(regex2);    //convert to String -> example. "HOME"
                
                for(let i = 0; i < matches.length; i++){

                    let firstChar = matches[i];
                    firstChar = firstChar.slice(0,1);

                    if(search_for_variables){
                        if(firstChar != '"' && firstChar != "'"){
                            new_matches.push(matches[i]);
                        }    
                    }else{
                        if(firstChar == '"' || firstChar == "'"){   
                            matches[i] = matches[i].substring(1,matches[i].length-1);       //remove double quotes
                            new_matches.push(matches[i]);
                        }
                    }
                }
            }
        })

        if(!allow_duplicates){
            new_matches = _.uniq(new_matches);
        }

        resolve(new_matches)
    })
      
}

module.exports = {translations_match}
