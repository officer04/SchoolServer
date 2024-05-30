const Cours = require('../models/Cours.js');
const UserCours = require('../models/UserCours.js');

class CoursController {
  async create(req, res) {
    try {
      const doc = new Cours({
        title: req.body.title,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
      });

      await doc.save();

      return res.status(201).end();
    } catch (err) {
      return res.status(500).json({
        message: 'Не удалось создать курс',
      });
    }
  }

  async remove(req, res) {
    try {
      const postId = req.params.id;

      const post = await Cours.findOneAndDelete({
        _id: postId,
      });

      if (!post) return res.status(404).json({ message: 'Нет такого курса' });

      res.status(204).end();
    } catch (err) {
      return res.status(500).json({
        message: 'Не удалось получить статьи',
      });
    }
  }

  async update(req, res) {
    try {
      const postId = req.params.id;

      const post = await Cours.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          title: req.body.title,
          description: req.body.description,
          imgUrl: req.body.imgUrl,
        },
        { new: true },
      );
      if (!post) return res.status(404).json({ message: 'Нет такого курса' });

      res.json(post);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Не удалось изменить курс',
      });
    }
  }

  async getOneCours(req, res) {
    try {
      const coursId = req.params.id;
      const modules = await Cours.findOne({ _id: coursId });

      res.status(200).json(modules);
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: 'Не удалось получить курс',
      });
    }
  }

  async getCoursesUser(req, res) {
    try {
      const userId = req.user.id;
      const userCours = await UserCours.find({ userId });
      const courdId = userCours.map((item) => item.coursId);
      const cours = await Cours.find({ _id: courdId });

      res.status(200).json(cours);
    } catch (e) {
      return res.status(500).json({
        message: 'Не удалось получить курсы',
      });
    }
  }

  
  // async getCoursesUserAdmin(req, res) {
  //   try {
  //     const userId = req.params.id;
  //     const userCours = await UserCours.find({ userId });
  //     const courdId = userCours.map((item) => item.coursId);
  //     // const cours = await Cours.find({ _id: courdId });

  //     res.status(200).json(courdId);
  //   } catch (e) {
  //     return res.status(500).json({
  //       message: 'Не удалось получить курсы',
  //     });
  //   }
  // }

  async getCoursesUserAdmin(req, res) {
    try {
      const userId = req.params.id;
      console.log(userId)
      const userCours = await UserCours.find({ userId: req.params.id });
      console.log(userCours)
      // const courdId = userCours.map((item) => item.coursId);
      // const cours = await Cours.find({ _id: courdId });

      // res.status(200).json(courdId);

    } catch (e) {
      return res.status(500).json({
        message: 'Не удалось получить курсы',
      });
    }
  }

  async getAll(req, res) {
    try {
      const courses = await Cours.find();
      res.status(200).json(courses);
    } catch (e) {
      return res.status(500).json({
        message: 'Не удалось получить курсы',
      });
    }
  }
}

module.exports = new CoursController();
