const { Router } = require('express');

const router = Router();

router.use('/users', require('./users.route'));
router.use('/languages', require('./languages.route'));
router.use('/chats', require('./chats.route'));
router.use('/utilities', require('./utilities.route'));

module.exports = router;
