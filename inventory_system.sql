-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2021 at 08:31 AM
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
-- Table structure for table `department_table`
--

CREATE TABLE `department_table` (
  `DEPARTMENT_ID` int(11) NOT NULL,
  `DEPARTMENT_NAME` varchar(50) NOT NULL,
  `COMPANY` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department_table`
--

INSERT INTO `department_table` (`DEPARTMENT_ID`, `DEPARTMENT_NAME`, `COMPANY`) VALUES
(1, 'Sculpting', 'Themics'),
(2, 'Model Preparation', 'Themics'),
(3, 'Casting', 'Themics'),
(4, 'Assembly', 'Themics'),
(5, 'Detailing', 'Themics'),
(6, 'Sanding', 'Themics'),
(7, 'Metal', 'Themics'),
(8, 'Priming of Metal', 'Themics'),
(9, 'Carpentry', 'Themics'),
(10, 'Crating', 'Themics'),
(11, 'Finishing', 'Themics'),
(12, 'Packing and Loading', 'Themics'),
(13, 'Admin', 'Themics'),
(14, 'Creative', 'Themics'),
(15, 'Marketing', 'Themics'),
(16, 'Costing', 'Themics'),
(17, 'Admin', 'Lagotronics'),
(18, 'Electronics', 'Lagotronics'),
(19, 'Mechanical', 'Lagotronics'),
(20, 'Engineering', 'Lagotronics'),
(21, 'Programming', 'Lagotronics');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_table`
--

CREATE TABLE `inventory_table` (
  `ID` int(11) NOT NULL,
  `ITEM_NAME` varchar(100) NOT NULL,
  `TYPE` varchar(20) NOT NULL,
  `QUANTITY` int(11) NOT NULL,
  `UOM` varchar(10) NOT NULL,
  `UNIT_PRICE` int(11) NOT NULL,
  `TOTAL` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inventory_table`
--

INSERT INTO `inventory_table` (`ID`, `ITEM_NAME`, `TYPE`, `QUANTITY`, `UOM`, `UNIT_PRICE`, `TOTAL`) VALUES
(11, 'TEST', 'Materials', 4, '', 0, 0),
(232, 'asq', '', 2, '', 0, 0),
(1114, 'asdsa', 'a', 3, 'asdsd', 2, 0),
(1121, 'asd', 'Materials', 2, 'fff', 3, 6),
(1122, 'aaa', 'Materials', 2, 's', 2, 4),
(1123, 'ddd', 'Tools', 1, 'asdasd', 0, 0),
(1124, 'zzz', 'Tools', 3, 'sa', 3, 9),
(1125, 'llll', 'Tools', 1, '888', 0, 0),
(1126, 'jjj', 'Materials', 69, 'yy', 5, 345),
(1127, '456456', 'Tools', 1, '54', 6, 6),
(1128, 'kkk', 'Materials', 3, 'uuu', 3, 9),
(1129, 'yyyy', 'Materials', 2, 'yyy', 1, 2),
(1130, 'yyyy', 'Materials', 2, 'yyy', 1, 2),
(1131, 'yyyy', 'Materials', 2, 'yyy', 1, 2),
(1132, 'yyyy', 'Materials', 2, 'yyy', 1, 2),
(1133, 'yyyy', 'Materials', 2, 'yyy', 1, 2),
(1134, 'aaaa', 'Tools', 1, 'dd', 1, 1),
(1135, 'vvv', 'Tools', 3, 'xx', 2, 6),
(1136, 'cxz', 'Tools', 3, 'aa', 2, 6),
(1137, 'qwe', 'Materials', 1, 'ww', 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `material_receive_form`
--

CREATE TABLE `material_receive_form` (
  `MRR_ID` int(11) NOT NULL,
  `PROJECT_ID` int(11) NOT NULL,
  `ITEM_NUMBER` int(11) NOT NULL,
  `MRS_NUMBER` int(11) NOT NULL,
  `DESCRIPTION` varchar(50) NOT NULL,
  `QUANTITY` int(11) NOT NULL,
  `UNITS` varchar(50) NOT NULL,
  `UNIT_COST` int(11) NOT NULL,
  `SUB_TOTAL` int(11) NOT NULL,
  `PREPARED_BY` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `material_request_form`
--

CREATE TABLE `material_request_form` (
  `MRS_ID` int(11) NOT NULL,
  `MRS_NUMBER` varchar(50) NOT NULL,
  `REQUEST_BY` varchar(50) NOT NULL,
  `PROJECT_ID` int(11) NOT NULL,
  `DEPARTMENT_ID` int(11) NOT NULL,
  `DATE` varchar(50) NOT NULL,
  `ITEM_NUMBER` int(11) NOT NULL,
  `DESCRIPTION` varchar(150) NOT NULL,
  `QUANTITY` int(11) NOT NULL,
  `UNIT` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `material_request_form`
--

INSERT INTO `material_request_form` (`MRS_ID`, `MRS_NUMBER`, `REQUEST_BY`, `PROJECT_ID`, `DEPARTMENT_ID`, `DATE`, `ITEM_NUMBER`, `DESCRIPTION`, `QUANTITY`, `UNIT`) VALUES
(1, '1', '', 1, 17, '2021-08-06', 1, 'test', 1, 'aa'),
(2, '22', '', 4, 19, '2021-08-06', 1, 'kkk', 1, 'uuu'),
(3, '22', '', 4, 19, '2021-08-06', 2, '777', 1, '55'),
(4, '22', '', 4, 19, '2021-08-06', 3, '5', 1, '6'),
(5, '22', '', 4, 19, '2021-08-06', 4, '7', 1, '5'),
(6, '33', '', 2, 18, '2021-08-06', 1, 'ddda', 3, 'aaa'),
(7, '33', '', 2, 18, '2021-08-06', 2, 'ssss', 3, 'zzz'),
(8, '44', '', 1, 1, '2021-08-06', 1, 'test 1 ', 1, 'te'),
(9, '55', '', 1, 1, '2021-08-06', 2, 'test 2 ', 1, 'tea'),
(10, '66', '', 1, 1, '2021-08-06', 3, 'test 6', 1, 'test 4'),
(11, '77', '', 1, 18, '2021-08-11', 1, 'shion', 4, 'aaa');

-- --------------------------------------------------------

--
-- Table structure for table `project_table`
--

CREATE TABLE `project_table` (
  `PROJECT_ID` int(11) NOT NULL,
  `CODE` varchar(50) NOT NULL,
  `CLIENT` varchar(50) NOT NULL,
  `PARK` varchar(50) NOT NULL,
  `COUNTRY` varchar(50) NOT NULL,
  `PROJECT_NAME` varchar(100) NOT NULL,
  `START_DATE` date NOT NULL,
  `END_DATE` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project_table`
--

INSERT INTO `project_table` (`PROJECT_ID`, `CODE`, `CLIENT`, `PARK`, `COUNTRY`, `PROJECT_NAME`, `START_DATE`, `END_DATE`) VALUES
(1, 'TPI 00001', '', '', '', 'Pelican', '2021-08-05', '0000-00-00'),
(2, 'TPI 00002', '', '', '', 'Santa\'s Village Brace Bridge', '2021-08-05', '0000-00-00'),
(3, 'TPI 00003', '', '', '', 'IAPPA Show', '2021-08-05', '0000-00-00'),
(4, 'TPI 00006', '', '', '', 'Babyland Amiland Pteranodon and Signage', '2021-08-05', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `purchasing_table`
--

CREATE TABLE `purchasing_table` (
  `PURCHASING_ID` int(11) NOT NULL,
  `DATE_REQUEST` varchar(50) NOT NULL,
  `PRS_NUMBER` int(11) NOT NULL,
  `MRS_ID` int(11) NOT NULL,
  `PROJECT_ID` int(11) NOT NULL,
  `UNIT_PRICE` int(11) NOT NULL,
  `TOTAL_PRICE` int(11) NOT NULL,
  `SUPPLIER` int(11) NOT NULL,
  `STATUS` varchar(50) NOT NULL,
  `DATE_DELIVERED` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchasing_table`
--

INSERT INTO `purchasing_table` (`PURCHASING_ID`, `DATE_REQUEST`, `PRS_NUMBER`, `MRS_ID`, `PROJECT_ID`, `UNIT_PRICE`, `TOTAL_PRICE`, `SUPPLIER`, `STATUS`, `DATE_DELIVERED`) VALUES
(2, '2021-08-13', 369, 2, 4, 0, 0, 0, 'PENDING FOR APPROVAL', ''),
(3, '2021-08-13', 369, 3, 4, 0, 0, 0, 'PENDING FOR APPROVAL', ''),
(4, '2021-08-13', 369, 4, 4, 0, 0, 0, 'PENDING FOR APPROVAL', ''),
(5, '2021-08-13', 369, 5, 4, 0, 0, 0, 'PENDING FOR APPROVAL', '');

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `USER_ID` int(11) NOT NULL,
  `USERNAME` varchar(50) NOT NULL,
  `PASSWORD` varchar(50) NOT NULL,
  `DEPARTMENT` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`USER_ID`, `USERNAME`, `PASSWORD`, `DEPARTMENT`) VALUES
(1, 'SdtAdmin', 'sdt*2021', 'sdt'),
(2, 'Admin', 'l@goTronics*2021', 'admin'),
(3, 'Warehouse', 'w@reh0usE*2021', 'warehouse'),
(4, 'Purchasing', 'pUrch@sing*2021', 'purchasing');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department_table`
--
ALTER TABLE `department_table`
  ADD PRIMARY KEY (`DEPARTMENT_ID`);

--
-- Indexes for table `inventory_table`
--
ALTER TABLE `inventory_table`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `material_receive_form`
--
ALTER TABLE `material_receive_form`
  ADD PRIMARY KEY (`MRR_ID`);

--
-- Indexes for table `material_request_form`
--
ALTER TABLE `material_request_form`
  ADD PRIMARY KEY (`MRS_ID`);

--
-- Indexes for table `project_table`
--
ALTER TABLE `project_table`
  ADD PRIMARY KEY (`PROJECT_ID`);

--
-- Indexes for table `purchasing_table`
--
ALTER TABLE `purchasing_table`
  ADD PRIMARY KEY (`PURCHASING_ID`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`USER_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department_table`
--
ALTER TABLE `department_table`
  MODIFY `DEPARTMENT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `inventory_table`
--
ALTER TABLE `inventory_table`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1138;

--
-- AUTO_INCREMENT for table `material_receive_form`
--
ALTER TABLE `material_receive_form`
  MODIFY `MRR_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `material_request_form`
--
ALTER TABLE `material_request_form`
  MODIFY `MRS_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `project_table`
--
ALTER TABLE `project_table`
  MODIFY `PROJECT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `purchasing_table`
--
ALTER TABLE `purchasing_table`
  MODIFY `PURCHASING_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `USER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
