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
import Login from './components/Login';
import UserDetails from './components/UserDetails';
import AddEditUser from './components/AddEditUser';
import 'semantic-ui-css/semantic.min.css'
import Listing from './components/Listing';
import CityProperties from './components/CityProperties';
import Dashboard from './Pages/admin/dashboard/Dashboard';
import AddProductPage from './Pages/admin/AddProductPage';
import UpdateProductPage from './Pages/admin/UpdateProductPage';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import ProtectedRouteForAdmin from './protectedRoute/ProtectedRouteForAdmin';
import ProtectedRouteForUser from './protectedRoute/ProtectedRouteForUser';
import MyState from './context/myState';
import UserPropertyDetails from './components/admin/UserPropertyDetails';
import UpdateSellProperties from './Pages/admin/dashboard/UpdateSellProperties';
import UserHouseImages from './components/admin/UserHouseImages';
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
        element:<ProtectedRouteForUser> <UserDetails/></ProtectedRouteForUser>
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
        path:"/addproduct",
        element:<ProtectedRouteForAdmin><AddProductPage/></ProtectedRouteForAdmin>
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
