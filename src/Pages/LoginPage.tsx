import React, { useState } from 'react';
import ToastifyShow from '../Components/ToastifyShow';

interface LoginProps {
  onLoginSuccess: () => void; 
}

const LoginPage= ({ onLoginSuccess }:any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  const dummyUsername = 'user';
  const dummyPassword = '12345';

  const handleLogin = (e:any) => {
    e.preventDefault();

    // Simple authentication logic
    if (username === dummyUsername && password === dummyPassword) {
      // alert('Login Successful!');
      onLoginSuccess(); // Trigger login success action
      ToastifyShow("Login Successfully","success")
    } else {
      ToastifyShow("Invalid Credentials","error")

    }
  };

  return (
    <div className="flex justify-center">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleLogin}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="username">Username</label>
              <input type="text" placeholder="Username" 
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input type="password" placeholder="Password" 
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex items-baseline justify-between">
              <button type="submit" 
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
