-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2021 at 10:21 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `inventory_table`
--

CREATE TABLE `inventory_table` (
  `ID` int(11) NOT NULL,
  `ITEM_NAME` varchar(100) NOT NULL,
  `QUANTITY` int(11) NOT NULL,
  `REMARKS` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inventory_table`
--

INSERT INTO `inventory_table` (`ID`, `ITEM_NAME`, `QUANTITY`, `REMARKS`) VALUES
(11, 'TEST', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `material_receive_form`
--

CREATE TABLE `material_receive_form` (
  `MRS_ID` int(11) NOT NULL,
  `MRS_NUMBER` int(11) NOT NULL,
  `PROJECT_NUMBER` int(11) NOT NULL,
  `PROJECT_NAME` varchar(100) NOT NULL,
  `DEPARTMENT` varchar(50) NOT NULL,
  `DATE` varchar(50) NOT NULL,
  `ITEM_NUMBER` int(11) NOT NULL,
  `DESCRIPTION` varchar(150) NOT NULL,
  `QUANTITY` int(11) NOT NULL,
  `UNIT` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inventory_table`
--
ALTER TABLE `inventory_table`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `material_receive_form`
--
ALTER TABLE `material_receive_form`
  ADD PRIMARY KEY (`MRS_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inventory_table`
--
ALTER TABLE `inventory_table`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `material_receive_form`
--
ALTER TABLE `material_receive_form`
  MODIFY `MRS_ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
