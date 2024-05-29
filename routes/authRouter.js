const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/RoleMiddleware');
const { registerValidation } = require('../validations/validation');

router.post(
  '/registration',
  [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('email', 'Почта не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть от 4 до 10 символов').isLength({ min: 3, max: 20 }),
  ],
  controller.registration,
);

// router.post(
//   '/registration',
//   registerValidation,
//   controller.registration,
// );
router.post('/login', controller.login);
router.get('/users', controller.getUsersAll);
router.delete('/users/:userId', controller.removeUser);
router.patch('/change', authMiddleware, controller.change);
router.post('/reset-password-request', controller.addRequestPassword);
router.post('/reset-password/:requestId', controller.reset);


module.exports = router;
