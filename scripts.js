/*
** The gameSettings module is responsible for drawing and hiding the settings of the game from the screen,
** as well as managing the player objects
*/
const gameSettings = (function () {

    // Create two players
    // (move this to gameBoard)
    let player1 = createPlayer('Player X', 'x');
    let player2 = createPlayer('Player O', 'o');

    // Factory function to create player objects
    // (move this to gameBoard)
    function createPlayer(name, marker) {
        let player_type = 'human';
        let computer_difficulty = 'easy';
        return {
            name,
            marker,
            player_type,
            computer_difficulty,
        }
    };

    // Draw "settings-container" div and its children
    // Run at the page load
    function showGameSettings () {
        gameBoard.resetGame();

        // Reset player settings to default
        gameSettings.player1.computer_difficulty = 'easy';
        gameSettings.player1.player_type = 'human';
        gameSettings.player2.computer_difficulty = 'easy';
        gameSettings.player2.player_type = 'human';

        // Select main-container
        main_container = document.querySelector('#main-container');

        // Draw settings-container div
        settings_container = document.createElement('div');
        settings_container.classList.add('settings-container');
        main_container.append(settings_container);

        // Draw player-selction-area div
        player_selection_area = document.createElement('div');
        player_selection_area.classList.add('player-selection-area');
        settings_container.append(player_selection_area);

        // Draw player-selection one div
        player1_settings = document.createElement('div');
        player1_settings.classList.add('player-selection', 'one');
        player_selection_area.append(player1_settings);
        fillPlayerSelection(player1_settings, player1);

        // Draw divider
        dividing_line = document.createElement('div');
        dividing_line.classList.add('divider');
        player_selection_area.append(dividing_line);

        // Draw player-selection two div
        player2_settings = document.createElement('div');
        player2_settings.classList.add('player-selection', 'two');
        player_selection_area.append(player2_settings);
        fillPlayerSelection(player2_settings, player2);

        // Draw insides of player-selection-one/two div
        function fillPlayerSelection(player_settings_div, player) {
            player_name = document.createElement('div');
            player_name.classList.add('player-icon');
            
            // Draw player name 
            // player_name.textContent = player.name;
            player_settings_div.append(player_name);

            // Draw "Human" player option
            human_option = document.createElement('div');
            human_option.classList.add("human-option", "active");
            human_option.textContent = 'Human';
            player_settings_div.append(human_option);
            human_option.addEventListener('click', () => {
                hideDifficulty(player_settings_div);
                player.player_type = 'human';

                // Activate highlight effect on human option button
                human_option_div = document.querySelector(`.${player_settings_div.classList[0]}.${player_settings_div.classList[1]} > .human-option`);
                human_option_div.classList.add("active");

                // Deactivate highlight effect on computer option button
                computer_option_div = document.querySelector(`.${player_settings_div.classList[0]}.${player_settings_div.classList[1]} > .computer-option`);
                computer_option_div.classList.remove("active");
            });

            // Draw "Computer" player option
            computer_option = document.createElement('div');
            computer_option.textContent = 'AI';
            computer_option.classList.add("computer-option");
            player_settings_div.append(computer_option);
            computer_option.addEventListener('click', () => {
                showDifficulty(player_settings_div);
                player.player_type = 'computer';

                // Activate highlight effect on computer option button
                computer_option_div = document.querySelector(`.${player_settings_div.classList[0]}.${player_settings_div.classList[1]} > .computer-option`);
                computer_option_div.classList.add("active");

                // Deactivate highlight effect on human option button
                human_option_div = document.querySelector(`.${player_settings_div.classList[0]}.${player_settings_div.classList[1]} > .human-option`);
                human_option_div.classList.remove("active");
            });

            // Show difficulty settings for "Computer" player option
            function showDifficulty(player_settings_div) {
                existing_buttons = document.querySelector(`.player-selection.${player_settings_div.classList[1]} > .difficulty`);
                // Check if nodes for these buttons already exist in corresponding player selection area
                if (!existing_buttons) {
                    easy = document.createElement('div');
                    easy.textContent = 'Easy';
                    easy.classList.add('difficulty', 'easy');
                    player_settings_div.append(easy);
                    easy.addEventListener('click', () => {
                        player.computer_difficulty = 'easy';

                        // Activate highlight effect on easy difficulty button
                        human_option_div = document.querySelector(`.${player_settings_div.classList[0]}.${player_settings_div.classList[1]} > .difficulty.easy`);
                        human_option_div.classList.add("active");

                        // Deactivate highlight effect on hard difficulty button
                        computer_option_div = document.querySelector(`.${player_settings_div.classList[0]}.${player_settings_div.classList[1]} > .difficulty.hard`);
                        computer_option_div.classList.remove("active");
                    })
    
                    hard = document.createElement('div');
                    hard.textContent = 'Hard';
                    hard.classList.add('difficulty', 'hard');
                    player_settings_div.append(hard);
                    hard.addEventListener('click', () => {
                        player.computer_difficulty = 'hard';

                        // Activate highlight effect on hard difficulty button
                        human_option_div = document.querySelector(`.${player_settings_div.classList[0]}.${player_settings_div.classList[1]} > .difficulty.hard`);
                        human_option_div.classList.add("active");

                        // Deactivate highlight effect on easy difficulty button
                        computer_option_div = document.querySelector(`.${player_settings_div.classList[0]}.${player_settings_div.classList[1]} > .difficulty.easy`);
                        computer_option_div.classList.remove("active");
                    })

                    // Highlight the difficulty that was selected before collapsing the difficulty settings
                    if (player.computer_difficulty === 'easy') {
                        easy.classList.add('active');
                    } else if (player.computer_difficulty === 'hard') {
                        hard.classList.add('active');
                    }
                }
            }

            // Hide difficulty settings when "Computer" player option is 
            // no longer selected
            function hideDifficulty(player_settings_div) {
                existing_buttons = document.querySelectorAll(`.player-selection.${player_settings_div.classList[1]} > .difficulty`);
                if (existing_buttons) {
                    existing_buttons.forEach((button) => {
                        button.remove();
                    });
                }
            }
        };

        // Draw start-button
        start_game_button = document.createElement('button');
        start_game_button.classList.add('start-button');
        start_game_button.textContent = 'Start game';
        settings_container.append(start_game_button);

        start_game_button.addEventListener('click', function () {
            hideGameSettings();
        });
    }

    // Hides game settings, invoked by clicking at "start-button"
    function hideGameSettings () {
        settings_container = document.querySelector('.settings-container');
        settings_container.remove();
        gameBoard.startGame();
    }

    return {
        showGameSettings,
        player1,
        player2,
    }
})();


