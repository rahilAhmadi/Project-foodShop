-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 26, 2025 at 03:10 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `daspokht`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_ID` int NOT NULL AUTO_INCREMENT,
  `role_ID` int NOT NULL DEFAULT '2',
  `full_Name` varchar(100) COLLATE utf8mb3_persian_ci NOT NULL,
  `user_Name` varchar(100) COLLATE utf8mb3_persian_ci NOT NULL,
  `user_Password` varchar(255) COLLATE utf8mb3_persian_ci NOT NULL,
  `wallet_Balance` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`user_ID`),
  UNIQUE KEY `user_Name` (`user_Name`),
  KEY `fk_users_roles` (`role_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_persian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_ID`, `role_ID`, `full_Name`, `user_Name`, `user_Password`, `wallet_Balance`) VALUES
(9, 2, 'زهرا', 'zahra', 'zAhra12345', 0.00),
(6, 1, 'ادمین', 'admin', 'Admin123', 0.00),
(8, 2, 'فائزه', 'faeze', 'Faeze12345', 0.00);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
