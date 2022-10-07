import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('initial appeareance',()=>{

  test('solve button should be disabled on start', () => {
    render(<App />);
    const solveButton:HTMLButtonElement = screen.getByRole("button", { name: "Solve" });
    expect(solveButton.disabled).toBe(true);
  });

})

