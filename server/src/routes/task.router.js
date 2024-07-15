const { verifyAccessToken } = require('../middlewares/verifyTokens');
const { Task, User } = require('../../db/models');
const taskRouter = require('express').Router();

taskRouter.get('/', verifyAccessToken, async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

taskRouter
  .route('/my-tasks')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const tasks = await Task.findAll({
        where: { userId },
        include: {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      });
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        userId: res.locals.user.id,
      });

      const plainTask = await Task.findOne({
        where: {
          id: task.id,
        },
        include: {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      });

      res.json(plainTask);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });

  taskRouter.route('/my-tasks/:id')
  .delete(verifyAccessToken, async (req, res) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: 'Id must be a number' });
    }

    try {
      const task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      if (task.userId !== res.locals.user.id) {
        return res.status(401).json({ message: 'Unable to complete' });
      }

      await task.destroy();
      res.json({ message: 'Task deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  })
  .patch(verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: 'Id must be a number' });
    }

    try {
      let task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      if (task.userId !== res.locals.user.id) {
        return res.status(401).json({ message: 'Unable to complete' });
      }

      // Update task properties
      task.title = title || task.title;
      task.description = description || task.description;
      await task.save();

      res.json({ message: 'Task updated', task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


module.exports = taskRouter;
