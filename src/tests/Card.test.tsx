import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/Card';
import { useDispatch } from 'react-redux';
import { useAddCountryQuery } from '../services/weather';
import { removeCity } from '../store/citySlice';
import CityInfo from '../components/CityInfo';
import CardContent from '../components/CardContent';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../services/weather', () => ({
  useAddCountryQuery: jest.fn(),
}));

const mockSetItem = jest.fn();
Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: mockSetItem,
  },
  writable: true,
});

describe('Card component', () => {
  const mockDispatch = jest.fn();
  const mockSetCities = jest.fn();
  const mockCities = [{ name: 'New York', lat: 40.7128, lon: -74.0060 }];
  const mockItem = 'New York';

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useAddCountryQuery as jest.Mock).mockReturnValue({
      status: 'FULFILLED',
      data: [{ lat: 40.7128, lon: -74.0060 }],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders CardContent when data status is FULFILLED', () => {
    render(<Card item={mockItem} cities={mockCities} setCities={mockSetCities} />);
    expect(screen.getByTestId('card_content')).toBeInTheDocument(); 
  });

  test('displays CityInfo when card is clicked', async () => {
    render(<Card item={mockItem} cities={mockCities} setCities={mockSetCities} />);
    
    fireEvent.click(screen.getByTestId('card_content')); 
    
    await waitFor(() => {
      expect(screen.getByText(mockItem)).toBeInTheDocument(); 
    });
  });

  test('hides CityInfo when card is clicked again', async () => {
    render(<Card item={mockItem} cities={mockCities} setCities={mockSetCities} />);
    
    fireEvent.click(screen.getByTestId('card_content')); 
    await waitFor(() => {
      expect(screen.getByText(mockItem)).toBeInTheDocument(); 
    });

    fireEvent.click(screen.getByTestId('card_content')); 
    await waitFor(() => {
      expect(screen.queryByText(mockItem)).not.toBeInTheDocument(); 
    });
  });

  test('calls removeHandler and updates state correctly', () => {
    render(<Card item={mockItem} cities={mockCities} setCities={mockSetCities} />);
    
    fireEvent.click(screen.getByAltText('minus'));

    expect(mockDispatch).toHaveBeenCalledWith(removeCity(mockItem));
    expect(mockSetCities).toHaveBeenCalledWith([]);
    expect(mockSetItem).toHaveBeenCalledWith('City', '');
  });
});
