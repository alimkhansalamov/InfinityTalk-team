const { Router } = require('express');

const { chatsController } = require('../controllers/chats.controller');

const router = Router();

router.post('/', chatsController.addChat);
router.get('/', chatsController.getAllChats);
router.patch('/:id', chatsController.addMessageInChat);
router.delete('/:id', chatsController.deleteChat);
router.get('/user/:id', chatsController.getChatsByUserId);

module.exports = router;
