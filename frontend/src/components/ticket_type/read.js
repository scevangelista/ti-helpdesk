import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getToken } from '../useToken';
import { useNavigate } from 'react-router';
import * as constants from '../../configs/constants';

export default function Read() {
    const token = getToken();
    const [APIData, setAPIData] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        if (!token) navigate('/');
        axios.get(constants.HOST + '/ticket-types', {
            headers: { token: token }
        }).then((response) => { setAPIData(response.data); })
    }, []);

    const setData = (data) => {
        let { ticket_type_id, name, description } = data;
        localStorage.setItem('TTypeID', ticket_type_id);
        localStorage.setItem('TTypeName', name);
        localStorage.setItem('TTypeDescription', description);
    }

    const getData = () => {
        if (!token) navigate('/');
        axios.get(constants.HOST + '/ticket-types', {
            headers: { token: token }
        }).then((getData) => { setAPIData(getData.data); })
    }

    const onDelete = (ticket_type_id) => {
        if (!token) navigate('/');
        axios.delete(constants.HOST + '/ticket-types/' + ticket_type_id, {
            headers: { token: token }
        }).then(() => { getData(); })
    }

    return (
        <div>
            <Link to='/ticket-types/create'>
                <Button className='gray bt-new'>New</Button>
            </Link>
            <h1>Ticket Type Management</h1>
            <p>
                Create, edit and delete Ticket types of your organization.
            </p>
            <Table singleLine key='TTypesTable'>
                <Table.Header>
                    <Table.Row key={0}>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
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
                                <Table.Cell>{data.description}</Table.Cell>
                                <Table.Cell>{data.status ? 'Active' : 'Inactive'}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/ticket-types/update'>
                                        <Button onClick={() => setData(data)} className='blue'>Update</Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.ticket_type_id)} className='red'>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}