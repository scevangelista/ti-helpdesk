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
    const [ticket_types_id, setID] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!token) navigate('/');
        setID(localStorage.getItem('TTypeID'))
        setName(localStorage.getItem('TTypeName'));
        setDescription(localStorage.getItem('TTypeDescription'));
    }, []);

    const updateAPIData = () => {
        if (!token) navigate('/');
        axios.put(constants.HOST + '/ticket-types/' + ticket_types_id, {
            name,
            description
        },
            {
                headers: { token: token }
            }).then(() => { navigate('/ticket-types/read') })
    }

    return (
        <div>
            <h1>Update Ticket Type</h1>
            <p>
                Update data for a ticket types in organization
            </p>
            <Form className="create-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <input placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
                <Link to='/ticket-types/read'>
                    <Button className='red'>Cancel</Button>
                </Link>
                <div class='arruma'></div>
            </Form>
        </div>
    )
}
