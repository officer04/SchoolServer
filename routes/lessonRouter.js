const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/RoleMiddleware');
const controller = require('../controllers/lessonController');

// router.post('/cours', roleMiddleware(['ADMIN']), controller.create);
router.post('/', controller.create);
router.delete('/:id', controller.remove);
// router.get('/', controller.getAll);
router.get('/:id', controller.getLesson);
router.get('/details/:id', controller.getLessonOne);

module.exports = router;
