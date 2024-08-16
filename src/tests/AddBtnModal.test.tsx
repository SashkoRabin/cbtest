import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddBtnModal from '../components/AddBtnModal';
import { useDispatch } from 'react-redux';
import { useAddCountryQuery } from '../services/weather';
import { addCity } from '../store/citySlice';
import { FULFILLED } from '../constants/general';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
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

describe('AddBtnModal component', () => {
  const mockDispatch = jest.fn();
  const mockSetCities = jest.fn();
  const mockToggleModal = jest.fn();
  const mockCities = [{ name: 'New York', lat: 52, lon: -71 }];

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders input and button correctly', () => {
    render(<AddBtnModal toggleModal={mockToggleModal} cities={mockCities} setCities={mockSetCities} />);
    
    expect(screen.getByPlaceholderText('Search for city...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('handles input change correctly', () => {
    render(<AddBtnModal toggleModal={mockToggleModal} cities={mockCities} setCities={mockSetCities} />);
    
    const input = screen.getByPlaceholderText('Search for city...');
    fireEvent.change(input, { target: { value: 'Los Angeles' } });
    
    expect(input).toHaveValue('Los Angeles');
  });

  test('calls addHandler on button click and updates state correctly', async () => {
    (useAddCountryQuery as jest.Mock).mockReturnValue({
      status: FULFILLED,
      data: [{ name: 'Los Angeles', lat: 34.05, lon: -118.25 }],
    });

    render(<AddBtnModal toggleModal={mockToggleModal} cities={mockCities} setCities={mockSetCities} />);
    
    fireEvent.change(screen.getByPlaceholderText('Search for city...'), { target: { value: 'Los Angeles' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(addCity({
        name: 'Los Angeles',
        lat: 34.05,
        lon: -118.25,
      }));
      expect(mockSetCities).toHaveBeenCalledWith([
        ...mockCities,
        { name: 'Los Angeles', lat: 34.05, lon: -118.25 },
      ]);
      expect(mockToggleModal).toHaveBeenCalled();
      expect(mockSetItem).toHaveBeenCalledWith(
        'City',
        [...mockCities, { name: 'Los Angeles', lat: 34.05, lon: -118.25 }].map(city => city.name).join(',')
      );
    });
  });
});
