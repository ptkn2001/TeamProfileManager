const inquirer = require("inquirer");
const fs = require("fs");
const generateTeamHTML = require("./helpers/html");

const Team = require("./models/team");
const Engineer = require("./models/engineer");
const Intern = require("./models/intern");
const Manager = require("./models/manager");

let team;


//Create team and start with manager
const createTeam = () => {
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: 'Enter manger name:',
            },
            {
                type: 'input',
                name: 'id',
                message: 'Enter manager id:',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter manager email:',
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'Enter manager office number:',
            },

        ])
        .then(managerData => {
            const { name, id, email, officeNumber } = managerData;
            const manager = new Manager(name, id, email, officeNumber)
            team = new Team(manager);
            addMember()
        })
}

//Add a member to the team
const addMember = () => {
    inquirer
        .prompt([{
                type: 'confirm',
                message: 'Add another team member? Yes to add a member, No to exit and create team page',
                name: 'addTeam',
                default: false
            }

        ])
        .then((confirmation) => {

            if (confirmation.addTeam) {
                return selectMemberProfile();
            } else {
                //Create team page
                fs.writeFile('team.html', generateTeamHTML(team), (err) => err ? console.log(err) : console.log('Team Page Created!'));
            }
        });
}

//Select member profile to add
const selectMemberProfile = () => {
    inquirer
        .prompt([{
            type: 'checkbox',
            message: 'Select team member profile to create',
            name: 'profile',
            choices: ['Engineer', 'Intern'],
        }])
        .then((selectedProfile) => {
            if (selectedProfile.profile == "Engineer") return addEngineer();
            if (selectedProfile.profile == "Intern") return addIntern();
        });
}

//Add an engineer to the team
const addEngineer = () => {
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: 'Enter engineer name:',
            },
            {
                type: 'input',
                name: 'id',
                message: 'Enter engineer id:',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter engineer email:',
            },
            {
                type: 'input',
                name: 'git',
                message: 'Enter engineer GitHub username',
            },

        ])
        .then(EngineerData => {
            const { name, id, email, git } = EngineerData;
            const engineer = new Engineer(name, id, email, git)
            team.addEngineer(engineer);
            //Ask user if he/she wants to add another member
            addMember()
        })
}

//Add an intern to the team
const addIntern = () => {
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: 'Enter intern name:',
            },
            {
                type: 'input',
                name: 'id',
                message: 'Enter intern id:',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter intern email:',
            },
            {
                type: 'input',
                name: 'school',
                message: 'Enter the intern school:',
            },

        ])
        .then(internData => {
            const { name, id, email, school } = internData;
            const intern = new Intern(name, id, email, school)
            team.addIntern(intern);
            //Ask user if he/she wants to add another member
            addMember()
        })
}

createTeam();