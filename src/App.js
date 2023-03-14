import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Components/Form/Signup';
import { Fragment } from 'react';
import { createBrowserRouter, Route,RouterProvider,Switch } from 'react-router-dom';
import SignIn from './Components/Form/SignIn';
import Profile from './Components/Profile/Profile';
import ProfileUpdate from './Components/Profile/ProfileUpdate';
import ForgetPass from './Components/Profile/Forgetpass';
import Main from './Components/Form/Main';
import AddExpense from './Components/AddExpense';

function App() {
  const router1=createBrowserRouter([
  
  {path:'/',element:<SignIn />},
  {path:'/login',element:<SignUp />},
  {path:'/Profile',element:<Profile />},
  {path:'/Update',element:<ProfileUpdate />},
  {path:'/Forget',element:<ForgetPass />},
  {path:'/Main',element:<Main />},
  {path:'/AddExpense',element:<AddExpense />}
])
  return (
    <>
   <RouterProvider router={router1}></RouterProvider>
   
    </>
  )
    
}

export default App;
