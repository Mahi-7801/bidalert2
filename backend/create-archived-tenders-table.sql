-- Create archived_tenders table to store historical data
CREATE TABLE IF NOT EXISTS `archived_tenders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
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
  `closing_date` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `source_table` VARCHAR(50) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Original source table (GEM, eProcurement, iREPS, Global)',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `archived_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX `idx_tender_id` (`tender_id`),
  INDEX `idx_state` (`state_name`),
  INDEX `idx_closing_date` (`closing_date`),
  INDEX `idx_source_table` (`source_table`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
