import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [role, setRole] = useState('user'); // Default to 'user'
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [rePwd, setRePwd] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  async function sendData(e) {
    e.preventDefault();

    if (!fname || !lname || !email || !pwd || !rePwd || !address || !state || !phone) {
      alert('All fields are required!');
      return;
    }

    if (pwd !== rePwd) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3003/auth/register', {
        fname,
        lname,
        email,
        pass: pwd,
        address,
        state,
        phone,
        role
      });

      console.log(response.data);
      alert(response.data.message);
      navigate("/login");  //Redirects to login page after successful registration
    } catch (error) {
      console.error('There was an error:', error);
      alert(error.response?.data?.error || 'Error registering user!');
    }
  }

  return (
    <div className="register-container">
      <div className="register-wrap">
        <h2>Register</h2>
        <form onSubmit={sendData}>
          <div className="form">
            <input type="text" placeholder="First Name" value={fname} onChange={(e) => setFname(e.target.value)} />
            <input type="text" placeholder="Last Name" value={lname} onChange={(e) => setLname(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
            <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
            <input type="password" placeholder="Confirm Password" value={rePwd} onChange={(e) => setRePwd(e.target.value)} />
            <button type="submit">Register</button>
            <p>Already have an account? <Link to="/login">Login Here</Link></p>
          </div>
        </form>
      </div>
    </div>

  );
}

export default Register;