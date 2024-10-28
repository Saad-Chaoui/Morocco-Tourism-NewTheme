-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2024 at 11:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tourism_db2`
--

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `attitude` varchar(255) DEFAULT NULL,
  `has_beach` tinyint(1) DEFAULT NULL,
  `population` int(11) DEFAULT NULL,
  `area` float DEFAULT NULL,
  `altitude` float DEFAULT NULL,
  `tourism_rating` float DEFAULT NULL,
  `timezone` varchar(50) DEFAULT NULL,
  `region_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `description`, `attitude`, `has_beach`, `population`, `area`, `altitude`, `tourism_rating`, `timezone`, `region_id`) VALUES
(1, 'Tangier', NULL, 'coastal', 1, 947952, 117, 0, 4.5, 'GMT+1', 1),
(2, 'Tétouan', NULL, 'coastal', 1, 380787, 102, 0, 4.2, 'GMT+1', 1),
(3, 'Fès', NULL, 'historical', 0, 1112072, 130, 0, 4.8, 'GMT+1', 3),
(4, 'Meknès', NULL, 'historical', 0, 632079, 98, 0, 4.3, 'GMT+1', 3),
(5, 'Rabat', NULL, 'historical', 1, 577827, 117, 0, 4.7, 'GMT+1', 4),
(6, 'Casablanca', NULL, 'urban', 1, 3359818, 220, 0, 4.9, 'GMT+1', 6),
(7, 'Marrakech', NULL, 'historical', 0, 928850, 118, 0, 5, 'GMT+1', 7),
(8, 'Agadir', NULL, 'coastal', 1, 421844, 85, 0, 4.6, 'GMT+1', 9),
(9, 'Oujda', NULL, 'flat', 0, 500000, 100, 500, 3.8, 'GMT+1', 2),
(10, 'Taroudant', NULL, 'flat', 0, 200000, 250, 200, 4.1, 'GMT+1', 9),
(11, 'Errachidia', NULL, 'mountainous', 0, 120000, 350, 1000, 3.9, 'GMT+1', 8),
(12, 'Al Hoceima', NULL, 'coastal', 1, 150000, 150, 100, 4.5, 'GMT+1', 1),
(13, 'Khenifra', NULL, 'mountainous', 0, 90000, 200, 1200, 4.2, 'GMT+1', 5),
(14, 'Settat', NULL, 'flat', 0, 180000, 300, 400, 3.6, 'GMT+1', 6),
(15, 'Nador', NULL, 'coastal', 1, 170000, 120, 50, 4.3, 'GMT+1', 2),
(16, 'Azilal', NULL, 'mountainous', 0, 80000, 500, 1600, 4, 'GMT+1', 5),
(17, 'Berkane', NULL, 'flat', 0, 90000, 250, 300, 3.7, 'GMT+1', 2),
(18, 'Essaouira', NULL, 'Coastal', 1, 78000, 160, 10, 4.5, 'GMT', 7),
(19, 'Ouarzazate', NULL, 'Desert', 0, 35000, 40, 1136, 4, 'GMT', 8),
(20, 'Agdz', NULL, 'Rural', 0, 10000, 90, 890, 3.8, 'GMT', 8),
(21, 'Tinerhir', NULL, 'Mountainous', 0, 20000, 30, 1100, 4.2, 'GMT', 8),
(22, 'Taza', NULL, 'mountainous', 0, 120000, 400, 800, 4.1, 'GMT', 3);

-- --------------------------------------------------------

--
-- Table structure for table `monuments`
--

