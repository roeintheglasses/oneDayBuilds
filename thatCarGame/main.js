const startButton = document.querySelector(".startBtn");
const gameStats = document.querySelector(".stats");
const winAudio = new Audio("https://cdn.discordapp.com/attachments/674654575285764096/753569472643596308/Audio.mp3");
const loseAudio = new Audio("https://cdn.discordapp.com/attachments/674654575285764096/753609461809283142/22_Player_Down.mp3");
const endGameStats = document.querySelector(".endgame");

const winImg = document.createElement('img');
winImg.src = 'https://i.imgur.com/mrudmOz.gif';

const loostImg = document.createElement('img');
loostImg.src = "https://www.unibetcommunity.com/t5/image/serverpage/image-id/43443i4D81208C5998A5F9/image-size/large/is-moderation-mode/true?v=1.0&px=999"



startButton.addEventListener("click", startGame);



function startGame() {
    loseAudio.pause();
    loseAudio.currentTime = 0;
    gameStats.innerHTML = '';
    endGameStats.innerHTML = '';
    startButton.innerHTML = "Retry";
    let gameStarted = document.createElement("P");
    let node = document.createTextNode("Game Started !!");
    gameStarted.appendChild(node);
    gameStats.appendChild(gameStarted);

    // setting up variables
    const distance = 100;
    let petrol = 30;
    let distanceCovered = 0;
    let i = 1;

    /* generating pumps */
    let pumps = generatePetrolPumps();
    let cuts = generateShortcuts();

    while (distance > distanceCovered) {
        let move = document.createElement("P");

        let randomMove = generateRandomNumber(0, 6);
        petrol -= randomMove;

        distanceCovered += randomMove;

        if (pumps.includes(distanceCovered)) {
            petrol += 20;
            let move = document.createElement("P");
            let node = document.createTextNode("Yay! You found a petrol pump. Filling up the tank.");
            move.appendChild(node);
            gameStats.appendChild(move);
        }

        if (cuts.includes(distanceCovered)) {
            distanceCovered += 15;
            let move = document.createElement("P");
            let node = document.createTextNode("Yay! You found a shortcut, It saved you 15 KMs");
            move.appendChild(node);
            gameStats.appendChild(move);
        }


        /* looseCondition */
        if (petrol <= 0) {
            loseState(distanceCovered, i);
            break;
        }

        /* win condition */
        if (distanceCovered >= 100) {
            winState(distanceCovered, petrol, i);
            break;
        }

        /* making moves */

        let node = document.createTextNode("Move (" + i + ") : Car at  " + distanceCovered +
            "  Km, petrol remaining  :  " +
            petrol + "L");
        move.appendChild(node);
        gameStats.appendChild(move);
        i += 1;
    }
}

function generateRandomNumber(min, max) {
    return (min + Math.ceil(Math.random() * (max - min)));
}


function generatePetrolPumps() {
    let pumps = []
    let lastPumpLocation = 0;
    let petrolLimit = 0;

    // filling petrol pumps
    for (let j = 0; j < 5; j++) {
        petrolLimit += 20;
        let pumpLocation = generateRandomNumber(lastPumpLocation, petrolLimit);
        lastPumpLocation = pumpLocation;
        pumps.push(pumpLocation);
    }

    let petrolPumpsPara = document.createElement("P");
    let pumpTextNode = document.createTextNode("Petrol Pumps Generated at :  ");
    petrolPumpsPara.appendChild(pumpTextNode);
    pumps.forEach(pump => {
        let pumpLocationNode = document.createTextNode(pump + "   km   ");
        petrolPumpsPara.appendChild(pumpLocationNode);
    })

    gameStats.appendChild(petrolPumpsPara);

    return pumps;
}

function generateShortcuts() {
    let cuts = []

    let cutLocation1 = generateRandomNumber(0, 50);
    let cutLocation2 = generateRandomNumber(51, 100);
    cuts.push(cutLocation1);
    cuts.push(cutLocation2);

    let cutsPara = document.createElement("P");
    let cutsNode = document.createTextNode("Two Shortcuts Generated at :  ");
    cutsPara.appendChild(cutsNode);
    cuts.forEach(cut => {
        let cutsNode = document.createTextNode(cut + "   km   ");
        cutsPara.appendChild(cutsNode);
    })

    gameStats.appendChild(cutsPara);

    return cuts;
}

function winState(distanceCovered, petrol, moveNo) {
    let move = document.createElement("P");
    let node = document.createTextNode("Move (" + moveNo + ") :  Car at  " + distanceCovered +
        "  Km, petrol remaining  :  " + petrol + " reached");
    move.appendChild(node);
    gameStats.appendChild(move);
    let winMsgTxt = document.createTextNode("VICTORY!!");
    let winMsg = document.createElement("P");
    winMsg.appendChild(winMsgTxt);
    endGameStats.appendChild(winMsg);
    endGameStats.appendChild(winImg);
    winAudio.play();
}


function loseState(distanceCovered, moveNo) {
    let move = document.createElement("P");
    let node = document.createTextNode("Move (" + moveNo + ") :  Car at  " + distanceCovered +
        "  Km, petrol remaining  :  0,  game over !!");
    move.appendChild(node);
    gameStats.appendChild(move);

    let looseMsgTxt = document.createTextNode("Your car ran out of petrol.");
    let looseMsg = document.createElement("P");
    looseMsg.appendChild(looseMsgTxt);
    endGameStats.appendChild(looseMsg);
    endGameStats.appendChild(loostImg);
    loseAudio.play();
}
