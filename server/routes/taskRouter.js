const Router = require('express');
const router = new Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);
router.get('/:taskId', taskController.getTaskById);
router.post('/createTask', taskController.createTask);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;