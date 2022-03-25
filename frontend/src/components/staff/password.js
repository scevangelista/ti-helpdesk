import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getToken } from '../useToken';
import * as constants from '../../configs/constants';

export default function Update() {
    let navigate = useNavigate();
    const [staff_id, setID] = useState(null);
    const [first_name, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const token = getToken();

    useEffect(() => {
        if (!token) navigate('/');
        setID(localStorage.getItem('StaffID'))
        setFirstName(localStorage.getItem('StaffFirstName'));
    }, []);

    const updateAPIData = () => {
        if (!token) navigate('/');
        axios.patch(constants.HOST + '/staffs/' + staff_id,
            { password },
            {
                headers: { token: token }
            }).then(() => { navigate('/staffs/read') })
    }

    return (
        <div>
            <h1>Update Password - {first_name}</h1>
            <p>
                Update the password of staff in organization
            </p>
            <Form className="create-form">
                <Form.Field>
                    <label>New Password</label>
                    <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
                <Link to='/staffs/read'>
                    <Button className='red'>Cancel</Button>
                </Link>
                <div class='arruma'></div>
            </Form>
        </div>
    )
}
