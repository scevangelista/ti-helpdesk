const Express = require('express');
const upload = require('./../controllers/upload')
const auth = require('./../controllers/auth');
const multer = require('multer');

const routes = Express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './photos/')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + Date.now()+ '.' + ext);
    }
});

const uploadMulter = multer({storage: storage});

routes.post('/', auth.logged, uploadMulter.array('photos', 10), upload.save);

module.exports = routes;