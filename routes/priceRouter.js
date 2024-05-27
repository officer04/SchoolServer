const Router = require('express');
const router = new Router();
const PriceController = require('./../controllers/priceController');
const authMiddleware = require('./../middleware/authMiddleware')

router.post('', authMiddleware, PriceController.create);
router.delete('/:id', PriceController.remove);
router.patch('/:id', PriceController.update);
router.get('', PriceController.getAll);

module.exports = router;
