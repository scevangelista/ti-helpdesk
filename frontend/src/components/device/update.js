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
    const [device_id, setID] = useState(null);
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
        setID(localStorage.getItem('DeviceID'))
        setName(localStorage.getItem('DeviceName'));
        setPrice(localStorage.getItem('DevicePrice'));
        setPurchased(localStorage.getItem('DevicePurchased'));
        setDetails(localStorage.getItem('DeviceDetails'));
        setSerial(localStorage.getItem('DeviceSerial'));
        setIp(localStorage.getItem('DeviceIP'));
        setDeviceType(localStorage.getItem('DeviceType'));
        setDepartment(localStorage.getItem('DeviceDepartment'));
        setManufacturer(localStorage.getItem('DeviceManufacturer'));
        setStaff(localStorage.getItem('DeviceStaff'));

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

    const updateAPIData = () => {
        if (!token) navigate('/');
        axios.put(constants.HOST + '/devices/' + device_id, {
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
            }).then(() => {
                navigate('/devices/read')
            })
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
                    <label>Serial</label>
                    <input placeholder='Serial' value={serial} onChange={(e) => setSerial(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>IP</label>
                    <input placeholder='IP' value={ip} onChange={(e) => setIp(e.target.value)} />
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
                <Button type='submit' onClick={updateAPIData}>Update</Button>
                <Link to='/devices/read'>
                    <Button className='red'>Cancel</Button>
                </Link>
                <div class='arruma'></div>
            </Form>
        </div>
    )
}
