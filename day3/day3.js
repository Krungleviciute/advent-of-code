const mockup = [
    ".##.#.........#.....#....#...#.",
    ".#.#.#...#.......#.............",
    "......#..#....#.#...###.......#",
    ".......###......#.....#..##..#.",
    "..#...##.......#.......###.....",
    "....###.#....###......#....#..#",
    "......#..#....#...##...........",
];

const slopes = [
    [1,1],
    [3,1],
    [5,1],
    [7,1],
    [1,2]
];

const readFile = async () => {
    let inputArray = [];
    const response = await fetch('./day3/input.txt');
    const data = await response.text();
    
    inputArray = data.split('\n');
    return inputArray;
};

// Part 1   (returns promise)
const countTrees = async (moveRight, moveDown) => {
    const trailArray = await readFile();
    let encounteredTrees = 0;
    let currentPosition = 0;

    for(let i = 0; i < trailArray.length; i += moveDown ){
        
        if(trailArray[i].charAt(currentPosition) === "#"){
            encounteredTrees += 1;
        }

        currentPosition += moveRight;

        if(currentPosition > 30){
            currentPosition -= 31;
        }
    }
    return encounteredTrees;
    
};

// Part 2 (returns promise)
const multiplyTreeCount = async(movesArray) => {
    let countedTrees = 0;
    let multiplication = 1;

    for(let i = 0; i < movesArray.length; i++){
        countedTrees = await countTrees(movesArray[i][0], movesArray[i][1]);
        multiplication *= countedTrees;
    }

    return multiplication;
}
