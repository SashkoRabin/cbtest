import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../styles/AddBtn.module.scss';
import ICity from '../interfaces/city';
import { FULFILLED } from '../constants/general';
import { addCity } from '../store/citySlice';
import { useAddCountryQuery } from '../services/weather';


interface IAddBtnModal {
  toggleModal: () => void;
  cities: ICity[];
  setCities: (value: ICity[]) => void;
};

function AddBtnModal ({ toggleModal, cities, setCities }: IAddBtnModal) {
  const [city, setCity] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const data = useAddCountryQuery(query);
  const dispatch = useDispatch();
  
  const addHandler = () => {
    if (city.length > 0) {
      setQuery(city);
    };
  };

  useEffect(() => {
    if (data.status === FULFILLED && data.data.length > 0) {
      const item = data.data[0];
      if (item.name && item.lat && item.lon) {
        dispatch(addCity({
          name: item?.name,
          lat: item?.lat,
          lon: item?.lon,
        }));
        const newCities = [...cities, {
              name: item?.name,
              lat: item?.lat,
              lon: item?.lon,
            } as ICity]
        setCities(newCities);
        localStorage.setItem('City', newCities.map((it: ICity) => it.name).join(','));
        toggleModal();
      };
    };
  }, [data.status]);

  return (
    <div className={styles.modalWr}>
      <input 
        className={styles.input} 
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value as string || '')}
        placeholder="Search for city..." 
      />
      <button 
        className={styles.btn} 
        onClick={() => {
          addHandler();
        }}>
          Search
        </button>
    </div>
  );
};

export default AddBtnModal;
