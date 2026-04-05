-- BidAlert Database Setup
-- Run this in phpMyAdmin SQL tab for database: bidalert2

-- Create users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create tenders table (for future use)
CREATE TABLE IF NOT EXISTS `tenders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(500) NOT NULL,
  `description` TEXT,
  `authority` VARCHAR(255),
  `state` VARCHAR(100),
  `category` VARCHAR(100),
  `estimated_value` DECIMAL(15, 2),
  `deadline` DATE,
  `status` ENUM('active', 'archive', 'closed') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_status` (`status`),
  INDEX `idx_state` (`state`),
  INDEX `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create user_alerts table (for future use)
CREATE TABLE IF NOT EXISTS `user_alerts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `alert_type` ENUM('email', 'sms') DEFAULT 'email',
  `category` VARCHAR(100),
  `state` VARCHAR(100),
  `keywords` TEXT,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample user (password: password123)
-- Password hash for 'password123' using bcrypt
INSERT INTO `users` (`name`, `email`, `password`) VALUES
('Test User', 'test@bidalert.in', '$2a$10$rOzJQjKqVqZ5yqN5yqN5yOzJQjKqVqZ5yqN5yqN5yOzJQjKqVqZ5y')
ON DUPLICATE KEY UPDATE `name` = 'Test User';
