import data from './input.js';

const movement = data.split(/\r?\n/)

// F10
// N3
// F7
// R90
// F11

//if R moves forward, if Left moves backward
const cardinals = new Set(["N", "E", "S", "W"]);

const getManhattanDistance = () => {
    const commands = movement.map(parseCommand);
    const cardinalCommands = commands.filter(command => cardinals.has(command.type))
    const rotationCommands = commands.filter(command => !cardinals.has(command.type))

    const cardinalDistance = calculateCordinals(cardinalCommands);
    const rotationDistance = calculateRotation(rotationCommands);

    const deltaX = Math.abs(cardinalDistance.x + rotationDistance.x);
    const deltaY = Math.abs(cardinalDistance.y + rotationDistance.y);

    return deltaX + deltaY;
};

const getManhattanDistance2 = () => {
    const commands = movement.map(parseCommand);
    const { x, y } = calculate(commands);
    return Math.abs(x) + Math.abs(y);
}



//         0
//         n
// 270 w       e 90
//         s
//        180 

const calculate = (commands) => {
    const ship = { x: 0, y: 0 };
    let waypoint = { x: 10, y: 1 };

    for(let command of commands){
        const { type, val } = command;

        if (type === 'N') {
            waypoint.y += val;
        } else if (type === 'S') {
            waypoint.y -= val;
        } else if (type === 'E') {
            waypoint.x += val;
        } else if(type === 'W'){
            waypoint.x -= val;
        } else if(type === "L"){
            const angle = degreesToRadians(val);
            waypoint = rotatePoint(waypoint, angle);
        } else if(type === "R"){
            const angle = degreesToRadians(val);
            waypoint = rotatePoint(waypoint, -angle);
        } else {
            ship.x += waypoint.x * val;
            ship.y += waypoint.y * val;
        }
    }
    console.log(ship)
    return ship;
}

const rotatePoint = (point, angle) => {
    const { x, y } = point;
    const newX = Math.round((x * Math.cos(angle)) - (y * Math.sin(angle)));
    const newY = Math.round((y * Math.cos(angle)) + (x * Math.sin(angle)));
    return { x: newX, y: newY }
}

const degreesToRadians = (deg) =>  deg * (Math.PI / 180);


const calculateRotation = (commands) => {
    let ship = {x: 0, y: 0, angle: 90};

    for(let command of commands) {
        const { type, val } = command;
        if(type === "R"){
            ship.angle = (ship.angle + val) % 360;
        } else if(type === "L"){
            ship.angle = (360 + ship.angle - val) % 360;
        } else {
            if(ship.angle === 0){
                ship.y += val;
            } else if(ship.angle === 180){
                ship.y -= val
            } else if(ship.angle === 90){
                ship.x += val
            } else if(ship.angle === 270){
                ship.x -= val
            }
        }
    }

    return ship
}

calculateRotation([{type: "L", val: 270}])

const calculateCordinals = (commands) => {
    const ship = { x: 0, y: 0 };

    for (let command of commands){
        const { type, val } = command;

        if (type === 'N') {
            ship.y += val;
        } else if (type === 'S') {
            ship.y -= val;
        } else if (type === 'E') {
            ship.x += val;
        } else if(type === 'W'){
            ship.x -= val;
        }
    }

    return ship;
}

const parseCommand = (line) => {
    const type = line[0];
    const val = Number(line.slice(1))

    return { type, val }
}

console.log(getManhattanDistance());
console.log("manhatan dist. 2 ", getManhattanDistance2())
