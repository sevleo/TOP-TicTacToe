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
    function show_game_settings () {

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
        fill_player_selection(player1_settings, player1);

        // Draw player-selection two div
        player2_settings = document.createElement('div');
        player2_settings.classList.add('player-selection', 'two');
        player_selection_area.append(player2_settings);
        fill_player_selection(player2_settings, player2);

        // Draw insides of player-selection-one/two div
        function fill_player_selection(player_settings_div, player) {
            player_name = document.createElement('p');
            
            // Draw player name 
            player_name.textContent = player.name;
            player_settings_div.append(player_name);

            // Draw "Human" player option
            human_option = document.createElement('div');
            human_option.classList.add("human-option");
            human_option.textContent = 'Human';
            player_settings_div.append(human_option);
            human_option.addEventListener('click', () => {
                hide_difficulty(player_settings_div);
                player.player_type = 'human';
            });

            // Draw "Computer" player option
            computer_option = document.createElement('div');
            computer_option.textContent = 'Computer';
            computer_option.classList.add("computer-option");
            player_settings_div.append(computer_option);
            computer_option.addEventListener('click', () => {
                show_difficulty(player_settings_div);
                player.player_type = 'computer';
            });

            // Show difficulty settings for "Computer" player option
            function show_difficulty(player_settings_div) {
                existing_buttons = document.querySelector(`.player-selection.${player_settings_div.classList[1]} > .difficulty`);
                // Check if nodes for these buttons already exist in corresponding player selection area
                if (!existing_buttons) {
                    easy = document.createElement('div');
                    easy.textContent = 'Easy';
                    easy.classList.add('difficulty', 'easy');
                    player_settings_div.append(easy);
                    easy.addEventListener('click', () => {
                        player.computer_difficulty = 'easy';
                    })
    
                    medium = document.createElement('div');
                    medium.textContent = 'Medium';
                    medium.classList.add('difficulty', 'medium');
                    player_settings_div.append(medium);
                    medium.addEventListener('click', () => {
                        player.computer_difficulty = 'medium';
                    })
    
                    hard = document.createElement('div');
                    hard.textContent = 'Hard';
                    hard.classList.add('difficulty', 'hard');
                    player_settings_div.append(hard);
                    hard.addEventListener('click', () => {
                        player.computer_difficulty = 'hard';
                    })
                }
            }

            // Hide difficulty settings when "Computer" player option is 
            // no longer selected
            function hide_difficulty(player_settings_div) {
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
            hide_game_settings();
        });
    }

    // Hides game settings, invoked by clicking at "start-button"
    function hide_game_settings () {
        settings_container = document.querySelector('.settings-container');
        settings_container.remove();

        gameBoard.startGame();
    }

    return {
        show_game_settings,
        player1,
        player2,
    }
})();


/*
** The Gameboard represents the state of the board, 
** showing tiles and hiding tiles from the screen, as well as 
** definig winning conditions, handling turns, and managing AI
*/
const gameBoard = (function () {

    let origBoard = Array.from(Array(9).keys());

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
        game_over: false,
        tie: false,
        player1_winner: false,
        player2_winner: false,
        evaluate_score: function () {
            if (gameState.game_over) {
                if (gameState.tie) {
                    return 0
                }
                else if (gameState.player1_winner) {
                    return 1
                }
                else if (gameState.player2_winner) {
                    return -1
                }
            }
            else {
                return "Game not over yet"
            }
        },
    }

    function startGame() {
        draw_gameboard();
    }

    // Add gameboard and tiles to DOM
    function draw_gameboard () {
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
            div.addEventListener('click', handleTurn, false);
        });
    };

    function handleTurn(event) {
        if (event.target.getAttribute('tile_value') != 'x' && event.target.getAttribute('tile_value') != 'o') {

            // Add X or O on the tile
            document.querySelector(`[tile_value="${event.target.getAttribute('tile_value')}"]`).innerText = gameState.current_turn.marker;

            // Update origBoard with x or o valus in respective positions
            origBoard[event.target.getAttribute('tile_value')] = gameState.current_turn.marker;

            // Update tile_value property on the respective tile
            event.target.setAttribute('tile_value', gameState.current_turn.marker);

            console.log(emptySquares());


            let gameWon = checkWin(origBoard, gameState.current_turn.marker);
            if (gameWon) {
                gameOver(gameWon);
            } else if (checkTie()) {
                gameOver();
            } else switch_player_turn();
        }
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

    function gameOver(gameWon) {
        tiles = document.querySelectorAll('.tile');
        if (gameWon) {
            for (let index of winning_conditions[gameWon.index]) {
                document.querySelector(`[tile_num="${index}"]`).style.backgroundColor = gameWon.player == 'x' ? "blue" :  "red";
            }
            for (var i = 0; i < tiles.length; i++) {
                tiles[i].removeEventListener('click', handleTurn, false)
            }
        } else {
            for (var i = 0; i < tiles.length; i++) {
                tiles[i].style.backgroundColor = 'green';
                tiles[i].removeEventListener('click', handleTurn, false)
            }
        }
    }

    function emptySquares() {
        return origBoard.filter(s => s !== 'x' & s !== 'o');
    }

    // Switch play turn each time after selecting a tile
    function switch_player_turn () {
        gameState.current_turn = gameState.current_turn === gameSettings.player1 ? gameSettings.player2 : gameSettings.player1;
    }


    // Check if now is the turn of the computer and if yes, make the move and run handleGameTurn again
    // Move this to a separate method
    // if (gameState.current_turn.player_type === 'computer' && gameState.current_turn.computer_difficulty === 'easy') {
    //     const randomIndex = Math.floor(Math.random() * remaining_tiles.length);
    //     const randomValue = remaining_tiles[randomIndex];
    //     gameState.current_turn.selected.push(randomValue);
    //     selected_tiles.push(randomValue);
    //     remaining_tiles = remaining_tiles.filter(item => item !== (randomValue));
    //     let tile_selected = document.querySelector(`[tile_num="${randomValue}"]`);
    //     tile_selected.classList.add(gameState.current_turn.tile_class);
    //     handleGameTurn();
    // }
    // if (gameState.current_turn.player_type === 'computer' && gameState.current_turn.computer_difficulty === 'hard') {
    //     handleGameTurn();
    // }


    // Remove gameboard and tiles from DOM at the end of the game
    // Invoked in endGame()
    function hide_tiles () {
        // Remove tiles from DOM
        tiles = document.querySelectorAll('.tile');
        tiles.forEach((element) => {
            element.remove();
        });

        // Remove gameboard from DOM
        gameboard_container = document.querySelector('.gameboard-container');
        if (gameboard_container) {
            gameboard_container.remove();
        }
    };

    // Log tiles object to console for testing purposes
    function console_log () {
        console.log(gameState.current_turn);
        console.log(origBoard);
        // console.log(tiles);
    };

    return {
        console_log,
        startGame,
        gameState,
        origBoard,
    }
})();

// Draw "settings-container" div and its children
gameSettings.show_game_settings();