/* This module defines the game logic, including initializing the game board, 
** handling player turns, checking for wins, ties, and AI moves.
*/
const gameBoard = (function () {

    // let origBoard = Array.from(Array(9).keys());
    let origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const winning_conditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]

    const gameState = {
        current_turn: gameSettings.player1,
    }

    function startGame() {
        resetGame();
        drawGameboard();
        handleAiMove();
    }

    // Add gameboard and tiles to DOM
    function drawGameboard () {
        main_container = document.querySelector('#main-container');
        
        // Draw gameboard
        gameboard_container = document.createElement('div');
        gameboard_container.classList.add('gameboard-container');
        main_container.append(gameboard_container);

        // Draw tiles
        origBoard.forEach((element) => {
            let div = document.createElement('div');
            div.classList.add('tile');
            div.setAttribute('tile_num', element);
            div.setAttribute('tile_value', element);
            div.innerText = '';
            gameboard_container.append(div);

            // Add event listener to every tile
            div.addEventListener('click', handleTileClick, false);
        });
    };

    function handleTileClick(event) {
        if (event.target.getAttribute('tile_value') != 'x' && event.target.getAttribute('tile_value') != 'o') {
            turn(event.target, gameState.current_turn.marker);
            handleMoveOutcome();
        }
    }

    function turn(square, marker) {
        // Update origBoard with x or o valus in respective positions
        origBoard[square.getAttribute('tile_value')] = marker;
        // Update tile_value property on the respective tile
        square.setAttribute('tile_value', marker);
    }

    function handleMoveOutcome() {
        if (checkWin(origBoard, gameState.current_turn.marker)) {
            gameOver(checkWin(origBoard, gameState.current_turn.marker));
        } else if (checkTie()) {
            gameOver();
        } else switchPlayerTurn();
    }

    function checkWin(board, player) {
        let plays = board.reduce((a, e, i) => 
            (e === player) ? a.concat(i) : a, []);
        let gameWon = null;
        for (let [index, win] of winning_conditions.entries()) {
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = {index: index, player: player};
                break
            }
        }
        return gameWon;
    }

    function checkTie() {
        if (emptySquares().length == 0) {
             return true;
        }
        return false;
    }
    
    function gameOver(winningCombo) {
        tiles = document.querySelectorAll('.tile');
        if (winningCombo) {
            for (let index of winning_conditions[winningCombo.index]) {
                document.querySelector(`[tile_num="${index}"]`).style.backgroundColor = winningCombo.player == 'x' ? "blue" :  "red";
            }
        } else {
            for (var i = 0; i < tiles.length; i++) {
                tiles[i].style.backgroundColor = 'grey';
            }
        }
        for (var i = 0; i < tiles.length; i++) {
            tiles[i].removeEventListener('click', handleTileClick, false)
        }
        document.querySelector('.endgame').style.display = 'block';
    }

    // Switch play turn each time after selecting a tile
    function switchPlayerTurn () {
        gameState.current_turn = gameState.current_turn === gameSettings.player1 ? gameSettings.player2 : gameSettings.player1;
        handleAiMove();
    }

    // Check if current turn is that of the AI and if so, invoke the logic to determine the AI move
    function handleAiMove() {
        if (gameState.current_turn.player_type === 'computer') {
            // If this is first move of the AI, make the random move
            if (emptySquares().length === 9) {
                aiMoveEasy();
            }
            else if (gameState.current_turn.computer_difficulty === 'easy') {
                aiMoveEasy();
            } else if (gameState.current_turn.computer_difficulty === 'hard') {
                aiMoveImpossible();
            }
        }
    }

    function aiMoveEasy() {
        const randomIndex = Math.floor(Math.random() * emptySquares().length);
        const move_index = emptySquares()[randomIndex];
        const move = document.querySelector(`[tile_num="${move_index}"]`);
        turn(move, gameState.current_turn.marker);
        handleMoveOutcome();
    }

    function aiMoveImpossible() {
        const move_index = minimax(origBoard, gameState.current_turn).index;
        const move = document.querySelector(`[tile_num="${move_index}"]`);

        turn(move, gameState.current_turn.marker);
        handleMoveOutcome();
    }

    function emptySquares() {
        return origBoard.filter(s => s !== 'x' & s !== 'o');
    }

    // return a value if a terminal state is found (+10, 0, -10)
    // go through available spots on the board
    // call the minimax function on each available spot (recursion)
    // evaluate returning values from function calls
    // and return the best value
    function minimax(newBoard, player) {

        //available spots
        var availSpots = emptySquares();

        // checks for the terminal states such as win, lose, and tie 
        // and returning a value accordingly
        if (checkWin(newBoard, gameSettings.player2.marker)) {
            return {score: -10};
        } else if (checkWin(newBoard, gameSettings.player1.marker)) {
            return {score: 10};
        } else if (availSpots.length === 0) {
            return {score: 0};
        }

        // an array to collect all the objects
        var moves = [];

        // loop through available spots
        for (var i = 0; i < availSpots.length; i++) {

            //create an object for each and store the index of that spot
            var move = {};
            move.index = newBoard[availSpots[i]];

            // set the empty spot to the current player
            newBoard[availSpots[i]] = player.marker;
    
            // collect the score resulted from calling minimax 
            // on the opponent of the current player
            if (player == gameSettings.player1) {
                var result = minimax(newBoard, gameSettings.player2);
                move.score = result.score;
            } else {
                var result = minimax(newBoard, gameSettings.player1);
                move.score = result.score;
            }

            // reset the spot to empty
            newBoard[availSpots[i]] = move.index;
    
            // push the object to the array
            moves.push(move);
        }
    
        // if it is the computer's turn loop over the moves and choose the move with the highest score
        var bestMove;
        if (player === gameSettings.player1) {
            var bestScore = -10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            
            // else loop over the moves and choose the move with the lowest score
            var bestScore = 10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
    
        // return the chosen move (object) from the moves array
        return moves[bestMove];
    }

    // Remove gameboard and tiles from DOM at the end of the game
    // Invoked in endGame()
    function resetGame () {
        // Remove gameboard from DOM
        document.querySelector('.endgame').style.display = 'none';
        gameboard_container = document.querySelector('.gameboard-container');
        if (gameboard_container) {
            gameboard_container.remove();
        }
        origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        gameState.current_turn = gameSettings.player1;
    };

    return {
        startGame,
        resetGame,
        gameState,
        origBoard,
    }
})();

// Draw "settings-container" div and its children
gameSettings.showGameSettings();