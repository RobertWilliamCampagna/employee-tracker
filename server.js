const inquirer = require('inquirer');
const db = require ('./db')
require ('console.table');



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
    const department = await inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Enter department name.',
        validate: answer => {
            if (answer === ''){
                return 'Enter department name.'
            }else{
                return true;
            }
        }
    },

])
   await db.addDepartment(department)
    startApp();

}

async function addRole(){
   const departments = await db.viewAllDepartments();

   const departmentChoices = departments.map(({id, name}) => ({
       name:name,
       value: id
   }));

   const role = await inquirer.prompt([
       {
           type: 'input',
           name: 'title',
           message: 'What is the title of the role?',
           validate: answer => {
               if (answer === ''){
                   return 'Enter title please.'
               }else{
                   return true;
               }
           },
       },
       {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of role?',
        validate: answer => {
            if (answer === ''){
                return 'Enter salary please.'
            }else{
                return true;
            }
        },
    },
    {
        type: 'list',
        name: 'department_id',
        message: 'What deparment does role belong to?',
        choices: departmentChoices
    },

   ])
   await db.addRole(role)
   console.log("New role added.")
   startApp();
}

async function addEmployee(){
    const roles = await db.viewAllRoles();
 
    const roleChoice = roles.map(({id, title}) => ({
        title: title,
        value: id
    }));
 
    const employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the name of the employee?',
            validate: answer => {
                if (answer === ''){
                    return 'Enter first name please.'
                }else{
                    return true;
                }
            },
        },
        {
         type: 'input',
         name: 'last_name',
         message: 'What is the last name of employee?',
         validate: answer => {
             if (answer === ''){
                 return 'Enter last name please.'
             }else{
                 return true;
             }
         },
     },
     {
         type: 'input',
         name: 'role_id',
         message: 'What is employees role?',
         choices: roleChoice
     },
 
    ])
    await db.addEmployee(employee)
    console.log("New employee added.")
    startApp();
 }

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
             return viewAllDepartments();
             case 'View all Roles':
             return viewAllRoles();
             case 'View all Employees':
             return viewAllEmployees();
             case 'Add Department':
            return addDepartment();
            case 'Add Role':
            return addRole();
            case 'Add Employee':
            return addEmployee();
        //     case 'Update Employee Role':
        //         updateRole();
        }
    })

  
}

startApp();

