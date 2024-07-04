import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Error from './components/Error';
import About from './components/About';
import Contact from './components/Contact';
import Body from './components/Body';
import UserDetails from './components/UserDetails';
import AddEditUser from './components/AddEditUser';
import 'semantic-ui-css/semantic.min.css'
import Listing from './components/ListingProperties/Listing';
import CityProperties from './components/CityProperties';
import Dashboard from './Pages/admin/dashboard/Dashboard';
import UpdateProductPage from './Pages/admin/UpdateProductPage';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import ProtectedRouteForAdmin from './protectedRoute/ProtectedRouteForAdmin';
import ProtectedRouteForUser from './protectedRoute/ProtectedRouteForUser';
import MyState from './context/myState';
import UserPropertyDetails from './components/admin/UserPropertyDetails';
import UpdateSellProperties from './Pages/admin/dashboard/UpdateSellProperties';
import UserHouseImages from './components/admin/UserHouseImages';
import UserSellHousesImages from './components/admin/UserSellHousesImages';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import AccountSection from './components/AccountSection';
import Account from './components/Account';
import PropertyDetails from './components/PropertyDetails';
import PropertyPrice from './components/PropertyPrice';


// import { PersistGate } from 'redux-persist/integration/react';
// import persistStore from 'redux-persist/es/persistStore';

// let persistor=persistStore(appStore);
const appRouter= createBrowserRouter([ 
  
  {

    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Body/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path:"/edit-profile",
        element:<ProtectedRouteForUser> <Account/></ProtectedRouteForUser>
      },
      {
        path:"/add",
        element:<ProtectedRouteForUser> <AddEditUser/> </ProtectedRouteForUser>
      },
      {
        path:"/update/:id",
        element:<ProtectedRouteForUser>  <AddEditUser/> </ProtectedRouteForUser>
      } ,
      {
        path:"/listing",
        element:<ProtectedRouteForUser> <Listing/> </ProtectedRouteForUser>
      },
      {
        path:"/city/:cityId",
        element:<CityProperties/>
      },
      {
        path:"/propertyData/:id",
        element:<PropertyDetails/>
      },
      {
        path:"/property-pricing",
        element:<PropertyPrice/>
      }
      
    ],
    errorElement:<Error/>
  },
  {
    path:"/signIn",
    element:<Login/>
  },
  {
    //now user can't access the admin dashbord
    path:"/admin-dashboard",
    element:<ProtectedRouteForAdmin><Dashboard/></ProtectedRouteForAdmin>
  },
  {
    path:"/updateproduct/:id",
    element:<ProtectedRouteForAdmin><UpdateProductPage/></ProtectedRouteForAdmin>
  }
  ,
  {
    path:"/updateSellproduct/:id",
    element:<ProtectedRouteForAdmin><UpdateSellProperties/></ProtectedRouteForAdmin>
  }
  ,
  {
    path:"/userproperties/:userId",
    element:<ProtectedRouteForAdmin><UserPropertyDetails/></ProtectedRouteForAdmin>
  }
  ,{
    path:"/rentImagesPage",
    element:<UserHouseImages/>
  },{
    path:"/sellImagesPage",
    element:<UserSellHousesImages/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={appStore}>
     <MyState>
      {/* <PersistGate persistor={persistor}> */}
        <RouterProvider router={appRouter}/>
    {/* </PersistGate> */}
    </MyState>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
