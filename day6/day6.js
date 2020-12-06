import data from './input.js';

const groups = data.split("\n\n");

const countUniqueAndMatchingValues = (groupData) => {
    let uniqueValues = {};
    let groupArray = groupData.split("\n")
    for(let i = 0; i < groupArray.length; i++){
        let person = groupArray[i].split("");
        for(let j = 0; j < person.length; j++){
            if(uniqueValues[person[j]] !== person[j]){
                uniqueValues[person[j]] = person[j]
            }            
        }
    }

    let matching = Object.assign({}, uniqueValues)

    if(groupArray.length > 1){
        for(let k = 0; k < groupArray.length; k++ ){
            for (const letter in matching) {
                if(!groupArray[k].includes(letter) || !matching[letter]){
                    // console.log(k, letter)
                    delete matching[letter]

                }
            }
        }
        
    }

    return [Object.keys(uniqueValues).length, Object.keys(matching).length];
}

const countYeses = (groupsArray) => {
    let countUnique = 0;
    let countMatching = 0
    for(let i = 0; i < groupsArray.length; i++){
        countUnique += countUniqueAndMatchingValues(groupsArray[i])[0]
        countMatching += countUniqueAndMatchingValues(groupsArray[i])[1]
    }
    console.log(countUnique, countMatching)
    return [countUnique, countMatching];
}

// Part 1 & 2
countYeses(groups);