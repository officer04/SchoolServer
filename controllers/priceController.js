const Price = require('../models/Price.js');
const Role = require('../models/Role.js');

class PriceController {
  async remove(req, res) {
    try {
      const postId = req.params.id;

      const post = await Price.findOneAndDelete({
        _id: postId,
      });

      if (!post) res.status(404).json({ message: 'Нет такой статьи' });

      res.status(201).end();
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось получить карту с ценой',
      });
    }
  }

  async update(req, res) {
    try {
      const postId = req.params.id;

      const post = await Price.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
        },
        { new: true },
      );
      if (!post) res.status(404).json({ message: 'Нет такой карты с ценой' });

      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось получить карту с ценой',
      });
    }
  }

  async create(req, res) {
    try {
      const doc = new Price({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
      });

      const post = await doc.save();

      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось создать статью',
      });
    }
  }

  async getAll(req, res) {
    try {
      const cards = await Price.find({});

      res.json(cards);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: 'Не удалось получить карточки',
      });
    }
  }
}

module.exports = new PriceController();
