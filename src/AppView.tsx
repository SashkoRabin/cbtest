import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Card from './components/Card';
import AddBtn from './components/AddBtn';
import ICity from './interfaces/city';
import { addCity } from './store/citySlice';
import styles from './styles/Card.module.scss';

function AppView() {
  const cityList = useSelector((store: { city: ICity[] }) => store.city, shallowEqual);
  const [cities, setCities] = useState<Array<ICity>>(cityList);
  const dispatch = useDispatch();

  useEffect(() => {
    const storage = localStorage.getItem('City') as string || '';
    if (cityList.length > 0 && storage.length === 0) {
      const citiesString = cityList.map((item: ICity) => item.name).join(',');
      localStorage.setItem('City', citiesString);
    }

    if (storage.length > 0 && cityList.length === 0) {
      const arr = storage.split(',');
      arr.map((item) => {
        dispatch(addCity({
          name: item,
          lat: 0,
          lon: 0,
        }));
      });

      setCities(arr.map((item) => ({
          name: item,
          lat: 0,
          lon: 0,
      })));
    }
  }, [cityList]);

  return (
      <div>
        <AddBtn cities={cities} setCities={setCities} />
        <div className={styles.cardsWrapper}>
          {cities.length > 0 
            ? cities.map((item: ICity) => (
                <Card key={item.name + Date.now()} cities={cities} setCities={setCities} item={item.name} />
              ))  
            : <div className={styles.empty}>List is empty...</div> }
        </div>      
      </div>
  );
};

export default AppView;
