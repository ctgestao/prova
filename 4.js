
function check(board, row, col, n) {

    //  there are no queens below the current row.

    for (let i = 0; i < row; i++) {
        if (board[i][col] === ' Q ') return false;
    }

    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === ' Q ') return false;
    }

    for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === ' Q ') return false;
    }

    return true;

}

function solve(board, row, n, solutions) {

    if (row === n) {
        solutions.push(board.map(row => row.join('')));
        return;
    }

    for (let col = 0; col < n; col++) {

        if (check(board, row, col, n)) {

            board[row][col] = ' Q ';

            solve(board, row + 1, n, solutions);

            board[row][col] = ' . ';

        }
        
    }
}

function nQueens(n) {

    const board = [];

    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(' . ');
        }
        board.push(row);
    }

    const solutions = [];

    solve(board, 0, n, solutions);

    return solutions;

}


const n = 4; 
const solutions = nQueens(n);

console.log(`Total solutions for ${n}-Queens:`, solutions.length);
console.log("Solutions:");

solutions.forEach((solution, index) => {
    console.log(`\nSolution ${index + 1}:\n`);
    console.log(solution.join(' \n'));
});
