const {
    getFindAllOptions,
    getFindOneOptions,
    generateUnix,
} = require('./helpers');
const { Task } = require('./models');

module.exports = {
    async getTasks(req, res) {
        try {
            let options = getFindAllOptions(req);

            let { rows: tasks, count } = await Task.findAndCountAll(options);

            let data = {
                List_Data: tasks,
                Pagination_Data: {
                    Current_Page: +req.query.Page,
                    Max_Data_Per_Page: options.limit,
                    Max_Page: Math.ceil(count / options.limit),
                    Total_All_Data: count,
                },
            };

            res.json({
                message: 'Success',
                data,
            });
        } catch (error) {
            console.log(error.message);
            res.json({
                message: 'Failed',
                error_key: 'error_internal_server',
                error_message: error.message,
                error_data: error,
            });
        }
    },
    async getTask(req, res) {
        let { id } = req.params;

        try {
            let options = getFindOneOptions(id);
            let task = await Task.findOne(options);

            if (!task) {
                res.json({
                    message: 'Failed',
                    error_key: 'error_id_not_found',
                    error_message: 'Task Id Not Found',
                    error_data: {},
                });
                return;
            }

            res.json({
                message: 'Success',
                data: task,
            });
        } catch (error) {
            console.log(error.message);
            res.json({
                message: 'Failed',
                error_key: 'error_internal_server',
                error_message: error.message,
                error_data: error,
            });
        }
    },

    async addTask(req, res) {
        let data = req.body;
        let errmessage = [];
        if (!data.Title) errmessage.push('Title is Empty');

        if (!data.Objective_List) errmessage.push('Objective List is Empty');

        if (!data.Action_Time) errmessage.push('Action Time is Empty');

        if (errmessage.length > 0) {
            res.json({
                meesage: 'Failed',
                error_key: 'error_param',
                error_message: errmessage.join(' | '),
                error_data: {},
            });
            return;
        }

        const unix = generateUnix();

        try {
            let task = new Task();

            task.Title = req.body.Title;
            task.Action_Time = req.body.Action_Time;
            task.Created_Time = unix;
            task.Updated_Time = unix;
            task.Is_Finished = false;

            let Objective_List = req.body.Objective_List.map((obj) => {
                return JSON.stringify({
                    Objective_Name: obj,
                    Is_Finished: false,
                });
            });

            task.Objective_List = Objective_List;

            await task.save();

            res.json({
                message: 'Success',
            });
        } catch (error) {
            console.log(error.message);
            res.json({
                message: 'Failed',
                error_key: 'error_internal_server',
                error_message: error.message,
                error_data: error,
            });
        }
    },
    async updateTask(req, res) {
        const unix = generateUnix();
        let { id } = req.params;
        let data = req.body;
        let errmessage = [];

        if (!data.Title) errmessage.push('Title is Empty');

        if (!data.Objective_List) errmessage.push('Objective List is Empty');

        if (errmessage.length > 0) {
            res.json({
                meesage: 'Failed',
                error_key: 'error_param',
                error_message: errmessage.join(' | '),
                error_data: {},
            });
            return;
        }

        try {
            let task = await Task.findOne({
                where: { id },
            });

            if (!task) {
                res.json({
                    message: 'Failed',
                    error_key: 'error_id_not_found',
                    error_message: 'Task Id Not Found',
                    error_data: {},
                });
                return;
            }

            let finishedCounter = 0;
            let objListLength = req.body.Objective_List.length;

            let Objective_List = req.body.Objective_List.map((obj) => {
                if (obj.Is_Finished) finishedCounter++;
                return JSON.stringify(obj);
            });

            task.Title = data.Title;
            task.Updated_Time = unix;
            task.Objective_List = Objective_List;

            if (finishedCounter === objListLength) {
                task.Is_Finished = true;
            }

            await task.save();

            res.json({ message: 'Success' });
        } catch (error) {
            console.log(error.message);
            res.json({
                message: 'Failed',
                error_key: 'error_internal_server',
                error_message: error.message,
                error_data: error,
            });
        }
    },
    async deleteTask(req, res) {
        let { id } = req.params;

        try {
            let task = await Task.destroy({ where: { id } });

            if (!task) {
                res.json({
                    message: 'Failed',
                    error_key: 'error_id_not_found',
                    error_message: 'Task Id Not Found',
                    error_data: {},
                });
                return;
            }

            res.json({ message: 'Success' });
        } catch (error) {
            console.log(error.message);
            res.json({
                message: 'Failed',
                error_key: 'error_internal_server',
                error_message: error.message,
                error_data: error,
            });
        }
    },
};
