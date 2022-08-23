// Possible choices
const CHOICES = ['rock', 'paper', 'scissors'];

// Display scores
const scoreHuman = document.querySelector('#scoreHuman');
const scoreComputer = document.querySelector('#scoreComputer');

// Actual points
let pointsHuman = 0;
let pointsComputer = 0;

// Buttons in use (players-side)
const playerSide = document.querySelector('#player')
const computerSide = document.querySelector('#computer')

const playerStatus = playerSide.querySelector('.status')
const computerStatus = computerSide.querySelector('.status')

// start menu
const startMenu = document.querySelector('.start-container');
// start button
const startBtn = document.querySelector("#start-button");
const result = document.querySelector("#result");


//sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

// Game flow functions
// Menu transition functions
const hideStartMenu = () => {
    startMenu.style.width = '0';
    startBtn.style.display = 'none';
    result.style.display = 'none';
    scoreHuman.textContent = pointsHuman;
    scoreComputer.textContent = pointsComputer;
}

const showStartMenu = () => {
    pointsComputer = 0;
    pointsHuman = 0;
    console.log('click');
    startBtn.style.display = 'block';
    result.style.display = 'block'
    startMenu.style.width = '100vw';// Game result - variable
};

// Render results
const renderResults = () => {
    scoreHuman.textContent = pointsHuman;
    scoreComputer.textContent = pointsComputer; 
}

// display selection for some time - change color !
const displayCurrentWinner = (winner) => {
    if (winner.length  !== 0) {
        const winNow = document.querySelector(`#${winner}`)
        winNow.classList.add('winner')
        winNow.querySelector('.status').textContent = "Winner!"
        sleep(1500).then(() => {
            winNow.classList.remove('winner');
            winNow.querySelector('.status').textContent = "";
        })
    } else {
        playerStatus.textContent = 'Tie!'
        computerStatus.textContent = 'Tie!'
        sleep(1000).then(() => {
            computerStatus.textContent = ''
            playerStatus.textContent = ''
        })
    }
}

// computer choice
const getComputerChoice = () => {
    const index = Math.floor(Math.random() * 3)
    console.log("Index", index)
    const choice = CHOICES[index]
    console.log(choice)
    const elem = computerSide.querySelector(`.${choice}`)
    elem.firstChild.classList.add('selected')
    sleep(1000).then(() => elem.firstChild.classList.remove('selected'))
    return choice
}

// handle click as human
const getHumanChoice = (event) => {
    let choice = event.target.textContent
    choice  = choice.toLowerCase()
    return choice
}


const updateResults = (winner) => {
    if (winner.length !== 0) {
        if (winner === 'computer') {
            pointsComputer++
        } else {
            pointsHuman++
        }
    }
}


const round = (humanChoice, compChoice) => {
    let winner = "";

    console.log("Computer chose:", compChoice)
    if (compChoice !== humanChoice) {
        if (humanChoice === 'rock') {
            if (compChoice === 'paper') {
                winner = 'computer';
            } else {
                winner = 'player';
            }
        } else if (humanChoice  === 'paper') {
            if (compChoice === 'scissors') {
                winner = 'computer';
            } else {
                winner = 'player';
            }
        } else {
            if (compChoice === 'scissors') {
                winner = 'computer';
            } else {
                winner = 'player';
            }
        }
    }
    // !effects!
    displayCurrentWinner(winner)
    updateResults(winner)
    renderResults()
    checkWinner()
}

const checkWinner = () => {
    let message = ""
    if (pointsHuman === 5 || pointsComputer === 5) {
        if (pointsHuman === 5) {
            message = "You Won!";
        } else {
            message = "Computer won!";
        }
        result.textContent = message
        showStartMenu()
    }
}

const clickHandler = (event) => {
    if (event.target.classList.contains('choice')) {
        let compChoice = getComputerChoice();
        let humanChoice = getHumanChoice(event);
        
        round(humanChoice, compChoice)
    } else if (event.target == startBtn)
    hideStartMenu()
}

startBtn.addEventListener('click', hideStartMenu)
playerSide.addEventListener('click', clickHandler)
