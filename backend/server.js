require('dotenv').config();
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const staffController = require('./../controllers/staff');
const { 
    AuthRoutes,
    ActivityRoutes, 
    DepartmentRoutes, 
    DeviceRoutes,
    DeviceTypesRoutes, 
    ManufacturerRoutes, 
    MonitorRoutes, 
    PingRoutes, 
    PhotoRoutes, 
    RevisionRoutes, 
    StaffRoutes,
    TicketRoutes, 
    TicketTypesRoutes } = require('./src/routes/www');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/login', AuthRoutes);
app.use('/activities', ActivityRoutes);
app.use('/departments', DepartmentRoutes);
app.use('/devices', DeviceRoutes);
app.use('/device-types', DeviceTypesRoutes);
app.use('/monitors', MonitorRoutes);
app.use('/manufacturers', ManufacturerRoutes);
app.use('/pings', PingRoutes);
app.use('/photos', PhotoRoutes);
app.use('/revisions', RevisionRoutes);
app.use('/staffs', StaffRoutes);
app.use('/tickets', TicketRoutes);
app.use('/ticket-types', TicketTypesRoutes);

db.sync(() => console.log(`Database connected: ${process.env.DB_NAME}`)).then(() => {
    staffController.initial();
});

app.listen(4000, () => console.log("Backend listen on port 4000"));
