use employeeTracker_db; 

INSERT INTO department
    (name)
VALUES
    ('Accounting'), 
    ('Legal'),
    ('Sales');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Senior Accountant', 750000, 1),
    ('Accountant', 500000, 1),
    ('Intern-Accountant', 50000, 1),
    ('Senior Lawyer', 1000000, 2),
    ('Lawyer', 1000000, 2),
    ('Intern-Lawyer', 60000, 2),
    ('Sales Lead', 250000, 3),
    ('Sales-Associate', 250000, 3),
    ('Sales-Intern', 50000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES  
    ('Daenerys', 'Targaryen', 1, NULL),
    ('Rhaehgar', 'Targaryen', 2, 1),
    ('George', 'Targaryen', 3, 1),
    ('Tywin', 'Lannister', 4, NULL),
    ('Joanna', 'Lannister', 5, 4),
    ('Jamie', 'Lannister', 6, 4),
    ('Ed', 'Stark', 7, NULL),
    ('Sansa', 'Stark', 8, 7),
    ('Jon', 'Snow', 9, 7);

