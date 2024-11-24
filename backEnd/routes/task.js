const express = require('express')
const router = express.Router()
const { getAllTasks, createTask, updateTask, updateCompletedSubtasks, deleteTask, getTask } = require('../controllers/task')
//const { createTask } = require('../contorllers/task')

router.route('/').post(createTask).get(getAllTasks)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)
router.route('/:id/completed').patch(updateCompletedSubtasks)

module.exports = router