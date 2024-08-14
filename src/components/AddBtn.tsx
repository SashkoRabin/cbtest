import React, { useState } from 'react';
import styles from '../styles/AddBtn.module.scss';
import AddBtnModal from './AddBtnModal';
import ICity from '../interfaces/city';
import { ReactComponent as PlusIcon } from '../images/plus.svg';
import { useAddCountryQuery } from '../services/weather';

interface IAddBtn {
  cities: ICity[];
  setCities: (value: ICity[]) => void;
};

function AddBtn ({ cities, setCities }: IAddBtn) {
  const [modal, setModal] = useState<boolean>(false);

  const toggleModal = () => (setModal((prev) => !prev));

  return (
    <div className={styles.icon}>
      <PlusIcon onClick={toggleModal} />
      {modal && 
        <AddBtnModal 
          toggleModal={toggleModal} 
          cities={cities} 
          setCities={setCities} 
        /> }
    </div>
  );
};

export default AddBtn;
