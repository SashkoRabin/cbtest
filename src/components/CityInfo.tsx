import React from 'react';
import { LineChart, Line, XAxis, Tooltip } from 'recharts';
import { useGetInfoByCordQuery, useGetHourlyWeatherQuery } from '../services/weather';
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

interface IHourlyList {
  name: string;
  temp: number;
  amt: number;
}

function CityInfo ({ name, lat, lon, toggleCityInfo, cityInfo }: ICityInfo) {
  const data = useGetInfoByCordQuery({ lat, lon });
  const hourlyData = useGetHourlyWeatherQuery({ lat, lon });
  const weatherContainer = data?.data;
  const temperature: number = weatherContainer?.main?.temp || 0;
  const maxTemperature: number = weatherContainer?.main?.temp_max || 0;
  const minTemperature: number = weatherContainer?.main?.temp_min || 0;
  const weatherStatus: string = weatherContainer?.weather[0].description || '';
  const weatherMain: string = weatherContainer?.weather[0].main || '';
  const weatherIcon: string = weatherContainer?.weather[0].icon || '';
  const hourlyArr: Array<any> = hourlyData?.data?.list || [];
  const hourlyList: IHourlyList[] = hourlyArr.map((item) => ({
    name: new Date(item.dt * 1000).toUTCString().replace('GMT', ''),
    temp: Math.round(item.main.temp - 273),
    amt: Math.round(item.main.temp - 273)
  }))

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
        <div className={styles.temp}>
            <div className={styles.weatherStatus}>
                {weatherStatus.charAt(0).toUpperCase() + weatherStatus.slice(1)}
                <img className={styles.weatherIcon} alt="weather icon" src={`${ICON_API_URL}/img/wn/${weatherIcon}@2x.png`} />
            </div>
            <div className={styles.currentTemp}>
                {data.status === FULFILLED && `${Math.round(temperature - 273)}`}
            </div>
            <div className={styles.minTemp}>
                {data.status === FULFILLED && `${Math.round(maxTemperature - 273)}° / ${Math.round(minTemperature - 273)}°`}
            </div>
        </div>
        <p className={styles.forecastTitle}>5 day forecast</p>
        {hourlyList && (
          <div className={styles.graphWr}>
            <LineChart role="chart" width={600} height={200} data={hourlyList}>
              <XAxis dataKey="name" />
              <Line type="monotone" dataKey="temp" stroke="#fcc732" />
              <Tooltip />
            </LineChart>
          </div>)}
      </div>
      <div className={styles.blur} />
    </div>  
  );
};

export default CityInfo;
