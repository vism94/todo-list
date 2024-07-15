'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John Doe',
          email: '123@123',
          password: await bcrypt.hash('123', 10),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          title: 'Finish report',
          description: 'Complete the quarterly financial report by Friday.',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Grocery shopping',
          description: 'Buy milk, bread, eggs, and fruits for the week.',
          userId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Workout',
          description: 'Attend the gym for a workout session at 6 PM.',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Call the bank',
          description: 'Inquire about the status of the loan application.',
          userId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Plan vacation',
          description: 'Research and book flights and hotels for the upcoming trip.',
          userId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Read a book',
          description: 'Finish reading the current book and start a new one.',
          userId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Team meeting',
          description: 'Prepare presentation slides for the team meeting on Monday.',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Doctor appointment',
          description: 'Visit the doctor for a regular check-up.',
          userId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Clean the house',
          description: 'Vacuum, dust, and mop the floors in the living room and kitchen.',
          userId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Update resume',
          description: 'Add recent job experience and skills to the resume.',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
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
