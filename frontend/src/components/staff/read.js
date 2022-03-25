import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getToken, getAdministrator } from '../useToken';
import { useNavigate } from 'react-router';
import * as constants from '../../configs/constants';

export default function Read() {
    const token = getToken();
    const administrator = getAdministrator();

    let navigate = useNavigate();
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        if(!token) navigate('/');
        axios.get(constants.HOST + '/staffs', {
            headers: { token: token }
        }).then((response) => { setAPIData(response.data); })
    }, []);

    const setData = (data) => {
        let { staff_id, first_name, last_name, email, administrator } = data;
        localStorage.setItem('StaffID', staff_id);
        localStorage.setItem('StaffFirstName', first_name);
        localStorage.setItem('StaffLastName', last_name);
        localStorage.setItem('StaffEmail', email);
        localStorage.setItem('StaffAdministrator', (administrator)? true : false);        
    }

    const getData = () => {
        if(!token) navigate('/');
        axios.get(constants.HOST + '/staffs', {
            headers: { token: token }
        }).then((getData) => { setAPIData(getData.data); })
    }

    const onDelete = (staff_id) => {
        if(!token) navigate('/');
        axios.delete(constants.HOST + '/staffs/' + staff_id, {
            headers: { token: token }
           }).then(() => { getData(); })
    }

    return (
        <div>
            <CreateButton />
            <h1>Staff Management</h1>
            <p>
                Create, edit and delete staffs of your organization.
            </p>
            <CreateTable administrator={administrator} data={APIData} />
        </div>
    )

    function CreateButton(){
        if( administrator === true ){
            return <Link to='/staffs/create'>
                <Button className='gray bt-new'>New</Button>
            </Link>;
        }
        else{
            return <div></div>;
        }
    }

    function CreateTable(props){
        if(props.administrator === true){
            return <Table singleLine key='staffsTable'>
                <Table.Header>
                    <Table.Row key={0}>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Administrator</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Password</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {props.data.map((data) => {
                        return (
                            <Table.Row key={data.uniqueId}>
                                <Table.Cell>{data.first_name}</Table.Cell>
                                <Table.Cell>{data.last_name}</Table.Cell>
                                <Table.Cell>{data.email}</Table.Cell>
                                <Table.Cell>{data.administrator ? 'Yes' : 'No'}</Table.Cell>
                                <Table.Cell>{data.status ? 'Active' : 'Inactive'}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/staffs/update'>
                                        <Button onClick={() => setData(data)} className='blue'>Update</Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to='/staffs/password'>
                                        <Button onClick={() => setData(data)} className='gray'>Change</Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.staff_id)} className='red'>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>;
        }
        else{
            return <Table singleLine key='staffsTable'>
                <Table.Header>
                    <Table.Row key={0}>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Administrator</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Password</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {props.data.map((data) => {
                        return (
                            <Table.Row key={data.uniqueId}>
                                <Table.Cell>{data.first_name}</Table.Cell>
                                <Table.Cell>{data.last_name}</Table.Cell>
                                <Table.Cell>{data.email}</Table.Cell>
                                <Table.Cell>{data.administrator ? 'Yes' : 'No'}</Table.Cell>
                                <Table.Cell>{data.status ? 'Active' : 'Inactive'}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/staffs/password'>
                                        <Button onClick={() => setData(data)} className='gray'>Change</Button>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>;
        }
    }
}