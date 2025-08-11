-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2024 at 09:52 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

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
  `COMPANY` varchar(15) NOT NULL,
  `DATE_ADDED` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department_table`
--

INSERT INTO `department_table` (`DEPARTMENT_ID`, `DEPARTMENT_NAME`, `COMPANY`, `DATE_ADDED`) VALUES
(1, 'Sculpting', 'Themics', '2024-04-14'),
(2, 'Model Preparation', 'Themics', '2024-04-14'),
(3, 'Casting', 'Themics', '2024-04-14'),
(4, 'Assembly', 'Themics', '2024-04-14'),
(5, 'Detailing', 'Themics', '2024-04-14'),
(6, 'Sanding', 'Themics', '2024-04-14'),
(7, 'Metal', 'Themics', '2024-04-14'),
(8, 'Priming of Metal', 'Themics', '2024-04-14'),
(9, 'Carpentry', 'Themics', '2024-04-14'),
(10, 'Crating', 'Themics', '2024-04-14'),
(11, 'Finishing', 'Themics', '2024-04-14'),
(12, 'Packing and Loading', 'Themics', '2024-04-14'),
(13, 'Admin', 'Themics', '2024-04-14'),
(14, 'Creative', 'Themics', '2024-04-14'),
(15, 'Marketing', 'Themics', '2024-04-14'),
(16, 'Costing', 'Themics', '2024-04-14'),
(17, 'Admin', 'Lagotronics', '2024-04-14'),
(18, 'Electronics', 'Lagotronics', '2024-04-14'),
(19, 'Mechanical', 'Lagotronics', '2024-04-14'),
(20, 'Engineering', 'Lagotronics', '2024-04-14'),
(21, 'Programming', 'Lagotronics', '2024-04-14'),
(22, 'test1', 'Themics', '2024-04-14');

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
-- Table structure for table `issuance_report`
--

CREATE TABLE `issuance_report` (
  `ISSUANCE_ID` int(11) NOT NULL,
  `MRS_NUMBER` int(11) NOT NULL,
  `REQUEST_BY` varchar(200) NOT NULL,
  `DESCRIPTION` varchar(200) NOT NULL,
  `QUANTITY` int(11) NOT NULL,
  `UNIT` int(11) NOT NULL,
  `TYPE` int(11) NOT NULL,
  `PROJECT_ID` int(11) NOT NULL,
  `DEPARTMENT_ID` int(11) NOT NULL,
  `DATE` date NOT NULL,
  `ITEM_NUMBER` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `material_receive_form`
--

CREATE TABLE `material_receive_form` (
  `MRR_ID` int(11) NOT NULL,
  `PROJECT_ID` int(11) NOT NULL,
  `MRS_ID` int(11) NOT NULL,
  `QUANTITY` int(11) NOT NULL,
  `UNIT_COST` int(11) NOT NULL,
  `SUB_TOTAL` int(11) NOT NULL,
  `DATE_DELIVERED` varchar(50) NOT NULL,
  `TYPE` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `material_receive_form`
--

INSERT INTO `material_receive_form` (`MRR_ID`, `PROJECT_ID`, `MRS_ID`, `QUANTITY`, `UNIT_COST`, `SUB_TOTAL`, `DATE_DELIVERED`, `TYPE`) VALUES
(9, 2, 1, 5, 1200, 6000, '2021-08-20', ''),
(10, 2, 2, 10, 163, 1630, '2021-08-20', ''),
(11, 2, 6, 4, 963, 3852, '2021-08-20', ''),
(12, 2, 2, 1, 0, 0, '2021-08-20', '');

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
  `UNIT` varchar(50) NOT NULL,
  `TYPE` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `material_request_form`
--

INSERT INTO `material_request_form` (`MRS_ID`, `MRS_NUMBER`, `REQUEST_BY`, `PROJECT_ID`, `DEPARTMENT_ID`, `DATE`, `ITEM_NUMBER`, `DESCRIPTION`, `QUANTITY`, `UNIT`, `TYPE`) VALUES
(1, '1', '', 1, 17, '2021-08-06', 1, 'test', 1, 'aa', ''),
(2, '22', '', 4, 19, '2021-08-06', 1, 'kkk', 1, 'uuu', ''),
(3, '22', '', 4, 19, '2021-08-06', 2, '777', 1, '55', ''),
(4, '22', '', 4, 19, '2021-08-06', 3, '5', 1, '6', ''),
(5, '22', '', 4, 19, '2021-08-06', 4, '7', 1, '5', ''),
(6, '33', '', 2, 18, '2021-08-06', 1, 'ddda', 3, 'aaa', ''),
(7, '33', '', 2, 18, '2021-08-06', 2, 'ssss', 3, 'zzz', ''),
(8, '44', '', 1, 1, '2021-08-06', 1, 'test 1 ', 1, 'te', ''),
(9, '55', '', 1, 1, '2021-08-06', 2, 'test 2 ', 1, 'tea', ''),
(10, '66', '', 1, 1, '2021-08-06', 3, 'test 6', 1, 'test 4', ''),
(11, '77', '', 1, 18, '2021-08-11', 1, 'shion', 4, 'aaa', ''),
(12, '88', 'Haachama', 1, 18, '2021-08-19', 1, 'Waffle', 4, 'PCS', ''),
(13, '88', 'Haachama', 1, 18, '2021-08-19', 2, 'Crab', 1, 'km', ''),
(14, '99', 'Suisei', 2, 18, '2021-08-20', 1, 'keyboard', 1, 'pcs', '');

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
  `END_DATE` date NOT NULL,
  `DATE_ADDED` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project_table`
