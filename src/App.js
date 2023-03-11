import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Components/Form/Signup';
import { Fragment } from 'react';
import { createBrowserRouter, Route,RouterProvider,Switch } from 'react-router-dom';
import SignIn from './Components/Form/SignIn';
import Dummy from './Components/Dummy';

function App() {
  const router1=createBrowserRouter([
  
  {path:'/',element:<SignIn />},
  {path:'/login',element:<SignUp />},
  {path:'/Dummy',element:<Dummy />}
])
  return (
    <>
   <RouterProvider router={router1}></RouterProvider>
   
    </>
  )
    
}

export default App;
