-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 15, 2022 at 03:03 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sample-bank-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `transfer`
--

CREATE TABLE `transfer` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `account_holder` varchar(255) NOT NULL,
  `iban` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `note` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transfer`
--

INSERT INTO `transfer` (`id`, `uuid`, `account_holder`, `iban`, `amount`, `date`, `note`, `created_at`) VALUES
(1, '57fc56e2-a444-11ec-bcff-1094bbddf752', 'Michael A. Trujillo\r\n', 'ES9121000418450200051332', '999.99', '2022-03-15', 'Transfer for home rent', '2022-03-15 09:43:18'),
(3, '92b6e27a-a444-11ec-bcff-1094bbddf752', 'Isla Carlos', 'ES9121000418450200051332', '100.00', '2022-03-17', 'Gift contribution', '2022-03-15 09:44:56'),
(4, 'b5434446-a444-11ec-bcff-1094bbddf752', 'Maria J. Heath', 'ES9121000418450200051332', '400.00', '2022-03-18', 'Internet Recharge', '2022-03-15 09:45:54'),
(5, 'cf5e7dbe-a444-11ec-bcff-1094bbddf752', 'Don S. Ruth', 'ES9121000418450200051332', '991.00', '2022-03-21', 'Payment settlements', '2022-03-15 09:46:38'),
(7, 'c01b7ab1-40af-4571-ac34-fb3e33c117fe', 'Molestiae in omnis q', 'Magni ad ea amet mi', '11.00', '2022-03-09', 'Minima incididunt do', '2022-03-15 12:54:28'),
(8, 'a04e285f-eed5-4ce8-9a81-cc99eff43855', 'Necessitatibus paria', 'Saepe optio nesciun', '11.20', '2022-03-15', 'Ut ex sit nostrum en', '2022-03-15 13:08:40'),
(9, '73178660-1fa2-4a6f-8b1b-d379a8e0d914', 'Itaque eaque eum per', 'ES91 2100 0418 4502 0005 1332', '2232.00', '2022-03-17', 'Occaecat rerum Nam a', '2022-03-15 13:31:50'),
(10, '3d0f4bed-2287-4d04-80dc-a2db8c12370a', 'Omnis veritatis recu', 'ES91 2100 0418 4502 0005 1332', '2323.00', '2022-06-23', 'Sed blanditiis earum', '2022-03-15 13:59:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transfer`
--
ALTER TABLE `transfer`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transfer`
--
ALTER TABLE `transfer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
