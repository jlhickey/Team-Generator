// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generatePage = require('./src/htmltemplate');

var employees;

const Questions = [
    {
        type: 'input',
        name: 'managername',
        message: "What is the manager's name? ",
        validate: (managername) => {
            if (managername) {
                return true;
            } else {
                console.log("Please enter the manager's name!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'managerid',
        message: "What is the manager's ID?",
        validate: (managerd) => {
            if (managerid) {
                return true;
            } else {
                console.log("Please enter the manager's ID!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'manageremail',
        message: "What is the manager's email address?",
        validate: (manageremail) => {
            if (manageremail) {
                return true;
            } else {
                console.log("Please enter the manager's email address!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'manageroffice',
        message: "What is the manager's office number?",
        validate: (manageroffice) => {
            if (manageroffice) {
                return true;
            } else {
                console.log("Please enter the manager's office number!");
                return false;
            }
        }
    },
    {
        type: 'list',
        message: 'Choose an employee to add to the team',
        name: 'employee',
        choices: ['Engineer', 'Intern', 'Done'],
    },
];

// Prompt to add Engineer
const addEngineer = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'engineername',
            message: "What is the engineer's name? ",
            validate: (engineername) => {
                if (engineername) {
                    return true;
                } else {
                    console.log("Please enter the engineer's name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'engineerid',
            message: "What is the engineer's ID?",
            validate: (engineerid) => {
                if (engineerid) {
                    return true;
                } else {
                    console.log("Please enter the engineer's employee ID!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'engineeremail',
            message: "What is the engineer's email address?",
            validate: (engineeremail) => {
                if (engineeremail) {
                    return true;
                } else {
                    console.log("Please enter the engineer's email address!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'engineergithub',
            message: "What is the engineer's github username?",
            validate: (engineergithub) => {
                if (engineergithub) {
                    return true;
                } else {
                    console.log("Please enter the engineer's github username!");
                    return false;
                }
            }
        },
        {
            type: 'list',
            message: 'Do you want to add any other employee?',
            name: 'employee',
            choices: ['Engineer', 'Intern', 'Done'],
        },
    ]).then(engineeranswers => {
         
        employees.push(new Engineer(engineeranswers.engineername, engineeranswers.engineerid, engineeranswers.engineeremail, engineeranswers.engineergithub));
        if (engineeranswers.employee === 'Engineer') {
            return addEngineer();
        }
        else if (engineeranswers.employee === 'Intern') {
            return addIntern();
        }
        else if (engineeranswers.employee === 'Done') {
            return;
        }
    })
};

// Prompt to add Intern
const addIntern = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'intName',
            message: "What is the intern's name?",
            validate: (internname) => {
                if (internname) {
                    return true;
                } else {
                    console.log("Please enter the intern's name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'internid',
            message: "What is the intern's employee ID?",
            validate: (internid) => {
                if (internid) {
                    return true;
                } else {
                    console.log("Please enter the intern's employee ID!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'internemail',
            message: "What is the intern's email address?",
            validate: (internemail) => {
                if (internemail) {
                    return true;
                } else {
                    console.log("Please enter the intern's email address!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'internschool',
            message: "Where is the intern going to school?",
            validate: (internschool) => {
                if (internschool) {
                    return true;
                } else {
                    console.log("Please enter the intern's school!");
                    return false;
                }
            }
        },
        {
            type: 'list',
            message: 'Do you want to add another employee?',
            name: 'employee',
            choices: ['Engineer', 'Intern', 'Done'],
        },
    ]).then(internanswers => {
        
        employees.push(new Intern(internanswers.internname, internanswers.internid, internanswers.internemail, internanswers.internschool));
        if (internanswers.employee === 'Engineer') {
            return addengineer();
        }
        else if (internanswers.employee === 'Intern') {
            return addintern();
        }
        else if (internanswers.employee === 'Done') {
            return;
        }
    })
};


  
function writeToFile(filename, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/' + filename + '.html', data, err => {
             
            if (err) {
                reject(err);
                
                return;
            }
             
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
}

 
function init() {
    employees = [];
    
    inquirer.prompt(Questions)
        .then(manageranswers => {
             
            employees.push(new Manager(manageranswers.managername, manageranswers.managerid, manageranswers.manageremail, manageranswers.manageroffice));
            if (manageranswers.employee === 'Engineer') {
                addengineer()
                    .then(() => {
                        
                        return generatepage(employees);
                    })
                    .then(htmldata => {
                        writeToFile("index", htmldata);
                    })
            }
            else if (manageranswers.employee === 'Intern') {
                addintern()
                    .then(() => {
                         
                        return generatepage(employees);
                    })
                    .then(htmldata => {
                        writeToFile("index", htmldata);
                    })
            }
             
            else if (manageranswers.employee === 'Done') {
                 
                writeToFile("index",generatepage(employees));
            }
        })

}

// Function call to initialize app
init();
