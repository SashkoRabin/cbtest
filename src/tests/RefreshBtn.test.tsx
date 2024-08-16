import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RefreshBtn from '../components/RefreshBtn';
import { useGetInfoByCordQuery } from '../services/weather';
import styles from '../styles/RefreshBtn.module.scss';

jest.mock('../services/weather', () => ({
  useGetInfoByCordQuery: jest.fn(),
}));

describe('RefreshBtn component', () => {
  const mockLat = 40.7128;
  const mockLon = -74.0060;
  const mockSetCityList = jest.fn();
  const mockRefBtn = { current: null };

  const mockData = {
    data: {
      main: {
        temp: 293.15,
        temp_max: 295.15,
        temp_min: 290.15
      },
      weather: [{
        description: 'clear sky',
        main: 'Clear',
        icon: '01d'
      }]
    }
  };

  beforeEach(() => {
    (useGetInfoByCordQuery as jest.Mock).mockReturnValue(mockData);
  });

  test('renders button with correct text and icon', () => {
    render(
      <RefreshBtn
        lat={mockLat}
        lon={mockLon}
        cityList={{}}
        setCityList={mockSetCityList}
        refBtn={mockRefBtn}
      />
    );

    expect(screen.getByText('Refresh')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('calls setCityList with correct data on button click', () => {
    render(
      <RefreshBtn
        lat={mockLat}
        lon={mockLon}
        cityList={{}}
        setCityList={mockSetCityList}
        refBtn={mockRefBtn}
      />
    );

    fireEvent.click(screen.getByText('Refresh'));

    expect(mockSetCityList).toHaveBeenCalledWith(mockData.data);
  });

  test('button click should not break if useGetInfoByCordQuery returns undefined data', () => {
    (useGetInfoByCordQuery as jest.Mock).mockReturnValue({ data: undefined });

    render(
      <RefreshBtn
        lat={mockLat}
        lon={mockLon}
        cityList={{}}
        setCityList={mockSetCityList}
        refBtn={mockRefBtn}
      />
    );

    fireEvent.click(screen.getByText('Refresh'));

    expect(mockSetCityList).toHaveBeenCalledWith(undefined);
  });
});
