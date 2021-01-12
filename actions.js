const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

const viewAllDepartments = () => {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) console.log(err);
    return console.table(results);
  });
};

const viewAllRoles = () => {
  db.query('SELECT * FROM role', (err, results) => {
    if (err) console.log(err);
    return console.table(results);
  });
};

const viewAllEmployees = () => {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) console.log(err);
    return console.table(results);
  });
};

const addDepartment = () => {
  const questions = [
    {
      type: 'input',
      name: 'department_name',
      message: 'Please type the new department name:',
      validate: input => {
        if (input) {
          return true;
        } else {
          console.log('Department name cannot be empty!');
          return false;
        }
      }
    }
  ];

  inquirer
    .prompt(questions)
    .then(answer => {
      db.query("INSERT INTO department (name) VALUES (?)", answer.department_name, (err, results) => {
        if (err) console.log(err);
        else {
          viewAllDepartments()
          return;
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

const addRole = () => {
  // stores department name list in an array to use for prompt choices
  const departmentNameList = [];
  db.query("SELECT name FROM department", (err, results) => {
    if (err) console.log(err);
    else {
      for (let i = 0; i < results.length; i++) {
        departmentNameList.push(results[i].name);
      }
      return;
    }
  })

  // stores department id list in an array to use for input query
  const departmentIdList = [];
  db.query("SELECT id FROM department", (err, results) => {
    if (err) console.log(err);
    else {
      for (let i = 0; i < results.length; i++) {
        departmentIdList.push(results[i].id);
      }
      return;
    }
  })

  const questions = [
    {
      type: 'input',
      name: 'role_title',
      message: 'Please type the new role title:',
      validate: input => {
        if (input) {
          return true;
        } else {
          console.log('Role title cannot be empty!');
          return false;
        }
      }
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Please enter the annual salary for this role:',
      validate: input => {
        if (input) {
          return true;
        } else {
          console.log('A salary amount must be entered!');
          return false;
        }
      }
    },
    {
      type: 'rawlist',
      name: 'department_name',
      message: 'Please select the department to place this new role in:',
      choices: departmentNameList
    }
  ];

  inquirer
    .prompt(questions)
    .then(answer => {
      // declares variable to identify chosen department index
      let departmentIndex;
      // matches department id to department name
      for (let i = 0; i < departmentNameList.length; i++) {
        if (departmentNameList[i] === answer.department_name) {
          departmentIndex = i;
        }
      }

      db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.role_title, answer.salary, departmentIdList[departmentIndex]], (err, results) => {
        if (err) console.log(err);
        else {
          viewAllRoles();
          return;
        }

      });
    })
    .catch(error => {
      console.log(error);
    });
};

const addEmployee = () => {
  // stores role title list in an array to use for prompt choices
  const roleTitleList = [];
  db.query("SELECT title FROM role", (err, results) => {
    if (err) console.log(err);
    else {
      for (let i = 0; i < results.length; i++) {
        roleTitleList.push(results[i].title);
      }
      return;
    }
  })

  // stores role id list in an array to use for input query
  const roleIdList = [];
  db.query("SELECT id FROM role", (err, results) => {
    if (err) console.log(err);
    else {
      for (let i = 0; i < results.length; i++) {
        roleIdList.push(results[i].id);
      }
      return;
    }
  })

  // stores manager title list in an array to use for prompt choices
  const managerNameList = [];
  db.query("SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employee", (err, results) => {
    if (err) console.log(err);
    else {
      for (let i = 0; i < results.length; i++) {
        managerNameList.push(results[i].full_name);
      }
      return;
    }
  })

  // stores manager id list in an array to use for input query
  const managerIdList = [];
  db.query("SELECT role_id FROM employee", (err, results) => {
    if (err) console.log(err);
    else {
      for (let i = 0; i < results.length; i++) {
        managerIdList.push(results[i].role_id);
      }
      return;
    }
  })

  const questions = [
    {
      type: 'input',
      name: 'first_name',
      message: 'Please type the first name of the employee:',
      validate: input => {
        if (input) {
          return true;
        } else {
          console.log('First name cannot be empty!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Please type the last name of the employee:',
      validate: input => {
        if (input) {
          return true;
        } else {
          console.log('Last name cannot be empty!');
          return false;
        }
      }
    },
    {
      type: 'rawlist',
      name: 'role_title',
      message: 'Please select the role of this new employee:',
      choices: roleTitleList
    },
    {
      type: 'confirm',
      name: 'confirm_manager',
      message: 'Would you like to assign a manager for this new employee?'
    },
    {
      type: 'rawlist',
      name: 'manager_name',
      message: 'Please select the manager for this new employee:',
      choices: managerNameList,
      when: input => {
        return input.confirm_manager;
      }
    }
  ];

  inquirer
    .prompt(questions)
    .then(answer => {
      // declares variable to identify chosen role title index
      let roleIndex;
      // matches role id to role title
      for (let i = 0; i < roleTitleList.length; i++) {
        if (roleTitleList[i] === answer.role_title) {
          roleIndex = i;
        }
      }

      // declares variable to identify chosen manager title index
      let managerIndex;
      // matches role id to role title
      for (let i = 0; i < managerNameList.length; i++) {
        if (managerNameList[i] === answer.manager_name) {
          managerIndex = i;
        }
      }

      console.log(managerIdList);
      console.log(managerIndex);
      // if no manager was selected, then value is set to null
      if (!answer.manager_name) managerIdList[managerIndex] = null;
      console.log(managerIdList[managerIndex]);

      db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.first_name, answer.last_name, roleIdList[roleIndex], managerIdList[managerIndex]], (err, results) => {
        if (err) console.log(err);
        else {
          viewAllEmployees();
          return;
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

const updateEmployeeRole = () => {
  db.promise().query('SELECT * FROM employee')
    .then(data => {
      return console.table('UPDATE AN EMPLOYEE', data[0]);
    })
    .catch(error => {
      console.log(error);
    })
}

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};