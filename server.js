const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./db/connection');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.connect(function (err) {
    app.get('/api/employees', (req, res) => {
        const sql = `SELECT * FROM employees`;
        connection.db.query(sql, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: rows
            });
        });
    });
});

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
    })
}
function addEmployee() {
    console.log(`Rendering add employee UI`)
};
function addRole() {
    console.log(`Rendering add role UI`)
};
function addDepartment() {
    console.log(`Rendering add department UI`)
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
function viewAllEmployees() {
    console.log(`Displaying all employees`)
};
function viewByDepartment() {
    console.log(`Displaying all departments`)
};
function viewByRole() {
    console.log(`Displaying all roles`)
};
/// ----------------
/// UPDATE FUNCTIONS
function update() {
    inquirer.prompt({
        type: 'list',
        name: 'view',
        message: 'Please select an option to view registered Employees:',
        choices: ['ALL EMPLOYEES', 'BY DEPARTMENT', 'BY ROLE']
    }).then(function (res) {
        switch (res.view) {
            case 'ALL EMPLOYEES':
                updateByEmployee();
                break;
            case 'BY DEPARTMENT':
                updateByDepartment();
                break;
            case 'BY ROLE':
                updateByRole();
                break;
            default:
                console.log('Default option chosen')
        }
    })
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
            case 'ALL EMPLOYEES':
                deleteByEmployee();
                break;
            case 'BY DEPARTMENT':
                deleteByDepartment();
                break;
            case 'BY ROLE':
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