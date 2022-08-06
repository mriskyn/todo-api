const { Op } = require('sequelize');
const { sequelize } = require('../models');

module.exports = {
    getFindAllOptions(req) {
        let limit = +req.query.Limit;
        let offset = limit * +req.query.Page - limit;
        let Is_Finished = req.query?.Is_Finished;
        let Action_Time_Start = req.query?.Action_Time_Start;
        let Action_Time_End = req.query?.Action_Time_End;
        let Title = req.query?.Title

        let options = {
            limit,
            offset,
            attributes: [
                [sequelize.literal('"Task"."id"'), 'Task_ID'],
                'Title',
                'Action_Time',
                'Is_Finished',
                'Created_Time',
                'Updated_Time',
                'Objective_List',
            ],
            where: {},
        };

        if (Is_Finished !== '' && Is_Finished) options.where.Is_Finished = Is_Finished;
        if (Title !== '' && Title) options.where.Title = {
            [Op.like] : `%${Title}%`
        };

        if(Action_Time_Start){
            options.where.Action_Time = {
                [Op.gte]: +Action_Time_Start
            }
        }
        if(Action_Time_End) {
            options.where.Action_Time = {
                ...options.where.Action_Time,
                [Op.lte]: +Action_Time_End
            }
        }
        return options;
    },

    getFindOneOptions(id) {
        return {
            where: { id },
            attributes: [
                [sequelize.literal('"Task"."id"'), 'Task_ID'],
                'Title',
                'Action_Time',
                'Is_Finished',
                'Created_Time',
                'Updated_Time',
                'Objective_List',
            ],
        };
    },

    generateUnix() {
        return Math.round(new Date().getTime() / 1000);
    }
};
