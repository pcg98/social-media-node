-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 28-05-2023 a las 14:29:28
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `social-network`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conversations`
--

CREATE TABLE `conversations` (
  `id` bigint(20) NOT NULL,
  `sourceid` bigint(20) NOT NULL,
  `targetid` bigint(20) NOT NULL,
  `last_message` varchar(50) DEFAULT NULL,
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `conversations`
--

INSERT INTO `conversations` (`id`, `sourceid`, `targetid`, `last_message`, `updatedAt`) VALUES
(4, 12, 1, 'otra oportunidad, pero otro user', '2023-05-23 16:03:33'),
(5, 1, 13, 'as', '2023-05-23 16:36:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `image_comment`
--

CREATE TABLE `image_comment` (
  `id` int(11) NOT NULL,
  `body` varchar(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT curdate() COMMENT 'If we don''t have any date, we put the actual date in the database',
  `userid` bigint(20) NOT NULL,
  `user_imageid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) NOT NULL,
  `conversationsid` bigint(20) NOT NULL,
  `body` varchar(180) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT curdate(),
  `userid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `messages`
--

INSERT INTO `messages` (`id`, `conversationsid`, `body`, `createdAt`, `userid`) VALUES
(1, 4, 'otra oportunidad, pero otro user', '2023-05-23 00:00:00', 12),
(2, 4, 'otra oportunidad, pero otro user', '2023-05-23 00:00:00', 12),
(3, 4, 'Sayorana', '2023-05-23 00:00:00', 1),
(4, 4, 'a', '2023-05-23 00:00:00', 1),
(5, 4, 'otra oportunidad, pero otro user', '2023-05-23 00:00:00', 12),
(6, 5, 'as', '2023-05-23 00:00:00', 1);

--
-- Disparadores `messages`
--
DELIMITER $$
CREATE TRIGGER `update_conversation_after_message` AFTER INSERT ON `messages` FOR EACH ROW BEGIN
    UPDATE conversations
    SET `updatedAt` = CURRENT_TIMESTAMP, `last_message`= SUBSTRING(NEW.`body`, 1, 50)
    WHERE id = NEW.conversationsid;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notification_object`
--

