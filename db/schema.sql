-- ==========================================================
-- INTELLETTO-26 // TiDB Cloud SQL Schema
-- Compatible with TiDB Serverless & MySQL 5.7 / 8.0 Protocol
-- ==========================================================

-- 1. Arena Events Table
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(60) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  category VARCHAR(30) NOT NULL,
  tagline TEXT,
  description TEXT,
  icon VARCHAR(50) DEFAULT 'Zap',
  stage_code VARCHAR(50),
  team_size VARCHAR(50),
  member_limit VARCHAR(50),
  per_head_fee VARCHAR(50),
  team_fee VARCHAR(50),
  prize VARCHAR(50),
  duration VARCHAR(50) DEFAULT '',
  eligibility VARCHAR(120),
  rules JSON,
  venue_hint VARCHAR(120),
  fee VARCHAR(100),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_sort_order (sort_order)
);

-- 2. Player Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  player_tag VARCHAR(30) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL,
  phone VARCHAR(25) NOT NULL,
  college VARCHAR(150) NOT NULL,
  department VARCHAR(100) NOT NULL,
  year_of_study VARCHAR(30) NOT NULL,
  city VARCHAR(80) NULL,
  state VARCHAR(80) NULL,
  alternate_phone VARCHAR(25) NULL,
  emergency_contact VARCHAR(120) NULL,
  team_name VARCHAR(80) NULL,
  team_size VARCHAR(20) NULL,
  teammates JSON NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_phone (phone),
  INDEX idx_player_tag (player_tag)
);

-- 3. Registration to Event Arena Join Table
CREATE TABLE IF NOT EXISTS registration_events (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  registration_id BIGINT NOT NULL,
  event_slug VARCHAR(60) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_reg_id (registration_id),
  INDEX idx_event_slug (event_slug)
);

-- 4. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL,
  phone VARCHAR(25) NULL,
  subject VARCHAR(150) NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at)
);

-- 5. FAQ Table
CREATE TABLE IF NOT EXISTS faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_sort_order (sort_order)
);

-- 6. Gallery Items Table
CREATE TABLE IF NOT EXISTS gallery_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  src TEXT NOT NULL,
  title VARCHAR(120) NOT NULL,
  caption TEXT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_sort_order (sort_order)
);

-- 7. Schedule Timeline Items Table
CREATE TABLE IF NOT EXISTS schedule_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  day_label VARCHAR(50) NOT NULL,
  start_time VARCHAR(50) NULL,
  end_time VARCHAR(50) NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT NULL,
  venue_hint VARCHAR(120) NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_day_label (day_label),
  INDEX idx_sort_order (sort_order)
);
