const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports.usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find()
        .populate('defaultLanguage')
        .populate('learnLanguage');
      res.json(users);
    } catch (e) {
      res.json(e);
    }
  },
  updateImg: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        img: req.file.path,
      });
      res.status(200).json(req.file.path);
    } catch (e) {
      res.json(e);
    }
  },

  registerUser: async (req, res) => {
    try {
      const {
        login,
        name,
        email,
        img,
        password,
        defaultLanguage,
        learnLanguage,
      } = req.body;

      const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
          user: 'infinitytalk@inbox.ru',
          pass: '0Xj8QkXv7fkGneQynn41',
        },
      });

      await transporter.sendMail({
        from: '"Node js" <infinitytalk@inbox.ru>',
        to: `${email}`,
        subject: 'Message from Node js',
        text: 'This message was sent from Node js server.',
        html: 'Поздравляю, вы успешно зарегистрировались!',
      });

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const user = await User.create({
        login: login,
        name: name,
        email: email,
        img: img,
        password: hash,
        defaultLanguage: defaultLanguage,
        learnLanguage: learnLanguage,
      });

      res.json(user);
    } catch (e) {
      return res.status(400).json({
        error: 'Ошибка при регистрации.' + e,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({ login });
      if (!user) {
        return res.status(401).json({
          error: 'Неверный логин',
        });
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({
          error: 'Неверный пароль',
        });
      }

      const payload = {
        id: user._id,
        login: user.login,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: '24h',
      });
      res.json({
        token,
        userId: user._id,
      });
    } catch (e) {
      res.json(e);
    }
  },
  getOneUser: async (req, res) => {
    try {
      const id = req.user.id;

      const user = await User.findById(id);
      res.json(user);
    } catch (e) {
      console.log(e.message);
    }
  },
  editUserInfo: async (req, res) => {
    try {
      console.log(req.body);
      await User.findByIdAndUpdate(req.user.id, {
        $set: { ...req.body },
      });
      const user = await User.findById(req.user.id);
      res.status(200).json(user);
    } catch (e) {
      console.log(e);
    }
  },
};
