const Router = require('express');
const router = new Router();
const StartCoursInfoController = require('../controllers/startCoursInfoController');
const authMiddleware = require('../middleware/authMiddleware')

router.post('',  StartCoursInfoController.create);
router.delete('/:id', StartCoursInfoController.remove);
router.patch('/:id', StartCoursInfoController.update);
router.get('', StartCoursInfoController.getAll);

module.exports = router;
