/*
** The gameSettings module is responsible for drawing and hiding the settings of the game from the screen
*/
const gameSettings = (function () {

    // Create these guys with factory
    let player1 = {
        'name': 'PlayerX',
        'selected': [],
        'tile_class': 'PlayerOne',
    }
    let player2 = {
        'name': 'PlayerO',
        'selected': [],
        'tile_class': 'PlayerTwo',
    }

    // Draw "settings-container" div and its children
    // Run at the page load
    const show_game_settings = () => {
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
        fill_player_selection(player1_settings, "Player X");

        // Draw player-selection two div
        player2_settings = document.createElement('div');
        player2_settings.classList.add('player-selection', 'two');
        player_selection_area.append(player2_settings);
        fill_player_selection(player2_settings, "Player O");

        // Draw insides of player-selection-one/two div
        function fill_player_selection(player_settings_div, player) {
            player_name = document.createElement('p');
            
            // Draw player name 
            player_name.textContent = player;
            player_settings_div.append(player_name);

            // Draw "Human" player option
            human_option = document.createElement('button');
            human_option.textContent = 'Human';
            player_settings_div.append(human_option);
            human_option.addEventListener('click', () => {
                hide_difficulty(player_settings_div);
            });

            // Draw "Computer" player option
            computer_option = document.createElement('button');
            computer_option.textContent = 'Computer';
            player_settings_div.append(computer_option);
            computer_option.addEventListener('click', () => {
                show_difficulty(player_settings_div);
            });

            // Show difficulty settings for "Computer" player option
            function show_difficulty(player_settings_div) {
                existing_buttons = document.querySelector(`.player-selection.${player_settings_div.classList[1]} > .difficulty`);
                // Check if nodes for these buttons already exist in corresponding player selection area
                if (!existing_buttons) {
                    easy = document.createElement('div');
                    easy.textContent = 'Easy';
                    easy.classList.add('difficulty');
                    player_settings_div.append(easy);
    
                    medium = document.createElement('div');
                    medium.textContent = 'Medium';
                    medium.classList.add('difficulty');
                    player_settings_div.append(medium);
    
                    hard = document.createElement('div');
                    hard.textContent = 'Hard';
                    hard.classList.add('difficulty');
                    player_settings_div.append(hard);
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

        // Hide gameboard tiles when show_game_settings is called
        // gameBoard.hide_tiles();
    }

    // Hides game settings, invoked by clicking at "start-button"
    const hide_game_settings = () => {
        settings_container = document.querySelector('.settings-container');
        settings_container.remove();

        gameBoard.create_tiles();
        gameBoard.show_tiles();
    }

    return {
        show_game_settings,
        hide_game_settings,
        player1,
        player2,
    }
})();


/*
** The Gameboard represents the state of the board, 
** showing tiles and hiding tiles from the screen
*/
const gameBoard = (function () {
    let tiles = [];
    let player_turn = '';
    let selected_tiles = [];

    const winning_conditions = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ]

    // Fill "tiles" array with tiles objects
    const create_tiles = () => {
        new_tiles = [
            {
                tile_num: 1,
                tile_row: 1,
                tile_column: 1,
                value: 'empty',
            },
    
            {
                tile_num: 2,
                tile_row: 1,
                tile_column: 2,
                value: 'empty',
            },
            
            {
                tile_num: 3,
                tile_row: 1,
                tile_column: 3,
                value: 'empty',
            },
                    
            {
                tile_num: 4,
                tile_row: 2,
                tile_column: 1,
                value: 'empty',
            },
                    
            {
                tile_num: 5,
                tile_row: 2,
                tile_column: 2,
                value: 'empty',
            },
                    
            {
                tile_num: 6,
                tile_row: 2,
                tile_column: 3,
                value: 'empty',
            },
                    
            {
                tile_num: 7,
                tile_row: 3,
                tile_column: 1,
                value: 'empty',
            },
                    
            {
                tile_num: 8,
                tile_row: 3,
                tile_column: 2,
                value: 'x',
            },
                    
            {
                tile_num: 9,
                tile_row: 3,
                tile_column: 3,
                value: 'o',
            },
        ];
        tiles = new_tiles;
    };

    // Add gameboard and tiles to DOM
    const show_tiles = () => {
        switch_player_turn();
        main_container = document.querySelector('#main-container');
        
        // Draw gameboard
        gameboard_container = document.createElement('div');
        gameboard_container.classList.add('gameboard-container');
        main_container.append(gameboard_container);

        // Draw tiles
        tiles.forEach((element) => {
            let div = document.createElement('div');
            div.classList.add('tile');
            div.setAttribute('tile_num', element.tile_num);
            div.setAttribute('tile_row', element.tile_row);
            div.setAttribute('tile_column', element.tile_column);
            div.setAttribute('value', element.value);
            gameboard_container.append(div);

            div.addEventListener('click', () => { 
                // The if ensures that the move counts only when selecting a tile that was not selected before
                if (!selected_tiles.includes(parseInt((div.getAttribute('tile_num'))))){
                    player_turn.selected.push(parseInt(div.getAttribute('tile_num')));
                    selected_tiles.push(parseInt(div.getAttribute('tile_num')));
                    div.classList.add(player_turn.tile_class);
                    
                    // If winning conditions are met, go back to Settings and reset game data
                    if (winning_conditions_met()) {
                        gameBoard.hide_tiles(); 
                        gameSettings.show_game_settings();
                        gameSettings.player1.selected = [];
                        gameSettings.player2.selected = [];
                        selected_tiles = [];
                    }
                    // Otherwise, switch player and continue game
                    else {
                        switch_player_turn();
                    }
                }
            });
        });
    };

    // Remove gameboard and tiles from DOM
    const hide_tiles = () => {

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
    const log_tiles = () => {
        console.log(tiles);
    };

    // Switch play turn each time after selecting a tile
    const switch_player_turn = () => {
        if (!player_turn) {
            player_turn = gameSettings.player1;
        }
        else {
            player_turn = player_turn === gameSettings.player1 ? gameSettings.player2 : gameSettings.player1;
        }
    }

    // Check if winnning conditions are met by comparing each condition to player data
    const winning_conditions_met = () => {
        for (const condition of winning_conditions) {
            const winning_condition_met = condition.every(value => player_turn.selected.includes(value));
            if (winning_condition_met) {
                return true
            }
        }
        return false
    };



    return {
        create_tiles,
        show_tiles,
        hide_tiles,
        log_tiles,
        switch_player_turn,
    }
})();

// Draw "settings-container" div and its children
gameSettings.show_game_settings();


        
