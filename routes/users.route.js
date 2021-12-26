const { Router } = require('express');
const { authMiddleware } = require('../middlewares/Auth.middleware');
const upload = require('../middlewares/upload');

const router = Router();

const { usersController } = require('../controllers/users.controller');

router.get('/', usersController.getAllUsers);
router.post('/regist', usersController.registerUser);
router.patch('/updateImg', authMiddleware, upload.single('img'), usersController.updateImg);
router.post('/login', usersController.login);
router.get('/profile', authMiddleware, usersController.getOneUser);
router.patch('/edit', authMiddleware, usersController.editUserInfo);

module.exports = router;
