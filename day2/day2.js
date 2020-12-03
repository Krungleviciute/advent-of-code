// Returns Promise
const readFile = async () => {
    let arrayData = [];
    const response = await fetch('./day2/input.txt');
    const data = await response.text();
    arrayData = data.split('\n');

    return arrayData;
}
 
// Returns Promise
const buildObject = async (array) => {
    let inputArray = await readFile();
    let passwordsObj = {};

    inputArray.forEach((string) => {
        let passwordPolicy = string.split(" ");
        let minmax = passwordPolicy[0].split('-')
        passwordsObj[passwordPolicy[2].split('\r')[0]] = {
            letter: passwordPolicy[1].split(":")[0],
            min: minmax[0],
            max: minmax[1]
        }
    });
    return passwordsObj;
}

// Part 1
const scanPasswordsForMatch = (passwords) => {
    let correctPasswords = [];
    
    for (const pass in passwords) {
        let policyLetter = passwords[pass].letter;
        let minValue = passwords[pass].min;
        let maxValue = passwords[pass].max;
        let matchingLetters = pass.match(new RegExp(policyLetter, "g"));
        
        if(matchingLetters && matchingLetters.length >= minValue && matchingLetters.length <= maxValue){
            correctPasswords = [...correctPasswords, pass];
        }
    }

    return correctPasswords;
}

// Part 2
const passwordCheckForPosition = (passwords) => {
    let correctPasswords = [];
    for (const pass in passwords) {
        let passwordToCheck = pass.split("");
        let policyLetter = passwords[pass].letter;
        let minValue = passwords[pass].min;
        let maxValue = passwords[pass].max;
        if(passwordToCheck[minValue - 1] === policyLetter && passwordToCheck[maxValue - 1] === policyLetter){
            continue;
        }
        if(passwordToCheck[minValue - 1] === policyLetter || passwordToCheck[maxValue - 1] === policyLetter){
            correctPasswords = [...correctPasswords, pass];
        }
    }
    return correctPasswords.length
};