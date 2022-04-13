import React, { useState, useEffect } from 'react';
import { Table, Button, Checkbox, Form } from 'semantic-ui-react'
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
    const [APIDataDevices, setAPIDataDevices] = useState([]);
    const [APIType, setAPIType] = useState([]);
    const [loading, setLoading] = useState(true);
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

        let endpoints = [
            constants.HOST + '/devices/staff/'+localStorage.getItem('StaffID'),
            constants.HOST + '/device-types'
        ];
        Promise.all(endpoints.map((endpoint) => axios.get(
            endpoint, { headers: { token: token } })))
            .then(([{ data: staffs }, { data: types }]) => {
                setAPIDataDevices(staffs)
                setAPIType(types)
                setLoading(false);
            });
    }, []);

    const setData = (data) => {
        let { device_id, name, price, purchased_at, details, serial, ip, device_type_id, department_id, manufacturer_id, staff_id } = data;
        localStorage.setItem('DeviceID', device_id);
        localStorage.setItem('DeviceName', name);
        localStorage.setItem('DevicePrice', price);
        localStorage.setItem('DevicePurchased', purchased_at);
        localStorage.setItem('DeviceDetails', details);
        localStorage.setItem('DeviceSerial', serial);
        localStorage.setItem('DeviceIP', ip);
        localStorage.setItem('DeviceType', device_type_id);
        localStorage.setItem('DeviceDepartment', department_id);
        localStorage.setItem('DeviceManufacturer', manufacturer_id);
        localStorage.setItem('DeviceStaff', staff_id);
    }

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

    if(loading){
        return <div>Loading...</div>;
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
            <p class='line-top'>
                Devices of Staff
            </p>
            <DevicesTable devices={APIDataDevices} />
        </div>
    );

    function DevicesTable(props) {
        const devices = props.devices;

        if (devices.length > 0) {
            return <Table singleLine key='DevicesTable'>
                <Table.Header>
                    <Table.Row key={0}>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Serial</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Details</Table.HeaderCell>
                        <Table.HeaderCell>IP</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {devices.map((data) => {
                        return (
                            <Table.Row key={data.uniqueId}>
                                <Table.Cell>{data.name}</Table.Cell>
                                <Table.Cell>{data.serial}</Table.Cell>
                                <DeviceTypeName device_type_id={data.device_type_id} types={APIType} />
                                <Table.Cell>{data.details}</Table.Cell>
                                <Table.Cell>{data.ip ? data.ip : 'Not informed'}</Table.Cell>
                                <Table.Cell>{data.status ? 'Active' : 'Inactive'}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/devices/update'>
                                        <Button onClick={() => setData(data)} className='blue'>Update</Button>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>;
        }
        else {
            return <p class='small'>Device whithout transfers</p>;
        }
    }

    function DeviceTypeName(props) {
        const device_type_id = props.device_type_id;
        const types = props.types;

        function isSelected(element, index, array) {
            return (element.device_type_id === device_type_id) ? true : false;
        }

        var typeIndex = types.findIndex(isSelected);
        var name = types[typeIndex].name;

        return <Table.Cell>{name}</Table.Cell>
    }
}
