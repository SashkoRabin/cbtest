import React, { useState } from 'react';
import { useGetInfoByCordQuery } from '../services/weather';
import { ICON_API_URL, FULFILLED } from '../constants/general';
import { RAIN, CLOUDS, FOG, CLEAR } from '../constants/weather';
import styles from '../styles/CityInfo.module.scss';

interface ICityInfo {
  name: string;
  lat: number;
  lon: number;
  toggleCityInfo: () => void;
  cityInfo: boolean;
};

function CityInfo ({ name, lat, lon, toggleCityInfo, cityInfo }: ICityInfo) {
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
    <div className={styles.wrapper}>
      <div className={`${styles.modalWr} ${getBackground()}`}>
        <p className={styles.title}>{name}</p>
      </div>
      <div className={styles.blur} />
    </div>  
  );
};

export default CityInfo;
