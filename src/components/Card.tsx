import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCity } from '../store/citySlice';
import { useAddCountryQuery } from '../services/weather';
import { FULFILLED } from '../constants/general';
import ICity from '../interfaces/city';
import CardContent from './CardContent';
import CityInfo from './CityInfo';
import styles from '../styles/Card.module.scss';

interface ICard {
  item: string;
  cities: ICity[];
  setCities: (value: ICity[]) => void;
};

function Card ({ item, cities, setCities }: ICard) {
  const dispatch = useDispatch();
  const data = useAddCountryQuery(item);
  const [cityInfo, setCityInfo] = useState<boolean>(false);

  const toggleCityInfo = () => setCityInfo((prev: boolean) => !prev );

  const removeHandler = () => {
      if (item) {
        dispatch(removeCity(item));
        const changedArr = cities.filter((it: ICity) => it.name !== item);
        localStorage.setItem('City', changedArr.map((it: ICity) => it.name).join(','));
        setCities(changedArr);
      };
  };

  return (
    <div className={styles.cardWr} onClick={toggleCityInfo}>
      {data.status === FULFILLED && <CardContent item={item} lat={data.data[0].lat} lon={data.data[0].lon} />}
      <img className={styles.minusImg} onClick={removeHandler} src="minus.png" />
      {cityInfo && 
        <CityInfo 
          name={item} 
          toggleCityInfo={toggleCityInfo} 
          lat={data.data[0].lat}
          lon={data.data[0].lon}
          cityInfo={cityInfo} 
      />}
    </div>  
  );
};

export default Card;