CREATE TABLE `monuments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `creation_date` date DEFAULT NULL,
  `city_type` enum('coastal','mountainous','forest','other') DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location_x` float DEFAULT NULL,
  `location_y` float DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `video` varchar(255) DEFAULT NULL,
  `status` enum('open','closed','under_maintenance') DEFAULT NULL,
  `entry_fee` decimal(10,2) DEFAULT NULL,
  `opening_hours` varchar(255) DEFAULT NULL,
  `highlighted` tinyint(1) DEFAULT NULL,
  `historical_significance` text DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `region_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `monuments`
--

INSERT INTO `monuments` (`id`, `name`, `creation_date`, `city_type`, `description`, `location_x`, `location_y`, `images`, `video`, `status`, `entry_fee`, `opening_hours`, `highlighted`, `historical_significance`, `city_id`, `latitude`, `longitude`, `region_id`) VALUES
(1, 'Hassan II Mosque', '1993-08-30', 'coastal', 'The largest mosque in Morocco and Africa.', NULL, NULL, '[\"https://img.freepik.com/free-photo/beautiful-view-biggest-mosque-casablanca-morocco-hassan-ii-mosque_181624-61388.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\",\"https://img.freepik.com/free-photo/vertical-shot-hassan-ii-mosque-casablanca-morocco_181624-28525.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\",\"https://img.freepik.com/premium-photo/hassan-ii-mosque-casablanca-morocco_462054-729.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\"]', 'https://youtu.be/IFWo0DmvsgA?si=0XIMnIyPkjc4C3Wf', 'open', 0.00, '09:00-18:00', 1, 'An architectural marvel of the Islamic world.', 6, 33.60728300, -7.63185000, 6),
(2, 'Koutoubia Mosque', '1150-01-01', 'other', 'The largest mosque in Marrakech with stunning architecture.', NULL, NULL, '[\"https://img.freepik.com/free-photo/koutoubia-mosque-night-shining-crescent-moon-marrakesh-marocco_181624-41803.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\",\"https://img.freepik.com/free-photo/koutoubia-mosque-marrakech-sunrise_268835-3992.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\"]', 'https://youtu.be/cfD3Hc-FzQQ?si=5ZamFyAJhern6nH-', 'open', 0.00, '09:00-17:00', 1, 'A symbol of Marrakech and Islamic heritage.', 7, 31.62580200, -7.98916000, 7),
(3, 'Bab Bou Jeloud', '1913-01-01', 'other', 'A grand gate that serves as the entrance to the Fes medina.', NULL, NULL, '[\"https://image.shutterstock.com/image-photo/fez-morocco-bab-bou-jeloud-260nw-2464477733.jpg\",\"https://image.shutterstock.com/image-photo/fez-fes-morocco-detail-bab-260nw-2452968039.jpg\"]', 'https://youtu.be/FIO3qP5WSrw?si=yLbTIOzF5xddR0Dw&t=16', 'open', 0.00, '09:00-18:00', 1, 'Iconic blue gate built by the French during the Protectorate.', 3, 34.06104300, -4.97963000, 3),
(4, 'Mausoleum of Moulay Ismail', '1711-01-01', 'other', 'Historical monument in Meknes', 5.55555, -4.44444, '[\"https://image.shutterstock.com/image-photo/meknes-streets-historical-city-morocco-260nw-2422472889.jpg\", \"https://image.shutterstock.com/image-photo/moroccan-tile-detail-architecture-mausoleum-260nw-2521495009.jpg\"]', 'https://youtu.be/Rl2Hifuxnng?si=56laekrctv0gaokw', 'open', 10.00, '9:00-17:00', 1, 'Significant for Moroccan history', 4, 33.89752900, -5.55555500, 3),
(5, 'Rabat Archaeological Museum', '2014-01-01', 'other', 'Museum showcasing Moroccan heritage', 6.77778, -5.66667, '[\"image5.jpg\", \"image6.jpg\"]', 'https://youtu.be/nwF4sEdXAvU?si=AgEQ8SNqJA7hKHZ-', 'open', 5.00, '10:00-17:00', 0, 'Key for understanding Moroccan history', 5, 34.02088200, -6.84165000, 4),
(6, 'Kasbah of Ait Benhaddou', '1987-12-01', 'other', 'A UNESCO World Heritage site famous for its mud-brick architecture.', 31.0472, -7.1305, '[\"https://image.shutterstock.com/image-photo/kasbah-ait-benhaddou-morocco-glowing-260nw-344580722.jpg\", \"https://img.freepik.com/premium-photo/kasbah-ait-benhaddou-morocco_328046-42097.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\"]', 'https://youtu.be/OfNCALW5pm4?si=vYPhJOnrlq1u5Pzf', 'open', 0.00, '8:00-18:00', 1, 'A significant example of Moroccan earthen clay architecture.', 19, 31.04720000, -7.13050000, 8),
(7, 'Rabat Royal Palace', '2014-05-15', 'other', 'The official residence of the King of Morocco, featuring stunning architecture.', 34.0209, -6.8417, '[\"https://image.shutterstock.com/image-photo/royal-palace-kings-rabat-morocco-260nw-128922095.jpg\", \"https://image.shutterstock.com/image-photo/royal-palace-rabat-rabatsalezemmourzaer-morocco-260nw-692125612.jpg\"]', 'video16.mp4', 'open', 0.00, '9:00-17:00', 1, 'A symbol of royal authority and Moroccan history.', 5, 34.02090000, -6.84170000, 4),
(8, 'El Badi Palace', '1578-01-01', 'other', 'A historic palace known for its grand architecture and historical significance.', 31.6102, -7.9897, '[\"https://image.shutterstock.com/image-photo/mosaic-tiles-ruins-el-badi-260nw-2271976221.jpg\", \"https://image.shutterstock.com/image-photo/woman-ruins-el-badi-palace-260nw-2271976223.jpg\"]', 'https://youtu.be/AKLqLUj8oJ0?si=2Y4i8Wlq2l2m93tJ', 'open', 0.00, '9:00-17:00', 1, 'Originally built as a magnificent royal palace.', 7, 31.61020000, -7.98970000, 7),
(20, 'Bou Inania Madrasa', '1356-01-01', '', 'A stunning example of Marinid architecture with intricate tile work and carvings.', 34.0597, -4.9704, '[\"https://image.shutterstock.com/image-photo/madrasa-bou-inania-fes-morocco-260nw-547643338.jpg\", \"https://img.freepik.com/free-photo/closeup-shot-son-joseph-school-marrakech-morocco_181624-11513.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\"]', 'https://youtube.com/shorts/74T1PmsYoVM?si=AakQVdMIbcqRNYKp', 'open', 2.00, '9:00-18:00', 1, 'A significant religious and educational institution in Fes.', 3, 34.06444400, -4.97333300, 3),
(21, 'Al Quaraouiyine University', '0859-01-01', '', 'Recognized as the oldest existing degree-granting university in the world.', 34.0594, -4.973, '[\"image37.jpg\", \"image38.jpg\"]', 'https://youtu.be/OeDeJeCcuLc?si=0OIomLXxiYUh9ZFC', 'open', 0.00, '8:00-17:00', 1, 'An important center of knowledge and culture in the Muslim world.', 3, 34.06444400, -4.97333300, 3),
(22, 'Dar Batha Museum', '1915-01-01', '', 'A museum showcasing Moroccan arts, crafts, and artifacts in a beautiful palace.', 34.0606, -4.98272, '[\"https://image.shutterstock.com/image-photo/courtyard-dar-batha-museum-old-260nw-1236631123.jpg\", \"https://image.shutterstock.com/image-photo/vintage-door-metal-hinge-old-260nw-2115094790.jpg\"]', 'video20.mp4', 'open', 10.00, '9:00-17:30', 1, 'Housed in a former royal palace, it highlights Fes’s cultural heritage.', 3, 34.06060000, -4.98272000, 3),
(23, 'Kairaouine Mosque', '0857-01-01', '', 'One of the largest mosques in Morocco, known for its stunning architecture.', 34.0592, -4.973, '[\"image41.jpg\", \"image42.jpg\"]', 'video21.mp4', 'open', 0.00, 'all day', 1, 'A pivotal site for Islamic learning and spirituality in Fes.', 3, 34.05920000, -4.97300000, 3);

-- --------------------------------------------------------

--
-- Table structure for table `regions`
--

CREATE TABLE `regions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `tourism_rating` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `regions`
--

