import React from "react";
import { screen, render, within } from "@testing-library/react";

import Grid, { GridProps } from "../components/Grid";
import { SudokuGrid } from "sudoku";

const DEFAULT_GRID_SIZE = 9;

function buildEmptyData(){
    const data = new Array(DEFAULT_GRID_SIZE);
    for (let i = 0; i < DEFAULT_GRID_SIZE; i++)
        data[i] = new Array(DEFAULT_GRID_SIZE).fill(null); 
    return data;
}

function renderGrid(props: Partial<GridProps> = {}) {
    const defaultProps: GridProps = {
        size: DEFAULT_GRID_SIZE,
        grid: new SudokuGrid(DEFAULT_GRID_SIZE),
        solution: null,
        changeNumber: ()=>null
    };
    return render(<Grid {...defaultProps} {...props} />);
  }

describe("Grid rendering", () => {
  test("should display an empty grid at start", () => {
    renderGrid();
    const grid = screen.getByTestId("grid");
    const boxes:HTMLInputElement[] = within(grid).getAllByRole("spinbutton");

    expect(boxes.length).toBe(9*9);
    for (const box of boxes){
        expect(box.value).toBe("");
    }
    
  });
});

describe("Grid logic", () => {
    test("testing errors in invalid grid, duplicate values in row", () => {
        const gridData = buildEmptyData();
        gridData[0][0] = 3;
        gridData[0][1] = 3;
        const invalidGrid = new SudokuGrid(DEFAULT_GRID_SIZE, gridData);
        renderGrid({grid: invalidGrid});
        const grid = screen.getByTestId("grid");
        const boxes:HTMLInputElement[] = within(grid).getAllByRole("spinbutton");

        for (let i=0; i<boxes.length; i++){
            const box = boxes[i];
            if (i==0 || i==1){
                expect(box.value).toBe("3");
                expect(box.classList.contains("error")).toBe(true);
            }
            else{
                expect(box.value).toBe("");
                expect(box.classList.contains("error")).toBe(false);
            }
            
        }
      
    });

    test("testing errors in invalid grid, duplicate values in column", () => {
        const gridData = buildEmptyData();
        gridData[0][0] = 3;
        gridData[1][0] = 3;
        const invalidGrid = new SudokuGrid(DEFAULT_GRID_SIZE, gridData);
        renderGrid({grid: invalidGrid});
        const grid = screen.getByTestId("grid");
        const boxes:HTMLInputElement[] = within(grid).getAllByRole("spinbutton");

        for (let i=0; i<boxes.length; i++){
            const box = boxes[i];
            if (i==0 || i==DEFAULT_GRID_SIZE){
                expect(box.value).toBe("3");
                expect(box.classList.contains("error")).toBe(true);
            }
            else{
                expect(box.value).toBe("");
                expect(box.classList.contains("error")).toBe(false);
            }
            
        }
    });

    test("testing errors in invalid grid, duplicate values in subgrid", () => {
        const gridData = buildEmptyData();
        gridData[0][0] = 3;
        gridData[1][1] = 3;
        const invalidGrid = new SudokuGrid(DEFAULT_GRID_SIZE, gridData);
        renderGrid({grid: invalidGrid});
        const grid = screen.getByTestId("grid");
        const boxes:HTMLInputElement[] = within(grid).getAllByRole("spinbutton");

        for (let i=0; i<boxes.length; i++){
            const box = boxes[i];
            if (i==0 || i==DEFAULT_GRID_SIZE+1){
                expect(box.value).toBe("3");
                expect(box.classList.contains("error")).toBe(true);
            }
            else{
                expect(box.value).toBe("");
                expect(box.classList.contains("error")).toBe(false);
            }
            
        }
    });
  });