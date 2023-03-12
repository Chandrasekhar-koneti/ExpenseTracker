import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Components/Form/Signup';
import { Fragment } from 'react';
import { createBrowserRouter, Route,RouterProvider,Switch } from 'react-router-dom';
import SignIn from './Components/Form/SignIn';
import Profile from './Components/Profile';
import ProfileUpdate from './Components/ProfileUpdate';

function App() {
  const router1=createBrowserRouter([
  
  {path:'/',element:<SignIn />},
  {path:'/login',element:<SignUp />},
  {path:'/Profile',element:<Profile />},
  {path:'/Update',element:<ProfileUpdate />}
])
  return (
    <>
   <RouterProvider router={router1}></RouterProvider>
   
    </>
  )
    
}

export default App;
