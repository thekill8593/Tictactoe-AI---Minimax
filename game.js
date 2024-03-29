class Game {

	constructor() {

		this.playerTurn = true;

		this.boardArray = ['','','','','','','','',''];		

		this.board = document.getElementById('board');		
		this.buttonPlay = document.getElementById('btn-play');
		this.controls = document.getElementById('controls');
		this.alert = document.getElementById('alert');

		//add click event to columns
		this.columns = [...this.board.getElementsByTagName('td')];		

		this.columns.map((element, index) => {
			element.addEventListener('click', (e) => {
				const selectedCol = e.target;
				const selectedIndex = e.target.getAttribute('data-cell');
				if (this.playerTurn) {
					this.selected(selectedIndex);	
				}
				
			});	
		});		

		this.buttonPlay.addEventListener('click', (e) => {
			e.preventDefault();
			this.restart();
		});

		this.paint();
		
	}	


	restart() {
		controls.style.display = 'none';

		this.boardArray = ['','','','','','','','',''];
		this.playerTurn = true;
		this.paint();
		
	}

	selected(index) { 

		if (this.boardArray[index].length > 0) {
			alert('Select another, please');
			return;
		}


		const letter = this.playerTurn ? 'X' : 'O';

		this.boardArray[index] = letter;

		this.paint();
		
		const score = this.evaluate(this.boardArray);		
		if (score !== 0) {
			if (score == 10) {
				this.alert.innerText = 'Computer wins';
			} else {
				this.alert.innerText = 'Player wins';
			}
			controls.style.display = 'flex';
			return;
		}

		if (!this.isMovesLeft(this.boardArray)) {
			this.alert.innerText = 'It\'s a draw!!';
			controls.style.display = 'flex';
			return;
		}

		this.playerTurn = !this.playerTurn;

		if (!this.playerTurn) {
			this.computerMove();
		}
	}		
	
	paint() {
		for (let i = 0; i < this.boardArray.length; i++) {
			let el = document.getElementById('c' + (i+1));
			el.innerText = this.boardArray[i];
		}
	}

	computerMove() {
		let bestVal = -1000; 
	    let bestMove = -1; 	    

	    for (let i = 0; i < this.boardArray.length; i++) {
	    	if (this.boardArray[i].length === 0) {
	    		this.boardArray[i] = "O";
	    		let moveVal = this.minimax(this.boardArray, 0, false);
	    		this.boardArray[i] = "";
	    		if (moveVal > bestVal) 
                { 
                    bestMove = i;                     
                    bestVal = moveVal; 
                } 
	    	}
	    }		

		this.selected(bestMove);
	}


	minimax(board, depth, isMax) {
        let score = this.evaluate(board); 

        if (score == 10) 
	        return score; 	  
	    
	    if (score == -10) 
	        return score; 
	  
	    // If there are no more moves and no winner then it is a tie 	    
	    if (!this.isMovesLeft(board)) 
	        return 0; 

		if (isMax) { 
		    let best = -1000;
		        
            for (let i = 0; i < board.length; i++) { 
                // Check if cell is empty 
                if (board[i].length === 0) {
                    // Make the move 
                    board[i] = 'O';	  
                    // Call minimax recursively and choose the maximum value 
                    best = Math.max(best, this.minimax(board, depth+1, !isMax)); 
                    // Undo the move 
                    board[i] = ''; 
                }                 
            } 
	         
	        return best; 
	    } // If this minimizer's move 
	    else  {
	    	let best = 1000; 		 
	        
            for (let i = 0; i < board.length; i++) { 
                // Check if cell is empty 
                if (board[i].length === 0) {                	
                    // Make the move 
                    board[i] = 'X';	  
                    // Call minimax recursively and choose the minimum value 
                    best = Math.min(best, this.minimax(board, depth+1, !isMax));   					
                    // Undo the move 
                    board[i] = ''; 
                } 
                          
            } 	         
	        return best; 	        
	    }
	}

	///
	isMovesLeft(board) 
	{ 
	    for (let i = 0; i < board.length; i++) {
	    	if (board[i].length === 0) {	            	
                return true; 
            }
	    }
	    return false; 
	}


	///
	evaluate(b){ 
    	// Checking for Rows for X or O victory. 
	    if (this.boardArray[0].length > 0 && this.boardArray[1].length > 0 && this.boardArray[2].length > 0 && this.boardArray[0] === this.boardArray[1] && this.boardArray[0] === this.boardArray[2]) {
	    	if (this.boardArray[0] === 'O') {
	    		return 10;
	    	} else if (this.boardArray[0] === 'X') {
	    		return -10;
	    	}
	    }

	    if (this.boardArray[3].length > 0 && this.boardArray[4].length > 0 && this.boardArray[5].length > 0 && this.boardArray[3] === this.boardArray[4] && this.boardArray[3] === this.boardArray[5]) {
	    	if (this.boardArray[3] === 'O') {
	    		return 10;
	    	} else if (this.boardArray[3] === 'X') {
	    		return -10;
	    	}	
	    }

	    if (this.boardArray[6].length > 0 && this.boardArray[7].length > 0 && this.boardArray[8].length > 0 && this.boardArray[6] === this.boardArray[7] && this.boardArray[6] === this.boardArray[8]) {
	    	if (this.boardArray[6] === 'O') {
	    		return 10;
	    	} else if (this.boardArray[6] === 'X') {
	    		return -10;
	    	}		
	    }


	    if (this.boardArray[0].length > 0 && this.boardArray[3].length > 0 && this.boardArray[6].length > 0 && this.boardArray[0] === this.boardArray[3] && this.boardArray[0] === this.boardArray[6]) {
	    	if (this.boardArray[0] === 'O') {
	    		return 10;
	    	} else if (this.boardArray[0] === 'X') {
	    		return -10;
	    	}			
	    }

	    if (this.boardArray[1].length > 0 && this.boardArray[4].length > 0 && this.boardArray[7].length > 0 && this.boardArray[1] === this.boardArray[4] && this.boardArray[1] === this.boardArray[7]) {
	    	if (this.boardArray[1] === 'O') {
	    		return 10;
	    	} else if (this.boardArray[1] === 'X') {
	    		return -10;
	    	}	
	    }

		if (this.boardArray[2].length > 0 && this.boardArray[5].length > 0 && this.boardArray[8].length > 0 && this.boardArray[2] === this.boardArray[5] && this.boardArray[2] === this.boardArray[8]) {
	    	if (this.boardArray[2] === 'O') {
	    		return 10;
	    	} else if (this.boardArray[2] === 'X') {
	    		return -10;
	    	}	
	    }
			
			
    	// Checking for Diagonals for X or O victory. 
    	if (this.boardArray[0].length > 0 && this.boardArray[4].length > 0 && this.boardArray[8].length > 0 && this.boardArray[0] === this.boardArray[4] && this.boardArray[0] === this.boardArray[8]) {
	    	if (this.boardArray[0] === 'O') {
	    		return 10;
	    	} else if (this.boardArray[0] === 'X') {
	    		return -10;
	    	}	
	    }

	    if (this.boardArray[2].length > 0 && this.boardArray[4].length > 0 && this.boardArray[6].length > 0 && this.boardArray[2] === this.boardArray[4] && this.boardArray[2] === this.boardArray[6]) {
	    	if (this.boardArray[2] === 'O') {
	    		return 10;
	    	} else if (this.boardArray[2] === 'X') {
	    		return -10;
	    	}	
	    }    	
  
    	// Else if none of them have won then return 0 
    	return 0; 
	
	}


}


window.addEventListener('load', () => {
	const game = new Game();	
})




