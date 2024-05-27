const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/RoleMiddleware');
const controller = require('./../controllers/coursController');

// router.post('/cours', roleMiddleware(['ADMIN']), controller.create);
router.post('/', controller.create);
router.delete('/:id', controller.remove);
router.patch('/:id', controller.update);
router.get('/student', authMiddleware, controller.getCoursesUser);
router.get('', authMiddleware, controller.getAll);
router.get('/:id', controller.getOneCours);

module.exports = router;
