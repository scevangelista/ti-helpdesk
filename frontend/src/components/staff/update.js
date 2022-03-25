import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getToken } from '../useToken';
import * as constants from '../../configs/constants';

export default function Update() {
    let navigate = useNavigate();
    const [staff_id, setID] = useState(null);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [administrator, setAdministrator] = useState(false);
    const token = getToken();

    useEffect(() => {
        if (!token) navigate('/');
        setID(localStorage.getItem('StaffID'))
        setFirstName(localStorage.getItem('StaffFirstName'));
        setLastName(localStorage.getItem('StaffLastName'));
        setEmail(localStorage.getItem('StaffEmail'));
        if (localStorage.getItem('StaffAdministrator') === 'false')
            setAdministrator(false);
        else
            setAdministrator(true);
    }, []);

    const updateAPIData = () => {
        if (!token) navigate('/');
        axios.put(constants.HOST + '/staffs/' + staff_id, {
            first_name,
            last_name,
            email,
            administrator
        },
            {
                headers: { token: token }
            }).then(() => {
                navigate('/staffs/read')
            })
    }

    return (
        <div>
            <h1>Update Staff</h1>
            <p>
                Update data for a staff in organization
            </p>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' value={last_name} onChange={(e) => setLastName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Administrator</label>
                    <Checkbox label='Administrator' checked={administrator} onChange={(e) => setAdministrator(!administrator)} />
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
