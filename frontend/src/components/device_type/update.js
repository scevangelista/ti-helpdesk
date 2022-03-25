import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getToken } from '../useToken';
import * as constants from '../../configs/constants';

export default function Update() {
    const token = getToken();
    let navigate = useNavigate();
    const [device_types_id, setID] = useState(null);
    const [name, setName] = useState('');

    useEffect(() => {
        if (!token) navigate('/');
        setID(localStorage.getItem('DTypeID'))
        setName(localStorage.getItem('DTypeName'));
    }, []);

    const updateAPIData = () => {
        if (!token) navigate('/');

        axios.put(constants.HOST + '/device-types/' + device_types_id,
            { name },
            {
                headers: { token: token }
            }).then(() => { navigate('/device-types/read') })
    }

    return (
        <div>
            <h1>Update Device Type</h1>
            <p>
                Update data for a device types in organization
            </p>
            <Form className="create-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
                <Link to='/device-types/read'>
                    <Button className='red'>Cancel</Button>
                </Link>
                <div class='arruma'></div>
            </Form>
        </div>
    )
}
