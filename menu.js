const inquirer = require('inquirer');
const actions = require('./actions');
const db = require('./db/database');

const menu = [
  {
    type: 'rawlist',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'Exit Program'],
  }
];

// function to initialize program
function init() {
  inquirer
    .prompt(menu)
    .then(answer => {
      switch (answer.action) {
        case "View All Employees":
          actions.viewAllEmployees();
          break;
        case "View All Employees By Department":
          actions.viewAllEmployeesByDepartment();
          break;
        case "View All Employees By Manager":
          actions.viewAllEmployeesByManager();
          break;
        case "Add Employee":
          actions.addEmployee();
          break;
        case "Remove Employee":
          actions.removeEmployee();
          break;
        case "Update Employee Role":
          actions.updateEmployeeRole();
          break;
        case "Update Employee Manager":
          actions.updateEmployeeManager();
          break;
        case "View All Roles":
          actions.viewAllRoles();
          break;
        case "Exit Program": {
          console.log('Thank you for using Employee Tracker!');
          db.close();
          process.exit(0);
          break;
        }
      }
      init();
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports = init;