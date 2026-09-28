CREATE DATABASE IF NOT EXISTS vocacao_polar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vocacao_polar;
CREATE TABLE IF NOT EXISTS students (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age TINYINT UNSIGNED NOT NULL,
  school VARCHAR(140) NOT NULL DEFAULT '',
  grade VARCHAR(40) NOT NULL DEFAULT '',
  primary_result VARCHAR(60) NOT NULL DEFAULT '',
  secondary_result VARCHAR(60) NOT NULL DEFAULT '',
  scores_json JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_primary_result (primary_result),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;
