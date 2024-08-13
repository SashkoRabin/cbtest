import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import AppView from './AppView';
import './styles/App.scss';


function App() {
  const [cityArr, setCityArr] = useState<string>('');
  const [cities, setCities] = useState<Array<string>>([]);

  useEffect(() => {
    const storage = localStorage.getItem('City') as string || ''
    if (cityArr.length === 0 && storage.length > 0) {
      setCityArr(storage);
      setCities(storage.split(',') as Array<string> || [])
    }
  }, []);


  console.log(cities.length)
  return (
    <Provider store={store}>
      <AppView cities={cities} />
    </Provider>
  );
}

export default App;
