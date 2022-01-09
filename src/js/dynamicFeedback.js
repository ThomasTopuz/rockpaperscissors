const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let titleText = "";
let videoUrl = "../assets/feedback/";

switch (params.result) {
    case "win": {
        titleText = "Hai Vinto!";
        videoUrl += "win.mp4";
        break;
    }
    case "loss": {
        titleText = "Hai perso :(";
        videoUrl += "lost.mp4";
        break;
    }
    case "draw": {
        titleText = "Pareggio";
        videoUrl += "draw.mp4";
        break;
    }
    default: window.location.href = "./index.html"
}

document.getElementById("titleText").innerHTML = titleText;
document.getElementById("explanationText").innerHTML = `Hai scelto ${params.user}, il computer ha scelto ${params.pc}!`;
document.getElementById("resultVideoSrc").setAttribute("src", videoUrl);
document.getElementById("resultVideo").load();
