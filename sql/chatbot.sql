-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 09, 2023 at 08:17 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chatbot`
--

-- --------------------------------------------------------

--
-- Table structure for table `io`
--

CREATE TABLE `io` (
  `input` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `output` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `io`
--

INSERT INTO `io` (`input`, `output`) VALUES
('hi', 'Hello :)'),
('hello', 'Hi :)'),
('dennis ritchie', '                     ,_ ,_==▄▂\r\n                  ,  ▂▃▄▄▅▅▅▂▅¾.            /    /\r\n                   ▄▆<´  \"»▓▓▓%\\       / /   / /\r\n                 ,▅7\"     ´>▓▓▓%   /  / > / >/%\r\n                 ▐¶▓       ,»▓▓¾´  /> %/%// /  /\r\n                  ▓▃▅▅▅▃,,▄▅▅▅Æ\\// ///>// />/   /\r\n                 V║«¼.;→ ║<«.,`=// />//%/% / /\r\n               //╠<´ -²,)(▓~\"-╝/¾/ %/>/ />\r\n           / / / ▐% -./▄▃▄▅▐, /7//;//% / /\r\n           / ////`▌▐ %zWv xX▓▇▌//&;% / /\r\n       / / / %//%/¾½´▌▃▄▄▄▄▃▃▐¶\\/& /\r\n         </ /</%//`▓!%▓%╣WY<Y)y&/`\\\r\n     / / %/%//</%//\\i7; ╠N>)VY>7;  \\_\r\n  /   /</ //<///<_/%\\▓  V%W%£)XY  _/%‾\\_,\r\n   / / //%/_,=--^/%/%%\\¾%¶%%}    /%%%%%%;\\,\r\n    %/< /_/ %%%%%;X%%\\%%;,     _/%%%;,     \\\r\n   / / %%%%%%;,    \\%%l%%;// _/%;, dmr\r\n /    %%%;,         <;\\-=-/ /\r\n     ;,                l'),
('hello, world in c', '#include <stdio.h>\r\n\r\nint main()\r\n{\r\n	printf(\"hello, world\\n\");\r\n	return 0;\r\n}'),
('hello, world in c++', '#include <iostream>\r\n\r\nint main()\r\n{\r\n	std::cout << \"hello, world\" << \"\\n\";\r\n	return 0;\r\n}'),
('bear', 'ʕ •ᴥ•ʔ'),
('tableflip', '(╯°□°）╯︵ ┻━┻'),
('tableplace', '┬─┬﻿ ノ( ゜-゜ノ)'),
('beep boop', '┫・旦・┣'),
('clear', '¯\\_(ツ)_/¯');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `io`
--
ALTER TABLE `io`
  ADD UNIQUE KEY `input` (`input`) USING HASH;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;