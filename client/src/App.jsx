
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/authLayout';
import AuthLogin from './pages/auth/AuthLogin';
import AuthRegister from './pages/auth/AuthRegister';
import AdminViewLayout from './components/adminView/AdminViewLayout';
import Dashboard from './pages/adminView/Dashboard';
import Products from './pages/adminView/Products';
import Orders from './pages/adminView/Orders';
import ShoppingViewLayout from './components/shoppingView/ShoppingViewLayout';
import NotFound from './pages/NotFound/NotFound';
import Listing from './pages/shoppingView/Listing';
import CheckOutPage from './pages/shoppingView/CheckOutPage';
import Account from './pages/shoppingView/Account';
import Home from './pages/shoppingView/Home';
import CheckAuth from './components/common/checkAuth';
import UnAuthPage from './pages/un-auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth_slice';
import { Skeleton } from "@/components/ui/skeleton"

function App() {

  const{isAuthenticated,user,isLoading}=useSelector(state=>state.auth)
  const dispatch= useDispatch();


  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  if (isLoading) {
    return <Skeleton className="w-[600px] h-[600px] " />;
 
  }

  console.log(isLoading,user);

  return (
   <div className='flex flex-col overflow-hidden bg-white'>
 
   <Routes>
      <Route path="/auth" element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout/>
        </CheckAuth>
      }>
        <Route path="login" element={<AuthLogin/>} />
        <Route path="register" element={<AuthRegister/>} />
      </Route>

      <Route path='/admin' element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminViewLayout/>
        </CheckAuth>
      }>
         <Route path='dashboard' element={<Dashboard/>} />
         <Route path='products'element={<Products/>} />
         <Route path='orders' element={<Orders/>} />
      </Route>

      <Route path='/shop' element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingViewLayout/>
        </CheckAuth>
      }>
          <Route path='home' element={<Home/>} />
          <Route path='listing' element={<Listing/>} />
          <Route path='checkout' element={<CheckOutPage/>} />
          <Route path='account' element={<Account/>} />
      </Route>

      <Route path='/unauth-page' element={<UnAuthPage/>} />

      <Route path='*' element={<NotFound/>}/>

   </Routes>
   </div>
  )
}

export default App
