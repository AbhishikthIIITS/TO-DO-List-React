const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    task: String,
    completed: {
        type: Boolean,
        default: false
    }
})

const TodoModel = mongoose.model("todo_test", TodoSchema)
module.exports = TodoModel