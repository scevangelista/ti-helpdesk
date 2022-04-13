import React, { useEffect, useState } from 'react';
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
    const [price, setPrice] = useState('');
    const [purchased_at, setPurchased] = useState('');
    const [details, setDetails] = useState('');
    const [department_id, setDepartment] = useState('');
    const [staff_id, setStaff] = useState('');

    const [APIDataDepartments, setAPIDataDepartments] = useState([]);
    const [APIDataStaffs, setAPIDataStaffs] = useState([]);

    useEffect(() => {
        if (!token) navigate('/');

        axios.get(constants.HOST + '/departments', {
            headers: { token: token }
        }).then((response) => { setAPIDataDepartments(response.data); })

        axios.get(constants.HOST + '/staffs', {
            headers: { token: token }
        }).then((response) => { setAPIDataStaffs(response.data); })
    }, []);

    const postData = () => {
        if (!token) navigate('/');
        axios.post(constants.HOST + "/furnitures", {
            name,
            price,
            purchased_at,
            details,
            department_id,
            staff_id
        },
            {
                headers: { token: token }
            }).then(() => { navigate('/furnitures/read') });
    }

    return (
        <div>
            <h1>Create Furniture</h1>
            <p>
                Add furniture of department
            </p>
            <Form className="create-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <input placeholder='Price' type="number" step='0.1' min='0' onChange={(e) => setPrice(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Purchased at</label>
                    <input placeholder='Purchased' type="date" onChange={(e) => setPurchased(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Details</label>
                    <input placeholder='Details' onChange={(e) => setDetails(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Department</label>
                    <select value={department_id} onChange={(e) => setDepartment(e.target.value)}>
                        <option value='0'>-- Select Option --</option>
                        {APIDataDepartments.map((data) => {
                            return (
                                <option value={data.department_id}>{data.name}</option>
                            )
                        }
                        )}
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Responsible Staff</label>
                    <select value={staff_id} onChange={(e) => setStaff(e.target.value)}>
                        <option valuye='0'>-- Select Option --</option>
                        {APIDataStaffs.map((data) => {
                            return (
                                <option value={data.staff_id}>{data.first_name} {data.last_name}</option>
                            )
                        }
                        )}
                    </select>
                </Form.Field>
                <div class='arruma'></div>
                <Button onClick={postData} type='submit'>Submit</Button>
                <Link to='/furnitures/read'>
                    <Button className='red'>Cancel</Button>
                </Link>
                <div class='arruma'></div>
            </Form>
        </div>
    )
}