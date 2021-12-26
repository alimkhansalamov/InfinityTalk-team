const Chat = require('../models/Chat.model');

module.exports.chatsController = {
  addChat: async (req, res) => {
    try {
      const chat = await Chat.create({
        members: req.body.members,
        messages: []
      });
      console.log(req.body.members);
      res.json(chat);
    } catch (error) {
      res.json(error);
    }
  },
  addMessageInChat: async (req, res) => {
    try {
      await Chat.findByIdAndUpdate(req.params.id, {
        $push: {"messages": req.body.messages}
      });
      res.json('Изменения успешно добавлены');
    } catch (e) {
      res.json(e);
    }
  },
  getChatsByUserId: async (req, res) => {
    try {
      const chats = await Chat.find({ members: { $in: [req.params.id] }}).populate('members');;
      res.json(chats);
    } catch (e) {
      res.json(e);
    }
  },
  deleteChat: async (req, res) => {
    try {
      await Chat.findByIdAndRemove(req.params.id);
      res.json('Успешно удалено');
    } catch (e) {
      res.json(e);
    }
  },
  getAllChats: async (req, res) => {
    const allLanguages = await Chat.find().populate('members');
    res.json(allLanguages);
  },
};
