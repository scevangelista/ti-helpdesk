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
    const [serial, setSerial] = useState('');
    const [ip, setIp] = useState('');
    const [device_type_id, setDeviceType] = useState('');
    const [department_id, setDepartment] = useState('');
    const [manufacturer_id, setManufacturer] = useState('');
    const [staff_id, setStaff] = useState('');

    const [APIDataDevTypes, setAPIDataDevTypes] = useState([]);
    const [APIDataDepartments, setAPIDataDepartments] = useState([]);
    const [APIDataManufacturers, setAPIDataManufacturers] = useState([]);
    const [APIDataStaffs, setAPIDataStaffs] = useState([]);

    useEffect(() => {
        if (!token) navigate('/');

        axios.get(constants.HOST + '/device-types', {
            headers: { token: token }
        }).then((response) => { setAPIDataDevTypes(response.data); })

        axios.get(constants.HOST + '/departments', {
            headers: { token: token }
        }).then((response) => { setAPIDataDepartments(response.data); })

        axios.get(constants.HOST + '/manufacturers', {
            headers: { token: token }
        }).then((response) => { setAPIDataManufacturers(response.data); })

        axios.get(constants.HOST + '/staffs', {
            headers: { token: token }
        }).then((response) => { setAPIDataStaffs(response.data); })
    }, []);

    const postData = () => {
        if (!token) navigate('/');
        axios.post(constants.HOST + "/devices", {
            name,
            price,
            purchased_at,
            details,
            serial,
            ip,
            device_type_id,
            department_id,
            manufacturer_id,
            staff_id
        },
            {
                headers: { token: token }
            }).then(() => { navigate('/devices/read') });
    }

    return (
        <div>
            <h1>Create Device</h1>
            <p>
                Add device of your staff
            </p>
            <Form className="create-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <input placeholder='Price' type="number" onChange={(e) => setPrice(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Purchased at</label>
                    <input placeholder='Purchased' type="date" onChange={(e) => setPurchased(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Details (TYPE, CPU, MEM, STORAGE, SCREEN SIZE)</label>
                    <input placeholder='Details' onChange={(e) => setDetails(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Serial</label>
                    <input placeholder='Serial' onChange={(e) => setSerial(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>IP</label>
                    <input placeholder='IP' onChange={(e) => setIp(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Device Type</label>
                    <select value={device_type_id} onChange={(e) => setDeviceType(e.target.value)}>
                        <option value='0'>-- Select Option --</option>
                        {APIDataDevTypes.map((data) => {
                            return (
                                <option value={data.device_type_id}>{data.name}</option>
                            )
                        }
                        )}
                    </select>
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
                    <label>Manufacturer</label>
                    <select value={manufacturer_id} onChange={(e) => setManufacturer(e.target.value)}>
                        <option value='0'>-- Select Option --</option>
                        {APIDataManufacturers.map((data) => {
                            return (
                                <option value={data.manufacturer_id}>{data.name}</option>
                            )
                        }
                        )}
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Staff Owner</label>
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
                <Link to='/devices/read'>
                    <Button className='red'>Cancel</Button>
                </Link>
                <div class='arruma'></div>
            </Form>
        </div>
    )
}