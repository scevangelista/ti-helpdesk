import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'semantic-ui-react'
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
    const [APIDataTransfers, setAPIDataTransfers] = useState([]);
    const [APIDataRevisions, setAPIDataRevisions] = useState([]);

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

        let endpoints = [
            constants.HOST + '/staffs/all',
            constants.HOST + '/device-types',
            constants.HOST + '/departments',
            constants.HOST + '/manufacturers',
            constants.HOST + '/transfers/' + localStorage.getItem('DeviceID'),
            constants.HOST + '/revisions/dev/' + localStorage.getItem('DeviceID')
        ];

        Promise.all(endpoints.map((endpoint) => axios.get(
            endpoint, { headers: { token: token } })))
            .then(([
                { data: staffs },
                { data: types },
                { data: departments },
                { data: manufacturers },
                { data: transfers },
                { data: revisions }
            ]) => {
                setAPIDataStaffs(staffs)
                setAPIDataDevTypes(types)
                setAPIDataDepartments(departments)
                setAPIDataManufacturers(manufacturers)
                setAPIDataTransfers(transfers)
                setAPIDataRevisions(revisions)
            });

        if (!token) navigate('/');
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

    const createRevision = () => {
        var dateObj = new Date();
        var date = dateObj.getFullYear() + "-" + String(dateObj.getMonth()).padStart(2, "0") + "-" + String(dateObj.getDate()).padStart(2, "0");
        localStorage.setItem('DeviceIDRevision', device_id);
        localStorage.setItem('StaffIDRevision', staff_id);
        localStorage.setItem('DateRevision', date);

        axios.post(constants.HOST + '/revisions', {
            date,
            device_id,
            staff_id
        },
            {
                headers: { token: token }
            }).then(response => {
                console.log(response.data);
                localStorage.setItem('IDRevision', response.data.revision_id);
                localStorage.setItem('StatusRevision', response.data.status);
            });
    }

    const updateRevision = (data) => {
        let {device_id, revision_id, staff_id, created_at, status} = data;

        localStorage.setItem('DeviceIDRevision', device_id);
        localStorage.setItem('StaffIDRevision', staff_id);
        localStorage.setItem('DateRevision', created_at);
        localStorage.setItem('IDRevision', revision_id);
        localStorage.setItem('StatusRevision', status);
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
                <Link to='/devices/read'>
                    <Button className='red'>Cancel</Button>
                </Link>
                <div class='arruma'></div>
            </Form>
            <Link to='/revisions/create'>
                <Button onClick={() => createRevision()} className='blue bt-new-table'>Create</Button>
            </Link>
            <p class='line-top'>
                Revisions of Device
            </p>
            <RevisionsTable revisions={APIDataRevisions} staffs={APIDataStaffs} />
            <p class='line-top'>
                Transfers of Owners
            </p>
            <TransfersTable transfers={APIDataTransfers} staffs={APIDataStaffs} />
        </div>
    )

    function TransfersTable(props) {
        const transfers = props.transfers;
        const staffs = props.staffs;

        if (transfers.length > 0) {
            return <Table singleLine key='DTransfersTable'>
                <Table.Header>
                    <Table.Row key={0}>
                        <Table.HeaderCell>Old Owner</Table.HeaderCell>
                        <Table.HeaderCell>New Owner</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {transfers.map((data) => {
                        return (
                            <Table.Row key={data.uniqueId}>
                                <StaffName staff_id={data.old_staff_id} staffs={staffs} />
                                <StaffName staff_id={data.new_staff_id} staffs={staffs} />
                                <Table.Cell>{data.created_at}</Table.Cell>                                
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

    function RevisionsTable(props) {
        const revisions = props.revisions;
        const staffs = props.staffs;

        if (revisions.length > 0) {
            return <Table singleLine key='DRevisionsTable'>
                <Table.Header>
                    <Table.Row key={0}>
                        <Table.HeaderCell>Staff</Table.HeaderCell>
                        <Table.HeaderCell>Date of Revision</Table.HeaderCell>
                        <Table.HeaderCell>Created At</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {revisions.map((data) => {
                        return (
                            <Table.Row key={data.uniqueId}>
                                <StaffName staff_id={data.staff_id} staffs={staffs} />
                                <Table.Cell>{data.date}</Table.Cell>
                                <Table.Cell>{data.created_at}</Table.Cell>
                                {(data.status === 1) ?
                                    <Table.Cell>Waiting</Table.Cell>
                                    :
                                    <Table.Cell>Aproved</Table.Cell>
                                }
                                <Table.Cell>
                                    <Link to='/revisions/create'>
                                        <Button onClick={() => updateRevision(data)} className='blue'>Update</Button>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>;
        }
        else {
            return <p class='small'>Device whithout revisions</p>;
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
}
