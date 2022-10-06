import React from "react";
import { screen, render, within } from "@testing-library/react";

import Grid, { GridProps } from "../components/Grid";
import { SudokuGrid } from "sudoku";

function renderGrid(props: Partial<GridProps> = {}) {
    const defaultProps: GridProps = {
        size: 9,
        grid: new SudokuGrid(9),
        solution: null,
        changeNumber: ()=>null
    };
    return render(<Grid {...defaultProps} {...props} />);
  }

describe("<Grid />", () => {
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