INSERT INTO `regions` (`id`, `name`, `description`, `tourism_rating`) VALUES
(1, 'Tanger-Tétouan-Al Hoceima', 'Northernmost region of Morocco known for its Mediterranean coast.', 4.50),
(2, 'Oriental', 'Located in the eastern part of Morocco, rich in culture and history.', 3.80),
(3, 'Fès-Meknès', 'A central region home to the ancient cities of Fès and Meknès.', 4.20),
(4, 'Rabat-Salé-Kénitra', 'Capital region with Rabat and neighboring cities.', 4.00),
(5, 'Béni Mellal-Khénifra', 'Region with a diverse landscape of mountains and plains.', 4.10),
(6, 'Casablanca-Settat', 'The economic hub of Morocco with the largest city, Casablanca.', 3.50),
(7, 'Marrakech-Safi', 'Popular tourist region famous for Marrakech and the coastal town of Safi.', 5.00),
(8, 'Drâa-Tafilalet', 'Desert region with famous oases and historical sites.', 4.30),
(9, 'Souss-Massa', 'Southern region with a mix of beaches and mountains.', 4.60),
(10, 'Guelmim-Oued Noun', 'Gateway to the Moroccan Sahara.', 3.70),
(11, 'Laâyoune-Sakia El Hamra', 'Western Sahara region with unique desert landscapes.', 3.00),
(12, 'Dakhla-Oued Ed-Dahab', 'Southernmost region known for its stunning coastline.', 4.40);

