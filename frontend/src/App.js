import React from 'react';
import { Button } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import useToken, { getAdministrator, getToken } from './components/useToken';
import Login from './login/login';
import StaffRead from './components/staff/read';
import StaffCreate from './components/staff/create';
import StaffUpdate from './components/staff/update';
import StaffPassword from './components/staff/password';
import DeviceTypeRead from './components/device_type/read';
import DeviceTypeCreate from './components/device_type/create';
import DeviceTypeUpdate from './components/device_type/update';
import ManufacturerRead from './components/manufacturer/read';
import ManufacturerCreate from './components/manufacturer/create';
import ManufacturerUpdate from './components/manufacturer/update';
import DepartmentRead from './components/department/read';
import DepartmentCreate from './components/department/create';
import DepartmentUpdate from './components/department/update';
import TicketTypeRead from './components/ticket_type/read';
import TicketTypeCreate from './components/ticket_type/create';
import TicketTypeUpdate from './components/ticket_type/update';
import DeviceRead from './components/device/read';
import DeviceCreate from './components/device/create';
import DeviceUpdate from './components/device/update';
import FurnitureCreate from './components/furniture/create';
import FurnitureRead from './components/furniture/read';
import FurnitureUpdate from './components/furniture/update';
import RevisionCreate from './components/revision/create';
import DashboardAdmin from './components/dashboard/administrator';
import * as constants from './configs/constants';


function App() {
    const { setToken } = useToken();
    const token1 = getToken();
    const administrator1 = getAdministrator();

    async function logout(){
        await sessionStorage.removeItem('token');
        await sessionStorage.clear();
        window.location.href="/";
    }

    if (!token1) {
        return <Login setToken={setToken} />
    }
    else {
        return (
            <div className="main">
                <header>
                    <h1 id='brandinglogo'>TI Management</h1>
                    <div class='logout'>
                        <Button onClick={() => logout()} className='blue btLogout'>Logout</Button>
                    </div>
                </header>
                <section>
                    <nav>
                        <h3>Main Menu</h3>
                        <ul>
                            <Menu administrator={administrator1}/>
                        </ul>
                    </nav>
                    <div id='content'>
                        <Router>
                            <Routes>
                                <Route path="/" element={<DashboardAdmin />} />
                                <Route path="/dashboard-admin" element={<DashboardAdmin />} />
                                <Route path="/staffs/read" element={<StaffRead />} />
                                <Route path="/staffs/create" element={<StaffCreate />} />
                                <Route path="/staffs/update" element={<StaffUpdate />} />
                                <Route path="/staffs/password" element={<StaffPassword />} />
                                <Route path="/device-types/read" element={<DeviceTypeRead />} />
                                <Route path="/device-types/create" element={<DeviceTypeCreate />} />
                                <Route path="/device-types/update" element={<DeviceTypeUpdate />} />
                                <Route path="/manufacturers/read" element={<ManufacturerRead />} />
                                <Route path="/manufacturers/create" element={<ManufacturerCreate />} />
                                <Route path="/manufacturers/update" element={<ManufacturerUpdate />} />
                                <Route path="/departments/read" element={<DepartmentRead />} />
                                <Route path="/departments/create" element={<DepartmentCreate />} />
                                <Route path="/departments/update" element={<DepartmentUpdate />} />
                                <Route path="/ticket-types/read" element={<TicketTypeRead />} />
                                <Route path="/ticket-types/create" element={<TicketTypeCreate />} />
                                <Route path="/ticket-types/update" element={<TicketTypeUpdate />} />
                                <Route path="/devices/read" element={<DeviceRead />} />
                                <Route path="/devices/create" element={<DeviceCreate />} />
                                <Route path="/devices/update" element={<DeviceUpdate />} />
                                <Route path="/furnitures/read" element={<FurnitureRead />} />
                                <Route path="/furnitures/create" element={<FurnitureCreate />} />
                                <Route path="/furnitures/update" element={<FurnitureUpdate />} />
                                <Route path="/revisions/create" element={<RevisionCreate />} />
                            </Routes>
                        </Router>
                    </div>
                </section>
                <footer>
                    <p>HELPDESK TI - {process.env.REACT_APP_COMPANY} - Local Version {process.env.REACT_APP_VERSION} - Official Version {constants.VERSION}</p>
                </footer>
            </div>
        );
    }
}

function Menu(props){
    if(props.administrator === true)
        return <MenuAdministrator />;
    else
        return <MenuNotAdministrator />;
}

function MenuNotAdministrator() {
    return (
        <div>
            <a href='/devices/read'><li>Devices</li></a>
            <a href='/furnitures/read'><li>Furnitures</li></a>
        </div>);
}

function MenuAdministrator() {
    return (
        <div>
            <p>Management</p>
            <a href='/dashboard-admin'><li>Dashboard</li></a>
            <a href='/devices/read'><li>Devices</li></a>
            <a href='/furnitures/read'><li>Furnitures</li></a>
            <a href='/staffs/read'><li>Staffs</li></a>

            <p>Configurations</p>
            <a href='/departments/read'><li>Departments</li></a>
            <a href='/device-types/read'><li>Device Types</li></a>
            <a href='/manufacturers/read'><li>Manufacturers</li></a>
            <a href='/ticket-types/read'><li>Ticket Types</li></a>
        </div>);
}

export default App;