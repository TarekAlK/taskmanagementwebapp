const express = require('express')
const app = express()
const Task = require('../models/Tasks')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../Classes/custom-error')
//app.use(express.json())

const getAllTasks = asyncWrapper(async (req, res) => {
    const todoTasks = await Task.find({stats: 'todo'})
    const doingTasks = await Task.find({stats: 'doing'})
    const doneTasks = await Task.find({stats: 'done'})
    res.status(200).json({todoTasks, doingTasks, doneTasks})
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        stats: req.body.stats,
        subtasks: req.body.subtasks
        //subtasks: [...req.body.subtasks]
    })
    res.status(201).json({task})
})

const updateTask = asyncWrapper(async(req, res, next) =>{
    const task = await Task.findOneAndUpdate({_id: req.body.id}, req.body, {
        new: true,
        runValidators: true
    })
    if(!task) {
        return next(createCustomError(`task with the id: ${req.body.id}does not exist`, 404))
    }
    return res.status(200).json({task})
})

const updateCompletedSubtasks = asyncWrapper(async (req, res, next) => {
    let reqData = req.body
    if(reqData.subtasks.every(subtask => !subtask.completed)) reqData.stats = 'todo'
    else if(reqData.subtasks.every(subtask => subtask.completed) ||
    reqData.subtasks == undefined) reqData.stats = 'done'
    else if(reqData.subtasks.some(subtask => !subtask.completed) &&
    reqData.subtasks.some(subtask => subtask.completed)) reqData.stats = 'doing'
    
    const task = await Task.findOneAndUpdate({_id: reqData.id}, reqData, {
        new: true,
        runValidators: true
    })
    if(!task) {
        return next(createCustomError(`task with the id: ${req.params.id}does not exist`, 404))
    }
    res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req, res, next) =>{
    const task = await Task.findOneAndDelete({_id: req.params.id})
    if(!task) {
        return next(createCustomError(`task with the id: ${req.params.id}does not exist`, 404))
    }
    res.status(200).json({task})
})

const getTask = asyncWrapper(async (req, res, next) =>{
    const task = await Task.find({_id: req.params.id})
    console.log(task)
    if(!task) {
        return next(createCustomError(`task with the id: ${req.params.id}does not exist`, 404))
    }
    res.status(200).json({task})
})

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    updateCompletedSubtasks,
    deleteTask,
    getTask
}


// const {title, description} = req.body
// const subtasks = [req.body.subtasks]