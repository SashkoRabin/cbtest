import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCity } from '../store/citySlice';
import { useGetInfoByCordQuery } from '../services/weather';
import { ICON_API_URL, FULFILLED } from '../constants/general';
import { RAIN, CLOUDS, FOG, CLEAR } from '../constants/weather';
import ICity from '../interfaces/city';
import RefreshBtn from './RefreshBtn';
import styles from '../styles/Card.module.scss';

interface ICardContent {
  item: string;
  lat: number;
  lon: number;
};

function Card ({ item, lat, lon }: ICardContent) {
  const data = useGetInfoByCordQuery({ lat, lon });
  const weatherContainer = data?.data;
  const temperature: number = weatherContainer?.main.temp || 0;
  const maxTemperature: number = weatherContainer?.main.temp_max || 0;
  const minTemperature: number = weatherContainer?.main.temp_min || 0;
  const weatherStatus: string = weatherContainer?.weather[0].description || '';
  const weatherMain: string = weatherContainer?.weather[0].main || '';
  const weatherIcon: string = weatherContainer?.weather[0].icon || '';

  const getBackground = () => {
      if (weatherMain === CLOUDS) return styles.clouds;
      if (weatherMain === RAIN || weatherMain === FOG) return styles.rain;
      if (weatherMain === CLEAR) return styles.sunny;
      return styles.clouds;
  }
  
  return (
    <div className={`${styles.card} ${getBackground()}`}>
        <p className={styles.title}>{item}</p>
        <div className={styles.temp}>
            <div className={styles.weatherStatus}>
                {weatherStatus.charAt(0).toUpperCase() + weatherStatus.slice(1)}
                <img className={styles.weatherIcon} src={`${ICON_API_URL}/img/wn/${weatherIcon}@2x.png`} />
            </div>
            <div className={styles.currentTemp}>
                {data.status === FULFILLED && `${Math.round(temperature - 273)}`}
            </div>
            <div className={styles.minTemp}>
                {data.status === FULFILLED && `${Math.round(maxTemperature - 273)}° / ${Math.round(minTemperature - 273)}°`}
            </div>
        </div>
        <div className={styles.refresh}>
            <RefreshBtn />
        </div>
    </div>
  );
};

export default Card;
