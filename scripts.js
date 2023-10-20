
// Game core object
const game = (function () {
    let player1 = {
        'name': 'Player X',
    }
    let player2 = {
        'name': 'Player O',
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
        gameBoard.hide_tiles();
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


// Object to control behavior of gameboard
const gameBoard = (function () {
    let tiles = [];

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

    
    return {
        create_tiles,
        show_tiles,
        hide_tiles,
        log_tiles,
    }
})();

// Draw "settings-container" div and its children
game.show_game_settings();