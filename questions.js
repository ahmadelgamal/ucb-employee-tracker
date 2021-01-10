const inquirer = require('inquirer');
const cTable = require('console.table');

const questions = [
  {
    type: 'rawlist',
    name: 'whatToDo',
    message: 'What would you like to do?',
    choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles'],
    default: 'Numbers'
  },
  {
    type: 'rawlist',
    name: 'whichDepartment',
    message: 'Which department would you like to view?',
    choices: [],
  },
  {
    type: 'rawlist',
    name: 'whichManager',
    message: 'Which manager would you like to pick?',
    choices: [],
  },
  {
    type: 'rawlist',
    name: 'addEmployee',
    message: 'What is the name of the employee?',
    choices: [],
  },
  {
    type: 'rawlist',
    name: 'whichDepartment',
    message: 'Which department would you like to view?',
    choices: [],
  },
];


// function to initialize program
function init() {
  inquirer
    .prompt(questions)
    // .then(answers => {
    //   return generateMarkdown(answers);
    // })
    .catch(error => {
      console.log(error);
    });
}

module.exports = init;