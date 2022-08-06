'use strict';

const { generateUnix } = require('../helpers');

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface.bulkInsert(
            'Tasks',
            [
                {
                    Title: 'seeder data',
                    Action_Time: 1659459600,
                    Created_Time: generateUnix(),
                    Updated_Time: generateUnix(),
                    Is_Finished: false,
                    Objective_List: [
                        '{"Objective_Name":"objective1","Is_Finished":false}',
                    ],
                },
                {
                    Title: 'seeder data 2',
                    Action_Time: 1659459600,
                    Created_Time: generateUnix(),
                    Updated_Time: generateUnix(),
                    Is_Finished: false,
                    Objective_List: [
                        '{"Objective_Name":"objective1","Is_Finished":false}',
                        '{"Objective_Name":"objective2","Is_Finished":false}',
                    ],
                },
            ],
            []
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
