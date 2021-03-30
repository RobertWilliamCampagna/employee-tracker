const inquirer = require('inquirer');
const db = require ('./db')



async function viewAllDepartments() {
    const department = await db.viewAllDepartments();
    console.log('\n');
    console.table(department);

    startApp()
   
}
async function viewAllRoles(){
    const role = await db.viewAllRoles();
    console.log('\n');
    console.table(role);

    startApp()
}

async function viewAllEmployees(){
    const employee = await db.viewAllEmployees();
    console.log('\n');
    console.table(employee);

    startApp()
}

const departmentArray = []

async function addDepartment(){
    inquirer.prompt([
    {
        type: 'input',
        name: 'departmentName',
        message: 'Enter department name.',
        validate: answer => {
            if (answer === ''){
                return 'Enter department name.'
            }else{
                return true;
            }
        }
    },
    {
    type: 'input',
    name: 'departmentId',
    message: 'Please enter department id.',
    validate: answer => {
        if (answer === ''){
            return 'Enter department name.'
        }else{
            return true;
        }
    }
    }
]).then(response =>{
    const department = new department (response.departmentName, response.departmentId)
    departmentArray.push(department)
    addDepartment();
    
    startApp();
   
})

// startApp();

}

// async function addRole(){
//     const role = await db.addRole();
//     console.log('\n');
//     console.table(role);
// }

// async function addEmployee(){
//     const employee = await db.addEmployee();
//     console.log('\n');
//     console.log(employee);
// }


// startApp();
// viewAllDepartments();

function startApp(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'navigation',
            message: "Welcome, what would you like to do?",
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
        }
    ]).then(res => {
        switch(res.navigation){
            case 'View all Departments':
             viewAllDepartments();
             break;
             case 'View all Roles':
             viewAllRoles();
             case 'View all Employees':
             viewAllEmployees();
             case 'Add Department':
            addDepartment();
            case 'Add Role':
            addRole();
            case 'Add Employee':
            addEmployee();
            case 'Update Employee Role':
                updateRole();
        }
    })

  
}

startApp();

// function viewDepartment(){
//     inquirer.prompt([
//         {
//             type: 'list',
//             name: 'Departments',
//             message: 'What Department would you like to view?',
//             choices: ['Accounting', 'Legal', 'Sales']
//         }
//     ]).then(res => {
//         switch(res.department){
//             case 'Accounting':
//                 accounting();
//                 break;
//             case 'Legal':
//                 legal();
//                 break;
//             case 'Sales':
//                 sales();
//                 default:

//         }
//     })
  
// }
// viewAllDepartments();

// function accounting(){
//     inquirer.prompt([
//         {
//             type: "list",
//             name: 'Accountants',
//             message: 'Please select accountant.',
//             choices: []
//         }
//     ])
// }

// startApp();