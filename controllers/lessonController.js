const Cours = require('../models/Cours.js');
const Lesson = require('../models/Lesson.js');
const Module = require('../models/Module.js');

class LessonController {
  async create(req, res) {
    try {
      const moduleId = req.body.moduleId;
      const lessonNumber = req.body.lessonNumber;

      const lessons = await Lesson.find({ moduleId: moduleId });
      const lesson = lessons.map((item) => item.lessonNumber).find((item) => item === lessonNumber);
      if (lesson) {
        return res.status(404).json({ message: 'Урок под таким номером уже есть' });
      }

      const doc = new Lesson({
        title: req.body.title,
        moduleId: req.body.moduleId,
        lessonNumber: req.body.lessonNumber,
        youtubeVideoId: req.body.youtubeVideoId,
      });

      await doc.save();

      return res.status(201).end();
    } catch (err) {
      return res.status(500).json({
        message: 'Не удалось создать урок',
      });
    }
  }

  async remove(req, res) {
    try {
      const postId = req.params.id;

      const lesson = await Lesson.findOneAndDelete({
        _id: postId,
      });

      if (!lesson) return res.status(404).json({ message: 'Нет такого урока' });

      res.status(204).end();
    } catch (err) {
      return res.status(500).json({
        message: 'Не удалось получить урок',
      });
    }
  }

  // async update(req, res) {
  //   try {
  //     const postId = req.params.id;

  //     const post = await Cours.findOneAndUpdate(
  //       {
  //         _id: postId,
  //       },
  //       {
  //         title: req.body.title,
  //         price: req.body.price,
  //         description: req.body.description,
  //       },
  //       { new: true },
  //     );
  //     if (!post) return res.status(404).json({ message: 'Нет такой карты с ценой' });

  //     res.json(post);
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json({
  //       message: 'Не удалось получить карту с ценой',
  //     });
  //   }
  // }

  async getLesson(req, res) {
    try {
      const moduleId = req.params.id;
      const lessons = await Lesson.find({ moduleId: moduleId });
      const module = await Module.findOne({ _id: moduleId });
      const cours = await Cours.findOne({ _id: module.coursId });

      const moduleTitle = module.title;
      const coursInfo = { title: cours.title, coursId: cours._id };

      lessons.sort((a, b) => a.lessonNumber - b.lessonNumber);

      const response = {
        moduleTitle,
        coursInfo,
        lessons,
      };

      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Не удалось получить уроки',
      });
    }
  }

  async getLessonOne(req, res) {
    try {
      const { id } = req.params;
      const lesson = await Lesson.findOne({ _id: id });
      const module = await Module.findOne({ _id: lesson.moduleId });
      const cours = await Cours.findOne({ _id: module.coursId });

      const response = {
        lessonTitle: lesson.title,
        youtubeVideoId: lesson.youtubeVideoId,
        moduleId: lesson.moduleId,
        moduleTitle: module.title,
        coursId: module.coursId,
        coursTitle: cours.title,
      };
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Не удалось получить урок',
      });
    }
  }
}

module.exports = new LessonController();
