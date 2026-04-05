-- Step 1: Create MySQL User and Grant Permissions
-- Run this in phpMyAdmin SQL tab (select "No database" or any database)

-- Create user if not exists
CREATE USER IF NOT EXISTS 'bidalert2'@'localhost' IDENTIFIED BY 'bidalert@#123vcs';

-- Grant all privileges on bidalert2 database
GRANT ALL PRIVILEGES ON bidalert2.* TO 'bidalert2'@'localhost';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;

-- Verify user was created
SELECT User, Host FROM mysql.user WHERE User = 'bidalert2';
