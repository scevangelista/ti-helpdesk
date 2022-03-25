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
- [ ] Historic of device owners 
- [ ] Ping monitor service

**Frontend Modules**
- [x] Staff
- [x] Device
- [x] Configurations
- [ ] Historic of device owners
- [ ] Revision of device
- [ ] Reports
- [ ] Dashboard

**Client Software**
- [ ] Project


##
### How to Run

**Requirements**
- Node v16
- Mysql Server

**Comands to run:**
- First, in backend alter the .env.example to .env and inform values of your setup.  

```
$cd backend
$mv .env.example .env
//For default not alter .env content
$nano .env
```  

- Second, in frontend alter the .env.example to .env and inform values of your setup.  
```
$cd ..
$cd frontend
$mv .env.example .env
//For default not alter .env content
$nano .env
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