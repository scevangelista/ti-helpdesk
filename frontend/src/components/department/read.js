import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getToken } from '../useToken';
import { useNavigate } from 'react-router';
import * as constants from '../../configs/constants';

export default function Read() {
    const token = getToken();
    let navigate = useNavigate();
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        if (!token) navigate('/');
        axios.get(constants.HOST + '/departments', {
            headers: { token: token }
        }).then((response) => { setAPIData(response.data) })
    }, []);

    const setData = (data) => {
        let { department_id, name } = data;
        localStorage.setItem('DepartmentID', department_id);
        localStorage.setItem('DepartmentName', name);
    }

    const getData = () => {
        if (!token) navigate('/')
        axios.get(constants.HOST + '/departments', {
            headers: { token: token }
        }).then((getData) => { setAPIData(getData.data); })
    }

    const onDelete = (department_id) => {
        if (!token) navigate('/')
        axios.delete(constants.HOST + '/departments/' + department_id, {
            headers: { token: token }
        }).then(() => { getData(); })
    }

    return (
        <div>
            <Link to='/departments/create'>
                <Button className='gray bt-new'>New</Button>
            </Link>
            <h1>Departments Management</h1>
            <p>
                Create, edit and delete departments of your organization.
            </p>
            <Table singleLine key='departmentsTable'>
                <Table.Header>
                    <Table.Row key={0}>
                        <Table.HeaderCell>Name</Table.HeaderCell>
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
                                <Table.Cell>{data.status ? 'Active' : 'Inactive'}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/departments/update'>
                                        <Button onClick={() => setData(data)} className='blue'>Update</Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.department_id)} className='red'>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}