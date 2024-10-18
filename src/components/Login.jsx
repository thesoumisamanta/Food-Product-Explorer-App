import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.email === credentials.email && storedUser.password === credentials.password) {
            localStorage.setItem('isLoggedIn', true);
            alert('Login successful');
            navigate('/');
        } else {
            alert('Invalid email or password');
        }
    };

    const handleRegister = () => {
        localStorage.setItem('user', JSON.stringify(credentials));
        localStorage.setItem('isLoggedIn', true);
        alert('Registration successful');
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">{isRegistering ? 'Register' : 'Login'}</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    className="mb-4 w-full p-2 border rounded-lg"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="mb-4 w-full p-2 border rounded-lg"
                />

                <button
                    onClick={isRegistering ? handleRegister : handleLogin}
                    className="mb-4 w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    {isRegistering ? 'Register' : 'Login'}
                </button>

                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="w-full p-2 text-blue-500 hover:text-blue-600 transition duration-300"
                >
                    {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
                </button>
            </div>
        </div>
    );
};

export default Login;
