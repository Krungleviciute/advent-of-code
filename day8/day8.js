import data from './input.js';

const accData = data.split("\n").map(instruction => {
    let devideInstruction = instruction.split(" ");
    return {direction: devideInstruction[0], value: Number(devideInstruction[1])}
});

let replace = {
    nop: 'jmp',
    jmp: 'nop',
}

const findAccumulator = (arrayData) => {
    let visitedIndexes = [];
    let currentValue = arrayData[0];
    let currentIndex = 0;
    let accumulator = 0;

    while(currentValue){
        if(visitedIndexes.includes(currentIndex)){
            return {accumulator, failed: true}
        }
        visitedIndexes = [...visitedIndexes, currentIndex];

        switch(currentValue.direction){
            case "nop":
                currentIndex++;
                break
            case "jmp":
                currentIndex += currentValue.value;
                break;
            case "acc":
                currentIndex++;
                accumulator += currentValue.value
                break;
            default:
                break;
        }
        currentValue = arrayData[currentIndex];

    }
    return {accumulator, failed: false}
}

const changeInstructions = (arrayData) => {
    let result = { failed: true}
    for(let i = 0; i < arrayData.length; i++){
        let copyData = [...arrayData];
        if(copyData[i].direction === "nop"){
            copyData[i] = {...copyData[i], direction: replace.nop}
        }

        if(copyData[i].direction === "jmp"){
            copyData[i] = {...copyData[i], direction: replace.jmp}
        }

        if(result.failed){
            result = findAccumulator(copyData)
        } else {
            break;
        }
    }
    return result
}

// Part 1
findAccumulator(accData);

// part 2
changeInstructions(accData)
