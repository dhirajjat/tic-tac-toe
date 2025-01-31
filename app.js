// let boxes = document.querySelectorAll(".box");
// let resetBtn = document.querySelector("#reset-btn");
// let newGamebtn = document.querySelector("#new-btn");
// let msgContainer = document.querySelector(".msg-container");
// let msg = document.querySelector("#msg");

// let turnO = true;

// const winPatterns = [
//     [0,1,2],
//     [0,3,6],
//     [0,4,8],
//     [1,4,7],
//     [2,5,8],
//     [2,4,6],
//     [3,4,5],
//     [6,7,8],
// ];
// const resetGame = ()=>{
//     turnO = true;

// }

// boxes.forEach((box) => {
//     box.addEventListener("click",() =>{
//         console.log("box was clicked");
//         if(turnO){
//             box.innerText = "O";
//             turnO = false;
//         }else{
//             box.innerText = "X";
//             turnO = true;
//         }
//         box.disabled = true;

//         checkWinner();
//     });
// });

// const showWinner = (winner) => {
//     msg.innerText = `Congratulations, Winner is ${winner}`;
//     msgContainer.classList.remove("hide");
// };
// // function showWinner(winner) {
// //     const winnerElement = document.getElementById('winner');
// //     if (winnerElement) {
// //         winnerElement.innerText = `${winner} wins!`;
// //     } else {
// //         console.error('Winner element not found');
// //     }
// // }
// const checkWinner = () => {
//     for (let pattern of winPatterns){
//         let pos1Val = boxes[pattern[0]].innerText;
//         let pos2Val = boxes[pattern[1]].innerText;
//         let pos3Val = boxes[pattern[2]].innerText;

//         if(pos1Val != " " && pos2Val != " " && pos3Val != " " ) {
//             if(pos1Val === pos2Val && pos2Val === pos3Val){
//                 console.log("winner", pos1Val);
//                 showWinner(pos1Val);
//             }
//         }
//     }
// };


const board = document.getElementById("board");
        const status = document.getElementById("status");
        let currentPlayer = "X";
        let gameBoard = ["", "", "", "", "", "", "", "", ""];
        
        function createBoard() {
            board.innerHTML = "";
            gameBoard.forEach((cell, index) => {
                const div = document.createElement("div");
                div.classList.add("cell");
                div.dataset.index = index;
                div.textContent = cell;
                div.addEventListener("click", handleMove);
                board.appendChild(div);
            });
        }
        
        function handleMove(event) {
            const index = event.target.dataset.index;
            if (gameBoard[index] === "") {
                gameBoard[index] = currentPlayer;
                event.target.textContent = currentPlayer;
                event.target.classList.add("taken");
                if (checkWinner()) {
                    status.textContent = `Player ${currentPlayer} wins!`;
                    document.querySelectorAll(".cell").forEach(cell => cell.removeEventListener("click", handleMove));
                    return;
                }
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
        
        function checkWinner() {
            const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            return winningCombos.some(combination => {
                const [a, b, c] = combination;
                return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
            });
        }
        
        function resetGame() {
            gameBoard = ["", "", "", "", "", "", "", "", ""];
            currentPlayer = "X";
            status.textContent = "Player X's turn";
            createBoard();
        }
        
        createBoard();
