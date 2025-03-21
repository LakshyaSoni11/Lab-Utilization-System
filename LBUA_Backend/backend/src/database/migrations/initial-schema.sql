-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- Roles Table
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL CHECK (role_name IN ('Admin', 'Faculty', 'Student'))
);

-- Labs Table
CREATE TABLE labs (
    lab_id SERIAL PRIMARY KEY,
    lab_name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    available_resources TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Requests Table
CREATE TABLE requests (
    request_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    lab_id INT NOT NULL,
    request_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'Pending',
    reason TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (lab_id) REFERENCES labs(lab_id)
);

-- Approvals Table
CREATE TABLE approvals (
    approval_id SERIAL PRIMARY KEY,
    request_id INT NOT NULL,
    approved_by INT,
    approval_status VARCHAR(50) CHECK (approval_status IN ('Approved', 'Rejected')),
    remarks TEXT,
    approved_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (request_id) REFERENCES requests(request_id),
    FOREIGN KEY (approved_by) REFERENCES users(user_id)
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_requests_status ON requests(status);
