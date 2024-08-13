import React, { useState } from 'react';
import styles from '../styles/AddBtn.module.scss';
import AddBtnModal from './AddBtnModal';
import { ReactComponent as PlusIcon } from '../images/plus.svg';
import { useAddCountryQuery } from '../services/weather';

function AddBtn () {
  const [modal, setModal] = useState<boolean>(false);
  // const { data, error, isLoading } = useAddCountryQuery<string>('London');
  // console.log(data);

  const toggleModal = () => (setModal((prev) => !prev));

  return (
    <div className={styles.icon}>
      <PlusIcon onClick={toggleModal} />
      {modal && <AddBtnModal toggleModal={toggleModal} /> }
    </div>
  );
}

export default AddBtn;
