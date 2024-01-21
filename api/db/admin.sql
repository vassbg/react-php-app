CREATE TABLE
  `admins` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(100) DEFAULT NULL,
    `email` varchar(100) DEFAULT NULL,
    `phone` varchar(50) DEFAULT NULL,
    `password` varchar(100) DEFAULT NULL,
    `access` int DEFAULT '3' COMMENT '1: admin, 2: read-write, 3: read',
    `theme` varchar(50) DEFAULT 'light',
    `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `blocked` int DEFAULT '0'
  )