const mongoose = require('mongoose')

const subtasksSchema = new mongoose.Schema({
    writing: {
        type: String,
        required: [true, 'must provide a subtitle'],
        trim: true
    }, completed: {
        type: Boolean,
        default: false
    }
})

const subtasks = mongoose.model('Subtasks', subtasksSchema)

const TasksSchema = new mongoose.Schema({
    subtasks: {
            type: Array,
            ref: 'Subtasks'
          },
    title: {
        type: String,
        required: [true, 'must provide a title'],
        trim: true,
    },
    description: {
        type: String
    },
    stats: {
        type: String, 
        enum: {
            values: ['todo', 'doing', 'done']
        }
    }
},
{collection: 'todo'})

module.exports = mongoose.model('Tasks', TasksSchema)

        // const subtasksSchema = new mongoose.Schema({
        //     writing: {
        //         type: String,
        //         required: [true, 'must provide a subtitle'],
        //         trim: true
        //     }, completed: {
        //         type: Boolean,
        //         default: false
        //     }
        // })
        
        // const subtasks = mongoose.model('Subtasks', subtasksSchema)
        // subtasks: {
        //     type: mongoose.ObjectId,
        //     ref: 'Subtasks'
        //   },





        // subtasks: [{
        //     writing: {
        //         type: String,
        //         required: [true, 'must provide a subtitle'],
        //         trim: true
        //     },
        //     completed: {
        //         type: Boolean,
        //         default: false
        //     }
        // }]