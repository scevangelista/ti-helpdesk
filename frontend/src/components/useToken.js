import { useState } from 'react';
import axios from 'axios';
import * as constants from '../configs/constants';

export default function useToken() {
    const getToken = async () => {
        const tokenString = sessionStorage.getItem('token');
        if(!tokenString) return false;
        const userToken = JSON.parse(tokenString);
        if (!userToken)      
            return false;
        else 
            return userToken;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }
}

export function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if (!userToken) {
        return null;
    }
    else {
        verifyToken(userToken.token);
        return userToken.token
    }
}

export function getAdministrator() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if (!userToken)
        return null;
    else
        return userToken.administrator;  
}

export function verifyToken(token) {
    axios.get(constants.HOST + '/login', {
        headers: { token: token }
    }).then((response) => {
        if (response.data.auth === false) sessionStorage.removeItem('token');
    })
}