const gameBoard = (function () {
    let tiles = [
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
            value: 'empty',
        },
                
        {
            tile_num: 9,
            tile_row: 3,
            tile_column: 3,
            value: 'empty',
        },
    ]

    const show_tiles = () => {
        // console.log(tiles)
        main_container = document.querySelector('#main-container');
        tiles.forEach((element) => {
            let div = document.createElement('div');
            div.classList.add('tile');
            div.setAttribute('tile_num', element.tile_num);
            div.setAttribute('tile_row', element.tile_row);
            div.setAttribute('tile_column', element.tile_column);
            main_container.append(div);
        });
    }

    const hide_tiles = () => {
        tiles = document.querySelectorAll('.tile');
        tiles.forEach((element) => {
            element.remove();
        });
    }
    
    return {
        show_tiles,
        hide_tiles,
    }
})();

// gameBoard.show_tiles()
// gameBoard.hide_tiles()