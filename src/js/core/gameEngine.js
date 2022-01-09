// predefined game modes
const mode3Csv =
    `Forbice,Sasso,Carta
    Forbice,0,1,2
    Sasso,2,0,1
    Carta,1,2,0`;

const mode5Csv =
    `Sasso,Carta,Forbice,Spock,Lucertola
Sasso,0,1,1,2,2
Carta,2,0,1,2,1
Forbice,1,2,0,1,2
Spock,2,1,2,0,1
Lucertola,1,2,1,2,0`;

const mode9Csv =
    `Forbice,Fuoco,Sasso,Pistola,Acqua,Aria,Carta,Spugna,Umano
Forbice,0,1,1,1,1,2,2,2,2
Fuoco,2,0,1,1,1,1,2,2,2
Sasso,2,2,0,1,1,1,1,1,2
Pistola ,2,2,2,0,1,1,1,1,2
Acqua,2,2,2,2,0,1,1,1,1
Aria,1,2,2,2,2,0,1,1,1
Carta,1,1,2,2,2,2,0,1,1
Spugna,1,1,1,2,2,2,2,0,1
Umano,1,1,1,1,2,2,2,2,0`;

const mode15Csv =
    `Forbice,Fuoco,Sasso,Pistola,Fulmine,Diavolo,Drago,Acqua,Aria,Carta,Spugna,Lupo,Albero,Umano,Serpente
Forbice,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2
Fuoco,2,0,1,1,1,1,1,1,1,2,2,2,2,2,2
Sasso,2,2,0,1,1,1,1,1,1,1,2,2,2,2,2
Pistola ,2,2,2,0,1,1,1,1,1,1,1,2,2,2,2
Fulmine,2,2,2,2,0,1,1,1,1,1,1,1,2,2,2
Diavolo,2,2,2,2,2,0,1,1,1,1,1,1,1,2,2
Drago,2,2,2,2,2,2,0,1,1,1,1,1,1,1,2
Acqua,2,2,2,2,2,2,2,0,1,1,1,1,1,1,1
Aria,1,2,2,2,2,2,2,2,0,1,1,1,1,1,1
Carta,1,1,2,2,2,2,2,2,2,0,1,1,1,1,1
Spugna,1,1,1,2,2,2,2,2,2,2,0,1,1,1,1
Lupo,1,1,1,1,2,2,2,2,2,2,2,0,1,1,1
Albero,1,1,1,1,1,2,2,2,2,2,2,2,0,1,1
Umano,1,1,1,1,1,1,2,2,2,2,2,2,2,0,1
Serpente,1,1,1,1,1,1,1,2,2,2,2,2,2,2,0`;


/**
 * This function returns the bidimensional array used to calculate the result based on the current mode
 * @returns bidimensional array rapresenting the csv file 
 */
const getModeTable = () => {
    const getTableFromCsv = (csv) => csv.split("\n").map(function (row) { return row.split(","); });
    switch (mode) {
        case "3": return getTableFromCsv(mode3Csv);
        case "5": return getTableFromCsv(mode5Csv);
        case "9": return getTableFromCsv(mode9Csv);
        case "15": return getTableFromCsv(mode15Csv);
        default: return getTableFromCsv(mode)
    }
}
/**
 * used to generato dynamically choice buttons
 * @returns array of all possible choices for the current mode
 */
const getModeChoices = () => {
    return getModeTable()[0];
}

/**
 * this function generates the computer choice and caluclates who is the winner, the redirects the user to the result page
 * @param {*} $event mouseclick dom event
 */
const handleChoiceSubmit = ($event) => {
    const randomValue = Math.floor(Math.random() * (getModeChoices().length - 1 + 1) + 1);
    const table = getModeTable()
    const result = parseInt(table[getModeChoices().indexOf($event.target.innerText) + 1][randomValue]);
    let redirectUrl = "./feedback.html?";
    switch (result) {
        case 0: {
            redirectUrl += `result=draw&`;
            break;
        }
        case 1: {
            redirectUrl += `result=loss&`;
            break;
        }
        case 2: {
            redirectUrl += `result=win&`;
            break;
        }
    }
    redirectUrl += `user=${event.target.innerText}&pc=${table[randomValue][0].trim()}`;
    window.location.href = redirectUrl;
}

/**
 * this function create and appends buttons to a given div, used to generato dynamically choice buttons
 * @param {*} label label of the button
 * @param {*} div where to place the buttons
 */
const appendChoiceButtonToChild = (label, div) => {
    const button = document.createElement("BUTTON");
    button.innerHTML = label;
    button.classList = "btn btn-primary m-1";
    button.onclick = handleChoiceSubmit;
    div.appendChild(button);
}

let mode = new URLSearchParams(window.location.search).get("mode");

if (![3, 5, 9, 15].includes(parseInt(mode))) {
    // custom mode
    mode = mode.replaceAll("|", "\n");
    moves = getModeChoices().length;
    document.getElementById("innerExplanation").innerHTML = `Hai scelto una modalità personalizzata, ${moves} mosse possibili`;
} else {
    // existing mode
    moves = mode;
    document.getElementById("innerExplanation").innerHTML = `Hai scelto la modalità con ${mode} mosse possibili`;
}

const choices = getModeChoices(mode);
const dynamicButtonsDiv = document.getElementById("dynamicButtonsDiv");
for (let i = 0; i < parseInt(moves); i++) {
    appendChoiceButtonToChild(choices[i], dynamicButtonsDiv);
}