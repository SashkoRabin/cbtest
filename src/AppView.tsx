import React from 'react';
import { useSelector } from 'react-redux';
import Card from './components/Card';
import AddBtn from './components/AddBtn'
import styles from './styles/AddBtn.module.scss';

function AppView({ cities }: { cities: Array<string> }) {

const state = useSelector((store) => store);
console.log('STATE: ', state);
  return (
      <div>
      <AddBtn />
        {cities.length > 0 
          ? cities.map((item: string) => (
              <Card item={item} />
            ))  
          : <div className={styles.empty}>List is empty...</div> }
      
      </div>
  );
}

export default AppView;
