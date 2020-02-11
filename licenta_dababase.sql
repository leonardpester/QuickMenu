-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Gazdă: 127.0.0.1
-- Timp de generare: feb. 06, 2020 la 11:49 PM
-- Versiune server: 10.4.10-MariaDB
-- Versiune PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `licenta`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `categorie`
--

CREATE TABLE `categorie` (
  `categorie_id` int(11) NOT NULL,
  `categorie_nume` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `categorie`
--

INSERT INTO `categorie` (`categorie_id`, `categorie_nume`) VALUES
(1, 'Mic dejun'),
(2, 'Gustări'),
(3, 'Paste'),
(4, 'Salate'),
(5, 'Garnituri'),
(6, 'Desert'),
(7, 'Preparate din pui'),
(8, 'Preparate din porc'),
(9, 'Băuturi alcoolice'),
(10, 'Băuturi răcoritoare'),
(11, 'Băuturi calde'),
(12, 'Ciorbe'),
(13, 'Pizza'),
(14, 'Preparate din paste');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `comenzi`
--

CREATE TABLE `comenzi` (
  `comanda_id` int(11) NOT NULL,
  `comanda_comanda` varchar(255) NOT NULL,
  `comanda_masa` int(11) NOT NULL,
  `comanda_total_pret` int(11) NOT NULL,
  `comanda_remove` int(11) NOT NULL DEFAULT 0,
  `comanda_ingrediente` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `comenzi`
--

INSERT INTO `comenzi` (`comanda_id`, `comanda_comanda`, `comanda_masa`, `comanda_total_pret`, `comanda_remove`, `comanda_ingrediente`) VALUES
(1, '[\"produs1\",\"produs2\",\"produs2\",\"produs2\"]', 7, 36, 1, NULL),
(2, '[\"produs1\",\"produs4\",\"nume meniu\",\"produs11\",\"1produs3\",\"1produs3\",\"1produs3\",\"1produs3\",\"1produs3\",\"1produs3\",\"1produs3\",\"1produs3\",\"1produs3\",\"1produs3\",\"1produs3\",\"1produs3\",\"1produs3\",\"1produs3\",\"1produs3\"]', 13, 288, 1, NULL),
(3, '[\"produs2\"]', 4, 12, 1, NULL),
(4, '[\"produs4\"]', 6, 15, 0, NULL),
(5, '[\"produs2\",\"produs2\"]', 4, 24, 0, NULL),
(6, '[\"produs3\",\"produs3\",\"produs4\"]', 6, 43, 0, NULL),
(7, '[\"produs1\",\"produs1\"]', 8, 24, 0, NULL),
(8, '[\"produs2\",\"produs2\",\"produs2\",\"produs2\"]', 3, 48, 0, NULL),
(9, '[\"produs4\"]', 3, 15, 0, NULL),
(10, '[\"1produs4\",\"1produs5\",\"1produs7\",\"produs1\"]', 9, 54, 0, NULL),
(11, '[\"produs2\",\"produs11\"]', 5, 24, 0, NULL),
(12, '[\"Omlet\\u0103 \\u021b\\u0103r\\u0103neasc\\u0103\",\"Omlet\\u0103 cu ca\\u0219caval\",\"Omlet\\u0103 cu \\u0219unc\\u0103 presat\\u0103\",\"Omlet\\u0103 cu \\u0219unc\\u0103 presat\\u0103\",\"Cola\",\"Fanta\",\"Dorna\",\"Dorna\"]', 3, 71, 0, NULL),
(13, '[\"Omlet\\u0103 \\u021b\\u0103r\\u0103neasc\\u0103\",\"Omlet\\u0103 cu ca\\u0219caval\",\"Omlet\\u0103 cu ca\\u0219caval\"]', 5, 37, 1, 'ceapă verde,ardei verde,roșie,piper,cascaval,ouă,sare'),
(14, '[\"Omlet\\u0103 \\u021b\\u0103r\\u0103neasc\\u0103\",\"Omlet\\u0103 \\u021b\\u0103r\\u0103neasc\\u0103\",\"Omlet\\u0103 \\u021b\\u0103r\\u0103neasc\\u0103\",\"Omlet\\u0103 \\u021b\\u0103r\\u0103neasc\\u0103\",\"Omlet\\u0103 \\u021b\\u0103r\\u0103neasc\\u0103\",\"Omlet\\u0103 cu ca\\u0219caval', 3, 90, 0, 'ceapă verde,ardei verde,roșie,piper,cascaval,ouă,sare,boia dulce,șuncă presată'),
(15, '[\"Omlet\\u0103 \\u021b\\u0103r\\u0103neasc\\u0103\",\"Omlet\\u0103 \\u021b\\u0103r\\u0103neasc\\u0103\"]', 6, 26, 0, 'ceapă verde,ardei verde,roșie,piper');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `meniuri`
--

CREATE TABLE `meniuri` (
  `meniu_id` int(11) NOT NULL,
  `meniu_nume` varchar(255) DEFAULT NULL,
  `meniu_descriere` varchar(255) DEFAULT NULL,
  `meniu_pret` int(11) DEFAULT NULL,
  `meniu_ingrediente` varchar(255) DEFAULT NULL,
  `meniu_categorie` int(255) DEFAULT NULL,
  `meniu_avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `meniuri`
--

INSERT INTO `meniuri` (`meniu_id`, `meniu_nume`, `meniu_descriere`, `meniu_pret`, `meniu_ingrediente`, `meniu_categorie`, `meniu_avatar`) VALUES
(1, 'Omletă țărănească', 'descriere1', 13, 'ceapă verde,ardei verde,roșie,piper', 1, '1.jpg'),
(2, 'Omletă cu cașcaval', 'descriere2', 12, 'cascaval,piper,ouă,sare,boia dulce', 1, '2.jpg'),
(3, 'Omletă cu șuncă presată', 'descriere3', 13, 'piper,ouă,sare,șuncă presată', 1, '3.jpg'),
(4, 'Omletă cu verdeață', 'descriere4', 10, 'ouă,sare,unt,verdeață tocată', 1, '4.jpg'),
(5, 'Sandwich de pui', 'descriere5', 11, 'pui,chifla,ceapa,salata,ceapa,cascaval', 1, '5.jpg'),
(8, 'Cola', 'descriere1', 5, NULL, 10, '8.jpg'),
(9, 'Fanta', 'descriere2', 5, NULL, 10, '9.png'),
(10, 'Dorna', 'descriere3', 5, NULL, 10, NULL),
(11, 'Pepsi', 'das', 5, NULL, 10, NULL),
(12, 'Cappy portocale', 'descriere5', 7, NULL, 10, NULL),
(13, 'Cappy piersică', 'descriere6', 7, NULL, 10, NULL),
(14, 'Borsec', 'descriere7', 5, NULL, 10, NULL),
(15, 'Paste cu ton', 'descriere1', 18, 'paste,piper,ton,usturoi,masline,sare', 3, '15.png'),
(16, 'Paste carbonara', 'descriere2', 18, 'paste,piper,masline,sare,bacon', 3, NULL),
(17, 'produs3', 'descriere3', 14, NULL, 1, NULL),
(18, 'produs4', 'descriere4', 15, NULL, 1, NULL),
(19, 'produs5', 'descriere5', 11, NULL, 1, NULL),
(20, 'produs6', 'descriere6', 17, NULL, 1, NULL),
(21, 'produs7', 'descriere7', 16, NULL, 1, NULL),
(22, 'produs11', 'descriere1', 12, NULL, 2, NULL),
(23, 'produs21', 'descriere2', 12, NULL, 2, NULL),
(24, '1produs3', 'descriere3', 14, NULL, 2, NULL),
(25, 'produs21', 'descriere2', 12, 'morcov,fdfdf,ofooo', 3, NULL),
(26, '1produs3', 'descriere3', 14, NULL, 3, NULL),
(27, '1produs4', 'descriere4', 15, NULL, 3, NULL),
(28, '1produs5', 'descriere5', 11, NULL, 3, NULL),
(29, '1produs6', 'descriere6', 17, NULL, 3, NULL),
(30, '1produs7', 'descriere7', 16, NULL, 3, NULL),
(31, 'produs1', 'descriere1', 12, NULL, 3, NULL),
(32, 'produs2', 'descriere2', 12, NULL, 3, NULL),
(33, 'produs3', 'descriere3', 14, NULL, 3, NULL),
(34, 'produs4', 'descriere4', 15, NULL, 3, NULL),
(35, 'produs5', 'descriere5', 11, NULL, 3, NULL),
(36, 'produs6', 'descriere6', 17, NULL, 3, NULL),
(38, 'produs11', 'descriere1', 12, NULL, 17, NULL),
(39, 'produs3', 'descriere3', 14, NULL, 3, NULL),
(40, 'produs21', 'descriere2', 12, NULL, 3, NULL),
(41, '1produs3', 'descriere3', 14, NULL, 6, NULL),
(42, 'nume meniu', 'desccccc', 39, 'morcov,oregano,ghimbir', 4, NULL),
(43, '1produs7', 'descriere7', 16, NULL, 15, NULL),
(44, 'produs1', 'descriere1', 12, NULL, 14, NULL),
(45, 'produs2', 'descriere2', 10, NULL, 4, NULL),
(46, 'produs3', 'descriere3', 9, NULL, 13, NULL),
(47, 'produs4', 'descriere4', 8, NULL, 12, NULL),
(48, 'produs5', 'descriere5', 7, NULL, 11, NULL),
(49, 'produs6', 'descriere6', 6, NULL, 10, NULL),
(50, 'produs3', 'descriere3', 5, NULL, 9, NULL),
(51, 'produs11', 'descriere1', 12, NULL, 8, NULL),
(52, 'produs21', 'descriere2', 12, NULL, 7, NULL),
(53, '1produs3', 'descriere3', 14, NULL, 6, NULL),
(54, 'nume meniu', 'desccccc', 37, 'morcov,ghimbir', 5, NULL),
(55, 'weqweqewq', NULL, 3, 'morcov', 3, NULL);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `produse`
--

CREATE TABLE `produse` (
  `produs_id` int(11) NOT NULL,
  `produs_nume` varchar(255) DEFAULT NULL,
  `produs_cantitate` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `produse`
--

INSERT INTO `produse` (`produs_id`, `produs_nume`, `produs_cantitate`) VALUES
(1, 'cola', 48759),
(2, 'morcov', 48372),
(3, 'oregano', 3000),
(4, 'varza', 40000),
(5, 'ghimbir', 43884),
(6, 'spanac', 48392),
(7, 'castraveti', 4324),
(8, 'ciuperci', 65654),
(9, 'patrunjel', 55436),
(10, 'cascaval', 24297),
(11, 'faina', 53543),
(12, 'varza', 43553),
(13, 'paste', 44545),
(14, 'salam', 535636),
(17, 'ceapă verde', 543517),
(18, 'ardei verde', 543486),
(19, 'mărar', 5435435),
(20, 'cimbru', 5435345),
(21, 'roșie', 5435376),
(22, 'piper', 54256),
(23, 'carne tocata', 54354353),
(25, 'boia dulce', 235435),
(26, 'șuncă presată', 543534),
(28, 'unt', 54353),
(29, 'verdeață tocată', 543534),
(30, 'ton', 312231231),
(31, 'sos rosu', 32321231),
(32, 'usturoi', 321231231),
(33, 'masline', 423321323),
(34, 'sare', 321321285),
(35, 'bacon', 321321321),
(36, 'ouă', 312321195);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `users`
--

CREATE TABLE `users` (
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `users`
--

INSERT INTO `users` (`password`) VALUES
('parolamea');

--
-- Indexuri pentru tabele eliminate
--

--
-- Indexuri pentru tabele `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`categorie_id`);

--
-- Indexuri pentru tabele `comenzi`
--
ALTER TABLE `comenzi`
  ADD PRIMARY KEY (`comanda_id`);

--
-- Indexuri pentru tabele `meniuri`
--
ALTER TABLE `meniuri`
  ADD PRIMARY KEY (`meniu_id`);

--
-- Indexuri pentru tabele `produse`
--
ALTER TABLE `produse`
  ADD PRIMARY KEY (`produs_id`) USING BTREE;

--
-- AUTO_INCREMENT pentru tabele eliminate
--

--
-- AUTO_INCREMENT pentru tabele `comenzi`
--
ALTER TABLE `comenzi`
  MODIFY `comanda_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pentru tabele `meniuri`
--
ALTER TABLE `meniuri`
  MODIFY `meniu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT pentru tabele `produse`
--
ALTER TABLE `produse`
  MODIFY `produs_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
