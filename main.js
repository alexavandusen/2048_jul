import twentyfourtyeight from "../common/2048.js";
import R from "./common/ramda.js";
import Json_rpc from "./Json_rpc.js";

// String literals.
const result_text = [
    "Congratulations! You have won the game.",
    "Sorry! You have lost."
];

console.log("new game");

// Methods:
const start_button = document.querySelector(".start-button");
const grid_display = document.querySelector("#board");
console.log(grid_display);
const show_score = document.getElementById("score-container");
const result_dialog = document.getElementById("result_dialog");

let board = twentyfourtyeight.empty_board();

console.log(board);
// let score = twentyfourtyeight.score();

const board_columns = 4;
const board_rows = 4;
// const tile_value = twentyfourtyeight.setSquare(board,);
const empty_tiles= twentyfourtyeight.find_empty_tiles(board);
const tile_value = twentyfourtyeight.generate_tile(board,empty_tiles);

console.log(empty_tiles);
console.log(tile_value);

document.documentElement.style.setProperty("--board-rows", board_rows);
document.documentElement.style.setProperty("--board-columns", board_columns);

//const board = document.getElementById("board");

console.log(R);

const tile_slots = R.range(0, board_rows).forEach(function (row_index) {
    const row = document.createElement("div");
    console.log(row);
    row.className = "row";
    row.tabIndex = 0;
    row.setAttribute("aria-label", `Row ${row_index}`);
    //grid =
    R.range(0, board_columns).forEach(function () {
        const cell = document.createElement("div");
        cell.className = "cell";
        // cell.textContent = `${tile_value}`;
        row.append(cell);
        return cell;
    });
    grid_display.append(row);

    const update_tile = function (){
        board = twentyfourtyeight.board();
        board.forEach(function (row, row_index) {
            row.forEach(function (tile, col_index) {
                const num = board[col_index][row_index];
                tile.innerText = num;
                tile.getElementById(`tile+${tile.innerText}`);
            });
            return board;
        });



        row.onkeydown = function (event) {
            if (event.keycode === 39){
                twentyfourtyeight.move_right();
                twentyfourtyeight.score();
                twentyfourtyeight.generate_tile();
            } else if (event.keycode === 37){
                twentyfourtyeight.move_left();
                twentyfourtyeight.score();
                twentyfourtyeight.generate_tile();
            } else if (event.keycode === 38) {
                twentyfourtyeight.move_up();
                twentyfourtyeight.score();
                twentyfourtyeight.generate_tile();
            } else if (event.keycode === 40) {
                twentyfourtyeight.move_down();
                twentyfourtyeight.score();
                twentyfourtyeight.generate_tile();
            }
        };
        //board.append(row);
        update_tile();
        draw_board();

        row.onkeydown = function (){
            let result;
            if (twentyfourtyeight.is_ended(board) &&
            !twentyfourtyeight.player_has_won(board)){
                result = 2;
                document.getElementById("result_message").textContent(
                    result_text[result]);
            } else if ((twentyfourtyeight.is_ended(board) &&
            twentyfourtyeight.player_has_won(board)) ||
            twentyfourtyeight.player_has_won(board)){
                result = 1;
                document.getElementById("result_message").textContent(
                    result_text[result]);
            }
            result_dialog.showModal();
        };

    };

});



const draw_board = function (){
    tile_slots.forEach(function (r, row_index) {
        r.forEach(function (cell, column_index) {
            const tile = board[row_index][column_index];
            cell.innerText = tile.toString();
            cell.className.add("tile" + tile.toString());
            // want to change the cell to the numbered tile
        });
    });
};

  start_button.onclick = function () {
            console.log("click");
            board = twentyfourtyeight.empty_board();
            const free_tiles = twentyfourtyeight.find_empty_tiles(board);
            update_tile();
            twentyfourtyeight.score();
            twentyfourtyeight.generate_tiles(board, free_tiles);
            return draw_board();
        };
// start_button.addEventListener('click', () =>{
//     console.log("click");
// })
result_dialog.onclick = function () {
    board = twentyfourtyeight.empty_board();
    score = twentyfourtyeight.score();
    draw_board();
    result_dialog.close();
};
result_dialog.onkeydown = result_dialog.onclick;

// board.firstChild.focus();
// draw_board();