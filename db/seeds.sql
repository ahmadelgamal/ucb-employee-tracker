INSERT INTO department (id, name)
VALUES
(1, 'Accounting'),
(2, 'Admin'),
(3, 'HR'),
(4, 'Legal'),
(5, 'Marketing'),
(6, 'IT'),
(7, 'Sales');

INSERT INTO role (id, title, salary, department_id)
VALUES
(11, 'CFO', 100000, 1),
(12, 'Accountant', 60000, 1),
(21, 'Secretary', 60000, 2),
(31, 'HR Manager', 100000, 3),
(32, 'Personnel Associate', 60000, 3),
(41, 'Attorney', 80000, 4),
(51, 'Marketing Director', 120000, 5),
(52, 'SEO Manager', 100000, 5),
(61, 'IT Manager', 100000, 6),
(62, 'IT Administrator', 80000, 6),
(71, 'Sales Director', 120000, 7),
(72, 'Sales Rep', 70000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Ahmad', 'Masry', 61, NULL),
('Captain', 'Maged', 62, 61),
('Omar', 'De La Jolla', 11, NULL),
('Hana', 'Montana', 21, 11),
('May', 'November', 31, NULL),
('Muhammad', 'Ali', 32, 31),
('Dana', 'Bash', 52, 51);
