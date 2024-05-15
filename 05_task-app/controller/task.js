const task = require('../models/task');

module.exports.addTask = async (req, res) => {
    try {
        req.body.userId = req.user._id;
        req.body.completed = false
        let taskData = await task.create(req.body);
        if (taskData) {
            return res.status(200).json({ msg: `Task added successfully`, status: 1, task: taskData });
        }
        else {
            return res.status(400).json({ msg: `Task not added..! Something wrong`, status: 0 });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Something wrong", status: 0 })
    }
}

module.exports.getTask = async (req, res) => {
    try {
        // let match = {};
        // if (req.query.completed) {
        //     match.completed = req.query.completed === 'true';
        // }
        // let taskData = await task.find().populate({
        //     path : 'task',
        //     match,
        //     options : {
        //         limit : parseInt(req.query.limit),
        //         skip : parseInt(req.query.skip),
        //         sort : {
        //             createdAt : -1
        //         }
        //     }
        // }).exec();
        

        let taskData = await task.find().populate('userId').exec();
        if (taskData) {
            return res.status(200).json({ msg: 'All Task are here', status: 1, taskData: taskData });
        }
        else {
            return res.status(400).json({ msg: 'Not task available', status: 0 });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Something wrong', status: 0 });
    }
}