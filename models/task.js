'use strict';
const e = require('express');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {}
    }
    Task.init(
        {
            Title: DataTypes.STRING,
            Action_Time: DataTypes.INTEGER,
            Is_Finished: DataTypes.BOOLEAN,
            Created_Time: DataTypes.INTEGER,
            Updated_Time: DataTypes.INTEGER,
            Objective_List: DataTypes.ARRAY(DataTypes.STRING),
        },
        {
            sequelize,
            modelName: 'Task',
            createdAt: false,
            updatedAt: false,
        }
    );

    Task.afterFind(function (instance, options) {
        if (instance?.length > 0) {
            instance = instance.map((el) => {
                el.Objective_List = el.Objective_List.map((obj) =>
                    JSON.parse(obj)
                );
                return el;
            });
        } else {
            if (instance) {
                instance.Objective_List = instance.Objective_List.map((obj) =>
                    JSON.parse(obj)
                );
            }
        }
    });
    return Task;
};
