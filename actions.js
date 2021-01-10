const cTable = require('console.table');

class actions {
  viewAllEmployees() {
    console.log('test');
    db
      .query('SELECT * FROM employee')
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      })
  }

  viewAllEmployeesByDepartment() {
    console.log('test 1');
  }

  viewAllEmployeesByManager() {
    console.log('test 2');
  }

  addEmployee() {
    console.log('test 3');
  }

  removeEmployee() {
    console.log('test 4');
  }

  updateEmployeeRole() {
    console.log('test 5');
  }

  updateEmployeeManager() {
    console.log('test 6');
  }

  viewAllRoles() {
    console.log('test 7');
  }
};

module.exports = actions;