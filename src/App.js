import React from 'react'
import Header from './components/Header'
import {Outlet} from "react-router-dom";
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import { PriceProvider } from './utils/priceContext';
import MyState from './context/myState';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="app">
      {/* <Provider store={appStore}> */}
      <PriceProvider>
         
          <Header/>
        <Outlet/>
        <Footer/>
       
      </PriceProvider>
       {/* </Provider> */}
    </div>
  )
}

export default App
