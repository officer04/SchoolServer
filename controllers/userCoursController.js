const Cours = require('../models/Cours');
const User = require('../models/User');
const UserCours = require('../models/UserCours');
const nodemailer = require('nodemailer');

class UserCoursController {
  async create(req, res) {
    try {
      const doc = new UserCours({
        userId: req.body.userId,
        coursId: req.body.coursId,
      });

      const user = await User.findOne({ _id: req.body.userId });
      const cours = await Cours.findOne({_id: req.body.coursId})

      await doc.save();

      let transporter = nodemailer.createTransport(
        {
          host: 'smtp.mail.ru',
          port: 465,
          secure: true,
          auth: {
            user: 'kadet_2003@list.ru',
            pass: 'RPQZ1D9urSixcGZEhu3k',
          },
        },
        { from: '<kadet_2003@list.ru>' },
      );

      const emailObject = {
        // from: '"Node js" <nodejs@example.com>',
        to: user.email,
        subject: '"Кодемания" Письмо о покупке курса',
        text: 'Покупка курса',
        html: ` <div style=" font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center">
        <div>
          <hr />
          <p><b style="font-size: 20px">Привет, ${user.username}</b></p>
          <p style="font-size: 16px">
            Вы получил это электронное письмо, потому что вы приобрели курс по ${cours.title}. <br />
            Жалем от нашей команды быстрее его начать и достичь с помощью него тех целей, которые вы перед собой ставили.
          </p>
          <hr />
        </div>
      </div>`,
      };

      await transporter.sendMail(emailObject);

      return res.status(201).end();
    } catch (err) {
      return res.status(500).json({
        message: 'Не удалось создать',
      });
    }
  }

  async remove(req, res) {
    try {
      const postId = req.params.id;

      const lesson = await UserCours.findOneAndDelete({
        _id: postId,
      });

      if (!lesson) return res.status(404).json({ message: 'Нет такого курса' });

      res.status(204).end();
    } catch (err) {
      return res.status(500).json({
        message: 'Не удалось получить статьи',
      });
    }
  }

  // async update(req, res) {
  //   try {
  //     const postId = req.params.id;

  //     const post = await UserCours.findOneAndUpdate(
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

  // async getLesson(req, res) {
  //   try {
  //     const moduleId = req.params.id;
  //     const lessons = await Lesson.find({ moduleId: moduleId });
  //     const module = await Module.findOne({ _id: moduleId });
  //     const cours = await Cours.findOne({ _id: module.coursId });

  //     const moduleTitle = module.title;
  //     const coursInfo = { title: cours.title, coursId: cours._id };

  //     const response = {
  //       moduleTitle,
  //       coursInfo,
  //       lessons,
  //     };

  //     res.status(200).json(response);
  //   } catch (e) {
  //     console.log(e);
  //     return res.status(500).json({
  //       message: 'Не удалось получить уроки',
  //     });
  //   }
  // }

  async getAll(req, res) {
    try {
      const courses = await UserCours.find({});

      res.status(200).json(courses);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Не удалось получить карточки',
      });
    }
  }
}

module.exports = new UserCoursController();
