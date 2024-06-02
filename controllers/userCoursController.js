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
      await doc.save();

      const user = await User.findOne({ _id: req.body.userId });
      const cours = await Cours.findOne({_id: req.body.coursId})
      

      let transporter = nodemailer.createTransport(
        {
          host: 'smtp.mail.ru',
          port: 465,
          secure: true,
          auth: {
            user: 'kodemania@mail.ru',
            pass: 'TXw4ZmrecDAXpu95Z15V',
          },
        },
        { from: '<kodemania@mail.ru>' },
      );

      // let transporter = nodemailer.createTransport(
      //   {
      //     host: 'mail.code-mania.ru',
      //     port: 25,
      //     secure: false,
      //     auth: {
      //       user: 'manager@code-mania.ru',
      //       pass: 'qwerty123',
      //     },
      //     tls: {
      //       rejectUnauthorized: false     // Отключаем проверку сертификата
      //     }
      //   },
      //   { from: '<manager@code-mania.ru>' },
      // );

      const emailObject = {
        // from: '"Node js" <nodejs@example.com>',
        to: user.email,
        subject: 'Письмо о покупке курса',
        text: 'Покупка курса',
        html: ` <div style=" font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center">
        <div>
          <hr />
          <p><b style="font-size: 20px">Дорогой ученик, ${user.username}</b></p>
          <p style="font-size: 16px; margin-bottom: 15px">
          Спасибо за покупку курса ${cours.title} в нашей онлайн школе! Мы рады приветствовать вас в нашем образовательном сообществе.
          </p>
          <p style="font-size: 16px; margin-bottom: 15px;">Мы уверены, что выбранный вами курс станет полезным и интересным для вас. <br/>
          Наши преподаватели постараются сделать процесс обучения максимально эффективным и увлекательным.</p>
          <p style="font-size: 16px; margin-bottom: 15pxr">Желаем вам удачи и успехов в обучении!</p>
          <p style="font-size: 16px;"> С уважением, Команда "Кодемания"</p>
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
