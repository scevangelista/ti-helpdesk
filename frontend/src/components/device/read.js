import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { getAdministrator, getToken } from '../useToken';
import * as constants from '../../configs/constants';

export default function Read() {
    const token = getToken();
    const administrator = getAdministrator();
    const [APIData, setAPIData] = useState([]);
    const [APIStaff, setAPIStaff] = useState([]);
    const [APIType, setAPIType] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        if (!token) navigate('/');
        getApiData();
    }, []);

    const getApiData = () => {
        let endpoints = [
            constants.HOST + '/staffs',
            constants.HOST + '/device-types',
            constants.HOST + '/devices'
        ];
        Promise.all(endpoints.map((endpoint) => axios.get(
            endpoint, { headers: { token: token } })))
            .then(([{ data: staffs }, { data: types }, { data: devices }]) => {
                setAPIStaff(staffs)
                setAPIType(types)
                setAPIData(devices)
            });
    }

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

    const getData = () => {
        if (!token) navigate('/');
        getApiData();
    }

    const onDelete = (device_id) => {
        axios.delete(constants.HOST + '/devices/' + device_id, {
            headers: { token: token }
        }).then(() => { getData(); })
    }

    return (
        <div>
            <ButtonCreate administrator={administrator} />
            <h1>Device Management</h1>
            <p>
                Create, edit and delete devices of your staff.
            </p>
            <Table singleLine key='DTypesTable'>
                <Table.Header>
                    <Table.Row key={0}>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Serial</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Details</Table.HeaderCell>
                        <Table.HeaderCell>Staff</Table.HeaderCell>
                        <Table.HeaderCell>IP</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row key={data.uniqueId}>
                                <Table.Cell>{data.name}</Table.Cell>
                                <Table.Cell>{data.serial}</Table.Cell>
                                <DeviceTypeName device_type_id={data.device_type_id} types={APIType} />
                                <Table.Cell>{data.details}</Table.Cell>
                                <StaffName staff_id={data.staff_id} staffs={APIStaff} />
                                <Table.Cell>{data.ip ? data.ip : 'Not informed'}</Table.Cell>
                                <Table.Cell>{data.status ? 'Active' : 'Inactive'}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/devices/update'>
                                        <Button onClick={() => setData(data)} className='blue'>Update</Button>
                                    </Link>
                                </Table.Cell>
                                <ButtonDelete administrator={administrator} device={data.device_id} />
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )

    function ButtonDelete(props) {
        if (props.administrator === true) {
            return <Table.Cell>
                <Button onClick={() => onDelete(props.device)} className='red'>Delete</Button>
            </Table.Cell>;
        }
        else {
            return <div></div>;
        }
    }

    function ButtonCreate(props) {
        if (props.administrator === true) {
            return <Link to='/devices/create'>
                <Button className='gray bt-new'>New</Button>
            </Link>;
        }
        else {
            return <div></div>;
        }
    }

    function StaffName(props) {
        const staff_id = props.staff_id;
        const staffs = props.staffs;

        function isSelected(element, index, array) {
            return (element.staff_id === staff_id) ? true : false;
        }

        var staffIndex = staffs.findIndex(isSelected);
        var name = staffs[staffIndex].first_name + " " + staffs[staffIndex].last_name;

        return <Table.Cell>{name}</Table.Cell>
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