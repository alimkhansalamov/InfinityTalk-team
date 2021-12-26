const { Router } = require('express');

const { languagesController } = require('../controllers/languages.controller');

const router = Router();

router.post('/', languagesController.addLanguage);
router.get('/', languagesController.getAll);
router.patch('/:name', languagesController.createLanguage);
router.delete('/:name', languagesController.deleteLanguage);

module.exports = router;
