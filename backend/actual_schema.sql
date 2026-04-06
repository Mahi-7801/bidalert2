-- Table: app_settings
CREATE TABLE `app_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(255) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table: archived_tenders
CREATE TABLE `archived_tenders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tender_id` varchar(255) DEFAULT NULL,
  `name_of_work` longtext DEFAULT NULL,
  `tender_category` text DEFAULT NULL,
  `tender_dept` varchar(255) DEFAULT NULL,
  `tender_qty` varchar(255) DEFAULT NULL,
  `tender_emd` varchar(255) DEFAULT NULL,
  `emd_exemption` varchar(255) DEFAULT NULL,
  `tender_ecv` varchar(255) DEFAULT NULL,
  `state_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `apply_mode` varchar(255) DEFAULT NULL,
  `source_site` text DEFAULT NULL,
  `gemdoclink` text DEFAULT NULL,
  `doclinks` text DEFAULT NULL,
  `closing_date` varchar(255) DEFAULT NULL,
  `source_table` varchar(50) DEFAULT NULL COMMENT 'Original source table (GEM, eProcurement, iREPS, Global)',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `archived_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `bidalert_user` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_tender_id` (`tender_id`),
  KEY `idx_state` (`state_name`),
  KEY `idx_closing_date` (`closing_date`),
  KEY `idx_source_table` (`source_table`)
) ENGINE=InnoDB AUTO_INCREMENT=7644 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Table: bidgpt_context
CREATE TABLE `bidgpt_context` (
  `session_id` varchar(255) NOT NULL,
  `last_filters` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`last_filters`)),
  `last_intent` varchar(100) DEFAULT NULL,
  `last_query` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Table: blog_posts
CREATE TABLE `blog_posts` (
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Table: documents
CREATE TABLE `documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `size_bytes` int(11) DEFAULT NULL,
  `uploaded_by` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table: eprocurement_tenders
CREATE TABLE `eprocurement_tenders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bidalert_user` varchar(255) DEFAULT NULL,
  `tender_id` varchar(255) DEFAULT NULL,
  `name_of_work` longtext DEFAULT NULL,
  `tender_category` text DEFAULT NULL,
  `tender_dept` varchar(255) DEFAULT NULL,
  `tender_qty` varchar(255) DEFAULT NULL,
  `tender_emd` varchar(255) DEFAULT NULL,
  `emd_exemption` varchar(255) DEFAULT NULL,
  `tender_ecv` varchar(255) DEFAULT NULL,
  `state_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `apply_mode` varchar(255) DEFAULT NULL,
  `source_site` text DEFAULT NULL,
  `gemdoclink` text DEFAULT NULL,
  `doclinks` text DEFAULT NULL,
  `closing_date` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_tender_id_unique` (`tender_id`),
  KEY `idx_tender_id` (`tender_id`),
  KEY `idx_state` (`state_name`),
  KEY `idx_category` (`tender_category`(255)),
  KEY `idx_closing_date` (`closing_date`),
  KEY `idx_bidalert_user` (`bidalert_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Table: gem_tenders
CREATE TABLE `gem_tenders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bidalert_user` varchar(255) DEFAULT NULL,
  `tender_id` varchar(255) DEFAULT NULL,
  `name_of_work` longtext DEFAULT NULL,
  `tender_category` text DEFAULT NULL,
  `tender_dept` varchar(255) DEFAULT NULL,
  `tender_qty` varchar(255) DEFAULT NULL,
  `tender_emd` varchar(255) DEFAULT NULL,
  `emd_exemption` varchar(255) DEFAULT NULL,
  `tender_ecv` varchar(255) DEFAULT NULL,
  `state_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `apply_mode` varchar(255) DEFAULT NULL,
  `source_site` text DEFAULT NULL,
  `gemdoclink` text DEFAULT NULL,
  `doclinks` text DEFAULT NULL,
  `closing_date` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_tender_id_unique` (`tender_id`),
  KEY `idx_tender_id` (`tender_id`),
  KEY `idx_state` (`state_name`),
  KEY `idx_category` (`tender_category`(255)),
  KEY `idx_closing_date` (`closing_date`),
  KEY `idx_bidalert_user` (`bidalert_user`)
) ENGINE=InnoDB AUTO_INCREMENT=581 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Table: images
CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_name` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Table: ireps_tenders
CREATE TABLE `ireps_tenders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bidalert_user` varchar(255) DEFAULT NULL,
  `tender_id` varchar(255) DEFAULT NULL,
  `name_of_work` longtext DEFAULT NULL,
  `tender_category` text DEFAULT NULL,
  `tender_dept` varchar(255) DEFAULT NULL,
  `tender_qty` varchar(255) DEFAULT NULL,
  `tender_emd` varchar(255) DEFAULT NULL,
  `emd_exemption` varchar(255) DEFAULT NULL,
  `tender_ecv` varchar(255) DEFAULT NULL,
  `state_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `apply_mode` varchar(255) DEFAULT NULL,
  `source_site` text DEFAULT NULL,
  `gemdoclink` text DEFAULT NULL,
  `doclinks` text DEFAULT NULL,
  `closing_date` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_tender_id_unique` (`tender_id`),
  KEY `idx_tender_id` (`tender_id`),
  KEY `idx_state` (`state_name`),
  KEY `idx_category` (`tender_category`(255)),
  KEY `idx_closing_date` (`closing_date`),
  KEY `idx_bidalert_user` (`bidalert_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Table: keyword_alerts
CREATE TABLE `keyword_alerts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `keyword` varchar(255) NOT NULL,
  `tender_type` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_sent_at` datetime DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `last_notified` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table: notifications
CREATE TABLE `notifications` (
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
) ENGINE=InnoDB AUTO_INCREMENT=1015 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table: portal_mappings
CREATE TABLE `portal_mappings` (
  `portal` varchar(50) NOT NULL,
  `mapping` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`mapping`)),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`portal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Table: subscriptions
CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `plan_type` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `razorpay_order_id` varchar(255) DEFAULT NULL,
  `razorpay_payment_id` varchar(255) DEFAULT NULL,
  `razorpay_signature` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Table: temp_tenders_global
CREATE TABLE `temp_tenders_global` (
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_tender_id` (`tender_id`),
  KEY `idx_country` (`country`),
  KEY `idx_closing_date` (`closing_date`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Table: tender_context_cache
CREATE TABLE `tender_context_cache` (
  `id` varchar(255) NOT NULL,
  `raw_text` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: user_requests
CREATE TABLE `user_requests` (
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
  `last_sent_at` datetime DEFAULT NULL,
  `matches_found` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Table: user_saved_tenders
CREATE TABLE `user_saved_tenders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `tender_id` varchar(255) NOT NULL,
  `source_table` varchar(50) DEFAULT 'GEM',
  `notified_expiry` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `tender_id` (`tender_id`)
) ENGINE=InnoDB AUTO_INCREMENT=604 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: users
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin','moderator') DEFAULT 'user',
  `subscription_status` enum('pending','active','expired','cancelled') DEFAULT 'pending',
  `plan_type` varchar(50) DEFAULT 'free',
  `plan_expiry_date` datetime DEFAULT NULL,
  `web_access` tinyint(1) DEFAULT 0,
  `email_alerts` tinyint(1) DEFAULT 0,
  `bidding_guidance` tinyint(1) DEFAULT 0,
  `support_24_7` tinyint(1) DEFAULT 0,
  `sms_alerts` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

