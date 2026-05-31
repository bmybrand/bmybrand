-- Run this in phpMyAdmin (SQL tab) after creating your database.
-- Example: CREATE DATABASE bmybrand CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS strategy_call_bookings (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  country_code VARCHAR(16) DEFAULT NULL,
  phone VARCHAR(64) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  website_url VARCHAR(512) NOT NULL,
  budget VARCHAR(64) NOT NULL,
  call_notes TEXT NOT NULL,
  source VARCHAR(128) NOT NULL,
  appointment_date DATE DEFAULT NULL,
  appointment_time VARCHAR(32) DEFAULT NULL,
  timezone VARCHAR(191) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_strategy_call_email (email),
  INDEX idx_strategy_call_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
