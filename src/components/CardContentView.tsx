import React, { MutableRefObject } from 'react';
import RefreshBtn from './RefreshBtn';
import { ICON_API_URL } from '../constants/general';
import { RAIN, CLOUDS, FOG, CLEAR } from '../constants/weather';
import { ICityList } from '../interfaces/city';
import styles from '../styles/Card.module.scss';

interface ICardContentView {
  lat: number;
  item: string;
  lon: number;
  cityList: ICityList;
  refBtn: MutableRefObject<null>;
  setCityList: (data: ICityList) => void;
}

function CardContentView ({ item, lat, lon, cityList, setCityList, refBtn }: ICardContentView) {
  const temperature: number = cityList.main.temp || 0;
  const maxTemperature: number = cityList.main.temp_max || 0;
  const minTemperature: number = cityList.main.temp_min || 0;
  const weatherStatus: string = cityList.weather[0].description || '';
  const weatherMain: string = cityList.weather[0].main || '';
  const weatherIcon: string = cityList.weather[0].icon || '';


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
                <img className={styles.weatherIcon} alt="weather icon" src={`${ICON_API_URL}/img/wn/${weatherIcon}@2x.png`} />
            </div>
            <div className={styles.currentTemp}>
                {`${Math.round(temperature - 273)}`}
            </div>
            <div className={styles.minTemp}>
                {`${Math.round(maxTemperature - 273)}° / ${Math.round(minTemperature - 273)}°`}
            </div>
        </div>
        <div className={styles.refresh}>
            <RefreshBtn 
                lat={lat} 
                refBtn={refBtn}
                lon={lon} 
                setCityList={setCityList} 
                cityList={cityList}

             />
        </div>
    </div>
  );
};

export default CardContentView;
