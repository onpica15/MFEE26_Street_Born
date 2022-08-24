-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-08-23 10:36:50
-- 伺服器版本： 10.4.24-MariaDB
-- PHP 版本： 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `fteampro`
--

-- --------------------------------------------------------

--
-- 資料表結構 `admin`
--

CREATE TABLE `admin` (
  `sid` int(11) NOT NULL,
  `ad_name` varchar(255) NOT NULL,
  `ad_account` varchar(255) NOT NULL,
  `ad_password` varchar(255) NOT NULL,
  `ad_email` varchar(255) NOT NULL,
  `ad_avatar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `admin`
--

INSERT INTO `admin` (`sid`, `ad_name`, `ad_account`, `ad_password`, `ad_email`, `ad_avatar`) VALUES
(1, 'Admin', 'admin', 'admin', '26fteam@gmail.com', 'User_icon_2.svg.png');

-- --------------------------------------------------------

--
-- 資料表結構 `carts`
--

CREATE TABLE `carts` (
  `sid` int(11) NOT NULL,
  `item_id` varchar(255) NOT NULL,
  `item_type` varchar(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `item_price` int(255) NOT NULL,
  `member_id` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `carts`
--

INSERT INTO `carts` (`sid`, `item_id`, `item_type`, `quantity`, `item_price`, `member_id`, `created_at`) VALUES
(295, '2', 'product', 1, 6300, '1561', '2022-08-18 22:00:53'),
(296, '1', 'product', 1, 6800, '1561', '2022-08-18 22:00:55'),
(297, '3', 'product', 1, 7400, '1561', '2022-08-18 22:00:57'),
(298, '4', 'product', 1, 7499, '1561', '2022-08-18 22:00:59'),
(299, '5', 'product', 1, 7499, '1561', '2022-08-18 22:01:01');

-- --------------------------------------------------------

--
-- 資料表結構 `category`
--

CREATE TABLE `category` (
  `sid` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `parent_sid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `category`
--

INSERT INTO `category` (`sid`, `name`, `parent_sid`) VALUES
(1, '滑板', 0),
(2, '技術板', 1),
(3, '長板/交通板', 1),
(4, '板身', 1),
(5, '輪架', 1),
(6, '輪子', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `custom`
--

CREATE TABLE `custom` (
  `sid` int(11) NOT NULL,
  `member_id` varchar(255) DEFAULT NULL,
  `custom_product_name` varchar(255) DEFAULT NULL,
  `wheel_style` varchar(255) DEFAULT NULL,
  `carrier` varchar(255) DEFAULT NULL,
  `front_color` varchar(255) DEFAULT NULL,
  `back_style` varchar(255) DEFAULT NULL,
  `back_pattern` varchar(255) DEFAULT NULL,
  `back_color` varchar(255) DEFAULT NULL,
  `back_text` varchar(255) DEFAULT NULL,
  `back_sticker` varchar(255) DEFAULT NULL,
  `back_img` longtext DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `custom`
--

INSERT INTO `custom` (`sid`, `member_id`, `custom_product_name`, `wheel_style`, `carrier`, `front_color`, `back_style`, `back_pattern`, `back_color`, `back_text`, `back_sticker`, `back_img`, `price`, `created_date`) VALUES
(1, '1590', '小鳴人', 'PurpleStart', '2', '#ffffff', 'style_01', 'Startwave', '#123456', '小鳴鳴', 'skew', 'cus673db2e4-9276-44b7-b08c-81fff1b4edfa.png', '3780', '2022-08-18 15:25:17'),
(2, '1582', '旋轉', 'PinkWave', 'copper', '#970707', 'style_01', 'Startwave', '#ffaf7a', 'Fire!', 'waves', 'cus39e942a6-3991-4360-8eb6-06448d777610.png', '4680', '2022-08-18 14:16:01'),
(3, '1583', 'SAKURA', 'PinkWave', 'copper', '#f59494', 'style_03', 'Triangles', '#ffd6de', 'SAKURA', 'Waves', 'cusc212ed09-8a94-4427-990a-e64930fadcb5.png', '4780', '2022-08-18 14:18:23'),
(4, '1585', 'YEAH', 'NeonGreen', 'iron', '#2c8775', 'style_04', 'Startwave', '#123456', 'YEAH', 'skew', 'cuseb25706e-d7cb-4b6c-b7fc-999ac37488c0.png', '3680', '2022-08-18 14:22:20'),
(5, '1584', 'Cool', 'PurpleStart', 'black', '#20602a', 'style_02', 'Disturb', '#1a1f23', 'Cool', 'Dot', 'cusb9762136-6c3f-46c7-aab9-ab0948a368a2.png', '4380', '2022-08-18 14:23:43'),
(6, '1586', 'FREE STYLE', 'BlackBlue', 'iron', '#c3b241', 'style_04', 'Triangles', '#7bff61', 'FREE', 'skew', 'cus6d6b18e7-dd47-4b9a-83c9-a0491f278ace.png', '4980', '2022-08-18 14:25:44'),
(7, '1587', 'SMILE', 'BlackBlue', 'black', '#66aee5', 'style_03', 'Parallel', '#66bdff', 'SMILE', 'Dot', 'cus31469f29-3fc5-49e6-840c-f51cb1362759.png', '4880', '2022-08-18 14:27:56');

-- --------------------------------------------------------

--
-- 資料表結構 `cus_chat`
--

CREATE TABLE `cus_chat` (
  `sid` int(11) NOT NULL,
  `room` text NOT NULL,
  `author` text NOT NULL,
  `avatar` text NOT NULL,
  `msg` text NOT NULL,
  `time` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `cus_chat`
--

INSERT INTO `cus_chat` (`sid`, `room`, `author`, `avatar`, `msg`, `time`) VALUES
(2, '1560', 'mary', 'http://localhost:3000/avatar/abbc13e2-61fd-47c9-9dd5-49719ac9a0ce.jpg', 'asd', '23:54'),
(3, '1560', 'mary', 'http://localhost:3000/avatar/abbc13e2-61fd-47c9-9dd5-49719ac9a0ce.jpg', '123', '23:55'),
(26, '1560', 'mary', 'http://localhost:3000/avatar/abbc13e2-61fd-47c9-9dd5-49719ac9a0ce.jpg', 'xsdsadf', '14:2'),
(41, '1560', 'mary', 'http://localhost:3000/avatar/abbc13e2-61fd-47c9-9dd5-49719ac9a0ce.jpg', 'hey', '15:16'),
(42, '1560', 'mary', 'http://localhost:3000/avatar/abbc13e2-61fd-47c9-9dd5-49719ac9a0ce.jpg', 'dsf', '17:51'),
(43, '1560', 'admin', 'http://localhost:3000/avatar/c388d38d-a162-4910-958b-3d6ea44dff11.jpg', 'dsa', '17:51'),
(44, '1560', 'mary', 'http://localhost:3000/avatar/abbc13e2-61fd-47c9-9dd5-49719ac9a0ce.jpg', 'hello', '20:16'),
(45, '1560', 'mary', 'http://localhost:3000/avatar/abbc13e2-61fd-47c9-9dd5-49719ac9a0ce.jpg', 'hu3', '21:57'),
(46, '1561', 'anny', 'http://localhost:3000/avatar/2c086d5e-b8d9-4f6f-af4c-2ac20b8503f2.jpg', 'Hello', '22:8'),
(47, '1560', 'admin', 'http://localhost:3000/avatar/c388d38d-a162-4910-958b-3d6ea44dff11.jpg', '123', '22:44'),
(48, '1560', 'admin', 'http://localhost:3000/avatar/c388d38d-a162-4910-958b-3d6ea44dff11.jpg', '123', '22:46'),
(49, '1560', 'admin', 'http://localhost:3000/avatar/c388d38d-a162-4910-958b-3d6ea44dff11.jpg', '123', '22:50'),
(50, '1560', 'mary', 'http://localhost:3000/avatar/abbc13e2-61fd-47c9-9dd5-49719ac9a0ce.jpg', '123', '22:51'),
(51, '1561', 'admin', 'http://localhost:3000/avatar/c388d38d-a162-4910-958b-3d6ea44dff11.jpg', 'yoyoyo', '22:59'),
(52, '1560', 'mary', 'http://localhost:3000/avatar/abbc13e2-61fd-47c9-9dd5-49719ac9a0ce.jpg', 'hi', '23:0'),
(53, '1560', 'mary', 'http://localhost:3000/avatar/abbc13e2-61fd-47c9-9dd5-49719ac9a0ce.jpg', '123', '23:1'),
(54, '1560', 'admin', 'http://localhost:3000/avatar/c388d38d-a162-4910-958b-3d6ea44dff11.jpg', 'qwe', '23:2'),
(55, '1560', 'admin', 'http://localhost:3000/avatar/c388d38d-a162-4910-958b-3d6ea44dff11.jpg', 'asd', '23:2'),
(56, '1560', 'admin', 'http://localhost:3000/avatar/c388d38d-a162-4910-958b-3d6ea44dff11.jpg', 'hey mary what\'s up', '23:6'),
(57, '1560', 'mary', 'http://localhost:3000/avatar/abbc13e2-61fd-47c9-9dd5-49719ac9a0ce.jpg', 'I have problem', '23:6'),
(58, '1560', 'mary', 'http://localhost:3000/avatar/abbc13e2-61fd-47c9-9dd5-49719ac9a0ce.jpg', 'hey', '23:9'),
(59, '1560', 'admin', 'http://localhost:3000/avatar/c388d38d-a162-4910-958b-3d6ea44dff11.jpg', '??', '23:11'),
(60, '1560', 'admin', 'http://localhost:3000/avatar/c388d38d-a162-4910-958b-3d6ea44dff11.jpg', '?', '23:11'),
(61, '1560', 'mary', 'http://localhost:3000/avatar/abbc13e2-61fd-47c9-9dd5-49719ac9a0ce.jpg', 'nothin', '23:11');

-- --------------------------------------------------------

--
-- 資料表結構 `cus_like`
--

CREATE TABLE `cus_like` (
  `id` int(11) NOT NULL,
  `member_id` varchar(255) NOT NULL,
  `cus_product_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `cus_message`
--

CREATE TABLE `cus_message` (
  `id` int(11) NOT NULL,
  `mes_cusproduct_id` varchar(255) NOT NULL,
  `mes_member_id` varchar(255) NOT NULL,
  `stars` varchar(255) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `cus_message`
--

INSERT INTO `cus_message` (`id`, `mes_cusproduct_id`, `mes_member_id`, `stars`, `comment`, `created_time`) VALUES
(1, '7', '1582', '✶', '這什麼', '2022-05-01'),
(2, '7', '1583', '✶✶', '欸不錯啊', '2022-05-30'),
(3, '7', '1584', '✶✶✶', '酷啊', '2022-06-03'),
(4, '7', '1585', '✶✶', '很好看欸', '2022-05-13'),
(5, '7', '1585', '✶✶✶✶', '很好看欸', '2022-07-20'),
(6, '7', '1585', '✶✶✶✶✶', '超喜歡', '2022-08-22'),
(7, '7', '1588', '✶', '不喜歡', '2022-06-01'),
(8, '7', '1588', '✶✶', '就這樣嗎', '2022-08-12'),
(9, '7', '1588', '✶✶✶', '好啦還不錯', '2022-08-10'),
(10, '7', '1588', '✶✶✶✶', '我很喜歡', '2022-07-19'),
(11, '7', '1588', '✶✶✶✶✶', '讚啦', '2022-06-16'),
(12, '7', '1589', '✶', '蛤', '2022-08-18'),
(13, '7', '1589', '✶✶', '喔', '2022-08-13'),
(14, '7', '1589', '✶✶✶', '什麼啦', '2022-08-13'),
(15, '7', '1589', '✶✶✶✶', '就這樣', '2022-07-18'),
(16, '7', '1589', '✶✶✶✶✶', 'ok', '2022-07-21'),
(17, '7', '1590', '✶', '嗯哼', '2022-08-22'),
(18, '7', '1590', '✶', '嗯哼', '2022-08-22'),
(19, '7', '1590', '✶', '對啊', '2022-08-22'),
(20, '7', '1590', '✶', '就不喜歡', '2022-08-22'),
(21, '7', '1590', '✶', '差評', '2022-08-15'),
(22, '7', '1591', '✶✶✶✶✶', '讚啦', '2022-08-23'),
(23, '7', '1591', '✶✶✶✶✶', '有夠帥', '2022-08-23'),
(24, '7', '1592', '✶✶✶✶✶', '很好看欸', '2022-08-23'),
(25, '7', '1592', '✶✶✶✶✶', '喔喔喔喜歡', '2022-08-23'),
(26, '7', '1592', '✶✶✶✶✶', '超喜歡要說三次', '2022-08-23'),
(27, '7', '1596', '✶✶✶', '好看喔', '2022-07-01'),
(28, '7', '1596', '✶✶', '好看喔', '2022-07-05'),
(29, '7', '1596', '✶✶✶✶✶', '好看喔', '2022-07-06'),
(30, '7', '1582', '✶✶✶✶', '有夠好看', '2022-08-23'),
(31, '5', '1590', '✶✶✶✶✶', 'COOL!!!!', '2022-08-21'),
(32, '5', '1587', '✶✶✶✶', 'LOVE THIS', '2022-08-21'),
(33, '5', '1588', '✶✶✶✶✶', 'SO COOL', '2022-08-21'),
(34, '11', '1584', '✶✶✶', '!', '2022-08-21');

-- --------------------------------------------------------

--
-- 資料表結構 `dance_category`
--

CREATE TABLE `dance_category` (
  `sid` int(11) NOT NULL,
  `type` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `dance_category`
--

INSERT INTO `dance_category` (`sid`, `type`) VALUES
(1, 'Hip Hop'),
(2, 'Popping'),
(3, 'Locking'),
(4, 'Choreography');

-- --------------------------------------------------------

--
-- 資料表結構 `favorite`
--

CREATE TABLE `favorite` (
  `sid` int(10) NOT NULL,
  `memId` int(30) NOT NULL,
  `favoriteImg` varchar(100) NOT NULL,
  `favoriteName` varchar(100) NOT NULL,
  `favoriteBrand` varchar(50) NOT NULL,
  `favoritePrice` int(20) NOT NULL,
  `favoriteId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `favorite`
--

INSERT INTO `favorite` (`sid`, `memId`, `favoriteImg`, `favoriteName`, `favoriteBrand`, `favoritePrice`, `favoriteId`) VALUES
(1, 1590, '637894478778200000.jpg', 'That dog has three pairs of Inner 0.0 The whole set of skateboards', 'POLAR', 6300, 2),
(2, 1590, '637894478401770000.jpg', 'GTA cartoon version of the whole set of skateboard', 'POLAR', 6800, 1),
(3, 1590, '637894478781770000.jpg', 'Zhengmei stares so cool, the whole group of skateboards 8.0', 'POLAR', 7400, 3),
(4, 1590, '637894482025330000.jpg', 'Chaopai Dou The whole set of skateboards 7.75', 'PALACE', 6999, 8),
(5, 1590, '637894482029730000.jpg', 'Renaissance Full Skateboard 8.25', 'PALACE', 8250, 9),
(6, 1590, '637894479560230000.jpg', 'Doberman Dog Skateboard 8.1', 'PALACE', 5999, 7),
(7, 1590, '637894482942270000.jpg', 'Pass time in Paris Full set of skateboards 8.25', 'FUCKING AWESOME', 9566, 11),
(8, 1590, '637894482945570000.jpg', 'Lots of people Full set of skateboards 8.25', 'FUCKING AWESOME', 6999, 12),
(9, 1590, '637894482038170000.jpg', 'Doberman Dog Skateboard 8.0', 'PALACE', 7480, 10),
(10, 1590, '637894482992030000.jpg', 'Smoke a cigarette The whole set of skateboards 8.18', 'FUCKING AWESOME', 6999, 15),
(11, 1590, '637894482956200000.jpg', 'Summon the beast the whole group of skateboards 8.25', 'FUCKING AWESOME', 6999, 14),
(12, 1590, '637894482948870000.jpg', 'One Spider Whole Skateboard 8.0', 'FUCKING AWESOME', 6999, 13),
(13, 1590, '637894483315400000.jpg', 'Naruto Rock The whole set of skateboards 8.25', 'HOCKEY', 5999, 17),
(14, 1590, '637894483318370000.jpg', 'Dead Man Whole Skateboard 8.25', 'HOCKEY', 6999, 18),
(15, 1590, '637894483314000000.jpg', 'They\'re laughing at you The whole set of skateboards 8.25', 'HOCKEY', 6999, 16);

-- --------------------------------------------------------

--
-- 資料表結構 `lesson`
--

CREATE TABLE `lesson` (
  `sid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dance_id` int(11) DEFAULT NULL,
  `duringtime_begin` date NOT NULL,
  `duringtime_end` date NOT NULL,
  `number_of_people` int(255) NOT NULL,
  `price` int(255) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `quota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `lesson`
--

INSERT INTO `lesson` (`sid`, `name`, `dance_id`, `duringtime_begin`, `duringtime_end`, `number_of_people`, `price`, `teacher_id`, `location`, `quota`) VALUES
(1, 'Key Glock - Ambition For Cash', 1, '2022-08-25', '2022-09-25', 8, 3000, 1, '忠孝館', 1),
(2, 'Collapse - Eminem / Baiba Klints', 1, '2022-09-26', '2022-10-26', 8, 2700, 1, '忠孝館', 0),
(3, 'Easy Dance Routine ', 1, '2022-10-27', '2022-11-27', 8, 2500, 1, '忠孝館', 0),
(4, 'Salute - Competition Dance', 1, '2022-11-28', '2022-12-28', 8, 2700, 1, '忠孝館', 8),
(5, 'Key Glock - Ambition For Cash\r\n', 1, '2022-08-25', '2022-09-25', 8, 3000, 2, '板橋民生旗艦館', 7),
(6, 'Collapse - Eminem / Baiba Klints', 1, '2022-09-26', '2022-10-26', 7, 2700, 2, '板橋民生旗艦館', 8),
(7, 'Easy Dance Routine ', 1, '2022-10-27', '2022-11-27', 6, 2500, 2, '板橋民生旗艦館', 7),
(8, 'Salute - Competition Dance', 1, '2022-11-28', '2022-12-28', 8, 2700, 2, '板橋民生旗艦館', 8),
(9, 'Key Glock - Ambition For Cash', 1, '2022-08-25', '2022-09-25', 8, 3000, 3, '台中精誠館', 7),
(10, 'Collapse - Eminem / Baiba Klints', 1, '2022-09-26', '2022-10-26', 8, 2700, 3, '台中精誠館', 8),
(11, 'Easy Dance Routine ', 1, '2022-10-27', '2022-11-27', 8, 2500, 3, '台中精誠館', 8),
(12, 'Salute - Competition Dance', 1, '2022-11-28', '2022-12-28', 8, 2700, 3, '台中精誠館', 7),
(13, 'G\'z from 21st Floor', 2, '2022-08-25', '2022-09-25', 8, 3000, 4, '忠孝館', 6),
(14, 'Ants - Edits', 2, '2022-09-26', '2022-10-26', 7, 2700, 4, '忠孝館', 4),
(15, 'Technologic - Daft Punk', 2, '2022-10-27', '2022-11-27', 6, 3000, 4, '忠孝館', 6),
(16, 'TroyBoi - Automatic', 2, '2022-11-28', '2022-12-28', 5, 2700, 4, '忠孝館', 8),
(17, 'G\'z from 21st Floor', 2, '2022-08-25', '2022-09-25', 8, 3000, 5, '板橋民生旗艦館', 7),
(18, 'Ants - Edits', 2, '2022-09-26', '2022-10-26', 7, 2700, 5, '板橋民生旗艦館', 5),
(19, 'Technologic - Daft Punk', 2, '2022-10-27', '2022-11-27', 6, 3000, 5, '板橋民生旗艦館', 5),
(20, 'TroyBoi - Automatic', 2, '2022-11-28', '2022-12-28', 5, 2700, 5, '板橋民生旗艦館', 8),
(21, 'G\'z from 21st Floor', 2, '2022-08-25', '2022-09-25', 8, 3000, 6, '台中精誠館', 8),
(22, 'Ants - Edits', 2, '2022-09-26', '2022-10-26', 7, 2700, 6, '台中精誠館', 4),
(23, 'Technologic - Daft Punk', 2, '2022-10-27', '2022-11-27', 6, 3000, 6, '台中精誠館', 6),
(24, 'TroyBoi - Automatic', 2, '2022-11-28', '2022-12-28', 5, 2700, 6, '台中精誠館', 8),
(25, 'Anderson .Paak - TINTS', 3, '2022-08-25', '2022-09-25', 8, 3000, 7, '忠孝館', 7),
(26, 'Jap\'s Gap\'s - Dance To The Music', 3, '2022-09-26', '2022-10-26', 7, 2700, 7, '忠孝館', 4),
(27, 'Cameo -It\'s Serious', 3, '2022-10-27', '2022-11-27', 6, 3000, 7, '忠孝館', 6),
(28, 'Perry & Sanlin -Keep Dancing', 3, '2022-11-28', '2022-12-28', 5, 2700, 7, '忠孝館', 8),
(29, 'Anderson .Paak - TINTS', 3, '2022-08-25', '2022-09-25', 8, 3000, 8, '板橋民生旗艦館', 8),
(30, 'Jap\'s Gap\'s - Dance To The Music', 3, '2022-09-26', '2022-10-26', 7, 2700, 8, '板橋民生旗艦館', 5),
(31, 'Cameo -It\'s Serious', 3, '2022-10-27', '2022-11-27', 6, 3000, 8, '板橋民生旗艦館', 6),
(32, 'Perry & Sanlin -Keep Dancing', 3, '2022-11-28', '2022-12-28', 5, 2700, 8, '板橋民生旗艦館', 8),
(33, 'Anderson .Paak - TINTS', 3, '2022-08-25', '2022-09-25', 8, 3000, 9, '台中精誠館', 8),
(34, 'Jap\'s Gap\'s - Dance To The Music', 3, '2022-09-26', '2022-10-26', 7, 2700, 9, '台中精誠館', 5),
(35, 'Cameo -It\'s Serious', 3, '2022-10-27', '2022-11-27', 6, 3000, 9, '台中精誠館', 5),
(36, 'Perry & Sanlin -Keep Dancing', 3, '2022-11-28', '2022-12-28', 5, 2700, 9, '台中精誠館', 8),
(37, 'KSI - Poppin', 4, '2022-08-25', '2022-09-25', 8, 3000, 10, '忠孝館', 7),
(38, 'Ø𝗭𝗜 -𝗵𝗮𝗶𝗿 𝘁𝗶𝗲', 4, '2022-09-26', '2022-10-26', 7, 2700, 10, '忠孝館', 5),
(39, '𝗝𝗼𝘀𝗵 𝗟𝗲𝘃𝗶 - 𝗦𝗲𝗲𝗻 𝗜𝘁 𝗔𝗹𝗹', 4, '2022-10-27', '2022-11-27', 6, 3000, 10, '忠孝館', 6),
(40, 'DPR LIVE - Martini Blue ', 4, '2022-11-28', '2022-12-28', 5, 2700, 10, '忠孝館', 8),
(41, 'KSI - Poppin', 4, '2022-08-25', '2022-09-25', 8, 3000, 11, '板橋民生旗艦館', 8),
(42, 'Ø𝗭𝗜 -𝗵𝗮𝗶𝗿 𝘁𝗶𝗲', 4, '2022-09-26', '2022-10-26', 7, 2700, 11, '板橋民生旗艦館', 5),
(43, '𝗝𝗼𝘀𝗵 𝗟𝗲𝘃𝗶 - 𝗦𝗲𝗲𝗻 𝗜𝘁 𝗔𝗹𝗹', 4, '2022-10-27', '2022-11-27', 6, 3000, 11, '板橋民生旗艦館', 6),
(44, 'DPR LIVE - Martini Blue ', 4, '2022-11-28', '2022-12-28', 5, 2700, 11, '板橋民生旗艦館', 8),
(45, 'KSI - Poppin', 4, '2022-08-25', '2022-09-25', 8, 3000, 12, '台中精誠館', 8),
(46, 'Ø𝗭𝗜 -𝗵𝗮𝗶𝗿 𝘁𝗶𝗲', 4, '2022-09-26', '2022-10-26', 7, 2700, 12, '台中精誠館', 5),
(47, '𝗝𝗼𝘀𝗵 𝗟𝗲𝘃𝗶 - 𝗦𝗲𝗲𝗻 𝗜𝘁 𝗔𝗹𝗹', 4, '2022-10-27', '2022-11-27', 6, 3000, 12, '台中精誠館', 6),
(48, 'DPR LIVE - Martini Blue ', 4, '2022-11-28', '2022-12-28', 5, 2700, 12, '台中精誠館', 7);

-- --------------------------------------------------------

--
-- 資料表結構 `lesson_favorite`
--

CREATE TABLE `lesson_favorite` (
  `sid` int(11) NOT NULL,
  `memsid` int(30) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dance_id` int(11) DEFAULT NULL,
  `duringtime_begin` date NOT NULL,
  `duringtime_end` date NOT NULL,
  `number_of_people` int(255) NOT NULL,
  `price` int(255) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `quota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `lesson_favorite`
--

INSERT INTO `lesson_favorite` (`sid`, `memsid`, `name`, `dance_id`, `duringtime_begin`, `duringtime_end`, `number_of_people`, `price`, `teacher_id`, `location`, `quota`) VALUES
(1, 0, 'Key Glock - Ambition For Cash', 1, '2022-08-25', '2022-09-25', 8, 3000, 1, '忠孝館', 7),
(2, 0, 'Collapse - Eminem / Baiba Klints', 1, '2022-09-26', '2022-10-26', 8, 2700, 1, '忠孝館', 7),
(3, 0, 'Easy Dance Routine ', 1, '2022-10-27', '2022-11-27', 8, 2500, 1, '忠孝館', 8),
(4, 0, 'Salute - Competition Dance', 1, '2022-11-28', '2022-12-28', 8, 2700, 1, '忠孝館', 6);

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `sid` int(11) NOT NULL,
  `mem_name` varchar(255) NOT NULL,
  `mem_nickname` varchar(255) NOT NULL,
  `mem_level` varchar(255) NOT NULL,
  `mem_account` varchar(255) NOT NULL,
  `mem_password` varchar(255) NOT NULL,
  `mem_email` varchar(255) NOT NULL,
  `mem_mobile` varchar(255) NOT NULL,
  `mem_birthday` date DEFAULT NULL,
  `mem_address` varchar(255) NOT NULL,
  `mem_avatar` varchar(255) NOT NULL,
  `mem_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `mem_bollen` tinyint(1) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `verify` varchar(255) NOT NULL,
  `google_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`sid`, `mem_name`, `mem_nickname`, `mem_level`, `mem_account`, `mem_password`, `mem_email`, `mem_mobile`, `mem_birthday`, `mem_address`, `mem_avatar`, `mem_created_at`, `mem_bollen`, `hash`, `verify`, `google_id`) VALUES
(1496, 'Cathy', '', '平民', '474', '474', '', '', '0000-00-00', '', 'http://localhost:3000/avatar/images.png', '2022-06-11 02:22:54', 0, '0', '', ''),
(1497, 'Bob', '', '平民', '010', '010', '', '', '0000-00-00', '', 'http://localhost:3000/avatar/images.png', '2022-06-11 05:52:01', 0, '0', '', ''),
(1499, 'Andy', '', '平民', '45454', '45454', '', '', '0000-00-00', '', 'http://localhost:3000/avatar/images.png', '2022-06-11 14:02:43', 0, '0', '', ''),
(1502, 'Ada', '', '平民', 'dfdfd', 'dfdfd', '', '', '0000-00-00', '', 'http://localhost:3000/avatar/images.png', '2022-06-11 21:23:33', 1, '0', '', ''),
(1544, 'QATEST', '', '平民', 'gary', '$2a$10$1./ZkK7lJUjivkc1XD/e9OxX8Bb0BDcJd6u7j6yMmIsDihHWNq/uG', '', '0912345678', '2022-07-01', '', 'http://localhost:3000/avatar/c388d38d-a162-4910-958b-3d6ea44dff11.jpg', '2022-07-23 20:58:35', 1, '0', 'on', ''),
(1560, 'mary', 'mary', '平民', 'mary', '$2a$10$YewpgIrUKaK.vDxZJ3/TS.N8iPUX80Dbzbm5bV2wPVgKvCsFRg.dq', 'mary@gmail.com', '0937664887', NULL, '', 'http://localhost:3000/avatar/abbc13e2-61fd-47c9-9dd5-49719ac9a0ce.jpg', '2022-08-05 17:24:59', 1, '31388', 'on', ''),
(1561, 'anny', 'anny', '平民', 'anny', '$2a$10$qhnILIRU5htCxMYKOmZFeu7.KMDg0n1vIsM2PiTO4ZP63LFigqRku', 'anny@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/2c086d5e-b8d9-4f6f-af4c-2ac20b8503f2.jpg', '2022-08-05 17:33:52', 1, '24450', 'on', ''),
(1562, 'john', '', '平民', 'john', '$2a$10$FFv4TiGKSCK.AnytYRhs8uGW8TIIUrtOHl0wHC4H/L/C/uHlDYeGq', 'john@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/7357c4c1-c525-44cd-99ff-9d770405b048.jpg', '2022-08-05 17:37:35', 1, '83065', 'on', ''),
(1563, 'Dan', '', '平民', 'dan', '$2a$10$WCZmMxBoNHLrNncZD5u9pepf.TsheZ7/JzUtaQj1qiMVca3h3LWLy', 'dan@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/cf683608-4b50-4b53-8ab3-6ae8b84d73b1.jpg', '2022-08-05 17:43:29', 1, '33716', 'on', ''),
(1564, 'lazy', '', '平民', 'lazy', '$2a$10$z4W45yYBjsFtPjwSYAe.Xuj7sa6fWSHdjGwRawBLCkdFWq/tQzIOy', 'lazy@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/540ba730-d098-4995-bd87-f27e7e2ee54b.jpg', '2022-08-05 17:49:12', 1, '75036', 'on', ''),
(1582, '漩渦鳴人', '', '平民', 'aaa', '$2a$10$ZvH6KpuzBSoHAWjUY/4c/uJ03Gxf0j87yrw5EH8kEPS40NBOyCgA2', 'aaa@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/9d4336cf-da44-4d5b-9039-cb755fa13dda.jpg', '2022-08-12 13:14:58', 1, '61737', 'on', ''),
(1583, '春野櫻', '', '平民', 'bbb', '$2a$10$bb41F2OhRovujrX3Z8CjDeyH99utXbi7tE9qEPk2qjgocUWj1kMIm', 'bbb@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/b6885372-d32d-47bc-8be3-dc38e1683222.jpg', '2022-08-12 13:15:37', 1, '21694', 'on', ''),
(1584, '卡卡西', '', '平民', 'ccc', '$2a$10$bLjNghKvtVERGaJP/NkGiewxcELgwlLiYqRhb7oZzSS4WU6kxXMoS', 'ccc@gmail.com', '0972556342', NULL, '', 'http://localhost:3000/avatar/be4a9f45-d328-45dd-aa13-988e470428a7.jpg', '2022-08-12 13:16:04', 1, '824', 'on', ''),
(1585, '大和', '', '平民', 'ddd', '$2a$10$FVYylLanF/8gm53e5XpT6uHFVqGgU9.h9kaNybtCGhuh.SlZx69v6', 'ddd@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/50cf5c1c-7c91-410b-a0a2-0556cec51825.jpg', '2022-08-12 13:16:27', 1, '44487', 'on', ''),
(1586, '奈良鹿丸', '', '平民', 'eee', '$2a$10$qmAZe84in7xpFgUdQAoI2.KVJOxrVtr8eYDO9qbKDGD2KWkXwPbCm', 'eee@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/357e4fa8-4d15-46ad-993d-119d81395a26.jpg', '2022-08-12 13:16:55', 1, '53795', 'on', ''),
(1587, '山中井野', '', '平民', 'fff', '$2a$10$WcRUDBQSRV0jeOi89/1nLuMw2uMiK9UiWSF8n9X9YEGIshrWuZCVC', 'fff@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/739b9064-7630-43b8-bc4f-9006856f3a2e.jpg', '2022-08-12 13:17:22', 1, '75542', 'on', ''),
(1588, '秋道丁次', '', '平民', 'ggg', '$2a$10$AWOvUN6f3Ies4wzV6HUuSODjE101otnvcxR6tPwzYE7JxQ6aoIhxe', 'ggg@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/f10ae412-c58d-45de-91a2-06a916c699a3.jpg', '2022-08-12 13:17:47', 1, '11997', 'on', ''),
(1589, '猿飛阿斯瑪', '', '平民', 'hhh', '$2a$10$Hb6xXR/TEakAJ0cmPvzD.OYs3VsdciAPbIvXvRCdMZ9vQItj6IN4K', 'hhh@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/bafd023c-7a02-4427-89fe-a7b79b53b9d8.jpg', '2022-08-12 13:18:09', 1, '90989', 'on', ''),
(1590, '日向雛田', '', '平民', 'iii', '$2a$10$590X/RvslwMVm7XgCFC6PeeWe.XWaEWybBpa0QG7xSwPbc.hIy3GG', 'iii@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/d924d680-449e-4eee-9c42-0fa842a7f865.jpg', '2022-08-12 13:18:53', 1, '82042', 'on', ''),
(1591, '犬塚牙', '', '平民', 'jjj', '$2a$10$lHpyFRU2ls0DmePk2DFuwOCwPQnQEOqviLIChLQ.0MdYpMUw1oyya', 'jjj@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/0022088c-48e3-4261-91ff-7ef374eb0296.jpg', '2022-08-12 13:19:22', 1, '99437', 'on', ''),
(1592, '宇智波鼬', '', '平民', 'kkk', '$2a$10$vV7SCK/sr4yeG89qe.ANKeTPJTOXqkyfnQjBpJkOhzrzxivGUSQU2', 'kkk@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/5adae7ba-cd47-4964-88f3-530378f9e590.jpg', '2022-08-12 13:20:25', 1, '41870', 'on', ''),
(1596, '旋渦博人', '', '平民', 'mmm', '$2a$10$O12YJWbB8dyAG8NevEzuEeJvShnLGW9TcH7q7c30opPkVu/MTN4mi', 'mmm@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/images.png', '2022-08-18 11:18:30', 1, '81351', 'on', ''),
(1597, '我愛羅', '', '平民', 'nnn', '$2a$10$uaONqinIAKqQXR/yo2d63.OYU/e3u1eakH.fpuxYt6dXlOU5R0g7i', 'nnn@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/images.png', '2022-08-18 11:19:22', 1, '22510', 'on', ''),
(1598, '宇智波辛德', '', '平民', 'ooo', '$2a$10$4mnjZ7C9rlVlhN8JjnDwO.oRRwug5dSW9t0XuF7qGkSYaYoxYhtBK', 'ooo@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/images.png', '2022-08-18 11:20:18', 1, '20543', 'on', ''),
(1599, '宇智波國良', '', '平民', 'ppp', '$2a$10$ACBGhsDCLUp8DO5k5cxqNeKz9.cLlYHTAVbupKhNRwuIYzNtAMKn.', 'ppp@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/images.png', '2022-08-18 11:20:49', 1, '88654', 'on', '');

-- --------------------------------------------------------

--
-- 資料表結構 `memberchat`
--

CREATE TABLE `memberchat` (
  `sid` int(11) NOT NULL,
  `mem_sid` int(11) NOT NULL,
  `message` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `memberchat`
--

INSERT INTO `memberchat` (`sid`, `mem_sid`, `message`) VALUES
(76, 1582, '5樓在打在'),
(77, 1582, '雛田 今晚要影分身嗎'),
(78, 1583, '我是不是跟上第七班的步伐了呢'),
(79, 1584, '小櫻在講什麼夢話?'),
(80, 1585, '中年大叔我可以去哪聯誼呢'),
(81, 1586, '老婆慎娶 好麻煩'),
(82, 1587, '想跟帥哥心轉身之術'),
(83, 1588, '就妳? 2ㄏ2ㄏ'),
(84, 1592, '6f70f762-f51b-4a69-b2fe-505415be68d1.jpg'),
(85, 1592, '讓大家看到帥帥ㄉ我');

-- --------------------------------------------------------

--
-- 資料表結構 `news`
--

CREATE TABLE `news` (
  `sid` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `info` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `update_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `news`
--

INSERT INTO `news` (`sid`, `title`, `info`, `image`, `created_at`, `update_at`) VALUES
(1, '滑板系列', 'Carson經常關注Supreme、A Bathing Ape等潮牌，緊貼潮流時尚，對近兩年高端時尚品牌如Louise Vuitton、Dior與街頭藝術家合作推出的聯乘作品更是不掩欣賞之情。街頭藝術對他來說，已經不是少數人追捧的文化現象，而是漸漸走進高級藝術的殿堂。在購藏這批滑板之前，他亦有收藏過去幾年Supreme推出的部分滑板，而當友人提及蘇富比即將上拍過去二十年所有Supreme滑板時，他知道這就是入手全套滑板千載難逢的良機。', '001.jpeg', '2022-06-03 08:40:07', '2022-06-03 08:40:07'),
(2, '國外選手來台', '「其實台灣街道上有一些很好的板點，甚至很多都尚未被開發，不少國外來的選手都說台灣像滑板天堂，Spot（板點）超多超棒，我相信這也是為什麼，近幾年一直有國外職業選手會選擇來台灣取景拍攝滑板影片的原因」，此次的訪問對象，同時也是台灣少見的職業滑板選手－柯家恩這樣說，趁此機會，就讓他帶我們暢滑台北街頭，一併也聊聊他最喜愛的滑板大小事。\r\n\r\n', '002.jpeg', '2022-06-03 08:40:07', '2022-06-03 08:40:07'),
(3, '台灣滑板店引進nike sb', 'Nike SB 的全稱是skateboarding（滑板運動），在 15年前，街頭流行風格最具代表性的鞋就是 Dunk SB。\r\n200年 Nike SB 系列，發布了第一款鞋 Nike Dunk SB首度問世，俗稱的四大天王 Danny supa、mulder、Gino、Forbes\r\n個人也因為鞋身用料質感以及zoom air鞋墊加持。開始入坑', '003.jpeg', '2022-06-03 08:40:07', '2022-06-03 08:40:07'),
(4, '他花22年滑進東奧！美國「滑板機器人」奪金大熱門竟重摔', '2020東京奧運在本屆賽事中，首次將街頭運動「滑板」（Skateboarding）列入正式比賽項目。世界積分排名第一的「美國滑板機器人」休斯頓（Nyjah Huston）在賽前被外界看好是奪下歷史首面滑板金牌的人選，不料卻在昨（25）日的街道賽中，技巧動作部分多次出現嚴重失誤，不僅摔掉金牌，更僅拿到第七名。儘管無緣獎牌，休斯頓賽後依然維持王者風範，主動擁抱拿下金牌的日本選手堀米雄斗。\r\n\r\n', '004.jpeg', '2022-06-03 08:40:07', '2022-06-03 08:40:07'),
(5, '華麗搖滾學院風！Dior 2022早秋系列時裝秀：女子滑板手帥氣開場、全新包款與晚禮服造型初亮相！', 'Dior 日前首次在首爾舉行時裝秀！在韓國梨花女子大學打造了一座時尚滑板場，展示其 2022 年秋季系列。藉由學院歷史提倡女性權力以促進性別平等，在一眾女子滑板手踩着滑板出場展開序幕，傳遞品牌願景。', '005.jpeg', '2022-06-03 08:40:07', '2022-06-03 08:40:07'),
(6, '領獎選手平均年齡14歲，「滑板」為什麼被奧運青睞？', '日本滑板選手西矢椛以奧運史上第二年輕金牌得主之姿，摘下東京奧運滑板冠軍。第一本滑板雜誌創辦人曾說滑板是一項「沒有歷史的運動」，6月21日滑板迷們慶祝的「滑板日」也聲明，玩滑板是對「獨立」的叛逆慶祝。滑板究竟為什麼吸引年輕人？又為什麼被奧運會看中？', '006.jpeg', '2022-06-03 08:40:07', '2022-06-03 08:40:07'),
(7, '滑板獎落誰家？', 'Carson經常關注Supreme、A Bathing Ape等潮牌，緊貼潮流時尚，對近兩年高端時尚品牌如Louise Vuitton、Dior與街頭藝術家合作推出的聯乘作品更是不掩欣賞之情。街頭藝術對他來說，已經不是少數人追捧的文化現象，而是漸漸走進高級藝術的殿堂。在購藏這批滑板之前，他亦有收藏過去幾年Supreme推出的部分滑板，而當友人提及蘇富比即將上拍過去二十年所有Supreme滑板時，他知道這就是入手全套滑板千載難逢的良機。', '007.jpeg', '2022-06-03 08:40:07', '2022-06-03 08:40:07');

-- --------------------------------------------------------

--
-- 資料表結構 `orders`
--

CREATE TABLE `orders` (
  `sid` int(50) NOT NULL,
  `member_sid` int(50) NOT NULL,
  `recipient` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `shipping_method` varchar(255) NOT NULL,
  `pay_method` varchar(255) NOT NULL,
  `total` int(50) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `orders`
--

INSERT INTO `orders` (`sid`, `member_sid`, `recipient`, `email`, `address`, `shipping_method`, `pay_method`, `total`, `order_date`) VALUES
(202200197, 1544, 'QA帳號', 'a403440322@gmail.com', '新北市樹林區千歲街20號', 'toHome', 'cash', 6800, '2022-08-18 11:41:44'),
(202200198, 1544, 'QA帳號', 'a403440322@gmail.com', '桃園市龜山區文青路29號', 'toHome', 'cash', 6800, '2022-07-18 11:43:55'),
(202200199, 1544, 'QA帳號', 'a403440322@gmail.com', '宜蘭縣冬山鄉香和路2號', 'toHome', 'cash', 6800, '2022-06-18 11:45:19'),
(202200200, 1544, 'QA帳號', 'a403440322@gmail.com', '桃園市觀音區尾厝路32號', 'toHome', 'cash', 6800, '2022-05-18 11:45:49'),
(202200201, 1544, 'QA帳號', 'a403440322@gmail.com', '桃園市蘆竹區上興路24號', 'toHome', 'cash', 6800, '2022-04-18 11:46:25'),
(202200202, 1544, 'QA帳號', 'a403440322@gmail.com', '台南市學甲區信義路1號', 'toHome', 'cash', 6800, '2022-03-18 11:47:13'),
(202200203, 1544, 'QA帳號', 'a403440322@gmail.com', '台北市中正區永綏街3號', 'toHome', 'cash', 6800, '2022-08-18 11:47:46'),
(202200204, 1544, 'QA帳號', 'a403440322@gmail.com', '雲林縣斗南鎮光復街5號', 'toHome', 'cash', 6800, '2022-08-18 11:48:28'),
(202200205, 1544, 'QA帳號', 'a403440322@gmail.com', '桃園市蘆竹區公園街5號', 'toHome', 'cash', 6800, '2022-08-18 11:49:10'),
(202200206, 1544, 'QA帳號', 'a403440322@gmail.com', '高雄市鹽埕區堀江街2號', 'toHome', 'cash', 6800, '2022-08-18 11:50:06'),
(202200207, 1544, 'QA帳號', 'a403440322@gmail.com', '宜蘭縣蘇澳鎮埤岸路22號', 'toHome', 'cash', 6800, '2022-08-18 11:50:56'),
(202200208, 1544, 'QA帳號', 'a403440322@gmail.com', '宜蘭縣冬山鄉照安二路29號', 'toHome', 'cash', 6800, '2022-08-18 11:51:31'),
(202200209, 1544, 'QA帳號', 'a403440322@gmail.com', '高雄市鳳山區武營路34號', 'toHome', 'cash', 6800, '2022-08-18 11:52:03'),
(202200210, 1544, 'QA帳號', 'a403440322@gmail.com', '南投縣埔里鎮和二街20號', 'toHome', 'cash', 6800, '2022-08-18 11:52:36'),
(202200211, 1544, 'QA帳號', 'a403440322@gmail.com', '彰化縣鹿港鎮五福街7號', 'toHome', 'cash', 6800, '2022-08-18 11:53:31'),
(202200212, 1544, 'QA帳號', 'a403440322@gmail.com', '高雄市鳳山區公園一街33號', 'toHome', 'cash', 6800, '2022-08-18 11:54:08'),
(202200213, 1544, 'QA帳號', 'a403440322@gmail.com', '台中市大甲區甲堤六街27號', 'toHome', 'cash', 6800, '2022-08-18 11:54:37'),
(202200214, 1544, 'QA帳號', 'a403440322@gmail.com', '彰化縣彰化市環河南路2號', 'toHome', 'cash', 6800, '2022-08-18 11:55:10'),
(202200215, 1544, 'QA帳號', 'a403440322@gmail.com', '桃園市中壢區幸福街2號', 'toHome', 'cash', 6800, '2022-08-18 11:56:06'),
(202200216, 1544, 'QA帳號', 'a403440322@gmail.com', '新北市新店區永業路35號', 'toHome', 'cash', 6800, '2022-08-18 11:56:40'),
(202200217, 1544, 'QA帳號', 'a403440322@gmail.com', '台北市松山區中崙門市', 'pickSelf', 'cash', 6300, '2022-03-18 14:19:49'),
(202200218, 1544, 'QA帳號', 'a403440322@gmail.com', '新北市三重區三安門市', 'pickSelf', 'cash', 6300, '2022-04-18 14:20:15'),
(202200219, 1544, 'QA帳號', 'a403440322@gmail.com', '台中市中區建鼎站門市', 'pickSelf', 'cash', 6300, '2022-05-18 14:20:41'),
(202200220, 1544, 'QA帳號', 'a403440322@gmail.com', '台中市中區建台鐵門市', 'pickSelf', 'cash', 6300, '2022-06-18 14:21:07'),
(202200221, 1544, 'QA帳號', 'a403440322@gmail.com', '新北市中和區水源門市', 'pickSelf', 'cash', 6300, '2022-07-18 14:21:31'),
(202200222, 1544, 'QA帳號', 'a403440322@gmail.com', '台北市信義區中興門市', 'pickSelf', 'cash', 6300, '2022-08-18 14:22:01'),
(202200223, 1590, '日向雛田', 'iii@gmail.com', '台北市松山區上弘門市', 'pickSelf', 'cash', 79286, '2022-08-18 15:27:12'),
(202200224, 1590, '日向雛田', 'iii@gmail.com', '新北市板橋區大庭門市', 'pickSelf', 'cash', 28000, '2022-08-18 15:31:19'),
(202200225, 1560, 'mary', 'mary@gmail.com', '台北市松山區上弘門市', 'pickSelf', 'cash', 14200, '2022-08-18 15:50:44'),
(202200226, 1560, 'mary', 'mary@gmail.com', '基隆市仁愛區仁愛路5號', 'toHome', 'cash', 14899, '2022-08-18 15:51:14'),
(202200227, 1560, 'mary', 'mary@gmail.com', '基隆市信義區信義路2號', 'toHome', 'credit', 20798, '2022-08-18 15:52:32'),
(202200228, 1590, '日向雛田', 'iii@gmail.com', '雲林縣北港鎮dfghdfghdfghdgfh', 'toHome', 'cash', 3780, '2022-08-21 14:10:18'),
(202200229, 1584, '卡卡西', 'ccc@gmail.com', '台北市大安區大敦門市', 'pickSelf', 'cash', 13100, '2022-08-21 14:17:54'),
(202200230, 1584, '卡卡西', 'ccc@gmail.com', '台北市中正區千成門市', 'pickSelf', 'cash', 20978, '2022-08-21 14:18:37'),
(202200231, 1584, '卡卡西', 'ccc@gmail.com', '台北市大安區大信門市', 'pickSelf', 'credit', 12100, '2022-08-21 14:19:23');

-- --------------------------------------------------------

--
-- 資料表結構 `order_details`
--

CREATE TABLE `order_details` (
  `sid` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `item_type` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `order_details`
--

INSERT INTO `order_details` (`sid`, `order_id`, `member_id`, `item_id`, `item_type`, `quantity`, `price`) VALUES
(3, 202200197, 1544, 1, 'product', 123, 6800),
(4, 202200198, 1544, 1, 'product', 80, 6800),
(5, 202200199, 1544, 1, 'product', 146, 6800),
(6, 202200200, 1544, 1, 'product', 154, 6800),
(7, 202200201, 1544, 1, 'product', 37, 6800),
(8, 202200202, 1544, 1, 'product', 115, 6800),
(9, 202200203, 1544, 1, 'product', 1, 6800),
(10, 202200204, 1544, 1, 'product', 1, 6800),
(11, 202200205, 1544, 1, 'product', 1, 6800),
(12, 202200206, 1544, 1, 'product', 1, 6800),
(13, 202200207, 1544, 1, 'product', 1, 6800),
(14, 202200208, 1544, 1, 'product', 1, 6800),
(15, 202200209, 1544, 1, 'product', 1, 6800),
(16, 202200210, 1544, 1, 'product', 1, 6800),
(17, 202200211, 1544, 1, 'product', 1, 6800),
(18, 202200212, 1544, 1, 'product', 1, 6800),
(19, 202200213, 1544, 1, 'product', 1, 6800),
(20, 202200214, 1544, 1, 'product', 1, 6800),
(21, 202200215, 1544, 1, 'product', 1, 6800),
(22, 202200216, 1544, 1, 'product', 1, 6800),
(23, 202200217, 1544, 2, 'product', 75, 6300),
(24, 202200218, 1544, 2, 'product', 55, 6300),
(25, 202200219, 1544, 2, 'product', 89, 6300),
(26, 202200220, 1544, 2, 'product', 140, 6300),
(27, 202200221, 1544, 2, 'product', 132, 6300),
(28, 202200222, 1544, 2, 'product', 37, 6300),
(29, 202200223, 1590, 19, 'product', 1, 5999),
(30, 202200223, 1590, 20, 'product', 1, 6480),
(31, 202200223, 1590, 21, 'product', 1, 5899),
(32, 202200223, 1590, 23, 'product', 1, 7480),
(33, 202200223, 1590, 24, 'product', 1, 5780),
(34, 202200223, 1590, 22, 'product', 1, 6780),
(35, 202200223, 1590, 25, 'product', 1, 5600),
(36, 202200223, 1590, 26, 'product', 1, 5300),
(37, 202200223, 1590, 27, 'product', 1, 5300),
(38, 202200223, 1590, 28, 'product', 1, 5899),
(39, 202200223, 1590, 29, 'product', 1, 6499),
(40, 202200223, 1590, 30, 'product', 1, 8490),
(41, 202200223, 1590, 9, 'custom', 1, 3780),
(42, 202200224, 1590, 1, 'lesson', 1, 3000),
(43, 202200224, 1590, 4, 'lesson', 1, 2700),
(44, 202200224, 1590, 3, 'lesson', 1, 2500),
(45, 202200224, 1590, 13, 'lesson', 1, 3000),
(46, 202200224, 1590, 28, 'lesson', 1, 2700),
(47, 202200224, 1590, 27, 'lesson', 1, 3000),
(48, 202200224, 1590, 37, 'lesson', 1, 3000),
(49, 202200224, 1590, 22, 'lesson', 1, 2700),
(50, 202200224, 1590, 46, 'lesson', 1, 2700),
(51, 202200224, 1590, 10, 'lesson', 1, 2700),
(52, 202200225, 1560, 1, 'product', 1, 6800),
(53, 202200225, 1560, 3, 'product', 1, 7400),
(54, 202200226, 1560, 3, 'product', 1, 7400),
(55, 202200226, 1560, 5, 'product', 1, 7499),
(56, 202200227, 1560, 2, 'product', 1, 6300),
(57, 202200227, 1560, 5, 'product', 1, 7499),
(58, 202200227, 1560, 8, 'product', 1, 6999),
(59, 202200228, 1590, 1, 'custom', 1, 3780),
(60, 202200229, 1584, 1, 'product', 1, 6800),
(61, 202200229, 1584, 2, 'product', 1, 6300),
(62, 202200230, 1584, 4, 'product', 1, 7499),
(63, 202200230, 1584, 7, 'product', 1, 5999),
(64, 202200230, 1584, 10, 'product', 1, 7480),
(65, 202200231, 1584, 6, 'product', 1, 6600),
(66, 202200231, 1584, 5, 'lesson', 1, 3000),
(67, 202200231, 1584, 7, 'lesson', 1, 2500);

-- --------------------------------------------------------

--
-- 資料表結構 `product`
--

CREATE TABLE `product` (
  `sid` int(11) NOT NULL,
  `img` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `price` int(50) NOT NULL,
  `info` varchar(255) NOT NULL,
  `category_id` int(15) NOT NULL,
  `color` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `product`
--

INSERT INTO `product` (`sid`, `img`, `name`, `brand`, `price`, `info`, `category_id`, `color`) VALUES
(1, '637894478401770000.jpg', 'GTA cartoon version of the whole set of skateboard', 'POLAR', 6800, 'Made in Poland - Most of the materials used in the production process come from the beautiful country of Poland.\r\n\r\nDigital Machining - CNC machine precisely cuts the body of the board, precisely cuts the mounting holes and horizontal diagonal corners.\r\n\r', 2, 'Black'),
(2, '637894478778200000.jpg', 'That dog has three pairs of Inner 0.0 The whole set of skateboards', 'POLAR', 6300, 'Wood Technology - A new core technology that mixes different types of wood. Makes the board very durable and lightweight\r\n\r\nFiberglass - Different types of high-quality fiberglass are used depending on the applicable strength required for the board body.\r', 2, 'Green'),
(3, '637894478781770000.jpg', 'Zhengmei stares so cool, the whole group of skateboards 8.0', 'POLAR', 7400, 'Scratch-resistant design - Using ski manufacturing technology, the bottom of the board is less prone to scratches.\r\n\r\nSuitable for: walking board / freestyle\r\n\r\nLength: 39.4\" Width: 9.45\"\r\n\r\nWheelbase: 22.6\" / 22.6\'\' / 24.6\"\r\n\r\nWeight: 1.7kg\r\n\r\nConstructi', 2, 'Blue'),
(4, '637894478801800000.jpg', 'Shark jump up the whole set of skateboards 8.25', 'POLAR', 7499, 'L: 45.6\" | W: 9.25\" | WB: 28.3\" - 29.5\"\r\n\r\nConcave: 0.43\" / 11mm\r\n\r\nRocker + Kicks: 0.8\" / 20mm\r\n\r\nFLEX 1: 70 - 100kg\r\n\r\nFLEX 2: 50 - 85kg\r\n\r\nCarbon fiber\r\n\r\nNatural flax fiber\r\n\r\nSurface material-', 2, 'Blue'),
(5, '637894478809030000.jpg', 'Memoirs or something? The whole set of skateboards 8.1', 'PALACE', 7499, 'Innovative combination of materials, hidden in the body structure,\r\n\r\nMaple + natural flax fiber composite material makes the board lighter.\r\n\r\nRocke specially put \"carbon fiber\" in the middle of the board to make a keel design', 2, 'Yellow'),
(6, '637894478830100000.jpg', 'Street Scenery Full Skateboard 8.25', 'PALACE', 6600, 'Enhanced for longer service life and flexible elasticity.\r\n\r\nThe second special material \"Flax Fiber\" keeps the board from shattering when damaged,\r\n\r\nUnlike fiberglass, your fingers won\'t be getting shards of glass.', 2, 'Yellow'),
(7, '637894479560230000.jpg', 'Doberman Dog Skateboard 8.1', 'PALACE', 5999, 'Innovative combination of materials, hidden in the body structure,\r\n\r\nMaple + natural flax fiber composite material makes the board lighter.\r\n\r\nRocke specially put \"carbon fiber\" in the middle of the board to make a keel design', 2, 'Pink'),
(8, '637894482025330000.jpg', 'Chaopai Dou The whole set of skateboards 7.75', 'PALACE', 6999, 'Enhanced for longer service life and flexible elasticity.\r\n\r\nThe second special material \"Flax Fiber\" keeps the board from shattering when damaged,\r\n\r\nUnlike fiberglass, your fingers won\'t be getting shards of glass.', 2, 'Yellow'),
(9, '637894482029730000.jpg', 'Renaissance Full Skateboard 8.25', 'PALACE', 8250, 'After playing this longboard, I just want to tell you that it is really very flexible, and you can find the exact position of flipping and hitting,\r\n\r\nLANDYACHTZ 2020\'s latest board type \"Tony Danza\", the board width is improved and narrowed to 8.5 inches', 2, 'Blue'),
(10, '637894482038170000.jpg', 'Doberman Dog Skateboard 8.0', 'PALACE', 7480, 'The board body from the board head to the board tail is Rocker. The board body from the board head to the board tail is mainly based on the Rocker overall shape, and the extended Tail is more prominent and lighter to use! Dot more accurately\r\nNext is the ', 2, 'Yellow'),
(11, '637894482942270000.jpg', 'Pass time in Paris Full set of skateboards 8.25', 'FUCKING AWESOME', 9566, 'L: 35\" | W: 9.5\" | WB: 18\"\r\n\r\nMaterial: 2021 added special soft and hard, clearer weight and better elastic feedback\r\n\r\n- Purely handmade board body\r\n\r\n- Glass fiber plywood body on the upper and lower panels is waterproof and wear-resistant', 2, 'Green'),
(12, '637894482945570000.jpg', 'Lots of people Full set of skateboards 8.25', 'FUCKING AWESOME', 6999, '-Nose/Tails use high-performance silicone rubber (Dragon skin plastic) on the edge of the outer layer, the material is lighter/elastic, 100% impact-resistant, and the moves are too large to be worn out too fast\r\n\r\n- 24cm (9.5\") board width U-Concave press', 2, 'Yellow'),
(13, '637894482948870000.jpg', 'One Spider Whole Skateboard 8.0', 'FUCKING AWESOME', 6999, 'Kate wants to be a little shorter than the BASTET 44\",\r\n\r\nTimur wanted a longer board than the City Rat 38\",\r\n\r\nSo FLOW 42\" was born~\r\n\r\nPEPPR BOARDS x SUPERYMMETRY', 2, 'Orange'),
(14, '637894482956200000.jpg', 'Summon the beast the whole group of skateboards 8.25', 'FUCKING AWESOME', 6999, 'Kate wants to be a little shorter than the BASTET 44\",\r\n\r\nTimur wanted a longer board than the City Rat 38\",\r\n\r\nSo FLOW 42\" was born~\r\n\r\nPEPPR BOARDS x SUPERYMMETRY', 2, 'Pink'),
(15, '637894482992030000.jpg', 'Smoke a cigarette The whole set of skateboards 8.18', 'FUCKING AWESOME', 6999, 'Mediate/Soft (special specification) is the elasticity between Mediate & Soft, and it is also the most recommended hardness by Ao Sen\r\n\r\nMaterial: 2021 added special soft and hard, clearer weight and better elastic feedback\r\n\r\n- Purely handmade board body', 2, 'Green'),
(16, '637894483314000000.jpg', 'They\'re laughing at you The whole set of skateboards 8.25', 'HOCKEY', 6999, '- Glass fiber plywood body on the upper and lower panels is waterproof and wear-resistant\r\n\r\n-Panel body maple 360° fully covered with polyurethane, strong pressure bearing toughness/sturdy\r\n\r\n-Nose/Tails use high-performance silicone rubber (Dragon skin ', 2, 'Orange'),
(17, '637894483315400000.jpg', 'Naruto Rock The whole set of skateboards 8.25', 'HOCKEY', 5999, '- 24cm (9.5\") board width U-Concave pressed with Micro Rocker board can\r\n\r\nThe freestyle/Dancing process firmly grasps the foot, easy to find the foot position, locks the foot, and is not easy to slip the foot', 2, 'Blue'),
(18, '637894483318370000.jpg', 'Dead Man Whole Skateboard 8.25', 'HOCKEY', 6999, 'L: 48\" | W: 9.5\" | WB: 32\"-33.4\"\r\n\r\n[Recommended experience]\r\nThe material of the board is strong/impact/light/waterproof/wear-resistant\r\nPlayers who like to pursue more advanced/multi-skills/big moves\r\nYou can come and experience the charm of the new mat', 2, 'Orange'),
(19, '637894483325030000.jpg', 'Staring at you and dancing The whole set of skateboards 8.25', 'HOCKEY', 5999, '[FLEX]\r\nStiff/Middle (special specification)\r\n[Material]\r\n-2021 added special soft and hard, lighter weight and better elastic feedback.\r\n\r\n- Purely handmade board body\r\n \r\n-The upper and lower panels are waterproof and wear-resistant.\r\n \r\n-Panel body map', 2, 'Red'),
(20, '637894483334100000.jpg', 'This is the street full set of skateboards 8.25', 'HOCKEY', 6480, '-Nose/Tails use high performance silicone rubber (Dragon skin plastic) on the outer edge of the board, the material is lighter/elastic\r\n100% crash resistance\r\n \r\n- Body size 122cm (48\") Adjustable wheel base 81-85cm (32\"-33.4\")\r\nWheelbase Sensitivity: Mod', 2, 'Pink'),
(21, '637903742589700000.jpg', 'This is art The whole set of skateboards 8.0', 'GX1000', 5899, '- 24cm (9.5\") board width U-Concave pressed with Micro Rocker board can\r\nThe freestyle/Dancing process firmly grasps the foot, easy to find the foot position, locks the foot, and is not easy to slip the foot\r\n \r\n-Kick longth 13/15cm (5.2\"/6\") large space,', 2, 'Black'),
(22, '637903780999200000.jpg', 'Grassy World The whole set of skateboards 8.125', 'GX1000', 6780, 'Kate wants to be a little shorter than the BASTET 44\",\r\n\r\nTimur wanted a longer board than the City Rat 38\",\r\n\r\nSo FLOW 42\" was born~\r\n\r\nPEPPR BOARDS x SUPERYMMETRY', 2, 'Black'),
(23, '637909744266270000.jpg', 'The hottest skateboard The whole group of skateboards 8.0', 'GX1000 ', 7480, '2021 new flipping pictures,\r\n\r\nIt was designed by a good friend for us.\r\n\r\nTaiwanese designer @supersymmetry__\r\n\r\nFLEX selection suggestions:\r\n\r\nSoft: 30-70kg\r\n\r\nMedium: 40-110kg\r\n\r\nStiff: 60-140kg', 2, 'Yellow'),
(24, '637909745618430000.jpg', 'See it all The whole set of skateboards 8.0', 'GX1000', 5780, 'Material: 2021 added special soft and hard, clearer weight and better elastic feedback\r\n\r\n- Purely handmade board body\r\n\r\n- Glass fiber plywood body on the upper and lower panels is waterproof and wear-resistant\r\n\r\n-Panel body maple 360° fully covered wit', 2, 'Orange'),
(25, '637896779815600000.jpg', 'CRUZ DECODER HAND 9.51IN x 32.26IN', 'SANTA CRUZ', 5600, 'Made in Poland - Most of the materials used in the production process come from the beautiful country of Poland.\r\n\r\nDigital Machining - CNC machine precisely cuts the body of the board, precisely cuts the mounting holes and horizontal diagonal corners.\r\n\r', 2, 'Green'),
(26, '637896779822170000.jpg', 'CRUZ FLIER COLLAGE DOT 8.8IN x 27.7IN', 'SANTA CRUZ', 5300, 'Polyurethane Board Edge - Specially formulated 360° PU bumper makes the board durable and waterproof. Don\'t worry about sawdust falling off the board\r\n\r\nWood Technology - A new core technology that mixes different types of wood. Makes the board very durab', 2, 'Purple'),
(27, '637896779840330000.jpg', 'CRUZ PRISMATIC DOT 8.8IN x 27.7IN', 'SANTA CRUZ', 5300, 'Carbon Fiber - Carbon fiber is added to make the board stronger and stiffer.\r\n\r\nScratch-resistant design - Using ski manufacturing technology, the bottom of the board is less prone to scratches.\r\n\r\nSuitable for: walking board / freestyle\r\n\r\nLength: 39.4\" ', 2, 'Black'),
(28, '637896779842700000.jpg', 'Opened the whole set of traffic boards 7.8', 'CREATURE', 5899, 'Wheelbase: 22.6\" / 22.6\'\' / 24.6\"\r\n\r\nWeight: 1.7kg\r\n\r\nConstruction: Lightweight Ash Wood Triple Layer Fiberglass 360pu Bumper Edge\r\n\r\nFlex: 1 (60-100+ kg) / 2 (40 – 80 kg)', 2, 'Orange'),
(29, '637896779845030000.jpg', 'Bottle opener Full set of traffic boards 8.6', 'CREATURE', 6499, 'Made in Poland - Most of the materials used in the production process come from the beautiful country of Poland.\r\n\r\nDigital Machining - CNC machine precisely cuts the body of the board, precisely cuts the mounting holes and horizontal diagonal corners.\r\n\r', 2, 'Purple'),
(30, '637896779853730000.jpg', 'Flip LVLV ORANGE 42\" Morandi Green 50º', 'CREATURE', 8490, 'Polyurethane Board Edge - Specially formulated 360° PU bumper makes the board durable and waterproof. Don\'t worry about sawdust falling off the board\r\n\r\nWood Technology - A new core technology that mixes different types of wood. Makes the board very durab', 2, 'White'),
(31, '637896779856230000.jpg', 'Rayne Longboards - WHIP PEACOCK 44\"', 'CREATURE', 7340, 'Carbon Fiber - Carbon fiber is added to make the board stronger and stiffer.\r\n\r\nScratch-resistant design - Using ski manufacturing technology, the bottom of the board is less prone to scratches.\r\n\r\nSuitable for: walking board / freestyle\r\n\r\nLength: 48\" Wi', 2, 'Black'),
(32, '637896779865300000.jpg', 'andyachtz - Stratus Spectrum 46\"', 'CREATURE', 9800, 'Length: 48\" Width: 9.64\"\r\n\r\nWheelbase: 29.4\"~31.6\"\r\n\r\nWeight: 2kg\r\n\r\nConstruction: Lightweight Ash Wood Triple Layer Fiberglass 360pu Bumper Edge\r\n\r\nFlex: 1 (60 – 100+ kg) / 2 (40 – 80 kg)', 2, 'Black'),
(33, '637896779868100000.jpg', 'SWITCH LONGBOARD - Otter 46\'\'', 'SANTA CRUZ', 6880, 'Made in Poland - Most of the materials used in the production process come from the beautiful country of Poland.\r\n\r\nDigital Machining - CNC machine precisely cuts the body of the board, precisely cuts the mounting holes and horizontal diagonal corners.\r\n\r', 2, 'Green'),
(34, '637896779870600000.jpg', 'ROCKET Longboards - LINUM 41.7\"', 'SANTA CRUZ', 7880, 'Polyurethane Board Edge - Specially formulated 360° PU bumper makes the board durable and waterproof. Don\'t worry about sawdust falling off the board\r\n\r\nWood Technology - A new core technology that mixes different types of wood. Makes the board very durab', 2, 'White'),
(35, '637907367084030000.jpg', 'Tiger Boards - FORRO 41\"', 'SANTA CRUZ', 7300, 'Carbon Fiber - Carbon fiber is added to make the board stronger and stiffer.\r\n\r\nScratch-resistant design - Using ski manufacturing technology, the bottom of the board is less prone to scratches.\r\n\r\nSuitable for: walking board / freestyle\r\n\r\nLength: 46\" Wi', 2, 'Black'),
(36, '637907367532670000.jpg', 'CLASSIC DOT 9.35in x 31.7in CRUZER 80s', 'SANTA CRUZ', 5600, 'Wheelbase: 27.1\" / 28.2\'\' / 29.2\"\r\n\r\nWeight: 1.8kg\r\n\r\nConstruction: Lightweight Ash Wood Triple Layer Fiberglass 360pu Bumper Edge\r\n\r\nFlex: 1 (60-100+ kg) / 2 (40 – 80 kg)', 2, 'Black'),
(37, '637907367700230000.jpg', 'GROUP DOT 9.51in x 32.26in CRUZER 80s', 'SANTA CRUZ', 5600, 'L: 41.7\" | W: 9.25\" | WB: 24.4\" - 25.6\"\r\n\r\nConcave: 0.43\" / 11mm\r\n\r\nRocker + Kicks: 0.8\" / 20mm\r\n\r\nFLEX 1: 70 - 100kg\r\n\r\nFLEX 2: 50 - 85kg', 2, 'Blue'),
(38, '637907367853370000.jpg', 'Cities', 'CREATURE', 7680, 'Composite material-\r\n\r\nCarbon fiber\r\n\r\nNatural flax fiber\r\n\r\nSurface material-\r\n\r\nEmbossed ABS (Embossed ABS)\r\n\r\nThe main material-\r\n\r\nCanadian Maple (SFI-certified)', 2, 'Blue'),
(39, '637915097444700000.jpg', 'ill-fated woman', 'CREATURE', 6999, 'Innovative combination of materials, hidden in the body structure,\r\n\r\nMaple + natural flax fiber composite material makes the board lighter.\r\n\r\nRocke specially placed the \"carbon fiber\" in the middle of the board to make a keel design to enhance longer se', 2, 'Red'),
(40, '637897049652570000.jpg', 'DET A LA SOUR 8.0', 'SOUR', 2100, 'The time-honored Z-FLEX is a brand from the United States.\r\n\r\nFrom research and development to mass production, it has been continuously improved after the early Z-BOY, and so far there is such a fun brand!!\r\n\r\nThis is a great board for beginners who want', 4, 'Pink'),
(41, '637901148616030000.jpg', 'DET A LA SOUR 8.25', 'SOUR', 2400, 'Z-FLEX TRUCKS 5\"\r\nThe strongest aluminum wheel frame with durable strength and smooth control.\r\nZ-FLEX BEARING\r\nContinue high-speed ABEC-7 Bearing.\r\nZ-FLEX WHEEL\r\nThe 52MM wheel formula gives you better ride control, so you can grip and ride where you nee', 4, 'Green'),
(42, '637901149197370000.jpg', 'POLIZEI 8.0', 'SOUR', 2100, 'The time-honored Z-FLEX is a brand from the United States.\r\n\r\nFrom research and development to mass production, it has been continuously improved after the early Z-BOY, and so far there is such a fun brand!!\r\n\r\nThis is a great board for beginners who want', 4, 'Red'),
(43, '637901304992400000.jpg', 'FILMS – POPSICLE 8.25', 'SOUR', 3299, 'Z-FLEX TRUCKS 5\"\r\nThe strongest aluminum wheel frame with durable strength and smooth control.\r\nZ-FLEX BEARING\r\nContinue high-speed ABEC-7 Bearing.\r\nZ-FLEX WHEEL\r\nThe 52MM wheel formula gives you better ride control, so you can grip and ride where you nee', 4, 'Pink'),
(44, '637901307076670000.jpg', 'FLAMINGOS 8.25', 'SOUR', 2499, 'The time-honored Z-FLEX is a brand from the United States.\r\n\r\nFrom research and development to mass production, it has been continuously improved after the early Z-BOY, and so far there is such a fun brand!!\r\n\r\nThis is a great board for beginners who want', 4, 'Red'),
(45, '637901309796270000.jpg', 'ALBERT – MGS 8.125', 'SOUR ', 3280, 'Z-FLEX TRUCKS 5\"\r\nThe strongest aluminum wheel frame with durable strength and smooth control.\r\nZ-FLEX BEARING\r\nContinue high-speed ABEC-7 Bearing.\r\nZ-FLEX WHEEL\r\nThe 52MM wheel formula gives you better ride control, so you can grip and ride where you nee', 4, 'Red'),
(46, '637902183627270000.jpg', 'KOFFE - MONTANA', 'SOUR', 1999, 'The time-honored Z-FLEX is a brand from the United States.\r\n\r\nFrom research and development to mass production, it has been continuously improved after the early Z-BOY, and so far there is such a fun brand!!\r\n\r\nThis is a great board for beginners who want', 4, 'Black'),
(47, '637902238801500000.jpg', 'NISSE - MONEY', 'SOUR', 1999, 'ACE TRUCKS\r\nThe upgraded Ace 44 structure is more durable and can complete the action more stably and smoothly.\r\nZ-FLEX BEARING\r\nContinue high-speed ABEC-7 Bearing.\r\nZ-FLEX WHEEL\r\nThe 52MM wheel formula gives you better ride control, so you can grip and r', 4, 'Pink'),
(48, '637907368380500000.jpg', 'SPANGS - FREE RANGE', 'SOUR', 2699, 'The time-honored Z-FLEX is a brand from the United States.\r\n\r\nFrom research and development to mass production, it has been continuously improved after the early Z-BOY, and so far there is such a fun brand!!\r\n\r\nThis is a great board for beginners who want', 4, 'Black'),
(49, '637925492626630000.jpg', 'JOSEF - EURO TEETH', 'SOUR', 1999, 'Z-FLEX TRUCKS 5\"\r\nThe strongest aluminum wheel frame with durable strength and smooth control.\r\nZ-FLEX BEARING\r\nContinue high-speed ABEC-7 Bearing.\r\nZ-FLEX WHEEL\r\nThe 52MM wheel formula gives you better ride control, so you can grip and ride where you nee', 4, 'Purple'),
(50, '637925493988330000.jpg', 'BAD BUOY ZERED 8.1', 'ALLTIMERS', 2200, 'The time-honored Z-FLEX is a brand from the United States.\r\n\r\nFrom research and development to mass production, it has been continuously improved after the early Z-BOY, and so far there is such a fun brand!!\r\n\r\nThis is a great board for beginners who want', 4, 'Purple'),
(51, '637926316207370000.jpg', 'ROLLIN\' WILL 8.0', 'ALLTIMERS', 2200, 'ACE TRUCKS\r\nThe upgraded Ace 44 structure is more durable and can complete the action more stably and smoothly.\r\nZ-FLEX BEARING\r\nContinue high-speed ABEC-7 Bearing.\r\nZ-FLEX WHEEL\r\nThe 52MM wheel formula gives you better ride control, so you can grip and r', 4, 'Yellow'),
(52, '637926316352170000.jpg', 'MORNING FUEL DUSTIN 8.25', 'ALLTIMERS', 2499, 'The time-honored Z-FLEX is a brand from the United States.\r\n\r\nFrom research and development to mass production, it has been continuously improved after the early Z-BOY, and so far there is such a fun brand!!\r\n\r\nThis is a great board for beginners who want', 4, 'Blue'),
(53, '637926317190500000.jpg', 'WHIP NAME PROPER ALEX 8.25', 'ALLTIMERS', 1999, 'ACE TRUCKS\r\nThe upgraded Ace 44 structure is more durable and can complete the action more stably and smoothly.\r\nZ-FLEX BEARING\r\nContinue high-speed ABEC-7 Bearing.\r\nZ-FLEX WHEEL\r\nThe 52MM wheel formula gives you better ride control, so you can grip and r', 4, 'Black'),
(54, '637928097348700000.jpg', 'SPACE TRASH DUSTIN 8.5', 'ALLTIMERS', 2200, 'The time-honored Z-FLEX is a brand from the United States.\r\n\r\nFrom research and development to mass production, it has been continuously improved after the early Z-BOY, and so far there is such a fun brand!!\r\n\r\nThis is a great board for beginners who want', 4, 'Green'),
(55, '637932294427000000.jpg', 'SPACE TRASH WILL 8.25', 'ALLTIMERS', 1999, 'ACE TRUCKS\r\nThe upgraded Ace 44 structure is more durable and can complete the action more stably and smoothly.\r\nZ-FLEX BEARING\r\nContinue high-speed ABEC-7 Bearing.\r\nZ-FLEX WHEEL\r\nThe 52MM wheel formula gives you better ride control, so you can grip and r', 4, 'White'),
(56, '637932295952970000.jpg', 'SPACE TRASH ZERED 8.3', 'ALLTIMERS', 2680, 'The time-honored Z-FLEX is a brand from the United States.\r\n\r\nFrom research and development to mass production, it has been continuously improved after the early Z-BOY, and so far there is such a fun brand!!\r\n\r\nThis is a great board for beginners who want', 4, 'White'),
(57, '637932307998870000.jpg', 'SPACE TRASH ALEXIS 8.125', 'ALLTIMERS', 3280, 'ACE TRUCKS\r\nThe upgraded Ace 44 structure is more durable and can complete the action more stably and smoothly.\r\nZ-FLEX BEARING\r\nContinue high-speed ABEC-7 Bearing.\r\nZ-FLEX WHEEL\r\nThe 52MM wheel formula gives you better ride control, so you can grip and r', 4, 'White'),
(58, '637932308525570000.jpg', 'INSULATION STATION 8.1', 'ALLTIMERS', 2880, 'The time-honored Z-FLEX is a brand from the United States.\r\n\r\nFrom research and development to mass production, it has been continuously improved after the early Z-BOY, and so far there is such a fun brand!!\r\n\r\nThis is a great board for beginners who want', 4, 'Black'),
(59, '637932309156870000.jpg', 'SNEAK PEAK GLASS BRICKS 8.25', 'ALLTIMERS', 2880, 'ACE TRUCKS\r\nThe upgraded Ace 44 structure is more durable and can complete the action more stably and smoothly.\r\nZ-FLEX BEARING\r\nContinue high-speed ABEC-7 Bearing.\r\nZ-FLEX WHEEL\r\nThe 52MM wheel formula gives you better ride control, so you can grip and r', 4, 'Green'),
(60, '637932334431270000.jpg', 'FLEX BOARD 8.125', 'ALLTIMERS', 1999, 'The time-honored Z-FLEX is a brand from the United States.\r\n\r\nFrom research and development to mass production, it has been continuously improved after the early Z-BOY, and so far there is such a fun brand!!\r\n\r\nThis is a great board for beginners who want', 4, 'Black'),
(61, '637932336187900000.jpg', 'FLEX BOARD 8.3', 'ALLTIMERS', 2799, 'ACE TRUCKS\r\nThe upgraded Ace 44 structure is more durable and can complete the action more stably and smoothly.\r\nZ-FLEX BEARING\r\nContinue high-speed ABEC-7 Bearing.\r\nZ-FLEX WHEEL\r\nThe 52MM wheel formula gives you better ride control, so you can grip and r', 4, 'Blue'),
(62, '637932339723670000.jpg', 'BALLOON DECK 8.25', 'ALLTIMERS', 1999, 'The time-honored Z-FLEX is a brand from the United States.\r\n\r\nFrom research and development to mass production, it has been continuously improved after the early Z-BOY, and so far there is such a fun brand!!\r\n\r\nThis is a great board for beginners who want', 4, 'Purple'),
(63, '637932341140070000.jpg', 'THE ESSENCE CRUISER 8.5', 'ALLTIMERS', 2799, 'ACE TRUCKS\r\nThe upgraded Ace 44 structure is more durable and can complete the action more stably and smoothly.\r\nZ-FLEX BEARING\r\nContinue high-speed ABEC-7 Bearing.\r\nZ-FLEX WHEEL\r\nThe 52MM wheel formula gives you better ride control, so you can grip and r', 4, 'Blue'),
(64, 'mczh-tw2000x2000_small13161.jpg', 'Trucks - V2 180mm 43º GOLD', 'Paris', 2000, 'The quantity sold is a pair of (2) wheel frames Bushings hardness is 90a', 5, 'Yellow'),
(65, 'mczh-tw2000x2000_small13162.jpg', 'Trucks - V2 195mm 50º BLACK', 'Paris', 2000, 'The quantity sold is a pair of (2) wheel frames Bushings hardness is 90a', 5, 'Black'),
(66, 'mczh-tw2000x2000_small13165.jpg', 'Trucks - V3 180mm 50º Magic Magenta', 'Paris', 2300, 'The quantity sold is a pair of (2) wheel frames Bushings hardness is 90a', 5, 'Pink'),
(67, 'mczh-tw2000x2000_small13169.jpg', 'Trucks - V3 180mm 50º', 'Paris', 2300, 'The quantity sold is a pair of (2) wheel frames Bushings hardness is 90a', 5, 'Red'),
(68, 'mczh-tw2000x2000_small13175.jpg', 'Trucks - 180mm 50° SAVANT Red/Black', 'Paris', 2300, 'The quantity sold is a pair of (2) wheel frames Bushings hardness is 90a', 5, 'Red'),
(69, 'mczh-tw2000x2000_small13176.jpg', 'Trucks - 180mm 50° SAVANT Gunmetal', 'Paris', 2200, 'The quantity sold is a pair of (2) wheel frames Bushings hardness is 90a', 5, 'Blue'),
(70, 'mczh-tw2000x2000_small13179.jpg', 'Trucks - Kodiak 180mm BLACK', 'Bear', 6500, 'The quantity sold is a pair of (2) wheel frames Bushings hardness is 90a', 5, 'Black'),
(71, 'mczh-tw2000x2000_small28907.jpg', 'Trucks III - RAW/SILVER 184mm 50°', 'Bear', 2000, 'Increased wheel frame strength reduces overall weight, enhances Hanger\'s support, and prevents flexing.\r\n\r\nIn order to satisfy Skater and players, Bushings SET can use various Bushings.\r\n\r\n96A Pivot cups material uses urethane urethane to reduce cracking ', 5, 'White'),
(72, 'mczh-tw2000x2000_small30506.jpg', 'Trucks - 186mm 48°', 'Bear', 2300, 'The quantity sold is a pair of (2) wheel frames Bushings hardness is 90a', 5, 'White'),
(73, 'mczh-tw2000x2000_small51996.jpg', 'rucks - V3 180mm 50º Purple Tide', 'Paris', 2300, 'The new patented T6 heat treatment technology, fine-tuning in the production process, a combination of casting and forging, increases the strength of Hanger!\r\n\r\n50º and 43º marking symbols have been added to the base, so the angle used can be clearly iden', 5, 'Purple'),
(74, 'mczh-tw2000x2000_small51997.jpg', 'Trucks - V3 180mm 50º Tropic Green', 'Paris', 2300, 'The quantity sold is a pair of (2) wheel frames Bushings hardness is 90a', 5, 'Green'),
(75, 'mczh-tw2000x2000_small51998.jpg', 'Trucks - V3 180mm 50º Polished', 'Paris', 2200, 'The new patented T6 heat treatment technology, fine-tuning in the production process, a combination of casting and forging, increases the strength of Hanger!\r\n\r\n50º and 43º marking symbols have been added to the base, so the angle used can be clearly iden', 5, 'Blue'),
(76, 'mczh-tw2000x2000_small53311.jpg', 'Skateboard Wheels - 54mm Elite Nomads 95a', 'OJ', 1500, 'OJ Skateboard Wheels\r\n\r\nSimply the best! Whether you\'re looking to go to the park, ride a bowl or cruising down the street,\r\n\r\nOJ has you covered with a range of team tested hard and soft wheels.', 6, 'Black'),
(77, 'mczh-tw2000x2000_small53313.jpg', 'Skateboard Wheels - 53mm Winkowski Mountain Trip Elite Hardline 99a\r\n', 'OJ', 1500, 'OJ Skateboard Wheels\r\n\r\nSimply the best! Whether you\'re looking to go to the park, ride a bowl or cruising down the street,\r\n\r\nOJ has you covered with a range of team tested hard and soft wheels.', 6, 'White'),
(78, 'mczh-tw2000x2000_small53442.jpg', 'Skateboard Wheels - 55mm Mini Super Juice Orange Green 78a', 'OJ', 1600, 'OJ Skateboard Wheels\r\n\r\nSimply the best! Whether you\'re looking to go to the park, ride a bowl or cruising down the street,\r\n\r\nOJ has you covered with a range of team tested hard and soft wheels.', 6, 'Orange'),
(79, 'mczh-tw2000x2000_small56431.jpg', 'Skateboard Wheels - 53mm FRAMEWORK SPARX 99a', 'Ricta', 900, 'RICTA has a long history and is constantly developing new wheels!\r\n\r\nThe biggest feature of RICTA WHEELS is to focus on high hardness, high density and smooth surface.\r\n\r\nRicta Naturals polyurethane material, maintains the best speed and smooth rolling.', 6, 'Black'),
(80, 'mczh-tw2000x2000_small57778.jpg', 'Tom Knox- The Love Series 53mm V-Cut 99a', 'Ricta', 1500, 'RICTA has a long history and is constantly developing new wheels!\r\n\r\nThe biggest feature of RICTA WHEELS is to focus on high hardness, high density and smooth surface.\r\n\r\nRicta Naturals polyurethane material, maintains the best speed and smooth rolling.', 6, 'White'),
(81, 'mczh-tw2000x2000_small57779.jpg', 'Sammy Montano- The Love Series 53mm OG Wide 99a', 'Ricta', 1500, 'RICTA has a long history and is constantly developing new wheels!\r\n\r\nThe biggest feature of RICTA WHEELS is to focus on high hardness, high density and smooth surface.\r\n\r\nRicta Naturals polyurethane material, maintains the best speed and smooth rolling.', 6, 'White'),
(82, 'mczh-tw2000x2000_small57907.jpg', 'Skateboard Wheels - 55mm Mini Super Juice Black 78a', 'OJ', 1300, 'OJ Skateboard Wheels\r\n\r\nSimply the best! Whether you\'re looking to go to the park, ride a bowl or cruising down the street,\r\n\r\nOJ has you covered with a range of team tested hard and soft wheels.', 6, 'Black'),
(83, 'mczh-tw2000x2000_small57912.jpg', 'Skateboard Wheels - 54mm Axel Crusher Ramen Elite Mini Combo 101a', 'OJ', 1500, 'OJ Skateboard Wheels\r\n\r\nSimply the best! Whether you\'re looking to go to the park, ride a bowl or cruising down the street,\r\n\r\nOJ has you covered with a range of team tested hard and soft wheels.', 6, 'Pink'),
(84, 'mczh-tw2000x2000_small57916.jpg', 'Skateboard Wheels - 54mm Nora Vasconcellos Surfs Up 2 Elite EZ EDGE 101a', 'OJ', 1500, 'OJ Skateboard Wheels\r\n\r\nSimply the best! Whether you\'re looking to go to the park, ride a bowl or cruising down the street,\r\n\r\nOJ has you covered with a range of team tested hard and soft wheels.', 6, 'Pink'),
(85, 'mczh-tw2000x2000_small68421.jpg', 'Longboards Wheels - Swirl/Teal 60mm 83a', 'Mindless', 1400, 'Diameter: 60mm\r\n\r\nFace width: 44mm\r\n\r\nGround plane width: 40mm\r\n\r\nWheel hardness: 83a', 6, 'Blue'),
(86, 'mczh-tw2000x2000_small68422.jpg', 'Longboards Wheels - Swirl/Bronze 60mm 83a', 'Mindless', 1400, 'Diameter: 60mm\r\n\r\nFace width: 44mm\r\n\r\nGround plane width: 40mm\r\n\r\nWheel hardness: 83a', 6, 'Yellow'),
(87, 'mczh-tw2000x2000_small68423.jpg', 'Longboards Wheels - TEAL VIPER 65mm 82a', 'Mindless', 1600, 'Diameter: 60mm\r\n\r\nFace width: 44mm\r\n\r\nGround plane width: 40mm\r\n\r\nWheel hardness: 83a', 6, 'Blue'),
(88, 'mczh-tw2000x2000_small68424.jpg', 'Longboards Wheels - BLACK VIPER 65mm 82a', 'Mindless', 1600, 'Diameter: 60mm\r\n\r\nFace width: 44mm\r\n\r\nGround plane width: 40mm\r\n\r\nWheel hardness: 83a', 6, 'Black');

-- --------------------------------------------------------

--
-- 資料表結構 `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `teacher_category`
--

CREATE TABLE `teacher_category` (
  `sid` int(11) NOT NULL,
  `teacher_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `teacher_head` varchar(255) CHARACTER SET utf8 NOT NULL,
  `teacher_info` varchar(255) CHARACTER SET utf8 NOT NULL,
  `teacher_url` varchar(255) CHARACTER SET utf8 NOT NULL,
  `location` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `teacher_category`
--

INSERT INTO `teacher_category` (`sid`, `teacher_name`, `teacher_head`, `teacher_info`, `teacher_url`, `location`) VALUES
(1, 'Nike', 'Nike.jpg', 'Nike Chen之所以被大家封為Nike老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', 'https://youtu.be/DjhXZFy8_CI', '忠孝館'),
(2, '小博', 'Xiaobo.jpg', '小博之所以被大家封為小博老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', 'https://youtu.be/qwdIbo_VLGg', '板橋民生旗艦館'),
(3, '雅君', 'Yajun.jpg', '雅君之所以被大家封為雅君老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', 'https://youtu.be/cAvdfQ_Mn8o', '台中精誠館'),
(4, '龔妹', 'Gongmei.jpg', '龔妹之所以被大家封為龔妹老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', 'https://youtu.be/1h_oc3SluTc', '忠孝館'),
(5, '紀威', 'Jiwei.jpg', '紀威之所以被大家封為紀威老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', 'https://youtu.be/aFo0tthNLGg', '板橋民生旗艦館'),
(6, '皓子', 'Haozi.jpg', '皓子之所以被大家封為皓子老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', '', '台中精誠館'),
(7, '阿邦', 'Abon.jpg', '阿邦之所以被大家封為阿邦老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', 'https://youtu.be/QHwuahB2PKY', '忠孝館'),
(8, '卡布', 'Kabu.jpg', '卡布之所以被大家封為卡布老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', 'https://youtu.be/wOlJDagZQiQ', '板橋民生旗艦館'),
(9, '小剛', 'Xiaogang.jpg', '小剛之所以被大家封為小剛老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', 'https://youtu.be/SRrWkqjCURY', '台中精誠館'),
(10, '剛一', 'Justone.jpg', '剛一之所以被大家封為剛一老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', 'https://youtu.be/oP7m597HT9A', '忠孝館'),
(11, '阿信', 'Ashin.jpg', '阿信之所以被大家封為阿信老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', 'https://youtu.be/8httv8_FHrQ', '板橋民生旗艦館'),
(12, '球球', 'Ball.jpg', '球球之所以被大家封為球球老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', 'https://youtu.be/O4tC63BgOVI', '台中精誠館');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `custom`
--
ALTER TABLE `custom`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `cus_chat`
--
ALTER TABLE `cus_chat`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `cus_like`
--
ALTER TABLE `cus_like`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `cus_message`
--
ALTER TABLE `cus_message`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `dance_category`
--
ALTER TABLE `dance_category`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `lesson_favorite`
--
ALTER TABLE `lesson_favorite`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `memberchat`
--
ALTER TABLE `memberchat`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- 資料表索引 `teacher_category`
--
ALTER TABLE `teacher_category`
  ADD PRIMARY KEY (`sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `admin`
--
ALTER TABLE `admin`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `carts`
--
ALTER TABLE `carts`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=310;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `custom`
--
ALTER TABLE `custom`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `cus_chat`
--
ALTER TABLE `cus_chat`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `cus_like`
--
ALTER TABLE `cus_like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `cus_message`
--
ALTER TABLE `cus_message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `dance_category`
--
ALTER TABLE `dance_category`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `favorite`
--
ALTER TABLE `favorite`
  MODIFY `sid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `lesson`
--
ALTER TABLE `lesson`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `lesson_favorite`
--
ALTER TABLE `lesson_favorite`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1600;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `memberchat`
--
ALTER TABLE `memberchat`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `news`
--
ALTER TABLE `news`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orders`
--
ALTER TABLE `orders`
  MODIFY `sid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202200232;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_details`
--
ALTER TABLE `order_details`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `teacher_category`
--
ALTER TABLE `teacher_category`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
