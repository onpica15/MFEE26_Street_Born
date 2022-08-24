-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2022 年 08 月 16 日 01:19
-- 伺服器版本： 10.4.21-MariaDB
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
(1, '1560', '瑪莉的小羊', 'PinkWave', 'iron', '#ecb1b1', 'style_03', 'Startwave', '#dbedff', 'SHEEP', 'Dot', 'cus9519f0d6-b7e4-4c7a-b361-af7b74050e58.png', '', '2022-08-05 17:32:15'),
(2, '1561', 'anny\'s board', 'NeonGreen', 'black', '#7a95ff', 'style_02', 'Disturb', '#06d0cc', 'ANNY', 'waves', 'cus3cab41cc-6a96-4d77-ab22-d87f524dc7d7.png', '', '2022-08-05 17:35:37'),
(3, '1562', 'BLACK BLACK', 'PurpleStart', 'black', '#160e0e', 'style_01', 'Triangles', '#000000', 'BLACL', 'Dot', 'cus48950cbd-f107-46cd-91dd-b9805319f3e0.png', '', '2022-08-05 17:39:12'),
(4, '1562', '黑心', 'BlackBlue', 'black', '#a30505', 'style_02', 'Parallel', '#ff0000', 'HEART', 'Dot', 'cus13d52b93-86e6-43ba-a064-8e2085d60aec.png', '', '2022-08-05 17:41:31'),
(5, '1563', 'GREENY', 'NeonGreen', 'iron', '#33ffd6', 'style_04', 'Startwave', '#33ff96', 'FRESH', 'skew', 'cus0dbc7aad-609e-4954-96c9-8a4b127de6f9.png', '', '2022-08-05 17:45:59'),
(6, '1564', '好廢喔', 'PinkWave', 'copper', '#ffbb5c', 'style_03', 'Parallel', '#fbc05b', 'NOTHING', 'stars', 'cus2b3177e7-55af-4634-88b5-d98fbc835464.png', '', '2022-08-05 17:50:04'),
(9, '1544', '2222', 'PurpleStart', 'iron', '#5084a5', 'style_01', 'Disturb', '#607385', 'gary-pro', 'skew', 'cus4d565250-57fe-45fe-a53f-d07ac9606aff.png', '3980', '2022-08-11 15:25:28'),
(10, '1544', 'rrr', 'BlackBlue', 'copper', '#597dab', 'style_04', 'Startwave', '#ffa861', 'yyyyy', 'Dot', 'cus47a58096-9a57-4b58-8227-ba9fa5211eed.png', '5580', '2022-08-11 17:18:54');

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
(1, '1', '1561', '✶✶✶', 'cool color', '2022-08-05'),
(2, '2', '1562', '✶✶', '綠色好看', '2022-08-05'),
(3, '1', '1562', '✶✶✶✶', 'mememememe', '2022-08-05'),
(4, '4', '1563', '', '好黑好黑', '2022-08-05'),
(5, '3', '1563', '', '好看欸欸', '2022-08-05'),
(6, '2', '1563', '✶✶✶✶', 'LOVE IT', '2022-08-05'),
(7, '1', '1563', '✶✶✶', '漂亮', '2022-08-05'),
(8, '5', '1564', '✶✶✶✶', '很清新', '2022-08-05'),
(9, '4', '1564', '', '真心不騙', '2022-08-05'),
(10, '3', '1564', '✶✶✶', '太黑了', '2022-08-05'),
(11, '2', '1564', '✶✶', '   不賴', '2022-08-05'),
(12, '1', '1564', '', '好可愛 喜歡', '2022-08-05'),
(13, '10', '1544', '✶✶✶', 'yyyyy', '2022-08-11');

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
(7, 1544, '637894482025330000.jpg', 'Chaopai Dou The whole set of skateboards 7.75', 'PALACE', 6999, 8),
(8, 1544, '637894482992030000.jpg', 'Smoke a cigarette The whole set of skateboards 8.18', 'FUCKING AWESOME', 6999, 15),
(11, 1544, '637894478801800000.jpg', 'Shark jump up the whole set of skateboards 8.25', 'POLAR', 7499, 4);

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
(1, 'Key Glock - Ambition For Cash', 1, '2022-08-25', '2022-09-25', 8, 3000, 1, '忠孝館', 4),
(2, 'Collapse - Eminem / Baiba Klints', 1, '2022-09-26', '2022-10-26', 8, 2700, 1, '忠孝館', 6),
(3, 'Easy Dance Routine ', 1, '2022-10-27', '2022-11-27', 8, 2500, 1, '忠孝館', 8),
(4, 'Salute - Competition Dance', 1, '2022-11-28', '2022-12-28', 8, 2700, 1, '忠孝館', 8),
(5, 'Key Glock - Ambition For Cash\r\n', 1, '2022-08-25', '2022-09-25', 8, 3000, 2, '板橋民生旗艦館', 8),
(6, 'Collapse - Eminem / Baiba Klints', 1, '2022-09-26', '2022-10-26', 7, 2700, 2, '板橋民生旗艦館', 8),
(7, 'Easy Dance Routine ', 1, '2022-10-27', '2022-11-27', 6, 2500, 2, '板橋民生旗艦館', 8),
(8, 'Salute - Competition Dance', 1, '2022-11-28', '2022-12-28', 8, 2700, 2, '板橋民生旗艦館', 8),
(9, 'Key Glock - Ambition For Cash', 1, '2022-08-25', '2022-09-25', 8, 3000, 3, '台中精誠館', 7),
(10, 'Collapse - Eminem / Baiba Klints', 1, '2022-09-26', '2022-10-26', 8, 2700, 3, '台中精誠館', 8),
(11, 'Easy Dance Routine ', 1, '2022-10-27', '2022-11-27', 8, 2500, 3, '台中精誠館', 8),
(12, 'Salute - Competition Dance', 1, '2022-11-28', '2022-12-28', 8, 2700, 3, '台中精誠館', 8),
(13, 'G\'z from 21st Floor', 2, '2022-08-25', '2022-09-25', 8, 3000, 4, '忠孝館', 7),
(14, 'Ants - Edits', 2, '2022-09-26', '2022-10-26', 7, 2700, 4, '忠孝館', 5),
(15, 'Technologic - Daft Punk', 2, '2022-10-27', '2022-11-27', 6, 3000, 4, '忠孝館', 6),
(16, 'TroyBoi - Automatic', 2, '2022-11-28', '2022-12-28', 5, 2700, 4, '忠孝館', 8),
(17, 'G\'z from 21st Floor', 2, '2022-08-25', '2022-09-25', 8, 3000, 5, '板橋民生旗艦館', 8),
(18, 'Ants - Edits', 2, '2022-09-26', '2022-10-26', 7, 2700, 5, '板橋民生旗艦館', 5),
(19, 'Technologic - Daft Punk', 2, '2022-10-27', '2022-11-27', 6, 3000, 5, '板橋民生旗艦館', 6),
(20, 'TroyBoi - Automatic', 2, '2022-11-28', '2022-12-28', 5, 2700, 5, '板橋民生旗艦館', 8),
(21, 'G\'z from 21st Floor', 2, '2022-08-25', '2022-09-25', 8, 3000, 6, '台中精誠館', 8),
(22, 'Ants - Edits', 2, '2022-09-26', '2022-10-26', 7, 2700, 6, '台中精誠館', 5),
(23, 'Technologic - Daft Punk', 2, '2022-10-27', '2022-11-27', 6, 3000, 6, '台中精誠館', 6),
(24, 'TroyBoi - Automatic', 2, '2022-11-28', '2022-12-28', 5, 2700, 6, '台中精誠館', 8),
(25, 'Anderson .Paak - TINTS', 3, '2022-08-25', '2022-09-25', 8, 3000, 7, '忠孝館', 8),
(26, 'Jap\'s Gap\'s - Dance To The Music', 3, '2022-09-26', '2022-10-26', 7, 2700, 7, '忠孝館', 5),
(27, 'Cameo -It\'s Serious', 3, '2022-10-27', '2022-11-27', 6, 3000, 7, '忠孝館', 6),
(28, 'Perry & Sanlin -Keep Dancing', 3, '2022-11-28', '2022-12-28', 5, 2700, 7, '忠孝館', 8),
(29, 'Anderson .Paak - TINTS', 3, '2022-08-25', '2022-09-25', 8, 3000, 8, '板橋民生旗艦館', 8),
(30, 'Jap\'s Gap\'s - Dance To The Music', 3, '2022-09-26', '2022-10-26', 7, 2700, 8, '板橋民生旗艦館', 5),
(31, 'Cameo -It\'s Serious', 3, '2022-10-27', '2022-11-27', 6, 3000, 8, '板橋民生旗艦館', 6),
(32, 'Perry & Sanlin -Keep Dancing', 3, '2022-11-28', '2022-12-28', 5, 2700, 8, '板橋民生旗艦館', 8),
(33, 'Anderson .Paak - TINTS', 3, '2022-08-25', '2022-09-25', 8, 3000, 9, '台中精誠館', 8),
(34, 'Jap\'s Gap\'s - Dance To The Music', 3, '2022-09-26', '2022-10-26', 7, 2700, 9, '台中精誠館', 5),
(35, 'Cameo -It\'s Serious', 3, '2022-10-27', '2022-11-27', 6, 3000, 9, '台中精誠館', 6),
(36, 'Perry & Sanlin -Keep Dancing', 3, '2022-11-28', '2022-12-28', 5, 2700, 9, '台中精誠館', 8),
(37, 'KSI - Poppin', 4, '2022-08-25', '2022-09-25', 8, 3000, 10, '忠孝館', 8),
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
(48, 'DPR LIVE - Martini Blue ', 4, '2022-11-28', '2022-12-28', 5, 2700, 12, '台中精誠館', 8);

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
(1496, '會員', '', '平民', '474', '474', '', '', '0000-00-00', '', 'http://localhost:3000/avatar/images.png', '2022-06-11 02:22:54', 0, '0', '', ''),
(1497, '會員', '', '平民', '010', '010', '', '', '0000-00-00', '', 'http://localhost:3000/avatar/images.png', '2022-06-11 05:52:01', 0, '0', '', ''),
(1499, '會員', '', '平民', '45454', '45454', '', '', '0000-00-00', '', 'http://localhost:3000/avatar/images.png', '2022-06-11 14:02:43', 0, '0', '', ''),
(1502, '會員', '', '平民', 'dfdfd', 'dfdfd', '', '', '0000-00-00', '', 'http://localhost:3000/avatar/images.png', '2022-06-11 21:23:33', 1, '0', '', ''),
(1544, 'Gary', 'gary', '平民', 'gary', '$2a$10$1./ZkK7lJUjivkc1XD/e9OxX8Bb0BDcJd6u7j6yMmIsDihHWNq/uG', 'a403440322@gmail.com', '0912345678', '2022-07-01', '', 'http://localhost:3000/avatar/c388d38d-a162-4910-958b-3d6ea44dff11.jpg', '2022-07-23 20:58:35', 1, '0', 'on', ''),
(1560, 'mary', '', '平民', 'mary', '$2a$10$YewpgIrUKaK.vDxZJ3/TS.N8iPUX80Dbzbm5bV2wPVgKvCsFRg.dq', 'mary@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/abbc13e2-61fd-47c9-9dd5-49719ac9a0ce.jpg', '2022-08-05 17:24:59', 1, '31388', 'on', ''),
(1561, 'anny', '', '平民', 'anny', '$2a$10$qhnILIRU5htCxMYKOmZFeu7.KMDg0n1vIsM2PiTO4ZP63LFigqRku', 'anny@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/2c086d5e-b8d9-4f6f-af4c-2ac20b8503f2.jpg', '2022-08-05 17:33:52', 1, '24450', 'on', ''),
(1562, 'john', '', '平民', 'john', '$2a$10$FFv4TiGKSCK.AnytYRhs8uGW8TIIUrtOHl0wHC4H/L/C/uHlDYeGq', 'john@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/7357c4c1-c525-44cd-99ff-9d770405b048.jpg', '2022-08-05 17:37:35', 1, '83065', 'on', ''),
(1563, 'Dan', '', '平民', 'dan', '$2a$10$WCZmMxBoNHLrNncZD5u9pepf.TsheZ7/JzUtaQj1qiMVca3h3LWLy', 'dan@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/cf683608-4b50-4b53-8ab3-6ae8b84d73b1.jpg', '2022-08-05 17:43:29', 1, '33716', 'on', ''),
(1564, 'lazy', '', '平民', 'lazy', '$2a$10$z4W45yYBjsFtPjwSYAe.Xuj7sa6fWSHdjGwRawBLCkdFWq/tQzIOy', 'lazy@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/540ba730-d098-4995-bd87-f27e7e2ee54b.jpg', '2022-08-05 17:49:12', 1, '75036', 'on', ''),
(1582, '漩渦鳴人', '', '平民', 'aaa', '$2a$10$ZvH6KpuzBSoHAWjUY/4c/uJ03Gxf0j87yrw5EH8kEPS40NBOyCgA2', 'aaa@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/9d4336cf-da44-4d5b-9039-cb755fa13dda.jpg', '2022-08-12 13:14:58', 1, '61737', 'on', ''),
(1583, '春野櫻', '', '平民', 'bbb', '$2a$10$bb41F2OhRovujrX3Z8CjDeyH99utXbi7tE9qEPk2qjgocUWj1kMIm', 'bbb@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/b6885372-d32d-47bc-8be3-dc38e1683222.jpg', '2022-08-12 13:15:37', 1, '21694', 'on', ''),
(1584, '卡卡西', '', '平民', 'ccc', '$2a$10$bLjNghKvtVERGaJP/NkGiewxcELgwlLiYqRhb7oZzSS4WU6kxXMoS', 'ccc@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/be4a9f45-d328-45dd-aa13-988e470428a7.jpg', '2022-08-12 13:16:04', 1, '824', 'on', ''),
(1585, '大和', '', '平民', 'ddd', '$2a$10$FVYylLanF/8gm53e5XpT6uHFVqGgU9.h9kaNybtCGhuh.SlZx69v6', 'ddd@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/50cf5c1c-7c91-410b-a0a2-0556cec51825.jpg', '2022-08-12 13:16:27', 1, '44487', 'on', ''),
(1586, '奈良鹿丸', '', '平民', 'eee', '$2a$10$qmAZe84in7xpFgUdQAoI2.KVJOxrVtr8eYDO9qbKDGD2KWkXwPbCm', 'eee@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/357e4fa8-4d15-46ad-993d-119d81395a26.jpg', '2022-08-12 13:16:55', 1, '53795', 'on', ''),
(1587, '山中井野', '', '平民', 'fff', '$2a$10$WcRUDBQSRV0jeOi89/1nLuMw2uMiK9UiWSF8n9X9YEGIshrWuZCVC', 'fff@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/739b9064-7630-43b8-bc4f-9006856f3a2e.jpg', '2022-08-12 13:17:22', 1, '75542', 'on', ''),
(1588, '秋道丁次', '', '平民', 'ggg', '$2a$10$AWOvUN6f3Ies4wzV6HUuSODjE101otnvcxR6tPwzYE7JxQ6aoIhxe', 'ggg@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/f10ae412-c58d-45de-91a2-06a916c699a3.jpg', '2022-08-12 13:17:47', 1, '11997', 'on', ''),
(1589, '猿飛阿斯瑪', '', '平民', 'hhh', '$2a$10$Hb6xXR/TEakAJ0cmPvzD.OYs3VsdciAPbIvXvRCdMZ9vQItj6IN4K', 'hhh@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/bafd023c-7a02-4427-89fe-a7b79b53b9d8.jpg', '2022-08-12 13:18:09', 1, '90989', 'on', ''),
(1590, '日向雛田', '', '平民', 'iii', '$2a$10$590X/RvslwMVm7XgCFC6PeeWe.XWaEWybBpa0QG7xSwPbc.hIy3GG', 'iii@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/d924d680-449e-4eee-9c42-0fa842a7f865.jpg', '2022-08-12 13:18:53', 1, '82042', 'on', ''),
(1591, '犬塚牙', '', '平民', 'jjj', '$2a$10$lHpyFRU2ls0DmePk2DFuwOCwPQnQEOqviLIChLQ.0MdYpMUw1oyya', 'jjj@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/0022088c-48e3-4261-91ff-7ef374eb0296.jpg', '2022-08-12 13:19:22', 1, '99437', 'on', ''),
(1592, '宇智波鼬', '', '平民', 'kkk', '$2a$10$vV7SCK/sr4yeG89qe.ANKeTPJTOXqkyfnQjBpJkOhzrzxivGUSQU2', 'kkk@gmail.com', '', NULL, '', 'http://localhost:3000/avatar/5adae7ba-cd47-4964-88f3-530378f9e590.jpg', '2022-08-12 13:20:25', 1, '41870', 'on', ''),
(1595, '賴志嘉', '', '平民', '', '', 'a403440322@gmail.com', '', NULL, '', 'https://lh3.googleusercontent.com/a/AItbvmkHcQTqeRy76VNT0_eAUnDf9DEln9UtPUHYPJtF=s100', '2022-08-15 21:38:04', 1, '', 'on', '101631611968110454014');

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
(42, 1544, '00000'),
(43, 1558, '123'),
(44, 1544, '555'),
(45, 1544, '7777'),
(46, 1544, '888'),
(47, 1544, '123123'),
(48, 1544, ''),
(49, 1544, ''),
(50, 1544, '00'),
(51, 1544, 'ghjghj'),
(52, 1544, '456'),
(53, 1544, 'asdsad'),
(54, 1546, '123'),
(55, 1547, '你好 gary'),
(56, 1546, '你好 gary'),
(57, 1546, '你好 gary :'),
(58, 1546, '你好 gary :'),
(59, 1546, '你好 gary :'),
(60, 1546, '你好 gary :'),
(61, 1546, '你好 gary :'),
(62, 1546, '你好 gary :'),
(63, 1546, '你好 gary :'),
(64, 1544, 'kiuyg'),
(65, 1544, 'https://medium.com/enjoy-life-enjoy-coding/react-%E5%9C%A8-react-%E4%B8%AD%E4%BD%BF%E7%94%A8-websocket-feat-socket-io-%E5%9F%BA%E6%9C%AC%E6%95%99%E5%AD%B8-2e3483ad5c80'),
(66, 1544, 'a57f3256-5571-4fa5-a7ea-0382550e6806.png');

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
(202200148, 1546, '123131', '', '基隆市信義區243243134', 'toHome', 'cash', 33799, '2022-07-29 22:27:39'),
(202200149, 1546, '123', '', '基隆市仁愛區123', 'toHome', 'cash', 14998, '2022-07-29 22:29:32'),
(202200150, 1546, 'superGary', '', '台北市中正區八德路123號', 'toHome', 'cash', 51670, '2022-07-31 22:06:42'),
(202200151, 1546, '123', '', '基隆市信義區213', 'toHome', 'cash', 67130, '2022-08-03 00:28:17'),
(202200152, 1544, '123', '', '基隆市仁愛區123123', 'toHome', 'cash', 56947, '2022-08-03 01:29:25'),
(202200153, 1544, 'Gary', 'garylin0969@gmail.com', '基隆市仁愛區kldsajfjefwojow', 'toHome', 'cash', 27999, '2022-08-04 13:08:21'),
(202200154, 1544, 'Gary', 'garylin0969@gmail.com', '基隆市信義區', 'toHome', 'cash', 27999, '2022-08-04 13:09:03'),
(202200155, 1544, 'Gary', 'a403440322@gmail.com', '台北市松山區中崙門市', 'pickSelf', 'cash', 27999, '2022-08-04 13:15:39'),
(202200156, 1544, 'Gary', 'a403440322@gmail.com', '台北市松山區上弘門市', 'pickSelf', 'cash', 13799, '2022-08-04 13:20:19'),
(202200157, 1544, 'Gary', 'a403440322@gmail.com', '台北市松山區中崙門市', 'pickSelf', 'cash', 6300, '2022-08-04 13:23:47'),
(202200158, 1544, 'Gary', 'a403440322@gmail.com', '台北市松山區上弘門市', 'pickSelf', 'cash', 6800, '2022-08-04 13:24:58'),
(202200159, 1544, 'Gary', 'a403440322@gmail.com', '台北市松山區中崙門市', 'pickSelf', 'cash', 93370, '2022-08-04 13:43:30'),
(202200160, 1544, 'Gary', 'a403440322@gmail.com', '基隆市仁愛區sadd', 'toHome', 'cash', 3990, '2022-08-04 14:38:36'),
(202200161, 1544, 'Gary', 'a403440322@gmail.com', '台北市士林區sdad', 'toHome', 'cash', 20500, '2022-08-04 14:50:56'),
(202200162, 1544, 'Gary', 'a403440322@gmail.com', '基隆市仁愛區基隆', 'toHome', 'cash', 13100, '2022-08-04 14:57:43'),
(202200163, 1544, 'Gary', 'a403440322@gmail.com', '基隆市信義區213', 'toHome', 'cash', 6300, '2022-08-04 16:37:42'),
(202200164, 1544, 'Gary', 'a403440322@gmail.com', '台北市中正區123', 'toHome', 'cash', 6300, '2022-08-04 16:38:46'),
(202200165, 1544, 'Gary', 'a403440322@gmail.com', '新北市板橋區千群門市', 'pickSelf', 'cash', 2700, '2022-08-05 10:46:02'),
(202200166, 1544, 'Gary', 'a403440322@gmail.com', '基隆市仁愛區仁愛路115號', 'toHome', 'cash', 21600, '2022-08-05 10:51:26'),
(202200182, 1544, 'Gary', 'a403440322@gmail.com', '台北市松山區上弘門市', 'pickSelf', 'cash', 3000, '2022-08-06 18:12:27'),
(202200183, 1544, 'Gary', 'garylin0969@gmail.com', '基隆市仁愛區gdfsda', 'toHome', 'cash', 13600, '2022-08-06 18:47:51'),
(202200184, 1544, 'Gary', 'garylin0969@gmail.com', '台北市松山區上弘門市', 'pickSelf', 'cash', 34000, '2022-08-07 16:28:29'),
(202200185, 1544, 'Gary', 'a403440322@gmail.com', '基隆市仁愛區qe213e1e3e', 'toHome', 'credit', 6800, '2022-08-07 23:42:13'),
(202200186, 1544, 'Gary', 'a403440322@gmail.com', '台北市松山區北體門市', 'pickSelf', 'credit', 6800, '2022-08-07 23:46:59'),
(202200187, 1544, 'Gary', 'a403440322@gmail.com', '台北市信義區仁和門市', 'pickSelf', 'cash', 34199, '2022-08-10 15:34:22'),
(202200188, 1544, 'Gary', 'a403440322@gmail.com', '基隆市七堵區六工門市', 'pickSelf', 'credit', 20500, '2022-08-10 15:36:05'),
(202200189, 1544, 'Gary', 'a403440322@gmail.com', '基隆市仁愛區cdsafcdacfascdsadas', 'toHome', 'credit', 21699, '2022-08-11 13:59:30'),
(202200190, 1544, 'Gary', 'a403440322@gmail.com', '台北市中正區ggggg', 'toHome', 'credit', 27940, '2022-08-11 17:23:20'),
(202200191, 1544, 'Gary', 'a403440322@gmail.com', '台北市萬華區中寧門市', 'pickSelf', 'credit', 13700, '2022-08-13 11:08:12'),
(202200192, 1544, 'Gary', 'a403440322@gmail.com', '台北市大安區仁安門市', 'pickSelf', 'credit', 13979, '2022-08-14 16:49:44'),
(202200193, 1544, 'Gary', 'a403440322@gmail.com', '台北市松山區京發門市', 'pickSelf', 'credit', 20879, '2022-08-15 20:35:35'),
(202200194, 1544, 'Gary', 'a403440322@gmail.com', '新北市中和區中安門市', 'pickSelf', 'credit', 14579, '2022-08-15 20:48:30');

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
(201, 202200148, 1546, 2, 'product', 3, 18900),
(202, 202200148, 1546, 3, 'product', 1, 7400),
(203, 202200148, 1546, 4, 'product', 1, 7499),
(204, 202200149, 1546, 4, 'product', 1, 7499),
(205, 202200149, 1546, 5, 'product', 1, 7499),
(206, 202200150, 1546, 1, 'product', 5, 34000),
(207, 202200150, 1546, 1, 'lesson', 1, 3000),
(208, 202200150, 1546, 2, 'lesson', 1, 2700),
(209, 202200150, 1546, 2, 'custom', 3, 11970),
(210, 202200151, 1546, 2, 'custom', 7, 27930),
(211, 202200151, 1546, 1, 'lesson', 1, 3000),
(212, 202200151, 1546, 2, 'lesson', 1, 2700),
(213, 202200151, 1546, 1, 'product', 4, 27200),
(214, 202200151, 1546, 2, 'product', 1, 6300),
(215, 202200152, 1544, 1, 'product', 1, 6800),
(216, 202200152, 1544, 2, 'product', 1, 6300),
(217, 202200152, 1544, 3, 'product', 1, 7400),
(218, 202200152, 1544, 1, 'lesson', 1, 3000),
(219, 202200152, 1544, 2, 'lesson', 1, 2700),
(220, 202200152, 1544, 3, 'lesson', 1, 2500),
(221, 202200152, 1544, 13, 'product', 1, 6999),
(222, 202200152, 1544, 14, 'product', 1, 6999),
(223, 202200152, 1544, 7, 'product', 1, 5999),
(224, 202200152, 1544, 9, 'product', 1, 8250),
(225, 202200154, 1544, 1, 'product', 1, 6800),
(226, 202200154, 1544, 2, 'product', 1, 6300),
(227, 202200154, 1544, 3, 'product', 1, 7400),
(228, 202200154, 1544, 4, 'product', 1, 7499),
(229, 202200155, 1544, 1, 'product', 1, 6800),
(230, 202200155, 1544, 2, 'product', 1, 6300),
(231, 202200155, 1544, 3, 'product', 1, 7400),
(232, 202200155, 1544, 4, 'product', 1, 7499),
(233, 202200156, 1544, 4, 'product', 1, 7499),
(234, 202200156, 1544, 2, 'product', 1, 6300),
(235, 202200157, 1544, 2, 'product', 1, 6300),
(236, 202200158, 1544, 1, 'product', 1, 6800),
(237, 202200159, 1544, 1, 'product', 5, 34000),
(238, 202200159, 1544, 2, 'product', 4, 25200),
(239, 202200159, 1544, 3, 'product', 3, 22200),
(240, 202200159, 1544, 7, 'custom', 1, 3990),
(241, 202200159, 1544, 8, 'custom', 1, 3990),
(242, 202200159, 1544, 9, 'custom', 1, 3990),
(243, 202200160, 1544, 9, 'custom', 1, 3990),
(244, 202200161, 1544, 1, 'product', 1, 6800),
(245, 202200161, 1544, 2, 'product', 1, 6300),
(246, 202200161, 1544, 3, 'product', 1, 7400),
(247, 202200162, 1544, 1, 'product', 1, 6800),
(248, 202200162, 1544, 2, 'product', 1, 6300),
(249, 202200163, 1544, 2, 'product', 1, 6300),
(250, 202200164, 1544, 2, 'product', 1, 6300),
(251, 202200165, 1544, 2, 'lesson', 1, 2700),
(252, 202200166, 1544, 2, 'lesson', 1, 2700),
(253, 202200166, 1544, 2, 'product', 3, 18900),
(254, 202200167, 1544, 2, 'product', 1, 6300),
(255, 202200168, 1544, 1, 'product', 1, 6800),
(256, 202200169, 1544, 1, 'product', 1, 6800),
(257, 202200170, 1544, 1, 'product', 1, 6800),
(258, 202200171, 1544, 1, 'product', 1, 6800),
(259, 202200172, 1544, 1, 'product', 1, 6800),
(260, 202200174, 1544, 1, 'product', 1, 6800),
(261, 202200175, 1544, 1, 'product', 1, 6800),
(262, 202200176, 1544, 1, 'product', 1, 6800),
(263, 202200177, 1544, 1, 'product', 1, 6800),
(264, 202200178, 1544, 1, 'product', 1, 6800),
(265, 202200179, 1544, 1, 'product', 1, 6800),
(266, 202200180, 1544, 1, 'product', 1, 6800),
(267, 202200181, 1544, 1, 'product', 1, 6800),
(268, 202200182, 1544, 1, 'lesson', 1, 3000),
(269, 202200183, 1544, 1, 'product', 2, 13600),
(270, 202200184, 1544, 1, 'product', 5, 34000),
(271, 202200184, 1544, 1, 'custom', 1, 0),
(272, 202200185, 1544, 1, 'product', 1, 6800),
(273, 202200186, 1544, 1, 'product', 1, 6800),
(274, 202200187, 1544, 1, 'product', 3, 20400),
(275, 202200187, 1544, 4, 'product', 1, 7499),
(276, 202200187, 1544, 2, 'product', 1, 6300),
(277, 202200187, 1544, 1, 'custom', 2, 0),
(278, 202200188, 1544, 1, 'product', 1, 6800),
(279, 202200188, 1544, 2, 'product', 1, 6300),
(280, 202200188, 1544, 3, 'product', 1, 7400),
(281, 202200189, 1544, 3, 'product', 1, 7400),
(282, 202200189, 1544, 4, 'product', 1, 7499),
(283, 202200189, 1544, 1, 'product', 1, 6800),
(284, 202200190, 1544, 9, 'custom', 2, 7960),
(285, 202200190, 1544, 1, 'lesson', 1, 3000),
(286, 202200190, 1544, 13, 'lesson', 1, 3000),
(287, 202200190, 1544, 85, 'product', 6, 8400),
(288, 202200190, 1544, 10, 'custom', 1, 5580),
(289, 202200191, 1544, 2, 'product', 1, 6300),
(290, 202200191, 1544, 3, 'product', 1, 7400),
(291, 202200192, 1544, 9, 'custom', 1, 3980),
(292, 202200192, 1544, 1, 'lesson', 1, 3000),
(293, 202200192, 1544, 15, 'product', 1, 6999),
(294, 202200193, 1544, 10, 'custom', 1, 5580),
(295, 202200193, 1544, 7, 'product', 1, 5999),
(296, 202200193, 1544, 1, 'lesson', 1, 3000),
(297, 202200193, 1544, 2, 'product', 1, 6300),
(298, 202200194, 1544, 7, 'product', 1, 5999),
(299, 202200194, 1544, 10, 'custom', 1, 5580),
(300, 202200194, 1544, 9, 'lesson', 1, 3000);

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
  `location` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `teacher_category`
