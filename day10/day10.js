import data from './input.js';

const joltsData = data.split("\n").sort((a, b) => a - b).map(a => +a);

const findDifferences = (joltsArray) => {
    let selectedAdapter = 0;
    let oneDifference = 0;
    let threeDifference = 0;
    let arrangements = []
    for(let i = 0; i < joltsArray.length; i++){
        if(selectedAdapter + 1 === joltsArray[i]){
            selectedAdapter++;
            oneDifference++;
            
        } else if(selectedAdapter + 1 === joltsArray[i]){
            selectedAdapter += 2;
        } else if(selectedAdapter + 3 === joltsArray[i]){
            selectedAdapter += 3;
            threeDifference++;
        }

        arrangements = [...arrangements, selectedAdapter ];

        if(i === (joltsArray.length - 1)){
            selectedAdapter += 3;
            threeDifference++;
        }
        
    }

    arrangements = [...arrangements, selectedAdapter ];

    console.log(oneDifference, threeDifference, oneDifference*threeDifference, arrangements);

    return {differenceOfOne: oneDifference, differenceOfThree: threeDifference, multiply: oneDifference * threeDifference, arrangementsArr: arrangements}
}

const findNumberOfDifferentConfigs = joltsArray => {

    joltsArray = [0, ...joltsArray, (joltsArray[joltsArray.length - 1] + 3)]
  
    let repeatingTimesInARow = 0;
    let combinations = 1;

    for (let i = 0; i < joltsArray.length; i++) {
      if (joltsArray[i] - joltsArray[i - 1] === 1 && joltsArray[i + 1] - joltsArray[i] === 1) {
        repeatingTimesInARow++;
      } else {
        if (repeatingTimesInARow === 1) {
            
            combinations *= 2
        };
        if (repeatingTimesInARow === 2) {

            combinations *= 4

        };
        if (repeatingTimesInARow === 3) {
            combinations *= 7
        };
        repeatingTimesInARow = 0;
      }
    }
    return combinations;
};

console.log(findNumberOfDifferentConfigs(joltsData))
