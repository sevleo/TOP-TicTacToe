When tiles load, check if current turn is that of a computer
If yes, select a random tile
If no, let player make the move

When player makes the move, switch the turn and check if now is the turn of the computer. 
    If now is the turn of the computer:
        - select a random value from the list of remaining tiles
        - push the value to player_turn.selected
        - push the value to the selected_tiles
        - remove the value from the remaining_tiles
        - querySelect the tile with this tile_num
        - add class player_turn.tile_class
        - check if winning condition is met or if selected_tiles.length === 9
            - if yes, end_game();
            - if no, switch_player_turn();


                        // implement random movement here if player is computer
                        // console.log(remaining_tiles);
                        // console.log(player_turn.player_type);
                        // if (player_turn.player_type === 'computer') {
                        //     const randomIndex = Math.floor(Math.random() * remaining_tiles.length);
                        //     const randomValue = remaining_tiles[randomIndex];
                        //     console.log(randomValue);
                        // }












<!-- ## Tic Tac Toe
<h2>
    <a href="https://sevleo.github.io/library/">Preview link</a>
</h2>

### About the project

This project was created for the <span><a href="https://www.theodinproject.com/lessons/node-path-javascript-library">Project: Library assignment</a></span> of The Odin Project Curriculum. It showcases knowledge of the vanilla CSS, Flexbox and CSS Grid, and Javascript objects. -->