--

INSERT INTO `project_table` (`PROJECT_ID`, `CODE`, `CLIENT`, `PARK`, `COUNTRY`, `PROJECT_NAME`, `START_DATE`, `END_DATE`, `DATE_ADDED`) VALUES
(1, 'TPI 00001', '', '', '', 'Pelican', '2021-08-05', '0000-00-00', '2024-04-14'),
(2, 'TPI 00002', '', '', '', 'Santa\'s Village Brace Bridge', '2021-08-05', '0000-00-00', '2024-04-14'),
(3, 'TPI 00003', '', '', '', 'IAPPA Show', '2021-08-05', '0000-00-00', '2024-04-14'),
(4, 'TPI 00006', '', '', '', 'Babyland Amiland Pteranodon and Signage', '2021-08-05', '0000-00-00', '2024-04-14'),
(5, '000', '', '', '', 'hhh', '2024-04-14', '2024-04-26', '2024-04-14');

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
  `SUPPLIER` varchar(100) NOT NULL,
  `STATUS` varchar(50) NOT NULL,
  `DATE_DELIVERED` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchasing_table`
--

INSERT INTO `purchasing_table` (`PURCHASING_ID`, `DATE_REQUEST`, `PRS_NUMBER`, `MRS_ID`, `PROJECT_ID`, `UNIT_PRICE`, `TOTAL_PRICE`, `SUPPLIER`, `STATUS`, `DATE_DELIVERED`) VALUES
(2, '2021-08-13', 369, 2, 4, 6, 6, 'SM', 'PENDING FOR APPROVAL', 'NOT DELIVERED'),
(3, '2021-08-13', 369, 3, 4, 7, 7, '0', 'PENDING FOR PURCHASING', 'NOT DELIVERED'),
(4, '2021-08-13', 369, 4, 4, 0, 0, '0', 'PENDING FOR APPROVAL', 'NOT DELIVERED'),
(5, '2021-08-13', 369, 5, 4, 0, 0, '0', 'PENDING FOR APPROVAL', 'NOT DELIVERED'),
(6, '2021-08-19', 11, 12, 1, 3, 12, 'PC Config', 'DELIVERED', '2021-08-19'),
(7, '2021-08-19', 11, 13, 1, 4, 4, 'SM', 'DELIVERED', '2021-08-19');

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
(4, 'Purchasing', 'pUrch@sing*2021', 'purchasing'),
(5, 'test', 'test', 'purchasing');

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
-- Indexes for table `issuance_report`
--
ALTER TABLE `issuance_report`
  ADD PRIMARY KEY (`ISSUANCE_ID`);

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
  MODIFY `DEPARTMENT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `inventory_table`
--
ALTER TABLE `inventory_table`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1138;

--
-- AUTO_INCREMENT for table `issuance_report`
--
ALTER TABLE `issuance_report`
  MODIFY `ISSUANCE_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `material_receive_form`
--
ALTER TABLE `material_receive_form`
  MODIFY `MRR_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `material_request_form`
--
ALTER TABLE `material_request_form`
  MODIFY `MRS_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `project_table`
--
ALTER TABLE `project_table`
  MODIFY `PROJECT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `purchasing_table`
--
ALTER TABLE `purchasing_table`
  MODIFY `PURCHASING_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `USER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
