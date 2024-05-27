const Price = require('../models/Price.js');
const StartCoursInfo = require('../models/StartCoursInfo.js');

class StartCoursInfoController {
  async remove(req, res) {
    try {
      const postId = req.params.id;

      const post = await StartCoursInfo.findOneAndDelete({
        _id: postId,
      });

      if (!post) res.status(404).json({ message: 'Нет такой статьи' });

      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось получить статьи',
      });
    }
  }

  async update(req, res) {
    try {
      const postId = req.params.id;

      const post = await StartCoursInfo.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          start: req.body.start,
          duration: req.body.duration,
          education: req.body.education,
          cours: req.body.cours,
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
      const doc = new StartCoursInfo({
        start: req.body.start,
        duration: req.body.duration,
        education: req.body.education,
        cours: req.body.cours,
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
      const cards = await StartCoursInfo.find({});

      res.json(cards);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: 'Не удалось получить карточки',
      });
    }
  }
  // get course(req, res, courseCode) => StartCourseInfo.find(x => x.course == courseCode)
}

module.exports = new StartCoursInfoController();
