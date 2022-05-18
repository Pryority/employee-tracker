INSERT INTO department (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Salesperson', 30000, 1),
  ('Lead Engineer', 45000, 2),
  ('Junior Engineer', 60000, 2),
  ('Account Manager', 60000, 3);
 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, null),
  ('Robert', 'London', 2, null),
  ('Bruce', 'Wilson', 1, 1),
  ('Ashley', 'Pearson', 3, 2),
  ( 'Natalia', 'White', 1, 1);
 