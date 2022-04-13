import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { getToken } from '../useToken';
import * as constants from '../../configs/constants';

export default function Dashboard() {
    const token = getToken();
    let navigate = useNavigate();
    const [APIDevice, setAPIDevice] = useState([]);
    const [APIStaff, setAPIStaff] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        if (!token) navigate('/');
        getApiData();
    }, []);

    const getApiData = () => {
        let endpoints = [
            constants.HOST + '/staffs/all',
            constants.HOST + '/devices'
        ];
        Promise.all(endpoints.map((endpoint) => axios.get(
            endpoint, { headers: { token: token } })))
            .then(([{ data: staffs }, { data: devices }]) => {
                setAPIStaff(staffs)
                setAPIDevice(devices)
                setLoading(false);
            });
    }

    if(loading){
        return <div>Loading...</div>;
    }
    return (
        <div className='dashboard'>
            <h1>Dashboard</h1>
            <p>
                Status panel of your organization.
            </p>

            <div className='statusDashboard'>
                <div className='status'>
                    <h4>Staffs</h4>
                    <p>{APIStaff.length}</p>
                </div>
            </div>

            <div className='statusDashboard'>
                <div className='status'>
                    <h4>Devices</h4>
                    <p>{APIDevice.length}</p>
                </div>
            </div>
        </div>
    );
}