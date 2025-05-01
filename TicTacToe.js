let boxes = document.querySelectorAll(".box");
let startGameBtn = document.querySelector(".startGameBtn");
let player1Name = document.querySelector("player1Name");
let player2Name = document.querySelector("player2Name");
let player1NameInput = document.getElementById("player1name");
let player2NameInput = document.getElementById("player2name");
let currentTurnDisplay = document.getElementById("currentTurn");

let turnO = true;
let players = { player1: "", player2: "" }

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const backGame = () => {
    window.location.reload();
};

function remove() {
    document.querySelector(".playerInform").style.display = "none";
}

const continueGame = () => {
    turnO = true;
    enableBoxes();
    currentTurnDisplay.textContent = `${players.player1}'s turn (O)`;
    currentTurnDisplay.classList.remove("hide");
}

const startGame = () => {

    players.player1 = player1NameInput.value;
    players.player2 = player2NameInput.value;

    if (players.player1 == "") {
        players.player1 = "Player1";
    }
    if (players.player2 == "") {
        players.player2 = "Player2";
    }
    document.getElementById("playerInform").classList.add("hide");
    startGameBtn.classList.add("hide");
    document.getElementById("GameOperation").classList.remove("hide");
    currentTurnDisplay.classList.remove("hide");
    enableBoxes();

    currentTurnDisplay.textContent = `${players.player1}'s turn (O)`;
};

//Add Event When Click using eventListener
startGameBtn.addEventListener("click", startGame);

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#ff5733";
            turnO = false;
            currentTurnDisplay.textContent = `${players.player2}'s turn (X)`;
        }
        else {
            box.innerText = "X";
            box.style.color = "#C70039";
            turnO = true;
            currentTurnDisplay.textContent = `${players.player1}'s turn (O)`;
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    let isDraw = true;

    for (let i of winPatterns) {
        let position1 = boxes[i[0]].innerText;
        let position2 = boxes[i[1]].innerText;
        let position3 = boxes[i[2]].innerText;

        if (position1 !== "" && position2 !== "" && position3 !== "") {
            if (position1 === position2 && position2 === position3) {
                showWinner(position1);
                return;
            }
        }
    }

    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (isDraw) {
        showDraw();
    }
};

const showWinner = (winner) => {
    let winnerName = winner === "O" ? players.player1 : players.player2;
    currentTurnDisplay.classList.add("hide");

    if (winner === "O") {
        Swal.fire({
            title: `Congratulations, ${winnerName}`,
            text: "Cheers to a game well played and a win well deserved!",
            width: 500,
            padding: "3em",
            color: "#716add",
            background: "#fff ",
            backdrop: `
              rgba(0,0,123,0.4)
              left top
              no-repeat
            `,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Continue Game",
            cancelButtonText: "&laquo; Back",
            customClass: {
                confirmButton: 'custom-confirm-button-class',
                cancelButton: 'custom-cancel-button-class'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                continueGame();
            }
            else {
                backGame();
            }
        });
    }
    else {
        Swal.fire({
            title: `Congratulations, ${winnerName}`,
            text: "Cheers to a game well played and a win well deserved!",
            width: 500,
            padding: "3em",
            color: "#716add",
            background: "#fff ",
            backdrop: `
              rgba(0,0,123,0.4)
              left top
              repeat
            `,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Continue Game",
            cancelButtonText: "&laquo; Back",
        }).then((result) => {
            if (result.isConfirmed) {
                continueGame();
            }
            else {
                backGame();
            }
        });
    }

    disableBoxes();
};

const showDraw = () => {
    Swal.fire({
        title: "<strong>Opps, Game Draw!!</strong>",
        text: "The game has ended in a draw, a testament to both players' skills!",
        icon: "info",
        iconColor: "red",
        showCancelButton: true,
        showConfirmButton: true,
        focusConfirm: true,
        confirmButtonText: "Continue Game",
        cancelButtonText: "&laquo; Back",
    }).then((result) => {
        if (result.isConfirmed) {
            continueGame();
        }
        else {
            backGame();
        }
    });

    currentTurnDisplay.classList.add("hide");
    // continueBtn.classList.remove("hide");
    // backBtn.classList.remove("hide");
    disableBoxes();
};