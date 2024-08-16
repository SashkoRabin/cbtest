import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CityInfo from '../components/CityInfo';
import { useGetInfoByCordQuery, useGetHourlyWeatherQuery } from '../services/weather';
import { ICON_API_URL, FULFILLED } from '../constants/general';
import { CLOUDS, RAIN, FOG, CLEAR } from '../constants/weather';
import styles from '../styles/CityInfo.module.scss';

jest.mock('../services/weather', () => ({
  useGetInfoByCordQuery: jest.fn(),
  useGetHourlyWeatherQuery: jest.fn(),
}));

describe('CityInfo component', () => {
  const mockName = 'New York';
  const mockLat = 40.7128;
  const mockLon = -74.0060;
  const mockToggleCityInfo = jest.fn();
  const mockCityInfo = true;

  const mockWeatherData = {
    status: FULFILLED,
    data: {
      main: {
        temp: 293.15,
        temp_max: 295.15,
        temp_min: 290.15
      },
      weather: [{
        description: 'clear sky',
        main: CLEAR,
        icon: '01d'
      }]
    }
  };

  const mockHourlyData = {
    status: FULFILLED,
    data: {
      list: [
        { dt: 1674488400, main: { temp: 293.15 } },
        { dt: 1674492000, main: { temp: 295.15 } },
        { dt: 1674495600, main: { temp: 290.15 } }
      ]
    }
  };

  beforeEach(() => {
    (useGetInfoByCordQuery as jest.Mock).mockReturnValue(mockWeatherData);
    (useGetHourlyWeatherQuery as jest.Mock).mockReturnValue(mockHourlyData);
  });

  test('displays weather data correctly', async () => {
    render(
      <CityInfo
        name={mockName}
        lat={mockLat}
        lon={mockLon}
        toggleCityInfo={mockToggleCityInfo}
        cityInfo={mockCityInfo}
      />
    );

    expect(screen.getByText(mockName)).toBeInTheDocument();
    expect(screen.getByText('Clear sky')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument(); // 293.15 - 273
    expect(screen.getByText('22° / 17°')).toBeInTheDocument(); // (295.15 - 273)° / (290.15 - 273)°
    
    const weatherIcon = screen.getByAltText('weather icon');
    expect(weatherIcon).toHaveAttribute('src', `${ICON_API_URL}/img/wn/01d@2x.png`);
  });

  test('applies correct background class based on weather main', () => {
    render(
      <CityInfo
        name={mockName}
        lat={mockLat}
        lon={mockLon}
        toggleCityInfo={mockToggleCityInfo}
        cityInfo={mockCityInfo}
      />
    );

    expect(screen.getByText(mockName).parentElement).toHaveClass(styles.sunny);
  });

  test('renders LineChart with hourly data', async () => {
    render(
      <CityInfo
        name={mockName}
        lat={mockLat}
        lon={mockLon}
        toggleCityInfo={mockToggleCityInfo}
        cityInfo={mockCityInfo}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole('chart')).toBeInTheDocument();
    });
  });

  test('does not render LineChart if no hourly data', async () => {
    (useGetHourlyWeatherQuery as jest.Mock).mockReturnValue({
      status: FULFILLED,
      data: { list: [] }
    });

    render(
      <CityInfo
        name={mockName}
        lat={mockLat}
        lon={mockLon}
        toggleCityInfo={mockToggleCityInfo}
        cityInfo={mockCityInfo}
      />
    );

  });
});
