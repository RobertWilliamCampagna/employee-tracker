DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) ,
    department_id INT  NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

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