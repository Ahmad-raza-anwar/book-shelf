import React from 'react'
import Signup from './components/forms/signup';
import Login from './components/forms/login';
import UserProfile from './components/user/userProfile';
import { Routes, Route, Navigate } from 'react-router-dom';
import Pagenotfound from './components/basic/pagenotfound';
import UserDashboard from './components/user/userDashboard';
// import AdminDashboard from './components/admin/adminDashboard';
// import Users from './components/admin/users';
import ForgotPassword from './components/forms/forgotpassword';
// import UpdateUser from './components/admin/updateuser';
import ResetPassword from './components/forms/resetpassword';
// import AdminRoute from './components/route/protectAdmin'
import ProtectedRoute from './components/route/protectRoute';
import { useGlobalContext } from './components/context/context';
import Addnew from './components/books/Addnew';
import EditBook from './components/books/EditBook';

const App = () => {

  const { auth } = useGlobalContext();
  
  return (
    <Routes>
      <Route
        path="/"
        element = {
          auth?.token ? (
              <Navigate to="/user" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path='/newbook' element={<ProtectedRoute><Addnew /></ProtectedRoute>} />
      <Route path='/editbook' element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
      <Route path='/user' element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
      <Route path='/user/userProfile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

      <Route path='/register' element={<Signup />} /> 
      <Route path='/login' element={
          auth?.token ? (            
              <Navigate to="/user" replace />
          ) : (
            <Login />
          )
        } />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path='/resetPassword/:id/:token' element={<ResetPassword />} />
      <Route path='*' element={<Pagenotfound />} />
    </Routes>
  )
}

export default App

