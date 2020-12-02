import numbers from './data.js';

const goalSum = 2020;

const createObjectFromArray = (arr) => {
    let obj = {};
    for(let i = 0; i < arr.length; i++){
        let num = arr[i];
        obj[num] = i; 
    }
    return obj;
}

// Find numbers for adding two numbers
const twoNumbersSum = (arr, targetSum) => {
    let newobj = createObjectFromArray(arr);
    for(let i = 0; i < arr.length; i++){
        let subtraction = targetSum - arr[i];
        if(newobj.hasOwnProperty(subtraction)){
            return subtraction * arr[i];
        }
    }
}

const threeNumbersSum = (arr, targetSum) => {
    let i = 0;
    
    while(i < arr.length){

        let currentNumber = arr[i];
        let secondAndThirdNumSum = targetSum - currentNumber;
        let secondAndThirdNumMultiply = twoNumbersSum(arr.slice(0,i).concat(arr.slice(i+1)), secondAndThirdNumSum)
        
        if(secondAndThirdNumMultiply == undefined){
            i++
        } else {
            return currentNumber * secondAndThirdNumMultiply;
        }
    }
}

console.log(threeNumbersSum(numbers, goalSum));




