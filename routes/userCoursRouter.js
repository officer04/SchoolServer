const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/RoleMiddleware');
const controller = require('../controllers/userCoursController');

router.post('/', controller.create);
router.delete('', controller.remove);
router.get('', authMiddleware, controller.getAll);
// router.get('/:id', controller.getLesson);

module.exports = router;
