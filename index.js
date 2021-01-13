const inquirer = require('inquirer');
const actions = require('./actions');
const db = require('./db/connection');
const logo = require('asciiart-logo');
const config = require('./package.json');

// prints splash screen
console.log(logo(config).render());

db.connect(err => {
  if (err) throw err;
  init();
});

const question = [
  {
    type: 'rawlist',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit Program'],
  }
];

// function to initialize program
const init = () => {
  return inquirer
    .prompt(question)
    .then(answer => {
      switch (answer.action) {
        case "View All Departments":
          actions.viewAllDepartments()
          break;
        case "View All Roles":
          actions.viewAllRoles();
          break;
        case "View All Employees":
          actions.viewAllEmployees();
          break;
        case "Add a Department":
          actions.addDepartment();
          break;
        case "Add a Role":
          actions.addRole();
          break;
        case "Add an Employee":
          actions.addEmployee();
          break;
        case "Update an Employee Role":
          actions.updateEmployeeRole();
          break;
        case "Exit Program":
          console.log('Thank you for using Employee Tracker!');
          db.close();
          process.exit(0);
          break;
      }

    })
    .then(() => {
      setTimeout(init, 500);
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports = init;