import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import PetDetails from './PetDetails';
import AdminDashboard from './AdminDashboard';
import AddPet from './AddPet';
import AdoptPet from './AdoptPet';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/petdetails/:id' element={<PetDetails />} />
        <Route path='/admindash' element={<AdminDashboard />} />
        <Route path='/add-pet' element={<AddPet />} />
        <Route path="/adopt" element={<AdoptPet />} />
      </Routes>
    </>
  );
}

export default App;