const Language = require('../models/Language.model');

module.exports.languagesController = {
  addLanguage: async (req, res) => {
    try {
      await Language.create({
        name: req.body.name,
      });
      res.json('Язык успешно добавлен');
    } catch (error) {
      res.json(error);
    }
  },
  createLanguage: async (req, res) => {
    try {
      await Language.findByIdAndUpdate(req.params.name, {
        name: req.body.name,
      });
      res.json('Изменения успешно добавлены');
    } catch (e) {
      res.json(e);
    }
  },
  deleteLanguage: async (req, res) => {
    try {
      await Language.findByIdAndRemove(req.params.name);
      res.json('Успешно удалено');
    } catch (e) {
      res.json(e);
    }
  },
  getAll: async (req, res) => {
    const allLanguages = await Language.find();
    res.json(allLanguages);
  },
};
