INSERT INTO departments (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Legal');

INSERT INTO roles (title, salary)
VALUES
  ('Salesperson', 30000, 0),
  ('Lead Engineer', 45000, 1),
  ('Junior Engineer', 60000, 2),
  ('Account Manager', 60000, 3);
 
INSERT INTO employees (first_name, last_name, role_id)
VALUES
  ('James', 'Fraser', 1),
  ('Robert', 'London', 0),
  ('Bruce', 'Wilson', 1),
  ('Ashley', 'Pearson', 2),
  ('Natalia', 'White', 1);
 