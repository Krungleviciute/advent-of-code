import data from './input.js';

let seats = data.split("\n");

// -- If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
// -- If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
// Otherwise, the seat's state does not change.

// Part 1
const applyRules = (seatsArray) => {
    let hasSeatChanged = false;
    let updatedSeats = [];

    seatsArray.forEach((line, indexY) => {
        let updatedRow = "";

        [...line].forEach((seat, indexX) => {

            let occupied = 0;

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if((i != 0 || j != 0)
                            && (indexY + i) >= 0
                            && (indexY + i) < seatsArray.length
                            && (indexX + j) >= 0
                            && (indexX + j) < line.length
                            && seatsArray[indexY + i][indexX+j] === "#"){
                        occupied++;
                    }
                    
                }
                
            }

            if(seat === "L" && occupied === 0){
                updatedRow += "#";
                hasSeatChanged = true;
            } else if(seat === "#" && occupied >= 4){
                updatedRow += "L";
                hasSeatChanged = true;
            } else {
                updatedRow += seat;
            }

        })

        updatedSeats = [...updatedSeats, updatedRow]
    });

    mockup = updatedSeats

    return hasSeatChanged;
}


// Part 2
const applyNewRules = (seatsArray) => {
    let hasSeatChanged = false;
    let updatedSeats = [];

    seatsArray.forEach((line, indexY) => {
        let updatedRow = "";

        [...line].forEach((seat, indexX) => {

            let occupied = 0;

            const directions = [
                {x: 1, y:0}, {x: -1, y:0},
                {x: 1, y:1}, {x: -1, y:-1},
                {x: 1, y:-1}, {x: -1, y:1},
                {x: 0, y:1}, {x: 0, y:-1}
            ];

            directions.forEach(({x: dx, y: dy}) => {
                let posX = indexX + dx; 
                let posY = indexY + dy;
                while(posX >= 0 
                        && posY >= 0 
                        && posX < line.length 
                        && posY < seatsArray.length
                    ){
                        if(seatsArray[posY][posX] === "#"){
                            occupied++;
                            break;
                        }
                        if(seatsArray[posY][posX] === "L"){
                            break;
                        }
                        posX += dx;
                        posY += dy;
                }
            })

            if(seat === "L" && occupied === 0){
                updatedRow += "#";
                hasSeatChanged = true;
            } else if(seat === "#" && occupied >= 5){
                updatedRow += "L";
                hasSeatChanged = true;
            } else {
                updatedRow += seat;
            }

        })

        updatedSeats = [...updatedSeats, updatedRow]
    });
    
    seats = updatedSeats

    return hasSeatChanged;
}

const display = (seatsArray) => {
    seatsArray.forEach(line => {
        console.log(line)
    });
}


while(applyNewRules(seats)){
    
}


const getOccupiedSeats = (finalArray) => {
    let occupied = 0;
    finalArray.forEach((line) => {
        [...line].forEach((seat) => {
            seat === "#" && occupied++
        })
    })

    console.log(occupied)
}

getOccupiedSeats(seats);