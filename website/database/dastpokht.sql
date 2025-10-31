-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 31, 2025 at 12:37 PM
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
-- Database: `dastpokht`
--

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `role_ID` int NOT NULL AUTO_INCREMENT,
  `role_Name` varchar(50) COLLATE utf8mb3_persian_ci NOT NULL,
  PRIMARY KEY (`role_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_persian_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_ID`, `role_Name`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_ID` int NOT NULL AUTO_INCREMENT,
  `role_ID` int NOT NULL,
  `full_Name` varchar(100) COLLATE utf8mb3_persian_ci NOT NULL,
  `user_Name` varchar(100) COLLATE utf8mb3_persian_ci NOT NULL,
  `user_Password` varchar(255) COLLATE utf8mb3_persian_ci NOT NULL,
  `wallet_Balance` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`user_ID`),
  UNIQUE KEY `user_ID` (`full_Name`),
  KEY `fk_users_roles` (`role_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_persian_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
