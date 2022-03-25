import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getToken } from '../useToken';
import * as constants from '../../configs/constants';

export default function Create() {
    const token = getToken();
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const postData = () => {
        axios.post(constants.HOST + "/ticket-types", {
            name,
            description
        },
            {
                headers: { token: token }
            }).then(() => { navigate('/ticket-types/read') })
    }

    return (
        <div>
            <h1>Create Ticket Type</h1>
            <p>
                Add types of your tickets
            </p>
            <Form className="create-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <input placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
                </Form.Field>
                <div class='arruma'></div>
                <Button onClick={postData} type='submit'>Submit</Button>
                <Link to='/ticket-types/read'>
                    <Button className='red'>Cancel</Button>
                </Link>
                <div class='arruma'></div>
            </Form>
        </div>
    )
}