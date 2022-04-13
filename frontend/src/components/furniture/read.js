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
    const [APIDepartment, setAPIDepartment] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        if (!token) navigate('/');
        getApiData();
    }, []);

    const getApiData = () => {
        let endpoints = [
            constants.HOST + '/staffs',
            constants.HOST + '/departments',
            constants.HOST + '/furnitures'
        ];
        Promise.all(endpoints.map((endpoint) => axios.get(
            endpoint, { headers: { token: token } })))
            .then(([{ data: staffs }, { data: departments }, { data: furnitures }]) => {
                setAPIStaff(staffs)
                setAPIDepartment(departments)
                setAPIData(furnitures)
            });
    }

    const setData = (data) => {
        let { furniture_id, name, price, purchased_at, details, department_id, staff_id } = data;
        localStorage.setItem('FurnitureID', furniture_id);
        localStorage.setItem('FurnitureName', name);
        localStorage.setItem('FurniturePrice', price);
        localStorage.setItem('FurniturePurchased', purchased_at);
        localStorage.setItem('FurnitureDetails', details);
        localStorage.setItem('FurnitureDepartment', department_id);
        localStorage.setItem('FurnitureStaff', staff_id);
    }

    const getData = () => {
        if (!token) navigate('/');
        getApiData();
    }

    const onDelete = (device_id) => {
        axios.delete(constants.HOST + '/furnitures/' + device_id, {
            headers: { token: token }
        }).then(() => { getData(); })
    }

    return (
        <div>
            <ButtonCreate administrator={administrator} />
            <h1>Furniture Management</h1>
            <p>
                Create, edit and delete furniture of your department.
            </p>
            <Table singleLine key='DTypesTable'>
                <Table.Header>
                    <Table.Row key={0}>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Details</Table.HeaderCell>
                        <Table.HeaderCell>Staff</Table.HeaderCell>
                        <Table.HeaderCell>Department</Table.HeaderCell>
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
                                <Table.Cell>{data.details}</Table.Cell>
                                <StaffName staff_id={data.staff_id} staffs={APIStaff} />
                                <DepartmentName department_id={data.department_id} departments={APIDepartment} />
                                <Table.Cell>{data.status ? 'Active' : 'Inactive'}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/furnitures/update'>
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
            return <Link to='/furnitures/create'>
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

    function DepartmentName(props) {
        const department_id = props.department_id;
        const departments = props.departments;

        function isSelected(element, index, array) {
            return (element.department_id === department_id) ? true : false;
        }

        var departmentIndex = departments.findIndex(isSelected);
        var name = departments[departmentIndex].name;

        return <Table.Cell>{name}</Table.Cell>
    }
}