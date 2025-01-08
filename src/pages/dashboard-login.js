import React, { useState, useEffect } from 'react';
import { useMyContext } from '../components/context';
import { useNavigate } from 'react-router-dom';

import "../sass/dashboard-login.scss";

function DashboardLogin() {
    const navigate = useNavigate();
    const { setActiveItem } = useMyContext();
    const [activeTab, setActiveTab] = useState('support-chat');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        setActiveItem('dashboard_login');
    }, [setActiveItem]);

    const handleLogin = async () => {
        setError(null);
        try {
            const response = await fetch('https://api.dmv-gc.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token
                localStorage.setItem('token', data.token);

                // Navigate to the dashboard
                navigate('/s_dashboard');
            } else {
                // Handle login error
                setError(data.msg || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className='dashboard-login-main'>
            <div className='content-holder-main'>
                <h4>Sign In</h4>
                {error && <div className="error-message">{error}</div>}
                <div className="input-holder">
                    <input
                        className='form-control'
                        type="text"
                        placeholder='User Name'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-holder">
                    <input
                        className='form-control'
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className='btn button-primary btn-c-rounded' onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default DashboardLogin;
