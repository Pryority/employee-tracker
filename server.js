const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./db/database');
const dbName = 'employee';
// const employeeObject = { first_name, last_name, role_id, department_id, manager }
const express = require('express');
const { choices } = require('yargs');
const router = express.Router();
// const apiRoutes = require('routes/apiRoutes')
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use('/api', apiRoutes);

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
                choices: ['SALESPERSON', 'JUNIOR ENGINEER', 'LEAD ENGINEER', 'ACCOUNT MANAGER']
            },
            {
                name: 'manager_id',
                type: 'number',
                message: `What is the employee's MANAGER ID?`,
                validate: (value) => {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
                default: 1
            },
        ]
    ).then(function ({ first_name, last_name, role_id, manager_id }) {
        const e_fields = [first_name, last_name, role_id, manager_id];
        const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?";

        db.query(sql, e_fields, function (err, res, fields) {
            if (err) throw err;
            console.table(res);
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

}
function updateByEmployee() {
    console.log(`Rendering update employee UI`)
};
function updateByRole() {
    console.log(`Rendering update role UI`)
};
function updateByDepartment() {
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