--

INSERT INTO `teacher_category` (`sid`, `teacher_name`, `teacher_head`, `teacher_info`, `location`) VALUES
(1, 'Nike', 'Nike.jpg', 'Nike Chen之所以被大家封為Nike老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', '忠孝館'),
(2, '小博', 'Xiaobo.jpg', '小博之所以被大家封為小博老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', '板橋民生旗艦館'),
(3, '雅君', 'Yajun.jpg', '雅君之所以被大家封為雅君老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', '台中精誠館'),
(4, '龔妹', 'Gongmei.jpg', '龔妹之所以被大家封為龔妹老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', '忠孝館'),
(5, '紀威', 'Jiwei.jpg', '紀威之所以被大家封為紀威老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', '板橋民生旗艦館'),
(6, '皓子', 'Haozi.jpg', '皓子之所以被大家封為皓子老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', '台中精誠館'),
(7, '阿邦', 'Abon.jpg', '阿邦之所以被大家封為阿邦老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', '忠孝館'),
(8, '卡布', 'Kabu.jpg', '卡布之所以被大家封為卡布老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', '板橋民生旗艦館'),
(9, '小剛', 'Xiaogang.jpg', '小剛之所以被大家封為小剛老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', '台中精誠館'),
(10, '剛一', 'Justone.jpg', '剛一之所以被大家封為剛一老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', '忠孝館'),
(11, '阿信', 'Ashin.jpg', '阿信之所以被大家封為阿信老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', '板橋民生旗艦館'),
(12, '球球', 'Ball.jpg', '球球之所以被大家封為球球老師，就是因為她的實力及對跳舞的態度超認真，她跳舞資歷超過20年，擔任過演藝圈天王天后的舞者甚至是編舞老師', '台中精誠館');

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
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=230;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `custom`
--
ALTER TABLE `custom`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `cus_like`
--
ALTER TABLE `cus_like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `cus_message`
--
ALTER TABLE `cus_message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `dance_category`
--
ALTER TABLE `dance_category`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `favorite`
--
ALTER TABLE `favorite`
  MODIFY `sid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

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
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1596;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `memberchat`
--
ALTER TABLE `memberchat`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `news`
--
ALTER TABLE `news`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orders`
--
ALTER TABLE `orders`
  MODIFY `sid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202200195;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_details`
--
ALTER TABLE `order_details`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=301;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `teacher_category`
--
ALTER TABLE `teacher_category`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
