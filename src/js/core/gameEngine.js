const queryString = window.location.search;
const mode = parseInt(new URLSearchParams(window.location.search).get("mode"));

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


const getModeTable = () => {
    const getTableFromCsv = (csv) => csv.split("\n").map(function (row) { return row.split(","); });
    switch (mode) {
        case 3: return getTableFromCsv(mode3Csv);
        case 5: return getTableFromCsv(mode5Csv);
        case 9: return getTableFromCsv(mode9Csv);
    }
}

const getModeChoices = () => {
    return getModeTable()[0];
}

const handleChoiceSubmit = ($event) => {
    const randomValue = Math.floor(Math.random() * (mode - 1 + 1) + 1);
    const table = getModeTable()
    const result = parseInt(table[getModeChoices().indexOf($event.target.innerText) + 1][randomValue]);
    switch (result) {
        case 0: alert(`Pareggio, hai scelto ${$event.target.innerText} e il computer ha scelto ${table[randomValue][0]}`); break
        case 1: alert(`Sconfitta, hai scelto ${$event.target.innerText} e il computer ha scelto ${table[randomValue][0]}`); break
        case 2: alert(`Vittoria, hai scelto ${$event.target.innerText} e il computer ha scelto ${table[randomValue][0]}`);
    }
}

const appendChoiceButtonToChild = (label, div) => {
    const button = document.createElement("BUTTON");
    button.innerHTML = label;
    button.classList = "btn btn-dark m-1";
    button.onclick = handleChoiceSubmit;
    div.appendChild(button);
}


if ([3, 5, 9, 15].includes(mode)) {
    // predefined mode
    document.getElementById("modeKey").innerHTML = mode;
    const choices = getModeChoices(mode);
    const dynamicButtonsDiv = document.getElementById("dynamicButtonsDiv");
    for (let i = 0; i < mode; i++) {
        appendChoiceButtonToChild(choices[i], dynamicButtonsDiv);
    }
} else {
    // advanced mode, play with numbers
}
