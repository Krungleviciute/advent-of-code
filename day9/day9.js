import data from './input.js';

const inputData = data.split("\n");

const preamble = 25;
const minPairsOfNumber = 2;

const findNumber = (inputArray) => {
    let foundValue = 0;
    let indexOfFoundValue = 0;
    for(let i = preamble; i < inputArray.length; i++){
        if(!sumNumbers(inputArray, inputArray[i], i - preamble, i)){
            foundValue = inputArray[i];
            indexOfFoundValue = i;
            break
        };
    }
    console.log("Value without sum: ", inputArray[indexOfFoundValue])
    return indexOfFoundValue;
}

const sumNumbers = (input, sum, startingNumber, endingNumber) => {
    let sumPairs = 0;
    for(let i = startingNumber; i < endingNumber; i++){
        for(let j = startingNumber; j < endingNumber; j++){
            if(Number(input[i]) + Number(input[j]) === Number(sum) && Number(input[i]) !== Number(input[j])){
                sumPairs++;
            } 
        }
    }
    return sumPairs === 0 ? false : true;
}

const findSumPairs = (num, arrayOfNumbers) => {
    const index = findNumber(arrayOfNumbers);
    const sumNumber = Number(arrayOfNumbers[index]);

    let sumPairsArray = [];
    let pairs = num;
    let predictedSum = 0;
    let min = 0;
    let max = 0;

    for(let i = 0; i < index; i++){
        for(let j = 0; j < pairs; j++){
            predictedSum += Number(arrayOfNumbers[i + j]);
            sumPairsArray = [...sumPairsArray, Number(arrayOfNumbers[i + j])]
        }
        
        if(!(predictedSum === sumNumber)){
            predictedSum = 0;
            sumPairsArray = [];
        } else {
            break;
        }
        
    }

    if(!(predictedSum === sumNumber)){
        num++
        findSumPairs(num, inputData);
    } else {
        min = Math.min.apply(null, sumPairsArray);
        max = Math.max.apply(null, sumPairsArray);
        console.log("Sum of min and max is:", min + max)
    }

}

// Part 1
findNumber(inputData);

// Part 2
findSumPairs(minPairsOfNumber, inputData);