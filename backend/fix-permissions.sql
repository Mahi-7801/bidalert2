-- Fix permissions for existing user bidalert2
-- Run this in phpMyAdmin SQL tab

-- Grant all privileges on bidalert2 database
GRANT ALL PRIVILEGES ON bidalert2.* TO 'bidalert2'@'localhost';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;

-- Verify permissions
SHOW GRANTS FOR 'bidalert2'@'localhost';
