-- Complete Migration for GEM, eProcurement, and iREPS Tables
-- Run this in phpMyAdmin SQL tab or via Node.js migration script
-- Database: bidalert2

-- =====================================================
-- GEM (Government e-Marketplace) Tenders Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `gem_tenders` (
  `bidalert_user` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'BidAlert user associated with this tender',
  `tender_id` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Unique tender identification number',
  `name_of_work` LONGTEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Description of the work/project',
  `tender_category` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Category/type of tender',
  `tender_dept` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Department/organization issuing the tender',
  `tender_qty` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Quantity required',
  `tender_emd` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Earnest Money Deposit amount',
  `emd_exemption` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'EMD exemption status',
  `tender_ecv` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Estimated Contract Value',
  `state_name` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'State where tender is applicable',
  `location` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Specific location/city',
  `apply_mode` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Mode of application (online/offline)',
  `source_site` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Source website URL',
  `gemdoclink` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'GEM document link',
  `doclinks` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Additional document links',
  `closing_date` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT 'Tender closing date and time',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Record last update timestamp',
  
  INDEX `idx_tender_id` (`tender_id`),
  INDEX `idx_state` (`state_name`),
  INDEX `idx_category` (`tender_category`(255)),
  INDEX `idx_closing_date` (`closing_date`),
  INDEX `idx_bidalert_user` (`bidalert_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='GEM (Government e-Marketplace) tenders data';

-- =====================================================
-- eProcurement Tenders Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `eprocurement_tenders` (
  `bidalert_user` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'BidAlert user associated with this tender',
  `tender_id` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Unique tender identification number',
  `name_of_work` LONGTEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Description of the work/project',
  `tender_category` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Category/type of tender',
  `tender_dept` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Department/organization issuing the tender',
  `tender_qty` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Quantity required',
  `tender_emd` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Earnest Money Deposit amount',
  `emd_exemption` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'EMD exemption status',
  `tender_ecv` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Estimated Contract Value',
  `state_name` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'State where tender is applicable',
  `location` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Specific location/city',
  `apply_mode` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Mode of application (online/offline)',
  `source_site` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Source website URL',
  `gemdoclink` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'GEM document link',
  `doclinks` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Additional document links',
  `closing_date` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT 'Tender closing date and time',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Record last update timestamp',
  
  INDEX `idx_tender_id` (`tender_id`),
  INDEX `idx_state` (`state_name`),
  INDEX `idx_category` (`tender_category`(255)),
  INDEX `idx_closing_date` (`closing_date`),
  INDEX `idx_bidalert_user` (`bidalert_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='eProcurement portal tenders data';

-- =====================================================
-- iREPS (Indian Railways E-Procurement System) Tenders Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `ireps_tenders` (
  `bidalert_user` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'BidAlert user associated with this tender',
  `tender_id` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Unique tender identification number',
  `name_of_work` LONGTEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Description of the work/project',
  `tender_category` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Category/type of tender',
  `tender_dept` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Department/organization issuing the tender',
  `tender_qty` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Quantity required',
  `tender_emd` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Earnest Money Deposit amount',
  `emd_exemption` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'EMD exemption status',
  `tender_ecv` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Estimated Contract Value',
  `state_name` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'State where tender is applicable',
  `location` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Specific location/city',
  `apply_mode` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Mode of application (online/offline)',
  `source_site` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Source website URL',
  `gemdoclink` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'GEM document link',
  `doclinks` TEXT COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Additional document links',
  `closing_date` VARCHAR(255) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT 'Tender closing date and time',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Record last update timestamp',
  
  INDEX `idx_tender_id` (`tender_id`),
  INDEX `idx_state` (`state_name`),
  INDEX `idx_category` (`tender_category`(255)),
  INDEX `idx_closing_date` (`closing_date`),
  INDEX `idx_bidalert_user` (`bidalert_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='iREPS (Indian Railways E-Procurement System) tenders data';

-- =====================================================
-- Verification Queries
-- =====================================================
-- Run these to verify tables were created successfully:
-- SHOW TABLES LIKE '%_tenders';
-- DESCRIBE gem_tenders;
-- DESCRIBE eprocurement_tenders;
-- DESCRIBE ireps_tenders;