CREATE TABLE `notification_object` (
  `id` int(11) NOT NULL,
  `entity` varchar(15) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `notification_object`
--

INSERT INTO `notification_object` (`id`, `entity`, `description`) VALUES
(1, 'messages', 'sends you a message'),
(2, 'user_request', 'sends you a request'),
(3, 'image_comment', 'comments in your photo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nickname` varchar(30) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` varchar(100) DEFAULT NULL,
  `sex` enum('men','woman','other') NOT NULL COMMENT 'It should be woman, men or other',
  `createdAt` date NOT NULL DEFAULT curdate(),
  `user_statusid` tinyint(3) NOT NULL DEFAULT 1,
  `user_rolid` tinyint(3) NOT NULL DEFAULT 1,
  `user_visibilityid` tinyint(3) NOT NULL DEFAULT 1,
  `name` varchar(60) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `profile_picture` varchar(255) NOT NULL DEFAULT 'default.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `nickname`, `telephone`, `password`, `bio`, `sex`, `createdAt`, `user_statusid`, `user_rolid`, `user_visibilityid`, `name`, `last_name`, `profile_picture`) VALUES
(1, 'nsadna@gma.com', 'nfkas', '76091', '$2a$10$4J8.gYv6ndX0CSf.ITH41.Kqq7lO5tc52wn88BvDxhFIc0.7dOLgC', NULL, 'men', '2023-05-06', 1, 1, 1, 'John', 'Kennedy', 'default.jpg'),
(2, 'sa', 'as', '214', 'fa', NULL, 'men', '2023-05-06', 1, 1, 1, 'Santiago', 'Calatrava', 'default.jpg'),
(7, 'da@gma.com', 'saw13', '728594881', '$2a$10$6GWY95MRu76loKAd2NRDa.r.13pRmoKIdFHeZy1lVbY0QW1AslwSu', NULL, 'woman', '2023-05-14', 1, 1, 1, 'asd', 'sag', 'default.jpg'),
(9, 'nsadna1@gma.com', 'saw131', '7285948811', '$2a$10$wkO9BAmZ1lCnwqhKLIDM/.fC2SruvFBXGP9pygjRc286e0rjIMrDy', NULL, 'woman', '2023-05-16', 1, 1, 1, 'asd', 'sag', 'default.jpg'),
(10, 'nsadna12@gma.com', 'saw134', '7285948812', '$2a$10$IoX.JenkvDDql4Er.KLdpuk/3cB1o67GQmg7DHKzU15zM5o2WGv0y', NULL, 'woman', '2023-05-16', 1, 1, 1, 'asd', 'sag', 'default.jpg'),
(11, 'nsavca@gma.com', 'sagw', '562451561', '$2a$10$xRsZfWBqvCWVn46BSRw/hOM0Y0X/LaYiTHio1R2hTtfsQvh9sdm0.', NULL, 'woman', '2023-05-16', 1, 1, 1, 'asd', 'sag', 'default.jpg'),
(12, 'ejem@gma.com', 'ejemplo', '1241525', '$2a$10$M.qjps/vY3JTLOAiaJ7aw.rPpfRnIqgposnM6N38KfBNVR42Nh0RS', NULL, 'woman', '2023-05-16', 1, 1, 1, 'ek', 'e', 'default.jpg'),
(13, 'gema@gma.com', 'ejema', '28412', '$2a$10$mKY1FnYubGXjweXuADC8Tea8jih458ECcKlFU74fwclfzPx2r27uq', NULL, 'other', '2023-05-16', 1, 1, 1, 'asd', 'sb', 'default.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_blocked`
--

CREATE TABLE `user_blocked` (
  `sourceid` bigint(20) NOT NULL,
  `targetid` bigint(20) NOT NULL,
  `createdAt` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_follower`
--

CREATE TABLE `user_follower` (
  `sourceid` bigint(20) NOT NULL,
  `targetid` bigint(20) NOT NULL,
  `createdAt` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_follower`
--

INSERT INTO `user_follower` (`sourceid`, `targetid`, `createdAt`) VALUES
(1, 12, '2023-05-27'),
(12, 1, '2023-05-27');

--
-- Disparadores `user_follower`
--
DELIMITER $$
CREATE TRIGGER `after_insert_follower_create_following` AFTER INSERT ON `user_follower` FOR EACH ROW BEGIN
  -- Perform the insert into the other table
  INSERT INTO user_following (sourceid, targetid)
  VALUES (NEW.sourceid, NEW.targetid);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_following`
--

CREATE TABLE `user_following` (
  `sourceid` bigint(20) NOT NULL,
  `targetid` bigint(20) NOT NULL,
  `createdAt` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_following`
--

INSERT INTO `user_following` (`sourceid`, `targetid`, `createdAt`) VALUES
(1, 12, '2023-05-27'),
(12, 1, '2023-05-27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_image`
--

CREATE TABLE `user_image` (
  `id` int(10) NOT NULL,
  `userid` bigint(20) NOT NULL,
  `title` varchar(80) DEFAULT NULL,
  `createdAt` date NOT NULL DEFAULT curdate(),
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_notification`
--

CREATE TABLE `user_notification` (
  `id` bigint(20) NOT NULL,
  `sourceid` bigint(20) NOT NULL,
  `targetid` bigint(20) NOT NULL,
  `is_see` bit(1) NOT NULL DEFAULT b'0',
  `notification_objectid` int(11) NOT NULL,
  `entity_id` bigint(20) DEFAULT NULL,
  `createdAt` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_notification`
--

INSERT INTO `user_notification` (`id`, `sourceid`, `targetid`, `is_see`, `notification_objectid`, `entity_id`, `createdAt`) VALUES
(1, 1, 12, b'0', 1, 4, '2023-05-28'),
(2, 12, 1, b'1', 1, 4, '2023-05-28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_report`
--

CREATE TABLE `user_report` (
  `id` int(10) NOT NULL,
  `sourceid` bigint(20) NOT NULL,
  `targetid` bigint(20) NOT NULL,
  `reason` varchar(100) NOT NULL COMMENT 'ENum distintos motivos en ele backend, aqui va a ser varchar',
  `explication` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_request`
--

CREATE TABLE `user_request` (
  `sourceid` bigint(20) NOT NULL,
  `targetid` bigint(20) NOT NULL,
  `createdAt` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_request`
--

INSERT INTO `user_request` (`sourceid`, `targetid`, `createdAt`) VALUES
(12, 2, '2023-05-24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_rol`
--

CREATE TABLE `user_rol` (
  `id` tinyint(3) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_rol`
--

INSERT INTO `user_rol` (`id`, `rol`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_status`
--

CREATE TABLE `user_status` (
  `id` tinyint(3) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_status`
--

INSERT INTO `user_status` (`id`, `status`) VALUES
(1, 'active'),
(2, 'closed'),
(3, 'suspended');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_suspension`
--

CREATE TABLE `user_suspension` (
  `id` int(10) NOT NULL,
  `userid` bigint(20) NOT NULL,
  `untilDate` date NOT NULL,
  `user_reportid` int(10) NOT NULL,
  `user_reportsourceid` bigint(20) NOT NULL,
  `user_reporttargetid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_visibility`
--

CREATE TABLE `user_visibility` (
  `id` tinyint(3) NOT NULL,
  `visibility` varchar(50) NOT NULL COMMENT 'Public or private'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_visibility`
--

INSERT INTO `user_visibility` (`id`, `visibility`) VALUES
(1, 'public'),
(2, 'private');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKconversati84423` (`sourceid`),
  ADD KEY `FKconversati606185` (`targetid`);

--
-- Indices de la tabla `image_comment`
--
ALTER TABLE `image_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKimage_comm259430` (`user_imageid`),
  ADD KEY `FKimage_comm153662` (`userid`);

--
-- Indices de la tabla `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKmessages558958` (`conversationsid`),
  ADD KEY `FKmessages522550` (`userid`);

--
-- Indices de la tabla `notification_object`
--
ALTER TABLE `notification_object`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nickname` (`nickname`),
  ADD UNIQUE KEY `telephone` (`telephone`),
  ADD KEY `FKuser317843` (`user_statusid`),
  ADD KEY `FKuser204990` (`user_rolid`),
  ADD KEY `FKuser71815` (`user_visibilityid`);

--
-- Indices de la tabla `user_blocked`
--
ALTER TABLE `user_blocked`
  ADD PRIMARY KEY (`sourceid`,`targetid`),
  ADD KEY `FKuser_block866483` (`targetid`);

--
-- Indices de la tabla `user_follower`
--
ALTER TABLE `user_follower`
  ADD PRIMARY KEY (`sourceid`,`targetid`),
  ADD KEY `FKuser_follo995249` (`targetid`);

--
-- Indices de la tabla `user_following`
--
ALTER TABLE `user_following`
  ADD PRIMARY KEY (`sourceid`,`targetid`),
  ADD KEY `FKuser_follo659541` (`targetid`);

--
-- Indices de la tabla `user_image`
--
ALTER TABLE `user_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKuser_image936503` (`userid`);

--
-- Indices de la tabla `user_notification`
--
ALTER TABLE `user_notification`
  ADD PRIMARY KEY (`id`,`sourceid`,`targetid`),
  ADD KEY `FKuser_notif8514` (`sourceid`),
  ADD KEY `FKuser_notif889263` (`targetid`),
  ADD KEY `FKuser_notif219994` (`notification_objectid`);

--
-- Indices de la tabla `user_report`
--
ALTER TABLE `user_report`
  ADD PRIMARY KEY (`id`,`sourceid`,`targetid`),
  ADD KEY `FKuser_repor362073` (`sourceid`),
  ADD KEY `FKuser_repor918908` (`targetid`);

--
-- Indices de la tabla `user_request`
--
ALTER TABLE `user_request`
  ADD PRIMARY KEY (`sourceid`,`targetid`),
  ADD KEY `FKuser_reque973074` (`targetid`);

--
-- Indices de la tabla `user_rol`
--
ALTER TABLE `user_rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_status`
--
ALTER TABLE `user_status`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_suspension`
--
ALTER TABLE `user_suspension`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKuser_suspe277745` (`userid`),
  ADD KEY `FKuser_suspe528343` (`user_reportid`,`user_reportsourceid`,`user_reporttargetid`);

--
-- Indices de la tabla `user_visibility`
--
ALTER TABLE `user_visibility`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `image_comment`
--
ALTER TABLE `image_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `notification_object`
--
ALTER TABLE `notification_object`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `user_image`
--
ALTER TABLE `user_image`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_notification`
--
ALTER TABLE `user_notification`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user_report`
--
ALTER TABLE `user_report`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_rol`
--
ALTER TABLE `user_rol`
  MODIFY `id` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user_status`
--
ALTER TABLE `user_status`
  MODIFY `id` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user_suspension`
--
ALTER TABLE `user_suspension`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_visibility`
--
ALTER TABLE `user_visibility`
  MODIFY `id` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `FKconversati606185` FOREIGN KEY (`targetid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKconversati84423` FOREIGN KEY (`sourceid`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `image_comment`
--
ALTER TABLE `image_comment`
  ADD CONSTRAINT `FKimage_comm153662` FOREIGN KEY (`userid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKimage_comm259430` FOREIGN KEY (`user_imageid`) REFERENCES `user_image` (`id`);

--
-- Filtros para la tabla `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `FKmessages522550` FOREIGN KEY (`userid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKmessages558958` FOREIGN KEY (`conversationsid`) REFERENCES `conversations` (`id`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FKuser204990` FOREIGN KEY (`user_rolid`) REFERENCES `user_rol` (`id`),
  ADD CONSTRAINT `FKuser317843` FOREIGN KEY (`user_statusid`) REFERENCES `user_status` (`id`),
  ADD CONSTRAINT `FKuser71815` FOREIGN KEY (`user_visibilityid`) REFERENCES `user_visibility` (`id`);

--
-- Filtros para la tabla `user_blocked`
--
ALTER TABLE `user_blocked`
  ADD CONSTRAINT `FKuser_block824124` FOREIGN KEY (`sourceid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKuser_block866483` FOREIGN KEY (`targetid`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user_follower`
--
ALTER TABLE `user_follower`
  ADD CONSTRAINT `FKuser_follo285732` FOREIGN KEY (`sourceid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKuser_follo995249` FOREIGN KEY (`targetid`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user_following`
--
ALTER TABLE `user_following`
  ADD CONSTRAINT `FKuser_follo31067` FOREIGN KEY (`sourceid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKuser_follo659541` FOREIGN KEY (`targetid`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user_image`
--
ALTER TABLE `user_image`
  ADD CONSTRAINT `FKuser_image936503` FOREIGN KEY (`userid`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user_notification`
--
ALTER TABLE `user_notification`
  ADD CONSTRAINT `FKuser_notif219994` FOREIGN KEY (`notification_objectid`) REFERENCES `notification_object` (`id`),
  ADD CONSTRAINT `FKuser_notif8514` FOREIGN KEY (`sourceid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKuser_notif889263` FOREIGN KEY (`targetid`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user_report`
--
ALTER TABLE `user_report`
  ADD CONSTRAINT `FKuser_repor362073` FOREIGN KEY (`sourceid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKuser_repor918908` FOREIGN KEY (`targetid`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user_request`
--
ALTER TABLE `user_request`
  ADD CONSTRAINT `FKuser_reque307907` FOREIGN KEY (`sourceid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKuser_reque973074` FOREIGN KEY (`targetid`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user_suspension`
--
ALTER TABLE `user_suspension`
  ADD CONSTRAINT `FKuser_suspe277745` FOREIGN KEY (`userid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKuser_suspe528343` FOREIGN KEY (`user_reportid`,`user_reportsourceid`,`user_reporttargetid`) REFERENCES `user_report` (`id`, `sourceid`, `targetid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
