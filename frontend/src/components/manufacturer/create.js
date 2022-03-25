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

    const postData = () => {
        if (!token) navigate('/');
        axios.post(constants.HOST + "/manufacturers",
            { name },
            {
                headers: { token: token }
            }).then(() => { navigate('/manufacturers/read') })
    }

    return (
        <div>
            <h1>Create Manufacturer</h1>
            <p>
                Add manufacturer of your devices
            </p>
            <Form className="create-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <div class='arruma'></div>
                <Button onClick={postData} type='submit'>Submit</Button>
                <Link to='/device-types/read'>
                    <Button className='red'>Cancel</Button>
                </Link>
                <div class='arruma'></div>
            </Form>
        </div>
    )
}