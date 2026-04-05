-- =============================================================
-- BidAlert Complete Database Schema
-- Database: bidalert_bidalert2
-- Total Tables: 18
-- Generated: 2026-04-03
-- =============================================================

SET FOREIGN_KEY_CHECKS = 0;

-- =============================================================
-- 1. users
-- =============================================================
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
  `sms_alerts` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- 2. subscriptions
-- =============================================================
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `plan_type` varchar(100) NOT NULL,
  `amount` decimal(10,2) DEFAULT 0.00,
  `razorpay_order_id` varchar(255) DEFAULT NULL,
  `razorpay_payment_id` varchar(255) DEFAULT NULL,
  `razorpay_signature` varchar(500) DEFAULT NULL,
  `status` enum('pending','active','expired','failed','cancelled') DEFAULT 'pending',
  `expires_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_razorpay_order_id` (`razorpay_order_id`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- =============================================================
-- 3. gem_tenders
-- =============================================================
CREATE TABLE IF NOT EXISTS `gem_tenders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bidalert_user` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_id` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `name_of_work` longtext COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_category` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_dept` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_qty` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_emd` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `emd_exemption` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_ecv` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `state_name` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `apply_mode` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `source_site` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `gemdoclink` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `doclinks` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `closing_date` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_tender_id` (`tender_id`),
  INDEX `idx_state` (`state_name`),
  INDEX `idx_category` (`tender_category`(255)),
  INDEX `idx_closing_date` (`closing_date`),
  INDEX `idx_bidalert_user` (`bidalert_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- =============================================================
-- 4. eprocurement_tenders
-- =============================================================
CREATE TABLE IF NOT EXISTS `eprocurement_tenders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bidalert_user` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_id` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `name_of_work` longtext COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_category` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_dept` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_qty` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_emd` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `emd_exemption` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_ecv` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `state_name` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `apply_mode` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `source_site` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `gemdoclink` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `doclinks` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `closing_date` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_tender_id` (`tender_id`),
  INDEX `idx_state` (`state_name`),
  INDEX `idx_category` (`tender_category`(255)),
  INDEX `idx_closing_date` (`closing_date`),
  INDEX `idx_bidalert_user` (`bidalert_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- =============================================================
-- 5. ireps_tenders
-- =============================================================
CREATE TABLE IF NOT EXISTS `ireps_tenders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bidalert_user` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_id` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `name_of_work` longtext COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_category` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_dept` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_qty` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_emd` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `emd_exemption` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_ecv` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `state_name` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `apply_mode` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `source_site` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `gemdoclink` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `doclinks` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `closing_date` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_tender_id` (`tender_id`),
  INDEX `idx_state` (`state_name`),
  INDEX `idx_category` (`tender_category`(255)),
  INDEX `idx_closing_date` (`closing_date`),
  INDEX `idx_bidalert_user` (`bidalert_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- =============================================================
-- 6. temp_tenders_global
-- =============================================================
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
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_tender_id` (`tender_id`),
  INDEX `idx_country` (`country`),
  INDEX `idx_closing_date` (`closing_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- =============================================================
-- 7. archived_tenders
-- =============================================================
CREATE TABLE IF NOT EXISTS `archived_tenders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tender_id` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `name_of_work` longtext COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_category` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_dept` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_qty` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_emd` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `emd_exemption` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `tender_ecv` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `state_name` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `apply_mode` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `source_site` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `gemdoclink` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `doclinks` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `closing_date` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `source_table` varchar(50) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Original source table (GEM, eProcurement, iREPS, Global)',
  `country` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `bidalert_user` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `archived_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_tender_id` (`tender_id`),
  INDEX `idx_state` (`state_name`),
  INDEX `idx_closing_date` (`closing_date`),
  INDEX `idx_source_table` (`source_table`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- =============================================================
-- 8. user_saved_tenders
-- =============================================================
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

-- =============================================================
-- 9. notifications
-- =============================================================
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
  KEY `user_id` (`user_id`),
  INDEX `idx_is_read` (`is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================
-- 10. keyword_alerts
-- =============================================================
CREATE TABLE IF NOT EXISTS `keyword_alerts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `keyword` varchar(255) NOT NULL,
  `tender_type` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_sent_at` timestamp NULL DEFAULT NULL,
  `last_notified` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  INDEX `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================
-- 11. user_requests
-- =============================================================
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
  `duration_value` int(11) DEFAULT NULL,
  `duration_unit` varchar(50) DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `status` enum('new','processing','curation','replied','archived','read') DEFAULT 'new',
  `admin_notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================
-- 12. app_settings
-- =============================================================
CREATE TABLE IF NOT EXISTS `app_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(255) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================
-- 13. blog_posts
-- =============================================================
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `author` varchar(100) DEFAULT 'Admin',
  `image_url` varchar(500) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'published',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- =============================================================
-- 14. documents
-- =============================================================
CREATE TABLE IF NOT EXISTS `documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `size_bytes` int(11) DEFAULT NULL,
  `uploaded_by` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================
-- 15. portal_mappings
-- =============================================================
CREATE TABLE IF NOT EXISTS `portal_mappings` (
  `portal` varchar(50) NOT NULL,
  `mapping` json DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`portal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- =============================================================
-- 16. bidgpt_context
-- =============================================================
CREATE TABLE IF NOT EXISTS `bidgpt_context` (
  `session_id` varchar(255) NOT NULL,
  `last_filters` json DEFAULT NULL,
  `last_intent` varchar(100) DEFAULT NULL,
  `last_query` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- =============================================================
-- 17. tender_context_cache
-- =============================================================
CREATE TABLE IF NOT EXISTS `tender_context_cache` (
  `id` varchar(255) NOT NULL,
  `raw_text` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- =============================================================
-- 18. images
-- =============================================================
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `size_bytes` int(11) DEFAULT NULL,
  `uploaded_by` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- =============================================================
-- Re-enable FK Checks
-- =============================================================
SET FOREIGN_KEY_CHECKS = 1;

COMMIT;