-- --------------------------------------------------------

--
-- Table structure for table `touristsites`
--

CREATE TABLE `touristsites` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `video` varchar(255) DEFAULT NULL,
  `status` enum('open','closed','under_maintenance') DEFAULT NULL,
  `entry_fee` decimal(10,2) DEFAULT NULL,
  `opening_hours` varchar(255) DEFAULT NULL,
  `accessibility` text DEFAULT NULL,
  `nearest_cities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`nearest_cities`)),
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `region_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `touristsites`
--

INSERT INTO `touristsites` (`id`, `name`, `description`, `type`, `images`, `video`, `status`, `entry_fee`, `opening_hours`, `accessibility`, `nearest_cities`, `latitude`, `longitude`, `region_id`) VALUES
(1, 'Chefchaouen', 'The blue pearl of Morocco.', 'historical', '[\"https://img.freepik.com/premium-photo/morocco-is-blue-city-chefchaouen_86390-10.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\",\"https://img.freepik.com/premium-photo/many-different-souvenirs-gifts-streets-chefchaouen_86390-3603.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\",\"https://img.freepik.com/premium-photo/beautiful-diverse-set-blue-doors-morocco_86390-67.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\"]', 'https://youtu.be/mqYw_3Oovmo?si=PFbRg8PZx0Nx1vtD', 'open', 0.00, 'all day', 'Accessible by car.', '[\"Tetouan\", \"Tangier\"]', 35.16880500, -5.26361600, 1),
(2, 'Ouzoud Waterfalls', 'Spectacular waterfalls in the Atlas Mountains.', 'natural', '[\"https://img.freepik.com/free-photo/large-waterfall_1160-755.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\",\"https://img.freepik.com/premium-photo/atlas-mountains-morocco-spectacular-waterfalls-ouzoud_572133-360.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\"]', 'https://youtu.be/SLsvT7tevw8?si=rR_40Tagz8Jqw0V7', 'open', 0.00, '09:00-19:00', 'Accessible by hiking trail.', '[\"Beni Mellal\"]', 32.01344800, -6.71735400, 5),
(3, 'Dades Gorges', 'Breathtaking gorges in the Dades Valley.', 'natural', '[\"https://img.freepik.com/free-photo/animal-habitat_23-2148167382.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\",\"https://img.freepik.com/free-photo/aerial-shot-lake-middle-desert-sunny-day_181624-14303.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\",\"https://img.freepik.com/premium-photo/rock-formations-forest_1048944-22817145.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\"]', 'https://youtu.be/G7RTB1fXGOs?si=oYGlQpQRqib5YB-q', 'open', 0.00, '00:00-23:59', 'Accessible by car.', '[\"Marrakech\"]', 31.50754800, -5.93369700, 8),
(4, 'Legzira Beach', 'Beautiful beach with natural arches.', 'beach', '[\"https://image.shutterstock.com/image-photo/sunset-red-arches-legzira-beach-260nw-450109657.jpg\", \"https://image.shutterstock.com/image-photo/landscape-legzira-beach-natural-arches-260nw-1285931611.jpg\"]', 'https://youtu.be/06sHmKNy1EE?si=dHS0tmzqgj9IQDwF', 'open', 0.00, 'all day', 'Accessible by car', '[\"Agadir\", \"Guelmim\"]', 29.43579700, -10.12572500, 10),
(5, 'Toubkal National Park', 'Home to the highest peak in North Africa.', 'mountain', '[\"https://img.freepik.com/free-photo/vertical-shot-small-waterfall-forest_181624-54748.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\", \"https://img.freepik.com/premium-photo/people-hiking-mountain-against-sky_1048944-8968354.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\"]', 'https://youtu.be/8y4-R1YVrqA?si=v344P7nmOVKtEtTA', 'open', 0.00, '6:00-18:00', 'Trekking routes available', '[\"Marrakech\"]', 31.62900000, -7.91440000, 8),
(6, 'Merzouga Dunes', 'Famous for its golden sand dunes and desert activities.', 'desert', '[\"https://image.shutterstock.com/image-photo/merzouga-29-january-2024-moroccan-260nw-2494455285.jpg\", \"https://img.freepik.com/premium-photo/four-people-are-walking-through-sand-dunes_1034575-64829.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\"]', 'https://youtu.be/ErBC2qPK68w?si=exOYkR6LlJo_JmNl', 'open', 0.00, 'all day', 'Guided tours available', '[\"Errachidia\"]', 31.10000000, -4.00000000, 8),
(16, 'Ifrane National Park', 'Famous for its Swiss-like architecture and cedar forests.', 'mountain', '[\"https://img.freepik.com/premium-photo/group-people-rock-formation_1048944-4212065.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\", \"https://img.freepik.com/premium-photo/rugged-boulders-valley-with-river-smith-rock-state-park-aerial-view_501731-21328.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\"]', 'https://youtu.be/ZnlBtJfJ69w?si=9O8j-foTk9b_loTQ', 'open', 0.00, '8:00-18:00', 'Trekking routes available', '[\"Ifrane\"]', 33.55620000, -5.23760000, 6),
(17, 'Paradise Valley', 'A stunning valley with natural pools and lush vegetation.', 'valley', '[\"https://image.shutterstock.com/image-photo/camelback-mountain-high-quality-aerial-260nw-2325262469.jpg\", \"https://image.shutterstock.com/image-photo/paradise-valley-name-given-part-260nw-1764974117.jpg\"]', 'https://youtu.be/zRwqoCg43OQ?si=9vT5dw3zpIuuaLby', 'open', 0.00, 'all day', 'Accessible by car', '[\"Agadir\"]', 30.47800000, -9.39750000, 10),
(18, 'Oukaïmeden Ski Resort', 'The highest ski resort in North Africa, popular for winter sports.', 'mountain', '[\"https://image.shutterstock.com/image-photo/sky-resort-near-toubkal-atlas-260nw-1417437422.jpg\", \"https://image.shutterstock.com/image-photo/berber-village-high-atlas-mountains-260nw-2363289839.jpg\"]', 'https://youtu.be/gYt8NB_Qzyk?si=VBmqGitDyBgP2A0k', 'open', 10.00, '9:00-17:00', 'Ski lifts available', '[\"Marrakech\"]', 31.20520000, -7.86210000, 8),
(19, 'Ait Bouguemez Valley', 'A picturesque valley known for its beautiful landscapes and traditional Berber villages.', 'valley', '[\"https://img.freepik.com/free-photo/devils-bridge-sedona-arizona_181624-11711.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\", \"https://img.freepik.com/premium-photo/scenic-view-rocky-mountains-desert_1048944-2022587.jpg?ga=GA1.1.1611073728.1728558743&semt=ais_hybrid\"]', 'https://youtu.be/QQ1OKc5itTs?si=vTeWzmFH1E4qHg_u', 'open', 0.00, 'all day', 'Accessible by 4x4', '[\"Beni Mellal\"]', 31.66111000, -6.44375000, 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `region_id` (`region_id`);

--
-- Indexes for table `monuments`
--
ALTER TABLE `monuments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `city_id` (`city_id`),
  ADD KEY `region_id` (`region_id`),
  ADD KEY `region_id_2` (`region_id`);

--
-- Indexes for table `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `touristsites`
--
ALTER TABLE `touristsites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `region_id` (`region_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `monuments`
--
ALTER TABLE `monuments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `regions`
--
ALTER TABLE `regions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `touristsites`
--
ALTER TABLE `touristsites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`);

--
-- Constraints for table `monuments`
--
ALTER TABLE `monuments`
  ADD CONSTRAINT `fk_region` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `monuments_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`);

--
-- Constraints for table `touristsites`
--
ALTER TABLE `touristsites`
  ADD CONSTRAINT `touristsites_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
