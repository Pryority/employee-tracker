const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('./db/connection');
const { create } = require('yallist');

connection.connect(function (err) {
    if (err) throw err;
    console.log("SQL connected")

    // add the start function here
});

function run() {
    inquirer.prompt(
        {
            type: "list",
            name: "run",
            message: "You are using the Employee Tracker. What would you like to manage your employees?",
            choices: ['CREATE', 'VIEW', 'UPDATE', 'REMOVE', 'QUIT APPLICATION']
        }
    ).then(function (res) {
        switch (res.run) {
            case 'CREATE':
                create();
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