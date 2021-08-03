const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const pageTemplate = require('./src/pageHTML');
const renderTeamHtml = require('./dist/generateHTML.html');
const path = require('path');
const inquirer = require('inquirer');
const fs = require('fs');

// WHEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
const team = [];

newTeam();

// use inquirer to get answer 
function newTeam() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'What is your Position?',
            choices: [
                'Manager',
                'Engineer',
                'Intern',
                'Finish'
            ]
        }
    ]).then(function (data) {
        const roleEmployee = data.role;
        if (roleEmployee === "Manager") {
            addManager();
        } else if (roleEmployee === "Engineer") {
            addEngineer();
        } else if (roleEmployee === "Intern") {
            addIntern();
        } else if (roleEmployee === "Finish") {
            renderTeam(data);
        }
    });
}

// create new manager instance
// populate new manager instance with inquirer answer
// const manager = new Manager()


function addManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is your employee id #?'
        },
        {
            type: 'input',
            name: 'mangerEmail',
            message: 'What is your email?'
        },
        {
            type: 'input',
            name: 'managerOfficeNumber',
            message: 'What is your office number?'
        }
    ]).then(answer => {
        const manager = new Manager(answer.managerName, answer.managerId, answer.managerEmail, answer.managerOfficeNumber);
        team.push(manager);
        newTeam();
    });
};

function addEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'engineerName',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'engineerId',
            message: 'What is your employee id #?'
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: 'What is your email?'
        },
        {
            type: 'input',
            name: 'engineerGithub',
            message: 'What is your GitHub account?'
        }
    ]).then(answer => {
        const addEngineer = new Engineer(answer.engineerName, answer.engineerId, answer.engineerEmail, answer.engineerOfficeNumber);
        team.push(addEngineer);
        newTeam();
    });
};

function addIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your employee id #?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email?'
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school are you currently attending?'
        }
    ]).then(answer => {
        const intern = new Intern(answer.name, answer.id, answer.email, answer.officeNumber);
        team.push(intern);
        newTeam();
    });
};

function renderTeam(data) {
    console.log("here", data)
    fs.writeFile("./dist/team.html", JSON.stringify(data), function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Team Profile has been created! Check the dist folder for the output');
        };
    })

};



// TODO: Create a function to initialize app
function init() {

    inquirer.prompt(newTeam).then(data => {

        writeFile('team.html', renderTeam(data));
    })
}

// Function call to initialize app
// init()

