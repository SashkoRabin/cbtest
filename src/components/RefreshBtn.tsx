import React, { MutableRefObject } from 'react';
import { useGetInfoByCordQuery } from '../services/weather';
import { ICityList } from '../interfaces/city';
import styles from '../styles/RefreshBtn.module.scss';

interface IRefreshBtn {
  lat: number;
  lon: number;
  cityList: object;
  setCityList: (data: ICityList) => void;
  refBtn: MutableRefObject<null>;
}

function RefreshBtn ({ lat, lon, cityList, setCityList, refBtn }: IRefreshBtn) {
  const data = useGetInfoByCordQuery({ lat, lon });

  const refreshHandler = () => {
    setCityList(data.data);
  }

  return (
    <div>
      <button type="button" className={styles.button} onClick={refreshHandler}>
        <span className={styles.button__text}>Refresh</span>
        <span className={styles.button__icon} ref={refBtn}>
          <svg role="img" className={styles.svg} height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M35.3 12.7c-2.89-2.9-6.88-4.7-11.3-4.7-8.84 0-15.98 7.16-15.98 16s7.14 16 15.98 16c7.45 0 13.69-5.1 15.46-12h-4.16c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55l-6.45 6.45h14v-14l-4.7 4.7z"></path><path d="M0 0h48v48h-48z" fill="none"></path></svg>
        </span>
      </button>
    </div>  
  );
};

export default RefreshBtn;
