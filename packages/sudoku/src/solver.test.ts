import { SudokuGrid } from "./SudokuGrid";
import {trySetOptionValue, tryRemoveOptionValue, SudokuOptions} from "./solver";
const STANDARD_GRID_SIZE = 9;

const easySudoku = [
    [null,null,3,null,2,null,6,null,null],
    [9,null,null,3,null,5,null,null,1],
    [null,null,1,8,null,6,4,null,null],
    [null,null,8,1,null,2,9,null,null],
    [7,null,null,null,null,null,null,null,8],
    [null,null,6,7,null,8,2,null,null],
    [null,null,2,6,null,9,5,null,null],
    [8,null,null,2,null,3,null,null,9],
    [null,null,5,null,1,null,3,null,null]
];

describe('remove option works',()=>{
    test('remove option should return null if removing the only value in a unit', ()=>{
        const grid = new SudokuGrid(STANDARD_GRID_SIZE, easySudoku);
        const options = new SudokuOptions(grid);
        expect(options.data[0][0]).toEqual([4,5]);
        expect(options.data[0][5]).toEqual([1,4,7]);
    
        expect(tryRemoveOptionValue(options, {row:0, col:5}, 1)).toBeNull();

    });

    test('remove option should be able to remove a wrong option', ()=>{
        const grid = new SudokuGrid(STANDARD_GRID_SIZE, easySudoku);
        const options = new SudokuOptions(grid);
        const newOptions = tryRemoveOptionValue(options, {row:0, col:5}, 7);
        expect(newOptions).not.toBeNull();
        if (newOptions!==null)
            expect(newOptions.data[0][5]).toEqual([1,4]);

    });

    
});

describe('Sudoku solver solves correctly', ()=>{
    test('solve basic Sudoku unique solution', ()=>{
        const sudokuData = [
            [null,8,3,9,2,1,6,5,7],
            [9,6,7,3,4,5,8,2,1],
            [2,5,1,8,7,6,4,9,3],
            [5,4,8,1,3,2,9,7,6],
            [7,2,9,5,6,4,1,3,8],
            [1,3,6,7,9,8,2,4,5],
            [3,7,2,6,8,9,5,1,4],
            [8,1,4,2,5,3,7,6,9],
            [6,9,5,4,1,7,3,8,2]
        ];
        
        const solutionData = [
            [4,8,3,9,2,1,6,5,7],
            [9,6,7,3,4,5,8,2,1],
            [2,5,1,8,7,6,4,9,3],
            [5,4,8,1,3,2,9,7,6],
            [7,2,9,5,6,4,1,3,8],
            [1,3,6,7,9,8,2,4,5],
            [3,7,2,6,8,9,5,1,4],
            [8,1,4,2,5,3,7,6,9],
            [6,9,5,4,1,7,3,8,2]
        ];

        const grid = new SudokuGrid(STANDARD_GRID_SIZE, sudokuData);
        const solution = grid.solve();
        expect(solution).not.toBeNull();
        if (solution!=null)
            expect(solution.data).toEqual(solutionData);
    });


    test('solve Easy sudoku unique solution', ()=>{
        const easySudokuSolution = [
            [4,8,3,9,2,1,6,5,7],
            [9,6,7,3,4,5,8,2,1],
            [2,5,1,8,7,6,4,9,3],
            [5,4,8,1,3,2,9,7,6],
            [7,2,9,5,6,4,1,3,8],
            [1,3,6,7,9,8,2,4,5],
            [3,7,2,6,8,9,5,1,4],
            [8,1,4,2,5,3,7,6,9],
            [6,9,5,4,1,7,3,8,2]
        ];

        const grid = new SudokuGrid(STANDARD_GRID_SIZE, easySudoku);
        const solution = grid.solve();
        expect(solution).not.toBeNull();
        if (solution!=null)
            expect(solution.data).toEqual(easySudokuSolution);
    });
});