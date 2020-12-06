import boardingInput from './input.js';

const boardingPasses = boardingInput.split(/\r?\n/);
const seatIDMultiplyer = 8;

let minRow = 0;
let maxRow = 127; 
let minColumn = 0;
let maxColumn = 7;
let seatIDs = [];

const getkRowAndColumn = (value) => {
    minRow = 0;
    maxRow = 127;
    minColumn = 0;
    maxColumn = 7;
    
    for(let i = 0; i < value.length; i++){
        calculateRowsAndColumns(value.charAt(i));
    }
    return [maxRow, maxColumn];
}

const calculateSeatID = (row, column) =>  (row * seatIDMultiplyer) + column

const getAllSeatIDs = (boradingArray) => {
    let seatAndRow = [];
    let seatID = 0
    for(let i = 0; i < boradingArray.length; i++){
        seatAndRow = getkRowAndColumn(boradingArray[i]);
        seatID = calculateSeatID(seatAndRow[0], seatAndRow[1]);
        seatIDs = [...seatIDs, seatID];
    }

    return seatIDs;
}

const getMaxSeatID = (seatIDArray) => {
    return Math.max.apply(null, seatIDArray);
}

const getMissingID = (seatsIDsArray) => {
    let sortedArrASC = seatsIDsArray.sort((a, b) => a - b);
    let missingID = 0;
    for(let i = 0; i < sortedArrASC.length; i++){
        if(sortedArrASC[i] - sortedArrASC[i - 1] !== 1 && sortedArrASC[i - 1] !== undefined){
            if(sortedArrASC[i] - 1 === sortedArrASC[i - 1] + 1){
                return missingID = sortedArrASC[i] - 1;
            }
            
        }
    }

}

const calculateRowsAndColumns = (letter) => {
    let difference = 0
    switch(letter){
        case ("F"):
            difference = Math.floor((maxRow - minRow) / 2);
            maxRow = minRow + difference;
            break;
        case ("B"):
            difference = Math.ceil((maxRow - minRow) / 2);
            minRow += difference;
            break
        case "L": 
            difference = Math.floor((maxColumn - minColumn) / 2);
            maxColumn = minColumn + difference;
            break;
        case "R":
            difference = Math.ceil((maxColumn - minColumn) / 2);
            minColumn += difference;
            break
    }
}

getAllSeatIDs(boardingPasses); 

// // Part 1 Answer
getMaxSeatID(seatIDs);

// Part 2 Answer
getMissingID(seatIDs);




