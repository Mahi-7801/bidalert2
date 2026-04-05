-- Complete user setup for bidalert2
-- Run this in phpMyAdmin SQL tab

-- Step 1: Drop user if exists (to start fresh)
DROP USER IF EXISTS 'bidalert2'@'localhost';

-- Step 2: Create user with password
CREATE USER 'bidalert2'@'localhost' IDENTIFIED BY 'bidalert@#123vcs';

-- Step 3: Grant all privileges on bidalert2 database
GRANT ALL PRIVILEGES ON bidalert2.* TO 'bidalert2'@'localhost';

-- Step 4: Flush privileges
FLUSH PRIVILEGES;

-- Step 5: Verify user and permissions
SHOW GRANTS FOR 'bidalert2'@'localhost';

-- Step 6: Test connection (optional)
SELECT USER(), DATABASE();
