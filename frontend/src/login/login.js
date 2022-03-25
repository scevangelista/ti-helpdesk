import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as constants from '../configs/constants';
import './login.css';

async function loginUser(credentials) {
    return fetch(constants.HOST + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

export default function Login({setToken}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        
        if(token.staff_id === 0) alert('Verify your credentials and try again!');
        setToken(token);
    } 

    return(
        <div id='login'>
            <div className="login-wrapper">
                <h1>HelpDesk Manager</h1>
                <p>Please login to access</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={e => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}