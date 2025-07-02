CREATE DATABASE IF NOT EXISTS expense_tracker;
USE expense_tracker;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, status) VALUES
('Janki', 'janki@example.com', 'active'),
('Vikas', 'vikas@example.com', 'active'),
('Ramesh', 'ramesh@example.com', 'active'),
('Suresh', 'suresh@example.com', 'active');

INSERT INTO categories (name) VALUES
('Food & Dining'),
('Transportation'),
('Shopping'),
('Entertainment'),
('Bills & Utilities'),
('Healthcare'),
('Travel'),
('Education'),
('Personal Care'),
('Miscellaneous');

INSERT INTO expenses (user_id, category, amount, date, description) VALUES
(1, 1, 25.50, '2025-04-15', 'Lunch at restaurant'),
(1, 2, 45.00, '2025-04-15', 'Gas for car'),
(2, 3, 89.99, '2025-04-16', 'Grocery shopping'),
(2, 4, 15.00, '2025-04-16', 'Movie ticket'),
(3, 5, 120.00, '2025-04-17', 'Internet bill'),
(3, 1, 35.75, '2025-04-17', 'Dinner'),
(4, 6, 75.00, '2025-04-18', 'Doctor visit'),
(1, 7, 250.00, '2025-04-20', 'Flight booking'),
(2, 8, 45.00, '2025-04-21', 'Online course'),
(3, 9, 30.00, '2025-04-22', 'Haircut'),
(4, 10, 20.00, '2025-04-23', 'Coffee shop'),
(1, 1, 28.75, '2025-05-01', 'Breakfast'),
(2, 2, 50.00, '2025-05-02', 'Uber ride'),
(3, 3, 95.50, '2025-05-03', 'Weekly groceries'),
(4, 4, 25.00, '2025-05-04', 'Concert ticket'),
(1, 5, 85.00, '2025-05-05', 'Phone bill'),
(2, 6, 120.00, '2025-05-06', 'Dentist visit'),
(3, 7, 180.00, '2025-05-07', 'Hotel booking'),
(4, 8, 60.00, '2025-05-08', 'Book purchase'),
(1, 9, 25.00, '2025-05-09', 'Spa treatment'),
(2, 1, 32.40, '2025-06-01', 'Lunch meeting'),
(3, 2, 40.00, '2025-06-02', 'Taxi fare'),
(4, 3, 110.25, '2025-06-03', 'Shopping spree'),
(1, 4, 18.00, '2025-06-04', 'Streaming service'),
(2, 5, 95.00, '2025-06-05', 'Electricity bill'),
(3, 6, 85.00, '2025-06-06', 'Pharmacy'),
(4, 7, 300.00, '2025-06-07', 'Vacation expense'),
(1, 8, 75.00, '2025-06-08', 'Workshop fee'),
(2, 9, 40.00, '2025-06-09', 'Salon visit'),
(3, 10, 15.50, '2025-06-10', 'Coffee and snacks'),
(1, 1, 22.30, '2025-07-01', 'Café lunch'),
(2, 2, 55.00, '2025-07-01', 'Train ticket'),
(3, 3, 75.25, '2025-07-02', 'Clothing purchase');