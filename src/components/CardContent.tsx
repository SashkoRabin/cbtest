import React, { useState, useEffect, MutableRefObject } from 'react';
import { useGetInfoByCordQuery } from '../services/weather';
import { FULFILLED } from '../constants/general';
import { ICityList } from '../interfaces/city';
import CardContentView from './CardContentView'

interface ICardContent {
  item: string;
  lat: number;
  lon: number;
  refBtn: MutableRefObject<null>;
};

function CardContent ({ item, lat, lon, refBtn }: ICardContent) {
  const data = useGetInfoByCordQuery({ lat, lon });
  const [cityList, setCityList] = useState<ICityList>();

  useEffect(() => {
    if (!cityList && data.status === FULFILLED) {
        setCityList(data.data as ICityList);
    }
  }, [cityList, data.status]);

  return (data.status === FULFILLED && cityList)
    ? <CardContentView item={item} cityList={cityList as ICityList} lat={lat} lon={lon} refBtn={refBtn} setCityList={setCityList} /> 
    : <div>Loading...</div>
}

export default CardContent;
