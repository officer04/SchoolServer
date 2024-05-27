const Module = require('../models/Module.js');

class ModuleController {
  async create(req, res) {
    console.log(req);
    try {
      const doc = new Module({
        title: req.body.title,
        coursId: req.body.coursId,
      });

      await doc.save();

      return res.status(201).end();
    } catch (err) {
      return res.status(500).json({
        message: 'Не удалось создать модуль',
      });
    }
  }

  async remove(req, res) {
    try {
      const postId = req.params.id;

      const module = await Module.findOneAndDelete({
        _id: postId,
      });

      if (!module) return res.status(404).json({ message: 'Нет такого модуля' });

      res.status(204).end();
    } catch (err) {
      return res.status(500).json({
        message: 'Не удалось удалить модуль',
      });
    }
  }

  async update(req, res) {
    try {
      const moduleId = req.params.id;

      const post = await Module.findOneAndUpdate(
        {
          _id: moduleId,
        },
        {
          title: req.body.title,
        },
        { new: true },
      );
      if (!post) return res.status(404).json({ message: 'Нет такого модуля' });

      res.json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Не удалось обновить модуль',
      });
    }
  }

  async getModuleOne(req, res) {
    try {
      const moduleId = req.params.id;
      const module = await Module.findOne({ _id: moduleId });
      console.log(module)
      res.status(200).json(module);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Не удалось получить модули',
      });
    }
  }

  async getModule(req, res) {
    try {
      const coursId = req.params.id;
      const modules = await Module.find({ coursId: coursId });

      res.status(200).json(modules);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Не удалось получить модули',
      });
    }
  }

  async getAll(req, res) {
    try {
      const modules = await Module.find({});

      res.status(200).json(modules);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Не удалось получить модули',
      });
    }
  }
}

module.exports = new ModuleController();
