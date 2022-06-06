## HelpDesk TI
### :gear: In Development :gear:

System for managing IT assets and tickets.  
The system will allow create devices and monitoring this devices via ICMP (Ping).  
In Future we'll creates a client software for run in computers of organization for monitoring APPs and Hardware in each device.  

**This project uses: NodeJS with Express and Sequelize, ReactJS and MySQL.**

##
### Checklist
**Backend**
- [x] Backend in NodeJS
- [x] Historic of device owners 31/03/2022
- [ ] Ping monitor service

**Frontend Modules**
- [x] Staff
- [x] Device
- [x] Furniture
- [x] Configurations
- [x] Historic of device owners 31/03/2022
- [x] Revision of device
- [ ] Reports
- [ ] Dashboard

**Client Software**
- [ ] Project


##
### How to Run :electric_plug:  

**Requirements**
- Docker and docker-compose
- NodeJS v16

**Instructions to run:**
- First, clone the repository and in backend folder move the .env.example to .env and inform values of your setup  

```
$cd backend
$mv .env.example .env
//For default not alter .env content
$nano .env
```  

- Second, in frontend alter the .env.example to .env and inform values of your setup and build the sources
**Change in REACT_APP_HOST *backend* to docker IP server**
```
$cd ..
$cd frontend
$mv .env.example .env
$nano .env
$npm install
$npm run build
```

- Third, configure Docker compose with your values of backend .env  
```
$cd ..
//For default not alter the docker-compose.yml content
$nano docker-compose.yml
```

- Fourth, execute docker-compose  
```
$docker-compose build
$docker-compose start
```

- Access the system in web browser:
http://ip_of_docker_server

username: ti@localhost  
password: helpdesk

##
### Changelog:
**1.0.2**  
- Add. Furnitures

**1.0.1**  
- Add. Revisions
- Add. Photo upload (multer)
- Show devices of staff in staff edit page

**1.0.0** 
- Initial Version
