const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./db/database');
const dbName = 'employee';

function run() {
    inquirer.prompt(
        {
            type: "list",
            name: "run",
            message: "You are using the Employee Tracker. What would you like to do today?",
            choices: ['ADD', 'VIEW', 'UPDATE', 'REMOVE', 'QUIT APPLICATION']
        }
    ).then(function (res) {
        switch (res.run) {
            case 'ADD':
                add();
                break;
            case 'VIEW':
                view();
                break;
            case 'UPDATE':
                update();
                break;
            case 'REMOVE':
                remove();
                break;
            case 'QUIT APPLICATION':
                console.log(`
                -------------------------------
                --- - QUITING APPLICATION - ---
                -------------------------------
                `)
                break;
            default:
                console.log('Default option chosen');
        }
    })
};

/// CREATE FUNCTIONS
function add() {
    inquirer.prompt({
        type: 'list',
        name: 'add',
        message: 'What would you like to add?',
        choices: ['EMPLOYEE', 'ROLE', 'DEPARTMENT']
    }).then(function (res) {
        switch (res.add) {
            case 'EMPLOYEE':
                addEmployee();
                break;
            case 'ROLE':
                addRole();
                break;
            case 'DEPARTMENT':
                addDepartment();
                break;
            default:
                console.log('Default option chosen')
        }
    });
}

function addEmployee() {
    // this is getting the roles and changes the array to have name and value pairs instead of the format of the schema
    db.promise().query('SELECT * FROM employee').then(([rows]) => {
        let employeeChoices = rows.map(user => {
            return { name: user.first_name + ' ' + user.last_name, value: user.id }
        })

        // role choices
        db.promise().query('SELECT * FROM role').then(([rows]) => {
            let roleChoices = rows.map(role => {
                return { name: role.title, value: role.id }
            });

            inquirer.prompt(
                [
                    {
                        name: 'first_name',
                        type: 'input',
                        message: `What is the employee's FIRST NAME?`
                    },
                    {
                        name: 'last_name',
                        type: 'input',
                        message: `What is the employee's LAST NAME?`
                    },
                    {
                        name: 'role_id',
                        type: 'list',
                        message: `What is the employee's ROLE?`,
                        // could make this dynamically generated later
                        choices: roleChoices
                    },
                    {
                        name: 'manager_id',
                        type: 'list',
                        message: `Who is the employee's MANAGER?`,
                        choices: employeeChoices,
                    },
                ]
            ).then(function (answers) {
                console.log(answers)
                const sql = "INSERT INTO employee SET ?";

                db.query(sql, answers, function (err, res, fields) {
                    if (err) throw err;
                    console.log('Employee added to database.');
                    handleReturn();
                });
            });
        });
    });


};
function addRole() {
    console.log(`Rendering add role UI`)
};
function addDepartment() {

    inquirer.prompt({
        type: 'input',
        name: 'addEmployee',
        message: `What is the DEPARTMENT name?`,
    }).then(function (res) {
        db.query();
    });
};
/// ----------------
/// READ FUNCTIONS
function view() {
    inquirer.prompt({
        type: 'list',
        name: 'view',
        message: 'Please select an option to view registered Employees:',
        choices: ['ALL EMPLOYEES', 'BY DEPARTMENT', 'BY ROLE']
    }).then(function (res) {
        switch (res.view) {
            case 'ALL EMPLOYEES':
                viewAllEmployees();
                break;
            case 'BY DEPARTMENT':
                viewByDepartment();
                break;
            case 'BY ROLE':
                viewByRole();
                break;
            default:
                console.log('Default option chosen')
        }
    })
}

const handleReturn = () => {
    inquirer.prompt({
        name: 'chooseReturn',
        type: 'confirm',
        message: 'Would you like to RETURN?',
    }).then(function (res) {
        if (!res.chooseReturn) {
            console.log(`Select YES or 'Y' to return to the start of the application.`)
        }
        run();
    })
}

function viewAllEmployees() {
    db.query("SELECT * FROM employee", function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        handleReturn();
    })
};
function viewByDepartment() {
    db.query("SELECT * FROM department", function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        handleReturn();
    })
};
function viewByRole() {
    db.query("SELECT * FROM role", function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        handleReturn();
    })
};
/// ----------------
/// UPDATE FUNCTIONS
function update() {
    inquirer.prompt({
        type: 'list',
        name: 'update',
        message: 'What would you like to update?',
        choices: ['EMPLOYEE', 'ROLE', 'DEPARTMENT']
    }).then(function (res) {
        switch (res.update) {
            case 'EMPLOYEE':
                updateEmployee();
                // updateEmployee();
                break;
            case 'ROLE':
                getRole();
                updateRole();
                break;
            case 'DEPARTMENT':
                getDepartment();
                updateDepartment();
                break;
            default:
                console.log('Default option chosen')
        }
    });
}
function updateEmployee() {
    db.promise().query('SELECT * FROM employee').then(([rows]) => {
        let employeeChoices = rows.map(employee => {
            return {
                name: employee.first_name + ' ' + employee.last_name,
                value: employee.id
            }
        })

        inquirer.prompt(
            [{
                name: 'employee',
                type: 'list',
                message: `Select the EMPLOYEE you would like to update.`,
                choices: employeeChoices

            }])
            .then(function (res) {
                db.promise().query('SELECT * FROM role').then(([rows]) => {
                    let roleChoices = rows.map(role => {
                        return { name: role.title, value: role.id }
                    });

                    const updateRoleId = function (roleChoice) {
                        console.log(roleChoice.role_id);
                        const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
                        db.query(sql, [roleChoice.role_id, res.employee], function (err, res, fields) {
                            if (err)
                                throw err;
                            console.table(res.info);
                            console.log('Employee updated.');
                            handleReturn();
                        });
                    };
                    inquirer.prompt(
                        {
                            name: 'role_id',
                            type: 'list',
                            message: `Select the employee's new ROLE.`,
                            choices: roleChoices
                        })
                        .then(updateRoleId);
                });
            });
    });
};

function updateRole() {
    console.log(`Rendering update role UI`)
};
function updateDepartment() {
    console.log(`Rendering update department UI`)
};
/// ----------------
/// DELETE FUNCTIONS
function remove() {
    inquirer.prompt({
        type: 'list',
        name: 'remove',
        message: 'What would you like to remove?',
        choices: ['EMPLOYEE', 'DEPARTMENT', 'ROLE']
    }).then(function (res) {
        switch (res.delete) {
            case 'EMPLOYEE':
                deleteByEmployee();
                break;
            case 'DEPARTMENT':
                deleteByDepartment();
                break;
            case 'ROLE':
                deleteByRole();
                break;
            default:
                console.log('Default option chosen')
        }
    })
}
function deleteByEmployee() {
    console.log(`Displaying all employees`)
};
function deleteByDepartment() {
    console.log(`Displaying all departments`)
};
function deleteByRole() {
    console.log(`Displaying all roles`)
};
/// ----------------

run();

