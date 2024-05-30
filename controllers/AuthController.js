const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const crypto = require('crypto');
const { createHash } = require('crypto');
const nodemailer = require('nodemailer');
const ResetPasswordRequest = require('../models/ResetPasswordRequest');
const UserCours = require('../models/UserCours');
const userRole = require('./../metadata/roles/userRole');
const adminRole = require('./../metadata/roles/adminRole');

const generateAccessToken = (id, role, username, email) => {
  const payload = {
    id,
    role,
    username,
    email,
  };

  return jwt.sign(payload, secret, { expiresIn: '2h' });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Ошибка при регистрации', errors });
      }
      const { username, password, email } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с таким емайл уже существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const role = await Role.findOne({ _id: userRole.id });
      const user = new User({ username, email, password: hashPassword, role: role.title });
      await user.save();
      const token = generateAccessToken(user._id, user.role, user.username, user.email);

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

      const emailObject = {
        // from: '"Node js" <nodejs@example.com>',
        to: user.email,
        subject: 'Оповещение об успешной регистрации',
        text: 'Покупка курса',
        html: ` <div style=" font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center">
        <div>
          <hr />
          <p><b style="font-size: 20px">Дорогой ученик, ${user.username}.</b></p>
          <p style="font-size: 16px">
            Поздравляем! Ваша учетная запись на сайте "Кодемания" была успешно создана. <br />
          </p>
          <p style="margin-bottom: 15px; font-size: 16px;">Теперь у вас есть доступ к нашим услугам и функциям. Мы рады приветствовать вас в нашем сообществе! <br/>
          Спасибо за регистрацию на нашем сайте. Желаем вам приятного использования наших услуг! <br/></p>
          <p style="font-size: 16px;"> С уважением, Команда "Кодемания"</p>
          <hr />
        </div>
      </div>`,
      };

      await transporter.sendMail(emailObject);

      return res.status(201).json({ token });
    } catch (e) {
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { password, email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: `Пользователь c почтой ${email} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: `Введен не правильный пароль` });
      }

      const token = generateAccessToken(user._id, user.role, user.username, user.email);

      return res.json({ token });
    } catch (e) {
      res.status(500).json({ message: 'Login error' });
    }
  }

  async change(req, res) {
    try {
      const { id } = req.user;
      const user = req.body;

      const updateUserModel = { email: user.email, username: user.username };

      if (user.password) {
        const oldPassword = await User.findOne({ _id: id });

        const validPassword = bcrypt.compareSync(user.password, oldPassword.password);

        if (!validPassword) {
          return res.status(400).json({ message: `Введен не правильный пароль` });
        }

        const hashNewPassword = bcrypt.hashSync(user.newPassword, 7);

        updateUserModel.password = hashNewPassword;
      }

      const userUpdate = await User.findOneAndUpdate(
        {
          _id: id,
        },
        updateUserModel,
        { new: true },
      );

      if (!userUpdate) {
        res.status(400).json({ message: 'Такого пользователя нет' });
      }

      const token = generateAccessToken(
        userUpdate._id,
        userUpdate.role,
        userUpdate.username,
        userUpdate.email,
      );
      return res.json({ token });
    } catch (e) {
      res.status(500).json({ message: 'Error change' });
    }
  }

  async addRequestPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Пользователя с такой почтой нет' });
      }
      const time = new Date();
      const expiryDate = time.getHours() + 2;
      time.setHours(expiryDate);

      const doc = new ResetPasswordRequest({
        expiryAt: time,
        userId: user.id,
      });

      await doc.save();

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

      const emailObject = {
        // from: '"Node js" <nodejs@example.com>',
        to: user.email,
        subject: 'Письмо для сброса пароля',
        text: 'Смена пароля',
        html: ` <div style=" font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center">
        <div>
          <hr />
          <p><b style="font-size: 20px">Дорогой студент, ${user.username}</b></p>
          <p style="font-size: 16px">
          Получили запрос на восстановление пароля от вашего аккаунта в нашей онлайн школе. <br/> 
          Для восстановления доступа к вашему аккаунту, пожалуйста, перейдите по следующей ссылке: <a href="http://localhost:3000/auth/reset-password/${doc._id}">восстановление</a>.
          </p>
          <p style="font-size: 16px; margin-bottom: 15px;">Если вы не запрашивали восстановление пароля, пожалуйста, проигнорируйте это сообщение. <br/>
           Как меру безопасности рекомендуем также изменить пароль после восстановления доступа к аккаунту.</p>
           <p style="font-size: 16px;"> С уважением, Команда "Кодемания"</p>
          <hr />
        </div>
      </div>`,
      };

      await transporter.sendMail(emailObject);

      res.status(201).json('');
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Произошла ошибка на сервере, попробуйте позже' });
    }
  }

  async reset(req, res) {
    try {
      const requestId = req.params.requestId;
      const body = req.body;
      const currentDate = new Date();

      const request = await ResetPasswordRequest.findOne({ _id: requestId });

      if (!request || currentDate > request.expiryAt) {
        return res.status(400).json('Устаревшая заявка на сброс пароля');
      }

      const hashNewPassword = bcrypt.hashSync(body.newPassword, 7);
      await User.updateOne(
        {
          _id: request.userId,
        },
        {
          password: hashNewPassword,
        },
      );

      await ResetPasswordRequest.deleteOne({
        _id: requestId,
      });

      return res.status(201).json('');
    } catch (e) {
      res.status(500).json({ message: 'Error change' });
    }
  }

  async removeUser(req, res) {
    try {
      const userId = req.params.userId;

      // const user = await User.findOneAndDelete({
      //   _id: userId,
      // });

      const user = await User.deleteOne({
        _id: userId,
      });

      if (!user) return res.status(404).json({ message: 'Нет пользователя' });

      res.status(204).end();
    } catch (err) {
      return res.status(500).json({
        message: 'Не удалось удалить пользователя',
      });
    }
  }

  async getUsersAll(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (e) {
      res.status(500).json({ message: 'Error get' });
    }
  }
}

module.exports = new AuthController();
