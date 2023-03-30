-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2023 at 04:40 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopping-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `Order-Id` int(11) NOT NULL,
  `Date_Issued` date NOT NULL,
  `Date_Received` date NOT NULL,
  `Total_Price` decimal(10,0) NOT NULL,
  `Payment Code` varchar(6) NOT NULL,
  `User-Id` varchar(6) NOT NULL,
  `Trip-Id` varchar(6) NOT NULL,
  `Receipt-Id` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(8) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `price` double(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `code`, `image`, `price`) VALUES
(1, 'Laptop', 'laptop1', 'http://localhost/630_Project/Assets/laptopresized.jpeg', 1200.00),
(2, 'Cell phone', 'cellphone1', 'http://localhost/630_Project/Assets/cell.jpg', 600.00),
(3, 'Desktop', 'desktop1', 'http://localhost/630_Project/Assets/desktop.jpg', 300.00),
(4, 'Tablet', 'tablet1', 'http://localhost/630_Project/Assets/tabletresized.jpg', 800.00);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `ReviewId` varchar(6) NOT NULL,
  `UserId` varchar(6) NOT NULL,
  `RNService` int(11) NOT NULL,
  `RNItem` int(11) NOT NULL,
  `Review` varchar(150) NOT NULL,
  `Services` text NOT NULL,
  `Item` text NOT NULL,
  `dateofrev` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`ReviewId`, `UserId`, `RNService`, `RNItem`, `Review`, `Services`, `Item`, `dateofrev`) VALUES
('RE-000', 'U00001', 4, 4, 'Cell Phone was delivered Fast!', 'Delivery', 'Cell Phone', '2023-03-26'),
('RE-001', 'U00001', 1, 5, 'Laptop is great but it took forever to come \r\n🤬', 'Delivery', 'Desktop', '2023-03-26'),
('RE-002', 'U00001', 3, 3, 'regregr', 'Delivery', 'Cell Phone', '2023-03-27'),
('RE-003', 'U00001', 5, 5, 'Great Item', 'Delivery', 'Desktop', '2023-03-27'),
('RE-004', 'U00001', 3, 3, 'hfyjfj', 'Delivery', 'Cell Phone', '2023-03-27');

-- --------------------------------------------------------

--
-- Table structure for table `trip`
--

CREATE TABLE `trip` (
  `Trip-Id` varchar(6) NOT NULL,
  `Source-Code` varchar(3) NOT NULL,
  `Destination-Code` varchar(3) NOT NULL,
  `Distance` double NOT NULL,
  `Truck-Id` varchar(7) NOT NULL,
  `Price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `truck`
--

CREATE TABLE `truck` (
  `Truck-Id` varchar(7) NOT NULL,
  `Truck-Code` varchar(7) NOT NULL,
  `Availability` text NOT NULL,
  `Code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `User-Id` varchar(20) NOT NULL,
  `Name` text NOT NULL,
  `Phone` int(10) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Address` varchar(50) NOT NULL,
  `City-Code` varchar(3) NOT NULL,
  `Login-Id` varchar(14) NOT NULL,
  `Password` varchar(16) NOT NULL,
  `Balance` decimal(6,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`User-Id`, `Name`, `Phone`, `Email`, `Address`, `City-Code`, `Login-Id`, `Password`, `Balance`) VALUES
('', 'zay', 0, 'icampbell8@live.ca', '', '', '', '$2y$10$KG6F470Gd', '0'),
('U00001', 'Nemo', 2147483647, 'nemo@gmail.com', '7567 Coral Way', 'SEA', 'ClownFish', 'DontTouchTheBoat', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Order-Id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_code` (`code`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`ReviewId`);

--
-- Indexes for table `trip`
--
ALTER TABLE `trip`
  ADD PRIMARY KEY (`Trip-Id`),
  ADD KEY `Truck-Id` (`Truck-Id`);

--
-- Indexes for table `truck`
--
ALTER TABLE `truck`
  ADD PRIMARY KEY (`Truck-Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User-Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `trip`
--
ALTER TABLE `trip`
  ADD CONSTRAINT `trip_ibfk_1` FOREIGN KEY (`Truck-Id`) REFERENCES `truck` (`Truck-Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
