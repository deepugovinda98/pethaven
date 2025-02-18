import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import PetDetails from './PetDetails';
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/petdetails' element={<PetDetails />} />
        <Route path='/admindash' element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
