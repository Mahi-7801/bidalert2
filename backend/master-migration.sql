-- BidAlert Master Database Migration
-- Database: bidalert_bidalert2



-- 1. Users Table (Comprehensive Version)
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin','moderator') DEFAULT 'user',
  `subscription_status` enum('pending','active','expired','cancelled') DEFAULT 'pending',
  `plan_type` varchar(50) DEFAULT 'free',
  `plan_expiry_date` date DEFAULT NULL,
  `web_access` tinyint(1) DEFAULT 0,
  `email_alerts` tinyint(1) DEFAULT 0,
  `bidding_guidance` tinyint(1) DEFAULT 0,
  `support_24_7` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. GEM (Government e-Marketplace) Tenders Table
CREATE TABLE IF NOT EXISTS `gem_tenders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bidalert_user` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_id` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `name_of_work` LONGTEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_category` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_dept` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_qty` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_emd` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `emd_exemption` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_ecv` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `state_name` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `location` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `apply_mode` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `source_site` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `gemdoclink` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `doclinks` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `closing_date` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_tender_id` (`tender_id`),
  INDEX `idx_state` (`state_name`),
  INDEX `idx_category` (`tender_category`(255)),
  INDEX `idx_closing_date` (`closing_date`),
  INDEX `idx_bidalert_user` (`bidalert_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- 3. eProcurement Tenders Table
CREATE TABLE IF NOT EXISTS `eprocurement_tenders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bidalert_user` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_id` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `name_of_work` LONGTEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_category` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_dept` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_qty` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_emd` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `emd_exemption` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_ecv` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `state_name` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `location` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `apply_mode` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `source_site` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `gemdoclink` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `doclinks` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `closing_date` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_tender_id` (`tender_id`),
  INDEX `idx_state` (`state_name`),
  INDEX `idx_category` (`tender_category`(255)),
  INDEX `idx_closing_date` (`closing_date`),
  INDEX `idx_bidalert_user` (`bidalert_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- 4. iREPS Tenders Table
CREATE TABLE IF NOT EXISTS `ireps_tenders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bidalert_user` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_id` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `name_of_work` LONGTEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_category` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_dept` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_qty` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_emd` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `emd_exemption` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_ecv` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `state_name` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `location` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `apply_mode` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `source_site` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `gemdoclink` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `doclinks` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `closing_date` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_tender_id` (`tender_id`),
  INDEX `idx_state` (`state_name`),
  INDEX `idx_category` (`tender_category`(255)),
  INDEX `idx_closing_date` (`closing_date`),
  INDEX `idx_bidalert_user` (`bidalert_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- 5. Global Tenders Table
CREATE TABLE IF NOT EXISTS `temp_tenders_global` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bidalert_user` varchar(255) DEFAULT NULL,
  `tender_id` varchar(255) DEFAULT NULL,
  `name_of_work` longtext DEFAULT NULL,
  `tender_category` varchar(255) DEFAULT NULL,
  `tender_dept` varchar(255) DEFAULT NULL,
  `tender_qty` varchar(255) DEFAULT NULL,
  `tender_emd` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `tender_ecv` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `apply_mode` varchar(255) DEFAULT NULL,
  `source_site` text DEFAULT NULL,
  `globaldoclink` text DEFAULT NULL,
  `mfa` text DEFAULT NULL,
  `closing_date` varchar(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_tender_id` (`tender_id`),
  INDEX `idx_country` (`country`),
  INDEX `idx_closing_date` (`closing_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- 6. User Saved Tenders (Tracking table)
CREATE TABLE IF NOT EXISTS `user_saved_tenders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `tender_id` varchar(255) NOT NULL,
  `source_table` varchar(50) DEFAULT 'GEM',
  `notified_expiry` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `tender_id` (`tender_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Notifications Table
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` varchar(50) DEFAULT 'info',
  `link` varchar(255) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Keyword Alerts
CREATE TABLE IF NOT EXISTS `keyword_alerts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `keyword` varchar(255) NOT NULL,
  `tender_type` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_notified` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. App Settings
CREATE TABLE IF NOT EXISTS `app_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(255) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. Blog Posts (already handled by server.js, but good to have)
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `status` enum('published','draft') DEFAULT 'published',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. Portal Mappings
CREATE TABLE IF NOT EXISTS `portal_mappings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `portal_name` varchar(255) NOT NULL,
  `portal_url` varchar(500) DEFAULT NULL,
  `state_name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. Documents
CREATE TABLE IF NOT EXISTS `documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `size_bytes` int(11) DEFAULT NULL,
  `uploaded_by` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 13. User Requests (Requirements)
CREATE TABLE IF NOT EXISTS `user_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_phone` varchar(50) DEFAULT NULL,
  `message` text NOT NULL,
  `keyword` varchar(255) DEFAULT NULL,
  `state` varchar(500) DEFAULT NULL,
  `country` varchar(500) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `duration_value` varchar(20) DEFAULT NULL,
  `duration_unit` varchar(20) DEFAULT 'MONTHS',
  `status` enum('new','processing','curation','replied','archived','read') DEFAULT 'new',
  `admin_notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Sample Admin User
INSERT INTO `users` (`name`, `email`, `phone`, `password`, `role`, `subscription_status`, `plan_type`, `web_access`) 
VALUES ('BidAlert Admin', 'admin@bidalert.in', '9876543210', '$2a$10$rOzJQjKqVqZ5yqN5yqN5yOzJQjKqVqZ5yqN5yqN5yOzJQjKqVqZ5y', 'admin', 'active', 'enterprise', 1)
ON DUPLICATE KEY UPDATE `role` = 'admin';

COMMIT;
