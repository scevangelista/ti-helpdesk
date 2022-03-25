import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getToken, getAdministrator } from '../useToken';
import * as constants from '../../configs/constants';

export default function Create() {
    let navigate = useNavigate();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [administrator, setAdministrator] = useState(false);

    const token = getToken();
    const administratorS = getAdministrator();

    const postData = () => {
        if (!token) navigate('/');
        axios.post(constants.HOST + "/staffs", {
            first_name,
            last_name,
            email,
            password,
            administrator
        },
            {
                headers: { token: token }
            }).then(() => { navigate('/staffs/read') })
    }

    return (
        <div>
            <h1>Create Staff</h1>
            <p>
                Add staff for your organization
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
                    <label>Password</label>
                    <input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Administrator</label>
                    <Checkbox label='Administrator' checked={administrator} onChange={(e) => setAdministrator(!administrator)} />
                </Form.Field>
                <div class='arruma'></div>

                <CreateButton />
                <Link to='/staffs/read'>
                    <Button className='red'>Cancel</Button>
                </Link>
                <div class='arruma'></div>
            </Form>
        </div>
    )

    function CreateButton() {
        if (administratorS) {
            return <Button onClick={postData} type='submit'>Submit</Button>;
        }
        else {
            return <div></div>;
        }
    }
}