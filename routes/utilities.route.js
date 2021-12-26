const { Router } = require('express');

const { utilitiesController } = require('../controllers/utilities.controller');

const router = Router();

router.get('/', utilitiesController.getUtilities);
router.post('/', utilitiesController.createUtility);
router.delete('/:id', utilitiesController.removeUtility);
router.patch('/:id', utilitiesController.editUtility);

module.exports = router;