const inquirer = require('inquirer');
const db = require ('./db')
require ('console.table');


// View all departments
async function viewAllDepartments() {
    const department = await db.viewAllDepartments();
    console.log('\n');
    console.table(department);

    startApp()
   
}
// View all roles
async function viewAllRoles(){
    const role = await db.viewAllRoles();
    console.log('\n');
    console.table(role);

    startApp()
}

// View all employees
async function viewAllEmployees(){
    const employee = await db.viewAllEmployees();
    console.log('\n');
    console.table(employee);

    startApp()
}



// Add Department
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

// Add role
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

// Add employee
async function addEmployee(){
    const roles = await db.viewAllRoles();
 
    const roleChoice = roles.map(({id, title}) => ({
        name: title,
        value: id
    }));

    const managers = await db.viewAllEmployees();

    const managerChoice = managers.map(({id, first_name, last_name}) =>({
        name: `${first_name} ${last_name}`,
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
         type: 'list',
         name: 'role_id',
         message: 'What is employees role?',
         choices: roleChoice
     },
     {
        type: 'list',
        name: 'manager_id',
        message: 'What is employees Manager id?',
        choices: managerChoice
    },
 
    ])
    await db.addEmployee(employee)
    console.log("New employee added.")
    startApp();
 }

 // Update Employee
 async function updateEmployeeRole(){
    const roles = await db.viewAllRoles();
 
    const roleChoice = roles.map(({id, title}) => ({
        name: title,
        value: id
    }));

    const employees = await db.viewAllEmployees();

    const employeeChoice = employees.map(({id, first_name, last_name}) =>({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const {employee_id} = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: "Which employee's role would you like to update?",
            choices: employeeChoice
        }
    ])

    const {role_id} = await inquirer.prompt([
        {
            type: 'list',
            name: 'role_id',
            message: "What is the employees new role?",
            choices: roleChoice
        }
    ])
    await db.updateEmployeeRole(role_id, employee_id)
    console.log("Employee role is now updated.")
    startApp();

 }

//  This starts the application and runs through the inquier questions
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
            case 'Update Employee Role':
            return updateEmployeeRole();
        }
    })

  
}

startApp();

