const db = require('./db/database');
const cTable = require('console.table');

const viewAllEmployees = () => {
  console.log('test 1');
  db
    .query('SELECT * FROM employee')
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    })
}

const viewAllEmployeesByDepartment = () => {
  console.log('test 2');
}

const viewAllEmployeesByManager = () => {
  console.log('test 3');
}

const addEmployee = () => {
  console.log('test 4');
}

const removeEmployee = () => {
  console.log('test 5');
}

const updateEmployeeRole = () => {
  console.log('test 6');
}

const updateEmployeeManager = () => {
  console.log('test 7');
}

const viewAllRoles = () => {
  console.log('test 8');
}

module.exports = {
  viewAllEmployees,
  viewAllEmployeesByDepartment,
  viewAllEmployeesByManager,
  addEmployee,
  removeEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  viewAllRoles
};