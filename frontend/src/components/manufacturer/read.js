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
        axios.get(constants.HOST + '/manufacturers', {
            headers: { token: token }
        }).then((response) => { setAPIData(response.data); })
    }, []);

    const setData = (data) => {
        let { manufacturer_id, name } = data;
        localStorage.setItem('ManufacturerID', manufacturer_id);
        localStorage.setItem('ManufacturerName', name);
    }

    const getData = () => {
        if (!token) navigate('/');
        axios.get(constants.HOST + '/manufacturers', {
            headers: { token: token }
        }).then((getData) => { setAPIData(getData.data); })
    }

    const onDelete = (manufacturer_id) => {
        if (!token) navigate('/');
        axios.delete(constants.HOST + '/manufacturers/' + manufacturer_id, {
            headers: { token: token }
        }).then(() => { getData(); })
    }

    return (
        <div>
            <Link to='/manufacturers/create'>
                <Button className='gray bt-new'>New</Button>
            </Link>
            <h1>Manufacturers Management</h1>
            <p>
                Create, edit and delete manufacturers of your devices.
            </p>
            <Table singleLine key='ManufacturersTable'>
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
                                    <Link to='/manufacturers/update'>
                                        <Button onClick={() => setData(data)} className='blue'>Update</Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.manufacturer_id)} className='red'>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}