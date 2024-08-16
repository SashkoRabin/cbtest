import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardContentView from '../components/CardContentView';
import RefreshBtn from '../components/RefreshBtn';
import { ICON_API_URL } from '../constants/general';
import { CLOUDS, RAIN, FOG, CLEAR } from '../constants/weather';
import { ICityList } from '../interfaces/city';
import styles from '../styles/Card.module.scss';

jest.mock('../components/RefreshBtn', () => () => <div>RefreshBtn</div>);

describe('CardContentView component', () => {
  const mockItem = 'New York';
  const mockLat = 40.7128;
  const mockLon = -74.0060;
  const mockSetCityList = jest.fn();
  const mockCityList: ICityList = {
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
  };

  test('displays weather data correctly', () => {
    render(
      <CardContentView
        item={mockItem}
        lat={mockLat}
        lon={mockLon}
        cityList={mockCityList}
        setCityList={mockSetCityList}
        refBtn={{ current: null }}
      />
    );

    expect(screen.getByText(mockItem)).toBeInTheDocument();
    expect(screen.getByText('Clear sky')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument(); // 293.15 - 273
    expect(screen.getByText('22° / 17°')).toBeInTheDocument(); // (295.15 - 273)° / (290.15 - 273)°

    const weatherIcon = screen.getByAltText('weather icon');
    expect(weatherIcon).toHaveAttribute('src', `${ICON_API_URL}/img/wn/01d@2x.png`);
  });

  test('applies correct background class based on weather main', () => {
    render(
      <CardContentView
        item={mockItem}
        lat={mockLat}
        lon={mockLon}
        cityList={mockCityList}
        setCityList={mockSetCityList}
        refBtn={{ current: null }}
      />
    );

    expect(screen.getByText(mockItem).parentElement).toHaveClass(styles.sunny);
  });

  test('renders RefreshBtn component', () => {
    render(
      <CardContentView
        item={mockItem}
        lat={mockLat}
        lon={mockLon}
        cityList={mockCityList}
        setCityList={mockSetCityList}
        refBtn={{ current: null }}
      />
    );

    expect(screen.getByText('RefreshBtn')).toBeInTheDocument();
  });
});
