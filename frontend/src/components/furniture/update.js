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
    const [furniture_id, setID] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [purchased_at, setPurchased] = useState('');
    const [details, setDetails] = useState('');
    const [department_id, setDepartment] = useState('');
    const [staff_id, setStaff] = useState('');

    const [APIDataDepartments, setAPIDataDepartments] = useState([]);
    const [APIDataStaffs, setAPIDataStaffs] = useState([]);

    useEffect(() => {
        setID(localStorage.getItem('FurnitureID'))
        setName(localStorage.getItem('FurnitureName'));
        setPrice(localStorage.getItem('FurniturePrice'));
        setPurchased(localStorage.getItem('FurniturePurchased'));
        setDetails(localStorage.getItem('FurnitureDetails'));
        setDepartment(localStorage.getItem('FurnitureDepartment'));
        setStaff(localStorage.getItem('FurnitureStaff'));

        let endpoints = [
            constants.HOST + '/staffs/all',
            constants.HOST + '/departments'
        ];

        Promise.all(endpoints.map((endpoint) => axios.get(
            endpoint, { headers: { token: token } })))
            .then(([
                { data: staffs },
                { data: departments },
            ]) => {
                setAPIDataStaffs(staffs)
                setAPIDataDepartments(departments)
            });

        if (!token) navigate('/');
    }, []);

    const updateAPIData = () => {
        if (!token) navigate('/');
        axios.put(constants.HOST + '/furnitures/' + furniture_id, {
            name,
            price,
            purchased_at,
            details,
            department_id,
            staff_id
        },
            {
                headers: { token: token }
            }).then(() => {
                navigate('/furnitures/read')
            })
    }

    return (
        <div>
            <h1>Update Furniture</h1>
            <p>
                Update data for a furniture in organization
            </p>
            <Form className="create-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <input placeholder='Price' value={price} type="number" onChange={(e) => setPrice(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Purchased at</label>
                    <input placeholder='Purchased' value={purchased_at} type="date" onChange={(e) => setPurchased(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Details</label>
                    <input placeholder='Details' value={details} onChange={(e) => setDetails(e.target.value)} />
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
                        <option value='0'>-- Select Option --</option>
                        {APIDataStaffs.map((data) => {
                            return (
                                <option value={data.staff_id}>{data.first_name} {data.last_name}</option>
                            )
                        }
                        )}
                    </select>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
                <Link to='/furnitures/read'>
                    <Button className='red'>Cancel</Button>
                </Link>
                <div class='arruma'></div>
            </Form>
        </div>
    )
}
