const connection = require("./connection");

class DB {
    constructor(connection){
        this.connection = connection
    }

viewAllDepartments(){
    return this.connection.query(
        `
        SELECT 
            department.id,
            department.name
        FROM 
            department
        ORDER BY
            department.id
        `
    )
}

viewAllRoles(){
    return this.connection.query(
        `
        SELECT
            role.id,
            role.title,
            role.salary,
            department.name AS department
        FROM
            role
        LEFT JOIN
            department ON role.department_id = department.id
        ORDER BY
            role.id
        `

    )
}

viewAllEmployees(){
    return this.connection.query(
        `
        SELECT
            employee.id,
            employee.first_name,
            employee.last_name,
            role.title,
            role.salary,
            department.name AS department,
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM
            employee
        LEFT JOIN
            role on employee.role_id = role.id
        LEFT JOIN
            department ON role.department_id = department.id
        LEFT JOIN
            employee manager ON manager.id = employee.manager_id
        ORDER BY
            department.id
         `
    )
}

addDepartment(department){
    return this.connection.query(
        `
        INSERT INTO
            department
        SET
            ?
        `, department
    )
}

addRole(role){
    return this.connection.query(
        `
        INSERT INTO
            role
        SET
            ?

        `, role
    )
}

addEmployee(employee){
    return this.connection.query(
        `
        INSERT INTO
            employee
        SET
            ?
        `, employee
    )
}

updateEmployeeRole(role_id, employee_id){
    return this.connection.query(
        `
        UPDATE
            employee
        SET
            role_id = ?
        WHERE
            id = ?
        `, [role_id, employee_id]
    )
}

}


module.exports = new DB(connection);