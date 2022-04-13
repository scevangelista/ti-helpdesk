import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getAdministrator, getToken } from '../useToken';
import * as constants from '../../configs/constants';

export default function Update() {
    const token = getToken();
    const administrator = getAdministrator();

    let navigate = useNavigate();
    const [revision_id, setID] = useState('');
    const [staff_id, setStaffId] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [photos, setPhotos] = useState([]);
    const [APIDataStaffs, setAPIDataStaffs] = useState([]);
    const [APIDataDevice, setAPIDataDevice] = useState([]);
    const [APIDataPhoto, setAPIDataPhoto] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) navigate('/');
        setID(localStorage.getItem('IDRevision'))
        setStaffId(localStorage.getItem('StaffIDRevision'));
        setDate(localStorage.getItem('DateRevision'));
        setStatus(localStorage.getItem('StatusRevision'));

        let endpoints = [
            constants.HOST + '/staffs/all',
            constants.HOST + '/devices/' + localStorage.getItem('DeviceIDRevision'),
            constants.HOST + '/photos/rev/' + localStorage.getItem('IDRevision')
        ];

        Promise.all(endpoints.map((endpoint) => axios.get(
            endpoint, { headers: { token: token } })))
            .then(([
                { data: staffs },
                { data: device },
                { data: photo }
            ]) => {
                setAPIDataStaffs(staffs);
                setAPIDataDevice(device);
                setAPIDataPhoto(photo);
                setLoading(false);
            });
    }, []);

    const acceptRevision = (revision_id) => {
        if (!token) navigate('/');
        const status = 2;
        axios.put(constants.HOST + '/revisions/' + revision_id, {
            status
        },
            {
                headers: { token: token }
            }).then(() => {
                navigate('/devices/update')
            })
    }

    const onChangePhotos = (event) => {
        setPhotos(event.target.files);
    };

    const uploadPhotos = () => {
        var formData = new FormData();

        for (let i = 0; i < photos.length; i++) {
            formData.append("photos", photos[i]);
        }

        if (!token) navigate('/');
        axios.post(constants.HOST + "/upload", formData,
            {
                headers: { token: token, 'content-type': 'multipart/form-data' }
            }).then((response) => {
                for (let x = 0; x < response.data.length; x++) {
                    createPhoto("/" + response.data[x].path);
                }
                axios.get(constants.HOST + '/photos/rev/' + localStorage.getItem('IDRevision'), {
                    headers: { token: token }
                }).then((response) => { 
                    setAPIDataPhoto(response.data);
                    navigate('/revisions/create');
                });
            });
    }

    const createPhoto = async (url) => {
        axios.post(constants.HOST + '/photos/', {
            revision_id,
            url
        },
            {
                headers: { token: token }
            }).then(() => {
                return true;
            })
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>Update Revision - #{revision_id}</h1>
            <p>
                Add photos of revision
            </p>
            <Form className="create-form">
                <Form.Field className="field1-4">
                    <label>Staff</label>
                    <StaffNameRevision staff_id={staff_id} staffs={APIDataStaffs} />
                </Form.Field>
                <Form.Field className="field1-4">
                    <label>Date</label>
                    <input readOnly value={date} />
                </Form.Field>
                <Form.Field className="field1-4">
                    <label>Device</label>
                    <input readOnly value={APIDataDevice.name + " - " + APIDataDevice.details} />
                </Form.Field>
                <Form.Field className="field1-4">
                    <label>Status</label>
                    <input readOnly value={(parseInt(status) === 1) ? "Waiting" : "Approved"} />
                </Form.Field>
                {(administrator && parseInt(status) !== 2) ?
                    <Button onClick={() => acceptRevision(revision_id)}>Accept</Button>
                    :
                    <div></div>
                }
                <Link to='/devices/update'>
                    <Button className='red'>Cancel</Button>
                </Link>
                <div class='arruma'></div>
            </Form>
            {(administrator && parseInt(status) !== 2) ?
                <Form className="photo-form" onSubmit={uploadPhotos}>
                    <Form.Field className="field1-4">
                        <label>Upload Photos of Revision</label>
                        <input type='file' multiple name='photo' onChange={onChangePhotos} />
                    </Form.Field>
                    <Button type='submit'>Accept</Button>
                    <div class='arruma'></div>
                </Form>
                :
                <div></div>
            }
            <p class='line-top'>
                Photos of Revision
            </p>
            <PhotosTable photos={APIDataPhoto} />
        </div>
    )

    function StaffNameRevision(props) {
        const staff_id = props.staff_id;
        const staffs = props.staffs;

        function isSelected(element, index, array) {
            return (element.staff_id === parseInt(staff_id)) ? true : false;
        }

        var staffIndex = staffs.findIndex(isSelected);
        var name = staffs[staffIndex].first_name + " " + staffs[staffIndex].last_name;

        return <input readonly placeholder='Name' value={name} />
    }

    function PhotosTable(props) {
        const photos = props.photos;

        if (photos.length > 0) {
            return <Table singleLine key='DevicesTable'>
                <Table.Header>
                    <Table.Row key={0}>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Photo</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {photos.map((data) => {
                        return (
                            <Table.Row key={data.uniqueId}>
                                <Table.Cell>#{data.photo_id}</Table.Cell>
                                <Table.Cell><a href={window.location.origin + data.url} target='_parent'>Show Photo</a></Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>;
        }
        else {
            return <p class='small'>Revision whithout photos</p>;
        }
    }
}
