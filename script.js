const player = (name, symbol) => {
    name = name;
    symbol = symbol;
    return {name, symbol};
}

const Gameboard = (() => {
    
    let blocked = 0;
    let gameboard = [[],[],[]];
    
    const initialState = function(){
        //Set the board to an initial state
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                gameboard[i][j] = "";
            }
        }
    }

    initialState();

    //Place player choice on gameboard
    const makePlay = function(player, x, y){
        gameboard[y - 1][x - 1] = player.symbol;
        if(player === controlCenter.p1){
            score1.classList.remove('yourTurn');
            score2.classList.add('yourTurn');
        }else{
            score2.classList.remove('yourTurn');
            score1.classList.add('yourTurn');
        }
    }

    return {makePlay, gameboard, initialState, blocked};
})();

//Control center used to manage turns and victories

controlCenter = (() => {
    
    //Generate players
    const p1 = player("jeff", 'X');
    const p2 = player("mark", 'O');
    let p;

    //Change turns
    const turn = (p) => {
        if(p === p1){
            return p2;
        }else{
            score2.classList.remove('yourTurn');
            score1.classList.add('yourTurn');
            return p1;
        }
    }

    //Check if there is victory
    function checkVictory(){

        const board = Gameboard.gameboard;
        //Check rows
        board.forEach(function(row){
            if(row[0] === row[1] && row[1] == row[2]){
                if(row[0] !== "" && row[1] !== "" && row[2] !== ""){
                    displayResult();
                }
            }
        })

        //Check columns
        for(let i = 0; i < board.length; i++){
            if(board[0][i] === board[1][i] && board[1][i] === board[2][i]){
                if(board[0][i] !== "" && board[1][i] !== "" && board[2][i] !== ""){
                    displayResult();
                }
            }
        }

        //Check cross
        if(board[1][1] === board[2][2] && board[0][0] === board[2][2]){
            if(board[0][0] !== "" && board[1][1] !== "" && board[2][2] !== ""){
                displayResult();
            }
        }else if(board[2][0] === board[1][1] && board[1][1] === board[0][2]){
            if(board[0][2] !== "" && board[1][1] !== "" && board[2][0] !== ""){
                displayResult();
            }
        }

        //Check draw
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                if(board[i][j] === ""){
                    return;
                }
            }
        }

        alert("It's a draw");
        Gameboard.initialState();
        Gameboard.blocked = 1;
    }

    function displayResult(){
        //Set gameboard array to initial state
        Gameboard.initialState();
        Gameboard.blocked = 1;
        //Update points
        if(p.name === p1.name){
            points[0].innerText = parseInt(points[0].innerText) + 1;
        }else{
            points[1].innerText = parseInt(points[1].innerText) + 1;
        }
    }

    function clear(e){
        cells.forEach(function(cell){
            cell.innerText = "";
        })
        Gameboard.blocked = 0;
    }

    //Add choice to gameboard
    addToGameboard: addToGameboard = (event) => {
        
        //Get the coordinates of the cell clicked
        let x = event.target.getAttribute('data-x');
        let y = event.target.getAttribute('data-y');
        //Verify that the selected place is empty
        if(Gameboard.blocked === 0){
            if(Gameboard.gameboard[y - 1][x - 1] === ""){
                p = turn(p);
                Gameboard.makePlay(p, x, y);
                event.target.innerText = p.symbol;
                checkVictory();
            }else{
                return;
            }
        }else{
            return;
        }
    }
    return {addToGameboard, p1, p2, clear}
})();


//Get the container
const container = document.getElementById("container");

//Get the cells
const cells = [...document.getElementsByClassName("cell")];

cells.forEach(cell => {
    cell.addEventListener('click', controlCenter.addToGameboard);
})

//Get the points container
const points = [...document.getElementsByClassName('points')];

//Get the names
const names = [...document.getElementsByClassName('name')];

//Get the PlayAgain button
const playAgain = document.getElementById('playAgain');
playAgain.addEventListener('click', controlCenter.clear);
playAgain.addEventListener('mousedown', function(e){e.target.classList.remove("shadow")});
playAgain.addEventListener('mouseup', function(e){e.target.classList.add("shadow")});

//Get the scorer

const score1 = document.getElementById("player1");
const score2 = document.getElementById("player2");


//Add color to player1
score1.classList.add('yourTurn');

alert("Let's play Tic-Tac-Toe!");
controlCenter.p1.name = prompt("PLAYER 1:");
controlCenter.p2.name = prompt("PLAYER 2:")
names[0].innerText = controlCenter.p1.name;
names[1].innerText = controlCenter.p2.name;