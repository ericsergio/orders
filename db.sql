CREATE DATABASE IF NOT EXISTS `orders`;

USE orders;

CREATE TABLE IF NOT EXISTS `unit_quantity` (
  `uq_id` INT UNIQUE NOT NULL,
  `uq_name` VARCHAR(10) UNIQUE NOT NULL,
  PRIMARY KEY (`uq_id`)
);

INSERT INTO unit_quantity(uq_id, uq_name) VALUES(1, "187 ml");
INSERT INTO unit_quantity(uq_id, uq_name) VALUES(2, "750 ml");
INSERT INTO unit_quantity(uq_id, uq_name) VALUES(3, "1 Liter");
INSERT INTO unit_quantity(uq_id, uq_name) VALUES(4, "1.5 Liter");
INSERT INTO unit_quantity(uq_id, uq_name) VALUES(5, "Bottle");
INSERT INTO unit_quantity(uq_id, uq_name) VALUES(6, "Keg");
INSERT INTO unit_quantity(uq_id, uq_name) VALUES(7, "Can");

CREATE TABLE IF NOT EXISTS `order_units` (
  `ou_id` INT UNIQUE NOT NULL,
  `ou_name` VARCHAR(6) UNIQUE NOT NULL,
  PRIMARY KEY (`ou_id`)
);

INSERT INTO order_units(ou_id, ou_name) VALUES(1, "Bottle");
INSERT INTO order_units(ou_id, ou_name) VALUES(2, "Case");
INSERT INTO order_units(ou_id, ou_name) VALUES(3, "Keg");

CREATE TABLE IF NOT EXISTS `item_types` (
  `it_id` INT UNIQUE NOT NULL,
  `it_name` VARCHAR(12) UNIQUE NOT NULL,
  PRIMARY KEY (`it_id`)
);

INSERT INTO item_types(it_id, it_name) VALUES(1, "Liquor");
INSERT INTO item_types(it_id, it_name) VALUES(2, "Wine");
INSERT INTO item_types(it_id, it_name) VALUES(3, "Bottle Beer");
INSERT INTO item_types(it_id, it_name) VALUES(4, "Keg Beer");
INSERT INTO item_types(it_id, it_name) VALUES(5, "NA");

CREATE TABLE IF NOT EXISTS `dists` (
  `d_id` INT UNIQUE NOT NULL,
  `d_name` VARCHAR(8) UNIQUE NOT NULL,
  PRIMARY KEY (`d_id`)
);

INSERT INTO dists(d_id, d_name) VALUES(1, "Southern");
INSERT INTO dists(d_id, d_name) VALUES(2, "Columbia");
INSERT INTO dists(d_id, d_name) VALUES(3, "Crown");
INSERT INTO dists(d_id, d_name) VALUES(4, "Youngs");

CREATE TABLE IF NOT EXISTS `items` (
  `i_name` VARCHAR(50) UNIQUE NOT NULL,
  `i_dist` INT NOT NULL,
  `i_type` INT NOT NULL,
  `i_par` INT NOT NULL,
  `d_order_type` INT NOT NULL,
  `d_order_quantity` INT NOT NULL,
  `default_order` INT NOT NULL,
  `on_hand` INT,
  PRIMARY KEY (`i_name`),
  FOREIGN KEY (`i_dist`) REFERENCES dists(`d_id`),
  FOREIGN KEY (`i_type`) REFERENCES item_types(`it_id`),
  FOREIGN KEY (`d_order_type`) REFERENCES order_units(`ou_id`),
  FOREIGN KEY (`d_order_quantity`) REFERENCES unit_quantity(`uq_id`)
);

INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Pendletons_Whiskey", 1, 1, 0, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Chambord", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Frangelico", 4, 1, 1, 0, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Korbel_Brandy", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Saphire_Gin", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Herradura_Tequila", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Drambuie", 4, 1, 0, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Hennessy_Cognac", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Dekuyper_Creme_De_Cocoa", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Green_Creme_De_Menthe", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Jack_Honey", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Myers_Dark_Rum", 4, 1, 1, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Dekuyper_Sour_Apple", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Sambuca_Romana", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("St_Germain_Liqueur", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Absolute_Vodka", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Smirnoff_Vodka", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Smirnoff_Strawberry_Vodka", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Smirnoff_Raspberry_Vodka", 1, 1, 1, 1, 3, 2;
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Smirnoff_Blueberry_Vodka", 1, 1, 0, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Beefeater_Gin", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Johnny_Walker_Red_Scotch", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("MacGregor_Scotch", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Patron_Tequila", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Grand_Marnier_Orange_Liqueur", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Seagrams_7_Whiskey", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("MacNaughtons_Whiskey", 2, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Jim_Beam_Bourbon", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Smirnoff_Citrus_Vodka", 1, 1, 1, 2, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Ketel_One_Vodka", 1, 1, 1, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Makers_Mark_Bourbon", 1, 1, 2, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Jamesons_Whiskey", 1, 1, 2, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Jagermeister", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Kahlua_Coffee_Liquer", 1, 1, 2, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Cinzano_Sweet_Vermouth", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Cinzano_Dry_Vermouth", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Wild_Turkey_Whiskey", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Courvoisier_Cognac", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Disaronno_Amaretto", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Rumplemintz", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Southern_Comfort", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Smirnoff_Vanilla_Vodka", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Hendricks_Gin", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Tanquery_Gin", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Malibu_Rum", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Johnny_Walker_Black_Scotch", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Macallan_Scotch", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Dewers_Scotch", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Hornitos_Tequila", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Canadian_Club_Whiskey", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Fireball_Whiskey", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Baileys_Irish_Cream", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Midori_Melon", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Smirnoff_Whip_Cream_Vodka", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Cointreau_Orange_Liqueur", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Crown_Whiskey", 1, 1, 3, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Captain_Morgans_Rum", 1, 1, 2, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Bacardi_Rum", 1, 1, 2, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Titos_Vodka", 4, 1, 2, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Grey_Goose_Vodka", 1, 1, 2, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Dekuyper_Peach", 1, 1, 2, 1, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Cruzan_Black_Cherry_Rum", 1, 1, 2, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Fleischmanns_Gin", 1, 1, 4, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Montezuma_Tequila", 1, 1, 4, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Royal_Gentleman_Whiskey", 4, 1, 4, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Moonshine", 1, 1, 4, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Monarch_Rum", 1, 1, 4, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Triple_Sec_Orange_Liqueur", 1, 1, 4, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Jack_Daniels_Bourbon", 4, 1, 4, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Sauza_Tequila", 1, 1, 4, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Skoll_Vodka", 1, 1, 9, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Galliano", 1, 1, 0, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("B_B_Liqueur", 3, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Sailor_Jerrys_Rum", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Chivas_Scotch", 1, 1, 0, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("El_Himador_Tequila", 4, 1, 1, 2, 3, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Black_Velvet_Whiskey", 1, 1, 0, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Compari", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("GoldSchlagger", 1, 1, 0, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Smirnoff_Orange_Vodka", 1, 1, 0, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Smirnoff_Root_Beer_Vodka", 1, 1, 0, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Yukon_Jack", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Glenlevit_Scotch", 1, 1, 0, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Camerana_Tequila", 1, 1, 0, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Stoli_Vodka", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Smirnoff_Pomegranite_Vodka", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Jose_Quervo_Tequila", 1, 1, 0, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("VO_Whiskey", 1, 1, 0, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Bulleit_Whiskey", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Knob_Creek_Whiskey", 1, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Woodford_Reserve_Whiskey", 4, 1, 1, 1, 3, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Chateau_Merlot", 1, 2, 12, 2, 2, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Chateau_Reisling", 1, 2, 12, 2, 2, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Prosecco", 1, 2, 12, 2, 1, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Jacobs_Creek_Shiraz_Cab_Blend", 1, 2, 12, 2, 2, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Colum_Composition_Red_Blend", 1, 2, 12, 2, 2, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Chloe_Rose", 1, 2, 12, 2, 2, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Copper_Ridge_White_Zin", 1, 2, 12, 2, 2, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("KJ_Chard", 1, 2, 12, 2, 2, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Duck_Pond_Pinot_Noir", 1, 2, 12, 2, 2, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Ecco_Pino_Grigio", 1, 2, 12, 2, 2, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Brown_Family_Cabernet", 1, 2, 12, 2, 2, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("_14_Hands_Cab", 1, 2, 15, 2, 2, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Worlds_Edge_Chard", 1, 2, 15, 2, 2, 3);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Worlds_Edge_Cab", 1, 2, 32, 2, 2, 3);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Chateau_Mimi_Chardonnay", 1, 2, 6, 2, 2, 2);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Miller_Light", 2, 3, 12, 2, 5, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Mich_Ultra", 3, 3, 12, 2, 5, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Stella_Artois", 3, 3, 12, 2, 5, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Corona", 2, 3, 12, 2, 5, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Angry_Orchard", 2, 3, 12, 2, 5, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Budweiser", 3, 3, 12, 2, 5, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("ODouls", 3, 3, 6, 2, 5, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Guiness", 2, 3, 6, 2, 7, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Newcastle", 2, 3, 6, 2, 5, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Heinekin", 2, 3, 6, 2, 5, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Redbridge", 3, 3, 6, 2, 5, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("MGD", 2, 3, 6, 2, 5, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Fosters_Oil", 2, 3, 6, 2, 7, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Amstel_Light", 2, 3, 6, 2, 5, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Sam_Adams_76_Cans", 2, 3, 6, 2, 7, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Elysian_Dragonstooth", 3, 3, 0, 2, 5, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Sam_Adams_Seasonal", 2, 4, 1, 3, 6, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Corona_Light", 2, 3, 0, 2, 6, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Sam_Adams_Boston_Lager", 2, 2, 12, 2, 5, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Elysian_Dragonstooth_Stout", 3, 3, 0, 2, 6, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Coors_Light", 2, 4, 1, 3, 6, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Sam_Adams", 2, 4, 1, 3, 6, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Bloomin_Blonde", 3, 4, 1, 3, 6, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Fosters", 2, 4, 1, 3, 6, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Bud_Light", 3, 4, 1, 3, 6, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Immortal_IPA", 3, 4, 1, 3, 6, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Pyramid_Amber", 2, 4, 1, 3, 6, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Blue_Moon", 2, 4, 1, 3, 6, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Ginger_Beer", 1, 5, 12, 2, 7, 1);
INSERT INTO items(i_name, i_dist, i_type, i_par, d_order_type, d_order_quantity, default_order) VALUES("Red_Bull", 2, 5, 12, 2, 7, 1);

CREATE TABLE `ordered` (
  `o_id` int(11) NOT NULL AUTO_INCREMENT,
  `o_name` varchar(50) NOT NULL,
  `o_quantity` int(2) DEFAULT NULL,
  `o_unit` varchar(6) DEFAULT NULL,
  `o_unit_quantity` varchar(10) DEFAULT NULL,
  `o_date` date DEFAULT NULL,
  PRIMARY KEY (`o_id`),
  UNIQUE KEY `o_id` (`o_id`),
  KEY `o_name` (`o_name`),
  CONSTRAINT `ordered_ibfk_1` FOREIGN KEY (`o_name`) REFERENCES `items` (`i_name`)
);


