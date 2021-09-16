const container = document.querySelector("#gameContainer");
const submitButton = document.querySelector("#button");
const winnerContainer = document.querySelector("#congratulations");
const winnerMessage = document.querySelector("#congratulations-text");
let playerOne;
let playerTwo;

const computer = (function() {
    const play = () => {

    }
    
    return {
        play, 
    }
})(); 

const Gameboard = (function() {
    let board = [["", "", ""],
        ["", "", ""],
        ["", "", ""]]; 
    const deleteDisplay = () => {
        while (container.firstChild) container.removeChild(container.lastChild);
    }
    const display = () => {
        deleteDisplay();
        for (let i = 0; i < board.length; i++) {
            for (let n = 0; n < board[i].length; n++) {
                let gameSquare = document.createElement("div");
                gameSquare.style.cssText = `align-items: center; border: 2px solid white; 
                    color: white; display: flex; font-size: 50px; 
                    height: 161px; width: 161px; justify-content: center`;
                gameSquare.textContent = board[i][n];
                gameSquare.setAttribute("data-group", i);     
                gameSquare.setAttribute("data-number", n);     
                gameSquare.addEventListener("click", () => {
                    while (!playerOne) {
                        alert("You have not submitted any players!");
                        return; 
                    }
                    if (!(board[gameSquare.dataset.group][gameSquare.dataset.number])) {
                        board[gameSquare.dataset.group][gameSquare.dataset.number] = Game.decideMarker(); 
                        display();
                    }
                    Game.checkWinner(); 
                })
                container.appendChild(gameSquare);
            }
        console.log("W");
        }
    }
    const removePieces = () => {
        for (let i = 0; i < 3; i++) {
            for (let n = 0; n < 3; n++) {
                board[i][n] = ""; 
            }
        }
        // Gameboard.board = board.map(group// Gameboard.board = board.map(group => group.map(val => val = ""));  
    }
    return {
        deleteDisplay,
        display, 
        removePieces,
        board,
    }
})();

const Game = (function() {
    let currentPlayer; 
    let playerOne; 
    let playerTwo; 
    const checkWinner = () => {
        const _congratulateWinners = () => {
            winnerContainer.style.cssText = "display: flex;";
            winnerMessage.textContent = `The winner is ${currentPlayer}.`; 
        }

        const declareTie = () => {
            winnerContainer.style.cssText = "display: flex;";
            winnerMessage.textContent = "No one wins.";
        }
        // check verticals and horizontals 
        for (let i = 0; i< Gameboard.board.length; i++) {
            if (Gameboard.board[i][0] === Gameboard.board[i][1] && Gameboard.board[i][1] === Gameboard.board[i][2] &&
                Gameboard.board[i][0] !== "") {
                _congratulateWinners(); 
                Gameboard.removePieces();
                Gameboard.display();
            } else if (Gameboard.board[0][i] === Gameboard.board[1][i] && Gameboard.board[1][1] === Gameboard.board[2][i] &&
                Gameboard.board[0][i] !== "") {
                _congratulateWinners();
                Gameboard.removePieces();
                Gameboard.display();
            } 
            if (Gameboard.board.every(array => array.every(val => val !== ""))) {
                declareTie();
                Gameboard.removePieces();
                Gameboard.display();
            }
        }
        if (((Gameboard.board[0][0] === Gameboard.board[1][1] && Gameboard.board[1][1] === Gameboard.board[2][2]) ||
            (Gameboard.board[2][0] === Gameboard.board[1][1] && Gameboard.board[1][1] === Gameboard.board[0][2])) &&
            Gameboard.board[1][1] !== "") { 
                _congratulateWinners();
                Gameboard.removePieces(); 
                Gameboard.display();
        }    
    }
    const setNames = () => {
        const playerOneName = document.querySelector("#player-one").value;
        const playerTwoName = document.querySelector("#player-two").value;
        while (playerOneName === "" || playerTwoName === "") {
            alert("Your players must have names!");
            return; 
        }
        playerOne = Player(playerOneName, "X");
        console.log(playerOne);
        playerTwo = Player(playerTwoName, "O");
        return {
            playerOne, 
            playerTwo,
        }
    }

    const decideMarker = () => {
        const flattenedArray = Gameboard.board.reduce((a, c) => a.concat(c));
        let playerOneMarks = flattenedArray.filter(val => val === "X").length; 
        let playerTwoMarks = flattenedArray.filter(val => val === "O").length; 
        if (playerOneMarks > playerTwoMarks) { 
            currentPlayer = playerTwo.name;
            return playerTwo.returnMarker();
        } else if (playerOneMarks < playerTwoMarks) {           
            currentPlayer = playerOne.name;
            return playerOne.returnMarker();
        } else {
            currentPlayer = playerOne.name;
            return playerOne.returnMarker();           
        }
    }

    return {
        setNames,
        decideMarker, 
        checkWinner,
    }
})();

const Player = (name, selector) => { 
    const returnMarker = () => {
        return selector; 
    }
    Player.name = name; 
    Player.selector = selector; 
    return {
        name, 
        selector,
        returnMarker, 
    }
}

submitButton.addEventListener("click", () => {
    playerOne = null;
    playerTwo = null;
    ({playerOne, playerTwo} = Game.setNames());
    container.style.cssText = "border: 2px solid white";
});

winnerContainer.addEventListener("click", () => {
    winnerContainer.style.cssText = "display: none;"
})

Gameboard.display();
