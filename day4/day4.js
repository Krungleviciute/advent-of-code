// cid is optional
const requirements = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]

//Returns promise
const readFile = async () => {
    let passportsData = [];
    const response = await fetch('./day4/input.txt');
    const data = await response.text();
    passportsData = data.split('\r\n\r\n');
    return passportsData;
}

const checkRequirements = (passportData) => {
    let matchedRequirements = 0;
    for(let i = 0; i < requirements.length; i++){

        // Checks if all required fields are matching
        if(passportData.includes(requirements[i])){
            matchedRequirements++
        }
    }
    // if all fields matching then checking the rules for further validation
    return matchedRequirements === requirements.length && checkRulesForFields(passportData);
}

const checkRulesForFields = (passportData) => {
    let passData = passportData.split("\r\n");
    let passDataSplit = [];
    let validData = 0;

    // Devides array in key:value pairs 
    for(let i = 0; i < passData.length; i++ ){
        let splitArray = passData[i].split(" ");
        passDataSplit = passDataSplit.concat(splitArray)
    }

    passData = passDataSplit.filter(Boolean);

    // Checks validity for each field
    for(let j = 0; j < passData.length; j++){
        let property = passData[j].split(":");
        checkRules(property[0], property[1]) && validData++; 
    }

    return validData === passData.length ? true : false
}


const checkRules = (rule, value) => {
    const hairColor = /^[0-9a-f]{6}$/;
    const passportID = /^[0-9]{9}$/;
    switch(rule){
        case "byr":
            return (value.length === 4 && 1920 <= Number(value) && Number(value) <= 2002) ? true : false
        case "iyr":
            return (value.length === 4 && 2010 <= Number(value) && Number(value) <= 2020) ? true : false
        case "eyr":
            return (value.length === 4 && 2020 <= Number(value) && Number(value) <= 2030) ? true : false
        case "hgt":
            let height;
            if(value.includes("in")){
                height = value.split("in");
                return (59 <= Number(height[0]) && Number(height[0]) <= 76) ? true : false
            } else {
                height = value.split("cm");
                return (150 <= Number(height[0]) && Number(height[0]) <= 193) ? true : false
            }
        case "hcl":
            let hairClr = value.split("#")[1];
            return hairColor.test(hairClr);
        case "ecl":
            for(let i = 0; i < eyeColors.length; i++){
                if(value.indexOf(eyeColors[i]) > -1){
                    return true
                }
            }
        case "pid":
            return passportID.test(value);
        case  "cid":
            return true;
        default: 
            return;
    }

}

//Returns promise
const checkValidity = async () => {
    const passportsData = await readFile();
    let validDocuments = 0;

    // Iterates through all array and checks how many valid documents;
    for(let i = 0; i < passportsData.length; i++){
        checkRequirements(passportsData[i]) && validDocuments++;
    }
    console.log(validDocuments)
    return validDocuments;
}

checkValidity()


