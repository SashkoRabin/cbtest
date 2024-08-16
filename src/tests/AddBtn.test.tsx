import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddBtn from '../components/AddBtn';
import AddBtnModal, { IAddBtnModal } from '../components/AddBtnModal';
import { ReactComponent as PlusIcon } from '../images/plus.svg';

jest.mock('../components/AddBtnModal', () => ({ toggleModal, cities, setCities }: IAddBtnModal) => (
  <div>
    <button onClick={toggleModal}>Close Modal</button>
    <div>{cities.length}</div>
  </div>
));

describe('AddBtn component', () => {
  const mockSetCities = jest.fn();
  const mockCities = [{ name: 'New York', lon: 51, lat: -71 }];

  test('renders the plus icon', () => {
    render(<AddBtn cities={mockCities} setCities={mockSetCities} />);
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
  });

  test('toggles modal visibility on icon click', () => {
    render(<AddBtn cities={mockCities} setCities={mockSetCities} />);
    
    expect(screen.queryByText('Close Modal')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId('plus-icon'));
    
    expect(screen.getByText('Close Modal')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Close Modal'));
    
    expect(screen.queryByText('Close Modal')).not.toBeInTheDocument();
  });

  test('passes cities and setCities to AddBtnModal', () => {
    render(<AddBtn cities={mockCities} setCities={mockSetCities} />);
    fireEvent.click(screen.getByTestId('plus-icon'));
    
    const modal = screen.getByText(mockCities.length.toString());
    expect(modal).toBeInTheDocument();
  });
});
